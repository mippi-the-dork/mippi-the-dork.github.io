/* v2.97 // Permanent, opt-in long-session Stability Lab.
   Sampling is idle until requested, timer accounting is constant-time.
   Tests never modify progression or persistent storage. */
(()=>{
  'use strict';
  const activeTimeouts=new Map(),activeIntervals=new Set();
  const original={setTimeout:window.setTimeout,clearTimeout:window.clearTimeout,
    setInterval:window.setInterval,clearInterval:window.clearInterval};
  const totals={scheduledTimeouts:0,scheduledIntervals:0,peakTimeouts:0,peakIntervals:0};
  window.setTimeout=function(callback,delay,...args){
    if(typeof callback!=='function')return original.setTimeout.call(window,callback,delay,...args);
    let id;
    id=original.setTimeout.call(window,function(...params){
      activeTimeouts.delete(id);return callback.apply(this,params);
    },delay,...args);
    activeTimeouts.set(id,{created:performance.now(),delay:Math.max(0,Number(delay)||0)});totals.scheduledTimeouts++;
    totals.peakTimeouts=Math.max(totals.peakTimeouts,activeTimeouts.size);return id;
  };
  window.setInterval=function(callback,delay,...args){
    const id=original.setInterval.call(window,callback,delay,...args);
    activeIntervals.add(id);totals.scheduledIntervals++;
    totals.peakIntervals=Math.max(totals.peakIntervals,activeIntervals.size);return id;
  };
  window.clearTimeout=function(id){activeTimeouts.delete(id);activeIntervals.delete(id);return original.clearTimeout.call(window,id);};
  window.clearInterval=function(id){activeIntervals.delete(id);activeTimeouts.delete(id);return original.clearInterval.call(window,id);};


  let session=null,last=null,sampler=0,soakTimer=0,soak=null,frameToken=0;
  const intervalMs=5000,MAX_SAMPLES=1500,MAX_EVENTS=500,MAX_INTERRUPTS=250;
  const foreground=()=>!document.hidden&&document.hasFocus();
  const focusState=()=>document.hidden?'hidden':document.hasFocus()?'foreground':'visible-unfocused';
  const newFrameStats=()=>({frames:0,intervals:0,totalMs:0,delayed33:0,delayed100:0,maxGapMs:0});
  const rounded=ms=>+ms.toFixed(1);
  function focusSummary(s,now=performance.now()){
    if(!s)return null;
    const f=s.focus,totals={...f.durationMs};
    totals[f.current]+=Math.max(0,now-f.changedAt);
    const raf={};
    for(const [key,v] of Object.entries(f.raf))raf[key]={...v,avgIntervalMs:v.intervals?rounded(v.totalMs/v.intervals):null};
    return {state:f.current,foregroundMs:rounded(totals.foreground),visibleUnfocusedMs:rounded(totals['visible-unfocused']),hiddenMs:rounded(totals.hidden),
      transitions:f.transitions,events:f.events.slice(),raf,recoveries:f.recoveries.slice(),pendingRecovery:!!f.pendingRecovery,
      longestRafGapMs:rounded(f.longestRafGapMs)};
  }
  function recordEvent(kind,details={}){
    if(!session)return;
    const event={atMs:rounded(performance.now()-session.started),type:kind,state:focusState(),...details};
    session.focus.events.push(event);
    if(session.focus.events.length>MAX_EVENTS){session.focus.events.shift();session.focus.eventsTruncated=true;}
  }
  function frameSample(now){
    frameToken=0;
    if(!session)return;
    const f=session.focus,current=focusState(),previous=f.previousRaf;
    const bucket=f.raf[current];bucket.frames++;
    if(previous){
      const gap=now-previous.at;
      f.longestRafGapMs=Math.max(f.longestRafGapMs,gap);
      // Never misattribute a gap across a focus-state transition to one state.
      if(previous.state===current){bucket.intervals++;bucket.totalMs+=gap;
        if(gap>=33.3)bucket.delayed33++;if(gap>=100)bucket.delayed100++;
        bucket.maxGapMs=Math.max(bucket.maxGapMs,gap);
      }
    }
    f.previousRaf={at:now,state:current};
    const rec=f.pendingRecovery;
    if(rec&&current==='foreground'){
      if(rec.firstFrameAfterReturnMs==null)rec.firstFrameAfterReturnMs=rounded(now-rec.returnedAt);
      if(now-rec.returnedAt<=5000){rec.frames++;if(previous?.state==='foreground')rec.frameIntervals.push(now-previous.at);}
      else{
        rec.fiveSecondFrames=rec.frames;
        rec.fiveSecondAvgFrameMs=rec.frameIntervals.length?rounded(rec.frameIntervals.reduce((a,b)=>a+b,0)/rec.frameIntervals.length):null;
        delete rec.frameIntervals;f.pendingRecovery=null;
      }
    }
    frameToken=requestAnimationFrame(frameSample);
  }
  function beginFrameSampling(){if(!frameToken)frameToken=requestAnimationFrame(frameSample);}
  function clearSoakTimer(){if(soakTimer){clearTimeout(soakTimer);soakTimer=0;}}
  function focusChanged(source){
    if(!session)return;
    const now=performance.now(),f=session.focus,current=focusState();
    if(current===f.current)return;
    f.durationMs[f.current]+=Math.max(0,now-f.changedAt);
    const previous=f.current;f.current=current;f.changedAt=now;f.transitions++;
    recordEvent('focus-change',{source,from:previous,to:current});
    sample('focus-'+current);
    if(previous!=='foreground'&&current==='foreground'){
      const recovery={atMs:rounded(now-session.started),from:previous,returnedAt:now,firstFrameAfterReturnMs:null,frames:0,frameIntervals:[]};
      f.recoveries.push(recovery);
      if(f.recoveries.length>100)f.recoveries.shift();
      f.pendingRecovery=recovery;
    }else if(current!=='foreground'){
      // An interrupted recovery is incomplete, not a successful five-second sample.
      if(f.pendingRecovery){f.pendingRecovery.interrupted=true;delete f.pendingRecovery.frameIntervals;f.pendingRecovery=null;}
    }
    if(soak){if(current!=='foreground')pauseSoak('focus-'+current);else scheduleSoakResume();}
  }
  const onVisibility=()=>focusChanged('visibilitychange');
  const onFocus=()=>focusChanged('focus');
  const onBlur=()=>focusChanged('blur');
  function attachFocusListeners(){document.addEventListener('visibilitychange',onVisibility);window.addEventListener('focus',onFocus);window.addEventListener('blur',onBlur);}
  function detachFocusListeners(){document.removeEventListener('visibilitychange',onVisibility);window.removeEventListener('focus',onFocus);window.removeEventListener('blur',onBlur);}
  function capture(note='sample'){
    const hooks=window.MippiCombatHooks?.lifecycle?.()||null;
    const particle=window.MippiParticleRenderer?.snapshot()||null;
    const now=performance.now();
    const timeoutAges={under1s:0,from1to10s:0,over10s:0,requestedOver10s:0};
    for(const info of activeTimeouts.values()){
      const age=now-info.created;
      if(age<1000)timeoutAges.under1s++;
      else if(age<10000)timeoutAges.from1to10s++;
      else timeoutAges.over10s++;
      if(info.delay>=10000)timeoutAges.requestedOver10s++;
    }
    const elCounts={
      total:document.getElementsByTagName('*').length,
      labTargets:document.querySelectorAll('[data-combat-lab="1"].combat-lab-target').length,
      labShips:document.querySelectorAll('[data-combat-lab="1"].combat-lab-ship').length,
      playerShots:document.querySelectorAll('.legendary-player-projectile').length,
      hostileShots:document.querySelectorAll('.ufo-projectile').length,
      domExplosions:document.querySelectorAll('.arcade-pixel').length,
      canvasLayers:document.querySelectorAll('.mippi-particle-canvas').length,
    };
    let cssAnimations=null;
    try{cssAnimations=document.getAnimations().filter(a=>a.playState==='running').length;}catch(_){}
    return {atMs:Math.round(now),elapsedSec:session?+((now-session.started)/1000).toFixed(1):0,
      note,combatActive:!!window.MippiCombatLab?.active,renderer:window.MippiCombatLab?.rendererMode?.()||'unknown',
      geometry:window.MippiCombatHooks?.geometryMode?.()||'unknown',
      visibility:focusState(),isDocumentHidden:document.hidden,windowFocused:document.hasFocus(),
      focusDurationMs:session?{...session.focus.durationMs}:null,
      elements:elCounts,cssAnimations,
      timers:{timeouts:activeTimeouts.size,intervals:activeIntervals.size,timeoutAges,...totals},
      projectileLifecycle:hooks,
      canvas:{active:particle?.active||0,mounted:!!particle?.canvasMounted,
        spawned:particle?.totals?.spawned||0,expired:particle?.totals?.expired||0,frames:particle?.totals?.frames||0},
      jsHeapBytes:performance.memory?.usedJSHeapSize??null};
  }
  const snapshot=()=>capture('status');
  function sample(note='sample'){
    if(!session)return;
    const row=capture(note);
    session.samples.push(row);
    if(session.samples.length>MAX_SAMPLES){session.samples.shift();session.truncated=true;}
    return row;
  }
  function start(){
    if(session)return 'STABILITY // Already recording. Use dev stability report or stop.';
    const current=focusState(),now=performance.now();
    session={version:window.MIPPI_BUILD_VERSION||'2.99',started:now,startedAt:new Date().toISOString(),
      sampleIntervalMs:intervalMs,initial:null,samples:[],cycles:[],interruptedCycles:[],soakSummary:null,truncated:false,
      focus:{current,changedAt:now,transitions:0,events:[],durationMs:{foreground:0,'visible-unfocused':0,hidden:0},
        raf:{foreground:newFrameStats(),'visible-unfocused':newFrameStats(),hidden:newFrameStats()},
        previousRaf:null,longestRafGapMs:0,recoveries:[],pendingRecovery:null}};
    attachFocusListeners();sampler=setInterval(()=>{if(session&&focusState()!==session.focus.current)focusChanged('sample-watchdog');sample();},intervalMs);beginFrameSampling();
    session.initial=sample('baseline');
    return 'STABILITY // Focus-aware monitoring started. Foreground, visible-unfocused, and hidden activity tracked separately.';
  }
  function soakSummaryCopy(s){if(!s)return null;
    const now=performance.now();return {cycles:s.cycles,completed:s.completed,minutes:s.minutes,phase:s.phase,paused:s.paused,
      interruptions:s.interruptions,discardedAttempts:s.discardedAttempts,pausedMs:rounded(s.pausedMs+(s.pausedAt?now-s.pausedAt:0)),
      currentCycle:s.completed+1,validCycles:s.completed};}
  function stopSoak(){
    clearSoakTimer();if(!soak)return;
    window.MippiCombatLab?.stop();
    const summary={...soakSummaryCopy(soak),status:'stopped'};
    session.soakSummary=summary;recordEvent('soak-stopped');soak=null;sample('soak-stopped');
  }
  function stop(){
    if(!session)return 'STABILITY // No active recording.';
    stopSoak();sample('final');
    if(sampler){clearInterval(sampler);sampler=0;}
    if(frameToken){cancelAnimationFrame(frameToken);frameToken=0;}
    detachFocusListeners();
    const finishedAt=new Date().toISOString();
    const focus=focusSummary(session);
    last={...session,focusSummary:focus,finishedAt,durationSec:+((performance.now()-session.started)/1000).toFixed(1)};
    session=null;
    return `STABILITY // Stopped after ${last.durationSec}s. ${last.samples.length} samples and ${last.cycles.length} valid combat cycles. Use dev stability export.`;
  }
  function countDrift(first,final){
    if(!first||!final)return {};
    const keys=['total','labTargets','labShips','playerShots','hostileShots','domExplosions','canvasLayers'];
    return Object.fromEntries(keys.map(k=>[k,final.elements[k]-first.elements[k]]));
  }
  function report(){
    const s=session||last;
    if(!s)return ['STABILITY // No recording yet. Use dev stability start or dev stability soak 10.'];
    const final=session?capture('live-report'):(s.samples.at(-1)||s.initial);
    const focused=session?focusSummary(s):s.focusSummary;
    const currentSoak=soak?soakSummaryCopy(soak):s.soakSummary;
    const activeSoak=soak?` // SOAK ${soak.completed}/${soak.cycles} ${soak.paused?'PAUSED ('+focusState()+')':'running'}`:'';
    const heap=s.initial.jsHeapBytes!=null&&final.jsHeapBytes!=null?` // heap delta ${((final.jsHeapBytes-s.initial.jsHeapBytes)/1048576).toFixed(1)} MiB`:' // heap unsupported';
    const activeDifference={timeouts:final.timers.timeouts-s.initial.timers.timeouts,intervals:final.timers.intervals-s.initial.timers.intervals};
    const cycles=s.cycles.slice(-5).map(c=>`${c.index}: ${c.frames??'?'} frames / ${c.longTasks??'?'} long tasks / diagnostic UFOs ${c.cleanup?.projectileLifecycle?.activeLabHostile||0}`).join(' | ');
    const foregroundCycles=s.cycles.filter(c=>c.validForeground);
    const foregroundFps=foregroundCycles.length?rounded(foregroundCycles.reduce((sum,c)=>sum+(c.frames||0)/30,0)/foregroundCycles.length):null;
    return [
      `STABILITY // ${(session?(performance.now()-s.started)/1000:s.durationSec).toFixed(0)}s elapsed // ${s.samples.length} snapshots${activeSoak}`,
      `FOCUS // ${focused.state} // foreground ${Math.round(focused.foregroundMs/1000)}s / visible-unfocused ${Math.round(focused.visibleUnfocusedMs/1000)}s / hidden ${Math.round(focused.hiddenMs/1000)}s // ${focused.transitions} transitions`,
      `FOREGROUND COMBAT // ${foregroundCycles.length} valid cycles / ${foregroundFps??'n/a'} avg animation FPS // ${s.interruptedCycles.length} interrupted attempts excluded`,
      `SOAK CONTROLLER // ${JSON.stringify(currentSoak||{status:'not-started'})}`,
      'DOM DRIFT // '+JSON.stringify(countDrift(s.initial,final))+' // current '+JSON.stringify(final.elements),
      `TIMERS // active ${final.timers.timeouts} timeouts / ${final.timers.intervals} intervals // change ${JSON.stringify(activeDifference)} // peaks ${final.timers.peakTimeouts}/${final.timers.peakIntervals}`,
      `PENDING TIMEOUT AGES // ${JSON.stringify(final.timers.timeoutAges)}`,
      `ANIMATIONS // ${s.initial.cssAnimations} initial / ${final.cssAnimations} latest${heap}`,
      `PROJECTILE LIFECYCLE // ${JSON.stringify(final.projectileLifecycle||{})} // Canvas active ${final.canvas.active} / mounted ${final.canvas.mounted}`,
      'LAST CYCLES // '+(cycles||'None. You can play normally or use dev stability soak 10.'),
      'NOTE // Visibility/focus interruptions are retained but excluded from foreground combat averages. Background rAF may be throttled.'
    ];
  }
  function exportData(){
    const s=session||last;if(!s)return 'STABILITY // No recording to export.';
    const focus=session?focusSummary(s):s.focusSummary;
    const payload={version:window.MIPPI_BUILD_VERSION||'2.99',diagnosticHarness:'v2.99-stability',
      capturedAt:new Date().toISOString(),viewport:{width:innerWidth,height:innerHeight,dpr:devicePixelRatio},
      userAgent:navigator.userAgent,summary:report(),raw:{...s,focusSummary:focus,soak:soakSummaryCopy(soak)||s.soakSummary,
        focus:{...s.focus,pendingRecovery:null},soakActive:!!soak}};
    const blob=new Blob([JSON.stringify(payload,null,2)],{type:'application/json'}),url=URL.createObjectURL(blob);
    const timestamp=new Date().toISOString().replace(/[-:]/g,'').replace(/\.\d{3}Z$/,'Z').replace('T','-');
    const a=document.createElement('a');a.href=url;a.download=`mippi-stability-v${window.MIPPI_BUILD_VERSION||'2.99'}-${timestamp}.json`;
    document.body.appendChild(a);a.click();a.remove();
    setTimeout(()=>URL.revokeObjectURL(url),1000);
    return `STABILITY // Downloaded ${a.download}.`;
  }
  function pauseSoak(reason){
    if(!soak||soak.paused)return;
    clearSoakTimer();const now=performance.now(),phase=soak.phase;
    // The Combat Lab's timer and profiler cannot be safely resumed midway.
    // Abort its disposable workload and repeat this cycle from the beginning.
    if(phase==='combat'){
      const attempt={cycle:soak.completed+1,atMs:rounded(now-session.started),reason,phase,
        elapsedSec:rounded((now-soak.phaseStartedAt)/1000),partialMetrics:window.MippiPerfLab?.lastMetrics?.()||null};
      window.MippiCombatLab?.stop();
      attempt.partialMetrics=window.MippiPerfLab?.lastMetrics?.()||attempt.partialMetrics;
      session.interruptedCycles.push(attempt);
      if(session.interruptedCycles.length>MAX_INTERRUPTS){session.interruptedCycles.shift();session.interruptionsTruncated=true;}
      soak.discardedAttempts++;
    }
    soak.phase=phase==='recovery'?'recovery-paused':'combat-paused';
    soak.paused=true;soak.pausedAt=now;soak.interruptions++;
    recordEvent('soak-paused',{reason,cycle:soak.completed+1,phase:soak.phase});
    sample('soak-paused');
  }
  function finishSoak(){
    if(!soak)return;
    clearSoakTimer();session.soakSummary={...soakSummaryCopy(soak),status:'complete',phase:'complete',paused:false};
    recordEvent('soak-complete',{validCycles:soak.completed});sample('soak-complete');soak=null;
  }
  function afterCombat(index){
    if(!soak||!session||soak.paused)return;
    if(!foreground()){pauseSoak('after-combat-'+focusState());return;}
    clearSoakTimer();
    // A slow browser may not have fired the Combat Lab's own timeout yet.
    if(window.MippiCombatLab?.active)window.MippiCombatLab.stop();
    soak.pendingPerf=window.MippiPerfLab?.lastMetrics?.()||{};
    soak.phase='recovery';soak.phaseStartedAt=performance.now();
    sample('after-combat-'+index);
    soakTimer=setTimeout(()=>afterRecovery(index),10500);
  }
  function afterRecovery(index){
    if(!soak||!session||soak.paused)return;
    if(!foreground()){pauseSoak('after-recovery-'+focusState());return;}
    clearSoakTimer();
    const cleanup=sample('after-recovery-'+index),perf=soak.pendingPerf||{};
    session.cycles.push({index,validForeground:true,frames:perf.frames,longTasks:perf.longTasks,
      avgIntervalMs:perf.avgIntervalMs,cleanup,interruptedAttemptsBeforeCompletion:soak.discardedAttempts});
    soak.pendingPerf=null;soak.completed++;recordEvent('valid-cycle',{cycle:index,frames:perf.frames});
    nextCycle();
  }
  function nextCycle(){
    if(!soak||!session)return;
    if(soak.completed>=soak.cycles){finishSoak();return;}
    if(!foreground()){pauseSoak('pre-cycle-'+focusState());return;}
    const index=soak.completed+1;
    soak.phase='combat';soak.phaseStartedAt=performance.now();
    sample('before-combat-'+index);
    const answer=window.MippiCombatLab?.run('combined',30);
    if(!String(answer).includes('queued')){
      recordEvent('soak-error',{cycle:index,message:String(answer)});
      session.soakSummary={...soakSummaryCopy(soak),status:'error',message:String(answer)};soak=null;sample('soak-error-'+index);return;
    }
    soakTimer=setTimeout(()=>afterCombat(index),31000);
  }
  function scheduleSoakResume(){
    if(!soak||!soak.paused||!foreground())return;
    clearSoakTimer();
    // Require 1.5s of uninterrupted foreground before restarting work.
    soakTimer=setTimeout(()=>{
      if(!soak||!soak.paused||!foreground())return;
      clearSoakTimer();const wasRecovery=soak.phase==='recovery-paused';
      soak.pausedMs+=performance.now()-soak.pausedAt;soak.pausedAt=0;soak.paused=false;
      recordEvent('soak-resumed',{cycle:soak.completed+1,restart:!wasRecovery});sample('soak-resumed');
      if(wasRecovery){soak.phase='recovery';soak.phaseStartedAt=performance.now();
        soakTimer=setTimeout(()=>afterRecovery(soak.completed+1),10500);
      }else nextCycle();
    },1500);
  }
  function soakStart(minutes){
    if(soak)return 'STABILITY // A soak test is already in progress.';
    if(window.MippiCombatLab?.active||window.MippiPerfLab?.active)return 'STABILITY // Stop any active combat or profile test first.';
    minutes=Math.max(2,Math.min(60,Number(minutes)||10));
    if(!session)start();
    const cycles=Math.max(1,Math.round(minutes*60/41.5));
    soak={cycles,completed:0,minutes,phase:'queued',phaseStartedAt:0,paused:false,pausedAt:0,pausedMs:0,
      interruptions:0,discardedAttempts:0,pendingPerf:null};
    if(foreground())nextCycle();else{pauseSoak('initial-'+focusState());}
    return `STABILITY // ${cycles} valid foreground 30s combat cycles, with 10s recovery. Unfocused/hidden intervals pause the soak; interrupted combat attempts are discarded and retried. Wall-clock duration may exceed ${Math.round(cycles*41.5/60)} minutes.`;
  }
  const help=()=>[
    'STABILITY LAB // Permanent, opt-in focus-aware monitoring of long-session resource drift.',
    'dev stability start        // track 5s resources, foreground/background animation cadence',
    'dev stability report       // live focus status, valid cycle performance, resource deltas',
    'dev stability export       // JSON with focus timeline, recovery, interrupted attempts',
    'dev stability stop         // stop monitoring and any active soak cycle',
    'dev stability soak 10      // run repeated clean 30s combat cycles; pause on lost focus',
    'PAUSE // Hidden or unfocused: abort/retry only the interrupted combat attempt. Finished cycles remain valid.',
    'RESUME // Return to the webpage, wait 1.5 seconds; the soak continues automatically.',
    'ANALYSIS // Foreground and background timing stay separate. Never include interrupted attempts in valid FPS averages.',
    'SAFETY // No Rupees, hearts, Invasion, achievements, or other progression is awarded.'
  ];
  window.MippiStabilityLab=Object.freeze({start,stop,report,exportData,soakStart,snapshot,help,
    get active(){return !!session;},get soaking(){return !!soak;}});
})();
