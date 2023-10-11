var rune = (function (exports) {
  'use strict';

  /// Hook used to construct an async sleep function.
  function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  let wasm$1;

  const heap = new Array(128).fill(undefined);

  heap.push(undefined, null, true, false);

  function getObject(idx) { return heap[idx]; }

  let heap_next = heap.length;

  function dropObject(idx) {
      if (idx < 132) return;
      heap[idx] = heap_next;
      heap_next = idx;
  }

  function takeObject(idx) {
      const ret = getObject(idx);
      dropObject(idx);
      return ret;
  }

  let WASM_VECTOR_LEN = 0;

  let cachedUint8Memory0 = null;

  function getUint8Memory0() {
      if (cachedUint8Memory0 === null || cachedUint8Memory0.byteLength === 0) {
          cachedUint8Memory0 = new Uint8Array(wasm$1.memory.buffer);
      }
      return cachedUint8Memory0;
  }

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
          getUint8Memory0().subarray(ptr, ptr + buf.length).set(buf);
          WASM_VECTOR_LEN = buf.length;
          return ptr;
      }

      let len = arg.length;
      let ptr = malloc(len, 1) >>> 0;

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
          ptr = realloc(ptr, len, len = offset + arg.length * 3, 1) >>> 0;
          const view = getUint8Memory0().subarray(ptr + offset, ptr + len);
          const ret = encodeString(arg, view);

          offset += ret.written;
      }

      WASM_VECTOR_LEN = offset;
      return ptr;
  }

  function isLikeNone(x) {
      return x === undefined || x === null;
  }

  let cachedInt32Memory0 = null;

  function getInt32Memory0() {
      if (cachedInt32Memory0 === null || cachedInt32Memory0.byteLength === 0) {
          cachedInt32Memory0 = new Int32Array(wasm$1.memory.buffer);
      }
      return cachedInt32Memory0;
  }

  const cachedTextDecoder = (typeof TextDecoder !== 'undefined' ? new TextDecoder('utf-8', { ignoreBOM: true, fatal: true }) : { decode: () => { throw Error('TextDecoder not available') } } );

  if (typeof TextDecoder !== 'undefined') { cachedTextDecoder.decode(); }
  function getStringFromWasm0(ptr, len) {
      ptr = ptr >>> 0;
      return cachedTextDecoder.decode(getUint8Memory0().subarray(ptr, ptr + len));
  }

  function addHeapObject(obj) {
      if (heap_next === heap.length) heap.push(heap.length + 1);
      const idx = heap_next;
      heap_next = heap[idx];

      heap[idx] = obj;
      return idx;
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
                  wasm$1.__wbindgen_export_2.get(state.dtor)(a, state.b);

              } else {
                  state.a = a;
              }
          }
      };
      real.original = state;

      return real;
  }
  function __wbg_adapter_24(arg0, arg1, arg2) {
      wasm$1.wasm_bindgen__convert__closures__invoke1_mut__h0ea9e0001846e013(arg0, arg1, addHeapObject(arg2));
  }

  /**
  * @param {string} input
  * @param {any} config
  * @returns {Promise<any>}
  */
  function compile(input, config) {
      const ptr0 = passStringToWasm0(input, wasm$1.__wbindgen_malloc, wasm$1.__wbindgen_realloc);
      const len0 = WASM_VECTOR_LEN;
      const ret = wasm$1.compile(ptr0, len0, addHeapObject(config));
      return takeObject(ret);
  }

  function handleError(f, args) {
      try {
          return f.apply(this, args);
      } catch (e) {
          wasm$1.__wbindgen_exn_store(addHeapObject(e));
      }
  }
  function __wbg_adapter_60(arg0, arg1, arg2, arg3) {
      wasm$1.wasm_bindgen__convert__closures__invoke2_mut__hd1ecd8f7ac9da3c7(arg0, arg1, addHeapObject(arg2), addHeapObject(arg3));
  }

  async function __wbg_load(module, imports) {
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

  function __wbg_get_imports() {
      const imports = {};
      imports.wbg = {};
      imports.wbg.__wbg_parse_670c19d4e984792e = function() { return handleError(function (arg0, arg1) {
          const ret = JSON.parse(getStringFromWasm0(arg0, arg1));
          return addHeapObject(ret);
      }, arguments) };
      imports.wbg.__wbg_call_01734de55d61e11d = function() { return handleError(function (arg0, arg1, arg2) {
          const ret = getObject(arg0).call(getObject(arg1), getObject(arg2));
          return addHeapObject(ret);
      }, arguments) };
      imports.wbg.__wbindgen_object_drop_ref = function(arg0) {
          takeObject(arg0);
      };
      imports.wbg.__wbindgen_cb_drop = function(arg0) {
          const obj = takeObject(arg0).original;
          if (obj.cnt-- == 1) {
              obj.a = 0;
              return true;
          }
          const ret = false;
          return ret;
      };
      imports.wbg.__wbg_text_a667ac1770538491 = function() { return handleError(function (arg0) {
          const ret = getObject(arg0).text();
          return addHeapObject(ret);
      }, arguments) };
      imports.wbg.__wbindgen_string_get = function(arg0, arg1) {
          const obj = getObject(arg1);
          const ret = typeof(obj) === 'string' ? obj : undefined;
          var ptr1 = isLikeNone(ret) ? 0 : passStringToWasm0(ret, wasm$1.__wbindgen_malloc, wasm$1.__wbindgen_realloc);
          var len1 = WASM_VECTOR_LEN;
          getInt32Memory0()[arg0 / 4 + 1] = len1;
          getInt32Memory0()[arg0 / 4 + 0] = ptr1;
      };
      imports.wbg.__wbg_sleep_e610479fa9a14d22 = function(arg0) {
          const ret = sleep(arg0);
          return addHeapObject(ret);
      };
      imports.wbg.__wbg_new_b51585de1b234aff = function() {
          const ret = new Object();
          return addHeapObject(ret);
      };
      imports.wbg.__wbindgen_string_new = function(arg0, arg1) {
          const ret = getStringFromWasm0(arg0, arg1);
          return addHeapObject(ret);
      };
      imports.wbg.__wbg_set_092e06b0f9d71865 = function() { return handleError(function (arg0, arg1, arg2) {
          const ret = Reflect.set(getObject(arg0), getObject(arg1), getObject(arg2));
          return ret;
      }, arguments) };
      imports.wbg.__wbg_newwithstr_3d9bc779603a93c7 = function() { return handleError(function (arg0, arg1) {
          const ret = new Request(getStringFromWasm0(arg0, arg1));
          return addHeapObject(ret);
      }, arguments) };
      imports.wbg.__wbg_instanceof_Window_9029196b662bc42a = function(arg0) {
          let result;
          try {
              result = getObject(arg0) instanceof Window;
          } catch {
              result = false;
          }
          const ret = result;
          return ret;
      };
      imports.wbg.__wbg_fetch_336b6f0cb426b46e = function(arg0, arg1) {
          const ret = getObject(arg0).fetch(getObject(arg1));
          return addHeapObject(ret);
      };
      imports.wbg.__wbg_instanceof_Response_fc4327dbfcdf5ced = function(arg0) {
          let result;
          try {
              result = getObject(arg0) instanceof Response;
          } catch {
              result = false;
          }
          const ret = result;
          return ret;
      };
      imports.wbg.__wbindgen_is_undefined = function(arg0) {
          const ret = getObject(arg0) === undefined;
          return ret;
      };
      imports.wbg.__wbg_stringify_e25465938f3f611f = function() { return handleError(function (arg0) {
          const ret = JSON.stringify(getObject(arg0));
          return addHeapObject(ret);
      }, arguments) };
      imports.wbg.__wbg_new_43f1b47c28813cbd = function(arg0, arg1) {
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
              return addHeapObject(ret);
          } finally {
              state0.a = state0.b = 0;
          }
      };
      imports.wbg.__wbg_crypto_c48a774b022d20ac = function(arg0) {
          const ret = getObject(arg0).crypto;
          return addHeapObject(ret);
      };
      imports.wbg.__wbindgen_is_object = function(arg0) {
          const val = getObject(arg0);
          const ret = typeof(val) === 'object' && val !== null;
          return ret;
      };
      imports.wbg.__wbg_process_298734cf255a885d = function(arg0) {
          const ret = getObject(arg0).process;
          return addHeapObject(ret);
      };
      imports.wbg.__wbg_versions_e2e78e134e3e5d01 = function(arg0) {
          const ret = getObject(arg0).versions;
          return addHeapObject(ret);
      };
      imports.wbg.__wbg_node_1cd7a5d853dbea79 = function(arg0) {
          const ret = getObject(arg0).node;
          return addHeapObject(ret);
      };
      imports.wbg.__wbindgen_is_string = function(arg0) {
          const ret = typeof(getObject(arg0)) === 'string';
          return ret;
      };
      imports.wbg.__wbg_msCrypto_bcb970640f50a1e8 = function(arg0) {
          const ret = getObject(arg0).msCrypto;
          return addHeapObject(ret);
      };
      imports.wbg.__wbg_newwithlength_e5d69174d6984cd7 = function(arg0) {
          const ret = new Uint8Array(arg0 >>> 0);
          return addHeapObject(ret);
      };
      imports.wbg.__wbg_require_8f08ceecec0f4fee = function() { return handleError(function () {
          const ret = module.require;
          return addHeapObject(ret);
      }, arguments) };
      imports.wbg.__wbindgen_is_function = function(arg0) {
          const ret = typeof(getObject(arg0)) === 'function';
          return ret;
      };
      imports.wbg.__wbindgen_memory = function() {
          const ret = wasm$1.memory;
          return addHeapObject(ret);
      };
      imports.wbg.__wbg_buffer_085ec1f694018c4f = function(arg0) {
          const ret = getObject(arg0).buffer;
          return addHeapObject(ret);
      };
      imports.wbg.__wbg_newwithbyteoffsetandlength_6da8e527659b86aa = function(arg0, arg1, arg2) {
          const ret = new Uint8Array(getObject(arg0), arg1 >>> 0, arg2 >>> 0);
          return addHeapObject(ret);
      };
      imports.wbg.__wbg_randomFillSync_dc1e9a60c158336d = function() { return handleError(function (arg0, arg1) {
          getObject(arg0).randomFillSync(takeObject(arg1));
      }, arguments) };
      imports.wbg.__wbg_subarray_13db269f57aa838d = function(arg0, arg1, arg2) {
          const ret = getObject(arg0).subarray(arg1 >>> 0, arg2 >>> 0);
          return addHeapObject(ret);
      };
      imports.wbg.__wbg_getRandomValues_37fa2ca9e4e07fab = function() { return handleError(function (arg0, arg1) {
          getObject(arg0).getRandomValues(getObject(arg1));
      }, arguments) };
      imports.wbg.__wbg_new_8125e318e6245eed = function(arg0) {
          const ret = new Uint8Array(getObject(arg0));
          return addHeapObject(ret);
      };
      imports.wbg.__wbg_set_5cf90238115182c3 = function(arg0, arg1, arg2) {
          getObject(arg0).set(getObject(arg1), arg2 >>> 0);
      };
      imports.wbg.__wbg_self_1ff1d729e9aae938 = function() { return handleError(function () {
          const ret = self.self;
          return addHeapObject(ret);
      }, arguments) };
      imports.wbg.__wbg_window_5f4faef6c12b79ec = function() { return handleError(function () {
          const ret = window.window;
          return addHeapObject(ret);
      }, arguments) };
      imports.wbg.__wbg_globalThis_1d39714405582d3c = function() { return handleError(function () {
          const ret = globalThis.globalThis;
          return addHeapObject(ret);
      }, arguments) };
      imports.wbg.__wbg_global_651f05c6a0944d1c = function() { return handleError(function () {
          const ret = global.global;
          return addHeapObject(ret);
      }, arguments) };
      imports.wbg.__wbg_newnoargs_581967eacc0e2604 = function(arg0, arg1) {
          const ret = new Function(getStringFromWasm0(arg0, arg1));
          return addHeapObject(ret);
      };
      imports.wbg.__wbg_call_cb65541d95d71282 = function() { return handleError(function (arg0, arg1) {
          const ret = getObject(arg0).call(getObject(arg1));
          return addHeapObject(ret);
      }, arguments) };
      imports.wbg.__wbindgen_object_clone_ref = function(arg0) {
          const ret = getObject(arg0);
          return addHeapObject(ret);
      };
      imports.wbg.__wbindgen_throw = function(arg0, arg1) {
          throw new Error(getStringFromWasm0(arg0, arg1));
      };
      imports.wbg.__wbg_then_b2267541e2a73865 = function(arg0, arg1, arg2) {
          const ret = getObject(arg0).then(getObject(arg1), getObject(arg2));
          return addHeapObject(ret);
      };
      imports.wbg.__wbg_resolve_53698b95aaf7fcf8 = function(arg0) {
          const ret = Promise.resolve(getObject(arg0));
          return addHeapObject(ret);
      };
      imports.wbg.__wbg_then_f7e06ee3c11698eb = function(arg0, arg1) {
          const ret = getObject(arg0).then(getObject(arg1));
          return addHeapObject(ret);
      };
      imports.wbg.__wbindgen_closure_wrapper4732 = function(arg0, arg1, arg2) {
          const ret = makeMutClosure(arg0, arg1, 655, __wbg_adapter_24);
          return addHeapObject(ret);
      };

      return imports;
  }

  function __wbg_finalize_init(instance, module) {
      wasm$1 = instance.exports;
      __wbg_init.__wbindgen_wasm_module = module;
      cachedInt32Memory0 = null;
      cachedUint8Memory0 = null;


      return wasm$1;
  }

  function initSync(module) {
      if (wasm$1 !== undefined) return wasm$1;

      const imports = __wbg_get_imports();

      if (!(module instanceof WebAssembly.Module)) {
          module = new WebAssembly.Module(module);
      }

      const instance = new WebAssembly.Instance(module, imports);

      return __wbg_finalize_init(instance, module);
  }

  async function __wbg_init(input) {
      if (wasm$1 !== undefined) return wasm$1;


      const imports = __wbg_get_imports();

      if (typeof input === 'string' || (typeof Request === 'function' && input instanceof Request) || (typeof URL === 'function' && input instanceof URL)) {
          input = fetch(input);
      }

      const { instance, module } = await __wbg_load(await input, imports);

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

                  let path = "/js/assets/rune_wasm-3a79aaf5.wasm";

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
