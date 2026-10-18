/* Run: node --test tests/mippi-bird-integrity.test.cjs */
const test=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const vm=require('node:vm');
const main=fs.readFileSync(path.join(__dirname,'../script.js'),'utf8');
const workerSource=fs.readFileSync(path.join(__dirname,'../mippi-bird-worker.js'),'utf8');

function harness(){
 const messages=[],scheduled=[];let clock=0;
 const ctx={performance:{now:()=>clock},postMessage:message=>messages.push(message),
   setInterval:callback=>{scheduled.push(callback);return scheduled.length;},
   clearInterval:()=>{},close:()=>{}};
 vm.createContext(ctx);vm.runInContext(workerSource,ctx);
 const send=message=>ctx.onmessage({data:message});
 const step=(frames=1)=>{for(let i=0;i<frames;i++){clock+=1000/60;scheduled[0]();}};
 return {ctx,messages,send,step};
}
test('both scripts parse',()=>{assert.doesNotThrow(()=>new vm.Script(main));assert.doesNotThrow(()=>new vm.Script(workerSource));});
test('mutable Bird state remains private to the worker',()=>{
 assert.doesNotMatch(main,/let flappyBirdImage=null, flappyState=null/);
 assert.match(main,/new Worker\('mippi-bird-worker\.js'\)/);
 assert.match(workerSource,/let state=null,timer=null/);
 assert.doesNotMatch(workerSource,/self\.flappyState|globalThis\.flappyState/);
});
test('reset creates a fixed starting state and flap starts the round',()=>{
 const h=harness();h.send({type:'reset',shopLife:false,bank:0,slow:false});
 assert.equal(h.messages.at(-1).state.y,140);
 assert.equal(h.messages.at(-1).state.lives,1);
 h.send({type:'flap'});
 assert.equal(h.messages.at(-1).state.started,true);
 assert.equal(h.messages.at(-1).state.vy,-6.9);
});
test('worker ignores attempts to set Bird coordinates or game-over via messages',()=>{
 const h=harness();h.send({type:'reset',shopLife:false,bank:0,slow:false});
 h.send({type:'setState',y:1e9,gameOver:false,bank:99999});
 h.send({type:'flap',y:-10000,gameOver:true});
 const snapshot=h.messages.at(-1).state;
 assert.equal(snapshot.y,140);assert.equal(snapshot.gameOver,false);assert.equal(snapshot.lives,1);
});
test('bank values are finite and bounded on reset',()=>{
 const h=harness();h.send({type:'reset',bank:Infinity});assert.equal(h.messages.at(-1).state.lives,1);
 h.send({type:'reset',bank:100000});assert.equal(h.messages.at(-1).state.lives,1000);
});
test('fixed-timestep loop and worker lifecycle',()=>{
 assert.match(workerSource,/const STEP=1000\/60/);
 assert.match(workerSource,/Math\.min\(accumulator\+elapsed,STEP\*4\)/);
 assert.match(workerSource,/emission>=1000\/30/);
 assert.match(workerSource,/case 'stop'/);
 assert.match(main,/birdWorker\.terminate\(\)/);
});

test('single-life boundary collision ends the round once',()=>{
 const h=harness();
 h.send({type:'reset',bank:0,shopLife:false});
 h.send({type:'flap'});
 h.step(240);
 const events=h.messages.flatMap(x=>x.events||[]);
 assert.equal(events.filter(x=>x.type==='hit').length,1);
 assert.equal(events.filter(x=>x.type==='ended').length,1);
 assert.equal(h.messages.at(-1).state.gameOver,true);
 assert.equal(h.messages.at(-1).state.lives,0);
 const score=h.messages.at(-1).state.score;
 h.step(120);
 assert.equal(h.messages.at(-1).state.score,score);
 assert.equal(h.messages.flatMap(x=>x.events||[]).filter(x=>x.type==='ended').length,1);
});
test('pause stops physics and resumes without accumulated catchup',()=>{
 const h=harness();h.send({type:'reset',bank:0});h.send({type:'flap'});
 h.step(8);const before=h.messages.at(-1).state.y;
 h.send({type:'pause',enabled:true});h.step(180);
 assert.equal(h.messages.at(-1).state.y,before);
 h.send({type:'pause',enabled:false});h.step(8);
 assert.notEqual(h.messages.at(-1).state.y,before);
});
