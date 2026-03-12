// Download Plus - Service Worker Entry Point (Manifest V3)
// importScripts must be at top level (synchronous)
importScripts('js/v3-compat.js', 'js/common.min.js', 'js/main.min.js');

// Initialize storage cache, then set up features that depend on localStorage
_initStorageCache().then(function() {
  // Re-run settings that depend on localStorage values
  try { _setBrowserFun(); } catch(e) {}
  try { _setShelf(); } catch(e) {}
  try { setColors(); } catch(e) {}

  // Initialize MediaDetect (webRequest) after storage is ready
  if (typeof MediaDetect !== 'undefined' && MediaDetect && MediaDetect.init) {
    var mf = localStorage.mediaFinder;
    if (mf === 'true' || typeof mf === 'undefined') {
      try {
        MediaDetect.init();
        console.log('MediaDetect initialized successfully');
      } catch(e) {
        console.warn('MediaDetect init failed:', e);
      }
    }
  }
}).catch(function(e) {
  console.error('Failed to init storage cache:', e);
});

// Listen for MediaList requests from popup/manager pages
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.type === '_getMediaList') {
    sendResponse({ mediaList: (self.MediaList || {})[request.tabId] || {} });
    return true;
  }
  if (request.type === '_getFullMediaList') {
    sendResponse({ mediaList: self.MediaList || {} });
    return true;
  }
});
