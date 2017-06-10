(function () {

  var global = global || this;

  var nx = global.nx || require('next-js-core2');
  var NxStore = nx.Store || require('next-store');
  
  var UrlStore = nx.declare('nx.UrlStore', {
    properties:{
      session: {
        get: function(){
          return this.getter('session');
        },
        set: function(inValue){
          this.setter('session',inValue);
        }
      },
      local: {
        get: function(){
          return this.getter('local');
        },
        set: function(inValue){
          this.setter('local',inValue);
        }
      }
    },
    methods:{
      init: function(inUniqKey){
        this._uniqKey = inUniqKey;
        this._url = location.href;
        this.attachEvents();
      },
      attachEvents: function(){
        var self = this;
        window.onhashchange = window.onpopstate = function(){
          self._url = location.href;
        };
      },
      getter: function(inEngine){
        var stored = NxStore[inEngine];
        var cached = stored[ this._uniqKey ] || {};
        return cached[ this._url ] || {};
      },
      setter: function(inEngine,inValue){
        var oldValue = this.getter(inEngine);
        var value = nx.mix( oldValue, inValue );
        var stored = NxStore[ inEngine ];
        var cache = stored [ this._uniqKey ] || {};
        var result = {};
        cache [ this._url ] = value;
        result[ this._uniqKey ] = cache;
        NxStore[ inEngine ] = result;
      }
    }
  });


  if (typeof module !== 'undefined' && module.exports) {
    module.exports = UrlStore;
  }

}());
