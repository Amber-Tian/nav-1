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
})({"epB2":[function(require,module,exports) {
var x = localStorage.getItem('x');
var xObject = JSON.parse(x);
var data = xObject || ['https://baidu.com', 'https://www.acfun.cn', 'https://www.bilibili.com', 'https://developer.mozilla.org', 'https://www.runoob.com', 'https://www.w3school.com.cn/', 'https://www.caniuse.com/', 'https://jquery.com/', 'https://cn.vuejs.org/', 'https://reactjs.org/'];

var render = function render() {
  $('.siteList').find('li:not(.last)').remove();
  data.forEach(function (node, index) {
    var $li = $("<li>\n            <a href=\"".concat(node, "\">\n                <div class=\"site\">\n                    <div class=\"logo\">\n                        <img src=").concat(node + '/favicon.ico', " onerror=\"this.onerror=null;this.src='http://thumbs.dreamstime.com/t/%E4%BA%92%E8%81%94%E7%BD%91%E3%80%81%E5%9C%B0%E7%90%83%E5%92%8C%E6%B8%B8%E6%A0%87%E7%9A%84%E6%A0%87%E5%BF%97-114656224.jpg'\">\n                    </div>\n                    <div class=\"link\">").concat(node.replace('https://', '').replace(/\/.*/, '').replace('www.', ''), "</div>\n                </div>\n            </a>\n            <div class=\"delete\">\n                <svg class=\"icon\" aria-hidden=\"true\">\n                    <use xlink:href=\"#icon-delete\"></use>\n                </svg>\n            </div>\n        </li>")).insertBefore($('.last'));
    var isTouchDevice = ('ontouchstart' in document.documentElement);

    if (isTouchDevice) {
      //移动端长按删除
      var timeOutEvent = 0;
      $li.on({
        touchstart: function touchstart(e) {
          timeOutEvent = setTimeout(function () {
            timeOutEvent = 0;
            var key = window.confirm('确认删除');

            if (key) {
              data.splice(index, 1);
              render();
            }
          }, 500);
          e.preventDefault();
        },
        touchmove: function touchmove() {
          clearTimeout(timeOutEvent);
          timeOutEvent = 0;
        },
        touchend: function touchend() {
          clearTimeout(timeOutEvent);
          $("li:nth-child(".concat(index + 1, ") a"))[0].click();
          return false;
        }
      });
    } else {
      $li.on({
        mouseover: function mouseover() {
          $("li:nth-child(".concat(index + 1, ") .delete")).css('display', 'block').off('click').on('click', function (e) {
            data.splice(index, 1);
            render();
          });
        },
        mouseout: function mouseout() {
          $("li:nth-child(".concat(index + 1, ") .delete")).css('display', 'none');
        }
      });
    }
  });
};

render();
$('.addButton').on('click', function () {
  var url = window.prompt('请输入要添加的网址');

  if (url) {
    if (url.indexOf('https') !== 0) {
      url = 'https://' + url;
    }

    data.push(url);
    render();
  }
});

window.onbeforeunload = function () {
  var string = JSON.stringify(data);
  localStorage.setItem('x', string);
};
},{}]},{},["epB2"], null)
//# sourceMappingURL=main.8f17bddd.js.map