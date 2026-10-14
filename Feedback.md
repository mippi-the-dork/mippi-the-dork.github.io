Castle Fireworks need to be like 3x bigger, and have more bursts, and collect any flying items that are currently spawned automatically for 1 second when fire works are triggered. 

Music player - needs icons for Previous, Play / Pause, Next, Download, Loop 1 / Loop All / No Loop, and Shuffle On / Off , also the play / pause and Next button should be visible in the collapsed view. We should also see a song progress meter. 
The lyrics section should appear to the right of the music player, not below it. It should also have 2 modes, a  single single lyrics mode, where it only shows the lyric currently active, and the full lyrics mode which functions like how you currently have it. Also we shouldn't show time stamps in the lyrics. This will let us use a slightly bigger font size for readability. When lyrics are active, and the player is minimized, the lyrics should switch to the single lyric mode, and be displayed to the right of the collapsed player (perhaps in an even larger font size, (i'm thinking the same size font as the title of the song at the top of the player)). Also, maybe we don't put a Question mark in a circle next to each track in the playlist for this, instead let's add a dedicated Lyrics button to the UI of the player to toggle lyrics on or off. 
Make the music player lyrics thing support enhanced LRC, so we can show the whole lyric at a time stamp, and then also highlight each word as their time stamp is active. 

Docs - add a docs command, and a documentation button between Design Mode and Inspect Mode, as well as a button for the documentation in the About section , maybe at the bottom of the Experience // Still in Motion, something like, view the design and technical documentation for this webpage, or w/e is appropriate for the tone of the website. 

Compile command doesn't currently do anything

When spawning a bunch of UFOs and killing them, the invasion meter keeps resetting or going lower randomly. We should probably clean up that code to be simpler, but also more stable. 

The mouse cursor tends to vanish when we do big screen based things (might be related to the mushroom cursor size thing), like the finale screen, the end metrics report stuff, etc. 

So someone said that the UI screen space elements are starting to feel a bit geocitie-ish (because of so many), so perhaps we need to look at their UI a bit more. For Hint, Inspect Mode, Design Mode, Interaction Toggle, Dev Console, Theme, and Achievements we should make these icons and such to communicate them. this can greatly decrease their screen space size. For Rupees, hearts, coolness, invasion and castle it gets a bit trickier. Let's discuss. Perhaps it's a screenspace foot bar, that has all of this in it, with the achievements tracker and dev console popping out of it (attached on those panel's bottoms to the top of the footer bar thing). 



change all clickable art
star - bounces along bottom of screen, above hotbar, from one side of screen to the other
rupee - switch to diamonds, spawn out of clicking on things, links that open up other pages spawn more than 1 diamond
mushroom - travel around the outside of a random panel on the web page
heart - can spawn rarely from ufos that die, guarantee from bosses
bone - randomly spawns as usual, except it falls from top of screen, and spins as it falls down to bottom of screen.
key - hidden somewhere on page, in bottom right of a panel
ufo - have swooping arch path, or vertical sine wave on left or right side of page
boss - comes from top middle of screen, and travels in a diamond pattern across screen
super boss - pans left and right at top of screen
adds - circles super boss
shooting star - remain the same

shooting should only work against enemies, not clickables, they also shouldn't track, instead they behave like they do on the super boss, but shooting upwards only, during cool mode they do a 3 bullet spray, with star power the bullets gain piercing and the mouse gets the aoe thing it currently has. 




