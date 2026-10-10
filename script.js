const navToggle = document.querySelector('.nav-toggle');
const nav = document.querySelector('.site-nav');
const achievement = document.querySelector('#achievement');
const heavyWater = document.querySelector('.heavy-water');
const lensToggle = document.querySelector('#second-person-toggle');

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
  button.addEventListener('click', () => {
    const target = document.getElementById(button.dataset.target);
    target?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});

lensToggle?.addEventListener('click', () => {
  const active = heavyWater.classList.toggle('lens-active');
  lensToggle.textContent = active ? 'Return to Primary View' : 'Activate Second-Person Lens';
  lensToggle.setAttribute('aria-pressed', String(active));
});

const filters = [...document.querySelectorAll('.filter')];
const tools = [...document.querySelectorAll('.tool-card')];
filters.forEach(button => {
  button.addEventListener('click', () => {
    const selected = button.dataset.filter;
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
    hint:'The mark in the header is not just decoration.',
    solution:'Click the Mippi logo in the upper-left header once.'
  },
  secondPerson: {
    title:'Second Perspective',
    detail:'You looked at the problem from somewhere else.',
    hint:'Try changing your perspective.',
    solution:'Scroll to Project Heavy Water and click Activate Second-Person Lens.'
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
const themeCycle = document.querySelector('#theme-cycle');
const progressHud = document.querySelector('#progress-hud');
const heartMeter = document.querySelector('#heart-meter');
const rupeeCount = document.querySelector('#rupee-count');
const rupeeMeter = document.querySelector('#rupee-meter');
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
const LEGENDARY_UNLOCK_KEY = 'mippi-legendary-unlocked';
const LEGENDARY_THEME_KEY = 'mippi-legendary-theme';
const INSPECT_KEY = 'mippi-inspect-mode';
const INTRO_HINT_SESSION_KEY = 'mippi-achievement-intro-hint-v1';
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

function updateAchievementProgress(extraCount = null) {
  const count = unlockedAchievements.size;
  if (achievementProgress) achievementProgress.textContent = typeof extraCount === 'string' ? extraCount : `${count} / ${ACHIEVEMENT_KEYS.length} FOUND`;
  if (ledgerCount) ledgerCount.textContent = `${count}/${ACHIEVEMENT_KEYS.length}`;
  ledgerTrigger?.classList.toggle('visible', count > 0);
  progressHud?.classList.toggle('visible', heartCount > 0);
  syncProgressHudPosition();
  renderLedger();
  updateCompletionState();
}

function renderLedger() {
  if (!ledgerList) return;
  ledgerList.innerHTML = ACHIEVEMENT_KEYS.map((key, index) => {
    const found = unlockedAchievements.has(key);
    const item = ACHIEVEMENTS[key];
    const detail = found
      ? item.detail
      : `<span class="ledger-hint-label">TRACE //</span> ${item.hint}`;
    return `<div class="ledger-entry ${found ? 'unlocked' : ''}"><span class="num">${String(index + 1).padStart(2,'0')}</span><div><strong>${found ? item.title : '???'}</strong><small>${detail}</small></div></div>`;
  }).join('');
}

function currentThemeMode(){
  if(document.body.classList.contains('theme-legendary')) return 'legendary';
  if(document.body.classList.contains('theme-complete')) return 'epic';
  return 'rare';
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

  const dougThemeImage=document.querySelector('.doug-photo');
  if(dougThemeImage){
    const themed=mode!=='rare';
    dougThemeImage.src=themed?'assets/doug-complete.webp':'assets/doug.jpg';
    dougThemeImage.alt=themed?'Doug wearing a blue scarf in an unlocked theme':'Doug sitting happily in tall grass';
  }

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
  const modes=availableThemeModes();
  if(modes.length===1){
    showTransientToast('THEME // RARE','Explore more of the site to unlock additional themes.','RARITY // 1 OF 3','SYSTEM');
    return;
  }
  const current=currentThemeMode();
  const index=Math.max(0,modes.indexOf(current));
  const next=modes[(index+1)%modes.length];
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
  if(firstUnlock){
    consolePrint('LEGENDARY THEME UNLOCKED // rarity upgraded to gold.','good');
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

function updateCompletionState(){
  const complete=unlockedAchievements.size===ACHIEVEMENT_KEYS.length;
  if(complete && !completionCelebrated){
    completionCelebrated=true;
    let explicit=null;
    try{ explicit=localStorage.getItem(THEME_MODE_KEY); }catch(_){}
    applyThemeMode(explicit && availableThemeModes().includes(explicit)?explicit:'epic',{persist:!explicit});
    if(achievement && !achievement.classList.contains('show')){
      window.setTimeout(()=>showSystemToast('EPIC THEME UNLOCKED','All 10 signals found. The next rarity tier is available.','10 / 10 FOUND'),700);
    }
  } else if(!complete){
    completionCelebrated=false;
    applyThemeMode('rare',{persist:false});
  } else {
    applyThemeMode(preferredUnlockedTheme(),{persist:false});
  }
  updateThemeCycleControl();
}

function updateHeartMeter(){
  if(!heartMeter) return;
  const hearts=[...heartMeter.querySelectorAll('span')];
  hearts.forEach((heart,index)=>{ heart.textContent=index<heartCount?'♥':'♡'; heart.classList.toggle('filled',index<heartCount); });
  heartMeter.setAttribute('aria-label',`Heart pickups: ${heartCount} of 5`);
  rupeeMeter?.classList.toggle('visible',heartCount>0);
  progressHud?.classList.toggle('visible',heartCount>0);
  syncProgressHudPosition();
}
function updateRupeeMeter(){
  if(rupeeCount) rupeeCount.textContent=String(rupeeWallet);
  rupeeMeter?.classList.toggle('visible',heartCount>0);
  progressHud?.classList.toggle('visible',heartCount>0);
  syncProgressHudPosition();
}
function openUnrealGift(){
  if(!unrealGiftPopup) return;
  unrealGiftPopup.classList.add('open'); unrealGiftPopup.setAttribute('aria-hidden','false');
}
function closeUnrealGift(){ unrealGiftPopup?.classList.remove('open'); unrealGiftPopup?.setAttribute('aria-hidden','true'); }
unrealGiftDecline?.addEventListener('click',closeUnrealGift);
unrealGiftAccept?.addEventListener('click',()=>window.setTimeout(closeUnrealGift,100));
function collectHeart(){
  if(heartCount<5){
    heartCount++;
    try{localStorage.setItem(HEART_KEY,String(heartCount));}catch(_){}
    updateHeartMeter();
    consolePrint(`HEART ACQUIRED // ${heartCount}/5 // morale capacity increased.`,'good');
  } else {
    consolePrint('HEART ACQUIRED // already at full hearts. Please stop hoarding health.','good');
  }
  if(heartCount>=5 && !heartRewardShown){
    heartRewardShown=true;
    try{localStorage.setItem(HEART_REWARD_KEY,'1');}catch(_){}
    window.setTimeout(openUnrealGift,420);
  }
}
updateHeartMeter();

function hideAchievementToast() {
  window.clearTimeout(achievementTimer);
  achievement?.classList.remove('show','hint-toast');
}

function showSystemToast(title, detail, progressText = null) {
  if (!achievement) return;
  hideAchievementToast();
  void achievement.offsetWidth;
  if (achievementLabel) achievementLabel.textContent = 'SYSTEM';
  if (achievementTitle) achievementTitle.textContent = title;
  if (achievementDetail) achievementDetail.textContent = detail;
  if (achievementProgress) achievementProgress.textContent = progressText || `${unlockedAchievements.size} / ${ACHIEVEMENT_KEYS.length} FOUND`;
  achievement.classList.add('show');
  achievementTimer = window.setTimeout(hideAchievementToast, 4600);
}

function showTransientToast(title, detail, progressLabel='SYSTEM', topLabel='SYSTEM', { persistent=false } = {}) {
  if (!achievement) return;
  hideAchievementToast();
  void achievement.offsetWidth;
  if (achievementLabel) achievementLabel.textContent = topLabel;
  if (achievementTitle) achievementTitle.textContent = title;
  if (achievementDetail) achievementDetail.textContent = detail;
  if (achievementProgress) achievementProgress.textContent = progressLabel;
  achievement.classList.toggle('hint-toast', persistent);
  achievement.classList.add('show');
  if (!persistent) achievementTimer = window.setTimeout(hideAchievementToast, 4600);
}

function getNextUnachievedKey() {
  return ACHIEVEMENT_KEYS.find(key => !unlockedAchievements.has(key)) || null;
}

function showNextAchievementHint({ intro=false } = {}) {
  const key = getNextUnachievedKey();
  if (!key) {
    showSystemToast('No undiscovered signals.', 'You found everything. The hint system has nothing left to spoil.', `${ACHIEVEMENT_KEYS.length} / ${ACHIEVEMENT_KEYS.length} FOUND`);
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

function syncProgressHudPosition(){
  if(!progressHud) return;
  const isOpen=!!ledger?.classList.contains('open');
  progressHud.classList.toggle('ledger-open',isOpen);
  progressHud.style.top='auto';
  if(isOpen){
    const rect=ledger.getBoundingClientRect();
    const ledgerBottom=parseFloat(getComputedStyle(ledger).bottom)||0;
    const bottomGap=Math.max(12,ledgerBottom+rect.height+10);
    progressHud.style.bottom=`${bottomGap}px`;
  }else{
    progressHud.style.bottom=window.innerWidth<=620?'58px':'60px';
  }
}
function openLedger() {
  if (!ledger) return;
  ledger.classList.add('open');
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
}
window.addEventListener('resize',syncProgressHudPosition,{passive:true});

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
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify([...unlockedAchievements])); } catch (_) {}
  }
  if (firstDiscovery) window.clearTimeout(introHintTimer);
  hideAchievementToast();
  void achievement.offsetWidth;
  if (achievementLabel) achievementLabel.textContent = 'ACHIEVEMENT UNLOCKED';
  if (achievementTitle) achievementTitle.textContent = data.title;
  if (achievementDetail) achievementDetail.textContent = data.detail;
  updateAchievementProgress(demoIndex ?? null);
  achievement.classList.add('show');
  achievementTimer = window.setTimeout(hideAchievementToast, 4600);
  if (firstDiscovery) window.setTimeout(openLedger, 1100);
}

// Achievement ledger unlocks after the first discovery.
ledgerTrigger?.addEventListener('click', () => {
  if (ledger?.classList.contains('open')) closeLedger();
  else openLedger();
});
ledgerClose?.addEventListener('click', closeLedger);

function setInspectMode(active) {
  document.body.classList.toggle('inspect-mode', active);
  inspectToggle?.classList.toggle('active', active);
  if (inspectToggle) inspectToggle.textContent = active ? 'Inspect Mode: On' : 'Inspect Mode';
  try { localStorage.setItem(INSPECT_KEY, active ? '1' : '0'); } catch (_) {}
}
let inspectPref = false;
try { inspectPref = localStorage.getItem(INSPECT_KEY) === '1'; } catch (_) {}
setInspectMode(inspectPref);
inspectToggle?.addEventListener('click', () => setInspectMode(!document.body.classList.contains('inspect-mode')));
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
  ['#unreal-gift-popup','COMMUNITY REWARD // Five hearts later, the prize is people. That was intentional.'],
  ['.site-footer','SHIP NOTE // Return to Top was broken once. It has been informed this will be remembered.']
].forEach(([selector,note])=>{ const el=document.querySelector(selector); if(el && !el.dataset.devNote) el.dataset.devNote=note; });


document.querySelector('.brand-mark')?.addEventListener('click', event => {
  event.preventDefault();
  showAchievement('curious');
});

lensToggle?.addEventListener('click', () => {
  if (heavyWater?.classList.contains('lens-active')) showAchievement('secondPerson');
});

filters.forEach(button => button.addEventListener('click', () => {
  if (button.dataset.filter === 'wip') showAchievement('wip');
}));

document.querySelector('.resume-long')?.addEventListener('click', () => showAchievement('lore'));
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
function reactDoug(message) {
  if (!dougReaction) return;
  dougReaction.textContent = message;
  dougReaction.classList.add('show');
  window.clearTimeout(dougReactionTimer);
  dougReactionTimer = window.setTimeout(() => dougReaction.classList.remove('show'), 2200);
}
doug?.addEventListener('click', () => {
  dougClicks += 1;
  const index = Math.min(dougReactions.length - 1, Math.floor((dougClicks - 1) / 2));
  reactDoug(dougReactions[index]);
  if (dougClicks === 5) showAchievement('doug');
  if (dougClicks >= 12) dougCard?.classList.add('doug-command');
});

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
    window.setTimeout(() => {
      ambientSecret.classList.remove('visible');
      scheduleAmbientSecret(false);
    }, 8500);
  }, wait);
}
ambientSecret.addEventListener('click', () => {
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
  devConsole?.classList.toggle('open', open);
  devConsole?.setAttribute('aria-hidden', String(!open));
  if (open) window.setTimeout(() => consoleInput?.focus(), 60);
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
let consolePending = null;
let statOverlay = null;
let statTimer = null;
let statMode = null;
let slowmoEnabled = false;
let easyModeEnabled = false;
let easyModeTimer = null;
let naniteEnabled = false;
const naniteControllers = [];
let dougBoneCount = 0;
let ufoKills = 0;
let nextBossKillThreshold = 10;
let ufoBossActive = false;
let vibeEnabled = false;
let vibeTimer = null;
let vibeAgent = null;
let lumenLayer = null;
let lumenEnabled = false;
let compileTimer = null;
let compileRapidTimers = [];
let compileCount = 639427;
let compilePercent = 0;
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
function setStatMode(mode){
  const el=ensureStatOverlay();
  window.clearInterval(statTimer);
  statMode = mode;
  if(!mode){ el.classList.remove('show'); return; }
  el.classList.add('show');
  const tick=()=>{
    if(statMode==='fps'){
      const fps=(58+Math.random()*4).toFixed(1);
      el.textContent=`${fps} FPS\nSTAT FPS`;
    } else {
      const frame=(15.6+Math.random()*2.2).toFixed(2);
      const game=(3.7+Math.random()*1.9).toFixed(2);
      const draw=(5.1+Math.random()*2.1).toFixed(2);
      const gpu=(10.8+Math.random()*3.1).toFixed(2);
      const rhi=(1.0+Math.random()*1.1).toFixed(2);
      el.textContent=`Frame  ${frame} ms\nGame   ${game} ms\nDraw   ${draw} ms\nGPU    ${gpu} ms\nRHIT   ${rhi} ms\nMorale ${dougBoneCount} bone${dougBoneCount===1?'':'s'}\nSTAT UNIT`;
    }
  };
  tick(); statTimer=window.setInterval(tick,180);
}
function randomLine(lines){ return lines[Math.floor(Math.random()*lines.length)]; }
function hasWish(){ try{return localStorage.getItem(WISH_KEY)==='1';}catch(_){return false;} }
function unlockWishCommand(source='CELESTIAL SIGNAL'){
  const already=hasWish();
  if(!already){
    try{localStorage.setItem(WISH_KEY,'1');}catch(_){}
    showTransientToast('SECRET COMMAND UNLOCKED','The console now understands: wish',source);
    consolePrint('WISH COMMAND UNLOCKED // reality interface available.','good');
  } else {
    showTransientToast('CELESTIAL SIGNAL','You already have a wish available.','WISH // ALREADY UNLOCKED');
    consolePrint('WISH // already unlocked. Politeness acknowledged.','good');
  }
  return !already;
}
function nextCheat(){
  const key=getNextUnachievedKey();
  if(!key) return consolePrint('CHEAT // All achievements are already unlocked. You have become the walkthrough.','good');
  const i=ACHIEVEMENT_KEYS.indexOf(key)+1, a=ACHIEVEMENTS[key];
  consolePrint(`CHEAT // ${String(i).padStart(2,'0')} ${a.title}`,'good');
  consolePrint(a.solution);
}

function setSlowmo(active){
  slowmoEnabled=active;
  document.body.classList.toggle('slowmo-mode',active);
  document.querySelectorAll('.shooting-star,.galaga-secret,.game-pickup,.doug-bone').forEach(el=>{
    const base=Number(el.dataset.baseDuration||0);
    if(base>0) el.style.setProperty('--dur',`${base*(active?2:1)}s`);
  });
}
function setFlightDuration(el, seconds){
  el.dataset.baseDuration=String(seconds);
  el.style.setProperty('--dur',`${seconds*(slowmoEnabled?2:1)}s`);
}
function removeWhenFlightEnds(el){
  // Let the animation own lifetime. Fixed removal timers caused SLOWMO actors
  // to disappear halfway through their route after duration was doubled.
  el.addEventListener('animationend',()=>el.remove(),{once:true});
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
function setNanite(active){ naniteEnabled=active; document.body.classList.toggle('nanite-mode',active); naniteControllers.forEach(fn=>fn(active)); }

function ensureLumenLayer(){
  if(lumenLayer) return lumenLayer;
  lumenLayer=document.createElement('div'); lumenLayer.className='lumen-artifacts'; lumenLayer.setAttribute('aria-hidden','true');
  for(let i=0;i<18;i++){
    const blob=document.createElement('i');
    blob.className=`lumen-blob ${i%2?'light':'dark'}`;
    blob.style.left=`${-5+Math.random()*100}%`; blob.style.top=`${-8+Math.random()*105}%`;
    blob.style.width=`${150+Math.random()*360}px`; blob.style.height=`${120+Math.random()*320}px`;
    blob.style.setProperty('--lumen-delay',`${Math.random()*-12}s`); blob.style.setProperty('--lumen-dur',`${4.5+Math.random()*8}s`);
    lumenLayer.appendChild(blob);
  }
  document.body.appendChild(lumenLayer); return lumenLayer;
}
function setLumen(active){ lumenEnabled=active; ensureLumenLayer().classList.toggle('active',active); document.body.classList.toggle('lumen-mode',active); }

const vibeLines=[
  'AI PAIR // making it more scalable',
  'AI PAIR // confidently renaming a variable',
  'AI PAIR // adding one tiny dependency',
  'AI PAIR // fixed the bug, probably',
  'AI PAIR // context window still holding',
  'AI PAIR // generating tasteful particles',
  'AI PAIR // TODO converted into architecture',
  'AI PAIR // 93% confidence, 41% comprehension'
];
function ensureVibeAgent(){
  if(vibeAgent) return vibeAgent;
  vibeAgent=document.createElement('div'); vibeAgent.className='vibe-agent'; vibeAgent.innerHTML='<i></i><span>AI PAIR // ONLINE</span>'; document.body.appendChild(vibeAgent); return vibeAgent;
}
function setVibe(active){
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
  if(blueprintStatus) blueprintStatus.textContent=wishHasIsValid ? 'GRAPH STATUS // WISH REFERENCE VALIDATED' : 'GRAPH STATUS // 1 POSSIBLE RUNTIME ERROR';
  requestAnimationFrame(updateBlueprintWires);
}
function openBlueprint(){
  blueprintPopup?.classList.add('open'); blueprintPopup?.setAttribute('aria-hidden','false');
  updateBlueprintState();
  requestAnimationFrame(()=>requestAnimationFrame(updateBlueprintWires));
}
function closeBlueprint(){ blueprintPopup?.classList.remove('open'); blueprintPopup?.setAttribute('aria-hidden','true'); }
blueprintClose?.addEventListener('click',closeBlueprint);
blueprintPopup?.addEventListener('click',e=>{ if(e.target===blueprintPopup) closeBlueprint(); });
blueprintAddValid?.addEventListener('click',()=>{
  wishHasIsValid=true; try{sessionStorage.setItem(WISH_VALID_KEY,'1')}catch(_){} updateBlueprintState();
  window.setTimeout(updateBlueprintWires,40);
  consolePrint('Blueprint graph updated: Is Valid inserted between Wish Event and Grant Wish.','good');
});
window.addEventListener('resize',()=>{ if(blueprintPopup?.classList.contains('open')) updateBlueprintWires(); });

function renderCompileState(){
  if(compileTitle) compileTitle.textContent=`Compiling Shaders (${Math.max(0,Math.round(compileCount)).toLocaleString('en-US')})`;
  if(compileBar) compileBar.style.width=`${compilePercent}%`;
  if(compilePercentLabel) compilePercentLabel.textContent=`${compilePercent}%`;
}
function setCompileStuck(){
  window.clearInterval(compileTimer); compileRapidTimers.forEach(clearTimeout); compileRapidTimers=[];
  compileCount=812+Math.floor(Math.random()*73); compilePercent=74;
  try{sessionStorage.setItem(COMPILE_STUCK_KEY,'1')}catch(_){} renderCompileState();
}
function startRapidCompileDrop(){
  window.clearInterval(compileTimer);
  compilePercent=74; renderCompileState();
  const counts=[410220,171044,58920,14870,3260,874];
  counts.forEach((n,i)=>compileRapidTimers.push(window.setTimeout(()=>{ compileCount=n; if(i===counts.length-1){ try{sessionStorage.setItem(COMPILE_STUCK_KEY,'1')}catch(_){} } renderCompileState(); },i*170)));
}
function openCompile(){
  compileRapidTimers.forEach(clearTimeout); compileRapidTimers=[]; window.clearInterval(compileTimer);
  let stuck=false; try{stuck=sessionStorage.getItem(COMPILE_STUCK_KEY)==='1'}catch(_){}
  if(stuck){ compileCount=812; compilePercent=74; }
  else { compileCount=639427; compilePercent=0; }
  renderCompileState(); compilePopup?.classList.add('open'); compilePopup?.setAttribute('aria-hidden','false');
  if(!stuck){
    compileTimer=window.setInterval(()=>{
      compileCount-=1+Math.floor(Math.random()*3);
      compilePercent=Math.min(3,Math.floor((639427-compileCount)/44)); renderCompileState();
      if(compileCount<639300) startRapidCompileDrop();
    },420);
  }
}
function cancelCompile(){
  if(compilePopup?.classList.contains('open')) setCompileStuck();
  compilePopup?.classList.remove('open'); compilePopup?.setAttribute('aria-hidden','true');
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

function grantValidatedWish(wishText){
  consolePrint('IsValid: TRUE','good');
  consolePrint(`Wish accepted: ${wishText}`,'good');
  const text=wishText.toLowerCase();
  playWishSuccess();
  unlockLegendaryMode();

  if(/\bmippi\b|mippithedork/.test(text)){
    consolePrint('Wish granted. Mippi is available to work on your project. Convenient how that worked out.','good');
    showTransientToast('WISH GRANTED', 'Mippi is available to work on your project.', 'BLUEPRINT // SUCCESS', 'SYSTEM');
    window.setTimeout(openWishContact,450);
    return;
  }
  if(/\bblender\b/.test(text)){
    consolePrint('Wish granted. Blender has been removed from the universe.','good');
    showTransientToast('WISH GRANTED', 'Preparing universal software removal.', 'EARTH-1218', 'SYSTEM');
    window.setTimeout(startBlenderUninstall,420);
    return;
  }
  if(/\$|\bmoney\b|\bbucks?\b|\bdollars?\b|\bcash\b|\busd\b|\bmoolah\b|\bpayday\b/.test(text)){
    const response='Wish granted. Your money will arrive through trickle-down economics. It should reach you any decade now. 😉';
    consolePrint(response,'good');
    showTransientToast('WISH GRANTED', 'Your payout has entered the trickle-down pipeline. 😉', 'ECONOMY // WORKING AS DESIGNED', 'SYSTEM');
    burstMoneyFromConsole();
    return;
  }
  if(/\bwish(?:es)?\b/.test(text)){
    const response="I'm sorry Dave, I'm afraid I can't do that.";
    consolePrint(response,'warn');
    showTransientToast('REQUEST DENIED', response, 'HAL // ONLINE', 'SYSTEM');
    showHalEye();
    return;
  }

  consolePrint('Wish granted. Reality has been updated within acceptable tolerances.','good');
  showTransientToast('WISH GRANTED', 'The reference was valid. The runtime survived.', 'BLUEPRINT // SUCCESS', 'SYSTEM');
}

function unlockAllAchievementsGodMode(){
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
  flappyPanel.innerHTML=`
    <div class="flappy-head">
      <div><span>MIPPI BIRD // PLAY MODE</span><strong id="flappy-score">SCORE 0</strong></div>
      <button type="button" id="flappy-quit">QUIT</button>
    </div>
    <canvas width="520" height="280" id="flappy-canvas" aria-label="Click inside the game to flap"></canvas>
    <div class="flappy-footer">
      <strong id="flappy-high-score">HIGH SCORE 0</strong>
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
    const text=`I scored ${flappySessionHighScore} in Mippi Bird on Mippi's portfolio.`;
    if(navigator.share){
      navigator.share({title:'Mippi Bird High Score',text,url:location.href}).catch(()=>{});
      return;
    }
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
    if(flappyState.gameOver){ resetFlappyGame(); flappyState.started=true; flappyState.vy=flappyJumpStrength(); return; }
    if(!flappyState.started) flappyState.started=true;
    flappyState.vy=flappyJumpStrength();
  });
  flappyBirdImage=new Image();
  flappyBirdImage.src='assets/mippi-logo-blue.png';
  return flappyPanel;
}
function resetFlappyGame(){
  ensureFlappyGame();
  flappyState={
    y:140, vy:0, score:0, gameOver:false, started:false,
    pipes:[{x:590,gapY:118},{x:850,gapY:168}]
  };
  const score=flappyPanel.querySelector('#flappy-score');
  const help=flappyPanel.querySelector('#flappy-help');
  if(score) score.textContent='SCORE 0';
  const high=flappyPanel.querySelector('#flappy-high-score'); if(high) high.textContent=`HIGH SCORE ${flappySessionHighScore}`;
  if(help) help.textContent='CLICK TO START // THEN CLICK TO FLAP';
}
function closeFlappyGame(){
  if(!flappyPanel) return;
  flappyPanel.classList.remove('open');
  cancelAnimationFrame(flappyRaf); flappyRaf=0;
}
function openFlappyGame(){
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
        const score=flappyPanel.querySelector('#flappy-score');
        const high=flappyPanel.querySelector('#flappy-high-score');
        if(score) score.textContent=`SCORE ${s.score}`;
        if(high) high.textContent=`HIGH SCORE ${flappySessionHighScore}`;
      }
      const topH=Math.max(20,p.gapY-gap/2), bottomY=Math.min(h-20,p.gapY+gap/2);
      if(bx+bw/2>p.x && bx-bw/2<p.x+pipeW && (by-bh/2<topH || by+bh/2>bottomY)) s.gameOver=true;
    }
    if(by-bh/2<0 || by+bh/2>h) s.gameOver=true;
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
  if(flappyBirdImage?.complete){
    ctx.drawImage(flappyBirdImage,-size/2,-size/2,size,size);
    ctx.globalCompositeOperation='source-atop';
    ctx.fillStyle=legendary?'#ffc43f':complete?'#d96cff':'#2f93ff';
    ctx.fillRect(-size/2,-size/2,size,size);
    ctx.globalCompositeOperation='source-over';
  } else {
    ctx.fillStyle=accent; ctx.fillRect(-15,-15,30,30);
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
  document.body.classList.toggle('particle-boost',active);
  if(particleFieldTimer){clearInterval(particleFieldTimer);particleFieldTimer=null;}
  if(active){
    for(let i=0;i<28;i++) setTimeout(emitCommandParticle,i*25);
    particleFieldTimer=setInterval(()=>{for(let i=0;i<3;i++) emitCommandParticle();},190);
  }
}

function openShop(){
  const r=rupeeWallet;
  consolePrint(`SHOP // WALLET ${r} RUPEE${r===1?'':'S'}`,'good');
  if(r<=0){
    consolePrint('SHOPKEEPER // You have no rupees. Browsing is free, which is fortunate.','warn');
  }else if(r<3){
    consolePrint('SHOPKEEPER // 1-2 rupees. I can offer you a knowing nod and absolutely no refunds.');
  }else if(r<5){
    consolePrint('SHOPKEEPER // 3-4 rupees. You qualify for the imaginary bargain bin.');
  }else if(r<8){
    consolePrint('SHOPKEEPER // 5-7 rupees. Respectable adventurer money. Premium inventory is still concept art.');
  }else if(r<10){
    consolePrint('SHOPKEEPER // 8-9 rupees. Almost VIP. Please continue engaging with the local economy.');
  }else if(r<15){
    consolePrint('SHOPKEEPER // 10+ RUPEES. VIP CUSTOMER DETECTED. The velvet rope has been rendered.');
  }else{
    consolePrint('SHOPKEEPER // You have accumulated enough currency to destabilize a portfolio website. The shopkeeper has retired.','good');
  }
}

function listCommands(){
  consolePrint('CORE     help · clear · version · about · home · top · inspect · theme · debug');
  consolePrint('NAV      games · career · consulting · crafting · tools · resumes · projects');
  consolePrint('LINKS    github · fab · steam · unreal source · learning');
  consolePrint('PROJECT  heavywater · azure · unmark · mob · nda');
  consolePrint('SYSTEM   achievements · reset_achievements · cheat · particles · hero · signal · colors');
  consolePrint('FUN      doug · shipit · joke · galaga · twinkle · shroom · rupee · shop · hey listen · stars · wish · vibe · play');
  consolePrint('UNREAL   stat fps · stat unit · stat none · blueprint · compile · cook · slowmo · easy mode · lumen · nanite');
}
const COMMANDS = {
  help(){ listCommands(); },
  clear(){ if(consoleOutput) consoleOutput.innerHTML=''; }, cls(){ if(consoleOutput) consoleOutput.innerHTML=''; },
  version(){ consolePrint('Mippi Portfolio v2.43 · static GitHub Pages build'); },
  about(){ jumpTo('about'); }, home(){ window.scrollTo({top:0,behavior:'smooth'}); }, top(){ window.scrollTo({top:0,behavior:'smooth'}); },
  games(){ jumpTo('games'); }, career(){ jumpTo('career'); }, consulting(){ jumpTo('consulting'); }, crafting(){ jumpTo('crafting'); },
  tools(){ consolePrint('Opening Unreal Tools.'); jumpTo('tools'); }, projects(){ consolePrint('Project Heavy Water · Azure Altar · consulting work · unannounced NDA title'); jumpTo('games'); },
  resumes(){ document.querySelector('.resume-panel')?.scrollIntoView({behavior:'smooth'}); },
  inspect(){ setInspectMode(!document.body.classList.contains('inspect-mode')); consolePrint(`Inspect Mode ${document.body.classList.contains('inspect-mode')?'ON':'OFF'}.`,'good'); },
  theme(){ cycleThemeMode(); },
  debug(){ openSourceViewer(); },
  achievements(){ ledgerTrigger?.classList.add('visible'); openLedger(); consolePrint(`Ledger opened: ${unlockedAchievements.size}/${ACHIEVEMENT_KEYS.length} found.`,'good'); },
  reset_achievements(){ unlockedAchievements.clear(); try{localStorage.removeItem(STORAGE_KEY);localStorage.removeItem(THEME_KEY);localStorage.removeItem(THEME_MODE_KEY);localStorage.removeItem(LEGENDARY_UNLOCK_KEY);localStorage.removeItem(LEGENDARY_THEME_KEY);}catch(_){} legendaryUnlocked=false; applyThemeMode('rare',{persist:false}); updateThemeCycleControl(); hideAchievementToast(); closeLedger(); updateAchievementProgress(); scheduleAchievementIntroHint({resetSession:true}); consolePrint('Achievement progress reset.','warn'); },
  cheat(){ nextCheat(); },
  doug(){ reactDoug(randomLine(['Doug has reviewed the command.','Doug requests snacks before execution.','Doug approves this branch.','Doug has assumed temporary production control.'])); burstDougPaws(4); consolePrint('Doug status: operational. Morale: excellent. Meeting discipline: questionable.'); },
  github(){ window.open('https://github.com/mippi-the-dork','_blank','noopener'); },
  fab(){ window.open('https://www.fab.com/sellers/Mippithedork','_blank','noopener'); },
  steam(){ document.querySelector('a[href*="steamcommunity.com"]')?.click(); },
  'unreal source'(){ window.open('https://unrealsource.com/','_blank','noopener'); },
  learning(){ window.open('https://dev.epicgames.com/community/unreal-engine/learning?source=epic_games&types=tutorial,course,talks_and_demos,livestream,learning_path,knowledge_base,recommended_community_tutorial','_blank','noopener'); },
  heavywater(){ document.querySelector('.heavy-water')?.scrollIntoView({behavior:'smooth'}); },
  azure(){ document.querySelector('.azure-altar')?.scrollIntoView({behavior:'smooth'}); },
  unmark(){ document.querySelector('.unmark-feature')?.scrollIntoView({behavior:'smooth'}); },
  mob(){ jumpTo('career'); consolePrint('MOB // some information remains classified.'); }, nda(){ jumpTo('career'); consolePrint('ACCESS DENIED: NDA still stronger than console privileges.','warn'); },
  particles(){ const active=!document.body.classList.contains('particle-boost'); setParticleBoost(active); consolePrint(`PARTICLES ${active?'ON // screen-space particle field and scene boost enabled':'OFF'}.`,'good'); },
  hero(){ window.scrollTo({top:0,behavior:'smooth'}); consolePrint('Hero scene reacquired. Drag to rotate. Click a signal to navigate.'); },
  signal(){ consolePrint('Signal scan: '+(document.querySelector('.ambient-secret.visible')?'anomaly present':'no anomaly currently visible')+'.'); },
  colors(){ consolePrint(document.body.classList.contains('theme-legendary')?'Legendary palette: gold / orange / amber / teal.':document.body.classList.contains('theme-complete')?'Completion palette: violet / cyan / hot pink.':'Standard palette: Unreal blue / cyan / graphite.'); },
  compile(){ openCompile(); consolePrint('Shader compilation started. This may take a while. Possibly geological.','warn'); },
  shipit(){ consolePrint(randomLine(['SHIP IT. What could possibly go wrong?','Packaging... 99%... still 99%...','Release candidate renamed FINAL_final_v7_REAL.'])); },
  joke(){ consolePrint(randomLine(['Why did the Blueprint cross the road? It had a hard reference to the other side.','The build is stable until someone says the build is stable.','A designer walks into a bar. The navmesh says unreachable.'])); },
  galaga(){ spawnGalaga(true); consolePrint('GALAGA // forced arcade contact spawned. It may shoot back.','good'); },
  twinkle(){ spawnGamePickup('star',true); consolePrint('TWINKLE // star pickup spawned.','good'); },
  shroom(){ spawnGamePickup('1up',true); consolePrint('SHROOM // mushroom pickup spawned.','good'); },
  rupee(){ spawnGamePickup('rupee',true); consolePrint(`RUPEE // currency pickup spawned. Current wallet: ${rupeeWallet}.`,'good'); },
  shop(){ openShop(); },
  'hey listen'(){ spawnGamePickup('heart',true); consolePrint('HEY LISTEN // heart pickup spawned.','good'); },
  stars(){ consolePrint('Watch the Epic-theme sky. Bright anomalies are interactive.'); },
  vibe(){ setVibe(!vibeEnabled); consolePrint(`VIBE CODING ${vibeEnabled?'ENABLED':'DISABLED'}${vibeEnabled?' // confidence 93% // understanding 41%':''}.`,vibeEnabled?'good':''); },
  play(){ openFlappyGame(); consolePrint('PLAY // Mippi Bird launched. Click to flap. Try not to scope-creep into a full game.','good'); },
  wish(){
    if(!hasWish()) return consolePrint('Unknown command: wish. A celestial prerequisite has not been met.','warn');
    consolePending='wish'; consolePrint('What is your wish?','good');
  },
  'stat fps'(){ const next=statMode==='fps'?null:'fps'; setStatMode(next); consolePrint(`STAT FPS ${next?'ON':'OFF'}.`,'good'); },
  'stat unit'(){ const next=statMode==='unit'?null:'unit'; setStatMode(next); consolePrint(`STAT UNIT ${next?'ON':'OFF'}.`,'good'); },
  'stat none'(){ setStatMode(null); consolePrint('Stats hidden.'); },
  blueprint(){ openBlueprint(); consolePrint('Opening BP_WishManager. There may be a familiar runtime problem in here.'); },
  cook(){ consolePrint('Cooking content... please enjoy this authentic period of uncertainty.'); },
  slowmo(){ setSlowmo(!slowmoEnabled); consolePrint(`SLOWMO ${slowmoEnabled?'0.5x':'1.0x'} // flying objects ${slowmoEnabled?'slowed; Mippi Bird gravity softened':'restored; Mippi Bird physics normal'}.`,'good'); },
  'easy mode'(){
    easyModeEnabled=!easyModeEnabled;
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
consoleForm?.addEventListener('submit', event => {
  event.preventDefault();
  const raw = consoleInput?.value.trim() || '';
  if (!raw) return;
  consoleHistory.push(raw); consoleHistoryIndex = consoleHistory.length;
  consolePrint(`> ${raw}`,'cmd');
  if (consolePending === 'wish') {
    consolePending = null;
    const wishText=raw;
    consolePrint('Your wish is being granted.','good');
    const wrap=document.createElement('div'); wrap.className='console-progress'; const bar=document.createElement('i'); wrap.appendChild(bar); consoleOutput?.appendChild(wrap);
    let progress=0; const timer=setInterval(()=>{
      progress+=Math.floor(8+Math.random()*15); bar.style.width=`${Math.min(progress,100)}%`; consoleOutput.scrollTop=consoleOutput.scrollHeight;
      if(progress>=100){
        clearInterval(timer);
        setTimeout(()=>{
          if(wishHasIsValid) grantValidatedWish(wishText);
          else { consolePrint('ERROR: Blueprint Runtime Error: Accessed None trying to read property WishFulfillment.','warn'); consolePrint('Suggestion: add an IsValid node and try believing harder.'); }
        },220);
      }
    },120);
    if (consoleInput) consoleInput.value='';
    return;
  }
  const normalized=raw.toLowerCase().replace(/\s+/g,' ').trim();
  const command = COMMANDS[normalized] ? normalized : normalized.split(' ')[0];
  if (COMMANDS[command]) COMMANDS[command](); else consolePrint(`Unknown command: ${normalized}. Type help.`,'warn');
  if (consoleInput) consoleInput.value = '';
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
  if (event.key === 'Escape' && unrealGiftPopup?.classList.contains('open')) { closeUnrealGift(); return; }
  if (event.key === 'Escape' && blenderPopup?.classList.contains('open')) { if(blenderOk?.disabled) return; closeBlenderPopup(); return; }
  if (event.key === 'Escape' && wishContactPopup?.classList.contains('open')) { closeWishContact(); return; }
  if (event.key === 'Escape' && compilePopup?.classList.contains('open')) { cancelCompile(); return; }
  if (event.key === 'Escape' && blueprintPopup?.classList.contains('open')) { closeBlueprint(); return; }
  if (event.key === 'Escape' && devConsole?.classList.contains('open')) { openConsole(false); return; }
  if (event.shiftKey && key === 'a') {
    event.preventDefault();
    const demoKey = ACHIEVEMENT_KEYS[demoIndex % ACHIEVEMENT_KEYS.length];
    demoIndex += 1;
    showAchievement(demoKey, { force:true, demoIndex:`DEMO ${demoIndex} / ${ACHIEVEMENT_KEYS.length}` });
    return;
  }
  if (event.shiftKey && key === 'r') {
    event.preventDefault();
    unlockedAchievements.clear();
    try { localStorage.removeItem(STORAGE_KEY); localStorage.removeItem(THEME_KEY); localStorage.removeItem(THEME_MODE_KEY); localStorage.removeItem(LEGENDARY_UNLOCK_KEY); localStorage.removeItem(LEGENDARY_THEME_KEY); localStorage.removeItem(HEART_KEY); localStorage.removeItem(HEART_REWARD_KEY); } catch (_) {}
    legendaryUnlocked=false; heartCount=0; heartRewardShown=false; updateHeartMeter(); applyThemeMode('rare',{persist:false}); updateThemeCycleControl();
    hideAchievementToast();
    closeLedger();
    updateAchievementProgress();
    scheduleAchievementIntroHint({resetSession:true});
    return;
  }
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


// Inspect mode uses a single floating tooltip so large sections never generate giant pseudo-elements.
const inspectTooltip=document.createElement('div'); inspectTooltip.className='inspect-tooltip'; document.body.appendChild(inspectTooltip);
let inspectTarget=null;
window.addEventListener('pointermove',event=>{
  if(document.body.classList.contains('inspect-mode')){
    const target=event.target.closest?.('[data-dev-note]');
    if(target && target.dataset.devNote){
      inspectTarget=target; inspectTooltip.textContent=target.dataset.devNote; inspectTooltip.classList.add('show');
      const pad=14, w=Math.min(430,window.innerWidth-28); let x=event.clientX+16, y=event.clientY+18;
      if(x+w>window.innerWidth-pad) x=Math.max(pad,event.clientX-w-16);
      if(y+90>window.innerHeight-pad) y=Math.max(pad,event.clientY-90);
      inspectTooltip.style.left=`${x}px`; inspectTooltip.style.top=`${y}px`;
    } else if(inspectTarget){ inspectTarget=null; inspectTooltip.classList.remove('show'); }
  } else { inspectTarget=null; inspectTooltip.classList.remove('show'); }
},{passive:true});

// Doug emits actual visible paw particles from the photo position.
function burstDougPaws(count=5){
  const img=document.querySelector('.doug-photo'); if(!img) return;
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
doug?.addEventListener('click',()=>burstDougPaws(document.body.classList.contains('theme-complete')?6:4));

// Completion-theme cursor aura and trail.
const cursorAura=document.createElement('div'); cursorAura.className='completion-cursor-aura'; document.body.appendChild(cursorAura);
const powerCursor=document.createElement('div'); powerCursor.className='power-cursor'; powerCursor.setAttribute('aria-hidden','true'); document.body.appendChild(powerCursor);
let starPowerTimer=null, starPowerBurstTimer=null;
function updatePowerCursor(){
  document.body.classList.toggle('cursor-grown',cursorPowerLevel>0);
  document.body.classList.toggle('cursor-power-1',cursorPowerLevel===1);
  document.body.classList.toggle('cursor-power-2',cursorPowerLevel===2);
  powerCursor.dataset.level=String(cursorPowerLevel);
}
function advanceCursorPower(){
  cursorPowerLevel=(cursorPowerLevel+1)%3;
  updatePowerCursor();
  const message=cursorPowerLevel===1?'MUSHROOM ACQUIRED // cursor size increased.':cursorPowerLevel===2?'MUSHROOM ACQUIRED // cursor at maximum size. Please point responsibly.':'MUSHROOM ACQUIRED // cursor wrapped back to normal size.';
  consolePrint(message,'good');
  showTransientToast('MUSHROOM ACQUIRED',cursorPowerLevel===1?'Your cursor grew.':cursorPowerLevel===2?'Your cursor grew again. This is probably enough.':'Power cycle complete. Cursor returned to normal.',`CURSOR SIZE // ${cursorPowerLevel===0?'NORMAL':cursorPowerLevel===1?'BIG':'VERY BIG'}`,'POWER-UP');
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
  hit.dataset.starPowerHit='1';
  hit.click();
}
function activateStarPower(){
  document.body.classList.remove('star-power'); void document.body.offsetWidth; document.body.classList.add('star-power');
  clearTimeout(starPowerTimer); clearInterval(starPowerBurstTimer);
  for(let i=0;i<9;i++) setTimeout(emitRainbowCursorSpark,i*45);
  starPowerBurstTimer=setInterval(()=>{ emitRainbowCursorSpark(); collectStarPowerHoverTarget(); },70);
  starPowerTimer=setTimeout(()=>{ document.body.classList.remove('star-power'); clearInterval(starPowerBurstTimer); starPowerBurstTimer=null; },3600);
  consolePrint('STAR POWER // temporary rainbow cursor effect enabled. Flying objects are collected on contact.','good');
}
let lastSpark=0;
const latestPointer={x:window.innerWidth/2,y:window.innerHeight/2};
window.addEventListener('pointermove',event=>{
  latestPointer.x=event.clientX; latestPointer.y=event.clientY;
  powerCursor.style.left=`${event.clientX}px`; powerCursor.style.top=`${event.clientY}px`;
  cursorAura.style.left=`${event.clientX}px`; cursorAura.style.top=`${event.clientY}px`;
  if(!document.body.classList.contains('theme-complete') || reduceMotion) return;
  const legendary=document.body.classList.contains('theme-legendary');
  const now=performance.now(); if(now-lastSpark<(legendary?18:34)) return; lastSpark=now;
  const count=legendary?3:1;
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

function explodeAt(x,y,count=18){
  const colors=document.body.classList.contains('theme-legendary')?['#fff0b5','#ffc83d','#ff7a1a','#43e0dc','#ffffff']:['#67e8ff','#ff4fc8','#b13cff','#ffffff'];
  for(let i=0;i<count;i++){ const p=document.createElement('i');p.className='arcade-pixel';p.style.left=`${x}px`;p.style.top=`${y}px`;p.style.background=colors[i%colors.length];p.style.setProperty('--dx',`${(Math.random()-.5)*150}px`);p.style.setProperty('--dy',`${(Math.random()-.5)*120}px`);document.body.appendChild(p);setTimeout(()=>p.remove(),850); }
}

function fireUfoProjectile(ship){
  if(!ship?.isConnected || reduceMotion) return;
  const r=ship.getBoundingClientRect();
  const sx=r.left+r.width/2, sy=r.top+r.height/2;
  const tx=latestPointer.x, ty=latestPointer.y;
  const dx=tx-sx, dy=ty-sy;
  const distance=Math.hypot(dx,dy);
  if(distance<24) return;
  const shot=document.createElement('i');
  shot.className='ufo-projectile';
  shot.style.left=`${sx}px`; shot.style.top=`${sy}px`;
  shot.style.setProperty('--dx',`${dx}px`); shot.style.setProperty('--dy',`${dy}px`);
  shot.style.setProperty('--shot-dur',`${Math.max(.24,Math.min(.95,distance/820))}s`);
  document.body.appendChild(shot);
  shot.addEventListener('animationend',()=>{ if(shot.isConnected){ explodeAt(tx,ty,4); shot.remove(); } },{once:true});
}

function nearestFlyingTarget(x,y,maxDistance=365){
  let best=null, bestDistance=maxDistance;
  document.querySelectorAll('.shooting-star,.galaga-secret,.game-pickup,.doug-bone').forEach(el=>{
    if(!el.isConnected) return;
    const r=el.getBoundingClientRect();
    const cx=r.left+r.width/2, cy=r.top+r.height/2;
    const d=Math.hypot(cx-x,cy-y);
    if(d<bestDistance){bestDistance=d;best=el;}
  });
  return best;
}

function fireLegendaryPlayerShot(x,y,target){
  if(!target?.isConnected) return;
  const shot=document.createElement('i');
  shot.className='legendary-player-projectile';
  shot.style.left=`${x}px`; shot.style.top=`${y}px`;
  document.body.appendChild(shot);
  let px=x, py=y, last=performance.now(), raf=0;
  const step=now=>{
    if(!shot.isConnected || !target?.isConnected){ shot.remove(); cancelAnimationFrame(raf); return; }
    const r=target.getBoundingClientRect();
    const tx=r.left+r.width/2, ty=r.top+r.height/2;
    const dx=tx-px, dy=ty-py, dist=Math.hypot(dx,dy);
    if(dist<18){
      shot.remove();
      target.click();
      return;
    }
    const dt=Math.min(.035,(now-last)/1000); last=now;
    const travel=Math.min(dist,1050*dt);
    px+=dx/dist*travel; py+=dy/dist*travel;
    shot.style.transform=`translate3d(${px-x}px,${py-y}px,0) rotate(${Math.atan2(dy,dx)*180/Math.PI}deg)`;
    raf=requestAnimationFrame(step);
  };
  raf=requestAnimationFrame(step);
}

document.addEventListener('pointerdown',event=>{
  if(event.button!==0 || !document.body.classList.contains('theme-legendary')) return;
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
  if((!document.body.classList.contains('theme-complete')||reduceMotion) && !force) return;
  const f=randomEdgeFlight(240);
  const star=document.createElement('button'); star.className='shooting-star fly'; star.type='button'; star.setAttribute('aria-label','A bright shooting star');
  star.style.left=`${f.sx}px`; star.style.top=`${f.sy}px`; star.style.setProperty('--dx',`${f.dx}px`); star.style.setProperty('--dy',`${f.dy}px`); star.style.setProperty('--angle',`${f.angle}deg`); setFlightDuration(star,2.05+Math.random()*1.15);
  star.addEventListener('click',()=>{ 
    const r=star.getBoundingClientRect(); explodeAt(r.left+r.width/2,r.top+r.height/2,24);
    const first=!hasWish();
    unlockWishCommand('CELESTIAL SIGNAL');
    if(!first) consolePrint('SHOOTING STAR COLLECTED // wish was already unlocked, but stars are still worth catching.','good');
    star.remove();
  });
  document.body.appendChild(star); removeWhenFlightEnds(star);
}
function maybeSpawnUfoBoss(){
  if(ufoBossActive || ufoKills<nextBossKillThreshold) return;
  nextBossKillThreshold+=10;
  consolePrint('ARCADE WARNING // LARGE CONTACT INBOUND. Apparently ten UFOs was the aggro threshold.','warn');
  showTransientToast('ARCADE WARNING','Large contact inbound.','10 UFOs DESTROYED','BOSS SIGNAL');
  window.setTimeout(()=>spawnBossUfo(true),900);
}
function registerUfoKill(){
  ufoKills++;
  const toward=((ufoKills-1)%10)+1;
  consolePrint(`ARCADE CONTACT DESTROYED // +100 definitely-real points // UFOs ${toward}/10`,'good');
  maybeSpawnUfoBoss();
}
function spawnBossUfo(force=false){
  if(ufoBossActive) return;
  if((!document.body.classList.contains('theme-complete')||reduceMotion) && !force) return;
  ufoBossActive=true;
  const f=randomEdgeFlight(180);
  const ship=document.createElement('button');
  ship.className='galaga-secret boss-ufo fly'; ship.type='button'; ship.setAttribute('aria-label','Arcade boss UFO');
  ship.innerHTML='<span class="boss-ufo-label">BOSS</span><span class="boss-ufo-health" aria-hidden="true"><i></i></span>';
  ship.style.left=`${f.sx}px`; ship.style.top=`${f.sy}px`; ship.style.setProperty('--dx',`${f.dx}px`); ship.style.setProperty('--dy',`${f.dy}px`); ship.style.setProperty('--angle',`${f.angle}deg`); setFlightDuration(ship,15+Math.random()*4);
  let hp=6;
  const hpFill=ship.querySelector('.boss-ufo-health i');
  const updateHp=()=>{ if(hpFill) hpFill.style.width=`${Math.max(0,hp)/6*100}%`; ship.dataset.hp=String(hp); };
  updateHp();
  let ufoFireTimer=null;
  const stopBoss=()=>{ if(ufoFireTimer){window.clearInterval(ufoFireTimer);ufoFireTimer=null;} if(ship.isConnected) ship.remove(); ufoBossActive=false; window.setTimeout(maybeSpawnUfoBoss,900); };
  ship.addEventListener('click',()=>{
    if(!ship.isConnected) return;
    hp--;
    const r=ship.getBoundingClientRect();
    explodeAt(r.left+r.width/2,r.top+r.height/2,hp<=0?58:10);
    if(hp<=0){
      consolePrint('ARCADE BOSS DESTROYED // +5000 definitely-real points // management has been notified.','good');
      showTransientToast('BOSS DEFEATED','The large arcade contact has been removed from production.','+5000 DEFINITELY-REAL POINTS','ARCADE');
      stopBoss();
    }else{
      updateHp();
      ship.classList.add('boss-hit'); window.setTimeout(()=>ship.classList.remove('boss-hit'),140);
      consolePrint(`ARCADE BOSS HIT // ${hp}/6 integrity remaining.`,'warn');
    }
  });
  ship.addEventListener('animationend',()=>{ consolePrint('ARCADE BOSS ESCAPED // this will absolutely be mentioned in the postmortem.','warn'); stopBoss(); },{once:true});
  document.body.appendChild(ship);
  ufoFireTimer=window.setInterval(()=>{
    fireUfoProjectile(ship);
    window.setTimeout(()=>fireUfoProjectile(ship),120);
  },480+Math.floor(Math.random()*180));
  window.setTimeout(()=>fireUfoProjectile(ship),260);
}
function spawnGalaga(force=false){
  if((!document.body.classList.contains('theme-complete')||reduceMotion) && !force) return;
  const f=randomEdgeFlight(120);
  const ship=document.createElement('button'); ship.className='galaga-secret fly'; ship.type='button'; ship.setAttribute('aria-label','A tiny arcade ship');
  ship.style.left=`${f.sx}px`; ship.style.top=`${f.sy}px`; ship.style.setProperty('--dx',`${f.dx}px`); ship.style.setProperty('--dy',`${f.dy}px`); ship.style.setProperty('--angle',`${f.angle}deg`); setFlightDuration(ship,6.5+Math.random()*4.5);
  let ufoFireTimer=null;
  const stopUfoFire=()=>{ if(ufoFireTimer){ window.clearInterval(ufoFireTimer); ufoFireTimer=null; } };
  ship.addEventListener('click',()=>{ const r=ship.getBoundingClientRect();explodeAt(r.left+r.width/2,r.top+r.height/2,30);registerUfoKill();stopUfoFire();ship.remove(); });
  ship.addEventListener('animationend',stopUfoFire,{once:true});
  document.body.appendChild(ship);
  ufoFireTimer=window.setInterval(()=>fireUfoProjectile(ship),780+Math.floor(Math.random()*340));
  window.setTimeout(()=>fireUfoProjectile(ship),420);
  removeWhenFlightEnds(ship);
}
(function scheduleSecrets(){
  const delay=easyModeEnabled ? 11000+Math.random()*9000 : 36000+Math.random()*52000;
  setTimeout(()=>{spawnShootingStar();scheduleSecrets();},delay);
})();
(function scheduleGalaga(){
  const delay=easyModeEnabled ? 14000+Math.random()*12000 : 52000+Math.random()*78000;
  setTimeout(()=>{spawnGalaga();scheduleGalaga();},delay);
})();


// Key -> castle -> key -> castle. One key buys exactly one castle check.
let castleQuestActive=false;
let activeCastle=null;
let castleSpawnTimer=null;
const castleBoundaries=['games','career','consulting','crafting','tools','about'];
function castleMarkup(){
  return `<svg viewBox="0 0 64 52" aria-hidden="true"><path d="M7 47V20h8v-8h8v8h18v-8h8v8h8v27H7Z"/><path d="M13 12V5h6v7m26 0V5h6v7M26 47V33h12v14"/><rect x="17" y="25" width="7" height="8"/><rect x="40" y="25" width="7" height="8"/></svg>`;
}
function spawnCastle(){
  window.clearTimeout(castleSpawnTimer);
  if(!castleQuestActive || activeCastle) return;
  const candidates=castleBoundaries.map(id=>document.getElementById(id)).filter(Boolean);
  if(!candidates.length){ castleQuestActive=false; return; }
  const target=candidates[Math.floor(Math.random()*candidates.length)];
  const castle=document.createElement('button');
  castle.type='button'; castle.className='section-castle'; castle.setAttribute('aria-label','A suspicious little castle'); castle.innerHTML=castleMarkup();
  castle.style.left=`${10+Math.random()*76}%`;
  target.appendChild(castle); activeCastle=castle;
  castle.addEventListener('click',()=>{
    castle.remove();
    if(activeCastle===castle) activeCastle=null;
    castleQuestActive=false;
    showTransientToast('CASTLE CHECKED','THANK YOU! BUT OUR PINCESS IS IN ANOTHER CASTLE!','KEY ITEM // FIND ANOTHER KEY','SYSTEM');
    consolePrint('CASTLE CHECKED // The next castle requires another key. Obviously.','good');
  });
}
function activateCastleQuest(){
  if(castleQuestActive || activeCastle) return;
  castleQuestActive=true;
  consolePrint('KEY ITEM // A small castle has appeared somewhere between sections.','good');
  castleSpawnTimer=window.setTimeout(spawnCastle,500);
}

let dougPeekTimer=null;
function dougIsVisible(){
  if(!dougCard) return false;
  const r=dougCard.getBoundingClientRect();
  return r.bottom>0 && r.top<window.innerHeight && r.right>0 && r.left<window.innerWidth;
}
function showDougPeek(){
  let peek=document.querySelector('.doug-peek');
  if(!peek){
    peek=document.createElement('div'); peek.className='doug-peek';
    peek.innerHTML=`<div class="doug-peek-hearts">♥ ♥ ♥</div><img alt="Doug peeking onto the page"/><strong>Doug approves this acquisition.</strong>`;
    document.body.appendChild(peek);
  }
  const img=peek.querySelector('img'); if(img) img.src=document.body.classList.contains('theme-complete')?'assets/doug-complete.webp':'assets/doug.jpg';
  peek.classList.remove('show'); void peek.offsetWidth; peek.classList.add('show');
  clearTimeout(dougPeekTimer); dougPeekTimer=setTimeout(()=>peek.classList.remove('show'),3300);
}
function collectDougBone(){
  dougBoneCount++;
  if(dougIsVisible()){ reactDoug('Doug approves this acquisition.'); burstDougPaws(6); }
  else showDougPeek();
  consolePrint(`BONE ACQUIRED // Doug approves this acquisition. MORALE ${dougBoneCount}.`,'good');
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
  if(castleQuestActive || activeCastle) return nonKeys[Math.floor(Math.random()*nonKeys.length)];
  const keyDef=pickupKinds.find(entry=>entry.kind==='key');
  // A little randomness, plus a pity rule. Keys stay special without asking someone
  // to stare at the page for half an afternoon waiting for probability to apologize.
  if(pickupsSinceKey>=3 || Math.random()<0.26){ pickupsSinceKey=0; return keyDef; }
  pickupsSinceKey++;
  return nonKeys[Math.floor(Math.random()*nonKeys.length)];
}
function collectRupee(){
  const value=1;
  const before=rupeeWallet;
  rupeeWallet+=value;
  try{localStorage.setItem(RUPEE_WALLET_KEY,String(rupeeWallet));}catch(_){}
  updateRupeeMeter();
  consolePrint(`RUPEE ACQUIRED // +1 // WALLET ${rupeeWallet} // merchant inventory: suspiciously empty`,'good');
  showTransientToast('RUPEE ACQUIRED','+1 rupee. The economy continues to technically exist.',`WALLET // ${rupeeWallet}`,'ECONOMY');
  if(before<10 && rupeeWallet>=10){
    window.setTimeout(()=>showTransientToast('WALLET MILESTONE','10 rupees collected. You have achieved local economic significance.','ECONOMY // PROBABLY FINE','SYSTEM'),650);
  }
}
function handleGamePickup(def,item){
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
  if((!document.body.classList.contains('theme-complete')||reduceMotion) && !force) return;
  const f=randomEdgeFlight(100);
  // Do not naturally spawn another key while a castle is waiting. Forced test pickups
  // are allowed because console commands are allowed to be irresponsible.
  const def=forcedKind ? pickupKinds.find(entry=>entry.kind===forcedKind) : choosePickupDefinition();
  if(!def) return;
  const item=document.createElement('button'); item.type='button'; item.className='game-pickup'; item.dataset.kind=def.kind; item.innerHTML=getPickupMarkup(def.kind); item.setAttribute('aria-label',`A hidden ${def.kind} pickup`);
  item.style.left=`${f.sx}px`; item.style.top=`${f.sy}px`; item.style.setProperty('--dx',`${f.dx}px`); item.style.setProperty('--dy',`${f.dy}px`); item.style.setProperty('--angle',`${f.angle}deg`); setFlightDuration(item,5.2+Math.random()*4.6);
  item.addEventListener('click',()=>handleGamePickup(def,item));
  document.body.appendChild(item); removeWhenFlightEnds(item);
}
(function schedulePickups(){
  const delay=easyModeEnabled ? 2600+Math.random()*3200 : 13000+Math.random()*13000;
  setTimeout(()=>{spawnGamePickup();schedulePickups();},delay);
})();

// Once Doug assumes command, bones become a recurring background pickup until reload/reset.
function spawnDougBone(){
  if(!dougCard?.classList.contains('doug-command')||reduceMotion) return;
  const f=randomEdgeFlight(90); const bone=document.createElement('button'); bone.type='button'; bone.className='doug-bone'; bone.setAttribute('aria-label','Doug-approved bone pickup');
  bone.innerHTML=`<svg class="doug-bone-icon" viewBox="0 0 72 36" aria-hidden="true"><g><rect x="17" y="12" width="38" height="12" rx="6"/><circle cx="12" cy="10" r="7"/><circle cx="12" cy="26" r="7"/><circle cx="60" cy="10" r="7"/><circle cx="60" cy="26" r="7"/></g></svg>`;
  bone.style.left=`${f.sx}px`; bone.style.top=`${f.sy}px`; bone.style.setProperty('--dx',`${f.dx}px`); bone.style.setProperty('--dy',`${f.dy}px`); bone.style.setProperty('--angle',`${f.angle}deg`); setFlightDuration(bone,5.4+Math.random()*3.8);
  bone.addEventListener('click',()=>{ const r=bone.getBoundingClientRect(); explodeAt(r.left+r.width/2,r.top+r.height/2,14); collectDougBone(); bone.remove(); });
  document.body.appendChild(bone); removeWhenFlightEnds(bone);
}
(function scheduleDougBones(){
  const delay=easyModeEnabled ? 3000+Math.random()*4000 : 7000+Math.random()*8000;
  setTimeout(()=>{spawnDougBone();scheduleDougBones();},delay);
})();

updateHeartMeter();
updateRupeeMeter();
updateAchievementProgress();
scheduleAchievementIntroHint();
if(unlockedAchievements.size===ACHIEVEMENT_KEYS.length) applyThemeMode(preferredUnlockedTheme(),{persist:false});
else updateThemeCycleControl();
// Shared Three.js loader. PreviewLocal.bat serves the site over localhost so module imports behave like GitHub Pages.
let threePromise;
function loadThree() {
  if (!threePromise) threePromise = import('https://cdn.jsdelivr.net/npm/three@0.180.0/build/three.module.js');
  return threePromise;
}

// Three.js scene. The site remains fully usable if this import fails.
const canvas = document.querySelector('#hero-canvas');
const fallback = document.querySelector('#scene-fallback');
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

async function initScene() {
  try {
    const THREE = await loadThree();

    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true, powerPreference: 'high-performance' });
    fallback?.classList.add('scene-live');
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
  const ambientCanvas = document.querySelector('#ambient-canvas');
  if (!ambientCanvas || reduceMotion) return;
  try {
    const THREE = await loadThree();
    const renderer = new THREE.WebGLRenderer({ canvas:ambientCanvas, alpha:true, antialias:false, powerPreference:'low-power' });
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
  const aboutCanvas=document.querySelector('#about-canvas');
  if(!aboutCanvas) return;
  try {
    const THREE=await loadThree();
    const renderer=new THREE.WebGLRenderer({canvas:aboutCanvas,alpha:true,antialias:true,powerPreference:'low-power'});
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
