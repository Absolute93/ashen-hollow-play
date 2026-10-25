// GitHub Pages cannot set COOP/COEP headers. Scope this worker to this game
// directory and add the headers to same-origin responses without caching them.
self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', event => event.waitUntil(self.clients.claim()));
self.addEventListener('fetch', event => {
    const request = event.request;
    const url = new URL(request.url);
    if (url.origin !== self.location.origin || !url.pathname.startsWith(new URL(self.registration.scope).pathname)) return;
    if (request.cache === 'only-if-cached' && request.mode !== 'same-origin') return;
    event.respondWith((async () => {
        const response = await fetch(request);
        if (response.status === 0) return response;
        const headers = new Headers(response.headers);
        headers.set('Cross-Origin-Opener-Policy', 'same-origin');
        headers.set('Cross-Origin-Embedder-Policy', 'require-corp');
        headers.set('Cross-Origin-Resource-Policy', 'same-origin');
        return new Response(response.body, {
            status: response.status, statusText: response.statusText, headers
        });
    })());
});
