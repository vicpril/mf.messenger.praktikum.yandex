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
})({"../../node_modules/regenerator-runtime/runtime.js":[function(require,module,exports) {
var define;
/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

var runtime = (function (exports) {
  "use strict";

  var Op = Object.prototype;
  var hasOwn = Op.hasOwnProperty;
  var undefined; // More compressible than void 0.
  var $Symbol = typeof Symbol === "function" ? Symbol : {};
  var iteratorSymbol = $Symbol.iterator || "@@iterator";
  var asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator";
  var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

  function define(obj, key, value) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
    return obj[key];
  }
  try {
    // IE 8 has a broken Object.defineProperty that only works on DOM objects.
    define({}, "");
  } catch (err) {
    define = function(obj, key, value) {
      return obj[key] = value;
    };
  }

  function wrap(innerFn, outerFn, self, tryLocsList) {
    // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.
    var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
    var generator = Object.create(protoGenerator.prototype);
    var context = new Context(tryLocsList || []);

    // The ._invoke method unifies the implementations of the .next,
    // .throw, and .return methods.
    generator._invoke = makeInvokeMethod(innerFn, self, context);

    return generator;
  }
  exports.wrap = wrap;

  // Try/catch helper to minimize deoptimizations. Returns a completion
  // record like context.tryEntries[i].completion. This interface could
  // have been (and was previously) designed to take a closure to be
  // invoked without arguments, but in all the cases we care about we
  // already have an existing method we want to call, so there's no need
  // to create a new function object. We can even get away with assuming
  // the method takes exactly one argument, since that happens to be true
  // in every case, so we don't have to touch the arguments object. The
  // only additional allocation required is the completion record, which
  // has a stable shape and so hopefully should be cheap to allocate.
  function tryCatch(fn, obj, arg) {
    try {
      return { type: "normal", arg: fn.call(obj, arg) };
    } catch (err) {
      return { type: "throw", arg: err };
    }
  }

  var GenStateSuspendedStart = "suspendedStart";
  var GenStateSuspendedYield = "suspendedYield";
  var GenStateExecuting = "executing";
  var GenStateCompleted = "completed";

  // Returning this object from the innerFn has the same effect as
  // breaking out of the dispatch switch statement.
  var ContinueSentinel = {};

  // Dummy constructor functions that we use as the .constructor and
  // .constructor.prototype properties for functions that return Generator
  // objects. For full spec compliance, you may wish to configure your
  // minifier not to mangle the names of these two functions.
  function Generator() {}
  function GeneratorFunction() {}
  function GeneratorFunctionPrototype() {}

  // This is a polyfill for %IteratorPrototype% for environments that
  // don't natively support it.
  var IteratorPrototype = {};
  IteratorPrototype[iteratorSymbol] = function () {
    return this;
  };

  var getProto = Object.getPrototypeOf;
  var NativeIteratorPrototype = getProto && getProto(getProto(values([])));
  if (NativeIteratorPrototype &&
      NativeIteratorPrototype !== Op &&
      hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {
    // This environment has a native %IteratorPrototype%; use it instead
    // of the polyfill.
    IteratorPrototype = NativeIteratorPrototype;
  }

  var Gp = GeneratorFunctionPrototype.prototype =
    Generator.prototype = Object.create(IteratorPrototype);
  GeneratorFunction.prototype = Gp.constructor = GeneratorFunctionPrototype;
  GeneratorFunctionPrototype.constructor = GeneratorFunction;
  GeneratorFunction.displayName = define(
    GeneratorFunctionPrototype,
    toStringTagSymbol,
    "GeneratorFunction"
  );

  // Helper for defining the .next, .throw, and .return methods of the
  // Iterator interface in terms of a single ._invoke method.
  function defineIteratorMethods(prototype) {
    ["next", "throw", "return"].forEach(function(method) {
      define(prototype, method, function(arg) {
        return this._invoke(method, arg);
      });
    });
  }

  exports.isGeneratorFunction = function(genFun) {
    var ctor = typeof genFun === "function" && genFun.constructor;
    return ctor
      ? ctor === GeneratorFunction ||
        // For the native GeneratorFunction constructor, the best we can
        // do is to check its .name property.
        (ctor.displayName || ctor.name) === "GeneratorFunction"
      : false;
  };

  exports.mark = function(genFun) {
    if (Object.setPrototypeOf) {
      Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
    } else {
      genFun.__proto__ = GeneratorFunctionPrototype;
      define(genFun, toStringTagSymbol, "GeneratorFunction");
    }
    genFun.prototype = Object.create(Gp);
    return genFun;
  };

  // Within the body of any async function, `await x` is transformed to
  // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
  // `hasOwn.call(value, "__await")` to determine if the yielded value is
  // meant to be awaited.
  exports.awrap = function(arg) {
    return { __await: arg };
  };

  function AsyncIterator(generator, PromiseImpl) {
    function invoke(method, arg, resolve, reject) {
      var record = tryCatch(generator[method], generator, arg);
      if (record.type === "throw") {
        reject(record.arg);
      } else {
        var result = record.arg;
        var value = result.value;
        if (value &&
            typeof value === "object" &&
            hasOwn.call(value, "__await")) {
          return PromiseImpl.resolve(value.__await).then(function(value) {
            invoke("next", value, resolve, reject);
          }, function(err) {
            invoke("throw", err, resolve, reject);
          });
        }

        return PromiseImpl.resolve(value).then(function(unwrapped) {
          // When a yielded Promise is resolved, its final value becomes
          // the .value of the Promise<{value,done}> result for the
          // current iteration.
          result.value = unwrapped;
          resolve(result);
        }, function(error) {
          // If a rejected Promise was yielded, throw the rejection back
          // into the async generator function so it can be handled there.
          return invoke("throw", error, resolve, reject);
        });
      }
    }

    var previousPromise;

    function enqueue(method, arg) {
      function callInvokeWithMethodAndArg() {
        return new PromiseImpl(function(resolve, reject) {
          invoke(method, arg, resolve, reject);
        });
      }

      return previousPromise =
        // If enqueue has been called before, then we want to wait until
        // all previous Promises have been resolved before calling invoke,
        // so that results are always delivered in the correct order. If
        // enqueue has not been called before, then it is important to
        // call invoke immediately, without waiting on a callback to fire,
        // so that the async generator function has the opportunity to do
        // any necessary setup in a predictable way. This predictability
        // is why the Promise constructor synchronously invokes its
        // executor callback, and why async functions synchronously
        // execute code before the first await. Since we implement simple
        // async functions in terms of async generators, it is especially
        // important to get this right, even though it requires care.
        previousPromise ? previousPromise.then(
          callInvokeWithMethodAndArg,
          // Avoid propagating failures to Promises returned by later
          // invocations of the iterator.
          callInvokeWithMethodAndArg
        ) : callInvokeWithMethodAndArg();
    }

    // Define the unified helper method that is used to implement .next,
    // .throw, and .return (see defineIteratorMethods).
    this._invoke = enqueue;
  }

  defineIteratorMethods(AsyncIterator.prototype);
  AsyncIterator.prototype[asyncIteratorSymbol] = function () {
    return this;
  };
  exports.AsyncIterator = AsyncIterator;

  // Note that simple async functions are implemented on top of
  // AsyncIterator objects; they just return a Promise for the value of
  // the final result produced by the iterator.
  exports.async = function(innerFn, outerFn, self, tryLocsList, PromiseImpl) {
    if (PromiseImpl === void 0) PromiseImpl = Promise;

    var iter = new AsyncIterator(
      wrap(innerFn, outerFn, self, tryLocsList),
      PromiseImpl
    );

    return exports.isGeneratorFunction(outerFn)
      ? iter // If outerFn is a generator, return the full iterator.
      : iter.next().then(function(result) {
          return result.done ? result.value : iter.next();
        });
  };

  function makeInvokeMethod(innerFn, self, context) {
    var state = GenStateSuspendedStart;

    return function invoke(method, arg) {
      if (state === GenStateExecuting) {
        throw new Error("Generator is already running");
      }

      if (state === GenStateCompleted) {
        if (method === "throw") {
          throw arg;
        }

        // Be forgiving, per 25.3.3.3.3 of the spec:
        // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume
        return doneResult();
      }

      context.method = method;
      context.arg = arg;

      while (true) {
        var delegate = context.delegate;
        if (delegate) {
          var delegateResult = maybeInvokeDelegate(delegate, context);
          if (delegateResult) {
            if (delegateResult === ContinueSentinel) continue;
            return delegateResult;
          }
        }

        if (context.method === "next") {
          // Setting context._sent for legacy support of Babel's
          // function.sent implementation.
          context.sent = context._sent = context.arg;

        } else if (context.method === "throw") {
          if (state === GenStateSuspendedStart) {
            state = GenStateCompleted;
            throw context.arg;
          }

          context.dispatchException(context.arg);

        } else if (context.method === "return") {
          context.abrupt("return", context.arg);
        }

        state = GenStateExecuting;

        var record = tryCatch(innerFn, self, context);
        if (record.type === "normal") {
          // If an exception is thrown from innerFn, we leave state ===
          // GenStateExecuting and loop back for another invocation.
          state = context.done
            ? GenStateCompleted
            : GenStateSuspendedYield;

          if (record.arg === ContinueSentinel) {
            continue;
          }

          return {
            value: record.arg,
            done: context.done
          };

        } else if (record.type === "throw") {
          state = GenStateCompleted;
          // Dispatch the exception by looping back around to the
          // context.dispatchException(context.arg) call above.
          context.method = "throw";
          context.arg = record.arg;
        }
      }
    };
  }

  // Call delegate.iterator[context.method](context.arg) and handle the
  // result, either by returning a { value, done } result from the
  // delegate iterator, or by modifying context.method and context.arg,
  // setting context.delegate to null, and returning the ContinueSentinel.
  function maybeInvokeDelegate(delegate, context) {
    var method = delegate.iterator[context.method];
    if (method === undefined) {
      // A .throw or .return when the delegate iterator has no .throw
      // method always terminates the yield* loop.
      context.delegate = null;

      if (context.method === "throw") {
        // Note: ["return"] must be used for ES3 parsing compatibility.
        if (delegate.iterator["return"]) {
          // If the delegate iterator has a return method, give it a
          // chance to clean up.
          context.method = "return";
          context.arg = undefined;
          maybeInvokeDelegate(delegate, context);

          if (context.method === "throw") {
            // If maybeInvokeDelegate(context) changed context.method from
            // "return" to "throw", let that override the TypeError below.
            return ContinueSentinel;
          }
        }

        context.method = "throw";
        context.arg = new TypeError(
          "The iterator does not provide a 'throw' method");
      }

      return ContinueSentinel;
    }

    var record = tryCatch(method, delegate.iterator, context.arg);

    if (record.type === "throw") {
      context.method = "throw";
      context.arg = record.arg;
      context.delegate = null;
      return ContinueSentinel;
    }

    var info = record.arg;

    if (! info) {
      context.method = "throw";
      context.arg = new TypeError("iterator result is not an object");
      context.delegate = null;
      return ContinueSentinel;
    }

    if (info.done) {
      // Assign the result of the finished delegate to the temporary
      // variable specified by delegate.resultName (see delegateYield).
      context[delegate.resultName] = info.value;

      // Resume execution at the desired location (see delegateYield).
      context.next = delegate.nextLoc;

      // If context.method was "throw" but the delegate handled the
      // exception, let the outer generator proceed normally. If
      // context.method was "next", forget context.arg since it has been
      // "consumed" by the delegate iterator. If context.method was
      // "return", allow the original .return call to continue in the
      // outer generator.
      if (context.method !== "return") {
        context.method = "next";
        context.arg = undefined;
      }

    } else {
      // Re-yield the result returned by the delegate method.
      return info;
    }

    // The delegate iterator is finished, so forget it and continue with
    // the outer generator.
    context.delegate = null;
    return ContinueSentinel;
  }

  // Define Generator.prototype.{next,throw,return} in terms of the
  // unified ._invoke helper method.
  defineIteratorMethods(Gp);

  define(Gp, toStringTagSymbol, "Generator");

  // A Generator should always return itself as the iterator object when the
  // @@iterator function is called on it. Some browsers' implementations of the
  // iterator prototype chain incorrectly implement this, causing the Generator
  // object to not be returned from this call. This ensures that doesn't happen.
  // See https://github.com/facebook/regenerator/issues/274 for more details.
  Gp[iteratorSymbol] = function() {
    return this;
  };

  Gp.toString = function() {
    return "[object Generator]";
  };

  function pushTryEntry(locs) {
    var entry = { tryLoc: locs[0] };

    if (1 in locs) {
      entry.catchLoc = locs[1];
    }

    if (2 in locs) {
      entry.finallyLoc = locs[2];
      entry.afterLoc = locs[3];
    }

    this.tryEntries.push(entry);
  }

  function resetTryEntry(entry) {
    var record = entry.completion || {};
    record.type = "normal";
    delete record.arg;
    entry.completion = record;
  }

  function Context(tryLocsList) {
    // The root entry object (effectively a try statement without a catch
    // or a finally block) gives us a place to store values thrown from
    // locations where there is no enclosing try statement.
    this.tryEntries = [{ tryLoc: "root" }];
    tryLocsList.forEach(pushTryEntry, this);
    this.reset(true);
  }

  exports.keys = function(object) {
    var keys = [];
    for (var key in object) {
      keys.push(key);
    }
    keys.reverse();

    // Rather than returning an object with a next method, we keep
    // things simple and return the next function itself.
    return function next() {
      while (keys.length) {
        var key = keys.pop();
        if (key in object) {
          next.value = key;
          next.done = false;
          return next;
        }
      }

      // To avoid creating an additional object, we just hang the .value
      // and .done properties off the next function object itself. This
      // also ensures that the minifier will not anonymize the function.
      next.done = true;
      return next;
    };
  };

  function values(iterable) {
    if (iterable) {
      var iteratorMethod = iterable[iteratorSymbol];
      if (iteratorMethod) {
        return iteratorMethod.call(iterable);
      }

      if (typeof iterable.next === "function") {
        return iterable;
      }

      if (!isNaN(iterable.length)) {
        var i = -1, next = function next() {
          while (++i < iterable.length) {
            if (hasOwn.call(iterable, i)) {
              next.value = iterable[i];
              next.done = false;
              return next;
            }
          }

          next.value = undefined;
          next.done = true;

          return next;
        };

        return next.next = next;
      }
    }

    // Return an iterator with no values.
    return { next: doneResult };
  }
  exports.values = values;

  function doneResult() {
    return { value: undefined, done: true };
  }

  Context.prototype = {
    constructor: Context,

    reset: function(skipTempReset) {
      this.prev = 0;
      this.next = 0;
      // Resetting context._sent for legacy support of Babel's
      // function.sent implementation.
      this.sent = this._sent = undefined;
      this.done = false;
      this.delegate = null;

      this.method = "next";
      this.arg = undefined;

      this.tryEntries.forEach(resetTryEntry);

      if (!skipTempReset) {
        for (var name in this) {
          // Not sure about the optimal order of these conditions:
          if (name.charAt(0) === "t" &&
              hasOwn.call(this, name) &&
              !isNaN(+name.slice(1))) {
            this[name] = undefined;
          }
        }
      }
    },

    stop: function() {
      this.done = true;

      var rootEntry = this.tryEntries[0];
      var rootRecord = rootEntry.completion;
      if (rootRecord.type === "throw") {
        throw rootRecord.arg;
      }

      return this.rval;
    },

    dispatchException: function(exception) {
      if (this.done) {
        throw exception;
      }

      var context = this;
      function handle(loc, caught) {
        record.type = "throw";
        record.arg = exception;
        context.next = loc;

        if (caught) {
          // If the dispatched exception was caught by a catch block,
          // then let that catch block handle the exception normally.
          context.method = "next";
          context.arg = undefined;
        }

        return !! caught;
      }

      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        var record = entry.completion;

        if (entry.tryLoc === "root") {
          // Exception thrown outside of any try block that could handle
          // it, so set the completion value of the entire function to
          // throw the exception.
          return handle("end");
        }

        if (entry.tryLoc <= this.prev) {
          var hasCatch = hasOwn.call(entry, "catchLoc");
          var hasFinally = hasOwn.call(entry, "finallyLoc");

          if (hasCatch && hasFinally) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            } else if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else if (hasCatch) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            }

          } else if (hasFinally) {
            if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else {
            throw new Error("try statement without catch or finally");
          }
        }
      }
    },

    abrupt: function(type, arg) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc <= this.prev &&
            hasOwn.call(entry, "finallyLoc") &&
            this.prev < entry.finallyLoc) {
          var finallyEntry = entry;
          break;
        }
      }

      if (finallyEntry &&
          (type === "break" ||
           type === "continue") &&
          finallyEntry.tryLoc <= arg &&
          arg <= finallyEntry.finallyLoc) {
        // Ignore the finally entry if control is not jumping to a
        // location outside the try/catch block.
        finallyEntry = null;
      }

      var record = finallyEntry ? finallyEntry.completion : {};
      record.type = type;
      record.arg = arg;

      if (finallyEntry) {
        this.method = "next";
        this.next = finallyEntry.finallyLoc;
        return ContinueSentinel;
      }

      return this.complete(record);
    },

    complete: function(record, afterLoc) {
      if (record.type === "throw") {
        throw record.arg;
      }

      if (record.type === "break" ||
          record.type === "continue") {
        this.next = record.arg;
      } else if (record.type === "return") {
        this.rval = this.arg = record.arg;
        this.method = "return";
        this.next = "end";
      } else if (record.type === "normal" && afterLoc) {
        this.next = afterLoc;
      }

      return ContinueSentinel;
    },

    finish: function(finallyLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.finallyLoc === finallyLoc) {
          this.complete(entry.completion, entry.afterLoc);
          resetTryEntry(entry);
          return ContinueSentinel;
        }
      }
    },

    "catch": function(tryLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc === tryLoc) {
          var record = entry.completion;
          if (record.type === "throw") {
            var thrown = record.arg;
            resetTryEntry(entry);
          }
          return thrown;
        }
      }

      // The context.catch method must only be called with a location
      // argument that corresponds to a known catch block.
      throw new Error("illegal catch attempt");
    },

    delegateYield: function(iterable, resultName, nextLoc) {
      this.delegate = {
        iterator: values(iterable),
        resultName: resultName,
        nextLoc: nextLoc
      };

      if (this.method === "next") {
        // Deliberately forget the last sent value so that we don't
        // accidentally pass it on to the delegate.
        this.arg = undefined;
      }

      return ContinueSentinel;
    }
  };

  // Regardless of whether this script is executing as a CommonJS module
  // or not, return the runtime object so that we can declare the variable
  // regeneratorRuntime in the outer scope, which allows this module to be
  // injected easily by `bin/regenerator --include-runtime script.js`.
  return exports;

}(
  // If this script is executing as a CommonJS module, use module.exports
  // as the regeneratorRuntime namespace. Otherwise create a new empty
  // object. Either way, the resulting object will be used to initialize
  // the regeneratorRuntime variable at the top of this file.
  typeof module === "object" ? module.exports : {}
));

