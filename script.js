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
  curious: { title:'Curious Mind', detail:'You clicked the logo until it gave up.' },
  secondPerson: { title:'Second Perspective', detail:'You looked at the problem from somewhere else.' },
  signal: { title:'Signal Acquired', detail:'You used the hero scene as navigation.' },
  wip: { title:'Under Construction', detail:'You went looking for the unfinished stuff.' },
  ghost: { title:'Ghost in the Machine', detail:'You caught something that was only passing through.' },
  lore: { title:'The Whole Story', detail:'You chose the long résumé.' },
  doug: { title:'Best Boy', detail:'You gave studio morale the attention it deserves.' },
  unmark: { title:'Unmarked', detail:'You clicked the markdown bat.' },
  nda: { title:'Classified', detail:'Nice try. The NDA still wins.' },
  konami: { title:'Old Habits', detail:'You still remember the sequence.' }
};
const ACHIEVEMENT_KEYS = Object.keys(ACHIEVEMENTS);
const achievementProgress = document.querySelector('#achievement-progress');
const achievementTitle = document.querySelector('#achievement-title');
const achievementDetail = document.querySelector('#achievement-detail');
const ledgerTrigger = document.querySelector('#ledger-trigger');
const ledgerCount = document.querySelector('#ledger-count');
const ledger = document.querySelector('#achievement-ledger');
const ledgerClose = document.querySelector('#ledger-close');
const ledgerList = document.querySelector('#ledger-list');
const inspectToggle = document.querySelector('#inspect-toggle');
const themeToggle = document.querySelector('#theme-toggle');
const STORAGE_KEY = 'mippi-achievements-v2';
const THEME_KEY = 'mippi-completion-theme';
const INSPECT_KEY = 'mippi-inspect-mode';
let unlockedAchievements = new Set();
try {
  unlockedAchievements = new Set(JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]').filter(key => ACHIEVEMENTS[key]));
} catch (_) {}
let achievementTimer;
let completionCelebrated = false;

function updateAchievementProgress(extraCount = null) {
  const count = unlockedAchievements.size;
  if (achievementProgress) achievementProgress.textContent = typeof extraCount === 'string' ? extraCount : `${count} / ${ACHIEVEMENT_KEYS.length} FOUND`;
  if (ledgerCount) ledgerCount.textContent = `${count}/${ACHIEVEMENT_KEYS.length}`;
  ledgerTrigger?.classList.toggle('visible', count > 0);
  renderLedger();
  updateCompletionState();
}

function renderLedger() {
  if (!ledgerList) return;
  ledgerList.innerHTML = ACHIEVEMENT_KEYS.map((key, index) => {
    const found = unlockedAchievements.has(key);
    const item = ACHIEVEMENTS[key];
    return `<div class="ledger-entry ${found ? 'unlocked' : ''}"><span class="num">${String(index + 1).padStart(2,'0')}</span><div><strong>${found ? item.title : '???'}</strong><small>${found ? item.detail : 'UNDISCOVERED SIGNAL'}</small></div></div>`;
  }).join('');
}

function applyCompletionTheme(active) {
  const unlocked = unlockedAchievements.size === ACHIEVEMENT_KEYS.length;
  const shouldApply = unlocked && active;
  document.body.classList.toggle('theme-complete', shouldApply);
  const dougThemeImage = document.querySelector('.doug-photo');
  if (dougThemeImage) {
    dougThemeImage.src = shouldApply ? 'assets/doug-complete.webp' : 'assets/doug.jpg';
    dougThemeImage.alt = shouldApply ? 'Doug wearing a blue scarf in completion theme' : 'Doug sitting happily in tall grass';
  }
  if (themeToggle) {
    themeToggle.disabled = !unlocked;
    themeToggle.textContent = unlocked ? (shouldApply ? 'Completion Theme: On' : 'Completion Theme: Off') : 'Completion Theme Locked';
    themeToggle.classList.toggle('active', shouldApply);
  }
  try { localStorage.setItem(THEME_KEY, shouldApply ? '1' : '0'); } catch (_) {}
  window.dispatchEvent(new CustomEvent('mippi-theme-change', { detail:{ active:shouldApply } }));
}

