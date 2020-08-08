// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"engine/CerosEngine.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CerosEngine = void 0;

var CerosEngine =
/** @class */
function () {
  function CerosEngine() {
    this._debug = false; // This allows us to toggle the debugging mode for internal information if needed

    this.init();
  }

  Object.defineProperty(CerosEngine.prototype, "gpu", {
    get: function get() {
      if (!this._gpu) // Context 2D not set inform user about the message
        {
          if (this.isDebug) {
            console.error('Canvas 2D Content was not set, check implementation in the code');
          }
        }

      return this._gpu;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(CerosEngine.prototype, "dimension", {
    get: function get() {
      return {
        w: this._gameWidth,
        h: this._gameHeight
      };
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(CerosEngine.prototype, "stage", {
    get: function get() {
      return this._stage;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(CerosEngine.prototype, "isDebug", {
    get: function get() {
      return this._debug;
    },
    enumerable: false,
    configurable: true
  });

  CerosEngine.prototype.init = function () {
    // Check if there is a canvas in the document and if not create one for the engine
    this._configureViewPort();

    this.bindInput();
  };

  CerosEngine.prototype._configureViewPort = function () {
    // This handles viewport information and setting up of the window for our engine
    this._gameHeight = window.innerHeight;
    this._gameWidth = window.innerWidth; // Do we have any canvas if not give us one

    var canvasElement = document.getElementsByTagName('canvas').length ? document.getElementsByTagName('canvas').item(0) : document.createElement('canvas');
    canvasElement.className = 'ceros-engine'; // Set the width of the canvas

    $(canvasElement).attr('width', this._gameWidth * window.devicePixelRatio).attr('height', this._gameHeight * window.devicePixelRatio).css({
      width: this._gameWidth + 'px',
      height: this._gameHeight + 'px'
    });
    document.body.appendChild(canvasElement);
    this._stage = canvasElement;
    this._gpu = canvasElement.getContext('2d');
  };

  CerosEngine.prototype.render = function () {// Allow items to be rendered on the Engine
  };

  CerosEngine.prototype.bindInput = function () {
    var _this = this;

    document.addEventListener('keydown', function (e) {
      return _this.onInput(e);
    });
  };
  /**
   * Handles the Keyboard Event for the application
   * @param e
   */


  CerosEngine.prototype.onInput = function (e) {
    console.log('Key Entered: %s', e.keyCode);
  };

  CerosEngine.prototype.setDebug = function () {
    this._debug = true;
  };

  CerosEngine.prototype.update = function () {// Make modification to the state and POS 
  };

  CerosEngine.prototype.useArcadeFont = function () {
    if (this.stage && this.gpu) {
      this.gpu.font = 'VT323'; // Set the font to be used for display to give arcade retro styling
    }
  };

  CerosEngine.prototype.version = function () {
    return 'version 1.0.0';
  };

  CerosEngine.prototype.clear = function () {
    this._gpu ? this._gpu.clearRect(0, 0, this._gameWidth, this._gameHeight) : console.error('Context 2D is missing check implementation');
  };

  return CerosEngine;
}();

exports.CerosEngine = CerosEngine;
},{}],"engine/AssetManager.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AssetManager = void 0;
var assets = {
  'skierCrash': 'img/skier_crash.png',
  'skierLeft': 'img/skier_left.png',
  'skierLeftDown': 'img/skier_left_down.png',
  'skierDown': 'img/skier_down.png',
  'skierRightDown': 'img/skier_right_down.png',
  'skierRight': 'img/skier_right.png',
  'tree': 'img/tree_1.png',
  'treeCluster': 'img/tree_cluster.png',
  'rock1': 'img/rock_1.png',
  'rock2': 'img/rock_2.png',
  'jumpRamp': 'img/jump_ramp.png'
};
/**
 * @todo Implement functionality to allow loading assets via JSON
 */

var AssetManager =
/** @class */
function () {
  function AssetManager() {
    this._trackingManager = {
      failed: 0,
      passed: 0
    };
    this._assetResourceList = assets;
  }

  AssetManager.prototype.download = function () {
    var _this = this;

    var deferredPromises = [];

    _.each(assets, function (asset, assetName) {
      var resourceImage = new Image();
      var deferred = $.Deferred();

      resourceImage.onload = function () {
        resourceImage.width /= 2;
        resourceImage.height /= 2;

        _this.setAsset(assetName, resourceImage);

        _this._trackingManager.passed++;
        deferred.resolve();
      };

      resourceImage.onerror = function (e) {
        _this._trackingManager.failed++;
      }; //Set the resource to the source to trigger the events


      resourceImage.src = asset;
    });

    return $.when.apply($, deferredPromises);
  };

  AssetManager.prototype.setAsset = function (name, resource) {
    this._assetResourceList[name] = resource;
  };

  AssetManager.prototype.getAsset = function (name) {
    if (!this._assetResourceList[name]) {
      throw new Error(' Asset has not been defined in the resource list');
      '';
    }

    return this._assetResourceList[name];
  };

  return AssetManager;
}();

exports.AssetManager = AssetManager;
},{}],"app.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * @author Okeowo Aderemi
 * @description This is the main application that bootstraps the application
 */

var CerosEngine_1 = require("./engine/CerosEngine");

var AssetManager_1 = require("./engine/AssetManager");

document.addEventListener('DOMContentLoaded', function (event) {
  // Start the main application here
  console.log('Gaming Engine runs now...');
  console.log(new CerosEngine_1.CerosEngine().version());
  var asset = new AssetManager_1.AssetManager();
  asset.download().then(function () {
    return console.log('loaded');
  });
  console.log(asset);
});
},{"./engine/CerosEngine":"engine/CerosEngine.ts","./engine/AssetManager":"engine/AssetManager.ts"}],"node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "61802" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["node_modules/parcel-bundler/src/builtins/hmr-runtime.js","app.ts"], null)
//# sourceMappingURL=/app.c61986b1.js.map