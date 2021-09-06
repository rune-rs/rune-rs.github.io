var rune = (function (exports) {
  'use strict';

  /// Hook used to construct an async sleep function.
  function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  let wasm;

  const heap = new Array(32).fill(undefined);

  heap.push(undefined, null, true, false);

  function getObject(idx) { return heap[idx]; }

  let heap_next = heap.length;

  function dropObject(idx) {
      if (idx < 36) return;
      heap[idx] = heap_next;
      heap_next = idx;
  }

  function takeObject(idx) {
      const ret = getObject(idx);
      dropObject(idx);
      return ret;
  }

  let WASM_VECTOR_LEN = 0;

  let cachegetUint8Memory0 = null;
  function getUint8Memory0() {
      if (cachegetUint8Memory0 === null || cachegetUint8Memory0.buffer !== wasm.memory.buffer) {
          cachegetUint8Memory0 = new Uint8Array(wasm.memory.buffer);
      }
      return cachegetUint8Memory0;
  }

  let cachedTextEncoder = new TextEncoder('utf-8');

  const encodeString = (typeof cachedTextEncoder.encodeInto === 'function'
      ? function (arg, view) {
      return cachedTextEncoder.encodeInto(arg, view);
  }
      : function (arg, view) {
      const buf = cachedTextEncoder.encode(arg);
      view.set(buf);
      return {
          read: arg.length,
          written: buf.length
      };
  });

  function passStringToWasm0(arg, malloc, realloc) {

      if (realloc === undefined) {
          const buf = cachedTextEncoder.encode(arg);
          const ptr = malloc(buf.length);
          getUint8Memory0().subarray(ptr, ptr + buf.length).set(buf);
          WASM_VECTOR_LEN = buf.length;
          return ptr;
      }

      let len = arg.length;
      let ptr = malloc(len);

      const mem = getUint8Memory0();

      let offset = 0;

      for (; offset < len; offset++) {
          const code = arg.charCodeAt(offset);
          if (code > 0x7F) break;
          mem[ptr + offset] = code;
      }

      if (offset !== len) {
          if (offset !== 0) {
              arg = arg.slice(offset);
          }
          ptr = realloc(ptr, len, len = offset + arg.length * 3);
          const view = getUint8Memory0().subarray(ptr + offset, ptr + len);
          const ret = encodeString(arg, view);

          offset += ret.written;
      }

      WASM_VECTOR_LEN = offset;
      return ptr;
  }

  let cachegetInt32Memory0 = null;
  function getInt32Memory0() {
      if (cachegetInt32Memory0 === null || cachegetInt32Memory0.buffer !== wasm.memory.buffer) {
          cachegetInt32Memory0 = new Int32Array(wasm.memory.buffer);
      }
      return cachegetInt32Memory0;
  }

  let cachedTextDecoder = new TextDecoder('utf-8', { ignoreBOM: true, fatal: true });

  cachedTextDecoder.decode();

  function getStringFromWasm0(ptr, len) {
      return cachedTextDecoder.decode(getUint8Memory0().subarray(ptr, ptr + len));
  }

  function addHeapObject(obj) {
      if (heap_next === heap.length) heap.push(heap.length + 1);
      const idx = heap_next;
      heap_next = heap[idx];

      heap[idx] = obj;
      return idx;
  }

  function isLikeNone(x) {
      return x === undefined || x === null;
  }

  function debugString(val) {
      // primitive types
      const type = typeof val;
      if (type == 'number' || type == 'boolean' || val == null) {
          return  `${val}`;
      }
      if (type == 'string') {
          return `"${val}"`;
      }
      if (type == 'symbol') {
          const description = val.description;
          if (description == null) {
              return 'Symbol';
          } else {
              return `Symbol(${description})`;
          }
      }
      if (type == 'function') {
          const name = val.name;
          if (typeof name == 'string' && name.length > 0) {
              return `Function(${name})`;
          } else {
              return 'Function';
          }
      }
      // objects
      if (Array.isArray(val)) {
          const length = val.length;
          let debug = '[';
          if (length > 0) {
              debug += debugString(val[0]);
          }
          for(let i = 1; i < length; i++) {
              debug += ', ' + debugString(val[i]);
          }
          debug += ']';
          return debug;
      }
      // Test for built-in
      const builtInMatches = /\[object ([^\]]+)\]/.exec(toString.call(val));
      let className;
      if (builtInMatches.length > 1) {
          className = builtInMatches[1];
      } else {
          // Failed to match the standard '[object ClassName]'
          return toString.call(val);
      }
      if (className == 'Object') {
          // we're a user defined class or Object
          // JSON.stringify avoids problems with cycles, and is generally much
          // easier than looping through ownProperties of `val`.
          try {
              return 'Object(' + JSON.stringify(val) + ')';
          } catch (_) {
              return 'Object';
          }
      }
      // errors
      if (val instanceof Error) {
          return `${val.name}: ${val.message}\n${val.stack}`;
      }
      // TODO we could test for more things here, like `Set`s and `Map`s.
      return className;
  }

  function makeMutClosure(arg0, arg1, dtor, f) {
      const state = { a: arg0, b: arg1, cnt: 1, dtor };
      const real = (...args) => {
          // First up with a closure we increment the internal reference
          // count. This ensures that the Rust closure environment won't
          // be deallocated while we're invoking it.
          state.cnt++;
          const a = state.a;
          state.a = 0;
          try {
              return f(a, state.b, ...args);
          } finally {
              if (--state.cnt === 0) {
                  wasm.__wbindgen_export_2.get(state.dtor)(a, state.b);

              } else {
                  state.a = a;
              }
          }
      };
      real.original = state;

      return real;
  }
  function __wbg_adapter_28(arg0, arg1, arg2) {
      wasm._dyn_core__ops__function__FnMut__A____Output___R_as_wasm_bindgen__closure__WasmClosure___describe__invoke__h8f51bee115b0109c(arg0, arg1, addHeapObject(arg2));
  }

  /**
  * @param {string} input
  * @param {any} config
  * @returns {any}
  */
  function compile(input, config) {
      var ptr0 = passStringToWasm0(input, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
      var len0 = WASM_VECTOR_LEN;
      var ret = wasm.compile(ptr0, len0, addHeapObject(config));
      return takeObject(ret);
  }

  function handleError(f, args) {
      try {
          return f.apply(this, args);
      } catch (e) {
          wasm.__wbindgen_exn_store(addHeapObject(e));
      }
  }

  function getArrayU8FromWasm0(ptr, len) {
      return getUint8Memory0().subarray(ptr / 1, ptr / 1 + len);
  }
  function __wbg_adapter_68(arg0, arg1, arg2, arg3) {
      wasm.wasm_bindgen__convert__closures__invoke2_mut__h1c7aed4d899e7655(arg0, arg1, addHeapObject(arg2), addHeapObject(arg3));
  }

  async function load(module, imports) {
      if (typeof Response === 'function' && module instanceof Response) {
          if (typeof WebAssembly.instantiateStreaming === 'function') {
              try {
                  return await WebAssembly.instantiateStreaming(module, imports);

              } catch (e) {
                  if (module.headers.get('Content-Type') != 'application/wasm') {
                      console.warn("`WebAssembly.instantiateStreaming` failed because your server does not serve wasm with `application/wasm` MIME type. Falling back to `WebAssembly.instantiate` which is slower. Original error:\n", e);

                  } else {
                      throw e;
                  }
              }
          }

          const bytes = await module.arrayBuffer();
          return await WebAssembly.instantiate(bytes, imports);

      } else {
          const instance = await WebAssembly.instantiate(module, imports);

          if (instance instanceof WebAssembly.Instance) {
              return { instance, module };

          } else {
              return instance;
          }
      }
  }

  async function init(input) {
      if (typeof input === 'undefined') {
          input = new URL('index_bg.wasm', (document.currentScript && document.currentScript.src || new URL('rune.js', document.baseURI).href));
      }
      const imports = {};
      imports.wbg = {};
      imports.wbg.__wbindgen_object_drop_ref = function(arg0) {
          takeObject(arg0);
      };
      imports.wbg.__wbindgen_json_serialize = function(arg0, arg1) {
          const obj = getObject(arg1);
          var ret = JSON.stringify(obj === undefined ? null : obj);
          var ptr0 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
          var len0 = WASM_VECTOR_LEN;
          getInt32Memory0()[arg0 / 4 + 1] = len0;
          getInt32Memory0()[arg0 / 4 + 0] = ptr0;
      };
      imports.wbg.__wbg_sleep_60eb062746476fb6 = function(arg0) {
          var ret = sleep(arg0);
          return addHeapObject(ret);
      };
      imports.wbg.__wbindgen_cb_drop = function(arg0) {
          const obj = takeObject(arg0).original;
          if (obj.cnt-- == 1) {
              obj.a = 0;
              return true;
          }
          var ret = false;
          return ret;
      };
      imports.wbg.__wbindgen_json_parse = function(arg0, arg1) {
          var ret = JSON.parse(getStringFromWasm0(arg0, arg1));
          return addHeapObject(ret);
      };
      imports.wbg.__wbg_randomFillSync_64cc7d048f228ca8 = function() { return handleError(function (arg0, arg1, arg2) {
          getObject(arg0).randomFillSync(getArrayU8FromWasm0(arg1, arg2));
      }, arguments) };
      imports.wbg.__wbg_getRandomValues_98117e9a7e993920 = function() { return handleError(function (arg0, arg1) {
          getObject(arg0).getRandomValues(getObject(arg1));
      }, arguments) };
      imports.wbg.__wbg_process_2f24d6544ea7b200 = function(arg0) {
          var ret = getObject(arg0).process;
          return addHeapObject(ret);
      };
      imports.wbg.__wbindgen_is_object = function(arg0) {
          const val = getObject(arg0);
          var ret = typeof(val) === 'object' && val !== null;
          return ret;
      };
      imports.wbg.__wbg_versions_6164651e75405d4a = function(arg0) {
          var ret = getObject(arg0).versions;
          return addHeapObject(ret);
      };
      imports.wbg.__wbg_node_4b517d861cbcb3bc = function(arg0) {
          var ret = getObject(arg0).node;
          return addHeapObject(ret);
      };
      imports.wbg.__wbg_crypto_98fc271021c7d2ad = function(arg0) {
          var ret = getObject(arg0).crypto;
          return addHeapObject(ret);
      };
      imports.wbg.__wbg_msCrypto_a2cdb043d2bfe57f = function(arg0) {
          var ret = getObject(arg0).msCrypto;
          return addHeapObject(ret);
      };
      imports.wbg.__wbg_modulerequire_3440a4bcf44437db = function() { return handleError(function (arg0, arg1) {
          var ret = module.require(getStringFromWasm0(arg0, arg1));
          return addHeapObject(ret);
      }, arguments) };
      imports.wbg.__wbindgen_string_new = function(arg0, arg1) {
          var ret = getStringFromWasm0(arg0, arg1);
          return addHeapObject(ret);
      };
      imports.wbg.__wbg_instanceof_Window_fac4f1f8e3c61c1f = function(arg0) {
          var ret = getObject(arg0) instanceof Window;
          return ret;
      };
      imports.wbg.__wbg_fetch_825f0bc35b153806 = function(arg0, arg1) {
          var ret = getObject(arg0).fetch(getObject(arg1));
          return addHeapObject(ret);
      };
      imports.wbg.__wbg_instanceof_Response_4e568b2aa3949591 = function(arg0) {
          var ret = getObject(arg0) instanceof Response;
          return ret;
      };
      imports.wbg.__wbg_text_3ccbde6db7bfd885 = function() { return handleError(function (arg0) {
          var ret = getObject(arg0).text();
          return addHeapObject(ret);
      }, arguments) };
      imports.wbg.__wbg_now_885ca88fafee0fd1 = function(arg0) {
          var ret = getObject(arg0).now();
          return ret;
      };
      imports.wbg.__wbg_newwithstr_837320a08b0528e7 = function() { return handleError(function (arg0, arg1) {
          var ret = new Request(getStringFromWasm0(arg0, arg1));
          return addHeapObject(ret);
      }, arguments) };
      imports.wbg.__wbindgen_object_clone_ref = function(arg0) {
          var ret = getObject(arg0);
          return addHeapObject(ret);
      };
      imports.wbg.__wbg_newnoargs_1a11e7e8c906996c = function(arg0, arg1) {
          var ret = new Function(getStringFromWasm0(arg0, arg1));
          return addHeapObject(ret);
      };
      imports.wbg.__wbg_get_6d26c712aa73c8b2 = function() { return handleError(function (arg0, arg1) {
          var ret = Reflect.get(getObject(arg0), getObject(arg1));
          return addHeapObject(ret);
      }, arguments) };
      imports.wbg.__wbg_call_e91f71ddf1f45cff = function() { return handleError(function (arg0, arg1) {
          var ret = getObject(arg0).call(getObject(arg1));
          return addHeapObject(ret);
      }, arguments) };
      imports.wbg.__wbg_new_4b48f9f8159fea77 = function() {
          var ret = new Object();
          return addHeapObject(ret);
      };
      imports.wbg.__wbg_call_e3c72355d091d5d4 = function() { return handleError(function (arg0, arg1, arg2) {
          var ret = getObject(arg0).call(getObject(arg1), getObject(arg2));
          return addHeapObject(ret);
      }, arguments) };
      imports.wbg.__wbg_new_119f8177d8717c43 = function(arg0, arg1) {
          try {
              var state0 = {a: arg0, b: arg1};
              var cb0 = (arg0, arg1) => {
                  const a = state0.a;
                  state0.a = 0;
                  try {
                      return __wbg_adapter_68(a, state0.b, arg0, arg1);
                  } finally {
                      state0.a = a;
                  }
              };
              var ret = new Promise(cb0);
              return addHeapObject(ret);
          } finally {
              state0.a = state0.b = 0;
          }
      };
      imports.wbg.__wbg_resolve_7161ec6fd5b1cd29 = function(arg0) {
          var ret = Promise.resolve(getObject(arg0));
          return addHeapObject(ret);
      };
      imports.wbg.__wbg_then_6d5072fec3fdb237 = function(arg0, arg1) {
          var ret = getObject(arg0).then(getObject(arg1));
          return addHeapObject(ret);
      };
      imports.wbg.__wbg_then_4f3c7f6f3d36634a = function(arg0, arg1, arg2) {
          var ret = getObject(arg0).then(getObject(arg1), getObject(arg2));
          return addHeapObject(ret);
      };
      imports.wbg.__wbg_self_b4546ea7b590539e = function() { return handleError(function () {
          var ret = self.self;
          return addHeapObject(ret);
      }, arguments) };
      imports.wbg.__wbg_window_c279fea81f426a68 = function() { return handleError(function () {
          var ret = window.window;
          return addHeapObject(ret);
      }, arguments) };
      imports.wbg.__wbg_globalThis_038a6ea0ff17789f = function() { return handleError(function () {
          var ret = globalThis.globalThis;
          return addHeapObject(ret);
      }, arguments) };
      imports.wbg.__wbg_global_4f93ce884bcee597 = function() { return handleError(function () {
          var ret = global.global;
          return addHeapObject(ret);
      }, arguments) };
      imports.wbg.__wbindgen_is_undefined = function(arg0) {
          var ret = getObject(arg0) === undefined;
          return ret;
      };
      imports.wbg.__wbg_buffer_79a3294266d4e783 = function(arg0) {
          var ret = getObject(arg0).buffer;
          return addHeapObject(ret);
      };
      imports.wbg.__wbg_new_945397fb09fec0b8 = function(arg0) {
          var ret = new Uint8Array(getObject(arg0));
          return addHeapObject(ret);
      };
      imports.wbg.__wbg_set_223873223acf6d07 = function(arg0, arg1, arg2) {
          getObject(arg0).set(getObject(arg1), arg2 >>> 0);
      };
      imports.wbg.__wbg_length_68e13e7bbd918464 = function(arg0) {
          var ret = getObject(arg0).length;
          return ret;
      };
      imports.wbg.__wbg_newwithlength_b7722b5594f1dc21 = function(arg0) {
          var ret = new Uint8Array(arg0 >>> 0);
          return addHeapObject(ret);
      };
      imports.wbg.__wbg_subarray_466613921b2fc6db = function(arg0, arg1, arg2) {
          var ret = getObject(arg0).subarray(arg1 >>> 0, arg2 >>> 0);
          return addHeapObject(ret);
      };
      imports.wbg.__wbg_set_d29a397c9cc5d746 = function() { return handleError(function (arg0, arg1, arg2) {
          var ret = Reflect.set(getObject(arg0), getObject(arg1), getObject(arg2));
          return ret;
      }, arguments) };
      imports.wbg.__wbindgen_is_string = function(arg0) {
          var ret = typeof(getObject(arg0)) === 'string';
          return ret;
      };
      imports.wbg.__wbindgen_string_get = function(arg0, arg1) {
          const obj = getObject(arg1);
          var ret = typeof(obj) === 'string' ? obj : undefined;
          var ptr0 = isLikeNone(ret) ? 0 : passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
          var len0 = WASM_VECTOR_LEN;
          getInt32Memory0()[arg0 / 4 + 1] = len0;
          getInt32Memory0()[arg0 / 4 + 0] = ptr0;
      };
      imports.wbg.__wbindgen_debug_string = function(arg0, arg1) {
          var ret = debugString(getObject(arg1));
          var ptr0 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
          var len0 = WASM_VECTOR_LEN;
          getInt32Memory0()[arg0 / 4 + 1] = len0;
          getInt32Memory0()[arg0 / 4 + 0] = ptr0;
      };
      imports.wbg.__wbindgen_throw = function(arg0, arg1) {
          throw new Error(getStringFromWasm0(arg0, arg1));
      };
      imports.wbg.__wbindgen_memory = function() {
          var ret = wasm.memory;
          return addHeapObject(ret);
      };
      imports.wbg.__wbindgen_closure_wrapper1263 = function(arg0, arg1, arg2) {
          var ret = makeMutClosure(arg0, arg1, 593, __wbg_adapter_28);
          return addHeapObject(ret);
      };

      if (typeof input === 'string' || (typeof Request === 'function' && input instanceof Request) || (typeof URL === 'function' && input instanceof URL)) {
          input = fetch(input);
      }



      const { instance, module } = await load(await input, imports);

      wasm = instance.exports;
      init.__wbindgen_wasm_module = module;

      return wasm;
  }

  var exports$1 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    compile: compile,
    'default': init
  });

  var wasm$1 = async () => {
                          await init("/js/assets/rune-wasm-3d23ebcd.wasm");
                          return exports$1;
                      };

  async function init$1() {
      exports.module = await wasm$1();
  }

  exports.module = null;

  exports.init = init$1;

  Object.defineProperty(exports, '__esModule', { value: true });

  return exports;

}({}));
//# sourceMappingURL=rune.js.map
