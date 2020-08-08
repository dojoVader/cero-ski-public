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
var skierDirection = 5;
var skierMapX = 0;
var skierMapY = 0;
var skierSpeed = 8;

var CerosEngine =
/** @class */
function () {
  function CerosEngine() {
    this._debug = false; // This allows us to toggle the debugging mode for internal information if needed
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

  CerosEngine.prototype.setScene = function (scene) {
    this._scene = scene;
  };

  CerosEngine.prototype.init = function (scene) {
    // Check if there is a canvas in the document and if not create one for the engine
    this.setScene(scene);

    this._scene.setEngine(this);

    this._configureViewPort();

    this.bindInput();
    this.render();
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

  CerosEngine.prototype.render = function () {
    // Allow items to be rendered on the Engine
    this._scene.init();
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
    this._scene.onInput(e);
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
/**
 * @todo Implement functionality to allow loading assets via JSON
 */

var AssetManager =
/** @class */
function () {
  function AssetManager() {
    this.assets = {
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
    this._assetResourceList = {}; // This stores the list of the assets to be downloaded

    this._trackingManager = {
      failed: 0,
      passed: 0
    };
  }

  AssetManager.prototype.isDone = function () {
    return this._trackingManager.failed + this._trackingManager.passed === Object.keys(this.assets).length;
  };

  AssetManager.prototype.download = function (cb) {
    var _this = this;

    _.each(this.assets, function (asset, assetName) {
      var resourceImage = new Image();

      resourceImage.onload = function () {
        resourceImage.width /= 2;
        resourceImage.height /= 2;

        _this.setAsset(assetName, resourceImage);

        _this._trackingManager.passed++;

        if (_this.isDone()) {
          cb();
        }
      };

      resourceImage.onerror = function (e) {
        _this._trackingManager.failed++;

        if (_this.isDone()) {
          cb();
        }
      }; //Set the resource to the source to trigger the events


      resourceImage.src = asset;
    });
  };

  AssetManager.prototype.setAsset = function (name, resource) {
    this._assetResourceList[name] = resource;
  };

  AssetManager.prototype.getAsset = function (name) {
    if (!this._assetResourceList[name]) {
      console.error(' Asset has not been defined in the resource list');
    }

    return this._assetResourceList[name];
  };

  return AssetManager;
}();

exports.AssetManager = AssetManager;
},{}],"engine/entity/BaseEntity.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BaseEntity = void 0;

var BaseEntity =
/** @class */
function () {
  function BaseEntity(src, size, pos) {
    this.offset = 0;
    this.resource = src;
    this.size = size;
    this.position = pos;
  }

  BaseEntity.prototype.calculateRect = function () {
    this.boundbox = {
      bottom: this.position.y + this.resource.height,
      top: this.position.y - (this.resource.height - this.offset),
      left: this.position.x - this.resource.width,
      right: this.position.x + this.resource.width
    };
  };

  BaseEntity.prototype.render = function (engine) {
    engine.gpu.drawImage(this.resource, this.position.x, this.position.y, this.size.width, this.size.height);
  };

  return BaseEntity;
}();

exports.BaseEntity = BaseEntity;
},{}],"engine/entity/Tree.ts":[function(require,module,exports) {
"use strict";

var __extends = this && this.__extends || function () {
  var _extendStatics = function extendStatics(d, b) {
    _extendStatics = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function (d, b) {
      d.__proto__ = b;
    } || function (d, b) {
      for (var p in b) {
        if (b.hasOwnProperty(p)) d[p] = b[p];
      }
    };

    return _extendStatics(d, b);
  };

  return function (d, b) {
    _extendStatics(d, b);

    function __() {
      this.constructor = d;
    }

    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Tree = void 0;

var BaseEntity_1 = require("./BaseEntity");

var Tree =
/** @class */
function (_super) {
  __extends(Tree, _super);

  function Tree(src, size, pos) {
    return _super.call(this, src, size, pos) || this;
  }

  Tree.prototype.render = function (engine) {
    engine.gpu.drawImage(this.resource, this.position.x, this.position.y, this.size.width, this.size.height);
  };

  return Tree;
}(BaseEntity_1.BaseEntity);

exports.Tree = Tree;
},{"./BaseEntity":"engine/entity/BaseEntity.ts"}],"engine/entity/Rock.ts":[function(require,module,exports) {
"use strict";

var __extends = this && this.__extends || function () {
  var _extendStatics = function extendStatics(d, b) {
    _extendStatics = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function (d, b) {
      d.__proto__ = b;
    } || function (d, b) {
      for (var p in b) {
        if (b.hasOwnProperty(p)) d[p] = b[p];
      }
    };

    return _extendStatics(d, b);
  };

  return function (d, b) {
    _extendStatics(d, b);

    function __() {
      this.constructor = d;
    }

    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Rock = exports.ROCKTYPE = void 0;

var BaseEntity_1 = require("./BaseEntity");

var ROCKTYPE;

(function (ROCKTYPE) {
  ROCKTYPE[ROCKTYPE["ROCK1"] = 1] = "ROCK1";
  ROCKTYPE[ROCKTYPE["ROCK2"] = 2] = "ROCK2";
})(ROCKTYPE = exports.ROCKTYPE || (exports.ROCKTYPE = {}));

;

var Rock =
/** @class */
function (_super) {
  __extends(Rock, _super);

  function Rock(src, size, pos, type) {
    var _this = _super.call(this, src, size, pos) || this;

    _this.rockType = type;
    return _this;
  }

  return Rock;
}(BaseEntity_1.BaseEntity);

exports.Rock = Rock;
},{"./BaseEntity":"engine/entity/BaseEntity.ts"}],"engine/entity/JumpRamp.ts":[function(require,module,exports) {
"use strict";

var __extends = this && this.__extends || function () {
  var _extendStatics = function extendStatics(d, b) {
    _extendStatics = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function (d, b) {
      d.__proto__ = b;
    } || function (d, b) {
      for (var p in b) {
        if (b.hasOwnProperty(p)) d[p] = b[p];
      }
    };

    return _extendStatics(d, b);
  };

  return function (d, b) {
    _extendStatics(d, b);

    function __() {
      this.constructor = d;
    }

    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.JumpRamp = void 0;

var BaseEntity_1 = require("./BaseEntity");

var JumpRamp =
/** @class */
function (_super) {
  __extends(JumpRamp, _super);

  function JumpRamp(src, size, pos) {
    return _super.call(this, src, size, pos) || this;
  }

  return JumpRamp;
}(BaseEntity_1.BaseEntity);

exports.JumpRamp = JumpRamp;
},{"./BaseEntity":"engine/entity/BaseEntity.ts"}],"engine/entity/TreeCluster.ts":[function(require,module,exports) {
"use strict";

var __extends = this && this.__extends || function () {
  var _extendStatics = function extendStatics(d, b) {
    _extendStatics = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function (d, b) {
      d.__proto__ = b;
    } || function (d, b) {
      for (var p in b) {
        if (b.hasOwnProperty(p)) d[p] = b[p];
      }
    };

    return _extendStatics(d, b);
  };

  return function (d, b) {
    _extendStatics(d, b);

    function __() {
      this.constructor = d;
    }

    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TreeCluster = void 0;

var BaseEntity_1 = require("./BaseEntity");

var TreeCluster =
/** @class */
function (_super) {
  __extends(TreeCluster, _super);

  function TreeCluster(src, size, pos) {
    return _super.call(this, src, size, pos) || this;
  }

  return TreeCluster;
}(BaseEntity_1.BaseEntity);

exports.TreeCluster = TreeCluster;
},{"./BaseEntity":"engine/entity/BaseEntity.ts"}],"engine/entity/Skier.ts":[function(require,module,exports) {
"use strict";

var __extends = this && this.__extends || function () {
  var _extendStatics = function extendStatics(d, b) {
    _extendStatics = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function (d, b) {
      d.__proto__ = b;
    } || function (d, b) {
      for (var p in b) {
        if (b.hasOwnProperty(p)) d[p] = b[p];
      }
    };

    return _extendStatics(d, b);
  };

  return function (d, b) {
    _extendStatics(d, b);

    function __() {
      this.constructor = d;
    }

    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Skier = void 0;

var BaseEntity_1 = require("./BaseEntity");

var Skier =
/** @class */
function (_super) {
  __extends(Skier, _super);

  function Skier(src, size, pos) {
    return _super.call(this, src, size, pos) || this;
  } // Override 


  Skier.prototype.render = function (engine) {
    engine.gpu.drawImage(this.resource, this.position.x, this.position.y, this.size.width, this.size.height);
  };

  return Skier;
}(BaseEntity_1.BaseEntity);

exports.Skier = Skier;
},{"./BaseEntity":"engine/entity/BaseEntity.ts"}],"engine/collision/Hitbox.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Hitbox = void 0;

var Hitbox =
/** @class */
function () {
  function Hitbox() {}

  Hitbox.prototype.hasCollided = function (rect1, rect2) {
    if (rect1.position.x < rect2.position.x + rect2.size.width && rect1.position.x + rect1.size.width > rect2.position.x && rect1.position.y < rect2.position.y + rect2.size.height && rect1.position.y + rect1.size.height > rect2.position.y) {
      return true;
    }

    return false;
  };

  return Hitbox;
}();

exports.Hitbox = Hitbox;
},{}],"engine/Scene.ts":[function(require,module,exports) {
"use strict"; // This Class handles the whole logic of placing objects on the screen, handling collision detection and also 

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Scene = void 0;

var Tree_1 = require("./entity/Tree");

var Rock_1 = require("./entity/Rock");

var JumpRamp_1 = require("./entity/JumpRamp");

var TreeCluster_1 = require("./entity/TreeCluster");

var Skier_1 = require("./entity/Skier");

var Hitbox_1 = require("./collision/Hitbox"); // The Items that should be randomly generated to the screen


var renderableTypes = ['tree', 'treeCluster', 'rock1', 'rock2', 'jump']; // Global variables for the Scene to use

var skierDirection = 5;
var skierMapX = 0;
var skierMapY = 0;
var skierSpeed = 8;
var KeyboardMappings = {
  LEFT: 37,
  RIGHT: 39,
  UP: 38,
  DOWN: 40
}; // dealing with the pausing and stop via the engine

var Scene =
/** @class */
function () {
  function Scene() {
    this.renderableList = []; // This list contains the items to be rendered to the canvas
  }

  Scene.prototype.setEngine = function (engine) {
    this._engine = engine;
  };

  Scene.prototype.init = function () {
    var _this = this; //Set the AssetMgr


    var assetMgr = this._engine.assetManager; // Set a default instance we will update the same resource

    var asset = assetMgr.getAsset('skierDown');
    this.skier = new Skier_1.Skier(asset, {
      width: asset.width,
      height: asset.height
    }, {
      x: 0,
      y: 0
    }); // Setup the collision system

    this.collision = new Hitbox_1.Hitbox();
    this.initialSetup();
    requestAnimationFrame(function (t) {
      return _this.render(t);
    });
  };

  Scene.prototype.onInput = function (e) {
    switch (e.keyCode) {
      case KeyboardMappings.LEFT:
        // left
        if (skierDirection === 1) {
          skierMapX -= skierSpeed;
          this.placeNewObstacle(skierDirection);
        } else {
          skierDirection--;
        }

        e.preventDefault();
        break;

      case KeyboardMappings.RIGHT:
        // right
        if (skierDirection === 5) {
          skierMapX += skierSpeed;
          this.placeNewObstacle(skierDirection);
        } else {
          skierDirection++;
        }

        e.preventDefault();
        break;

      case KeyboardMappings.UP:
        // up
        if (skierDirection === 1 || skierDirection === 5) {
          skierMapY -= skierSpeed;
          this.placeNewObstacle(6);
        }

        e.preventDefault();
        break;

      case KeyboardMappings.DOWN:
        // down
        skierDirection = 3;
        e.preventDefault();
        break;
    }
  };

  Scene.prototype.render = function (e) {
    var _this = this;

    this._engine.gpu.save();

    this._engine.gpu.scale(window.devicePixelRatio, window.devicePixelRatio);

    this._engine.clear();

    this.moveSkier();
    this.checkIfSkierHitObstacle();
    this.drawSkier();
    this.drawObstacles();

    this._engine.gpu.restore();

    requestAnimationFrame(function (e) {
      return _this.render(e);
    });
    console.log('Rendering...');
    console.log('Direction: %s, MapX: %s, MapY: %s, speed: %s', skierDirection, skierMapX, skierMapY, skierSpeed);
  };

  Scene.prototype.update = function () {};

  Scene.prototype.initialSetup = function () {
    // Create the obstacles to be rendered to the screen
    var _a = this._engine.dimension,
        w = _a.w,
        h = _a.h;
    var renderableItems = Math.ceil(_.random(5, 7) * (w / 800) * (h / 500));
    var minX = -50;
    var maxX = w + 50;
    var minY = h / 2 + 100;
    var maxY = h + 50;

    for (var idx = 0; idx < renderableItems; idx++) {
      this.drawRandomRenderables(minX, maxX, minY, maxY);
    }

    this.renderableList = _.sortBy(this.renderableList, function (obstacle) {
      var obstacleImage = obstacle.resource;
      return obstacle.position.y + obstacleImage.height;
    });
  };

  Scene.prototype.moveSkier = function () {
    switch (skierDirection) {
      case 2:
        skierMapX -= Math.round(skierSpeed / 1.4142);
        skierMapY += Math.round(skierSpeed / 1.4142);
        this.placeNewObstacle(skierDirection);
        break;

      case 3:
        skierMapY += skierSpeed;
        this.placeNewObstacle(skierDirection);
        break;

      case 4:
        skierMapX += skierSpeed / 1.4142;
        skierMapY += skierSpeed / 1.4142;
        this.placeNewObstacle(skierDirection);
        break;
    }
  };

  Scene.prototype.drawRandomRenderables = function (minX, maxX, minY, maxY) {
    var assetMgr = this._engine.assetManager;

    var renderableIndex = _.random(0, renderableTypes.length - 1);

    var position = this.calculateOpenPosition(minX, maxX, minY, maxY); // Get the renderable type and push to the Renderable List to be displayed

    var renderType = renderableTypes[renderableIndex];
    var renderable = null;
    var asset = null;

    switch (renderType) {
      case 'tree':
        asset = assetMgr.getAsset('tree');
        renderable = new Tree_1.Tree(asset, {
          height: asset.width,
          width: asset.height
        }, {
          x: position.x,
          y: position.y + asset.height
        });
        break;

      case 'treeCluster':
        asset = assetMgr.getAsset('treeCluster');
        renderable = new TreeCluster_1.TreeCluster(asset, {
          height: asset.width,
          width: asset.height
        }, {
          x: position.x,
          y: position.y + asset.height
        });
        this.renderableList.push(renderable);
        break;

      case 'rock1':
        asset = assetMgr.getAsset('rock1');
        renderable = new Rock_1.Rock(asset, {
          height: asset.width,
          width: asset.height
        }, {
          x: position.x,
          y: position.y + asset.height
        }, Rock_1.ROCKTYPE.ROCK1);
        break;

      case 'rock2':
        asset = assetMgr.getAsset('rock2');
        renderable = new Rock_1.Rock(asset, {
          height: asset.width,
          width: asset.height
        }, {
          x: position.x,
          y: position.y + asset.height
        }, Rock_1.ROCKTYPE.ROCK2);
        break;

      case 'jump':
        asset = assetMgr.getAsset('jumpRamp');
        renderable = new JumpRamp_1.JumpRamp(asset, {
          height: asset.width,
          width: asset.height
        }, {
          x: position.x,
          y: position.y + asset.height
        });
        break;
    }

    this.renderableList.push(renderable);
  };

  Scene.prototype.getSkierAsset = function () {
    var skierAssetName;

    switch (skierDirection) {
      case 0:
        skierAssetName = 'skierCrash';
        break;

      case 1:
        skierAssetName = 'skierLeft';
        break;

      case 2:
        skierAssetName = 'skierLeftDown';
        break;

      case 3:
        skierAssetName = 'skierDown';
        break;

      case 4:
        skierAssetName = 'skierRightDown';
        break;

      case 5:
        skierAssetName = 'skierRight';
        break;
    }

    return skierAssetName;
  };

  Scene.prototype.calculateOpenPosition = function (minX, maxX, minY, maxY) {
    var x = _.random(minX, maxX);

    var y = _.random(minY, maxY);

    var foundCollision = _.find(this.renderableList, function (obstacle) {
      return x > obstacle.position.x - 50 && x < obstacle.position.x + 50 && y > obstacle.position.y - 50 && y < obstacle.position.y + 50;
    });

    if (foundCollision) {
      return this.calculateOpenPosition(minX, maxX, minY, maxY);
    } else {
      return {
        x: x,
        y: y
      };
    }
  };

  Scene.prototype.drawObstacles = function () {
    var _this = this; // Get Engine for measurement size


    var _a = this.getDimension(),
        w = _a.w,
        h = _a.h;

    var newObstacles = [];

    _.each(this.renderableList, function (obstacle) {
      var obstacleImage = obstacle.resource; // Image resource

      var x = obstacle.position.x - skierMapX - obstacleImage.width / 2;
      var y = obstacle.position.y - skierMapY - obstacleImage.height / 2;

      if (x < -100 || x > +50 || y < -100 || y > h + 50) {
        return;
      } //ctx.drawImage(obstacleImage, x, y, obstacleImage.width, obstacleImage.height);
      // Each obstacle should be drawn to the screen


      obstacle.render(_this._engine);
      newObstacles.push(obstacle);
    });

    this.renderableList = newObstacles;
  };

  Scene.prototype.drawSkier = function () {
    var _a = this.getDimension(),
        w = _a.w,
        h = _a.h;

    var skierAssetName = this.getSkierAsset();

    var skierImage = this._engine.assetManager.getAsset(skierAssetName);

    var x = (w - skierImage.width) / 2;
    var y = (h - skierImage.height) / 2; //ctx.drawImage(skierImage, x, y, skierImage.width, skierImage.height); 

    this.skier.position = {
      x: x,
      y: y
    };
    this.skier.size = {
      width: skierImage.width,
      height: skierImage.height
    };
    this.skier.render(this._engine);
  };

  Scene.prototype.placeNewObstacle = function (direction) {
    var _a = this.getDimension(),
        w = _a.w,
        h = _a.h;

    var shouldPlaceObstacle = _.random(1, 8);

    if (shouldPlaceObstacle !== 8) {
      return;
    }

    var leftEdge = skierMapX;
    var rightEdge = skierMapX + w;
    var topEdge = skierMapY;
    var bottomEdge = skierMapY + h;

    switch (direction) {
      case 1:
        // left
        this.drawRandomRenderables(leftEdge - 50, leftEdge, topEdge, bottomEdge);
        break;

      case 2:
        // left down
        this.drawRandomRenderables(leftEdge - 50, leftEdge, topEdge, bottomEdge);
        this.drawRandomRenderables(leftEdge, rightEdge, bottomEdge, bottomEdge + 50);
        break;

      case 3:
        // down
        this.drawRandomRenderables(leftEdge, rightEdge, bottomEdge, bottomEdge + 50);
        break;

      case 4:
        // right down
        this.drawRandomRenderables(rightEdge, rightEdge + 50, topEdge, bottomEdge);
        this.drawRandomRenderables(leftEdge, rightEdge, bottomEdge, bottomEdge + 50);
        break;

      case 5:
        // right
        this.drawRandomRenderables(rightEdge, rightEdge + 50, topEdge, bottomEdge);
        break;

      case 6:
        // up
        this.drawRandomRenderables(leftEdge, rightEdge, topEdge - 50, topEdge);
        break;
    }
  };

  Scene.prototype.getDimension = function () {
    return this._engine.dimension;
  };

  Scene.prototype.checkIfSkierHitObstacle = function () {
    var _this = this; // Check if the Skier has hit any obstacle


    var collision = _.find(this.renderableList, function (obstacle) {
      obstacle.offset = 5;
      return _this.collision.hasCollided(_this.skier, obstacle);
    });

    if (collision) {
      skierDirection = 0;
    }
  };

  return Scene;
}();

exports.Scene = Scene;
},{"./entity/Tree":"engine/entity/Tree.ts","./entity/Rock":"engine/entity/Rock.ts","./entity/JumpRamp":"engine/entity/JumpRamp.ts","./entity/TreeCluster":"engine/entity/TreeCluster.ts","./entity/Skier":"engine/entity/Skier.ts","./collision/Hitbox":"engine/collision/Hitbox.ts"}],"app.ts":[function(require,module,exports) {
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

var Scene_1 = require("./engine/Scene");

document.addEventListener('DOMContentLoaded', function (event) {
  // Start the main application here
  var asset = new AssetManager_1.AssetManager();
  asset.download(function () {
    var engine = new CerosEngine_1.CerosEngine();
    engine.assetManager = asset;
    var scene = new Scene_1.Scene();
    engine.init(scene);
    console.log('Gaming Engine runs now...with Scene');
  });
});
},{"./engine/CerosEngine":"engine/CerosEngine.ts","./engine/AssetManager":"engine/AssetManager.ts","./engine/Scene":"engine/Scene.ts"}],"node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
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