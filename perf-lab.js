/* v2.87 // Temporary QA-only performance lab. No sampling runs until `dev profile start`.
   Designed for re-use, unchanged, in v2.78 for an apples-to-apples baseline. */
(()=>{
  'use strict';
  const html=document.documentElement;
  const nativeRaf=window.requestAnimationFrame.bind(window);
  const originalRequestAnimationFrame=window.requestAnimationFrame;
  const boot={scriptStart:performance.now(),hudMount:null,oldControlsHiddenInitially:html.classList.contains('hud-pending')};
  const modes={hud:'on',hudfx:'on',themefx:'on',cursorfx:'on',ambient:'on'};
  let session=null;
  let sampledFrames=[],rafToken=0,observations=[],hudObserver=null,rafWrapped=false;
  let observerLong=null,observerShift=null,observerLoaf=null;
  let realRaf=null;
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
    const prior=session.lastFrame;
    if(prior!==null)sampledFrames.push(ts-prior);
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
      session.longFrames.push({duration:e.duration,blocking:e.blockingDuration||0,at:e.startTime});
      if(session.longFrames.length>300)session.longFrames.shift();
    }
  }
  function watch(type,handler){
    if(!PerformanceObserver.supportedEntryTypes?.includes(type))return null;
    try{const po=new PerformanceObserver(handler);po.observe({type,buffered:false});return po;}catch(_){return null;}
  }
  function wrapRaf(){
    if(rafWrapped)return;
    rafWrapped=true;
    window.requestAnimationFrame=function(callback){
      if(!session)return originalRequestAnimationFrame.call(window,callback);
      return originalRequestAnimationFrame.call(window,function(t){
        const st=safeNow();
        try{return callback(t);}finally{
          if(!session)return;
          const ms=safeNow()-st;
          session.callbackTimes.push(ms);
          if(session.callbackTimes.length>18000)session.callbackTimes.shift();
          if(ms>=4){
            const k=callback.name||'(anonymous)';
            const record=session.slowCallbacks[k]||(session.slowCallbacks[k]={count:0,total:0,max:0});
            record.count++;record.total+=ms;record.max=Math.max(record.max,ms);
          }
        }
      });
    };
  }
  function unwrapRaf(){if(!rafWrapped)return;window.requestAnimationFrame=originalRequestAnimationFrame;rafWrapped=false;}
  function start(){
    if(session)stop();
    session={start:safeNow(),lastFrame:null,longTasks:[],longFrames:[],layoutShift:0,callbackTimes:[],slowCallbacks:{},hudMutations:0,hudAddedNodes:0,hudAttributeChanges:0,theme:document.body.className,mode:{...modes},startedAnimations:countAnimations()};
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
    observerLong=watch('longtask',recordLongTask);
    observerShift=watch('layout-shift',recordShift);
    observerLoaf=watch('long-animation-frame',recordLoaf);
    wrapRaf();rafToken=nativeRaf(captureFrame);
    return 'Recording started. Close the console, perform the same action for 10–20 seconds, then run dev profile stop.';
  }
  let last=null;
  function stop(){
    if(!session)return 'No active recording.';
    last={...session,elapsedMs:safeNow()-session.start,frames:sampledFrames.slice(),endedAnimations:countAnimations()};
    session=null;cancelAnimationFrame(rafToken);hudObserver?.disconnect();hudObserver=null;
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
    const visibleCount=s.frames.filter(x=>x>=33.3).length;
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
      'TIP // RAF frame rate is not GPU-present FPS. Compare p95/p99 stalls across matching runs, alongside visual smoothness.',
      'TIP // Compare identical 15s runs with HUD / HUD FX / THEME FX / CURSOR FX isolated.'
    ];
  }
  function exportData(){
    const data=session?{...session,elapsedMs:safeNow()-session.start,frames:sampledFrames.slice(),endedAnimations:countAnimations()}:last;
    if(!data)return 'No recording to export. Run dev profile sample 15 first.';
    const selectedTheme=data.theme.includes('theme-legendary')?'legendary':data.theme.includes('theme-complete')?'epic':'rare';
    const payload={version:'2.87',capturedAt:new Date().toISOString(),viewport:{width:window.innerWidth,height:window.innerHeight,dpr:window.devicePixelRatio},
      userAgent:navigator.userAgent,summary:report(),raw:{...data,slowCallbacks:data.slowCallbacks}};
    const blob=new Blob([JSON.stringify(payload,null,2)],{type:'application/json'});
    const url=URL.createObjectURL(blob);
    const link=document.createElement('a');link.href=url;
    link.download=`mippi-profile-v2.87-${selectedTheme}.json`;
    document.body.appendChild(link);link.click();link.remove();
    window.setTimeout(()=>URL.revokeObjectURL(url),1000);
    return `Downloaded ${link.download}. Upload this file for an exact comparison.`;
  }
  function configure(key,value){
    if(!Object.hasOwn(modes,key))return `Unknown isolate ${key}.`;
    if(value!=='on'&&value!=='off')return `Use dev profile ${key} on or off.`;
    modes[key]=value;
    const cls={hud:'profile-hide-hud',hudfx:'profile-no-hudfx',themefx:'profile-no-themefx',cursorfx:'profile-no-cursorfx',ambient:'profile-hide-ambient'}[key];
    html.classList.toggle(cls,value==='off');
    return `${key.toUpperCase()} ${value.toUpperCase()} // ${key==='hud'?'Console remains accessible with ~.': 'Restore with on.'}`;
  }
  function resetModes(){for(const key of Object.keys(modes))configure(key,'on');return 'All profiling isolates restored to ON.';}
  function startup(){
    const fcp=paintEntries().find(x=>x.name==='first-contentful-paint')?.ms;
    const navigation=performance.getEntriesByType('navigation')[0];
    return [
      `BOOT // HUD mounted ${boot.hudMount===null?'NOT YET':boot.hudMount.toFixed(1)+'ms'} after navigation // legacy HUD hidden before paint ${boot.oldControlsHiddenInitially?'YES':'NO'}`,
      `BOOT // FCP ${fcp??'pending'}ms // DOM loaded ${navigation?.domContentLoadedEventEnd?.toFixed(1)??'?'}ms // page loaded ${navigation?.loadEventEnd?.toFixed(1)??'?'}ms`,
      `BOOT // HUD reparented controls ${boot.mountMutations??'?'} // mount duration ${boot.mountDuration?.toFixed(1)??'?'}ms // one-time move, not a second live HUD`
    ];
  }
  const api={start,stop,report,startup,exportData,configure,resetModes,get active(){return !!session;},get modes(){return {...modes};},
    markHudMounted(details={}){boot.hudMount=safeNow();boot.mountMutations=details.movedControls??null;boot.mountDuration=details.durationMs??null;html.classList.remove('hud-pending');},
    help(){return [
      'dev profile sample 15         // close console and auto-record 15 seconds',
      'dev profile start | stop | report | boot | reset | export',
      'dev profile hud off/on       // hide the dock (CSS render cost)',
      'dev profile hudfx off/on     // disable dock CSS animations/glows',
      'dev profile themefx off/on   // disable cosmetic page/theme filters and animated glows',
      'dev profile cursorfx off/on  // disable cursor spark DOM creation',
      'dev profile ambient off/on   // hide ambient WebGL canvas',
      'PROFILE WORKFLOW // Record 10-20 seconds of normal use. Close Console during recordings; opening Console itself can pause gameplay.'
    ];}
  };
  window.MippiPerfLab=api;
  window.setTimeout(()=>{if(html.classList.contains('hud-pending')){html.classList.remove('hud-pending');console.warn('Unified HUD did not initialize; restoring legacy controls.');}},4500);
})();
