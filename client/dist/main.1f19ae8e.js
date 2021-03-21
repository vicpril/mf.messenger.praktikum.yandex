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
})({"utils/mydash/get.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.get = get;

function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

/**
 * Get object's field by string
 * 
 * @param  {Object} obj
 * @param  {String} str
 * @param  {any} defaultValue
 */
function get(obj, str, defaultValue) {
  var keys = str.split('.');
  var result = obj;

  var _iterator = _createForOfIteratorHelper(keys),
      _step;

  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var key = _step.value;
      var _value = result[key];

      if (typeof _value === 'undefined') {
        return defaultValue;
      }

      result = _value;
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }

  return typeof value === 'undefined' ? result : defaultValue;
}
},{}],"utils/mydash/compare.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.compare = compare;

function compare(post, operator, value) {
  // debugger
  switch (operator) {
    case '>':
      return post > value;

    case '<':
      return post < value;

    case '>=':
      return post >= value;

    case '<=':
      return post <= value;

    case '==':
      return post == value;

    case '!=':
      return post != value;

    case '===':
      return post === value;

    case '!==':
      return post !== value;

    case null:
    case undefined:
      return post ? true : false;

    default:
      return false;
  }
}
},{}],"utils/mydash/isUndefined.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isUndefined = isUndefined;

function isUndefined(value) {
  if (typeof value === 'undefined') {
    return true;
  }
}
},{}],"utils/mydash/trimQuotes.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.trimQuotes = trimQuotes;

function trimQuotes(str) {
  var regExp = /^["'](.+(?=["']$))["']$/gi;
  return str.replace(regExp, '$1');
}
},{}],"classes/templators/templator-if.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TemplatorIf = void 0;

var _get = require("../../utils/mydash/get");

var _compare = require("../../utils/mydash/compare");

var _isUndefined = require("../../utils/mydash/isUndefined");

var _trimQuotes = require("../../utils/mydash/trimQuotes");

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var TemplatorIf = /*#__PURE__*/function () {
  function TemplatorIf(template) {
    _classCallCheck(this, TemplatorIf);

    _defineProperty(this, "TEMPLATE_REGEXP", /<v\x2Dif(="([\s\S]*?)")>([\s\S]*?)(<v\x2Delse>([\s\S]*?))?<v\x2Dif\x2Dend>/gi);

    _defineProperty(this, "COMPARE_REGEXP", /(\w+)((.*?)(\'?\w+\'?))?/);

    this._template = template;
  }

  _createClass(TemplatorIf, [{
    key: "compile",
    value: function compile(ctx) {
      return this._compileTemplate(ctx);
    }
  }, {
    key: "_compileTemplate",
    value: function _compileTemplate(ctx) {
      var regExp = this.TEMPLATE_REGEXP; // avoid from infinity loop

      var template = this._template;
      var result = template;
      var key = null;

      while (key = regExp.exec(template)) {
        var condition = key[2].trim();
        var partIf = key[3].trim();
        var partElse = (0, _isUndefined.isUndefined)(key[5]) ? "" : key[5].trim();

        var _this$_parseCondition = this._parseCondition(condition),
            _this$_parseCondition2 = _slicedToArray(_this$_parseCondition, 3),
            postString = _this$_parseCondition2[0],
            operator = _this$_parseCondition2[1],
            valueString = _this$_parseCondition2[2];

        var post = (0, _get.get)(ctx, postString, postString);
        var value = !(0, _isUndefined.isUndefined)(valueString) ? (0, _get.get)(ctx, valueString, valueString) : valueString;

        if ((0, _compare.compare)(post, operator, value)) {
          result = result.replace(new RegExp(key[0], "gi"), partIf);
        } else {
          result = result.replace(new RegExp(key[0], "gi"), partElse);
        }

        continue;
      }

      return result;
    }
  }, {
    key: "_parseCondition",
    value: function _parseCondition(str) {
      var regExp = this.COMPARE_REGEXP;
      var keys = regExp.exec(str);
      return !(0, _isUndefined.isUndefined)(keys[3]) ? [(0, _trimQuotes.trimQuotes)(keys[1]), keys[3].trim(), (0, _trimQuotes.trimQuotes)(keys[4])] // set 2 variables and condition
      : [str]; // set a variable only
    }
  }]);

  return TemplatorIf;
}();

exports.TemplatorIf = TemplatorIf;
},{"../../utils/mydash/get":"utils/mydash/get.js","../../utils/mydash/compare":"utils/mydash/compare.js","../../utils/mydash/isUndefined":"utils/mydash/isUndefined.js","../../utils/mydash/trimQuotes":"utils/mydash/trimQuotes.js"}],"classes/templators/templator-variables.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TemplatorVariables = void 0;

var _get = require("../../utils/mydash/get");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var TemplatorVariables = /*#__PURE__*/function () {
  function TemplatorVariables(template) {
    _classCallCheck(this, TemplatorVariables);

    _defineProperty(this, "TEMPLATE_REGEXP", /\{\{(.*?)\}\}/i);

    this._template = template;
  }

  _createClass(TemplatorVariables, [{
    key: "compile",
    value: function compile(ctx) {
      return this._compileTemplate(ctx);
    }
  }, {
    key: "_compileTemplate",
    value: function _compileTemplate(ctx) {
      var template = this._template;
      var regExp = this.TEMPLATE_REGEXP; // avoid from infinity loop

      var key = null;

      while (key = regExp.exec(template)) {
        if (key[1]) {
          var templValue = key[1].trim();
          var value = (0, _get.get)(ctx, templValue); // check if value defined

          if (typeof value === 'undefined') {
            template = template.replace(new RegExp(key[0], "gi"), "");
            continue;
          } // handle function


          if (typeof value === 'function') {
            window[templValue] = value;
            template = template.replace(new RegExp(key[0], "gi"), "window.".concat(key[1].trim(), "()"));
            continue;
          }

          template = template.replace(new RegExp(key[0], "gi"), value);
        }
      }

      return template;
    }
  }]);

  return TemplatorVariables;
}();

exports.TemplatorVariables = TemplatorVariables;
},{"../../utils/mydash/get":"utils/mydash/get.js"}],"classes/templators/templator-for.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TemplatorFor = void 0;