try {
  regeneratorRuntime = runtime;
} catch (accidentalStrictMode) {
  // This module should not be running in strict mode, so the above
  // assignment should always work unless something is misconfigured. Just
  // in case runtime.js accidentally runs in strict mode, we can escape
  // strict mode using a global Function call. This could conceivably fail
  // if a Content Security Policy forbids using Function, but in that case
  // the proper solution is to fix the accidental strict mode problem. If
  // you've misconfigured your bundler to force strict mode and applied a
  // CSP to forbid Function, and you're not willing to fix either of those
  // problems, please detail your unique predicament in a GitHub issue.
  Function("r", "regeneratorRuntime = r")(runtime);
}

},{}],"utils/mydash/get.js":[function(require,module,exports) {
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
  if (!str) {
    return defaultValue;
  }

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
},{}],"utils/mydash/isEmpty.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isEmpty = isEmpty;

function isEmpty(value) {
  if (value == 0) {
    return true;
  } // 0 ""


  if (typeof value === 'number') {
    return true;
  } // Number


  if (value === null) {
    return true;
  } // null


  if (typeof value === 'boolean') {
    return true;
  } // boolean


  if (typeof value === 'undefined') {
    return true;
  } // undefined


  if (Array.isArray(value) && value.length === 0) {
    return true;
  } // []


  if (value.size !== undefined && value.size > 0) {
    return false;
  } // Set Map


  if (Object.keys(value).length === 0 || value.size === 0) {
    return true;
  } // {}


  if (typeof value === 'string') {
    return false;
  } // Number


  return false;
}
},{}],"utils/mydash/compare.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.compare = compare;

var _isEmpty = require("./isEmpty");

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

    case '&&':
      return post && value;

    case '||':
      return post || value;

    case '!!':
      return !post;

    case null:
    case undefined:
      return post;

    default:
      return false;
  }
}
},{"./isEmpty":"utils/mydash/isEmpty.js"}],"utils/mydash/isUndefined.js":[function(require,module,exports) {
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

var _get = require("/utils/mydash/get");

var _compare = require("/utils/mydash/compare");

var _isUndefined = require("/utils/mydash/isUndefined");

var _trimQuotes = require("/utils/mydash/trimQuotes");

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

    _defineProperty(this, "TEMPLATE_REGEXP", /<v\x2Dif(="([\s\S]*?)")>([\s\S]*?)(<v\x2Delse>([\s\S]*?))?<\/v\x2Dif>/gi);

    _defineProperty(this, "COMPARE_REGEXP", /\!?(\w+)((.*?)(\'?!?\w+\'?))?/);

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
      var newTemplate = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      var regExp = this.TEMPLATE_REGEXP; // avoid from infinity loop

      var template = newTemplate !== null && newTemplate !== void 0 ? newTemplate : this._template;
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

        var post = void 0;

        if (postString.charAt(0) !== "!") {
          post = (0, _get.get)(ctx, postString);
        } else {
          post = !(0, _get.get)(ctx, postString.slice(1));
        }

        if ((0, _isUndefined.isUndefined)(post)) {
          result = result.replace(new RegExp(key[0], "gi"), partElse);
          continue;
        }

        var value = void 0;

        if (!(0, _isUndefined.isUndefined)(valueString)) {
          if (valueString.charAt(0) !== "!") {
            value = (0, _get.get)(ctx, valueString);
          } else {
            value = !(0, _get.get)(ctx, valueString.slice(1));
          }
        } else {
          value = valueString;
        }

        post = post === "null" ? null : post;

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

      if (!(0, _isUndefined.isUndefined)(keys[3])) {
        var post = (0, _trimQuotes.trimQuotes)(keys[1]);
        var value = (0, _trimQuotes.trimQuotes)(keys[4]);
        var operator = keys[3].trim();
        return [post, operator, value];
      } else {
        var _post = (0, _trimQuotes.trimQuotes)(str);

        return [_post]; // set a variable only
      }
    }
  }]);

  return TemplatorIf;
}();

