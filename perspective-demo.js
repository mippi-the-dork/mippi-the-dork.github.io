/* Heavy Water: interactive perspective demonstration. No libraries required. */
(() => {
  'use strict';
  const map = document.getElementById('mapCanvas');
  const view = document.getElementById('viewCanvas');
  const m = map.getContext('2d');
  const v = view.getContext('2d');
  const buttons = [...document.querySelectorAll('[data-mode]')];
  const description = document.getElementById('viewDescription');
  const W = 480, H = 420;
  let mode = '2nd';
  const player = {x: 120, z: 105, yaw: 0, targetYaw: 0};
  const companionNpc = {x: -85, z: 120, yaw: 0};
  // Companion NPC walks a continuous, time-based circle regardless of selected perspective.
  const companionNpcPath = {centerX: -85, centerZ: 185, radius: 65, angle: -Math.PI / 2, speed: 0.42};
  const towers = [
    {x:-112,z:300,size:38,height:115,color:'#246bb8'},
    {x:10,z:325,size:44,height:155,color:'#78879a'},
    {x:118,z:258,size:36,height:135,color:'#b6c9dd'}
  ];
  const modes = {
    '1st': "The camera is Player Controlled from your character's perspective.",
    '2nd': "The camera is NPC Controlled from that character's perspective.",
    '3rd': "The camera is Player Controlled from outside of your character's perspective."
  };
  function themePalette(){
    if(document.body.classList.contains('theme-legendary')) return {
      accent:'#55ddd9', player:'#ffc43f', fovFill:'rgba(85,221,217,.11)', fovStroke:'rgba(85,221,217,.58)',
      towers:['#ff8a1d','#ffc83d','#55ddd9'], grid:'#263138', floor:'#1b211d', floorDeep:'#101713'
    };
    if(document.body.classList.contains('theme-complete')) return {
      accent:'#67e8ff', player:'#d96cff', fovFill:'rgba(217,108,255,.11)', fovStroke:'rgba(103,232,255,.58)',
      towers:['#b13cff','#67e8ff','#ff4fc8'], grid:'#272039', floor:'#20182d', floorDeep:'#100d19'
    };
    return {
      accent:'#2f93ff', player:'#0070e0', fovFill:'rgba(47,147,255,.10)', fovStroke:'rgba(47,147,255,.45)',
      towers:['#246bb8','#78879a','#b6c9dd'], grid:'#1d2b40', floor:'#152232', floorDeep:'#0b1727'
    };
  }
  function selectMode(next,{user=false}={}) {
    mode = next;
    buttons.forEach(b => {const active = b.dataset.mode === next; b.classList.toggle('active', active); b.setAttribute('aria-pressed', String(active));});
    description.textContent = modes[next];
    if(user) window.dispatchEvent(new CustomEvent('mippi:perspective-change',{detail:{mode:next}}));
  }
  buttons.forEach(b => b.addEventListener('click', () => selectMode(b.dataset.mode,{user:true})));
  const clamp = (n,lo,hi) => Math.max(lo,Math.min(hi,n));
  const shortest = (a,b) => Math.atan2(Math.sin(b-a),Math.cos(b-a));
  const ease = (speed,dt) => 1-Math.exp(-speed*dt);
  const mapPt = (x,z) => ({x: W/2+x, y:H-z});
  function pointerWorld(e) {
    const r = map.getBoundingClientRect();
    return {x:clamp((e.clientX-r.left)*W/r.width-W/2, -W/2+17,W/2-17),
            z:clamp(H-(e.clientY-r.top)*H/r.height,17,H-17)};
  }
  let dragging = false, pointerId = null, grab = {x:0,z:0};
  // Filter the drag direction before rotating the character. This removes pointer jitter.
  const motion = {x:0,z:0};
  let lastPointerTime = 0;
  map.addEventListener('pointerdown', e => {
    const p=pointerWorld(e);
    if (Math.hypot(p.x-player.x,p.z-player.z)>25) return;
    dragging=true; pointerId=e.pointerId;
    motion.x=0; motion.z=0; lastPointerTime=e.timeStamp;
    grab={x:player.x-p.x,z:player.z-p.z};
    map.setPointerCapture(e.pointerId);
    e.preventDefault();
  });
  map.addEventListener('pointermove', e => {
    if(!dragging || e.pointerId!==pointerId) return;
    const p=pointerWorld(e);
    const x=clamp(p.x+grab.x,-W/2+17,W/2-17), z=clamp(p.z+grab.z,17,H-17);
    const dx=x-player.x,dz=z-player.z;
    const pointerDt=clamp((e.timeStamp-lastPointerTime)/1000, 1/240, .08);
    lastPointerTime=e.timeStamp;
    const distance=Math.hypot(dx,dz);
    if(distance>0.65){
      // Average movement over a short interval instead of reacting to every tiny drag change.
      const response=ease(9,pointerDt);
      motion.x+=(dx/pointerDt-motion.x)*response;
      motion.z+=(dz/pointerDt-motion.z)*response;
      if(Math.hypot(motion.x,motion.z)>8) player.targetYaw=Math.atan2(motion.x,motion.z);
    }
    player.x=x; player.z=z;
    e.preventDefault();
  });
  function release(e){ if(e.pointerId===pointerId){dragging=false;pointerId=null;} }
  map.addEventListener('pointerup',release);
  map.addEventListener('pointercancel',release);
  map.addEventListener('lostpointercapture',()=>{dragging=false;pointerId=null;});

  function activeCam() {
    if(mode==='1st') return {x:player.x,y:61,z:player.z,yaw:player.yaw};
    if(mode==='2nd') return {x:companionNpc.x,y:61,z:companionNpc.z,yaw:companionNpc.yaw};
    const back=110;
    return {x:player.x-Math.sin(player.yaw)*back,y:72,z:player.z-Math.cos(player.yaw)*back,yaw:player.yaw};
  }
  function arrow(ctx,p,yaw,color,length=23){
    const sx=Math.sin(yaw),sy=-Math.cos(yaw);
    ctx.strokeStyle='#07101a';ctx.lineWidth=6;ctx.lineCap='round';
    ctx.beginPath();ctx.moveTo(p.x,p.y);ctx.lineTo(p.x+sx*length,p.y+sy*length);ctx.stroke();
    ctx.strokeStyle=color;ctx.lineWidth=3;
    ctx.beginPath();ctx.moveTo(p.x,p.y);ctx.lineTo(p.x+sx*length,p.y+sy*length);ctx.stroke();
    ctx.fillStyle=color;ctx.beginPath();ctx.arc(p.x+sx*length,p.y+sy*length,3,0,Math.PI*2);ctx.fill();
  }
  function renderMap(cam){
    const pal=themePalette();
    m.fillStyle='#080f1b';m.fillRect(0,0,W,H);
    m.lineWidth=1;m.strokeStyle=pal.grid;
    for(let x=0;x<=W;x+=40){m.beginPath();m.moveTo(x,0);m.lineTo(x,H);m.stroke();}
    for(let y=0;y<=H;y+=40){m.beginPath();m.moveTo(0,y);m.lineTo(W,y);m.stroke();}
    const cp=mapPt(cam.x,cam.z);
    const fov=68*Math.PI/180, reach=255;
    // Canvas angles are clockwise with y pointing downward. Forward world vector is (sin(yaw),cos(yaw)).
    const center=cam.yaw-Math.PI/2;
    m.beginPath();m.moveTo(cp.x,cp.y);m.arc(cp.x,cp.y,reach,center-fov/2,center+fov/2);m.closePath();
    m.fillStyle=pal.fovFill;m.fill();m.strokeStyle=pal.fovStroke;m.lineWidth=1.5;m.stroke();
    for(const [i,t] of towers.entries()){
      const p=mapPt(t.x,t.z),s=t.size;
      m.fillStyle=pal.towers[i%pal.towers.length];m.fillRect(p.x-s/2,p.y-s/2,s,s);
      m.strokeStyle='#dce8ff';m.lineWidth=1.5;m.strokeRect(p.x-s/2,p.y-s/2,s,s);
    }
    const marc=mapPt(companionNpc.x,companionNpc.z),ch=mapPt(player.x,player.z);
    for(const [p,col,label,yaw] of [[marc,'#8793a3','COMPANION NPC',companionNpc.yaw],[ch,pal.player,'PLAYER',player.yaw]]){
      m.beginPath();m.arc(p.x,p.y,14,0,Math.PI*2);m.fillStyle=col;m.fill();
      m.lineWidth=2;m.strokeStyle='#09111a';m.stroke();arrow(m,p,yaw,'#ffffff');
      m.font='bold 11px system-ui';m.fillStyle='#f2f7ff';m.textAlign='center';m.textBaseline='top';m.fillText(label,p.x,p.y+20);
    }
    if(dragging){m.strokeStyle=pal.accent;m.lineWidth=2;m.beginPath();m.arc(ch.x,ch.y,21,0,2*Math.PI);m.stroke();}
    if(mode==='3rd'){
      m.setLineDash([5,5]);m.strokeStyle='rgba(255,255,255,.5)';m.beginPath();m.moveTo(cp.x,cp.y);m.lineTo(ch.x,ch.y);m.stroke();m.setLineDash([]);
    }
    // Explicit camera icon so camera source remains clear in every mode.
    m.save();m.translate(cp.x,cp.y);m.rotate(cam.yaw);m.fillStyle='#fff';m.fillRect(-5,-5,10,10);m.fillStyle='#081120';m.fillRect(-2,-2,4,4);m.restore();
    m.fillStyle='#8fa6bf';m.font='11px system-ui';m.textAlign='left';m.textBaseline='top';m.fillText('TOP VIEW  ·  DRAG PLAYER',12,12);
  }

  const NEAR=5, FOCAL=345, HORIZON=H*.46;
  function cameraSpace(cam,x,y,z){
    const dx=x-cam.x,dz=z-cam.z, c=Math.cos(cam.yaw),s=Math.sin(cam.yaw);
    return {x:dx*c-dz*s,y:y-cam.y,z:dx*s+dz*c};
  }
  function project(p){return {x:W/2+FOCAL*p.x/p.z,y:HORIZON-FOCAL*p.y/p.z,z:p.z};}
  function clipNear(points){
    const result=[];
    for(let i=0;i<points.length;i++){
      const a=points[i],b=points[(i+1)%points.length],aIn=a.z>=NEAR,bIn=b.z>=NEAR;
      if(aIn) result.push(a);
      if(aIn!==bIn){const t=(NEAR-a.z)/(b.z-a.z);result.push({x:a.x+(b.x-a.x)*t,y:a.y+(b.y-a.y)*t,z:NEAR});}
    }
    return result;
  }
  const faces=[];
  function addFace(cam,world,fill){
    const pts=clipNear(world.map(p=>cameraSpace(cam,...p)));
    if(pts.length<3) return;
    const center=pts.reduce((a,p)=>a+p.z,0)/pts.length;
    faces.push({points:pts.map(project),fill,depth:center});
  }
  function shade(hex,factor){
    const rgb=[1,3,5].map(i=>clamp(Math.round(parseInt(hex.slice(i,i+2),16)*factor),0,255));
    return `rgb(${rgb.join(',')})`;
  }
  function cuboid(cam,x,z,sz,height,color){
    const h=sz/2;
    const p=[[-h,-h],[h,-h],[h,h],[-h,h]].map(([a,b])=>[x+a,z+b]);
    for(let i=0;i<4;i++){
      const j=(i+1)%4;
      addFace(cam,[[p[i][0],0,p[i][1]],[p[j][0],0,p[j][1]],[p[j][0],height,p[j][1]],[p[i][0],height,p[i][1]]],shade(color,[.56,.74,.86,.64][i]));
    }
    addFace(cam,p.map(([px,pz])=>[px,height,pz]),shade(color,1.2));
  }
  function character(cam,obj,color){
    // Simple volumetric human-shaped silhouette, rendered in perspective and depth sorted with the towers.
    cuboid(cam,obj.x,obj.z,17,42,color);
    const y0=51,half=10;
    const corners=[[-half,-half],[half,-half],[half,half],[-half,half]];
    const pts=corners.map(([dx,dz])=>[obj.x+dx,obj.z+dz]);
    for(let i=0;i<4;i++){
      const j=(i+1)%4;
      addFace(cam,[[pts[i][0],y0,pts[i][1]],[pts[j][0],y0,pts[j][1]],[pts[j][0],y0+19,pts[j][1]],[pts[i][0],y0+19,pts[i][1]]],shade(color,.8));
    }
    addFace(cam,pts.map(([x,z])=>[x,y0+19,z]),shade(color,1.25));
    // Front-direction detail on the character's torso.
    const s=Math.sin(obj.yaw),c=Math.cos(obj.yaw);
    const right=[c,-s], forward=[s,c];
    const pt=(side,y,depth=9.4)=>[obj.x+right[0]*side+forward[0]*depth,y,obj.z+right[1]*side+forward[1]*depth];
    addFace(cam,[pt(-4,27),pt(4,27),pt(4,37),pt(-4,37)],'#e9f7ff');
  }
  function drawFloor(cam){
    const pal=themePalette();
    v.fillStyle=pal.floorDeep;v.fillRect(0,0,W,HORIZON);
    v.fillStyle=pal.floor;v.fillRect(0,HORIZON,W,H-HORIZON);
    // Actual ground-plane grid, not a screen-space vanishing-point approximation.
    v.strokeStyle='rgba(115,153,186,.23)';v.lineWidth=1;
    function line(a,b){
      const p=cameraSpace(cam,...a),q=cameraSpace(cam,...b);
      const pts=clipNear([p,q,{...q}]);
      // Explicit segment clipping avoids treating a line as a triangle.
      let A=p,B=q;
      if(A.z<NEAR&&B.z<NEAR)return;
      if(A.z<NEAR){const t=(NEAR-A.z)/(B.z-A.z);A={x:A.x+(B.x-A.x)*t,y:A.y+(B.y-A.y)*t,z:NEAR};}
      if(B.z<NEAR){const t=(NEAR-B.z)/(A.z-B.z);B={x:B.x+(A.x-B.x)*t,y:B.y+(A.y-B.y)*t,z:NEAR};}
      const x=project(A),y=project(B);
      v.beginPath();v.moveTo(x.x,x.y);v.lineTo(y.x,y.y);v.stroke();
    }
    for(let a=-800;a<=800;a+=50){line([a,0,-800],[a,0,950]);line([-800,0,a],[800,0,a]);}
    v.strokeStyle='rgba(200,229,255,.18)';v.beginPath();v.moveTo(0,HORIZON);v.lineTo(W,HORIZON);v.stroke();
  }
  function renderView(cam){
    const pal=themePalette();
    drawFloor(cam);
    faces.length=0;
    for(const [i,t] of towers.entries()) cuboid(cam,t.x,t.z,t.size,t.height,pal.towers[i%pal.towers.length]);
    if(mode!=='1st')character(cam,player,pal.player);
    if(mode!=='2nd')character(cam,companionNpc,'#8793a3');
    faces.sort((a,b)=>b.depth-a.depth);
    for(const f of faces){
      v.beginPath();v.moveTo(f.points[0].x,f.points[0].y);
      for(let i=1;i<f.points.length;i++)v.lineTo(f.points[i].x,f.points[i].y);
      v.closePath();v.fillStyle=f.fill;v.fill();v.strokeStyle='rgba(1,8,17,.45)';v.lineWidth=1;v.stroke();
    }
    // Deliberately no pitch or roll: a level, yaw-only eye/follow camera.
    v.strokeStyle='rgba(235,247,255,.4)';v.lineWidth=1;
    v.beginPath();v.moveTo(W/2-8,H/2);v.lineTo(W/2+8,H/2);v.moveTo(W/2,H/2-8);v.lineTo(W/2,H/2+8);v.stroke();
  }
  let last=0;
  function frame(time){
    const dt=Math.min((time-last)/1000||1/60,.05);last=time;
    // First person turns faster, retaining smooth shortest-arc interpolation and filtered drag input.
    // Interpolate angular difference on the shortest arc, capped at a readable turn rate.
    const angularDifference=shortest(player.yaw,player.targetYaw);
    const interpolation=ease(mode==='1st' ? 7.5 : 5.2,dt);
    const maxStep=(mode==='1st' ? 5.0 : 3.1)*dt;
    player.yaw+=clamp(angularDifference*interpolation,-maxStep,maxStep);
    companionNpcPath.angle += companionNpcPath.speed * dt;
    companionNpc.x = companionNpcPath.centerX + Math.cos(companionNpcPath.angle) * companionNpcPath.radius;
    companionNpc.z = companionNpcPath.centerZ + Math.sin(companionNpcPath.angle) * companionNpcPath.radius;
    const target=Math.atan2(player.x-companionNpc.x,player.z-companionNpc.z);
    companionNpc.yaw+=shortest(companionNpc.yaw,target)*ease(14,dt);
    const cam=activeCam();
    renderMap(cam);renderView(cam);
    requestAnimationFrame(frame);
  }
  selectMode(mode);
  requestAnimationFrame(frame);
})();
