const off = window.bus.onPushMessage((msg) => {
    console.log('[Renderer] received push message:', msg);
});

window.addEventListener('beforeunload', () => off());