exports.TemplatorIf = TemplatorIf;
},{"/utils/mydash/get":"utils/mydash/get.js","/utils/mydash/compare":"utils/mydash/compare.js","/utils/mydash/isUndefined":"utils/mydash/isUndefined.js","/utils/mydash/trimQuotes":"utils/mydash/trimQuotes.js"}],"utils/mydash/getUniqueStr.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getUniqueStr = getUniqueStr;

function getUniqueStr() {
  return Math.random().toString(36).substr(2, 9);
}
},{}],"classes/templators/templator-variables.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TemplatorVariables = void 0;

var _get = require("/utils/mydash/get");

var _getUniqueStr = require("/utils/mydash/getUniqueStr");

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
            var salt = "_" + (0, _getUniqueStr.getUniqueStr)();
            window[templValue + salt] = value;
            template = template.replace(new RegExp(key[0], "gi"), "window.".concat(key[1].trim()).concat(salt, "()"));
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
},{"/utils/mydash/get":"utils/mydash/get.js","/utils/mydash/getUniqueStr":"utils/mydash/getUniqueStr.js"}],"classes/templators/templator-for.js":[function(require,module,exports) {
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
  // TEMPLATE_REGEXP = /<v-for(="\((.*?),\s(.*?)\)\sin\s(.*?)")>(.*?)<v-for-end>/gis;
  function TemplatorFor(template) {
    _classCallCheck(this, TemplatorFor);

    _defineProperty(this, "TEMPLATE_REGEXP", /<v\x2Dfor[\t-\r \xA0\u1680\u2000-\u200A\u2028\u2029\u202F\u205F\u3000\uFEFF]*(:([\s\S]*?)[\t-\r \xA0\u1680\u2000-\u200A\u2028\u2029\u202F\u205F\u3000\uFEFF]*:([\s\S]*?)[\t-\r \xA0\u1680\u2000-\u200A\u2028\u2029\u202F\u205F\u3000\uFEFF]in[\t-\r \xA0\u1680\u2000-\u200A\u2028\u2029\u202F\u205F\u3000\uFEFF]([\s\S]*?))>([\s\S]*?)<\/v\x2Dfor>/gi);

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

        template = template.replace(new RegExp(key[0], "gis"), result);
      };

      while (key = regExp.exec(template)) {
        _loop();
      }

      return template;
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
},{"./templator-if":"classes/templators/templator-if.js","./templator-for":"classes/templators/templator-for.js","./templator-variables":"classes/templators/templator-variables.js"}],"templates/components/leftSidebar/left-sidebar.tmpl.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _default = "\n<!-- Left sidebar -->\n<div class=\"left_sidebar\">\n\n    <!-- Account -->\n    <div class=\"account__wrapper\">\n\n        {{account}}\n\n    </div>\n    <!-- end Account -->\n\n    <!-- Chats wrapper-->\n    <div class=\"chats__wrapper chats_scrollable scroll_style\">\n        <!-- Chats -->\n        <div class=\"chats \">\n\n            <v-for :chat :index in chats>\n            <!-- User -->\n            <div class=\"chats__user\">\n                {{chat}}\n            </div>\n            <!-- end User -->\n            </v-for>\n\n        </div>\n        <!-- end chats -->\n\n        <div class=\"chats__menu\">\n            {{form_search}}\n        </div>\n\n    </div>\n    <!-- end Chats wrapper-->\n</div>\n<!-- end Left sidebar -->\n";
exports.default = _default;
},{}],"../../node_modules/parcel-bundler/src/builtins/bundle-url.js":[function(require,module,exports) {
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
},{}],"../../node_modules/parcel-bundler/src/builtins/css-loader.js":[function(require,module,exports) {
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
},{"./bundle-url":"../../node_modules/parcel-bundler/src/builtins/bundle-url.js"}],"templates/components/leftSidebar/left-sidebar.scss":[function(require,module,exports) {
var reloadCSS = require('_css_loader');

module.hot.dispose(reloadCSS);
module.hot.accept(reloadCSS);
},{"_css_loader":"../../node_modules/parcel-bundler/src/builtins/css-loader.js"}],"templates/elements/avatar/avatar.tmpl.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _default = "\n<img \nsrc=\"{{src}}\"\nalt=\"{{alt}}\"\n\n<v-if=\"id\">\n    id=\"{{id}}\"\n</v-if>\n\n<v-if=\"css\">\n    class=\"{{css}}\"\n</v-if>\nstyle=\"border-color: {{borderColor}}\"\n>";
exports.default = _default;
},{}],"templates/elements/avatar/avatar.scss":[function(require,module,exports) {
var reloadCSS = require('_css_loader');

module.hot.dispose(reloadCSS);
module.hot.accept(reloadCSS);
},{"_css_loader":"../../node_modules/parcel-bundler/src/builtins/css-loader.js"}],"assets/unknown_avatar.png":[function(require,module,exports) {
module.exports = "/unknown_avatar.30af8899.png";
},{}],"utils/mydash/strToColor.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.strToColor = strToColor;

function strToColor(str) {
  return intToRGB(hashCode(str));
}

function hashCode(str) {
  // java String#hashCode
  var hash = 0;

  for (var i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }

  return hash;
}

function intToRGB(i) {
  var c = (i & 0x00FFFFFF).toString(16).toUpperCase();
  return "#" + ("00000".substring(0, 6 - c.length) + c);
}
},{}],"templates/elements/avatar/avatar.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Avatar = void 0;

var _templatorVariables = require("/classes/templators/templator-variables");

var _avatarTmpl = _interopRequireDefault(require("./avatar.tmpl.js"));

require("./avatar.scss");

var _templatorIf = require("/classes/templators/templator-if");

var _unknown_avatar = _interopRequireDefault(require("/assets/unknown_avatar.png"));

var _strToColor = require("/utils/mydash/strToColor");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Avatar = /*#__PURE__*/function () {
  function Avatar(options) {
    var _options$src;

    var salt = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

    _classCallCheck(this, Avatar);

    this._template = _avatarTmpl.default;
    options.src = (_options$src = options.src) !== null && _options$src !== void 0 ? _options$src : _unknown_avatar.default;
    this.options = Object.assign(options, {
      borderColor: (0, _strToColor.strToColor)(options.src + salt)
    });
  }

  _createClass(Avatar, [{
    key: "render",
    value: function render() {
      var context = this.options;
      var templatorIf = new _templatorIf.TemplatorIf(this._template);
      this._template = templatorIf.compile(context);
      var templatorVariables = new _templatorVariables.TemplatorVariables(this._template);
      this._template = templatorVariables.compile(context);
      return this._template;
    }
  }]);

  return Avatar;
}();

exports.Avatar = Avatar;
},{"/classes/templators/templator-variables":"classes/templators/templator-variables.js","./avatar.tmpl.js":"templates/elements/avatar/avatar.tmpl.js","./avatar.scss":"templates/elements/avatar/avatar.scss","/classes/templators/templator-if":"classes/templators/templator-if.js","/assets/unknown_avatar.png":"assets/unknown_avatar.png","/utils/mydash/strToColor":"utils/mydash/strToColor.js"}],"templates/components/chat/chat.tmpl.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _default = "\n<div class=\"user__wrapper {{css}} \n<v-if=\"is_current\">\nuser__active\n</v-if>\"\n<v-if=\"onclick && !is_current\">\nonclick=\"{{onclick}}\"\n</v-if>\"\n\n    >\n    {{avatar}}\n    <div class=\"user__info\">\n        <span class=\"user__displayname\">{{display_name}}</span>\n        <span class=\"user__last_message\">{{last_message}}</span>\n    </div>\n    <div class=\"user__actions\">\n        <v-if=\"is_account\">\n            {{btn_settings}}\n        <v-else>  \n            <span class=\"last_message_date\">{{last_message_date}}</span>\n            {{counter}}\n        </v-if>\n    </div>\n\n</div>\n";
exports.default = _default;
},{}],"templates/components/chat/chat.scss":[function(require,module,exports) {
var reloadCSS = require('_css_loader');

module.hot.dispose(reloadCSS);
module.hot.accept(reloadCSS);
},{"_css_loader":"../../node_modules/parcel-bundler/src/builtins/css-loader.js"}],"utils/sortMessages.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.sortByTime = sortByTime;

function sortByTime(messages) {
  var sort = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'desc';
  return sort === 'desc' ? messages.sort(function (a, b) {
    return a.time < b.time ? 1 : -1;
  }) : messages.sort(function (a, b) {
    return a.time > b.time ? 1 : -1;
  });
}
},{}],"templates/elements/button/button.tmpl.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _default = "<button\n    <v-if=\"id\">\n        id=\"{{id}}\"\n    </v-if>\n        class=\"button {{css}}\"\n    <v-if=\"type\">\n        type=\"{{type}}\"\n    <v-else>\n        type=\"submit\"\n    </v-if>\n    <v-if=\"onclick\">\n        onclick=\"{{onclick}}\"\n    </v-if>\n>{{title}}</button>";
exports.default = _default;
},{}],"templates/elements/button/button.scss":[function(require,module,exports) {
var reloadCSS = require('_css_loader');

module.hot.dispose(reloadCSS);
module.hot.accept(reloadCSS);
},{"_css_loader":"../../node_modules/parcel-bundler/src/builtins/css-loader.js"}],"templates/elements/button/button.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ButtonCustom = void 0;

var _templatorIf = require("/classes/templators/templator-if");

var _templatorVariables = require("/classes/templators/templator-variables");

var _buttonTmpl = _interopRequireDefault(require("./button.tmpl.js"));

require("./button.scss");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var ButtonCustom = /*#__PURE__*/function () {
  function ButtonCustom(options) {
    _classCallCheck(this, ButtonCustom);

    this._template = _buttonTmpl.default;
    this.options = options;
  }

  _createClass(ButtonCustom, [{
    key: "render",
    value: function render() {
      var context = this.options;
      var templatorIf = new _templatorIf.TemplatorIf(this._template);
      this._template = templatorIf.compile(context);
      var templatorVariables = new _templatorVariables.TemplatorVariables(this._template);
      this._template = templatorVariables.compile(context);
      return this._template;
    }
  }]);

  return ButtonCustom;
}();

exports.ButtonCustom = ButtonCustom;
},{"/classes/templators/templator-if":"classes/templators/templator-if.js","/classes/templators/templator-variables":"classes/templators/templator-variables.js","./button.tmpl.js":"templates/elements/button/button.tmpl.js","./button.scss":"templates/elements/button/button.scss"}],"templates/elements/counter/counter.tmpl.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _default = "\n<span class=\"counter {{css}}\n<v-if=\"!value\">\n    is_null\n</v-if>\n\">{{value}}</span>\n";
exports.default = _default;
},{}],"templates/elements/counter/counter.scss":[function(require,module,exports) {
var reloadCSS = require('_css_loader');

module.hot.dispose(reloadCSS);
module.hot.accept(reloadCSS);
},{"_css_loader":"../../node_modules/parcel-bundler/src/builtins/css-loader.js"}],"templates/elements/counter/counter.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Counter = void 0;

var _templatorVariables = require("/classes/templators/templator-variables");

var _templatorIf = require("/classes/templators/templator-if");

var _counterTmpl = _interopRequireDefault(require("./counter.tmpl.js"));

