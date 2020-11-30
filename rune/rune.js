var rune = (function (exports) {
  'use strict';

  /// Hook used to construct an async sleep function.
  function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  let wasm;

  let cachedTextDecoder = new TextDecoder('utf-8', { ignoreBOM: true, fatal: true });

  cachedTextDecoder.decode();

  let cachegetUint8Memory0 = null;
  function getUint8Memory0() {
      if (cachegetUint8Memory0 === null || cachegetUint8Memory0.buffer !== wasm.memory.buffer) {
          cachegetUint8Memory0 = new Uint8Array(wasm.memory.buffer);
      }
      return cachegetUint8Memory0;
  }

  function getStringFromWasm0(ptr, len) {
      return cachedTextDecoder.decode(getUint8Memory0().subarray(ptr, ptr + len));
  }

  const heap = new Array(32).fill(undefined);

  heap.push(undefined, null, true, false);

  let heap_next = heap.length;

  function addHeapObject(obj) {
      if (heap_next === heap.length) heap.push(heap.length + 1);
      const idx = heap_next;
      heap_next = heap[idx];

      heap[idx] = obj;
      return idx;
  }

  function getObject(idx) { return heap[idx]; }

  let WASM_VECTOR_LEN = 0;

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

  function isLikeNone(x) {
      return x === undefined || x === null;
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
  function __wbg_adapter_20(arg0, arg1, arg2) {
      wasm._dyn_core__ops__function__FnMut__A____Output___R_as_wasm_bindgen__closure__WasmClosure___describe__invoke__hb5ca906d43befe30(arg0, arg1, addHeapObject(arg2));
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

  function handleError(f) {
      return function () {
          try {
              return f.apply(this, arguments);

          } catch (e) {
              wasm.__wbindgen_exn_store(addHeapObject(e));
          }
      };
  }

  function getArrayU8FromWasm0(ptr, len) {
      return getUint8Memory0().subarray(ptr / 1, ptr / 1 + len);
  }
  function __wbg_adapter_56(arg0, arg1, arg2, arg3) {
      wasm.wasm_bindgen__convert__closures__invoke2_mut__he9b695d5cc7722fe(arg0, arg1, addHeapObject(arg2), addHeapObject(arg3));
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
          input = (document.currentScript && document.currentScript.src || new URL('rune.js', document.baseURI).href).replace(/\.js$/, '_bg.wasm');
      }
      const imports = {};
      imports.wbg = {};
      imports.wbg.__wbindgen_json_parse = function(arg0, arg1) {
          var ret = JSON.parse(getStringFromWasm0(arg0, arg1));
          return addHeapObject(ret);
      };
      imports.wbg.__wbindgen_json_serialize = function(arg0, arg1) {
          const obj = getObject(arg1);
          var ret = JSON.stringify(obj === undefined ? null : obj);
          var ptr0 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
          var len0 = WASM_VECTOR_LEN;
          getInt32Memory0()[arg0 / 4 + 1] = len0;
          getInt32Memory0()[arg0 / 4 + 0] = ptr0;
      };
      imports.wbg.__wbindgen_object_drop_ref = function(arg0) {
          takeObject(arg0);
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
      imports.wbg.__wbg_sleep_c9b3d834bdadca92 = function(arg0) {
          var ret = sleep(arg0);
          return addHeapObject(ret);
      };
      imports.wbg.__wbg_getRandomValues_11115a852729f4e8 = handleError(function(arg0, arg1, arg2) {
          getObject(arg0).getRandomValues(getArrayU8FromWasm0(arg1, arg2));
      });
      imports.wbg.__wbg_randomFillSync_a2d002fc3b8e30f7 = handleError(function(arg0, arg1, arg2) {
          getObject(arg0).randomFillSync(getArrayU8FromWasm0(arg1, arg2));
      });
      imports.wbg.__wbg_self_a5f0fe5564782787 = handleError(function() {
          var ret = self.self;
          return addHeapObject(ret);
      });
      imports.wbg.__wbg_static_accessor_MODULE_7f278c5446c126c8 = function() {
          var ret = module;
          return addHeapObject(ret);
      };
      imports.wbg.__wbg_require_29e58b5f6f133563 = handleError(function(arg0, arg1, arg2) {
          var ret = getObject(arg0).require(getStringFromWasm0(arg1, arg2));
          return addHeapObject(ret);
      });
      imports.wbg.__wbg_crypto_d91429ea1a087f70 = function(arg0) {
          var ret = getObject(arg0).crypto;
          return addHeapObject(ret);
      };
      imports.wbg.__wbg_msCrypto_c8be2bb4fc7d8cd3 = function(arg0) {
          var ret = getObject(arg0).msCrypto;
          return addHeapObject(ret);
      };
      imports.wbg.__wbindgen_is_undefined = function(arg0) {
          var ret = getObject(arg0) === undefined;
          return ret;
      };
      imports.wbg.__wbg_instanceof_Window_adf3196bdc02b386 = function(arg0) {
          var ret = getObject(arg0) instanceof Window;
          return ret;
      };
      imports.wbg.__wbg_fetch_91f098921cc7cca8 = function(arg0, arg1) {
          var ret = getObject(arg0).fetch(getObject(arg1));
          return addHeapObject(ret);
      };
      imports.wbg.__wbg_instanceof_Response_328c03967a8e8902 = function(arg0) {
          var ret = getObject(arg0) instanceof Response;
          return ret;
      };
      imports.wbg.__wbg_text_966d07536ca6ccdc = handleError(function(arg0) {
          var ret = getObject(arg0).text();
          return addHeapObject(ret);
      });
      imports.wbg.__wbindgen_object_clone_ref = function(arg0) {
          var ret = getObject(arg0);
          return addHeapObject(ret);
      };
      imports.wbg.__wbindgen_string_new = function(arg0, arg1) {
          var ret = getStringFromWasm0(arg0, arg1);
          return addHeapObject(ret);
      };
      imports.wbg.__wbg_newwithstr_394b800339828eb1 = handleError(function(arg0, arg1) {
          var ret = new Request(getStringFromWasm0(arg0, arg1));
          return addHeapObject(ret);
      });
      imports.wbg.__wbg_call_8e95613cc6524977 = handleError(function(arg0, arg1) {
          var ret = getObject(arg0).call(getObject(arg1));
          return addHeapObject(ret);
      });
      imports.wbg.__wbg_newnoargs_f3b8a801d5d4b079 = function(arg0, arg1) {
          var ret = new Function(getStringFromWasm0(arg0, arg1));
          return addHeapObject(ret);
      };
      imports.wbg.__wbg_call_d713ea0274dfc6d2 = handleError(function(arg0, arg1, arg2) {
          var ret = getObject(arg0).call(getObject(arg1), getObject(arg2));
          return addHeapObject(ret);
      });
      imports.wbg.__wbg_new_3e06d4f36713e4cb = function() {
          var ret = new Object();
          return addHeapObject(ret);
      };
      imports.wbg.__wbg_new_d0c63652ab4d825c = function(arg0, arg1) {
          try {
              var state0 = {a: arg0, b: arg1};
              var cb0 = (arg0, arg1) => {
                  const a = state0.a;
                  state0.a = 0;
                  try {
                      return __wbg_adapter_56(a, state0.b, arg0, arg1);
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
      imports.wbg.__wbg_resolve_2529512c3bb73938 = function(arg0) {
          var ret = Promise.resolve(getObject(arg0));
          return addHeapObject(ret);
      };
      imports.wbg.__wbg_then_4a7a614abbbe6d81 = function(arg0, arg1) {
          var ret = getObject(arg0).then(getObject(arg1));
          return addHeapObject(ret);
      };
      imports.wbg.__wbg_then_3b7ac098cfda2fa5 = function(arg0, arg1, arg2) {
          var ret = getObject(arg0).then(getObject(arg1), getObject(arg2));
          return addHeapObject(ret);
      };
      imports.wbg.__wbg_self_07b2f89e82ceb76d = handleError(function() {
          var ret = self.self;
          return addHeapObject(ret);
      });
      imports.wbg.__wbg_window_ba85d88572adc0dc = handleError(function() {
          var ret = window.window;
          return addHeapObject(ret);
      });
      imports.wbg.__wbg_globalThis_b9277fc37e201fe5 = handleError(function() {
          var ret = globalThis.globalThis;
          return addHeapObject(ret);
      });
      imports.wbg.__wbg_global_e16303fe83e1d57f = handleError(function() {
          var ret = global.global;
          return addHeapObject(ret);
      });
      imports.wbg.__wbg_set_304f2ec1a3ab3b79 = handleError(function(arg0, arg1, arg2) {
          var ret = Reflect.set(getObject(arg0), getObject(arg1), getObject(arg2));
          return ret;
      });
      imports.wbg.__wbindgen_string_get = function(arg0, arg1) {
          const obj = getObject(arg1);
          var ret = typeof(obj) === 'string' ? obj : undefined;
          var ptr0 = isLikeNone(ret) ? 0 : passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
          var len0 = WASM_VECTOR_LEN;
          getInt32Memory0()[arg0 / 4 + 1] = len0;
          getInt32Memory0()[arg0 / 4 + 0] = ptr0;
      };
      imports.wbg.__wbindgen_throw = function(arg0, arg1) {
          throw new Error(getStringFromWasm0(arg0, arg1));
      };
      imports.wbg.__wbindgen_closure_wrapper1193 = function(arg0, arg1, arg2) {
          var ret = makeMutClosure(arg0, arg1, 596, __wbg_adapter_20);
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
                          await init("/rune/assets/rune-wasm-9d889e23.wasm");
                          return exports$1;
                      };

  async function init$1() {
      exports.module = await wasm$1();
  }

  exports.module = null;

  exports.init = init$1;

  return exports;

}({}));
//# sourceMappingURL=rune.js.map
