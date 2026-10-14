/* v2.94 // Shared Canvas2D explosion particle renderer.
   The authored DOM/CSS arcade-burst path is retained in script.js for A/B testing.
   Cosmetic only: never changes hit tests, damage, achievements or progression. */
(()=>{
  'use strict';
  let canvas=null,ctx=null,raf=0,lastFrame=0;
  const particles=[];
  const totals={bursts:0,spawned:0,expired:0,frames:0,drawn:0,maxActive:0,rafMs:0,maxFrameMs:0};
  let sizeW=0,sizeH=0,dpr=1;
  // CSS ease-out: cubic-bezier(0,0,.58,1). Lookup keeps 100+ particles inexpensive.
  const ease=new Float32Array(257);
  for(let i=0;i<ease.length;i++){
    const x=i/256;
    let low=0,high=1,t=x;
    for(let n=0;n<13;n++){
      t=(low+high)*.5;
      const u=1-t,bx=3*u*t*t*.58+t*t*t;
      if(bx<x)low=t;else high=t;
    }
    const u=1-t;
    ease[i]=3*u*t*t+t*t*t;
  }
  const perf=(label,ms)=>window.MippiPerfLab?.measure(label,ms);
  const visible=()=>window.MippiCombatVisuals?.enabled('explosionpaint')!==false &&
                     window.MippiCombatVisuals?.enabled('explosions')!==false;
  function dimensions(){
    if(!canvas)return;
    const w=Math.max(1,innerWidth|0),h=Math.max(1,innerHeight|0);
    const ratio=Math.max(1,Math.min(2,Number(devicePixelRatio)||1));
    if(w===sizeW&&h===sizeH&&ratio===dpr)return;
    sizeW=w;sizeH=h;dpr=ratio;
    canvas.width=Math.ceil(w*dpr);canvas.height=Math.ceil(h*dpr);
    canvas.style.width=w+'px';canvas.style.height=h+'px';
  }
  function attach(){
    if(canvas)return;
    canvas=document.createElement('canvas');
    canvas.className='mippi-particle-canvas';
    canvas.setAttribute('aria-hidden','true');
    canvas.style.cssText='position:fixed;inset:0;pointer-events:none;z-index:70;display:block;';
    ctx=canvas.getContext('2d',{alpha:true,desynchronized:true});
    if(!ctx){canvas=null;return;}
    document.body.appendChild(canvas);
    dimensions();
  }
  function detach(){
    if(canvas){canvas.remove();canvas=null;ctx=null;sizeW=sizeH=0;}
  }
  function draw(now){
    raf=0;
    if(!canvas||!ctx)return;
    const begin=performance.now();
    dimensions();
    ctx.setTransform(1,0,0,1,0,0);
    ctx.clearRect(0,0,canvas.width,canvas.height);
    const show=visible();
    let drawn=0;
    // Swap deletion avoids per-particle timers and preserves O(active particles) work.
    for(let i=particles.length-1;i>=0;i--){
      const p=particles[i],progress=(now-p.born)/p.lifetime;
      if(progress>=1){particles[i]=particles[particles.length-1];particles.pop();totals.expired++;continue;}
      if(progress<0||!show)continue;
      const j=Math.min(255,Math.max(0,progress*256|0)),f=progress*256-j;
      const k=ease[j]+(ease[j+1]-ease[j])*f;
      const angle=Math.PI*k,scale=1-.8*k;
      const c=Math.cos(angle)*scale*dpr,s=Math.sin(angle)*scale*dpr;
      const cx=(p.x+p.size*.5+p.dx*k)*dpr,cy=(p.y+p.size*.5+p.dy*k)*dpr;
      ctx.setTransform(c,s,-s,c,cx,cy);
      ctx.globalAlpha=1-k;
      ctx.fillStyle=p.color;
      ctx.fillRect(-p.size*.5,-p.size*.5,p.size,p.size);
      drawn++;
    }
    totals.frames++;totals.drawn+=drawn;
    ctx.globalAlpha=1;
    ctx.setTransform(1,0,0,1,0,0);
    const ms=performance.now()-begin;
    totals.rafMs+=ms;totals.maxFrameMs=Math.max(totals.maxFrameMs,ms);
    perf('combat.particles.canvasFrame',ms);
    if(particles.length){raf=requestAnimationFrame(draw);}else{detach();}
  }
  function burst(x,y,count,size,{radiusX=150,radiusY=120,lifetime=850}={},colors){
    const start=performance.now();
    if(!canvas)attach();
    if(!canvas)return false; // Browser without 2D Canvas must use the DOM fallback.
    const born=performance.now();
    const n=Math.max(0,Math.round(count));
    for(let i=0;i<n;i++){
      particles.push({x,y,size,dx:(Math.random()-.5)*radiusX,
        dy:(Math.random()-.5)*radiusY,lifetime:Math.max(1,lifetime),
        color:colors[i%colors.length],born});
    }
    totals.bursts++;totals.spawned+=n;totals.maxActive=Math.max(totals.maxActive,particles.length);
    perf('combat.particles.canvasSpawn',performance.now()-start);
    if(!raf)raf=requestAnimationFrame(draw);
    return true;
  }
  function clear(){
    if(raf){cancelAnimationFrame(raf);raf=0;}
    totals.expired+=particles.length;particles.length=0;
    detach();
  }
  function snapshot(){return {active:particles.length,canvasMounted:!!canvas,
    totals:{...totals},sessionAgeMs:Math.round(performance.now())};}
  window.MippiParticleRenderer=Object.freeze({burst,clear,snapshot,get active(){return particles.length;}});
})();
