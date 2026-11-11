var rune = (function (exports) {
  'use strict';

  /// Hook used to construct an async sleep function.
  function js_sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  var import1 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    js_sleep: js_sleep
  });

  /**
   * @param {string} input
   * @param {any} config
   * @returns {Promise<any>}
   */
  function compile(input, config) {
      const ptr0 = passStringToWasm0(input, wasm$1.__wbindgen_malloc, wasm$1.__wbindgen_realloc);
      const len0 = WASM_VECTOR_LEN;
      const ret = wasm$1.compile(ptr0, len0, config);
      return ret;
  }
  function __wbg_get_imports() {
      const import0 = {
          __proto__: null,
          __wbg_Error_208446807d0d1e30: function(arg0, arg1) {
              const ret = Error(getStringFromWasm0(arg0, arg1));
              return ret;
          },
          __wbg___wbindgen_is_function_741ff2bb612836f5: function(arg0) {
              const ret = typeof(arg0) === 'function';
              return ret;
          },
          __wbg___wbindgen_is_undefined_be5b34249ff1fc15: function(arg0) {
              const ret = arg0 === undefined;
              return ret;
          },
          __wbg___wbindgen_string_get_7ce8eee7fd327545: function(arg0, arg1) {
              const obj = arg1;
              const ret = typeof(obj) === 'string' ? obj : undefined;
              var ptr1 = isLikeNone(ret) ? 0 : passStringToWasm0(ret, wasm$1.__wbindgen_malloc, wasm$1.__wbindgen_realloc);
              var len1 = WASM_VECTOR_LEN;
              getDataViewMemory0().setInt32((arg0 >>> 0) + 4 * 1, len1, true);
              getDataViewMemory0().setInt32((arg0 >>> 0) + 4 * 0, ptr1, true);
          },
          __wbg___wbindgen_throw_4c88d8bf264fd984: function(arg0, arg1) {
              throw new Error(getStringFromWasm0(arg0, arg1));
          },
          __wbg__wbg_cb_unref_09736879a3f67559: function(arg0) {
              arg0._wbg_cb_unref();
          },
          __wbg_call_a410eb4b59ed5965: function() { return handleError(function (arg0, arg1, arg2) {
              const ret = arg0.call(arg1, arg2);
              return ret;
          }, arguments); },
          __wbg_fetch_858ffa201963e190: function(arg0, arg1) {
              const ret = arg0.fetch(arg1);
              return ret;
          },
          __wbg_instanceof_Response_5b0b4f7f1daeae51: function(arg0) {
              let result;
              try {
                  result = arg0 instanceof Response;
              } catch (_) {
                  result = false;
              }
              const ret = result;
              return ret;
          },
          __wbg_instanceof_Window_5cf453f5639aa1a2: function(arg0) {
              let result;
              try {
                  result = arg0 instanceof Window;
              } catch (_) {
                  result = false;
              }
              const ret = result;
              return ret;
          },
          __wbg_new_cd4348290afae586: function() {
              const ret = new Object();
              return ret;
          },
          __wbg_new_typed_e09da9dae6ee5935: function(arg0, arg1) {
              try {
                  var state0 = {a: arg0, b: arg1};
                  var cb0 = (arg0, arg1) => {
                      const a = state0.a;
                      state0.a = 0;
                      try {
                          return wasm_bindgen_93a4702c0080a70d___convert__closures_____invoke___js_sys_48b9705be7a9506e___Function_fn_wasm_bindgen_93a4702c0080a70d___JsValue_____wasm_bindgen_93a4702c0080a70d___sys__Undefined___js_sys_48b9705be7a9506e___Function_fn_wasm_bindgen_93a4702c0080a70d___JsValue_____wasm_bindgen_93a4702c0080a70d___sys__Undefined_______true_(a, state0.b, arg0, arg1);
                      } finally {
                          state0.a = a;
                      }
                  };
                  const ret = new Promise(cb0);
                  return ret;
              } finally {
                  state0.a = 0;
              }
          },
          __wbg_new_with_str_f3fabb7c01bc9cf7: function() { return handleError(function (arg0, arg1) {
              const ret = new Request(getStringFromWasm0(arg0, arg1));
              return ret;
          }, arguments); },
          __wbg_parse_c3f72b5a24f83c01: function() { return handleError(function (arg0, arg1) {
              const ret = JSON.parse(getStringFromWasm0(arg0, arg1));
              return ret;
          }, arguments); },
          __wbg_queueMicrotask_1e8503a8a690f0a3: function(arg0) {
              const ret = arg0.queueMicrotask;
              return ret;
          },
          __wbg_queueMicrotask_4a1a4d8dd332373b: function(arg0) {
              queueMicrotask(arg0);
          },
          __wbg_resolve_dbf78ab4942478b0: function(arg0) {
              const ret = Promise.resolve(arg0);
              return ret;
          },
          __wbg_set_method_639e69af35614d36: function(arg0, arg1, arg2) {
              arg0.method = getStringFromWasm0(arg1, arg2);
          },
          __wbg_set_mode_07e051ad8b4e2126: function(arg0, arg1) {
              arg0.mode = __wbindgen_enum_RequestMode[arg1];
          },
          __wbg_static_accessor_GLOBAL_THIS_003ee833af9699fc: function() {
              const ret = typeof globalThis === 'undefined' ? undefined : globalThis;
              return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
          },
          __wbg_static_accessor_GLOBAL_e4293fb22cbe77da: function() {
              const ret = typeof global === 'undefined' ? undefined : global;
              return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
          },
          __wbg_static_accessor_SELF_53bb20457401453d: function() {
              const ret = typeof self === 'undefined' ? undefined : self;
              return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
          },
          __wbg_static_accessor_WINDOW_b5e0810bfecb7feb: function() {
              const ret = typeof window === 'undefined' ? undefined : window;
              return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
          },
          __wbg_stringify_0a0fbf2ef722380a: function() { return handleError(function (arg0) {
              const ret = JSON.stringify(arg0);
              return ret;
          }, arguments); },
          __wbg_text_5240eb2c41de8292: function() { return handleError(function (arg0) {
              const ret = arg0.text();
              return ret;
          }, arguments); },
          __wbg_then_656f253a5dd7d8ea: function(arg0, arg1, arg2) {
              const ret = arg0.then(arg1, arg2);
              return ret;
          },
          __wbg_then_e3f7f2d365708be8: function(arg0, arg1) {
              const ret = arg0.then(arg1);
              return ret;
          },
          __wbindgen_generic_0000000000000001: function(arg0, arg1) {
              // Cast intrinsic for `Closure(Closure { owned: true, function: Function { arguments: [Externref], shim_idx: 243, ret: Result(Unit), inner_ret: Some(Result(Unit)) }, mutable: true }) -> Externref`.
              const ret = makeMutClosure(arg0, arg1, wasm_bindgen_93a4702c0080a70d___convert__closures_____invoke___wasm_bindgen_93a4702c0080a70d___JsValue__core_37ee0ce0c4cd57d5___result__Result_____wasm_bindgen_93a4702c0080a70d___JsError___true_);
              return ret;
          },
          __wbindgen_init_externref_table: function() {
              const table = wasm$1.__wbindgen_externrefs;
              table.set(0, undefined);
              table.set(1024, undefined);
              table.set(1025, null);
              table.set(1026, true);
              table.set(1027, false);
          },
      };
      return {
          __proto__: null,
          "./index_bg.js": import0,
          "./snippets/rune-wasm-66e7e446edbe2776/module.js": import1,
      };
  }

  function wasm_bindgen_93a4702c0080a70d___convert__closures_____invoke___wasm_bindgen_93a4702c0080a70d___JsValue__core_37ee0ce0c4cd57d5___result__Result_____wasm_bindgen_93a4702c0080a70d___JsError___true_(arg0, arg1, arg2) {
      const ret = wasm$1.wasm_bindgen_93a4702c0080a70d___convert__closures_____invoke___wasm_bindgen_93a4702c0080a70d___JsValue__core_37ee0ce0c4cd57d5___result__Result_____wasm_bindgen_93a4702c0080a70d___JsError___true_(arg0, arg1, arg2);
      if (ret[1]) {
          throw takeFromExternrefTable0(ret[0]);
      }
  }

  function wasm_bindgen_93a4702c0080a70d___convert__closures_____invoke___js_sys_48b9705be7a9506e___Function_fn_wasm_bindgen_93a4702c0080a70d___JsValue_____wasm_bindgen_93a4702c0080a70d___sys__Undefined___js_sys_48b9705be7a9506e___Function_fn_wasm_bindgen_93a4702c0080a70d___JsValue_____wasm_bindgen_93a4702c0080a70d___sys__Undefined_______true_(arg0, arg1, arg2, arg3) {
      wasm$1.wasm_bindgen_93a4702c0080a70d___convert__closures_____invoke___js_sys_48b9705be7a9506e___Function_fn_wasm_bindgen_93a4702c0080a70d___JsValue_____wasm_bindgen_93a4702c0080a70d___sys__Undefined___js_sys_48b9705be7a9506e___Function_fn_wasm_bindgen_93a4702c0080a70d___JsValue_____wasm_bindgen_93a4702c0080a70d___sys__Undefined_______true_(arg0, arg1, arg2, arg3);
  }


  const __wbindgen_enum_RequestMode = ["same-origin", "no-cors", "cors", "navigate"];

  function addToExternrefTable0(obj) {
      const idx = wasm$1.__externref_table_alloc();
      wasm$1.__wbindgen_externrefs.set(idx, obj);
      return idx;
  }

  const CLOSURE_DTORS = (typeof FinalizationRegistry === 'undefined')
      ? { register: () => {}, unregister: () => {} }
      : new FinalizationRegistry(state => wasm$1.__wbindgen_destroy_closure(state.a, state.b));

  let cachedDataViewMemory0 = null;
  function getDataViewMemory0() {
      if (cachedDataViewMemory0 === null || cachedDataViewMemory0.buffer.detached === true || (cachedDataViewMemory0.buffer.detached === undefined && cachedDataViewMemory0.buffer !== wasm$1.memory.buffer)) {
          cachedDataViewMemory0 = new DataView(wasm$1.memory.buffer);
      }
      return cachedDataViewMemory0;
  }

  function getStringFromWasm0(ptr, len) {
      ptr = ptr >>> 0;
      return decodeText(getUint8ArrayMemory0().subarray(ptr, ptr + len));
  }

  let cachedUint8ArrayMemory0 = null;
  function getUint8ArrayMemory0() {
      if (cachedUint8ArrayMemory0 === null || cachedUint8ArrayMemory0.byteLength === 0) {
          cachedUint8ArrayMemory0 = new Uint8Array(wasm$1.memory.buffer);
      }
      return cachedUint8ArrayMemory0;
  }

  function handleError(f, args) {
      try {
          return f.apply(this, args);
      } catch (e) {
          const idx = addToExternrefTable0(e);
          wasm$1.__wbindgen_exn_store(idx);
      }
  }

  function isLikeNone(x) {
      return x === undefined || x === null;
  }

  function makeMutClosure(arg0, arg1, f) {
      const state = { a: arg0, b: arg1, cnt: 1 };
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
              state.a = a;
              real._wbg_cb_unref();
          }
      };
      real._wbg_cb_unref = () => {
          if (--state.cnt === 0) {
              wasm$1.__wbindgen_destroy_closure(state.a, state.b);
              state.a = 0;
              CLOSURE_DTORS.unregister(state);
          }
      };
      CLOSURE_DTORS.register(real, state, state);
      return real;
  }

  function passStringToWasm0(arg, malloc, realloc) {
      if (realloc === undefined) {
          const buf = cachedTextEncoder.encode(arg);
          const ptr = malloc(buf.length, 1) >>> 0;
          getUint8ArrayMemory0().subarray(ptr, ptr + buf.length).set(buf);
          WASM_VECTOR_LEN = buf.length;
          return ptr;
      }

      let len = arg.length;
      let ptr = malloc(len, 1) >>> 0;

      const mem = getUint8ArrayMemory0();

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
          ptr = realloc(ptr, len, len = offset + arg.length * 3, 1) >>> 0;
          const view = getUint8ArrayMemory0().subarray(ptr + offset, ptr + len);
          const ret = cachedTextEncoder.encodeInto(arg, view);

          offset += ret.written;
          ptr = realloc(ptr, len, offset, 1) >>> 0;
      }

      WASM_VECTOR_LEN = offset;
      return ptr;
  }

  function takeFromExternrefTable0(idx) {
      const value = wasm$1.__wbindgen_externrefs.get(idx);
      wasm$1.__externref_table_dealloc(idx);
      return value;
  }

  let cachedTextDecoder = new TextDecoder('utf-8', { ignoreBOM: true });
  cachedTextDecoder.decode();
  const MAX_SAFARI_DECODE_BYTES = 2146435072;
  let numBytesDecoded = 0;
  function decodeText(bytes) {
      numBytesDecoded += bytes.length;
      if (numBytesDecoded >= MAX_SAFARI_DECODE_BYTES) {
          cachedTextDecoder = new TextDecoder('utf-8', { ignoreBOM: true });
          cachedTextDecoder.decode();
          numBytesDecoded = bytes.length;
      }
      return cachedTextDecoder.decode(bytes);
  }

  const cachedTextEncoder = new TextEncoder();

  if (!('encodeInto' in cachedTextEncoder)) {
      cachedTextEncoder.encodeInto = function (arg, view) {
          const buf = cachedTextEncoder.encode(arg);
          view.set(buf);
          return {
              read: arg.length,
              written: buf.length
          };
      };
  }

  let WASM_VECTOR_LEN = 0;

  let wasm$1;
  function __wbg_finalize_init(instance, module) {
      wasm$1 = instance.exports;
      cachedDataViewMemory0 = null;
      cachedUint8ArrayMemory0 = null;
      wasm$1.__wbindgen_start();
      return wasm$1;
  }

  async function __wbg_load(module, imports) {
      if (typeof Response === 'function' && module instanceof Response) {
          if (!module.ok) {
              throw new Error(`failed to fetch Wasm: ${module.status} ${module.statusText} fetching '${module.url}'`);
          }

          if (typeof WebAssembly.instantiateStreaming === 'function') {
              try {
                  return await WebAssembly.instantiateStreaming(module, imports);
              } catch (e) {
                  const validResponse = expectedResponseType(module.type);

                  if (validResponse && module.headers.get('Content-Type') !== 'application/wasm') {
                      console.warn("`WebAssembly.instantiateStreaming` failed because your server does not serve Wasm with `application/wasm` MIME type. Falling back to `WebAssembly.instantiate` which is slower. Original error:\n", e);

                  } else { throw e; }
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

      function expectedResponseType(type) {
          switch (type) {
              case 'basic': case 'cors': case 'default': return true;
          }
          return false;
      }
  }

  function initSync(module) {
      if (wasm$1 !== undefined) return wasm$1;


      if (module !== undefined) {
          if (Object.getPrototypeOf(module) === Object.prototype) {
              ({module} = module);
          } else {
              console.warn('using deprecated parameters for `initSync()`; pass a single object instead');
          }
      }

      const imports = __wbg_get_imports();
      if (!(module instanceof WebAssembly.Module)) {
          module = new WebAssembly.Module(module);
      }
      const instance = new WebAssembly.Instance(module, imports);
      return __wbg_finalize_init(instance);
  }

  let __wbg_init_promise;
  async function __wbg_init(module_or_path) {
      if (wasm$1 !== undefined) return wasm$1;
      if (__wbg_init_promise === undefined) {
          __wbg_init_promise = __wbg_init_once(module_or_path);
          __wbg_init_promise.catch(() => { __wbg_init_promise = undefined; });
      }
      return __wbg_init_promise;
  }

  async function __wbg_init_once(module_or_path) {

      if (module_or_path !== undefined) {
          if (Object.getPrototypeOf(module_or_path) === Object.prototype) {
              ({module_or_path} = module_or_path);
          } else {
              console.warn('using deprecated parameters for the initialization function; pass a single object instead');
          }
      }


      const imports = __wbg_get_imports();

      if (typeof module_or_path === 'string' || (typeof Request === 'function' && module_or_path instanceof Request) || (typeof URL === 'function' && module_or_path instanceof URL)) {
          module_or_path = fetch(module_or_path);
      }

      const { instance, module } = await __wbg_load(await module_or_path, imports);

      return __wbg_finalize_init(instance);
  }

  var exports$1 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    compile: compile,
    default: __wbg_init,
    initSync: initSync
  });

  var wasm = async (opt = {}) => {
                  let {importHook, serverPath} = opt;

                  let path = "/js/assets/rune_wasm-9ea8c809.wasm";

                  if (serverPath != null) {
                      path = serverPath + /[^\/\\]*$/.exec(path)[0];
                  }

                  if (importHook != null) {
                      path = importHook(path);
                  }

                  await __wbg_init(path);
                  return exports$1;
              };

  async function init() {
      exports.module = await wasm();
  }

  exports.module = null;

  exports.init = init;

  return exports;

})({});
//# sourceMappingURL=rune.js.map
