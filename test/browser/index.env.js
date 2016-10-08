(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(factory());
}(this, (function () { 'use strict';

	var global = typeof window !== 'undefined' ? window :
	             typeof global !== 'undefined' ? global :
	             this;
	var define = undefined;
	var require = require || function(id) {throw new Error('Unexpected required ' + id)};



	var process = window.process || {};
	process.env = process.env || {};
	var commonjsGlobal = typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

	function unwrapExports (x) {
		return x && x.__esModule ? x['default'] : x;
	}

	function createCommonjsModule(fn, module) {
		return module = { exports: {} }, fn(module, module.exports), module.exports;
	}

	var _toInteger = createCommonjsModule(function (module) {
	// 7.1.4 ToInteger
	var ceil  = Math.ceil
	  , floor = Math.floor;
	module.exports = function(it){
	  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
	};
	});

	var _defined = createCommonjsModule(function (module) {
	// 7.2.1 RequireObjectCoercible(argument)
	module.exports = function(it){
	  if(it == undefined)throw TypeError("Can't call method on  " + it);
	  return it;
	};
	});

	var _stringAt = createCommonjsModule(function (module) {
	var toInteger = _toInteger
	  , defined   = _defined;
	// true  -> String#at
	// false -> String#codePointAt
	module.exports = function(TO_STRING){
	  return function(that, pos){
	    var s = String(defined(that))
	      , i = toInteger(pos)
	      , l = s.length
	      , a, b;
	    if(i < 0 || i >= l)return TO_STRING ? '' : undefined;
	    a = s.charCodeAt(i);
	    return a < 0xd800 || a > 0xdbff || i + 1 === l || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff
	      ? TO_STRING ? s.charAt(i) : a
	      : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
	  };
	};
	});

	var _library = createCommonjsModule(function (module) {
	module.exports = true;
	});

	var _global = createCommonjsModule(function (module) {
	// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
	var global = module.exports = typeof window != 'undefined' && window.Math == Math
	  ? window : typeof self != 'undefined' && self.Math == Math ? self : Function('return this')();
	if(typeof __g == 'number')__g = global; // eslint-disable-line no-undef
	});

	var _core = createCommonjsModule(function (module) {
	var core = module.exports = {version: '2.4.0'};
	if(typeof __e == 'number')__e = core; // eslint-disable-line no-undef
	});

	var _aFunction = createCommonjsModule(function (module) {
	module.exports = function(it){
	  if(typeof it != 'function')throw TypeError(it + ' is not a function!');
	  return it;
	};
	});

	var _ctx = createCommonjsModule(function (module) {
	// optional / simple context binding
	var aFunction = _aFunction;
	module.exports = function(fn, that, length){
	  aFunction(fn);
	  if(that === undefined)return fn;
	  switch(length){
	    case 1: return function(a){
	      return fn.call(that, a);
	    };
	    case 2: return function(a, b){
	      return fn.call(that, a, b);
	    };
	    case 3: return function(a, b, c){
	      return fn.call(that, a, b, c);
	    };
	  }
	  return function(/* ...args */){
	    return fn.apply(that, arguments);
	  };
	};
	});

	var _isObject = createCommonjsModule(function (module) {
	module.exports = function(it){
	  return typeof it === 'object' ? it !== null : typeof it === 'function';
	};
	});

	var _anObject = createCommonjsModule(function (module) {
	var isObject = _isObject;
	module.exports = function(it){
	  if(!isObject(it))throw TypeError(it + ' is not an object!');
	  return it;
	};
	});

	var _fails = createCommonjsModule(function (module) {
	module.exports = function(exec){
	  try {
	    return !!exec();
	  } catch(e){
	    return true;
	  }
	};
	});

	var _descriptors = createCommonjsModule(function (module) {
	// Thank's IE8 for his funny defineProperty
	module.exports = !_fails(function(){
	  return Object.defineProperty({}, 'a', {get: function(){ return 7; }}).a != 7;
	});
	});

	var _domCreate = createCommonjsModule(function (module) {
	var isObject = _isObject
	  , document = _global.document
	  // in old IE typeof document.createElement is 'object'
	  , is = isObject(document) && isObject(document.createElement);
	module.exports = function(it){
	  return is ? document.createElement(it) : {};
	};
	});

	var _ie8DomDefine = createCommonjsModule(function (module) {
	module.exports = !_descriptors && !_fails(function(){
	  return Object.defineProperty(_domCreate('div'), 'a', {get: function(){ return 7; }}).a != 7;
	});
	});

	var _toPrimitive = createCommonjsModule(function (module) {
	// 7.1.1 ToPrimitive(input [, PreferredType])
	var isObject = _isObject;
	// instead of the ES6 spec version, we didn't implement @@toPrimitive case
	// and the second argument - flag - preferred type is a string
	module.exports = function(it, S){
	  if(!isObject(it))return it;
	  var fn, val;
	  if(S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it)))return val;
	  if(typeof (fn = it.valueOf) == 'function' && !isObject(val = fn.call(it)))return val;
	  if(!S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it)))return val;
	  throw TypeError("Can't convert object to primitive value");
	};
	});

	var _objectDp = createCommonjsModule(function (module, exports) {
	var anObject       = _anObject
	  , IE8_DOM_DEFINE = _ie8DomDefine
	  , toPrimitive    = _toPrimitive
	  , dP             = Object.defineProperty;

	exports.f = _descriptors ? Object.defineProperty : function defineProperty(O, P, Attributes){
	  anObject(O);
	  P = toPrimitive(P, true);
	  anObject(Attributes);
	  if(IE8_DOM_DEFINE)try {
	    return dP(O, P, Attributes);
	  } catch(e){ /* empty */ }
	  if('get' in Attributes || 'set' in Attributes)throw TypeError('Accessors not supported!');
	  if('value' in Attributes)O[P] = Attributes.value;
	  return O;
	};
	});

	var _propertyDesc = createCommonjsModule(function (module) {
	module.exports = function(bitmap, value){
	  return {
	    enumerable  : !(bitmap & 1),
	    configurable: !(bitmap & 2),
	    writable    : !(bitmap & 4),
	    value       : value
	  };
	};
	});

	var _hide = createCommonjsModule(function (module) {
	var dP         = _objectDp
	  , createDesc = _propertyDesc;
	module.exports = _descriptors ? function(object, key, value){
	  return dP.f(object, key, createDesc(1, value));
	} : function(object, key, value){
	  object[key] = value;
	  return object;
	};
	});

	var _export = createCommonjsModule(function (module) {
	var global    = _global
	  , core      = _core
	  , ctx       = _ctx
	  , hide      = _hide
	  , PROTOTYPE = 'prototype';

	var $export = function(type, name, source){
	  var IS_FORCED = type & $export.F
	    , IS_GLOBAL = type & $export.G
	    , IS_STATIC = type & $export.S
	    , IS_PROTO  = type & $export.P
	    , IS_BIND   = type & $export.B
	    , IS_WRAP   = type & $export.W
	    , exports   = IS_GLOBAL ? core : core[name] || (core[name] = {})
	    , expProto  = exports[PROTOTYPE]
	    , target    = IS_GLOBAL ? global : IS_STATIC ? global[name] : (global[name] || {})[PROTOTYPE]
	    , key, own, out;
	  if(IS_GLOBAL)source = name;
	  for(key in source){
	    // contains in native
	    own = !IS_FORCED && target && target[key] !== undefined;
	    if(own && key in exports)continue;
	    // export native or passed
	    out = own ? target[key] : source[key];
	    // prevent global pollution for namespaces
	    exports[key] = IS_GLOBAL && typeof target[key] != 'function' ? source[key]
	    // bind timers to global for call from export context
	    : IS_BIND && own ? ctx(out, global)
	    // wrap global constructors for prevent change them in library
	    : IS_WRAP && target[key] == out ? (function(C){
	      var F = function(a, b, c){
	        if(this instanceof C){
	          switch(arguments.length){
	            case 0: return new C;
	            case 1: return new C(a);
	            case 2: return new C(a, b);
	          } return new C(a, b, c);
	        } return C.apply(this, arguments);
	      };
	      F[PROTOTYPE] = C[PROTOTYPE];
	      return F;
	    // make static versions for prototype methods
	    })(out) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
	    // export proto methods to core.%CONSTRUCTOR%.methods.%NAME%
	    if(IS_PROTO){
	      (exports.virtual || (exports.virtual = {}))[key] = out;
	      // export proto methods to core.%CONSTRUCTOR%.prototype.%NAME%
	      if(type & $export.R && expProto && !expProto[key])hide(expProto, key, out);
	    }
	  }
	};
	// type bitmap
	$export.F = 1;   // forced
	$export.G = 2;   // global
	$export.S = 4;   // static
	$export.P = 8;   // proto
	$export.B = 16;  // bind
	$export.W = 32;  // wrap
	$export.U = 64;  // safe
	$export.R = 128; // real proto method for `library` 
	module.exports = $export;
	});

	var _redefine = createCommonjsModule(function (module) {
	module.exports = _hide;
	});

	var _has = createCommonjsModule(function (module) {
	var hasOwnProperty = {}.hasOwnProperty;
	module.exports = function(it, key){
	  return hasOwnProperty.call(it, key);
	};
	});

	var _iterators = createCommonjsModule(function (module) {
	module.exports = {};
	});

	var _cof = createCommonjsModule(function (module) {
	var toString = {}.toString;

	module.exports = function(it){
	  return toString.call(it).slice(8, -1);
	};
	});

	var _iobject = createCommonjsModule(function (module) {
	// fallback for non-array-like ES3 and non-enumerable old V8 strings
	var cof = _cof;
	module.exports = Object('z').propertyIsEnumerable(0) ? Object : function(it){
	  return cof(it) == 'String' ? it.split('') : Object(it);
	};
	});

	var _toIobject = createCommonjsModule(function (module) {
	// to indexed object, toObject with fallback for non-array-like ES3 strings
	var IObject = _iobject
	  , defined = _defined;
	module.exports = function(it){
	  return IObject(defined(it));
	};
	});

	var _toLength = createCommonjsModule(function (module) {
	// 7.1.15 ToLength
	var toInteger = _toInteger
	  , min       = Math.min;
	module.exports = function(it){
	  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
	};
	});

	var _toIndex = createCommonjsModule(function (module) {
	var toInteger = _toInteger
	  , max       = Math.max
	  , min       = Math.min;
	module.exports = function(index, length){
	  index = toInteger(index);
	  return index < 0 ? max(index + length, 0) : min(index, length);
	};
	});

	var _arrayIncludes = createCommonjsModule(function (module) {
	// false -> Array#indexOf
	// true  -> Array#includes
	var toIObject = _toIobject
	  , toLength  = _toLength
	  , toIndex   = _toIndex;
	module.exports = function(IS_INCLUDES){
	  return function($this, el, fromIndex){
	    var O      = toIObject($this)
	      , length = toLength(O.length)
	      , index  = toIndex(fromIndex, length)
	      , value;
	    // Array#includes uses SameValueZero equality algorithm
	    if(IS_INCLUDES && el != el)while(length > index){
	      value = O[index++];
	      if(value != value)return true;
	    // Array#toIndex ignores holes, Array#includes - not
	    } else for(;length > index; index++)if(IS_INCLUDES || index in O){
	      if(O[index] === el)return IS_INCLUDES || index || 0;
	    } return !IS_INCLUDES && -1;
	  };
	};
	});

	var _shared = createCommonjsModule(function (module) {
	var global = _global
	  , SHARED = '__core-js_shared__'
	  , store  = global[SHARED] || (global[SHARED] = {});
	module.exports = function(key){
	  return store[key] || (store[key] = {});
	};
	});

	var _uid = createCommonjsModule(function (module) {
	var id = 0
	  , px = Math.random();
	module.exports = function(key){
	  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
	};
	});

	var _sharedKey = createCommonjsModule(function (module) {
	var shared = _shared('keys')
	  , uid    = _uid;
	module.exports = function(key){
	  return shared[key] || (shared[key] = uid(key));
	};
	});

	var _objectKeysInternal = createCommonjsModule(function (module) {
	var has          = _has
	  , toIObject    = _toIobject
	  , arrayIndexOf = _arrayIncludes(false)
	  , IE_PROTO     = _sharedKey('IE_PROTO');

	module.exports = function(object, names){
	  var O      = toIObject(object)
	    , i      = 0
	    , result = []
	    , key;
	  for(key in O)if(key != IE_PROTO)has(O, key) && result.push(key);
	  // Don't enum bug & hidden keys
	  while(names.length > i)if(has(O, key = names[i++])){
	    ~arrayIndexOf(result, key) || result.push(key);
	  }
	  return result;
	};
	});

	var _enumBugKeys = createCommonjsModule(function (module) {
	// IE 8- don't enum bug keys
	module.exports = (
	  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
	).split(',');
	});

	var _objectKeys = createCommonjsModule(function (module) {
	// 19.1.2.14 / 15.2.3.14 Object.keys(O)
	var $keys       = _objectKeysInternal
	  , enumBugKeys = _enumBugKeys;

	module.exports = Object.keys || function keys(O){
	  return $keys(O, enumBugKeys);
	};
	});

	var _objectDps = createCommonjsModule(function (module) {
	var dP       = _objectDp
	  , anObject = _anObject
	  , getKeys  = _objectKeys;

	module.exports = _descriptors ? Object.defineProperties : function defineProperties(O, Properties){
	  anObject(O);
	  var keys   = getKeys(Properties)
	    , length = keys.length
	    , i = 0
	    , P;
	  while(length > i)dP.f(O, P = keys[i++], Properties[P]);
	  return O;
	};
	});

	var _html = createCommonjsModule(function (module) {
	module.exports = _global.document && document.documentElement;
	});

	var _objectCreate = createCommonjsModule(function (module) {
	// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
	var anObject    = _anObject
	  , dPs         = _objectDps
	  , enumBugKeys = _enumBugKeys
	  , IE_PROTO    = _sharedKey('IE_PROTO')
	  , Empty       = function(){ /* empty */ }
	  , PROTOTYPE   = 'prototype';

	// Create object with fake `null` prototype: use iframe Object with cleared prototype
	var createDict = function(){
	  // Thrash, waste and sodomy: IE GC bug
	  var iframe = _domCreate('iframe')
	    , i      = enumBugKeys.length
	    , lt     = '<'
	    , gt     = '>'
	    , iframeDocument;
	  iframe.style.display = 'none';
	  _html.appendChild(iframe);
	  iframe.src = 'javascript:'; // eslint-disable-line no-script-url
	  // createDict = iframe.contentWindow.Object;
	  // html.removeChild(iframe);
	  iframeDocument = iframe.contentWindow.document;
	  iframeDocument.open();
	  iframeDocument.write(lt + 'script' + gt + 'document.F=Object' + lt + '/script' + gt);
	  iframeDocument.close();
	  createDict = iframeDocument.F;
	  while(i--)delete createDict[PROTOTYPE][enumBugKeys[i]];
	  return createDict();
	};

	module.exports = Object.create || function create(O, Properties){
	  var result;
	  if(O !== null){
	    Empty[PROTOTYPE] = anObject(O);
	    result = new Empty;
	    Empty[PROTOTYPE] = null;
	    // add "__proto__" for Object.getPrototypeOf polyfill
	    result[IE_PROTO] = O;
	  } else result = createDict();
	  return Properties === undefined ? result : dPs(result, Properties);
	};
	});

	var _wks = createCommonjsModule(function (module) {
	var store      = _shared('wks')
	  , uid        = _uid
	  , Symbol     = _global.Symbol
	  , USE_SYMBOL = typeof Symbol == 'function';

	var $exports = module.exports = function(name){
	  return store[name] || (store[name] =
	    USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : uid)('Symbol.' + name));
	};

	$exports.store = store;
	});

	var _setToStringTag = createCommonjsModule(function (module) {
	var def = _objectDp.f
	  , has = _has
	  , TAG = _wks('toStringTag');

	module.exports = function(it, tag, stat){
	  if(it && !has(it = stat ? it : it.prototype, TAG))def(it, TAG, {configurable: true, value: tag});
	};
	});

	var _iterCreate = createCommonjsModule(function (module) {
	'use strict';
	var create         = _objectCreate
	  , descriptor     = _propertyDesc
	  , setToStringTag = _setToStringTag
	  , IteratorPrototype = {};

	// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
	_hide(IteratorPrototype, _wks('iterator'), function(){ return this; });

	module.exports = function(Constructor, NAME, next){
	  Constructor.prototype = create(IteratorPrototype, {next: descriptor(1, next)});
	  setToStringTag(Constructor, NAME + ' Iterator');
	};
	});

	var _toObject = createCommonjsModule(function (module) {
	// 7.1.13 ToObject(argument)
	var defined = _defined;
	module.exports = function(it){
	  return Object(defined(it));
	};
	});

	var _objectGpo = createCommonjsModule(function (module) {
	// 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)
	var has         = _has
	  , toObject    = _toObject
	  , IE_PROTO    = _sharedKey('IE_PROTO')
	  , ObjectProto = Object.prototype;

	module.exports = Object.getPrototypeOf || function(O){
	  O = toObject(O);
	  if(has(O, IE_PROTO))return O[IE_PROTO];
	  if(typeof O.constructor == 'function' && O instanceof O.constructor){
	    return O.constructor.prototype;
	  } return O instanceof Object ? ObjectProto : null;
	};
	});

	var _iterDefine = createCommonjsModule(function (module) {
	'use strict';
	var LIBRARY        = _library
	  , $export        = _export
	  , redefine       = _redefine
	  , hide           = _hide
	  , has            = _has
	  , Iterators      = _iterators
	  , $iterCreate    = _iterCreate
	  , setToStringTag = _setToStringTag
	  , getPrototypeOf = _objectGpo
	  , ITERATOR       = _wks('iterator')
	  , BUGGY          = !([].keys && 'next' in [].keys()) // Safari has buggy iterators w/o `next`
	  , FF_ITERATOR    = '@@iterator'
	  , KEYS           = 'keys'
	  , VALUES         = 'values';

	var returnThis = function(){ return this; };

	module.exports = function(Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED){
	  $iterCreate(Constructor, NAME, next);
	  var getMethod = function(kind){
	    if(!BUGGY && kind in proto)return proto[kind];
	    switch(kind){
	      case KEYS: return function keys(){ return new Constructor(this, kind); };
	      case VALUES: return function values(){ return new Constructor(this, kind); };
	    } return function entries(){ return new Constructor(this, kind); };
	  };
	  var TAG        = NAME + ' Iterator'
	    , DEF_VALUES = DEFAULT == VALUES
	    , VALUES_BUG = false
	    , proto      = Base.prototype
	    , $native    = proto[ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT]
	    , $default   = $native || getMethod(DEFAULT)
	    , $entries   = DEFAULT ? !DEF_VALUES ? $default : getMethod('entries') : undefined
	    , $anyNative = NAME == 'Array' ? proto.entries || $native : $native
	    , methods, key, IteratorPrototype;
	  // Fix native
	  if($anyNative){
	    IteratorPrototype = getPrototypeOf($anyNative.call(new Base));
	    if(IteratorPrototype !== Object.prototype){
	      // Set @@toStringTag to native iterators
	      setToStringTag(IteratorPrototype, TAG, true);
	      // fix for some old engines
	      if(!LIBRARY && !has(IteratorPrototype, ITERATOR))hide(IteratorPrototype, ITERATOR, returnThis);
	    }
	  }
	  // fix Array#{values, @@iterator}.name in V8 / FF
	  if(DEF_VALUES && $native && $native.name !== VALUES){
	    VALUES_BUG = true;
	    $default = function values(){ return $native.call(this); };
	  }
	  // Define iterator
	  if((!LIBRARY || FORCED) && (BUGGY || VALUES_BUG || !proto[ITERATOR])){
	    hide(proto, ITERATOR, $default);
	  }
	  // Plug for library
	  Iterators[NAME] = $default;
	  Iterators[TAG]  = returnThis;
	  if(DEFAULT){
	    methods = {
	      values:  DEF_VALUES ? $default : getMethod(VALUES),
	      keys:    IS_SET     ? $default : getMethod(KEYS),
	      entries: $entries
	    };
	    if(FORCED)for(key in methods){
	      if(!(key in proto))redefine(proto, key, methods[key]);
	    } else $export($export.P + $export.F * (BUGGY || VALUES_BUG), NAME, methods);
	  }
	  return methods;
	};
	});

	var es6_string_iterator = createCommonjsModule(function (module) {
	'use strict';
	var $at  = _stringAt(true);

	// 21.1.3.27 String.prototype[@@iterator]()
	_iterDefine(String, 'String', function(iterated){
	  this._t = String(iterated); // target
	  this._i = 0;                // next index
	// 21.1.5.2.1 %StringIteratorPrototype%.next()
	}, function(){
	  var O     = this._t
	    , index = this._i
	    , point;
	  if(index >= O.length)return {value: undefined, done: true};
	  point = $at(O, index);
	  this._i += point.length;
	  return {value: point, done: false};
	});
	});

	var _addToUnscopables = createCommonjsModule(function (module) {
	module.exports = function(){ /* empty */ };
	});

	var _iterStep = createCommonjsModule(function (module) {
	module.exports = function(done, value){
	  return {value: value, done: !!done};
	};
	});

	var es6_array_iterator = createCommonjsModule(function (module) {
	'use strict';
	var addToUnscopables = _addToUnscopables
	  , step             = _iterStep
	  , Iterators        = _iterators
	  , toIObject        = _toIobject;

	// 22.1.3.4 Array.prototype.entries()
	// 22.1.3.13 Array.prototype.keys()
	// 22.1.3.29 Array.prototype.values()
	// 22.1.3.30 Array.prototype[@@iterator]()
	module.exports = _iterDefine(Array, 'Array', function(iterated, kind){
	  this._t = toIObject(iterated); // target
	  this._i = 0;                   // next index
	  this._k = kind;                // kind
	// 22.1.5.2.1 %ArrayIteratorPrototype%.next()
	}, function(){
	  var O     = this._t
	    , kind  = this._k
	    , index = this._i++;
	  if(!O || index >= O.length){
	    this._t = undefined;
	    return step(1);
	  }
	  if(kind == 'keys'  )return step(0, index);
	  if(kind == 'values')return step(0, O[index]);
	  return step(0, [index, O[index]]);
	}, 'values');

	// argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)
	Iterators.Arguments = Iterators.Array;

	addToUnscopables('keys');
	addToUnscopables('values');
	addToUnscopables('entries');
	});

	var web_dom_iterable = createCommonjsModule(function (module) {
	var global        = _global
	  , hide          = _hide
	  , Iterators     = _iterators
	  , TO_STRING_TAG = _wks('toStringTag');

	for(var collections = ['NodeList', 'DOMTokenList', 'MediaList', 'StyleSheetList', 'CSSRuleList'], i = 0; i < 5; i++){
	  var NAME       = collections[i]
	    , Collection = global[NAME]
	    , proto      = Collection && Collection.prototype;
	  if(proto && !proto[TO_STRING_TAG])hide(proto, TO_STRING_TAG, NAME);
	  Iterators[NAME] = Iterators.Array;
	}
	});

	var _classof = createCommonjsModule(function (module) {
	// getting tag from 19.1.3.6 Object.prototype.toString()
	var cof = _cof
	  , TAG = _wks('toStringTag')
	  // ES3 wrong here
	  , ARG = cof(function(){ return arguments; }()) == 'Arguments';

	// fallback for IE11 Script Access Denied error
	var tryGet = function(it, key){
	  try {
	    return it[key];
	  } catch(e){ /* empty */ }
	};

	module.exports = function(it){
	  var O, T, B;
	  return it === undefined ? 'Undefined' : it === null ? 'Null'
	    // @@toStringTag case
	    : typeof (T = tryGet(O = Object(it), TAG)) == 'string' ? T
	    // builtinTag case
	    : ARG ? cof(O)
	    // ES3 arguments fallback
	    : (B = cof(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : B;
	};
	});

	var _anInstance = createCommonjsModule(function (module) {
	module.exports = function(it, Constructor, name, forbiddenField){
	  if(!(it instanceof Constructor) || (forbiddenField !== undefined && forbiddenField in it)){
	    throw TypeError(name + ': incorrect invocation!');
	  } return it;
	};
	});

	var _iterCall = createCommonjsModule(function (module) {
	// call something on iterator step with safe closing on error
	var anObject = _anObject;
	module.exports = function(iterator, fn, value, entries){
	  try {
	    return entries ? fn(anObject(value)[0], value[1]) : fn(value);
	  // 7.4.6 IteratorClose(iterator, completion)
	  } catch(e){
	    var ret = iterator['return'];
	    if(ret !== undefined)anObject(ret.call(iterator));
	    throw e;
	  }
	};
	});

	var _isArrayIter = createCommonjsModule(function (module) {
	// check on default Array iterator
	var Iterators  = _iterators
	  , ITERATOR   = _wks('iterator')
	  , ArrayProto = Array.prototype;

	module.exports = function(it){
	  return it !== undefined && (Iterators.Array === it || ArrayProto[ITERATOR] === it);
	};
	});

	var core_getIteratorMethod = createCommonjsModule(function (module) {
	var classof   = _classof
	  , ITERATOR  = _wks('iterator')
	  , Iterators = _iterators;
	module.exports = _core.getIteratorMethod = function(it){
	  if(it != undefined)return it[ITERATOR]
	    || it['@@iterator']
	    || Iterators[classof(it)];
	};
	});

	var _forOf = createCommonjsModule(function (module) {
	var ctx         = _ctx
	  , call        = _iterCall
	  , isArrayIter = _isArrayIter
	  , anObject    = _anObject
	  , toLength    = _toLength
	  , getIterFn   = core_getIteratorMethod
	  , BREAK       = {}
	  , RETURN      = {};
	var exports = module.exports = function(iterable, entries, fn, that, ITERATOR){
	  var iterFn = ITERATOR ? function(){ return iterable; } : getIterFn(iterable)
	    , f      = ctx(fn, that, entries ? 2 : 1)
	    , index  = 0
	    , length, step, iterator, result;
	  if(typeof iterFn != 'function')throw TypeError(iterable + ' is not iterable!');
	  // fast case for arrays with default iterator
	  if(isArrayIter(iterFn))for(length = toLength(iterable.length); length > index; index++){
	    result = entries ? f(anObject(step = iterable[index])[0], step[1]) : f(iterable[index]);
	    if(result === BREAK || result === RETURN)return result;
	  } else for(iterator = iterFn.call(iterable); !(step = iterator.next()).done; ){
	    result = call(iterator, f, step.value, entries);
	    if(result === BREAK || result === RETURN)return result;
	  }
	};
	exports.BREAK  = BREAK;
	exports.RETURN = RETURN;
	});

	var _speciesConstructor = createCommonjsModule(function (module) {
	// 7.3.20 SpeciesConstructor(O, defaultConstructor)
	var anObject  = _anObject
	  , aFunction = _aFunction
	  , SPECIES   = _wks('species');
	module.exports = function(O, D){
	  var C = anObject(O).constructor, S;
	  return C === undefined || (S = anObject(C)[SPECIES]) == undefined ? D : aFunction(S);
	};
	});

	var _invoke = createCommonjsModule(function (module) {
	// fast apply, http://jsperf.lnkit.com/fast-apply/5
	module.exports = function(fn, args, that){
	  var un = that === undefined;
	  switch(args.length){
	    case 0: return un ? fn()
	                      : fn.call(that);
	    case 1: return un ? fn(args[0])
	                      : fn.call(that, args[0]);
	    case 2: return un ? fn(args[0], args[1])
	                      : fn.call(that, args[0], args[1]);
	    case 3: return un ? fn(args[0], args[1], args[2])
	                      : fn.call(that, args[0], args[1], args[2]);
	    case 4: return un ? fn(args[0], args[1], args[2], args[3])
	                      : fn.call(that, args[0], args[1], args[2], args[3]);
	  } return              fn.apply(that, args);
	};
	});

	var _task = createCommonjsModule(function (module) {
	var ctx                = _ctx
	  , invoke             = _invoke
	  , html               = _html
	  , cel                = _domCreate
	  , global             = _global
	  , process            = global.process
	  , setTask            = global.setImmediate
	  , clearTask          = global.clearImmediate
	  , MessageChannel     = global.MessageChannel
	  , counter            = 0
	  , queue              = {}
	  , ONREADYSTATECHANGE = 'onreadystatechange'
	  , defer, channel, port;
	var run = function(){
	  var id = +this;
	  if(queue.hasOwnProperty(id)){
	    var fn = queue[id];
	    delete queue[id];
	    fn();
	  }
	};
	var listener = function(event){
	  run.call(event.data);
	};
	// Node.js 0.9+ & IE10+ has setImmediate, otherwise:
	if(!setTask || !clearTask){
	  setTask = function setImmediate(fn){
	    var args = [], i = 1;
	    while(arguments.length > i)args.push(arguments[i++]);
	    queue[++counter] = function(){
	      invoke(typeof fn == 'function' ? fn : Function(fn), args);
	    };
	    defer(counter);
	    return counter;
	  };
	  clearTask = function clearImmediate(id){
	    delete queue[id];
	  };
	  // Node.js 0.8-
	  if(_cof(process) == 'process'){
	    defer = function(id){
	      process.nextTick(ctx(run, id, 1));
	    };
	  // Browsers with MessageChannel, includes WebWorkers
	  } else if(MessageChannel){
	    channel = new MessageChannel;
	    port    = channel.port2;
	    channel.port1.onmessage = listener;
	    defer = ctx(port.postMessage, port, 1);
	  // Browsers with postMessage, skip WebWorkers
	  // IE8 has postMessage, but it's sync & typeof its postMessage is 'object'
	  } else if(global.addEventListener && typeof postMessage == 'function' && !global.importScripts){
	    defer = function(id){
	      global.postMessage(id + '', '*');
	    };
	    global.addEventListener('message', listener, false);
	  // IE8-
	  } else if(ONREADYSTATECHANGE in cel('script')){
	    defer = function(id){
	      html.appendChild(cel('script'))[ONREADYSTATECHANGE] = function(){
	        html.removeChild(this);
	        run.call(id);
	      };
	    };
	  // Rest old browsers
	  } else {
	    defer = function(id){
	      setTimeout(ctx(run, id, 1), 0);
	    };
	  }
	}
	module.exports = {
	  set:   setTask,
	  clear: clearTask
	};
	});

	var _microtask = createCommonjsModule(function (module) {
	var global    = _global
	  , macrotask = _task.set
	  , Observer  = global.MutationObserver || global.WebKitMutationObserver
	  , process   = global.process
	  , Promise   = global.Promise
	  , isNode    = _cof(process) == 'process';

	module.exports = function(){
	  var head, last, notify;

	  var flush = function(){
	    var parent, fn;
	    if(isNode && (parent = process.domain))parent.exit();
	    while(head){
	      fn   = head.fn;
	      head = head.next;
	      try {
	        fn();
	      } catch(e){
	        if(head)notify();
	        else last = undefined;
	        throw e;
	      }
	    } last = undefined;
	    if(parent)parent.enter();
	  };

	  // Node.js
	  if(isNode){
	    notify = function(){
	      process.nextTick(flush);
	    };
	  // browsers with MutationObserver
	  } else if(Observer){
	    var toggle = true
	      , node   = document.createTextNode('');
	    new Observer(flush).observe(node, {characterData: true}); // eslint-disable-line no-new
	    notify = function(){
	      node.data = toggle = !toggle;
	    };
	  // environments with maybe non-completely correct, but existent Promise
	  } else if(Promise && Promise.resolve){
	    var promise = Promise.resolve();
	    notify = function(){
	      promise.then(flush);
	    };
	  // for other environments - macrotask based on:
	  // - setImmediate
	  // - MessageChannel
	  // - window.postMessag
	  // - onreadystatechange
	  // - setTimeout
	  } else {
	    notify = function(){
	      // strange IE + webpack dev server bug - use .call(global)
	      macrotask.call(global, flush);
	    };
	  }

	  return function(fn){
	    var task = {fn: fn, next: undefined};
	    if(last)last.next = task;
	    if(!head){
	      head = task;
	      notify();
	    } last = task;
	  };
	};
	});

	var _redefineAll = createCommonjsModule(function (module) {
	var hide = _hide;
	module.exports = function(target, src, safe){
	  for(var key in src){
	    if(safe && target[key])target[key] = src[key];
	    else hide(target, key, src[key]);
	  } return target;
	};
	});

	var _setSpecies = createCommonjsModule(function (module) {
	'use strict';
	var global      = _global
	  , core        = _core
	  , dP          = _objectDp
	  , DESCRIPTORS = _descriptors
	  , SPECIES     = _wks('species');

	module.exports = function(KEY){
	  var C = typeof core[KEY] == 'function' ? core[KEY] : global[KEY];
	  if(DESCRIPTORS && C && !C[SPECIES])dP.f(C, SPECIES, {
	    configurable: true,
	    get: function(){ return this; }
	  });
	};
	});

	var _iterDetect = createCommonjsModule(function (module) {
	var ITERATOR     = _wks('iterator')
	  , SAFE_CLOSING = false;

	try {
	  var riter = [7][ITERATOR]();
	  riter['return'] = function(){ SAFE_CLOSING = true; };
	  Array.from(riter, function(){ throw 2; });
	} catch(e){ /* empty */ }

	module.exports = function(exec, skipClosing){
	  if(!skipClosing && !SAFE_CLOSING)return false;
	  var safe = false;
	  try {
	    var arr  = [7]
	      , iter = arr[ITERATOR]();
	    iter.next = function(){ return {done: safe = true}; };
	    arr[ITERATOR] = function(){ return iter; };
	    exec(arr);
	  } catch(e){ /* empty */ }
	  return safe;
	};
	});

	var es6_promise = createCommonjsModule(function (module) {
	'use strict';
	var LIBRARY            = _library
	  , global             = _global
	  , ctx                = _ctx
	  , classof            = _classof
	  , $export            = _export
	  , isObject           = _isObject
	  , aFunction          = _aFunction
	  , anInstance         = _anInstance
	  , forOf              = _forOf
	  , speciesConstructor = _speciesConstructor
	  , task               = _task.set
	  , microtask          = _microtask()
	  , PROMISE            = 'Promise'
	  , TypeError          = global.TypeError
	  , process            = global.process
	  , $Promise           = global[PROMISE]
	  , process            = global.process
	  , isNode             = classof(process) == 'process'
	  , empty              = function(){ /* empty */ }
	  , Internal, GenericPromiseCapability, Wrapper;

	var USE_NATIVE = !!function(){
	  try {
	    // correct subclassing with @@species support
	    var promise     = $Promise.resolve(1)
	      , FakePromise = (promise.constructor = {})[_wks('species')] = function(exec){ exec(empty, empty); };
	    // unhandled rejections tracking support, NodeJS Promise without it fails @@species test
	    return (isNode || typeof PromiseRejectionEvent == 'function') && promise.then(empty) instanceof FakePromise;
	  } catch(e){ /* empty */ }
	}();

	// helpers
	var sameConstructor = function(a, b){
	  // with library wrapper special case
	  return a === b || a === $Promise && b === Wrapper;
	};
	var isThenable = function(it){
	  var then;
	  return isObject(it) && typeof (then = it.then) == 'function' ? then : false;
	};
	var newPromiseCapability = function(C){
	  return sameConstructor($Promise, C)
	    ? new PromiseCapability(C)
	    : new GenericPromiseCapability(C);
	};
	var PromiseCapability = GenericPromiseCapability = function(C){
	  var resolve, reject;
	  this.promise = new C(function($$resolve, $$reject){
	    if(resolve !== undefined || reject !== undefined)throw TypeError('Bad Promise constructor');
	    resolve = $$resolve;
	    reject  = $$reject;
	  });
	  this.resolve = aFunction(resolve);
	  this.reject  = aFunction(reject);
	};
	var perform = function(exec){
	  try {
	    exec();
	  } catch(e){
	    return {error: e};
	  }
	};
	var notify = function(promise, isReject){
	  if(promise._n)return;
	  promise._n = true;
	  var chain = promise._c;
	  microtask(function(){
	    var value = promise._v
	      , ok    = promise._s == 1
	      , i     = 0;
	    var run = function(reaction){
	      var handler = ok ? reaction.ok : reaction.fail
	        , resolve = reaction.resolve
	        , reject  = reaction.reject
	        , domain  = reaction.domain
	        , result, then;
	      try {
	        if(handler){
	          if(!ok){
	            if(promise._h == 2)onHandleUnhandled(promise);
	            promise._h = 1;
	          }
	          if(handler === true)result = value;
	          else {
	            if(domain)domain.enter();
	            result = handler(value);
	            if(domain)domain.exit();
	          }
	          if(result === reaction.promise){
	            reject(TypeError('Promise-chain cycle'));
	          } else if(then = isThenable(result)){
	            then.call(result, resolve, reject);
	          } else resolve(result);
	        } else reject(value);
	      } catch(e){
	        reject(e);
	      }
	    };
	    while(chain.length > i)run(chain[i++]); // variable length - can't use forEach
	    promise._c = [];
	    promise._n = false;
	    if(isReject && !promise._h)onUnhandled(promise);
	  });
	};
	var onUnhandled = function(promise){
	  task.call(global, function(){
	    var value = promise._v
	      , abrupt, handler, console;
	    if(isUnhandled(promise)){
	      abrupt = perform(function(){
	        if(isNode){
	          process.emit('unhandledRejection', value, promise);
	        } else if(handler = global.onunhandledrejection){
	          handler({promise: promise, reason: value});
	        } else if((console = global.console) && console.error){
	          console.error('Unhandled promise rejection', value);
	        }
	      });
	      // Browsers should not trigger `rejectionHandled` event if it was handled here, NodeJS - should
	      promise._h = isNode || isUnhandled(promise) ? 2 : 1;
	    } promise._a = undefined;
	    if(abrupt)throw abrupt.error;
	  });
	};
	var isUnhandled = function(promise){
	  if(promise._h == 1)return false;
	  var chain = promise._a || promise._c
	    , i     = 0
	    , reaction;
	  while(chain.length > i){
	    reaction = chain[i++];
	    if(reaction.fail || !isUnhandled(reaction.promise))return false;
	  } return true;
	};
	var onHandleUnhandled = function(promise){
	  task.call(global, function(){
	    var handler;
	    if(isNode){
	      process.emit('rejectionHandled', promise);
	    } else if(handler = global.onrejectionhandled){
	      handler({promise: promise, reason: promise._v});
	    }
	  });
	};
	var $reject = function(value){
	  var promise = this;
	  if(promise._d)return;
	  promise._d = true;
	  promise = promise._w || promise; // unwrap
	  promise._v = value;
	  promise._s = 2;
	  if(!promise._a)promise._a = promise._c.slice();
	  notify(promise, true);
	};
	var $resolve = function(value){
	  var promise = this
	    , then;
	  if(promise._d)return;
	  promise._d = true;
	  promise = promise._w || promise; // unwrap
	  try {
	    if(promise === value)throw TypeError("Promise can't be resolved itself");
	    if(then = isThenable(value)){
	      microtask(function(){
	        var wrapper = {_w: promise, _d: false}; // wrap
	        try {
	          then.call(value, ctx($resolve, wrapper, 1), ctx($reject, wrapper, 1));
	        } catch(e){
	          $reject.call(wrapper, e);
	        }
	      });
	    } else {
	      promise._v = value;
	      promise._s = 1;
	      notify(promise, false);
	    }
	  } catch(e){
	    $reject.call({_w: promise, _d: false}, e); // wrap
	  }
	};

	// constructor polyfill
	if(!USE_NATIVE){
	  // 25.4.3.1 Promise(executor)
	  $Promise = function Promise(executor){
	    anInstance(this, $Promise, PROMISE, '_h');
	    aFunction(executor);
	    Internal.call(this);
	    try {
	      executor(ctx($resolve, this, 1), ctx($reject, this, 1));
	    } catch(err){
	      $reject.call(this, err);
	    }
	  };
	  Internal = function Promise(executor){
	    this._c = [];             // <- awaiting reactions
	    this._a = undefined;      // <- checked in isUnhandled reactions
	    this._s = 0;              // <- state
	    this._d = false;          // <- done
	    this._v = undefined;      // <- value
	    this._h = 0;              // <- rejection state, 0 - default, 1 - handled, 2 - unhandled
	    this._n = false;          // <- notify
	  };
	  Internal.prototype = _redefineAll($Promise.prototype, {
	    // 25.4.5.3 Promise.prototype.then(onFulfilled, onRejected)
	    then: function then(onFulfilled, onRejected){
	      var reaction    = newPromiseCapability(speciesConstructor(this, $Promise));
	      reaction.ok     = typeof onFulfilled == 'function' ? onFulfilled : true;
	      reaction.fail   = typeof onRejected == 'function' && onRejected;
	      reaction.domain = isNode ? process.domain : undefined;
	      this._c.push(reaction);
	      if(this._a)this._a.push(reaction);
	      if(this._s)notify(this, false);
	      return reaction.promise;
	    },
	    // 25.4.5.1 Promise.prototype.catch(onRejected)
	    'catch': function(onRejected){
	      return this.then(undefined, onRejected);
	    }
	  });
	  PromiseCapability = function(){
	    var promise  = new Internal;
	    this.promise = promise;
	    this.resolve = ctx($resolve, promise, 1);
	    this.reject  = ctx($reject, promise, 1);
	  };
	}

	$export($export.G + $export.W + $export.F * !USE_NATIVE, {Promise: $Promise});
	_setToStringTag($Promise, PROMISE);
	_setSpecies(PROMISE);
	Wrapper = _core[PROMISE];

	// statics
	$export($export.S + $export.F * !USE_NATIVE, PROMISE, {
	  // 25.4.4.5 Promise.reject(r)
	  reject: function reject(r){
	    var capability = newPromiseCapability(this)
	      , $$reject   = capability.reject;
	    $$reject(r);
	    return capability.promise;
	  }
	});
	$export($export.S + $export.F * (LIBRARY || !USE_NATIVE), PROMISE, {
	  // 25.4.4.6 Promise.resolve(x)
	  resolve: function resolve(x){
	    // instanceof instead of internal slot check because we should fix it without replacement native Promise core
	    if(x instanceof $Promise && sameConstructor(x.constructor, this))return x;
	    var capability = newPromiseCapability(this)
	      , $$resolve  = capability.resolve;
	    $$resolve(x);
	    return capability.promise;
	  }
	});
	$export($export.S + $export.F * !(USE_NATIVE && _iterDetect(function(iter){
	  $Promise.all(iter)['catch'](empty);
	})), PROMISE, {
	  // 25.4.4.1 Promise.all(iterable)
	  all: function all(iterable){
	    var C          = this
	      , capability = newPromiseCapability(C)
	      , resolve    = capability.resolve
	      , reject     = capability.reject;
	    var abrupt = perform(function(){
	      var values    = []
	        , index     = 0
	        , remaining = 1;
	      forOf(iterable, false, function(promise){
	        var $index        = index++
	          , alreadyCalled = false;
	        values.push(undefined);
	        remaining++;
	        C.resolve(promise).then(function(value){
	          if(alreadyCalled)return;
	          alreadyCalled  = true;
	          values[$index] = value;
	          --remaining || resolve(values);
	        }, reject);
	      });
	      --remaining || resolve(values);
	    });
	    if(abrupt)reject(abrupt.error);
	    return capability.promise;
	  },
	  // 25.4.4.4 Promise.race(iterable)
	  race: function race(iterable){
	    var C          = this
	      , capability = newPromiseCapability(C)
	      , reject     = capability.reject;
	    var abrupt = perform(function(){
	      forOf(iterable, false, function(promise){
	        C.resolve(promise).then(capability.resolve, reject);
	      });
	    });
	    if(abrupt)reject(abrupt.error);
	    return capability.promise;
	  }
	});
	});

	var promise$1 = createCommonjsModule(function (module) {
	module.exports = _core.Promise;
	});

	var promise = createCommonjsModule(function (module) {
	module.exports = { "default": promise$1, __esModule: true };
	});

	var _Promise = unwrapExports(promise);

	var shouldType = createCommonjsModule(function (module) {
	'use strict';

	var types = {
	  NUMBER: 'number',
	  UNDEFINED: 'undefined',
	  STRING: 'string',
	  BOOLEAN: 'boolean',
	  OBJECT: 'object',
	  FUNCTION: 'function',
	  NULL: 'null',
	  ARRAY: 'array',
	  REGEXP: 'regexp',
	  DATE: 'date',
	  ERROR: 'error',
	  ARGUMENTS: 'arguments',
	  SYMBOL: 'symbol',
	  ARRAY_BUFFER: 'array-buffer',
	  TYPED_ARRAY: 'typed-array',
	  DATA_VIEW: 'data-view',
	  MAP: 'map',
	  SET: 'set',
	  WEAK_SET: 'weak-set',
	  WEAK_MAP: 'weak-map',
	  PROMISE: 'promise',

	// node buffer
	  BUFFER: 'buffer',

	// dom html element
	  HTML_ELEMENT: 'html-element',
	  HTML_ELEMENT_TEXT: 'html-element-text',
	  DOCUMENT: 'document',
	  WINDOW: 'window',
	  FILE: 'file',
	  FILE_LIST: 'file-list',
	  BLOB: 'blob',

	  HOST: 'host',

	  XHR: 'xhr',

	  // simd
	  SIMD: 'simd'
	};

	/*
	 * Simple data function to store type information
	 * @param {string} type Usually what is returned from typeof
	 * @param {string} cls  Sanitized @Class via Object.prototype.toString
	 * @param {string} sub  If type and cls the same, and need to specify somehow
	 * @private
	 * @example
	 *
	 * //for null
	 * new Type('null');
	 *
	 * //for Date
	 * new Type('object', 'date');
	 *
	 * //for Uint8Array
	 *
	 * new Type('object', 'typed-array', 'uint8');
	 */
	function Type(type, cls, sub) {
	  if (!type) {
	    throw new Error('Type class must be initialized at least with `type` information');
	  }
	  this.type = type;
	  this.cls = cls;
	  this.sub = sub;
	}

	Type.prototype = {
	  toString: function(sep) {
	    sep = sep || ';';
	    var str = [this.type];
	    if (this.cls) {
	      str.push(this.cls);
	    }
	    if (this.sub) {
	      str.push(this.sub);
	    }
	    return str.join(sep);
	  },

	  toTryTypes: function() {
	    var _types = [];
	    if (this.sub) {
	      _types.push(new Type(this.type, this.cls, this.sub));
	    }
	    if (this.cls) {
	      _types.push(new Type(this.type, this.cls));
	    }
	    _types.push(new Type(this.type));

	    return _types;
	  }
	};

	var toString = Object.prototype.toString;



	/**
	 * Function to store type checks
	 * @private
	 */
	function TypeChecker() {
	  this.checks = [];
	}

	TypeChecker.prototype = {
	  add: function(func) {
	    this.checks.push(func);
	    return this;
	  },

	  addBeforeFirstMatch: function(obj, func) {
	    var match = this.getFirstMatch(obj);
	    if (match) {
	      this.checks.splice(match.index, 0, func);
	    } else {
	      this.add(func);
	    }
	  },

	  addTypeOf: function(type, res) {
	    return this.add(function(obj, tpeOf) {
	      if (tpeOf === type) {
	        return new Type(res);
	      }
	    });
	  },

	  addClass: function(cls, res, sub) {
	    return this.add(function(obj, tpeOf, objCls) {
	      if (objCls === cls) {
	        return new Type(types.OBJECT, res, sub);
	      }
	    });
	  },

	  getFirstMatch: function(obj) {
	    var typeOf = typeof obj;
	    var cls = toString.call(obj);

	    for (var i = 0, l = this.checks.length; i < l; i++) {
	      var res = this.checks[i].call(this, obj, typeOf, cls);
	      if (typeof res !== 'undefined') {
	        return { result: res, func: this.checks[i], index: i };
	      }
	    }
	  },

	  getType: function(obj) {
	    var match = this.getFirstMatch(obj);
	    return match && match.result;
	  }
	};

	var main = new TypeChecker();

	//TODO add iterators

	main
	  .addTypeOf(types.NUMBER, types.NUMBER)
	  .addTypeOf(types.UNDEFINED, types.UNDEFINED)
	  .addTypeOf(types.STRING, types.STRING)
	  .addTypeOf(types.BOOLEAN, types.BOOLEAN)
	  .addTypeOf(types.FUNCTION, types.FUNCTION)
	  .addTypeOf(types.SYMBOL, types.SYMBOL)
	  .add(function(obj) {
	    if (obj === null) {
	      return new Type(types.NULL);
	    }
	  })
	  .addClass('[object String]', types.STRING)
	  .addClass('[object Boolean]', types.BOOLEAN)
	  .addClass('[object Number]', types.NUMBER)
	  .addClass('[object Array]', types.ARRAY)
	  .addClass('[object RegExp]', types.REGEXP)
	  .addClass('[object Error]', types.ERROR)
	  .addClass('[object Date]', types.DATE)
	  .addClass('[object Arguments]', types.ARGUMENTS)

	  .addClass('[object ArrayBuffer]', types.ARRAY_BUFFER)
	  .addClass('[object Int8Array]', types.TYPED_ARRAY, 'int8')
	  .addClass('[object Uint8Array]', types.TYPED_ARRAY, 'uint8')
	  .addClass('[object Uint8ClampedArray]', types.TYPED_ARRAY, 'uint8clamped')
	  .addClass('[object Int16Array]', types.TYPED_ARRAY, 'int16')
	  .addClass('[object Uint16Array]', types.TYPED_ARRAY, 'uint16')
	  .addClass('[object Int32Array]', types.TYPED_ARRAY, 'int32')
	  .addClass('[object Uint32Array]', types.TYPED_ARRAY, 'uint32')
	  .addClass('[object Float32Array]', types.TYPED_ARRAY, 'float32')
	  .addClass('[object Float64Array]', types.TYPED_ARRAY, 'float64')

	  .addClass('[object Bool16x8]', types.SIMD, 'bool16x8')
	  .addClass('[object Bool32x4]', types.SIMD, 'bool32x4')
	  .addClass('[object Bool8x16]', types.SIMD, 'bool8x16')
	  .addClass('[object Float32x4]', types.SIMD, 'float32x4')
	  .addClass('[object Int16x8]', types.SIMD, 'int16x8')
	  .addClass('[object Int32x4]', types.SIMD, 'int32x4')
	  .addClass('[object Int8x16]', types.SIMD, 'int8x16')
	  .addClass('[object Uint16x8]', types.SIMD, 'uint16x8')
	  .addClass('[object Uint32x4]', types.SIMD, 'uint32x4')
	  .addClass('[object Uint8x16]', types.SIMD, 'uint8x16')

	  .addClass('[object DataView]', types.DATA_VIEW)
	  .addClass('[object Map]', types.MAP)
	  .addClass('[object WeakMap]', types.WEAK_MAP)
	  .addClass('[object Set]', types.SET)
	  .addClass('[object WeakSet]', types.WEAK_SET)
	  .addClass('[object Promise]', types.PROMISE)
	  .addClass('[object Blob]', types.BLOB)
	  .addClass('[object File]', types.FILE)
	  .addClass('[object FileList]', types.FILE_LIST)
	  .addClass('[object XMLHttpRequest]', types.XHR)
	  .add(function(obj) {
	    if ((typeof Promise === types.FUNCTION && obj instanceof Promise) ||
	        (typeof obj.then === types.FUNCTION)) {
	          return new Type(types.OBJECT, types.PROMISE);
	        }
	  })
	  .add(function(obj) {
	    if (typeof Buffer !== 'undefined' && obj instanceof Buffer) {// eslint-disable-line no-undef
	      return new Type(types.OBJECT, types.BUFFER);
	    }
	  })
	  .add(function(obj) {
	    if (typeof Node !== 'undefined' && obj instanceof Node) {
	      return new Type(types.OBJECT, types.HTML_ELEMENT, obj.nodeName);
	    }
	  })
	  .add(function(obj) {
	    // probably at the begginging should be enough these checks
	    if (obj.Boolean === Boolean && obj.Number === Number && obj.String === String && obj.Date === Date) {
	      return new Type(types.OBJECT, types.HOST);
	    }
	  })
	  .add(function() {
	    return new Type(types.OBJECT);
	  });

	/**
	 * Get type information of anything
	 *
	 * @param  {any} obj Anything that could require type information
	 * @return {Type}    type info
	 * @private
	 */
	function getGlobalType(obj) {
	  return main.getType(obj);
	}

	getGlobalType.checker = main;
	getGlobalType.TypeChecker = TypeChecker;
	getGlobalType.Type = Type;

	Object.keys(types).forEach(function(typeName) {
	  getGlobalType[typeName] = types[typeName];
	});

	module.exports = getGlobalType;
	});

	var shouldEqual = createCommonjsModule(function (module) {
	'use strict';

	function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

	var t = _interopDefault(shouldType);

	function format(msg) {
	  var args = arguments;
	  for (var i = 1, l = args.length; i < l; i++) {
	    msg = msg.replace(/%s/, args[i]);
	  }
	  return msg;
	}

	var hasOwnProperty = Object.prototype.hasOwnProperty;

	function EqualityFail(a, b, reason, path) {
	  this.a = a;
	  this.b = b;
	  this.reason = reason;
	  this.path = path;
	}

	function typeToString(tp) {
	  return tp.type + (tp.cls ? '(' + tp.cls + (tp.sub ? ' ' + tp.sub : '') + ')' : '');
	}

	var  PLUS_0_AND_MINUS_0 = '+0 is not equal to -0';
	var  DIFFERENT_TYPES = 'A has type %s and B has type %s';
	var  EQUALITY = 'A is not equal to B';
	var  EQUALITY_PROTOTYPE = 'A and B have different prototypes';
	var  WRAPPED_VALUE = 'A wrapped value is not equal to B wrapped value';
	var  FUNCTION_SOURCES = 'function A is not equal to B by source code value (via .toString call)';
	var  MISSING_KEY = '%s has no key %s';
	var  SET_MAP_MISSING_KEY = 'Set/Map missing key %s';


	var DEFAULT_OPTIONS = {
	  checkProtoEql: true,
	  checkSubType: true,
	  plusZeroAndMinusZeroEqual: true,
	  collectAllFails: false
	};

	function setBooleanDefault(property, obj, opts, defaults) {
	  obj[property] = typeof opts[property] !== 'boolean' ? defaults[property] : opts[property];
	}

	var METHOD_PREFIX = '_check_';

	function EQ(opts, a, b, path) {
	  opts = opts || {};

	  setBooleanDefault('checkProtoEql', this, opts, DEFAULT_OPTIONS);
	  setBooleanDefault('plusZeroAndMinusZeroEqual', this, opts, DEFAULT_OPTIONS);
	  setBooleanDefault('checkSubType', this, opts, DEFAULT_OPTIONS);
	  setBooleanDefault('collectAllFails', this, opts, DEFAULT_OPTIONS);

	  this.a = a;
	  this.b = b;

	  this._meet = opts._meet || [];

	  this.fails = opts.fails || [];

	  this.path = path || [];
	}

	function ShortcutError(fail) {
	  this.name = 'ShortcutError';
	  this.message = 'fail fast';
	  this.fail = fail;
	}

	ShortcutError.prototype = Object.create(Error.prototype);

	EQ.checkStrictEquality = function(a, b) {
	  this.collectFail(a !== b, EQUALITY);
	};

	EQ.add = function add(type, cls, sub, f) {
	  var args = Array.prototype.slice.call(arguments);
	  f = args.pop();
	  EQ.prototype[METHOD_PREFIX + args.join('_')] = f;
	};

	EQ.prototype = {
	  check: function() {
	    try {
	      this.check0();
	    } catch (e) {
	      if (e instanceof ShortcutError) {
	        return [e.fail];
	      }
	      throw e;
	    }
	    return this.fails;
	  },

	  check0: function() {
	    var a = this.a;
	    var b = this.b;

	    // equal a and b exit early
	    if (a === b) {
	      // check for +0 !== -0;
	      return this.collectFail(a === 0 && (1 / a !== 1 / b) && !this.plusZeroAndMinusZeroEqual, PLUS_0_AND_MINUS_0);
	    }

	    var typeA = t(a);
	    var typeB = t(b);

	    // if objects has different types they are not equal
	    if (typeA.type !== typeB.type || typeA.cls !== typeB.cls || typeA.sub !== typeB.sub) {
	      return this.collectFail(true, format(DIFFERENT_TYPES, typeToString(typeA), typeToString(typeB)));
	    }

	    // as types the same checks type specific things
	    var name1 = typeA.type, name2 = typeA.type;
	    if (typeA.cls) {
	      name1 += '_' + typeA.cls;
	      name2 += '_' + typeA.cls;
	    }
	    if (typeA.sub) {
	      name2 += '_' + typeA.sub;
	    }

	    var f = this[METHOD_PREFIX + name2] || this[METHOD_PREFIX + name1] || this[METHOD_PREFIX + typeA.type] || this.defaultCheck;

	    f.call(this, this.a, this.b);
	  },

	  collectFail: function(comparison, reason, showReason) {
	    if (comparison) {
	      var res = new EqualityFail(this.a, this.b, reason, this.path);
	      res.showReason = !!showReason;

	      this.fails.push(res);

	      if (!this.collectAllFails) {
	        throw new ShortcutError(res);
	      }
	    }
	  },

	  checkPlainObjectsEquality: function(a, b) {
	    // compare deep objects and arrays
	    // stacks contain references only
	    //
	    var meet = this._meet;
	    var m = this._meet.length;
	    while (m--) {
	      var st = meet[m];
	      if (st[0] === a && st[1] === b) {
	        return;
	      }
	    }

	    // add `a` and `b` to the stack of traversed objects
	    meet.push([a, b]);

	    // TODO maybe something else like getOwnPropertyNames
	    var key;
	    for (key in b) {
	      if (hasOwnProperty.call(b, key)) {
	        if (hasOwnProperty.call(a, key)) {
	          this.checkPropertyEquality(key);
	        } else {
	          this.collectFail(true, format(MISSING_KEY, 'A', key));
	        }
	      }
	    }

	    // ensure both objects have the same number of properties
	    for (key in a) {
	      if (hasOwnProperty.call(a, key)) {
	        this.collectFail(!hasOwnProperty.call(b, key), format(MISSING_KEY, 'B', key));
	      }
	    }

	    meet.pop();

	    if (this.checkProtoEql) {
	      //TODO should i check prototypes for === or use eq?
	      this.collectFail(Object.getPrototypeOf(a) !== Object.getPrototypeOf(b), EQUALITY_PROTOTYPE, true);
	    }

	  },

	  checkPropertyEquality: function(propertyName) {
	    var _eq = new EQ(this, this.a[propertyName], this.b[propertyName], this.path.concat([propertyName]));
	    _eq.check0();
	  },

	  defaultCheck: EQ.checkStrictEquality
	};


	EQ.add(t.NUMBER, function(a, b) {
	  this.collectFail((a !== a && b === b) || (b !== b && a === a) || (a !== b && a === a && b === b), EQUALITY);
	});

	[t.SYMBOL, t.BOOLEAN, t.STRING].forEach(function(tp) {
	  EQ.add(tp, EQ.checkStrictEquality);
	});

	EQ.add(t.FUNCTION, function(a, b) {
	  // functions are compared by their source code
	  this.collectFail(a.toString() !== b.toString(), FUNCTION_SOURCES);
	  // check user properties
	  this.checkPlainObjectsEquality(a, b);
	});

	EQ.add(t.OBJECT, t.REGEXP, function(a, b) {
	  // check regexp flags
	  var flags = ['source', 'global', 'multiline', 'lastIndex', 'ignoreCase', 'sticky', 'unicode'];
	  while (flags.length) {
	    this.checkPropertyEquality(flags.shift());
	  }
	  // check user properties
	  this.checkPlainObjectsEquality(a, b);
	});

	EQ.add(t.OBJECT, t.DATE, function(a, b) {
	  //check by timestamp only (using .valueOf)
	  this.collectFail(+a !== +b, EQUALITY);
	  // check user properties
	  this.checkPlainObjectsEquality(a, b);
	});

	[t.NUMBER, t.BOOLEAN, t.STRING].forEach(function(tp) {
	  EQ.add(t.OBJECT, tp, function(a, b) {
	    //primitive type wrappers
	    this.collectFail(a.valueOf() !== b.valueOf(), WRAPPED_VALUE);
	    // check user properties
	    this.checkPlainObjectsEquality(a, b);
	  });
	});

	EQ.add(t.OBJECT, function(a, b) {
	  this.checkPlainObjectsEquality(a, b);
	});

	[t.ARRAY, t.ARGUMENTS, t.TYPED_ARRAY].forEach(function(tp) {
	  EQ.add(t.OBJECT, tp, function(a, b) {
	    this.checkPropertyEquality('length');

	    this.checkPlainObjectsEquality(a, b);
	  });
	});

	EQ.add(t.OBJECT, t.ARRAY_BUFFER, function(a, b) {
	  this.checkPropertyEquality('byteLength');

	  this.checkPlainObjectsEquality(a, b);
	});

	EQ.add(t.OBJECT, t.ERROR, function(a, b) {
	  this.checkPropertyEquality('name');
	  this.checkPropertyEquality('message');

	  this.checkPlainObjectsEquality(a, b);
	});

	EQ.add(t.OBJECT, t.BUFFER, function(a) {
	  this.checkPropertyEquality('length');

	  var l = a.length;
	  while (l--) {
	    this.checkPropertyEquality(l);
	  }

	  //we do not check for user properties because
	  //node Buffer have some strange hidden properties
	});

	[t.MAP, t.SET, t.WEAK_MAP, t.WEAK_SET].forEach(function(tp) {
	  EQ.add(t.OBJECT, tp, function(a, b) {
	    this._meet.push([a, b]);

	    var iteratorA = a.entries();
	    for (var nextA = iteratorA.next(); !nextA.done; nextA = iteratorA.next()) {

	      var iteratorB = b.entries();
	      var keyFound = false;
	      for (var nextB = iteratorB.next(); !nextB.done; nextB = iteratorB.next()) {
	        // try to check keys first
	        var r = eq(nextA.value[0], nextB.value[0], { collectAllFails: false, _meet: this._meet });

	        if (r.length === 0) {
	          keyFound = true;

	          // check values also
	          eq(nextA.value[1], nextB.value[1], this);
	        }
	      }

	      if (!keyFound) {
	        // no such key at all
	        this.collectFail(true, format(SET_MAP_MISSING_KEY, nextA.value[0]));
	      }
	    }

	    this._meet.pop();

	    this.checkPlainObjectsEquality(a, b);
	  });
	});


	function eq(a, b, opts) {
	  return new EQ(opts, a, b).check();
	}

	eq.EQ = EQ;

	module.exports = eq;
	});

	var shouldUtil = createCommonjsModule(function (module, exports) {
	'use strict';

	Object.defineProperty(exports, '__esModule', { value: true });

	var _hasOwnProperty = Object.prototype.hasOwnProperty;
	var _propertyIsEnumerable = Object.prototype.propertyIsEnumerable;

	function hasOwnProperty(obj, key) {
	  return _hasOwnProperty.call(obj, key);
	}

	function propertyIsEnumerable(obj, key) {
	  return _propertyIsEnumerable.call(obj, key);
	}

	function merge(a, b) {
	  if (a && b) {
	    for (var key in b) {
	      a[key] = b[key];
	    }
	  }
	  return a;
	}

	function isIterator(obj) {
	  if (!obj) {
	    return false;
	  }

	  if (obj.__shouldIterator__) {
	    return true;
	  }

	  return typeof obj.next === 'function' &&
	    typeof Symbol === 'function' &&
	    typeof Symbol.iterator === 'symbol' &&
	    typeof obj[Symbol.iterator] === 'function' &&
	    obj[Symbol.iterator]() === obj;
	}

	//TODO find better way
	function isGeneratorFunction(f) {
	  return typeof f === 'function' && /^function\s*\*\s*/.test(f.toString());
	}

	exports.hasOwnProperty = hasOwnProperty;
	exports.propertyIsEnumerable = propertyIsEnumerable;
	exports.merge = merge;
	exports.isIterator = isIterator;
	exports.isGeneratorFunction = isGeneratorFunction;
	});

	var shouldTypeAdaptors = createCommonjsModule(function (module, exports) {
	'use strict';

	Object.defineProperty(exports, '__esModule', { value: true });

	function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

	var shouldUtil$$1 = shouldUtil;
	var t = _interopDefault(shouldType);

	// TODO in future add generators instead of forEach and iterator implementation


	function ObjectIterator(obj) {
	  this._obj = obj;
	}

	ObjectIterator.prototype = {
	  __shouldIterator__: true, // special marker

	  next: function() {
	    if (this._done) {
	      throw new Error('Iterator already reached the end');
	    }

	    if (!this._keys) {
	      this._keys = Object.keys(this._obj);
	      this._index = 0;
	    }

	    var key = this._keys[this._index];
	    this._done = this._index === this._keys.length;
	    this._index += 1;

	    return {
	      value: this._done ? void 0: [key, this._obj[key]],
	      done: this._done
	    };
	  }
	};

	if (typeof Symbol === 'function' && typeof Symbol.iterator === 'symbol') {
	  ObjectIterator.prototype[Symbol.iterator] = function() {
	    return this;
	  };
	}


	function TypeAdaptorStorage() {
	  this._typeAdaptors = [];
	  this._iterableTypes = {};
	}

	TypeAdaptorStorage.prototype = {
	  add: function(type, cls, sub, adaptor) {
	    return this.addType(new t.Type(type, cls, sub), adaptor);
	  },

	  addType: function(type, adaptor) {
	    this._typeAdaptors[type.toString()] = adaptor;
	  },

	  getAdaptor: function(tp, funcName) {
	    var tries = tp.toTryTypes();
	    while (tries.length) {
	      var toTry = tries.shift();
	      var ad = this._typeAdaptors[toTry];
	      if (ad && ad[funcName]) {
	        return ad[funcName];
	      }
	    }
	  },

	  requireAdaptor: function(tp, funcName) {
	    var a = this.getAdaptor(tp, funcName);
	    if (!a) {
	      throw new Error('There is no type adaptor `' + funcName + '` for ' + tp.toString());
	    }
	    return a;
	  },

	  addIterableType: function(tp) {
	    this._iterableTypes[tp.toString()] = true;
	  },

	  isIterableType: function(tp) {
	    return !!this._iterableTypes[tp.toString()];
	  }
	};

	var defaultTypeAdaptorStorage = new TypeAdaptorStorage();

	// default for objects
	defaultTypeAdaptorStorage.addType(new t.Type(t.OBJECT), {
	  forEach: function(obj, f, context) {
	    for (var prop in obj) {
	      if (shouldUtil$$1.hasOwnProperty(obj, prop) && shouldUtil$$1.propertyIsEnumerable(obj, prop)) {
	        if (f.call(context, obj[prop], prop, obj) === false) {
	          return;
	        }
	      }
	    }
	  },

	  has: function(obj, prop) {
	    return shouldUtil$$1.hasOwnProperty(obj, prop);
	  },

	  get: function(obj, prop) {
	    return obj[prop];
	  },

	  iterator: function(obj) {
	    return new ObjectIterator(obj);
	  }
	});

	var mapAdaptor = {
	  has: function(obj, key) {
	    return obj.has(key);
	  },

	  get: function(obj, key) {
	    return obj.get(key);
	  },

	  forEach: function(obj, f, context) {
	    var iter = obj.entries();
	    forEach(iter, function(value) {
	      return f.call(context, value[1], value[0], obj);
	    });
	  },

	  size: function(obj) {
	    return obj.size;
	  },

	  isEmpty: function(obj) {
	    return obj.size === 0;
	  },

	  iterator: function(obj) {
	    return obj.entries();
	  }
	};

	var setAdaptor = shouldUtil$$1.merge({}, mapAdaptor);
	setAdaptor.get = function(obj, key) {
	  if (obj.has(key)) {
	    return key;
	  }
	};

	defaultTypeAdaptorStorage.addType(new t.Type(t.OBJECT, t.MAP), mapAdaptor);
	defaultTypeAdaptorStorage.addType(new t.Type(t.OBJECT, t.SET), setAdaptor);
	defaultTypeAdaptorStorage.addType(new t.Type(t.OBJECT, t.WEAK_SET), setAdaptor);
	defaultTypeAdaptorStorage.addType(new t.Type(t.OBJECT, t.WEAK_MAP), mapAdaptor);

	defaultTypeAdaptorStorage.addType(new t.Type(t.STRING), {
	  isEmpty: function(obj) {
	    return obj === '';
	  },

	  size: function(obj) {
	    return obj.length;
	  }
	});

	defaultTypeAdaptorStorage.addIterableType(new t.Type(t.OBJECT, t.ARRAY));
	defaultTypeAdaptorStorage.addIterableType(new t.Type(t.OBJECT, t.ARGUMENTS));

	function forEach(obj, f, context) {
	  if (shouldUtil$$1.isGeneratorFunction(obj)) {
	    return forEach(obj(), f, context);
	  } else if (shouldUtil$$1.isIterator(obj)) {
	    var value = obj.next();
	    while (!value.done) {
	      if (f.call(context, value.value, 'value', obj) === false) {
	        return;
	      }
	      value = obj.next();
	    }
	  } else {
	    var type = t(obj);
	    var func = defaultTypeAdaptorStorage.requireAdaptor(type, 'forEach');
	    func(obj, f, context);
	  }
	}


	function size(obj) {
	  var type = t(obj);
	  var func = defaultTypeAdaptorStorage.getAdaptor(type, 'size');
	  if (func) {
	    return func(obj);
	  } else {
	    var len = 0;
	    forEach(obj, function() {
	      len += 1;
	    });
	    return len;
	  }
	}

	function isEmpty(obj) {
	  var type = t(obj);
	  var func = defaultTypeAdaptorStorage.getAdaptor(type, 'isEmpty');
	  if (func) {
	    return func(obj);
	  } else {
	    var res = true;
	    forEach(obj, function() {
	      res = false;
	      return false;
	    });
	    return res;
	  }
	}

	// return boolean if obj has such 'key'
	function has(obj, key) {
	  var type = t(obj);
	  var func = defaultTypeAdaptorStorage.requireAdaptor(type, 'has');
	  return func(obj, key);
	}

	// return value for given key
	function get(obj, key) {
	  var type = t(obj);
	  var func = defaultTypeAdaptorStorage.requireAdaptor(type, 'get');
	  return func(obj, key);
	}

	function reduce(obj, f, initialValue) {
	  var res = initialValue;
	  forEach(obj, function(value, key) {
	    res = f(res, value, key, obj);
	  });
	  return res;
	}

	function some(obj, f, context) {
	  var res = false;
	  forEach(obj, function(value, key) {
	    if (f.call(context, value, key, obj)) {
	      res = true;
	      return false;
	    }
	  }, context);
	  return res;
	}

	function every(obj, f, context) {
	  var res = true;
	  forEach(obj, function(value, key) {
	    if (!f.call(context, value, key, obj)) {
	      res = false;
	      return false;
	    }
	  }, context);
	  return res;
	}

	function isIterable(obj) {
	  return defaultTypeAdaptorStorage.isIterableType(t(obj));
	}

	function iterator(obj) {
	  return defaultTypeAdaptorStorage.requireAdaptor(t(obj), 'iterator')(obj);
	}

	exports.defaultTypeAdaptorStorage = defaultTypeAdaptorStorage;
	exports.forEach = forEach;
	exports.size = size;
	exports.isEmpty = isEmpty;
	exports.has = has;
	exports.get = get;
	exports.reduce = reduce;
	exports.some = some;
	exports.every = every;
	exports.isIterable = isIterable;
	exports.iterator = iterator;
	});

	var shouldFormat = createCommonjsModule(function (module) {
	'use strict';

	function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

	var t = _interopDefault(shouldType);
	var shouldTypeAdaptors$$1 = shouldTypeAdaptors;

	function looksLikeANumber(n) {
	  return !!n.match(/\d+/);
	}

	function keyCompare(a, b) {
	  var aNum = looksLikeANumber(a);
	  var bNum = looksLikeANumber(b);
	  if (aNum && bNum) {
	    return 1*a - 1*b;
	  } else if (aNum && !bNum) {
	    return -1;
	  } else if (!aNum && bNum) {
	    return 1;
	  } else {
	    return a.localeCompare(b);
	  }
	}

	function genKeysFunc(f) {
	  return function(value) {
	    var k = f(value);
	    k.sort(keyCompare);
	    return k;
	  };
	}

	function Formatter(opts) {
	  opts = opts || {};

	  this.seen = [];

	  var keysFunc;
	  if (typeof opts.keysFunc === 'function') {
	    keysFunc = opts.keysFunc;
	  } else if (opts.keys === false) {
	    keysFunc = Object.getOwnPropertyNames;
	  } else {
	    keysFunc = Object.keys;
	  }

	  this.getKeys = genKeysFunc(keysFunc);

	  this.maxLineLength = typeof opts.maxLineLength === 'number' ? opts.maxLineLength : 60;
	  this.propSep = opts.propSep || ',';

	  this.isUTCdate = !!opts.isUTCdate;
	}



	Formatter.prototype = {
	  constructor: Formatter,

	  format: function(value) {
	    var tp = t(value);

	    if (tp.type === t.OBJECT && this.alreadySeen(value)) {
	      return '[Circular]';
	    }

	    var tries = tp.toTryTypes();
	    var f = this.defaultFormat;
	    while (tries.length) {
	      var toTry = tries.shift();
	      var name = Formatter.formatterFunctionName(toTry);
	      if (this[name]) {
	        f = this[name];
	        break;
	      }
	    }
	    return f.call(this, value).trim();
	  },

	  defaultFormat: function(obj) {
	    return String(obj);
	  },

	  alreadySeen: function(value) {
	    return this.seen.indexOf(value) >= 0;
	  }

	};

	Formatter.addType = function addType(tp, f) {
	  Formatter.prototype[Formatter.formatterFunctionName(tp)] = f;
	};

	Formatter.formatterFunctionName = function formatterFunctionName(tp) {
	  return '_format_' + tp.toString('_');
	};

	var EOL = '\n';

	function indent(v, indentation) {
	  return v
	    .split(EOL)
	    .map(function(vv) {
	      return indentation + vv;
	    })
	    .join(EOL);
	}

	function pad(str, value, filler) {
	  str = String(str);
	  var isRight = false;

	  if (value < 0) {
	    isRight = true;
	    value = -value;
	  }

	  if (str.length < value) {
	    var padding = new Array(value - str.length + 1).join(filler);
	    return isRight ? str + padding : padding + str;
	  } else {
	    return str;
	  }
	}

	function pad0(str, value) {
	  return pad(str, value, '0');
	}

	var functionNameRE = /^\s*function\s*(\S*)\s*\(/;

	function functionName(f) {
	  if (f.name) {
	    return f.name;
	  }
	  var matches = f.toString().match(functionNameRE);
	  if (matches === null) {
	    // `functionNameRE` doesn't match arrow functions.
	    return '';
	  }
	  var name = matches[1];
	  return name;
	}

	function constructorName(obj) {
	  while (obj) {
	    var descriptor = Object.getOwnPropertyDescriptor(obj, 'constructor');
	    if (descriptor !== undefined &&  typeof descriptor.value === 'function') {
	      var name = functionName(descriptor.value);
	      if (name !== '') {
	        return name;
	      }
	    }

	    obj = Object.getPrototypeOf(obj);
	  }
	}

	var INDENT = '  ';

	function addSpaces(str) {
	  return indent(str, INDENT);
	}

	function typeAdaptorForEachFormat(obj, opts) {
	  opts = opts || {};
	  var filterKey = opts.filterKey || function() { return true; };

	  var formatKey = opts.formatKey || this.format;
	  var formatValue = opts.formatValue || this.format;

	  var keyValueSep = typeof opts.keyValueSep !== 'undefined' ? opts.keyValueSep : ': ';

	  this.seen.push(obj);

	  var formatLength = 0;
	  var pairs = [];

	  shouldTypeAdaptors$$1.forEach(obj, function(value, key) {
	    if (!filterKey(key)) {
	      return;
	    }

	    var formattedKey = formatKey.call(this, key);
	    var formattedValue = formatValue.call(this, value, key);

	    var pair = formattedKey ? (formattedKey + keyValueSep + formattedValue) : formattedValue;

	    formatLength += pair.length;
	    pairs.push(pair);
	  }, this);

	  this.seen.pop();

	  (opts.additionalKeys || []).forEach(function(keyValue) {
	    var pair = keyValue[0] + keyValueSep + this.format(keyValue[1]);
	    formatLength += pair.length;
	    pairs.push(pair);
	  }, this);

	  var prefix = opts.prefix || constructorName(obj) || '';
	  if (prefix.length > 0) {
	    prefix += ' ';
	  }

	  var lbracket, rbracket;
	  if (Array.isArray(opts.brackets)) {
	    lbracket = opts.brackets[0];
	    rbracket = opts.brackets[1];
	  } else {
	    lbracket = '{';
	    rbracket = '}';
	  }

	  var rootValue = opts.value || '';

	  if (pairs.length === 0) {
	    return rootValue || (prefix + lbracket + rbracket);
	  }

	  if (formatLength <= this.maxLineLength) {
	    return prefix + lbracket + ' ' + (rootValue ? rootValue + ' ' : '') + pairs.join(this.propSep + ' ') + ' ' + rbracket;
	  } else {
	    return prefix + lbracket + '\n' + (rootValue ? '  ' + rootValue + '\n' : '') + pairs.map(addSpaces).join(this.propSep + '\n') + '\n' + rbracket;
	  }
	}

	function formatPlainObjectKey(key) {
	  return typeof key === 'string' && key.match(/^[a-zA-Z_$][a-zA-Z_$0-9]*$/) ? key : this.format(key);
	}

	function getPropertyDescriptor(obj, key) {
	  var desc;
	  try {
	    desc = Object.getOwnPropertyDescriptor(obj, key) || { value: obj[key] };
	  } catch (e) {
	    desc = { value: e };
	  }
	  return desc;
	}

	function formatPlainObjectValue(obj, key) {
	  var desc = getPropertyDescriptor(obj, key);
	  if (desc.get && desc.set) {
	    return '[Getter/Setter]';
	  }
	  if (desc.get) {
	    return '[Getter]';
	  }
	  if (desc.set) {
	    return '[Setter]';
	  }

	  return this.format(desc.value);
	}

	function formatPlainObject(obj, opts) {
	  opts = opts || {};
	  opts.keyValueSep = ': ';
	  opts.formatKey = opts.formatKey || formatPlainObjectKey;
	  opts.formatValue = opts.formatValue || function(value, key) {
	    return formatPlainObjectValue.call(this, obj, key);
	  };
	  return typeAdaptorForEachFormat.call(this, obj, opts);
	}

	function formatWrapper1(value) {
	  return formatPlainObject.call(this, value, {
	    additionalKeys: [['[[PrimitiveValue]]', value.valueOf()]]
	  });
	}


	function formatWrapper2(value) {
	  var realValue = value.valueOf();

	  return formatPlainObject.call(this, value, {
	    filterKey: function(key) {
	      //skip useless indexed properties
	      return !(key.match(/\d+/) && parseInt(key, 10) < realValue.length);
	    },
	    additionalKeys: [['[[PrimitiveValue]]', realValue]]
	  });
	}

	function formatRegExp(value) {
	  return formatPlainObject.call(this, value, {
	    value: String(value)
	  });
	}

	function formatFunction(value) {
	  var obj = {};
	  Object.keys(value).forEach(function(key) {
	    obj[key] = value[key];
	  });
	  return formatPlainObject.call(this, obj, {
	    prefix: 'Function',
	    additionalKeys: [['name', functionName(value)]]
	  });
	}

	function formatArray(value) {
	  return formatPlainObject.call(this, value, {
	    formatKey: function(key) {
	      if (!key.match(/\d+/)) {
	        return formatPlainObjectKey.call(this, key);
	      }
	    },
	    brackets: ['[', ']']
	  });
	}

	function formatArguments(value) {
	  return formatPlainObject.call(this, value, {
	    formatKey: function(key) {
	      if (!key.match(/\d+/)) {
	        return formatPlainObjectKey.call(this, key);
	      }
	    },
	    brackets: ['[', ']'],
	    prefix: 'Arguments'
	  });
	}

	function _formatDate(value, isUTC) {
	  var prefix = isUTC ? 'UTC' : '';

	  var date = value['get' + prefix + 'FullYear']() +
	    '-' +
	    pad0(value['get' + prefix + 'Month']() + 1, 2) +
	    '-' +
	    pad0(value['get' + prefix + 'Date'](), 2);

	  var time = pad0(value['get' + prefix + 'Hours'](), 2) +
	    ':' +
	    pad0(value['get' + prefix + 'Minutes'](), 2) +
	    ':' +
	    pad0(value['get' + prefix + 'Seconds'](), 2) +
	    '.' +
	    pad0(value['get' + prefix + 'Milliseconds'](), 3);

	  var to = value.getTimezoneOffset();
	  var absTo = Math.abs(to);
	  var hours = Math.floor(absTo / 60);
	  var minutes = absTo - hours * 60;
	  var tzFormat = (to < 0 ? '+' : '-') + pad0(hours, 2) + pad0(minutes, 2);

	  return date + ' ' + time + (isUTC ? '' : ' ' + tzFormat);
	}

	function formatDate(value) {
	  return formatPlainObject.call(this, value, { value: _formatDate(value, this.isUTCdate) });
	}

	function formatError(value) {
	  return formatPlainObject.call(this, value, {
	    prefix: value.name,
	    additionalKeys: [['message', value.message]]
	  });
	}

	function generateFormatForNumberArray(lengthProp, name, padding) {
	  return function(value) {
	    var max = this.byteArrayMaxLength || 50;
	    var length = value[lengthProp];
	    var formattedValues = [];
	    var len = 0;
	    for (var i = 0; i < max && i < length; i++) {
	      var b = value[i] || 0;
	      var v = pad0(b.toString(16), padding);
	      len += v.length;
	      formattedValues.push(v);
	    }
	    var prefix = value.constructor.name || name || '';
	    if (prefix) {
	      prefix += ' ';
	    }

	    if (formattedValues.length === 0) {
	      return prefix + '[]';
	    }

	    if (len <= this.maxLineLength) {
	      return prefix + '[ ' + formattedValues.join(this.propSep + ' ') + ' ' + ']';
	    } else {
	      return prefix + '[\n' + formattedValues.map(addSpaces).join(this.propSep + '\n') + '\n' + ']';
	    }
	  };
	}

	function formatMap(obj) {
	  return typeAdaptorForEachFormat.call(this, obj, {
	    keyValueSep: ' => '
	  });
	}

	function formatSet(obj) {
	  return typeAdaptorForEachFormat.call(this, obj, {
	    keyValueSep: '',
	    formatKey: function() { return ''; }
	  });
	}

	function genSimdVectorFormat(constructorName, length) {
	  return function(value) {
	    var Constructor = value.constructor;
	    var extractLane = Constructor.extractLane;

	    var len = 0;
	    var props = [];

	    for (var i = 0; i < length; i ++) {
	      var key = this.format(extractLane(value, i));
	      len += key.length;
	      props.push(key);
	    }

	    if (len <= this.maxLineLength) {
	      return constructorName + ' [ ' + props.join(this.propSep + ' ') + ' ]';
	    } else {
	      return constructorName + ' [\n' + props.map(addSpaces).join(this.propSep + '\n') + '\n' + ']';
	    }
	  };
	}

	function defaultFormat(value, opts) {
	  return new Formatter(opts).format(value);
	}

	defaultFormat.Formatter = Formatter;
	defaultFormat.addSpaces = addSpaces;
	defaultFormat.pad0 = pad0;
	defaultFormat.functionName = functionName;
	defaultFormat.constructorName = constructorName;
	defaultFormat.formatPlainObjectKey = formatPlainObjectKey;
	defaultFormat.typeAdaptorForEachFormat = typeAdaptorForEachFormat;
	// adding primitive types
	Formatter.addType(new t.Type(t.UNDEFINED), function() {
	  return 'undefined';
	});
	Formatter.addType(new t.Type(t.NULL), function() {
	  return 'null';
	});
	Formatter.addType(new t.Type(t.BOOLEAN), function(value) {
	  return value ? 'true': 'false';
	});
	Formatter.addType(new t.Type(t.SYMBOL), function(value) {
	  return value.toString();
	});
	Formatter.addType(new t.Type(t.NUMBER), function(value) {
	  if (value === 0 && 1 / value < 0) {
	    return '-0';
	  }
	  return String(value);
	});

	Formatter.addType(new t.Type(t.STRING), function(value) {
	  return '\'' + JSON.stringify(value).replace(/^"|"$/g, '')
	      .replace(/'/g, "\\'")
	      .replace(/\\"/g, '"') + '\'';
	});

	Formatter.addType(new t.Type(t.FUNCTION), formatFunction);

	// plain object
	Formatter.addType(new t.Type(t.OBJECT), formatPlainObject);

	// type wrappers
	Formatter.addType(new t.Type(t.OBJECT, t.NUMBER), formatWrapper1);
	Formatter.addType(new t.Type(t.OBJECT, t.BOOLEAN), formatWrapper1);
	Formatter.addType(new t.Type(t.OBJECT, t.STRING), formatWrapper2);

	Formatter.addType(new t.Type(t.OBJECT, t.REGEXP), formatRegExp);
	Formatter.addType(new t.Type(t.OBJECT, t.ARRAY), formatArray);
	Formatter.addType(new t.Type(t.OBJECT, t.ARGUMENTS), formatArguments);
	Formatter.addType(new t.Type(t.OBJECT, t.DATE), formatDate);
	Formatter.addType(new t.Type(t.OBJECT, t.ERROR), formatError);
	Formatter.addType(new t.Type(t.OBJECT, t.SET), formatSet);
	Formatter.addType(new t.Type(t.OBJECT, t.MAP), formatMap);
	Formatter.addType(new t.Type(t.OBJECT, t.WEAK_MAP), formatMap);
	Formatter.addType(new t.Type(t.OBJECT, t.WEAK_SET), formatSet);

	Formatter.addType(new t.Type(t.OBJECT, t.BUFFER), generateFormatForNumberArray('length', 'Buffer', 2));

	Formatter.addType(new t.Type(t.OBJECT, t.ARRAY_BUFFER), generateFormatForNumberArray('byteLength', 'ArrayBuffer', 2));

	Formatter.addType(new t.Type(t.OBJECT, t.TYPED_ARRAY, 'int8'), generateFormatForNumberArray('length', 'Int8Array', 2));
	Formatter.addType(new t.Type(t.OBJECT, t.TYPED_ARRAY, 'uint8'), generateFormatForNumberArray('length', 'Uint8Array', 2));
	Formatter.addType(new t.Type(t.OBJECT, t.TYPED_ARRAY, 'uint8clamped'), generateFormatForNumberArray('length', 'Uint8ClampedArray', 2));

	Formatter.addType(new t.Type(t.OBJECT, t.TYPED_ARRAY, 'int16'), generateFormatForNumberArray('length', 'Int16Array', 4));
	Formatter.addType(new t.Type(t.OBJECT, t.TYPED_ARRAY, 'uint16'), generateFormatForNumberArray('length', 'Uint16Array', 4));

	Formatter.addType(new t.Type(t.OBJECT, t.TYPED_ARRAY, 'int32'), generateFormatForNumberArray('length', 'Int32Array', 8));
	Formatter.addType(new t.Type(t.OBJECT, t.TYPED_ARRAY, 'uint32'), generateFormatForNumberArray('length', 'Uint32Array', 8));

	Formatter.addType(new t.Type(t.OBJECT, t.SIMD, 'bool16x8'), genSimdVectorFormat('Bool16x8', 8));
	Formatter.addType(new t.Type(t.OBJECT, t.SIMD, 'bool32x4'), genSimdVectorFormat('Bool32x4', 4));
	Formatter.addType(new t.Type(t.OBJECT, t.SIMD, 'bool8x16'), genSimdVectorFormat('Bool8x16', 16));
	Formatter.addType(new t.Type(t.OBJECT, t.SIMD, 'float32x4'), genSimdVectorFormat('Float32x4', 4));
	Formatter.addType(new t.Type(t.OBJECT, t.SIMD, 'int16x8'), genSimdVectorFormat('Int16x8', 8));
	Formatter.addType(new t.Type(t.OBJECT, t.SIMD, 'int32x4'), genSimdVectorFormat('Int32x4', 4));
	Formatter.addType(new t.Type(t.OBJECT, t.SIMD, 'int8x16'), genSimdVectorFormat('Int8x16', 16));
	Formatter.addType(new t.Type(t.OBJECT, t.SIMD, 'uint16x8'), genSimdVectorFormat('Uint16x8', 8));
	Formatter.addType(new t.Type(t.OBJECT, t.SIMD, 'uint32x4'), genSimdVectorFormat('Uint32x4', 4));
	Formatter.addType(new t.Type(t.OBJECT, t.SIMD, 'uint8x16'), genSimdVectorFormat('Uint8x16', 16));


	Formatter.addType(new t.Type(t.OBJECT, t.PROMISE), function() {
	  return '[Promise]';//TODO it could be nice to inspect its state and value
	});

	Formatter.addType(new t.Type(t.OBJECT, t.XHR), function() {
	  return '[XMLHttpRequest]';//TODO it could be nice to inspect its state
	});

	Formatter.addType(new t.Type(t.OBJECT, t.HTML_ELEMENT), function(value) {
	  return value.outerHTML;
	});

	Formatter.addType(new t.Type(t.OBJECT, t.HTML_ELEMENT, '#text'), function(value) {
	  return value.nodeValue;
	});

	Formatter.addType(new t.Type(t.OBJECT, t.HTML_ELEMENT, '#document'), function(value) {
	  return value.documentElement.outerHTML;
	});

	Formatter.addType(new t.Type(t.OBJECT, t.HOST), function() {
	  return '[Host]';
	});

	module.exports = defaultFormat;
	});

	var should = createCommonjsModule(function (module) {
	'use strict';

	function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

	var getType = _interopDefault(shouldType);
	var eql = _interopDefault(shouldEqual);
	var sformat = _interopDefault(shouldFormat);
	var shouldTypeAdaptors$$1 = shouldTypeAdaptors;
	var shouldUtil$$1 = shouldUtil;

	function isWrapperType(obj) {
	  return obj instanceof Number ||
	    obj instanceof String ||
	    obj instanceof Boolean;
	}

	function convertPropertyName(name) {
	  return (typeof name === 'symbol') ? name : String(name);
	}

	var functionName = sformat.functionName;

	var config = {
	  typeAdaptors: shouldTypeAdaptors$$1.defaultTypeAdaptorStorage,

	  getFormatter: function(opts) {
	    return new sformat.Formatter(opts || config);
	  }
	};

	function format(value, opts) {
	  return config.getFormatter(opts).format(value);
	}

	function formatProp(value) {
	  var formatter = config.getFormatter();
	  return sformat.formatPlainObjectKey.call(formatter, value);
	}

	/**
	 * should AssertionError
	 * @param {Object} options
	 * @constructor
	 * @memberOf should
	 * @static
	 */
	function AssertionError(options) {
	  shouldUtil$$1.merge(this, options);

	  if (!options.message) {
	    Object.defineProperty(this, 'message', {
	        get: function() {
	          if (!this._message) {
	            this._message = this.generateMessage();
	            this.generatedMessage = true;
	          }
	          return this._message;
	        },
	        configurable: true,
	        enumerable: false
	      }
	    );
	  }

	  if (Error.captureStackTrace) {
	    Error.captureStackTrace(this, this.stackStartFunction);
	  } else {
	    // non v8 browsers so we can have a stacktrace
	    var err = new Error();
	    if (err.stack) {
	      var out = err.stack;

	      if (this.stackStartFunction) {
	        // try to strip useless frames
	        var fn_name = functionName(this.stackStartFunction);
	        var idx = out.indexOf('\n' + fn_name);
	        if (idx >= 0) {
	          // once we have located the function frame
	          // we need to strip out everything before it (and its line)
	          var next_line = out.indexOf('\n', idx + 1);
	          out = out.substring(next_line + 1);
	        }
	      }

	      this.stack = out;
	    }
	  }
	}


	var indent = '    ';
	function prependIndent(line) {
	  return indent + line;
	}

	function indentLines(text) {
	  return text.split('\n').map(prependIndent).join('\n');
	}


	// assert.AssertionError instanceof Error
	AssertionError.prototype = Object.create(Error.prototype, {
	  name: {
	    value: 'AssertionError'
	  },

	  generateMessage: {
	    value: function() {
	      if (!this.operator && this.previous) {
	        return this.previous.message;
	      }
	      var actual = format(this.actual);
	      var expected = 'expected' in this ? ' ' + format(this.expected) : '';
	      var details = 'details' in this && this.details ? ' (' + this.details + ')' : '';

	      var previous = this.previous ? '\n' + indentLines(this.previous.message) : '';

	      return 'expected ' + actual + (this.negate ? ' not ' : ' ') + this.operator + expected + details + previous;
	    }
	  }
	});

	/**
	 * should Assertion
	 * @param {*} obj Given object for assertion
	 * @constructor
	 * @memberOf should
	 * @static
	 */
	function Assertion(obj) {
	  this.obj = obj;

	  this.anyOne = false;
	  this.negate = false;

	  this.params = {actual: obj};
	}

	Assertion.prototype = {
	  constructor: Assertion,

	  /**
	   * Base method for assertions.
	   *
	   * Before calling this method need to fill Assertion#params object. This method usually called from other assertion methods.
	   * `Assertion#params` can contain such properties:
	   * * `operator` - required string containing description of this assertion
	   * * `obj` - optional replacement for this.obj, it usefull if you prepare more clear object then given
	   * * `message` - if this property filled with string any others will be ignored and this one used as assertion message
	   * * `expected` - any object used when you need to assert relation between given object and expected. Like given == expected (== is a relation)
	   * * `details` - additional string with details to generated message
	   *
	   * @memberOf Assertion
	   * @category assertion
	   * @param {*} expr Any expression that will be used as a condition for asserting.
	   * @example
	   *
	   * var a = new should.Assertion(42);
	   *
	   * a.params = {
	   *  operator: 'to be magic number',
	   * }
	   *
	   * a.assert(false);
	   * //throws AssertionError: expected 42 to be magic number
	   */
	  assert: function(expr) {
	    if (expr) {
	      return this;
	    }

	    var params = this.params;

	    if ('obj' in params && !('actual' in params)) {
	      params.actual = params.obj;
	    } else if (!('obj' in params) && !('actual' in params)) {
	      params.actual = this.obj;
	    }

	    params.stackStartFunction = params.stackStartFunction || this.assert;
	    params.negate = this.negate;

	    params.assertion = this;

	    throw new AssertionError(params);
	  },

	  /**
	   * Shortcut for `Assertion#assert(false)`.
	   *
	   * @memberOf Assertion
	   * @category assertion
	   * @example
	   *
	   * var a = new should.Assertion(42);
	   *
	   * a.params = {
	   *  operator: 'to be magic number',
	   * }
	   *
	   * a.fail();
	   * //throws AssertionError: expected 42 to be magic number
	   */
	  fail: function() {
	    return this.assert(false);
	  }
	};



	/**
	 * Assertion used to delegate calls of Assertion methods inside of Promise.
	 * It has almost all methods of Assertion.prototype
	 *
	 * @param {Promise} obj
	 */
	function PromisedAssertion(/* obj */) {
	  Assertion.apply(this, arguments);
	}

	/**
	 * Make PromisedAssertion to look like promise. Delegate resolve and reject to given promise.
	 *
	 * @private
	 * @returns {Promise}
	 */
	PromisedAssertion.prototype.then = function(resolve, reject) {
	  return this.obj.then(resolve, reject);
	};

	/**
	 * Way to extend Assertion function. It uses some logic
	 * to define only positive assertions and itself rule with negative assertion.
	 *
	 * All actions happen in subcontext and this method take care about negation.
	 * Potentially we can add some more modifiers that does not depends from state of assertion.
	 *
	 * @memberOf Assertion
	 * @static
	 * @param {String} name Name of assertion. It will be used for defining method or getter on Assertion.prototype
	 * @param {Function} func Function that will be called on executing assertion
	 * @example
	 *
	 * Assertion.add('asset', function() {
	 *      this.params = { operator: 'to be asset' }
	 *
	 *      this.obj.should.have.property('id').which.is.a.Number()
	 *      this.obj.should.have.property('path')
	 * })
	 */
	Assertion.add = function(name, func) {
	  Object.defineProperty(Assertion.prototype, name, {
	    enumerable: true,
	    configurable: true,
	    value: function() {
	      var context = new Assertion(this.obj, this, name);
	      context.anyOne = this.anyOne;

	      try {
	        func.apply(context, arguments);
	      } catch (e) {
	        // check for fail
	        if (e instanceof AssertionError) {
	          // negative fail
	          if (this.negate) {
	            this.obj = context.obj;
	            this.negate = false;
	            return this;
	          }

	          if (context !== e.assertion) {
	            context.params.previous = e;
	          }

	          // positive fail
	          context.negate = false;
	          context.fail();
	        }
	        // throw if it is another exception
	        throw e;
	      }

	      // negative pass
	      if (this.negate) {
	        context.negate = true; // because .fail will set negate
	        context.params.details = 'false negative fail';
	        context.fail();
	      }

	      // positive pass
	      if (!this.params.operator) {
	        this.params = context.params; // shortcut
	      }
	      this.obj = context.obj;
	      this.negate = false;
	      return this;
	    }
	  });

	  Object.defineProperty(PromisedAssertion.prototype, name, {
	    enumerable: true,
	    configurable: true,
	    value: function() {
	      var args = arguments;
	      this.obj = this.obj.then(function(a) {
	        return a[name].apply(a, args);
	      });

	      return this;
	    }
	  });
	};

	/**
	 * Add chaining getter to Assertion like .a, .which etc
	 *
	 * @memberOf Assertion
	 * @static
	 * @param  {string} name   name of getter
	 * @param  {function} [onCall] optional function to call
	 */
	Assertion.addChain = function(name, onCall) {
	  onCall = onCall || function() {};
	  Object.defineProperty(Assertion.prototype, name, {
	    get: function() {
	      onCall.call(this);
	      return this;
	    },
	    enumerable: true
	  });

	  Object.defineProperty(PromisedAssertion.prototype, name, {
	    enumerable: true,
	    configurable: true,
	    get: function() {
	      this.obj = this.obj.then(function(a) {
	        return a[name];
	      });

	      return this;
	    }
	  });
	};

	/**
	 * Create alias for some `Assertion` property
	 *
	 * @memberOf Assertion
	 * @static
	 * @param {String} from Name of to map
	 * @param {String} to Name of alias
	 * @example
	 *
	 * Assertion.alias('true', 'True')
	 */
	Assertion.alias = function(from, to) {
	  var desc = Object.getOwnPropertyDescriptor(Assertion.prototype, from);
	  if (!desc) {
	    throw new Error('Alias ' + from + ' -> ' + to + ' could not be created as ' + from + ' not defined');
	  }
	  Object.defineProperty(Assertion.prototype, to, desc);

	  var desc2 = Object.getOwnPropertyDescriptor(PromisedAssertion.prototype, from);
	  if (desc2) {
	    Object.defineProperty(PromisedAssertion.prototype, to, desc2);
	  }
	};
	/**
	 * Negation modifier. Current assertion chain become negated. Each call invert negation on current assertion.
	 *
	 * @name not
	 * @property
	 * @memberOf Assertion
	 * @category assertion
	 */
	Assertion.addChain('not', function() {
	  this.negate = !this.negate;
	});

	/**
	 * Any modifier - it affect on execution of sequenced assertion to do not `check all`, but `check any of`.
	 *
	 * @name any
	 * @property
	 * @memberOf Assertion
	 * @category assertion
	 */
	Assertion.addChain('any', function() {
	  this.anyOne = true;
	});

	var pSlice = Array.prototype.slice;

	// 1. The assert module provides functions that throw
	// AssertionError's when particular conditions are not met. The
	// assert module must conform to the following interface.

	var assert = ok;
	// 3. All of the following functions must throw an AssertionError
	// when a corresponding condition is not met, with a message that
	// may be undefined if not provided.  All assertion methods provide
	// both the actual and expected values to the assertion error for
	// display purposes.
	/**
	 * Node.js standard [`assert.fail`](http://nodejs.org/api/assert.html#assert_assert_fail_actual_expected_message_operator).
	 * @static
	 * @memberOf should
	 * @category assertion assert
	 * @param {*} actual Actual object
	 * @param {*} expected Expected object
	 * @param {string} message Message for assertion
	 * @param {string} operator Operator text
	 */
	function fail(actual, expected, message, operator, stackStartFunction) {
	  var a = new Assertion(actual);
	  a.params = {
	    operator: operator,
	    expected: expected,
	    message: message,
	    stackStartFunction: stackStartFunction || fail
	  };

	  a.fail();
	}

	// EXTENSION! allows for well behaved errors defined elsewhere.
	assert.fail = fail;

	// 4. Pure assertion tests whether a value is truthy, as determined
	// by !!guard.
	// assert.ok(guard, message_opt);
	// This statement is equivalent to assert.equal(true, !!guard,
	// message_opt);. To test strictly for the value true, use
	// assert.strictEqual(true, guard, message_opt);.
	/**
	 * Node.js standard [`assert.ok`](http://nodejs.org/api/assert.html#assert_assert_value_message_assert_ok_value_message).
	 * @static
	 * @memberOf should
	 * @category assertion assert
	 * @param {*} value
	 * @param {string} [message]
	 */
	function ok(value, message) {
	  if (!value) {
	    fail(value, true, message, '==', assert.ok);
	  }
	}
	assert.ok = ok;

	// 5. The equality assertion tests shallow, coercive equality with
	// ==.
	// assert.equal(actual, expected, message_opt);

	/**
	 * Node.js standard [`assert.equal`](http://nodejs.org/api/assert.html#assert_assert_equal_actual_expected_message).
	 * @static
	 * @memberOf should
	 * @category assertion assert
	 * @param {*} actual
	 * @param {*} expected
	 * @param {string} [message]
	 */
	assert.equal = function equal(actual, expected, message) {
	  if (actual != expected) {
	    fail(actual, expected, message, '==', assert.equal);
	  }
	};

	// 6. The non-equality assertion tests for whether two objects are not equal
	// with != assert.notEqual(actual, expected, message_opt);
	/**
	 * Node.js standard [`assert.notEqual`](http://nodejs.org/api/assert.html#assert_assert_notequal_actual_expected_message).
	 * @static
	 * @memberOf should
	 * @category assertion assert
	 * @param {*} actual
	 * @param {*} expected
	 * @param {string} [message]
	 */
	assert.notEqual = function notEqual(actual, expected, message) {
	  if (actual == expected) {
	    fail(actual, expected, message, '!=', assert.notEqual);
	  }
	};

	// 7. The equivalence assertion tests a deep equality relation.
	// assert.deepEqual(actual, expected, message_opt);
	/**
	 * Node.js standard [`assert.deepEqual`](http://nodejs.org/api/assert.html#assert_assert_deepequal_actual_expected_message).
	 * But uses should.js .eql implementation instead of Node.js own deepEqual.
	 *
	 * @static
	 * @memberOf should
	 * @category assertion assert
	 * @param {*} actual
	 * @param {*} expected
	 * @param {string} [message]
	 */
	assert.deepEqual = function deepEqual(actual, expected, message) {
	  if (eql(actual, expected).length !== 0) {
	    fail(actual, expected, message, 'deepEqual', assert.deepEqual);
	  }
	};


	// 8. The non-equivalence assertion tests for any deep inequality.
	// assert.notDeepEqual(actual, expected, message_opt);
	/**
	 * Node.js standard [`assert.notDeepEqual`](http://nodejs.org/api/assert.html#assert_assert_notdeepequal_actual_expected_message).
	 * But uses should.js .eql implementation instead of Node.js own deepEqual.
	 *
	 * @static
	 * @memberOf should
	 * @category assertion assert
	 * @param {*} actual
	 * @param {*} expected
	 * @param {string} [message]
	 */
	assert.notDeepEqual = function notDeepEqual(actual, expected, message) {
	  if (eql(actual, expected).result) {
	    fail(actual, expected, message, 'notDeepEqual', assert.notDeepEqual);
	  }
	};

	// 9. The strict equality assertion tests strict equality, as determined by ===.
	// assert.strictEqual(actual, expected, message_opt);
	/**
	 * Node.js standard [`assert.strictEqual`](http://nodejs.org/api/assert.html#assert_assert_strictequal_actual_expected_message).
	 * @static
	 * @memberOf should
	 * @category assertion assert
	 * @param {*} actual
	 * @param {*} expected
	 * @param {string} [message]
	 */
	assert.strictEqual = function strictEqual(actual, expected, message) {
	  if (actual !== expected) {
	    fail(actual, expected, message, '===', assert.strictEqual);
	  }
	};

	// 10. The strict non-equality assertion tests for strict inequality, as
	// determined by !==.  assert.notStrictEqual(actual, expected, message_opt);
	/**
	 * Node.js standard [`assert.notStrictEqual`](http://nodejs.org/api/assert.html#assert_assert_notstrictequal_actual_expected_message).
	 * @static
	 * @memberOf should
	 * @category assertion assert
	 * @param {*} actual
	 * @param {*} expected
	 * @param {string} [message]
	 */
	assert.notStrictEqual = function notStrictEqual(actual, expected, message) {
	  if (actual === expected) {
	    fail(actual, expected, message, '!==', assert.notStrictEqual);
	  }
	};

	function expectedException(actual, expected) {
	  if (!actual || !expected) {
	    return false;
	  }

	  if (Object.prototype.toString.call(expected) == '[object RegExp]') {
	    return expected.test(actual);
	  } else if (actual instanceof expected) {
	    return true;
	  } else if (expected.call({}, actual) === true) {
	    return true;
	  }

	  return false;
	}

	function _throws(shouldThrow, block, expected, message) {
	  var actual;

	  if (typeof expected == 'string') {
	    message = expected;
	    expected = null;
	  }

	  try {
	    block();
	  } catch (e) {
	    actual = e;
	  }

	  message = (expected && expected.name ? ' (' + expected.name + ')' : '.') +
	  (message ? ' ' + message : '.');

	  if (shouldThrow && !actual) {
	    fail(actual, expected, 'Missing expected exception' + message);
	  }

	  if (!shouldThrow && expectedException(actual, expected)) {
	    fail(actual, expected, 'Got unwanted exception' + message);
	  }

	  if ((shouldThrow && actual && expected && !expectedException(actual, expected)) || (!shouldThrow && actual)) {
	    throw actual;
	  }
	}

	// 11. Expected to throw an error:
	// assert.throws(block, Error_opt, message_opt);
	/**
	 * Node.js standard [`assert.throws`](http://nodejs.org/api/assert.html#assert_assert_throws_block_error_message).
	 * @static
	 * @memberOf should
	 * @category assertion assert
	 * @param {Function} block
	 * @param {Function} [error]
	 * @param {String} [message]
	 */
	assert.throws = function(/*block, error, message*/) {
	  _throws.apply(this, [true].concat(pSlice.call(arguments)));
	};

	// EXTENSION! This is annoying to write outside this module.
	/**
	 * Node.js standard [`assert.doesNotThrow`](http://nodejs.org/api/assert.html#assert_assert_doesnotthrow_block_message).
	 * @static
	 * @memberOf should
	 * @category assertion assert
	 * @param {Function} block
	 * @param {String} [message]
	 */
	assert.doesNotThrow = function(/*block, message*/) {
	  _throws.apply(this, [false].concat(pSlice.call(arguments)));
	};

	/**
	 * Node.js standard [`assert.ifError`](http://nodejs.org/api/assert.html#assert_assert_iferror_value).
	 * @static
	 * @memberOf should
	 * @category assertion assert
	 * @param {Error} err
	 */
	assert.ifError = function(err) {
	  if (err) {
	    throw err;
	  }
	};

	function assertExtensions(should) {
	  var i = should.format;

	  /*
	   * Expose assert to should
	   *
	   * This allows you to do things like below
	   * without require()ing the assert module.
	   *
	   *    should.equal(foo.bar, undefined);
	   *
	   */
	  shouldUtil$$1.merge(should, assert);

	  /**
	   * Assert _obj_ exists, with optional message.
	   *
	   * @static
	   * @memberOf should
	   * @category assertion assert
	   * @alias should.exists
	   * @param {*} obj
	   * @param {String} [msg]
	   * @example
	   *
	   * should.exist(1);
	   * should.exist(new Date());
	   */
	  should.exist = should.exists = function(obj, msg) {
	    if (null == obj) {
	      throw new AssertionError({
	        message: msg || ('expected ' + i(obj) + ' to exist'), stackStartFunction: should.exist
	      });
	    }
	  };

	  should.not = {};
	  /**
	   * Asserts _obj_ does not exist, with optional message.
	   *
	   * @name not.exist
	   * @static
	   * @memberOf should
	   * @category assertion assert
	   * @alias should.not.exists
	   * @param {*} obj
	   * @param {String} [msg]
	   * @example
	   *
	   * should.not.exist(null);
	   * should.not.exist(void 0);
	   */
	  should.not.exist = should.not.exists = function(obj, msg) {
	    if (null != obj) {
	      throw new AssertionError({
	        message: msg || ('expected ' + i(obj) + ' to not exist'), stackStartFunction: should.not.exist
	      });
	    }
	  };
	}

	/*
	 * should.js - assertion library
	 * Copyright(c) 2010-2013 TJ Holowaychuk <tj@vision-media.ca>
	 * Copyright(c) 2013-2016 Denis Bardadym <bardadymchik@gmail.com>
	 * MIT Licensed
	 */

	function chainAssertions(should, Assertion) {
	  /**
	   * Simple chaining. It actually do nothing.
	   *
	   * @memberOf Assertion
	   * @name be
	   * @property {should.Assertion} be
	   * @alias Assertion#an
	   * @alias Assertion#of
	   * @alias Assertion#a
	   * @alias Assertion#and
	   * @alias Assertion#have
	   * @alias Assertion#has
	   * @alias Assertion#with
	   * @alias Assertion#is
	   * @alias Assertion#which
	   * @alias Assertion#the
	   * @alias Assertion#it
	   * @category assertion chaining
	   */
	  ['an', 'of', 'a', 'and', 'be', 'has', 'have', 'with', 'is', 'which', 'the', 'it'].forEach(function(name) {
	    Assertion.addChain(name);
	  });
	}

	/*
	 * should.js - assertion library
	 * Copyright(c) 2010-2013 TJ Holowaychuk <tj@vision-media.ca>
	 * Copyright(c) 2013-2016 Denis Bardadym <bardadymchik@gmail.com>
	 * MIT Licensed
	 */

	function booleanAssertions(should, Assertion) {
	  /**
	   * Assert given object is exactly `true`.
	   *
	   * @name true
	   * @memberOf Assertion
	   * @category assertion bool
	   * @alias Assertion#True
	   * @param {string} [message] Optional message
	   * @example
	   *
	   * (true).should.be.true();
	   * false.should.not.be.true();
	   *
	   * ({ a: 10}).should.not.be.true();
	   */
	  Assertion.add('true', function(message) {
	    this.is.exactly(true, message);
	  });

	  Assertion.alias('true', 'True');

	  /**
	   * Assert given object is exactly `false`.
	   *
	   * @name false
	   * @memberOf Assertion
	   * @category assertion bool
	   * @alias Assertion#False
	   * @param {string} [message] Optional message
	   * @example
	   *
	   * (true).should.not.be.false();
	   * false.should.be.false();
	   */
	  Assertion.add('false', function(message) {
	    this.is.exactly(false, message);
	  });

	  Assertion.alias('false', 'False');

	  /**
	   * Assert given object is truthy according javascript type conversions.
	   *
	   * @name ok
	   * @memberOf Assertion
	   * @category assertion bool
	   * @example
	   *
	   * (true).should.be.ok();
	   * ''.should.not.be.ok();
	   * should(null).not.be.ok();
	   * should(void 0).not.be.ok();
	   *
	   * (10).should.be.ok();
	   * (0).should.not.be.ok();
	   */
	  Assertion.add('ok', function() {
	    this.params = { operator: 'to be truthy' };

	    this.assert(this.obj);
	  });
	}

	/*
	 * should.js - assertion library
	 * Copyright(c) 2010-2013 TJ Holowaychuk <tj@vision-media.ca>
	 * Copyright(c) 2013-2016 Denis Bardadym <bardadymchik@gmail.com>
	 * MIT Licensed
	 */

	function numberAssertions(should, Assertion) {

	  /**
	   * Assert given object is NaN
	   * @name NaN
	   * @memberOf Assertion
	   * @category assertion numbers
	   * @example
	   *
	   * (10).should.not.be.NaN();
	   * NaN.should.be.NaN();
	   */
	  Assertion.add('NaN', function() {
	    this.params = { operator: 'to be NaN' };

	    this.assert(this.obj !== this.obj);
	  });

	  /**
	   * Assert given object is not finite (positive or negative)
	   *
	   * @name Infinity
	   * @memberOf Assertion
	   * @category assertion numbers
	   * @example
	   *
	   * (10).should.not.be.Infinity();
	   * NaN.should.not.be.Infinity();
	   */
	  Assertion.add('Infinity', function() {
	    this.params = { operator: 'to be Infinity' };

	    this.is.a.Number()
	      .and.not.a.NaN()
	      .and.assert(!isFinite(this.obj));
	  });

	  /**
	   * Assert given number between `start` and `finish` or equal one of them.
	   *
	   * @name within
	   * @memberOf Assertion
	   * @category assertion numbers
	   * @param {number} start Start number
	   * @param {number} finish Finish number
	   * @param {string} [description] Optional message
	   * @example
	   *
	   * (10).should.be.within(0, 20);
	   */
	  Assertion.add('within', function(start, finish, description) {
	    this.params = { operator: 'to be within ' + start + '..' + finish, message: description };

	    this.assert(this.obj >= start && this.obj <= finish);
	  });

	  /**
	   * Assert given number near some other `value` within `delta`
	   *
	   * @name approximately
	   * @memberOf Assertion
	   * @category assertion numbers
	   * @param {number} value Center number
	   * @param {number} delta Radius
	   * @param {string} [description] Optional message
	   * @example
	   *
	   * (9.99).should.be.approximately(10, 0.1);
	   */
	  Assertion.add('approximately', function(value, delta, description) {
	    this.params = { operator: 'to be approximately ' + value + ' ±' + delta, message: description };

	    this.assert(Math.abs(this.obj - value) <= delta);
	  });

	  /**
	   * Assert given number above `n`.
	   *
	   * @name above
	   * @alias Assertion#greaterThan
	   * @memberOf Assertion
	   * @category assertion numbers
	   * @param {number} n Margin number
	   * @param {string} [description] Optional message
	   * @example
	   *
	   * (10).should.be.above(0);
	   */
	  Assertion.add('above', function(n, description) {
	    this.params = { operator: 'to be above ' + n, message: description };

	    this.assert(this.obj > n);
	  });

	  /**
	   * Assert given number below `n`.
	   *
	   * @name below
	   * @alias Assertion#lessThan
	   * @memberOf Assertion
	   * @category assertion numbers
	   * @param {number} n Margin number
	   * @param {string} [description] Optional message
	   * @example
	   *
	   * (0).should.be.below(10);
	   */
	  Assertion.add('below', function(n, description) {
	    this.params = { operator: 'to be below ' + n, message: description };

	    this.assert(this.obj < n);
	  });

	  Assertion.alias('above', 'greaterThan');
	  Assertion.alias('below', 'lessThan');

	  /**
	   * Assert given number above `n`.
	   *
	   * @name aboveOrEqual
	   * @alias Assertion#greaterThanOrEqual
	   * @memberOf Assertion
	   * @category assertion numbers
	   * @param {number} n Margin number
	   * @param {string} [description] Optional message
	   * @example
	   *
	   * (10).should.be.aboveOrEqual(0);
	   * (10).should.be.aboveOrEqual(10);
	   */
	  Assertion.add('aboveOrEqual', function(n, description) {
	    this.params = { operator: 'to be above or equal' + n, message: description };

	    this.assert(this.obj >= n);
	  });

	  /**
	   * Assert given number below `n`.
	   *
	   * @name belowOrEqual
	   * @alias Assertion#lessThanOrEqual
	   * @memberOf Assertion
	   * @category assertion numbers
	   * @param {number} n Margin number
	   * @param {string} [description] Optional message
	   * @example
	   *
	   * (0).should.be.belowOrEqual(10);
	   * (0).should.be.belowOrEqual(0);
	   */
	  Assertion.add('belowOrEqual', function(n, description) {
	    this.params = { operator: 'to be below or equal' + n, message: description };

	    this.assert(this.obj <= n);
	  });

	  Assertion.alias('aboveOrEqual', 'greaterThanOrEqual');
	  Assertion.alias('belowOrEqual', 'lessThanOrEqual');

	}

	function typeAssertions(should, Assertion) {
	  /**
	   * Assert given object is number
	   * @name Number
	   * @memberOf Assertion
	   * @category assertion types
	   */
	  Assertion.add('Number', function() {
	    this.params = {operator: 'to be a number'};

	    this.have.type('number');
	  });

	  /**
	   * Assert given object is arguments
	   * @name arguments
	   * @alias Assertion#Arguments
	   * @memberOf Assertion
	   * @category assertion types
	   */
	  Assertion.add('arguments', function() {
	    this.params = {operator: 'to be arguments'};

	    this.have.class('Arguments');
	  });

	  Assertion.alias('arguments', 'Arguments');

	  /**
	   * Assert given object has some type using `typeof`
	   * @name type
	   * @memberOf Assertion
	   * @param {string} type Type name
	   * @param {string} [description] Optional message
	   * @category assertion types
	   */
	  Assertion.add('type', function(type, description) {
	    this.params = {operator: 'to have type ' + type, message: description};

	    should(typeof this.obj).be.exactly(type);
	  });

	  /**
	   * Assert given object is instance of `constructor`
	   * @name instanceof
	   * @alias Assertion#instanceOf
	   * @memberOf Assertion
	   * @param {Function} constructor Constructor function
	   * @param {string} [description] Optional message
	   * @category assertion types
	   */
	  Assertion.add('instanceof', function(constructor, description) {
	    this.params = {operator: 'to be an instance of ' + functionName(constructor), message: description};

	    this.assert(Object(this.obj) instanceof constructor);
	  });

	  Assertion.alias('instanceof', 'instanceOf');

	  /**
	   * Assert given object is function
	   * @name Function
	   * @memberOf Assertion
	   * @category assertion types
	   */
	  Assertion.add('Function', function() {
	    this.params = {operator: 'to be a function'};

	    this.have.type('function');
	  });

	  /**
	   * Assert given object is object
	   * @name Object
	   * @memberOf Assertion
	   * @category assertion types
	   */
	  Assertion.add('Object', function() {
	    this.params = {operator: 'to be an object'};

	    this.is.not.null().and.have.type('object');
	  });

	  /**
	   * Assert given object is string
	   * @name String
	   * @memberOf Assertion
	   * @category assertion types
	   */
	  Assertion.add('String', function() {
	    this.params = {operator: 'to be a string'};

	    this.have.type('string');
	  });

	  /**
	   * Assert given object is array
	   * @name Array
	   * @memberOf Assertion
	   * @category assertion types
	   */
	  Assertion.add('Array', function() {
	    this.params = {operator: 'to be an array'};

	    this.have.class('Array');
	  });

	  /**
	   * Assert given object is boolean
	   * @name Boolean
	   * @memberOf Assertion
	   * @category assertion types
	   */
	  Assertion.add('Boolean', function() {
	    this.params = {operator: 'to be a boolean'};

	    this.have.type('boolean');
	  });

	  /**
	   * Assert given object is error
	   * @name Error
	   * @memberOf Assertion
	   * @category assertion types
	   */
	  Assertion.add('Error', function() {
	    this.params = {operator: 'to be an error'};

	    this.have.instanceOf(Error);
	  });

	  /**
	   * Assert given object is a date
	   * @name Date
	   * @memberOf Assertion
	   * @category assertion types
	   */
	  Assertion.add('Date', function() {
	    this.params = {operator: 'to be a date'};

	    this.have.instanceOf(Date);
	  });

	  /**
	   * Assert given object is null
	   * @name null
	   * @alias Assertion#Null
	   * @memberOf Assertion
	   * @category assertion types
	   */
	  Assertion.add('null', function() {
	    this.params = {operator: 'to be null'};

	    this.assert(this.obj === null);
	  });

	  Assertion.alias('null', 'Null');

	  /**
	   * Assert given object has some internal [[Class]], via Object.prototype.toString call
	   * @name class
	   * @alias Assertion#Class
	   * @memberOf Assertion
	   * @category assertion types
	   */
	  Assertion.add('class', function(cls) {
	    this.params = {operator: 'to have [[Class]] ' + cls};

	    this.assert(Object.prototype.toString.call(this.obj) === '[object ' + cls + ']');
	  });

	  Assertion.alias('class', 'Class');

	  /**
	   * Assert given object is undefined
	   * @name undefined
	   * @alias Assertion#Undefined
	   * @memberOf Assertion
	   * @category assertion types
	   */
	  Assertion.add('undefined', function() {
	    this.params = {operator: 'to be undefined'};

	    this.assert(this.obj === void 0);
	  });

	  Assertion.alias('undefined', 'Undefined');

	  /**
	   * Assert given object supports es6 iterable protocol (just check
	   * that object has property Symbol.iterator, which is a function)
	   * @name iterable
	   * @memberOf Assertion
	   * @category assertion es6
	   */
	  Assertion.add('iterable', function() {
	    this.params = {operator: 'to be iterable'};

	    should(this.obj).have.property(Symbol.iterator).which.is.a.Function();
	  });

	  /**
	   * Assert given object supports es6 iterator protocol (just check
	   * that object has property next, which is a function)
	   * @name iterator
	   * @memberOf Assertion
	   * @category assertion es6
	   */
	  Assertion.add('iterator', function() {
	    this.params = {operator: 'to be iterator'};

	    should(this.obj).have.property('next').which.is.a.Function();
	  });

	  /**
	   * Assert given object is a generator object
	   * @name generator
	   * @memberOf Assertion
	   * @category assertion es6
	   */
	  Assertion.add('generator', function() {
	    this.params = {operator: 'to be generator'};

	    should(this.obj).be.iterable
	      .and.iterator
	      .and.it.is.equal(this.obj[Symbol.iterator]());
	  });
	}

	function formatEqlResult(r, a, b) {
	  return ((r.path.length > 0 ? 'at ' + r.path.map(formatProp).join(' -> ') : '') +
	  (r.a === a ? '' : ', A has ' + format(r.a)) +
	  (r.b === b ? '' : ' and B has ' + format(r.b)) +
	  (r.showReason ? ' because ' + r.reason : '')).trim();
	}

	function equalityAssertions(should, Assertion) {


	  /**
	   * Deep object equality comparison. For full spec see [`should-equal tests`](https://github.com/shouldjs/equal/blob/master/test.js).
	   *
	   * @name eql
	   * @memberOf Assertion
	   * @category assertion equality
	   * @alias Assertion#deepEqual
	   * @param {*} val Expected value
	   * @param {string} [description] Optional message
	   * @example
	   *
	   * (10).should.be.eql(10);
	   * ('10').should.not.be.eql(10);
	   * (-0).should.not.be.eql(+0);
	   *
	   * NaN.should.be.eql(NaN);
	   *
	   * ({ a: 10}).should.be.eql({ a: 10 });
	   * [ 'a' ].should.not.be.eql({ '0': 'a' });
	   */
	  Assertion.add('eql', function(val, description) {
	    this.params = {operator: 'to equal', expected: val, message: description};
	    var obj = this.obj;
	    var fails = eql(this.obj, val, should.config);
	    this.params.details = fails.map(function(fail) {
	      return formatEqlResult(fail, obj, val);
	    }).join(', ');

	    this.params.showDiff = eql(getType(obj), getType(val)).length === 0;

	    this.assert(fails.length === 0);
	  });

	  /**
	   * Exact comparison using ===.
	   *
	   * @name equal
	   * @memberOf Assertion
	   * @category assertion equality
	   * @alias Assertion#exactly
	   * @param {*} val Expected value
	   * @param {string} [description] Optional message
	   * @example
	   *
	   * 10.should.be.equal(10);
	   * 'a'.should.be.exactly('a');
	   *
	   * should(null).be.exactly(null);
	   */
	  Assertion.add('equal', function(val, description) {
	    this.params = {operator: 'to be', expected: val, message: description};

	    this.params.showDiff = eql(getType(this.obj), getType(val)).length === 0;

	    this.assert(val === this.obj);
	  });

	  Assertion.alias('equal', 'exactly');
	  Assertion.alias('eql', 'deepEqual');

	  function addOneOf(name, message, method) {
	    Assertion.add(name, function(vals) {
	      if (arguments.length !== 1) {
	        vals = Array.prototype.slice.call(arguments);
	      } else {
	        should(vals).be.Array();
	      }

	      this.params = {operator: message, expected: vals};

	      var obj = this.obj;
	      var found = false;

	      shouldTypeAdaptors$$1.forEach(vals, function(val) {
	        try {
	          should(val)[method](obj);
	          found = true;
	          return false;
	        } catch (e) {
	          if (e instanceof should.AssertionError) {
	            return;//do nothing
	          }
	          throw e;
	        }
	      });

	      this.assert(found);
	    });
	  }

	  /**
	   * Exact comparison using === to be one of supplied objects.
	   *
	   * @name equalOneOf
	   * @memberOf Assertion
	   * @category assertion equality
	   * @param {Array|*} vals Expected values
	   * @example
	   *
	   * 'ab'.should.be.equalOneOf('a', 10, 'ab');
	   * 'ab'.should.be.equalOneOf(['a', 10, 'ab']);
	   */
	  addOneOf('equalOneOf', 'to be equals one of', 'equal');

	  /**
	   * Exact comparison using .eql to be one of supplied objects.
	   *
	   * @name oneOf
	   * @memberOf Assertion
	   * @category assertion equality
	   * @param {Array|*} vals Expected values
	   * @example
	   *
	   * ({a: 10}).should.be.oneOf('a', 10, 'ab', {a: 10});
	   * ({a: 10}).should.be.oneOf(['a', 10, 'ab', {a: 10}]);
	   */
	  addOneOf('oneOf', 'to be one of', 'eql');

	}

	function promiseAssertions(should, Assertion) {
	  /**
	   * Assert given object is a Promise
	   *
	   * @name Promise
	   * @memberOf Assertion
	   * @category assertion promises
	   * @example
	   *
	   * promise.should.be.Promise()
	   * (new Promise(function(resolve, reject) { resolve(10); })).should.be.a.Promise()
	   * (10).should.not.be.a.Promise()
	   */
	  Assertion.add('Promise', function() {
	    this.params = {operator: 'to be promise'};

	    var obj = this.obj;

	    should(obj).have.property('then')
	      .which.is.a.Function();
	  });

	  /**
	   * Assert given promise will be fulfilled. Result of assertion is still .thenable and should be handled accordingly.
	   *
	   * @name fulfilled
	   * @memberOf Assertion
	   * @returns {Promise}
	   * @category assertion promises
	   * @example
	   *
	   * // don't forget to handle async nature
	   * (new Promise(function(resolve, reject) { resolve(10); })).should.be.fulfilled();
	   *
	   * // test example with mocha it is possible to return promise
	   * it('is async', () => {
	   *    return new Promise(resolve => resolve(10))
	   *      .should.be.fulfilled();
	   * });
	   */
	  Assertion.prototype.fulfilled = function Assertion$fulfilled() {
	    this.params = {operator: 'to be fulfilled'};

	    should(this.obj).be.a.Promise();

	    var that = this;
	    return this.obj.then(function next$onResolve(value) {
	      if (that.negate) {
	        that.fail();
	      }
	      return value;
	    }, function next$onReject(err) {
	      if (!that.negate) {
	        that.params.operator += ', but it was rejected with ' + should.format(err);
	        that.fail();
	      }
	      return err;
	    });
	  };

	  /**
	   * Assert given promise will be rejected. Result of assertion is still .thenable and should be handled accordingly.
	   *
	   * @name rejected
	   * @memberOf Assertion
	   * @category assertion promises
	   * @returns {Promise}
	   * @example
	   *
	   * // don't forget to handle async nature
	   * (new Promise(function(resolve, reject) { resolve(10); }))
	   *    .should.not.be.rejected();
	   *
	   * // test example with mocha it is possible to return promise
	   * it('is async', () => {
	   *    return new Promise((resolve, reject) => reject(new Error('boom')))
	   *      .should.be.rejected();
	   * });
	   */
	  Assertion.prototype.rejected = function() {
	    this.params = {operator: 'to be rejected'};

	    should(this.obj).be.a.Promise();

	    var that = this;
	    return this.obj.then(function(value) {
	      if (!that.negate) {
	        that.params.operator += ', but it was fulfilled';
	        if (arguments.length != 0) {
	          that.params.operator += ' with ' + should.format(value);
	        }
	        that.fail();
	      }
	      return value;
	    }, function next$onError(err) {
	      if (that.negate) {
	        that.fail();
	      }
	      return err;
	    });
	  };

	  /**
	   * Assert given promise will be fulfilled with some expected value (value compared using .eql).
	   * Result of assertion is still .thenable and should be handled accordingly.
	   *
	   * @name fulfilledWith
	   * @memberOf Assertion
	   * @category assertion promises
	   * @returns {Promise}
	   * @example
	   *
	   * // don't forget to handle async nature
	   * (new Promise(function(resolve, reject) { resolve(10); }))
	   *    .should.be.fulfilledWith(10);
	   *
	   * // test example with mocha it is possible to return promise
	   * it('is async', () => {
	   *    return new Promise((resolve, reject) => resolve(10))
	   *       .should.be.fulfilledWith(10);
	   * });
	   */
	  Assertion.prototype.fulfilledWith = function(expectedValue) {
	    this.params = {operator: 'to be fulfilled with ' + should.format(expectedValue)};

	    should(this.obj).be.a.Promise();

	    var that = this;
	    return this.obj.then(function(value) {
	      if (that.negate) {
	        that.fail();
	      }
	      should(value).eql(expectedValue);
	      return value;
	    }, function next$onError(err) {
	      if (!that.negate) {
	        that.params.operator += ', but it was rejected with ' + should.format(err);
	        that.fail();
	      }
	      return err;
	    });
	  };

	  /**
	   * Assert given promise will be rejected with some sort of error. Arguments is the same for Assertion#throw.
	   * Result of assertion is still .thenable and should be handled accordingly.
	   *
	   * @name rejectedWith
	   * @memberOf Assertion
	   * @category assertion promises
	   * @returns {Promise}
	   * @example
	   *
	   * function failedPromise() {
	   *   return new Promise(function(resolve, reject) {
	   *     reject(new Error('boom'))
	   *   })
	   * }
	   * failedPromise().should.be.rejectedWith(Error);
	   * failedPromise().should.be.rejectedWith('boom');
	   * failedPromise().should.be.rejectedWith(/boom/);
	   * failedPromise().should.be.rejectedWith(Error, { message: 'boom' });
	   * failedPromise().should.be.rejectedWith({ message: 'boom' });
	   *
	   * // test example with mocha it is possible to return promise
	   * it('is async', () => {
	   *    return failedPromise().should.be.rejectedWith({ message: 'boom' });
	   * });
	   */
	  Assertion.prototype.rejectedWith = function(message, properties) {
	    this.params = {operator: 'to be rejected'};

	    should(this.obj).be.a.Promise();

	    var that = this;
	    return this.obj.then(function(value) {
	      if (!that.negate) {
	        that.fail();
	      }
	      return value;
	    }, function next$onError(err) {
	      if (that.negate) {
	        that.fail();
	      }

	      var errorMatched = true;
	      var errorInfo = '';

	      if ('string' === typeof message) {
	        errorMatched = message === err.message;
	      } else if (message instanceof RegExp) {
	        errorMatched = message.test(err.message);
	      } else if ('function' === typeof message) {
	        errorMatched = err instanceof message;
	      } else if (message !== null && typeof message === 'object') {
	        try {
	          should(err).match(message);
	        } catch (e) {
	          if (e instanceof should.AssertionError) {
	            errorInfo = ': ' + e.message;
	            errorMatched = false;
	          } else {
	            throw e;
	          }
	        }
	      }

	      if (!errorMatched) {
	        if ( typeof message === 'string' || message instanceof RegExp) {
	          errorInfo = ' with a message matching ' + should.format(message) + ", but got '" + err.message + "'";
	        } else if ('function' === typeof message) {
	          errorInfo = ' of type ' + functionName(message) + ', but got ' + functionName(err.constructor);
	        }
	      } else if ('function' === typeof message && properties) {
	        try {
	          should(err).match(properties);
	        } catch (e) {
	          if (e instanceof should.AssertionError) {
	            errorInfo = ': ' + e.message;
	            errorMatched = false;
	          } else {
	            throw e;
	          }
	        }
	      }

	      that.params.operator += errorInfo;

	      that.assert(errorMatched);

	      return err;
	    });
	  };

	  /**
	   * Assert given object is promise and wrap it in PromisedAssertion, which has all properties of Assertion.
	   * That means you can chain as with usual Assertion.
	   * Result of assertion is still .thenable and should be handled accordingly.
	   *
	   * @name finally
	   * @memberOf Assertion
	   * @alias Assertion#eventually
	   * @category assertion promises
	   * @returns {PromisedAssertion} Like Assertion, but .then this.obj in Assertion
	   * @example
	   *
	   * (new Promise(function(resolve, reject) { resolve(10); }))
	   *    .should.be.eventually.equal(10);
	   *
	   * // test example with mocha it is possible to return promise
	   * it('is async', () => {
	   *    return new Promise(resolve => resolve(10))
	   *      .should.be.finally.equal(10);
	   * });
	   */
	  Object.defineProperty(Assertion.prototype, 'finally', {
	    get: function() {
	      should(this.obj).be.a.Promise();

	      var that = this;

	      return new PromisedAssertion(this.obj.then(function(obj) {
	        var a = should(obj);

	        a.negate = that.negate;
	        a.anyOne = that.anyOne;

	        return a;
	      }));
	    }
	  });

	  Assertion.alias('finally', 'eventually');
	}

	/*
	 * should.js - assertion library
	 * Copyright(c) 2010-2013 TJ Holowaychuk <tj@vision-media.ca>
	 * Copyright(c) 2013-2016 Denis Bardadym <bardadymchik@gmail.com>
	 * MIT Licensed
	 */

	function stringAssertions(should, Assertion) {
	  /**
	   * Assert given string starts with prefix
	   * @name startWith
	   * @memberOf Assertion
	   * @category assertion strings
	   * @param {string} str Prefix
	   * @param {string} [description] Optional message
	   * @example
	   *
	   * 'abc'.should.startWith('a');
	   */
	  Assertion.add('startWith', function(str, description) {
	    this.params = { operator: 'to start with ' + should.format(str), message: description };

	    this.assert(0 === this.obj.indexOf(str));
	  });

	  /**
	   * Assert given string ends with prefix
	   * @name endWith
	   * @memberOf Assertion
	   * @category assertion strings
	   * @param {string} str Prefix
	   * @param {string} [description] Optional message
	   * @example
	   *
	   * 'abca'.should.endWith('a');
	   */
	  Assertion.add('endWith', function(str, description) {
	    this.params = { operator: 'to end with ' + should.format(str), message: description };

	    this.assert(this.obj.indexOf(str, this.obj.length - str.length) >= 0);
	  });
	}

	function containAssertions(should, Assertion) {
	  var i = should.format;

	  /**
	   * Assert that given object contain something that equal to `other`. It uses `should-equal` for equality checks.
	   * If given object is array it search that one of elements was equal to `other`.
	   * If given object is string it checks if `other` is a substring - expected that `other` is a string.
	   * If given object is Object it checks that `other` is a subobject - expected that `other` is a object.
	   *
	   * @name containEql
	   * @memberOf Assertion
	   * @category assertion contain
	   * @param {*} other Nested object
	   * @example
	   *
	   * [1, 2, 3].should.containEql(1);
	   * [{ a: 1 }, 'a', 10].should.containEql({ a: 1 });
	   *
	   * 'abc'.should.containEql('b');
	   * 'ab1c'.should.containEql(1);
	   *
	   * ({ a: 10, c: { d: 10 }}).should.containEql({ a: 10 });
	   * ({ a: 10, c: { d: 10 }}).should.containEql({ c: { d: 10 }});
	   * ({ a: 10, c: { d: 10 }}).should.containEql({ b: 10 });
	   * // throws AssertionError: expected { a: 10, c: { d: 10 } } to contain { b: 10 }
	   * //            expected { a: 10, c: { d: 10 } } to have property b
	   */
	  Assertion.add('containEql', function(other) {
	    this.params = { operator: 'to contain ' + i(other) };

	    this.is.not.null().and.not.undefined();

	    var obj = this.obj;

	    if (typeof obj == 'string') {
	      this.assert(obj.indexOf(String(other)) >= 0);
	    } else if (shouldTypeAdaptors$$1.isIterable(obj)) {
	      this.assert(shouldTypeAdaptors$$1.some(obj, function(v) {
	        return eql(v, other).length === 0;
	      }));
	    } else {
	      shouldTypeAdaptors$$1.forEach(other, function(value, key) {
	        should(obj).have.value(key, value);
	      }, this);
	    }
	  });

	  /**
	   * Assert that given object is contain equally structured object on the same depth level.
	   * If given object is an array and `other` is an array it checks that the eql elements is going in the same sequence in given array (recursive)
	   * If given object is an object it checks that the same keys contain deep equal values (recursive)
	   * On other cases it try to check with `.eql`
	   *
	   * @name containDeepOrdered
	   * @memberOf Assertion
	   * @category assertion contain
	   * @param {*} other Nested object
	   * @example
	   *
	   * [ 1, 2, 3].should.containDeepOrdered([1, 2]);
	   * [ 1, 2, [ 1, 2, 3 ]].should.containDeepOrdered([ 1, [ 2, 3 ]]);
	   *
	   * ({ a: 10, b: { c: 10, d: [1, 2, 3] }}).should.containDeepOrdered({a: 10});
	   * ({ a: 10, b: { c: 10, d: [1, 2, 3] }}).should.containDeepOrdered({b: {c: 10}});
	   * ({ a: 10, b: { c: 10, d: [1, 2, 3] }}).should.containDeepOrdered({b: {d: [1, 3]}});
	   */
	  Assertion.add('containDeepOrdered', function(other) {
	    this.params = {operator: 'to contain ' + i(other)};

	    var obj = this.obj;
	    if (typeof obj == 'string') {// expect other to be string
	      this.is.equal(String(other));
	    } else if (shouldTypeAdaptors$$1.isIterable(obj) && shouldTypeAdaptors$$1.isIterable(other)) {
	      var objIterator = shouldTypeAdaptors$$1.iterator(obj);
	      var otherIterator = shouldTypeAdaptors$$1.iterator(other);

	      var nextObj = objIterator.next();
	      var nextOther = otherIterator.next();
	      while (!nextObj.done && !nextOther.done) {
	        try {
	          should(nextObj.value[1]).containDeepOrdered(nextOther.value[1]);
	          nextOther = otherIterator.next();
	        } catch (e) {
	          if (!(e instanceof should.AssertionError)) {
	            throw e;
	          }
	        }
	        nextObj = objIterator.next();
	      }

	      this.assert(nextOther.done);
	    } else if (obj != null && other != null && typeof obj == 'object' && typeof other == 'object') {//TODO compare types object contains object case
	      shouldTypeAdaptors$$1.forEach(other, function(value, key) {
	        should(obj[key]).containDeepOrdered(value);
	      });

	      // if both objects is empty means we finish traversing - and we need to compare for hidden values
	      if (shouldTypeAdaptors$$1.isEmpty(other)) {
	        this.eql(other);
	      }
	    } else {
	      this.eql(other);
	    }
	  });

	  /**
	   * The same like `Assertion#containDeepOrdered` but all checks on arrays without order.
	   *
	   * @name containDeep
	   * @memberOf Assertion
	   * @category assertion contain
	   * @param {*} other Nested object
	   * @example
	   *
	   * [ 1, 2, 3].should.containDeep([2, 1]);
	   * [ 1, 2, [ 1, 2, 3 ]].should.containDeep([ 1, [ 3, 1 ]]);
	   */
	  Assertion.add('containDeep', function(other) {
	    this.params = {operator: 'to contain ' + i(other)};

	    var obj = this.obj;
	    if (typeof obj == 'string') {// expect other to be string
	      this.is.equal(String(other));
	    } else if (shouldTypeAdaptors$$1.isIterable(obj) && shouldTypeAdaptors$$1.isIterable(other)) {
	      var usedKeys = {};
	      shouldTypeAdaptors$$1.forEach(other, function(otherItem) {
	        this.assert(shouldTypeAdaptors$$1.some(obj, function(item, index) {
	          if (index in usedKeys) {
	            return false;
	          }

	          try {
	            should(item).containDeep(otherItem);
	            usedKeys[index] = true;
	            return true;
	          } catch (e) {
	            if (e instanceof should.AssertionError) {
	              return false;
	            }
	            throw e;
	          }
	        }));
	      }, this);
	    } else if (obj != null && other != null && typeof obj == 'object' && typeof other == 'object') {// object contains object case
	      shouldTypeAdaptors$$1.forEach(other, function(value, key) {
	        should(obj[key]).containDeep(value);
	      });

	      // if both objects is empty means we finish traversing - and we need to compare for hidden values
	      if (shouldTypeAdaptors$$1.isEmpty(other)) {
	        this.eql(other);
	      }
	    } else {
	      this.eql(other);
	    }
	  });

	}

	var aSlice = Array.prototype.slice;

	function propertyAssertions(should, Assertion) {
	  var i = should.format;
	  /**
	   * Asserts given object has some descriptor. **On success it change given object to be value of property**.
	   *
	   * @name propertyWithDescriptor
	   * @memberOf Assertion
	   * @category assertion property
	   * @param {string} name Name of property
	   * @param {Object} desc Descriptor like used in Object.defineProperty (not required to add all properties)
	   * @example
	   *
	   * ({ a: 10 }).should.have.propertyWithDescriptor('a', { enumerable: true });
	   */
	  Assertion.add('propertyWithDescriptor', function(name, desc) {
	    this.params = {actual: this.obj, operator: 'to have own property with descriptor ' + i(desc)};
	    var obj = this.obj;
	    this.have.ownProperty(name);
	    should(Object.getOwnPropertyDescriptor(Object(obj), name)).have.properties(desc);
	  });

	  function processPropsArgs() {
	    var args = {};
	    if (arguments.length > 1) {
	      args.names = aSlice.call(arguments);
	    } else {
	      var arg = arguments[0];
	      if (typeof arg === 'string') {
	        args.names = [arg];
	      } else if (Array.isArray(arg)) {
	        args.names = arg;
	      } else {
	        args.names = Object.keys(arg);
	        args.values = arg;
	      }
	    }
	    return args;
	  }


	  /**
	   * Asserts given object has enumerable property with optionally value. **On success it change given object to be value of property**.
	   *
	   * @name enumerable
	   * @memberOf Assertion
	   * @category assertion property
	   * @param {string} name Name of property
	   * @param {*} [val] Optional property value to check
	   * @example
	   *
	   * ({ a: 10 }).should.have.enumerable('a');
	   */
	  Assertion.add('enumerable', function(name, val) {
	    name = convertPropertyName(name);

	    this.params = {
	      operator: "to have enumerable property " + formatProp(name) + (arguments.length > 1 ? " equal to " + i(val): "")
	    };

	    var desc = { enumerable: true };
	    if (arguments.length > 1) {
	      desc.value = val;
	    }
	    this.have.propertyWithDescriptor(name, desc);
	  });

	  /**
	   * Asserts given object has enumerable properties
	   *
	   * @name enumerables
	   * @memberOf Assertion
	   * @category assertion property
	   * @param {Array|...string|Object} names Names of property
	   * @example
	   *
	   * ({ a: 10, b: 10 }).should.have.enumerables('a');
	   */
	  Assertion.add('enumerables', function(/*names*/) {
	    var args = processPropsArgs.apply(null, arguments);

	    this.params = {
	      operator: "to have enumerables " + args.names.map(formatProp)
	    };

	    var obj = this.obj;
	    args.names.forEach(function(name) {
	      should(obj).have.enumerable(name);
	    });
	  });

	  /**
	   * Asserts given object has property with optionally value. **On success it change given object to be value of property**.
	   *
	   * @name property
	   * @memberOf Assertion
	   * @category assertion property
	   * @param {string} name Name of property
	   * @param {*} [val] Optional property value to check
	   * @example
	   *
	   * ({ a: 10 }).should.have.property('a');
	   */
	  Assertion.add('property', function(name, val) {
	    name = convertPropertyName(name);
	    if (arguments.length > 1) {
	      var p = {};
	      p[name] = val;
	      this.have.properties(p);
	    } else {
	      this.have.properties(name);
	    }
	    this.obj = this.obj[name];
	  });

	  /**
	   * Asserts given object has properties. On this method affect .any modifier, which allow to check not all properties.
	   *
	   * @name properties
	   * @memberOf Assertion
	   * @category assertion property
	   * @param {Array|...string|Object} names Names of property
	   * @example
	   *
	   * ({ a: 10 }).should.have.properties('a');
	   * ({ a: 10, b: 20 }).should.have.properties([ 'a' ]);
	   * ({ a: 10, b: 20 }).should.have.properties({ b: 20 });
	   */
	  Assertion.add('properties', function(names) {
	    var values = {};
	    if (arguments.length > 1) {
	      names = aSlice.call(arguments);
	    } else if (!Array.isArray(names)) {
	      if (typeof names == 'string' || typeof names == 'symbol') {
	        names = [names];
	      } else {
	        values = names;
	        names = Object.keys(names);
	      }
	    }

	    var obj = Object(this.obj), missingProperties = [];

	    //just enumerate properties and check if they all present
	    names.forEach(function(name) {
	      if (!(name in obj)) {
	        missingProperties.push(formatProp(name));
	      }
	    });

	    var props = missingProperties;
	    if (props.length === 0) {
	      props = names.map(formatProp);
	    } else if (this.anyOne) {
	      props = names.filter(function(name) {
	        return missingProperties.indexOf(formatProp(name)) < 0;
	      }).map(formatProp);
	    }

	    var operator = (props.length === 1 ?
	        'to have property ' : 'to have ' + (this.anyOne ? 'any of ' : '') + 'properties ') + props.join(', ');

	    this.params = {obj: this.obj, operator: operator};

	    //check that all properties presented
	    //or if we request one of them that at least one them presented
	    this.assert(missingProperties.length === 0 || (this.anyOne && missingProperties.length != names.length));

	    // check if values in object matched expected
	    var valueCheckNames = Object.keys(values);
	    if (valueCheckNames.length) {
	      var wrongValues = [];
	      props = [];

	      // now check values, as there we have all properties
	      valueCheckNames.forEach(function(name) {
	        var value = values[name];
	        if (eql(obj[name], value).length !== 0) {
	          wrongValues.push(formatProp(name) + ' of ' + i(value) + ' (got ' + i(obj[name]) + ')');
	        } else {
	          props.push(formatProp(name) + ' of ' + i(value));
	        }
	      });

	      if ((wrongValues.length !== 0 && !this.anyOne) || (this.anyOne && props.length === 0)) {
	        props = wrongValues;
	      }

	      operator = (props.length === 1 ?
	        'to have property ' : 'to have ' + (this.anyOne ? 'any of ' : '') + 'properties ') + props.join(', ');

	      this.params = {obj: this.obj, operator: operator};

	      //if there is no not matched values
	      //or there is at least one matched
	      this.assert(wrongValues.length === 0 || (this.anyOne && wrongValues.length != valueCheckNames.length));
	    }
	  });

	  /**
	   * Asserts given object has property `length` with given value `n`
	   *
	   * @name length
	   * @alias Assertion#lengthOf
	   * @memberOf Assertion
	   * @category assertion property
	   * @param {number} n Expected length
	   * @param {string} [description] Optional message
	   * @example
	   *
	   * [1, 2].should.have.length(2);
	   */
	  Assertion.add('length', function(n, description) {
	    this.have.property('length', n, description);
	  });

	  Assertion.alias('length', 'lengthOf');

	  /**
	   * Asserts given object has own property. **On success it change given object to be value of property**.
	   *
	   * @name ownProperty
	   * @alias Assertion#hasOwnProperty
	   * @memberOf Assertion
	   * @category assertion property
	   * @param {string} name Name of property
	   * @param {string} [description] Optional message
	   * @example
	   *
	   * ({ a: 10 }).should.have.ownProperty('a');
	   */
	  Assertion.add('ownProperty', function(name, description) {
	    name = convertPropertyName(name);
	    this.params = {
	      actual: this.obj,
	      operator: 'to have own property ' + formatProp(name),
	      message: description
	    };

	    this.assert(shouldUtil$$1.hasOwnProperty(this.obj, name));

	    this.obj = this.obj[name];
	  });

	  Assertion.alias('ownProperty', 'hasOwnProperty');

	  /**
	   * Asserts given object is empty. For strings, arrays and arguments it checks .length property, for objects it checks keys.
	   *
	   * @name empty
	   * @memberOf Assertion
	   * @category assertion property
	   * @example
	   *
	   * ''.should.be.empty();
	   * [].should.be.empty();
	   * ({}).should.be.empty();
	   */
	  Assertion.add('empty', function() {
	    this.params = {operator: 'to be empty'};
	    this.assert(shouldTypeAdaptors$$1.isEmpty(this.obj));
	  }, true);

	  /**
	   * Asserts given object has such keys. Compared to `properties`, `keys` does not accept Object as a argument.
	   * When calling via .key current object in assertion changed to value of this key
	   *
	   * @name keys
	   * @alias Assertion#key
	   * @memberOf Assertion
	   * @category assertion property
	   * @param {...*} keys Keys to check
	   * @example
	   *
	   * ({ a: 10 }).should.have.keys('a');
	   * ({ a: 10, b: 20 }).should.have.keys('a', 'b');
	   * (new Map([[1, 2]])).should.have.key(1);
	   */
	  Assertion.add('keys', function(keys) {
	    keys = aSlice.call(arguments);

	    var obj = Object(this.obj);

	    // first check if some keys are missing
	    var missingKeys = keys.filter(function(key) {
	      return !shouldTypeAdaptors$$1.has(obj, key);
	    });

	    var verb = 'to have ' + (keys.length === 1 ? 'key ' : 'keys ');

	    this.params = {operator: verb + keys.join(', ')};

	    if (missingKeys.length > 0) {
	      this.params.operator += '\n\tmissing keys: ' + missingKeys.join(', ');
	    }

	    this.assert(missingKeys.length === 0);
	  });


	  Assertion.add('key', function(key) {
	    this.have.keys(key);
	    this.obj = shouldTypeAdaptors$$1.get(this.obj, key);
	  });

	  /**
	   * Asserts given object has such value for given key
	   *
	   * @name value
	   * @memberOf Assertion
	   * @category assertion property
	   * @param {*} key Key to check
	   * @param {*} value Value to check
	   * @example
	   *
	   * ({ a: 10 }).should.have.value('a', 10);
	   * (new Map([[1, 2]])).should.have.value(1, 2);
	   */
	  Assertion.add('value', function(key, value) {
	    this.have.key(key).which.is.eql(value);
	  });

	  /**
	   * Asserts given object has such size.
	   *
	   * @name size
	   * @memberOf Assertion
	   * @category assertion property
	   * @param {number} s Size to check
	   * @example
	   *
	   * ({ a: 10 }).should.have.size(1);
	   * (new Map([[1, 2]])).should.have.size(1);
	   */
	  Assertion.add('size', function(s) {
	    this.params = { operator: 'to have size ' + s };
	    shouldTypeAdaptors$$1.size(this.obj).should.be.exactly(s);
	  });

	  /**
	   * Asserts given object has nested property in depth by path. **On success it change given object to be value of final property**.
	   *
	   * @name propertyByPath
	   * @memberOf Assertion
	   * @category assertion property
	   * @param {Array|...string} properties Properties path to search
	   * @example
	   *
	   * ({ a: {b: 10}}).should.have.propertyByPath('a', 'b').eql(10);
	   */
	  Assertion.add('propertyByPath', function(properties) {
	    if (arguments.length > 1) {
	      properties = aSlice.call(arguments);
	    } else if (arguments.length === 1 && typeof properties == 'string') {
	      properties = [properties];
	    } else if (arguments.length === 0) {
	      properties = [];
	    }

	    var allProps = properties.map(formatProp);

	    properties = properties.map(String);

	    var obj = should(Object(this.obj));

	    var foundProperties = [];

	    var currentProperty;
	    while (properties.length) {
	      currentProperty = properties.shift();
	      this.params = {operator: 'to have property by path ' + allProps.join(', ') + ' - failed on ' + formatProp(currentProperty)};
	      obj = obj.have.property(currentProperty);
	      foundProperties.push(currentProperty);
	    }

	    this.params = {obj: this.obj, operator: 'to have property by path ' + allProps.join(', ')};

	    this.obj = obj.obj;
	  });
	}

	function errorAssertions(should, Assertion) {
	  var i = should.format;

	  /**
	   * Assert given function throws error with such message.
	   *
	   * @name throw
	   * @memberOf Assertion
	   * @category assertion errors
	   * @alias Assertion#throwError
	   * @param {string|RegExp|Function|Object|GeneratorFunction|GeneratorObject} [message] Message to match or properties
	   * @param {Object} [properties] Optional properties that will be matched to thrown error
	   * @example
	   *
	   * (function(){ throw new Error('fail') }).should.throw();
	   * (function(){ throw new Error('fail') }).should.throw('fail');
	   * (function(){ throw new Error('fail') }).should.throw(/fail/);
	   *
	   * (function(){ throw new Error('fail') }).should.throw(Error);
	   * var error = new Error();
	   * error.a = 10;
	   * (function(){ throw error; }).should.throw(Error, { a: 10 });
	   * (function(){ throw error; }).should.throw({ a: 10 });
	   * (function*() {
	   *   yield throwError();
	   * }).should.throw();
	   */
	  Assertion.add('throw', function(message, properties) {
	    var fn = this.obj;
	    var err = {};
	    var errorInfo = '';
	    var thrown = false;

	    if (shouldUtil$$1.isGeneratorFunction(fn)) {
	      return should(fn()).throw(message, properties);
	    } else if (shouldUtil$$1.isIterator(fn)) {
	      return should(fn.next.bind(fn)).throw(message, properties);
	    }

	    this.is.a.Function();

	    var errorMatched = true;

	    try {
	      fn();
	    } catch (e) {
	      thrown = true;
	      err = e;
	    }

	    if (thrown) {
	      if (message) {
	        if ('string' == typeof message) {
	          errorMatched = message == err.message;
	        } else if (message instanceof RegExp) {
	          errorMatched = message.test(err.message);
	        } else if ('function' == typeof message) {
	          errorMatched = err instanceof message;
	        } else if (null != message) {
	          try {
	            should(err).match(message);
	          } catch (e) {
	            if (e instanceof should.AssertionError) {
	              errorInfo = ": " + e.message;
	              errorMatched = false;
	            } else {
	              throw e;
	            }
	          }
	        }

	        if (!errorMatched) {
	          if ('string' == typeof message || message instanceof RegExp) {
	            errorInfo = " with a message matching " + i(message) + ", but got '" + err.message + "'";
	          } else if ('function' == typeof message) {
	            errorInfo = " of type " + functionName(message) + ", but got " + functionName(err.constructor);
	          }
	        } else if ('function' == typeof message && properties) {
	          try {
	            should(err).match(properties);
	          } catch (e) {
	            if (e instanceof should.AssertionError) {
	              errorInfo = ": " + e.message;
	              errorMatched = false;
	            } else {
	              throw e;
	            }
	          }
	        }
	      } else {
	        errorInfo = " (got " + i(err) + ")";
	      }
	    }

	    this.params = { operator: 'to throw exception' + errorInfo };

	    this.assert(thrown);
	    this.assert(errorMatched);
	  });

	  Assertion.alias('throw', 'throwError');
	}

	function matchingAssertions(should, Assertion) {
	  var i = should.format;

	  /**
	   * Asserts if given object match `other` object, using some assumptions:
	   * First object matched if they are equal,
	   * If `other` is a regexp and given object is a string check on matching with regexp
	   * If `other` is a regexp and given object is an array check if all elements matched regexp
	   * If `other` is a regexp and given object is an object check values on matching regexp
	   * If `other` is a function check if this function throws AssertionError on given object or return false - it will be assumed as not matched
	   * If `other` is an object check if the same keys matched with above rules
	   * All other cases failed.
	   *
	   * Usually it is right idea to add pre type assertions, like `.String()` or `.Object()` to be sure assertions will do what you are expecting.
	   * Object iteration happen by keys (properties with enumerable: true), thus some objects can cause small pain. Typical example is js
	   * Error - it by default has 2 properties `name` and `message`, but they both non-enumerable. In this case make sure you specify checking props (see examples).
	   *
	   * @name match
	   * @memberOf Assertion
	   * @category assertion matching
	   * @param {*} other Object to match
	   * @param {string} [description] Optional message
	   * @example
	   * 'foobar'.should.match(/^foo/);
	   * 'foobar'.should.not.match(/^bar/);
	   *
	   * ({ a: 'foo', c: 'barfoo' }).should.match(/foo$/);
	   *
	   * ['a', 'b', 'c'].should.match(/[a-z]/);
	   *
	   * (5).should.not.match(function(n) {
	   *   return n < 0;
	   * });
	   * (5).should.not.match(function(it) {
	   *    it.should.be.an.Array();
	   * });
	   * ({ a: 10, b: 'abc', c: { d: 10 }, d: 0 }).should
	   * .match({ a: 10, b: /c$/, c: function(it) {
	   *    return it.should.have.property('d', 10);
	   * }});
	   *
	   * [10, 'abc', { d: 10 }, 0].should
	   * .match({ '0': 10, '1': /c$/, '2': function(it) {
	   *    return it.should.have.property('d', 10);
	   * }});
	   *
	   * var myString = 'abc';
	   *
	   * myString.should.be.a.String().and.match(/abc/);
	   *
	   * myString = {};
	   *
	   * myString.should.match(/abc/); //yes this will pass
	   * //better to do
	   * myString.should.be.an.Object().and.not.empty().and.match(/abc/);//fixed
	   *
	   * (new Error('boom')).should.match(/abc/);//passed because no keys
	   * (new Error('boom')).should.not.match({ message: /abc/ });//check specified property
	   */
	  Assertion.add('match', function(other, description) {
	    this.params = {operator: 'to match ' + i(other), message: description};

	    if (eql(this.obj, other).length !== 0) {
	      if (other instanceof RegExp) { // something - regex

	        if (typeof this.obj == 'string') {

	          this.assert(other.exec(this.obj));
	        } else if (null != this.obj && typeof this.obj == 'object') {

	          var notMatchedProps = [], matchedProps = [];
	          shouldTypeAdaptors$$1.forEach(this.obj, function(value, name) {
	            if (other.exec(value)) {
	              matchedProps.push(formatProp(name));
	            } else {
	              notMatchedProps.push(formatProp(name) + ' (' + i(value) + ')');
	            }
	          }, this);

	          if (notMatchedProps.length) {
	            this.params.operator += '\n    not matched properties: ' + notMatchedProps.join(', ');
	          }
	          if (matchedProps.length) {
	            this.params.operator += '\n    matched properties: ' + matchedProps.join(', ');
	          }

	          this.assert(notMatchedProps.length === 0);
	        } // should we try to convert to String and exec?
	      } else if (typeof other == 'function') {
	        var res;

	        res = other(this.obj);

	        //if we throw exception ok - it is used .should inside
	        if (typeof res == 'boolean') {
	          this.assert(res); // if it is just boolean function assert on it
	        }
	      } else if (other != null && this.obj != null && typeof other == 'object' && typeof this.obj == 'object') { // try to match properties (for Object and Array)
	        notMatchedProps = [];
	        matchedProps = [];

	        shouldTypeAdaptors$$1.forEach(other, function(value, key) {
	          try {
	            should(this.obj).have.property(key).which.match(value);
	            matchedProps.push(formatProp(key));
	          } catch (e) {
	            if (e instanceof should.AssertionError) {
	              notMatchedProps.push(formatProp(key) + ' (' + i(this.obj[key]) + ')');
	            } else {
	              throw e;
	            }
	          }
	        }, this);

	        if (notMatchedProps.length) {
	          this.params.operator += '\n    not matched properties: ' + notMatchedProps.join(', ');
	        }
	        if (matchedProps.length) {
	          this.params.operator += '\n    matched properties: ' + matchedProps.join(', ');
	        }

	        this.assert(notMatchedProps.length === 0);
	      } else {
	        this.assert(false);
	      }
	    }
	  });

	  /**
	   * Asserts if given object values or array elements all match `other` object, using some assumptions:
	   * First object matched if they are equal,
	   * If `other` is a regexp - matching with regexp
	   * If `other` is a function check if this function throws AssertionError on given object or return false - it will be assumed as not matched
	   * All other cases check if this `other` equal to each element
	   *
	   * @name matchEach
	   * @memberOf Assertion
	   * @category assertion matching
	   * @alias Assertion#matchEvery
	   * @param {*} other Object to match
	   * @param {string} [description] Optional message
	   * @example
	   * [ 'a', 'b', 'c'].should.matchEach(/\w+/);
	   * [ 'a', 'a', 'a'].should.matchEach('a');
	   *
	   * [ 'a', 'a', 'a'].should.matchEach(function(value) { value.should.be.eql('a') });
	   *
	   * { a: 'a', b: 'a', c: 'a' }.should.matchEach(function(value) { value.should.be.eql('a') });
	   */
	  Assertion.add('matchEach', function(other, description) {
	    this.params = {operator: 'to match each ' + i(other), message: description};

	    shouldTypeAdaptors$$1.forEach(this.obj, function(value) {
	      should(value).match(other);
	    }, this);
	  });

	  /**
	  * Asserts if any of given object values or array elements match `other` object, using some assumptions:
	  * First object matched if they are equal,
	  * If `other` is a regexp - matching with regexp
	  * If `other` is a function check if this function throws AssertionError on given object or return false - it will be assumed as not matched
	  * All other cases check if this `other` equal to each element
	  *
	  * @name matchAny
	  * @memberOf Assertion
	  * @category assertion matching
	  * @param {*} other Object to match
	  * @alias Assertion#matchSome
	  * @param {string} [description] Optional message
	  * @example
	  * [ 'a', 'b', 'c'].should.matchAny(/\w+/);
	  * [ 'a', 'b', 'c'].should.matchAny('a');
	  *
	  * [ 'a', 'b', 'c'].should.matchAny(function(value) { value.should.be.eql('a') });
	  *
	  * { a: 'a', b: 'b', c: 'c' }.should.matchAny(function(value) { value.should.be.eql('a') });
	  */
	  Assertion.add('matchAny', function(other, description) {
	    this.params = {operator: 'to match any ' + i(other), message: description};

	    this.assert(shouldTypeAdaptors$$1.some(this.obj, function(value) {
	      try {
	        should(value).match(other);
	        return true;
	      } catch (e) {
	        if (e instanceof should.AssertionError) {
	          // Caught an AssertionError, return false to the iterator
	          return false;
	        }
	        throw e;
	      }
	    }));
	  });

	  Assertion.alias('matchAny', 'matchSome');
	  Assertion.alias('matchEach', 'matchEvery');
	}

	/**
	 * Our function should
	 *
	 * @param {*} obj Object to assert
	 * @returns {should.Assertion} Returns new Assertion for beginning assertion chain
	 * @example
	 *
	 * var should = require('should');
	 * should('abc').be.a.String();
	 */
	function should(obj) {
	  return (new Assertion(obj));
	}

	should.AssertionError = AssertionError;
	should.Assertion = Assertion;

	// exposing modules dirty way
	should.modules = {
	  format: sformat,
	  type: getType,
	  equal: eql
	};
	should.format = format;

	/**
	 * Object with configuration.
	 * It contains such properties:
	 * * `checkProtoEql` boolean - Affect if `.eql` will check objects prototypes
	 * * `plusZeroAndMinusZeroEqual` boolean - Affect if `.eql` will treat +0 and -0 as equal
	 * Also it can contain options for should-format.
	 *
	 * @type {Object}
	 * @memberOf should
	 * @static
	 * @example
	 *
	 * var a = { a: 10 }, b = Object.create(null);
	 * b.a = 10;
	 *
	 * a.should.be.eql(b);
	 * //not throws
	 *
	 * should.config.checkProtoEql = true;
	 * a.should.be.eql(b);
	 * //throws AssertionError: expected { a: 10 } to equal { a: 10 } (because A and B have different prototypes)
	 */
	should.config = config;

	/**
	 * Allow to extend given prototype with should property using given name. This getter will **unwrap** all standard wrappers like `Number`, `Boolean`, `String`.
	 * Using `should(obj)` is the equivalent of using `obj.should` with known issues (like nulls and method calls etc).
	 *
	 * To add new assertions, need to use Assertion.add method.
	 *
	 * @param {string} [propertyName] Name of property to add. Default is `'should'`.
	 * @param {Object} [proto] Prototype to extend with. Default is `Object.prototype`.
	 * @memberOf should
	 * @returns {{ name: string, descriptor: Object, proto: Object }} Descriptor enough to return all back
	 * @static
	 * @example
	 *
	 * var prev = should.extend('must', Object.prototype);
	 *
	 * 'abc'.must.startWith('a');
	 *
	 * var should = should.noConflict(prev);
	 * should.not.exist(Object.prototype.must);
	 */
	should.extend = function(propertyName, proto) {
	  propertyName = propertyName || 'should';
	  proto = proto || Object.prototype;

	  var prevDescriptor = Object.getOwnPropertyDescriptor(proto, propertyName);

	  Object.defineProperty(proto, propertyName, {
	    set: function() {
	    },
	    get: function() {
	      return should(isWrapperType(this) ? this.valueOf() : this);
	    },
	    configurable: true
	  });

	  return { name: propertyName, descriptor: prevDescriptor, proto: proto };
	};

	/**
	 * Delete previous extension. If `desc` missing it will remove default extension.
	 *
	 * @param {{ name: string, descriptor: Object, proto: Object }} [desc] Returned from `should.extend` object
	 * @memberOf should
	 * @returns {Function} Returns should function
	 * @static
	 * @example
	 *
	 * var should = require('should').noConflict();
	 *
	 * should(Object.prototype).not.have.property('should');
	 *
	 * var prev = should.extend('must', Object.prototype);
	 * 'abc'.must.startWith('a');
	 * should.noConflict(prev);
	 *
	 * should(Object.prototype).not.have.property('must');
	 */
	should.noConflict = function(desc) {
	  desc = desc || should._prevShould;

	  if (desc) {
	    delete desc.proto[desc.name];

	    if (desc.descriptor) {
	      Object.defineProperty(desc.proto, desc.name, desc.descriptor);
	    }
	  }
	  return should;
	};

	/**
	 * Simple utility function for a bit more easier should assertion extension
	 * @param {Function} f So called plugin function. It should accept 2 arguments: `should` function and `Assertion` constructor
	 * @memberOf should
	 * @returns {Function} Returns `should` function
	 * @static
	 * @example
	 *
	 * should.use(function(should, Assertion) {
	 *   Assertion.add('asset', function() {
	 *      this.params = { operator: 'to be asset' };
	 *
	 *      this.obj.should.have.property('id').which.is.a.Number();
	 *      this.obj.should.have.property('path');
	 *  })
	 * })
	 */
	should.use = function(f) {
	  f(should, should.Assertion);
	  return this;
	};

	should
	  .use(assertExtensions)
	  .use(chainAssertions)
	  .use(booleanAssertions)
	  .use(numberAssertions)
	  .use(equalityAssertions)
	  .use(typeAssertions)
	  .use(stringAssertions)
	  .use(propertyAssertions)
	  .use(errorAssertions)
	  .use(matchingAssertions)
	  .use(containAssertions)
	  .use(promiseAssertions);

	module.exports = should;
	});

	var index = createCommonjsModule(function (module) {
	var should$$1 = should;

	var defaultProto = Object.prototype;
	var defaultProperty = 'should';

	//Expose api via `Object#should`.
	try {
	  var prevShould = should$$1.extend(defaultProperty, defaultProto);
	  should$$1._prevShould = prevShould;
	} catch(e) {
	  //ignore errors
	}

	module.exports = should$$1;
	});

	var shouldSinon = createCommonjsModule(function (module, exports) {
	(function (factory) {
	  if (typeof define === 'function' && define.amd) {
	    define(['should'], factory);
	  } else if (typeof exports === 'object') {
	    module.exports = factory(index);
	  } else {
	    factory(Should);
	  }
	}(function (should) {
	  var Assertion = should.Assertion;

	  function timesInWords(count) {
	    switch (count) {
	      case 1:
	          return "once";
	      case 2:
	          return "twice";
	      case 3:
	          return "thrice";
	      default:
	          return (count || 0) + " times";
	    }
	  }

	  function isCall(call) {
	    return call && isSpy(call.proxy);
	  }

	  function isSpy(spy) {
	    return typeof spy === "function" &&
	           typeof spy.getCall === "function" &&
	           typeof spy.calledWithExactly === "function";
	  }

	  function proxySinonBooleanProperty(name, message) {
	    Assertion.add(name, function() {
	      var obj = this.obj;

	      if(!isSpy(obj) && !isCall(obj)) {
	        this.params = { obj: obj.toString(), operator: 'to be sinon spy or spy call' };
	        this.fail();
	      }
	      if(isCall(obj)) {
	        obj = obj.proxy;
	      }

	      this.params = { obj: obj.toString(), operator: obj.printf(message) };

	      should(obj[name]).be.true();
	    });
	  }

	  function proxySinonMethod(name, message) {
	    Assertion.add(name, function() {
	      var obj = this.obj;

	      if(!isSpy(obj) && !isCall(obj)) {
	        this.params = { obj: obj.toString(), operator: 'to be sinon spy or spy call' };
	        this.fail();
	      }
	      if(isCall(obj)) {
	        obj = obj.proxy;
	      }

	      var args = Array.prototype.slice.call(arguments);
	      args.unshift(message);

	      this.params = { obj: obj.toString(), operator: obj.printf.apply(obj, args) };

	      should(obj[name].apply(obj, arguments)).be.true();
	    });
	  }

	  /**
	   * Assert stub was called at least once
	   *
	   * @name called
	   * @memberOf Assertion
	   * @category assertion stubs
	   * @module should-sinon
	   * @example
	   *
	   * var callback = sinon.spy();
	   * callback();
	   * callback.should.be.called();
	   */
	  proxySinonBooleanProperty('called', 'to have been called, but was called %c');

	  /**
	   * Assert stub was called at exactly once
	   *
	   * @name calledOnce
	   * @memberOf Assertion
	   * @category assertion stubs
	   * @module should-sinon
	   * @example
	   *
	   * var callback = sinon.spy();
	   * callback();
	   * callback.should.be.calledOnce();
	   */
	  proxySinonBooleanProperty('calledOnce', 'to be called once but was called %c%C');

	  /**
	   * Assert stub was called at exactly twice
	   *
	   * @name calledTwice
	   * @memberOf Assertion
	   * @category assertion stubs
	   * @module should-sinon
	   * @example
	   *
	   * var callback = sinon.spy();
	   * callback();
	   * callback();
	   * callback.should.be.calledTwice();
	   */
	  proxySinonBooleanProperty('calledTwice', 'to be called twice but was called %c%C');

	  /**
	   * Assert stub was called at exactly thrice
	   *
	   * @name calledThrice
	   * @memberOf Assertion
	   * @category assertion stubs
	   * @module should-sinon
	   * @example
	   *
	   * var callback = sinon.spy();
	   * callback();
	   * callback();
	   * callback();
	   * callback.should.be.calledThrice();
	   */
	  proxySinonBooleanProperty('calledThrice', 'to be called thrice but was called %c%C');

	  /**
	   * Assert stub was called with given object as this
	   *
	   * @name calledOn
	   * @memberOf Assertion
	   * @category assertion stubs
	   * @module should-sinon
	   * @param {*} obj - object that was used as this
	   * @example
	   *
	   * var callback = sinon.spy();
	   * var obj = {};
	   * callback.call(obj);
	   * callback.should.be.calledOn(obj);
	   */
	  proxySinonMethod('calledOn', 'to be called with %1 as this but was called with %t');

	  /**
	   * Assert stub was called with given object as this always. So if you call stub several times
	   * all should be with the same object
	   *
	   * @name alwaysCalledOn
	   * @memberOf Assertion
	   * @category assertion stubs
	   * @module should-sinon
	   * @param {*} obj - object that was used as this
	   * @example
	   *
	   * var callback = sinon.spy();
	   * var obj = {};
	   * callback.call(obj);
	   * callback.should.be.alwaysCalledOn(obj);
	   */
	  proxySinonMethod('alwaysCalledOn', 'to always be called with %1 as this but was called with %t');

	  /**
	   * Asserts that stub was called with new
	   *
	   * @name calledWithNew
	   * @memberOf Assertion
	   * @category assertion stubs
	   * @module should-sinon
	   * @example
	   *
	   * var Class = sinon.spy();
	   *
	   * var c = new Class();
	   *
	   * Class.should.be.calledWithNew;
	   */
	  proxySinonMethod('calledWithNew', 'to be called with new');

	  /**
	   * @name alwaysCalledWithNew
	   * @memberOf Assertion
	   * @category assertion stubs
	   * @module should-sinon
	   * @example
	   *
	   * var Class = sinon.spy();
	   *
	   * var c1 = new Class();
	   * var c2 = new Class();
	   *
	   * Class.should.be.alwaysCalledWithNew;
	   */
	  proxySinonMethod('alwaysCalledWithNew', 'to always be called with new');

	  /**
	   * Asserts that stub was called with given arguments
	   *
	   * @name calledWith
	   * @memberOf Assertion
	   * @category assertion stubs
	   * @module should-sinon
	   * @param {...*} args - arguments that was used for calling
	   * @example
	   *
	   * var callback = sinon.spy();
	   *
	   * callback(1, 2, 3);
	   *
	   * callback.should.be.calledWith(1, 2, 3);
	   */
	  proxySinonMethod('calledWith', 'to be called with arguments %*%C');

	  /**
	   * @name alwaysCalledWith
	   * @memberOf Assertion
	   * @category assertion stubs
	   * @module should-sinon
	   * @param {...*} args - arguments that was used for calling
	   * @example
	   *
	   * var callback = sinon.spy();
	   *
	   * callback(1, 2, 3);
	   *
	   * callback.should.be.alwaysCalledWith(1, 2, 3);
	   */
	  proxySinonMethod('alwaysCalledWith', 'to always be called with arguments %*%C');

	  /**
	   * Returns true if the spy/stub was never called with the provided arguments.
	   *
	   * @name neverCalledWith
	   * @memberOf Assertion
	   * @category assertion stubs
	   * @module should-sinon
	   * @param {...*} args - arguments that was used for calling
	   * @example
	   *
	   * var callback = sinon.spy();
	   *
	   * callback(1, 2, 3);
	   *
	   * callback.should.be.neverCalledWith(1, 2, 3);
	   */
	  proxySinonMethod('neverCalledWith', 'to never be called with arguments %*%C');

	  /**
	   * Returns true if spy was called with matching arguments (and possibly others).
	   *
	   * @name calledWithMatch
	   * @memberOf Assertion
	   * @category assertion stubs
	   * @module should-sinon
	   * @param {...*} args - arguments that was used for calling
	   */
	  proxySinonMethod('calledWithMatch', 'to be called with match %*%C');

	  /**
	   * Returns true if spy was always called with matching arguments (and possibly others).
	   *
	   * @name alwaysCalledWithMatch
	   * @memberOf Assertion
	   * @category assertion stubs
	   * @module should-sinon
	   * @param {...*} args - arguments that was used for calling
	   */
	  proxySinonMethod('alwaysCalledWithMatch', 'to always be called with match %*%C');

	  /**
	   * Returns true if the spy/stub was never called with matching arguments.
	   *
	   * @name neverCalledWithMatch
	   * @memberOf Assertion
	   * @category assertion stubs
	   * @module should-sinon
	   * @param {...*} args - arguments that was used for calling
	   */
	  proxySinonMethod('neverCalledWithMatch', 'to never be called with match %*%C');

	  /**
	   * Returns true if call received provided arguments and no others.
	   *
	   * @name calledWithExactly
	   * @memberOf Assertion
	   * @category assertion stubs
	   * @module should-sinon
	   * @param {...*} args - arguments that was used for calling
	   */
	  proxySinonMethod('calledWithExactly', 'to be called with exact arguments %*%C');

	  /**
	   * Passes if the spy was always called with the provided arguments and no others.
	   *
	   * @name alwaysCalledWithExactly
	   * @memberOf Assertion
	   * @category assertion stubs
	   * @module should-sinon
	   * @param {...*} args - arguments that was used for calling
	   */
	  proxySinonMethod('alwaysCalledWithExactly', 'to always be called with exact arguments %*%C');

	  /**
	   * Passes if the spy threw the given exception. The exception can be a
	   * string denoting its type, or an actual object. If no argument is
	   * provided, the assertion passes if the spy ever threw any exception.
	   *
	   * @name threw
	   * @memberOf Assertion
	   * @category assertion stubs
	   * @module should-sinon
	   * @param {string|Error} ex - exception to be thrown
	   */
	  proxySinonMethod('threw', 'to throw exception%C');

	  /**
	   * Passes if the spy always threw the given exception. The exception can be a
	   * string denoting its type, or an actual object. If no argument is
	   * provided, the assertion passes if the spy ever threw any exception.
	   *
	   * @name alwaysThrew
	   * @memberOf Assertion
	   * @category assertion stubs
	   * @module should-sinon
	   * @param {string|Error} ex - exception to be thrown
	   */
	  proxySinonMethod('alwaysThrew', 'to always throw exception%C');

	  /**
	   * Assert stub was called at exact number of times
	   *
	   * @name callCount
	   * @memberOf Assertion
	   * @category assertion stubs
	   * @module should-sinon
	   * @param {Number} count - number of calles
	   * @example
	   *
	   * var callback = sinon.spy();
	   * callback.should.have.callCount(0);
	   * callback();
	   * callback.should.have.callCount(1);
	   * callback();
	   * callback.should.have.callCount(2);
	   */
	  Assertion.add('callCount', function(count) {
	    var obj = this.obj;

	    if(!isSpy(obj) && !isCall(obj)) {
	      this.params = { obj: obj.toString(), operator: 'to be sinon spy or spy call' };
	      this.fail();
	    }
	    if(isCall(obj)) {
	      obj = obj.proxy;
	    }

	    this.params = { operator: obj.printf('to be called ' + timesInWords(count) + ' but was called %c%C' )};

	    this.assert(obj.callCount === count);
	  });

	}));
	});

	var asFunction = createCommonjsModule(function (module) {
	module.exports = should;
	});

	var stringify$2 = createCommonjsModule(function (module) {
	var core  = _core
	  , $JSON = core.JSON || (core.JSON = {stringify: JSON.stringify});
	module.exports = function stringify$2(it){ // eslint-disable-line no-unused-vars
	  return $JSON.stringify.apply($JSON, arguments);
	};
	});

	var stringify$1 = createCommonjsModule(function (module) {
	module.exports = { "default": stringify$2, __esModule: true };
	});

	var _JSON$stringify = unwrapExports(stringify$1);

	var _isArray = createCommonjsModule(function (module) {
	// 7.2.2 IsArray(argument)
	var cof = _cof;
	module.exports = Array.isArray || function isArray(arg){
	  return cof(arg) == 'Array';
	};
	});

	var _arraySpeciesConstructor = createCommonjsModule(function (module) {
	var isObject = _isObject
	  , isArray  = _isArray
	  , SPECIES  = _wks('species');

	module.exports = function(original){
	  var C;
	  if(isArray(original)){
	    C = original.constructor;
	    // cross-realm fallback
	    if(typeof C == 'function' && (C === Array || isArray(C.prototype)))C = undefined;
	    if(isObject(C)){
	      C = C[SPECIES];
	      if(C === null)C = undefined;
	    }
	  } return C === undefined ? Array : C;
	};
	});

	var _arraySpeciesCreate = createCommonjsModule(function (module) {
	// 9.4.2.3 ArraySpeciesCreate(originalArray, length)
	var speciesConstructor = _arraySpeciesConstructor;

	module.exports = function(original, length){
	  return new (speciesConstructor(original))(length);
	};
	});

	var _arrayMethods = createCommonjsModule(function (module) {
	// 0 -> Array#forEach
	// 1 -> Array#map
	// 2 -> Array#filter
	// 3 -> Array#some
	// 4 -> Array#every
	// 5 -> Array#find
	// 6 -> Array#findIndex
	var ctx      = _ctx
	  , IObject  = _iobject
	  , toObject = _toObject
	  , toLength = _toLength
	  , asc      = _arraySpeciesCreate;
	module.exports = function(TYPE, $create){
	  var IS_MAP        = TYPE == 1
	    , IS_FILTER     = TYPE == 2
	    , IS_SOME       = TYPE == 3
	    , IS_EVERY      = TYPE == 4
	    , IS_FIND_INDEX = TYPE == 6
	    , NO_HOLES      = TYPE == 5 || IS_FIND_INDEX
	    , create        = $create || asc;
	  return function($this, callbackfn, that){
	    var O      = toObject($this)
	      , self   = IObject(O)
	      , f      = ctx(callbackfn, that, 3)
	      , length = toLength(self.length)
	      , index  = 0
	      , result = IS_MAP ? create($this, length) : IS_FILTER ? create($this, 0) : undefined
	      , val, res;
	    for(;length > index; index++)if(NO_HOLES || index in self){
	      val = self[index];
	      res = f(val, index, O);
	      if(TYPE){
	        if(IS_MAP)result[index] = res;            // map
	        else if(res)switch(TYPE){
	          case 3: return true;                    // some
	          case 5: return val;                     // find
	          case 6: return index;                   // findIndex
	          case 2: result.push(val);               // filter
	        } else if(IS_EVERY)return false;          // every
	      }
	    }
	    return IS_FIND_INDEX ? -1 : IS_SOME || IS_EVERY ? IS_EVERY : result;
	  };
	};
	});

	var _meta = createCommonjsModule(function (module) {
	var META     = _uid('meta')
	  , isObject = _isObject
	  , has      = _has
	  , setDesc  = _objectDp.f
	  , id       = 0;
	var isExtensible = Object.isExtensible || function(){
	  return true;
	};
	var FREEZE = !_fails(function(){
	  return isExtensible(Object.preventExtensions({}));
	});
	var setMeta = function(it){
	  setDesc(it, META, {value: {
	    i: 'O' + ++id, // object ID
	    w: {}          // weak collections IDs
	  }});
	};
	var fastKey = function(it, create){
	  // return primitive with prefix
	  if(!isObject(it))return typeof it == 'symbol' ? it : (typeof it == 'string' ? 'S' : 'P') + it;
	  if(!has(it, META)){
	    // can't set metadata to uncaught frozen object
	    if(!isExtensible(it))return 'F';
	    // not necessary to add metadata
	    if(!create)return 'E';
	    // add missing metadata
	    setMeta(it);
	  // return object ID
	  } return it[META].i;
	};
	var getWeak = function(it, create){
	  if(!has(it, META)){
	    // can't set metadata to uncaught frozen object
	    if(!isExtensible(it))return true;
	    // not necessary to add metadata
	    if(!create)return false;
	    // add missing metadata
	    setMeta(it);
	  // return hash weak collections IDs
	  } return it[META].w;
	};
	// add metadata on freeze-family methods calling
	var onFreeze = function(it){
	  if(FREEZE && meta.NEED && isExtensible(it) && !has(it, META))setMeta(it);
	  return it;
	};
	var meta = module.exports = {
	  KEY:      META,
	  NEED:     false,
	  fastKey:  fastKey,
	  getWeak:  getWeak,
	  onFreeze: onFreeze
	};
	});

	var _objectGops = createCommonjsModule(function (module, exports) {
	exports.f = Object.getOwnPropertySymbols;
	});

	var _objectPie = createCommonjsModule(function (module, exports) {
	exports.f = {}.propertyIsEnumerable;
	});

	var _objectAssign = createCommonjsModule(function (module) {
	'use strict';
	// 19.1.2.1 Object.assign(target, source, ...)
	var getKeys  = _objectKeys
	  , gOPS     = _objectGops
	  , pIE      = _objectPie
	  , toObject = _toObject
	  , IObject  = _iobject
	  , $assign  = Object.assign;

	// should work with symbols and should have deterministic property order (V8 bug)
	module.exports = !$assign || _fails(function(){
	  var A = {}
	    , B = {}
	    , S = Symbol()
	    , K = 'abcdefghijklmnopqrst';
	  A[S] = 7;
	  K.split('').forEach(function(k){ B[k] = k; });
	  return $assign({}, A)[S] != 7 || Object.keys($assign({}, B)).join('') != K;
	}) ? function assign(target, source){ // eslint-disable-line no-unused-vars
	  var T     = toObject(target)
	    , aLen  = arguments.length
	    , index = 1
	    , getSymbols = gOPS.f
	    , isEnum     = pIE.f;
	  while(aLen > index){
	    var S      = IObject(arguments[index++])
	      , keys   = getSymbols ? getKeys(S).concat(getSymbols(S)) : getKeys(S)
	      , length = keys.length
	      , j      = 0
	      , key;
	    while(length > j)if(isEnum.call(S, key = keys[j++]))T[key] = S[key];
	  } return T;
	} : $assign;
	});

	var _collectionWeak = createCommonjsModule(function (module) {
	'use strict';
	var redefineAll       = _redefineAll
	  , getWeak           = _meta.getWeak
	  , anObject          = _anObject
	  , isObject          = _isObject
	  , anInstance        = _anInstance
	  , forOf             = _forOf
	  , createArrayMethod = _arrayMethods
	  , $has              = _has
	  , arrayFind         = createArrayMethod(5)
	  , arrayFindIndex    = createArrayMethod(6)
	  , id                = 0;

	// fallback for uncaught frozen keys
	var uncaughtFrozenStore = function(that){
	  return that._l || (that._l = new UncaughtFrozenStore);
	};
	var UncaughtFrozenStore = function(){
	  this.a = [];
	};
	var findUncaughtFrozen = function(store, key){
	  return arrayFind(store.a, function(it){
	    return it[0] === key;
	  });
	};
	UncaughtFrozenStore.prototype = {
	  get: function(key){
	    var entry = findUncaughtFrozen(this, key);
	    if(entry)return entry[1];
	  },
	  has: function(key){
	    return !!findUncaughtFrozen(this, key);
	  },
	  set: function(key, value){
	    var entry = findUncaughtFrozen(this, key);
	    if(entry)entry[1] = value;
	    else this.a.push([key, value]);
	  },
	  'delete': function(key){
	    var index = arrayFindIndex(this.a, function(it){
	      return it[0] === key;
	    });
	    if(~index)this.a.splice(index, 1);
	    return !!~index;
	  }
	};

	module.exports = {
	  getConstructor: function(wrapper, NAME, IS_MAP, ADDER){
	    var C = wrapper(function(that, iterable){
	      anInstance(that, C, NAME, '_i');
	      that._i = id++;      // collection id
	      that._l = undefined; // leak store for uncaught frozen objects
	      if(iterable != undefined)forOf(iterable, IS_MAP, that[ADDER], that);
	    });
	    redefineAll(C.prototype, {
	      // 23.3.3.2 WeakMap.prototype.delete(key)
	      // 23.4.3.3 WeakSet.prototype.delete(value)
	      'delete': function(key){
	        if(!isObject(key))return false;
	        var data = getWeak(key);
	        if(data === true)return uncaughtFrozenStore(this)['delete'](key);
	        return data && $has(data, this._i) && delete data[this._i];
	      },
	      // 23.3.3.4 WeakMap.prototype.has(key)
	      // 23.4.3.4 WeakSet.prototype.has(value)
	      has: function has(key){
	        if(!isObject(key))return false;
	        var data = getWeak(key);
	        if(data === true)return uncaughtFrozenStore(this).has(key);
	        return data && $has(data, this._i);
	      }
	    });
	    return C;
	  },
	  def: function(that, key, value){
	    var data = getWeak(anObject(key), true);
	    if(data === true)uncaughtFrozenStore(that).set(key, value);
	    else data[that._i] = value;
	    return that;
	  },
	  ufstore: uncaughtFrozenStore
	};
	});

	var _collection = createCommonjsModule(function (module) {
	'use strict';
	var global         = _global
	  , $export        = _export
	  , meta           = _meta
	  , fails          = _fails
	  , hide           = _hide
	  , redefineAll    = _redefineAll
	  , forOf          = _forOf
	  , anInstance     = _anInstance
	  , isObject       = _isObject
	  , setToStringTag = _setToStringTag
	  , dP             = _objectDp.f
	  , each           = _arrayMethods(0)
	  , DESCRIPTORS    = _descriptors;

	module.exports = function(NAME, wrapper, methods, common, IS_MAP, IS_WEAK){
	  var Base  = global[NAME]
	    , C     = Base
	    , ADDER = IS_MAP ? 'set' : 'add'
	    , proto = C && C.prototype
	    , O     = {};
	  if(!DESCRIPTORS || typeof C != 'function' || !(IS_WEAK || proto.forEach && !fails(function(){
	    new C().entries().next();
	  }))){
	    // create collection constructor
	    C = common.getConstructor(wrapper, NAME, IS_MAP, ADDER);
	    redefineAll(C.prototype, methods);
	    meta.NEED = true;
	  } else {
	    C = wrapper(function(target, iterable){
	      anInstance(target, C, NAME, '_c');
	      target._c = new Base;
	      if(iterable != undefined)forOf(iterable, IS_MAP, target[ADDER], target);
	    });
	    each('add,clear,delete,forEach,get,has,set,keys,values,entries,toJSON'.split(','),function(KEY){
	      var IS_ADDER = KEY == 'add' || KEY == 'set';
	      if(KEY in proto && !(IS_WEAK && KEY == 'clear'))hide(C.prototype, KEY, function(a, b){
	        anInstance(this, C, KEY);
	        if(!IS_ADDER && IS_WEAK && !isObject(a))return KEY == 'get' ? undefined : false;
	        var result = this._c[KEY](a === 0 ? 0 : a, b);
	        return IS_ADDER ? this : result;
	      });
	    });
	    if('size' in proto)dP(C.prototype, 'size', {
	      get: function(){
	        return this._c.size;
	      }
	    });
	  }

	  setToStringTag(C, NAME);

	  O[NAME] = C;
	  $export($export.G + $export.W + $export.F, O);

	  if(!IS_WEAK)common.setStrong(C, NAME, IS_MAP);

	  return C;
	};
	});

	var es6_weakMap = createCommonjsModule(function (module) {
	'use strict';
	var each         = _arrayMethods(0)
	  , redefine     = _redefine
	  , meta         = _meta
	  , assign       = _objectAssign
	  , weak         = _collectionWeak
	  , isObject     = _isObject
	  , getWeak      = meta.getWeak
	  , isExtensible = Object.isExtensible
	  , uncaughtFrozenStore = weak.ufstore
	  , tmp          = {}
	  , InternalMap;

	var wrapper = function(get){
	  return function WeakMap(){
	    return get(this, arguments.length > 0 ? arguments[0] : undefined);
	  };
	};

	var methods = {
	  // 23.3.3.3 WeakMap.prototype.get(key)
	  get: function get(key){
	    if(isObject(key)){
	      var data = getWeak(key);
	      if(data === true)return uncaughtFrozenStore(this).get(key);
	      return data ? data[this._i] : undefined;
	    }
	  },
	  // 23.3.3.5 WeakMap.prototype.set(key, value)
	  set: function set(key, value){
	    return weak.def(this, key, value);
	  }
	};

	// 23.3 WeakMap Objects
	var $WeakMap = module.exports = _collection('WeakMap', wrapper, methods, weak, true, true);

	// IE11 WeakMap frozen keys fix
	if(new $WeakMap().set((Object.freeze || Object)(tmp), 7).get(tmp) != 7){
	  InternalMap = weak.getConstructor(wrapper);
	  assign(InternalMap.prototype, methods);
	  meta.NEED = true;
	  each(['delete', 'has', 'get', 'set'], function(key){
	    var proto  = $WeakMap.prototype
	      , method = proto[key];
	    redefine(proto, key, function(a, b){
	      // store frozen objects on internal weakmap shim
	      if(isObject(a) && !isExtensible(a)){
	        if(!this._f)this._f = new InternalMap;
	        var result = this._f[key](a, b);
	        return key == 'set' ? this : result;
	      // store all the rest on native weakmap
	      } return method.call(this, a, b);
	    });
	  });
	}
	});

	var weakMap$1 = createCommonjsModule(function (module) {
	module.exports = _core.WeakMap;
	});

	var weakMap = createCommonjsModule(function (module) {
	module.exports = { "default": weakMap$1, __esModule: true };
	});

	var _WeakMap = unwrapExports(weakMap);

	var _createProperty = createCommonjsModule(function (module) {
	'use strict';
	var $defineProperty = _objectDp
	  , createDesc      = _propertyDesc;

	module.exports = function(object, index, value){
	  if(index in object)$defineProperty.f(object, index, createDesc(0, value));
	  else object[index] = value;
	};
	});

	var es6_array_from = createCommonjsModule(function (module) {
	'use strict';
	var ctx            = _ctx
	  , $export        = _export
	  , toObject       = _toObject
	  , call           = _iterCall
	  , isArrayIter    = _isArrayIter
	  , toLength       = _toLength
	  , createProperty = _createProperty
	  , getIterFn      = core_getIteratorMethod;

	$export($export.S + $export.F * !_iterDetect(function(iter){ Array.from(iter); }), 'Array', {
	  // 22.1.2.1 Array.from(arrayLike, mapfn = undefined, thisArg = undefined)
	  from: function from(arrayLike/*, mapfn = undefined, thisArg = undefined*/){
	    var O       = toObject(arrayLike)
	      , C       = typeof this == 'function' ? this : Array
	      , aLen    = arguments.length
	      , mapfn   = aLen > 1 ? arguments[1] : undefined
	      , mapping = mapfn !== undefined
	      , index   = 0
	      , iterFn  = getIterFn(O)
	      , length, result, step, iterator;
	    if(mapping)mapfn = ctx(mapfn, aLen > 2 ? arguments[2] : undefined, 2);
	    // if object isn't iterable or it's array with default iterator - use simple case
	    if(iterFn != undefined && !(C == Array && isArrayIter(iterFn))){
	      for(iterator = iterFn.call(O), result = new C; !(step = iterator.next()).done; index++){
	        createProperty(result, index, mapping ? call(iterator, mapfn, [step.value, index], true) : step.value);
	      }
	    } else {
	      length = toLength(O.length);
	      for(result = new C(length); length > index; index++){
	        createProperty(result, index, mapping ? mapfn(O[index], index) : O[index]);
	      }
	    }
	    result.length = index;
	    return result;
	  }
	});
	});

	var from$2 = createCommonjsModule(function (module) {
	module.exports = _core.Array.from;
	});

	var from$1 = createCommonjsModule(function (module) {
	module.exports = { "default": from$2, __esModule: true };
	});

	var _Array$from = unwrapExports(from$1);

	var toConsumableArray = createCommonjsModule(function (module, exports) {
	"use strict";

	exports.__esModule = true;

	var _from = from$1;

	var _from2 = _interopRequireDefault(_from);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = function (arr) {
	  if (Array.isArray(arr)) {
	    for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) {
	      arr2[i] = arr[i];
	    }

	    return arr2;
	  } else {
	    return (0, _from2.default)(arr);
	  }
	};
	});

	var _toConsumableArray = unwrapExports(toConsumableArray);

	var _collectionStrong = createCommonjsModule(function (module) {
	'use strict';
	var dP          = _objectDp.f
	  , create      = _objectCreate
	  , redefineAll = _redefineAll
	  , ctx         = _ctx
	  , anInstance  = _anInstance
	  , defined     = _defined
	  , forOf       = _forOf
	  , $iterDefine = _iterDefine
	  , step        = _iterStep
	  , setSpecies  = _setSpecies
	  , DESCRIPTORS = _descriptors
	  , fastKey     = _meta.fastKey
	  , SIZE        = DESCRIPTORS ? '_s' : 'size';

	var getEntry = function(that, key){
	  // fast case
	  var index = fastKey(key), entry;
	  if(index !== 'F')return that._i[index];
	  // frozen object case
	  for(entry = that._f; entry; entry = entry.n){
	    if(entry.k == key)return entry;
	  }
	};

	module.exports = {
	  getConstructor: function(wrapper, NAME, IS_MAP, ADDER){
	    var C = wrapper(function(that, iterable){
	      anInstance(that, C, NAME, '_i');
	      that._i = create(null); // index
	      that._f = undefined;    // first entry
	      that._l = undefined;    // last entry
	      that[SIZE] = 0;         // size
	      if(iterable != undefined)forOf(iterable, IS_MAP, that[ADDER], that);
	    });
	    redefineAll(C.prototype, {
	      // 23.1.3.1 Map.prototype.clear()
	      // 23.2.3.2 Set.prototype.clear()
	      clear: function clear(){
	        for(var that = this, data = that._i, entry = that._f; entry; entry = entry.n){
	          entry.r = true;
	          if(entry.p)entry.p = entry.p.n = undefined;
	          delete data[entry.i];
	        }
	        that._f = that._l = undefined;
	        that[SIZE] = 0;
	      },
	      // 23.1.3.3 Map.prototype.delete(key)
	      // 23.2.3.4 Set.prototype.delete(value)
	      'delete': function(key){
	        var that  = this
	          , entry = getEntry(that, key);
	        if(entry){
	          var next = entry.n
	            , prev = entry.p;
	          delete that._i[entry.i];
	          entry.r = true;
	          if(prev)prev.n = next;
	          if(next)next.p = prev;
	          if(that._f == entry)that._f = next;
	          if(that._l == entry)that._l = prev;
	          that[SIZE]--;
	        } return !!entry;
	      },
	      // 23.2.3.6 Set.prototype.forEach(callbackfn, thisArg = undefined)
	      // 23.1.3.5 Map.prototype.forEach(callbackfn, thisArg = undefined)
	      forEach: function forEach(callbackfn /*, that = undefined */){
	        anInstance(this, C, 'forEach');
	        var f = ctx(callbackfn, arguments.length > 1 ? arguments[1] : undefined, 3)
	          , entry;
	        while(entry = entry ? entry.n : this._f){
	          f(entry.v, entry.k, this);
	          // revert to the last existing entry
	          while(entry && entry.r)entry = entry.p;
	        }
	      },
	      // 23.1.3.7 Map.prototype.has(key)
	      // 23.2.3.7 Set.prototype.has(value)
	      has: function has(key){
	        return !!getEntry(this, key);
	      }
	    });
	    if(DESCRIPTORS)dP(C.prototype, 'size', {
	      get: function(){
	        return defined(this[SIZE]);
	      }
	    });
	    return C;
	  },
	  def: function(that, key, value){
	    var entry = getEntry(that, key)
	      , prev, index;
	    // change existing entry
	    if(entry){
	      entry.v = value;
	    // create new entry
	    } else {
	      that._l = entry = {
	        i: index = fastKey(key, true), // <- index
	        k: key,                        // <- key
	        v: value,                      // <- value
	        p: prev = that._l,             // <- previous entry
	        n: undefined,                  // <- next entry
	        r: false                       // <- removed
	      };
	      if(!that._f)that._f = entry;
	      if(prev)prev.n = entry;
	      that[SIZE]++;
	      // add to index
	      if(index !== 'F')that._i[index] = entry;
	    } return that;
	  },
	  getEntry: getEntry,
	  setStrong: function(C, NAME, IS_MAP){
	    // add .keys, .values, .entries, [@@iterator]
	    // 23.1.3.4, 23.1.3.8, 23.1.3.11, 23.1.3.12, 23.2.3.5, 23.2.3.8, 23.2.3.10, 23.2.3.11
	    $iterDefine(C, NAME, function(iterated, kind){
	      this._t = iterated;  // target
	      this._k = kind;      // kind
	      this._l = undefined; // previous
	    }, function(){
	      var that  = this
	        , kind  = that._k
	        , entry = that._l;
	      // revert to the last existing entry
	      while(entry && entry.r)entry = entry.p;
	      // get next entry
	      if(!that._t || !(that._l = entry = entry ? entry.n : that._t._f)){
	        // or finish the iteration
	        that._t = undefined;
	        return step(1);
	      }
	      // return step by kind
	      if(kind == 'keys'  )return step(0, entry.k);
	      if(kind == 'values')return step(0, entry.v);
	      return step(0, [entry.k, entry.v]);
	    }, IS_MAP ? 'entries' : 'values' , !IS_MAP, true);

	    // add [@@species], 23.1.2.2, 23.2.2.2
	    setSpecies(NAME);
	  }
	};
	});

	var es6_set = createCommonjsModule(function (module) {
	'use strict';
	var strong = _collectionStrong;

	// 23.2 Set Objects
	module.exports = _collection('Set', function(get){
	  return function Set(){ return get(this, arguments.length > 0 ? arguments[0] : undefined); };
	}, {
	  // 23.2.3.1 Set.prototype.add(value)
	  add: function add(value){
	    return strong.def(this, value = value === 0 ? 0 : value, value);
	  }
	}, strong);
	});

	var _arrayFromIterable = createCommonjsModule(function (module) {
	var forOf = _forOf;

	module.exports = function(iter, ITERATOR){
	  var result = [];
	  forOf(iter, false, result.push, result, ITERATOR);
	  return result;
	};
	});

	var _collectionToJson = createCommonjsModule(function (module) {
	// https://github.com/DavidBruant/Map-Set.prototype.toJSON
	var classof = _classof
	  , from    = _arrayFromIterable;
	module.exports = function(NAME){
	  return function toJSON(){
	    if(classof(this) != NAME)throw TypeError(NAME + "#toJSON isn't generic");
	    return from(this);
	  };
	};
	});

	var es7_set_toJson = createCommonjsModule(function (module) {
	// https://github.com/DavidBruant/Map-Set.prototype.toJSON
	var $export  = _export;

	$export($export.P + $export.R, 'Set', {toJSON: _collectionToJson('Set')});
	});

	var set$3 = createCommonjsModule(function (module) {
	module.exports = _core.Set;
	});

	var set$2 = createCommonjsModule(function (module) {
	module.exports = { "default": set$3, __esModule: true };
	});

	var _Set = unwrapExports(set$2);

	var es6_object_defineProperty = createCommonjsModule(function (module) {
	var $export = _export;
	// 19.1.2.4 / 15.2.3.6 Object.defineProperty(O, P, Attributes)
	$export($export.S + $export.F * !_descriptors, 'Object', {defineProperty: _objectDp.f});
	});

	var defineProperty$3 = createCommonjsModule(function (module) {
	var $Object = _core.Object;
	module.exports = function defineProperty$3(it, key, desc){
	  return $Object.defineProperty(it, key, desc);
	};
	});

	var defineProperty$2 = createCommonjsModule(function (module) {
	module.exports = { "default": defineProperty$3, __esModule: true };
	});

	var _Object$defineProperty = unwrapExports(defineProperty$2);

	var defineProperty$1 = createCommonjsModule(function (module, exports) {
	"use strict";

	exports.__esModule = true;

	var _defineProperty = defineProperty$2;

	var _defineProperty2 = _interopRequireDefault(_defineProperty);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = function (obj, key, value) {
	  if (key in obj) {
	    (0, _defineProperty2.default)(obj, key, {
	      value: value,
	      enumerable: true,
	      configurable: true,
	      writable: true
	    });
	  } else {
	    obj[key] = value;
	  }

	  return obj;
	};
	});

	var _defineProperty = unwrapExports(defineProperty$1);

	var es6_object_assign = createCommonjsModule(function (module) {
	// 19.1.3.1 Object.assign(target, source)
	var $export = _export;

	$export($export.S + $export.F, 'Object', {assign: _objectAssign});
	});

	var assign$2 = createCommonjsModule(function (module) {
	module.exports = _core.Object.assign;
	});

	var assign$1 = createCommonjsModule(function (module) {
	module.exports = { "default": assign$2, __esModule: true };
	});

	var _Object$assign = unwrapExports(assign$1);

	var _objectSap = createCommonjsModule(function (module) {
	// most Object methods by ES6 should accept primitives
	var $export = _export
	  , core    = _core
	  , fails   = _fails;
	module.exports = function(KEY, exec){
	  var fn  = (core.Object || {})[KEY] || Object[KEY]
	    , exp = {};
	  exp[KEY] = exec(fn);
	  $export($export.S + $export.F * fails(function(){ fn(1); }), 'Object', exp);
	};
	});

	var es6_object_keys = createCommonjsModule(function (module) {
	// 19.1.2.14 Object.keys(O)
	var toObject = _toObject
	  , $keys    = _objectKeys;

	_objectSap('keys', function(){
	  return function keys(it){
	    return $keys(toObject(it));
	  };
	});
	});

	var keys$2 = createCommonjsModule(function (module) {
	module.exports = _core.Object.keys;
	});

	var keys$1 = createCommonjsModule(function (module) {
	module.exports = { "default": keys$2, __esModule: true };
	});

	var _Object$keys = unwrapExports(keys$1);

	var _overArg = createCommonjsModule(function (module) {
	/**
	 * Creates a unary function that invokes `func` with its argument transformed.
	 *
	 * @private
	 * @param {Function} func The function to wrap.
	 * @param {Function} transform The argument transform.
	 * @returns {Function} Returns the new function.
	 */
	function overArg(func, transform) {
	  return function(arg) {
	    return func(transform(arg));
	  };
	}

	module.exports = overArg;
	});

	var _getPrototype = createCommonjsModule(function (module) {
	var overArg = _overArg;

	/** Built-in value references. */
	var getPrototype = overArg(Object.getPrototypeOf, Object);

	module.exports = getPrototype;
	});

	var isObjectLike = createCommonjsModule(function (module) {
	/**
	 * Checks if `value` is object-like. A value is object-like if it's not `null`
	 * and has a `typeof` result of "object".
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
	 * @example
	 *
	 * _.isObjectLike({});
	 * // => true
	 *
	 * _.isObjectLike([1, 2, 3]);
	 * // => true
	 *
	 * _.isObjectLike(_.noop);
	 * // => false
	 *
	 * _.isObjectLike(null);
	 * // => false
	 */
	function isObjectLike(value) {
	  return value != null && typeof value == 'object';
	}

	module.exports = isObjectLike;
	});

	var isPlainObject = createCommonjsModule(function (module) {
	var getPrototype = _getPrototype,
	    isObjectLike$$1 = isObjectLike;

	/** `Object#toString` result references. */
	var objectTag = '[object Object]';

	/** Used for built-in method references. */
	var funcProto = Function.prototype,
	    objectProto = Object.prototype;

	/** Used to resolve the decompiled source of functions. */
	var funcToString = funcProto.toString;

	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;

	/** Used to infer the `Object` constructor. */
	var objectCtorString = funcToString.call(Object);

	/**
	 * Used to resolve the
	 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
	 * of values.
	 */
	var objectToString = objectProto.toString;

	/**
	 * Checks if `value` is a plain object, that is, an object created by the
	 * `Object` constructor or one with a `[[Prototype]]` of `null`.
	 *
	 * @static
	 * @memberOf _
	 * @since 0.8.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a plain object, else `false`.
	 * @example
	 *
	 * function Foo() {
	 *   this.a = 1;
	 * }
	 *
	 * _.isPlainObject(new Foo);
	 * // => false
	 *
	 * _.isPlainObject([1, 2, 3]);
	 * // => false
	 *
	 * _.isPlainObject({ 'x': 0, 'y': 0 });
	 * // => true
	 *
	 * _.isPlainObject(Object.create(null));
	 * // => true
	 */
	function isPlainObject(value) {
	  if (!isObjectLike$$1(value) || objectToString.call(value) != objectTag) {
	    return false;
	  }
	  var proto = getPrototype(value);
	  if (proto === null) {
	    return true;
	  }
	  var Ctor = hasOwnProperty.call(proto, 'constructor') && proto.constructor;
	  return (typeof Ctor == 'function' &&
	    Ctor instanceof Ctor && funcToString.call(Ctor) == objectCtorString);
	}

	module.exports = isPlainObject;
	});

	var classCallCheck = createCommonjsModule(function (module, exports) {
	"use strict";

	exports.__esModule = true;

	exports.default = function (instance, Constructor) {
	  if (!(instance instanceof Constructor)) {
	    throw new TypeError("Cannot call a class as a function");
	  }
	};
	});

	var _classCallCheck = unwrapExports(classCallCheck);

	var createClass = createCommonjsModule(function (module, exports) {
	"use strict";

	exports.__esModule = true;

	var _defineProperty = defineProperty$2;

	var _defineProperty2 = _interopRequireDefault(_defineProperty);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = function () {
	  function defineProperties(target, props) {
	    for (var i = 0; i < props.length; i++) {
	      var descriptor = props[i];
	      descriptor.enumerable = descriptor.enumerable || false;
	      descriptor.configurable = true;
	      if ("value" in descriptor) descriptor.writable = true;
	      (0, _defineProperty2.default)(target, descriptor.key, descriptor);
	    }
	  }

	  return function (Constructor, protoProps, staticProps) {
	    if (protoProps) defineProperties(Constructor.prototype, protoProps);
	    if (staticProps) defineProperties(Constructor, staticProps);
	    return Constructor;
	  };
	}();
	});

	var _createClass = unwrapExports(createClass);

	var _wksExt = createCommonjsModule(function (module, exports) {
	exports.f = _wks;
	});

	var _wksDefine = createCommonjsModule(function (module) {
	var global         = _global
	  , core           = _core
	  , LIBRARY        = _library
	  , wksExt         = _wksExt
	  , defineProperty = _objectDp.f;
	module.exports = function(name){
	  var $Symbol = core.Symbol || (core.Symbol = LIBRARY ? {} : global.Symbol || {});
	  if(name.charAt(0) != '_' && !(name in $Symbol))defineProperty($Symbol, name, {value: wksExt.f(name)});
	};
	});

	var _keyof = createCommonjsModule(function (module) {
	var getKeys   = _objectKeys
	  , toIObject = _toIobject;
	module.exports = function(object, el){
	  var O      = toIObject(object)
	    , keys   = getKeys(O)
	    , length = keys.length
	    , index  = 0
	    , key;
	  while(length > index)if(O[key = keys[index++]] === el)return key;
	};
	});

	var _enumKeys = createCommonjsModule(function (module) {
	// all enumerable object keys, includes symbols
	var getKeys = _objectKeys
	  , gOPS    = _objectGops
	  , pIE     = _objectPie;
	module.exports = function(it){
	  var result     = getKeys(it)
	    , getSymbols = gOPS.f;
	  if(getSymbols){
	    var symbols = getSymbols(it)
	      , isEnum  = pIE.f
	      , i       = 0
	      , key;
	    while(symbols.length > i)if(isEnum.call(it, key = symbols[i++]))result.push(key);
	  } return result;
	};
	});

	var _objectGopn = createCommonjsModule(function (module, exports) {
	// 19.1.2.7 / 15.2.3.4 Object.getOwnPropertyNames(O)
	var $keys      = _objectKeysInternal
	  , hiddenKeys = _enumBugKeys.concat('length', 'prototype');

	exports.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O){
	  return $keys(O, hiddenKeys);
	};
	});

	var _objectGopnExt = createCommonjsModule(function (module) {
	// fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window
	var toIObject = _toIobject
	  , gOPN      = _objectGopn.f
	  , toString  = {}.toString;

	var windowNames = typeof window == 'object' && window && Object.getOwnPropertyNames
	  ? Object.getOwnPropertyNames(window) : [];

	var getWindowNames = function(it){
	  try {
	    return gOPN(it);
	  } catch(e){
	    return windowNames.slice();
	  }
	};

	module.exports.f = function getOwnPropertyNames(it){
	  return windowNames && toString.call(it) == '[object Window]' ? getWindowNames(it) : gOPN(toIObject(it));
	};
	});

	var _objectGopd = createCommonjsModule(function (module, exports) {
	var pIE            = _objectPie
	  , createDesc     = _propertyDesc
	  , toIObject      = _toIobject
	  , toPrimitive    = _toPrimitive
	  , has            = _has
	  , IE8_DOM_DEFINE = _ie8DomDefine
	  , gOPD           = Object.getOwnPropertyDescriptor;

	exports.f = _descriptors ? gOPD : function getOwnPropertyDescriptor(O, P){
	  O = toIObject(O);
	  P = toPrimitive(P, true);
	  if(IE8_DOM_DEFINE)try {
	    return gOPD(O, P);
	  } catch(e){ /* empty */ }
	  if(has(O, P))return createDesc(!pIE.f.call(O, P), O[P]);
	};
	});

	var es6_symbol = createCommonjsModule(function (module) {
	'use strict';
	// ECMAScript 6 symbols shim
	var global         = _global
	  , has            = _has
	  , DESCRIPTORS    = _descriptors
	  , $export        = _export
	  , redefine       = _redefine
	  , META           = _meta.KEY
	  , $fails         = _fails
	  , shared         = _shared
	  , setToStringTag = _setToStringTag
	  , uid            = _uid
	  , wks            = _wks
	  , wksExt         = _wksExt
	  , wksDefine      = _wksDefine
	  , keyOf          = _keyof
	  , enumKeys       = _enumKeys
	  , isArray        = _isArray
	  , anObject       = _anObject
	  , toIObject      = _toIobject
	  , toPrimitive    = _toPrimitive
	  , createDesc     = _propertyDesc
	  , _create        = _objectCreate
	  , gOPNExt        = _objectGopnExt
	  , $GOPD          = _objectGopd
	  , $DP            = _objectDp
	  , $keys          = _objectKeys
	  , gOPD           = $GOPD.f
	  , dP             = $DP.f
	  , gOPN           = gOPNExt.f
	  , $Symbol        = global.Symbol
	  , $JSON          = global.JSON
	  , _stringify     = $JSON && $JSON.stringify
	  , PROTOTYPE      = 'prototype'
	  , HIDDEN         = wks('_hidden')
	  , TO_PRIMITIVE   = wks('toPrimitive')
	  , isEnum         = {}.propertyIsEnumerable
	  , SymbolRegistry = shared('symbol-registry')
	  , AllSymbols     = shared('symbols')
	  , OPSymbols      = shared('op-symbols')
	  , ObjectProto    = Object[PROTOTYPE]
	  , USE_NATIVE     = typeof $Symbol == 'function'
	  , QObject        = global.QObject;
	// Don't use setters in Qt Script, https://github.com/zloirock/core-js/issues/173
	var setter = !QObject || !QObject[PROTOTYPE] || !QObject[PROTOTYPE].findChild;

	// fallback for old Android, https://code.google.com/p/v8/issues/detail?id=687
	var setSymbolDesc = DESCRIPTORS && $fails(function(){
	  return _create(dP({}, 'a', {
	    get: function(){ return dP(this, 'a', {value: 7}).a; }
	  })).a != 7;
	}) ? function(it, key, D){
	  var protoDesc = gOPD(ObjectProto, key);
	  if(protoDesc)delete ObjectProto[key];
	  dP(it, key, D);
	  if(protoDesc && it !== ObjectProto)dP(ObjectProto, key, protoDesc);
	} : dP;

	var wrap = function(tag){
	  var sym = AllSymbols[tag] = _create($Symbol[PROTOTYPE]);
	  sym._k = tag;
	  return sym;
	};

	var isSymbol = USE_NATIVE && typeof $Symbol.iterator == 'symbol' ? function(it){
	  return typeof it == 'symbol';
	} : function(it){
	  return it instanceof $Symbol;
	};

	var $defineProperty = function defineProperty(it, key, D){
	  if(it === ObjectProto)$defineProperty(OPSymbols, key, D);
	  anObject(it);
	  key = toPrimitive(key, true);
	  anObject(D);
	  if(has(AllSymbols, key)){
	    if(!D.enumerable){
	      if(!has(it, HIDDEN))dP(it, HIDDEN, createDesc(1, {}));
	      it[HIDDEN][key] = true;
	    } else {
	      if(has(it, HIDDEN) && it[HIDDEN][key])it[HIDDEN][key] = false;
	      D = _create(D, {enumerable: createDesc(0, false)});
	    } return setSymbolDesc(it, key, D);
	  } return dP(it, key, D);
	};
	var $defineProperties = function defineProperties(it, P){
	  anObject(it);
	  var keys = enumKeys(P = toIObject(P))
	    , i    = 0
	    , l = keys.length
	    , key;
	  while(l > i)$defineProperty(it, key = keys[i++], P[key]);
	  return it;
	};
	var $create = function create(it, P){
	  return P === undefined ? _create(it) : $defineProperties(_create(it), P);
	};
	var $propertyIsEnumerable = function propertyIsEnumerable(key){
	  var E = isEnum.call(this, key = toPrimitive(key, true));
	  if(this === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key))return false;
	  return E || !has(this, key) || !has(AllSymbols, key) || has(this, HIDDEN) && this[HIDDEN][key] ? E : true;
	};
	var $getOwnPropertyDescriptor = function getOwnPropertyDescriptor(it, key){
	  it  = toIObject(it);
	  key = toPrimitive(key, true);
	  if(it === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key))return;
	  var D = gOPD(it, key);
	  if(D && has(AllSymbols, key) && !(has(it, HIDDEN) && it[HIDDEN][key]))D.enumerable = true;
	  return D;
	};
	var $getOwnPropertyNames = function getOwnPropertyNames(it){
	  var names  = gOPN(toIObject(it))
	    , result = []
	    , i      = 0
	    , key;
	  while(names.length > i){
	    if(!has(AllSymbols, key = names[i++]) && key != HIDDEN && key != META)result.push(key);
	  } return result;
	};
	var $getOwnPropertySymbols = function getOwnPropertySymbols(it){
	  var IS_OP  = it === ObjectProto
	    , names  = gOPN(IS_OP ? OPSymbols : toIObject(it))
	    , result = []
	    , i      = 0
	    , key;
	  while(names.length > i){
	    if(has(AllSymbols, key = names[i++]) && (IS_OP ? has(ObjectProto, key) : true))result.push(AllSymbols[key]);
	  } return result;
	};

	// 19.4.1.1 Symbol([description])
	if(!USE_NATIVE){
	  $Symbol = function Symbol(){
	    if(this instanceof $Symbol)throw TypeError('Symbol is not a constructor!');
	    var tag = uid(arguments.length > 0 ? arguments[0] : undefined);
	    var $set = function(value){
	      if(this === ObjectProto)$set.call(OPSymbols, value);
	      if(has(this, HIDDEN) && has(this[HIDDEN], tag))this[HIDDEN][tag] = false;
	      setSymbolDesc(this, tag, createDesc(1, value));
	    };
	    if(DESCRIPTORS && setter)setSymbolDesc(ObjectProto, tag, {configurable: true, set: $set});
	    return wrap(tag);
	  };
	  redefine($Symbol[PROTOTYPE], 'toString', function toString(){
	    return this._k;
	  });

	  $GOPD.f = $getOwnPropertyDescriptor;
	  $DP.f   = $defineProperty;
	  _objectGopn.f = gOPNExt.f = $getOwnPropertyNames;
	  _objectPie.f  = $propertyIsEnumerable;
	  _objectGops.f = $getOwnPropertySymbols;

	  if(DESCRIPTORS && !_library){
	    redefine(ObjectProto, 'propertyIsEnumerable', $propertyIsEnumerable, true);
	  }

	  wksExt.f = function(name){
	    return wrap(wks(name));
	  }
	}

	$export($export.G + $export.W + $export.F * !USE_NATIVE, {Symbol: $Symbol});

	for(var symbols = (
	  // 19.4.2.2, 19.4.2.3, 19.4.2.4, 19.4.2.6, 19.4.2.8, 19.4.2.9, 19.4.2.10, 19.4.2.11, 19.4.2.12, 19.4.2.13, 19.4.2.14
	  'hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables'
	).split(','), i = 0; symbols.length > i; )wks(symbols[i++]);

	for(var symbols = $keys(wks.store), i = 0; symbols.length > i; )wksDefine(symbols[i++]);

	$export($export.S + $export.F * !USE_NATIVE, 'Symbol', {
	  // 19.4.2.1 Symbol.for(key)
	  'for': function(key){
	    return has(SymbolRegistry, key += '')
	      ? SymbolRegistry[key]
	      : SymbolRegistry[key] = $Symbol(key);
	  },
	  // 19.4.2.5 Symbol.keyFor(sym)
	  keyFor: function keyFor(key){
	    if(isSymbol(key))return keyOf(SymbolRegistry, key);
	    throw TypeError(key + ' is not a symbol!');
	  },
	  useSetter: function(){ setter = true; },
	  useSimple: function(){ setter = false; }
	});

	$export($export.S + $export.F * !USE_NATIVE, 'Object', {
	  // 19.1.2.2 Object.create(O [, Properties])
	  create: $create,
	  // 19.1.2.4 Object.defineProperty(O, P, Attributes)
	  defineProperty: $defineProperty,
	  // 19.1.2.3 Object.defineProperties(O, Properties)
	  defineProperties: $defineProperties,
	  // 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
	  getOwnPropertyDescriptor: $getOwnPropertyDescriptor,
	  // 19.1.2.7 Object.getOwnPropertyNames(O)
	  getOwnPropertyNames: $getOwnPropertyNames,
	  // 19.1.2.8 Object.getOwnPropertySymbols(O)
	  getOwnPropertySymbols: $getOwnPropertySymbols
	});

	// 24.3.2 JSON.stringify(value [, replacer [, space]])
	$JSON && $export($export.S + $export.F * (!USE_NATIVE || $fails(function(){
	  var S = $Symbol();
	  // MS Edge converts symbol values to JSON as {}
	  // WebKit converts symbol values to JSON as null
	  // V8 throws on boxed symbols
	  return _stringify([S]) != '[null]' || _stringify({a: S}) != '{}' || _stringify(Object(S)) != '{}';
	})), 'JSON', {
	  stringify: function stringify(it){
	    if(it === undefined || isSymbol(it))return; // IE8 returns string on undefined
	    var args = [it]
	      , i    = 1
	      , replacer, $replacer;
	    while(arguments.length > i)args.push(arguments[i++]);
	    replacer = args[1];
	    if(typeof replacer == 'function')$replacer = replacer;
	    if($replacer || !isArray(replacer))replacer = function(key, value){
	      if($replacer)value = $replacer.call(this, key, value);
	      if(!isSymbol(value))return value;
	    };
	    args[1] = replacer;
	    return _stringify.apply($JSON, args);
	  }
	});

	// 19.4.3.4 Symbol.prototype[@@toPrimitive](hint)
	$Symbol[PROTOTYPE][TO_PRIMITIVE] || _hide($Symbol[PROTOTYPE], TO_PRIMITIVE, $Symbol[PROTOTYPE].valueOf);
	// 19.4.3.5 Symbol.prototype[@@toStringTag]
	setToStringTag($Symbol, 'Symbol');
	// 20.2.1.9 Math[@@toStringTag]
	setToStringTag(Math, 'Math', true);
	// 24.3.3 JSON[@@toStringTag]
	setToStringTag(global.JSON, 'JSON', true);
	});

	var es7_symbol_asyncIterator = createCommonjsModule(function (module) {
	_wksDefine('asyncIterator');
	});

	var es7_symbol_observable = createCommonjsModule(function (module) {
	_wksDefine('observable');
	});

	var index$2 = createCommonjsModule(function (module) {
	module.exports = _core.Symbol;
	});

	var symbol = createCommonjsModule(function (module) {
	module.exports = { "default": index$2, __esModule: true };
	});

	var _Symbol = unwrapExports(symbol);

	var index$4 = createCommonjsModule(function (module) {
	/**
	 * Helpers.
	 */

	var s = 1000;
	var m = s * 60;
	var h = m * 60;
	var d = h * 24;
	var y = d * 365.25;

	/**
	 * Parse or format the given `val`.
	 *
	 * Options:
	 *
	 *  - `long` verbose formatting [false]
	 *
	 * @param {String|Number} val
	 * @param {Object} options
	 * @return {String|Number}
	 * @api public
	 */

	module.exports = function(val, options){
	  options = options || {};
	  if ('string' == typeof val) return parse(val);
	  return options.long
	    ? long(val)
	    : short(val);
	};

	/**
	 * Parse the given `str` and return milliseconds.
	 *
	 * @param {String} str
	 * @return {Number}
	 * @api private
	 */

	function parse(str) {
	  str = '' + str;
	  if (str.length > 10000) return;
	  var match = /^((?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|years?|yrs?|y)?$/i.exec(str);
	  if (!match) return;
	  var n = parseFloat(match[1]);
	  var type = (match[2] || 'ms').toLowerCase();
	  switch (type) {
	    case 'years':
	    case 'year':
	    case 'yrs':
	    case 'yr':
	    case 'y':
	      return n * y;
	    case 'days':
	    case 'day':
	    case 'd':
	      return n * d;
	    case 'hours':
	    case 'hour':
	    case 'hrs':
	    case 'hr':
	    case 'h':
	      return n * h;
	    case 'minutes':
	    case 'minute':
	    case 'mins':
	    case 'min':
	    case 'm':
	      return n * m;
	    case 'seconds':
	    case 'second':
	    case 'secs':
	    case 'sec':
	    case 's':
	      return n * s;
	    case 'milliseconds':
	    case 'millisecond':
	    case 'msecs':
	    case 'msec':
	    case 'ms':
	      return n;
	  }
	}

	/**
	 * Short format for `ms`.
	 *
	 * @param {Number} ms
	 * @return {String}
	 * @api private
	 */

	function short(ms) {
	  if (ms >= d) return Math.round(ms / d) + 'd';
	  if (ms >= h) return Math.round(ms / h) + 'h';
	  if (ms >= m) return Math.round(ms / m) + 'm';
	  if (ms >= s) return Math.round(ms / s) + 's';
	  return ms + 'ms';
	}

	/**
	 * Long format for `ms`.
	 *
	 * @param {Number} ms
	 * @return {String}
	 * @api private
	 */

	function long(ms) {
	  return plural(ms, d, 'day')
	    || plural(ms, h, 'hour')
	    || plural(ms, m, 'minute')
	    || plural(ms, s, 'second')
	    || ms + ' ms';
	}

	/**
	 * Pluralization helper.
	 */

	function plural(ms, n, name) {
	  if (ms < n) return;
	  if (ms < n * 1.5) return Math.floor(ms / n) + ' ' + name;
	  return Math.ceil(ms / n) + ' ' + name + 's';
	}
	});

	var debug$1 = createCommonjsModule(function (module, exports) {
	/**
	 * This is the common logic for both the Node.js and web browser
	 * implementations of `debug()`.
	 *
	 * Expose `debug()` as the module.
	 */

	exports = module.exports = debug;
	exports.coerce = coerce;
	exports.disable = disable;
	exports.enable = enable;
	exports.enabled = enabled;
	exports.humanize = index$4;

	/**
	 * The currently active debug mode names, and names to skip.
	 */

	exports.names = [];
	exports.skips = [];

	/**
	 * Map of special "%n" handling functions, for the debug "format" argument.
	 *
	 * Valid key names are a single, lowercased letter, i.e. "n".
	 */

	exports.formatters = {};

	/**
	 * Previously assigned color.
	 */

	var prevColor = 0;

	/**
	 * Previous log timestamp.
	 */

	var prevTime;

	/**
	 * Select a color.
	 *
	 * @return {Number}
	 * @api private
	 */

	function selectColor() {
	  return exports.colors[prevColor++ % exports.colors.length];
	}

	/**
	 * Create a debugger with the given `namespace`.
	 *
	 * @param {String} namespace
	 * @return {Function}
	 * @api public
	 */

	function debug(namespace) {

	  // define the `disabled` version
	  function disabled() {
	  }
	  disabled.enabled = false;

	  // define the `enabled` version
	  function enabled() {

	    var self = enabled;

	    // set `diff` timestamp
	    var curr = +new Date();
	    var ms = curr - (prevTime || curr);
	    self.diff = ms;
	    self.prev = prevTime;
	    self.curr = curr;
	    prevTime = curr;

	    // add the `color` if not set
	    if (null == self.useColors) self.useColors = exports.useColors();
	    if (null == self.color && self.useColors) self.color = selectColor();

	    var args = Array.prototype.slice.call(arguments);

	    args[0] = exports.coerce(args[0]);

	    if ('string' !== typeof args[0]) {
	      // anything else let's inspect with %o
	      args = ['%o'].concat(args);
	    }

	    // apply any `formatters` transformations
	    var index = 0;
	    args[0] = args[0].replace(/%([a-z%])/g, function(match, format) {
	      // if we encounter an escaped % then don't increase the array index
	      if (match === '%%') return match;
	      index++;
	      var formatter = exports.formatters[format];
	      if ('function' === typeof formatter) {
	        var val = args[index];
	        match = formatter.call(self, val);

	        // now we need to remove `args[index]` since it's inlined in the `format`
	        args.splice(index, 1);
	        index--;
	      }
	      return match;
	    });

	    if ('function' === typeof exports.formatArgs) {
	      args = exports.formatArgs.apply(self, args);
	    }
	    var logFn = enabled.log || exports.log || console.log.bind(console);
	    logFn.apply(self, args);
	  }
	  enabled.enabled = true;

	  var fn = exports.enabled(namespace) ? enabled : disabled;

	  fn.namespace = namespace;

	  return fn;
	}

	/**
	 * Enables a debug mode by namespaces. This can include modes
	 * separated by a colon and wildcards.
	 *
	 * @param {String} namespaces
	 * @api public
	 */

	function enable(namespaces) {
	  exports.save(namespaces);

	  var split = (namespaces || '').split(/[\s,]+/);
	  var len = split.length;

	  for (var i = 0; i < len; i++) {
	    if (!split[i]) continue; // ignore empty strings
	    namespaces = split[i].replace(/\*/g, '.*?');
	    if (namespaces[0] === '-') {
	      exports.skips.push(new RegExp('^' + namespaces.substr(1) + '$'));
	    } else {
	      exports.names.push(new RegExp('^' + namespaces + '$'));
	    }
	  }
	}

	/**
	 * Disable debug output.
	 *
	 * @api public
	 */

	function disable() {
	  exports.enable('');
	}

	/**
	 * Returns true if the given mode name is enabled, false otherwise.
	 *
	 * @param {String} name
	 * @return {Boolean}
	 * @api public
	 */

	function enabled(name) {
	  var i, len;
	  for (i = 0, len = exports.skips.length; i < len; i++) {
	    if (exports.skips[i].test(name)) {
	      return false;
	    }
	  }
	  for (i = 0, len = exports.names.length; i < len; i++) {
	    if (exports.names[i].test(name)) {
	      return true;
	    }
	  }
	  return false;
	}

	/**
	 * Coerce `val`.
	 *
	 * @param {Mixed} val
	 * @return {Mixed}
	 * @api private
	 */

	function coerce(val) {
	  if (val instanceof Error) return val.stack || val.message;
	  return val;
	}
	});

	var browser$1 = createCommonjsModule(function (module, exports) {
	/**
	 * This is the web browser implementation of `debug()`.
	 *
	 * Expose `debug()` as the module.
	 */

	exports = module.exports = debug$1;
	exports.log = log;
	exports.formatArgs = formatArgs;
	exports.save = save;
	exports.load = load;
	exports.useColors = useColors;
	exports.storage = 'undefined' != typeof chrome
	               && 'undefined' != typeof chrome.storage
	                  ? chrome.storage.local
	                  : localstorage();

	/**
	 * Colors.
	 */

	exports.colors = [
	  'lightseagreen',
	  'forestgreen',
	  'goldenrod',
	  'dodgerblue',
	  'darkorchid',
	  'crimson'
	];

	/**
	 * Currently only WebKit-based Web Inspectors, Firefox >= v31,
	 * and the Firebug extension (any Firefox version) are known
	 * to support "%c" CSS customizations.
	 *
	 * TODO: add a `localStorage` variable to explicitly enable/disable colors
	 */

	function useColors() {
	  // is webkit? http://stackoverflow.com/a/16459606/376773
	  return ('WebkitAppearance' in document.documentElement.style) ||
	    // is firebug? http://stackoverflow.com/a/398120/376773
	    (window.console && (console.firebug || (console.exception && console.table))) ||
	    // is firefox >= v31?
	    // https://developer.mozilla.org/en-US/docs/Tools/Web_Console#Styling_messages
	    (navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/) && parseInt(RegExp.$1, 10) >= 31);
	}

	/**
	 * Map %j to `JSON.stringify()`, since no Web Inspectors do that by default.
	 */

	exports.formatters.j = function(v) {
	  return JSON.stringify(v);
	};


	/**
	 * Colorize log arguments if enabled.
	 *
	 * @api public
	 */

	function formatArgs() {
	  var args = arguments;
	  var useColors = this.useColors;

	  args[0] = (useColors ? '%c' : '')
	    + this.namespace
	    + (useColors ? ' %c' : ' ')
	    + args[0]
	    + (useColors ? '%c ' : ' ')
	    + '+' + exports.humanize(this.diff);

	  if (!useColors) return args;

	  var c = 'color: ' + this.color;
	  args = [args[0], c, 'color: inherit'].concat(Array.prototype.slice.call(args, 1));

	  // the final "%c" is somewhat tricky, because there could be other
	  // arguments passed either before or after the %c, so we need to
	  // figure out the correct index to insert the CSS into
	  var index = 0;
	  var lastC = 0;
	  args[0].replace(/%[a-z%]/g, function(match) {
	    if ('%%' === match) return;
	    index++;
	    if ('%c' === match) {
	      // we only are interested in the *last* %c
	      // (the user may have provided their own)
	      lastC = index;
	    }
	  });

	  args.splice(lastC, 0, c);
	  return args;
	}

	/**
	 * Invokes `console.log()` when available.
	 * No-op when `console.log` is not a "function".
	 *
	 * @api public
	 */

	function log() {
	  // this hackery is required for IE8/9, where
	  // the `console.log` function doesn't have 'apply'
	  return 'object' === typeof console
	    && console.log
	    && Function.prototype.apply.call(console.log, console, arguments);
	}

	/**
	 * Save `namespaces`.
	 *
	 * @param {String} namespaces
	 * @api private
	 */

	function save(namespaces) {
	  try {
	    if (null == namespaces) {
	      exports.storage.removeItem('debug');
	    } else {
	      exports.storage.debug = namespaces;
	    }
	  } catch(e) {}
	}

	/**
	 * Load `namespaces`.
	 *
	 * @return {String} returns the previously persisted debug modes
	 * @api private
	 */

	function load() {
	  var r;
	  try {
	    r = exports.storage.debug;
	  } catch(e) {}
	  return r;
	}

	/**
	 * Enable namespaces listed in `localStorage.debug` initially.
	 */

	exports.enable(load());

	/**
	 * Localstorage attempts to return the localstorage.
	 *
	 * This is necessary because safari throws
	 * when a user disables cookies/localstorage
	 * and you attempt to access it.
	 *
	 * @return {LocalStorage}
	 * @api private
	 */

	function localstorage(){
	  try {
	    return window.localStorage;
	  } catch (e) {}
	}
	});

	var EXPIRED = _Symbol('expired');
	var debug = browser$1('LC:Expirable');

	var Expirable = function () {
	  function Expirable(value, ttl) {
	    _classCallCheck(this, Expirable);

	    this._value = value;
	    if (typeof ttl === 'number') {
	      this.expiredAt = Date.now() + ttl;
	    }
	  }

	  _createClass(Expirable, [{
	    key: 'value',
	    get: function get() {
	      var expired = this.expiredAt && this.expiredAt < Date.now();
	      if (expired) debug('expired: ' + this._value);
	      return expired ? EXPIRED : this._value;
	    }
	  }]);

	  return Expirable;
	}();

	Expirable.EXPIRED = EXPIRED;

	var debug$3 = browser$1('LC:Cache');

	var Cache = function () {
	  function Cache() {
	    var name = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'anonymous';

	    _classCallCheck(this, Cache);

	    this.name = name;
	    this._map = {};
	  }

	  Cache.prototype.get = function get(key) {
	    var cache = this._map[key];
	    if (cache) {
	      var value = cache.value;
	      if (value !== Expirable.EXPIRED) {
	        debug$3('[' + this.name + '] hit: ' + key + ' ' + cache.value);
	        return cache.value;
	      }
	      delete this._map[key];
	    }
	    debug$3('[' + this.name + '] missed: ' + key);
	    return null;
	  };

	  Cache.prototype.set = function set(key, value, ttl) {
	    debug$3('[' + this.name + '] set: ' + key + ' ' + value + ' ' + ttl);
	    this._map[key] = new Expirable(value, ttl);
	  };

	  return Cache;
	}();

	var tryAll = function tryAll(promiseConstructors) {
	  var promise = new _Promise(promiseConstructors[0]);
	  if (promiseConstructors.length === 1) {
	    return promise;
	  }
	  return promise.catch(function () {
	    return tryAll(promiseConstructors.slice(1));
	  });
	};

	var tap = function tap(interceptor) {
	  return function (value) {
	    return interceptor(value), value;
	  };
	};

	var decodeDate = function decodeDate(date) {
	  if (!date) return date;
	  if (typeof date === 'string') {
	    return new Date(date);
	  }
	  if (date.__type === 'Date' && date.iso) {
	    return new Date(date.iso);
	  }
	  return date;
	};

	var keyRemap = function keyRemap(keymap, obj) {
	  return _Object$keys(obj).reduce(function (newObj, key) {
	    var newKey = keymap[key] || key;
	    return _Object$assign(newObj, _defineProperty({}, newKey, obj[key]));
	  }, {});
	};

	var isIE10 = global.navigator && global.navigator.userAgent && global.navigator.userAgent.indexOf('MSIE 10.') !== -1;

	/* eslint-disable no-proto */
	var getStaticProperty = function getStaticProperty(klass, property) {
	  return klass[property] || (klass.__proto__ ? getStaticProperty(klass.__proto__, property) : undefined);
	};
	/* eslint-enable no-proto */

	var union = function union(a, b) {
	  return _Array$from(new _Set([].concat(_toConsumableArray(a), _toConsumableArray(b))));
	};
	var difference = function difference(a, b) {
	  return _Array$from(function (bSet) {
	    return new _Set(a.filter(function (x) {
	      return !bSet.has(x);
	    }));
	  }(new _Set(b)));
	};

	var map = new _WeakMap();

	// protected property helper
	var internal = function internal(object) {
	  if (!map.has(object)) {
	    map.set(object, {});
	  }
	  return map.get(object);
	};

	// debug utility
	var removeNull = function removeNull(obj) {
	  if (!isPlainObject(obj)) return obj;
	  var object = _Object$assign({}, obj);
	  // eslint-disable-next-line no-restricted-syntax
	  for (var prop in object) {
	    if ({}.hasOwnProperty.call(object, prop)) {
	      var value = object[prop];
	      if (value === null) {
	        delete object[prop];
	      } else {
	        object[prop] = removeNull(value);
	      }
	    }
	  }
	  return object;
	};
	var trim = function trim(message) {
	  return removeNull(JSON.parse(_JSON$stringify(message)));
	};

	var ensureArray = function ensureArray(target) {
	  if (Array.isArray(target)) {
	    return target;
	  }
	  if (target === undefined || target === null) {
	    return [];
	  }
	  return [target];
	};

	var setValue = function setValue(target, key, value) {
	  // '.' is not allowed in Class keys, escaping is not in concern now.
	  var segs = key.split('.');
	  var lastSeg = segs.pop();
	  var currentTarget = target;
	  segs.forEach(function (seg) {
	    if (currentTarget[seg] === undefined) currentTarget[seg] = {};
	    currentTarget = currentTarget[seg];
	  });
	  currentTarget[lastSeg] = value;
	  return target;
	};

	var listen = function listen(target, resolveEvent, rejectEvent) {
	  return new _Promise(function (resolve, reject) {
	    if (resolveEvent) target.once(resolveEvent, function () {
	      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	        args[_key] = arguments[_key];
	      }

	      return resolve(args);
	    });
	    if (rejectEvent) target.once(rejectEvent, function (error) {
	      return reject(error);
	    });
	  });
	};

	var wait = function wait(time) {
	  return new _Promise(function (resolve) {
	    return setTimeout(resolve, time);
	  });
	};

	var hold = function hold(time) {
	  return function (result) {
	    return wait(time).then(function () {
	      return result;
	    });
	  };
	};

	/* global window */
	var sinon = typeof window !== 'undefined' && window.sinon || require('sinon');

	describe('Utils', function () {
	  describe('tap', function () {
	    it('should return previous promise', function () {
	      var interceptor = sinon.stub().returns(2);
	      return _Promise.resolve(1).then(tap(interceptor)).then(function (result) {
	        result.should.be.equal(1);
	        interceptor.should.be.calledOnce();
	      });
	    });
	  });

	  describe('tryAll', function () {
	    var resolve = function resolve(value) {
	      return function (res) {
	        return res(value);
	      };
	    };
	    var reject = function reject(value) {
	      return function (res, rej) {
	        return rej(value);
	      };
	    };
	    it('should return the first resolved promise', function () {
	      return tryAll([reject(0), resolve(1), reject(2), resolve(3)]).then(function (result) {
	        result.should.be.equal(1);
	      });
	    });
	    it('should be rejected if non resolved', function (done) {
	      tryAll([reject(0), reject(1)]).catch(function () {
	        return done();
	      }).catch(done);
	    });
	    it('should be synchronized', function () {
	      var successCallback = sinon.spy();
	      var failCallback = sinon.spy();
	      return tryAll([function (res) {
	        return res(successCallback());
	      }, function (res, rej) {
	        return rej(failCallback());
	      }]).then(function () {
	        successCallback.should.be.calledOnce();
	        failCallback.should.have.callCount(0);
	      });
	    });
	  });

	  describe('Cache', function () {
	    it('get/set', function () {
	      var cache = new Cache();
	      asFunction(cache.get('__test')).be.null();
	      cache.set('__test', 1);
	      cache.get('__test').should.equal(1);
	      cache.set('__test', '1', 100);
	      cache.get('__test').should.equal('1');
	      return wait(110).then(function () {
	        return asFunction(cache.get('__test')).be.null();
	      });
	    });
	  });

	  describe('keyRemap', function () {
	    it('remap', function () {
	      keyRemap({
	        a: 'x',
	        b: 'y'
	      }, {
	        a: 1,
	        c: 2
	      }).should.be.eql({
	        x: 1,
	        c: 2
	      });
	    });
	  });

	  describe('iterator tools', function () {
	    var a = [1, 1, 2, 3];
	    var b = [2, 3, 4, 2];
	    it('union', function () {
	      return union(a, b).should.be.eql([1, 2, 3, 4]);
	    });
	    it('difference', function () {
	      return difference(a, b).should.be.eql([1]);
	    });
	  });

	  it('ensureArray', function () {
	    ensureArray().should.eql([]);
	    ensureArray(null).should.eql([]);
	    ensureArray([]).should.eql([]);
	    ensureArray(0).should.eql([0]);
	    ensureArray([0]).should.eql([0]);
	    ensureArray([[0]]).should.eql([[0]]);
	  });

	  it('setValue', function () {
	    var target = { a: { b: { c: 1 }, d: 1 } };
	    setValue(target, 'a.b.c', {}).should.eql({ a: { b: { c: {} }, d: 1 } });
	    setValue(target, 'a.b.e.f', 1).should.eql({ a: { b: { c: {}, e: { f: 1 } }, d: 1 } });
	    setValue(target, 'a.b', 1).should.eql({ a: { b: 1, d: 1 } });
	    setValue(target, 'a', { b: 1 }).should.eql({ a: { b: 1 } });
	  });
	});

	var debug$4 = browser$1('LC:SignatureFactoryRunner');

	function _validateSignature() {
	  var signatureResult = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	  var signature = signatureResult.signature;
	  var timestamp = signatureResult.timestamp;
	  var nonce = signatureResult.nonce;

	  if (typeof signature !== 'string' || typeof timestamp !== 'number' || typeof nonce !== 'string') {
	    throw new Error('malformed signature');
	  }
	  return {
	    signature: signature,
	    timestamp: timestamp,
	    nonce: nonce
	  };
	}

	var runSignatureFactory = (function (signatureFactory, params) {
	  return _Promise.resolve().then(function () {
	    debug$4('call signatureFactory with ' + params);
	    return signatureFactory.apply(undefined, _toConsumableArray(params));
	  }).then(tap(function (signatureResult) {
	    return debug$4('sign result', signatureResult);
	  }), function (error) {
	    // eslint-disable-next-line no-param-reassign
	    error.message = 'sign error: ' + error.message;
	    debug$4(error);
	    throw error;
	  }).then(_validateSignature);
	});

	describe('Run SignatureFactory', function () {
	  it('normal case', function () {
	    var signatureFactory = sinon.stub().returns({
	      signature: 'signature',
	      timestamp: Date.now(),
	      nonce: 'nonce'
	    });
	    return runSignatureFactory(signatureFactory, ['ycui']).then(function () {
	      signatureFactory.should.be.calledWith('ycui');
	    });
	  });
	  it('malformed signature', function () {
	    return runSignatureFactory(function () {
	      return undefined;
	    }, []).should.be.rejectedWith('malformed signature');
	  });
	  it('signatureFactory throws', function () {
	    return runSignatureFactory(function () {
	      throw new Error('error message');
	    }, []).should.be.rejectedWith('sign error: error message');
	  });
	});

	var core_isIterable = createCommonjsModule(function (module) {
	var classof   = _classof
	  , ITERATOR  = _wks('iterator')
	  , Iterators = _iterators;
	module.exports = _core.isIterable = function(it){
	  var O = Object(it);
	  return O[ITERATOR] !== undefined
	    || '@@iterator' in O
	    || Iterators.hasOwnProperty(classof(O));
	};
	});

	var isIterable$3 = createCommonjsModule(function (module) {
	module.exports = core_isIterable;
	});

	var isIterable$1 = createCommonjsModule(function (module) {
	module.exports = { "default": isIterable$3, __esModule: true };
	});

	var core_getIterator = createCommonjsModule(function (module) {
	var anObject = _anObject
	  , get      = core_getIteratorMethod;
	module.exports = _core.getIterator = function(it){
	  var iterFn = get(it);
	  if(typeof iterFn != 'function')throw TypeError(it + ' is not iterable!');
	  return anObject(iterFn.call(it));
	};
	});

	var getIterator$1 = createCommonjsModule(function (module) {
	module.exports = core_getIterator;
	});

	var getIterator = createCommonjsModule(function (module) {
	module.exports = { "default": getIterator$1, __esModule: true };
	});

	var _getIterator = unwrapExports(getIterator);

	var slicedToArray = createCommonjsModule(function (module, exports) {
	"use strict";

	exports.__esModule = true;

	var _isIterable2 = isIterable$1;

	var _isIterable3 = _interopRequireDefault(_isIterable2);

	var _getIterator2 = getIterator;

	var _getIterator3 = _interopRequireDefault(_getIterator2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = function () {
	  function sliceIterator(arr, i) {
	    var _arr = [];
	    var _n = true;
	    var _d = false;
	    var _e = undefined;

	    try {
	      for (var _i = (0, _getIterator3.default)(arr), _s; !(_n = (_s = _i.next()).done); _n = true) {
	        _arr.push(_s.value);

	        if (i && _arr.length === i) break;
	      }
	    } catch (err) {
	      _d = true;
	      _e = err;
	    } finally {
	      try {
	        if (!_n && _i["return"]) _i["return"]();
	      } finally {
	        if (_d) throw _e;
	      }
	    }

	    return _arr;
	  }

	  return function (arr, i) {
	    if (Array.isArray(arr)) {
	      return arr;
	    } else if ((0, _isIterable3.default)(Object(arr))) {
	      return sliceIterator(arr, i);
	    } else {
	      throw new TypeError("Invalid attempt to destructure non-iterable instance");
	    }
	  };
	}();
	});

	var _slicedToArray = unwrapExports(slicedToArray);

	var es6_object_getOwnPropertyNames = createCommonjsModule(function (module) {
	// 19.1.2.7 Object.getOwnPropertyNames(O)
	_objectSap('getOwnPropertyNames', function(){
	  return _objectGopnExt.f;
	});
	});

	var getOwnPropertyNames$2 = createCommonjsModule(function (module) {
	var $Object = _core.Object;
	module.exports = function getOwnPropertyNames$2(it){
	  return $Object.getOwnPropertyNames(it);
	};
	});

	var getOwnPropertyNames$1 = createCommonjsModule(function (module) {
	module.exports = { "default": getOwnPropertyNames$2, __esModule: true };
	});

	var _Object$getOwnPropertyNames = unwrapExports(getOwnPropertyNames$1);

	var _strictMethod = createCommonjsModule(function (module) {
	var fails = _fails;

	module.exports = function(method, arg){
	  return !!method && fails(function(){
	    arg ? method.call(null, function(){}, 1) : method.call(null);
	  });
	};
	});

	var es6_array_some = createCommonjsModule(function (module) {
	'use strict';
	var $export = _export
	  , $some   = _arrayMethods(3);

	$export($export.P + $export.F * !_strictMethod([].some, true), 'Array', {
	  // 22.1.3.23 / 15.4.4.17 Array.prototype.some(callbackfn [, thisArg])
	  some: function some(callbackfn /* , thisArg */){
	    return $some(this, callbackfn, arguments[1]);
	  }
	});
	});

	var some$3 = createCommonjsModule(function (module) {
	module.exports = _core.Array.some;
	});

	var some$2 = createCommonjsModule(function (module) {
	module.exports = { "default": some$3, __esModule: true };
	});

	var _Array$some = unwrapExports(some$2);

	var _objectToArray = createCommonjsModule(function (module) {
	var getKeys   = _objectKeys
	  , toIObject = _toIobject
	  , isEnum    = _objectPie.f;
	module.exports = function(isEntries){
	  return function(it){
	    var O      = toIObject(it)
	      , keys   = getKeys(O)
	      , length = keys.length
	      , i      = 0
	      , result = []
	      , key;
	    while(length > i)if(isEnum.call(O, key = keys[i++])){
	      result.push(isEntries ? [key, O[key]] : O[key]);
	    } return result;
	  };
	};
	});

	var es7_object_values = createCommonjsModule(function (module) {
	// https://github.com/tc39/proposal-object-values-entries
	var $export = _export
	  , $values = _objectToArray(false);

	$export($export.S, 'Object', {
	  values: function values(it){
	    return $values(it);
	  }
	});
	});

	var values$2 = createCommonjsModule(function (module) {
	module.exports = _core.Object.values;
	});

	var values$1 = createCommonjsModule(function (module) {
	module.exports = { "default": values$2, __esModule: true };
	});

	var _Object$values = unwrapExports(values$1);

	var iterator$3 = createCommonjsModule(function (module) {
	module.exports = _wksExt.f('iterator');
	});

	var iterator$1 = createCommonjsModule(function (module) {
	module.exports = { "default": iterator$3, __esModule: true };
	});

	var _typeof = createCommonjsModule(function (module, exports) {
	"use strict";

	exports.__esModule = true;

	var _iterator = iterator$1;

	var _iterator2 = _interopRequireDefault(_iterator);

	var _symbol = symbol;

	var _symbol2 = _interopRequireDefault(_symbol);

	var _typeof = typeof _symbol2.default === "function" && typeof _iterator2.default === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof _symbol2.default === "function" && obj.constructor === _symbol2.default ? "symbol" : typeof obj; };

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = typeof _symbol2.default === "function" && _typeof(_iterator2.default) === "symbol" ? function (obj) {
	  return typeof obj === "undefined" ? "undefined" : _typeof(obj);
	} : function (obj) {
	  return obj && typeof _symbol2.default === "function" && obj.constructor === _symbol2.default ? "symbol" : typeof obj === "undefined" ? "undefined" : _typeof(obj);
	};
	});

	var _typeof$1 = unwrapExports(_typeof);

	var possibleConstructorReturn = createCommonjsModule(function (module, exports) {
	"use strict";

	exports.__esModule = true;

	var _typeof2 = _typeof;

	var _typeof3 = _interopRequireDefault(_typeof2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = function (self, call) {
	  if (!self) {
	    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
	  }

	  return call && ((typeof call === "undefined" ? "undefined" : (0, _typeof3.default)(call)) === "object" || typeof call === "function") ? call : self;
	};
	});

	var _possibleConstructorReturn = unwrapExports(possibleConstructorReturn);

	var _setProto = createCommonjsModule(function (module) {
	// Works with __proto__ only. Old v8 can't work with null proto objects.
	/* eslint-disable no-proto */
	var isObject = _isObject
	  , anObject = _anObject;
	var check = function(O, proto){
	  anObject(O);
	  if(!isObject(proto) && proto !== null)throw TypeError(proto + ": can't set as prototype!");
	};
	module.exports = {
	  set: Object.setPrototypeOf || ('__proto__' in {} ? // eslint-disable-line
	    function(test, buggy, set){
	      try {
	        set = _ctx(Function.call, _objectGopd.f(Object.prototype, '__proto__').set, 2);
	        set(test, []);
	        buggy = !(test instanceof Array);
	      } catch(e){ buggy = true; }
	      return function setPrototypeOf(O, proto){
	        check(O, proto);
	        if(buggy)O.__proto__ = proto;
	        else set(O, proto);
	        return O;
	      };
	    }({}, false) : undefined),
	  check: check
	};
	});

	var es6_object_setPrototypeOf = createCommonjsModule(function (module) {
	// 19.1.3.19 Object.setPrototypeOf(O, proto)
	var $export = _export;
	$export($export.S, 'Object', {setPrototypeOf: _setProto.set});
	});

	var setPrototypeOf$3 = createCommonjsModule(function (module) {
	module.exports = _core.Object.setPrototypeOf;
	});

	var setPrototypeOf$1 = createCommonjsModule(function (module) {
	module.exports = { "default": setPrototypeOf$3, __esModule: true };
	});

	var es6_object_create = createCommonjsModule(function (module) {
	var $export = _export
	// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
	$export($export.S, 'Object', {create: _objectCreate});
	});

	var create$3 = createCommonjsModule(function (module) {
	var $Object = _core.Object;
	module.exports = function create$3(P, D){
	  return $Object.create(P, D);
	};
	});

	var create$1 = createCommonjsModule(function (module) {
	module.exports = { "default": create$3, __esModule: true };
	});

	var inherits = createCommonjsModule(function (module, exports) {
	"use strict";

	exports.__esModule = true;

	var _setPrototypeOf = setPrototypeOf$1;

	var _setPrototypeOf2 = _interopRequireDefault(_setPrototypeOf);

	var _create = create$1;

	var _create2 = _interopRequireDefault(_create);

	var _typeof2 = _typeof;

	var _typeof3 = _interopRequireDefault(_typeof2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = function (subClass, superClass) {
	  if (typeof superClass !== "function" && superClass !== null) {
	    throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === "undefined" ? "undefined" : (0, _typeof3.default)(superClass)));
	  }

	  subClass.prototype = (0, _create2.default)(superClass && superClass.prototype, {
	    constructor: {
	      value: subClass,
	      enumerable: false,
	      writable: true,
	      configurable: true
	    }
	  });
	  if (superClass) _setPrototypeOf2.default ? (0, _setPrototypeOf2.default)(subClass, superClass) : subClass.__proto__ = superClass;
	};
	});

	var _inherits = unwrapExports(inherits);

	var index$6 = createCommonjsModule(function (module) {
	'use strict';

	var has = Object.prototype.hasOwnProperty
	  , prefix = '~';

	/**
	 * Constructor to create a storage for our `EE` objects.
	 * An `Events` instance is a plain object whose properties are event names.
	 *
	 * @constructor
	 * @api private
	 */
	function Events() {}

	//
	// We try to not inherit from `Object.prototype`. In some engines creating an
	// instance in this way is faster than calling `Object.create(null)` directly.
	// If `Object.create(null)` is not supported we prefix the event names with a
	// character to make sure that the built-in object properties are not
	// overridden or used as an attack vector.
	//
	if (Object.create) {
	  Events.prototype = Object.create(null);

	  //
	  // This hack is needed because the `__proto__` property is still inherited in
	  // some old browsers like Android 4, iPhone 5.1, Opera 11 and Safari 5.
	  //
	  if (!new Events().__proto__) prefix = false;
	}

	/**
	 * Representation of a single event listener.
	 *
	 * @param {Function} fn The listener function.
	 * @param {Mixed} context The context to invoke the listener with.
	 * @param {Boolean} [once=false] Specify if the listener is a one-time listener.
	 * @constructor
	 * @api private
	 */
	function EE(fn, context, once) {
	  this.fn = fn;
	  this.context = context;
	  this.once = once || false;
	}

	/**
	 * Minimal `EventEmitter` interface that is molded against the Node.js
	 * `EventEmitter` interface.
	 *
	 * @constructor
	 * @api public
	 */
	function EventEmitter() {
	  this._events = new Events();
	  this._eventsCount = 0;
	}

	/**
	 * Return an array listing the events for which the emitter has registered
	 * listeners.
	 *
	 * @returns {Array}
	 * @api public
	 */
	EventEmitter.prototype.eventNames = function eventNames() {
	  var names = []
	    , events
	    , name;

	  if (this._eventsCount === 0) return names;

	  for (name in (events = this._events)) {
	    if (has.call(events, name)) names.push(prefix ? name.slice(1) : name);
	  }

	  if (Object.getOwnPropertySymbols) {
	    return names.concat(Object.getOwnPropertySymbols(events));
	  }

	  return names;
	};

	/**
	 * Return the listeners registered for a given event.
	 *
	 * @param {String|Symbol} event The event name.
	 * @param {Boolean} exists Only check if there are listeners.
	 * @returns {Array|Boolean}
	 * @api public
	 */
	EventEmitter.prototype.listeners = function listeners(event, exists) {
	  var evt = prefix ? prefix + event : event
	    , available = this._events[evt];

	  if (exists) return !!available;
	  if (!available) return [];
	  if (available.fn) return [available.fn];

	  for (var i = 0, l = available.length, ee = new Array(l); i < l; i++) {
	    ee[i] = available[i].fn;
	  }

	  return ee;
	};

	/**
	 * Calls each of the listeners registered for a given event.
	 *
	 * @param {String|Symbol} event The event name.
	 * @returns {Boolean} `true` if the event had listeners, else `false`.
	 * @api public
	 */
	EventEmitter.prototype.emit = function emit(event, a1, a2, a3, a4, a5) {
	  var evt = prefix ? prefix + event : event;

	  if (!this._events[evt]) return false;

	  var listeners = this._events[evt]
	    , len = arguments.length
	    , args
	    , i;

	  if (listeners.fn) {
	    if (listeners.once) this.removeListener(event, listeners.fn, undefined, true);

	    switch (len) {
	      case 1: return listeners.fn.call(listeners.context), true;
	      case 2: return listeners.fn.call(listeners.context, a1), true;
	      case 3: return listeners.fn.call(listeners.context, a1, a2), true;
	      case 4: return listeners.fn.call(listeners.context, a1, a2, a3), true;
	      case 5: return listeners.fn.call(listeners.context, a1, a2, a3, a4), true;
	      case 6: return listeners.fn.call(listeners.context, a1, a2, a3, a4, a5), true;
	    }

	    for (i = 1, args = new Array(len -1); i < len; i++) {
	      args[i - 1] = arguments[i];
	    }

	    listeners.fn.apply(listeners.context, args);
	  } else {
	    var length = listeners.length
	      , j;

	    for (i = 0; i < length; i++) {
	      if (listeners[i].once) this.removeListener(event, listeners[i].fn, undefined, true);

	      switch (len) {
	        case 1: listeners[i].fn.call(listeners[i].context); break;
	        case 2: listeners[i].fn.call(listeners[i].context, a1); break;
	        case 3: listeners[i].fn.call(listeners[i].context, a1, a2); break;
	        case 4: listeners[i].fn.call(listeners[i].context, a1, a2, a3); break;
	        default:
	          if (!args) for (j = 1, args = new Array(len -1); j < len; j++) {
	            args[j - 1] = arguments[j];
	          }

	          listeners[i].fn.apply(listeners[i].context, args);
	      }
	    }
	  }

	  return true;
	};

	/**
	 * Add a listener for a given event.
	 *
	 * @param {String|Symbol} event The event name.
	 * @param {Function} fn The listener function.
	 * @param {Mixed} [context=this] The context to invoke the listener with.
	 * @returns {EventEmitter} `this`.
	 * @api public
	 */
	EventEmitter.prototype.on = function on(event, fn, context) {
	  var listener = new EE(fn, context || this)
	    , evt = prefix ? prefix + event : event;

	  if (!this._events[evt]) this._events[evt] = listener, this._eventsCount++;
	  else if (!this._events[evt].fn) this._events[evt].push(listener);
	  else this._events[evt] = [this._events[evt], listener];

	  return this;
	};

	/**
	 * Add a one-time listener for a given event.
	 *
	 * @param {String|Symbol} event The event name.
	 * @param {Function} fn The listener function.
	 * @param {Mixed} [context=this] The context to invoke the listener with.
	 * @returns {EventEmitter} `this`.
	 * @api public
	 */
	EventEmitter.prototype.once = function once(event, fn, context) {
	  var listener = new EE(fn, context || this, true)
	    , evt = prefix ? prefix + event : event;

	  if (!this._events[evt]) this._events[evt] = listener, this._eventsCount++;
	  else if (!this._events[evt].fn) this._events[evt].push(listener);
	  else this._events[evt] = [this._events[evt], listener];

	  return this;
	};

	/**
	 * Remove the listeners of a given event.
	 *
	 * @param {String|Symbol} event The event name.
	 * @param {Function} fn Only remove the listeners that match this function.
	 * @param {Mixed} context Only remove the listeners that have this context.
	 * @param {Boolean} once Only remove one-time listeners.
	 * @returns {EventEmitter} `this`.
	 * @api public
	 */
	EventEmitter.prototype.removeListener = function removeListener(event, fn, context, once) {
	  var evt = prefix ? prefix + event : event;

	  if (!this._events[evt]) return this;
	  if (!fn) {
	    if (--this._eventsCount === 0) this._events = new Events();
	    else delete this._events[evt];
	    return this;
	  }

	  var listeners = this._events[evt];

	  if (listeners.fn) {
	    if (
	         listeners.fn === fn
	      && (!once || listeners.once)
	      && (!context || listeners.context === context)
	    ) {
	      if (--this._eventsCount === 0) this._events = new Events();
	      else delete this._events[evt];
	    }
	  } else {
	    for (var i = 0, events = [], length = listeners.length; i < length; i++) {
	      if (
	           listeners[i].fn !== fn
	        || (once && !listeners[i].once)
	        || (context && listeners[i].context !== context)
	      ) {
	        events.push(listeners[i]);
	      }
	    }

	    //
	    // Reset the array, or remove it completely if we have no more listeners.
	    //
	    if (events.length) this._events[evt] = events.length === 1 ? events[0] : events;
	    else if (--this._eventsCount === 0) this._events = new Events();
	    else delete this._events[evt];
	  }

	  return this;
	};

	/**
	 * Remove all listeners, or those of the specified event.
	 *
	 * @param {String|Symbol} [event] The event name.
	 * @returns {EventEmitter} `this`.
	 * @api public
	 */
	EventEmitter.prototype.removeAllListeners = function removeAllListeners(event) {
	  var evt;

	  if (event) {
	    evt = prefix ? prefix + event : event;
	    if (this._events[evt]) {
	      if (--this._eventsCount === 0) this._events = new Events();
	      else delete this._events[evt];
	    }
	  } else {
	    this._events = new Events();
	    this._eventsCount = 0;
	  }

	  return this;
	};

	//
	// Alias methods names because people roll like that.
	//
	EventEmitter.prototype.off = EventEmitter.prototype.removeListener;
	EventEmitter.prototype.addListener = EventEmitter.prototype.on;

	//
	// This function doesn't apply anymore.
	//
	EventEmitter.prototype.setMaxListeners = function setMaxListeners() {
	  return this;
	};

	//
	// Expose the prefix.
	//
	EventEmitter.prefixed = prefix;

	//
	// Allow `EventEmitter` to be imported as module namespace.
	//
	EventEmitter.EventEmitter = EventEmitter;

	//
	// Expose the module.
	//
	if ('undefined' !== typeof module) {
	  module.exports = EventEmitter;
	}
	});

	var bind = createCommonjsModule(function (module) {
	  'use strict';

	  module.exports = function bind(fn, thisArg) {
	    return function wrap() {
	      var args = new Array(arguments.length);
	      for (var i = 0; i < args.length; i++) {
	        args[i] = arguments[i];
	      }
	      return fn.apply(thisArg, args);
	    };
	  };
	});

	var utils = createCommonjsModule(function (module) {
	  'use strict';

	  var bind$$1 = bind;

	  /*global toString:true*/

	  // utils is a library of generic helper functions non-specific to axios

	  var toString = Object.prototype.toString;

	  /**
	   * Determine if a value is an Array
	   *
	   * @param {Object} val The value to test
	   * @returns {boolean} True if value is an Array, otherwise false
	   */
	  function isArray(val) {
	    return toString.call(val) === '[object Array]';
	  }

	  /**
	   * Determine if a value is an ArrayBuffer
	   *
	   * @param {Object} val The value to test
	   * @returns {boolean} True if value is an ArrayBuffer, otherwise false
	   */
	  function isArrayBuffer(val) {
	    return toString.call(val) === '[object ArrayBuffer]';
	  }

	  /**
	   * Determine if a value is a FormData
	   *
	   * @param {Object} val The value to test
	   * @returns {boolean} True if value is an FormData, otherwise false
	   */
	  function isFormData(val) {
	    return typeof FormData !== 'undefined' && val instanceof FormData;
	  }

	  /**
	   * Determine if a value is a view on an ArrayBuffer
	   *
	   * @param {Object} val The value to test
	   * @returns {boolean} True if value is a view on an ArrayBuffer, otherwise false
	   */
	  function isArrayBufferView(val) {
	    var result;
	    if (typeof ArrayBuffer !== 'undefined' && ArrayBuffer.isView) {
	      result = ArrayBuffer.isView(val);
	    } else {
	      result = val && val.buffer && val.buffer instanceof ArrayBuffer;
	    }
	    return result;
	  }

	  /**
	   * Determine if a value is a String
	   *
	   * @param {Object} val The value to test
	   * @returns {boolean} True if value is a String, otherwise false
	   */
	  function isString(val) {
	    return typeof val === 'string';
	  }

	  /**
	   * Determine if a value is a Number
	   *
	   * @param {Object} val The value to test
	   * @returns {boolean} True if value is a Number, otherwise false
	   */
	  function isNumber(val) {
	    return typeof val === 'number';
	  }

	  /**
	   * Determine if a value is undefined
	   *
	   * @param {Object} val The value to test
	   * @returns {boolean} True if the value is undefined, otherwise false
	   */
	  function isUndefined(val) {
	    return typeof val === 'undefined';
	  }

	  /**
	   * Determine if a value is an Object
	   *
	   * @param {Object} val The value to test
	   * @returns {boolean} True if value is an Object, otherwise false
	   */
	  function isObject(val) {
	    return val !== null && (typeof val === 'undefined' ? 'undefined' : _typeof$1(val)) === 'object';
	  }

	  /**
	   * Determine if a value is a Date
	   *
	   * @param {Object} val The value to test
	   * @returns {boolean} True if value is a Date, otherwise false
	   */
	  function isDate(val) {
	    return toString.call(val) === '[object Date]';
	  }

	  /**
	   * Determine if a value is a File
	   *
	   * @param {Object} val The value to test
	   * @returns {boolean} True if value is a File, otherwise false
	   */
	  function isFile(val) {
	    return toString.call(val) === '[object File]';
	  }

	  /**
	   * Determine if a value is a Blob
	   *
	   * @param {Object} val The value to test
	   * @returns {boolean} True if value is a Blob, otherwise false
	   */
	  function isBlob(val) {
	    return toString.call(val) === '[object Blob]';
	  }

	  /**
	   * Determine if a value is a Function
	   *
	   * @param {Object} val The value to test
	   * @returns {boolean} True if value is a Function, otherwise false
	   */
	  function isFunction(val) {
	    return toString.call(val) === '[object Function]';
	  }

	  /**
	   * Determine if a value is a Stream
	   *
	   * @param {Object} val The value to test
	   * @returns {boolean} True if value is a Stream, otherwise false
	   */
	  function isStream(val) {
	    return isObject(val) && isFunction(val.pipe);
	  }

	  /**
	   * Determine if a value is a URLSearchParams object
	   *
	   * @param {Object} val The value to test
	   * @returns {boolean} True if value is a URLSearchParams object, otherwise false
	   */
	  function isURLSearchParams(val) {
	    return typeof URLSearchParams !== 'undefined' && val instanceof URLSearchParams;
	  }

	  /**
	   * Trim excess whitespace off the beginning and end of a string
	   *
	   * @param {String} str The String to trim
	   * @returns {String} The String freed of excess whitespace
	   */
	  function trim(str) {
	    return str.replace(/^\s*/, '').replace(/\s*$/, '');
	  }

	  /**
	   * Determine if we're running in a standard browser environment
	   *
	   * This allows axios to run in a web worker, and react-native.
	   * Both environments support XMLHttpRequest, but not fully standard globals.
	   *
	   * web workers:
	   *  typeof window -> undefined
	   *  typeof document -> undefined
	   *
	   * react-native:
	   *  typeof document.createElement -> undefined
	   */
	  function isStandardBrowserEnv() {
	    return typeof window !== 'undefined' && typeof document !== 'undefined' && typeof document.createElement === 'function';
	  }

	  /**
	   * Iterate over an Array or an Object invoking a function for each item.
	   *
	   * If `obj` is an Array callback will be called passing
	   * the value, index, and complete array for each item.
	   *
	   * If 'obj' is an Object callback will be called passing
	   * the value, key, and complete object for each property.
	   *
	   * @param {Object|Array} obj The object to iterate
	   * @param {Function} fn The callback to invoke for each item
	   */
	  function forEach(obj, fn) {
	    // Don't bother if no value provided
	    if (obj === null || typeof obj === 'undefined') {
	      return;
	    }

	    // Force an array if not already something iterable
	    if ((typeof obj === 'undefined' ? 'undefined' : _typeof$1(obj)) !== 'object' && !isArray(obj)) {
	      /*eslint no-param-reassign:0*/
	      obj = [obj];
	    }

	    if (isArray(obj)) {
	      // Iterate over array values
	      for (var i = 0, l = obj.length; i < l; i++) {
	        fn.call(null, obj[i], i, obj);
	      }
	    } else {
	      // Iterate over object keys
	      for (var key in obj) {
	        if (obj.hasOwnProperty(key)) {
	          fn.call(null, obj[key], key, obj);
	        }
	      }
	    }
	  }

	  /**
	   * Accepts varargs expecting each argument to be an object, then
	   * immutably merges the properties of each object and returns result.
	   *
	   * When multiple objects contain the same key the later object in
	   * the arguments list will take precedence.
	   *
	   * Example:
	   *
	   * ```js
	   * var result = merge({foo: 123}, {foo: 456});
	   * console.log(result.foo); // outputs 456
	   * ```
	   *
	   * @param {Object} obj1 Object to merge
	   * @returns {Object} Result of all merge properties
	   */
	  function merge() /* obj1, obj2, obj3, ... */{
	    var result = {};
	    function assignValue(val, key) {
	      if (_typeof$1(result[key]) === 'object' && (typeof val === 'undefined' ? 'undefined' : _typeof$1(val)) === 'object') {
	        result[key] = merge(result[key], val);
	      } else {
	        result[key] = val;
	      }
	    }

	    for (var i = 0, l = arguments.length; i < l; i++) {
	      forEach(arguments[i], assignValue);
	    }
	    return result;
	  }

	  /**
	   * Extends object a by mutably adding to it the properties of object b.
	   *
	   * @param {Object} a The object to be extended
	   * @param {Object} b The object to copy properties from
	   * @param {Object} thisArg The object to bind function to
	   * @return {Object} The resulting value of object a
	   */
	  function extend(a, b, thisArg) {
	    forEach(b, function assignValue(val, key) {
	      if (thisArg && typeof val === 'function') {
	        a[key] = bind$$1(val, thisArg);
	      } else {
	        a[key] = val;
	      }
	    });
	    return a;
	  }

	  module.exports = {
	    isArray: isArray,
	    isArrayBuffer: isArrayBuffer,
	    isFormData: isFormData,
	    isArrayBufferView: isArrayBufferView,
	    isString: isString,
	    isNumber: isNumber,
	    isObject: isObject,
	    isUndefined: isUndefined,
	    isDate: isDate,
	    isFile: isFile,
	    isBlob: isBlob,
	    isFunction: isFunction,
	    isStream: isStream,
	    isURLSearchParams: isURLSearchParams,
	    isStandardBrowserEnv: isStandardBrowserEnv,
	    forEach: forEach,
	    merge: merge,
	    extend: extend,
	    trim: trim
	  };
	});

	var normalizeHeaderName = createCommonjsModule(function (module) {
	  'use strict';

	  var utils$$1 = utils;

	  module.exports = function normalizeHeaderName(headers, normalizedName) {
	    utils$$1.forEach(headers, function processHeader(value, name) {
	      if (name !== normalizedName && name.toUpperCase() === normalizedName.toUpperCase()) {
	        headers[normalizedName] = value;
	        delete headers[name];
	      }
	    });
	  };
	});

	var defaults = createCommonjsModule(function (module) {
	  'use strict';

	  var utils$$1 = utils;
	  var normalizeHeaderName$$1 = normalizeHeaderName;

	  var PROTECTION_PREFIX = /^\)\]\}',?\n/;
	  var DEFAULT_CONTENT_TYPE = {
	    'Content-Type': 'application/x-www-form-urlencoded'
	  };

	  function setContentTypeIfUnset(headers, value) {
	    if (!utils$$1.isUndefined(headers) && utils$$1.isUndefined(headers['Content-Type'])) {
	      headers['Content-Type'] = value;
	    }
	  }

	  module.exports = {
	    transformRequest: [function transformRequest(data, headers) {
	      normalizeHeaderName$$1(headers, 'Content-Type');
	      if (utils$$1.isFormData(data) || utils$$1.isArrayBuffer(data) || utils$$1.isStream(data) || utils$$1.isFile(data) || utils$$1.isBlob(data)) {
	        return data;
	      }
	      if (utils$$1.isArrayBufferView(data)) {
	        return data.buffer;
	      }
	      if (utils$$1.isURLSearchParams(data)) {
	        setContentTypeIfUnset(headers, 'application/x-www-form-urlencoded;charset=utf-8');
	        return data.toString();
	      }
	      if (utils$$1.isObject(data)) {
	        setContentTypeIfUnset(headers, 'application/json;charset=utf-8');
	        return _JSON$stringify(data);
	      }
	      return data;
	    }],

	    transformResponse: [function transformResponse(data) {
	      /*eslint no-param-reassign:0*/
	      if (typeof data === 'string') {
	        data = data.replace(PROTECTION_PREFIX, '');
	        try {
	          data = JSON.parse(data);
	        } catch (e) {/* Ignore */}
	      }
	      return data;
	    }],

	    headers: {
	      common: {
	        'Accept': 'application/json, text/plain, */*'
	      },
	      patch: utils$$1.merge(DEFAULT_CONTENT_TYPE),
	      post: utils$$1.merge(DEFAULT_CONTENT_TYPE),
	      put: utils$$1.merge(DEFAULT_CONTENT_TYPE)
	    },

	    timeout: 0,

	    xsrfCookieName: 'XSRF-TOKEN',
	    xsrfHeaderName: 'X-XSRF-TOKEN',

	    maxContentLength: -1,

	    validateStatus: function validateStatus(status) {
	      return status >= 200 && status < 300;
	    }
	  };
	});

	var transformRequest = defaults.transformRequest;
	var transformResponse = defaults.transformResponse;





	var validateStatus = defaults.validateStatus;

	var InterceptorManager = createCommonjsModule(function (module) {
	  'use strict';

	  var utils$$1 = utils;

	  function InterceptorManager() {
	    this.handlers = [];
	  }

	  /**
	   * Add a new interceptor to the stack
	   *
	   * @param {Function} fulfilled The function to handle `then` for a `Promise`
	   * @param {Function} rejected The function to handle `reject` for a `Promise`
	   *
	   * @return {Number} An ID used to remove interceptor later
	   */
	  InterceptorManager.prototype.use = function use(fulfilled, rejected) {
	    this.handlers.push({
	      fulfilled: fulfilled,
	      rejected: rejected
	    });
	    return this.handlers.length - 1;
	  };

	  /**
	   * Remove an interceptor from the stack
	   *
	   * @param {Number} id The ID that was returned by `use`
	   */
	  InterceptorManager.prototype.eject = function eject(id) {
	    if (this.handlers[id]) {
	      this.handlers[id] = null;
	    }
	  };

	  /**
	   * Iterate over all the registered interceptors
	   *
	   * This method is particularly useful for skipping over any
	   * interceptors that may have become `null` calling `eject`.
	   *
	   * @param {Function} fn The function to call for each interceptor
	   */
	  InterceptorManager.prototype.forEach = function forEach(fn) {
	    utils$$1.forEach(this.handlers, function forEachHandler(h) {
	      if (h !== null) {
	        fn(h);
	      }
	    });
	  };

	  module.exports = InterceptorManager;
	});

	var transformData = createCommonjsModule(function (module) {
	  'use strict';

	  var utils$$1 = utils;

	  /**
	   * Transform the data for a request or a response
	   *
	   * @param {Object|String} data The data to be transformed
	   * @param {Array} headers The headers for the request or response
	   * @param {Array|Function} fns A single function or Array of functions
	   * @returns {*} The resulting transformed data
	   */
	  module.exports = function transformData(data, headers, fns) {
	    /*eslint no-param-reassign:0*/
	    utils$$1.forEach(fns, function transform(fn) {
	      data = fn(data, headers);
	    });

	    return data;
	  };
	});

	var enhanceError = createCommonjsModule(function (module) {
	  'use strict';

	  /**
	   * Update an Error with the specified config, error code, and response.
	   *
	   * @param {Error} error The error to update.
	   * @param {Object} config The config.
	   * @param {string} [code] The error code (for example, 'ECONNABORTED').
	   @ @param {Object} [response] The response.
	   * @returns {Error} The error.
	   */

	  module.exports = function enhanceError(error, config, code, response) {
	    error.config = config;
	    if (code) {
	      error.code = code;
	    }
	    error.response = response;
	    return error;
	  };
	});

	var createError = createCommonjsModule(function (module) {
	  'use strict';

	  var enhanceError$$1 = enhanceError;

	  /**
	   * Create an Error with the specified message, config, error code, and response.
	   *
	   * @param {string} message The error message.
	   * @param {Object} config The config.
	   * @param {string} [code] The error code (for example, 'ECONNABORTED').
	   @ @param {Object} [response] The response.
	   * @returns {Error} The created error.
	   */
	  module.exports = function createError(message, config, code, response) {
	    var error = new Error(message);
	    return enhanceError$$1(error, config, code, response);
	  };
	});

	var settle = createCommonjsModule(function (module) {
	  'use strict';

	  var createError$$1 = createError;

	  /**
	   * Resolve or reject a Promise based on response status.
	   *
	   * @param {Function} resolve A function that resolves the promise.
	   * @param {Function} reject A function that rejects the promise.
	   * @param {object} response The response.
	   */
	  module.exports = function settle(resolve, reject, response) {
	    var validateStatus = response.config.validateStatus;
	    // Note: status is not exposed by XDomainRequest
	    if (!response.status || !validateStatus || validateStatus(response.status)) {
	      resolve(response);
	    } else {
	      reject(createError$$1('Request failed with status code ' + response.status, response.config, null, response));
	    }
	  };
	});

	var buildURL = createCommonjsModule(function (module) {
	  'use strict';

	  var utils$$1 = utils;

	  function encode(val) {
	    return encodeURIComponent(val).replace(/%40/gi, '@').replace(/%3A/gi, ':').replace(/%24/g, '$').replace(/%2C/gi, ',').replace(/%20/g, '+').replace(/%5B/gi, '[').replace(/%5D/gi, ']');
	  }

	  /**
	   * Build a URL by appending params to the end
	   *
	   * @param {string} url The base of the url (e.g., http://www.google.com)
	   * @param {object} [params] The params to be appended
	   * @returns {string} The formatted url
	   */
	  module.exports = function buildURL(url, params, paramsSerializer) {
	    /*eslint no-param-reassign:0*/
	    if (!params) {
	      return url;
	    }

	    var serializedParams;
	    if (paramsSerializer) {
	      serializedParams = paramsSerializer(params);
	    } else if (utils$$1.isURLSearchParams(params)) {
	      serializedParams = params.toString();
	    } else {
	      var parts = [];

	      utils$$1.forEach(params, function serialize(val, key) {
	        if (val === null || typeof val === 'undefined') {
	          return;
	        }

	        if (utils$$1.isArray(val)) {
	          key = key + '[]';
	        }

	        if (!utils$$1.isArray(val)) {
	          val = [val];
	        }

	        utils$$1.forEach(val, function parseValue(v) {
	          if (utils$$1.isDate(v)) {
	            v = v.toISOString();
	          } else if (utils$$1.isObject(v)) {
	            v = _JSON$stringify(v);
	          }
	          parts.push(encode(key) + '=' + encode(v));
	        });
	      });

	      serializedParams = parts.join('&');
	    }

	    if (serializedParams) {
	      url += (url.indexOf('?') === -1 ? '?' : '&') + serializedParams;
	    }

	    return url;
	  };
	});

	var parseHeaders = createCommonjsModule(function (module) {
	  'use strict';

	  var utils$$1 = utils;

	  /**
	   * Parse headers into an object
	   *
	   * ```
	   * Date: Wed, 27 Aug 2014 08:58:49 GMT
	   * Content-Type: application/json
	   * Connection: keep-alive
	   * Transfer-Encoding: chunked
	   * ```
	   *
	   * @param {String} headers Headers needing to be parsed
	   * @returns {Object} Headers parsed into an object
	   */
	  module.exports = function parseHeaders(headers) {
	    var parsed = {};
	    var key;
	    var val;
	    var i;

	    if (!headers) {
	      return parsed;
	    }

	    utils$$1.forEach(headers.split('\n'), function parser(line) {
	      i = line.indexOf(':');
	      key = utils$$1.trim(line.substr(0, i)).toLowerCase();
	      val = utils$$1.trim(line.substr(i + 1));

	      if (key) {
	        parsed[key] = parsed[key] ? parsed[key] + ', ' + val : val;
	      }
	    });

	    return parsed;
	  };
	});

	var isURLSameOrigin = createCommonjsModule(function (module) {
	  'use strict';

	  var utils$$1 = utils;

	  module.exports = utils$$1.isStandardBrowserEnv() ?

	  // Standard browser envs have full support of the APIs needed to test
	  // whether the request URL is of the same origin as current location.
	  function standardBrowserEnv() {
	    var msie = /(msie|trident)/i.test(navigator.userAgent);
	    var urlParsingNode = document.createElement('a');
	    var originURL;

	    /**
	    * Parse a URL to discover it's components
	    *
	    * @param {String} url The URL to be parsed
	    * @returns {Object}
	    */
	    function resolveURL(url) {
	      var href = url;

	      if (msie) {
	        // IE needs attribute set twice to normalize properties
	        urlParsingNode.setAttribute('href', href);
	        href = urlParsingNode.href;
	      }

	      urlParsingNode.setAttribute('href', href);

	      // urlParsingNode provides the UrlUtils interface - http://url.spec.whatwg.org/#urlutils
	      return {
	        href: urlParsingNode.href,
	        protocol: urlParsingNode.protocol ? urlParsingNode.protocol.replace(/:$/, '') : '',
	        host: urlParsingNode.host,
	        search: urlParsingNode.search ? urlParsingNode.search.replace(/^\?/, '') : '',
	        hash: urlParsingNode.hash ? urlParsingNode.hash.replace(/^#/, '') : '',
	        hostname: urlParsingNode.hostname,
	        port: urlParsingNode.port,
	        pathname: urlParsingNode.pathname.charAt(0) === '/' ? urlParsingNode.pathname : '/' + urlParsingNode.pathname
	      };
	    }

	    originURL = resolveURL(window.location.href);

	    /**
	    * Determine if a URL shares the same origin as the current location
	    *
	    * @param {String} requestURL The URL to test
	    * @returns {boolean} True if URL shares the same origin, otherwise false
	    */
	    return function isURLSameOrigin(requestURL) {
	      var parsed = utils$$1.isString(requestURL) ? resolveURL(requestURL) : requestURL;
	      return parsed.protocol === originURL.protocol && parsed.host === originURL.host;
	    };
	  }() :

	  // Non standard browser envs (web workers, react-native) lack needed support.
	  function nonStandardBrowserEnv() {
	    return function isURLSameOrigin() {
	      return true;
	    };
	  }();
	});

	var btoa = createCommonjsModule(function (module) {
	  'use strict';

	  // btoa polyfill for IE<10 courtesy https://github.com/davidchambers/Base64.js

	  var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';

	  function E() {
	    this.message = 'String contains an invalid character';
	  }
	  E.prototype = new Error();
	  E.prototype.code = 5;
	  E.prototype.name = 'InvalidCharacterError';

	  function btoa(input) {
	    var str = String(input);
	    var output = '';
	    for (
	    // initialize result and counter
	    var block, charCode, idx = 0, map = chars;
	    // if the next str index does not exist:
	    //   change the mapping table to "="
	    //   check if d has no fractional digits
	    str.charAt(idx | 0) || (map = '=', idx % 1);
	    // "8 - idx % 1 * 8" generates the sequence 2, 4, 6, 8
	    output += map.charAt(63 & block >> 8 - idx % 1 * 8)) {
	      charCode = str.charCodeAt(idx += 3 / 4);
	      if (charCode > 0xFF) {
	        throw new E();
	      }
	      block = block << 8 | charCode;
	    }
	    return output;
	  }

	  module.exports = btoa;
	});

	var cookies = createCommonjsModule(function (module) {
	  'use strict';

	  var utils$$1 = utils;

	  module.exports = utils$$1.isStandardBrowserEnv() ?

	  // Standard browser envs support document.cookie
	  function standardBrowserEnv() {
	    return {
	      write: function write(name, value, expires, path, domain, secure) {
	        var cookie = [];
	        cookie.push(name + '=' + encodeURIComponent(value));

	        if (utils$$1.isNumber(expires)) {
	          cookie.push('expires=' + new Date(expires).toGMTString());
	        }

	        if (utils$$1.isString(path)) {
	          cookie.push('path=' + path);
	        }

	        if (utils$$1.isString(domain)) {
	          cookie.push('domain=' + domain);
	        }

	        if (secure === true) {
	          cookie.push('secure');
	        }

	        document.cookie = cookie.join('; ');
	      },

	      read: function read(name) {
	        var match = document.cookie.match(new RegExp('(^|;\\s*)(' + name + ')=([^;]*)'));
	        return match ? decodeURIComponent(match[3]) : null;
	      },

	      remove: function remove(name) {
	        this.write(name, '', Date.now() - 86400000);
	      }
	    };
	  }() :

	  // Non standard browser env (web workers, react-native) lack needed support.
	  function nonStandardBrowserEnv() {
	    return {
	      write: function write() {},
	      read: function read() {
	        return null;
	      },
	      remove: function remove() {}
	    };
	  }();
	});

	var xhr = createCommonjsModule(function (module) {
	  'use strict';

	  var utils$$1 = utils;
	  var settle$$1 = settle;
	  var buildURL$$1 = buildURL;
	  var parseHeaders$$1 = parseHeaders;
	  var isURLSameOrigin$$1 = isURLSameOrigin;
	  var createError$$1 = createError;
	  var btoa$$1 = typeof window !== 'undefined' && window.btoa || btoa;

	  module.exports = function xhrAdapter(config) {
	    return new _Promise(function dispatchXhrRequest(resolve, reject) {
	      var requestData = config.data;
	      var requestHeaders = config.headers;

	      if (utils$$1.isFormData(requestData)) {
	        delete requestHeaders['Content-Type']; // Let the browser set it
	      }

	      var request = new XMLHttpRequest();
	      var loadEvent = 'onreadystatechange';
	      var xDomain = false;

	      // For IE 8/9 CORS support
	      // Only supports POST and GET calls and doesn't returns the response headers.
	      // DON'T do this for testing b/c XMLHttpRequest is mocked, not XDomainRequest.
	      if (process.env.NODE_ENV !== 'test' && typeof window !== 'undefined' && window.XDomainRequest && !('withCredentials' in request) && !isURLSameOrigin$$1(config.url)) {
	        request = new window.XDomainRequest();
	        loadEvent = 'onload';
	        xDomain = true;
	        request.onprogress = function handleProgress() {};
	        request.ontimeout = function handleTimeout() {};
	      }

	      // HTTP basic authentication
	      if (config.auth) {
	        var username = config.auth.username || '';
	        var password = config.auth.password || '';
	        requestHeaders.Authorization = 'Basic ' + btoa$$1(username + ':' + password);
	      }

	      request.open(config.method.toUpperCase(), buildURL$$1(config.url, config.params, config.paramsSerializer), true);

	      // Set the request timeout in MS
	      request.timeout = config.timeout;

	      // Listen for ready state
	      request[loadEvent] = function handleLoad() {
	        if (!request || request.readyState !== 4 && !xDomain) {
	          return;
	        }

	        // The request errored out and we didn't get a response, this will be
	        // handled by onerror instead
	        if (request.status === 0) {
	          return;
	        }

	        // Prepare the response
	        var responseHeaders = 'getAllResponseHeaders' in request ? parseHeaders$$1(request.getAllResponseHeaders()) : null;
	        var responseData = !config.responseType || config.responseType === 'text' ? request.responseText : request.response;
	        var response = {
	          data: responseData,
	          // IE sends 1223 instead of 204 (https://github.com/mzabriskie/axios/issues/201)
	          status: request.status === 1223 ? 204 : request.status,
	          statusText: request.status === 1223 ? 'No Content' : request.statusText,
	          headers: responseHeaders,
	          config: config,
	          request: request
	        };

	        settle$$1(resolve, reject, response);

	        // Clean up request
	        request = null;
	      };

	      // Handle low level network errors
	      request.onerror = function handleError() {
	        // Real errors are hidden from us by the browser
	        // onerror should only fire if it's a network error
	        reject(createError$$1('Network Error', config));

	        // Clean up request
	        request = null;
	      };

	      // Handle timeout
	      request.ontimeout = function handleTimeout() {
	        reject(createError$$1('timeout of ' + config.timeout + 'ms exceeded', config, 'ECONNABORTED'));

	        // Clean up request
	        request = null;
	      };

	      // Add xsrf header
	      // This is only done if running in a standard browser environment.
	      // Specifically not if we're in a web worker, or react-native.
	      if (utils$$1.isStandardBrowserEnv()) {
	        var cookies$$1 = cookies;

	        // Add xsrf header
	        var xsrfValue = (config.withCredentials || isURLSameOrigin$$1(config.url)) && config.xsrfCookieName ? cookies$$1.read(config.xsrfCookieName) : undefined;

	        if (xsrfValue) {
	          requestHeaders[config.xsrfHeaderName] = xsrfValue;
	        }
	      }

	      // Add headers to the request
	      if ('setRequestHeader' in request) {
	        utils$$1.forEach(requestHeaders, function setRequestHeader(val, key) {
	          if (typeof requestData === 'undefined' && key.toLowerCase() === 'content-type') {
	            // Remove Content-Type if data is undefined
	            delete requestHeaders[key];
	          } else {
	            // Otherwise add header to the request
	            request.setRequestHeader(key, val);
	          }
	        });
	      }

	      // Add withCredentials to request if needed
	      if (config.withCredentials) {
	        request.withCredentials = true;
	      }

	      // Add responseType to request if needed
	      if (config.responseType) {
	        try {
	          request.responseType = config.responseType;
	        } catch (e) {
	          if (request.responseType !== 'json') {
	            throw e;
	          }
	        }
	      }

	      // Handle progress if needed
	      if (typeof config.onDownloadProgress === 'function') {
	        request.addEventListener('progress', config.onDownloadProgress);
	      }

	      // Not all browsers support upload events
	      if (typeof config.onUploadProgress === 'function' && request.upload) {
	        request.upload.addEventListener('progress', config.onUploadProgress);
	      }

	      if (requestData === undefined) {
	        requestData = null;
	      }

	      // Send the request
	      request.send(requestData);
	    });
	  };
	});

	var dispatchRequest = createCommonjsModule(function (module) {
	  'use strict';

	  var utils$$1 = utils;
	  var transformData$$1 = transformData;

	  /**
	   * Dispatch a request to the server using whichever adapter
	   * is supported by the current environment.
	   *
	   * @param {object} config The config that is to be used for the request
	   * @returns {Promise} The Promise to be fulfilled
	   */
	  module.exports = function dispatchRequest(config) {
	    // Ensure headers exist
	    config.headers = config.headers || {};

	    // Transform request data
	    config.data = transformData$$1(config.data, config.headers, config.transformRequest);

	    // Flatten headers
	    config.headers = utils$$1.merge(config.headers.common || {}, config.headers[config.method] || {}, config.headers || {});

	    utils$$1.forEach(['delete', 'get', 'head', 'post', 'put', 'patch', 'common'], function cleanHeaderConfig(method) {
	      delete config.headers[method];
	    });

	    var adapter;

	    if (typeof config.adapter === 'function') {
	      // For custom adapter support
	      adapter = config.adapter;
	    } else if (typeof XMLHttpRequest !== 'undefined') {
	      // For browsers use XHR adapter
	      adapter = xhr;
	    } else if (typeof process !== 'undefined') {
	      // For node use HTTP adapter
	      adapter = xhr;
	    }

	    return _Promise.resolve(config)
	    // Wrap synchronous adapter errors and pass configuration
	    .then(adapter).then(function onFulfilled(response) {
	      // Transform response data
	      response.data = transformData$$1(response.data, response.headers, config.transformResponse);

	      return response;
	    }, function onRejected(error) {
	      // Transform response data
	      if (error && error.response) {
	        error.response.data = transformData$$1(error.response.data, error.response.headers, config.transformResponse);
	      }

	      return _Promise.reject(error);
	    });
	  };
	});

	var isAbsoluteURL = createCommonjsModule(function (module) {
	  'use strict';

	  /**
	   * Determines whether the specified URL is absolute
	   *
	   * @param {string} url The URL to test
	   * @returns {boolean} True if the specified URL is absolute, otherwise false
	   */

	  module.exports = function isAbsoluteURL(url) {
	    // A URL is considered absolute if it begins with "<scheme>://" or "//" (protocol-relative URL).
	    // RFC 3986 defines scheme name as a sequence of characters beginning with a letter and followed
	    // by any combination of letters, digits, plus, period, or hyphen.
	    return (/^([a-z][a-z\d\+\-\.]*:)?\/\//i.test(url)
	    );
	  };
	});

	var combineURLs = createCommonjsModule(function (module) {
	  'use strict';

	  /**
	   * Creates a new URL by combining the specified URLs
	   *
	   * @param {string} baseURL The base URL
	   * @param {string} relativeURL The relative URL
	   * @returns {string} The combined URL
	   */

	  module.exports = function combineURLs(baseURL, relativeURL) {
	    return baseURL.replace(/\/+$/, '') + '/' + relativeURL.replace(/^\/+/, '');
	  };
	});

	var Axios = createCommonjsModule(function (module) {
	  'use strict';

	  var defaults$$1 = defaults;
	  var utils$$1 = utils;
	  var InterceptorManager$$1 = InterceptorManager;
	  var dispatchRequest$$1 = dispatchRequest;
	  var isAbsoluteURL$$1 = isAbsoluteURL;
	  var combineURLs$$1 = combineURLs;

	  /**
	   * Create a new instance of Axios
	   *
	   * @param {Object} defaultConfig The default config for the instance
	   */
	  function Axios(defaultConfig) {
	    this.defaults = utils$$1.merge(defaults$$1, defaultConfig);
	    this.interceptors = {
	      request: new InterceptorManager$$1(),
	      response: new InterceptorManager$$1()
	    };
	  }

	  /**
	   * Dispatch a request
	   *
	   * @param {Object} config The config specific for this request (merged with this.defaults)
	   */
	  Axios.prototype.request = function request(config) {
	    /*eslint no-param-reassign:0*/
	    // Allow for axios('example/url'[, config]) a la fetch API
	    if (typeof config === 'string') {
	      config = utils$$1.merge({
	        url: arguments[0]
	      }, arguments[1]);
	    }

	    config = utils$$1.merge(defaults$$1, this.defaults, { method: 'get' }, config);

	    // Support baseURL config
	    if (config.baseURL && !isAbsoluteURL$$1(config.url)) {
	      config.url = combineURLs$$1(config.baseURL, config.url);
	    }

	    // Hook up interceptors middleware
	    var chain = [dispatchRequest$$1, undefined];
	    var promise = _Promise.resolve(config);

	    this.interceptors.request.forEach(function unshiftRequestInterceptors(interceptor) {
	      chain.unshift(interceptor.fulfilled, interceptor.rejected);
	    });

	    this.interceptors.response.forEach(function pushResponseInterceptors(interceptor) {
	      chain.push(interceptor.fulfilled, interceptor.rejected);
	    });

	    while (chain.length) {
	      promise = promise.then(chain.shift(), chain.shift());
	    }

	    return promise;
	  };

	  // Provide aliases for supported request methods
	  utils$$1.forEach(['delete', 'get', 'head'], function forEachMethodNoData(method) {
	    /*eslint func-names:0*/
	    Axios.prototype[method] = function (url, config) {
	      return this.request(utils$$1.merge(config || {}, {
	        method: method,
	        url: url
	      }));
	    };
	  });

	  utils$$1.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
	    /*eslint func-names:0*/
	    Axios.prototype[method] = function (url, data, config) {
	      return this.request(utils$$1.merge(config || {}, {
	        method: method,
	        url: url,
	        data: data
	      }));
	    };
	  });

	  module.exports = Axios;
	});

	var spread = createCommonjsModule(function (module) {
	  'use strict';

	  /**
	   * Syntactic sugar for invoking a function and expanding an array for arguments.
	   *
	   * Common use case would be to use `Function.prototype.apply`.
	   *
	   *  ```js
	   *  function f(x, y, z) {}
	   *  var args = [1, 2, 3];
	   *  f.apply(null, args);
	   *  ```
	   *
	   * With `spread` this example can be re-written.
	   *
	   *  ```js
	   *  spread(function(x, y, z) {})([1, 2, 3]);
	   *  ```
	   *
	   * @param {Function} callback
	   * @returns {Function}
	   */

	  module.exports = function spread(callback) {
	    return function wrap(arr) {
	      return callback.apply(null, arr);
	    };
	  };
	});

	var axios$1 = createCommonjsModule(function (module) {
	  'use strict';

	  var utils$$1 = utils;
	  var bind$$1 = bind;
	  var Axios$$1 = Axios;

	  /**
	   * Create an instance of Axios
	   *
	   * @param {Object} defaultConfig The default config for the instance
	   * @return {Axios} A new instance of Axios
	   */
	  function createInstance(defaultConfig) {
	    var context = new Axios$$1(defaultConfig);
	    var instance = bind$$1(Axios$$1.prototype.request, context);

	    // Copy axios.prototype to instance
	    utils$$1.extend(instance, Axios$$1.prototype, context);

	    // Copy context to instance
	    utils$$1.extend(instance, context);

	    return instance;
	  }

	  // Create the default instance to be exported
	  var axios = createInstance();

	  // Expose Axios class to allow class inheritance
	  axios.Axios = Axios$$1;

	  // Factory for creating new instances
	  axios.create = function create(defaultConfig) {
	    return createInstance(defaultConfig);
	  };

	  // Expose all/spread
	  axios.all = function all(promises) {
	    return _Promise.all(promises);
	  };
	  axios.spread = spread;

	  module.exports = axios;

	  // Allow use of default import syntax in TypeScript
	  module.exports.default = axios;
	});

	var index$7 = createCommonjsModule(function (module) {
	  module.exports = axios$1;
	});

	var rngBrowser = createCommonjsModule(function (module) {
	var rng;

	var crypto = commonjsGlobal.crypto || commonjsGlobal.msCrypto; // for IE 11
	if (crypto && crypto.getRandomValues) {
	  // WHATWG crypto-based RNG - http://wiki.whatwg.org/wiki/Crypto
	  // Moderately fast, high quality
	  var _rnds8 = new Uint8Array(16);
	  rng = function whatwgRNG() {
	    crypto.getRandomValues(_rnds8);
	    return _rnds8;
	  };
	}

	if (!rng) {
	  // Math.random()-based (RNG)
	  //
	  // If all else fails, use Math.random().  It's fast, but is of unspecified
	  // quality.
	  var  _rnds = new Array(16);
	  rng = function() {
	    for (var i = 0, r; i < 16; i++) {
	      if ((i & 0x03) === 0) r = Math.random() * 0x100000000;
	      _rnds[i] = r >>> ((i & 0x03) << 3) & 0xff;
	    }

	    return _rnds;
	  };
	}

	module.exports = rng;
	});

	var uuid = createCommonjsModule(function (module) {
	//     uuid.js
	//
	//     Copyright (c) 2010-2012 Robert Kieffer
	//     MIT License - http://opensource.org/licenses/mit-license.php

	// Unique ID creation requires a high quality random # generator.  We feature
	// detect to determine the best RNG source, normalizing to a function that
	// returns 128-bits of randomness, since that's what's usually required
	var _rng = rngBrowser;

	// Maps for number <-> hex string conversion
	var _byteToHex = [];
	var _hexToByte = {};
	for (var i = 0; i < 256; i++) {
	  _byteToHex[i] = (i + 0x100).toString(16).substr(1);
	  _hexToByte[_byteToHex[i]] = i;
	}

	// **`parse()` - Parse a UUID into it's component bytes**
	function parse(s, buf, offset) {
	  var i = (buf && offset) || 0, ii = 0;

	  buf = buf || [];
	  s.toLowerCase().replace(/[0-9a-f]{2}/g, function(oct) {
	    if (ii < 16) { // Don't overflow!
	      buf[i + ii++] = _hexToByte[oct];
	    }
	  });

	  // Zero out remaining bytes if string was short
	  while (ii < 16) {
	    buf[i + ii++] = 0;
	  }

	  return buf;
	}

	// **`unparse()` - Convert UUID byte array (ala parse()) into a string**
	function unparse(buf, offset) {
	  var i = offset || 0, bth = _byteToHex;
	  return  bth[buf[i++]] + bth[buf[i++]] +
	          bth[buf[i++]] + bth[buf[i++]] + '-' +
	          bth[buf[i++]] + bth[buf[i++]] + '-' +
	          bth[buf[i++]] + bth[buf[i++]] + '-' +
	          bth[buf[i++]] + bth[buf[i++]] + '-' +
	          bth[buf[i++]] + bth[buf[i++]] +
	          bth[buf[i++]] + bth[buf[i++]] +
	          bth[buf[i++]] + bth[buf[i++]];
	}

	// **`v1()` - Generate time-based UUID**
	//
	// Inspired by https://github.com/LiosK/UUID.js
	// and http://docs.python.org/library/uuid.html

	// random #'s we need to init node and clockseq
	var _seedBytes = _rng();

	// Per 4.5, create and 48-bit node id, (47 random bits + multicast bit = 1)
	var _nodeId = [
	  _seedBytes[0] | 0x01,
	  _seedBytes[1], _seedBytes[2], _seedBytes[3], _seedBytes[4], _seedBytes[5]
	];

	// Per 4.2.2, randomize (14 bit) clockseq
	var _clockseq = (_seedBytes[6] << 8 | _seedBytes[7]) & 0x3fff;

	// Previous uuid creation time
	var _lastMSecs = 0, _lastNSecs = 0;

	// See https://github.com/broofa/node-uuid for API details
	function v1(options, buf, offset) {
	  var i = buf && offset || 0;
	  var b = buf || [];

	  options = options || {};

	  var clockseq = options.clockseq !== undefined ? options.clockseq : _clockseq;

	  // UUID timestamps are 100 nano-second units since the Gregorian epoch,
	  // (1582-10-15 00:00).  JSNumbers aren't precise enough for this, so
	  // time is handled internally as 'msecs' (integer milliseconds) and 'nsecs'
	  // (100-nanoseconds offset from msecs) since unix epoch, 1970-01-01 00:00.
	  var msecs = options.msecs !== undefined ? options.msecs : new Date().getTime();

	  // Per 4.2.1.2, use count of uuid's generated during the current clock
	  // cycle to simulate higher resolution clock
	  var nsecs = options.nsecs !== undefined ? options.nsecs : _lastNSecs + 1;

	  // Time since last uuid creation (in msecs)
	  var dt = (msecs - _lastMSecs) + (nsecs - _lastNSecs)/10000;

	  // Per 4.2.1.2, Bump clockseq on clock regression
	  if (dt < 0 && options.clockseq === undefined) {
	    clockseq = clockseq + 1 & 0x3fff;
	  }

	  // Reset nsecs if clock regresses (new clockseq) or we've moved onto a new
	  // time interval
	  if ((dt < 0 || msecs > _lastMSecs) && options.nsecs === undefined) {
	    nsecs = 0;
	  }

	  // Per 4.2.1.2 Throw error if too many uuids are requested
	  if (nsecs >= 10000) {
	    throw new Error('uuid.v1(): Can\'t create more than 10M uuids/sec');
	  }

	  _lastMSecs = msecs;
	  _lastNSecs = nsecs;
	  _clockseq = clockseq;

	  // Per 4.1.4 - Convert from unix epoch to Gregorian epoch
	  msecs += 12219292800000;

	  // `time_low`
	  var tl = ((msecs & 0xfffffff) * 10000 + nsecs) % 0x100000000;
	  b[i++] = tl >>> 24 & 0xff;
	  b[i++] = tl >>> 16 & 0xff;
	  b[i++] = tl >>> 8 & 0xff;
	  b[i++] = tl & 0xff;

	  // `time_mid`
	  var tmh = (msecs / 0x100000000 * 10000) & 0xfffffff;
	  b[i++] = tmh >>> 8 & 0xff;
	  b[i++] = tmh & 0xff;

	  // `time_high_and_version`
	  b[i++] = tmh >>> 24 & 0xf | 0x10; // include version
	  b[i++] = tmh >>> 16 & 0xff;

	  // `clock_seq_hi_and_reserved` (Per 4.2.2 - include variant)
	  b[i++] = clockseq >>> 8 | 0x80;

	  // `clock_seq_low`
	  b[i++] = clockseq & 0xff;

	  // `node`
	  var node = options.node || _nodeId;
	  for (var n = 0; n < 6; n++) {
	    b[i + n] = node[n];
	  }

	  return buf ? buf : unparse(b);
	}

	// **`v4()` - Generate random UUID**

	// See https://github.com/broofa/node-uuid for API details
	function v4(options, buf, offset) {
	  // Deprecated - 'format' argument, as supported in v1.2
	  var i = buf && offset || 0;

	  if (typeof(options) == 'string') {
	    buf = options == 'binary' ? new Array(16) : null;
	    options = null;
	  }
	  options = options || {};

	  var rnds = options.random || (options.rng || _rng)();

	  // Per 4.4, set bits for version and `clock_seq_hi_and_reserved`
	  rnds[6] = (rnds[6] & 0x0f) | 0x40;
	  rnds[8] = (rnds[8] & 0x3f) | 0x80;

	  // Copy bytes to buffer, if provided
	  if (buf) {
	    for (var ii = 0; ii < 16; ii++) {
	      buf[i + ii] = rnds[ii];
	    }
	  }

	  return buf || unparse(rnds);
	}

	// Export public API
	var uuid = v4;
	uuid.v1 = v1;
	uuid.v4 = v4;
	uuid.parse = parse;
	uuid.unparse = unparse;

	module.exports = uuid;
	});

	var es6_object_getOwnPropertyDescriptor = createCommonjsModule(function (module) {
	// 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
	var toIObject                 = _toIobject
	  , $getOwnPropertyDescriptor = _objectGopd.f;

	_objectSap('getOwnPropertyDescriptor', function(){
	  return function getOwnPropertyDescriptor(it, key){
	    return $getOwnPropertyDescriptor(toIObject(it), key);
	  };
	});
	});

	var getOwnPropertyDescriptor$2 = createCommonjsModule(function (module) {
	var $Object = _core.Object;
	module.exports = function getOwnPropertyDescriptor$2(it, key){
	  return $Object.getOwnPropertyDescriptor(it, key);
	};
	});

	var getOwnPropertyDescriptor$1 = createCommonjsModule(function (module) {
	module.exports = { "default": getOwnPropertyDescriptor$2, __esModule: true };
	});

	var _Object$getOwnPropertyDescriptor = unwrapExports(getOwnPropertyDescriptor$1);

	var stateMachine = createCommonjsModule(function (module, exports) {
	/*

	  Javascript State Machine Library - https://github.com/jakesgordon/javascript-state-machine

	  Copyright (c) 2012, 2013, 2014, 2015, Jake Gordon and contributors
	  Released under the MIT license - https://github.com/jakesgordon/javascript-state-machine/blob/master/LICENSE

	*/

	(function () {

	  var StateMachine = {

	    //---------------------------------------------------------------------------

	    VERSION: "2.3.5",

	    //---------------------------------------------------------------------------

	    Result: {
	      SUCCEEDED:    1, // the event transitioned successfully from one state to another
	      NOTRANSITION: 2, // the event was successfull but no state transition was necessary
	      CANCELLED:    3, // the event was cancelled by the caller in a beforeEvent callback
	      PENDING:      4  // the event is asynchronous and the caller is in control of when the transition occurs
	    },

	    Error: {
	      INVALID_TRANSITION: 100, // caller tried to fire an event that was innapropriate in the current state
	      PENDING_TRANSITION: 200, // caller tried to fire an event while an async transition was still pending
	      INVALID_CALLBACK:   300 // caller provided callback function threw an exception
	    },

	    WILDCARD: '*',
	    ASYNC: 'async',

	    //---------------------------------------------------------------------------

	    create: function(cfg, target) {

	      var initial      = (typeof cfg.initial == 'string') ? { state: cfg.initial } : cfg.initial; // allow for a simple string, or an object with { state: 'foo', event: 'setup', defer: true|false }
	      var terminal     = cfg.terminal || cfg['final'];
	      var fsm          = target || cfg.target  || {};
	      var events       = cfg.events || [];
	      var callbacks    = cfg.callbacks || {};
	      var map          = {}; // track state transitions allowed for an event { event: { from: [ to ] } }
	      var transitions  = {}; // track events allowed from a state            { state: [ event ] }

	      var add = function(e) {
	        var from = (e.from instanceof Array) ? e.from : (e.from ? [e.from] : [StateMachine.WILDCARD]); // allow 'wildcard' transition if 'from' is not specified
	        map[e.name] = map[e.name] || {};
	        for (var n = 0 ; n < from.length ; n++) {
	          transitions[from[n]] = transitions[from[n]] || [];
	          transitions[from[n]].push(e.name);

	          map[e.name][from[n]] = e.to || from[n]; // allow no-op transition if 'to' is not specified
	        }
	      };

	      if (initial) {
	        initial.event = initial.event || 'startup';
	        add({ name: initial.event, from: 'none', to: initial.state });
	      }

	      for(var n = 0 ; n < events.length ; n++)
	        add(events[n]);

	      for(var name in map) {
	        if (map.hasOwnProperty(name))
	          fsm[name] = StateMachine.buildEvent(name, map[name]);
	      }

	      for(var name in callbacks) {
	        if (callbacks.hasOwnProperty(name))
	          fsm[name] = callbacks[name]
	      }

	      fsm.current     = 'none';
	      fsm.is          = function(state) { return (state instanceof Array) ? (state.indexOf(this.current) >= 0) : (this.current === state); };
	      fsm.can         = function(event) { return !this.transition && (map[event].hasOwnProperty(this.current) || map[event].hasOwnProperty(StateMachine.WILDCARD)); }
	      fsm.cannot      = function(event) { return !this.can(event); };
	      fsm.transitions = function()      { return transitions[this.current]; };
	      fsm.isFinished  = function()      { return this.is(terminal); };
	      fsm.error       = cfg.error || function(name, from, to, args, error, msg, e) { throw e || msg; }; // default behavior when something unexpected happens is to throw an exception, but caller can override this behavior if desired (see github issue #3 and #17)

	      if (initial && !initial.defer)
	        fsm[initial.event]();

	      return fsm;

	    },

	    //===========================================================================

	    doCallback: function(fsm, func, name, from, to, args) {
	      if (func) {
	        try {
	          return func.apply(fsm, [name, from, to].concat(args));
	        }
	        catch(e) {
	          return fsm.error(name, from, to, args, StateMachine.Error.INVALID_CALLBACK, "an exception occurred in a caller-provided callback function", e);
	        }
	      }
	    },

	    beforeAnyEvent:  function(fsm, name, from, to, args) { return StateMachine.doCallback(fsm, fsm['onbeforeevent'],                       name, from, to, args); },
	    afterAnyEvent:   function(fsm, name, from, to, args) { return StateMachine.doCallback(fsm, fsm['onafterevent'] || fsm['onevent'],      name, from, to, args); },
	    leaveAnyState:   function(fsm, name, from, to, args) { return StateMachine.doCallback(fsm, fsm['onleavestate'],                        name, from, to, args); },
	    enterAnyState:   function(fsm, name, from, to, args) { return StateMachine.doCallback(fsm, fsm['onenterstate'] || fsm['onstate'],      name, from, to, args); },
	    changeState:     function(fsm, name, from, to, args) { return StateMachine.doCallback(fsm, fsm['onchangestate'],                       name, from, to, args); },

	    beforeThisEvent: function(fsm, name, from, to, args) { return StateMachine.doCallback(fsm, fsm['onbefore' + name],                     name, from, to, args); },
	    afterThisEvent:  function(fsm, name, from, to, args) { return StateMachine.doCallback(fsm, fsm['onafter'  + name] || fsm['on' + name], name, from, to, args); },
	    leaveThisState:  function(fsm, name, from, to, args) { return StateMachine.doCallback(fsm, fsm['onleave'  + from],                     name, from, to, args); },
	    enterThisState:  function(fsm, name, from, to, args) { return StateMachine.doCallback(fsm, fsm['onenter'  + to]   || fsm['on' + to],   name, from, to, args); },

	    beforeEvent: function(fsm, name, from, to, args) {
	      if ((false === StateMachine.beforeThisEvent(fsm, name, from, to, args)) ||
	          (false === StateMachine.beforeAnyEvent( fsm, name, from, to, args)))
	        return false;
	    },

	    afterEvent: function(fsm, name, from, to, args) {
	      StateMachine.afterThisEvent(fsm, name, from, to, args);
	      StateMachine.afterAnyEvent( fsm, name, from, to, args);
	    },

	    leaveState: function(fsm, name, from, to, args) {
	      var specific = StateMachine.leaveThisState(fsm, name, from, to, args),
	          general  = StateMachine.leaveAnyState( fsm, name, from, to, args);
	      if ((false === specific) || (false === general))
	        return false;
	      else if ((StateMachine.ASYNC === specific) || (StateMachine.ASYNC === general))
	        return StateMachine.ASYNC;
	    },

	    enterState: function(fsm, name, from, to, args) {
	      StateMachine.enterThisState(fsm, name, from, to, args);
	      StateMachine.enterAnyState( fsm, name, from, to, args);
	    },

	    //===========================================================================

	    buildEvent: function(name, map) {
	      return function() {

	        var from  = this.current;
	        var to    = map[from] || map[StateMachine.WILDCARD] || from;
	        var args  = Array.prototype.slice.call(arguments); // turn arguments into pure array

	        if (this.transition)
	          return this.error(name, from, to, args, StateMachine.Error.PENDING_TRANSITION, "event " + name + " inappropriate because previous transition did not complete");

	        if (this.cannot(name))
	          return this.error(name, from, to, args, StateMachine.Error.INVALID_TRANSITION, "event " + name + " inappropriate in current state " + this.current);

	        if (false === StateMachine.beforeEvent(this, name, from, to, args))
	          return StateMachine.Result.CANCELLED;

	        if (from === to) {
	          StateMachine.afterEvent(this, name, from, to, args);
	          return StateMachine.Result.NOTRANSITION;
	        }

	        // prepare a transition method for use EITHER lower down, or by caller if they want an async transition (indicated by an ASYNC return value from leaveState)
	        var fsm = this;
	        this.transition = function() {
	          fsm.transition = null; // this method should only ever be called once
	          fsm.current = to;
	          StateMachine.enterState( fsm, name, from, to, args);
	          StateMachine.changeState(fsm, name, from, to, args);
	          StateMachine.afterEvent( fsm, name, from, to, args);
	          return StateMachine.Result.SUCCEEDED;
	        };
	        this.transition.cancel = function() { // provide a way for caller to cancel async transition if desired (issue #22)
	          fsm.transition = null;
	          StateMachine.afterEvent(fsm, name, from, to, args);
	        }

	        var leave = StateMachine.leaveState(this, name, from, to, args);
	        if (false === leave) {
	          this.transition = null;
	          return StateMachine.Result.CANCELLED;
	        }
	        else if (StateMachine.ASYNC === leave) {
	          return StateMachine.Result.PENDING;
	        }
	        else {
	          if (this.transition) // need to check in case user manually called transition() but forgot to return StateMachine.ASYNC
	            return this.transition();
	        }

	      };
	    }

	  }; // StateMachine

	  //===========================================================================

	  //======
	  // NODE
	  //======
	  if (typeof exports !== 'undefined') {
	    if (typeof module !== 'undefined' && module.exports) {
	      exports = module.exports = StateMachine;
	    }
	    exports.StateMachine = StateMachine;
	  }
	  //============
	  // AMD/REQUIRE
	  //============
	  else if (typeof define === 'function' && define.amd) {
	    define(function(require) { return StateMachine; });
	  }
	  //========
	  // BROWSER
	  //========
	  else if (typeof window !== 'undefined') {
	    window.StateMachine = StateMachine;
	  }
	  //===========
	  // WEB WORKER
	  //===========
	  else if (typeof self !== 'undefined') {
	    self.StateMachine = StateMachine;
	  }

	}());
	});

	var WebSocket = global.WebSocket || global.MozWebSocket;

	var _class;

	function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
	  var desc = {};
	  Object['ke' + 'ys'](descriptor).forEach(function (key) {
	    desc[key] = descriptor[key];
	  });
	  desc.enumerable = !!desc.enumerable;
	  desc.configurable = !!desc.configurable;

	  if ('value' in desc || desc.initializer) {
	    desc.writable = true;
	  }

	  desc = decorators.slice().reverse().reduce(function (desc, decorator) {
	    return decorator(target, property, desc) || desc;
	  }, desc);

	  if (context && desc.initializer !== void 0) {
	    desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
	    desc.initializer = undefined;
	  }

	  if (desc.initializer === void 0) {
	    Object['define' + 'Property'](target, property, desc);
	    desc = null;
	  }

	  return desc;
	}

	// WebSocket with auto reconnecting feature, backup endpoint and EventEmitter interface.

	var debug$7 = browser$1('LC:WebSocketPlus');

	var HEARTBEAT_TIME = 60000;
	var TIMEOUT_TIME = 180000;

	var DEFAULT_RETRY_STRATEGY = function DEFAULT_RETRY_STRATEGY(attempt) {
	  return Math.min(1000 * Math.pow(2, attempt), 300000);
	};

	var requireConnected = function requireConnected(target, name, descriptor) {
	  return _Object$assign({}, descriptor, {
	    value: function requireConnectedWrapper() {
	      var _descriptor$value;

	      if (!this.is('connected')) {
	        var currentState = this.current;
	        console.warn(name + ' should not be called when the connection is ' + currentState);
	        if (this.is('offline') || this.is('reconnecting')) {
	          console.warn('disconnect and reconnect event should be handled to avoid such calls.');
	        }
	        throw new Error('Connection unavailable');
	      }

	      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	        args[_key] = arguments[_key];
	      }

	      return (_descriptor$value = descriptor.value).call.apply(_descriptor$value, [this].concat(args));
	    }
	  });
	};

	var WebSocketPlus = (_class = function (_EventEmitter) {
	  _inherits(WebSocketPlus, _EventEmitter);

	  function WebSocketPlus(getUrls, protocol) {
	    _classCallCheck(this, WebSocketPlus);

	    debug$7('initializing WebSocketPlus');
	    if (typeof WebSocket === 'undefined') {
	      throw new Error('WebSocket is undefined. Polyfill is required in this runtime.');
	    }

	    var _this = _possibleConstructorReturn(this, _EventEmitter.call(this));

	    if (typeof getUrls !== 'function') {
	      _this._getUrls = function () {
	        return _Promise.resolve(getUrls);
	      };
	    } else {
	      _this._getUrls = getUrls;
	    }
	    _this._protocol = protocol;
	    _this.init();
	    _this._createWs(_this._getUrls, _this._protocol).then(function () {
	      return _this.open();
	    }, function (error) {
	      return _this.throw(error);
	    }).catch(_this.throw.bind(_this));
	    _this.__postponeTimers = _this._postponeTimers.bind(_this);
	    return _this;
	  }

	  WebSocketPlus.prototype._createWs = function _createWs(getUrls, protocol) {
	    var _this2 = this;

	    return getUrls().then(function (wsUrls) {
	      var urls = wsUrls;
	      if (!(urls instanceof Array)) {
	        urls = [urls];
	      }
	      return tryAll(urls.map(function (url) {
	        return function (resolve, reject) {
	          debug$7('connect [' + url + '] ' + protocol);
	          var ws = protocol ? new WebSocket(url, protocol) : new WebSocket(url);
	          ws.binaryType = _this2.binaryType || 'arraybuffer';
	          ws.onopen = function () {
	            return resolve(ws);
	          };
	          ws.onerror = ws.onclose = function (error) {
	            if (error instanceof Error) {
	              return reject(error);
	            }
	            // in browser, error event is useless
	            return reject(new Error('Failed to connect [' + url + ']'));
	          };
	        };
	      })).then(function (ws) {
	        _this2._ws = ws;
	        _this2._ws.onclose = _this2._handleClose.bind(_this2);
	        _this2._ws.onmessage = _this2._handleMessage.bind(_this2);
	        return ws;
	      });
	    });
	  };

	  WebSocketPlus.prototype._destroyWs = function _destroyWs() {
	    var ws = this._ws;
	    if (!ws) return;
	    ws.onopen = ws.onclose = ws.onerror = ws.onmessage = null;
	    this._ws = null;
	    ws.close();
	  };

	  WebSocketPlus.prototype.onopen = function onopen() {
	    debug$7('open');
	    this.emit('open');
	  };

	  WebSocketPlus.prototype.onconnected = function onconnected() {
	    this._startConnectionKeeper();
	  };

	  WebSocketPlus.prototype.onleaveconnected = function onleaveconnected() {
	    this._stopConnectionKeeper();
	  };

	  WebSocketPlus.prototype.onbeforedisconnect = function onbeforedisconnect() {
	    debug$7('disconnect');
	    this.emit('disconnect');
	  };

	  WebSocketPlus.prototype.ondisconnect = function ondisconnect() {
	    this._destroyWs();
	  };

	  WebSocketPlus.prototype.onreconnect = function onreconnect() {
	    debug$7('reconnect');
	    this.emit('reconnect');
	  };

	  WebSocketPlus.prototype.onoffline = function onoffline(event, from, to) {
	    var _this3 = this;

	    var attempt = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0;

	    var delay = DEFAULT_RETRY_STRATEGY.call(null, attempt);
	    debug$7('schedule attempt=' + attempt + ' delay=' + delay);
	    this.emit('schedule', attempt, delay);
	    if (this.__scheduledRetry) {
	      clearTimeout(this.__scheduledRetry);
	    }
	    this.__scheduledRetry = setTimeout(function () {
	      if (_this3.is('offline')) {
	        _this3.retry(attempt);
	      }
	    }, delay);
	  };

	  WebSocketPlus.prototype.onretry = function onretry(event, from, to) {
	    var _this4 = this;

	    var attempt = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0;

	    debug$7('retry attempt=' + attempt);
	    this.emit('retry', attempt);
	    this._createWs(this._getUrls, this._protocol).then(function () {
	      return _this4.reconnect();
	    }, function () {
	      return _this4.fail(attempt + 1);
	    });
	  };

	  WebSocketPlus.prototype.onclose = function onclose() {
	    debug$7('close');
	    if (this._ws) {
	      this._ws.close();
	    }
	  };

	  WebSocketPlus.prototype.onerror = function onerror(event, from, to, error) {
	    debug$7('error', error);
	    this.emit('error', error);
	  };

	  // jsdoc-ignore-start


	  // jsdoc-ignore-end
	  WebSocketPlus.prototype._ping = function _ping() {
	    debug$7('ping');
	    try {
	      this.ping();
	    } catch (error) {
	      console.warn('websocket ping error: ' + error.message);
	    }
	  };

	  WebSocketPlus.prototype.ping = function ping() {
	    if (this._ws.ping) {
	      this._ws.ping();
	    } else {
	      console.warn('The WebSocket implement does not support sending ping frame.\n        Override ping method to use application defined ping/pong mechanism.');
	    }
	  };

	  WebSocketPlus.prototype._postponeTimers = function _postponeTimers() {
	    var _this5 = this;

	    debug$7('_postponeTimers');
	    this._clearTimers();
	    this._heartbeatTimer = setInterval(this._ping.bind(this), HEARTBEAT_TIME);
	    this._timeoutTimer = setTimeout(function () {
	      debug$7('timeout');
	      _this5.disconnect();
	    }, TIMEOUT_TIME);
	  };

	  WebSocketPlus.prototype._clearTimers = function _clearTimers() {
	    if (this._heartbeatTimer) {
	      clearInterval(this._heartbeatTimer);
	    }
	    if (this._timeoutTimer) {
	      clearTimeout(this._timeoutTimer);
	    }
	  };

	  WebSocketPlus.prototype._startConnectionKeeper = function _startConnectionKeeper() {
	    debug$7('start connection keeper');
	    var addListener = this._ws.addListener || this._ws.addEventListener;
	    addListener.call(this._ws, 'message', this.__postponeTimers);
	    this._postponeTimers();
	  };

	  WebSocketPlus.prototype._stopConnectionKeeper = function _stopConnectionKeeper() {
	    debug$7('stop connection keeper');
	    // websockets/ws#489
	    var removeListener = this._ws.removeListener || this._ws.removeEventListener;
	    removeListener.call(this._ws, 'message', this.__postponeTimers);
	    this._clearTimers();
	  };

	  WebSocketPlus.prototype._handleClose = function _handleClose(event) {
	    debug$7('ws closed [' + event.code + '] ' + event.reason);
	    // socket closed manually, ignore close event.
	    if (this.isFinished()) return;
	    this.handleClose(event);
	  };

	  WebSocketPlus.prototype.handleClose = function handleClose() {
	    // reconnect
	    this.disconnect();
	  };

	  // jsdoc-ignore-start


	  // jsdoc-ignore-end
	  WebSocketPlus.prototype.send = function send(data) {
	    debug$7('send', data);
	    this._ws.send(data);
	  };

	  WebSocketPlus.prototype._handleMessage = function _handleMessage(event) {
	    debug$7('message', event.data);
	    this.handleMessage(event.data);
	  };

	  WebSocketPlus.prototype.handleMessage = function handleMessage(message) {
	    this.emit('message', message);
	  };

	  return WebSocketPlus;
	}(index$6), (_applyDecoratedDescriptor(_class.prototype, '_ping', [requireConnected], _Object$getOwnPropertyDescriptor(_class.prototype, '_ping'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'send', [requireConnected], _Object$getOwnPropertyDescriptor(_class.prototype, 'send'), _class.prototype)), _class);


	stateMachine.create({
	  target: WebSocketPlus.prototype,
	  initial: {
	    state: 'initialized',
	    event: 'init',
	    defer: true
	  },
	  terminal: 'closed',
	  events: [{
	    name: 'open',
	    from: 'initialized',
	    to: 'connected'
	  }, {
	    name: 'disconnect',
	    from: 'connected',
	    to: 'offline'
	  }, {
	    name: 'retry',
	    from: 'offline',
	    to: 'reconnecting'
	  }, {
	    name: 'fail',
	    from: 'reconnecting',
	    to: 'offline'
	  }, {
	    name: 'reconnect',
	    from: 'reconnecting',
	    to: 'connected'
	  }, {
	    name: 'close',
	    from: ['connected', 'offline', 'reconnecting'],
	    to: 'closed'
	  }, {
	    name: 'throw',
	    from: '*',
	    to: 'error'
	  }]
	});

	var error$1 = {
	  1000: {
	    name: 'CLOSE_NORMAL'
	  },
	  1006: {
	    name: 'CLOSE_ABNORMAL'
	  },
	  4100: {
	    name: 'APP_NOT_AVAILABLE',
	    message: 'App not exists or realtime message service is disabled.'
	  },
	  4103: {
	    name: 'INVALID_LOGIN',
	    message: 'Malformed clientId.'
	  },
	  4105: {
	    name: 'SESSION_REQUIRED',
	    message: 'Message sent before session opened. '
	  },
	  4107: {
	    name: 'READ_TIMEOUT'
	  },
	  4108: {
	    name: 'LOGIN_TIMEOUT'
	  },
	  4109: {
	    name: 'FRAME_TOO_LONG'
	  },
	  4110: {
	    name: 'INVALID_ORIGIN',
	    message: 'Access denied by domain whitelist.'
	  },
	  4111: {
	    name: 'SESSION_CONFLICT'
	  },
	  4112: {
	    name: 'SESSION_TOKEN_EXPIRED'
	  },
	  4200: {
	    name: 'INTERNAL_ERROR',
	    message: 'Internal error, please contact LeanCloud for support.'
	  },
	  4201: {
	    name: 'SEND_MESSAGE_TIMEOUT'
	  },
	  4302: {
	    name: 'CONVERSATION_SIGNATURE_FAILED'
	  },
	  4303: {
	    name: 'CONVERSATION_NOT_FOUND'
	  },
	  4304: {
	    name: 'CONVERSATION_FULL'
	  },
	  4305: {
	    name: 'CONVERSATION_REJECTED_BY_APP'
	  },
	  4306: {
	    name: 'CONVERSATION_UPDATE_FAILED'
	  },
	  4307: {
	    name: 'CONVERSATION_READ_ONLY'
	  },
	  4308: {
	    name: 'CONVERSATION_NOT_ALLOWED'
	  },
	  4401: {
	    name: 'INVALID_MESSAGING_TARGET'
	  },
	  4402: {
	    name: 'MESSAGE_REJECTED_BY_APP'
	  }
	};

	var ErrorCode = _Object$keys(error$1).reduce(function (result, code) {
	  return _Object$assign(result, _defineProperty({}, error$1[code].name, Number(code)));
	}, {});

	var createError$2 = function createError$2(errorMessage) {
	  var code = errorMessage.code;
	  var reason = errorMessage.reason;
	  var appCode = errorMessage.appCode;
	  var detail = errorMessage.detail;

	  var message = reason || detail;
	  if (!message && error$1[code]) {
	    message = error$1[code].message || error$1[code].name;
	  }
	  if (!message) {
	    message = 'Unknow Error: ' + code;
	  }
	  var err = new Error(message);
	  return _Object$assign(err, {
	    code: code, appCode: appCode, detail: detail
	  });
	};

	var long = createCommonjsModule(function (module) {
	/*
	 Copyright 2013 Daniel Wirtz <dcode@dcode.io>
	 Copyright 2009 The Closure Library Authors. All Rights Reserved.

	 Licensed under the Apache License, Version 2.0 (the "License");
	 you may not use this file except in compliance with the License.
	 You may obtain a copy of the License at

	 http://www.apache.org/licenses/LICENSE-2.0

	 Unless required by applicable law or agreed to in writing, software
	 distributed under the License is distributed on an "AS-IS" BASIS,
	 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	 See the License for the specific language governing permissions and
	 limitations under the License.
	 */

	/**
	 * @license long.js (c) 2013 Daniel Wirtz <dcode@dcode.io>
	 * Released under the Apache License, Version 2.0
	 * see: https://github.com/dcodeIO/long.js for details
	 */
	(function(global, factory) {

	    /* AMD */ if (typeof define === 'function' && define["amd"])
	        define([], factory);
	    /* CommonJS */ else if ('function' === 'function' && typeof module === "object" && module && module["exports"])
	        module["exports"] = factory();
	    /* Global */ else
	        (global["dcodeIO"] = global["dcodeIO"] || {})["Long"] = factory();

	})(commonjsGlobal, function() {
	    "use strict";

	    /**
	     * Constructs a 64 bit two's-complement integer, given its low and high 32 bit values as *signed* integers.
	     *  See the from* functions below for more convenient ways of constructing Longs.
	     * @exports Long
	     * @class A Long class for representing a 64 bit two's-complement integer value.
	     * @param {number} low The low (signed) 32 bits of the long
	     * @param {number} high The high (signed) 32 bits of the long
	     * @param {boolean=} unsigned Whether unsigned or not, defaults to `false` for signed
	     * @constructor
	     */
	    function Long(low, high, unsigned) {

	        /**
	         * The low 32 bits as a signed value.
	         * @type {number}
	         */
	        this.low = low | 0;

	        /**
	         * The high 32 bits as a signed value.
	         * @type {number}
	         */
	        this.high = high | 0;

	        /**
	         * Whether unsigned or not.
	         * @type {boolean}
	         */
	        this.unsigned = !!unsigned;
	    }

	    // The internal representation of a long is the two given signed, 32-bit values.
	    // We use 32-bit pieces because these are the size of integers on which
	    // Javascript performs bit-operations.  For operations like addition and
	    // multiplication, we split each number into 16 bit pieces, which can easily be
	    // multiplied within Javascript's floating-point representation without overflow
	    // or change in sign.
	    //
	    // In the algorithms below, we frequently reduce the negative case to the
	    // positive case by negating the input(s) and then post-processing the result.
	    // Note that we must ALWAYS check specially whether those values are MIN_VALUE
	    // (-2^63) because -MIN_VALUE == MIN_VALUE (since 2^63 cannot be represented as
	    // a positive number, it overflows back into a negative).  Not handling this
	    // case would often result in infinite recursion.
	    //
	    // Common constant values ZERO, ONE, NEG_ONE, etc. are defined below the from*
	    // methods on which they depend.

	    /**
	     * An indicator used to reliably determine if an object is a Long or not.
	     * @type {boolean}
	     * @const
	     * @private
	     */
	    Long.prototype.__isLong__;

	    Object.defineProperty(Long.prototype, "__isLong__", {
	        value: true,
	        enumerable: false,
	        configurable: false
	    });

	    /**
	     * @function
	     * @param {*} obj Object
	     * @returns {boolean}
	     * @inner
	     */
	    function isLong(obj) {
	        return (obj && obj["__isLong__"]) === true;
	    }

	    /**
	     * Tests if the specified object is a Long.
	     * @function
	     * @param {*} obj Object
	     * @returns {boolean}
	     */
	    Long.isLong = isLong;

	    /**
	     * A cache of the Long representations of small integer values.
	     * @type {!Object}
	     * @inner
	     */
	    var INT_CACHE = {};

	    /**
	     * A cache of the Long representations of small unsigned integer values.
	     * @type {!Object}
	     * @inner
	     */
	    var UINT_CACHE = {};

	    /**
	     * @param {number} value
	     * @param {boolean=} unsigned
	     * @returns {!Long}
	     * @inner
	     */
	    function fromInt(value, unsigned) {
	        var obj, cachedObj, cache;
	        if (unsigned) {
	            value >>>= 0;
	            if (cache = (0 <= value && value < 256)) {
	                cachedObj = UINT_CACHE[value];
	                if (cachedObj)
	                    return cachedObj;
	            }
	            obj = fromBits(value, (value | 0) < 0 ? -1 : 0, true);
	            if (cache)
	                UINT_CACHE[value] = obj;
	            return obj;
	        } else {
	            value |= 0;
	            if (cache = (-128 <= value && value < 128)) {
	                cachedObj = INT_CACHE[value];
	                if (cachedObj)
	                    return cachedObj;
	            }
	            obj = fromBits(value, value < 0 ? -1 : 0, false);
	            if (cache)
	                INT_CACHE[value] = obj;
	            return obj;
	        }
	    }

	    /**
	     * Returns a Long representing the given 32 bit integer value.
	     * @function
	     * @param {number} value The 32 bit integer in question
	     * @param {boolean=} unsigned Whether unsigned or not, defaults to `false` for signed
	     * @returns {!Long} The corresponding Long value
	     */
	    Long.fromInt = fromInt;

	    /**
	     * @param {number} value
	     * @param {boolean=} unsigned
	     * @returns {!Long}
	     * @inner
	     */
	    function fromNumber(value, unsigned) {
	        if (isNaN(value) || !isFinite(value))
	            return unsigned ? UZERO : ZERO;
	        if (unsigned) {
	            if (value < 0)
	                return UZERO;
	            if (value >= TWO_PWR_64_DBL)
	                return MAX_UNSIGNED_VALUE;
	        } else {
	            if (value <= -TWO_PWR_63_DBL)
	                return MIN_VALUE;
	            if (value + 1 >= TWO_PWR_63_DBL)
	                return MAX_VALUE;
	        }
	        if (value < 0)
	            return fromNumber(-value, unsigned).neg();
	        return fromBits((value % TWO_PWR_32_DBL) | 0, (value / TWO_PWR_32_DBL) | 0, unsigned);
	    }

	    /**
	     * Returns a Long representing the given value, provided that it is a finite number. Otherwise, zero is returned.
	     * @function
	     * @param {number} value The number in question
	     * @param {boolean=} unsigned Whether unsigned or not, defaults to `false` for signed
	     * @returns {!Long} The corresponding Long value
	     */
	    Long.fromNumber = fromNumber;

	    /**
	     * @param {number} lowBits
	     * @param {number} highBits
	     * @param {boolean=} unsigned
	     * @returns {!Long}
	     * @inner
	     */
	    function fromBits(lowBits, highBits, unsigned) {
	        return new Long(lowBits, highBits, unsigned);
	    }

	    /**
	     * Returns a Long representing the 64 bit integer that comes by concatenating the given low and high bits. Each is
	     *  assumed to use 32 bits.
	     * @function
	     * @param {number} lowBits The low 32 bits
	     * @param {number} highBits The high 32 bits
	     * @param {boolean=} unsigned Whether unsigned or not, defaults to `false` for signed
	     * @returns {!Long} The corresponding Long value
	     */
	    Long.fromBits = fromBits;

	    /**
	     * @function
	     * @param {number} base
	     * @param {number} exponent
	     * @returns {number}
	     * @inner
	     */
	    var pow_dbl = Math.pow; // Used 4 times (4*8 to 15+4)

	    /**
	     * @param {string} str
	     * @param {(boolean|number)=} unsigned
	     * @param {number=} radix
	     * @returns {!Long}
	     * @inner
	     */
	    function fromString(str, unsigned, radix) {
	        if (str.length === 0)
	            throw Error('empty string');
	        if (str === "NaN" || str === "Infinity" || str === "+Infinity" || str === "-Infinity")
	            return ZERO;
	        if (typeof unsigned === 'number') {
	            // For goog.math.long compatibility
	            radix = unsigned,
	            unsigned = false;
	        } else {
	            unsigned = !! unsigned;
	        }
	        radix = radix || 10;
	        if (radix < 2 || 36 < radix)
	            throw RangeError('radix');

	        var p;
	        if ((p = str.indexOf('-')) > 0)
	            throw Error('interior hyphen');
	        else if (p === 0) {
	            return fromString(str.substring(1), unsigned, radix).neg();
	        }

	        // Do several (8) digits each time through the loop, so as to
	        // minimize the calls to the very expensive emulated div.
	        var radixToPower = fromNumber(pow_dbl(radix, 8));

	        var result = ZERO;
	        for (var i = 0; i < str.length; i += 8) {
	            var size = Math.min(8, str.length - i),
	                value = parseInt(str.substring(i, i + size), radix);
	            if (size < 8) {
	                var power = fromNumber(pow_dbl(radix, size));
	                result = result.mul(power).add(fromNumber(value));
	            } else {
	                result = result.mul(radixToPower);
	                result = result.add(fromNumber(value));
	            }
	        }
	        result.unsigned = unsigned;
	        return result;
	    }

	    /**
	     * Returns a Long representation of the given string, written using the specified radix.
	     * @function
	     * @param {string} str The textual representation of the Long
	     * @param {(boolean|number)=} unsigned Whether unsigned or not, defaults to `false` for signed
	     * @param {number=} radix The radix in which the text is written (2-36), defaults to 10
	     * @returns {!Long} The corresponding Long value
	     */
	    Long.fromString = fromString;

	    /**
	     * @function
	     * @param {!Long|number|string|!{low: number, high: number, unsigned: boolean}} val
	     * @returns {!Long}
	     * @inner
	     */
	    function fromValue(val) {
	        if (val /* is compatible */ instanceof Long)
	            return val;
	        if (typeof val === 'number')
	            return fromNumber(val);
	        if (typeof val === 'string')
	            return fromString(val);
	        // Throws for non-objects, converts non-instanceof Long:
	        return fromBits(val.low, val.high, val.unsigned);
	    }

	    /**
	     * Converts the specified value to a Long.
	     * @function
	     * @param {!Long|number|string|!{low: number, high: number, unsigned: boolean}} val Value
	     * @returns {!Long}
	     */
	    Long.fromValue = fromValue;

	    // NOTE: the compiler should inline these constant values below and then remove these variables, so there should be
	    // no runtime penalty for these.

	    /**
	     * @type {number}
	     * @const
	     * @inner
	     */
	    var TWO_PWR_16_DBL = 1 << 16;

	    /**
	     * @type {number}
	     * @const
	     * @inner
	     */
	    var TWO_PWR_24_DBL = 1 << 24;

	    /**
	     * @type {number}
	     * @const
	     * @inner
	     */
	    var TWO_PWR_32_DBL = TWO_PWR_16_DBL * TWO_PWR_16_DBL;

	    /**
	     * @type {number}
	     * @const
	     * @inner
	     */
	    var TWO_PWR_64_DBL = TWO_PWR_32_DBL * TWO_PWR_32_DBL;

	    /**
	     * @type {number}
	     * @const
	     * @inner
	     */
	    var TWO_PWR_63_DBL = TWO_PWR_64_DBL / 2;

	    /**
	     * @type {!Long}
	     * @const
	     * @inner
	     */
	    var TWO_PWR_24 = fromInt(TWO_PWR_24_DBL);

	    /**
	     * @type {!Long}
	     * @inner
	     */
	    var ZERO = fromInt(0);

	    /**
	     * Signed zero.
	     * @type {!Long}
	     */
	    Long.ZERO = ZERO;

	    /**
	     * @type {!Long}
	     * @inner
	     */
	    var UZERO = fromInt(0, true);

	    /**
	     * Unsigned zero.
	     * @type {!Long}
	     */
	    Long.UZERO = UZERO;

	    /**
	     * @type {!Long}
	     * @inner
	     */
	    var ONE = fromInt(1);

	    /**
	     * Signed one.
	     * @type {!Long}
	     */
	    Long.ONE = ONE;

	    /**
	     * @type {!Long}
	     * @inner
	     */
	    var UONE = fromInt(1, true);

	    /**
	     * Unsigned one.
	     * @type {!Long}
	     */
	    Long.UONE = UONE;

	    /**
	     * @type {!Long}
	     * @inner
	     */
	    var NEG_ONE = fromInt(-1);

	    /**
	     * Signed negative one.
	     * @type {!Long}
	     */
	    Long.NEG_ONE = NEG_ONE;

	    /**
	     * @type {!Long}
	     * @inner
	     */
	    var MAX_VALUE = fromBits(0xFFFFFFFF|0, 0x7FFFFFFF|0, false);

	    /**
	     * Maximum signed value.
	     * @type {!Long}
	     */
	    Long.MAX_VALUE = MAX_VALUE;

	    /**
	     * @type {!Long}
	     * @inner
	     */
	    var MAX_UNSIGNED_VALUE = fromBits(0xFFFFFFFF|0, 0xFFFFFFFF|0, true);

	    /**
	     * Maximum unsigned value.
	     * @type {!Long}
	     */
	    Long.MAX_UNSIGNED_VALUE = MAX_UNSIGNED_VALUE;

	    /**
	     * @type {!Long}
	     * @inner
	     */
	    var MIN_VALUE = fromBits(0, 0x80000000|0, false);

	    /**
	     * Minimum signed value.
	     * @type {!Long}
	     */
	    Long.MIN_VALUE = MIN_VALUE;

	    /**
	     * @alias Long.prototype
	     * @inner
	     */
	    var LongPrototype = Long.prototype;

	    /**
	     * Converts the Long to a 32 bit integer, assuming it is a 32 bit integer.
	     * @returns {number}
	     */
	    LongPrototype.toInt = function toInt() {
	        return this.unsigned ? this.low >>> 0 : this.low;
	    };

	    /**
	     * Converts the Long to a the nearest floating-point representation of this value (double, 53 bit mantissa).
	     * @returns {number}
	     */
	    LongPrototype.toNumber = function toNumber() {
	        if (this.unsigned)
	            return ((this.high >>> 0) * TWO_PWR_32_DBL) + (this.low >>> 0);
	        return this.high * TWO_PWR_32_DBL + (this.low >>> 0);
	    };

	    /**
	     * Converts the Long to a string written in the specified radix.
	     * @param {number=} radix Radix (2-36), defaults to 10
	     * @returns {string}
	     * @override
	     * @throws {RangeError} If `radix` is out of range
	     */
	    LongPrototype.toString = function toString(radix) {
	        radix = radix || 10;
	        if (radix < 2 || 36 < radix)
	            throw RangeError('radix');
	        if (this.isZero())
	            return '0';
	        if (this.isNegative()) { // Unsigned Longs are never negative
	            if (this.eq(MIN_VALUE)) {
	                // We need to change the Long value before it can be negated, so we remove
	                // the bottom-most digit in this base and then recurse to do the rest.
	                var radixLong = fromNumber(radix),
	                    div = this.div(radixLong),
	                    rem1 = div.mul(radixLong).sub(this);
	                return div.toString(radix) + rem1.toInt().toString(radix);
	            } else
	                return '-' + this.neg().toString(radix);
	        }

	        // Do several (6) digits each time through the loop, so as to
	        // minimize the calls to the very expensive emulated div.
	        var radixToPower = fromNumber(pow_dbl(radix, 6), this.unsigned),
	            rem = this;
	        var result = '';
	        while (true) {
	            var remDiv = rem.div(radixToPower),
	                intval = rem.sub(remDiv.mul(radixToPower)).toInt() >>> 0,
	                digits = intval.toString(radix);
	            rem = remDiv;
	            if (rem.isZero())
	                return digits + result;
	            else {
	                while (digits.length < 6)
	                    digits = '0' + digits;
	                result = '' + digits + result;
	            }
	        }
	    };

	    /**
	     * Gets the high 32 bits as a signed integer.
	     * @returns {number} Signed high bits
	     */
	    LongPrototype.getHighBits = function getHighBits() {
	        return this.high;
	    };

	    /**
	     * Gets the high 32 bits as an unsigned integer.
	     * @returns {number} Unsigned high bits
	     */
	    LongPrototype.getHighBitsUnsigned = function getHighBitsUnsigned() {
	        return this.high >>> 0;
	    };

	    /**
	     * Gets the low 32 bits as a signed integer.
	     * @returns {number} Signed low bits
	     */
	    LongPrototype.getLowBits = function getLowBits() {
	        return this.low;
	    };

	    /**
	     * Gets the low 32 bits as an unsigned integer.
	     * @returns {number} Unsigned low bits
	     */
	    LongPrototype.getLowBitsUnsigned = function getLowBitsUnsigned() {
	        return this.low >>> 0;
	    };

	    /**
	     * Gets the number of bits needed to represent the absolute value of this Long.
	     * @returns {number}
	     */
	    LongPrototype.getNumBitsAbs = function getNumBitsAbs() {
	        if (this.isNegative()) // Unsigned Longs are never negative
	            return this.eq(MIN_VALUE) ? 64 : this.neg().getNumBitsAbs();
	        var val = this.high != 0 ? this.high : this.low;
	        for (var bit = 31; bit > 0; bit--)
	            if ((val & (1 << bit)) != 0)
	                break;
	        return this.high != 0 ? bit + 33 : bit + 1;
	    };

	    /**
	     * Tests if this Long's value equals zero.
	     * @returns {boolean}
	     */
	    LongPrototype.isZero = function isZero() {
	        return this.high === 0 && this.low === 0;
	    };

	    /**
	     * Tests if this Long's value is negative.
	     * @returns {boolean}
	     */
	    LongPrototype.isNegative = function isNegative() {
	        return !this.unsigned && this.high < 0;
	    };

	    /**
	     * Tests if this Long's value is positive.
	     * @returns {boolean}
	     */
	    LongPrototype.isPositive = function isPositive() {
	        return this.unsigned || this.high >= 0;
	    };

	    /**
	     * Tests if this Long's value is odd.
	     * @returns {boolean}
	     */
	    LongPrototype.isOdd = function isOdd() {
	        return (this.low & 1) === 1;
	    };

	    /**
	     * Tests if this Long's value is even.
	     * @returns {boolean}
	     */
	    LongPrototype.isEven = function isEven() {
	        return (this.low & 1) === 0;
	    };

	    /**
	     * Tests if this Long's value equals the specified's.
	     * @param {!Long|number|string} other Other value
	     * @returns {boolean}
	     */
	    LongPrototype.equals = function equals(other) {
	        if (!isLong(other))
	            other = fromValue(other);
	        if (this.unsigned !== other.unsigned && (this.high >>> 31) === 1 && (other.high >>> 31) === 1)
	            return false;
	        return this.high === other.high && this.low === other.low;
	    };

	    /**
	     * Tests if this Long's value equals the specified's. This is an alias of {@link Long#equals}.
	     * @function
	     * @param {!Long|number|string} other Other value
	     * @returns {boolean}
	     */
	    LongPrototype.eq = LongPrototype.equals;

	    /**
	     * Tests if this Long's value differs from the specified's.
	     * @param {!Long|number|string} other Other value
	     * @returns {boolean}
	     */
	    LongPrototype.notEquals = function notEquals(other) {
	        return !this.eq(/* validates */ other);
	    };

	    /**
	     * Tests if this Long's value differs from the specified's. This is an alias of {@link Long#notEquals}.
	     * @function
	     * @param {!Long|number|string} other Other value
	     * @returns {boolean}
	     */
	    LongPrototype.neq = LongPrototype.notEquals;

	    /**
	     * Tests if this Long's value is less than the specified's.
	     * @param {!Long|number|string} other Other value
	     * @returns {boolean}
	     */
	    LongPrototype.lessThan = function lessThan(other) {
	        return this.comp(/* validates */ other) < 0;
	    };

	    /**
	     * Tests if this Long's value is less than the specified's. This is an alias of {@link Long#lessThan}.
	     * @function
	     * @param {!Long|number|string} other Other value
	     * @returns {boolean}
	     */
	    LongPrototype.lt = LongPrototype.lessThan;

	    /**
	     * Tests if this Long's value is less than or equal the specified's.
	     * @param {!Long|number|string} other Other value
	     * @returns {boolean}
	     */
	    LongPrototype.lessThanOrEqual = function lessThanOrEqual(other) {
	        return this.comp(/* validates */ other) <= 0;
	    };

	    /**
	     * Tests if this Long's value is less than or equal the specified's. This is an alias of {@link Long#lessThanOrEqual}.
	     * @function
	     * @param {!Long|number|string} other Other value
	     * @returns {boolean}
	     */
	    LongPrototype.lte = LongPrototype.lessThanOrEqual;

	    /**
	     * Tests if this Long's value is greater than the specified's.
	     * @param {!Long|number|string} other Other value
	     * @returns {boolean}
	     */
	    LongPrototype.greaterThan = function greaterThan(other) {
	        return this.comp(/* validates */ other) > 0;
	    };

	    /**
	     * Tests if this Long's value is greater than the specified's. This is an alias of {@link Long#greaterThan}.
	     * @function
	     * @param {!Long|number|string} other Other value
	     * @returns {boolean}
	     */
	    LongPrototype.gt = LongPrototype.greaterThan;

	    /**
	     * Tests if this Long's value is greater than or equal the specified's.
	     * @param {!Long|number|string} other Other value
	     * @returns {boolean}
	     */
	    LongPrototype.greaterThanOrEqual = function greaterThanOrEqual(other) {
	        return this.comp(/* validates */ other) >= 0;
	    };

	    /**
	     * Tests if this Long's value is greater than or equal the specified's. This is an alias of {@link Long#greaterThanOrEqual}.
	     * @function
	     * @param {!Long|number|string} other Other value
	     * @returns {boolean}
	     */
	    LongPrototype.gte = LongPrototype.greaterThanOrEqual;

	    /**
	     * Compares this Long's value with the specified's.
	     * @param {!Long|number|string} other Other value
	     * @returns {number} 0 if they are the same, 1 if the this is greater and -1
	     *  if the given one is greater
	     */
	    LongPrototype.compare = function compare(other) {
	        if (!isLong(other))
	            other = fromValue(other);
	        if (this.eq(other))
	            return 0;
	        var thisNeg = this.isNegative(),
	            otherNeg = other.isNegative();
	        if (thisNeg && !otherNeg)
	            return -1;
	        if (!thisNeg && otherNeg)
	            return 1;
	        // At this point the sign bits are the same
	        if (!this.unsigned)
	            return this.sub(other).isNegative() ? -1 : 1;
	        // Both are positive if at least one is unsigned
	        return (other.high >>> 0) > (this.high >>> 0) || (other.high === this.high && (other.low >>> 0) > (this.low >>> 0)) ? -1 : 1;
	    };

	    /**
	     * Compares this Long's value with the specified's. This is an alias of {@link Long#compare}.
	     * @function
	     * @param {!Long|number|string} other Other value
	     * @returns {number} 0 if they are the same, 1 if the this is greater and -1
	     *  if the given one is greater
	     */
	    LongPrototype.comp = LongPrototype.compare;

	    /**
	     * Negates this Long's value.
	     * @returns {!Long} Negated Long
	     */
	    LongPrototype.negate = function negate() {
	        if (!this.unsigned && this.eq(MIN_VALUE))
	            return MIN_VALUE;
	        return this.not().add(ONE);
	    };

	    /**
	     * Negates this Long's value. This is an alias of {@link Long#negate}.
	     * @function
	     * @returns {!Long} Negated Long
	     */
	    LongPrototype.neg = LongPrototype.negate;

	    /**
	     * Returns the sum of this and the specified Long.
	     * @param {!Long|number|string} addend Addend
	     * @returns {!Long} Sum
	     */
	    LongPrototype.add = function add(addend) {
	        if (!isLong(addend))
	            addend = fromValue(addend);

	        // Divide each number into 4 chunks of 16 bits, and then sum the chunks.

	        var a48 = this.high >>> 16;
	        var a32 = this.high & 0xFFFF;
	        var a16 = this.low >>> 16;
	        var a00 = this.low & 0xFFFF;

	        var b48 = addend.high >>> 16;
	        var b32 = addend.high & 0xFFFF;
	        var b16 = addend.low >>> 16;
	        var b00 = addend.low & 0xFFFF;

	        var c48 = 0, c32 = 0, c16 = 0, c00 = 0;
	        c00 += a00 + b00;
	        c16 += c00 >>> 16;
	        c00 &= 0xFFFF;
	        c16 += a16 + b16;
	        c32 += c16 >>> 16;
	        c16 &= 0xFFFF;
	        c32 += a32 + b32;
	        c48 += c32 >>> 16;
	        c32 &= 0xFFFF;
	        c48 += a48 + b48;
	        c48 &= 0xFFFF;
	        return fromBits((c16 << 16) | c00, (c48 << 16) | c32, this.unsigned);
	    };

	    /**
	     * Returns the difference of this and the specified Long.
	     * @param {!Long|number|string} subtrahend Subtrahend
	     * @returns {!Long} Difference
	     */
	    LongPrototype.subtract = function subtract(subtrahend) {
	        if (!isLong(subtrahend))
	            subtrahend = fromValue(subtrahend);
	        return this.add(subtrahend.neg());
	    };

	    /**
	     * Returns the difference of this and the specified Long. This is an alias of {@link Long#subtract}.
	     * @function
	     * @param {!Long|number|string} subtrahend Subtrahend
	     * @returns {!Long} Difference
	     */
	    LongPrototype.sub = LongPrototype.subtract;

	    /**
	     * Returns the product of this and the specified Long.
	     * @param {!Long|number|string} multiplier Multiplier
	     * @returns {!Long} Product
	     */
	    LongPrototype.multiply = function multiply(multiplier) {
	        if (this.isZero())
	            return ZERO;
	        if (!isLong(multiplier))
	            multiplier = fromValue(multiplier);
	        if (multiplier.isZero())
	            return ZERO;
	        if (this.eq(MIN_VALUE))
	            return multiplier.isOdd() ? MIN_VALUE : ZERO;
	        if (multiplier.eq(MIN_VALUE))
	            return this.isOdd() ? MIN_VALUE : ZERO;

	        if (this.isNegative()) {
	            if (multiplier.isNegative())
	                return this.neg().mul(multiplier.neg());
	            else
	                return this.neg().mul(multiplier).neg();
	        } else if (multiplier.isNegative())
	            return this.mul(multiplier.neg()).neg();

	        // If both longs are small, use float multiplication
	        if (this.lt(TWO_PWR_24) && multiplier.lt(TWO_PWR_24))
	            return fromNumber(this.toNumber() * multiplier.toNumber(), this.unsigned);

	        // Divide each long into 4 chunks of 16 bits, and then add up 4x4 products.
	        // We can skip products that would overflow.

	        var a48 = this.high >>> 16;
	        var a32 = this.high & 0xFFFF;
	        var a16 = this.low >>> 16;
	        var a00 = this.low & 0xFFFF;

	        var b48 = multiplier.high >>> 16;
	        var b32 = multiplier.high & 0xFFFF;
	        var b16 = multiplier.low >>> 16;
	        var b00 = multiplier.low & 0xFFFF;

	        var c48 = 0, c32 = 0, c16 = 0, c00 = 0;
	        c00 += a00 * b00;
	        c16 += c00 >>> 16;
	        c00 &= 0xFFFF;
	        c16 += a16 * b00;
	        c32 += c16 >>> 16;
	        c16 &= 0xFFFF;
	        c16 += a00 * b16;
	        c32 += c16 >>> 16;
	        c16 &= 0xFFFF;
	        c32 += a32 * b00;
	        c48 += c32 >>> 16;
	        c32 &= 0xFFFF;
	        c32 += a16 * b16;
	        c48 += c32 >>> 16;
	        c32 &= 0xFFFF;
	        c32 += a00 * b32;
	        c48 += c32 >>> 16;
	        c32 &= 0xFFFF;
	        c48 += a48 * b00 + a32 * b16 + a16 * b32 + a00 * b48;
	        c48 &= 0xFFFF;
	        return fromBits((c16 << 16) | c00, (c48 << 16) | c32, this.unsigned);
	    };

	    /**
	     * Returns the product of this and the specified Long. This is an alias of {@link Long#multiply}.
	     * @function
	     * @param {!Long|number|string} multiplier Multiplier
	     * @returns {!Long} Product
	     */
	    LongPrototype.mul = LongPrototype.multiply;

	    /**
	     * Returns this Long divided by the specified. The result is signed if this Long is signed or
	     *  unsigned if this Long is unsigned.
	     * @param {!Long|number|string} divisor Divisor
	     * @returns {!Long} Quotient
	     */
	    LongPrototype.divide = function divide(divisor) {
	        if (!isLong(divisor))
	            divisor = fromValue(divisor);
	        if (divisor.isZero())
	            throw Error('division by zero');
	        if (this.isZero())
	            return this.unsigned ? UZERO : ZERO;
	        var approx, rem, res;
	        if (!this.unsigned) {
	            // This section is only relevant for signed longs and is derived from the
	            // closure library as a whole.
	            if (this.eq(MIN_VALUE)) {
	                if (divisor.eq(ONE) || divisor.eq(NEG_ONE))
	                    return MIN_VALUE;  // recall that -MIN_VALUE == MIN_VALUE
	                else if (divisor.eq(MIN_VALUE))
	                    return ONE;
	                else {
	                    // At this point, we have |other| >= 2, so |this/other| < |MIN_VALUE|.
	                    var halfThis = this.shr(1);
	                    approx = halfThis.div(divisor).shl(1);
	                    if (approx.eq(ZERO)) {
	                        return divisor.isNegative() ? ONE : NEG_ONE;
	                    } else {
	                        rem = this.sub(divisor.mul(approx));
	                        res = approx.add(rem.div(divisor));
	                        return res;
	                    }
	                }
	            } else if (divisor.eq(MIN_VALUE))
	                return this.unsigned ? UZERO : ZERO;
	            if (this.isNegative()) {
	                if (divisor.isNegative())
	                    return this.neg().div(divisor.neg());
	                return this.neg().div(divisor).neg();
	            } else if (divisor.isNegative())
	                return this.div(divisor.neg()).neg();
	            res = ZERO;
	        } else {
	            // The algorithm below has not been made for unsigned longs. It's therefore
	            // required to take special care of the MSB prior to running it.
	            if (!divisor.unsigned)
	                divisor = divisor.toUnsigned();
	            if (divisor.gt(this))
	                return UZERO;
	            if (divisor.gt(this.shru(1))) // 15 >>> 1 = 7 ; with divisor = 8 ; true
	                return UONE;
	            res = UZERO;
	        }

	        // Repeat the following until the remainder is less than other:  find a
	        // floating-point that approximates remainder / other *from below*, add this
	        // into the result, and subtract it from the remainder.  It is critical that
	        // the approximate value is less than or equal to the real value so that the
	        // remainder never becomes negative.
	        rem = this;
	        while (rem.gte(divisor)) {
	            // Approximate the result of division. This may be a little greater or
	            // smaller than the actual value.
	            approx = Math.max(1, Math.floor(rem.toNumber() / divisor.toNumber()));

	            // We will tweak the approximate result by changing it in the 48-th digit or
	            // the smallest non-fractional digit, whichever is larger.
	            var log2 = Math.ceil(Math.log(approx) / Math.LN2),
	                delta = (log2 <= 48) ? 1 : pow_dbl(2, log2 - 48),

	            // Decrease the approximation until it is smaller than the remainder.  Note
	            // that if it is too large, the product overflows and is negative.
	                approxRes = fromNumber(approx),
	                approxRem = approxRes.mul(divisor);
	            while (approxRem.isNegative() || approxRem.gt(rem)) {
	                approx -= delta;
	                approxRes = fromNumber(approx, this.unsigned);
	                approxRem = approxRes.mul(divisor);
	            }

	            // We know the answer can't be zero... and actually, zero would cause
	            // infinite recursion since we would make no progress.
	            if (approxRes.isZero())
	                approxRes = ONE;

	            res = res.add(approxRes);
	            rem = rem.sub(approxRem);
	        }
	        return res;
	    };

	    /**
	     * Returns this Long divided by the specified. This is an alias of {@link Long#divide}.
	     * @function
	     * @param {!Long|number|string} divisor Divisor
	     * @returns {!Long} Quotient
	     */
	    LongPrototype.div = LongPrototype.divide;

	    /**
	     * Returns this Long modulo the specified.
	     * @param {!Long|number|string} divisor Divisor
	     * @returns {!Long} Remainder
	     */
	    LongPrototype.modulo = function modulo(divisor) {
	        if (!isLong(divisor))
	            divisor = fromValue(divisor);
	        return this.sub(this.div(divisor).mul(divisor));
	    };

	    /**
	     * Returns this Long modulo the specified. This is an alias of {@link Long#modulo}.
	     * @function
	     * @param {!Long|number|string} divisor Divisor
	     * @returns {!Long} Remainder
	     */
	    LongPrototype.mod = LongPrototype.modulo;

	    /**
	     * Returns the bitwise NOT of this Long.
	     * @returns {!Long}
	     */
	    LongPrototype.not = function not() {
	        return fromBits(~this.low, ~this.high, this.unsigned);
	    };

	    /**
	     * Returns the bitwise AND of this Long and the specified.
	     * @param {!Long|number|string} other Other Long
	     * @returns {!Long}
	     */
	    LongPrototype.and = function and(other) {
	        if (!isLong(other))
	            other = fromValue(other);
	        return fromBits(this.low & other.low, this.high & other.high, this.unsigned);
	    };

	    /**
	     * Returns the bitwise OR of this Long and the specified.
	     * @param {!Long|number|string} other Other Long
	     * @returns {!Long}
	     */
	    LongPrototype.or = function or(other) {
	        if (!isLong(other))
	            other = fromValue(other);
	        return fromBits(this.low | other.low, this.high | other.high, this.unsigned);
	    };

	    /**
	     * Returns the bitwise XOR of this Long and the given one.
	     * @param {!Long|number|string} other Other Long
	     * @returns {!Long}
	     */
	    LongPrototype.xor = function xor(other) {
	        if (!isLong(other))
	            other = fromValue(other);
	        return fromBits(this.low ^ other.low, this.high ^ other.high, this.unsigned);
	    };

	    /**
	     * Returns this Long with bits shifted to the left by the given amount.
	     * @param {number|!Long} numBits Number of bits
	     * @returns {!Long} Shifted Long
	     */
	    LongPrototype.shiftLeft = function shiftLeft(numBits) {
	        if (isLong(numBits))
	            numBits = numBits.toInt();
	        if ((numBits &= 63) === 0)
	            return this;
	        else if (numBits < 32)
	            return fromBits(this.low << numBits, (this.high << numBits) | (this.low >>> (32 - numBits)), this.unsigned);
	        else
	            return fromBits(0, this.low << (numBits - 32), this.unsigned);
	    };

	    /**
	     * Returns this Long with bits shifted to the left by the given amount. This is an alias of {@link Long#shiftLeft}.
	     * @function
	     * @param {number|!Long} numBits Number of bits
	     * @returns {!Long} Shifted Long
	     */
	    LongPrototype.shl = LongPrototype.shiftLeft;

	    /**
	     * Returns this Long with bits arithmetically shifted to the right by the given amount.
	     * @param {number|!Long} numBits Number of bits
	     * @returns {!Long} Shifted Long
	     */
	    LongPrototype.shiftRight = function shiftRight(numBits) {
	        if (isLong(numBits))
	            numBits = numBits.toInt();
	        if ((numBits &= 63) === 0)
	            return this;
	        else if (numBits < 32)
	            return fromBits((this.low >>> numBits) | (this.high << (32 - numBits)), this.high >> numBits, this.unsigned);
	        else
	            return fromBits(this.high >> (numBits - 32), this.high >= 0 ? 0 : -1, this.unsigned);
	    };

	    /**
	     * Returns this Long with bits arithmetically shifted to the right by the given amount. This is an alias of {@link Long#shiftRight}.
	     * @function
	     * @param {number|!Long} numBits Number of bits
	     * @returns {!Long} Shifted Long
	     */
	    LongPrototype.shr = LongPrototype.shiftRight;

	    /**
	     * Returns this Long with bits logically shifted to the right by the given amount.
	     * @param {number|!Long} numBits Number of bits
	     * @returns {!Long} Shifted Long
	     */
	    LongPrototype.shiftRightUnsigned = function shiftRightUnsigned(numBits) {
	        if (isLong(numBits))
	            numBits = numBits.toInt();
	        numBits &= 63;
	        if (numBits === 0)
	            return this;
	        else {
	            var high = this.high;
	            if (numBits < 32) {
	                var low = this.low;
	                return fromBits((low >>> numBits) | (high << (32 - numBits)), high >>> numBits, this.unsigned);
	            } else if (numBits === 32)
	                return fromBits(high, 0, this.unsigned);
	            else
	                return fromBits(high >>> (numBits - 32), 0, this.unsigned);
	        }
	    };

	    /**
	     * Returns this Long with bits logically shifted to the right by the given amount. This is an alias of {@link Long#shiftRightUnsigned}.
	     * @function
	     * @param {number|!Long} numBits Number of bits
	     * @returns {!Long} Shifted Long
	     */
	    LongPrototype.shru = LongPrototype.shiftRightUnsigned;

	    /**
	     * Converts this Long to signed.
	     * @returns {!Long} Signed long
	     */
	    LongPrototype.toSigned = function toSigned() {
	        if (!this.unsigned)
	            return this;
	        return fromBits(this.low, this.high, false);
	    };

	    /**
	     * Converts this Long to unsigned.
	     * @returns {!Long} Unsigned long
	     */
	    LongPrototype.toUnsigned = function toUnsigned() {
	        if (this.unsigned)
	            return this;
	        return fromBits(this.low, this.high, true);
	    };

	    /**
	     * Converts this Long to its byte representation.
	     * @param {boolean=} le Whether little or big endian, defaults to big endian
	     * @returns {!Array.<number>} Byte representation
	     */
	    LongPrototype.toBytes = function(le) {
	        return le ? this.toBytesLE() : this.toBytesBE();
	    }

	    /**
	     * Converts this Long to its little endian byte representation.
	     * @returns {!Array.<number>} Little endian byte representation
	     */
	    LongPrototype.toBytesLE = function() {
	        var hi = this.high,
	            lo = this.low;
	        return [
	             lo         & 0xff,
	            (lo >>>  8) & 0xff,
	            (lo >>> 16) & 0xff,
	            (lo >>> 24) & 0xff,
	             hi         & 0xff,
	            (hi >>>  8) & 0xff,
	            (hi >>> 16) & 0xff,
	            (hi >>> 24) & 0xff
	        ];
	    }

	    /**
	     * Converts this Long to its big endian byte representation.
	     * @returns {!Array.<number>} Big endian byte representation
	     */
	    LongPrototype.toBytesBE = function() {
	        var hi = this.high,
	            lo = this.low;
	        return [
	            (hi >>> 24) & 0xff,
	            (hi >>> 16) & 0xff,
	            (hi >>>  8) & 0xff,
	             hi         & 0xff,
	            (lo >>> 24) & 0xff,
	            (lo >>> 16) & 0xff,
	            (lo >>>  8) & 0xff,
	             lo         & 0xff
	        ];
	    }

	    return Long;
	});
	});

	var bytebuffer = createCommonjsModule(function (module) {
	/*
	 Copyright 2013-2014 Daniel Wirtz <dcode@dcode.io>

	 Licensed under the Apache License, Version 2.0 (the "License");
	 you may not use this file except in compliance with the License.
	 You may obtain a copy of the License at

	 http://www.apache.org/licenses/LICENSE-2.0

	 Unless required by applicable law or agreed to in writing, software
	 distributed under the License is distributed on an "AS IS" BASIS,
	 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	 See the License for the specific language governing permissions and
	 limitations under the License.
	 */

	/**
	 * @license bytebuffer.js (c) 2015 Daniel Wirtz <dcode@dcode.io>
	 * Backing buffer: ArrayBuffer, Accessor: Uint8Array
	 * Released under the Apache License, Version 2.0
	 * see: https://github.com/dcodeIO/bytebuffer.js for details
	 */
	(function(global, factory) {

	    /* AMD */ if (typeof define === 'function' && define["amd"])
	        define(["long"], factory);
	    /* CommonJS */ else if ('function' === 'function' && typeof module === "object" && module && module["exports"])
	        module['exports'] = (function() {
	            var Long; try { Long = long; } catch (e) {}
	            return factory(Long);
	        })();
	    /* Global */ else
	        (global["dcodeIO"] = global["dcodeIO"] || {})["ByteBuffer"] = factory(global["dcodeIO"]["Long"]);

	})(commonjsGlobal, function(Long) {
	    "use strict";

	    /**
	     * Constructs a new ByteBuffer.
	     * @class The swiss army knife for binary data in JavaScript.
	     * @exports ByteBuffer
	     * @constructor
	     * @param {number=} capacity Initial capacity. Defaults to {@link ByteBuffer.DEFAULT_CAPACITY}.
	     * @param {boolean=} littleEndian Whether to use little or big endian byte order. Defaults to
	     *  {@link ByteBuffer.DEFAULT_ENDIAN}.
	     * @param {boolean=} noAssert Whether to skip assertions of offsets and values. Defaults to
	     *  {@link ByteBuffer.DEFAULT_NOASSERT}.
	     * @expose
	     */
	    var ByteBuffer = function(capacity, littleEndian, noAssert) {
	        if (typeof capacity === 'undefined')
	            capacity = ByteBuffer.DEFAULT_CAPACITY;
	        if (typeof littleEndian === 'undefined')
	            littleEndian = ByteBuffer.DEFAULT_ENDIAN;
	        if (typeof noAssert === 'undefined')
	            noAssert = ByteBuffer.DEFAULT_NOASSERT;
	        if (!noAssert) {
	            capacity = capacity | 0;
	            if (capacity < 0)
	                throw RangeError("Illegal capacity");
	            littleEndian = !!littleEndian;
	            noAssert = !!noAssert;
	        }

	        /**
	         * Backing ArrayBuffer.
	         * @type {!ArrayBuffer}
	         * @expose
	         */
	        this.buffer = capacity === 0 ? EMPTY_BUFFER : new ArrayBuffer(capacity);

	        /**
	         * Uint8Array utilized to manipulate the backing buffer. Becomes `null` if the backing buffer has a capacity of `0`.
	         * @type {?Uint8Array}
	         * @expose
	         */
	        this.view = capacity === 0 ? null : new Uint8Array(this.buffer);

	        /**
	         * Absolute read/write offset.
	         * @type {number}
	         * @expose
	         * @see ByteBuffer#flip
	         * @see ByteBuffer#clear
	         */
	        this.offset = 0;

	        /**
	         * Marked offset.
	         * @type {number}
	         * @expose
	         * @see ByteBuffer#mark
	         * @see ByteBuffer#reset
	         */
	        this.markedOffset = -1;

	        /**
	         * Absolute limit of the contained data. Set to the backing buffer's capacity upon allocation.
	         * @type {number}
	         * @expose
	         * @see ByteBuffer#flip
	         * @see ByteBuffer#clear
	         */
	        this.limit = capacity;

	        /**
	         * Whether to use little endian byte order, defaults to `false` for big endian.
	         * @type {boolean}
	         * @expose
	         */
	        this.littleEndian = littleEndian;

	        /**
	         * Whether to skip assertions of offsets and values, defaults to `false`.
	         * @type {boolean}
	         * @expose
	         */
	        this.noAssert = noAssert;
	    };

	    /**
	     * ByteBuffer version.
	     * @type {string}
	     * @const
	     * @expose
	     */
	    ByteBuffer.VERSION = "5.0.1";

	    /**
	     * Little endian constant that can be used instead of its boolean value. Evaluates to `true`.
	     * @type {boolean}
	     * @const
	     * @expose
	     */
	    ByteBuffer.LITTLE_ENDIAN = true;

	    /**
	     * Big endian constant that can be used instead of its boolean value. Evaluates to `false`.
	     * @type {boolean}
	     * @const
	     * @expose
	     */
	    ByteBuffer.BIG_ENDIAN = false;

	    /**
	     * Default initial capacity of `16`.
	     * @type {number}
	     * @expose
	     */
	    ByteBuffer.DEFAULT_CAPACITY = 16;

	    /**
	     * Default endianess of `false` for big endian.
	     * @type {boolean}
	     * @expose
	     */
	    ByteBuffer.DEFAULT_ENDIAN = ByteBuffer.BIG_ENDIAN;

	    /**
	     * Default no assertions flag of `false`.
	     * @type {boolean}
	     * @expose
	     */
	    ByteBuffer.DEFAULT_NOASSERT = false;

	    /**
	     * A `Long` class for representing a 64-bit two's-complement integer value. May be `null` if Long.js has not been loaded
	     *  and int64 support is not available.
	     * @type {?Long}
	     * @const
	     * @see https://github.com/dcodeIO/long.js
	     * @expose
	     */
	    ByteBuffer.Long = Long || null;

	    /**
	     * @alias ByteBuffer.prototype
	     * @inner
	     */
	    var ByteBufferPrototype = ByteBuffer.prototype;

	    /**
	     * An indicator used to reliably determine if an object is a ByteBuffer or not.
	     * @type {boolean}
	     * @const
	     * @expose
	     * @private
	     */
	    ByteBufferPrototype.__isByteBuffer__;

	    Object.defineProperty(ByteBufferPrototype, "__isByteBuffer__", {
	        value: true,
	        enumerable: false,
	        configurable: false
	    });

	    // helpers

	    /**
	     * @type {!ArrayBuffer}
	     * @inner
	     */
	    var EMPTY_BUFFER = new ArrayBuffer(0);

	    /**
	     * String.fromCharCode reference for compile-time renaming.
	     * @type {function(...number):string}
	     * @inner
	     */
	    var stringFromCharCode = String.fromCharCode;

	    /**
	     * Creates a source function for a string.
	     * @param {string} s String to read from
	     * @returns {function():number|null} Source function returning the next char code respectively `null` if there are
	     *  no more characters left.
	     * @throws {TypeError} If the argument is invalid
	     * @inner
	     */
	    function stringSource(s) {
	        var i=0; return function() {
	            return i < s.length ? s.charCodeAt(i++) : null;
	        };
	    }

	    /**
	     * Creates a destination function for a string.
	     * @returns {function(number=):undefined|string} Destination function successively called with the next char code.
	     *  Returns the final string when called without arguments.
	     * @inner
	     */
	    function stringDestination() {
	        var cs = [], ps = []; return function() {
	            if (arguments.length === 0)
	                return ps.join('')+stringFromCharCode.apply(String, cs);
	            if (cs.length + arguments.length > 1024)
	                ps.push(stringFromCharCode.apply(String, cs)),
	                    cs.length = 0;
	            Array.prototype.push.apply(cs, arguments);
	        };
	    }

	    /**
	     * Gets the accessor type.
	     * @returns {Function} `Buffer` under node.js, `Uint8Array` respectively `DataView` in the browser (classes)
	     * @expose
	     */
	    ByteBuffer.accessor = function() {
	        return Uint8Array;
	    };
	    /**
	     * Allocates a new ByteBuffer backed by a buffer of the specified capacity.
	     * @param {number=} capacity Initial capacity. Defaults to {@link ByteBuffer.DEFAULT_CAPACITY}.
	     * @param {boolean=} littleEndian Whether to use little or big endian byte order. Defaults to
	     *  {@link ByteBuffer.DEFAULT_ENDIAN}.
	     * @param {boolean=} noAssert Whether to skip assertions of offsets and values. Defaults to
	     *  {@link ByteBuffer.DEFAULT_NOASSERT}.
	     * @returns {!ByteBuffer}
	     * @expose
	     */
	    ByteBuffer.allocate = function(capacity, littleEndian, noAssert) {
	        return new ByteBuffer(capacity, littleEndian, noAssert);
	    };

	    /**
	     * Concatenates multiple ByteBuffers into one.
	     * @param {!Array.<!ByteBuffer|!ArrayBuffer|!Uint8Array|string>} buffers Buffers to concatenate
	     * @param {(string|boolean)=} encoding String encoding if `buffers` contains a string ("base64", "hex", "binary",
	     *  defaults to "utf8")
	     * @param {boolean=} littleEndian Whether to use little or big endian byte order for the resulting ByteBuffer. Defaults
	     *  to {@link ByteBuffer.DEFAULT_ENDIAN}.
	     * @param {boolean=} noAssert Whether to skip assertions of offsets and values for the resulting ByteBuffer. Defaults to
	     *  {@link ByteBuffer.DEFAULT_NOASSERT}.
	     * @returns {!ByteBuffer} Concatenated ByteBuffer
	     * @expose
	     */
	    ByteBuffer.concat = function(buffers, encoding, littleEndian, noAssert) {
	        if (typeof encoding === 'boolean' || typeof encoding !== 'string') {
	            noAssert = littleEndian;
	            littleEndian = encoding;
	            encoding = undefined;
	        }
	        var capacity = 0;
	        for (var i=0, k=buffers.length, length; i<k; ++i) {
	            if (!ByteBuffer.isByteBuffer(buffers[i]))
	                buffers[i] = ByteBuffer.wrap(buffers[i], encoding);
	            length = buffers[i].limit - buffers[i].offset;
	            if (length > 0) capacity += length;
	        }
	        if (capacity === 0)
	            return new ByteBuffer(0, littleEndian, noAssert);
	        var bb = new ByteBuffer(capacity, littleEndian, noAssert),
	            bi;
	        i=0; while (i<k) {
	            bi = buffers[i++];
	            length = bi.limit - bi.offset;
	            if (length <= 0) continue;
	            bb.view.set(bi.view.subarray(bi.offset, bi.limit), bb.offset);
	            bb.offset += length;
	        }
	        bb.limit = bb.offset;
	        bb.offset = 0;
	        return bb;
	    };

	    /**
	     * Tests if the specified type is a ByteBuffer.
	     * @param {*} bb ByteBuffer to test
	     * @returns {boolean} `true` if it is a ByteBuffer, otherwise `false`
	     * @expose
	     */
	    ByteBuffer.isByteBuffer = function(bb) {
	        return (bb && bb["__isByteBuffer__"]) === true;
	    };
	    /**
	     * Gets the backing buffer type.
	     * @returns {Function} `Buffer` under node.js, `ArrayBuffer` in the browser (classes)
	     * @expose
	     */
	    ByteBuffer.type = function() {
	        return ArrayBuffer;
	    };
	    /**
	     * Wraps a buffer or a string. Sets the allocated ByteBuffer's {@link ByteBuffer#offset} to `0` and its
	     *  {@link ByteBuffer#limit} to the length of the wrapped data.
	     * @param {!ByteBuffer|!ArrayBuffer|!Uint8Array|string|!Array.<number>} buffer Anything that can be wrapped
	     * @param {(string|boolean)=} encoding String encoding if `buffer` is a string ("base64", "hex", "binary", defaults to
	     *  "utf8")
	     * @param {boolean=} littleEndian Whether to use little or big endian byte order. Defaults to
	     *  {@link ByteBuffer.DEFAULT_ENDIAN}.
	     * @param {boolean=} noAssert Whether to skip assertions of offsets and values. Defaults to
	     *  {@link ByteBuffer.DEFAULT_NOASSERT}.
	     * @returns {!ByteBuffer} A ByteBuffer wrapping `buffer`
	     * @expose
	     */
	    ByteBuffer.wrap = function(buffer, encoding, littleEndian, noAssert) {
	        if (typeof encoding !== 'string') {
	            noAssert = littleEndian;
	            littleEndian = encoding;
	            encoding = undefined;
	        }
	        if (typeof buffer === 'string') {
	            if (typeof encoding === 'undefined')
	                encoding = "utf8";
	            switch (encoding) {
	                case "base64":
	                    return ByteBuffer.fromBase64(buffer, littleEndian);
	                case "hex":
	                    return ByteBuffer.fromHex(buffer, littleEndian);
	                case "binary":
	                    return ByteBuffer.fromBinary(buffer, littleEndian);
	                case "utf8":
	                    return ByteBuffer.fromUTF8(buffer, littleEndian);
	                case "debug":
	                    return ByteBuffer.fromDebug(buffer, littleEndian);
	                default:
	                    throw Error("Unsupported encoding: "+encoding);
	            }
	        }
	        if (buffer === null || typeof buffer !== 'object')
	            throw TypeError("Illegal buffer");
	        var bb;
	        if (ByteBuffer.isByteBuffer(buffer)) {
	            bb = ByteBufferPrototype.clone.call(buffer);
	            bb.markedOffset = -1;
	            return bb;
	        }
	        if (buffer instanceof Uint8Array) { // Extract ArrayBuffer from Uint8Array
	            bb = new ByteBuffer(0, littleEndian, noAssert);
	            if (buffer.length > 0) { // Avoid references to more than one EMPTY_BUFFER
	                bb.buffer = buffer.buffer;
	                bb.offset = buffer.byteOffset;
	                bb.limit = buffer.byteOffset + buffer.byteLength;
	                bb.view = new Uint8Array(buffer.buffer);
	            }
	        } else if (buffer instanceof ArrayBuffer) { // Reuse ArrayBuffer
	            bb = new ByteBuffer(0, littleEndian, noAssert);
	            if (buffer.byteLength > 0) {
	                bb.buffer = buffer;
	                bb.offset = 0;
	                bb.limit = buffer.byteLength;
	                bb.view = buffer.byteLength > 0 ? new Uint8Array(buffer) : null;
	            }
	        } else if (Object.prototype.toString.call(buffer) === "[object Array]") { // Create from octets
	            bb = new ByteBuffer(buffer.length, littleEndian, noAssert);
	            bb.limit = buffer.length;
	            for (var i=0; i<buffer.length; ++i)
	                bb.view[i] = buffer[i];
	        } else
	            throw TypeError("Illegal buffer"); // Otherwise fail
	        return bb;
	    };

	    /**
	     * Writes the array as a bitset.
	     * @param {Array<boolean>} value Array of booleans to write
	     * @param {number=} offset Offset to read from. Will use and increase {@link ByteBuffer#offset} by `length` if omitted.
	     * @returns {!ByteBuffer}
	     * @expose
	     */
	    ByteBufferPrototype.writeBitSet = function(value, offset) {
	      var relative = typeof offset === 'undefined';
	      if (relative) offset = this.offset;
	      if (!this.noAssert) {
	        if (!(value instanceof Array))
	          throw TypeError("Illegal BitSet: Not an array");
	        if (typeof offset !== 'number' || offset % 1 !== 0)
	            throw TypeError("Illegal offset: "+offset+" (not an integer)");
	        offset >>>= 0;
	        if (offset < 0 || offset + 0 > this.buffer.byteLength)
	            throw RangeError("Illegal offset: 0 <= "+offset+" (+"+0+") <= "+this.buffer.byteLength);
	      }

	      var start = offset,
	          bits = value.length,
	          bytes = (bits >> 3),
	          bit = 0,
	          k;

	      offset += this.writeVarint32(bits,offset);

	      while(bytes--) {
	        k = (!!value[bit++] & 1) |
	            ((!!value[bit++] & 1) << 1) |
	            ((!!value[bit++] & 1) << 2) |
	            ((!!value[bit++] & 1) << 3) |
	            ((!!value[bit++] & 1) << 4) |
	            ((!!value[bit++] & 1) << 5) |
	            ((!!value[bit++] & 1) << 6) |
	            ((!!value[bit++] & 1) << 7);
	        this.writeByte(k,offset++);
	      }

	      if(bit < bits) {
	        var m = 0; k = 0;
	        while(bit < bits) k = k | ((!!value[bit++] & 1) << (m++));
	        this.writeByte(k,offset++);
	      }

	      if (relative) {
	        this.offset = offset;
	        return this;
	      }
	      return offset - start;
	    }

	    /**
	     * Reads a BitSet as an array of booleans.
	     * @param {number=} offset Offset to read from. Will use and increase {@link ByteBuffer#offset} by `length` if omitted.
	     * @returns {Array<boolean>
	     * @expose
	     */
	    ByteBufferPrototype.readBitSet = function(offset) {
	      var relative = typeof offset === 'undefined';
	      if (relative) offset = this.offset;

	      var ret = this.readVarint32(offset),
	          bits = ret.value,
	          bytes = (bits >> 3),
	          bit = 0,
	          value = [],
	          k;

	      offset += ret.length;

	      while(bytes--) {
	        k = this.readByte(offset++);
	        value[bit++] = !!(k & 0x01);
	        value[bit++] = !!(k & 0x02);
	        value[bit++] = !!(k & 0x04);
	        value[bit++] = !!(k & 0x08);
	        value[bit++] = !!(k & 0x10);
	        value[bit++] = !!(k & 0x20);
	        value[bit++] = !!(k & 0x40);
	        value[bit++] = !!(k & 0x80);
	      }

	      if(bit < bits) {
	        var m = 0;
	        k = this.readByte(offset++);
	        while(bit < bits) value[bit++] = !!((k >> (m++)) & 1);
	      }

	      if (relative) {
	        this.offset = offset;
	      }
	      return value;
	    }
	    /**
	     * Reads the specified number of bytes.
	     * @param {number} length Number of bytes to read
	     * @param {number=} offset Offset to read from. Will use and increase {@link ByteBuffer#offset} by `length` if omitted.
	     * @returns {!ByteBuffer}
	     * @expose
	     */
	    ByteBufferPrototype.readBytes = function(length, offset) {
	        var relative = typeof offset === 'undefined';
	        if (relative) offset = this.offset;
	        if (!this.noAssert) {
	            if (typeof offset !== 'number' || offset % 1 !== 0)
	                throw TypeError("Illegal offset: "+offset+" (not an integer)");
	            offset >>>= 0;
	            if (offset < 0 || offset + length > this.buffer.byteLength)
	                throw RangeError("Illegal offset: 0 <= "+offset+" (+"+length+") <= "+this.buffer.byteLength);
	        }
	        var slice = this.slice(offset, offset + length);
	        if (relative) this.offset += length;
	        return slice;
	    };

	    /**
	     * Writes a payload of bytes. This is an alias of {@link ByteBuffer#append}.
	     * @function
	     * @param {!ByteBuffer|!ArrayBuffer|!Uint8Array|string} source Data to write. If `source` is a ByteBuffer, its offsets
	     *  will be modified according to the performed read operation.
	     * @param {(string|number)=} encoding Encoding if `data` is a string ("base64", "hex", "binary", defaults to "utf8")
	     * @param {number=} offset Offset to write to. Will use and increase {@link ByteBuffer#offset} by the number of bytes
	     *  written if omitted.
	     * @returns {!ByteBuffer} this
	     * @expose
	     */
	    ByteBufferPrototype.writeBytes = ByteBufferPrototype.append;

	    // types/ints/int8

	    /**
	     * Writes an 8bit signed integer.
	     * @param {number} value Value to write
	     * @param {number=} offset Offset to write to. Will use and advance {@link ByteBuffer#offset} by `1` if omitted.
	     * @returns {!ByteBuffer} this
	     * @expose
	     */
	    ByteBufferPrototype.writeInt8 = function(value, offset) {
	        var relative = typeof offset === 'undefined';
	        if (relative) offset = this.offset;
	        if (!this.noAssert) {
	            if (typeof value !== 'number' || value % 1 !== 0)
	                throw TypeError("Illegal value: "+value+" (not an integer)");
	            value |= 0;
	            if (typeof offset !== 'number' || offset % 1 !== 0)
	                throw TypeError("Illegal offset: "+offset+" (not an integer)");
	            offset >>>= 0;
	            if (offset < 0 || offset + 0 > this.buffer.byteLength)
	                throw RangeError("Illegal offset: 0 <= "+offset+" (+"+0+") <= "+this.buffer.byteLength);
	        }
	        offset += 1;
	        var capacity0 = this.buffer.byteLength;
	        if (offset > capacity0)
	            this.resize((capacity0 *= 2) > offset ? capacity0 : offset);
	        offset -= 1;
	        this.view[offset] = value;
	        if (relative) this.offset += 1;
	        return this;
	    };

	    /**
	     * Writes an 8bit signed integer. This is an alias of {@link ByteBuffer#writeInt8}.
	     * @function
	     * @param {number} value Value to write
	     * @param {number=} offset Offset to write to. Will use and advance {@link ByteBuffer#offset} by `1` if omitted.
	     * @returns {!ByteBuffer} this
	     * @expose
	     */
	    ByteBufferPrototype.writeByte = ByteBufferPrototype.writeInt8;

	    /**
	     * Reads an 8bit signed integer.
	     * @param {number=} offset Offset to read from. Will use and advance {@link ByteBuffer#offset} by `1` if omitted.
	     * @returns {number} Value read
	     * @expose
	     */
	    ByteBufferPrototype.readInt8 = function(offset) {
	        var relative = typeof offset === 'undefined';
	        if (relative) offset = this.offset;
	        if (!this.noAssert) {
	            if (typeof offset !== 'number' || offset % 1 !== 0)
	                throw TypeError("Illegal offset: "+offset+" (not an integer)");
	            offset >>>= 0;
	            if (offset < 0 || offset + 1 > this.buffer.byteLength)
	                throw RangeError("Illegal offset: 0 <= "+offset+" (+"+1+") <= "+this.buffer.byteLength);
	        }
	        var value = this.view[offset];
	        if ((value & 0x80) === 0x80) value = -(0xFF - value + 1); // Cast to signed
	        if (relative) this.offset += 1;
	        return value;
	    };

	    /**
	     * Reads an 8bit signed integer. This is an alias of {@link ByteBuffer#readInt8}.
	     * @function
	     * @param {number=} offset Offset to read from. Will use and advance {@link ByteBuffer#offset} by `1` if omitted.
	     * @returns {number} Value read
	     * @expose
	     */
	    ByteBufferPrototype.readByte = ByteBufferPrototype.readInt8;

	    /**
	     * Writes an 8bit unsigned integer.
	     * @param {number} value Value to write
	     * @param {number=} offset Offset to write to. Will use and advance {@link ByteBuffer#offset} by `1` if omitted.
	     * @returns {!ByteBuffer} this
	     * @expose
	     */
	    ByteBufferPrototype.writeUint8 = function(value, offset) {
	        var relative = typeof offset === 'undefined';
	        if (relative) offset = this.offset;
	        if (!this.noAssert) {
	            if (typeof value !== 'number' || value % 1 !== 0)
	                throw TypeError("Illegal value: "+value+" (not an integer)");
	            value >>>= 0;
	            if (typeof offset !== 'number' || offset % 1 !== 0)
	                throw TypeError("Illegal offset: "+offset+" (not an integer)");
	            offset >>>= 0;
	            if (offset < 0 || offset + 0 > this.buffer.byteLength)
	                throw RangeError("Illegal offset: 0 <= "+offset+" (+"+0+") <= "+this.buffer.byteLength);
	        }
	        offset += 1;
	        var capacity1 = this.buffer.byteLength;
	        if (offset > capacity1)
	            this.resize((capacity1 *= 2) > offset ? capacity1 : offset);
	        offset -= 1;
	        this.view[offset] = value;
	        if (relative) this.offset += 1;
	        return this;
	    };

	    /**
	     * Writes an 8bit unsigned integer. This is an alias of {@link ByteBuffer#writeUint8}.
	     * @function
	     * @param {number} value Value to write
	     * @param {number=} offset Offset to write to. Will use and advance {@link ByteBuffer#offset} by `1` if omitted.
	     * @returns {!ByteBuffer} this
	     * @expose
	     */
	    ByteBufferPrototype.writeUInt8 = ByteBufferPrototype.writeUint8;

	    /**
	     * Reads an 8bit unsigned integer.
	     * @param {number=} offset Offset to read from. Will use and advance {@link ByteBuffer#offset} by `1` if omitted.
	     * @returns {number} Value read
	     * @expose
	     */
	    ByteBufferPrototype.readUint8 = function(offset) {
	        var relative = typeof offset === 'undefined';
	        if (relative) offset = this.offset;
	        if (!this.noAssert) {
	            if (typeof offset !== 'number' || offset % 1 !== 0)
	                throw TypeError("Illegal offset: "+offset+" (not an integer)");
	            offset >>>= 0;
	            if (offset < 0 || offset + 1 > this.buffer.byteLength)
	                throw RangeError("Illegal offset: 0 <= "+offset+" (+"+1+") <= "+this.buffer.byteLength);
	        }
	        var value = this.view[offset];
	        if (relative) this.offset += 1;
	        return value;
	    };

	    /**
	     * Reads an 8bit unsigned integer. This is an alias of {@link ByteBuffer#readUint8}.
	     * @function
	     * @param {number=} offset Offset to read from. Will use and advance {@link ByteBuffer#offset} by `1` if omitted.
	     * @returns {number} Value read
	     * @expose
	     */
	    ByteBufferPrototype.readUInt8 = ByteBufferPrototype.readUint8;

	    // types/ints/int16

	    /**
	     * Writes a 16bit signed integer.
	     * @param {number} value Value to write
	     * @param {number=} offset Offset to write to. Will use and advance {@link ByteBuffer#offset} by `2` if omitted.
	     * @throws {TypeError} If `offset` or `value` is not a valid number
	     * @throws {RangeError} If `offset` is out of bounds
	     * @expose
	     */
	    ByteBufferPrototype.writeInt16 = function(value, offset) {
	        var relative = typeof offset === 'undefined';
	        if (relative) offset = this.offset;
	        if (!this.noAssert) {
	            if (typeof value !== 'number' || value % 1 !== 0)
	                throw TypeError("Illegal value: "+value+" (not an integer)");
	            value |= 0;
	            if (typeof offset !== 'number' || offset % 1 !== 0)
	                throw TypeError("Illegal offset: "+offset+" (not an integer)");
	            offset >>>= 0;
	            if (offset < 0 || offset + 0 > this.buffer.byteLength)
	                throw RangeError("Illegal offset: 0 <= "+offset+" (+"+0+") <= "+this.buffer.byteLength);
	        }
	        offset += 2;
	        var capacity2 = this.buffer.byteLength;
	        if (offset > capacity2)
	            this.resize((capacity2 *= 2) > offset ? capacity2 : offset);
	        offset -= 2;
	        if (this.littleEndian) {
	            this.view[offset+1] = (value & 0xFF00) >>> 8;
	            this.view[offset  ] =  value & 0x00FF;
	        } else {
	            this.view[offset]   = (value & 0xFF00) >>> 8;
	            this.view[offset+1] =  value & 0x00FF;
	        }
	        if (relative) this.offset += 2;
	        return this;
	    };

	    /**
	     * Writes a 16bit signed integer. This is an alias of {@link ByteBuffer#writeInt16}.
	     * @function
	     * @param {number} value Value to write
	     * @param {number=} offset Offset to write to. Will use and advance {@link ByteBuffer#offset} by `2` if omitted.
	     * @throws {TypeError} If `offset` or `value` is not a valid number
	     * @throws {RangeError} If `offset` is out of bounds
	     * @expose
	     */
	    ByteBufferPrototype.writeShort = ByteBufferPrototype.writeInt16;

	    /**
	     * Reads a 16bit signed integer.
	     * @param {number=} offset Offset to read from. Will use and advance {@link ByteBuffer#offset} by `2` if omitted.
	     * @returns {number} Value read
	     * @throws {TypeError} If `offset` is not a valid number
	     * @throws {RangeError} If `offset` is out of bounds
	     * @expose
	     */
	    ByteBufferPrototype.readInt16 = function(offset) {
	        var relative = typeof offset === 'undefined';
	        if (relative) offset = this.offset;
	        if (!this.noAssert) {
	            if (typeof offset !== 'number' || offset % 1 !== 0)
	                throw TypeError("Illegal offset: "+offset+" (not an integer)");
	            offset >>>= 0;
	            if (offset < 0 || offset + 2 > this.buffer.byteLength)
	                throw RangeError("Illegal offset: 0 <= "+offset+" (+"+2+") <= "+this.buffer.byteLength);
	        }
	        var value = 0;
	        if (this.littleEndian) {
	            value  = this.view[offset  ];
	            value |= this.view[offset+1] << 8;
	        } else {
	            value  = this.view[offset  ] << 8;
	            value |= this.view[offset+1];
	        }
	        if ((value & 0x8000) === 0x8000) value = -(0xFFFF - value + 1); // Cast to signed
	        if (relative) this.offset += 2;
	        return value;
	    };

	    /**
	     * Reads a 16bit signed integer. This is an alias of {@link ByteBuffer#readInt16}.
	     * @function
	     * @param {number=} offset Offset to read from. Will use and advance {@link ByteBuffer#offset} by `2` if omitted.
	     * @returns {number} Value read
	     * @throws {TypeError} If `offset` is not a valid number
	     * @throws {RangeError} If `offset` is out of bounds
	     * @expose
	     */
	    ByteBufferPrototype.readShort = ByteBufferPrototype.readInt16;

	    /**
	     * Writes a 16bit unsigned integer.
	     * @param {number} value Value to write
	     * @param {number=} offset Offset to write to. Will use and advance {@link ByteBuffer#offset} by `2` if omitted.
	     * @throws {TypeError} If `offset` or `value` is not a valid number
	     * @throws {RangeError} If `offset` is out of bounds
	     * @expose
	     */
	    ByteBufferPrototype.writeUint16 = function(value, offset) {
	        var relative = typeof offset === 'undefined';
	        if (relative) offset = this.offset;
	        if (!this.noAssert) {
	            if (typeof value !== 'number' || value % 1 !== 0)
	                throw TypeError("Illegal value: "+value+" (not an integer)");
	            value >>>= 0;
	            if (typeof offset !== 'number' || offset % 1 !== 0)
	                throw TypeError("Illegal offset: "+offset+" (not an integer)");
	            offset >>>= 0;
	            if (offset < 0 || offset + 0 > this.buffer.byteLength)
	                throw RangeError("Illegal offset: 0 <= "+offset+" (+"+0+") <= "+this.buffer.byteLength);
	        }
	        offset += 2;
	        var capacity3 = this.buffer.byteLength;
	        if (offset > capacity3)
	            this.resize((capacity3 *= 2) > offset ? capacity3 : offset);
	        offset -= 2;
	        if (this.littleEndian) {
	            this.view[offset+1] = (value & 0xFF00) >>> 8;
	            this.view[offset  ] =  value & 0x00FF;
	        } else {
	            this.view[offset]   = (value & 0xFF00) >>> 8;
	            this.view[offset+1] =  value & 0x00FF;
	        }
	        if (relative) this.offset += 2;
	        return this;
	    };

	    /**
	     * Writes a 16bit unsigned integer. This is an alias of {@link ByteBuffer#writeUint16}.
	     * @function
	     * @param {number} value Value to write
	     * @param {number=} offset Offset to write to. Will use and advance {@link ByteBuffer#offset} by `2` if omitted.
	     * @throws {TypeError} If `offset` or `value` is not a valid number
	     * @throws {RangeError} If `offset` is out of bounds
	     * @expose
	     */
	    ByteBufferPrototype.writeUInt16 = ByteBufferPrototype.writeUint16;

	    /**
	     * Reads a 16bit unsigned integer.
	     * @param {number=} offset Offset to read from. Will use and advance {@link ByteBuffer#offset} by `2` if omitted.
	     * @returns {number} Value read
	     * @throws {TypeError} If `offset` is not a valid number
	     * @throws {RangeError} If `offset` is out of bounds
	     * @expose
	     */
	    ByteBufferPrototype.readUint16 = function(offset) {
	        var relative = typeof offset === 'undefined';
	        if (relative) offset = this.offset;
	        if (!this.noAssert) {
	            if (typeof offset !== 'number' || offset % 1 !== 0)
	                throw TypeError("Illegal offset: "+offset+" (not an integer)");
	            offset >>>= 0;
	            if (offset < 0 || offset + 2 > this.buffer.byteLength)
	                throw RangeError("Illegal offset: 0 <= "+offset+" (+"+2+") <= "+this.buffer.byteLength);
	        }
	        var value = 0;
	        if (this.littleEndian) {
	            value  = this.view[offset  ];
	            value |= this.view[offset+1] << 8;
	        } else {
	            value  = this.view[offset  ] << 8;
	            value |= this.view[offset+1];
	        }
	        if (relative) this.offset += 2;
	        return value;
	    };

	    /**
	     * Reads a 16bit unsigned integer. This is an alias of {@link ByteBuffer#readUint16}.
	     * @function
	     * @param {number=} offset Offset to read from. Will use and advance {@link ByteBuffer#offset} by `2` if omitted.
	     * @returns {number} Value read
	     * @throws {TypeError} If `offset` is not a valid number
	     * @throws {RangeError} If `offset` is out of bounds
	     * @expose
	     */
	    ByteBufferPrototype.readUInt16 = ByteBufferPrototype.readUint16;

	    // types/ints/int32

	    /**
	     * Writes a 32bit signed integer.
	     * @param {number} value Value to write
	     * @param {number=} offset Offset to write to. Will use and increase {@link ByteBuffer#offset} by `4` if omitted.
	     * @expose
	     */
	    ByteBufferPrototype.writeInt32 = function(value, offset) {
	        var relative = typeof offset === 'undefined';
	        if (relative) offset = this.offset;
	        if (!this.noAssert) {
	            if (typeof value !== 'number' || value % 1 !== 0)
	                throw TypeError("Illegal value: "+value+" (not an integer)");
	            value |= 0;
	            if (typeof offset !== 'number' || offset % 1 !== 0)
	                throw TypeError("Illegal offset: "+offset+" (not an integer)");
	            offset >>>= 0;
	            if (offset < 0 || offset + 0 > this.buffer.byteLength)
	                throw RangeError("Illegal offset: 0 <= "+offset+" (+"+0+") <= "+this.buffer.byteLength);
	        }
	        offset += 4;
	        var capacity4 = this.buffer.byteLength;
	        if (offset > capacity4)
	            this.resize((capacity4 *= 2) > offset ? capacity4 : offset);
	        offset -= 4;
	        if (this.littleEndian) {
	            this.view[offset+3] = (value >>> 24) & 0xFF;
	            this.view[offset+2] = (value >>> 16) & 0xFF;
	            this.view[offset+1] = (value >>>  8) & 0xFF;
	            this.view[offset  ] =  value         & 0xFF;
	        } else {
	            this.view[offset  ] = (value >>> 24) & 0xFF;
	            this.view[offset+1] = (value >>> 16) & 0xFF;
	            this.view[offset+2] = (value >>>  8) & 0xFF;
	            this.view[offset+3] =  value         & 0xFF;
	        }
	        if (relative) this.offset += 4;
	        return this;
	    };

	    /**
	     * Writes a 32bit signed integer. This is an alias of {@link ByteBuffer#writeInt32}.
	     * @param {number} value Value to write
	     * @param {number=} offset Offset to write to. Will use and increase {@link ByteBuffer#offset} by `4` if omitted.
	     * @expose
	     */
	    ByteBufferPrototype.writeInt = ByteBufferPrototype.writeInt32;

	    /**
	     * Reads a 32bit signed integer.
	     * @param {number=} offset Offset to read from. Will use and increase {@link ByteBuffer#offset} by `4` if omitted.
	     * @returns {number} Value read
	     * @expose
	     */
	    ByteBufferPrototype.readInt32 = function(offset) {
	        var relative = typeof offset === 'undefined';
	        if (relative) offset = this.offset;
	        if (!this.noAssert) {
	            if (typeof offset !== 'number' || offset % 1 !== 0)
	                throw TypeError("Illegal offset: "+offset+" (not an integer)");
	            offset >>>= 0;
	            if (offset < 0 || offset + 4 > this.buffer.byteLength)
	                throw RangeError("Illegal offset: 0 <= "+offset+" (+"+4+") <= "+this.buffer.byteLength);
	        }
	        var value = 0;
	        if (this.littleEndian) {
	            value  = this.view[offset+2] << 16;
	            value |= this.view[offset+1] <<  8;
	            value |= this.view[offset  ];
	            value += this.view[offset+3] << 24 >>> 0;
	        } else {
	            value  = this.view[offset+1] << 16;
	            value |= this.view[offset+2] <<  8;
	            value |= this.view[offset+3];
	            value += this.view[offset  ] << 24 >>> 0;
	        }
	        value |= 0; // Cast to signed
	        if (relative) this.offset += 4;
	        return value;
	    };

	    /**
	     * Reads a 32bit signed integer. This is an alias of {@link ByteBuffer#readInt32}.
	     * @param {number=} offset Offset to read from. Will use and advance {@link ByteBuffer#offset} by `4` if omitted.
	     * @returns {number} Value read
	     * @expose
	     */
	    ByteBufferPrototype.readInt = ByteBufferPrototype.readInt32;

	    /**
	     * Writes a 32bit unsigned integer.
	     * @param {number} value Value to write
	     * @param {number=} offset Offset to write to. Will use and increase {@link ByteBuffer#offset} by `4` if omitted.
	     * @expose
	     */
	    ByteBufferPrototype.writeUint32 = function(value, offset) {
	        var relative = typeof offset === 'undefined';
	        if (relative) offset = this.offset;
	        if (!this.noAssert) {
	            if (typeof value !== 'number' || value % 1 !== 0)
	                throw TypeError("Illegal value: "+value+" (not an integer)");
	            value >>>= 0;
	            if (typeof offset !== 'number' || offset % 1 !== 0)
	                throw TypeError("Illegal offset: "+offset+" (not an integer)");
	            offset >>>= 0;
	            if (offset < 0 || offset + 0 > this.buffer.byteLength)
	                throw RangeError("Illegal offset: 0 <= "+offset+" (+"+0+") <= "+this.buffer.byteLength);
	        }
	        offset += 4;
	        var capacity5 = this.buffer.byteLength;
	        if (offset > capacity5)
	            this.resize((capacity5 *= 2) > offset ? capacity5 : offset);
	        offset -= 4;
	        if (this.littleEndian) {
	            this.view[offset+3] = (value >>> 24) & 0xFF;
	            this.view[offset+2] = (value >>> 16) & 0xFF;
	            this.view[offset+1] = (value >>>  8) & 0xFF;
	            this.view[offset  ] =  value         & 0xFF;
	        } else {
	            this.view[offset  ] = (value >>> 24) & 0xFF;
	            this.view[offset+1] = (value >>> 16) & 0xFF;
	            this.view[offset+2] = (value >>>  8) & 0xFF;
	            this.view[offset+3] =  value         & 0xFF;
	        }
	        if (relative) this.offset += 4;
	        return this;
	    };

	    /**
	     * Writes a 32bit unsigned integer. This is an alias of {@link ByteBuffer#writeUint32}.
	     * @function
	     * @param {number} value Value to write
	     * @param {number=} offset Offset to write to. Will use and increase {@link ByteBuffer#offset} by `4` if omitted.
	     * @expose
	     */
	    ByteBufferPrototype.writeUInt32 = ByteBufferPrototype.writeUint32;

	    /**
	     * Reads a 32bit unsigned integer.
	     * @param {number=} offset Offset to read from. Will use and increase {@link ByteBuffer#offset} by `4` if omitted.
	     * @returns {number} Value read
	     * @expose
	     */
	    ByteBufferPrototype.readUint32 = function(offset) {
	        var relative = typeof offset === 'undefined';
	        if (relative) offset = this.offset;
	        if (!this.noAssert) {
	            if (typeof offset !== 'number' || offset % 1 !== 0)
	                throw TypeError("Illegal offset: "+offset+" (not an integer)");
	            offset >>>= 0;
	            if (offset < 0 || offset + 4 > this.buffer.byteLength)
	                throw RangeError("Illegal offset: 0 <= "+offset+" (+"+4+") <= "+this.buffer.byteLength);
	        }
	        var value = 0;
	        if (this.littleEndian) {
	            value  = this.view[offset+2] << 16;
	            value |= this.view[offset+1] <<  8;
	            value |= this.view[offset  ];
	            value += this.view[offset+3] << 24 >>> 0;
	        } else {
	            value  = this.view[offset+1] << 16;
	            value |= this.view[offset+2] <<  8;
	            value |= this.view[offset+3];
	            value += this.view[offset  ] << 24 >>> 0;
	        }
	        if (relative) this.offset += 4;
	        return value;
	    };

	    /**
	     * Reads a 32bit unsigned integer. This is an alias of {@link ByteBuffer#readUint32}.
	     * @function
	     * @param {number=} offset Offset to read from. Will use and increase {@link ByteBuffer#offset} by `4` if omitted.
	     * @returns {number} Value read
	     * @expose
	     */
	    ByteBufferPrototype.readUInt32 = ByteBufferPrototype.readUint32;

	    // types/ints/int64

	    if (Long) {

	        /**
	         * Writes a 64bit signed integer.
	         * @param {number|!Long} value Value to write
	         * @param {number=} offset Offset to write to. Will use and increase {@link ByteBuffer#offset} by `8` if omitted.
	         * @returns {!ByteBuffer} this
	         * @expose
	         */
	        ByteBufferPrototype.writeInt64 = function(value, offset) {
	            var relative = typeof offset === 'undefined';
	            if (relative) offset = this.offset;
	            if (!this.noAssert) {
	                if (typeof value === 'number')
	                    value = Long.fromNumber(value);
	                else if (typeof value === 'string')
	                    value = Long.fromString(value);
	                else if (!(value && value instanceof Long))
	                    throw TypeError("Illegal value: "+value+" (not an integer or Long)");
	                if (typeof offset !== 'number' || offset % 1 !== 0)
	                    throw TypeError("Illegal offset: "+offset+" (not an integer)");
	                offset >>>= 0;
	                if (offset < 0 || offset + 0 > this.buffer.byteLength)
	                    throw RangeError("Illegal offset: 0 <= "+offset+" (+"+0+") <= "+this.buffer.byteLength);
	            }
	            if (typeof value === 'number')
	                value = Long.fromNumber(value);
	            else if (typeof value === 'string')
	                value = Long.fromString(value);
	            offset += 8;
	            var capacity6 = this.buffer.byteLength;
	            if (offset > capacity6)
	                this.resize((capacity6 *= 2) > offset ? capacity6 : offset);
	            offset -= 8;
	            var lo = value.low,
	                hi = value.high;
	            if (this.littleEndian) {
	                this.view[offset+3] = (lo >>> 24) & 0xFF;
	                this.view[offset+2] = (lo >>> 16) & 0xFF;
	                this.view[offset+1] = (lo >>>  8) & 0xFF;
	                this.view[offset  ] =  lo         & 0xFF;
	                offset += 4;
	                this.view[offset+3] = (hi >>> 24) & 0xFF;
	                this.view[offset+2] = (hi >>> 16) & 0xFF;
	                this.view[offset+1] = (hi >>>  8) & 0xFF;
	                this.view[offset  ] =  hi         & 0xFF;
	            } else {
	                this.view[offset  ] = (hi >>> 24) & 0xFF;
	                this.view[offset+1] = (hi >>> 16) & 0xFF;
	                this.view[offset+2] = (hi >>>  8) & 0xFF;
	                this.view[offset+3] =  hi         & 0xFF;
	                offset += 4;
	                this.view[offset  ] = (lo >>> 24) & 0xFF;
	                this.view[offset+1] = (lo >>> 16) & 0xFF;
	                this.view[offset+2] = (lo >>>  8) & 0xFF;
	                this.view[offset+3] =  lo         & 0xFF;
	            }
	            if (relative) this.offset += 8;
	            return this;
	        };

	        /**
	         * Writes a 64bit signed integer. This is an alias of {@link ByteBuffer#writeInt64}.
	         * @param {number|!Long} value Value to write
	         * @param {number=} offset Offset to write to. Will use and increase {@link ByteBuffer#offset} by `8` if omitted.
	         * @returns {!ByteBuffer} this
	         * @expose
	         */
	        ByteBufferPrototype.writeLong = ByteBufferPrototype.writeInt64;

	        /**
	         * Reads a 64bit signed integer.
	         * @param {number=} offset Offset to read from. Will use and increase {@link ByteBuffer#offset} by `8` if omitted.
	         * @returns {!Long}
	         * @expose
	         */
	        ByteBufferPrototype.readInt64 = function(offset) {
	            var relative = typeof offset === 'undefined';
	            if (relative) offset = this.offset;
	            if (!this.noAssert) {
	                if (typeof offset !== 'number' || offset % 1 !== 0)
	                    throw TypeError("Illegal offset: "+offset+" (not an integer)");
	                offset >>>= 0;
	                if (offset < 0 || offset + 8 > this.buffer.byteLength)
	                    throw RangeError("Illegal offset: 0 <= "+offset+" (+"+8+") <= "+this.buffer.byteLength);
	            }
	            var lo = 0,
	                hi = 0;
	            if (this.littleEndian) {
	                lo  = this.view[offset+2] << 16;
	                lo |= this.view[offset+1] <<  8;
	                lo |= this.view[offset  ];
	                lo += this.view[offset+3] << 24 >>> 0;
	                offset += 4;
	                hi  = this.view[offset+2] << 16;
	                hi |= this.view[offset+1] <<  8;
	                hi |= this.view[offset  ];
	                hi += this.view[offset+3] << 24 >>> 0;
	            } else {
	                hi  = this.view[offset+1] << 16;
	                hi |= this.view[offset+2] <<  8;
	                hi |= this.view[offset+3];
	                hi += this.view[offset  ] << 24 >>> 0;
	                offset += 4;
	                lo  = this.view[offset+1] << 16;
	                lo |= this.view[offset+2] <<  8;
	                lo |= this.view[offset+3];
	                lo += this.view[offset  ] << 24 >>> 0;
	            }
	            var value = new Long(lo, hi, false);
	            if (relative) this.offset += 8;
	            return value;
	        };

	        /**
	         * Reads a 64bit signed integer. This is an alias of {@link ByteBuffer#readInt64}.
	         * @param {number=} offset Offset to read from. Will use and increase {@link ByteBuffer#offset} by `8` if omitted.
	         * @returns {!Long}
	         * @expose
	         */
	        ByteBufferPrototype.readLong = ByteBufferPrototype.readInt64;

	        /**
	         * Writes a 64bit unsigned integer.
	         * @param {number|!Long} value Value to write
	         * @param {number=} offset Offset to write to. Will use and increase {@link ByteBuffer#offset} by `8` if omitted.
	         * @returns {!ByteBuffer} this
	         * @expose
	         */
	        ByteBufferPrototype.writeUint64 = function(value, offset) {
	            var relative = typeof offset === 'undefined';
	            if (relative) offset = this.offset;
	            if (!this.noAssert) {
	                if (typeof value === 'number')
	                    value = Long.fromNumber(value);
	                else if (typeof value === 'string')
	                    value = Long.fromString(value);
	                else if (!(value && value instanceof Long))
	                    throw TypeError("Illegal value: "+value+" (not an integer or Long)");
	                if (typeof offset !== 'number' || offset % 1 !== 0)
	                    throw TypeError("Illegal offset: "+offset+" (not an integer)");
	                offset >>>= 0;
	                if (offset < 0 || offset + 0 > this.buffer.byteLength)
	                    throw RangeError("Illegal offset: 0 <= "+offset+" (+"+0+") <= "+this.buffer.byteLength);
	            }
	            if (typeof value === 'number')
	                value = Long.fromNumber(value);
	            else if (typeof value === 'string')
	                value = Long.fromString(value);
	            offset += 8;
	            var capacity7 = this.buffer.byteLength;
	            if (offset > capacity7)
	                this.resize((capacity7 *= 2) > offset ? capacity7 : offset);
	            offset -= 8;
	            var lo = value.low,
	                hi = value.high;
	            if (this.littleEndian) {
	                this.view[offset+3] = (lo >>> 24) & 0xFF;
	                this.view[offset+2] = (lo >>> 16) & 0xFF;
	                this.view[offset+1] = (lo >>>  8) & 0xFF;
	                this.view[offset  ] =  lo         & 0xFF;
	                offset += 4;
	                this.view[offset+3] = (hi >>> 24) & 0xFF;
	                this.view[offset+2] = (hi >>> 16) & 0xFF;
	                this.view[offset+1] = (hi >>>  8) & 0xFF;
	                this.view[offset  ] =  hi         & 0xFF;
	            } else {
	                this.view[offset  ] = (hi >>> 24) & 0xFF;
	                this.view[offset+1] = (hi >>> 16) & 0xFF;
	                this.view[offset+2] = (hi >>>  8) & 0xFF;
	                this.view[offset+3] =  hi         & 0xFF;
	                offset += 4;
	                this.view[offset  ] = (lo >>> 24) & 0xFF;
	                this.view[offset+1] = (lo >>> 16) & 0xFF;
	                this.view[offset+2] = (lo >>>  8) & 0xFF;
	                this.view[offset+3] =  lo         & 0xFF;
	            }
	            if (relative) this.offset += 8;
	            return this;
	        };

	        /**
	         * Writes a 64bit unsigned integer. This is an alias of {@link ByteBuffer#writeUint64}.
	         * @function
	         * @param {number|!Long} value Value to write
	         * @param {number=} offset Offset to write to. Will use and increase {@link ByteBuffer#offset} by `8` if omitted.
	         * @returns {!ByteBuffer} this
	         * @expose
	         */
	        ByteBufferPrototype.writeUInt64 = ByteBufferPrototype.writeUint64;

	        /**
	         * Reads a 64bit unsigned integer.
	         * @param {number=} offset Offset to read from. Will use and increase {@link ByteBuffer#offset} by `8` if omitted.
	         * @returns {!Long}
	         * @expose
	         */
	        ByteBufferPrototype.readUint64 = function(offset) {
	            var relative = typeof offset === 'undefined';
	            if (relative) offset = this.offset;
	            if (!this.noAssert) {
	                if (typeof offset !== 'number' || offset % 1 !== 0)
	                    throw TypeError("Illegal offset: "+offset+" (not an integer)");
	                offset >>>= 0;
	                if (offset < 0 || offset + 8 > this.buffer.byteLength)
	                    throw RangeError("Illegal offset: 0 <= "+offset+" (+"+8+") <= "+this.buffer.byteLength);
	            }
	            var lo = 0,
	                hi = 0;
	            if (this.littleEndian) {
	                lo  = this.view[offset+2] << 16;
	                lo |= this.view[offset+1] <<  8;
	                lo |= this.view[offset  ];
	                lo += this.view[offset+3] << 24 >>> 0;
	                offset += 4;
	                hi  = this.view[offset+2] << 16;
	                hi |= this.view[offset+1] <<  8;
	                hi |= this.view[offset  ];
	                hi += this.view[offset+3] << 24 >>> 0;
	            } else {
	                hi  = this.view[offset+1] << 16;
	                hi |= this.view[offset+2] <<  8;
	                hi |= this.view[offset+3];
	                hi += this.view[offset  ] << 24 >>> 0;
	                offset += 4;
	                lo  = this.view[offset+1] << 16;
	                lo |= this.view[offset+2] <<  8;
	                lo |= this.view[offset+3];
	                lo += this.view[offset  ] << 24 >>> 0;
	            }
	            var value = new Long(lo, hi, true);
	            if (relative) this.offset += 8;
	            return value;
	        };

	        /**
	         * Reads a 64bit unsigned integer. This is an alias of {@link ByteBuffer#readUint64}.
	         * @function
	         * @param {number=} offset Offset to read from. Will use and increase {@link ByteBuffer#offset} by `8` if omitted.
	         * @returns {!Long}
	         * @expose
	         */
	        ByteBufferPrototype.readUInt64 = ByteBufferPrototype.readUint64;

	    } // Long


	    // types/floats/float32

	    /*
	     ieee754 - https://github.com/feross/ieee754

	     The MIT License (MIT)

	     Copyright (c) Feross Aboukhadijeh

	     Permission is hereby granted, free of charge, to any person obtaining a copy
	     of this software and associated documentation files (the "Software"), to deal
	     in the Software without restriction, including without limitation the rights
	     to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
	     copies of the Software, and to permit persons to whom the Software is
	     furnished to do so, subject to the following conditions:

	     The above copyright notice and this permission notice shall be included in
	     all copies or substantial portions of the Software.

	     THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
	     IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
	     FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
	     AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
	     LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
	     OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
	     THE SOFTWARE.
	    */

	    /**
	     * Reads an IEEE754 float from a byte array.
	     * @param {!Array} buffer
	     * @param {number} offset
	     * @param {boolean} isLE
	     * @param {number} mLen
	     * @param {number} nBytes
	     * @returns {number}
	     * @inner
	     */
	    function ieee754_read(buffer, offset, isLE, mLen, nBytes) {
	        var e, m,
	            eLen = nBytes * 8 - mLen - 1,
	            eMax = (1 << eLen) - 1,
	            eBias = eMax >> 1,
	            nBits = -7,
	            i = isLE ? (nBytes - 1) : 0,
	            d = isLE ? -1 : 1,
	            s = buffer[offset + i];

	        i += d;

	        e = s & ((1 << (-nBits)) - 1);
	        s >>= (-nBits);
	        nBits += eLen;
	        for (; nBits > 0; e = e * 256 + buffer[offset + i], i += d, nBits -= 8) {}

	        m = e & ((1 << (-nBits)) - 1);
	        e >>= (-nBits);
	        nBits += mLen;
	        for (; nBits > 0; m = m * 256 + buffer[offset + i], i += d, nBits -= 8) {}

	        if (e === 0) {
	            e = 1 - eBias;
	        } else if (e === eMax) {
	            return m ? NaN : ((s ? -1 : 1) * Infinity);
	        } else {
	            m = m + Math.pow(2, mLen);
	            e = e - eBias;
	        }
	        return (s ? -1 : 1) * m * Math.pow(2, e - mLen);
	    }

	    /**
	     * Writes an IEEE754 float to a byte array.
	     * @param {!Array} buffer
	     * @param {number} value
	     * @param {number} offset
	     * @param {boolean} isLE
	     * @param {number} mLen
	     * @param {number} nBytes
	     * @inner
	     */
	    function ieee754_write(buffer, value, offset, isLE, mLen, nBytes) {
	        var e, m, c,
	            eLen = nBytes * 8 - mLen - 1,
	            eMax = (1 << eLen) - 1,
	            eBias = eMax >> 1,
	            rt = (mLen === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0),
	            i = isLE ? 0 : (nBytes - 1),
	            d = isLE ? 1 : -1,
	            s = value < 0 || (value === 0 && 1 / value < 0) ? 1 : 0;

	        value = Math.abs(value);

	        if (isNaN(value) || value === Infinity) {
	            m = isNaN(value) ? 1 : 0;
	            e = eMax;
	        } else {
	            e = Math.floor(Math.log(value) / Math.LN2);
	            if (value * (c = Math.pow(2, -e)) < 1) {
	                e--;
	                c *= 2;
	            }
	            if (e + eBias >= 1) {
	                value += rt / c;
	            } else {
	                value += rt * Math.pow(2, 1 - eBias);
	            }
	            if (value * c >= 2) {
	                e++;
	                c /= 2;
	            }

	            if (e + eBias >= eMax) {
	                m = 0;
	                e = eMax;
	            } else if (e + eBias >= 1) {
	                m = (value * c - 1) * Math.pow(2, mLen);
	                e = e + eBias;
	            } else {
	                m = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen);
	                e = 0;
	            }
	        }

	        for (; mLen >= 8; buffer[offset + i] = m & 0xff, i += d, m /= 256, mLen -= 8) {}

	        e = (e << mLen) | m;
	        eLen += mLen;
	        for (; eLen > 0; buffer[offset + i] = e & 0xff, i += d, e /= 256, eLen -= 8) {}

	        buffer[offset + i - d] |= s * 128;
	    }

	    /**
	     * Writes a 32bit float.
	     * @param {number} value Value to write
	     * @param {number=} offset Offset to write to. Will use and increase {@link ByteBuffer#offset} by `4` if omitted.
	     * @returns {!ByteBuffer} this
	     * @expose
	     */
	    ByteBufferPrototype.writeFloat32 = function(value, offset) {
	        var relative = typeof offset === 'undefined';
	        if (relative) offset = this.offset;
	        if (!this.noAssert) {
	            if (typeof value !== 'number')
	                throw TypeError("Illegal value: "+value+" (not a number)");
	            if (typeof offset !== 'number' || offset % 1 !== 0)
	                throw TypeError("Illegal offset: "+offset+" (not an integer)");
	            offset >>>= 0;
	            if (offset < 0 || offset + 0 > this.buffer.byteLength)
	                throw RangeError("Illegal offset: 0 <= "+offset+" (+"+0+") <= "+this.buffer.byteLength);
	        }
	        offset += 4;
	        var capacity8 = this.buffer.byteLength;
	        if (offset > capacity8)
	            this.resize((capacity8 *= 2) > offset ? capacity8 : offset);
	        offset -= 4;
	        ieee754_write(this.view, value, offset, this.littleEndian, 23, 4);
	        if (relative) this.offset += 4;
	        return this;
	    };

	    /**
	     * Writes a 32bit float. This is an alias of {@link ByteBuffer#writeFloat32}.
	     * @function
	     * @param {number} value Value to write
	     * @param {number=} offset Offset to write to. Will use and increase {@link ByteBuffer#offset} by `4` if omitted.
	     * @returns {!ByteBuffer} this
	     * @expose
	     */
	    ByteBufferPrototype.writeFloat = ByteBufferPrototype.writeFloat32;

	    /**
	     * Reads a 32bit float.
	     * @param {number=} offset Offset to read from. Will use and increase {@link ByteBuffer#offset} by `4` if omitted.
	     * @returns {number}
	     * @expose
	     */
	    ByteBufferPrototype.readFloat32 = function(offset) {
	        var relative = typeof offset === 'undefined';
	        if (relative) offset = this.offset;
	        if (!this.noAssert) {
	            if (typeof offset !== 'number' || offset % 1 !== 0)
	                throw TypeError("Illegal offset: "+offset+" (not an integer)");
	            offset >>>= 0;
	            if (offset < 0 || offset + 4 > this.buffer.byteLength)
	                throw RangeError("Illegal offset: 0 <= "+offset+" (+"+4+") <= "+this.buffer.byteLength);
	        }
	        var value = ieee754_read(this.view, offset, this.littleEndian, 23, 4);
	        if (relative) this.offset += 4;
	        return value;
	    };

	    /**
	     * Reads a 32bit float. This is an alias of {@link ByteBuffer#readFloat32}.
	     * @function
	     * @param {number=} offset Offset to read from. Will use and increase {@link ByteBuffer#offset} by `4` if omitted.
	     * @returns {number}
	     * @expose
	     */
	    ByteBufferPrototype.readFloat = ByteBufferPrototype.readFloat32;

	    // types/floats/float64

	    /**
	     * Writes a 64bit float.
	     * @param {number} value Value to write
	     * @param {number=} offset Offset to write to. Will use and increase {@link ByteBuffer#offset} by `8` if omitted.
	     * @returns {!ByteBuffer} this
	     * @expose
	     */
	    ByteBufferPrototype.writeFloat64 = function(value, offset) {
	        var relative = typeof offset === 'undefined';
	        if (relative) offset = this.offset;
	        if (!this.noAssert) {
	            if (typeof value !== 'number')
	                throw TypeError("Illegal value: "+value+" (not a number)");
	            if (typeof offset !== 'number' || offset % 1 !== 0)
	                throw TypeError("Illegal offset: "+offset+" (not an integer)");
	            offset >>>= 0;
	            if (offset < 0 || offset + 0 > this.buffer.byteLength)
	                throw RangeError("Illegal offset: 0 <= "+offset+" (+"+0+") <= "+this.buffer.byteLength);
	        }
	        offset += 8;
	        var capacity9 = this.buffer.byteLength;
	        if (offset > capacity9)
	            this.resize((capacity9 *= 2) > offset ? capacity9 : offset);
	        offset -= 8;
	        ieee754_write(this.view, value, offset, this.littleEndian, 52, 8);
	        if (relative) this.offset += 8;
	        return this;
	    };

	    /**
	     * Writes a 64bit float. This is an alias of {@link ByteBuffer#writeFloat64}.
	     * @function
	     * @param {number} value Value to write
	     * @param {number=} offset Offset to write to. Will use and increase {@link ByteBuffer#offset} by `8` if omitted.
	     * @returns {!ByteBuffer} this
	     * @expose
	     */
	    ByteBufferPrototype.writeDouble = ByteBufferPrototype.writeFloat64;

	    /**
	     * Reads a 64bit float.
	     * @param {number=} offset Offset to read from. Will use and increase {@link ByteBuffer#offset} by `8` if omitted.
	     * @returns {number}
	     * @expose
	     */
	    ByteBufferPrototype.readFloat64 = function(offset) {
	        var relative = typeof offset === 'undefined';
	        if (relative) offset = this.offset;
	        if (!this.noAssert) {
	            if (typeof offset !== 'number' || offset % 1 !== 0)
	                throw TypeError("Illegal offset: "+offset+" (not an integer)");
	            offset >>>= 0;
	            if (offset < 0 || offset + 8 > this.buffer.byteLength)
	                throw RangeError("Illegal offset: 0 <= "+offset+" (+"+8+") <= "+this.buffer.byteLength);
	        }
	        var value = ieee754_read(this.view, offset, this.littleEndian, 52, 8);
	        if (relative) this.offset += 8;
	        return value;
	    };

	    /**
	     * Reads a 64bit float. This is an alias of {@link ByteBuffer#readFloat64}.
	     * @function
	     * @param {number=} offset Offset to read from. Will use and increase {@link ByteBuffer#offset} by `8` if omitted.
	     * @returns {number}
	     * @expose
	     */
	    ByteBufferPrototype.readDouble = ByteBufferPrototype.readFloat64;


	    // types/varints/varint32

	    /**
	     * Maximum number of bytes required to store a 32bit base 128 variable-length integer.
	     * @type {number}
	     * @const
	     * @expose
	     */
	    ByteBuffer.MAX_VARINT32_BYTES = 5;

	    /**
	     * Calculates the actual number of bytes required to store a 32bit base 128 variable-length integer.
	     * @param {number} value Value to encode
	     * @returns {number} Number of bytes required. Capped to {@link ByteBuffer.MAX_VARINT32_BYTES}
	     * @expose
	     */
	    ByteBuffer.calculateVarint32 = function(value) {
	        // ref: src/google/protobuf/io/coded_stream.cc
	        value = value >>> 0;
	             if (value < 1 << 7 ) return 1;
	        else if (value < 1 << 14) return 2;
	        else if (value < 1 << 21) return 3;
	        else if (value < 1 << 28) return 4;
	        else                      return 5;
	    };

	    /**
	     * Zigzag encodes a signed 32bit integer so that it can be effectively used with varint encoding.
	     * @param {number} n Signed 32bit integer
	     * @returns {number} Unsigned zigzag encoded 32bit integer
	     * @expose
	     */
	    ByteBuffer.zigZagEncode32 = function(n) {
	        return (((n |= 0) << 1) ^ (n >> 31)) >>> 0; // ref: src/google/protobuf/wire_format_lite.h
	    };

	    /**
	     * Decodes a zigzag encoded signed 32bit integer.
	     * @param {number} n Unsigned zigzag encoded 32bit integer
	     * @returns {number} Signed 32bit integer
	     * @expose
	     */
	    ByteBuffer.zigZagDecode32 = function(n) {
	        return ((n >>> 1) ^ -(n & 1)) | 0; // // ref: src/google/protobuf/wire_format_lite.h
	    };

	    /**
	     * Writes a 32bit base 128 variable-length integer.
	     * @param {number} value Value to write
	     * @param {number=} offset Offset to write to. Will use and increase {@link ByteBuffer#offset} by the number of bytes
	     *  written if omitted.
	     * @returns {!ByteBuffer|number} this if `offset` is omitted, else the actual number of bytes written
	     * @expose
	     */
	    ByteBufferPrototype.writeVarint32 = function(value, offset) {
	        var relative = typeof offset === 'undefined';
	        if (relative) offset = this.offset;
	        if (!this.noAssert) {
	            if (typeof value !== 'number' || value % 1 !== 0)
	                throw TypeError("Illegal value: "+value+" (not an integer)");
	            value |= 0;
	            if (typeof offset !== 'number' || offset % 1 !== 0)
	                throw TypeError("Illegal offset: "+offset+" (not an integer)");
	            offset >>>= 0;
	            if (offset < 0 || offset + 0 > this.buffer.byteLength)
	                throw RangeError("Illegal offset: 0 <= "+offset+" (+"+0+") <= "+this.buffer.byteLength);
	        }
	        var size = ByteBuffer.calculateVarint32(value),
	            b;
	        offset += size;
	        var capacity10 = this.buffer.byteLength;
	        if (offset > capacity10)
	            this.resize((capacity10 *= 2) > offset ? capacity10 : offset);
	        offset -= size;
	        value >>>= 0;
	        while (value >= 0x80) {
	            b = (value & 0x7f) | 0x80;
	            this.view[offset++] = b;
	            value >>>= 7;
	        }
	        this.view[offset++] = value;
	        if (relative) {
	            this.offset = offset;
	            return this;
	        }
	        return size;
	    };

	    /**
	     * Writes a zig-zag encoded (signed) 32bit base 128 variable-length integer.
	     * @param {number} value Value to write
	     * @param {number=} offset Offset to write to. Will use and increase {@link ByteBuffer#offset} by the number of bytes
	     *  written if omitted.
	     * @returns {!ByteBuffer|number} this if `offset` is omitted, else the actual number of bytes written
	     * @expose
	     */
	    ByteBufferPrototype.writeVarint32ZigZag = function(value, offset) {
	        return this.writeVarint32(ByteBuffer.zigZagEncode32(value), offset);
	    };

	    /**
	     * Reads a 32bit base 128 variable-length integer.
	     * @param {number=} offset Offset to read from. Will use and increase {@link ByteBuffer#offset} by the number of bytes
	     *  written if omitted.
	     * @returns {number|!{value: number, length: number}} The value read if offset is omitted, else the value read
	     *  and the actual number of bytes read.
	     * @throws {Error} If it's not a valid varint. Has a property `truncated = true` if there is not enough data available
	     *  to fully decode the varint.
	     * @expose
	     */
	    ByteBufferPrototype.readVarint32 = function(offset) {
	        var relative = typeof offset === 'undefined';
	        if (relative) offset = this.offset;
	        if (!this.noAssert) {
	            if (typeof offset !== 'number' || offset % 1 !== 0)
	                throw TypeError("Illegal offset: "+offset+" (not an integer)");
	            offset >>>= 0;
	            if (offset < 0 || offset + 1 > this.buffer.byteLength)
	                throw RangeError("Illegal offset: 0 <= "+offset+" (+"+1+") <= "+this.buffer.byteLength);
	        }
	        var c = 0,
	            value = 0 >>> 0,
	            b;
	        do {
	            if (!this.noAssert && offset > this.limit) {
	                var err = Error("Truncated");
	                err['truncated'] = true;
	                throw err;
	            }
	            b = this.view[offset++];
	            if (c < 5)
	                value |= (b & 0x7f) << (7*c);
	            ++c;
	        } while ((b & 0x80) !== 0);
	        value |= 0;
	        if (relative) {
	            this.offset = offset;
	            return value;
	        }
	        return {
	            "value": value,
	            "length": c
	        };
	    };

	    /**
	     * Reads a zig-zag encoded (signed) 32bit base 128 variable-length integer.
	     * @param {number=} offset Offset to read from. Will use and increase {@link ByteBuffer#offset} by the number of bytes
	     *  written if omitted.
	     * @returns {number|!{value: number, length: number}} The value read if offset is omitted, else the value read
	     *  and the actual number of bytes read.
	     * @throws {Error} If it's not a valid varint
	     * @expose
	     */
	    ByteBufferPrototype.readVarint32ZigZag = function(offset) {
	        var val = this.readVarint32(offset);
	        if (typeof val === 'object')
	            val["value"] = ByteBuffer.zigZagDecode32(val["value"]);
	        else
	            val = ByteBuffer.zigZagDecode32(val);
	        return val;
	    };

	    // types/varints/varint64

	    if (Long) {

	        /**
	         * Maximum number of bytes required to store a 64bit base 128 variable-length integer.
	         * @type {number}
	         * @const
	         * @expose
	         */
	        ByteBuffer.MAX_VARINT64_BYTES = 10;

	        /**
	         * Calculates the actual number of bytes required to store a 64bit base 128 variable-length integer.
	         * @param {number|!Long} value Value to encode
	         * @returns {number} Number of bytes required. Capped to {@link ByteBuffer.MAX_VARINT64_BYTES}
	         * @expose
	         */
	        ByteBuffer.calculateVarint64 = function(value) {
	            if (typeof value === 'number')
	                value = Long.fromNumber(value);
	            else if (typeof value === 'string')
	                value = Long.fromString(value);
	            // ref: src/google/protobuf/io/coded_stream.cc
	            var part0 = value.toInt() >>> 0,
	                part1 = value.shiftRightUnsigned(28).toInt() >>> 0,
	                part2 = value.shiftRightUnsigned(56).toInt() >>> 0;
	            if (part2 == 0) {
	                if (part1 == 0) {
	                    if (part0 < 1 << 14)
	                        return part0 < 1 << 7 ? 1 : 2;
	                    else
	                        return part0 < 1 << 21 ? 3 : 4;
	                } else {
	                    if (part1 < 1 << 14)
	                        return part1 < 1 << 7 ? 5 : 6;
	                    else
	                        return part1 < 1 << 21 ? 7 : 8;
	                }
	            } else
	                return part2 < 1 << 7 ? 9 : 10;
	        };

	        /**
	         * Zigzag encodes a signed 64bit integer so that it can be effectively used with varint encoding.
	         * @param {number|!Long} value Signed long
	         * @returns {!Long} Unsigned zigzag encoded long
	         * @expose
	         */
	        ByteBuffer.zigZagEncode64 = function(value) {
	            if (typeof value === 'number')
	                value = Long.fromNumber(value, false);
	            else if (typeof value === 'string')
	                value = Long.fromString(value, false);
	            else if (value.unsigned !== false) value = value.toSigned();
	            // ref: src/google/protobuf/wire_format_lite.h
	            return value.shiftLeft(1).xor(value.shiftRight(63)).toUnsigned();
	        };

	        /**
	         * Decodes a zigzag encoded signed 64bit integer.
	         * @param {!Long|number} value Unsigned zigzag encoded long or JavaScript number
	         * @returns {!Long} Signed long
	         * @expose
	         */
	        ByteBuffer.zigZagDecode64 = function(value) {
	            if (typeof value === 'number')
	                value = Long.fromNumber(value, false);
	            else if (typeof value === 'string')
	                value = Long.fromString(value, false);
	            else if (value.unsigned !== false) value = value.toSigned();
	            // ref: src/google/protobuf/wire_format_lite.h
	            return value.shiftRightUnsigned(1).xor(value.and(Long.ONE).toSigned().negate()).toSigned();
	        };

	        /**
	         * Writes a 64bit base 128 variable-length integer.
	         * @param {number|Long} value Value to write
	         * @param {number=} offset Offset to write to. Will use and increase {@link ByteBuffer#offset} by the number of bytes
	         *  written if omitted.
	         * @returns {!ByteBuffer|number} `this` if offset is omitted, else the actual number of bytes written.
	         * @expose
	         */
	        ByteBufferPrototype.writeVarint64 = function(value, offset) {
	            var relative = typeof offset === 'undefined';
	            if (relative) offset = this.offset;
	            if (!this.noAssert) {
	                if (typeof value === 'number')
	                    value = Long.fromNumber(value);
	                else if (typeof value === 'string')
	                    value = Long.fromString(value);
	                else if (!(value && value instanceof Long))
	                    throw TypeError("Illegal value: "+value+" (not an integer or Long)");
	                if (typeof offset !== 'number' || offset % 1 !== 0)
	                    throw TypeError("Illegal offset: "+offset+" (not an integer)");
	                offset >>>= 0;
	                if (offset < 0 || offset + 0 > this.buffer.byteLength)
	                    throw RangeError("Illegal offset: 0 <= "+offset+" (+"+0+") <= "+this.buffer.byteLength);
	            }
	            if (typeof value === 'number')
	                value = Long.fromNumber(value, false);
	            else if (typeof value === 'string')
	                value = Long.fromString(value, false);
	            else if (value.unsigned !== false) value = value.toSigned();
	            var size = ByteBuffer.calculateVarint64(value),
	                part0 = value.toInt() >>> 0,
	                part1 = value.shiftRightUnsigned(28).toInt() >>> 0,
	                part2 = value.shiftRightUnsigned(56).toInt() >>> 0;
	            offset += size;
	            var capacity11 = this.buffer.byteLength;
	            if (offset > capacity11)
	                this.resize((capacity11 *= 2) > offset ? capacity11 : offset);
	            offset -= size;
	            switch (size) {
	                case 10: this.view[offset+9] = (part2 >>>  7) & 0x01;
	                case 9 : this.view[offset+8] = size !== 9 ? (part2       ) | 0x80 : (part2       ) & 0x7F;
	                case 8 : this.view[offset+7] = size !== 8 ? (part1 >>> 21) | 0x80 : (part1 >>> 21) & 0x7F;
	                case 7 : this.view[offset+6] = size !== 7 ? (part1 >>> 14) | 0x80 : (part1 >>> 14) & 0x7F;
	                case 6 : this.view[offset+5] = size !== 6 ? (part1 >>>  7) | 0x80 : (part1 >>>  7) & 0x7F;
	                case 5 : this.view[offset+4] = size !== 5 ? (part1       ) | 0x80 : (part1       ) & 0x7F;
	                case 4 : this.view[offset+3] = size !== 4 ? (part0 >>> 21) | 0x80 : (part0 >>> 21) & 0x7F;
	                case 3 : this.view[offset+2] = size !== 3 ? (part0 >>> 14) | 0x80 : (part0 >>> 14) & 0x7F;
	                case 2 : this.view[offset+1] = size !== 2 ? (part0 >>>  7) | 0x80 : (part0 >>>  7) & 0x7F;
	                case 1 : this.view[offset  ] = size !== 1 ? (part0       ) | 0x80 : (part0       ) & 0x7F;
	            }
	            if (relative) {
	                this.offset += size;
	                return this;
	            } else {
	                return size;
	            }
	        };

	        /**
	         * Writes a zig-zag encoded 64bit base 128 variable-length integer.
	         * @param {number|Long} value Value to write
	         * @param {number=} offset Offset to write to. Will use and increase {@link ByteBuffer#offset} by the number of bytes
	         *  written if omitted.
	         * @returns {!ByteBuffer|number} `this` if offset is omitted, else the actual number of bytes written.
	         * @expose
	         */
	        ByteBufferPrototype.writeVarint64ZigZag = function(value, offset) {
	            return this.writeVarint64(ByteBuffer.zigZagEncode64(value), offset);
	        };

	        /**
	         * Reads a 64bit base 128 variable-length integer. Requires Long.js.
	         * @param {number=} offset Offset to read from. Will use and increase {@link ByteBuffer#offset} by the number of bytes
	         *  read if omitted.
	         * @returns {!Long|!{value: Long, length: number}} The value read if offset is omitted, else the value read and
	         *  the actual number of bytes read.
	         * @throws {Error} If it's not a valid varint
	         * @expose
	         */
	        ByteBufferPrototype.readVarint64 = function(offset) {
	            var relative = typeof offset === 'undefined';
	            if (relative) offset = this.offset;
	            if (!this.noAssert) {
	                if (typeof offset !== 'number' || offset % 1 !== 0)
	                    throw TypeError("Illegal offset: "+offset+" (not an integer)");
	                offset >>>= 0;
	                if (offset < 0 || offset + 1 > this.buffer.byteLength)
	                    throw RangeError("Illegal offset: 0 <= "+offset+" (+"+1+") <= "+this.buffer.byteLength);
	            }
	            // ref: src/google/protobuf/io/coded_stream.cc
	            var start = offset,
	                part0 = 0,
	                part1 = 0,
	                part2 = 0,
	                b  = 0;
	            b = this.view[offset++]; part0  = (b & 0x7F)      ; if ( b & 0x80                                                   ) {
	            b = this.view[offset++]; part0 |= (b & 0x7F) <<  7; if ((b & 0x80) || (this.noAssert && typeof b === 'undefined')) {
	            b = this.view[offset++]; part0 |= (b & 0x7F) << 14; if ((b & 0x80) || (this.noAssert && typeof b === 'undefined')) {
	            b = this.view[offset++]; part0 |= (b & 0x7F) << 21; if ((b & 0x80) || (this.noAssert && typeof b === 'undefined')) {
	            b = this.view[offset++]; part1  = (b & 0x7F)      ; if ((b & 0x80) || (this.noAssert && typeof b === 'undefined')) {
	            b = this.view[offset++]; part1 |= (b & 0x7F) <<  7; if ((b & 0x80) || (this.noAssert && typeof b === 'undefined')) {
	            b = this.view[offset++]; part1 |= (b & 0x7F) << 14; if ((b & 0x80) || (this.noAssert && typeof b === 'undefined')) {
	            b = this.view[offset++]; part1 |= (b & 0x7F) << 21; if ((b & 0x80) || (this.noAssert && typeof b === 'undefined')) {
	            b = this.view[offset++]; part2  = (b & 0x7F)      ; if ((b & 0x80) || (this.noAssert && typeof b === 'undefined')) {
	            b = this.view[offset++]; part2 |= (b & 0x7F) <<  7; if ((b & 0x80) || (this.noAssert && typeof b === 'undefined')) {
	            throw Error("Buffer overrun"); }}}}}}}}}}
	            var value = Long.fromBits(part0 | (part1 << 28), (part1 >>> 4) | (part2) << 24, false);
	            if (relative) {
	                this.offset = offset;
	                return value;
	            } else {
	                return {
	                    'value': value,
	                    'length': offset-start
	                };
	            }
	        };

	        /**
	         * Reads a zig-zag encoded 64bit base 128 variable-length integer. Requires Long.js.
	         * @param {number=} offset Offset to read from. Will use and increase {@link ByteBuffer#offset} by the number of bytes
	         *  read if omitted.
	         * @returns {!Long|!{value: Long, length: number}} The value read if offset is omitted, else the value read and
	         *  the actual number of bytes read.
	         * @throws {Error} If it's not a valid varint
	         * @expose
	         */
	        ByteBufferPrototype.readVarint64ZigZag = function(offset) {
	            var val = this.readVarint64(offset);
	            if (val && val['value'] instanceof Long)
	                val["value"] = ByteBuffer.zigZagDecode64(val["value"]);
	            else
	                val = ByteBuffer.zigZagDecode64(val);
	            return val;
	        };

	    } // Long


	    // types/strings/cstring

	    /**
	     * Writes a NULL-terminated UTF8 encoded string. For this to work the specified string must not contain any NULL
	     *  characters itself.
	     * @param {string} str String to write
	     * @param {number=} offset Offset to write to. Will use and increase {@link ByteBuffer#offset} by the number of bytes
	     *  contained in `str` + 1 if omitted.
	     * @returns {!ByteBuffer|number} this if offset is omitted, else the actual number of bytes written
	     * @expose
	     */
	    ByteBufferPrototype.writeCString = function(str, offset) {
	        var relative = typeof offset === 'undefined';
	        if (relative) offset = this.offset;
	        var i,
	            k = str.length;
	        if (!this.noAssert) {
	            if (typeof str !== 'string')
	                throw TypeError("Illegal str: Not a string");
	            for (i=0; i<k; ++i) {
	                if (str.charCodeAt(i) === 0)
	                    throw RangeError("Illegal str: Contains NULL-characters");
	            }
	            if (typeof offset !== 'number' || offset % 1 !== 0)
	                throw TypeError("Illegal offset: "+offset+" (not an integer)");
	            offset >>>= 0;
	            if (offset < 0 || offset + 0 > this.buffer.byteLength)
	                throw RangeError("Illegal offset: 0 <= "+offset+" (+"+0+") <= "+this.buffer.byteLength);
	        }
	        // UTF8 strings do not contain zero bytes in between except for the zero character, so:
	        k = utfx.calculateUTF16asUTF8(stringSource(str))[1];
	        offset += k+1;
	        var capacity12 = this.buffer.byteLength;
	        if (offset > capacity12)
	            this.resize((capacity12 *= 2) > offset ? capacity12 : offset);
	        offset -= k+1;
	        utfx.encodeUTF16toUTF8(stringSource(str), function(b) {
	            this.view[offset++] = b;
	        }.bind(this));
	        this.view[offset++] = 0;
	        if (relative) {
	            this.offset = offset;
	            return this;
	        }
	        return k;
	    };

	    /**
	     * Reads a NULL-terminated UTF8 encoded string. For this to work the string read must not contain any NULL characters
	     *  itself.
	     * @param {number=} offset Offset to read from. Will use and increase {@link ByteBuffer#offset} by the number of bytes
	     *  read if omitted.
	     * @returns {string|!{string: string, length: number}} The string read if offset is omitted, else the string
	     *  read and the actual number of bytes read.
	     * @expose
	     */
	    ByteBufferPrototype.readCString = function(offset) {
	        var relative = typeof offset === 'undefined';
	        if (relative) offset = this.offset;
	        if (!this.noAssert) {
	            if (typeof offset !== 'number' || offset % 1 !== 0)
	                throw TypeError("Illegal offset: "+offset+" (not an integer)");
	            offset >>>= 0;
	            if (offset < 0 || offset + 1 > this.buffer.byteLength)
	                throw RangeError("Illegal offset: 0 <= "+offset+" (+"+1+") <= "+this.buffer.byteLength);
	        }
	        var start = offset,
	            temp;
	        // UTF8 strings do not contain zero bytes in between except for the zero character itself, so:
	        var sd, b = -1;
	        utfx.decodeUTF8toUTF16(function() {
	            if (b === 0) return null;
	            if (offset >= this.limit)
	                throw RangeError("Illegal range: Truncated data, "+offset+" < "+this.limit);
	            b = this.view[offset++];
	            return b === 0 ? null : b;
	        }.bind(this), sd = stringDestination(), true);
	        if (relative) {
	            this.offset = offset;
	            return sd();
	        } else {
	            return {
	                "string": sd(),
	                "length": offset - start
	            };
	        }
	    };

	    // types/strings/istring

	    /**
	     * Writes a length as uint32 prefixed UTF8 encoded string.
	     * @param {string} str String to write
	     * @param {number=} offset Offset to write to. Will use and increase {@link ByteBuffer#offset} by the number of bytes
	     *  written if omitted.
	     * @returns {!ByteBuffer|number} `this` if `offset` is omitted, else the actual number of bytes written
	     * @expose
	     * @see ByteBuffer#writeVarint32
	     */
	    ByteBufferPrototype.writeIString = function(str, offset) {
	        var relative = typeof offset === 'undefined';
	        if (relative) offset = this.offset;
	        if (!this.noAssert) {
	            if (typeof str !== 'string')
	                throw TypeError("Illegal str: Not a string");
	            if (typeof offset !== 'number' || offset % 1 !== 0)
	                throw TypeError("Illegal offset: "+offset+" (not an integer)");
	            offset >>>= 0;
	            if (offset < 0 || offset + 0 > this.buffer.byteLength)
	                throw RangeError("Illegal offset: 0 <= "+offset+" (+"+0+") <= "+this.buffer.byteLength);
	        }
	        var start = offset,
	            k;
	        k = utfx.calculateUTF16asUTF8(stringSource(str), this.noAssert)[1];
	        offset += 4+k;
	        var capacity13 = this.buffer.byteLength;
	        if (offset > capacity13)
	            this.resize((capacity13 *= 2) > offset ? capacity13 : offset);
	        offset -= 4+k;
	        if (this.littleEndian) {
	            this.view[offset+3] = (k >>> 24) & 0xFF;
	            this.view[offset+2] = (k >>> 16) & 0xFF;
	            this.view[offset+1] = (k >>>  8) & 0xFF;
	            this.view[offset  ] =  k         & 0xFF;
	        } else {
	            this.view[offset  ] = (k >>> 24) & 0xFF;
	            this.view[offset+1] = (k >>> 16) & 0xFF;
	            this.view[offset+2] = (k >>>  8) & 0xFF;
	            this.view[offset+3] =  k         & 0xFF;
	        }
	        offset += 4;
	        utfx.encodeUTF16toUTF8(stringSource(str), function(b) {
	            this.view[offset++] = b;
	        }.bind(this));
	        if (offset !== start + 4 + k)
	            throw RangeError("Illegal range: Truncated data, "+offset+" == "+(offset+4+k));
	        if (relative) {
	            this.offset = offset;
	            return this;
	        }
	        return offset - start;
	    };

	    /**
	     * Reads a length as uint32 prefixed UTF8 encoded string.
	     * @param {number=} offset Offset to read from. Will use and increase {@link ByteBuffer#offset} by the number of bytes
	     *  read if omitted.
	     * @returns {string|!{string: string, length: number}} The string read if offset is omitted, else the string
	     *  read and the actual number of bytes read.
	     * @expose
	     * @see ByteBuffer#readVarint32
	     */
	    ByteBufferPrototype.readIString = function(offset) {
	        var relative = typeof offset === 'undefined';
	        if (relative) offset = this.offset;
	        if (!this.noAssert) {
	            if (typeof offset !== 'number' || offset % 1 !== 0)
	                throw TypeError("Illegal offset: "+offset+" (not an integer)");
	            offset >>>= 0;
	            if (offset < 0 || offset + 4 > this.buffer.byteLength)
	                throw RangeError("Illegal offset: 0 <= "+offset+" (+"+4+") <= "+this.buffer.byteLength);
	        }
	        var start = offset;
	        var len = this.readUint32(offset);
	        var str = this.readUTF8String(len, ByteBuffer.METRICS_BYTES, offset += 4);
	        offset += str['length'];
	        if (relative) {
	            this.offset = offset;
	            return str['string'];
	        } else {
	            return {
	                'string': str['string'],
	                'length': offset - start
	            };
	        }
	    };

	    // types/strings/utf8string

	    /**
	     * Metrics representing number of UTF8 characters. Evaluates to `c`.
	     * @type {string}
	     * @const
	     * @expose
	     */
	    ByteBuffer.METRICS_CHARS = 'c';

	    /**
	     * Metrics representing number of bytes. Evaluates to `b`.
	     * @type {string}
	     * @const
	     * @expose
	     */
	    ByteBuffer.METRICS_BYTES = 'b';

	    /**
	     * Writes an UTF8 encoded string.
	     * @param {string} str String to write
	     * @param {number=} offset Offset to write to. Will use and increase {@link ByteBuffer#offset} if omitted.
	     * @returns {!ByteBuffer|number} this if offset is omitted, else the actual number of bytes written.
	     * @expose
	     */
	    ByteBufferPrototype.writeUTF8String = function(str, offset) {
	        var relative = typeof offset === 'undefined';
	        if (relative) offset = this.offset;
	        if (!this.noAssert) {
	            if (typeof offset !== 'number' || offset % 1 !== 0)
	                throw TypeError("Illegal offset: "+offset+" (not an integer)");
	            offset >>>= 0;
	            if (offset < 0 || offset + 0 > this.buffer.byteLength)
	                throw RangeError("Illegal offset: 0 <= "+offset+" (+"+0+") <= "+this.buffer.byteLength);
	        }
	        var k;
	        var start = offset;
	        k = utfx.calculateUTF16asUTF8(stringSource(str))[1];
	        offset += k;
	        var capacity14 = this.buffer.byteLength;
	        if (offset > capacity14)
	            this.resize((capacity14 *= 2) > offset ? capacity14 : offset);
	        offset -= k;
	        utfx.encodeUTF16toUTF8(stringSource(str), function(b) {
	            this.view[offset++] = b;
	        }.bind(this));
	        if (relative) {
	            this.offset = offset;
	            return this;
	        }
	        return offset - start;
	    };

	    /**
	     * Writes an UTF8 encoded string. This is an alias of {@link ByteBuffer#writeUTF8String}.
	     * @function
	     * @param {string} str String to write
	     * @param {number=} offset Offset to write to. Will use and increase {@link ByteBuffer#offset} if omitted.
	     * @returns {!ByteBuffer|number} this if offset is omitted, else the actual number of bytes written.
	     * @expose
	     */
	    ByteBufferPrototype.writeString = ByteBufferPrototype.writeUTF8String;

	    /**
	     * Calculates the number of UTF8 characters of a string. JavaScript itself uses UTF-16, so that a string's
	     *  `length` property does not reflect its actual UTF8 size if it contains code points larger than 0xFFFF.
	     * @param {string} str String to calculate
	     * @returns {number} Number of UTF8 characters
	     * @expose
	     */
	    ByteBuffer.calculateUTF8Chars = function(str) {
	        return utfx.calculateUTF16asUTF8(stringSource(str))[0];
	    };

	    /**
	     * Calculates the number of UTF8 bytes of a string.
	     * @param {string} str String to calculate
	     * @returns {number} Number of UTF8 bytes
	     * @expose
	     */
	    ByteBuffer.calculateUTF8Bytes = function(str) {
	        return utfx.calculateUTF16asUTF8(stringSource(str))[1];
	    };

	    /**
	     * Calculates the number of UTF8 bytes of a string. This is an alias of {@link ByteBuffer.calculateUTF8Bytes}.
	     * @function
	     * @param {string} str String to calculate
	     * @returns {number} Number of UTF8 bytes
	     * @expose
	     */
	    ByteBuffer.calculateString = ByteBuffer.calculateUTF8Bytes;

	    /**
	     * Reads an UTF8 encoded string.
	     * @param {number} length Number of characters or bytes to read.
	     * @param {string=} metrics Metrics specifying what `length` is meant to count. Defaults to
	     *  {@link ByteBuffer.METRICS_CHARS}.
	     * @param {number=} offset Offset to read from. Will use and increase {@link ByteBuffer#offset} by the number of bytes
	     *  read if omitted.
	     * @returns {string|!{string: string, length: number}} The string read if offset is omitted, else the string
	     *  read and the actual number of bytes read.
	     * @expose
	     */
	    ByteBufferPrototype.readUTF8String = function(length, metrics, offset) {
	        if (typeof metrics === 'number') {
	            offset = metrics;
	            metrics = undefined;
	        }
	        var relative = typeof offset === 'undefined';
	        if (relative) offset = this.offset;
	        if (typeof metrics === 'undefined') metrics = ByteBuffer.METRICS_CHARS;
	        if (!this.noAssert) {
	            if (typeof length !== 'number' || length % 1 !== 0)
	                throw TypeError("Illegal length: "+length+" (not an integer)");
	            length |= 0;
	            if (typeof offset !== 'number' || offset % 1 !== 0)
	                throw TypeError("Illegal offset: "+offset+" (not an integer)");
	            offset >>>= 0;
	            if (offset < 0 || offset + 0 > this.buffer.byteLength)
	                throw RangeError("Illegal offset: 0 <= "+offset+" (+"+0+") <= "+this.buffer.byteLength);
	        }
	        var i = 0,
	            start = offset,
	            sd;
	        if (metrics === ByteBuffer.METRICS_CHARS) { // The same for node and the browser
	            sd = stringDestination();
	            utfx.decodeUTF8(function() {
	                return i < length && offset < this.limit ? this.view[offset++] : null;
	            }.bind(this), function(cp) {
	                ++i; utfx.UTF8toUTF16(cp, sd);
	            });
	            if (i !== length)
	                throw RangeError("Illegal range: Truncated data, "+i+" == "+length);
	            if (relative) {
	                this.offset = offset;
	                return sd();
	            } else {
	                return {
	                    "string": sd(),
	                    "length": offset - start
	                };
	            }
	        } else if (metrics === ByteBuffer.METRICS_BYTES) {
	            if (!this.noAssert) {
	                if (typeof offset !== 'number' || offset % 1 !== 0)
	                    throw TypeError("Illegal offset: "+offset+" (not an integer)");
	                offset >>>= 0;
	                if (offset < 0 || offset + length > this.buffer.byteLength)
	                    throw RangeError("Illegal offset: 0 <= "+offset+" (+"+length+") <= "+this.buffer.byteLength);
	            }
	            var k = offset + length;
	            utfx.decodeUTF8toUTF16(function() {
	                return offset < k ? this.view[offset++] : null;
	            }.bind(this), sd = stringDestination(), this.noAssert);
	            if (offset !== k)
	                throw RangeError("Illegal range: Truncated data, "+offset+" == "+k);
	            if (relative) {
	                this.offset = offset;
	                return sd();
	            } else {
	                return {
	                    'string': sd(),
	                    'length': offset - start
	                };
	            }
	        } else
	            throw TypeError("Unsupported metrics: "+metrics);
	    };

	    /**
	     * Reads an UTF8 encoded string. This is an alias of {@link ByteBuffer#readUTF8String}.
	     * @function
	     * @param {number} length Number of characters or bytes to read
	     * @param {number=} metrics Metrics specifying what `n` is meant to count. Defaults to
	     *  {@link ByteBuffer.METRICS_CHARS}.
	     * @param {number=} offset Offset to read from. Will use and increase {@link ByteBuffer#offset} by the number of bytes
	     *  read if omitted.
	     * @returns {string|!{string: string, length: number}} The string read if offset is omitted, else the string
	     *  read and the actual number of bytes read.
	     * @expose
	     */
	    ByteBufferPrototype.readString = ByteBufferPrototype.readUTF8String;

	    // types/strings/vstring

	    /**
	     * Writes a length as varint32 prefixed UTF8 encoded string.
	     * @param {string} str String to write
	     * @param {number=} offset Offset to write to. Will use and increase {@link ByteBuffer#offset} by the number of bytes
	     *  written if omitted.
	     * @returns {!ByteBuffer|number} `this` if `offset` is omitted, else the actual number of bytes written
	     * @expose
	     * @see ByteBuffer#writeVarint32
	     */
	    ByteBufferPrototype.writeVString = function(str, offset) {
	        var relative = typeof offset === 'undefined';
	        if (relative) offset = this.offset;
	        if (!this.noAssert) {
	            if (typeof str !== 'string')
	                throw TypeError("Illegal str: Not a string");
	            if (typeof offset !== 'number' || offset % 1 !== 0)
	                throw TypeError("Illegal offset: "+offset+" (not an integer)");
	            offset >>>= 0;
	            if (offset < 0 || offset + 0 > this.buffer.byteLength)
	                throw RangeError("Illegal offset: 0 <= "+offset+" (+"+0+") <= "+this.buffer.byteLength);
	        }
	        var start = offset,
	            k, l;
	        k = utfx.calculateUTF16asUTF8(stringSource(str), this.noAssert)[1];
	        l = ByteBuffer.calculateVarint32(k);
	        offset += l+k;
	        var capacity15 = this.buffer.byteLength;
	        if (offset > capacity15)
	            this.resize((capacity15 *= 2) > offset ? capacity15 : offset);
	        offset -= l+k;
	        offset += this.writeVarint32(k, offset);
	        utfx.encodeUTF16toUTF8(stringSource(str), function(b) {
	            this.view[offset++] = b;
	        }.bind(this));
	        if (offset !== start+k+l)
	            throw RangeError("Illegal range: Truncated data, "+offset+" == "+(offset+k+l));
	        if (relative) {
	            this.offset = offset;
	            return this;
	        }
	        return offset - start;
	    };

	    /**
	     * Reads a length as varint32 prefixed UTF8 encoded string.
	     * @param {number=} offset Offset to read from. Will use and increase {@link ByteBuffer#offset} by the number of bytes
	     *  read if omitted.
	     * @returns {string|!{string: string, length: number}} The string read if offset is omitted, else the string
	     *  read and the actual number of bytes read.
	     * @expose
	     * @see ByteBuffer#readVarint32
	     */
	    ByteBufferPrototype.readVString = function(offset) {
	        var relative = typeof offset === 'undefined';
	        if (relative) offset = this.offset;
	        if (!this.noAssert) {
	            if (typeof offset !== 'number' || offset % 1 !== 0)
	                throw TypeError("Illegal offset: "+offset+" (not an integer)");
	            offset >>>= 0;
	            if (offset < 0 || offset + 1 > this.buffer.byteLength)
	                throw RangeError("Illegal offset: 0 <= "+offset+" (+"+1+") <= "+this.buffer.byteLength);
	        }
	        var start = offset;
	        var len = this.readVarint32(offset);
	        var str = this.readUTF8String(len['value'], ByteBuffer.METRICS_BYTES, offset += len['length']);
	        offset += str['length'];
	        if (relative) {
	            this.offset = offset;
	            return str['string'];
	        } else {
	            return {
	                'string': str['string'],
	                'length': offset - start
	            };
	        }
	    };


	    /**
	     * Appends some data to this ByteBuffer. This will overwrite any contents behind the specified offset up to the appended
	     *  data's length.
	     * @param {!ByteBuffer|!ArrayBuffer|!Uint8Array|string} source Data to append. If `source` is a ByteBuffer, its offsets
	     *  will be modified according to the performed read operation.
	     * @param {(string|number)=} encoding Encoding if `data` is a string ("base64", "hex", "binary", defaults to "utf8")
	     * @param {number=} offset Offset to append at. Will use and increase {@link ByteBuffer#offset} by the number of bytes
	     *  written if omitted.
	     * @returns {!ByteBuffer} this
	     * @expose
	     * @example A relative `<01 02>03.append(<04 05>)` will result in `<01 02 04 05>, 04 05|`
	     * @example An absolute `<01 02>03.append(04 05>, 1)` will result in `<01 04>05, 04 05|`
	     */
	    ByteBufferPrototype.append = function(source, encoding, offset) {
	        if (typeof encoding === 'number' || typeof encoding !== 'string') {
	            offset = encoding;
	            encoding = undefined;
	        }
	        var relative = typeof offset === 'undefined';
	        if (relative) offset = this.offset;
	        if (!this.noAssert) {
	            if (typeof offset !== 'number' || offset % 1 !== 0)
	                throw TypeError("Illegal offset: "+offset+" (not an integer)");
	            offset >>>= 0;
	            if (offset < 0 || offset + 0 > this.buffer.byteLength)
	                throw RangeError("Illegal offset: 0 <= "+offset+" (+"+0+") <= "+this.buffer.byteLength);
	        }
	        if (!(source instanceof ByteBuffer))
	            source = ByteBuffer.wrap(source, encoding);
	        var length = source.limit - source.offset;
	        if (length <= 0) return this; // Nothing to append
	        offset += length;
	        var capacity16 = this.buffer.byteLength;
	        if (offset > capacity16)
	            this.resize((capacity16 *= 2) > offset ? capacity16 : offset);
	        offset -= length;
	        this.view.set(source.view.subarray(source.offset, source.limit), offset);
	        source.offset += length;
	        if (relative) this.offset += length;
	        return this;
	    };

	    /**
	     * Appends this ByteBuffer's contents to another ByteBuffer. This will overwrite any contents at and after the
	        specified offset up to the length of this ByteBuffer's data.
	     * @param {!ByteBuffer} target Target ByteBuffer
	     * @param {number=} offset Offset to append to. Will use and increase {@link ByteBuffer#offset} by the number of bytes
	     *  read if omitted.
	     * @returns {!ByteBuffer} this
	     * @expose
	     * @see ByteBuffer#append
	     */
	    ByteBufferPrototype.appendTo = function(target, offset) {
	        target.append(this, offset);
	        return this;
	    };

	    /**
	     * Enables or disables assertions of argument types and offsets. Assertions are enabled by default but you can opt to
	     *  disable them if your code already makes sure that everything is valid.
	     * @param {boolean} assert `true` to enable assertions, otherwise `false`
	     * @returns {!ByteBuffer} this
	     * @expose
	     */
	    ByteBufferPrototype.assert = function(assert) {
	        this.noAssert = !assert;
	        return this;
	    };

	    /**
	     * Gets the capacity of this ByteBuffer's backing buffer.
	     * @returns {number} Capacity of the backing buffer
	     * @expose
	     */
	    ByteBufferPrototype.capacity = function() {
	        return this.buffer.byteLength;
	    };
	    /**
	     * Clears this ByteBuffer's offsets by setting {@link ByteBuffer#offset} to `0` and {@link ByteBuffer#limit} to the
	     *  backing buffer's capacity. Discards {@link ByteBuffer#markedOffset}.
	     * @returns {!ByteBuffer} this
	     * @expose
	     */
	    ByteBufferPrototype.clear = function() {
	        this.offset = 0;
	        this.limit = this.buffer.byteLength;
	        this.markedOffset = -1;
	        return this;
	    };

	    /**
	     * Creates a cloned instance of this ByteBuffer, preset with this ByteBuffer's values for {@link ByteBuffer#offset},
	     *  {@link ByteBuffer#markedOffset} and {@link ByteBuffer#limit}.
	     * @param {boolean=} copy Whether to copy the backing buffer or to return another view on the same, defaults to `false`
	     * @returns {!ByteBuffer} Cloned instance
	     * @expose
	     */
	    ByteBufferPrototype.clone = function(copy) {
	        var bb = new ByteBuffer(0, this.littleEndian, this.noAssert);
	        if (copy) {
	            bb.buffer = new ArrayBuffer(this.buffer.byteLength);
	            bb.view = new Uint8Array(bb.buffer);
	        } else {
	            bb.buffer = this.buffer;
	            bb.view = this.view;
	        }
	        bb.offset = this.offset;
	        bb.markedOffset = this.markedOffset;
	        bb.limit = this.limit;
	        return bb;
	    };

	    /**
	     * Compacts this ByteBuffer to be backed by a {@link ByteBuffer#buffer} of its contents' length. Contents are the bytes
	     *  between {@link ByteBuffer#offset} and {@link ByteBuffer#limit}. Will set `offset = 0` and `limit = capacity` and
	     *  adapt {@link ByteBuffer#markedOffset} to the same relative position if set.
	     * @param {number=} begin Offset to start at, defaults to {@link ByteBuffer#offset}
	     * @param {number=} end Offset to end at, defaults to {@link ByteBuffer#limit}
	     * @returns {!ByteBuffer} this
	     * @expose
	     */
	    ByteBufferPrototype.compact = function(begin, end) {
	        if (typeof begin === 'undefined') begin = this.offset;
	        if (typeof end === 'undefined') end = this.limit;
	        if (!this.noAssert) {
	            if (typeof begin !== 'number' || begin % 1 !== 0)
	                throw TypeError("Illegal begin: Not an integer");
	            begin >>>= 0;
	            if (typeof end !== 'number' || end % 1 !== 0)
	                throw TypeError("Illegal end: Not an integer");
	            end >>>= 0;
	            if (begin < 0 || begin > end || end > this.buffer.byteLength)
	                throw RangeError("Illegal range: 0 <= "+begin+" <= "+end+" <= "+this.buffer.byteLength);
	        }
	        if (begin === 0 && end === this.buffer.byteLength)
	            return this; // Already compacted
	        var len = end - begin;
	        if (len === 0) {
	            this.buffer = EMPTY_BUFFER;
	            this.view = null;
	            if (this.markedOffset >= 0) this.markedOffset -= begin;
	            this.offset = 0;
	            this.limit = 0;
	            return this;
	        }
	        var buffer = new ArrayBuffer(len);
	        var view = new Uint8Array(buffer);
	        view.set(this.view.subarray(begin, end));
	        this.buffer = buffer;
	        this.view = view;
	        if (this.markedOffset >= 0) this.markedOffset -= begin;
	        this.offset = 0;
	        this.limit = len;
	        return this;
	    };

	    /**
	     * Creates a copy of this ByteBuffer's contents. Contents are the bytes between {@link ByteBuffer#offset} and
	     *  {@link ByteBuffer#limit}.
	     * @param {number=} begin Begin offset, defaults to {@link ByteBuffer#offset}.
	     * @param {number=} end End offset, defaults to {@link ByteBuffer#limit}.
	     * @returns {!ByteBuffer} Copy
	     * @expose
	     */
	    ByteBufferPrototype.copy = function(begin, end) {
	        if (typeof begin === 'undefined') begin = this.offset;
	        if (typeof end === 'undefined') end = this.limit;
	        if (!this.noAssert) {
	            if (typeof begin !== 'number' || begin % 1 !== 0)
	                throw TypeError("Illegal begin: Not an integer");
	            begin >>>= 0;
	            if (typeof end !== 'number' || end % 1 !== 0)
	                throw TypeError("Illegal end: Not an integer");
	            end >>>= 0;
	            if (begin < 0 || begin > end || end > this.buffer.byteLength)
	                throw RangeError("Illegal range: 0 <= "+begin+" <= "+end+" <= "+this.buffer.byteLength);
	        }
	        if (begin === end)
	            return new ByteBuffer(0, this.littleEndian, this.noAssert);
	        var capacity = end - begin,
	            bb = new ByteBuffer(capacity, this.littleEndian, this.noAssert);
	        bb.offset = 0;
	        bb.limit = capacity;
	        if (bb.markedOffset >= 0) bb.markedOffset -= begin;
	        this.copyTo(bb, 0, begin, end);
	        return bb;
	    };

	    /**
	     * Copies this ByteBuffer's contents to another ByteBuffer. Contents are the bytes between {@link ByteBuffer#offset} and
	     *  {@link ByteBuffer#limit}.
	     * @param {!ByteBuffer} target Target ByteBuffer
	     * @param {number=} targetOffset Offset to copy to. Will use and increase the target's {@link ByteBuffer#offset}
	     *  by the number of bytes copied if omitted.
	     * @param {number=} sourceOffset Offset to start copying from. Will use and increase {@link ByteBuffer#offset} by the
	     *  number of bytes copied if omitted.
	     * @param {number=} sourceLimit Offset to end copying from, defaults to {@link ByteBuffer#limit}
	     * @returns {!ByteBuffer} this
	     * @expose
	     */
	    ByteBufferPrototype.copyTo = function(target, targetOffset, sourceOffset, sourceLimit) {
	        var relative,
	            targetRelative;
	        if (!this.noAssert) {
	            if (!ByteBuffer.isByteBuffer(target))
	                throw TypeError("Illegal target: Not a ByteBuffer");
	        }
	        targetOffset = (targetRelative = typeof targetOffset === 'undefined') ? target.offset : targetOffset | 0;
	        sourceOffset = (relative = typeof sourceOffset === 'undefined') ? this.offset : sourceOffset | 0;
	        sourceLimit = typeof sourceLimit === 'undefined' ? this.limit : sourceLimit | 0;

	        if (targetOffset < 0 || targetOffset > target.buffer.byteLength)
	            throw RangeError("Illegal target range: 0 <= "+targetOffset+" <= "+target.buffer.byteLength);
	        if (sourceOffset < 0 || sourceLimit > this.buffer.byteLength)
	            throw RangeError("Illegal source range: 0 <= "+sourceOffset+" <= "+this.buffer.byteLength);

	        var len = sourceLimit - sourceOffset;
	        if (len === 0)
	            return target; // Nothing to copy

	        target.ensureCapacity(targetOffset + len);

	        target.view.set(this.view.subarray(sourceOffset, sourceLimit), targetOffset);

	        if (relative) this.offset += len;
	        if (targetRelative) target.offset += len;

	        return this;
	    };

	    /**
	     * Makes sure that this ByteBuffer is backed by a {@link ByteBuffer#buffer} of at least the specified capacity. If the
	     *  current capacity is exceeded, it will be doubled. If double the current capacity is less than the required capacity,
	     *  the required capacity will be used instead.
	     * @param {number} capacity Required capacity
	     * @returns {!ByteBuffer} this
	     * @expose
	     */
	    ByteBufferPrototype.ensureCapacity = function(capacity) {
	        var current = this.buffer.byteLength;
	        if (current < capacity)
	            return this.resize((current *= 2) > capacity ? current : capacity);
	        return this;
	    };

	    /**
	     * Overwrites this ByteBuffer's contents with the specified value. Contents are the bytes between
	     *  {@link ByteBuffer#offset} and {@link ByteBuffer#limit}.
	     * @param {number|string} value Byte value to fill with. If given as a string, the first character is used.
	     * @param {number=} begin Begin offset. Will use and increase {@link ByteBuffer#offset} by the number of bytes
	     *  written if omitted. defaults to {@link ByteBuffer#offset}.
	     * @param {number=} end End offset, defaults to {@link ByteBuffer#limit}.
	     * @returns {!ByteBuffer} this
	     * @expose
	     * @example `someByteBuffer.clear().fill(0)` fills the entire backing buffer with zeroes
	     */
	    ByteBufferPrototype.fill = function(value, begin, end) {
	        var relative = typeof begin === 'undefined';
	        if (relative) begin = this.offset;
	        if (typeof value === 'string' && value.length > 0)
	            value = value.charCodeAt(0);
	        if (typeof begin === 'undefined') begin = this.offset;
	        if (typeof end === 'undefined') end = this.limit;
	        if (!this.noAssert) {
	            if (typeof value !== 'number' || value % 1 !== 0)
	                throw TypeError("Illegal value: "+value+" (not an integer)");
	            value |= 0;
	            if (typeof begin !== 'number' || begin % 1 !== 0)
	                throw TypeError("Illegal begin: Not an integer");
	            begin >>>= 0;
	            if (typeof end !== 'number' || end % 1 !== 0)
	                throw TypeError("Illegal end: Not an integer");
	            end >>>= 0;
	            if (begin < 0 || begin > end || end > this.buffer.byteLength)
	                throw RangeError("Illegal range: 0 <= "+begin+" <= "+end+" <= "+this.buffer.byteLength);
	        }
	        if (begin >= end)
	            return this; // Nothing to fill
	        while (begin < end) this.view[begin++] = value;
	        if (relative) this.offset = begin;
	        return this;
	    };

	    /**
	     * Makes this ByteBuffer ready for a new sequence of write or relative read operations. Sets `limit = offset` and
	     *  `offset = 0`. Make sure always to flip a ByteBuffer when all relative read or write operations are complete.
	     * @returns {!ByteBuffer} this
	     * @expose
	     */
	    ByteBufferPrototype.flip = function() {
	        this.limit = this.offset;
	        this.offset = 0;
	        return this;
	    };
	    /**
	     * Marks an offset on this ByteBuffer to be used later.
	     * @param {number=} offset Offset to mark. Defaults to {@link ByteBuffer#offset}.
	     * @returns {!ByteBuffer} this
	     * @throws {TypeError} If `offset` is not a valid number
	     * @throws {RangeError} If `offset` is out of bounds
	     * @see ByteBuffer#reset
	     * @expose
	     */
	    ByteBufferPrototype.mark = function(offset) {
	        offset = typeof offset === 'undefined' ? this.offset : offset;
	        if (!this.noAssert) {
	            if (typeof offset !== 'number' || offset % 1 !== 0)
	                throw TypeError("Illegal offset: "+offset+" (not an integer)");
	            offset >>>= 0;
	            if (offset < 0 || offset + 0 > this.buffer.byteLength)
	                throw RangeError("Illegal offset: 0 <= "+offset+" (+"+0+") <= "+this.buffer.byteLength);
	        }
	        this.markedOffset = offset;
	        return this;
	    };
	    /**
	     * Sets the byte order.
	     * @param {boolean} littleEndian `true` for little endian byte order, `false` for big endian
	     * @returns {!ByteBuffer} this
	     * @expose
	     */
	    ByteBufferPrototype.order = function(littleEndian) {
	        if (!this.noAssert) {
	            if (typeof littleEndian !== 'boolean')
	                throw TypeError("Illegal littleEndian: Not a boolean");
	        }
	        this.littleEndian = !!littleEndian;
	        return this;
	    };

	    /**
	     * Switches (to) little endian byte order.
	     * @param {boolean=} littleEndian Defaults to `true`, otherwise uses big endian
	     * @returns {!ByteBuffer} this
	     * @expose
	     */
	    ByteBufferPrototype.LE = function(littleEndian) {
	        this.littleEndian = typeof littleEndian !== 'undefined' ? !!littleEndian : true;
	        return this;
	    };

	    /**
	     * Switches (to) big endian byte order.
	     * @param {boolean=} bigEndian Defaults to `true`, otherwise uses little endian
	     * @returns {!ByteBuffer} this
	     * @expose
	     */
	    ByteBufferPrototype.BE = function(bigEndian) {
	        this.littleEndian = typeof bigEndian !== 'undefined' ? !bigEndian : false;
	        return this;
	    };
	    /**
	     * Prepends some data to this ByteBuffer. This will overwrite any contents before the specified offset up to the
	     *  prepended data's length. If there is not enough space available before the specified `offset`, the backing buffer
	     *  will be resized and its contents moved accordingly.
	     * @param {!ByteBuffer|string|!ArrayBuffer} source Data to prepend. If `source` is a ByteBuffer, its offset will be
	     *  modified according to the performed read operation.
	     * @param {(string|number)=} encoding Encoding if `data` is a string ("base64", "hex", "binary", defaults to "utf8")
	     * @param {number=} offset Offset to prepend at. Will use and decrease {@link ByteBuffer#offset} by the number of bytes
	     *  prepended if omitted.
	     * @returns {!ByteBuffer} this
	     * @expose
	     * @example A relative `00<01 02 03>.prepend(<04 05>)` results in `<04 05 01 02 03>, 04 05|`
	     * @example An absolute `00<01 02 03>.prepend(<04 05>, 2)` results in `04<05 02 03>, 04 05|`
	     */
	    ByteBufferPrototype.prepend = function(source, encoding, offset) {
	        if (typeof encoding === 'number' || typeof encoding !== 'string') {
	            offset = encoding;
	            encoding = undefined;
	        }
	        var relative = typeof offset === 'undefined';
	        if (relative) offset = this.offset;
	        if (!this.noAssert) {
	            if (typeof offset !== 'number' || offset % 1 !== 0)
	                throw TypeError("Illegal offset: "+offset+" (not an integer)");
	            offset >>>= 0;
	            if (offset < 0 || offset + 0 > this.buffer.byteLength)
	                throw RangeError("Illegal offset: 0 <= "+offset+" (+"+0+") <= "+this.buffer.byteLength);
	        }
	        if (!(source instanceof ByteBuffer))
	            source = ByteBuffer.wrap(source, encoding);
	        var len = source.limit - source.offset;
	        if (len <= 0) return this; // Nothing to prepend
	        var diff = len - offset;
	        if (diff > 0) { // Not enough space before offset, so resize + move
	            var buffer = new ArrayBuffer(this.buffer.byteLength + diff);
	            var view = new Uint8Array(buffer);
	            view.set(this.view.subarray(offset, this.buffer.byteLength), len);
	            this.buffer = buffer;
	            this.view = view;
	            this.offset += diff;
	            if (this.markedOffset >= 0) this.markedOffset += diff;
	            this.limit += diff;
	            offset += diff;
	        } else {
	            var arrayView = new Uint8Array(this.buffer);
	        }
	        this.view.set(source.view.subarray(source.offset, source.limit), offset - len);

	        source.offset = source.limit;
	        if (relative)
	            this.offset -= len;
	        return this;
	    };

	    /**
	     * Prepends this ByteBuffer to another ByteBuffer. This will overwrite any contents before the specified offset up to the
	     *  prepended data's length. If there is not enough space available before the specified `offset`, the backing buffer
	     *  will be resized and its contents moved accordingly.
	     * @param {!ByteBuffer} target Target ByteBuffer
	     * @param {number=} offset Offset to prepend at. Will use and decrease {@link ByteBuffer#offset} by the number of bytes
	     *  prepended if omitted.
	     * @returns {!ByteBuffer} this
	     * @expose
	     * @see ByteBuffer#prepend
	     */
	    ByteBufferPrototype.prependTo = function(target, offset) {
	        target.prepend(this, offset);
	        return this;
	    };
	    /**
	     * Prints debug information about this ByteBuffer's contents.
	     * @param {function(string)=} out Output function to call, defaults to console.log
	     * @expose
	     */
	    ByteBufferPrototype.printDebug = function(out) {
	        if (typeof out !== 'function') out = console.log.bind(console);
	        out(
	            this.toString()+"\n"+
	            "-------------------------------------------------------------------\n"+
	            this.toDebug(/* columns */ true)
	        );
	    };

	    /**
	     * Gets the number of remaining readable bytes. Contents are the bytes between {@link ByteBuffer#offset} and
	     *  {@link ByteBuffer#limit}, so this returns `limit - offset`.
	     * @returns {number} Remaining readable bytes. May be negative if `offset > limit`.
	     * @expose
	     */
	    ByteBufferPrototype.remaining = function() {
	        return this.limit - this.offset;
	    };
	    /**
	     * Resets this ByteBuffer's {@link ByteBuffer#offset}. If an offset has been marked through {@link ByteBuffer#mark}
	     *  before, `offset` will be set to {@link ByteBuffer#markedOffset}, which will then be discarded. If no offset has been
	     *  marked, sets `offset = 0`.
	     * @returns {!ByteBuffer} this
	     * @see ByteBuffer#mark
	     * @expose
	     */
	    ByteBufferPrototype.reset = function() {
	        if (this.markedOffset >= 0) {
	            this.offset = this.markedOffset;
	            this.markedOffset = -1;
	        } else {
	            this.offset = 0;
	        }
	        return this;
	    };
	    /**
	     * Resizes this ByteBuffer to be backed by a buffer of at least the given capacity. Will do nothing if already that
	     *  large or larger.
	     * @param {number} capacity Capacity required
	     * @returns {!ByteBuffer} this
	     * @throws {TypeError} If `capacity` is not a number
	     * @throws {RangeError} If `capacity < 0`
	     * @expose
	     */
	    ByteBufferPrototype.resize = function(capacity) {
	        if (!this.noAssert) {
	            if (typeof capacity !== 'number' || capacity % 1 !== 0)
	                throw TypeError("Illegal capacity: "+capacity+" (not an integer)");
	            capacity |= 0;
	            if (capacity < 0)
	                throw RangeError("Illegal capacity: 0 <= "+capacity);
	        }
	        if (this.buffer.byteLength < capacity) {
	            var buffer = new ArrayBuffer(capacity);
	            var view = new Uint8Array(buffer);
	            view.set(this.view);
	            this.buffer = buffer;
	            this.view = view;
	        }
	        return this;
	    };
	    /**
	     * Reverses this ByteBuffer's contents.
	     * @param {number=} begin Offset to start at, defaults to {@link ByteBuffer#offset}
	     * @param {number=} end Offset to end at, defaults to {@link ByteBuffer#limit}
	     * @returns {!ByteBuffer} this
	     * @expose
	     */
	    ByteBufferPrototype.reverse = function(begin, end) {
	        if (typeof begin === 'undefined') begin = this.offset;
	        if (typeof end === 'undefined') end = this.limit;
	        if (!this.noAssert) {
	            if (typeof begin !== 'number' || begin % 1 !== 0)
	                throw TypeError("Illegal begin: Not an integer");
	            begin >>>= 0;
	            if (typeof end !== 'number' || end % 1 !== 0)
	                throw TypeError("Illegal end: Not an integer");
	            end >>>= 0;
	            if (begin < 0 || begin > end || end > this.buffer.byteLength)
	                throw RangeError("Illegal range: 0 <= "+begin+" <= "+end+" <= "+this.buffer.byteLength);
	        }
	        if (begin === end)
	            return this; // Nothing to reverse
	        Array.prototype.reverse.call(this.view.subarray(begin, end));
	        return this;
	    };
	    /**
	     * Skips the next `length` bytes. This will just advance
	     * @param {number} length Number of bytes to skip. May also be negative to move the offset back.
	     * @returns {!ByteBuffer} this
	     * @expose
	     */
	    ByteBufferPrototype.skip = function(length) {
	        if (!this.noAssert) {
	            if (typeof length !== 'number' || length % 1 !== 0)
	                throw TypeError("Illegal length: "+length+" (not an integer)");
	            length |= 0;
	        }
	        var offset = this.offset + length;
	        if (!this.noAssert) {
	            if (offset < 0 || offset > this.buffer.byteLength)
	                throw RangeError("Illegal length: 0 <= "+this.offset+" + "+length+" <= "+this.buffer.byteLength);
	        }
	        this.offset = offset;
	        return this;
	    };

	    /**
	     * Slices this ByteBuffer by creating a cloned instance with `offset = begin` and `limit = end`.
	     * @param {number=} begin Begin offset, defaults to {@link ByteBuffer#offset}.
	     * @param {number=} end End offset, defaults to {@link ByteBuffer#limit}.
	     * @returns {!ByteBuffer} Clone of this ByteBuffer with slicing applied, backed by the same {@link ByteBuffer#buffer}
	     * @expose
	     */
	    ByteBufferPrototype.slice = function(begin, end) {
	        if (typeof begin === 'undefined') begin = this.offset;
	        if (typeof end === 'undefined') end = this.limit;
	        if (!this.noAssert) {
	            if (typeof begin !== 'number' || begin % 1 !== 0)
	                throw TypeError("Illegal begin: Not an integer");
	            begin >>>= 0;
	            if (typeof end !== 'number' || end % 1 !== 0)
	                throw TypeError("Illegal end: Not an integer");
	            end >>>= 0;
	            if (begin < 0 || begin > end || end > this.buffer.byteLength)
	                throw RangeError("Illegal range: 0 <= "+begin+" <= "+end+" <= "+this.buffer.byteLength);
	        }
	        var bb = this.clone();
	        bb.offset = begin;
	        bb.limit = end;
	        return bb;
	    };
	    /**
	     * Returns a copy of the backing buffer that contains this ByteBuffer's contents. Contents are the bytes between
	     *  {@link ByteBuffer#offset} and {@link ByteBuffer#limit}.
	     * @param {boolean=} forceCopy If `true` returns a copy, otherwise returns a view referencing the same memory if
	     *  possible. Defaults to `false`
	     * @returns {!ArrayBuffer} Contents as an ArrayBuffer
	     * @expose
	     */
	    ByteBufferPrototype.toBuffer = function(forceCopy) {
	        var offset = this.offset,
	            limit = this.limit;
	        if (!this.noAssert) {
	            if (typeof offset !== 'number' || offset % 1 !== 0)
	                throw TypeError("Illegal offset: Not an integer");
	            offset >>>= 0;
	            if (typeof limit !== 'number' || limit % 1 !== 0)
	                throw TypeError("Illegal limit: Not an integer");
	            limit >>>= 0;
	            if (offset < 0 || offset > limit || limit > this.buffer.byteLength)
	                throw RangeError("Illegal range: 0 <= "+offset+" <= "+limit+" <= "+this.buffer.byteLength);
	        }
	        // NOTE: It's not possible to have another ArrayBuffer reference the same memory as the backing buffer. This is
	        // possible with Uint8Array#subarray only, but we have to return an ArrayBuffer by contract. So:
	        if (!forceCopy && offset === 0 && limit === this.buffer.byteLength)
	            return this.buffer;
	        if (offset === limit)
	            return EMPTY_BUFFER;
	        var buffer = new ArrayBuffer(limit - offset);
	        new Uint8Array(buffer).set(new Uint8Array(this.buffer).subarray(offset, limit), 0);
	        return buffer;
	    };

	    /**
	     * Returns a raw buffer compacted to contain this ByteBuffer's contents. Contents are the bytes between
	     *  {@link ByteBuffer#offset} and {@link ByteBuffer#limit}. This is an alias of {@link ByteBuffer#toBuffer}.
	     * @function
	     * @param {boolean=} forceCopy If `true` returns a copy, otherwise returns a view referencing the same memory.
	     *  Defaults to `false`
	     * @returns {!ArrayBuffer} Contents as an ArrayBuffer
	     * @expose
	     */
	    ByteBufferPrototype.toArrayBuffer = ByteBufferPrototype.toBuffer;

	    /**
	     * Converts the ByteBuffer's contents to a string.
	     * @param {string=} encoding Output encoding. Returns an informative string representation if omitted but also allows
	     *  direct conversion to "utf8", "hex", "base64" and "binary" encoding. "debug" returns a hex representation with
	     *  highlighted offsets.
	     * @param {number=} begin Offset to begin at, defaults to {@link ByteBuffer#offset}
	     * @param {number=} end Offset to end at, defaults to {@link ByteBuffer#limit}
	     * @returns {string} String representation
	     * @throws {Error} If `encoding` is invalid
	     * @expose
	     */
	    ByteBufferPrototype.toString = function(encoding, begin, end) {
	        if (typeof encoding === 'undefined')
	            return "ByteBufferAB(offset="+this.offset+",markedOffset="+this.markedOffset+",limit="+this.limit+",capacity="+this.capacity()+")";
	        if (typeof encoding === 'number')
	            encoding = "utf8",
	            begin = encoding,
	            end = begin;
	        switch (encoding) {
	            case "utf8":
	                return this.toUTF8(begin, end);
	            case "base64":
	                return this.toBase64(begin, end);
	            case "hex":
	                return this.toHex(begin, end);
	            case "binary":
	                return this.toBinary(begin, end);
	            case "debug":
	                return this.toDebug();
	            case "columns":
	                return this.toColumns();
	            default:
	                throw Error("Unsupported encoding: "+encoding);
	        }
	    };

	    // lxiv-embeddable

	    /**
	     * lxiv-embeddable (c) 2014 Daniel Wirtz <dcode@dcode.io>
	     * Released under the Apache License, Version 2.0
	     * see: https://github.com/dcodeIO/lxiv for details
	     */
	    var lxiv = function() {
	        "use strict";

	        /**
	         * lxiv namespace.
	         * @type {!Object.<string,*>}
	         * @exports lxiv
	         */
	        var lxiv = {};

	        /**
	         * Character codes for output.
	         * @type {!Array.<number>}
	         * @inner
	         */
	        var aout = [
	            65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80,
	            81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 97, 98, 99, 100, 101, 102,
	            103, 104, 105, 106, 107, 108, 109, 110, 111, 112, 113, 114, 115, 116, 117, 118,
	            119, 120, 121, 122, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 43, 47
	        ];

	        /**
	         * Character codes for input.
	         * @type {!Array.<number>}
	         * @inner
	         */
	        var ain = [];
	        for (var i=0, k=aout.length; i<k; ++i)
	            ain[aout[i]] = i;

	        /**
	         * Encodes bytes to base64 char codes.
	         * @param {!function():number|null} src Bytes source as a function returning the next byte respectively `null` if
	         *  there are no more bytes left.
	         * @param {!function(number)} dst Characters destination as a function successively called with each encoded char
	         *  code.
	         */
	        lxiv.encode = function(src, dst) {
	            var b, t;
	            while ((b = src()) !== null) {
	                dst(aout[(b>>2)&0x3f]);
	                t = (b&0x3)<<4;
	                if ((b = src()) !== null) {
	                    t |= (b>>4)&0xf;
	                    dst(aout[(t|((b>>4)&0xf))&0x3f]);
	                    t = (b&0xf)<<2;
	                    if ((b = src()) !== null)
	                        dst(aout[(t|((b>>6)&0x3))&0x3f]),
	                        dst(aout[b&0x3f]);
	                    else
	                        dst(aout[t&0x3f]),
	                        dst(61);
	                } else
	                    dst(aout[t&0x3f]),
	                    dst(61),
	                    dst(61);
	            }
	        };

	        /**
	         * Decodes base64 char codes to bytes.
	         * @param {!function():number|null} src Characters source as a function returning the next char code respectively
	         *  `null` if there are no more characters left.
	         * @param {!function(number)} dst Bytes destination as a function successively called with the next byte.
	         * @throws {Error} If a character code is invalid
	         */
	        lxiv.decode = function(src, dst) {
	            var c, t1, t2;
	            function fail(c) {
	                throw Error("Illegal character code: "+c);
	            }
	            while ((c = src()) !== null) {
	                t1 = ain[c];
	                if (typeof t1 === 'undefined') fail(c);
	                if ((c = src()) !== null) {
	                    t2 = ain[c];
	                    if (typeof t2 === 'undefined') fail(c);
	                    dst((t1<<2)>>>0|(t2&0x30)>>4);
	                    if ((c = src()) !== null) {
	                        t1 = ain[c];
	                        if (typeof t1 === 'undefined')
	                            if (c === 61) break; else fail(c);
	                        dst(((t2&0xf)<<4)>>>0|(t1&0x3c)>>2);
	                        if ((c = src()) !== null) {
	                            t2 = ain[c];
	                            if (typeof t2 === 'undefined')
	                                if (c === 61) break; else fail(c);
	                            dst(((t1&0x3)<<6)>>>0|t2);
	                        }
	                    }
	                }
	            }
	        };

	        /**
	         * Tests if a string is valid base64.
	         * @param {string} str String to test
	         * @returns {boolean} `true` if valid, otherwise `false`
	         */
	        lxiv.test = function(str) {
	            return /^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/.test(str);
	        };

	        return lxiv;
	    }();

	    // encodings/base64

	    /**
	     * Encodes this ByteBuffer's contents to a base64 encoded string.
	     * @param {number=} begin Offset to begin at, defaults to {@link ByteBuffer#offset}.
	     * @param {number=} end Offset to end at, defaults to {@link ByteBuffer#limit}.
	     * @returns {string} Base64 encoded string
	     * @throws {RangeError} If `begin` or `end` is out of bounds
	     * @expose
	     */
	    ByteBufferPrototype.toBase64 = function(begin, end) {
	        if (typeof begin === 'undefined')
	            begin = this.offset;
	        if (typeof end === 'undefined')
	            end = this.limit;
	        begin = begin | 0; end = end | 0;
	        if (begin < 0 || end > this.capacity || begin > end)
	            throw RangeError("begin, end");
	        var sd; lxiv.encode(function() {
	            return begin < end ? this.view[begin++] : null;
	        }.bind(this), sd = stringDestination());
	        return sd();
	    };

	    /**
	     * Decodes a base64 encoded string to a ByteBuffer.
	     * @param {string} str String to decode
	     * @param {boolean=} littleEndian Whether to use little or big endian byte order. Defaults to
	     *  {@link ByteBuffer.DEFAULT_ENDIAN}.
	     * @returns {!ByteBuffer} ByteBuffer
	     * @expose
	     */
	    ByteBuffer.fromBase64 = function(str, littleEndian) {
	        if (typeof str !== 'string')
	            throw TypeError("str");
	        var bb = new ByteBuffer(str.length/4*3, littleEndian),
	            i = 0;
	        lxiv.decode(stringSource(str), function(b) {
	            bb.view[i++] = b;
	        });
	        bb.limit = i;
	        return bb;
	    };

	    /**
	     * Encodes a binary string to base64 like `window.btoa` does.
	     * @param {string} str Binary string
	     * @returns {string} Base64 encoded string
	     * @see https://developer.mozilla.org/en-US/docs/Web/API/Window.btoa
	     * @expose
	     */
	    ByteBuffer.btoa = function(str) {
	        return ByteBuffer.fromBinary(str).toBase64();
	    };

	    /**
	     * Decodes a base64 encoded string to binary like `window.atob` does.
	     * @param {string} b64 Base64 encoded string
	     * @returns {string} Binary string
	     * @see https://developer.mozilla.org/en-US/docs/Web/API/Window.atob
	     * @expose
	     */
	    ByteBuffer.atob = function(b64) {
	        return ByteBuffer.fromBase64(b64).toBinary();
	    };

	    // encodings/binary

	    /**
	     * Encodes this ByteBuffer to a binary encoded string, that is using only characters 0x00-0xFF as bytes.
	     * @param {number=} begin Offset to begin at. Defaults to {@link ByteBuffer#offset}.
	     * @param {number=} end Offset to end at. Defaults to {@link ByteBuffer#limit}.
	     * @returns {string} Binary encoded string
	     * @throws {RangeError} If `offset > limit`
	     * @expose
	     */
	    ByteBufferPrototype.toBinary = function(begin, end) {
	        if (typeof begin === 'undefined')
	            begin = this.offset;
	        if (typeof end === 'undefined')
	            end = this.limit;
	        begin |= 0; end |= 0;
	        if (begin < 0 || end > this.capacity() || begin > end)
	            throw RangeError("begin, end");
	        if (begin === end)
	            return "";
	        var chars = [],
	            parts = [];
	        while (begin < end) {
	            chars.push(this.view[begin++]);
	            if (chars.length >= 1024)
	                parts.push(String.fromCharCode.apply(String, chars)),
	                chars = [];
	        }
	        return parts.join('') + String.fromCharCode.apply(String, chars);
	    };

	    /**
	     * Decodes a binary encoded string, that is using only characters 0x00-0xFF as bytes, to a ByteBuffer.
	     * @param {string} str String to decode
	     * @param {boolean=} littleEndian Whether to use little or big endian byte order. Defaults to
	     *  {@link ByteBuffer.DEFAULT_ENDIAN}.
	     * @returns {!ByteBuffer} ByteBuffer
	     * @expose
	     */
	    ByteBuffer.fromBinary = function(str, littleEndian) {
	        if (typeof str !== 'string')
	            throw TypeError("str");
	        var i = 0,
	            k = str.length,
	            charCode,
	            bb = new ByteBuffer(k, littleEndian);
	        while (i<k) {
	            charCode = str.charCodeAt(i);
	            if (charCode > 0xff)
	                throw RangeError("illegal char code: "+charCode);
	            bb.view[i++] = charCode;
	        }
	        bb.limit = k;
	        return bb;
	    };

	    // encodings/debug

	    /**
	     * Encodes this ByteBuffer to a hex encoded string with marked offsets. Offset symbols are:
	     * * `<` : offset,
	     * * `'` : markedOffset,
	     * * `>` : limit,
	     * * `|` : offset and limit,
	     * * `[` : offset and markedOffset,
	     * * `]` : markedOffset and limit,
	     * * `!` : offset, markedOffset and limit
	     * @param {boolean=} columns If `true` returns two columns hex + ascii, defaults to `false`
	     * @returns {string|!Array.<string>} Debug string or array of lines if `asArray = true`
	     * @expose
	     * @example `>00'01 02<03` contains four bytes with `limit=0, markedOffset=1, offset=3`
	     * @example `00[01 02 03>` contains four bytes with `offset=markedOffset=1, limit=4`
	     * @example `00|01 02 03` contains four bytes with `offset=limit=1, markedOffset=-1`
	     * @example `|` contains zero bytes with `offset=limit=0, markedOffset=-1`
	     */
	    ByteBufferPrototype.toDebug = function(columns) {
	        var i = -1,
	            k = this.buffer.byteLength,
	            b,
	            hex = "",
	            asc = "",
	            out = "";
	        while (i<k) {
	            if (i !== -1) {
	                b = this.view[i];
	                if (b < 0x10) hex += "0"+b.toString(16).toUpperCase();
	                else hex += b.toString(16).toUpperCase();
	                if (columns)
	                    asc += b > 32 && b < 127 ? String.fromCharCode(b) : '.';
	            }
	            ++i;
	            if (columns) {
	                if (i > 0 && i % 16 === 0 && i !== k) {
	                    while (hex.length < 3*16+3) hex += " ";
	                    out += hex+asc+"\n";
	                    hex = asc = "";
	                }
	            }
	            if (i === this.offset && i === this.limit)
	                hex += i === this.markedOffset ? "!" : "|";
	            else if (i === this.offset)
	                hex += i === this.markedOffset ? "[" : "<";
	            else if (i === this.limit)
	                hex += i === this.markedOffset ? "]" : ">";
	            else
	                hex += i === this.markedOffset ? "'" : (columns || (i !== 0 && i !== k) ? " " : "");
	        }
	        if (columns && hex !== " ") {
	            while (hex.length < 3*16+3)
	                hex += " ";
	            out += hex + asc + "\n";
	        }
	        return columns ? out : hex;
	    };

	    /**
	     * Decodes a hex encoded string with marked offsets to a ByteBuffer.
	     * @param {string} str Debug string to decode (not be generated with `columns = true`)
	     * @param {boolean=} littleEndian Whether to use little or big endian byte order. Defaults to
	     *  {@link ByteBuffer.DEFAULT_ENDIAN}.
	     * @param {boolean=} noAssert Whether to skip assertions of offsets and values. Defaults to
	     *  {@link ByteBuffer.DEFAULT_NOASSERT}.
	     * @returns {!ByteBuffer} ByteBuffer
	     * @expose
	     * @see ByteBuffer#toDebug
	     */
	    ByteBuffer.fromDebug = function(str, littleEndian, noAssert) {
	        var k = str.length,
	            bb = new ByteBuffer(((k+1)/3)|0, littleEndian, noAssert);
	        var i = 0, j = 0, ch, b,
	            rs = false, // Require symbol next
	            ho = false, hm = false, hl = false, // Already has offset (ho), markedOffset (hm), limit (hl)?
	            fail = false;
	        while (i<k) {
	            switch (ch = str.charAt(i++)) {
	                case '!':
	                    if (!noAssert) {
	                        if (ho || hm || hl) {
	                            fail = true;
	                            break;
	                        }
	                        ho = hm = hl = true;
	                    }
	                    bb.offset = bb.markedOffset = bb.limit = j;
	                    rs = false;
	                    break;
	                case '|':
	                    if (!noAssert) {
	                        if (ho || hl) {
	                            fail = true;
	                            break;
	                        }
	                        ho = hl = true;
	                    }
	                    bb.offset = bb.limit = j;
	                    rs = false;
	                    break;
	                case '[':
	                    if (!noAssert) {
	                        if (ho || hm) {
	                            fail = true;
	                            break;
	                        }
	                        ho = hm = true;
	                    }
	                    bb.offset = bb.markedOffset = j;
	                    rs = false;
	                    break;
	                case '<':
	                    if (!noAssert) {
	                        if (ho) {
	                            fail = true;
	                            break;
	                        }
	                        ho = true;
	                    }
	                    bb.offset = j;
	                    rs = false;
	                    break;
	                case ']':
	                    if (!noAssert) {
	                        if (hl || hm) {
	                            fail = true;
	                            break;
	                        }
	                        hl = hm = true;
	                    }
	                    bb.limit = bb.markedOffset = j;
	                    rs = false;
	                    break;
	                case '>':
	                    if (!noAssert) {
	                        if (hl) {
	                            fail = true;
	                            break;
	                        }
	                        hl = true;
	                    }
	                    bb.limit = j;
	                    rs = false;
	                    break;
	                case "'":
	                    if (!noAssert) {
	                        if (hm) {
	                            fail = true;
	                            break;
	                        }
	                        hm = true;
	                    }
	                    bb.markedOffset = j;
	                    rs = false;
	                    break;
	                case ' ':
	                    rs = false;
	                    break;
	                default:
	                    if (!noAssert) {
	                        if (rs) {
	                            fail = true;
	                            break;
	                        }
	                    }
	                    b = parseInt(ch+str.charAt(i++), 16);
	                    if (!noAssert) {
	                        if (isNaN(b) || b < 0 || b > 255)
	                            throw TypeError("Illegal str: Not a debug encoded string");
	                    }
	                    bb.view[j++] = b;
	                    rs = true;
	            }
	            if (fail)
	                throw TypeError("Illegal str: Invalid symbol at "+i);
	        }
	        if (!noAssert) {
	            if (!ho || !hl)
	                throw TypeError("Illegal str: Missing offset or limit");
	            if (j<bb.buffer.byteLength)
	                throw TypeError("Illegal str: Not a debug encoded string (is it hex?) "+j+" < "+k);
	        }
	        return bb;
	    };

	    // encodings/hex

	    /**
	     * Encodes this ByteBuffer's contents to a hex encoded string.
	     * @param {number=} begin Offset to begin at. Defaults to {@link ByteBuffer#offset}.
	     * @param {number=} end Offset to end at. Defaults to {@link ByteBuffer#limit}.
	     * @returns {string} Hex encoded string
	     * @expose
	     */
	    ByteBufferPrototype.toHex = function(begin, end) {
	        begin = typeof begin === 'undefined' ? this.offset : begin;
	        end = typeof end === 'undefined' ? this.limit : end;
	        if (!this.noAssert) {
	            if (typeof begin !== 'number' || begin % 1 !== 0)
	                throw TypeError("Illegal begin: Not an integer");
	            begin >>>= 0;
	            if (typeof end !== 'number' || end % 1 !== 0)
	                throw TypeError("Illegal end: Not an integer");
	            end >>>= 0;
	            if (begin < 0 || begin > end || end > this.buffer.byteLength)
	                throw RangeError("Illegal range: 0 <= "+begin+" <= "+end+" <= "+this.buffer.byteLength);
	        }
	        var out = new Array(end - begin),
	            b;
	        while (begin < end) {
	            b = this.view[begin++];
	            if (b < 0x10)
	                out.push("0", b.toString(16));
	            else out.push(b.toString(16));
	        }
	        return out.join('');
	    };

	    /**
	     * Decodes a hex encoded string to a ByteBuffer.
	     * @param {string} str String to decode
	     * @param {boolean=} littleEndian Whether to use little or big endian byte order. Defaults to
	     *  {@link ByteBuffer.DEFAULT_ENDIAN}.
	     * @param {boolean=} noAssert Whether to skip assertions of offsets and values. Defaults to
	     *  {@link ByteBuffer.DEFAULT_NOASSERT}.
	     * @returns {!ByteBuffer} ByteBuffer
	     * @expose
	     */
	    ByteBuffer.fromHex = function(str, littleEndian, noAssert) {
	        if (!noAssert) {
	            if (typeof str !== 'string')
	                throw TypeError("Illegal str: Not a string");
	            if (str.length % 2 !== 0)
	                throw TypeError("Illegal str: Length not a multiple of 2");
	        }
	        var k = str.length,
	            bb = new ByteBuffer((k / 2) | 0, littleEndian),
	            b;
	        for (var i=0, j=0; i<k; i+=2) {
	            b = parseInt(str.substring(i, i+2), 16);
	            if (!noAssert)
	                if (!isFinite(b) || b < 0 || b > 255)
	                    throw TypeError("Illegal str: Contains non-hex characters");
	            bb.view[j++] = b;
	        }
	        bb.limit = j;
	        return bb;
	    };

	    // utfx-embeddable

	    /**
	     * utfx-embeddable (c) 2014 Daniel Wirtz <dcode@dcode.io>
	     * Released under the Apache License, Version 2.0
	     * see: https://github.com/dcodeIO/utfx for details
	     */
	    var utfx = function() {
	        "use strict";

	        /**
	         * utfx namespace.
	         * @inner
	         * @type {!Object.<string,*>}
	         */
	        var utfx = {};

	        /**
	         * Maximum valid code point.
	         * @type {number}
	         * @const
	         */
	        utfx.MAX_CODEPOINT = 0x10FFFF;

	        /**
	         * Encodes UTF8 code points to UTF8 bytes.
	         * @param {(!function():number|null) | number} src Code points source, either as a function returning the next code point
	         *  respectively `null` if there are no more code points left or a single numeric code point.
	         * @param {!function(number)} dst Bytes destination as a function successively called with the next byte
	         */
	        utfx.encodeUTF8 = function(src, dst) {
	            var cp = null;
	            if (typeof src === 'number')
	                cp = src,
	                src = function() { return null; };
	            while (cp !== null || (cp = src()) !== null) {
	                if (cp < 0x80)
	                    dst(cp&0x7F);
	                else if (cp < 0x800)
	                    dst(((cp>>6)&0x1F)|0xC0),
	                    dst((cp&0x3F)|0x80);
	                else if (cp < 0x10000)
	                    dst(((cp>>12)&0x0F)|0xE0),
	                    dst(((cp>>6)&0x3F)|0x80),
	                    dst((cp&0x3F)|0x80);
	                else
	                    dst(((cp>>18)&0x07)|0xF0),
	                    dst(((cp>>12)&0x3F)|0x80),
	                    dst(((cp>>6)&0x3F)|0x80),
	                    dst((cp&0x3F)|0x80);
	                cp = null;
	            }
	        };

	        /**
	         * Decodes UTF8 bytes to UTF8 code points.
	         * @param {!function():number|null} src Bytes source as a function returning the next byte respectively `null` if there
	         *  are no more bytes left.
	         * @param {!function(number)} dst Code points destination as a function successively called with each decoded code point.
	         * @throws {RangeError} If a starting byte is invalid in UTF8
	         * @throws {Error} If the last sequence is truncated. Has an array property `bytes` holding the
	         *  remaining bytes.
	         */
	        utfx.decodeUTF8 = function(src, dst) {
	            var a, b, c, d, fail = function(b) {
	                b = b.slice(0, b.indexOf(null));
	                var err = Error(b.toString());
	                err.name = "TruncatedError";
	                err['bytes'] = b;
	                throw err;
	            };
	            while ((a = src()) !== null) {
	                if ((a&0x80) === 0)
	                    dst(a);
	                else if ((a&0xE0) === 0xC0)
	                    ((b = src()) === null) && fail([a, b]),
	                    dst(((a&0x1F)<<6) | (b&0x3F));
	                else if ((a&0xF0) === 0xE0)
	                    ((b=src()) === null || (c=src()) === null) && fail([a, b, c]),
	                    dst(((a&0x0F)<<12) | ((b&0x3F)<<6) | (c&0x3F));
	                else if ((a&0xF8) === 0xF0)
	                    ((b=src()) === null || (c=src()) === null || (d=src()) === null) && fail([a, b, c ,d]),
	                    dst(((a&0x07)<<18) | ((b&0x3F)<<12) | ((c&0x3F)<<6) | (d&0x3F));
	                else throw RangeError("Illegal starting byte: "+a);
	            }
	        };

	        /**
	         * Converts UTF16 characters to UTF8 code points.
	         * @param {!function():number|null} src Characters source as a function returning the next char code respectively
	         *  `null` if there are no more characters left.
	         * @param {!function(number)} dst Code points destination as a function successively called with each converted code
	         *  point.
	         */
	        utfx.UTF16toUTF8 = function(src, dst) {
	            var c1, c2 = null;
	            while (true) {
	                if ((c1 = c2 !== null ? c2 : src()) === null)
	                    break;
	                if (c1 >= 0xD800 && c1 <= 0xDFFF) {
	                    if ((c2 = src()) !== null) {
	                        if (c2 >= 0xDC00 && c2 <= 0xDFFF) {
	                            dst((c1-0xD800)*0x400+c2-0xDC00+0x10000);
	                            c2 = null; continue;
	                        }
	                    }
	                }
	                dst(c1);
	            }
	            if (c2 !== null) dst(c2);
	        };

	        /**
	         * Converts UTF8 code points to UTF16 characters.
	         * @param {(!function():number|null) | number} src Code points source, either as a function returning the next code point
	         *  respectively `null` if there are no more code points left or a single numeric code point.
	         * @param {!function(number)} dst Characters destination as a function successively called with each converted char code.
	         * @throws {RangeError} If a code point is out of range
	         */
	        utfx.UTF8toUTF16 = function(src, dst) {
	            var cp = null;
	            if (typeof src === 'number')
	                cp = src, src = function() { return null; };
	            while (cp !== null || (cp = src()) !== null) {
	                if (cp <= 0xFFFF)
	                    dst(cp);
	                else
	                    cp -= 0x10000,
	                    dst((cp>>10)+0xD800),
	                    dst((cp%0x400)+0xDC00);
	                cp = null;
	            }
	        };

	        /**
	         * Converts and encodes UTF16 characters to UTF8 bytes.
	         * @param {!function():number|null} src Characters source as a function returning the next char code respectively `null`
	         *  if there are no more characters left.
	         * @param {!function(number)} dst Bytes destination as a function successively called with the next byte.
	         */
	        utfx.encodeUTF16toUTF8 = function(src, dst) {
	            utfx.UTF16toUTF8(src, function(cp) {
	                utfx.encodeUTF8(cp, dst);
	            });
	        };

	        /**
	         * Decodes and converts UTF8 bytes to UTF16 characters.
	         * @param {!function():number|null} src Bytes source as a function returning the next byte respectively `null` if there
	         *  are no more bytes left.
	         * @param {!function(number)} dst Characters destination as a function successively called with each converted char code.
	         * @throws {RangeError} If a starting byte is invalid in UTF8
	         * @throws {Error} If the last sequence is truncated. Has an array property `bytes` holding the remaining bytes.
	         */
	        utfx.decodeUTF8toUTF16 = function(src, dst) {
	            utfx.decodeUTF8(src, function(cp) {
	                utfx.UTF8toUTF16(cp, dst);
	            });
	        };

	        /**
	         * Calculates the byte length of an UTF8 code point.
	         * @param {number} cp UTF8 code point
	         * @returns {number} Byte length
	         */
	        utfx.calculateCodePoint = function(cp) {
	            return (cp < 0x80) ? 1 : (cp < 0x800) ? 2 : (cp < 0x10000) ? 3 : 4;
	        };

	        /**
	         * Calculates the number of UTF8 bytes required to store UTF8 code points.
	         * @param {(!function():number|null)} src Code points source as a function returning the next code point respectively
	         *  `null` if there are no more code points left.
	         * @returns {number} The number of UTF8 bytes required
	         */
	        utfx.calculateUTF8 = function(src) {
	            var cp, l=0;
	            while ((cp = src()) !== null)
	                l += (cp < 0x80) ? 1 : (cp < 0x800) ? 2 : (cp < 0x10000) ? 3 : 4;
	            return l;
	        };

	        /**
	         * Calculates the number of UTF8 code points respectively UTF8 bytes required to store UTF16 char codes.
	         * @param {(!function():number|null)} src Characters source as a function returning the next char code respectively
	         *  `null` if there are no more characters left.
	         * @returns {!Array.<number>} The number of UTF8 code points at index 0 and the number of UTF8 bytes required at index 1.
	         */
	        utfx.calculateUTF16asUTF8 = function(src) {
	            var n=0, l=0;
	            utfx.UTF16toUTF8(src, function(cp) {
	                ++n; l += (cp < 0x80) ? 1 : (cp < 0x800) ? 2 : (cp < 0x10000) ? 3 : 4;
	            });
	            return [n,l];
	        };

	        return utfx;
	    }();

	    // encodings/utf8

	    /**
	     * Encodes this ByteBuffer's contents between {@link ByteBuffer#offset} and {@link ByteBuffer#limit} to an UTF8 encoded
	     *  string.
	     * @returns {string} Hex encoded string
	     * @throws {RangeError} If `offset > limit`
	     * @expose
	     */
	    ByteBufferPrototype.toUTF8 = function(begin, end) {
	        if (typeof begin === 'undefined') begin = this.offset;
	        if (typeof end === 'undefined') end = this.limit;
	        if (!this.noAssert) {
	            if (typeof begin !== 'number' || begin % 1 !== 0)
	                throw TypeError("Illegal begin: Not an integer");
	            begin >>>= 0;
	            if (typeof end !== 'number' || end % 1 !== 0)
	                throw TypeError("Illegal end: Not an integer");
	            end >>>= 0;
	            if (begin < 0 || begin > end || end > this.buffer.byteLength)
	                throw RangeError("Illegal range: 0 <= "+begin+" <= "+end+" <= "+this.buffer.byteLength);
	        }
	        var sd; try {
	            utfx.decodeUTF8toUTF16(function() {
	                return begin < end ? this.view[begin++] : null;
	            }.bind(this), sd = stringDestination());
	        } catch (e) {
	            if (begin !== end)
	                throw RangeError("Illegal range: Truncated data, "+begin+" != "+end);
	        }
	        return sd();
	    };

	    /**
	     * Decodes an UTF8 encoded string to a ByteBuffer.
	     * @param {string} str String to decode
	     * @param {boolean=} littleEndian Whether to use little or big endian byte order. Defaults to
	     *  {@link ByteBuffer.DEFAULT_ENDIAN}.
	     * @param {boolean=} noAssert Whether to skip assertions of offsets and values. Defaults to
	     *  {@link ByteBuffer.DEFAULT_NOASSERT}.
	     * @returns {!ByteBuffer} ByteBuffer
	     * @expose
	     */
	    ByteBuffer.fromUTF8 = function(str, littleEndian, noAssert) {
	        if (!noAssert)
	            if (typeof str !== 'string')
	                throw TypeError("Illegal str: Not a string");
	        var bb = new ByteBuffer(utfx.calculateUTF16asUTF8(stringSource(str), true)[1], littleEndian, noAssert),
	            i = 0;
	        utfx.encodeUTF16toUTF8(stringSource(str), function(b) {
	            bb.view[i++] = b;
	        });
	        bb.limit = i;
	        return bb;
	    };

	    return ByteBuffer;
	});
	});

	var empty = {};


	var empty$1 = Object.freeze({
		default: empty
	});

	var require$$0$73 = ( empty$1 && empty$1['default'] ) || empty$1;

	var protobufLight = createCommonjsModule(function (module) {
	/*
	 Copyright 2013 Daniel Wirtz <dcode@dcode.io>

	 Licensed under the Apache License, Version 2.0 (the "License");
	 you may not use this file except in compliance with the License.
	 You may obtain a copy of the License at

	 http://www.apache.org/licenses/LICENSE-2.0

	 Unless required by applicable law or agreed to in writing, software
	 distributed under the License is distributed on an "AS IS" BASIS,
	 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	 See the License for the specific language governing permissions and
	 limitations under the License.
	 */

	/**
	 * @license protobuf.js (c) 2013 Daniel Wirtz <dcode@dcode.io>
	 * Released under the Apache License, Version 2.0
	 * see: https://github.com/dcodeIO/protobuf.js for details
	 */
	(function(global, factory) {

	    /* AMD */ if (typeof define === 'function' && define["amd"])
	        define(["bytebuffer"], factory);
	    /* CommonJS */ else if ('function' === "function" && typeof module === "object" && module && module["exports"])
	        module["exports"] = factory(bytebuffer, true);
	    /* Global */ else
	        (global["dcodeIO"] = global["dcodeIO"] || {})["ProtoBuf"] = factory(global["dcodeIO"]["ByteBuffer"]);

	})(commonjsGlobal, function(ByteBuffer, isCommonJS) {
	    "use strict";

	    /**
	     * The ProtoBuf namespace.
	     * @exports ProtoBuf
	     * @namespace
	     * @expose
	     */
	    var ProtoBuf = {};

	    /**
	     * @type {!function(new: ByteBuffer, ...[*])}
	     * @expose
	     */
	    ProtoBuf.ByteBuffer = ByteBuffer;

	    /**
	     * @type {?function(new: Long, ...[*])}
	     * @expose
	     */
	    ProtoBuf.Long = ByteBuffer.Long || null;

	    /**
	     * ProtoBuf.js version.
	     * @type {string}
	     * @const
	     * @expose
	     */
	    ProtoBuf.VERSION = "5.0.1";

	    /**
	     * Wire types.
	     * @type {Object.<string,number>}
	     * @const
	     * @expose
	     */
	    ProtoBuf.WIRE_TYPES = {};

	    /**
	     * Varint wire type.
	     * @type {number}
	     * @expose
	     */
	    ProtoBuf.WIRE_TYPES.VARINT = 0;

	    /**
	     * Fixed 64 bits wire type.
	     * @type {number}
	     * @const
	     * @expose
	     */
	    ProtoBuf.WIRE_TYPES.BITS64 = 1;

	    /**
	     * Length delimited wire type.
	     * @type {number}
	     * @const
	     * @expose
	     */
	    ProtoBuf.WIRE_TYPES.LDELIM = 2;

	    /**
	     * Start group wire type.
	     * @type {number}
	     * @const
	     * @expose
	     */
	    ProtoBuf.WIRE_TYPES.STARTGROUP = 3;

	    /**
	     * End group wire type.
	     * @type {number}
	     * @const
	     * @expose
	     */
	    ProtoBuf.WIRE_TYPES.ENDGROUP = 4;

	    /**
	     * Fixed 32 bits wire type.
	     * @type {number}
	     * @const
	     * @expose
	     */
	    ProtoBuf.WIRE_TYPES.BITS32 = 5;

	    /**
	     * Packable wire types.
	     * @type {!Array.<number>}
	     * @const
	     * @expose
	     */
	    ProtoBuf.PACKABLE_WIRE_TYPES = [
	        ProtoBuf.WIRE_TYPES.VARINT,
	        ProtoBuf.WIRE_TYPES.BITS64,
	        ProtoBuf.WIRE_TYPES.BITS32
	    ];

	    /**
	     * Types.
	     * @dict
	     * @type {!Object.<string,{name: string, wireType: number, defaultValue: *}>}
	     * @const
	     * @expose
	     */
	    ProtoBuf.TYPES = {
	        // According to the protobuf spec.
	        "int32": {
	            name: "int32",
	            wireType: ProtoBuf.WIRE_TYPES.VARINT,
	            defaultValue: 0
	        },
	        "uint32": {
	            name: "uint32",
	            wireType: ProtoBuf.WIRE_TYPES.VARINT,
	            defaultValue: 0
	        },
	        "sint32": {
	            name: "sint32",
	            wireType: ProtoBuf.WIRE_TYPES.VARINT,
	            defaultValue: 0
	        },
	        "int64": {
	            name: "int64",
	            wireType: ProtoBuf.WIRE_TYPES.VARINT,
	            defaultValue: ProtoBuf.Long ? ProtoBuf.Long.ZERO : undefined
	        },
	        "uint64": {
	            name: "uint64",
	            wireType: ProtoBuf.WIRE_TYPES.VARINT,
	            defaultValue: ProtoBuf.Long ? ProtoBuf.Long.UZERO : undefined
	        },
	        "sint64": {
	            name: "sint64",
	            wireType: ProtoBuf.WIRE_TYPES.VARINT,
	            defaultValue: ProtoBuf.Long ? ProtoBuf.Long.ZERO : undefined
	        },
	        "bool": {
	            name: "bool",
	            wireType: ProtoBuf.WIRE_TYPES.VARINT,
	            defaultValue: false
	        },
	        "double": {
	            name: "double",
	            wireType: ProtoBuf.WIRE_TYPES.BITS64,
	            defaultValue: 0
	        },
	        "string": {
	            name: "string",
	            wireType: ProtoBuf.WIRE_TYPES.LDELIM,
	            defaultValue: ""
	        },
	        "bytes": {
	            name: "bytes",
	            wireType: ProtoBuf.WIRE_TYPES.LDELIM,
	            defaultValue: null // overridden in the code, must be a unique instance
	        },
	        "fixed32": {
	            name: "fixed32",
	            wireType: ProtoBuf.WIRE_TYPES.BITS32,
	            defaultValue: 0
	        },
	        "sfixed32": {
	            name: "sfixed32",
	            wireType: ProtoBuf.WIRE_TYPES.BITS32,
	            defaultValue: 0
	        },
	        "fixed64": {
	            name: "fixed64",
	            wireType: ProtoBuf.WIRE_TYPES.BITS64,
	            defaultValue:  ProtoBuf.Long ? ProtoBuf.Long.UZERO : undefined
	        },
	        "sfixed64": {
	            name: "sfixed64",
	            wireType: ProtoBuf.WIRE_TYPES.BITS64,
	            defaultValue: ProtoBuf.Long ? ProtoBuf.Long.ZERO : undefined
	        },
	        "float": {
	            name: "float",
	            wireType: ProtoBuf.WIRE_TYPES.BITS32,
	            defaultValue: 0
	        },
	        "enum": {
	            name: "enum",
	            wireType: ProtoBuf.WIRE_TYPES.VARINT,
	            defaultValue: 0
	        },
	        "message": {
	            name: "message",
	            wireType: ProtoBuf.WIRE_TYPES.LDELIM,
	            defaultValue: null
	        },
	        "group": {
	            name: "group",
	            wireType: ProtoBuf.WIRE_TYPES.STARTGROUP,
	            defaultValue: null
	        }
	    };

	    /**
	     * Valid map key types.
	     * @type {!Array.<!Object.<string,{name: string, wireType: number, defaultValue: *}>>}
	     * @const
	     * @expose
	     */
	    ProtoBuf.MAP_KEY_TYPES = [
	        ProtoBuf.TYPES["int32"],
	        ProtoBuf.TYPES["sint32"],
	        ProtoBuf.TYPES["sfixed32"],
	        ProtoBuf.TYPES["uint32"],
	        ProtoBuf.TYPES["fixed32"],
	        ProtoBuf.TYPES["int64"],
	        ProtoBuf.TYPES["sint64"],
	        ProtoBuf.TYPES["sfixed64"],
	        ProtoBuf.TYPES["uint64"],
	        ProtoBuf.TYPES["fixed64"],
	        ProtoBuf.TYPES["bool"],
	        ProtoBuf.TYPES["string"],
	        ProtoBuf.TYPES["bytes"]
	    ];

	    /**
	     * Minimum field id.
	     * @type {number}
	     * @const
	     * @expose
	     */
	    ProtoBuf.ID_MIN = 1;

	    /**
	     * Maximum field id.
	     * @type {number}
	     * @const
	     * @expose
	     */
	    ProtoBuf.ID_MAX = 0x1FFFFFFF;

	    /**
	     * If set to `true`, field names will be converted from underscore notation to camel case. Defaults to `false`.
	     *  Must be set prior to parsing.
	     * @type {boolean}
	     * @expose
	     */
	    ProtoBuf.convertFieldsToCamelCase = false;

	    /**
	     * By default, messages are populated with (setX, set_x) accessors for each field. This can be disabled by
	     *  setting this to `false` prior to building messages.
	     * @type {boolean}
	     * @expose
	     */
	    ProtoBuf.populateAccessors = true;

	    /**
	     * By default, messages are populated with default values if a field is not present on the wire. To disable
	     *  this behavior, set this setting to `false`.
	     * @type {boolean}
	     * @expose
	     */
	    ProtoBuf.populateDefaults = true;

	    /**
	     * @alias ProtoBuf.Util
	     * @expose
	     */
	    ProtoBuf.Util = (function() {
	        "use strict";

	        /**
	         * ProtoBuf utilities.
	         * @exports ProtoBuf.Util
	         * @namespace
	         */
	        var Util = {};

	        /**
	         * Flag if running in node or not.
	         * @type {boolean}
	         * @const
	         * @expose
	         */
	        Util.IS_NODE = !!(
	            typeof process === 'object' && process+'' === '[object process]' && !process['browser']
	        );

	        /**
	         * Constructs a XMLHttpRequest object.
	         * @return {XMLHttpRequest}
	         * @throws {Error} If XMLHttpRequest is not supported
	         * @expose
	         */
	        Util.XHR = function() {
	            // No dependencies please, ref: http://www.quirksmode.org/js/xmlhttp.html
	            var XMLHttpFactories = [
	                function () {return new XMLHttpRequest()},
	                function () {return new ActiveXObject("Msxml2.XMLHTTP")},
	                function () {return new ActiveXObject("Msxml3.XMLHTTP")},
	                function () {return new ActiveXObject("Microsoft.XMLHTTP")}
	            ];
	            /** @type {?XMLHttpRequest} */
	            var xhr = null;
	            for (var i=0;i<XMLHttpFactories.length;i++) {
	                try { xhr = XMLHttpFactories[i](); }
	                catch (e) { continue; }
	                break;
	            }
	            if (!xhr)
	                throw Error("XMLHttpRequest is not supported");
	            return xhr;
	        };

	        /**
	         * Fetches a resource.
	         * @param {string} path Resource path
	         * @param {function(?string)=} callback Callback receiving the resource's contents. If omitted the resource will
	         *   be fetched synchronously. If the request failed, contents will be null.
	         * @return {?string|undefined} Resource contents if callback is omitted (null if the request failed), else undefined.
	         * @expose
	         */
	        Util.fetch = function(path, callback) {
	            if (callback && typeof callback != 'function')
	                callback = null;
	            if (Util.IS_NODE) {
	                var fs = require$$0$73;
	                if (callback) {
	                    fs.readFile(path, function(err, data) {
	                        if (err)
	                            callback(null);
	                        else
	                            callback(""+data);
	                    });
	                } else
	                    try {
	                        return fs.readFileSync(path);
	                    } catch (e) {
	                        return null;
	                    }
	            } else {
	                var xhr = Util.XHR();
	                xhr.open('GET', path, callback ? true : false);
	                // xhr.setRequestHeader('User-Agent', 'XMLHTTP/1.0');
	                xhr.setRequestHeader('Accept', 'text/plain');
	                if (typeof xhr.overrideMimeType === 'function') xhr.overrideMimeType('text/plain');
	                if (callback) {
	                    xhr.onreadystatechange = function() {
	                        if (xhr.readyState != 4) return;
	                        if (/* remote */ xhr.status == 200 || /* local */ (xhr.status == 0 && typeof xhr.responseText === 'string'))
	                            callback(xhr.responseText);
	                        else
	                            callback(null);
	                    };
	                    if (xhr.readyState == 4)
	                        return;
	                    xhr.send(null);
	                } else {
	                    xhr.send(null);
	                    if (/* remote */ xhr.status == 200 || /* local */ (xhr.status == 0 && typeof xhr.responseText === 'string'))
	                        return xhr.responseText;
	                    return null;
	                }
	            }
	        };

	        /**
	         * Converts a string to camel case.
	         * @param {string} str
	         * @returns {string}
	         * @expose
	         */
	        Util.toCamelCase = function(str) {
	            return str.replace(/_([a-zA-Z])/g, function ($0, $1) {
	                return $1.toUpperCase();
	            });
	        };

	        return Util;
	    })();

	    /**
	     * Language expressions.
	     * @type {!Object.<string,!RegExp>}
	     * @expose
	     */
	    ProtoBuf.Lang = {

	        // Characters always ending a statement
	        DELIM: /[\s\{\}=;:\[\],'"\(\)<>]/g,

	        // Field rules
	        RULE: /^(?:required|optional|repeated|map)$/,

	        // Field types
	        TYPE: /^(?:double|float|int32|uint32|sint32|int64|uint64|sint64|fixed32|sfixed32|fixed64|sfixed64|bool|string|bytes)$/,

	        // Names
	        NAME: /^[a-zA-Z_][a-zA-Z_0-9]*$/,

	        // Type definitions
	        TYPEDEF: /^[a-zA-Z][a-zA-Z_0-9]*$/,

	        // Type references
	        TYPEREF: /^(?:\.?[a-zA-Z_][a-zA-Z_0-9]*)+$/,

	        // Fully qualified type references
	        FQTYPEREF: /^(?:\.[a-zA-Z][a-zA-Z_0-9]*)+$/,

	        // All numbers
	        NUMBER: /^-?(?:[1-9][0-9]*|0|0[xX][0-9a-fA-F]+|0[0-7]+|([0-9]*(\.[0-9]*)?([Ee][+-]?[0-9]+)?)|inf|nan)$/,

	        // Decimal numbers
	        NUMBER_DEC: /^(?:[1-9][0-9]*|0)$/,

	        // Hexadecimal numbers
	        NUMBER_HEX: /^0[xX][0-9a-fA-F]+$/,

	        // Octal numbers
	        NUMBER_OCT: /^0[0-7]+$/,

	        // Floating point numbers
	        NUMBER_FLT: /^([0-9]*(\.[0-9]*)?([Ee][+-]?[0-9]+)?|inf|nan)$/,

	        // Booleans
	        BOOL: /^(?:true|false)$/i,

	        // Id numbers
	        ID: /^(?:[1-9][0-9]*|0|0[xX][0-9a-fA-F]+|0[0-7]+)$/,

	        // Negative id numbers (enum values)
	        NEGID: /^\-?(?:[1-9][0-9]*|0|0[xX][0-9a-fA-F]+|0[0-7]+)$/,

	        // Whitespaces
	        WHITESPACE: /\s/,

	        // All strings
	        STRING: /(?:"([^"\\]*(?:\\.[^"\\]*)*)")|(?:'([^'\\]*(?:\\.[^'\\]*)*)')/g,

	        // Double quoted strings
	        STRING_DQ: /(?:"([^"\\]*(?:\\.[^"\\]*)*)")/g,

	        // Single quoted strings
	        STRING_SQ: /(?:'([^'\\]*(?:\\.[^'\\]*)*)')/g
	    };


	    /**
	     * @alias ProtoBuf.Reflect
	     * @expose
	     */
	    ProtoBuf.Reflect = (function(ProtoBuf) {
	        "use strict";

	        /**
	         * Reflection types.
	         * @exports ProtoBuf.Reflect
	         * @namespace
	         */
	        var Reflect = {};

	        /**
	         * Constructs a Reflect base class.
	         * @exports ProtoBuf.Reflect.T
	         * @constructor
	         * @abstract
	         * @param {!ProtoBuf.Builder} builder Builder reference
	         * @param {?ProtoBuf.Reflect.T} parent Parent object
	         * @param {string} name Object name
	         */
	        var T = function(builder, parent, name) {

	            /**
	             * Builder reference.
	             * @type {!ProtoBuf.Builder}
	             * @expose
	             */
	            this.builder = builder;

	            /**
	             * Parent object.
	             * @type {?ProtoBuf.Reflect.T}
	             * @expose
	             */
	            this.parent = parent;

	            /**
	             * Object name in namespace.
	             * @type {string}
	             * @expose
	             */
	            this.name = name;

	            /**
	             * Fully qualified class name
	             * @type {string}
	             * @expose
	             */
	            this.className;
	        };

	        /**
	         * @alias ProtoBuf.Reflect.T.prototype
	         * @inner
	         */
	        var TPrototype = T.prototype;

	        /**
	         * Returns the fully qualified name of this object.
	         * @returns {string} Fully qualified name as of ".PATH.TO.THIS"
	         * @expose
	         */
	        TPrototype.fqn = function() {
	            var name = this.name,
	                ptr = this;
	            do {
	                ptr = ptr.parent;
	                if (ptr == null)
	                    break;
	                name = ptr.name+"."+name;
	            } while (true);
	            return name;
	        };

	        /**
	         * Returns a string representation of this Reflect object (its fully qualified name).
	         * @param {boolean=} includeClass Set to true to include the class name. Defaults to false.
	         * @return String representation
	         * @expose
	         */
	        TPrototype.toString = function(includeClass) {
	            return (includeClass ? this.className + " " : "") + this.fqn();
	        };

	        /**
	         * Builds this type.
	         * @throws {Error} If this type cannot be built directly
	         * @expose
	         */
	        TPrototype.build = function() {
	            throw Error(this.toString(true)+" cannot be built directly");
	        };

	        /**
	         * @alias ProtoBuf.Reflect.T
	         * @expose
	         */
	        Reflect.T = T;

	        /**
	         * Constructs a new Namespace.
	         * @exports ProtoBuf.Reflect.Namespace
	         * @param {!ProtoBuf.Builder} builder Builder reference
	         * @param {?ProtoBuf.Reflect.Namespace} parent Namespace parent
	         * @param {string} name Namespace name
	         * @param {Object.<string,*>=} options Namespace options
	         * @param {string?} syntax The syntax level of this definition (e.g., proto3)
	         * @constructor
	         * @extends ProtoBuf.Reflect.T
	         */
	        var Namespace = function(builder, parent, name, options, syntax) {
	            T.call(this, builder, parent, name);

	            /**
	             * @override
	             */
	            this.className = "Namespace";

	            /**
	             * Children inside the namespace.
	             * @type {!Array.<ProtoBuf.Reflect.T>}
	             */
	            this.children = [];

	            /**
	             * Options.
	             * @type {!Object.<string, *>}
	             */
	            this.options = options || {};

	            /**
	             * Syntax level (e.g., proto2 or proto3).
	             * @type {!string}
	             */
	            this.syntax = syntax || "proto2";
	        };

	        /**
	         * @alias ProtoBuf.Reflect.Namespace.prototype
	         * @inner
	         */
	        var NamespacePrototype = Namespace.prototype = Object.create(T.prototype);

	        /**
	         * Returns an array of the namespace's children.
	         * @param {ProtoBuf.Reflect.T=} type Filter type (returns instances of this type only). Defaults to null (all children).
	         * @return {Array.<ProtoBuf.Reflect.T>}
	         * @expose
	         */
	        NamespacePrototype.getChildren = function(type) {
	            type = type || null;
	            if (type == null)
	                return this.children.slice();
	            var children = [];
	            for (var i=0, k=this.children.length; i<k; ++i)
	                if (this.children[i] instanceof type)
	                    children.push(this.children[i]);
	            return children;
	        };

	        /**
	         * Adds a child to the namespace.
	         * @param {ProtoBuf.Reflect.T} child Child
	         * @throws {Error} If the child cannot be added (duplicate)
	         * @expose
	         */
	        NamespacePrototype.addChild = function(child) {
	            var other;
	            if (other = this.getChild(child.name)) {
	                // Try to revert camelcase transformation on collision
	                if (other instanceof Message.Field && other.name !== other.originalName && this.getChild(other.originalName) === null)
	                    other.name = other.originalName; // Revert previous first (effectively keeps both originals)
	                else if (child instanceof Message.Field && child.name !== child.originalName && this.getChild(child.originalName) === null)
	                    child.name = child.originalName;
	                else
	                    throw Error("Duplicate name in namespace "+this.toString(true)+": "+child.name);
	            }
	            this.children.push(child);
	        };

	        /**
	         * Gets a child by its name or id.
	         * @param {string|number} nameOrId Child name or id
	         * @return {?ProtoBuf.Reflect.T} The child or null if not found
	         * @expose
	         */
	        NamespacePrototype.getChild = function(nameOrId) {
	            var key = typeof nameOrId === 'number' ? 'id' : 'name';
	            for (var i=0, k=this.children.length; i<k; ++i)
	                if (this.children[i][key] === nameOrId)
	                    return this.children[i];
	            return null;
	        };

	        /**
	         * Resolves a reflect object inside of this namespace.
	         * @param {string|!Array.<string>} qn Qualified name to resolve
	         * @param {boolean=} excludeNonNamespace Excludes non-namespace types, defaults to `false`
	         * @return {?ProtoBuf.Reflect.Namespace} The resolved type or null if not found
	         * @expose
	         */
	        NamespacePrototype.resolve = function(qn, excludeNonNamespace) {
	            var part = typeof qn === 'string' ? qn.split(".") : qn,
	                ptr = this,
	                i = 0;
	            if (part[i] === "") { // Fully qualified name, e.g. ".My.Message'
	                while (ptr.parent !== null)
	                    ptr = ptr.parent;
	                i++;
	            }
	            var child;
	            do {
	                do {
	                    if (!(ptr instanceof Reflect.Namespace)) {
	                        ptr = null;
	                        break;
	                    }
	                    child = ptr.getChild(part[i]);
	                    if (!child || !(child instanceof Reflect.T) || (excludeNonNamespace && !(child instanceof Reflect.Namespace))) {
	                        ptr = null;
	                        break;
	                    }
	                    ptr = child; i++;
	                } while (i < part.length);
	                if (ptr != null)
	                    break; // Found
	                // Else search the parent
	                if (this.parent !== null)
	                    return this.parent.resolve(qn, excludeNonNamespace);
	            } while (ptr != null);
	            return ptr;
	        };

	        /**
	         * Determines the shortest qualified name of the specified type, if any, relative to this namespace.
	         * @param {!ProtoBuf.Reflect.T} t Reflection type
	         * @returns {string} The shortest qualified name or, if there is none, the fqn
	         * @expose
	         */
	        NamespacePrototype.qn = function(t) {
	            var part = [], ptr = t;
	            do {
	                part.unshift(ptr.name);
	                ptr = ptr.parent;
	            } while (ptr !== null);
	            for (var len=1; len <= part.length; len++) {
	                var qn = part.slice(part.length-len);
	                if (t === this.resolve(qn, t instanceof Reflect.Namespace))
	                    return qn.join(".");
	            }
	            return t.fqn();
	        };

	        /**
	         * Builds the namespace and returns the runtime counterpart.
	         * @return {Object.<string,Function|Object>} Runtime namespace
	         * @expose
	         */
	        NamespacePrototype.build = function() {
	            /** @dict */
	            var ns = {};
	            var children = this.children;
	            for (var i=0, k=children.length, child; i<k; ++i) {
	                child = children[i];
	                if (child instanceof Namespace)
	                    ns[child.name] = child.build();
	            }
	            if (Object.defineProperty)
	                Object.defineProperty(ns, "$options", { "value": this.buildOpt() });
	            return ns;
	        };

	        /**
	         * Builds the namespace's '$options' property.
	         * @return {Object.<string,*>}
	         */
	        NamespacePrototype.buildOpt = function() {
	            var opt = {},
	                keys = Object.keys(this.options);
	            for (var i=0, k=keys.length; i<k; ++i) {
	                var key = keys[i],
	                    val = this.options[keys[i]];
	                // TODO: Options are not resolved, yet.
	                // if (val instanceof Namespace) {
	                //     opt[key] = val.build();
	                // } else {
	                opt[key] = val;
	                // }
	            }
	            return opt;
	        };

	        /**
	         * Gets the value assigned to the option with the specified name.
	         * @param {string=} name Returns the option value if specified, otherwise all options are returned.
	         * @return {*|Object.<string,*>}null} Option value or NULL if there is no such option
	         */
	        NamespacePrototype.getOption = function(name) {
	            if (typeof name === 'undefined')
	                return this.options;
	            return typeof this.options[name] !== 'undefined' ? this.options[name] : null;
	        };

	        /**
	         * @alias ProtoBuf.Reflect.Namespace
	         * @expose
	         */
	        Reflect.Namespace = Namespace;

	        /**
	         * Constructs a new Element implementation that checks and converts values for a
	         * particular field type, as appropriate.
	         *
	         * An Element represents a single value: either the value of a singular field,
	         * or a value contained in one entry of a repeated field or map field. This
	         * class does not implement these higher-level concepts; it only encapsulates
	         * the low-level typechecking and conversion.
	         *
	         * @exports ProtoBuf.Reflect.Element
	         * @param {{name: string, wireType: number}} type Resolved data type
	         * @param {ProtoBuf.Reflect.T|null} resolvedType Resolved type, if relevant
	         * (e.g. submessage field).
	         * @param {boolean} isMapKey Is this element a Map key? The value will be
	         * converted to string form if so.
	         * @param {string} syntax Syntax level of defining message type, e.g.,
	         * proto2 or proto3.
	         * @constructor
	         */
	        var Element = function(type, resolvedType, isMapKey, syntax) {

	            /**
	             * Element type, as a string (e.g., int32).
	             * @type {{name: string, wireType: number}}
	             */
	            this.type = type;

	            /**
	             * Element type reference to submessage or enum definition, if needed.
	             * @type {ProtoBuf.Reflect.T|null}
	             */
	            this.resolvedType = resolvedType;

	            /**
	             * Element is a map key.
	             * @type {boolean}
	             */
	            this.isMapKey = isMapKey;

	            /**
	             * Syntax level of defining message type, e.g., proto2 or proto3.
	             * @type {string}
	             */
	            this.syntax = syntax;

	            if (isMapKey && ProtoBuf.MAP_KEY_TYPES.indexOf(type) < 0)
	                throw Error("Invalid map key type: " + type.name);
	        };

	        var ElementPrototype = Element.prototype;

	        /**
	         * Obtains a (new) default value for the specified type.
	         * @param type {string|{name: string, wireType: number}} Field type
	         * @returns {*} Default value
	         * @inner
	         */
	        function mkDefault(type) {
	            if (typeof type === 'string')
	                type = ProtoBuf.TYPES[type];
	            if (typeof type.defaultValue === 'undefined')
	                throw Error("default value for type "+type.name+" is not supported");
	            if (type == ProtoBuf.TYPES["bytes"])
	                return new ByteBuffer(0);
	            return type.defaultValue;
	        }

	        /**
	         * Returns the default value for this field in proto3.
	         * @function
	         * @param type {string|{name: string, wireType: number}} the field type
	         * @returns {*} Default value
	         */
	        Element.defaultFieldValue = mkDefault;

	        /**
	         * Makes a Long from a value.
	         * @param {{low: number, high: number, unsigned: boolean}|string|number} value Value
	         * @param {boolean=} unsigned Whether unsigned or not, defaults to reuse it from Long-like objects or to signed for
	         *  strings and numbers
	         * @returns {!Long}
	         * @throws {Error} If the value cannot be converted to a Long
	         * @inner
	         */
	        function mkLong(value, unsigned) {
	            if (value && typeof value.low === 'number' && typeof value.high === 'number' && typeof value.unsigned === 'boolean'
	                && value.low === value.low && value.high === value.high)
	                return new ProtoBuf.Long(value.low, value.high, typeof unsigned === 'undefined' ? value.unsigned : unsigned);
	            if (typeof value === 'string')
	                return ProtoBuf.Long.fromString(value, unsigned || false, 10);
	            if (typeof value === 'number')
	                return ProtoBuf.Long.fromNumber(value, unsigned || false);
	            throw Error("not convertible to Long");
	        }

	        /**
	         * Checks if the given value can be set for an element of this type (singular
	         * field or one element of a repeated field or map).
	         * @param {*} value Value to check
	         * @return {*} Verified, maybe adjusted, value
	         * @throws {Error} If the value cannot be verified for this element slot
	         * @expose
	         */
	        ElementPrototype.verifyValue = function(value) {
	            var self = this;
	            function fail(val, msg) {
	                throw Error("Illegal value for "+self.toString(true)+" of type "+self.type.name+": "+val+" ("+msg+")");
	            }
	            switch (this.type) {
	                // Signed 32bit
	                case ProtoBuf.TYPES["int32"]:
	                case ProtoBuf.TYPES["sint32"]:
	                case ProtoBuf.TYPES["sfixed32"]:
	                    // Account for !NaN: value === value
	                    if (typeof value !== 'number' || (value === value && value % 1 !== 0))
	                        fail(typeof value, "not an integer");
	                    return value > 4294967295 ? value | 0 : value;

	                // Unsigned 32bit
	                case ProtoBuf.TYPES["uint32"]:
	                case ProtoBuf.TYPES["fixed32"]:
	                    if (typeof value !== 'number' || (value === value && value % 1 !== 0))
	                        fail(typeof value, "not an integer");
	                    return value < 0 ? value >>> 0 : value;

	                // Signed 64bit
	                case ProtoBuf.TYPES["int64"]:
	                case ProtoBuf.TYPES["sint64"]:
	                case ProtoBuf.TYPES["sfixed64"]: {
	                    if (ProtoBuf.Long)
	                        try {
	                            return mkLong(value, false);
	                        } catch (e) {
	                            fail(typeof value, e.message);
	                        }
	                    else
	                        fail(typeof value, "requires Long.js");
	                }

	                // Unsigned 64bit
	                case ProtoBuf.TYPES["uint64"]:
	                case ProtoBuf.TYPES["fixed64"]: {
	                    if (ProtoBuf.Long)
	                        try {
	                            return mkLong(value, true);
	                        } catch (e) {
	                            fail(typeof value, e.message);
	                        }
	                    else
	                        fail(typeof value, "requires Long.js");
	                }

	                // Bool
	                case ProtoBuf.TYPES["bool"]:
	                    if (typeof value !== 'boolean')
	                        fail(typeof value, "not a boolean");
	                    return value;

	                // Float
	                case ProtoBuf.TYPES["float"]:
	                case ProtoBuf.TYPES["double"]:
	                    if (typeof value !== 'number')
	                        fail(typeof value, "not a number");
	                    return value;

	                // Length-delimited string
	                case ProtoBuf.TYPES["string"]:
	                    if (typeof value !== 'string' && !(value && value instanceof String))
	                        fail(typeof value, "not a string");
	                    return ""+value; // Convert String object to string

	                // Length-delimited bytes
	                case ProtoBuf.TYPES["bytes"]:
	                    if (ByteBuffer.isByteBuffer(value))
	                        return value;
	                    return ByteBuffer.wrap(value, "base64");

	                // Constant enum value
	                case ProtoBuf.TYPES["enum"]: {
	                    var values = this.resolvedType.getChildren(ProtoBuf.Reflect.Enum.Value);
	                    for (i=0; i<values.length; i++)
	                        if (values[i].name == value)
	                            return values[i].id;
	                        else if (values[i].id == value)
	                            return values[i].id;

	                    if (this.syntax === 'proto3') {
	                        // proto3: just make sure it's an integer.
	                        if (typeof value !== 'number' || (value === value && value % 1 !== 0))
	                            fail(typeof value, "not an integer");
	                        if (value > 4294967295 || value < 0)
	                            fail(typeof value, "not in range for uint32")
	                        return value;
	                    } else {
	                        // proto2 requires enum values to be valid.
	                        fail(value, "not a valid enum value");
	                    }
	                }
	                // Embedded message
	                case ProtoBuf.TYPES["group"]:
	                case ProtoBuf.TYPES["message"]: {
	                    if (!value || typeof value !== 'object')
	                        fail(typeof value, "object expected");
	                    if (value instanceof this.resolvedType.clazz)
	                        return value;
	                    if (value instanceof ProtoBuf.Builder.Message) {
	                        // Mismatched type: Convert to object (see: https://github.com/dcodeIO/ProtoBuf.js/issues/180)
	                        var obj = {};
	                        for (var i in value)
	                            if (value.hasOwnProperty(i))
	                                obj[i] = value[i];
	                        value = obj;
	                    }
	                    // Else let's try to construct one from a key-value object
	                    return new (this.resolvedType.clazz)(value); // May throw for a hundred of reasons
	                }
	            }

	            // We should never end here
	            throw Error("[INTERNAL] Illegal value for "+this.toString(true)+": "+value+" (undefined type "+this.type+")");
	        };

	        /**
	         * Calculates the byte length of an element on the wire.
	         * @param {number} id Field number
	         * @param {*} value Field value
	         * @returns {number} Byte length
	         * @throws {Error} If the value cannot be calculated
	         * @expose
	         */
	        ElementPrototype.calculateLength = function(id, value) {
	            if (value === null) return 0; // Nothing to encode
	            // Tag has already been written
	            var n;
	            switch (this.type) {
	                case ProtoBuf.TYPES["int32"]:
	                    return value < 0 ? ByteBuffer.calculateVarint64(value) : ByteBuffer.calculateVarint32(value);
	                case ProtoBuf.TYPES["uint32"]:
	                    return ByteBuffer.calculateVarint32(value);
	                case ProtoBuf.TYPES["sint32"]:
	                    return ByteBuffer.calculateVarint32(ByteBuffer.zigZagEncode32(value));
	                case ProtoBuf.TYPES["fixed32"]:
	                case ProtoBuf.TYPES["sfixed32"]:
	                case ProtoBuf.TYPES["float"]:
	                    return 4;
	                case ProtoBuf.TYPES["int64"]:
	                case ProtoBuf.TYPES["uint64"]:
	                    return ByteBuffer.calculateVarint64(value);
	                case ProtoBuf.TYPES["sint64"]:
	                    return ByteBuffer.calculateVarint64(ByteBuffer.zigZagEncode64(value));
	                case ProtoBuf.TYPES["fixed64"]:
	                case ProtoBuf.TYPES["sfixed64"]:
	                    return 8;
	                case ProtoBuf.TYPES["bool"]:
	                    return 1;
	                case ProtoBuf.TYPES["enum"]:
	                    return ByteBuffer.calculateVarint32(value);
	                case ProtoBuf.TYPES["double"]:
	                    return 8;
	                case ProtoBuf.TYPES["string"]:
	                    n = ByteBuffer.calculateUTF8Bytes(value);
	                    return ByteBuffer.calculateVarint32(n) + n;
	                case ProtoBuf.TYPES["bytes"]:
	                    if (value.remaining() < 0)
	                        throw Error("Illegal value for "+this.toString(true)+": "+value.remaining()+" bytes remaining");
	                    return ByteBuffer.calculateVarint32(value.remaining()) + value.remaining();
	                case ProtoBuf.TYPES["message"]:
	                    n = this.resolvedType.calculate(value);
	                    return ByteBuffer.calculateVarint32(n) + n;
	                case ProtoBuf.TYPES["group"]:
	                    n = this.resolvedType.calculate(value);
	                    return n + ByteBuffer.calculateVarint32((id << 3) | ProtoBuf.WIRE_TYPES.ENDGROUP);
	            }
	            // We should never end here
	            throw Error("[INTERNAL] Illegal value to encode in "+this.toString(true)+": "+value+" (unknown type)");
	        };

	        /**
	         * Encodes a value to the specified buffer. Does not encode the key.
	         * @param {number} id Field number
	         * @param {*} value Field value
	         * @param {ByteBuffer} buffer ByteBuffer to encode to
	         * @return {ByteBuffer} The ByteBuffer for chaining
	         * @throws {Error} If the value cannot be encoded
	         * @expose
	         */
	        ElementPrototype.encodeValue = function(id, value, buffer) {
	            if (value === null) return buffer; // Nothing to encode
	            // Tag has already been written

	            switch (this.type) {
	                // 32bit signed varint
	                case ProtoBuf.TYPES["int32"]:
	                    // "If you use int32 or int64 as the type for a negative number, the resulting varint is always ten bytes
	                    // long – it is, effectively, treated like a very large unsigned integer." (see #122)
	                    if (value < 0)
	                        buffer.writeVarint64(value);
	                    else
	                        buffer.writeVarint32(value);
	                    break;

	                // 32bit unsigned varint
	                case ProtoBuf.TYPES["uint32"]:
	                    buffer.writeVarint32(value);
	                    break;

	                // 32bit varint zig-zag
	                case ProtoBuf.TYPES["sint32"]:
	                    buffer.writeVarint32ZigZag(value);
	                    break;

	                // Fixed unsigned 32bit
	                case ProtoBuf.TYPES["fixed32"]:
	                    buffer.writeUint32(value);
	                    break;

	                // Fixed signed 32bit
	                case ProtoBuf.TYPES["sfixed32"]:
	                    buffer.writeInt32(value);
	                    break;

	                // 64bit varint as-is
	                case ProtoBuf.TYPES["int64"]:
	                case ProtoBuf.TYPES["uint64"]:
	                    buffer.writeVarint64(value); // throws
	                    break;

	                // 64bit varint zig-zag
	                case ProtoBuf.TYPES["sint64"]:
	                    buffer.writeVarint64ZigZag(value); // throws
	                    break;

	                // Fixed unsigned 64bit
	                case ProtoBuf.TYPES["fixed64"]:
	                    buffer.writeUint64(value); // throws
	                    break;

	                // Fixed signed 64bit
	                case ProtoBuf.TYPES["sfixed64"]:
	                    buffer.writeInt64(value); // throws
	                    break;

	                // Bool
	                case ProtoBuf.TYPES["bool"]:
	                    if (typeof value === 'string')
	                        buffer.writeVarint32(value.toLowerCase() === 'false' ? 0 : !!value);
	                    else
	                        buffer.writeVarint32(value ? 1 : 0);
	                    break;

	                // Constant enum value
	                case ProtoBuf.TYPES["enum"]:
	                    buffer.writeVarint32(value);
	                    break;

	                // 32bit float
	                case ProtoBuf.TYPES["float"]:
	                    buffer.writeFloat32(value);
	                    break;

	                // 64bit float
	                case ProtoBuf.TYPES["double"]:
	                    buffer.writeFloat64(value);
	                    break;

	                // Length-delimited string
	                case ProtoBuf.TYPES["string"]:
	                    buffer.writeVString(value);
	                    break;

	                // Length-delimited bytes
	                case ProtoBuf.TYPES["bytes"]:
	                    if (value.remaining() < 0)
	                        throw Error("Illegal value for "+this.toString(true)+": "+value.remaining()+" bytes remaining");
	                    var prevOffset = value.offset;
	                    buffer.writeVarint32(value.remaining());
	                    buffer.append(value);
	                    value.offset = prevOffset;
	                    break;

	                // Embedded message
	                case ProtoBuf.TYPES["message"]:
	                    var bb = new ByteBuffer().LE();
	                    this.resolvedType.encode(value, bb);
	                    buffer.writeVarint32(bb.offset);
	                    buffer.append(bb.flip());
	                    break;

	                // Legacy group
	                case ProtoBuf.TYPES["group"]:
	                    this.resolvedType.encode(value, buffer);
	                    buffer.writeVarint32((id << 3) | ProtoBuf.WIRE_TYPES.ENDGROUP);
	                    break;

	                default:
	                    // We should never end here
	                    throw Error("[INTERNAL] Illegal value to encode in "+this.toString(true)+": "+value+" (unknown type)");
	            }
	            return buffer;
	        };

	        /**
	         * Decode one element value from the specified buffer.
	         * @param {ByteBuffer} buffer ByteBuffer to decode from
	         * @param {number} wireType The field wire type
	         * @param {number} id The field number
	         * @return {*} Decoded value
	         * @throws {Error} If the field cannot be decoded
	         * @expose
	         */
	        ElementPrototype.decode = function(buffer, wireType, id) {
	            if (wireType != this.type.wireType)
	                throw Error("Unexpected wire type for element");

	            var value, nBytes;
	            switch (this.type) {
	                // 32bit signed varint
	                case ProtoBuf.TYPES["int32"]:
	                    return buffer.readVarint32() | 0;

	                // 32bit unsigned varint
	                case ProtoBuf.TYPES["uint32"]:
	                    return buffer.readVarint32() >>> 0;

	                // 32bit signed varint zig-zag
	                case ProtoBuf.TYPES["sint32"]:
	                    return buffer.readVarint32ZigZag() | 0;

	                // Fixed 32bit unsigned
	                case ProtoBuf.TYPES["fixed32"]:
	                    return buffer.readUint32() >>> 0;

	                case ProtoBuf.TYPES["sfixed32"]:
	                    return buffer.readInt32() | 0;

	                // 64bit signed varint
	                case ProtoBuf.TYPES["int64"]:
	                    return buffer.readVarint64();

	                // 64bit unsigned varint
	                case ProtoBuf.TYPES["uint64"]:
	                    return buffer.readVarint64().toUnsigned();

	                // 64bit signed varint zig-zag
	                case ProtoBuf.TYPES["sint64"]:
	                    return buffer.readVarint64ZigZag();

	                // Fixed 64bit unsigned
	                case ProtoBuf.TYPES["fixed64"]:
	                    return buffer.readUint64();

	                // Fixed 64bit signed
	                case ProtoBuf.TYPES["sfixed64"]:
	                    return buffer.readInt64();

	                // Bool varint
	                case ProtoBuf.TYPES["bool"]:
	                    return !!buffer.readVarint32();

	                // Constant enum value (varint)
	                case ProtoBuf.TYPES["enum"]:
	                    // The following Builder.Message#set will already throw
	                    return buffer.readVarint32();

	                // 32bit float
	                case ProtoBuf.TYPES["float"]:
	                    return buffer.readFloat();

	                // 64bit float
	                case ProtoBuf.TYPES["double"]:
	                    return buffer.readDouble();

	                // Length-delimited string
	                case ProtoBuf.TYPES["string"]:
	                    return buffer.readVString();

	                // Length-delimited bytes
	                case ProtoBuf.TYPES["bytes"]: {
	                    nBytes = buffer.readVarint32();
	                    if (buffer.remaining() < nBytes)
	                        throw Error("Illegal number of bytes for "+this.toString(true)+": "+nBytes+" required but got only "+buffer.remaining());
	                    value = buffer.clone(); // Offset already set
	                    value.limit = value.offset+nBytes;
	                    buffer.offset += nBytes;
	                    return value;
	                }

	                // Length-delimited embedded message
	                case ProtoBuf.TYPES["message"]: {
	                    nBytes = buffer.readVarint32();
	                    return this.resolvedType.decode(buffer, nBytes);
	                }

	                // Legacy group
	                case ProtoBuf.TYPES["group"]:
	                    return this.resolvedType.decode(buffer, -1, id);
	            }

	            // We should never end here
	            throw Error("[INTERNAL] Illegal decode type");
	        };

	        /**
	         * Converts a value from a string to the canonical element type.
	         *
	         * Legal only when isMapKey is true.
	         *
	         * @param {string} str The string value
	         * @returns {*} The value
	         */
	        ElementPrototype.valueFromString = function(str) {
	            if (!this.isMapKey) {
	                throw Error("valueFromString() called on non-map-key element");
	            }

	            switch (this.type) {
	                case ProtoBuf.TYPES["int32"]:
	                case ProtoBuf.TYPES["sint32"]:
	                case ProtoBuf.TYPES["sfixed32"]:
	                case ProtoBuf.TYPES["uint32"]:
	                case ProtoBuf.TYPES["fixed32"]:
	                    return this.verifyValue(parseInt(str));

	                case ProtoBuf.TYPES["int64"]:
	                case ProtoBuf.TYPES["sint64"]:
	                case ProtoBuf.TYPES["sfixed64"]:
	                case ProtoBuf.TYPES["uint64"]:
	                case ProtoBuf.TYPES["fixed64"]:
	                      // Long-based fields support conversions from string already.
	                      return this.verifyValue(str);

	                case ProtoBuf.TYPES["bool"]:
	                      return str === "true";

	                case ProtoBuf.TYPES["string"]:
	                      return this.verifyValue(str);

	                case ProtoBuf.TYPES["bytes"]:
	                      return ByteBuffer.fromBinary(str);
	            }
	        };

	        /**
	         * Converts a value from the canonical element type to a string.
	         *
	         * It should be the case that `valueFromString(valueToString(val))` returns
	         * a value equivalent to `verifyValue(val)` for every legal value of `val`
	         * according to this element type.
	         *
	         * This may be used when the element must be stored or used as a string,
	         * e.g., as a map key on an Object.
	         *
	         * Legal only when isMapKey is true.
	         *
	         * @param {*} val The value
	         * @returns {string} The string form of the value.
	         */
	        ElementPrototype.valueToString = function(value) {
	            if (!this.isMapKey) {
	                throw Error("valueToString() called on non-map-key element");
	            }

	            if (this.type === ProtoBuf.TYPES["bytes"]) {
	                return value.toString("binary");
	            } else {
	                return value.toString();
	            }
	        };

	        /**
	         * @alias ProtoBuf.Reflect.Element
	         * @expose
	         */
	        Reflect.Element = Element;

	        /**
	         * Constructs a new Message.
	         * @exports ProtoBuf.Reflect.Message
	         * @param {!ProtoBuf.Builder} builder Builder reference
	         * @param {!ProtoBuf.Reflect.Namespace} parent Parent message or namespace
	         * @param {string} name Message name
	         * @param {Object.<string,*>=} options Message options
	         * @param {boolean=} isGroup `true` if this is a legacy group
	         * @param {string?} syntax The syntax level of this definition (e.g., proto3)
	         * @constructor
	         * @extends ProtoBuf.Reflect.Namespace
	         */
	        var Message = function(builder, parent, name, options, isGroup, syntax) {
	            Namespace.call(this, builder, parent, name, options, syntax);

	            /**
	             * @override
	             */
	            this.className = "Message";

	            /**
	             * Extensions range.
	             * @type {!Array.<number>|undefined}
	             * @expose
	             */
	            this.extensions = undefined;

	            /**
	             * Runtime message class.
	             * @type {?function(new:ProtoBuf.Builder.Message)}
	             * @expose
	             */
	            this.clazz = null;

	            /**
	             * Whether this is a legacy group or not.
	             * @type {boolean}
	             * @expose
	             */
	            this.isGroup = !!isGroup;

	            // The following cached collections are used to efficiently iterate over or look up fields when decoding.

	            /**
	             * Cached fields.
	             * @type {?Array.<!ProtoBuf.Reflect.Message.Field>}
	             * @private
	             */
	            this._fields = null;

	            /**
	             * Cached fields by id.
	             * @type {?Object.<number,!ProtoBuf.Reflect.Message.Field>}
	             * @private
	             */
	            this._fieldsById = null;

	            /**
	             * Cached fields by name.
	             * @type {?Object.<string,!ProtoBuf.Reflect.Message.Field>}
	             * @private
	             */
	            this._fieldsByName = null;
	        };

	        /**
	         * @alias ProtoBuf.Reflect.Message.prototype
	         * @inner
	         */
	        var MessagePrototype = Message.prototype = Object.create(Namespace.prototype);

	        /**
	         * Builds the message and returns the runtime counterpart, which is a fully functional class.
	         * @see ProtoBuf.Builder.Message
	         * @param {boolean=} rebuild Whether to rebuild or not, defaults to false
	         * @return {ProtoBuf.Reflect.Message} Message class
	         * @throws {Error} If the message cannot be built
	         * @expose
	         */
	        MessagePrototype.build = function(rebuild) {
	            if (this.clazz && !rebuild)
	                return this.clazz;

	            // Create the runtime Message class in its own scope
	            var clazz = (function(ProtoBuf, T) {

	                var fields = T.getChildren(ProtoBuf.Reflect.Message.Field),
	                    oneofs = T.getChildren(ProtoBuf.Reflect.Message.OneOf);

	                /**
	                 * Constructs a new runtime Message.
	                 * @name ProtoBuf.Builder.Message
	                 * @class Barebone of all runtime messages.
	                 * @param {!Object.<string,*>|string} values Preset values
	                 * @param {...string} var_args
	                 * @constructor
	                 * @throws {Error} If the message cannot be created
	                 */
	                var Message = function(values, var_args) {
	                    ProtoBuf.Builder.Message.call(this);

	                    // Create virtual oneof properties
	                    for (var i=0, k=oneofs.length; i<k; ++i)
	                        this[oneofs[i].name] = null;
	                    // Create fields and set default values
	                    for (i=0, k=fields.length; i<k; ++i) {
	                        var field = fields[i];
	                        this[field.name] =
	                            field.repeated ? [] :
	                            (field.map ? new ProtoBuf.Map(field) : null);
	                        if ((field.required || T.syntax === 'proto3') &&
	                            field.defaultValue !== null)
	                            this[field.name] = field.defaultValue;
	                    }

	                    if (arguments.length > 0) {
	                        var value;
	                        // Set field values from a values object
	                        if (arguments.length === 1 && values !== null && typeof values === 'object' &&
	                            /* not _another_ Message */ (typeof values.encode !== 'function' || values instanceof Message) &&
	                            /* not a repeated field */ !Array.isArray(values) &&
	                            /* not a Map */ !(values instanceof ProtoBuf.Map) &&
	                            /* not a ByteBuffer */ !ByteBuffer.isByteBuffer(values) &&
	                            /* not an ArrayBuffer */ !(values instanceof ArrayBuffer) &&
	                            /* not a Long */ !(ProtoBuf.Long && values instanceof ProtoBuf.Long)) {
	                            this.$set(values);
	                        } else // Set field values from arguments, in declaration order
	                            for (i=0, k=arguments.length; i<k; ++i)
	                                if (typeof (value = arguments[i]) !== 'undefined')
	                                    this.$set(fields[i].name, value); // May throw
	                    }
	                };

	                /**
	                 * @alias ProtoBuf.Builder.Message.prototype
	                 * @inner
	                 */
	                var MessagePrototype = Message.prototype = Object.create(ProtoBuf.Builder.Message.prototype);

	                /**
	                 * Adds a value to a repeated field.
	                 * @name ProtoBuf.Builder.Message#add
	                 * @function
	                 * @param {string} key Field name
	                 * @param {*} value Value to add
	                 * @param {boolean=} noAssert Whether to assert the value or not (asserts by default)
	                 * @returns {!ProtoBuf.Builder.Message} this
	                 * @throws {Error} If the value cannot be added
	                 * @expose
	                 */
	                MessagePrototype.add = function(key, value, noAssert) {
	                    var field = T._fieldsByName[key];
	                    if (!noAssert) {
	                        if (!field)
	                            throw Error(this+"#"+key+" is undefined");
	                        if (!(field instanceof ProtoBuf.Reflect.Message.Field))
	                            throw Error(this+"#"+key+" is not a field: "+field.toString(true)); // May throw if it's an enum or embedded message
	                        if (!field.repeated)
	                            throw Error(this+"#"+key+" is not a repeated field");
	                        value = field.verifyValue(value, true);
	                    }
	                    if (this[key] === null)
	                        this[key] = [];
	                    this[key].push(value);
	                    return this;
	                };

	                /**
	                 * Adds a value to a repeated field. This is an alias for {@link ProtoBuf.Builder.Message#add}.
	                 * @name ProtoBuf.Builder.Message#$add
	                 * @function
	                 * @param {string} key Field name
	                 * @param {*} value Value to add
	                 * @param {boolean=} noAssert Whether to assert the value or not (asserts by default)
	                 * @returns {!ProtoBuf.Builder.Message} this
	                 * @throws {Error} If the value cannot be added
	                 * @expose
	                 */
	                MessagePrototype.$add = MessagePrototype.add;

	                /**
	                 * Sets a field's value.
	                 * @name ProtoBuf.Builder.Message#set
	                 * @function
	                 * @param {string|!Object.<string,*>} keyOrObj String key or plain object holding multiple values
	                 * @param {(*|boolean)=} value Value to set if key is a string, otherwise omitted
	                 * @param {boolean=} noAssert Whether to not assert for an actual field / proper value type, defaults to `false`
	                 * @returns {!ProtoBuf.Builder.Message} this
	                 * @throws {Error} If the value cannot be set
	                 * @expose
	                 */
	                MessagePrototype.set = function(keyOrObj, value, noAssert) {
	                    if (keyOrObj && typeof keyOrObj === 'object') {
	                        noAssert = value;
	                        for (var ikey in keyOrObj)
	                            if (keyOrObj.hasOwnProperty(ikey) && typeof (value = keyOrObj[ikey]) !== 'undefined')
	                                this.$set(ikey, value, noAssert);
	                        return this;
	                    }
	                    var field = T._fieldsByName[keyOrObj];
	                    if (!noAssert) {
	                        if (!field)
	                            throw Error(this+"#"+keyOrObj+" is not a field: undefined");
	                        if (!(field instanceof ProtoBuf.Reflect.Message.Field))
	                            throw Error(this+"#"+keyOrObj+" is not a field: "+field.toString(true));
	                        this[field.name] = (value = field.verifyValue(value)); // May throw
	                    } else
	                        this[keyOrObj] = value;
	                    if (field && field.oneof) { // Field is part of an OneOf (not a virtual OneOf field)
	                        var currentField = this[field.oneof.name]; // Virtual field references currently set field
	                        if (value !== null) {
	                            if (currentField !== null && currentField !== field.name)
	                                this[currentField] = null; // Clear currently set field
	                            this[field.oneof.name] = field.name; // Point virtual field at this field
	                        } else if (/* value === null && */currentField === keyOrObj)
	                            this[field.oneof.name] = null; // Clear virtual field (current field explicitly cleared)
	                    }
	                    return this;
	                };

	                /**
	                 * Sets a field's value. This is an alias for [@link ProtoBuf.Builder.Message#set}.
	                 * @name ProtoBuf.Builder.Message#$set
	                 * @function
	                 * @param {string|!Object.<string,*>} keyOrObj String key or plain object holding multiple values
	                 * @param {(*|boolean)=} value Value to set if key is a string, otherwise omitted
	                 * @param {boolean=} noAssert Whether to not assert the value, defaults to `false`
	                 * @throws {Error} If the value cannot be set
	                 * @expose
	                 */
	                MessagePrototype.$set = MessagePrototype.set;

	                /**
	                 * Gets a field's value.
	                 * @name ProtoBuf.Builder.Message#get
	                 * @function
	                 * @param {string} key Key
	                 * @param {boolean=} noAssert Whether to not assert for an actual field, defaults to `false`
	                 * @return {*} Value
	                 * @throws {Error} If there is no such field
	                 * @expose
	                 */
	                MessagePrototype.get = function(key, noAssert) {
	                    if (noAssert)
	                        return this[key];
	                    var field = T._fieldsByName[key];
	                    if (!field || !(field instanceof ProtoBuf.Reflect.Message.Field))
	                        throw Error(this+"#"+key+" is not a field: undefined");
	                    if (!(field instanceof ProtoBuf.Reflect.Message.Field))
	                        throw Error(this+"#"+key+" is not a field: "+field.toString(true));
	                    return this[field.name];
	                };

	                /**
	                 * Gets a field's value. This is an alias for {@link ProtoBuf.Builder.Message#$get}.
	                 * @name ProtoBuf.Builder.Message#$get
	                 * @function
	                 * @param {string} key Key
	                 * @return {*} Value
	                 * @throws {Error} If there is no such field
	                 * @expose
	                 */
	                MessagePrototype.$get = MessagePrototype.get;

	                // Getters and setters

	                for (var i=0; i<fields.length; i++) {
	                    var field = fields[i];
	                    // no setters for extension fields as these are named by their fqn
	                    if (field instanceof ProtoBuf.Reflect.Message.ExtensionField)
	                        continue;

	                    if (T.builder.options['populateAccessors'])
	                        (function(field) {
	                            // set/get[SomeValue]
	                            var Name = field.originalName.replace(/(_[a-zA-Z])/g, function(match) {
	                                return match.toUpperCase().replace('_','');
	                            });
	                            Name = Name.substring(0,1).toUpperCase() + Name.substring(1);

	                            // set/get_[some_value] FIXME: Do we really need these?
	                            var name = field.originalName.replace(/([A-Z])/g, function(match) {
	                                return "_"+match;
	                            });

	                            /**
	                             * The current field's unbound setter function.
	                             * @function
	                             * @param {*} value
	                             * @param {boolean=} noAssert
	                             * @returns {!ProtoBuf.Builder.Message}
	                             * @inner
	                             */
	                            var setter = function(value, noAssert) {
	                                this[field.name] = noAssert ? value : field.verifyValue(value);
	                                return this;
	                            };

	                            /**
	                             * The current field's unbound getter function.
	                             * @function
	                             * @returns {*}
	                             * @inner
	                             */
	                            var getter = function() {
	                                return this[field.name];
	                            };

	                            if (T.getChild("set"+Name) === null)
	                                /**
	                                 * Sets a value. This method is present for each field, but only if there is no name conflict with
	                                 *  another field.
	                                 * @name ProtoBuf.Builder.Message#set[SomeField]
	                                 * @function
	                                 * @param {*} value Value to set
	                                 * @param {boolean=} noAssert Whether to not assert the value, defaults to `false`
	                                 * @returns {!ProtoBuf.Builder.Message} this
	                                 * @abstract
	                                 * @throws {Error} If the value cannot be set
	                                 */
	                                MessagePrototype["set"+Name] = setter;

	                            if (T.getChild("set_"+name) === null)
	                                /**
	                                 * Sets a value. This method is present for each field, but only if there is no name conflict with
	                                 *  another field.
	                                 * @name ProtoBuf.Builder.Message#set_[some_field]
	                                 * @function
	                                 * @param {*} value Value to set
	                                 * @param {boolean=} noAssert Whether to not assert the value, defaults to `false`
	                                 * @returns {!ProtoBuf.Builder.Message} this
	                                 * @abstract
	                                 * @throws {Error} If the value cannot be set
	                                 */
	                                MessagePrototype["set_"+name] = setter;

	                            if (T.getChild("get"+Name) === null)
	                                /**
	                                 * Gets a value. This method is present for each field, but only if there is no name conflict with
	                                 *  another field.
	                                 * @name ProtoBuf.Builder.Message#get[SomeField]
	                                 * @function
	                                 * @abstract
	                                 * @return {*} The value
	                                 */
	                                MessagePrototype["get"+Name] = getter;

	                            if (T.getChild("get_"+name) === null)
	                                /**
	                                 * Gets a value. This method is present for each field, but only if there is no name conflict with
	                                 *  another field.
	                                 * @name ProtoBuf.Builder.Message#get_[some_field]
	                                 * @function
	                                 * @return {*} The value
	                                 * @abstract
	                                 */
	                                MessagePrototype["get_"+name] = getter;

	                        })(field);
	                }

	                // En-/decoding

	                /**
	                 * Encodes the message.
	                 * @name ProtoBuf.Builder.Message#$encode
	                 * @function
	                 * @param {(!ByteBuffer|boolean)=} buffer ByteBuffer to encode to. Will create a new one and flip it if omitted.
	                 * @param {boolean=} noVerify Whether to not verify field values, defaults to `false`
	                 * @return {!ByteBuffer} Encoded message as a ByteBuffer
	                 * @throws {Error} If the message cannot be encoded or if required fields are missing. The later still
	                 *  returns the encoded ByteBuffer in the `encoded` property on the error.
	                 * @expose
	                 * @see ProtoBuf.Builder.Message#encode64
	                 * @see ProtoBuf.Builder.Message#encodeHex
	                 * @see ProtoBuf.Builder.Message#encodeAB
	                 */
	                MessagePrototype.encode = function(buffer, noVerify) {
	                    if (typeof buffer === 'boolean')
	                        noVerify = buffer,
	                        buffer = undefined;
	                    var isNew = false;
	                    if (!buffer)
	                        buffer = new ByteBuffer(),
	                        isNew = true;
	                    var le = buffer.littleEndian;
	                    try {
	                        T.encode(this, buffer.LE(), noVerify);
	                        return (isNew ? buffer.flip() : buffer).LE(le);
	                    } catch (e) {
	                        buffer.LE(le);
	                        throw(e);
	                    }
	                };

	                /**
	                 * Encodes a message using the specified data payload.
	                 * @param {!Object.<string,*>} data Data payload
	                 * @param {(!ByteBuffer|boolean)=} buffer ByteBuffer to encode to. Will create a new one and flip it if omitted.
	                 * @param {boolean=} noVerify Whether to not verify field values, defaults to `false`
	                 * @return {!ByteBuffer} Encoded message as a ByteBuffer
	                 * @expose
	                 */
	                Message.encode = function(data, buffer, noVerify) {
	                    return new Message(data).encode(buffer, noVerify);
	                };

	                /**
	                 * Calculates the byte length of the message.
	                 * @name ProtoBuf.Builder.Message#calculate
	                 * @function
	                 * @returns {number} Byte length
	                 * @throws {Error} If the message cannot be calculated or if required fields are missing.
	                 * @expose
	                 */
	                MessagePrototype.calculate = function() {
	                    return T.calculate(this);
	                };

	                /**
	                 * Encodes the varint32 length-delimited message.
	                 * @name ProtoBuf.Builder.Message#encodeDelimited
	                 * @function
	                 * @param {(!ByteBuffer|boolean)=} buffer ByteBuffer to encode to. Will create a new one and flip it if omitted.
	                 * @param {boolean=} noVerify Whether to not verify field values, defaults to `false`
	                 * @return {!ByteBuffer} Encoded message as a ByteBuffer
	                 * @throws {Error} If the message cannot be encoded or if required fields are missing. The later still
	                 *  returns the encoded ByteBuffer in the `encoded` property on the error.
	                 * @expose
	                 */
	                MessagePrototype.encodeDelimited = function(buffer, noVerify) {
	                    var isNew = false;
	                    if (!buffer)
	                        buffer = new ByteBuffer(),
	                        isNew = true;
	                    var enc = new ByteBuffer().LE();
	                    T.encode(this, enc, noVerify).flip();
	                    buffer.writeVarint32(enc.remaining());
	                    buffer.append(enc);
	                    return isNew ? buffer.flip() : buffer;
	                };

	                /**
	                 * Directly encodes the message to an ArrayBuffer.
	                 * @name ProtoBuf.Builder.Message#encodeAB
	                 * @function
	                 * @return {ArrayBuffer} Encoded message as ArrayBuffer
	                 * @throws {Error} If the message cannot be encoded or if required fields are missing. The later still
	                 *  returns the encoded ArrayBuffer in the `encoded` property on the error.
	                 * @expose
	                 */
	                MessagePrototype.encodeAB = function() {
	                    try {
	                        return this.encode().toArrayBuffer();
	                    } catch (e) {
	                        if (e["encoded"]) e["encoded"] = e["encoded"].toArrayBuffer();
	                        throw(e);
	                    }
	                };

	                /**
	                 * Returns the message as an ArrayBuffer. This is an alias for {@link ProtoBuf.Builder.Message#encodeAB}.
	                 * @name ProtoBuf.Builder.Message#toArrayBuffer
	                 * @function
	                 * @return {ArrayBuffer} Encoded message as ArrayBuffer
	                 * @throws {Error} If the message cannot be encoded or if required fields are missing. The later still
	                 *  returns the encoded ArrayBuffer in the `encoded` property on the error.
	                 * @expose
	                 */
	                MessagePrototype.toArrayBuffer = MessagePrototype.encodeAB;

	                /**
	                 * Directly encodes the message to a node Buffer.
	                 * @name ProtoBuf.Builder.Message#encodeNB
	                 * @function
	                 * @return {!Buffer}
	                 * @throws {Error} If the message cannot be encoded, not running under node.js or if required fields are
	                 *  missing. The later still returns the encoded node Buffer in the `encoded` property on the error.
	                 * @expose
	                 */
	                MessagePrototype.encodeNB = function() {
	                    try {
	                        return this.encode().toBuffer();
	                    } catch (e) {
	                        if (e["encoded"]) e["encoded"] = e["encoded"].toBuffer();
	                        throw(e);
	                    }
	                };

	                /**
	                 * Returns the message as a node Buffer. This is an alias for {@link ProtoBuf.Builder.Message#encodeNB}.
	                 * @name ProtoBuf.Builder.Message#toBuffer
	                 * @function
	                 * @return {!Buffer}
	                 * @throws {Error} If the message cannot be encoded or if required fields are missing. The later still
	                 *  returns the encoded node Buffer in the `encoded` property on the error.
	                 * @expose
	                 */
	                MessagePrototype.toBuffer = MessagePrototype.encodeNB;

	                /**
	                 * Directly encodes the message to a base64 encoded string.
	                 * @name ProtoBuf.Builder.Message#encode64
	                 * @function
	                 * @return {string} Base64 encoded string
	                 * @throws {Error} If the underlying buffer cannot be encoded or if required fields are missing. The later
	                 *  still returns the encoded base64 string in the `encoded` property on the error.
	                 * @expose
	                 */
	                MessagePrototype.encode64 = function() {
	                    try {
	                        return this.encode().toBase64();
	                    } catch (e) {
	                        if (e["encoded"]) e["encoded"] = e["encoded"].toBase64();
	                        throw(e);
	                    }
	                };

	                /**
	                 * Returns the message as a base64 encoded string. This is an alias for {@link ProtoBuf.Builder.Message#encode64}.
	                 * @name ProtoBuf.Builder.Message#toBase64
	                 * @function
	                 * @return {string} Base64 encoded string
	                 * @throws {Error} If the message cannot be encoded or if required fields are missing. The later still
	                 *  returns the encoded base64 string in the `encoded` property on the error.
	                 * @expose
	                 */
	                MessagePrototype.toBase64 = MessagePrototype.encode64;

	                /**
	                 * Directly encodes the message to a hex encoded string.
	                 * @name ProtoBuf.Builder.Message#encodeHex
	                 * @function
	                 * @return {string} Hex encoded string
	                 * @throws {Error} If the underlying buffer cannot be encoded or if required fields are missing. The later
	                 *  still returns the encoded hex string in the `encoded` property on the error.
	                 * @expose
	                 */
	                MessagePrototype.encodeHex = function() {
	                    try {
	                        return this.encode().toHex();
	                    } catch (e) {
	                        if (e["encoded"]) e["encoded"] = e["encoded"].toHex();
	                        throw(e);
	                    }
	                };

	                /**
	                 * Returns the message as a hex encoded string. This is an alias for {@link ProtoBuf.Builder.Message#encodeHex}.
	                 * @name ProtoBuf.Builder.Message#toHex
	                 * @function
	                 * @return {string} Hex encoded string
	                 * @throws {Error} If the message cannot be encoded or if required fields are missing. The later still
	                 *  returns the encoded hex string in the `encoded` property on the error.
	                 * @expose
	                 */
	                MessagePrototype.toHex = MessagePrototype.encodeHex;

	                /**
	                 * Clones a message object or field value to a raw object.
	                 * @param {*} obj Object to clone
	                 * @param {boolean} binaryAsBase64 Whether to include binary data as base64 strings or as a buffer otherwise
	                 * @param {boolean} longsAsStrings Whether to encode longs as strings
	                 * @param {!ProtoBuf.Reflect.T=} resolvedType The resolved field type if a field
	                 * @returns {*} Cloned object
	                 * @inner
	                 */
	                function cloneRaw(obj, binaryAsBase64, longsAsStrings, resolvedType) {
	                    if (obj === null || typeof obj !== 'object') {
	                        // Convert enum values to their respective names
	                        if (resolvedType && resolvedType instanceof ProtoBuf.Reflect.Enum) {
	                            var name = ProtoBuf.Reflect.Enum.getName(resolvedType.object, obj);
	                            if (name !== null)
	                                return name;
	                        }
	                        // Pass-through string, number, boolean, null...
	                        return obj;
	                    }
	                    // Convert ByteBuffers to raw buffer or strings
	                    if (ByteBuffer.isByteBuffer(obj))
	                        return binaryAsBase64 ? obj.toBase64() : obj.toBuffer();
	                    // Convert Longs to proper objects or strings
	                    if (ProtoBuf.Long.isLong(obj))
	                        return longsAsStrings ? obj.toString() : ProtoBuf.Long.fromValue(obj);
	                    var clone;
	                    // Clone arrays
	                    if (Array.isArray(obj)) {
	                        clone = [];
	                        obj.forEach(function(v, k) {
	                            clone[k] = cloneRaw(v, binaryAsBase64, longsAsStrings, resolvedType);
	                        });
	                        return clone;
	                    }
	                    clone = {};
	                    // Convert maps to objects
	                    if (obj instanceof ProtoBuf.Map) {
	                        var it = obj.entries();
	                        for (var e = it.next(); !e.done; e = it.next())
	                            clone[obj.keyElem.valueToString(e.value[0])] = cloneRaw(e.value[1], binaryAsBase64, longsAsStrings, obj.valueElem.resolvedType);
	                        return clone;
	                    }
	                    // Everything else is a non-null object
	                    var type = obj.$type,
	                        field = undefined;
	                    for (var i in obj)
	                        if (obj.hasOwnProperty(i)) {
	                            if (type && (field = type.getChild(i)))
	                                clone[i] = cloneRaw(obj[i], binaryAsBase64, longsAsStrings, field.resolvedType);
	                            else
	                                clone[i] = cloneRaw(obj[i], binaryAsBase64, longsAsStrings);
	                        }
	                    return clone;
	                }

	                /**
	                 * Returns the message's raw payload.
	                 * @param {boolean=} binaryAsBase64 Whether to include binary data as base64 strings instead of Buffers, defaults to `false`
	                 * @param {boolean} longsAsStrings Whether to encode longs as strings
	                 * @returns {Object.<string,*>} Raw payload
	                 * @expose
	                 */
	                MessagePrototype.toRaw = function(binaryAsBase64, longsAsStrings) {
	                    return cloneRaw(this, !!binaryAsBase64, !!longsAsStrings, this.$type);
	                };

	                /**
	                 * Encodes a message to JSON.
	                 * @returns {string} JSON string
	                 * @expose
	                 */
	                MessagePrototype.encodeJSON = function() {
	                    return JSON.stringify(
	                        cloneRaw(this,
	                             /* binary-as-base64 */ true,
	                             /* longs-as-strings */ true,
	                             this.$type
	                        )
	                    );
	                };

	                /**
	                 * Decodes a message from the specified buffer or string.
	                 * @name ProtoBuf.Builder.Message.decode
	                 * @function
	                 * @param {!ByteBuffer|!ArrayBuffer|!Buffer|string} buffer Buffer to decode from
	                 * @param {(number|string)=} length Message length. Defaults to decode all the remainig data.
	                 * @param {string=} enc Encoding if buffer is a string: hex, utf8 (not recommended), defaults to base64
	                 * @return {!ProtoBuf.Builder.Message} Decoded message
	                 * @throws {Error} If the message cannot be decoded or if required fields are missing. The later still
	                 *  returns the decoded message with missing fields in the `decoded` property on the error.
	                 * @expose
	                 * @see ProtoBuf.Builder.Message.decode64
	                 * @see ProtoBuf.Builder.Message.decodeHex
	                 */
	                Message.decode = function(buffer, length, enc) {
	                    if (typeof length === 'string')
	                        enc = length,
	                        length = -1;
	                    if (typeof buffer === 'string')
	                        buffer = ByteBuffer.wrap(buffer, enc ? enc : "base64");
	                    buffer = ByteBuffer.isByteBuffer(buffer) ? buffer : ByteBuffer.wrap(buffer); // May throw
	                    var le = buffer.littleEndian;
	                    try {
	                        var msg = T.decode(buffer.LE());
	                        buffer.LE(le);
	                        return msg;
	                    } catch (e) {
	                        buffer.LE(le);
	                        throw(e);
	                    }
	                };

	                /**
	                 * Decodes a varint32 length-delimited message from the specified buffer or string.
	                 * @name ProtoBuf.Builder.Message.decodeDelimited
	                 * @function
	                 * @param {!ByteBuffer|!ArrayBuffer|!Buffer|string} buffer Buffer to decode from
	                 * @param {string=} enc Encoding if buffer is a string: hex, utf8 (not recommended), defaults to base64
	                 * @return {ProtoBuf.Builder.Message} Decoded message or `null` if not enough bytes are available yet
	                 * @throws {Error} If the message cannot be decoded or if required fields are missing. The later still
	                 *  returns the decoded message with missing fields in the `decoded` property on the error.
	                 * @expose
	                 */
	                Message.decodeDelimited = function(buffer, enc) {
	                    if (typeof buffer === 'string')
	                        buffer = ByteBuffer.wrap(buffer, enc ? enc : "base64");
	                    buffer = ByteBuffer.isByteBuffer(buffer) ? buffer : ByteBuffer.wrap(buffer); // May throw
	                    if (buffer.remaining() < 1)
	                        return null;
	                    var off = buffer.offset,
	                        len = buffer.readVarint32();
	                    if (buffer.remaining() < len) {
	                        buffer.offset = off;
	                        return null;
	                    }
	                    try {
	                        var msg = T.decode(buffer.slice(buffer.offset, buffer.offset + len).LE());
	                        buffer.offset += len;
	                        return msg;
	                    } catch (err) {
	                        buffer.offset += len;
	                        throw err;
	                    }
	                };

	                /**
	                 * Decodes the message from the specified base64 encoded string.
	                 * @name ProtoBuf.Builder.Message.decode64
	                 * @function
	                 * @param {string} str String to decode from
	                 * @return {!ProtoBuf.Builder.Message} Decoded message
	                 * @throws {Error} If the message cannot be decoded or if required fields are missing. The later still
	                 *  returns the decoded message with missing fields in the `decoded` property on the error.
	                 * @expose
	                 */
	                Message.decode64 = function(str) {
	                    return Message.decode(str, "base64");
	                };

	                /**
	                 * Decodes the message from the specified hex encoded string.
	                 * @name ProtoBuf.Builder.Message.decodeHex
	                 * @function
	                 * @param {string} str String to decode from
	                 * @return {!ProtoBuf.Builder.Message} Decoded message
	                 * @throws {Error} If the message cannot be decoded or if required fields are missing. The later still
	                 *  returns the decoded message with missing fields in the `decoded` property on the error.
	                 * @expose
	                 */
	                Message.decodeHex = function(str) {
	                    return Message.decode(str, "hex");
	                };

	                /**
	                 * Decodes the message from a JSON string.
	                 * @name ProtoBuf.Builder.Message.decodeJSON
	                 * @function
	                 * @param {string} str String to decode from
	                 * @return {!ProtoBuf.Builder.Message} Decoded message
	                 * @throws {Error} If the message cannot be decoded or if required fields are
	                 * missing.
	                 * @expose
	                 */
	                Message.decodeJSON = function(str) {
	                    return new Message(JSON.parse(str));
	                };

	                // Utility

	                /**
	                 * Returns a string representation of this Message.
	                 * @name ProtoBuf.Builder.Message#toString
	                 * @function
	                 * @return {string} String representation as of ".Fully.Qualified.MessageName"
	                 * @expose
	                 */
	                MessagePrototype.toString = function() {
	                    return T.toString();
	                };

	                // Properties

	                /**
	                 * Message options.
	                 * @name ProtoBuf.Builder.Message.$options
	                 * @type {Object.<string,*>}
	                 * @expose
	                 */
	                var $optionsS; // cc needs this

	                /**
	                 * Message options.
	                 * @name ProtoBuf.Builder.Message#$options
	                 * @type {Object.<string,*>}
	                 * @expose
	                 */
	                var $options;

	                /**
	                 * Reflection type.
	                 * @name ProtoBuf.Builder.Message.$type
	                 * @type {!ProtoBuf.Reflect.Message}
	                 * @expose
	                 */
	                var $typeS;

	                /**
	                 * Reflection type.
	                 * @name ProtoBuf.Builder.Message#$type
	                 * @type {!ProtoBuf.Reflect.Message}
	                 * @expose
	                 */
	                var $type;

	                if (Object.defineProperty)
	                    Object.defineProperty(Message, '$options', { "value": T.buildOpt() }),
	                    Object.defineProperty(MessagePrototype, "$options", { "value": Message["$options"] }),
	                    Object.defineProperty(Message, "$type", { "value": T }),
	                    Object.defineProperty(MessagePrototype, "$type", { "value": T });

	                return Message;

	            })(ProtoBuf, this);

	            // Static enums and prototyped sub-messages / cached collections
	            this._fields = [];
	            this._fieldsById = {};
	            this._fieldsByName = {};
	            for (var i=0, k=this.children.length, child; i<k; i++) {
	                child = this.children[i];
	                if (child instanceof Enum || child instanceof Message || child instanceof Service) {
	                    if (clazz.hasOwnProperty(child.name))
	                        throw Error("Illegal reflect child of "+this.toString(true)+": "+child.toString(true)+" cannot override static property '"+child.name+"'");
	                    clazz[child.name] = child.build();
	                } else if (child instanceof Message.Field)
	                    child.build(),
	                    this._fields.push(child),
	                    this._fieldsById[child.id] = child,
	                    this._fieldsByName[child.name] = child;
	                else if (!(child instanceof Message.OneOf) && !(child instanceof Extension)) // Not built
	                    throw Error("Illegal reflect child of "+this.toString(true)+": "+this.children[i].toString(true));
	            }

	            return this.clazz = clazz;
	        };

	        /**
	         * Encodes a runtime message's contents to the specified buffer.
	         * @param {!ProtoBuf.Builder.Message} message Runtime message to encode
	         * @param {ByteBuffer} buffer ByteBuffer to write to
	         * @param {boolean=} noVerify Whether to not verify field values, defaults to `false`
	         * @return {ByteBuffer} The ByteBuffer for chaining
	         * @throws {Error} If required fields are missing or the message cannot be encoded for another reason
	         * @expose
	         */
	        MessagePrototype.encode = function(message, buffer, noVerify) {
	            var fieldMissing = null,
	                field;
	            for (var i=0, k=this._fields.length, val; i<k; ++i) {
	                field = this._fields[i];
	                val = message[field.name];
	                if (field.required && val === null) {
	                    if (fieldMissing === null)
	                        fieldMissing = field;
	                } else
	                    field.encode(noVerify ? val : field.verifyValue(val), buffer, message);
	            }
	            if (fieldMissing !== null) {
	                var err = Error("Missing at least one required field for "+this.toString(true)+": "+fieldMissing);
	                err["encoded"] = buffer; // Still expose what we got
	                throw(err);
	            }
	            return buffer;
	        };

	        /**
	         * Calculates a runtime message's byte length.
	         * @param {!ProtoBuf.Builder.Message} message Runtime message to encode
	         * @returns {number} Byte length
	         * @throws {Error} If required fields are missing or the message cannot be calculated for another reason
	         * @expose
	         */
	        MessagePrototype.calculate = function(message) {
	            for (var n=0, i=0, k=this._fields.length, field, val; i<k; ++i) {
	                field = this._fields[i];
	                val = message[field.name];
	                if (field.required && val === null)
	                   throw Error("Missing at least one required field for "+this.toString(true)+": "+field);
	                else
	                    n += field.calculate(val, message);
	            }
	            return n;
	        };

	        /**
	         * Skips all data until the end of the specified group has been reached.
	         * @param {number} expectedId Expected GROUPEND id
	         * @param {!ByteBuffer} buf ByteBuffer
	         * @returns {boolean} `true` if a value as been skipped, `false` if the end has been reached
	         * @throws {Error} If it wasn't possible to find the end of the group (buffer overrun or end tag mismatch)
	         * @inner
	         */
	        function skipTillGroupEnd(expectedId, buf) {
	            var tag = buf.readVarint32(), // Throws on OOB
	                wireType = tag & 0x07,
	                id = tag >>> 3;
	            switch (wireType) {
	                case ProtoBuf.WIRE_TYPES.VARINT:
	                    do tag = buf.readUint8();
	                    while ((tag & 0x80) === 0x80);
	                    break;
	                case ProtoBuf.WIRE_TYPES.BITS64:
	                    buf.offset += 8;
	                    break;
	                case ProtoBuf.WIRE_TYPES.LDELIM:
	                    tag = buf.readVarint32(); // reads the varint
	                    buf.offset += tag;        // skips n bytes
	                    break;
	                case ProtoBuf.WIRE_TYPES.STARTGROUP:
	                    skipTillGroupEnd(id, buf);
	                    break;
	                case ProtoBuf.WIRE_TYPES.ENDGROUP:
	                    if (id === expectedId)
	                        return false;
	                    else
	                        throw Error("Illegal GROUPEND after unknown group: "+id+" ("+expectedId+" expected)");
	                case ProtoBuf.WIRE_TYPES.BITS32:
	                    buf.offset += 4;
	                    break;
	                default:
	                    throw Error("Illegal wire type in unknown group "+expectedId+": "+wireType);
	            }
	            return true;
	        }

	        /**
	         * Decodes an encoded message and returns the decoded message.
	         * @param {ByteBuffer} buffer ByteBuffer to decode from
	         * @param {number=} length Message length. Defaults to decode all remaining data.
	         * @param {number=} expectedGroupEndId Expected GROUPEND id if this is a legacy group
	         * @return {ProtoBuf.Builder.Message} Decoded message
	         * @throws {Error} If the message cannot be decoded
	         * @expose
	         */
	        MessagePrototype.decode = function(buffer, length, expectedGroupEndId) {
	            length = typeof length === 'number' ? length : -1;
	            var start = buffer.offset,
	                msg = new (this.clazz)(),
	                tag, wireType, id, field;
	            while (buffer.offset < start+length || (length === -1 && buffer.remaining() > 0)) {
	                tag = buffer.readVarint32();
	                wireType = tag & 0x07;
	                id = tag >>> 3;
	                if (wireType === ProtoBuf.WIRE_TYPES.ENDGROUP) {
	                    if (id !== expectedGroupEndId)
	                        throw Error("Illegal group end indicator for "+this.toString(true)+": "+id+" ("+(expectedGroupEndId ? expectedGroupEndId+" expected" : "not a group")+")");
	                    break;
	                }
	                if (!(field = this._fieldsById[id])) {
	                    // "messages created by your new code can be parsed by your old code: old binaries simply ignore the new field when parsing."
	                    switch (wireType) {
	                        case ProtoBuf.WIRE_TYPES.VARINT:
	                            buffer.readVarint32();
	                            break;
	                        case ProtoBuf.WIRE_TYPES.BITS32:
	                            buffer.offset += 4;
	                            break;
	                        case ProtoBuf.WIRE_TYPES.BITS64:
	                            buffer.offset += 8;
	                            break;
	                        case ProtoBuf.WIRE_TYPES.LDELIM:
	                            var len = buffer.readVarint32();
	                            buffer.offset += len;
	                            break;
	                        case ProtoBuf.WIRE_TYPES.STARTGROUP:
	                            while (skipTillGroupEnd(id, buffer)) {}
	                            break;
	                        default:
	                            throw Error("Illegal wire type for unknown field "+id+" in "+this.toString(true)+"#decode: "+wireType);
	                    }
	                    continue;
	                }
	                if (field.repeated && !field.options["packed"]) {
	                    msg[field.name].push(field.decode(wireType, buffer));
	                } else if (field.map) {
	                    var keyval = field.decode(wireType, buffer);
	                    msg[field.name].set(keyval[0], keyval[1]);
	                } else {
	                    msg[field.name] = field.decode(wireType, buffer);
	                    if (field.oneof) { // Field is part of an OneOf (not a virtual OneOf field)
	                        var currentField = msg[field.oneof.name]; // Virtual field references currently set field
	                        if (currentField !== null && currentField !== field.name)
	                            msg[currentField] = null; // Clear currently set field
	                        msg[field.oneof.name] = field.name; // Point virtual field at this field
	                    }
	                }
	            }

	            // Check if all required fields are present and set default values for optional fields that are not
	            for (var i=0, k=this._fields.length; i<k; ++i) {
	                field = this._fields[i];
	                if (msg[field.name] === null) {
	                    if (this.syntax === "proto3") { // Proto3 sets default values by specification
	                        msg[field.name] = field.defaultValue;
	                    } else if (field.required) {
	                        var err = Error("Missing at least one required field for " + this.toString(true) + ": " + field.name);
	                        err["decoded"] = msg; // Still expose what we got
	                        throw(err);
	                    } else if (ProtoBuf.populateDefaults && field.defaultValue !== null)
	                        msg[field.name] = field.defaultValue;
	                }
	            }
	            return msg;
	        };

	        /**
	         * @alias ProtoBuf.Reflect.Message
	         * @expose
	         */
	        Reflect.Message = Message;

	        /**
	         * Constructs a new Message Field.
	         * @exports ProtoBuf.Reflect.Message.Field
	         * @param {!ProtoBuf.Builder} builder Builder reference
	         * @param {!ProtoBuf.Reflect.Message} message Message reference
	         * @param {string} rule Rule, one of requried, optional, repeated
	         * @param {string?} keytype Key data type, if any.
	         * @param {string} type Data type, e.g. int32
	         * @param {string} name Field name
	         * @param {number} id Unique field id
	         * @param {Object.<string,*>=} options Options
	         * @param {!ProtoBuf.Reflect.Message.OneOf=} oneof Enclosing OneOf
	         * @param {string?} syntax The syntax level of this definition (e.g., proto3)
	         * @constructor
	         * @extends ProtoBuf.Reflect.T
	         */
	        var Field = function(builder, message, rule, keytype, type, name, id, options, oneof, syntax) {
	            T.call(this, builder, message, name);

	            /**
	             * @override
	             */
	            this.className = "Message.Field";

	            /**
	             * Message field required flag.
	             * @type {boolean}
	             * @expose
	             */
	            this.required = rule === "required";

	            /**
	             * Message field repeated flag.
	             * @type {boolean}
	             * @expose
	             */
	            this.repeated = rule === "repeated";

	            /**
	             * Message field map flag.
	             * @type {boolean}
	             * @expose
	             */
	            this.map = rule === "map";

	            /**
	             * Message field key type. Type reference string if unresolved, protobuf
	             * type if resolved. Valid only if this.map === true, null otherwise.
	             * @type {string|{name: string, wireType: number}|null}
	             * @expose
	             */
	            this.keyType = keytype || null;

	            /**
	             * Message field type. Type reference string if unresolved, protobuf type if
	             * resolved. In a map field, this is the value type.
	             * @type {string|{name: string, wireType: number}}
	             * @expose
	             */
	            this.type = type;

	            /**
	             * Resolved type reference inside the global namespace.
	             * @type {ProtoBuf.Reflect.T|null}
	             * @expose
	             */
	            this.resolvedType = null;

	            /**
	             * Unique message field id.
	             * @type {number}
	             * @expose
	             */
	            this.id = id;

	            /**
	             * Message field options.
	             * @type {!Object.<string,*>}
	             * @dict
	             * @expose
	             */
	            this.options = options || {};

	            /**
	             * Default value.
	             * @type {*}
	             * @expose
	             */
	            this.defaultValue = null;

	            /**
	             * Enclosing OneOf.
	             * @type {?ProtoBuf.Reflect.Message.OneOf}
	             * @expose
	             */
	            this.oneof = oneof || null;

	            /**
	             * Syntax level of this definition (e.g., proto3).
	             * @type {string}
	             * @expose
	             */
	            this.syntax = syntax || 'proto2';

	            /**
	             * Original field name.
	             * @type {string}
	             * @expose
	             */
	            this.originalName = this.name; // Used to revert camelcase transformation on naming collisions

	            /**
	             * Element implementation. Created in build() after types are resolved.
	             * @type {ProtoBuf.Element}
	             * @expose
	             */
	            this.element = null;

	            /**
	             * Key element implementation, for map fields. Created in build() after
	             * types are resolved.
	             * @type {ProtoBuf.Element}
	             * @expose
	             */
	            this.keyElement = null;

	            // Convert field names to camel case notation if the override is set
	            if (this.builder.options['convertFieldsToCamelCase'] && !(this instanceof Message.ExtensionField))
	                this.name = ProtoBuf.Util.toCamelCase(this.name);
	        };

	        /**
	         * @alias ProtoBuf.Reflect.Message.Field.prototype
	         * @inner
	         */
	        var FieldPrototype = Field.prototype = Object.create(T.prototype);

	        /**
	         * Builds the field.
	         * @override
	         * @expose
	         */
	        FieldPrototype.build = function() {
	            this.element = new Element(this.type, this.resolvedType, false, this.syntax);
	            if (this.map)
	                this.keyElement = new Element(this.keyType, undefined, true, this.syntax);

	            // In proto3, fields do not have field presence, and every field is set to
	            // its type's default value ("", 0, 0.0, or false).
	            if (this.syntax === 'proto3' && !this.repeated && !this.map)
	                this.defaultValue = Element.defaultFieldValue(this.type);

	            // Otherwise, default values are present when explicitly specified
	            else if (typeof this.options['default'] !== 'undefined')
	                this.defaultValue = this.verifyValue(this.options['default']);
	        };

	        /**
	         * Checks if the given value can be set for this field.
	         * @param {*} value Value to check
	         * @param {boolean=} skipRepeated Whether to skip the repeated value check or not. Defaults to false.
	         * @return {*} Verified, maybe adjusted, value
	         * @throws {Error} If the value cannot be set for this field
	         * @expose
	         */
	        FieldPrototype.verifyValue = function(value, skipRepeated) {
	            skipRepeated = skipRepeated || false;
	            var self = this;
	            function fail(val, msg) {
	                throw Error("Illegal value for "+self.toString(true)+" of type "+self.type.name+": "+val+" ("+msg+")");
	            }
	            if (value === null) { // NULL values for optional fields
	                if (this.required)
	                    fail(typeof value, "required");
	                if (this.syntax === 'proto3' && this.type !== ProtoBuf.TYPES["message"])
	                    fail(typeof value, "proto3 field without field presence cannot be null");
	                return null;
	            }
	            var i;
	            if (this.repeated && !skipRepeated) { // Repeated values as arrays
	                if (!Array.isArray(value))
	                    value = [value];
	                var res = [];
	                for (i=0; i<value.length; i++)
	                    res.push(this.element.verifyValue(value[i]));
	                return res;
	            }
	            if (this.map && !skipRepeated) { // Map values as objects
	                if (!(value instanceof ProtoBuf.Map)) {
	                    // If not already a Map, attempt to convert.
	                    if (!(value instanceof Object)) {
	                        fail(typeof value,
	                             "expected ProtoBuf.Map or raw object for map field");
	                    }
	                    return new ProtoBuf.Map(this, value);
	                } else {
	                    return value;
	                }
	            }
	            // All non-repeated fields expect no array
	            if (!this.repeated && Array.isArray(value))
	                fail(typeof value, "no array expected");

	            return this.element.verifyValue(value);
	        };

	        /**
	         * Determines whether the field will have a presence on the wire given its
	         * value.
	         * @param {*} value Verified field value
	         * @param {!ProtoBuf.Builder.Message} message Runtime message
	         * @return {boolean} Whether the field will be present on the wire
	         */
	        FieldPrototype.hasWirePresence = function(value, message) {
	            if (this.syntax !== 'proto3')
	                return (value !== null);
	            if (this.oneof && message[this.oneof.name] === this.name)
	                return true;
	            switch (this.type) {
	                case ProtoBuf.TYPES["int32"]:
	                case ProtoBuf.TYPES["sint32"]:
	                case ProtoBuf.TYPES["sfixed32"]:
	                case ProtoBuf.TYPES["uint32"]:
	                case ProtoBuf.TYPES["fixed32"]:
	                    return value !== 0;

	                case ProtoBuf.TYPES["int64"]:
	                case ProtoBuf.TYPES["sint64"]:
	                case ProtoBuf.TYPES["sfixed64"]:
	                case ProtoBuf.TYPES["uint64"]:
	                case ProtoBuf.TYPES["fixed64"]:
	                    return value.low !== 0 || value.high !== 0;

	                case ProtoBuf.TYPES["bool"]:
	                    return value;

	                case ProtoBuf.TYPES["float"]:
	                case ProtoBuf.TYPES["double"]:
	                    return value !== 0.0;

	                case ProtoBuf.TYPES["string"]:
	                    return value.length > 0;

	                case ProtoBuf.TYPES["bytes"]:
	                    return value.remaining() > 0;

	                case ProtoBuf.TYPES["enum"]:
	                    return value !== 0;

	                case ProtoBuf.TYPES["message"]:
	                    return value !== null;
	                default:
	                    return true;
	            }
	        };

	        /**
	         * Encodes the specified field value to the specified buffer.
	         * @param {*} value Verified field value
	         * @param {ByteBuffer} buffer ByteBuffer to encode to
	         * @param {!ProtoBuf.Builder.Message} message Runtime message
	         * @return {ByteBuffer} The ByteBuffer for chaining
	         * @throws {Error} If the field cannot be encoded
	         * @expose
	         */
	        FieldPrototype.encode = function(value, buffer, message) {
	            if (this.type === null || typeof this.type !== 'object')
	                throw Error("[INTERNAL] Unresolved type in "+this.toString(true)+": "+this.type);
	            if (value === null || (this.repeated && value.length == 0))
	                return buffer; // Optional omitted
	            try {
	                if (this.repeated) {
	                    var i;
	                    // "Only repeated fields of primitive numeric types (types which use the varint, 32-bit, or 64-bit wire
	                    // types) can be declared 'packed'."
	                    if (this.options["packed"] && ProtoBuf.PACKABLE_WIRE_TYPES.indexOf(this.type.wireType) >= 0) {
	                        // "All of the elements of the field are packed into a single key-value pair with wire type 2
	                        // (length-delimited). Each element is encoded the same way it would be normally, except without a
	                        // tag preceding it."
	                        buffer.writeVarint32((this.id << 3) | ProtoBuf.WIRE_TYPES.LDELIM);
	                        buffer.ensureCapacity(buffer.offset += 1); // We do not know the length yet, so let's assume a varint of length 1
	                        var start = buffer.offset; // Remember where the contents begin
	                        for (i=0; i<value.length; i++)
	                            this.element.encodeValue(this.id, value[i], buffer);
	                        var len = buffer.offset-start,
	                            varintLen = ByteBuffer.calculateVarint32(len);
	                        if (varintLen > 1) { // We need to move the contents
	                            var contents = buffer.slice(start, buffer.offset);
	                            start += varintLen-1;
	                            buffer.offset = start;
	                            buffer.append(contents);
	                        }
	                        buffer.writeVarint32(len, start-varintLen);
	                    } else {
	                        // "If your message definition has repeated elements (without the [packed=true] option), the encoded
	                        // message has zero or more key-value pairs with the same tag number"
	                        for (i=0; i<value.length; i++)
	                            buffer.writeVarint32((this.id << 3) | this.type.wireType),
	                            this.element.encodeValue(this.id, value[i], buffer);
	                    }
	                } else if (this.map) {
	                    // Write out each map entry as a submessage.
	                    value.forEach(function(val, key, m) {
	                        // Compute the length of the submessage (key, val) pair.
	                        var length =
	                            ByteBuffer.calculateVarint32((1 << 3) | this.keyType.wireType) +
	                            this.keyElement.calculateLength(1, key) +
	                            ByteBuffer.calculateVarint32((2 << 3) | this.type.wireType) +
	                            this.element.calculateLength(2, val);

	                        // Submessage with wire type of length-delimited.
	                        buffer.writeVarint32((this.id << 3) | ProtoBuf.WIRE_TYPES.LDELIM);
	                        buffer.writeVarint32(length);

	                        // Write out the key and val.
	                        buffer.writeVarint32((1 << 3) | this.keyType.wireType);
	                        this.keyElement.encodeValue(1, key, buffer);
	                        buffer.writeVarint32((2 << 3) | this.type.wireType);
	                        this.element.encodeValue(2, val, buffer);
	                    }, this);
	                } else {
	                    if (this.hasWirePresence(value, message)) {
	                        buffer.writeVarint32((this.id << 3) | this.type.wireType);
	                        this.element.encodeValue(this.id, value, buffer);
	                    }
	                }
	            } catch (e) {
	                throw Error("Illegal value for "+this.toString(true)+": "+value+" ("+e+")");
	            }
	            return buffer;
	        };

	        /**
	         * Calculates the length of this field's value on the network level.
	         * @param {*} value Field value
	         * @param {!ProtoBuf.Builder.Message} message Runtime message
	         * @returns {number} Byte length
	         * @expose
	         */
	        FieldPrototype.calculate = function(value, message) {
	            value = this.verifyValue(value); // May throw
	            if (this.type === null || typeof this.type !== 'object')
	                throw Error("[INTERNAL] Unresolved type in "+this.toString(true)+": "+this.type);
	            if (value === null || (this.repeated && value.length == 0))
	                return 0; // Optional omitted
	            var n = 0;
	            try {
	                if (this.repeated) {
	                    var i, ni;
	                    if (this.options["packed"] && ProtoBuf.PACKABLE_WIRE_TYPES.indexOf(this.type.wireType) >= 0) {
	                        n += ByteBuffer.calculateVarint32((this.id << 3) | ProtoBuf.WIRE_TYPES.LDELIM);
	                        ni = 0;
	                        for (i=0; i<value.length; i++)
	                            ni += this.element.calculateLength(this.id, value[i]);
	                        n += ByteBuffer.calculateVarint32(ni);
	                        n += ni;
	                    } else {
	                        for (i=0; i<value.length; i++)
	                            n += ByteBuffer.calculateVarint32((this.id << 3) | this.type.wireType),
	                            n += this.element.calculateLength(this.id, value[i]);
	                    }
	                } else if (this.map) {
	                    // Each map entry becomes a submessage.
	                    value.forEach(function(val, key, m) {
	                        // Compute the length of the submessage (key, val) pair.
	                        var length =
	                            ByteBuffer.calculateVarint32((1 << 3) | this.keyType.wireType) +
	                            this.keyElement.calculateLength(1, key) +
	                            ByteBuffer.calculateVarint32((2 << 3) | this.type.wireType) +
	                            this.element.calculateLength(2, val);

	                        n += ByteBuffer.calculateVarint32((this.id << 3) | ProtoBuf.WIRE_TYPES.LDELIM);
	                        n += ByteBuffer.calculateVarint32(length);
	                        n += length;
	                    }, this);
	                } else {
	                    if (this.hasWirePresence(value, message)) {
	                        n += ByteBuffer.calculateVarint32((this.id << 3) | this.type.wireType);
	                        n += this.element.calculateLength(this.id, value);
	                    }
	                }
	            } catch (e) {
	                throw Error("Illegal value for "+this.toString(true)+": "+value+" ("+e+")");
	            }
	            return n;
	        };

	        /**
	         * Decode the field value from the specified buffer.
	         * @param {number} wireType Leading wire type
	         * @param {ByteBuffer} buffer ByteBuffer to decode from
	         * @param {boolean=} skipRepeated Whether to skip the repeated check or not. Defaults to false.
	         * @return {*} Decoded value: array for packed repeated fields, [key, value] for
	         *             map fields, or an individual value otherwise.
	         * @throws {Error} If the field cannot be decoded
	         * @expose
	         */
	        FieldPrototype.decode = function(wireType, buffer, skipRepeated) {
	            var value, nBytes;

	            // We expect wireType to match the underlying type's wireType unless we see
	            // a packed repeated field, or unless this is a map field.
	            var wireTypeOK =
	                (!this.map && wireType == this.type.wireType) ||
	                (!skipRepeated && this.repeated && this.options["packed"] &&
	                 wireType == ProtoBuf.WIRE_TYPES.LDELIM) ||
	                (this.map && wireType == ProtoBuf.WIRE_TYPES.LDELIM);
	            if (!wireTypeOK)
	                throw Error("Illegal wire type for field "+this.toString(true)+": "+wireType+" ("+this.type.wireType+" expected)");

	            // Handle packed repeated fields.
	            if (wireType == ProtoBuf.WIRE_TYPES.LDELIM && this.repeated && this.options["packed"] && ProtoBuf.PACKABLE_WIRE_TYPES.indexOf(this.type.wireType) >= 0) {
	                if (!skipRepeated) {
	                    nBytes = buffer.readVarint32();
	                    nBytes = buffer.offset + nBytes; // Limit
	                    var values = [];
	                    while (buffer.offset < nBytes)
	                        values.push(this.decode(this.type.wireType, buffer, true));
	                    return values;
	                }
	                // Read the next value otherwise...
	            }

	            // Handle maps.
	            if (this.map) {
	                // Read one (key, value) submessage, and return [key, value]
	                var key = Element.defaultFieldValue(this.keyType);
	                value = Element.defaultFieldValue(this.type);

	                // Read the length
	                nBytes = buffer.readVarint32();
	                if (buffer.remaining() < nBytes)
	                    throw Error("Illegal number of bytes for "+this.toString(true)+": "+nBytes+" required but got only "+buffer.remaining());

	                // Get a sub-buffer of this key/value submessage
	                var msgbuf = buffer.clone();
	                msgbuf.limit = msgbuf.offset + nBytes;
	                buffer.offset += nBytes;

	                while (msgbuf.remaining() > 0) {
	                    var tag = msgbuf.readVarint32();
	                    wireType = tag & 0x07;
	                    var id = tag >>> 3;
	                    if (id === 1) {
	                        key = this.keyElement.decode(msgbuf, wireType, id);
	                    } else if (id === 2) {
	                        value = this.element.decode(msgbuf, wireType, id);
	                    } else {
	                        throw Error("Unexpected tag in map field key/value submessage");
	                    }
	                }

	                return [key, value];
	            }

	            // Handle singular and non-packed repeated field values.
	            return this.element.decode(buffer, wireType, this.id);
	        };

	        /**
	         * @alias ProtoBuf.Reflect.Message.Field
	         * @expose
	         */
	        Reflect.Message.Field = Field;

	        /**
	         * Constructs a new Message ExtensionField.
	         * @exports ProtoBuf.Reflect.Message.ExtensionField
	         * @param {!ProtoBuf.Builder} builder Builder reference
	         * @param {!ProtoBuf.Reflect.Message} message Message reference
	         * @param {string} rule Rule, one of requried, optional, repeated
	         * @param {string} type Data type, e.g. int32
	         * @param {string} name Field name
	         * @param {number} id Unique field id
	         * @param {!Object.<string,*>=} options Options
	         * @constructor
	         * @extends ProtoBuf.Reflect.Message.Field
	         */
	        var ExtensionField = function(builder, message, rule, type, name, id, options) {
	            Field.call(this, builder, message, rule, /* keytype = */ null, type, name, id, options);

	            /**
	             * Extension reference.
	             * @type {!ProtoBuf.Reflect.Extension}
	             * @expose
	             */
	            this.extension;
	        };

	        // Extends Field
	        ExtensionField.prototype = Object.create(Field.prototype);

	        /**
	         * @alias ProtoBuf.Reflect.Message.ExtensionField
	         * @expose
	         */
	        Reflect.Message.ExtensionField = ExtensionField;

	        /**
	         * Constructs a new Message OneOf.
	         * @exports ProtoBuf.Reflect.Message.OneOf
	         * @param {!ProtoBuf.Builder} builder Builder reference
	         * @param {!ProtoBuf.Reflect.Message} message Message reference
	         * @param {string} name OneOf name
	         * @constructor
	         * @extends ProtoBuf.Reflect.T
	         */
	        var OneOf = function(builder, message, name) {
	            T.call(this, builder, message, name);

	            /**
	             * Enclosed fields.
	             * @type {!Array.<!ProtoBuf.Reflect.Message.Field>}
	             * @expose
	             */
	            this.fields = [];
	        };

	        /**
	         * @alias ProtoBuf.Reflect.Message.OneOf
	         * @expose
	         */
	        Reflect.Message.OneOf = OneOf;

	        /**
	         * Constructs a new Enum.
	         * @exports ProtoBuf.Reflect.Enum
	         * @param {!ProtoBuf.Builder} builder Builder reference
	         * @param {!ProtoBuf.Reflect.T} parent Parent Reflect object
	         * @param {string} name Enum name
	         * @param {Object.<string,*>=} options Enum options
	         * @param {string?} syntax The syntax level (e.g., proto3)
	         * @constructor
	         * @extends ProtoBuf.Reflect.Namespace
	         */
	        var Enum = function(builder, parent, name, options, syntax) {
	            Namespace.call(this, builder, parent, name, options, syntax);

	            /**
	             * @override
	             */
	            this.className = "Enum";

	            /**
	             * Runtime enum object.
	             * @type {Object.<string,number>|null}
	             * @expose
	             */
	            this.object = null;
	        };

	        /**
	         * Gets the string name of an enum value.
	         * @param {!ProtoBuf.Builder.Enum} enm Runtime enum
	         * @param {number} value Enum value
	         * @returns {?string} Name or `null` if not present
	         * @expose
	         */
	        Enum.getName = function(enm, value) {
	            var keys = Object.keys(enm);
	            for (var i=0, key; i<keys.length; ++i)
	                if (enm[key = keys[i]] === value)
	                    return key;
	            return null;
	        };

	        /**
	         * @alias ProtoBuf.Reflect.Enum.prototype
	         * @inner
	         */
	        var EnumPrototype = Enum.prototype = Object.create(Namespace.prototype);

	        /**
	         * Builds this enum and returns the runtime counterpart.
	         * @param {boolean} rebuild Whether to rebuild or not, defaults to false
	         * @returns {!Object.<string,number>}
	         * @expose
	         */
	        EnumPrototype.build = function(rebuild) {
	            if (this.object && !rebuild)
	                return this.object;
	            var enm = new ProtoBuf.Builder.Enum(),
	                values = this.getChildren(Enum.Value);
	            for (var i=0, k=values.length; i<k; ++i)
	                enm[values[i]['name']] = values[i]['id'];
	            if (Object.defineProperty)
	                Object.defineProperty(enm, '$options', {
	                    "value": this.buildOpt(),
	                    "enumerable": false
	                });
	            return this.object = enm;
	        };

	        /**
	         * @alias ProtoBuf.Reflect.Enum
	         * @expose
	         */
	        Reflect.Enum = Enum;

	        /**
	         * Constructs a new Enum Value.
	         * @exports ProtoBuf.Reflect.Enum.Value
	         * @param {!ProtoBuf.Builder} builder Builder reference
	         * @param {!ProtoBuf.Reflect.Enum} enm Enum reference
	         * @param {string} name Field name
	         * @param {number} id Unique field id
	         * @constructor
	         * @extends ProtoBuf.Reflect.T
	         */
	        var Value = function(builder, enm, name, id) {
	            T.call(this, builder, enm, name);

	            /**
	             * @override
	             */
	            this.className = "Enum.Value";

	            /**
	             * Unique enum value id.
	             * @type {number}
	             * @expose
	             */
	            this.id = id;
	        };

	        // Extends T
	        Value.prototype = Object.create(T.prototype);

	        /**
	         * @alias ProtoBuf.Reflect.Enum.Value
	         * @expose
	         */
	        Reflect.Enum.Value = Value;

	        /**
	         * An extension (field).
	         * @exports ProtoBuf.Reflect.Extension
	         * @constructor
	         * @param {!ProtoBuf.Builder} builder Builder reference
	         * @param {!ProtoBuf.Reflect.T} parent Parent object
	         * @param {string} name Object name
	         * @param {!ProtoBuf.Reflect.Message.Field} field Extension field
	         */
	        var Extension = function(builder, parent, name, field) {
	            T.call(this, builder, parent, name);

	            /**
	             * Extended message field.
	             * @type {!ProtoBuf.Reflect.Message.Field}
	             * @expose
	             */
	            this.field = field;
	        };

	        // Extends T
	        Extension.prototype = Object.create(T.prototype);

	        /**
	         * @alias ProtoBuf.Reflect.Extension
	         * @expose
	         */
	        Reflect.Extension = Extension;

	        /**
	         * Constructs a new Service.
	         * @exports ProtoBuf.Reflect.Service
	         * @param {!ProtoBuf.Builder} builder Builder reference
	         * @param {!ProtoBuf.Reflect.Namespace} root Root
	         * @param {string} name Service name
	         * @param {Object.<string,*>=} options Options
	         * @constructor
	         * @extends ProtoBuf.Reflect.Namespace
	         */
	        var Service = function(builder, root, name, options) {
	            Namespace.call(this, builder, root, name, options);

	            /**
	             * @override
	             */
	            this.className = "Service";

	            /**
	             * Built runtime service class.
	             * @type {?function(new:ProtoBuf.Builder.Service)}
	             */
	            this.clazz = null;
	        };

	        /**
	         * @alias ProtoBuf.Reflect.Service.prototype
	         * @inner
	         */
	        var ServicePrototype = Service.prototype = Object.create(Namespace.prototype);

	        /**
	         * Builds the service and returns the runtime counterpart, which is a fully functional class.
	         * @see ProtoBuf.Builder.Service
	         * @param {boolean=} rebuild Whether to rebuild or not
	         * @return {Function} Service class
	         * @throws {Error} If the message cannot be built
	         * @expose
	         */
	        ServicePrototype.build = function(rebuild) {
	            if (this.clazz && !rebuild)
	                return this.clazz;

	            // Create the runtime Service class in its own scope
	            return this.clazz = (function(ProtoBuf, T) {

	                /**
	                 * Constructs a new runtime Service.
	                 * @name ProtoBuf.Builder.Service
	                 * @param {function(string, ProtoBuf.Builder.Message, function(Error, ProtoBuf.Builder.Message=))=} rpcImpl RPC implementation receiving the method name and the message
	                 * @class Barebone of all runtime services.
	                 * @constructor
	                 * @throws {Error} If the service cannot be created
	                 */
	                var Service = function(rpcImpl) {
	                    ProtoBuf.Builder.Service.call(this);

	                    /**
	                     * Service implementation.
	                     * @name ProtoBuf.Builder.Service#rpcImpl
	                     * @type {!function(string, ProtoBuf.Builder.Message, function(Error, ProtoBuf.Builder.Message=))}
	                     * @expose
	                     */
	                    this.rpcImpl = rpcImpl || function(name, msg, callback) {
	                        // This is what a user has to implement: A function receiving the method name, the actual message to
	                        // send (type checked) and the callback that's either provided with the error as its first
	                        // argument or null and the actual response message.
	                        setTimeout(callback.bind(this, Error("Not implemented, see: https://github.com/dcodeIO/ProtoBuf.js/wiki/Services")), 0); // Must be async!
	                    };
	                };

	                /**
	                 * @alias ProtoBuf.Builder.Service.prototype
	                 * @inner
	                 */
	                var ServicePrototype = Service.prototype = Object.create(ProtoBuf.Builder.Service.prototype);

	                /**
	                 * Asynchronously performs an RPC call using the given RPC implementation.
	                 * @name ProtoBuf.Builder.Service.[Method]
	                 * @function
	                 * @param {!function(string, ProtoBuf.Builder.Message, function(Error, ProtoBuf.Builder.Message=))} rpcImpl RPC implementation
	                 * @param {ProtoBuf.Builder.Message} req Request
	                 * @param {function(Error, (ProtoBuf.Builder.Message|ByteBuffer|Buffer|string)=)} callback Callback receiving
	                 *  the error if any and the response either as a pre-parsed message or as its raw bytes
	                 * @abstract
	                 */

	                /**
	                 * Asynchronously performs an RPC call using the instance's RPC implementation.
	                 * @name ProtoBuf.Builder.Service#[Method]
	                 * @function
	                 * @param {ProtoBuf.Builder.Message} req Request
	                 * @param {function(Error, (ProtoBuf.Builder.Message|ByteBuffer|Buffer|string)=)} callback Callback receiving
	                 *  the error if any and the response either as a pre-parsed message or as its raw bytes
	                 * @abstract
	                 */

	                var rpc = T.getChildren(ProtoBuf.Reflect.Service.RPCMethod);
	                for (var i=0; i<rpc.length; i++) {
	                    (function(method) {

	                        // service#Method(message, callback)
	                        ServicePrototype[method.name] = function(req, callback) {
	                            try {
	                                try {
	                                    // If given as a buffer, decode the request. Will throw a TypeError if not a valid buffer.
	                                    req = method.resolvedRequestType.clazz.decode(ByteBuffer.wrap(req));
	                                } catch (err) {
	                                    if (!(err instanceof TypeError))
	                                        throw err;
	                                }
	                                if (req === null || typeof req !== 'object')
	                                    throw Error("Illegal arguments");
	                                if (!(req instanceof method.resolvedRequestType.clazz))
	                                    req = new method.resolvedRequestType.clazz(req);
	                                this.rpcImpl(method.fqn(), req, function(err, res) { // Assumes that this is properly async
	                                    if (err) {
	                                        callback(err);
	                                        return;
	                                    }
	                                    // Coalesce to empty string when service response has empty content
	                                    if (res === null)
	                                        res = ''
	                                    try { res = method.resolvedResponseType.clazz.decode(res); } catch (notABuffer) {}
	                                    if (!res || !(res instanceof method.resolvedResponseType.clazz)) {
	                                        callback(Error("Illegal response type received in service method "+ T.name+"#"+method.name));
	                                        return;
	                                    }
	                                    callback(null, res);
	                                });
	                            } catch (err) {
	                                setTimeout(callback.bind(this, err), 0);
	                            }
	                        };

	                        // Service.Method(rpcImpl, message, callback)
	                        Service[method.name] = function(rpcImpl, req, callback) {
	                            new Service(rpcImpl)[method.name](req, callback);
	                        };

	                        if (Object.defineProperty)
	                            Object.defineProperty(Service[method.name], "$options", { "value": method.buildOpt() }),
	                            Object.defineProperty(ServicePrototype[method.name], "$options", { "value": Service[method.name]["$options"] });
	                    })(rpc[i]);
	                }

	                // Properties

	                /**
	                 * Service options.
	                 * @name ProtoBuf.Builder.Service.$options
	                 * @type {Object.<string,*>}
	                 * @expose
	                 */
	                var $optionsS; // cc needs this

	                /**
	                 * Service options.
	                 * @name ProtoBuf.Builder.Service#$options
	                 * @type {Object.<string,*>}
	                 * @expose
	                 */
	                var $options;

	                /**
	                 * Reflection type.
	                 * @name ProtoBuf.Builder.Service.$type
	                 * @type {!ProtoBuf.Reflect.Service}
	                 * @expose
	                 */
	                var $typeS;

	                /**
	                 * Reflection type.
	                 * @name ProtoBuf.Builder.Service#$type
	                 * @type {!ProtoBuf.Reflect.Service}
	                 * @expose
	                 */
	                var $type;

	                if (Object.defineProperty)
	                    Object.defineProperty(Service, "$options", { "value": T.buildOpt() }),
	                    Object.defineProperty(ServicePrototype, "$options", { "value": Service["$options"] }),
	                    Object.defineProperty(Service, "$type", { "value": T }),
	                    Object.defineProperty(ServicePrototype, "$type", { "value": T });

	                return Service;

	            })(ProtoBuf, this);
	        };

	        /**
	         * @alias ProtoBuf.Reflect.Service
	         * @expose
	         */
	        Reflect.Service = Service;

	        /**
	         * Abstract service method.
	         * @exports ProtoBuf.Reflect.Service.Method
	         * @param {!ProtoBuf.Builder} builder Builder reference
	         * @param {!ProtoBuf.Reflect.Service} svc Service
	         * @param {string} name Method name
	         * @param {Object.<string,*>=} options Options
	         * @constructor
	         * @extends ProtoBuf.Reflect.T
	         */
	        var Method = function(builder, svc, name, options) {
	            T.call(this, builder, svc, name);

	            /**
	             * @override
	             */
	            this.className = "Service.Method";

	            /**
	             * Options.
	             * @type {Object.<string, *>}
	             * @expose
	             */
	            this.options = options || {};
	        };

	        /**
	         * @alias ProtoBuf.Reflect.Service.Method.prototype
	         * @inner
	         */
	        var MethodPrototype = Method.prototype = Object.create(T.prototype);

	        /**
	         * Builds the method's '$options' property.
	         * @name ProtoBuf.Reflect.Service.Method#buildOpt
	         * @function
	         * @return {Object.<string,*>}
	         */
	        MethodPrototype.buildOpt = NamespacePrototype.buildOpt;

	        /**
	         * @alias ProtoBuf.Reflect.Service.Method
	         * @expose
	         */
	        Reflect.Service.Method = Method;

	        /**
	         * RPC service method.
	         * @exports ProtoBuf.Reflect.Service.RPCMethod
	         * @param {!ProtoBuf.Builder} builder Builder reference
	         * @param {!ProtoBuf.Reflect.Service} svc Service
	         * @param {string} name Method name
	         * @param {string} request Request message name
	         * @param {string} response Response message name
	         * @param {boolean} request_stream Whether requests are streamed
	         * @param {boolean} response_stream Whether responses are streamed
	         * @param {Object.<string,*>=} options Options
	         * @constructor
	         * @extends ProtoBuf.Reflect.Service.Method
	         */
	        var RPCMethod = function(builder, svc, name, request, response, request_stream, response_stream, options) {
	            Method.call(this, builder, svc, name, options);

	            /**
	             * @override
	             */
	            this.className = "Service.RPCMethod";

	            /**
	             * Request message name.
	             * @type {string}
	             * @expose
	             */
	            this.requestName = request;

	            /**
	             * Response message name.
	             * @type {string}
	             * @expose
	             */
	            this.responseName = response;

	            /**
	             * Whether requests are streamed
	             * @type {bool}
	             * @expose
	             */
	            this.requestStream = request_stream;

	            /**
	             * Whether responses are streamed
	             * @type {bool}
	             * @expose
	             */
	            this.responseStream = response_stream;

	            /**
	             * Resolved request message type.
	             * @type {ProtoBuf.Reflect.Message}
	             * @expose
	             */
	            this.resolvedRequestType = null;

	            /**
	             * Resolved response message type.
	             * @type {ProtoBuf.Reflect.Message}
	             * @expose
	             */
	            this.resolvedResponseType = null;
	        };

	        // Extends Method
	        RPCMethod.prototype = Object.create(Method.prototype);

	        /**
	         * @alias ProtoBuf.Reflect.Service.RPCMethod
	         * @expose
	         */
	        Reflect.Service.RPCMethod = RPCMethod;

	        return Reflect;

	    })(ProtoBuf);

	    /**
	     * @alias ProtoBuf.Builder
	     * @expose
	     */
	    ProtoBuf.Builder = (function(ProtoBuf, Lang, Reflect) {
	        "use strict";

	        /**
	         * Constructs a new Builder.
	         * @exports ProtoBuf.Builder
	         * @class Provides the functionality to build protocol messages.
	         * @param {Object.<string,*>=} options Options
	         * @constructor
	         */
	        var Builder = function(options) {

	            /**
	             * Namespace.
	             * @type {ProtoBuf.Reflect.Namespace}
	             * @expose
	             */
	            this.ns = new Reflect.Namespace(this, null, ""); // Global namespace

	            /**
	             * Namespace pointer.
	             * @type {ProtoBuf.Reflect.T}
	             * @expose
	             */
	            this.ptr = this.ns;

	            /**
	             * Resolved flag.
	             * @type {boolean}
	             * @expose
	             */
	            this.resolved = false;

	            /**
	             * The current building result.
	             * @type {Object.<string,ProtoBuf.Builder.Message|Object>|null}
	             * @expose
	             */
	            this.result = null;

	            /**
	             * Imported files.
	             * @type {Array.<string>}
	             * @expose
	             */
	            this.files = {};

	            /**
	             * Import root override.
	             * @type {?string}
	             * @expose
	             */
	            this.importRoot = null;

	            /**
	             * Options.
	             * @type {!Object.<string, *>}
	             * @expose
	             */
	            this.options = options || {};
	        };

	        /**
	         * @alias ProtoBuf.Builder.prototype
	         * @inner
	         */
	        var BuilderPrototype = Builder.prototype;

	        // ----- Definition tests -----

	        /**
	         * Tests if a definition most likely describes a message.
	         * @param {!Object} def
	         * @returns {boolean}
	         * @expose
	         */
	        Builder.isMessage = function(def) {
	            // Messages require a string name
	            if (typeof def["name"] !== 'string')
	                return false;
	            // Messages do not contain values (enum) or rpc methods (service)
	            if (typeof def["values"] !== 'undefined' || typeof def["rpc"] !== 'undefined')
	                return false;
	            return true;
	        };

	        /**
	         * Tests if a definition most likely describes a message field.
	         * @param {!Object} def
	         * @returns {boolean}
	         * @expose
	         */
	        Builder.isMessageField = function(def) {
	            // Message fields require a string rule, name and type and an id
	            if (typeof def["rule"] !== 'string' || typeof def["name"] !== 'string' || typeof def["type"] !== 'string' || typeof def["id"] === 'undefined')
	                return false;
	            return true;
	        };

	        /**
	         * Tests if a definition most likely describes an enum.
	         * @param {!Object} def
	         * @returns {boolean}
	         * @expose
	         */
	        Builder.isEnum = function(def) {
	            // Enums require a string name
	            if (typeof def["name"] !== 'string')
	                return false;
	            // Enums require at least one value
	            if (typeof def["values"] === 'undefined' || !Array.isArray(def["values"]) || def["values"].length === 0)
	                return false;
	            return true;
	        };

	        /**
	         * Tests if a definition most likely describes a service.
	         * @param {!Object} def
	         * @returns {boolean}
	         * @expose
	         */
	        Builder.isService = function(def) {
	            // Services require a string name and an rpc object
	            if (typeof def["name"] !== 'string' || typeof def["rpc"] !== 'object' || !def["rpc"])
	                return false;
	            return true;
	        };

	        /**
	         * Tests if a definition most likely describes an extended message
	         * @param {!Object} def
	         * @returns {boolean}
	         * @expose
	         */
	        Builder.isExtend = function(def) {
	            // Extends rquire a string ref
	            if (typeof def["ref"] !== 'string')
	                return false;
	            return true;
	        };

	        // ----- Building -----

	        /**
	         * Resets the pointer to the root namespace.
	         * @returns {!ProtoBuf.Builder} this
	         * @expose
	         */
	        BuilderPrototype.reset = function() {
	            this.ptr = this.ns;
	            return this;
	        };

	        /**
	         * Defines a namespace on top of the current pointer position and places the pointer on it.
	         * @param {string} namespace
	         * @return {!ProtoBuf.Builder} this
	         * @expose
	         */
	        BuilderPrototype.define = function(namespace) {
	            if (typeof namespace !== 'string' || !Lang.TYPEREF.test(namespace))
	                throw Error("illegal namespace: "+namespace);
	            namespace.split(".").forEach(function(part) {
	                var ns = this.ptr.getChild(part);
	                if (ns === null) // Keep existing
	                    this.ptr.addChild(ns = new Reflect.Namespace(this, this.ptr, part));
	                this.ptr = ns;
	            }, this);
	            return this;
	        };

	        /**
	         * Creates the specified definitions at the current pointer position.
	         * @param {!Array.<!Object>} defs Messages, enums or services to create
	         * @returns {!ProtoBuf.Builder} this
	         * @throws {Error} If a message definition is invalid
	         * @expose
	         */
	        BuilderPrototype.create = function(defs) {
	            if (!defs)
	                return this; // Nothing to create
	            if (!Array.isArray(defs))
	                defs = [defs];
	            else {
	                if (defs.length === 0)
	                    return this;
	                defs = defs.slice();
	            }

	            // It's quite hard to keep track of scopes and memory here, so let's do this iteratively.
	            var stack = [defs];
	            while (stack.length > 0) {
	                defs = stack.pop();

	                if (!Array.isArray(defs)) // Stack always contains entire namespaces
	                    throw Error("not a valid namespace: "+JSON.stringify(defs));

	                while (defs.length > 0) {
	                    var def = defs.shift(); // Namespaces always contain an array of messages, enums and services

	                    if (Builder.isMessage(def)) {
	                        var obj = new Reflect.Message(this, this.ptr, def["name"], def["options"], def["isGroup"], def["syntax"]);

	                        // Create OneOfs
	                        var oneofs = {};
	                        if (def["oneofs"])
	                            Object.keys(def["oneofs"]).forEach(function(name) {
	                                obj.addChild(oneofs[name] = new Reflect.Message.OneOf(this, obj, name));
	                            }, this);

	                        // Create fields
	                        if (def["fields"])
	                            def["fields"].forEach(function(fld) {
	                                if (obj.getChild(fld["id"]|0) !== null)
	                                    throw Error("duplicate or invalid field id in "+obj.name+": "+fld['id']);
	                                if (fld["options"] && typeof fld["options"] !== 'object')
	                                    throw Error("illegal field options in "+obj.name+"#"+fld["name"]);
	                                var oneof = null;
	                                if (typeof fld["oneof"] === 'string' && !(oneof = oneofs[fld["oneof"]]))
	                                    throw Error("illegal oneof in "+obj.name+"#"+fld["name"]+": "+fld["oneof"]);
	                                fld = new Reflect.Message.Field(this, obj, fld["rule"], fld["keytype"], fld["type"], fld["name"], fld["id"], fld["options"], oneof, def["syntax"]);
	                                if (oneof)
	                                    oneof.fields.push(fld);
	                                obj.addChild(fld);
	                            }, this);

	                        // Push children to stack
	                        var subObj = [];
	                        if (def["enums"])
	                            def["enums"].forEach(function(enm) {
	                                subObj.push(enm);
	                            });
	                        if (def["messages"])
	                            def["messages"].forEach(function(msg) {
	                                subObj.push(msg);
	                            });
	                        if (def["services"])
	                            def["services"].forEach(function(svc) {
	                                subObj.push(svc);
	                            });

	                        // Set extension ranges
	                        if (def["extensions"]) {
	                            if (typeof def["extensions"][0] === 'number') // pre 5.0.1
	                                obj.extensions = [ def["extensions"] ];
	                            else
	                                obj.extensions = def["extensions"];
	                        }

	                        // Create on top of current namespace
	                        this.ptr.addChild(obj);
	                        if (subObj.length > 0) {
	                            stack.push(defs); // Push the current level back
	                            defs = subObj; // Continue processing sub level
	                            subObj = null;
	                            this.ptr = obj; // And move the pointer to this namespace
	                            obj = null;
	                            continue;
	                        }
	                        subObj = null;

	                    } else if (Builder.isEnum(def)) {

	                        obj = new Reflect.Enum(this, this.ptr, def["name"], def["options"], def["syntax"]);
	                        def["values"].forEach(function(val) {
	                            obj.addChild(new Reflect.Enum.Value(this, obj, val["name"], val["id"]));
	                        }, this);
	                        this.ptr.addChild(obj);

	                    } else if (Builder.isService(def)) {

	                        obj = new Reflect.Service(this, this.ptr, def["name"], def["options"]);
	                        Object.keys(def["rpc"]).forEach(function(name) {
	                            var mtd = def["rpc"][name];
	                            obj.addChild(new Reflect.Service.RPCMethod(this, obj, name, mtd["request"], mtd["response"], !!mtd["request_stream"], !!mtd["response_stream"], mtd["options"]));
	                        }, this);
	                        this.ptr.addChild(obj);

	                    } else if (Builder.isExtend(def)) {

	                        obj = this.ptr.resolve(def["ref"], true);
	                        if (obj) {
	                            def["fields"].forEach(function(fld) {
	                                if (obj.getChild(fld['id']|0) !== null)
	                                    throw Error("duplicate extended field id in "+obj.name+": "+fld['id']);
	                                // Check if field id is allowed to be extended
	                                if (obj.extensions) {
	                                    var valid = false;
	                                    obj.extensions.forEach(function(range) {
	                                        if (fld["id"] >= range[0] && fld["id"] <= range[1])
	                                            valid = true;
	                                    });
	                                    if (!valid)
	                                        throw Error("illegal extended field id in "+obj.name+": "+fld['id']+" (not within valid ranges)");
	                                }
	                                // Convert extension field names to camel case notation if the override is set
	                                var name = fld["name"];
	                                if (this.options['convertFieldsToCamelCase'])
	                                    name = ProtoBuf.Util.toCamelCase(name);
	                                // see #161: Extensions use their fully qualified name as their runtime key and...
	                                var field = new Reflect.Message.ExtensionField(this, obj, fld["rule"], fld["type"], this.ptr.fqn()+'.'+name, fld["id"], fld["options"]);
	                                // ...are added on top of the current namespace as an extension which is used for
	                                // resolving their type later on (the extension always keeps the original name to
	                                // prevent naming collisions)
	                                var ext = new Reflect.Extension(this, this.ptr, fld["name"], field);
	                                field.extension = ext;
	                                this.ptr.addChild(ext);
	                                obj.addChild(field);
	                            }, this);

	                        } else if (!/\.?google\.protobuf\./.test(def["ref"])) // Silently skip internal extensions
	                            throw Error("extended message "+def["ref"]+" is not defined");

	                    } else
	                        throw Error("not a valid definition: "+JSON.stringify(def));

	                    def = null;
	                    obj = null;
	                }
	                // Break goes here
	                defs = null;
	                this.ptr = this.ptr.parent; // Namespace done, continue at parent
	            }
	            this.resolved = false; // Require re-resolve
	            this.result = null; // Require re-build
	            return this;
	        };

	        /**
	         * Propagates syntax to all children.
	         * @param {!Object} parent
	         * @inner
	         */
	        function propagateSyntax(parent) {
	            if (parent['messages']) {
	                parent['messages'].forEach(function(child) {
	                    child["syntax"] = parent["syntax"];
	                    propagateSyntax(child);
	                });
	            }
	            if (parent['enums']) {
	                parent['enums'].forEach(function(child) {
	                    child["syntax"] = parent["syntax"];
	                });
	            }
	        }

	        /**
	         * Imports another definition into this builder.
	         * @param {Object.<string,*>} json Parsed import
	         * @param {(string|{root: string, file: string})=} filename Imported file name
	         * @returns {!ProtoBuf.Builder} this
	         * @throws {Error} If the definition or file cannot be imported
	         * @expose
	         */
	        BuilderPrototype["import"] = function(json, filename) {
	            var delim = '/';

	            // Make sure to skip duplicate imports

	            if (typeof filename === 'string') {

	                if (ProtoBuf.Util.IS_NODE)
	                    filename = require$$0$73['resolve'](filename);
	                if (this.files[filename] === true)
	                    return this.reset();
	                this.files[filename] = true;

	            } else if (typeof filename === 'object') { // Object with root, file.

	                var root = filename.root;
	                if (ProtoBuf.Util.IS_NODE)
	                    root = require$$0$73['resolve'](root);
	                if (root.indexOf("\\") >= 0 || filename.file.indexOf("\\") >= 0)
	                    delim = '\\';
	                var fname = root + delim + filename.file;
	                if (this.files[fname] === true)
	                    return this.reset();
	                this.files[fname] = true;
	            }

	            // Import imports

	            if (json['imports'] && json['imports'].length > 0) {
	                var importRoot,
	                    resetRoot = false;

	                if (typeof filename === 'object') { // If an import root is specified, override

	                    this.importRoot = filename["root"]; resetRoot = true; // ... and reset afterwards
	                    importRoot = this.importRoot;
	                    filename = filename["file"];
	                    if (importRoot.indexOf("\\") >= 0 || filename.indexOf("\\") >= 0)
	                        delim = '\\';

	                } else if (typeof filename === 'string') {

	                    if (this.importRoot) // If import root is overridden, use it
	                        importRoot = this.importRoot;
	                    else { // Otherwise compute from filename
	                        if (filename.indexOf("/") >= 0) { // Unix
	                            importRoot = filename.replace(/\/[^\/]*$/, "");
	                            if (/* /file.proto */ importRoot === "")
	                                importRoot = "/";
	                        } else if (filename.indexOf("\\") >= 0) { // Windows
	                            importRoot = filename.replace(/\\[^\\]*$/, "");
	                            delim = '\\';
	                        } else
	                            importRoot = ".";
	                    }

	                } else
	                    importRoot = null;

	                for (var i=0; i<json['imports'].length; i++) {
	                    if (typeof json['imports'][i] === 'string') { // Import file
	                        if (!importRoot)
	                            throw Error("cannot determine import root");
	                        var importFilename = json['imports'][i];
	                        if (importFilename === "google/protobuf/descriptor.proto")
	                            continue; // Not needed and therefore not used
	                        importFilename = importRoot + delim + importFilename;
	                        if (this.files[importFilename] === true)
	                            continue; // Already imported
	                        if (/\.proto$/i.test(importFilename) && !ProtoBuf.DotProto)       // If this is a light build
	                            importFilename = importFilename.replace(/\.proto$/, ".json"); // always load the JSON file
	                        var contents = ProtoBuf.Util.fetch(importFilename);
	                        if (contents === null)
	                            throw Error("failed to import '"+importFilename+"' in '"+filename+"': file not found");
	                        if (/\.json$/i.test(importFilename)) // Always possible
	                            this["import"](JSON.parse(contents+""), importFilename); // May throw
	                        else
	                            this["import"](ProtoBuf.DotProto.Parser.parse(contents), importFilename); // May throw
	                    } else // Import structure
	                        if (!filename)
	                            this["import"](json['imports'][i]);
	                        else if (/\.(\w+)$/.test(filename)) // With extension: Append _importN to the name portion to make it unique
	                            this["import"](json['imports'][i], filename.replace(/^(.+)\.(\w+)$/, function($0, $1, $2) { return $1+"_import"+i+"."+$2; }));
	                        else // Without extension: Append _importN to make it unique
	                            this["import"](json['imports'][i], filename+"_import"+i);
	                }
	                if (resetRoot) // Reset import root override when all imports are done
	                    this.importRoot = null;
	            }

	            // Import structures

	            if (json['package'])
	                this.define(json['package']);
	            if (json['syntax'])
	                propagateSyntax(json);
	            var base = this.ptr;
	            if (json['options'])
	                Object.keys(json['options']).forEach(function(key) {
	                    base.options[key] = json['options'][key];
	                });
	            if (json['messages'])
	                this.create(json['messages']),
	                this.ptr = base;
	            if (json['enums'])
	                this.create(json['enums']),
	                this.ptr = base;
	            if (json['services'])
	                this.create(json['services']),
	                this.ptr = base;
	            if (json['extends'])
	                this.create(json['extends']);

	            return this.reset();
	        };

	        /**
	         * Resolves all namespace objects.
	         * @throws {Error} If a type cannot be resolved
	         * @returns {!ProtoBuf.Builder} this
	         * @expose
	         */
	        BuilderPrototype.resolveAll = function() {
	            // Resolve all reflected objects
	            var res;
	            if (this.ptr == null || typeof this.ptr.type === 'object')
	                return this; // Done (already resolved)

	            if (this.ptr instanceof Reflect.Namespace) { // Resolve children

	                this.ptr.children.forEach(function(child) {
	                    this.ptr = child;
	                    this.resolveAll();
	                }, this);

	            } else if (this.ptr instanceof Reflect.Message.Field) { // Resolve type

	                if (!Lang.TYPE.test(this.ptr.type)) {
	                    if (!Lang.TYPEREF.test(this.ptr.type))
	                        throw Error("illegal type reference in "+this.ptr.toString(true)+": "+this.ptr.type);
	                    res = (this.ptr instanceof Reflect.Message.ExtensionField ? this.ptr.extension.parent : this.ptr.parent).resolve(this.ptr.type, true);
	                    if (!res)
	                        throw Error("unresolvable type reference in "+this.ptr.toString(true)+": "+this.ptr.type);
	                    this.ptr.resolvedType = res;
	                    if (res instanceof Reflect.Enum) {
	                        this.ptr.type = ProtoBuf.TYPES["enum"];
	                        if (this.ptr.syntax === 'proto3' && res.syntax !== 'proto3')
	                            throw Error("proto3 message cannot reference proto2 enum");
	                    }
	                    else if (res instanceof Reflect.Message)
	                        this.ptr.type = res.isGroup ? ProtoBuf.TYPES["group"] : ProtoBuf.TYPES["message"];
	                    else
	                        throw Error("illegal type reference in "+this.ptr.toString(true)+": "+this.ptr.type);
	                } else
	                    this.ptr.type = ProtoBuf.TYPES[this.ptr.type];

	                // If it's a map field, also resolve the key type. The key type can be only a numeric, string, or bool type
	                // (i.e., no enums or messages), so we don't need to resolve against the current namespace.
	                if (this.ptr.map) {
	                    if (!Lang.TYPE.test(this.ptr.keyType))
	                        throw Error("illegal key type for map field in "+this.ptr.toString(true)+": "+this.ptr.keyType);
	                    this.ptr.keyType = ProtoBuf.TYPES[this.ptr.keyType];
	                }

	            } else if (this.ptr instanceof ProtoBuf.Reflect.Service.Method) {

	                if (this.ptr instanceof ProtoBuf.Reflect.Service.RPCMethod) {
	                    res = this.ptr.parent.resolve(this.ptr.requestName, true);
	                    if (!res || !(res instanceof ProtoBuf.Reflect.Message))
	                        throw Error("Illegal type reference in "+this.ptr.toString(true)+": "+this.ptr.requestName);
	                    this.ptr.resolvedRequestType = res;
	                    res = this.ptr.parent.resolve(this.ptr.responseName, true);
	                    if (!res || !(res instanceof ProtoBuf.Reflect.Message))
	                        throw Error("Illegal type reference in "+this.ptr.toString(true)+": "+this.ptr.responseName);
	                    this.ptr.resolvedResponseType = res;
	                } else // Should not happen as nothing else is implemented
	                    throw Error("illegal service type in "+this.ptr.toString(true));

	            } else if (
	                !(this.ptr instanceof ProtoBuf.Reflect.Message.OneOf) && // Not built
	                !(this.ptr instanceof ProtoBuf.Reflect.Extension) && // Not built
	                !(this.ptr instanceof ProtoBuf.Reflect.Enum.Value) // Built in enum
	            )
	                throw Error("illegal object in namespace: "+typeof(this.ptr)+": "+this.ptr);

	            return this.reset();
	        };

	        /**
	         * Builds the protocol. This will first try to resolve all definitions and, if this has been successful,
	         * return the built package.
	         * @param {(string|Array.<string>)=} path Specifies what to return. If omitted, the entire namespace will be returned.
	         * @returns {!ProtoBuf.Builder.Message|!Object.<string,*>}
	         * @throws {Error} If a type could not be resolved
	         * @expose
	         */
	        BuilderPrototype.build = function(path) {
	            this.reset();
	            if (!this.resolved)
	                this.resolveAll(),
	                this.resolved = true,
	                this.result = null; // Require re-build
	            if (this.result === null) // (Re-)Build
	                this.result = this.ns.build();
	            if (!path)
	                return this.result;
	            var part = typeof path === 'string' ? path.split(".") : path,
	                ptr = this.result; // Build namespace pointer (no hasChild etc.)
	            for (var i=0; i<part.length; i++)
	                if (ptr[part[i]])
	                    ptr = ptr[part[i]];
	                else {
	                    ptr = null;
	                    break;
	                }
	            return ptr;
	        };

	        /**
	         * Similar to {@link ProtoBuf.Builder#build}, but looks up the internal reflection descriptor.
	         * @param {string=} path Specifies what to return. If omitted, the entire namespace wiil be returned.
	         * @param {boolean=} excludeNonNamespace Excludes non-namespace types like fields, defaults to `false`
	         * @returns {?ProtoBuf.Reflect.T} Reflection descriptor or `null` if not found
	         */
	        BuilderPrototype.lookup = function(path, excludeNonNamespace) {
	            return path ? this.ns.resolve(path, excludeNonNamespace) : this.ns;
	        };

	        /**
	         * Returns a string representation of this object.
	         * @return {string} String representation as of "Builder"
	         * @expose
	         */
	        BuilderPrototype.toString = function() {
	            return "Builder";
	        };

	        // ----- Base classes -----
	        // Exist for the sole purpose of being able to "... instanceof ProtoBuf.Builder.Message" etc.

	        /**
	         * @alias ProtoBuf.Builder.Message
	         */
	        Builder.Message = function() {};

	        /**
	         * @alias ProtoBuf.Builder.Enum
	         */
	        Builder.Enum = function() {};

	        /**
	         * @alias ProtoBuf.Builder.Message
	         */
	        Builder.Service = function() {};

	        return Builder;

	    })(ProtoBuf, ProtoBuf.Lang, ProtoBuf.Reflect);

	    /**
	     * @alias ProtoBuf.Map
	     * @expose
	     */
	    ProtoBuf.Map = (function(ProtoBuf, Reflect) {
	        "use strict";

	        /**
	         * Constructs a new Map. A Map is a container that is used to implement map
	         * fields on message objects. It closely follows the ES6 Map API; however,
	         * it is distinct because we do not want to depend on external polyfills or
	         * on ES6 itself.
	         *
	         * @exports ProtoBuf.Map
	         * @param {!ProtoBuf.Reflect.Field} field Map field
	         * @param {Object.<string,*>=} contents Initial contents
	         * @constructor
	         */
	        var Map = function(field, contents) {
	            if (!field.map)
	                throw Error("field is not a map");

	            /**
	             * The field corresponding to this map.
	             * @type {!ProtoBuf.Reflect.Field}
	             */
	            this.field = field;

	            /**
	             * Element instance corresponding to key type.
	             * @type {!ProtoBuf.Reflect.Element}
	             */
	            this.keyElem = new Reflect.Element(field.keyType, null, true, field.syntax);

	            /**
	             * Element instance corresponding to value type.
	             * @type {!ProtoBuf.Reflect.Element}
	             */
	            this.valueElem = new Reflect.Element(field.type, field.resolvedType, false, field.syntax);

	            /**
	             * Internal map: stores mapping of (string form of key) -> (key, value)
	             * pair.
	             *
	             * We provide map semantics for arbitrary key types, but we build on top
	             * of an Object, which has only string keys. In order to avoid the need
	             * to convert a string key back to its native type in many situations,
	             * we store the native key value alongside the value. Thus, we only need
	             * a one-way mapping from a key type to its string form that guarantees
	             * uniqueness and equality (i.e., str(K1) === str(K2) if and only if K1
	             * === K2).
	             *
	             * @type {!Object<string, {key: *, value: *}>}
	             */
	            this.map = {};

	            /**
	             * Returns the number of elements in the map.
	             */
	            Object.defineProperty(this, "size", {
	                get: function() { return Object.keys(this.map).length; }
	            });

	            // Fill initial contents from a raw object.
	            if (contents) {
	                var keys = Object.keys(contents);
	                for (var i = 0; i < keys.length; i++) {
	                    var key = this.keyElem.valueFromString(keys[i]);
	                    var val = this.valueElem.verifyValue(contents[keys[i]]);
	                    this.map[this.keyElem.valueToString(key)] =
	                        { key: key, value: val };
	                }
	            }
	        };

	        var MapPrototype = Map.prototype;

	        /**
	         * Helper: return an iterator over an array.
	         * @param {!Array<*>} arr the array
	         * @returns {!Object} an iterator
	         * @inner
	         */
	        function arrayIterator(arr) {
	            var idx = 0;
	            return {
	                next: function() {
	                    if (idx < arr.length)
	                        return { done: false, value: arr[idx++] };
	                    return { done: true };
	                }
	            }
	        }

	        /**
	         * Clears the map.
	         */
	        MapPrototype.clear = function() {
	            this.map = {};
	        };

	        /**
	         * Deletes a particular key from the map.
	         * @returns {boolean} Whether any entry with this key was deleted.
	         */
	        MapPrototype["delete"] = function(key) {
	            var keyValue = this.keyElem.valueToString(this.keyElem.verifyValue(key));
	            var hadKey = keyValue in this.map;
	            delete this.map[keyValue];
	            return hadKey;
	        };

	        /**
	         * Returns an iterator over [key, value] pairs in the map.
	         * @returns {Object} The iterator
	         */
	        MapPrototype.entries = function() {
	            var entries = [];
	            var strKeys = Object.keys(this.map);
	            for (var i = 0, entry; i < strKeys.length; i++)
	                entries.push([(entry=this.map[strKeys[i]]).key, entry.value]);
	            return arrayIterator(entries);
	        };

	        /**
	         * Returns an iterator over keys in the map.
	         * @returns {Object} The iterator
	         */
	        MapPrototype.keys = function() {
	            var keys = [];
	            var strKeys = Object.keys(this.map);
	            for (var i = 0; i < strKeys.length; i++)
	                keys.push(this.map[strKeys[i]].key);
	            return arrayIterator(keys);
	        };

	        /**
	         * Returns an iterator over values in the map.
	         * @returns {!Object} The iterator
	         */
	        MapPrototype.values = function() {
	            var values = [];
	            var strKeys = Object.keys(this.map);
	            for (var i = 0; i < strKeys.length; i++)
	                values.push(this.map[strKeys[i]].value);
	            return arrayIterator(values);
	        };

	        /**
	         * Iterates over entries in the map, calling a function on each.
	         * @param {function(this:*, *, *, *)} cb The callback to invoke with value, key, and map arguments.
	         * @param {Object=} thisArg The `this` value for the callback
	         */
	        MapPrototype.forEach = function(cb, thisArg) {
	            var strKeys = Object.keys(this.map);
	            for (var i = 0, entry; i < strKeys.length; i++)
	                cb.call(thisArg, (entry=this.map[strKeys[i]]).value, entry.key, this);
	        };

	        /**
	         * Sets a key in the map to the given value.
	         * @param {*} key The key
	         * @param {*} value The value
	         * @returns {!ProtoBuf.Map} The map instance
	         */
	        MapPrototype.set = function(key, value) {
	            var keyValue = this.keyElem.verifyValue(key);
	            var valValue = this.valueElem.verifyValue(value);
	            this.map[this.keyElem.valueToString(keyValue)] =
	                { key: keyValue, value: valValue };
	            return this;
	        };

	        /**
	         * Gets the value corresponding to a key in the map.
	         * @param {*} key The key
	         * @returns {*|undefined} The value, or `undefined` if key not present
	         */
	        MapPrototype.get = function(key) {
	            var keyValue = this.keyElem.valueToString(this.keyElem.verifyValue(key));
	            if (!(keyValue in this.map))
	                return undefined;
	            return this.map[keyValue].value;
	        };

	        /**
	         * Determines whether the given key is present in the map.
	         * @param {*} key The key
	         * @returns {boolean} `true` if the key is present
	         */
	        MapPrototype.has = function(key) {
	            var keyValue = this.keyElem.valueToString(this.keyElem.verifyValue(key));
	            return (keyValue in this.map);
	        };

	        return Map;
	    })(ProtoBuf, ProtoBuf.Reflect);


	    /**
	     * Constructs a new empty Builder.
	     * @param {Object.<string,*>=} options Builder options, defaults to global options set on ProtoBuf
	     * @return {!ProtoBuf.Builder} Builder
	     * @expose
	     */
	    ProtoBuf.newBuilder = function(options) {
	        options = options || {};
	        if (typeof options['convertFieldsToCamelCase'] === 'undefined')
	            options['convertFieldsToCamelCase'] = ProtoBuf.convertFieldsToCamelCase;
	        if (typeof options['populateAccessors'] === 'undefined')
	            options['populateAccessors'] = ProtoBuf.populateAccessors;
	        return new ProtoBuf.Builder(options);
	    };

	    /**
	     * Loads a .json definition and returns the Builder.
	     * @param {!*|string} json JSON definition
	     * @param {(ProtoBuf.Builder|string|{root: string, file: string})=} builder Builder to append to. Will create a new one if omitted.
	     * @param {(string|{root: string, file: string})=} filename The corresponding file name if known. Must be specified for imports.
	     * @return {ProtoBuf.Builder} Builder to create new messages
	     * @throws {Error} If the definition cannot be parsed or built
	     * @expose
	     */
	    ProtoBuf.loadJson = function(json, builder, filename) {
	        if (typeof builder === 'string' || (builder && typeof builder["file"] === 'string' && typeof builder["root"] === 'string'))
	            filename = builder,
	            builder = null;
	        if (!builder || typeof builder !== 'object')
	            builder = ProtoBuf.newBuilder();
	        if (typeof json === 'string')
	            json = JSON.parse(json);
	        builder["import"](json, filename);
	        builder.resolveAll();
	        return builder;
	    };

	    /**
	     * Loads a .json file and returns the Builder.
	     * @param {string|!{root: string, file: string}} filename Path to json file or an object specifying 'file' with
	     *  an overridden 'root' path for all imported files.
	     * @param {function(?Error, !ProtoBuf.Builder=)=} callback Callback that will receive `null` as the first and
	     *  the Builder as its second argument on success, otherwise the error as its first argument. If omitted, the
	     *  file will be read synchronously and this function will return the Builder.
	     * @param {ProtoBuf.Builder=} builder Builder to append to. Will create a new one if omitted.
	     * @return {?ProtoBuf.Builder|undefined} The Builder if synchronous (no callback specified, will be NULL if the
	     *   request has failed), else undefined
	     * @expose
	     */
	    ProtoBuf.loadJsonFile = function(filename, callback, builder) {
	        if (callback && typeof callback === 'object')
	            builder = callback,
	            callback = null;
	        else if (!callback || typeof callback !== 'function')
	            callback = null;
	        if (callback)
	            return ProtoBuf.Util.fetch(typeof filename === 'string' ? filename : filename["root"]+"/"+filename["file"], function(contents) {
	                if (contents === null) {
	                    callback(Error("Failed to fetch file"));
	                    return;
	                }
	                try {
	                    callback(null, ProtoBuf.loadJson(JSON.parse(contents), builder, filename));
	                } catch (e) {
	                    callback(e);
	                }
	            });
	        var contents = ProtoBuf.Util.fetch(typeof filename === 'object' ? filename["root"]+"/"+filename["file"] : filename);
	        return contents === null ? null : ProtoBuf.loadJson(JSON.parse(contents), builder, filename);
	    };

	    return ProtoBuf;
	});
	});

	var messageCompiled = createCommonjsModule(function (module) {
	    module.exports = protobufLight.newBuilder({})['import']({
	        "package": "push_server.messages",
	        "options": {
	            "objc_class_prefix": "AVIM"
	        },
	        "messages": [{
	            "name": "JsonObjectMessage",
	            "fields": [{
	                "rule": "required",
	                "type": "string",
	                "name": "data",
	                "id": 1
	            }]
	        }, {
	            "name": "UnreadTuple",
	            "fields": [{
	                "rule": "required",
	                "type": "string",
	                "name": "cid",
	                "id": 1
	            }, {
	                "rule": "required",
	                "type": "int32",
	                "name": "unread",
	                "id": 2
	            }, {
	                "rule": "optional",
	                "type": "string",
	                "name": "mid",
	                "id": 3
	            }, {
	                "rule": "optional",
	                "type": "int64",
	                "name": "timestamp",
	                "id": 4
	            }]
	        }, {
	            "name": "LogItem",
	            "fields": [{
	                "rule": "optional",
	                "type": "string",
	                "name": "from",
	                "id": 1
	            }, {
	                "rule": "optional",
	                "type": "string",
	                "name": "data",
	                "id": 2
	            }, {
	                "rule": "optional",
	                "type": "int64",
	                "name": "timestamp",
	                "id": 3
	            }, {
	                "rule": "optional",
	                "type": "string",
	                "name": "msgId",
	                "id": 4
	            }, {
	                "rule": "optional",
	                "type": "int64",
	                "name": "ackAt",
	                "id": 5
	            }]
	        }, {
	            "name": "LoginCommand",
	            "fields": []
	        }, {
	            "name": "DataCommand",
	            "fields": [{
	                "rule": "repeated",
	                "type": "string",
	                "name": "ids",
	                "id": 1
	            }, {
	                "rule": "repeated",
	                "type": "JsonObjectMessage",
	                "name": "msg",
	                "id": 2
	            }, {
	                "rule": "optional",
	                "type": "bool",
	                "name": "offline",
	                "id": 3
	            }]
	        }, {
	            "name": "SessionCommand",
	            "fields": [{
	                "rule": "optional",
	                "type": "int64",
	                "name": "t",
	                "id": 1
	            }, {
	                "rule": "optional",
	                "type": "string",
	                "name": "n",
	                "id": 2
	            }, {
	                "rule": "optional",
	                "type": "string",
	                "name": "s",
	                "id": 3
	            }, {
	                "rule": "optional",
	                "type": "string",
	                "name": "ua",
	                "id": 4
	            }, {
	                "rule": "optional",
	                "type": "bool",
	                "name": "r",
	                "id": 5
	            }, {
	                "rule": "optional",
	                "type": "string",
	                "name": "tag",
	                "id": 6
	            }, {
	                "rule": "optional",
	                "type": "string",
	                "name": "deviceId",
	                "id": 7
	            }, {
	                "rule": "repeated",
	                "type": "string",
	                "name": "sessionPeerIds",
	                "id": 8
	            }, {
	                "rule": "repeated",
	                "type": "string",
	                "name": "onlineSessionPeerIds",
	                "id": 9
	            }, {
	                "rule": "optional",
	                "type": "string",
	                "name": "st",
	                "id": 10
	            }, {
	                "rule": "optional",
	                "type": "int32",
	                "name": "stTtl",
	                "id": 11
	            }, {
	                "rule": "optional",
	                "type": "int32",
	                "name": "code",
	                "id": 12
	            }, {
	                "rule": "optional",
	                "type": "string",
	                "name": "reason",
	                "id": 13
	            }, {
	                "rule": "optional",
	                "type": "string",
	                "name": "deviceToken",
	                "id": 14
	            }, {
	                "rule": "optional",
	                "type": "bool",
	                "name": "sp",
	                "id": 15
	            }, {
	                "rule": "optional",
	                "type": "string",
	                "name": "detail",
	                "id": 16
	            }]
	        }, {
	            "name": "ErrorCommand",
	            "fields": [{
	                "rule": "required",
	                "type": "int32",
	                "name": "code",
	                "id": 1
	            }, {
	                "rule": "required",
	                "type": "string",
	                "name": "reason",
	                "id": 2
	            }, {
	                "rule": "optional",
	                "type": "int32",
	                "name": "appCode",
	                "id": 3
	            }, {
	                "rule": "optional",
	                "type": "string",
	                "name": "detail",
	                "id": 4
	            }]
	        }, {
	            "name": "DirectCommand",
	            "fields": [{
	                "rule": "optional",
	                "type": "string",
	                "name": "msg",
	                "id": 1
	            }, {
	                "rule": "optional",
	                "type": "string",
	                "name": "uid",
	                "id": 2
	            }, {
	                "rule": "optional",
	                "type": "string",
	                "name": "fromPeerId",
	                "id": 3
	            }, {
	                "rule": "optional",
	                "type": "int64",
	                "name": "timestamp",
	                "id": 4
	            }, {
	                "rule": "optional",
	                "type": "bool",
	                "name": "offline",
	                "id": 5
	            }, {
	                "rule": "optional",
	                "type": "bool",
	                "name": "hasMore",
	                "id": 6
	            }, {
	                "rule": "repeated",
	                "type": "string",
	                "name": "toPeerIds",
	                "id": 7
	            }, {
	                "rule": "optional",
	                "type": "bool",
	                "name": "r",
	                "id": 10
	            }, {
	                "rule": "optional",
	                "type": "string",
	                "name": "cid",
	                "id": 11
	            }, {
	                "rule": "optional",
	                "type": "string",
	                "name": "id",
	                "id": 12
	            }, {
	                "rule": "optional",
	                "type": "bool",
	                "name": "transient",
	                "id": 13
	            }, {
	                "rule": "optional",
	                "type": "string",
	                "name": "dt",
	                "id": 14
	            }, {
	                "rule": "optional",
	                "type": "string",
	                "name": "roomId",
	                "id": 15
	            }, {
	                "rule": "optional",
	                "type": "string",
	                "name": "pushData",
	                "id": 16
	            }]
	        }, {
	            "name": "AckCommand",
	            "fields": [{
	                "rule": "optional",
	                "type": "int32",
	                "name": "code",
	                "id": 1
	            }, {
	                "rule": "optional",
	                "type": "string",
	                "name": "reason",
	                "id": 2
	            }, {
	                "rule": "optional",
	                "type": "string",
	                "name": "mid",
	                "id": 3
	            }, {
	                "rule": "optional",
	                "type": "string",
	                "name": "cid",
	                "id": 4
	            }, {
	                "rule": "optional",
	                "type": "int64",
	                "name": "t",
	                "id": 5
	            }, {
	                "rule": "optional",
	                "type": "string",
	                "name": "uid",
	                "id": 6
	            }, {
	                "rule": "optional",
	                "type": "int64",
	                "name": "fromts",
	                "id": 7
	            }, {
	                "rule": "optional",
	                "type": "int64",
	                "name": "tots",
	                "id": 8
	            }, {
	                "rule": "optional",
	                "type": "string",
	                "name": "type",
	                "id": 9
	            }, {
	                "rule": "repeated",
	                "type": "string",
	                "name": "ids",
	                "id": 10
	            }, {
	                "rule": "optional",
	                "type": "int32",
	                "name": "appCode",
	                "id": 11
	            }]
	        }, {
	            "name": "UnreadCommand",
	            "fields": [{
	                "rule": "repeated",
	                "type": "UnreadTuple",
	                "name": "convs",
	                "id": 1
	            }]
	        }, {
	            "name": "ConvCommand",
	            "fields": [{
	                "rule": "repeated",
	                "type": "string",
	                "name": "m",
	                "id": 1
	            }, {
	                "rule": "optional",
	                "type": "bool",
	                "name": "transient",
	                "id": 2
	            }, {
	                "rule": "optional",
	                "type": "bool",
	                "name": "unique",
	                "id": 3
	            }, {
	                "rule": "optional",
	                "type": "string",
	                "name": "cid",
	                "id": 4
	            }, {
	                "rule": "optional",
	                "type": "string",
	                "name": "cdate",
	                "id": 5
	            }, {
	                "rule": "optional",
	                "type": "string",
	                "name": "initBy",
	                "id": 6
	            }, {
	                "rule": "optional",
	                "type": "string",
	                "name": "sort",
	                "id": 7
	            }, {
	                "rule": "optional",
	                "type": "int32",
	                "name": "limit",
	                "id": 8
	            }, {
	                "rule": "optional",
	                "type": "int32",
	                "name": "skip",
	                "id": 9
	            }, {
	                "rule": "optional",
	                "type": "int32",
	                "name": "flag",
	                "id": 10
	            }, {
	                "rule": "optional",
	                "type": "int32",
	                "name": "count",
	                "id": 11
	            }, {
	                "rule": "optional",
	                "type": "string",
	                "name": "udate",
	                "id": 12
	            }, {
	                "rule": "optional",
	                "type": "int64",
	                "name": "t",
	                "id": 13
	            }, {
	                "rule": "optional",
	                "type": "string",
	                "name": "n",
	                "id": 14
	            }, {
	                "rule": "optional",
	                "type": "string",
	                "name": "s",
	                "id": 15
	            }, {
	                "rule": "optional",
	                "type": "bool",
	                "name": "statusSub",
	                "id": 16
	            }, {
	                "rule": "optional",
	                "type": "bool",
	                "name": "statusPub",
	                "id": 17
	            }, {
	                "rule": "optional",
	                "type": "int32",
	                "name": "statusTTL",
	                "id": 18
	            }, {
	                "rule": "repeated",
	                "type": "string",
	                "name": "members",
	                "id": 19
	            }, {
	                "rule": "optional",
	                "type": "JsonObjectMessage",
	                "name": "results",
	                "id": 100
	            }, {
	                "rule": "optional",
	                "type": "JsonObjectMessage",
	                "name": "where",
	                "id": 101
	            }, {
	                "rule": "optional",
	                "type": "JsonObjectMessage",
	                "name": "attr",
	                "id": 103
	            }]
	        }, {
	            "name": "RoomCommand",
	            "fields": [{
	                "rule": "optional",
	                "type": "string",
	                "name": "roomId",
	                "id": 1
	            }, {
	                "rule": "optional",
	                "type": "string",
	                "name": "s",
	                "id": 2
	            }, {
	                "rule": "optional",
	                "type": "int64",
	                "name": "t",
	                "id": 3
	            }, {
	                "rule": "optional",
	                "type": "string",
	                "name": "n",
	                "id": 4
	            }, {
	                "rule": "optional",
	                "type": "bool",
	                "name": "transient",
	                "id": 5
	            }, {
	                "rule": "repeated",
	                "type": "string",
	                "name": "roomPeerIds",
	                "id": 6
	            }, {
	                "rule": "optional",
	                "type": "string",
	                "name": "byPeerId",
	                "id": 7
	            }]
	        }, {
	            "name": "LogsCommand",
	            "fields": [{
	                "rule": "optional",
	                "type": "string",
	                "name": "cid",
	                "id": 1
	            }, {
	                "rule": "optional",
	                "type": "int32",
	                "name": "l",
	                "id": 2
	            }, {
	                "rule": "optional",
	                "type": "int32",
	                "name": "limit",
	                "id": 3
	            }, {
	                "rule": "optional",
	                "type": "int64",
	                "name": "t",
	                "id": 4
	            }, {
	                "rule": "optional",
	                "type": "int64",
	                "name": "tt",
	                "id": 5
	            }, {
	                "rule": "optional",
	                "type": "string",
	                "name": "tmid",
	                "id": 6
	            }, {
	                "rule": "optional",
	                "type": "string",
	                "name": "mid",
	                "id": 7
	            }, {
	                "rule": "optional",
	                "type": "string",
	                "name": "checksum",
	                "id": 8
	            }, {
	                "rule": "optional",
	                "type": "bool",
	                "name": "stored",
	                "id": 9
	            }, {
	                "rule": "repeated",
	                "type": "LogItem",
	                "name": "logs",
	                "id": 105
	            }]
	        }, {
	            "name": "RcpCommand",
	            "fields": [{
	                "rule": "optional",
	                "type": "string",
	                "name": "id",
	                "id": 1
	            }, {
	                "rule": "optional",
	                "type": "string",
	                "name": "cid",
	                "id": 2
	            }, {
	                "rule": "optional",
	                "type": "int64",
	                "name": "t",
	                "id": 3
	            }]
	        }, {
	            "name": "ReadTuple",
	            "fields": [{
	                "rule": "required",
	                "type": "string",
	                "name": "cid",
	                "id": 1
	            }, {
	                "rule": "optional",
	                "type": "int64",
	                "name": "timestamp",
	                "id": 2
	            }, {
	                "rule": "optional",
	                "type": "string",
	                "name": "mid",
	                "id": 3
	            }]
	        }, {
	            "name": "ReadCommand",
	            "fields": [{
	                "rule": "optional",
	                "type": "string",
	                "name": "cid",
	                "id": 1
	            }, {
	                "rule": "repeated",
	                "type": "string",
	                "name": "cids",
	                "id": 2
	            }, {
	                "rule": "repeated",
	                "type": "ReadTuple",
	                "name": "convs",
	                "id": 3
	            }]
	        }, {
	            "name": "PresenceCommand",
	            "fields": [{
	                "rule": "optional",
	                "type": "StatusType",
	                "name": "status",
	                "id": 1
	            }, {
	                "rule": "repeated",
	                "type": "string",
	                "name": "sessionPeerIds",
	                "id": 2
	            }, {
	                "rule": "optional",
	                "type": "string",
	                "name": "cid",
	                "id": 3
	            }]
	        }, {
	            "name": "ReportCommand",
	            "fields": [{
	                "rule": "optional",
	                "type": "bool",
	                "name": "initiative",
	                "id": 1
	            }, {
	                "rule": "optional",
	                "type": "string",
	                "name": "type",
	                "id": 2
	            }, {
	                "rule": "optional",
	                "type": "string",
	                "name": "data",
	                "id": 3
	            }]
	        }, {
	            "name": "GenericCommand",
	            "fields": [{
	                "rule": "required",
	                "type": "CommandType",
	                "name": "cmd",
	                "id": 1
	            }, {
	                "rule": "optional",
	                "type": "OpType",
	                "name": "op",
	                "id": 2
	            }, {
	                "rule": "optional",
	                "type": "string",
	                "name": "appId",
	                "id": 3
	            }, {
	                "rule": "optional",
	                "type": "string",
	                "name": "peerId",
	                "id": 4
	            }, {
	                "rule": "optional",
	                "type": "int32",
	                "name": "i",
	                "id": 5
	            }, {
	                "rule": "optional",
	                "type": "string",
	                "name": "installationId",
	                "id": 6
	            }, {
	                "rule": "optional",
	                "type": "int32",
	                "name": "priority",
	                "id": 7
	            }, {
	                "rule": "optional",
	                "type": "LoginCommand",
	                "name": "loginMessage",
	                "id": 100
	            }, {
	                "rule": "optional",
	                "type": "DataCommand",
	                "name": "dataMessage",
	                "id": 101
	            }, {
	                "rule": "optional",
	                "type": "SessionCommand",
	                "name": "sessionMessage",
	                "id": 102
	            }, {
	                "rule": "optional",
	                "type": "ErrorCommand",
	                "name": "errorMessage",
	                "id": 103
	            }, {
	                "rule": "optional",
	                "type": "DirectCommand",
	                "name": "directMessage",
	                "id": 104
	            }, {
	                "rule": "optional",
	                "type": "AckCommand",
	                "name": "ackMessage",
	                "id": 105
	            }, {
	                "rule": "optional",
	                "type": "UnreadCommand",
	                "name": "unreadMessage",
	                "id": 106
	            }, {
	                "rule": "optional",
	                "type": "ReadCommand",
	                "name": "readMessage",
	                "id": 107
	            }, {
	                "rule": "optional",
	                "type": "RcpCommand",
	                "name": "rcpMessage",
	                "id": 108
	            }, {
	                "rule": "optional",
	                "type": "LogsCommand",
	                "name": "logsMessage",
	                "id": 109
	            }, {
	                "rule": "optional",
	                "type": "ConvCommand",
	                "name": "convMessage",
	                "id": 110
	            }, {
	                "rule": "optional",
	                "type": "RoomCommand",
	                "name": "roomMessage",
	                "id": 111
	            }, {
	                "rule": "optional",
	                "type": "PresenceCommand",
	                "name": "presenceMessage",
	                "id": 112
	            }, {
	                "rule": "optional",
	                "type": "ReportCommand",
	                "name": "reportMessage",
	                "id": 113
	            }]
	        }],
	        "enums": [{
	            "name": "CommandType",
	            "values": [{
	                "name": "session",
	                "id": 0
	            }, {
	                "name": "conv",
	                "id": 1
	            }, {
	                "name": "direct",
	                "id": 2
	            }, {
	                "name": "ack",
	                "id": 3
	            }, {
	                "name": "rcp",
	                "id": 4
	            }, {
	                "name": "unread",
	                "id": 5
	            }, {
	                "name": "logs",
	                "id": 6
	            }, {
	                "name": "error",
	                "id": 7
	            }, {
	                "name": "login",
	                "id": 8
	            }, {
	                "name": "data",
	                "id": 9
	            }, {
	                "name": "room",
	                "id": 10
	            }, {
	                "name": "read",
	                "id": 11
	            }, {
	                "name": "presence",
	                "id": 12
	            }, {
	                "name": "report",
	                "id": 13
	            }, {
	                "name": "echo",
	                "id": 14
	            }]
	        }, {
	            "name": "OpType",
	            "values": [{
	                "name": "open",
	                "id": 1
	            }, {
	                "name": "add",
	                "id": 2
	            }, {
	                "name": "remove",
	                "id": 3
	            }, {
	                "name": "close",
	                "id": 4
	            }, {
	                "name": "opened",
	                "id": 5
	            }, {
	                "name": "closed",
	                "id": 6
	            }, {
	                "name": "query",
	                "id": 7
	            }, {
	                "name": "query_result",
	                "id": 8
	            }, {
	                "name": "conflict",
	                "id": 9
	            }, {
	                "name": "added",
	                "id": 10
	            }, {
	                "name": "removed",
	                "id": 11
	            }, {
	                "name": "start",
	                "id": 30
	            }, {
	                "name": "started",
	                "id": 31
	            }, {
	                "name": "joined",
	                "id": 32
	            }, {
	                "name": "members_joined",
	                "id": 33
	            }, {
	                "name": "left",
	                "id": 39
	            }, {
	                "name": "members_left",
	                "id": 40
	            }, {
	                "name": "results",
	                "id": 42
	            }, {
	                "name": "count",
	                "id": 43
	            }, {
	                "name": "result",
	                "id": 44
	            }, {
	                "name": "update",
	                "id": 45
	            }, {
	                "name": "updated",
	                "id": 46
	            }, {
	                "name": "mute",
	                "id": 47
	            }, {
	                "name": "unmute",
	                "id": 48
	            }, {
	                "name": "status",
	                "id": 49
	            }, {
	                "name": "members",
	                "id": 50
	            }, {
	                "name": "join",
	                "id": 80
	            }, {
	                "name": "invite",
	                "id": 81
	            }, {
	                "name": "leave",
	                "id": 82
	            }, {
	                "name": "kick",
	                "id": 83
	            }, {
	                "name": "reject",
	                "id": 84
	            }, {
	                "name": "invited",
	                "id": 85
	            }, {
	                "name": "kicked",
	                "id": 86
	            }, {
	                "name": "upload",
	                "id": 100
	            }, {
	                "name": "uploaded",
	                "id": 101
	            }]
	        }, {
	            "name": "StatusType",
	            "values": [{
	                "name": "on",
	                "id": 1
	            }, {
	                "name": "off",
	                "id": 2
	            }]
	        }]
	    }).build();
	});

	var _messages$push_server = messageCompiled.push_server.messages;
	var JsonObjectMessage = _messages$push_server.JsonObjectMessage;
	var SessionCommand = _messages$push_server.SessionCommand;
	var DirectCommand = _messages$push_server.DirectCommand;
	var AckCommand = _messages$push_server.AckCommand;
	var ConvCommand = _messages$push_server.ConvCommand;
	var LogsCommand = _messages$push_server.LogsCommand;
	var ReadTuple = _messages$push_server.ReadTuple;
	var ReadCommand = _messages$push_server.ReadCommand;
	var GenericCommand = _messages$push_server.GenericCommand;
	var CommandType = _messages$push_server.CommandType;
	var OpType = _messages$push_server.OpType;

	var debug$6 = browser$1('LC:Connection');

	var COMMAND_TIMEOUT = 20000;

	var Connection = function (_WebSocketPlus) {
	  _inherits(Connection, _WebSocketPlus);

	  function Connection(getUrl, _ref) {
	    var format = _ref.format;
	    var version = _ref.version;

	    _classCallCheck(this, Connection);

	    debug$6('initializing Connection');
	    var protocolString = 'lc.' + format + '.' + version;

	    var _this = _possibleConstructorReturn(this, _WebSocketPlus.call(this, getUrl, protocolString));

	    _this._protocalFormat = format;
	    _this._commands = {};
	    _this._serialId = 0;
	    return _this;
	  }

	  Connection.prototype.send = function send(command) {
	    var _this2 = this;

	    var waitingForRespond = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

	    var serialId = void 0;
	    if (waitingForRespond) {
	      this._serialId += 1;
	      serialId = this._serialId;
	      command.i = serialId; // eslint-disable-line no-param-reassign
	    }
	    debug$6('↑', trim(command), 'sent');

	    var message = void 0;
	    if (this._protocalFormat === 'protobase64') {
	      message = command.toBase64();
	    } else if (command.toBuffer) {
	      message = command.toBuffer();
	    } else if (command.toArrayBuffer) {
	      message = command.toArrayBuffer();
	    }
	    if (!message) {
	      throw new TypeError(command + ' is not a GenericCommand');
	    }

	    _WebSocketPlus.prototype.send.call(this, message);

	    if (!waitingForRespond) {
	      return _Promise.resolve();
	    }
	    return new _Promise(function (resolve, reject) {
	      _this2._commands[serialId] = {
	        resolve: resolve,
	        reject: reject
	      };
	      setTimeout(function () {
	        if (_this2._commands[serialId]) {
	          debug$6('✗', trim(command), 'timeout');
	          reject(new Error('Command Timeout.'));
	          delete _this2._commands[serialId];
	        }
	      }, COMMAND_TIMEOUT);
	    });
	  };

	  Connection.prototype.handleMessage = function handleMessage(msg) {
	    var message = void 0;
	    try {
	      message = GenericCommand.decode(msg);
	      debug$6('↓', trim(message), 'received');
	    } catch (e) {
	      console.warn('Decode message failed', msg);
	    }
	    this.emit('allmessage', message);
	    var serialId = message.i;
	    if (serialId) {
	      if (this._commands[serialId]) {
	        if (message.cmd === CommandType.error) {
	          this._commands[serialId].reject(createError$2(message.errorMessage));
	        } else {
	          this._commands[serialId].resolve(message);
	        }
	        delete this._commands[serialId];
	      } else {
	        console.warn('Unexpected command received with serialId [' + serialId + '],\n         which have timed out or never been requested.');
	      }
	    } else if (message.cmd === CommandType.error) {
	      this.emit('error', createError$2(message.errorMessage));
	    } else {
	      this.emit('message', message);
	    }
	  };

	  Connection.prototype.ping = function ping() {
	    return this.send(new GenericCommand({
	      cmd: 'echo'
	    })).catch(function (error$$1) {
	      return console.warn('ping failed:', error$$1);
	    });
	  };

	  return Connection;
	}(WebSocketPlus);

	/* eslint-disable max-len */

	/**
	 * 插件接口
	 *
	 * 插件是由一个或多个扩展点的 Decorator 或 Middleware 组成的字典。SDK 的扩展点可以分为两类：
	 * <p>
	 * 第一类扩展点是类实例化之后的回调，包括 <code>Realtime</code>、<code>IMClient</code> 与 <code>Conversation</code>。这些扩展点可以通过一个同步的 Decorator 进行扩展。Decorator 接受一个对应的实例并对其进行一些操作。
	 * 特别的，由于注册自定义消息类这个需求特别的常用，额外定义一个 messageClasses 扩展点来做这件事情。
	 * <p>
	 * 第二类扩展点是在某些事件处理前、后可以注入逻辑的点。目前可扩展的点有 <code>beforeMessageParse</code>，<code>afterMessageParse</code>。这些扩展点可以通过一个异步的 Middleware 进行扩展。Middleware 接受一个对象，返回一个同类型对象或同类型对象的 Promise。
	 * <p>
	 * 如果使用了多个插件，这些 hook 会按照插件数组的顺序依次执行。前一个 Middleware 的返回值会作为参数传给后一个 Middleware。
	 *
	 * @interface Plugin
	 * @since 3.1.0
	 */

	/* eslint-enable max-len */

	/**
	 * 插件名称，用于在日志中显示异常的插件
	 *
	 * @name Plugin.name
	 * @type string
	 */

	/**
	 * 插件注册的消息类型
	 *
	 * @name Plugin.messageClasses
	 * @type AVMessage[]
	 */

	/**
	 * 在 Realtime 实例化后对其进行修饰。
	 * <p>
	 * 接受一个参数为 Realtime 实例。
	 *
	 * @name Plugin.onRealtimeCreate
	 * @type Function
	 */

	/**
	 * 在 IMClient 实例化后对其进行修饰。
	 * <p>
	 * 接受一个参数为 IMClient 实例。
	 *
	 * @name Plugin.onIMClientCreate
	 * @type Function
	 */

	/**
	 * 在 Conversation 实例化后对其进行修饰。
	 * <p>
	 * 接受一个参数为 Conversation 实例。
	 * 需要注意的是，该扩展点并不是在 <code>{@link IMClient#createConversation}</code> 方法创建成功后调用的 hook，
	 * 而是所有的 Conversation 实例化的时候（包括但不限于 query 时）调用的 hook。
	 *
	 * @name Plugin.onConversationCreate
	 * @type Function
	 */

	/**
	 * 在对消息进行 parse 之前，对原始消息进行修改。
	 * <p>
	 * 接受一个参数为原始消息，是某个消息 JSON 化（<code>message.toJSON()</code>）的返回值，一般是一个 JSON 对象。
	 * 该方法需要返回一个 JSON 对象。如果这个结果是异步得到的，也可以返回一个 Promise(fulfilled with a JSON)。
	 *
	 * @name Plugin.beforeMessageParse
	 * @type Function
	 */

	/**
	 * 在对消息进行 parse 之后，对消息实例进行修改。
	 * <p>
	 * 接受一个参数为消息实例，一般是一个已注册的 Message 类或其子类的实例。
	 * 该方法需要返回一个同类型的消息实例。如果这个结果是异步得到的，也可以返回一个 Promise。
	 *
	 * @name Plugin.beforeMessageParse
	 * @type Function
	 */

	var checkType = function checkType(middleware) {
	  return function (param) {
	    var constructor = param.constructor;

	    return _Promise.resolve(param).then(middleware).then(tap(function (result) {
	      if (result === undefined || result === null) {
	        // eslint-disable-next-line max-len
	        return console.warn('Middleware[' + (middleware._pluginName || 'anonymous plugin') + ':' + (middleware.name || 'anonymous middleware') + '] param/return types not match. It returns ' + result + ' while a ' + param.constructor.name + ' expected.');
	      }
	      if (!(result instanceof constructor)) {
	        // eslint-disable-next-line max-len
	        return console.warn('Middleware[' + (middleware._pluginName || 'anonymous plugin') + ':' + (middleware.name || 'anonymous middleware') + '] param/return types not match. It returns a ' + result.constructor.name + ' while a ' + param.constructor.name + ' expected.');
	      }
	      return 0;
	    }));
	  };
	};

	var applyDecorators = function applyDecorators(decorators, target) {
	  if (decorators) {
	    var _iteratorNormalCompletion = true;
	    var _didIteratorError = false;
	    var _iteratorError = undefined;

	    try {
	      for (var _iterator = _getIterator(decorators), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	        var decorator = _step.value;

	        try {
	          decorator(target);
	        } catch (error) {
	          if (decorator._pluginName) {
	            error.message += '[' + decorator._pluginName + ']';
	          }
	          throw error;
	        }
	      }
	    } catch (err) {
	      _didIteratorError = true;
	      _iteratorError = err;
	    } finally {
	      try {
	        if (!_iteratorNormalCompletion && _iterator.return) {
	          _iterator.return();
	        }
	      } finally {
	        if (_didIteratorError) {
	          throw _iteratorError;
	        }
	      }
	    }
	  }
	};

	var applyMiddlewares = function applyMiddlewares(middlewares) {
	  return function (target) {
	    return ensureArray(middlewares).reduce(function (previousPromise, middleware) {
	      return previousPromise.then(checkType(middleware)).catch(function (error) {
	        if (middleware._pluginName) {
	          // eslint-disable-next-line no-param-reassign
	          error.message += '[' + middleware._pluginName + ']';
	        }
	        throw error;
	      });
	    }, _Promise.resolve(target));
	  };
	};

	var es6_array_find = createCommonjsModule(function (module) {
	'use strict';
	// 22.1.3.8 Array.prototype.find(predicate, thisArg = undefined)
	var $export = _export
	  , $find   = _arrayMethods(5)
	  , KEY     = 'find'
	  , forced  = true;
	// Shouldn't skip holes
	if(KEY in [])Array(1)[KEY](function(){ forced = false; });
	$export($export.P + $export.F * forced, 'Array', {
	  find: function find(callbackfn/*, that = undefined */){
	    return $find(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
	  }
	});
	_addToUnscopables(KEY);
	});

	var find$2 = createCommonjsModule(function (module) {
	module.exports = _core.Array.find;
	});

	var find$1 = createCommonjsModule(function (module) {
	module.exports = { "default": find$2, __esModule: true };
	});

	var _Array$find = unwrapExports(find$1);

	var objectWithoutProperties = createCommonjsModule(function (module, exports) {
	"use strict";

	exports.__esModule = true;

	exports.default = function (obj, keys) {
	  var target = {};

	  for (var i in obj) {
	    if (keys.indexOf(i) >= 0) continue;
	    if (!Object.prototype.hasOwnProperty.call(obj, i)) continue;
	    target[i] = obj[i];
	  }

	  return target;
	};
	});

	var _objectWithoutProperties = unwrapExports(objectWithoutProperties);

	var _isPrototype = createCommonjsModule(function (module) {
	/** Used for built-in method references. */
	var objectProto = Object.prototype;

	/**
	 * Checks if `value` is likely a prototype object.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a prototype, else `false`.
	 */
	function isPrototype(value) {
	  var Ctor = value && value.constructor,
	      proto = (typeof Ctor == 'function' && Ctor.prototype) || objectProto;

	  return value === proto;
	}

	module.exports = isPrototype;
	});

	var _nativeKeys = createCommonjsModule(function (module) {
	var overArg = _overArg;

	/* Built-in method references for those with the same name as other `lodash` methods. */
	var nativeKeys = overArg(Object.keys, Object);

	module.exports = nativeKeys;
	});

	var _baseKeys = createCommonjsModule(function (module) {
	var isPrototype = _isPrototype,
	    nativeKeys = _nativeKeys;

	/** Used for built-in method references. */
	var objectProto = Object.prototype;

	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;

	/**
	 * The base implementation of `_.keys` which doesn't treat sparse arrays as dense.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @returns {Array} Returns the array of property names.
	 */
	function baseKeys(object) {
	  if (!isPrototype(object)) {
	    return nativeKeys(object);
	  }
	  var result = [];
	  for (var key in Object(object)) {
	    if (hasOwnProperty.call(object, key) && key != 'constructor') {
	      result.push(key);
	    }
	  }
	  return result;
	}

	module.exports = baseKeys;
	});

	var isObject$1 = createCommonjsModule(function (module) {
	/**
	 * Checks if `value` is the
	 * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
	 * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
	 * @example
	 *
	 * _.isObject({});
	 * // => true
	 *
	 * _.isObject([1, 2, 3]);
	 * // => true
	 *
	 * _.isObject(_.noop);
	 * // => true
	 *
	 * _.isObject(null);
	 * // => false
	 */
	function isObject(value) {
	  var type = typeof value;
	  return value != null && (type == 'object' || type == 'function');
	}

	module.exports = isObject;
	});

	var isFunction$1 = createCommonjsModule(function (module) {
	var isObject = isObject$1;

	/** `Object#toString` result references. */
	var funcTag = '[object Function]',
	    genTag = '[object GeneratorFunction]',
	    proxyTag = '[object Proxy]';

	/** Used for built-in method references. */
	var objectProto = Object.prototype;

	/**
	 * Used to resolve the
	 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
	 * of values.
	 */
	var objectToString = objectProto.toString;

	/**
	 * Checks if `value` is classified as a `Function` object.
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a function, else `false`.
	 * @example
	 *
	 * _.isFunction(_);
	 * // => true
	 *
	 * _.isFunction(/abc/);
	 * // => false
	 */
	function isFunction(value) {
	  // The use of `Object#toString` avoids issues with the `typeof` operator
	  // in Safari 9 which returns 'object' for typed array and other constructors.
	  var tag = isObject(value) ? objectToString.call(value) : '';
	  return tag == funcTag || tag == genTag || tag == proxyTag;
	}

	module.exports = isFunction;
	});

	var _freeGlobal = createCommonjsModule(function (module) {
	/** Detect free variable `global` from Node.js. */
	var freeGlobal = typeof commonjsGlobal == 'object' && commonjsGlobal && commonjsGlobal.Object === Object && commonjsGlobal;

	module.exports = freeGlobal;
	});

	var _root = createCommonjsModule(function (module) {
	var freeGlobal = _freeGlobal;

	/** Detect free variable `self`. */
	var freeSelf = typeof self == 'object' && self && self.Object === Object && self;

	/** Used as a reference to the global object. */
	var root = freeGlobal || freeSelf || Function('return this')();

	module.exports = root;
	});

	var _coreJsData = createCommonjsModule(function (module) {
	var root = _root;

	/** Used to detect overreaching core-js shims. */
	var coreJsData = root['__core-js_shared__'];

	module.exports = coreJsData;
	});

	var _isMasked = createCommonjsModule(function (module) {
	var coreJsData = _coreJsData;

	/** Used to detect methods masquerading as native. */
	var maskSrcKey = (function() {
	  var uid = /[^.]+$/.exec(coreJsData && coreJsData.keys && coreJsData.keys.IE_PROTO || '');
	  return uid ? ('Symbol(src)_1.' + uid) : '';
	}());

	/**
	 * Checks if `func` has its source masked.
	 *
	 * @private
	 * @param {Function} func The function to check.
	 * @returns {boolean} Returns `true` if `func` is masked, else `false`.
	 */
	function isMasked(func) {
	  return !!maskSrcKey && (maskSrcKey in func);
	}

	module.exports = isMasked;
	});

	var _toSource = createCommonjsModule(function (module) {
	/** Used for built-in method references. */
	var funcProto = Function.prototype;

	/** Used to resolve the decompiled source of functions. */
	var funcToString = funcProto.toString;

	/**
	 * Converts `func` to its source code.
	 *
	 * @private
	 * @param {Function} func The function to process.
	 * @returns {string} Returns the source code.
	 */
	function toSource(func) {
	  if (func != null) {
	    try {
	      return funcToString.call(func);
	    } catch (e) {}
	    try {
	      return (func + '');
	    } catch (e) {}
	  }
	  return '';
	}

	module.exports = toSource;
	});

	var _baseIsNative = createCommonjsModule(function (module) {
	var isFunction = isFunction$1,
	    isMasked = _isMasked,
	    isObject = isObject$1,
	    toSource = _toSource;

	/**
	 * Used to match `RegExp`
	 * [syntax characters](http://ecma-international.org/ecma-262/7.0/#sec-patterns).
	 */
	var reRegExpChar = /[\\^$.*+?()[\]{}|]/g;

	/** Used to detect host constructors (Safari). */
	var reIsHostCtor = /^\[object .+?Constructor\]$/;

	/** Used for built-in method references. */
	var funcProto = Function.prototype,
	    objectProto = Object.prototype;

	/** Used to resolve the decompiled source of functions. */
	var funcToString = funcProto.toString;

	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;

	/** Used to detect if a method is native. */
	var reIsNative = RegExp('^' +
	  funcToString.call(hasOwnProperty).replace(reRegExpChar, '\\$&')
	  .replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$'
	);

	/**
	 * The base implementation of `_.isNative` without bad shim checks.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a native function,
	 *  else `false`.
	 */
	function baseIsNative(value) {
	  if (!isObject(value) || isMasked(value)) {
	    return false;
	  }
	  var pattern = isFunction(value) ? reIsNative : reIsHostCtor;
	  return pattern.test(toSource(value));
	}

	module.exports = baseIsNative;
	});

	var _getValue = createCommonjsModule(function (module) {
	/**
	 * Gets the value at `key` of `object`.
	 *
	 * @private
	 * @param {Object} [object] The object to query.
	 * @param {string} key The key of the property to get.
	 * @returns {*} Returns the property value.
	 */
	function getValue(object, key) {
	  return object == null ? undefined : object[key];
	}

	module.exports = getValue;
	});

	var _getNative = createCommonjsModule(function (module) {
	var baseIsNative = _baseIsNative,
	    getValue = _getValue;

	/**
	 * Gets the native function at `key` of `object`.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @param {string} key The key of the method to get.
	 * @returns {*} Returns the function if it's native, else `undefined`.
	 */
	function getNative(object, key) {
	  var value = getValue(object, key);
	  return baseIsNative(value) ? value : undefined;
	}

	module.exports = getNative;
	});

	var _DataView = createCommonjsModule(function (module) {
	var getNative = _getNative,
	    root = _root;

	/* Built-in method references that are verified to be native. */
	var DataView = getNative(root, 'DataView');

	module.exports = DataView;
	});

	var _Map = createCommonjsModule(function (module) {
	var getNative = _getNative,
	    root = _root;

	/* Built-in method references that are verified to be native. */
	var Map = getNative(root, 'Map');

	module.exports = Map;
	});

	var _Promise$1 = createCommonjsModule(function (module) {
	var getNative = _getNative,
	    root = _root;

	/* Built-in method references that are verified to be native. */
	var Promise = getNative(root, 'Promise');

	module.exports = Promise;
	});

	var _Set$1 = createCommonjsModule(function (module) {
	var getNative = _getNative,
	    root = _root;

	/* Built-in method references that are verified to be native. */
	var Set = getNative(root, 'Set');

	module.exports = Set;
	});

	var _WeakMap$1 = createCommonjsModule(function (module) {
	var getNative = _getNative,
	    root = _root;

	/* Built-in method references that are verified to be native. */
	var WeakMap = getNative(root, 'WeakMap');

	module.exports = WeakMap;
	});

	var _baseGetTag = createCommonjsModule(function (module) {
	/** Used for built-in method references. */
	var objectProto = Object.prototype;

	/**
	 * Used to resolve the
	 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
	 * of values.
	 */
	var objectToString = objectProto.toString;

	/**
	 * The base implementation of `getTag`.
	 *
	 * @private
	 * @param {*} value The value to query.
	 * @returns {string} Returns the `toStringTag`.
	 */
	function baseGetTag(value) {
	  return objectToString.call(value);
	}

	module.exports = baseGetTag;
	});

	var _getTag = createCommonjsModule(function (module) {
	var DataView = _DataView,
	    Map = _Map,
	    Promise = _Promise$1,
	    Set = _Set$1,
	    WeakMap = _WeakMap$1,
	    baseGetTag = _baseGetTag,
	    toSource = _toSource;

	/** `Object#toString` result references. */
	var mapTag = '[object Map]',
	    objectTag = '[object Object]',
	    promiseTag = '[object Promise]',
	    setTag = '[object Set]',
	    weakMapTag = '[object WeakMap]';

	var dataViewTag = '[object DataView]';

	/** Used for built-in method references. */
	var objectProto = Object.prototype;

	/**
	 * Used to resolve the
	 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
	 * of values.
	 */
	var objectToString = objectProto.toString;

	/** Used to detect maps, sets, and weakmaps. */
	var dataViewCtorString = toSource(DataView),
	    mapCtorString = toSource(Map),
	    promiseCtorString = toSource(Promise),
	    setCtorString = toSource(Set),
	    weakMapCtorString = toSource(WeakMap);

	/**
	 * Gets the `toStringTag` of `value`.
	 *
	 * @private
	 * @param {*} value The value to query.
	 * @returns {string} Returns the `toStringTag`.
	 */
	var getTag = baseGetTag;

	// Fallback for data views, maps, sets, and weak maps in IE 11 and promises in Node.js < 6.
	if ((DataView && getTag(new DataView(new ArrayBuffer(1))) != dataViewTag) ||
	    (Map && getTag(new Map) != mapTag) ||
	    (Promise && getTag(Promise.resolve()) != promiseTag) ||
	    (Set && getTag(new Set) != setTag) ||
	    (WeakMap && getTag(new WeakMap) != weakMapTag)) {
	  getTag = function(value) {
	    var result = objectToString.call(value),
	        Ctor = result == objectTag ? value.constructor : undefined,
	        ctorString = Ctor ? toSource(Ctor) : undefined;

	    if (ctorString) {
	      switch (ctorString) {
	        case dataViewCtorString: return dataViewTag;
	        case mapCtorString: return mapTag;
	        case promiseCtorString: return promiseTag;
	        case setCtorString: return setTag;
	        case weakMapCtorString: return weakMapTag;
	      }
	    }
	    return result;
	  };
	}

	module.exports = getTag;
	});

	var _baseIsArguments = createCommonjsModule(function (module) {
	var isObjectLike$$1 = isObjectLike;

	/** `Object#toString` result references. */
	var argsTag = '[object Arguments]';

	/** Used for built-in method references. */
	var objectProto = Object.prototype;

	/**
	 * Used to resolve the
	 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
	 * of values.
	 */
	var objectToString = objectProto.toString;

	/**
	 * The base implementation of `_.isArguments`.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is an `arguments` object,
	 */
	function baseIsArguments(value) {
	  return isObjectLike$$1(value) && objectToString.call(value) == argsTag;
	}

	module.exports = baseIsArguments;
	});

	var isArguments = createCommonjsModule(function (module) {
	var baseIsArguments = _baseIsArguments,
	    isObjectLike$$1 = isObjectLike;

	/** Used for built-in method references. */
	var objectProto = Object.prototype;

	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;

	/** Built-in value references. */
	var propertyIsEnumerable = objectProto.propertyIsEnumerable;

	/**
	 * Checks if `value` is likely an `arguments` object.
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is an `arguments` object,
	 *  else `false`.
	 * @example
	 *
	 * _.isArguments(function() { return arguments; }());
	 * // => true
	 *
	 * _.isArguments([1, 2, 3]);
	 * // => false
	 */
	var isArguments = baseIsArguments(function() { return arguments; }()) ? baseIsArguments : function(value) {
	  return isObjectLike$$1(value) && hasOwnProperty.call(value, 'callee') &&
	    !propertyIsEnumerable.call(value, 'callee');
	};

	module.exports = isArguments;
	});

	var isArray$2 = createCommonjsModule(function (module) {
	/**
	 * Checks if `value` is classified as an `Array` object.
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is an array, else `false`.
	 * @example
	 *
	 * _.isArray([1, 2, 3]);
	 * // => true
	 *
	 * _.isArray(document.body.children);
	 * // => false
	 *
	 * _.isArray('abc');
	 * // => false
	 *
	 * _.isArray(_.noop);
	 * // => false
	 */
	var isArray = Array.isArray;

	module.exports = isArray;
	});

	var isLength = createCommonjsModule(function (module) {
	/** Used as references for various `Number` constants. */
	var MAX_SAFE_INTEGER = 9007199254740991;

	/**
	 * Checks if `value` is a valid array-like length.
	 *
	 * **Note:** This method is loosely based on
	 * [`ToLength`](http://ecma-international.org/ecma-262/7.0/#sec-tolength).
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
	 * @example
	 *
	 * _.isLength(3);
	 * // => true
	 *
	 * _.isLength(Number.MIN_VALUE);
	 * // => false
	 *
	 * _.isLength(Infinity);
	 * // => false
	 *
	 * _.isLength('3');
	 * // => false
	 */
	function isLength(value) {
	  return typeof value == 'number' &&
	    value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
	}

	module.exports = isLength;
	});

	var isArrayLike = createCommonjsModule(function (module) {
	var isFunction = isFunction$1,
	    isLength$$1 = isLength;

	/**
	 * Checks if `value` is array-like. A value is considered array-like if it's
	 * not a function and has a `value.length` that's an integer greater than or
	 * equal to `0` and less than or equal to `Number.MAX_SAFE_INTEGER`.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is array-like, else `false`.
	 * @example
	 *
	 * _.isArrayLike([1, 2, 3]);
	 * // => true
	 *
	 * _.isArrayLike(document.body.children);
	 * // => true
	 *
	 * _.isArrayLike('abc');
	 * // => true
	 *
	 * _.isArrayLike(_.noop);
	 * // => false
	 */
	function isArrayLike(value) {
	  return value != null && isLength$$1(value.length) && !isFunction(value);
	}

	module.exports = isArrayLike;
	});

	var stubFalse = createCommonjsModule(function (module) {
	/**
	 * This method returns `false`.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.13.0
	 * @category Util
	 * @returns {boolean} Returns `false`.
	 * @example
	 *
	 * _.times(2, _.stubFalse);
	 * // => [false, false]
	 */
	function stubFalse() {
	  return false;
	}

	module.exports = stubFalse;
	});

	var isBuffer = createCommonjsModule(function (module, exports) {
	var root = _root,
	    stubFalse$$1 = stubFalse;

	/** Detect free variable `exports`. */
	var freeExports = typeof exports == 'object' && exports && !exports.nodeType && exports;

	/** Detect free variable `module`. */
	var freeModule = freeExports && typeof module == 'object' && module && !module.nodeType && module;

	/** Detect the popular CommonJS extension `module.exports`. */
	var moduleExports = freeModule && freeModule.exports === freeExports;

	/** Built-in value references. */
	var Buffer = moduleExports ? root.Buffer : undefined;

	/* Built-in method references for those with the same name as other `lodash` methods. */
	var nativeIsBuffer = Buffer ? Buffer.isBuffer : undefined;

	/**
	 * Checks if `value` is a buffer.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.3.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a buffer, else `false`.
	 * @example
	 *
	 * _.isBuffer(new Buffer(2));
	 * // => true
	 *
	 * _.isBuffer(new Uint8Array(2));
	 * // => false
	 */
	var isBuffer = nativeIsBuffer || stubFalse$$1;

	module.exports = isBuffer;
	});

	var _baseIsTypedArray = createCommonjsModule(function (module) {
	var isLength$$1 = isLength,
	    isObjectLike$$1 = isObjectLike;

	/** `Object#toString` result references. */
	var argsTag = '[object Arguments]',
	    arrayTag = '[object Array]',
	    boolTag = '[object Boolean]',
	    dateTag = '[object Date]',
	    errorTag = '[object Error]',
	    funcTag = '[object Function]',
	    mapTag = '[object Map]',
	    numberTag = '[object Number]',
	    objectTag = '[object Object]',
	    regexpTag = '[object RegExp]',
	    setTag = '[object Set]',
	    stringTag = '[object String]',
	    weakMapTag = '[object WeakMap]';

	var arrayBufferTag = '[object ArrayBuffer]',
	    dataViewTag = '[object DataView]',
	    float32Tag = '[object Float32Array]',
	    float64Tag = '[object Float64Array]',
	    int8Tag = '[object Int8Array]',
	    int16Tag = '[object Int16Array]',
	    int32Tag = '[object Int32Array]',
	    uint8Tag = '[object Uint8Array]',
	    uint8ClampedTag = '[object Uint8ClampedArray]',
	    uint16Tag = '[object Uint16Array]',
	    uint32Tag = '[object Uint32Array]';

	/** Used to identify `toStringTag` values of typed arrays. */
	var typedArrayTags = {};
	typedArrayTags[float32Tag] = typedArrayTags[float64Tag] =
	typedArrayTags[int8Tag] = typedArrayTags[int16Tag] =
	typedArrayTags[int32Tag] = typedArrayTags[uint8Tag] =
	typedArrayTags[uint8ClampedTag] = typedArrayTags[uint16Tag] =
	typedArrayTags[uint32Tag] = true;
	typedArrayTags[argsTag] = typedArrayTags[arrayTag] =
	typedArrayTags[arrayBufferTag] = typedArrayTags[boolTag] =
	typedArrayTags[dataViewTag] = typedArrayTags[dateTag] =
	typedArrayTags[errorTag] = typedArrayTags[funcTag] =
	typedArrayTags[mapTag] = typedArrayTags[numberTag] =
	typedArrayTags[objectTag] = typedArrayTags[regexpTag] =
	typedArrayTags[setTag] = typedArrayTags[stringTag] =
	typedArrayTags[weakMapTag] = false;

	/** Used for built-in method references. */
	var objectProto = Object.prototype;

	/**
	 * Used to resolve the
	 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
	 * of values.
	 */
	var objectToString = objectProto.toString;

	/**
	 * The base implementation of `_.isTypedArray` without Node.js optimizations.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a typed array, else `false`.
	 */
	function baseIsTypedArray(value) {
	  return isObjectLike$$1(value) &&
	    isLength$$1(value.length) && !!typedArrayTags[objectToString.call(value)];
	}

	module.exports = baseIsTypedArray;
	});

	var _baseUnary = createCommonjsModule(function (module) {
	/**
	 * The base implementation of `_.unary` without support for storing metadata.
	 *
	 * @private
	 * @param {Function} func The function to cap arguments for.
	 * @returns {Function} Returns the new capped function.
	 */
	function baseUnary(func) {
	  return function(value) {
	    return func(value);
	  };
	}

	module.exports = baseUnary;
	});

	var _nodeUtil = createCommonjsModule(function (module, exports) {
	var freeGlobal = _freeGlobal;

	/** Detect free variable `exports`. */
	var freeExports = typeof exports == 'object' && exports && !exports.nodeType && exports;

	/** Detect free variable `module`. */
	var freeModule = freeExports && typeof module == 'object' && module && !module.nodeType && module;

	/** Detect the popular CommonJS extension `module.exports`. */
	var moduleExports = freeModule && freeModule.exports === freeExports;

	/** Detect free variable `process` from Node.js. */
	var freeProcess = moduleExports && freeGlobal.process;

	/** Used to access faster Node.js helpers. */
	var nodeUtil = (function() {
	  try {
	    return freeProcess && freeProcess.binding('util');
	  } catch (e) {}
	}());

	module.exports = nodeUtil;
	});

	var isTypedArray = createCommonjsModule(function (module) {
	var baseIsTypedArray = _baseIsTypedArray,
	    baseUnary = _baseUnary,
	    nodeUtil = _nodeUtil;

	/* Node.js helper references. */
	var nodeIsTypedArray = nodeUtil && nodeUtil.isTypedArray;

	/**
	 * Checks if `value` is classified as a typed array.
	 *
	 * @static
	 * @memberOf _
	 * @since 3.0.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a typed array, else `false`.
	 * @example
	 *
	 * _.isTypedArray(new Uint8Array);
	 * // => true
	 *
	 * _.isTypedArray([]);
	 * // => false
	 */
	var isTypedArray = nodeIsTypedArray ? baseUnary(nodeIsTypedArray) : baseIsTypedArray;

	module.exports = isTypedArray;
	});

	var isEmpty$1 = createCommonjsModule(function (module) {
	var baseKeys = _baseKeys,
	    getTag = _getTag,
	    isArguments$$1 = isArguments,
	    isArray = isArray$2,
	    isArrayLike$$1 = isArrayLike,
	    isBuffer$$1 = isBuffer,
	    isPrototype = _isPrototype,
	    isTypedArray$$1 = isTypedArray;

	/** `Object#toString` result references. */
	var mapTag = '[object Map]',
	    setTag = '[object Set]';

	/** Used for built-in method references. */
	var objectProto = Object.prototype;

	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;

	/**
	 * Checks if `value` is an empty object, collection, map, or set.
	 *
	 * Objects are considered empty if they have no own enumerable string keyed
	 * properties.
	 *
	 * Array-like values such as `arguments` objects, arrays, buffers, strings, or
	 * jQuery-like collections are considered empty if they have a `length` of `0`.
	 * Similarly, maps and sets are considered empty if they have a `size` of `0`.
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is empty, else `false`.
	 * @example
	 *
	 * _.isEmpty(null);
	 * // => true
	 *
	 * _.isEmpty(true);
	 * // => true
	 *
	 * _.isEmpty(1);
	 * // => true
	 *
	 * _.isEmpty([1, 2, 3]);
	 * // => false
	 *
	 * _.isEmpty({ 'a': 1 });
	 * // => false
	 */
	function isEmpty(value) {
	  if (isArrayLike$$1(value) &&
	      (isArray(value) || typeof value == 'string' || typeof value.splice == 'function' ||
	        isBuffer$$1(value) || isTypedArray$$1(value) || isArguments$$1(value))) {
	    return !value.length;
	  }
	  var tag = getTag(value);
	  if (tag == mapTag || tag == setTag) {
	    return !value.size;
	  }
	  if (isPrototype(value)) {
	    return !baseKeys(value).length;
	  }
	  for (var key in value) {
	    if (hasOwnProperty.call(value, key)) {
	      return false;
	    }
	  }
	  return true;
	}

	module.exports = isEmpty;
	});

	var _listCacheClear = createCommonjsModule(function (module) {
	/**
	 * Removes all key-value entries from the list cache.
	 *
	 * @private
	 * @name clear
	 * @memberOf ListCache
	 */
	function listCacheClear() {
	  this.__data__ = [];
	  this.size = 0;
	}

	module.exports = listCacheClear;
	});

	var eq = createCommonjsModule(function (module) {
	/**
	 * Performs a
	 * [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
	 * comparison between two values to determine if they are equivalent.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to compare.
	 * @param {*} other The other value to compare.
	 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
	 * @example
	 *
	 * var object = { 'a': 1 };
	 * var other = { 'a': 1 };
	 *
	 * _.eq(object, object);
	 * // => true
	 *
	 * _.eq(object, other);
	 * // => false
	 *
	 * _.eq('a', 'a');
	 * // => true
	 *
	 * _.eq('a', Object('a'));
	 * // => false
	 *
	 * _.eq(NaN, NaN);
	 * // => true
	 */
	function eq(value, other) {
	  return value === other || (value !== value && other !== other);
	}

	module.exports = eq;
	});

	var _assocIndexOf = createCommonjsModule(function (module) {
	var eq$$1 = eq;

	/**
	 * Gets the index at which the `key` is found in `array` of key-value pairs.
	 *
	 * @private
	 * @param {Array} array The array to inspect.
	 * @param {*} key The key to search for.
	 * @returns {number} Returns the index of the matched value, else `-1`.
	 */
	function assocIndexOf(array, key) {
	  var length = array.length;
	  while (length--) {
	    if (eq$$1(array[length][0], key)) {
	      return length;
	    }
	  }
	  return -1;
	}

	module.exports = assocIndexOf;
	});

	var _listCacheDelete = createCommonjsModule(function (module) {
	var assocIndexOf = _assocIndexOf;

	/** Used for built-in method references. */
	var arrayProto = Array.prototype;

	/** Built-in value references. */
	var splice = arrayProto.splice;

	/**
	 * Removes `key` and its value from the list cache.
	 *
	 * @private
	 * @name delete
	 * @memberOf ListCache
	 * @param {string} key The key of the value to remove.
	 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
	 */
	function listCacheDelete(key) {
	  var data = this.__data__,
	      index = assocIndexOf(data, key);

	  if (index < 0) {
	    return false;
	  }
	  var lastIndex = data.length - 1;
	  if (index == lastIndex) {
	    data.pop();
	  } else {
	    splice.call(data, index, 1);
	  }
	  --this.size;
	  return true;
	}

	module.exports = listCacheDelete;
	});

	var _listCacheGet = createCommonjsModule(function (module) {
	var assocIndexOf = _assocIndexOf;

	/**
	 * Gets the list cache value for `key`.
	 *
	 * @private
	 * @name get
	 * @memberOf ListCache
	 * @param {string} key The key of the value to get.
	 * @returns {*} Returns the entry value.
	 */
	function listCacheGet(key) {
	  var data = this.__data__,
	      index = assocIndexOf(data, key);

	  return index < 0 ? undefined : data[index][1];
	}

	module.exports = listCacheGet;
	});

	var _listCacheHas = createCommonjsModule(function (module) {
	var assocIndexOf = _assocIndexOf;

	/**
	 * Checks if a list cache value for `key` exists.
	 *
	 * @private
	 * @name has
	 * @memberOf ListCache
	 * @param {string} key The key of the entry to check.
	 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
	 */
	function listCacheHas(key) {
	  return assocIndexOf(this.__data__, key) > -1;
	}

	module.exports = listCacheHas;
	});

	var _listCacheSet = createCommonjsModule(function (module) {
	var assocIndexOf = _assocIndexOf;

	/**
	 * Sets the list cache `key` to `value`.
	 *
	 * @private
	 * @name set
	 * @memberOf ListCache
	 * @param {string} key The key of the value to set.
	 * @param {*} value The value to set.
	 * @returns {Object} Returns the list cache instance.
	 */
	function listCacheSet(key, value) {
	  var data = this.__data__,
	      index = assocIndexOf(data, key);

	  if (index < 0) {
	    ++this.size;
	    data.push([key, value]);
	  } else {
	    data[index][1] = value;
	  }
	  return this;
	}

	module.exports = listCacheSet;
	});

	var _ListCache = createCommonjsModule(function (module) {
	var listCacheClear = _listCacheClear,
	    listCacheDelete = _listCacheDelete,
	    listCacheGet = _listCacheGet,
	    listCacheHas = _listCacheHas,
	    listCacheSet = _listCacheSet;

	/**
	 * Creates an list cache object.
	 *
	 * @private
	 * @constructor
	 * @param {Array} [entries] The key-value pairs to cache.
	 */
	function ListCache(entries) {
	  var index = -1,
	      length = entries ? entries.length : 0;

	  this.clear();
	  while (++index < length) {
	    var entry = entries[index];
	    this.set(entry[0], entry[1]);
	  }
	}

	// Add methods to `ListCache`.
	ListCache.prototype.clear = listCacheClear;
	ListCache.prototype['delete'] = listCacheDelete;
	ListCache.prototype.get = listCacheGet;
	ListCache.prototype.has = listCacheHas;
	ListCache.prototype.set = listCacheSet;

	module.exports = ListCache;
	});

	var _stackClear = createCommonjsModule(function (module) {
	var ListCache = _ListCache;

	/**
	 * Removes all key-value entries from the stack.
	 *
	 * @private
	 * @name clear
	 * @memberOf Stack
	 */
	function stackClear() {
	  this.__data__ = new ListCache;
	  this.size = 0;
	}

	module.exports = stackClear;
	});

	var _stackDelete = createCommonjsModule(function (module) {
	/**
	 * Removes `key` and its value from the stack.
	 *
	 * @private
	 * @name delete
	 * @memberOf Stack
	 * @param {string} key The key of the value to remove.
	 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
	 */
	function stackDelete(key) {
	  var data = this.__data__,
	      result = data['delete'](key);

	  this.size = data.size;
	  return result;
	}

	module.exports = stackDelete;
	});

	var _stackGet = createCommonjsModule(function (module) {
	/**
	 * Gets the stack value for `key`.
	 *
	 * @private
	 * @name get
	 * @memberOf Stack
	 * @param {string} key The key of the value to get.
	 * @returns {*} Returns the entry value.
	 */
	function stackGet(key) {
	  return this.__data__.get(key);
	}

	module.exports = stackGet;
	});

	var _stackHas = createCommonjsModule(function (module) {
	/**
	 * Checks if a stack value for `key` exists.
	 *
	 * @private
	 * @name has
	 * @memberOf Stack
	 * @param {string} key The key of the entry to check.
	 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
	 */
	function stackHas(key) {
	  return this.__data__.has(key);
	}

	module.exports = stackHas;
	});

	var _nativeCreate = createCommonjsModule(function (module) {
	var getNative = _getNative;

	/* Built-in method references that are verified to be native. */
	var nativeCreate = getNative(Object, 'create');

	module.exports = nativeCreate;
	});

	var _hashClear = createCommonjsModule(function (module) {
	var nativeCreate = _nativeCreate;

	/**
	 * Removes all key-value entries from the hash.
	 *
	 * @private
	 * @name clear
	 * @memberOf Hash
	 */
	function hashClear() {
	  this.__data__ = nativeCreate ? nativeCreate(null) : {};
	  this.size = 0;
	}

	module.exports = hashClear;
	});

	var _hashDelete = createCommonjsModule(function (module) {
	/**
	 * Removes `key` and its value from the hash.
	 *
	 * @private
	 * @name delete
	 * @memberOf Hash
	 * @param {Object} hash The hash to modify.
	 * @param {string} key The key of the value to remove.
	 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
	 */
	function hashDelete(key) {
	  var result = this.has(key) && delete this.__data__[key];
	  this.size -= result ? 1 : 0;
	  return result;
	}

	module.exports = hashDelete;
	});

	var _hashGet = createCommonjsModule(function (module) {
	var nativeCreate = _nativeCreate;

	/** Used to stand-in for `undefined` hash values. */
	var HASH_UNDEFINED = '__lodash_hash_undefined__';

	/** Used for built-in method references. */
	var objectProto = Object.prototype;

	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;

	/**
	 * Gets the hash value for `key`.
	 *
	 * @private
	 * @name get
	 * @memberOf Hash
	 * @param {string} key The key of the value to get.
	 * @returns {*} Returns the entry value.
	 */
	function hashGet(key) {
	  var data = this.__data__;
	  if (nativeCreate) {
	    var result = data[key];
	    return result === HASH_UNDEFINED ? undefined : result;
	  }
	  return hasOwnProperty.call(data, key) ? data[key] : undefined;
	}

	module.exports = hashGet;
	});

	var _hashHas = createCommonjsModule(function (module) {
	var nativeCreate = _nativeCreate;

	/** Used for built-in method references. */
	var objectProto = Object.prototype;

	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;

	/**
	 * Checks if a hash value for `key` exists.
	 *
	 * @private
	 * @name has
	 * @memberOf Hash
	 * @param {string} key The key of the entry to check.
	 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
	 */
	function hashHas(key) {
	  var data = this.__data__;
	  return nativeCreate ? data[key] !== undefined : hasOwnProperty.call(data, key);
	}

	module.exports = hashHas;
	});

	var _hashSet = createCommonjsModule(function (module) {
	var nativeCreate = _nativeCreate;

	/** Used to stand-in for `undefined` hash values. */
	var HASH_UNDEFINED = '__lodash_hash_undefined__';

	/**
	 * Sets the hash `key` to `value`.
	 *
	 * @private
	 * @name set
	 * @memberOf Hash
	 * @param {string} key The key of the value to set.
	 * @param {*} value The value to set.
	 * @returns {Object} Returns the hash instance.
	 */
	function hashSet(key, value) {
	  var data = this.__data__;
	  this.size += this.has(key) ? 0 : 1;
	  data[key] = (nativeCreate && value === undefined) ? HASH_UNDEFINED : value;
	  return this;
	}

	module.exports = hashSet;
	});

	var _Hash = createCommonjsModule(function (module) {
	var hashClear = _hashClear,
	    hashDelete = _hashDelete,
	    hashGet = _hashGet,
	    hashHas = _hashHas,
	    hashSet = _hashSet;

	/**
	 * Creates a hash object.
	 *
	 * @private
	 * @constructor
	 * @param {Array} [entries] The key-value pairs to cache.
	 */
	function Hash(entries) {
	  var index = -1,
	      length = entries ? entries.length : 0;

	  this.clear();
	  while (++index < length) {
	    var entry = entries[index];
	    this.set(entry[0], entry[1]);
	  }
	}

	// Add methods to `Hash`.
	Hash.prototype.clear = hashClear;
	Hash.prototype['delete'] = hashDelete;
	Hash.prototype.get = hashGet;
	Hash.prototype.has = hashHas;
	Hash.prototype.set = hashSet;

	module.exports = Hash;
	});

	var _mapCacheClear = createCommonjsModule(function (module) {
	var Hash = _Hash,
	    ListCache = _ListCache,
	    Map = _Map;

	/**
	 * Removes all key-value entries from the map.
	 *
	 * @private
	 * @name clear
	 * @memberOf MapCache
	 */
	function mapCacheClear() {
	  this.size = 0;
	  this.__data__ = {
	    'hash': new Hash,
	    'map': new (Map || ListCache),
	    'string': new Hash
	  };
	}

	module.exports = mapCacheClear;
	});

	var _isKeyable = createCommonjsModule(function (module) {
	/**
	 * Checks if `value` is suitable for use as unique object key.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is suitable, else `false`.
	 */
	function isKeyable(value) {
	  var type = typeof value;
	  return (type == 'string' || type == 'number' || type == 'symbol' || type == 'boolean')
	    ? (value !== '__proto__')
	    : (value === null);
	}

	module.exports = isKeyable;
	});

	var _getMapData = createCommonjsModule(function (module) {
	var isKeyable = _isKeyable;

	/**
	 * Gets the data for `map`.
	 *
	 * @private
	 * @param {Object} map The map to query.
	 * @param {string} key The reference key.
	 * @returns {*} Returns the map data.
	 */
	function getMapData(map, key) {
	  var data = map.__data__;
	  return isKeyable(key)
	    ? data[typeof key == 'string' ? 'string' : 'hash']
	    : data.map;
	}

	module.exports = getMapData;
	});

	var _mapCacheDelete = createCommonjsModule(function (module) {
	var getMapData = _getMapData;

	/**
	 * Removes `key` and its value from the map.
	 *
	 * @private
	 * @name delete
	 * @memberOf MapCache
	 * @param {string} key The key of the value to remove.
	 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
	 */
	function mapCacheDelete(key) {
	  var result = getMapData(this, key)['delete'](key);
	  this.size -= result ? 1 : 0;
	  return result;
	}

	module.exports = mapCacheDelete;
	});

	var _mapCacheGet = createCommonjsModule(function (module) {
	var getMapData = _getMapData;

	/**
	 * Gets the map value for `key`.
	 *
	 * @private
	 * @name get
	 * @memberOf MapCache
	 * @param {string} key The key of the value to get.
	 * @returns {*} Returns the entry value.
	 */
	function mapCacheGet(key) {
	  return getMapData(this, key).get(key);
	}

	module.exports = mapCacheGet;
	});

	var _mapCacheHas = createCommonjsModule(function (module) {
	var getMapData = _getMapData;

	/**
	 * Checks if a map value for `key` exists.
	 *
	 * @private
	 * @name has
	 * @memberOf MapCache
	 * @param {string} key The key of the entry to check.
	 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
	 */
	function mapCacheHas(key) {
	  return getMapData(this, key).has(key);
	}

	module.exports = mapCacheHas;
	});

	var _mapCacheSet = createCommonjsModule(function (module) {
	var getMapData = _getMapData;

	/**
	 * Sets the map `key` to `value`.
	 *
	 * @private
	 * @name set
	 * @memberOf MapCache
	 * @param {string} key The key of the value to set.
	 * @param {*} value The value to set.
	 * @returns {Object} Returns the map cache instance.
	 */
	function mapCacheSet(key, value) {
	  var data = getMapData(this, key),
	      size = data.size;

	  data.set(key, value);
	  this.size += data.size == size ? 0 : 1;
	  return this;
	}

	module.exports = mapCacheSet;
	});

	var _MapCache = createCommonjsModule(function (module) {
	var mapCacheClear = _mapCacheClear,
	    mapCacheDelete = _mapCacheDelete,
	    mapCacheGet = _mapCacheGet,
	    mapCacheHas = _mapCacheHas,
	    mapCacheSet = _mapCacheSet;

	/**
	 * Creates a map cache object to store key-value pairs.
	 *
	 * @private
	 * @constructor
	 * @param {Array} [entries] The key-value pairs to cache.
	 */
	function MapCache(entries) {
	  var index = -1,
	      length = entries ? entries.length : 0;

	  this.clear();
	  while (++index < length) {
	    var entry = entries[index];
	    this.set(entry[0], entry[1]);
	  }
	}

	// Add methods to `MapCache`.
	MapCache.prototype.clear = mapCacheClear;
	MapCache.prototype['delete'] = mapCacheDelete;
	MapCache.prototype.get = mapCacheGet;
	MapCache.prototype.has = mapCacheHas;
	MapCache.prototype.set = mapCacheSet;

	module.exports = MapCache;
	});

	var _stackSet = createCommonjsModule(function (module) {
	var ListCache = _ListCache,
	    Map = _Map,
	    MapCache = _MapCache;

	/** Used as the size to enable large array optimizations. */
	var LARGE_ARRAY_SIZE = 200;

	/**
	 * Sets the stack `key` to `value`.
	 *
	 * @private
	 * @name set
	 * @memberOf Stack
	 * @param {string} key The key of the value to set.
	 * @param {*} value The value to set.
	 * @returns {Object} Returns the stack cache instance.
	 */
	function stackSet(key, value) {
	  var data = this.__data__;
	  if (data instanceof ListCache) {
	    var pairs = data.__data__;
	    if (!Map || (pairs.length < LARGE_ARRAY_SIZE - 1)) {
	      pairs.push([key, value]);
	      this.size = ++data.size;
	      return this;
	    }
	    data = this.__data__ = new MapCache(pairs);
	  }
	  data.set(key, value);
	  this.size = data.size;
	  return this;
	}

	module.exports = stackSet;
	});

	var _Stack = createCommonjsModule(function (module) {
	var ListCache = _ListCache,
	    stackClear = _stackClear,
	    stackDelete = _stackDelete,
	    stackGet = _stackGet,
	    stackHas = _stackHas,
	    stackSet = _stackSet;

	/**
	 * Creates a stack cache object to store key-value pairs.
	 *
	 * @private
	 * @constructor
	 * @param {Array} [entries] The key-value pairs to cache.
	 */
	function Stack(entries) {
	  var data = this.__data__ = new ListCache(entries);
	  this.size = data.size;
	}

	// Add methods to `Stack`.
	Stack.prototype.clear = stackClear;
	Stack.prototype['delete'] = stackDelete;
	Stack.prototype.get = stackGet;
	Stack.prototype.has = stackHas;
	Stack.prototype.set = stackSet;

	module.exports = Stack;
	});

	var _arrayEach = createCommonjsModule(function (module) {
	/**
	 * A specialized version of `_.forEach` for arrays without support for
	 * iteratee shorthands.
	 *
	 * @private
	 * @param {Array} [array] The array to iterate over.
	 * @param {Function} iteratee The function invoked per iteration.
	 * @returns {Array} Returns `array`.
	 */
	function arrayEach(array, iteratee) {
	  var index = -1,
	      length = array ? array.length : 0;

	  while (++index < length) {
	    if (iteratee(array[index], index, array) === false) {
	      break;
	    }
	  }
	  return array;
	}

	module.exports = arrayEach;
	});

	var _defineProperty$1 = createCommonjsModule(function (module) {
	var getNative = _getNative;

	var defineProperty = (function() {
	  try {
	    var func = getNative(Object, 'defineProperty');
	    func({}, '', {});
	    return func;
	  } catch (e) {}
	}());

	module.exports = defineProperty;
	});

	var _baseAssignValue = createCommonjsModule(function (module) {
	var defineProperty = _defineProperty$1;

	/**
	 * The base implementation of `assignValue` and `assignMergeValue` without
	 * value checks.
	 *
	 * @private
	 * @param {Object} object The object to modify.
	 * @param {string} key The key of the property to assign.
	 * @param {*} value The value to assign.
	 */
	function baseAssignValue(object, key, value) {
	  if (key == '__proto__' && defineProperty) {
	    defineProperty(object, key, {
	      'configurable': true,
	      'enumerable': true,
	      'value': value,
	      'writable': true
	    });
	  } else {
	    object[key] = value;
	  }
	}

	module.exports = baseAssignValue;
	});

	var _assignValue = createCommonjsModule(function (module) {
	var baseAssignValue = _baseAssignValue,
	    eq$$1 = eq;

	/** Used for built-in method references. */
	var objectProto = Object.prototype;

	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;

	/**
	 * Assigns `value` to `key` of `object` if the existing value is not equivalent
	 * using [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
	 * for equality comparisons.
	 *
	 * @private
	 * @param {Object} object The object to modify.
	 * @param {string} key The key of the property to assign.
	 * @param {*} value The value to assign.
	 */
	function assignValue(object, key, value) {
	  var objValue = object[key];
	  if (!(hasOwnProperty.call(object, key) && eq$$1(objValue, value)) ||
	      (value === undefined && !(key in object))) {
	    baseAssignValue(object, key, value);
	  }
	}

	module.exports = assignValue;
	});

	var _copyObject = createCommonjsModule(function (module) {
	var assignValue = _assignValue,
	    baseAssignValue = _baseAssignValue;

	/**
	 * Copies properties of `source` to `object`.
	 *
	 * @private
	 * @param {Object} source The object to copy properties from.
	 * @param {Array} props The property identifiers to copy.
	 * @param {Object} [object={}] The object to copy properties to.
	 * @param {Function} [customizer] The function to customize copied values.
	 * @returns {Object} Returns `object`.
	 */
	function copyObject(source, props, object, customizer) {
	  var isNew = !object;
	  object || (object = {});

	  var index = -1,
	      length = props.length;

	  while (++index < length) {
	    var key = props[index];

	    var newValue = customizer
	      ? customizer(object[key], source[key], key, object, source)
	      : undefined;

	    if (newValue === undefined) {
	      newValue = source[key];
	    }
	    if (isNew) {
	      baseAssignValue(object, key, newValue);
	    } else {
	      assignValue(object, key, newValue);
	    }
	  }
	  return object;
	}

	module.exports = copyObject;
	});

	var _baseTimes = createCommonjsModule(function (module) {
	/**
	 * The base implementation of `_.times` without support for iteratee shorthands
	 * or max array length checks.
	 *
	 * @private
	 * @param {number} n The number of times to invoke `iteratee`.
	 * @param {Function} iteratee The function invoked per iteration.
	 * @returns {Array} Returns the array of results.
	 */
	function baseTimes(n, iteratee) {
	  var index = -1,
	      result = Array(n);

	  while (++index < n) {
	    result[index] = iteratee(index);
	  }
	  return result;
	}

	module.exports = baseTimes;
	});

	var _isIndex = createCommonjsModule(function (module) {
	/** Used as references for various `Number` constants. */
	var MAX_SAFE_INTEGER = 9007199254740991;

	/** Used to detect unsigned integer values. */
	var reIsUint = /^(?:0|[1-9]\d*)$/;

	/**
	 * Checks if `value` is a valid array-like index.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @param {number} [length=MAX_SAFE_INTEGER] The upper bounds of a valid index.
	 * @returns {boolean} Returns `true` if `value` is a valid index, else `false`.
	 */
	function isIndex(value, length) {
	  length = length == null ? MAX_SAFE_INTEGER : length;
	  return !!length &&
	    (typeof value == 'number' || reIsUint.test(value)) &&
	    (value > -1 && value % 1 == 0 && value < length);
	}

	module.exports = isIndex;
	});

	var _arrayLikeKeys = createCommonjsModule(function (module) {
	var baseTimes = _baseTimes,
	    isArguments$$1 = isArguments,
	    isArray = isArray$2,
	    isBuffer$$1 = isBuffer,
	    isIndex = _isIndex,
	    isTypedArray$$1 = isTypedArray;

	/** Used for built-in method references. */
	var objectProto = Object.prototype;

	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;

	/**
	 * Creates an array of the enumerable property names of the array-like `value`.
	 *
	 * @private
	 * @param {*} value The value to query.
	 * @param {boolean} inherited Specify returning inherited property names.
	 * @returns {Array} Returns the array of property names.
	 */
	function arrayLikeKeys(value, inherited) {
	  var isArr = isArray(value),
	      isArg = !isArr && isArguments$$1(value),
	      isBuff = !isArr && !isArg && isBuffer$$1(value),
	      isType = !isArr && !isArg && !isBuff && isTypedArray$$1(value),
	      skipIndexes = isArr || isArg || isBuff || isType,
	      result = skipIndexes ? baseTimes(value.length, String) : [],
	      length = result.length;

	  for (var key in value) {
	    if ((inherited || hasOwnProperty.call(value, key)) &&
	        !(skipIndexes && (
	           // Safari 9 has enumerable `arguments.length` in strict mode.
	           key == 'length' ||
	           // Node.js 0.10 has enumerable non-index properties on buffers.
	           (isBuff && (key == 'offset' || key == 'parent')) ||
	           // PhantomJS 2 has enumerable non-index properties on typed arrays.
	           (isType && (key == 'buffer' || key == 'byteLength' || key == 'byteOffset')) ||
	           // Skip index properties.
	           isIndex(key, length)
	        ))) {
	      result.push(key);
	    }
	  }
	  return result;
	}

	module.exports = arrayLikeKeys;
	});

	var keys$4 = createCommonjsModule(function (module) {
	var arrayLikeKeys = _arrayLikeKeys,
	    baseKeys = _baseKeys,
	    isArrayLike$$1 = isArrayLike;

	/**
	 * Creates an array of the own enumerable property names of `object`.
	 *
	 * **Note:** Non-object values are coerced to objects. See the
	 * [ES spec](http://ecma-international.org/ecma-262/7.0/#sec-object.keys)
	 * for more details.
	 *
	 * @static
	 * @since 0.1.0
	 * @memberOf _
	 * @category Object
	 * @param {Object} object The object to query.
	 * @returns {Array} Returns the array of property names.
	 * @example
	 *
	 * function Foo() {
	 *   this.a = 1;
	 *   this.b = 2;
	 * }
	 *
	 * Foo.prototype.c = 3;
	 *
	 * _.keys(new Foo);
	 * // => ['a', 'b'] (iteration order is not guaranteed)
	 *
	 * _.keys('hi');
	 * // => ['0', '1']
	 */
	function keys(object) {
	  return isArrayLike$$1(object) ? arrayLikeKeys(object) : baseKeys(object);
	}

	module.exports = keys;
	});

	var _baseAssign = createCommonjsModule(function (module) {
	var copyObject = _copyObject,
	    keys = keys$4;

	/**
	 * The base implementation of `_.assign` without support for multiple sources
	 * or `customizer` functions.
	 *
	 * @private
	 * @param {Object} object The destination object.
	 * @param {Object} source The source object.
	 * @returns {Object} Returns `object`.
	 */
	function baseAssign(object, source) {
	  return object && copyObject(source, keys(source), object);
	}

	module.exports = baseAssign;
	});

	var _cloneBuffer = createCommonjsModule(function (module, exports) {
	var root = _root;

	/** Detect free variable `exports`. */
	var freeExports = typeof exports == 'object' && exports && !exports.nodeType && exports;

	/** Detect free variable `module`. */
	var freeModule = freeExports && typeof module == 'object' && module && !module.nodeType && module;

	/** Detect the popular CommonJS extension `module.exports`. */
	var moduleExports = freeModule && freeModule.exports === freeExports;

	/** Built-in value references. */
	var Buffer = moduleExports ? root.Buffer : undefined,
	    allocUnsafe = Buffer ? Buffer.allocUnsafe : undefined;

	/**
	 * Creates a clone of  `buffer`.
	 *
	 * @private
	 * @param {Buffer} buffer The buffer to clone.
	 * @param {boolean} [isDeep] Specify a deep clone.
	 * @returns {Buffer} Returns the cloned buffer.
	 */
	function cloneBuffer(buffer, isDeep) {
	  if (isDeep) {
	    return buffer.slice();
	  }
	  var length = buffer.length,
	      result = allocUnsafe ? allocUnsafe(length) : new buffer.constructor(length);

	  buffer.copy(result);
	  return result;
	}

	module.exports = cloneBuffer;
	});

	var _copyArray = createCommonjsModule(function (module) {
	/**
	 * Copies the values of `source` to `array`.
	 *
	 * @private
	 * @param {Array} source The array to copy values from.
	 * @param {Array} [array=[]] The array to copy values to.
	 * @returns {Array} Returns `array`.
	 */
	function copyArray(source, array) {
	  var index = -1,
	      length = source.length;

	  array || (array = Array(length));
	  while (++index < length) {
	    array[index] = source[index];
	  }
	  return array;
	}

	module.exports = copyArray;
	});

	var stubArray = createCommonjsModule(function (module) {
	/**
	 * This method returns a new empty array.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.13.0
	 * @category Util
	 * @returns {Array} Returns the new empty array.
	 * @example
	 *
	 * var arrays = _.times(2, _.stubArray);
	 *
	 * console.log(arrays);
	 * // => [[], []]
	 *
	 * console.log(arrays[0] === arrays[1]);
	 * // => false
	 */
	function stubArray() {
	  return [];
	}

	module.exports = stubArray;
	});

	var _getSymbols = createCommonjsModule(function (module) {
	var overArg = _overArg,
	    stubArray$$1 = stubArray;

	/* Built-in method references for those with the same name as other `lodash` methods. */
	var nativeGetSymbols = Object.getOwnPropertySymbols;

	/**
	 * Creates an array of the own enumerable symbol properties of `object`.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @returns {Array} Returns the array of symbols.
	 */
	var getSymbols = nativeGetSymbols ? overArg(nativeGetSymbols, Object) : stubArray$$1;

	module.exports = getSymbols;
	});

	var _copySymbols = createCommonjsModule(function (module) {
	var copyObject = _copyObject,
	    getSymbols = _getSymbols;

	/**
	 * Copies own symbol properties of `source` to `object`.
	 *
	 * @private
	 * @param {Object} source The object to copy symbols from.
	 * @param {Object} [object={}] The object to copy symbols to.
	 * @returns {Object} Returns `object`.
	 */
	function copySymbols(source, object) {
	  return copyObject(source, getSymbols(source), object);
	}

	module.exports = copySymbols;
	});

	var _arrayPush = createCommonjsModule(function (module) {
	/**
	 * Appends the elements of `values` to `array`.
	 *
	 * @private
	 * @param {Array} array The array to modify.
	 * @param {Array} values The values to append.
	 * @returns {Array} Returns `array`.
	 */
	function arrayPush(array, values) {
	  var index = -1,
	      length = values.length,
	      offset = array.length;

	  while (++index < length) {
	    array[offset + index] = values[index];
	  }
	  return array;
	}

	module.exports = arrayPush;
	});

	var _baseGetAllKeys = createCommonjsModule(function (module) {
	var arrayPush = _arrayPush,
	    isArray = isArray$2;

	/**
	 * The base implementation of `getAllKeys` and `getAllKeysIn` which uses
	 * `keysFunc` and `symbolsFunc` to get the enumerable property names and
	 * symbols of `object`.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @param {Function} keysFunc The function to get the keys of `object`.
	 * @param {Function} symbolsFunc The function to get the symbols of `object`.
	 * @returns {Array} Returns the array of property names and symbols.
	 */
	function baseGetAllKeys(object, keysFunc, symbolsFunc) {
	  var result = keysFunc(object);
	  return isArray(object) ? result : arrayPush(result, symbolsFunc(object));
	}

	module.exports = baseGetAllKeys;
	});

	var _getAllKeys = createCommonjsModule(function (module) {
	var baseGetAllKeys = _baseGetAllKeys,
	    getSymbols = _getSymbols,
	    keys = keys$4;

	/**
	 * Creates an array of own enumerable property names and symbols of `object`.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @returns {Array} Returns the array of property names and symbols.
	 */
	function getAllKeys(object) {
	  return baseGetAllKeys(object, keys, getSymbols);
	}

	module.exports = getAllKeys;
	});

	var _initCloneArray = createCommonjsModule(function (module) {
	/** Used for built-in method references. */
	var objectProto = Object.prototype;

	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;

	/**
	 * Initializes an array clone.
	 *
	 * @private
	 * @param {Array} array The array to clone.
	 * @returns {Array} Returns the initialized clone.
	 */
	function initCloneArray(array) {
	  var length = array.length,
	      result = array.constructor(length);

	  // Add properties assigned by `RegExp#exec`.
	  if (length && typeof array[0] == 'string' && hasOwnProperty.call(array, 'index')) {
	    result.index = array.index;
	    result.input = array.input;
	  }
	  return result;
	}

	module.exports = initCloneArray;
	});

	var _Uint8Array = createCommonjsModule(function (module) {
	var root = _root;

	/** Built-in value references. */
	var Uint8Array = root.Uint8Array;

	module.exports = Uint8Array;
	});

	var _cloneArrayBuffer = createCommonjsModule(function (module) {
	var Uint8Array = _Uint8Array;

	/**
	 * Creates a clone of `arrayBuffer`.
	 *
	 * @private
	 * @param {ArrayBuffer} arrayBuffer The array buffer to clone.
	 * @returns {ArrayBuffer} Returns the cloned array buffer.
	 */
	function cloneArrayBuffer(arrayBuffer) {
	  var result = new arrayBuffer.constructor(arrayBuffer.byteLength);
	  new Uint8Array(result).set(new Uint8Array(arrayBuffer));
	  return result;
	}

	module.exports = cloneArrayBuffer;
	});

	var _cloneDataView = createCommonjsModule(function (module) {
	var cloneArrayBuffer = _cloneArrayBuffer;

	/**
	 * Creates a clone of `dataView`.
	 *
	 * @private
	 * @param {Object} dataView The data view to clone.
	 * @param {boolean} [isDeep] Specify a deep clone.
	 * @returns {Object} Returns the cloned data view.
	 */
	function cloneDataView(dataView, isDeep) {
	  var buffer = isDeep ? cloneArrayBuffer(dataView.buffer) : dataView.buffer;
	  return new dataView.constructor(buffer, dataView.byteOffset, dataView.byteLength);
	}

	module.exports = cloneDataView;
	});

	var _addMapEntry = createCommonjsModule(function (module) {
	/**
	 * Adds the key-value `pair` to `map`.
	 *
	 * @private
	 * @param {Object} map The map to modify.
	 * @param {Array} pair The key-value pair to add.
	 * @returns {Object} Returns `map`.
	 */
	function addMapEntry(map, pair) {
	  // Don't return `map.set` because it's not chainable in IE 11.
	  map.set(pair[0], pair[1]);
	  return map;
	}

	module.exports = addMapEntry;
	});

	var _arrayReduce = createCommonjsModule(function (module) {
	/**
	 * A specialized version of `_.reduce` for arrays without support for
	 * iteratee shorthands.
	 *
	 * @private
	 * @param {Array} [array] The array to iterate over.
	 * @param {Function} iteratee The function invoked per iteration.
	 * @param {*} [accumulator] The initial value.
	 * @param {boolean} [initAccum] Specify using the first element of `array` as
	 *  the initial value.
	 * @returns {*} Returns the accumulated value.
	 */
	function arrayReduce(array, iteratee, accumulator, initAccum) {
	  var index = -1,
	      length = array ? array.length : 0;

	  if (initAccum && length) {
	    accumulator = array[++index];
	  }
	  while (++index < length) {
	    accumulator = iteratee(accumulator, array[index], index, array);
	  }
	  return accumulator;
	}

	module.exports = arrayReduce;
	});

	var _mapToArray = createCommonjsModule(function (module) {
	/**
	 * Converts `map` to its key-value pairs.
	 *
	 * @private
	 * @param {Object} map The map to convert.
	 * @returns {Array} Returns the key-value pairs.
	 */
	function mapToArray(map) {
	  var index = -1,
	      result = Array(map.size);

	  map.forEach(function(value, key) {
	    result[++index] = [key, value];
	  });
	  return result;
	}

	module.exports = mapToArray;
	});

	var _cloneMap = createCommonjsModule(function (module) {
	var addMapEntry = _addMapEntry,
	    arrayReduce = _arrayReduce,
	    mapToArray = _mapToArray;

	/**
	 * Creates a clone of `map`.
	 *
	 * @private
	 * @param {Object} map The map to clone.
	 * @param {Function} cloneFunc The function to clone values.
	 * @param {boolean} [isDeep] Specify a deep clone.
	 * @returns {Object} Returns the cloned map.
	 */
	function cloneMap(map, isDeep, cloneFunc) {
	  var array = isDeep ? cloneFunc(mapToArray(map), true) : mapToArray(map);
	  return arrayReduce(array, addMapEntry, new map.constructor);
	}

	module.exports = cloneMap;
	});

	var _cloneRegExp = createCommonjsModule(function (module) {
	/** Used to match `RegExp` flags from their coerced string values. */
	var reFlags = /\w*$/;

	/**
	 * Creates a clone of `regexp`.
	 *
	 * @private
	 * @param {Object} regexp The regexp to clone.
	 * @returns {Object} Returns the cloned regexp.
	 */
	function cloneRegExp(regexp) {
	  var result = new regexp.constructor(regexp.source, reFlags.exec(regexp));
	  result.lastIndex = regexp.lastIndex;
	  return result;
	}

	module.exports = cloneRegExp;
	});

	var _addSetEntry = createCommonjsModule(function (module) {
	/**
	 * Adds `value` to `set`.
	 *
	 * @private
	 * @param {Object} set The set to modify.
	 * @param {*} value The value to add.
	 * @returns {Object} Returns `set`.
	 */
	function addSetEntry(set, value) {
	  // Don't return `set.add` because it's not chainable in IE 11.
	  set.add(value);
	  return set;
	}

	module.exports = addSetEntry;
	});

	var _setToArray = createCommonjsModule(function (module) {
	/**
	 * Converts `set` to an array of its values.
	 *
	 * @private
	 * @param {Object} set The set to convert.
	 * @returns {Array} Returns the values.
	 */
	function setToArray(set) {
	  var index = -1,
	      result = Array(set.size);

	  set.forEach(function(value) {
	    result[++index] = value;
	  });
	  return result;
	}

	module.exports = setToArray;
	});

	var _cloneSet = createCommonjsModule(function (module) {
	var addSetEntry = _addSetEntry,
	    arrayReduce = _arrayReduce,
	    setToArray = _setToArray;

	/**
	 * Creates a clone of `set`.
	 *
	 * @private
	 * @param {Object} set The set to clone.
	 * @param {Function} cloneFunc The function to clone values.
	 * @param {boolean} [isDeep] Specify a deep clone.
	 * @returns {Object} Returns the cloned set.
	 */
	function cloneSet(set, isDeep, cloneFunc) {
	  var array = isDeep ? cloneFunc(setToArray(set), true) : setToArray(set);
	  return arrayReduce(array, addSetEntry, new set.constructor);
	}

	module.exports = cloneSet;
	});

	var _Symbol$1 = createCommonjsModule(function (module) {
	var root = _root;

	/** Built-in value references. */
	var Symbol = root.Symbol;

	module.exports = Symbol;
	});

	var _cloneSymbol = createCommonjsModule(function (module) {
	var Symbol = _Symbol$1;

	/** Used to convert symbols to primitives and strings. */
	var symbolProto = Symbol ? Symbol.prototype : undefined,
	    symbolValueOf = symbolProto ? symbolProto.valueOf : undefined;

	/**
	 * Creates a clone of the `symbol` object.
	 *
	 * @private
	 * @param {Object} symbol The symbol object to clone.
	 * @returns {Object} Returns the cloned symbol object.
	 */
	function cloneSymbol(symbol) {
	  return symbolValueOf ? Object(symbolValueOf.call(symbol)) : {};
	}

	module.exports = cloneSymbol;
	});

	var _cloneTypedArray = createCommonjsModule(function (module) {
	var cloneArrayBuffer = _cloneArrayBuffer;

	/**
	 * Creates a clone of `typedArray`.
	 *
	 * @private
	 * @param {Object} typedArray The typed array to clone.
	 * @param {boolean} [isDeep] Specify a deep clone.
	 * @returns {Object} Returns the cloned typed array.
	 */
	function cloneTypedArray(typedArray, isDeep) {
	  var buffer = isDeep ? cloneArrayBuffer(typedArray.buffer) : typedArray.buffer;
	  return new typedArray.constructor(buffer, typedArray.byteOffset, typedArray.length);
	}

	module.exports = cloneTypedArray;
	});

	var _initCloneByTag = createCommonjsModule(function (module) {
	var cloneArrayBuffer = _cloneArrayBuffer,
	    cloneDataView = _cloneDataView,
	    cloneMap = _cloneMap,
	    cloneRegExp = _cloneRegExp,
	    cloneSet = _cloneSet,
	    cloneSymbol = _cloneSymbol,
	    cloneTypedArray = _cloneTypedArray;

	/** `Object#toString` result references. */
	var boolTag = '[object Boolean]',
	    dateTag = '[object Date]',
	    mapTag = '[object Map]',
	    numberTag = '[object Number]',
	    regexpTag = '[object RegExp]',
	    setTag = '[object Set]',
	    stringTag = '[object String]',
	    symbolTag = '[object Symbol]';

	var arrayBufferTag = '[object ArrayBuffer]',
	    dataViewTag = '[object DataView]',
	    float32Tag = '[object Float32Array]',
	    float64Tag = '[object Float64Array]',
	    int8Tag = '[object Int8Array]',
	    int16Tag = '[object Int16Array]',
	    int32Tag = '[object Int32Array]',
	    uint8Tag = '[object Uint8Array]',
	    uint8ClampedTag = '[object Uint8ClampedArray]',
	    uint16Tag = '[object Uint16Array]',
	    uint32Tag = '[object Uint32Array]';

	/**
	 * Initializes an object clone based on its `toStringTag`.
	 *
	 * **Note:** This function only supports cloning values with tags of
	 * `Boolean`, `Date`, `Error`, `Number`, `RegExp`, or `String`.
	 *
	 * @private
	 * @param {Object} object The object to clone.
	 * @param {string} tag The `toStringTag` of the object to clone.
	 * @param {Function} cloneFunc The function to clone values.
	 * @param {boolean} [isDeep] Specify a deep clone.
	 * @returns {Object} Returns the initialized clone.
	 */
	function initCloneByTag(object, tag, cloneFunc, isDeep) {
	  var Ctor = object.constructor;
	  switch (tag) {
	    case arrayBufferTag:
	      return cloneArrayBuffer(object);

	    case boolTag:
	    case dateTag:
	      return new Ctor(+object);

	    case dataViewTag:
	      return cloneDataView(object, isDeep);

	    case float32Tag: case float64Tag:
	    case int8Tag: case int16Tag: case int32Tag:
	    case uint8Tag: case uint8ClampedTag: case uint16Tag: case uint32Tag:
	      return cloneTypedArray(object, isDeep);

	    case mapTag:
	      return cloneMap(object, isDeep, cloneFunc);

	    case numberTag:
	    case stringTag:
	      return new Ctor(object);

	    case regexpTag:
	      return cloneRegExp(object);

	    case setTag:
	      return cloneSet(object, isDeep, cloneFunc);

	    case symbolTag:
	      return cloneSymbol(object);
	  }
	}

	module.exports = initCloneByTag;
	});

	var _baseCreate = createCommonjsModule(function (module) {
	var isObject = isObject$1;

	/** Built-in value references. */
	var objectCreate = Object.create;

	/**
	 * The base implementation of `_.create` without support for assigning
	 * properties to the created object.
	 *
	 * @private
	 * @param {Object} proto The object to inherit from.
	 * @returns {Object} Returns the new object.
	 */
	var baseCreate = (function() {
	  function object() {}
	  return function(proto) {
	    if (!isObject(proto)) {
	      return {};
	    }
	    if (objectCreate) {
	      return objectCreate(proto);
	    }
	    object.prototype = proto;
	    var result = new object;
	    object.prototype = undefined;
	    return result;
	  };
	}());

	module.exports = baseCreate;
	});

	var _initCloneObject = createCommonjsModule(function (module) {
	var baseCreate = _baseCreate,
	    getPrototype = _getPrototype,
	    isPrototype = _isPrototype;

	/**
	 * Initializes an object clone.
	 *
	 * @private
	 * @param {Object} object The object to clone.
	 * @returns {Object} Returns the initialized clone.
	 */
	function initCloneObject(object) {
	  return (typeof object.constructor == 'function' && !isPrototype(object))
	    ? baseCreate(getPrototype(object))
	    : {};
	}

	module.exports = initCloneObject;
	});

	var _baseClone = createCommonjsModule(function (module) {
	var Stack = _Stack,
	    arrayEach = _arrayEach,
	    assignValue = _assignValue,
	    baseAssign = _baseAssign,
	    cloneBuffer = _cloneBuffer,
	    copyArray = _copyArray,
	    copySymbols = _copySymbols,
	    getAllKeys = _getAllKeys,
	    getTag = _getTag,
	    initCloneArray = _initCloneArray,
	    initCloneByTag = _initCloneByTag,
	    initCloneObject = _initCloneObject,
	    isArray = isArray$2,
	    isBuffer$$1 = isBuffer,
	    isObject = isObject$1,
	    keys = keys$4;

	/** `Object#toString` result references. */
	var argsTag = '[object Arguments]',
	    arrayTag = '[object Array]',
	    boolTag = '[object Boolean]',
	    dateTag = '[object Date]',
	    errorTag = '[object Error]',
	    funcTag = '[object Function]',
	    genTag = '[object GeneratorFunction]',
	    mapTag = '[object Map]',
	    numberTag = '[object Number]',
	    objectTag = '[object Object]',
	    regexpTag = '[object RegExp]',
	    setTag = '[object Set]',
	    stringTag = '[object String]',
	    symbolTag = '[object Symbol]',
	    weakMapTag = '[object WeakMap]';

	var arrayBufferTag = '[object ArrayBuffer]',
	    dataViewTag = '[object DataView]',
	    float32Tag = '[object Float32Array]',
	    float64Tag = '[object Float64Array]',
	    int8Tag = '[object Int8Array]',
	    int16Tag = '[object Int16Array]',
	    int32Tag = '[object Int32Array]',
	    uint8Tag = '[object Uint8Array]',
	    uint8ClampedTag = '[object Uint8ClampedArray]',
	    uint16Tag = '[object Uint16Array]',
	    uint32Tag = '[object Uint32Array]';

	/** Used to identify `toStringTag` values supported by `_.clone`. */
	var cloneableTags = {};
	cloneableTags[argsTag] = cloneableTags[arrayTag] =
	cloneableTags[arrayBufferTag] = cloneableTags[dataViewTag] =
	cloneableTags[boolTag] = cloneableTags[dateTag] =
	cloneableTags[float32Tag] = cloneableTags[float64Tag] =
	cloneableTags[int8Tag] = cloneableTags[int16Tag] =
	cloneableTags[int32Tag] = cloneableTags[mapTag] =
	cloneableTags[numberTag] = cloneableTags[objectTag] =
	cloneableTags[regexpTag] = cloneableTags[setTag] =
	cloneableTags[stringTag] = cloneableTags[symbolTag] =
	cloneableTags[uint8Tag] = cloneableTags[uint8ClampedTag] =
	cloneableTags[uint16Tag] = cloneableTags[uint32Tag] = true;
	cloneableTags[errorTag] = cloneableTags[funcTag] =
	cloneableTags[weakMapTag] = false;

	/**
	 * The base implementation of `_.clone` and `_.cloneDeep` which tracks
	 * traversed objects.
	 *
	 * @private
	 * @param {*} value The value to clone.
	 * @param {boolean} [isDeep] Specify a deep clone.
	 * @param {boolean} [isFull] Specify a clone including symbols.
	 * @param {Function} [customizer] The function to customize cloning.
	 * @param {string} [key] The key of `value`.
	 * @param {Object} [object] The parent object of `value`.
	 * @param {Object} [stack] Tracks traversed objects and their clone counterparts.
	 * @returns {*} Returns the cloned value.
	 */
	function baseClone(value, isDeep, isFull, customizer, key, object, stack) {
	  var result;
	  if (customizer) {
	    result = object ? customizer(value, key, object, stack) : customizer(value);
	  }
	  if (result !== undefined) {
	    return result;
	  }
	  if (!isObject(value)) {
	    return value;
	  }
	  var isArr = isArray(value);
	  if (isArr) {
	    result = initCloneArray(value);
	    if (!isDeep) {
	      return copyArray(value, result);
	    }
	  } else {
	    var tag = getTag(value),
	        isFunc = tag == funcTag || tag == genTag;

	    if (isBuffer$$1(value)) {
	      return cloneBuffer(value, isDeep);
	    }
	    if (tag == objectTag || tag == argsTag || (isFunc && !object)) {
	      result = initCloneObject(isFunc ? {} : value);
	      if (!isDeep) {
	        return copySymbols(value, baseAssign(result, value));
	      }
	    } else {
	      if (!cloneableTags[tag]) {
	        return object ? value : {};
	      }
	      result = initCloneByTag(value, tag, baseClone, isDeep);
	    }
	  }
	  // Check for circular references and return its corresponding clone.
	  stack || (stack = new Stack);
	  var stacked = stack.get(value);
	  if (stacked) {
	    return stacked;
	  }
	  stack.set(value, result);

	  var props = isArr ? undefined : (isFull ? getAllKeys : keys)(value);
	  arrayEach(props || value, function(subValue, key) {
	    if (props) {
	      key = subValue;
	      subValue = value[key];
	    }
	    // Recursively populate clone (susceptible to call stack limits).
	    assignValue(result, key, baseClone(subValue, isDeep, isFull, customizer, key, value, stack));
	  });
	  return result;
	}

	module.exports = baseClone;
	});

	var cloneDeep = createCommonjsModule(function (module) {
	var baseClone = _baseClone;

	/**
	 * This method is like `_.clone` except that it recursively clones `value`.
	 *
	 * @static
	 * @memberOf _
	 * @since 1.0.0
	 * @category Lang
	 * @param {*} value The value to recursively clone.
	 * @returns {*} Returns the deep cloned value.
	 * @see _.clone
	 * @example
	 *
	 * var objects = [{ 'a': 1 }, { 'b': 2 }];
	 *
	 * var deep = _.cloneDeep(objects);
	 * console.log(deep[0] === objects[0]);
	 * // => false
	 */
	function cloneDeep(value) {
	  return baseClone(value, true, true);
	}

	module.exports = cloneDeep;
	});

	var _extends = createCommonjsModule(function (module, exports) {
	"use strict";

	exports.__esModule = true;

	var _assign = assign$1;

	var _assign2 = _interopRequireDefault(_assign);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = _assign2.default || function (target) {
	  for (var i = 1; i < arguments.length; i++) {
	    var source = arguments[i];

	    for (var key in source) {
	      if (Object.prototype.hasOwnProperty.call(source, key)) {
	        target[key] = source[key];
	      }
	    }
	  }

	  return target;
	};
	});

	var _extends$1 = unwrapExports(_extends);

	var now = createCommonjsModule(function (module) {
	var root = _root;

	/**
	 * Gets the timestamp of the number of milliseconds that have elapsed since
	 * the Unix epoch (1 January 1970 00:00:00 UTC).
	 *
	 * @static
	 * @memberOf _
	 * @since 2.4.0
	 * @category Date
	 * @returns {number} Returns the timestamp.
	 * @example
	 *
	 * _.defer(function(stamp) {
	 *   console.log(_.now() - stamp);
	 * }, _.now());
	 * // => Logs the number of milliseconds it took for the deferred invocation.
	 */
	var now = function() {
	  return root.Date.now();
	};

	module.exports = now;
	});

	var isSymbol = createCommonjsModule(function (module) {
	var isObjectLike$$1 = isObjectLike;

	/** `Object#toString` result references. */
	var symbolTag = '[object Symbol]';

	/** Used for built-in method references. */
	var objectProto = Object.prototype;

	/**
	 * Used to resolve the
	 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
	 * of values.
	 */
	var objectToString = objectProto.toString;

	/**
	 * Checks if `value` is classified as a `Symbol` primitive or object.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a symbol, else `false`.
	 * @example
	 *
	 * _.isSymbol(Symbol.iterator);
	 * // => true
	 *
	 * _.isSymbol('abc');
	 * // => false
	 */
	function isSymbol(value) {
	  return typeof value == 'symbol' ||
	    (isObjectLike$$1(value) && objectToString.call(value) == symbolTag);
	}

	module.exports = isSymbol;
	});

	var toNumber$1 = createCommonjsModule(function (module) {
	var isObject = isObject$1,
	    isSymbol$$1 = isSymbol;

	/** Used as references for various `Number` constants. */
	var NAN = 0 / 0;

	/** Used to match leading and trailing whitespace. */
	var reTrim = /^\s+|\s+$/g;

	/** Used to detect bad signed hexadecimal string values. */
	var reIsBadHex = /^[-+]0x[0-9a-f]+$/i;

	/** Used to detect binary string values. */
	var reIsBinary = /^0b[01]+$/i;

	/** Used to detect octal string values. */
	var reIsOctal = /^0o[0-7]+$/i;

	/** Built-in method references without a dependency on `root`. */
	var freeParseInt = parseInt;

	/**
	 * Converts `value` to a number.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to process.
	 * @returns {number} Returns the number.
	 * @example
	 *
	 * _.toNumber(3.2);
	 * // => 3.2
	 *
	 * _.toNumber(Number.MIN_VALUE);
	 * // => 5e-324
	 *
	 * _.toNumber(Infinity);
	 * // => Infinity
	 *
	 * _.toNumber('3.2');
	 * // => 3.2
	 */
	function toNumber(value) {
	  if (typeof value == 'number') {
	    return value;
	  }
	  if (isSymbol$$1(value)) {
	    return NAN;
	  }
	  if (isObject(value)) {
	    var other = typeof value.valueOf == 'function' ? value.valueOf() : value;
	    value = isObject(other) ? (other + '') : other;
	  }
	  if (typeof value != 'string') {
	    return value === 0 ? value : +value;
	  }
	  value = value.replace(reTrim, '');
	  var isBinary = reIsBinary.test(value);
	  return (isBinary || reIsOctal.test(value))
	    ? freeParseInt(value.slice(2), isBinary ? 2 : 8)
	    : (reIsBadHex.test(value) ? NAN : +value);
	}

	module.exports = toNumber;
	});

	var debounce = createCommonjsModule(function (module) {
	var isObject = isObject$1,
	    now$$1 = now,
	    toNumber = toNumber$1;

	/** Error message constants. */
	var FUNC_ERROR_TEXT = 'Expected a function';

	/* Built-in method references for those with the same name as other `lodash` methods. */
	var nativeMax = Math.max,
	    nativeMin = Math.min;

	/**
	 * Creates a debounced function that delays invoking `func` until after `wait`
	 * milliseconds have elapsed since the last time the debounced function was
	 * invoked. The debounced function comes with a `cancel` method to cancel
	 * delayed `func` invocations and a `flush` method to immediately invoke them.
	 * Provide `options` to indicate whether `func` should be invoked on the
	 * leading and/or trailing edge of the `wait` timeout. The `func` is invoked
	 * with the last arguments provided to the debounced function. Subsequent
	 * calls to the debounced function return the result of the last `func`
	 * invocation.
	 *
	 * **Note:** If `leading` and `trailing` options are `true`, `func` is
	 * invoked on the trailing edge of the timeout only if the debounced function
	 * is invoked more than once during the `wait` timeout.
	 *
	 * If `wait` is `0` and `leading` is `false`, `func` invocation is deferred
	 * until to the next tick, similar to `setTimeout` with a timeout of `0`.
	 *
	 * See [David Corbacho's article](https://css-tricks.com/debouncing-throttling-explained-examples/)
	 * for details over the differences between `_.debounce` and `_.throttle`.
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Function
	 * @param {Function} func The function to debounce.
	 * @param {number} [wait=0] The number of milliseconds to delay.
	 * @param {Object} [options={}] The options object.
	 * @param {boolean} [options.leading=false]
	 *  Specify invoking on the leading edge of the timeout.
	 * @param {number} [options.maxWait]
	 *  The maximum time `func` is allowed to be delayed before it's invoked.
	 * @param {boolean} [options.trailing=true]
	 *  Specify invoking on the trailing edge of the timeout.
	 * @returns {Function} Returns the new debounced function.
	 * @example
	 *
	 * // Avoid costly calculations while the window size is in flux.
	 * jQuery(window).on('resize', _.debounce(calculateLayout, 150));
	 *
	 * // Invoke `sendMail` when clicked, debouncing subsequent calls.
	 * jQuery(element).on('click', _.debounce(sendMail, 300, {
	 *   'leading': true,
	 *   'trailing': false
	 * }));
	 *
	 * // Ensure `batchLog` is invoked once after 1 second of debounced calls.
	 * var debounced = _.debounce(batchLog, 250, { 'maxWait': 1000 });
	 * var source = new EventSource('/stream');
	 * jQuery(source).on('message', debounced);
	 *
	 * // Cancel the trailing debounced invocation.
	 * jQuery(window).on('popstate', debounced.cancel);
	 */
	function debounce(func, wait, options) {
	  var lastArgs,
	      lastThis,
	      maxWait,
	      result,
	      timerId,
	      lastCallTime,
	      lastInvokeTime = 0,
	      leading = false,
	      maxing = false,
	      trailing = true;

	  if (typeof func != 'function') {
	    throw new TypeError(FUNC_ERROR_TEXT);
	  }
	  wait = toNumber(wait) || 0;
	  if (isObject(options)) {
	    leading = !!options.leading;
	    maxing = 'maxWait' in options;
	    maxWait = maxing ? nativeMax(toNumber(options.maxWait) || 0, wait) : maxWait;
	    trailing = 'trailing' in options ? !!options.trailing : trailing;
	  }

	  function invokeFunc(time) {
	    var args = lastArgs,
	        thisArg = lastThis;

	    lastArgs = lastThis = undefined;
	    lastInvokeTime = time;
	    result = func.apply(thisArg, args);
	    return result;
	  }

	  function leadingEdge(time) {
	    // Reset any `maxWait` timer.
	    lastInvokeTime = time;
	    // Start the timer for the trailing edge.
	    timerId = setTimeout(timerExpired, wait);
	    // Invoke the leading edge.
	    return leading ? invokeFunc(time) : result;
	  }

	  function remainingWait(time) {
	    var timeSinceLastCall = time - lastCallTime,
	        timeSinceLastInvoke = time - lastInvokeTime,
	        result = wait - timeSinceLastCall;

	    return maxing ? nativeMin(result, maxWait - timeSinceLastInvoke) : result;
	  }

	  function shouldInvoke(time) {
	    var timeSinceLastCall = time - lastCallTime,
	        timeSinceLastInvoke = time - lastInvokeTime;

	    // Either this is the first call, activity has stopped and we're at the
	    // trailing edge, the system time has gone backwards and we're treating
	    // it as the trailing edge, or we've hit the `maxWait` limit.
	    return (lastCallTime === undefined || (timeSinceLastCall >= wait) ||
	      (timeSinceLastCall < 0) || (maxing && timeSinceLastInvoke >= maxWait));
	  }

	  function timerExpired() {
	    var time = now$$1();
	    if (shouldInvoke(time)) {
	      return trailingEdge(time);
	    }
	    // Restart the timer.
	    timerId = setTimeout(timerExpired, remainingWait(time));
	  }

	  function trailingEdge(time) {
	    timerId = undefined;

	    // Only invoke if we have `lastArgs` which means `func` has been
	    // debounced at least once.
	    if (trailing && lastArgs) {
	      return invokeFunc(time);
	    }
	    lastArgs = lastThis = undefined;
	    return result;
	  }

	  function cancel() {
	    if (timerId !== undefined) {
	      clearTimeout(timerId);
	    }
	    lastInvokeTime = 0;
	    lastArgs = lastCallTime = lastThis = timerId = undefined;
	  }

	  function flush() {
	    return timerId === undefined ? result : trailingEdge(now$$1());
	  }

	  function debounced() {
	    var time = now$$1(),
	        isInvoking = shouldInvoke(time);

	    lastArgs = arguments;
	    lastThis = this;
	    lastCallTime = time;

	    if (isInvoking) {
	      if (timerId === undefined) {
	        return leadingEdge(lastCallTime);
	      }
	      if (maxing) {
	        // Handle invocations in a tight loop.
	        timerId = setTimeout(timerExpired, wait);
	        return invokeFunc(lastCallTime);
	      }
	    }
	    if (timerId === undefined) {
	      timerId = setTimeout(timerExpired, wait);
	    }
	    return result;
	  }
	  debounced.cancel = cancel;
	  debounced.flush = flush;
	  return debounced;
	}

	module.exports = debounce;
	});

	var throttle = createCommonjsModule(function (module) {
	var debounce$$1 = debounce,
	    isObject = isObject$1;

	/** Error message constants. */
	var FUNC_ERROR_TEXT = 'Expected a function';

	/**
	 * Creates a throttled function that only invokes `func` at most once per
	 * every `wait` milliseconds. The throttled function comes with a `cancel`
	 * method to cancel delayed `func` invocations and a `flush` method to
	 * immediately invoke them. Provide `options` to indicate whether `func`
	 * should be invoked on the leading and/or trailing edge of the `wait`
	 * timeout. The `func` is invoked with the last arguments provided to the
	 * throttled function. Subsequent calls to the throttled function return the
	 * result of the last `func` invocation.
	 *
	 * **Note:** If `leading` and `trailing` options are `true`, `func` is
	 * invoked on the trailing edge of the timeout only if the throttled function
	 * is invoked more than once during the `wait` timeout.
	 *
	 * If `wait` is `0` and `leading` is `false`, `func` invocation is deferred
	 * until to the next tick, similar to `setTimeout` with a timeout of `0`.
	 *
	 * See [David Corbacho's article](https://css-tricks.com/debouncing-throttling-explained-examples/)
	 * for details over the differences between `_.throttle` and `_.debounce`.
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Function
	 * @param {Function} func The function to throttle.
	 * @param {number} [wait=0] The number of milliseconds to throttle invocations to.
	 * @param {Object} [options={}] The options object.
	 * @param {boolean} [options.leading=true]
	 *  Specify invoking on the leading edge of the timeout.
	 * @param {boolean} [options.trailing=true]
	 *  Specify invoking on the trailing edge of the timeout.
	 * @returns {Function} Returns the new throttled function.
	 * @example
	 *
	 * // Avoid excessively updating the position while scrolling.
	 * jQuery(window).on('scroll', _.throttle(updatePosition, 100));
	 *
	 * // Invoke `renewToken` when the click event is fired, but not more than once every 5 minutes.
	 * var throttled = _.throttle(renewToken, 300000, { 'trailing': false });
	 * jQuery(element).on('click', throttled);
	 *
	 * // Cancel the trailing throttled invocation.
	 * jQuery(window).on('popstate', throttled.cancel);
	 */
	function throttle(func, wait, options) {
	  var leading = true,
	      trailing = true;

	  if (typeof func != 'function') {
	    throw new TypeError(FUNC_ERROR_TEXT);
	  }
	  if (isObject(options)) {
	    leading = 'leading' in options ? !!options.leading : leading;
	    trailing = 'trailing' in options ? !!options.trailing : trailing;
	  }
	  return debounce$$1(func, wait, {
	    'leading': leading,
	    'maxWait': wait,
	    'trailing': trailing
	  });
	}

	module.exports = throttle;
	});

	var Client = function (_EventEmitter) {
	  _inherits(Client, _EventEmitter);

	  function Client(id) {
	    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
	    var connection = arguments[2];
	    var props = arguments[3];

	    _classCallCheck(this, Client);

	    if (!(id === undefined || typeof id === 'string')) {
	      throw new TypeError('Client id [' + id + '] is not a String');
	    }

	    var _this = _possibleConstructorReturn(this, _EventEmitter.call(this));

	    _Object$assign(_this, {
	      id: id,
	      _connection: connection,
	      options: options
	    }, props);
	    return _this;
	  }

	  /**
	   * @abstract
	   */


	  Client.prototype._dispatchMessage = function _dispatchMessage(message) {
	    this.emit('message', message);
	  };

	  return Client;
	}(index$6);

	var debug$10 = browser$1('LC:ConversationQuery');

	var ConversationQuery = function () {
	  ConversationQuery._encode = function _encode(value) {
	    if (value instanceof Date) {
	      return { __type: 'Date', iso: value.toJSON() };
	    }
	    if (value instanceof RegExp) {
	      return value.source;
	    }
	    return value;
	  };

	  ConversationQuery._quote = function _quote(s) {
	    return '\\Q' + s.replace('\\E', '\\E\\\\E\\Q') + '\\E';
	  };

	  ConversationQuery._calculateFlag = function _calculateFlag(options) {
	    return ['withLastMessagesRefreshed', 'compact'].reduce(
	    // eslint-disable-next-line no-bitwise
	    function (prev, key) {
	      return (prev << 1) + Boolean(options[key]);
	    }, 0);
	  };

	  /**
	   * Create a ConversationQuery
	   * @param  {IMClient} client
	   */


	  function ConversationQuery(client) {
	    _classCallCheck(this, ConversationQuery);

	    this._client = client;
	    this._where = {};
	    this._extraOptions = {};
	  }

	  ConversationQuery.prototype._addCondition = function _addCondition(key, condition, value) {
	    // Check if we already have a condition
	    if (!this._where[key]) {
	      this._where[key] = {};
	    }
	    this._where[key][condition] = this.constructor._encode(value);
	    return this;
	  };

	  ConversationQuery.prototype.toJSON = function toJSON() {
	    var json = {
	      where: this._where,
	      flag: this.constructor._calculateFlag(this._extraOptions)
	    };
	    if (typeof this._skip !== 'undefined') json.skip = this._skip;
	    if (typeof this._limit !== 'undefined') json.limit = this._limit;
	    if (typeof this._order !== 'undefined') json.sort = this._order;
	    debug$10(json);
	    return json;
	  };

	  /**
	   * 增加查询条件，指定聊天室的组员包含某些成员即可返回
	   * @param {string[]} peerIds - 成员 ID 列表
	   * @return {ConversationQuery} self
	   */


	  ConversationQuery.prototype.containsMembers = function containsMembers(peerIds) {
	    return this.containsAll('m', peerIds);
	  };

	  /**
	   * 增加查询条件，指定聊天室的组员条件满足条件的才返回
	   *
	   * @param {string[]} - 成员 ID 列表
	   * @param {Boolean} includeSelf - 是否包含自己
	   * @return {ConversationQuery} self
	   */


	  ConversationQuery.prototype.withMembers = function withMembers(peerIds, includeSelf) {
	    var peerIdsSet = new _Set(peerIds);
	    if (includeSelf) {
	      peerIdsSet.add(this._client.id);
	    }
	    this.sizeEqualTo('m', peerIdsSet.size);
	    return this.containsMembers(_Array$from(peerIdsSet));
	  };

	  /**
	   * 增加查询条件，当 conversation 的属性中对应的字段满足等于条件时即可返回
	   *
	   * @param {string} key
	   * @param value
	   * @return {ConversationQuery} self
	   */


	  ConversationQuery.prototype.equalTo = function equalTo(key, value) {
	    this._where[key] = this.constructor._encode(value);
	    return this;
	  };

	  /**
	   * 增加查询条件，当 conversation 的属性中对应的字段满足小于条件时即可返回
	   * @param {string} key
	   * @param value
	   * @return {ConversationQuery} self
	   */


	  ConversationQuery.prototype.lessThan = function lessThan(key, value) {
	    return this._addCondition(key, '$lt', value);
	  };

	  /**
	   * 增加查询条件，当 conversation 的属性中对应的字段满足小于等于条件时即可返回
	    * @param {string} key
	   * @param value
	   * @return {ConversationQuery} self
	   */


	  ConversationQuery.prototype.lessThanOrEqualTo = function lessThanOrEqualTo(key, value) {
	    return this._addCondition(key, '$lte', value);
	  };

	  /**
	   * 增加查询条件，当 conversation 的属性中对应的字段满足大于条件时即可返回
	   *
	   * @param {string} key
	   * @param value
	   * @return {ConversationQuery} self
	   */

	  ConversationQuery.prototype.greaterThan = function greaterThan(key, value) {
	    return this._addCondition(key, '$gt', value);
	  };

	  /**
	   * 增加查询条件，当 conversation 的属性中对应的字段满足大于等于条件时即可返回
	   *
	   * @param {string} key
	   * @param value
	   * @return {ConversationQuery} self
	   */

	  ConversationQuery.prototype.greaterThanOrEqualTo = function greaterThanOrEqualTo(key, value) {
	    return this._addCondition(key, '$gte', value);
	  };

	  /**
	   * 增加查询条件，当 conversation 的属性中对应的字段满足不等于条件时即可返回
	   *
	   * @param {string} key
	   * @param value
	   * @return {ConversationQuery} self
	   */


	  ConversationQuery.prototype.notEqualTo = function notEqualTo(key, value) {
	    return this._addCondition(key, '$ne', value);
	  };

	  /**
	   * 增加查询条件，当 conversation 的属性中对应的字段对应的值包含在指定值中时即可返回
	   *
	   * @param {string} key
	   * @param values
	   * @return {ConversationQuery} self
	   */


	  ConversationQuery.prototype.containedIn = function containedIn(key, values) {
	    return this._addCondition(key, '$in', values);
	  };

	  /**
	   * 增加查询条件，当 conversation 的属性中对应的字段对应的值不包含在指定值中时即可返回
	   *
	   * @param {string} key
	   * @param values
	   * @return {ConversationQuery} self
	   */


	  ConversationQuery.prototype.notContainsIn = function notContainsIn(key, values) {
	    return this._addCondition(key, '$nin', values);
	  };
	  /**
	   * 增加查询条件，当conversation的属性中对应的字段中的元素包含所有的值才可返回
	   *
	   * @param {string} key
	   * @param values
	   * @return {ConversationQuery} self
	   */


	  ConversationQuery.prototype.containsAll = function containsAll(key, values) {
	    return this._addCondition(key, '$all', values);
	  };

	  /**
	   * 增加查询条件，当 conversation 的属性中对应的字段对应的值包含此字符串即可返回
	   *
	   * @param {string} key
	   * @param {string} subString
	   * @return {ConversationQuery} self
	   */


	  ConversationQuery.prototype.contains = function contains(key, subString) {
	    return this._addCondition(key, '$regex', ConversationQuery._quote(subString));
	  };

	  /**
	   * 增加查询条件，当 conversation 的属性中对应的字段对应的值以此字符串起始即可返回
	   *
	   * @param {string} key
	   * @param {string} prefix
	   * @return {ConversationQuery} self
	   */


	  ConversationQuery.prototype.startsWith = function startsWith(key, prefix) {
	    return this._addCondition(key, '$regex', '^' + ConversationQuery._quote(prefix));
	  };

	  /**
	   * 增加查询条件，当 conversation 的属性中对应的字段对应的值以此字符串结束即可返回
	   *
	   * @param {string} key
	   * @param {string} suffix
	   * @return {ConversationQuery} self
	   */


	  ConversationQuery.prototype.endsWith = function endsWith(key, suffix) {
	    return this._addCondition(key, '$regex', ConversationQuery._quote(suffix) + '$');
	  };

	  /**
	   * 增加查询条件，当 conversation 的属性中对应的字段对应的值满足提供的正则表达式即可返回
	   *
	   * @param {string} key
	   * @param {RegExp} regex
	   * @return {ConversationQuery} self
	   */


	  ConversationQuery.prototype.matches = function matches(key, regex) {
	    this._addCondition(key, '$regex', regex);
	    // Javascript regex options support mig as inline options but store them
	    // as properties of the object. We support mi & should migrate them to
	    // modifiers
	    var _modifiers = '';
	    if (regex.ignoreCase) {
	      _modifiers += 'i';
	    }
	    if (regex.multiline) {
	      _modifiers += 'm';
	    }

	    if (_modifiers && _modifiers.length) {
	      this._addCondition(key, '$options', _modifiers);
	    }
	    return this;
	  };

	  /**
	   * 添加查询约束条件，查找 key 类型是数组，该数组的长度匹配提供的数值
	   *
	   * @param {string} key
	   * @param {Number} length
	   * @return {ConversationQuery} self
	   */


	  ConversationQuery.prototype.sizeEqualTo = function sizeEqualTo(key, length) {
	    return this._addCondition(key, '$size', length);
	  };

	  /**
	   * 设置返回集合的大小上限
	   *
	   * @param {Number} limit - 上限
	   * @return {ConversationQuery} self
	   */


	  ConversationQuery.prototype.limit = function limit(_limit) {
	    this._limit = _limit;
	    return this;
	  };

	  /**
	   * 设置返回集合的起始位置，一般用于分页
	   *
	   * @param {Number} skip - 起始位置跳过几个对象
	   * @return {ConversationQuery} self
	   */


	  ConversationQuery.prototype.skip = function skip(_skip) {
	    this._skip = _skip;
	    return this;
	  };

	  /**
	   * 设置返回集合按照指定key进行增序排列
	   *
	   * @param {string} key
	   * @return {ConversationQuery} self
	   */


	  ConversationQuery.prototype.ascending = function ascending(key) {
	    this._order = key;
	    return this;
	  };

	  /**
	   * 设置返回集合按照指定key进行增序排列，如果已设置其他排序，原排序的优先级较高
	   *
	   * @param {string} key
	   * @return {ConversationQuery} self
	   */


	  ConversationQuery.prototype.addAscending = function addAscending(key) {
	    if (this._order) {
	      this._order += ',' + key;
	    } else {
	      this._order = key;
	    }
	    return this;
	  };

	  /**
	   * 设置返回集合按照指定 key 进行降序排列
	   *
	   * @param {string} key
	   * @return {ConversationQuery} self
	   */


	  ConversationQuery.prototype.descending = function descending(key) {
	    this._order = '-' + key;
	    return this;
	  };

	  /**
	   * 设置返回集合按照指定 key 进行降序排列，如果已设置其他排序，原排序的优先级较高
	   *
	   * @param {string} key
	   * @return {ConversationQuery} self
	   */


	  ConversationQuery.prototype.addDescending = function addDescending(key) {
	    if (this._order) {
	      this._order += ',-' + key;
	    } else {
	      this._order = '-' + key;
	    }
	    return this;
	  };

	  /**
	   * 设置返回的 conversations 刷新最后一条消息
	   * @param  {Boolean} [enabled=true]
	   * @return {ConversationQuery} self
	   */


	  ConversationQuery.prototype.withLastMessagesRefreshed = function withLastMessagesRefreshed() {
	    var enabled = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;

	    this._extraOptions.withLastMessagesRefreshed = enabled;
	    return this;
	  };

	  /**
	   * @deprecated 请替换为 {@link ConversationQuery#withLastMessagesRefreshed}
	   * @param  {Boolean} [enabled=true]
	   * @return {ConversationQuery} self
	   */


	  ConversationQuery.prototype.withLastMessages = function withLastMessages(enabled) {
	    console.warn('DEPRECATION ConversationQuery#withLastMessages: ' + 'Use ConversationQuery#withLastMessagesRefreshed instead.');
	    return this.withLastMessagesRefreshed(enabled);
	  };

	  /**
	   * 设置返回的 conversations 为精简模式，即不含成员列表
	   * @param  {Boolean} [enabled=true]
	   * @return {ConversationQuery} self
	   */


	  ConversationQuery.prototype.compact = function compact() {
	    var enabled = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;

	    this._extraOptions.compact = enabled;
	    return this;
	  };

	  /**
	   * 执行查询
	   * @return {Promise.<Conversation[]>}
	   */


	  ConversationQuery.prototype.find = function find() {
	    return this._client._executeQuery(this);
	  };

	  return ConversationQuery;
	}();

	var es6_object_freeze = createCommonjsModule(function (module) {
	// 19.1.2.5 Object.freeze(O)
	var isObject = _isObject
	  , meta     = _meta.onFreeze;

	_objectSap('freeze', function($freeze){
	  return function freeze(it){
	    return $freeze && isObject(it) ? $freeze(meta(it)) : it;
	  };
	});
	});

	var freeze$2 = createCommonjsModule(function (module) {
	module.exports = _core.Object.freeze;
	});

	var freeze$1 = createCommonjsModule(function (module) {
	module.exports = { "default": freeze$2, __esModule: true };
	});

	var _Object$freeze = unwrapExports(freeze$1);

	var _rMessageStatus;

	/**
	 * 消息状态枚举
	 * @enum {Symbol}
	 * @since 3.2.0
	 * @memberof module:leancloud-realtime
	 */
	var MessageStatus = {
	  /** 初始状态、未知状态 */
	  NONE: _Symbol('none'),
	  /** 正在发送 */
	  SENDING: _Symbol('sending'),
	  /** 已发送 */
	  SENT: _Symbol('sent'),
	  /** 已送达 */
	  DELIVERED: _Symbol('delivered'),
	  /** 发送失败 */
	  FAILED: _Symbol('failed')
	};
	_Object$freeze(MessageStatus);

	var rMessageStatus = (_rMessageStatus = {}, _defineProperty(_rMessageStatus, MessageStatus.NONE, true), _defineProperty(_rMessageStatus, MessageStatus.SENDING, true), _defineProperty(_rMessageStatus, MessageStatus.SENT, true), _defineProperty(_rMessageStatus, MessageStatus.DELIVERED, true), _defineProperty(_rMessageStatus, MessageStatus.FAILED, true), _rMessageStatus);

	var Message = function () {
	  /**
	   * @implements AVMessage
	   * @param  {Object|String} content 消息内容
	   */
	  function Message(content) {
	    _classCallCheck(this, Message);

	    _Object$assign(this, { content: content }, {
	      /**
	       * @type {String}
	       * @memberof Message#
	       */
	      id: uuid.v4(),
	      /**
	       * 消息所在的 conversation id
	       * @memberof Message#
	       * @type {String?}
	       */
	      cid: null,
	      /**
	       * 时间戳
	       * @memberof Message#
	       * @type {Date}
	       */
	      timestamp: new Date(),
	      /**
	       * 消息发送者
	       * @memberof Message#
	       * @type {String}
	       */
	      from: undefined,
	      /**
	       * 标记需要回执
	       * @memberof Message#
	       * @type {Boolean}
	       */
	      needReceipt: false,
	      /**
	       * 标记暂态消息
	       * @memberof Message#
	       * @type {Boolean}
	       */
	      transient: false
	    });
	    this._setStatus(MessageStatus.NONE);
	  }

	  /**
	   * 设置是否需要送达回执
	   * @param {Boolean} needReceipt
	   * @return {Message} self
	   */


	  Message.prototype.setNeedReceipt = function setNeedReceipt(needReceipt) {
	    this.needReceipt = needReceipt;
	    return this;
	  };

	  /**
	   * 设置是否是暂态消息
	   * @param {Boolean} transient
	   * @return {Message} self
	   */


	  Message.prototype.setTransient = function setTransient(transient) {
	    this.transient = transient;
	    return this;
	  };

	  /**
	   * 将当前消息序列化为 JSON 对象
	   * @protected
	   * @return {Object}
	   */


	  Message.prototype.toJSON = function toJSON() {
	    return this.content;
	  };

	  /**
	   * 消息状态，值为 {@link module:leancloud-realtime.MessageStatus} 之一
	   * @type {Symbol}
	   * @readonly
	   * @since 3.2.0
	   */


	  Message.prototype._setStatus = function _setStatus(status) {
	    if (!rMessageStatus[status]) {
	      throw new Error('Invalid message status');
	    }
	    this._status = status;
	  };

	  /**
	   * 判断给定的内容是否是有效的 Message，
	   * 该方法始终返回 true
	   * @protected
	   * @returns {Boolean}
	   * @implements AVMessage.validate
	   */


	  Message.validate = function validate() {
	    return true;
	  };

	  /**
	   * 解析处理消息内容
	   * <pre>
	   * 如果子类提供了 message，返回该 message
	   * 如果没有提供，将 json 作为 content 实例化一个 Message
	   * @protected
	   * @param  {Object}  json    json 格式的消息内容
	   * @param  {Message} message 子类提供的 message
	   * @return {Message}
	   * @implements AVMessage.parse
	   */


	  Message.parse = function parse(json, message) {
	    return message || new this(json);
	  };

	  _createClass(Message, [{
	    key: 'status',
	    get: function get() {
	      return this._status;
	    }
	  }]);

	  return Message;
	}();

	/* eslint-disable no-param-reassign */
	// documented in ../index.js
	var messageType = function messageType(type) {
	  if (typeof type !== 'number') {
	    throw new TypeError(type + ' is not a Number');
	  }
	  return function (target) {
	    target.TYPE = type;
	    target.validate = function (json) {
	      return json._lctype === type;
	    };
	    target.prototype._getType = function () {
	      return { _lctype: type };
	    };
	  };
	};

	// documented in ../index.js
	var messageField = function messageField(fields) {
	  if (typeof fields !== 'string') {
	    if (!Array.isArray(fields)) {
	      throw new TypeError(fields + ' is not an Array');
	    } else if (fields.some(function (value) {
	      return typeof value !== 'string';
	    })) {
	      throw new TypeError('fields contains non-string typed member');
	    }
	  }
	  return function (target) {
	    // IE10 Hack:
	    // static properties in IE10 will not be inherited from super
	    // search for parse method and assign it manually
	    var originalCustomFields = isIE10 ? getStaticProperty(target, '_customFields') : target._customFields;
	    originalCustomFields = Array.isArray(originalCustomFields) ? originalCustomFields : [];
	    target._customFields = originalCustomFields.concat(fields);
	  };
	};

	// IE10 Hack:
	// static properties in IE10 will not be inherited from super
	// search for parse method and assign it manually

	var IE10Compatible = function IE10Compatible(target) {
	  if (isIE10) {
	    target.parse = getStaticProperty(target, 'parse');
	  }
	};

	var _dec;
	var _class$1;

	// jsdoc-ignore-start

	// jsdoc-ignore-end
	var TypedMessage = (_dec = messageField(['_lctext', '_lcattrs']), _dec(_class$1 = function (_Message) {
	  _inherits(TypedMessage, _Message);

	  /**
	   * 所有内置的富媒体消息均继承自本类
	   * @extends Message
	   */
	  function TypedMessage() {
	    _classCallCheck(this, TypedMessage);

	    var _this = _possibleConstructorReturn(this, _Message.call(this));

	    _this._ = {};
	    return _this;
	  }

	  /**
	   * @type {Number}
	   * @readonly
	   */


	  /**
	   * @param {String} text
	   * @return {TypedMessage} self
	   */
	  TypedMessage.prototype.setText = function setText(text) {
	    this._lctext = text;
	    return this;
	  };
	  /**
	   * @return {String}
	   */


	  TypedMessage.prototype.getText = function getText() {
	    return this._lctext;
	  };

	  /**
	   * @param {Object} attributes
	   * @return {TypedMessage} self
	   */


	  TypedMessage.prototype.setAttributes = function setAttributes(attributes) {
	    this._lcattrs = attributes;
	    return this;
	  };
	  /**
	   * @return {Object}
	   */


	  TypedMessage.prototype.getAttributes = function getAttributes() {
	    return this._lcattrs;
	  };

	  TypedMessage.prototype._getCustomFields = function _getCustomFields() {
	    var _this2 = this;

	    var fields = Array.isArray(this.constructor._customFields) ? this.constructor._customFields : [];
	    return fields.reduce(function (result, field) {
	      if (typeof field !== 'string') return result;
	      result[field] = _this2[field]; // eslint-disable-line no-param-reassign
	      return result;
	    }, {});
	  };

	  /* eslint-disable class-methods-use-this */


	  TypedMessage.prototype._getType = function _getType() {
	    throw new Error('not implemented');
	  };
	  /* eslint-enable class-methods-use-this */

	  TypedMessage.prototype.toJSON = function toJSON() {
	    return _Object$assign({
	      _lctext: this.getText(),
	      _lcattrs: this.getAttributes()
	    }, this._getCustomFields(), this._getType());
	  };

	  /**
	   * 解析处理消息内容
	   * <pre>
	   * 为给定的 message 设置 text 与 attributes 属性，返回该 message
	   * 如果子类没有提供 message，new this()
	   * @protected
	   * @param  {Object}  json    json 格式的消息内容
	   * @param  {TypedMessage} message 子类提供的 message
	   * @return {TypedMessage}
	   * @implements AVMessage.parse
	   */


	  TypedMessage.parse = function parse(json) {
	    var message = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : new this();

	    message.content = json; // eslint-disable-line no-param-reassign
	    var customFields = isIE10 ? getStaticProperty(message.constructor, '_customFields') : message.constructor._customFields;
	    var fields = Array.isArray(customFields) ? customFields : [];
	    fields = fields.reduce(function (result, field) {
	      if (typeof field !== 'string') return result;
	      result[field] = json[field]; // eslint-disable-line no-param-reassign
	      return result;
	    }, {});
	    _Object$assign(message, fields);
	    return _Message.parse.call(this, json, message);
	  };

	  _createClass(TypedMessage, [{
	    key: 'type',
	    get: function get() {
	      return this.constructor.TYPE;
	    }

	    /** @type {String} */

	  }, {
	    key: 'text',
	    set: function set(text) {
	      return this.setText(text);
	    },
	    get: function get() {
	      return this.getText();
	    }

	    /** @type {Object} */

	  }, {
	    key: 'attributes',
	    set: function set(attributes) {
	      return this.setAttributes(attributes);
	    },
	    get: function get() {
	      return this.getAttributes();
	    }
	  }]);

	  return TypedMessage;
	}(Message)) || _class$1);

	var _dec$1;
	var _class$2;

	// jsdoc-ignore-start

	// jsdoc-ignore-end
	var TextMessage = (_dec$1 = messageType(-1), _dec$1(_class$2 = IE10Compatible(_class$2 = function (_TypedMessage) {
	  _inherits(TextMessage, _TypedMessage);

	  /**
	   * 文类类型消息
	   * @extends TypedMessage
	   * @param  {String} [text='']
	   * @throws {TypeError} text 不是 String 类型
	   */
	  function TextMessage() {
	    var text = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

	    _classCallCheck(this, TextMessage);

	    if (typeof text !== 'string') {
	      throw new TypeError(text + ' is not a string');
	    }

	    var _this = _possibleConstructorReturn(this, _TypedMessage.call(this));

	    _this.setText(text);
	    return _this;
	  }

	  return TextMessage;
	}(TypedMessage)) || _class$2) || _class$2);

	/** @module leancloud-realtime */
	/**
	 * 消息状态枚举
	 * @enum {Symbol}
	 * @since 3.3.0
	 * @memberof module:leancloud-realtime
	 */
	var OnlineStatus = {
	  /** 在线 */
	  ONLINE: _Symbol('online'),
	  /** 离线 */
	  OFFLINE: _Symbol('offline')
	};

	var version$1 = "3.2.3";

	var debug$9 = browser$1('LC:IMClient');

	var IMClient = function (_Client) {
	  _inherits(IMClient, _Client);

	  /**
	   * 无法直接实例化，请使用 {@link Realtime#createIMClient} 创建新的 IMClient。
	   *
	   * @extends EventEmitter
	   * @param  {String} [id] 客户端 id
	   * @param  {Object} [options]
	   * @param  {Function} [options.signatureFactory] open session 时的签名方法 // TODO need details
	   * @param  {Function} [options.conversationSignatureFactory] 对话创建、增减成员操作时的签名方法
	   */
	  function IMClient() {
	    _classCallCheck(this, IMClient);

	    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	      args[_key] = arguments[_key];
	    }

	    var _this = _possibleConstructorReturn(this, _Client.call.apply(_Client, [this].concat(args)));
	    /**
	     * @var id {String} 客户端 id
	     * @memberof IMClient#
	     */


	    if (!_this._messageParser) {
	      throw new Error('IMClient must be initialized with a MessageParser');
	    }
	    _this._conversationCache = new Cache('client:' + _this.id);
	    _this._ackMessageBuffer = {};
	    internal(_this)._eventemitter = new index$6();
	    ['invited', 'kicked', 'membersjoined', 'membersleft', 'message', 'unreadmessages', 'close', 'conflict', 'unhandledmessage'].forEach(function (event) {
	      return _this.on(event, function () {
	        for (var _len2 = arguments.length, payload = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
	          payload[_key2] = arguments[_key2];
	        }

	        return _this._debug.apply(_this, [event + ' event emitted.'].concat(payload));
	      });
	    });
	    // onIMClientCreate hook
	    applyDecorators(_this._plugins.onIMClientCreate, _this);
	    return _this;
	  }

	  IMClient.prototype._debug = function _debug() {
	    for (var _len3 = arguments.length, params = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
	      params[_key3] = arguments[_key3];
	    }

	    debug$9.apply(undefined, params.concat(['[' + this.id + ']']));
	  };

	  /**
	   * @override
	   * @private
	   */


	  IMClient.prototype._dispatchMessage = function _dispatchMessage(message) {
	    this._debug(trim(message), 'received');
	    switch (message.cmd) {
	      case CommandType.conv:
	        return this._dispatchConvMessage(message);
	      case CommandType.direct:
	        return this._dispatchDirectMessage(message);
	      case CommandType.session:
	        return this._dispatchSessionMessage(message);
	      case CommandType.unread:
	        return this._dispatchUnreadMessage(message);
	      case CommandType.rcp:
	        return this._dispatchRcpMessage(message);
	      case CommandType.presence:
	        return this._dispatchPresenceMessage(message);
	      default:
	        this.emit('unhandledmessage', message);
	        return _Promise.resolve();
	    }
	  };

	  IMClient.prototype._dispatchSessionMessage = function _dispatchSessionMessage(message) {
	    var _message$sessionMessa = message.sessionMessage;
	    var code = _message$sessionMessa.code;
	    var reason = _message$sessionMessa.reason;

	    switch (message.op) {
	      case OpType.closed:
	        {
	          if (code === ErrorCode.SESSION_CONFLICT) {
	            /**
	             * 用户在其他客户端登录，当前客户端被服务端强行下线。详见文档「单点登录」章节。
	             * @event IMClient#conflict
	             */
	            return this.emit('conflict', {
	              reason: reason
	            });
	          }
	          /**
	           * 当前客户端被服务端强行下线
	           * @event IMClient#close
	           * @param {Object} payload
	           * @param {Number} payload.code 错误码
	           * @param {String} payload.reason 原因
	           */
	          return this.emit('close', {
	            code: code, reason: reason
	          });
	        }
	      default:
	        this.emit('unhandledmessage', message);
	        return _Promise.reject(new Error('Unrecognized session command'));
	    }
	  };

	  IMClient.prototype._dispatchUnreadMessage = function _dispatchUnreadMessage(message) {
	    var _this2 = this;

	    var convs = message.unreadMessage.convs;
	    return _Promise.all(convs.map(function (conv) {
	      return _this2.getConversation(conv.cid).then(function (conversation) {
	        var timestamp = void 0;
	        if (conv.timestamp) {
	          timestamp = new Date(conv.timestamp.toNumber());
	          conversation.lastMessageAt = timestamp; // eslint-disable-line no-param-reassign
	        }
	        conversation.unreadMessagesCount = conv.unread; // eslint-disable-line no-param-reassign
	        /**
	         * 未读消息数目更新
	         * @event IMClient#unreadmessages
	         * @param {Object} payload
	         * @param {Number} payload.count 未读消息数
	         * @param {String} [payload.lastMessageId] 最新一条未读消息 id
	         * @param {Date} [payload.lastMessageTimestamp] 最新一条未读消息时间戳
	         * @param {Conversation} conversation 未读消息数目有更新的对话
	         */
	        _this2.emit('unreadmessages', {
	          count: conv.unread,
	          lastMessageId: conv.mid,
	          lastMessageTimestamp: timestamp
	        }, conversation);
	      });
	    }));
	  };

	  IMClient.prototype._dispatchRcpMessage = function _dispatchRcpMessage(message) {
	    var rcpMessage = message.rcpMessage;

	    var conversationId = rcpMessage.cid;
	    var messageId = rcpMessage.id;
	    var deliveredAt = new Date(rcpMessage.t.toNumber());
	    var conversation = this._conversationCache.get(conversationId);
	    // conversation not cached means the client does not send the message
	    // during this session
	    if (!conversation) return;
	    conversation._handleReceipt({ messageId: messageId, deliveredAt: deliveredAt });
	  };

	  IMClient.prototype._dispatchConvMessage = function _dispatchConvMessage(message) {
	    var _this3 = this;

	    var convMessage = message.convMessage;
	    var _message$convMessage = message.convMessage;
	    var initBy = _message$convMessage.initBy;
	    var m = _message$convMessage.m;

	    switch (message.op) {
	      case OpType.joined:
	        {
	          return this.getConversation(convMessage.cid).then(function (conversation) {
	            if (!conversation.transient) {
	              // eslint-disable-next-line no-param-reassign
	              conversation.members = union(conversation.members, [_this3.id]);
	            }
	            var payload = {
	              invitedBy: initBy
	            };
	            /**
	             * 当前用户被添加至某个对话
	             * @event IMClient#invited
	             * @param {Object} payload
	             * @param {String} payload.invitedBy 邀请者 id
	             * @param {Conversation} conversation
	             */
	            _this3.emit('invited', payload, conversation);
	            /**
	             * 当前用户被添加至当前对话
	             * @event Conversation#invited
	             * @param {Object} payload
	             * @param {String} payload.invitedBy 该移除操作的发起者 id
	             */
	            conversation.emit('invited', payload);
	          });
	        }
	      case OpType.left:
	        {
	          return this.getConversation(convMessage.cid).then(function (conversation) {
	            if (!conversation.transient) {
	              // eslint-disable-next-line no-param-reassign
	              conversation.members = difference(conversation.members, [_this3.id]);
	            }
	            var payload = {
	              kickedBy: initBy
	            };
	            /**
	             * 当前用户被从某个对话中移除
	             * @event IMClient#kicked
	             * @param {Object} payload
	             * @param {String} payload.kickedBy 该移除操作的发起者 id
	             * @param {Conversation} conversation
	             */
	            _this3.emit('kicked', payload, conversation);
	            /**
	             * 当前用户被从当前对话中移除
	             * @event Conversation#kicked
	             * @param {Object} payload
	             * @param {String} payload.kickedBy 该移除操作的发起者 id
	             */
	            conversation.emit('kicked', payload);
	          });
	        }
	      case OpType.members_joined:
	        {
	          return this.getConversation(convMessage.cid).then(function (conversation) {
	            if (!conversation.transient) {
	              // eslint-disable-next-line no-param-reassign
	              conversation.members = union(conversation.members, convMessage.m);
	            }
	            var payload = {
	              invitedBy: initBy,
	              members: m
	            };
	            /**
	             * 有用户被添加至某个对话
	             * @event IMClient#membersjoined
	             * @param {Object} payload
	             * @param {String[]} payload.members 被添加的用户 id 列表
	             * @param {String} payload.invitedBy 邀请者 id
	             * @param {Conversation} conversation
	             */
	            _this3.emit('membersjoined', payload, conversation);
	            /**
	             * 有成员被添加至当前对话
	             * @event Conversation#membersjoined
	             * @param {Object} payload
	             * @param {String[]} payload.members 被添加的成员 id 列表
	             * @param {String} payload.invitedBy 邀请者 id
	             */
	            conversation.emit('membersjoined', payload);
	          });
	        }
	      case OpType.members_left:
	        {
	          return this.getConversation(convMessage.cid).then(function (conversation) {
	            if (!conversation.transient) {
	              // eslint-disable-next-line no-param-reassign
	              conversation.members = difference(conversation.members, convMessage.m);
	            }
	            var payload = {
	              kickedBy: initBy,
	              members: m
	            };
	            /**
	             * 有成员被从某个对话中移除
	             * @event IMClient#membersleft
	             * @param {Object} payload
	             * @param {String[]} payload.members 被移除的成员 id 列表
	             * @param {String} payload.kickedBy 该移除操作的发起者 id
	             * @param {Conversation} conversation
	             */
	            _this3.emit('membersleft', payload, conversation);
	            /**
	             * 有成员被从当前对话中移除
	             * @event Conversation#membersleft
	             * @param {Object} payload
	             * @param {String[]} payload.members 被移除的成员 id 列表
	             * @param {String} payload.kickedBy 该移除操作的发起者 id
	             */
	            conversation.emit('membersleft', payload);
	          });
	        }
	      default:
	        this.emit('unhandledmessage', message);
	        return _Promise.reject(new Error('Unrecognized conversation command'));
	    }
	  };

	  IMClient.prototype._dispatchPresenceMessage = function _dispatchPresenceMessage(_ref) {
	    var presenceMessage = _ref.presenceMessage;

	    return this.getConversation(presenceMessage.cid).then(function (conversation) {
	      /**
	       * 对话成员的在线状态发生变化
	       * @event Conversation#membersstatuschange
	       * @param {Object} payload
	       * @param {String[]} payload.members 成员 id 列表
	       * @param {Symbol} payload.status 新的在线状态，值为 {@link module:leancloud-realtime.OnlineStatus} 之一
	       */
	      conversation.emit('membersstatuschange', {
	        members: presenceMessage.sessionPeerIds,
	        // online: 1, offline: 2
	        status: OnlineStatus[['', 'ONLINE', 'OFFLINE'][presenceMessage.status]]
	      });
	    });
	  };

	  IMClient.prototype._dispatchDirectMessage = function _dispatchDirectMessage(originalMessage) {
	    var _this4 = this;

	    var directMessage = originalMessage.directMessage;
	    var _originalMessage$dire = originalMessage.directMessage;
	    var id = _originalMessage$dire.id;
	    var cid = _originalMessage$dire.cid;
	    var fromPeerId = _originalMessage$dire.fromPeerId;
	    var timestamp = _originalMessage$dire.timestamp;
	    var transient = _originalMessage$dire.transient;

	    return _Promise.all([this.getConversation(directMessage.cid), this._messageParser.parse(directMessage.msg)]).then(function (_ref2) {
	      var _ref3 = _slicedToArray(_ref2, 2);

	      var conversation = _ref3[0];
	      var message = _ref3[1];

	      var messageProps = {
	        id: id,
	        cid: cid,
	        timestamp: new Date(timestamp.toNumber()),
	        from: fromPeerId,
	        transient: transient
	      };
	      _Object$assign(message, messageProps);
	      message._setStatus(MessageStatus.SENT);
	      conversation.lastMessage = message; // eslint-disable-line no-param-reassign
	      conversation.lastMessageAt = message.timestamp; // eslint-disable-line no-param-reassign
	      conversation.unreadMessagesCount += 1; // eslint-disable-line no-param-reassign
	      /**
	       * 当前用户收到消息
	       * @event IMClient#message
	       * @param {Message} message
	       * @param {Conversation} conversation 收到消息的对话
	       */
	      _this4.emit('message', message, conversation);
	      /**
	       * 当前对话收到消息
	       * @event Conversation#message
	       * @param {Message} message
	       */
	      conversation.emit('message', message);
	      if (!(transient || conversation.transient)) {
	        _this4._sendAck(message);
	      }
	    });
	  };

	  IMClient.prototype._sendAck = function _sendAck(message) {
	    this._debug('send ack for', message);
	    var cid = message.cid;

	    if (!cid) {
	      return _Promise.reject(new Error('missing cid'));
	    }
	    if (!this._ackMessageBuffer[cid]) {
	      this._ackMessageBuffer[cid] = [];
	    }
	    this._ackMessageBuffer[cid].push(message);
	    if (!this._doSendAckThrottled) {
	      this._doSendAckThrottled = throttle(this._doSendAck.bind(this), 1000);
	    }
	    return this._doSendAckThrottled();
	  };

	  IMClient.prototype._doSendAck = function _doSendAck() {
	    var _this5 = this;

	    if (!this._connection.is('connected')) {
	      // if not connected, just skip everything
	      return _Promise.resolve();
	    }
	    debug$9('do send ack', this._ackMessageBuffer);
	    return _Promise.all(_Object$keys(this._ackMessageBuffer).map(function (cid) {
	      var convAckMessages = _this5._ackMessageBuffer[cid];
	      var timestamps = convAckMessages.map(function (message) {
	        return message.timestamp;
	      });
	      var command = new GenericCommand({
	        cmd: 'ack',
	        ackMessage: new AckCommand({
	          cid: cid,
	          fromts: Math.min.apply(null, timestamps),
	          tots: Math.max.apply(null, timestamps)
	        })
	      });
	      return _this5._send(command, false).then(function () {
	        return delete _this5._ackMessageBuffer[cid];
	      }).catch(function (error$$1) {
	        return console.warn('send ack failed:', error$$1);
	      });
	    }));
	  };

	  IMClient.prototype._send = function _send(cmd) {
	    var _connection;

	    var command = cmd;
	    if (this.id) {
	      command.peerId = this.id;
	    }

	    for (var _len4 = arguments.length, args = Array(_len4 > 1 ? _len4 - 1 : 0), _key4 = 1; _key4 < _len4; _key4++) {
	      args[_key4 - 1] = arguments[_key4];
	    }

	    return (_connection = this._connection).send.apply(_connection, [command].concat(args));
	  };

	  IMClient.prototype._open = function _open(appId, tag, deviceId) {
	    var _this6 = this;

	    var isReconnect = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;

	    this._debug('open session');
	    return _Promise.resolve(new GenericCommand({
	      cmd: 'session',
	      op: 'open',
	      appId: appId,
	      sessionMessage: new SessionCommand({
	        ua: 'js/' + version$1,
	        r: isReconnect
	      })
	    })).then(function (command) {
	      if (isReconnect) {
	        // if sessionToken is not expired, skip signature/tag/deviceId
	        var sessionToken = internal(_this6).sessionToken;
	        if (sessionToken) {
	          var value = sessionToken.value;
	          if (value && value !== Expirable.EXPIRED) {
	            _Object$assign(command.sessionMessage, {
	              st: value
	            });
	            return command;
	          }
	        }
	      }
	      _Object$assign(command.sessionMessage, trim({
	        tag: tag,
	        deviceId: deviceId
	      }));
	      if (_this6.options.signatureFactory) {
	        return runSignatureFactory(_this6.options.signatureFactory, [_this6.id]).then(function (signatureResult) {
	          _Object$assign(command.sessionMessage, keyRemap({
	            signature: 's',
	            timestamp: 't',
	            nonce: 'n'
	          }, signatureResult));
	          return command;
	        });
	      }
	      return command;
	    }).then(this._send.bind(this)).then(function (resCommand) {
	      var peerId = resCommand.peerId;
	      var _resCommand$sessionMe = resCommand.sessionMessage;
	      var token = _resCommand$sessionMe.st;
	      var tokenTTL = _resCommand$sessionMe.stTtl;

	      if (!peerId) {
	        console.warn('Unexpected session opened without peerId.');
	        return;
	      }
	      _this6.id = peerId;
	      if (token) {
	        internal(_this6).sessionToken = new Expirable(token, tokenTTL * 1000);
	      }
	    }, function (error$$1) {
	      if (error$$1.code === ErrorCode.SESSION_TOKEN_EXPIRED) {
	        if (internal(_this6).sessionToken === undefined) {
	          // let it fail if sessoinToken not cached but command rejected as token expired
	          // to prevent session openning flood
	          throw new Error('Unexpected session expiration');
	        }
	        debug$9('Session token expired, reopening');
	        delete internal(_this6).sessionToken;
	        return _this6._open(appId, tag, deviceId, isReconnect);
	      }
	      throw error$$1;
	    });
	  };

	  /**
	   * 关闭客户端
	   * @return {Promise}
	   */


	  IMClient.prototype.close = function close() {
	    var _this7 = this;

	    this._debug('close session');
	    var command = new GenericCommand({
	      cmd: 'session',
	      op: 'close'
	    });
	    return this._send(command).then(function () {
	      internal(_this7)._eventemitter.emit('close', {
	        code: 0
	      });
	      _this7.emit('close', {
	        code: 0
	      });
	    });
	  };
	  /**
	   * 获取 client 列表中在线的 client，每次查询最多 20 个 clientId，超出部分会被忽略
	   * @param  {String[]} clientIds 要查询的 client ids
	   * @return {Primse.<String[]>} 在线的 client ids
	   */


	  IMClient.prototype.ping = function ping(clientIds) {
	    this._debug('ping');
	    if (!(clientIds instanceof Array)) {
	      throw new TypeError('clientIds ' + clientIds + ' is not an Array');
	    }
	    if (!clientIds.length) {
	      return _Promise.resolve([]);
	    }
	    var command = new GenericCommand({
	      cmd: 'session',
	      op: 'query',
	      sessionMessage: new SessionCommand({
	        sessionPeerIds: clientIds
	      })
	    });
	    return this._send(command).then(function (resCommand) {
	      return resCommand.sessionMessage.onlineSessionPeerIds;
	    });
	  };

	  /**
	   * 获取某个特定的 conversation
	   * @param  {String} id 对话 id，对应 _Conversation 表中的 objectId
	   * @param  {Boolean} [noCache=false] 强制不从缓存中获取
	   * @return {Promise.<Conversation>}
	   */


	  IMClient.prototype.getConversation = function getConversation(id) {
	    var noCache = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

	    if (typeof id !== 'string') {
	      throw new TypeError(id + ' is not a String');
	    }
	    if (!noCache) {
	      var cachedConversation = this._conversationCache.get(id);
	      if (cachedConversation) {
	        return _Promise.resolve(cachedConversation);
	      }
	    }
	    return this.getQuery().equalTo('objectId', id).find().then(function (conversations) {
	      return conversations[0] || null;
	    });
	  };

	  /**
	   * 构造一个 ConversationQuery 来查询对话
	   * @return {ConversationQuery}
	   */


	  IMClient.prototype.getQuery = function getQuery() {
	    return new ConversationQuery(this);
	  };

	  IMClient.prototype._executeQuery = function _executeQuery(query) {
	    var _this8 = this;

	    var queryJSON = query.toJSON();
	    queryJSON.where = new JsonObjectMessage({
	      data: _JSON$stringify(queryJSON.where)
	    });
	    var command = new GenericCommand({
	      cmd: 'conv',
	      op: 'query',
	      convMessage: new ConvCommand(queryJSON)
	    });
	    return this._send(command).then(function (resCommand) {
	      try {
	        return JSON.parse(resCommand.convMessage.results.data);
	      } catch (error) {
	        var commandString = _JSON$stringify(trim(resCommand));
	        throw new Error('Parse query result failed: ' + error$$1.message + '. Command: ' + commandString);
	      }
	    }).then(function (conversations) {
	      return _Promise.all(conversations.map(_this8._parseConversationFromRawData.bind(_this8)));
	    }).then(function (conversations) {
	      return conversations.map(function (fetchedConversation) {
	        var conversation = _this8._conversationCache.get(fetchedConversation.id);
	        if (!conversation) {
	          conversation = fetchedConversation;
	          _this8._debug('no match, set cache');
	          _this8._conversationCache.set(fetchedConversation.id, fetchedConversation);
	        } else {
	          _this8._debug('update cached conversation');
	          ['creator', 'createdAt', 'updatedAt', 'lastMessageAt', 'lastMessage', 'mutedMembers', 'members', '_attributes', 'transient', 'muted'].forEach(function (key) {
	            var value = fetchedConversation[key];
	            if (value !== undefined) conversation[key] = value;
	          });
	          conversation._reset();
	        }
	        return conversation;
	      });
	    });
	  };

	  IMClient.prototype._parseConversationFromRawData = function _parseConversationFromRawData(rawData) {
	    var _this9 = this;

	    var data = keyRemap({
	      objectId: 'id',
	      lm: 'lastMessageAt',
	      msg: 'lastMessage',
	      msg_from: 'lastMessageFrom',
	      msg_mid: 'lastMessageId',
	      msg_timestamp: 'lastMessageTimestamp',
	      m: 'members',
	      tr: 'transient',
	      sys: 'system',
	      c: 'creator',
	      mu: 'mutedMembers'
	    }, rawData);
	    return _Promise.resolve().then(function () {
	      if (data.lastMessage) {
	        return _this9._messageParser.parse(data.lastMessage).then(function (message) {
	          data.lastMessage = message;
	          data.lastMessage.from = data.lastMessageFrom;
	          data.lastMessage.id = data.lastMessageId;
	          data.lastMessage.timestamp = new Date(data.lastMessageTimestamp);
	          data.lastMessage._setStatus(MessageStatus.SENT);
	          delete data.lastMessageFrom;
	          delete data.lastMessageId;
	          delete data.lastMessageTimestamp;
	        });
	      }
	      return _Promise.resolve();
	    }).then(function () {
	      return new Conversation(data, _this9);
	    });
	  };

	  /**
	   * 创建一个 conversation
	   * @param {Object} options 除了下列字段外的其他字段将被视为对话的自定义属性
	   * @param {String[]} options.members 对话的初始成员列表，默认包含当前 client
	   * @param {String} [options.name] 对话的名字
	   * @param {Object} [options.attributes] DEPRECATED: 额外属性，对应 _Conversation 表的 attr 列
	   * @param {Boolean} [options.transient=false] 暂态会话
	   * @param {Boolean} [options.unique=false] 唯一对话，当其为 true 时，如果当前已经有相同成员的对话存在则返回该对话，否则会创建新的对话
	   * @return {Promise.<Conversation>}
	   */


	  IMClient.prototype.createConversation = function createConversation() {
	    var _this10 = this;

	    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	    var m = options.members;
	    var name$$1 = options.name;
	    var attributes = options.attributes;
	    var transient = options.transient;
	    var unique = options.unique;

	    var properties = _objectWithoutProperties(options, ['members', 'name', 'attributes', 'transient', 'unique']);

	    if (!(transient || Array.isArray(m))) {
	      throw new TypeError('conversation members ' + m + ' is not an array');
	    }
	    var members = new _Set(m);
	    members.add(this.id);
	    members = _Array$from(members).sort();
	    var attr = properties || {};
	    if (name$$1) {
	      if (typeof name$$1 !== 'string') {
	        throw new TypeError('conversation name ' + name$$1 + ' is not a string');
	      }
	      attr.name = name$$1;
	    }
	    if (attributes) {
	      console.warn('DEPRECATION createConversation options.attributes param: Use options[propertyName] instead. See https://url.leanapp.cn/DeprecateAttributes for more details.');
	      attr.attr = attributes;
	    }
	    attr = new JsonObjectMessage({
	      data: _JSON$stringify(attr)
	    });

	    var startCommandJson = {
	      m: members,
	      attr: attr,
	      transient: transient,
	      unique: unique
	    };

	    return _Promise.resolve(new GenericCommand({
	      cmd: 'conv',
	      op: 'start',
	      convMessage: new ConvCommand(startCommandJson)
	    })).then(function (command) {
	      if (_this10.options.conversationSignatureFactory) {
	        var _params = [null, _this10.id, members, 'create'];
	        return runSignatureFactory(_this10.options.conversationSignatureFactory, _params).then(function (signatureResult) {
	          _Object$assign(command.convMessage, keyRemap({
	            signature: 's',
	            timestamp: 't',
	            nonce: 'n'
	          }, signatureResult));
	          return command;
	        });
	      }
	      return command;
	    }).then(this._send.bind(this)).then(function (resCommand) {
	      return new Conversation(_extends$1({
	        name: name$$1,
	        attr: attributes,
	        transient: transient,
	        unique: unique,
	        id: resCommand.convMessage.cid,
	        createdAt: resCommand.convMessage.cdate,
	        updatedAt: resCommand.convMessage.cdate,
	        lastMessageAt: null,
	        creator: _this10.id,
	        members: transient ? [] : members
	      }, properties), _this10);
	    }).then(tap(function (conversation) {
	      return _this10._conversationCache.set(conversation.id, conversation);
	    }));
	  };

	  /**
	   * 将指定的所有会话标记为已读
	   *
	   * @param {Conversation[]} conversations 指定的会话列表
	   * @return {Promise.<Conversation[]>} conversations 返回输入的会话列表
	   */


	  IMClient.prototype.markAllAsRead = function markAllAsRead(conversations) {
	    if (!Array.isArray(conversations)) {
	      throw new TypeError(conversations + ' is not an Array');
	    }
	    var ids = conversations.map(function (conversation) {
	      if (!(conversation instanceof Conversation)) {
	        throw new TypeError(conversation + ' is not a Conversation');
	      }
	      return conversation.id;
	    });
	    this._debug('mark [' + ids + '] as read');
	    if (!conversations.length) {
	      return _Promise.resolve([]);
	    }
	    return this._send(new GenericCommand({
	      cmd: 'read',
	      readMessage: new ReadCommand({
	        convs: conversations.map(function (conversation) {
	          return new ReadTuple({
	            cid: conversation.id,
	            timestamp: (conversation.lastMessageAt || new Date()).getTime()
	          });
	        })
	      })
	    }), false).then(function () {
	      // eslint-disable-next-line no-param-reassign
	      conversations.forEach(function (conversation) {
	        return conversation.unreadMessagesCount = 0;
	      });
	      return conversations;
	    });
	  };

	  return IMClient;
	}(Client);

	var debug$8 = browser$1('LC:Conversation');

	var Conversation = function (_EventEmitter) {
	  _inherits(Conversation, _EventEmitter);

	  /**
	   * 无法直接实例化，请使用 {@link IMClient#createConversation} 创建新的对话
	   * @extends EventEmitter
	   */
	  function Conversation(_ref, client) {
	    var id = _ref.id;
	    var creator = _ref.creator;
	    var createdAt = _ref.createdAt;
	    var updatedAt = _ref.updatedAt;
	    var lastMessageAt = _ref.lastMessageAt;
	    var lastMessage = _ref.lastMessage;
	    var _ref$mutedMembers = _ref.mutedMembers;
	    var mutedMembers = _ref$mutedMembers === undefined ? [] : _ref$mutedMembers;
	    var _ref$members = _ref.members;
	    var members = _ref$members === undefined ? [] : _ref$members;
	    var _ref$transient = _ref.transient;
	    var transient = _ref$transient === undefined ? false : _ref$transient;
	    var _ref$system = _ref.system;
	    var system = _ref$system === undefined ? false : _ref$system;
	    var _ref$muted = _ref.muted;
	    var muted = _ref$muted === undefined ? false : _ref$muted;

	    var attributes = _objectWithoutProperties(_ref, ['id', 'creator', 'createdAt', 'updatedAt', 'lastMessageAt', 'lastMessage', 'mutedMembers', 'members', 'transient', 'system', 'muted']);

	    _classCallCheck(this, Conversation);

	    var _this = _possibleConstructorReturn(this, _EventEmitter.call(this));

	    _Object$assign(_this, {
	      /**
	       * 对话 id，对应 _Conversation 表中的 objectId
	       * @memberof Conversation#
	       * @type {String}
	       */
	      id: id,
	      /**
	       * 对话创建者
	       * @memberof Conversation#
	       * @type {String}
	       */
	      creator: creator,
	      /**
	       * 对话创建时间
	       * @memberof Conversation#
	       * @type {Date}
	       */
	      createdAt: createdAt,
	      /**
	       * 对话更新时间
	       * @memberof Conversation#
	       * @type {Date}
	       */
	      updatedAt: updatedAt,
	      /**
	       * 最后一条消息时间
	       * @memberof Conversation#
	       * @type {Date}
	       */
	      lastMessageAt: lastMessageAt,
	      /**
	       * 最后一条消息
	       * @memberof Conversation#
	       * @type {?Message}
	       */
	      lastMessage: lastMessage,
	      /**
	       * 对该对话设置了静音的用户列表
	       * @memberof Conversation#
	       * @type {?String[]}
	       */
	      mutedMembers: mutedMembers,
	      /**
	       * 参与该对话的用户列表
	       * @memberof Conversation#
	       * @type {String[]}
	       */
	      members: members,
	      /**
	       * 暂态对话标记
	       * @memberof Conversation#
	       * @type {Boolean}
	       */
	      transient: transient,
	      /**
	       * 系统对话标记
	       * @memberof Conversation#
	       * @type {Boolean}
	       * @since 3.3
	       */
	      system: system,
	      /**
	       * 当前用户静音该对话标记
	       * @memberof Conversation#
	       * @type {Boolean}
	       */
	      muted: muted
	    });
	    _this._attributes = attributes;
	    _this._reset();
	    /**
	     * 当前用户在该对话的未读消息数
	     * @memberof Conversation#
	     * @type {Number}
	     */
	    _this.unreadMessagesCount = 0;
	    _this.members = _Array$from(new _Set(_this.members));
	    internal(_this).messagesWaitingForReciept = {};
	    if (client instanceof IMClient) {
	      _this._client = client;
	    } else {
	      throw new TypeError('Conversation must be initialized with a client');
	    }
	    ['kicked', 'membersjoined', 'membersleft', 'membersstatuschange', 'message'].forEach(function (event) {
	      return _this.on(event, function () {
	        for (var _len = arguments.length, payload = Array(_len), _key = 0; _key < _len; _key++) {
	          payload[_key] = arguments[_key];
	        }

	        return _this._debug.apply(_this, [event + ' event emitted.'].concat(payload));
	      });
	    });
	    // onConversationCreate hook
	    applyDecorators(_this._client._plugins.onConversationCreate, _this);
	    return _this;
	  }

	  /**
	   * 设置对话额外属性
	   * @param {Object} map    key-value 对
	   * @param {Boolean} [assign=false] 使用 Object.assign 更新属性，而不是替换整个 attributes
	   * @return {Conversation} self
	   * @deprecated Use {@link Conversation#set} instead. See {@link https://url.leanapp.cn/DeprecateAttributes} for more details.
	   */
	  Conversation.prototype.setAttributes = function setAttributes(map) {
	    var _this2 = this;

	    var assign = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

	    console.warn('DEPRECATION Conversation#setAttributes: Use conversation.set() instead. See https://url.leanapp.cn/DeprecateAttributes for more details.');
	    this._debug('set attributes: value=' + _JSON$stringify(map) + ', assign=' + assign);
	    if (!isPlainObject(map)) {
	      throw new TypeError('attributes must be a plain object');
	    }
	    if (!assign) {
	      this.set('attr', map);
	    } else {
	      _Object$keys(map).forEach(function (key) {
	        return _this2.setAttribute(key, map[key]);
	      });
	    }
	    return this;
	  };
	  /**
	   * 设置对话额外属性
	   * @param {String} key
	   * @param {Any} value
	   * @return {Conversation} self
	   * @deprecated Use {@link Conversation#set conversation.set('attr.key', value)} instead
	   */


	  Conversation.prototype.setAttribute = function setAttribute(key, value) {
	    console.warn('DEPRECATION Conversation#setAttribute: Use conversation.set(\'attr.key\', value) instead. See https://url.leanapp.cn/DeprecateAttributes for more details.');
	    return this.set('attr.' + key, value);
	  };
	  /**
	   * 对话名字，对应 _Conversation 表中的 name
	   * @type {String}
	   */


	  /**
	   * 设置对话名字
	   * @param {String} value
	   * @return {Conversation} self
	   * @deprecated Use {@link Conversation#set conversation.set('name', value)} instead
	   */
	  Conversation.prototype.setName = function setName(value) {
	    console.warn('DEPRECATION Conversation#setName: Use conversation.set(\'name\', value) instead. See https://url.leanapp.cn/DeprecateAttributes for more details.');
	    return this.set('name', value);
	  };

	  /**
	   * 获取对话的自定义属性
	   * @since 3.2.0
	   * @param  {String} key key 属性的键名，'x' 对应 Conversation 表中的 x 列
	   * @return {Any} 属性的值
	   */


	  Conversation.prototype.get = function get(key) {
	    return internal(this).currentAttributes[key];
	  };

	  /**
	   * 设置对话的自定义属性
	   * @since 3.2.0
	   * @param {String} key 属性的键名，'x' 对应 Conversation 表中的 x 列，支持使用 'x.y.z' 来修改对象的部分字段。
	   * @param {Any} value 属性的值
	   * @return {Conversation} self
	   * @example
	   *
	   * // 设置对话的 color 属性
	   * conversation.set('color', {
	   *   text: '#000',
	   *   background: '#DDD',
	   * });
	   * // 设置对话的 color.text 属性
	   * conversation.set('color.text', '#333');
	   */


	  Conversation.prototype.set = function set(key, value) {
	    this._debug('set [' + key + ']: ' + value);
	    var pendingAttributes = internal(this).pendingAttributes;
	    var pendingKeys = _Object$keys(pendingAttributes);
	    // suppose pendingAttributes = { 'a.b': {} }
	    // set 'a' or 'a.b': delete 'a.b'
	    var re = new RegExp('^' + key);
	    var childKeys = pendingKeys.filter(re.test.bind(re));
	    childKeys.forEach(function (k) {
	      delete pendingAttributes[k];
	    });
	    if (childKeys.length) {
	      pendingAttributes[key] = value;
	    } else {
	      // set 'a.c': nothing to do
	      // set 'a.b.c.d': assign c: { d: {} } to 'a.b'
	      // CAUTION: non-standard API, provided by core-js
	      var parentKey = _Array$find(pendingKeys, function (k) {
	        return key.indexOf(k) === 0;
	      }); // 'a.b'
	      if (parentKey) {
	        setValue(pendingAttributes[parentKey], key.slice(parentKey.length + 1), value);
	      } else {
	        pendingAttributes[key] = value;
	      }
	    }
	    // build currentAttributes
	    internal(this).currentAttributes = _Object$keys(pendingAttributes).reduce(function (target, k) {
	      return setValue(target, k, pendingAttributes[k]);
	    }, cloneDeep(this._attributes));
	    return this;
	  };

	  Conversation.prototype._reset = function _reset() {
	    internal(this).pendingAttributes = {};
	    internal(this).currentAttributes = this._attributes;
	  };

	  Conversation.prototype._debug = function _debug() {
	    for (var _len2 = arguments.length, params = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
	      params[_key2] = arguments[_key2];
	    }

	    debug$8.apply(undefined, params.concat(['[' + this.id + ']']));
	  };

	  Conversation.prototype._send = function _send(command) {
	    var _client;

	    /* eslint-disable no-param-reassign */
	    if (command.cmd === null) {
	      command.cmd = 'conv';
	    }
	    if (command.cmd === 'conv' && command.convMessage === null) {
	      command.convMessage = new ConvCommand();
	    }
	    if (command.convMessage && command.convMessage.cid === null) {
	      command.convMessage.cid = this.id;
	    }
	    /* eslint-enable no-param-reassign */

	    for (var _len3 = arguments.length, args = Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
	      args[_key3 - 1] = arguments[_key3];
	    }

	    return (_client = this._client)._send.apply(_client, [command].concat(args));
	  };
	  /**
	   * 保存当前对话的属性至服务器
	   * @return {Promise.<Conversation>} self
	   */


	  Conversation.prototype.save = function save() {
	    var _this3 = this;

	    this._debug('save');
	    var attr = internal(this).pendingAttributes;
	    if (isEmpty$1(attr)) {
	      this._debug('nothing touched, resolve with self');
	      return _Promise.resolve(this);
	    }
	    this._debug('attr: ' + _JSON$stringify(attr));
	    var convMessage = new ConvCommand({
	      attr: new JsonObjectMessage({
	        data: _JSON$stringify(attr)
	      })
	    });
	    return this._send(new GenericCommand({
	      op: 'update',
	      convMessage: convMessage
	    })).then(function (resCommand) {
	      _this3.updatedAt = resCommand.convMessage.udate;
	      _this3._attributes = internal(_this3).currentAttributes;
	      internal(_this3).pendingAttributes = {};
	      return _this3;
	    });
	  };

	  /**
	   * 从服务器更新对话的属性
	   * @return {Promise.<Conversation>} self
	   */


	  Conversation.prototype.fetch = function fetch() {
	    var _this4 = this;

	    return this._client.getQuery().equalTo('objectId', this.id).find().then(function () {
	      return _this4;
	    });
	  };

	  /**
	   * 静音，客户端拒绝收到服务器端的离线推送通知
	   * @return {Promise.<Conversation>} self
	   */


	  Conversation.prototype.mute = function mute() {
	    var _this5 = this;

	    this._debug('mute');
	    return this._send(new GenericCommand({
	      op: 'mute'
	    })).then(function () {
	      if (!_this5.transient) {
	        _this5.muted = true;
	        _this5.mutedMembers = union(_this5.mutedMembers, [_this5._client.id]);
	      }
	      return _this5;
	    });
	  };

	  /**
	   * 取消静音
	   * @return {Promise.<Conversation>} self
	   */


	  Conversation.prototype.unmute = function unmute() {
	    var _this6 = this;

	    this._debug('unmute');
	    return this._send(new GenericCommand({
	      op: 'unmute'
	    })).then(function () {
	      if (!_this6.transient) {
	        _this6.muted = false;
	        _this6.mutedMembers = difference(_this6.mutedMembers, [_this6._client.id]);
	      }
	      return _this6;
	    });
	  };

	  /**
	   * 获取对话人数，或暂态对话的在线人数
	   * @return {Promise.<Number>}
	   */


	  Conversation.prototype.count = function count() {
	    this._debug('unmute');
	    return this._send(new GenericCommand({
	      op: 'count'
	    })).then(function (resCommand) {
	      return resCommand.convMessage.count;
	    });
	  };

	  /**
	   * 增加成员
	   * @param {String|String[]} clientIds 新增成员 client id
	   * @return {Promise.<Conversation>} self
	   */


	  Conversation.prototype.add = function add(clientIds) {
	    var _this7 = this;

	    this._debug('add', clientIds);
	    if (typeof clientIds === 'string') {
	      clientIds = [clientIds]; // eslint-disable-line no-param-reassign
	    }
	    var convMessage = new ConvCommand({
	      m: clientIds
	    });
	    return _Promise.resolve(new GenericCommand({
	      op: 'add',
	      convMessage: convMessage
	    })).then(function (command) {
	      if (_this7._client.options.conversationSignatureFactory) {
	        var _params = [_this7.id, _this7._client.id, clientIds.sort(), 'add'];
	        return runSignatureFactory(_this7._client.options.conversationSignatureFactory, _params).then(function (signatureResult) {
	          _Object$assign(command.convMessage, keyRemap({
	            signature: 's',
	            timestamp: 't',
	            nonce: 'n'
	          }, signatureResult));
	          return command;
	        });
	      }
	      return command;
	    }).then(this._send.bind(this)).then(function () {
	      if (!_this7.transient && !_this7.system) {
	        _this7.members = union(_this7.members, clientIds);
	      }
	      return _this7;
	    });
	  };

	  /**
	   * 剔除成员
	   * @param {String|String[]} clientIds 成员 client id
	   * @return {Promise.<Conversation>} self
	   */


	  Conversation.prototype.remove = function remove(clientIds) {
	    var _this8 = this;

	    this._debug('remove', clientIds);
	    if (typeof clientIds === 'string') {
	      clientIds = [clientIds]; // eslint-disable-line no-param-reassign
	    }
	    var convMessage = new ConvCommand({
	      m: clientIds
	    });
	    return _Promise.resolve(new GenericCommand({
	      op: 'remove',
	      convMessage: convMessage
	    })).then(function (command) {
	      if (_this8._client.options.conversationSignatureFactory) {
	        var _params2 = [_this8.id, _this8._client.id, clientIds.sort(), 'remove'];
	        return runSignatureFactory(_this8._client.options.conversationSignatureFactory, _params2).then(function (signatureResult) {
	          _Object$assign(command.convMessage, keyRemap({
	            signature: 's',
	            timestamp: 't',
	            nonce: 'n'
	          }, signatureResult));
	          return command;
	        });
	      }
	      return command;
	    }).then(this._send.bind(this)).then(function () {
	      if (!_this8.transient && !_this8.system) {
	        _this8.members = difference(_this8.members, clientIds);
	      }
	      return _this8;
	    });
	  };

	  /**
	   * （当前用户）加入该对话
	   * @return {Promise.<Conversation>} self
	   */


	  Conversation.prototype.join = function join() {
	    this._debug('join');
	    return this.add(this._client.id);
	  };

	  /**
	   * （当前用户）退出该对话
	   * @return {Promise.<Conversation>} self
	   */


	  Conversation.prototype.quit = function quit() {
	    this._debug('quit');
	    return this.remove(this._client.id);
	  };

	  /**
	   * 发送消息
	   * @param  {Message} message 消息，Message 及其子类的实例
	   * @return {Promise.<Message>} 发送的消息
	   */


	  Conversation.prototype.send = function send(message) {
	    var _this9 = this;

	    this._debug(message, 'send');
	    if (!(message instanceof Message)) {
	      throw new TypeError(message + ' is not a Message');
	    }
	    if (message.needReceipt) {
	      if (this.transient) {
	        console.warn('message needReceipt option is ignored as the conversation is transient.');
	      } else if (message.transient) {
	        console.warn('message needReceipt option is ignored as the message is transient.');
	      } else if (this.members.length > 2) {
	        console.warn('message with needReceipt option is recommended to be sent in one-on-one conversation.'); // eslint-disable-line max-len
	      }
	    }
	    _Object$assign(message, {
	      cid: this.id,
	      from: this._client.id
	    });
	    message._setStatus(MessageStatus.SENDING);
	    var msg = message.toJSON();
	    if (typeof msg !== 'string') {
	      msg = _JSON$stringify(msg);
	    }
	    var sendPromise = this._send(new GenericCommand({
	      cmd: 'direct',
	      directMessage: new DirectCommand({
	        msg: msg,
	        cid: this.id,
	        r: message.needReceipt,
	        transient: message.transient,
	        dt: message.id
	      })
	    }), !message.transient);
	    if (!message.transient) {
	      sendPromise = sendPromise.then(function (resCommand) {
	        var _resCommand$ackMessag = resCommand.ackMessage;
	        var uid = _resCommand$ackMessag.uid;
	        var t = _resCommand$ackMessag.t;
	        var code = _resCommand$ackMessag.code;
	        var reason = _resCommand$ackMessag.reason;
	        var appCode = _resCommand$ackMessag.appCode;

	        if (code !== null) {
	          throw createError$2({
	            code: code, reason: reason, appCode: appCode
	          });
	        }
	        _Object$assign(message, {
	          id: uid,
	          timestamp: new Date(t.toNumber())
	        });
	        _this9.lastMessage = message;
	        _this9.lastMessageAt = message.timestamp;
	      });
	    }
	    return sendPromise.then(function () {
	      message._setStatus(MessageStatus.SENT);
	      if (message.needReceipt) {
	        internal(_this9).messagesWaitingForReciept[message.id] = message;
	      }
	      return message;
	    }, function (error$$1) {
	      message._setStatus(MessageStatus.FAILED);
	      throw error$$1;
	    });
	  };

	  /**
	   * 查询消息记录
	   * 如果仅需实现消息记录翻页查询需求，建议使用 {@link Conversation#createMessagesIterator}
	   * @param  {Object} [options]
	   * @param  {Date}   [options.beforeTime] 限制查询结果为小于这个该时间之前的消息，不传则为当前时间
	   * @param  {String} [options.beforeMessageId] 限制查询结果为该消息之前的消息，需要与 beforeTime 同时使用，为防止某时刻有重复消息
	   * @param  {Date}   [options.afterTime] 限制查询结果为大于这个该时间之前的消息
	   * @param  {String} [options.afterMessageId] 限制查询结果为该消息之后的消息，需要与 afterTime 同时使用，为防止某时刻有重复消息
	   * @param  {Number} [options.limit] 限制查询结果的数量，目前服务端默认为 20
	   * @return {Promise.<Message[]>} 消息列表
	   */


	  Conversation.prototype.queryMessages = function queryMessages() {
	    var _this10 = this;

	    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

	    this._debug('query messages', options);
	    if (options.beforeMessageId && !options.beforeTime) {
	      throw new Error('query option beforeMessageId must be used with option beforeTime');
	    }
	    if (options.afterMessageId && !options.afterTime) {
	      throw new Error('query option afterMessageId must be used with option afterTime');
	    }
	    var conditions = keyRemap({
	      beforeTime: 't',
	      beforeMessageId: 'mid',
	      afterTime: 'tt',
	      afterMessageId: 'tmid',
	      limit: 'l'
	    }, options);
	    if (conditions.t instanceof Date) {
	      conditions.t = conditions.t.getTime();
	    }
	    if (conditions.tt instanceof Date) {
	      conditions.tt = conditions.tt.getTime();
	    }
	    return this._send(new GenericCommand({
	      cmd: 'logs',
	      logsMessage: new LogsCommand(_Object$assign(conditions, {
	        cid: this.id
	      }))
	    })).then(function (resCommand) {
	      return _Promise.all(resCommand.logsMessage.logs.map(function (log$$1) {
	        return _this10._client._messageParser.parse(log$$1.data).then(function (message) {
	          var messageProps = {
	            id: log$$1.msgId,
	            cid: _this10.id,
	            timestamp: new Date(log$$1.timestamp.toNumber()),
	            from: log$$1.from
	          };
	          _Object$assign(message, messageProps);
	          message._setStatus(MessageStatus.SENT);
	          return message;
	        });
	      }));
	    });
	  };

	  /**
	   * 获取消息翻页迭代器
	   * @param  {Object} [options]
	   * @param  {Date}   [options.beforeTime] 限制起始查询结果为小于这个该时间之前的消息，不传则为当前时间
	   * @param  {String} [options.beforeMessageId] 限制起始查询结果为该消息之前的消息，需要与 beforeTime 同时使用，为防止某时刻有重复消息
	   * @param  {Number} [options.limit] 限制每页查询结果的数量，目前服务端默认为 20
	   * @return {AsyncIterater.<Promise.<IteratorResult<Message[]>>>} [AsyncIterator]{@link https://github.com/tc39/proposal-async-iteration}，调用其 next 方法返回获取下一页消息的 Promise
	   * @example
	   * var messageIterator = conversation.createMessagesIterator({ limit: 10 });
	   * messageIterator.next().then(function(result) {
	   *   // result: {
	   *   //   value: [message1, ..., message10],
	   *   //   done: false,
	   *   // }
	   * });
	   * messageIterator.next().then(function(result) {
	   *   // result: {
	   *   //   value: [message11, ..., message20],
	   *   //   done: false,
	   *   // }
	   * });
	   * messageIterator.next().then(function(result) {
	   *   // No more messages
	   *   // result: { value: [], done: true }
	   * });
	   */


	  Conversation.prototype.createMessagesIterator = function createMessagesIterator() {
	    var _this11 = this;

	    var _ref2 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

	    var beforeTime = _ref2.beforeTime;
	    var beforeMessageId = _ref2.beforeMessageId;
	    var limit = _ref2.limit;

	    var promise = void 0;
	    return {
	      next: function next() {
	        if (promise === undefined) {
	          // first call
	          promise = _this11.queryMessages({
	            limit: limit,
	            beforeTime: beforeTime,
	            beforeMessageId: beforeMessageId
	          });
	        } else {
	          promise = promise.then(function (prevMessages) {
	            if (prevMessages.length === 0 || prevMessages.length < limit) {
	              // no more messages
	              return [];
	            }
	            return _this11.queryMessages({
	              beforeTime: prevMessages[0].timestamp,
	              beforeMessageId: prevMessages[0].id,
	              limit: limit
	            });
	          });
	        }
	        return promise.then(function (value) {
	          return {
	            value: _Array$from(value),
	            done: value.length === 0 || value.length < limit
	          };
	        });
	      }
	    };
	  };

	  /**
	   * 将该会话标记为已读
	   * @return {Promise.<Conversation>} self
	   */


	  Conversation.prototype.markAsRead = function markAsRead() {
	    var _this12 = this;

	    return this._client.markAllAsRead([this]).then(function () {
	      return _this12;
	    });
	  };

	  Conversation.prototype._handleReceipt = function _handleReceipt(_ref3) {
	    var messageId = _ref3.messageId;
	    var deliveredAt = _ref3.deliveredAt;

	    var _internal = internal(this);

	    var messagesWaitingForReciept = _internal.messagesWaitingForReciept;

	    var message = messagesWaitingForReciept[messageId];
	    delete messagesWaitingForReciept[messageId];
	    if (!message) return;
	    message._setStatus(MessageStatus.DELIVERED);
	    message.deliveredAt = deliveredAt;
	    /**
	     * 消息已送达。只有在发送时设置了需要回执的情况下才会收到送达回执，该回执并不代表用户已读。
	     * @event Conversation#receipt
	     * @since 3.2.0
	     * @param {Object} payload
	     * @param {Message} payload.message 送达的消息
	     */
	    this.emit('receipt', { message: message });
	  };

	  /**
	   * 更新会话的上下线通知策略
	   * @param {Object} [options]
	   * @param {Boolean} [options.pub = false] 是否公开自己的上下线状态
	   * @param {Boolean} [options.sub = false] 是否订阅该会话其他成员公开的上下线状态
	   * @param {Number} [options.ttl] 下线后保留该策略的时间，单位为秒
	   */


	  Conversation.prototype.updateOnlineStatusPolicy = function updateOnlineStatusPolicy(_ref4) {
	    var _ref4$pub = _ref4.pub;
	    var pub = _ref4$pub === undefined ? false : _ref4$pub;
	    var _ref4$sub = _ref4.sub;
	    var sub = _ref4$sub === undefined ? false : _ref4$sub;
	    var ttl = _ref4.ttl;

	    this._debug('updateOnlineStatusPolicy', pub, sub, ttl);
	    var convMessage = new ConvCommand({
	      statusPub: pub,
	      statusSub: sub,
	      statusTTL: ttl
	    });
	    var command = new GenericCommand({
	      op: 'status',
	      convMessage: convMessage
	    });
	    return this._send(command);
	  };

	  _createClass(Conversation, [{
	    key: 'createdAt',
	    set: function set(value) {
	      this._createdAt = decodeDate(value);
	    },
	    get: function get() {
	      return this._createdAt;
	    }
	  }, {
	    key: 'updatedAt',
	    set: function set(value) {
	      this._updatedAt = decodeDate(value);
	    },
	    get: function get() {
	      return this._updatedAt;
	    }
	  }, {
	    key: 'lastMessageAt',
	    set: function set(value) {
	      this._lastMessageAt = decodeDate(value);
	    },
	    get: function get() {
	      return this._lastMessageAt;
	    }

	    /**
	     * 对话额外属性，对应 _Conversation 表中的 attr
	     * @type {Object}
	     * @deprecated Use {@link Conversation#get conversation.get('attr')},
	     * {@link Conversation#set conversation.set('attr', value)} instead
	     */

	  }, {
	    key: 'attributes',
	    get: function get() {
	      console.warn('DEPRECATION Conversation.attributes: Use conversation.get(\'attr\') instead. See https://url.leanapp.cn/DeprecateAttributes for more details.');
	      return this.get('attr');
	    },
	    set: function set(value) {
	      console.warn('DEPRECATION Conversation.attributes: Use conversation.set(\'attr\', value) instead. See https://url.leanapp.cn/DeprecateAttributes for more details.');
	      this.set('attr', value);
	    }
	  }, {
	    key: 'name',
	    get: function get() {
	      return this.get('name');
	    },
	    set: function set(value) {
	      this.set('name', value);
	    }
	  }]);

	  return Conversation;
	}(index$6);

	var _class$3;

	function _applyDecoratedDescriptor$1(target, property, decorators, descriptor, context) {
	  var desc = {};
	  Object['ke' + 'ys'](descriptor).forEach(function (key) {
	    desc[key] = descriptor[key];
	  });
	  desc.enumerable = !!desc.enumerable;
	  desc.configurable = !!desc.configurable;

	  if ('value' in desc || desc.initializer) {
	    desc.writable = true;
	  }

	  desc = decorators.slice().reverse().reduce(function (desc, decorator) {
	    return decorator(target, property, desc) || desc;
	  }, desc);

	  if (context && desc.initializer !== void 0) {
	    desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
	    desc.initializer = undefined;
	  }

	  if (desc.initializer === void 0) {
	    Object['define' + 'Property'](target, property, desc);
	    desc = null;
	  }

	  return desc;
	}

	var debug$11 = browser$1('LC:MessageParser');

	var tryParseJson = function tryParseJson(target, key, descriptor) {
	  var fn = descriptor.value;
	  // eslint-disable-next-line no-param-reassign
	  descriptor.value = function wrapper(param) {
	    var content = void 0;
	    if (typeof param !== 'string') {
	      content = param;
	    } else {
	      try {
	        content = JSON.parse(param);
	      } catch (error) {
	        content = param;
	      }
	    }
	    return fn.call(this, content);
	  };
	};

	var applyPlugins = function applyPlugins(target, key, descriptor) {
	  var fn = descriptor.value;
	  // eslint-disable-next-line no-param-reassign
	  descriptor.value = function wrapper(json) {
	    var _this = this;

	    return _Promise.resolve(json).then(applyMiddlewares(this._plugins.beforeMessageParse)).then(function (decoratedJson) {
	      return fn.call(_this, decoratedJson);
	    }).then(applyMiddlewares(this._plugins.afterMessageParse));
	  };
	};

	var MessageParser = (_class$3 = function () {
	  function MessageParser() {
	    var plugins = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

	    _classCallCheck(this, MessageParser);

	    this._plugins = plugins;
	    this._messageClasses = [];
	  }

	  MessageParser.prototype.register = function register(messageClass) {
	    if (messageClass && messageClass.parse && messageClass.prototype && messageClass.prototype.toJSON) {
	      this._messageClasses.unshift(messageClass);
	    } else {
	      throw new TypeError('Invalid messageClass');
	    }
	  };

	  // jsdoc-ignore-start


	  // jsdoc-ignore-end
	  MessageParser.prototype.parse = function parse(content) {
	    debug$11('parsing message:', content);
	    var _iteratorNormalCompletion = true;
	    var _didIteratorError = false;
	    var _iteratorError = undefined;

	    try {
	      for (var _iterator = _getIterator(this._messageClasses), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	        var Klass = _step.value;

	        var contentCopy = isPlainObject(content) ? _Object$assign({}, content) : content;
	        var valid = void 0;
	        var result = void 0;
	        try {
	          valid = Klass.validate(contentCopy);
	        } catch (error) {
	          // eslint-disable-line no-empty
	        }
	        if (valid) {
	          try {
	            result = Klass.parse(contentCopy);
	          } catch (error) {
	            console.warn('parsing a valid message content error', {
	              error: error,
	              Klass: Klass,
	              content: contentCopy
	            });
	          }
	          if (result !== undefined) {
	            debug$11('parse result:', result);
	            return result;
	          }
	        }
	      }
	    } catch (err) {
	      _didIteratorError = true;
	      _iteratorError = err;
	    } finally {
	      try {
	        if (!_iteratorNormalCompletion && _iterator.return) {
	          _iterator.return();
	        }
	      } finally {
	        if (_didIteratorError) {
	          throw _iteratorError;
	        }
	      }
	    }

	    throw new Error('No Message Class matched');
	  };

	  return MessageParser;
	}(), (_applyDecoratedDescriptor$1(_class$3.prototype, 'parse', [tryParseJson, applyPlugins], _Object$getOwnPropertyDescriptor(_class$3.prototype, 'parse'), _class$3.prototype)), _class$3);

	var debug$5 = browser$1('LC:Realtime');

	var pushRouterCache = new Cache('push-router');

	var Realtime = function (_EventEmitter) {
	  _inherits(Realtime, _EventEmitter);

	  /**
	   * @extends EventEmitter
	   * @param  {Object} options
	   * @param  {String} options.appId
	   * @param  {String} [options.region='cn'] 节点 id
	   * @param  {Boolean} [options.pushOfflineMessages=false] 启用推送离线消息模式（默认为发送未读消息通知模式）
	   * @param  {Boolean} [options.noBinary=false] 设置 WebSocket 使用字符串格式收发消息（默认为二进制格式）。
	   *                                            适用于 WebSocket 实现不支持二进制数据格式的情况（如 React Native）
	   * @param  {Boolean} [options.ssl=true] 使用 wss 进行连接
	   * @param  {Plugin[]} [options.plugins] 加载插件（since 3.1.0）
	   */
	  function Realtime(options) {
	    _classCallCheck(this, Realtime);

	    debug$5('initializing Realtime');

	    var _this = _possibleConstructorReturn(this, _EventEmitter.call(this));

	    if (typeof options.appId !== 'string') {
	      throw new TypeError('appId [' + options.appId + '] is not a string');
	    }
	    _this._options = _Object$assign({
	      appId: undefined,
	      region: 'cn',
	      pushOfflineMessages: false,
	      ssl: true
	    }, options);
	    _this._id = uuid.v4();
	    _this._cache = new Cache('endpoints');
	    _this._clients = {};
	    _this._plugins = ensureArray(options.plugins).reduce(function (result, plugin) {
	      // eslint-disable-next-line no-restricted-syntax
	      for (var hook in plugin) {
	        if ({}.hasOwnProperty.call(plugin, hook) && hook !== 'name') {
	          if (plugin.name) {
	            ensureArray(plugin[hook]).forEach(function (value) {
	              // eslint-disable-next-line no-param-reassign
	              value._pluginName = plugin.name;
	            });
	          }
	          // eslint-disable-next-line no-param-reassign
	          result[hook] = ensureArray(result[hook]).concat(plugin[hook]);
	        }
	      }
	      return result;
	    }, {});
	    _this._messageParser = new MessageParser(_this._plugins);
	    _this.register([Message, TextMessage]);
	    // onRealtimeCreate hook
	    applyDecorators(_this._plugins.onRealtimeCreate, _this);
	    // messageClasses alias
	    _this.register(ensureArray(_this._plugins.messageClasses));
	    return _this;
	  }

	  Realtime.prototype._open = function _open() {
	    var _this2 = this;

	    if (this._openPromise) return this._openPromise;

	    var format = 'protobuf';
	    if (this._options.noBinary) {
	      // 不发送 binary data，fallback to base64 string
	      format = 'protobase64';
	    }
	    var version = 3;
	    if (this._options.pushOfflineMessages) {
	      // 不推送离线消息，而是发送对话的未读通知
	      version = 1;
	    }
	    var protocol = {
	      format: format,
	      version: version
	    };
	    this._openPromise = new _Promise(function (resolve, reject) {
	      debug$5('No connection established, create a new one.');
	      var connection = new Connection(function () {
	        return _this2._getEndpoints(_this2._options);
	      }, protocol);
	      connection.binaryType = 'arraybuffer';
	      connection.on('open', function () {
	        return resolve(connection);
	      });
	      connection.on('error', reject);
	      connection.on('message', _this2._dispatchMessage.bind(_this2));
	      /**
	       * 网络连接断开
	       * @event Realtime#disconnect
	       */
	      /**
	       * 计划在一段时间后尝试重新连接
	       * @event Realtime#schedule
	       * @param {Number} attempt 尝试重连的次数
	       * @param {Number} delay 延迟的毫秒数
	       */
	      /**
	       * 正在尝试重新连接
	       * @event Realtime#retry
	       * @param {Number} attempt 尝试重连的次数
	       */
	      /**
	       * 网络连接恢复正常
	       * @event Realtime#reconnect
	       */

	      /**
	       * 客户端连接断开
	       * @event IMClient#disconnect
	       * @since 3.2.0
	       */
	      /**
	       * 计划在一段时间后尝试重新连接
	       * @event IMClient#schedule
	       * @param {Number} attempt 尝试重连的次数
	       * @param {Number} delay 延迟的毫秒数
	       * @since 3.2.0
	       */
	      /**
	       * 正在尝试重新连接
	       * @event IMClient#retry
	       * @param {Number} attempt 尝试重连的次数
	       * @since 3.2.0
	       */

	      // event proxy
	      ['disconnect', 'reconnect', 'retry', 'schedule'].forEach(function (event) {
	        return connection.on(event, function () {
	          for (var _len = arguments.length, payload = Array(_len), _key = 0; _key < _len; _key++) {
	            payload[_key] = arguments[_key];
	          }

	          debug$5.apply(undefined, [event + ' event emitted.'].concat(payload));
	          _this2.emit.apply(_this2, [event].concat(payload));
	          if (event !== 'reconnect') {
	            _Object$values(_this2._clients).forEach(function (client) {
	              client.emit.apply(client, [event].concat(payload));
	            });
	          }
	        });
	      });
	      // override handleClose
	      connection.handleClose = function handleClose(event) {
	        // CAUTION: non-standard API, provided by core-js
	        var isFatal = _Array$some([ErrorCode.APP_NOT_AVAILABLE, ErrorCode.INVALID_LOGIN, ErrorCode.INVALID_ORIGIN], function (errorCode) {
	          return errorCode === event.code;
	        });
	        if (isFatal) {
	          // in these cases, SDK should throw.
	          this.throw(createError$2(event));
	        } else {
	          // reconnect
	          this.disconnect();
	        }
	      };
	      internal(_this2).connection = connection;
	    });

	    return this._openPromise;
	  };

	  Realtime.prototype._getEndpoints = function _getEndpoints(options) {
	    var _this3 = this;

	    return _Promise.resolve(this._cache.get('endpoints') || this.constructor._fetchEndpointsInfo(options).then(tap(function (info) {
	      return _this3._cache.set('endpoints', info, info.ttl * 1000);
	    }))).then(function (info) {
	      debug$5('endpoint info:', info);
	      return [info.server, info.secondary];
	    });
	  };

	  Realtime._fetchPushRouter = function _fetchPushRouter(_ref) {
	    var appId = _ref.appId;
	    var region = _ref.region;

	    debug$5('fetch router');
	    switch (region) {
	      case 'cn':
	        {
	          var cachedPushRouter = pushRouterCache.get(appId);
	          if (cachedPushRouter) {
	            return _Promise.resolve(cachedPushRouter);
	          }
	          return index$7.get('https://app-router.leancloud.cn/1/route', {
	            params: {
	              appId: appId
	            },
	            timeout: 20000
	          }).then(function (res) {
	            return res.data;
	          }).then(tap(debug$5)).then(function (route) {
	            var pushRouter = route.push_router_server;
	            if (!pushRouter) {
	              throw new Error('push router not exists');
	            }
	            var ttl = route.ttl;
	            if (typeof ttl !== 'number') {
	              ttl = 3600;
	            }
	            pushRouterCache.set(appId, pushRouter, ttl * 1000);
	            return pushRouter;
	          }).catch(function () {
	            return 'router-g0-push.leancloud.cn';
	          });
	        }
	      case 'us':
	        return _Promise.resolve('router-a0-push.leancloud.cn');
	      default:
	        throw new Error('Region [' + region + '] is not supported.');
	    }
	  };

	  Realtime._fetchEndpointsInfo = function _fetchEndpointsInfo(_ref2) {
	    var appId = _ref2.appId;
	    var region = _ref2.region;
	    var ssl = _ref2.ssl;
	    var server = _ref2.server;

	    debug$5('fetch endpoint info');
	    return this._fetchPushRouter({ appId: appId, region: region }).then(tap(debug$5)).then(function (router) {
	      return index$7.get('https://' + router + '/v1/route', {
	        params: {
	          appId: appId,
	          secure: ssl,
	          server: server,
	          _t: Date.now()
	        },
	        timeout: 20000
	      }).then(function (res) {
	        return res.data;
	      }).then(tap(debug$5));
	    });
	  };

	  Realtime.prototype._close = function _close() {
	    if (this._openPromise) {
	      this._openPromise.then(function (connection) {
	        return connection.close();
	      });
	    }
	    delete this._openPromise;
	  };

	  /**
	   * 手动进行重连。
	   * SDK 在网络出现异常时会自动按照一定的时间间隔尝试重连，调用该方法会立即尝试重连并重置重连尝试计数器。
	   * 只能在 `schedule` 事件之后，`retry` 事件之前调用，如果当前网络正常或者正在进行重连，调用该方法会抛异常。
	   */


	  Realtime.prototype.retry = function retry() {
	    var connection = internal(this).connection;
	    if (!connection) {
	      throw new Error('no connection established');
	    }
	    if (connection.cannot('retry')) {
	      throw new Error('retrying not allowed when not offline. the connection is now ' + connection.current);
	    }
	    return connection.retry();
	  };

	  Realtime.prototype._register = function _register(client) {
	    if (!(client instanceof Client)) {
	      throw new TypeError(client + ' is not a Client');
	    }
	    if (!client.id) {
	      throw new Error('Client must have an id to be registered');
	    }
	    this._clients[client.id] = client;
	  };

	  Realtime.prototype._deregister = function _deregister(client) {
	    if (!(client instanceof Client)) {
	      throw new TypeError(client + ' is not a Client');
	    }
	    if (!client.id) {
	      throw new Error('Client must have an id to be deregistered');
	    }
	    delete this._clients[client.id];
	    if (_Object$getOwnPropertyNames(this._clients).length === 0) {
	      this._close();
	    }
	  };

	  Realtime.prototype._dispatchMessage = function _dispatchMessage(message) {
	    if (message.peerId !== null) {
	      var targetClient = this._clients[message.peerId];
	      if (targetClient) {
	        return _Promise.resolve(targetClient).then(function (client) {
	          return client._dispatchMessage(message);
	        }).catch(debug$5);
	      }
	      return debug$5('[WARN] Unexpected message received without any live client match', trim(message));
	    }
	    return debug$5('[WARN] Unexpected message received without peerId', trim(message));
	  };

	  /**
	   * 创建一个即时通讯客户端，多次创建相同 id 的客户端会返回同一个实例
	   * @param  {String} [id] 客户端 id，如果不指定，服务端会随机生成一个
	   * @param  {Object} [clientOptions] 详细参数 @see {@link IMClient}
	   * @param  {String} [tag] 客户端类型标记，以支持单点登录功能
	   * @return {Promise.<IMClient>}
	   */


	  Realtime.prototype.createIMClient = function createIMClient(id, clientOptions, tag) {
	    var _this4 = this;

	    var idIsString = typeof id === 'string';
	    if (idIsString && this._clients[id] !== undefined) {
	      return _Promise.resolve(this._clients[id]);
	    }
	    var promise = this._open().then(function (connection) {
	      var client = new IMClient(id, clientOptions, connection, {
	        _messageParser: _this4._messageParser,
	        _plugins: _this4._plugins
	      });
	      connection.on('reconnect', function () {
	        return client._open(_this4._options.appId, tag, _this4._id, true)
	        /**
	         * 客户端连接恢复正常，该事件通常在 {@link Realtime#event:reconnect} 之后发生
	         * @event IMClient#reconnect
	         * @since 3.2.0
	         */
	        /**
	         * 客户端重新登录发生错误（网络连接已恢复，但重新登录错误）
	         * @event IMClient#reconnecterror
	         * @since 3.2.0
	         */
	        .then(function () {
	          return client.emit('reconnect');
	        }, function (error$$1) {
	          return client.emit('reconnecterror', error$$1);
	        });
	      });
	      internal(client)._eventemitter.on('close', function () {
	        return _this4._deregister(client);
	      }, _this4);
	      return client._open(_this4._options.appId, tag, _this4._id).then(function () {
	        _this4._register(client);
	        return client;
	      });
	    });
	    if (idIsString) {
	      this._clients[id] = promise;
	    }
	    return promise;
	  };

	  /**
	   * 注册消息类
	   *
	   * 在接收消息、查询消息时，会按照消息类注册顺序的逆序依次尝试解析消息内容
	   *
	   * @param  {Function | Function[]} messageClass 消息类，需要实现 {@link AVMessage} 接口，
	   * 建议继承自 {@link TypedMessage}
	   * @throws {TypeError} 如果 messageClass 没有实现 {@link AVMessage} 接口则抛出异常
	   */


	  Realtime.prototype.register = function register(messageClass) {
	    return ensureArray(messageClass).map(this._messageParser.register.bind(this._messageParser));
	  };

	  /**
	   * 为 Conversation 定义一个新属性
	   * @since 3.2.0
	   * @static
	   * @param {String} prop 属性名
	   * @param {Object} [descriptor] 属性的描述符，参见 {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/getOwnPropertyDescriptor#Description getOwnPropertyDescriptor#Description - MDN}，默认为该属性名对应的 Conversation 自定义属性的 getter/setter
	   * @returns void
	   * @example
	   *
	   * conversation.get('type');
	   * conversation.set('type', 1);
	   *
	   * // equals to
	   * Realtime.defineConversationProperty('type');
	   * conversation.type;
	   * conversation.type = 1;
	   */


	  Realtime.defineConversationProperty = function defineConversationProperty(prop) {
	    var descriptor = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {
	      get: function get() {
	        return this.get(prop);
	      },
	      set: function set(value) {
	        this.set(prop, value);
	      }
	    };

	    _Object$defineProperty(Conversation.prototype, prop, descriptor);
	  };

	  return Realtime;
	}(index$6);

	var APP_ID = "Ol0Cw6zL1xP9IIqJpiSv9uYC" || 'anruhhk6visejjip57psvv5uuv8sggrzdfl9pg2bghgsiy35';

	var REGION = "us" || 'cn';
	var EXISTING_ROOM_ID = "5638313660b28815a724df31" || '559d08a1e4b0a35bc5062ba1';
	var SYS_CONV_ID = "57bdb5965e1072004edd532c" || '57bb170fc4c97100615298f7';
	var NON_EXISTING_ROOM_ID = '555555555555555555555555';
	var CLIENT_ID = process.env.CLIENT_ID || 'leeyeh';

	var createRealtime = function createRealtime(options) {
	  return new Realtime(_Object$assign({
	    appId: APP_ID,
	    region: REGION,
	    pushUnread: false
	  }, options));
	};

	describe('Realtime', function () {
	  describe('constructor', function () {
	    it('appId required', function () {
	      return function () {
	        return new Realtime();
	      }.should.throw();
	    });
	    it('normal', function () {
	      return function () {
	        return new Realtime({
	          appId: APP_ID
	        });
	      }.should.not.throw;
	    });
	  });
	  describe('_open/_close', function () {
	    it('connection should be reused', function () {
	      var realtime = createRealtime();
	      var firstConnection = void 0;
	      return realtime._open().then(function (connection) {
	        connection.should.be.a.instanceof(Connection);
	        firstConnection = connection;
	      }).then(function () {
	        return realtime._open();
	      }).then(function (connection) {
	        connection.should.be.exactly(firstConnection);
	        connection.close();
	      });
	    });
	    it('_close', function () {
	      var realtime = createRealtime();
	      return realtime._open().then(function (connection) {
	        asFunction(realtime._openPromise).not.be.undefined();
	        return connection;
	      }).then(function (connection) {
	        realtime._close();
	        return connection;
	      }).then(function (connection) {
	        asFunction(realtime._openPromise).be.undefined();
	        connection.current.should.be.equal('closed');
	      });
	    });
	    it('noBinary mode fallback', function () {
	      return createRealtime({
	        noBinary: true
	      }).createIMClient().then(function (client) {
	        return client.close();
	      });
	    });
	  });
	  describe('endpoints cache', function () {
	    it('_getEndpoints should use cache', function () {
	      var _fetchEndpointsInfo = sinon.stub(Realtime, '_fetchEndpointsInfo').returns(_Promise.resolve({
	        ttl: 1000
	      }));
	      var realtime = createRealtime();
	      return realtime._getEndpoints(realtime._options).then(function () {
	        _fetchEndpointsInfo.should.be.calledOnce();
	      }).then(function () {
	        return realtime._getEndpoints(realtime._options);
	      }).then(function () {
	        _fetchEndpointsInfo.should.be.calledOnce();
	        _fetchEndpointsInfo.restore();
	      });
	    });
	  });
	  it('_register/_deregister clients', function () {
	    var realtime = createRealtime();
	    var _disconnect = sinon.spy(realtime, '_close');
	    return realtime._open().then(function (connection) {
	      var a = new Client('a', connection);
	      var b = new Client('b', connection);
	      var c = new Client(undefined, connection);
	      realtime._register(a);
	      realtime._register(b);
	      (function () {
	        return realtime._register({});
	      }).should.throw();
	      (function () {
	        return realtime._register(c);
	      }).should.throw();
	      realtime._deregister(a);
	      _disconnect.should.not.be.called();
	      realtime._deregister(b);
	      _disconnect.should.be.calledOnce();
	      (function () {
	        return realtime._deregister({});
	      }).should.throw();
	      (function () {
	        return realtime._deregister(c);
	      }).should.throw();
	      _disconnect.restore();
	    });
	  });
	  describe('events', function () {
	    it('should proxy network events', function () {
	      var realtime = createRealtime();
	      return realtime._open().then(function (connection) {
	        var callbackPromise = _Promise.all(['retry', 'schedule', 'disconnect', 'reconnect'].map(function (event) {
	          return listen(realtime, event);
	        }));
	        connection.emit('disconnect');
	        connection.emit('retry', 1, 2);
	        connection.emit('schedule');
	        connection.emit('reconnect');
	        callbackPromise.then(function () {
	          return connection.close();
	        });
	        return callbackPromise.then(function (_ref) {
	          var _ref2 = _slicedToArray(_ref, 1);

	          var _ref2$ = _slicedToArray(_ref2[0], 2);

	          var retryPayload1 = _ref2$[0];
	          var retryPayload2 = _ref2$[1];

	          retryPayload1.should.equal(1);
	          retryPayload2.should.equal(2);
	        });
	      });
	    });
	  });
	  describe('register Message classes', function () {
	    var realtime = void 0;
	    before(function () {
	      realtime = createRealtime();
	    });
	    it('should except a Message Class', function () {
	      realtime.register(TextMessage);
	    });
	    it('should except an Array of Message Classes', function () {
	      realtime.register([TextMessage]);
	    });
	    it('should not except a Message Class', function () {
	      (function () {
	        return realtime.register({});
	      }).should.throw();
	    });
	  });
	  describe('retry', function () {
	    var realtime = void 0;
	    before(function () {
	      realtime = createRealtime();
	      return realtime._open();
	    });
	    after(function () {
	      return realtime._close();
	    });
	    it('should throw when not offline', function () {
	      (function () {
	        return createRealtime().retry();
	      }).should.throw();
	      (function () {
	        return realtime.retry();
	      }).should.throw();
	    });
	    it('should retry when offline', function () {
	      return realtime._open().then(function (connection) {
	        var promise = listen(realtime, 'disconnect', 'eroor');
	        connection.disconnect();
	        return promise;
	      }).then(function () {
	        realtime.retry();
	        return listen(realtime, 'reconnect', 'eroor');
	      });
	    });
	  });
	});

	describe('Connection', function () {
	  var client = void 0;
	  var connection = void 0;
	  before(function () {
	    return createRealtime().createIMClient().then(function (c) {
	      client = c;
	      connection = client._connection;
	      return connection.ping();
	    });
	  });
	  after(function () {
	    return connection.close();
	  });

	  it('ping', function () {
	    return connection.ping().then(function (resCommand) {
	      resCommand.cmd.should.be.equal(CommandType.echo);
	    });
	  });
	  it('send command error', function () {
	    return connection.send(new GenericCommand({
	      cmd: 'conv',
	      op: 'update',
	      peerId: client.id,
	      convMessage: new ConvCommand({
	        cid: NON_EXISTING_ROOM_ID
	      })
	    })).should.be.rejectedWith('CONVERSATION_UPDATE_REJECTED');
	  });
	  it('message dispatch', function () {
	    var clientMessageEventCallback = sinon.stub(client, '_dispatchMessage');
	    connection.emit('message', new GenericCommand({
	      cmd: 1
	    }));
	    connection.emit('message', new GenericCommand({
	      cmd: 1,
	      peerId: 'fake clientId'
	    }));
	    clientMessageEventCallback.should.not.be.called();
	    var validMessage = new GenericCommand({
	      cmd: 1,
	      peerId: client.id
	    });
	    connection.emit('message', validMessage);
	    return _Promise.resolve().then(function () {
	      clientMessageEventCallback.should.be.calledOnce();
	      clientMessageEventCallback.should.be.calledWith(validMessage);
	      clientMessageEventCallback.restore();
	    });
	  });
	});

	describe('IMClient', function () {
	  var client = void 0;
	  var realtime = void 0;
	  before(function () {
	    realtime = new Realtime({
	      appId: APP_ID,
	      region: REGION,
	      pushUnread: false
	    });
	    return realtime.createIMClient(CLIENT_ID).then(function (c) {
	      return client = c;
	    });
	  });

	  after(function () {
	    return realtime._close();
	  });

	  describe('create and close', function () {
	    it('normal create and close', function () {
	      var rt = new Realtime({
	        appId: APP_ID,
	        region: REGION,
	        pushUnread: false
	      });
	      var closeCallback = sinon.spy();
	      return _Promise.all([rt.createIMClient(42).should.be.rejected(), rt.createIMClient().then(function (client1) {
	        client1.should.be.instanceof(IMClient);
	        client1.id.should.be.a.String();
	        rt._clients.should.have.properties(client1.id);
	      }).then(function () {
	        return rt.createIMClient(CLIENT_ID);
	      }).then(function (client2) {
	        client2.on('close', closeCallback);
	        client2.id.should.be.equal(CLIENT_ID);
	        rt._clients.should.have.properties(CLIENT_ID);
	        return client2.close();
	      }).then(function () {
	        closeCallback.should.be.calledOnce();
	        rt._clients.should.not.have.properties(CLIENT_ID);
	        rt._close();
	      })]);
	    });

	    it('should be singleton', function () {
	      return realtime.createIMClient(CLIENT_ID).then(function (client1) {
	        return client1.should.be.exactly(client);
	      });
	    });

	    describe('with signatureFactory', function () {
	      it('normal case', function () {
	        var signatureFactory = sinon.stub().returns({
	          signature: 'signature',
	          timestamp: Date.now(),
	          nonce: 'nonce'
	        });
	        return realtime.createIMClient('ycui', {
	          signatureFactory: signatureFactory
	        }).then(function () {
	          signatureFactory.should.be.calledWith('ycui');
	        });
	      });
	    });

	    it('with tag', function (done) {
	      var ID = 'conflict-test-client';
	      realtime.createIMClient(ID, undefined, 'TEST').then(function (client1) {
	        client1.on('conflict', function () {
	          return done();
	        });
	        return new Realtime({
	          appId: APP_ID,
	          region: REGION,
	          pushUnread: false
	        }).createIMClient(ID, undefined, 'TEST').then(function (client2) {
	          return client2.close();
	        });
	      }).catch(done);
	    });
	  });

	  describe('ping', function () {
	    it('should throw if type check failed', function () {
	      (function () {
	        return client.ping('1');
	      }).should.throw();
	    });

	    it('should only return online clients', function () {
	      return client.ping(['non-exists-client-id', CLIENT_ID]).then(function (ids) {
	        ids.should.eql([CLIENT_ID]);
	      });
	    });

	    it('should not request if get an empty ids list', function () {
	      var send = sinon.spy(IMClient.prototype, '_send');
	      return client.ping([]).then(function (ids) {
	        ids.should.eql([]);
	        send.should.not.be.called();
	        send.restore();
	      });
	    });
	  });

	  describe('getConversation', function () {
	    it('param check', function () {
	      (function () {
	        return client.getConversation();
	      }).should.throw();
	      (function () {
	        return client.getConversation(1);
	      }).should.throw();
	    });
	    it('should return null if no match', function () {
	      return client.getConversation(NON_EXISTING_ROOM_ID).then(function (conversation) {
	        asFunction(conversation).be.null();
	      });
	    });
	    it('should match one conversation', function () {
	      return client.getConversation(EXISTING_ROOM_ID).then(function (conversation) {
	        conversation.should.be.instanceof(Conversation);
	        conversation.id.should.be.equal(EXISTING_ROOM_ID);
	        conversation.createdAt.should.be.a.Date();
	        conversation.updatedAt.should.be.a.Date();
	        conversation.lastMessageAt.should.be.a.Date();
	      });
	    });
	    it('should always return the same conversation instance', function () {
	      var anonymousClientConversatoin = void 0;
	      var originConversation = void 0;
	      return realtime.createIMClient().then(
	      // 使用匿名 client 创建一个对话
	      function (anonymousClient) {
	        return anonymousClient.createConversation({
	          members: [CLIENT_ID],
	          name: 'avoscloud'
	        });
	      }).then(function (conversation) {
	        // 查询这个对话
	        anonymousClientConversatoin = conversation;
	        return client.getConversation(conversation.id);
	      }).then(function (conversation) {
	        // 匿名 client 修改这个对话
	        originConversation = conversation;
	        return anonymousClientConversatoin.setName('leancloud').save();
	      }).then(
	      // 再查询，应该返回原始对话
	      function () {
	        return client.getConversation(anonymousClientConversatoin.id);
	      }).then(function (conversation) {
	        conversation.should.be.exactly(originConversation);
	        originConversation.name.should.be.eql('avoscloud');
	        // 设置 noCache 查询，应该返回更新过的原始对话
	        return client.getConversation(anonymousClientConversatoin.id, true);
	      }).then(function (conversation) {
	        conversation.should.be.exactly(originConversation);
	        originConversation.name.should.be.eql('leancloud');
	      });
	    });
	    // https://github.com/leancloud/js-realtime-sdk/issues/229
	    it('should update properties', function () {
	      return client.getQuery().equalTo('objectId', EXISTING_ROOM_ID).withLastMessagesRefreshed(true).find().then(function (conversations) {
	        conversations[0].lastMessage.should.be.instanceof(Message);
	        return client.getQuery().equalTo('objectId', EXISTING_ROOM_ID).withLastMessagesRefreshed(false).find();
	      }).then(function (conversations) {
	        conversations[0].lastMessage.should.be.instanceof(Message);
	      });
	    });
	  });

	  describe('createConversation', function () {
	    it('should create a conversation', function () {
	      return client.createConversation({
	        members: ['hjiang'],
	        name: '135',
	        attributes: {
	          foo: 'bar'
	        },
	        baz: 'qux'
	      }).then(function (conversation) {
	        conversation.should.be.instanceof(Conversation);
	        conversation.members.should.have.length(2);
	        conversation.members.should.containDeep(['hjiang', CLIENT_ID]);
	        conversation.createdAt.should.be.a.Date();
	        conversation.updatedAt.should.be.a.Date();
	        asFunction(conversation.lastMessageAt).be.null();
	        conversation.name.should.be.equal('135');
	        conversation.attributes.should.eql({ foo: 'bar' });
	        conversation.get('baz').should.eql('qux');
	      });
	    });
	    it('members required', function () {
	      (function () {
	        return client.createConversation();
	      }).should.throw();
	    });
	    it('unique', function () {
	      return _Promise.all([0, 0].map(function () {
	        return client.createConversation({
	          name: 'unique room',
	          members: ['hjiang', 'jfeng'],
	          unique: true
	        });
	      })).then(function (conversations) {
	        conversations[0].id.should.be.exactly(conversations[1].id);
	      });
	    });
	    it('transient', function () {
	      return client.createConversation({
	        name: 'transient room',
	        members: ['hjiang', 'jfeng'],
	        transient: true
	      }).then(function (conversation) {
	        conversation.members.should.be.empty();
	      });
	    });
	    it('members optional if transient', function () {
	      return client.createConversation({
	        name: 'transient room',
	        transient: true
	      });
	    });
	  });

	  describe('markAllAsRead', function () {
	    var conversation = void 0;
	    before(function () {
	      return client.getConversation(EXISTING_ROOM_ID).then(function (conv) {
	        return conversation = conv;
	      });
	    });
	    it('params check', function () {
	      (function () {
	        return client.markAllAsRead(conversation);
	      }).should.throw();
	      (function () {
	        return client.markAllAsRead([EXISTING_ROOM_ID]);
	      }).should.throw();
	      return client.markAllAsRead([]).should.be.fulfilledWith([]);
	    });
	    it('normal case', function () {
	      return client.markAllAsRead([conversation]).should.be.fulfilledWith([conversation]);
	    });
	  });

	  describe('session token', function () {
	    beforeEach(function setupSpy() {
	      this.spy = sinon.spy(client, '_open');
	    });
	    afterEach(function setupSpy() {
	      this.spy.restore();
	    });
	    it('reconnect with session token', function () {
	      var _this = this;

	      client._connection.disconnect();
	      return listen(client, 'reconnect').then(function () {
	        _this.spy.should.be.calledOnce();
	      });
	    });
	    it('session token expiration', function () {
	      var _this2 = this;

	      // Magic
	      internal(client).sessionToken._value = 'fake_session_token';
	      client._connection.disconnect();
	      return listen(client, 'reconnect').then(function () {
	        _this2.spy.should.be.calledTwice();
	      });
	    });
	  });
	});

	describe('Conversation', function () {
	  var realtime = void 0;
	  var client = void 0;
	  var conversation = void 0;
	  before(function () {
	    realtime = new Realtime({
	      appId: APP_ID,
	      region: REGION
	    });
	    return realtime.createIMClient(CLIENT_ID).then(function (c) {
	      client = c;
	      return client.getConversation(EXISTING_ROOM_ID);
	    }).then(function (conv) {
	      conversation = conv;
	      return conv.send(new TextMessage('42'));
	    });
	  });
	  after(function () {
	    return client.close();
	  });

	  it('defineConversationProperty', function () {
	    Realtime.defineConversationProperty('testProperty1');
	    conversation.set('testProperty1', 1);
	    conversation.testProperty1.should.eql(1);
	    Realtime.defineConversationProperty('testProperty2');
	    conversation.testProperty2 = 2;
	    conversation.get('testProperty2').should.eql(2);
	  });

	  it('system conversation', function () {
	    return client.getConversation(SYS_CONV_ID).then(function (conv) {
	      conv.system.should.be.equal(true);
	    });
	  });

	  it('update', function () {
	    var timestamp = Date.now();
	    var name = conversation.name;
	    return _Promise.resolve(conversation).then(function (conv) {
	      conv.name = name;
	      conv.attributes = {
	        timestamp: timestamp
	      };
	      return conv.save();
	    }).then(function (conv) {
	      conv.should.be.exactly(conversation);
	      conv.name.should.be.equal(name);
	      conv.attributes.should.be.eql({ timestamp: timestamp });
	      return conv.setAttributes({ lean: 'cloud' }, true).save();
	    }).then(function (conv) {
	      conv.name.should.be.equal(name);
	      conv.attributes.should.be.eql({
	        timestamp: timestamp,
	        lean: 'cloud'
	      });
	      return conv.setAttribute('lee', 'yeh').save();
	    }).then(function (conv) {
	      conv.name.should.be.equal(name);
	      conv.attributes.should.be.eql({
	        timestamp: timestamp,
	        lean: 'cloud',
	        lee: 'yeh'
	      });
	      return conv.fetch();
	    }).then(function (conv) {
	      conv.name.should.be.equal(name);
	      conv.attributes.should.be.eql({
	        timestamp: timestamp,
	        lean: 'cloud',
	        lee: 'yeh'
	      });
	    });
	  });

	  it('fetch', function () {
	    var _conversation = conversation;
	    var name = _conversation.name;
	    var createdAt = _conversation.createdAt;

	    conversation.name = 'should not be this name';
	    conversation.createdAt = new Date();
	    return conversation.fetch().then(function (conv) {
	      conv.name.should.be.equal(name);
	      conv.createdAt.should.be.eql(createdAt);
	      conv.should.be.exactly(conversation);
	    });
	  });

	  it('mute', function () {
	    return conversation.mute().then(function (conv) {
	      conv.should.be.exactly(conversation);
	      conv.muted.should.be.equal(true);
	      conv.mutedMembers.should.containEql(CLIENT_ID);
	    });
	  });
	  it('unmute', function () {
	    return conversation.unmute().then(function (conv) {
	      conv.should.be.exactly(conversation);
	      conv.muted.should.be.equal(false);
	      conv.mutedMembers.should.not.containEql(CLIENT_ID);
	    });
	  });
	  it('count', function () {
	    return conversation.count().should.be.fulfilledWith(2);
	  });
	  it('add/remove', function () {
	    return client.createConversation({ members: ['nsun'] }).then(function (conv) {
	      return conv.add('rguo');
	    }).then(function (conv) {
	      conv.members.should.containEql('rguo');
	      return conv.remove('rguo');
	    }).then(function (conv) {
	      conv.members.should.not.containEql('rguo');
	    });
	  });
	  it('join/quit', function () {
	    return client.createConversation({ members: ['rguo'] }).then(function (conv) {
	      return conv.quit();
	    }).then(function (conv) {
	      conv.members.should.not.containEql(CLIENT_ID);
	      return conv.join();
	    }).then(function (conv) {
	      conv.members.should.containEql(CLIENT_ID);
	    });
	  });

	  describe('converastion signature', function () {
	    beforeEach(function setupConversation() {
	      var _this = this;

	      this.conversationSignatureFactory = sinon.stub().returns({
	        signature: 'signature',
	        timestamp: Date.now(),
	        nonce: 'nonce'
	      });
	      return realtime.createIMClient('ycui', {
	        conversationSignatureFactory: this.conversationSignatureFactory
	      }).then(function (c) {
	        _this.ycui = c;
	        return c.createConversation({
	          members: ['zwang', 'dli', 'zwang'] });
	      }).then(function (conv) {
	        return _this.conversation = conv;
	      });
	    });
	    afterEach(function cleanup() {
	      return this.ycui.close();
	    });
	    it('create', function createAsserts() {
	      this.conversationSignatureFactory.should.be.calledWith(null, 'ycui', ['dli', 'ycui', 'zwang'], 'create');
	    });
	    it('add', function addAsserts() {
	      var _this2 = this;

	      return this.conversation.add(['wduan', 'jwu']).then(function () {
	        _this2.conversationSignatureFactory.getCall(1).args.should.be.eql([_this2.conversation.id, 'ycui', ['jwu', 'wduan'], 'add']);
	      });
	    });
	    it('remove', function removeAsserts() {
	      var _this3 = this;

	      return this.conversation.quit().then(function () {
	        _this3.conversationSignatureFactory.getCall(1).args.should.be.eql([_this3.conversation.id, 'ycui', ['ycui'], 'remove']);
	      });
	    });
	  });

	  describe('Message Query', function () {
	    it('queryMessages', function () {
	      return conversation.queryMessages().then(function (messages) {
	        messages.should.be.an.Array();
	        messages[0].should.be.instanceof(Message);
	        messages[0].status.should.be.eql(MessageStatus.SENT);
	      });
	    });
	    it('with limit', function () {
	      return conversation.queryMessages({
	        limit: 0
	      }).then(function (messages) {
	        messages.should.be.an.empty();
	      });
	    });
	    it('beforeTime', function () {
	      return conversation.queryMessages({
	        beforeTime: 1
	      }).then(function (messages) {
	        messages.should.be.an.empty();
	      });
	    });
	    it('afterTime', function () {
	      return conversation.queryMessages({
	        afterTime: new Date()
	      }).then(function (messages) {
	        messages.should.be.an.empty();
	      });
	    });
	    describe('MessageIterator', function () {
	      it('normal case', function () {
	        var iterator = conversation.createMessagesIterator({
	          limit: 2
	        });
	        return _Promise.all([iterator.next(), iterator.next()]).then(function (_ref) {
	          var _ref2 = _slicedToArray(_ref, 2);

	          var page1 = _ref2[0];
	          var page2 = _ref2[1];

	          page1.value.should.be.an.Array();
	          page1.value.length.should.eql(2);
	          page1.done.should.eql(false);
	          page2.value.should.be.an.Array();
	          var minMessageTimestamp = Math.min(page1.value[0].timestamp, page1.value[1].timestamp);
	          page2.value[0].timestamp.should.lessThan(minMessageTimestamp);
	        });
	      });
	      // https://github.com/leancloud/js-realtime-sdk/issues/240
	      it('result should be a copy', function () {
	        var iterator = conversation.createMessagesIterator({
	          limit: 2
	        });
	        var minMessageTimestamp = void 0;
	        return iterator.next().then(function (page1) {
	          minMessageTimestamp = Math.min(page1.value[0].timestamp, page1.value[1].timestamp);
	          page1.value.splice(0);
	          return iterator.next();
	        }).then(function (page2) {
	          page2.value[0].timestamp.should.lessThan(minMessageTimestamp);
	        });
	      });
	    });
	  });

	  describe('message dispatch', function () {
	    var client2 = void 0;
	    var conversation2 = void 0;
	    var CLIENT_ID_2 = Date.now().toString();
	    before(function () {
	      return realtime.createIMClient(CLIENT_ID_2).then(tap(function (c) {
	        return client2 = c;
	      })).then(function (c) {
	        return c.createConversation({
	          members: ['xwang', 'csun'],
	          name: 'message dispatch test conversation'
	        });
	      }).then(function (c) {
	        return conversation2 = c;
	      });
	    });
	    after(function () {
	      return client2.close();
	    });
	    it('membersjoined', function () {
	      var clientCallback = sinon.spy();
	      client2.on('membersjoined', clientCallback);
	      var conversationCallback = sinon.spy();
	      conversation2.on('membersjoined', conversationCallback);
	      return client2._dispatchMessage(new GenericCommand({
	        cmd: 'conv',
	        op: 'members_joined',
	        peerId: CLIENT_ID_2,
	        convMessage: new ConvCommand({
	          cid: conversation2.id,
	          m: ['lan'],
	          initBy: CLIENT_ID
	        })
	      })).then(function () {
	        clientCallback.should.be.calledOnce();
	        clientCallback.getCall(0).args[0].should.be.containEql({
	          invitedBy: CLIENT_ID,
	          members: ['lan']
	        });
	        clientCallback.getCall(0).args[1].should.be.exactly(conversation2);
	        conversationCallback.should.be.calledOnce();
	        conversationCallback.getCall(0).args[0].should.be.containEql({
	          invitedBy: CLIENT_ID,
	          members: ['lan']
	        });
	        conversation2.members.should.containEql('lan');
	      });
	    });
	    it('membersleft', function () {
	      var clientCallback = sinon.spy();
	      client2.on('membersleft', clientCallback);
	      var conversationCallback = sinon.spy();
	      conversation2.on('membersleft', conversationCallback);
	      return client2._dispatchMessage(new GenericCommand({
	        cmd: 'conv',
	        op: 'members_left',
	        peerId: CLIENT_ID_2,
	        convMessage: new ConvCommand({
	          cid: conversation2.id,
	          m: ['lan'],
	          initBy: CLIENT_ID
	        })
	      })).then(function () {
	        clientCallback.should.be.calledOnce();
	        clientCallback.getCall(0).args[0].should.be.containEql({
	          kickedBy: CLIENT_ID,
	          members: ['lan']
	        });
	        clientCallback.getCall(0).args[1].should.be.exactly(conversation2);
	        conversationCallback.should.be.calledOnce();
	        conversationCallback.getCall(0).args[0].should.be.containEql({
	          kickedBy: CLIENT_ID,
	          members: ['lan']
	        });
	        conversation2.members.should.not.containEql('lan');
	      });
	    });
	    it('kicked', function () {
	      var clientCallback = sinon.spy();
	      client2.on('kicked', clientCallback);
	      var conversationCallback = sinon.spy();
	      conversation2.on('kicked', conversationCallback);
	      return client2._dispatchMessage(new GenericCommand({
	        cmd: 'conv',
	        op: 'left',
	        peerId: CLIENT_ID_2,
	        convMessage: new ConvCommand({
	          cid: conversation2.id,
	          initBy: CLIENT_ID
	        })
	      })).then(function () {
	        clientCallback.should.be.calledOnce();
	        clientCallback.getCall(0).args[0].should.be.eql({
	          kickedBy: CLIENT_ID
	        });
	        clientCallback.getCall(0).args[1].should.be.exactly(conversation2);
	        conversationCallback.should.be.calledOnce();
	        conversationCallback.getCall(0).args[0].should.be.eql({
	          kickedBy: CLIENT_ID
	        });
	        conversation2.members.should.not.containEql(CLIENT_ID_2);
	      });
	    });
	    it('invited', function () {
	      var callback = sinon.spy();
	      client2.on('invited', callback);
	      var conversationCallback = sinon.spy();
	      conversation2.on('invited', conversationCallback);
	      return client2._dispatchMessage(new GenericCommand({
	        cmd: 'conv',
	        op: 'joined',
	        peerId: CLIENT_ID_2,
	        convMessage: new ConvCommand({
	          cid: conversation2.id,
	          initBy: CLIENT_ID
	        })
	      })).then(function () {
	        callback.should.be.calledOnce();
	        callback.getCall(0).args[0].should.be.eql({
	          invitedBy: CLIENT_ID
	        });
	        callback.getCall(0).args[1].should.be.exactly(conversation2);
	        conversationCallback.should.be.calledOnce();
	        conversationCallback.getCall(0).args[0].should.be.containEql({
	          invitedBy: CLIENT_ID
	        });
	        conversation2.members.should.containEql(CLIENT_ID_2);
	      });
	    });
	  });

	  it('unreadmessages event and markAsRead', function () {
	    var bwangId = uuid.v4();
	    var bwang0 = void 0;
	    var conversationId = void 0;
	    var message = new Message({});
	    return realtime.createIMClient().then(function (jwu) {
	      return jwu.createConversation({
	        members: [bwangId]
	      }).then(function (conv) {
	        conversationId = conv.id;
	        // 这里连续发 3 条消息，conv.lm 可能不会被更新为最后一条消息
	        // 发送 read 命令时如果用 conv.lm 可能会导致漏标消息
	        return _Promise.all([conv.send(new Message({})), conv.send(new Message({}))]).then(function () {
	          return conv.send(message);
	        });
	      }).then(tap(function () {
	        return jwu.close();
	      }));
	    }).then(function () {
	      return new Realtime({
	        appId: APP_ID,
	        region: REGION
	      }).createIMClient(bwangId);
	    }).then(function (c) {
	      bwang0 = c;
	      return listen(bwang0, 'unreadmessages').then(function (_ref3) {
	        var _ref4 = _slicedToArray(_ref3, 2);

	        var payload = _ref4[0];
	        var conv = _ref4[1];

	        payload.count.should.be.eql(3);
	        payload.lastMessageId.should.be.eql(message.id);
	        payload.lastMessageTimestamp.should.be.eql(message.timestamp);
	        conv.unreadMessagesCount.should.eql(3);
	        conv.id.should.be.eql(conversationId);
	      });
	    }).then(function () {
	      return realtime.createIMClient(bwangId);
	    }).then(function (bwang1) {
	      return listen(bwang1, 'unreadmessages').then(function (_ref5) {
	        var _ref6 = _slicedToArray(_ref5, 2);

	        var payload = _ref6[0];
	        var conv = _ref6[1];

	        payload.count.should.be.eql(3);
	        conv.id.should.be.eql(conversationId);
	        return conv.markAsRead().then(function (conv1) {
	          conv1.unreadMessagesCount.should.be.eql(0);
	          bwang1.close();
	        });
	      });
	    }).then(function () {
	      return listen(bwang0, 'unreadmessages').then(function (_ref7) {
	        var _ref8 = _slicedToArray(_ref7, 2);

	        var payload = _ref8[0];
	        var conv = _ref8[1];

	        payload.count.should.be.eql(0);
	        conv.id.should.be.eql(conversationId);
	      });
	    }).then(function () {
	      bwang0.close();
	    });
	  });

	  it('online status', function () {
	    var jfengId = uuid.v4();
	    var conversationId = void 0;
	    return realtime.createIMClient(jfengId).then(function (jfeng) {
	      return jfeng.createConversation({
	        members: [CLIENT_ID]
	      }).then(function (conv) {
	        conversationId = conv.id;
	        return conv.updateOnlineStatusPolicy({
	          pub: true,
	          sub: true
	        });
	      }).then(function () {
	        return client.getConversation(conversationId).then(function (conv) {
	          return conv.updateOnlineStatusPolicy({
	            sub: true
	          }).then(function () {
	            return listen(conv, 'membersstatuschange');
	          }).then(function (_ref9) {
	            var _ref10 = _slicedToArray(_ref9, 1);

	            var _ref10$ = _ref10[0];
	            var members = _ref10$.members;
	            var status = _ref10$.status;

	            members.should.eql([jfengId]);
	            status.should.eql(OnlineStatus.ONLINE);
	            jfeng.close();
	            return listen(conv, 'membersstatuschange');
	          }).then(function (_ref11) {
	            var _ref12 = _slicedToArray(_ref11, 1);

	            var _ref12$ = _ref12[0];
	            var members = _ref12$.members;
	            var status = _ref12$.status;

	            members.should.eql([jfengId]);
	            status.should.eql(OnlineStatus.OFFLINE);
	            realtime.createIMClient(jfengId);
	            return listen(conv, 'membersstatuschange');
	          }).then(function (_ref13) {
	            var _ref14 = _slicedToArray(_ref13, 1);

	            var _ref14$ = _ref14[0];
	            var members = _ref14$.members;
	            var status = _ref14$.status;

	            members.should.eql([jfengId]);
	            status.should.eql(OnlineStatus.ONLINE);
	            return jfeng.close();
	          });
	        });
	      });
	    });
	  });
	});

	describe('ConversationQuery', function () {
	  // divided to 2 parts since there is query quota for every single client
	  describe('part1', function () {
	    var client = void 0;
	    before(function () {
	      return new Realtime({
	        appId: APP_ID,
	        region: REGION,
	        pushUnread: false
	      }).createIMClient().then(function (c) {
	        return client = c;
	      });
	    });
	    after(function () {
	      return client.close();
	    });

	    it('_calculateFlag', function () {
	      var calculate = ConversationQuery._calculateFlag;
	      calculate({}).should.be.equal(0);
	      calculate({
	        compact: true,
	        withLastMessagesRefreshed: true
	      }).should.be.equal(3);
	    });
	    it('should be a ConversationQuery', function () {
	      client.getQuery().should.be.instanceof(ConversationQuery);
	    });
	    it('equalTo', function () {
	      return client.getQuery().equalTo('objectId', EXISTING_ROOM_ID).find().then(function (conversations) {
	        conversations.length.should.be.equal(1);
	        conversations[0].id.should.be.equal(EXISTING_ROOM_ID);
	      });
	    });
	    it('containsMembers', function () {
	      return _Promise.all([client.getQuery().equalTo('objectId', EXISTING_ROOM_ID).containsMembers(['hjiang']).find().then(function (conversations) {
	        conversations.length.should.be.equal(1);
	        conversations[0].id.should.be.equal(EXISTING_ROOM_ID);
	      }), client.getQuery().equalTo('objectId', EXISTING_ROOM_ID).containsMembers(['nobody']).find().then(function (conversations) {
	        conversations.length.should.be.equal(0);
	      })]);
	    });
	    it('withMembers', function () {
	      return _Promise.all([client.getQuery().equalTo('objectId', EXISTING_ROOM_ID).withMembers(['hjiang', 'leeyeh'], true).find().then(function (conversations) {
	        conversations.length.should.be.equal(0);
	      }), client.getQuery().equalTo('objectId', EXISTING_ROOM_ID).withMembers(['hjiang', 'leeyeh']).find().then(function (conversations) {
	        conversations.length.should.be.equal(1);
	        conversations[0].id.should.be.equal(EXISTING_ROOM_ID);
	      }), client.getQuery().equalTo('objectId', EXISTING_ROOM_ID).withMembers(['hjiang']).find().then(function (conversations) {
	        conversations.length.should.be.equal(0);
	      })]);
	    });
	    it('notEqualTo', function () {
	      return _Promise.all([client.getQuery().equalTo('objectId', EXISTING_ROOM_ID).notEqualTo('name', 'not-this-name').find().then(function (conversations) {
	        conversations.length.should.be.equal(1);
	        conversations[0].id.should.be.equal(EXISTING_ROOM_ID);
	      }), client.getQuery().equalTo('objectId', EXISTING_ROOM_ID).notEqualTo('name', 'js-realtime-sdk-testconv').find().then(function (conversations) {
	        conversations.length.should.be.equal(0);
	      })]);
	    });
	    it('matches', function () {
	      return _Promise.all([client.getQuery().equalTo('objectId', EXISTING_ROOM_ID).matches('name', /REALTIME-SDK/i).find().then(function (conversations) {
	        conversations.length.should.be.equal(1);
	        conversations[0].id.should.be.equal(EXISTING_ROOM_ID);
	      }), client.getQuery().equalTo('objectId', EXISTING_ROOM_ID).matches('name', /REALTIME-SDK/).find().then(function (conversations) {
	        conversations.length.should.be.equal(0);
	      })]);
	    });
	    it('contains', function () {
	      return _Promise.all([client.getQuery().equalTo('objectId', EXISTING_ROOM_ID).contains('name', 'realtime-sdk').find().then(function (conversations) {
	        conversations.length.should.be.equal(1);
	        conversations[0].id.should.be.equal(EXISTING_ROOM_ID);
	      }), client.getQuery().equalTo('objectId', EXISTING_ROOM_ID).contains('name', 'REALTIME-SDK').find().then(function (conversations) {
	        conversations.length.should.be.equal(0);
	      })]);
	    });
	    it('startsWith', function () {
	      return _Promise.all([client.getQuery().equalTo('objectId', EXISTING_ROOM_ID).startsWith('name', 'js-realtime').find().then(function (conversations) {
	        conversations.length.should.be.equal(1);
	        conversations[0].id.should.be.equal(EXISTING_ROOM_ID);
	      }), client.getQuery().equalTo('objectId', EXISTING_ROOM_ID).startsWith('name', 'JS-REALTIME').find().then(function (conversations) {
	        conversations.length.should.be.equal(0);
	      })]);
	    });
	    it('endsWith', function () {
	      return _Promise.all([client.getQuery().equalTo('objectId', EXISTING_ROOM_ID).endsWith('name', 'testconv').find().then(function (conversations) {
	        conversations.length.should.be.equal(1);
	        conversations[0].id.should.be.equal(EXISTING_ROOM_ID);
	      }), client.getQuery().equalTo('objectId', EXISTING_ROOM_ID).endsWith('name', 'TESTCONV').find().then(function (conversations) {
	        conversations.length.should.be.equal(0);
	      })]);
	    });
	  });

	  describe('part2', function () {
	    var client = void 0;
	    before(function () {
	      return new Realtime({
	        appId: APP_ID,
	        region: REGION,
	        pushUnread: false
	      }).createIMClient().then(function (c) {
	        return client = c;
	      });
	    });
	    after(function () {
	      return client.close();
	    });

	    it('lessThan', function () {
	      return _Promise.all([client.getQuery().equalTo('objectId', EXISTING_ROOM_ID).lessThan('createdAt', new Date()).find().then(function (conversations) {
	        conversations.length.should.be.equal(1);
	        conversations[0].id.should.be.equal(EXISTING_ROOM_ID);
	      }), client.getQuery().equalTo('objectId', EXISTING_ROOM_ID).lessThan('createdAt', new Date(0)).find().then(function (conversations) {
	        conversations.length.should.be.equal(0);
	      })]);
	    });
	    it('lessThanOrEqualTo', function () {
	      return _Promise.all([client.getQuery().equalTo('objectId', EXISTING_ROOM_ID).lessThanOrEqualTo('createdAt', new Date()).find().then(function (conversations) {
	        conversations.length.should.be.equal(1);
	        conversations[0].id.should.be.equal(EXISTING_ROOM_ID);
	      }), client.getQuery().equalTo('objectId', EXISTING_ROOM_ID).lessThanOrEqualTo('createdAt', new Date(0)).find().then(function (conversations) {
	        conversations.length.should.be.equal(0);
	      })]);
	    });
	    it('greaterThan', function () {
	      return _Promise.all([client.getQuery().equalTo('objectId', EXISTING_ROOM_ID).greaterThan('createdAt', new Date(0)).find().then(function (conversations) {
	        conversations.length.should.be.equal(1);
	        conversations[0].id.should.be.equal(EXISTING_ROOM_ID);
	      }), client.getQuery().equalTo('objectId', EXISTING_ROOM_ID).greaterThan('createdAt', new Date()).find().then(function (conversations) {
	        conversations.length.should.be.equal(0);
	      })]);
	    });
	    it('greaterThanOrEqualTo', function () {
	      return _Promise.all([client.getQuery().equalTo('objectId', EXISTING_ROOM_ID).greaterThanOrEqualTo('createdAt', new Date(0)).find().then(function (conversations) {
	        conversations.length.should.be.equal(1);
	        conversations[0].id.should.be.equal(EXISTING_ROOM_ID);
	      }), client.getQuery().equalTo('objectId', EXISTING_ROOM_ID).greaterThanOrEqualTo('createdAt', new Date()).find().then(function (conversations) {
	        conversations.length.should.be.equal(0);
	      })]);
	    });
	    it('limit', function () {
	      return client.getQuery().equalTo('objectId', EXISTING_ROOM_ID).limit(0).find().then(function (conversations) {
	        return conversations.length.should.be.equal(0);
	      });
	    });
	    it('skip', function () {
	      return client.getQuery().equalTo('objectId', EXISTING_ROOM_ID).skip(1).find().then(function (conversations) {
	        return conversations.length.should.be.equal(0);
	      });
	    });
	    it('ascending', function () {
	      return client.getQuery().limit(2).notEqualTo('objectId', '0').ascending('createdAt').find().then(function (_ref) {
	        var _ref2 = _slicedToArray(_ref, 2);

	        var conversation0 = _ref2[0];
	        var conversation1 = _ref2[1];
	        return conversation0.createdAt.should.below(conversation1.createdAt);
	      });
	    });
	    it('descending', function () {
	      return client.getQuery().limit(2).notEqualTo('objectId', '0').descending('createdAt').find().then(function (_ref3) {
	        var _ref4 = _slicedToArray(_ref3, 2);

	        var conversation0 = _ref4[0];
	        var conversation1 = _ref4[1];
	        return conversation0.createdAt.should.above(conversation1.createdAt);
	      });
	    });
	    it('addAscending & addDescending', function () {
	      return client.getQuery().addAscending('a').addAscending('b').addDescending('c').addDescending('d').toJSON().sort.should.be.eql('a,b,-c,-d');
	    });
	    it('compact', function () {
	      return client.getQuery().equalTo('objectId', EXISTING_ROOM_ID).compact(true).find().then(function (conversations) {
	        conversations.length.should.be.equal(1);
	        conversations[0].members.length.should.be.equal(0);
	      });
	    });
	    it('withLastMessagesRefreshed', function () {
	      return client.getQuery().equalTo('objectId', EXISTING_ROOM_ID).withLastMessagesRefreshed().find().then(function (conversations) {
	        conversations.length.should.be.equal(1);
	        var message = conversations[0].lastMessage;
	        message.should.be.instanceof(Message);
	        message.from.should.be.ok();
	        message.id.should.be.ok();
	        message.timestamp.should.be.ok();
	        message.status.should.be.eql(MessageStatus.SENT);
	      });
	    });
	    it('withLastMessages should be proxied', function () {
	      var spy = sinon.spy(ConversationQuery.prototype, 'withLastMessagesRefreshed');
	      client.getQuery().withLastMessages(true);
	      spy.should.be.calledWith(true);
	      spy.restore();
	    });
	    it('should use cache', function () {
	      return _Promise.all([client.getQuery().equalTo('objectId', EXISTING_ROOM_ID).find().then(function (conversations) {
	        return conversations[0];
	      }), client.getQuery().equalTo('objectId', EXISTING_ROOM_ID).find().then(function (conversations) {
	        return conversations[0];
	      })]).then(function (conversations) {
	        conversations[0].should.be.exactly(conversations[1]);
	      });
	    });
	  });
	});

	var _dec$2;
	var _dec2;
	var _class$4;

	var CustomMessage = (_dec$2 = messageType(1), _dec2 = messageField('foo'), _dec$2(_class$4 = _dec2(_class$4 = IE10Compatible(_class$4 = function (_TypedMessage) {
	  _inherits(CustomMessage, _TypedMessage);

	  function CustomMessage(foo) {
	    _classCallCheck(this, CustomMessage);

	    var _this = _possibleConstructorReturn(this, _TypedMessage.call(this));

	    _this.foo = foo;
	    return _this;
	  }

	  return CustomMessage;
	}(TypedMessage)) || _class$4) || _class$4) || _class$4);


	describe('Messages', function () {
	  describe('helpers', function () {
	    describe('messageType', function () {
	      it('param type check', function () {
	        (function () {
	          return messageType();
	        }).should.throw();
	        (function () {
	          return messageType('1');
	        }).should.throw();
	        (function () {
	          return messageType(1);
	        }).should.not.throw();
	      });
	    });
	    describe('messageField', function () {
	      it('param type check', function () {
	        (function () {
	          return messageField();
	        }).should.throw();
	        (function () {
	          return messageField(1);
	        }).should.throw();
	        (function () {
	          return messageField('1');
	        }).should.not.throw();
	        (function () {
	          return messageField([1]);
	        }).should.throw();
	        (function () {
	          return messageField(['1']);
	        }).should.not.throw();
	      });
	    });
	  });

	  describe('message status', function () {
	    before(function () {
	      this.message = new Message();
	    });
	    it('should default to none', function () {
	      this.message.status.should.eql(MessageStatus.NONE);
	    });
	    it('should be readonly', function () {
	      var _this2 = this;

	      (function () {
	        _this2.message.status = MessageStatus.SENT;
	      }).should.throw();
	    });
	    it('_setStatus should work', function () {
	      this.message._setStatus(MessageStatus.SENT);
	      this.message.status.should.eql(MessageStatus.SENT);
	    });
	    it('_setStatus should only accept MessageStatus', function () {
	      var _this3 = this;

	      (function () {
	        return _this3.message._setStatus(0);
	      }).should.throw(/Invalid/);
	    });
	  });

	  describe('TextMessage', function () {
	    it('param check', function () {
	      (function () {
	        return new TextMessage({});
	      }).should.throw(TypeError);
	    });
	    it('message type should be readonly', function () {
	      var message = new TextMessage('');
	      message.type.should.eql(-1);
	      (function () {
	        return message.type = 0;
	      }).should.throw();
	    });
	    it('parse and toJSON', function () {
	      var json = {
	        _lctext: 'leancloud',
	        _lcattrs: {
	          lean: 'cloud'
	        },
	        _lctype: -1
	      };
	      var message = new TextMessage(json._lctext).setAttributes(json._lcattrs);
	      message.toJSON().should.eql(json);
	      var parsedMessage = TextMessage.parse(json);
	      parsedMessage.should.be.instanceof(TextMessage);
	      parsedMessage.getText().should.eql(json._lctext);
	      parsedMessage.getAttributes().should.eql(json._lcattrs);
	      parsedMessage.toJSON().should.eql(json);
	    });
	  });

	  describe('CustomMessage', function () {
	    it('parse and toJSON', function () {
	      var json = {
	        _lctext: 'leancloud',
	        _lcattrs: {
	          lean: 'cloud'
	        },
	        _lctype: 1,
	        foo: 'bar'
	      };
	      var message = new CustomMessage(json.foo).setText('leancloud').setAttributes(json._lcattrs);
	      message.toJSON().should.eql(json);
	      var parsedMessage = CustomMessage.parse(json);
	      parsedMessage.should.be.instanceof(CustomMessage);
	      parsedMessage.getText().should.eql(json._lctext);
	      parsedMessage.getAttributes().should.eql(json._lcattrs);
	      parsedMessage.foo.should.eql(json.foo);
	      parsedMessage.toJSON().should.eql(json);
	    });
	  });

	  describe('sending messages', function () {
	    // let realtime;
	    var wchen = void 0;
	    var zwang = void 0;
	    var conversationWchen = void 0;
	    var conversationZwang = void 0;
	    before(function () {
	      var realtime = new Realtime({
	        appId: APP_ID,
	        region: REGION,
	        pushUnread: false
	      });
	      return _Promise.all([realtime.createIMClient(), realtime.createIMClient()]).then(function (clients) {
	        var _clients = _slicedToArray(clients, 2);

	        wchen = _clients[0];
	        zwang = _clients[1];

	        return wchen.createConversation({
	          members: [zwang.id],
	          name: 'message test conversation'
	        });
	      }).then(function (conversation) {
	        conversationWchen = conversation;
	        return zwang.getConversation(conversation.id);
	      }).then(function (conversation) {
	        conversationZwang = conversation;
	      });
	    });

	    after(function () {
	      return _Promise.all([wchen.close(), zwang.close()]);
	    });

	    it('sending message', function () {
	      var message = new Message('hello');
	      var promise = _Promise.all([listen(conversationZwang, 'message'), listen(zwang, 'message'), conversationWchen.send(message)]).then(function (messages) {
	        var _messages = _slicedToArray(messages, 3);

	        var _messages$ = _slicedToArray(_messages[0], 1);

	        var receivedMessage = _messages$[0];

	        var _messages$2 = _slicedToArray(_messages[1], 2);

	        var clientReceivedMessage = _messages$2[0];
	        var clientReceivedConversation = _messages$2[1];
	        var sentMessage = _messages[2];

	        sentMessage.status.should.eql(MessageStatus.SENT);
	        receivedMessage.id.should.eql(sentMessage.id);
	        receivedMessage.content.should.eql(sentMessage.content);
	        receivedMessage.status.should.eql(MessageStatus.SENT);
	        clientReceivedMessage.id.should.eql(sentMessage.id);
	        clientReceivedConversation.id.should.eql(conversationWchen.id);
	        conversationZwang.lastMessage.content.should.eql(sentMessage.content);
	        conversationWchen.lastMessage.content.should.eql(sentMessage.content);
	        conversationZwang.unreadMessagesCount.should.eql(1);
	      });
	      message.status.should.eql(MessageStatus.SENDING);
	      return promise;
	    });
	    it('sending typed message', function () {
	      var receivePromise = listen(conversationZwang, 'message');
	      var sendPromise = conversationWchen.send(new TextMessage('hello').setAttributes({
	        leancloud: 'rocks'
	      }));
	      return _Promise.all([receivePromise, sendPromise]).then(function (messages) {
	        var _messages2 = _slicedToArray(messages, 2);

	        var _messages2$ = _slicedToArray(_messages2[0], 1);

	        var receivedMessage = _messages2$[0];
	        var sentMessage = _messages2[1];

	        receivedMessage.id.should.be.equal(sentMessage.id);
	        receivedMessage.getText().should.eql(sentMessage.getText());
	        receivedMessage.getAttributes().should.eql(sentMessage.getAttributes());
	      });
	    });
	    it('sending transient message', function () {
	      var message = new TextMessage('transient message');
	      message.setTransient(true);
	      // transient message 不返回 ack
	      // 这里确保成功 resolve
	      return conversationZwang.send(message).then(function (msg) {
	        msg.should.be.instanceof(Message);
	        msg.status.should.eql(MessageStatus.SENT);
	      });
	    });
	    it('receipt', function () {
	      var message = new TextMessage('message needs receipt');
	      var receiptPromise = listen(conversationZwang, 'receipt');
	      message.setNeedReceipt(true);
	      return conversationZwang.send(message).then(function () {
	        return receiptPromise;
	      }).then(function () {
	        message.status.should.eql(MessageStatus.DELIVERED);
	        message.deliveredAt.should.be.Date();
	      });
	    });
	    it('errors', function () {
	      (function () {
	        return conversationWchen.send('1');
	      }).should.throw(/not a Message/);
	      var message = new Message('hello');
	      return wchen.getConversation(EXISTING_ROOM_ID).then(function (conversation) {
	        return conversation.send(message);
	      }).should.be.rejectedWith(Error, {
	        message: 'INVALID_MESSAGING_TARGET',
	        code: ErrorCode.INVALID_MESSAGING_TARGET
	      }).then(function () {
	        message.status.should.eql(MessageStatus.FAILED);
	      });
	    });
	  });
	});

	var _dec$3;
	var _class$5;

	var PluginDefinedMessage = (_dec$3 = messageType(1), _dec$3(_class$5 = function (_TypedMessage) {
	  _inherits(PluginDefinedMessage, _TypedMessage);

	  function PluginDefinedMessage() {
	    _classCallCheck(this, PluginDefinedMessage);

	    return _possibleConstructorReturn(this, _TypedMessage.apply(this, arguments));
	  }

	  return PluginDefinedMessage;
	}(TypedMessage)) || _class$5);


	var patchTestFunction = function patchTestFunction() {
	  var value = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
	  var fnName = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'test';
	  return function (target) {
	    target[fnName] = function () {
	      return value;
	    };
	  };
	};

	describe('Plugin', function () {
	  describe('normal use case', function () {
	    var client = void 0;
	    var realtime = void 0;
	    before(function () {
	      realtime = new Realtime({
	        appId: APP_ID,
	        region: REGION,
	        pushUnread: false,
	        plugins: [{
	          messageClasses: [PluginDefinedMessage],
	          onRealtimeCreate: patchTestFunction(),
	          onIMClientCreate: patchTestFunction(),
	          onConversationCreate: patchTestFunction(),
	          beforeMessageParse: function beforeMessageParse(json) {
	            return _Object$assign({}, json, {
	              _lctext: '[plugin-test]' + json._lctext
	            });
	          },
	          afterMessageParse: function afterMessageParse(message) {
	            message.foo = 'bar';
	            return message;
	          }
	        }]
	      });
	      return realtime.createIMClient(CLIENT_ID).then(function (c) {
	        return client = c;
	      });
	    });

	    after(function () {
	      return client.close();
	    });

	    it('should work', function () {
	      realtime.test().should.be.ok();
	      return realtime._messageParser.parse(new PluginDefinedMessage().toJSON()).then(function (message) {
	        return message.should.be.instanceof(PluginDefinedMessage);
	      }).then(function () {
	        client.test().should.be.ok();
	        return client.getConversation(EXISTING_ROOM_ID);
	      }).then(function (conversation) {
	        conversation.test().should.be.ok();
	        return conversation.createMessagesIterator({
	          limit: 1
	        }).next();
	      }).then(function (_ref) {
	        var _ref$value = _slicedToArray(_ref.value, 1);

	        var message = _ref$value[0];

	        message.text.should.startWith('[plugin-test]');
	        message.foo.should.be.eql('bar');
	      });
	    });
	  });

	  describe('multi plugins with async middleware', function () {
	    var client = void 0;
	    var realtime = void 0;
	    before(function () {
	      realtime = new Realtime({
	        appId: APP_ID,
	        region: REGION,
	        pushUnread: false,
	        plugins: [{
	          onRealtimeCreate: patchTestFunction(1),
	          beforeMessageParse: function beforeMessageParse(json) {
	            return _Object$assign({}, json, {
	              _lctext: '[plugin-test]' + json._lctext
	            });
	          }
	        }, {
	          onRealtimeCreate: patchTestFunction(2),
	          beforeMessageParse: function beforeMessageParse(json) {
	            return _Object$assign({}, json, {
	              _lctext: json._lctext + '[plugin-test]'
	            });
	          }
	        }, {
	          onRealtimeCreate: patchTestFunction(1, 'test2'),
	          beforeMessageParse: hold(200)
	        }]
	      });
	      return realtime.createIMClient(CLIENT_ID).then(function (c) {
	        return client = c;
	      });
	    });

	    after(function () {
	      return client.close();
	    });

	    it('decorators should be applied in order', function () {
	      realtime.test().should.be.eql(2);
	      realtime.test2().should.be.eql(1);
	    });
	    it('all middlewares should be applied', function () {
	      return realtime._messageParser.parse(new TextMessage('1').toJSON()).then(function (message) {
	        message.should.be.instanceof(TextMessage);
	        message.text.should.startWith('[plugin-test]');
	        message.text.should.endWith('[plugin-test]');
	      });
	    });
	  });

	  describe('error handling', function () {
	    it('create Realtime should throw', function () {
	      (function () {
	        return new Realtime({
	          appId: APP_ID,
	          region: REGION,
	          pushUnread: false,
	          plugins: [{
	            name: 'ErrorPlugin',
	            onRealtimeCreate: function onRealtimeCreate() {
	              throw new Error('test');
	            }
	          }]
	        });
	      }).should.throw('test[ErrorPlugin]');
	    });
	    it('create IMClient should be rejected', function () {
	      return new Realtime({
	        appId: APP_ID,
	        region: REGION,
	        pushUnread: false,
	        plugins: [{
	          name: 'ErrorPlugin',
	          onIMClientCreate: function onIMClientCreate() {
	            throw new Error('test');
	          }
	        }]
	      }).createIMClient().should.be.rejectedWith('test[ErrorPlugin]');
	    });
	    it('middleware error should be reported', function () {
	      return new Realtime({
	        appId: APP_ID,
	        region: REGION,
	        pushUnread: false,
	        plugins: [{
	          name: 'ErrorPlugin',
	          beforeMessageParse: function beforeMessageParse() {
	            throw new Error('test');
	          }
	        }]
	      })._messageParser.parse(new TextMessage('1').toJSON()).should.be.rejectedWith('test[ErrorPlugin]');
	    });
	    it('middleware return type mismatch should trigger a warning', function () {
	      var spy = sinon.spy(console, 'warn');
	      return _Promise.all([new Realtime({
	        appId: APP_ID,
	        region: REGION,
	        pushUnread: false,
	        plugins: [{
	          name: 'ErrorPlugin',
	          beforeMessageParse: function beforeMessageParse() {
	            return _Promise.resolve();
	          }
	        }]
	      })._messageParser.parse(new TextMessage('1').toJSON()), new Realtime({
	        appId: APP_ID,
	        region: REGION,
	        pushUnread: false,
	        plugins: [{
	          name: 'ErrorPlugin',
	          beforeMessageParse: function beforeMessageParse() {
	            return 1;
	          }
	        }]
	      })._messageParser.parse(new TextMessage('1').toJSON())]).then(function () {
	        spy.should.be.calledTwice();
	        spy.restore();
	      });
	    });
	  });
	});

	describe('WebSocketPlus', function () {
	  describe('open/close', function () {
	    it('basic open and close', function () {
	      var ws = new WebSocketPlus('wss://echo.websocket.org');
	      return listen(ws, 'open', 'error').then(function () {
	        ws.is('connected').should.be.true();
	        ws.close();
	        ws.is('closed').should.be.true();
	        (function () {
	          return ws.open();
	        }).should.throw();
	      });
	    });
	    it('error event should be emitted when got 404 error', function (done) {
	      var ws = new WebSocketPlus('ws://404.websocket.org');
	      ws.on('error', function (error) {
	        error.should.be.instanceof(Error);
	        done();
	      });
	    });
	    it('backup endpoint should be used when the primary one fails', function () {
	      var ws = new WebSocketPlus(['ws://404.websocket.org', 'ws://echo.websocket.org']);
	      return listen(ws, 'open', 'error').then(function () {
	        return ws.close();
	      });
	    });
	    it('should support promised endpoints', function () {
	      var ws = new WebSocketPlus(_Promise.resolve(['wss://echo.websocket.org']));
	      return listen(ws, 'open', 'error').then(function () {
	        return ws.close();
	      });
	    });
	  });

	  describe('send', function () {
	    it('should throw if not connected', function () {
	      var ws = new WebSocketPlus('ws://echo.websocket.org');
	      (function () {
	        return ws.send();
	      }).should.throw(/Connection unavailable/);
	      (function () {
	        return ws._ping();
	      }).should.throw(/Connection unavailable/);
	      ws.on('open', function () {
	        return ws.close();
	      });
	    });
	  });

	  describe('Auto reconnecting', function () {
	    var ws = void 0;
	    before(function () {
	      ws = new WebSocketPlus('ws://echo.websocket.org');
	      return listen(ws, 'open', 'error');
	    });
	    after(function () {
	      if (!ws.is('closed')) ws.close();
	    });
	    it('should reconnect when closed', function () {
	      var disconnectCallback = sinon.spy();
	      ws.on('disconnect', disconnectCallback);
	      var retryCallback = sinon.spy();
	      ws.on('retry', retryCallback);
	      ws._ws.close();
	      return listen(ws, 'reconnect').then(function () {
	        disconnectCallback.should.be.calledOnce();
	        retryCallback.should.be.calledOnce();
	        retryCallback.should.be.calledWith(0);
	        ws.is('connected').should.be.true();
	      });
	    });
	    it('should not reconnect when closed manually', function () {
	      var disconnectCallback = sinon.spy();
	      ws.on('disconnect', disconnectCallback);
	      ws.close();
	      return wait(500).then(function () {
	        disconnectCallback.should.have.callCount(0);
	        ws.is('closed').should.be.true();
	      });
	    });
	  });
	});

})));

//# sourceMappingURL=index.js.map