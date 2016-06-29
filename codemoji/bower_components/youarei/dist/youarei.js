(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    define(factory);
  } else if (typeof exports === 'object') {
    module.exports = factory();
  } else {
    root.YouAreI = factory();
  }
}(this, function () {

  var uri_re = /^(([^:\/?#]+):)?(\/\/([^\/?#]*))?([^?#]*)(\?([^#]*))?(#(.*))?/;
  var auth_re = /^([^\@]+)\@/;
  var port_re = /:(\d+)$/;
  var qp_re = /^([^=]+)(?:=(.*))?$/;
  function toCamel(str) {
    return str.replace(/(\_[a-z])/g, function($1){
      return $1.toUpperCase().replace('_','');
    });
  }

  var is_array = function(object) {
    return '[object Array]' === Object.prototype.toString.call(object); };
    //var ports = { 80: "http", 443: "https" };
    //actually doesn't support URIs yet, only URLs

    function YouAreI(uri){ return this.parse(uri); }

    YouAreI.prototype = {

      parse: function(uri) {
        // From RFC 3986
        var f = uri ? uri.match(uri_re) : [];
        return this.scheme(f[2]||"").authority(f[4]||"").path_set(f[5]||"")
        .fragment(f[9]||"").query_set(f[7]||"");
      },

      clone: function() {
        var copy = this.constructor();
        for (var attr in this) {
          copy[attr] = this[attr];
        }
        return copy;
      },

      gs: function(val,tar, fn) {
        if(val !== undefined) {
          this[tar] = val;
          return this;
        } else {
          return fn ? fn(this[tar]) : this[tar];
        }
      },

      fragment: function(f) {
        return this.gs(f,'_fragment');
      },

      user_info: function(f) {
        return this.gs(f,'_userinfo', function (r) {
          return r === undefined ? r : encodeURI(r);
        } );
      },

      path_set: function(f) {
        this._path_parse(f);
        return this;
      },

      path_basename_set: function(name) {
        if(this._path_trailing_slash) {
          this._path.push(name);
          this._path_trailing_slash = false;
        } else {
          this._path[this._path.length-1] = name;
        }
        return this;
      },

      _path_parse: function(path) {
        path = decodeURIComponent(path||"");
        var spl = path.split('/');

        this._path_leading_slash = false;
        this._path_trailing_slash = false;

        //match leading / trailing slashes, special case if we are root
        if(path.match(/^\//)) {
          this._path_leading_slash = true;
          spl.shift();
        }

        if(spl.length > 1 && path.match(/\/$/)) {
          this._path_trailing_slash = true;
          spl.pop();
        }

        this._path = spl;
        return spl;
      },

      path_to_string: function(opt_path) {
        path = (opt_path || this._path).join("/");
        if (this._path_leading_slash) path = '/' + path;
        if (this._path_trailing_slash) path = path + '/';
        return path;
      },

      path_to_dir: function() {
        var path = this._path;

        if(!this._path_trailing_slash) {
          path.pop();
          //add a trailing slash.
          path.push("");
        }

        return this.path_to_string(path);
      },

      //temporary
      path_parts: function(f) {
        //set path if arguments set
        return this.gs(f, '_path');
      },

      scheme: function(f) {
        return this.gs(f,'_scheme');
      },

      port: function (f) {
        return this.gs(f,'_port');
      },

      host: function (f) {
        return this.gs(f,'_host');
      },

      protocol: function () {
        return this.scheme.toLowerCase();
      },

      authority: function(authority) {
        var auth, port, userinfo;
        if(authority !== undefined) {
          this._authority = authority;
          if(auth = authority.match(auth_re)) {
            authority = authority.replace(auth_re, '');
            this.user_info(auth[1]);
          }
          //Port
          if(port = authority.match(port_re)) {
            authority = authority.replace(port_re, "");
            this.port(port[1]);
          }
          this.host(authority);
          return this;
        } else {
          authority = "";
          if (userinfo = this.user_info()) {
            authority = userinfo + "@";
          }
          authority += this.host();
          if (port = this.port()) { authority += ":" + port; }
          return authority;
        }
      },

      to_string: function() {
        var q = this.query_to_string(),
        f = this.fragment(),
        s = this.scheme();
        return (s ? s + '://' : "") + this.authority() + this.path_to_string() + (q ? '?' + q : '') +( f ? '#' + f : '');

      },

      query_to_string: function() {
        //regenerate from parsed
        var pairs = [],
        n = this._query[0],
        v = this._query[1];

        for(var i=0; i < n.length; i++) {
          pairs.push(encodeURIComponent(n[i]) + '=' + encodeURIComponent(v[i]));
        }

        return pairs.join('&');
      },

      query_get: function(limit) {

        var dict = {},
        opts = this._query;

        for(var i=0; i < opts[0].length; i++) {
          var k = opts[0][i],
          v = opts[1][i];
          if(limit && k !== limit) { continue; }

          if(dict[k]) {
            continue;
            //don't list extras
            //if(Array.isArray(dict[k])) {
            //dict[k].push(v);
            //} else {
            //dict[k] = [dict[k],v];
            //}
          } else {
            dict[k] = v;
          }

        }
        return limit ? dict[limit] : dict;
      },

      query_get_all: function(limit) {
        var dict = {},
        opts = this._query;
        for(var i=0; i < opts[0].length; i++) {
          var k = opts[0][i],
          v = opts[1][i];
          if(limit && k !== limit) { continue; }

          if(dict[k]) {
            dict[k].push(v);
          } else {
            dict[k] = [v];
          }
        }
        return limit ? dict[limit] : dict;
      },

      _query_parse: function(raw) {

        var struct = [[],[]],
        pairs = raw.split(/&|;/);

        for (var j = 0; j < pairs.length; j++) {
          var name, value,
              pair = pairs[j],
              n_pair = pair.match(qp_re);

          if(n_pair) {
            if(typeof n_pair[n_pair.length -1] !== 'undefined') {
              n_pair.shift();//remove first
              for (var i = 0; i < n_pair.length; i++) {
                var p = n_pair[i];
                struct[i].push(decodeURIComponent(p.replace('+', ' ', 'g')));
              }
            }
          }

        };

        return struct;
      },

      //split into constituent parts
      _query_toList: function(p,q, opt) {
        for(var key in opt) {
          if( is_array(opt[key]) ) {
            for (var valn in opt[key]) {
              var val = opt[key][valn];
              p.push(key);
              q.push(val);
            };
          } else if (opt[key] !== undefined && opt[key] !== null ) {
            p.push(key);
            q.push(opt[key]);
          }
        }
        return [p, q];
      },

      //simply add to end
      query_push: function(opt) {
        this._query = this._query_toList( this._query[0], this._query[1], opt );
        return this;
      },

      //find existing keys and update or append.
      query_merge: function(opt) {
        var p = this._query[0],
        q = this._query[1];
        for(var key in opt) {
          //find existing
          var kset = false;

          for(var i=0; i < p.length; i++) {
            var x_key = p[i];
            if(key === x_key) {

              if(kset) {
                p.splice(i,1);
                q.splice(i,1);
                continue;
              }

              if( is_array( opt[key] ) ) {
                //take one off here, rest handled in append.
                q[i] = opt[key].shift();
              } else if (opt[key] === undefined || opt[key] === null ) {
                p.splice(i,1);
                q.splice(i,1);
                delete opt[key];
              } else {
                q[i] = opt[key];
                delete opt[key];
              }

              kset = true;
            }
          }
        }
        this.query_push(opt);
        return this;
      },

      query_clear: function () {
        this._query = [[], []];
        return this;
      },

      query_set: function() {
        var args = Array.prototype.slice.call(arguments);

        if(args.length === 1) {
          if (typeof args[0] === 'object') {
            //if object, replace
            this._query = this._query_toList( [], [], args[0] );
          } else {
            //set as raw
            this._query = this._query_parse(args[0]);
          }
        } else if(args.length === 0) {
          this.query_clear();
        } else {
          //probably a list, set key, val
          var obj = {};
          obj[args[0]] = args[1];
          this.query_merge(obj);
        }

        return this;
      }
    };

    //map to camelcase.
    for(var name in YouAreI.prototype) {
      if(!name.match(/^_/)) {
        var cName = toCamel(name);
        YouAreI.prototype[cName] = YouAreI.prototype[name]
      }
    }
    return YouAreI;
}));

