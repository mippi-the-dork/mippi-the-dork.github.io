/* v2.97 // Permanent opt-in performance lab. No sampling runs until `dev profile start`.
   Compatible with the v2.78 harness for frame-level comparison; new named subsystem hooks originate in v2.88. */
(()=>{
  'use strict';
  const html=document.documentElement;
  const nativeRaf=window.requestAnimationFrame.bind(window);
  const originalRequestAnimationFrame=window.requestAnimationFrame;
  const nativeSetInterval=window.setInterval.bind(window);
  const nativeSetTimeout=window.setTimeout.bind(window);
  // Time already-registered callbacks without changing their cadence or timer IDs.
  // This wrapper is installed before script.js executes, but is nearly inert
  // until an explicit recording begins.
  function timerLabel(kind,callback){
    const frames=((new Error()).stack||'').split('\n');
    const hit=frames.find(x=>/(?:script|perspective-demo)\.js(?:\?[^:]*)?:\d+/.test(x))||'';
    const match=hit.match(/((?:script|perspective-demo)\.js)(?:\?[^:]*)?:(\d+)/);
    return kind+'.'+(callback.name||'anonymous')+(match?' @ '+match[1]+':'+match[2]:' @ unknown');
  }
  function timerHook(kind,native){
    return function(handler,delay,...args){
      if(typeof handler!=='function')return native(handler,delay,...args);
      const label=timerLabel(kind,handler);
      return native(function(...params){
        if(!session)return handler.apply(this,params);
        const t=safeNow(), recording=session;
        try{return handler.apply(this,params);}finally{
          // A timer may intentionally STOP the profiler. Do not dereference
          // the now-closed recording in its finally block.
          if(session===recording){
            const ms=safeNow()-t;
            sampleCost('timer.'+label,ms);
            const evt={atMs:+(t-recording.start).toFixed(1),ms:+ms.toFixed(2),source:label,requestedDelayMs:Number(delay)||0};
            if(recording.timerEvents.length>=6000)recording.timerEvents.shift();
            recording.timerEvents.push(evt);
          }
        }
      },delay,...args);
    };
  }
  window.setInterval=timerHook('interval',nativeSetInterval);
  window.setTimeout=timerHook('timeout',nativeSetTimeout);
  const boot={scriptStart:performance.now(),hudMount:null,oldControlsHiddenInitially:html.classList.contains('hud-pending')};
  const modes={hud:'on',hudfx:'on',themefx:'on',cursorfx:'on',ambient:'on',hero:'on',about:'on',ambientlogic:'on',projectiles:'on',hudlogic:'on',objectiveclock:'on'};
  let session=null;
  let sampledFrames=[],rafToken=0,observations=[],hudObserver=null,rafWrapped=false;
  let observerLong=null,observerShift=null,observerLoaf=null;
  let regionObservers=[];
  let realRaf=null;
  const sources=new WeakMap();
  const timingLimit=16000;
  const ignore={};
  // Source labels are resolved once for each stable callback. These diagnostics
  // are recording-only and do not touch the underlying gameplay loop.
  function callbackLabel(callback){
    let name=sources.get(callback);
    if(name)return name;
    // Browser stack URLs contain a cache query: script.js?v=2.89:6775:9.
    // The old matcher only recognized script.js:6775 and labeled every frame unknown.
    const lines=((new Error()).stack||'').split('\n');
    const location=lines.find(line=>/(?:script|perspective-demo)\.js(?:\?[^:]*)?:\d+/.test(line))||'';
    const match=location.match(/((?:script|perspective-demo)\.js)(?:\?[^:]*)?:(\d+)/);
    name=(callback.name||'(anonymous)')+(match?' @ '+match[1]+':'+match[2]:' @ unknown');
    sources.set(callback,name);
    return name;
  }
  function enabled(system){return modes[system]!=='off';}
  function sampleCost(system,ms){
    if(!session||!Number.isFinite(ms))return;
    const row=session.systems[system]||(session.systems[system]={count:0,total:0,max:0,values:[]});
    row.count++;row.total+=ms;row.max=Math.max(row.max,ms);
    if(row.values.length<timingLimit)row.values.push(ms);
    else if(row.count%8===0)row.values[(row.count/8)%timingLimit|0]=ms;
    const frameCosts=session.currentFrameCosts;
    frameCosts[system]=(frameCosts[system]||0)+ms;
  }
  function run(system,callback){
    if(!session)return callback();
    const start=safeNow();
    try{return callback();}finally{sampleCost(system,safeNow()-start);}
  }
  const measure=(system,ms)=>sampleCost(system,ms);
  function skip(system){if(session)session.isolationSkipped[system]=(session.isolationSkipped[system]||0)+1;}
  function uiStatus(){
    const objective=document.getElementById('dynamic-objective');
    const stack=document.getElementById('system-toast-stack');
    const bird=document.querySelector('.flappy-game');
    const active=objective?.classList.contains('show')||false;
    return {objectiveVisible:active,objectiveTitle:active?(document.getElementById('objective-title')?.textContent||'').slice(0,90):'',
      objectiveClock:active?(document.getElementById('objective-progress-text')?.textContent||''):'',
      toastCount:stack?.querySelectorAll('.system-toast').length||0,
      birdOpen:!!bird&&bird.classList.contains('open'),
      visibleHud:!!document.getElementById('site-game-hud')&&!document.getElementById('site-game-hud').hidden};
  }
  function watchUI(){
    if(!session)return;
    const now=safeNow();
    if(now-session.lastUiSample<1000)return;
    session.lastUiSample=now;
    if(session.uiSnapshots.length>=90)session.uiSnapshots.shift();
    session.uiSnapshots.push({atMs:+(now-session.start).toFixed(1),...uiStatus()});
    if(window.MippiCombatLab?.active)session.combatSnapshots.push(window.MippiCombatLab.snapshot());
  }
  function correlateSpikes(s){
    // A long task often lands between two rAF callbacks, so show preceding
    // timers and DOM mutations rather than assigning the entire gap to WebGL.
    for(const spike of s.spikes){
      spike.nearbyTimers=s.timerEvents.filter(e=>e.atMs>=spike.atMs-110&&e.atMs<=spike.atMs+15).slice(-10);
      spike.nearbyDomChanges=s.domEvents.filter(e=>e.atMs>=spike.atMs-110&&e.atMs<=spike.atMs+15).slice(-10);
    }
  }
  function sampleSpike(interval,ts){
    if(!session||interval<33.3)return;
    const costs=session.currentFrameCosts;
    const peak=Object.entries(costs).sort((a,b)=>b[1]-a[1]).slice(0,12);
    if(session.spikes.length>=150)session.spikes.shift();
    session.spikes.push({atMs:+(ts-session.start).toFixed(1),intervalMs:+interval.toFixed(1),measured:peak.map(([name,ms])=>({name,ms:+ms.toFixed(2)}))});
  }
  const safeNow=()=>performance.now();
  const summaryValues=arr=>{
    const xs=arr.filter(Number.isFinite).sort((a,b)=>a-b);
    if(!xs.length)return {count:0,avg:0,p50:0,p95:0,p99:0,max:0};
    const pct=p=>xs[Math.min(xs.length-1,Math.ceil(xs.length*p)-1)];
    return {count:xs.length,avg:+(xs.reduce((a,b)=>a+b,0)/xs.length).toFixed(2),p50:+pct(.5).toFixed(2),p95:+pct(.95).toFixed(2),p99:+pct(.99).toFixed(2),max:+xs[xs.length-1].toFixed(2)};
  };
  const countAnimations=()=>{
    try{return document.getAnimations().filter(a=>a.playState==='running').length;}catch(_){return null;}
  };
  const paintEntries=()=>{try{return performance.getEntriesByType('paint').map(x=>({name:x.name,ms:+x.startTime.toFixed(1)}));}catch(_){return[];}};
  const nativeNoop=()=>{};
  function captureFrame(ts){
    if(!session)return;
    watchUI();
    const prior=session.lastFrame;
    if(prior!==null){
      const interval=ts-prior;
      sampledFrames.push(interval);
      sampleSpike(interval,ts);
    }
    session.currentFrameCosts=Object.create(null);
    session.lastFrame=ts;
    if(sampledFrames.length>18000)sampledFrames.shift();
    rafToken=nativeRaf(captureFrame);
  }
  function recordLongTask(list){
    if(!session)return;
    for(const e of list.getEntries()){
      session.longTasks.push({duration:e.duration,at:e.startTime});
      if(session.longTasks.length>300)session.longTasks.shift();
    }
  }
  function recordShift(list){
    if(!session)return;
    for(const e of list.getEntries())if(!e.hadRecentInput)session.layoutShift+=e.value||0;
  }
  function recordLoaf(list){
    if(!session)return;
    for(const e of list.getEntries()){
      const scripts=Array.from(e.scripts||[]).sort((a,b)=>(b.duration||0)-(a.duration||0)).slice(0,12).map(x=>({
        durationMs:+Number(x.duration||0).toFixed(2),sourceURL:x.sourceURL||'',sourceFunctionName:x.sourceFunctionName||'',
        sourceCharPosition:x.sourceCharPosition||0,invoker:x.invoker||'',invokerType:x.invokerType||'',
        executionStart:x.executionStart||0,forcedStyleAndLayoutDuration:x.forcedStyleAndLayoutDuration||0
      }));
      session.longFrames.push({duration:e.duration,blocking:e.blockingDuration||0,at:e.startTime,
        renderStart:e.renderStart||null,styleAndLayoutStart:e.styleAndLayoutStart||null,scripts});
      if(session.longFrames.length>300)session.longFrames.shift();
    }
  }
  function watch(type,handler){
    if(!PerformanceObserver.supportedEntryTypes?.includes(type))return null;
    try{const po=new PerformanceObserver(handler);po.observe({type,buffered:false});return po;}catch(_){return null;}
  }
  function watchRegions(){
    const watchTargets=[['objective',document.getElementById('dynamic-objective')],['toasts',document.getElementById('system-toast-stack')],['hud',document.getElementById('site-game-hud')]];
    for(const [name,el] of watchTargets){
      if(!el||typeof MutationObserver!=='function')continue;
      const ob=new MutationObserver(records=>{
        if(!session)return;
        const kinds={attributes:0,characterData:0,childList:0};
        for(const r of records)kinds[r.type]=(kinds[r.type]||0)+1;
        const evt={atMs:+(safeNow()-session.start).toFixed(1),region:name,mutations:records.length,...kinds};
        if(session.domEvents.length>=4000)session.domEvents.shift();
        session.domEvents.push(evt);
        const key='dom.'+name;
        session.domTotals[key]=(session.domTotals[key]||0)+records.length;
      });
      ob.observe(el,{subtree:true,attributes:true,characterData:true,childList:true});
      regionObservers.push(ob);
    }
  }
  function wrapRaf(){
    if(rafWrapped)return;
    rafWrapped=true;
    window.requestAnimationFrame=function(callback){
      if(!session)return originalRequestAnimationFrame.call(window,callback);
      const source=callbackLabel(callback);
      return originalRequestAnimationFrame.call(window,function(t){
        const st=safeNow();
        try{return callback(t);}finally{
          if(!session)return;
          const ms=safeNow()-st;
          session.callbackTimes.push(ms);
          sampleCost('raf.'+source,ms);
          if(session.callbackTimes.length>18000)session.callbackTimes.shift();
          if(ms>=4){
            const k=source;
            const record=session.slowCallbacks[k]||(session.slowCallbacks[k]={count:0,total:0,max:0});
            record.count++;record.total+=ms;record.max=Math.max(record.max,ms);
          }
        }
      });
    };
  }
  function unwrapRaf(){if(!rafWrapped)return;window.requestAnimationFrame=originalRequestAnimationFrame;rafWrapped=false;}
  // Pointer telemetry is recording-only; avoid per-move DOM reads or writes.
  window.addEventListener('pointermove',e=>{
    if(!session)return;
    const m=session.pointer;
    m.events++;
    if(m.lastX!==null){
      const d=Math.hypot(e.clientX-m.lastX,e.clientY-m.lastY);
      m.distancePx+=d;m.maxStepPx=Math.max(m.maxStepPx,d);
    }
    m.lastX=e.clientX;m.lastY=e.clientY;
  },{passive:true});
  function start(){
    if(session)stop();
    session={start:safeNow(),lastFrame:null,longTasks:[],longFrames:[],layoutShift:0,callbackTimes:[],slowCallbacks:{},hudMutations:0,hudAddedNodes:0,hudAttributeChanges:0,theme:document.body.className,mode:{...modes},startedAnimations:countAnimations(),systems:{},currentFrameCosts:Object.create(null),spikes:[],isolationSkipped:{},timerEvents:[],domEvents:[],domTotals:{},uiSnapshots:[],lastUiSample:-Infinity,initialUI:uiStatus(),combatSnapshots:[],combatInitial:window.MippiCombatLab?.snapshot()||null,cursorInitial:window.MippiCursorLab?.snapshot()||null,fxInitial:window.MippiFxRenderer?.snapshot()||null,pointer:{events:0,distancePx:0,maxStepPx:0,lastX:null,lastY:null},particleInitial:window.MippiParticleRenderer?.snapshot()||null,
      stabilityInitial:window.MippiStabilityLab?.snapshot()||null,sessionAgeMs:Math.round(performance.now())};
    sampledFrames=[];
    const hud=document.getElementById('site-game-hud');
    if(hud&&typeof MutationObserver==='function'){
      hudObserver=new MutationObserver(records=>{
        if(!session)return;
        session.hudMutations+=records.length;
        for(const rec of records){if(rec.type==='childList')session.hudAddedNodes+=rec.addedNodes.length;else session.hudAttributeChanges++;}
      });
      hudObserver.observe(hud,{subtree:true,attributes:true,childList:true,characterData:true});
    }
    watchRegions();
    observerLong=watch('longtask',recordLongTask);
    observerShift=watch('layout-shift',recordShift);
    observerLoaf=watch('long-animation-frame',recordLoaf);
    wrapRaf();rafToken=nativeRaf(captureFrame);
    return 'Recording started. Close the console, perform the same action for 10–20 seconds, then run dev profile stop.';
  }
  let last=null;
  function stop(){
    if(!session)return 'No active recording.';
    last={...session,elapsedMs:safeNow()-session.start,frames:sampledFrames.slice(),endedAnimations:countAnimations(),finalUI:uiStatus(),combatFinal:window.MippiCombatLab?.snapshot()||null,particleFinal:window.MippiParticleRenderer?.snapshot()||null,
      stabilityFinal:window.MippiStabilityLab?.snapshot()||null,cursorFinal:window.MippiCursorLab?.snapshot()||null,fxFinal:window.MippiFxRenderer?.snapshot()||null};
    correlateSpikes(last);
    session=null;cancelAnimationFrame(rafToken);hudObserver?.disconnect();hudObserver=null;regionObservers.forEach(x=>x.disconnect());regionObservers=[];
    for(const observer of [observerLong,observerShift,observerLoaf])observer?.disconnect();
    observerLong=observerShift=observerLoaf=null;unwrapRaf();
    return 'Recording stopped. Run dev profile report.';
  }
  function report(){
    const s=session?{...session,elapsedMs:safeNow()-session.start,frames:sampledFrames.slice(),endedAnimations:countAnimations()}:last;
    if(!s)return ['No recording yet. Use dev profile start.'];
    const times=summaryValues(s.frames),calls=summaryValues(s.callbackTimes);
    const long=s.longTasks.reduce((total,x)=>total+x.duration,0);
    const slow=Object.entries(s.slowCallbacks).sort((a,b)=>b[1].total-a[1].total).slice(0,5).map(([name,v])=>`${name}: ${v.count} x ${v.total.toFixed(1)}ms (max ${v.max.toFixed(1)})`);
    const rafSources=Object.entries(s.systems||{}).filter(([name])=>name.startsWith('raf.')).sort((a,b)=>b[1].total-a[1].total).slice(0,10).map(([name,row])=>`${name.slice(4)}: ${row.count} callbacks / ${row.total.toFixed(1)}ms total / max ${row.max.toFixed(1)}ms`);
    const visibleCount=s.frames.filter(x=>x>=33.3).length;
    const timers=Object.entries(s.systems||{}).filter(([name])=>name.startsWith('timer.')).sort((a,b)=>b[1].total-a[1].total).slice(0,12).map(([name,row])=>`${name.slice(6)}: ${row.count} calls / ${row.total.toFixed(1)}ms / max ${row.max.toFixed(1)}ms`);
    const objectiveSamples=(s.uiSnapshots||[]).filter(x=>x.objectiveVisible).length;
    const groups=Object.entries(s.systems||{}).filter(([name])=>!name.startsWith('raf.')).sort((a,b)=>b[1].total-a[1].total).slice(0,15).map(([name,row])=>{
      const v=summaryValues(row.values||[]);
      return `${name}: ${row.count} calls / ${row.total.toFixed(1)}ms total / p95 ${v.p95}ms / max ${row.max.toFixed(1)}ms`;
    });
    return [
      `PROFILE // ${Math.round(s.elapsedMs/1000)}s // THEME ${s.theme.includes('theme-legendary')?'LEGENDARY':s.theme.includes('theme-complete')?'EPIC':'RARE'} // ${JSON.stringify(s.mode)}`,
      `FRAME // ${times.count} samples // avg ${times.avg}ms // p50 ${times.p50} // p95 ${times.p95} // p99 ${times.p99} // max ${times.max}`,
      `FRAME STALLS // >=33ms ${visibleCount} (${times.count?Math.round(100*visibleCount/times.count):0}%) // >=50ms ${s.frames.filter(x=>x>=50).length} // >=100ms ${s.frames.filter(x=>x>=100).length}`,
      `RAF CALLBACKS // avg ${calls.avg}ms // p95 ${calls.p95} // max ${calls.max}ms // ${calls.count} timed callbacks`,
      `LONG TASKS // ${s.longTasks.length} // ${long.toFixed(1)}ms total // max ${Math.max(0,...s.longTasks.map(x=>x.duration)).toFixed(1)}ms`,
      `LONG ANIMATION FRAMES // ${s.longFrames.length} // max ${Math.max(0,...s.longFrames.map(x=>x.duration)).toFixed(1)}ms`,
      `HUD MUTATIONS // ${s.hudMutations} records / ${s.hudAddedNodes} nodes / ${s.hudAttributeChanges} attr changes`,
      `JS HEAP // ${performance.memory?.usedJSHeapSize?Math.round(performance.memory.usedJSHeapSize/(1024*1024))+' MiB (current)': 'not exposed by this browser'}`,
      `CSS ANIMATIONS // running ${s.startedAnimations} at start / ${s.endedAnimations} at end // layout shift ${s.layoutShift.toFixed(3)}`,
      ...(slow.length?['SLOW RAF CALLBACKS // '+slow.join(' | ')]:[]),
      'SYSTEM COSTS // '+(groups.length?groups.join(' | '):'No instrumented subsystem activity in this sample'),
      'RAF SOURCES // '+(rafSources.length?rafSources.join(' | '):'No rAF callbacks measured'),
      'TIMERS // '+(timers.length?timers.join(' | '):'No timer callbacks recorded'),
      'COMBAT // '+JSON.stringify(s.combatFinal||s.combatInitial||{}) ,
      'COMBAT VISUAL // '+JSON.stringify(s.combatFinal?.visualModes||s.combatInitial?.visualModes||{}),
      'STABILITY // '+JSON.stringify(s.stabilityFinal||s.stabilityInitial||{}),
      'CURSOR LAB // '+JSON.stringify(s.cursorInitial||{})+' // FINAL '+JSON.stringify(s.cursorFinal||{}),
      '2D FX // '+JSON.stringify(s.fxInitial||{})+' // FINAL '+JSON.stringify(s.fxFinal||window.MippiFxRenderer?.snapshot()||{}),
      'POINTER // '+JSON.stringify({events:s.pointer?.events||0,distancePx:Math.round(s.pointer?.distancePx||0),maxStepPx:Math.round(s.pointer?.maxStepPx||0)}),
      'PARTICLE RENDERER // '+(s.combatFinal?.rendererMode||s.combatInitial?.rendererMode||window.MippiCombatLab?.rendererMode?.()||'unknown')+' // '+JSON.stringify(s.particleFinal||s.particleInitial||{}),
      'UI ACTIVITY // objective visible in '+objectiveSamples+'/'+(s.uiSnapshots?.length||0)+' snapshots // '+JSON.stringify(s.domTotals||{})+' DOM mutations by region',
      'LOAF SCRIPTS // '+((s.longFrames||[]).flatMap(f=>f.scripts||[]).sort((a,b)=>b.durationMs-a.durationMs).slice(0,5).map(x=>`${x.sourceFunctionName||'anonymous'} @ ${x.sourceURL.split('/').pop()||'unknown'} ${x.durationMs}ms`).join(' | ')||'No Chromium script attribution available'),
      `FRAME SPIKES // ${s.spikes?.length||0} spikes >=33.3ms; exported JSON includes per-spike subsystem costs`,
      'ISOLATION SKIPS // '+JSON.stringify(s.isolationSkipped||{}),
      'TIP // RAF frame rate is not GPU-present FPS. Compare p95/p99 stalls across matching runs, alongside visual smoothness.',
      'TIP // Compare identical 15s runs with HUD / HUD FX / THEME FX / CURSOR FX isolated.'
    ];
  }
  function exportData(){
    const data=session?{...session,elapsedMs:safeNow()-session.start,frames:sampledFrames.slice(),endedAnimations:countAnimations()}:last;
    if(!data)return 'No recording to export. Run dev profile sample 15 first.';
    const selectedTheme=data.theme.includes('theme-legendary')?'legendary':data.theme.includes('theme-complete')?'epic':'rare';
    // Self-describing, unique filenames prevent one A/B recording silently
    // overwriting another. The mode and visual flags are also in raw.combatFinal.
    const experiment=data.combatFinal||data.combatInitial||{};
    const disabled=Object.entries(experiment.visualModes||{}).filter(([,v])=>v==='off').map(([k])=>k);
    const testLabel=[experiment.mode||'manual',`geo-${experiment.geometryMode||'na'}`,
      `renderer-${experiment.rendererMode||window.MippiCombatLab?.rendererMode?.()||'unknown'}`,
      `visual-${disabled.length?disabled.join('-'):'default'}`,
      `cursor-${(data.cursorInitial?.visualLevel??'na')}-${data.cursorInitial?.architecture||'legacy'}-${data.cursorInitial?.style||'unknown'}-${data.cursorInitial?.native||'unknown'}`,`fx-${data.fxInitial?.mode||'dom'}`].join('-');
    const timestamp=new Date().toISOString().replace(/[-:]/g,'').replace(/\.\d{3}Z$/,'Z').replace('T','-');
    const payload={version:window.MIPPI_BUILD_VERSION||'3.02',diagnosticHarness:'v3.02',capturedAt:new Date().toISOString(),testLabel,viewport:{width:window.innerWidth,height:window.innerHeight,dpr:window.devicePixelRatio},
      userAgent:navigator.userAgent,summary:report(),raw:{...data,slowCallbacks:data.slowCallbacks}};
    correlateSpikes(payload.raw);
    const blob=new Blob([JSON.stringify(payload,null,2)],{type:'application/json'});
    const url=URL.createObjectURL(blob);
    const link=document.createElement('a');link.href=url;
    link.download=`mippi-profile-v${window.MIPPI_BUILD_VERSION||"3.02"}-${selectedTheme}-${testLabel}-${timestamp}.json`;
    document.body.appendChild(link);link.click();link.remove();
    window.setTimeout(()=>URL.revokeObjectURL(url),1000);
    return `Downloaded ${link.download}. Upload this file for an exact comparison.`;
  }
  function configure(key,value){
    if(!Object.hasOwn(modes,key))return `Unknown isolate ${key}.`;
    if(value!=='on'&&value!=='off')return `Use dev profile ${key} on or off.`;
    modes[key]=value;
    const cls={hud:'profile-hide-hud',hudfx:'profile-no-hudfx',themefx:'profile-no-themefx',cursorfx:'profile-no-cursorfx',ambient:'profile-hide-ambient'}[key];
    if(cls)html.classList.toggle(cls,value==='off');
    return `${key.toUpperCase()} ${value.toUpperCase()} // ${key==='hud'?'Console remains accessible with ~.': 'Restore with on.'}`;
  }
  function resetModes(){for(const key of Object.keys(modes))configure(key,'on');window.MippiCombatLab?.visual('all','on');return 'All profiling and combat visual isolates restored to ON. Combat geometry mode is unchanged.';}
  function startup(){
    const fcp=paintEntries().find(x=>x.name==='first-contentful-paint')?.ms;
    const navigation=performance.getEntriesByType('navigation')[0];
    return [
      `BOOT // HUD mounted ${boot.hudMount===null?'NOT YET':boot.hudMount.toFixed(1)+'ms'} after navigation // legacy HUD hidden before paint ${boot.oldControlsHiddenInitially?'YES':'NO'}`,
      `BOOT // FCP ${fcp??'pending'}ms // DOM loaded ${navigation?.domContentLoadedEventEnd?.toFixed(1)??'?'}ms // page loaded ${navigation?.loadEventEnd?.toFixed(1)??'?'}ms`,
      `BOOT // HUD reparented controls ${boot.mountMutations??'?'} // mount duration ${boot.mountDuration?.toFixed(1)??'?'}ms // one-time move, not a second live HUD`
    ];
  }
  function lastMetrics(){
    if(!last)return null;
    const frame=summaryValues(last.frames);
    return {frames:frame.count,avgIntervalMs:frame.avg,p95IntervalMs:frame.p95,
      longTasks:last.longTasks.length,longTaskMs:last.longTasks.reduce((a,b)=>a+b.duration,0)};
  }
  const api={start,stop,report,startup,exportData,configure,resetModes,run,measure,enabled,skip,lastMetrics,get active(){return !!session;},get modes(){return {...modes};},
    markHudMounted(details={}){boot.hudMount=safeNow();boot.mountMutations=details.movedControls??null;boot.mountDuration=details.durationMs??null;html.classList.remove('hud-pending');},
    help(){return [
      'dev profile sample 15         // close console and auto-record 15 seconds',
      'dev profile start | stop | report | boot | reset | export',
      'v2.99 // Canvas-first cursor / star / Doug / command particle FX; DOM A/B retained.',
      'dev stability help             // long-session sample / soak tests and export',
      'v3.00 // Crisp Canvas FX, supplied SVG game art, and preserved DOM fallback.',
      'dev fx help | status | renderer canvas/dom | reset',
      'dev profile hud off/on       // hide the dock (CSS render cost)',
      'dev profile hudfx off/on     // disable dock CSS animations/glows',
      'dev profile themefx off/on   // disable cosmetic page/theme filters and animated glows',
      'dev profile cursorfx off/on  // disable all cosmetic cursor spark emissions',
      'dev cursor help                // granular size/style/glow/trail diagnostics',
      'dev profile ambient off/on   // hide ambient WebGL canvas',
      'dev profile hero off/on      // pause Hero Three.js update and render',
      'dev profile about off/on     // pause About Three.js update and render',
      'dev profile ambientlogic off/on // pause Ambient Three.js update and render',
      'dev profile projectiles off/on  // pause Legendary shot updates (no progress reset)',
      'dev profile hudlogic off/on // pause selected HUD update functions (temporary stale displays)',
      'dev profile objectiveclock off/on // stop only the 200ms objective clock text writes for comparison',
      'PROFILE WORKFLOW // For natural gameplay sample 15-30 seconds. For repeatable combat use dev combat run <mode> 30.'
    ];}
  };
  window.MippiPerfLab=api;
  window.setTimeout(()=>{if(html.classList.contains('hud-pending')){html.classList.remove('hud-pending');console.warn('Unified HUD did not initialize; restoring legacy controls.');}},4500);
})();