var _get = require("../../utils/mydash/get");

var _templatorVariables = require("./templator-variables");

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var TemplatorFor = /*#__PURE__*/function () {
  function TemplatorFor(template) {
    _classCallCheck(this, TemplatorFor);

    _defineProperty(this, "TEMPLATE_REGEXP", /<v\x2Dfor(="\(([\s\S]*?),[\t-\r \xA0\u1680\u2000-\u200A\u2028\u2029\u202F\u205F\u3000\uFEFF]([\s\S]*?)\)[\t-\r \xA0\u1680\u2000-\u200A\u2028\u2029\u202F\u205F\u3000\uFEFF]in[\t-\r \xA0\u1680\u2000-\u200A\u2028\u2029\u202F\u205F\u3000\uFEFF]([\s\S]*?)")>([\s\S]*?)<v\x2Dfor\x2Dend>/gi);

    this._template = template;
  }

  _createClass(TemplatorFor, [{
    key: "compile",
    value: function compile(ctx) {
      return this._compileTemplate(ctx);
    }
  }, {
    key: "_compileTemplate",
    value: function _compileTemplate(ctx) {
      var _this = this;

      var regExp = this.TEMPLATE_REGEXP; // avoid from infinity loop

      var template = this._template;
      var result = '';
      var key = null;

      var _loop = function _loop() {
        // console.log(key)
        var valueKey = key[2].trim();
        var indexKey = key[3].trim();
        var target = (0, _get.get)(ctx, key[4].trim(), []);
        var content = key[5];
        var templatorVariables = new _templatorVariables.TemplatorVariables(content);

        if (Array.isArray(target)) {
          target.forEach(function (value, index) {
            var context = _this._createContext(indexKey, index, valueKey, value);

            var contextTemplate = templatorVariables.compile(context);
            result += contextTemplate;
          });
        } else if (_typeof(target) === "object") {
          Object.getOwnPropertyNames(target).forEach(function (key) {
            var context = _this._createContext(indexKey, key, valueKey, target[key]);

            var contextTemplate = templatorVariables.compile(context);
            result += contextTemplate;
          });
        }
      };

      while (key = regExp.exec(template)) {
        _loop();
      }

      return result;
    }
  }, {
    key: "_createContext",
    value: function _createContext(indexKey, index, valueKey, value) {
      var obj = {};
      obj[indexKey] = index;
      obj[valueKey] = value;
      return obj;
    }
  }]);

  return TemplatorFor;
}();

exports.TemplatorFor = TemplatorFor;
},{"../../utils/mydash/get":"utils/mydash/get.js","./templator-variables":"classes/templators/templator-variables.js"}],"classes/templators/templator.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Templator = void 0;

var _templatorIf = require("./templator-if");

var _templatorFor = require("./templator-for");

var _templatorVariables = require("./templator-variables");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Templator = /*#__PURE__*/function () {
  function Templator(template) {
    _classCallCheck(this, Templator);

    this._template = template;
  }

  _createClass(Templator, [{
    key: "compile",
    value: function compile(ctx) {
      var templatorFor = new _templatorFor.TemplatorFor(this._template);
      this._template = templatorFor.compile(ctx);
      var templatorIf = new _templatorIf.TemplatorIf(this._template);
      this._template = templatorIf.compile(ctx);
      var templatorVariables = new _templatorVariables.TemplatorVariables(this._template);
      this._template = templatorVariables.compile(ctx);
      return this._template;
    }
  }]);

  return Templator;
}();

