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

  let cachedUint8ArrayMemory0 = null;

  function getUint8ArrayMemory0() {
      if (cachedUint8ArrayMemory0 === null || cachedUint8ArrayMemory0.byteLength === 0) {
          cachedUint8ArrayMemory0 = new Uint8Array(wasm$1.memory.buffer);
      }
      return cachedUint8ArrayMemory0;
  }

  let cachedTextDecoder = (typeof TextDecoder !== 'undefined' ? new TextDecoder('utf-8', { ignoreBOM: true, fatal: true }) : { decode: () => { throw Error('TextDecoder not available') } } );

  if (typeof TextDecoder !== 'undefined') { cachedTextDecoder.decode(); }
  const MAX_SAFARI_DECODE_BYTES = 2146435072;
  let numBytesDecoded = 0;
  function decodeText(ptr, len) {
      numBytesDecoded += len;
      if (numBytesDecoded >= MAX_SAFARI_DECODE_BYTES) {
          cachedTextDecoder = (typeof TextDecoder !== 'undefined' ? new TextDecoder('utf-8', { ignoreBOM: true, fatal: true }) : { decode: () => { throw Error('TextDecoder not available') } } );
          cachedTextDecoder.decode();
          numBytesDecoded = len;
      }
      return cachedTextDecoder.decode(getUint8ArrayMemory0().subarray(ptr, ptr + len));
  }

  function getStringFromWasm0(ptr, len) {
      ptr = ptr >>> 0;
      return decodeText(ptr, len);
  }

  function isLikeNone(x) {
      return x === undefined || x === null;
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

  const CLOSURE_DTORS = (typeof FinalizationRegistry === 'undefined')
      ? { register: () => {}, unregister: () => {} }
      : new FinalizationRegistry(
  state => {
      wasm$1.__wbindgen_export_5.get(state.dtor)(state.a, state.b);
  }
  );

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
                  wasm$1.__wbindgen_export_5.get(state.dtor)(a, state.b);
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

  function __wbg_adapter_6(arg0, arg1, arg2) {
      wasm$1.closure1149_externref_shim(arg0, arg1, arg2);
  }

  function __wbg_adapter_24(arg0, arg1, arg2, arg3) {
      wasm$1.closure253_externref_shim(arg0, arg1, arg2, arg3);
  }

  const __wbindgen_enum_RequestMode = ["same-origin", "no-cors", "cors", "navigate"];

  const EXPECTED_RESPONSE_TYPES = new Set(['basic', 'cors', 'default']);

  async function __wbg_load(module, imports) {
      if (typeof Response === 'function' && module instanceof Response) {
          if (typeof WebAssembly.instantiateStreaming === 'function') {
              try {
                  return await WebAssembly.instantiateStreaming(module, imports);

              } catch (e) {
                  const validResponse = module.ok && EXPECTED_RESPONSE_TYPES.has(module.type);

                  if (validResponse && module.headers.get('Content-Type') !== 'application/wasm') {
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
      imports.wbg.__wbg_call_2f8d426a20a307fe = function() { return handleError(function (arg0, arg1) {
          const ret = arg0.call(arg1);
          return ret;
      }, arguments) };
      imports.wbg.__wbg_call_f53f0647ceb9c567 = function() { return handleError(function (arg0, arg1, arg2) {
          const ret = arg0.call(arg1, arg2);
          return ret;
      }, arguments) };
      imports.wbg.__wbg_fetch_8de6de50a61a58f2 = function(arg0, arg1) {
          const ret = arg0.fetch(arg1);
          return ret;
      };
      imports.wbg.__wbg_instanceof_Response_0ab386c6818f788a = function(arg0) {
          let result;
          try {
              result = arg0 instanceof Response;
          } catch (_) {
              result = false;
          }
          const ret = result;
          return ret;
      };
      imports.wbg.__wbg_instanceof_Window_7f29e5c72acbfd60 = function(arg0) {
          let result;
          try {
              result = arg0 instanceof Window;
          } catch (_) {
              result = false;
          }
          const ret = result;
          return ret;
      };
      imports.wbg.__wbg_new_1930cbb8d9ffc31b = function() {
          const ret = new Object();
          return ret;
      };
      imports.wbg.__wbg_new_d5e3800b120e37e1 = function(arg0, arg1) {
          try {
              var state0 = {a: arg0, b: arg1};
              var cb0 = (arg0, arg1) => {
                  const a = state0.a;
                  state0.a = 0;
                  try {
                      return __wbg_adapter_24(a, state0.b, arg0, arg1);
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
      imports.wbg.__wbg_newnoargs_a81330f6e05d8aca = function(arg0, arg1) {
          const ret = new Function(getStringFromWasm0(arg0, arg1));
          return ret;
      };
      imports.wbg.__wbg_newwithstr_2cca0964a0c51610 = function() { return handleError(function (arg0, arg1) {
          const ret = new Request(getStringFromWasm0(arg0, arg1));
          return ret;
      }, arguments) };
      imports.wbg.__wbg_parse_0eaa937cfd6388c4 = function() { return handleError(function (arg0, arg1) {
          const ret = JSON.parse(getStringFromWasm0(arg0, arg1));
          return ret;
      }, arguments) };
      imports.wbg.__wbg_queueMicrotask_bcc6e26d899696db = function(arg0) {
          const ret = arg0.queueMicrotask;
          return ret;
      };
      imports.wbg.__wbg_queueMicrotask_f24a794d09c42640 = function(arg0) {
          queueMicrotask(arg0);
      };
      imports.wbg.__wbg_resolve_5775c0ef9222f556 = function(arg0) {
          const ret = Promise.resolve(arg0);
          return ret;
      };
      imports.wbg.__wbg_setmethod_9ce6e95af1ae0eaf = function(arg0, arg1, arg2) {
          arg0.method = getStringFromWasm0(arg1, arg2);
      };
      imports.wbg.__wbg_setmode_b89d1784e7e7f118 = function(arg0, arg1) {
          arg0.mode = __wbindgen_enum_RequestMode[arg1];
      };
      imports.wbg.__wbg_static_accessor_GLOBAL_1f13249cc3acc96d = function() {
          const ret = typeof global === 'undefined' ? null : global;
          return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
      };
      imports.wbg.__wbg_static_accessor_GLOBAL_THIS_df7ae94b1e0ed6a3 = function() {
          const ret = typeof globalThis === 'undefined' ? null : globalThis;
          return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
      };
      imports.wbg.__wbg_static_accessor_SELF_6265471db3b3c228 = function() {
          const ret = typeof self === 'undefined' ? null : self;
          return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
      };
      imports.wbg.__wbg_static_accessor_WINDOW_16fb482f8ec52863 = function() {
          const ret = typeof window === 'undefined' ? null : window;
          return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
      };
      imports.wbg.__wbg_stringify_1f41b6198e0932e0 = function() { return handleError(function (arg0) {
          const ret = JSON.stringify(arg0);
          return ret;
      }, arguments) };
      imports.wbg.__wbg_text_42c080764c927da6 = function() { return handleError(function (arg0) {
          const ret = arg0.text();
          return ret;
      }, arguments) };
      imports.wbg.__wbg_then_8d2fcccde5380a03 = function(arg0, arg1, arg2) {
          const ret = arg0.then(arg1, arg2);
          return ret;
      };
      imports.wbg.__wbg_then_9cc266be2bf537b6 = function(arg0, arg1) {
          const ret = arg0.then(arg1);
          return ret;
      };
      imports.wbg.__wbg_wbindgencbdrop_a85ed476c6a370b9 = function(arg0) {
          const obj = arg0.original;
          if (obj.cnt-- == 1) {
              obj.a = 0;
              return true;
          }
          const ret = false;
          return ret;
      };
      imports.wbg.__wbg_wbindgenisfunction_ea72b9d66a0e1705 = function(arg0) {
          const ret = typeof(arg0) === 'function';
          return ret;
      };
      imports.wbg.__wbg_wbindgenisundefined_71f08a6ade4354e7 = function(arg0) {
          const ret = arg0 === undefined;
          return ret;
      };
      imports.wbg.__wbg_wbindgenstringget_43fe05afe34b0cb1 = function(arg0, arg1) {
          const obj = arg1;
          const ret = typeof(obj) === 'string' ? obj : undefined;
          var ptr1 = isLikeNone(ret) ? 0 : passStringToWasm0(ret, wasm$1.__wbindgen_malloc, wasm$1.__wbindgen_realloc);
          var len1 = WASM_VECTOR_LEN;
          getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
          getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
      };
      imports.wbg.__wbg_wbindgenthrow_4c11a24fca429ccf = function(arg0, arg1) {
          throw new Error(getStringFromWasm0(arg0, arg1));
      };
      imports.wbg.__wbindgen_cast_3f592322ea47d039 = function(arg0, arg1) {
          // Cast intrinsic for `Closure(Closure { dtor_idx: 1148, function: Function { arguments: [Externref], shim_idx: 1149, ret: Unit, inner_ret: Some(Unit) }, mutable: true }) -> Externref`.
          const ret = makeMutClosure(arg0, arg1, 1148, __wbg_adapter_6);
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
      imports['./snippets/rune-wasm-66e7e446edbe2776/module.js'] = __wbg_star0;

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

                  let path = "/js/assets/rune_wasm-eee37681.wasm";

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