require("./counter.scss");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Counter = /*#__PURE__*/function () {
  function Counter(options) {
    _classCallCheck(this, Counter);

    this._template = _counterTmpl.default;
    this.options = options;
  }

  _createClass(Counter, [{
    key: "render",
    value: function render() {
      var context = this.options;
      var templatorIf = new _templatorIf.TemplatorIf(this._template);
      this._template = templatorIf.compile(context);
      var templatorVariables = new _templatorVariables.TemplatorVariables(this._template);
      this._template = templatorVariables.compile(context);
      return this._template;
    }
  }]);

  return Counter;
}();

exports.Counter = Counter;
},{"/classes/templators/templator-variables":"classes/templators/templator-variables.js","/classes/templators/templator-if":"classes/templators/templator-if.js","./counter.tmpl.js":"templates/elements/counter/counter.tmpl.js","./counter.scss":"templates/elements/counter/counter.scss"}],"templates/components/chat/chat.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Chat = void 0;

var _templator = require("/classes/templators/templator");

var _avatar = require("/templates/elements/avatar/avatar");

var _chatTmpl = _interopRequireDefault(require("./chat.tmpl.js"));

require("./chat.scss");

var _sortMessages = require("/utils/sortMessages");

var _button = require("../../elements/button/button.js");

var _counter = require("/templates/elements/counter/counter");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Chat = /*#__PURE__*/function () {
  function Chat(user) {
    var isCurrent = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
    var isAccount = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

    _classCallCheck(this, Chat);

    this.template = _chatTmpl.default;
    this.isAccount = isAccount;
    this.user = user;
    this.isCurrent = isCurrent;
  }

  _createClass(Chat, [{
    key: "render",
    value: function render() {
      var advanced_options = this.isAccount ? this._getAccountContext() : this._getUserContext();
      var context = Object.assign(advanced_options, {
        display_name: this.user.display_name,
        avatar: new _avatar.Avatar({
          css: "user__avatar",
          src: this.user.avatar
        }, this.user.login).render()
      });
      var tepmlator = new _templator.Templator(this.template);
      return tepmlator.compile(context);
    }
  }, {
    key: "_getAccountContext",
    value: function _getAccountContext() {
      return {
        is_account: true,
        css: "account__user",
        btn_settings: new _button.ButtonCustom({
          css: "button button__user_settings",
          title: '<i class="fas fa-ellipsis-v"></i>',
          onclick: function onclick() {
            document.location.href = '/account/';
          }
        }).render()
      };
    }
  }, {
    key: "_getUserContext",
    value: function _getUserContext() {
      var _this = this;

      var sortedMessages = this.user.data ? (0, _sortMessages.sortByTime)(this.user.data.messages) : [];
      var lastMessage = sortedMessages ? sortedMessages[0] : null;
      var lastMessageContent = '';
      var lastMessageDate = '';

      if (lastMessage) {
        lastMessageContent = lastMessage.content;
        lastMessageDate = new Date(+lastMessage.time).toLocaleDateString();
      }

      return {
        css: "",
        is_account: false,
        is_current: this.isCurrent,
        last_message: lastMessageContent,
        last_message_date: lastMessageDate,
        counter: new _counter.Counter({
          css: "unread_messages_counter",
          value: sortedMessages.filter(function (m) {
            return m.unread;
          }).length
        }).render(),
        onclick: function onclick() {
          document.location.href = "/?user=".concat(_this.user.login);
        }
      };
    }
  }, {
    key: "_onclick",
    value: function _onclick() {
      document.location.href = "/?user=".concat(this.user.login);
    }
  }]);

  return Chat;
}();

exports.Chat = Chat;
},{"/classes/templators/templator":"classes/templators/templator.js","/templates/elements/avatar/avatar":"templates/elements/avatar/avatar.js","./chat.tmpl.js":"templates/components/chat/chat.tmpl.js","./chat.scss":"templates/components/chat/chat.scss","/utils/sortMessages":"utils/sortMessages.js","../../elements/button/button.js":"templates/elements/button/button.js","/templates/elements/counter/counter":"templates/elements/counter/counter.js"}],"templates/components/form-chat-search/form-chat-search.tmpl.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _default = "\n<form class=\"form {{css}}\" \n    <v-if=\"action\">    \n        action=\"{{action}}\"\n    </v-if>\n    <v-if=\"method\">    \n        method=\"{{method}}\"\n    </v-if>\n    <v-if=\"onsubmit\">    \n        onsubmit=\"{{prevent_action}}{{onsubmit}}\"\n    </v-if>\n>\n    {{content}}\n</form>\n";
exports.default = _default;
},{}],"templates/components/form-chat-search/form-chat-search.scss":[function(require,module,exports) {
var reloadCSS = require('_css_loader');

module.hot.dispose(reloadCSS);
module.hot.accept(reloadCSS);
},{"_css_loader":"../../node_modules/parcel-bundler/src/builtins/css-loader.js"}],"templates/elements/input/input.tmpl.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _default = "<input \n    <v-if=\"id\">\n        id=\"{{id}}\"\n    </v-if>\n        class=\"input {{css}}\"\n    <v-if=\"type\">\n        type=\"{{type}}\"\n    <v-else>\n        type=\"text\"\n    </v-if>\n    <v-if=\"name\">\n        name=\"{{name}}\"\n    </v-if>\n        value=\"{{value}}\"\n    <v-if=\"placeholder\">\n        placeholder=\"{{placeholder}}\"\n    </v-if>\n    \n/>\n";
exports.default = _default;
},{}],"templates/elements/input/input.scss":[function(require,module,exports) {
var reloadCSS = require('_css_loader');

module.hot.dispose(reloadCSS);
module.hot.accept(reloadCSS);
},{"_css_loader":"../../node_modules/parcel-bundler/src/builtins/css-loader.js"}],"templates/elements/input/input.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.InputCustom = void 0;

var _templatorVariables = require("/classes/templators/templator-variables");

var _templatorIf = require("/classes/templators/templator-if");

var _inputTmpl = _interopRequireDefault(require("./input.tmpl.js"));

require("./input.scss");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var InputCustom = /*#__PURE__*/function () {
  function InputCustom(options) {
    _classCallCheck(this, InputCustom);

    this._template = _inputTmpl.default;
    this.options = options;
  }

  _createClass(InputCustom, [{
    key: "render",
    value: function render() {
      var context = this.options;
      var templatorIf = new _templatorIf.TemplatorIf(this._template);
      this._template = templatorIf.compile(context);
      var templatorVariables = new _templatorVariables.TemplatorVariables(this._template);
      this._template = templatorVariables.compile(context);
      return this._template;
    }
  }]);

  return InputCustom;
}();

exports.InputCustom = InputCustom;
},{"/classes/templators/templator-variables":"classes/templators/templator-variables.js","/classes/templators/templator-if":"classes/templators/templator-if.js","./input.tmpl.js":"templates/elements/input/input.tmpl.js","./input.scss":"templates/elements/input/input.scss"}],"templates/components/form-chat-search/form-chat-search.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FormChatSearch = void 0;

var _templator = require("/classes/templators/templator");

var _formChatSearchTmpl = _interopRequireDefault(require("./form-chat-search.tmpl.js"));

require("./form-chat-search.scss");

var _input = require("/templates/elements/input/input");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var FormChatSearch = /*#__PURE__*/function () {
  function FormChatSearch() {
    _classCallCheck(this, FormChatSearch);

    this.template = _formChatSearchTmpl.default;
    this.css = "search__wrapper";
  }

  _createClass(FormChatSearch, [{
    key: "render",
    value: function render() {
      var context = {
        css: this.css,
        onsubmit: this._onsubmit.bind(this),
        prevent_action: "event.preventDefault();",
        content: new _input.InputCustom({
          css: "input input__search_chats",
          name: "search",
          value: "",
          placeholder: "Search"
        }).render()
      };
      var tepmlator = new _templator.Templator(this.template);
      return tepmlator.compile(context);
    }
  }, {
    key: "_onsubmit",
    value: function _onsubmit() {
      var form = document.getElementsByClassName(this.css)[0];
      var formData = new FormData(form);
      var data = formData.getData();
      console.log('Send form data:', data);
    }
  }]);

  return FormChatSearch;
}();

exports.FormChatSearch = FormChatSearch;
},{"/classes/templators/templator":"classes/templators/templator.js","./form-chat-search.tmpl.js":"templates/components/form-chat-search/form-chat-search.tmpl.js","./form-chat-search.scss":"templates/components/form-chat-search/form-chat-search.scss","/templates/elements/input/input":"templates/elements/input/input.js"}],"templates/components/leftSidebar/left-sidebar.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LeftSidebar = void 0;

var _templator = require("/classes/templators/templator");

var _leftSidebarTmpl = _interopRequireDefault(require("./left-sidebar.tmpl.js"));

require("./left-sidebar.scss");

var _chat = require("../chat/chat.js");

var _formChatSearch = require("../form-chat-search/form-chat-search.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var LeftSidebar = /*#__PURE__*/function () {
  function LeftSidebar(account, users) {
    var current_user = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;

    _classCallCheck(this, LeftSidebar);

    this.template = _leftSidebarTmpl.default;
    this.account = account;
    this.users = users;
    this.current_user = current_user;
  }

  _createClass(LeftSidebar, [{
    key: "render",
    value: function render() {
      var _this = this;

      var chats = this.users.map(function (user) {
        return new _chat.Chat(user, _this.current_user === user.login).render();
      });
      var context = {
        account: new _chat.Chat(this.account, false, true).render(),
        chats: chats,
        current_user: this.users[2].login,
        form_search: new _formChatSearch.FormChatSearch().render()
      };
      var tepmlator = new _templator.Templator(this.template);
      return tepmlator.compile(context);
    }
  }]);

  return LeftSidebar;
}();

exports.LeftSidebar = LeftSidebar;
},{"/classes/templators/templator":"classes/templators/templator.js","./left-sidebar.tmpl.js":"templates/components/leftSidebar/left-sidebar.tmpl.js","./left-sidebar.scss":"templates/components/leftSidebar/left-sidebar.scss","../chat/chat.js":"templates/components/chat/chat.js","../form-chat-search/form-chat-search.js":"templates/components/form-chat-search/form-chat-search.js"}],"templates/components/main-container/main-container.tmpl.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _default = "\n<!-- Main -->\n        <div class=\"main\">\n            <v-if=\"current_user\">\n            <v-else>\n                <div class=\"chat_placeholder\">\n                <h3>\n                Select a friend to type with...\n                </h3>\n                </div>\n            </v-if>\n            <!-- messager__wrapper -->\n            <div class=\"messager__wrapper messager_scrollable scroll_style\">\n                <v-for :block :index in blocks>\n                    {{block}}\n                </v-for>\n            </div>\n            <!-- end messager__wrapper -->\n\n            <!-- messager form -->\n            <div class=\"messager__menu\">\n                {{form_send_message}}\n            </div>\n            <!-- end form -->\n        </div>\n        <!-- end main -->\n";
exports.default = _default;
},{}],"templates/components/main-container/main-container.scss":[function(require,module,exports) {
var reloadCSS = require('_css_loader');

module.hot.dispose(reloadCSS);
module.hot.accept(reloadCSS);
},{"_css_loader":"../../node_modules/parcel-bundler/src/builtins/css-loader.js"}],"templates/components/form-send-message/form-send-message.tmpl.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _default = "\n<form class=\"form {{css}}\" \n    <v-if=\"action\">    \n        action=\"{{action}}\"\n    </v-if>\n    <v-if=\"method\">    \n        method=\"{{method}}\"\n    </v-if>\n    <v-if=\"onsubmit\">    \n        onsubmit=\"{{prevent_action}}{{onsubmit}}\"\n    </v-if>\n>\n    <div class=\"input__wrapper\">\n       {{content}}\n    </div>\n</form>\n";
exports.default = _default;
},{}],"templates/components/form-send-message/form-send-message.scss":[function(require,module,exports) {
var reloadCSS = require('_css_loader');

module.hot.dispose(reloadCSS);
module.hot.accept(reloadCSS);
},{"_css_loader":"../../node_modules/parcel-bundler/src/builtins/css-loader.js"}],"templates/components/form-send-message/form-send-message.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FormSendMessage = void 0;