exports.Templator = Templator;
},{"./templator-if":"classes/templators/templator-if.js","./templator-for":"classes/templators/templator-for.js","./templator-variables":"classes/templators/templator-variables.js"}],"templates/blocks/chats/block.tmpl.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.blockTemplate = void 0;

var blockTemplate = function blockTemplate() {
  return "\n        <!-- \u041C\u043E\u0436\u043D\u043E {{}} \u0441 \u043F\u0440\u043E\u0431\u0435\u043B\u0430\u043C\u0438, \u043C\u043E\u0436\u043D\u043E \u0431\u0435\u0437-->\n        <div class=\"{{ className }}\">\n            <span onClick=\"{{ handleClick }}\">{{text}}</span>\n            <span>{{ user.info.firstName }}</span>\n        </div>\n        ";
};

exports.blockTemplate = blockTemplate;
},{}],"templates/element.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Element = void 0;

var _templator = require("./../classes/templators/templator");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

// import "./../templates/button/button.scss";
var Element = /*#__PURE__*/function () {
  function Element(template, selector, options) {
    _classCallCheck(this, Element);

    this.$el = document.querySelector(selector);
    var tmpl = new _templator.Templator(template);
    this.element = tmpl.compile(options);
  }

  _createClass(Element, [{
    key: "render",
    value: function render(css) {
      this.$el.insertAdjacentHTML('beforeend', this.element);
      this.renderCss(css);
    }
  }, {
    key: "renderCss",
    value: function renderCss(css) {
      var link = document.createElement('link');
      link.rel = 'stylesheet';
      link.type = 'text/css'; // link.href = 'button.scss';

      link.href = css;
      document.getElementsByTagName('head')[0].appendChild(link);
    }
  }]);

  return Element;
}();

exports.Element = Element;
},{"./../classes/templators/templator":"classes/templators/templator.js"}],"templates/components/button/button.tmpl.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _default = "<button id=\"{{id}}\" class=\"{{css}}\" {{data}}>\n        {{content}}\n    </button>\n    ";
exports.default = _default;
},{}],"../node_modules/parcel-bundler/src/builtins/bundle-url.js":[function(require,module,exports) {
var bundleURL = null;

function getBundleURLCached() {
  if (!bundleURL) {
    bundleURL = getBundleURL();
  }

  return bundleURL;
}

function getBundleURL() {
  // Attempt to find the URL of the current script and use that as the base URL
  try {
    throw new Error();
  } catch (err) {
    var matches = ('' + err.stack).match(/(https?|file|ftp|chrome-extension|moz-extension):\/\/[^)\n]+/g);

    if (matches) {
      return getBaseURL(matches[0]);
    }
  }

  return '/';
}

function getBaseURL(url) {
  return ('' + url).replace(/^((?:https?|file|ftp|chrome-extension|moz-extension):\/\/.+)?\/[^/]+(?:\?.*)?$/, '$1') + '/';
}

exports.getBundleURL = getBundleURLCached;
exports.getBaseURL = getBaseURL;
},{}],"../node_modules/parcel-bundler/src/builtins/css-loader.js":[function(require,module,exports) {
var bundle = require('./bundle-url');

function updateLink(link) {
  var newLink = link.cloneNode();

  newLink.onload = function () {
    link.remove();
  };

  newLink.href = link.href.split('?')[0] + '?' + Date.now();
  link.parentNode.insertBefore(newLink, link.nextSibling);
}

var cssTimeout = null;

function reloadCSS() {
  if (cssTimeout) {
    return;
  }

  cssTimeout = setTimeout(function () {
    var links = document.querySelectorAll('link[rel="stylesheet"]');

    for (var i = 0; i < links.length; i++) {
      if (bundle.getBaseURL(links[i].href) === bundle.getBundleURL()) {
        updateLink(links[i]);
      }
    }

    cssTimeout = null;
  }, 50);
}

module.exports = reloadCSS;
},{"./bundle-url":"../node_modules/parcel-bundler/src/builtins/bundle-url.js"}],"templates/components/button/button.scss":[function(require,module,exports) {
var reloadCSS = require('_css_loader');

module.hot.dispose(reloadCSS);
module.hot.accept(reloadCSS);
},{"_css_loader":"../node_modules/parcel-bundler/src/builtins/css-loader.js"}],"templates/components/button/button.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Button = void 0;

var _element = require("../../element");

var _button = _interopRequireDefault(require("./button.tmpl"));

