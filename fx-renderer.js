/* v2.99 // Cosmetic Canvas-first high-frequency 2D FX.
   Shared, auto-detaching Canvas layers replace transient DOM sprites by default.
   The original DOM paths in script.js remain available via `dev fx renderer dom`.
   This module never owns hit testing, progression, or gameplay state. */
(()=>{
  'use strict';
  let mode='canvas';
  const layers={low:null,high:null};
  const sprites=new Map();
  const totals={spawned:0,expired:0,dropped:0,drawn:0,frames:0,frameMs:0,maxFrameMs:0,maxActive:0,unavailable:0,byKind:{}};
  let raf=0;
  const pxRatio=()=>Math.max(1,Math.min(2,Number(window.devicePixelRatio)||1));
  const ease=t=>1-(1-t)*(1-t)*(1-t);
  const now=()=>performance.now();
  function layer(which){
    const existing=layers[which];
    if(existing)return existing;
    const canvas=document.createElement('canvas');
    canvas.className='mippi-fx-canvas mippi-fx-'+which;
    canvas.setAttribute('aria-hidden','true');
    canvas.style.cssText='position:fixed;inset:0;pointer-events:none;mix-blend-mode:screen;z-index:'+(which==='high'?'9995':'64')+';';
    const ctx=canvas.getContext('2d',{alpha:true,desynchronized:true});
    if(!ctx){totals.unavailable++;return null;}
    document.body.appendChild(canvas);
    const result={canvas,ctx,particles:[],w:0,h:0,dpr:0};
    layers[which]=result;
    return result;
  }
  function resize(l){
    const w=Math.max(1,innerWidth|0),h=Math.max(1,innerHeight|0),dpr=pxRatio();
    if(w===l.w&&h===l.h&&dpr===l.dpr)return;
    l.w=w;l.h=h;l.dpr=dpr;
    l.canvas.width=Math.ceil(w*dpr);l.canvas.height=Math.ceil(h*dpr);
    l.canvas.style.width=w+'px';l.canvas.style.height=h+'px';
  }
  function sprite(color,size){
    const rounded=Math.max(2,Math.min(12,Math.round(size)));
    // Quantize rainbow hues so a long session reuses sprites instead of regenerating them.
    const tint=color.startsWith('hsl(')?color.replace(/hsl\((\d+)/,(_,h)=>'hsl('+(Math.floor(Number(h)/15)*15)):color;
    const key=tint+'/'+rounded;
    if(sprites.has(key))return sprites.get(key);
    const s=document.createElement('canvas');
    const half=Math.ceil(rounded*4+10);
    s.width=s.height=half*2;
    const ctx=s.getContext('2d');
    if(!ctx)return null;
    const grad=ctx.createRadialGradient(half,half,rounded*.15,half,half,half);
    grad.addColorStop(0,'#ffffff');
    grad.addColorStop(.10,tint);grad.addColorStop(.23,tint);
    grad.addColorStop(.55,tint.startsWith('#')?tint+'55':tint.replace(/\)$/, ' / .33)'));grad.addColorStop(1,'rgba(0,0,0,0)');
    ctx.fillStyle=grad;ctx.beginPath();ctx.arc(half,half,half,0,Math.PI*2);ctx.fill();
    if(sprites.size>=128)sprites.clear();
    sprites.set(key,s);
    return s;
  }
  function renderFrame(time){
    raf=0;
    const begin=now();
    let alive=0;
    for(const which of ['low','high']){
      const l=layers[which];if(!l)continue;
      resize(l);
      const {ctx,canvas,dpr}=l;
      ctx.setTransform(1,0,0,1,0,0);ctx.clearRect(0,0,canvas.width,canvas.height);
      for(let i=l.particles.length-1;i>=0;i--){
        const p=l.particles[i];
        const t=(time-p.born)/p.lifetime;
        if(t>=1){l.particles[i]=l.particles[l.particles.length-1];l.particles.pop();totals.expired++;continue;}
        alive++;
        if(t<0)continue;
        const html=document.documentElement;
        if((p.kind==='trail'&&html.classList.contains('cursor-test-no-trail')) ||
           (p.kind==='rainbow'&&html.classList.contains('cursor-test-no-starsparks')) ||
           ((p.kind==='trail'||p.kind==='rainbow')&&html.classList.contains('profile-no-cursorfx')))continue;
        const noGlow=(p.kind==='trail'||p.kind==='rainbow')&&html.classList.contains('cursor-test-no-glow');
        const q=ease(Math.min(1,t)),s=p.kind==='command'?(.35+.65*(1-q)):(1-.85*q);
        const alpha=p.kind==='command'?Math.min(.9,Math.max(0,t/.12*.9))*(1-q):1-q;
        const image=noGlow?null:sprite(p.color,p.size);
        if(!image&&!noGlow)continue;
        const x=(p.x+p.dx*q)*dpr,y=(p.y+p.dy*q)*dpr;
        ctx.globalAlpha=alpha;
        if(noGlow){
          ctx.beginPath();ctx.arc(x,y,Math.max(1,p.size*s*dpr*.5),0,Math.PI*2);
          ctx.fillStyle=p.color;ctx.fill();
        }else{
          const width=image.width*s*dpr,height=image.height*s*dpr;
          ctx.drawImage(image,x-width*.5,y-height*.5,width,height);
        }
        totals.drawn++;
      }
      ctx.globalAlpha=1;
      if(l.particles.length===0){canvas.remove();layers[which]=null;}
    }
    const duration=now()-begin;
    totals.frames++;totals.frameMs+=duration;totals.maxFrameMs=Math.max(totals.maxFrameMs,duration);
    window.MippiPerfLab?.measure('fx.canvas.frame',duration);
    if(alive)raf=requestAnimationFrame(renderFrame);
  }
  function spawn(input){
    if(mode!=='canvas')return false;
    const kind=String(input?.kind||'trail');
    const which=kind==='rainbow'||kind==='doug'?'high':'low';
    const l=layer(which);
    if(!l)return false;
    // Upper bound on cosmetic-only work; never compromise core combat interaction.
    if(active()>=600){totals.dropped++;return true;}
    const color=String(input.color||'#ffffff');
    // Colors are authored or derived from our own palette; no arbitrary DOM injection.
    const p={kind,x:Number(input.x)||0,y:Number(input.y)||0,dx:Number(input.dx)||0,dy:Number(input.dy)||0,
      size:Math.max(1,Number(input.size)||4),color,lifetime:Math.max(1,Number(input.lifetime)||720),born:now()};
    l.particles.push(p);
    totals.spawned++;totals.byKind[kind]=(totals.byKind[kind]||0)+1;
    totals.maxActive=Math.max(totals.maxActive,active());
    if(!raf)raf=requestAnimationFrame(renderFrame);
    return true;
  }
  function active(){return (layers.low?.particles.length||0)+(layers.high?.particles.length||0);}
  function clear(){
    if(raf){cancelAnimationFrame(raf);raf=0;}
    for(const key of ['low','high']){
      const l=layers[key];if(!l)continue;
      totals.expired+=l.particles.length;l.particles.length=0;l.canvas.remove();layers[key]=null;
    }
  }
  function setMode(value){
    if(value!=='canvas'&&value!=='dom')return 'FX RENDERER // Use dev fx renderer canvas/dom.';
    if(window.MippiCombatLab?.active)return 'FX RENDERER // Stop the combat benchmark before switching renderers.';
    clear();mode=value;
    // Prevent lingering DOM particles from obscuring immediate A/B comparisons.
    document.querySelectorAll('.cursor-spark,.rainbow-cursor-spark,.doug-rainbow-particle,.command-particle').forEach(el=>el.remove());
    return 'FX RENDERER // '+value.toUpperCase()+' // All high-frequency 2D effects; no gameplay changes.';
  }
  function snapshot(){return {mode,active:active(),layers:Object.fromEntries(['low','high'].map(k=>[k,!!layers[k]])),
    ...totals,byKind:{...totals.byKind},spriteCache:sprites.size,domFallbackNodes:document.querySelectorAll('.cursor-spark,.rainbow-cursor-spark,.doug-rainbow-particle,.command-particle').length};}
  window.MippiFxRenderer=Object.freeze({spawn,setMode,snapshot,clear,report(){return ['FX RENDERER // '+JSON.stringify(snapshot())];},
    help(){return ['dev fx status','dev fx renderer canvas/dom // production default vs legacy visuals','dev fx reset // restore Canvas rendering'];},
    reset(){return setMode('canvas');},get mode(){return mode;}});
})();
