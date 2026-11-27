// ViTrox Ops: makes the page installable as an app. Holds no data; every request goes to the network as usual.
// Only when there is no connection at all does it show a small "offline" screen instead of the browser error.
var OFFLINE = '<!DOCTYPE html><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">' +
  '<title>ViTrox Ops</title><body style="margin:0;background:#0a0e17;color:#8a9ab3;font-family:Segoe UI,Arial,sans-serif;display:flex;align-items:center;justify-content:center;min-height:100vh;text-align:center">' +
  '<div><div style="font-size:11px;font-weight:800;letter-spacing:2px;color:#22d3ee">VITROX · OPS</div><p>No internet connection.</p>' +
  '<button onclick="location.reload()" style="background:#22d3ee;color:#04222a;border:0;border-radius:10px;padding:11px 18px;font-size:15px;font-weight:700">Try again</button></div></body>';
self.addEventListener("install", function() { self.skipWaiting(); });
self.addEventListener("activate", function(e) { e.waitUntil(self.clients.claim()); });
self.addEventListener("fetch", function(e) {
  if (e.request.mode !== "navigate") return;                       // API calls and fonts: untouched
  e.respondWith(fetch(e.request).catch(function() { return new Response(OFFLINE, { headers: { "Content-Type": "text/html; charset=utf-8" } }); }));
});
