var rune = (function (exports) {
  'use strict';

  /// Hook used to construct an async sleep function.
  function js_sleep(ms) {
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

  let cachedUint8ArrayMemory0 = null;

  function getUint8ArrayMemory0() {
      if (cachedUint8ArrayMemory0 === null || cachedUint8ArrayMemory0.byteLength === 0) {
          cachedUint8ArrayMemory0 = new Uint8Array(wasm$1.memory.buffer);
      }
      return cachedUint8ArrayMemory0;
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

  function isLikeNone(x) {
      return x === undefined || x === null;
  }

  let cachedDataViewMemory0 = null;

  function getDataViewMemory0() {
      if (cachedDataViewMemory0 === null || cachedDataViewMemory0.buffer.detached === true || (cachedDataViewMemory0.buffer.detached === undefined && cachedDataViewMemory0.buffer !== wasm$1.memory.buffer)) {
          cachedDataViewMemory0 = new DataView(wasm$1.memory.buffer);
      }
      return cachedDataViewMemory0;
  }

  function addHeapObject(obj) {
      if (heap_next === heap.length) heap.push(heap.length + 1);
      const idx = heap_next;
      heap_next = heap[idx];

      heap[idx] = obj;
      return idx;
  }

  const cachedTextDecoder = (typeof TextDecoder !== 'undefined' ? new TextDecoder('utf-8', { ignoreBOM: true, fatal: true }) : { decode: () => { throw Error('TextDecoder not available') } } );

  if (typeof TextDecoder !== 'undefined') { cachedTextDecoder.decode(); }
  function getStringFromWasm0(ptr, len) {
      ptr = ptr >>> 0;
      return cachedTextDecoder.decode(getUint8ArrayMemory0().subarray(ptr, ptr + len));
  }

  const CLOSURE_DTORS = (typeof FinalizationRegistry === 'undefined')
      ? { register: () => {}, unregister: () => {} }
      : new FinalizationRegistry(state => {
      wasm$1.__wbindgen_export_2.get(state.dtor)(state.a, state.b);
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
                  wasm$1.__wbindgen_export_2.get(state.dtor)(a, state.b);
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
  function __wbg_adapter_24(arg0, arg1, arg2) {
      wasm$1._dyn_core__ops__function__FnMut__A____Output___R_as_wasm_bindgen__closure__WasmClosure___describe__invoke__h36966bd0cc00e71c(arg0, arg1, addHeapObject(arg2));
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
  function __wbg_adapter_58(arg0, arg1, arg2, arg3) {
      wasm$1.wasm_bindgen__convert__closures__invoke2_mut__h166f1dd0b8d6805f(arg0, arg1, addHeapObject(arg2), addHeapObject(arg3));
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
      imports.wbg.__wbg_parse_52202f117ec9ecfa = function() { return handleError(function (arg0, arg1) {
          const ret = JSON.parse(getStringFromWasm0(arg0, arg1));
          return addHeapObject(ret);
      }, arguments) };
      imports.wbg.__wbg_call_89af060b4e1523f2 = function() { return handleError(function (arg0, arg1, arg2) {
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
      imports.wbg.__wbg_text_a94b91ea8700357a = function() { return handleError(function (arg0) {
          const ret = getObject(arg0).text();
          return addHeapObject(ret);
      }, arguments) };
      imports.wbg.__wbindgen_string_get = function(arg0, arg1) {
          const obj = getObject(arg1);
          const ret = typeof(obj) === 'string' ? obj : undefined;
          var ptr1 = isLikeNone(ret) ? 0 : passStringToWasm0(ret, wasm$1.__wbindgen_malloc, wasm$1.__wbindgen_realloc);
          var len1 = WASM_VECTOR_LEN;
          getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
          getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
      };
      imports.wbg.__wbg_jssleep_0c89e01a12b4439e = function(arg0) {
          const ret = js_sleep(arg0);
          return addHeapObject(ret);
      };
      imports.wbg.__wbg_new_525245e2b9901204 = function() {
          const ret = new Object();
          return addHeapObject(ret);
      };
      imports.wbg.__wbg_setmethod_dc68a742c2db5c6a = function(arg0, arg1, arg2) {
          getObject(arg0).method = getStringFromWasm0(arg1, arg2);
      };
      imports.wbg.__wbg_setmode_a781aae2bd3df202 = function(arg0, arg1) {
          getObject(arg0).mode = ["same-origin","no-cors","cors","navigate",][arg1];
      };
      imports.wbg.__wbg_newwithstr_31920be5b8b6d221 = function() { return handleError(function (arg0, arg1) {
          const ret = new Request(getStringFromWasm0(arg0, arg1));
          return addHeapObject(ret);
      }, arguments) };
      imports.wbg.__wbindgen_object_clone_ref = function(arg0) {
          const ret = getObject(arg0);
          return addHeapObject(ret);
      };
      imports.wbg.__wbg_instanceof_Window_5012736c80a01584 = function(arg0) {
          let result;
          try {
              result = getObject(arg0) instanceof Window;
          } catch (_) {
              result = false;
          }
          const ret = result;
          return ret;
      };
      imports.wbg.__wbg_fetch_f3adf866d8944b41 = function(arg0, arg1) {
          const ret = getObject(arg0).fetch(getObject(arg1));
          return addHeapObject(ret);
      };
      imports.wbg.__wbg_instanceof_Response_e91b7eb7c611a9ae = function(arg0) {
          let result;
          try {
              result = getObject(arg0) instanceof Response;
          } catch (_) {
              result = false;
          }
          const ret = result;
          return ret;
      };
      imports.wbg.__wbindgen_is_undefined = function(arg0) {
          const ret = getObject(arg0) === undefined;
          return ret;
      };
      imports.wbg.__wbg_stringify_bbf45426c92a6bf5 = function() { return handleError(function (arg0) {
          const ret = JSON.stringify(getObject(arg0));
          return addHeapObject(ret);
      }, arguments) };
      imports.wbg.__wbg_new_b85e72ed1bfd57f9 = function(arg0, arg1) {
          try {
              var state0 = {a: arg0, b: arg1};
              var cb0 = (arg0, arg1) => {
                  const a = state0.a;
                  state0.a = 0;
                  try {
                      return __wbg_adapter_58(a, state0.b, arg0, arg1);
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
      imports.wbg.__wbindgen_memory = function() {
          const ret = wasm$1.memory;
          return addHeapObject(ret);
      };
      imports.wbg.__wbg_buffer_b7b08af79b0b0974 = function(arg0) {
          const ret = getObject(arg0).buffer;
          return addHeapObject(ret);
      };
      imports.wbg.__wbg_newwithbyteoffsetandlength_8a2cb9ca96b27ec9 = function(arg0, arg1, arg2) {
          const ret = new Uint8Array(getObject(arg0), arg1 >>> 0, arg2 >>> 0);
          return addHeapObject(ret);
      };
      imports.wbg.__wbg_randomFillSync_5c9c955aa56b6049 = function() { return handleError(function (arg0, arg1) {
          getObject(arg0).randomFillSync(takeObject(arg1));
      }, arguments) };
      imports.wbg.__wbg_subarray_7c2e3576afe181d1 = function(arg0, arg1, arg2) {
          const ret = getObject(arg0).subarray(arg1 >>> 0, arg2 >>> 0);
          return addHeapObject(ret);
      };
      imports.wbg.__wbg_getRandomValues_3aa56aa6edec874c = function() { return handleError(function (arg0, arg1) {
          getObject(arg0).getRandomValues(getObject(arg1));
      }, arguments) };
      imports.wbg.__wbg_new_ea1883e1e5e86686 = function(arg0) {
          const ret = new Uint8Array(getObject(arg0));
          return addHeapObject(ret);
      };
      imports.wbg.__wbg_set_d1e79e2388520f18 = function(arg0, arg1, arg2) {
          getObject(arg0).set(getObject(arg1), arg2 >>> 0);
      };
      imports.wbg.__wbg_crypto_1d1f22824a6a080c = function(arg0) {
          const ret = getObject(arg0).crypto;
          return addHeapObject(ret);
      };
      imports.wbg.__wbindgen_is_object = function(arg0) {
          const val = getObject(arg0);
          const ret = typeof(val) === 'object' && val !== null;
          return ret;
      };
      imports.wbg.__wbg_process_4a72847cc503995b = function(arg0) {
          const ret = getObject(arg0).process;
          return addHeapObject(ret);
      };
      imports.wbg.__wbg_versions_f686565e586dd935 = function(arg0) {
          const ret = getObject(arg0).versions;
          return addHeapObject(ret);
      };
      imports.wbg.__wbg_node_104a2ff8d6ea03a2 = function(arg0) {
          const ret = getObject(arg0).node;
          return addHeapObject(ret);
      };
      imports.wbg.__wbindgen_is_string = function(arg0) {
          const ret = typeof(getObject(arg0)) === 'string';
          return ret;
      };
      imports.wbg.__wbg_require_cca90b1a94a0255b = function() { return handleError(function () {
          const ret = module.require;
          return addHeapObject(ret);
      }, arguments) };
      imports.wbg.__wbindgen_is_function = function(arg0) {
          const ret = typeof(getObject(arg0)) === 'function';
          return ret;
      };
      imports.wbg.__wbindgen_string_new = function(arg0, arg1) {
          const ret = getStringFromWasm0(arg0, arg1);
          return addHeapObject(ret);
      };
      imports.wbg.__wbg_msCrypto_eb05e62b530a1508 = function(arg0) {
          const ret = getObject(arg0).msCrypto;
          return addHeapObject(ret);
      };
      imports.wbg.__wbg_newwithlength_ec548f448387c968 = function(arg0) {
          const ret = new Uint8Array(arg0 >>> 0);
          return addHeapObject(ret);
      };
      imports.wbg.__wbg_self_3093d5d1f7bcb682 = function() { return handleError(function () {
          const ret = self.self;
          return addHeapObject(ret);
      }, arguments) };
      imports.wbg.__wbg_window_3bcfc4d31bc012f8 = function() { return handleError(function () {
          const ret = window.window;
          return addHeapObject(ret);
      }, arguments) };
      imports.wbg.__wbg_globalThis_86b222e13bdf32ed = function() { return handleError(function () {
          const ret = globalThis.globalThis;
          return addHeapObject(ret);
      }, arguments) };
      imports.wbg.__wbg_global_e5a3fe56f8be9485 = function() { return handleError(function () {
          const ret = global.global;
          return addHeapObject(ret);
      }, arguments) };
      imports.wbg.__wbg_newnoargs_76313bd6ff35d0f2 = function(arg0, arg1) {
          const ret = new Function(getStringFromWasm0(arg0, arg1));
          return addHeapObject(ret);
      };
      imports.wbg.__wbg_call_1084a111329e68ce = function() { return handleError(function (arg0, arg1) {
          const ret = getObject(arg0).call(getObject(arg1));
          return addHeapObject(ret);
      }, arguments) };
      imports.wbg.__wbindgen_throw = function(arg0, arg1) {
          throw new Error(getStringFromWasm0(arg0, arg1));
      };
      imports.wbg.__wbg_then_876bb3c633745cc6 = function(arg0, arg1, arg2) {
          const ret = getObject(arg0).then(getObject(arg1), getObject(arg2));
          return addHeapObject(ret);
      };
      imports.wbg.__wbg_queueMicrotask_48421b3cc9052b68 = function(arg0) {
          const ret = getObject(arg0).queueMicrotask;
          return addHeapObject(ret);
      };
      imports.wbg.__wbg_resolve_570458cb99d56a43 = function(arg0) {
          const ret = Promise.resolve(getObject(arg0));
          return addHeapObject(ret);
      };
      imports.wbg.__wbg_then_95e6edc0f89b73b1 = function(arg0, arg1) {
          const ret = getObject(arg0).then(getObject(arg1));
          return addHeapObject(ret);
      };
      imports.wbg.__wbg_queueMicrotask_12a30234db4045d3 = function(arg0) {
          queueMicrotask(getObject(arg0));
      };
      imports.wbg.__wbindgen_closure_wrapper5443 = function(arg0, arg1, arg2) {
          const ret = makeMutClosure(arg0, arg1, 951, __wbg_adapter_24);
          return addHeapObject(ret);
      };

      return imports;
  }

  function __wbg_finalize_init(instance, module) {
      wasm$1 = instance.exports;
      __wbg_init.__wbindgen_wasm_module = module;
      cachedDataViewMemory0 = null;
      cachedUint8ArrayMemory0 = null;



      return wasm$1;
  }

  function initSync(module) {
      if (wasm$1 !== undefined) return wasm$1;


      if (typeof module !== 'undefined' && Object.getPrototypeOf(module) === Object.prototype)
      ({module} = module);
      else
      console.warn('using deprecated parameters for `initSync()`; pass a single object instead');

      const imports = __wbg_get_imports();

      if (!(module instanceof WebAssembly.Module)) {
          module = new WebAssembly.Module(module);
      }

      const instance = new WebAssembly.Instance(module, imports);

      return __wbg_finalize_init(instance, module);
  }

  async function __wbg_init(module_or_path) {
      if (wasm$1 !== undefined) return wasm$1;


      if (typeof module_or_path !== 'undefined' && Object.getPrototypeOf(module_or_path) === Object.prototype)
      ({module_or_path} = module_or_path);
      else
      console.warn('using deprecated parameters for the initialization function; pass a single object instead');


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

                  let path = "/js/assets/rune_wasm-1456b609.wasm";

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
