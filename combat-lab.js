/* v2.97 // Persistent, opt-in combat benchmarking and visual-isolation lab.
   Runs actual player/UFO projectile and explosion code against disposable targets.
   No progress, economy, achievements, wish or boss states are changed. */
(()=>{
  'use strict';
  const KINDS=['idle','player','ufo','combined','explosions'];
  // Canvas is production default. DOM is a diagnostic A/B fallback.
  let currentRenderer='canvas';
  const rendererMode=()=>currentRenderer;
  function renderer(value){
    const key=String(value||'').toLowerCase();
    if(!key||key==='status')return 'COMBAT RENDERER // '+currentRenderer.toUpperCase()+' // use dev combat renderer canvas/dom';
    if(key!=='canvas'&&key!=='dom')return 'COMBAT RENDERER // Use canvas or dom.';
    if(state)return 'COMBAT RENDERER // Stop the active benchmark before switching.';
    if(key!==currentRenderer){
      window.MippiParticleRenderer?.clear();
      // Existing DOM bursts are disposable cosmetics. Clear before switching
      // so A/B runs cannot inherit effects from the previous renderer.
      document.querySelectorAll('.arcade-pixel').forEach(p=>p.remove());
      currentRenderer=key;
    }
    return 'COMBAT RENDERER // '+currentRenderer.toUpperCase()+' enabled. No progression changed.';
  }

  // Render-only A/B controls. Projectile hides retain DOM + JS movement,
  // whereas explosion emission OFF skips ONLY cosmetic particle node creation.
  // These are deliberately not persisted to localStorage or URL parameters.
  const visualKeys=Object.freeze({
    player:'profile-hide-combat-player',
    ufo:'profile-hide-combat-ufo',
    explosions:'profile-no-combat-explosions',
    explosionpaint:'profile-hide-combat-explosionpaint',
    glow:'profile-no-combat-glow'
  });
  const visualModes=Object.fromEntries(Object.keys(visualKeys).map(k=>[k,'on']));
  const visualSnapshot=()=>({...visualModes});
  function visualEnabled(key){return visualModes[key]!=='off';}
  function visual(key,value){
    key=String(key||'').toLowerCase();value=String(value||'').toLowerCase();
    if(!key||key==='status')return 'COMBAT VISUAL // '+JSON.stringify(visualSnapshot());
    if(!Object.hasOwn(visualKeys,key)&&key!=='all')return 'COMBAT VISUAL // Unknown isolate. Use player, ufo, explosions, explosionpaint, glow, or all.';
    if(value!=='on'&&value!=='off')return 'COMBAT VISUAL // Use dev combat visual '+key+' on/off.';
    if(state)return 'COMBAT VISUAL // Stop the current benchmark before changing visual isolates.';
    const keys=key==='all'?Object.keys(visualKeys):[key];
    for(const name of keys){visualModes[name]=value;document.documentElement.classList.toggle(visualKeys[name],value==='off');}
    return 'COMBAT VISUAL // '+(key==='all'?'ALL':key.toUpperCase())+' '+value.toUpperCase()+' // '+JSON.stringify(visualSnapshot());
  }
  window.MippiCombatVisuals=Object.freeze({enabled:visualEnabled,snapshot:visualSnapshot,visual});

  const perf=()=>window.MippiPerfLab;
  const hooks=()=>window.MippiCombatHooks;
  let state=null,last=null;
  let timers=[],finishTimer=0,startTimer=0,stage=null,targets=[],ships=[];
  const metrics=()=>({playerSpawn:0,playerCleanup:0,playerHit:0,ufoSpawn:0,ufoCleanup:0,explosions:0,particles:0,
    effectCalls:0,effectElementsRequested:0,effectElementsEmitted:0,effectElementsSuppressed:0,effectDomParticles:0,effectCanvasParticles:0});
  function snapshot(){
    const s=state||last;
    if(!s)return {active:false,mode:'none'};
    return {active:!!state,geometryMode:s.geometryMode||hooks()?.geometryMode(),visualModes:s.visualModes||visualSnapshot(),rendererMode:s.rendererMode||currentRenderer,particleRenderer:window.MippiParticleRenderer?.snapshot()||null,mode:s.mode,seconds:s.seconds,elapsedSec:+Math.min(s.seconds,(performance.now()-s.started)/1000).toFixed(1),
      counters:{...s.counters},activePlayer:state?Math.max(0,s.counters.playerSpawn-s.counters.playerCleanup):0,
      activeUfo:state?Math.max(0,s.counters.ufoSpawn-s.counters.ufoCleanup):0,
      ...(state?{}:{remainingAtStop:{player:Math.max(0,s.counters.playerSpawn-s.counters.playerCleanup),ufo:Math.max(0,s.counters.ufoSpawn-s.counters.ufoCleanup)}}),samples:s.samples?.length||0,
      liveDom:s.liveDom||null,peakDom:s.peakDom||null,
      peakActivePlayer:s.peakActivePlayer||0,peakActiveUfo:s.peakActiveUfo||0};
  }
  function note(kind,n=1){if(state && Object.hasOwn(state.counters,kind))state.counters[kind]+=n;}
  function removeStage(){
    timers.forEach(id=>clearInterval(id));timers=[];
    if(finishTimer){clearTimeout(finishTimer);finishTimer=0;}
    if(startTimer){clearTimeout(startTimer);startTimer=0;}
    stage?.remove();stage=null;targets=[];ships=[];
    hooks()?.cleanup();
  }
  function buildStage(mode){
    if(!['player','ufo','combined','explosions'].includes(mode))return;
    stage=document.createElement('div');stage.id='combat-lab-stage';stage.setAttribute('aria-hidden','true');
    stage.style.cssText='position:fixed;inset:0;pointer-events:none;z-index:42;overflow:hidden;';
    document.body.appendChild(stage);
    if(mode==='player'||mode==='combined'){
      for(let i=0;i<4;i++){
        const target=document.createElement('button');
        target.className='shooting-star combat-lab-target';target.type='button';
        target.dataset.combatLab='1';target.tabIndex=-1;
        const x=(.33+(i%2)*.33)*innerWidth,y=(.21+Math.floor(i/2)*.16)*innerHeight;
        target.style.cssText=`position:fixed;left:${x}px;top:${y}px;width:38px;height:38px;transform:translate(-50%,-50%);animation:combat-lab-drift ${2.8+i*.2}s ease-in-out infinite alternate;pointer-events:none;opacity:.85;`;
        target.addEventListener('click',()=>{if(!state)return; const p=hooks()?.effectCenter(target);if(p)hooks()?.explosion(p.x,p.y,6,5,{lifetime:480});});
        stage.appendChild(target);hooks()?.registerLabTarget(target,x,y,2.8+i*.2);targets.push(target);
      }
    }
    if(mode==='ufo'||mode==='combined'){
      for(let i=0;i<6;i++){
        const ship=document.createElement('div');ship.className='combat-lab-ship';ship.dataset.combatLab='1';
        const x=(.12+(i%3)*.36)*innerWidth,y=(.14+Math.floor(i/3)*.2)*innerHeight;
        ship.style.cssText=`position:fixed;left:${x}px;top:${y}px;width:40px;height:30px;border-radius:50%;border:2px solid #67d7ff;box-shadow:0 0 10px #41a3ff;transform:translate(-50%,-50%);background:rgba(30,83,171,.3);pointer-events:none;`;
        stage.appendChild(ship);hooks()?.registerLabEmitter(ship,x,y);ships.push(ship);
      }
    }
  }
  function produce(mode){
    const h=hooks();if(!h||!state)return;
    if(mode==='player'||mode==='combined'){
      let idx=0;
      timers.push(setInterval(()=>{
        if(!state||!targets.length)return;
        // Vertical, deliberately aimed volleys now exercise the real projectile
        // collision path. Lab targets remain disposable and progression-safe.
        const x=innerWidth*(.33+((idx%2)*.33)),y=innerHeight*.82;
        h.playerFire(x,y,{lab:true});idx++;
      },95));
    }
    if(mode==='ufo'||mode==='combined'){
      let idx=0;
      timers.push(setInterval(()=>{
        if(!state||!ships.length)return;
        // Batch all four geometry reads BEFORE inserting any new shot DOM.
        // This is a real production hook and a measurable A/B difference.
        h.prepareVolley?.(Array.from({length:4},(_,n)=>ships[(idx+n)%ships.length]));
        for(let n=0;n<4;n++){
          const ship=ships[(idx+n)%ships.length];
          const ox=(idx+n)%2===0?310:-310;
          h.hostileFire(ship,{offsetX:ox,offsetY:((idx+n)%3-1)*210});
        }
        idx++;
      },240));
    }
    if(mode==='explosions'){
      let idx=0;
      timers.push(setInterval(()=>{
        if(!state)return;
        const x=innerWidth*(.24+(idx%4)*.17),y=innerHeight*(.29+(Math.floor(idx/4)%2)*.26);
        const count=28;note('explosions');note('particles',count);
        h.explosion(x,y,count,8,{radiusX:250,radiusY:190,lifetime:800});idx++;
      },190));
    }
    timers.push(setInterval(()=>{
      if(!state)return;
      const dom={player:document.querySelectorAll('.legendary-player-projectile').length,
        ufo:document.querySelectorAll('.ufo-projectile').length,explosion:document.querySelectorAll('.arcade-pixel').length,
        canvasParticles:window.MippiParticleRenderer?.active||0};
      state.liveDom=dom;
      for(const name of Object.keys(dom))state.peakDom[name]=Math.max(state.peakDom[name],dom[name]);
      const sample={atSec:+((performance.now()-state.started)/1000).toFixed(2),...snapshot(),liveParticles:dom.explosion+dom.canvasParticles};
      state.samples.push(sample);state.peakActivePlayer=Math.max(state.peakActivePlayer,sample.activePlayer);state.peakActiveUfo=Math.max(state.peakActiveUfo,sample.activeUfo);
    },1000));
  }
  function run(mode='idle',seconds=30,{closeConsole}={}){
    if(!KINDS.includes(mode))return `COMBAT // Unknown test ${mode}. Use ${KINDS.join(', ')}.`;
    if(state||startTimer)return 'COMBAT // A test is already running or queued. Use dev combat stop.';
    if(!hooks()||!perf())return 'COMBAT // The production projectile hooks or profiler are unavailable.';
    seconds=Math.max(10,Math.min(45,Math.round(Number(seconds)||30)));
    if(perf().active)return 'COMBAT // Stop the current profile before starting an automated test.';
    closeConsole?.();
    startTimer=setTimeout(()=>{
      startTimer=0;
      if(state)return;
      state={mode,seconds,started:performance.now(),geometryMode:hooks().geometryMode(),counters:metrics(),samples:[],peakActivePlayer:0,peakActiveUfo:0,
        visualModes:visualSnapshot(),rendererMode:currentRenderer,sessionAgeMs:Math.round(performance.now()),
        particleStart:window.MippiParticleRenderer?.snapshot()||null,
        peakDom:{player:0,ufo:0,explosion:0,canvasParticles:0},liveDom:{player:0,ufo:0,explosion:0,canvasParticles:0}};
      // Start profiling before creating any test objects; include their creation cost.
      perf().start();buildStage(mode);produce(mode);
      finishTimer=setTimeout(()=>stop(),seconds*1000);
    },400);
    return `COMBAT // ${mode.toUpperCase()} ${seconds}s queued. Console closes automatically. Use dev profile report/export afterward.`;
  }
  function stop(){
    if(!state){
      if(startTimer){clearTimeout(startTimer);startTimer=0;return 'COMBAT // Queued test cancelled before it began.';}
      return 'COMBAT // No active test.';
    }
    // Snapshot before teardown; profile excludes teardown and no progression is saved.
    state.finished=performance.now();state.elapsedSec=+(state.finished-state.started).toFixed(0)/1000;
    last={...state,counters:{...state.counters},samples:state.samples.slice(),
      particleEnd:window.MippiParticleRenderer?.snapshot()||null};
    perf()?.stop();state=null;removeStage();
    return `COMBAT // ${last.mode.toUpperCase()} complete: ${last.counters.playerSpawn} player and ${last.counters.ufoSpawn} hostile shots; ${last.samples.length} workload samples. Use dev profile export.`;
  }
  function report(){
    const s=state||last;
    if(!s)return ['COMBAT // No test yet. Use dev combat run idle 30.'];
    return [
      `COMBAT // ${s.mode.toUpperCase()} // ${s.seconds}s // ${state?'RUNNING':'FINISHED'} // GEOMETRY ${hooks()?.geometryMode()?.toUpperCase()} // RENDERER ${s.rendererMode||currentRenderer} // VISUAL ${JSON.stringify(s.visualModes||{})} // data is local and unpersisted`,
      `PLAYER // spawned ${s.counters.playerSpawn} // cleaned ${s.counters.playerCleanup} // hits ${s.counters.playerHit} // peak active ${s.peakActivePlayer}`,
      `UFO // spawned ${s.counters.ufoSpawn} // cleaned ${s.counters.ufoCleanup} // peak active ${s.peakActiveUfo}`,
      `EXPLOSIONS // test bursts ${s.counters.explosions} // effect calls ${s.counters.effectCalls} // emitted particles ${s.counters.effectElementsEmitted} / requested ${s.counters.effectElementsRequested} // suppressed ${s.counters.effectElementsSuppressed}`,
      `EXPLOSION MODE // ${s.visualModes?.explosions||'on'} // full original particle count is still requested by gameplay`,
      `DOM / CANVAS // peak ${JSON.stringify(s.peakDom||{})} // last sample ${JSON.stringify(s.liveDom||{})}`,
      `PARTICLES // DOM ${s.counters.effectDomParticles||0} / CANVAS ${s.counters.effectCanvasParticles||0} / suppressed ${s.counters.effectElementsSuppressed||0}`,
      `SAMPLES // ${s.samples.length} per-second snapshots; frame intervals and detailed callback timing: dev profile report / dev profile export`
    ];
  }
  function geometry(value){
    if(state)return 'COMBAT GEOMETRY // Stop the current benchmark before switching implementations.';
    if(value!=='on'&&value!=='off')return `COMBAT GEOMETRY // ${hooks()?.geometryMode()?.toUpperCase()||'UNKNOWN'}. Use dev combat geometry on/off.`;
    return `COMBAT GEOMETRY // ${hooks()?.geometryMode(value)?.toUpperCase()}. ${value==='off'?'Original v2.90 path enabled for A/B comparison.':'v2.92 authored motion geometry enabled (no layout reads for tracked flights).'}`;
  }
  function help(){return [
    'COMBAT LAB // Permanent, opt-in technical profiler. No progression rewards or achievements.',
    'dev combat geometry on/off    // toggle known-path targeting vs original v2.90 path',
    'dev combat renderer canvas/dom // shared Canvas2D particles (default) or original DOM/CSS particles',
    'dev combat renderer status     // current particle renderer',
    'dev combat visual status       // report all rendering isolates',
    'dev combat visual player on/off // hide/show player projectile paint; JS/hits continue',
    'dev combat visual ufo on/off    // hide/show UFO projectile paint; JS/collisions continue',
    'dev combat visual explosions on/off // disable/enable ONLY cosmetic explosion DOM emission',
    'dev combat visual explosionpaint on/off // hide/show explosion paint, retain DOM and animations',
    'dev combat visual glow on/off   // remove/restore combat shadows, filters and blend modes',
    'dev combat visual all on       // restore full combat appearance',
    'dev combat run idle 30        // same scene, no synthetic combat',
    'dev combat run player 30      // repeated real player projectiles, disposable moving targets',
    'dev combat run ufo 30         // multiple real UFO projectiles with fixed emitters',
    'dev combat run combined 30    // player + UFO projectiles together',
    'dev combat run explosions 30  // burst/particle stress test',
    'dev combat report | stop | export',
    'CAPTURE // Console closes and the ordinary profiler records automatically; use dev profile export to download JSON.',
    'TEST RULE // Keep viewport, theme, browser zoom, and scroll position constant. Move the cursor only when intentionally benchmarking motion; use a comparable path each run.',
    'SAFETY // Disposable scene targets cannot award Rupees, Hearts, Invasion, Wish charge, or achievements.'
  ];}
  window.MippiCombatLab=Object.freeze({run,stop,report,help,geometry,renderer,rendererMode,visual,note,snapshot,get active(){return !!state;},get last(){return last;}});
})();
