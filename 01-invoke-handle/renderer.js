document.getElementById('btn-info').addEventListener('click', async () => {
    console.log('[Renderer] call getAppInfo...');
    const result = await window.api.getAppInfo();
    console.log('[Renderer] received response:', result);
});

document.getElementById('btn-echo').addEventListener('click', async () => {
    console.log('[Renderer] call echo("Hello")...');
    const result = await window.api.echo("Hello");
    console.log('[Renderer] received response:', result);
});