function updateCompletionState() {
  const complete = unlockedAchievements.size === ACHIEVEMENT_KEYS.length;
  if (themeToggle) themeToggle.disabled = !complete;
  if (complete && !completionCelebrated) {
    completionCelebrated = true;
    let pref = '1';
    try { pref = localStorage.getItem(THEME_KEY) ?? '1'; } catch (_) {}
    applyCompletionTheme(pref !== '0');
    if (achievement && !achievement.classList.contains('show')) {
      window.setTimeout(() => showSystemToast('SYSTEM COMPLETE', 'All 10 signals found. Alternate visual state unlocked.', '10 / 10 FOUND'), 700);
    }
  } else if (!complete) {
    completionCelebrated = false;
    applyCompletionTheme(false);
  } else {
    let pref = '1';
    try { pref = localStorage.getItem(THEME_KEY) ?? '1'; } catch (_) {}
    applyCompletionTheme(pref !== '0');
  }
}

function showSystemToast(title, detail, progressText = null) {
  if (!achievement) return;
  window.clearTimeout(achievementTimer);
  achievement.classList.remove('show');
  void achievement.offsetWidth;
  if (achievementTitle) achievementTitle.textContent = title;
  if (achievementDetail) achievementDetail.textContent = detail;
  if (achievementProgress) achievementProgress.textContent = progressText || `${unlockedAchievements.size} / ${ACHIEVEMENT_KEYS.length} FOUND`;
  achievement.classList.add('show');
  achievementTimer = window.setTimeout(() => achievement.classList.remove('show'), 4600);
}

function showTransientToast(title, detail, label='SYSTEM') {
  if (!achievement) return;
  window.clearTimeout(achievementTimer);
  achievement.classList.remove('show');
  void achievement.offsetWidth;
  if (achievementTitle) achievementTitle.textContent = title;
  if (achievementDetail) achievementDetail.textContent = detail;
  if (achievementProgress) achievementProgress.textContent = label;
  achievement.classList.add('show');
  achievementTimer = window.setTimeout(() => achievement.classList.remove('show'), 4600);
}

function showAchievement(key, { force = false, demoIndex = null } = {}) {
  const data = ACHIEVEMENTS[key];
  if (!achievement || !data) return;
  if (!force && unlockedAchievements.has(key)) return;
  if (!force) {
    unlockedAchievements.add(key);
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify([...unlockedAchievements])); } catch (_) {}
  }
  window.clearTimeout(achievementTimer);
  achievement.classList.remove('show');
  void achievement.offsetWidth;
  if (achievementTitle) achievementTitle.textContent = data.title;
  if (achievementDetail) achievementDetail.textContent = data.detail;
  updateAchievementProgress(demoIndex ?? null);
  achievement.classList.add('show');
  achievementTimer = window.setTimeout(() => achievement.classList.remove('show'), 4600);
}

// Achievement ledger unlocks after the first discovery.
ledgerTrigger?.addEventListener('click', () => {
  const open = !ledger?.classList.contains('open');
  ledger?.classList.toggle('open', open);
  ledger?.setAttribute('aria-hidden', String(!open));
  ledgerTrigger.setAttribute('aria-expanded', String(open));
});
ledgerClose?.addEventListener('click', () => {
  ledger?.classList.remove('open');
  ledger?.setAttribute('aria-hidden','true');
  ledgerTrigger?.setAttribute('aria-expanded','false');
});

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
themeToggle?.addEventListener('click', () => applyCompletionTheme(!document.body.classList.contains('theme-complete')));

