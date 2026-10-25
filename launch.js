'use strict';
const play = document.getElementById('play');
const notice = document.getElementById('notice');
async function prepare() {
    if (!isSecureContext || !('serviceWorker' in navigator) || !navigator.locks)
        throw new Error('Use a current Chrome, Edge, or Firefox browser over HTTPS.');
    if (!document.createElement('canvas').getContext('webgl2'))
        throw new Error('WebGL 2 is unavailable. Enable hardware acceleration in your browser.');
    await navigator.serviceWorker.register('./isolation-worker.js', {scope: './', updateViaCache: 'none'});
    await navigator.serviceWorker.ready;
    if (!crossOriginIsolated) {
        if (sessionStorage.getItem('ashen-isolation-reload'))
            throw new Error('Browser isolation could not start. Close this tab and reopen the game.');
        sessionStorage.setItem('ashen-isolation-reload', '1');
        location.reload();
        return;
    }
    sessionStorage.removeItem('ashen-isolation-reload');
    play.disabled = false;
    play.textContent = 'Enter the Hollow';
}
play.addEventListener('click', async () => {
    play.disabled = true;
    try {
        // Named OS locks do not exist in WASM. Hold this origin-wide lock for
        // the lifetime of the game to prevent competing IndexedDB snapshots.
        await navigator.locks.request('ashen-hollow-profile', {ifAvailable: true}, async lock => {
            if (!lock) {
                notice.textContent = 'The game is already open in another tab. Close that game first.';
                play.disabled = false;
                return;
            }
            const frame = document.createElement('iframe');
            frame.title = 'Ashen Hollow';
            frame.allow = 'autoplay; fullscreen';
            frame.src = './game.html';
            document.body.append(frame);
            document.getElementById('landing').hidden = true;
            const fullscreen = document.createElement('button');
            fullscreen.id = 'fullscreen'; fullscreen.textContent = 'Fullscreen';
            fullscreen.onclick = () => frame.requestFullscreen().catch(() => {});
            document.body.append(fullscreen);
            await new Promise(() => {});
        });
    } catch (error) { notice.textContent = error.message; play.disabled = false; }
});
prepare().catch(error => {notice.textContent = error.message; play.textContent = 'Unable to start';});
