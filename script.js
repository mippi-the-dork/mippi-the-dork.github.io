// v2.84 // Shooting performance, collectible pacing, cursor and HUD unlock corrections
const mippiRuntimeHealth={
  version:'2.84',
  bootStartedAt:Date.now(),
  bootStage:'script-start',
  errors:[],
  three:{source:null,hero:false,ambient:false,about:false,attempts:[]}
};
window.addEventListener('error',event=>{
  mippiRuntimeHealth.errors.push({type:'error',message:event.message||'Unknown runtime error',source:event.filename||'',line:event.lineno||0});
  if(mippiRuntimeHealth.errors.length>12) mippiRuntimeHealth.errors.shift();
});
window.addEventListener('unhandledrejection',event=>{
  const reason=event.reason;
  mippiRuntimeHealth.errors.push({type:'promise',message:String(reason?.message||reason||'Unhandled rejection')});
  if(mippiRuntimeHealth.errors.length>12) mippiRuntimeHealth.errors.shift();
});
Object.defineProperty(window,'__MIPPI_RUNTIME__',{
  value:Object.freeze({snapshot:()=>JSON.parse(JSON.stringify(mippiRuntimeHealth))}),
  configurable:false,writable:false
});

const navToggle = document.querySelector('.nav-toggle');
const nav = document.querySelector('.site-nav');
const achievement = document.querySelector('#achievement');
const heavyWater = document.querySelector('.heavy-water');

// Local-only session telemetry foundation.
// This does not send analytics anywhere. It exists so later game systems can react to
// the visitor's behavior and eventually produce a meaningful session report.
const TELEMETRY_SESSION_KEY = 'mippi-session-telemetry-v1';
const TELEMETRY_VERSION = 1;
const POSTGAME_SECTIONS_KEY='mippi-postgame-sections-v1';
const POSTGAME_COOL_MAXED_KEY='mippi-postgame-cool-maxed-v1';
const POSTGAME_CASTLE_COMPLETE_KEY='mippi-postgame-castle-complete-v1';
const POSTGAME_SUPERBOSS_KEY='mippi-postgame-superboss-v1';
const POSTGAME_REVEAL_KEY='mippi-postgame-achievements-revealed-v1';
const POSTGAME_UNLOCKS_KEY='mippi-postgame-achievements-v1';
const MUSIC_UNLOCK_KEY='mippi-music-player-unlocked-v1';
const POSTGAME_MAJOR_SECTIONS=['games','career','consulting','crafting','tools','about'];
let postgameVisitedSections=new Set();
let postgameCoolMaxed=false;
let postgameCastleComplete=false;
let postgameSuperBossDefeated=false;
let postgameRevealed=false;
let unlockedPostgameAchievements=new Set();
let musicPlayerUnlocked=false;
try{
  postgameVisitedSections=new Set(JSON.parse(localStorage.getItem(POSTGAME_SECTIONS_KEY)||'[]').filter(id=>POSTGAME_MAJOR_SECTIONS.includes(id)));
  postgameCoolMaxed=localStorage.getItem(POSTGAME_COOL_MAXED_KEY)==='1';
  postgameCastleComplete=localStorage.getItem(POSTGAME_CASTLE_COMPLETE_KEY)==='1';
  postgameSuperBossDefeated=localStorage.getItem(POSTGAME_SUPERBOSS_KEY)==='1';
  postgameRevealed=localStorage.getItem(POSTGAME_REVEAL_KEY)==='1';
  unlockedPostgameAchievements=new Set(JSON.parse(localStorage.getItem(POSTGAME_UNLOCKS_KEY)||'[]'));
  musicPlayerUnlocked=localStorage.getItem(MUSIC_UNLOCK_KEY)==='1';
}catch(_){}
function persistPostgameSections(){try{localStorage.setItem(POSTGAME_SECTIONS_KEY,JSON.stringify([...postgameVisitedSections]));}catch(_){}}
function markPostgameSectionVisit(id){
  if(!POSTGAME_MAJOR_SECTIONS.includes(id)||postgameVisitedSections.has(id))return;
  postgameVisitedSections.add(id);persistPostgameSections();
  if(typeof evaluatePostgameAchievements==='function')evaluatePostgameAchievements();
}
function createTelemetrySession(){
  const now=Date.now();
  return {
    version:TELEMETRY_VERSION,
    session:{
      id:`${now.toString(36)}-${Math.random().toString(36).slice(2,8)}`,
      startedAt:now,lastActiveAt:now,lastMeaningfulAt:now,pageLoads:0,
      activeMs:0,maxScrollDepth:0,visibilityChanges:0
    },
    sections:{},
    interaction:{clicks:0,navigationClicks:0,externalClicks:0,dougClicks:0},
    achievements:{unlocks:0,keys:[],hints:0,introHints:0,cheats:0,godmodeUses:0,sources:{}},
    console:{opens:0,closes:0,commands:0,invalid:0,unique:[],commandCounts:{},hiddenCounts:{}},
    modes:{inspectToggles:0,designToggles:0,themeChanges:0,themeModes:[],slowmoToggles:0,easyModeToggles:0,particleToggles:0,lumenToggles:0,naniteToggles:0,vibeToggles:0},
    flying:{spawned:{},forced:{},collected:{},missed:{},methods:{}},
    arcade:{ufoSpawned:0,ufoDestroyed:0,ufoEscaped:0,bossSpawned:0,bossHits:0,bossDefeated:0,bossEscaped:0,superBossSpawned:0,superBossHits:0,superBossDefeated:0,superBossEscaped:0,superBossAddsDestroyed:0,superBossRockets:0,superBossLasers:0,superBossCursorHits:0,hostileShots:0,playerShots:0,playerHits:0},
    economy:{rupeesEarned:0,rupeesSpent:0,shopOpens:0,shopPurchases:0,shopEquips:0,shopUnequips:0,shopDeflections:0,heartsCollected:0,keysCollected:0,castlesChecked:0,mushroomsCollected:0,mushroomLivesEarned:0,mushroomLivesSpent:0,starsCollected:0,bonesCollected:0,coolActivations:0},
    wish:{shootingStarsSpawned:0,shootingStarsCollected:0,commandUnlocks:0,attempts:0,failed:0,successful:0,blueprintOpens:0,validInserted:0,branches:{}},
    flappy:{opens:0,gamesStarted:0,deaths:0,highScore:0,shares:0,rupeesEarned:0,rupeeMilestones:[],shopLivesUsed:0,mushroomLivesUsed:0,hitsAbsorbed:0},
    combos:{announced:[],starPowerUfoKills:0,starPowerBossHits:0,slowmoHostileShots:0,starPowerDoug:0,legendaryMushroom:0},
    portfolio:{secondPersonToggles:0,heroSignalClicks:0,galleryOpens:0,galleryImagesViewed:[],filters:{},resumeClicks:{},externalDestinations:{}},
    assistance:{hintUses:0,cheatUses:0,easyModeUses:0,godmodeUses:0,hiddenCommands:{}},
    director:{state:'curious',evaluations:0,transitions:0,stateChanges:[],stateMs:{},attentionBlocks:0,droughtAssists:0,lastReason:'initial'},
    objectives:{offered:0,completed:0,failed:0,dismissed:0,canceled:0,rupeesEarned:0,offeredIds:[],completedIds:[],dismissedIds:[],failedIds:[],categoryCounts:{}},
    playerModel:{evaluations:0,label:'FORMING',primary:null,secondary:null,confidence:0,evidence:0,lastUpdatedAt:0,history:[]},
    debrief:{opens:0,shares:0,copies:0},
    timeline:[]
  };
}
function loadTelemetrySession(){
  try{
    const raw=sessionStorage.getItem(TELEMETRY_SESSION_KEY);
    if(!raw) return createTelemetrySession();
    const parsed=JSON.parse(raw);
    if(!parsed || parsed.version!==TELEMETRY_VERSION) return createTelemetrySession();
    return parsed;
  }catch(_){ return createTelemetrySession(); }
}
const sessionTelemetry=loadTelemetrySession();
if(!sessionTelemetry.director || typeof sessionTelemetry.director!=='object') sessionTelemetry.director={state:'curious',evaluations:0,transitions:0,stateChanges:[],stateMs:{},attentionBlocks:0,droughtAssists:0,lastReason:'migration'};
if(!sessionTelemetry.objectives || typeof sessionTelemetry.objectives!=='object') sessionTelemetry.objectives={offered:0,completed:0,failed:0,dismissed:0,canceled:0,rupeesEarned:0,offeredIds:[],completedIds:[],dismissedIds:[],failedIds:[],categoryCounts:{}};
if(!Array.isArray(sessionTelemetry.objectives.offeredIds)) sessionTelemetry.objectives.offeredIds=[];
if(!Array.isArray(sessionTelemetry.objectives.completedIds)) sessionTelemetry.objectives.completedIds=[];
if(!Array.isArray(sessionTelemetry.objectives.dismissedIds)) sessionTelemetry.objectives.dismissedIds=[];
if(!Array.isArray(sessionTelemetry.objectives.failedIds)) sessionTelemetry.objectives.failedIds=[];
if(!sessionTelemetry.objectives.categoryCounts || typeof sessionTelemetry.objectives.categoryCounts!=='object') sessionTelemetry.objectives.categoryCounts={};
if(!sessionTelemetry.playerModel || typeof sessionTelemetry.playerModel!=='object') sessionTelemetry.playerModel={evaluations:0,label:'FORMING',primary:null,secondary:null,confidence:0,evidence:0,lastUpdatedAt:0,history:[]};
if(!Array.isArray(sessionTelemetry.playerModel.history)) sessionTelemetry.playerModel.history=[];
if(!sessionTelemetry.debrief || typeof sessionTelemetry.debrief!=='object') sessionTelemetry.debrief={opens:0,shares:0,copies:0};
if(!postgameCastleComplete && (Number(sessionTelemetry.economy?.castleRunsCompleted)||0)>0){postgameCastleComplete=true;try{localStorage.setItem(POSTGAME_CASTLE_COMPLETE_KEY,'1');}catch(_){}}
if(!postgameSuperBossDefeated && (Number(sessionTelemetry.arcade?.superBossDefeated)||0)>0){postgameSuperBossDefeated=true;try{localStorage.setItem(POSTGAME_SUPERBOSS_KEY,'1');}catch(_){}}
sessionTelemetry.session.pageLoads=(Number(sessionTelemetry.session.pageLoads)||0)+1;
sessionTelemetry.session.lastActiveAt=Date.now();
let telemetrySaveTimer=null;
let telemetryActiveStarted=document.visibilityState==='visible'?performance.now():null;
let objectiveEventSink=null;
const telemetrySectionActive=new Map();

function telemetryPath(path){
  const parts=String(path||'').split('.').filter(Boolean);
  let obj=sessionTelemetry;
  for(const part of parts){
    if(!obj[part] || typeof obj[part]!=='object' || Array.isArray(obj[part])) obj[part]={};
    obj=obj[part];
  }
  return obj;
}
function telemetryScheduleSave(){
  window.clearTimeout(telemetrySaveTimer);
  telemetrySaveTimer=window.setTimeout(()=>{
    try{sessionStorage.setItem(TELEMETRY_SESSION_KEY,JSON.stringify(sessionTelemetry));}catch(_){}
  },350);
}
function telemetryCount(path,key,amount=1){
  const obj=telemetryPath(path);
  obj[key]=(Number(obj[key])||0)+amount;
  sessionTelemetry.session.lastActiveAt=Date.now();
  telemetryScheduleSave();
  return obj[key];
}
function telemetryMax(path,key,value){
  const obj=telemetryPath(path);
  obj[key]=Math.max(Number(obj[key])||0,Number(value)||0);
  telemetryScheduleSave();
  return obj[key];
}
function telemetryUnique(path,key,value){
  const obj=telemetryPath(path);
  if(!Array.isArray(obj[key])) obj[key]=[];
  if(!obj[key].includes(value)) obj[key].push(value);
  telemetryScheduleSave();
}
function telemetryMeaningful(type,detail={}){
  sessionTelemetry.session.lastMeaningfulAt=Date.now();
  if(!Array.isArray(sessionTelemetry.timeline)) sessionTelemetry.timeline=[];
  sessionTelemetry.timeline.push({t:Date.now(),type,...detail});
  if(sessionTelemetry.timeline.length>120) sessionTelemetry.timeline.splice(0,sessionTelemetry.timeline.length-120);
  telemetryScheduleSave();
  if(objectiveEventSink) objectiveEventSink(type,detail);
}
function telemetryCommitActive(){
  if(telemetryActiveStarted==null) return;
  const now=performance.now();
  sessionTelemetry.session.activeMs=(Number(sessionTelemetry.session.activeMs)||0)+Math.max(0,now-telemetryActiveStarted);
  telemetryActiveStarted=now;
}
function telemetrySectionEnter(id){
  if(telemetrySectionActive.has(id)) return;
  const section=telemetryPath(`sections.${id}`);
  section.visits=(Number(section.visits)||0)+1;
  if(!section.firstSeenAt) section.firstSeenAt=Date.now();
  telemetrySectionActive.set(id,performance.now());
  if(section.visits===1) telemetryMeaningful('section_first_visit',{id});
  markPostgameSectionVisit(id);
  telemetryScheduleSave();
}
function telemetrySectionExit(id){
  const started=telemetrySectionActive.get(id);
  if(started==null) return;
  const section=telemetryPath(`sections.${id}`);
  section.dwellMs=(Number(section.dwellMs)||0)+Math.max(0,performance.now()-started);
  telemetrySectionActive.delete(id);
  telemetryScheduleSave();
}
function telemetryPauseSections(){ [...telemetrySectionActive.keys()].forEach(telemetrySectionExit); }
function telemetryResumeVisibleSections(){
  const targets=[['hero',document.querySelector('.hero')],...['games','career','consulting','crafting','tools','about'].map(id=>[id,document.getElementById(id)])];
  targets.forEach(([id,el])=>{
    if(!el) return;
    const r=el.getBoundingClientRect();
    const visible=Math.max(0,Math.min(r.bottom,innerHeight)-Math.max(r.top,0));
    if(visible>=Math.min(r.height*.25,180)) telemetrySectionEnter(id);
  });
}
function telemetryExternalDestination(anchor){
  try{
    const host=new URL(anchor.href,location.href).hostname.toLowerCase();
    if(host.includes('github.com')) return 'github';
    if(host.includes('fab.com')) return 'fab';
    if(host.includes('linkedin.com')) return 'linkedin';
    if(host.includes('discord')) return 'discord';
    if(host.includes('steam')) return 'steam';
    if(host.includes('crafting-play')) return 'crafting_play';
    if(host.includes('unrealsource')) return 'unreal_source';
    if(host.includes('epicgames.com')) return 'epic_learning';
    if(host.includes('google.com') && anchor.closest('.resume-links')) return 'resume';
    return 'other';
  }catch(_){ return 'other'; }
}
function telemetryFlyingSpawn(kind,{forced=false}={}){
  telemetryCount('flying.spawned',kind);
  if(forced) telemetryCount('flying.forced',kind);
}
function telemetryFlyingCollect(kind,method='direct'){
  telemetryCount('flying.collected',kind);
  telemetryCount('flying.methods',method||'direct');
  telemetryMeaningful('flying_collected',{kind,method:method||'direct'});
}
function telemetryFlyingMiss(kind){ telemetryCount('flying.missed',kind); }
function telemetryCollectionMethod(el){
  const method=el?.dataset?.telemetryCollectMethod||'direct';
  if(el?.dataset) delete el.dataset.telemetryCollectMethod;
  return method;
}
function telemetryRecordCommand(command,{valid=true,hidden=false}={}){
  telemetryCount('console','commands');
  if(!valid) telemetryCount('console','invalid');
  telemetryUnique('console','unique',command);
  telemetryCount('console.commandCounts',command);
  if(hidden){
    telemetryCount('console.hiddenCounts',command);
    telemetryCount('assistance.hiddenCommands',command);
  }
  telemetryMeaningful('console_command',{command,valid,hidden});
}
function telemetryWishBranch(branch){
  telemetryCount('wish.branches',branch);
  telemetryMeaningful('wish_branch',{branch});
}

function initTelemetryFoundation(){
  const sectionTargets=[['hero',document.querySelector('.hero')],...['games','career','consulting','crafting','tools','about'].map(id=>[id,document.getElementById(id)])];
  if('IntersectionObserver' in window){
    const lookup=new Map(sectionTargets.filter(([,el])=>el).map(([id,el])=>[el,id]));
    const observer=new IntersectionObserver(entries=>{
      if(document.visibilityState!=='visible') return;
      entries.forEach(entry=>{
        const id=lookup.get(entry.target);
        if(!id) return;
        if(entry.isIntersecting && entry.intersectionRatio>=.25) telemetrySectionEnter(id);
        else telemetrySectionExit(id);
      });
    },{threshold:[0,.25,.5]});
    lookup.forEach((_,el)=>observer.observe(el));
  }else telemetryResumeVisibleSections();

  let scrollQueued=false;
  window.addEventListener('scroll',()=>{
    if(scrollQueued) return;
    scrollQueued=true;
    requestAnimationFrame(()=>{
      scrollQueued=false;
      const max=Math.max(1,document.documentElement.scrollHeight-innerHeight);
      telemetryMax('session','maxScrollDepth',Math.min(100,Math.round(scrollY/max*100)));
    });
  },{passive:true});

  document.addEventListener('click',event=>{
    if(!event.isTrusted) return;
    telemetryCount('interaction','clicks');
    const anchor=event.target.closest?.('a[href]');
    if(anchor){
      const href=anchor.getAttribute('href')||'';
      if(href.startsWith('#')) telemetryCount('interaction','navigationClicks');
      else if(anchor.target==='_blank' || /^https?:/i.test(anchor.href)){
        telemetryCount('interaction','externalClicks');
        const destination=telemetryExternalDestination(anchor);
        telemetryCount('portfolio.externalDestinations',destination);
        telemetryMeaningful('external_link',{destination});
      }
      if(anchor.closest('.resume-links')){
        const label=(anchor.querySelector('strong')?.textContent||'resume').trim().toLowerCase().replace(/\s+/g,'_');
        telemetryCount('portfolio.resumeClicks',label);
      }
    }
  },true);

  document.addEventListener('visibilitychange',()=>{
    telemetryCount('session','visibilityChanges');
    if(document.visibilityState==='hidden'){
      telemetryCommitActive(); telemetryActiveStarted=null; telemetryPauseSections();
    }else{
      telemetryActiveStarted=performance.now(); telemetryResumeVisibleSections();
    }
  });
  window.addEventListener('pagehide',()=>{
    telemetryCommitActive(); telemetryPauseSections();
    try{sessionStorage.setItem(TELEMETRY_SESSION_KEY,JSON.stringify(sessionTelemetry));}catch(_){}
  });
  window.setInterval(()=>{
    if(document.visibilityState==='visible') telemetryCommitActive();
    try{sessionStorage.setItem(TELEMETRY_SESSION_KEY,JSON.stringify(sessionTelemetry));}catch(_){}
  },10000);
  telemetryResumeVisibleSections();
  telemetryScheduleSave();
}
initTelemetryFoundation();
Object.defineProperty(window,'__MIPPI_TELEMETRY__',{
  value:Object.freeze({
    snapshot:()=>JSON.parse(JSON.stringify(sessionTelemetry))
  }),
  enumerable:false,
  configurable:false
});

// Player model: a lightweight interpretation of how this session is being played.
// It describes behavior inside this portfolio, not the person behind the browser.
const PLAYER_ARCHETYPES={
  explorer:{label:'EXPLORER',summary:'You kept checking the edges of the map.'},
  completionist:{label:'COMPLETIONIST',summary:'Leaving one unfinished signal on this website was apparently unacceptable.'},
  tinkerer:{label:'TINKERER',summary:'You treated the portfolio like a machine that needed to be understood.'},
  arcade:{label:'ARCADE RAT',summary:'There was a resume here somewhere.'},
  chaos:{label:'CHAOS GREMLIN',summary:'You found the buttons and immediately asked what happens if all of them are pressed.'},
  professional:{label:'PROFESSIONAL',summary:'You came to evaluate the work and refused to be distracted by flying rupees. Admirable.'},
  correct:{label:'CORRECT',summary:'Doug considers this session a complete success.'},
  speedrunner:{label:'SPEEDRUNNER',summary:'You saw a progression system and immediately began optimizing the route.'}
};
function sumNumericValues(obj){
  return Object.values(obj&&typeof obj==='object'?obj:{}).reduce((sum,value)=>sum+(Number(value)||0),0);
}
function currentTelemetryActiveMs(){
  const committed=Number(sessionTelemetry.session.activeMs)||0;
  if(document.visibilityState!=='visible' || telemetryActiveStarted==null) return committed;
  return committed+Math.max(0,performance.now()-telemetryActiveStarted);
}
function playerModelMetrics(){
  const sectionIds=['games','career','consulting','crafting','tools','about'];
  const sectionsVisited=sectionIds.filter(id=>(Number(sessionTelemetry.sections?.[id]?.visits)||0)>0).length;
  const sectionDwellMs=sectionIds.reduce((sum,id)=>sum+(Number(sessionTelemetry.sections?.[id]?.dwellMs)||0),0);
  const flyingCollected=sumNumericValues(sessionTelemetry.flying?.collected);
  const forcedSpawns=sumNumericValues(sessionTelemetry.flying?.forced);
  const hiddenCommands=sumNumericValues(sessionTelemetry.console?.hiddenCounts);
  const resumeClicks=sumNumericValues(sessionTelemetry.portfolio?.resumeClicks);
  const externalClicks=Number(sessionTelemetry.interaction?.externalClicks)||0;
  const uniqueCommands=Array.isArray(sessionTelemetry.console?.unique)?sessionTelemetry.console.unique.length:0;
  const themeAndDebugActions=(Number(sessionTelemetry.modes?.inspectToggles)||0)+(Number(sessionTelemetry.modes?.themeChanges)||0)+(Number(sessionTelemetry.modes?.slowmoToggles)||0)+(Number(sessionTelemetry.modes?.particleToggles)||0)+(Number(sessionTelemetry.modes?.lumenToggles)||0)+(Number(sessionTelemetry.modes?.naniteToggles)||0)+(Number(sessionTelemetry.modes?.vibeToggles)||0);
  const gameActivity=flyingCollected+(Number(sessionTelemetry.arcade?.ufoDestroyed)||0)+(Number(sessionTelemetry.flappy?.gamesStarted)||0)+(Number(sessionTelemetry.objectives?.completed)||0)+(Number(sessionTelemetry.interaction?.dougClicks)||0);
  return {sectionsVisited,sectionDwellMs,flyingCollected,forcedSpawns,hiddenCommands,resumeClicks,externalClicks,uniqueCommands,themeAndDebugActions,gameActivity,activeMs:currentTelemetryActiveMs()};
}
function recentPlayerModelMomentum(windowMs=4*60*1000){
  const boosts={explorer:0,completionist:0,tinkerer:0,arcade:0,chaos:0,professional:0,correct:0,speedrunner:0};
  const now=Date.now();
  for(const event of Array.isArray(sessionTelemetry.timeline)?sessionTelemetry.timeline:[]){
    const age=now-(Number(event.t)||0); if(age<0||age>windowMs) continue;
    const w=.35+.65*(1-age/windowMs);
    const add=(key,value)=>{boosts[key]+=value*w;};
    switch(event.type){
      case 'section_first_visit': add('explorer',1.2);add('professional',1.1);break;
      case 'external_link': add('professional',1.8);break;
      case 'hero_signal': case 'inspect_target': case 'castle_checked': add('explorer',1.8);break;
      case 'achievement_unlocked': case 'objective_completed': case 'heart_collected': add('completionist',1.8);break;
      case 'shop_purchase': add('completionist',1.0);add('tinkerer',1.0);break;
      case 'console_opened': case 'inspect_mode': case 'design_mode': case 'blueprint_opened': case 'blueprint_validated': case 'theme_changed': case 'tool_filter': add('tinkerer',1.5);break;
      case 'console_command':
        if(event.hidden){add('speedrunner',1.5);add('chaos',1.2);} else if(event.valid===false){add('chaos',1.2);add('tinkerer',.6);} else add('tinkerer',.8);
        break;
      case 'flying_collected': if(event.kind==='ufo'||event.kind==='boss_ufo'||event.kind==='super_boss')add('arcade',1.8); else add('completionist',.45);break;
      case 'boss_defeated': case 'super_boss_defeated': case 'flappy_started': case 'flappy_game_over': add('arcade',2.0);break;
      case 'doug_interaction': case 'doug_pet': case 'doug_cool_mode': add('correct',1.8);break;
      case 'godmode_used': case 'easy_mode': add('speedrunner',2.0);add('chaos',.9);break;
      case 'cheat_requested': add('speedrunner',2.4);break;
      case 'system_combo': add('tinkerer',1.0);add('chaos',.6);break;
    }
  }
  return boosts;
}
function computePlayerModel({record=false}={}){
  const t=sessionTelemetry, m=playerModelMetrics(), recent=recentPlayerModelMomentum();
  const achievementsFound=Array.isArray(t.achievements?.keys)?t.achievements.keys.length:Number(t.achievements?.unlocks)||0;
  const inspectTargets=Number(t.modes?.inspectHoverCount)||0;
  const cap=(v,max)=>Math.min(max,Math.max(0,Number(v)||0));
  const scores={
    explorer:
      m.sectionsVisited*2.0+cap(t.portfolio?.heroSignalClicks,6)*1.05+cap(t.portfolio?.galleryOpens,4)*1.35+
      cap(inspectTargets,10)*.85+cap(t.economy?.castlesChecked,4)*1.15+cap(m.flyingCollected,12)*.18+recent.explorer*2.15,
    completionist:
      achievementsFound*1.55+cap(t.objectives?.completed,8)*1.55+cap(t.economy?.heartsCollected,5)*1.0+
      cap(t.economy?.keysCollected,4)*1.0+cap(t.achievements?.hints,5)*.45+cap(t.economy?.shopPurchases,10)*.65+recent.completionist*2.0,
    tinkerer:
      cap(t.console?.commands,28)*.24+cap(m.uniqueCommands,16)*.72+cap(t.console?.invalid,8)*.4+cap(inspectTargets,10)*.65+
      cap(m.themeAndDebugActions,14)*.45+cap(t.wish?.blueprintOpens,4)*1.5+cap(t.wish?.validInserted,2)*2.6+
      cap(t.economy?.shopEquips,8)*.8+cap(t.economy?.shopUnequips,6)*.55+recent.tinkerer*2.25,
    arcade:
      cap(t.arcade?.ufoDestroyed,15)*.8+cap(t.arcade?.bossDefeated,3)*3.5+cap(t.arcade?.superBossDefeated,2)*6.5+cap(t.arcade?.playerHits,10)*.25+
      cap(t.flappy?.gamesStarted,8)*.9+cap(t.flappy?.highScore,18)*.18+cap(t.combos?.starPowerUfoKills,5)*1.15+recent.arcade*2.25,
    chaos:
      cap(m.hiddenCommands,5)*1.45+cap(t.achievements?.godmodeUses,2)*4.5+cap(t.console?.invalid,10)*.65+
      cap(t.modes?.themeChanges,12)*.32+cap(m.forcedSpawns,12)*.42+Math.min(5,(Number(t.interaction?.clicks)||0)/80)+
      cap(t.modes?.particleToggles,6)*.5+cap(t.modes?.vibeToggles,6)*.5+recent.chaos*2.25,
    professional:
      m.sectionsVisited*2.05+Math.min(14,(m.sectionDwellMs/60000)*.85)+cap(m.externalClicks,8)*1.25+cap(m.resumeClicks,4)*2.0+
      Math.max(0,6-m.gameActivity*.28)+recent.professional*1.85,
    correct:
      cap(t.economy?.bonesCollected,10)*2.0+cap(t.interaction?.dougClicks,15)*.9+
      cap(t.console?.commandCounts?.doug,5)*1.2+cap(t.economy?.heartsCollected,5)*.3+recent.correct*2.35,
    speedrunner:
      cap(t.assistance?.cheatUses,4)*2.8+cap(t.assistance?.godmodeUses,2)*6+m.hiddenCommands*1.65+
      cap(t.assistance?.easyModeUses,3)*.9+((achievementsFound>=8&&m.activeMs<6*60*1000)?5:0)+recent.speedrunner*2.2
  };
  const evidence=Math.round(
    m.sectionsVisited+achievementsFound+(Number(t.console?.commands)||0)*.55+m.flyingCollected*.45+
    (Number(t.arcade?.ufoDestroyed)||0)+(Number(t.flappy?.gamesStarted)||0)+(Number(t.interaction?.dougClicks)||0)*.6+
    (Number(t.objectives?.completed)||0)*1.5+m.externalClicks*.8
  );
  const ranked=Object.entries(scores).sort((a,b)=>b[1]-a[1]);
  const [primaryKey,primaryScore]=ranked[0];
  const [secondaryKey,secondaryScore]=ranked[1];
  const enoughEvidence=evidence>=8 && primaryScore>=7;
  const closeRace=enoughEvidence && secondaryScore>=7 && primaryScore-secondaryScore<2.25;
  const confidence=enoughEvidence?Math.max(48,Math.min(96,Math.round(52+Math.min(22,(primaryScore-secondaryScore)*5)+Math.min(22,evidence*1.2)))):Math.min(47,Math.max(12,evidence*5));
  const primary=PLAYER_ARCHETYPES[primaryKey];
  const secondary=PLAYER_ARCHETYPES[secondaryKey];
  const label=!enoughEvidence?'FORMING':closeRace?`${primary.label} / ${secondary.label}`:primary.label;
  const summary=!enoughEvidence?'Keep exploring. The model needs more behavior before pretending it knows what you are doing.':closeRace?`${primary.summary} ${secondary.summary}`:primary.summary;
  const result={label,primary:enoughEvidence?primaryKey:null,secondary:closeRace?secondaryKey:null,confidence,evidence,scores:Object.fromEntries(Object.entries(scores).map(([k,v])=>[k,Math.round(v*10)/10])),summary,metrics:m,recentMomentum:Object.fromEntries(Object.entries(recent).map(([k,v])=>[k,Math.round(v*10)/10]))};
  if(record){
    const pm=t.playerModel;
    pm.evaluations=(Number(pm.evaluations)||0)+1;
    const changed=pm.label!==label;
    pm.label=label; pm.primary=result.primary; pm.secondary=result.secondary; pm.confidence=confidence; pm.evidence=evidence; pm.lastUpdatedAt=Date.now();
    if(changed){
      pm.history.push({t:Date.now(),label,confidence,evidence});
      if(pm.history.length>20) pm.history.splice(0,pm.history.length-20);
    }
    telemetryScheduleSave();
  }
  return result;
}
function formatSessionDuration(ms){
  const total=Math.max(0,Math.floor((Number(ms)||0)/1000));
  const minutes=Math.floor(total/60), seconds=total%60;
  return minutes?`${minutes}m ${String(seconds).padStart(2,'0')}s`:`${seconds}s`;
}
function sessionStatsSnapshot(){
  telemetryCommitActive();
  const model=computePlayerModel({record:true});
  const sections=['games','career','consulting','crafting','tools','about'];
  const sectionsVisited=sections.filter(id=>(Number(sessionTelemetry.sections?.[id]?.visits)||0)>0).length;
  const collected=sumNumericValues(sessionTelemetry.flying?.collected);
  return {
    duration:formatSessionDuration(currentTelemetryActiveMs()),
    sectionsVisited,sectionsTotal:sections.length,
    signals:unlockedAchievements.size,signalsTotal:ACHIEVEMENT_KEYS.length,
    flyingCollected:collected,
    ufoDestroyed:Number(sessionTelemetry.arcade?.ufoDestroyed)||0,
    bossDefeated:Number(sessionTelemetry.arcade?.bossDefeated)||0,
    superBossDefeated:Number(sessionTelemetry.arcade?.superBossDefeated)||0,
    bones:Number(sessionTelemetry.economy?.bonesCollected)||0,
    coolness:Math.round(dougCoolProgress),
    hearts:Number(sessionTelemetry.economy?.heartsCollected)||0,
    mushrooms:Number(sessionTelemetry.economy?.mushroomsCollected)||0,
    mushroomProgress:mushroomLifeProgress,
    birdLivesBank:mushroomBankLives,
    rupeesEarned:Number(sessionTelemetry.economy?.rupeesEarned)||0,
    rupeesSpent:Number(sessionTelemetry.economy?.rupeesSpent)||0,
    wallet:rupeeWallet,
    shopOwned:shopOwned.size,
    flappyHigh:Math.max(Number(sessionTelemetry.flappy?.highScore)||0,Number(flappySessionHighScore)||0),
    consoleCommands:Number(sessionTelemetry.console?.commands)||0,
    wishes:Number(sessionTelemetry.wish?.successful)||0,
    wishCharge:wishCharge,
    objectives:Number(sessionTelemetry.objectives?.completed)||0,
    themes:availableThemeModes().length,
    assistance:{
      hints:Number(sessionTelemetry.assistance?.hintUses)||0,
      cheats:Number(sessionTelemetry.assistance?.cheatUses)||0,
      easy:Number(sessionTelemetry.assistance?.easyModeUses)||0,
      godmode:Number(sessionTelemetry.assistance?.godmodeUses)||0
    },
    model
  };
}
function printSessionStats(){
  const x=sessionStatsSnapshot();
  consolePrint('SESSION TELEMETRY','good');
  consolePrint(`Time Exploring      ${x.duration}`);
  consolePrint(`Sections Visited    ${x.sectionsVisited} / ${x.sectionsTotal}`);
  consolePrint(`Signals Found       ${x.signals} / ${x.signalsTotal}`);
  consolePrint(`Flying Objects      ${x.flyingCollected}`);
  consolePrint(`UFOs Destroyed      ${x.ufoDestroyed}`);
  consolePrint(`Boss UFOs           ${x.bossDefeated}`);
  consolePrint(`Super Bosses        ${x.superBossDefeated}`);
  consolePrint(`Doug Bones          ${x.bones}`);
  consolePrint(`Morale              ${x.bones}`);
  consolePrint(`Coolness            ${x.coolness}%`);
  consolePrint(`Hearts              ${x.hearts}`);
  consolePrint(`Mushrooms           ${x.mushrooms} // ${x.mushroomProgress}/20 next life`);
  consolePrint(`Bird Lives Bank     ${x.birdLivesBank}`);
  consolePrint(`Rupees Earned       ${x.rupeesEarned}`);
  consolePrint(`Rupees Spent        ${x.rupeesSpent}`);
  consolePrint(`Wallet              ${x.wallet}`);
  consolePrint(`Shop Items Owned    ${x.shopOwned}`);
  consolePrint(`Mippi Bird High     ${x.flappyHigh}`);
  consolePrint(`Console Commands    ${x.consoleCommands}`);
  consolePrint(`Wishes Made         ${x.wishes}`);
  consolePrint(`Wish Charge         ${x.wishCharge} / 1`);
  consolePrint(`Objectives Complete ${x.objectives}`);
  consolePrint(`Themes Unlocked     ${x.themes} / 3`);
  consolePrint('');
  consolePrint(`PLAYER MODEL // ${x.model.label}`,'good');
  consolePrint(x.model.summary);
  consolePrint(`MODEL CONFIDENCE // ${x.model.confidence}%`);
  consolePrint('MODEL WINDOW // recent behavior is weighted heavily; this profile can change.');
  const used=[];
  if(x.assistance.easy) used.push('Easy Mode');
  if(x.assistance.hints) used.push(`Hints x${x.assistance.hints}`);
  if(x.assistance.cheats) used.push(`Cheat x${x.assistance.cheats}`);
  if(x.assistance.godmode) used.push('God Mode');
  consolePrint(`ASSISTANCE // ${used.length?used.join(' · '):'None'}`);
}
Object.defineProperty(window,'__MIPPI_PLAYER_MODEL__',{
  value:Object.freeze({snapshot:()=>JSON.parse(JSON.stringify(computePlayerModel({record:false})))}),
  enumerable:false,
  configurable:false
});
window.setInterval(()=>computePlayerModel({record:true}),15000);

navToggle?.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  navToggle.setAttribute('aria-expanded', String(open));
});

nav?.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
  nav.classList.remove('open');
  navToggle?.setAttribute('aria-expanded', 'false');
}));

// Explicit scroll handler because a sticky header is a lousy scroll target in some browser/layout combinations.
document.querySelector('#return-to-top')?.addEventListener('click', event => {
  event.preventDefault();
  window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
});

// Best-effort hardware acceleration check. Browsers do not expose a universal "hardware acceleration" flag,
// so this only warns when WebGL is missing or the renderer clearly identifies itself as software.
const hardwareWarning = document.querySelector('#hardware-warning');
const hardwareWarningClose = document.querySelector('#hardware-warning-close');
function detectSoftwareRendering() {
  try {
    const probe = document.createElement('canvas');
    const gl = probe.getContext('webgl2', { powerPreference:'high-performance' }) || probe.getContext('webgl', { powerPreference:'high-performance' });
    if (!gl) return true;
    const ext = gl.getExtension('WEBGL_debug_renderer_info');
    const renderer = ext ? String(gl.getParameter(ext.UNMASKED_RENDERER_WEBGL) || '') : String(gl.getParameter(gl.RENDERER) || '');
    if (!renderer) return false;
    return /(swiftshader|llvmpipe|software rasterizer|software renderer|microsoft basic render|mesa offscreen|angle.*software)/i.test(renderer);
  } catch (_) {
    return false;
  }
}
if (detectSoftwareRendering()) hardwareWarning?.classList.add('show');
hardwareWarningClose?.addEventListener('click', () => hardwareWarning?.classList.remove('show'));

document.querySelectorAll('.signal').forEach(button => {
  button.addEventListener('click', event => {
    if(document.body.classList.contains('interaction-hunt')){ event.preventDefault(); return; }
    telemetryCount('portfolio','heroSignalClicks');
    telemetryMeaningful('hero_signal',{target:button.dataset.target||'unknown'});
    const target = document.getElementById(button.dataset.target);
    target?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});

window.addEventListener('mippi:perspective-change',event=>{
  const mode=event.detail?.mode||'unknown';
  telemetryCount('portfolio.perspectiveModes',mode);
  if(mode==='2nd') telemetryCount('portfolio','secondPersonToggles');
  telemetryMeaningful('perspective_mode',{mode});
  showAchievement('secondPerson');
});

mippiRuntimeHealth.bootStage='core-interactions-ready';

const filters = [...document.querySelectorAll('.filter')];
const tools = [...document.querySelectorAll('.tool-card')];
filters.forEach(button => {
  button.addEventListener('click', () => {
    const selected = button.dataset.filter;
    telemetryCount('portfolio.filters',selected||'unknown');
    telemetryMeaningful('tool_filter',{filter:selected||'unknown'});
    filters.forEach(filter => filter.classList.toggle('active', filter === button));
    tools.forEach(card => {
      const states = card.dataset.status?.split(' ') ?? [];
      card.classList.toggle('hidden', selected !== 'all' && !states.includes(selected));
    });
  });
});

const ACHIEVEMENTS = {
  curious: {
    title:'Curious Mind',
    detail:'You clicked the logo. Of course you did.',
    hint:'The logo in the header is not just decoration.',
    solution:'Click the Mippi logo in the upper-left header once.'
  },
  secondPerson: {
    title:'Second Perspective',
    detail:'You looked at the problem from somewhere else.',
    hint:'Try changing your perspective.',
    solution:'Scroll to Project Heavy Water and use the Perspective Visualizer.'
  },
  signal: {
    title:'Signal Acquired',
    detail:'You used the hero scene as navigation.',
    hint:'The hero scene can do more than idle.',
    solution:'Click any of the floating interactive 3D signal objects in the hero scene.'
  },
  wip: {
    title:'Under Construction',
    detail:'You went looking for the unfinished stuff.',
    hint:'A filter might reveal something that is not ready to ship yet.',
    solution:'In Unreal Tools, click the WIP filter.'
  },
  ghost: {
    title:'Ghost in the Machine',
    detail:'You caught something that was only passing through.',
    hint:'Some signals are only in the viewport briefly.',
    solution:'Wait for the small glowing diamond signal that occasionally appears over the page, then click it before it disappears.'
  },
  lore: {
    title:'The Whole Story',
    detail:'You chose the long résumé.',
    hint:'The short version never tells the whole story.',
    solution:'In the résumé section, open the Long résumé.'
  },
  doug: {
    title:'Best Boy',
    detail:'You gave studio morale the attention it deserves.',
    hint:'Some coworkers appreciate repeated attention.',
    solution:'Click Doug five times.'
  },
  unmark: {
    title:'Unmarked',
    detail:'You clicked the markdown bat.',
    hint:'One tool has something hidden in its mark.',
    solution:'In Unreal Tools, click the Unmark feature artwork/logo.'
  },
  nda: {
    title:'Classified',
    detail:'Nice try. The NDA still wins.',
    hint:'Classified does not always mean unresponsive.',
    solution:'In the Career NDA card, click the pixel-art Mob logo.'
  },
  konami: {
    title:'Old Habits',
    detail:'You still remember the sequence.',
    hint:'An old-school cheat code input may still work.',
    solution:'Enter the Konami code: Up, Up, Down, Down, Left, Right, Left, Right, B, A.'
  }
};
const ACHIEVEMENT_KEYS = Object.keys(ACHIEVEMENTS);
const POSTGAME_ACHIEVEMENTS={
  post_signals:{rarity:'epic',title:'Signal Saturation',detail:'All 10 Signals found. The original hunt is complete.',hint:'The first layer has ten hidden Signals.',solution:'Find all 10 original Signals in the Achievement Ledger.'},
  post_cool:{rarity:'epic',title:'Maximum Cool',detail:'Doug reached maximum Coolness at least once.',hint:'Morale has a visible limit.',solution:'Collect Doug Bones until the COOLNESS meter reaches 100% and activates Cool Mode.'},
  post_legendary:{rarity:'epic',title:'Gold Standard',detail:'Legendary rarity was unlocked.',hint:'Epic is not the final rarity.',solution:'After 10/10 Signals, catch a Shooting Star, repair BP_WishManager, and successfully make a validated Wish to unlock Legendary.'},
  post_wish:{rarity:'epic',title:'Reality Validated',detail:'A validated Wish successfully reached Grant Wish.',hint:'Reality dislikes null references.',solution:'Charge the wish command with a Shooting Star, insert Is Valid in BP_WishManager, then successfully complete a Wish.'},
  post_hearts:{rarity:'epic',title:'Full Hearts',detail:'Five Hearts collected.',hint:'Some pickups look suspiciously familiar.',solution:'Collect 5 Heart pickups.'},
  post_shop:{rarity:'epic',title:'Buy the Store',detail:'Every Shop item purchased.',hint:'Rupees eventually become a completion problem.',solution:'Purchase every item in the Rupee Shop, including the final Design Mode capstone.'},
  post_castles:{rarity:'epic',title:'Another Castle',detail:'Four Castles checked in one run.',hint:'One wrong Castle is a joke. Four is a system.',solution:'Collect Keys and check Castles until the CASTLES meter reaches 4/4.'},
  post_sections:{rarity:'epic',title:'Grand Tour',detail:'Every major portfolio section visited.',hint:'There are six major professional sections.',solution:'Visit Games, Career, Consulting, Crafting, Tools, and About.'},
  post_superboss:{rarity:'epic',title:'Air Superiority',detail:'The Super UFO Boss was defeated.',hint:'The invasion escalates beyond the normal Boss.',solution:'Keep defeating UFOs and Bosses until the Super UFO Boss appears, then defeat it.'},
  post_complete:{rarity:'legendary',title:'100% Complete',detail:'You beat the website. The Music Player is yours.',hint:'Nine Epic achievements and the Finale stand between you and the true reward.',solution:'Complete all nine Epic postgame achievements and view the Finale.'}
};
const POSTGAME_EPIC_KEYS=['post_signals','post_cool','post_legendary','post_wish','post_hearts','post_shop','post_castles','post_sections','post_superboss'];
const POSTGAME_LEGENDARY_KEY='post_complete';
const achievementProgress = document.querySelector('#achievement-progress');
const achievementLabel = document.querySelector('#achievement-label');
const achievementTitle = document.querySelector('#achievement-title');
const achievementDetail = document.querySelector('#achievement-detail');
const ledgerTrigger = document.querySelector('#ledger-trigger');
const ledgerCount = document.querySelector('#ledger-count');
const ledger = document.querySelector('#achievement-ledger');
const ledgerClose = document.querySelector('#ledger-close');
const ledgerList = document.querySelector('#ledger-list');
const inspectToggle = document.querySelector('#inspect-toggle');
const designToggle = document.querySelector('#design-toggle');
const themeCycle = document.querySelector('#theme-cycle');
const objectiveHud = document.querySelector('#dynamic-objective');
const objectiveKicker = document.querySelector('#objective-kicker');
const objectiveTitle = document.querySelector('#objective-title');
const objectiveDetail = document.querySelector('#objective-detail');
const objectiveProgressText = document.querySelector('#objective-progress-text');
const objectiveReward = document.querySelector('#objective-reward');
const objectiveBar = document.querySelector('#objective-progress-fill');
const objectiveDismiss = document.querySelector('#objective-dismiss');
const progressHud = document.querySelector('#progress-hud');
const heartMeter = document.querySelector('#heart-meter');
const rupeeCount = document.querySelector('#rupee-count');
const rupeeMeter = document.querySelector('#rupee-meter');
const metaTrace = document.querySelector('#meta-trace');
const metaTraceKicker = document.querySelector('#meta-trace-kicker');
const metaTraceText = document.querySelector('#meta-trace-text');
const coolMeter = document.querySelector('#cool-meter');
const coolMeterValue = document.querySelector('#cool-meter-value');
const coolMeterFill = document.querySelector('#cool-meter-fill');
const invasionMeter = document.querySelector('#invasion-meter');
const invasionMeterValue = document.querySelector('#invasion-meter-value');
const invasionMeterFill = document.querySelector('#invasion-meter-fill');
const castleMeter = document.querySelector('#castle-meter');
const castleMeterValue = document.querySelector('#castle-meter-value');
const castleMeterFill = document.querySelector('#castle-meter-fill');
const interactToggle = document.querySelector('#interact-toggle');
const shopPopup = document.querySelector('#shop-popup');
const finaleOverlay=document.querySelector('#finale-overlay');
const finaleLine=document.querySelector('#finale-line');
const finaleSubline=document.querySelector('#finale-subline');
const finaleProfile=document.querySelector('#finale-profile');
const finaleControls=document.querySelector('#finale-controls');
const finaleContinue=document.querySelector('#finale-continue');
const finaleStats=document.querySelector('#finale-stats');
const sessionDebrief=document.querySelector('#session-debrief');
const sessionDebriefTitle=document.querySelector('#session-debrief-title');
const sessionDebriefSummary=document.querySelector('#session-debrief-summary');
const sessionDebriefGrid=document.querySelector('#session-debrief-grid');
const sessionDebriefObservations=document.querySelector('#session-debrief-observations');
const sessionDebriefAssistance=document.querySelector('#session-debrief-assistance');
const sessionDebriefClose=document.querySelector('#session-debrief-close');
const sessionDebriefContinue=document.querySelector('#session-debrief-continue');
const musicPlayer=document.querySelector('#music-player');
const musicCollapse=document.querySelector('#music-collapse');
const musicTrackTitle=document.querySelector('#music-track-title');
const musicTrackStatus=document.querySelector('#music-track-status');
const musicTrackCount=document.querySelector('#music-track-count');
const musicPrev=document.querySelector('#music-prev');
const musicPlay=document.querySelector('#music-play');
const musicNext=document.querySelector('#music-next');
const musicDownload=document.querySelector('#music-download');
const musicTrackList=document.querySelector('#music-track-list');
const musicRepeat=document.querySelector('#music-repeat');
const musicShuffle=document.querySelector('#music-shuffle');
const musicLyricsPanel=document.querySelector('#music-lyrics-panel');
const musicLyricsTitle=document.querySelector('#music-lyrics-title');
const musicLyricsContent=document.querySelector('#music-lyrics-content');
const musicLyricsClose=document.querySelector('#music-lyrics-close');
const musicAudio=document.querySelector('#music-audio');
const musicSeek=document.querySelector('#music-seek');
const musicCurrentTime=document.querySelector('#music-current-time');
const musicDuration=document.querySelector('#music-duration');
const musicLyricsToggle=document.querySelector('#music-lyrics-toggle');
const musicLyricsModeButton=document.querySelector('#music-lyrics-mode');
const musicMiniControls=document.querySelector('#music-mini-controls');
const musicStandardControls=document.querySelector('.music-player .music-controls');
const MUSIC_LYRICS_MODE_KEY='mippi-music-lyrics-mode-v1';
function syncMusicMinimizedControls(){
  if(!musicMiniControls||!musicStandardControls||!musicPlay||!musicNext)return;
  const minimized=!!musicPlayer?.classList.contains('collapsed');
  const target=minimized?musicMiniControls:musicStandardControls;
  if(minimized){target.append(musicPlay,musicNext);}
  else{
    // Preserve the original Previous, Play, Next order in the expanded row.
    const prev=document.getElementById('music-prev');
    if(prev){prev.after(musicPlay);musicPlay.after(musicNext);}
  }
  musicMiniControls.hidden=!minimized;
}
function syncMusicLyricsPanelHeight(){
  if(!musicPlayer||!musicLyricsPanel||musicLyricsPanel.hidden)return;
  musicLyricsPanel.style.setProperty('--music-companion-height',`${Math.round(musicPlayer.getBoundingClientRect().height)}px`);
}
if(typeof ResizeObserver==='function'&&musicPlayer){
  new ResizeObserver(()=>syncMusicLyricsPanelHeight()).observe(musicPlayer);
}

let musicPreferredLyricsMode='full';
try{musicPreferredLyricsMode=localStorage.getItem(MUSIC_LYRICS_MODE_KEY)==='single'?'single':'full';}catch(_){}
const musicIconShapes={
  previous:'<path d="M5 5v14M19 5 8 12l11 7V5Z"/>',
  next:'<path d="M19 5v14M5 5l11 7-11 7V5Z"/>',
  play:'<path d="m8 5 11 7-11 7V5Z"/>',
  pause:'<rect x="6" y="4" width="4" height="16" rx="1"/><rect x="14" y="4" width="4" height="16" rx="1"/>',
  download:'<path d="M12 3v12m-5-5 5 5 5-5M4 17v3h16v-3"/>',
  repeat:'<path d="m17 2 4 4-4 4M3 11V8a2 2 0 0 1 2-2h16M7 22l-4-4 4-4m14-1v3a2 2 0 0 1-2 2H3"/>',
  repeat1:'<path d="m17 2 4 4-4 4M3 11V8a2 2 0 0 1 2-2h16M7 22l-4-4 4-4m14-1v3a2 2 0 0 1-2 2H3"/><text x="12" y="15.5" text-anchor="middle" font-size="9" stroke="none" fill="currentColor">1</text>',
  shuffle:'<path d="M3 17h2c6 0 7-10 14-10h2m-4-4 4 4-4 4M3 7h2c2 0 3 1 4 3m4 4c2 3 4 3 6 3h2m-4-4 4 4-4 4"/>',
  lyrics:'<path d="M6 4h12M6 9h12M6 14h8M6 19h10"/>'
};
function musicSetIcon(el,name){if(!el)return;el.innerHTML=`<svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">${musicIconShapes[name]}</svg>`;}
function musicSyncPlayIcon(){musicSetIcon(musicPlay,musicAudio&&!musicAudio.paused?'pause':'play');musicPlay?.setAttribute('aria-label',musicAudio&&!musicAudio.paused?'Pause song':'Play song');}
function musicTimeLabel(time){const t=Number.isFinite(time)?Math.max(0,Math.floor(time)):0;return `${Math.floor(t/60)}:${String(t%60).padStart(2,'0')}`;}
function musicSyncProgress(){
  if(!musicAudio)return;
  const duration=Number.isFinite(musicAudio.duration)?musicAudio.duration:0;
  if(musicCurrentTime)musicCurrentTime.textContent=musicTimeLabel(musicAudio.currentTime);
  if(musicDuration)musicDuration.textContent=musicTimeLabel(duration);
  if(musicSeek){musicSeek.disabled=!duration; if(document.activeElement!==musicSeek)musicSeek.value=duration?String(Math.round(musicAudio.currentTime/duration*1000)):'0';}
}
function musicSyncLyricsMode(){
  const single=musicPreferredLyricsMode==='single'||!!musicPlayer?.classList.contains('collapsed');
  musicLyricsPanel?.classList.toggle('single',single);
  if(musicLyricsModeButton){musicLyricsModeButton.textContent=single?'SINGLE':'FULL';musicLyricsModeButton.disabled=!!musicPlayer?.classList.contains('collapsed');}
  document.body.classList.toggle('music-minimized-lyrics',!!musicPlayer?.classList.contains('collapsed')&&!musicLyricsPanel?.hidden);
  updateMusicLyricsSync();
  syncMusicLyricsPanelHeight();
}

const shopClose = document.querySelector('#shop-close');
const shopItemsEl = document.querySelector('#shop-items');
const shopWalletCount = document.querySelector('#shop-wallet-count');
const shopEquippedName = document.querySelector('#shop-equipped-name');
const shopUnequip = document.querySelector('#shop-unequip');
const shopMerchant = document.querySelector('#shop-merchant');
const unrealGiftPopup = document.querySelector('#unreal-gift-popup');
const unrealGiftAccept = document.querySelector('#unreal-gift-accept');
const unrealGiftDecline = document.querySelector('#unreal-gift-decline');
const achievementClose = document.querySelector('#achievement-close');
const hintTrigger = document.querySelector('#hint-trigger');
const STORAGE_KEY = 'mippi-achievements-v2';
const THEME_KEY = 'mippi-completion-theme';
const THEME_MODE_KEY = 'mippi-theme-mode-v1';
const HEART_KEY = 'mippi-heart-pickups-v1';
const HEART_REWARD_KEY = 'mippi-heart-reward-v1';
const RUPEE_WALLET_KEY = 'mippi-rupee-wallet-v1';
const RUPEE_DISCOVERED_KEY = 'mippi-rupee-discovered-v1';
const SHOP_STATE_KEY = 'mippi-shop-state-v1';
const LEGENDARY_UNLOCK_KEY = 'mippi-legendary-unlocked';
const LEGENDARY_THEME_KEY = 'mippi-legendary-theme';
const INSPECT_KEY = 'mippi-inspect-mode';
const DESIGN_KEY = 'mippi-design-mode';
const DESIGN_UNLOCK_KEY = 'mippi-design-mode-unlocked-v1';
const FINALE_SEEN_KEY = 'mippi-finale-seen-v1';
const FINALE_WISH_KEY = 'mippi-finale-wish-v1';
const FINALE_BOSS_KEY = 'mippi-finale-boss-v1';
const WISH_CHARGE_KEY = 'mippi-wish-charge-v1';
const MUSHROOM_PROGRESS_KEY = 'mippi-mushroom-progress-v1';
const MUSHROOM_LIVES_KEY = 'mippi-bird-mushroom-lives-v1';
const DOUG_COOL_PROGRESS_KEY = 'mippi-doug-cool-progress-v1';
const CASTLE_PROGRESS_KEY = 'mippi-castle-run-progress-v1';
const INTRO_HINT_SESSION_KEY = 'mippi-achievement-intro-hint-v1';
const EPIC_WELCOME_SESSION_KEY = 'mippi-epic-airspace-welcome-v1';
const INTRO_HINT_DELAY_MS = 6000;
let unlockedAchievements = new Set();
try {
  unlockedAchievements = new Set(JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]').filter(key => ACHIEVEMENTS[key]));
} catch (_) {}
let achievementTimer;
let introHintTimer;
let completionCelebrated = false;
let legendaryUnlocked = false;
try { legendaryUnlocked = localStorage.getItem(LEGENDARY_UNLOCK_KEY) === '1'; } catch (_) {}
let heartCount=0;
let heartRewardShown=false;
try { heartCount=Math.max(0,Math.min(5,Number(localStorage.getItem(HEART_KEY)||0))); heartRewardShown=localStorage.getItem(HEART_REWARD_KEY)==='1'; } catch (_) {}
let cursorPowerLevel=0;
let rupeeWallet=0;
try { rupeeWallet=Math.max(0,Number(localStorage.getItem(RUPEE_WALLET_KEY)||0)); } catch (_) {}
let rupeeDiscovered=false;
let wishCharge=0;
let mushroomLifeProgress=0;
let mushroomBankLives=0;
let dougCoolProgress=0;
let castleRunProgress=0;

// These values are HUD-readable during the first startup refresh.
// Keep them here, before updateHeartMeter() can transitively reach
// updateInvasionMeter() / updateCastleMeter().
let ufoKills=0;
let nextBossKillThreshold=10; // legacy DEV compatibility only
let invasionWaveKills=0;
let invasionEncounterPending=false;
let invasionSpawnQueued=false;
let invasionBossRetryKills=0;
let ufoBossActive=false;
let superBossActive=false;
let superBossRuntime=null;
let ufoCalmUntil=0;
let arcadeCursorHits=0;
let castleQuestActive=false;
let activeCastle=null;

let dougCoolActive=false;
let dougCoolTimer=null;
let dougCoolDrainTimer=null;
// Must exist before the first progress-HUD refresh. updateCoolMeter() reads this
// during startup, before the ambient pickup systems are initialized later.
let dougBoneCount = Number(sessionTelemetry.economy?.bonesCollected)||0;
let designModeUnlocked=false;
let interactModeEnabled=false;
let finaleReady=false,finaleRunning=false,finaleSeen=false,finaleWishSatisfied=false,finaleBossSatisfied=false;
try{finaleSeen=localStorage.getItem(FINALE_SEEN_KEY)==='1';finaleWishSatisfied=localStorage.getItem(FINALE_WISH_KEY)==='1'||(Number(sessionTelemetry.wish?.successful)||0)>0;finaleBossSatisfied=localStorage.getItem(FINALE_BOSS_KEY)==='1'||(Number(sessionTelemetry.arcade?.bossDefeated)||0)>0||(Number(sessionTelemetry.arcade?.superBossDefeated)||0)>0;}catch(_){}
try{
  wishCharge=Math.max(0,Math.min(1,Number(localStorage.getItem(WISH_CHARGE_KEY)||0)));
  mushroomLifeProgress=Math.max(0,Math.min(19,Number(localStorage.getItem(MUSHROOM_PROGRESS_KEY)||0)));
  mushroomBankLives=Math.max(0,Number(localStorage.getItem(MUSHROOM_LIVES_KEY)||0));
  dougCoolProgress=Math.max(0,Math.min(100,Number(sessionStorage.getItem(DOUG_COOL_PROGRESS_KEY)||0)));
  castleRunProgress=Math.max(0,Math.min(4,Number(localStorage.getItem(CASTLE_PROGRESS_KEY)||0)));
  designModeUnlocked=localStorage.getItem(DESIGN_UNLOCK_KEY)==='1';
}catch(_){}
const SHOP_ITEMS=[
  {id:'lucky-charm',name:'Lucky Charm',cost:2,slot:'gameplay',rarity:'rare',tag:'DISCOVERY',description:'Hearts, Keys, and Stars become somewhat more likely to appear.'},
  {id:'dog-whistle',name:'Dog Whistle',cost:2,slot:'gameplay',rarity:'rare',tag:'MORALE',description:'Doug Bones enter the flight schedule more often once Doug is in command.'},
  {id:'star-extender',name:'Star Extender',cost:3,slot:'gameplay',rarity:'rare',tag:'POWER-UP',description:'Star Power lasts about two seconds longer.'},
  {id:'slowpoke',name:'Slowpoke',cost:3,slot:'gameplay',rarity:'rare',tag:'TIMING',description:'New flying objects remain on screen about 35% longer.'},
  {id:'interact-toggle',name:'Interact Toggle',cost:4,slot:'passive',rarity:'epic',tag:'FOCUS',requires:'epic',description:'Adds an Interact Mode toggle that dims the portfolio body and disables its normal links and controls while you hunt game-layer interactions.'},
  {id:'bird-extra-life',name:'Mippi Bird Extra Life',cost:4,slot:'passive',rarity:'epic',tag:'MIPPI BIRD',description:'Every new Mippi Bird round gets one rechargeable hit shield. On impact, Mippi blinks invulnerable instead of crashing.'},
  {id:'production-discount',name:'Production Discount',cost:6,slot:'passive',rarity:'epic',tag:'ECONOMY',description:'A permanent passive discount on unowned shop inventory.'},
  {id:'celestial-beacon',name:'Celestial Beacon',cost:7,slot:'passive',rarity:'epic',tag:'CELESTIAL',requires:'epic',description:'Once Epic is unlocked, Shooting Stars appear more often and remain catchable longer.'},
  {id:'golden-trigger',name:'Golden Trigger',cost:5,slot:'gameplay',rarity:'legendary',tag:'WEAPON',requires:'legendary',description:'Once Legendary is unlocked, cursor shots acquire targets farther away and travel faster in every visual theme.'},
  {id:'design-mode-unlock',name:'Design Mode Unlocked',cost:10,slot:'passive',rarity:'legendary',tag:'CAPSTONE',requires:'shop-master',description:'Unlock the portfolio commentary layer that explains why the systems were designed this way.'}
];
let shopOwned=new Set();
let shopEquipped=null;
try {
  const stored=JSON.parse(localStorage.getItem(SHOP_STATE_KEY)||'{}');
  const migratedOwned=Array.isArray(stored.owned)?stored.owned.map(id=>id==='galaga-warranty'?'bird-extra-life':id==='tractor-beam'?'interact-toggle':id):[];
  shopOwned=new Set(migratedOwned.filter(id=>SHOP_ITEMS.some(item=>item.id===id)));
  const migratedEquipped=(stored.equipped==='galaga-warranty'||stored.equipped==='tractor-beam')?null:stored.equipped;
  shopEquipped=typeof migratedEquipped==='string'&&shopOwned.has(migratedEquipped)&&shopItem(migratedEquipped)?.slot==='gameplay'?migratedEquipped:null;
  rupeeDiscovered=localStorage.getItem(RUPEE_DISCOVERED_KEY)==='1'||rupeeWallet>0||shopOwned.size>0;
  if(shopOwned.has('design-mode-unlock')){designModeUnlocked=true;localStorage.setItem(DESIGN_UNLOCK_KEY,'1');}
  if(rupeeDiscovered) localStorage.setItem(RUPEE_DISCOVERED_KEY,'1');
} catch (_) { rupeeDiscovered=rupeeWallet>0; }

let superBossInteractOverride=false;
function contentInteractionSuppressed(){
  return superBossInteractOverride || (interactModeEnabled && shopOwned.has('interact-toggle'));
}
function syncInteractToggle(){
  if(!interactToggle) return;
  const unlocked=shopOwned.has('interact-toggle');
  const contentInteractionOff=contentInteractionSuppressed();
  interactToggle.hidden=!unlocked;
  interactToggle.classList.toggle('active',contentInteractionOff);
  interactToggle.textContent=`INTERACT // ${contentInteractionOff?'OFF':'ON'}`;
  interactToggle.title=unlocked?(contentInteractionOff?'Normal portfolio interaction is OFF. Click to restore it when the current encounter allows.':'Normal portfolio interaction is ON. Click to suppress it while hunting game-layer interactions.'):'Purchase Interact Toggle in the Shop.';
  interactToggle.setAttribute('aria-pressed',String(contentInteractionOff));
  document.body.classList.toggle('interaction-hunt',contentInteractionOff);
}
function setInteractMode(active){
  if(!shopOwned.has('interact-toggle')) return false;
  if(superBossInteractOverride){
    showTransientToast('INTERACT // ENCOUNTER OVERRIDE','The Super Boss temporarily owns interaction state. Your previous setting will be restored afterward.','SUPER BOSS // ACTIVE','ARCADE');
    return false;
  }
  interactModeEnabled=!!active;
  syncInteractToggle();
  telemetryCount('modes','interactModeToggles');
  telemetryMeaningful('interact_mode',{active:interactModeEnabled});
  showTransientToast(`INTERACT // ${interactModeEnabled?'OFF':'ON'}`,interactModeEnabled?'Normal portfolio clicks are suppressed. Game-layer interactions remain live.':'Normal portfolio interaction restored.',interactModeEnabled?'HUNT SAFELY':'CONTENT RESTORED','SYSTEM');
  return true;
}
interactToggle?.addEventListener('click',()=>setInteractMode(!interactModeEnabled));
function shopItem(id){ return SHOP_ITEMS.find(item=>item.id===id)||null; }
function shopHasEquipped(id){ return shopEquipped===id; }
function shopOwns(id){ return shopOwned.has(id); }
function shopDiscountActive(){ return shopOwned.has('production-discount'); }
function allOtherShopItemsOwned(exceptId='design-mode-unlock'){
  return SHOP_ITEMS.filter(item=>item.id!==exceptId).every(item=>shopOwned.has(item.id));
}
function shopItemAvailable(item){
  if(!item.requires) return true;
  if(item.requires==='legendary') return legendaryUnlocked;
  if(item.requires==='epic') return unlockedAchievements.size===ACHIEVEMENT_KEYS.length;
  if(item.requires==='shop-master') return legendaryUnlocked && allOtherShopItemsOwned(item.id);
  return false;
}
function shopLockedDescription(item){
  if(item.requires==='legendary') return 'Unlock Legendary Mode to unlock this item.';
  if(item.requires==='epic') return 'Unlock Epic Mode to unlock this item.';
  if(item.requires==='shop-master') return 'Own every other shop item to reveal this capstone.';
  return 'Locked.';
}
function shopLockedTag(item){
  if(item.requires==='legendary') return 'LEGENDARY // LOCKED';
  if(item.requires==='epic') return 'EPIC // LOCKED';
  if(item.requires==='shop-master') return 'CAPSTONE // LOCKED';
  return 'LOCKED';
}
function shopPrice(item){
  if(shopOwned.has(item.id)) return 0;
  if(shopDiscountActive() && item.id!=='production-discount' && item.id!=='design-mode-unlock') return Math.max(1,Math.floor(item.cost*.75));
  return item.cost;
}
function affordableShopItems(){
  return SHOP_ITEMS.filter(item=>shopItemAvailable(item) && !shopOwned.has(item.id) && shopPrice(item)<=rupeeWallet);
}
function updateRupeeAttention(){
  if(!rupeeMeter) return;
  const affordable=affordableShopItems();
  const active=rupeeDiscovered && affordable.length>0 && !shopPopup?.classList.contains('open');
  rupeeMeter.classList.toggle('shop-ready',active);
  rupeeMeter.dataset.affordableCount=String(affordable.length);
  if(active){
    const cheapest=Math.min(...affordable.map(shopPrice));
    rupeeMeter.title=`You can afford ${affordable.length} shop item${affordable.length===1?'':'s'}. Cheapest: ${cheapest} Rupee${cheapest===1?'':'s'}. Click to open the Shop.`;
    rupeeMeter.setAttribute('aria-label',`Rupees: ${rupeeWallet}. ${affordable.length} shop item${affordable.length===1?' is':'s are'} affordable. Open Shop.`);
  }else{
    rupeeMeter.title='Open the Rupee shop.';
    rupeeMeter.setAttribute('aria-label',`Rupees: ${rupeeWallet}. Open Shop.`);
  }
}
function persistShopState(){
  try{localStorage.setItem(SHOP_STATE_KEY,JSON.stringify({owned:[...shopOwned],equipped:shopEquipped}));}catch(_){}
  syncShopTelemetrySnapshot();
}
function applyShopEquipmentState(){
  document.body.dataset.shopEquipped=shopEquipped||'';
}
function updateMetaTrace(){
  if(!metaTrace) return;
  const epicUnlocked=unlockedAchievements.size===ACHIEVEMENT_KEYS.length;
  const show=epicUnlocked && (!legendaryUnlocked || !designModeUnlocked);
  metaTrace.classList.toggle('visible',show);
  if(!show) return;
  if(legendaryUnlocked && !designModeUnlocked){
    if(allOtherShopItemsOwned('design-mode-unlock')){
      metaTraceKicker.textContent='DESIGN TRACE // CAPSTONE READY';
      metaTraceText.textContent='The final Shop item is revealed. 10 Rupees unlock Design Mode.';
    }else{
      metaTraceKicker.textContent='DESIGN TRACE // SHOP';
      metaTraceText.textContent='Legendary acquired. Own every other Shop item to reveal the commentary capstone.';
    }
    return;
  }
  if(wishCharge>0){
    if(!wishHasIsValid){
      metaTraceKicker.textContent='WISH READY // RUNTIME CHECK';
      metaTraceText.textContent='Open the Dev Console. If reality errors, inspect BP_WishManager.';
    }else{
      metaTraceKicker.textContent='WISH READY // DEV CONSOLE';
      metaTraceText.textContent='A Shooting Star is charged. The wish command is ready.';
    }
  }else if(hasWish()){
    metaTraceKicker.textContent='LEGENDARY TRACE // RECHARGE';
    metaTraceText.textContent='Watch the Epic sky. Each wish requires a fresh Shooting Star.';
  }else{
    metaTraceKicker.textContent='LEGENDARY TRACE // CELESTIAL SIGNAL';
    metaTraceText.textContent='The Signals are complete, but the sky is not. Watch for something bright enough to carry a wish.';
  }
}
function updateCoolMeter(){
  if(!coolMeter) return;
  const visible=dougCoolProgress>0 || dougCoolActive || dougBoneCount>0;
  coolMeter.classList.toggle('visible',visible);
  coolMeter.classList.toggle('limit-ready',dougCoolActive);
  const value=Math.round(dougCoolProgress);
  if(coolMeterValue) coolMeterValue.textContent=dougCoolActive?'COOL!':`${value}%`;
  if(coolMeterFill) coolMeterFill.style.width=`${value}%`;
  coolMeter.setAttribute('aria-label',dougCoolActive?'Doug coolness full. Cool mode active.':`Doug coolness: ${value} percent`);
  coolMeter.title=dougCoolActive?'COOLNESS FULL // Doug Cool Mode active.':`COOLNESS // ${value}% filled. Collect Doug Bones to raise Coolness.`;
}
function updateInvasionMeter(){
  if(!invasionMeter)return;
  const epic=epicGameplayUnlocked();
  invasionMeter.classList.toggle('visible',epic);
  if(!epic)return;
  const stage=totalBossVictories()%3;
  const progress=invasionEncounterPending?10:invasionWaveKills;
  const pct=Math.min(100,Math.round((stage*10+progress)/30*100));
  if(invasionMeterValue)invasionMeterValue.textContent=`${pct}%`;
  if(invasionMeterFill)invasionMeterFill.style.width=`${superBossActive?100:pct}%`;
  invasionMeter.classList.toggle('contact',superBossActive);
  invasionMeter.title=superBossActive?'SUPER BOSS // Fight in progress.':
    invasionEncounterPending?`Boss contact ready. ${invasionBossRetryKills} UFOs until reacquisition. Wave progress preserved.`:
    `INVASION // ${progress}/10 UFOs in current wave. ${stage}/3 boss victories toward escalation.`;
  invasionMeter.setAttribute('aria-label',invasionMeter.title);
}
function updateCastleMeter(){
  if(!castleMeter) return;
  const visible=castleRunProgress>0 || castleQuestActive || !!activeCastle;
  castleMeter.classList.toggle('visible',visible);
  const display=Math.max(0,Math.min(4,castleRunProgress));
  const rewardReady=display>=4;
  castleMeter.classList.toggle('reward-ready',rewardReady);
  castleMeter.disabled=!rewardReady;
  castleMeter.setAttribute('aria-disabled',rewardReady?'false':'true');
  if(castleMeterValue) castleMeterValue.textContent=rewardReady?'CLAIM':`${display} / 4`;
  if(castleMeterFill) castleMeterFill.style.width=`${display/4*100}%`;
  castleMeter.setAttribute('aria-label',rewardReady?'Castle run complete. Reward ready. Click to claim.':`Castle run progress: ${display} of 4`);
  castleMeter.title=rewardReady?'CASTLES 4/4 // Click to claim fireworks and 3 Rupees.':'Check four Castles to complete a Castle Run.';
}
function updateProgressHudVisibility(){
  heartMeter?.classList.toggle('visible',heartCount>0);
  rupeeMeter?.classList.toggle('visible',rupeeDiscovered);
  updateRupeeAttention();
  updateMetaTrace();
  updateCoolMeter();
  updateInvasionMeter();
  updateCastleMeter();
  const showMeta=!!metaTrace?.classList.contains('visible');
  const showCool=!!coolMeter?.classList.contains('visible');
  const showInvasion=!!invasionMeter?.classList.contains('visible');
  const showCastle=!!castleMeter?.classList.contains('visible');
  progressHud?.classList.toggle('visible',heartCount>0||rupeeDiscovered||showMeta||showCool||showInvasion||showCastle);

  // The objective sits above the persistent HUD. Several HUD tracks can appear
  // after an objective is already on screen, so remeasure after this frame.
  requestAnimationFrame(syncObjectiveHudPosition);
}
function syncShopTelemetrySnapshot(){
  const economy=telemetryPath('economy');
  economy.shopOwnedSnapshot=[...shopOwned];
  economy.shopEquippedSnapshot=shopEquipped;
  economy.walletSnapshot=rupeeWallet;
  telemetryScheduleSave();
}

function persistPostgameAchievements(){
  try{localStorage.setItem(POSTGAME_UNLOCKS_KEY,JSON.stringify([...unlockedPostgameAchievements]));}catch(_){}
}
function postgameEpicCondition(key){
  switch(key){
    case 'post_signals': return unlockedAchievements.size===ACHIEVEMENT_KEYS.length;
    case 'post_cool': return postgameCoolMaxed;
    case 'post_legendary': return legendaryUnlocked;
    case 'post_wish': return finaleWishSatisfied;
    case 'post_hearts': return heartCount>=5;
    case 'post_shop': return SHOP_ITEMS.every(item=>shopOwned.has(item.id));
    case 'post_castles': return postgameCastleComplete;
    case 'post_sections': return POSTGAME_MAJOR_SECTIONS.every(id=>postgameVisitedSections.has(id));
    case 'post_superboss': return postgameSuperBossDefeated;
    default: return false;
  }
}
function postgameUnlockedCount(){return [...unlockedPostgameAchievements].filter(key=>POSTGAME_ACHIEVEMENTS[key]).length;}
function unlockPostgameAchievement(key,{announce=true}={}){
  const data=POSTGAME_ACHIEVEMENTS[key];
  if(!data||unlockedPostgameAchievements.has(key))return false;
  unlockedPostgameAchievements.add(key);persistPostgameAchievements();
  telemetryCount('achievements','postgameUnlocks');
  telemetryMeaningful('postgame_achievement_unlocked',{key,rarity:data.rarity});
  if(postgameRevealed&&announce){
    showTransientToast(data.title,data.detail,`${unlockedAchievements.size+postgameUnlockedCount()} / 20 FOUND`,`${data.rarity.toUpperCase()} ACHIEVEMENT UNLOCKED`);
  }
  return true;
}
function evaluatePostgameAchievements({announce=true}={}){
  let changed=false;
  POSTGAME_EPIC_KEYS.forEach(key=>{if(postgameEpicCondition(key))changed=unlockPostgameAchievement(key,{announce})||changed;});
  const allEpic=POSTGAME_EPIC_KEYS.every(key=>unlockedPostgameAchievements.has(key));
  if(postgameRevealed&&finaleSeen&&allEpic){
    const legendaryNew=unlockPostgameAchievement(POSTGAME_LEGENDARY_KEY,{announce});
    changed=legendaryNew||changed;
    if(legendaryNew)unlockMusicPlayer({announce});
  }
  if(changed){renderLedger();updateLedgerTrigger();}
  return changed;
}
function updateLedgerTrigger(){
  if(!ledgerTrigger)return;
  const postCount=postgameUnlockedCount();
  const total=postgameRevealed?20:ACHIEVEMENT_KEYS.length;
  const found=postgameRevealed?unlockedAchievements.size+postCount:unlockedAchievements.size;
  if(ledgerCount)ledgerCount.textContent=`${found}/${total}`;
  if(ledgerTrigger)ledgerTrigger.title=`ACHIEVEMENTS // ${found} / ${total} unlocked. Open Ledger.`;
  const first=ledgerTrigger.firstChild;if(first&&first.nodeType===Node.TEXT_NODE)first.nodeValue=postgameRevealed?'ACHIEVEMENTS ':'SIGNALS ';
  ledgerTrigger.classList.toggle('visible',unlockedAchievements.size>0||postgameRevealed);
  ledgerTrigger.classList.toggle('attention-new',postgameRevealed&&!ledger?.classList.contains('open'));
}
function updateAchievementProgress(extraCount = null) {
  const count = unlockedAchievements.size;
  const total=postgameRevealed?20:ACHIEVEMENT_KEYS.length;
  const found=postgameRevealed?count+postgameUnlockedCount():count;
  if (achievementProgress) achievementProgress.textContent = typeof extraCount === 'string' ? extraCount : `${found} / ${total} FOUND`;
  updateLedgerTrigger();
  updateProgressHudVisibility();
  syncProgressHudPosition();
  renderLedger();
  updateCompletionState();
  evaluatePostgameAchievements({announce:postgameRevealed});
}
function ledgerEntryMarkup({num,data,found,rarity='rare'}){
  const detail=found?data.detail:`<span class="ledger-hint-label">TRACE //</span> ${data.hint}`;
  return `<div class="ledger-entry rarity-${rarity} ${found?'unlocked':''}"><span class="num">${num}</span><div><span class="ledger-rarity">${rarity.toUpperCase()}</span><strong>${found?data.title:'???'}</strong><small>${detail}</small></div></div>`;
}
function renderLedger() {
  if (!ledgerList) return;
  let markup='';
  if(postgameRevealed){
    const legendary=POSTGAME_ACHIEVEMENTS[POSTGAME_LEGENDARY_KEY];
    markup+=`<div class="ledger-tier-head legendary"><span>POSTGAME // TRUE COMPLETION</span><strong>LEGENDARY CAPSTONE</strong></div>`;
    markup+=ledgerEntryMarkup({num:'20',data:legendary,found:unlockedPostgameAchievements.has(POSTGAME_LEGENDARY_KEY),rarity:'legendary'});
    markup+=`<div class="ledger-tier-head epic"><span>POSTGAME // 9 CHALLENGES</span><strong>EPIC ACHIEVEMENTS</strong></div>`;
    POSTGAME_EPIC_KEYS.forEach((key,index)=>{markup+=ledgerEntryMarkup({num:String(11+index).padStart(2,'0'),data:POSTGAME_ACHIEVEMENTS[key],found:unlockedPostgameAchievements.has(key),rarity:'epic'});});
    markup+=`<div class="ledger-tier-head rare"><span>ORIGINAL DISCOVERY</span><strong>RARE ACHIEVEMENTS</strong></div>`;
  }
  markup+=ACHIEVEMENT_KEYS.map((key,index)=>ledgerEntryMarkup({num:String(index+1).padStart(2,'0'),data:ACHIEVEMENTS[key],found:unlockedAchievements.has(key),rarity:'rare'})).join('');
  if(!postgameRevealed&&unlockedAchievements.size===ACHIEVEMENT_KEYS.length){
    if(!legendaryUnlocked){
      const next=wishCharge>0?'A Shooting Star is charged. Open the Dev Console and try wish.':'Epic is not the end. Keep Epic active and watch the sky for a celestial signal.';
      markup+=`<div class="ledger-postgame"><span>NEXT TRACE //</span><strong>LEGENDARY</strong><small>${next}</small></div>`;
    }else if(!designModeUnlocked){
      const next=allOtherShopItemsOwned('design-mode-unlock')?'The final Shop capstone is revealed. Bring 10 Rupees.':'Own every other Shop item to reveal the final Design Mode capstone.';
      markup+=`<div class="ledger-postgame"><span>NEXT TRACE //</span><strong>DESIGN MODE</strong><small>${next}</small></div>`;
    }
  }
  ledgerList.innerHTML=markup;
}


const MUSIC_TRACKS=[
  {title:'Literally Unplayable',src:'assets/music/song-01.mp3'},
  {title:'Just Add Gameplay',src:'assets/music/song-02.mp3'},
  {title:'Great Again',src:'assets/music/song-03.mp3'},
  {title:'Inside My Head',src:'assets/music/song-04.mp3'},
  {title:'I Made This',src:'assets/music/song-05.mp3'},
  {title:'Come Back',src:'assets/music/song-06.mp3'},
  {title:'Stat FPS',src:'assets/music/song-07.mp3'},
  {title:'Every Byte',src:'assets/music/song-08.mp3'},
  {title:'She Was Almost Gold',src:'assets/music/song-09.mp3'},
  {title:"Everybody's Right",src:'assets/music/song-10.mp3'},
  {title:'One Player Too Many',src:'assets/music/song-11.mp3'},
  {title:'L-E-A-R-N',src:'assets/music/song-12.mp3'}
];
const MUSIC_REPEAT_KEY='mippi-music-repeat-v1';
const MUSIC_SHUFFLE_KEY='mippi-music-shuffle-v1';
const MUSIC_REPEAT_MODES=['off','playlist','track'];
let musicRepeatMode='off';
let musicShuffleEnabled=false;
try{
  const repeat=localStorage.getItem(MUSIC_REPEAT_KEY);
  if(MUSIC_REPEAT_MODES.includes(repeat))musicRepeatMode=repeat;
  musicShuffleEnabled=localStorage.getItem(MUSIC_SHUFFLE_KEY)==='1';
}catch(_){}
let musicTrackIndex=0;
let musicCurrentAvailable=false;
let musicPlayWhenReady=false;
let musicShuffleBag=[];
let musicShuffleHistory=[0];
let musicShuffleHistoryPosition=0;
let musicLyricsIndex=null;
let musicLyricsData=null;
let musicLyricsRequest=0;
let musicActiveLyricLine=-1;

function musicShuffleOrder(exclude){
  const pool=MUSIC_TRACKS.map((_,i)=>i).filter(i=>i!==exclude);
  for(let i=pool.length-1;i>0;i--){
    const j=Math.floor(Math.random()*(i+1));
    [pool[i],pool[j]]=[pool[j],pool[i]];
  }
  return pool;
}
function resetMusicShuffleHistory(){
  musicShuffleHistory=[musicTrackIndex];
  musicShuffleHistoryPosition=0;
  musicShuffleBag=musicShuffleOrder(musicTrackIndex);
}
function updateMusicPlaybackOptions(){
  if(musicRepeat){
    const modeLabel={off:'LOOP OFF',playlist:'LOOP ALL',track:'LOOP 1'}[musicRepeatMode];
    const description={off:'Repeat off. Stop at the end of the playlist.',playlist:'Repeat playlist. Continue from the beginning after the last song.',track:'Repeat track. Replay the current song.'}[musicRepeatMode];
    musicSetIcon(musicRepeat,musicRepeatMode==='track'?'repeat1':'repeat');
    musicRepeat.classList.toggle('active',musicRepeatMode!=='off');
    musicRepeat.title=`${description} Click to change repeat mode.`;
    musicRepeat.setAttribute('aria-label',description);
    musicRepeat.setAttribute('aria-pressed',String(musicRepeatMode!=='off'));
    musicRepeat.dataset.mode=musicRepeatMode;
  }
  if(musicShuffle){
    musicSetIcon(musicShuffle,'shuffle');
    musicShuffle.title=musicShuffleEnabled?'Shuffle enabled. Tracks play without repeats within a cycle.':'Shuffle disabled. Tracks play in playlist order.';
    musicShuffle.setAttribute('aria-label',musicShuffle.title);
    musicShuffle.setAttribute('aria-pressed',String(musicShuffleEnabled));
    musicShuffle.classList.toggle('active',musicShuffleEnabled);
  }
}
function renderMusicTrackList(){
  if(!musicTrackList)return;
  musicTrackList.innerHTML=MUSIC_TRACKS.map((track,index)=>`<div class="music-track-row ${index===musicTrackIndex?'active':''}">
    <button type="button" class="music-track-select" data-music-track="${index}" ${index===musicTrackIndex?'aria-current="true"':''}><span>${String(index+1).padStart(2,'0')}</span><b>${track.title.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;')}</b></button>
  </div>`).join('');
}
function updateMusicDownload(){
  if(!musicDownload)return;
  const track=MUSIC_TRACKS[musicTrackIndex];
  musicDownload.href=musicCurrentAvailable?track.src:'#';
  musicDownload.download=`${track.title.replace(/[\\/:*?"<>|]/g,'-')}.mp3`;
  musicDownload.setAttribute('aria-disabled',musicCurrentAvailable?'false':'true');
  musicDownload.classList.toggle('disabled',!musicCurrentAvailable);
}
function musicSwitchTrack(index,{autoplay=false,shuffleHistory=true}={}){
  if(!musicAudio||!Number.isInteger(index)||index<0||index>=MUSIC_TRACKS.length)return;
  if(musicShuffleEnabled&&shuffleHistory&&index!==musicTrackIndex){
    musicShuffleHistory=musicShuffleHistory.slice(0,musicShuffleHistoryPosition+1);
    musicShuffleHistory.push(index);
    musicShuffleHistoryPosition=musicShuffleHistory.length-1;
    musicShuffleBag=musicShuffleBag.filter(n=>n!==index);
  }
  musicTrackIndex=index;
  const track=MUSIC_TRACKS[musicTrackIndex];
  musicCurrentAvailable=false;
  musicPlayWhenReady=autoplay;
  if(musicTrackTitle)musicTrackTitle.textContent=track.title;
  if(musicTrackCount)musicTrackCount.textContent=`TRACK ${musicTrackIndex+1} / ${MUSIC_TRACKS.length}`;
  if(musicTrackStatus)musicTrackStatus.textContent='CHECKING TRACK FILE...';
  musicSyncPlayIcon();
  updateMusicDownload();renderMusicTrackList();musicSyncProgress();
  musicAudio.pause();musicAudio.src=track.src;musicAudio.load();
  // The lyrics window follows playback only when already open. Opening a lyrics
  // window for a different song does not itself change the playing track.
  if(musicLyricsPanel&&!musicLyricsPanel.hidden)openMusicLyrics(musicTrackIndex);
}
function selectMusicTrack(index,{autoplay=false}={}){
  const total=MUSIC_TRACKS.length;
  if(!total)return;
  musicSwitchTrack(((Number(index)||0)%total+total)%total,{autoplay});
}
function musicChooseNext({automatic=false}={}){
  if(!musicShuffleEnabled){
    if(musicTrackIndex+1<MUSIC_TRACKS.length)return musicTrackIndex+1;
    return !automatic||musicRepeatMode==='playlist'?0:null;
  }
  if(musicShuffleHistoryPosition<musicShuffleHistory.length-1){
    musicShuffleHistoryPosition++;
    return musicShuffleHistory[musicShuffleHistoryPosition];
  }
  if(!musicShuffleBag.length){
    if(automatic&&musicRepeatMode!=='playlist')return null;
    musicShuffleBag=musicShuffleOrder(musicTrackIndex);
  }
  const next=musicShuffleBag.pop();
  musicShuffleHistory.push(next);
  musicShuffleHistoryPosition=musicShuffleHistory.length-1;
  return next;
}
function musicNextTrack({automatic=false}={}){
  const next=musicChooseNext({automatic});
  if(next===null){
    if(musicTrackStatus)musicTrackStatus.textContent='PLAYLIST FINISHED';
    musicSyncPlayIcon();
    return;
  }
  musicSwitchTrack(next,{autoplay:automatic||!musicAudio.paused,shuffleHistory:!musicShuffleEnabled});
}
function musicPreviousTrack(){
  if(musicShuffleEnabled){
    if(musicShuffleHistoryPosition===0){
      // No prior shuffled track yet: replay the current track instead.
      if(musicAudio){musicAudio.currentTime=0;}
      return;
    }
    musicShuffleHistoryPosition--;
    musicSwitchTrack(musicShuffleHistory[musicShuffleHistoryPosition],{autoplay:!musicAudio.paused,shuffleHistory:false});
    return;
  }
  selectMusicTrack(musicTrackIndex-1,{autoplay:!musicAudio.paused});
}
function unlockMusicPlayer({announce=true}={}){
  const first=!musicPlayerUnlocked;
  musicPlayerUnlocked=true;
  try{localStorage.setItem(MUSIC_UNLOCK_KEY,'1');}catch(_){}
  if(musicPlayer){musicPlayer.hidden=false;musicPlayer.classList.toggle('new-unlock',first);}
  if(first&&announce){
    showTransientToast('MUSIC PLAYER UNLOCKED','100% complete. Twelve soundtrack tracks are now permanently available until reset.','LEGENDARY REWARD','100% COMPLETE');
    consolePrint('LEGENDARY REWARD // MUSIC PLAYER UNLOCKED // persists until reset.','good');
  }
  renderMusicTrackList();
  if(musicAudio&&!musicAudio.src)selectMusicTrack(musicTrackIndex);
}

/* LRC is stored alongside each MP3 under the same basename (song-01.lrc).
   Timestamps are seconds since the very start of the song. Plain un-timed
   lyric lines work now too. Never inject text from the file as HTML. */
function parseMusicLrc(raw){
  const entries=[];let offsetMs=0,hasTimestamps=false;
  for(const sourceLine of String(raw||'').replace(/^\uFEFF/,'').split(/\r?\n/)){
    const line=sourceLine.trim();if(!line)continue;
    const offset=line.match(/^\[offset\s*:\s*([+-]?\d+)\s*\]$/i);
    if(offset){offsetMs=Number(offset[1]);continue;}
    if(/^\[(?:ti|ar|al|au|by|length|re|ve)\s*:/i.test(line))continue;
    const tags=[...line.matchAll(/\[(\d{1,3}):(\d{2})(?:\.(\d{1,3}))?\]/g)];
    const payload=line.replace(/\[\d{1,3}:\d{2}(?:\.\d{1,3})?\]/g,'').trim();
    if(!payload)continue;
    // Enhanced LRC inline timing: <mm:ss.xx>word ... <mm:ss.xx>next word.
    const parts=[];const wordStamp=/<(\d{1,3}):(\d{2})(?:\.(\d{1,3}))?>/g;
    let pos=0,activeWordTime=null,match;
    while((match=wordStamp.exec(payload))){
      const segment=payload.slice(pos,match.index);
      if(segment)parts.push({text:segment,time:activeWordTime});
      const frac=match[3]?Number(match[3].padEnd(3,'0'))/1000:0;
      activeWordTime=Math.max(0,Number(match[1])*60+Number(match[2])+frac+offsetMs/1000);
      pos=wordStamp.lastIndex;
    }
    const tail=payload.slice(pos);if(tail)parts.push({text:tail,time:activeWordTime});
    const displayText=parts.map(x=>x.text).join('');
    if(tags.length){
      hasTimestamps=true;
      for(const tag of tags){
        const frac=tag[3]?Number(tag[3].padEnd(3,'0'))/1000:0;
        const t=Math.max(0,Number(tag[1])*60+Number(tag[2])+frac+offsetMs/1000);
        entries.push({time:t,text:displayText,words:parts.map(part=>({...part,time:part.time??t}))});
      }
    }else entries.push({time:null,text:displayText,words:parts});
  }
  if(hasTimestamps)entries.sort((a,b)=>(a.time??Infinity)-(b.time??Infinity));
  return {entries,hasTimestamps};
}
function closeMusicLyrics(){
  if(!musicLyricsPanel)return;
  musicLyricsPanel.hidden=true;
  musicLyricsToggle?.setAttribute('aria-pressed','false');
  document.body.classList.remove('music-minimized-lyrics');
  musicLyricsIndex=null;
  musicLyricsData=null;
  musicActiveLyricLine=-1;musicLastSpokenKey='';
  musicLyricsRequest++;
  musicSyncLyricsMode();
  renderMusicTrackList();
}
function renderMusicLyrics(data){
  if(!musicLyricsContent)return;
  musicLyricsContent.replaceChildren();
  if(!data.entries.length){
    const p=document.createElement('p');p.className='music-lyrics-empty';
    p.textContent='Lyrics coming soon. Edit the matching song-XX.lrc file in assets/music.';
    musicLyricsContent.appendChild(p);return;
  }
  for(const [i,line] of data.entries.entries()){
    const item=document.createElement('p');item.className='music-lyric-line';item.dataset.lyricIndex=String(i);
    const text=document.createElement('span');text.className='music-lyric-text';
    if(line.words?.length){line.words.forEach((part,j)=>{
      const segment=document.createElement('span');segment.className='music-lyric-word';
      segment.dataset.wordIndex=String(j);segment.textContent=part.text;
      text.appendChild(segment);
    });}else text.textContent=line.text;
    item.appendChild(text);musicLyricsContent.appendChild(item);
  }
  musicSyncLyricsMode();updateMusicLyricsSync();
}
async function openMusicLyrics(index){
  if(!musicLyricsPanel||!musicLyricsContent||index<0||index>=MUSIC_TRACKS.length)return;
  const track=MUSIC_TRACKS[index];
  musicLyricsIndex=index;
  musicLyricsPanel.hidden=false;
  musicLyricsToggle?.setAttribute('aria-pressed','true');
  musicLyricsData=null;
  musicActiveLyricLine=-1;musicLastSpokenKey='';
  const request=++musicLyricsRequest;
  if(musicLyricsTitle)musicLyricsTitle.textContent=track.title;
  musicLyricsContent.textContent='LOADING LYRICS...';
  renderMusicTrackList();
  // Do not cache: creators can edit a .lrc file locally and reopen the panel
  // to see it without reloading the whole site.
  try{
    const lrcPath=track.src.replace(/\.mp3$/i,'.lrc');
    const response=await fetch(lrcPath,{cache:'no-store'});
    if(!response.ok)throw new Error('Lyrics file not found');
    const data=parseMusicLrc(await response.text());
    if(request!==musicLyricsRequest)return;
    musicLyricsData=data;
    renderMusicLyrics(data);
  }catch(_){
    if(request!==musicLyricsRequest)return;
    musicLyricsContent.replaceChildren();
    const note=document.createElement('p');
    note.className='music-lyrics-empty';
    note.textContent='Lyrics unavailable. Add the matching .lrc file to assets/music.';
    musicLyricsContent.appendChild(note);
  }
  // Reveal the lyrics section inside the player without scrolling the page.
  musicSyncLyricsMode();
}
let musicLastSpokenKey='';
function updateMusicLyricsSync(){
  if(!musicLyricsData||musicLyricsIndex!==musicTrackIndex||!musicAudio||musicLyricsPanel?.hidden)return;
  const entries=musicLyricsData.entries;
  const time=musicAudio.currentTime||0;
  let active=musicLyricsData.hasTimestamps?-1:(entries.length?0:-1);
  if(musicLyricsData.hasTimestamps){for(let i=0;i<entries.length;i++){if(entries[i].time!==null&&entries[i].time<=time+.03)active=i;}}
  const line=entries[active];
  let spoken=-1;
  if(line?.words){for(let i=0;i<line.words.length;i++){if(line.words[i].time!==null&&line.words[i].time<=time+.03)spoken=i;}}
  const key=`${musicTrackIndex}:${active}:${spoken}`;
  if(key===musicLastSpokenKey)return;
  musicLastSpokenKey=key;
  const nodes=musicLyricsContent.querySelectorAll('.music-lyric-line');
  for(let i=0;i<nodes.length;i++){
    const node=nodes[i];node.classList.toggle('current',i===active);
    const words=node.querySelectorAll('.music-lyric-word');
    for(let j=0;j<words.length;j++)words[j].classList.toggle('spoken',i===active&&j<=spoken&&entries[i].words[j].time!==null);
  }
  const changed=active!==musicActiveLyricLine;musicActiveLyricLine=active;
  if(changed&&active>=0&&nodes[active]&&!musicLyricsPanel.classList.contains('single')){
    musicLyricsContent.scrollTop=nodes[active].offsetTop-musicLyricsContent.clientHeight/2+nodes[active].offsetHeight/2;
  }
}

function initMusicPlayer(){
  if(!musicPlayer)return;
  musicPlayer.hidden=!musicPlayerUnlocked;
  renderMusicTrackList();
  syncMusicMinimizedControls();
  updateMusicPlaybackOptions();
  if(musicShuffleEnabled)resetMusicShuffleHistory();
  if(musicPlayerUnlocked)selectMusicTrack(0);
  musicCollapse?.addEventListener('click',()=>{
    musicPlayer.classList.toggle('collapsed');
    musicCollapse.textContent=musicPlayer.classList.contains('collapsed')?'+':'−';
    musicCollapse.setAttribute('aria-label',musicPlayer.classList.contains('collapsed')?'Expand music player':'Collapse music player');
    syncMusicMinimizedControls();
    musicSyncLyricsMode();
    syncMusicLyricsPanelHeight();
  });
  musicTrackList?.addEventListener('click',event=>{
    const selection=event.target.closest('[data-music-track]');
    if(selection)selectMusicTrack(Number(selection.dataset.musicTrack));
  });
  musicLyricsToggle?.addEventListener('click',()=>{
    if(musicLyricsPanel?.hidden)openMusicLyrics(musicTrackIndex);else closeMusicLyrics();
    musicLyricsToggle?.setAttribute('aria-pressed',String(!musicLyricsPanel?.hidden));
  });
  musicLyricsModeButton?.addEventListener('click',()=>{
    musicPreferredLyricsMode=musicPreferredLyricsMode==='single'?'full':'single';
    try{localStorage.setItem(MUSIC_LYRICS_MODE_KEY,musicPreferredLyricsMode);}catch(_){}
    musicSyncLyricsMode();
  });
  musicLyricsClose?.addEventListener('click',()=>{closeMusicLyrics();musicLyricsToggle?.setAttribute('aria-pressed','false');});
  musicRepeat?.addEventListener('click',()=>{
    musicRepeatMode=MUSIC_REPEAT_MODES[(MUSIC_REPEAT_MODES.indexOf(musicRepeatMode)+1)%MUSIC_REPEAT_MODES.length];
    try{localStorage.setItem(MUSIC_REPEAT_KEY,musicRepeatMode);}catch(_){}
    updateMusicPlaybackOptions();
  });
  musicShuffle?.addEventListener('click',()=>{
    musicShuffleEnabled=!musicShuffleEnabled;
    try{localStorage.setItem(MUSIC_SHUFFLE_KEY,musicShuffleEnabled?'1':'0');}catch(_){}
    resetMusicShuffleHistory();
    updateMusicPlaybackOptions();
  });
  musicSetIcon(musicPrev,'previous');musicSetIcon(musicNext,'next');musicSetIcon(musicDownload,'download');musicSetIcon(musicLyricsToggle,'lyrics');musicSyncPlayIcon();
  musicSeek?.addEventListener('input',()=>{
    if(!musicAudio||!Number.isFinite(musicAudio.duration))return;
    musicAudio.currentTime=Number(musicSeek.value)/1000*musicAudio.duration;
    musicSyncProgress();updateMusicLyricsSync();
  });
  musicPrev?.addEventListener('click',musicPreviousTrack);
  musicNext?.addEventListener('click',()=>musicNextTrack({automatic:false}));
  musicPlay?.addEventListener('click',()=>{
    if(!musicCurrentAvailable){if(musicTrackStatus)musicTrackStatus.textContent='TRACK FILE NOT INSTALLED YET';return;}
    if(musicAudio.paused)musicAudio.play().catch(()=>{if(musicTrackStatus)musicTrackStatus.textContent='PLAYBACK UNAVAILABLE';});else musicAudio.pause();
  });
  musicDownload?.addEventListener('click',event=>{if(!musicCurrentAvailable){event.preventDefault();if(musicTrackStatus)musicTrackStatus.textContent='TRACK FILE NOT INSTALLED YET';}});
  musicAudio?.addEventListener('loadedmetadata',()=>{
    musicCurrentAvailable=true;
    if(musicTrackStatus)musicTrackStatus.textContent='READY';
    updateMusicDownload();
    if(musicPlayWhenReady){
      musicPlayWhenReady=false;
      musicAudio.play().catch(()=>{if(musicTrackStatus)musicTrackStatus.textContent='PLAYBACK UNAVAILABLE';});
    }
  });
  musicAudio?.addEventListener('error',()=>{
    musicPlayWhenReady=false;musicCurrentAvailable=false;
    if(musicTrackStatus)musicTrackStatus.textContent='MUSIC FILE PENDING';
    updateMusicDownload();musicSyncPlayIcon();
  });
  musicAudio?.addEventListener('play',()=>{musicSyncPlayIcon();if(musicTrackStatus)musicTrackStatus.textContent='NOW PLAYING';});
  musicAudio?.addEventListener('pause',()=>{musicSyncPlayIcon();if(musicCurrentAvailable&&musicTrackStatus)musicTrackStatus.textContent='READY';});
  musicAudio?.addEventListener('timeupdate',()=>{updateMusicLyricsSync();musicSyncProgress();});
  musicAudio?.addEventListener('durationchange',musicSyncProgress);
  musicAudio?.addEventListener('seeked',()=>{updateMusicLyricsSync();musicSyncProgress();});
  musicAudio?.addEventListener('ended',()=>{
    if(musicRepeatMode==='track'){
      musicAudio.currentTime=0;
      musicAudio.play().catch(()=>{if(musicTrackStatus)musicTrackStatus.textContent='PLAYBACK UNAVAILABLE';});
      return;
    }
    musicNextTrack({automatic:true});
  });
}

function currentThemeMode(){
  if(document.body.classList.contains('theme-legendary')) return 'legendary';
  if(document.body.classList.contains('theme-complete')) return 'epic';
  return 'rare';
}
function epicGameplayUnlocked(){ return unlockedAchievements.size===ACHIEVEMENT_KEYS.length; }
function legendaryGameplayUnlocked(){ return !!legendaryUnlocked; }

const DOUG_THEME_IMAGES={
  rare:'assets/doug.jpg',
  epic:'assets/doug-complete.webp',
  legendary:'assets/doug-legendary.jpg'
};
const DOUG_THEME_ALTS={
  rare:'Doug sitting happily in tall grass',
  epic:'Doug wearing a blue scarf in the Epic theme',
  legendary:'Doug wearing teal sunglasses and a scarf in the Legendary theme'
};
const DOUG_COOL_IMAGES={
  rare:'assets/doug-cool-rare.jpg',
  epic:'assets/doug-cool-epic.jpg',
  legendary:'assets/doug-cool-legendary.png'
};
const DOUG_COOL_ALTS={
  rare:'Doug wearing sunglasses in the Rare theme',
  epic:'Doug in the Epic cool state',
  legendary:'Doug wearing sunglasses in the Legendary cool state'
};
function getDougImageConfig({mode=currentThemeMode(),cool=false}={}){
  return cool
    ? {src:DOUG_COOL_IMAGES[mode]||DOUG_COOL_IMAGES.rare,alt:DOUG_COOL_ALTS[mode]||DOUG_COOL_ALTS.rare}
    : {src:DOUG_THEME_IMAGES[mode]||DOUG_THEME_IMAGES.rare,alt:DOUG_THEME_ALTS[mode]||DOUG_THEME_ALTS.rare};
}
function syncDougThemeVisuals(){
  const dougThemeImage=document.querySelector('.doug-photo');
  if(dougThemeImage){
    const cool=dougCoolActive || !!document.querySelector('.doug-card')?.classList.contains('doug-star-cool');
    const config=getDougImageConfig({cool});
    dougThemeImage.src=config.src;
    dougThemeImage.alt=config.alt;
  }
  const peek=document.querySelector('.doug-peek');
  if(peek){
    const img=peek.querySelector('img');
    if(img){
      const config=getDougImageConfig({cool:dougCoolActive || peek.classList.contains('star-cool')});
      img.src=config.src;
      img.alt=config.alt;
    }
  }
}

function availableThemeModes(){
  const modes=['rare'];
  const epicUnlocked=unlockedAchievements.size===ACHIEVEMENT_KEYS.length;
  if(epicUnlocked) modes.push('epic');
  if(epicUnlocked && legendaryUnlocked) modes.push('legendary');
  return modes;
}

function updateThemeCycleControl(){
  if(!themeCycle) return;
  const mode=currentThemeMode();
  themeCycle.textContent=`Theme: ${mode.charAt(0).toUpperCase()+mode.slice(1)}`;
  themeCycle.dataset.theme=mode;
  const modes=availableThemeModes();
  themeCycle.setAttribute('aria-label',`Current theme: ${mode}. Click to cycle unlocked themes.`);
  let tip='Click to cycle unlocked themes.';
  if(modes.length===1) tip='Explore more of the site to unlock additional themes.';
  else if(!modes.includes('legendary')) tip='Rare and Epic are unlocked. Something rarer is still hidden.';
  else tip='Click to cycle Rare, Epic, and Legendary themes.';
  themeCycle.title=tip; themeCycle.dataset.tip=tip;
}

function applyThemeMode(requestedMode, { persist=true } = {}){
  const modes=availableThemeModes();
  let mode=modes.includes(requestedMode)?requestedMode:'rare';
  document.body.classList.toggle('theme-complete', mode==='epic' || mode==='legendary');
  document.body.classList.toggle('theme-legendary', mode==='legendary');

  syncDougThemeVisuals();

  if(persist){
    try{
      localStorage.setItem(THEME_MODE_KEY,mode);
      localStorage.setItem(THEME_KEY,mode==='rare'?'0':'1');
      localStorage.setItem(LEGENDARY_THEME_KEY,mode==='legendary'?'1':'0');
    }catch(_){}
  }
  updateThemeCycleControl();
  window.dispatchEvent(new CustomEvent('mippi-theme-change',{detail:{active:mode!=='rare',legendary:mode==='legendary',mode}}));
  window.dispatchEvent(new CustomEvent('mippi-legendary-change',{detail:{active:mode==='legendary'}}));
}

function applyCompletionTheme(active, options={}){
  applyThemeMode(active?'epic':'rare',options);
}

function applyLegendaryTheme(active, options={}){
  applyThemeMode(active?'legendary':'epic',options);
}

function cycleThemeMode(){
  telemetryCount('modes','themeAttempts');
  const modes=availableThemeModes();
  if(modes.length===1){
    showTransientToast('THEME // RARE','Explore more of the site to unlock additional themes.','RARITY // 1 OF 3','SYSTEM');
    return;
  }
  const current=currentThemeMode();
  const index=Math.max(0,modes.indexOf(current));
  const next=modes[(index+1)%modes.length];
  telemetryCount('modes','themeChanges');
  telemetryUnique('modes','themeModes',next);
  telemetryMeaningful('theme_changed',{mode:next});
  applyThemeMode(next);
  consolePrint(`THEME // ${next.toUpperCase()}`,'good');
}

function unlockLegendaryMode(){
  if(unlockedAchievements.size!==ACHIEVEMENT_KEYS.length){
    consolePrint('LEGENDARY THEME // Epic progression is still incomplete.','warn');
    return false;
  }
  const firstUnlock=!legendaryUnlocked;
  legendaryUnlocked=true;
  try{ localStorage.setItem(LEGENDARY_UNLOCK_KEY,'1'); }catch(_){}
  applyThemeMode('legendary');
  updateDesignModeAvailability();
  if(shopPopup?.classList.contains('open')) renderShop();
  updateMetaTrace(); updateProgressHudVisibility(); renderLedger();
  evaluatePostgameAchievements();
  if(firstUnlock){
    telemetryMeaningful('legendary_unlocked');
    consolePrint('LEGENDARY THEME UNLOCKED // rarity upgraded to gold.','good');
    showTransientToast('LEGENDARY MODE UNLOCKED','Golden Trigger is now revealed. The Shop capstone can eventually unlock the design commentary layer.','RARITY // LEGENDARY','LEGENDARY');
  }
  return true;
}

function preferredUnlockedTheme(){
  let mode=null;
  try{ mode=localStorage.getItem(THEME_MODE_KEY); }catch(_){}
  const modes=availableThemeModes();
  if(mode && modes.includes(mode)) return mode;
  // Migrate the older two-toggle preference without breaking returning visitors.
  let legacyLegendary='0', legacyEpic='1';
  try{
    legacyLegendary=localStorage.getItem(LEGENDARY_THEME_KEY)??'0';
    legacyEpic=localStorage.getItem(THEME_KEY)??'1';
  }catch(_){}
  if(modes.includes('legendary') && legacyLegendary==='1') return 'legendary';
  if(modes.includes('epic') && legacyEpic!=='0') return 'epic';
  return 'rare';
}

function scheduleEpicAirspaceWelcome(){
  let already=false;
  try{ already=sessionStorage.getItem(EPIC_WELCOME_SESSION_KEY)==='1'; }catch(_){}
  if(already) return;
  try{ sessionStorage.setItem(EPIC_WELCOME_SESSION_KEY,'1'); }catch(_){}
  const attempt=()=>{
    if(!epicGameplayUnlocked()) return;
    if(typeof directorAttentionBlocked==='function' && directorAttentionBlocked()){
      window.setTimeout(attempt,1200);
      return;
    }
    if(document.querySelector('.shooting-star,.galaga-secret,.game-pickup,.doug-bone')){
      return;
    }
    spawnGamePickup(null,true);
    telemetryMeaningful('epic_airspace_welcome');
  };
  window.setTimeout(attempt,2600);
}

function updateCompletionState(){
  const complete=unlockedAchievements.size===ACHIEVEMENT_KEYS.length;
  if(complete && !completionCelebrated){
    completionCelebrated=true;
    // First Epic unlock selects the new visual theme, but gameplay unlocks are
    // permanent and remain active if the visitor later cycles back to Rare.
    applyThemeMode('epic',{persist:true});
    scheduleEpicAirspaceWelcome();
    if(typeof scheduleNaturalShootingStar==='function') scheduleNaturalShootingStar(12000+Math.random()*8000);
    if(achievement && !achievement.classList.contains('show')){
      window.setTimeout(()=>showSystemToast(
        'EPIC MODE UNLOCKED',
        'All 10 Signals found. Airborne interactions are now live. If you are unsure where progression goes next, HINT now traces more than achievements.',
        '10 / 10 FOUND // AIRSPACE OPEN',
        'PROGRESSION'
      ),700);
    }
  } else if(!complete){
    completionCelebrated=false;
    applyThemeMode('rare',{persist:false});
  } else {
    applyThemeMode(preferredUnlockedTheme(),{persist:false});
  }
  updateThemeCycleControl();
  updateMetaTrace();
  updateProgressHudVisibility();
  syncProgressHudPosition();
}

function updateHeartMeter(){
  if(!heartMeter) return;
  const hearts=[...heartMeter.querySelectorAll('span')];
  hearts.forEach((heart,index)=>{ heart.textContent=index<heartCount?'♥':'♡'; heart.classList.toggle('filled',index<heartCount); });
  const rewardReady=heartCount>=5&&!heartRewardShown;
  heartMeter.classList.toggle('reward-ready',rewardReady);
  heartMeter.disabled=false;
  heartMeter.setAttribute('aria-disabled','false');
  heartMeter.setAttribute('aria-label',rewardReady?'Heart pickups: 5 of 5. Reward ready. Click to claim.':heartCount>=5?'Hearts full. Rare bonus Hearts grant Mippi Bird extra lives.':`Heart pickups: ${heartCount} of 5`);
  heartMeter.title=rewardReady?'FULL HEARTS // Click to claim the Unreal Source reward.':heartCount>=5?`HEARTS FULL // Click to revisit Unreal Source. Bonus Heart lives banked for Mippi Bird: ${mushroomBankLives}.`:'Collect Heart pickups hidden around the site.';
  updateProgressHudVisibility();
  syncProgressHudPosition();
}
function claimHeartReward(){
  if(heartCount<5||heartRewardShown)return false;
  heartRewardShown=true;
  telemetryMeaningful('heart_reward_unlocked');
  telemetryMeaningful('heart_reward_claimed');
  try{localStorage.setItem(HEART_REWARD_KEY,'1');}catch(_){}
  updateHeartMeter();
  openUnrealGift();
  consolePrint('FULL HEARTS // reward claimed // Unreal Source route opened.','good');
  return true;
}

function updateRupeeMeter(){
  if(rupeeCount) rupeeCount.textContent=String(rupeeWallet);
  if(shopWalletCount) shopWalletCount.textContent=String(rupeeWallet);
  updateProgressHudVisibility();
  if(shopPopup?.classList.contains('open')) renderShop();
  updateRupeeAttention();
  syncProgressHudPosition();
}
function openUnrealGift(){
  if(!unrealGiftPopup) return;
  unrealGiftPopup.classList.add('open'); unrealGiftPopup.setAttribute('aria-hidden','false');
}
function closeUnrealGift(){ unrealGiftPopup?.classList.remove('open'); unrealGiftPopup?.setAttribute('aria-hidden','true'); }
unrealGiftDecline?.addEventListener('click',()=>{ telemetryMeaningful('unreal_source_reward_declined'); closeUnrealGift(); });
unrealGiftAccept?.addEventListener('click',()=>{ telemetryMeaningful('unreal_source_reward_accepted'); window.setTimeout(closeUnrealGift,100); });
heartMeter?.addEventListener('click',()=>{if(heartCount>=5){if(!heartRewardShown)claimHeartReward();else openUnrealGift();}else showTransientToast('HEARTS','Collect five Hearts to unlock the Unreal Source reward.',`HEARTS // ${heartCount}/5`,'PROGRESS');});
function collectHeart(){
  telemetryCount('economy','heartsCollected');
  telemetryMeaningful('heart_collected',{count:heartCount+1});
  if(heartCount<5){
    heartCount++;
    try{localStorage.setItem(HEART_KEY,String(heartCount));}catch(_){}
    updateHeartMeter();
    consolePrint(`HEART ACQUIRED // ${heartCount}/5 // morale capacity increased.`,'good');
  } else {
    mushroomBankLives++;persistMushroomLives();
    telemetryCount('economy','heartBirdLivesEarned');
    consolePrint(`BONUS HEART // +1 MIPPI BIRD EXTRA LIFE // BANK ${mushroomBankLives}`,'good');
    showTransientToast('BONUS HEART','Full hearts! This heart adds one extra Mippi Bird life.',`BIRD LIVES // ${mushroomBankLives}`,'HEARTS');
  }
  if(heartCount>=5 && !heartRewardShown){
    showTransientToast('FULL HEARTS','The HEARTS panel is ready. Click it to claim the reward.','5 / 5 // CLAIM READY','HEART CONTAINER');
    consolePrint('FULL HEARTS // reward ready. Click the HEARTS panel to claim it.','good');
  }
  evaluatePostgameAchievements();
}
updateHeartMeter();
mippiRuntimeHealth.bootStage='initial-hud-ready';

function hideAchievementToast() {
  window.clearTimeout(achievementTimer);
  achievement?.classList.remove('show','hint-toast','rarity-rare','rarity-epic','rarity-legendary');
}

function showSystemToast(title, detail, progressText = null) {
  if (!achievement) return;
  showTransientToast(title,detail,progressText||`${unlockedAchievements.size} / ${ACHIEVEMENT_KEYS.length} FOUND`,'SYSTEM');
}

const toastStack=document.createElement('div');
toastStack.className='system-toast-stack';toastStack.id='system-toast-stack';
document.body.appendChild(toastStack);
const activeSystemToasts=[];
function repositionSystemToasts(){
  // Active objective claims the lowest slot. Toasts flow above it.
  const objectiveVisible=!!objectiveHud?.classList.contains('show');
  toastStack.style.bottom=`calc(var(--hud-height,54px) + ${objectiveVisible?Math.ceil(objectiveHud.offsetHeight||112)+17:12}px)`;
}
function removeSystemToast(entry){
  if(!entry)return;
  window.clearTimeout(entry.timer);
  const i=activeSystemToasts.indexOf(entry);
  if(i>=0)activeSystemToasts.splice(i,1);
  entry.el.remove();
  repositionSystemToasts();
}
function showTransientToast(title,detail,progressLabel='SYSTEM',topLabel='SYSTEM',{persistent=false}={}){
  const el=document.createElement('article');el.className='system-toast';el.setAttribute('role','status');
  const heading=document.createElement('div');heading.className='system-toast-heading';
  const type=document.createElement('span');type.textContent=topLabel;
  const close=document.createElement('button');close.type='button';close.textContent='×';close.setAttribute('aria-label','Dismiss notification');
  heading.append(type,close);
  const name=document.createElement('strong');name.textContent=title;
  const description=document.createElement('small');description.textContent=detail;
  const progress=document.createElement('b');progress.textContent=progressLabel;
  el.append(heading,name,description,progress);
  const entry={el,timer:null};
  close.addEventListener('click',()=>removeSystemToast(entry));
  activeSystemToasts.push(entry);toastStack.appendChild(el);
  while(activeSystemToasts.length>3)removeSystemToast(activeSystemToasts[0]);
  if(!persistent)entry.timer=window.setTimeout(()=>removeSystemToast(entry),4600);
  repositionSystemToasts();
}

function getNextUnachievedKey() {
  return ACHIEVEMENT_KEYS.find(key => !unlockedAchievements.has(key)) || null;
}

function showProgressionHint(){
  const finale=typeof finaleEligibility==='function'?finaleEligibility():null;
  if(!legendaryUnlocked){
    if(!hasWishCharge()){
      showTransientToast(
        'The Signal hunt is complete.',
        'The next trail is celestial. Try the wish command in the Dev Console. If the sky has not answered yet, it will.',
        'HINT // CELESTIAL TRACE',
        'PROGRESSION HINT',
        {persistent:true}
      );
      return;
    }
    if(!wishHasIsValid){
      showTransientToast(
        'The sky answered. Reality may not.',
        'A Wish is charged. Try wish in the Dev Console. If BP_WishManager throws an error, follow the repair path it gives you.',
        'HINT // RUNTIME CHECK',
        'PROGRESSION HINT',
        {persistent:true}
      );
      return;
    }
    showTransientToast(
      'The runtime is repaired.',
      'You have a charged Shooting Star and a valid Wish path. The wish command is ready.',
      'HINT // MAKE A WISH',
      'PROGRESSION HINT',
      {persistent:true}
    );
    return;
  }

  if(!designModeUnlocked){
    if(allOtherShopItemsOwned('design-mode-unlock')){
      showTransientToast(
        'One final Shop item has revealed itself.',
        'The Legendary capstone costs 10 Rupees and unlocks Design Mode.',
        'HINT // CAPSTONE',
        'PROGRESSION HINT',
        {persistent:true}
      );
    }else{
      showTransientToast(
        'Legendary is not the end.',
        'The Shop has a final capstone path. Own the rest of its inventory and something new will reveal itself.',
        'HINT // SHOP TRACE',
        'PROGRESSION HINT',
        {persistent:true}
      );
    }
    return;
  }

  if(finale && !Object.values(finale).every(Boolean)){
    const missing=[];
    if(!finale.wish) missing.push('make a validated Wish');
    if(!finale.boss) missing.push('defeat a Boss');
    if(!finale.hearts) missing.push('complete the Heart reward');
    if(!finale.shop) missing.push('own at least one Shop item');
    if(!finale.sections) missing.push('visit more of the portfolio');
    showTransientToast(
      'There is still a loose thread.',
      missing.length?`Try to ${missing[0]}. The ending is looking for broad engagement, not every secret.`:'Keep exploring. The site is watching for a calm moment.',
      'HINT // FINAL TRACE',
      'PROGRESSION HINT',
      {persistent:true}
    );
    return;
  }

  showTransientToast(
    'Nothing critical is hidden from you now.',
    'You have reached the late game. Explore, experiment, or wait for a calm moment if the site seems unusually interested in the Mippi logo.',
    'HINT // ENDGAME',
    'PROGRESSION HINT',
    {persistent:true}
  );
}

function showNextAchievementHint({ intro=false } = {}) {
  if(intro) telemetryCount('achievements','introHints');
  else {
    telemetryCount('achievements','hints');
    telemetryCount('assistance','hintUses');
    telemetryMeaningful('hint_requested');
  }
  const key = getNextUnachievedKey();
  if (!key) {
    showProgressionHint();
    return;
  }
  const index = ACHIEVEMENT_KEYS.indexOf(key) + 1;
  const data = ACHIEVEMENTS[key];
  showTransientToast(
    intro ? 'A signal is close.' : 'Signal trace acquired.',
    data.hint,
    `HINT // ${String(index).padStart(2,'0')}`,
    'DISCOVERY HINT',
    { persistent:true }
  );
}

achievementClose?.addEventListener('click', hideAchievementToast);
hintTrigger?.addEventListener('click', () => showNextAchievementHint());

function initializeUnifiedHud(){
  const dock=document.querySelector('#site-game-hud');if(!dock)return;
  const progress=document.querySelector('#hud-progress');
  const gameplay=document.querySelector('#hud-gameplay');
  const modes=document.querySelector('#hud-modes');
  const utilities=document.querySelector('#hud-utilities');
  const $=id=>document.getElementById(id);
  const attach=(parent,id)=>{const el=$(id);if(el){parent.appendChild(el);el.classList.add('hud-integrated');}return el;};
  attach(progress,'ledger-trigger');
  attach(progress,'rupee-meter');
  attach(progress,'heart-meter');
  attach(gameplay,'cool-meter');
  attach(gameplay,'invasion-meter');
  attach(gameplay,'castle-meter');
  attach(modes,'design-toggle');
  // Docs button already exists in the modes column as a semantic control.
  attach(modes,'inspect-toggle');
  attach(modes,'interact-toggle');
  attach(utilities,'hint-trigger');
  attach(utilities,'theme-cycle');
  attach(utilities,'console-tip-button');
  const icons={
    trophy:'<path d="M8 4h8v7a4 4 0 0 1-8 0V4Zm0 2H4v3a4 4 0 0 0 4 4m8-7h4v3a4 4 0 0 1-4 4m-4 2v4m-5 2h10"/>',
    palette:'<circle cx="12" cy="12" r="9"/><circle cx="8" cy="8" r="1"/><circle cx="12" cy="6" r="1"/><circle cx="17" cy="9" r="1"/><path d="M12 21c-3-2-1-6 2-6h3a4 4 0 0 0 4-4"/>',
    book:'<path d="M12 5v15M12 6c-4-3-8-3-10-2v15c4-1 7-1 10 2m0-15c4-3 8-3 10-2v15c-4-1-7-1-10 2"/>',
    eye:'<path d="M2 12s4-6 10-6 10 6 10 6-4 6-10 6-10-6-10-6Z"/><circle cx="12" cy="12" r="3"/>',
    pointer:'<path d="M5 3 20 12l-7 1-3 7-5-17Z"/>',
    hint:'<path d="M9 18h6m-5 3h4m-2-19a7 7 0 0 0-4 13c1 1 1 2 1 3h6c0-1 0-2 1-3a7 7 0 0 0-4-13Z"/>',
    theme:'<path d="M12 2v2m0 16v2M2 12h2m16 0h2M5 5l2 2m10 10 2 2M19 5l-2 2M7 17l-2 2"/><circle cx="12" cy="12" r="4"/>',
    terminal:'<rect x="2" y="4" width="20" height="16" rx="2"/><path d="m6 9 3 3-3 3m6 0h5"/>',
    cool:'<path d="M12 22c5-2 7-6 5-10-1 3-4 4-4 4 2-6-1-11-4-14 0 5-3 8-4 12-1 4 2 7 7 8Z"/>',
    invasion:'<path d="M2 13c1-5 5-9 10-9s9 4 10 9M3 14c2 3 16 3 18 0M9 8h6m-3-6v3m-7 14 2-2m12 2-2-2"/>',
    castle:'<path d="M3 21V6h4v3h3V6h4v3h3V6h4v15H3Zm7 0v-7h4v7M3 12h18"/>',
    gem:'<path d="m7 3 10 0 5 7-10 12L2 10l5-7Zm-5 7h20M7 3l5 7 5-7m-5 7v12"/>'
  };
  for(const [id,icon,short] of [
    ['ledger-trigger','trophy','ACHIEVEMENTS'],['design-toggle','palette','DESIGN MODE'],['docs-toggle','book','DOCUMENTATION'],
    ['inspect-toggle','eye','INSPECT MODE'],['interact-toggle','pointer','INTERACT MODE'],
    ['hint-trigger','hint','HINT'],['theme-cycle','theme','THEME'],['console-tip-button','terminal','DEV CONSOLE']]){
      const btn=$(id);if(!btn)continue;
      const svg=`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="#fff" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${icons[icon]}</svg>`;
      btn.style.setProperty('--hud-icon-markup',`url("data:image/svg+xml,${encodeURIComponent(svg)}")`);
      btn.classList.add('hud-icon-btn');
      // Real SVG avoids pseudo-element/mask visibility conflicts in the Ledger.
      let mark=btn.querySelector(':scope > .hud-svg-icon');
      if(!mark){
        mark=document.createElement('span');mark.className='hud-svg-icon';
        mark.setAttribute('aria-hidden','true');mark.innerHTML=svg;
        btn.insertBefore(mark,btn.firstChild);
      }
      btn.dataset.hudLabel=short;
      btn.title=btn.title?`${short} // ${btn.title}`:short;
      btn.setAttribute('aria-label',short);
  }
  // Resource icon treatment uses the same 19px mask and color system as modes.
  for(const [id,icon] of [['cool-meter','cool'],['invasion-meter','invasion'],['castle-meter','castle'],['rupee-meter','gem']]){
    const el=$(id);if(!el)continue;
    const svg=`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round">${icons[icon]}</svg>`;
    el.style.setProperty('--meter-icon',`url("data:image/svg+xml,${encodeURIComponent(svg)}")`);
  }
  // Dedicated ring avoids collision with Wish tooltip pseudo-elements.
  for(const el of dock.querySelectorAll('button')){
    if(el.querySelector(':scope > .hud-attention-ring'))continue;
    const ring=document.createElement('span');ring.className='hud-attention-ring';
    ring.setAttribute('aria-hidden','true');el.appendChild(ring);
  }
  // The Ledger button must never expose the raw '20/20' in an orphaned badge.
  ledgerTrigger?.setAttribute('title','Open the Achievement Ledger');
  // The Docs affordance is genuinely new, so draw attention until discovered.
  const docs=$('docs-toggle');
  if(docs){
    docs.hidden=!designModeUnlocked;
    let seen=false;try{seen=localStorage.getItem('mippi-docs-discovered-v1')==='1';}catch(_){}
    docs.classList.toggle('attention-new',!seen && document.body.classList.contains('design-mode'));
    docs.addEventListener('click',()=>{docs.classList.remove('attention-new');try{localStorage.setItem('mippi-docs-discovered-v1','1');}catch(_){} });
  }
  // Keep dynamic text/counts in the elements for telemetry and accessible name,
  // but the compact control shows an SVG icon via a stable CSS mask.
  $('docs-toggle')?.addEventListener('click',()=>window.open('https://mippi-the-dork.github.io/docs/','_blank','noopener,noreferrer'));
  const oldDiscovery=$('discovery-controls');
  if(oldDiscovery)oldDiscovery.hidden=true;
  const oldModes=$('play-mode-controls');if(oldModes)oldModes.hidden=true;
  // meta trace remains an independent transient notification, not a fifth HUD column
  dock.hidden=false;document.body.classList.add('hud-unified');
  updateLedgerTrigger();
  syncObjectiveHudPosition();
}
function syncProgressHudPosition(){
  if(document.body.classList.contains('hud-unified')){
    progressHud?.classList.toggle('ledger-open',!!ledger?.classList.contains('open'));
    syncObjectiveHudPosition();return;
  }
  if(!progressHud){ syncObjectiveHudPosition(); return; }
  const isOpen=!!ledger?.classList.contains('open');
  progressHud.classList.toggle('ledger-open',isOpen);
  progressHud.style.top='auto';
  if(isOpen){
    // Use layout height + the ledger's anchored bottom, not getBoundingClientRect().
    // The ledger animates with transform, so its visual rect is temporarily stale
    // while opening/closing and can leave downstream HUD elements stranded high.
    const ledgerBottom=parseFloat(getComputedStyle(ledger).bottom)||0;
    const ledgerHeight=ledger?.offsetHeight||0;
    const bottomGap=Math.max(12,ledgerBottom+ledgerHeight+10);
    progressHud.style.bottom=`${Math.round(bottomGap)}px`;
  }else{
    const controls=document.querySelector('#discovery-controls');
    const controlsRect=controls?.getBoundingClientRect?.();
    const collapsedBottom=controlsRect?.height>0?Math.max(12,window.innerHeight-controlsRect.top+8):(window.innerWidth<=620?58:60);
    progressHud.style.bottom=`${Math.round(collapsedBottom)}px`;
  }
  syncObjectiveHudPosition();
}
function openLedger() {
  if (!ledger) return;
  ledger.classList.add('open');
  ledgerTrigger?.classList.remove('attention-new');
  ledger.setAttribute('aria-hidden','false');
  ledgerTrigger?.setAttribute('aria-expanded','true');
  requestAnimationFrame(syncProgressHudPosition);
  window.setTimeout(syncProgressHudPosition,220);
}

function closeLedger() {
  ledger?.classList.remove('open');
  ledger?.setAttribute('aria-hidden','true');
  ledgerTrigger?.setAttribute('aria-expanded','false');
  requestAnimationFrame(syncProgressHudPosition);
  window.setTimeout(syncProgressHudPosition,220);
}
window.addEventListener('resize',syncProgressHudPosition,{passive:true});

// Keep optional objectives out of the persistent HUD even when a newly
// discovered meter changes the HUD's height while the objective is visible.
if(progressHud && 'ResizeObserver' in window){
  const progressHudResizeObserver=new ResizeObserver(()=>syncObjectiveHudPosition());
  progressHudResizeObserver.observe(progressHud);
}

function scheduleAchievementIntroHint({ resetSession = false } = {}) {
  window.clearTimeout(introHintTimer);
  if (resetSession) {
    try { sessionStorage.removeItem(INTRO_HINT_SESSION_KEY); } catch (_) {}
  }
  if (unlockedAchievements.size > 0) return;
  let alreadyShown = false;
  try { alreadyShown = sessionStorage.getItem(INTRO_HINT_SESSION_KEY) === '1'; } catch (_) {}
  if (alreadyShown) return;
  introHintTimer = window.setTimeout(() => {
    if (unlockedAchievements.size > 0) return;
    showNextAchievementHint({ intro:true });
    try { sessionStorage.setItem(INTRO_HINT_SESSION_KEY, '1'); } catch (_) {}
  }, INTRO_HINT_DELAY_MS);
}

function showAchievement(key, { force = false, demoIndex = null } = {}) {
  const data = ACHIEVEMENTS[key];
  if (!achievement || !data) return;
  if (!force && unlockedAchievements.has(key)) return;
  const firstDiscovery = !force && unlockedAchievements.size === 0;
  if (!force) {
    unlockedAchievements.add(key);
    telemetryCount('achievements','unlocks');
    telemetryUnique('achievements','keys',key);
    const sources=telemetryPath('achievements.sources');
    sources[key]='organic';
    telemetryMeaningful('achievement_unlocked',{key,source:'organic'});
    if(unlockedAchievements.size===ACHIEVEMENT_KEYS.length) telemetryMeaningful('epic_unlocked');
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify([...unlockedAchievements])); } catch (_) {}
  }
  if (firstDiscovery) window.clearTimeout(introHintTimer);
  updateAchievementProgress(demoIndex ?? null);
  showTransientToast(data.title,data.detail,`RARE // ${unlockedAchievements.size} / ${ACHIEVEMENT_KEYS.length}`,'RARE ACHIEVEMENT UNLOCKED');
  if (firstDiscovery) window.setTimeout(openLedger, 1100);
}

// Achievement ledger unlocks after the first discovery.
ledgerTrigger?.addEventListener('click', () => {
  if (ledger?.classList.contains('open')) closeLedger();
  else openLedger();
});
ledgerClose?.addEventListener('click', closeLedger);

function setInspectMode(active, {telemetry=true,skipDesign=false} = {}) {
  if(active && !skipDesign && document.body.classList.contains('design-mode')) setDesignMode(false,{telemetry:false,skipInspect:true});
  const changed=document.body.classList.contains('inspect-mode')!==active;
  document.body.classList.toggle('inspect-mode', active);
  if(changed && telemetry){
    telemetryCount('modes','inspectToggles');
    telemetryMeaningful('inspect_mode',{active});
  }
  inspectToggle?.classList.toggle('active', active);
  if (inspectToggle) inspectToggle.textContent = active ? 'Inspect Mode: On' : 'Inspect Mode';
  try { localStorage.setItem(INSPECT_KEY, active ? '1' : '0'); } catch (_) {}
}
function setDesignMode(active, {telemetry=true,skipInspect=false} = {}) {
  if(active && !designModeUnlocked){
    showTransientToast('DESIGN MODE // LOCKED','The Shop capstone is required before the design commentary layer becomes available.','SHOP // OWN EVERYTHING','SYSTEM');
    return false;
  }
  if(active && !skipInspect && document.body.classList.contains('inspect-mode')) setInspectMode(false,{telemetry:false,skipDesign:true});
  const changed=document.body.classList.contains('design-mode')!==active;
  document.body.classList.toggle('design-mode',active);
  if(changed && telemetry){
    telemetryCount('modes','designToggles');
    telemetryMeaningful('design_mode',{active});
  }
  const docsButton=document.getElementById('docs-toggle');
  if(docsButton){docsButton.hidden=!designModeUnlocked;let seen=false;try{seen=localStorage.getItem('mippi-docs-discovered-v1')==='1';}catch(_){}docsButton.classList.toggle('attention-new',active&&!seen);}
  designToggle?.classList.toggle('active',active);
  if(designToggle) designToggle.textContent=active?'Design Mode: On':'Design Mode';
  try{localStorage.setItem(DESIGN_KEY,active?'1':'0');}catch(_){}
  return true;
}
function updateDesignModeAvailability(){
  const docs=document.getElementById('docs-toggle');
  if(docs){docs.hidden=!designModeUnlocked;docs.disabled=!designModeUnlocked;docs.classList.toggle('attention-new',designModeUnlocked&&document.body.classList.contains('design-mode')&&localStorage.getItem('mippi-docs-discovered-v1')!=='1');}
  if(!designToggle) return;
  designToggle.hidden=!designModeUnlocked;
  designToggle.disabled=!designModeUnlocked;
  designToggle.title=designModeUnlocked?'Reveal the design reasoning behind annotated systems.':'Purchase the Shop capstone after owning every other item to reveal Design Mode.';
  if(!designModeUnlocked && document.body.classList.contains('design-mode')) setDesignMode(false,{telemetry:false,skipInspect:true});
}
let inspectPref = false;
let designPref = false;
try { inspectPref = localStorage.getItem(INSPECT_KEY) === '1'; designPref=localStorage.getItem(DESIGN_KEY)==='1'; } catch (_) {}
setInspectMode(inspectPref,{telemetry:false});
updateDesignModeAvailability();
if(designModeUnlocked && designPref) setDesignMode(true,{telemetry:false});
inspectToggle?.addEventListener('click', () => setInspectMode(!document.body.classList.contains('inspect-mode')));
designToggle?.addEventListener('click',()=>setDesignMode(!document.body.classList.contains('design-mode')));
themeCycle?.addEventListener('click', cycleThemeMode);
[
  ['.hero-actions','INPUT NOTE // These are the obvious exits. The page rewards trying the less obvious things too.'],
  ['.hero-scene-wrap','SCENE NOTE // The hero is a navigation toy wearing a portfolio header as camouflage.'],
  ['.intro-strip','UX NOTE // Fast credentials first, detail later. The page should work for skimmers and explorers.'],
  ['.heavy-water','PERSPECTIVE NOTE // This panel contains a second-person presentation experiment because first person was apparently too ordinary.'],
  ['.azure-altar','LAB NOTE // Azure Altar is a living testbed, which is a dignified way to say many ideas are tried here before they escape.'],
  ['.career-board','CAREER NOTE // This section compresses decades of work without asking anyone to read decades of text.'],
  ['.studio-wall','ART NOTE // Employer history gets visual texture, but text remains the actual source of truth.'],
  ['.career-timeline','TIMELINE NOTE // Chronology exists here because eventually even game designers need to respect linear time.'],
  ['.filter-bar','TOOL NOTE // Filter state is intentionally simple. The interesting complexity belongs in the tools, not their portfolio controls.'],
  ['.resume-panel','CONTENT NOTE // Short, Medium, and Long exist because different readers have very different tolerance for lore.'],
  ['.consult-projects','CONSULTING NOTE // Public projects get names. NDA projects get aggressively interesting rectangles.'],
  ['#crafting','CRAFT NOTE // The design-writing section is where opinions become frameworks and frameworks become more opinions.'],
  ['.tool-store-note','ECONOMY NOTE // GitHub is free. FAB is ninety-nine cents. This pricing model was not approved by a monetization designer.'],
  ['#tool-grid','PLUGIN NOTE // Small editor frustrations have an alarming tendency to become repositories.'],
  ['.tool-roadmap','BACKLOG NOTE // Every item here began with the phrase: this should be easy.'],
  ['.resource-grid','COMMUNITY NOTE // Documentation and community are production tools too, even if they do not ship in the executable.'],
  ['.about-panel','ABOUT NOTE // Eventually every portfolio has to stop being clever and explain who made it.'],
  ['.doug-card','MORALE NOTE // Doug is the only stakeholder whose feedback is always actionable.'],
  ['.about-links','LINK NOTE // This is the boring but useful part where the portfolio admits the rest of the internet exists.'],
  ['#hardware-warning','PERF NOTE // WebGL performance advice exists because browsers can sabotage the demo before the demo gets a vote.'],
  ['#discovery-controls','SYSTEM NOTE // This HUD started with achievements and somehow became a rarity progression system.'],
  ['#progress-hud','HUD NOTE // We now track health and currency on a portfolio website. Scope is healthy.'],
  ['#achievement-ledger','DISCOVERY NOTE // Hints are deliberately weaker than cheat because discovery should survive contact with usability.'],
  ['#hint-trigger','ACCESSIBILITY NOTE // Hints are opt-in after onboarding because secrets are more fun when frustration is not mandatory.'],
  ['#dev-console','CONSOLE NOTE // The fake console now contains enough commands that calling it fake feels slightly unfair.'],
  ['#dynamic-objective','OBJECTIVE NOTE // One optional objective at a time keeps direction lightweight instead of turning the portfolio into a quest log.'],
  ['#shop-popup','SHOP NOTE // One equipped gameplay modifier creates an actual choice instead of letting every purchase stack forever.'],
  ['#blueprint-popup','GRAPH NOTE // BP_WishManager is a stateful puzzle disguised as a fake editor window.'],
  ['#compile-popup','PIPELINE NOTE // Shader compilation is here because some forms of suffering are part of the Unreal brand.'],
  ['#wish-contact-popup','CONTACT NOTE // A joke input can still terminate in a useful professional action.'],
  ['#blender-popup','MAINTENANCE NOTE // The universe contains exactly one unsupported DCC package during this popup.'],
  ['#unreal-gift-popup','COMMUNITY REWARD // Five hearts later, the prize is people. That was intentional.'],
  ['.site-footer','SHIP NOTE // Return to Top was broken once. It has been informed this will be remembered.']
].forEach(([selector,note])=>{ const el=document.querySelector(selector); if(el && !el.dataset.devNote) el.dataset.devNote=note; });

const DESIGN_NOTES=[
  ['.brand-mark','DESIGN NOTE // ONBOARDING // The logo is the first deliberately easy Signal because the site needs to teach its hidden-interaction language before asking for real deduction. The reward is small, the response is immediate, and the player learns that ordinary-looking portfolio elements may have a second mechanical purpose.'],
  ['#achievement-ledger','DESIGN NOTE // DISCOVERY STRUCTURE // Signals reward broad curiosity rather than mastery of one minigame. The ledger exposes progress and thematic hints while keeping exact solutions behind the stronger Cheat affordance, so players can choose how much discovery friction they actually want.'],
  ['#hint-trigger','DESIGN NOTE // GUIDANCE AFTER COMPLETION // HINT begins as achievement assistance, but it deliberately survives 10/10 Signals. After Epic it becomes a context-sensitive progression guide for Shooting Stars, Wish repair, Shop mastery, Design Mode, and the Finale so the player is never left with a permanent "now what?" state.'],
  ['#theme-cycle','DESIGN NOTE // COSMETIC EXPRESSION // Rare, Epic, and Legendary are visual identities, not difficulty modes. Unlocking a rarity grants progression permanently, while the selector only changes presentation, which lets players keep the palette they prefer without accidentally disabling mechanics.'],
  ['#console-tip-button','DESIGN NOTE // DISCOVERABILITY // The Dev Console is too important to remain a secret available only to people who already know the tilde convention. Keeping the shortcut visible beside theme progression turns it into an invitation while still letting the console feel like something the player chose to investigate.'],
  ['#inspect-toggle','DESIGN NOTE // SYSTEM COMPREHENSION // Inspect Mode answers "what is this doing?" and is available early because it is primarily a usability and curiosity tool. It is intentionally separate from Design Mode, which answers the more advanced question of why a system was built that way.'],
  ['#design-toggle','DESIGN NOTE // AUTHOR COMMENTARY // Design Mode is a late-game reward because its explanations can spoil the intended discovery curve. Once unlocked, it turns the portfolio into a playable postmortem where mechanics can explain their goals, compromises, and relationships instead of only naming themselves.'],
  ['#dynamic-objective','DESIGN NOTE // SHORT-TERM GOALS // The site contains many optional systems, so one lightweight objective can turn ambient possibility into a concrete invitation. Objectives are Director-paced, never mandatory, and never stack into a quest backlog because the portfolio should still be readable as a portfolio.'],
  ['#progress-hud','DESIGN NOTE // PARALLEL PROGRESSION // Hearts, Rupees, Coolness, Castles, and Invasion each represent a different behavior instead of feeding one generic XP bar. Multiple small tracks make the page feel systemic while preserving the identity of each activity and preventing one optimal grind from replacing exploration.'],
  ['#rupee-meter','DESIGN NOTE // ECONOMY // Rupees only matter because they alter future play through the Shop. The wallet is persistent and visible after first discovery so every pickup communicates purchasing power, but costs stay low enough that experimentation does not require farming the portfolio.'],
  ['#heart-meter','DESIGN NOTE // NON-COMBAT HEARTS // Hearts look like a familiar health language, then deliberately refuse to become health. Their five-pickup payoff is a community reward, which redirects a conventional game collectible toward the professional identity of the site.'],
  ['#cool-meter','DESIGN NOTE // ANTICIPATION // Coolness makes Doug\'s limit state legible before it happens. Bones build toward a visible peak, the full meter transforms Bone presentation, and Cool Mode changes what petting Doug can do, so the meter is tied to behavior rather than being decorative progress.'],
  ['#invasion-meter','DESIGN NOTE // LONG-ARC PRESSURE // INVASION exposes the arcade escalation that used to be invisible. Ten UFO kills call a Boss, Boss victories build toward the Super Boss, and the meter lets a player decide whether to keep pushing that thread instead of wondering when a larger encounter might happen.'],
  ['#castle-meter','DESIGN NOTE // REPEATED JOKE, REAL PAYOFF // Keys and Castles are intentionally simple, but repetition still benefits from a destination. Four Castle checks trigger fireworks and Rupees, then the meter resets, giving the gag a satisfying cadence without pretending it needs a full quest tree.'],
  ['#meta-trace','DESIGN NOTE // MIDGAME DIRECTION // Reaching Epic is a major milestone, but it cannot feel like an ending if the site still has Legendary progression ahead. The trace points toward the next category of discovery without listing exact steps, and HINT can provide stronger guidance if the player wants it.'],
  ['#shop-popup','DESIGN NOTE // OPPORTUNITY COST // The Shop turns collection into future choices. Passive items expand the site permanently, one equipped gameplay modifier creates lightweight build tension, and rarity sections communicate progression value without tying mechanics to whichever visual theme is currently active.'],
  ['.shop-rarity-section','DESIGN NOTE // RARITY LANGUAGE // Item rarity is intentionally independent from the active site theme. A Rare item remains Rare while the page is Legendary, which keeps rarity meaningful as a progression grade instead of letting presentation rewrite the economy.'],
  ['.doug-card','DESIGN NOTE // SYSTEMIC CHARACTER // Doug is not confined to an About-section joke. Petting, Bones, Morale, Coolness, special images, spawn pacing, Wishes, and player-model evidence all reinforce the same character through mechanics, which makes personality part of the system design.'],
  ['.doug-peek','DESIGN NOTE // CONTINUITY // Offscreen Doug preserves the Bone reaction even when the biography card is not visible. The popup remains interactive during Interact Off because anything the game still expects the player to touch should remain visually and mechanically alive.'],
  ['.hero-scene-wrap','DESIGN NOTE // INTERACTIVE NAVIGATION // The Hero scene doubles as a visual identity piece and a spatial navigation toy. Conventional navigation remains available, while clickable Three.js signals reward curiosity without making professional content depend on WebGL or precision interaction.'],
  ['.hero-actions','DESIGN NOTE // REDUNDANCY // The obvious Hero actions exist because playful navigation should be additive, not a gate. A recruiter can use conventional buttons, an explorer can click 3D signals, and both routes reach the same professional information.'],
  ['.perspective-demo','DESIGN NOTE // CONCEPT THROUGH INTERACTION // The Heavy Water visualizer explains first, second, and third person by letting the visitor manipulate the relationship instead of reading a static definition. The split tactical and camera views make control ownership and viewpoint ownership visible at the same time.'],
  ['#games','DESIGN NOTE // PROFESSIONAL ESCAPE HATCH // The game layer never gates the actual work. A visitor who ignores every collectible, command, achievement, and boss can still evaluate projects, career history, writing, tools, and contact information normally.'],
  ['.azure-altar','DESIGN NOTE // LIVING TESTBED // Azure Altar is framed as a side project because it is allowed to absorb experiments that would be inappropriate in production work. That gives the portfolio permission to show iterative design behavior instead of only polished outcomes.'],
  ['.career-board','DESIGN NOTE // SCANNABILITY // A long career creates an information-density problem. The board prioritizes recognizable employers and projects first, then lets timelines and resume variants provide deeper chronology for visitors who actually want it.'],
  ['.resume-panel','DESIGN NOTE // READER-SELECTED DEPTH // Short, Medium, and Long resumes acknowledge that different audiences have different time budgets. The page does not decide how much biography someone must consume before they can reach useful information.'],
  ['.consult-projects','DESIGN NOTE // NDA AS PRESENTATION CONSTRAINT // Public consulting work can be named and shown directly, while confidential work still needs to communicate scope without leaking protected details. The layout treats that limitation as part of the presentation instead of apologizing for it.'],
  ['#crafting','DESIGN NOTE // DESIGN THINKING AS OUTPUT // The writing section exists because shipped features are only one artifact of design work. Frameworks and essays expose how problems are framed, which gives context to the mechanics elsewhere on the page.'],
  ['#tool-grid','DESIGN NOTE // TOOLMAKING AS DESIGN // The Unreal plugins are small responses to repeated workflow friction. Showing them together makes a pattern visible: noticing a usability cost, defining a narrow interaction, testing it in production-like conditions, and shipping the result.'],
  ['.filter-bar','DESIGN NOTE // LOW-FRICTION BROWSING // Tool filters are deliberately simple because they are navigation, not content. The control should help visitors narrow the catalog without becoming a second interface they have to learn.'],
  ['#dev-console','DESIGN NOTE // EXPERIMENTATION SURFACE // The console supports players who learn systems by poking them directly. It provides cheats, navigation, debug toys, Unreal jokes, recovery paths, and hidden commands, which makes experimentation a valid play style rather than a way to break the intended experience.'],
  ['#blueprint-popup','DESIGN NOTE // FAILURE AS INFORMATION // Discovering wish is not enough. The first failed runtime call teaches that the path exists but is invalid, then the Blueprint repair turns an error into a solvable problem. The Wish charge is preserved so learning does not consume the scarce prerequisite.'],
  ['#compile-popup','DESIGN NOTE // RECOGNIZABLE PRODUCTION PAIN // Shader compilation exaggerates a shared Unreal experience, but it now errors after a short readable pause instead of trapping the player in an ambiguous wait. A joke can waste a little time; it should not accidentally waste an unknown amount.'],
  ['#wish-contact-popup','DESIGN NOTE // PROFESSIONAL PAYOFF // A playful Wish can terminate in a useful contact action. The joke earns attention, then the popup turns that attention into Discord, LinkedIn, or email without making the professional action mandatory.'],
  ['#blender-popup','DESIGN NOTE // SPECIFICITY MAKES SECRETS LAND // Blender receives a bespoke universe-maintenance sequence instead of a generic toast because secret inputs are memorable when the response feels authored for exactly what the player typed. The later Wish branches follow the same rule.'],
  ['#unreal-gift-popup','DESIGN NOTE // REWARD MEANING // The five-Heart reward points to Unreal Source because the most relevant prize for this audience is a useful community, not a larger number. It also connects the playful collectible layer back to real professional practice.'],
  ['.flappy-game','DESIGN NOTE // SIDE GAME DISCIPLINE // Mippi Bird stays mechanically narrow: one-button movement, immediate failure, fast restart, and a couple of cross-system rewards. Extra lives soften frustration without turning a portfolio minigame into a progression-heavy standalone product.'],
  ['.galaga-secret','DESIGN NOTE // AMBIENT THREAT // Regular UFOs begin as another flying curiosity, then reveal that the site can push back. Escalating fire pressure and the INVASION meter make repeated encounters build toward something larger instead of remaining isolated click targets.'],
  ['.boss-ufo','DESIGN NOTE // ESCALATION // The six-hit Boss asks for sustained attention after a sequence of one-hit targets. Its health UI and shortened reacquisition after escape preserve readable progress while keeping failure low-stakes.'],
  ['.superboss-arena','DESIGN NOTE // FOCUSED ENCOUNTER // The Super Boss temporarily borrows Interact Off rather than inventing a second page-lock system. Adds divide attention, rockets chase, the laser sweeps, and the Exit control keeps the encounter voluntary even while it temporarily owns the interaction layer.'],
  ['.section-castle','DESIGN NOTE // SETUP AND PAYOFF // The Key creates anticipation and the Castle delivers the joke. The CASTLES meter adds a longer reward arc, but the basic interaction stays one click because overdesigning the punchline would make it less funny.'],
  ['#hardware-warning','DESIGN NOTE // GRACEFUL FAILURE // The playful layer is ambitious enough to depend on WebGL and browser behavior, so the page needs a clear fallback when rendering support is weak. Professional content remains usable because game systems should enrich the portfolio, not hold it hostage.'],
  ['#session-debrief','DESIGN NOTE // REFLECTION // The final report turns accumulated local telemetry into a mirror of how the visitor used the site. It is descriptive rather than evaluative, and the mutable Player Model means the conclusion reflects recent behavior instead of permanently labeling the first few minutes.'],
  ['#finale-overlay','DESIGN NOTE // ENDING WITHOUT LOCKOUT // The Finale recognizes broad engagement instead of demanding every secret. It provides a authored stopping point, then explicitly lets the player continue because a portfolio should never punish someone for wanting to keep exploring.'],
  ['.site-footer','DESIGN NOTE // ORDINARY UTILITY STILL MATTERS // After all the systems, the page still needs boring reliable navigation. Return to Top is intentionally conventional because not every interaction benefits from becoming a mechanic.']
];
DESIGN_NOTES.forEach(([selector,note])=>{
  document.querySelectorAll(selector).forEach(el=>{ if(!el.dataset.designNote) el.dataset.designNote=note; });
});


document.querySelector('.brand-mark')?.addEventListener('click', event => {
  event.preventDefault();
  if(finaleReady){startFinale();return;}
  showAchievement('curious');
});

filters.forEach(button => button.addEventListener('click', () => {
  if (button.dataset.filter === 'wip') showAchievement('wip');
}));

document.querySelector('.resume-long')?.addEventListener('click', () => showAchievement('lore'));

// Resume links are intentionally external. We make a best-effort attempt to
// keep the portfolio focused, but browsers ultimately decide foreground/background tab behavior.
document.querySelectorAll('.resume-links a').forEach(anchor=>{
  anchor.addEventListener('click',event=>{
    if(event.defaultPrevented || event.button!==0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    let opened=null;
    try{ opened=window.open(anchor.href,'_blank'); }catch(_){}
    if(opened){
      try{ opened.opener=null; opened.blur(); }catch(_){}
      window.setTimeout(()=>{ try{ window.focus(); }catch(_){} },0);
      window.setTimeout(()=>{ try{ window.focus(); }catch(_){} },120);
    }else{
      // Popup policy blocked scripting. Fall back to the browser's ordinary _blank handling.
      const fallback=document.createElement('a');
      fallback.href=anchor.href; fallback.target='_blank'; fallback.rel='noopener noreferrer';
      fallback.style.display='none'; document.body.appendChild(fallback); fallback.click(); fallback.remove();
    }
  });
});


document.querySelector('.unmark-secret')?.addEventListener('click', () => showAchievement('unmark'));
document.querySelector('.nda-secret')?.addEventListener('click', () => showAchievement('nda'));

// Doug has a small reaction chain instead of being a one-click joke.
const doug = document.querySelector('.doug-secret');
const dougCard = document.querySelector('.doug-card');
const dougReaction = document.querySelector('#doug-reaction');
let dougClicks = 0;
const dougReactions = [
  'Doug notices you.',
  'Head tilt engaged.',
  'You have his full attention now.',
  'This is becoming a meeting.',
  'Morale check passed.',
  'Doug would like this task deprioritized.',
  'Pet break has entered the sprint.',
  'Doug has assumed command.'
];
let dougReactionTimer;
let dougCommandPetMomentum=0;
function reactDoug(message) {
  if (!dougReaction) return;
  dougReaction.textContent = message;
  dougReaction.classList.add('show');
  window.clearTimeout(dougReactionTimer);
  dougReactionTimer = window.setTimeout(() => dougReaction.classList.remove('show'), 2200);
}
function petDoug(source='card',sourceEl=doug){
  dougClicks += 1;
  telemetryCount('interaction','dougClicks');
  telemetryCount('interaction.dougPetSources',source);
  if(dougClicks===1) telemetryMeaningful('doug_interaction',{source});
  else telemetryMeaningful('doug_pet',{source,count:dougClicks});
  const index = Math.min(dougReactions.length - 1, Math.floor((dougClicks - 1) / 2));
  const message=dougReactions[index];
  reactDoug(message);
  burstDougPaws(document.body.classList.contains('theme-complete')?6:4,sourceEl);
  if(source==='peek'){
    const peek=sourceEl?.closest?.('.doug-peek')||sourceEl;
    const label=peek?.querySelector?.('strong');
    if(label) label.textContent=message;
    if(peek){
      peek.classList.add('petted');
      window.setTimeout(()=>peek.classList.remove('petted'),280);
      clearTimeout(dougPeekTimer);
      dougPeekTimer=setTimeout(()=>{peek.classList.remove('show','star-cool');syncDougThemeVisuals();},2400);
    }
  }
  if (dougClicks === 5) showAchievement('doug');
  if (dougClicks >= 12) dougCard?.classList.add('doug-command');
  if(dougCard?.classList.contains('doug-command')){
    if(dougCoolActive){
      const spawned=spawnDougApprovedClickable('cool_pet');
      if(spawned){ telemetryCount('economy','coolPetSpawns'); reactDoug('Doug has authorized immediate air traffic.'); }
    }else{
      dougCommandPetMomentum++;
      const spawnNow=dougCommandPetMomentum>=3 || Math.random()<(dougCommandPetMomentum*.12);
      if(spawnNow){
        const spawned=spawnDougApprovedClickable('command_pet');
        if(spawned){ telemetryCount('economy','dougSpawnAssists'); dougCommandPetMomentum=0; }
      }
    }
  }
  syncDougThemeVisuals();
}
doug?.addEventListener('click', () => petDoug('card',doug));

// A rare ambient signal drifts through the viewport from time to time.
const ambientSecret = document.createElement('button');
ambientSecret.type = 'button';
ambientSecret.className = 'ambient-secret';
ambientSecret.setAttribute('aria-label','Unknown ambient signal');
document.body.appendChild(ambientSecret);
let ambientSecretTimer;
function scheduleAmbientSecret(initial = false) {
  window.clearTimeout(ambientSecretTimer);
  const wait = initial ? 9000 : 24000 + Math.random() * 26000;
  ambientSecretTimer = window.setTimeout(() => {
    const x = 12 + Math.random() * 76;
    const y = 14 + Math.random() * 68;
    ambientSecret.style.left = `${x}vw`;
    ambientSecret.style.top = `${y}vh`;
    ambientSecret.classList.add('visible');
    telemetryFlyingSpawn('ghost_anomaly');
    window.setTimeout(() => {
      if(ambientSecret.classList.contains('visible')) telemetryFlyingMiss('ghost_anomaly');
      ambientSecret.classList.remove('visible');
      scheduleAmbientSecret(false);
    }, 8500);
  }, wait);
}
ambientSecret.addEventListener('click', () => {
  telemetryFlyingCollect('ghost_anomaly','direct');
  ambientSecret.classList.remove('visible');
  showAchievement('ghost');
  scheduleAmbientSecret(false);
});
scheduleAmbientSecret(true);

// Classic hidden sequence: Up Up Down Down Left Right Left Right B A. WASD can substitute for directional inputs.
const KONAMI = ['arrowup','arrowup','arrowdown','arrowdown','arrowleft','arrowright','arrowleft','arrowright','b','a'];
const KONAMI_DIRECTIONS = { w:'arrowup', s:'arrowdown', a:'arrowleft', d:'arrowright' };
let konamiIndex = 0;
let demoIndex = 0;

// Hidden client-side developer console. No eval, no shell access, just portfolio commands.
const devConsole = document.querySelector('#dev-console');
const consoleClose = document.querySelector('#console-close');
const consoleForm = document.querySelector('#console-form');
const consoleInput = document.querySelector('#console-input');
const consoleOutput = document.querySelector('#console-output');
const consoleTipButton = document.querySelector('#console-tip-button');
let consoleHistory = [];
let consoleHistoryIndex = 0;
function openConsole(open = true) {
  const wasOpen=devConsole?.classList.contains('open')||false;
  devConsole?.classList.toggle('open', open);
  devConsole?.setAttribute('aria-hidden', String(!open));
  if(open!==wasOpen){
    telemetryCount('console',open?'opens':'closes');
    if(open) telemetryMeaningful('console_opened');
  }
  updateConsoleAttention();
  if(open) window.setTimeout(() => consoleInput?.focus(), 60);
  else if(document.activeElement===consoleInput)consoleInput?.blur();
}
function consolePrint(text, cls = '') {
  if (!consoleOutput) return;
  const line = document.createElement('div');
  line.className = `console-line ${cls}`;
  line.textContent = text;
  consoleOutput.appendChild(line);
  consoleOutput.scrollTop = consoleOutput.scrollHeight;
}
consoleTipButton?.addEventListener('click', () => openConsole(true));
document.getElementById('console-wish-guide-action')?.addEventListener('click',event=>{
  const command=event.currentTarget.dataset.command;
  if(command!=='wish'&&command!=='blueprint')return;
  executeConsoleCommand(command);
  consoleInput?.focus();
});
let consolePending = null;
let statOverlay = null;
let statTimer = null;
let statMode = null;
let statFpsRaf=null,statFpsFrames=0,statFpsWindowStart=0,statFpsMeasured=null,statFpsMeasuredAt=0;
let slowmoEnabled = false;
let easyModeEnabled = false;
let easyModeTimer = null;
let naniteEnabled = false;
const naniteControllers = [];

let vibeEnabled = false;
let vibeTimer = null;
let vibeAgent = null;
let lumenLayer = null;
let lumenEnabled = false;
let lumenRandomTimers=new Set();
let lightingWarningTimer=null;

// Adaptive Game Director -----------------------------------------------------
// Invisible pacing layer. It never gates portfolio content, never invalidates
// progress, and Easy Mode always overrides it. The Director only changes the
// frequency/generosity of ambient game systems and hostile arcade pressure.
const DIRECTOR_PROFILES={
  quiet:{pickupDelay:1.05,secretDelay:1.16,ufoDelay:1.24,boneDelay:1.12,flight:1.05,hostileCadence:1.08,projectileDuration:1.04,targetBonus:0},
  curious:{pickupDelay:1,secretDelay:1,ufoDelay:1,boneDelay:1,flight:1,hostileCadence:1,projectileDuration:1,targetBonus:0},
  engaged:{pickupDelay:.84,secretDelay:.94,ufoDelay:.86,boneDelay:.90,flight:1.02,hostileCadence:.94,projectileDuration:1,targetBonus:10},
  struggling:{pickupDelay:.70,secretDelay:.86,ufoDelay:1.08,boneDelay:.78,flight:1.32,hostileCadence:1.28,projectileDuration:1.18,targetBonus:42},
  mastery:{pickupDelay:.72,secretDelay:.84,ufoDelay:.73,boneDelay:.82,flight:.92,hostileCadence:.82,projectileDuration:.92,targetBonus:0}
};
const directorRuntime={
  state:DIRECTOR_PROFILES[sessionTelemetry.director?.state]?sessionTelemetry.director.state:'curious',
  stateSince:Date.now(),candidate:null,candidateSince:0,lastEvaluation:0,lastOpportunityAt:0,lastStateAccounting:Date.now(),
  blockedAmbient:{pickup:0,bone:0,shooting_star:0,ufo:0},lastFriendlyAmbientAt:0,lastLegendaryGuaranteeAt:0
};
function directorSum(obj){ return Object.values(obj||{}).reduce((sum,value)=>sum+(Number(value)||0),0); }
function directorLiveActiveMs(){
  const committed=Number(sessionTelemetry.session.activeMs)||0;
  return committed+(telemetryActiveStarted==null?0:Math.max(0,performance.now()-telemetryActiveStarted));
}
function directorLiveSectionDwell(){
  let total=Object.values(sessionTelemetry.sections||{}).reduce((sum,entry)=>sum+(Number(entry?.dwellMs)||0),0);
  telemetrySectionActive.forEach(started=>{ total+=Math.max(0,performance.now()-started); });
  return total;
}
function directorMetrics(){
  const collected=directorSum(sessionTelemetry.flying?.collected);
  const missed=directorSum(sessionTelemetry.flying?.missed);
  const forced=directorSum(sessionTelemetry.flying?.forced);
  const spawned=Math.max(0,directorSum(sessionTelemetry.flying?.spawned)-forced);
  const naturalAttempts=Math.max(0,collected+missed-Math.min(forced,collected+missed));
  const collectRate=naturalAttempts>0?collected/naturalAttempts:1;
  const ufoSpawned=Number(sessionTelemetry.arcade?.ufoSpawned)||0;
  const ufoDestroyed=Number(sessionTelemetry.arcade?.ufoDestroyed)||0;
  const ufoRate=ufoSpawned>0?ufoDestroyed/ufoSpawned:1;
  const achievementCount=Number(sessionTelemetry.achievements?.unlocks)||0;
  const consoleCommands=Number(sessionTelemetry.console?.commands)||0;
  const shopPurchases=Number(sessionTelemetry.economy?.shopPurchases)||0;
  const flappyStarts=Number(sessionTelemetry.flappy?.gamesStarted)||0;
  const dougPets=Number(sessionTelemetry.interaction?.dougClicks)||0;
  const modeToggles=['inspectToggles','slowmoToggles','particleToggles','lumenToggles','naniteToggles','vibeToggles'].reduce((n,k)=>n+(Number(sessionTelemetry.modes?.[k])||0),0);
  const gameScore=achievementCount*2+collected*1.05+ufoDestroyed*1.4+(Number(sessionTelemetry.arcade?.bossHits)||0)*.45+(Number(sessionTelemetry.arcade?.bossDefeated)||0)*3+Math.min(consoleCommands,12)*.55+shopPurchases*1.7+flappyStarts*1.2+Math.min(dougPets,8)*.35+Math.min(modeToggles,10)*.45;
  const sectionsVisited=Object.values(sessionTelemetry.sections||{}).filter(entry=>(Number(entry?.visits)||0)>0).length;
  const professionalDwell=directorLiveSectionDwell();
  const professionalActions=(Number(sessionTelemetry.interaction?.externalClicks)||0)+(Number(sessionTelemetry.portfolio?.galleryOpens)||0)+directorSum(sessionTelemetry.portfolio?.resumeClicks);
  const activeMs=directorLiveActiveMs();
  const now=Date.now();
  const recentGameEvents=(sessionTelemetry.timeline||[]).filter(event=>now-(Number(event?.t)||0)<90000 && !['section_first_visit','external_link'].includes(event?.type)).length;
  return {collected,missed,spawned,naturalAttempts,collectRate,ufoSpawned,ufoDestroyed,ufoRate,achievementCount,gameScore,sectionsVisited,professionalDwell,professionalActions,activeMs,recentGameEvents,lastMeaningfulAgo:now-(Number(sessionTelemetry.session.lastMeaningfulAt)||now)};
}
function directorClassify(metrics){
  const professionalReader=metrics.activeMs>55000 && metrics.sectionsVisited>=2 && metrics.professionalDwell>42000 && metrics.gameScore<4.5;
  if(professionalReader) return {state:'quiet',reason:'professional_reader'};
  const collectibleStruggle=metrics.gameScore>=4 && metrics.collected>=1 && metrics.naturalAttempts>=6 && metrics.collectRate<.30;
  const arcadeStruggle=metrics.ufoSpawned>=4 && metrics.ufoDestroyed>=1 && metrics.ufoRate<.34;
  if(collectibleStruggle||arcadeStruggle) return {state:'struggling',reason:collectibleStruggle?'collection_friction':'arcade_friction'};
  const masteryByCollection=metrics.naturalAttempts>=8 && metrics.collectRate>=.62 && metrics.collected>=8;
  const masteryByArcade=metrics.ufoSpawned>=5 && metrics.ufoRate>=.66 && metrics.ufoDestroyed>=4;
  if(metrics.gameScore>=20 && metrics.achievementCount>=3 && (masteryByCollection||masteryByArcade)) return {state:'mastery',reason:masteryByArcade?'arcade_mastery':'interaction_mastery'};
  if(metrics.gameScore>=7 || metrics.recentGameEvents>=5) return {state:'engaged',reason:'active_play'};
  if(metrics.activeMs>100000 && metrics.gameScore<2.5) return {state:'quiet',reason:'low_game_engagement'};
  return {state:'curious',reason:'baseline_exploration'};
}
function directorAccountStateTime(){
  const now=Date.now(),elapsed=Math.max(0,now-directorRuntime.lastStateAccounting);
  directorRuntime.lastStateAccounting=now;
  const stateMs=telemetryPath('director.stateMs');
  stateMs[directorRuntime.state]=(Number(stateMs[directorRuntime.state])||0)+elapsed;
}
function directorSetState(next,reason){
  if(!DIRECTOR_PROFILES[next]||next===directorRuntime.state) return;
  directorAccountStateTime();
  const previous=directorRuntime.state;
  directorRuntime.state=next; directorRuntime.stateSince=Date.now(); directorRuntime.candidate=null; directorRuntime.candidateSince=0;
  document.body.dataset.directorState=next;
  sessionTelemetry.director.state=next; sessionTelemetry.director.lastReason=reason;
  sessionTelemetry.director.transitions=(Number(sessionTelemetry.director.transitions)||0)+1;
  if(!Array.isArray(sessionTelemetry.director.stateChanges)) sessionTelemetry.director.stateChanges=[];
  sessionTelemetry.director.stateChanges.push({t:Date.now(),from:previous,to:next,reason});
  if(sessionTelemetry.director.stateChanges.length>24) sessionTelemetry.director.stateChanges.splice(0,sessionTelemetry.director.stateChanges.length-24);
  telemetryScheduleSave();
}
function directorEvaluate(){
  directorAccountStateTime();
  sessionTelemetry.director.evaluations=(Number(sessionTelemetry.director.evaluations)||0)+1;
  const metrics=directorMetrics();
  const result=directorClassify(metrics);
  const now=Date.now();
  if(result.state===directorRuntime.state){ directorRuntime.candidate=null; directorRuntime.candidateSince=0; sessionTelemetry.director.lastReason=result.reason; }
  else if(directorRuntime.candidate!==result.state){ directorRuntime.candidate=result.state; directorRuntime.candidateSince=now; }
  else if(now-directorRuntime.candidateSince>=9000 && now-directorRuntime.stateSince>=14000){ directorSetState(result.state,result.reason); }
  directorRuntime.lastEvaluation=now;
  directorMaybeBreakDrought(metrics);
  telemetryScheduleSave();
}
function directorProfile(){ return DIRECTOR_PROFILES[directorRuntime.state]||DIRECTOR_PROFILES.curious; }
function directorDelay(kind,min,max){
  const base=min+Math.random()*Math.max(0,max-min);
  if(easyModeEnabled) return base;
  const p=directorProfile();
  const key=kind==='shooting_star'?'secretDelay':kind==='ufo'?'ufoDelay':kind==='bone'?'boneDelay':'pickupDelay';
  return base*(Number(p[key])||1);
}
function directorFlightMultiplier(){ return easyModeEnabled?1:(Number(directorProfile().flight)||1); }
function directorHostileCadenceMultiplier(){ return easyModeEnabled?1:(Number(directorProfile().hostileCadence)||1); }
function directorProjectileDurationMultiplier(){ return easyModeEnabled?1:(Number(directorProfile().projectileDuration)||1); }
function directorTargetBonus(){ return easyModeEnabled?0:(Number(directorProfile().targetBonus)||0); }
function directorNoteFriendlyAmbient(){ directorRuntime.lastFriendlyAmbientAt=Date.now(); directorRecordOpportunity(); }
function directorQueueAmbient(kind){
  if(!kind || !Object.prototype.hasOwnProperty.call(directorRuntime.blockedAmbient,kind)) return;
  directorRuntime.blockedAmbient[kind]=Math.min(3,(Number(directorRuntime.blockedAmbient[kind])||0)+1);
}
function directorAmbientVisible(){
  return !!document.querySelector('.shooting-star,.galaga-secret,.game-pickup,.doug-bone');
}
function directorAnyFriendlyVisible(){return !!document.querySelector('.shooting-star,.game-pickup,.doug-bone');}
function directorSpawnOpportunityByPriority(preferred=null,{force=false}={}){
  const attempts=[];
  const add=fn=>{ if(typeof fn==='function') attempts.push(fn); };
  const choosePreferred=()=>{
    switch(preferred){
      case 'shooting_star': add(()=>spawnShootingStar(force)); break;
      case 'ufo': add(()=>spawnGalaga(force)); break;
      case 'bone': add(()=>spawnDougBone(force)); break;
      case 'pickup': add(()=>spawnGamePickup(null,force)); break;
    }
  };
  choosePreferred();
  if(hasWish && typeof hasWish==='function' && !hasWishCharge() && epicGameplayUnlocked()) add(()=>spawnShootingStar(force));
  if(dougCard?.classList.contains('doug-command')) add(()=>spawnDougBone(force));
  add(()=>spawnGamePickup(null,force));
  if(epicGameplayUnlocked() && !ufoBossActive && !superBossActive && Date.now()>=ufoCalmUntil) add(()=>spawnGalaga(force));
  for(const attempt of attempts){ try{ if(attempt()) return true; }catch(_){ } }
  return false;
}
function directorFlushBlockedAmbient(){
  if(directorAttentionBlocked() || reduceMotion) return false;
  const order=['shooting_star','pickup','bone','ufo'];
  for(const kind of order){
    if((Number(directorRuntime.blockedAmbient[kind])||0)<=0) continue;
    if(directorSpawnOpportunityByPriority(kind,{force:false})){
      directorRuntime.blockedAmbient[kind]=Math.max(0,(Number(directorRuntime.blockedAmbient[kind])||1)-1);
      return true;
    }
  }
  return false;
}
function directorLegendaryGuarantee(){
  if(!legendaryGameplayUnlocked() || reduceMotion || directorAttentionBlocked()) return;
  if(directorAnyFriendlyVisible())return;
  const now=Date.now();
  const idleFor=now-Math.max(directorRuntime.lastFriendlyAmbientAt||0,directorRuntime.lastOpportunityAt||0,directorRuntime.lastLegendaryGuaranteeAt||0);
  if(idleFor<2200) return;
  if(directorSpawnOpportunityByPriority(null,{force:true})){
    directorRuntime.lastLegendaryGuaranteeAt=now;
    sessionTelemetry.director.legendaryGuarantees=(Number(sessionTelemetry.director.legendaryGuarantees)||0)+1;
    telemetryScheduleSave();
  }
}
function directorAttentionBlocked(){
  if(superBossActive) return true;
  if(document.visibilityState!=='visible') return true;
  const focus=document.activeElement;
  // A closed Dev Console can retain keyboard focus even while off-screen.
  // Never let that stale focus permanently suppress natural flying pickups.
  if(focus?.matches?.('input,textarea,select') && (!focus.closest('.dev-console')||focus.closest('.dev-console.open')) && focus.getClientRects().length>0)return true;
  // Small toasts and an open achievement ledger must not starve the ambient economy.
  // Only modal input/overlay states can pause natural spawning.
  return !!document.querySelector('.dev-console.open,.shop-popup.open,.blueprint-popup.open,.compile-popup.open,.wish-special-popup.open,.wish-sequence-overlay,.hal-overlay.show,.azure-gallery[aria-hidden="false"],.flappy-game.open,.finale-overlay.show,.session-debrief.show');
}
function directorAllowsAmbient(kind,{force=false}={}){
  if(force||easyModeEnabled) return true;
  if(directorAttentionBlocked()){
    sessionTelemetry.director.attentionBlocks=(Number(sessionTelemetry.director.attentionBlocks)||0)+1;
    directorQueueAmbient(kind);
    telemetryScheduleSave();
    return false;
  }
  return true;
}
function directorRecordOpportunity(){ directorRuntime.lastOpportunityAt=Date.now(); }
function directorMaybeBreakDrought(metrics=directorMetrics()){
  if(easyModeEnabled || reduceMotion) return;
  if(directorAttentionBlocked()) return;
  if(directorAnyFriendlyVisible()) return;
  const threshold=legendaryGameplayUnlocked()?8500:!epicGameplayUnlocked()?17000:directorRuntime.state==='struggling'?11000:directorRuntime.state==='engaged'?13500:15500;
  const now=Date.now();
  if(now-directorRuntime.lastOpportunityAt<threshold) return;
  // A recently collected reward never delays the next actual spawning opportunity.

  if(directorSpawnOpportunityByPriority('pickup',{force:false})){
    sessionTelemetry.director.droughtAssists=(Number(sessionTelemetry.director.droughtAssists)||0)+1;
    telemetryScheduleSave();
  }
}
function startAdaptiveDirector(){
  document.body.dataset.directorState=directorRuntime.state;
  sessionTelemetry.director.state=directorRuntime.state;
  directorRuntime.lastFriendlyAmbientAt=Date.now();
  window.setTimeout(directorEvaluate,4500);
  window.setInterval(directorEvaluate,8000);
  window.setInterval(()=>{ directorFlushBlockedAmbient(); directorLegendaryGuarantee(); },900);
  window.addEventListener('pagehide',directorAccountStateTime);
}
Object.defineProperty(window,'__MIPPI_DIRECTOR__',{
  value:Object.freeze({snapshot:()=>({state:directorRuntime.state,profile:{...directorProfile()},metrics:directorMetrics(),telemetry:JSON.parse(JSON.stringify(sessionTelemetry.director||{}))})}),
  enumerable:false,configurable:false
});


// Dynamic Objectives --------------------------------------------------------
// One timed optional challenge at a time. Objectives invite interaction without
// becoming a quest log: they never gate progression, can always be dismissed,
// and only pay out when completed before their visible countdown expires.
const OBJECTIVE_FRIENDLY_KINDS=new Set(['rupee','heart','1up','star','key','bone','shooting_star']);
const OBJECTIVE_SECTION_IDS=['games','career','consulting','crafting','tools','about'];
const OBJECTIVE_DEFS=[
  {id:'signal-sweep',category:'DISCOVERY',title:'Find one more hidden Signal.',goal:1,reward:2,duration:120000,
    eligible:()=>unlockedAchievements.size>0 && unlockedAchievements.size<ACHIEVEMENT_KEYS.length,
    detail:'The site is already telling you that something else reacts.'},
  {id:'field-trip',category:'EXPLORATION',title:'Visit three unexplored sections.',goal:3,reward:2,duration:90000,
    eligible:()=>OBJECTIVE_SECTION_IDS.filter(id=>!(Number(sessionTelemetry.sections?.[id]?.visits)||0)).length>=3,
    detail:'Three new major sections before the timer empties.'},
  {id:'inspection',category:'EXPLORATION',title:'Inspect one annotated element.',goal:1,reward:1,duration:50000,
    eligible:()=>unlockedAchievements.size>0,
    detail:'Turn on Inspect from the bottom-right mode controls, then inspect anything annotated.'},
  {id:'command-line',category:'EXPLORATION',title:'Run one valid Dev Console command.',goal:1,reward:1,duration:50000,
    eligible:()=>unlockedAchievements.size>0,
    detail:'Any valid command counts. The console tip is beside the Theme control.'},
  {id:'theme-shift',category:'EXPLORATION',title:'Change the rarity theme once.',goal:1,reward:1,duration:40000,
    eligible:()=>unlockedAchievements.size===ACHIEVEMENT_KEYS.length,
    detail:'Rare, Epic, or Legendary. Change presentation without changing progress.'},
  {id:'pickup-catch',category:'COLLECTION',title:'Catch any flying pickup.',goal:1,reward:1,duration:45000,
    eligible:()=>epicGameplayUnlocked() && !reduceMotion,
    detail:'Any friendly flying pickup counts.'},
  {id:'pickup-double',category:'COLLECTION',title:'Catch two flying pickups.',goal:2,reward:2,duration:60000,
    eligible:()=>epicGameplayUnlocked() && !reduceMotion,
    detail:'Two catches. They can be the same pickup type.'},
  {id:'pickup-variety',category:'COLLECTION',title:'Collect two different pickup types.',goal:2,reward:2,duration:70000,
    eligible:()=>epicGameplayUnlocked() && !reduceMotion && directorSum(sessionTelemetry.flying?.collected)>=2,
    detail:'Two different kinds. Variety matters more than volume.'},
  {id:'heart-signal',category:'COLLECTION',title:'Collect one Heart.',goal:1,reward:1,duration:55000,
    eligible:()=>epicGameplayUnlocked() && !reduceMotion && heartCount<5,
    detail:'A Heart will count whether you click it, touch it with Star Power, or shoot it.'},
  {id:'rupee-hunt',category:'COLLECTION',title:'Collect one flying Rupee.',goal:1,reward:1,duration:55000,
    eligible:()=>epicGameplayUnlocked() && !reduceMotion,
    detail:'Catch a blue Rupee before the timer runs out.'},
  {id:'bone-run',category:'MORALE',title:'Collect two Doug Bones.',goal:2,reward:2,duration:65000,
    eligible:()=>!!dougCard?.classList.contains('doug-command') && !reduceMotion,
    detail:'Doug has approved a morale sprint.'},
  {id:'doug-pet',category:'MORALE',title:'Pet Doug three times.',goal:3,reward:1,duration:45000,
    eligible:()=>!!dougCard,
    detail:'Three pets. This is a legitimate production task now.'},
  {id:'castle-check',category:'EXPLORATION',title:'Check the active Castle.',goal:1,reward:2,duration:50000,
    eligible:()=>!!(castleQuestActive||activeCastle),
    detail:'A Key already created the opportunity. Find the Castle before time expires.'},
  {id:'airspace-one',category:'ARCADE',title:'Destroy one regular UFO.',goal:1,reward:1,duration:50000,
    eligible:()=>epicGameplayUnlocked() && !reduceMotion && !ufoBossActive && !superBossActive && Date.now()>=ufoCalmUntil,
    detail:'Any valid kill method counts.'},
  {id:'airspace',category:'ARCADE',title:'Destroy two regular UFOs.',goal:2,reward:2,duration:75000,
    eligible:()=>epicGameplayUnlocked() && !reduceMotion && !ufoBossActive && !superBossActive && Date.now()>=ufoCalmUntil,
    detail:'Clear two contacts before the timer empties.'},
  {id:'contact-damage',category:'SYSTEM COMBO',title:'Destroy a UFO with Star Power contact.',goal:1,reward:3,duration:6000,advanced:true,
    eligible:()=>epicGameplayUnlocked() && !reduceMotion && document.body.classList.contains('star-power') && !ufoBossActive && !superBossActive && Date.now()>=ufoCalmUntil,
    detail:'Star Power is already active. Touch the seeded target quickly.'},
  {id:'system-combo',category:'SYSTEM COMBO',title:'Trigger any System Combo.',goal:1,reward:2,duration:70000,advanced:true,
    eligible:()=>epicGameplayUnlocked(),
    detail:'Combine systems in a way the site recognizes.'},
  {id:'legendary-shot',category:'MASTERY',title:'Hit a flying target with a Legendary shot.',goal:1,reward:2,duration:50000,advanced:true,
    eligible:()=>legendaryGameplayUnlocked() && !reduceMotion,
    detail:'Left click away from UI and let Legendary target acquisition do the rest.'},
  {id:'legendary-double',category:'MASTERY',title:'Land two Legendary shots.',goal:2,reward:3,duration:70000,advanced:true,
    eligible:()=>legendaryGameplayUnlocked() && !reduceMotion,
    detail:'Two successful Legendary projectile collections.'},
  {id:'field-test',category:'LOADOUT',title:'Collect a pickup with a Shop modifier equipped.',goal:1,reward:1,duration:50000,
    eligible:()=>!!shopEquipped && epicGameplayUnlocked() && !reduceMotion,
    detail:'Put the current gameplay modifier to work.'},
  {id:'loadout',category:'LOADOUT',title:'Equip one owned gameplay upgrade.',goal:1,reward:1,duration:45000,
    eligible:()=>!shopEquipped && SHOP_ITEMS.some(item=>item.slot==='gameplay' && shopOwned.has(item.id)),
    detail:'Owned gameplay gear can be swapped freely.'},
  {id:'shop-buy',category:'LOADOUT',title:'Buy one Shop item.',goal:1,reward:2,duration:70000,
    eligible:()=>rupeeDiscovered && SHOP_ITEMS.some(item=>!shopOwned.has(item.id)&&shopItemAvailable(item)&&shopPrice(item)<=rupeeWallet),
    detail:'Purchase any currently affordable item.'},
  {id:'slowmo-test',category:'SYSTEMS',title:'Toggle Slowmo once.',goal:1,reward:1,duration:45000,
    eligible:()=>unlockedAchievements.size>0,
    detail:'Use the Dev Console to change the site timing model.'}
];
const objectiveRuntime={active:null,nextEligibleAt:Date.now()+32000,lastCategory:null,lastFailedId:null,started:false,clockTimer:null,failTimer:null};
function objectiveDef(id){ return OBJECTIVE_DEFS.find(def=>def.id===id)||null; }
function objectiveCompletedIds(){ return new Set(sessionTelemetry.objectives?.completedIds||[]); }
function objectiveDismissedIds(){ return new Set(sessionTelemetry.objectives?.dismissedIds||[]); }
function objectiveCooldownMs(){
  if(easyModeEnabled) return 22000+Math.random()*14000;
  const state=directorRuntime.state;
  if(state==='mastery') return 30000+Math.random()*18000;
  if(state==='engaged') return 34000+Math.random()*22000;
  if(state==='struggling') return 46000+Math.random()*24000;
  if(state==='quiet') return 52000+Math.random()*26000;
  return 44000+Math.random()*26000;
}
function objectiveRemainingMs(active=objectiveRuntime.active){
  if(!active || active.complete || active.failed) return 0;
  return Math.max(0,active.endsAt-Date.now());
}
function objectiveTimeLabel(active=objectiveRuntime.active){
  const seconds=Math.max(0,Math.ceil(objectiveRemainingMs(active)/1000));
  const min=Math.floor(seconds/60), sec=String(seconds%60).padStart(2,'0');
  return `${min}:${sec}`;
}
function objectiveProgressLabel(active=objectiveRuntime.active){
  if(!active) return '';
  return `${Math.min(active.progress,active.goal)} / ${active.goal}`;
}
function objectiveUpdateClockText(){
  const active=objectiveRuntime.active;
  if(!active || active.complete || active.failed) return;
  if(objectiveProgressText) objectiveProgressText.textContent=`${objectiveProgressLabel(active)} // ${objectiveTimeLabel(active)}`;
}
function objectiveClearTimers(){
  if(objectiveRuntime.clockTimer){window.clearInterval(objectiveRuntime.clockTimer);objectiveRuntime.clockTimer=null;}
  if(objectiveRuntime.failTimer){window.clearTimeout(objectiveRuntime.failTimer);objectiveRuntime.failTimer=null;}
}
function objectiveStartTimer(active){
  objectiveClearTimers();
  if(!active || active.complete || active.failed) return;
  const remaining=objectiveRemainingMs(active);
  if(objectiveBar){
    objectiveBar.style.transition='none';
    objectiveBar.style.width='100%';
    void objectiveBar.offsetWidth;
    objectiveBar.style.transition=`width ${Math.max(120,remaining)}ms linear`;
    objectiveBar.style.width='0%';
  }
  objectiveUpdateClockText();
  objectiveRuntime.clockTimer=window.setInterval(objectiveUpdateClockText,200);
  objectiveRuntime.failTimer=window.setTimeout(()=>objectiveFail('time_expired'),remaining+30);
}
function objectiveRender(){
  const active=objectiveRuntime.active;
  if(!objectiveHud) return;
  if(!active){
    objectiveHud.classList.remove('show','complete','failed','attention-muted');
    objectiveHud.setAttribute('aria-hidden','true');
    window.setTimeout(syncObjectiveHudPosition,20);
    return;
  }
  const def=objectiveDef(active.id);
  const complete=!!active.complete, failed=!!active.failed;
  objectiveHud.classList.toggle('complete',complete);
  objectiveHud.classList.toggle('failed',failed);
  objectiveHud.classList.remove('attention-muted');
  objectiveHud.classList.add('show');
  objectiveHud.setAttribute('aria-hidden','false');
  if(objectiveKicker) objectiveKicker.textContent=complete?'OBJECTIVE COMPLETE':failed?'OBJECTIVE FAILED':`OPTIONAL OBJECTIVE // ${def?.category||'SIGNAL'}`;
  if(objectiveTitle) objectiveTitle.textContent=complete?'Signal resolved.':failed?'Time expired.':def?.title||active.id;
  if(objectiveDetail) objectiveDetail.textContent=complete?(active.unlockedWallet?`${active.reward} rupee${active.reward===1?'':'s'} added. Click RUPEES to open the newly discovered Shop.`:`${active.reward} rupee${active.reward===1?'':'s'} added to the wallet.`):failed?'No reward this time. The objective will leave the rotation briefly, then it can return later.':(def?.detail||'Complete it before the timer empties.');
  if(objectiveProgressText) objectiveProgressText.textContent=complete?'COMPLETE':failed?'TIME EXPIRED':`${objectiveProgressLabel(active)} // ${objectiveTimeLabel(active)}`;
  if(objectiveReward) objectiveReward.textContent=failed?'REWARD // MISSED':`REWARD // ${active.reward} RUPEE${active.reward===1?'':'S'}`;
  if(objectiveBar && complete){ objectiveBar.style.transition='none'; objectiveBar.style.width='100%'; }
  if(objectiveBar && failed){ objectiveBar.style.transition='none'; objectiveBar.style.width='0%'; }
  if(objectiveDismiss) objectiveDismiss.hidden=complete||failed;
  syncObjectiveHudPosition();
}
function syncObjectiveHudPosition(){
  if(typeof repositionSystemToasts==='function')requestAnimationFrame(repositionSystemToasts);
  if(!objectiveHud) return;
  if(document.body.classList.contains('hud-unified')){
    const dock=document.querySelector('#site-game-hud');
    const rect=dock?.getBoundingClientRect();
    let aboveDock=rect?Math.ceil(window.innerHeight-rect.top+10):62;
    // Objective placement is independent of Ledger height and stays docked bottom-right.
    objectiveHud.style.bottom=`${Math.max(62,aboveDock)}px`;
    return;
  }
  let bottom=window.innerWidth<=620?58:60;
  const hudVisible=progressHud?.classList.contains('visible');
  if(hudVisible){
    const hudBottom=parseFloat(progressHud.style.bottom)||parseFloat(getComputedStyle(progressHud).bottom)||0;
    const hudHeight=progressHud.offsetHeight||0;
    if(hudHeight>0) bottom=Math.max(bottom,hudBottom+hudHeight+8);
  }else if(ledger?.classList.contains('open')){
    const ledgerBottom=parseFloat(getComputedStyle(ledger).bottom)||0;
    const ledgerHeight=ledger?.offsetHeight||0;
    if(ledgerHeight>0) bottom=Math.max(bottom,ledgerBottom+ledgerHeight+8);
  }
  objectiveHud.style.bottom=`${Math.round(bottom)}px`;
}
function objectiveMarkUnique(field,id){ telemetryUnique('objectives',field,id); }
function objectiveStart(def,{contextual=false}={}){
  if(!def || objectiveRuntime.active) return false;
  const duration=Math.max(5000,Number(def.duration)||60000), now=Date.now();
  const active={id:def.id,category:def.category,goal:def.goal,reward:def.reward,progress:0,startedAt:now,endsAt:now+duration,duration,unique:new Set(),complete:false,failed:false,contextual};
  objectiveRuntime.active=active;
  objectiveRuntime.lastCategory=def.category;
  telemetryCount('objectives','offered');
  telemetryCount('objectives.categoryCounts',def.category);
  objectiveMarkUnique('offeredIds',def.id);
  telemetryMeaningful('objective_offered',{id:def.id,category:def.category,contextual,duration});
  objectiveRender();
  objectiveStartTimer(active);
  objectiveSeedOpportunity(def);
  return true;
}
function objectiveFinish(){
  const active=objectiveRuntime.active;
  if(!active || active.complete || active.failed) return;
  objectiveClearTimers();
  active.complete=true; active.progress=active.goal;
  telemetryCount('objectives','completed');
  telemetryCount('objectives','rupeesEarned',active.reward);
  objectiveMarkUnique('completedIds',active.id);
  active.unlockedWallet=!rupeeDiscovered;
  telemetryMeaningful('objective_completed',{id:active.id,category:active.category,reward:active.reward});
  awardRupees(active.reward,{source:'objective',announce:'silent'});
  consolePrint(`OPTIONAL OBJECTIVE COMPLETE // ${active.id.toUpperCase().replaceAll('-',' ')} // +${active.reward} RUPEE${active.reward===1?'':'S'}`,'good');
  objectiveRender();
  objectiveRuntime.nextEligibleAt=Date.now()+objectiveCooldownMs();
  window.setTimeout(()=>{ if(objectiveRuntime.active===active){ objectiveRuntime.active=null; objectiveRender(); } },3200);
}
function objectiveFail(reason='time_expired'){
  const active=objectiveRuntime.active;
  if(!active || active.complete || active.failed) return;
  objectiveClearTimers();
  active.failed=true;
  objectiveRuntime.lastFailedId=active.id;
  telemetryCount('objectives','failed');
  objectiveMarkUnique('failedIds',active.id);
  telemetryMeaningful('objective_failed',{id:active.id,category:active.category,reason,progress:active.progress,goal:active.goal});
  consolePrint(`OPTIONAL OBJECTIVE FAILED // ${active.id.toUpperCase().replaceAll('-',' ')} // TIME EXPIRED.`,'warn');
  objectiveRender();
  objectiveRuntime.nextEligibleAt=Date.now()+Math.max(24000,objectiveCooldownMs()*.65);
  window.setTimeout(()=>{ if(objectiveRuntime.active===active){ objectiveRuntime.active=null; objectiveRender(); } },2700);
}
function objectiveDismissActive(){
  const active=objectiveRuntime.active;
  if(!active || active.complete || active.failed) return;
  objectiveClearTimers();
  telemetryCount('objectives','dismissed');
  objectiveMarkUnique('dismissedIds',active.id);
  telemetryMeaningful('objective_dismissed',{id:active.id,category:active.category});
  objectiveRuntime.active=null;
  objectiveRuntime.nextEligibleAt=Date.now()+Math.max(45000,objectiveCooldownMs());
  objectiveRender();
}
function objectiveCancel(reason='state_changed'){
  const active=objectiveRuntime.active;
  if(!active || active.complete || active.failed) return;
  objectiveClearTimers();
  telemetryCount('objectives','canceled');
  telemetryMeaningful('objective_canceled',{id:active.id,reason});
  objectiveRuntime.active=null;
  objectiveRuntime.nextEligibleAt=Date.now()+30000;
  objectiveRender();
}
function objectiveEligiblePool(){
  const completed=objectiveCompletedIds(), dismissed=objectiveDismissedIds();
  const state=directorRuntime.state;
  return OBJECTIVE_DEFS.filter(def=>{
    if(completed.has(def.id)||dismissed.has(def.id)) return false;
    if(def.advanced && !['engaged','mastery'].includes(state) && !easyModeEnabled) return false;
    try{return !!def.eligible();}catch(_){return false;}
  });
}
function objectiveChoose(){
  let pool=objectiveEligiblePool();
  if(!pool.length) return null;
  const notFailed=pool.filter(def=>def.id!==objectiveRuntime.lastFailedId);
  if(notFailed.length) pool=notFailed;
  const alternate=pool.filter(def=>def.category!==objectiveRuntime.lastCategory);
  if(alternate.length) pool=alternate;
  const weighted=[];
  pool.forEach(def=>{
    const uses=Number(sessionTelemetry.objectives?.categoryCounts?.[def.category])||0;
    const copies=Math.max(1,3-Math.min(2,uses));
    for(let i=0;i<copies;i++) weighted.push(def);
  });
  return weighted[Math.floor(Math.random()*weighted.length)]||pool[0];
}
function objectiveCanOffer(){
  if(objectiveRuntime.active || Date.now()<objectiveRuntime.nextEligibleAt) return false;
  if(document.visibilityState!=='visible' || directorAttentionBlocked()) return false;
  const metrics=directorMetrics();
  if(!easyModeEnabled && metrics.activeMs<32000) return false;
  return easyModeEnabled || metrics.gameScore>=4 || unlockedAchievements.size>=2;
}
function objectiveMaybeOffer(){
  if(!objectiveCanOffer()) return;
  const def=objectiveChoose();
  if(def) objectiveStart(def);
}
function objectiveTryContextual(id){
  if(objectiveRuntime.active || directorAttentionBlocked()) return false;
  const def=objectiveDef(id);
  if(!def || objectiveCompletedIds().has(id) || objectiveDismissedIds().has(id)) return false;
  try{ if(!def.eligible()) return false; }catch(_){ return false; }
  return objectiveStart(def,{contextual:true});
}
function objectiveSeedOpportunity(def){
  if(!def) return;
  const trySeed=(attempt=0)=>{
    const active=objectiveRuntime.active;
    if(!active || active.id!==def.id || active.complete || active.failed) return;
    if(directorAttentionBlocked()){
      if(attempt<8) window.setTimeout(()=>trySeed(attempt+1),1100);
      return;
    }
    if(['pickup-catch','pickup-double','pickup-variety','field-test','legendary-shot','legendary-double'].includes(def.id)){
      if(!document.querySelector('.game-pickup,.doug-bone,.shooting-star')) spawnGamePickup(null,true);
    }else if(def.id==='heart-signal'){
      if(!document.querySelector('.game-pickup[data-kind="heart"]')) spawnGamePickup('heart',true);
    }else if(def.id==='rupee-hunt'){
      if(!document.querySelector('.game-pickup[data-kind="rupee"]')) spawnGamePickup('rupee',true);
    }else if(['airspace','airspace-one','contact-damage'].includes(def.id)){
      if(!document.querySelector('.galaga-secret') && !ufoBossActive && !superBossActive) spawnGalaga(true);
    }else if(def.id==='bone-run'){
      if(!document.querySelector('.doug-bone')) spawnDougBone(true);
    }else if(def.id==='castle-check' && castleQuestActive && !activeCastle){
      spawnCastle();
    }
  };
  window.setTimeout(()=>trySeed(),def.id==='contact-damage'?220:900);
  if(['pickup-double','pickup-variety','legendary-double','airspace','bone-run'].includes(def.id)){
    window.setTimeout(()=>trySeed(),Math.min(18000,Math.max(7000,(Number(def.duration)||60000)*.28)));
  }
}
function objectiveIncrement(amount=1){
  const active=objectiveRuntime.active;
  if(!active || active.complete || active.failed) return;
  active.progress=Math.min(active.goal,active.progress+amount);
  objectiveRender();
  objectiveUpdateClockText();
  if(active.progress>=active.goal) objectiveFinish();
}
function objectiveHandleEvent(type,detail={}){
  if(type==='star_power' && !objectiveRuntime.active) window.setTimeout(()=>objectiveTryContextual('contact-damage'),80);
  const active=objectiveRuntime.active;
  if(!active || active.complete || active.failed || type.startsWith('objective_')) return;
  const friendly=OBJECTIVE_FRIENDLY_KINDS.has(detail.kind);
  switch(active.id){
    case 'signal-sweep': if(type==='achievement_unlocked') objectiveIncrement(); break;
    case 'field-trip': if(type==='section_first_visit' && OBJECTIVE_SECTION_IDS.includes(detail.id) && !active.unique.has(detail.id)){ active.unique.add(detail.id); objectiveIncrement(); } break;
    case 'inspection': if(type==='inspect_target') objectiveIncrement(); break;
    case 'command-line': if(type==='console_command' && detail.valid) objectiveIncrement(); break;
    case 'theme-shift': if(type==='theme_changed') objectiveIncrement(); break;
    case 'pickup-catch': if(type==='flying_collected' && friendly) objectiveIncrement(); break;
    case 'pickup-double': if(type==='flying_collected' && friendly) objectiveIncrement(); break;
    case 'pickup-variety': if(type==='flying_collected' && friendly && !active.unique.has(detail.kind)){ active.unique.add(detail.kind); objectiveIncrement(); } break;
    case 'heart-signal': if(type==='heart_collected') objectiveIncrement(); break;
    case 'rupee-hunt': if(type==='flying_collected' && detail.kind==='rupee') objectiveIncrement(); break;
    case 'bone-run': if(type==='flying_collected' && detail.kind==='bone') objectiveIncrement(); break;
    case 'doug-pet': if(type==='doug_pet') objectiveIncrement(); break;
    case 'castle-check': if(type==='castle_checked') objectiveIncrement(); break;
    case 'airspace-one': if(type==='flying_collected' && detail.kind==='ufo') objectiveIncrement(); break;
    case 'airspace': if(type==='flying_collected' && detail.kind==='ufo') objectiveIncrement(); break;
    case 'contact-damage': if(type==='flying_collected' && detail.kind==='ufo' && detail.method==='star_power') objectiveIncrement(); break;
    case 'system-combo': if(type==='system_combo') objectiveIncrement(); break;
    case 'legendary-shot': if(type==='flying_collected' && detail.method==='legendary') objectiveIncrement(); break;
    case 'legendary-double': if(type==='flying_collected' && detail.method==='legendary') objectiveIncrement(); break;
    case 'field-test': if(type==='flying_collected' && friendly && !!shopEquipped) objectiveIncrement(); break;
    case 'loadout': if(type==='shop_equip') objectiveIncrement(); break;
    case 'shop-buy': if(type==='shop_purchase') objectiveIncrement(); break;
    case 'slowmo-test': if(type==='slowmo') objectiveIncrement(); break;
  }
}
function objectiveTick(){
  const active=objectiveRuntime.active;
  if(active && !active.complete && !active.failed && objectiveRemainingMs(active)<=0) objectiveFail('time_expired');
  objectiveMaybeOffer();
}
function startDynamicObjectives(){
  if(objectiveRuntime.started) return;
  objectiveRuntime.started=true;
  objectiveEventSink=objectiveHandleEvent;
  objectiveDismiss?.addEventListener('click',objectiveDismissActive);
  window.addEventListener('resize',syncObjectiveHudPosition,{passive:true});
  window.setTimeout(objectiveMaybeOffer,9000);
  window.setInterval(objectiveTick,2000);
}
Object.defineProperty(window,'__MIPPI_OBJECTIVES__',{
  value:Object.freeze({snapshot:()=>({active:objectiveRuntime.active?{id:objectiveRuntime.active.id,category:objectiveRuntime.active.category,progress:objectiveRuntime.active.progress,goal:objectiveRuntime.active.goal,reward:objectiveRuntime.active.reward,complete:objectiveRuntime.active.complete,failed:objectiveRuntime.active.failed,remainingMs:objectiveRemainingMs(objectiveRuntime.active)}:null,nextEligibleAt:objectiveRuntime.nextEligibleAt,poolSize:OBJECTIVE_DEFS.length,telemetry:JSON.parse(JSON.stringify(sessionTelemetry.objectives||{}))})}),
  enumerable:false,configurable:false
});
startDynamicObjectives();

const WISH_KEY = 'mippiWishUnlocked';
const WISH_VALID_KEY = 'mippiWishHasIsValid';
const COMPILE_STUCK_KEY = 'mippiCompileStuck';
let wishHasIsValid = false;
try { wishHasIsValid = sessionStorage.getItem(WISH_VALID_KEY) === '1'; } catch (_) {}

const blueprintPopup = document.querySelector('#blueprint-popup');
const blueprintClose = document.querySelector('#blueprint-close');
const blueprintAddValid = document.querySelector('#blueprint-add-valid');
const blueprintStage = document.querySelector('#blueprint-stage');
const blueprintStatus = document.querySelector('#blueprint-status');
const bpWireDirect = document.querySelector('.bp-wire-direct');
const bpWireValidA = document.querySelector('.bp-wire-valid-a');
const bpWireValidB = document.querySelector('.bp-wire-valid-b');
const bpEventExecOut = document.querySelector('#bp-event-exec-out');
const bpValidExecIn = document.querySelector('#bp-valid-exec-in');
const bpValidExecOut = document.querySelector('#bp-valid-exec-out');
const bpGrantExecIn = document.querySelector('#bp-grant-exec-in');
const wishContactPopup = document.querySelector('#wish-contact-popup');
const wishContactClose = document.querySelector('#wish-contact-close');
const blenderPopup = document.querySelector('#blender-popup');
const blenderStatus = document.querySelector('#blender-status');
const blenderBar = document.querySelector('#blender-bar');
const blenderPercent = document.querySelector('#blender-percent');
const blenderOk = document.querySelector('#blender-ok');
const halOverlay = document.querySelector('#hal-overlay');
let blenderTimer = null;
const compilePopup = document.querySelector('#compile-popup');
const compileCancel = document.querySelector('#compile-cancel');
const compileTitle = document.querySelector('#compile-title');
const compileBar = document.querySelector('#compile-bar');
const compilePercentLabel = document.querySelector('#compile-percent');

function jumpTo(id){ document.getElementById(id)?.scrollIntoView({behavior:'smooth'}); }
function ensureStatOverlay(){
  if (!statOverlay) { statOverlay=document.createElement('div'); statOverlay.className='fps-stat'; statOverlay.id='fps-stat'; document.body.appendChild(statOverlay); }
  return statOverlay;
}
function stopRealFpsSampler(){
  if(statFpsRaf!=null){cancelAnimationFrame(statFpsRaf);statFpsRaf=null;}
  statFpsFrames=0;statFpsWindowStart=0;
}
function startRealFpsSampler(){
  stopRealFpsSampler();
  if(typeof requestAnimationFrame!=='function')return false;
  const frame=now=>{
    if(statMode!=='fps'){statFpsRaf=null;return;}
    if(!statFpsWindowStart)statFpsWindowStart=now;
    statFpsFrames++;
    const elapsed=now-statFpsWindowStart;
    if(elapsed>=500){
      const measured=statFpsFrames*1000/elapsed;
      if(Number.isFinite(measured)&&measured>0){statFpsMeasured=measured;statFpsMeasuredAt=performance.now();}
      statFpsFrames=0;statFpsWindowStart=now;
    }
    statFpsRaf=requestAnimationFrame(frame);
  };
  statFpsRaf=requestAnimationFrame(frame);return true;
}
function setStatMode(mode){
  const el=ensureStatOverlay();
  window.clearInterval(statTimer);stopRealFpsSampler();
  statMode=mode;
  if(!mode){el.classList.remove('show');return;}
  el.classList.add('show');
  if(mode==='fps')startRealFpsSampler();
  const tick=()=>{
    if(statMode==='fps'){
      const recent=statFpsMeasured!=null&&(performance.now()-statFpsMeasuredAt)<1600;
      const fps=recent?statFpsMeasured:(58+Math.random()*4);
      el.textContent=`${fps.toFixed(1)} FPS\nSTAT FPS${recent?' // LIVE':' // EST'}`;
    }else{
      const frame=(15.6+Math.random()*2.2).toFixed(2);
      const game=(3.7+Math.random()*1.9).toFixed(2);
      const draw=(5.1+Math.random()*2.1).toFixed(2);
      const gpu=(10.8+Math.random()*3.1).toFixed(2);
      const rhi=(1.0+Math.random()*1.1).toFixed(2);
      el.textContent=`Frame  ${frame} ms\nGame   ${game} ms\nDraw   ${draw} ms\nGPU    ${gpu} ms\nRHIT   ${rhi} ms\nMorale ${dougBoneCount} bone${dougBoneCount===1?'':'s'}\nSTAT UNIT`;
    }
  };
  tick();statTimer=window.setInterval(tick,180);
}

function randomLine(lines){ return lines[Math.floor(Math.random()*lines.length)]; }
function hasWish(){ try{return localStorage.getItem(WISH_KEY)==='1';}catch(_){return false;} }
function hasWishCharge(){ return wishCharge>0; }
let wishBlueprintErrorActive=(Number(sessionTelemetry.wish?.failed)||0)>0 && !wishHasIsValid;
function consoleAttentionState(){
  if(devConsole?.classList.contains('open')) return null;
  if(wishBlueprintErrorActive && !wishHasIsValid){
    return {kind:'blueprint',label:'FIX WISH // ~ DEV CONSOLE',title:'The Wish runtime has a broken Blueprint reference. Open the Dev Console to continue the repair path.'};
  }
  if(hasWishCharge()){
    return {kind:'wish',label:'WISH READY // ~ DEV CONSOLE',title:wishHasIsValid?'A Shooting Star is charged. Open the Dev Console and make a wish.':'A Shooting Star is charged. Open the Dev Console to begin the Wish path.'};
  }
  return null;
}
function updateConsoleHelpCommandVisuals(){
  document.querySelectorAll('.console-wish-command').forEach(el=>{
    el.classList.toggle('console-wish-ready',hasWishCharge());
    el.title=hasWishCharge()?'Celestial charge ready // run wish': 'Run: wish';
  });
  document.querySelectorAll('[data-console-command="blueprint"]').forEach(el=>{
    el.classList.toggle('console-blueprint-error',wishBlueprintErrorActive&&!wishHasIsValid);
    el.title=(wishBlueprintErrorActive&&!wishHasIsValid)?'REPAIR REQUIRED // open BP_WishManager':'Run: blueprint';
  });
}
function updateConsoleWishGuide(){
  const guide=document.getElementById('console-wish-guide');
  const copy=document.getElementById('console-wish-guide-text');
  const action=document.getElementById('console-wish-guide-action');
  if(!guide||!copy||!action)return;
  const repair=wishBlueprintErrorActive&&!wishHasIsValid;
  const charged=hasWishCharge();
  guide.hidden=!(repair||charged)||consolePending==='wish';
  if(guide.hidden)return;
  guide.classList.toggle('repair-needed',repair);
  copy.textContent=repair
    ?'WISH RUNTIME ERROR // BP_WishManager needs a repair before the wish can be granted.'
    :'CELESTIAL CHARGE 1/1 // The console recognizes a new command. Try your wish.';
  const command=repair?'blueprint':'wish';
  action.textContent=repair?'OPEN BLUEPRINT ↗':'TRY WISH →';
  action.dataset.command=command;
  action.title=repair?'Open BP_WishManager to inspect the error':'Run the wish command';
}
function updateConsoleAttention(){
  const state=consoleAttentionState();
  if(consoleTipButton){
    consoleTipButton.classList.toggle('attention-ready',!!state);
    consoleTipButton.classList.toggle('attention-wish',state?.kind==='wish');
    consoleTipButton.classList.toggle('attention-blueprint',state?.kind==='blueprint');
    consoleTipButton.textContent=state?.label||'TIP // ~ DEV CONSOLE';
    consoleTipButton.title=state?.title||'Press ~ to open the Dev Console.';
    consoleTipButton.setAttribute('aria-label',state?.title||'Open developer console');
    consoleTipButton.dataset.wishCue=state?.kind==='wish'?'WISH READY':state?.kind==='blueprint'?'BLUEPRINT ERROR':'';
  }
  updateConsoleHelpCommandVisuals();
  updateConsoleWishGuide();
}
function scheduleWishShootingStar(){
  window.setTimeout(()=>{
    if(hasWishCharge() || document.querySelector('.shooting-star')) return;
    spawnShootingStar(true);
    consolePrint('CELESTIAL RESPONSE // Shooting Star inbound.','good');
  },1500);
}
function consolePrintAction(label,onClick,{className=''}={}){
  if(!consoleOutput) return null;
  const line=document.createElement('div');
  line.className=`console-line console-action-line ${className}`.trim();
  const button=document.createElement('button');
  button.type='button'; button.className='console-inline-action'; button.textContent=label;
  button.addEventListener('click',onClick);
  line.appendChild(button); consoleOutput.appendChild(line); consoleOutput.scrollTop=consoleOutput.scrollHeight;
  return button;
}
function consolePrintCommandGroup(label,commands){
  if(!consoleOutput)return;
  const line=document.createElement('div');line.className='console-line console-help-line';
  const prefix=document.createElement('span');prefix.className='console-help-category';prefix.textContent=String(label).padEnd(9,' ');line.appendChild(prefix);
  commands.forEach((command,index)=>{
    if(index)line.appendChild(document.createTextNode(' · '));
    const button=document.createElement('button');button.type='button';button.className='console-help-command';button.dataset.consoleCommand=command;button.textContent=command;
    if(command==='wish')button.classList.add('console-wish-command',...(hasWishCharge()?['console-wish-ready']:[]));
    if(command==='blueprint'&&wishBlueprintErrorActive)button.classList.add('console-blueprint-error');
    button.title=`Run: ${command}`;line.appendChild(button);
  });
  consoleOutput.appendChild(line);consoleOutput.scrollTop=consoleOutput.scrollHeight;
  return line;
}
function consolePrintUnrealCommands(){
  consolePrintCommandGroup('UNREAL',['stat fps','stat unit','stat none','blueprint','compile','slowmo','easy mode','lumen','nanite']);
}

function updateWishCommandVisuals(){ updateConsoleHelpCommandVisuals(); }
function persistWishCharge(){ try{localStorage.setItem(WISH_CHARGE_KEY,String(wishCharge));}catch(_){} updateWishCommandVisuals(); updateConsoleAttention(); updateMetaTrace(); renderLedger(); syncProgressHudPosition(); }
function grantWishCharge(source='CELESTIAL SIGNAL'){
  const firstCommand=!hasWish();
  const alreadyCharged=hasWishCharge();
  if(firstCommand){
    try{localStorage.setItem(WISH_KEY,'1');}catch(_){}
    telemetryCount('wish','commandUnlocks'); telemetryMeaningful('wish_command_unlocked');
  }
  wishCharge=1; persistWishCharge();
  if(firstCommand){
    showTransientToast('SECRET COMMAND UNLOCKED','The console now understands: wish. One Shooting Star powers one validated wish.',source);
    consolePrint('WISH COMMAND UNLOCKED // celestial charge 1/1.','good');
  }else if(alreadyCharged){
    showTransientToast('CELESTIAL SIGNAL','Wish charge is already full. The star was still worth catching.','WISH // CHARGE 1/1');
    consolePrint('WISH // celestial charge already full.','good');
  }else{
    showTransientToast('WISH RECHARGED','One Shooting Star. One wish. The console is ready.','CELESTIAL CHARGE // 1/1');
    consolePrint('WISH RECHARGED // celestial charge 1/1.','good');
  }
  return firstCommand;
}
function unlockWishCommand(source='CELESTIAL SIGNAL'){ return grantWishCharge(source); }
function consumeWishCharge(){
  if(wishCharge<=0) return false;
  wishCharge=0; persistWishCharge();
  telemetryCount('wish','chargesSpent'); telemetryMeaningful('wish_charge_spent');
  return true;
}
function nextCheat(){
  telemetryCount('achievements','cheats');
  telemetryCount('assistance','cheatUses');
  telemetryMeaningful('cheat_requested');
  const key=getNextUnachievedKey();
  if(key){
    const i=ACHIEVEMENT_KEYS.indexOf(key)+1,a=ACHIEVEMENTS[key];
    consolePrint(`CHEAT // ${String(i).padStart(2,'0')} ${a.title}`,'good');
    consolePrint(a.solution);return;
  }
  if(postgameRevealed){
    const epicKey=POSTGAME_EPIC_KEYS.find(k=>!unlockedPostgameAchievements.has(k));
    if(epicKey){
      const i=11+POSTGAME_EPIC_KEYS.indexOf(epicKey),a=POSTGAME_ACHIEVEMENTS[epicKey];
      consolePrint(`CHEAT // ${String(i).padStart(2,'0')} ${a.title} // EPIC`,'good');
      consolePrint(a.solution);return;
    }
    return consolePrint('CHEAT // All non-Legendary achievements are complete. The Legendary capstone does not accept walkthrough assistance.','good');
  }
  consolePrint('CHEAT // All currently revealed achievements are complete. You have become the walkthrough.','good');
}

function setSlowmo(active){
  if(slowmoEnabled!==active){
    telemetryCount('modes','slowmoToggles');
    telemetryMeaningful('slowmo',{active});
  }
  slowmoEnabled=active;
  document.body.classList.toggle('slowmo-mode',active);
  document.querySelectorAll('.shooting-star,.galaga-secret,.game-pickup,.doug-bone').forEach(el=>{
    const base=Number(el.dataset.baseDuration||0);
    if(base>0) el.style.setProperty('--dur',`${base*directorFlightMultiplier()*(shopHasEquipped('slowpoke')?1.35:1)*(active?2:1)}s`);
  });
}
function setFlightDuration(el, seconds){
  el.dataset.baseDuration=String(seconds);
  el.style.setProperty('--dur',`${seconds*directorFlightMultiplier()*(shopHasEquipped('slowpoke')?1.35:1)*(slowmoEnabled?2:1)}s`);
}
function removeWhenFlightEnds(el){
  // Let the animation own lifetime. Fixed removal timers caused SLOWMO actors
  // to disappear halfway through their route after duration was doubled.
  el.addEventListener('animationend',()=>{
    if(el.isConnected && el.dataset.telemetryKind) telemetryFlyingMiss(el.dataset.telemetryKind);
    el.remove();
  },{once:true});
}

function registerNaniteScene(scene, THREE){
  const entries=[];
  scene.traverse(obj=>{
    if(!obj?.isMesh || !obj.geometry?.getAttribute?.('position') || Array.isArray(obj.material) || obj.material?.map || obj.material?.userData?.skipNanite) return;
    const originalGeometry=obj.geometry, originalMaterial=obj.material;
    const geometry=originalGeometry.index ? originalGeometry.toNonIndexed() : originalGeometry.clone();
    const pos=geometry.getAttribute('position');
    const colors=new Float32Array(pos.count*3);
    const palette=[0xff4f9a,0x35a7ff,0x67e8ff,0xa868ff,0xffd166,0x65d46e,0xff7a59,0xe5f1ff];
    for(let i=0;i<pos.count;i+=3){
      const c=new THREE.Color(palette[Math.floor(Math.random()*palette.length)]);
      for(let v=0;v<3 && i+v<pos.count;v++){ const n=(i+v)*3; colors[n]=c.r; colors[n+1]=c.g; colors[n+2]=c.b; }
    }
    geometry.setAttribute('color',new THREE.BufferAttribute(colors,3));
    const material=new THREE.MeshBasicMaterial({vertexColors:true,side:THREE.DoubleSide,transparent:originalMaterial?.transparent||false,opacity:originalMaterial?.opacity??1});
    entries.push({obj,originalGeometry,originalMaterial,geometry,material});
  });
  const apply=active=>entries.forEach(e=>{ e.obj.geometry=active?e.geometry:e.originalGeometry; e.obj.material=active?e.material:e.originalMaterial; });
  naniteControllers.push(apply); apply(naniteEnabled);
}
function setNanite(active){ if(naniteEnabled!==active) telemetryCount('modes','naniteToggles'); naniteEnabled=active; document.body.classList.toggle('nanite-mode',active); naniteControllers.forEach(fn=>fn(active)); }

function ensureLumenLayer(){
  if(lumenLayer) return lumenLayer;
  lumenLayer=document.createElement('div'); lumenLayer.className='lumen-artifacts'; lumenLayer.setAttribute('aria-hidden','true');
  for(let i=0;i<22;i++){
    const blob=document.createElement('i');
    blob.className=`lumen-blob ${i%2?'light':'dark'}`;
    blob.style.left=`${-10+Math.random()*105}%`; blob.style.top=`${-12+Math.random()*110}%`;
    blob.style.width=`${180+Math.random()*430}px`; blob.style.height=`${145+Math.random()*360}px`;
    blob.style.setProperty('--lumen-delay',`${Math.random()*-15}s`); blob.style.setProperty('--lumen-dur',`${3.2+Math.random()*9}s`);
    lumenLayer.appendChild(blob);
  }
  document.body.appendChild(lumenLayer); return lumenLayer;
}
function clearLumenRandomness(){ lumenRandomTimers.forEach(id=>window.clearTimeout(id)); lumenRandomTimers.clear(); }
function scheduleLumenRandomCut(blob){
  if(!lumenEnabled||!blob?.isConnected) return;
  const wait=450+Math.random()*3100;
  const timer=window.setTimeout(()=>{
    lumenRandomTimers.delete(timer);
    if(!lumenEnabled)return;
    blob.classList.toggle('lumen-cut',Math.random()>.42);
    if(Math.random()<.28) blob.classList.toggle('lumen-hot',true); else blob.classList.remove('lumen-hot');
    scheduleLumenRandomCut(blob);
  },wait);
  lumenRandomTimers.add(timer);
}
function showLightingRebuildWarning(){
  let warning=document.querySelector('.lighting-rebuild-warning');
  if(!warning){warning=document.createElement('div');warning.className='lighting-rebuild-warning';warning.textContent='LIGHTING MUST BE REBUILT';document.body.appendChild(warning);}
  warning.classList.remove('show');void warning.offsetWidth;warning.classList.add('show');
  window.clearTimeout(lightingWarningTimer);lightingWarningTimer=window.setTimeout(()=>warning.classList.remove('show'),4200);
}
function setLumen(active){
  const was=lumenEnabled;
  if(lumenEnabled!==active) telemetryCount('modes','lumenToggles');
  lumenEnabled=active;
  const layer=ensureLumenLayer(); layer.classList.toggle('active',active); document.body.classList.toggle('lumen-mode',active);
  clearLumenRandomness();
  layer.querySelectorAll('.lumen-blob').forEach(blob=>{blob.classList.remove('lumen-cut','lumen-hot');if(active)scheduleLumenRandomCut(blob);});
  if(was && !active) showLightingRebuildWarning();
}

const vibeLines=[
  'AI MODE // making it more scalable',
  'AI MODE // confidently renaming a variable',
  'AI MODE // adding one tiny dependency',
  'AI MODE // fixed the bug, probably',
  'AI MODE // context window still holding',
  'AI MODE // generating tasteful particles',
  'AI MODE // TODO converted into architecture',
  'AI MODE // 93% confidence, comprehension pending',
  'AI MODE // reading the whole file this time',
  'AI MODE // one more refactor before shipping',
  'AI MODE // hallucination budget within tolerance',
  'AI MODE // found three bugs, introduced four',
  'AI MODE // naming things is still the hardest problem',
  'AI MODE // Gipiti says this was not in the estimate',
  'AI MODE // asking whether this needs another system',
  'AI MODE // token economy stable, actual economy unclear'
];
function ensureVibeAgent(){
  if(vibeAgent) return vibeAgent;
  vibeAgent=document.createElement('div'); vibeAgent.className='vibe-agent'; vibeAgent.innerHTML='<i></i><span>AI MODE // ONLINE</span>'; document.body.appendChild(vibeAgent); return vibeAgent;
}
function setVibe(active){
  if(vibeEnabled!==active) telemetryCount('modes','vibeToggles');
  vibeEnabled=active; document.body.classList.toggle('vibe-mode',active); const agent=ensureVibeAgent(); agent.classList.toggle('active',active); window.clearInterval(vibeTimer);
  if(active){
    let i=0; agent.querySelector('span').textContent=vibeLines[i];
    vibeTimer=window.setInterval(()=>{ i=(i+1)%vibeLines.length; agent.querySelector('span').textContent=vibeLines[i]; },2600);
  }
}

function blueprintPinPoint(pin){
  if(!blueprintStage || !pin) return null;
  const stageRect=blueprintStage.getBoundingClientRect();
  const pinRect=pin.getBoundingClientRect();
  return { x:pinRect.left-stageRect.left+(pinRect.width/2), y:pinRect.top-stageRect.top+(pinRect.height/2) };
}
function blueprintSpline(from,to){
  if(!from || !to) return '';
  const distance=Math.max(45,Math.abs(to.x-from.x)*0.46);
  return `M ${from.x.toFixed(1)} ${from.y.toFixed(1)} C ${(from.x+distance).toFixed(1)} ${from.y.toFixed(1)}, ${(to.x-distance).toFixed(1)} ${to.y.toFixed(1)}, ${to.x.toFixed(1)} ${to.y.toFixed(1)}`;
}
function updateBlueprintWires(){
  if(!blueprintStage || !blueprintPopup?.classList.contains('open')) return;
  const svg=blueprintStage.querySelector('.bp-wires');
  const r=blueprintStage.getBoundingClientRect();
  if(svg) svg.setAttribute('viewBox',`0 0 ${Math.max(1,r.width)} ${Math.max(1,r.height)}`);
  const eventOut=blueprintPinPoint(bpEventExecOut);
  const validIn=blueprintPinPoint(bpValidExecIn);
  const validOut=blueprintPinPoint(bpValidExecOut);
  const grantIn=blueprintPinPoint(bpGrantExecIn);
  if(bpWireDirect) bpWireDirect.setAttribute('d',blueprintSpline(eventOut,grantIn));
  if(wishHasIsValid){
    if(bpWireValidA) bpWireValidA.setAttribute('d',blueprintSpline(eventOut,validIn));
    if(bpWireValidB) bpWireValidB.setAttribute('d',blueprintSpline(validOut,grantIn));
  }
}
function updateBlueprintState(){
  blueprintStage?.classList.toggle('validated',wishHasIsValid);
  if(blueprintStatus) blueprintStatus.textContent=wishHasIsValid ? 'GRAPH STATUS // WISH REFERENCE VALIDATED' : 'GRAPH STATUS // 1 POSSIBLE RUNTIME ERROR // CLICK + TO INSERT Is Valid';
  const hint=document.querySelector('#blueprint-add-hint');
  if(hint) hint.setAttribute('aria-hidden',wishHasIsValid?'true':'false');
  requestAnimationFrame(updateBlueprintWires);
}
function openBlueprint(){
  telemetryCount('wish','blueprintOpens');
  telemetryMeaningful('blueprint_opened');
  blueprintPopup?.classList.add('open'); blueprintPopup?.setAttribute('aria-hidden','false');
  updateBlueprintState();
  requestAnimationFrame(()=>requestAnimationFrame(updateBlueprintWires));
}
function closeBlueprint(){ blueprintPopup?.classList.remove('open'); blueprintPopup?.setAttribute('aria-hidden','true'); }
blueprintClose?.addEventListener('click',closeBlueprint);
blueprintPopup?.addEventListener('click',e=>{ if(e.target===blueprintPopup) closeBlueprint(); });
blueprintAddValid?.addEventListener('click',()=>{
  if(!wishHasIsValid){
    telemetryCount('wish','validInserted');
    telemetryMeaningful('blueprint_validated');
  }
  wishHasIsValid=true; wishBlueprintErrorActive=false;
  try{sessionStorage.setItem(WISH_VALID_KEY,'1')}catch(_){} updateBlueprintState(); updateConsoleAttention();
  window.setTimeout(updateBlueprintWires,40);
  consolePrint('Blueprint graph updated: Is Valid inserted between Wish Event and Grant Wish.','good');
});
window.addEventListener('resize',()=>{ if(blueprintPopup?.classList.contains('open')) updateBlueprintWires(); });

// Compile command runtime state. Previously missing entirely, so executing
// `compile` threw a ReferenceError before the popup could become visible.
let compileTimer=null,compileErrorTimer=null,compileCloseTimer=null;
let compileRapidTimers=[];
let compileCount=639427,compilePercent=0;
function renderCompileState(){
  if(compileTitle) compileTitle.textContent=`Compiling Shaders (${Math.max(0,Math.round(compileCount)).toLocaleString('en-US')})`;
  if(compileBar) compileBar.style.width=`${compilePercent}%`;
  if(compilePercentLabel) compilePercentLabel.textContent=`${compilePercent}%`;
}
function clearCompileTimers(){
  window.clearInterval(compileTimer); compileTimer=null;
  compileRapidTimers.forEach(clearTimeout); compileRapidTimers=[];
  window.clearTimeout(compileErrorTimer); compileErrorTimer=null;
  window.clearTimeout(compileCloseTimer); compileCloseTimer=null;
}
function closeCompilePopup(){
  clearCompileTimers();
  compilePopup?.classList.remove('open','compile-error');
  compilePopup?.setAttribute('aria-hidden','true');
}
function failCompileAfterPause(){
  window.clearTimeout(compileErrorTimer);
  compileErrorTimer=window.setTimeout(()=>{
    if(!compilePopup?.classList.contains('open')) return;
    compilePopup.classList.add('compile-error');
    if(compileTitle) compileTitle.textContent='Shader Compile Failed';
    if(compilePercentLabel) compilePercentLabel.textContent='ERROR';
    if(compileBar) compileBar.style.width='74%';
    consolePrint('SHADER COMPILE ERROR // 874 jobs remain. The editor has elected to stop pretending.','warn');
    compileCloseTimer=window.setTimeout(closeCompilePopup,950);
  },4000);
}
function startRapidCompileDrop(){
  window.clearInterval(compileTimer); compileTimer=null;
  compilePercent=74; renderCompileState();
  const counts=[410220,171044,58920,14870,3260,874];
  counts.forEach((n,i)=>compileRapidTimers.push(window.setTimeout(()=>{
    compileCount=n;
    renderCompileState();
    if(i===counts.length-1) failCompileAfterPause();
  },i*170)));
}
function openCompile(){
  clearCompileTimers();
  compilePopup?.classList.remove('compile-error');
  compileCount=639427; compilePercent=0;
  renderCompileState();
  compilePopup?.classList.add('open'); compilePopup?.setAttribute('aria-hidden','false');
  compileTimer=window.setInterval(()=>{
    compileCount-=1+Math.floor(Math.random()*3);
    compilePercent=Math.min(3,Math.floor((639427-compileCount)/44));
    renderCompileState();
    if(compileCount<639300) startRapidCompileDrop();
  },420);
}
function cancelCompile(){
  if(compilePopup?.classList.contains('open')) consolePrint('SHADER COMPILE // cancelled before production found out.','warn');
  closeCompilePopup();
}
compileCancel?.addEventListener('click',cancelCompile);

function playWishSuccess(){
  document.body.classList.add('wish-granted');
  const cx=window.innerWidth/2, cy=window.innerHeight/2;
  if(typeof explodeAt==='function') explodeAt(cx,cy,48);
  window.setTimeout(()=>document.body.classList.remove('wish-granted'),4200);
}
function openWishContact(){ wishContactPopup?.classList.add('open'); wishContactPopup?.setAttribute('aria-hidden','false'); }
function closeWishContact(){ wishContactPopup?.classList.remove('open'); wishContactPopup?.setAttribute('aria-hidden','true'); }
wishContactClose?.addEventListener('click',closeWishContact);
wishContactPopup?.addEventListener('click',e=>{ if(e.target===wishContactPopup) closeWishContact(); });

function startBlenderUninstall(){
  window.clearInterval(blenderTimer);
  let progress=0;
  if(blenderBar) blenderBar.style.width='0%';
  if(blenderPercent) blenderPercent.textContent='0%';
  if(blenderStatus) blenderStatus.textContent='Locating installations...';
  if(blenderOk){ blenderOk.disabled=true; blenderOk.classList.remove('ready'); }
  blenderPopup?.classList.add('open'); blenderPopup?.setAttribute('aria-hidden','false');
  blenderTimer=window.setInterval(()=>{
    progress=Math.min(100,progress+4+Math.floor(Math.random()*9));
    if(blenderBar) blenderBar.style.width=`${progress}%`;
    if(blenderPercent) blenderPercent.textContent=`${progress}%`;
    if(blenderStatus){
      blenderStatus.textContent=progress<28?'Finding Blender installations...':progress<72?'Removing Blender from local reality...':progress<100?'Cleaning orphaned .blend files...':'Uninstall Complete';
    }
    if(progress>=100){
      window.clearInterval(blenderTimer); blenderTimer=null;
      if(blenderOk){ blenderOk.disabled=false; blenderOk.classList.add('ready'); }
    }
  },55);
}
function closeBlenderPopup(){ window.clearInterval(blenderTimer); blenderTimer=null; blenderPopup?.classList.remove('open'); blenderPopup?.setAttribute('aria-hidden','true'); }
blenderOk?.addEventListener('click',()=>{ if(!blenderOk.disabled) closeBlenderPopup(); });

function showHalEye(){
  if(!halOverlay) return;
  halOverlay.classList.remove('show'); void halOverlay.offsetWidth; halOverlay.classList.add('show');
  window.setTimeout(()=>halOverlay.classList.remove('show'),3000);
}

function burstMoneyFromConsole(){
  const consoleRect=devConsole?.getBoundingClientRect();
  const hasConsole=consoleRect && consoleRect.width && consoleRect.height;
  const originY=hasConsole ? consoleRect.top+Math.min(96,consoleRect.height*.28) : window.innerHeight*.70;
  const left=hasConsole ? consoleRect.left : window.innerWidth*.18;
  const width=hasConsole ? consoleRect.width : window.innerWidth*.64;
  const center=left+width*.5;
  const count=76;
  for(let i=0;i<count;i++){
    const coin=document.createElement('i');
    coin.className='money-coin';
    // Start inside the console silhouette, then deliberately throw each coin beyond an edge
    // so the gag reads even though the console correctly renders in front of the effect.
    const x=left+width*(.18+Math.random()*.64);
    const dir=x<center?-1:1;
    const clearDistance=(width*.40)+(140+Math.random()*330);
    const midX=dir*clearDistance+(Math.random()-.5)*150;
    const endX=midX+dir*(80+Math.random()*260)+(Math.random()-.5)*100;
    const rise=-(150+Math.random()*300);
    const fall=Math.max(360,window.innerHeight-originY+190+Math.random()*280);
    const duration=(1.9+Math.random()*1.4).toFixed(2)+'s';
    const delay=(Math.random()*.28).toFixed(2)+'s';
    const spinMid=((Math.random()>.5?1:-1)*(260+Math.random()*720)).toFixed(0)+'deg';
    const spinEnd=((Math.random()>.5?1:-1)*(980+Math.random()*1900)).toFixed(0)+'deg';
    const size=26+Math.random()*16;
    coin.style.setProperty('--coin-x',`${x}px`);
    coin.style.setProperty('--coin-y',`${originY}px`);
    coin.style.setProperty('--coin-mid-x',`${midX}px`);
    coin.style.setProperty('--coin-end-x',`${endX}px`);
    coin.style.setProperty('--coin-rise',`${rise}px`);
    coin.style.setProperty('--coin-fall',`${fall}px`);
    coin.style.setProperty('--coin-duration',duration);
    coin.style.setProperty('--coin-delay',delay);
    coin.style.setProperty('--coin-spin-mid',spinMid);
    coin.style.setProperty('--coin-spin-end',spinEnd);
    coin.style.setProperty('--coin-size',`${size}px`);
    document.body.appendChild(coin);
    window.setTimeout(()=>coin.remove(),3900);
  }
}

function showWishSpectacle({kicker='WISH SUBSYSTEM',title='WISH GRANTED',lines=[],kind='generic',image=null,duration=5200}={}){
  document.querySelector('.wish-spectacle')?.remove();
  const overlay=document.createElement('section');
  overlay.className=`wish-spectacle wish-spectacle-${kind}`;
  overlay.setAttribute('aria-live','polite');
  overlay.innerHTML=`<div class="wish-spectacle-panel">
    <span>${kicker}</span>
    ${image?`<img src="${image.src}" alt="${image.alt}">`:''}
    <strong>${title}</strong>
    <div class="wish-spectacle-lines">${lines.map(line=>`<b>${line}</b>`).join('')}</div>
  </div>`;
  document.body.appendChild(overlay);
  requestAnimationFrame(()=>overlay.classList.add('show'));
  window.setTimeout(()=>overlay.classList.remove('show'),Math.max(900,duration-500));
  window.setTimeout(()=>overlay.remove(),duration);
  return overlay;
}
let activeWishSequenceCleanup=null;
function clearActiveWishSequence(){
  if(typeof activeWishSequenceCleanup==='function'){
    try{activeWishSequenceCleanup();}catch(_){ }
  }
  activeWishSequenceCleanup=null;
  document.querySelectorAll('.wish-sequence-overlay,.doug-directive,.doug-approval-stamp').forEach(el=>el.remove());
  document.body.classList.remove('doug-review-bigger');
}
function wishSequenceLater(fn,delay,timers){
  const id=window.setTimeout(fn,delay);
  timers.push(id);
  return id;
}
function wishSequenceInterval(fn,delay,timers){
  const id=window.setInterval(fn,delay);
  timers.push(id);
  return id;
}
function wishSequenceCleanupTimers(timers){
  timers.splice(0).forEach(id=>{window.clearTimeout(id);window.clearInterval(id);});
}
function formatWishNumber(value){ return Math.max(0,Math.floor(value)).toLocaleString('en-US'); }
function formatWishMoney(value){ return '$'+Math.max(0,Math.floor(value)).toLocaleString('en-US'); }
function enableWishSequenceClose(overlay,{label='CONTINUE',onClose=null}={}){
  const button=overlay?.querySelector('.wish-sequence-close');
  if(!button)return;
  button.disabled=false;button.textContent=label;button.classList.add('ready');
  button.addEventListener('click',()=>{
    if(button.disabled)return;
    try{onClose?.();}catch(_){ }
  },{once:true});
  window.setTimeout(()=>button.focus({preventScroll:true}),80);
}

function engineWishSpectacle(engine){
  clearActiveWishSequence();
  const timers=[];
  const detected=(engine||'engine').toUpperCase();
  const overlay=document.createElement('section');
  overlay.className='engine-port-overlay wish-sequence-overlay';
  overlay.setAttribute('aria-live','polite');
  overlay.innerHTML=`<div class="engine-port-window">
    <div class="engine-port-kicker">MULTI-ENGINE PORT // SOURCE SIGNAL: ${detected}</div>
    <h2>PORTING PROJECT TO EVERYTHING</h2>
    <p class="engine-port-copy">One codebase. Three engines. No architectural consequences detected yet.</p>
    <div class="engine-port-grid">
      <article data-engine="unreal"><strong>UNREAL ENGINE</strong><b>0%</b><i><span></span></i><small>Scanning Blueprints...</small></article>
      <article data-engine="unity"><strong>UNITY</strong><b>0%</b><i><span></span></i><small>Locating Packages...</small></article>
      <article data-engine="godot"><strong>GODOT</strong><b>0%</b><i><span></span></i><small>Parenting Nodes...</small></article>
    </div>
    <div class="engine-port-log" aria-live="polite">ANALYZING PROJECT...</div>
    <div class="engine-port-total"><span>TOTAL MIGRATION</span><i><b></b></i><strong>0%</strong></div>
    <div class="engine-port-build">ESTIMATED BUILD SIZE // CALCULATING...</div>
    <button class="wish-sequence-close" type="button" disabled>PORTING...</button>
  </div>`;
  document.body.appendChild(overlay);
  requestAnimationFrame(()=>overlay.classList.add('show'));
  consolePrint(`ENGINE WISH // ${detected} detected. Beginning unnecessary three-engine migration.`, 'good');

  const cards=[...overlay.querySelectorAll('[data-engine]')];
  const starts={unreal:0,unity:850,godot:1650};
  const durations={unreal:6200,unity:6800,godot:7200};
  const status={
    unreal:['Scanning Blueprints...','Fixing Redirectors...','Compiling 639,427 Shaders...','Converting C++ assumptions...','Packaging...'],
    unity:['Locating Packages...','Migrating Prefabs...','Resolving Missing Scripts...','Choosing URP and HDRP somehow...','Domain Reloading...'],
    godot:['Parenting Nodes...','Connecting Signals...','Renaming Node2D_Final_Final...','Converting Resources...','Exporting...']
  };
  const logs=[
    [900,'Converting Blueprints to C#...'],[1800,'Converting C# to GDScript...'],[2700,'Converting GDScript back to Blueprints...'],
    [3650,'ERROR // architectural circular dependency detected'],[4550,'SOLUTION // ignore it'],[5600,'Input mappings disagreeing productively...'],
    [6750,'All three render pipelines now claim ownership of the same material.'],[7900,'PORT COMPLETE // confidence exceeds evidence.']
  ];
  logs.forEach(([delay,msg])=>wishSequenceLater(()=>{const el=overlay.querySelector('.engine-port-log');if(el)el.textContent=msg;},delay,timers));
  const started=performance.now();
  const tick=()=>{
    if(!overlay.isConnected)return;
    const elapsed=performance.now()-started;
    let total=0;
    cards.forEach(card=>{
      const key=card.dataset.engine;
      const local=Math.max(0,Math.min(1,(elapsed-starts[key])/durations[key]));
      const eased=1-Math.pow(1-local,2.1);
      const pct=Math.round(eased*100);
      total+=pct;
      const pctEl=card.querySelector('b'),bar=card.querySelector('i span'),small=card.querySelector('small');
      if(pctEl)pctEl.textContent=`${pct}%`;
      if(bar)bar.style.width=`${pct}%`;
      const stages=status[key];
      if(small)small.textContent=pct>=100?'PORT SUCCESSFUL':stages[Math.min(stages.length-1,Math.floor(local*stages.length))];
      card.classList.toggle('complete',pct>=100);
    });
    const totalPct=Math.round(total/cards.length);
    const totalBar=overlay.querySelector('.engine-port-total i b'),totalText=overlay.querySelector('.engine-port-total>strong');
    if(totalBar)totalBar.style.width=`${totalPct}%`;
    if(totalText)totalText.textContent=`${totalPct}%`;
  };
  tick();wishSequenceInterval(tick,90,timers);
  const close=()=>{
    wishSequenceCleanupTimers(timers);overlay.classList.add('leaving');
    window.setTimeout(()=>overlay.remove(),420);activeWishSequenceCleanup=null;
  };
  wishSequenceLater(()=>{
    tick();wishSequenceCleanupTimers(timers);
    cards.forEach(card=>{const b=card.querySelector('b'),bar=card.querySelector('i span'),small=card.querySelector('small');if(b)b.textContent='100%';if(bar)bar.style.width='100%';if(small)small.textContent='PORT SUCCESSFUL';card.classList.add('complete');});
    const totalBar=overlay.querySelector('.engine-port-total i b'),totalText=overlay.querySelector('.engine-port-total>strong');if(totalBar)totalBar.style.width='100%';if(totalText)totalText.textContent='100%';
    const build=overlay.querySelector('.engine-port-build');
    if(build)build.innerHTML='<b>PORT COMPLETE // 3 ENGINES SUPPORTED</b><strong>FINAL BUILD SIZE // 487 GB</strong><small>Architecture has requested the rest of the week off.</small>';
    consolePrint('ENGINE WISH // PORT COMPLETE // Unreal, Unity, and Godot builds produced. Disk space has filed a grievance.','good');
    enableWishSequenceClose(overlay,{label:'CLOSE PORT REPORT',onClose:close});
  },8600,timers);
  activeWishSequenceCleanup=()=>{wishSequenceCleanupTimers(timers);overlay.remove();};
}

const aiWishState={active:false,originals:new Map(),nodes:[],timers:[],wasVibe:false};
function clearAiWishTimers(){
  aiWishState.timers.splice(0).forEach(id=>{window.clearTimeout(id);window.clearInterval(id);});
}
function undoAiWish({announce=true}={}){
  if(!aiWishState.active)return;
  clearAiWishTimers();
  aiWishState.originals.forEach((html,el)=>{if(el?.isConnected)el.innerHTML=html;});
  aiWishState.originals.clear();
  aiWishState.nodes.forEach(el=>el?.remove?.());
  aiWishState.nodes=[];
  document.body.classList.remove('ai-wish-corrupted');
  if(!aiWishState.wasVibe && vibeEnabled)setVibe(false);
  aiWishState.active=false;
  if(announce){
    consolePrint('AI REVERT // git reset --hard HEAD~47 // website operational again.','good');
    consolePrint('AI REVERT // 14,382 improvements removed. Tests have resumed existing.','good');
    showTransientToast('AI CHANGES REVERTED','14,382 improvements removed. Website operational again.','UNDO // SUCCESS','SYSTEM');
  }
}
function aiWishCorruptCopy(){
  const candidates=[...document.querySelectorAll('.nav-links a,main h2,main h3,main .section-kicker,main .eyebrow')]
    .filter(el=>el && el.childElementCount===0 && el.textContent.trim().length>1);
  const replacements=[
    'LEVERAGE SYNERGISTIC OUTCOMES','HOLISTIC EXPERIENCE OPTIMIZATION','SCALABLE HUMAN-CENTRIC DELIVERABLES',
    'NEXT-GENERATION ENGAGEMENT PIPELINE','ENTERPRISE-GRADE FUN ENABLEMENT','ACTIONABLE CREATIVE THOUGHT LEADERSHIP',
    'AI-ENHANCED VALUE REALIZATION','STRATEGIC INTERACTION ECOSYSTEM','ROBUST MULTIMODAL EXCELLENCE','BEST-IN-CLASS BUTTON STRATEGY'
  ];
  candidates.slice(0,18).forEach((el,index)=>{
    if(!aiWishState.originals.has(el))aiWishState.originals.set(el,el.innerHTML);
    el.textContent=replacements[index%replacements.length];
  });
}
function aiWishAddBadge(text,left,top){
  const badge=document.createElement('div');
  badge.className='ai-corruption-badge'; badge.textContent=text;
  badge.style.left=left;badge.style.top=top;
  document.body.appendChild(badge); aiWishState.nodes.push(badge);
}
function aiWishSpectacle(){
  if(aiWishState.active){
    document.querySelector('.ai-undo-button')?.focus();
    return;
  }
  clearActiveWishSequence();
  aiWishState.active=true;
  aiWishState.wasVibe=vibeEnabled;
  setVibe(true);
  const intro=showWishSpectacle({
    kicker:'AI WISH // VIBE REFACTOR',
    title:'MAKING EVERYTHING BETTER',
    lines:['SCALABILITY // INCREASING','CONFIDENCE // 99.7%','TEST COVERAGE // DEEMED UNNECESSARY'],
    kind:'ai',duration:4300
  });
  consolePrint('AI WISH // autonomous refactor authorized. No code review requested.','good');
  aiWishState.timers.push(window.setTimeout(()=>{
    document.body.classList.add('ai-wish-corrupted');
    aiWishCorruptCopy();
    aiWishAddBadge('AI OPTIMIZED // 98.7% CONFIDENCE','5vw','22vh');
    aiWishAddBadge('REMOVED UNUSED LEGACY FEATURE','63vw','31vh');
    aiWishAddBadge('BEST PRACTICE APPLIED','16vw','72vh');
    aiWishAddBadge('ACCESSIBILITY // PROBABLY','72vw','68vh');
    aiWishAddBadge('PERFORMANCE +214%*','46vw','49vh');
    const status=document.createElement('aside');
    status.className='ai-corruption-status';
    status.innerHTML='<span>AI REFACTOR // COMPLETE</span><strong>NO REGRESSIONS DETECTED</strong><small>Tests skipped due to high confidence.</small>';
    document.body.appendChild(status); aiWishState.nodes.push(status);
    consolePrint('AI REFACTOR // SUCCESS // 47 files changed, 0 tests run, 0 concerns acknowledged.','good');
  },1250));
  aiWishState.timers.push(window.setTimeout(()=>{
    const undo=document.createElement('button');
    undo.type='button';undo.className='ai-undo-button';
    undo.innerHTML='<span>RECOMMENDED ACTION // 99.9% CONFIDENCE</span><strong>UNDO AI</strong><small>Restore the website to the last known human-authored state.</small>';
    undo.addEventListener('click',()=>undoAiWish());
    document.body.appendChild(undo);aiWishState.nodes.push(undo);
    requestAnimationFrame(()=>undo.classList.add('show'));
  },2500));
  const corruptionLines=['Renaming components for clarity...','Deleting suspiciously specific design intent...','Abstracting the abstraction layer...','Moving the button to improve discoverability...','Replacing personality with enterprise tone...','Refactor successful. Obviously.'];
  let i=0;
  aiWishState.timers.push(window.setInterval(()=>{
    if(!aiWishState.active)return;
    consolePrint(`AI // ${corruptionLines[i++%corruptionLines.length]}`,(i%4===0)?'warn':'');
  },2300));
}

function gameWishSpectacle(){
  clearActiveWishSequence();
  const timers=[];
  const overlay=document.createElement('section');
  overlay.className='game-success-overlay wish-sequence-overlay';
  overlay.setAttribute('aria-live','polite');
  overlay.innerHTML=`<div class="game-success-window">
    <div class="game-success-head"><span>STEAM SUCCESS // WISH FULFILLED</span><strong>YOUR GAME IS EXPLODING</strong><small>Live commercial telemetry. Please remain calm and commercially viable.</small></div>
    <div class="game-success-stats">
      <article><span>COPIES SOLD</span><b data-stat="copies">12</b></article>
      <article><span>CURRENT PLAYERS</span><b data-stat="ccu">42</b></article>
      <article><span>PEAK CCU</span><b data-stat="peak">71</b></article>
      <article><span>REVIEWS</span><b data-stat="reviews">91% POSITIVE</b></article>
      <article><span>WISHLISTS</span><b data-stat="wishlists">3,201</b></article>
      <article><span>GLOBAL TREND</span><b data-stat="rank">#87</b></article>
    </div>
    <div class="game-success-news"><i>LIVE</i><span>Small game unexpectedly dominates weekend charts.</span></div>
    <div class="game-success-money">
      <div><span>GROSS REVENUE</span><strong data-stat="gross">$0</strong></div>
      <div class="developer"><span>YOUR ROYALTY</span><strong>$0.00</strong><small>Great exposure, though.</small></div>
      <div class="mippi"><span>PAYOUT DESTINATION // VERIFIED</span><strong>MIPPI</strong><b data-stat="mippi">$0</b></div>
    </div>
    <div class="game-success-fineprint">You wished for your game to be successful. You did not specify revenue participation.</div>
    <button class="wish-sequence-close" type="button" disabled>CALCULATING SUCCESS...</button>
  </div>`;
  document.body.appendChild(overlay);requestAnimationFrame(()=>overlay.classList.add('show'));
  consolePrint('GAME WISH // commercial success requested. Contract interpretation delegated to the Wish subsystem.','good');
  const target={copies:2847291,ccu:183422,peak:612883,wishlists:1923881,gross:74883219,mippi:52418253};
  const started=performance.now(),duration=9200;
  const headlines=[
    'Surprise indie phenomenon dominates weekend charts.',
    'Players call it “the game of the generation,” statistically irresponsibly.',
    'Publisher inbox currently on fire.',
    'Mippi Consulting reports an unusually strong quarter.',
    'Developer asks where the revenue tab went.',
    'Accounting confirms everything is working exactly as wished.'
  ];
  let headline=0;
  wishSequenceInterval(()=>{
    if(!overlay.isConnected)return;
    const t=Math.max(0,Math.min(1,(performance.now()-started)/duration));
    const e=1-Math.pow(1-t,3.2);
    const set=(key,val)=>{const el=overlay.querySelector(`[data-stat="${key}"]`);if(el)el.textContent=val;};
    set('copies',formatWishNumber(12+(target.copies-12)*e));
    set('ccu',formatWishNumber(42+(target.ccu-42)*e));
    set('peak',formatWishNumber(71+(target.peak-71)*e));
    set('wishlists',formatWishNumber(3201+(target.wishlists-3201)*e));
    set('gross',formatWishMoney(target.gross*e));
    set('mippi',formatWishMoney(target.mippi*e));
    const review=Math.min(96,91+Math.floor(e*6)); set('reviews',`${review}% OVERWHELMINGLY POSITIVE`);
    const rank=Math.max(1,87-Math.floor(e*86)); set('rank',`#${rank} GLOBAL`);
  },70,timers);
  wishSequenceInterval(()=>{
    const news=overlay.querySelector('.game-success-news span');
    if(news)news.textContent=headlines[++headline%headlines.length];
  },1450,timers);
  wishSequenceLater(()=>{
    overlay.classList.add('monkey-paw');
    const fine=overlay.querySelector('.game-success-fineprint');
    if(fine)fine.innerHTML='<b>CONGRATULATIONS.</b> Your game is one of the most successful games of all time.<br><strong>MIPPI HAS RETIRED.</strong>';
    consolePrint('GAME WISH // 2,847,291 copies sold. Developer payout: $0.00. Wish technically fulfilled.','warn');
  },9600,timers);
  wishSequenceLater(()=>{
    const badge=document.createElement('div');badge.className='game-exposure-badge';badge.innerHTML='<span>COMPENSATION</span><strong>EXPOSURE</strong><small>Priceless*</small>';overlay.appendChild(badge);
  },10400,timers);
  const close=()=>{wishSequenceCleanupTimers(timers);overlay.classList.add('leaving');window.setTimeout(()=>overlay.remove(),420);activeWishSequenceCleanup=null;};
  wishSequenceLater(()=>{
    wishSequenceCleanupTimers(timers);
    enableWishSequenceClose(overlay,{label:'ACCEPT SUCCESS',onClose:close});
  },11000,timers);
  activeWishSequenceCleanup=()=>{wishSequenceCleanupTimers(timers);overlay.remove();};
}

function dougDirective(text,{left=null,top=null}={}){
  const note=document.createElement('div');note.className='doug-directive';note.textContent=text;
  note.style.left=left||`${8+Math.random()*70}vw`;note.style.top=top||`${12+Math.random()*68}vh`;
  document.body.appendChild(note);requestAnimationFrame(()=>note.classList.add('show'));
  window.setTimeout(()=>note.classList.add('leaving'),1800);window.setTimeout(()=>note.remove(),2350);
  return note;
}
function dougWishSpectacle(){
  clearActiveWishSequence();
  const timers=[];
  const image=getDougImageConfig({cool:true});
  const overlay=document.createElement('section');overlay.className='doug-review-overlay wish-sequence-overlay';overlay.setAttribute('aria-live','polite');
  overlay.innerHTML=`<div class="doug-review-board">
    <header>${image?`<img src="${image.src}" alt="${image.alt}">`:''}<div><span>DOUG // EXECUTIVE REVIEW</span><strong>CHIEF CREATIVE OFFICER</strong><small>Executive Producer // Director of Treat Acquisition</small></div></header>
    <div class="doug-review-rows">
      ${['ART','DESIGN','ENGINEERING','PRODUCTION','MORALE','BONES'].map(x=>`<div data-review="${x.toLowerCase()}"><span>${x}</span><b>REVIEWING...</b></div>`).join('')}
    </div>
    <footer><span>FINAL VERDICT</span><strong>REVIEW IN PROGRESS</strong></footer>
    <button class="wish-sequence-close" type="button" disabled>REVIEW IN PROGRESS...</button>
  </div>`;
  document.body.appendChild(overlay);requestAnimationFrame(()=>overlay.classList.add('show'));
  consolePrint('DOUG WISH // executive review convened. Human leadership temporarily advisory.','good');
  const priorParticles=document.body.classList.contains('particle-boost');
  const priorCommand=!!dougCard?.classList.contains('doug-command');
  const setReview=(key,value,cls='')=>{const row=overlay.querySelector(`[data-review="${key}"] b`);if(row){row.textContent=value;row.className=cls;}};
  const bark=(delay,text,action)=>wishSequenceLater(()=>{dougDirective(text);consolePrint(`DOUG // ${text}`,'good');try{action?.();}catch(_){ }},delay,timers);
  bark(700,'BARK // MORE JUICE',()=>{setReview('art','NEEDS MORE JUICE','warn');if(!priorParticles)setParticleBoost(true);});
  bark(2050,'BARK // TOO MANY WORDS',()=>{setReview('design','EDITING REQUESTED','warn');});
  bark(3350,'BARK // ENGINEERING LOOKS SUSPICIOUS',()=>{setReview('engineering','SUSPICIOUS','warn');});
  bark(4550,'BARK // BIGGER',()=>{setReview('production','WHY IS THIS SMALL?','warn');document.body.classList.add('doug-review-bigger');});
  bark(5750,'BARK // MORE BONES',()=>{
    setReview('morale','CORRECTIVE ACTION','warn');setReview('bones','BELOW TARGET','warn');
    if(!priorCommand)dougCard?.classList.add('doug-command');
    for(let i=0;i<4;i++)wishSequenceLater(()=>spawnDougBone(true),i*260,timers);
  });
  bark(7350,'BARK // SHIP IT',()=>{
    ['art','design','engineering','production','morale','bones'].forEach((key,i)=>wishSequenceLater(()=>setReview(key,['JUICED','INTERACTIVE','PROBABLY FINE','STOP MEETING','MAXIMUM','ADEQUATE'][i],'good'),i*120,timers));
    const stamp=document.createElement('div');stamp.className='doug-approval-stamp';stamp.innerHTML='<span>APPROVED FOR</span><strong>PRODUCTION</strong><small>Doug likes it.</small>';document.body.appendChild(stamp);requestAnimationFrame(()=>stamp.classList.add('show'));
    const footer=overlay.querySelector('footer strong');if(footer)footer.textContent='APPROVED // DOUG LIKES IT';
  });
  wishSequenceLater(()=>{
    dougCoolProgress=100;activateDougCoolMode({source:'wish'});
    consolePrint('DOUG REVIEW // APPROVED FOR PRODUCTION // morale and coolness targets revised upward.','good');
  },8050,timers);
  const cleanup=()=>{
    wishSequenceCleanupTimers(timers);overlay.remove();document.querySelector('.doug-approval-stamp')?.remove();document.body.classList.remove('doug-review-bigger');
    if(!priorParticles)setParticleBoost(false);if(!priorCommand)dougCard?.classList.remove('doug-command');
  };
  wishSequenceLater(()=>{
    wishSequenceCleanupTimers(timers);
    enableWishSequenceClose(overlay,{label:'END EXECUTIVE REVIEW',onClose:()=>{overlay.classList.add('leaving');document.querySelector('.doug-approval-stamp')?.classList.add('leaving');window.setTimeout(()=>{cleanup();activeWishSequenceCleanup=null;},420);}});
  },8500,timers);
  activeWishSequenceCleanup=cleanup;
}

function grantValidatedWish(wishText){
  if(!consumeWishCharge()){
    consolePrint('WISH FAILED // no celestial charge. Catch another Shooting Star.','warn');
    updateMetaTrace();
    return;
  }
  telemetryCount('wish','successful');
  finaleWishSatisfied=true; try{localStorage.setItem(FINALE_WISH_KEY,'1');}catch(_){}
  consolePrint('IsValid: TRUE','good');
  consolePrint(`Wish accepted: ${wishText}`,'good');
  const text=wishText.toLowerCase();
  playWishSuccess();
  unlockLegendaryMode();
  evaluatePostgameAchievements();

  if(/\bmippi\b|mippithedork/.test(text)){
    telemetryWishBranch('mippi');
    consolePrint('Wish granted. Mippi is available to work on your project. Convenient how that worked out.','good');
    showTransientToast('WISH GRANTED', 'Mippi is available to work on your project.', 'BLUEPRINT // SUCCESS', 'SYSTEM');
    window.setTimeout(openWishContact,450);
    return;
  }
  if(/\bblender\b/.test(text)){
    telemetryWishBranch('blender');
    consolePrint('Wish granted. Blender has been removed from the universe.','good');
    showTransientToast('WISH GRANTED', 'Preparing universal software removal.', 'EARTH-1218', 'SYSTEM');
    window.setTimeout(startBlenderUninstall,420);
    return;
  }
  if(/\$|\bmoney\b|\bbucks?\b|\bdollars?\b|\bcash\b|\busd\b|\bmoolah\b|\bpayday\b/.test(text)){
    telemetryWishBranch('money');
    const response='Wish granted. Your money will arrive through trickle-down economics. It should reach you any decade now. 😉';
    consolePrint(response,'good');
    showTransientToast('WISH GRANTED', 'Your payout has entered the trickle-down pipeline. 😉', 'ECONOMY // WORKING AS DESIGNED', 'SYSTEM');
    burstMoneyFromConsole();
    return;
  }
  if(/^\s*wish(?:es)?\s*$/.test(text)){
    telemetryWishBranch('hal');
    const response="I'm sorry Dave, I'm afraid I can't do that.";
    consolePrint(response,'warn');
    showTransientToast('REQUEST DENIED', response, 'HAL // ONLINE', 'SYSTEM');
    showHalEye();
    return;
  }
  const engine=text.match(/\b(unreal|unity|godot)\b/);
  if(engine){
    telemetryWishBranch('engine');
    engineWishSpectacle(engine[1]);
    return;
  }
  if(/\b(ai|llm|agi)\b/.test(text)){
    telemetryWishBranch('ai');
    aiWishSpectacle();
    return;
  }
  if(/\bgames?\b/.test(text)){
    telemetryWishBranch('game');
    gameWishSpectacle();
    return;
  }
  if(/\bdoug\b/.test(text)){
    telemetryWishBranch('doug');
    dougWishSpectacle();
    return;
  }

  telemetryWishBranch('generic');
  consolePrint('Wish granted. Reality has been updated within acceptable tolerances.','good');
  showTransientToast('WISH GRANTED', 'The reference was valid. The runtime survived.', 'BLUEPRINT // SUCCESS', 'SYSTEM');
}

function unlockAllAchievementsGodMode(){
  telemetryCount('achievements','godmodeUses');
  telemetryCount('assistance','godmodeUses');
  telemetryMeaningful('godmode_used');
  completionCelebrated=true;
  ACHIEVEMENT_KEYS.forEach(key=>unlockedAchievements.add(key));
  try{ localStorage.setItem(STORAGE_KEY,JSON.stringify([...unlockedAchievements])); }catch(_){}
  updateAchievementProgress();
  ledgerTrigger?.classList.add('visible');
  showTransientToast('GOD MODE', 'All 10 achievements unlocked. Subtlety has left the building.', '10 / 10 FOUND', 'CHEAT // ENABLED');
  consolePrint('GOD MODE ENABLED // All 10 achievements granted.','good');
}

function openSourceViewer(){
  const sourceUrl=`view-source:${location.href}`;
  let opened=null;
  try{ opened=window.open(sourceUrl,'_blank'); }catch(_){}
  if(opened){ consolePrint('Opening browser source view.','good'); return; }
  fetch(location.href).then(r=>r.text()).then(src=>{
    const w=window.open('','_blank'); if(!w) return consolePrint('Source viewer was blocked by the browser.','warn');
    const esc=src.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
    w.document.write(`<title>view-source:${location.href}</title><pre style="white-space:pre-wrap;word-break:break-word;font:12px/1.5 Consolas,monospace;color:#d7e8f8;background:#071018;padding:24px;margin:0">${esc}</pre>`); w.document.close();
    consolePrint('Native view-source was unavailable, so a source-view fallback opened instead.','good');
  }).catch(()=>consolePrint('Unable to open source view.','warn'));
}


// PLAY // A tiny Flappy-style side quest. This was a portfolio once.
let flappyPanel=null, flappyCanvas=null, flappyCtx=null, flappyRaf=0;
let flappyBirdImage=null, flappyState=null;
let flappySessionHighScore=0;
function flappyJumpStrength(){ return slowmoEnabled ? -5.25 : -6.9; }
function flappyGravity(){ return slowmoEnabled ? .24 : .36; }

function ensureFlappyGame(){
  if(flappyPanel) return flappyPanel;
  flappyPanel=document.createElement('section');
  flappyPanel.className='flappy-game';
  flappyPanel.setAttribute('aria-label','Mippi Bird mini game');
  flappyPanel.dataset.devNote='MINIGAME NOTE // One input, immediate failure feedback, and almost no restart friction. The square player was a bug, not a design statement.';
  flappyPanel.dataset.designNote='DESIGN NOTE // INPUT ECONOMY // Mippi Bird deliberately stays one-button simple. Slowmo can change the control curve, but the side game does not grow an inventory or combat system.';
  flappyPanel.innerHTML=`
    <div class="flappy-head">
      <div><span>MIPPI BIRD // PLAY MODE</span><strong id="flappy-score">SCORE 0</strong></div>
      <button type="button" id="flappy-quit">QUIT</button>
    </div>
    <canvas width="520" height="280" id="flappy-canvas" aria-label="Click inside the game to flap"></canvas>
    <div class="flappy-footer">
      <strong id="flappy-high-score">HIGH SCORE 0</strong>
      <strong id="flappy-lives">EXTRA LIVES // NONE</strong>
      <div class="flappy-share-wrap">
        <button type="button" id="flappy-share">SHARE</button>
        <div class="flappy-share-menu" id="flappy-share-menu" aria-hidden="true">
          <button type="button" data-share="x">X</button>
          <button type="button" data-share="linkedin">LINKEDIN</button>
          <button type="button" data-share="facebook">FACEBOOK</button>
          <button type="button" data-share="copy">COPY</button>
        </div>
      </div>
      <div class="flappy-help" id="flappy-help">CLICK TO FLAP // SURVIVE THE RECTANGLES</div>
    </div>`;
  document.body.appendChild(flappyPanel);
  flappyCanvas=flappyPanel.querySelector('#flappy-canvas');
  flappyCtx=flappyCanvas.getContext('2d');
  flappyPanel.querySelector('#flappy-quit')?.addEventListener('click',closeFlappyGame);
  const shareButton=flappyPanel.querySelector('#flappy-share');
  const shareMenu=flappyPanel.querySelector('#flappy-share-menu');
  shareButton?.addEventListener('click',()=>{
    telemetryCount('flappy','shares');
    telemetryMeaningful('flappy_share',{score:flappySessionHighScore});
    shareMenu?.classList.toggle('open');
    shareMenu?.setAttribute('aria-hidden',shareMenu.classList.contains('open')?'false':'true');
  });
  shareMenu?.addEventListener('click',event=>{
    const button=event.target.closest('button[data-share]'); if(!button) return;
    const text=`I scored ${flappySessionHighScore} in Mippi Bird on Mippi's portfolio.`;
    const url=encodeURIComponent(location.href), encoded=encodeURIComponent(text);
    if(button.dataset.share==='x') window.open(`https://twitter.com/intent/tweet?text=${encoded}&url=${url}`,'_blank','noopener');
    else if(button.dataset.share==='linkedin') window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${url}`,'_blank','noopener');
    else if(button.dataset.share==='facebook') window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`,'_blank','noopener');
    else if(button.dataset.share==='copy') navigator.clipboard?.writeText(`${text} ${location.href}`);
    shareMenu.classList.remove('open'); shareMenu.setAttribute('aria-hidden','true');
  });
  flappyCanvas?.addEventListener('pointerdown',event=>{
    event.preventDefault();
    if(!flappyState) return;
    if(flappyState.gameOver){ resetFlappyGame(); flappyState.started=true; telemetryCount('flappy','gamesStarted'); telemetryMeaningful('flappy_started'); flappyState.vy=flappyJumpStrength(); return; }
    if(!flappyState.started){ flappyState.started=true; telemetryCount('flappy','gamesStarted'); telemetryMeaningful('flappy_started'); }
    flappyState.vy=flappyJumpStrength();
  });
  flappyBirdImage=new Image();
  flappyBirdImage.decoding='async';
  flappyBirdImage.src='assets/mippi-logo-blue.png';
  return flappyPanel;
}
function resetFlappyGame(){
  ensureFlappyGame();
  flappyState={
    y:140, vy:0, score:0, gameOver:false, started:false,
    shopLifeAvailable:shopOwns('bird-extra-life'), invulnerableUntil:0,
    pipes:[{x:590,gapY:118},{x:850,gapY:168}]
  };
  const score=flappyPanel.querySelector('#flappy-score');
  const help=flappyPanel.querySelector('#flappy-help');
  if(score) score.textContent='SCORE 0';
  const high=flappyPanel.querySelector('#flappy-high-score'); if(high) high.textContent=`HIGH SCORE ${flappySessionHighScore}`;
  updateFlappyLivesHud();
  if(help) help.textContent='CLICK TO START // THEN CLICK TO FLAP';
}
function updateFlappyLivesHud(){
  const el=flappyPanel?.querySelector('#flappy-lives'); if(!el) return;
  const shop=flappyState?.shopLifeAvailable?'SHOP 1':'SHOP 0';
  el.textContent=`EXTRA LIVES // ${shop} · BANK ${mushroomBankLives} · SHROOMS ${mushroomLifeProgress}/20`;
  el.classList.toggle('has-life',!!flappyState?.shopLifeAvailable||mushroomBankLives>0);
}
function persistMushroomLives(){
  try{localStorage.setItem(MUSHROOM_PROGRESS_KEY,String(mushroomLifeProgress));localStorage.setItem(MUSHROOM_LIVES_KEY,String(mushroomBankLives));}catch(_){}
  updateFlappyLivesHud();
}
function recordMushroomCollection(){
  mushroomLifeProgress++;
  if(mushroomLifeProgress>=20){
    mushroomLifeProgress-=20; mushroomBankLives++;
    telemetryCount('economy','mushroomLivesEarned'); telemetryMeaningful('mushroom_extra_life_earned',{bank:mushroomBankLives});
    showTransientToast('EXTRA LIFE EARNED','20 Mushrooms converted into one consumable Mippi Bird Extra Life.',`BANK // ${mushroomBankLives}`,'MIPPI BIRD');
    consolePrint(`MUSHROOM LIMIT // +1 MIPPI BIRD EXTRA LIFE // BANK ${mushroomBankLives}`,'good');
  }else if(mushroomLifeProgress===10){
    consolePrint(`MUSHROOM PROGRESS // ${mushroomLifeProgress}/20 toward a Mippi Bird Extra Life.`,'good');
  }
  persistMushroomLives();
}
function absorbFlappyHit(reason='collision'){
  const s=flappyState;if(!s)return false;
  let source=null;
  if(s.shopLifeAvailable){s.shopLifeAvailable=false;source='shop';telemetryCount('flappy','shopLivesUsed');}
  else if(mushroomBankLives>0){mushroomBankLives--;source='mushroom';telemetryCount('flappy','mushroomLivesUsed');telemetryCount('economy','mushroomLivesSpent');persistMushroomLives();}
  if(!source)return false;
  telemetryCount('flappy','hitsAbsorbed');telemetryMeaningful('flappy_extra_life_used',{source,reason,bank:mushroomBankLives});
  s.invulnerableUntil=performance.now()+1650; s.vy=-2.8; s.y=Math.max(28,Math.min(flappyCanvas.height-28,s.y));
  updateFlappyLivesHud();
  const help=flappyPanel?.querySelector('#flappy-help'); if(help) help.textContent=`EXTRA LIFE // ${source==='shop'?'SHOP SHIELD SPENT':'MUSHROOM LIFE SPENT'} // INVULNERABLE`;
  consolePrint(`MIPPI BIRD HIT // ${source.toUpperCase()} EXTRA LIFE USED // BANK ${mushroomBankLives}`,'warn');
  return true;
}
function closeFlappyGame(){
  if(!flappyPanel) return;
  flappyPanel.classList.remove('open');
  cancelAnimationFrame(flappyRaf); flappyRaf=0;
}
function openFlappyGame(){
  telemetryCount('flappy','opens');
  telemetryMeaningful('flappy_opened');
  ensureFlappyGame();
  resetFlappyGame();
  flappyPanel.classList.add('open');
  cancelAnimationFrame(flappyRaf);
  let last=performance.now();
  const frame=now=>{
    if(!flappyPanel?.classList.contains('open')) return;
    const dt=Math.min(2.2,(now-last)/16.6667); last=now;
    drawFlappyFrame(dt);
    flappyRaf=requestAnimationFrame(frame);
  };
  flappyRaf=requestAnimationFrame(frame);
}
function maybeRewardFlappyMilestone(score){
  const rewards={5:1,10:1,20:2};
  const amount=rewards[score];
  if(!amount) return;
  const claimed=Array.isArray(sessionTelemetry.flappy?.rupeeMilestones)?sessionTelemetry.flappy.rupeeMilestones:[];
  if(claimed.includes(score)) return;
  telemetryUnique('flappy','rupeeMilestones',score);
  telemetryCount('flappy','rupeesEarned',amount);
  telemetryMeaningful('flappy_rupee_milestone',{score,amount});
  awardRupees(amount,{source:'mippi_bird',announce:'silent'});
  consolePrint(`MIPPI BIRD MILESTONE // SCORE ${score} // +${amount} RUPEE${amount===1?'':'S'}`,'good');
  showTransientToast('MIPPI BIRD MILESTONE',`Score ${score}. The economy has reluctantly recognized your bird skills.`,`+${amount} RUPEE${amount===1?'':'S'}`,'ARCADE');
}
function drawMippiBirdFallback(ctx,size,accent){
  // Vector fallback approximates the actual Mippi mark so a slow image decode
  // never turns the player into a generic square.
  ctx.save();
  ctx.strokeStyle=accent; ctx.fillStyle=accent; ctx.lineWidth=Math.max(2,size*.075); ctx.lineCap='round'; ctx.lineJoin='round';
  ctx.beginPath(); ctx.arc(0,0,size*.40,0,Math.PI*2); ctx.stroke();
  ctx.beginPath(); ctx.arc(0,0,size*.28,-Math.PI/2,Math.PI/2); ctx.stroke();
  const left=-size*.29, right=size*.02;
  for(const y of [-.19,-.04,.11]){ctx.beginPath();ctx.moveTo(left,size*y);ctx.lineTo(right,size*(y+.17));ctx.stroke();}
  ctx.beginPath();ctx.moveTo(size*.07,-size*.27);ctx.lineTo(size*.07,size*.27);ctx.lineTo(size*.27,size*.12);ctx.stroke();
  ctx.beginPath();ctx.arc(size*.34,-size*.05,size*.055,0,Math.PI*2);ctx.stroke();
  ctx.restore();
}
function drawFlappyFrame(dt){
  if(!flappyCtx || !flappyState) return;
  const ctx=flappyCtx, s=flappyState, w=flappyCanvas.width, h=flappyCanvas.height;
  const legendary=document.body.classList.contains('theme-legendary');
  const complete=document.body.classList.contains('theme-complete');
  const bg=legendary?'#100904':complete?'#0e0715':'#07111d';
  const pipe=legendary?'#d8871b':complete?'#9f4de0':'#147ee0';
  const pipeEdge=legendary?'#53ddd8':complete?'#67e8ff':'#67c8ff';
  const accent=legendary?'#ffc84a':complete?'#ff59ca':'#5daeff';
  ctx.clearRect(0,0,w,h);
  ctx.fillStyle=bg; ctx.fillRect(0,0,w,h);
  ctx.strokeStyle=legendary?'rgba(255,194,75,.12)':complete?'rgba(211,99,255,.12)':'rgba(93,174,255,.10)';
  ctx.lineWidth=1;
  for(let x=0;x<w;x+=26){ctx.beginPath();ctx.moveTo(x,0);ctx.lineTo(x,h);ctx.stroke();}
  for(let y=0;y<h;y+=26){ctx.beginPath();ctx.moveTo(0,y);ctx.lineTo(w,y);ctx.stroke();}

  const wasGameOver=s.gameOver;
  if(!s.gameOver && s.started){
    s.vy += flappyGravity()*dt;
    s.y += s.vy*dt;
    const speed=2.65*dt;
    for(const p of s.pipes) p.x-=speed;
    if(s.pipes[0].x<-52){
      s.pipes.shift();
      const lastX=s.pipes[s.pipes.length-1]?.x ?? 520;
      s.pipes.push({x:lastX+260,gapY:78+Math.random()*120,scored:false});
    }
    const bx=102, by=s.y, bw=38, bh=38, gap=124, pipeW=43.2;
    for(const p of s.pipes){
      if(!p.scored && p.x+pipeW<bx){
        p.scored=true; s.score++;
        flappySessionHighScore=Math.max(flappySessionHighScore,s.score);
        telemetryMax('flappy','highScore',flappySessionHighScore);
        const score=flappyPanel.querySelector('#flappy-score');
        const high=flappyPanel.querySelector('#flappy-high-score');
        if(score) score.textContent=`SCORE ${s.score}`;
        if(high) high.textContent=`HIGH SCORE ${flappySessionHighScore}`;
        maybeRewardFlappyMilestone(s.score);
      }
      const topH=Math.max(20,p.gapY-gap/2), bottomY=Math.min(h-20,p.gapY+gap/2);
      const pipeHit=bx+bw/2>p.x && bx-bw/2<p.x+pipeW && (by-bh/2<topH || by+bh/2>bottomY);
      if(pipeHit && performance.now()>=s.invulnerableUntil){ if(!absorbFlappyHit('pipe')) s.gameOver=true; }
    }
    const boundaryHit=by-bh/2<0 || by+bh/2>h;
    if(boundaryHit && performance.now()>=s.invulnerableUntil){ if(!absorbFlappyHit('boundary')) s.gameOver=true; }
  }
  if(!wasGameOver && s.gameOver){
    telemetryCount('flappy','deaths');
    telemetryMeaningful('flappy_game_over',{score:s.score});
  }

  for(const p of s.pipes){
    const gap=124, pipeW=43.2, topH=Math.max(20,p.gapY-gap/2), bottomY=Math.min(h-20,p.gapY+gap/2);
    ctx.fillStyle=pipe; ctx.fillRect(p.x,0,pipeW,topH); ctx.fillRect(p.x,bottomY,pipeW,h-bottomY);
    ctx.strokeStyle=pipeEdge; ctx.lineWidth=2; ctx.strokeRect(p.x,0,pipeW,topH); ctx.strokeRect(p.x,bottomY,pipeW,h-bottomY);
  }

  const bx=102, by=s.y, size=42;
  ctx.save();
  ctx.translate(bx,by);
  ctx.rotate(Math.max(-.35,Math.min(.55,s.vy*.045)));
  const playerTint=legendary?'#ffc43f':complete?'#d96cff':'#2f93ff';
  const invulnerable=performance.now()<s.invulnerableUntil;
  const blinkVisible=!invulnerable || Math.floor(performance.now()/90)%2===0;
  if(blinkVisible){
    // Keep the mark crisp. Invulnerability is communicated by blinking, not glow.
    if(flappyBirdImage?.naturalWidth>0){
      ctx.drawImage(flappyBirdImage,-size/2,-size/2,size,size);
    } else {
      drawMippiBirdFallback(ctx,size,playerTint);
    }
  }
  ctx.restore();

  if(!s.started && !s.gameOver){
    ctx.fillStyle='rgba(0,0,0,.20)'; ctx.fillRect(0,0,w,h);
    ctx.textAlign='center'; ctx.fillStyle='#fff'; ctx.font='700 18px ui-monospace,Consolas,monospace'; ctx.fillText('CLICK TO START',w/2,h/2-7);
    ctx.fillStyle=accent; ctx.font='700 9px ui-monospace,Consolas,monospace'; ctx.fillText('GRAVITY WAITS FOR CONSENT',w/2,h/2+17);
  }

  if(s.gameOver){
    const help=flappyPanel.querySelector('#flappy-help');
    if(help) help.textContent=`CRASHED AT ${s.score} // CLICK GAME TO RESTART`;
    ctx.fillStyle='rgba(0,0,0,.52)';ctx.fillRect(0,0,w,h);
    ctx.textAlign='center';ctx.fillStyle='#fff';ctx.font='700 22px ui-monospace,Consolas,monospace';ctx.fillText('GAME OVER',w/2,h/2-8);
    ctx.fillStyle=accent;ctx.font='700 11px ui-monospace,Consolas,monospace';ctx.fillText('CLICK TO RESTART',w/2,h/2+18);
  }
}

let particleFieldTimer=null;
function emitCommandParticle(){
  const p=document.createElement('i'); p.className='command-particle';
  const palette=document.body.classList.contains('theme-legendary')?['#ffc43f','#ff7a1a','#43e0dc','#fff0b5']:document.body.classList.contains('theme-complete')?['#d96cff','#ff4fc8','#67e8ff','#ffffff']:['#2f93ff','#67e8ff','#d8f3ff','#ffffff'];
  p.style.left=`${Math.random()*100}vw`; p.style.top=`${60+Math.random()*42}vh`; p.style.background=palette[Math.floor(Math.random()*palette.length)];
  p.style.setProperty('--px',`${(Math.random()-.5)*120}px`); p.style.setProperty('--py',`${-(80+Math.random()*220)}px`);
  const size=2+Math.random()*5; p.style.width=`${size}px`;p.style.height=`${size}px`;p.style.boxShadow=`0 0 12px ${p.style.background}`;
  document.body.appendChild(p); setTimeout(()=>p.remove(),2600);
}
function setParticleBoost(active){
  telemetryCount('modes','particleToggles');
  document.body.classList.toggle('particle-boost',active);
  if(particleFieldTimer){clearInterval(particleFieldTimer);particleFieldTimer=null;}
  if(active){
    for(let i=0;i<28;i++) setTimeout(emitCommandParticle,i*25);
    particleFieldTimer=setInterval(()=>{for(let i=0;i<3;i++) emitCommandParticle();},190);
  }
}

function shopMerchantLine(){
  const available=SHOP_ITEMS.filter(shopItemAvailable);
  const unowned=available.filter(item=>!shopOwned.has(item.id));
  const locked=SHOP_ITEMS.filter(item=>!shopItemAvailable(item)&&!shopOwned.has(item.id));
  if(!unowned.length && locked.length) return 'SHOPKEEPER // Current inventory cleared. Progression is hiding the remaining bad decisions.';
  if(!unowned.length) return 'SHOPKEEPER // You bought the entire roadmap. Please stop giving the portfolio ideas.';
  if(rupeeWallet<=0) return 'SHOPKEEPER // You have no rupees. Browsing remains aggressively free.';
  const cheapest=Math.min(...unowned.map(shopPrice));
  if(rupeeWallet<cheapest) return `SHOPKEEPER // You are ${cheapest-rupeeWallet} rupee${cheapest-rupeeWallet===1?'':'s'} short of the cheapest remaining bad decision.`;
  if(shopDiscountActive()) return 'SHOPKEEPER // Production Discount active. Somehow procurement became progression.';
  if(rupeeWallet>=10) return 'SHOPKEEPER // That wallet is becoming a design problem. Spend irresponsibly.';
  return 'SHOPKEEPER // Inventory is real now. This has gone much too far.';
}
function shopRarityLabel(rarity){ return rarity==='legendary'?'LEGENDARY':rarity==='epic'?'EPIC':'RARE'; }
function renderShopCard(item){
  const locked=!shopItemAvailable(item);
  const owned=shopOwned.has(item.id), equippedNow=shopEquipped===item.id, passive=item.slot==='passive';
  const price=shopPrice(item);
  const discount=shopDiscountActive()&&!owned&&item.id!=='production-discount'&&price<item.cost;
  const displayName=locked?'???':item.name;
  const displayDescription=locked?shopLockedDescription(item):item.description;
  const displayTag=locked?shopLockedTag(item):item.tag;
  let priceText=owned?'OWNED':discount?`${item.cost} → ${price} RUPEES`:`${price} RUPEE${price===1?'':'S'}`;
  let action='buy',label=`BUY // ${price} RUPEE${price===1?'':'S'}`,disabled=rupeeWallet<price;
  if(locked){action='locked';label=item.requires==='shop-master'?'LOCKED // OWN ALL':'LOCKED // PROGRESSION';disabled=true;priceText='???';}
  else if(owned&&passive){action='passive';label=item.id==='interact-toggle'?'CONTROL // UNLOCKED':'PASSIVE // ACTIVE';disabled=true;}
  else if(owned&&equippedNow){action='equipped';label='EQUIPPED';disabled=true;}
  else if(owned){action='equip';label='EQUIP';disabled=false;}
  return `<article class="shop-item rarity-${item.rarity} ${owned?'owned':''} ${equippedNow?'equipped':''} ${locked?'locked':''}" data-shop-id="${item.id}" data-rarity="${item.rarity}">
    <div class="shop-item-grade"><span>${shopRarityLabel(item.rarity)}</span><small>${displayTag}</small></div>
    <div class="shop-item-top"><span>${displayName}</span><b>${priceText}</b></div>
    <h4>${displayName}</h4><p>${displayDescription}</p>
    <button type="button" data-shop-action="${action}" data-shop-id="${item.id}" ${disabled?'disabled':''}>${label}</button>
  </article>`;
}
function renderShop(){
  if(!shopItemsEl) return;
  if(shopWalletCount) shopWalletCount.textContent=String(rupeeWallet);
  const equipped=shopItem(shopEquipped);
  if(shopEquippedName) shopEquippedName.textContent=equipped?.name?.toUpperCase()||'NONE';
  if(shopUnequip){shopUnequip.disabled=!equipped;shopUnequip.classList.toggle('visible',!!equipped);}
  const groups=[['rare','FIELD GEAR'],['epic','SYSTEM GEAR'],['legendary','MASTERWORKS']];
  shopItemsEl.innerHTML=groups.map(([rarity,subtitle])=>`<section class="shop-rarity-section rarity-${rarity}" data-rarity="${rarity}"><header><span>${shopRarityLabel(rarity)}</span><small>${subtitle}</small></header><div class="shop-rarity-grid">${SHOP_ITEMS.filter(item=>item.rarity===rarity).map(renderShopCard).join('')}</div></section>`).join('');
  if(shopMerchant) shopMerchant.textContent=shopMerchantLine();
}
function equipShopItem(id,{announce=true}={}){
  const item=shopItem(id);
  if(!item||item.slot!=='gameplay'||!shopOwned.has(id)||!shopItemAvailable(item)) return false;
  if(shopEquipped===id) return true;
  shopEquipped=id;
  persistShopState(); applyShopEquipmentState(); renderShop();
  telemetryCount('economy','shopEquips'); telemetryUnique('economy','shopEquippedItems',id); telemetryMeaningful('shop_equip',{id});
  if(announce){ consolePrint(`SHOP // ${item.name.toUpperCase()} equipped. One slot, one bad idea at a time.`,'good'); showTransientToast('ITEM EQUIPPED',item.name,'ONE GAMEPLAY MODIFIER','SHOP'); }
  return true;
}
function unequipShopItem(){
  if(!shopEquipped) return;
  const previous=shopItem(shopEquipped);
  shopEquipped=null; persistShopState(); applyShopEquipmentState(); renderShop();
  telemetryCount('economy','shopUnequips'); telemetryMeaningful('shop_unequip',{id:previous?.id||'unknown'});
  consolePrint(`SHOP // ${previous?.name||'Gameplay modifier'} unequipped. Raw portfolio difficulty restored.`,'good');
}
function purchaseShopItem(id){
  const item=shopItem(id);
  if(!item||!shopItemAvailable(item)) return;
  if(shopOwned.has(id)){ if(item.slot==='gameplay') equipShopItem(id); return; }
  const price=shopPrice(item);
  if(rupeeWallet<price){
    consolePrint(`SHOPKEEPER // ${item.name} costs ${price} rupees. Wallet: ${rupeeWallet}. Arithmetic remains undefeated.`,'warn');
    shopPopup?.querySelector(`[data-shop-id="${id}"]`)?.classList.add('shop-denied');
    window.setTimeout(()=>shopPopup?.querySelector(`[data-shop-id="${id}"]`)?.classList.remove('shop-denied'),320);
    return;
  }
  rupeeWallet-=price; shopOwned.add(id);
  telemetryCount('economy','rupeesSpent',price); telemetryCount('economy','shopPurchases'); telemetryUnique('economy','shopOwnedItems',id); telemetryMeaningful('shop_purchase',{id,cost:price});
  try{localStorage.setItem(RUPEE_WALLET_KEY,String(rupeeWallet));}catch(_){}
  persistShopState();
  if(item.slot==='gameplay') equipShopItem(id,{announce:false});
  else applyShopEquipmentState();
  if(id==='design-mode-unlock'){
    designModeUnlocked=true;
    try{localStorage.setItem(DESIGN_UNLOCK_KEY,'1');}catch(_){}
    updateDesignModeAvailability();
  }
  updateRupeeMeter(); renderShop(); updateMetaTrace(); renderLedger(); syncInteractToggle(); evaluatePostgameAchievements();
  const detail=item.slot==='passive'?`${item.name} is permanently active.`:`${item.name} equipped. Owned items can be swapped for free.`;
  consolePrint(`PURCHASE COMPLETE // ${item.name.toUpperCase()} // -${price} RUPEE${price===1?'':'S'} // WALLET ${rupeeWallet}`,'good');
  if(id==='design-mode-unlock'){
    showTransientToast('DESIGN MODE UNLOCKED','The commentary layer is now available beside Inspect in the bottom-right mode controls.','CAPSTONE // ACQUIRED','SHOP');
    consolePrint('DESIGN MODE // unlocked. Use the bottom-right DESIGN control or the design command.','good');
  }else{
    showTransientToast('PURCHASE COMPLETE',detail,`-${price} R // WALLET ${rupeeWallet}`,'SHOP');
  }
}
function openShop(){
  if(!shopPopup) return;
  telemetryCount('economy','shopOpens'); telemetryMeaningful('shop_open',{wallet:rupeeWallet});
  renderShop(); shopPopup.classList.add('open'); shopPopup.setAttribute('aria-hidden','false');
  updateRupeeAttention();
  consolePrint(`SHOP // WALLET ${rupeeWallet} RUPEE${rupeeWallet===1?'':'S'} // ${shopOwned.size} ITEM${shopOwned.size===1?'':'S'} OWNED`,'good');
}
function closeShop(){ shopPopup?.classList.remove('open'); shopPopup?.setAttribute('aria-hidden','true'); updateRupeeAttention(); }
shopClose?.addEventListener('click',closeShop);
shopPopup?.addEventListener('pointerdown',event=>{ if(event.target===shopPopup) closeShop(); });
shopItemsEl?.addEventListener('click',event=>{
  const button=event.target.closest('button[data-shop-id]'); if(!button||button.disabled) return;
  const id=button.dataset.shopId, action=button.dataset.shopAction;
  if(action==='buy') purchaseShopItem(id); else if(action==='equip') equipShopItem(id);
});
shopUnequip?.addEventListener('click',unequipShopItem);
rupeeMeter?.addEventListener('click',openShop);

function consolePrintFunCommands(){
  consolePrintCommandGroup('FUN',['doug','shipit','joke','ufo','twinkle','shroom','rupee','shop','hey listen','stars','wish','vibe','play']);
}
function listCommands(){
  consolePrintCommandGroup('CORE',['help','docs','clear','version','about','home','top','inspect',...(designModeUnlocked?['design']:[]),'theme','debug']);
  consolePrintCommandGroup('NAV',['games','career','consulting','crafting','tools','resumes','projects','hero']);
  consolePrintCommandGroup('LINKS',['github','fab','steam','unreal source','learning']);
  consolePrintCommandGroup('PROJECT',['heavywater','azure','unmark','nda']);
  consolePrintCommandGroup('SYSTEM',['achievements','reset','cheat','stats','particles']);
  consolePrintFunCommands();
  consolePrintUnrealCommands();
}

function clearMippiStorage(storage){
  try{
    const keys=[];
    for(let i=0;i<storage.length;i++){
      const key=storage.key(i);
      if(key && key.toLowerCase().startsWith('mippi')) keys.push(key);
    }
    keys.forEach(key=>storage.removeItem(key));
  }catch(_){}
}
function performFullReset(){
  clearMippiStorage(localStorage);
  clearMippiStorage(sessionStorage);
  try{ history.scrollRestoration='manual'; }catch(_){}
  window.scrollTo(0,0);
  consolePrint('FULL RESET // confirmed. Reinitializing first-visit state.','warn');
  window.setTimeout(()=>{
    // Reset must perform a real document reload. Three.js scenes bootstrap only
    // during document startup, and replacing the current URL with itself is not
    // a reliable substitute for an explicit reload in every browser.
    try{ history.replaceState(null,'',location.pathname+location.search); }catch(_){}
    location.reload();
  },420);
}


// Temporary developer state forcing -------------------------------------------------
// These commands intentionally do not count toward player telemetry. They are a QA
// shortcut layer and should be removed or hidden before the final public build.
function devPrintHelp(){
  consolePrint('DEV // TEMPORARY QA STATE COMMANDS','good');
  consolePrintCommandGroup('PROGRESS',['dev fresh','dev signals 0','dev signals 5','dev signals 10','dev rare','dev epic','dev legendary','dev finale ready','dev finale play','dev postgame reveal','dev postgame complete','dev music']);
  consolePrintCommandGroup('ECONOMY',['dev rupees 0','dev rupees 2','dev rupees 10','dev shop empty','dev shop affordable','dev shop epic','dev shop legendary','dev shop master','dev shop complete','dev hearts 0','dev hearts 5']);
  consolePrintCommandGroup('METERS',['dev cool 0','dev cool 50','dev cool max','dev castle 0','dev castle 3','dev castle 4','dev castle key','dev invasion 0','dev invasion 33','dev invasion 66','dev invasion near']);
  consolePrintCommandGroup('WISH',['dev wish charge','dev wish broken','dev wish fixed','dev wish engine','dev wish ai','dev wish undo','dev wish game','dev wish doug','dev wish mippi','dev wish blender','dev wish money','dev wish hal','dev blueprint broken','dev blueprint fixed']);
  consolePrintCommandGroup('ARCADE',['dev pickup heart','dev pickup rupee','dev pickup star','dev pickup 1up','dev pickup key','dev ufo','dev boss','dev superboss','dev starpower','dev flappy']);
  consolePrintCommandGroup('DIRECTOR',['dev director quiet','dev director curious','dev director engaged','dev director struggling','dev director mastery']);
  consolePrintCommandGroup('MODES',['dev mode inspect on','dev mode inspect off','dev mode design on','dev mode design off','dev mode interact on','dev mode interact off','dev doug command','dev doug cool','dev doug review']);
  consolePrintCommandGroup('ATTN',['dev attention rupees','dev attention wish','dev attention blueprint']);
  consolePrintCommandGroup('UTILITY',['dev snapshot','dev clean']);
  consolePrint('OBJECTIVE // use dev objective random, dev objective complete, dev objective fail, or dev objective <objective-id>.');
}

function devPersistAchievements(){
  try{localStorage.setItem(STORAGE_KEY,JSON.stringify([...unlockedAchievements]));}catch(_){}
}
function devSetSignals(count){
  const n=Math.max(0,Math.min(ACHIEVEMENT_KEYS.length,Math.floor(Number(count)||0)));
  unlockedAchievements=new Set(ACHIEVEMENT_KEYS.slice(0,n));
  devPersistAchievements();
  completionCelebrated=n===ACHIEVEMENT_KEYS.length;
  if(n<ACHIEVEMENT_KEYS.length){
    legendaryUnlocked=false;
    try{localStorage.removeItem(LEGENDARY_UNLOCK_KEY);}catch(_){}
  }
  updateAchievementProgress();
  applyThemeMode(n===ACHIEVEMENT_KEYS.length?'epic':'rare',{persist:false});
  consolePrint(`DEV // Signals forced to ${n}/${ACHIEVEMENT_KEYS.length}.`,'good');
}
function devSetEpic(){
  unlockedAchievements=new Set(ACHIEVEMENT_KEYS);devPersistAchievements();completionCelebrated=true;
  legendaryUnlocked=false;try{localStorage.removeItem(LEGENDARY_UNLOCK_KEY);}catch(_){}
  updateAchievementProgress();applyThemeMode('epic',{persist:false});updateConsoleAttention();
  consolePrint('DEV // Epic state forced. 10/10 Signals, Legendary locked.','good');
}
function devSetLegendary(){
  unlockedAchievements=new Set(ACHIEVEMENT_KEYS);devPersistAchievements();completionCelebrated=true;
  legendaryUnlocked=true;try{localStorage.setItem(LEGENDARY_UNLOCK_KEY,'1');}catch(_){}
  updateAchievementProgress();applyThemeMode('legendary',{persist:false});updateDesignModeAvailability();updateConsoleAttention();
  consolePrint('DEV // Legendary state forced.','good');
}
function devSetRupees(value){
  rupeeWallet=Math.max(0,Math.floor(Number(value)||0));rupeeDiscovered=rupeeWallet>0||shopOwned.size>0;
  try{localStorage.setItem(RUPEE_WALLET_KEY,String(rupeeWallet));if(rupeeDiscovered)localStorage.setItem(RUPEE_DISCOVERED_KEY,'1');else localStorage.removeItem(RUPEE_DISCOVERED_KEY);}catch(_){}
  updateRupeeMeter();syncShopTelemetrySnapshot();
  consolePrint(`DEV // Wallet forced to ${rupeeWallet} Rupee${rupeeWallet===1?'':'s'}.`,'good');
}
function devSetHearts(value){
  heartCount=Math.max(0,Math.min(5,Math.floor(Number(value)||0)));heartRewardShown=false;
  try{localStorage.setItem(HEART_KEY,String(heartCount));localStorage.removeItem(HEART_REWARD_KEY);}catch(_){}
  updateHeartMeter();updateProgressHudVisibility();evaluatePostgameAchievements({announce:false});
  consolePrint(`DEV // Hearts forced to ${heartCount}/5${heartCount>=5?' // claim cue armed':''}.`,'good');
}
function devSetCool(value){
  const amount=String(value).toLowerCase()==='max'?100:Math.max(0,Math.min(100,Number(value)||0));
  if(dougCoolTimer){window.clearTimeout(dougCoolTimer);dougCoolTimer=null;}if(dougCoolDrainTimer){window.clearInterval(dougCoolDrainTimer);dougCoolDrainTimer=null;}
  dougCoolProgress=amount;dougCoolActive=amount>=100;document.body.classList.toggle('doug-cool-mode',dougCoolActive);dougCard?.classList.toggle('doug-star-cool',dougCoolActive);
  if(dougCoolActive){postgameCoolMaxed=true;try{localStorage.setItem(POSTGAME_COOL_MAXED_KEY,'1');}catch(_){}}
  persistDougCoolProgress();updateCoolMeter();updateProgressHudVisibility();syncDougThemeVisuals();syncDougBoneCoolVisuals();evaluatePostgameAchievements({announce:false});
  consolePrint(`DEV // Coolness forced to ${Math.round(amount)}%${dougCoolActive?' // COOL MODE':''}.`,'good');
}
function devSetCastle(value){
  const v=String(value||'').toLowerCase();
  if(v==='key'){
    castleRunProgress=Math.max(0,Math.min(3,castleRunProgress));persistCastleRun();activateCastleQuest();
    consolePrint('DEV // Castle key state forced. A Castle should appear shortly.','good');return;
  }
  castleQuestActive=false;activeCastle?.remove?.();activeCastle=null;
  castleRunProgress=Math.max(0,Math.min(4,Math.floor(Number(v)||0)));
  if(castleRunProgress>=4){postgameCastleComplete=true;try{localStorage.setItem(POSTGAME_CASTLE_COMPLETE_KEY,'1');}catch(_){}}
  persistCastleRun();updateCastleMeter();updateProgressHudVisibility();evaluatePostgameAchievements({announce:false});
  consolePrint(`DEV // Castle run forced to ${castleRunProgress}/4${castleRunProgress>=4?' // claim cue armed':''}.`,'good');
}
function devSetInvasion(value){
  const v=String(value||'0').toLowerCase();
  const arcade=telemetryPath('arcade');
  if(v==='0'){arcade.bossDefeated=0;arcade.superBossDefeated=0;ufoKills=0;invasionWaveKills=0;nextBossKillThreshold=10;}
  else if(v==='33'){arcade.bossDefeated=1;arcade.superBossDefeated=0;ufoKills=0;invasionWaveKills=0;nextBossKillThreshold=10;}
  else if(v==='66'){arcade.bossDefeated=2;arcade.superBossDefeated=0;ufoKills=0;invasionWaveKills=0;nextBossKillThreshold=10;}
  else if(v==='near'){arcade.bossDefeated=2;arcade.superBossDefeated=0;ufoKills=9;invasionWaveKills=9;nextBossKillThreshold=10;}
  else {consolePrint('DEV // invasion expects 0, 33, 66, or near.','warn');return;}
  updateInvasionMeter();updateProgressHudVisibility();
  consolePrint(`DEV // Invasion meter forced to ${v==='near'?'one UFO before Super Boss':v+'%'}.`,'good');
}
function devSetShopState(state){
  const s=String(state||'').toLowerCase();
  const setOwned=ids=>{shopOwned=new Set(ids.filter(id=>SHOP_ITEMS.some(item=>item.id===id)));shopEquipped=null;};
  if(s==='empty'){
    setOwned([]);designModeUnlocked=false;try{localStorage.removeItem(DESIGN_UNLOCK_KEY);}catch(_){}
  }else if(s==='affordable'){
    setOwned([]);designModeUnlocked=false;devSetRupees(2);closeShop();
  }else if(s==='epic'){
    devSetEpic();setOwned([]);devSetRupees(12);
  }else if(s==='legendary'){
    devSetLegendary();setOwned([]);devSetRupees(20);
  }else if(s==='master'){
    devSetLegendary();setOwned(SHOP_ITEMS.filter(i=>i.id!=='design-mode-unlock').map(i=>i.id));designModeUnlocked=false;devSetRupees(10);
  }else if(s==='complete'){
    devSetLegendary();setOwned(SHOP_ITEMS.map(i=>i.id));designModeUnlocked=true;try{localStorage.setItem(DESIGN_UNLOCK_KEY,'1');}catch(_){}devSetRupees(20);
  }else {consolePrint('DEV // shop expects empty, affordable, epic, legendary, master, or complete.','warn');return;}
  persistShopState();applyShopEquipmentState();updateDesignModeAvailability();updateRupeeMeter();renderShop();updateMetaTrace();renderLedger();syncInteractToggle();updateRupeeAttention();
  consolePrint(`DEV // Shop state forced to ${s.toUpperCase()}.`,'good');
}
function devSetWishState(state){
  const s=String(state||'').toLowerCase();
  if(['charge','broken','fixed'].includes(s)){
    devSetEpic();try{localStorage.setItem(WISH_KEY,'1');}catch(_){}wishCharge=1;
    if(s==='broken'){wishHasIsValid=false;wishBlueprintErrorActive=true;try{sessionStorage.removeItem(WISH_VALID_KEY);}catch(_){}}
    else if(s==='fixed'){wishHasIsValid=true;wishBlueprintErrorActive=false;try{sessionStorage.setItem(WISH_VALID_KEY,'1');}catch(_){}}
    try{localStorage.setItem(WISH_CHARGE_KEY,'1');}catch(_){}
    persistWishCharge();updateBlueprintState();updateConsoleAttention();
    consolePrint(`DEV // Wish state forced to ${s.toUpperCase()}${s==='charge'?' // Blueprint validity preserved':''}.`,'good');return;
  }
  if(s==='engine'){engineWishSpectacle('unreal');return;}
  if(s==='ai'){aiWishSpectacle();return;}
  if(s==='undo'){undoAiWish();return;}
  if(s==='game'){gameWishSpectacle();return;}
  if(s==='doug'){dougWishSpectacle();return;}
  if(s==='mippi'){openWishContact();return;}
  if(s==='blender'){startBlenderUninstall();return;}
  if(s==='money'){burstMoneyFromConsole();showTransientToast('DEV // MONEY WISH','Testing the trickle-down payout spectacle.','ECONOMY // TEST','DEV');return;}
  if(s==='hal'){showHalEye();showTransientToast('REQUEST DENIED',"I'm sorry Dave, I'm afraid I can't do that.",'HAL // DEV TEST','DEV');return;}
  consolePrint('DEV // wish expects charge, broken, fixed, engine, ai, undo, game, doug, mippi, blender, money, or hal.','warn');
}
function devObjective(state){
  const s=String(state||'random').toLowerCase();
  if(s==='complete'){if(!objectiveRuntime.active)return consolePrint('DEV // No active objective to complete. Use dev objective random first.','warn');objectiveRuntime.active.progress=objectiveRuntime.active.goal;objectiveFinish();return;}
  if(s==='fail'){if(!objectiveRuntime.active)return consolePrint('DEV // No active objective to fail. Use dev objective random first.','warn');objectiveFail('dev_forced');return;}
  if(objectiveRuntime.active)objectiveCancel('dev_replace');
  const def=s==='random'?(objectiveChoose()||OBJECTIVE_DEFS[0]):objectiveDef(s);
  if(!def)return consolePrint(`DEV // Unknown or currently ineligible objective: ${s}.`,'warn');
  objectiveRuntime.nextEligibleAt=0;objectiveStart(def,{contextual:true});consolePrint(`DEV // Objective forced: ${def.id}.`,'good');
}
function devSetDirector(state){
  const s=String(state||'').toLowerCase();if(!DIRECTOR_PROFILES[s])return consolePrint('DEV // director expects quiet, curious, engaged, struggling, or mastery.','warn');
  if(s===directorRuntime.state){directorRuntime.stateSince=Date.now();document.body.dataset.directorState=s;sessionTelemetry.director.state=s;}
  else directorSetState(s,'dev_forced');
  consolePrint(`DEV // Director forced to ${s.toUpperCase()}.`,'good');
}
function devSetMode(args){
  const [mode,desired='on']=String(args||'').split(/\s+/);const on=desired!=='off';
  if(mode==='inspect'){setInspectMode(on);consolePrint(`DEV // Inspect ${on?'ON':'OFF'}.`,'good');return;}
  if(mode==='design'){if(on&&!designModeUnlocked){designModeUnlocked=true;try{localStorage.setItem(DESIGN_UNLOCK_KEY,'1');}catch(_){}updateDesignModeAvailability();}setDesignMode(on);consolePrint(`DEV // Design ${on?'ON':'OFF'}.`,'good');return;}
  if(mode==='interact'){if(!shopOwned.has('interact-toggle')){shopOwned.add('interact-toggle');persistShopState();syncInteractToggle();}setInteractMode(on);return;}
  consolePrint('DEV // mode expects inspect, design, or interact plus optional on/off.','warn');
}
function devDoug(state){
  const s=String(state||'').toLowerCase();
  if(s==='command'){dougCard?.classList.add('doug-command');spawnDougBone(true);consolePrint('DEV // Doug command state forced.','good');return;}
  if(s==='cool'){devSetCool('max');return;}
  if(s==='review'){dougWishSpectacle();return;}
  consolePrint('DEV // doug expects command, cool, or review.','warn');
}
function devAttention(state){
  const s=String(state||'').toLowerCase();
  if(s==='rupees'){devSetShopState('affordable');closeShop();updateRupeeAttention();consolePrint('DEV // Rupee attention cue armed.','good');return;}
  if(s==='wish'){devSetWishState('fixed');updateConsoleAttention();consolePrint('DEV // Dev Console WISH READY attention cue armed.','good');return;}
  if(s==='blueprint'){devSetWishState('broken');updateConsoleAttention();consolePrint('DEV // Dev Console FIX WISH attention cue armed.','good');return;}
  consolePrint('DEV // attention expects rupees, wish, or blueprint.','warn');
}
function devForceFinale(play=false){
  devSetLegendary();finaleWishSatisfied=true;finaleBossSatisfied=true;heartCount=5;heartRewardShown=true;
  try{localStorage.setItem(FINALE_WISH_KEY,'1');localStorage.setItem(FINALE_BOSS_KEY,'1');localStorage.setItem(HEART_KEY,'5');localStorage.setItem(HEART_REWARD_KEY,'1');}catch(_){}
  if(shopOwned.size===0){shopOwned.add('lucky-charm');persistShopState();}
  ['games','career','consulting','crafting','tools'].forEach(id=>{const entry=telemetryPath(`sections.${id}`);entry.visits=Math.max(1,Number(entry.visits)||0);});
  updateHeartMeter();updateProgressHudVisibility();finaleReady=true;document.body.classList.add('finale-ready');
  consolePrint(`DEV // Finale ${play?'PLAY':'READY'} state forced.`,'good');
  if(play){openConsole(false);window.setTimeout(startFinale,120);}
}
function devSnapshot(){
  const affordable=affordableShopItems();
  consolePrint(`DEV SNAPSHOT // theme ${currentThemeMode().toUpperCase()} // signals ${unlockedAchievements.size}/10 // legendary ${legendaryUnlocked?'YES':'NO'}`,'good');
  consolePrint(`WALLET ${rupeeWallet} // affordable ${affordable.length} // shop owned ${shopOwned.size}/${SHOP_ITEMS.length} // hearts ${heartCount}/5 // cool ${Math.round(dougCoolProgress)}%`);
  consolePrint(`WISH charge ${wishCharge}/1 // blueprint ${wishHasIsValid?'VALID':'INVALID'} // finale ${finaleReady?'READY':finaleEligible()?'ELIGIBLE':'LOCKED'}`);
  consolePrint(`DIRECTOR ${directorRuntime.state.toUpperCase()} // invasion ${invasionMeterValue?.textContent||'N/A'} // castle ${castleRunProgress}/4 // objective ${objectiveRuntime.active?.id||'NONE'}`);
}
function devClean(){
  clearActiveWishSequence();undoAiWish({announce:false});
  closeShop();closeBlueprint();closeBlenderPopup();closeWishContact();closeUnrealGift();cancelCompile?.();endFinale();halOverlay?.classList.remove('show');
  if(superBossActive)endSuperBoss('dev_clean');
  document.querySelectorAll('.wish-spectacle,.wish-sequence-overlay,.doug-directive,.doug-approval-stamp').forEach(el=>el.remove());
  consolePrint('DEV // Temporary overlays and authored Wish effects cleaned. Persistent progression left intact.','good');
}
function devPostgame(state){
  const s=String(state||'').toLowerCase();
  if(s==='reveal'){finaleSeen=true;try{localStorage.setItem(FINALE_SEEN_KEY,'1');}catch(_){}revealPostgameAchievements();return;}
  if(s==='complete'){
    devSetLegendary();finaleSeen=true;finaleWishSatisfied=true;heartCount=5;postgameCoolMaxed=true;postgameCastleComplete=true;postgameSuperBossDefeated=true;
    postgameVisitedSections=new Set(POSTGAME_MAJOR_SECTIONS);shopOwned=new Set(SHOP_ITEMS.map(i=>i.id));designModeUnlocked=true;
    try{localStorage.setItem(FINALE_SEEN_KEY,'1');localStorage.setItem(FINALE_WISH_KEY,'1');localStorage.setItem(HEART_KEY,'5');localStorage.setItem(POSTGAME_COOL_MAXED_KEY,'1');localStorage.setItem(POSTGAME_CASTLE_COMPLETE_KEY,'1');localStorage.setItem(POSTGAME_SUPERBOSS_KEY,'1');localStorage.setItem(DESIGN_UNLOCK_KEY,'1');}catch(_){}
    persistPostgameSections();persistShopState();applyShopEquipmentState();updateHeartMeter();revealPostgameAchievements();evaluatePostgameAchievements({announce:false});renderLedger();
    consolePrint('DEV // Postgame completion state forced. Legendary achievement and Music Player should be unlocked.','good');return;
  }
  consolePrint('DEV // postgame expects reveal or complete.','warn');
}
function devMusic(){unlockMusicPlayer({announce:false});consolePrint('DEV // Music Player unlocked for QA. Reset clears it.','good');}
function devCommand(args=''){
  const input=String(args||'').trim().toLowerCase();if(!input||input==='help'){devPrintHelp();return;}
  const [root,...rest]=input.split(/\s+/);const tail=rest.join(' ');
  if(root==='snapshot'){devSnapshot();return;}
  if(root==='fresh'){clearMippiStorage(localStorage);clearMippiStorage(sessionStorage);location.reload();return;}
  if(root==='clean'){devClean();return;}
  if(root==='signals'){devSetSignals(rest[0]);return;}
  if(root==='rare'){devSetSignals(0);consolePrint('DEV // Rare baseline forced.','good');return;}
  if(root==='epic'){devSetEpic();return;}
  if(root==='legendary'){devSetLegendary();return;}
  if(root==='finale'){if(rest[0]==='ready'||rest[0]==='play')devForceFinale(rest[0]==='play');else consolePrint('DEV // finale expects ready or play.','warn');return;}
  if(root==='postgame'){devPostgame(rest[0]);return;}
  if(root==='music'){devMusic();return;}
  if(root==='rupees'){devSetRupees(rest[0]);return;}
  if(root==='shop'){devSetShopState(rest[0]);return;}
  if(root==='hearts'){devSetHearts(rest[0]);return;}
  if(root==='cool'){devSetCool(rest[0]);return;}
  if(root==='castle'){devSetCastle(rest[0]);return;}
  if(root==='invasion'){devSetInvasion(rest[0]);return;}
  if(root==='wish'){devSetWishState(rest[0]);return;}
  if(root==='blueprint'){if(rest[0]==='broken'||rest[0]==='fixed'){devSetWishState(rest[0]);openBlueprint();}else consolePrint('DEV // blueprint expects broken or fixed.','warn');return;}
  if(root==='objective'){devObjective(rest[0]);return;}
  if(root==='director'){devSetDirector(rest[0]);return;}
  if(root==='mode'){devSetMode(tail);return;}
  if(root==='doug'){devDoug(rest[0]);return;}
  if(root==='attention'){devAttention(rest[0]);return;}
  if(root==='pickup'){const kind=rest[0];if(!['heart','rupee','star','1up','key'].includes(kind))return consolePrint('DEV // pickup expects heart, rupee, star, 1up, or key.','warn');spawnGamePickup(kind,true);consolePrint(`DEV // ${kind.toUpperCase()} pickup spawned.`,'good');return;}
  if(root==='ufo'){spawnGalaga(true);consolePrint('DEV // UFO spawned.','good');return;}
  if(root==='boss'){devSetEpic();spawnBossUfo(true);consolePrint('DEV // Boss spawned.','good');return;}
  if(root==='superboss'){
    devSetLegendary();
    const boss=document.querySelector('.boss-ufo');if(boss){for(let i=0;i<6;i++)boss.click();}
    if(superBossActive)endSuperBoss('dev_restart');
    window.setTimeout(()=>spawnSuperBoss(true),boss?180:0);consolePrint('DEV // Super Boss spawn requested.','good');return;
  }
  if(root==='starpower'){activateStarPower();consolePrint('DEV // Star Power activated.','good');return;}
  if(root==='flappy'){openFlappyGame();return;}
  consolePrint(`DEV // Unknown state command: ${input}. Type dev help.`,'warn');
}

const COMMANDS = {
  dev(args=''){ devCommand(args); },
  help(){ listCommands(); },
  docs(){ window.open('https://mippi-the-dork.github.io/docs/','_blank','noopener,noreferrer'); },
  clear(){ if(consoleOutput) consoleOutput.innerHTML=''; }, cls(){ if(consoleOutput) consoleOutput.innerHTML=''; },
  version(){ consolePrint('Mippi Portfolio v2.83 · static GitHub Pages build'); },
  about(){ jumpTo('about'); }, home(){ window.scrollTo({top:0,behavior:'smooth'}); }, top(){ window.scrollTo({top:0,behavior:'smooth'}); },
  games(){ jumpTo('games'); }, career(){ jumpTo('career'); }, consulting(){ jumpTo('consulting'); }, crafting(){ jumpTo('crafting'); },
  tools(){ consolePrint('Opening Unreal Tools.'); jumpTo('tools'); }, projects(){ consolePrint('Project Heavy Water · Azure Altar · consulting work · unannounced NDA title'); jumpTo('games'); },
  resumes(){ document.querySelector('.resume-panel')?.scrollIntoView({behavior:'smooth'}); },
  inspect(){ setInspectMode(!document.body.classList.contains('inspect-mode')); consolePrint(`Inspect Mode ${document.body.classList.contains('inspect-mode')?'ON':'OFF'}.`,'good'); },
  design(){ if(!designModeUnlocked) return consolePrint('DESIGN MODE // Shop capstone required. Own every other item first.','warn'); setDesignMode(!document.body.classList.contains('design-mode')); consolePrint(`Design Mode ${document.body.classList.contains('design-mode')?'ON':'OFF'}.`,'good'); },
  theme(){ cycleThemeMode(); },
  debug(){ openSourceViewer(); },
  achievements(){ ledgerTrigger?.classList.add('visible'); openLedger(); consolePrint(`Ledger opened: ${unlockedAchievements.size}/${ACHIEVEMENT_KEYS.length} found.`,'good'); },
  reset(){
    consolePending='reset_confirmation';
    consolePrint('FULL RESET // This clears Signals, themes, Shop purchases, currency, Wishes, Doug progress, Castle progress, Finale state, telemetry, and session progress.','warn');
    consolePrint('Type RESET to confirm. Type anything else to cancel.','warn');
  },
  cheat(){ nextCheat(); },
  stats(){ printSessionStats(); },
  doug(){ reactDoug(randomLine(['Doug has reviewed the command.','Doug requests snacks before execution.','Doug approves this branch.','Doug has assumed temporary production control.'])); burstDougPaws(4); consolePrint('Doug status: operational. Morale: excellent. Meeting discipline: questionable.'); },
  github(){ window.open('https://github.com/mippi-the-dork','_blank','noopener'); },
  fab(){ window.open('https://www.fab.com/sellers/Mippithedork','_blank','noopener'); },
  steam(){ document.querySelector('a[href*="steamcommunity.com"]')?.click(); },
  'unreal source'(){ window.open('https://unrealsource.com/','_blank','noopener'); },
  learning(){ window.open('https://dev.epicgames.com/community/unreal-engine/learning?source=epic_games&types=tutorial,course,talks_and_demos,livestream,learning_path,knowledge_base,recommended_community_tutorial','_blank','noopener'); },
  heavywater(){ document.querySelector('.heavy-water')?.scrollIntoView({behavior:'smooth'}); },
  azure(){ document.querySelector('.azure-altar')?.scrollIntoView({behavior:'smooth'}); },
  unmark(){ document.querySelector('.unmark-feature')?.scrollIntoView({behavior:'smooth'}); },
  nda(){ jumpTo('career'); consolePrint('ACCESS DENIED: NDA still stronger than console privileges.','warn'); },
  particles(){ const active=!document.body.classList.contains('particle-boost'); setParticleBoost(active); consolePrint(`PARTICLES ${active?'ON // screen-space particle field and scene boost enabled':'OFF'}.`,'good'); },
  hero(){ window.scrollTo({top:0,behavior:'smooth'}); consolePrint('Hero scene reacquired. Drag to rotate. Click a signal to navigate.'); },
  compile(){ openConsole(false); openCompile(); consolePrint('Shader compilation started. This may take a while. Possibly geological.','warn'); },
  shipit(){ consolePrint(randomLine(['SHIP IT. What could possibly go wrong?','Packaging... 99%... still 99%...','Release candidate renamed FINAL_final_v7_REAL.'])); },
  joke(){ consolePrint(randomLine(['Why did the Blueprint cross the road? It had a hard reference to the other side.','The build is stable until someone says the build is stable.','A designer walks into a bar. The navmesh says unreachable.'])); },
  ufo(){ spawnGalaga(true); consolePrint('UFO // forced arcade contact spawned. It may shoot back.','good'); },
  twinkle(){ spawnGamePickup('star',true); consolePrint('TWINKLE // star pickup spawned.','good'); },
  shroom(){ spawnGamePickup('1up',true); consolePrint('SHROOM // mushroom pickup spawned.','good'); },
  rupee(){ spawnGamePickup('rupee',true); consolePrint(`RUPEE // currency pickup spawned. Current wallet: ${rupeeWallet}.`,'good'); },
  shop(){ openShop(); },
  'hey listen'(){ spawnGamePickup('heart',true); consolePrint('HEY LISTEN // heart pickup spawned.','good'); },
  stars(){ consolePrint(`Watch the sky after Epic progression is unlocked. Each Shooting Star powers one wish. Charge: ${wishCharge}/1.`); },
  vibe(){ setVibe(!vibeEnabled); consolePrint(`AI MODE ${vibeEnabled?'ENABLED':'DISABLED'}${vibeEnabled?' // confidence 93% // understanding pending':''}.`,vibeEnabled?'good':''); },
  play(){ openFlappyGame(); consolePrint('PLAY // Mippi Bird launched. Click to flap. Try not to scope-creep into a full game.','good'); },
  wish(){
    if(!hasWishCharge()){
      consolePrint('WISH // no celestial charge. Something just noticed the request.','warn');
      scheduleWishShootingStar();
      return;
    }
    consolePending='wish'; consolePrint('What is your wish? // CELESTIAL CHARGE 1/1','good'); updateConsoleWishGuide();
  },
  'stat fps'(){ const next=statMode==='fps'?null:'fps'; setStatMode(next); consolePrint(`STAT FPS ${next?'ON':'OFF'}.`,'good'); },
  'stat unit'(){ const next=statMode==='unit'?null:'unit'; setStatMode(next); consolePrint(`STAT UNIT ${next?'ON':'OFF'}.`,'good'); },
  'stat none'(){ setStatMode(null); consolePrint('Stats hidden.'); },
  blueprint(){ openBlueprint(); consolePrint('Opening BP_WishManager. There may be a familiar runtime problem in here.'); },
  slowmo(){ setSlowmo(!slowmoEnabled); consolePrint(`SLOWMO ${slowmoEnabled?'0.5x':'1.0x'} // ${slowmoEnabled?'flying objects and hostile projectiles slowed; Mippi Bird gravity softened':'flying objects and hostile projectiles restored; Mippi Bird physics normal'}.`,'good'); },
  'easy mode'(){
    easyModeEnabled=!easyModeEnabled;
    telemetryCount('modes','easyModeToggles');
    if(easyModeEnabled) telemetryCount('assistance','easyModeUses');
    telemetryMeaningful('easy_mode',{active:easyModeEnabled});
    document.body.classList.toggle('easy-mode',easyModeEnabled);
    if(easyModeTimer){ window.clearInterval(easyModeTimer); easyModeTimer=null; }
    if(easyModeEnabled){
      spawnGamePickup(null,true);
      easyModeTimer=window.setInterval(()=>{
        spawnGamePickup(null,true);
        const roll=Math.random();
        if(roll<.16) spawnShootingStar(true);
        else if(roll<.27) spawnGalaga(true);
      },3200);
    }
    consolePrint(`EASY MODE ${easyModeEnabled?'ON // ambient spawns dramatically increased':'OFF // ambient spawn pacing restored'}.`,'good');
  },
  lumen(){ setLumen(!lumenEnabled); consolePrint(`LUMEN VISUALIZATION ${lumenEnabled?'ON':'OFF'} // sample quality ${lumenEnabled?'questionable':'normal'}.`,lumenEnabled?'warn':'good'); },
  nanite(){ setNanite(!naniteEnabled); consolePrint(`NANITE TRIANGLE VISUALIZATION ${naniteEnabled?'ON':'OFF'}.`,'good'); },
  godmode(){ unlockAllAchievementsGodMode(); },
  'god mode'(){ unlockAllAchievementsGodMode(); },
  please(){
    const star=document.querySelector('.shooting-star');
    if(!star) return consolePrint('PLEASE // manners noted, but there is no shooting star here to ask nicely.','warn');
    consolePrint('PLEASE // the shooting star appreciates your manners.','good');
    star.dataset.telemetryCollectMethod='please';
    star.click();
  },
  'i know mippi'(){
    if(unlockedAchievements.size!==ACHIEVEMENT_KEYS.length) return consolePrint('I KNOW MIPPI // credible claim, insufficient signal completion.','warn');
    if(legendaryUnlocked) return consolePrint('I KNOW MIPPI // Legendary is already unlocked. Name-dropping succeeded retroactively.','good');
    unlockLegendaryMode();
    consolePrint('I KNOW MIPPI // okay, that checks out. Legendary unlocked.','good');
  }
};
consoleClose?.addEventListener('click', () => openConsole(false));
function executeConsoleCommand(raw,{recordHistory=true}={}){
  raw=String(raw||'').trim();
  if(!raw)return;
  if(recordHistory){consoleHistory.push(raw);consoleHistoryIndex=consoleHistory.length;}
  consolePrint(`> ${raw}`,'cmd');
  if(consolePending==='reset_confirmation'){
    consolePending=null;
    if(raw.toLowerCase()==='reset')performFullReset();else consolePrint('FULL RESET // cancelled. Nothing changed.','good');
    if(consoleInput)consoleInput.value='';return;
  }
  if(consolePending==='wish'){
    consolePending=null;
    const wishText=raw;
    telemetryCount('wish','attempts');telemetryMeaningful('wish_attempt',{validated:wishHasIsValid});
    consolePrint('Your wish is being granted.','good');
    const wrap=document.createElement('div');wrap.className='console-progress';const bar=document.createElement('i');wrap.appendChild(bar);consoleOutput?.appendChild(wrap);
    let progress=0;const timer=setInterval(()=>{
      progress+=Math.floor(8+Math.random()*15);bar.style.width=`${Math.min(progress,100)}%`;consoleOutput.scrollTop=consoleOutput.scrollHeight;
      if(progress>=100){clearInterval(timer);setTimeout(()=>{
        if(wishHasIsValid)grantValidatedWish(wishText);
        else{
          telemetryCount('wish','failed');telemetryMeaningful('wish_failed',{reason:'invalid_reference'});wishBlueprintErrorActive=true;updateConsoleAttention();
          consolePrint('ERROR: Blueprint Runtime Error: Accessed None trying to read property WishFulfillment.','warn');
          consolePrint('Suggestion: add an IsValid node and try believing harder.');
          consolePrintAction('[FIX NOW] Open Blueprint',()=>{openBlueprint();},{className:'warn'});
          consolePrint('CELESTIAL CHARGE PRESERVED // fix the reference and try wish again.','good');updateMetaTrace();
        }
      },220);}
    },120);
    if(consoleInput)consoleInput.value='';return;
  }
  const normalized=raw.toLowerCase().replace(/\s+/g,' ').trim();
  const isDevCommand=normalized==='dev'||normalized.startsWith('dev ');
  const command=isDevCommand?'dev':(COMMANDS[normalized]?normalized:normalized.split(' ')[0]);
  const hiddenCommands=new Set(['godmode','god mode','please','i know mippi']);
  const valid=Boolean(COMMANDS[command]);
  if(command!=='dev')telemetryRecordCommand(valid?command:'unknown',{valid,hidden:hiddenCommands.has(command)});
  if(COMMANDS[command])COMMANDS[command](isDevCommand?normalized.slice(3).trim():'');else consolePrint(`Unknown command: ${normalized}. Type help.`,'warn');
  if(consoleInput)consoleInput.value='';
}
consoleForm?.addEventListener('submit',event=>{event.preventDefault();executeConsoleCommand(consoleInput?.value||'');});
consoleOutput?.addEventListener('click',event=>{
  const button=event.target.closest?.('[data-console-command]');if(!button)return;
  const command=button.dataset.consoleCommand;if(!command)return;
  executeConsoleCommand(command);
});

consoleInput?.addEventListener('keydown', event => {
  if (event.key === 'ArrowUp' && consoleHistory.length) { event.preventDefault(); consoleHistoryIndex = Math.max(0, consoleHistoryIndex - 1); consoleInput.value = consoleHistory[consoleHistoryIndex] || ''; }
  if (event.key === 'ArrowDown' && consoleHistory.length) { event.preventDefault(); consoleHistoryIndex = Math.min(consoleHistory.length, consoleHistoryIndex + 1); consoleInput.value = consoleHistory[consoleHistoryIndex] || ''; }
});

window.addEventListener('keydown', event => {
  const key = event.key.toLowerCase();
  if ((event.key === '`' || event.key === '~') && document.activeElement !== consoleInput) {
    event.preventDefault();
    openConsole(!devConsole?.classList.contains('open'));
    return;
  }
  if (event.key === 'Escape' && shopPopup?.classList.contains('open')) { closeShop(); return; }
  if (event.key === 'Escape' && unrealGiftPopup?.classList.contains('open')) { closeUnrealGift(); return; }
  if (event.key === 'Escape' && blenderPopup?.classList.contains('open')) { if(blenderOk?.disabled) return; closeBlenderPopup(); return; }
  if (event.key === 'Escape' && wishContactPopup?.classList.contains('open')) { closeWishContact(); return; }
  if (event.key === 'Escape' && compilePopup?.classList.contains('open')) { cancelCompile(); return; }
  if (event.key === 'Escape' && blueprintPopup?.classList.contains('open')) { closeBlueprint(); return; }
  if (event.key === 'Escape' && devConsole?.classList.contains('open')) { openConsole(false); return; }
  const expectedKonami = KONAMI[konamiIndex];
  const konamiKey = expectedKonami?.startsWith('arrow') ? (KONAMI_DIRECTIONS[key] || key) : key;
  if (konamiKey === expectedKonami) {
    konamiIndex += 1;
    if (konamiIndex === KONAMI.length) {
      showAchievement('konami');
      konamiIndex = 0;
    }
  } else {
    const firstKey = KONAMI_DIRECTIONS[key] || key;
    konamiIndex = firstKey === KONAMI[0] ? 1 : 0;
  }
});


// Inspect and Design Mode share a layout-neutral floating tooltip. Neither mode is
// allowed to change positioning, hit testing, or geometry of the annotated target.
const inspectTooltip=document.createElement('div'); inspectTooltip.className='inspect-tooltip'; document.body.appendChild(inspectTooltip);
let inspectTarget=null;
window.addEventListener('pointermove',event=>{
  const designActive=document.body.classList.contains('design-mode');
  const inspectActive=document.body.classList.contains('inspect-mode');
  const selector=designActive?'[data-design-note]':inspectActive?'[data-dev-note]':null;
  if(selector){
    const target=event.target.closest?.(selector);
    const note=designActive?target?.dataset?.designNote:target?.dataset?.devNote;
    if(target && note){
      if(inspectTarget!==target){
        const inspectKey=target.id||target.classList?.[0]||target.tagName.toLowerCase();
        if(designActive){
          telemetryCount('modes','designHoverCount');
          telemetryUnique('modes','designTargets',inspectKey);
          telemetryMeaningful('design_note',{target:inspectKey});
        }else{
          const alreadyInspected=(sessionTelemetry.modes?.inspectTargets||[]).includes(inspectKey);
          telemetryCount('modes','inspectHoverCount');
          telemetryUnique('modes','inspectTargets',inspectKey);
          if(!alreadyInspected) telemetryMeaningful('inspect_target',{target:inspectKey});
          else if(objectiveEventSink) objectiveEventSink('inspect_target',{target:inspectKey});
        }
      }
      inspectTarget=target;
      inspectTooltip.textContent=note;
      inspectTooltip.classList.toggle('design',designActive);
      inspectTooltip.classList.add('show');
      const pad=14, w=Math.min(460,window.innerWidth-28); let x=event.clientX+16, y=event.clientY+18;
      if(x+w>window.innerWidth-pad) x=Math.max(pad,event.clientX-w-16);
      if(y+120>window.innerHeight-pad) y=Math.max(pad,event.clientY-120);
      inspectTooltip.style.left=`${x}px`; inspectTooltip.style.top=`${y}px`;
      const tipRect=inspectTooltip.getBoundingClientRect();
      if(tipRect.bottom>window.innerHeight-pad) inspectTooltip.style.top=`${Math.max(pad,window.innerHeight-tipRect.height-pad)}px`;
      if(tipRect.right>window.innerWidth-pad) inspectTooltip.style.left=`${Math.max(pad,window.innerWidth-tipRect.width-pad)}px`;
    }else if(inspectTarget){inspectTarget=null;inspectTooltip.classList.remove('show','design');}
  }else{inspectTarget=null;inspectTooltip.classList.remove('show','design');}
},{passive:true});

// Doug emits actual visible paw particles from the photo position.
function burstDougPaws(count=5,sourceEl=null){
  const img=sourceEl?.matches?.('img')?sourceEl:(sourceEl?.querySelector?.('img')||document.querySelector('.doug-photo')); if(!img) return;
  const r=img.getBoundingClientRect();
  const symbols=['🐾','🐾','❤','♥'];
  for(let i=0;i<count;i++){
    const paw=document.createElement('span'); paw.className='doug-paw'; paw.textContent=symbols[Math.floor(Math.random()*symbols.length)];
    paw.style.left=`${r.left+r.width*(.28+Math.random()*.44)}px`; paw.style.top=`${r.top+r.height*(.28+Math.random()*.42)}px`;
    paw.style.setProperty('--dx',`${(Math.random()-.5)*190}px`); paw.style.setProperty('--dy',`${-70-Math.random()*135}px`); paw.style.setProperty('--rot',`${(Math.random()-.5)*80}deg`);
    if(paw.textContent.includes('❤')||paw.textContent.includes('♥')) paw.style.color=document.body.classList.contains('theme-legendary')?'#ffd766':document.body.classList.contains('theme-complete')?'#ff63ca':'#e98aa9';
    document.body.appendChild(paw); setTimeout(()=>paw.remove(),1350);
  }
}
// Doug pet feedback is handled by the shared petDoug() interaction above.

// Completion-theme cursor aura and trail.
const cursorAura=document.createElement('div'); cursorAura.className='completion-cursor-aura'; document.body.appendChild(cursorAura);
const powerCursor=document.createElement('div'); powerCursor.className='power-cursor'; powerCursor.setAttribute('aria-hidden','true'); document.body.appendChild(powerCursor);
let starPowerTimer=null, starPowerBurstTimer=null;
const announcedSystemCombos=new Set(Array.isArray(sessionTelemetry.combos?.announced)?sessionTelemetry.combos.announced:[]);
function announceSystemCombo(id,title,detail){
  if(announcedSystemCombos.has(id)) return;
  announcedSystemCombos.add(id);
  telemetryUnique('combos','announced',id);
  telemetryMeaningful('system_combo',{id});
  consolePrint(`SYSTEM COMBO // ${title.toUpperCase()} // ${detail}`,'good');
  showTransientToast('SYSTEM COMBO',detail,title.toUpperCase(),'INTERACTION');
}
function updatePowerCursor(){
  document.body.classList.toggle('cursor-grown',cursorPowerLevel>0);
  document.body.classList.toggle('cursor-power-1',cursorPowerLevel===1);
  document.body.classList.toggle('cursor-power-2',cursorPowerLevel===2);
  powerCursor.dataset.level=String(cursorPowerLevel);
}
function advanceCursorPower(){
  cursorPowerLevel=(cursorPowerLevel+1)%3;
  updatePowerCursor();
  const legendary=document.body.classList.contains('theme-legendary');
  const rangeNote=legendary&&cursorPowerLevel>0?' Legendary targeting range increased.':legendary&&cursorPowerLevel===0?' Legendary targeting range returned to normal.':'';
  const lifeNote=` Mippi Bird life progress: ${mushroomLifeProgress}/20.`;
  const message=(cursorPowerLevel===1?'MUSHROOM ACQUIRED // cursor size increased.':cursorPowerLevel===2?'MUSHROOM ACQUIRED // cursor at maximum size. Please point responsibly.':'MUSHROOM ACQUIRED // cursor wrapped back to normal size.')+rangeNote+lifeNote;
  consolePrint(message,'good');
  showTransientToast('MUSHROOM ACQUIRED',(cursorPowerLevel===1?'Your cursor grew.':cursorPowerLevel===2?'Your cursor grew again. This is probably enough.':'Power cycle complete. Cursor returned to normal.')+rangeNote+lifeNote,`CURSOR // ${cursorPowerLevel===0?'NORMAL':cursorPowerLevel===1?'BIG':'VERY BIG'} · SHROOMS ${mushroomLifeProgress}/20`,'POWER-UP');
  if(legendary&&cursorPowerLevel>0){
    telemetryCount('combos','legendaryMushroom');
    announceSystemCombo('legendary-mushroom','Mushroom + Legendary','A larger cursor also expands Legendary target acquisition.');
  }
}
function emitRainbowCursorSpark(){
  const colors=['#ff3b30','#ff9500','#ffcc00','#34c759','#00c7be','#0a84ff','#bf5af2','#ff2d55'];
  for(let i=0;i<3;i++){
    const p=document.createElement('i'); p.className='rainbow-cursor-spark';
    const a=Math.random()*Math.PI*2, r=10+Math.random()*30;
    p.style.left=`${latestPointer.x+Math.cos(a)*r}px`; p.style.top=`${latestPointer.y+Math.sin(a)*r}px`;
    p.style.background=colors[Math.floor(Math.random()*colors.length)];
    p.style.setProperty('--rx',`${Math.cos(a)*(36+Math.random()*42)}px`); p.style.setProperty('--ry',`${Math.sin(a)*(36+Math.random()*42)}px`);
    document.body.appendChild(p); setTimeout(()=>p.remove(),620);
  }
}
function collectStarPowerHoverTarget(){
  if(!document.body.classList.contains('star-power')) return;
  const hit=document.elementFromPoint(latestPointer.x,latestPointer.y)?.closest?.('.shooting-star,.galaga-secret,.game-pickup,.doug-bone');
  if(!hit?.isConnected || hit.dataset.starPowerHit==='1') return;
  const repeatableBoss=hit.classList.contains('boss-ufo');
  hit.dataset.starPowerHit='1';
  hit.dataset.telemetryCollectMethod='star_power';
  hit.click();
  if(repeatableBoss){
    window.setTimeout(()=>{ if(hit?.isConnected) delete hit.dataset.starPowerHit; },700);
  }
}
function activateStarPower(){
  telemetryCount('modes','starPowerActivations');
  telemetryMeaningful('star_power');
  document.body.classList.remove('star-power'); void document.body.offsetWidth; document.body.classList.add('star-power');
  clearTimeout(starPowerTimer); clearInterval(starPowerBurstTimer);
  for(let i=0;i<9;i++) setTimeout(emitRainbowCursorSpark,i*45);
  starPowerBurstTimer=setInterval(()=>{ emitRainbowCursorSpark(); collectStarPowerHoverTarget(); },70);
  const starPowerDuration=shopHasEquipped('star-extender')?5600:3600;
  starPowerTimer=setTimeout(()=>{ document.body.classList.remove('star-power'); clearInterval(starPowerBurstTimer); starPowerBurstTimer=null; },starPowerDuration);
  consolePrint('STAR POWER // temporary rainbow cursor effect enabled. Flying objects are collected on contact.','good');
}
let lastSpark=0;
const latestPointer={x:window.innerWidth/2,y:window.innerHeight/2};
window.addEventListener('blur',()=>document.body.classList.add('cursor-window-inactive'));
window.addEventListener('focus',()=>document.body.classList.remove('cursor-window-inactive'));
document.addEventListener('pointerleave',()=>document.body.classList.add('cursor-window-inactive'));
document.addEventListener('pointerenter',()=>document.body.classList.remove('cursor-window-inactive'));
window.addEventListener('pointermove',event=>{
  latestPointer.x=event.clientX; latestPointer.y=event.clientY;
  powerCursor.style.left=`${event.clientX}px`; powerCursor.style.top=`${event.clientY}px`;
  cursorAura.style.left=`${event.clientX}px`; cursorAura.style.top=`${event.clientY}px`;
  if(!document.body.classList.contains('theme-complete') || reduceMotion) return;
  const legendary=document.body.classList.contains('theme-legendary');
  // Legendary previously emitted as many as three costly glowing DOM particles
  // per mousemove, up to ~166/s. While shooting, keep the visual feedback but
  // throttle those sparks so they cannot compound the projectile workload.
  const shooting=legendary && legendaryActiveShots.length>0;
  const now=performance.now();
  if(now-lastSpark<(shooting?110:legendary?34:45))return;
  lastSpark=now;
  const count=shooting?1:legendary?2:1;
  for(let i=0;i<count;i++){
    const spark=document.createElement('i'); spark.className='cursor-spark';
    spark.style.left=`${event.clientX+(legendary?(Math.random()-.5)*8:0)}px`;
    spark.style.top=`${event.clientY+(legendary?(Math.random()-.5)*8:0)}px`;
    if(legendary){
      const legendarySpark=['#fff0b5','#ffbd2f','#ff7a1a','#43e0dc','#ffffff'];
      spark.style.background=legendarySpark[Math.floor(Math.random()*legendarySpark.length)];
      const size=3+Math.random()*4;
      spark.style.width=`${size}px`; spark.style.height=`${size}px`;
      spark.style.boxShadow=`0 0 12px ${spark.style.background},0 0 26px ${spark.style.background}`;
      spark.style.setProperty('--dx',`${(Math.random()-.5)*72}px`);
      spark.style.setProperty('--dy',`${(Math.random()-.5)*72}px`);
      spark.style.animationDuration=`${1.35+Math.random()*.55}s`;
      document.body.appendChild(spark); setTimeout(()=>spark.remove(),2050);
    } else {
      spark.style.background=Math.random()>.45?'#67e8ff':'#ff4fc8';
      spark.style.boxShadow=`0 0 9px ${spark.style.background}`;
      spark.style.setProperty('--dx',`${(Math.random()-.5)*34}px`); spark.style.setProperty('--dy',`${(Math.random()-.5)*34}px`);
      document.body.appendChild(spark); setTimeout(()=>spark.remove(),800);
    }
  }
},{passive:true});

function explodeAt(x,y,count=18,size=5,{radiusX=150,radiusY=120,lifetime=850}={}){
  const colors=document.body.classList.contains('theme-legendary')?['#fff0b5','#ffc83d','#ff7a1a','#43e0dc','#ffffff']:['#67e8ff','#ff4fc8','#b13cff','#ffffff'];
  for(let i=0;i<count;i++){ const p=document.createElement('i');p.className='arcade-pixel';p.style.left=`${x}px`;p.style.top=`${y}px`;p.style.width=`${size}px`;p.style.height=`${size}px`;p.style.background=colors[i%colors.length];p.style.setProperty('--dx',`${(Math.random()-.5)*radiusX}px`);p.style.setProperty('--dy',`${(Math.random()-.5)*radiusY}px`);p.style.animationDuration=`${lifetime}ms`;document.body.appendChild(p);setTimeout(()=>p.remove(),lifetime+90); }
}

function showArcadeCursorHit(x,y){
  arcadeCursorHits++;
  telemetryCount('arcade','cursorHits');
  telemetryMeaningful('ufo_projectile_hit',{count:arcadeCursorHits});
  const flash=document.createElement('i');
  flash.className='arcade-hit-flash';
  flash.style.setProperty('--hit-x',`${Math.max(0,Math.min(window.innerWidth,x))/window.innerWidth*100}%`);
  flash.style.setProperty('--hit-y',`${Math.max(0,Math.min(window.innerHeight,y))/window.innerHeight*100}%`);
  document.body.appendChild(flash);
  window.setTimeout(()=>flash.remove(),360);
  explodeAt(x,y,7);
  if(arcadeCursorHits===1) consolePrint('ARCADE HIT // cosmetic damage only. Your resume remains unharmed.','warn');
}
function fireUfoProjectile(ship,{offsetX=0,offsetY=0}={}){
  if(!ship?.isConnected || reduceMotion) return;
  telemetryCount('arcade','hostileShots');
  const r=ship.getBoundingClientRect();
  const sx=r.left+r.width/2, sy=r.top+r.height/2;
  const tx=latestPointer.x+offsetX, ty=latestPointer.y+offsetY;
  const dx=tx-sx, dy=ty-sy;
  const distance=Math.hypot(dx,dy);
  if(distance<24) return;

  const shot=document.createElement('i');
  shot.className='ufo-projectile';
  shot.style.left='0px'; shot.style.top='0px';
  document.body.appendChild(shot);

  const duration=Math.max(.24,Math.min(.95,distance/820))*directorProjectileDurationMultiplier()*(slowmoEnabled?2:1);
  const speed=distance/Math.max(.08,duration);
  let px=sx,py=sy,last=performance.now(),born=last,raf=0,settled=false;

  if(slowmoEnabled){
    telemetryCount('combos','slowmoHostileShots');
    announceSystemCombo('slowmo-hostile-fire','Slowmo + UFO','Hostile projectiles are slowed too. Fair is fair.');
  }

  const cleanup=()=>{ if(settled)return; settled=true; cancelAnimationFrame(raf); shot.remove(); };
  const step=now=>{
    if(settled || !shot.isConnected){ cleanup(); return; }
    if(!ship.isConnected && now-born>duration*1000+220){ cleanup(); return; }
    const dt=Math.min(.04,(now-last)/1000); last=now;
    const remainingDx=tx-px, remainingDy=ty-py, remaining=Math.hypot(remainingDx,remainingDy);
    const travel=Math.min(remaining,speed*dt);
    if(remaining>0){ px+=remainingDx/remaining*travel; py+=remainingDy/remaining*travel; }
    const angle=Math.atan2(remainingDy,remainingDx)*180/Math.PI;
    shot.style.transform=`translate3d(${px}px,${py}px,0) rotate(${angle}deg)`;

    // Live collision against the current cursor, not the cursor position from fire time.
    if(Math.hypot(px-latestPointer.x,py-latestPointer.y)<=18){
      showArcadeCursorHit(px,py);
      cleanup();
      return;
    }

    if(remaining<=4 || now-born>duration*1000+260){
      explodeAt(px,py,5);
      cleanup();
      return;
    }
    raf=requestAnimationFrame(step);
  };
  raf=requestAnimationFrame(step);

  // Absolute cleanup guard. No hostile projectile is allowed to live forever.
  window.setTimeout(()=>{
    if(settled)return;
    explodeAt(px,py,4);
    cleanup();
  },Math.ceil(duration*1000)+700);
}
function nearestFlyingTarget(x,y,maxDistance=null){
  const cursorRangeBonus=cursorPowerLevel*55;
  const acquisition=maxDistance??((shopHasEquipped('golden-trigger')?485:365)+cursorRangeBonus+directorTargetBonus());
  let best=null, bestDistance=acquisition;
  document.querySelectorAll('.shooting-star,.galaga-secret,.game-pickup,.doug-bone').forEach(el=>{
    if(!el.isConnected) return;
    const r=el.getBoundingClientRect();
    const cx=r.left+r.width/2, cy=r.top+r.height/2;
    const d=Math.hypot(cx-x,cy-y);
    if(d<bestDistance){bestDistance=d;best=el;}
  });
  return best;
}

// One simulation loop. Crucially, sampling the CSS-animated target position
// every animation frame forces layout synchronizations while firing. Cache each
// target for 75 ms and let the projectile home toward that cached position.
const legendaryActiveShots=[];
let legendaryShotRaf=0;
const MAX_LEGENDARY_SHOTS=14;
const SHOT_TARGET_SAMPLE_MS=75;
const legendaryTargetPositions=new Map();
function releaseLegendaryShot(shot){
  shot.el.remove();
  const index=legendaryActiveShots.indexOf(shot);
  if(index>=0)legendaryActiveShots.splice(index,1);
  if(!legendaryActiveShots.some(other=>other.target===shot.target)) legendaryTargetPositions.delete(shot.target);
}
function sampleLegendaryTargets(now){
  // Group all geometry reads before ANY projectile transform writes.
  for(const shot of legendaryActiveShots){
    const target=shot.target;
    if(!target?.isConnected)continue;
    const cached=legendaryTargetPositions.get(target);
    if(cached&&now-cached.time<SHOT_TARGET_SAMPLE_MS)continue;
    const r=target.getBoundingClientRect();
    legendaryTargetPositions.set(target,{x:r.left+r.width*.5,y:r.top+r.height*.5,time:now});
  }
}
function tickLegendaryShots(now){
  legendaryShotRaf=0;
  if(!legendaryActiveShots.length)return;
  // A cached center costs no layout work on most frames even with many shots.
  sampleLegendaryTargets(now);
  for(let i=legendaryActiveShots.length-1;i>=0;i--){
    const shot=legendaryActiveShots[i];
    if(!shot.el.isConnected||!shot.target?.isConnected||now-shot.born>1800){releaseLegendaryShot(shot);continue;}
    const pos=legendaryTargetPositions.get(shot.target);
    if(!pos)continue;
    const dx=pos.x-shot.px,dy=pos.y-shot.py,dist=Math.hypot(dx,dy);
    if(dist<23){
      releaseLegendaryShot(shot);
      telemetryCount('arcade','playerHits');
      if(shot.target.isConnected){shot.target.dataset.telemetryCollectMethod='legendary';shot.target.click();}
      continue;
    }
    const dt=Math.min(.035,Math.max(0,(now-shot.last)/1000));shot.last=now;
    const travel=Math.min(dist,(shopHasEquipped('golden-trigger')?1380:1050)*dt);
    if(dist>0){shot.px+=dx/dist*travel;shot.py+=dy/dist*travel;}
    shot.el.style.transform=`translate3d(${shot.px-shot.x}px,${shot.py-shot.y}px,0) rotate(${Math.atan2(dy,dx)*180/Math.PI}deg)`;
  }
  if(legendaryActiveShots.length)legendaryShotRaf=requestAnimationFrame(tickLegendaryShots);
}
function fireLegendaryPlayerShot(x,y,target){
  if(!target?.isConnected)return;
  if(legendaryActiveShots.length>=MAX_LEGENDARY_SHOTS)releaseLegendaryShot(legendaryActiveShots[0]);
  telemetryCount('arcade','playerShots');
  const el=document.createElement('i');el.className='legendary-player-projectile';
  el.style.left=`${x}px`;el.style.top=`${y}px`;
  document.body.appendChild(el);
  const now=performance.now();
  legendaryActiveShots.push({el,target,x,y,px:x,py:y,born:now,last:now});
  if(!legendaryShotRaf)legendaryShotRaf=requestAnimationFrame(tickLegendaryShots);
}

document.addEventListener('pointerdown',event=>{
  if(event.button!==0 || !legendaryGameplayUnlocked()) return;
  if(event.target.closest('.shooting-star,.galaga-secret,.game-pickup,.doug-bone,.legendary-player-projectile,.ufo-projectile')) return;
  if(event.target.closest('a,button,input,textarea,select,label,.dev-console,.azure-gallery,.flappy-game')) return;
  const target=nearestFlyingTarget(event.clientX,event.clientY);
  if(target) fireLegendaryPlayerShot(event.clientX,event.clientY,target);
});

function randomEdgeFlight(margin=220){
  const w=window.innerWidth,h=window.innerHeight;
  const edge=Math.floor(Math.random()*4);
  let sx,sy,ex,ey;
  if(edge===0){ sx=-margin; sy=h*(.08+Math.random()*.74); ex=w+margin; ey=h*(.06+Math.random()*.82); }
  else if(edge===1){ sx=w+margin; sy=h*(.08+Math.random()*.74); ex=-margin; ey=h*(.06+Math.random()*.82); }
  else if(edge===2){ sx=w*(.08+Math.random()*.84); sy=-margin; ex=w*(.06+Math.random()*.88); ey=h+margin; }
  else { sx=w*(.08+Math.random()*.84); sy=h+margin; ex=w*(.06+Math.random()*.88); ey=-margin; }
  const dx=ex-sx,dy=ey-sy,angle=Math.atan2(dy,dx)*180/Math.PI;
  return {sx,sy,dx,dy,angle};
}
function spawnShootingStar(force=false){
  if((!epicGameplayUnlocked()||reduceMotion) && !force) return false;
  if(hasWishCharge() && !force) return false;
  if(!directorAllowsAmbient('shooting_star',{force})) return false;
  const f=randomEdgeFlight(240);
  const star=document.createElement('button'); star.className='shooting-star fly'; star.type='button'; star.setAttribute('aria-label','A bright shooting star'); star.dataset.telemetryKind='shooting_star';
  telemetryFlyingSpawn('shooting_star',{forced:force}); telemetryCount('wish','shootingStarsSpawned');
  star.style.left=`${f.sx}px`; star.style.top=`${f.sy}px`; star.style.setProperty('--dx',`${f.dx}px`); star.style.setProperty('--dy',`${f.dy}px`); star.style.setProperty('--angle',`${f.angle}deg`); setFlightDuration(star,(shopOwns('celestial-beacon')?3.4:2.05)+Math.random()*(shopOwns('celestial-beacon')?1.55:1.15));
  star.addEventListener('click',()=>{ 
    const method=telemetryCollectionMethod(star); telemetryFlyingCollect('shooting_star',method); telemetryCount('wish','shootingStarsCollected');
    const r=star.getBoundingClientRect(); explodeAt(r.left+r.width/2,r.top+r.height/2,24);
    const first=!hasWish();
    grantWishCharge('CELESTIAL SIGNAL');
    if(!first) consolePrint('SHOOTING STAR COLLECTED // WISH CHARGE 1/1.','good');
    star.remove();
  });
  document.body.appendChild(star); directorNoteFriendlyAmbient(); removeWhenFlightEnds(star);
  return true;
}
function ufoCycleProgress(){return Math.min(10,invasionWaveKills);}
function ufoThreatTier(){return invasionWaveKills>=7?3:invasionWaveKills>=4?2:1;}
function totalBossVictories(){
  return (Number(sessionTelemetry.arcade?.bossDefeated)||0)+(Number(sessionTelemetry.arcade?.superBossDefeated)||0);
}
// A single, explicit wave counter. No modulo-based kill threshold or
// recursive queue may reset the HUD while a fight is unresolved.
function maybeSpawnUfoBoss(){
  if(ufoBossActive||superBossActive||invasionSpawnQueued)return;
  if(!invasionEncounterPending && invasionWaveKills<10)return;
  if(invasionEncounterPending && invasionBossRetryKills>0)return;
  invasionEncounterPending=true;
  const superFight=(totalBossVictories()+1)%3===0;
  invasionSpawnQueued=true;
  showTransientToast(superFight?'SUPER BOSS INBOUND':'BOSS INBOUND',superFight?'Super contact in the next encounter.':'Ten UFO contacts acquired.','INVASION // CONTACT','ARCADE');
  const attempt=()=>{
    if(ufoBossActive||superBossActive){invasionSpawnQueued=false;return;}
    if(!easyModeEnabled&&directorAttentionBlocked()){window.setTimeout(attempt,900);return;}
    invasionSpawnQueued=false;
    if(superFight)spawnSuperBoss(true);else spawnBossUfo(true);
  };
  window.setTimeout(attempt,900);
}
function resolveInvasionBossVictory(){
  invasionEncounterPending=false;invasionSpawnQueued=false;invasionBossRetryKills=0;invasionWaveKills=0;
  updateInvasionMeter();
}
function resolveInvasionBossEscape(){
  invasionEncounterPending=true;invasionBossRetryKills=4;
  updateInvasionMeter();
}
function registerUfoKill(method='direct',x=latestPointer.x,y=latestPointer.y){
  ufoKills++;
  if(invasionEncounterPending){
    if(invasionBossRetryKills>0)invasionBossRetryKills--;
  }else invasionWaveKills=Math.min(10,invasionWaveKills+1);
  telemetryCount('arcade','ufoDestroyed');
  telemetryFlyingCollect('ufo',method);
  if(method==='star_power'){
    telemetryCount('combos','starPowerUfoKills');
    announceSystemCombo('star-power-ufo','Star Power + UFO','Star Power turns cursor contact into anti-air.');
  }
  const droppedRupee=Math.random()<.30;
  if(droppedRupee){
    awardArcadeRupees(1,x,y,'ufo');
    telemetryCount('economy','ufoRupeeDrops');
  }
  const toward=invasionWaveKills;
  consolePrint(`ARCADE CONTACT DESTROYED // +100 definitely-real points${droppedRupee?' // +1 RUPEE':''} // UFOs ${toward}/10`,'good');
  if(toward===5){
    consolePrint('ARCADE NETWORK // hostile response increasing. Apparently they have analytics too.','warn');
    showTransientToast('ARCADE NETWORK','Hostile response is increasing.','5 / 10 CONTACTS','ESCALATION');
  }else if(toward===8){
    consolePrint('ARCADE NETWORK // formation aggression elevated. Something larger is paying attention.','warn');
  }
  updateInvasionMeter();
  maybeSpawnUfoBoss();
}
function spawnBossUfo(force=false){
  if(ufoBossActive || superBossActive) return;
  if((!epicGameplayUnlocked()||reduceMotion) && !force) return;
  ufoBossActive=true;
  updateInvasionMeter();
  telemetryCount('arcade','bossSpawned');
  telemetryFlyingSpawn('boss_ufo',{forced:force});
  telemetryMeaningful('boss_spawned');
  const f=randomEdgeFlight(180);
  const ship=document.createElement('button');
  ship.className='galaga-secret boss-ufo fly'; ship.type='button'; ship.setAttribute('aria-label','Arcade boss UFO, core integrity six of six'); ship.dataset.devNote='ARCADE NOTE // Ten regular UFO defeats escalate into a multi-hit boss contact.'; ship.dataset.designNote='DESIGN NOTE // ESCALATION // Repeated one-hit UFOs establish a familiar rhythm before a six-hit Boss asks for sustained focus. Health is visible, escape shortens reacquisition, and rewards remain small so escalation feels meaningful without turning failure into lost progress.';
  ship.innerHTML='<span class="boss-ufo-label">BOSS</span><span class="boss-ufo-health" aria-hidden="true"><i></i></span><span class="boss-ufo-integrity">CORE 6 / 6</span>';
  ship.style.left=`${f.sx}px`; ship.style.top=`${f.sy}px`; ship.style.setProperty('--dx',`${f.dx}px`); ship.style.setProperty('--dy',`${f.dy}px`); ship.style.setProperty('--angle',`${f.angle}deg`); setFlightDuration(ship,15+Math.random()*4);
  let hp=6;
  const hpFill=ship.querySelector('.boss-ufo-health i');
  const integrity=ship.querySelector('.boss-ufo-integrity');
  const updateHp=()=>{
    if(hpFill) hpFill.style.width=`${Math.max(0,hp)/6*100}%`;
    if(integrity) integrity.textContent=`CORE ${Math.max(0,hp)} / 6`;
    ship.dataset.hp=String(hp);
    ship.setAttribute('aria-label',`Arcade boss UFO, core integrity ${Math.max(0,hp)} of six`);
  };
  updateHp();
  let ufoFireTimer=null;
  let defeated=false;
  const stopBoss=()=>{
    if(ufoFireTimer){window.clearInterval(ufoFireTimer);ufoFireTimer=null;}
    if(ship.isConnected) ship.remove();
    ufoBossActive=false;
    window.setTimeout(maybeSpawnUfoBoss,900);
  };
  const bossVolley=()=>{
    if(!ship.isConnected) return;
    if(hp>=5){
      fireUfoProjectile(ship);
      window.setTimeout(()=>fireUfoProjectile(ship),150);
    }else if(hp>=3){
      fireUfoProjectile(ship,{offsetX:-46});
      window.setTimeout(()=>fireUfoProjectile(ship,{offsetX:46}),120);
      window.setTimeout(()=>fireUfoProjectile(ship),240);
    }else{
      fireUfoProjectile(ship,{offsetX:-82,offsetY:18});
      window.setTimeout(()=>fireUfoProjectile(ship,{offsetY:-26}),95);
      window.setTimeout(()=>fireUfoProjectile(ship,{offsetX:82,offsetY:18}),190);
    }
  };
  ship.addEventListener('click',()=>{
    if(!ship.isConnected) return;
    const method=telemetryCollectionMethod(ship);
    telemetryCount('arcade','bossHits');
    telemetryCount('arcade.bossHitMethods',method);
    if(method==='star_power'){
      telemetryCount('combos','starPowerBossHits');
      announceSystemCombo('star-power-boss','Star Power + Boss','Cursor contact damages the Boss, but only once per brief contact window.');
    }
    hp--;
    const r=ship.getBoundingClientRect(); const cx=r.left+r.width/2, cy=r.top+r.height/2;
    explodeAt(cx,cy,hp<=0?58:10);
    if(hp<=0){
      defeated=true;
      ufoCalmUntil=Date.now()+8000;
      telemetryCount('arcade','bossDefeated'); telemetryFlyingCollect('boss_ufo',method); telemetryMeaningful('boss_defeated',{method}); finaleBossSatisfied=true; try{localStorage.setItem(FINALE_BOSS_KEY,'1');}catch(_){}
      telemetryCount('economy','bossRupeeRewards',3);
      awardArcadeRupees(3,cx,cy,'boss_ufo');
      consolePrint('ARCADE BOSS DESTROYED // +5000 definitely-real points // +3 RUPEES // airspace temporarily clear.','good');
      showTransientToast('BOSS DEFEATED','The large arcade contact has been removed from production. Three rupees recovered.','+3 RUPEES // +5000 DEFINITELY-REAL POINTS','ARCADE');
      resolveInvasionBossVictory();
      stopBoss();
      window.setTimeout(updateInvasionMeter,0);
    }else{
      updateHp();
      ship.classList.add('boss-hit'); window.setTimeout(()=>ship.classList.remove('boss-hit'),140);
      consolePrint(`ARCADE BOSS HIT // ${hp}/6 core integrity remaining.`,'warn');
    }
  });
  ship.addEventListener('animationend',()=>{
    if(defeated) return;
    telemetryCount('arcade','bossEscaped'); telemetryFlyingMiss('boss_ufo'); telemetryMeaningful('boss_escaped');
    resolveInvasionBossEscape();
    ufoCalmUntil=Date.now()+3000;
    consolePrint(`ARCADE BOSS ESCAPED // reacquisition in ${invasionBossRetryKills} more UFO contacts. Progress retained.`,'warn');
    showTransientToast('BOSS ESCAPED','The contact got away, but the next boss opportunity is closer.','REACQUIRE // SHORTENED','ARCADE');
    stopBoss();
    window.setTimeout(updateInvasionMeter,0);
  },{once:true});
  document.body.appendChild(ship);
  ufoFireTimer=window.setInterval(bossVolley,(610+Math.floor(Math.random()*170))*directorHostileCadenceMultiplier());
  window.setTimeout(bossVolley,320);
}
function distancePointToSegment(px,py,x1,y1,x2,y2){
  const vx=x2-x1,vy=y2-y1,wx=px-x1,wy=py-y1;
  const c2=vx*vx+vy*vy;
  const t=c2?Math.max(0,Math.min(1,(wx*vx+wy*vy)/c2)):0;
  const sx=x1+vx*t,sy=y1+vy*t;
  return Math.hypot(px-sx,py-sy);
}
function endSuperBoss(reason='exit'){
  const s=superBossRuntime;
  if(!s) return;
  s.ended=true;
  cancelAnimationFrame(s.raf||0);
  cancelAnimationFrame(s.beamRaf||0);
  for(const raf of s.shotRafs||[]) cancelAnimationFrame(raf);
  s.shotRafs?.clear?.();
  for(const timer of s.timers||[]) window.clearInterval(timer);
  for(const timeout of s.timeouts||[]) window.clearTimeout(timeout);
  document.removeEventListener('keydown',s.keyHandler);
  s.arena?.querySelectorAll('.superboss-bullet,.superboss-rocket,.superboss-laser,.superboss-player-bullet').forEach(el=>el.remove());
  s.arena?.remove();
  superBossRuntime=null;
  superBossActive=false;
  ufoBossActive=false;

  if(s.forcedInteractOff){
    superBossInteractOverride=false;
    syncInteractToggle();
  }

  if(reason==='defeated'){
    resolveInvasionBossVictory();
    ufoCalmUntil=Date.now()+12000;
  }else{
    telemetryCount('arcade','superBossEscaped'); telemetryMeaningful('super_boss_exit',{reason});
    resolveInvasionBossEscape();
    ufoCalmUntil=Date.now()+3500;
    showTransientToast('SUPER BOSS DISENGAGED','Interact state restored. The super contact will remain in the rotation.','EXIT FIGHT // NO PENALTY','ARCADE');
    consolePrint('SUPER BOSS // encounter exited. No penalty. Reacquisition shortened.','warn');
  }
  updateInvasionMeter();
}
function superBossImpact(sourceX,sourceY,strength=90,type='bullet'){
  const s=superBossRuntime;
  if(!s || s.ended || performance.now()<s.hitLockUntil) return;
  s.hitLockUntil=performance.now()+180;
  let dx=s.cursorX-sourceX,dy=s.cursorY-sourceY,dist=Math.hypot(dx,dy);
  if(dist<1){const a=Math.random()*Math.PI*2;dx=Math.cos(a);dy=Math.sin(a);dist=1;}
  s.knockX+=dx/dist*strength;
  s.knockY+=dy/dist*strength;
  const maxKnock=220,km=Math.hypot(s.knockX,s.knockY);
  if(km>maxKnock){s.knockX=s.knockX/km*maxKnock;s.knockY=s.knockY/km*maxKnock;}
  telemetryCount('arcade','superBossCursorHits'); telemetryCount('arcade.superBossHitTypes',type); telemetryMeaningful('super_boss_cursor_hit',{type});
  s.arena.classList.add('cursor-hit');
  window.setTimeout(()=>s.arena?.classList.remove('cursor-hit'),180);
  const hit=document.createElement('i');hit.className='superboss-impact';hit.style.left=`${s.cursorX}px`;hit.style.top=`${s.cursorY}px`;s.arena.appendChild(hit);window.setTimeout(()=>hit.remove(),420);
}
function superBossProjectile({x,y,targetX,targetY,sourceType='bullet',speed=720,radius=21,className='superboss-bullet',homing=false,lifetime=6500}){
  const s=superBossRuntime;if(!s||s.ended)return;
  const el=document.createElement('i');el.className=className;s.arena.appendChild(el);
  let px=x,py=y,angle=Math.atan2(targetY-y,targetX-x),vx=Math.cos(angle)*speed,vy=Math.sin(angle)*speed,last=performance.now(),born=last,raf=0,removed=false;
  const remove=()=>{if(removed)return;removed=true;cancelAnimationFrame(raf);el.remove();};
  const step=now=>{
    if(removed||!el.isConnected||!superBossRuntime||s.ended){remove();return;}
    const dt=Math.min(.034,(now-last)/1000);last=now;
    const timeScale=slowmoEnabled?.55:1;
    if(homing){
      const dx=s.cursorX-px,dy=s.cursorY-py,d=Math.hypot(dx,dy)||1;
      const tx=dx/d*speed,ty=dy/d*speed;
      vx=vx*.94+tx*.06;vy=vy*.94+ty*.06;
      const vm=Math.hypot(vx,vy)||1;vx=vx/vm*speed;vy=vy/vm*speed;
    }
    px+=vx*dt*timeScale;py+=vy*dt*timeScale;
    angle=Math.atan2(vy,vx);
    el.style.transform=`translate3d(${px}px,${py}px,0) rotate(${angle*180/Math.PI}deg)`;
    if(Math.hypot(px-s.cursorX,py-s.cursorY)<radius){
      superBossImpact(x,y,homing?118:78,sourceType);explodeAt(px,py,homing?12:6);remove();return;
    }
    if(now-born>lifetime||px<-120||px>window.innerWidth+120||py<-120||py>window.innerHeight+120){remove();return;}
    raf=requestAnimationFrame(step);
  };
  raf=requestAnimationFrame(step);
  window.setTimeout(remove,lifetime+800);
}
function angleDelta(from,to){
  let delta=(to-from+Math.PI)%(Math.PI*2)-Math.PI;
  if(delta<-Math.PI) delta+=Math.PI*2;
  return delta;
}
function superBossMegaLaser(){
  const s=superBossRuntime;if(!s||s.ended||s.laserActive)return;
  s.laserActive=true;telemetryCount('arcade','superBossLasers');

  const x=s.bossX,y=s.bossY,len=Math.hypot(window.innerWidth,window.innerHeight)*1.4;
  let beamAngle=Math.atan2(s.cursorY-y,s.cursorX-x);
  const beam=document.createElement('div');
  beam.className='superboss-laser charging';
  beam.style.left=`${x}px`;beam.style.top=`${y}px`;beam.style.width=`${len}px`;
  s.arena.appendChild(beam);

  const charge=slowmoEnabled?1250:900;
  const activeDuration=slowmoEnabled?2300:1750;
  const turnRate=slowmoEnabled?.62:.88; // radians per second, deliberately dodgeable
  const born=performance.now();
  let activeStarted=0,last=born,raf=0;

  const sweep=now=>{
    if(!beam.isConnected||s.ended){cancelAnimationFrame(raf);s.laserActive=false;return;}
    const dt=Math.min(.04,(now-last)/1000);last=now;
    const targetAngle=Math.atan2(s.cursorY-y,s.cursorX-x);
    const maxTurn=turnRate*dt;
    const delta=angleDelta(beamAngle,targetAngle);
    beamAngle+=Math.max(-maxTurn,Math.min(maxTurn,delta));
    beam.style.transform=`rotate(${beamAngle}rad)`;

    if(!activeStarted && now-born>=charge){
      activeStarted=now;
      beam.classList.remove('charging');beam.classList.add('active');
    }

    if(activeStarted){
      const x2=x+Math.cos(beamAngle)*len,y2=y+Math.sin(beamAngle)*len;
      if(distancePointToSegment(s.cursorX,s.cursorY,x,y,x2,y2)<34){
        superBossImpact(x,y,165,'mega_laser');
      }
      if(now-activeStarted>=activeDuration){
        beam.remove();s.laserActive=false;cancelAnimationFrame(raf);return;
      }
    }
    raf=requestAnimationFrame(sweep);
    s.beamRaf=raf;
  };
  raf=requestAnimationFrame(sweep);
  s.beamRaf=raf;
}function showSuperBossVictory(state){
  if(!state||!state.arena||state.victoryShown)return;
  state.victoryShown=true; state.ended=true;
  state.arena.classList.add('victory');
  updateInvasionMeter();
  const panel=document.createElement('div'); panel.className='superboss-victory';
  panel.innerHTML='<span>INTERACT OFF // CLEARED</span><strong>VICTORY</strong><b>SUPER BOSS DEFEATED</b><small>+8 RUPEES // AIRSPACE CLEAR</small>';
  state.arena.appendChild(panel);
  consolePrint('SUPER BOSS DESTROYED // VICTORY // +8 RUPEES.','good');
  window.setTimeout(()=>endSuperBoss('defeated'),2350);
}

function spawnSuperBoss(force=false){
  if(superBossActive||ufoBossActive)return;
  superBossActive=true;ufoBossActive=true;
  const interactionWasSuppressed=contentInteractionSuppressed();
  const forcedInteractOff=!interactionWasSuppressed;
  if(forcedInteractOff){ superBossInteractOverride=true; syncInteractToggle(); }
  telemetryCount('arcade','superBossSpawned');telemetryFlyingSpawn('super_boss',{forced:force});telemetryMeaningful('super_boss_spawned');
  document.querySelectorAll('.galaga-secret,.ufo-projectile').forEach(el=>el.remove());
  updateInvasionMeter();
  const arena=document.createElement('section');arena.className='superboss-arena';arena.setAttribute('aria-label','Super Boss arcade encounter');arena.dataset.devNote='ARCADE NOTE // Every third boss victory escalates into a temporary full-screen encounter with adds, rockets, and a mega laser.';arena.dataset.designNote='DESIGN NOTE // FOCUSED ENCOUNTER // The Super Boss borrows the same Interact Off state the player can purchase, so page-lock behavior has one rule instead of two. Adds divide attention, rockets chase, the laser sweeps, and Exit Fight keeps the commitment reversible.';
  arena.innerHTML=`<div class="superboss-vignette" aria-hidden="true"></div><div class="superboss-header"><span>INTERACT OFF // SUPER CONTACT</span><strong>SUPER BOSS</strong><div class="superboss-health"><i></i></div><small>CORE <b>18</b> / 18</small></div><div class="superboss-core" aria-hidden="true"><span></span></div><div class="superboss-add-layer" aria-hidden="true"></div><div class="superboss-cursor" aria-hidden="true"><i></i></div><button class="superboss-exit" type="button">EXIT BOSS FIGHT</button>`;
  document.body.appendChild(arena);
  const boss=arena.querySelector('.superboss-core'),addLayer=arena.querySelector('.superboss-add-layer'),cursor=arena.querySelector('.superboss-cursor'),fill=arena.querySelector('.superboss-health i'),hpText=arena.querySelector('.superboss-header b');
  const state={arena,boss,addLayer,cursor,fill,hpText,hp:18,maxHp:18,bossX:window.innerWidth/2,bossY:Math.max(135,window.innerHeight*.19),pointerX:latestPointer.x,pointerY:latestPointer.y,cursorX:latestPointer.x,cursorY:latestPointer.y,knockX:0,knockY:0,hitLockUntil:0,adds:[],timers:[],timeouts:[],raf:0,beamRaf:0,shotRafs:new Set(),ended:false,laserActive:false,forcedInteractOff,bossMoveClock:0,lastRenderAt:performance.now()};
  superBossRuntime=state;
  for(let i=0;i<4;i++){const el=document.createElement('i');el.className='superboss-add';el.dataset.add=String(i);addLayer.appendChild(el);state.adds.push({el,alive:true,x:0,y:0,phase:i*Math.PI/2});}
  const updateHealth=()=>{const pct=Math.max(0,state.hp/state.maxHp*100);state.fill.style.width=`${pct}%`;state.hpText.textContent=String(Math.max(0,state.hp));};updateHealth();
  const destroyAdd=add=>{
    if(!add.alive)return;
    add.alive=false;
    telemetryCount('arcade','superBossAddsDestroyed');telemetryMeaningful('super_boss_add_destroyed');
    const x=add.x,y=add.y;
    add.el.classList.add('destroyed');
    explodeAt(x,y,30);
    window.setTimeout(()=>add.el.remove(),90);
  };
  const damageBoss=(method='direct')=>{if(state.ended)return;state.hp--;telemetryCount('arcade','superBossHits');telemetryCount('arcade.superBossHitMethods',method);telemetryMeaningful('super_boss_hit',{method,hp:state.hp});explodeAt(state.bossX,state.bossY,state.hp<=0?82:12);updateHealth();arena.classList.add('boss-hit');window.setTimeout(()=>arena.classList.remove('boss-hit'),120);if(state.hp<=0){telemetryCount('arcade','superBossDefeated');telemetryFlyingCollect('super_boss',method);telemetryMeaningful('super_boss_defeated',{method}); finaleBossSatisfied=true; postgameSuperBossDefeated=true; try{localStorage.setItem(FINALE_BOSS_KEY,'1');localStorage.setItem(POSTGAME_SUPERBOSS_KEY,'1');}catch(_){}evaluatePostgameAchievements();telemetryCount('economy','superBossRupeeRewards',8);awardArcadeRupees(8,state.bossX,state.bossY,'super_boss');showSuperBossVictory(state);}};
  const onMove=e=>{state.pointerX=e.clientX;state.pointerY=e.clientY;};
  const fireBossPlayerShot=()=>{
    if(state.ended)return;
    const shot=document.createElement('i');
    shot.className='superboss-player-bullet';
    arena.appendChild(shot);
    telemetryCount('arcade','playerShots');

    const x=state.cursorX;
    let y=state.cursorY-10;
    let last=performance.now();
    const born=last;
    const speed=slowmoEnabled?1050:1500;
    let raf=0,removed=false;

    const remove=()=>{
      if(removed)return;
      removed=true;
      cancelAnimationFrame(raf);
      state.shotRafs.delete(raf);
      shot.remove();
    };
    const hitSegment=(targetX,targetY,radius,fromY,toY)=>distancePointToSegment(targetX,targetY,x,fromY,x,toY)<=radius;
    const step=now=>{
      state.shotRafs.delete(raf);
      if(removed||state.ended||!shot.isConnected){remove();return;}
      const dt=Math.min(.034,(now-last)/1000);last=now;
      const nextY=y-speed*dt;

      let hitAdd=null;
      for(const add of state.adds){
        if(!add.alive)continue;
        if(hitSegment(add.x,add.y,28,y,nextY)){hitAdd=add;break;}
      }
      if(hitAdd){
        telemetryCount('arcade','playerHits');
        destroyAdd(hitAdd);
        remove();
        return;
      }
      if(!state.ended && hitSegment(state.bossX,state.bossY,72,y,nextY)){
        telemetryCount('arcade','playerHits');
        damageBoss('superboss_player_shot');
        remove();
        return;
      }

      y=nextY;
      shot.style.transform=`translate3d(${x}px,${y}px,0)`;
      if(y<-40 || now-born>2600){remove();return;}
      raf=requestAnimationFrame(step);
      state.shotRafs.add(raf);
    };
    shot.style.transform=`translate3d(${x}px,${y}px,0)`;
    raf=requestAnimationFrame(step);
    state.shotRafs.add(raf);
  };
  const onDown=e=>{
    if(e.button!==0 || e.target.closest('.superboss-exit'))return;
    e.preventDefault();
    fireBossPlayerShot();
  };
  arena.addEventListener('pointermove',onMove);arena.addEventListener('pointerdown',onDown);arena.addEventListener('wheel',e=>e.preventDefault(),{passive:false});
  arena.querySelector('.superboss-exit')?.addEventListener('click',e=>{e.stopPropagation();endSuperBoss('exit');});
  state.keyHandler=e=>{if(e.key==='Escape'&&!state.victoryShown)endSuperBoss('escape');};document.addEventListener('keydown',state.keyHandler);
  const render=now=>{
    if(state.ended||!arena.isConnected)return;
    const dt=Math.min(50,Math.max(0,now-state.lastRenderAt));
    state.lastRenderAt=now;
    state.knockX*=.935;state.knockY*=.935;
    state.cursorX=Math.max(16,Math.min(window.innerWidth-16,state.pointerX+state.knockX));
    state.cursorY=Math.max(16,Math.min(window.innerHeight-16,state.pointerY+state.knockY));
    cursor.style.transform=`translate3d(${state.cursorX}px,${state.cursorY}px,0)`;

    // Freeze the boss's movement clock during the beam. Using global time here
    // caused the boss to "catch up" to a new sine position the instant the beam ended.
    if(!state.laserActive) state.bossMoveClock+=dt;
    state.bossX=window.innerWidth/2+Math.sin(state.bossMoveClock*.00055)*Math.min(230,window.innerWidth*.19);
    state.bossY=Math.max(130,window.innerHeight*.18)+Math.sin(state.bossMoveClock*.00115)*22;
    boss.style.transform=`translate3d(${state.bossX}px,${state.bossY}px,0)`;

    state.adds.forEach((add,i)=>{
      if(!add.alive)return;
      const a=add.phase+now*.00072*(i%2?1:-1);
      const r=145+(i%2)*42;
      add.x=state.bossX+Math.cos(a)*r;
      add.y=state.bossY+Math.sin(a)*76+68;
      add.el.style.transform=`translate3d(${add.x}px,${add.y}px,0)`;
    });
    state.raf=requestAnimationFrame(render);
  };
  state.raf=requestAnimationFrame(render);
  const bossFire=window.setInterval(()=>{if(state.ended)return;const count=state.hp<=6?3:state.hp<=12?2:1;for(let i=0;i<count;i++){const spread=(i-(count-1)/2)*55;superBossProjectile({x:state.bossX,y:state.bossY,targetX:state.cursorX+spread,targetY:state.cursorY,sourceType:'super_bullet',speed:760});}},slowmoEnabled?1200:760);state.timers.push(bossFire);
  const addFire=window.setInterval(()=>{if(state.ended)return;const alive=state.adds.filter(a=>a.alive);if(!alive.length)return;const add=alive[Math.floor(Math.random()*alive.length)];superBossProjectile({x:add.x,y:add.y,targetX:state.cursorX,targetY:state.cursorY,sourceType:'add_bullet',speed:650});},slowmoEnabled?1650:1080);state.timers.push(addFire);
  const rockets=window.setInterval(()=>{if(state.ended)return;telemetryCount('arcade','superBossRockets');superBossProjectile({x:state.bossX,y:state.bossY,targetX:state.cursorX,targetY:state.cursorY,sourceType:'homing_rocket',speed:255,radius:29,className:'superboss-rocket',homing:true,lifetime:7600});},slowmoEnabled?3900:2650);state.timers.push(rockets);
  const lasers=window.setInterval(()=>superBossMegaLaser(),slowmoEnabled?7600:5350);state.timers.push(lasers);
  const firstRocket=window.setTimeout(()=>{if(!state.ended){telemetryCount('arcade','superBossRockets');superBossProjectile({x:state.bossX,y:state.bossY,targetX:state.cursorX,targetY:state.cursorY,sourceType:'homing_rocket',speed:255,radius:29,className:'superboss-rocket',homing:true,lifetime:7600});}},1200);state.timeouts.push(firstRocket);
  const firstLaser=window.setTimeout(()=>superBossMegaLaser(),3300);state.timeouts.push(firstLaser);
  consolePrint('SUPER BOSS // INTERACT OFF temporarily engaged. Left click fires straight upward from the cursor. Line up with the core or adds while avoiding rockets and the sweeping laser. EXIT BOSS FIGHT is always available.','warn');
}
window.__MIPPI_SUPERBOSS__=Object.freeze({spawn:()=>spawnSuperBoss(true),snapshot:()=>superBossRuntime?{active:true,hp:superBossRuntime.hp,adds:superBossRuntime.adds.filter(a=>a.alive).length,cursor:{x:Math.round(superBossRuntime.cursorX),y:Math.round(superBossRuntime.cursorY)}}:{active:false}});

function spawnGalaga(force=false){
  if(ufoBossActive && !force) return false;
  if(Date.now()<ufoCalmUntil && !force) return false;
  if((!epicGameplayUnlocked()||reduceMotion) && !force) return false;
  if(!directorAllowsAmbient('ufo',{force})) return false;
  const threat=ufoThreatTier();
  const f=randomEdgeFlight(120);
  const ship=document.createElement('button'); ship.className=`galaga-secret fly ufo-threat-${threat}`; ship.type='button'; ship.setAttribute('aria-label',`A tiny arcade ship, threat tier ${threat}`); ship.dataset.telemetryKind='ufo'; ship.dataset.threat=String(threat); ship.dataset.devNote='ARCADE NOTE // Regular UFO pressure quietly increases as the current ten-kill cycle approaches a boss.'; ship.dataset.designNote='DESIGN NOTE // RISING PRESSURE // Regular UFO pressure increases as the ten-contact cycle approaches a Boss. The player can read that escalation through firing behavior and the INVASION meter, so the larger encounter feels authored by prior play instead of appearing as an unrelated random event.';
  telemetryCount('arcade','ufoSpawned'); telemetryCount('arcade.threatSpawns',String(threat)); telemetryFlyingSpawn('ufo',{forced:force,threat});
  ship.style.left=`${f.sx}px`; ship.style.top=`${f.sy}px`; ship.style.setProperty('--dx',`${f.dx}px`); ship.style.setProperty('--dy',`${f.dy}px`); ship.style.setProperty('--angle',`${f.angle}deg`);
  const baseDuration=threat===1?6.5:threat===2?6.15:5.8;
  setFlightDuration(ship,baseDuration+Math.random()*4.1);
  let ufoFireTimer=null;
  const stopUfoFire=()=>{ if(ufoFireTimer){ window.clearInterval(ufoFireTimer); ufoFireTimer=null; } };
  const firePattern=()=>{
    if(threat===1){
      fireUfoProjectile(ship);
    }else if(threat===2){
      fireUfoProjectile(ship);
      if(Math.random()<.32) window.setTimeout(()=>fireUfoProjectile(ship),150);
    }else{
      fireUfoProjectile(ship);
      if(Math.random()<.58) window.setTimeout(()=>fireUfoProjectile(ship),120);
    }
  };
  ship.addEventListener('click',()=>{ const method=telemetryCollectionMethod(ship); const r=ship.getBoundingClientRect(); const cx=r.left+r.width/2, cy=r.top+r.height/2; explodeAt(cx,cy,30);registerUfoKill(method,cx,cy);stopUfoFire();ship.remove(); });
  ship.addEventListener('animationend',()=>{ telemetryCount('arcade','ufoEscaped'); stopUfoFire(); },{once:true});
  document.body.appendChild(ship);
  const cadence=threat===1?900+Math.floor(Math.random()*360):threat===2?700+Math.floor(Math.random()*280):560+Math.floor(Math.random()*230);
  ufoFireTimer=window.setInterval(firePattern,cadence*directorHostileCadenceMultiplier());
  window.setTimeout(firePattern,threat===1?440:threat===2?360:280);
  directorNoteFriendlyAmbient();
  removeWhenFlightEnds(ship);
  return true;
}
let naturalShootingStarTimer=null;
function nextNaturalShootingStarDelay(){
  const beacon=shopOwns('celestial-beacon');
  return easyModeEnabled ? 9000+Math.random()*7000 : directorDelay('shooting_star',beacon?18000:28000,beacon?38000:62000);
}
function scheduleNaturalShootingStar(delay=nextNaturalShootingStarDelay()){
  window.clearTimeout(naturalShootingStarTimer);
  naturalShootingStarTimer=window.setTimeout(()=>{
    const spawned=spawnShootingStar(false);
    if(spawned){
      scheduleNaturalShootingStar();
      return;
    }
    // A blocked opportunity is deferred rather than discarded for another full minute.
    const retry=!epicGameplayUnlocked()?5000:hasWishCharge()?14000:directorAttentionBlocked()?2600:6500;
    scheduleNaturalShootingStar(retry);
  },delay);
}
scheduleNaturalShootingStar();
let naturalGalagaTimer=null;
function nextNaturalGalagaDelay(){ return easyModeEnabled ? 14000+Math.random()*12000 : directorDelay('ufo',52000,130000); }
function scheduleNaturalGalaga(delay=nextNaturalGalagaDelay()){
  window.clearTimeout(naturalGalagaTimer);
  naturalGalagaTimer=window.setTimeout(()=>{
    const spawned=spawnGalaga(false);
    if(spawned){ scheduleNaturalGalaga(); return; }
    const retry=!epicGameplayUnlocked()?5000:reduceMotion?15000:(ufoBossActive||superBossActive||Date.now()<ufoCalmUntil)?3500:directorAttentionBlocked()?1600:5000;
    scheduleNaturalGalaga(retry);
  },delay);
}
scheduleNaturalGalaga();


// Key -> castle -> key -> castle. One key buys exactly one castle check.
let castleSpawnTimer=null;
const castleBoundaries=['games','career','consulting','crafting','tools','about'];
function persistCastleRun(){try{localStorage.setItem(CASTLE_PROGRESS_KEY,String(castleRunProgress));}catch(_){} updateCastleMeter();updateProgressHudVisibility();}
function castleRunFireworks(){
  const bursts=[[.13,.25],[.29,.42],[.46,.18],[.64,.32],[.82,.20],[.9,.52],[.18,.66],[.52,.60],[.74,.72]];
  bursts.forEach(([px,py],i)=>window.setTimeout(()=>explodeAt(innerWidth*px,innerHeight*py,34,33,{radiusX:560,radiusY:450,lifetime:2150}),i*115));
}
function castleAutoCollectWindow(){
  // Snapshot the already-spawned FRIENDLY flyers only. New objects arriving
  // during the one-second reward window aren't silently consumed.
  const friendly=[...document.querySelectorAll('.game-pickup,.doug-bone,.galaga-secret:not(.boss-ufo),.shooting-star')]
    .filter(el=>el.isConnected && !el.classList.contains('boss-ufo'));
  // UFOs are hostile, not collectibles. Avoid automatically killing them.
  const pickupItems=friendly.filter(el=>el.matches('.game-pickup,.doug-bone,.shooting-star'));
  const seen=new Set();
  pickupItems.forEach((el,index)=>{
    if(seen.has(el))return;seen.add(el);
    window.setTimeout(()=>{if(el.isConnected)el.click();},Math.round(index/Math.max(1,pickupItems.length-1)*920));
  });
  if(pickupItems.length)consolePrint(`CASTLE MAGNET // ${pickupItems.length} airborne rewards collected over one second.`,'good');
}
function completeCastleRun(){
  castleRunProgress=4;persistCastleRun();
  if(!postgameCastleComplete){postgameCastleComplete=true;try{localStorage.setItem(POSTGAME_CASTLE_COMPLETE_KEY,'1');}catch(_){} }
  telemetryCount('economy','castleRunsCompleted');telemetryMeaningful('castle_run_complete');
  showTransientToast('CASTLES 4 / 4','The CASTLES panel is ready. Click it to claim the fireworks and 3 Rupees.','REWARD // CLAIM READY','KEY ITEM');
  consolePrint('CASTLE RUN // 4/4 // reward ready. Click the CASTLES panel.','good');
  evaluatePostgameAchievements();
}
function claimCastleReward(){
  if(castleRunProgress<4)return false;
  telemetryMeaningful('castle_reward_claimed');
  castleRunFireworks();
  castleAutoCollectWindow();
  awardRupees(3,{source:'castle_run',announce:'silent'});
  showTransientToast('CASTLE RUN COMPLETE','Four Castles checked. The princess remains unavailable, but production approved fireworks and hazard pay.','+3 RUPEES // FIREWORKS','KEY ITEM');
  consolePrint('CASTLE RUN // reward claimed // +3 RUPEES // fireworks budget approved.','good');
  castleRunProgress=0;persistCastleRun();
  return true;
}
function advanceCastleRun(){
  castleRunProgress=Math.min(4,castleRunProgress+1);
  persistCastleRun();
  if(castleRunProgress>=4) completeCastleRun();
}
castleMeter?.addEventListener('click',()=>{if(castleRunProgress>=4)claimCastleReward();});
function castleMarkup(){
  // Chunky three-tower platformer fortress silhouette. Familiar at a glance,
  // but built specifically for this page rather than copied from game art.
  return `<svg viewBox="0 0 72 60" aria-hidden="true">
    <g class="castle-stone">
      <path d="M7 55V24h8v-7h6v7h7V14h6V8h5v6h6v10h7v-7h6v7h7v31H7Z"/>
      <rect x="5" y="18" width="8" height="8"/><rect x="16" y="18" width="8" height="8"/>
      <rect x="28" y="8" width="8" height="8"/><rect x="39" y="8" width="8" height="8"/>
      <rect x="50" y="18" width="8" height="8"/><rect x="61" y="18" width="8" height="8"/>
    </g>
    <path class="castle-door" d="M30 55V43c0-5 3-8 6-8s6 3 6 8v12H30Z"/>
    <rect class="castle-window" x="17" y="33" width="7" height="8" rx="1"/>
    <rect class="castle-window" x="48" y="33" width="7" height="8" rx="1"/>
    <rect class="castle-window" x="33" y="22" width="6" height="7" rx="1"/>
    <path class="castle-flag" d="M36 8V1m1 1h13l-4 4 4 4H37"/>
  </svg>`;
}
function spawnCastle(){
  window.clearTimeout(castleSpawnTimer);
  if(!castleQuestActive || activeCastle) return;
  const candidates=castleBoundaries.map(id=>document.getElementById(id)).filter(Boolean);
  if(!candidates.length){ castleQuestActive=false; return; }
  const target=candidates[Math.floor(Math.random()*candidates.length)];
  const castle=document.createElement('button');
  castle.type='button'; castle.className='section-castle'; castle.setAttribute('aria-label','A suspicious little castle'); castle.dataset.devNote='KEY ITEM NOTE // One collected Key creates one Castle somewhere along a section boundary.'; castle.dataset.designNote='DESIGN NOTE // SETUP AND PAYOFF // The Key creates anticipation and the Castle delivers the immediate joke. The CASTLES meter gives repeated checks a longer destination through fireworks and a small reward, while each individual Castle stays mechanically simple enough that the punchline remains the focus.'; castle.innerHTML=castleMarkup();
  castle.style.left=`${10+Math.random()*76}%`;
  target.appendChild(castle); activeCastle=castle;
  castle.addEventListener('click',()=>{
    telemetryCount('economy','castlesChecked');
    telemetryMeaningful('castle_checked');
    castle.remove();
    if(activeCastle===castle) activeCastle=null;
    castleQuestActive=false;
    advanceCastleRun();
    if(castleRunProgress<4){
      showTransientToast('CASTLE CHECKED','THANK YOU! BUT OUR PINCESS IS IN ANOTHER CASTLE!',`CASTLES // ${castleRunProgress} / 4`,'SYSTEM');
      consolePrint(`CASTLE CHECKED // CASTLES ${castleRunProgress}/4 // the next castle requires another key. Obviously.`,'good');
    }else{
      consolePrint('CASTLE CHECKED // 4/4 // click the glowing CASTLES panel to claim the run reward.','good');
    }
  });
}
function activateCastleQuest(){
  if(castleQuestActive || activeCastle) return;
  castleQuestActive=true;
  updateCastleMeter();updateProgressHudVisibility();
  consolePrint('KEY ITEM // A small castle has appeared somewhere between sections.','good');
  castleSpawnTimer=window.setTimeout(spawnCastle,500);
}

let dougPeekTimer=null;
function dougIsVisible(){
  if(!dougCard) return false;
  const r=dougCard.getBoundingClientRect();
  return r.bottom>0 && r.top<window.innerHeight && r.right>0 && r.left<window.innerWidth;
}
function showDougPeek({starPowered=false,coolMode=false}={}){
  let peek=document.querySelector('.doug-peek');
  if(!peek){
    peek=document.createElement('button'); peek.type='button'; peek.className='doug-peek'; peek.setAttribute('aria-label','Pet Doug');
    peek.innerHTML=`<div class="doug-peek-hearts">♥ ♥ ♥</div><img alt="Doug peeking onto the page"/><strong>Doug approves this acquisition. Pet Doug.</strong>`;
    peek.addEventListener('click',()=>petDoug('peek',peek));
    document.body.appendChild(peek);
  }
  const label=peek.querySelector('strong'); if(label) label.textContent=starPowered?'STAR POWER // Coolness surged. Pet the cool dog.':coolMode?'COOL MODE // Doug has reached maximum cool. Pet Doug.':'Doug approves this acquisition. Pet Doug.';
  peek.classList.toggle('star-cool',starPowered||coolMode);
  syncDougThemeVisuals();
  peek.classList.remove('show'); void peek.offsetWidth; peek.classList.add('show');
  clearTimeout(dougPeekTimer); dougPeekTimer=setTimeout(()=>{peek.classList.remove('show','star-cool');syncDougThemeVisuals();},4300);
}
function persistDougCoolProgress(){
  try{sessionStorage.setItem(DOUG_COOL_PROGRESS_KEY,String(Math.max(0,Math.min(100,Math.round(dougCoolProgress)))));}catch(_){}
}
const dougBoneTrailTimers=new WeakMap();
function emitDougRainbowTrail(bone){
  if(!bone?.isConnected || !bone.classList.contains('cool-bone')) return;
  const r=bone.getBoundingClientRect();
  const p=document.createElement('i'); p.className='doug-rainbow-particle';
  p.style.left=`${r.left+r.width*.48+(Math.random()-.5)*12}px`; p.style.top=`${r.top+r.height*.55+(Math.random()-.5)*9}px`;
  p.style.setProperty('--hue',String(Math.floor((performance.now()/7+Math.random()*90)%360)));
  p.style.setProperty('--px',`${-18-Math.random()*28}px`); p.style.setProperty('--py',`${(Math.random()-.5)*30}px`);
  document.body.appendChild(p); window.setTimeout(()=>p.remove(),760);
}
function setDougBoneCoolVisual(bone,active){
  if(!bone) return;
  bone.classList.toggle('cool-bone',!!active);
  const existing=dougBoneTrailTimers.get(bone);
  if(active && !existing){
    emitDougRainbowTrail(bone);
    const timer=window.setInterval(()=>{
      if(!bone.isConnected || !bone.classList.contains('cool-bone')){ window.clearInterval(timer); dougBoneTrailTimers.delete(bone); return; }
      emitDougRainbowTrail(bone);
    },85);
    dougBoneTrailTimers.set(bone,timer);
  }else if(!active && existing){
    window.clearInterval(existing); dougBoneTrailTimers.delete(bone);
  }
}
function syncDougBoneCoolVisuals(active=dougCard?.classList.contains('doug-star-cool')){
  document.querySelectorAll('.doug-bone').forEach(bone=>setDougBoneCoolVisual(bone,!!active));
}
function finishDougCoolMode(){
  window.clearTimeout(dougCoolTimer); dougCoolTimer=null;
  if(dougCoolDrainTimer){window.clearInterval(dougCoolDrainTimer);dougCoolDrainTimer=null;}
  dougCoolActive=false;
  let steps=16;
  const start=100;
  dougCoolDrainTimer=window.setInterval(()=>{
    steps--;
    dougCoolProgress=Math.max(0,start*(steps/16));
    updateCoolMeter(); persistDougCoolProgress();
    if(steps<=0){
      window.clearInterval(dougCoolDrainTimer); dougCoolDrainTimer=null;
      dougCoolProgress=0;
      dougCard?.classList.remove('doug-star-cool');
      document.querySelector('.doug-peek')?.classList.remove('star-cool');
      syncDougThemeVisuals(); syncDougBoneCoolVisuals(false); updateCoolMeter(); updateProgressHudVisibility(); persistDougCoolProgress();
      consolePrint('COOL METER // depleted. Doug has returned to standard operating coolness.');
    }
  },75);
}
function activateDougCoolMode({source='meter'}={}){
  if(dougCoolDrainTimer){window.clearInterval(dougCoolDrainTimer);dougCoolDrainTimer=null;}
  dougCoolProgress=100;
  if(!postgameCoolMaxed){postgameCoolMaxed=true;try{localStorage.setItem(POSTGAME_COOL_MAXED_KEY,'1');}catch(_){} }
  evaluatePostgameAchievements();
  const first=!dougCoolActive;
  dougCoolActive=true;
  dougCard?.classList.add('doug-star-cool');
  const peek=document.querySelector('.doug-peek'); if(peek) peek.classList.add('star-cool');
  syncDougThemeVisuals(); syncDougBoneCoolVisuals(true); updateCoolMeter(); updateProgressHudVisibility(); persistDougCoolProgress();
  if(first){
    telemetryCount('economy','coolActivations'); telemetryMeaningful('doug_cool_mode',{source});
    showTransientToast('COOL METER // FULL','Doug has entered Cool Mode. This is now a real progression system.','LIMIT BREAK // DOUG','MORALE');
    consolePrint('COOL METER FULL // DOUG COOL MODE ACTIVATED.','good');
  }
  window.clearTimeout(dougCoolTimer);
  dougCoolTimer=window.setTimeout(finishDougCoolMode,10500);
}
function addDougCoolness(amount=25,{source='bone'}={}){
  if(dougCoolActive){
    activateDougCoolMode({source:'refresh'});
    return;
  }
  dougCoolProgress=Math.min(100,dougCoolProgress+Math.max(0,Number(amount)||0));
  persistDougCoolProgress(); updateCoolMeter(); updateProgressHudVisibility();
  if(dougCoolProgress>=100) activateDougCoolMode({source});
}
function flashDougStarCool(){ activateDougCoolMode({source:'star_power'}); }
function collectDougBone(method='direct'){
  dougBoneCount++;
  telemetryCount('economy','bonesCollected');
  telemetryFlyingCollect('bone',method);
  const starPowered=document.body.classList.contains('star-power');
  addDougCoolness(starPowered?50:25,{source:starPowered?'star_power_bone':'bone'});
  if(starPowered){
    telemetryCount('combos','starPowerDoug');
    announceSystemCombo('star-power-doug','Star Power + Doug','The Cool Meter surges toward its limit.');
  }
  const coolNow=dougCoolActive;
  if(dougIsVisible()){
    reactDoug(coolNow?'Doug has achieved maximum cool.':'Doug approves this acquisition.');
    burstDougPaws(coolNow?9:6,doug);
  } else showDougPeek({starPowered,coolMode:coolNow});
  consolePrint(`BONE ACQUIRED // MORALE ${dougBoneCount} // COOLNESS ${Math.round(dougCoolProgress)}%${coolNow?' // COOL MODE':''}.`,'good');
}

function spawnDougApprovedClickable(source='command_pet'){
  const choices=[];
  // Doug Bones are legal as soon as Doug has assumed command.
  if(dougCard?.classList.contains('doug-command')) choices.push(()=>spawnDougBone(true));
  if(epicGameplayUnlocked()){
    choices.push(()=>spawnGamePickup(null,true),()=>spawnGamePickup(null,true));
    if(!hasWishCharge()) choices.push(()=>spawnShootingStar(true));
    if(!ufoBossActive && !superBossActive && Date.now()>=ufoCalmUntil) choices.push(()=>spawnGalaga(true));
  }
  if(!choices.length) return false;
  choices[Math.floor(Math.random()*choices.length)]();
  telemetryMeaningful('doug_spawn_assist',{source,options:choices.length,cool:dougCoolActive});
  return true;
}

// Completion-theme ambient pickups add more game-like motion without competing with content.
const pickupKinds=[
  {kind:'rupee',msg:'RUPEE PICKUP // blue currency acquired, but no merchant is nearby.'},
  {kind:'heart',msg:'HEALTH PICKUP // morale restored.'},
  {kind:'1up',msg:'EXTRA LIFE // portfolio review extended.'},
  {kind:'star',msg:'BONUS PICKUP // +250 imaginary points.'},
  {kind:'key',msg:'KEY ITEM // no matching lock has been implemented.'}
];
function getPickupMarkup(kind){
  if(kind==='rupee') return `<svg class="game-pickup-icon pickup-rupee" viewBox="0 0 64 80" aria-hidden="true"><polygon class="pickup-fill" points="32,4 54,18 47,57 32,74 17,57 10,18"/><polyline class="pickup-line" points="32,8 46,20 41,53 32,65 23,53 18,20 32,8"/><polyline class="pickup-line pickup-facet" points="22,27 32,35 42,27"/><polyline class="pickup-line pickup-facet" points="22,46 32,35 42,46"/></svg>`;
  if(kind==='1up') return `<svg class="game-pickup-icon pickup-mushroom" viewBox="0 0 72 72" aria-hidden="true"><path class="pickup-cap" d="M12 38c0-16 11-26 24-26 15 0 24 11 24 24 0 7-5 12-12 12H24c-7 0-12-3-12-10Z"/><circle class="pickup-spot" cx="25" cy="27" r="5"/><circle class="pickup-spot" cx="46" cy="28" r="5"/><rect class="pickup-stem" x="26" y="42" width="20" height="18" rx="7"/><circle class="pickup-eye" cx="31" cy="49" r="1.8"/><circle class="pickup-eye" cx="41" cy="49" r="1.8"/></svg>`;
  if(kind==='star') return `<svg class="game-pickup-icon pickup-star" viewBox="0 0 72 72" aria-hidden="true"><path class="pickup-fill" d="M36 7l7.4 15 16.6 2.4-12 11.7 2.9 16.5L36 45 21.1 52.6 24 36.1 12 24.4 28.6 22z"/></svg>`;
  if(kind==='key') return `<svg class="game-pickup-icon pickup-key" viewBox="0 0 80 56" aria-hidden="true"><circle class="pickup-key-ring" cx="23" cy="28" r="14"/><circle class="pickup-key-hole" cx="23" cy="28" r="5"/><path class="pickup-key-body" d="M35 24h27v8h-5v7h-8v-7h-8v7h-8V24Z"/></svg>`;
  return `<svg class="game-pickup-icon pickup-heart" viewBox="0 0 72 72" aria-hidden="true"><path class="pickup-fill" d="M36 60C18 47 10 37 10 25c0-9 6-15 15-15 5 0 9 2 11 6 2-4 6-6 11-6 9 0 15 6 15 15 0 12-8 22-26 35Z"/></svg>`;
}
let pickupsSinceKey=0;
function choosePickupDefinition(){
  const nonKeys=pickupKinds.filter(entry=>entry.kind!=='key');
  const lucky=shopHasEquipped('lucky-charm');
  const chooseNonKey=()=>{
    if(!lucky){ const pool=heartCount>=5 ? [...nonKeys.filter(e=>e.kind!=='heart'),...(Math.random()<.20?nonKeys.filter(e=>e.kind==='heart'):[])] : nonKeys; return pool[Math.floor(Math.random()*pool.length)]; }
    const weighted=[];
    nonKeys.forEach(entry=>{ const copies=entry.kind==='heart'&&heartCount>=5?1:(entry.kind==='heart'||entry.kind==='star')?3:2; for(let i=0;i<copies;i++) weighted.push(entry); });
    return weighted[Math.floor(Math.random()*weighted.length)];
  };
  if(castleQuestActive || activeCastle) return chooseNonKey();
  const keyDef=pickupKinds.find(entry=>entry.kind==='key');
  // A little randomness, plus a pity rule. Lucky Charm tightens both without
  // turning the uncommon pickups into guaranteed schedule spam.
  if(pickupsSinceKey>=(lucky?2:3) || Math.random()<(lucky?.36:.26)){ pickupsSinceKey=0; return keyDef; }
  pickupsSinceKey++;
  return chooseNonKey();
}
function awardRupees(amount=1,{source='pickup',announce='pickup'}={}){
  const value=Math.max(0,Math.floor(Number(amount)||0));
  if(!value) return;
  const before=rupeeWallet, first=!rupeeDiscovered;
  rupeeWallet+=value; rupeeDiscovered=true;
  telemetryCount('economy','rupeesEarned',value);
  telemetryCount('economy.rupeeSources',source,value);
  telemetryMeaningful(source==='pickup'?'rupee_collected':'rupee_reward',{amount:value,source,wallet:rupeeWallet});
  try{localStorage.setItem(RUPEE_WALLET_KEY,String(rupeeWallet));localStorage.setItem(RUPEE_DISCOVERED_KEY,'1');}catch(_){}
  updateRupeeMeter(); syncShopTelemetrySnapshot();
  if(announce==='pickup'){
    consolePrint(`RUPEE ACQUIRED // +${value} // WALLET ${rupeeWallet} // shop inventory: regrettably real`,'good');
    if(first) showTransientToast('WALLET UNLOCKED',`${value} rupee${value===1?'':'s'} acquired. Click the RUPEES counter or type shop to spend them.`,`WALLET // ${rupeeWallet}`,'ECONOMY');
    else showTransientToast('RUPEE ACQUIRED',`+${value} rupee${value===1?'':'s'}. Purchasing power increased.`,`WALLET // ${rupeeWallet}`,'ECONOMY');
  }
  if(before<10 && rupeeWallet>=10){
    window.setTimeout(()=>showTransientToast('WALLET MILESTONE','10 rupees. You can invest in Production Discount or buy several smaller upgrades now.','ECONOMY // CHOICE DETECTED','SYSTEM'),650);
  }
}
function collectRupee(){ awardRupees(1,{source:'pickup',announce:'pickup'}); }
function awardArcadeRupees(amount,x,y,source='ufo'){
  const value=Math.max(1,Math.floor(amount));
  const count=Math.min(5,value);
  for(let i=0;i<count;i++){
    const chip=document.createElement('i');
    chip.className='arcade-rupee-reward';
    chip.textContent='◆';
    chip.style.left=`${x+(Math.random()-.5)*20}px`; chip.style.top=`${y+(Math.random()-.5)*16}px`;
    chip.style.setProperty('--rx',`${(Math.random()-.5)*80}px`); chip.style.setProperty('--ry',`${-45-Math.random()*70}px`);
    document.body.appendChild(chip);
    window.setTimeout(()=>chip.remove(),900);
  }
  window.setTimeout(()=>awardRupees(value,{source,announce:'silent'}),180);
}
function handleGamePickup(def,item){
  const method=telemetryCollectionMethod(item);
  telemetryFlyingCollect(def.kind,method);
  if(def.kind==='key') telemetryCount('economy','keysCollected');
  else if(def.kind==='1up'){ telemetryCount('economy','mushroomsCollected'); recordMushroomCollection(); }
  else if(def.kind==='star') telemetryCount('economy','starsCollected');
  const r=item.getBoundingClientRect(); explodeAt(r.left+r.width/2,r.top+r.height/2,18);
  if(def.kind==='heart') collectHeart();
  else if(def.kind==='1up') advanceCursorPower();
  else if(def.kind==='star') activateStarPower();
  else if(def.kind==='rupee') collectRupee();
  else {
    consolePrint(def.msg,'good');
    if(def.kind==='key') activateCastleQuest();
  }
  item.remove();
}
function spawnGamePickup(forcedKind=null,force=false){
  if(reduceMotion&&!force) return false;
  if(!directorAllowsAmbient('pickup',{force})) return false;
  const f=randomEdgeFlight(100);
  // Do not naturally spawn another key while a castle is waiting. Forced test pickups
  // are allowed because console commands are allowed to be irresponsible.
  // Before Epic, expose gentle starter collectibles rather than a dead screen.
  // Keys, stars and mushrooms remain in the Epic game-layer pool.
  const def=forcedKind ? pickupKinds.find(entry=>entry.kind===forcedKind) :
    (epicGameplayUnlocked()?choosePickupDefinition():pickupKinds.find(entry=>entry.kind===(Math.random()<.65?'rupee':'heart')));
  if(!def) return false;
  const item=document.createElement('button'); item.type='button'; item.className='game-pickup'; item.dataset.kind=def.kind; item.dataset.telemetryKind=def.kind; item.innerHTML=getPickupMarkup(def.kind);
  telemetryFlyingSpawn(def.kind,{forced:force}); item.setAttribute('aria-label',`A hidden ${def.kind} pickup`);
  item.style.left=`${f.sx}px`; item.style.top=`${f.sy}px`; item.style.setProperty('--dx',`${f.dx}px`); item.style.setProperty('--dy',`${f.dy}px`); item.style.setProperty('--angle',`${f.angle}deg`); setFlightDuration(item,5.2+Math.random()*4.6);
  item.addEventListener('click',()=>handleGamePickup(def,item));
  document.body.appendChild(item); directorNoteFriendlyAmbient(); removeWhenFlightEnds(item);
  return true;
}
let naturalPickupTimer=null;
function nextNaturalPickupDelay(){ return easyModeEnabled ? 2600+Math.random()*3200 : epicGameplayUnlocked()?directorDelay('pickup',4600,8600):directorDelay('pickup',11000,16000); }
function scheduleNaturalPickup(delay=nextNaturalPickupDelay()){
  window.clearTimeout(naturalPickupTimer);
  naturalPickupTimer=window.setTimeout(()=>{
    const spawned=spawnGamePickup(null,false);
    if(spawned){ scheduleNaturalPickup(); return; }
    const retry=reduceMotion?15000:directorAttentionBlocked()?900:2000;
    scheduleNaturalPickup(retry);
  },delay);
}
scheduleNaturalPickup();

// Once Doug assumes command, bones become a recurring background pickup until reload/reset.
function spawnDougBone(force=false){
  if(!dougCard?.classList.contains('doug-command')||reduceMotion) return false;
  if(!directorAllowsAmbient('bone',{force})) return false;
  const f=randomEdgeFlight(90); const bone=document.createElement('button'); bone.type='button'; bone.className='doug-bone'; bone.setAttribute('aria-label','Doug-approved bone pickup');
  bone.innerHTML=`<svg class="doug-bone-icon" viewBox="0 0 72 36" aria-hidden="true"><g><rect x="17" y="12" width="38" height="12" rx="6"/><circle cx="12" cy="10" r="7"/><circle cx="12" cy="26" r="7"/><circle cx="60" cy="10" r="7"/><circle cx="60" cy="26" r="7"/></g></svg>`;
  bone.style.left=`${f.sx}px`; bone.style.top=`${f.sy}px`; bone.style.setProperty('--dx',`${f.dx}px`); bone.style.setProperty('--dy',`${f.dy}px`); bone.style.setProperty('--angle',`${f.angle}deg`); setFlightDuration(bone,5.4+Math.random()*3.8);
  bone.dataset.telemetryKind='bone'; telemetryFlyingSpawn('bone',{forced:force});
  bone.addEventListener('click',()=>{ const method=telemetryCollectionMethod(bone); const r=bone.getBoundingClientRect(); explodeAt(r.left+r.width/2,r.top+r.height/2,14); collectDougBone(method); setDougBoneCoolVisual(bone,false); bone.remove(); });
  document.body.appendChild(bone); directorNoteFriendlyAmbient(); setDougBoneCoolVisual(bone,dougCard?.classList.contains('doug-star-cool')); removeWhenFlightEnds(bone);
  return true;
}
let naturalDougBoneTimer=null;
function nextNaturalDougBoneDelay(){ return easyModeEnabled ? 3000+Math.random()*4000 : shopHasEquipped('dog-whistle') ? directorDelay('bone',4300,9300) : directorDelay('bone',7000,15000); }
function scheduleNaturalDougBone(delay=nextNaturalDougBoneDelay()){
  window.clearTimeout(naturalDougBoneTimer);
  naturalDougBoneTimer=window.setTimeout(()=>{
    const spawned=spawnDougBone(false);
    if(spawned){ scheduleNaturalDougBone(); return; }
    const retry=!dougCard?.classList.contains('doug-command')?4000:reduceMotion?15000:directorAttentionBlocked()?1200:2800;
    scheduleNaturalDougBone(retry);
  },delay);
}
scheduleNaturalDougBone();

initializeUnifiedHud();
applyShopEquipmentState();
syncShopTelemetrySnapshot();
updateHeartMeter();
updateRupeeMeter();
updateAchievementProgress();
updateConsoleAttention();
scheduleAchievementIntroHint();
if(unlockedAchievements.size===ACHIEVEMENT_KEYS.length) applyThemeMode(preferredUnlockedTheme(),{persist:false});
else updateThemeCycleControl();
syncDougThemeVisuals();
syncInteractToggle();
window.setTimeout(()=>computePlayerModel({record:true}),1200);
startAdaptiveDirector();
initMusicPlayer();
evaluatePostgameAchievements({announce:false});
updateLedgerTrigger();

// Finale --------------------------------------------------------------------
function finaleVisitedSections(){return ['games','career','consulting','crafting','tools','about'].filter(id=>(Number(sessionTelemetry.sections?.[id]?.visits)||0)>0).length;}
function finaleEligibility(){return {signals:unlockedAchievements.size===ACHIEVEMENT_KEYS.length,legendary:legendaryUnlocked,wish:finaleWishSatisfied,boss:finaleBossSatisfied,hearts:heartCount>=5,shop:shopOwned.size>0,sections:finaleVisitedSections()>=5};}
function finaleEligible(){return Object.values(finaleEligibility()).every(Boolean);}
function finaleAttentionClear(){if(superBossActive||ufoBossActive||document.querySelector('.dev-console.open,.shop-popup.open,.blueprint-popup.open,.compile-popup.open,.wish-special-popup.open,.wish-sequence-overlay,.hal-overlay.show,.azure-gallery[aria-hidden="false"],.flappy-game.open,.session-debrief.show'))return false;return !achievement?.classList.contains('show')&&!ledger?.classList.contains('open');}
function updateFinaleReady(){if(!finaleEligible()||finaleReady||!finaleAttentionClear())return;finaleReady=true;document.body.classList.add('finale-ready');const brand=document.querySelector('.brand');if(brand){brand.setAttribute('aria-label','Mippi The Dork home. Something has changed.');brand.title='Something has changed.';}if(!finaleSeen)showTransientToast('SYSTEM STATUS','You have seen basically everything.','...BASICALLY','FINAL TRACE');telemetryMeaningful('finale_ready',finaleEligibility());}
function finaleSet(line='',subline='',profile=''){if(finaleLine)finaleLine.textContent=line;if(finaleSubline)finaleSubline.textContent=subline;if(finaleProfile)finaleProfile.textContent=profile;}
let postgameRevealTimer=null;
function revealPostgameAchievements(){
  if(postgameRevealed)return;
  postgameRevealed=true;
  try{localStorage.setItem(POSTGAME_REVEAL_KEY,'1');}catch(_){}
  const hadLegendary=unlockedPostgameAchievements.has(POSTGAME_LEGENDARY_KEY);
  evaluatePostgameAchievements({announce:false});
  updateAchievementProgress();renderLedger();
  openLedger();if(ledger)ledger.scrollTop=0;
  telemetryMeaningful('postgame_achievement_tier_revealed');
  consolePrint('POSTGAME // 9 EPIC ACHIEVEMENTS + 1 LEGENDARY CAPSTONE REVEALED.','good');
  if(!hadLegendary&&unlockedPostgameAchievements.has(POSTGAME_LEGENDARY_KEY)){
    window.setTimeout(()=>showTransientToast('100% COMPLETE','You beat the website. Music Player unlocked.','LEGENDARY // MUSIC PLAYER','LEGENDARY ACHIEVEMENT'),650);
  }
}
function schedulePostgameAchievementReveal(){
  if(postgameRevealed)return;
  window.clearTimeout(postgameRevealTimer);
  postgameRevealTimer=window.setTimeout(revealPostgameAchievements,5000);
}
function endFinale(){finaleRunning=false;finaleOverlay?.classList.remove('show','identity');finaleOverlay?.setAttribute('aria-hidden','true');document.body.classList.remove('finale-active');if(finaleControls)finaleControls.hidden=true;}
function startFinale(){if(finaleRunning||!finaleReady||!finaleOverlay)return;finaleRunning=true;finaleSeen=true;try{localStorage.setItem(FINALE_SEEN_KEY,'1');}catch(_){}const model=computePlayerModel();telemetryMeaningful('finale_started',{model:model.label});document.body.classList.add('finale-active');finaleOverlay.classList.remove('identity');finaleOverlay.classList.add('show');finaleOverlay.setAttribute('aria-hidden','false');if(finaleControls)finaleControls.hidden=true;finaleSet();window.setTimeout(()=>finaleSet('THANKS FOR PLAYING.','',''),650);window.setTimeout(()=>finaleSet('THANKS FOR PLAYING.','This was supposed to be a portfolio.',''),2350);window.setTimeout(()=>finaleSet('THANKS FOR PLAYING.','It got away from us.',''),4050);window.setTimeout(()=>{finaleSet('MIPPI THE DORK','GAME DESIGNER',`PLAYER PROFILE // ${model.label}`);finaleOverlay.classList.add('identity');if(finaleControls)finaleControls.hidden=false;},5700);}

function sessionDebriefObservationsFor(x){
  const notes=[];
  const navClicks=Number(sessionTelemetry.interaction?.navigationClicks)||0;
  const invalid=Number(sessionTelemetry.console?.invalid)||0;
  const dougPets=Number(sessionTelemetry.interaction?.dougClicks)||0;
  const bosses=x.bossDefeated+x.superBossDefeated;
  if(x.consoleCommands>Math.max(4,navClicks*1.5)) notes.push(`You issued ${x.consoleCommands} console commands. The navigation was apparently optional.`);
  if(dougPets>=8) notes.push(`Doug received ${dougPets} pets. This was correctly prioritized.`);
  if(x.bones>=5) notes.push(`Morale reached ${x.bones} bones. Production remains stable.`);
  if(bosses>=1) notes.push(`You defeated ${bosses} boss encounter${bosses===1?'':'s'} while reviewing a portfolio.`);
  if(x.superBossDefeated>=1) notes.push(`You survived ${x.superBossDefeated} Super Boss encounter${x.superBossDefeated===1?'':'s'}. This was not in the original scope.`);
  if(x.flappyHigh>=10) notes.push(`Mippi Bird high score: ${x.flappyHigh}. There was professional experience elsewhere on the page.`);
  if(x.sectionsVisited===x.sectionsTotal) notes.push('You visited every major professional section before the session ended.');
  if(x.rupeesSpent>=8) notes.push(`You spent ${x.rupeesSpent} Rupees testing the site's economy.`);
  if(invalid>=3) notes.push(`You entered ${invalid} invalid console commands. Experimentation survived contact with syntax.`);
  if(!x.assistance.hints&&!x.assistance.cheats&&!x.assistance.easy&&!x.assistance.godmode) notes.push('You reached this point without using explicit assistance.');
  else notes.push('You used the assistance systems as tools rather than letting mystery become friction.');
  return notes.slice(0,4);
}
function sessionDebriefShareText(x){
  const bosses=x.bossDefeated+x.superBossDefeated;
  return `I finished Mippi's portfolio as ${x.model.label}. ${x.signals}/${x.signalsTotal} Signals, ${x.ufoDestroyed} UFOs, ${bosses} boss${bosses===1?'':'es'}, Mippi Bird high ${x.flappyHigh}.`;
}
function renderSessionDebrief(){
  const x=sessionStatsSnapshot();
  if(sessionDebriefTitle) sessionDebriefTitle.textContent=x.model.label;
  if(sessionDebriefSummary) sessionDebriefSummary.textContent=x.model.summary;
  if(sessionDebriefGrid){
    const rows=[
      ['TIME EXPLORING',x.duration],['SECTIONS',`${x.sectionsVisited} / ${x.sectionsTotal}`],['SIGNALS',`${x.signals} / ${x.signalsTotal}`],
      ['UFOs',x.ufoDestroyed],['BOSS WINS',x.bossDefeated+x.superBossDefeated],['DOUG BONES',x.bones],['HEARTS',x.hearts],
      ['RUPEES',`${x.rupeesEarned} earned / ${x.rupeesSpent} spent`],['MIPPI BIRD',x.flappyHigh],['COMMANDS',x.consoleCommands],
      ['WISHES',x.wishes],['OBJECTIVES',x.objectives],['THEMES',`${x.themes} / 3`]
    ];
    sessionDebriefGrid.innerHTML=rows.map(([label,value])=>`<div><span>${label}</span><b>${value}</b></div>`).join('');
  }
  if(sessionDebriefObservations) sessionDebriefObservations.innerHTML=sessionDebriefObservationsFor(x).map(note=>`<p>${note}</p>`).join('');
  if(sessionDebriefAssistance){
    const used=[]; if(x.assistance.easy) used.push('Easy Mode'); if(x.assistance.hints) used.push(`Hints x${x.assistance.hints}`); if(x.assistance.cheats) used.push(`Cheat x${x.assistance.cheats}`); if(x.assistance.godmode) used.push('Godmode');
    sessionDebriefAssistance.textContent=`ASSISTANCE // ${used.length?used.join(' · '):'NONE'}`;
  }
  return x;
}
function openSessionDebrief(){
  if(!sessionDebrief) return;
  renderSessionDebrief(); telemetryCount('debrief','opens'); telemetryMeaningful('session_debrief_opened');
  sessionDebrief.classList.add('show'); sessionDebrief.setAttribute('aria-hidden','false'); document.body.classList.add('debrief-active');
}
function closeSessionDebrief(){
  sessionDebrief?.classList.remove('show'); sessionDebrief?.setAttribute('aria-hidden','true'); document.body.classList.remove('debrief-active');
}
sessionDebriefClose?.addEventListener('click',()=>{closeSessionDebrief();schedulePostgameAchievementReveal();});
sessionDebriefContinue?.addEventListener('click',()=>{telemetryMeaningful('session_debrief_continue');closeSessionDebrief();schedulePostgameAchievementReveal();});
sessionDebrief?.addEventListener('click',event=>{
  const button=event.target.closest('[data-debrief-share]'); if(!button) return;
  const x=sessionStatsSnapshot(), text=sessionDebriefShareText(x), url=encodeURIComponent(location.href), encoded=encodeURIComponent(text);
  telemetryCount('debrief','shares'); telemetryMeaningful('session_debrief_share',{target:button.dataset.debriefShare,model:x.model.label});
  if(button.dataset.debriefShare==='x') window.open(`https://twitter.com/intent/tweet?text=${encoded}&url=${url}`,'_blank','noopener');
  else if(button.dataset.debriefShare==='linkedin') window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${url}`,'_blank','noopener');
  else if(button.dataset.debriefShare==='facebook') window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`,'_blank','noopener');
  else if(button.dataset.debriefShare==='copy'){
    telemetryCount('debrief','copies'); navigator.clipboard?.writeText(`${text} ${location.href}`);
    showTransientToast('SESSION RESULT COPIED','Your player profile and session highlights are on the clipboard.','SHARE // COPY','SESSION');
  }
});
window.__MIPPI_DEBRIEF__=Object.freeze({open:openSessionDebrief,snapshot:()=>sessionStatsSnapshot()});

finaleContinue?.addEventListener('click',()=>{telemetryMeaningful('finale_continue');endFinale();schedulePostgameAchievementReveal();});
finaleStats?.addEventListener('click',()=>{telemetryMeaningful('finale_report');endFinale();window.setTimeout(openSessionDebrief,120);});
window.setInterval(updateFinaleReady,6500);window.setTimeout(updateFinaleReady,2500);

// Shared Three.js loader. PreviewLocal.bat serves the site over localhost so module imports behave like GitHub Pages.
let threePromise;
let threeRecoveryTimer=null;
const THREE_LOCAL_PREVIEW=/^(?:localhost|127\.0\.0\.1)$/.test(location.hostname);
const THREE_MODULE_SOURCES=[
  'https://cdn.jsdelivr.net/npm/three@0.180.0/build/three.module.js',
  'https://cdnjs.cloudflare.com/ajax/libs/three.js/0.180.0/three.module.js',
  'https://unpkg.com/three@0.180.0/build/three.module.js?module',
  'https://esm.sh/three@0.180.0',
  'https://esm.run/three@0.180.0'
];
function scheduleThreeRecovery(delay=THREE_LOCAL_PREVIEW?1200:7000){
  if(threeRecoveryTimer!=null)return;
  threeRecoveryTimer=window.setTimeout(()=>{
    threeRecoveryTimer=null;
    if(mippiRuntimeHealth.three.hero&&mippiRuntimeHealth.three.ambient&&mippiRuntimeHealth.three.about)return;
    threePromise=null;
    mippiRuntimeHealth.bootStage='three-retrying';
    if(!mippiRuntimeHealth.three.hero)initScene();
    if(!mippiRuntimeHealth.three.ambient)initAmbientScene();
    if(!mippiRuntimeHealth.three.about)initAboutScene();
  },delay);
}
async function importThreeFromFirstAvailable(timeoutMs=THREE_LOCAL_PREVIEW?3500:8000){
  const attempts=THREE_MODULE_SOURCES.map(src=>{
    mippiRuntimeHealth.three.attempts.push(src);
    return import(src).then(module=>({module,src})).catch(error=>{
      console.warn('Three.js source unavailable.',src,error);
      throw error;
    });
  });
  let timer=null;
  try{
    return await Promise.race([
      Promise.any(attempts),
      new Promise((_,reject)=>{timer=window.setTimeout(()=>reject(new Error('Three.js sources timed out.')),timeoutMs);})
    ]);
  } finally { if(timer!=null)window.clearTimeout(timer); }
}
function loadThree() {
  if (!threePromise) threePromise=(async()=>{
    mippiRuntimeHealth.bootStage='three-loading';
    try{
      const result=await importThreeFromFirstAvailable();
      mippiRuntimeHealth.three.source=result.src;
      mippiRuntimeHealth.bootStage='three-loaded';
      return result.module;
    }catch(error){
      mippiRuntimeHealth.bootStage='three-unavailable';
      scheduleThreeRecovery();
      throw error;
    }
  })();
  return threePromise;
}
window.addEventListener('online',()=>{
  if(!(mippiRuntimeHealth.three.hero&&mippiRuntimeHealth.three.ambient&&mippiRuntimeHealth.three.about)){
    if(threeRecoveryTimer!=null){window.clearTimeout(threeRecoveryTimer);threeRecoveryTimer=null;}
    scheduleThreeRecovery(750);
  }
});
window.addEventListener('load',()=>{
  if(!THREE_LOCAL_PREVIEW)return;
  window.setTimeout(()=>{
    if(mippiRuntimeHealth.three.hero&&mippiRuntimeHealth.three.ambient&&mippiRuntimeHealth.three.about)return;
    if(threeRecoveryTimer!=null){window.clearTimeout(threeRecoveryTimer);threeRecoveryTimer=null;}
    threePromise=null;
    scheduleThreeRecovery(50);
  },5000);
});

// Three.js scene. The site remains fully usable if this import fails.
const canvas = document.querySelector('#hero-canvas');
const fallback = document.querySelector('#scene-fallback');
fallback?.classList.add('show');
// Intentionally ignore OS/browser reduced-motion preferences here.
// Motion is part of the playable portfolio and silently disabling it can hide
// particles, flying pickups, UFOs, Shooting Stars, Doug Bones, and other core
// interactions from visitors who may not know the preference is enabled.
const reduceMotion = false;
mippiRuntimeHealth.bootStage='pre-three-complete';
startDynamicObjectives();

async function initScene() {
  if(mippiRuntimeHealth.three.hero)return;
  canvas?.removeAttribute('hidden');
  try {
    const THREE = await loadThree();

    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true, powerPreference: 'high-performance' });
    fallback?.classList.remove('show');
    fallback?.classList.add('scene-live');
    mippiRuntimeHealth.three.hero=true; mippiRuntimeHealth.bootStage='hero-three-live';
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.setClearColor(0x000000, 0);

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x090b10, 0.07);

    const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 100);
    camera.position.set(0, 1.5, 8.6);

    const root = new THREE.Group();
    root.position.set(3.05, 0.05, -0.2);
    root.scale.setScalar(1.28);
    scene.add(root);

    const ambient = new THREE.HemisphereLight(0xa9c7ff, 0x07101a, 2.35);
    scene.add(ambient);
    const key = new THREE.DirectionalLight(0x168cff, 5.2);
    key.position.set(4, 6, 6);
    scene.add(key);
    const rim = new THREE.PointLight(0x5daeff, 32, 14, 2);
    rim.position.set(-4, 0, 1);
    scene.add(rim);

    const coreMat = new THREE.MeshStandardMaterial({ color: 0x182334, roughness: 0.24, metalness: 0.86, emissive: 0x0067c9, emissiveIntensity: 0.34 });
    const core = new THREE.Mesh(new THREE.IcosahedronGeometry(1.4, 1), coreMat);
    core.rotation.set(0.4, 0.6, 0.2);
    root.add(core);

    const coreWire = new THREE.LineSegments(
      new THREE.EdgesGeometry(new THREE.IcosahedronGeometry(1.46, 1)),
      new THREE.LineBasicMaterial({ color: 0x168cff, transparent: true, opacity: 0.78 })
    );
    core.add(coreWire);

    // Site identity mark floating just in front of the central object.
    const logoTexture = new THREE.TextureLoader().load('assets/mippi-logo-blue.png');
    logoTexture.colorSpace = THREE.SRGBColorSpace;
    const logoMaterial = new THREE.ShaderMaterial({
      uniforms:{
        logoMap:{value:logoTexture},
        tintColor:{value:new THREE.Color(0x2f93ff)},
        logoOpacity:{value:0.82}
      },
      transparent:true,
      depthWrite:false,
      userData:{skipNanite:true},
      vertexShader:`varying vec2 vUv; void main(){ vUv=uv; gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0); }`,
      fragmentShader:`uniform sampler2D logoMap; uniform vec3 tintColor; uniform float logoOpacity; varying vec2 vUv;
        void main(){ vec4 tex=texture2D(logoMap,vUv); float lum=max(tex.r,max(tex.g,tex.b)); float b=0.66+lum*0.52; gl_FragColor=vec4(tintColor*b,tex.a*logoOpacity); }`
    });
    const logoPlane = new THREE.Mesh(new THREE.PlaneGeometry(1.25, 1.25), logoMaterial);
    logoPlane.position.set(0, 0, 1.55);
    root.add(logoPlane);

    const ringMat = new THREE.MeshStandardMaterial({ color: 0x283447, roughness: 0.3, metalness: 0.88, emissive:0x00182f, emissiveIntensity:0.16 });
    const ringA = new THREE.Mesh(new THREE.TorusGeometry(2.35, 0.025, 8, 100), ringMat);
    ringA.rotation.set(1.15, 0.2, 0.5);
    root.add(ringA);
    const ringB = ringA.clone();
    ringB.scale.setScalar(1.22);
    ringB.rotation.set(0.45, 0.9, 1.2);
    root.add(ringB);


    // Legendary mode is a rarity upgrade, not just a palette swap.
    // These extra halo rings and orbiting shards only appear after a successful wish.
    const legendaryFx = new THREE.Group();
    legendaryFx.visible = false;
    root.add(legendaryFx);

    const legendaryShellMat = new THREE.MeshBasicMaterial({
      color:0xff9b25, transparent:true, opacity:0.075, wireframe:true,
      blending:THREE.AdditiveBlending, depthWrite:false
    });
    const legendaryShell = new THREE.Mesh(new THREE.IcosahedronGeometry(1.82, 2), legendaryShellMat);
    legendaryFx.add(legendaryShell);

    const legendaryGoldMat = new THREE.MeshBasicMaterial({
      color:0xffb52d, transparent:true, opacity:0.64,
      blending:THREE.AdditiveBlending, depthWrite:false
    });
    const legendaryTealMat = new THREE.MeshBasicMaterial({
      color:0x42d8d4, transparent:true, opacity:0.50,
      blending:THREE.AdditiveBlending, depthWrite:false
    });
    const legendaryRingA = new THREE.Mesh(new THREE.TorusGeometry(2.78,0.032,8,128), legendaryGoldMat);
    legendaryRingA.rotation.set(0.88,0.42,0.18);
    legendaryFx.add(legendaryRingA);
    const legendaryRingB = new THREE.Mesh(new THREE.TorusGeometry(3.08,0.018,8,128), legendaryTealMat);
    legendaryRingB.rotation.set(0.28,1.05,0.82);
    legendaryFx.add(legendaryRingB);

    const legendaryShards = new THREE.Group();
    for(let i=0;i<12;i++){
      const material=(i%3===0?legendaryTealMat:legendaryGoldMat).clone();
      material.opacity=i%3===0?.68:.78;
      const shard=new THREE.Mesh(new THREE.TetrahedronGeometry(i%4===0?.17:.12,0),material);
      const a=(i/12)*Math.PI*2;
      const r=2.15+(i%2)*.28;
      shard.position.set(Math.cos(a)*r,Math.sin(a)*r*.62,Math.sin(a*1.7)*.62);
      shard.rotation.set(a*.7,a*1.2,-a*.45);
      shard.userData.phase=a;
      legendaryShards.add(shard);
    }
    legendaryFx.add(legendaryShards);

    // A small orbit of actual tool identities makes the hero feel like a live game-design workspace.
    const toolOrbit = new THREE.Group();
    const toolSpecs = [
      ['assets/tool-icons/hue.png', -3.0, 1.7, -0.3],
      ['assets/tool-icons/latch.png', 3.0, 1.75, -0.25],
      ['assets/tool-icons/lux.png', -3.2, -1.55, -0.1],
      ['assets/tool-icons/focus.png', 3.1, -1.45, -0.4],
      ['assets/tool-icons/link.png', -0.9, 2.9, -0.8],
      ['assets/tool-icons/digit.png', 1.15, -2.8, -0.75],
    ];
    toolSpecs.forEach(([path,x,y,z], i) => {
      const tex = new THREE.TextureLoader().load(path);
      tex.colorSpace = THREE.SRGBColorSpace;
      const mat = new THREE.MeshBasicMaterial({ map:tex, transparent:true, opacity:0.74, depthWrite:false, side:THREE.DoubleSide });
      const plane = new THREE.Mesh(new THREE.PlaneGeometry(0.62,0.62), mat);
      plane.position.set(x,y,z);
      plane.userData.baseY = y;
      plane.userData.phase = i * 0.8;
      toolOrbit.add(plane);
    });
    root.add(toolOrbit);

    const grid = new THREE.GridHelper(10, 20, 0x1d79d7, 0x14304d);
    grid.position.set(0,-3.35,-1.1);
    grid.material.transparent = true;
    grid.material.opacity = 0.22;
    // Use one tintable grid material so rarity themes do not leave old blue lines behind.
    grid.material.vertexColors = false;
    grid.material.color.setHex(0x14304d);
    grid.material.needsUpdate = true;
    root.add(grid);

    const linkMat = new THREE.LineBasicMaterial({ color:0x147ee0, transparent:true, opacity:0.28 });
    const linkPts = [];
    [[-2.4,1.1,.4],[2.5,1.2,.2],[-1.7,-1.8,.9],[2.1,-1.6,-.2]].forEach(p => {
      linkPts.push(new THREE.Vector3(0,0,0), new THREE.Vector3(...p));
    });
    const linkGeo = new THREE.BufferGeometry().setFromPoints(linkPts);
    root.add(new THREE.LineSegments(linkGeo, linkMat));

    const nodes = [
      { key:'games', color:0xff6f91, pos:[-2.4, 1.1, 0.4], geo: new THREE.OctahedronGeometry(0.44, 0) },
      { key:'consulting', color:0x0070e0, pos:[2.5, 1.2, 0.2], geo: new THREE.BoxGeometry(0.65,0.65,0.65) },
      { key:'career', color:0x5daeff, pos:[-1.7,-1.8,0.9], geo: new THREE.CylinderGeometry(0.38,0.38,0.72,6) },
      { key:'tools', color:0x2f93ff, pos:[2.1,-1.6,-0.2], geo: new THREE.DodecahedronGeometry(0.48,0) }
    ];

    const clickable = [];
    nodes.forEach((info, i) => {
      const group = new THREE.Group();
      group.position.set(...info.pos);
      group.userData.key = info.key;
      const mesh = new THREE.Mesh(info.geo, new THREE.MeshStandardMaterial({ color: info.color, roughness:0.28, metalness:0.6, emissive: info.color, emissiveIntensity:0.07 }));
      mesh.userData.key = info.key;
      group.add(mesh);
      const halo = new THREE.Mesh(new THREE.TorusGeometry(0.78,0.018,8,50), new THREE.MeshBasicMaterial({ color:info.color, transparent:true, opacity:0.5 }));
      halo.rotation.x = Math.PI / 2;
      group.add(halo);
      root.add(group);
      clickable.push(mesh);
    });

    // Background particles
    const count = 220;
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      positions[i*3] = (Math.random() - .5) * 18;
      positions[i*3+1] = (Math.random() - .5) * 11;
      positions[i*3+2] = (Math.random() - .5) * 10 - 2;
    }
    const particleGeo = new THREE.BufferGeometry();
    particleGeo.setAttribute('position', new THREE.BufferAttribute(positions,3));
    const particles = new THREE.Points(particleGeo, new THREE.PointsMaterial({ color:0x7faee8, size:0.03, transparent:true, opacity:0.62, depthWrite:false }));
    scene.add(particles);
    registerNaniteScene(scene, THREE);

    const pointer = new THREE.Vector2(0,0);
    const raycaster = new THREE.Raycaster();
    let hovered = null;
    const sceneReadout = document.querySelector('#scene-readout');
    const sceneLabels = { games:'GAMES // CLICK TO JUMP', career:'CAREER // CLICK TO JUMP', consulting:'CONSULTING // CLICK TO JUMP', tools:'UNREAL TOOLS // CLICK TO JUMP' };
    let dragX = 0;
    let dragY = 0;
    let lastX = 0;
    let lastY = 0;
    let dragging = false;

    function resize() {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, window.innerWidth < 720 ? 1.35 : 1.8);
      renderer.setPixelRatio(dpr);
      renderer.setSize(rect.width, rect.height, false);
      camera.aspect = rect.width / Math.max(rect.height, 1);
      camera.updateProjectionMatrix();
    }
    resize();
    new ResizeObserver(resize).observe(canvas);

    function setPointer(event) {
      const rect = canvas.getBoundingClientRect();
      pointer.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      pointer.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
    }

    canvas.addEventListener('pointerdown', event => {
      dragging = true;
      lastX = event.clientX;
      lastY = event.clientY;
      setPointer(event);
      canvas.setPointerCapture?.(event.pointerId);
    });
    canvas.addEventListener('pointermove', event => {
      setPointer(event);
      if (dragging) {
        dragX += (event.clientX - lastX) * 0.004;
        dragY += (event.clientY - lastY) * 0.003;
        lastX = event.clientX;
        lastY = event.clientY;
      }
    });
    canvas.addEventListener('pointerup', event => {
      dragging = false;
      setPointer(event);
      raycaster.setFromCamera(pointer, camera);
      const hits = raycaster.intersectObjects(clickable, false);
      if (hits[0]) {
        if(document.body.classList.contains('interaction-hunt')) return;
        telemetryCount('portfolio','heroSignalClicks');
        telemetryMeaningful('hero_signal',{target:hits[0].object.userData.key||'unknown'});
        showAchievement('signal');
        document.getElementById(hits[0].object.userData.key)?.scrollIntoView({ behavior:'smooth' });
      }
    });
    canvas.addEventListener('pointercancel', () => dragging = false);

    const clock = new THREE.Clock();
    function frame() {
      const t = clock.getElapsedTime();
      const completionMode = document.body.classList.contains('theme-complete');
      const legendaryMode = document.body.classList.contains('theme-legendary');
      coreMat.color.setHex(legendaryMode ? 0x2f1907 : completionMode ? 0x2e123f : 0x182334);
      coreMat.emissive.setHex(legendaryMode ? 0xff7a18 : completionMode ? 0x8d2ee8 : 0x0067c9);
      ringMat.color.setHex(legendaryMode ? 0x137f83 : completionMode ? 0x6f39a4 : 0x283447);
      key.color.setHex(legendaryMode ? 0xffc928 : completionMode ? 0xc267ff : 0x168cff);
      rim.color.setHex(legendaryMode ? 0x55e0dc : completionMode ? 0x6ff5ff : 0x5daeff);
      ambient.color.setHex(legendaryMode ? 0xffd28a : completionMode ? 0xd7b0ff : 0xa9c7ff);
      ambient.groundColor.setHex(legendaryMode ? 0x073f41 : completionMode ? 0x180923 : 0x07101a);
      coreWire.material.color.setHex(legendaryMode ? 0x48d9d5 : completionMode ? 0xd06dff : 0x168cff);
      logoMaterial.uniforms.tintColor.value.setHex(legendaryMode ? 0xffc43f : completionMode ? 0xd96cff : 0x2f93ff);
      logoMaterial.uniforms.logoOpacity.value = legendaryMode ? 0.94 : completionMode ? 0.88 : 0.82;
      linkMat.color.setHex(legendaryMode ? 0x42d8d4 : completionMode ? 0xff4fc8 : 0x147ee0);
      grid.material.color.setHex(legendaryMode ? 0x176f72 : completionMode ? 0x55256f : 0x14304d);
      grid.material.opacity = legendaryMode ? 0.30 : completionMode ? 0.27 : 0.22;
      scene.fog.color.setHex(legendaryMode ? 0x110904 : completionMode ? 0x0c0713 : 0x090b10);
      const completionNodeColors=[0xff4fc8,0x67e8ff,0xb13cff,0xff8bd7];
      const legendaryNodeColors=[0xff7a1a,0x35d5d1,0xffc83d,0x76ece6];
      nodes.forEach((info,i)=>{
        const g=root.children.find(child=>child.userData?.key===info.key);
        const mesh=g?.children?.[0], halo=g?.children?.[1];
        const c=legendaryMode?legendaryNodeColors[i]:completionMode?completionNodeColors[i]:info.color;
        if(mesh?.material?.color){ mesh.material.color.setHex(c); mesh.material.emissive?.setHex(c); }
        if(halo?.material?.color) halo.material.color.setHex(c);
      });
      legendaryFx.visible=legendaryMode;
      particles.material.color.setHex(legendaryMode?0xffc85a:completionMode?0xe477ff:0x7faee8);
      particles.material.size=legendaryMode?0.052:completionMode?0.04:0.03;
      particles.material.opacity=legendaryMode?0.82:completionMode?0.70:0.62;
      if (legendaryMode && sceneReadout && !hovered) sceneReadout.textContent = 'LEGENDARY SIGNAL // WISH FULFILLED';
      else if (completionMode && sceneReadout && !hovered) sceneReadout.textContent = 'SYSTEM COMPLETE // OVERDRIVE';
      else if (sceneReadout && !hovered) sceneReadout.textContent = 'SELECT A SIGNAL';
      if (!reduceMotion) {
        core.rotation.y += completionMode ? 0.006 : 0.002;
        logoPlane.rotation.z = Math.sin(t * 0.32) * 0.035;
        logoPlane.position.y = Math.sin(t * 0.7) * 0.035;
        ringA.rotation.z += completionMode ? 0.0034 : 0.0014;
        ringB.rotation.y -= completionMode ? 0.0028 : 0.001;
        const pulse = legendaryMode ? 1 + Math.sin(t * 2.25) * 0.052 : completionMode ? 1 + Math.sin(t * 1.8) * 0.035 : 1;
        core.scale.setScalar(pulse);
        if(legendaryMode){
          legendaryShell.rotation.x += 0.0018;
          legendaryShell.rotation.y -= 0.0027;
          legendaryShell.material.opacity = 0.065 + (Math.sin(t*1.7)+1)*0.025;
          legendaryRingA.rotation.z += 0.0062;
          legendaryRingA.rotation.x += 0.0009;
          legendaryRingB.rotation.y -= 0.0052;
          legendaryRingB.rotation.z -= 0.0011;
          legendaryShards.rotation.z -= 0.0035;
          legendaryShards.rotation.y += 0.0021;
          legendaryShards.children.forEach((shard,i)=>{
            const flicker=.72+(Math.sin(t*2.4+shard.userData.phase)+1)*.14;
            shard.scale.setScalar(flicker);
            shard.rotation.x += .012 + i*.0002;
            shard.rotation.y -= .009;
          });
        }
        toolOrbit.rotation.z = Math.sin(t * 0.16) * 0.045;
        toolOrbit.children.forEach(icon => {
          icon.position.y = icon.userData.baseY + Math.sin(t * 0.85 + icon.userData.phase) * 0.08;
          icon.lookAt(camera.position);
        });
        nodes.forEach((info, i) => {
          const g = root.children.find(child => child.userData?.key === info.key);
          if (g) g.position.y = info.pos[1] + Math.sin(t * 1.1 * (slowmoEnabled ? .5 : 1) + i) * 0.08;
        });
        root.rotation.y += (pointer.x * 0.12 + dragX - root.rotation.y) * 0.025;
        root.rotation.x += (-pointer.y * 0.06 + dragY - root.rotation.x) * 0.025;
        particles.rotation.y += 0.00045;
        particles.rotation.x = Math.sin(t * 0.08) * 0.035;
      }
      raycaster.setFromCamera(pointer, camera);
      const hits = raycaster.intersectObjects(clickable, false);
      const next = hits[0]?.object ?? null;
      if (hovered !== next) {
        if (hovered) hovered.scale.setScalar(1);
        if (next) next.scale.setScalar(1.14);
        hovered = next;
        canvas.style.cursor = hovered ? 'pointer' : 'grab';
        if (sceneReadout) sceneReadout.textContent = hovered ? (sceneLabels[hovered.userData.key] || 'CLICK TO NAVIGATE') : 'SELECT A SIGNAL';
      }
      renderer.render(scene,camera);
      requestAnimationFrame(frame);
    }
    frame();
  } catch (error) {
    console.warn('3D scene unavailable, using fallback.', error);
    fallback?.classList.remove('scene-live');
    fallback?.classList.add('show');
    canvas?.setAttribute('hidden','');
  }
}

initScene();

async function initAmbientScene() {
  if(mippiRuntimeHealth.three.ambient)return;
  const ambientCanvas = document.querySelector('#ambient-canvas');
  if (!ambientCanvas || reduceMotion) return;
  try {
    const THREE = await loadThree();
    const renderer = new THREE.WebGLRenderer({ canvas:ambientCanvas, alpha:true, antialias:false, powerPreference:'low-power' });
    mippiRuntimeHealth.three.ambient=true;
    renderer.setClearColor(0x000000,0);
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(46,1,0.1,100);
    camera.position.set(0,0,12);
    const root = new THREE.Group();
    scene.add(root);

    const pointCount = 170;
    const pos = new Float32Array(pointCount*3);
    for (let i=0;i<pointCount;i++) {
      pos[i*3]=(Math.random()-.5)*20;
      pos[i*3+1]=(Math.random()-.5)*13;
      pos[i*3+2]=(Math.random()-.5)*12-3;
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position',new THREE.BufferAttribute(pos,3));
    const ambientPoints = new THREE.Points(geo,new THREE.PointsMaterial({color:0x2f93ff,size:.042,transparent:true,opacity:.38,depthWrite:false}));
    root.add(ambientPoints);

    // A second, sparse particle layer creates occasional larger drifting signals.
    const signalCount=36;
    const signalPos=new Float32Array(signalCount*3);
    for(let i=0;i<signalCount;i++){ signalPos[i*3]=(Math.random()-.5)*24; signalPos[i*3+1]=(Math.random()-.5)*15; signalPos[i*3+2]=(Math.random()-.5)*10-2; }
    const signalGeo=new THREE.BufferGeometry();
    signalGeo.setAttribute('position',new THREE.BufferAttribute(signalPos,3));
    const signalPoints=new THREE.Points(signalGeo,new THREE.PointsMaterial({color:0x6eb8ff,size:.085,transparent:true,opacity:.13,depthWrite:false}));
    root.add(signalPoints);

    // Completion-only overdrive particles. They stay invisible in the standard theme.
    const overdriveCount=260;
    const overdrivePos=new Float32Array(overdriveCount*3);
    for(let i=0;i<overdriveCount;i++){ overdrivePos[i*3]=(Math.random()-.5)*26; overdrivePos[i*3+1]=(Math.random()-.5)*17; overdrivePos[i*3+2]=(Math.random()-.5)*12-2; }
    const overdriveGeo=new THREE.BufferGeometry();
    overdriveGeo.setAttribute('position',new THREE.BufferAttribute(overdrivePos,3));
    const overdriveMat=new THREE.PointsMaterial({color:0xd976ff,size:.055,transparent:true,opacity:0,depthWrite:false});
    const overdrivePoints=new THREE.Points(overdriveGeo,overdriveMat);
    root.add(overdrivePoints);

    let mouseX=0,mouseY=0,targetMouseX=0,targetMouseY=0;
    window.addEventListener('pointermove',event=>{
      targetMouseX=(event.clientX/window.innerWidth-.5)*2;
      targetMouseY=(event.clientY/window.innerHeight-.5)*2;
    },{passive:true});

    const lineMat = new THREE.LineBasicMaterial({color:0x168cff,transparent:true,opacity:.10});
    for (let i=0;i<8;i++) {
      const g = i%2 ? new THREE.OctahedronGeometry(.45+i*.035,0) : new THREE.IcosahedronGeometry(.42+i*.03,0);
      const wire = new THREE.LineSegments(new THREE.WireframeGeometry(g),lineMat.clone());
      wire.position.set((Math.random()-.5)*15,(Math.random()-.5)*9,(Math.random()-.5)*8-1);
      wire.rotation.set(Math.random()*2,Math.random()*2,Math.random()*2);
      wire.userData.speed=(Math.random()*.0015+.0005)*(Math.random()>.5?1:-1);
      root.add(wire);
    }
    function resizeAmbient(){
      const w=window.innerWidth,h=window.innerHeight,dpr=Math.min(window.devicePixelRatio||1,1.25);
      renderer.setPixelRatio(dpr); renderer.setSize(w,h,false); camera.aspect=w/Math.max(h,1); camera.updateProjectionMatrix();
    }
    resizeAmbient(); window.addEventListener('resize',resizeAmbient,{passive:true});
    function frame(){
      const scroll=window.scrollY/(document.documentElement.scrollHeight||1);
      const completionMode=document.body.classList.contains('theme-complete');
      const legendaryMode=document.body.classList.contains('theme-legendary');
      const boosted=document.body.classList.contains('particle-boost');
      ambientPoints.material.color.setHex(legendaryMode?0xffa52d:0x2f93ff);
      signalPoints.material.color.setHex(legendaryMode?0x45ddd8:completionMode?0xff63ca:0x6eb8ff);
      overdriveMat.color.setHex(legendaryMode?0xffc548:0xd976ff);
      mouseX += (targetMouseX-mouseX)*.035;
      mouseY += (targetMouseY-mouseY)*.035;
      root.rotation.y += completionMode ? .00055 : .00024;
      root.rotation.x = scroll*.22 + (completionMode ? mouseY*.035 : 0);
      root.position.x += (((completionMode ? mouseX*.34 : 0))-root.position.x)*.04;
      root.position.y += (((completionMode ? -mouseY*.20 : 0))-root.position.y)*.04;
      ambientPoints.rotation.y += completionMode ? .00062 : .00034;
      ambientPoints.material.opacity = boosted ? (completionMode?.82:.72) : (completionMode?.56:.38);
      ambientPoints.material.size = boosted ? (completionMode?.075:.068) : .042;
      signalPoints.rotation.y -= completionMode ? .00042 : .00018;
      signalPoints.rotation.z += completionMode ? .00018 : .00008;
      signalPoints.material.opacity = completionMode ? (boosted?.38:.30) : (boosted?.22:.13);
      signalPoints.material.size = completionMode ? .11 : .085;
      overdriveMat.opacity += (((completionMode ? (boosted?.48:.40) : (boosted?.10:0)))-overdriveMat.opacity)*.055;
      overdrivePoints.rotation.y -= completionMode ? .00048 : .00008;
      overdrivePoints.rotation.x += completionMode ? .00017 : .00003;
      root.children.forEach((o,i)=>{ if(o.userData.speed){ const boost=completionMode?2.1:1; if(o.material?.color) o.material.color.setHex(legendaryMode?0x39cfcb:completionMode?0xd976ff:0x168cff); o.rotation.x+=o.userData.speed*boost; o.rotation.y-=o.userData.speed*.7*boost; }});
      renderer.render(scene,camera); requestAnimationFrame(frame);
    }
    frame();
  } catch (e) { console.warn('Ambient Three.js layer unavailable.',e); }
}

async function initAboutScene() {
  if(mippiRuntimeHealth.three.about)return;
  const aboutCanvas=document.querySelector('#about-canvas');
  if(!aboutCanvas) return;
  try {
    const THREE=await loadThree();
    const renderer=new THREE.WebGLRenderer({canvas:aboutCanvas,alpha:true,antialias:true,powerPreference:'low-power'});
    mippiRuntimeHealth.three.about=true;
    renderer.setClearColor(0x000000,0);
    const scene=new THREE.Scene();
    const camera=new THREE.PerspectiveCamera(42,1,.1,50); camera.position.set(0,0,8);
    const root=new THREE.Group(); root.position.set(2.15,0,0); scene.add(root);
    const aboutLight=new THREE.AmbientLight(0x8bbcff,2.2); scene.add(aboutLight);
    const ringMat=new THREE.MeshBasicMaterial({color:0x168cff,transparent:true,opacity:.22,wireframe:true});
    const r1=new THREE.Mesh(new THREE.TorusGeometry(2.0,.025,6,72),ringMat); r1.rotation.x=1.1; root.add(r1);
    const r2=new THREE.Mesh(new THREE.TorusGeometry(1.35,.02,6,60),ringMat.clone()); r2.rotation.y=.8; root.add(r2);
    const mats=[0x2f93ff,0x5daeff,0x7dc2ff,0x006bd6].map(c=>new THREE.MeshStandardMaterial({color:c,emissive:c,emissiveIntensity:.2,roughness:.35,metalness:.45}));
    const geos=[new THREE.BoxGeometry(.38,.38,.38),new THREE.OctahedronGeometry(.32),new THREE.TetrahedronGeometry(.36),new THREE.IcosahedronGeometry(.31,0)];
    const nodes=[];
    for(let i=0;i<4;i++){ const m=new THREE.Mesh(geos[i],mats[i]); m.userData.phase=i*Math.PI/2; root.add(m); nodes.push(m); }
    const pCount=110;
    const pPos=new Float32Array(pCount*3);
    for(let i=0;i<pCount;i++){ pPos[i*3]=(Math.random()-.5)*5.4; pPos[i*3+1]=(Math.random()-.5)*3.1; pPos[i*3+2]=(Math.random()-.5)*3.5; }
    const pGeo=new THREE.BufferGeometry(); pGeo.setAttribute('position',new THREE.BufferAttribute(pPos,3));
    const aboutParticles=new THREE.Points(pGeo,new THREE.PointsMaterial({color:0x6cb6ff,size:.035,transparent:true,opacity:.22,depthWrite:false}));
    root.add(aboutParticles);
    registerNaniteScene(scene, THREE);
    function resize(){ const rect=aboutCanvas.getBoundingClientRect(),dpr=Math.min(window.devicePixelRatio||1,1.5); renderer.setPixelRatio(dpr);renderer.setSize(rect.width,rect.height,false);camera.aspect=rect.width/Math.max(rect.height,1);camera.updateProjectionMatrix(); }
    resize(); new ResizeObserver(resize).observe(aboutCanvas);
    const clock=new THREE.Clock();
    function frame(){ const t=clock.getElapsedTime(); const complete=document.body.classList.contains('theme-complete'); const legendary=document.body.classList.contains('theme-legendary'); aboutLight.color.setHex(legendary?0xffc878:0x8bbcff); ringMat.color.setHex(legendary?0xff8a1d:complete?0xd85cff:0x168cff); r2.material.color.setHex(legendary?0x45ddd8:complete?0x65e9ff:0x168cff); aboutParticles.material.color.setHex(legendary?0xffc957:complete?0xff63ca:0x6cb6ff); aboutParticles.material.opacity=complete?.52:.30; aboutParticles.material.size=complete?.14:.085; mats.forEach((m,i)=>{const cs=legendary?[0xff7a1a,0xffc83d,0x42d8d4,0xfff0c2]:[0xd85cff,0xff4fc8,0x65e9ff,0xa868ff];m.color.setHex(complete?cs[i]:[0x2f93ff,0x5daeff,0x7dc2ff,0x006bd6][i]);m.emissive.copy(m.color);m.emissiveIntensity=complete?.42:.2;}); if(!reduceMotion){ const boost=complete?1.8:1;r1.rotation.z+=.0018*boost;r2.rotation.x-=.0012*boost;aboutParticles.rotation.y+=.0009*boost;aboutParticles.rotation.z=Math.sin(t*.12)*.08;nodes.forEach((m,i)=>{const a=t*.32*boost+m.userData.phase;m.position.set(Math.cos(a)*1.72,Math.sin(a*1.15)*.75,Math.sin(a)*.55);m.rotation.x+=.006*boost;m.rotation.y+=.008*boost;});} renderer.render(scene,camera);requestAnimationFrame(frame);}
    frame();
  } catch(e){ console.warn('About Three.js scene unavailable.',e); }
}

initAmbientScene();
initAboutScene();

// v2.26 Azure Altar screenshot gallery.
const azureGalleryImages = Array.from({ length: 10 }, (_, i) => {
  const n = String(i + 1).padStart(2, '0');
  return {
    full: `assets/azure-gallery/azure-${n}.webp`,
    thumb: `assets/azure-gallery/azure-${n}-thumb.jpg`,
    alt: `Azure Altar screenshot ${i + 1}`
  };
});
const azureCard = document.querySelector('.azure-altar');
const azureGallery = document.querySelector('#azure-gallery');
const azureGalleryImage = document.querySelector('#azure-gallery-image');
const azureGalleryCounter = document.querySelector('#azure-gallery-counter');
const azureGalleryThumbs = document.querySelector('#azure-gallery-thumbs');
const azureGalleryClose = document.querySelector('.azure-gallery-close');
const azureGalleryBackdrop = document.querySelector('.azure-gallery-backdrop');
const azureGalleryPrev = document.querySelector('.azure-gallery-prev');
const azureGalleryNext = document.querySelector('.azure-gallery-next');
let azureGalleryIndex = 0;
let azureGalleryLastFocus = null;
let azureTouchStartX = null;

function renderAzureGalleryThumbs() {
  if (!azureGalleryThumbs || azureGalleryThumbs.children.length) return;
  azureGalleryThumbs.innerHTML = azureGalleryImages.map((image, index) => `
    <button class="azure-gallery-thumb" type="button" data-index="${index}" aria-label="View Azure Altar screenshot ${index + 1}">
      <img src="${image.thumb}" alt="" aria-hidden="true" loading="lazy" />
    </button>`).join('');
  azureGalleryThumbs.addEventListener('click', event => {
    const button = event.target.closest('.azure-gallery-thumb');
    if (!button) return;
    showAzureGalleryImage(Number(button.dataset.index));
  });
}

function showAzureGalleryImage(index) {
  if (!azureGalleryImage) return;
  telemetryUnique('portfolio','galleryImagesViewed',String((index + azureGalleryImages.length) % azureGalleryImages.length));
  azureGalleryIndex = (index + azureGalleryImages.length) % azureGalleryImages.length;
  const image = azureGalleryImages[azureGalleryIndex];
  azureGalleryImage.src = image.full;
  azureGalleryImage.alt = image.alt;
  if (azureGalleryCounter) azureGalleryCounter.textContent = `${azureGalleryIndex + 1} / ${azureGalleryImages.length}`;
  azureGalleryThumbs?.querySelectorAll('.azure-gallery-thumb').forEach((thumb, i) => {
    thumb.classList.toggle('active', i === azureGalleryIndex);
    thumb.setAttribute('aria-current', i === azureGalleryIndex ? 'true' : 'false');
  });
  azureGalleryThumbs?.querySelector('.azure-gallery-thumb.active')?.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });

  // Quietly warm the adjacent images so arrow-key browsing feels immediate.
  [-1, 1].forEach(offset => {
    const next = azureGalleryImages[(azureGalleryIndex + offset + azureGalleryImages.length) % azureGalleryImages.length];
    const preload = new Image();
    preload.src = next.full;
  });
}

function openAzureGallery(index = 0) {
  if (!azureGallery) return;
  telemetryCount('portfolio','galleryOpens');
  telemetryMeaningful('azure_gallery_opened');
  azureGalleryLastFocus = document.activeElement;
  renderAzureGalleryThumbs();
  showAzureGalleryImage(index);
  azureGallery.classList.add('open');
  azureGallery.setAttribute('aria-hidden', 'false');
  document.body.classList.add('azure-gallery-open');
  azureGalleryClose?.focus({ preventScroll: true });
}

function closeAzureGallery() {
  if (!azureGallery?.classList.contains('open')) return;
  azureGallery.classList.remove('open');
  azureGallery.setAttribute('aria-hidden', 'true');
  document.body.classList.remove('azure-gallery-open');
  if (azureGalleryImage) azureGalleryImage.removeAttribute('src');
  azureGalleryLastFocus?.focus?.({ preventScroll: true });
}

azureCard?.addEventListener('click', event => {
  if (event.target.closest('a,button')) return;
  openAzureGallery(0);
});
azureCard?.addEventListener('keydown', event => {
  if (event.key === 'Enter' || event.key === ' ') {
    event.preventDefault();
    openAzureGallery(0);
  }
});
azureGalleryClose?.addEventListener('click', closeAzureGallery);
azureGalleryBackdrop?.addEventListener('click', closeAzureGallery);
azureGalleryPrev?.addEventListener('click', () => showAzureGalleryImage(azureGalleryIndex - 1));
azureGalleryNext?.addEventListener('click', () => showAzureGalleryImage(azureGalleryIndex + 1));

document.addEventListener('keydown', event => {
  if (!azureGallery?.classList.contains('open')) return;
  if (event.key === 'Escape') { event.preventDefault(); closeAzureGallery(); }
  if (event.key === 'ArrowLeft') { event.preventDefault(); showAzureGalleryImage(azureGalleryIndex - 1); }
  if (event.key === 'ArrowRight') { event.preventDefault(); showAzureGalleryImage(azureGalleryIndex + 1); }
});

azureGalleryImage?.addEventListener('touchstart', event => {
  azureTouchStartX = event.changedTouches[0]?.clientX ?? null;
}, { passive: true });
azureGalleryImage?.addEventListener('touchend', event => {
  if (azureTouchStartX == null) return;
  const endX = event.changedTouches[0]?.clientX ?? azureTouchStartX;
  const delta = endX - azureTouchStartX;
  azureTouchStartX = null;
  if (Math.abs(delta) < 42) return;
  showAzureGalleryImage(azureGalleryIndex + (delta < 0 ? 1 : -1));
}, { passive: true });
