/* v3.02 // One movement clock for authored screen-space spawn paths.
   No per-object RAF loops, CSS motion timelines or per-frame layout reads.
   Moving world coordinates are shared with gameplay hit tests. */
(()=>{
  'use strict';
  const actors=new Map();
  let raf=0,last=0,slowmo=false,frame=0;
  const ground=()=>Math.max(90,innerHeight-(document.getElementById('site-game-hud')?.getBoundingClientRect().height||54));
  const viewport=()=>({w:innerWidth,h:innerHeight,ground:ground()});
  const clamp=(n,a,b)=>Math.max(a,Math.min(b,n));
  const smooth=t=>t*t*(3-2*t);
  const blend=(a,b,t)=>a+(b-a)*t;
  let stats={created:0,finished:0,maxActive:0,frames:0};
  let rectCache=new WeakMap();
  function resetRectCache(){rectCache=new WeakMap();}
  window.addEventListener('scroll',resetRectCache,true);
  window.addEventListener('resize',resetRectCache,{passive:true});
  function panelRect(panel,now){
    const old=rectCache.get(panel);
    if(old&&now-old.time<16)return old;
    const r=panel.getBoundingClientRect();
    const next={left:r.left,top:r.top,width:r.width,height:r.height,time:now};
    rectCache.set(panel,next);return next;
  }
  function positionOf(el){
    const a=actors.get(el);if(!a)return null;
    if(a.panel){
      if(!a.panel.isConnected)return null;
      const r=panelRect(a.panel,performance.now());
      return {x:r.left+a.x,y:r.top+a.y,vx:a.vx,vy:a.vy,time:performance.now()};
    }
    return {x:a.x,y:a.y,vx:a.vx,vy:a.vy,time:performance.now()};
  }
  function stop(el,{finish=false}={}){
    const a=actors.get(el);
    if(!a)return;
    actors.delete(el);
    if(finish&&a.onEnd){stats.finished++;a.onEnd();}
  }
  function expire(el,onRemoved){
    if(!el || !el.isConnected){onRemoved?.();return false;}
    stop(el);
    if(el.dataset.expiring==='1')return false;
    el.dataset.expiring='1';
    el.style.removeProperty('animation');
    el.classList.add('mippi-despawning');
    el.style.pointerEvents='none';
    window.setTimeout(()=>{el.remove();onRemoved?.();},380);
    return true;
  }
  function render(now){
    raf=0;
    const start=performance.now();
    const dt=Math.min(50,Math.max(0,last?now-last:16.67));last=now;
    const screen=viewport();
    for(const [el,a] of actors){
      if(!el.isConnected){stop(el);continue;}
      if(a.panel&&!a.panel.isConnected){stop(el,{finish:true});continue;}
      a.elapsed+=dt*(slowmo?.5:1);
      const progress=clamp(a.elapsed/a.duration,0,1);
      if(progress>=1){stop(el,{finish:true});continue;}
      const anchor=a.panel?panelRect(a.panel,now):null;
      const point=a.step({t:a.elapsed/1000,progress,elapsed:a.elapsed,
        dt:dt/1000,viewport:screen,panelSize:anchor,smooth,blend,clamp});
      if(!point)continue;
      a.vx=(point.x-a.x)/Math.max(.001,dt);
      a.vy=(point.y-a.y)/Math.max(.001,dt);
      a.x=point.x;a.y=point.y;
      const rotation=point.angle||0;
      // Render panel-anchored sprites in the page overlay, not in the panel.
      const drawX=a.x+(anchor?.left||0),drawY=a.y+(anchor?.top||0);
      el.style.transform='translate3d('+(drawX-a.width*.5)+'px,'+(drawY-a.height*.5)+'px,0) rotate('+rotation+'deg)';
    }
    stats.frames++;frame++;
    window.MippiPerfLab?.measure('ambient.motion.frame',performance.now()-start);
    if(actors.size)raf=requestAnimationFrame(render);
    else last=0;
  }
  function register(el,{duration=8000,width=64,height=64,step,onEnd,panel=null}={}){
    if(!el||typeof step!=='function')return null;
    stop(el);
    el.classList.add('mippi-motion');
    el.style.setProperty('animation','none','important');
    el.style.position='fixed';
    el.style.left='0px';el.style.top='0px';
    const a={elapsed:0,duration:Math.max(100,duration),x:0,y:0,vx:0,vy:0,
      width,height,step,onEnd,panel};
    actors.set(el,a);
    stats.created++;stats.maxActive=Math.max(stats.maxActive,actors.size);
    if(!raf)raf=requestAnimationFrame(render);
    return ()=>stop(el);
  }
  function snapshot(){return {active:actors.size,rafActive:!!raf,slowmo,...stats};}
  window.MippiSpawnMotion=Object.freeze({register,stop,expire,positionOf,ground,viewport,
    setSlowmo:value=>{slowmo=!!value;},snapshot});
})();