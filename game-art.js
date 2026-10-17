/* v3.00 // Author-supplied artwork. All URLs are local, with no external downloads. */
(()=>{
  'use strict';
  const root='assets/game/';
  const art={
    hud:{'cool-meter':root+'cool.svg','invasion-meter':root+'alien.svg','castle-meter':root+'crown.svg',
      'rupee-meter':root+'rupee.svg','heart-empty':root+'heart-empty.svg','heart-full':root+'heart-full.svg'},
    clickables:{castle:root+'castle.svg',bone:root+'bone.svg',rupee:root+'rupee.svg',heart:root+'heart-full.svg',
      key:root+'key.svg',mushroom:root+'mushroom.svg',star:root+'star.svg'},
    pickups:{rupee:root+'rupee.svg',heart:root+'heart-full.svg','1up':root+'mushroom.svg',
      key:root+'key.svg',star:root+'star.svg'},
    enemies:{ufo:root+'enemy.svg',boss:root+'boss.svg',add:root+'boss.svg',superBoss:root+'super-boss.svg'}
  };
  Object.values(art).forEach(group=>Object.freeze(group));
  window.MippiGameArt=Object.freeze(art);
})();
