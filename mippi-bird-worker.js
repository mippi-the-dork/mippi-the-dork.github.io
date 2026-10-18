/* Mippi Bird simulation. No DOM, canvas, storage, or user-controlled state messages. */
'use strict';
const WIDTH=520,HEIGHT=280,HALF=19,PIPE_WIDTH=43.2,GAP=124,STEP=1000/60;
let state=null,timer=null,previous=0,accumulator=0,emission=0,events=[];
function finite(value,fallback){return Number.isFinite(value)?value:fallback;}
function clamp(v,min,max){return Math.max(min,Math.min(max,v));}
function reset(shopLife=false,bank=0,slow=false){
 state={y:140,vy:0,score:0,started:false,ended:false,baseLife:true,shopLife:shopLife===true,
 bank:clamp(Math.floor(finite(bank,0)),0,999),invulnerability:0,slow:slow===true,
 pipes:[{x:590,gapY:118,scored:false},{x:850,gapY:168,scored:false}]};
 events=[];
 publish();
}
function lives(){return (state.baseLife?1:0)+(state.shopLife?1:0)+state.bank;}
function hit(reason){
 if(state.ended||state.invulnerability>0)return;
 let source='base';
 if(state.shopLife){state.shopLife=false;source='shop';}
 else if(state.bank>0){state.bank--;source='refill';}
 else state.baseLife=false;
 const remaining=lives();
 events.push({type:'hit',reason,source,remaining,bank:state.bank});
 if(remaining===0){state.ended=true;events.push({type:'ended',score:state.score});}
 else {state.invulnerability=1.65;state.vy=-2.8;state.y=clamp(state.y,28,HEIGHT-28);}
}
function tick(){
 if(!state||!state.started||state.ended)return;
 const s=state,gravity=s.slow?.24:.36;
 const oldY=s.y;
 s.vy=clamp(finite(s.vy,0),-18,18)+gravity;
 s.y=finite(s.y,HEIGHT/2)+s.vy;
 const wall=oldY-HALF<0||oldY+HALF>HEIGHT||s.y-HALF<0||s.y+HALF>HEIGHT;
 s.y=clamp(s.y,-38,HEIGHT+38);
 for(const p of s.pipes)p.x-=2.65;
 if(s.pipes[0].x< -52){
   s.pipes.shift();
   const last=s.pipes[s.pipes.length-1]?.x??520;
   s.pipes.push({x:last+260,gapY:78+Math.random()*120,scored:false});
 }
 if(s.invulnerability>0)s.invulnerability=Math.max(0,s.invulnerability-STEP/1000);
 for(const p of s.pipes){
   if(!p.scored&&p.x+PIPE_WIDTH<102){p.scored=true;s.score++;events.push({type:'score',score:s.score});}
   const top=Math.max(20,p.gapY-GAP/2),bottom=Math.min(HEIGHT-20,p.gapY+GAP/2);
   if(102+HALF>p.x&&102-HALF<p.x+PIPE_WIDTH&&(s.y-HALF<top||s.y+HALF>bottom))hit('pipe');
 }
 if(wall)hit('boundary');
}
function publish(){
 if(!state)return;
 const s=state;
 postMessage({type:'snapshot',state:{
   y:s.y,vy:s.vy,score:s.score,started:s.started,gameOver:s.ended,
   lives:lives(),invulnerable:s.invulnerability>0,
   pipes:s.pipes.map(p=>({x:p.x,gapY:p.gapY}))
 },events:events.splice(0)});
}
function loop(){
 if(!state)return;
 const now=performance.now();
 const elapsed=Math.max(0,now-previous);
 accumulator=Math.min(accumulator+elapsed,STEP*4);
 previous=now;
 let steps=0;
 while(accumulator>=STEP&&steps<4){tick();accumulator-=STEP;steps++;}
 emission+=elapsed;
 if(emission>=1000/30||events.length){publish();emission=0;}

}
onmessage=({data})=>{
 if(!data||typeof data.type!=='string')return;
 switch(data.type){
 case 'reset':reset(data.shopLife,data.bank,data.slow);break;
 case 'flap':
  if(!state||state.ended)return;
  state.started=true;state.vy=state.slow?-5.25:-6.9;publish();break;
 case 'slow':if(state)state.slow=data.enabled===true;break;
 case 'stop':clearInterval(timer);timer=null;state=null;close();break;
 }
};
previous=performance.now();
timer=setInterval(loop,STEP);