let secretClicks = 0;
document.querySelector('.brand-mark')?.addEventListener('click', event => {
  event.preventDefault();
  secretClicks += 1;
  if (secretClicks >= 5) {
    showAchievement('curious');
    secretClicks = 0;
  }
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

// Classic hidden sequence: ↑ ↑ ↓ ↓ ← → ← → B A
const KONAMI = ['arrowup','arrowup','arrowdown','arrowdown','arrowleft','arrowright','arrowleft','arrowright','b','a'];
let konamiIndex = 0;
let demoIndex = 0;

// Hidden client-side developer console. No eval, no shell access, just portfolio commands.
const devConsole = document.querySelector('#dev-console');
const consoleClose = document.querySelector('#console-close');
const consoleForm = document.querySelector('#console-form');
const consoleInput = document.querySelector('#console-input');
const consoleOutput = document.querySelector('#console-output');
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
let consolePending = null;
let fpsOverlay = null;
let fpsTimer = null;
const WISH_KEY = 'mippiWishUnlocked';
function jumpTo(id){ document.getElementById(id)?.scrollIntoView({behavior:'smooth'}); }
function ensureFpsOverlay(){
  if (!fpsOverlay) { fpsOverlay=document.createElement('div'); fpsOverlay.className='fps-stat'; fpsOverlay.id='fps-stat'; document.body.appendChild(fpsOverlay); }
  return fpsOverlay;
}
function toggleFps(force){
  const el=ensureFpsOverlay(); const on=typeof force==='boolean'?force:!el.classList.contains('show');
  el.classList.toggle('show',on); window.clearInterval(fpsTimer);
  if(on){
    const tick=()=>{ const fps=(58+Math.random()*4).toFixed(1); const ms=(1000/Number(fps)).toFixed(2); el.textContent=`${fps} FPS\n${ms} ms\nSTAT FPS`; };
    tick(); fpsTimer=window.setInterval(tick,180);
  }
}
function randomLine(lines){ return lines[Math.floor(Math.random()*lines.length)]; }
function hasWish(){ try{return localStorage.getItem(WISH_KEY)==='1';}catch(_){return false;} }
function listCommands(){
  consolePrint('CORE     help · clear · version · about · home · top · inspect · theme');
  consolePrint('NAV      games · career · consulting · crafting · tools · resumes · projects');
  consolePrint('LINKS    github · fab · steam · unreal source · learning');
  consolePrint('PROJECT  heavywater · azure · unmark · mob · nda');
  consolePrint('SYSTEM   achievements · reset_achievements · particles · hero · signal · colors');
  consolePrint('FUN      doug · coffee · shipit · random · joke · source · galaga · stars · wish');
  consolePrint('UNREAL   stat fps · stat unit · stat none · ensure · blueprint · cook · pie · lumen · nanite');
}
const COMMANDS = {
  help(){ listCommands(); },
  clear(){ if(consoleOutput) consoleOutput.innerHTML=''; }, cls(){ if(consoleOutput) consoleOutput.innerHTML=''; },
  version(){ consolePrint('Mippi Portfolio v2.18 · static GitHub Pages build'); },
  about(){ jumpTo('about'); }, home(){ window.scrollTo({top:0,behavior:'smooth'}); }, top(){ window.scrollTo({top:0,behavior:'smooth'}); },
  games(){ jumpTo('games'); }, career(){ jumpTo('career'); }, consulting(){ jumpTo('consulting'); }, crafting(){ jumpTo('crafting-play'); },
  tools(){ consolePrint('Opening Unreal Tools.'); jumpTo('tools'); }, projects(){ consolePrint('Project Heavy Water · Azure Altar · consulting work · unannounced NDA title'); jumpTo('games'); },
  resumes(){ document.querySelector('.resume-panel')?.scrollIntoView({behavior:'smooth'}); },
  inspect(){ setInspectMode(!document.body.classList.contains('inspect-mode')); consolePrint(`Inspect Mode ${document.body.classList.contains('inspect-mode')?'ON':'OFF'}.`,'good'); },
  theme(){ if(unlockedAchievements.size!==ACHIEVEMENT_KEYS.length) return consolePrint('Completion theme is locked. Find all 10 signals first.','warn'); applyCompletionTheme(!document.body.classList.contains('theme-complete')); consolePrint(`Completion Theme ${document.body.classList.contains('theme-complete')?'ON':'OFF'}.`,'good'); },
  achievements(){ ledgerTrigger?.classList.add('visible'); ledger?.classList.add('open'); ledger?.setAttribute('aria-hidden','false'); consolePrint(`Ledger opened: ${unlockedAchievements.size}/${ACHIEVEMENT_KEYS.length} found.`,'good'); },
  reset_achievements(){ unlockedAchievements.clear(); try{localStorage.removeItem(STORAGE_KEY);localStorage.removeItem(THEME_KEY);}catch(_){} updateAchievementProgress(); consolePrint('Achievement progress reset.','warn'); },
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
  particles(){ document.body.classList.toggle('particle-boost'); consolePrint(`Particle boost ${document.body.classList.contains('particle-boost')?'ON':'OFF'}.`,'good'); },
  hero(){ window.scrollTo({top:0,behavior:'smooth'}); consolePrint('Hero scene reacquired. Drag to rotate. Click a signal to navigate.'); },
  signal(){ consolePrint('Signal scan: '+(document.querySelector('.ambient-secret.visible')?'anomaly present':'no anomaly currently visible')+'.'); },
  colors(){ consolePrint(document.body.classList.contains('theme-complete')?'Completion palette: violet / cyan / hot pink.':'Standard palette: Unreal blue / graphite.'); },
  coffee(){ consolePrint('Coffee subsystem: dependency unresolved. Designer productivity may be degraded.','warn'); },
  shipit(){ consolePrint(randomLine(['SHIP IT. What could possibly go wrong?','Packaging... 99%... still 99%...','Release candidate renamed FINAL_final_v7_REAL.'])); },
  random(){ consolePrint(randomLine(['Design is choosing what not to build.','The fastest feature is the one you delete.','If the player cannot read it, it is not communicating.','Every workaround is auditioning to become pipeline.'])); },
  joke(){ consolePrint(randomLine(['Why did the Blueprint cross the road? It had a hard reference to the other side.','The build is stable until someone says the build is stable.','A designer walks into a bar. The navmesh says unreachable.'])); },
  source(){ consolePrint('Source available where practical. Free GitHub releases are not a typo.'); },
  galaga(){ consolePrint('Arcade contact is rare. Completion mode improves your odds.'); },
  stars(){ consolePrint('Watch the completion-theme sky. Bright anomalies are interactive.'); },
  wish(){
    if(!hasWish()) return consolePrint('Unknown command: wish. A celestial prerequisite has not been met.','warn');
    consolePending='wish'; consolePrint('What is your wish?','good');
  },
  'stat fps'(){ toggleFps(); consolePrint(`STAT FPS ${ensureFpsOverlay().classList.contains('show')?'ON':'OFF'}.`,'good'); },
  'stat unit'(){ toggleFps(true); consolePrint('STAT UNIT-ish mode: Frame / Game / Draw / GPU are all suspiciously fine.'); },
  'stat none'(){ toggleFps(false); consolePrint('Stats hidden.'); },
  ensure(){ consolePrint('Ensure condition failed: The portfolio contains more side projects than originally scoped.','warn'); },
  blueprint(){ consolePrint('Blueprint compile: Success with 0 errors, 3 warnings, and one node nobody remembers adding.'); },
  cook(){ consolePrint('Cooking content... please enjoy this authentic period of uncertainty.'); },
  pie(){ consolePrint('PIE started. Remember: it only breaks after someone else watches.'); },
  lumen(){ consolePrint('Lumen status: dramatically illuminating things you forgot were reflective.'); },
  nanite(){ consolePrint('Nanite status: triangles have achieved collective bargaining power.'); }
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
    consolePrint('Your wish is being granted.','good');
    const wrap=document.createElement('div'); wrap.className='console-progress'; const bar=document.createElement('i'); wrap.appendChild(bar); consoleOutput?.appendChild(wrap);
    let progress=0; const timer=setInterval(()=>{ progress+=Math.floor(8+Math.random()*15); bar.style.width=`${Math.min(progress,100)}%`; consoleOutput.scrollTop=consoleOutput.scrollHeight; if(progress>=100){ clearInterval(timer); setTimeout(()=>{ consolePrint('ERROR: Blueprint Runtime Error: Accessed None trying to read property WishFulfillment.','warn'); consolePrint('Suggestion: add an IsValid node and try believing harder.'); },220); } },120);
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
    try { localStorage.removeItem(STORAGE_KEY); localStorage.removeItem(THEME_KEY); } catch (_) {}
    updateAchievementProgress();
    return;
  }
  if (key === KONAMI[konamiIndex]) {
    konamiIndex += 1;
    if (konamiIndex === KONAMI.length) {
      showAchievement('konami');
      konamiIndex = 0;
    }
  } else {
    konamiIndex = key === KONAMI[0] ? 1 : 0;
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
    if(paw.textContent.includes('❤')||paw.textContent.includes('♥')) paw.style.color=document.body.classList.contains('theme-complete')?'#ff63ca':'#e98aa9';
    document.body.appendChild(paw); setTimeout(()=>paw.remove(),1350);
  }
}
doug?.addEventListener('click',()=>burstDougPaws(document.body.classList.contains('theme-complete')?6:4));

// Completion-theme cursor aura and trail.
const cursorAura=document.createElement('div'); cursorAura.className='completion-cursor-aura'; document.body.appendChild(cursorAura);
let lastSpark=0;
window.addEventListener('pointermove',event=>{
  cursorAura.style.left=`${event.clientX}px`; cursorAura.style.top=`${event.clientY}px`;
  if(!document.body.classList.contains('theme-complete') || reduceMotion) return;
  const now=performance.now(); if(now-lastSpark<34) return; lastSpark=now;
  const spark=document.createElement('i'); spark.className='cursor-spark';
  spark.style.left=`${event.clientX}px`; spark.style.top=`${event.clientY}px`;
  spark.style.background=Math.random()>.45?'#67e8ff':'#ff4fc8'; spark.style.boxShadow=`0 0 9px ${spark.style.background}`;
  spark.style.setProperty('--dx',`${(Math.random()-.5)*34}px`); spark.style.setProperty('--dy',`${(Math.random()-.5)*34}px`);
  document.body.appendChild(spark); setTimeout(()=>spark.remove(),800);
},{passive:true});

function explodeAt(x,y,count=18){
  const colors=['#67e8ff','#ff4fc8','#b13cff','#ffffff'];
  for(let i=0;i<count;i++){ const p=document.createElement('i');p.className='arcade-pixel';p.style.left=`${x}px`;p.style.top=`${y}px`;p.style.background=colors[i%colors.length];p.style.setProperty('--dx',`${(Math.random()-.5)*150}px`);p.style.setProperty('--dy',`${(Math.random()-.5)*120}px`);document.body.appendChild(p);setTimeout(()=>p.remove(),850); }
}
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
function spawnShootingStar(){
  if(!document.body.classList.contains('theme-complete')||reduceMotion) return;
  const f=randomEdgeFlight(240);
  const star=document.createElement('button'); star.className='shooting-star fly'; star.type='button'; star.setAttribute('aria-label','A bright shooting star');
  star.style.left=`${f.sx}px`; star.style.top=`${f.sy}px`; star.style.setProperty('--dx',`${f.dx}px`); star.style.setProperty('--dy',`${f.dy}px`); star.style.setProperty('--angle',`${f.angle}deg`); star.style.setProperty('--dur',`${2.05+Math.random()*1.15}s`);
  star.addEventListener('click',()=>{ const r=star.getBoundingClientRect(); explodeAt(r.left+r.width,r.top+r.height/2,24); try{localStorage.setItem(WISH_KEY,'1')}catch(_){} showTransientToast('SECRET COMMAND UNLOCKED','The console now understands: wish','CELESTIAL SIGNAL'); star.remove(); });
  document.body.appendChild(star); setTimeout(()=>star.remove(),2600);
}
function spawnGalaga(){
  if(!document.body.classList.contains('theme-complete')||reduceMotion) return;
  const f=randomEdgeFlight(120);
  const ship=document.createElement('button'); ship.className='galaga-secret fly'; ship.type='button'; ship.setAttribute('aria-label','A tiny arcade ship');
  ship.style.left=`${f.sx}px`; ship.style.top=`${f.sy}px`; ship.style.setProperty('--dx',`${f.dx}px`); ship.style.setProperty('--dy',`${f.dy}px`); ship.style.setProperty('--angle',`${f.angle}deg`); ship.style.setProperty('--dur',`${6.5+Math.random()*4.5}s`);
  ship.addEventListener('click',()=>{ const r=ship.getBoundingClientRect();explodeAt(r.left+r.width/2,r.top+r.height/2,30);consolePrint('ARCADE CONTACT DESTROYED // +100 definitely-real points','good');ship.remove(); });
  document.body.appendChild(ship); setTimeout(()=>ship.remove(),12500);
}
(function scheduleSecrets(){
  setTimeout(()=>{spawnShootingStar();scheduleSecrets();},36000+Math.random()*52000);
})();
(function scheduleGalaga(){ setTimeout(()=>{spawnGalaga();scheduleGalaga();},52000+Math.random()*78000); })();


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
function spawnGamePickup(){
  if(!document.body.classList.contains('theme-complete')||reduceMotion) return;
  const f=randomEdgeFlight(100), def=pickupKinds[Math.floor(Math.random()*pickupKinds.length)];
  const item=document.createElement('button'); item.type='button'; item.className='game-pickup'; item.dataset.kind=def.kind; item.innerHTML=getPickupMarkup(def.kind); item.setAttribute('aria-label',`A hidden ${def.kind} pickup`);
  item.style.left=`${f.sx}px`; item.style.top=`${f.sy}px`; item.style.setProperty('--dx',`${f.dx}px`); item.style.setProperty('--dy',`${f.dy}px`); item.style.setProperty('--angle',`${f.angle}deg`); item.style.setProperty('--dur',`${5.2+Math.random()*4.6}s`);
  item.addEventListener('click',()=>{ const r=item.getBoundingClientRect(); explodeAt(r.left+r.width/2,r.top+r.height/2,18); consolePrint(def.msg,'good'); item.remove(); });
  document.body.appendChild(item); setTimeout(()=>item.remove(),11000);
}
(function schedulePickups(){ setTimeout(()=>{spawnGamePickup();schedulePickups();},18000+Math.random()*27000); })();

// Once Doug assumes command, bones become a recurring background pickup until reload/reset.
function spawnDougBone(){
  if(!dougCard?.classList.contains('doug-command')||reduceMotion) return;
  const f=randomEdgeFlight(90); const bone=document.createElement('button'); bone.type='button'; bone.className='doug-bone'; bone.setAttribute('aria-label','Doug-approved bone pickup');
  bone.innerHTML=`<svg class="doug-bone-icon" viewBox="0 0 72 36" aria-hidden="true"><g><rect x="17" y="12" width="38" height="12" rx="6"/><circle cx="12" cy="10" r="7"/><circle cx="12" cy="26" r="7"/><circle cx="60" cy="10" r="7"/><circle cx="60" cy="26" r="7"/></g></svg>`;
  bone.style.left=`${f.sx}px`; bone.style.top=`${f.sy}px`; bone.style.setProperty('--dx',`${f.dx}px`); bone.style.setProperty('--dy',`${f.dy}px`); bone.style.setProperty('--angle',`${f.angle}deg`); bone.style.setProperty('--dur',`${5.4+Math.random()*3.8}s`);
  bone.addEventListener('click',()=>{ const r=bone.getBoundingClientRect(); explodeAt(r.left+r.width/2,r.top+r.height/2,14); reactDoug('Doug approves this acquisition.'); consolePrint('BONE ACQUIRED // executive compensation package updated.','good'); bone.remove(); });
  document.body.appendChild(bone); setTimeout(()=>bone.remove(),10000);
}
(function scheduleDougBones(){ setTimeout(()=>{spawnDougBone();scheduleDougBones();},7000+Math.random()*8000); })();

updateAchievementProgress();
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
    const logoMaterial = new THREE.MeshBasicMaterial({ map: logoTexture, transparent: true, opacity: 0.78, depthWrite: false });
    const logoPlane = new THREE.Mesh(new THREE.PlaneGeometry(1.25, 1.25), logoMaterial);
    logoPlane.position.set(0, 0, 1.38);
    root.add(logoPlane);

    const ringMat = new THREE.MeshStandardMaterial({ color: 0x283447, roughness: 0.3, metalness: 0.88, emissive:0x00182f, emissiveIntensity:0.16 });
    const ringA = new THREE.Mesh(new THREE.TorusGeometry(2.35, 0.025, 8, 100), ringMat);
    ringA.rotation.set(1.15, 0.2, 0.5);
    root.add(ringA);
    const ringB = ringA.clone();
    ringB.scale.setScalar(1.22);
    ringB.rotation.set(0.45, 0.9, 1.2);
    root.add(ringB);

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
      coreMat.color.setHex(completionMode ? 0x2e123f : 0x182334);
      coreMat.emissive.setHex(completionMode ? 0x8d2ee8 : 0x0067c9);
      ringMat.color.setHex(completionMode ? 0x6f39a4 : 0x283447);
      key.color.setHex(completionMode ? 0xc267ff : 0x168cff);
      rim.color.setHex(completionMode ? 0x6ff5ff : 0x5daeff);
      if (completionMode && sceneReadout && !hovered) sceneReadout.textContent = 'SYSTEM COMPLETE // OVERDRIVE';
      if (!completionMode && sceneReadout && !hovered) sceneReadout.textContent = 'SELECT A SIGNAL';
      if (!reduceMotion) {
        core.rotation.y += completionMode ? 0.006 : 0.002;
        logoPlane.rotation.z = Math.sin(t * 0.32) * 0.035;
        logoPlane.position.y = Math.sin(t * 0.7) * 0.035;
        ringA.rotation.z += completionMode ? 0.0034 : 0.0014;
        ringB.rotation.y -= completionMode ? 0.0028 : 0.001;
        const pulse = completionMode ? 1 + Math.sin(t * 1.8) * 0.035 : 1;
        core.scale.setScalar(pulse);
        toolOrbit.rotation.z = Math.sin(t * 0.16) * 0.045;
        toolOrbit.children.forEach(icon => {
          icon.position.y = icon.userData.baseY + Math.sin(t * 0.85 + icon.userData.phase) * 0.08;
          icon.lookAt(camera.position);
        });
        nodes.forEach((info, i) => {
          const g = root.children.find(child => child.userData?.key === info.key);
          if (g) g.position.y = info.pos[1] + Math.sin(t * 1.1 + i) * 0.08;
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
      const boosted=document.body.classList.contains('particle-boost');
      mouseX += (targetMouseX-mouseX)*.035;
      mouseY += (targetMouseY-mouseY)*.035;
      root.rotation.y += completionMode ? .00055 : .00024;
      root.rotation.x = scroll*.22 + (completionMode ? mouseY*.035 : 0);
      root.position.x += (((completionMode ? mouseX*.34 : 0))-root.position.x)*.04;
      root.position.y += (((completionMode ? -mouseY*.20 : 0))-root.position.y)*.04;
      ambientPoints.rotation.y += completionMode ? .00062 : .00034;
      signalPoints.rotation.y -= completionMode ? .00042 : .00018;
      signalPoints.rotation.z += completionMode ? .00018 : .00008;
      signalPoints.material.opacity = completionMode ? (boosted?.38:.30) : (boosted?.22:.13);
      signalPoints.material.size = completionMode ? .11 : .085;
      overdriveMat.opacity += (((completionMode ? (boosted?.48:.40) : (boosted?.10:0)))-overdriveMat.opacity)*.055;
      overdrivePoints.rotation.y -= completionMode ? .00048 : .00008;
      overdrivePoints.rotation.x += completionMode ? .00017 : .00003;
      root.children.forEach((o,i)=>{ if(o.userData.speed){ const boost=completionMode?2.1:1; o.rotation.x+=o.userData.speed*boost; o.rotation.y-=o.userData.speed*.7*boost; }});
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
    scene.add(new THREE.AmbientLight(0x8bbcff,2.2));
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
    function resize(){ const rect=aboutCanvas.getBoundingClientRect(),dpr=Math.min(window.devicePixelRatio||1,1.5); renderer.setPixelRatio(dpr);renderer.setSize(rect.width,rect.height,false);camera.aspect=rect.width/Math.max(rect.height,1);camera.updateProjectionMatrix(); }
    resize(); new ResizeObserver(resize).observe(aboutCanvas);
    const clock=new THREE.Clock();
    function frame(){ const t=clock.getElapsedTime(); const complete=document.body.classList.contains('theme-complete'); ringMat.color.setHex(complete?0xd85cff:0x168cff); r2.material.color.setHex(complete?0x65e9ff:0x168cff); aboutParticles.material.color.setHex(complete?0xff63ca:0x6cb6ff); aboutParticles.material.opacity=complete?.52:.30; aboutParticles.material.size=complete?.14:.085; mats.forEach((m,i)=>{const cs=[0xd85cff,0xff4fc8,0x65e9ff,0xa868ff];m.color.setHex(complete?cs[i]:[0x2f93ff,0x5daeff,0x7dc2ff,0x006bd6][i]);m.emissive.copy(m.color);m.emissiveIntensity=complete?.42:.2;}); if(!reduceMotion){ const boost=complete?1.8:1;r1.rotation.z+=.0018*boost;r2.rotation.x-=.0012*boost;aboutParticles.rotation.y+=.0009*boost;aboutParticles.rotation.z=Math.sin(t*.12)*.08;nodes.forEach((m,i)=>{const a=t*.32*boost+m.userData.phase;m.position.set(Math.cos(a)*1.72,Math.sin(a*1.15)*.75,Math.sin(a)*.55);m.rotation.x+=.006*boost;m.rotation.y+=.008*boost;});} renderer.render(scene,camera);requestAnimationFrame(frame);}
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