var _templator = require("/classes/templators/templator");

var _formSendMessageTmpl = _interopRequireDefault(require("./form-send-message.tmpl.js"));

require("./form-send-message.scss");

var _input = require("/templates/elements/input/input");

var _button = require("/templates/elements/button/button");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var FormSendMessage = /*#__PURE__*/function () {
  function FormSendMessage() {
    _classCallCheck(this, FormSendMessage);

    this.template = _formSendMessageTmpl.default;
    this.css = "messager__form";
  }

  _createClass(FormSendMessage, [{
    key: "render",
    value: function render() {
      var context = {
        css: this.css,
        onsubmit: this._onsubmit.bind(this),
        prevent_action: "event.preventDefault();",
        content: [new _button.ButtonCustom({
          css: "button__attach",
          type: "button",
          title: "<i class=\"fas fa-paperclip fa-2x\"></i>",
          onclick: this._attach
        }).render(), new _input.InputCustom({
          css: "hidden",
          name: "attachment",
          value: ""
        }).render(), new _input.InputCustom({
          css: "input__message",
          name: "message",
          value: "",
          placeholder: "Type a new message ..."
        }).render(), new _button.ButtonCustom({
          css: "button__submit",
          title: "Send"
        }).render()].join('')
      };
      var tepmlator = new _templator.Templator(this.template);
      return tepmlator.compile(context);
    }
  }, {
    key: "_onsubmit",
    value: function _onsubmit() {
      var form = document.getElementsByClassName(this.css)[0];
      var formData = new FormData(form);
      var data = formData.getData();
      console.log('Search form data:', data);
    }
  }, {
    key: "_attach",
    value: function _attach() {
      console.log('Yeah! This attaches something...');
    }
  }]);

  return FormSendMessage;
}();

exports.FormSendMessage = FormSendMessage;
},{"/classes/templators/templator":"classes/templators/templator.js","./form-send-message.tmpl.js":"templates/components/form-send-message/form-send-message.tmpl.js","./form-send-message.scss":"templates/components/form-send-message/form-send-message.scss","/templates/elements/input/input":"templates/elements/input/input.js","/templates/elements/button/button":"templates/elements/button/button.js"}],"templates/components/block-user-messages/block-user-messages.tmpl.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _default = "\n\n<div class=\"block block__message \n<v-if=\"is_foreign\">\n    block_foreign\"\n<v-else>\n    block_own\"\n</v-if>\n>\n    <div class=\"block__username\">\n        <span class=\"user__displayname\">{{user.display_name}}</span>\n    </div>\n\n    <div class=\"block__user_messages\">\n        {{avatar}}\n        <div class=\"block__messages\">\n\n            <v-for :message :index in messages>\n                <div class=\"message__wrapper\">\n                    <div class=\"message__content\">\n                        <span class=\"message_text\">{{message.content}}</span>\n                    </div>\n                    <span class=\"message__time\">{{message.time}}</span>\n                </div>\n            </v-for>\n\n        </div>\n    </div>\n</div>\n\n";
exports.default = _default;
},{}],"templates/components/block-user-messages/block-user-messages.scss":[function(require,module,exports) {
var reloadCSS = require('_css_loader');

module.hot.dispose(reloadCSS);
module.hot.accept(reloadCSS);
},{"_css_loader":"../../node_modules/parcel-bundler/src/builtins/css-loader.js"}],"templates/components/block-user-messages/block-user-messages.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BlockUserMessages = void 0;

var _templator = require("/classes/templators/templator");

var _blockUserMessagesTmpl = _interopRequireDefault(require("./block-user-messages.tmpl.js"));

require("./block-user-messages.scss");

var _avatar = require("/templates/elements/avatar/avatar");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var BlockUserMessages = /*#__PURE__*/function () {
  function BlockUserMessages(user, isForeign) {
    _classCallCheck(this, BlockUserMessages);

    this.template = _blockUserMessagesTmpl.default;
    this.user = user;
    this.isForeign = isForeign;
    this.messages = [];
  }

  _createClass(BlockUserMessages, [{
    key: "render",
    value: function render() {
      var context = {
        user: this.user,
        is_foreign: this.isForeign,
        messages: this.messages.map(mapMessageTime),
        avatar: new _avatar.Avatar({
          css: "user__avatar",
          src: this.user.avatar
        }, this.user.login).render()
      };
      var tepmlator = new _templator.Templator(this.template);
      return tepmlator.compile(context);
    }
  }, {
    key: "_addMessage",
    value: function _addMessage(message) {
      this.messages.push(message);
    }
  }]);

  return BlockUserMessages;
}();

exports.BlockUserMessages = BlockUserMessages;

var mapMessageTime = function mapMessageTime(message) {
  message.time = new Date(+message.time).getTimeFormatted();
  return message;
};
},{"/classes/templators/templator":"classes/templators/templator.js","./block-user-messages.tmpl.js":"templates/components/block-user-messages/block-user-messages.tmpl.js","./block-user-messages.scss":"templates/components/block-user-messages/block-user-messages.scss","/templates/elements/avatar/avatar":"templates/elements/avatar/avatar.js"}],"templates/components/block-date/block-date.tmpl.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _default = "<div class=\"block block__date\">\n    <span class=\"date__title\">{{content}}</span>\n</div>";
exports.default = _default;
},{}],"templates/components/block-date/block-date.scss":[function(require,module,exports) {
var reloadCSS = require('_css_loader');

module.hot.dispose(reloadCSS);
module.hot.accept(reloadCSS);
},{"_css_loader":"../../node_modules/parcel-bundler/src/builtins/css-loader.js"}],"templates/components/block-date/block-date.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BlockDate = void 0;

var _templatorVariables = require("/classes/templators/templator-variables");

var _blockDateTmpl = _interopRequireDefault(require("./block-date.tmpl.js"));

require("./block-date.scss");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var BlockDate = /*#__PURE__*/function () {
  function BlockDate(content) {
    _classCallCheck(this, BlockDate);

    this.template = _blockDateTmpl.default;
    this.content = content;
  }

  _createClass(BlockDate, [{
    key: "render",
    value: function render() {
      var context = {
        content: this.content
      };
      var tepmlator = new _templatorVariables.TemplatorVariables(this.template);
      return tepmlator.compile(context);
    }
  }]);

  return BlockDate;
}();

exports.BlockDate = BlockDate;
},{"/classes/templators/templator-variables":"classes/templators/templator-variables.js","./block-date.tmpl.js":"templates/components/block-date/block-date.tmpl.js","./block-date.scss":"templates/components/block-date/block-date.scss"}],"templates/components/main-container/main-container.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MainContainer = void 0;

var _templator = require("/classes/templators/templator");

var _mainContainerTmpl = _interopRequireDefault(require("./main-container.tmpl.js"));

require("./main-container.scss");

var _formSendMessage = require("../form-send-message/form-send-message.js");

var _sortMessages = require("/utils/sortMessages");

var _isUndefined = require("/utils/mydash/isUndefined");

var _blockUserMessages = require("/templates/components/block-user-messages/block-user-messages");

var _blockDate = require("/templates/components/block-date/block-date");

var _isEmpty = require("/utils/mydash/isEmpty");

var _get = require("/utils/mydash/get");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var MainContainer = /*#__PURE__*/function () {
  function MainContainer(data) {
    _classCallCheck(this, MainContainer);

    this.template = _mainContainerTmpl.default;
    this.account = data.account;
    this.chat = data.chat;
    this.current_user = data.current_user;

    if (this.current_user && !(0, _isEmpty.isEmpty)(this.chat.data.messages)) {
      var messages = (0, _sortMessages.sortByTime)(this.chat.data.messages, 'asc');
      this.blocks = _toConsumableArray(this._buildBlocksHistory(messages));
    } else {
      this.blocks = [];
    }
  }

  _createClass(MainContainer, [{
    key: "render",
    value: function render() {
      var context = {
        form_send_message: new _formSendMessage.FormSendMessage().render(),
        blocks: this.blocks.map(function (block) {
          return block.render();
        }),
        current_user: this.current_user
      };
      var tepmlator = new _templator.Templator(this.template);
      return tepmlator.compile(context);
    }
  }, {
    key: "_buildBlocksHistory",
    value: /*#__PURE__*/regeneratorRuntime.mark(function _buildBlocksHistory(messages) {
      var i, block, _block, message, dateTime;

      return regeneratorRuntime.wrap(function _buildBlocksHistory$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              i = 0;
              block = null;

            case 2:
              if (!(i < messages.length)) {
                _context.next = 23;
                break;
              }

              message = messages[i]; // check date - may be create BlockDate - 

              if (!((0, _isUndefined.isUndefined)(messages[i - 1]) || new Date(+message.time).toLocaleDateString() !== new Date(+messages[i - 1].time).toLocaleDateString())) {
                _context.next = 11;
                break;
              }

              dateTime = new Date(+message.time);
              _context.next = 8;
              return new _blockDate.BlockDate(dateTime.toLocaleDateString());

            case 8:
              block = this._createBlockUserMessages(message.user);
              _context.next = 11;
              return block;

            case 11:
              // create new block
              block = (_block = block) !== null && _block !== void 0 ? _block : this._createBlockUserMessages(message.user);

              if (!(message.user === block.user.login)) {
                _context.next = 16;
                break;
              }

              // add message to list
              block._addMessage(message);

              _context.next = 20;
              break;

            case 16:
              _context.next = 18;
              return block;

            case 18:
              block = this._createBlockUserMessages(message.user);

              block._addMessage(message);

            case 20:
              i++;
              _context.next = 2;
              break;

            case 23:
            case "end":
              return _context.stop();
          }
        }
      }, _buildBlocksHistory, this);
    })
  }, {
    key: "_createBlockUserMessages",
    value: function _createBlockUserMessages(login) {
      var isForeign = login !== this.account.login;
      var user = isForeign ? this.chat : this.account;
      return new _blockUserMessages.BlockUserMessages(user, isForeign);
    }
  }]);

  return MainContainer;
}();

