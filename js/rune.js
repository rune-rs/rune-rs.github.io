var rune = (function (exports) {
  'use strict';

  /// Hook used to construct an async sleep function.
  function js_sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  var __wbg_star0 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    js_sleep: js_sleep
  });

  let wasm$1;

  function addToExternrefTable0(obj) {
      const idx = wasm$1.__externref_table_alloc();
      wasm$1.__wbindgen_export_2.set(idx, obj);
      return idx;
  }

  function handleError(f, args) {
      try {
          return f.apply(this, args);
      } catch (e) {
          const idx = addToExternrefTable0(e);
          wasm$1.__wbindgen_exn_store(idx);
      }
  }

  const cachedTextDecoder = (typeof TextDecoder !== 'undefined' ? new TextDecoder('utf-8', { ignoreBOM: true, fatal: true }) : { decode: () => { throw Error('TextDecoder not available') } } );

  if (typeof TextDecoder !== 'undefined') { cachedTextDecoder.decode(); }
  let cachedUint8ArrayMemory0 = null;

  function getUint8ArrayMemory0() {
      if (cachedUint8ArrayMemory0 === null || cachedUint8ArrayMemory0.byteLength === 0) {
          cachedUint8ArrayMemory0 = new Uint8Array(wasm$1.memory.buffer);
      }
      return cachedUint8ArrayMemory0;
  }

  function getStringFromWasm0(ptr, len) {
      ptr = ptr >>> 0;
      return cachedTextDecoder.decode(getUint8ArrayMemory0().subarray(ptr, ptr + len));
  }

  function isLikeNone(x) {
      return x === undefined || x === null;
  }

  const CLOSURE_DTORS = (typeof FinalizationRegistry === 'undefined')
      ? { register: () => {}, unregister: () => {} }
      : new FinalizationRegistry(state => {
      wasm$1.__wbindgen_export_3.get(state.dtor)(state.a, state.b);
  });

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
                  wasm$1.__wbindgen_export_3.get(state.dtor)(a, state.b);
                  CLOSURE_DTORS.unregister(state);
              } else {
                  state.a = a;
              }
          }
      };
      real.original = state;
      CLOSURE_DTORS.register(real, state, state);
      return real;
  }

  let WASM_VECTOR_LEN = 0;

  const cachedTextEncoder = (typeof TextEncoder !== 'undefined' ? new TextEncoder('utf-8') : { encode: () => { throw Error('TextEncoder not available') } } );

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
          const ret = encodeString(arg, view);

          offset += ret.written;
          ptr = realloc(ptr, len, offset, 1) >>> 0;
      }

      WASM_VECTOR_LEN = offset;
      return ptr;
  }

  let cachedDataViewMemory0 = null;

  function getDataViewMemory0() {
      if (cachedDataViewMemory0 === null || cachedDataViewMemory0.buffer.detached === true || (cachedDataViewMemory0.buffer.detached === undefined && cachedDataViewMemory0.buffer !== wasm$1.memory.buffer)) {
          cachedDataViewMemory0 = new DataView(wasm$1.memory.buffer);
      }
      return cachedDataViewMemory0;
  }
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

  function __wbg_adapter_26(arg0, arg1, arg2) {
      wasm$1.closure1154_externref_shim(arg0, arg1, arg2);
  }

  function __wbg_adapter_60(arg0, arg1, arg2, arg3) {
      wasm$1.closure264_externref_shim(arg0, arg1, arg2, arg3);
  }

  const __wbindgen_enum_RequestMode = ["same-origin", "no-cors", "cors", "navigate"];

  async function __wbg_load(module, imports) {
      if (typeof Response === 'function' && module instanceof Response) {
          if (typeof WebAssembly.instantiateStreaming === 'function') {
              try {
                  return await WebAssembly.instantiateStreaming(module, imports);

              } catch (e) {
                  if (module.headers.get('Content-Type') != 'application/wasm') {
                      console.warn("`WebAssembly.instantiateStreaming` failed because your server does not serve Wasm with `application/wasm` MIME type. Falling back to `WebAssembly.instantiate` which is slower. Original error:\n", e);

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

  function __wbg_get_imports() {
      const imports = {};
      imports.wbg = {};
      imports.wbg.__wbg_buffer_609cc3eee51ed158 = function(arg0) {
          const ret = arg0.buffer;
          return ret;
      };
      imports.wbg.__wbg_call_672a4d21634d4a24 = function() { return handleError(function (arg0, arg1) {
          const ret = arg0.call(arg1);
          return ret;
      }, arguments) };
      imports.wbg.__wbg_call_7cccdd69e0791ae2 = function() { return handleError(function (arg0, arg1, arg2) {
          const ret = arg0.call(arg1, arg2);
          return ret;
      }, arguments) };
      imports.wbg.__wbg_crypto_ed58b8e10a292839 = function(arg0) {
          const ret = arg0.crypto;
          return ret;
      };
      imports.wbg.__wbg_fetch_b7bf320f681242d2 = function(arg0, arg1) {
          const ret = arg0.fetch(arg1);
          return ret;
      };
      imports.wbg.__wbg_getRandomValues_bcb4912f16000dc4 = function() { return handleError(function (arg0, arg1) {
          arg0.getRandomValues(arg1);
      }, arguments) };
      imports.wbg.__wbg_instanceof_Response_f2cc20d9f7dfd644 = function(arg0) {
          let result;
          try {
              result = arg0 instanceof Response;
          } catch (_) {
              result = false;
          }
          const ret = result;
          return ret;
      };
      imports.wbg.__wbg_instanceof_Window_def73ea0955fc569 = function(arg0) {
          let result;
          try {
              result = arg0 instanceof Window;
          } catch (_) {
              result = false;
          }
          const ret = result;
          return ret;
      };
      imports.wbg.__wbg_msCrypto_0a36e2ec3a343d26 = function(arg0) {
          const ret = arg0.msCrypto;
          return ret;
      };
      imports.wbg.__wbg_new_23a2665fac83c611 = function(arg0, arg1) {
          try {
              var state0 = {a: arg0, b: arg1};
              var cb0 = (arg0, arg1) => {
                  const a = state0.a;
                  state0.a = 0;
                  try {
                      return __wbg_adapter_60(a, state0.b, arg0, arg1);
                  } finally {
                      state0.a = a;
                  }
              };
              const ret = new Promise(cb0);
              return ret;
          } finally {
              state0.a = state0.b = 0;
          }
      };
      imports.wbg.__wbg_new_405e22f390576ce2 = function() {
          const ret = new Object();
          return ret;
      };
      imports.wbg.__wbg_new_a12002a7f91c75be = function(arg0) {
          const ret = new Uint8Array(arg0);
          return ret;
      };
      imports.wbg.__wbg_newnoargs_105ed471475aaf50 = function(arg0, arg1) {
          const ret = new Function(getStringFromWasm0(arg0, arg1));
          return ret;
      };
      imports.wbg.__wbg_newwithbyteoffsetandlength_d97e637ebe145a9a = function(arg0, arg1, arg2) {
          const ret = new Uint8Array(arg0, arg1 >>> 0, arg2 >>> 0);
          return ret;
      };
      imports.wbg.__wbg_newwithlength_a381634e90c276d4 = function(arg0) {
          const ret = new Uint8Array(arg0 >>> 0);
          return ret;
      };
      imports.wbg.__wbg_newwithstr_78e86e03c4ae814e = function() { return handleError(function (arg0, arg1) {
          const ret = new Request(getStringFromWasm0(arg0, arg1));
          return ret;
      }, arguments) };
      imports.wbg.__wbg_node_02999533c4ea02e3 = function(arg0) {
          const ret = arg0.node;
          return ret;
      };
      imports.wbg.__wbg_parse_def2e24ef1252aff = function() { return handleError(function (arg0, arg1) {
          const ret = JSON.parse(getStringFromWasm0(arg0, arg1));
          return ret;
      }, arguments) };
      imports.wbg.__wbg_process_5c1d670bc53614b8 = function(arg0) {
          const ret = arg0.process;
          return ret;
      };
      imports.wbg.__wbg_queueMicrotask_97d92b4fcc8a61c5 = function(arg0) {
          queueMicrotask(arg0);
      };
      imports.wbg.__wbg_queueMicrotask_d3219def82552485 = function(arg0) {
          const ret = arg0.queueMicrotask;
          return ret;
      };
      imports.wbg.__wbg_randomFillSync_ab2cfe79ebbf2740 = function() { return handleError(function (arg0, arg1) {
          arg0.randomFillSync(arg1);
      }, arguments) };
      imports.wbg.__wbg_require_79b1e9274cde3c87 = function() { return handleError(function () {
          const ret = module.require;
          return ret;
      }, arguments) };
      imports.wbg.__wbg_resolve_4851785c9c5f573d = function(arg0) {
          const ret = Promise.resolve(arg0);
          return ret;
      };
      imports.wbg.__wbg_set_65595bdd868b3009 = function(arg0, arg1, arg2) {
          arg0.set(arg1, arg2 >>> 0);
      };
      imports.wbg.__wbg_setmethod_3c5280fe5d890842 = function(arg0, arg1, arg2) {
          arg0.method = getStringFromWasm0(arg1, arg2);
      };
      imports.wbg.__wbg_setmode_5dc300b865044b65 = function(arg0, arg1) {
          arg0.mode = __wbindgen_enum_RequestMode[arg1];
      };
      imports.wbg.__wbg_static_accessor_GLOBAL_88a902d13a557d07 = function() {
          const ret = typeof global === 'undefined' ? null : global;
          return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
      };
      imports.wbg.__wbg_static_accessor_GLOBAL_THIS_56578be7e9f832b0 = function() {
          const ret = typeof globalThis === 'undefined' ? null : globalThis;
          return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
      };
      imports.wbg.__wbg_static_accessor_SELF_37c5d418e4bf5819 = function() {
          const ret = typeof self === 'undefined' ? null : self;
          return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
      };
      imports.wbg.__wbg_static_accessor_WINDOW_5de37043a91a9c40 = function() {
          const ret = typeof window === 'undefined' ? null : window;
          return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
      };
      imports.wbg.__wbg_stringify_f7ed6987935b4a24 = function() { return handleError(function (arg0) {
          const ret = JSON.stringify(arg0);
          return ret;
      }, arguments) };
      imports.wbg.__wbg_subarray_aa9065fa9dc5df96 = function(arg0, arg1, arg2) {
          const ret = arg0.subarray(arg1 >>> 0, arg2 >>> 0);
          return ret;
      };
      imports.wbg.__wbg_text_7805bea50de2af49 = function() { return handleError(function (arg0) {
          const ret = arg0.text();
          return ret;
      }, arguments) };
      imports.wbg.__wbg_then_44b73946d2fb3e7d = function(arg0, arg1) {
          const ret = arg0.then(arg1);
          return ret;
      };
      imports.wbg.__wbg_then_48b406749878a531 = function(arg0, arg1, arg2) {
          const ret = arg0.then(arg1, arg2);
          return ret;
      };
      imports.wbg.__wbg_versions_c71aa1626a93e0a1 = function(arg0) {
          const ret = arg0.versions;
          return ret;
      };
      imports.wbg.__wbindgen_cb_drop = function(arg0) {
          const obj = arg0.original;
          if (obj.cnt-- == 1) {
              obj.a = 0;
              return true;
          }
          const ret = false;
          return ret;
      };
      imports.wbg.__wbindgen_closure_wrapper6221 = function(arg0, arg1, arg2) {
          const ret = makeMutClosure(arg0, arg1, 1155, __wbg_adapter_26);
          return ret;
      };
      imports.wbg.__wbindgen_init_externref_table = function() {
          const table = wasm$1.__wbindgen_export_2;
          const offset = table.grow(4);
          table.set(0, undefined);
          table.set(offset + 0, undefined);
          table.set(offset + 1, null);
          table.set(offset + 2, true);
          table.set(offset + 3, false);
      };
      imports.wbg.__wbindgen_is_function = function(arg0) {
          const ret = typeof(arg0) === 'function';
          return ret;
      };
      imports.wbg.__wbindgen_is_object = function(arg0) {
          const val = arg0;
          const ret = typeof(val) === 'object' && val !== null;
          return ret;
      };
      imports.wbg.__wbindgen_is_string = function(arg0) {
          const ret = typeof(arg0) === 'string';
          return ret;
      };
      imports.wbg.__wbindgen_is_undefined = function(arg0) {
          const ret = arg0 === undefined;
          return ret;
      };
      imports.wbg.__wbindgen_memory = function() {
          const ret = wasm$1.memory;
          return ret;
      };
      imports.wbg.__wbindgen_string_get = function(arg0, arg1) {
          const obj = arg1;
          const ret = typeof(obj) === 'string' ? obj : undefined;
          var ptr1 = isLikeNone(ret) ? 0 : passStringToWasm0(ret, wasm$1.__wbindgen_malloc, wasm$1.__wbindgen_realloc);
          var len1 = WASM_VECTOR_LEN;
          getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
          getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
      };
      imports.wbg.__wbindgen_string_new = function(arg0, arg1) {
          const ret = getStringFromWasm0(arg0, arg1);
          return ret;
      };
      imports.wbg.__wbindgen_throw = function(arg0, arg1) {
          throw new Error(getStringFromWasm0(arg0, arg1));
      };
      imports['./snippets/rune-wasm-e969e647e0a8b2b4/module.js'] = __wbg_star0;

      return imports;
  }

  function __wbg_finalize_init(instance, module) {
      wasm$1 = instance.exports;
      __wbg_init.__wbindgen_wasm_module = module;
      cachedDataViewMemory0 = null;
      cachedUint8ArrayMemory0 = null;


      wasm$1.__wbindgen_start();
      return wasm$1;
  }

  function initSync(module) {
      if (wasm$1 !== undefined) return wasm$1;


      if (typeof module !== 'undefined') {
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

      return __wbg_finalize_init(instance, module);
  }

  async function __wbg_init(module_or_path) {
      if (wasm$1 !== undefined) return wasm$1;


      if (typeof module_or_path !== 'undefined') {
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

      return __wbg_finalize_init(instance, module);
  }

  var exports$1 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    compile: compile,
    default: __wbg_init,
    initSync: initSync
  });

  var wasm = async (opt = {}) => {
                  let {importHook, serverPath} = opt;

                  let path = "/js/assets/rune_wasm-470314b6.wasm";

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
