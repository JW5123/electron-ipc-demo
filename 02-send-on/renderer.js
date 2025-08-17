const txt = document.getElementById('txt');
const btn = document.getElementById('btn');

const off = window.bus.onPong((msg) => { 
    // The 'pong' returned by the main process via IPC is displayed here.
    console.log('[Renderer] received pong:', msg);
});

btn.addEventListener('click', () => {
    const val = txt.value || '(empty)';
    console.log('[Renderer] sending ping:', val);
    window.bus.sendPing(val);
});

window.addEventListener('beforeunload', () => {
    off();
});