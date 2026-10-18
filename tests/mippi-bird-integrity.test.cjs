/* Node built-in regression checks for Mippi Bird integrity.
   Run: node --test tests/mippi-bird-integrity.test.cjs */
const test=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const vm=require('node:vm');
const source=fs.readFileSync(require('node:path').join(__dirname,'../script.js'),'utf8');

test('production script parses successfully',()=>{
  assert.doesNotThrow(()=>new vm.Script(source));
});

test('simulation state is inside a lexical closure and not exposed in the public API',()=>{
  const start=source.indexOf('const {openFlappyGame,updateFlappyLivesHud');
  const end=source.indexOf('let particleFieldTimer=',start);
  assert.ok(start>0 && end>start);
  const bird=source.slice(start,end);
  assert.match(bird,/let flappyBirdImage=null, flappyState=null;/);
  assert.match(bird,/return \{openFlappyGame,updateFlappyLivesHud,persistMushroomLives,recordMushroomCollection,mippiBirdHighScore:/);
  assert.doesNotMatch(bird,/return \{[^}]*flappyState/);
  assert.equal(source.slice(end).match(/\bflappyState\b/g),null);
});

test('round end latch is not redefinable and only transitions toward ended',()=>{
  const bird=source.slice(source.indexOf('function resetFlappyGame()'),source.indexOf('function flappyLivesRemaining()'));
  assert.match(bird,/Object\.defineProperty\(flappyState,'gameOver'/);
  assert.match(bird,/configurable:false/);
  assert.match(bird,/if\(value===true\)ended=true/);
  const state={};
  let ended=false;
  Object.defineProperty(state,'gameOver',{configurable:false,get(){return ended;},set(value){if(value===true)ended=true;}});
  assert.throws(()=>Object.defineProperty(state,'gameOver',{get:()=>false}));
  state.gameOver=true;
  state.gameOver=false;
  assert.equal(state.gameOver,true);
});

test('boundary crossing, collisions and final-life transition remain wired',()=>{
  const bird=source.slice(source.indexOf('function drawFlappyFrame('),source.indexOf('let particleFieldTimer='));
  assert.match(bird,/const priorY=s\.y/);
  assert.match(bird,/const crossedWall=/);
  assert.match(bird,/if\(boundaryHit && !s\.gameOver.*consumeFlappyLife\('boundary'\)/);
  assert.match(source,/s\.gameOver=true;/);
});