exports.MainContainer = MainContainer;
},{"/classes/templators/templator":"classes/templators/templator.js","./main-container.tmpl.js":"templates/components/main-container/main-container.tmpl.js","./main-container.scss":"templates/components/main-container/main-container.scss","../form-send-message/form-send-message.js":"templates/components/form-send-message/form-send-message.js","/utils/sortMessages":"utils/sortMessages.js","/utils/mydash/isUndefined":"utils/mydash/isUndefined.js","/templates/components/block-user-messages/block-user-messages":"templates/components/block-user-messages/block-user-messages.js","/templates/components/block-date/block-date":"templates/components/block-date/block-date.js","/utils/mydash/isEmpty":"utils/mydash/isEmpty.js","/utils/mydash/get":"utils/mydash/get.js"}],"models/modelAccount.json":[function(require,module,exports) {
module.exports = {
  "login": "clowndesbrough0",
  "email": "clowndesbrough0@huffingtonpost.com",
  "first_name": "Cristine",
  "last_name": "Lowndesbrough",
  "display_name": "Cristine Lowndesbrough",
  "avatar": "https://robohash.org/remporroassumenda.bmp?size=200x200&set=set1",
  "password": "123"
};
},{}],"models/modelChats.json":[function(require,module,exports) {
module.exports = [{
  "login": "fdrew1",
  "email": "fdrew1@rediff.com",
  "first_name": "Filbert",
  "last_name": "Drew",
  "display_name": "Filbert Drew",
  "avatar": "https://robohash.org/illoadipisciconsequuntur.png?size=200x200&set=set1",
  "data": {
    "messages": [{
      "time": "1602739018000",
      "user": "clowndesbrough0",
      "type": "attachment",
      "unread": true,
      "content": "Vestibulum ac est lacinia nisi venenatis tristique."
    }, {
      "time": "1602738018000",
      "user": "clowndesbrough0",
      "type": "text",
      "unread": true,
      "content": "Duis 12312 aliquam convallis nunc. Proin at turpis a pede posuere nonummy. Integer non velit.\n\nDonec diam neque, vestibulum eget, vulputate ut, ultrices vel, augue. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec pharetra, magna vestibulum aliquet ultrices, erat tortor sollicitudin mi, sit amet lobortis sapien sapien non mi. Integer ac neque.\n\nDuis bibendum. Morbi non quam nec dui luctus rutrum. Nulla tellus."
    }, {
      "time": "1589645716000",
      "user": "fdrew1",
      "type": "attachment",
      "unread": true,
      "content": "Lorem ipsum dolor sit amet"
    }, {
      "time": "1589645516000",
      "user": "fdrew1",
      "type": "text",
      "unread": true,
      "content": "Aenean lectus. Pellentesque eget nunc. Donec quis orci eget orci vehicula condimentum."
    }, {
      "time": "1612915287000",
      "user": "fdrew1",
      "type": "text",
      "unread": true,
      "content": "In sagittis dui vel nisl. Duis ac nibh. Fusce lacus purus, aliquet at, feugiat non, pretium quis, lectus.\n\nSuspendisse potenti. In eleifend quam a odio. In hac habitasse platea dictumst."
    }, {
      "time": "1612830848000",
      "user": "clowndesbrough0",
      "type": "text",
      "unread": true,
      "content": "Aliquam quis turpis eget elit sodales scelerisque. Mauris sit amet eros. Suspendisse accumsan tortor quis turpis.\n\nSed ante. Vivamus tortor. Duis mattis egestas metus.\n\nAenean fermentum. Donec ut mauris eget massa tempor convallis. Nulla neque libero, convallis eget, eleifend luctus, ultricies eu, nibh."
    }, {
      "time": "1604957051000",
      "user": "clowndesbrough0",
      "type": "text",
      "unread": true,
      "content": "Morbi porttitor lorem id ligula. Suspendisse ornare consequat lectus. In est risus, auctor sed, tristique in, tempus sit amet, sem.\n\nFusce consequat. Nulla nisl. Nunc nisl."
    }]
  }
}, {
  "login": "cpalethorpe2",
  "email": "cpalethorpe2@smugmug.com",
  "first_name": "Corrianne",
  "last_name": "Palethorpe",
  "display_name": "Corrianne Palethorpe",
  "avatar": "https://robohash.org/quiaautemaperiam.png?size=200x200&set=set1",
  "data": {
    "messages": []
  }
}, {
  "login": "bcrolla3",
  "email": "bcrolla3@moonfruit.com",
  "first_name": "Bria",
  "last_name": "Crolla",
  "display_name": "Bria Crolla",
  "avatar": "https://robohash.org/pariaturconsequaturet.png?size=200x200&set=set1",
  "data": {
    "messages": [{
      "time": "1614123945000",
      "user": "bcrolla3",
      "type": "text",
      "unread": true,
      "content": "Morbi porttitor lorem id ligula. Suspendisse ornare consequat lectus. In est risus, auctor sed, tristique in, tempus sit amet, sem."
    }, {
      "time": "1602105749000",
      "user": "clowndesbrough0",
      "type": "text",
      "unread": true,
      "content": "Morbi non lectus. Aliquam sit amet diam in magna bibendum imperdiet. Nullam orci pede, venenatis non, sodales sed, tincidunt eu, felis.\n\nFusce posuere felis sed lacus. Morbi sem mauris, laoreet ut, rhoncus aliquet, pulvinar sed, nisl. Nunc rhoncus dui vel sem."
    }, {
      "time": "1603503462000",
      "user": "bcrolla3",
      "type": "text",
      "unread": true,
      "content": "Pellentesque at nulla. Suspendisse potenti. Cras in purus eu magna vulputate luctus.\n\nCum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Vivamus vestibulum sagittis sapien. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus."
    }, {
      "time": "1603695841000",
      "user": "clowndesbrough0",
      "type": "text",
      "unread": true,
      "content": "Duis consequat dui nec nisi volutpat eleifend. Donec ut dolor. Morbi vel lectus in quam fringilla rhoncus.\n\nMauris enim leo, rhoncus sed, vestibulum sit amet, cursus id, turpis. Integer aliquet, massa id lobortis convallis, tortor risus dapibus augue, vel accumsan tellus nisi eu orci. Mauris lacinia sapien quis libero.\n\nNullam sit amet turpis elementum ligula vehicula consequat. Morbi a ipsum. Integer a nibh."
    }, {
      "time": "1595097949000",
      "user": "clowndesbrough0",
      "type": "text",
      "unread": true,
      "content": "Duis 12312weraliquam convallis nunc. Proin at turpis a pede posuere nonummy. Integer non velit."
    }]
  }
}, {
  "login": "rkinneir4",
  "email": "rkinneir4@senate.gov",
  "first_name": "Rab",
  "last_name": "Kinneir",
  "display_name": "Rab Kinneir",
  "avatar": "https://robohash.org/adipisciveniamcorrupti.bmp?size=200x200&set=set1",
  "data": {
    "messages": [{
      "time": "1591482725000",
      "user": "rkinneir4",
      "type": "text",
      "unread": true,
      "content": "Maecenas leo odio, condimentum id, luctus nec, molestie sed, justo. Pellentesque viverra pede ac diam. Cras pellentesque volutpat dui.\n\nMaecenas tristique, est et tempus semper, est quam pharetra magna, ac consequat metus sapien ut nunc. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Mauris viverra diam vitae quam. Suspendisse potenti.\n\nNullam porttitor lacus at turpis. Donec posuere metus vitae ipsum. Aliquam non mauris."
    }, {
      "time": "1609273964000",
      "user": "rkinneir4",
      "type": "text",
      "unread": true,
      "content": "Aenean lectus. Pellentesque eget nunc. Donec quis orci eget orci vehicula condimentum.\n\nCurabitur in libero ut massa volutpat convallis. Morbi odio odio, elementum eu, interdum eu, tincidunt in, leo. Maecenas pulvinar lobortis est.\n\nPhasellus sit amet erat. Nulla tempus. Vivamus in felis eu sapien cursus vestibulum."
    }, {
      "time": "1605268746000",
      "user": "rkinneir4",
      "type": "text",
      "unread": true,
      "content": "Maecenas leo odio, condimentum id, luctus nec, molestie sed, justo. Pellentesque viverra pede ac diam. Cras pellentesque volutpat dui.\n\nMaecenas tristique, est et tempus semper, est quam pharetra magna, ac consequat metus sapien ut nunc. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Mauris viverra diam vitae quam. Suspendisse potenti."
    }, {
      "time": "1591456091000",
      "user": "clowndesbrough0",
      "type": "text",
      "unread": true,
      "content": "Quisque porta volutpat erat. Quisque erat eros, viverra eget, congue eget, semper rutrum, nulla. Nunc purus.\n\nPhasellus in felis. Donec semper sapien a libero. Nam dui."
    }, {
      "time": "1612039798000",
      "user": "rkinneir4",
      "type": "text",
      "unread": true,
      "content": "Nam ultrices, libero non mattis pulvinar, nulla pede ullamcorper augue, a suscipit nulla elit ac nulla. Sed vel enim sit amet nunc viverra dapibus. Nulla suscipit ligula in lacus.\n\nCurabitur at ipsum ac tellus semper interdum. Mauris ullamcorper purus sit amet nulla. Quisque arcu libero, rutrum ac, lobortis vel, dapibus at, diam."
    }]
  }
}, {
  "login": "jragsdale5",
  "email": "jragsdale5@ihg.com",
  "first_name": "Juan",
  "last_name": "Ragsdale",
  "display_name": "Juan Ragsdale",
  "avatar": "https://robohash.org/doloribusestreprehenderit.jpg?size=200x200&set=set1",
  "data": {
    "messages": [{
      "time": "1610074391000",
      "user": "clowndesbrough0",
      "type": "text",
      "unread": true,
      "content": "Morbi non lectus. Aliquam sit amet diam in magna bibendum imperdiet. Nullam orci pede, venenatis non, sodales sed, tincidunt eu, felis.\n\nFusce posuere felis sed lacus. Morbi sem mauris, laoreet ut, rhoncus aliquet, pulvinar sed, nisl. Nunc rhoncus dui vel sem."
    }, {
      "time": "1612151460000",
      "user": "jragsdale5",
      "type": "text",
      "unread": true,
      "content": "Duis bibendum. Morbi non quam nec dui luctus rutrum. Nulla tellus.\n\nIn sagittis dui vel nisl. Duis ac nibh. Fusce lacus purus, aliquet at, feugiat non, pretium quis, lectus.\n\nSuspendisse potenti. In eleifend quam a odio. In hac habitasse platea dictumst."
    }, {
      "time": "1614646631000",
      "user": "jragsdale5",
      "type": "text",
      "unread": true,
      "content": "Suspendisse potenti. In eleifend quam a odio. In hac habitasse platea dictumst.\n\nMaecenas ut massa quis augue luctus tincidunt. Nulla mollis molestie lorem. Quisque ut erat.\n\nCurabitur gravida nisi at nibh. In hac habitasse platea dictumst. Aliquam augue quam, sollicitudin vitae, consectetuer eget, rutrum at, lorem."
    }, {
      "time": "1588225939000",
      "user": "jragsdale5",
      "type": "text",
      "unread": true,
      "content": "In hac habitasse platea dictumst. Etiam faucibus cursus urna. Ut tellus.\n\nNulla ut erat id mauris vulputate elementum. Nullam varius. Nulla facilisi.\n\nCras non velit nec nisi vulputate nonummy. Maecenas tincidunt lacus at velit. Vivamus vel nulla eget eros elementum pellentesque."
    }, {
      "time": "1611961216000",
      "user": "jragsdale5",
      "type": "attachment",
      "unread": true,
      "content": "Cras mi pede, malesuada in, imperdiet et, commodo vulputate, justo. In blandit ultrices enim. Lorem ipsum dolor sit amet, consectetuer adipiscing elit.\n\nProin interdum mauris non ligula pellentesque ultrices. Phasellus id sapien in sapien iaculis congue. Vivamus metus arcu, adipiscing molestie, hendrerit at, vulputate vitae, nisl.\n\nAenean lectus. Pellentesque eget nunc. Donec quis orci eget orci vehicula condimentum."
    }]
  }
}, {
  "login": "rrobotham6",
  "email": "rrobotham6@slate.com",
  "first_name": "Robb",
  "last_name": "Robotham",
  "display_name": "Robb Robotham",
  "avatar": "https://robohash.org/voluptatemvelquo.jpg?size=200x200&set=set1",
  "data": {
    "messages": [{
      "time": "1594667008000",
      "user": "rrobotham6",
      "type": "text",
      "unread": true,
      "content": "Pellentesque at nulla. Suspendisse potenti. Cras in purus eu magna vulputate luctus."
    }, {
      "time": "1610759907000",
      "user": "rrobotham6",
      "type": "text",
      "unread": true,
      "content": "Vestibulum ac est lacinia nisi venenatis tristique. Fusce congue, diam id ornare imperdiet, sapien urna pretium nisl, ut volutpat sapien arcu sed augue. Aliquam erat volutpat.\n\nIn congue. Etiam justo. Etiam pretium iaculis justo.\n\nIn hac habitasse platea dictumst. Etiam faucibus cursus urna. Ut tellus."
    }, {
      "time": "1588645489000",
      "user": "clowndesbrough0",
      "type": "attachment",
      "unread": true,
      "content": "Etiam vel augue. Vestibulum rutrum rutrum neque. Aenean auctor gravida sem."
    }, {
      "time": "1593533042000",
      "user": "clowndesbrough0",
      "type": "text",
      "unread": true,
      "content": "In hac habitasse platea dictumst. Morbi vestibulum, velit id pretium iaculis, diam erat fermentum justo, nec condimentum neque sapien placerat ante. Nulla justo.\n\nAliquam quis turpis eget elit sodales scelerisque. Mauris sit amet eros. Suspendisse accumsan tortor quis turpis."
    }, {
      "time": "1601566104000",
      "user": "rrobotham6",
      "type": "attachment",
      "unread": true,
      "content": "Integer ac leo. Pellentesque ultrices mattis odio. Donec vitae nisi."
    }]
  }
}, {
  "login": "dnaerup7",
  "email": "dnaerup7@ehow.com",
  "first_name": "Dane",
  "last_name": "Naerup",
  "display_name": "Dane Naerup",
  "avatar": "https://robohash.org/rerumquiaeaque.png?size=200x200&set=set1",
  "data": {
    "messages": [{
      "time": "1597207471000",
      "user": "clowndesbrough0",
      "type": "attachment",
      "unread": true,
      "content": "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Proin risus. Praesent lectus.\n\nVestibulum quam sapien, varius ut, blandit non, interdum in, ante. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Duis faucibus accumsan odio. Curabitur convallis."
    }, {
      "time": "1589714142000",
      "user": "clowndesbrough0",
      "type": "text",
      "unread": true,
      "content": "Pellentesque at nulla. Suspendisse potenti. Cras in purus eu magna vulputate luctus.\n\nCum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Vivamus vestibulum sagittis sapien. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.\n\nEtiam vel augue. Vestibulum rutrum rutrum neque. Aenean auctor gravida sem."
    }, {
      "time": "1603510933000",
      "user": "dnaerup7",
      "type": "text",
      "unread": true,
      "content": "Mauris enim leo, rhoncus sed, vestibulum sit amet, cursus id, turpis. Integer aliquet, massa id lobortis convallis, tortor risus dapibus augue, vel accumsan tellus nisi eu orci. Mauris lacinia sapien quis libero."
    }, {
      "time": "1603390112000",
      "user": "clowndesbrough0",
      "type": "text",
      "unread": true,
      "content": "Cras non velit nec nisi vulputate nonummy. Maecenas tincidunt lacus at velit. Vivamus vel nulla eget eros elementum pellentesque.\n\nQuisque porta volutpat erat. Quisque erat eros, viverra eget, congue eget, semper rutrum, nulla. Nunc purus.\n\nPhasellus in felis. Donec semper sapien a libero. Nam dui."
    }, {
      "time": "1616196419000",
      "user": "dnaerup7",
      "type": "text",
      "unread": true,
      "content": "Morbi porttitor lorem id ligula. Suspendisse ornare consequat lectus. In est risus, auctor sed, tristique in, tempus sit amet, sem."
    }]
  }
}, {
  "login": "malflatt8",
  "email": "malflatt8@yandex.ru",
  "first_name": "Maje",
  "last_name": "Alflatt",
  "display_name": "Maje Alflatt",
  "avatar": "https://robohash.org/aspernaturveroomnis.jpg?size=200x200&set=set1",
  "data": {
    "messages": [{
      "time": "1616048889000",
      "user": "clowndesbrough0",
      "type": "text",
      "unread": true,
      "content": "Integer tincidunt ante vel ipsum. Praesent blandit lacinia erat. Vestibulum sed magna at nunc commodo placerat.\n\nPraesent blandit. Nam nulla. Integer pede justo, lacinia eget, tincidunt eget, tempus vel, pede."
    }, {
      "time": "1609247676000",
      "user": "clowndesbrough0",
      "type": "text",
      "unread": true,
      "content": "In sagittis dui vel nisl. Duis ac nibh. Fusce lacus purus, aliquet at, feugiat non, pretium quis, lectus.\n\nSuspendisse potenti. In eleifend quam a odio. In hac habitasse platea dictumst."
    }, {
      "time": "1587874647000",
      "user": "malflatt8",
      "type": "text",
      "unread": true,
      "content": "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Proin risus. Praesent lectus.\n\nVestibulum quam sapien, varius ut, blandit non, interdum in, ante. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Duis faucibus accumsan odio. Curabitur convallis."
    }, {
      "time": "1615939427000",
      "user": "clowndesbrough0",
      "type": "text",
      "unread": true,
      "content": "In quis justo. Maecenas rhoncus aliquam lacus. Morbi quis tortor id nulla ultrices aliquet.\n\nMaecenas leo odio, condimentum id, luctus nec, molestie sed, justo. Pellentesque viverra pede ac diam. Cras pellentesque volutpat dui.\n\nMaecenas tristique, est et tempus semper, est quam pharetra magna, ac consequat metus sapien ut nunc. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Mauris viverra diam vitae quam. Suspendisse potenti."
    }, {
      "time": "1596690874000",
      "user": "clowndesbrough0",
      "type": "text",
      "unread": true,
      "content": "Mauris enim leo, rhoncus sed, vestibulum sit amet, cursus id, turpis. Integer aliquet, massa id lobortis convallis, tortor risus dapibus augue, vel accumsan tellus nisi eu orci. Mauris lacinia sapien quis libero.\n\nNullam sit amet turpis elementum ligula vehicula consequat. Morbi a ipsum. Integer a nibh.\n\nIn quis justo. Maecenas rhoncus aliquam lacus. Morbi quis tortor id nulla ultrices aliquet."
    }]
  }
}, {
  "login": "strowler9",
  "email": "strowler9@stumbleupon.com",
  "first_name": "Silvester",
  "last_name": "Trowler",
  "display_name": "Silvester Trowler",
  "avatar": "https://robohash.org/utexplicaboquaerat.bmp?size=200x200&set=set1",
  "data": {
    "messages": [{
      "time": "1595648492000",
      "user": "strowler9",
      "type": "text",
      "unread": true,
      "content": "Mauris enim leo, rhoncus sed, vestibulum sit amet, cursus id, turpis. Integer aliquet, massa id lobortis convallis, tortor risus dapibus augue, vel accumsan tellus nisi eu orci. Mauris lacinia sapien quis libero.\n\nNullam sit amet turpis elementum ligula vehicula consequat. Morbi a ipsum. Integer a nibh.\n\nIn quis justo. Maecenas rhoncus aliquam lacus. Morbi quis tortor id nulla ultrices aliquet."
    }, {
      "time": "1612237730000",
      "user": "clowndesbrough0",
      "type": "text",
      "unread": true,
      "content": "Curabitur gravida nisi at nibh. In hac habitasse platea dictumst. Aliquam augue quam, sollicitudin vitae, consectetuer eget, rutrum at, lorem.\n\nInteger tincidunt ante vel ipsum. Praesent blandit lacinia erat. Vestibulum sed magna at nunc commodo placerat.\n\nPraesent blandit. Nam nulla. Integer pede justo, lacinia eget, tincidunt eget, tempus vel, pede."
    }, {
      "time": "1584891821000",
      "user": "clowndesbrough0",
      "type": "text",
      "unread": true,
      "content": "Donec diam neque, vestibulum eget, vulputate ut, ultrices vel, augue. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec pharetra, magna vestibulum aliquet ultrices, erat tortor sollicitudin mi, sit amet lobortis sapien sapien non mi. Integer ac neque.\n\nDuis bibendum. Morbi non quam nec dui luctus rutrum. Nulla tellus.\n\nIn sagittis dui vel nisl. Duis ac nibh. Fusce lacus purus, aliquet at, feugiat non, pretium quis, lectus."
    }, {
      "time": "1608831556000",
      "user": "strowler9",
      "type": "text",
      "unread": true,
      "content": "Praesent blandit. Nam nulla. Integer pede justo, lacinia eget, tincidunt eget, tempus vel, pede.\n\nMorbi porttitor lorem id ligula. Suspendisse ornare consequat lectus. In est risus, auctor sed, tristique in, tempus sit amet, sem.\n\nFusce consequat. Nulla nisl. Nunc nisl."
    }, {
      "time": "1596503767000",
      "user": "strowler9",
      "type": "text",
      "unread": true,
      "content": "Integer ac leo. Pellentesque ultrices mattis odio. Donec vitae nisi.\n\nNam ultrices, libero non mattis pulvinar, nulla pede ullamcorper augue, a suscipit nulla elit ac nulla. Sed vel enim sit amet nunc viverra dapibus. Nulla suscipit ligula in lacus.\n\nCurabitur at ipsum ac tellus semper interdum. Mauris ullamcorper purus sit amet nulla. Quisque arcu libero, rutrum ac, lobortis vel, dapibus at, diam."
    }]
  }
}, {
  "login": "dfg789",
  "email": "dfg789@stumbleupon.com",
  "first_name": "Steve",
  "last_name": "Tailer",
  "display_name": "Steve Tailer",
  "avatar": "https://robohash.org/aspernaturveroomnis.bmp?size=200x200&set=set1",
  "data": {
    "messages": [{
      "time": "1595648492000",
      "user": "dfg789",
      "type": "text",
      "unread": true,
      "content": "Mauris enim leo, rhoncus sed, vestibulum sit amet, cursus id, turpis. Integer aliquet, massa id lobortis convallis, tortor risus dapibus augue, vel accumsan tellus nisi eu orci. Mauris lacinia sapien quis libero.\n\nNullam sit amet turpis elementum ligula vehicula consequat. Morbi a ipsum. Integer a nibh.\n\nIn quis justo. Maecenas rhoncus aliquam lacus. Morbi quis tortor id nulla ultrices aliquet."
    }, {
      "time": "1612237730000",
      "user": "clowndesbrough0",
      "type": "text",
      "unread": true,
      "content": "Curabitur gravida nisi at nibh. In hac habitasse platea dictumst. Aliquam augue quam, sollicitudin vitae, consectetuer eget, rutrum at, lorem.\n\nInteger tincidunt ante vel ipsum. Praesent blandit lacinia erat. Vestibulum sed magna at nunc commodo placerat.\n\nPraesent blandit. Nam nulla. Integer pede justo, lacinia eget, tincidunt eget, tempus vel, pede."
    }, {
      "time": "1584891821000",
      "user": "clowndesbrough0",
      "type": "text",
      "unread": true,
      "content": "Donec diam neque, vestibulum eget, vulputate ut, ultrices vel, augue. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec pharetra, magna vestibulum aliquet ultrices, erat tortor sollicitudin mi, sit amet lobortis sapien sapien non mi. Integer ac neque.\n\nDuis bibendum. Morbi non quam nec dui luctus rutrum. Nulla tellus.\n\nIn sagittis dui vel nisl. Duis ac nibh. Fusce lacus purus, aliquet at, feugiat non, pretium quis, lectus."
    }, {
      "time": "1608831556000",
      "user": "dfg789",
      "type": "text",
      "unread": true,
      "content": "Praesent blandit. Nam nulla. Integer pede justo, lacinia eget, tincidunt eget, tempus vel, pede.\n\nMorbi porttitor lorem id ligula. Suspendisse ornare consequat lectus. In est risus, auctor sed, tristique in, tempus sit amet, sem.\n\nFusce consequat. Nulla nisl. Nunc nisl."
    }, {
      "time": "1596503767000",
      "user": "dfg789",
      "type": "text",
      "unread": true,
      "content": "Integer ac leo. Pellentesque ultrices mattis odio. Donec vitae nisi.\n\nNam ultrices, libero non mattis pulvinar, nulla pede ullamcorper augue, a suscipit nulla elit ac nulla. Sed vel enim sit amet nunc viverra dapibus. Nulla suscipit ligula in lacus.\n\nCurabitur at ipsum ac tellus semper interdum. Mauris ullamcorper purus sit amet nulla. Quisque arcu libero, rutrum ac, lobortis vel, dapibus at, diam."
    }]
  }
}];
},{}],"utils/mydash/getUrl.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getUrlParameter = getUrlParameter;

