(function () {

  var global = global || this || self || window;
  var nx = global.nx || require('next-js-core2');
  var NxStore = nx.Store || require('next-store');
  var NxDomEvent = nx.dom.Event || require('next-dom-event');

  var NxUrlStore = nx.declare('nx.UrlStore', {
    properties: {
      session: {
        get: function () {
          return this.getter('session');
        },
        set: function (inValue) {
          this.setter('session', inValue);
        }
      },
      local: {
        get: function () {
          return this.getter('local');
        },
        set: function (inValue) {
          this.setter('local', inValue);
        }
      }
    },
    methods: {
      init: function (inUniqKey) {
        this._uniqKey = inUniqKey;
        this._url = location.href;
        this.sync();
        this.attachEvents();
      },
      attachEvents: function () {
        var sync = this.sync.bind(this);
        this._hashEventRes = NxDomEvent.on(global, 'hashchange', sync);
        this._popEventRes = NxDomEvent.on(global, 'popstate', sync);
      },
      getter: function (inEngine) {
        var stored = NxStore[inEngine];
        var cached = stored[this._uniqKey] || {};
        return cached[this._url] || {};
      },
      setter: function (inEngine, inValue) {
        var oldValue = this.getter(inEngine);
        var value = nx.mix(oldValue, inValue);
        var stored = NxStore[inEngine];
        var cache = stored [this._uniqKey] || {};
        var result = {};
        cache [this._url] = value;
        result[this._uniqKey] = cache;
        NxStore[inEngine] = result;
      },
      sync: function () {
        this._url = location.href;
      },
      clear: function (inEngine) {
        var stored = NxStore[inEngine];
        var cache = stored [this._uniqKey] || {};
        var result = {};
        if( cache ){
          cache [this._url] = null;
          result[this._uniqKey] = cache;
          NxStore[inEngine] = result;
        }
      },
      clears: function () {
        var stored = NxStore[inEngine];
        var result = {};
        result[this._uniqKey] = null;
        NxStore[inEngine] = result;
      },
      destroy: function () {
        this._hashEventRes.destroy();
        this._popEventRes.destroy();
        this._uniqKey = null;
        this._url = null;
      }
    }
  });


  if (typeof module !== 'undefined' && module.exports) {
    module.exports = NxUrlStore;
  }

}());
