var rune = (function (exports) {
  'use strict';

  /// Hook used to construct an async sleep function.
  function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  let wasm$1;

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

  let cachedUint8Memory0 = new Uint8Array();

  function getUint8Memory0() {
      if (cachedUint8Memory0.byteLength === 0) {
          cachedUint8Memory0 = new Uint8Array(wasm$1.memory.buffer);
      }
      return cachedUint8Memory0;
  }

  const cachedTextEncoder = new TextEncoder('utf-8');

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

  function isLikeNone(x) {
      return x === undefined || x === null;
  }

  let cachedInt32Memory0 = new Int32Array();

  function getInt32Memory0() {
      if (cachedInt32Memory0.byteLength === 0) {
          cachedInt32Memory0 = new Int32Array(wasm$1.memory.buffer);
      }
      return cachedInt32Memory0;
  }

  const cachedTextDecoder = new TextDecoder('utf-8', { ignoreBOM: true, fatal: true });

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
                  wasm$1.__wbindgen_export_2.get(state.dtor)(a, state.b);

              } else {
                  state.a = a;
              }
          }
      };
      real.original = state;

      return real;
  }
  function __wbg_adapter_28(arg0, arg1, arg2) {
      wasm$1._dyn_core__ops__function__FnMut__A____Output___R_as_wasm_bindgen__closure__WasmClosure___describe__invoke__h37e5c56510866f06(arg0, arg1, addHeapObject(arg2));
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

  function getArrayU8FromWasm0(ptr, len) {
      return getUint8Memory0().subarray(ptr / 1, ptr / 1 + len);
  }
  function __wbg_adapter_70(arg0, arg1, arg2, arg3) {
      wasm$1.wasm_bindgen__convert__closures__invoke2_mut__h0dbb8ec9d7f4b51c(arg0, arg1, addHeapObject(arg2), addHeapObject(arg3));
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

  function getImports() {
      const imports = {};
      imports.wbg = {};
      imports.wbg.__wbindgen_object_drop_ref = function(arg0) {
          takeObject(arg0);
      };
      imports.wbg.__wbindgen_string_get = function(arg0, arg1) {
          const obj = getObject(arg1);
          const ret = typeof(obj) === 'string' ? obj : undefined;
          var ptr0 = isLikeNone(ret) ? 0 : passStringToWasm0(ret, wasm$1.__wbindgen_malloc, wasm$1.__wbindgen_realloc);
          var len0 = WASM_VECTOR_LEN;
          getInt32Memory0()[arg0 / 4 + 1] = len0;
          getInt32Memory0()[arg0 / 4 + 0] = ptr0;
      };
      imports.wbg.__wbindgen_json_serialize = function(arg0, arg1) {
          const obj = getObject(arg1);
          const ret = JSON.stringify(obj === undefined ? null : obj);
          const ptr0 = passStringToWasm0(ret, wasm$1.__wbindgen_malloc, wasm$1.__wbindgen_realloc);
          const len0 = WASM_VECTOR_LEN;
          getInt32Memory0()[arg0 / 4 + 1] = len0;
          getInt32Memory0()[arg0 / 4 + 0] = ptr0;
      };
      imports.wbg.__wbg_sleep_9e8f127b42ad8f0e = function(arg0) {
          const ret = sleep(arg0);
          return addHeapObject(ret);
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
      imports.wbg.__wbindgen_json_parse = function(arg0, arg1) {
          const ret = JSON.parse(getStringFromWasm0(arg0, arg1));
          return addHeapObject(ret);
      };
      imports.wbg.__wbg_randomFillSync_065afffde01daa66 = function() { return handleError(function (arg0, arg1, arg2) {
          getObject(arg0).randomFillSync(getArrayU8FromWasm0(arg1, arg2));
      }, arguments) };
      imports.wbg.__wbg_getRandomValues_b99eec4244a475bb = function() { return handleError(function (arg0, arg1) {
          getObject(arg0).getRandomValues(getObject(arg1));
      }, arguments) };
      imports.wbg.__wbg_process_0cc2ada8524d6f83 = function(arg0) {
          const ret = getObject(arg0).process;
          return addHeapObject(ret);
      };
      imports.wbg.__wbindgen_is_object = function(arg0) {
          const val = getObject(arg0);
          const ret = typeof(val) === 'object' && val !== null;
          return ret;
      };
      imports.wbg.__wbg_versions_c11acceab27a6c87 = function(arg0) {
          const ret = getObject(arg0).versions;
          return addHeapObject(ret);
      };
      imports.wbg.__wbg_node_7ff1ce49caf23815 = function(arg0) {
          const ret = getObject(arg0).node;
          return addHeapObject(ret);
      };
      imports.wbg.__wbindgen_is_string = function(arg0) {
          const ret = typeof(getObject(arg0)) === 'string';
          return ret;
      };
      imports.wbg.__wbg_static_accessor_NODE_MODULE_cf6401cc1091279e = function() {
          const ret = module;
          return addHeapObject(ret);
      };
      imports.wbg.__wbg_require_a746e79b322b9336 = function() { return handleError(function (arg0, arg1, arg2) {
          const ret = getObject(arg0).require(getStringFromWasm0(arg1, arg2));
          return addHeapObject(ret);
      }, arguments) };
      imports.wbg.__wbg_crypto_2036bed7c44c25e7 = function(arg0) {
          const ret = getObject(arg0).crypto;
          return addHeapObject(ret);
      };
      imports.wbg.__wbg_msCrypto_a21fc88caf1ecdc8 = function(arg0) {
          const ret = getObject(arg0).msCrypto;
          return addHeapObject(ret);
      };
      imports.wbg.__wbindgen_string_new = function(arg0, arg1) {
          const ret = getStringFromWasm0(arg0, arg1);
          return addHeapObject(ret);
      };
      imports.wbg.__wbg_instanceof_Window_acc97ff9f5d2c7b4 = function(arg0) {
          let result;
          try {
              result = getObject(arg0) instanceof Window;
          } catch {
              result = false;
          }
          const ret = result;
          return ret;
      };
      imports.wbg.__wbg_fetch_0fe04905cccfc2aa = function(arg0, arg1) {
          const ret = getObject(arg0).fetch(getObject(arg1));
          return addHeapObject(ret);
      };
      imports.wbg.__wbg_instanceof_Response_eaa426220848a39e = function(arg0) {
          let result;
          try {
              result = getObject(arg0) instanceof Response;
          } catch {
              result = false;
          }
          const ret = result;
          return ret;
      };
      imports.wbg.__wbg_text_1169d752cc697903 = function() { return handleError(function (arg0) {
          const ret = getObject(arg0).text();
          return addHeapObject(ret);
      }, arguments) };
      imports.wbg.__wbindgen_object_clone_ref = function(arg0) {
          const ret = getObject(arg0);
          return addHeapObject(ret);
      };
      imports.wbg.__wbg_now_8172cd917e5eda6b = function(arg0) {
          const ret = getObject(arg0).now();
          return ret;
      };
      imports.wbg.__wbg_newwithstr_fdce36db91ec5f92 = function() { return handleError(function (arg0, arg1) {
          const ret = new Request(getStringFromWasm0(arg0, arg1));
          return addHeapObject(ret);
      }, arguments) };
      imports.wbg.__wbg_newnoargs_b5b063fc6c2f0376 = function(arg0, arg1) {
          const ret = new Function(getStringFromWasm0(arg0, arg1));
          return addHeapObject(ret);
      };
      imports.wbg.__wbg_get_765201544a2b6869 = function() { return handleError(function (arg0, arg1) {
          const ret = Reflect.get(getObject(arg0), getObject(arg1));
          return addHeapObject(ret);
      }, arguments) };
      imports.wbg.__wbg_call_97ae9d8645dc388b = function() { return handleError(function (arg0, arg1) {
          const ret = getObject(arg0).call(getObject(arg1));
          return addHeapObject(ret);
      }, arguments) };
      imports.wbg.__wbg_new_0b9bfdd97583284e = function() {
          const ret = new Object();
          return addHeapObject(ret);
      };
      imports.wbg.__wbg_self_6d479506f72c6a71 = function() { return handleError(function () {
          const ret = self.self;
          return addHeapObject(ret);
      }, arguments) };
      imports.wbg.__wbg_window_f2557cc78490aceb = function() { return handleError(function () {
          const ret = window.window;
          return addHeapObject(ret);
      }, arguments) };
      imports.wbg.__wbg_globalThis_7f206bda628d5286 = function() { return handleError(function () {
          const ret = globalThis.globalThis;
          return addHeapObject(ret);
      }, arguments) };
      imports.wbg.__wbg_global_ba75c50d1cf384f4 = function() { return handleError(function () {
          const ret = global.global;
          return addHeapObject(ret);
      }, arguments) };
      imports.wbg.__wbindgen_is_undefined = function(arg0) {
          const ret = getObject(arg0) === undefined;
          return ret;
      };
      imports.wbg.__wbg_call_168da88779e35f61 = function() { return handleError(function (arg0, arg1, arg2) {
          const ret = getObject(arg0).call(getObject(arg1), getObject(arg2));
          return addHeapObject(ret);
      }, arguments) };
      imports.wbg.__wbg_new_9962f939219f1820 = function(arg0, arg1) {
          try {
              var state0 = {a: arg0, b: arg1};
              var cb0 = (arg0, arg1) => {
                  const a = state0.a;
                  state0.a = 0;
                  try {
                      return __wbg_adapter_70(a, state0.b, arg0, arg1);
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
      imports.wbg.__wbg_resolve_99fe17964f31ffc0 = function(arg0) {
          const ret = Promise.resolve(getObject(arg0));
          return addHeapObject(ret);
      };
      imports.wbg.__wbg_then_11f7a54d67b4bfad = function(arg0, arg1) {
          const ret = getObject(arg0).then(getObject(arg1));
          return addHeapObject(ret);
      };
      imports.wbg.__wbg_then_cedad20fbbd9418a = function(arg0, arg1, arg2) {
          const ret = getObject(arg0).then(getObject(arg1), getObject(arg2));
          return addHeapObject(ret);
      };
      imports.wbg.__wbg_buffer_3f3d764d4747d564 = function(arg0) {
          const ret = getObject(arg0).buffer;
          return addHeapObject(ret);
      };
      imports.wbg.__wbg_new_8c3f0052272a457a = function(arg0) {
          const ret = new Uint8Array(getObject(arg0));
          return addHeapObject(ret);
      };
      imports.wbg.__wbg_set_83db9690f9353e79 = function(arg0, arg1, arg2) {
          getObject(arg0).set(getObject(arg1), arg2 >>> 0);
      };
      imports.wbg.__wbg_length_9e1ae1900cb0fbd5 = function(arg0) {
          const ret = getObject(arg0).length;
          return ret;
      };
      imports.wbg.__wbg_newwithlength_f5933855e4f48a19 = function(arg0) {
          const ret = new Uint8Array(arg0 >>> 0);
          return addHeapObject(ret);
      };
      imports.wbg.__wbg_subarray_58ad4efbb5bcb886 = function(arg0, arg1, arg2) {
          const ret = getObject(arg0).subarray(arg1 >>> 0, arg2 >>> 0);
          return addHeapObject(ret);
      };
      imports.wbg.__wbg_set_bf3f89b92d5a34bf = function() { return handleError(function (arg0, arg1, arg2) {
          const ret = Reflect.set(getObject(arg0), getObject(arg1), getObject(arg2));
          return ret;
      }, arguments) };
      imports.wbg.__wbindgen_debug_string = function(arg0, arg1) {
          const ret = debugString(getObject(arg1));
          const ptr0 = passStringToWasm0(ret, wasm$1.__wbindgen_malloc, wasm$1.__wbindgen_realloc);
          const len0 = WASM_VECTOR_LEN;
          getInt32Memory0()[arg0 / 4 + 1] = len0;
          getInt32Memory0()[arg0 / 4 + 0] = ptr0;
      };
      imports.wbg.__wbindgen_throw = function(arg0, arg1) {
          throw new Error(getStringFromWasm0(arg0, arg1));
      };
      imports.wbg.__wbindgen_memory = function() {
          const ret = wasm$1.memory;
          return addHeapObject(ret);
      };
      imports.wbg.__wbindgen_closure_wrapper469 = function(arg0, arg1, arg2) {
          const ret = makeMutClosure(arg0, arg1, 238, __wbg_adapter_28);
          return addHeapObject(ret);
      };

      return imports;
  }

  function finalizeInit(instance, module) {
      wasm$1 = instance.exports;
      init$1.__wbindgen_wasm_module = module;
      cachedInt32Memory0 = new Int32Array();
      cachedUint8Memory0 = new Uint8Array();


      return wasm$1;
  }

  function initSync(module) {
      const imports = getImports();

      if (!(module instanceof WebAssembly.Module)) {
          module = new WebAssembly.Module(module);
      }

      const instance = new WebAssembly.Instance(module, imports);

      return finalizeInit(instance, module);
  }

  async function init$1(input) {
      if (typeof input === 'undefined') {
          input = new URL('index_bg.wasm', (document.currentScript && document.currentScript.src || new URL('rune.js', document.baseURI).href));
      }
      const imports = getImports();

      if (typeof input === 'string' || (typeof Request === 'function' && input instanceof Request) || (typeof URL === 'function' && input instanceof URL)) {
          input = fetch(input);
      }

      const { instance, module } = await load(await input, imports);

      return finalizeInit(instance, module);
  }

  var exports$1 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    compile: compile,
    initSync: initSync,
    'default': init$1
  });

  var wasm = async (opt = {}) => {
                          let {importHook, serverPath} = opt;

                          let path = "/js/assets/rune-wasm-dfa9a657.wasm";

                          if (serverPath != null) {
                              path = serverPath + /[^\/\\]*$/.exec(path)[0];
                          }

                          if (importHook != null) {
                              path = importHook(path);
                          }

                          await init$1(path);
                          return exports$1;
                      };

  async function init() {
      exports.module = await wasm();
  }

  exports.module = null;

  exports.init = init;

  Object.defineProperty(exports, '__esModule', { value: true });

  return exports;

})({});
//# sourceMappingURL=rune.js.map