function getUrlParameter(key) {
  var url = new URL(location.href);
  return url.searchParams.get(key);
}
},{}],"classes/app.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.App = void 0;

var _leftSidebar = require("/templates/components/leftSidebar/left-sidebar");

var _mainContainer = require("/templates/components/main-container/main-container");

var _modelAccount = _interopRequireDefault(require("/models/modelAccount.json"));

var _modelChats = _interopRequireDefault(require("/models/modelChats.json"));

var _getUrl = require("/utils/mydash/getUrl");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var App = /*#__PURE__*/function () {
  function App(selector) {
    _classCallCheck(this, App);

    this.$el = document.querySelector(selector);
  }

  _createClass(App, [{
    key: "init",
    value: function init() {
      this.render();
    }
  }, {
    key: "render",
    value: function render() {
      this.$el.innerHtml = '';

      var account = this._getAccount();

      var chats = this._getChats();

      var current_user = this.__getCurrentUser();

      var leftSidebar = new _leftSidebar.LeftSidebar(account, chats, current_user);

      var data = this._getData(current_user);

      var main = new _mainContainer.MainContainer(data); // const user = {};
      // const rightSidebar = new RightSidebar(user);

      this.$el.innerHtml = '';
      this.$el.insertAdjacentHTML('beforeend', leftSidebar.render());
      this.$el.insertAdjacentHTML('beforeend', main.render()); // this.$el.insertAdjacentHTML('beforeend', rightSidebar.render());
    }
  }, {
    key: "_getChats",
    value: function _getChats() {
      return _modelChats.default;
    }
  }, {
    key: "_getAccount",
    value: function _getAccount() {
      return _modelAccount.default;
    }
    /**
     * Return an object with account and current chat
     * 
     * @param {String} current_user
     * @returns {Object}
     */

  }, {
    key: "_getData",
    value: function _getData() {
      var current_user = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
      var chat = current_user ? this._getChats().filter(function (chat) {
        return chat.login === current_user;
      })[0] : null;

      var account = this._getAccount();

      return Object.assign({}, {
        chat: chat
      }, {
        account: account
      }, {
        current_user: current_user
      });
    }
  }, {
    key: "__getCurrentUser",
    value: function __getCurrentUser() {
      var userlogin = (0, _getUrl.getUrlParameter)('user');

      if (!userlogin) {
        return null;
      }

      var user = this._getChats().filter(function (u) {
        return u.login === userlogin;
      }).first();

      return user ? user.login : null;
    }
  }]);

  return App;
}();