require("./button.scss");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _get(target, property, receiver) { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return _get(target, property, receiver || target); }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var Button = /*#__PURE__*/function (_Element) {
  _inherits(Button, _Element);

  var _super = _createSuper(Button);

  function Button(selector, options) {
    _classCallCheck(this, Button);

    return _super.call(this, _button.default, selector, options);
  }

  _createClass(Button, [{
    key: "render",
    value: function render() {
      _get(_getPrototypeOf(Button.prototype), "render", this).call(this); // super.super(css)

    }
  }]);

  return Button;
}(_element.Element);

exports.Button = Button;
},{"../../element":"templates/element.js","./button.tmpl":"templates/components/button/button.tmpl.js","./button.scss":"templates/components/button/button.scss"}],"templates/components/input/input.tmpl.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _default = "<input id=\"{{id}}\" class=\"{{css}}\" name=\"{{name}}\" value=\"{{value}}\" {{data}} />";
exports.default = _default;
},{}],"templates/components/input/input.scss":[function(require,module,exports) {
var reloadCSS = require('_css_loader');

module.hot.dispose(reloadCSS);
module.hot.accept(reloadCSS);
},{"_css_loader":"../node_modules/parcel-bundler/src/builtins/css-loader.js"}],"templates/components/input/input.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Input = void 0;

var _element = require("../../element");

var _input = _interopRequireDefault(require("./input.tmpl"));

require("./input.scss");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _get(target, property, receiver) { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return _get(target, property, receiver || target); }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var Input = /*#__PURE__*/function (_Element) {
  _inherits(Input, _Element);

  var _super = _createSuper(Input);

  function Input(selector, options) {
    _classCallCheck(this, Input);

    return _super.call(this, _input.default, selector, options);
  }

  _createClass(Input, [{
    key: "render",
    value: function render() {
      _get(_getPrototypeOf(Input.prototype), "render", this).call(this); // super.super(css)

    }
  }]);

  return Input;
}(_element.Element);

exports.Input = Input;
},{"../../element":"templates/element.js","./input.tmpl":"templates/components/input/input.tmpl.js","./input.scss":"templates/components/input/input.scss"}],"style.css":[function(require,module,exports) {
var reloadCSS = require('_css_loader');

module.hot.dispose(reloadCSS);
module.hot.accept(reloadCSS);
},{"_css_loader":"../node_modules/parcel-bundler/src/builtins/css-loader.js"}],"main.js":[function(require,module,exports) {
"use strict";

var _templator = require("./classes/templators/templator");

var _blockTmpl = require("./templates/blocks/chats/block.tmpl.js");

var _button = require("./templates/components/button/button");

var _input = require("./templates/components/input/input");

require("./style.css");

console.log("~ block", block);
var temp = new _templator.Templator(block);
var renderTemplate = temp.compile({
  array: ["f", 'r', 12],
  object: {
    time: "flyes",
    today: "sunday"
  }
});
console.log("~ renderTemplate", renderTemplate); // console.log("~ blockif", blockif)
// const temp3 = new TemplatorIf(blockif);
// const renderTemplate3 = temp3.compile({
//    var1: 'title',
// });
// console.log("~ renderTemplate3", renderTemplate3)
// const context = {
//    text: 'Мой очень важный span',
//    className: 'chats',
//    user: {
//       info: {
//          firstName: 'Alexander',
//       },
//    },
//    handleClick: function () {
//       console.log(document.body);
//    }
// };
// const renderedTemplate = tmpl.compile(context); // Строка с html-вёрсткой
// const root = document.querySelector('.root');
// root.innerHTML = `
//       <p>Результат после нажатия виден в консоли</p>
//       ${renderedTemplate}
//       `;
// const btn1 = new Button('.login-form__buttons', {
//    id: "mybutton",
//    css: "root__button button",
//    content: "Say Hello"
// })
// btn1.render();
// const btn2 = new Button('.login-form__buttons', {
//    id: "mybutton2",
//    css: "root__button button button__red",
//    content: "Say Hello 222"
// })
// btn2.render();
// const input1 = new Input('.login-form', {
//    id: "myinput1",
//    css: "login-form__input",
//    name: "phone",
//    valur: "123-123",
// })
// input1.render();
// const input2 = new Input('.login-form', {
//    id: "myinput2",
//    css: "login-form__input",
//    name: "phone",
//    valur: "123-123",
// })
// input1.render();
},{"./classes/templators/templator":"classes/templators/templator.js","./templates/blocks/chats/block.tmpl.js":"templates/blocks/chats/block.tmpl.js","./templates/components/button/button":"templates/components/button/button.js","./templates/components/input/input":"templates/components/input/input.js","./style.css":"style.css"}],"../node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
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
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "41383" + '/');

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
},{}]},{},["../node_modules/parcel-bundler/src/builtins/hmr-runtime.js","main.js"], null)
//# sourceMappingURL=/main.1f19ae8e.js.map