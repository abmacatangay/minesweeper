const clickSound = new Audio('resources/click.mp3');
const explosionSound = new Audio('resources/explosion.mp3');
const flagSound = new Audio('resources/flag.mp3');
const winSound = new Audio('resources/win.mp3');
// Sounds retrieved from https://elevenlabs.io and https://www.myinstants.com/en

function playAudioSafely(audioObj) {
    audioObj.currentTime = 0;
    audioObj.play().catch(e => console.log("Sound file not found", e.message));
}

export function playClick() { 
    playAudioSafely(clickSound); }

export function playExplosion() { 
    playAudioSafely(explosionSound); }

export function playFlag() { 
    playAudioSafely(flagSound); }

export function playWin() { 
    playAudioSafely(winSound); }