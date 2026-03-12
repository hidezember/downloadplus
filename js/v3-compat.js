// V3 Compatibility Shim - localStorage emulation for Service Worker
// This creates a synchronous-like interface backed by chrome.storage.local

var _storageCache = {};

// Initialize the storage cache from chrome.storage.local
function _initStorageCache() {
  return new Promise(function(resolve) {
    chrome.storage.local.get(null, function(items) {
      _storageCache = items || {};
      resolve();
    });
  });
}

// localStorage shim object
var localStorage = new Proxy({}, {
  get: function(target, prop) {
    if (prop === 'getItem') return function(k) { return _storageCache[k] !== undefined ? String(_storageCache[k]) : null; };
    if (prop === 'setItem') return function(k, v) { _storageCache[k] = String(v); var o = {}; o[k] = String(v); chrome.storage.local.set(o); };
    if (prop === 'removeItem') return function(k) { delete _storageCache[k]; chrome.storage.local.remove(k); };
    if (prop === 'clear') return function() { _storageCache = {}; chrome.storage.local.clear(); };
    if (prop === 'length') return Object.keys(_storageCache).length;
    if (prop === 'key') return function(i) { return Object.keys(_storageCache)[i] || null; };
    if (typeof prop === 'symbol') return undefined;
    return _storageCache[prop] !== undefined ? String(_storageCache[prop]) : undefined;
  },
  set: function(target, prop, value) {
    _storageCache[prop] = String(value);
    var o = {};
    o[prop] = String(value);
    chrome.storage.local.set(o);
    return true;
  },
  deleteProperty: function(target, prop) {
    delete _storageCache[prop];
    chrome.storage.local.remove(String(prop));
    return true;
  },
  has: function(target, prop) {
    return prop in _storageCache;
  }
});

// GA stub - make _gaq a no-op
var _gaq = { push: function() {} };
_gaq.push = function() {};

// document stub for service worker (minimal DOM shim)
if (typeof document === 'undefined') {
  var _canvasElements = [];
  var document = {
    createElement: function(tag) {
      if (tag === 'canvas') {
        var canvas = new OffscreenCanvas(19, 19);
        canvas.parentNode = { removeChild: function() {} };
        return canvas;
      }
      if (tag === 'script') {
        return { type: '', async: false, src: '', parentNode: null };
      }
      if (tag === 'textarea') {
        return { text: function() {}, get: function() { return { select: function() {} }; }, remove: function() {} };
      }
      return {};
    },
    getElementsByTagName: function() {
      return [{ parentNode: { insertBefore: function() {} } }];
    },
    body: {
      appendChild: function() {},
      removeChild: function() {}
    },
    execCommand: function() { return true; }
  };
}

// window stub additions for service worker
if (typeof window !== 'undefined') {
  // already in a window context, no need
} else {
  var window = self;
}
window.anyInProgress = false;
window.MediaList = {};
window.gLangLib = {};

// Audio stub for service worker
if (typeof Audio === 'undefined') {
  var Audio = function(src) {
    this.src = src;
    this.volume = 1;
    this.play = function() {
      // Try to play via offscreen document if available
      try {
        chrome.runtime.sendMessage({ type: '_playSound', src: src });
      } catch(e) {}
    };
  };
}

// Zepto/jQuery stub for service worker context
if (typeof $ === 'undefined') {
  var $ = function() {
    var noop = function() { return fakeJq; };
    var fakeJq = {
      text: noop, html: noop, css: noop, attr: noop, val: noop,
      on: noop, off: noop, click: noop, bind: noop, live: noop, die: noop,
      find: noop, closest: noop, parent: noop, children: noop, siblings: noop,
      append: noop, prepend: noop, remove: noop, hide: noop, show: noop,
      addClass: noop, removeClass: noop, toggleClass: noop, hasClass: function() { return false; },
      each: noop, eq: noop, get: function() { return {}; }, index: function() { return -1; },
      size: function() { return 0; }, length: 0,
      0: {}
    };
    return fakeJq;
  };
  $.get = function() {};
  $.getScript = function() {};
  $.trim = function(s) { return (s || '').trim(); };
}