exports.App = App;
},{"/templates/components/leftSidebar/left-sidebar":"templates/components/leftSidebar/left-sidebar.js","/templates/components/main-container/main-container":"templates/components/main-container/main-container.js","/models/modelAccount.json":"models/modelAccount.json","/models/modelChats.json":"models/modelChats.json","/utils/mydash/getUrl":"utils/mydash/getUrl.js"}],"utils/mydash/first.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.first = first;

function first(list) {
  if (!Array.isArray(list) || list.length === 0) return undefined;
  return list[0];
}
},{}],"utils/mydash/last.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.last = last;

function last(list) {
  if (!Array.isArray(list) || list.length === 0) return undefined;
  return list[list.length - 1];
}
},{}],"utils/prototypes.custom.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _first = require("/utils/mydash/first");

var _last = require("/utils/mydash/last");

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

var _default = function () {
  FormData.prototype.getData = function () {
    return _toConsumableArray(this.entries()).reduce(function (obj, pair) {
      return Object.assign(obj, _defineProperty({}, pair[0], pair[1]));
    }, {});
  };

  Date.prototype.getTimeFormatted = function () {
    var hh = ("0" + this.getHours()).slice(-2);
    var mm = ("0" + this.getMinutes()).slice(-2);
    return "".concat(hh, ":").concat(mm);
  };

  Array.prototype.first = function () {
    return (0, _first.first)(this);
  };

  Array.prototype.last = function () {
    return (0, _last.last)(this);
  };
}();

exports.default = _default;
},{"/utils/mydash/first":"utils/mydash/first.js","/utils/mydash/last":"utils/mydash/last.js"}],"../../node_modules/@fortawesome/fontawesome-free/css/all.min.css":[function(require,module,exports) {
var reloadCSS = require('_css_loader');

module.hot.dispose(reloadCSS);
module.hot.accept(reloadCSS);
},{"./../webfonts/fa-brands-400.eot":[["fa-brands-400.fdfe395a.eot","../../node_modules/@fortawesome/fontawesome-free/webfonts/fa-brands-400.eot"],"../../node_modules/@fortawesome/fontawesome-free/webfonts/fa-brands-400.eot"],"./../webfonts/fa-brands-400.woff2":[["fa-brands-400.d8fd1f09.woff2","../../node_modules/@fortawesome/fontawesome-free/webfonts/fa-brands-400.woff2"],"../../node_modules/@fortawesome/fontawesome-free/webfonts/fa-brands-400.woff2"],"./../webfonts/fa-brands-400.woff":[["fa-brands-400.83e55726.woff","../../node_modules/@fortawesome/fontawesome-free/webfonts/fa-brands-400.woff"],"../../node_modules/@fortawesome/fontawesome-free/webfonts/fa-brands-400.woff"],"./../webfonts/fa-brands-400.ttf":[["fa-brands-400.b28b6f6e.ttf","../../node_modules/@fortawesome/fontawesome-free/webfonts/fa-brands-400.ttf"],"../../node_modules/@fortawesome/fontawesome-free/webfonts/fa-brands-400.ttf"],"./../webfonts/fa-brands-400.svg":[["fa-brands-400.2cc1c9e1.svg","../../node_modules/@fortawesome/fontawesome-free/webfonts/fa-brands-400.svg"],"../../node_modules/@fortawesome/fontawesome-free/webfonts/fa-brands-400.svg"],"./../webfonts/fa-regular-400.eot":[["fa-regular-400.169b078d.eot","../../node_modules/@fortawesome/fontawesome-free/webfonts/fa-regular-400.eot"],"../../node_modules/@fortawesome/fontawesome-free/webfonts/fa-regular-400.eot"],"./../webfonts/fa-regular-400.woff2":[["fa-regular-400.57fa45d8.woff2","../../node_modules/@fortawesome/fontawesome-free/webfonts/fa-regular-400.woff2"],"../../node_modules/@fortawesome/fontawesome-free/webfonts/fa-regular-400.woff2"],"./../webfonts/fa-regular-400.woff":[["fa-regular-400.838ff4ef.woff","../../node_modules/@fortawesome/fontawesome-free/webfonts/fa-regular-400.woff"],"../../node_modules/@fortawesome/fontawesome-free/webfonts/fa-regular-400.woff"],"./../webfonts/fa-regular-400.ttf":[["fa-regular-400.e21dec3b.ttf","../../node_modules/@fortawesome/fontawesome-free/webfonts/fa-regular-400.ttf"],"../../node_modules/@fortawesome/fontawesome-free/webfonts/fa-regular-400.ttf"],"./../webfonts/fa-regular-400.svg":[["fa-regular-400.6d37bf45.svg","../../node_modules/@fortawesome/fontawesome-free/webfonts/fa-regular-400.svg"],"../../node_modules/@fortawesome/fontawesome-free/webfonts/fa-regular-400.svg"],"./../webfonts/fa-solid-900.eot":[["fa-solid-900.2419300f.eot","../../node_modules/@fortawesome/fontawesome-free/webfonts/fa-solid-900.eot"],"../../node_modules/@fortawesome/fontawesome-free/webfonts/fa-solid-900.eot"],"./../webfonts/fa-solid-900.woff2":[["fa-solid-900.2d1e16b4.woff2","../../node_modules/@fortawesome/fontawesome-free/webfonts/fa-solid-900.woff2"],"../../node_modules/@fortawesome/fontawesome-free/webfonts/fa-solid-900.woff2"],"./../webfonts/fa-solid-900.woff":[["fa-solid-900.4e803835.woff","../../node_modules/@fortawesome/fontawesome-free/webfonts/fa-solid-900.woff"],"../../node_modules/@fortawesome/fontawesome-free/webfonts/fa-solid-900.woff"],"./../webfonts/fa-solid-900.ttf":[["fa-solid-900.b73c1002.ttf","../../node_modules/@fortawesome/fontawesome-free/webfonts/fa-solid-900.ttf"],"../../node_modules/@fortawesome/fontawesome-free/webfonts/fa-solid-900.ttf"],"./../webfonts/fa-solid-900.svg":[["fa-solid-900.1f78f563.svg","../../node_modules/@fortawesome/fontawesome-free/webfonts/fa-solid-900.svg"],"../../node_modules/@fortawesome/fontawesome-free/webfonts/fa-solid-900.svg"],"_css_loader":"../../node_modules/parcel-bundler/src/builtins/css-loader.js"}],"styles/styles.scss":[function(require,module,exports) {
var reloadCSS = require('_css_loader');

module.hot.dispose(reloadCSS);
module.hot.accept(reloadCSS);
},{"@fortawesome/fontawesome-free/css/all.min.css":"../../node_modules/@fortawesome/fontawesome-free/css/all.min.css","_css_loader":"../../node_modules/parcel-bundler/src/builtins/css-loader.js"}],"index.js":[function(require,module,exports) {
"use strict";

require("regenerator-runtime/runtime");

var _app = require("./classes/app");

require("/utils/prototypes.custom");

require("./styles/styles.scss");

var app = new _app.App('#app');
app.init();
},{"regenerator-runtime/runtime":"../../node_modules/regenerator-runtime/runtime.js","./classes/app":"classes/app.js","/utils/prototypes.custom":"utils/prototypes.custom.js","./styles/styles.scss":"styles/styles.scss"}],"../../node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
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
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "34841" + '/');

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
},{}]},{},["../../node_modules/parcel-bundler/src/builtins/hmr-runtime.js","index.js"], null)
//# sourceMappingURL=/src.e31bb0bc.js.map