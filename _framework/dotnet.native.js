
var createDotnetRuntime = (() => {
  var _scriptDir = import.meta.url;
  
  return (
function(moduleArg = {}) {

// Support for growable heap + pthreads, where the buffer may change, so JS views
// must be updated.
function GROWABLE_HEAP_I8() {
  if (wasmMemory.buffer != HEAP8.buffer) {
    updateMemoryViews();
  }
  return HEAP8;
}
function GROWABLE_HEAP_U8() {
  if (wasmMemory.buffer != HEAP8.buffer) {
    updateMemoryViews();
  }
  return HEAPU8;
}
function GROWABLE_HEAP_I16() {
  if (wasmMemory.buffer != HEAP8.buffer) {
    updateMemoryViews();
  }
  return HEAP16;
}
function GROWABLE_HEAP_U16() {
  if (wasmMemory.buffer != HEAP8.buffer) {
    updateMemoryViews();
  }
  return HEAPU16;
}
function GROWABLE_HEAP_I32() {
  if (wasmMemory.buffer != HEAP8.buffer) {
    updateMemoryViews();
  }
  return HEAP32;
}
function GROWABLE_HEAP_U32() {
  if (wasmMemory.buffer != HEAP8.buffer) {
    updateMemoryViews();
  }
  return HEAPU32;
}
function GROWABLE_HEAP_F32() {
  if (wasmMemory.buffer != HEAP8.buffer) {
    updateMemoryViews();
  }
  return HEAPF32;
}
function GROWABLE_HEAP_F64() {
  if (wasmMemory.buffer != HEAP8.buffer) {
    updateMemoryViews();
  }
  return HEAPF64;
}

var Module = moduleArg;

var readyPromiseResolve, readyPromiseReject;

Module["ready"] = new Promise((resolve, reject) => {
 readyPromiseResolve = resolve;
 readyPromiseReject = reject;
});

if (_nativeModuleLoaded) throw new Error("Native module already loaded");

_nativeModuleLoaded = true;

createDotnetRuntime = Module = moduleArg(Module);

const callMain = function(_args) {
 throw new Error('"callMain" is not implemented.');
};

var moduleOverrides = Object.assign({}, Module);

var arguments_ = [];

var thisProgram = "./this.program";

var quit_ = (status, toThrow) => {
 throw toThrow;
};

var ENVIRONMENT_IS_WEB = typeof window == "object";

var ENVIRONMENT_IS_WORKER = typeof importScripts == "function";

var ENVIRONMENT_IS_NODE = typeof process == "object" && typeof process.versions == "object" && typeof process.versions.node == "string";

var ENVIRONMENT_IS_SHELL = !ENVIRONMENT_IS_WEB && !ENVIRONMENT_IS_NODE && !ENVIRONMENT_IS_WORKER;

var ENVIRONMENT_IS_PTHREAD = Module["ENVIRONMENT_IS_PTHREAD"] || false;

var scriptDirectory = "";

function locateFile(path) {
 if (Module["locateFile"]) {
  return Module["locateFile"](path, scriptDirectory);
 }
 return scriptDirectory + path;
}

var read_, readAsync, readBinary;

if (ENVIRONMENT_IS_WEB || ENVIRONMENT_IS_WORKER) {
 if (ENVIRONMENT_IS_WORKER) {
  scriptDirectory = self.location.href;
 } else if (typeof document != "undefined" && document.currentScript) {
  scriptDirectory = document.currentScript.src;
 }
 if (_scriptDir) {
  scriptDirectory = _scriptDir;
 }
 if (scriptDirectory.startsWith("blob:")) {
  scriptDirectory = "";
 } else {
  scriptDirectory = scriptDirectory.substr(0, scriptDirectory.replace(/[?#].*/, "").lastIndexOf("/") + 1);
 }
 {
  read_ = url => {
   var xhr = new XMLHttpRequest;
   xhr.open("GET", url, false);
   xhr.send(null);
   return xhr.responseText;
  };
  if (ENVIRONMENT_IS_WORKER) {
   readBinary = url => {
    var xhr = new XMLHttpRequest;
    xhr.open("GET", url, false);
    xhr.responseType = "arraybuffer";
    xhr.send(null);
    return new Uint8Array(/** @type{!ArrayBuffer} */ (xhr.response));
   };
  }
  readAsync = (url, onload, onerror) => {
   var xhr = new XMLHttpRequest;
   xhr.open("GET", url, true);
   xhr.responseType = "arraybuffer";
   xhr.onload = () => {
    if (xhr.status == 200 || (xhr.status == 0 && xhr.response)) {
     onload(xhr.response);
     return;
    }
    onerror();
   };
   xhr.onerror = onerror;
   xhr.send(null);
  };
 }
} else  {}

var out = Module["print"] || console.log.bind(console);

var err = Module["printErr"] || console.error.bind(console);

Object.assign(Module, moduleOverrides);

moduleOverrides = null;

if (Module["arguments"]) arguments_ = Module["arguments"];

if (Module["thisProgram"]) thisProgram = Module["thisProgram"];

if (Module["quit"]) quit_ = Module["quit"];

var wasmBinary;

if (Module["wasmBinary"]) wasmBinary = Module["wasmBinary"];

function intArrayFromBase64(s) {
 var decoded = atob(s);
 var bytes = new Uint8Array(decoded.length);
 for (var i = 0; i < decoded.length; ++i) {
  bytes[i] = decoded.charCodeAt(i);
 }
 return bytes;
}

function tryParseAsDataURI(filename) {
 if (!isDataURI(filename)) {
  return;
 }
 return intArrayFromBase64(filename.slice(dataURIPrefix.length));
}

var wasmMemory;

var wasmModule;

var ABORT = false;

var EXITSTATUS;

/** @type {function(*, string=)} */ function assert(condition, text) {
 if (!condition) {
  abort(text);
 }
}

var HEAP, /** @type {!Int8Array} */ HEAP8, /** @type {!Uint8Array} */ HEAPU8, /** @type {!Int16Array} */ HEAP16, /** @type {!Uint16Array} */ HEAPU16, /** @type {!Int32Array} */ HEAP32, /** @type {!Uint32Array} */ HEAPU32, /** @type {!Float32Array} */ HEAPF32, /* BigInt64Array type is not correctly defined in closure
/** not-@type {!BigInt64Array} */ HEAP64, /* BigUInt64Array type is not correctly defined in closure
/** not-t@type {!BigUint64Array} */ HEAPU64, /** @type {!Float64Array} */ HEAPF64;

function updateMemoryViews() {
 var b = wasmMemory.buffer;
 Module["HEAP8"] = HEAP8 = new Int8Array(b);
 Module["HEAP16"] = HEAP16 = new Int16Array(b);
 Module["HEAPU8"] = HEAPU8 = new Uint8Array(b);
 Module["HEAPU16"] = HEAPU16 = new Uint16Array(b);
 Module["HEAP32"] = HEAP32 = new Int32Array(b);
 Module["HEAPU32"] = HEAPU32 = new Uint32Array(b);
 Module["HEAPF32"] = HEAPF32 = new Float32Array(b);
 Module["HEAPF64"] = HEAPF64 = new Float64Array(b);
 Module["HEAP64"] = HEAP64 = new BigInt64Array(b);
 Module["HEAPU64"] = HEAPU64 = new BigUint64Array(b);
}

var INITIAL_MEMORY = Module["INITIAL_MEMORY"] || 268435456;

if (ENVIRONMENT_IS_PTHREAD) {
 wasmMemory = Module["wasmMemory"];
} else {
 if (Module["wasmMemory"]) {
  wasmMemory = Module["wasmMemory"];
 } else {
  wasmMemory = new WebAssembly.Memory({
   "initial": INITIAL_MEMORY / 65536,
   "maximum": 2147483648 / 65536,
   "shared": true
  });
  if (!(wasmMemory.buffer instanceof SharedArrayBuffer)) {
   err("requested a shared WebAssembly.Memory but the returned buffer is not a SharedArrayBuffer, indicating that while the browser has SharedArrayBuffer it does not have WebAssembly threads support - you may need to set a flag");
   if (ENVIRONMENT_IS_NODE) {
    err("(on node you may need: --experimental-wasm-threads --experimental-wasm-bulk-memory and/or recent version)");
   }
   throw Error("bad memory");
  }
 }
}

updateMemoryViews();

INITIAL_MEMORY = wasmMemory.buffer.byteLength;

var __ATPRERUN__ = [];

var __ATINIT__ = [];

var __ATEXIT__ = [];

var __ATPOSTRUN__ = [];

var runtimeInitialized = false;

var runtimeExited = false;

function preRun() {
 if (Module["preRun"]) {
  if (typeof Module["preRun"] == "function") Module["preRun"] = [ Module["preRun"] ];
  while (Module["preRun"].length) {
   addOnPreRun(Module["preRun"].shift());
  }
 }
 callRuntimeCallbacks(__ATPRERUN__);
}

function initRuntime() {
 runtimeInitialized = true;
 if (ENVIRONMENT_IS_PTHREAD) return;
 if (!Module["noFSInit"] && !FS.init.initialized) FS.init();
 FS.ignorePermissions = false;
 TTY.init();
 SOCKFS.root = FS.mount(SOCKFS, {}, null);
 callRuntimeCallbacks(__ATINIT__);
}

function exitRuntime() {
 if (ENVIRONMENT_IS_PTHREAD) return;
 ___funcs_on_exit();
 callRuntimeCallbacks(__ATEXIT__);
 FS.quit();
 TTY.shutdown();
 IDBFS.quit();
 PThread.terminateAllThreads();
 runtimeExited = true;
}

function postRun() {
 if (ENVIRONMENT_IS_PTHREAD) return;
 if (Module["postRun"]) {
  if (typeof Module["postRun"] == "function") Module["postRun"] = [ Module["postRun"] ];
  while (Module["postRun"].length) {
   addOnPostRun(Module["postRun"].shift());
  }
 }
 callRuntimeCallbacks(__ATPOSTRUN__);
}

function addOnPreRun(cb) {
 __ATPRERUN__.unshift(cb);
}

function addOnInit(cb) {
 __ATINIT__.unshift(cb);
}

function addOnExit(cb) {
 __ATEXIT__.unshift(cb);
}

function addOnPostRun(cb) {
 __ATPOSTRUN__.unshift(cb);
}

var runDependencies = 0;

var runDependencyWatcher = null;

var dependenciesFulfilled = null;

function getUniqueRunDependency(id) {
 return id;
}

function addRunDependency(id) {
 runDependencies++;
 Module["monitorRunDependencies"]?.(runDependencies);
}

function removeRunDependency(id) {
 runDependencies--;
 Module["monitorRunDependencies"]?.(runDependencies);
 if (runDependencies == 0) {
  if (runDependencyWatcher !== null) {
   clearInterval(runDependencyWatcher);
   runDependencyWatcher = null;
  }
  if (dependenciesFulfilled) {
   var callback = dependenciesFulfilled;
   dependenciesFulfilled = null;
   callback();
  }
 }
}

/** @param {string|number=} what */ function abort(what) {
 Module["onAbort"]?.(what);
 what = "Aborted(" + what + ")";
 err(what);
 ABORT = true;
 EXITSTATUS = 1;
 what += ". Build with -sASSERTIONS for more info.";
 if (runtimeInitialized) {
  ___trap();
 }
 /** @suppress {checkTypes} */ var e = new WebAssembly.RuntimeError(what);
 readyPromiseReject(e);
 throw e;
}

var dataURIPrefix = "data:application/octet-stream;base64,";

/**
 * Indicates whether filename is a base64 data URI.
 * @noinline
 */ var isDataURI = filename => filename.startsWith(dataURIPrefix);

/**
 * Indicates whether filename is delivered via file protocol (as opposed to http/https)
 * @noinline
 */ var isFileURI = filename => filename.startsWith("file://");

var wasmBinaryFile;

if (Module["locateFile"]) {
 wasmBinaryFile = "dotnet.native.wasm";
 if (!isDataURI(wasmBinaryFile)) {
  wasmBinaryFile = locateFile(wasmBinaryFile);
 }
} else {
 wasmBinaryFile = new URL("dotnet.native.wasm", import.meta.url).href;
}

function getBinarySync(file) {
 if (file == wasmBinaryFile && wasmBinary) {
  return new Uint8Array(wasmBinary);
 }
 if (readBinary) {
  return readBinary(file);
 }
 throw "both async and sync fetching of the wasm failed";
}

function getBinaryPromise(binaryFile) {
 if (!wasmBinary && (ENVIRONMENT_IS_WEB || ENVIRONMENT_IS_WORKER)) {
  if (typeof fetch == "function") {
   return fetch(binaryFile, {
    credentials: "same-origin"
   }).then(response => {
    if (!response["ok"]) {
     throw `failed to load wasm binary file at '${binaryFile}'`;
    }
    return response["arrayBuffer"]();
   }).catch(() => getBinarySync(binaryFile));
  }
 }
 return Promise.resolve().then(() => getBinarySync(binaryFile));
}

function instantiateArrayBuffer(binaryFile, imports, receiver) {
 return getBinaryPromise(binaryFile).then(binary => WebAssembly.instantiate(binary, imports)).then(receiver, reason => {
  err(`failed to asynchronously prepare wasm: ${reason}`);
  abort(reason);
 });
}

function instantiateAsync(binary, binaryFile, imports, callback) {
 if (!binary && typeof WebAssembly.instantiateStreaming == "function" && !isDataURI(binaryFile) && typeof fetch == "function") {
  return fetch(binaryFile, {
   credentials: "same-origin"
  }).then(response => {
   /** @suppress {checkTypes} */ var result = WebAssembly.instantiateStreaming(response, imports);
   return result.then(callback, function(reason) {
    err(`wasm streaming compile failed: ${reason}`);
    err("falling back to ArrayBuffer instantiation");
    return instantiateArrayBuffer(binaryFile, imports, callback);
   });
  });
 }
 return instantiateArrayBuffer(binaryFile, imports, callback);
}

function createWasm() {
 var info = {
  "env": wasmImports,
  "wasi_snapshot_preview1": wasmImports
 };
 /** @param {WebAssembly.Module=} module*/ function receiveInstance(instance, module) {
  wasmExports = instance.exports;
  Module["wasmExports"] = wasmExports;
  registerTLSInit(wasmExports["_emscripten_tls_init"]);
  wasmTable = wasmExports["__indirect_function_table"];
  addOnInit(wasmExports["__wasm_call_ctors"]);
  wasmModule = module;
  removeRunDependency("wasm-instantiate");
  return wasmExports;
 }
 addRunDependency("wasm-instantiate");
 function receiveInstantiationResult(result) {
  receiveInstance(result["instance"], result["module"]);
 }
 if (Module["instantiateWasm"]) {
  try {
   return Module["instantiateWasm"](info, receiveInstance);
  } catch (e) {
   err(`Module.instantiateWasm callback failed with error: ${e}`);
   readyPromiseReject(e);
  }
 }
 instantiateAsync(wasmBinary, wasmBinaryFile, info, receiveInstantiationResult).catch(readyPromiseReject);
 return {};
}

/** @constructor */ function ExitStatus(status) {
 this.name = "ExitStatus";
 this.message = `Program terminated with exit(${status})`;
 this.status = status;
}

var terminateWorker = worker => {
 worker.terminate();
 worker.onmessage = e => {};
};

var killThread = pthread_ptr => {
 var worker = PThread.pthreads[pthread_ptr];
 delete PThread.pthreads[pthread_ptr];
 terminateWorker(worker);
 __emscripten_thread_free_data(pthread_ptr);
 PThread.runningWorkers.splice(PThread.runningWorkers.indexOf(worker), 1);
 worker.pthread_ptr = 0;
};

var cancelThread = pthread_ptr => {
 var worker = PThread.pthreads[pthread_ptr];
 worker.postMessage({
  "cmd": "cancel"
 });
};

var cleanupThread = pthread_ptr => {
 var worker = PThread.pthreads[pthread_ptr];
 PThread.returnWorkerToPool(worker);
};

var zeroMemory = (address, size) => {
 GROWABLE_HEAP_U8().fill(0, address, address + size);
 return address;
};

var spawnThread = threadParams => {
 var worker = PThread.getNewWorker();
 if (!worker) {
  return 6;
 }
 PThread.runningWorkers.push(worker);
 PThread.pthreads[threadParams.pthread_ptr] = worker;
 worker.pthread_ptr = threadParams.pthread_ptr;
 var msg = {
  "cmd": "run",
  "start_routine": threadParams.startRoutine,
  "arg": threadParams.arg,
  "pthread_ptr": threadParams.pthread_ptr
 };
 worker.postMessage(msg, threadParams.transferList);
 return 0;
};

var runtimeKeepaliveCounter = 0;

var keepRuntimeAlive = () => noExitRuntime || runtimeKeepaliveCounter > 0;

var withStackSave = f => {
 var stack = stackSave();
 var ret = f();
 stackRestore(stack);
 return ret;
};

var MAX_INT53 = 9007199254740992;

var MIN_INT53 = -9007199254740992;

var bigintToI53Checked = num => (num < MIN_INT53 || num > MAX_INT53) ? NaN : Number(num);

/** @type{function(number, (number|boolean), ...number)} */ var proxyToMainThread = (funcIndex, emAsmAddr, sync, ...callArgs) => withStackSave(() => {
 var serializedNumCallArgs = callArgs.length * 2;
 var args = stackAlloc(serializedNumCallArgs * 8);
 var b = ((args) >> 3);
 for (var i = 0; i < callArgs.length; i++) {
  var arg = callArgs[i];
  if (typeof arg == "bigint") {
   HEAP64[b + 2 * i] = 1n;
   HEAP64[b + 2 * i + 1] = arg;
  } else {
   HEAP64[b + 2 * i] = 0n;
   GROWABLE_HEAP_F64()[b + 2 * i + 1] = arg;
  }
 }
 return __emscripten_run_on_main_thread_js(funcIndex, emAsmAddr, serializedNumCallArgs, args, sync);
});

function _proc_exit(code) {
 if (ENVIRONMENT_IS_PTHREAD) return proxyToMainThread(0, 0, 1, code);
 EXITSTATUS = code;
 if (!keepRuntimeAlive()) {
  PThread.terminateAllThreads();
  Module["onExit"]?.(code);
  ABORT = true;
 }
 quit_(code, new ExitStatus(code));
}

/** @param {boolean|number=} implicit */ var exitJS = (status, implicit) => {
 EXITSTATUS = status;
 if (ENVIRONMENT_IS_PTHREAD) {
  exitOnMainThread(status);
  throw "unwind";
 }
 if (!keepRuntimeAlive()) {
  exitRuntime();
 }
 _proc_exit(status);
};

var _exit = exitJS;

var handleException = e => {
 if (e instanceof ExitStatus || e == "unwind") {
  return EXITSTATUS;
 }
 quit_(1, e);
};

var PThread = {
 unusedWorkers: [],
 runningWorkers: [],
 tlsInitFunctions: [],
 pthreads: {},
 init() {
  if (ENVIRONMENT_IS_PTHREAD) {
   PThread.initWorker();
  } else {
   PThread.initMainThread();
  }
 },
 initMainThread() {
  addOnPreRun(() => {
   addRunDependency("loading-workers");
   PThread.loadWasmModuleToAllWorkers(() => removeRunDependency("loading-workers"));
  });
 },
 initWorker() {
  PThread["receiveObjectTransfer"] = PThread.receiveObjectTransfer;
  PThread["threadInitTLS"] = PThread.threadInitTLS;
  PThread["setExitStatus"] = PThread.setExitStatus;
  noExitRuntime = false;
 },
 setExitStatus: status => EXITSTATUS = status,
 terminateAllThreads__deps: [ "$terminateWorker" ],
 terminateAllThreads: () => {
  for (var worker of PThread.runningWorkers) {
   terminateWorker(worker);
  }
  for (var worker of PThread.unusedWorkers) {
   terminateWorker(worker);
  }
  PThread.unusedWorkers = [];
  PThread.runningWorkers = [];
  PThread.pthreads = [];
 },
 returnWorkerToPool: worker => {
  var pthread_ptr = worker.pthread_ptr;
  delete PThread.pthreads[pthread_ptr];
  PThread.unusedWorkers.push(worker);
  PThread.runningWorkers.splice(PThread.runningWorkers.indexOf(worker), 1);
  worker.pthread_ptr = 0;
  __emscripten_thread_free_data(pthread_ptr);
 },
 receiveObjectTransfer(data) {},
 threadInitTLS() {
  PThread.tlsInitFunctions.forEach(f => f());
 },
 loadWasmModuleToWorker: worker => new Promise(onFinishedLoading => {
  worker.onmessage = e => {
   var d = e["data"];
   var cmd = d["cmd"];
   if (d["targetThread"] && d["targetThread"] != _pthread_self()) {
    var targetWorker = PThread.pthreads[d["targetThread"]];
    if (targetWorker) {
     targetWorker.postMessage(d, d["transferList"]);
    } else {
     err(`Internal error! Worker sent a message "${cmd}" to target pthread ${d["targetThread"]}, but that thread no longer exists!`);
    }
    return;
   }
   if (cmd === "checkMailbox") {
    checkMailbox();
   } else if (cmd === "spawnThread") {
    spawnThread(d);
   } else if (cmd === "cleanupThread") {
    cleanupThread(d["thread"]);
   } else if (cmd === "killThread") {
    killThread(d["thread"]);
   } else if (cmd === "cancelThread") {
    cancelThread(d["thread"]);
   } else if (cmd === "loaded") {
    worker.loaded = true;
    onFinishedLoading(worker);
   } else if (cmd === "alert") {
    alert(`Thread ${d["threadId"]}: ${d["text"]}`);
   } else if (d.target === "setimmediate") {
    worker.postMessage(d);
   } else if (cmd === "callHandler") {
    Module[d["handler"]](...d["args"]);
   } else if (cmd) {
    err(`worker sent an unknown command ${cmd}`);
   }
  };
  worker.onerror = e => {
   var message = "worker sent an error!";
   err(`${message} ${e.filename}:${e.lineno}: ${e.message}`);
   throw e;
  };
  var handlers = [];
  var knownHandlers = [ "onExit", "onAbort", "print", "printErr" ];
  for (var handler of knownHandlers) {
   if (Module.hasOwnProperty(handler)) {
    handlers.push(handler);
   }
  }
  worker.postMessage({
   "cmd": "load",
   "handlers": handlers,
   "urlOrBlob": Module["mainScriptUrlOrBlob"],
   "wasmMemory": wasmMemory,
   "wasmModule": wasmModule
  });
 }),
 loadWasmModuleToAllWorkers(onMaybeReady) {
  onMaybeReady();
 },
 allocateUnusedWorker() {
  var worker;
  if (!Module["locateFile"]) {
   worker = new Worker(new URL("dotnet.native.worker.mjs", import.meta.url), {
    type: "module"
   });
  } else {
   var pthreadMainJs = locateFile("dotnet.native.worker.mjs");
   worker = new Worker(pthreadMainJs, {
    type: "module"
   });
  }
  PThread.unusedWorkers.push(worker);
 },
 getNewWorker() {
  if (PThread.unusedWorkers.length == 0) {
   PThread.allocateUnusedWorker();
   PThread.loadWasmModuleToWorker(PThread.unusedWorkers[0]);
  }
  return PThread.unusedWorkers.pop();
 }
};

Module["PThread"] = PThread;

var callRuntimeCallbacks = callbacks => {
 while (callbacks.length > 0) {
  callbacks.shift()(Module);
 }
};

var establishStackSpace = () => {
 var pthread_ptr = _pthread_self();
 var stackHigh = GROWABLE_HEAP_U32()[(((pthread_ptr) + (52)) >> 2)];
 var stackSize = GROWABLE_HEAP_U32()[(((pthread_ptr) + (56)) >> 2)];
 var stackLow = stackHigh - stackSize;
 _emscripten_stack_set_limits(stackHigh, stackLow);
 stackRestore(stackHigh);
};

Module["establishStackSpace"] = establishStackSpace;

function exitOnMainThread(returnCode) {
 if (ENVIRONMENT_IS_PTHREAD) return proxyToMainThread(1, 0, 0, returnCode);
 _exit(returnCode);
}

/**
     * @param {number} ptr
     * @param {string} type
     */ function getValue(ptr, type = "i8") {
 if (type.endsWith("*")) type = "*";
 switch (type) {
 case "i1":
  return GROWABLE_HEAP_I8()[ptr];

 case "i8":
  return GROWABLE_HEAP_I8()[ptr];

 case "i16":
  return GROWABLE_HEAP_I16()[((ptr) >> 1)];

 case "i32":
  return GROWABLE_HEAP_I32()[((ptr) >> 2)];

 case "i64":
  return HEAP64[((ptr) >> 3)];

 case "float":
  return GROWABLE_HEAP_F32()[((ptr) >> 2)];

 case "double":
  return GROWABLE_HEAP_F64()[((ptr) >> 3)];

 case "*":
  return GROWABLE_HEAP_U32()[((ptr) >> 2)];

 default:
  abort(`invalid type for getValue: ${type}`);
 }
}

var wasmTableMirror = [];

var wasmTable;

var getWasmTableEntry = funcPtr => {
 var func = wasmTableMirror[funcPtr];
 if (!func) {
  if (funcPtr >= wasmTableMirror.length) wasmTableMirror.length = funcPtr + 1;
  wasmTableMirror[funcPtr] = func = wasmTable.get(funcPtr);
 }
 return func;
};

var invokeEntryPoint = (ptr, arg) => {
 runtimeKeepaliveCounter = 0;
 var result = getWasmTableEntry(ptr)(arg);
 function finish(result) {
  if (keepRuntimeAlive()) {
   PThread.setExitStatus(result);
  } else {
   __emscripten_thread_exit(result);
  }
 }
 finish(result);
};

Module["invokeEntryPoint"] = invokeEntryPoint;

var noExitRuntime = Module["noExitRuntime"] || false;

var registerTLSInit = tlsInitFunc => PThread.tlsInitFunctions.push(tlsInitFunc);

/**
     * @param {number} ptr
     * @param {number} value
     * @param {string} type
     */ function setValue(ptr, value, type = "i8") {
 if (type.endsWith("*")) type = "*";
 switch (type) {
 case "i1":
  GROWABLE_HEAP_I8()[ptr] = value;
  break;

 case "i8":
  GROWABLE_HEAP_I8()[ptr] = value;
  break;

 case "i16":
  GROWABLE_HEAP_I16()[((ptr) >> 1)] = value;
  break;

 case "i32":
  GROWABLE_HEAP_I32()[((ptr) >> 2)] = value;
  break;

 case "i64":
  HEAP64[((ptr) >> 3)] = BigInt(value);
  break;

 case "float":
  GROWABLE_HEAP_F32()[((ptr) >> 2)] = value;
  break;

 case "double":
  GROWABLE_HEAP_F64()[((ptr) >> 3)] = value;
  break;

 case "*":
  GROWABLE_HEAP_U32()[((ptr) >> 2)] = value;
  break;

 default:
  abort(`invalid type for setValue: ${type}`);
 }
}

var UTF8Decoder = typeof TextDecoder != "undefined" ? new TextDecoder("utf8") : undefined;

/**
     * Given a pointer 'idx' to a null-terminated UTF8-encoded string in the given
     * array that contains uint8 values, returns a copy of that string as a
     * Javascript String object.
     * heapOrArray is either a regular array, or a JavaScript typed array view.
     * @param {number} idx
     * @param {number=} maxBytesToRead
     * @return {string}
     */ var UTF8ArrayToString = (heapOrArray, idx, maxBytesToRead) => {
 var endIdx = idx + maxBytesToRead;
 var endPtr = idx;
 while (heapOrArray[endPtr] && !(endPtr >= endIdx)) ++endPtr;
 if (endPtr - idx > 16 && heapOrArray.buffer && UTF8Decoder) {
  return UTF8Decoder.decode(heapOrArray.buffer instanceof SharedArrayBuffer ? heapOrArray.slice(idx, endPtr) : heapOrArray.subarray(idx, endPtr));
 }
 var str = "";
 while (idx < endPtr) {
  var u0 = heapOrArray[idx++];
  if (!(u0 & 128)) {
   str += String.fromCharCode(u0);
   continue;
  }
  var u1 = heapOrArray[idx++] & 63;
  if ((u0 & 224) == 192) {
   str += String.fromCharCode(((u0 & 31) << 6) | u1);
   continue;
  }
  var u2 = heapOrArray[idx++] & 63;
  if ((u0 & 240) == 224) {
   u0 = ((u0 & 15) << 12) | (u1 << 6) | u2;
  } else {
   u0 = ((u0 & 7) << 18) | (u1 << 12) | (u2 << 6) | (heapOrArray[idx++] & 63);
  }
  if (u0 < 65536) {
   str += String.fromCharCode(u0);
  } else {
   var ch = u0 - 65536;
   str += String.fromCharCode(55296 | (ch >> 10), 56320 | (ch & 1023));
  }
 }
 return str;
};

/**
     * Given a pointer 'ptr' to a null-terminated UTF8-encoded string in the
     * emscripten HEAP, returns a copy of that string as a Javascript String object.
     *
     * @param {number} ptr
     * @param {number=} maxBytesToRead - An optional length that specifies the
     *   maximum number of bytes to read. You can omit this parameter to scan the
     *   string until the first 0 byte. If maxBytesToRead is passed, and the string
     *   at [ptr, ptr+maxBytesToReadr[ contains a null byte in the middle, then the
     *   string will cut short at that byte index (i.e. maxBytesToRead will not
     *   produce a string of exact length [ptr, ptr+maxBytesToRead[) N.B. mixing
     *   frequent uses of UTF8ToString() with and without maxBytesToRead may throw
     *   JS JIT optimizations off, so it is worth to consider consistently using one
     * @return {string}
     */ var UTF8ToString = (ptr, maxBytesToRead) => ptr ? UTF8ArrayToString(GROWABLE_HEAP_U8(), ptr, maxBytesToRead) : "";

var ___assert_fail = (condition, filename, line, func) => {
 abort(`Assertion failed: ${UTF8ToString(condition)}, at: ` + [ filename ? UTF8ToString(filename) : "unknown filename", line, func ? UTF8ToString(func) : "unknown function" ]);
};

var ___call_sighandler = (fp, sig) => getWasmTableEntry(fp)(sig);

var ___emscripten_init_main_thread_js = tb => {
 __emscripten_thread_init(tb, /*is_main=*/ !ENVIRONMENT_IS_WORKER, /*is_runtime=*/ 1, /*can_block=*/ !ENVIRONMENT_IS_WEB, /*default_stacksize=*/ 5242880, /*start_profiling=*/ false);
 PThread.threadInitTLS();
};

var ___emscripten_thread_cleanup = thread => {
 if (!ENVIRONMENT_IS_PTHREAD) cleanupThread(thread); else postMessage({
  "cmd": "cleanupThread",
  "thread": thread
 });
};

function pthreadCreateProxied(pthread_ptr, attr, startRoutine, arg) {
 if (ENVIRONMENT_IS_PTHREAD) return proxyToMainThread(2, 0, 1, pthread_ptr, attr, startRoutine, arg);
 return ___pthread_create_js(pthread_ptr, attr, startRoutine, arg);
}

var ___pthread_create_js = (pthread_ptr, attr, startRoutine, arg) => {
 if (typeof SharedArrayBuffer == "undefined") {
  err("Current environment does not support SharedArrayBuffer, pthreads are not available!");
  return 6;
 }
 var transferList = [];
 var error = 0;
 if (ENVIRONMENT_IS_PTHREAD && (transferList.length === 0 || error)) {
  return pthreadCreateProxied(pthread_ptr, attr, startRoutine, arg);
 }
 if (error) return error;
 var threadParams = {
  startRoutine: startRoutine,
  pthread_ptr: pthread_ptr,
  arg: arg,
  transferList: transferList
 };
 if (ENVIRONMENT_IS_PTHREAD) {
  threadParams.cmd = "spawnThread";
  postMessage(threadParams, transferList);
  return 0;
 }
 return spawnThread(threadParams);
};

var PATH = {
 isAbs: path => path.charAt(0) === "/",
 splitPath: filename => {
  var splitPathRe = /^(\/?|)([\s\S]*?)((?:\.{1,2}|[^\/]+?|)(\.[^.\/]*|))(?:[\/]*)$/;
  return splitPathRe.exec(filename).slice(1);
 },
 normalizeArray: (parts, allowAboveRoot) => {
  var up = 0;
  for (var i = parts.length - 1; i >= 0; i--) {
   var last = parts[i];
   if (last === ".") {
    parts.splice(i, 1);
   } else if (last === "..") {
    parts.splice(i, 1);
    up++;
   } else if (up) {
    parts.splice(i, 1);
    up--;
   }
  }
  if (allowAboveRoot) {
   for (;up; up--) {
    parts.unshift("..");
   }
  }
  return parts;
 },
 normalize: path => {
  var isAbsolute = PATH.isAbs(path), trailingSlash = path.substr(-1) === "/";
  path = PATH.normalizeArray(path.split("/").filter(p => !!p), !isAbsolute).join("/");
  if (!path && !isAbsolute) {
   path = ".";
  }
  if (path && trailingSlash) {
   path += "/";
  }
  return (isAbsolute ? "/" : "") + path;
 },
 dirname: path => {
  var result = PATH.splitPath(path), root = result[0], dir = result[1];
  if (!root && !dir) {
   return ".";
  }
  if (dir) {
   dir = dir.substr(0, dir.length - 1);
  }
  return root + dir;
 },
 basename: path => {
  if (path === "/") return "/";
  path = PATH.normalize(path);
  path = path.replace(/\/$/, "");
  var lastSlash = path.lastIndexOf("/");
  if (lastSlash === -1) return path;
  return path.substr(lastSlash + 1);
 },
 join: (...paths) => PATH.normalize(paths.join("/")),
 join2: (l, r) => PATH.normalize(l + "/" + r)
};

var initRandomFill = () => {
 if (typeof crypto == "object" && typeof crypto["getRandomValues"] == "function") {
  return view => (view.set(crypto.getRandomValues(new Uint8Array(view.byteLength))), 
  view);
 } else  abort("initRandomDevice");
};

var randomFill = view => (randomFill = initRandomFill())(view);

var PATH_FS = {
 resolve: (...args) => {
  var resolvedPath = "", resolvedAbsolute = false;
  for (var i = args.length - 1; i >= -1 && !resolvedAbsolute; i--) {
   var path = (i >= 0) ? args[i] : FS.cwd();
   if (typeof path != "string") {
    throw new TypeError("Arguments to path.resolve must be strings");
   } else if (!path) {
    return "";
   }
   resolvedPath = path + "/" + resolvedPath;
   resolvedAbsolute = PATH.isAbs(path);
  }
  resolvedPath = PATH.normalizeArray(resolvedPath.split("/").filter(p => !!p), !resolvedAbsolute).join("/");
  return ((resolvedAbsolute ? "/" : "") + resolvedPath) || ".";
 },
 relative: (from, to) => {
  from = PATH_FS.resolve(from).substr(1);
  to = PATH_FS.resolve(to).substr(1);
  function trim(arr) {
   var start = 0;
   for (;start < arr.length; start++) {
    if (arr[start] !== "") break;
   }
   var end = arr.length - 1;
   for (;end >= 0; end--) {
    if (arr[end] !== "") break;
   }
   if (start > end) return [];
   return arr.slice(start, end - start + 1);
  }
  var fromParts = trim(from.split("/"));
  var toParts = trim(to.split("/"));
  var length = Math.min(fromParts.length, toParts.length);
  var samePartsLength = length;
  for (var i = 0; i < length; i++) {
   if (fromParts[i] !== toParts[i]) {
    samePartsLength = i;
    break;
   }
  }
  var outputParts = [];
  for (var i = samePartsLength; i < fromParts.length; i++) {
   outputParts.push("..");
  }
  outputParts = outputParts.concat(toParts.slice(samePartsLength));
  return outputParts.join("/");
 }
};

var FS_stdin_getChar_buffer = [];

var lengthBytesUTF8 = str => {
 var len = 0;
 for (var i = 0; i < str.length; ++i) {
  var c = str.charCodeAt(i);
  if (c <= 127) {
   len++;
  } else if (c <= 2047) {
   len += 2;
  } else if (c >= 55296 && c <= 57343) {
   len += 4;
   ++i;
  } else {
   len += 3;
  }
 }
 return len;
};

var stringToUTF8Array = (str, heap, outIdx, maxBytesToWrite) => {
 if (!(maxBytesToWrite > 0)) return 0;
 var startIdx = outIdx;
 var endIdx = outIdx + maxBytesToWrite - 1;
 for (var i = 0; i < str.length; ++i) {
  var u = str.charCodeAt(i);
  if (u >= 55296 && u <= 57343) {
   var u1 = str.charCodeAt(++i);
   u = 65536 + ((u & 1023) << 10) | (u1 & 1023);
  }
  if (u <= 127) {
   if (outIdx >= endIdx) break;
   heap[outIdx++] = u;
  } else if (u <= 2047) {
   if (outIdx + 1 >= endIdx) break;
   heap[outIdx++] = 192 | (u >> 6);
   heap[outIdx++] = 128 | (u & 63);
  } else if (u <= 65535) {
   if (outIdx + 2 >= endIdx) break;
   heap[outIdx++] = 224 | (u >> 12);
   heap[outIdx++] = 128 | ((u >> 6) & 63);
   heap[outIdx++] = 128 | (u & 63);
  } else {
   if (outIdx + 3 >= endIdx) break;
   heap[outIdx++] = 240 | (u >> 18);
   heap[outIdx++] = 128 | ((u >> 12) & 63);
   heap[outIdx++] = 128 | ((u >> 6) & 63);
   heap[outIdx++] = 128 | (u & 63);
  }
 }
 heap[outIdx] = 0;
 return outIdx - startIdx;
};

/** @type {function(string, boolean=, number=)} */ function intArrayFromString(stringy, dontAddNull, length) {
 var len = length > 0 ? length : lengthBytesUTF8(stringy) + 1;
 var u8array = new Array(len);
 var numBytesWritten = stringToUTF8Array(stringy, u8array, 0, u8array.length);
 if (dontAddNull) u8array.length = numBytesWritten;
 return u8array;
}

var FS_stdin_getChar = () => {
 if (!FS_stdin_getChar_buffer.length) {
  var result = null;
  if (typeof window != "undefined" && typeof window.prompt == "function") {
   result = window.prompt("Input: ");
   if (result !== null) {
    result += "\n";
   }
  } else if (typeof readline == "function") {
   result = readline();
   if (result !== null) {
    result += "\n";
   }
  }
  if (!result) {
   return null;
  }
  FS_stdin_getChar_buffer = intArrayFromString(result, true);
 }
 return FS_stdin_getChar_buffer.shift();
};

var TTY = {
 ttys: [],
 init() {},
 shutdown() {},
 register(dev, ops) {
  TTY.ttys[dev] = {
   input: [],
   output: [],
   ops: ops
  };
  FS.registerDevice(dev, TTY.stream_ops);
 },
 stream_ops: {
  open(stream) {
   var tty = TTY.ttys[stream.node.rdev];
   if (!tty) {
    throw new FS.ErrnoError(43);
   }
   stream.tty = tty;
   stream.seekable = false;
  },
  close(stream) {
   stream.tty.ops.fsync(stream.tty);
  },
  fsync(stream) {
   stream.tty.ops.fsync(stream.tty);
  },
  read(stream, buffer, offset, length, pos) {
   /* ignored */ if (!stream.tty || !stream.tty.ops.get_char) {
    throw new FS.ErrnoError(60);
   }
   var bytesRead = 0;
   for (var i = 0; i < length; i++) {
    var result;
    try {
     result = stream.tty.ops.get_char(stream.tty);
    } catch (e) {
     throw new FS.ErrnoError(29);
    }
    if (result === undefined && bytesRead === 0) {
     throw new FS.ErrnoError(6);
    }
    if (result === null || result === undefined) break;
    bytesRead++;
    buffer[offset + i] = result;
   }
   if (bytesRead) {
    stream.node.timestamp = Date.now();
   }
   return bytesRead;
  },
  write(stream, buffer, offset, length, pos) {
   if (!stream.tty || !stream.tty.ops.put_char) {
    throw new FS.ErrnoError(60);
   }
   try {
    for (var i = 0; i < length; i++) {
     stream.tty.ops.put_char(stream.tty, buffer[offset + i]);
    }
   } catch (e) {
    throw new FS.ErrnoError(29);
   }
   if (length) {
    stream.node.timestamp = Date.now();
   }
   return i;
  }
 },
 default_tty_ops: {
  get_char(tty) {
   return FS_stdin_getChar();
  },
  put_char(tty, val) {
   if (val === null || val === 10) {
    out(UTF8ArrayToString(tty.output, 0));
    tty.output = [];
   } else {
    if (val != 0) tty.output.push(val);
   }
  },
  fsync(tty) {
   if (tty.output && tty.output.length > 0) {
    out(UTF8ArrayToString(tty.output, 0));
    tty.output = [];
   }
  },
  ioctl_tcgets(tty) {
   return {
    c_iflag: 25856,
    c_oflag: 5,
    c_cflag: 191,
    c_lflag: 35387,
    c_cc: [ 3, 28, 127, 21, 4, 0, 1, 0, 17, 19, 26, 0, 18, 15, 23, 22, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ]
   };
  },
  ioctl_tcsets(tty, optional_actions, data) {
   return 0;
  },
  ioctl_tiocgwinsz(tty) {
   return [ 24, 80 ];
  }
 },
 default_tty1_ops: {
  put_char(tty, val) {
   if (val === null || val === 10) {
    err(UTF8ArrayToString(tty.output, 0));
    tty.output = [];
   } else {
    if (val != 0) tty.output.push(val);
   }
  },
  fsync(tty) {
   if (tty.output && tty.output.length > 0) {
    err(UTF8ArrayToString(tty.output, 0));
    tty.output = [];
   }
  }
 }
};

var alignMemory = (size, alignment) => Math.ceil(size / alignment) * alignment;

var mmapAlloc = size => {
 size = alignMemory(size, 65536);
 var ptr = _emscripten_builtin_memalign(65536, size);
 if (!ptr) return 0;
 return zeroMemory(ptr, size);
};

var MEMFS = {
 ops_table: null,
 mount(mount) {
  return MEMFS.createNode(null, "/", 16384 | 511, /* 0777 */ 0);
 },
 createNode(parent, name, mode, dev) {
  if (FS.isBlkdev(mode) || FS.isFIFO(mode)) {
   throw new FS.ErrnoError(63);
  }
  MEMFS.ops_table ||= {
   dir: {
    node: {
     getattr: MEMFS.node_ops.getattr,
     setattr: MEMFS.node_ops.setattr,
     lookup: MEMFS.node_ops.lookup,
     mknod: MEMFS.node_ops.mknod,
     rename: MEMFS.node_ops.rename,
     unlink: MEMFS.node_ops.unlink,
     rmdir: MEMFS.node_ops.rmdir,
     readdir: MEMFS.node_ops.readdir,
     symlink: MEMFS.node_ops.symlink
    },
    stream: {
     llseek: MEMFS.stream_ops.llseek
    }
   },
   file: {
    node: {
     getattr: MEMFS.node_ops.getattr,
     setattr: MEMFS.node_ops.setattr
    },
    stream: {
     llseek: MEMFS.stream_ops.llseek,
     read: MEMFS.stream_ops.read,
     write: MEMFS.stream_ops.write,
     allocate: MEMFS.stream_ops.allocate,
     mmap: MEMFS.stream_ops.mmap,
     msync: MEMFS.stream_ops.msync
    }
   },
   link: {
    node: {
     getattr: MEMFS.node_ops.getattr,
     setattr: MEMFS.node_ops.setattr,
     readlink: MEMFS.node_ops.readlink
    },
    stream: {}
   },
   chrdev: {
    node: {
     getattr: MEMFS.node_ops.getattr,
     setattr: MEMFS.node_ops.setattr
    },
    stream: FS.chrdev_stream_ops
   }
  };
  var node = FS.createNode(parent, name, mode, dev);
  if (FS.isDir(node.mode)) {
   node.node_ops = MEMFS.ops_table.dir.node;
   node.stream_ops = MEMFS.ops_table.dir.stream;
   node.contents = {};
  } else if (FS.isFile(node.mode)) {
   node.node_ops = MEMFS.ops_table.file.node;
   node.stream_ops = MEMFS.ops_table.file.stream;
   node.usedBytes = 0;
   node.contents = null;
  } else if (FS.isLink(node.mode)) {
   node.node_ops = MEMFS.ops_table.link.node;
   node.stream_ops = MEMFS.ops_table.link.stream;
  } else if (FS.isChrdev(node.mode)) {
   node.node_ops = MEMFS.ops_table.chrdev.node;
   node.stream_ops = MEMFS.ops_table.chrdev.stream;
  }
  node.timestamp = Date.now();
  if (parent) {
   parent.contents[name] = node;
   parent.timestamp = node.timestamp;
  }
  return node;
 },
 getFileDataAsTypedArray(node) {
  if (!node.contents) return new Uint8Array(0);
  if (node.contents.subarray) return node.contents.subarray(0, node.usedBytes);
  return new Uint8Array(node.contents);
 },
 expandFileStorage(node, newCapacity) {
  var prevCapacity = node.contents ? node.contents.length : 0;
  if (prevCapacity >= newCapacity) return;
  var CAPACITY_DOUBLING_MAX = 1024 * 1024;
  newCapacity = Math.max(newCapacity, (prevCapacity * (prevCapacity < CAPACITY_DOUBLING_MAX ? 2 : 1.125)) >>> 0);
  if (prevCapacity != 0) newCapacity = Math.max(newCapacity, 256);
  var oldContents = node.contents;
  node.contents = new Uint8Array(newCapacity);
  if (node.usedBytes > 0) node.contents.set(oldContents.subarray(0, node.usedBytes), 0);
 },
 resizeFileStorage(node, newSize) {
  if (node.usedBytes == newSize) return;
  if (newSize == 0) {
   node.contents = null;
   node.usedBytes = 0;
  } else {
   var oldContents = node.contents;
   node.contents = new Uint8Array(newSize);
   if (oldContents) {
    node.contents.set(oldContents.subarray(0, Math.min(newSize, node.usedBytes)));
   }
   node.usedBytes = newSize;
  }
 },
 node_ops: {
  getattr(node) {
   var attr = {};
   attr.dev = FS.isChrdev(node.mode) ? node.id : 1;
   attr.ino = node.id;
   attr.mode = node.mode;
   attr.nlink = 1;
   attr.uid = 0;
   attr.gid = 0;
   attr.rdev = node.rdev;
   if (FS.isDir(node.mode)) {
    attr.size = 4096;
   } else if (FS.isFile(node.mode)) {
    attr.size = node.usedBytes;
   } else if (FS.isLink(node.mode)) {
    attr.size = node.link.length;
   } else {
    attr.size = 0;
   }
   attr.atime = new Date(node.timestamp);
   attr.mtime = new Date(node.timestamp);
   attr.ctime = new Date(node.timestamp);
   attr.blksize = 4096;
   attr.blocks = Math.ceil(attr.size / attr.blksize);
   return attr;
  },
  setattr(node, attr) {
   if (attr.mode !== undefined) {
    node.mode = attr.mode;
   }
   if (attr.timestamp !== undefined) {
    node.timestamp = attr.timestamp;
   }
   if (attr.size !== undefined) {
    MEMFS.resizeFileStorage(node, attr.size);
   }
  },
  lookup(parent, name) {
   throw FS.genericErrors[44];
  },
  mknod(parent, name, mode, dev) {
   return MEMFS.createNode(parent, name, mode, dev);
  },
  rename(old_node, new_dir, new_name) {
   if (FS.isDir(old_node.mode)) {
    var new_node;
    try {
     new_node = FS.lookupNode(new_dir, new_name);
    } catch (e) {}
    if (new_node) {
     for (var i in new_node.contents) {
      throw new FS.ErrnoError(55);
     }
    }
   }
   delete old_node.parent.contents[old_node.name];
   old_node.parent.timestamp = Date.now();
   old_node.name = new_name;
   new_dir.contents[new_name] = old_node;
   new_dir.timestamp = old_node.parent.timestamp;
   old_node.parent = new_dir;
  },
  unlink(parent, name) {
   delete parent.contents[name];
   parent.timestamp = Date.now();
  },
  rmdir(parent, name) {
   var node = FS.lookupNode(parent, name);
   for (var i in node.contents) {
    throw new FS.ErrnoError(55);
   }
   delete parent.contents[name];
   parent.timestamp = Date.now();
  },
  readdir(node) {
   var entries = [ ".", ".." ];
   for (var key of Object.keys(node.contents)) {
    entries.push(key);
   }
   return entries;
  },
  symlink(parent, newname, oldpath) {
   var node = MEMFS.createNode(parent, newname, 511 | /* 0777 */ 40960, 0);
   node.link = oldpath;
   return node;
  },
  readlink(node) {
   if (!FS.isLink(node.mode)) {
    throw new FS.ErrnoError(28);
   }
   return node.link;
  }
 },
 stream_ops: {
  read(stream, buffer, offset, length, position) {
   var contents = stream.node.contents;
   if (position >= stream.node.usedBytes) return 0;
   var size = Math.min(stream.node.usedBytes - position, length);
   if (size > 8 && contents.subarray) {
    buffer.set(contents.subarray(position, position + size), offset);
   } else {
    for (var i = 0; i < size; i++) buffer[offset + i] = contents[position + i];
   }
   return size;
  },
  write(stream, buffer, offset, length, position, canOwn) {
   if (buffer.buffer === GROWABLE_HEAP_I8().buffer) {
    canOwn = false;
   }
   if (!length) return 0;
   var node = stream.node;
   node.timestamp = Date.now();
   if (buffer.subarray && (!node.contents || node.contents.subarray)) {
    if (canOwn) {
     node.contents = buffer.subarray(offset, offset + length);
     node.usedBytes = length;
     return length;
    } else if (node.usedBytes === 0 && position === 0) {
     node.contents = buffer.slice(offset, offset + length);
     node.usedBytes = length;
     return length;
    } else if (position + length <= node.usedBytes) {
     node.contents.set(buffer.subarray(offset, offset + length), position);
     return length;
    }
   }
   MEMFS.expandFileStorage(node, position + length);
   if (node.contents.subarray && buffer.subarray) {
    node.contents.set(buffer.subarray(offset, offset + length), position);
   } else {
    for (var i = 0; i < length; i++) {
     node.contents[position + i] = buffer[offset + i];
    }
   }
   node.usedBytes = Math.max(node.usedBytes, position + length);
   return length;
  },
  llseek(stream, offset, whence) {
   var position = offset;
   if (whence === 1) {
    position += stream.position;
   } else if (whence === 2) {
    if (FS.isFile(stream.node.mode)) {
     position += stream.node.usedBytes;
    }
   }
   if (position < 0) {
    throw new FS.ErrnoError(28);
   }
   return position;
  },
  allocate(stream, offset, length) {
   MEMFS.expandFileStorage(stream.node, offset + length);
   stream.node.usedBytes = Math.max(stream.node.usedBytes, offset + length);
  },
  mmap(stream, length, position, prot, flags) {
   if (!FS.isFile(stream.node.mode)) {
    throw new FS.ErrnoError(43);
   }
   var ptr;
   var allocated;
   var contents = stream.node.contents;
   if (!(flags & 2) && contents.buffer === GROWABLE_HEAP_I8().buffer) {
    allocated = false;
    ptr = contents.byteOffset;
   } else {
    if (position > 0 || position + length < contents.length) {
     if (contents.subarray) {
      contents = contents.subarray(position, position + length);
     } else {
      contents = Array.prototype.slice.call(contents, position, position + length);
     }
    }
    allocated = true;
    ptr = mmapAlloc(length);
    if (!ptr) {
     throw new FS.ErrnoError(48);
    }
    GROWABLE_HEAP_I8().set(contents, ptr);
   }
   return {
    ptr: ptr,
    allocated: allocated
   };
  },
  msync(stream, buffer, offset, length, mmapFlags) {
   MEMFS.stream_ops.write(stream, buffer, 0, length, offset, false);
   return 0;
  }
 }
};

/** @param {boolean=} noRunDep */ var asyncLoad = (url, onload, onerror, noRunDep) => {
 var dep = !noRunDep ? getUniqueRunDependency(`al ${url}`) : "";
 readAsync(url, arrayBuffer => {
  onload(new Uint8Array(arrayBuffer));
  if (dep) removeRunDependency(dep);
 }, event => {
  if (onerror) {
   onerror();
  } else {
   throw `Loading data file "${url}" failed.`;
  }
 });
 if (dep) addRunDependency(dep);
};

var FS_createDataFile = (parent, name, fileData, canRead, canWrite, canOwn) => {
 FS.createDataFile(parent, name, fileData, canRead, canWrite, canOwn);
};

var preloadPlugins = Module["preloadPlugins"] || [];

var FS_handledByPreloadPlugin = (byteArray, fullname, finish, onerror) => {
 if (typeof Browser != "undefined") Browser.init();
 var handled = false;
 preloadPlugins.forEach(plugin => {
  if (handled) return;
  if (plugin["canHandle"](fullname)) {
   plugin["handle"](byteArray, fullname, finish, onerror);
   handled = true;
  }
 });
 return handled;
};

var FS_createPreloadedFile = (parent, name, url, canRead, canWrite, onload, onerror, dontCreateFile, canOwn, preFinish) => {
 var fullname = name ? PATH_FS.resolve(PATH.join2(parent, name)) : parent;
 var dep = getUniqueRunDependency(`cp ${fullname}`);
 function processData(byteArray) {
  function finish(byteArray) {
   preFinish?.();
   if (!dontCreateFile) {
    FS_createDataFile(parent, name, byteArray, canRead, canWrite, canOwn);
   }
   onload?.();
   removeRunDependency(dep);
  }
  if (FS_handledByPreloadPlugin(byteArray, fullname, finish, () => {
   onerror?.();
   removeRunDependency(dep);
  })) {
   return;
  }
  finish(byteArray);
 }
 addRunDependency(dep);
 if (typeof url == "string") {
  asyncLoad(url, processData, onerror);
 } else {
  processData(url);
 }
};

var FS_modeStringToFlags = str => {
 var flagModes = {
  "r": 0,
  "r+": 2,
  "w": 512 | 64 | 1,
  "w+": 512 | 64 | 2,
  "a": 1024 | 64 | 1,
  "a+": 1024 | 64 | 2
 };
 var flags = flagModes[str];
 if (typeof flags == "undefined") {
  throw new Error(`Unknown file open mode: ${str}`);
 }
 return flags;
};

var FS_getMode = (canRead, canWrite) => {
 var mode = 0;
 if (canRead) mode |= 292 | 73;
 if (canWrite) mode |= 146;
 return mode;
};

var IDBFS = {
 dbs: {},
 indexedDB: () => {
  if (typeof indexedDB != "undefined") return indexedDB;
  var ret = null;
  if (typeof window == "object") ret = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
  return ret;
 },
 DB_VERSION: 21,
 DB_STORE_NAME: "FILE_DATA",
 mount: (...args) => MEMFS.mount(...args),
 syncfs: (mount, populate, callback) => {
  IDBFS.getLocalSet(mount, (err, local) => {
   if (err) return callback(err);
   IDBFS.getRemoteSet(mount, (err, remote) => {
    if (err) return callback(err);
    var src = populate ? remote : local;
    var dst = populate ? local : remote;
    IDBFS.reconcile(src, dst, callback);
   });
  });
 },
 quit: () => {
  Object.values(IDBFS.dbs).forEach(value => value.close());
  IDBFS.dbs = {};
 },
 getDB: (name, callback) => {
  var db = IDBFS.dbs[name];
  if (db) {
   return callback(null, db);
  }
  var req;
  try {
   req = IDBFS.indexedDB().open(name, IDBFS.DB_VERSION);
  } catch (e) {
   return callback(e);
  }
  if (!req) {
   return callback("Unable to connect to IndexedDB");
  }
  req.onupgradeneeded = e => {
   var db = /** @type {IDBDatabase} */ (e.target.result);
   var transaction = e.target.transaction;
   var fileStore;
   if (db.objectStoreNames.contains(IDBFS.DB_STORE_NAME)) {
    fileStore = transaction.objectStore(IDBFS.DB_STORE_NAME);
   } else {
    fileStore = db.createObjectStore(IDBFS.DB_STORE_NAME);
   }
   if (!fileStore.indexNames.contains("timestamp")) {
    fileStore.createIndex("timestamp", "timestamp", {
     unique: false
    });
   }
  };
  req.onsuccess = () => {
   db = /** @type {IDBDatabase} */ (req.result);
   IDBFS.dbs[name] = db;
   callback(null, db);
  };
  req.onerror = e => {
   callback(e.target.error);
   e.preventDefault();
  };
 },
 getLocalSet: (mount, callback) => {
  var entries = {};
  function isRealDir(p) {
   return p !== "." && p !== "..";
  }
  function toAbsolute(root) {
   return p => PATH.join2(root, p);
  }
  var check = FS.readdir(mount.mountpoint).filter(isRealDir).map(toAbsolute(mount.mountpoint));
  while (check.length) {
   var path = check.pop();
   var stat;
   try {
    stat = FS.stat(path);
   } catch (e) {
    return callback(e);
   }
   if (FS.isDir(stat.mode)) {
    check.push(...FS.readdir(path).filter(isRealDir).map(toAbsolute(path)));
   }
   entries[path] = {
    "timestamp": stat.mtime
   };
  }
  return callback(null, {
   type: "local",
   entries: entries
  });
 },
 getRemoteSet: (mount, callback) => {
  var entries = {};
  IDBFS.getDB(mount.mountpoint, (err, db) => {
   if (err) return callback(err);
   try {
    var transaction = db.transaction([ IDBFS.DB_STORE_NAME ], "readonly");
    transaction.onerror = e => {
     callback(e.target.error);
     e.preventDefault();
    };
    var store = transaction.objectStore(IDBFS.DB_STORE_NAME);
    var index = store.index("timestamp");
    index.openKeyCursor().onsuccess = event => {
     var cursor = event.target.result;
     if (!cursor) {
      return callback(null, {
       type: "remote",
       db: db,
       entries: entries
      });
     }
     entries[cursor.primaryKey] = {
      "timestamp": cursor.key
     };
     cursor.continue();
    };
   } catch (e) {
    return callback(e);
   }
  });
 },
 loadLocalEntry: (path, callback) => {
  var stat, node;
  try {
   var lookup = FS.lookupPath(path);
   node = lookup.node;
   stat = FS.stat(path);
  } catch (e) {
   return callback(e);
  }
  if (FS.isDir(stat.mode)) {
   return callback(null, {
    "timestamp": stat.mtime,
    "mode": stat.mode
   });
  } else if (FS.isFile(stat.mode)) {
   node.contents = MEMFS.getFileDataAsTypedArray(node);
   return callback(null, {
    "timestamp": stat.mtime,
    "mode": stat.mode,
    "contents": node.contents
   });
  } else {
   return callback(new Error("node type not supported"));
  }
 },
 storeLocalEntry: (path, entry, callback) => {
  try {
   if (FS.isDir(entry["mode"])) {
    FS.mkdirTree(path, entry["mode"]);
   } else if (FS.isFile(entry["mode"])) {
    FS.writeFile(path, entry["contents"], {
     canOwn: true
    });
   } else {
    return callback(new Error("node type not supported"));
   }
   FS.chmod(path, entry["mode"]);
   FS.utime(path, entry["timestamp"], entry["timestamp"]);
  } catch (e) {
   return callback(e);
  }
  callback(null);
 },
 removeLocalEntry: (path, callback) => {
  try {
   var stat = FS.stat(path);
   if (FS.isDir(stat.mode)) {
    FS.rmdir(path);
   } else if (FS.isFile(stat.mode)) {
    FS.unlink(path);
   }
  } catch (e) {
   return callback(e);
  }
  callback(null);
 },
 loadRemoteEntry: (store, path, callback) => {
  var req = store.get(path);
  req.onsuccess = event => callback(null, event.target.result);
  req.onerror = e => {
   callback(e.target.error);
   e.preventDefault();
  };
 },
 storeRemoteEntry: (store, path, entry, callback) => {
  try {
   var req = store.put(entry, path);
  } catch (e) {
   callback(e);
   return;
  }
  req.onsuccess = event => callback();
  req.onerror = e => {
   callback(e.target.error);
   e.preventDefault();
  };
 },
 removeRemoteEntry: (store, path, callback) => {
  var req = store.delete(path);
  req.onsuccess = event => callback();
  req.onerror = e => {
   callback(e.target.error);
   e.preventDefault();
  };
 },
 reconcile: (src, dst, callback) => {
  var total = 0;
  var create = [];
  Object.keys(src.entries).forEach(function(key) {
   var e = src.entries[key];
   var e2 = dst.entries[key];
   if (!e2 || e["timestamp"].getTime() != e2["timestamp"].getTime()) {
    create.push(key);
    total++;
   }
  });
  var remove = [];
  Object.keys(dst.entries).forEach(function(key) {
   if (!src.entries[key]) {
    remove.push(key);
    total++;
   }
  });
  if (!total) {
   return callback(null);
  }
  var errored = false;
  var db = src.type === "remote" ? src.db : dst.db;
  var transaction = db.transaction([ IDBFS.DB_STORE_NAME ], "readwrite");
  var store = transaction.objectStore(IDBFS.DB_STORE_NAME);
  function done(err) {
   if (err && !errored) {
    errored = true;
    return callback(err);
   }
  }
  transaction.onerror = transaction.onabort = e => {
   done(e.target.error);
   e.preventDefault();
  };
  transaction.oncomplete = e => {
   if (!errored) {
    callback(null);
   }
  };
  create.sort().forEach(path => {
   if (dst.type === "local") {
    IDBFS.loadRemoteEntry(store, path, (err, entry) => {
     if (err) return done(err);
     IDBFS.storeLocalEntry(path, entry, done);
    });
   } else {
    IDBFS.loadLocalEntry(path, (err, entry) => {
     if (err) return done(err);
     IDBFS.storeRemoteEntry(store, path, entry, done);
    });
   }
  });
  remove.sort().reverse().forEach(path => {
   if (dst.type === "local") {
    IDBFS.removeLocalEntry(path, done);
   } else {
    IDBFS.removeRemoteEntry(store, path, done);
   }
  });
 }
};

var FS = {
 root: null,
 mounts: [],
 devices: {},
 streams: [],
 nextInode: 1,
 nameTable: null,
 currentPath: "/",
 initialized: false,
 ignorePermissions: true,
 ErrnoError: class {
  constructor(errno) {
   this.name = "ErrnoError";
   this.errno = errno;
  }
 },
 genericErrors: {},
 filesystems: null,
 syncFSRequests: 0,
 FSStream: class {
  constructor() {
   this.shared = {};
  }
  get object() {
   return this.node;
  }
  set object(val) {
   this.node = val;
  }
  get isRead() {
   return (this.flags & 2097155) !== 1;
  }
  get isWrite() {
   return (this.flags & 2097155) !== 0;
  }
  get isAppend() {
   return (this.flags & 1024);
  }
  get flags() {
   return this.shared.flags;
  }
  set flags(val) {
   this.shared.flags = val;
  }
  get position() {
   return this.shared.position;
  }
  set position(val) {
   this.shared.position = val;
  }
 },
 FSNode: class {
  constructor(parent, name, mode, rdev) {
   if (!parent) {
    parent = this;
   }
   this.parent = parent;
   this.mount = parent.mount;
   this.mounted = null;
   this.id = FS.nextInode++;
   this.name = name;
   this.mode = mode;
   this.node_ops = {};
   this.stream_ops = {};
   this.rdev = rdev;
   this.readMode = 292 | /*292*/ 73;
   /*73*/ this.writeMode = 146;
  }
  /*146*/ get read() {
   return (this.mode & this.readMode) === this.readMode;
  }
  set read(val) {
   val ? this.mode |= this.readMode : this.mode &= ~this.readMode;
  }
  get write() {
   return (this.mode & this.writeMode) === this.writeMode;
  }
  set write(val) {
   val ? this.mode |= this.writeMode : this.mode &= ~this.writeMode;
  }
  get isFolder() {
   return FS.isDir(this.mode);
  }
  get isDevice() {
   return FS.isChrdev(this.mode);
  }
 },
 lookupPath(path, opts = {}) {
  path = PATH_FS.resolve(path);
  if (!path) return {
   path: "",
   node: null
  };
  var defaults = {
   follow_mount: true,
   recurse_count: 0
  };
  opts = Object.assign(defaults, opts);
  if (opts.recurse_count > 8) {
   throw new FS.ErrnoError(32);
  }
  var parts = path.split("/").filter(p => !!p);
  var current = FS.root;
  var current_path = "/";
  for (var i = 0; i < parts.length; i++) {
   var islast = (i === parts.length - 1);
   if (islast && opts.parent) {
    break;
   }
   current = FS.lookupNode(current, parts[i]);
   current_path = PATH.join2(current_path, parts[i]);
   if (FS.isMountpoint(current)) {
    if (!islast || (islast && opts.follow_mount)) {
     current = current.mounted.root;
    }
   }
   if (!islast || opts.follow) {
    var count = 0;
    while (FS.isLink(current.mode)) {
     var link = FS.readlink(current_path);
     current_path = PATH_FS.resolve(PATH.dirname(current_path), link);
     var lookup = FS.lookupPath(current_path, {
      recurse_count: opts.recurse_count + 1
     });
     current = lookup.node;
     if (count++ > 40) {
      throw new FS.ErrnoError(32);
     }
    }
   }
  }
  return {
   path: current_path,
   node: current
  };
 },
 getPath(node) {
  var path;
  while (true) {
   if (FS.isRoot(node)) {
    var mount = node.mount.mountpoint;
    if (!path) return mount;
    return mount[mount.length - 1] !== "/" ? `${mount}/${path}` : mount + path;
   }
   path = path ? `${node.name}/${path}` : node.name;
   node = node.parent;
  }
 },
 hashName(parentid, name) {
  var hash = 0;
  for (var i = 0; i < name.length; i++) {
   hash = ((hash << 5) - hash + name.charCodeAt(i)) | 0;
  }
  return ((parentid + hash) >>> 0) % FS.nameTable.length;
 },
 hashAddNode(node) {
  var hash = FS.hashName(node.parent.id, node.name);
  node.name_next = FS.nameTable[hash];
  FS.nameTable[hash] = node;
 },
 hashRemoveNode(node) {
  var hash = FS.hashName(node.parent.id, node.name);
  if (FS.nameTable[hash] === node) {
   FS.nameTable[hash] = node.name_next;
  } else {
   var current = FS.nameTable[hash];
   while (current) {
    if (current.name_next === node) {
     current.name_next = node.name_next;
     break;
    }
    current = current.name_next;
   }
  }
 },
 lookupNode(parent, name) {
  var errCode = FS.mayLookup(parent);
  if (errCode) {
   throw new FS.ErrnoError(errCode);
  }
  var hash = FS.hashName(parent.id, name);
  for (var node = FS.nameTable[hash]; node; node = node.name_next) {
   var nodeName = node.name;
   if (node.parent.id === parent.id && nodeName === name) {
    return node;
   }
  }
  return FS.lookup(parent, name);
 },
 createNode(parent, name, mode, rdev) {
  var node = new FS.FSNode(parent, name, mode, rdev);
  FS.hashAddNode(node);
  return node;
 },
 destroyNode(node) {
  FS.hashRemoveNode(node);
 },
 isRoot(node) {
  return node === node.parent;
 },
 isMountpoint(node) {
  return !!node.mounted;
 },
 isFile(mode) {
  return (mode & 61440) === 32768;
 },
 isDir(mode) {
  return (mode & 61440) === 16384;
 },
 isLink(mode) {
  return (mode & 61440) === 40960;
 },
 isChrdev(mode) {
  return (mode & 61440) === 8192;
 },
 isBlkdev(mode) {
  return (mode & 61440) === 24576;
 },
 isFIFO(mode) {
  return (mode & 61440) === 4096;
 },
 isSocket(mode) {
  return (mode & 49152) === 49152;
 },
 flagsToPermissionString(flag) {
  var perms = [ "r", "w", "rw" ][flag & 3];
  if ((flag & 512)) {
   perms += "w";
  }
  return perms;
 },
 nodePermissions(node, perms) {
  if (FS.ignorePermissions) {
   return 0;
  }
  if (perms.includes("r") && !(node.mode & 292)) {
   return 2;
  } else if (perms.includes("w") && !(node.mode & 146)) {
   return 2;
  } else if (perms.includes("x") && !(node.mode & 73)) {
   return 2;
  }
  return 0;
 },
 mayLookup(dir) {
  if (!FS.isDir(dir.mode)) return 54;
  var errCode = FS.nodePermissions(dir, "x");
  if (errCode) return errCode;
  if (!dir.node_ops.lookup) return 2;
  return 0;
 },
 mayCreate(dir, name) {
  try {
   var node = FS.lookupNode(dir, name);
   return 20;
  } catch (e) {}
  return FS.nodePermissions(dir, "wx");
 },
 mayDelete(dir, name, isdir) {
  var node;
  try {
   node = FS.lookupNode(dir, name);
  } catch (e) {
   return e.errno;
  }
  var errCode = FS.nodePermissions(dir, "wx");
  if (errCode) {
   return errCode;
  }
  if (isdir) {
   if (!FS.isDir(node.mode)) {
    return 54;
   }
   if (FS.isRoot(node) || FS.getPath(node) === FS.cwd()) {
    return 10;
   }
  } else {
   if (FS.isDir(node.mode)) {
    return 31;
   }
  }
  return 0;
 },
 mayOpen(node, flags) {
  if (!node) {
   return 44;
  }
  if (FS.isLink(node.mode)) {
   return 32;
  } else if (FS.isDir(node.mode)) {
   if (FS.flagsToPermissionString(flags) !== "r" ||  (flags & 512)) {
    return 31;
   }
  }
  return FS.nodePermissions(node, FS.flagsToPermissionString(flags));
 },
 MAX_OPEN_FDS: 4096,
 nextfd() {
  for (var fd = 0; fd <= FS.MAX_OPEN_FDS; fd++) {
   if (!FS.streams[fd]) {
    return fd;
   }
  }
  throw new FS.ErrnoError(33);
 },
 getStreamChecked(fd) {
  var stream = FS.getStream(fd);
  if (!stream) {
   throw new FS.ErrnoError(8);
  }
  return stream;
 },
 getStream: fd => FS.streams[fd],
 createStream(stream, fd = -1) {
  stream = Object.assign(new FS.FSStream, stream);
  if (fd == -1) {
   fd = FS.nextfd();
  }
  stream.fd = fd;
  FS.streams[fd] = stream;
  return stream;
 },
 closeStream(fd) {
  FS.streams[fd] = null;
 },
 dupStream(origStream, fd = -1) {
  var stream = FS.createStream(origStream, fd);
  stream.stream_ops?.dup?.(stream);
  return stream;
 },
 chrdev_stream_ops: {
  open(stream) {
   var device = FS.getDevice(stream.node.rdev);
   stream.stream_ops = device.stream_ops;
   stream.stream_ops.open?.(stream);
  },
  llseek() {
   throw new FS.ErrnoError(70);
  }
 },
 major: dev => ((dev) >> 8),
 minor: dev => ((dev) & 255),
 makedev: (ma, mi) => ((ma) << 8 | (mi)),
 registerDevice(dev, ops) {
  FS.devices[dev] = {
   stream_ops: ops
  };
 },
 getDevice: dev => FS.devices[dev],
 getMounts(mount) {
  var mounts = [];
  var check = [ mount ];
  while (check.length) {
   var m = check.pop();
   mounts.push(m);
   check.push(...m.mounts);
  }
  return mounts;
 },
 syncfs(populate, callback) {
  if (typeof populate == "function") {
   callback = populate;
   populate = false;
  }
  FS.syncFSRequests++;
  if (FS.syncFSRequests > 1) {
   err(`warning: ${FS.syncFSRequests} FS.syncfs operations in flight at once, probably just doing extra work`);
  }
  var mounts = FS.getMounts(FS.root.mount);
  var completed = 0;
  function doCallback(errCode) {
   FS.syncFSRequests--;
   return callback(errCode);
  }
  function done(errCode) {
   if (errCode) {
    if (!done.errored) {
     done.errored = true;
     return doCallback(errCode);
    }
    return;
   }
   if (++completed >= mounts.length) {
    doCallback(null);
   }
  }
  mounts.forEach(mount => {
   if (!mount.type.syncfs) {
    return done(null);
   }
   mount.type.syncfs(mount, populate, done);
  });
 },
 mount(type, opts, mountpoint) {
  var root = mountpoint === "/";
  var pseudo = !mountpoint;
  var node;
  if (root && FS.root) {
   throw new FS.ErrnoError(10);
  } else if (!root && !pseudo) {
   var lookup = FS.lookupPath(mountpoint, {
    follow_mount: false
   });
   mountpoint = lookup.path;
   node = lookup.node;
   if (FS.isMountpoint(node)) {
    throw new FS.ErrnoError(10);
   }
   if (!FS.isDir(node.mode)) {
    throw new FS.ErrnoError(54);
   }
  }
  var mount = {
   type: type,
   opts: opts,
   mountpoint: mountpoint,
   mounts: []
  };
  var mountRoot = type.mount(mount);
  mountRoot.mount = mount;
  mount.root = mountRoot;
  if (root) {
   FS.root = mountRoot;
  } else if (node) {
   node.mounted = mount;
   if (node.mount) {
    node.mount.mounts.push(mount);
   }
  }
  return mountRoot;
 },
 unmount(mountpoint) {
  var lookup = FS.lookupPath(mountpoint, {
   follow_mount: false
  });
  if (!FS.isMountpoint(lookup.node)) {
   throw new FS.ErrnoError(28);
  }
  var node = lookup.node;
  var mount = node.mounted;
  var mounts = FS.getMounts(mount);
  Object.keys(FS.nameTable).forEach(hash => {
   var current = FS.nameTable[hash];
   while (current) {
    var next = current.name_next;
    if (mounts.includes(current.mount)) {
     FS.destroyNode(current);
    }
    current = next;
   }
  });
  node.mounted = null;
  var idx = node.mount.mounts.indexOf(mount);
  node.mount.mounts.splice(idx, 1);
 },
 lookup(parent, name) {
  return parent.node_ops.lookup(parent, name);
 },
 mknod(path, mode, dev) {
  var lookup = FS.lookupPath(path, {
   parent: true
  });
  var parent = lookup.node;
  var name = PATH.basename(path);
  if (!name || name === "." || name === "..") {
   throw new FS.ErrnoError(28);
  }
  var errCode = FS.mayCreate(parent, name);
  if (errCode) {
   throw new FS.ErrnoError(errCode);
  }
  if (!parent.node_ops.mknod) {
   throw new FS.ErrnoError(63);
  }
  return parent.node_ops.mknod(parent, name, mode, dev);
 },
 create(path, mode) {
  mode = mode !== undefined ? mode : 438;
  /* 0666 */ mode &= 4095;
  mode |= 32768;
  return FS.mknod(path, mode, 0);
 },
 mkdir(path, mode) {
  mode = mode !== undefined ? mode : 511;
  /* 0777 */ mode &= 511 | 512;
  mode |= 16384;
  return FS.mknod(path, mode, 0);
 },
 mkdirTree(path, mode) {
  var dirs = path.split("/");
  var d = "";
  for (var i = 0; i < dirs.length; ++i) {
   if (!dirs[i]) continue;
   d += "/" + dirs[i];
   try {
    FS.mkdir(d, mode);
   } catch (e) {
    if (e.errno != 20) throw e;
   }
  }
 },
 mkdev(path, mode, dev) {
  if (typeof dev == "undefined") {
   dev = mode;
   mode = 438;
  }
  /* 0666 */ mode |= 8192;
  return FS.mknod(path, mode, dev);
 },
 symlink(oldpath, newpath) {
  if (!PATH_FS.resolve(oldpath)) {
   throw new FS.ErrnoError(44);
  }
  var lookup = FS.lookupPath(newpath, {
   parent: true
  });
  var parent = lookup.node;
  if (!parent) {
   throw new FS.ErrnoError(44);
  }
  var newname = PATH.basename(newpath);
  var errCode = FS.mayCreate(parent, newname);
  if (errCode) {
   throw new FS.ErrnoError(errCode);
  }
  if (!parent.node_ops.symlink) {
   throw new FS.ErrnoError(63);
  }
  return parent.node_ops.symlink(parent, newname, oldpath);
 },
 rename(old_path, new_path) {
  var old_dirname = PATH.dirname(old_path);
  var new_dirname = PATH.dirname(new_path);
  var old_name = PATH.basename(old_path);
  var new_name = PATH.basename(new_path);
  var lookup, old_dir, new_dir;
  lookup = FS.lookupPath(old_path, {
   parent: true
  });
  old_dir = lookup.node;
  lookup = FS.lookupPath(new_path, {
   parent: true
  });
  new_dir = lookup.node;
  if (!old_dir || !new_dir) throw new FS.ErrnoError(44);
  if (old_dir.mount !== new_dir.mount) {
   throw new FS.ErrnoError(75);
  }
  var old_node = FS.lookupNode(old_dir, old_name);
  var relative = PATH_FS.relative(old_path, new_dirname);
  if (relative.charAt(0) !== ".") {
   throw new FS.ErrnoError(28);
  }
  relative = PATH_FS.relative(new_path, old_dirname);
  if (relative.charAt(0) !== ".") {
   throw new FS.ErrnoError(55);
  }
  var new_node;
  try {
   new_node = FS.lookupNode(new_dir, new_name);
  } catch (e) {}
  if (old_node === new_node) {
   return;
  }
  var isdir = FS.isDir(old_node.mode);
  var errCode = FS.mayDelete(old_dir, old_name, isdir);
  if (errCode) {
   throw new FS.ErrnoError(errCode);
  }
  errCode = new_node ? FS.mayDelete(new_dir, new_name, isdir) : FS.mayCreate(new_dir, new_name);
  if (errCode) {
   throw new FS.ErrnoError(errCode);
  }
  if (!old_dir.node_ops.rename) {
   throw new FS.ErrnoError(63);
  }
  if (FS.isMountpoint(old_node) || (new_node && FS.isMountpoint(new_node))) {
   throw new FS.ErrnoError(10);
  }
  if (new_dir !== old_dir) {
   errCode = FS.nodePermissions(old_dir, "w");
   if (errCode) {
    throw new FS.ErrnoError(errCode);
   }
  }
  FS.hashRemoveNode(old_node);
  try {
   old_dir.node_ops.rename(old_node, new_dir, new_name);
  } catch (e) {
   throw e;
  } finally {
   FS.hashAddNode(old_node);
  }
 },
 rmdir(path) {
  var lookup = FS.lookupPath(path, {
   parent: true
  });
  var parent = lookup.node;
  var name = PATH.basename(path);
  var node = FS.lookupNode(parent, name);
  var errCode = FS.mayDelete(parent, name, true);
  if (errCode) {
   throw new FS.ErrnoError(errCode);
  }
  if (!parent.node_ops.rmdir) {
   throw new FS.ErrnoError(63);
  }
  if (FS.isMountpoint(node)) {
   throw new FS.ErrnoError(10);
  }
  parent.node_ops.rmdir(parent, name);
  FS.destroyNode(node);
 },
 readdir(path) {
  var lookup = FS.lookupPath(path, {
   follow: true
  });
  var node = lookup.node;
  if (!node.node_ops.readdir) {
   throw new FS.ErrnoError(54);
  }
  return node.node_ops.readdir(node);
 },
 unlink(path) {
  var lookup = FS.lookupPath(path, {
   parent: true
  });
  var parent = lookup.node;
  if (!parent) {
   throw new FS.ErrnoError(44);
  }
  var name = PATH.basename(path);
  var node = FS.lookupNode(parent, name);
  var errCode = FS.mayDelete(parent, name, false);
  if (errCode) {
   throw new FS.ErrnoError(errCode);
  }
  if (!parent.node_ops.unlink) {
   throw new FS.ErrnoError(63);
  }
  if (FS.isMountpoint(node)) {
   throw new FS.ErrnoError(10);
  }
  parent.node_ops.unlink(parent, name);
  FS.destroyNode(node);
 },
 readlink(path) {
  var lookup = FS.lookupPath(path);
  var link = lookup.node;
  if (!link) {
   throw new FS.ErrnoError(44);
  }
  if (!link.node_ops.readlink) {
   throw new FS.ErrnoError(28);
  }
  return PATH_FS.resolve(FS.getPath(link.parent), link.node_ops.readlink(link));
 },
 stat(path, dontFollow) {
  var lookup = FS.lookupPath(path, {
   follow: !dontFollow
  });
  var node = lookup.node;
  if (!node) {
   throw new FS.ErrnoError(44);
  }
  if (!node.node_ops.getattr) {
   throw new FS.ErrnoError(63);
  }
  return node.node_ops.getattr(node);
 },
 lstat(path) {
  return FS.stat(path, true);
 },
 chmod(path, mode, dontFollow) {
  var node;
  if (typeof path == "string") {
   var lookup = FS.lookupPath(path, {
    follow: !dontFollow
   });
   node = lookup.node;
  } else {
   node = path;
  }
  if (!node.node_ops.setattr) {
   throw new FS.ErrnoError(63);
  }
  node.node_ops.setattr(node, {
   mode: (mode & 4095) | (node.mode & ~4095),
   timestamp: Date.now()
  });
 },
 lchmod(path, mode) {
  FS.chmod(path, mode, true);
 },
 fchmod(fd, mode) {
  var stream = FS.getStreamChecked(fd);
  FS.chmod(stream.node, mode);
 },
 chown(path, uid, gid, dontFollow) {
  var node;
  if (typeof path == "string") {
   var lookup = FS.lookupPath(path, {
    follow: !dontFollow
   });
   node = lookup.node;
  } else {
   node = path;
  }
  if (!node.node_ops.setattr) {
   throw new FS.ErrnoError(63);
  }
  node.node_ops.setattr(node, {
   timestamp: Date.now()
  });
 },
 lchown(path, uid, gid) {
  FS.chown(path, uid, gid, true);
 },
 fchown(fd, uid, gid) {
  var stream = FS.getStreamChecked(fd);
  FS.chown(stream.node, uid, gid);
 },
 truncate(path, len) {
  if (len < 0) {
   throw new FS.ErrnoError(28);
  }
  var node;
  if (typeof path == "string") {
   var lookup = FS.lookupPath(path, {
    follow: true
   });
   node = lookup.node;
  } else {
   node = path;
  }
  if (!node.node_ops.setattr) {
   throw new FS.ErrnoError(63);
  }
  if (FS.isDir(node.mode)) {
   throw new FS.ErrnoError(31);
  }
  if (!FS.isFile(node.mode)) {
   throw new FS.ErrnoError(28);
  }
  var errCode = FS.nodePermissions(node, "w");
  if (errCode) {
   throw new FS.ErrnoError(errCode);
  }
  node.node_ops.setattr(node, {
   size: len,
   timestamp: Date.now()
  });
 },
 ftruncate(fd, len) {
  var stream = FS.getStreamChecked(fd);
  if ((stream.flags & 2097155) === 0) {
   throw new FS.ErrnoError(28);
  }
  FS.truncate(stream.node, len);
 },
 utime(path, atime, mtime) {
  var lookup = FS.lookupPath(path, {
   follow: true
  });
  var node = lookup.node;
  node.node_ops.setattr(node, {
   timestamp: Math.max(atime, mtime)
  });
 },
 open(path, flags, mode) {
  if (path === "") {
   throw new FS.ErrnoError(44);
  }
  flags = typeof flags == "string" ? FS_modeStringToFlags(flags) : flags;
  mode = typeof mode == "undefined" ? 438 : /* 0666 */ mode;
  if ((flags & 64)) {
   mode = (mode & 4095) | 32768;
  } else {
   mode = 0;
  }
  var node;
  if (typeof path == "object") {
   node = path;
  } else {
   path = PATH.normalize(path);
   try {
    var lookup = FS.lookupPath(path, {
     follow: !(flags & 131072)
    });
    node = lookup.node;
   } catch (e) {}
  }
  var created = false;
  if ((flags & 64)) {
   if (node) {
    if ((flags & 128)) {
     throw new FS.ErrnoError(20);
    }
   } else {
    node = FS.mknod(path, mode, 0);
    created = true;
   }
  }
  if (!node) {
   throw new FS.ErrnoError(44);
  }
  if (FS.isChrdev(node.mode)) {
   flags &= ~512;
  }
  if ((flags & 65536) && !FS.isDir(node.mode)) {
   throw new FS.ErrnoError(54);
  }
  if (!created) {
   var errCode = FS.mayOpen(node, flags);
   if (errCode) {
    throw new FS.ErrnoError(errCode);
   }
  }
  if ((flags & 512) && !created) {
   FS.truncate(node, 0);
  }
  flags &= ~(128 | 512 | 131072);
  var stream = FS.createStream({
   node: node,
   path: FS.getPath(node),
   flags: flags,
   seekable: true,
   position: 0,
   stream_ops: node.stream_ops,
   ungotten: [],
   error: false
  });
  if (stream.stream_ops.open) {
   stream.stream_ops.open(stream);
  }
  if (Module["logReadFiles"] && !(flags & 1)) {
   if (!FS.readFiles) FS.readFiles = {};
   if (!(path in FS.readFiles)) {
    FS.readFiles[path] = 1;
   }
  }
  return stream;
 },
 close(stream) {
  if (FS.isClosed(stream)) {
   throw new FS.ErrnoError(8);
  }
  if (stream.getdents) stream.getdents = null;
  try {
   if (stream.stream_ops.close) {
    stream.stream_ops.close(stream);
   }
  } catch (e) {
   throw e;
  } finally {
   FS.closeStream(stream.fd);
  }
  stream.fd = null;
 },
 isClosed(stream) {
  return stream.fd === null;
 },
 llseek(stream, offset, whence) {
  if (FS.isClosed(stream)) {
   throw new FS.ErrnoError(8);
  }
  if (!stream.seekable || !stream.stream_ops.llseek) {
   throw new FS.ErrnoError(70);
  }
  if (whence != 0 && whence != 1 && whence != 2) {
   throw new FS.ErrnoError(28);
  }
  stream.position = stream.stream_ops.llseek(stream, offset, whence);
  stream.ungotten = [];
  return stream.position;
 },
 read(stream, buffer, offset, length, position) {
  if (length < 0 || position < 0) {
   throw new FS.ErrnoError(28);
  }
  if (FS.isClosed(stream)) {
   throw new FS.ErrnoError(8);
  }
  if ((stream.flags & 2097155) === 1) {
   throw new FS.ErrnoError(8);
  }
  if (FS.isDir(stream.node.mode)) {
   throw new FS.ErrnoError(31);
  }
  if (!stream.stream_ops.read) {
   throw new FS.ErrnoError(28);
  }
  var seeking = typeof position != "undefined";
  if (!seeking) {
   position = stream.position;
  } else if (!stream.seekable) {
   throw new FS.ErrnoError(70);
  }
  var bytesRead = stream.stream_ops.read(stream, buffer, offset, length, position);
  if (!seeking) stream.position += bytesRead;
  return bytesRead;
 },
 write(stream, buffer, offset, length, position, canOwn) {
  if (length < 0 || position < 0) {
   throw new FS.ErrnoError(28);
  }
  if (FS.isClosed(stream)) {
   throw new FS.ErrnoError(8);
  }
  if ((stream.flags & 2097155) === 0) {
   throw new FS.ErrnoError(8);
  }
  if (FS.isDir(stream.node.mode)) {
   throw new FS.ErrnoError(31);
  }
  if (!stream.stream_ops.write) {
   throw new FS.ErrnoError(28);
  }
  if (stream.seekable && stream.flags & 1024) {
   FS.llseek(stream, 0, 2);
  }
  var seeking = typeof position != "undefined";
  if (!seeking) {
   position = stream.position;
  } else if (!stream.seekable) {
   throw new FS.ErrnoError(70);
  }
  var bytesWritten = stream.stream_ops.write(stream, buffer, offset, length, position, canOwn);
  if (!seeking) stream.position += bytesWritten;
  return bytesWritten;
 },
 allocate(stream, offset, length) {
  if (FS.isClosed(stream)) {
   throw new FS.ErrnoError(8);
  }
  if (offset < 0 || length <= 0) {
   throw new FS.ErrnoError(28);
  }
  if ((stream.flags & 2097155) === 0) {
   throw new FS.ErrnoError(8);
  }
  if (!FS.isFile(stream.node.mode) && !FS.isDir(stream.node.mode)) {
   throw new FS.ErrnoError(43);
  }
  if (!stream.stream_ops.allocate) {
   throw new FS.ErrnoError(138);
  }
  stream.stream_ops.allocate(stream, offset, length);
 },
 mmap(stream, length, position, prot, flags) {
  if ((prot & 2) !== 0 && (flags & 2) === 0 && (stream.flags & 2097155) !== 2) {
   throw new FS.ErrnoError(2);
  }
  if ((stream.flags & 2097155) === 1) {
   throw new FS.ErrnoError(2);
  }
  if (!stream.stream_ops.mmap) {
   throw new FS.ErrnoError(43);
  }
  return stream.stream_ops.mmap(stream, length, position, prot, flags);
 },
 msync(stream, buffer, offset, length, mmapFlags) {
  if (!stream.stream_ops.msync) {
   return 0;
  }
  return stream.stream_ops.msync(stream, buffer, offset, length, mmapFlags);
 },
 ioctl(stream, cmd, arg) {
  if (!stream.stream_ops.ioctl) {
   throw new FS.ErrnoError(59);
  }
  return stream.stream_ops.ioctl(stream, cmd, arg);
 },
 readFile(path, opts = {}) {
  opts.flags = opts.flags || 0;
  opts.encoding = opts.encoding || "binary";
  if (opts.encoding !== "utf8" && opts.encoding !== "binary") {
   throw new Error(`Invalid encoding type "${opts.encoding}"`);
  }
  var ret;
  var stream = FS.open(path, opts.flags);
  var stat = FS.stat(path);
  var length = stat.size;
  var buf = new Uint8Array(length);
  FS.read(stream, buf, 0, length, 0);
  if (opts.encoding === "utf8") {
   ret = UTF8ArrayToString(buf, 0);
  } else if (opts.encoding === "binary") {
   ret = buf;
  }
  FS.close(stream);
  return ret;
 },
 writeFile(path, data, opts = {}) {
  opts.flags = opts.flags || 577;
  var stream = FS.open(path, opts.flags, opts.mode);
  if (typeof data == "string") {
   var buf = new Uint8Array(lengthBytesUTF8(data) + 1);
   var actualNumBytes = stringToUTF8Array(data, buf, 0, buf.length);
   FS.write(stream, buf, 0, actualNumBytes, undefined, opts.canOwn);
  } else if (ArrayBuffer.isView(data)) {
   FS.write(stream, data, 0, data.byteLength, undefined, opts.canOwn);
  } else {
   throw new Error("Unsupported data type");
  }
  FS.close(stream);
 },
 cwd: () => FS.currentPath,
 chdir(path) {
  var lookup = FS.lookupPath(path, {
   follow: true
  });
  if (lookup.node === null) {
   throw new FS.ErrnoError(44);
  }
  if (!FS.isDir(lookup.node.mode)) {
   throw new FS.ErrnoError(54);
  }
  var errCode = FS.nodePermissions(lookup.node, "x");
  if (errCode) {
   throw new FS.ErrnoError(errCode);
  }
  FS.currentPath = lookup.path;
 },
 createDefaultDirectories() {
  FS.mkdir("/tmp");
  FS.mkdir("/home");
  FS.mkdir("/home/web_user");
 },
 createDefaultDevices() {
  FS.mkdir("/dev");
  FS.registerDevice(FS.makedev(1, 3), {
   read: () => 0,
   write: (stream, buffer, offset, length, pos) => length
  });
  FS.mkdev("/dev/null", FS.makedev(1, 3));
  TTY.register(FS.makedev(5, 0), TTY.default_tty_ops);
  TTY.register(FS.makedev(6, 0), TTY.default_tty1_ops);
  FS.mkdev("/dev/tty", FS.makedev(5, 0));
  FS.mkdev("/dev/tty1", FS.makedev(6, 0));
  var randomBuffer = new Uint8Array(1024), randomLeft = 0;
  var randomByte = () => {
   if (randomLeft === 0) {
    randomLeft = randomFill(randomBuffer).byteLength;
   }
   return randomBuffer[--randomLeft];
  };
  FS.createDevice("/dev", "random", randomByte);
  FS.createDevice("/dev", "urandom", randomByte);
  FS.mkdir("/dev/shm");
  FS.mkdir("/dev/shm/tmp");
 },
 createSpecialDirectories() {
  FS.mkdir("/proc");
  var proc_self = FS.mkdir("/proc/self");
  FS.mkdir("/proc/self/fd");
  FS.mount({
   mount() {
    var node = FS.createNode(proc_self, "fd", 16384 | 511, /* 0777 */ 73);
    node.node_ops = {
     lookup(parent, name) {
      var fd = +name;
      var stream = FS.getStreamChecked(fd);
      var ret = {
       parent: null,
       mount: {
        mountpoint: "fake"
       },
       node_ops: {
        readlink: () => stream.path
       }
      };
      ret.parent = ret;
      return ret;
     }
    };
    return node;
   }
  }, {}, "/proc/self/fd");
 },
 createStandardStreams() {
  if (Module["stdin"]) {
   FS.createDevice("/dev", "stdin", Module["stdin"]);
  } else {
   FS.symlink("/dev/tty", "/dev/stdin");
  }
  if (Module["stdout"]) {
   FS.createDevice("/dev", "stdout", null, Module["stdout"]);
  } else {
   FS.symlink("/dev/tty", "/dev/stdout");
  }
  if (Module["stderr"]) {
   FS.createDevice("/dev", "stderr", null, Module["stderr"]);
  } else {
   FS.symlink("/dev/tty1", "/dev/stderr");
  }
  var stdin = FS.open("/dev/stdin", 0);
  var stdout = FS.open("/dev/stdout", 1);
  var stderr = FS.open("/dev/stderr", 1);
 },
 staticInit() {
  [ 44 ].forEach(code => {
   FS.genericErrors[code] = new FS.ErrnoError(code);
   FS.genericErrors[code].stack = "<generic error, no stack>";
  });
  FS.nameTable = new Array(4096);
  FS.mount(MEMFS, {}, "/");
  FS.createDefaultDirectories();
  FS.createDefaultDevices();
  FS.createSpecialDirectories();
  FS.filesystems = {
   "MEMFS": MEMFS,
   "IDBFS": IDBFS
  };
 },
 init(input, output, error) {
  FS.init.initialized = true;
  Module["stdin"] = input || Module["stdin"];
  Module["stdout"] = output || Module["stdout"];
  Module["stderr"] = error || Module["stderr"];
  FS.createStandardStreams();
 },
 quit() {
  FS.init.initialized = false;
  _fflush(0);
  for (var i = 0; i < FS.streams.length; i++) {
   var stream = FS.streams[i];
   if (!stream) {
    continue;
   }
   FS.close(stream);
  }
 },
 findObject(path, dontResolveLastLink) {
  var ret = FS.analyzePath(path, dontResolveLastLink);
  if (!ret.exists) {
   return null;
  }
  return ret.object;
 },
 analyzePath(path, dontResolveLastLink) {
  try {
   var lookup = FS.lookupPath(path, {
    follow: !dontResolveLastLink
   });
   path = lookup.path;
  } catch (e) {}
  var ret = {
   isRoot: false,
   exists: false,
   error: 0,
   name: null,
   path: null,
   object: null,
   parentExists: false,
   parentPath: null,
   parentObject: null
  };
  try {
   var lookup = FS.lookupPath(path, {
    parent: true
   });
   ret.parentExists = true;
   ret.parentPath = lookup.path;
   ret.parentObject = lookup.node;
   ret.name = PATH.basename(path);
   lookup = FS.lookupPath(path, {
    follow: !dontResolveLastLink
   });
   ret.exists = true;
   ret.path = lookup.path;
   ret.object = lookup.node;
   ret.name = lookup.node.name;
   ret.isRoot = lookup.path === "/";
  } catch (e) {
   ret.error = e.errno;
  }
  return ret;
 },
 createPath(parent, path, canRead, canWrite) {
  parent = typeof parent == "string" ? parent : FS.getPath(parent);
  var parts = path.split("/").reverse();
  while (parts.length) {
   var part = parts.pop();
   if (!part) continue;
   var current = PATH.join2(parent, part);
   try {
    FS.mkdir(current);
   } catch (e) {}
   parent = current;
  }
  return current;
 },
 createFile(parent, name, properties, canRead, canWrite) {
  var path = PATH.join2(typeof parent == "string" ? parent : FS.getPath(parent), name);
  var mode = FS_getMode(canRead, canWrite);
  return FS.create(path, mode);
 },
 createDataFile(parent, name, data, canRead, canWrite, canOwn) {
  var path = name;
  if (parent) {
   parent = typeof parent == "string" ? parent : FS.getPath(parent);
   path = name ? PATH.join2(parent, name) : parent;
  }
  var mode = FS_getMode(canRead, canWrite);
  var node = FS.create(path, mode);
  if (data) {
   if (typeof data == "string") {
    var arr = new Array(data.length);
    for (var i = 0, len = data.length; i < len; ++i) arr[i] = data.charCodeAt(i);
    data = arr;
   }
   FS.chmod(node, mode | 146);
   var stream = FS.open(node, 577);
   FS.write(stream, data, 0, data.length, 0, canOwn);
   FS.close(stream);
   FS.chmod(node, mode);
  }
 },
 createDevice(parent, name, input, output) {
  var path = PATH.join2(typeof parent == "string" ? parent : FS.getPath(parent), name);
  var mode = FS_getMode(!!input, !!output);
  if (!FS.createDevice.major) FS.createDevice.major = 64;
  var dev = FS.makedev(FS.createDevice.major++, 0);
  FS.registerDevice(dev, {
   open(stream) {
    stream.seekable = false;
   },
   close(stream) {
    if (output?.buffer?.length) {
     output(10);
    }
   },
   read(stream, buffer, offset, length, pos) {
    /* ignored */ var bytesRead = 0;
    for (var i = 0; i < length; i++) {
     var result;
     try {
      result = input();
     } catch (e) {
      throw new FS.ErrnoError(29);
     }
     if (result === undefined && bytesRead === 0) {
      throw new FS.ErrnoError(6);
     }
     if (result === null || result === undefined) break;
     bytesRead++;
     buffer[offset + i] = result;
    }
    if (bytesRead) {
     stream.node.timestamp = Date.now();
    }
    return bytesRead;
   },
   write(stream, buffer, offset, length, pos) {
    for (var i = 0; i < length; i++) {
     try {
      output(buffer[offset + i]);
     } catch (e) {
      throw new FS.ErrnoError(29);
     }
    }
    if (length) {
     stream.node.timestamp = Date.now();
    }
    return i;
   }
  });
  return FS.mkdev(path, mode, dev);
 },
 forceLoadFile(obj) {
  if (obj.isDevice || obj.isFolder || obj.link || obj.contents) return true;
  if (typeof XMLHttpRequest != "undefined") {
   throw new Error("Lazy loading should have been performed (contents set) in createLazyFile, but it was not. Lazy loading only works in web workers. Use --embed-file or --preload-file in emcc on the main thread.");
  } else if (read_) {
   try {
    obj.contents = intArrayFromString(read_(obj.url), true);
    obj.usedBytes = obj.contents.length;
   } catch (e) {
    throw new FS.ErrnoError(29);
   }
  } else {
   throw new Error("Cannot load without read() or XMLHttpRequest.");
  }
 },
 createLazyFile(parent, name, url, canRead, canWrite) {
  class LazyUint8Array {
   constructor() {
    this.lengthKnown = false;
    this.chunks = [];
   }
   get(idx) {
    if (idx > this.length - 1 || idx < 0) {
     return undefined;
    }
    var chunkOffset = idx % this.chunkSize;
    var chunkNum = (idx / this.chunkSize) | 0;
    return this.getter(chunkNum)[chunkOffset];
   }
   setDataGetter(getter) {
    this.getter = getter;
   }
   cacheLength() {
    var xhr = new XMLHttpRequest;
    xhr.open("HEAD", url, false);
    xhr.send(null);
    if (!(xhr.status >= 200 && xhr.status < 300 || xhr.status === 304)) throw new Error("Couldn't load " + url + ". Status: " + xhr.status);
    var datalength = Number(xhr.getResponseHeader("Content-length"));
    var header;
    var hasByteServing = (header = xhr.getResponseHeader("Accept-Ranges")) && header === "bytes";
    var usesGzip = (header = xhr.getResponseHeader("Content-Encoding")) && header === "gzip";
    var chunkSize = 1024 * 1024;
    if (!hasByteServing) chunkSize = datalength;
    var doXHR = (from, to) => {
     if (from > to) throw new Error("invalid range (" + from + ", " + to + ") or no bytes requested!");
     if (to > datalength - 1) throw new Error("only " + datalength + " bytes available! programmer error!");
     var xhr = new XMLHttpRequest;
     xhr.open("GET", url, false);
     if (datalength !== chunkSize) xhr.setRequestHeader("Range", "bytes=" + from + "-" + to);
     xhr.responseType = "arraybuffer";
     if (xhr.overrideMimeType) {
      xhr.overrideMimeType("text/plain; charset=x-user-defined");
     }
     xhr.send(null);
     if (!(xhr.status >= 200 && xhr.status < 300 || xhr.status === 304)) throw new Error("Couldn't load " + url + ". Status: " + xhr.status);
     if (xhr.response !== undefined) {
      return new Uint8Array(/** @type{Array<number>} */ (xhr.response || []));
     }
     return intArrayFromString(xhr.responseText || "", true);
    };
    var lazyArray = this;
    lazyArray.setDataGetter(chunkNum => {
     var start = chunkNum * chunkSize;
     var end = (chunkNum + 1) * chunkSize - 1;
     end = Math.min(end, datalength - 1);
     if (typeof lazyArray.chunks[chunkNum] == "undefined") {
      lazyArray.chunks[chunkNum] = doXHR(start, end);
     }
     if (typeof lazyArray.chunks[chunkNum] == "undefined") throw new Error("doXHR failed!");
     return lazyArray.chunks[chunkNum];
    });
    if (usesGzip || !datalength) {
     chunkSize = datalength = 1;
     datalength = this.getter(0).length;
     chunkSize = datalength;
     out("LazyFiles on gzip forces download of the whole file when length is accessed");
    }
    this._length = datalength;
    this._chunkSize = chunkSize;
    this.lengthKnown = true;
   }
   get length() {
    if (!this.lengthKnown) {
     this.cacheLength();
    }
    return this._length;
   }
   get chunkSize() {
    if (!this.lengthKnown) {
     this.cacheLength();
    }
    return this._chunkSize;
   }
  }
  if (typeof XMLHttpRequest != "undefined") {
   if (!ENVIRONMENT_IS_WORKER) throw "Cannot do synchronous binary XHRs outside webworkers in modern browsers. Use --embed-file or --preload-file in emcc";
   var lazyArray = new LazyUint8Array;
   var properties = {
    isDevice: false,
    contents: lazyArray
   };
  } else {
   var properties = {
    isDevice: false,
    url: url
   };
  }
  var node = FS.createFile(parent, name, properties, canRead, canWrite);
  if (properties.contents) {
   node.contents = properties.contents;
  } else if (properties.url) {
   node.contents = null;
   node.url = properties.url;
  }
  Object.defineProperties(node, {
   usedBytes: {
    get: function() {
     return this.contents.length;
    }
   }
  });
  var stream_ops = {};
  var keys = Object.keys(node.stream_ops);
  keys.forEach(key => {
   var fn = node.stream_ops[key];
   stream_ops[key] = (...args) => {
    FS.forceLoadFile(node);
    return fn(...args);
   };
  });
  function writeChunks(stream, buffer, offset, length, position) {
   var contents = stream.node.contents;
   if (position >= contents.length) return 0;
   var size = Math.min(contents.length - position, length);
   if (contents.slice) {
    for (var i = 0; i < size; i++) {
     buffer[offset + i] = contents[position + i];
    }
   } else {
    for (var i = 0; i < size; i++) {
     buffer[offset + i] = contents.get(position + i);
    }
   }
   return size;
  }
  stream_ops.read = (stream, buffer, offset, length, position) => {
   FS.forceLoadFile(node);
   return writeChunks(stream, buffer, offset, length, position);
  };
  stream_ops.mmap = (stream, length, position, prot, flags) => {
   FS.forceLoadFile(node);
   var ptr = mmapAlloc(length);
   if (!ptr) {
    throw new FS.ErrnoError(48);
   }
   writeChunks(stream, GROWABLE_HEAP_I8(), ptr, length, position);
   return {
    ptr: ptr,
    allocated: true
   };
  };
  node.stream_ops = stream_ops;
  return node;
 }
};

var SYSCALLS = {
 DEFAULT_POLLMASK: 5,
 calculateAt(dirfd, path, allowEmpty) {
  if (PATH.isAbs(path)) {
   return path;
  }
  var dir;
  if (dirfd === -100) {
   dir = FS.cwd();
  } else {
   var dirstream = SYSCALLS.getStreamFromFD(dirfd);
   dir = dirstream.path;
  }
  if (path.length == 0) {
   if (!allowEmpty) {
    throw new FS.ErrnoError(44);
   }
   return dir;
  }
  return PATH.join2(dir, path);
 },
 doStat(func, path, buf) {
  var stat = func(path);
  GROWABLE_HEAP_I32()[((buf) >> 2)] = stat.dev;
  GROWABLE_HEAP_I32()[(((buf) + (4)) >> 2)] = stat.mode;
  GROWABLE_HEAP_U32()[(((buf) + (8)) >> 2)] = stat.nlink;
  GROWABLE_HEAP_I32()[(((buf) + (12)) >> 2)] = stat.uid;
  GROWABLE_HEAP_I32()[(((buf) + (16)) >> 2)] = stat.gid;
  GROWABLE_HEAP_I32()[(((buf) + (20)) >> 2)] = stat.rdev;
  HEAP64[(((buf) + (24)) >> 3)] = BigInt(stat.size);
  GROWABLE_HEAP_I32()[(((buf) + (32)) >> 2)] = 4096;
  GROWABLE_HEAP_I32()[(((buf) + (36)) >> 2)] = stat.blocks;
  var atime = stat.atime.getTime();
  var mtime = stat.mtime.getTime();
  var ctime = stat.ctime.getTime();
  HEAP64[(((buf) + (40)) >> 3)] = BigInt(Math.floor(atime / 1e3));
  GROWABLE_HEAP_U32()[(((buf) + (48)) >> 2)] = (atime % 1e3) * 1e3;
  HEAP64[(((buf) + (56)) >> 3)] = BigInt(Math.floor(mtime / 1e3));
  GROWABLE_HEAP_U32()[(((buf) + (64)) >> 2)] = (mtime % 1e3) * 1e3;
  HEAP64[(((buf) + (72)) >> 3)] = BigInt(Math.floor(ctime / 1e3));
  GROWABLE_HEAP_U32()[(((buf) + (80)) >> 2)] = (ctime % 1e3) * 1e3;
  HEAP64[(((buf) + (88)) >> 3)] = BigInt(stat.ino);
  return 0;
 },
 doMsync(addr, stream, len, flags, offset) {
  if (!FS.isFile(stream.node.mode)) {
   throw new FS.ErrnoError(43);
  }
  if (flags & 2) {
   return 0;
  }
  var buffer = GROWABLE_HEAP_U8().slice(addr, addr + len);
  FS.msync(stream, buffer, offset, len, flags);
 },
 varargs: undefined,
 get() {
  var ret = GROWABLE_HEAP_I32()[((+SYSCALLS.varargs) >> 2)];
  SYSCALLS.varargs += 4;
  return ret;
 },
 getp() {
  return SYSCALLS.get();
 },
 getStr(ptr) {
  var ret = UTF8ToString(ptr);
  return ret;
 },
 getStreamFromFD(fd) {
  var stream = FS.getStreamChecked(fd);
  return stream;
 }
};

function ___syscall_chdir(path) {
 if (ENVIRONMENT_IS_PTHREAD) return proxyToMainThread(3, 0, 1, path);
 try {
  path = SYSCALLS.getStr(path);
  FS.chdir(path);
  return 0;
 } catch (e) {
  if (typeof FS == "undefined" || !(e.name === "ErrnoError")) throw e;
  return -e.errno;
 }
}

function ___syscall_chmod(path, mode) {
 if (ENVIRONMENT_IS_PTHREAD) return proxyToMainThread(4, 0, 1, path, mode);
 try {
  path = SYSCALLS.getStr(path);
  FS.chmod(path, mode);
  return 0;
 } catch (e) {
  if (typeof FS == "undefined" || !(e.name === "ErrnoError")) throw e;
  return -e.errno;
 }
}

var SOCKFS = {
 mount(mount) {
  Module["websocket"] = (Module["websocket"] && ("object" === typeof Module["websocket"])) ? Module["websocket"] : {};
  Module["websocket"]._callbacks = {};
  Module["websocket"]["on"] = /** @this{Object} */ function(event, callback) {
   if ("function" === typeof callback) {
    this._callbacks[event] = callback;
   }
   return this;
  };
  Module["websocket"].emit = /** @this{Object} */ function(event, param) {
   if ("function" === typeof this._callbacks[event]) {
    this._callbacks[event].call(this, param);
   }
  };
  return FS.createNode(null, "/", 16384 | 511, /* 0777 */ 0);
 },
 createSocket(family, type, protocol) {
  type &= ~526336;
  var streaming = type == 1;
  if (streaming && protocol && protocol != 6) {
   throw new FS.ErrnoError(66);
  }
  var sock = {
   family: family,
   type: type,
   protocol: protocol,
   server: null,
   error: null,
   peers: {},
   pending: [],
   recv_queue: [],
   sock_ops: SOCKFS.websocket_sock_ops
  };
  var name = SOCKFS.nextname();
  var node = FS.createNode(SOCKFS.root, name, 49152, 0);
  node.sock = sock;
  var stream = FS.createStream({
   path: name,
   node: node,
   flags: 2,
   seekable: false,
   stream_ops: SOCKFS.stream_ops
  });
  sock.stream = stream;
  return sock;
 },
 getSocket(fd) {
  var stream = FS.getStream(fd);
  if (!stream || !FS.isSocket(stream.node.mode)) {
   return null;
  }
  return stream.node.sock;
 },
 stream_ops: {
  poll(stream) {
   var sock = stream.node.sock;
   return sock.sock_ops.poll(sock);
  },
  ioctl(stream, request, varargs) {
   var sock = stream.node.sock;
   return sock.sock_ops.ioctl(sock, request, varargs);
  },
  read(stream, buffer, offset, length, position) {
   /* ignored */ var sock = stream.node.sock;
   var msg = sock.sock_ops.recvmsg(sock, length);
   if (!msg) {
    return 0;
   }
   buffer.set(msg.buffer, offset);
   return msg.buffer.length;
  },
  write(stream, buffer, offset, length, position) {
   /* ignored */ var sock = stream.node.sock;
   return sock.sock_ops.sendmsg(sock, buffer, offset, length);
  },
  close(stream) {
   var sock = stream.node.sock;
   sock.sock_ops.close(sock);
  }
 },
 nextname() {
  if (!SOCKFS.nextname.current) {
   SOCKFS.nextname.current = 0;
  }
  return "socket[" + (SOCKFS.nextname.current++) + "]";
 },
 websocket_sock_ops: {
  createPeer(sock, addr, port) {
   var ws;
   if (typeof addr == "object") {
    ws = addr;
    addr = null;
    port = null;
   }
   if (ws) {
    if (ws._socket) {
     addr = ws._socket.remoteAddress;
     port = ws._socket.remotePort;
    } else  {
     var result = /ws[s]?:\/\/([^:]+):(\d+)/.exec(ws.url);
     if (!result) {
      throw new Error("WebSocket URL must be in the format ws(s)://address:port");
     }
     addr = result[1];
     port = parseInt(result[2], 10);
    }
   } else {
    try {
     var runtimeConfig = (Module["websocket"] && ("object" === typeof Module["websocket"]));
     var url = "ws:#".replace("#", "//");
     if (runtimeConfig) {
      if ("string" === typeof Module["websocket"]["url"]) {
       url = Module["websocket"]["url"];
      }
     }
     if (url === "ws://" || url === "wss://") {
      var parts = addr.split("/");
      url = url + parts[0] + ":" + port + "/" + parts.slice(1).join("/");
     }
     var subProtocols = "binary";
     if (runtimeConfig) {
      if ("string" === typeof Module["websocket"]["subprotocol"]) {
       subProtocols = Module["websocket"]["subprotocol"];
      }
     }
     var opts = undefined;
     if (subProtocols !== "null") {
      subProtocols = subProtocols.replace(/^ +| +$/g, "").split(/ *, */);
      opts = subProtocols;
     }
     if (runtimeConfig && null === Module["websocket"]["subprotocol"]) {
      subProtocols = "null";
      opts = undefined;
     }
     var WebSocketConstructor;
     {
      WebSocketConstructor = WebSocket;
     }
     ws = new WebSocketConstructor(url, opts);
     ws.binaryType = "arraybuffer";
    } catch (e) {
     throw new FS.ErrnoError(23);
    }
   }
   var peer = {
    addr: addr,
    port: port,
    socket: ws,
    dgram_send_queue: []
   };
   SOCKFS.websocket_sock_ops.addPeer(sock, peer);
   SOCKFS.websocket_sock_ops.handlePeerEvents(sock, peer);
   if (sock.type === 2 && typeof sock.sport != "undefined") {
    peer.dgram_send_queue.push(new Uint8Array([ 255, 255, 255, 255, "p".charCodeAt(0), "o".charCodeAt(0), "r".charCodeAt(0), "t".charCodeAt(0), ((sock.sport & 65280) >> 8), (sock.sport & 255) ]));
   }
   return peer;
  },
  getPeer(sock, addr, port) {
   return sock.peers[addr + ":" + port];
  },
  addPeer(sock, peer) {
   sock.peers[peer.addr + ":" + peer.port] = peer;
  },
  removePeer(sock, peer) {
   delete sock.peers[peer.addr + ":" + peer.port];
  },
  handlePeerEvents(sock, peer) {
   var first = true;
   var handleOpen = function() {
    Module["websocket"].emit("open", sock.stream.fd);
    try {
     var queued = peer.dgram_send_queue.shift();
     while (queued) {
      peer.socket.send(queued);
      queued = peer.dgram_send_queue.shift();
     }
    } catch (e) {
     peer.socket.close();
    }
   };
   function handleMessage(data) {
    if (typeof data == "string") {
     var encoder = new TextEncoder;
     data = encoder.encode(data);
    } else  {
     assert(data.byteLength !== undefined);
     if (data.byteLength == 0) {
      return;
     }
     data = new Uint8Array(data);
    }
    var wasfirst = first;
    first = false;
    if (wasfirst && data.length === 10 && data[0] === 255 && data[1] === 255 && data[2] === 255 && data[3] === 255 && data[4] === "p".charCodeAt(0) && data[5] === "o".charCodeAt(0) && data[6] === "r".charCodeAt(0) && data[7] === "t".charCodeAt(0)) {
     var newport = ((data[8] << 8) | data[9]);
     SOCKFS.websocket_sock_ops.removePeer(sock, peer);
     peer.port = newport;
     SOCKFS.websocket_sock_ops.addPeer(sock, peer);
     return;
    }
    sock.recv_queue.push({
     addr: peer.addr,
     port: peer.port,
     data: data
    });
    Module["websocket"].emit("message", sock.stream.fd);
   }
   if (ENVIRONMENT_IS_NODE) {
    peer.socket.on("open", handleOpen);
    peer.socket.on("message", function(data, isBinary) {
     if (!isBinary) {
      return;
     }
     handleMessage((new Uint8Array(data)).buffer);
    });
    peer.socket.on("close", function() {
     Module["websocket"].emit("close", sock.stream.fd);
    });
    peer.socket.on("error", function(error) {
     sock.error = 14;
     Module["websocket"].emit("error", [ sock.stream.fd, sock.error, "ECONNREFUSED: Connection refused" ]);
    });
   } else {
    peer.socket.onopen = handleOpen;
    peer.socket.onclose = function() {
     Module["websocket"].emit("close", sock.stream.fd);
    };
    peer.socket.onmessage = function peer_socket_onmessage(event) {
     handleMessage(event.data);
    };
    peer.socket.onerror = function(error) {
     sock.error = 14;
     Module["websocket"].emit("error", [ sock.stream.fd, sock.error, "ECONNREFUSED: Connection refused" ]);
    };
   }
  },
  poll(sock) {
   if (sock.type === 1 && sock.server) {
    return sock.pending.length ? (64 | 1) : 0;
   }
   var mask = 0;
   var dest = sock.type === 1 ?  SOCKFS.websocket_sock_ops.getPeer(sock, sock.daddr, sock.dport) : null;
   if (sock.recv_queue.length || !dest ||  (dest && dest.socket.readyState === dest.socket.CLOSING) || (dest && dest.socket.readyState === dest.socket.CLOSED)) {
    mask |= (64 | 1);
   }
   if (!dest ||  (dest && dest.socket.readyState === dest.socket.OPEN)) {
    mask |= 4;
   }
   if ((dest && dest.socket.readyState === dest.socket.CLOSING) || (dest && dest.socket.readyState === dest.socket.CLOSED)) {
    mask |= 16;
   }
   return mask;
  },
  ioctl(sock, request, arg) {
   switch (request) {
   case 21531:
    var bytes = 0;
    if (sock.recv_queue.length) {
     bytes = sock.recv_queue[0].data.length;
    }
    GROWABLE_HEAP_I32()[((arg) >> 2)] = bytes;
    return 0;

   default:
    return 28;
   }
  },
  close(sock) {
   if (sock.server) {
    try {
     sock.server.close();
    } catch (e) {}
    sock.server = null;
   }
   var peers = Object.keys(sock.peers);
   for (var i = 0; i < peers.length; i++) {
    var peer = sock.peers[peers[i]];
    try {
     peer.socket.close();
    } catch (e) {}
    SOCKFS.websocket_sock_ops.removePeer(sock, peer);
   }
   return 0;
  },
  bind(sock, addr, port) {
   if (typeof sock.saddr != "undefined" || typeof sock.sport != "undefined") {
    throw new FS.ErrnoError(28);
   }
   sock.saddr = addr;
   sock.sport = port;
   if (sock.type === 2) {
    if (sock.server) {
     sock.server.close();
     sock.server = null;
    }
    try {
     sock.sock_ops.listen(sock, 0);
    } catch (e) {
     if (!(e.name === "ErrnoError")) throw e;
     if (e.errno !== 138) throw e;
    }
   }
  },
  connect(sock, addr, port) {
   if (sock.server) {
    throw new FS.ErrnoError(138);
   }
   if (typeof sock.daddr != "undefined" && typeof sock.dport != "undefined") {
    var dest = SOCKFS.websocket_sock_ops.getPeer(sock, sock.daddr, sock.dport);
    if (dest) {
     if (dest.socket.readyState === dest.socket.CONNECTING) {
      throw new FS.ErrnoError(7);
     } else {
      throw new FS.ErrnoError(30);
     }
    }
   }
   var peer = SOCKFS.websocket_sock_ops.createPeer(sock, addr, port);
   sock.daddr = peer.addr;
   sock.dport = peer.port;
   throw new FS.ErrnoError(26);
  },
  listen(sock, backlog) {
   if (!ENVIRONMENT_IS_NODE) {
    throw new FS.ErrnoError(138);
   }
  },
  accept(listensock) {
   if (!listensock.server || !listensock.pending.length) {
    throw new FS.ErrnoError(28);
   }
   var newsock = listensock.pending.shift();
   newsock.stream.flags = listensock.stream.flags;
   return newsock;
  },
  getname(sock, peer) {
   var addr, port;
   if (peer) {
    if (sock.daddr === undefined || sock.dport === undefined) {
     throw new FS.ErrnoError(53);
    }
    addr = sock.daddr;
    port = sock.dport;
   } else {
    addr = sock.saddr || 0;
    port = sock.sport || 0;
   }
   return {
    addr: addr,
    port: port
   };
  },
  sendmsg(sock, buffer, offset, length, addr, port) {
   if (sock.type === 2) {
    if (addr === undefined || port === undefined) {
     addr = sock.daddr;
     port = sock.dport;
    }
    if (addr === undefined || port === undefined) {
     throw new FS.ErrnoError(17);
    }
   } else {
    addr = sock.daddr;
    port = sock.dport;
   }
   var dest = SOCKFS.websocket_sock_ops.getPeer(sock, addr, port);
   if (sock.type === 1) {
    if (!dest || dest.socket.readyState === dest.socket.CLOSING || dest.socket.readyState === dest.socket.CLOSED) {
     throw new FS.ErrnoError(53);
    } else if (dest.socket.readyState === dest.socket.CONNECTING) {
     throw new FS.ErrnoError(6);
    }
   }
   if (ArrayBuffer.isView(buffer)) {
    offset += buffer.byteOffset;
    buffer = buffer.buffer;
   }
   var data;
   if (buffer instanceof SharedArrayBuffer) {
    data = new Uint8Array(new Uint8Array(buffer.slice(offset, offset + length))).buffer;
   } else {
    data = buffer.slice(offset, offset + length);
   }
   if (sock.type === 2) {
    if (!dest || dest.socket.readyState !== dest.socket.OPEN) {
     if (!dest || dest.socket.readyState === dest.socket.CLOSING || dest.socket.readyState === dest.socket.CLOSED) {
      dest = SOCKFS.websocket_sock_ops.createPeer(sock, addr, port);
     }
     dest.dgram_send_queue.push(data);
     return length;
    }
   }
   try {
    dest.socket.send(data);
    return length;
   } catch (e) {
    throw new FS.ErrnoError(28);
   }
  },
  recvmsg(sock, length) {
   if (sock.type === 1 && sock.server) {
    throw new FS.ErrnoError(53);
   }
   var queued = sock.recv_queue.shift();
   if (!queued) {
    if (sock.type === 1) {
     var dest = SOCKFS.websocket_sock_ops.getPeer(sock, sock.daddr, sock.dport);
     if (!dest) {
      throw new FS.ErrnoError(53);
     }
     if (dest.socket.readyState === dest.socket.CLOSING || dest.socket.readyState === dest.socket.CLOSED) {
      return null;
     }
     throw new FS.ErrnoError(6);
    }
    throw new FS.ErrnoError(6);
   }
   var queuedLength = queued.data.byteLength || queued.data.length;
   var queuedOffset = queued.data.byteOffset || 0;
   var queuedBuffer = queued.data.buffer || queued.data;
   var bytesRead = Math.min(length, queuedLength);
   var res = {
    buffer: new Uint8Array(queuedBuffer, queuedOffset, bytesRead),
    addr: queued.addr,
    port: queued.port
   };
   if (sock.type === 1 && bytesRead < queuedLength) {
    var bytesRemaining = queuedLength - bytesRead;
    queued.data = new Uint8Array(queuedBuffer, queuedOffset + bytesRead, bytesRemaining);
    sock.recv_queue.unshift(queued);
   }
   return res;
  }
 }
};

var getSocketFromFD = fd => {
 var socket = SOCKFS.getSocket(fd);
 if (!socket) throw new FS.ErrnoError(8);
 return socket;
};

var Sockets = {
 BUFFER_SIZE: 10240,
 MAX_BUFFER_SIZE: 10485760,
 nextFd: 1,
 fds: {},
 nextport: 1,
 maxport: 65535,
 peer: null,
 connections: {},
 portmap: {},
 localAddr: 4261412874,
 addrPool: [ 33554442, 50331658, 67108874, 83886090, 100663306, 117440522, 134217738, 150994954, 167772170, 184549386, 201326602, 218103818, 234881034 ]
};

var inetNtop4 = addr => (addr & 255) + "." + ((addr >> 8) & 255) + "." + ((addr >> 16) & 255) + "." + ((addr >> 24) & 255);

var inetNtop6 = ints => {
 var str = "";
 var word = 0;
 var longest = 0;
 var lastzero = 0;
 var zstart = 0;
 var len = 0;
 var i = 0;
 var parts = [ ints[0] & 65535, (ints[0] >> 16), ints[1] & 65535, (ints[1] >> 16), ints[2] & 65535, (ints[2] >> 16), ints[3] & 65535, (ints[3] >> 16) ];
 var hasipv4 = true;
 var v4part = "";
 for (i = 0; i < 5; i++) {
  if (parts[i] !== 0) {
   hasipv4 = false;
   break;
  }
 }
 if (hasipv4) {
  v4part = inetNtop4(parts[6] | (parts[7] << 16));
  if (parts[5] === -1) {
   str = "::ffff:";
   str += v4part;
   return str;
  }
  if (parts[5] === 0) {
   str = "::";
   if (v4part === "0.0.0.0") v4part = "";
   if (v4part === "0.0.0.1") v4part = "1";
   str += v4part;
   return str;
  }
 }
 for (word = 0; word < 8; word++) {
  if (parts[word] === 0) {
   if (word - lastzero > 1) {
    len = 0;
   }
   lastzero = word;
   len++;
  }
  if (len > longest) {
   longest = len;
   zstart = word - longest + 1;
  }
 }
 for (word = 0; word < 8; word++) {
  if (longest > 1) {
   if (parts[word] === 0 && word >= zstart && word < (zstart + longest)) {
    if (word === zstart) {
     str += ":";
     if (zstart === 0) str += ":";
    }
    continue;
   }
  }
  str += Number(_ntohs(parts[word] & 65535)).toString(16);
  str += word < 7 ? ":" : "";
 }
 return str;
};

var readSockaddr = (sa, salen) => {
 var family = GROWABLE_HEAP_I16()[((sa) >> 1)];
 var port = _ntohs(GROWABLE_HEAP_U16()[(((sa) + (2)) >> 1)]);
 var addr;
 switch (family) {
 case 2:
  if (salen !== 16) {
   return {
    errno: 28
   };
  }
  addr = GROWABLE_HEAP_I32()[(((sa) + (4)) >> 2)];
  addr = inetNtop4(addr);
  break;

 case 10:
  if (salen !== 28) {
   return {
    errno: 28
   };
  }
  addr = [ GROWABLE_HEAP_I32()[(((sa) + (8)) >> 2)], GROWABLE_HEAP_I32()[(((sa) + (12)) >> 2)], GROWABLE_HEAP_I32()[(((sa) + (16)) >> 2)], GROWABLE_HEAP_I32()[(((sa) + (20)) >> 2)] ];
  addr = inetNtop6(addr);
  break;

 default:
  return {
   errno: 5
  };
 }
 return {
  family: family,
  addr: addr,
  port: port
 };
};

var inetPton4 = str => {
 var b = str.split(".");
 for (var i = 0; i < 4; i++) {
  var tmp = Number(b[i]);
  if (isNaN(tmp)) return null;
  b[i] = tmp;
 }
 return (b[0] | (b[1] << 8) | (b[2] << 16) | (b[3] << 24)) >>> 0;
};

/** @suppress {checkTypes} */ var jstoi_q = str => parseInt(str);

var inetPton6 = str => {
 var words;
 var w, offset, z, i;
 /* http://home.deds.nl/~aeron/regex/ */ var valid6regx = /^((?=.*::)(?!.*::.+::)(::)?([\dA-F]{1,4}:(:|\b)|){5}|([\dA-F]{1,4}:){6})((([\dA-F]{1,4}((?!\3)::|:\b|$))|(?!\2\3)){2}|(((2[0-4]|1\d|[1-9])?\d|25[0-5])\.?\b){4})$/i;
 var parts = [];
 if (!valid6regx.test(str)) {
  return null;
 }
 if (str === "::") {
  return [ 0, 0, 0, 0, 0, 0, 0, 0 ];
 }
 if (str.startsWith("::")) {
  str = str.replace("::", "Z:");
 } else  {
  str = str.replace("::", ":Z:");
 }
 if (str.indexOf(".") > 0) {
  str = str.replace(new RegExp("[.]", "g"), ":");
  words = str.split(":");
  words[words.length - 4] = jstoi_q(words[words.length - 4]) + jstoi_q(words[words.length - 3]) * 256;
  words[words.length - 3] = jstoi_q(words[words.length - 2]) + jstoi_q(words[words.length - 1]) * 256;
  words = words.slice(0, words.length - 2);
 } else {
  words = str.split(":");
 }
 offset = 0;
 z = 0;
 for (w = 0; w < words.length; w++) {
  if (typeof words[w] == "string") {
   if (words[w] === "Z") {
    for (z = 0; z < (8 - words.length + 1); z++) {
     parts[w + z] = 0;
    }
    offset = z - 1;
   } else {
    parts[w + offset] = _htons(parseInt(words[w], 16));
   }
  } else {
   parts[w + offset] = words[w];
  }
 }
 return [ (parts[1] << 16) | parts[0], (parts[3] << 16) | parts[2], (parts[5] << 16) | parts[4], (parts[7] << 16) | parts[6] ];
};

var DNS = {
 address_map: {
  id: 1,
  addrs: {},
  names: {}
 },
 lookup_name(name) {
  var res = inetPton4(name);
  if (res !== null) {
   return name;
  }
  res = inetPton6(name);
  if (res !== null) {
   return name;
  }
  var addr;
  if (DNS.address_map.addrs[name]) {
   addr = DNS.address_map.addrs[name];
  } else {
   var id = DNS.address_map.id++;
   assert(id < 65535, "exceeded max address mappings of 65535");
   addr = "172.29." + (id & 255) + "." + (id & 65280);
   DNS.address_map.names[addr] = name;
   DNS.address_map.addrs[name] = addr;
  }
  return addr;
 },
 lookup_addr(addr) {
  if (DNS.address_map.names[addr]) {
   return DNS.address_map.names[addr];
  }
  return null;
 }
};

/** @param {boolean=} allowNull */ var getSocketAddress = (addrp, addrlen, allowNull) => {
 if (allowNull && addrp === 0) return null;
 var info = readSockaddr(addrp, addrlen);
 if (info.errno) throw new FS.ErrnoError(info.errno);
 info.addr = DNS.lookup_addr(info.addr) || info.addr;
 return info;
};

function ___syscall_connect(fd, addr, addrlen, d1, d2, d3) {
 if (ENVIRONMENT_IS_PTHREAD) return proxyToMainThread(5, 0, 1, fd, addr, addrlen, d1, d2, d3);
 try {
  var sock = getSocketFromFD(fd);
  var info = getSocketAddress(addr, addrlen);
  sock.sock_ops.connect(sock, info.addr, info.port);
  return 0;
 } catch (e) {
  if (typeof FS == "undefined" || !(e.name === "ErrnoError")) throw e;
  return -e.errno;
 }
}

function ___syscall_faccessat(dirfd, path, amode, flags) {
 if (ENVIRONMENT_IS_PTHREAD) return proxyToMainThread(6, 0, 1, dirfd, path, amode, flags);
 try {
  path = SYSCALLS.getStr(path);
  path = SYSCALLS.calculateAt(dirfd, path);
  if (amode & ~7) {
   return -28;
  }
  var lookup = FS.lookupPath(path, {
   follow: true
  });
  var node = lookup.node;
  if (!node) {
   return -44;
  }
  var perms = "";
  if (amode & 4) perms += "r";
  if (amode & 2) perms += "w";
  if (amode & 1) perms += "x";
  if (perms && /* otherwise, they've just passed F_OK */ FS.nodePermissions(node, perms)) {
   return -2;
  }
  return 0;
 } catch (e) {
  if (typeof FS == "undefined" || !(e.name === "ErrnoError")) throw e;
  return -e.errno;
 }
}

function ___syscall_fadvise64(fd, offset, len, advice) {
 if (ENVIRONMENT_IS_PTHREAD) return proxyToMainThread(7, 0, 0, fd, offset, len, advice);
 return 0;
}

function ___syscall_fchmod(fd, mode) {
 if (ENVIRONMENT_IS_PTHREAD) return proxyToMainThread(8, 0, 1, fd, mode);
 try {
  FS.fchmod(fd, mode);
  return 0;
 } catch (e) {
  if (typeof FS == "undefined" || !(e.name === "ErrnoError")) throw e;
  return -e.errno;
 }
}

function ___syscall_fcntl64(fd, cmd, varargs) {
 if (ENVIRONMENT_IS_PTHREAD) return proxyToMainThread(9, 0, 1, fd, cmd, varargs);
 SYSCALLS.varargs = varargs;
 try {
  var stream = SYSCALLS.getStreamFromFD(fd);
  switch (cmd) {
  case 0:
   {
    var arg = SYSCALLS.get();
    if (arg < 0) {
     return -28;
    }
    while (FS.streams[arg]) {
     arg++;
    }
    var newStream;
    newStream = FS.dupStream(stream, arg);
    return newStream.fd;
   }

  case 1:
  case 2:
   return 0;

  case 3:
   return stream.flags;

  case 4:
   {
    var arg = SYSCALLS.get();
    stream.flags |= arg;
    return 0;
   }

  case 12:
   {
    var arg = SYSCALLS.getp();
    var offset = 0;
    GROWABLE_HEAP_I16()[(((arg) + (offset)) >> 1)] = 2;
    return 0;
   }

  case 13:
  case 14:
   return 0;
  }
  return -28;
 } catch (e) {
  if (typeof FS == "undefined" || !(e.name === "ErrnoError")) throw e;
  return -e.errno;
 }
}

function ___syscall_fstat64(fd, buf) {
 if (ENVIRONMENT_IS_PTHREAD) return proxyToMainThread(10, 0, 1, fd, buf);
 try {
  var stream = SYSCALLS.getStreamFromFD(fd);
  return SYSCALLS.doStat(FS.stat, stream.path, buf);
 } catch (e) {
  if (typeof FS == "undefined" || !(e.name === "ErrnoError")) throw e;
  return -e.errno;
 }
}

function ___syscall_statfs64(path, size, buf) {
 if (ENVIRONMENT_IS_PTHREAD) return proxyToMainThread(12, 0, 1, path, size, buf);
 try {
  path = SYSCALLS.getStr(path);
  GROWABLE_HEAP_I32()[(((buf) + (4)) >> 2)] = 4096;
  GROWABLE_HEAP_I32()[(((buf) + (40)) >> 2)] = 4096;
  GROWABLE_HEAP_I32()[(((buf) + (8)) >> 2)] = 1e6;
  GROWABLE_HEAP_I32()[(((buf) + (12)) >> 2)] = 5e5;
  GROWABLE_HEAP_I32()[(((buf) + (16)) >> 2)] = 5e5;
  GROWABLE_HEAP_I32()[(((buf) + (20)) >> 2)] = FS.nextInode;
  GROWABLE_HEAP_I32()[(((buf) + (24)) >> 2)] = 1e6;
  GROWABLE_HEAP_I32()[(((buf) + (28)) >> 2)] = 42;
  GROWABLE_HEAP_I32()[(((buf) + (44)) >> 2)] = 2;
  GROWABLE_HEAP_I32()[(((buf) + (36)) >> 2)] = 255;
  return 0;
 } catch (e) {
  if (typeof FS == "undefined" || !(e.name === "ErrnoError")) throw e;
  return -e.errno;
 }
}

function ___syscall_fstatfs64(fd, size, buf) {
 if (ENVIRONMENT_IS_PTHREAD) return proxyToMainThread(11, 0, 1, fd, size, buf);
 try {
  var stream = SYSCALLS.getStreamFromFD(fd);
  return ___syscall_statfs64(0, size, buf);
 } catch (e) {
  if (typeof FS == "undefined" || !(e.name === "ErrnoError")) throw e;
  return -e.errno;
 }
}

function ___syscall_ftruncate64(fd, length) {
 if (ENVIRONMENT_IS_PTHREAD) return proxyToMainThread(13, 0, 1, fd, length);
 length = bigintToI53Checked(length);
 try {
  if (isNaN(length)) return 61;
  FS.ftruncate(fd, length);
  return 0;
 } catch (e) {
  if (typeof FS == "undefined" || !(e.name === "ErrnoError")) throw e;
  return -e.errno;
 }
}

var stringToUTF8 = (str, outPtr, maxBytesToWrite) => stringToUTF8Array(str, GROWABLE_HEAP_U8(), outPtr, maxBytesToWrite);

function ___syscall_getcwd(buf, size) {
 if (ENVIRONMENT_IS_PTHREAD) return proxyToMainThread(14, 0, 1, buf, size);
 try {
  if (size === 0) return -28;
  var cwd = FS.cwd();
  var cwdLengthInBytes = lengthBytesUTF8(cwd) + 1;
  if (size < cwdLengthInBytes) return -68;
  stringToUTF8(cwd, buf, size);
  return cwdLengthInBytes;
 } catch (e) {
  if (typeof FS == "undefined" || !(e.name === "ErrnoError")) throw e;
  return -e.errno;
 }
}

function ___syscall_getdents64(fd, dirp, count) {
 if (ENVIRONMENT_IS_PTHREAD) return proxyToMainThread(15, 0, 1, fd, dirp, count);
 try {
  var stream = SYSCALLS.getStreamFromFD(fd);
  stream.getdents ||= FS.readdir(stream.path);
  var struct_size = 280;
  var pos = 0;
  var off = FS.llseek(stream, 0, 1);
  var idx = Math.floor(off / struct_size);
  while (idx < stream.getdents.length && pos + struct_size <= count) {
   var id;
   var type;
   var name = stream.getdents[idx];
   if (name === ".") {
    id = stream.node.id;
    type = 4;
   } else if (name === "..") {
    var lookup = FS.lookupPath(stream.path, {
     parent: true
    });
    id = lookup.node.id;
    type = 4;
   } else {
    var child = FS.lookupNode(stream.node, name);
    id = child.id;
    type = FS.isChrdev(child.mode) ? 2 :  FS.isDir(child.mode) ? 4 :  FS.isLink(child.mode) ? 10 :  8;
   }
   HEAP64[((dirp + pos) >> 3)] = BigInt(id);
   HEAP64[(((dirp + pos) + (8)) >> 3)] = BigInt((idx + 1) * struct_size);
   GROWABLE_HEAP_I16()[(((dirp + pos) + (16)) >> 1)] = 280;
   GROWABLE_HEAP_I8()[(dirp + pos) + (18)] = type;
   stringToUTF8(name, dirp + pos + 19, 256);
   pos += struct_size;
   idx += 1;
  }
  FS.llseek(stream, idx * struct_size, 0);
  return pos;
 } catch (e) {
  if (typeof FS == "undefined" || !(e.name === "ErrnoError")) throw e;
  return -e.errno;
 }
}

function ___syscall_ioctl(fd, op, varargs) {
 if (ENVIRONMENT_IS_PTHREAD) return proxyToMainThread(16, 0, 1, fd, op, varargs);
 SYSCALLS.varargs = varargs;
 try {
  var stream = SYSCALLS.getStreamFromFD(fd);
  switch (op) {
  case 21509:
   {
    if (!stream.tty) return -59;
    return 0;
   }

  case 21505:
   {
    if (!stream.tty) return -59;
    if (stream.tty.ops.ioctl_tcgets) {
     var termios = stream.tty.ops.ioctl_tcgets(stream);
     var argp = SYSCALLS.getp();
     GROWABLE_HEAP_I32()[((argp) >> 2)] = termios.c_iflag || 0;
     GROWABLE_HEAP_I32()[(((argp) + (4)) >> 2)] = termios.c_oflag || 0;
     GROWABLE_HEAP_I32()[(((argp) + (8)) >> 2)] = termios.c_cflag || 0;
     GROWABLE_HEAP_I32()[(((argp) + (12)) >> 2)] = termios.c_lflag || 0;
     for (var i = 0; i < 32; i++) {
      GROWABLE_HEAP_I8()[(argp + i) + (17)] = termios.c_cc[i] || 0;
     }
     return 0;
    }
    return 0;
   }

  case 21510:
  case 21511:
  case 21512:
   {
    if (!stream.tty) return -59;
    return 0;
   }

  case 21506:
  case 21507:
  case 21508:
   {
    if (!stream.tty) return -59;
    if (stream.tty.ops.ioctl_tcsets) {
     var argp = SYSCALLS.getp();
     var c_iflag = GROWABLE_HEAP_I32()[((argp) >> 2)];
     var c_oflag = GROWABLE_HEAP_I32()[(((argp) + (4)) >> 2)];
     var c_cflag = GROWABLE_HEAP_I32()[(((argp) + (8)) >> 2)];
     var c_lflag = GROWABLE_HEAP_I32()[(((argp) + (12)) >> 2)];
     var c_cc = [];
     for (var i = 0; i < 32; i++) {
      c_cc.push(GROWABLE_HEAP_I8()[(argp + i) + (17)]);
     }
     return stream.tty.ops.ioctl_tcsets(stream.tty, op, {
      c_iflag: c_iflag,
      c_oflag: c_oflag,
      c_cflag: c_cflag,
      c_lflag: c_lflag,
      c_cc: c_cc
     });
    }
    return 0;
   }

  case 21519:
   {
    if (!stream.tty) return -59;
    var argp = SYSCALLS.getp();
    GROWABLE_HEAP_I32()[((argp) >> 2)] = 0;
    return 0;
   }

  case 21520:
   {
    if (!stream.tty) return -59;
    return -28;
   }

  case 21531:
   {
    var argp = SYSCALLS.getp();
    return FS.ioctl(stream, op, argp);
   }

  case 21523:
   {
    if (!stream.tty) return -59;
    if (stream.tty.ops.ioctl_tiocgwinsz) {
     var winsize = stream.tty.ops.ioctl_tiocgwinsz(stream.tty);
     var argp = SYSCALLS.getp();
     GROWABLE_HEAP_I16()[((argp) >> 1)] = winsize[0];
     GROWABLE_HEAP_I16()[(((argp) + (2)) >> 1)] = winsize[1];
    }
    return 0;
   }

  case 21524:
   {
    if (!stream.tty) return -59;
    return 0;
   }

  case 21515:
   {
    if (!stream.tty) return -59;
    return 0;
   }

  default:
   return -28;
  }
 }  catch (e) {
  if (typeof FS == "undefined" || !(e.name === "ErrnoError")) throw e;
  return -e.errno;
 }
}

function ___syscall_lstat64(path, buf) {
 if (ENVIRONMENT_IS_PTHREAD) return proxyToMainThread(17, 0, 1, path, buf);
 try {
  path = SYSCALLS.getStr(path);
  return SYSCALLS.doStat(FS.lstat, path, buf);
 } catch (e) {
  if (typeof FS == "undefined" || !(e.name === "ErrnoError")) throw e;
  return -e.errno;
 }
}

function ___syscall_mkdirat(dirfd, path, mode) {
 if (ENVIRONMENT_IS_PTHREAD) return proxyToMainThread(18, 0, 1, dirfd, path, mode);
 try {
  path = SYSCALLS.getStr(path);
  path = SYSCALLS.calculateAt(dirfd, path);
  path = PATH.normalize(path);
  if (path[path.length - 1] === "/") path = path.substr(0, path.length - 1);
  FS.mkdir(path, mode, 0);
  return 0;
 } catch (e) {
  if (typeof FS == "undefined" || !(e.name === "ErrnoError")) throw e;
  return -e.errno;
 }
}

function ___syscall_mknodat(dirfd, path, mode, dev) {
 if (ENVIRONMENT_IS_PTHREAD) return proxyToMainThread(19, 0, 1, dirfd, path, mode, dev);
 try {
  path = SYSCALLS.getStr(path);
  path = SYSCALLS.calculateAt(dirfd, path);
  switch (mode & 61440) {
  case 32768:
  case 8192:
  case 24576:
  case 4096:
  case 49152:
   break;

  default:
   return -28;
  }
  FS.mknod(path, mode, dev);
  return 0;
 } catch (e) {
  if (typeof FS == "undefined" || !(e.name === "ErrnoError")) throw e;
  return -e.errno;
 }
}

function ___syscall_newfstatat(dirfd, path, buf, flags) {
 if (ENVIRONMENT_IS_PTHREAD) return proxyToMainThread(20, 0, 1, dirfd, path, buf, flags);
 try {
  path = SYSCALLS.getStr(path);
  var nofollow = flags & 256;
  var allowEmpty = flags & 4096;
  flags = flags & (~6400);
  path = SYSCALLS.calculateAt(dirfd, path, allowEmpty);
  return SYSCALLS.doStat(nofollow ? FS.lstat : FS.stat, path, buf);
 } catch (e) {
  if (typeof FS == "undefined" || !(e.name === "ErrnoError")) throw e;
  return -e.errno;
 }
}

function ___syscall_openat(dirfd, path, flags, varargs) {
 if (ENVIRONMENT_IS_PTHREAD) return proxyToMainThread(21, 0, 1, dirfd, path, flags, varargs);
 SYSCALLS.varargs = varargs;
 try {
  path = SYSCALLS.getStr(path);
  path = SYSCALLS.calculateAt(dirfd, path);
  var mode = varargs ? SYSCALLS.get() : 0;
  return FS.open(path, flags, mode).fd;
 } catch (e) {
  if (typeof FS == "undefined" || !(e.name === "ErrnoError")) throw e;
  return -e.errno;
 }
}

function ___syscall_readlinkat(dirfd, path, buf, bufsize) {
 if (ENVIRONMENT_IS_PTHREAD) return proxyToMainThread(22, 0, 1, dirfd, path, buf, bufsize);
 try {
  path = SYSCALLS.getStr(path);
  path = SYSCALLS.calculateAt(dirfd, path);
  if (bufsize <= 0) return -28;
  var ret = FS.readlink(path);
  var len = Math.min(bufsize, lengthBytesUTF8(ret));
  var endChar = GROWABLE_HEAP_I8()[buf + len];
  stringToUTF8(ret, buf, bufsize + 1);
  GROWABLE_HEAP_I8()[buf + len] = endChar;
  return len;
 } catch (e) {
  if (typeof FS == "undefined" || !(e.name === "ErrnoError")) throw e;
  return -e.errno;
 }
}

function ___syscall_renameat(olddirfd, oldpath, newdirfd, newpath) {
 if (ENVIRONMENT_IS_PTHREAD) return proxyToMainThread(23, 0, 1, olddirfd, oldpath, newdirfd, newpath);
 try {
  oldpath = SYSCALLS.getStr(oldpath);
  newpath = SYSCALLS.getStr(newpath);
  oldpath = SYSCALLS.calculateAt(olddirfd, oldpath);
  newpath = SYSCALLS.calculateAt(newdirfd, newpath);
  FS.rename(oldpath, newpath);
  return 0;
 } catch (e) {
  if (typeof FS == "undefined" || !(e.name === "ErrnoError")) throw e;
  return -e.errno;
 }
}

function ___syscall_rmdir(path) {
 if (ENVIRONMENT_IS_PTHREAD) return proxyToMainThread(24, 0, 1, path);
 try {
  path = SYSCALLS.getStr(path);
  FS.rmdir(path);
  return 0;
 } catch (e) {
  if (typeof FS == "undefined" || !(e.name === "ErrnoError")) throw e;
  return -e.errno;
 }
}

function ___syscall_sendto(fd, message, length, flags, addr, addr_len) {
 if (ENVIRONMENT_IS_PTHREAD) return proxyToMainThread(25, 0, 1, fd, message, length, flags, addr, addr_len);
 try {
  var sock = getSocketFromFD(fd);
  var dest = getSocketAddress(addr, addr_len, true);
  if (!dest) {
   return FS.write(sock.stream, GROWABLE_HEAP_I8(), message, length);
  }
  return sock.sock_ops.sendmsg(sock, GROWABLE_HEAP_I8(), message, length, dest.addr, dest.port);
 } catch (e) {
  if (typeof FS == "undefined" || !(e.name === "ErrnoError")) throw e;
  return -e.errno;
 }
}

function ___syscall_socket(domain, type, protocol) {
 if (ENVIRONMENT_IS_PTHREAD) return proxyToMainThread(26, 0, 1, domain, type, protocol);
 try {
  var sock = SOCKFS.createSocket(domain, type, protocol);
  return sock.stream.fd;
 } catch (e) {
  if (typeof FS == "undefined" || !(e.name === "ErrnoError")) throw e;
  return -e.errno;
 }
}

function ___syscall_stat64(path, buf) {
 if (ENVIRONMENT_IS_PTHREAD) return proxyToMainThread(27, 0, 1, path, buf);
 try {
  path = SYSCALLS.getStr(path);
  return SYSCALLS.doStat(FS.stat, path, buf);
 } catch (e) {
  if (typeof FS == "undefined" || !(e.name === "ErrnoError")) throw e;
  return -e.errno;
 }
}

function ___syscall_symlink(target, linkpath) {
 if (ENVIRONMENT_IS_PTHREAD) return proxyToMainThread(28, 0, 1, target, linkpath);
 try {
  target = SYSCALLS.getStr(target);
  linkpath = SYSCALLS.getStr(linkpath);
  FS.symlink(target, linkpath);
  return 0;
 } catch (e) {
  if (typeof FS == "undefined" || !(e.name === "ErrnoError")) throw e;
  return -e.errno;
 }
}

function ___syscall_unlinkat(dirfd, path, flags) {
 if (ENVIRONMENT_IS_PTHREAD) return proxyToMainThread(29, 0, 1, dirfd, path, flags);
 try {
  path = SYSCALLS.getStr(path);
  path = SYSCALLS.calculateAt(dirfd, path);
  if (flags === 0) {
   FS.unlink(path);
  } else if (flags === 512) {
   FS.rmdir(path);
  } else {
   abort("Invalid flags passed to unlinkat");
  }
  return 0;
 } catch (e) {
  if (typeof FS == "undefined" || !(e.name === "ErrnoError")) throw e;
  return -e.errno;
 }
}

var readI53FromI64 = ptr => GROWABLE_HEAP_U32()[((ptr) >> 2)] + GROWABLE_HEAP_I32()[(((ptr) + (4)) >> 2)] * 4294967296;

function ___syscall_utimensat(dirfd, path, times, flags) {
 if (ENVIRONMENT_IS_PTHREAD) return proxyToMainThread(30, 0, 1, dirfd, path, times, flags);
 try {
  path = SYSCALLS.getStr(path);
  path = SYSCALLS.calculateAt(dirfd, path, true);
  if (!times) {
   var atime = Date.now();
   var mtime = atime;
  } else {
   var seconds = readI53FromI64(times);
   var nanoseconds = GROWABLE_HEAP_I32()[(((times) + (8)) >> 2)];
   atime = (seconds * 1e3) + (nanoseconds / (1e3 * 1e3));
   times += 16;
   seconds = readI53FromI64(times);
   nanoseconds = GROWABLE_HEAP_I32()[(((times) + (8)) >> 2)];
   mtime = (seconds * 1e3) + (nanoseconds / (1e3 * 1e3));
  }
  FS.utime(path, atime, mtime);
  return 0;
 } catch (e) {
  if (typeof FS == "undefined" || !(e.name === "ErrnoError")) throw e;
  return -e.errno;
 }
}

var nowIsMonotonic = 1;

var __emscripten_get_now_is_monotonic = () => nowIsMonotonic;

var maybeExit = () => {
 if (runtimeExited) {
  return;
 }
 if (!keepRuntimeAlive()) {
  try {
   if (ENVIRONMENT_IS_PTHREAD) __emscripten_thread_exit(EXITSTATUS); else _exit(EXITSTATUS);
  } catch (e) {
   handleException(e);
  }
 }
};

var callUserCallback = func => {
 if (runtimeExited || ABORT) {
  return;
 }
 try {
  func();
  maybeExit();
 } catch (e) {
  handleException(e);
 }
};

var __emscripten_thread_mailbox_await = pthread_ptr => {
 if (typeof Atomics.waitAsync === "function") {
  var wait = Atomics.waitAsync(GROWABLE_HEAP_I32(), ((pthread_ptr) >> 2), pthread_ptr);
  wait.value.then(checkMailbox);
  var waitingAsync = pthread_ptr + 128;
  Atomics.store(GROWABLE_HEAP_I32(), ((waitingAsync) >> 2), 1);
 }
};

Module["__emscripten_thread_mailbox_await"] = __emscripten_thread_mailbox_await;

var checkMailbox = () => {
 var pthread_ptr = _pthread_self();
 if (pthread_ptr) {
  __emscripten_thread_mailbox_await(pthread_ptr);
  callUserCallback(__emscripten_check_mailbox);
 }
};

Module["checkMailbox"] = checkMailbox;

var __emscripten_notify_mailbox_postmessage = (targetThreadId, currThreadId, mainThreadId) => {
 if (targetThreadId == currThreadId) {
  setTimeout(checkMailbox);
 } else if (ENVIRONMENT_IS_PTHREAD) {
  postMessage({
   "targetThread": targetThreadId,
   "cmd": "checkMailbox"
  });
 } else {
  var worker = PThread.pthreads[targetThreadId];
  if (!worker) {
   return;
  }
  worker.postMessage({
   "cmd": "checkMailbox"
  });
 }
};

var webgl_enable_ANGLE_instanced_arrays = ctx => {
 var ext = ctx.getExtension("ANGLE_instanced_arrays");
 if (ext) {
  ctx["vertexAttribDivisor"] = (index, divisor) => ext["vertexAttribDivisorANGLE"](index, divisor);
  ctx["drawArraysInstanced"] = (mode, first, count, primcount) => ext["drawArraysInstancedANGLE"](mode, first, count, primcount);
  ctx["drawElementsInstanced"] = (mode, count, type, indices, primcount) => ext["drawElementsInstancedANGLE"](mode, count, type, indices, primcount);
  return 1;
 }
};

var webgl_enable_OES_vertex_array_object = ctx => {
 var ext = ctx.getExtension("OES_vertex_array_object");
 if (ext) {
  ctx["createVertexArray"] = () => ext["createVertexArrayOES"]();
  ctx["deleteVertexArray"] = vao => ext["deleteVertexArrayOES"](vao);
  ctx["bindVertexArray"] = vao => ext["bindVertexArrayOES"](vao);
  ctx["isVertexArray"] = vao => ext["isVertexArrayOES"](vao);
  return 1;
 }
};

var webgl_enable_WEBGL_draw_buffers = ctx => {
 var ext = ctx.getExtension("WEBGL_draw_buffers");
 if (ext) {
  ctx["drawBuffers"] = (n, bufs) => ext["drawBuffersWEBGL"](n, bufs);
  return 1;
 }
};

var webgl_enable_WEBGL_draw_instanced_base_vertex_base_instance = ctx =>  !!(ctx.dibvbi = ctx.getExtension("WEBGL_draw_instanced_base_vertex_base_instance"));

var webgl_enable_WEBGL_multi_draw_instanced_base_vertex_base_instance = ctx => !!(ctx.mdibvbi = ctx.getExtension("WEBGL_multi_draw_instanced_base_vertex_base_instance"));

var webgl_enable_WEBGL_multi_draw = ctx => !!(ctx.multiDrawWebgl = ctx.getExtension("WEBGL_multi_draw"));

var getEmscriptenSupportedExtensions = ctx => {
 var supportedExtensions = [  "ANGLE_instanced_arrays", "EXT_blend_minmax", "EXT_disjoint_timer_query", "EXT_frag_depth", "EXT_shader_texture_lod", "EXT_sRGB", "OES_element_index_uint", "OES_fbo_render_mipmap", "OES_standard_derivatives", "OES_texture_float", "OES_texture_half_float", "OES_texture_half_float_linear", "OES_vertex_array_object", "WEBGL_color_buffer_float", "WEBGL_depth_texture", "WEBGL_draw_buffers",  "EXT_color_buffer_float", "EXT_conservative_depth", "EXT_disjoint_timer_query_webgl2", "EXT_texture_norm16", "NV_shader_noperspective_interpolation", "WEBGL_clip_cull_distance",  "EXT_color_buffer_half_float", "EXT_depth_clamp", "EXT_float_blend", "EXT_texture_compression_bptc", "EXT_texture_compression_rgtc", "EXT_texture_filter_anisotropic", "KHR_parallel_shader_compile", "OES_texture_float_linear", "WEBGL_blend_func_extended", "WEBGL_compressed_texture_astc", "WEBGL_compressed_texture_etc", "WEBGL_compressed_texture_etc1", "WEBGL_compressed_texture_s3tc", "WEBGL_compressed_texture_s3tc_srgb", "WEBGL_debug_renderer_info", "WEBGL_debug_shaders", "WEBGL_lose_context", "WEBGL_multi_draw" ];
 return (ctx.getSupportedExtensions() || []).filter(ext => supportedExtensions.includes(ext));
};

var GL = {
 counter: 1,
 buffers: [],
 programs: [],
 framebuffers: [],
 renderbuffers: [],
 textures: [],
 shaders: [],
 vaos: [],
 contexts: {},
 offscreenCanvases: {},
 queries: [],
 samplers: [],
 transformFeedbacks: [],
 syncs: [],
 stringCache: {},
 stringiCache: {},
 unpackAlignment: 4,
 recordError: errorCode => {
  if (!GL.lastError) {
   GL.lastError = errorCode;
  }
 },
 getNewId: table => {
  var ret = GL.counter++;
  for (var i = table.length; i < ret; i++) {
   table[i] = null;
  }
  return ret;
 },
 genObject: (n, buffers, createFunction, objectTable) => {
  for (var i = 0; i < n; i++) {
   var buffer = GLctx[createFunction]();
   var id = buffer && GL.getNewId(objectTable);
   if (buffer) {
    buffer.name = id;
    objectTable[id] = buffer;
   } else {
    GL.recordError(1282);
   }
   GROWABLE_HEAP_I32()[(((buffers) + (i * 4)) >> 2)] = id;
  }
 },
 getSource: (shader, count, string, length) => {
  var source = "";
  for (var i = 0; i < count; ++i) {
   var len = length ? GROWABLE_HEAP_U32()[(((length) + (i * 4)) >> 2)] : undefined;
   source += UTF8ToString(GROWABLE_HEAP_U32()[(((string) + (i * 4)) >> 2)], len);
  }
  return source;
 },
 createContext: (/** @type {HTMLCanvasElement} */ canvas, webGLContextAttributes) => {
  if (webGLContextAttributes.renderViaOffscreenBackBuffer) webGLContextAttributes["preserveDrawingBuffer"] = true;
  var ctx = (webGLContextAttributes.majorVersion > 1) ? canvas.getContext("webgl2", webGLContextAttributes) : (canvas.getContext("webgl", webGLContextAttributes));
  if (!ctx) return 0;
  var handle = GL.registerContext(ctx, webGLContextAttributes);
  return handle;
 },
 enableOffscreenFramebufferAttributes: webGLContextAttributes => {
  webGLContextAttributes.renderViaOffscreenBackBuffer = true;
  webGLContextAttributes.preserveDrawingBuffer = true;
 },
 createOffscreenFramebuffer: context => {
  var gl = context.GLctx;
  var fbo = gl.createFramebuffer();
  gl.bindFramebuffer(36160, /*GL_FRAMEBUFFER*/ fbo);
  context.defaultFbo = fbo;
  context.defaultFboForbidBlitFramebuffer = false;
  if (gl.getContextAttributes().antialias) {
   context.defaultFboForbidBlitFramebuffer = true;
  }
  context.defaultColorTarget = gl.createTexture();
  context.defaultDepthTarget = gl.createRenderbuffer();
  GL.resizeOffscreenFramebuffer(context);
  gl.bindTexture(3553, /*GL_TEXTURE_2D*/ context.defaultColorTarget);
  gl.texParameteri(3553, /*GL_TEXTURE_2D*/ 10241, /*GL_TEXTURE_MIN_FILTER*/ 9728);
  /*GL_NEAREST*/ gl.texParameteri(3553, /*GL_TEXTURE_2D*/ 10240, /*GL_TEXTURE_MAG_FILTER*/ 9728);
  /*GL_NEAREST*/ gl.texParameteri(3553, /*GL_TEXTURE_2D*/ 10242, /*GL_TEXTURE_WRAP_S*/ 33071);
  /*GL_CLAMP_TO_EDGE*/ gl.texParameteri(3553, /*GL_TEXTURE_2D*/ 10243, /*GL_TEXTURE_WRAP_T*/ 33071);
  /*GL_CLAMP_TO_EDGE*/ gl.texImage2D(3553, /*GL_TEXTURE_2D*/ 0, 6408, /*GL_RGBA*/ gl.canvas.width, gl.canvas.height, 0, 6408, /*GL_RGBA*/ 5121, /*GL_UNSIGNED_BYTE*/ null);
  gl.framebufferTexture2D(36160, /*GL_FRAMEBUFFER*/ 36064, /*GL_COLOR_ATTACHMENT0*/ 3553, /*GL_TEXTURE_2D*/ context.defaultColorTarget, 0);
  gl.bindTexture(3553, /*GL_TEXTURE_2D*/ null);
  var depthTarget = gl.createRenderbuffer();
  gl.bindRenderbuffer(36161, /*GL_RENDERBUFFER*/ context.defaultDepthTarget);
  gl.renderbufferStorage(36161, /*GL_RENDERBUFFER*/ 33189, /*GL_DEPTH_COMPONENT16*/ gl.canvas.width, gl.canvas.height);
  gl.framebufferRenderbuffer(36160, /*GL_FRAMEBUFFER*/ 36096, /*GL_DEPTH_ATTACHMENT*/ 36161, /*GL_RENDERBUFFER*/ context.defaultDepthTarget);
  gl.bindRenderbuffer(36161, /*GL_RENDERBUFFER*/ null);
  var vertices = [ -1, -1, -1, 1, 1, -1, 1, 1 ];
  var vb = gl.createBuffer();
  gl.bindBuffer(34962, /*GL_ARRAY_BUFFER*/ vb);
  gl.bufferData(34962, /*GL_ARRAY_BUFFER*/ new Float32Array(vertices), 35044);
  /*GL_STATIC_DRAW*/ gl.bindBuffer(34962, /*GL_ARRAY_BUFFER*/ null);
  context.blitVB = vb;
  var vsCode = "attribute vec2 pos;" + "varying lowp vec2 tex;" + "void main() { tex = pos * 0.5 + vec2(0.5,0.5); gl_Position = vec4(pos, 0.0, 1.0); }";
  var vs = gl.createShader(35633);
  /*GL_VERTEX_SHADER*/ gl.shaderSource(vs, vsCode);
  gl.compileShader(vs);
  var fsCode = "varying lowp vec2 tex;" + "uniform sampler2D sampler;" + "void main() { gl_FragColor = texture2D(sampler, tex); }";
  var fs = gl.createShader(35632);
  /*GL_FRAGMENT_SHADER*/ gl.shaderSource(fs, fsCode);
  gl.compileShader(fs);
  var blitProgram = gl.createProgram();
  gl.attachShader(blitProgram, vs);
  gl.attachShader(blitProgram, fs);
  gl.linkProgram(blitProgram);
  context.blitProgram = blitProgram;
  context.blitPosLoc = gl.getAttribLocation(blitProgram, "pos");
  gl.useProgram(blitProgram);
  gl.uniform1i(gl.getUniformLocation(blitProgram, "sampler"), 0);
  gl.useProgram(null);
  context.defaultVao = undefined;
  if (gl.createVertexArray) {
   context.defaultVao = gl.createVertexArray();
   gl.bindVertexArray(context.defaultVao);
   gl.enableVertexAttribArray(context.blitPosLoc);
   gl.bindVertexArray(null);
  }
 },
 resizeOffscreenFramebuffer: context => {
  var gl = context.GLctx;
  if (context.defaultColorTarget) {
   var prevTextureBinding = gl.getParameter(32873);
   /*GL_TEXTURE_BINDING_2D*/ gl.bindTexture(3553, /*GL_TEXTURE_2D*/ context.defaultColorTarget);
   gl.texImage2D(3553, /*GL_TEXTURE_2D*/ 0, 6408, /*GL_RGBA*/ gl.drawingBufferWidth, gl.drawingBufferHeight, 0, 6408, /*GL_RGBA*/ 5121, /*GL_UNSIGNED_BYTE*/ null);
   gl.bindTexture(3553, /*GL_TEXTURE_2D*/ prevTextureBinding);
  }
  if (context.defaultDepthTarget) {
   var prevRenderBufferBinding = gl.getParameter(36007);
   /*GL_RENDERBUFFER_BINDING*/ gl.bindRenderbuffer(36161, /*GL_RENDERBUFFER*/ context.defaultDepthTarget);
   gl.renderbufferStorage(36161, /*GL_RENDERBUFFER*/ 33189, /*GL_DEPTH_COMPONENT16*/ gl.drawingBufferWidth, gl.drawingBufferHeight);
   gl.bindRenderbuffer(36161, /*GL_RENDERBUFFER*/ prevRenderBufferBinding);
  }
 },
 blitOffscreenFramebuffer: context => {
  var gl = context.GLctx;
  var prevScissorTest = gl.getParameter(3089);
  /*GL_SCISSOR_TEST*/ if (prevScissorTest) gl.disable(3089);
  /*GL_SCISSOR_TEST*/ var prevFbo = gl.getParameter(36006);
  /*GL_FRAMEBUFFER_BINDING*/ if (gl.blitFramebuffer && !context.defaultFboForbidBlitFramebuffer) {
   gl.bindFramebuffer(36008, /*GL_READ_FRAMEBUFFER*/ context.defaultFbo);
   gl.bindFramebuffer(36009, /*GL_DRAW_FRAMEBUFFER*/ null);
   gl.blitFramebuffer(0, 0, gl.canvas.width, gl.canvas.height, 0, 0, gl.canvas.width, gl.canvas.height, 16384, /*GL_COLOR_BUFFER_BIT*/ 9728);
  } else {
   gl.bindFramebuffer(36160, /*GL_FRAMEBUFFER*/ null);
   var prevProgram = gl.getParameter(35725);
   /*GL_CURRENT_PROGRAM*/ gl.useProgram(context.blitProgram);
   var prevVB = gl.getParameter(34964);
   /*GL_ARRAY_BUFFER_BINDING*/ gl.bindBuffer(34962, /*GL_ARRAY_BUFFER*/ context.blitVB);
   var prevActiveTexture = gl.getParameter(34016);
   /*GL_ACTIVE_TEXTURE*/ gl.activeTexture(33984);
   /*GL_TEXTURE0*/ var prevTextureBinding = gl.getParameter(32873);
   /*GL_TEXTURE_BINDING_2D*/ gl.bindTexture(3553, /*GL_TEXTURE_2D*/ context.defaultColorTarget);
   var prevBlend = gl.getParameter(3042);
   /*GL_BLEND*/ if (prevBlend) gl.disable(3042);
   /*GL_BLEND*/ var prevCullFace = gl.getParameter(2884);
   /*GL_CULL_FACE*/ if (prevCullFace) gl.disable(2884);
   /*GL_CULL_FACE*/ var prevDepthTest = gl.getParameter(2929);
   /*GL_DEPTH_TEST*/ if (prevDepthTest) gl.disable(2929);
   /*GL_DEPTH_TEST*/ var prevStencilTest = gl.getParameter(2960);
   /*GL_STENCIL_TEST*/ if (prevStencilTest) gl.disable(2960);
   /*GL_STENCIL_TEST*/ function draw() {
    gl.vertexAttribPointer(context.blitPosLoc, 2, 5126, /*GL_FLOAT*/ false, 0, 0);
    gl.drawArrays(5, /*GL_TRIANGLE_STRIP*/ 0, 4);
   }
   if (context.defaultVao) {
    var prevVAO = gl.getParameter(34229);
    /*GL_VERTEX_ARRAY_BINDING*/ gl.bindVertexArray(context.defaultVao);
    draw();
    gl.bindVertexArray(prevVAO);
   } else {
    var prevVertexAttribPointer = {
     buffer: gl.getVertexAttrib(context.blitPosLoc, 34975),
     /*GL_VERTEX_ATTRIB_ARRAY_BUFFER_BINDING*/ size: gl.getVertexAttrib(context.blitPosLoc, 34339),
     /*GL_VERTEX_ATTRIB_ARRAY_SIZE*/ stride: gl.getVertexAttrib(context.blitPosLoc, 34340),
     /*GL_VERTEX_ATTRIB_ARRAY_STRIDE*/ type: gl.getVertexAttrib(context.blitPosLoc, 34341),
     /*GL_VERTEX_ATTRIB_ARRAY_TYPE*/ normalized: gl.getVertexAttrib(context.blitPosLoc, 34922),
     /*GL_VERTEX_ATTRIB_ARRAY_NORMALIZED*/ pointer: gl.getVertexAttribOffset(context.blitPosLoc, 34373)
    };
    var maxVertexAttribs = gl.getParameter(34921);
    /*GL_MAX_VERTEX_ATTRIBS*/ var prevVertexAttribEnables = [];
    for (var i = 0; i < maxVertexAttribs; ++i) {
     var prevEnabled = gl.getVertexAttrib(i, 34338);
     /*GL_VERTEX_ATTRIB_ARRAY_ENABLED*/ var wantEnabled = i == context.blitPosLoc;
     if (prevEnabled && !wantEnabled) {
      gl.disableVertexAttribArray(i);
     }
     if (!prevEnabled && wantEnabled) {
      gl.enableVertexAttribArray(i);
     }
     prevVertexAttribEnables[i] = prevEnabled;
    }
    draw();
    for (var i = 0; i < maxVertexAttribs; ++i) {
     var prevEnabled = prevVertexAttribEnables[i];
     var nowEnabled = i == context.blitPosLoc;
     if (prevEnabled && !nowEnabled) {
      gl.enableVertexAttribArray(i);
     }
     if (!prevEnabled && nowEnabled) {
      gl.disableVertexAttribArray(i);
     }
    }
    gl.bindBuffer(34962, /*GL_ARRAY_BUFFER*/ prevVertexAttribPointer.buffer);
    gl.vertexAttribPointer(context.blitPosLoc, prevVertexAttribPointer.size, prevVertexAttribPointer.type, prevVertexAttribPointer.normalized, prevVertexAttribPointer.stride, prevVertexAttribPointer.offset);
   }
   if (prevStencilTest) gl.enable(2960);
   /*GL_STENCIL_TEST*/ if (prevDepthTest) gl.enable(2929);
   /*GL_DEPTH_TEST*/ if (prevCullFace) gl.enable(2884);
   /*GL_CULL_FACE*/ if (prevBlend) gl.enable(3042);
   /*GL_BLEND*/ gl.bindTexture(3553, /*GL_TEXTURE_2D*/ prevTextureBinding);
   gl.activeTexture(prevActiveTexture);
   gl.bindBuffer(34962, /*GL_ARRAY_BUFFER*/ prevVB);
   gl.useProgram(prevProgram);
  }
  gl.bindFramebuffer(36160, /*GL_FRAMEBUFFER*/ prevFbo);
  if (prevScissorTest) gl.enable(3089);
 },
 /*GL_SCISSOR_TEST*/ registerContext: (ctx, webGLContextAttributes) => {
  var handle = _malloc(8);
  GROWABLE_HEAP_U32()[(((handle) + (4)) >> 2)] = _pthread_self();
  var context = {
   handle: handle,
   attributes: webGLContextAttributes,
   version: webGLContextAttributes.majorVersion,
   GLctx: ctx
  };
  if (ctx.canvas) ctx.canvas.GLctxObject = context;
  GL.contexts[handle] = context;
  if (typeof webGLContextAttributes.enableExtensionsByDefault == "undefined" || webGLContextAttributes.enableExtensionsByDefault) {
   GL.initExtensions(context);
  }
  if (webGLContextAttributes.renderViaOffscreenBackBuffer) GL.createOffscreenFramebuffer(context);
  return handle;
 },
 makeContextCurrent: contextHandle => {
  GL.currentContext = GL.contexts[contextHandle];
  Module.ctx = GLctx = GL.currentContext?.GLctx;
  return !(contextHandle && !GLctx);
 },
 getContext: contextHandle => GL.contexts[contextHandle],
 deleteContext: contextHandle => {
  if (GL.currentContext === GL.contexts[contextHandle]) {
   GL.currentContext = null;
  }
  if (typeof JSEvents == "object") {
   JSEvents.removeAllHandlersOnTarget(GL.contexts[contextHandle].GLctx.canvas);
  }
  if (GL.contexts[contextHandle] && GL.contexts[contextHandle].GLctx.canvas) {
   GL.contexts[contextHandle].GLctx.canvas.GLctxObject = undefined;
  }
  _free(GL.contexts[contextHandle].handle);
  GL.contexts[contextHandle] = null;
 },
 initExtensions: context => {
  context ||= GL.currentContext;
  if (context.initExtensionsDone) return;
  context.initExtensionsDone = true;
  var GLctx = context.GLctx;
  webgl_enable_ANGLE_instanced_arrays(GLctx);
  webgl_enable_OES_vertex_array_object(GLctx);
  webgl_enable_WEBGL_draw_buffers(GLctx);
  webgl_enable_WEBGL_draw_instanced_base_vertex_base_instance(GLctx);
  webgl_enable_WEBGL_multi_draw_instanced_base_vertex_base_instance(GLctx);
  if (context.version >= 2) {
   GLctx.disjointTimerQueryExt = GLctx.getExtension("EXT_disjoint_timer_query_webgl2");
  }
  if (context.version < 2 || !GLctx.disjointTimerQueryExt) {
   GLctx.disjointTimerQueryExt = GLctx.getExtension("EXT_disjoint_timer_query");
  }
  webgl_enable_WEBGL_multi_draw(GLctx);
  getEmscriptenSupportedExtensions(GLctx).forEach(ext => {
   if (!ext.includes("lose_context") && !ext.includes("debug")) {
    GLctx.getExtension(ext);
   }
  });
 }
};

var __emscripten_proxied_gl_context_activated_from_main_browser_thread = contextHandle => {
 GLctx = Module.ctx = GL.currentContext = contextHandle;
 GL.currentContextIsProxied = true;
};

var proxiedJSCallArgs = [];

var __emscripten_receive_on_main_thread_js = (funcIndex, emAsmAddr, callingThread, numCallArgs, args) => {
 numCallArgs /= 2;
 proxiedJSCallArgs.length = numCallArgs;
 var b = ((args) >> 3);
 for (var i = 0; i < numCallArgs; i++) {
  if (HEAP64[b + 2 * i]) {
   proxiedJSCallArgs[i] = HEAP64[b + 2 * i + 1];
  } else {
   proxiedJSCallArgs[i] = GROWABLE_HEAP_F64()[b + 2 * i + 1];
  }
 }
 var func = proxiedFunctionTable[funcIndex];
 PThread.currentProxiedOperationCallerThread = callingThread;
 var rtn = func(...proxiedJSCallArgs);
 PThread.currentProxiedOperationCallerThread = 0;
 return rtn;
};

function __emscripten_runtime_keepalive_clear() {
 if (ENVIRONMENT_IS_PTHREAD) return proxyToMainThread(31, 0, 1);
 noExitRuntime = false;
 runtimeKeepaliveCounter = 0;
}

var __emscripten_thread_set_strongref = thread => {};

function __gmtime_js(time, tmPtr) {
 time = bigintToI53Checked(time);
 var date = new Date(time * 1e3);
 GROWABLE_HEAP_I32()[((tmPtr) >> 2)] = date.getUTCSeconds();
 GROWABLE_HEAP_I32()[(((tmPtr) + (4)) >> 2)] = date.getUTCMinutes();
 GROWABLE_HEAP_I32()[(((tmPtr) + (8)) >> 2)] = date.getUTCHours();
 GROWABLE_HEAP_I32()[(((tmPtr) + (12)) >> 2)] = date.getUTCDate();
 GROWABLE_HEAP_I32()[(((tmPtr) + (16)) >> 2)] = date.getUTCMonth();
 GROWABLE_HEAP_I32()[(((tmPtr) + (20)) >> 2)] = date.getUTCFullYear() - 1900;
 GROWABLE_HEAP_I32()[(((tmPtr) + (24)) >> 2)] = date.getUTCDay();
 var start = Date.UTC(date.getUTCFullYear(), 0, 1, 0, 0, 0, 0);
 var yday = ((date.getTime() - start) / (1e3 * 60 * 60 * 24)) | 0;
 GROWABLE_HEAP_I32()[(((tmPtr) + (28)) >> 2)] = yday;
}

var isLeapYear = year => year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0);

var MONTH_DAYS_LEAP_CUMULATIVE = [ 0, 31, 60, 91, 121, 152, 182, 213, 244, 274, 305, 335 ];

var MONTH_DAYS_REGULAR_CUMULATIVE = [ 0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334 ];

var ydayFromDate = date => {
 var leap = isLeapYear(date.getFullYear());
 var monthDaysCumulative = (leap ? MONTH_DAYS_LEAP_CUMULATIVE : MONTH_DAYS_REGULAR_CUMULATIVE);
 var yday = monthDaysCumulative[date.getMonth()] + date.getDate() - 1;
 return yday;
};

function __localtime_js(time, tmPtr) {
 time = bigintToI53Checked(time);
 var date = new Date(time * 1e3);
 GROWABLE_HEAP_I32()[((tmPtr) >> 2)] = date.getSeconds();
 GROWABLE_HEAP_I32()[(((tmPtr) + (4)) >> 2)] = date.getMinutes();
 GROWABLE_HEAP_I32()[(((tmPtr) + (8)) >> 2)] = date.getHours();
 GROWABLE_HEAP_I32()[(((tmPtr) + (12)) >> 2)] = date.getDate();
 GROWABLE_HEAP_I32()[(((tmPtr) + (16)) >> 2)] = date.getMonth();
 GROWABLE_HEAP_I32()[(((tmPtr) + (20)) >> 2)] = date.getFullYear() - 1900;
 GROWABLE_HEAP_I32()[(((tmPtr) + (24)) >> 2)] = date.getDay();
 var yday = ydayFromDate(date) | 0;
 GROWABLE_HEAP_I32()[(((tmPtr) + (28)) >> 2)] = yday;
 GROWABLE_HEAP_I32()[(((tmPtr) + (36)) >> 2)] = -(date.getTimezoneOffset() * 60);
 var start = new Date(date.getFullYear(), 0, 1);
 var summerOffset = new Date(date.getFullYear(), 6, 1).getTimezoneOffset();
 var winterOffset = start.getTimezoneOffset();
 var dst = (summerOffset != winterOffset && date.getTimezoneOffset() == Math.min(winterOffset, summerOffset)) | 0;
 GROWABLE_HEAP_I32()[(((tmPtr) + (32)) >> 2)] = dst;
}

function __mmap_js(len, prot, flags, fd, offset, allocated, addr) {
 if (ENVIRONMENT_IS_PTHREAD) return proxyToMainThread(32, 0, 1, len, prot, flags, fd, offset, allocated, addr);
 offset = bigintToI53Checked(offset);
 try {
  if (isNaN(offset)) return 61;
  var stream = SYSCALLS.getStreamFromFD(fd);
  var res = FS.mmap(stream, len, offset, prot, flags);
  var ptr = res.ptr;
  GROWABLE_HEAP_I32()[((allocated) >> 2)] = res.allocated;
  GROWABLE_HEAP_U32()[((addr) >> 2)] = ptr;
  return 0;
 } catch (e) {
  if (typeof FS == "undefined" || !(e.name === "ErrnoError")) throw e;
  return -e.errno;
 }
}

function __munmap_js(addr, len, prot, flags, fd, offset) {
 if (ENVIRONMENT_IS_PTHREAD) return proxyToMainThread(33, 0, 1, addr, len, prot, flags, fd, offset);
 offset = bigintToI53Checked(offset);
 try {
  var stream = SYSCALLS.getStreamFromFD(fd);
  if (prot & 2) {
   SYSCALLS.doMsync(addr, stream, len, flags, offset);
  }
 } catch (e) {
  if (typeof FS == "undefined" || !(e.name === "ErrnoError")) throw e;
  return -e.errno;
 }
}

var __tzset_js = (timezone, daylight, std_name, dst_name) => {
 var currentYear = (new Date).getFullYear();
 var winter = new Date(currentYear, 0, 1);
 var summer = new Date(currentYear, 6, 1);
 var winterOffset = winter.getTimezoneOffset();
 var summerOffset = summer.getTimezoneOffset();
 var stdTimezoneOffset = Math.max(winterOffset, summerOffset);
 GROWABLE_HEAP_U32()[((timezone) >> 2)] = stdTimezoneOffset * 60;
 GROWABLE_HEAP_I32()[((daylight) >> 2)] = Number(winterOffset != summerOffset);
 function extractZone(date) {
  var match = date.toTimeString().match(/\(([A-Za-z ]+)\)$/);
  return match ? match[1] : "GMT";
 }
 var winterName = extractZone(winter);
 var summerName = extractZone(summer);
 if (summerOffset < winterOffset) {
  stringToUTF8(winterName, std_name, 7);
  stringToUTF8(summerName, dst_name, 7);
 } else {
  stringToUTF8(winterName, dst_name, 7);
  stringToUTF8(summerName, std_name, 7);
 }
};

var _abort = () => {
 abort("");
};

var runtimeKeepalivePush = () => {
 runtimeKeepaliveCounter += 1;
};

var _emscripten_set_main_loop_timing = (mode, value) => {
 Browser.mainLoop.timingMode = mode;
 Browser.mainLoop.timingValue = value;
 if (!Browser.mainLoop.func) {
  return 1;
 }
 if (!Browser.mainLoop.running) {
  runtimeKeepalivePush();
  Browser.mainLoop.running = true;
 }
 if (mode == 0) {
  Browser.mainLoop.scheduler = function Browser_mainLoop_scheduler_setTimeout() {
   var timeUntilNextTick = Math.max(0, Browser.mainLoop.tickStartTime + value - _emscripten_get_now()) | 0;
   setTimeout(Browser.mainLoop.runner, timeUntilNextTick);
  };
  Browser.mainLoop.method = "timeout";
 } else if (mode == 1) {
  Browser.mainLoop.scheduler = function Browser_mainLoop_scheduler_rAF() {
   Browser.requestAnimationFrame(Browser.mainLoop.runner);
  };
  Browser.mainLoop.method = "rAF";
 } else if (mode == 2) {
  if (typeof Browser.setImmediate == "undefined") {
   if (typeof setImmediate == "undefined") {
    var setImmediates = [];
    var emscriptenMainLoopMessageId = "setimmediate";
    /** @param {Event} event */ var Browser_setImmediate_messageHandler = event => {
     if (event.data === emscriptenMainLoopMessageId || event.data.target === emscriptenMainLoopMessageId) {
      event.stopPropagation();
      setImmediates.shift()();
     }
    };
    addEventListener("message", Browser_setImmediate_messageHandler, true);
    Browser.setImmediate = /** @type{function(function(): ?, ...?): number} */ (function Browser_emulated_setImmediate(func) {
     setImmediates.push(func);
     if (ENVIRONMENT_IS_WORKER) {
      if (Module["setImmediates"] === undefined) Module["setImmediates"] = [];
      Module["setImmediates"].push(func);
      postMessage({
       target: emscriptenMainLoopMessageId
      });
     } else postMessage(emscriptenMainLoopMessageId, "*");
    });
   } else {
    Browser.setImmediate = setImmediate;
   }
  }
  Browser.mainLoop.scheduler = function Browser_mainLoop_scheduler_setImmediate() {
   Browser.setImmediate(Browser.mainLoop.runner);
  };
  Browser.mainLoop.method = "immediate";
 }
 return 0;
};

var _emscripten_get_now;

_emscripten_get_now = () => performance.timeOrigin + performance.now();

var runtimeKeepalivePop = () => {
 runtimeKeepaliveCounter -= 1;
};

/**
     * @param {number=} arg
     * @param {boolean=} noSetTiming
     */ var setMainLoop = (browserIterationFunc, fps, simulateInfiniteLoop, arg, noSetTiming) => {
 Browser.mainLoop.func = browserIterationFunc;
 Browser.mainLoop.arg = arg;
 /** @type{number} */ var thisMainLoopId = (() => Browser.mainLoop.currentlyRunningMainloop)();
 function checkIsRunning() {
  if (thisMainLoopId < Browser.mainLoop.currentlyRunningMainloop) {
   runtimeKeepalivePop();
   maybeExit();
   return false;
  }
  return true;
 }
 Browser.mainLoop.running = false;
 Browser.mainLoop.runner = function Browser_mainLoop_runner() {
  if (ABORT) return;
  if (Browser.mainLoop.queue.length > 0) {
   var start = Date.now();
   var blocker = Browser.mainLoop.queue.shift();
   blocker.func(blocker.arg);
   if (Browser.mainLoop.remainingBlockers) {
    var remaining = Browser.mainLoop.remainingBlockers;
    var next = remaining % 1 == 0 ? remaining - 1 : Math.floor(remaining);
    if (blocker.counted) {
     Browser.mainLoop.remainingBlockers = next;
    } else {
     next = next + .5;
     Browser.mainLoop.remainingBlockers = (8 * remaining + next) / 9;
    }
   }
   Browser.mainLoop.updateStatus();
   if (!checkIsRunning()) return;
   setTimeout(Browser.mainLoop.runner, 0);
   return;
  }
  if (!checkIsRunning()) return;
  Browser.mainLoop.currentFrameNumber = Browser.mainLoop.currentFrameNumber + 1 | 0;
  if (Browser.mainLoop.timingMode == 1 && Browser.mainLoop.timingValue > 1 && Browser.mainLoop.currentFrameNumber % Browser.mainLoop.timingValue != 0) {
   Browser.mainLoop.scheduler();
   return;
  } else if (Browser.mainLoop.timingMode == 0) {
   Browser.mainLoop.tickStartTime = _emscripten_get_now();
  }
  Browser.mainLoop.runIter(browserIterationFunc);
  if (!checkIsRunning()) return;
  if (typeof SDL == "object") SDL.audio?.queueNewAudioData?.();
  Browser.mainLoop.scheduler();
 };
 if (!noSetTiming) {
  if (fps && fps > 0) {
   _emscripten_set_main_loop_timing(0, 1e3 / fps);
  } else {
   _emscripten_set_main_loop_timing(1, 1);
  }
  Browser.mainLoop.scheduler();
 }
 if (simulateInfiniteLoop) {
  throw "unwind";
 }
};

/** @param {number=} timeout */ var safeSetTimeout = (func, timeout) => {
 runtimeKeepalivePush();
 return setTimeout(() => {
  runtimeKeepalivePop();
  callUserCallback(func);
 }, timeout);
};

var warnOnce = text => {
 warnOnce.shown ||= {};
 if (!warnOnce.shown[text]) {
  warnOnce.shown[text] = 1;
  err(text);
 }
};

var Browser = {
 mainLoop: {
  running: false,
  scheduler: null,
  method: "",
  currentlyRunningMainloop: 0,
  func: null,
  arg: 0,
  timingMode: 0,
  timingValue: 0,
  currentFrameNumber: 0,
  queue: [],
  pause() {
   Browser.mainLoop.scheduler = null;
   Browser.mainLoop.currentlyRunningMainloop++;
  },
  resume() {
   Browser.mainLoop.currentlyRunningMainloop++;
   var timingMode = Browser.mainLoop.timingMode;
   var timingValue = Browser.mainLoop.timingValue;
   var func = Browser.mainLoop.func;
   Browser.mainLoop.func = null;
   setMainLoop(func, 0, false, Browser.mainLoop.arg, true);
   _emscripten_set_main_loop_timing(timingMode, timingValue);
   Browser.mainLoop.scheduler();
  },
  updateStatus() {
   if (Module["setStatus"]) {
    var message = Module["statusMessage"] || "Please wait...";
    var remaining = Browser.mainLoop.remainingBlockers;
    var expected = Browser.mainLoop.expectedBlockers;
    if (remaining) {
     if (remaining < expected) {
      Module["setStatus"](`{message} ({expected - remaining}/{expected})`);
     } else {
      Module["setStatus"](message);
     }
    } else {
     Module["setStatus"]("");
    }
   }
  },
  runIter(func) {
   if (ABORT) return;
   if (Module["preMainLoop"]) {
    var preRet = Module["preMainLoop"]();
    if (preRet === false) {
     return;
    }
   }
   callUserCallback(func);
   Module["postMainLoop"]?.();
  }
 },
 isFullscreen: false,
 pointerLock: false,
 moduleContextCreatedCallbacks: [],
 workers: [],
 init() {
  if (Browser.initted) return;
  Browser.initted = true;
  var imagePlugin = {};
  imagePlugin["canHandle"] = function imagePlugin_canHandle(name) {
   return !Module.noImageDecoding && /\.(jpg|jpeg|png|bmp)$/i.test(name);
  };
  imagePlugin["handle"] = function imagePlugin_handle(byteArray, name, onload, onerror) {
   var b = new Blob([ byteArray ], {
    type: Browser.getMimetype(name)
   });
   if (b.size !== byteArray.length) {
    b = new Blob([ (new Uint8Array(byteArray)).buffer ], {
     type: Browser.getMimetype(name)
    });
   }
   var url = URL.createObjectURL(b);
   var img = new Image;
   img.onload = () => {
    var canvas = /** @type {!HTMLCanvasElement} */ (document.createElement("canvas"));
    canvas.width = img.width;
    canvas.height = img.height;
    var ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0);
    preloadedImages[name] = canvas;
    URL.revokeObjectURL(url);
    onload?.(byteArray);
   };
   img.onerror = event => {
    err(`Image ${url} could not be decoded`);
    onerror?.();
   };
   img.src = url;
  };
  preloadPlugins.push(imagePlugin);
  var audioPlugin = {};
  audioPlugin["canHandle"] = function audioPlugin_canHandle(name) {
   return !Module.noAudioDecoding && name.substr(-4) in {
    ".ogg": 1,
    ".wav": 1,
    ".mp3": 1
   };
  };
  audioPlugin["handle"] = function audioPlugin_handle(byteArray, name, onload, onerror) {
   var done = false;
   function finish(audio) {
    if (done) return;
    done = true;
    preloadedAudios[name] = audio;
    onload?.(byteArray);
   }
   function fail() {
    if (done) return;
    done = true;
    preloadedAudios[name] = new Audio;
    onerror?.();
   }
   var b = new Blob([ byteArray ], {
    type: Browser.getMimetype(name)
   });
   var url = URL.createObjectURL(b);
   var audio = new Audio;
   audio.addEventListener("canplaythrough", () => finish(audio), false);
   audio.onerror = function audio_onerror(event) {
    if (done) return;
    err(`warning: browser could not fully decode audio ${name}, trying slower base64 approach`);
    function encode64(data) {
     var BASE = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
     var PAD = "=";
     var ret = "";
     var leftchar = 0;
     var leftbits = 0;
     for (var i = 0; i < data.length; i++) {
      leftchar = (leftchar << 8) | data[i];
      leftbits += 8;
      while (leftbits >= 6) {
       var curr = (leftchar >> (leftbits - 6)) & 63;
       leftbits -= 6;
       ret += BASE[curr];
      }
     }
     if (leftbits == 2) {
      ret += BASE[(leftchar & 3) << 4];
      ret += PAD + PAD;
     } else if (leftbits == 4) {
      ret += BASE[(leftchar & 15) << 2];
      ret += PAD;
     }
     return ret;
    }
    audio.src = "data:audio/x-" + name.substr(-3) + ";base64," + encode64(byteArray);
    finish(audio);
   };
   audio.src = url;
   safeSetTimeout(() => {
    finish(audio);
   },  1e4);
  };
  preloadPlugins.push(audioPlugin);
  function pointerLockChange() {
   Browser.pointerLock = document["pointerLockElement"] === Module["canvas"] || document["mozPointerLockElement"] === Module["canvas"] || document["webkitPointerLockElement"] === Module["canvas"] || document["msPointerLockElement"] === Module["canvas"];
  }
  var canvas = Module["canvas"];
  if (canvas) {
   canvas.requestPointerLock = canvas["requestPointerLock"] || canvas["mozRequestPointerLock"] || canvas["webkitRequestPointerLock"] || canvas["msRequestPointerLock"] || (() => {});
   canvas.exitPointerLock = document["exitPointerLock"] || document["mozExitPointerLock"] || document["webkitExitPointerLock"] || document["msExitPointerLock"] || (() => {});
   canvas.exitPointerLock = canvas.exitPointerLock.bind(document);
   document.addEventListener("pointerlockchange", pointerLockChange, false);
   document.addEventListener("mozpointerlockchange", pointerLockChange, false);
   document.addEventListener("webkitpointerlockchange", pointerLockChange, false);
   document.addEventListener("mspointerlockchange", pointerLockChange, false);
   if (Module["elementPointerLock"]) {
    canvas.addEventListener("click", ev => {
     if (!Browser.pointerLock && Module["canvas"].requestPointerLock) {
      Module["canvas"].requestPointerLock();
      ev.preventDefault();
     }
    }, false);
   }
  }
 },
 createContext(/** @type {HTMLCanvasElement} */ canvas, useWebGL, setInModule, webGLContextAttributes) {
  if (useWebGL && Module.ctx && canvas == Module.canvas) return Module.ctx;
  var ctx;
  var contextHandle;
  if (useWebGL) {
   var contextAttributes = {
    antialias: false,
    alpha: false,
    majorVersion: (typeof WebGL2RenderingContext != "undefined") ? 2 : 1
   };
   if (webGLContextAttributes) {
    for (var attribute in webGLContextAttributes) {
     contextAttributes[attribute] = webGLContextAttributes[attribute];
    }
   }
   if (typeof GL != "undefined") {
    contextHandle = GL.createContext(canvas, contextAttributes);
    if (contextHandle) {
     ctx = GL.getContext(contextHandle).GLctx;
    }
   }
  } else {
   ctx = canvas.getContext("2d");
  }
  if (!ctx) return null;
  if (setInModule) {
   Module.ctx = ctx;
   if (useWebGL) GL.makeContextCurrent(contextHandle);
   Module.useWebGL = useWebGL;
   Browser.moduleContextCreatedCallbacks.forEach(callback => callback());
   Browser.init();
  }
  return ctx;
 },
 destroyContext(canvas, useWebGL, setInModule) {},
 fullscreenHandlersInstalled: false,
 lockPointer: undefined,
 resizeCanvas: undefined,
 requestFullscreen(lockPointer, resizeCanvas) {
  Browser.lockPointer = lockPointer;
  Browser.resizeCanvas = resizeCanvas;
  if (typeof Browser.lockPointer == "undefined") Browser.lockPointer = true;
  if (typeof Browser.resizeCanvas == "undefined") Browser.resizeCanvas = false;
  var canvas = Module["canvas"];
  function fullscreenChange() {
   Browser.isFullscreen = false;
   var canvasContainer = canvas.parentNode;
   if ((document["fullscreenElement"] || document["mozFullScreenElement"] || document["msFullscreenElement"] || document["webkitFullscreenElement"] || document["webkitCurrentFullScreenElement"]) === canvasContainer) {
    canvas.exitFullscreen = Browser.exitFullscreen;
    if (Browser.lockPointer) canvas.requestPointerLock();
    Browser.isFullscreen = true;
    if (Browser.resizeCanvas) {
     Browser.setFullscreenCanvasSize();
    } else {
     Browser.updateCanvasDimensions(canvas);
    }
   } else {
    canvasContainer.parentNode.insertBefore(canvas, canvasContainer);
    canvasContainer.parentNode.removeChild(canvasContainer);
    if (Browser.resizeCanvas) {
     Browser.setWindowedCanvasSize();
    } else {
     Browser.updateCanvasDimensions(canvas);
    }
   }
   Module["onFullScreen"]?.(Browser.isFullscreen);
   Module["onFullscreen"]?.(Browser.isFullscreen);
  }
  if (!Browser.fullscreenHandlersInstalled) {
   Browser.fullscreenHandlersInstalled = true;
   document.addEventListener("fullscreenchange", fullscreenChange, false);
   document.addEventListener("mozfullscreenchange", fullscreenChange, false);
   document.addEventListener("webkitfullscreenchange", fullscreenChange, false);
   document.addEventListener("MSFullscreenChange", fullscreenChange, false);
  }
  var canvasContainer = document.createElement("div");
  canvas.parentNode.insertBefore(canvasContainer, canvas);
  canvasContainer.appendChild(canvas);
  canvasContainer.requestFullscreen = canvasContainer["requestFullscreen"] || canvasContainer["mozRequestFullScreen"] || canvasContainer["msRequestFullscreen"] || (canvasContainer["webkitRequestFullscreen"] ? () => canvasContainer["webkitRequestFullscreen"](Element["ALLOW_KEYBOARD_INPUT"]) : null) || (canvasContainer["webkitRequestFullScreen"] ? () => canvasContainer["webkitRequestFullScreen"](Element["ALLOW_KEYBOARD_INPUT"]) : null);
  canvasContainer.requestFullscreen();
 },
 exitFullscreen() {
  if (!Browser.isFullscreen) {
   return false;
  }
  var CFS = document["exitFullscreen"] || document["cancelFullScreen"] || document["mozCancelFullScreen"] || document["msExitFullscreen"] || document["webkitCancelFullScreen"] || (() => {});
  CFS.apply(document, []);
  return true;
 },
 nextRAF: 0,
 fakeRequestAnimationFrame(func) {
  var now = Date.now();
  if (Browser.nextRAF === 0) {
   Browser.nextRAF = now + 1e3 / 60;
  } else {
   while (now + 2 >= Browser.nextRAF) {
    Browser.nextRAF += 1e3 / 60;
   }
  }
  var delay = Math.max(Browser.nextRAF - now, 0);
  setTimeout(func, delay);
 },
 requestAnimationFrame(func) {
  if (typeof requestAnimationFrame == "function") {
   requestAnimationFrame(func);
   return;
  }
  var RAF = Browser.fakeRequestAnimationFrame;
  RAF(func);
 },
 safeSetTimeout(func, timeout) {
  return safeSetTimeout(func, timeout);
 },
 safeRequestAnimationFrame(func) {
  runtimeKeepalivePush();
  return Browser.requestAnimationFrame(() => {
   runtimeKeepalivePop();
   callUserCallback(func);
  });
 },
 getMimetype(name) {
  return {
   "jpg": "image/jpeg",
   "jpeg": "image/jpeg",
   "png": "image/png",
   "bmp": "image/bmp",
   "ogg": "audio/ogg",
   "wav": "audio/wav",
   "mp3": "audio/mpeg"
  }[name.substr(name.lastIndexOf(".") + 1)];
 },
 getUserMedia(func) {
  window.getUserMedia ||= navigator["getUserMedia"] || navigator["mozGetUserMedia"];
  window.getUserMedia(func);
 },
 getMovementX(event) {
  return event["movementX"] || event["mozMovementX"] || event["webkitMovementX"] || 0;
 },
 getMovementY(event) {
  return event["movementY"] || event["mozMovementY"] || event["webkitMovementY"] || 0;
 },
 getMouseWheelDelta(event) {
  var delta = 0;
  switch (event.type) {
  case "DOMMouseScroll":
   delta = event.detail / 3;
   break;

  case "mousewheel":
   delta = event.wheelDelta / 120;
   break;

  case "wheel":
   delta = event.deltaY;
   switch (event.deltaMode) {
   case 0:
    delta /= 100;
    break;

   case 1:
    delta /= 3;
    break;

   case 2:
    delta *= 80;
    break;

   default:
    throw "unrecognized mouse wheel delta mode: " + event.deltaMode;
   }
   break;

  default:
   throw "unrecognized mouse wheel event: " + event.type;
  }
  return delta;
 },
 mouseX: 0,
 mouseY: 0,
 mouseMovementX: 0,
 mouseMovementY: 0,
 touches: {},
 lastTouches: {},
 calculateMouseCoords(pageX, pageY) {
  var rect = Module["canvas"].getBoundingClientRect();
  var cw = Module["canvas"].width;
  var ch = Module["canvas"].height;
  var scrollX = ((typeof window.scrollX != "undefined") ? window.scrollX : window.pageXOffset);
  var scrollY = ((typeof window.scrollY != "undefined") ? window.scrollY : window.pageYOffset);
  var adjustedX = pageX - (scrollX + rect.left);
  var adjustedY = pageY - (scrollY + rect.top);
  adjustedX = adjustedX * (cw / rect.width);
  adjustedY = adjustedY * (ch / rect.height);
  return {
   x: adjustedX,
   y: adjustedY
  };
 },
 setMouseCoords(pageX, pageY) {
  const {x: x, y: y} = Browser.calculateMouseCoords(pageX, pageY);
  Browser.mouseMovementX = x - Browser.mouseX;
  Browser.mouseMovementY = y - Browser.mouseY;
  Browser.mouseX = x;
  Browser.mouseY = y;
 },
 calculateMouseEvent(event) {
  if (Browser.pointerLock) {
   if (event.type != "mousemove" && ("mozMovementX" in event)) {
    Browser.mouseMovementX = Browser.mouseMovementY = 0;
   } else {
    Browser.mouseMovementX = Browser.getMovementX(event);
    Browser.mouseMovementY = Browser.getMovementY(event);
   }
   if (typeof SDL != "undefined") {
    Browser.mouseX = SDL.mouseX + Browser.mouseMovementX;
    Browser.mouseY = SDL.mouseY + Browser.mouseMovementY;
   } else {
    Browser.mouseX += Browser.mouseMovementX;
    Browser.mouseY += Browser.mouseMovementY;
   }
  } else {
   if (event.type === "touchstart" || event.type === "touchend" || event.type === "touchmove") {
    var touch = event.touch;
    if (touch === undefined) {
     return;
    }
    var coords = Browser.calculateMouseCoords(touch.pageX, touch.pageY);
    if (event.type === "touchstart") {
     Browser.lastTouches[touch.identifier] = coords;
     Browser.touches[touch.identifier] = coords;
    } else if (event.type === "touchend" || event.type === "touchmove") {
     var last = Browser.touches[touch.identifier];
     last ||= coords;
     Browser.lastTouches[touch.identifier] = last;
     Browser.touches[touch.identifier] = coords;
    }
    return;
   }
   Browser.setMouseCoords(event.pageX, event.pageY);
  }
 },
 resizeListeners: [],
 updateResizeListeners() {
  var canvas = Module["canvas"];
  Browser.resizeListeners.forEach(listener => listener(canvas.width, canvas.height));
 },
 setCanvasSize(width, height, noUpdates) {
  var canvas = Module["canvas"];
  Browser.updateCanvasDimensions(canvas, width, height);
  if (!noUpdates) Browser.updateResizeListeners();
 },
 windowedWidth: 0,
 windowedHeight: 0,
 setFullscreenCanvasSize() {
  if (typeof SDL != "undefined") {
   var flags = GROWABLE_HEAP_U32()[((SDL.screen) >> 2)];
   flags = flags | 8388608;
   GROWABLE_HEAP_I32()[((SDL.screen) >> 2)] = flags;
  }
  Browser.updateCanvasDimensions(Module["canvas"]);
  Browser.updateResizeListeners();
 },
 setWindowedCanvasSize() {
  if (typeof SDL != "undefined") {
   var flags = GROWABLE_HEAP_U32()[((SDL.screen) >> 2)];
   flags = flags & ~8388608;
   GROWABLE_HEAP_I32()[((SDL.screen) >> 2)] = flags;
  }
  Browser.updateCanvasDimensions(Module["canvas"]);
  Browser.updateResizeListeners();
 },
 updateCanvasDimensions(canvas, wNative, hNative) {
  if (wNative && hNative) {
   canvas.widthNative = wNative;
   canvas.heightNative = hNative;
  } else {
   wNative = canvas.widthNative;
   hNative = canvas.heightNative;
  }
  var w = wNative;
  var h = hNative;
  if (Module["forcedAspectRatio"] && Module["forcedAspectRatio"] > 0) {
   if (w / h < Module["forcedAspectRatio"]) {
    w = Math.round(h * Module["forcedAspectRatio"]);
   } else {
    h = Math.round(w / Module["forcedAspectRatio"]);
   }
  }
  if (((document["fullscreenElement"] || document["mozFullScreenElement"] || document["msFullscreenElement"] || document["webkitFullscreenElement"] || document["webkitCurrentFullScreenElement"]) === canvas.parentNode) && (typeof screen != "undefined")) {
   var factor = Math.min(screen.width / w, screen.height / h);
   w = Math.round(w * factor);
   h = Math.round(h * factor);
  }
  if (Browser.resizeCanvas) {
   if (canvas.width != w) canvas.width = w;
   if (canvas.height != h) canvas.height = h;
   if (typeof canvas.style != "undefined") {
    canvas.style.removeProperty("width");
    canvas.style.removeProperty("height");
   }
  } else {
   if (canvas.width != wNative) canvas.width = wNative;
   if (canvas.height != hNative) canvas.height = hNative;
   if (typeof canvas.style != "undefined") {
    if (w != wNative || h != hNative) {
     canvas.style.setProperty("width", w + "px", "important");
     canvas.style.setProperty("height", h + "px", "important");
    } else {
     canvas.style.removeProperty("width");
     canvas.style.removeProperty("height");
    }
   }
  }
 }
};

var _emscripten_cancel_main_loop = () => {
 Browser.mainLoop.pause();
 Browser.mainLoop.func = null;
};

var _emscripten_check_blocking_allowed = () => {};

var _emscripten_date_now = () => Date.now();

var _emscripten_err = str => err(UTF8ToString(str));

var _emscripten_exit_with_live_runtime = () => {
 runtimeKeepalivePush();
 throw "unwind";
};

function _emscripten_force_exit(status) {
 if (ENVIRONMENT_IS_PTHREAD) return proxyToMainThread(34, 0, 1, status);
 __emscripten_runtime_keepalive_clear();
 _exit(status);
}

Module["_emscripten_force_exit"] = _emscripten_force_exit;

var getHeapMax = () =>  2147483648;

var _emscripten_get_heap_max = () => getHeapMax();

var _emscripten_get_now_res = () => 1e3;

/** @suppress {duplicate } */ var _glActiveTexture = x0 => GLctx.activeTexture(x0);

var _emscripten_glActiveTexture = _glActiveTexture;

/** @suppress {duplicate } */ var _glAttachShader = (program, shader) => {
 GLctx.attachShader(GL.programs[program], GL.shaders[shader]);
};

var _emscripten_glAttachShader = _glAttachShader;

/** @suppress {duplicate } */ var _glBeginTransformFeedback = x0 => GLctx.beginTransformFeedback(x0);

var _emscripten_glBeginTransformFeedback = _glBeginTransformFeedback;

/** @suppress {duplicate } */ var _glBindBuffer = (target, buffer) => {
 if (target == 35051) /*GL_PIXEL_PACK_BUFFER*/ {
  GLctx.currentPixelPackBufferBinding = buffer;
 } else if (target == 35052) /*GL_PIXEL_UNPACK_BUFFER*/ {
  GLctx.currentPixelUnpackBufferBinding = buffer;
 }
 GLctx.bindBuffer(target, GL.buffers[buffer]);
};

var _emscripten_glBindBuffer = _glBindBuffer;

/** @suppress {duplicate } */ var _glBindBufferBase = (target, index, buffer) => {
 GLctx.bindBufferBase(target, index, GL.buffers[buffer]);
};

var _emscripten_glBindBufferBase = _glBindBufferBase;

/** @suppress {duplicate } */ var _glBindBufferRange = (target, index, buffer, offset, ptrsize) => {
 GLctx.bindBufferRange(target, index, GL.buffers[buffer], offset, ptrsize);
};

var _emscripten_glBindBufferRange = _glBindBufferRange;

/** @suppress {duplicate } */ var _glBindFramebuffer = (target, framebuffer) => {
 GLctx.bindFramebuffer(target, framebuffer ? GL.framebuffers[framebuffer] : GL.currentContext.defaultFbo);
};

var _emscripten_glBindFramebuffer = _glBindFramebuffer;

/** @suppress {duplicate } */ var _glBindRenderbuffer = (target, renderbuffer) => {
 GLctx.bindRenderbuffer(target, GL.renderbuffers[renderbuffer]);
};

var _emscripten_glBindRenderbuffer = _glBindRenderbuffer;

/** @suppress {duplicate } */ var _glBindTexture = (target, texture) => {
 GLctx.bindTexture(target, GL.textures[texture]);
};

var _emscripten_glBindTexture = _glBindTexture;

/** @suppress {duplicate } */ var _glBindVertexArray = vao => {
 GLctx.bindVertexArray(GL.vaos[vao]);
};

var _emscripten_glBindVertexArray = _glBindVertexArray;

/** @suppress {duplicate } */ var _glBlendColor = (x0, x1, x2, x3) => GLctx.blendColor(x0, x1, x2, x3);

var _emscripten_glBlendColor = _glBlendColor;

/** @suppress {duplicate } */ var _glBlendEquation = x0 => GLctx.blendEquation(x0);

var _emscripten_glBlendEquation = _glBlendEquation;

/** @suppress {duplicate } */ var _glBlendFunc = (x0, x1) => GLctx.blendFunc(x0, x1);

var _emscripten_glBlendFunc = _glBlendFunc;

/** @suppress {duplicate } */ var _glBlendFuncSeparate = (x0, x1, x2, x3) => GLctx.blendFuncSeparate(x0, x1, x2, x3);

var _emscripten_glBlendFuncSeparate = _glBlendFuncSeparate;

/** @suppress {duplicate } */ var _glBlitFramebuffer = (x0, x1, x2, x3, x4, x5, x6, x7, x8, x9) => GLctx.blitFramebuffer(x0, x1, x2, x3, x4, x5, x6, x7, x8, x9);

var _emscripten_glBlitFramebuffer = _glBlitFramebuffer;

/** @suppress {duplicate } */ var _glBufferData = (target, size, data, usage) => {
 if (GL.currentContext.version >= 2) {
  if (data && size) {
   GLctx.bufferData(target, GROWABLE_HEAP_U8(), usage, data, size);
  } else {
   GLctx.bufferData(target, size, usage);
  }
  return;
 }
 GLctx.bufferData(target, data ? GROWABLE_HEAP_U8().subarray(data, data + size) : size, usage);
};

var _emscripten_glBufferData = _glBufferData;

/** @suppress {duplicate } */ var _glBufferSubData = (target, offset, size, data) => {
 if (GL.currentContext.version >= 2) {
  size && GLctx.bufferSubData(target, offset, GROWABLE_HEAP_U8(), data, size);
  return;
 }
 GLctx.bufferSubData(target, offset, GROWABLE_HEAP_U8().subarray(data, data + size));
};

var _emscripten_glBufferSubData = _glBufferSubData;

/** @suppress {duplicate } */ var _glCheckFramebufferStatus = x0 => GLctx.checkFramebufferStatus(x0);

var _emscripten_glCheckFramebufferStatus = _glCheckFramebufferStatus;

/** @suppress {duplicate } */ var _glClear = x0 => GLctx.clear(x0);

var _emscripten_glClear = _glClear;

/** @suppress {duplicate } */ var _glClearBufferfv = (buffer, drawbuffer, value) => {
 GLctx.clearBufferfv(buffer, drawbuffer, GROWABLE_HEAP_F32(), ((value) >> 2));
};

var _emscripten_glClearBufferfv = _glClearBufferfv;

/** @suppress {duplicate } */ var _glClearColor = (x0, x1, x2, x3) => GLctx.clearColor(x0, x1, x2, x3);

var _emscripten_glClearColor = _glClearColor;

/** @suppress {duplicate } */ var _glClearDepthf = x0 => GLctx.clearDepth(x0);

var _emscripten_glClearDepthf = _glClearDepthf;

/** @suppress {duplicate } */ var _glClearStencil = x0 => GLctx.clearStencil(x0);

var _emscripten_glClearStencil = _glClearStencil;

/** @suppress {duplicate } */ var _glColorMask = (red, green, blue, alpha) => {
 GLctx.colorMask(!!red, !!green, !!blue, !!alpha);
};

var _emscripten_glColorMask = _glColorMask;

/** @suppress {duplicate } */ var _glCompileShader = shader => {
 GLctx.compileShader(GL.shaders[shader]);
};

var _emscripten_glCompileShader = _glCompileShader;

/** @suppress {duplicate } */ var _glCompressedTexImage2D = (target, level, internalFormat, width, height, border, imageSize, data) => {
 if (GL.currentContext.version >= 2) {
  if (GLctx.currentPixelUnpackBufferBinding || !imageSize) {
   GLctx.compressedTexImage2D(target, level, internalFormat, width, height, border, imageSize, data);
   return;
  }
  GLctx.compressedTexImage2D(target, level, internalFormat, width, height, border, GROWABLE_HEAP_U8(), data, imageSize);
  return;
 }
 GLctx.compressedTexImage2D(target, level, internalFormat, width, height, border, data ? GROWABLE_HEAP_U8().subarray((data), data + imageSize) : null);
};

var _emscripten_glCompressedTexImage2D = _glCompressedTexImage2D;

/** @suppress {duplicate } */ var _glCompressedTexImage3D = (target, level, internalFormat, width, height, depth, border, imageSize, data) => {
 if (GLctx.currentPixelUnpackBufferBinding) {
  GLctx.compressedTexImage3D(target, level, internalFormat, width, height, depth, border, imageSize, data);
 } else {
  GLctx.compressedTexImage3D(target, level, internalFormat, width, height, depth, border, GROWABLE_HEAP_U8(), data, imageSize);
 }
};

var _emscripten_glCompressedTexImage3D = _glCompressedTexImage3D;

/** @suppress {duplicate } */ var _glCompressedTexSubImage3D = (target, level, xoffset, yoffset, zoffset, width, height, depth, format, imageSize, data) => {
 if (GLctx.currentPixelUnpackBufferBinding) {
  GLctx.compressedTexSubImage3D(target, level, xoffset, yoffset, zoffset, width, height, depth, format, imageSize, data);
 } else {
  GLctx.compressedTexSubImage3D(target, level, xoffset, yoffset, zoffset, width, height, depth, format, GROWABLE_HEAP_U8(), data, imageSize);
 }
};

var _emscripten_glCompressedTexSubImage3D = _glCompressedTexSubImage3D;

/** @suppress {duplicate } */ var _glCopyBufferSubData = (x0, x1, x2, x3, x4) => GLctx.copyBufferSubData(x0, x1, x2, x3, x4);

var _emscripten_glCopyBufferSubData = _glCopyBufferSubData;

/** @suppress {duplicate } */ var _glCreateProgram = () => {
 var id = GL.getNewId(GL.programs);
 var program = GLctx.createProgram();
 program.name = id;
 program.maxUniformLength = program.maxAttributeLength = program.maxUniformBlockNameLength = 0;
 program.uniformIdCounter = 1;
 GL.programs[id] = program;
 return id;
};

var _emscripten_glCreateProgram = _glCreateProgram;

/** @suppress {duplicate } */ var _glCreateShader = shaderType => {
 var id = GL.getNewId(GL.shaders);
 GL.shaders[id] = GLctx.createShader(shaderType);
 return id;
};

var _emscripten_glCreateShader = _glCreateShader;

/** @suppress {duplicate } */ var _glCullFace = x0 => GLctx.cullFace(x0);

var _emscripten_glCullFace = _glCullFace;

/** @suppress {duplicate } */ var _glDeleteBuffers = (n, buffers) => {
 for (var i = 0; i < n; i++) {
  var id = GROWABLE_HEAP_I32()[(((buffers) + (i * 4)) >> 2)];
  var buffer = GL.buffers[id];
  if (!buffer) continue;
  GLctx.deleteBuffer(buffer);
  buffer.name = 0;
  GL.buffers[id] = null;
  if (id == GLctx.currentPixelPackBufferBinding) GLctx.currentPixelPackBufferBinding = 0;
  if (id == GLctx.currentPixelUnpackBufferBinding) GLctx.currentPixelUnpackBufferBinding = 0;
 }
};

var _emscripten_glDeleteBuffers = _glDeleteBuffers;

/** @suppress {duplicate } */ var _glDeleteFramebuffers = (n, framebuffers) => {
 for (var i = 0; i < n; ++i) {
  var id = GROWABLE_HEAP_I32()[(((framebuffers) + (i * 4)) >> 2)];
  var framebuffer = GL.framebuffers[id];
  if (!framebuffer) continue;
  GLctx.deleteFramebuffer(framebuffer);
  framebuffer.name = 0;
  GL.framebuffers[id] = null;
 }
};

var _emscripten_glDeleteFramebuffers = _glDeleteFramebuffers;

/** @suppress {duplicate } */ var _glDeleteProgram = id => {
 if (!id) return;
 var program = GL.programs[id];
 if (!program) {
  GL.recordError(1281);
  /* GL_INVALID_VALUE */ return;
 }
 GLctx.deleteProgram(program);
 program.name = 0;
 GL.programs[id] = null;
};

var _emscripten_glDeleteProgram = _glDeleteProgram;

/** @suppress {duplicate } */ var _glDeleteQueries = (n, ids) => {
 for (var i = 0; i < n; i++) {
  var id = GROWABLE_HEAP_I32()[(((ids) + (i * 4)) >> 2)];
  var query = GL.queries[id];
  if (!query) continue;
  GLctx.deleteQuery(query);
  GL.queries[id] = null;
 }
};

var _emscripten_glDeleteQueries = _glDeleteQueries;

/** @suppress {duplicate } */ var _glDeleteRenderbuffers = (n, renderbuffers) => {
 for (var i = 0; i < n; i++) {
  var id = GROWABLE_HEAP_I32()[(((renderbuffers) + (i * 4)) >> 2)];
  var renderbuffer = GL.renderbuffers[id];
  if (!renderbuffer) continue;
  GLctx.deleteRenderbuffer(renderbuffer);
  renderbuffer.name = 0;
  GL.renderbuffers[id] = null;
 }
};

var _emscripten_glDeleteRenderbuffers = _glDeleteRenderbuffers;

/** @suppress {duplicate } */ var _glDeleteShader = id => {
 if (!id) return;
 var shader = GL.shaders[id];
 if (!shader) {
  GL.recordError(1281);
  /* GL_INVALID_VALUE */ return;
 }
 GLctx.deleteShader(shader);
 GL.shaders[id] = null;
};

var _emscripten_glDeleteShader = _glDeleteShader;

/** @suppress {duplicate } */ var _glDeleteSync = id => {
 if (!id) return;
 var sync = GL.syncs[id];
 if (!sync) {
  GL.recordError(1281);
  /* GL_INVALID_VALUE */ return;
 }
 GLctx.deleteSync(sync);
 sync.name = 0;
 GL.syncs[id] = null;
};

var _emscripten_glDeleteSync = _glDeleteSync;

/** @suppress {duplicate } */ var _glDeleteTextures = (n, textures) => {
 for (var i = 0; i < n; i++) {
  var id = GROWABLE_HEAP_I32()[(((textures) + (i * 4)) >> 2)];
  var texture = GL.textures[id];
  if (!texture) continue;
  GLctx.deleteTexture(texture);
  texture.name = 0;
  GL.textures[id] = null;
 }
};

var _emscripten_glDeleteTextures = _glDeleteTextures;

/** @suppress {duplicate } */ var _glDeleteVertexArrays = (n, vaos) => {
 for (var i = 0; i < n; i++) {
  var id = GROWABLE_HEAP_I32()[(((vaos) + (i * 4)) >> 2)];
  GLctx.deleteVertexArray(GL.vaos[id]);
  GL.vaos[id] = null;
 }
};

var _emscripten_glDeleteVertexArrays = _glDeleteVertexArrays;

/** @suppress {duplicate } */ var _glDepthFunc = x0 => GLctx.depthFunc(x0);

var _emscripten_glDepthFunc = _glDepthFunc;

/** @suppress {duplicate } */ var _glDepthMask = flag => {
 GLctx.depthMask(!!flag);
};

var _emscripten_glDepthMask = _glDepthMask;

/** @suppress {duplicate } */ var _glDisable = x0 => GLctx.disable(x0);

var _emscripten_glDisable = _glDisable;

/** @suppress {duplicate } */ var _glDisableVertexAttribArray = index => {
 GLctx.disableVertexAttribArray(index);
};

var _emscripten_glDisableVertexAttribArray = _glDisableVertexAttribArray;

/** @suppress {duplicate } */ var _glDrawArrays = (mode, first, count) => {
 GLctx.drawArrays(mode, first, count);
};

var _emscripten_glDrawArrays = _glDrawArrays;

/** @suppress {duplicate } */ var _glDrawArraysInstanced = (mode, first, count, primcount) => {
 GLctx.drawArraysInstanced(mode, first, count, primcount);
};

var _emscripten_glDrawArraysInstanced = _glDrawArraysInstanced;

var tempFixedLengthArray = [];

/** @suppress {duplicate } */ var _glDrawBuffers = (n, bufs) => {
 var bufArray = tempFixedLengthArray[n];
 for (var i = 0; i < n; i++) {
  bufArray[i] = GROWABLE_HEAP_I32()[(((bufs) + (i * 4)) >> 2)];
 }
 GLctx.drawBuffers(bufArray);
};

var _emscripten_glDrawBuffers = _glDrawBuffers;

/** @suppress {duplicate } */ var _glDrawElements = (mode, count, type, indices) => {
 GLctx.drawElements(mode, count, type, indices);
};

var _emscripten_glDrawElements = _glDrawElements;

/** @suppress {duplicate } */ var _glDrawElementsInstanced = (mode, count, type, indices, primcount) => {
 GLctx.drawElementsInstanced(mode, count, type, indices, primcount);
};

var _emscripten_glDrawElementsInstanced = _glDrawElementsInstanced;

/** @suppress {duplicate } */ var _glEnable = x0 => GLctx.enable(x0);

var _emscripten_glEnable = _glEnable;

/** @suppress {duplicate } */ var _glEnableVertexAttribArray = index => {
 GLctx.enableVertexAttribArray(index);
};

var _emscripten_glEnableVertexAttribArray = _glEnableVertexAttribArray;

/** @suppress {duplicate } */ var _glEndTransformFeedback = () => GLctx.endTransformFeedback();

var _emscripten_glEndTransformFeedback = _glEndTransformFeedback;

/** @suppress {duplicate } */ var _glFenceSync = (condition, flags) => {
 var sync = GLctx.fenceSync(condition, flags);
 if (sync) {
  var id = GL.getNewId(GL.syncs);
  sync.name = id;
  GL.syncs[id] = sync;
  return id;
 }
 return 0;
};

var _emscripten_glFenceSync = _glFenceSync;

/** @suppress {duplicate } */ var _glFinish = () => GLctx.finish();

var _emscripten_glFinish = _glFinish;

/** @suppress {duplicate } */ var _glFramebufferRenderbuffer = (target, attachment, renderbuffertarget, renderbuffer) => {
 GLctx.framebufferRenderbuffer(target, attachment, renderbuffertarget, GL.renderbuffers[renderbuffer]);
};

var _emscripten_glFramebufferRenderbuffer = _glFramebufferRenderbuffer;

/** @suppress {duplicate } */ var _glFramebufferTexture2D = (target, attachment, textarget, texture, level) => {
 GLctx.framebufferTexture2D(target, attachment, textarget, GL.textures[texture], level);
};

var _emscripten_glFramebufferTexture2D = _glFramebufferTexture2D;

/** @suppress {duplicate } */ var _glFramebufferTextureLayer = (target, attachment, texture, level, layer) => {
 GLctx.framebufferTextureLayer(target, attachment, GL.textures[texture], level, layer);
};

var _emscripten_glFramebufferTextureLayer = _glFramebufferTextureLayer;

/** @suppress {duplicate } */ var _glFrontFace = x0 => GLctx.frontFace(x0);

var _emscripten_glFrontFace = _glFrontFace;

/** @suppress {duplicate } */ var _glGenBuffers = (n, buffers) => {
 GL.genObject(n, buffers, "createBuffer", GL.buffers);
};

var _emscripten_glGenBuffers = _glGenBuffers;

/** @suppress {duplicate } */ var _glGenFramebuffers = (n, ids) => {
 GL.genObject(n, ids, "createFramebuffer", GL.framebuffers);
};

var _emscripten_glGenFramebuffers = _glGenFramebuffers;

/** @suppress {duplicate } */ var _glGenQueries = (n, ids) => {
 GL.genObject(n, ids, "createQuery", GL.queries);
};

var _emscripten_glGenQueries = _glGenQueries;

/** @suppress {duplicate } */ var _glGenRenderbuffers = (n, renderbuffers) => {
 GL.genObject(n, renderbuffers, "createRenderbuffer", GL.renderbuffers);
};

var _emscripten_glGenRenderbuffers = _glGenRenderbuffers;

/** @suppress {duplicate } */ var _glGenTextures = (n, textures) => {
 GL.genObject(n, textures, "createTexture", GL.textures);
};

var _emscripten_glGenTextures = _glGenTextures;

/** @suppress {duplicate } */ var _glGenVertexArrays = (n, arrays) => {
 GL.genObject(n, arrays, "createVertexArray", GL.vaos);
};

var _emscripten_glGenVertexArrays = _glGenVertexArrays;

/** @suppress {duplicate } */ var _glGenerateMipmap = x0 => GLctx.generateMipmap(x0);

var _emscripten_glGenerateMipmap = _glGenerateMipmap;

var writeI53ToI64 = (ptr, num) => {
 GROWABLE_HEAP_U32()[((ptr) >> 2)] = num;
 var lower = GROWABLE_HEAP_U32()[((ptr) >> 2)];
 GROWABLE_HEAP_U32()[(((ptr) + (4)) >> 2)] = (num - lower) / 4294967296;
};

var webglGetExtensions = function $webglGetExtensions() {
 var exts = getEmscriptenSupportedExtensions(GLctx);
 exts = exts.concat(exts.map(e => "GL_" + e));
 return exts;
};

var emscriptenWebGLGet = (name_, p, type) => {
 if (!p) {
  GL.recordError(1281);
  /* GL_INVALID_VALUE */ return;
 }
 var ret = undefined;
 switch (name_) {
 case 36346:
  ret = 1;
  break;

 case 36344:
  if (type != 0 && type != 1) {
   GL.recordError(1280);
  }
  return;

 case 34814:
 case 36345:
  ret = 0;
  break;

 case 34466:
  var formats = GLctx.getParameter(34467);
  /*GL_COMPRESSED_TEXTURE_FORMATS*/ ret = formats ? formats.length : 0;
  break;

 case 33309:
  if (GL.currentContext.version < 2) {
   GL.recordError(1282);
   /* GL_INVALID_OPERATION */ return;
  }
  ret = webglGetExtensions().length;
  break;

 case 33307:
 case 33308:
  if (GL.currentContext.version < 2) {
   GL.recordError(1280);
   return;
  }
  ret = name_ == 33307 ? 3 : 0;
  break;
 }
 if (ret === undefined) {
  var result = GLctx.getParameter(name_);
  switch (typeof result) {
  case "number":
   ret = result;
   break;

  case "boolean":
   ret = result ? 1 : 0;
   break;

  case "string":
   GL.recordError(1280);
   return;

  case "object":
   if (result === null) {
    switch (name_) {
    case 34964:
    case 35725:
    case 34965:
    case 36006:
    case 36007:
    case 32873:
    case 34229:
    case 36662:
    case 36663:
    case 35053:
    case 35055:
    case 36010:
    case 35097:
    case 35869:
    case 32874:
    case 36389:
    case 35983:
    case 35368:
    case 34068:
     {
      ret = 0;
      break;
     }

    default:
     {
      GL.recordError(1280);
      return;
     }
    }
   } else if (result instanceof Float32Array || result instanceof Uint32Array || result instanceof Int32Array || result instanceof Array) {
    for (var i = 0; i < result.length; ++i) {
     switch (type) {
     case 0:
      GROWABLE_HEAP_I32()[(((p) + (i * 4)) >> 2)] = result[i];
      break;

     case 2:
      GROWABLE_HEAP_F32()[(((p) + (i * 4)) >> 2)] = result[i];
      break;

     case 4:
      GROWABLE_HEAP_I8()[(p) + (i)] = result[i] ? 1 : 0;
      break;
     }
    }
    return;
   } else {
    try {
     ret = result.name | 0;
    } catch (e) {
     GL.recordError(1280);
     err(`GL_INVALID_ENUM in glGet${type}v: Unknown object returned from WebGL getParameter(${name_})! (error: ${e})`);
     return;
    }
   }
   break;

  default:
   GL.recordError(1280);
   err(`GL_INVALID_ENUM in glGet${type}v: Native code calling glGet${type}v(${name_}) and it returns ${result} of type ${typeof (result)}!`);
   return;
  }
 }
 switch (type) {
 case 1:
  writeI53ToI64(p, ret);
  break;

 case 0:
  GROWABLE_HEAP_I32()[((p) >> 2)] = ret;
  break;

 case 2:
  GROWABLE_HEAP_F32()[((p) >> 2)] = ret;
  break;

 case 4:
  GROWABLE_HEAP_I8()[p] = ret ? 1 : 0;
  break;
 }
};

/** @suppress {duplicate } */ var _glGetFloatv = (name_, p) => emscriptenWebGLGet(name_, p, 2);

var _emscripten_glGetFloatv = _glGetFloatv;

/** @suppress {duplicate } */ var _glGetInteger64v = (name_, p) => {
 emscriptenWebGLGet(name_, p, 1);
};

var _emscripten_glGetInteger64v = _glGetInteger64v;

/** @suppress {duplicate } */ var _glGetIntegerv = (name_, p) => emscriptenWebGLGet(name_, p, 0);

var _emscripten_glGetIntegerv = _glGetIntegerv;

/** @suppress {duplicate } */ var _glGetProgramInfoLog = (program, maxLength, length, infoLog) => {
 var log = GLctx.getProgramInfoLog(GL.programs[program]);
 if (log === null) log = "(unknown error)";
 var numBytesWrittenExclNull = (maxLength > 0 && infoLog) ? stringToUTF8(log, infoLog, maxLength) : 0;
 if (length) GROWABLE_HEAP_I32()[((length) >> 2)] = numBytesWrittenExclNull;
};

var _emscripten_glGetProgramInfoLog = _glGetProgramInfoLog;

/** @suppress {duplicate } */ var _glGetProgramiv = (program, pname, p) => {
 if (!p) {
  GL.recordError(1281);
  /* GL_INVALID_VALUE */ return;
 }
 if (program >= GL.counter) {
  GL.recordError(1281);
  /* GL_INVALID_VALUE */ return;
 }
 program = GL.programs[program];
 if (pname == 35716) {
  var log = GLctx.getProgramInfoLog(program);
  if (log === null) log = "(unknown error)";
  GROWABLE_HEAP_I32()[((p) >> 2)] = log.length + 1;
 } else if (pname == 35719) /* GL_ACTIVE_UNIFORM_MAX_LENGTH */ {
  if (!program.maxUniformLength) {
   for (var i = 0; i < GLctx.getProgramParameter(program, 35718); /*GL_ACTIVE_UNIFORMS*/ ++i) {
    program.maxUniformLength = Math.max(program.maxUniformLength, GLctx.getActiveUniform(program, i).name.length + 1);
   }
  }
  GROWABLE_HEAP_I32()[((p) >> 2)] = program.maxUniformLength;
 } else if (pname == 35722) /* GL_ACTIVE_ATTRIBUTE_MAX_LENGTH */ {
  if (!program.maxAttributeLength) {
   for (var i = 0; i < GLctx.getProgramParameter(program, 35721); /*GL_ACTIVE_ATTRIBUTES*/ ++i) {
    program.maxAttributeLength = Math.max(program.maxAttributeLength, GLctx.getActiveAttrib(program, i).name.length + 1);
   }
  }
  GROWABLE_HEAP_I32()[((p) >> 2)] = program.maxAttributeLength;
 } else if (pname == 35381) /* GL_ACTIVE_UNIFORM_BLOCK_MAX_NAME_LENGTH */ {
  if (!program.maxUniformBlockNameLength) {
   for (var i = 0; i < GLctx.getProgramParameter(program, 35382); /*GL_ACTIVE_UNIFORM_BLOCKS*/ ++i) {
    program.maxUniformBlockNameLength = Math.max(program.maxUniformBlockNameLength, GLctx.getActiveUniformBlockName(program, i).length + 1);
   }
  }
  GROWABLE_HEAP_I32()[((p) >> 2)] = program.maxUniformBlockNameLength;
 } else {
  GROWABLE_HEAP_I32()[((p) >> 2)] = GLctx.getProgramParameter(program, pname);
 }
};

var _emscripten_glGetProgramiv = _glGetProgramiv;

/** @suppress {duplicate } */ var _glGetShaderInfoLog = (shader, maxLength, length, infoLog) => {
 var log = GLctx.getShaderInfoLog(GL.shaders[shader]);
 if (log === null) log = "(unknown error)";
 var numBytesWrittenExclNull = (maxLength > 0 && infoLog) ? stringToUTF8(log, infoLog, maxLength) : 0;
 if (length) GROWABLE_HEAP_I32()[((length) >> 2)] = numBytesWrittenExclNull;
};

var _emscripten_glGetShaderInfoLog = _glGetShaderInfoLog;

/** @suppress {duplicate } */ var _glGetShaderiv = (shader, pname, p) => {
 if (!p) {
  GL.recordError(1281);
  /* GL_INVALID_VALUE */ return;
 }
 if (pname == 35716) {
  var log = GLctx.getShaderInfoLog(GL.shaders[shader]);
  if (log === null) log = "(unknown error)";
  var logLength = log ? log.length + 1 : 0;
  GROWABLE_HEAP_I32()[((p) >> 2)] = logLength;
 } else if (pname == 35720) {
  var source = GLctx.getShaderSource(GL.shaders[shader]);
  var sourceLength = source ? source.length + 1 : 0;
  GROWABLE_HEAP_I32()[((p) >> 2)] = sourceLength;
 } else {
  GROWABLE_HEAP_I32()[((p) >> 2)] = GLctx.getShaderParameter(GL.shaders[shader], pname);
 }
};

var _emscripten_glGetShaderiv = _glGetShaderiv;

var stringToNewUTF8 = str => {
 var size = lengthBytesUTF8(str) + 1;
 var ret = _malloc(size);
 if (ret) stringToUTF8(str, ret, size);
 return ret;
};

/** @suppress {duplicate } */ var _glGetString = name_ => {
 var ret = GL.stringCache[name_];
 if (!ret) {
  switch (name_) {
  case 7939:
   /* GL_EXTENSIONS */ ret = stringToNewUTF8(webglGetExtensions().join(" "));
   break;

  case 7936:
  /* GL_VENDOR */ case 7937:
  /* GL_RENDERER */ case 37445:
  /* UNMASKED_VENDOR_WEBGL */ case 37446:
   /* UNMASKED_RENDERER_WEBGL */ var s = GLctx.getParameter(name_);
   if (!s) {
    GL.recordError(1280);
   }
   ret = s ? stringToNewUTF8(s) : 0;
   break;

  case 7938:
   /* GL_VERSION */ var glVersion = GLctx.getParameter(7938);
   if (GL.currentContext.version >= 2) glVersion = `OpenGL ES 3.0 (${glVersion})`; else {
    glVersion = `OpenGL ES 2.0 (${glVersion})`;
   }
   ret = stringToNewUTF8(glVersion);
   break;

  case 35724:
   /* GL_SHADING_LANGUAGE_VERSION */ var glslVersion = GLctx.getParameter(35724);
   var ver_re = /^WebGL GLSL ES ([0-9]\.[0-9][0-9]?)(?:$| .*)/;
   var ver_num = glslVersion.match(ver_re);
   if (ver_num !== null) {
    if (ver_num[1].length == 3) ver_num[1] = ver_num[1] + "0";
    glslVersion = `OpenGL ES GLSL ES ${ver_num[1]} (${glslVersion})`;
   }
   ret = stringToNewUTF8(glslVersion);
   break;

  default:
   GL.recordError(1280);
  }
  GL.stringCache[name_] = ret;
 }
 return ret;
};

var _emscripten_glGetString = _glGetString;

/** @suppress {duplicate } */ var _glGetSynciv = (sync, pname, bufSize, length, values) => {
 if (bufSize < 0) {
  GL.recordError(1281);
  /* GL_INVALID_VALUE */ return;
 }
 if (!values) {
  GL.recordError(1281);
  /* GL_INVALID_VALUE */ return;
 }
 var ret = GLctx.getSyncParameter(GL.syncs[sync], pname);
 if (ret !== null) {
  GROWABLE_HEAP_I32()[((values) >> 2)] = ret;
  if (length) GROWABLE_HEAP_I32()[((length) >> 2)] = 1;
 }
};

var _emscripten_glGetSynciv = _glGetSynciv;

/** @suppress {duplicate } */ var _glGetUniformBlockIndex = (program, uniformBlockName) => GLctx.getUniformBlockIndex(GL.programs[program], UTF8ToString(uniformBlockName));

var _emscripten_glGetUniformBlockIndex = _glGetUniformBlockIndex;

/** @noinline */ var webglGetLeftBracePos = name => name.slice(-1) == "]" && name.lastIndexOf("[");

var webglPrepareUniformLocationsBeforeFirstUse = program => {
 var uniformLocsById = program.uniformLocsById,  uniformSizeAndIdsByName = program.uniformSizeAndIdsByName,  i, j;
 if (!uniformLocsById) {
  program.uniformLocsById = uniformLocsById = {};
  program.uniformArrayNamesById = {};
  for (i = 0; i < GLctx.getProgramParameter(program, 35718); /*GL_ACTIVE_UNIFORMS*/ ++i) {
   var u = GLctx.getActiveUniform(program, i);
   var nm = u.name;
   var sz = u.size;
   var lb = webglGetLeftBracePos(nm);
   var arrayName = lb > 0 ? nm.slice(0, lb) : nm;
   var id = program.uniformIdCounter;
   program.uniformIdCounter += sz;
   uniformSizeAndIdsByName[arrayName] = [ sz, id ];
   for (j = 0; j < sz; ++j) {
    uniformLocsById[id] = j;
    program.uniformArrayNamesById[id++] = arrayName;
   }
  }
 }
};

/** @suppress {duplicate } */ var _glGetUniformLocation = (program, name) => {
 name = UTF8ToString(name);
 if (program = GL.programs[program]) {
  webglPrepareUniformLocationsBeforeFirstUse(program);
  var uniformLocsById = program.uniformLocsById;
  var arrayIndex = 0;
  var uniformBaseName = name;
  var leftBrace = webglGetLeftBracePos(name);
  if (leftBrace > 0) {
   arrayIndex = jstoi_q(name.slice(leftBrace + 1)) >>> 0;
   uniformBaseName = name.slice(0, leftBrace);
  }
  var sizeAndId = program.uniformSizeAndIdsByName[uniformBaseName];
  if (sizeAndId && arrayIndex < sizeAndId[0]) {
   arrayIndex += sizeAndId[1];
   if ((uniformLocsById[arrayIndex] = uniformLocsById[arrayIndex] || GLctx.getUniformLocation(program, name))) {
    return arrayIndex;
   }
  }
 } else {
  GL.recordError(1281);
 }
 /* GL_INVALID_VALUE */ return -1;
};

var _emscripten_glGetUniformLocation = _glGetUniformLocation;

/** @suppress {duplicate } */ var _glLinkProgram = program => {
 program = GL.programs[program];
 GLctx.linkProgram(program);
 program.uniformLocsById = 0;
 program.uniformSizeAndIdsByName = {};
};

var _emscripten_glLinkProgram = _glLinkProgram;

/** @suppress {duplicate } */ var _glPixelStorei = (pname, param) => {
 if (pname == 3317) /* GL_UNPACK_ALIGNMENT */ {
  GL.unpackAlignment = param;
 }
 GLctx.pixelStorei(pname, param);
};

var _emscripten_glPixelStorei = _glPixelStorei;

/** @suppress {duplicate } */ var _glReadBuffer = x0 => GLctx.readBuffer(x0);

var _emscripten_glReadBuffer = _glReadBuffer;

var computeUnpackAlignedImageSize = (width, height, sizePerPixel, alignment) => {
 function roundedToNextMultipleOf(x, y) {
  return (x + y - 1) & -y;
 }
 var plainRowSize = width * sizePerPixel;
 var alignedRowSize = roundedToNextMultipleOf(plainRowSize, alignment);
 return height * alignedRowSize;
};

var colorChannelsInGlTextureFormat = format => {
 var colorChannels = {
  5: 3,
  6: 4,
  8: 2,
  29502: 3,
  29504: 4,
  26917: 2,
  26918: 2,
  29846: 3,
  29847: 4
 };
 return colorChannels[format - 6402] || 1;
};

var heapObjectForWebGLType = type => {
 type -= 5120;
 if (type == 0) return GROWABLE_HEAP_I8();
 if (type == 1) return GROWABLE_HEAP_U8();
 if (type == 2) return GROWABLE_HEAP_I16();
 if (type == 4) return GROWABLE_HEAP_I32();
 if (type == 6) return GROWABLE_HEAP_F32();
 if (type == 5 || type == 28922 || type == 28520 || type == 30779 || type == 30782) return GROWABLE_HEAP_U32();
 return GROWABLE_HEAP_U16();
};

var toTypedArrayIndex = (pointer, heap) => pointer >>> (31 - Math.clz32(heap.BYTES_PER_ELEMENT));

var emscriptenWebGLGetTexPixelData = (type, format, width, height, pixels, internalFormat) => {
 var heap = heapObjectForWebGLType(type);
 var sizePerPixel = colorChannelsInGlTextureFormat(format) * heap.BYTES_PER_ELEMENT;
 var bytes = computeUnpackAlignedImageSize(width, height, sizePerPixel, GL.unpackAlignment);
 return heap.subarray(toTypedArrayIndex(pixels, heap), toTypedArrayIndex(pixels + bytes, heap));
};

/** @suppress {duplicate } */ var _glReadPixels = (x, y, width, height, format, type, pixels) => {
 if (GL.currentContext.version >= 2) {
  if (GLctx.currentPixelPackBufferBinding) {
   GLctx.readPixels(x, y, width, height, format, type, pixels);
   return;
  }
  var heap = heapObjectForWebGLType(type);
  var target = toTypedArrayIndex(pixels, heap);
  GLctx.readPixels(x, y, width, height, format, type, heap, target);
  return;
 }
 var pixelData = emscriptenWebGLGetTexPixelData(type, format, width, height, pixels, format);
 if (!pixelData) {
  GL.recordError(1280);
  /*GL_INVALID_ENUM*/ return;
 }
 GLctx.readPixels(x, y, width, height, format, type, pixelData);
};

var _emscripten_glReadPixels = _glReadPixels;

/** @suppress {duplicate } */ var _glRenderbufferStorage = (x0, x1, x2, x3) => GLctx.renderbufferStorage(x0, x1, x2, x3);

var _emscripten_glRenderbufferStorage = _glRenderbufferStorage;

/** @suppress {duplicate } */ var _glRenderbufferStorageMultisample = (x0, x1, x2, x3, x4) => GLctx.renderbufferStorageMultisample(x0, x1, x2, x3, x4);

var _emscripten_glRenderbufferStorageMultisample = _glRenderbufferStorageMultisample;

/** @suppress {duplicate } */ var _glScissor = (x0, x1, x2, x3) => GLctx.scissor(x0, x1, x2, x3);

var _emscripten_glScissor = _glScissor;

/** @suppress {duplicate } */ var _glShaderSource = (shader, count, string, length) => {
 var source = GL.getSource(shader, count, string, length);
 GLctx.shaderSource(GL.shaders[shader], source);
};

var _emscripten_glShaderSource = _glShaderSource;

/** @suppress {duplicate } */ var _glStencilFunc = (x0, x1, x2) => GLctx.stencilFunc(x0, x1, x2);

var _emscripten_glStencilFunc = _glStencilFunc;

/** @suppress {duplicate } */ var _glStencilMask = x0 => GLctx.stencilMask(x0);

var _emscripten_glStencilMask = _glStencilMask;

/** @suppress {duplicate } */ var _glStencilOp = (x0, x1, x2) => GLctx.stencilOp(x0, x1, x2);

var _emscripten_glStencilOp = _glStencilOp;

/** @suppress {duplicate } */ var _glTexImage2D = (target, level, internalFormat, width, height, border, format, type, pixels) => {
 if (GL.currentContext.version >= 2) {
  if (GLctx.currentPixelUnpackBufferBinding) {
   GLctx.texImage2D(target, level, internalFormat, width, height, border, format, type, pixels);
   return;
  }
  if (pixels) {
   var heap = heapObjectForWebGLType(type);
   var index = toTypedArrayIndex(pixels, heap);
   GLctx.texImage2D(target, level, internalFormat, width, height, border, format, type, heap, index);
   return;
  }
 }
 var pixelData = pixels ? emscriptenWebGLGetTexPixelData(type, format, width, height, pixels, internalFormat) : null;
 GLctx.texImage2D(target, level, internalFormat, width, height, border, format, type, pixelData);
};

var _emscripten_glTexImage2D = _glTexImage2D;

/** @suppress {duplicate } */ var _glTexImage3D = (target, level, internalFormat, width, height, depth, border, format, type, pixels) => {
 if (GLctx.currentPixelUnpackBufferBinding) {
  GLctx.texImage3D(target, level, internalFormat, width, height, depth, border, format, type, pixels);
 } else if (pixels) {
  var heap = heapObjectForWebGLType(type);
  GLctx.texImage3D(target, level, internalFormat, width, height, depth, border, format, type, heap, toTypedArrayIndex(pixels, heap));
 } else {
  GLctx.texImage3D(target, level, internalFormat, width, height, depth, border, format, type, null);
 }
};

var _emscripten_glTexImage3D = _glTexImage3D;

/** @suppress {duplicate } */ var _glTexParameterf = (x0, x1, x2) => GLctx.texParameterf(x0, x1, x2);

var _emscripten_glTexParameterf = _glTexParameterf;

/** @suppress {duplicate } */ var _glTexParameteri = (x0, x1, x2) => GLctx.texParameteri(x0, x1, x2);

var _emscripten_glTexParameteri = _glTexParameteri;

/** @suppress {duplicate } */ var _glTexStorage2D = (x0, x1, x2, x3, x4) => GLctx.texStorage2D(x0, x1, x2, x3, x4);

var _emscripten_glTexStorage2D = _glTexStorage2D;

/** @suppress {duplicate } */ var _glTexSubImage3D = (target, level, xoffset, yoffset, zoffset, width, height, depth, format, type, pixels) => {
 if (GLctx.currentPixelUnpackBufferBinding) {
  GLctx.texSubImage3D(target, level, xoffset, yoffset, zoffset, width, height, depth, format, type, pixels);
 } else if (pixels) {
  var heap = heapObjectForWebGLType(type);
  GLctx.texSubImage3D(target, level, xoffset, yoffset, zoffset, width, height, depth, format, type, heap, toTypedArrayIndex(pixels, heap));
 } else {
  GLctx.texSubImage3D(target, level, xoffset, yoffset, zoffset, width, height, depth, format, type, null);
 }
};

var _emscripten_glTexSubImage3D = _glTexSubImage3D;

/** @suppress {duplicate } */ var _glTransformFeedbackVaryings = (program, count, varyings, bufferMode) => {
 program = GL.programs[program];
 var vars = [];
 for (var i = 0; i < count; i++) vars.push(UTF8ToString(GROWABLE_HEAP_I32()[(((varyings) + (i * 4)) >> 2)]));
 GLctx.transformFeedbackVaryings(program, vars, bufferMode);
};

var _emscripten_glTransformFeedbackVaryings = _glTransformFeedbackVaryings;

var webglGetUniformLocation = location => {
 var p = GLctx.currentProgram;
 if (p) {
  var webglLoc = p.uniformLocsById[location];
  if (typeof webglLoc == "number") {
   p.uniformLocsById[location] = webglLoc = GLctx.getUniformLocation(p, p.uniformArrayNamesById[location] + (webglLoc > 0 ? `[${webglLoc}]` : ""));
  }
  return webglLoc;
 } else {
  GL.recordError(1282);
 }
};

/** @suppress {duplicate } */ var _glUniform1f = (location, v0) => {
 GLctx.uniform1f(webglGetUniformLocation(location), v0);
};

var _emscripten_glUniform1f = _glUniform1f;

/** @suppress {duplicate } */ var _glUniform1i = (location, v0) => {
 GLctx.uniform1i(webglGetUniformLocation(location), v0);
};

var _emscripten_glUniform1i = _glUniform1i;

var miniTempWebGLIntBuffers = [];

/** @suppress {duplicate } */ var _glUniform1iv = (location, count, value) => {
 if (GL.currentContext.version >= 2) {
  count && GLctx.uniform1iv(webglGetUniformLocation(location), GROWABLE_HEAP_I32(), ((value) >> 2), count);
  return;
 }
 if (count <= 288) {
  var view = miniTempWebGLIntBuffers[count - 1];
  for (var i = 0; i < count; ++i) {
   view[i] = GROWABLE_HEAP_I32()[(((value) + (4 * i)) >> 2)];
  }
 } else {
  var view = GROWABLE_HEAP_I32().subarray((((value) >> 2)), ((value + count * 4) >> 2));
 }
 GLctx.uniform1iv(webglGetUniformLocation(location), view);
};

var _emscripten_glUniform1iv = _glUniform1iv;

/** @suppress {duplicate } */ var _glUniform1ui = (location, v0) => {
 GLctx.uniform1ui(webglGetUniformLocation(location), v0);
};

var _emscripten_glUniform1ui = _glUniform1ui;

/** @suppress {duplicate } */ var _glUniform1uiv = (location, count, value) => {
 count && GLctx.uniform1uiv(webglGetUniformLocation(location), GROWABLE_HEAP_U32(), ((value) >> 2), count);
};

var _emscripten_glUniform1uiv = _glUniform1uiv;

/** @suppress {duplicate } */ var _glUniform2f = (location, v0, v1) => {
 GLctx.uniform2f(webglGetUniformLocation(location), v0, v1);
};

var _emscripten_glUniform2f = _glUniform2f;

var miniTempWebGLFloatBuffers = [];

/** @suppress {duplicate } */ var _glUniform2fv = (location, count, value) => {
 if (GL.currentContext.version >= 2) {
  count && GLctx.uniform2fv(webglGetUniformLocation(location), GROWABLE_HEAP_F32(), ((value) >> 2), count * 2);
  return;
 }
 if (count <= 144) {
  var view = miniTempWebGLFloatBuffers[2 * count - 1];
  for (var i = 0; i < 2 * count; i += 2) {
   view[i] = GROWABLE_HEAP_F32()[(((value) + (4 * i)) >> 2)];
   view[i + 1] = GROWABLE_HEAP_F32()[(((value) + (4 * i + 4)) >> 2)];
  }
 } else {
  var view = GROWABLE_HEAP_F32().subarray((((value) >> 2)), ((value + count * 8) >> 2));
 }
 GLctx.uniform2fv(webglGetUniformLocation(location), view);
};

var _emscripten_glUniform2fv = _glUniform2fv;

/** @suppress {duplicate } */ var _glUniform2iv = (location, count, value) => {
 if (GL.currentContext.version >= 2) {
  count && GLctx.uniform2iv(webglGetUniformLocation(location), GROWABLE_HEAP_I32(), ((value) >> 2), count * 2);
  return;
 }
 if (count <= 144) {
  var view = miniTempWebGLIntBuffers[2 * count - 1];
  for (var i = 0; i < 2 * count; i += 2) {
   view[i] = GROWABLE_HEAP_I32()[(((value) + (4 * i)) >> 2)];
   view[i + 1] = GROWABLE_HEAP_I32()[(((value) + (4 * i + 4)) >> 2)];
  }
 } else {
  var view = GROWABLE_HEAP_I32().subarray((((value) >> 2)), ((value + count * 8) >> 2));
 }
 GLctx.uniform2iv(webglGetUniformLocation(location), view);
};

var _emscripten_glUniform2iv = _glUniform2iv;

/** @suppress {duplicate } */ var _glUniform3fv = (location, count, value) => {
 if (GL.currentContext.version >= 2) {
  count && GLctx.uniform3fv(webglGetUniformLocation(location), GROWABLE_HEAP_F32(), ((value) >> 2), count * 3);
  return;
 }
 if (count <= 96) {
  var view = miniTempWebGLFloatBuffers[3 * count - 1];
  for (var i = 0; i < 3 * count; i += 3) {
   view[i] = GROWABLE_HEAP_F32()[(((value) + (4 * i)) >> 2)];
   view[i + 1] = GROWABLE_HEAP_F32()[(((value) + (4 * i + 4)) >> 2)];
   view[i + 2] = GROWABLE_HEAP_F32()[(((value) + (4 * i + 8)) >> 2)];
  }
 } else {
  var view = GROWABLE_HEAP_F32().subarray((((value) >> 2)), ((value + count * 12) >> 2));
 }
 GLctx.uniform3fv(webglGetUniformLocation(location), view);
};

var _emscripten_glUniform3fv = _glUniform3fv;

/** @suppress {duplicate } */ var _glUniform4f = (location, v0, v1, v2, v3) => {
 GLctx.uniform4f(webglGetUniformLocation(location), v0, v1, v2, v3);
};

var _emscripten_glUniform4f = _glUniform4f;

/** @suppress {duplicate } */ var _glUniform4fv = (location, count, value) => {
 if (GL.currentContext.version >= 2) {
  count && GLctx.uniform4fv(webglGetUniformLocation(location), GROWABLE_HEAP_F32(), ((value) >> 2), count * 4);
  return;
 }
 if (count <= 72) {
  var view = miniTempWebGLFloatBuffers[4 * count - 1];
  var heap = GROWABLE_HEAP_F32();
  value = ((value) >> 2);
  for (var i = 0; i < 4 * count; i += 4) {
   var dst = value + i;
   view[i] = heap[dst];
   view[i + 1] = heap[dst + 1];
   view[i + 2] = heap[dst + 2];
   view[i + 3] = heap[dst + 3];
  }
 } else {
  var view = GROWABLE_HEAP_F32().subarray((((value) >> 2)), ((value + count * 16) >> 2));
 }
 GLctx.uniform4fv(webglGetUniformLocation(location), view);
};

var _emscripten_glUniform4fv = _glUniform4fv;

/** @suppress {duplicate } */ var _glUniformBlockBinding = (program, uniformBlockIndex, uniformBlockBinding) => {
 program = GL.programs[program];
 GLctx.uniformBlockBinding(program, uniformBlockIndex, uniformBlockBinding);
};

var _emscripten_glUniformBlockBinding = _glUniformBlockBinding;

/** @suppress {duplicate } */ var _glUniformMatrix3fv = (location, count, transpose, value) => {
 if (GL.currentContext.version >= 2) {
  count && GLctx.uniformMatrix3fv(webglGetUniformLocation(location), !!transpose, GROWABLE_HEAP_F32(), ((value) >> 2), count * 9);
  return;
 }
 if (count <= 32) {
  var view = miniTempWebGLFloatBuffers[9 * count - 1];
  for (var i = 0; i < 9 * count; i += 9) {
   view[i] = GROWABLE_HEAP_F32()[(((value) + (4 * i)) >> 2)];
   view[i + 1] = GROWABLE_HEAP_F32()[(((value) + (4 * i + 4)) >> 2)];
   view[i + 2] = GROWABLE_HEAP_F32()[(((value) + (4 * i + 8)) >> 2)];
   view[i + 3] = GROWABLE_HEAP_F32()[(((value) + (4 * i + 12)) >> 2)];
   view[i + 4] = GROWABLE_HEAP_F32()[(((value) + (4 * i + 16)) >> 2)];
   view[i + 5] = GROWABLE_HEAP_F32()[(((value) + (4 * i + 20)) >> 2)];
   view[i + 6] = GROWABLE_HEAP_F32()[(((value) + (4 * i + 24)) >> 2)];
   view[i + 7] = GROWABLE_HEAP_F32()[(((value) + (4 * i + 28)) >> 2)];
   view[i + 8] = GROWABLE_HEAP_F32()[(((value) + (4 * i + 32)) >> 2)];
  }
 } else {
  var view = GROWABLE_HEAP_F32().subarray((((value) >> 2)), ((value + count * 36) >> 2));
 }
 GLctx.uniformMatrix3fv(webglGetUniformLocation(location), !!transpose, view);
};

var _emscripten_glUniformMatrix3fv = _glUniformMatrix3fv;

/** @suppress {duplicate } */ var _glUniformMatrix4fv = (location, count, transpose, value) => {
 if (GL.currentContext.version >= 2) {
  count && GLctx.uniformMatrix4fv(webglGetUniformLocation(location), !!transpose, GROWABLE_HEAP_F32(), ((value) >> 2), count * 16);
  return;
 }
 if (count <= 18) {
  var view = miniTempWebGLFloatBuffers[16 * count - 1];
  var heap = GROWABLE_HEAP_F32();
  value = ((value) >> 2);
  for (var i = 0; i < 16 * count; i += 16) {
   var dst = value + i;
   view[i] = heap[dst];
   view[i + 1] = heap[dst + 1];
   view[i + 2] = heap[dst + 2];
   view[i + 3] = heap[dst + 3];
   view[i + 4] = heap[dst + 4];
   view[i + 5] = heap[dst + 5];
   view[i + 6] = heap[dst + 6];
   view[i + 7] = heap[dst + 7];
   view[i + 8] = heap[dst + 8];
   view[i + 9] = heap[dst + 9];
   view[i + 10] = heap[dst + 10];
   view[i + 11] = heap[dst + 11];
   view[i + 12] = heap[dst + 12];
   view[i + 13] = heap[dst + 13];
   view[i + 14] = heap[dst + 14];
   view[i + 15] = heap[dst + 15];
  }
 } else {
  var view = GROWABLE_HEAP_F32().subarray((((value) >> 2)), ((value + count * 64) >> 2));
 }
 GLctx.uniformMatrix4fv(webglGetUniformLocation(location), !!transpose, view);
};

var _emscripten_glUniformMatrix4fv = _glUniformMatrix4fv;

/** @suppress {duplicate } */ var _glUseProgram = program => {
 program = GL.programs[program];
 GLctx.useProgram(program);
 GLctx.currentProgram = program;
};

var _emscripten_glUseProgram = _glUseProgram;

/** @suppress {duplicate } */ var _glVertexAttrib4f = (x0, x1, x2, x3, x4) => GLctx.vertexAttrib4f(x0, x1, x2, x3, x4);

var _emscripten_glVertexAttrib4f = _glVertexAttrib4f;

/** @suppress {duplicate } */ var _glVertexAttribDivisor = (index, divisor) => {
 GLctx.vertexAttribDivisor(index, divisor);
};

var _emscripten_glVertexAttribDivisor = _glVertexAttribDivisor;

/** @suppress {duplicate } */ var _glVertexAttribI4ui = (x0, x1, x2, x3, x4) => GLctx.vertexAttribI4ui(x0, x1, x2, x3, x4);

var _emscripten_glVertexAttribI4ui = _glVertexAttribI4ui;

/** @suppress {duplicate } */ var _glVertexAttribIPointer = (index, size, type, stride, ptr) => {
 GLctx.vertexAttribIPointer(index, size, type, stride, ptr);
};

var _emscripten_glVertexAttribIPointer = _glVertexAttribIPointer;

/** @suppress {duplicate } */ var _glVertexAttribPointer = (index, size, type, normalized, stride, ptr) => {
 GLctx.vertexAttribPointer(index, size, type, !!normalized, stride, ptr);
};

var _emscripten_glVertexAttribPointer = _glVertexAttribPointer;

/** @suppress {duplicate } */ var _glViewport = (x0, x1, x2, x3) => GLctx.viewport(x0, x1, x2, x3);

var _emscripten_glViewport = _glViewport;

var _emscripten_num_logical_cores = () => navigator["hardwareConcurrency"];

var growMemory = size => {
 var b = wasmMemory.buffer;
 var pages = (size - b.byteLength + 65535) / 65536;
 try {
  wasmMemory.grow(pages);
  updateMemoryViews();
  return 1;
 } /*success*/ catch (e) {}
};

var _emscripten_resize_heap = requestedSize => {
 var oldSize = GROWABLE_HEAP_U8().length;
 requestedSize >>>= 0;
 if (requestedSize <= oldSize) {
  return false;
 }
 var maxHeapSize = getHeapMax();
 if (requestedSize > maxHeapSize) {
  return false;
 }
 var alignUp = (x, multiple) => x + (multiple - x % multiple) % multiple;
 for (var cutDown = 1; cutDown <= 4; cutDown *= 2) {
  var overGrownHeapSize = oldSize * (1 + .2 / cutDown);
  overGrownHeapSize = Math.min(overGrownHeapSize, requestedSize + 100663296);
  var newSize = Math.min(maxHeapSize, alignUp(Math.max(requestedSize, overGrownHeapSize), 65536));
  var replacement = growMemory(newSize);
  if (replacement) {
   return true;
  }
 }
 return false;
};

var JSEvents = {
 removeAllEventListeners() {
  while (JSEvents.eventHandlers.length) {
   JSEvents._removeHandler(JSEvents.eventHandlers.length - 1);
  }
  JSEvents.deferredCalls = [];
 },
 registerRemoveEventListeners() {
  if (!JSEvents.removeEventListenersRegistered) {
   __ATEXIT__.push(JSEvents.removeAllEventListeners);
   JSEvents.removeEventListenersRegistered = true;
  }
 },
 inEventHandler: 0,
 deferredCalls: [],
 deferCall(targetFunction, precedence, argsList) {
  function arraysHaveEqualContent(arrA, arrB) {
   if (arrA.length != arrB.length) return false;
   for (var i in arrA) {
    if (arrA[i] != arrB[i]) return false;
   }
   return true;
  }
  for (var i in JSEvents.deferredCalls) {
   var call = JSEvents.deferredCalls[i];
   if (call.targetFunction == targetFunction && arraysHaveEqualContent(call.argsList, argsList)) {
    return;
   }
  }
  JSEvents.deferredCalls.push({
   targetFunction: targetFunction,
   precedence: precedence,
   argsList: argsList
  });
  JSEvents.deferredCalls.sort((x, y) => x.precedence < y.precedence);
 },
 removeDeferredCalls(targetFunction) {
  for (var i = 0; i < JSEvents.deferredCalls.length; ++i) {
   if (JSEvents.deferredCalls[i].targetFunction == targetFunction) {
    JSEvents.deferredCalls.splice(i, 1);
    --i;
   }
  }
 },
 canPerformEventHandlerRequests() {
  if (navigator.userActivation) {
   return navigator.userActivation.isActive;
  }
  return JSEvents.inEventHandler && JSEvents.currentEventHandler.allowsDeferredCalls;
 },
 runDeferredCalls() {
  if (!JSEvents.canPerformEventHandlerRequests()) {
   return;
  }
  for (var i = 0; i < JSEvents.deferredCalls.length; ++i) {
   var call = JSEvents.deferredCalls[i];
   JSEvents.deferredCalls.splice(i, 1);
   --i;
   call.targetFunction(...call.argsList);
  }
 },
 eventHandlers: [],
 removeAllHandlersOnTarget: (target, eventTypeString) => {
  for (var i = 0; i < JSEvents.eventHandlers.length; ++i) {
   if (JSEvents.eventHandlers[i].target == target && (!eventTypeString || eventTypeString == JSEvents.eventHandlers[i].eventTypeString)) {
    JSEvents._removeHandler(i--);
   }
  }
 },
 _removeHandler(i) {
  var h = JSEvents.eventHandlers[i];
  h.target.removeEventListener(h.eventTypeString, h.eventListenerFunc, h.useCapture);
  JSEvents.eventHandlers.splice(i, 1);
 },
 registerOrRemoveHandler(eventHandler) {
  if (!eventHandler.target) {
   return -4;
  }
  if (eventHandler.callbackfunc) {
   eventHandler.eventListenerFunc = function(event) {
    ++JSEvents.inEventHandler;
    JSEvents.currentEventHandler = eventHandler;
    JSEvents.runDeferredCalls();
    eventHandler.handlerFunc(event);
    JSEvents.runDeferredCalls();
    --JSEvents.inEventHandler;
   };
   eventHandler.target.addEventListener(eventHandler.eventTypeString, eventHandler.eventListenerFunc, eventHandler.useCapture);
   JSEvents.eventHandlers.push(eventHandler);
   JSEvents.registerRemoveEventListeners();
  } else {
   for (var i = 0; i < JSEvents.eventHandlers.length; ++i) {
    if (JSEvents.eventHandlers[i].target == eventHandler.target && JSEvents.eventHandlers[i].eventTypeString == eventHandler.eventTypeString) {
     JSEvents._removeHandler(i--);
    }
   }
  }
  return 0;
 },
 getTargetThreadForEventCallback(targetThread) {
  switch (targetThread) {
  case 1:
   return 0;

  case 2:
   return PThread.currentProxiedOperationCallerThread;

  default:
   return targetThread;
  }
 },
 getNodeNameForTarget(target) {
  if (!target) return "";
  if (target == window) return "#window";
  if (target == screen) return "#screen";
  return target?.nodeName || "";
 },
 fullscreenEnabled() {
  return document.fullscreenEnabled ||  document.webkitFullscreenEnabled;
 }
};

var maybeCStringToJsString = cString => cString > 2 ? UTF8ToString(cString) : cString;

/** @type {Object} */ var specialHTMLTargets = [ 0, typeof document != "undefined" ? document : 0, typeof window != "undefined" ? window : 0 ];

/** @suppress {duplicate } */ var findEventTarget = target => {
 target = maybeCStringToJsString(target);
 var domElement = specialHTMLTargets[target] || (typeof document != "undefined" ? document.querySelector(target) : undefined);
 return domElement;
};

var findCanvasEventTarget = findEventTarget;

var setCanvasElementSizeCallingThread = (target, width, height) => {
 var canvas = findCanvasEventTarget(target);
 if (!canvas) return -4;
 if (!canvas.controlTransferredOffscreen) {
  var autoResizeViewport = false;
  if (canvas.GLctxObject?.GLctx) {
   var prevViewport = canvas.GLctxObject.GLctx.getParameter(2978);
   autoResizeViewport = (prevViewport[0] === 0 && prevViewport[1] === 0 && prevViewport[2] === canvas.width && prevViewport[3] === canvas.height);
  }
  canvas.width = width;
  canvas.height = height;
  if (autoResizeViewport) {
   canvas.GLctxObject.GLctx.viewport(0, 0, width, height);
  }
 } else {
  return -4;
 }
 if (canvas.GLctxObject) GL.resizeOffscreenFramebuffer(canvas.GLctxObject);
 return 0;
};

function setCanvasElementSizeMainThread(target, width, height) {
 if (ENVIRONMENT_IS_PTHREAD) return proxyToMainThread(35, 0, 1, target, width, height);
 return setCanvasElementSizeCallingThread(target, width, height);
}

var _emscripten_set_canvas_element_size = (target, width, height) => {
 var canvas = findCanvasEventTarget(target);
 if (canvas) {
  return setCanvasElementSizeCallingThread(target, width, height);
 }
 return setCanvasElementSizeMainThread(target, width, height);
};

var _emscripten_set_main_loop = (func, fps, simulateInfiniteLoop) => {
 var browserIterationFunc = getWasmTableEntry(func);
 setMainLoop(browserIterationFunc, fps, simulateInfiniteLoop);
};

var _emscripten_set_timeout = (cb, msecs, userData) => safeSetTimeout(() => getWasmTableEntry(cb)(userData), msecs);

var _emscripten_supports_offscreencanvas = () =>  0;

var _emscripten_unwind_to_js_event_loop = () => {
 throw "unwind";
};

function _emscripten_webgl_destroy_context(contextHandle) {
 if (ENVIRONMENT_IS_PTHREAD) return proxyToMainThread(36, 0, 1, contextHandle);
 if (GL.currentContext == contextHandle) GL.currentContext = 0;
 GL.deleteContext(contextHandle);
}

var _emscripten_webgl_do_commit_frame = () => {
 if (!GL.currentContext || !GL.currentContext.GLctx) {
  return -3;
 }
 if (GL.currentContext.defaultFbo) {
  GL.blitOffscreenFramebuffer(GL.currentContext);
  return 0;
 }
 if (!GL.currentContext.attributes.explicitSwapControl) {
  return -3;
 }
 return 0;
};

function _emscripten_webgl_create_context_proxied(target, attributes) {
 if (ENVIRONMENT_IS_PTHREAD) return proxyToMainThread(37, 0, 1, target, attributes);
 return _emscripten_webgl_do_create_context(target, attributes);
}

var webglPowerPreferences = [ "default", "low-power", "high-performance" ];

var _emscripten_webgl_do_create_context = (target, attributes) => {
 var a = ((attributes) >> 2);
 var powerPreference = GROWABLE_HEAP_I32()[a + (24 >> 2)];
 var contextAttributes = {
  "alpha": !!GROWABLE_HEAP_I32()[a + (0 >> 2)],
  "depth": !!GROWABLE_HEAP_I32()[a + (4 >> 2)],
  "stencil": !!GROWABLE_HEAP_I32()[a + (8 >> 2)],
  "antialias": !!GROWABLE_HEAP_I32()[a + (12 >> 2)],
  "premultipliedAlpha": !!GROWABLE_HEAP_I32()[a + (16 >> 2)],
  "preserveDrawingBuffer": !!GROWABLE_HEAP_I32()[a + (20 >> 2)],
  "powerPreference": webglPowerPreferences[powerPreference],
  "failIfMajorPerformanceCaveat": !!GROWABLE_HEAP_I32()[a + (28 >> 2)],
  majorVersion: GROWABLE_HEAP_I32()[a + (32 >> 2)],
  minorVersion: GROWABLE_HEAP_I32()[a + (36 >> 2)],
  enableExtensionsByDefault: GROWABLE_HEAP_I32()[a + (40 >> 2)],
  explicitSwapControl: GROWABLE_HEAP_I32()[a + (44 >> 2)],
  proxyContextToMainThread: GROWABLE_HEAP_I32()[a + (48 >> 2)],
  renderViaOffscreenBackBuffer: GROWABLE_HEAP_I32()[a + (52 >> 2)]
 };
 var canvas = findCanvasEventTarget(target);
 if (ENVIRONMENT_IS_PTHREAD) {
  if (contextAttributes.proxyContextToMainThread === 2 || (!canvas && contextAttributes.proxyContextToMainThread === 1)) {
   if (!_emscripten_supports_offscreencanvas()) {
    GROWABLE_HEAP_I32()[(((attributes) + (52)) >> 2)] = 1;
    GROWABLE_HEAP_I32()[(((attributes) + (20)) >> 2)] = 1;
   }
   return _emscripten_webgl_create_context_proxied(target, attributes);
  }
 }
 if (!canvas) {
  return 0;
 }
 if (contextAttributes.explicitSwapControl && !contextAttributes.renderViaOffscreenBackBuffer) {
  contextAttributes.renderViaOffscreenBackBuffer = true;
 }
 var contextHandle = GL.createContext(canvas, contextAttributes);
 return contextHandle;
};

function _emscripten_webgl_enable_extension(contextHandle, extension) {
 if (ENVIRONMENT_IS_PTHREAD) return proxyToMainThread(38, 0, 1, contextHandle, extension);
 var context = GL.getContext(contextHandle);
 var extString = UTF8ToString(extension);
 if (extString.startsWith("GL_")) extString = extString.substr(3);
 if (extString == "ANGLE_instanced_arrays") webgl_enable_ANGLE_instanced_arrays(GLctx);
 if (extString == "OES_vertex_array_object") webgl_enable_OES_vertex_array_object(GLctx);
 if (extString == "WEBGL_draw_buffers") webgl_enable_WEBGL_draw_buffers(GLctx);
 if (extString == "WEBGL_draw_instanced_base_vertex_base_instance") webgl_enable_WEBGL_draw_instanced_base_vertex_base_instance(GLctx);
 if (extString == "WEBGL_multi_draw_instanced_base_vertex_base_instance") webgl_enable_WEBGL_multi_draw_instanced_base_vertex_base_instance(GLctx);
 if (extString == "WEBGL_multi_draw") webgl_enable_WEBGL_multi_draw(GLctx);
 var ext = context.GLctx.getExtension(extString);
 return !!ext;
}

function _emscripten_webgl_get_supported_extensions() {
 if (ENVIRONMENT_IS_PTHREAD) return proxyToMainThread(39, 0, 1);
 return stringToNewUTF8(GLctx.getSupportedExtensions().join(" "));
}

var _emscripten_webgl_make_context_current_calling_thread = contextHandle => {
 var success = GL.makeContextCurrent(contextHandle);
 if (success) GL.currentContextIsProxied = false;
 return success ? 0 : -5;
};

var ENV = {};

var getExecutableName = () => thisProgram || "./this.program";

var getEnvStrings = () => {
 if (!getEnvStrings.strings) {
  var lang = ((typeof navigator == "object" && navigator.languages && navigator.languages[0]) || "C").replace("-", "_") + ".UTF-8";
  var env = {
   "USER": "web_user",
   "LOGNAME": "web_user",
   "PATH": "/",
   "PWD": "/",
   "HOME": "/home/web_user",
   "LANG": lang,
   "_": getExecutableName()
  };
  for (var x in ENV) {
   if (ENV[x] === undefined) delete env[x]; else env[x] = ENV[x];
  }
  var strings = [];
  for (var x in env) {
   strings.push(`${x}=${env[x]}`);
  }
  getEnvStrings.strings = strings;
 }
 return getEnvStrings.strings;
};

var stringToAscii = (str, buffer) => {
 for (var i = 0; i < str.length; ++i) {
  GROWABLE_HEAP_I8()[buffer++] = str.charCodeAt(i);
 }
 GROWABLE_HEAP_I8()[buffer] = 0;
};

var _environ_get = function(__environ, environ_buf) {
 if (ENVIRONMENT_IS_PTHREAD) return proxyToMainThread(40, 0, 1, __environ, environ_buf);
 var bufSize = 0;
 getEnvStrings().forEach((string, i) => {
  var ptr = environ_buf + bufSize;
  GROWABLE_HEAP_U32()[(((__environ) + (i * 4)) >> 2)] = ptr;
  stringToAscii(string, ptr);
  bufSize += string.length + 1;
 });
 return 0;
};

var _environ_sizes_get = function(penviron_count, penviron_buf_size) {
 if (ENVIRONMENT_IS_PTHREAD) return proxyToMainThread(41, 0, 1, penviron_count, penviron_buf_size);
 var strings = getEnvStrings();
 GROWABLE_HEAP_U32()[((penviron_count) >> 2)] = strings.length;
 var bufSize = 0;
 strings.forEach(string => bufSize += string.length + 1);
 GROWABLE_HEAP_U32()[((penviron_buf_size) >> 2)] = bufSize;
 return 0;
};

function _fd_close(fd) {
 if (ENVIRONMENT_IS_PTHREAD) return proxyToMainThread(42, 0, 1, fd);
 try {
  var stream = SYSCALLS.getStreamFromFD(fd);
  FS.close(stream);
  return 0;
 } catch (e) {
  if (typeof FS == "undefined" || !(e.name === "ErrnoError")) throw e;
  return e.errno;
 }
}

function _fd_fdstat_get(fd, pbuf) {
 if (ENVIRONMENT_IS_PTHREAD) return proxyToMainThread(43, 0, 1, fd, pbuf);
 try {
  var rightsBase = 0;
  var rightsInheriting = 0;
  var flags = 0;
  {
   var stream = SYSCALLS.getStreamFromFD(fd);
   var type = stream.tty ? 2 : FS.isDir(stream.mode) ? 3 : FS.isLink(stream.mode) ? 7 : 4;
  }
  GROWABLE_HEAP_I8()[pbuf] = type;
  GROWABLE_HEAP_I16()[(((pbuf) + (2)) >> 1)] = flags;
  HEAP64[(((pbuf) + (8)) >> 3)] = BigInt(rightsBase);
  HEAP64[(((pbuf) + (16)) >> 3)] = BigInt(rightsInheriting);
  return 0;
 } catch (e) {
  if (typeof FS == "undefined" || !(e.name === "ErrnoError")) throw e;
  return e.errno;
 }
}

/** @param {number=} offset */ var doReadv = (stream, iov, iovcnt, offset) => {
 var ret = 0;
 for (var i = 0; i < iovcnt; i++) {
  var ptr = GROWABLE_HEAP_U32()[((iov) >> 2)];
  var len = GROWABLE_HEAP_U32()[(((iov) + (4)) >> 2)];
  iov += 8;
  var curr = FS.read(stream, GROWABLE_HEAP_I8(), ptr, len, offset);
  if (curr < 0) return -1;
  ret += curr;
  if (curr < len) break;
  if (typeof offset !== "undefined") {
   offset += curr;
  }
 }
 return ret;
};

function _fd_pread(fd, iov, iovcnt, offset, pnum) {
 if (ENVIRONMENT_IS_PTHREAD) return proxyToMainThread(44, 0, 1, fd, iov, iovcnt, offset, pnum);
 offset = bigintToI53Checked(offset);
 try {
  if (isNaN(offset)) return 61;
  var stream = SYSCALLS.getStreamFromFD(fd);
  var num = doReadv(stream, iov, iovcnt, offset);
  GROWABLE_HEAP_U32()[((pnum) >> 2)] = num;
  return 0;
 } catch (e) {
  if (typeof FS == "undefined" || !(e.name === "ErrnoError")) throw e;
  return e.errno;
 }
}

/** @param {number=} offset */ var doWritev = (stream, iov, iovcnt, offset) => {
 var ret = 0;
 for (var i = 0; i < iovcnt; i++) {
  var ptr = GROWABLE_HEAP_U32()[((iov) >> 2)];
  var len = GROWABLE_HEAP_U32()[(((iov) + (4)) >> 2)];
  iov += 8;
  var curr = FS.write(stream, GROWABLE_HEAP_I8(), ptr, len, offset);
  if (curr < 0) return -1;
  ret += curr;
  if (typeof offset !== "undefined") {
   offset += curr;
  }
 }
 return ret;
};

function _fd_pwrite(fd, iov, iovcnt, offset, pnum) {
 if (ENVIRONMENT_IS_PTHREAD) return proxyToMainThread(45, 0, 1, fd, iov, iovcnt, offset, pnum);
 offset = bigintToI53Checked(offset);
 try {
  if (isNaN(offset)) return 61;
  var stream = SYSCALLS.getStreamFromFD(fd);
  var num = doWritev(stream, iov, iovcnt, offset);
  GROWABLE_HEAP_U32()[((pnum) >> 2)] = num;
  return 0;
 } catch (e) {
  if (typeof FS == "undefined" || !(e.name === "ErrnoError")) throw e;
  return e.errno;
 }
}

function _fd_read(fd, iov, iovcnt, pnum) {
 if (ENVIRONMENT_IS_PTHREAD) return proxyToMainThread(46, 0, 1, fd, iov, iovcnt, pnum);
 try {
  var stream = SYSCALLS.getStreamFromFD(fd);
  var num = doReadv(stream, iov, iovcnt);
  GROWABLE_HEAP_U32()[((pnum) >> 2)] = num;
  return 0;
 } catch (e) {
  if (typeof FS == "undefined" || !(e.name === "ErrnoError")) throw e;
  return e.errno;
 }
}

function _fd_seek(fd, offset, whence, newOffset) {
 if (ENVIRONMENT_IS_PTHREAD) return proxyToMainThread(47, 0, 1, fd, offset, whence, newOffset);
 offset = bigintToI53Checked(offset);
 try {
  if (isNaN(offset)) return 61;
  var stream = SYSCALLS.getStreamFromFD(fd);
  FS.llseek(stream, offset, whence);
  HEAP64[((newOffset) >> 3)] = BigInt(stream.position);
  if (stream.getdents && offset === 0 && whence === 0) stream.getdents = null;
  return 0;
 } catch (e) {
  if (typeof FS == "undefined" || !(e.name === "ErrnoError")) throw e;
  return e.errno;
 }
}

function _fd_sync(fd) {
 if (ENVIRONMENT_IS_PTHREAD) return proxyToMainThread(48, 0, 1, fd);
 try {
  var stream = SYSCALLS.getStreamFromFD(fd);
  if (stream.stream_ops?.fsync) {
   return stream.stream_ops.fsync(stream);
  }
  return 0;
 }  catch (e) {
  if (typeof FS == "undefined" || !(e.name === "ErrnoError")) throw e;
  return e.errno;
 }
}

function _fd_write(fd, iov, iovcnt, pnum) {
 if (ENVIRONMENT_IS_PTHREAD) return proxyToMainThread(49, 0, 1, fd, iov, iovcnt, pnum);
 try {
  var stream = SYSCALLS.getStreamFromFD(fd);
  var num = doWritev(stream, iov, iovcnt);
  GROWABLE_HEAP_U32()[((pnum) >> 2)] = num;
  return 0;
 } catch (e) {
  if (typeof FS == "undefined" || !(e.name === "ErrnoError")) throw e;
  return e.errno;
 }
}

var GodotRuntime = {
 get_func: function(ptr) {
  return wasmTable.get(ptr);
 },
 error: function() {
  err.apply(null, Array.from(arguments));
 },
 print: function() {
  out.apply(null, Array.from(arguments));
 },
 malloc: function(p_size) {
  return _malloc(p_size);
 },
 free: function(p_ptr) {
  _free(p_ptr);
 },
 getHeapValue: function(p_ptr, p_type) {
  return getValue(p_ptr, p_type);
 },
 setHeapValue: function(p_ptr, p_value, p_type) {
  setValue(p_ptr, p_value, p_type);
 },
 heapSub: function(p_heap, p_ptr, p_len) {
  const bytes = p_heap.BYTES_PER_ELEMENT;
  return p_heap.subarray(p_ptr / bytes, p_ptr / bytes + p_len);
 },
 heapSlice: function(p_heap, p_ptr, p_len) {
  const bytes = p_heap.BYTES_PER_ELEMENT;
  return p_heap.slice(p_ptr / bytes, p_ptr / bytes + p_len);
 },
 heapCopy: function(p_dst, p_src, p_ptr) {
  const bytes = p_src.BYTES_PER_ELEMENT;
  return p_dst.set(p_src, p_ptr / bytes);
 },
 parseString: function(p_ptr) {
  return UTF8ToString(p_ptr);
 },
 parseStringArray: function(p_ptr, p_size) {
  const strings = [];
  const ptrs = GodotRuntime.heapSub(GROWABLE_HEAP_I32(), p_ptr, p_size);
  ptrs.forEach(function(ptr) {
   strings.push(GodotRuntime.parseString(ptr));
  });
  return strings;
 },
 strlen: function(p_str) {
  return lengthBytesUTF8(p_str);
 },
 allocString: function(p_str) {
  const length = GodotRuntime.strlen(p_str) + 1;
  const c_str = GodotRuntime.malloc(length);
  stringToUTF8(p_str, c_str, length);
  return c_str;
 },
 allocStringArray: function(p_strings) {
  const size = p_strings.length;
  const c_ptr = GodotRuntime.malloc(size * 4);
  for (let i = 0; i < size; i++) {
   GROWABLE_HEAP_I32()[(c_ptr >> 2) + i] = GodotRuntime.allocString(p_strings[i]);
  }
  return c_ptr;
 },
 freeStringArray: function(p_ptr, p_len) {
  for (let i = 0; i < p_len; i++) {
   GodotRuntime.free(GROWABLE_HEAP_I32()[(p_ptr >> 2) + i]);
  }
  GodotRuntime.free(p_ptr);
 },
 stringToHeap: function(p_str, p_ptr, p_len) {
  return stringToUTF8Array(p_str, GROWABLE_HEAP_I8(), p_ptr, p_len);
 }
};

var GodotConfig = {
 canvas: null,
 locale: "en",
 canvas_resize_policy: 2,
 virtual_keyboard: false,
 persistent_drops: false,
 godot_pool_size: 4,
 on_execute: null,
 on_exit: null,
 init_config: function(p_opts) {
  GodotConfig.canvas_resize_policy = p_opts["canvasResizePolicy"];
  GodotConfig.canvas = p_opts["canvas"];
  GodotConfig.locale = p_opts["locale"] || GodotConfig.locale;
  GodotConfig.virtual_keyboard = p_opts["virtualKeyboard"];
  GodotConfig.persistent_drops = !!p_opts["persistentDrops"];
  GodotConfig.godot_pool_size = p_opts["godotPoolSize"];
  GodotConfig.on_execute = p_opts["onExecute"];
  GodotConfig.on_exit = p_opts["onExit"];
  if (p_opts["focusCanvas"]) {
   GodotConfig.canvas.focus();
  }
 },
 locate_file: function(file) {
  return Module["locateFile"](file);
 },
 clear: function() {
  GodotConfig.canvas = null;
  GodotConfig.locale = "en";
  GodotConfig.canvas_resize_policy = 2;
  GodotConfig.virtual_keyboard = false;
  GodotConfig.persistent_drops = false;
  GodotConfig.on_execute = null;
  GodotConfig.on_exit = null;
 }
};

var GodotFS = {
 ENOENT: 44,
 _idbfs: false,
 _syncing: false,
 _mount_points: [],
 is_persistent: function() {
  return GodotFS._idbfs ? 1 : 0;
 },
 init: function(persistentPaths) {
  GodotFS._idbfs = false;
  if (!Array.isArray(persistentPaths)) {
   return Promise.reject(new Error("Persistent paths must be an array"));
  }
  if (!persistentPaths.length) {
   return Promise.resolve();
  }
  GodotFS._mount_points = persistentPaths.slice();
  function createRecursive(dir) {
   try {
    FS.stat(dir);
   } catch (e) {
    if (e.errno !== GodotFS.ENOENT) {
     GodotRuntime.error(e);
    }
    FS.mkdirTree(dir);
   }
  }
  GodotFS._mount_points.forEach(function(path) {
   createRecursive(path);
   FS.mount(IDBFS, {}, path);
  });
  return new Promise(function(resolve, reject) {
   FS.syncfs(true, function(err) {
    if (err) {
     GodotFS._mount_points = [];
     GodotFS._idbfs = false;
     GodotRuntime.print(`IndexedDB not available: ${err.message}`);
    } else {
     GodotFS._idbfs = true;
    }
    resolve(err);
   });
  });
 },
 deinit: function() {
  GodotFS._mount_points.forEach(function(path) {
   try {
    FS.unmount(path);
   } catch (e) {
    GodotRuntime.print("Already unmounted", e);
   }
   if (GodotFS._idbfs && IDBFS.dbs[path]) {
    IDBFS.dbs[path].close();
    delete IDBFS.dbs[path];
   }
  });
  GodotFS._mount_points = [];
  GodotFS._idbfs = false;
  GodotFS._syncing = false;
 },
 sync: function() {
  if (GodotFS._syncing) {
   GodotRuntime.error("Already syncing!");
   return Promise.resolve();
  }
  GodotFS._syncing = true;
  return new Promise(function(resolve, reject) {
   FS.syncfs(false, function(error) {
    if (error) {
     GodotRuntime.error(`Failed to save IDB file system: ${error.message}`);
    }
    GodotFS._syncing = false;
    resolve(error);
   });
  });
 },
 copy_to_fs: function(path, buffer) {
  const idx = path.lastIndexOf("/");
  let dir = "/";
  if (idx > 0) {
   dir = path.slice(0, idx);
  }
  try {
   FS.stat(dir);
  } catch (e) {
   if (e.errno !== GodotFS.ENOENT) {
    GodotRuntime.error(e);
   }
   FS.mkdirTree(dir);
  }
  FS.writeFile(path, new Uint8Array(buffer));
 }
};

var GodotOS = {
 request_quit: function() {},
 _async_cbs: [],
 _persistent_async_cbs: [],
 _fs_sync_promise: null,
 atexit: function(p_promise_cb, p_persistent = false) {
  const cbs = p_persistent ? GodotOS._persistent_async_cbs : GodotOS._async_cbs;
  cbs.push(p_promise_cb);
 },
 cleanup: function(exit_code) {
  const cb = GodotConfig.on_exit;
  GodotFS.deinit();
  GodotConfig.clear();
  if (cb) {
   cb(exit_code);
  }
 },
 finish_async: function(callback) {
  GodotOS._fs_sync_promise.then(function(err) {
   const promises = [];
   const cbs = GodotOS._persistent_async_cbs.concat(GodotOS._async_cbs);
   GodotOS._async_cbs = [];
   cbs.forEach(function(cb) {
    promises.push(new Promise(cb));
   });
   return Promise.all(promises);
  }).then(function() {
   return GodotFS.sync();
  }).then( function(err) {
   setTimeout(function() {
    callback();
   }, 0);
  });
 }
};

var GodotAudio = {
 MAX_VOLUME_CHANNELS: 8,
 GodotChannel: {
  CHANNEL_L: 0,
  CHANNEL_R: 1,
  CHANNEL_C: 3,
  CHANNEL_LFE: 4,
  CHANNEL_RL: 5,
  CHANNEL_RR: 6,
  CHANNEL_SL: 7,
  CHANNEL_SR: 8
 },
 WebChannel: {
  CHANNEL_L: 0,
  CHANNEL_R: 1,
  CHANNEL_SL: 2,
  CHANNEL_SR: 3,
  CHANNEL_C: 4,
  CHANNEL_LFE: 5
 },
 samples: null,
 Sample: class Sample {
  /**
  	 * Returns a `Sample`.
  	 * @param {string} id Id of the `Sample` to get.
  	 * @returns {Sample}
  	 * @throws {ReferenceError} When no `Sample` is found
  	 */ static getSample(id) {
   if (!GodotAudio.samples.has(id)) {
    throw new ReferenceError(`Could not find sample "${id}"`);
   }
   return GodotAudio.samples.get(id);
  }
  /**
  	 * Returns a `Sample` or `null`, if it doesn't exist.
  	 * @param {string} id Id of the `Sample` to get.
  	 * @returns {Sample?}
  	 */ static getSampleOrNull(id) {
   return GodotAudio.samples.get(id) ?? null;
  }
  /**
  	 * Creates a `Sample` based on the params. Will register it to the
  	 * `GodotAudio.samples` registry.
  	 * @param {SampleParams} params Base params
  	 * @param {SampleOptions | undefined} options Optional params.
  	 * @returns {Sample}
  	 */ static create(params, options = {}) {
   const sample = new GodotAudio.Sample(params, options);
   GodotAudio.samples.set(params.id, sample);
   return sample;
  }
  /**
  	 * Deletes a `Sample` based on the id.
  	 * @param {string} id `Sample` id to delete
  	 * @returns {void}
  	 */ static delete(id) {
   GodotAudio.samples.delete(id);
  }
  /**
  	 * `Sample` constructor.
  	 * @param {SampleParams} params Base params
  	 * @param {SampleOptions | undefined} options Optional params.
  	 */ constructor(params, options = {}) {
   /** @type {string} */ this.id = params.id;
   /** @type {AudioBuffer} */ this._audioBuffer = null;
   /** @type {number} */ this.numberOfChannels = options.numberOfChannels ?? 2;
   /** @type {number} */ this.sampleRate = options.sampleRate ?? 44100;
   /** @type {LoopMode} */ this.loopMode = options.loopMode ?? "disabled";
   /** @type {number} */ this.loopBegin = options.loopBegin ?? 0;
   /** @type {number} */ this.loopEnd = options.loopEnd ?? 0;
   this.setAudioBuffer(params.audioBuffer);
  }
  /**
  	 * Gets the audio buffer of the sample.
  	 * @returns {AudioBuffer}
  	 */ getAudioBuffer() {
   return this._duplicateAudioBuffer();
  }
  /**
  	 * Sets the audio buffer of the sample.
  	 * @param {AudioBuffer} val The audio buffer to set.
  	 * @returns {void}
  	 */ setAudioBuffer(val) {
   this._audioBuffer = val;
  }
  /**
  	 * Clears the current sample.
  	 * @returns {void}
  	 */ clear() {
   this.setAudioBuffer(null);
   GodotAudio.Sample.delete(this.id);
  }
  /**
  	 * Returns a duplicate of the stored audio buffer.
  	 * @returns {AudioBuffer}
  	 */ _duplicateAudioBuffer() {
   if (this._audioBuffer == null) {
    throw new Error("couldn't duplicate a null audioBuffer");
   }
   /** @type {Array<Float32Array>} */ const channels = new Array(this._audioBuffer.numberOfChannels);
   for (let i = 0; i < this._audioBuffer.numberOfChannels; i++) {
    const channel = new Float32Array(this._audioBuffer.getChannelData(i));
    channels[i] = channel;
   }
   const buffer = GodotAudio.ctx.createBuffer(this.numberOfChannels, this._audioBuffer.length, this._audioBuffer.sampleRate);
   for (let i = 0; i < channels.length; i++) {
    buffer.copyToChannel(channels[i], i, 0);
   }
   return buffer;
  }
 },
 SampleNodeBus: class SampleNodeBus {
  /**
  	 * Creates a new `SampleNodeBus`.
  	 * @param {Bus} bus The bus related to the new `SampleNodeBus`.
  	 * @returns {SampleNodeBus}
  	 */ static create(bus) {
   return new GodotAudio.SampleNodeBus(bus);
  }
  /**
  	 * `SampleNodeBus` constructor.
  	 * @param {Bus} bus The bus related to the new `SampleNodeBus`.
  	 */ constructor(bus) {
   const NUMBER_OF_WEB_CHANNELS = 6;
   /** @type {Bus} */ this._bus = bus;
   /** @type {ChannelSplitterNode} */ this._channelSplitter = GodotAudio.ctx.createChannelSplitter(NUMBER_OF_WEB_CHANNELS);
   /** @type {GainNode} */ this._l = GodotAudio.ctx.createGain();
   /** @type {GainNode} */ this._r = GodotAudio.ctx.createGain();
   /** @type {GainNode} */ this._sl = GodotAudio.ctx.createGain();
   /** @type {GainNode} */ this._sr = GodotAudio.ctx.createGain();
   /** @type {GainNode} */ this._c = GodotAudio.ctx.createGain();
   /** @type {GainNode} */ this._lfe = GodotAudio.ctx.createGain();
   /** @type {ChannelMergerNode} */ this._channelMerger = GodotAudio.ctx.createChannelMerger(NUMBER_OF_WEB_CHANNELS);
   this._channelSplitter.connect(this._l, GodotAudio.WebChannel.CHANNEL_L).connect(this._channelMerger, GodotAudio.WebChannel.CHANNEL_L, GodotAudio.WebChannel.CHANNEL_L);
   this._channelSplitter.connect(this._r, GodotAudio.WebChannel.CHANNEL_R).connect(this._channelMerger, GodotAudio.WebChannel.CHANNEL_L, GodotAudio.WebChannel.CHANNEL_R);
   this._channelSplitter.connect(this._sl, GodotAudio.WebChannel.CHANNEL_SL).connect(this._channelMerger, GodotAudio.WebChannel.CHANNEL_L, GodotAudio.WebChannel.CHANNEL_SL);
   this._channelSplitter.connect(this._sr, GodotAudio.WebChannel.CHANNEL_SR).connect(this._channelMerger, GodotAudio.WebChannel.CHANNEL_L, GodotAudio.WebChannel.CHANNEL_SR);
   this._channelSplitter.connect(this._c, GodotAudio.WebChannel.CHANNEL_C).connect(this._channelMerger, GodotAudio.WebChannel.CHANNEL_L, GodotAudio.WebChannel.CHANNEL_C);
   this._channelSplitter.connect(this._lfe, GodotAudio.WebChannel.CHANNEL_L).connect(this._channelMerger, GodotAudio.WebChannel.CHANNEL_L, GodotAudio.WebChannel.CHANNEL_LFE);
   this._channelMerger.connect(this._bus.getInputNode());
  }
  /**
  	 * Returns the input node.
  	 * @returns {AudioNode}
  	 */ getInputNode() {
   return this._channelSplitter;
  }
  /**
  	 * Returns the output node.
  	 * @returns {AudioNode}
  	 */ getOutputNode() {
   return this._channelMerger;
  }
  /**
  	 * Sets the volume for each (split) channel.
  	 * @param {Float32Array} volume Volume array from the engine for each channel.
  	 * @returns {void}
  	 */ setVolume(volume) {
   if (volume.length !== GodotAudio.MAX_VOLUME_CHANNELS) {
    throw new Error(`Volume length isn't "${GodotAudio.MAX_VOLUME_CHANNELS}", is ${volume.length} instead`);
   }
   this._l.gain.value = volume[GodotAudio.GodotChannel.CHANNEL_L] ?? 0;
   this._r.gain.value = volume[GodotAudio.GodotChannel.CHANNEL_R] ?? 0;
   this._sl.gain.value = volume[GodotAudio.GodotChannel.CHANNEL_SL] ?? 0;
   this._sr.gain.value = volume[GodotAudio.GodotChannel.CHANNEL_SR] ?? 0;
   this._c.gain.value = volume[GodotAudio.GodotChannel.CHANNEL_C] ?? 0;
   this._lfe.gain.value = volume[GodotAudio.GodotChannel.CHANNEL_LFE] ?? 0;
  }
  /**
  	 * Clears the current `SampleNodeBus` instance.
  	 * @returns {void}
  	 */ clear() {
   this._bus = null;
   this._channelSplitter.disconnect();
   this._channelSplitter = null;
   this._l.disconnect();
   this._l = null;
   this._r.disconnect();
   this._r = null;
   this._sl.disconnect();
   this._sl = null;
   this._sr.disconnect();
   this._sr = null;
   this._c.disconnect();
   this._c = null;
   this._lfe.disconnect();
   this._lfe = null;
   this._channelMerger.disconnect();
   this._channelMerger = null;
  }
 },
 sampleNodes: null,
 SampleNode: class SampleNode {
  /**
  	 * Returns a `SampleNode`.
  	 * @param {string} id Id of the `SampleNode`.
  	 * @returns {SampleNode}
  	 * @throws {ReferenceError} When no `SampleNode` is not found
  	 */ static getSampleNode(id) {
   if (!GodotAudio.sampleNodes.has(id)) {
    throw new ReferenceError(`Could not find sample node "${id}"`);
   }
   return GodotAudio.sampleNodes.get(id);
  }
  /**
  	 * Returns a `SampleNode`, returns null if not found.
  	 * @param {string} id Id of the SampleNode.
  	 * @returns {SampleNode?}
  	 */ static getSampleNodeOrNull(id) {
   return GodotAudio.sampleNodes.get(id) ?? null;
  }
  /**
  	 * Stops a `SampleNode` by id.
  	 * @param {string} id Id of the `SampleNode` to stop.
  	 * @returns {void}
  	 */ static stopSampleNode(id) {
   const sampleNode = GodotAudio.SampleNode.getSampleNodeOrNull(id);
   if (sampleNode == null) {
    return;
   }
   sampleNode.stop();
  }
  /**
  	 * Pauses the `SampleNode` by id.
  	 * @param {string} id Id of the `SampleNode` to pause.
  	 * @param {boolean} enable State of the pause
  	 * @returns {void}
  	 */ static pauseSampleNode(id, enable) {
   const sampleNode = GodotAudio.SampleNode.getSampleNodeOrNull(id);
   if (sampleNode == null) {
    return;
   }
   sampleNode.pause(enable);
  }
  /**
  	 * Creates a `SampleNode` based on the params. Will register the `SampleNode` to
  	 * the `GodotAudio.sampleNodes` regisery.
  	 * @param {SampleNodeParams} params Base params.
  	 * @param {SampleNodeOptions | undefined} options Optional params.
  	 * @returns {SampleNode}
  	 */ static create(params, options = {}) {
   const sampleNode = new GodotAudio.SampleNode(params, options);
   GodotAudio.sampleNodes.set(params.id, sampleNode);
   return sampleNode;
  }
  /**
  	 * Deletes a `SampleNode` based on the id.
  	 * @param {string} id Id of the `SampleNode` to delete.
  	 * @returns {void}
  	 */ static delete(id) {
   GodotAudio.deleteSampleNode(id);
  }
  /**
  	 * @param {SampleNodeParams} params Base params
  	 * @param {SampleNodeOptions | undefined} options Optional params.
  	 */ constructor(params, options = {}) {
   /** @type {string} */ this.id = params.id;
   /** @type {string} */ this.streamObjectId = params.streamObjectId;
   /** @type {number} */ this.offset = options.offset ?? 0;
   /** @type {number} */ this._playbackPosition = options.offset;
   /** @type {number} */ this.startTime = options.startTime ?? 0;
   /** @type {boolean} */ this.isPaused = false;
   /** @type {boolean} */ this.isStarted = false;
   /** @type {boolean} */ this.isCanceled = false;
   /** @type {number} */ this.pauseTime = 0;
   /** @type {number} */ this._playbackRate = 44100;
   /** @type {LoopMode} */ this.loopMode = options.loopMode ?? this.getSample().loopMode ?? "disabled";
   /** @type {number} */ this._pitchScale = options.pitchScale ?? 1;
   /** @type {number} */ this._sourceStartTime = 0;
   /** @type {Map<Bus, SampleNodeBus>} */ this._sampleNodeBuses = new Map;
   /** @type {AudioBufferSourceNode | null} */ this._source = GodotAudio.ctx.createBufferSource();
   this._onended = null;
   /** @type {AudioWorkletNode | null} */ this._positionWorklet = null;
   this.setPlaybackRate(options.playbackRate ?? 44100);
   this._source.buffer = this.getSample().getAudioBuffer();
   this._addEndedListener();
   const bus = GodotAudio.Bus.getBus(params.busIndex);
   const sampleNodeBus = this.getSampleNodeBus(bus);
   sampleNodeBus.setVolume(options.volume);
   this.connectPositionWorklet(options.start).catch(err => {
    const newErr = new Error("Failed to create PositionWorklet.");
    newErr.cause = err;
    GodotRuntime.error(newErr);
   });
  }
  /**
  	 * Gets the playback rate.
  	 * @returns {number}
  	 */ getPlaybackRate() {
   return this._playbackRate;
  }
  /**
  	 * Gets the playback position.
  	 * @returns {number}
  	 */ getPlaybackPosition() {
   return this._playbackPosition;
  }
  /**
  	 * Sets the playback rate.
  	 * @param {number} val Value to set.
  	 * @returns {void}
  	 */ setPlaybackRate(val) {
   this._playbackRate = val;
   this._syncPlaybackRate();
  }
  /**
  	 * Gets the pitch scale.
  	 * @returns {number}
  	 */ getPitchScale() {
   return this._pitchScale;
  }
  /**
  	 * Sets the pitch scale.
  	 * @param {number} val Value to set.
  	 * @returns {void}
  	 */ setPitchScale(val) {
   this._pitchScale = val;
   this._syncPlaybackRate();
  }
  /**
  	 * Returns the linked `Sample`.
  	 * @returns {Sample}
  	 */ getSample() {
   return GodotAudio.Sample.getSample(this.streamObjectId);
  }
  /**
  	 * Returns the output node.
  	 * @returns {AudioNode}
  	 */ getOutputNode() {
   return this._source;
  }
  /**
  	 * Starts the `SampleNode`.
  	 * @returns {void}
  	 */ start() {
   if (this.isStarted) {
    return;
   }
   this._resetSourceStartTime();
   this._source.start(this.startTime, this.offset);
   this.isStarted = true;
  }
  /**
  	 * Stops the `SampleNode`.
  	 * @returns {void}
  	 */ stop() {
   this.clear();
  }
  /**
  	 * Restarts the `SampleNode`.
  	 */ restart() {
   this.isPaused = false;
   this.pauseTime = 0;
   this._resetSourceStartTime();
   this._restart();
  }
  /**
  	 * Pauses the `SampleNode`.
  	 * @param {boolean} [enable=true] State of the pause.
  	 * @returns {void}
  	 */ pause(enable = true) {
   if (enable) {
    this._pause();
    return;
   }
   this._unpause();
  }
  /**
  	 * Connects an AudioNode to the output node of this `SampleNode`.
  	 * @param {AudioNode} node AudioNode to connect.
  	 * @returns {void}
  	 */ connect(node) {
   return this.getOutputNode().connect(node);
  }
  /**
  	 * Sets the volumes of the `SampleNode` for each buses passed in parameters.
  	 * @param {Array<Bus>} buses
  	 * @param {Float32Array} volumes
  	 */ setVolumes(buses, volumes) {
   for (let busIdx = 0; busIdx < buses.length; busIdx++) {
    const sampleNodeBus = this.getSampleNodeBus(buses[busIdx]);
    sampleNodeBus.setVolume(volumes.slice(busIdx * GodotAudio.MAX_VOLUME_CHANNELS, (busIdx * GodotAudio.MAX_VOLUME_CHANNELS) + GodotAudio.MAX_VOLUME_CHANNELS));
   }
  }
  /**
  	 * Returns the SampleNodeBus based on the bus in parameters.
  	 * @param {Bus} bus Bus to get the SampleNodeBus from.
  	 * @returns {SampleNodeBus}
  	 */ getSampleNodeBus(bus) {
   if (!this._sampleNodeBuses.has(bus)) {
    const sampleNodeBus = GodotAudio.SampleNodeBus.create(bus);
    this._sampleNodeBuses.set(bus, sampleNodeBus);
    this._source.connect(sampleNodeBus.getInputNode());
   }
   return this._sampleNodeBuses.get(bus);
  }
  /**
  	 * Sets up and connects the source to the GodotPositionReportingProcessor
  	 * If the worklet module is not loaded in, it will be added
  	 */ async connectPositionWorklet(start) {
   await GodotAudio.audioPositionWorkletPromise;
   if (this.isCanceled) {
    return;
   }
   this._source.connect(this.getPositionWorklet());
   if (start) {
    this.start();
   }
  }
  /**
  	 * Get a AudioWorkletProcessor
  	 * @returns {AudioWorkletNode}
  	 */ getPositionWorklet() {
   if (this._positionWorklet != null) {
    return this._positionWorklet;
   }
   if (GodotAudio.audioPositionWorkletNodes.length > 0) {
    this._positionWorklet = GodotAudio.audioPositionWorkletNodes.pop();
   } else {
    this._positionWorklet = new AudioWorkletNode(GodotAudio.ctx, "godot-position-reporting-processor");
   }
   this._playbackPosition = this.offset;
   this._positionWorklet.port.onmessage = event => {
    switch (event.data["type"]) {
    case "position":
     this._playbackPosition = (parseInt(event.data.data, 10) / this.getSample().sampleRate) + this.offset;
     break;

    default:
    }
   };
   const resetParameter = this._positionWorklet.parameters.get("reset");
   resetParameter.setValueAtTime(1, GodotAudio.ctx.currentTime);
   resetParameter.setValueAtTime(0, GodotAudio.ctx.currentTime + 1);
   return this._positionWorklet;
  }
  /**
  	 * Clears the `SampleNode`.
  	 * @returns {void}
  	 */ clear() {
   this.isCanceled = true;
   this.isPaused = false;
   this.pauseTime = 0;
   if (this._source != null) {
    this._source.removeEventListener("ended", this._onended);
    this._onended = null;
    if (this.isStarted) {
     this._source.stop();
    }
    this._source.disconnect();
    this._source = null;
   }
   for (const sampleNodeBus of this._sampleNodeBuses.values()) {
    sampleNodeBus.clear();
   }
   this._sampleNodeBuses.clear();
   if (this._positionWorklet) {
    this._positionWorklet.disconnect();
    this._positionWorklet.port.onmessage = null;
    GodotAudio.audioPositionWorkletNodes.push(this._positionWorklet);
    this._positionWorklet = null;
   }
   GodotAudio.SampleNode.delete(this.id);
  }
  /**
  	 * Resets the source start time
  	 * @returns {void}
  	 */ _resetSourceStartTime() {
   this._sourceStartTime = GodotAudio.ctx.currentTime;
  }
  /**
  	 * Syncs the `AudioNode` playback rate based on the `SampleNode` playback rate and pitch scale.
  	 * @returns {void}
  	 */ _syncPlaybackRate() {
   this._source.playbackRate.value = this.getPlaybackRate() * this.getPitchScale();
  }
  /**
  	 * Restarts the `SampleNode`.
  	 * Honors `isPaused` and `pauseTime`.
  	 * @returns {void}
  	 */ _restart() {
   if (this._source != null) {
    this._source.disconnect();
   }
   this._source = GodotAudio.ctx.createBufferSource();
   this._source.buffer = this.getSample().getAudioBuffer();
   for (const sampleNodeBus of this._sampleNodeBuses.values()) {
    this.connect(sampleNodeBus.getInputNode());
   }
   this._addEndedListener();
   const pauseTime = this.isPaused ? this.pauseTime : 0;
   if (this._positionWorklet != null) {
    this._positionWorklet.port.postMessage({
     type: "clear"
    });
    this._source.connect(this._positionWorklet);
   }
   this._source.start(this.startTime, this.offset + pauseTime);
   this.isStarted = true;
  }
  /**
  	 * Pauses the `SampleNode`.
  	 * @returns {void}
  	 */ _pause() {
   if (!this.isStarted) {
    return;
   }
   if (GodotAudio.ctx == null || this._source == null) {
    return;
   }
   this.isPaused = true;
   this.pauseTime = (GodotAudio.ctx.currentTime - this._sourceStartTime) / this.getPlaybackRate();
   this._source.stop();
  }
  /**
  	 * Unpauses the `SampleNode`.
  	 * @returns {void}
  	 */ _unpause() {
   this._restart();
   this.isPaused = false;
   this.pauseTime = 0;
  }
  /**
  	 * Adds an "ended" listener to the source node to repeat it if necessary.
  	 * @returns {void}
  	 */ _addEndedListener() {
   if (this._onended != null) {
    this._source.removeEventListener("ended", this._onended);
   }
   const self = this;
   this._onended = _ => {
    if (self.isPaused) {
     return;
    }
    switch (self.getSample().loopMode) {
    case "disabled":
     self.stop();
     break;

    case "forward":
    case "backward":
     self.restart();
     break;

    default:
    }
   };
   this._source.addEventListener("ended", this._onended);
  }
 },
 deleteSampleNode: pSampleNodeId => {
  GodotAudio.sampleNodes.delete(pSampleNodeId);
  if (GodotAudio.sampleFinishedCallback == null) {
   return;
  }
  const sampleNodeIdPtr = GodotRuntime.allocString(pSampleNodeId);
  GodotAudio.sampleFinishedCallback(sampleNodeIdPtr);
  GodotRuntime.free(sampleNodeIdPtr);
 },
 buses: null,
 busSolo: null,
 Bus: class Bus {
  /**
  	 * Returns the number of registered buses.
  	 * @returns {number}
  	 */ static getCount() {
   return GodotAudio.buses.length;
  }
  /**
  	 * Sets the number of registered buses.
  	 * Will delete buses if lower than the current number.
  	 * @param {number} val Count of registered buses.
  	 * @returns {void}
  	 */ static setCount(val) {
   const buses = GodotAudio.buses;
   if (val === buses.length) {
    return;
   }
   if (val < buses.length) {
    const deletedBuses = buses.slice(val);
    for (let i = 0; i < deletedBuses.length; i++) {
     const deletedBus = deletedBuses[i];
     deletedBus.clear();
    }
    GodotAudio.buses = buses.slice(0, val);
    return;
   }
   for (let i = GodotAudio.buses.length; i < val; i++) {
    GodotAudio.Bus.create();
   }
  }
  /**
  	 * Returns a `Bus` based on it's index number.
  	 * @param {number} index
  	 * @returns {Bus}
  	 * @throws {ReferenceError} If the index value is outside the registry.
  	 */ static getBus(index) {
   if (index < 0 || index >= GodotAudio.buses.length) {
    throw new ReferenceError(`invalid bus index "${index}"`);
   }
   return GodotAudio.buses[index];
  }
  /**
  	 * Returns a `Bus` based on it's index number. Returns null if it doesn't exist.
  	 * @param {number} index
  	 * @returns {Bus?}
  	 */ static getBusOrNull(index) {
   if (index < 0 || index >= GodotAudio.buses.length) {
    return null;
   }
   return GodotAudio.buses[index];
  }
  /**
  	 * Move a bus from an index to another.
  	 * @param {number} fromIndex From index
  	 * @param {number} toIndex To index
  	 * @returns {void}
  	 */ static move(fromIndex, toIndex) {
   const movedBus = GodotAudio.Bus.getBusOrNull(fromIndex);
   if (movedBus == null) {
    return;
   }
   const buses = GodotAudio.buses.filter((_, i) => i !== fromIndex);
   buses.splice(toIndex - 1, 0, movedBus);
   GodotAudio.buses = buses;
  }
  /**
  	 * Adds a new bus at the specified index.
  	 * @param {number} index Index to add a new bus.
  	 * @returns {void}
  	 */ static addAt(index) {
   const newBus = GodotAudio.Bus.create();
   if (index !== newBus.getId()) {
    GodotAudio.Bus.move(newBus.getId(), index);
   }
  }
  /**
  	 * Creates a `Bus` and registers it.
  	 * @returns {Bus}
  	 */ static create() {
   const newBus = new GodotAudio.Bus;
   const isFirstBus = GodotAudio.buses.length === 0;
   GodotAudio.buses.push(newBus);
   if (isFirstBus) {
    newBus.setSend(null);
   } else {
    newBus.setSend(GodotAudio.Bus.getBus(0));
   }
   return newBus;
  }
  /**
  	 * `Bus` constructor.
  	 */ constructor() {
   /** @type {Set<SampleNode>} */ this._sampleNodes = new Set;
   /** @type {boolean} */ this.isSolo = false;
   /** @type {Bus?} */ this._send = null;
   /** @type {GainNode} */ this._gainNode = GodotAudio.ctx.createGain();
   /** @type {GainNode} */ this._soloNode = GodotAudio.ctx.createGain();
   /** @type {GainNode} */ this._muteNode = GodotAudio.ctx.createGain();
   this._gainNode.connect(this._soloNode).connect(this._muteNode);
  }
  /**
  	 * Returns the current id of the bus (its index).
  	 * @returns {number}
  	 */ getId() {
   return GodotAudio.buses.indexOf(this);
  }
  /**
  	 * Returns the bus volume db value.
  	 * @returns {number}
  	 */ getVolumeDb() {
   return GodotAudio.linear_to_db(this._gainNode.gain.value);
  }
  /**
  	 * Sets the bus volume db value.
  	 * @param {number} val Value to set
  	 * @returns {void}
  	 */ setVolumeDb(val) {
   const linear = GodotAudio.db_to_linear(val);
   if (isFinite(linear)) {
    this._gainNode.gain.value = linear;
   }
  }
  /**
  	 * Returns the "send" bus.
  	 * If null, this bus sends its contents directly to the output.
  	 * If not null, this bus sends its contents to another bus.
  	 * @returns {Bus?}
  	 */ getSend() {
   return this._send;
  }
  /**
  	 * Sets the "send" bus.
  	 * If null, this bus sends its contents directly to the output.
  	 * If not null, this bus sends its contents to another bus.
  	 *
  	 * **Note:** if null, `getId()` must be equal to 0. Otherwise, it will throw.
  	 * @param {Bus?} val
  	 * @returns {void}
  	 * @throws {Error} When val is `null` and `getId()` isn't equal to 0
  	 */ setSend(val) {
   this._send = val;
   if (val == null) {
    if (this.getId() == 0) {
     this.getOutputNode().connect(GodotAudio.ctx.destination);
     return;
    }
    throw new Error(`Cannot send to "${val}" without the bus being at index 0 (current index: ${this.getId()})`);
   }
   this.connect(val);
  }
  /**
  	 * Returns the input node of the bus.
  	 * @returns {AudioNode}
  	 */ getInputNode() {
   return this._gainNode;
  }
  /**
  	 * Returns the output node of the bus.
  	 * @returns {AudioNode}
  	 */ getOutputNode() {
   return this._muteNode;
  }
  /**
  	 * Sets the mute status of the bus.
  	 * @param {boolean} enable
  	 */ mute(enable) {
   this._muteNode.gain.value = enable ? 0 : 1;
  }
  /**
  	 * Sets the solo status of the bus.
  	 * @param {boolean} enable
  	 */ solo(enable) {
   if (this.isSolo === enable) {
    return;
   }
   if (enable) {
    if (GodotAudio.busSolo != null && GodotAudio.busSolo !== this) {
     GodotAudio.busSolo._disableSolo();
    }
    this._enableSolo();
    return;
   }
   this._disableSolo();
  }
  /**
  	 * Wrapper to simply add a sample node to the bus.
  	 * @param {SampleNode} sampleNode `SampleNode` to remove
  	 * @returns {void}
  	 */ addSampleNode(sampleNode) {
   this._sampleNodes.add(sampleNode);
   sampleNode.getOutputNode().connect(this.getInputNode());
  }
  /**
  	 * Wrapper to simply remove a sample node from the bus.
  	 * @param {SampleNode} sampleNode `SampleNode` to remove
  	 * @returns {void}
  	 */ removeSampleNode(sampleNode) {
   this._sampleNodes.delete(sampleNode);
   sampleNode.getOutputNode().disconnect();
  }
  /**
  	 * Wrapper to simply connect to another bus.
  	 * @param {Bus} bus
  	 * @returns {void}
  	 */ connect(bus) {
   if (bus == null) {
    throw new Error("cannot connect to null bus");
   }
   this.getOutputNode().disconnect();
   this.getOutputNode().connect(bus.getInputNode());
   return bus;
  }
  /**
  	 * Clears the current bus.
  	 * @returns {void}
  	 */ clear() {
   GodotAudio.buses = GodotAudio.buses.filter(v => v !== this);
  }
  _syncSampleNodes() {
   const sampleNodes = Array.from(this._sampleNodes);
   for (let i = 0; i < sampleNodes.length; i++) {
    const sampleNode = sampleNodes[i];
    sampleNode.getOutputNode().disconnect();
    sampleNode.getOutputNode().connect(this.getInputNode());
   }
  }
  /**
  	 * Process to enable solo.
  	 * @returns {void}
  	 */ _enableSolo() {
   this.isSolo = true;
   GodotAudio.busSolo = this;
   this._soloNode.gain.value = 1;
   const otherBuses = GodotAudio.buses.filter(otherBus => otherBus !== this);
   for (let i = 0; i < otherBuses.length; i++) {
    const otherBus = otherBuses[i];
    otherBus._soloNode.gain.value = 0;
   }
  }
  /**
  	 * Process to disable solo.
  	 * @returns {void}
  	 */ _disableSolo() {
   this.isSolo = false;
   GodotAudio.busSolo = null;
   this._soloNode.gain.value = 1;
   const otherBuses = GodotAudio.buses.filter(otherBus => otherBus !== this);
   for (let i = 0; i < otherBuses.length; i++) {
    const otherBus = otherBuses[i];
    otherBus._soloNode.gain.value = 1;
   }
  }
 },
 sampleFinishedCallback: null,
 ctx: null,
 input: null,
 driver: null,
 interval: 0,
 audioPositionWorkletPromise: null,
 audioPositionWorkletNodes: null,
 linear_to_db: function(linear) {
  return Math.log(linear) * 8.685889638065037;
 },
 db_to_linear: function(db) {
  return Math.exp(db * .11512925464970228);
 },
 init: function(mix_rate, latency, onstatechange, onlatencyupdate) {
  GodotAudio.samples = new Map;
  GodotAudio.sampleNodes = new Map;
  GodotAudio.buses = [];
  GodotAudio.busSolo = null;
  GodotAudio.audioPositionWorkletNodes = [];
  const opts = {};
  if (mix_rate) {
   GodotAudio.sampleRate = mix_rate;
   opts["sampleRate"] = mix_rate;
  }
  const ctx = new (window.AudioContext || window.webkitAudioContext)(opts);
  GodotAudio.ctx = ctx;
  ctx.onstatechange = function() {
   let state = 0;
   switch (ctx.state) {
   case "suspended":
    state = 0;
    break;

   case "running":
    state = 1;
    break;

   case "closed":
    state = 2;
    break;

   default:
   }
   onstatechange(state);
  };
  ctx.onstatechange();
  GodotAudio.interval = setInterval(function() {
   let computed_latency = 0;
   if (ctx.baseLatency) {
    computed_latency += GodotAudio.ctx.baseLatency;
   }
   if (ctx.outputLatency) {
    computed_latency += GodotAudio.ctx.outputLatency;
   }
   onlatencyupdate(computed_latency);
  }, 1e3);
  GodotOS.atexit(GodotAudio.close_async);
  const path = GodotConfig.locate_file("godot.audio.position.worklet.js");
  GodotAudio.audioPositionWorkletPromise = ctx.audioWorklet.addModule(path);
  return ctx.destination.channelCount;
 },
 create_input: function(callback) {
  if (GodotAudio.input) {
   return 0;
  }
  function gotMediaInput(stream) {
   try {
    GodotAudio.input = GodotAudio.ctx.createMediaStreamSource(stream);
    callback(GodotAudio.input);
   } catch (e) {
    GodotRuntime.error("Failed creating input.", e);
   }
  }
  if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
   navigator.mediaDevices.getUserMedia({
    "audio": true
   }).then(gotMediaInput, function(e) {
    GodotRuntime.error("Error getting user media.", e);
   });
  } else {
   if (!navigator.getUserMedia) {
    navigator.getUserMedia = navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
   }
   if (!navigator.getUserMedia) {
    GodotRuntime.error("getUserMedia not available.");
    return 1;
   }
   navigator.getUserMedia({
    "audio": true
   }, gotMediaInput, function(e) {
    GodotRuntime.print(e);
   });
  }
  return 0;
 },
 close_async: function(resolve, reject) {
  const ctx = GodotAudio.ctx;
  GodotAudio.ctx = null;
  if (!ctx) {
   resolve();
   return;
  }
  GodotAudio.sampleFinishedCallback = null;
  for (const sampleNode of GodotAudio.sampleNodes.values()) {
   sampleNode.clear();
  }
  GodotAudio.sampleNodes.clear();
  if (GodotAudio.interval) {
   clearInterval(GodotAudio.interval);
   GodotAudio.interval = 0;
  }
  if (GodotAudio.input) {
   GodotAudio.input.disconnect();
   GodotAudio.input = null;
  }
  let closed = Promise.resolve();
  if (GodotAudio.driver) {
   closed = GodotAudio.driver.close();
   GodotAudio.driver = null;
  }
  GodotAudio.audioPositionWorkletPromise = null;
  GodotAudio.audioPositionWorkletNodes = [];
  closed.then(function() {
   return ctx.close();
  }).then(function() {
   ctx.onstatechange = null;
   resolve();
  }).catch(function(e) {
   ctx.onstatechange = null;
   GodotRuntime.error("Error closing AudioContext", e);
   resolve();
  });
 },
 start_sample: function(playbackObjectId, streamObjectId, busIndex, startOptions) {
  if (GodotAudio.ctx == null) {
   return;
  }
  GodotAudio.SampleNode.stopSampleNode(playbackObjectId);
  GodotAudio.SampleNode.create({
   busIndex: busIndex,
   id: playbackObjectId,
   streamObjectId: streamObjectId
  }, startOptions);
 },
 stop_sample: function(playbackObjectId) {
  GodotAudio.SampleNode.stopSampleNode(playbackObjectId);
 },
 sample_set_pause: function(playbackObjectId, pause) {
  GodotAudio.SampleNode.pauseSampleNode(playbackObjectId, pause);
 },
 update_sample_pitch_scale: function(playbackObjectId, pitchScale) {
  const sampleNode = GodotAudio.SampleNode.getSampleNodeOrNull(playbackObjectId);
  if (sampleNode == null) {
   return;
  }
  sampleNode.setPitchScale(pitchScale);
 },
 sample_set_volumes_linear: function(playbackObjectId, busIndexes, volumes) {
  const sampleNode = GodotAudio.SampleNode.getSampleNodeOrNull(playbackObjectId);
  if (sampleNode == null) {
   return;
  }
  const buses = busIndexes.map(busIndex => GodotAudio.Bus.getBus(busIndex));
  sampleNode.setVolumes(buses, volumes);
 },
 set_sample_bus_count: function(count) {
  GodotAudio.Bus.setCount(count);
 },
 remove_sample_bus: function(index) {
  const bus = GodotAudio.Bus.getBusOrNull(index);
  if (bus == null) {
   return;
  }
  bus.clear();
 },
 add_sample_bus: function(atPos) {
  GodotAudio.Bus.addAt(atPos);
 },
 move_sample_bus: function(busIndex, toPos) {
  GodotAudio.Bus.move(busIndex, toPos);
 },
 set_sample_bus_send: function(busIndex, sendIndex) {
  const bus = GodotAudio.Bus.getBusOrNull(busIndex);
  if (bus == null) {
   return;
  }
  let targetBus = GodotAudio.Bus.getBusOrNull(sendIndex);
  if (targetBus == null) {
   targetBus = GodotAudio.Bus.getBus(0);
  }
  bus.setSend(targetBus);
 },
 set_sample_bus_volume_db: function(busIndex, volumeDb) {
  const bus = GodotAudio.Bus.getBusOrNull(busIndex);
  if (bus == null) {
   return;
  }
  bus.setVolumeDb(volumeDb);
 },
 set_sample_bus_solo: function(busIndex, enable) {
  const bus = GodotAudio.Bus.getBusOrNull(busIndex);
  if (bus == null) {
   return;
  }
  bus.solo(enable);
 },
 set_sample_bus_mute: function(busIndex, enable) {
  const bus = GodotAudio.Bus.getBusOrNull(busIndex);
  if (bus == null) {
   return;
  }
  bus.mute(enable);
 }
};

function _godot_audio_get_sample_playback_position(playbackObjectIdStrPtr) {
 if (ENVIRONMENT_IS_PTHREAD) return proxyToMainThread(50, 0, 1, playbackObjectIdStrPtr);
 const playbackObjectId = GodotRuntime.parseString(playbackObjectIdStrPtr);
 const sampleNode = GodotAudio.SampleNode.getSampleNodeOrNull(playbackObjectId);
 if (sampleNode == null) {
  return 0;
 }
 return sampleNode.getPlaybackPosition();
}

function _godot_audio_has_script_processor() {
 if (ENVIRONMENT_IS_PTHREAD) return proxyToMainThread(51, 0, 1);
 return GodotAudio.ctx && GodotAudio.ctx.createScriptProcessor ? 1 : 0;
}

function _godot_audio_has_worklet() {
 if (ENVIRONMENT_IS_PTHREAD) return proxyToMainThread(52, 0, 1);
 return GodotAudio.ctx && GodotAudio.ctx.audioWorklet ? 1 : 0;
}

function _godot_audio_init(p_mix_rate, p_latency, p_state_change, p_latency_update) {
 if (ENVIRONMENT_IS_PTHREAD) return proxyToMainThread(53, 0, 1, p_mix_rate, p_latency, p_state_change, p_latency_update);
 const statechange = GodotRuntime.get_func(p_state_change);
 const latencyupdate = GodotRuntime.get_func(p_latency_update);
 const mix_rate = GodotRuntime.getHeapValue(p_mix_rate, "i32");
 const channels = GodotAudio.init(mix_rate, p_latency, statechange, latencyupdate);
 GodotRuntime.setHeapValue(p_mix_rate, GodotAudio.ctx.sampleRate, "i32");
 return channels;
}

function _godot_audio_input_start() {
 if (ENVIRONMENT_IS_PTHREAD) return proxyToMainThread(54, 0, 1);
 return GodotAudio.create_input(function(input) {
  input.connect(GodotAudio.driver.get_node());
 });
}

function _godot_audio_input_stop() {
 if (ENVIRONMENT_IS_PTHREAD) return proxyToMainThread(55, 0, 1);
 if (GodotAudio.input) {
  const tracks = GodotAudio.input["mediaStream"]["getTracks"]();
  for (let i = 0; i < tracks.length; i++) {
   tracks[i]["stop"]();
  }
  GodotAudio.input.disconnect();
  GodotAudio.input = null;
 }
}

function _godot_audio_is_available() {
 if (ENVIRONMENT_IS_PTHREAD) return proxyToMainThread(56, 0, 1);
 if (!(window.AudioContext || window.webkitAudioContext)) {
  return 0;
 }
 return 1;
}

function _godot_audio_resume() {
 if (ENVIRONMENT_IS_PTHREAD) return proxyToMainThread(57, 0, 1);
 if (GodotAudio.ctx && GodotAudio.ctx.state !== "running") {
  GodotAudio.ctx.resume();
 }
}

function _godot_audio_sample_bus_add(atPos) {
 if (ENVIRONMENT_IS_PTHREAD) return proxyToMainThread(58, 0, 1, atPos);
 GodotAudio.add_sample_bus(atPos);
}

function _godot_audio_sample_bus_move(fromPos, toPos) {
 if (ENVIRONMENT_IS_PTHREAD) return proxyToMainThread(59, 0, 1, fromPos, toPos);
 GodotAudio.move_sample_bus(fromPos, toPos);
}

function _godot_audio_sample_bus_remove(index) {
 if (ENVIRONMENT_IS_PTHREAD) return proxyToMainThread(60, 0, 1, index);
 GodotAudio.remove_sample_bus(index);
}

function _godot_audio_sample_bus_set_count(count) {
 if (ENVIRONMENT_IS_PTHREAD) return proxyToMainThread(61, 0, 1, count);
 GodotAudio.set_sample_bus_count(count);
}

function _godot_audio_sample_bus_set_mute(bus, enable) {
 if (ENVIRONMENT_IS_PTHREAD) return proxyToMainThread(62, 0, 1, bus, enable);
 GodotAudio.set_sample_bus_mute(bus, Boolean(enable));
}

function _godot_audio_sample_bus_set_send(bus, sendIndex) {
 if (ENVIRONMENT_IS_PTHREAD) return proxyToMainThread(63, 0, 1, bus, sendIndex);
 GodotAudio.set_sample_bus_send(bus, sendIndex);
}

function _godot_audio_sample_bus_set_solo(bus, enable) {
 if (ENVIRONMENT_IS_PTHREAD) return proxyToMainThread(64, 0, 1, bus, enable);
 GodotAudio.set_sample_bus_solo(bus, Boolean(enable));
}

function _godot_audio_sample_bus_set_volume_db(bus, volumeDb) {
 if (ENVIRONMENT_IS_PTHREAD) return proxyToMainThread(65, 0, 1, bus, volumeDb);
 GodotAudio.set_sample_bus_volume_db(bus, volumeDb);
}

function _godot_audio_sample_is_active(playbackObjectIdStrPtr) {
 if (ENVIRONMENT_IS_PTHREAD) return proxyToMainThread(66, 0, 1, playbackObjectIdStrPtr);
 const playbackObjectId = GodotRuntime.parseString(playbackObjectIdStrPtr);
 return Number(GodotAudio.sampleNodes.has(playbackObjectId));
}

function _godot_audio_sample_register_stream(streamObjectIdStrPtr, framesPtr, framesTotal, loopModeStrPtr, loopBegin, loopEnd) {
 if (ENVIRONMENT_IS_PTHREAD) return proxyToMainThread(67, 0, 1, streamObjectIdStrPtr, framesPtr, framesTotal, loopModeStrPtr, loopBegin, loopEnd);
 const BYTES_PER_FLOAT32 = 4;
 const streamObjectId = GodotRuntime.parseString(streamObjectIdStrPtr);
 const loopMode = GodotRuntime.parseString(loopModeStrPtr);
 const numberOfChannels = 2;
 const sampleRate = GodotAudio.ctx.sampleRate;
 /** @type {Float32Array} */ const subLeft = GodotRuntime.heapSub(GROWABLE_HEAP_F32(), framesPtr, framesTotal);
 /** @type {Float32Array} */ const subRight = GodotRuntime.heapSub(GROWABLE_HEAP_F32(), framesPtr + framesTotal * BYTES_PER_FLOAT32, framesTotal);
 const audioBuffer = GodotAudio.ctx.createBuffer(numberOfChannels, framesTotal, sampleRate);
 audioBuffer.copyToChannel(new Float32Array(subLeft), 0, 0);
 audioBuffer.copyToChannel(new Float32Array(subRight), 1, 0);
 GodotAudio.Sample.create({
  id: streamObjectId,
  audioBuffer: audioBuffer
 }, {
  loopBegin: loopBegin,
  loopEnd: loopEnd,
  loopMode: loopMode,
  numberOfChannels: numberOfChannels,
  sampleRate: sampleRate
 });
}

function _godot_audio_sample_set_finished_callback(callbackPtr) {
 if (ENVIRONMENT_IS_PTHREAD) return proxyToMainThread(68, 0, 1, callbackPtr);
 GodotAudio.sampleFinishedCallback = GodotRuntime.get_func(callbackPtr);
}

function _godot_audio_sample_set_pause(playbackObjectIdStrPtr, pause) {
 if (ENVIRONMENT_IS_PTHREAD) return proxyToMainThread(69, 0, 1, playbackObjectIdStrPtr, pause);
 const playbackObjectId = GodotRuntime.parseString(playbackObjectIdStrPtr);
 GodotAudio.sample_set_pause(playbackObjectId, Boolean(pause));
}

function _godot_audio_sample_set_volumes_linear(playbackObjectIdStrPtr, busesPtr, busesSize, volumesPtr, volumesSize) {
 if (ENVIRONMENT_IS_PTHREAD) return proxyToMainThread(70, 0, 1, playbackObjectIdStrPtr, busesPtr, busesSize, volumesPtr, volumesSize);
 /** @type {string} */ const playbackObjectId = GodotRuntime.parseString(playbackObjectIdStrPtr);
 /** @type {Uint32Array} */ const buses = GodotRuntime.heapSub(GROWABLE_HEAP_I32(), busesPtr, busesSize);
 /** @type {Float32Array} */ const volumes = GodotRuntime.heapSub(GROWABLE_HEAP_F32(), volumesPtr, volumesSize);
 GodotAudio.sample_set_volumes_linear(playbackObjectId, Array.from(buses), volumes);
}

function _godot_audio_sample_start(playbackObjectIdStrPtr, streamObjectIdStrPtr, busIndex, offset, pitchScale, volumePtr) {
 if (ENVIRONMENT_IS_PTHREAD) return proxyToMainThread(71, 0, 1, playbackObjectIdStrPtr, streamObjectIdStrPtr, busIndex, offset, pitchScale, volumePtr);
 /** @type {string} */ const playbackObjectId = GodotRuntime.parseString(playbackObjectIdStrPtr);
 /** @type {string} */ const streamObjectId = GodotRuntime.parseString(streamObjectIdStrPtr);
 /** @type {Float32Array} */ const volume = GodotRuntime.heapSub(GROWABLE_HEAP_F32(), volumePtr, 8);
 /** @type {SampleNodeOptions} */ const startOptions = {
  offset: offset,
  volume: volume,
  playbackRate: 1,
  pitchScale: pitchScale,
  start: true
 };
 GodotAudio.start_sample(playbackObjectId, streamObjectId, busIndex, startOptions);
}

function _godot_audio_sample_stop(playbackObjectIdStrPtr) {
 if (ENVIRONMENT_IS_PTHREAD) return proxyToMainThread(72, 0, 1, playbackObjectIdStrPtr);
 const playbackObjectId = GodotRuntime.parseString(playbackObjectIdStrPtr);
 GodotAudio.stop_sample(playbackObjectId);
}

function _godot_audio_sample_stream_is_registered(streamObjectIdStrPtr) {
 if (ENVIRONMENT_IS_PTHREAD) return proxyToMainThread(73, 0, 1, streamObjectIdStrPtr);
 const streamObjectId = GodotRuntime.parseString(streamObjectIdStrPtr);
 return Number(GodotAudio.Sample.getSampleOrNull(streamObjectId) != null);
}

function _godot_audio_sample_unregister_stream(streamObjectIdStrPtr) {
 if (ENVIRONMENT_IS_PTHREAD) return proxyToMainThread(74, 0, 1, streamObjectIdStrPtr);
 const streamObjectId = GodotRuntime.parseString(streamObjectIdStrPtr);
 const sample = GodotAudio.Sample.getSampleOrNull(streamObjectId);
 if (sample != null) {
  sample.clear();
 }
}

function _godot_audio_sample_update_pitch_scale(playbackObjectIdStrPtr, pitchScale) {
 if (ENVIRONMENT_IS_PTHREAD) return proxyToMainThread(75, 0, 1, playbackObjectIdStrPtr, pitchScale);
 const playbackObjectId = GodotRuntime.parseString(playbackObjectIdStrPtr);
 GodotAudio.update_sample_pitch_scale(playbackObjectId, pitchScale);
}

var GodotAudioScript = {
 script: null,
 create: function(buffer_length, channel_count) {
  GodotAudioScript.script = GodotAudio.ctx.createScriptProcessor(buffer_length, 2, channel_count);
  GodotAudio.driver = GodotAudioScript;
  return GodotAudioScript.script.bufferSize;
 },
 start: function(p_in_buf, p_in_size, p_out_buf, p_out_size, onprocess) {
  GodotAudioScript.script.onaudioprocess = function(event) {
   const inb = GodotRuntime.heapSub(GROWABLE_HEAP_F32(), p_in_buf, p_in_size);
   const input = event.inputBuffer;
   if (GodotAudio.input) {
    const inlen = input.getChannelData(0).length;
    for (let ch = 0; ch < 2; ch++) {
     const data = input.getChannelData(ch);
     for (let s = 0; s < inlen; s++) {
      inb[s * 2 + ch] = data[s];
     }
    }
   }
   onprocess();
   const outb = GodotRuntime.heapSub(GROWABLE_HEAP_F32(), p_out_buf, p_out_size);
   const output = event.outputBuffer;
   const channels = output.numberOfChannels;
   for (let ch = 0; ch < channels; ch++) {
    const data = output.getChannelData(ch);
    for (let sample = 0; sample < data.length; sample++) {
     data[sample] = outb[sample * channels + ch];
    }
   }
  };
  GodotAudioScript.script.connect(GodotAudio.ctx.destination);
 },
 get_node: function() {
  return GodotAudioScript.script;
 },
 close: function() {
  return new Promise(function(resolve, reject) {
   if (GodotAudioScript.script) {
    GodotAudioScript.script.disconnect();
    GodotAudioScript.script.onaudioprocess = null;
    GodotAudioScript.script = null;
   }
   resolve();
  });
 }
};

function _godot_audio_script_create(buffer_length, channel_count) {
 if (ENVIRONMENT_IS_PTHREAD) return proxyToMainThread(76, 0, 1, buffer_length, channel_count);
 const buf_len = GodotRuntime.getHeapValue(buffer_length, "i32");
 try {
  const out_len = GodotAudioScript.create(buf_len, channel_count);
  GodotRuntime.setHeapValue(buffer_length, out_len, "i32");
 } catch (e) {
  GodotRuntime.error("Error starting AudioDriverScriptProcessor", e);
  return 1;
 }
 return 0;
}

function _godot_audio_script_start(p_in_buf, p_in_size, p_out_buf, p_out_size, p_cb) {
 if (ENVIRONMENT_IS_PTHREAD) return proxyToMainThread(77, 0, 1, p_in_buf, p_in_size, p_out_buf, p_out_size, p_cb);
 const onprocess = GodotRuntime.get_func(p_cb);
 GodotAudioScript.start(p_in_buf, p_in_size, p_out_buf, p_out_size, onprocess);
}

var GodotAudioWorklet = {
 promise: null,
 worklet: null,
 ring_buffer: null,
 create: function(channels) {
  const path = GodotConfig.locate_file("godot.audio.worklet.js");
  GodotAudioWorklet.promise = GodotAudio.ctx.audioWorklet.addModule(path).then(function() {
   GodotAudioWorklet.worklet = new AudioWorkletNode(GodotAudio.ctx, "godot-processor", {
    outputChannelCount: [ channels ]
   });
   return Promise.resolve();
  });
  GodotAudio.driver = GodotAudioWorklet;
 },
 start: function(in_buf, out_buf, state) {
  GodotAudioWorklet.promise.then(function() {
   const node = GodotAudioWorklet.worklet;
   node.connect(GodotAudio.ctx.destination);
   node.port.postMessage({
    "cmd": "start",
    "data": [ state, in_buf, out_buf ]
   });
   node.port.onmessage = function(event) {
    GodotRuntime.error(event.data);
   };
  });
 },
 start_no_threads: function(p_out_buf, p_out_size, out_callback, p_in_buf, p_in_size, in_callback) {
  function RingBuffer() {
   let wpos = 0;
   let rpos = 0;
   let pending_samples = 0;
   const wbuf = new Float32Array(p_out_size);
   function send(port) {
    if (pending_samples === 0) {
     return;
    }
    const buffer = GodotRuntime.heapSub(GROWABLE_HEAP_F32(), p_out_buf, p_out_size);
    const size = buffer.length;
    const tot_sent = pending_samples;
    out_callback(wpos, pending_samples);
    if (wpos + pending_samples >= size) {
     const high = size - wpos;
     wbuf.set(buffer.subarray(wpos, size));
     pending_samples -= high;
     wpos = 0;
    }
    if (pending_samples > 0) {
     wbuf.set(buffer.subarray(wpos, wpos + pending_samples), tot_sent - pending_samples);
    }
    port.postMessage({
     "cmd": "chunk",
     "data": wbuf.subarray(0, tot_sent)
    });
    wpos += pending_samples;
    pending_samples = 0;
   }
   this.receive = function(recv_buf) {
    const buffer = GodotRuntime.heapSub(GROWABLE_HEAP_F32(), p_in_buf, p_in_size);
    const from = rpos;
    let to_write = recv_buf.length;
    let high = 0;
    if (rpos + to_write >= p_in_size) {
     high = p_in_size - rpos;
     buffer.set(recv_buf.subarray(0, high), rpos);
     to_write -= high;
     rpos = 0;
    }
    if (to_write) {
     buffer.set(recv_buf.subarray(high, to_write), rpos);
    }
    in_callback(from, recv_buf.length);
    rpos += to_write;
   };
   this.consumed = function(size, port) {
    pending_samples += size;
    send(port);
   };
  }
  GodotAudioWorklet.ring_buffer = new RingBuffer;
  GodotAudioWorklet.promise.then(function() {
   const node = GodotAudioWorklet.worklet;
   const buffer = GodotRuntime.heapSlice(GROWABLE_HEAP_F32(), p_out_buf, p_out_size);
   node.connect(GodotAudio.ctx.destination);
   node.port.postMessage({
    "cmd": "start_nothreads",
    "data": [ buffer, p_in_size ]
   });
   node.port.onmessage = function(event) {
    if (!GodotAudioWorklet.worklet) {
     return;
    }
    if (event.data["cmd"] === "read") {
     const read = event.data["data"];
     GodotAudioWorklet.ring_buffer.consumed(read, GodotAudioWorklet.worklet.port);
    } else if (event.data["cmd"] === "input") {
     const buf = event.data["data"];
     if (buf.length > p_in_size) {
      GodotRuntime.error("Input chunk is too big");
      return;
     }
     GodotAudioWorklet.ring_buffer.receive(buf);
    } else {
     GodotRuntime.error(event.data);
    }
   };
  });
 },
 get_node: function() {
  return GodotAudioWorklet.worklet;
 },
 close: function() {
  return new Promise(function(resolve, reject) {
   if (GodotAudioWorklet.promise === null) {
    resolve();
    return;
   }
   const p = GodotAudioWorklet.promise;
   p.then(function() {
    GodotAudioWorklet.worklet.port.postMessage({
     "cmd": "stop",
     "data": null
    });
    GodotAudioWorklet.worklet.disconnect();
    GodotAudioWorklet.worklet.port.onmessage = null;
    GodotAudioWorklet.worklet = null;
    GodotAudioWorklet.promise = null;
    resolve();
   }).catch(function(err) {
    GodotRuntime.error(err);
   });
  });
 }
};

function _godot_audio_worklet_create(channels) {
 if (ENVIRONMENT_IS_PTHREAD) return proxyToMainThread(78, 0, 1, channels);
 try {
  GodotAudioWorklet.create(channels);
 } catch (e) {
  GodotRuntime.error("Error starting AudioDriverWorklet", e);
  return 1;
 }
 return 0;
}

function _godot_audio_worklet_start(p_in_buf, p_in_size, p_out_buf, p_out_size, p_state) {
 if (ENVIRONMENT_IS_PTHREAD) return proxyToMainThread(79, 0, 1, p_in_buf, p_in_size, p_out_buf, p_out_size, p_state);
 const out_buffer = GodotRuntime.heapSub(GROWABLE_HEAP_F32(), p_out_buf, p_out_size);
 const in_buffer = GodotRuntime.heapSub(GROWABLE_HEAP_F32(), p_in_buf, p_in_size);
 const state = GodotRuntime.heapSub(GROWABLE_HEAP_I32(), p_state, 4);
 GodotAudioWorklet.start(in_buffer, out_buffer, state);
}

function _godot_audio_worklet_state_add(p_state, p_idx, p_value) {
 return Atomics.add(GROWABLE_HEAP_I32(), (p_state >> 2) + p_idx, p_value);
}

function _godot_audio_worklet_state_get(p_state, p_idx) {
 return Atomics.load(GROWABLE_HEAP_I32(), (p_state >> 2) + p_idx);
}

function _godot_audio_worklet_state_wait(p_state, p_idx, p_expected, p_timeout) {
 Atomics.wait(GROWABLE_HEAP_I32(), (p_state >> 2) + p_idx, p_expected, p_timeout);
 return Atomics.load(GROWABLE_HEAP_I32(), (p_state >> 2) + p_idx);
}

function _godot_js_config_canvas_id_get(p_ptr, p_ptr_max) {
 if (ENVIRONMENT_IS_PTHREAD) return proxyToMainThread(80, 0, 1, p_ptr, p_ptr_max);
 GodotRuntime.stringToHeap(`#${GodotConfig.canvas.id}`, p_ptr, p_ptr_max);
}

function _godot_js_config_locale_get(p_ptr, p_ptr_max) {
 if (ENVIRONMENT_IS_PTHREAD) return proxyToMainThread(81, 0, 1, p_ptr, p_ptr_max);
 GodotRuntime.stringToHeap(GodotConfig.locale, p_ptr, p_ptr_max);
}

var GodotDisplayCursor = {
 shape: "default",
 visible: true,
 cursors: {},
 set_style: function(style) {
  GodotConfig.canvas.style.cursor = style;
 },
 set_shape: function(shape) {
  GodotDisplayCursor.shape = shape;
  let css = shape;
  if (shape in GodotDisplayCursor.cursors) {
   const c = GodotDisplayCursor.cursors[shape];
   css = `url("${c.url}") ${c.x} ${c.y}, default`;
  }
  if (GodotDisplayCursor.visible) {
   GodotDisplayCursor.set_style(css);
  }
 },
 clear: function() {
  GodotDisplayCursor.set_style("");
  GodotDisplayCursor.shape = "default";
  GodotDisplayCursor.visible = true;
  Object.keys(GodotDisplayCursor.cursors).forEach(function(key) {
   URL.revokeObjectURL(GodotDisplayCursor.cursors[key]);
   delete GodotDisplayCursor.cursors[key];
  });
 },
 lockPointer: function() {
  const canvas = GodotConfig.canvas;
  if (canvas.requestPointerLock) {
   canvas.requestPointerLock();
  }
 },
 releasePointer: function() {
  if (document.exitPointerLock) {
   document.exitPointerLock();
  }
 },
 isPointerLocked: function() {
  return document.pointerLockElement === GodotConfig.canvas;
 }
};

var GodotEventListeners = {
 handlers: [],
 has: function(target, event, method, capture) {
  return GodotEventListeners.handlers.findIndex(function(e) {
   return e.target === target && e.event === event && e.method === method && e.capture === capture;
  }) !== -1;
 },
 add: function(target, event, method, capture) {
  if (GodotEventListeners.has(target, event, method, capture)) {
   return;
  }
  function Handler(p_target, p_event, p_method, p_capture) {
   this.target = p_target;
   this.event = p_event;
   this.method = p_method;
   this.capture = p_capture;
  }
  GodotEventListeners.handlers.push(new Handler(target, event, method, capture));
  target.addEventListener(event, method, capture);
 },
 clear: function() {
  GodotEventListeners.handlers.forEach(function(h) {
   h.target.removeEventListener(h.event, h.method, h.capture);
  });
  GodotEventListeners.handlers.length = 0;
 }
};

var GodotDisplayScreen = {
 desired_size: [ 0, 0 ],
 hidpi: true,
 getPixelRatio: function() {
  return GodotDisplayScreen.hidpi ? window.devicePixelRatio || 1 : 1;
 },
 isFullscreen: function() {
  const elem = document.fullscreenElement || document.mozFullscreenElement || document.webkitFullscreenElement || document.msFullscreenElement;
  if (elem) {
   return elem === GodotConfig.canvas;
  }
  return document.fullscreen || document.mozFullScreen || document.webkitIsFullscreen;
 },
 hasFullscreen: function() {
  return document.fullscreenEnabled || document.mozFullScreenEnabled || document.webkitFullscreenEnabled;
 },
 requestFullscreen: function() {
  if (!GodotDisplayScreen.hasFullscreen()) {
   return 1;
  }
  const canvas = GodotConfig.canvas;
  try {
   const promise = (canvas.requestFullscreen || canvas.msRequestFullscreen || canvas.mozRequestFullScreen || canvas.mozRequestFullscreen || canvas.webkitRequestFullscreen).call(canvas);
   if (promise) {
    promise.catch(function() {});
   }
  } catch (e) {
   return 1;
  }
  return 0;
 },
 exitFullscreen: function() {
  if (!GodotDisplayScreen.isFullscreen()) {
   return 0;
  }
  try {
   const promise = document.exitFullscreen();
   if (promise) {
    promise.catch(function() {});
   }
  } catch (e) {
   return 1;
  }
  return 0;
 },
 _updateGL: function() {
  const gl_context_handle = _emscripten_webgl_get_current_context();
  const gl = GL.getContext(gl_context_handle);
  if (gl) {
   GL.resizeOffscreenFramebuffer(gl);
  }
 },
 updateSize: function() {
  const isFullscreen = GodotDisplayScreen.isFullscreen();
  const wantsFullWindow = GodotConfig.canvas_resize_policy === 2;
  const noResize = GodotConfig.canvas_resize_policy === 0;
  const dWidth = GodotDisplayScreen.desired_size[0];
  const dHeight = GodotDisplayScreen.desired_size[1];
  const canvas = GodotConfig.canvas;
  let width = dWidth;
  let height = dHeight;
  if (noResize) {
   if (canvas.width !== width || canvas.height !== height) {
    GodotDisplayScreen.desired_size = [ canvas.width, canvas.height ];
    GodotDisplayScreen._updateGL();
    return 1;
   }
   return 0;
  }
  const scale = GodotDisplayScreen.getPixelRatio();
  if (isFullscreen || wantsFullWindow) {
   width = Math.floor(window.innerWidth * scale);
   height = Math.floor(window.innerHeight * scale);
  }
  const csw = `${Math.floor(width / scale)}px`;
  const csh = `${Math.floor(height / scale)}px`;
  if (canvas.style.width !== csw || canvas.style.height !== csh || canvas.width !== width || canvas.height !== height) {
   canvas.width = width;
   canvas.height = height;
   canvas.style.width = csw;
   canvas.style.height = csh;
   GodotDisplayScreen._updateGL();
   return 1;
  }
  return 0;
 }
};

var GodotInputGamepads = {
 samples: [],
 get_pads: function() {
  try {
   const pads = navigator.getGamepads();
   if (pads) {
    return pads;
   }
   return [];
  } catch (e) {
   return [];
  }
 },
 get_samples: function() {
  return GodotInputGamepads.samples;
 },
 get_sample: function(index) {
  const samples = GodotInputGamepads.samples;
  return index < samples.length ? samples[index] : null;
 },
 sample: function() {
  const pads = GodotInputGamepads.get_pads();
  const samples = [];
  for (let i = 0; i < pads.length; i++) {
   const pad = pads[i];
   if (!pad) {
    samples.push(null);
    continue;
   }
   const s = {
    standard: pad.mapping === "standard",
    buttons: [],
    axes: [],
    connected: pad.connected
   };
   for (let b = 0; b < pad.buttons.length; b++) {
    s.buttons.push(pad.buttons[b].value);
   }
   for (let a = 0; a < pad.axes.length; a++) {
    s.axes.push(pad.axes[a]);
   }
   samples.push(s);
  }
  GodotInputGamepads.samples = samples;
 },
 init: function(onchange) {
  GodotInputGamepads.samples = [];
  function add(pad) {
   const guid = GodotInputGamepads.get_guid(pad);
   const c_id = GodotRuntime.allocString(pad.id);
   const c_guid = GodotRuntime.allocString(guid);
   onchange(pad.index, 1, c_id, c_guid);
   GodotRuntime.free(c_id);
   GodotRuntime.free(c_guid);
  }
  const pads = GodotInputGamepads.get_pads();
  for (let i = 0; i < pads.length; i++) {
   if (pads[i]) {
    add(pads[i]);
   }
  }
  GodotEventListeners.add(window, "gamepadconnected", function(evt) {
   if (evt.gamepad) {
    add(evt.gamepad);
   }
  }, false);
  GodotEventListeners.add(window, "gamepaddisconnected", function(evt) {
   if (evt.gamepad) {
    onchange(evt.gamepad.index, 0);
   }
  }, false);
 },
 get_guid: function(pad) {
  if (pad.mapping) {
   return pad.mapping;
  }
  const ua = navigator.userAgent;
  let os = "Unknown";
  if (ua.indexOf("Android") >= 0) {
   os = "Android";
  } else if (ua.indexOf("Linux") >= 0) {
   os = "Linux";
  } else if (ua.indexOf("iPhone") >= 0) {
   os = "iOS";
  } else if (ua.indexOf("Macintosh") >= 0) {
   os = "MacOSX";
  } else if (ua.indexOf("Windows") >= 0) {
   os = "Windows";
  }
  const id = pad.id;
  const exp1 = /vendor: ([0-9a-f]{4}) product: ([0-9a-f]{4})/i;
  const exp2 = /^([0-9a-f]+)-([0-9a-f]+)-/i;
  let vendor = "";
  let product = "";
  if (exp1.test(id)) {
   const match = exp1.exec(id);
   vendor = match[1].padStart(4, "0");
   product = match[2].padStart(4, "0");
  } else if (exp2.test(id)) {
   const match = exp2.exec(id);
   vendor = match[1].padStart(4, "0");
   product = match[2].padStart(4, "0");
  }
  if (!vendor || !product) {
   return `${os}Unknown`;
  }
  return os + vendor + product;
 }
};

var GodotInputDragDrop = {
 promises: [],
 pending_files: [],
 add_entry: function(entry) {
  if (entry.isDirectory) {
   GodotInputDragDrop.add_dir(entry);
  } else if (entry.isFile) {
   GodotInputDragDrop.add_file(entry);
  } else {
   GodotRuntime.error("Unrecognized entry...", entry);
  }
 },
 add_dir: function(entry) {
  GodotInputDragDrop.promises.push(new Promise(function(resolve, reject) {
   const reader = entry.createReader();
   reader.readEntries(function(entries) {
    for (let i = 0; i < entries.length; i++) {
     GodotInputDragDrop.add_entry(entries[i]);
    }
    resolve();
   });
  }));
 },
 add_file: function(entry) {
  GodotInputDragDrop.promises.push(new Promise(function(resolve, reject) {
   entry.file(function(file) {
    const reader = new FileReader;
    reader.onload = function() {
     const f = {
      "path": file.relativePath || file.webkitRelativePath,
      "name": file.name,
      "type": file.type,
      "size": file.size,
      "data": reader.result
     };
     if (!f["path"]) {
      f["path"] = f["name"];
     }
     GodotInputDragDrop.pending_files.push(f);
     resolve();
    };
    reader.onerror = function() {
     GodotRuntime.print("Error reading file");
     reject();
    };
    reader.readAsArrayBuffer(file);
   }, function(err) {
    GodotRuntime.print("Error!");
    reject();
   });
  }));
 },
 process: function(resolve, reject) {
  if (GodotInputDragDrop.promises.length === 0) {
   resolve();
   return;
  }
  GodotInputDragDrop.promises.pop().then(function() {
   setTimeout(function() {
    GodotInputDragDrop.process(resolve, reject);
   }, 0);
  });
 },
 _process_event: function(ev, callback) {
  ev.preventDefault();
  if (ev.dataTransfer.items) {
   for (let i = 0; i < ev.dataTransfer.items.length; i++) {
    const item = ev.dataTransfer.items[i];
    let entry = null;
    if ("getAsEntry" in item) {
     entry = item.getAsEntry();
    } else if ("webkitGetAsEntry" in item) {
     entry = item.webkitGetAsEntry();
    }
    if (entry) {
     GodotInputDragDrop.add_entry(entry);
    }
   }
  } else {
   GodotRuntime.error("File upload not supported");
  }
  new Promise(GodotInputDragDrop.process).then(function() {
   const DROP = `/tmp/drop-${parseInt(Math.random() * (1 << 30), 10)}/`;
   const drops = [];
   const files = [];
   FS.mkdir(DROP.slice(0, -1));
   GodotInputDragDrop.pending_files.forEach(elem => {
    const path = elem["path"];
    GodotFS.copy_to_fs(DROP + path, elem["data"]);
    let idx = path.indexOf("/");
    if (idx === -1) {
     drops.push(DROP + path);
    } else {
     const sub = path.substr(0, idx);
     idx = sub.indexOf("/");
     if (idx < 0 && drops.indexOf(DROP + sub) === -1) {
      drops.push(DROP + sub);
     }
    }
    files.push(DROP + path);
   });
   GodotInputDragDrop.promises = [];
   GodotInputDragDrop.pending_files = [];
   callback(drops);
   if (GodotConfig.persistent_drops) {
    GodotOS.atexit(function(resolve, reject) {
     GodotInputDragDrop.remove_drop(files, DROP);
     resolve();
    });
   } else {
    GodotInputDragDrop.remove_drop(files, DROP);
   }
  });
 },
 remove_drop: function(files, drop_path) {
  const dirs = [ drop_path.substr(0, drop_path.length - 1) ];
  files.forEach(function(file) {
   FS.unlink(file);
   let dir = file.replace(drop_path, "");
   let idx = dir.lastIndexOf("/");
   while (idx > 0) {
    dir = dir.substr(0, idx);
    if (dirs.indexOf(drop_path + dir) === -1) {
     dirs.push(drop_path + dir);
    }
    idx = dir.lastIndexOf("/");
   }
  });
  dirs.sort(function(a, b) {
   const al = (a.match(/\//g) || []).length;
   const bl = (b.match(/\//g) || []).length;
   if (al > bl) {
    return -1;
   } else if (al < bl) {
    return 1;
   }
   return 0;
  }).forEach(function(dir) {
   FS.rmdir(dir);
  });
 },
 handler: function(callback) {
  return function(ev) {
   GodotInputDragDrop._process_event(ev, callback);
  };
 }
};

var GodotIME = {
 ime: null,
 active: false,
 focusTimerIntervalId: -1,
 getModifiers: function(evt) {
  return (evt.shiftKey + 0) + ((evt.altKey + 0) << 1) + ((evt.ctrlKey + 0) << 2) + ((evt.metaKey + 0) << 3);
 },
 ime_active: function(active) {
  function clearFocusTimerInterval() {
   clearInterval(GodotIME.focusTimerIntervalId);
   GodotIME.focusTimerIntervalId = -1;
  }
  function focusTimer() {
   if (GodotIME.ime == null) {
    clearFocusTimerInterval();
    return;
   }
   GodotIME.ime.focus();
  }
  if (GodotIME.focusTimerIntervalId > -1) {
   clearFocusTimerInterval();
  }
  if (GodotIME.ime == null) {
   return;
  }
  GodotIME.active = active;
  if (active) {
   GodotIME.ime.style.display = "block";
   GodotIME.focusTimerIntervalId = setInterval(focusTimer, 100);
  } else {
   GodotIME.ime.style.display = "none";
   GodotConfig.canvas.focus();
  }
 },
 ime_position: function(x, y) {
  if (GodotIME.ime == null) {
   return;
  }
  const canvas = GodotConfig.canvas;
  const rect = canvas.getBoundingClientRect();
  const rw = canvas.width / rect.width;
  const rh = canvas.height / rect.height;
  const clx = (x / rw) + rect.x;
  const cly = (y / rh) + rect.y;
  GodotIME.ime.style.left = `${clx}px`;
  GodotIME.ime.style.top = `${cly}px`;
 },
 init: function(ime_cb, key_cb, code, key) {
  function key_event_cb(pressed, evt) {
   const modifiers = GodotIME.getModifiers(evt);
   GodotRuntime.stringToHeap(evt.code, code, 32);
   GodotRuntime.stringToHeap(evt.key, key, 32);
   key_cb(pressed, evt.repeat, modifiers);
   evt.preventDefault();
  }
  function ime_event_cb(event) {
   if (GodotIME.ime == null) {
    return;
   }
   switch (event.type) {
   case "compositionstart":
    ime_cb(0, null);
    GodotIME.ime.innerHTML = "";
    break;

   case "compositionupdate":
    {
     const ptr = GodotRuntime.allocString(event.data);
     ime_cb(1, ptr);
     GodotRuntime.free(ptr);
    }
    break;

   case "compositionend":
    {
     const ptr = GodotRuntime.allocString(event.data);
     ime_cb(2, ptr);
     GodotRuntime.free(ptr);
     GodotIME.ime.innerHTML = "";
    }
    break;

   default:
   }
  }
  const ime = document.createElement("div");
  ime.className = "ime";
  ime.style.background = "none";
  ime.style.opacity = 0;
  ime.style.position = "fixed";
  ime.style.textAlign = "left";
  ime.style.fontSize = "1px";
  ime.style.left = "0px";
  ime.style.top = "0px";
  ime.style.width = "100%";
  ime.style.height = "40px";
  ime.style.pointerEvents = "none";
  ime.style.display = "none";
  ime.contentEditable = "true";
  GodotEventListeners.add(ime, "compositionstart", ime_event_cb, false);
  GodotEventListeners.add(ime, "compositionupdate", ime_event_cb, false);
  GodotEventListeners.add(ime, "compositionend", ime_event_cb, false);
  GodotEventListeners.add(ime, "keydown", key_event_cb.bind(null, 1), false);
  GodotEventListeners.add(ime, "keyup", key_event_cb.bind(null, 0), false);
  ime.onblur = function() {
   this.style.display = "none";
   GodotConfig.canvas.focus();
   GodotIME.active = false;
  };
  GodotConfig.canvas.parentElement.appendChild(ime);
  GodotIME.ime = ime;
 },
 clear: function() {
  if (GodotIME.ime == null) {
   return;
  }
  if (GodotIME.focusTimerIntervalId > -1) {
   clearInterval(GodotIME.focusTimerIntervalId);
   GodotIME.focusTimerIntervalId = -1;
  }
  GodotIME.ime.remove();
  GodotIME.ime = null;
 }
};

var GodotInput = {
 inputKeyCallback: null,
 setInputKeyData: null,
 getModifiers: function(evt) {
  return (evt.shiftKey + 0) + ((evt.altKey + 0) << 1) + ((evt.ctrlKey + 0) << 2) + ((evt.metaKey + 0) << 3);
 },
 computePosition: function(evt, rect) {
  const canvas = GodotConfig.canvas;
  const rw = canvas.width / rect.width;
  const rh = canvas.height / rect.height;
  const x = (evt.clientX - rect.x) * rw;
  const y = (evt.clientY - rect.y) * rh;
  return [ x, y ];
 },
 onKeyEvent: function(pIsPressed, pEvent) {
  if (GodotInput.inputKeyCallback == null) {
   throw new TypeError("GodotInput.onKeyEvent(): GodotInput.inputKeyCallback is null, cannot process key event.");
  }
  if (GodotInput.setInputKeyData == null) {
   throw new TypeError("GodotInput.onKeyEvent(): GodotInput.setInputKeyData is null, cannot process key event.");
  }
  const modifiers = GodotInput.getModifiers(pEvent);
  GodotInput.setInputKeyData(pEvent.code, pEvent.key);
  GodotInput.inputKeyCallback(pIsPressed ? 1 : 0, pEvent.repeat, modifiers);
  pEvent.preventDefault();
 }
};

var GodotDisplayVK = {
 textinput: null,
 textarea: null,
 available: function() {
  return GodotConfig.virtual_keyboard && "ontouchstart" in window;
 },
 init: function(input_cb) {
  function create(what) {
   const elem = document.createElement(what);
   elem.style.display = "none";
   elem.style.position = "absolute";
   elem.style.zIndex = "-1";
   elem.style.background = "transparent";
   elem.style.padding = "0px";
   elem.style.margin = "0px";
   elem.style.overflow = "hidden";
   elem.style.width = "0px";
   elem.style.height = "0px";
   elem.style.border = "0px";
   elem.style.outline = "none";
   elem.readonly = true;
   elem.disabled = true;
   GodotEventListeners.add(elem, "input", function(evt) {
    const c_str = GodotRuntime.allocString(elem.value);
    input_cb(c_str, elem.selectionEnd);
    GodotRuntime.free(c_str);
   }, false);
   if (what === "input") {
    const onKey = (pEvent, pEventName) => {
     if (pEvent.key !== "Enter") {
      return;
     }
     GodotInput.onKeyEvent(pEventName === "keydown", pEvent);
    };
    GodotEventListeners.add(elem, "keydown", pEvent => onKey(pEvent, "keydown"), false);
    GodotEventListeners.add(elem, "keyup", pEvent => onKey(pEvent, "keyup"), false);
   }
   GodotEventListeners.add(elem, "blur", function(evt) {
    elem.style.display = "none";
    elem.readonly = true;
    elem.disabled = true;
   }, false);
   GodotConfig.canvas.insertAdjacentElement("beforebegin", elem);
   return elem;
  }
  GodotDisplayVK.textinput = create("input");
  GodotDisplayVK.textarea = create("textarea");
  GodotDisplayVK.updateSize();
 },
 show: function(text, type, start, end) {
  if (!GodotDisplayVK.textinput || !GodotDisplayVK.textarea) {
   return;
  }
  if (GodotDisplayVK.textinput.style.display !== "" || GodotDisplayVK.textarea.style.display !== "") {
   GodotDisplayVK.hide();
  }
  GodotDisplayVK.updateSize();
  let elem = GodotDisplayVK.textinput;
  switch (type) {
  case 0:
   elem.type = "text";
   elem.inputmode = "";
   break;

  case 1:
   elem = GodotDisplayVK.textarea;
   break;

  case 2:
   elem.type = "text";
   elem.inputmode = "numeric";
   break;

  case 3:
   elem.type = "text";
   elem.inputmode = "decimal";
   break;

  case 4:
   elem.type = "tel";
   elem.inputmode = "";
   break;

  case 5:
   elem.type = "email";
   elem.inputmode = "";
   break;

  case 6:
   elem.type = "password";
   elem.inputmode = "";
   break;

  case 7:
   elem.type = "url";
   elem.inputmode = "";
   break;

  default:
   elem.type = "text";
   elem.inputmode = "";
   break;
  }
  elem.readonly = false;
  elem.disabled = false;
  elem.value = text;
  elem.style.display = "block";
  elem.focus();
  elem.setSelectionRange(start, end);
 },
 hide: function() {
  if (!GodotDisplayVK.textinput || !GodotDisplayVK.textarea) {
   return;
  }
  [ GodotDisplayVK.textinput, GodotDisplayVK.textarea ].forEach(function(elem) {
   elem.blur();
   elem.style.display = "none";
   elem.value = "";
  });
 },
 updateSize: function() {
  if (!GodotDisplayVK.textinput || !GodotDisplayVK.textarea) {
   return;
  }
  const rect = GodotConfig.canvas.getBoundingClientRect();
  function update(elem) {
   elem.style.left = `${rect.left}px`;
   elem.style.top = `${rect.top}px`;
   elem.style.width = `${rect.width}px`;
   elem.style.height = `${rect.height}px`;
  }
  update(GodotDisplayVK.textinput);
  update(GodotDisplayVK.textarea);
 },
 clear: function() {
  if (GodotDisplayVK.textinput) {
   GodotDisplayVK.textinput.remove();
   GodotDisplayVK.textinput = null;
  }
  if (GodotDisplayVK.textarea) {
   GodotDisplayVK.textarea.remove();
   GodotDisplayVK.textarea = null;
  }
 }
};

var GodotDisplay = {
 window_icon: "",
 getDPI: function() {
  const dpi = Math.round(window.devicePixelRatio * 96);
  return dpi >= 96 ? dpi : 96;
 }
};

function _godot_js_display_alert(p_text) {
 if (ENVIRONMENT_IS_PTHREAD) return proxyToMainThread(82, 0, 1, p_text);
 window.alert(GodotRuntime.parseString(p_text));
}

function _godot_js_display_canvas_focus() {
 if (ENVIRONMENT_IS_PTHREAD) return proxyToMainThread(83, 0, 1);
 GodotConfig.canvas.focus();
}

function _godot_js_display_canvas_is_focused() {
 if (ENVIRONMENT_IS_PTHREAD) return proxyToMainThread(84, 0, 1);
 return document.activeElement === GodotConfig.canvas;
}

function _godot_js_display_clipboard_get(callback) {
 if (ENVIRONMENT_IS_PTHREAD) return proxyToMainThread(85, 0, 1, callback);
 const func = GodotRuntime.get_func(callback);
 try {
  navigator.clipboard.readText().then(function(result) {
   const ptr = GodotRuntime.allocString(result);
   func(ptr);
   GodotRuntime.free(ptr);
  }).catch(function(e) {});
 }  catch (e) {}
}

function _godot_js_display_clipboard_set(p_text) {
 if (ENVIRONMENT_IS_PTHREAD) return proxyToMainThread(86, 0, 1, p_text);
 const text = GodotRuntime.parseString(p_text);
 if (!navigator.clipboard || !navigator.clipboard.writeText) {
  return 1;
 }
 navigator.clipboard.writeText(text).catch(function(e) {
  GodotRuntime.error("Setting OS clipboard is only possible from an input callback for the Web platform. Exception:", e);
 });
 return 0;
}

function _godot_js_display_cursor_is_hidden() {
 if (ENVIRONMENT_IS_PTHREAD) return proxyToMainThread(87, 0, 1);
 return !GodotDisplayCursor.visible;
}

function _godot_js_display_cursor_is_locked() {
 if (ENVIRONMENT_IS_PTHREAD) return proxyToMainThread(88, 0, 1);
 return GodotDisplayCursor.isPointerLocked() ? 1 : 0;
}

function _godot_js_display_cursor_lock_set(p_lock) {
 if (ENVIRONMENT_IS_PTHREAD) return proxyToMainThread(89, 0, 1, p_lock);
 if (p_lock) {
  GodotDisplayCursor.lockPointer();
 } else {
  GodotDisplayCursor.releasePointer();
 }
}

function _godot_js_display_cursor_set_custom_shape(p_shape, p_ptr, p_len, p_hotspot_x, p_hotspot_y) {
 if (ENVIRONMENT_IS_PTHREAD) return proxyToMainThread(90, 0, 1, p_shape, p_ptr, p_len, p_hotspot_x, p_hotspot_y);
 const shape = GodotRuntime.parseString(p_shape);
 const old_shape = GodotDisplayCursor.cursors[shape];
 if (p_len > 0) {
  const png = new Blob([ GodotRuntime.heapSlice(GROWABLE_HEAP_U8(), p_ptr, p_len) ], {
   type: "image/png"
  });
  const url = URL.createObjectURL(png);
  GodotDisplayCursor.cursors[shape] = {
   url: url,
   x: p_hotspot_x,
   y: p_hotspot_y
  };
 } else {
  delete GodotDisplayCursor.cursors[shape];
 }
 if (shape === GodotDisplayCursor.shape) {
  GodotDisplayCursor.set_shape(GodotDisplayCursor.shape);
 }
 if (old_shape) {
  URL.revokeObjectURL(old_shape.url);
 }
}

function _godot_js_display_cursor_set_shape(p_string) {
 if (ENVIRONMENT_IS_PTHREAD) return proxyToMainThread(91, 0, 1, p_string);
 GodotDisplayCursor.set_shape(GodotRuntime.parseString(p_string));
}

function _godot_js_display_cursor_set_visible(p_visible) {
 if (ENVIRONMENT_IS_PTHREAD) return proxyToMainThread(92, 0, 1, p_visible);
 const visible = p_visible !== 0;
 if (visible === GodotDisplayCursor.visible) {
  return;
 }
 GodotDisplayCursor.visible = visible;
 if (visible) {
  GodotDisplayCursor.set_shape(GodotDisplayCursor.shape);
 } else {
  GodotDisplayCursor.set_style("none");
 }
}

function _godot_js_display_desired_size_set(width, height) {
 if (ENVIRONMENT_IS_PTHREAD) return proxyToMainThread(93, 0, 1, width, height);
 GodotDisplayScreen.desired_size = [ width, height ];
 GodotDisplayScreen.updateSize();
}

function _godot_js_display_fullscreen_cb(callback) {
 if (ENVIRONMENT_IS_PTHREAD) return proxyToMainThread(94, 0, 1, callback);
 const canvas = GodotConfig.canvas;
 const func = GodotRuntime.get_func(callback);
 function change_cb(evt) {
  if (evt.target === canvas) {
   func(GodotDisplayScreen.isFullscreen());
  }
 }
 GodotEventListeners.add(document, "fullscreenchange", change_cb, false);
 GodotEventListeners.add(document, "mozfullscreenchange", change_cb, false);
 GodotEventListeners.add(document, "webkitfullscreenchange", change_cb, false);
}

function _godot_js_display_fullscreen_exit() {
 if (ENVIRONMENT_IS_PTHREAD) return proxyToMainThread(95, 0, 1);
 return GodotDisplayScreen.exitFullscreen();
}

function _godot_js_display_fullscreen_request() {
 if (ENVIRONMENT_IS_PTHREAD) return proxyToMainThread(96, 0, 1);
 return GodotDisplayScreen.requestFullscreen();
}

function _godot_js_display_has_webgl(p_version) {
 if (ENVIRONMENT_IS_PTHREAD) return proxyToMainThread(97, 0, 1, p_version);
 if (p_version !== 1 && p_version !== 2) {
  return false;
 }
 try {
  return !!document.createElement("canvas").getContext(p_version === 2 ? "webgl2" : "webgl");
 } catch (e) {}
 /* Not available */ return false;
}

function _godot_js_display_is_swap_ok_cancel() {
 if (ENVIRONMENT_IS_PTHREAD) return proxyToMainThread(98, 0, 1);
 const win = ([ "Windows", "Win64", "Win32", "WinCE" ]);
 const plat = navigator.platform || "";
 if (win.indexOf(plat) !== -1) {
  return 1;
 }
 return 0;
}

function _godot_js_display_notification_cb(callback, p_enter, p_exit, p_in, p_out) {
 if (ENVIRONMENT_IS_PTHREAD) return proxyToMainThread(99, 0, 1, callback, p_enter, p_exit, p_in, p_out);
 const canvas = GodotConfig.canvas;
 const func = GodotRuntime.get_func(callback);
 const notif = [ p_enter, p_exit, p_in, p_out ];
 [ "mouseover", "mouseleave", "focus", "blur" ].forEach(function(evt_name, idx) {
  GodotEventListeners.add(canvas, evt_name, function() {
   func(notif[idx]);
  }, true);
 });
}

function _godot_js_display_pixel_ratio_get() {
 if (ENVIRONMENT_IS_PTHREAD) return proxyToMainThread(100, 0, 1);
 return GodotDisplayScreen.getPixelRatio();
}

function _godot_js_display_screen_dpi_get() {
 if (ENVIRONMENT_IS_PTHREAD) return proxyToMainThread(101, 0, 1);
 return GodotDisplay.getDPI();
}

function _godot_js_display_screen_size_get(width, height) {
 if (ENVIRONMENT_IS_PTHREAD) return proxyToMainThread(102, 0, 1, width, height);
 const scale = GodotDisplayScreen.getPixelRatio();
 GodotRuntime.setHeapValue(width, window.screen.width * scale, "i32");
 GodotRuntime.setHeapValue(height, window.screen.height * scale, "i32");
}

function _godot_js_display_setup_canvas(p_width, p_height, p_fullscreen, p_hidpi) {
 if (ENVIRONMENT_IS_PTHREAD) return proxyToMainThread(103, 0, 1, p_width, p_height, p_fullscreen, p_hidpi);
 const canvas = GodotConfig.canvas;
 GodotEventListeners.add(canvas, "contextmenu", function(ev) {
  ev.preventDefault();
 }, false);
 GodotEventListeners.add(canvas, "webglcontextlost", function(ev) {
  alert("WebGL context lost, please reload the page");
  ev.preventDefault();
 }, false);
 GodotDisplayScreen.hidpi = !!p_hidpi;
 switch (GodotConfig.canvas_resize_policy) {
 case 0:
  GodotDisplayScreen.desired_size = [ canvas.width, canvas.height ];
  break;

 case 1:
  GodotDisplayScreen.desired_size = [ p_width, p_height ];
  break;

 default:
  canvas.style.position = "absolute";
  canvas.style.top = 0;
  canvas.style.left = 0;
  break;
 }
 GodotDisplayScreen.updateSize();
 if (p_fullscreen) {
  GodotDisplayScreen.requestFullscreen();
 }
}

function _godot_js_display_size_update() {
 if (ENVIRONMENT_IS_PTHREAD) return proxyToMainThread(104, 0, 1);
 const updated = GodotDisplayScreen.updateSize();
 if (updated) {
  GodotDisplayVK.updateSize();
 }
 return updated;
}

function _godot_js_display_touchscreen_is_available() {
 if (ENVIRONMENT_IS_PTHREAD) return proxyToMainThread(105, 0, 1);
 return "ontouchstart" in window;
}

function _godot_js_display_tts_available() {
 if (ENVIRONMENT_IS_PTHREAD) return proxyToMainThread(106, 0, 1);
 return "speechSynthesis" in window;
}

function _godot_js_display_vk_available() {
 if (ENVIRONMENT_IS_PTHREAD) return proxyToMainThread(107, 0, 1);
 return GodotDisplayVK.available();
}

function _godot_js_display_vk_cb(p_input_cb) {
 if (ENVIRONMENT_IS_PTHREAD) return proxyToMainThread(108, 0, 1, p_input_cb);
 const input_cb = GodotRuntime.get_func(p_input_cb);
 if (GodotDisplayVK.available()) {
  GodotDisplayVK.init(input_cb);
 }
}

function _godot_js_display_vk_hide() {
 if (ENVIRONMENT_IS_PTHREAD) return proxyToMainThread(109, 0, 1);
 GodotDisplayVK.hide();
}

function _godot_js_display_vk_show(p_text, p_type, p_start, p_end) {
 if (ENVIRONMENT_IS_PTHREAD) return proxyToMainThread(110, 0, 1, p_text, p_type, p_start, p_end);
 const text = GodotRuntime.parseString(p_text);
 const start = p_start > 0 ? p_start : 0;
 const end = p_end > 0 ? p_end : start;
 GodotDisplayVK.show(text, p_type, start, end);
}

function _godot_js_display_window_blur_cb(callback) {
 if (ENVIRONMENT_IS_PTHREAD) return proxyToMainThread(111, 0, 1, callback);
 const func = GodotRuntime.get_func(callback);
 GodotEventListeners.add(window, "blur", function() {
  func();
 }, false);
}

function _godot_js_display_window_icon_set(p_ptr, p_len) {
 if (ENVIRONMENT_IS_PTHREAD) return proxyToMainThread(112, 0, 1, p_ptr, p_len);
 let link = document.getElementById("-gd-engine-icon");
 const old_icon = GodotDisplay.window_icon;
 if (p_ptr) {
  if (link === null) {
   link = document.createElement("link");
   link.rel = "icon";
   link.id = "-gd-engine-icon";
   document.head.appendChild(link);
  }
  const png = new Blob([ GodotRuntime.heapSlice(GROWABLE_HEAP_U8(), p_ptr, p_len) ], {
   type: "image/png"
  });
  GodotDisplay.window_icon = URL.createObjectURL(png);
  link.href = GodotDisplay.window_icon;
 } else {
  if (link) {
   link.remove();
  }
  GodotDisplay.window_icon = null;
 }
 if (old_icon) {
  URL.revokeObjectURL(old_icon);
 }
}

function _godot_js_display_window_size_get(p_width, p_height) {
 if (ENVIRONMENT_IS_PTHREAD) return proxyToMainThread(113, 0, 1, p_width, p_height);
 GodotRuntime.setHeapValue(p_width, GodotConfig.canvas.width, "i32");
 GodotRuntime.setHeapValue(p_height, GodotConfig.canvas.height, "i32");
}

function _godot_js_display_window_title_set(p_data) {
 if (ENVIRONMENT_IS_PTHREAD) return proxyToMainThread(114, 0, 1, p_data);
 document.title = GodotRuntime.parseString(p_data);
}

var uleb128Encode = (n, target) => {
 if (n < 128) {
  target.push(n);
 } else {
  target.push((n % 128) | 128, n >> 7);
 }
};

var sigToWasmTypes = sig => {
 var typeNames = {
  "i": "i32",
  "j": "i64",
  "f": "f32",
  "d": "f64",
  "e": "externref",
  "p": "i32"
 };
 var type = {
  parameters: [],
  results: sig[0] == "v" ? [] : [ typeNames[sig[0]] ]
 };
 for (var i = 1; i < sig.length; ++i) {
  type.parameters.push(typeNames[sig[i]]);
 }
 return type;
};

var generateFuncType = (sig, target) => {
 var sigRet = sig.slice(0, 1);
 var sigParam = sig.slice(1);
 var typeCodes = {
  "i": 127,
  "p": 127,
  "j": 126,
  "f": 125,
  "d": 124,
  "e": 111
 };
 target.push(96);
 /* form: func */ uleb128Encode(sigParam.length, target);
 for (var i = 0; i < sigParam.length; ++i) {
  target.push(typeCodes[sigParam[i]]);
 }
 if (sigRet == "v") {
  target.push(0);
 } else {
  target.push(1, typeCodes[sigRet]);
 }
};

var convertJsFunctionToWasm = (func, sig) => {
 if (typeof WebAssembly.Function == "function") {
  return new WebAssembly.Function(sigToWasmTypes(sig), func);
 }
 var typeSectionBody = [ 1 ];
 generateFuncType(sig, typeSectionBody);
 var bytes = [ 0, 97, 115, 109,  1, 0, 0, 0,  1 ];
 uleb128Encode(typeSectionBody.length, bytes);
 bytes.push(...typeSectionBody);
 bytes.push(2, 7,  1, 1, 101, 1, 102, 0, 0, 7, 5,  1, 1, 102, 0, 0);
 var module = new WebAssembly.Module(new Uint8Array(bytes));
 var instance = new WebAssembly.Instance(module, {
  "e": {
   "f": func
  }
 });
 var wrappedFunc = instance.exports["f"];
 return wrappedFunc;
};

var updateTableMap = (offset, count) => {
 if (functionsInTableMap) {
  for (var i = offset; i < offset + count; i++) {
   var item = getWasmTableEntry(i);
   if (item) {
    functionsInTableMap.set(item, i);
   }
  }
 }
};

var functionsInTableMap;

var getFunctionAddress = func => {
 if (!functionsInTableMap) {
  functionsInTableMap = new WeakMap;
  updateTableMap(0, wasmTable.length);
 }
 return functionsInTableMap.get(func) || 0;
};

var freeTableIndexes = [];

var getEmptyTableSlot = () => {
 if (freeTableIndexes.length) {
  return freeTableIndexes.pop();
 }
 try {
  wasmTable.grow(1);
 } catch (err) {
  if (!(err instanceof RangeError)) {
   throw err;
  }
  throw "Unable to grow wasm table. Set ALLOW_TABLE_GROWTH.";
 }
 return wasmTable.length - 1;
};

var setWasmTableEntry = (idx, func) => {
 wasmTable.set(idx, func);
 wasmTableMirror[idx] = wasmTable.get(idx);
};

/** @param {string=} sig */ var addFunction = (func, sig) => {
 var rtn = getFunctionAddress(func);
 if (rtn) {
  return rtn;
 }
 var ret = getEmptyTableSlot();
 try {
  setWasmTableEntry(ret, func);
 } catch (err) {
  if (!(err instanceof TypeError)) {
   throw err;
  }
  var wrapped = convertJsFunctionToWasm(func, sig);
  setWasmTableEntry(ret, wrapped);
 }
 functionsInTableMap.set(func, ret);
 return ret;
};

var GodotDylink = {
 libs: [ null ],
 lastError: "",
 stackPointer: null,
 STACK_SIZE: 1048576,
 metadata: function(module) {
  const sections = WebAssembly.Module.customSections(module, "dylink.0");
  if (sections.length === 0) {
   throw new Error("not a side module (no dylink.0 section); build it with -sSIDE_MODULE");
  }
  const bytes = new Uint8Array(sections[0]);
  let offset = 0;
  const leb = () => {
   let ret = 0;
   let mul = 1;
   for (;;) {
    const b = bytes[offset++];
    ret += (b & 127) * mul;
    mul *= 128;
    if (!(b & 128)) {
     return ret;
    }
   }
  };
  const str = () => {
   const len = leb();
   offset += len;
   return UTF8ArrayToString(bytes, offset - len, len);
  };
  const meta = {
   memorySize: 0,
   memoryAlign: 0,
   tableSize: 0,
   needed: [],
   weak: new Set,
   tls: new Set
  };
  while (offset < bytes.length) {
   const type = bytes[offset++];
   const size = leb();
   const end = offset + size;
   if (type === 1) {
    meta.memorySize = leb();
    meta.memoryAlign = leb();
    meta.tableSize = leb();
   } else if (type === 2) {
    for (let n = leb(); n > 0; n--) {
     meta.needed.push(str());
    }
   } else if (type === 3) {
    for (let n = leb(); n > 0; n--) {
     const name = str();
     if (leb() & 256) {
      meta.tls.add(name);
     }
    }
   } else if (type === 4) {
    for (let n = leb(); n > 0; n--) {
     str();
     const name = str();
     if ((leb() & 3) === 1) {
      meta.weak.add(name);
     }
    }
   }
   offset = end;
  }
  return meta;
 },
 has: function(obj, name) {
  return Object.prototype.hasOwnProperty.call(obj, name);
 },
 mainSymbol: function(name) {
  if (GodotDylink.has(wasmExports, name)) {
   return wasmExports[name];
  }
  if (GodotDylink.has(wasmImports, name)) {
   return wasmImports[name];
  }
  return Module[`_${name}`];
 },
 sharedStackPointer: function() {
  if (!GodotDylink.stackPointer) {
   const low = _malloc(GodotDylink.STACK_SIZE);
   if (!low) {
    throw new Error("out of memory allocating the side module stack");
   }
   const high = (low + GodotDylink.STACK_SIZE) & ~15;
   GodotDylink.stackPointer = new WebAssembly.Global({
    "value": "i32",
    "mutable": true
   }, high);
   GodotDylink.stackPointer.high = high;
   GodotDylink.stackPointer.low = low;
  }
  return GodotDylink.stackPointer;
 },
 sharedSlots: function(module, base) {
  const slots = new Map;
  const add = sym => {
   if (!slots.has(sym)) {
    slots.set(sym, base + slots.size);
   }
  };
  for (const imp of WebAssembly.Module.imports(module)) {
   if (imp.module === "GOT.func") {
    add(imp.name);
   }
  }
  for (const exp of WebAssembly.Module.exports(module)) {
   if (exp.kind === "function") {
    add(exp.name);
   }
  }
  return slots;
 },
 sharedTableEnd: function() {
  if (GodotDylink.tableEnd === undefined) {
   let end = 1;
   while (end < wasmTable.length && !wasmTable.get(end)) {
    end++;
   }
   GodotDylink.tableEnd = end;
  }
  return GodotDylink.tableEnd;
 },
 load: function(name, bytes, shared) {
  if (shared) {
   if (GodotDylink.libs[shared.index + 1]) {
    return shared.index + 1;
   }
  } else {
   const open = GodotDylink.libs.findIndex(l => l && l.name === name);
   if (open > 0) {
    GodotDylink.libs[open].refs++;
    return open;
   }
  }
  const module = new WebAssembly.Module(bytes);
  const meta = GodotDylink.metadata(module);
  if (meta.tls.size > 0) {
   throw new Error("thread-local exports are not supported (avoid exported thread_local variables)");
  }
  const needed = meta.needed.map(lib => {
   const found = GodotDylink.libs.find(l => l && l.name === lib);
   if (!found) {
    throw new Error(`needs '${lib}', which is not loaded (list it under [dependencies])`);
   }
   return found;
  });
  const fromNeeded = sym => {
   for (const lib of needed) {
    if (GodotDylink.has(lib.exports, sym)) {
     return lib.exports[sym];
    }
   }
   return undefined;
  };
  const layout = shared && shared.layout;
  const memAlign = Math.pow(2, meta.memoryAlign);
  let memoryBase = 0;
  if (layout) {
   memoryBase = layout.memoryBase;
  } else if (meta.memorySize) {
   const raw = _malloc(meta.memorySize + memAlign);
   if (!raw) {
    throw new Error("out of memory allocating the side module data");
   }
   memoryBase = alignMemory(zeroMemory(raw, meta.memorySize + memAlign), memAlign);
  }
  let tableBase = 0;
  let tableSize = meta.tableSize;
  let slots = null;
  if (shared) {
   if (layout) {
    tableBase = layout.tableBase;
    GodotDylink.tableEnd = layout.tableEnd;
   } else {
    tableBase = GodotDylink.libs.reduce((next, l) => (l ? Math.max(next, l.layout.tableBase + l.layout.tableSize) : next), 1);
   }
   slots = GodotDylink.sharedSlots(module, tableBase + meta.tableSize);
   tableSize += slots.size;
   const tableEnd = GodotDylink.sharedTableEnd();
   if (tableBase + tableSize > tableEnd) {
    throw new Error(`needs ${tableSize} function table slots, but ${Math.max(tableEnd - tableBase, 0)} of those reserved for side modules are free (raise TwoDogWebSideModuleTableSlots)`);
   }
   for (let i = tableBase; i < tableBase + tableSize; i++) {
    if (wasmTable.get(i)) {
     throw new Error(`function table slot ${i} is already in use on this thread`);
    }
   }
  } else if (meta.tableSize) {
   tableBase = wasmTable.length;
   wasmTable.grow(meta.tableSize);
  }
  let exports = null;
  const unresolved = [];
  const got = [];
  const env = {};
  const imports = {
   "env": env,
   "wasi_snapshot_preview1": env,
   "GOT.mem": {},
   "GOT.func": {}
  };
  for (const imp of WebAssembly.Module.imports(module)) {
   const sym = imp.name;
   if (imp.module === "GOT.mem" || imp.module === "GOT.func") {
    const entry = new WebAssembly.Global({
     "value": "i32",
     "mutable": true
    }, 0);
    got.push({
     entry: entry,
     sym: sym,
     func: imp.module === "GOT.func"
    });
    imports[imp.module][sym] = entry;
   } else if (imp.module !== "env" && imp.module !== "wasi_snapshot_preview1") {
    throw new Error(`unsupported import module '${imp.module}' (${sym})`);
   } else if (imp.kind === "memory") {
    env[sym] = wasmMemory;
   } else if (imp.kind === "table") {
    env[sym] = wasmTable;
   } else if (sym === "__memory_base") {
    env[sym] = new WebAssembly.Global({
     "value": "i32",
     "mutable": false
    }, memoryBase);
   } else if (sym === "__table_base") {
    env[sym] = new WebAssembly.Global({
     "value": "i32",
     "mutable": false
    }, tableBase);
   } else if (sym === "__stack_pointer") {
    env[sym] = GodotDylink.sharedStackPointer();
   } else if (imp.kind === "function") {
    let func = GodotDylink.mainSymbol(sym);
    if (typeof func !== "function") {
     func = fromNeeded(sym);
    }
    if (typeof func !== "function") {
     if (!meta.weak.has(sym)) {
      unresolved.push(sym);
     }
     func = (...args) => {
      const own = exports && exports[sym];
      if (typeof own !== "function") {
       throw new Error(`${name}: called '${sym}', which the main module does not export`);
      }
      return own(...args);
     };
    }
    env[sym] = func;
   } else if (imp.kind === "tag") {
    const tag = GodotDylink.mainSymbol(sym);
    env[sym] = tag instanceof WebAssembly.Tag ? tag : new WebAssembly.Tag({
     "parameters": [ "i32" ]
    });
   } else {
    const value = GodotDylink.mainSymbol(sym);
    if (value === undefined) {
     throw new Error(`unresolved ${imp.kind} import '${sym}' (not exported by the main module)`);
    }
    env[sym] = value;
   }
  }
  if (unresolved.length) {
   err(`GDExtension '${name}': imports not exported by the main module (calls will fail): ${unresolved.join(", ")}`);
  }
  const instance = new WebAssembly.Instance(module, imports);
  exports = {};
  for (const [sym, value] of Object.entries(instance.exports)) {
   exports[sym] = value instanceof WebAssembly.Global ? value.value + memoryBase : value;
  }
  if (functionsInTableMap) {
   updateTableMap(tableBase, meta.tableSize);
  }
  if (slots) {
   for (const [sym, slot] of slots) {
    if (typeof exports[sym] === "function") {
     wasmTable.set(slot, exports[sym]);
    }
   }
  }
  for (const {entry: entry, sym: sym, func: func} of got) {
   let value = GodotDylink.has(exports, sym) ? exports[sym] : undefined;
   if (value === undefined) {
    value = GodotDylink.mainSymbol(sym);
    if (value instanceof WebAssembly.Global) {
     value = value.value;
    }
   }
   if (value === undefined) {
    value = fromNeeded(sym);
   }
   if (value === undefined) {
    if (meta.weak.has(sym)) {
     continue;
    }
    throw new Error(`unresolved ${func ? "function" : "data"} symbol '${sym}' (not exported by the main module)`);
   }
   if (func) {
    if (typeof value !== "function") {
     throw new Error(`symbol '${sym}' is not a function`);
    }
    if (slots) {
     entry.value = slots.get(sym);
     wasmTable.set(entry.value, value);
    } else {
     entry.value = addFunction(value);
    }
   } else {
    if (typeof value !== "number") {
     throw new Error(`symbol '${sym}' is not a data address`);
    }
    entry.value = value;
   }
  }
  if (instance.exports["__set_stack_limits"]) {
   const sp = GodotDylink.sharedStackPointer();
   instance.exports["__set_stack_limits"](sp.high, sp.low);
  }
  if (slots && functionsInTableMap) {
   updateTableMap(tableBase + meta.tableSize, slots.size);
  }
  if (!layout) {
   if (instance.exports["__wasm_apply_data_relocs"]) {
    instance.exports["__wasm_apply_data_relocs"]();
   }
   if (instance.exports["__wasm_call_ctors"]) {
    instance.exports["__wasm_call_ctors"]();
   }
  }
  const lib = {
   name: name,
   exports: exports,
   refs: 1,
   slots: slots,
   layout: {
    memoryBase: memoryBase,
    tableBase: tableBase,
    tableSize: tableSize,
    tableEnd: GodotDylink.tableEnd
   }
  };
  if (shared) {
   GodotDylink.libs[shared.index + 1] = lib;
   return shared.index + 1;
  }
  GodotDylink.libs.push(lib);
  return GodotDylink.libs.length - 1;
 },
 symbol: function(handle, sym) {
  const lib = GodotDylink.libs[handle];
  if (!lib) {
   throw new Error(`invalid library handle ${handle}`);
  }
  if (!GodotDylink.has(lib.exports, sym)) {
   throw new Error(`symbol '${sym}' not found in '${lib.name}'`);
  }
  const value = lib.exports[sym];
  if (typeof value !== "function") {
   return value;
  }
  return lib.slots ? lib.slots.get(sym) : addFunction(value);
 }
};

function _godot_js_dylink_error() {
 return stringToNewUTF8(GodotDylink.lastError);
}

function _godot_js_dylink_symbol(p_handle, p_symbol) {
 try {
  return GodotDylink.symbol(p_handle, UTF8ToString(p_symbol));
 } catch (e) {
  GodotDylink.lastError = e.message || String(e);
  return 0;
 }
}

function _godot_js_dylink_thread_load(p_index, p_name, p_bytes, p_size, p_layout) {
 const name = UTF8ToString(p_name);
 try {
  const layout = p_layout ? JSON.parse(UTF8ToString(p_layout)) : null;
  const handle = GodotDylink.load(name, GROWABLE_HEAP_U8().subarray(p_bytes, p_bytes + p_size), {
   index: p_index,
   layout: layout
  });
  return p_layout || stringToNewUTF8(JSON.stringify(GodotDylink.libs[handle].layout));
 } catch (e) {
  GodotDylink.lastError = e.message || String(e);
  if (p_layout) {
   err(`GDExtension '${name}' failed to load on this thread (calls from it will fail): ${GodotDylink.lastError}`);
  }
  return 0;
 }
}

var GodotEmscripten = {};

function _godot_js_emscripten_get_version() {
 if (ENVIRONMENT_IS_PTHREAD) return proxyToMainThread(115, 0, 1);
 const emscriptenVersionPtr = GodotRuntime.allocString("3.1.56");
 return emscriptenVersionPtr;
}

function _godot_js_eval(p_js, p_use_global_ctx, p_union_ptr, p_byte_arr, p_byte_arr_write, p_callback) {
 if (ENVIRONMENT_IS_PTHREAD) return proxyToMainThread(116, 0, 1, p_js, p_use_global_ctx, p_union_ptr, p_byte_arr, p_byte_arr_write, p_callback);
 const js_code = GodotRuntime.parseString(p_js);
 let eval_ret = null;
 try {
  if (p_use_global_ctx) {
   const global_eval = eval;
   eval_ret = global_eval(js_code);
  } else {
   eval_ret = eval(js_code);
  }
 }  catch (e) {
  GodotRuntime.error(e);
 }
 switch (typeof eval_ret) {
 case "boolean":
  GodotRuntime.setHeapValue(p_union_ptr, eval_ret, "i32");
  return 1;

 case "number":
  GodotRuntime.setHeapValue(p_union_ptr, eval_ret, "double");
  return 3;

 case "string":
  GodotRuntime.setHeapValue(p_union_ptr, GodotRuntime.allocString(eval_ret), "*");
  return 4;

 case "object":
  if (eval_ret === null) {
   break;
  }
  if (ArrayBuffer.isView(eval_ret) && !(eval_ret instanceof Uint8Array)) {
   eval_ret = new Uint8Array(eval_ret.buffer);
  } else if (eval_ret instanceof ArrayBuffer) {
   eval_ret = new Uint8Array(eval_ret);
  }
  if (eval_ret instanceof Uint8Array) {
   const func = GodotRuntime.get_func(p_callback);
   const bytes_ptr = func(p_byte_arr, p_byte_arr_write, eval_ret.length);
   GROWABLE_HEAP_U8().set(eval_ret, bytes_ptr);
   return 29;
  }
  break;
 }
 return 0;
}

var IDHandler = {
 _last_id: 0,
 _references: {},
 get: function(p_id) {
  return IDHandler._references[p_id];
 },
 add: function(p_data) {
  const id = ++IDHandler._last_id;
  IDHandler._references[id] = p_data;
  return id;
 },
 remove: function(p_id) {
  delete IDHandler._references[p_id];
 }
};

var GodotFetch = {
 onread: function(id, result) {
  const obj = IDHandler.get(id);
  if (!obj) {
   return;
  }
  if (result.value) {
   obj.chunks.push(result.value);
  }
  obj.reading = false;
  obj.done = result.done;
 },
 onresponse: function(id, response) {
  const obj = IDHandler.get(id);
  if (!obj) {
   return;
  }
  let chunked = false;
  response.headers.forEach(function(value, header) {
   const v = value.toLowerCase().trim();
   const h = header.toLowerCase().trim();
   if (h === "transfer-encoding" && v === "chunked") {
    chunked = true;
   }
  });
  obj.status = response.status;
  obj.response = response;
  obj.reader = response.body?.getReader();
  obj.chunked = chunked;
 },
 onerror: function(id, err) {
  GodotRuntime.error(err);
  const obj = IDHandler.get(id);
  if (!obj) {
   return;
  }
  obj.error = err;
 },
 create: function(method, url, headers, body) {
  const obj = {
   request: null,
   response: null,
   reader: null,
   error: null,
   done: false,
   reading: false,
   status: 0,
   chunks: []
  };
  const id = IDHandler.add(obj);
  const init = {
   method: method,
   headers: headers,
   body: body
  };
  obj.request = fetch(url, init);
  obj.request.then(GodotFetch.onresponse.bind(null, id)).catch(GodotFetch.onerror.bind(null, id));
  return id;
 },
 free: function(id) {
  const obj = IDHandler.get(id);
  if (!obj) {
   return;
  }
  IDHandler.remove(id);
  if (!obj.request) {
   return;
  }
  obj.request.then(function(response) {
   response.abort();
  }).catch(function(e) {});
 },
 /* nothing to do */ read: function(id) {
  const obj = IDHandler.get(id);
  if (!obj) {
   return;
  }
  if (obj.reader && !obj.reading) {
   if (obj.done) {
    obj.reader = null;
    return;
   }
   obj.reading = true;
   obj.reader.read().then(GodotFetch.onread.bind(null, id)).catch(GodotFetch.onerror.bind(null, id));
  } else if (obj.reader == null && obj.response.body == null) {
   obj.reading = true;
   GodotFetch.onread(id, {
    value: undefined,
    done: true
   });
  }
 }
};

function _godot_js_fetch_create(p_method, p_url, p_headers, p_headers_size, p_body, p_body_size) {
 if (ENVIRONMENT_IS_PTHREAD) return proxyToMainThread(117, 0, 1, p_method, p_url, p_headers, p_headers_size, p_body, p_body_size);
 const method = GodotRuntime.parseString(p_method);
 const url = GodotRuntime.parseString(p_url);
 const headers = GodotRuntime.parseStringArray(p_headers, p_headers_size);
 const body = p_body_size ? GodotRuntime.heapSlice(GROWABLE_HEAP_I8(), p_body, p_body_size) : null;
 return GodotFetch.create(method, url, headers.map(function(hv) {
  const idx = hv.indexOf(":");
  if (idx <= 0) {
   return [];
  }
  return [ hv.slice(0, idx).trim(), hv.slice(idx + 1).trim() ];
 }).filter(function(v) {
  return v.length === 2;
 }), body);
}

function _godot_js_fetch_free(id) {
 if (ENVIRONMENT_IS_PTHREAD) return proxyToMainThread(118, 0, 1, id);
 GodotFetch.free(id);
}

function _godot_js_fetch_http_status_get(p_id) {
 if (ENVIRONMENT_IS_PTHREAD) return proxyToMainThread(119, 0, 1, p_id);
 const obj = IDHandler.get(p_id);
 if (!obj || !obj.response) {
  return 0;
 }
 return obj.status;
}

function _godot_js_fetch_is_chunked(p_id) {
 if (ENVIRONMENT_IS_PTHREAD) return proxyToMainThread(120, 0, 1, p_id);
 const obj = IDHandler.get(p_id);
 if (!obj || !obj.response) {
  return -1;
 }
 return obj.chunked ? 1 : 0;
}

function _godot_js_fetch_read_chunk(p_id, p_buf, p_buf_size) {
 if (ENVIRONMENT_IS_PTHREAD) return proxyToMainThread(121, 0, 1, p_id, p_buf, p_buf_size);
 const obj = IDHandler.get(p_id);
 if (!obj || !obj.response) {
  return 0;
 }
 let to_read = p_buf_size;
 const chunks = obj.chunks;
 while (to_read && chunks.length) {
  const chunk = obj.chunks[0];
  if (chunk.length > to_read) {
   GodotRuntime.heapCopy(GROWABLE_HEAP_I8(), chunk.slice(0, to_read), p_buf);
   chunks[0] = chunk.slice(to_read);
   to_read = 0;
  } else {
   GodotRuntime.heapCopy(GROWABLE_HEAP_I8(), chunk, p_buf);
   to_read -= chunk.length;
   chunks.pop();
  }
 }
 if (!chunks.length) {
  GodotFetch.read(p_id);
 }
 return p_buf_size - to_read;
}

function _godot_js_fetch_read_headers(p_id, p_parse_cb, p_ref) {
 if (ENVIRONMENT_IS_PTHREAD) return proxyToMainThread(122, 0, 1, p_id, p_parse_cb, p_ref);
 const obj = IDHandler.get(p_id);
 if (!obj || !obj.response) {
  return 1;
 }
 const cb = GodotRuntime.get_func(p_parse_cb);
 const arr = [];
 obj.response.headers.forEach(function(v, h) {
  arr.push(`${h}:${v}`);
 });
 const c_ptr = GodotRuntime.allocStringArray(arr);
 cb(arr.length, c_ptr, p_ref);
 GodotRuntime.freeStringArray(c_ptr, arr.length);
 return 0;
}

function _godot_js_fetch_state_get(p_id) {
 if (ENVIRONMENT_IS_PTHREAD) return proxyToMainThread(123, 0, 1, p_id);
 const obj = IDHandler.get(p_id);
 if (!obj) {
  return -1;
 }
 if (obj.error) {
  return -1;
 }
 if (!obj.response) {
  return 0;
 }
 if (obj.reader || (obj.response.body == null && !obj.done)) {
  return 1;
 }
 if (obj.done) {
  return 2;
 }
 return -1;
}

function _godot_js_input_drop_files_cb(callback) {
 if (ENVIRONMENT_IS_PTHREAD) return proxyToMainThread(124, 0, 1, callback);
 const func = GodotRuntime.get_func(callback);
 const dropFiles = function(files) {
  const args = files || [];
  if (!args.length) {
   return;
  }
  const argc = args.length;
  const argv = GodotRuntime.allocStringArray(args);
  func(argv, argc);
  GodotRuntime.freeStringArray(argv, argc);
 };
 const canvas = GodotConfig.canvas;
 GodotEventListeners.add(canvas, "dragover", function(ev) {
  ev.preventDefault();
 }, false);
 GodotEventListeners.add(canvas, "drop", GodotInputDragDrop.handler(dropFiles));
}

function _godot_js_input_gamepad_cb(change_cb) {
 if (ENVIRONMENT_IS_PTHREAD) return proxyToMainThread(125, 0, 1, change_cb);
 const onchange = GodotRuntime.get_func(change_cb);
 GodotInputGamepads.init(onchange);
}

function _godot_js_input_gamepad_sample() {
 if (ENVIRONMENT_IS_PTHREAD) return proxyToMainThread(126, 0, 1);
 GodotInputGamepads.sample();
 return 0;
}

function _godot_js_input_gamepad_sample_count() {
 if (ENVIRONMENT_IS_PTHREAD) return proxyToMainThread(127, 0, 1);
 return GodotInputGamepads.get_samples().length;
}

function _godot_js_input_gamepad_sample_get(p_index, r_btns, r_btns_num, r_axes, r_axes_num, r_standard) {
 if (ENVIRONMENT_IS_PTHREAD) return proxyToMainThread(128, 0, 1, p_index, r_btns, r_btns_num, r_axes, r_axes_num, r_standard);
 const sample = GodotInputGamepads.get_sample(p_index);
 if (!sample || !sample.connected) {
  return 1;
 }
 const btns = sample.buttons;
 const btns_len = btns.length < 16 ? btns.length : 16;
 for (let i = 0; i < btns_len; i++) {
  GodotRuntime.setHeapValue(r_btns + (i << 2), btns[i], "float");
 }
 GodotRuntime.setHeapValue(r_btns_num, btns_len, "i32");
 const axes = sample.axes;
 const axes_len = axes.length < 10 ? axes.length : 10;
 for (let i = 0; i < axes_len; i++) {
  GodotRuntime.setHeapValue(r_axes + (i << 2), axes[i], "float");
 }
 GodotRuntime.setHeapValue(r_axes_num, axes_len, "i32");
 const is_standard = sample.standard ? 1 : 0;
 GodotRuntime.setHeapValue(r_standard, is_standard, "i32");
 return 0;
}

var _godot_js_input_key_cb = function(pCallback, pCodePtr, pKeyPtr) {
 if (ENVIRONMENT_IS_PTHREAD) return proxyToMainThread(129, 0, 1, pCallback, pCodePtr, pKeyPtr);
 GodotInput.inputKeyCallback = GodotRuntime.get_func(pCallback);
 GodotInput.setInputKeyData = (pCode, pKey) => {
  GodotRuntime.stringToHeap(pCode, pCodePtr, 32);
  GodotRuntime.stringToHeap(pKey, pKeyPtr, 32);
 };
 GodotEventListeners.add(GodotConfig.canvas, "keydown", GodotInput.onKeyEvent.bind(null, true), false);
 GodotEventListeners.add(GodotConfig.canvas, "keyup", GodotInput.onKeyEvent.bind(null, false), false);
};

function _godot_js_input_mouse_button_cb(callback) {
 if (ENVIRONMENT_IS_PTHREAD) return proxyToMainThread(130, 0, 1, callback);
 const func = GodotRuntime.get_func(callback);
 const canvas = GodotConfig.canvas;
 function button_cb(p_pressed, evt) {
  const rect = canvas.getBoundingClientRect();
  const pos = GodotInput.computePosition(evt, rect);
  const modifiers = GodotInput.getModifiers(evt);
  if (p_pressed) {
   GodotConfig.canvas.focus();
  }
  if (func(p_pressed, evt.button, pos[0], pos[1], modifiers)) {
   evt.preventDefault();
  }
 }
 GodotEventListeners.add(canvas, "mousedown", button_cb.bind(null, 1), false);
 GodotEventListeners.add(window, "mouseup", button_cb.bind(null, 0), false);
}

function _godot_js_input_mouse_move_cb(callback) {
 if (ENVIRONMENT_IS_PTHREAD) return proxyToMainThread(131, 0, 1, callback);
 const func = GodotRuntime.get_func(callback);
 const canvas = GodotConfig.canvas;
 function move_cb(evt) {
  const rect = canvas.getBoundingClientRect();
  const pos = GodotInput.computePosition(evt, rect);
  const rw = canvas.width / rect.width;
  const rh = canvas.height / rect.height;
  const rel_pos_x = evt.movementX * rw;
  const rel_pos_y = evt.movementY * rh;
  const modifiers = GodotInput.getModifiers(evt);
  func(pos[0], pos[1], rel_pos_x, rel_pos_y, modifiers, evt.pressure);
 }
 GodotEventListeners.add(window, "pointermove", move_cb, false);
}

function _godot_js_input_mouse_wheel_cb(callback) {
 if (ENVIRONMENT_IS_PTHREAD) return proxyToMainThread(132, 0, 1, callback);
 const func = GodotRuntime.get_func(callback);
 function wheel_cb(evt) {
  if (func(evt.deltaMode, evt.deltaX ?? 0, evt.deltaY ?? 0)) {
   evt.preventDefault();
  }
 }
 GodotEventListeners.add(GodotConfig.canvas, "wheel", wheel_cb, false);
}

function _godot_js_input_paste_cb(callback) {
 if (ENVIRONMENT_IS_PTHREAD) return proxyToMainThread(133, 0, 1, callback);
 const func = GodotRuntime.get_func(callback);
 GodotEventListeners.add(window, "paste", function(evt) {
  const text = evt.clipboardData.getData("text");
  const ptr = GodotRuntime.allocString(text);
  func(ptr);
  GodotRuntime.free(ptr);
 }, false);
}

function _godot_js_input_touch_cb(callback, ids, coords) {
 if (ENVIRONMENT_IS_PTHREAD) return proxyToMainThread(134, 0, 1, callback, ids, coords);
 const func = GodotRuntime.get_func(callback);
 const canvas = GodotConfig.canvas;
 function touch_cb(type, evt) {
  if (type === 0) {
   GodotConfig.canvas.focus();
  }
  const rect = canvas.getBoundingClientRect();
  const touches = evt.changedTouches;
  for (let i = 0; i < touches.length; i++) {
   const touch = touches[i];
   const pos = GodotInput.computePosition(touch, rect);
   GodotRuntime.setHeapValue(coords + (i * 2) * 8, pos[0], "double");
   GodotRuntime.setHeapValue(coords + (i * 2 + 1) * 8, pos[1], "double");
   GodotRuntime.setHeapValue(ids + i * 4, touch.identifier, "i32");
  }
  func(type, touches.length);
  if (evt.cancelable) {
   evt.preventDefault();
  }
 }
 GodotEventListeners.add(canvas, "touchstart", touch_cb.bind(null, 0), false);
 GodotEventListeners.add(canvas, "touchend", touch_cb.bind(null, 1), false);
 GodotEventListeners.add(canvas, "touchcancel", touch_cb.bind(null, 1), false);
 GodotEventListeners.add(canvas, "touchmove", touch_cb.bind(null, 2), false);
}

function _godot_js_input_vibrate_handheld(p_duration_ms) {
 if (ENVIRONMENT_IS_PTHREAD) return proxyToMainThread(135, 0, 1, p_duration_ms);
 if (typeof navigator.vibrate !== "function") {
  GodotRuntime.print("This browser does not support vibration.");
 } else {
  navigator.vibrate(p_duration_ms);
 }
}

function _godot_js_is_ime_focused() {
 if (ENVIRONMENT_IS_PTHREAD) return proxyToMainThread(136, 0, 1);
 return GodotIME.active;
}

function _godot_js_os_download_buffer(p_ptr, p_size, p_name, p_mime) {
 if (ENVIRONMENT_IS_PTHREAD) return proxyToMainThread(137, 0, 1, p_ptr, p_size, p_name, p_mime);
 const buf = GodotRuntime.heapSlice(GROWABLE_HEAP_I8(), p_ptr, p_size);
 const name = GodotRuntime.parseString(p_name);
 const mime = GodotRuntime.parseString(p_mime);
 const blob = new Blob([ buf ], {
  type: mime
 });
 const url = window.URL.createObjectURL(blob);
 const a = document.createElement("a");
 a.href = url;
 a.download = name;
 a.style.display = "none";
 document.body.appendChild(a);
 a.click();
 a.remove();
 window.URL.revokeObjectURL(url);
}

function _godot_js_os_execute(p_json) {
 if (ENVIRONMENT_IS_PTHREAD) return proxyToMainThread(138, 0, 1, p_json);
 const json_args = GodotRuntime.parseString(p_json);
 const args = JSON.parse(json_args);
 if (GodotConfig.on_execute) {
  GodotConfig.on_execute(args);
  return 0;
 }
 return 1;
}

function _godot_js_os_finish_async(p_callback) {
 if (ENVIRONMENT_IS_PTHREAD) return proxyToMainThread(139, 0, 1, p_callback);
 const func = GodotRuntime.get_func(p_callback);
 GodotOS.finish_async(func);
}

function _godot_js_os_fs_is_persistent() {
 if (ENVIRONMENT_IS_PTHREAD) return proxyToMainThread(140, 0, 1);
 return GodotFS.is_persistent();
}

function _godot_js_os_fs_sync(callback) {
 if (ENVIRONMENT_IS_PTHREAD) return proxyToMainThread(141, 0, 1, callback);
 const func = GodotRuntime.get_func(callback);
 GodotOS._fs_sync_promise = GodotFS.sync();
 GodotOS._fs_sync_promise.then(function(err) {
  func();
 });
}

function _godot_js_os_has_feature(p_ftr) {
 if (ENVIRONMENT_IS_PTHREAD) return proxyToMainThread(142, 0, 1, p_ftr);
 const ftr = GodotRuntime.parseString(p_ftr);
 const ua = navigator.userAgent;
 if (ftr === "web_macos") {
  return (ua.indexOf("Mac") !== -1) ? 1 : 0;
 }
 if (ftr === "web_windows") {
  return (ua.indexOf("Windows") !== -1) ? 1 : 0;
 }
 if (ftr === "web_android") {
  return (ua.indexOf("Android") !== -1) ? 1 : 0;
 }
 if (ftr === "web_ios") {
  return ((ua.indexOf("iPhone") !== -1) || (ua.indexOf("iPad") !== -1) || (ua.indexOf("iPod") !== -1)) ? 1 : 0;
 }
 if (ftr === "web_linuxbsd") {
  return ((ua.indexOf("CrOS") !== -1) || (ua.indexOf("BSD") !== -1) || (ua.indexOf("Linux") !== -1) || (ua.indexOf("X11") !== -1)) ? 1 : 0;
 }
 return 0;
}

function _godot_js_os_hw_concurrency_get() {
 if (ENVIRONMENT_IS_PTHREAD) return proxyToMainThread(143, 0, 1);
 const concurrency = navigator.hardwareConcurrency || 1;
 return concurrency < 2 ? concurrency : 2;
}

function _godot_js_os_request_quit_cb(p_callback) {
 if (ENVIRONMENT_IS_PTHREAD) return proxyToMainThread(144, 0, 1, p_callback);
 GodotOS.request_quit = GodotRuntime.get_func(p_callback);
}

function _godot_js_os_shell_open(p_uri) {
 if (ENVIRONMENT_IS_PTHREAD) return proxyToMainThread(145, 0, 1, p_uri);
 window.open(GodotRuntime.parseString(p_uri), "_blank");
}

function _godot_js_os_thread_pool_size_get() {
 if (ENVIRONMENT_IS_PTHREAD) return proxyToMainThread(146, 0, 1);
 if (typeof PThread === "undefined") {
  return 1;
 }
 return GodotConfig.godot_pool_size;
}

var GodotPWA = {
 hasUpdate: false,
 updateState: function(cb, reg) {
  if (!reg) {
   return;
  }
  if (!reg.active) {
   return;
  }
  if (reg.waiting) {
   GodotPWA.hasUpdate = true;
   cb();
  }
  GodotEventListeners.add(reg, "updatefound", function() {
   const installing = reg.installing;
   GodotEventListeners.add(installing, "statechange", function() {
    if (installing.state === "installed") {
     GodotPWA.hasUpdate = true;
     cb();
    }
   });
  });
 }
};

function _godot_js_pwa_cb(p_update_cb) {
 if (ENVIRONMENT_IS_PTHREAD) return proxyToMainThread(147, 0, 1, p_update_cb);
 if ("serviceWorker" in navigator) {
  try {
   const cb = GodotRuntime.get_func(p_update_cb);
   navigator.serviceWorker.getRegistration().then(GodotPWA.updateState.bind(null, cb));
  } catch (e) {
   GodotRuntime.error("Failed to assign PWA callback", e);
  }
 }
}

function _godot_js_pwa_update() {
 if (ENVIRONMENT_IS_PTHREAD) return proxyToMainThread(148, 0, 1);
 if ("serviceWorker" in navigator && GodotPWA.hasUpdate) {
  try {
   navigator.serviceWorker.getRegistration().then(function(reg) {
    if (!reg || !reg.waiting) {
     return;
    }
    reg.waiting.postMessage("update");
   });
  } catch (e) {
   GodotRuntime.error(e);
   return 1;
  }
  return 0;
 }
 return 1;
}

var GodotRTCDataChannel = {
 connect: function(p_id, p_on_open, p_on_message, p_on_error, p_on_close) {
  const ref = IDHandler.get(p_id);
  if (!ref) {
   return;
  }
  ref.binaryType = "arraybuffer";
  ref.onopen = function(event) {
   p_on_open();
  };
  ref.onclose = function(event) {
   p_on_close();
  };
  ref.onerror = function(event) {
   p_on_error();
  };
  ref.onmessage = function(event) {
   let buffer;
   let is_string = 0;
   if (event.data instanceof ArrayBuffer) {
    buffer = new Uint8Array(event.data);
   } else if (event.data instanceof Blob) {
    GodotRuntime.error("Blob type not supported");
    return;
   } else if (typeof event.data === "string") {
    is_string = 1;
    const enc = new TextEncoder("utf-8");
    buffer = new Uint8Array(enc.encode(event.data));
   } else {
    GodotRuntime.error("Unknown message type");
    return;
   }
   const len = buffer.length * buffer.BYTES_PER_ELEMENT;
   const out = GodotRuntime.malloc(len);
   GROWABLE_HEAP_U8().set(buffer, out);
   p_on_message(out, len, is_string);
   GodotRuntime.free(out);
  };
 },
 close: function(p_id) {
  const ref = IDHandler.get(p_id);
  if (!ref) {
   return;
  }
  ref.onopen = null;
  ref.onmessage = null;
  ref.onerror = null;
  ref.onclose = null;
  ref.close();
 },
 get_prop: function(p_id, p_prop, p_def) {
  const ref = IDHandler.get(p_id);
  return (ref && ref[p_prop] !== undefined) ? ref[p_prop] : p_def;
 }
};

function _godot_js_rtc_datachannel_close(p_id) {
 if (ENVIRONMENT_IS_PTHREAD) return proxyToMainThread(149, 0, 1, p_id);
 const ref = IDHandler.get(p_id);
 if (!ref) {
  return;
 }
 GodotRTCDataChannel.close(p_id);
}

function _godot_js_rtc_datachannel_connect(p_id, p_ref, p_on_open, p_on_message, p_on_error, p_on_close) {
 if (ENVIRONMENT_IS_PTHREAD) return proxyToMainThread(150, 0, 1, p_id, p_ref, p_on_open, p_on_message, p_on_error, p_on_close);
 const onopen = GodotRuntime.get_func(p_on_open).bind(null, p_ref);
 const onmessage = GodotRuntime.get_func(p_on_message).bind(null, p_ref);
 const onerror = GodotRuntime.get_func(p_on_error).bind(null, p_ref);
 const onclose = GodotRuntime.get_func(p_on_close).bind(null, p_ref);
 GodotRTCDataChannel.connect(p_id, onopen, onmessage, onerror, onclose);
}

function _godot_js_rtc_datachannel_destroy(p_id) {
 if (ENVIRONMENT_IS_PTHREAD) return proxyToMainThread(151, 0, 1, p_id);
 GodotRTCDataChannel.close(p_id);
 IDHandler.remove(p_id);
}

function _godot_js_rtc_datachannel_get_buffered_amount(p_id) {
 if (ENVIRONMENT_IS_PTHREAD) return proxyToMainThread(152, 0, 1, p_id);
 return GodotRTCDataChannel.get_prop(p_id, "bufferedAmount", 0);
}

function _godot_js_rtc_datachannel_id_get(p_id) {
 if (ENVIRONMENT_IS_PTHREAD) return proxyToMainThread(153, 0, 1, p_id);
 return GodotRTCDataChannel.get_prop(p_id, "id", 65535);
}

function _godot_js_rtc_datachannel_is_negotiated(p_id) {
 if (ENVIRONMENT_IS_PTHREAD) return proxyToMainThread(154, 0, 1, p_id);
 return GodotRTCDataChannel.get_prop(p_id, "negotiated", 65535);
}

function _godot_js_rtc_datachannel_is_ordered(p_id) {
 if (ENVIRONMENT_IS_PTHREAD) return proxyToMainThread(155, 0, 1, p_id);
 return GodotRTCDataChannel.get_prop(p_id, "ordered", true);
}

function _godot_js_rtc_datachannel_label_get(p_id) {
 if (ENVIRONMENT_IS_PTHREAD) return proxyToMainThread(156, 0, 1, p_id);
 const ref = IDHandler.get(p_id);
 if (!ref || !ref.label) {
  return 0;
 }
 return GodotRuntime.allocString(ref.label);
}

function _godot_js_rtc_datachannel_max_packet_lifetime_get(p_id) {
 if (ENVIRONMENT_IS_PTHREAD) return proxyToMainThread(157, 0, 1, p_id);
 const ref = IDHandler.get(p_id);
 if (!ref) {
  return 65535;
 }
 if (ref["maxPacketLifeTime"] !== undefined) {
  return ref["maxPacketLifeTime"];
 } else if (ref["maxRetransmitTime"] !== undefined) {
  return ref["maxRetransmitTime"];
 }
 return 65535;
}

function _godot_js_rtc_datachannel_max_retransmits_get(p_id) {
 if (ENVIRONMENT_IS_PTHREAD) return proxyToMainThread(158, 0, 1, p_id);
 return GodotRTCDataChannel.get_prop(p_id, "maxRetransmits", 65535);
}

function _godot_js_rtc_datachannel_protocol_get(p_id) {
 const ref = IDHandler.get(p_id);
 if (!ref || !ref.protocol) {
  return 0;
 }
 return GodotRuntime.allocString(ref.protocol);
}

function _godot_js_rtc_datachannel_ready_state_get(p_id) {
 if (ENVIRONMENT_IS_PTHREAD) return proxyToMainThread(159, 0, 1, p_id);
 const ref = IDHandler.get(p_id);
 if (!ref) {
  return 3;
 }
 switch (ref.readyState) {
 case "connecting":
  return 0;

 case "open":
  return 1;

 case "closing":
  return 2;

 case "closed":
 default:
  return 3;
 }
}

function _godot_js_rtc_datachannel_send(p_id, p_buffer, p_length, p_raw) {
 if (ENVIRONMENT_IS_PTHREAD) return proxyToMainThread(160, 0, 1, p_id, p_buffer, p_length, p_raw);
 const ref = IDHandler.get(p_id);
 if (!ref) {
  return 1;
 }
 const bytes_array = new Uint8Array(p_length);
 for (let i = 0; i < p_length; i++) {
  bytes_array[i] = GodotRuntime.getHeapValue(p_buffer + i, "i8");
 }
 if (p_raw) {
  ref.send(bytes_array.buffer);
 } else {
  const string = new TextDecoder("utf-8").decode(bytes_array);
  ref.send(string);
 }
 return 0;
}

var GodotRTCPeerConnection = {
 ConnectionState: {
  new: 0,
  connecting: 1,
  connected: 2,
  disconnected: 3,
  failed: 4,
  closed: 5
 },
 ConnectionStateCompat: {
  new: 0,
  checking: 1,
  connected: 2,
  completed: 2,
  disconnected: 3,
  failed: 4,
  closed: 5
 },
 IceGatheringState: {
  new: 0,
  gathering: 1,
  complete: 2
 },
 SignalingState: {
  stable: 0,
  "have-local-offer": 1,
  "have-remote-offer": 2,
  "have-local-pranswer": 3,
  "have-remote-pranswer": 4,
  closed: 5
 },
 create: function(config, onConnectionChange, onSignalingChange, onIceGatheringChange, onIceCandidate, onDataChannel) {
  let conn = null;
  try {
   conn = new RTCPeerConnection(config);
  } catch (e) {
   GodotRuntime.error(e);
   return 0;
  }
  const id = IDHandler.add(conn);
  if ("connectionState" in conn && conn["connectionState"] !== undefined) {
   conn.onconnectionstatechange = function(event) {
    if (!IDHandler.get(id)) {
     return;
    }
    onConnectionChange(GodotRTCPeerConnection.ConnectionState[conn.connectionState] || 0);
   };
  } else {
   conn.oniceconnectionstatechange = function(event) {
    if (!IDHandler.get(id)) {
     return;
    }
    onConnectionChange(GodotRTCPeerConnection.ConnectionStateCompat[conn.iceConnectionState] || 0);
   };
  }
  conn.onicegatheringstatechange = function(event) {
   if (!IDHandler.get(id)) {
    return;
   }
   onIceGatheringChange(GodotRTCPeerConnection.IceGatheringState[conn.iceGatheringState] || 0);
  };
  conn.onsignalingstatechange = function(event) {
   if (!IDHandler.get(id)) {
    return;
   }
   onSignalingChange(GodotRTCPeerConnection.SignalingState[conn.signalingState] || 0);
  };
  conn.onicecandidate = function(event) {
   if (!IDHandler.get(id)) {
    return;
   }
   const c = event.candidate;
   if (!c || !c.candidate) {
    return;
   }
   const candidate_str = GodotRuntime.allocString(c.candidate);
   const mid_str = GodotRuntime.allocString(c.sdpMid);
   onIceCandidate(mid_str, c.sdpMLineIndex, candidate_str);
   GodotRuntime.free(candidate_str);
   GodotRuntime.free(mid_str);
  };
  conn.ondatachannel = function(event) {
   if (!IDHandler.get(id)) {
    return;
   }
   const cid = IDHandler.add(event.channel);
   onDataChannel(cid);
  };
  return id;
 },
 destroy: function(p_id) {
  const conn = IDHandler.get(p_id);
  if (!conn) {
   return;
  }
  conn.onconnectionstatechange = null;
  conn.oniceconnectionstatechange = null;
  conn.onicegatheringstatechange = null;
  conn.onsignalingstatechange = null;
  conn.onicecandidate = null;
  conn.ondatachannel = null;
  IDHandler.remove(p_id);
 },
 onsession: function(p_id, callback, session) {
  if (!IDHandler.get(p_id)) {
   return;
  }
  const type_str = GodotRuntime.allocString(session.type);
  const sdp_str = GodotRuntime.allocString(session.sdp);
  callback(type_str, sdp_str);
  GodotRuntime.free(type_str);
  GodotRuntime.free(sdp_str);
 },
 onerror: function(p_id, callback, error) {
  const ref = IDHandler.get(p_id);
  if (!ref) {
   return;
  }
  GodotRuntime.error(error);
  callback();
 }
};

function _godot_js_rtc_pc_close(p_id) {
 if (ENVIRONMENT_IS_PTHREAD) return proxyToMainThread(161, 0, 1, p_id);
 const ref = IDHandler.get(p_id);
 if (!ref) {
  return;
 }
 ref.close();
}

function _godot_js_rtc_pc_create(p_config, p_ref, p_on_connection_state_change, p_on_ice_gathering_state_change, p_on_signaling_state_change, p_on_ice_candidate, p_on_datachannel) {
 if (ENVIRONMENT_IS_PTHREAD) return proxyToMainThread(162, 0, 1, p_config, p_ref, p_on_connection_state_change, p_on_ice_gathering_state_change, p_on_signaling_state_change, p_on_ice_candidate, p_on_datachannel);
 const wrap = function(p_func) {
  return GodotRuntime.get_func(p_func).bind(null, p_ref);
 };
 return GodotRTCPeerConnection.create(JSON.parse(GodotRuntime.parseString(p_config)), wrap(p_on_connection_state_change), wrap(p_on_signaling_state_change), wrap(p_on_ice_gathering_state_change), wrap(p_on_ice_candidate), wrap(p_on_datachannel));
}

function _godot_js_rtc_pc_datachannel_create(p_id, p_label, p_config) {
 if (ENVIRONMENT_IS_PTHREAD) return proxyToMainThread(163, 0, 1, p_id, p_label, p_config);
 try {
  const ref = IDHandler.get(p_id);
  if (!ref) {
   return 0;
  }
  const label = GodotRuntime.parseString(p_label);
  const config = JSON.parse(GodotRuntime.parseString(p_config));
  const channel = ref.createDataChannel(label, config);
  return IDHandler.add(channel);
 } catch (e) {
  GodotRuntime.error(e);
  return 0;
 }
}

function _godot_js_rtc_pc_destroy(p_id) {
 if (ENVIRONMENT_IS_PTHREAD) return proxyToMainThread(164, 0, 1, p_id);
 GodotRTCPeerConnection.destroy(p_id);
}

function _godot_js_rtc_pc_ice_candidate_add(p_id, p_mid_name, p_mline_idx, p_sdp) {
 if (ENVIRONMENT_IS_PTHREAD) return proxyToMainThread(165, 0, 1, p_id, p_mid_name, p_mline_idx, p_sdp);
 const ref = IDHandler.get(p_id);
 if (!ref) {
  return;
 }
 const sdpMidName = GodotRuntime.parseString(p_mid_name);
 const sdpName = GodotRuntime.parseString(p_sdp);
 ref.addIceCandidate(new RTCIceCandidate({
  "candidate": sdpName,
  "sdpMid": sdpMidName,
  "sdpMlineIndex": p_mline_idx
 }));
}

function _godot_js_rtc_pc_local_description_set(p_id, p_type, p_sdp, p_obj, p_on_error) {
 if (ENVIRONMENT_IS_PTHREAD) return proxyToMainThread(166, 0, 1, p_id, p_type, p_sdp, p_obj, p_on_error);
 const ref = IDHandler.get(p_id);
 if (!ref) {
  return;
 }
 const type = GodotRuntime.parseString(p_type);
 const sdp = GodotRuntime.parseString(p_sdp);
 const onerror = GodotRuntime.get_func(p_on_error).bind(null, p_obj);
 ref.setLocalDescription({
  "sdp": sdp,
  "type": type
 }).catch(function(error) {
  GodotRTCPeerConnection.onerror(p_id, onerror, error);
 });
}

function _godot_js_rtc_pc_offer_create(p_id, p_obj, p_on_session, p_on_error) {
 if (ENVIRONMENT_IS_PTHREAD) return proxyToMainThread(167, 0, 1, p_id, p_obj, p_on_session, p_on_error);
 const ref = IDHandler.get(p_id);
 if (!ref) {
  return;
 }
 const onsession = GodotRuntime.get_func(p_on_session).bind(null, p_obj);
 const onerror = GodotRuntime.get_func(p_on_error).bind(null, p_obj);
 ref.createOffer().then(function(session) {
  GodotRTCPeerConnection.onsession(p_id, onsession, session);
 }).catch(function(error) {
  GodotRTCPeerConnection.onerror(p_id, onerror, error);
 });
}

function _godot_js_rtc_pc_remote_description_set(p_id, p_type, p_sdp, p_obj, p_session_created, p_on_error) {
 if (ENVIRONMENT_IS_PTHREAD) return proxyToMainThread(168, 0, 1, p_id, p_type, p_sdp, p_obj, p_session_created, p_on_error);
 const ref = IDHandler.get(p_id);
 if (!ref) {
  return;
 }
 const type = GodotRuntime.parseString(p_type);
 const sdp = GodotRuntime.parseString(p_sdp);
 const onerror = GodotRuntime.get_func(p_on_error).bind(null, p_obj);
 const onsession = GodotRuntime.get_func(p_session_created).bind(null, p_obj);
 ref.setRemoteDescription({
  "sdp": sdp,
  "type": type
 }).then(function() {
  if (type !== "offer") {
   return Promise.resolve();
  }
  return ref.createAnswer().then(function(session) {
   GodotRTCPeerConnection.onsession(p_id, onsession, session);
  });
 }).catch(function(error) {
  GodotRTCPeerConnection.onerror(p_id, onerror, error);
 });
}

function _godot_js_set_ime_active(p_active) {
 if (ENVIRONMENT_IS_PTHREAD) return proxyToMainThread(169, 0, 1, p_active);
 GodotIME.ime_active(p_active);
}

function _godot_js_set_ime_cb(p_ime_cb, p_key_cb, code, key) {
 if (ENVIRONMENT_IS_PTHREAD) return proxyToMainThread(170, 0, 1, p_ime_cb, p_key_cb, code, key);
 const ime_cb = GodotRuntime.get_func(p_ime_cb);
 const key_cb = GodotRuntime.get_func(p_key_cb);
 GodotIME.init(ime_cb, key_cb, code, key);
}

function _godot_js_set_ime_position(p_x, p_y) {
 if (ENVIRONMENT_IS_PTHREAD) return proxyToMainThread(171, 0, 1, p_x, p_y);
 GodotIME.ime_position(p_x, p_y);
}

function _godot_js_tts_get_voices(p_callback) {
 if (ENVIRONMENT_IS_PTHREAD) return proxyToMainThread(172, 0, 1, p_callback);
 const func = GodotRuntime.get_func(p_callback);
 try {
  const arr = [];
  const voices = window.speechSynthesis.getVoices();
  for (let i = 0; i < voices.length; i++) {
   arr.push(`${voices[i].lang};${voices[i].name}`);
  }
  const c_ptr = GodotRuntime.allocStringArray(arr);
  func(arr.length, c_ptr);
  GodotRuntime.freeStringArray(c_ptr, arr.length);
 } catch (e) {}
}

function _godot_js_tts_is_paused() {
 if (ENVIRONMENT_IS_PTHREAD) return proxyToMainThread(173, 0, 1);
 return window.speechSynthesis.paused;
}

function _godot_js_tts_is_speaking() {
 if (ENVIRONMENT_IS_PTHREAD) return proxyToMainThread(174, 0, 1);
 return window.speechSynthesis.speaking;
}

function _godot_js_tts_pause() {
 if (ENVIRONMENT_IS_PTHREAD) return proxyToMainThread(175, 0, 1);
 window.speechSynthesis.pause();
}

function _godot_js_tts_resume() {
 if (ENVIRONMENT_IS_PTHREAD) return proxyToMainThread(176, 0, 1);
 window.speechSynthesis.resume();
}

function _godot_js_tts_speak(p_text, p_voice, p_volume, p_pitch, p_rate, p_utterance_id, p_callback) {
 if (ENVIRONMENT_IS_PTHREAD) return proxyToMainThread(177, 0, 1, p_text, p_voice, p_volume, p_pitch, p_rate, p_utterance_id, p_callback);
 const func = GodotRuntime.get_func(p_callback);
 function listener_end(evt) {
  evt.currentTarget.cb(1, /* DisplayServerEnums::TTS_UTTERANCE_ENDED */ evt.currentTarget.id, 0);
 }
 function listener_start(evt) {
  evt.currentTarget.cb(0, /* DisplayServerEnums::TTS_UTTERANCE_STARTED */ evt.currentTarget.id, 0);
 }
 function listener_error(evt) {
  evt.currentTarget.cb(2, /* DisplayServerEnums::TTS_UTTERANCE_CANCELED */ evt.currentTarget.id, 0);
 }
 function listener_bound(evt) {
  evt.currentTarget.cb(3, /* DisplayServerEnums::TTS_UTTERANCE_BOUNDARY */ evt.currentTarget.id, evt.charIndex);
 }
 const utterance = new SpeechSynthesisUtterance(GodotRuntime.parseString(p_text));
 utterance.rate = p_rate;
 utterance.pitch = p_pitch;
 utterance.volume = p_volume / 100;
 utterance.addEventListener("end", listener_end);
 utterance.addEventListener("start", listener_start);
 utterance.addEventListener("error", listener_error);
 utterance.addEventListener("boundary", listener_bound);
 utterance.id = p_utterance_id;
 utterance.cb = func;
 const voice = GodotRuntime.parseString(p_voice);
 const voices = window.speechSynthesis.getVoices();
 for (let i = 0; i < voices.length; i++) {
  if (voices[i].name === voice) {
   utterance.voice = voices[i];
   break;
  }
 }
 window.speechSynthesis.resume();
 window.speechSynthesis.speak(utterance);
}

function _godot_js_tts_stop() {
 if (ENVIRONMENT_IS_PTHREAD) return proxyToMainThread(178, 0, 1);
 window.speechSynthesis.cancel();
 window.speechSynthesis.resume();
}

var GodotWebMidi = {
 abortControllers: [],
 isListening: false
};

function _godot_js_webmidi_close_midi_inputs() {
 if (ENVIRONMENT_IS_PTHREAD) return proxyToMainThread(179, 0, 1);
 for (const abortController of GodotWebMidi.abortControllers) {
  abortController.abort();
 }
 GodotWebMidi.abortControllers = [];
 GodotWebMidi.isListening = false;
}

function _godot_js_webmidi_open_midi_inputs(pSetInputNamesCb, pOnMidiMessageCb, pDataBuffer, dataBufferLen) {
 if (ENVIRONMENT_IS_PTHREAD) return proxyToMainThread(180, 0, 1, pSetInputNamesCb, pOnMidiMessageCb, pDataBuffer, dataBufferLen);
 if (GodotWebMidi.is_listening) {
  return 0;
 }
 if (!navigator.requestMIDIAccess) {
  return 2;
 }
 const setInputNamesCb = GodotRuntime.get_func(pSetInputNamesCb);
 const onMidiMessageCb = GodotRuntime.get_func(pOnMidiMessageCb);
 GodotWebMidi.isListening = true;
 navigator.requestMIDIAccess().then(midi => {
  const inputs = [ ...midi.inputs.values() ];
  const inputNames = inputs.map(input => input.name);
  const c_ptr = GodotRuntime.allocStringArray(inputNames);
  setInputNamesCb(inputNames.length, c_ptr);
  GodotRuntime.freeStringArray(c_ptr, inputNames.length);
  inputs.forEach((input, i) => {
   const abortController = new AbortController;
   GodotWebMidi.abortControllers.push(abortController);
   input.addEventListener("midimessage", event => {
    const status = event.data[0];
    const data = event.data.slice(1);
    const size = data.length;
    if (size > dataBufferLen) {
     throw new Error(`data too big ${size} > ${dataBufferLen}`);
    }
    GROWABLE_HEAP_U8().set(data, pDataBuffer);
    onMidiMessageCb(i, status, pDataBuffer, data.length);
   }, {
    signal: abortController.signal
   });
  });
 });
 return 0;
}

var GodotWebSocket = {
 _onopen: function(p_id, callback, event) {
  const ref = IDHandler.get(p_id);
  if (!ref) {
   return;
  }
  const c_str = GodotRuntime.allocString(ref.protocol);
  callback(c_str);
  GodotRuntime.free(c_str);
 },
 _onmessage: function(p_id, callback, event) {
  const ref = IDHandler.get(p_id);
  if (!ref) {
   return;
  }
  let buffer;
  let is_string = 0;
  if (event.data instanceof ArrayBuffer) {
   buffer = new Uint8Array(event.data);
  } else if (event.data instanceof Blob) {
   GodotRuntime.error("Blob type not supported");
   return;
  } else if (typeof event.data === "string") {
   is_string = 1;
   buffer = new TextEncoder("utf-8").encode(event.data);
  } else {
   GodotRuntime.error("Unknown message type");
   return;
  }
  const len = buffer.length * buffer.BYTES_PER_ELEMENT;
  const out = GodotRuntime.malloc(len);
  GROWABLE_HEAP_U8().set(buffer, out);
  callback(out, len, is_string);
  GodotRuntime.free(out);
 },
 _onerror: function(p_id, callback, event) {
  const ref = IDHandler.get(p_id);
  if (!ref) {
   return;
  }
  callback();
 },
 _onclose: function(p_id, callback, event) {
  const ref = IDHandler.get(p_id);
  if (!ref) {
   return;
  }
  const c_str = GodotRuntime.allocString(event.reason);
  callback(event.code, c_str, event.wasClean ? 1 : 0);
  GodotRuntime.free(c_str);
 },
 send: function(p_id, p_data) {
  const ref = IDHandler.get(p_id);
  if (!ref || ref.readyState !== ref.OPEN) {
   return 1;
  }
  ref.send(p_data);
  return 0;
 },
 bufferedAmount: function(p_id) {
  const ref = IDHandler.get(p_id);
  if (!ref) {
   return 0;
  }
  return ref.bufferedAmount;
 },
 create: function(socket, p_on_open, p_on_message, p_on_error, p_on_close) {
  const id = IDHandler.add(socket);
  socket.onopen = GodotWebSocket._onopen.bind(null, id, p_on_open);
  socket.onmessage = GodotWebSocket._onmessage.bind(null, id, p_on_message);
  socket.onerror = GodotWebSocket._onerror.bind(null, id, p_on_error);
  socket.onclose = GodotWebSocket._onclose.bind(null, id, p_on_close);
  return id;
 },
 close: function(p_id, p_code, p_reason) {
  const ref = IDHandler.get(p_id);
  if (ref && ref.readyState < ref.CLOSING) {
   const code = p_code;
   const reason = p_reason;
   ref.close(code, reason);
  }
 },
 destroy: function(p_id) {
  const ref = IDHandler.get(p_id);
  if (!ref) {
   return;
  }
  GodotWebSocket.close(p_id, 3001, "destroyed");
  IDHandler.remove(p_id);
  ref.onopen = null;
  ref.onmessage = null;
  ref.onerror = null;
  ref.onclose = null;
 }
};

function _godot_js_websocket_buffered_amount(p_id) {
 if (ENVIRONMENT_IS_PTHREAD) return proxyToMainThread(181, 0, 1, p_id);
 return GodotWebSocket.bufferedAmount(p_id);
}

function _godot_js_websocket_close(p_id, p_code, p_reason) {
 if (ENVIRONMENT_IS_PTHREAD) return proxyToMainThread(182, 0, 1, p_id, p_code, p_reason);
 const code = p_code;
 const reason = GodotRuntime.parseString(p_reason);
 GodotWebSocket.close(p_id, code, reason);
}

function _godot_js_websocket_create(p_ref, p_url, p_proto, p_on_open, p_on_message, p_on_error, p_on_close) {
 if (ENVIRONMENT_IS_PTHREAD) return proxyToMainThread(183, 0, 1, p_ref, p_url, p_proto, p_on_open, p_on_message, p_on_error, p_on_close);
 const on_open = GodotRuntime.get_func(p_on_open).bind(null, p_ref);
 const on_message = GodotRuntime.get_func(p_on_message).bind(null, p_ref);
 const on_error = GodotRuntime.get_func(p_on_error).bind(null, p_ref);
 const on_close = GodotRuntime.get_func(p_on_close).bind(null, p_ref);
 const url = GodotRuntime.parseString(p_url);
 const protos = GodotRuntime.parseString(p_proto);
 let socket = null;
 try {
  if (protos) {
   socket = new WebSocket(url, protos.split(","));
  } else {
   socket = new WebSocket(url);
  }
 } catch (e) {
  return 0;
 }
 socket.binaryType = "arraybuffer";
 return GodotWebSocket.create(socket, on_open, on_message, on_error, on_close);
}

function _godot_js_websocket_destroy(p_id) {
 if (ENVIRONMENT_IS_PTHREAD) return proxyToMainThread(184, 0, 1, p_id);
 GodotWebSocket.destroy(p_id);
}

function _godot_js_websocket_send(p_id, p_buf, p_buf_len, p_raw) {
 if (ENVIRONMENT_IS_PTHREAD) return proxyToMainThread(185, 0, 1, p_id, p_buf, p_buf_len, p_raw);
 let out = GodotRuntime.heapSlice(GROWABLE_HEAP_U8(), p_buf, p_buf_len);
 if (!p_raw) {
  out = new TextDecoder("utf-8").decode(out);
 }
 return GodotWebSocket.send(p_id, out);
}

var GodotJSWrapper = {
 proxies: null,
 cb_ret: null,
 MyProxy: function(val) {
  const id = IDHandler.add(this);
  GodotJSWrapper.proxies.set(val, id);
  let refs = 1;
  this.ref = function() {
   refs++;
  };
  this.unref = function() {
   refs--;
   if (refs === 0) {
    IDHandler.remove(id);
    GodotJSWrapper.proxies.delete(val);
   }
  };
  this.get_val = function() {
   return val;
  };
  this.get_id = function() {
   return id;
  };
 },
 get_proxied: function(val) {
  const id = GodotJSWrapper.proxies.get(val);
  if (id === undefined) {
   const proxy = new GodotJSWrapper.MyProxy(val);
   return proxy.get_id();
  }
  IDHandler.get(id).ref();
  return id;
 },
 get_proxied_value: function(id) {
  const proxy = IDHandler.get(id);
  if (proxy === undefined) {
   return undefined;
  }
  return proxy.get_val();
 },
 variant2js: function(type, val) {
  switch (type) {
  case 0:
   return null;

  case 1:
   return Boolean(GodotRuntime.getHeapValue(val, "i64"));

  case 2:
   {
    const heap_value = GodotRuntime.getHeapValue(val, "i64");
    return heap_value >= Number.MIN_SAFE_INTEGER && heap_value <= Number.MAX_SAFE_INTEGER ? Number(heap_value) : heap_value;
   }

  case 3:
   return Number(GodotRuntime.getHeapValue(val, "double"));

  case 4:
   return GodotRuntime.parseString(GodotRuntime.getHeapValue(val, "*"));

  case 24:
   return GodotJSWrapper.get_proxied_value(GodotRuntime.getHeapValue(val, "i64"));

  default:
   return undefined;
  }
 },
 js2variant: function(p_val, p_exchange) {
  if (p_val === undefined || p_val === null) {
   return 0;
  }
  const type = typeof (p_val);
  if (type === "boolean") {
   GodotRuntime.setHeapValue(p_exchange, p_val, "i64");
   return 1;
  } else  if (type === "number") {
   if (Number.isInteger(p_val)) {
    GodotRuntime.setHeapValue(p_exchange, p_val, "i64");
    return 2;
   }
   GodotRuntime.setHeapValue(p_exchange, p_val, "double");
   return 3;
  } else  if (type === "bigint") {
   GodotRuntime.setHeapValue(p_exchange, p_val, "i64");
   return 2;
  } else  if (type === "string") {
   const c_str = GodotRuntime.allocString(p_val);
   GodotRuntime.setHeapValue(p_exchange, c_str, "*");
   return 4;
  }
  const id = GodotJSWrapper.get_proxied(p_val);
  GodotRuntime.setHeapValue(p_exchange, id, "i64");
  return 24;
 },
 isBuffer: function(obj) {
  return obj instanceof ArrayBuffer || ArrayBuffer.isView(obj);
 }
};

function _godot_js_wrapper_create_cb(p_ref, p_func) {
 if (ENVIRONMENT_IS_PTHREAD) return proxyToMainThread(186, 0, 1, p_ref, p_func);
 const func = GodotRuntime.get_func(p_func);
 let id = 0;
 const cb = function() {
  if (!GodotJSWrapper.get_proxied_value(id)) {
   return undefined;
  }
  GodotJSWrapper.cb_ret = null;
  const args = Array.from(arguments);
  const argsProxy = new GodotJSWrapper.MyProxy(args);
  func(p_ref, argsProxy.get_id(), args.length);
  argsProxy.unref();
  const ret = GodotJSWrapper.cb_ret;
  GodotJSWrapper.cb_ret = null;
  return ret;
 };
 id = GodotJSWrapper.get_proxied(cb);
 return id;
}

function _godot_js_wrapper_create_object(p_object, p_args, p_argc, p_convert_callback, p_exchange, p_lock, p_free_lock_callback) {
 if (ENVIRONMENT_IS_PTHREAD) return proxyToMainThread(187, 0, 1, p_object, p_args, p_argc, p_convert_callback, p_exchange, p_lock, p_free_lock_callback);
 const name = GodotRuntime.parseString(p_object);
 if (typeof (window[name]) === "undefined") {
  return -1;
 }
 const convert = GodotRuntime.get_func(p_convert_callback);
 const freeLock = GodotRuntime.get_func(p_free_lock_callback);
 const args = new Array(p_argc);
 for (let i = 0; i < p_argc; i++) {
  const type = convert(p_args, i, p_exchange, p_lock);
  const lock = GodotRuntime.getHeapValue(p_lock, "*");
  args[i] = GodotJSWrapper.variant2js(type, p_exchange);
  if (lock) {
   freeLock(p_lock, type);
  }
 }
 try {
  const res = new window[name](...args);
  return GodotJSWrapper.js2variant(res, p_exchange);
 } catch (e) {
  GodotRuntime.error(`Error calling constructor ${name} with args:`, args, "error:", e);
  return -1;
 }
}

function _godot_js_wrapper_interface_get(p_name) {
 if (ENVIRONMENT_IS_PTHREAD) return proxyToMainThread(188, 0, 1, p_name);
 const name = GodotRuntime.parseString(p_name);
 if (typeof (window[name]) !== "undefined") {
  return GodotJSWrapper.get_proxied(window[name]);
 }
 return 0;
}

function _godot_js_wrapper_object_call(p_id, p_method, p_args, p_argc, p_convert_callback, p_exchange, p_lock, p_free_lock_callback) {
 if (ENVIRONMENT_IS_PTHREAD) return proxyToMainThread(189, 0, 1, p_id, p_method, p_args, p_argc, p_convert_callback, p_exchange, p_lock, p_free_lock_callback);
 const obj = GodotJSWrapper.get_proxied_value(p_id);
 if (obj === undefined) {
  return -1;
 }
 const method = GodotRuntime.parseString(p_method);
 const convert = GodotRuntime.get_func(p_convert_callback);
 const freeLock = GodotRuntime.get_func(p_free_lock_callback);
 const args = new Array(p_argc);
 for (let i = 0; i < p_argc; i++) {
  const type = convert(p_args, i, p_exchange, p_lock);
  const lock = GodotRuntime.getHeapValue(p_lock, "*");
  args[i] = GodotJSWrapper.variant2js(type, p_exchange);
  if (lock) {
   freeLock(p_lock, type);
  }
 }
 try {
  const res = obj[method](...args);
  return GodotJSWrapper.js2variant(res, p_exchange);
 } catch (e) {
  GodotRuntime.error(`Error calling method ${method} on:`, obj, "error:", e);
  return -1;
 }
}

function _godot_js_wrapper_object_get(p_id, p_exchange, p_prop) {
 if (ENVIRONMENT_IS_PTHREAD) return proxyToMainThread(190, 0, 1, p_id, p_exchange, p_prop);
 const obj = GodotJSWrapper.get_proxied_value(p_id);
 if (obj === undefined) {
  return 0;
 }
 if (p_prop) {
  const prop = GodotRuntime.parseString(p_prop);
  try {
   return GodotJSWrapper.js2variant(obj[prop], p_exchange);
  } catch (e) {
   GodotRuntime.error(`Error getting variable ${prop} on object`, obj);
   return 0;
  }
 }
 return GodotJSWrapper.js2variant(obj, p_exchange);
}

function _godot_js_wrapper_object_getvar(p_id, p_type, p_exchange) {
 if (ENVIRONMENT_IS_PTHREAD) return proxyToMainThread(191, 0, 1, p_id, p_type, p_exchange);
 const obj = GodotJSWrapper.get_proxied_value(p_id);
 if (obj === undefined) {
  return -1;
 }
 const prop = GodotJSWrapper.variant2js(p_type, p_exchange);
 if (prop === undefined || prop === null) {
  return -1;
 }
 try {
  return GodotJSWrapper.js2variant(obj[prop], p_exchange);
 } catch (e) {
  GodotRuntime.error(`Error getting variable ${prop} on object`, obj, e);
  return -1;
 }
}

function _godot_js_wrapper_object_is_buffer(p_id) {
 if (ENVIRONMENT_IS_PTHREAD) return proxyToMainThread(192, 0, 1, p_id);
 const obj = GodotJSWrapper.get_proxied_value(p_id);
 return GodotJSWrapper.isBuffer(obj) ? 1 : 0;
}

function _godot_js_wrapper_object_set(p_id, p_name, p_type, p_exchange) {
 if (ENVIRONMENT_IS_PTHREAD) return proxyToMainThread(193, 0, 1, p_id, p_name, p_type, p_exchange);
 const obj = GodotJSWrapper.get_proxied_value(p_id);
 if (obj === undefined) {
  return;
 }
 const name = GodotRuntime.parseString(p_name);
 try {
  obj[name] = GodotJSWrapper.variant2js(p_type, p_exchange);
 } catch (e) {
  GodotRuntime.error(`Error setting variable ${name} on object`, obj);
 }
}

function _godot_js_wrapper_object_set_cb_ret(p_val_type, p_val_ex) {
 if (ENVIRONMENT_IS_PTHREAD) return proxyToMainThread(194, 0, 1, p_val_type, p_val_ex);
 GodotJSWrapper.cb_ret = GodotJSWrapper.variant2js(p_val_type, p_val_ex);
}

function _godot_js_wrapper_object_setvar(p_id, p_key_type, p_key_ex, p_val_type, p_val_ex) {
 if (ENVIRONMENT_IS_PTHREAD) return proxyToMainThread(195, 0, 1, p_id, p_key_type, p_key_ex, p_val_type, p_val_ex);
 const obj = GodotJSWrapper.get_proxied_value(p_id);
 if (obj === undefined) {
  return -1;
 }
 const key = GodotJSWrapper.variant2js(p_key_type, p_key_ex);
 try {
  obj[key] = GodotJSWrapper.variant2js(p_val_type, p_val_ex);
  return 0;
 } catch (e) {
  GodotRuntime.error(`Error setting variable ${key} on object`, obj);
  return -1;
 }
}

function _godot_js_wrapper_object_transfer_buffer(p_id, p_byte_arr, p_byte_arr_write, p_callback) {
 if (ENVIRONMENT_IS_PTHREAD) return proxyToMainThread(196, 0, 1, p_id, p_byte_arr, p_byte_arr_write, p_callback);
 let obj = GodotJSWrapper.get_proxied_value(p_id);
 if (!GodotJSWrapper.isBuffer(obj)) {
  return;
 }
 if (ArrayBuffer.isView(obj) && !(obj instanceof Uint8Array)) {
  obj = new Uint8Array(obj.buffer);
 } else if (obj instanceof ArrayBuffer) {
  obj = new Uint8Array(obj);
 }
 const resizePackedByteArrayAndOpenWrite = GodotRuntime.get_func(p_callback);
 const bytesPtr = resizePackedByteArrayAndOpenWrite(p_byte_arr, p_byte_arr_write, obj.length);
 GROWABLE_HEAP_U8().set(obj, bytesPtr);
}

function _godot_js_wrapper_object_unref(p_id) {
 if (ENVIRONMENT_IS_PTHREAD) return proxyToMainThread(197, 0, 1, p_id);
 const proxy = IDHandler.get(p_id);
 if (proxy !== undefined) {
  proxy.unref();
 }
}

var GodotWebGL2 = {};

function _godot_webgl2_glFramebufferTextureMultisampleMultiviewOVR(target, attachment, texture, level, samples, base_view_index, num_views) {
 if (ENVIRONMENT_IS_PTHREAD) return proxyToMainThread(198, 0, 1, target, attachment, texture, level, samples, base_view_index, num_views);
 const context = GL.currentContext;
 if (typeof context.oculusMultiviewExt === "undefined") {
  const /** OCULUS_multiview */ ext = context.GLctx.getExtension("OCULUS_multiview");
  if (!ext) {
   GodotRuntime.error("Trying to call glFramebufferTextureMultisampleMultiviewOVR() without the OCULUS_multiview extension");
   return;
  }
  context.oculusMultiviewExt = ext;
 }
 const /** OCULUS_multiview */ ext = context.oculusMultiviewExt;
 ext.framebufferTextureMultisampleMultiviewOVR(target, attachment, GL.textures[texture], level, samples, base_view_index, num_views);
}

function _godot_webgl2_glFramebufferTextureMultiviewOVR(target, attachment, texture, level, base_view_index, num_views) {
 if (ENVIRONMENT_IS_PTHREAD) return proxyToMainThread(199, 0, 1, target, attachment, texture, level, base_view_index, num_views);
 const context = GL.currentContext;
 if (typeof context.multiviewExt === "undefined") {
  const /** OVR_multiview2 */ ext = context.GLctx.getExtension("OVR_multiview2");
  if (!ext) {
   GodotRuntime.error("Trying to call glFramebufferTextureMultiviewOVR() without the OVR_multiview2 extension");
   return;
  }
  context.multiviewExt = ext;
 }
 const /** OVR_multiview2 */ ext = context.multiviewExt;
 ext.framebufferTextureMultiviewOVR(target, attachment, GL.textures[texture], level, base_view_index, num_views);
}

function _godot_webgl2_glGetBufferSubData(target, offset, size, data) {
 if (ENVIRONMENT_IS_PTHREAD) return proxyToMainThread(200, 0, 1, target, offset, size, data);
 const gl_context_handle = _emscripten_webgl_get_current_context();
 const gl = GL.getContext(gl_context_handle);
 if (gl) {
  gl.GLctx["getBufferSubData"](target, offset, GROWABLE_HEAP_U8(), data, size);
 }
}

var DOTNET = {
 setup: function setup(emscriptenBuildOptions) {
  const modulePThread = PThread;
  const dotnet_replacements = {
   fetch: globalThis.fetch,
   ENVIRONMENT_IS_WORKER: ENVIRONMENT_IS_WORKER,
   require: require,
   modulePThread: modulePThread,
   scriptDirectory: scriptDirectory
  };
  ENVIRONMENT_IS_WORKER = dotnet_replacements.ENVIRONMENT_IS_WORKER;
  Module.__dotnet_runtime.initializeReplacements(dotnet_replacements);
  noExitRuntime = dotnet_replacements.noExitRuntime;
  fetch = dotnet_replacements.fetch;
  require = dotnet_replacements.require;
  _scriptDir = __dirname = scriptDirectory = dotnet_replacements.scriptDirectory;
  Module.__dotnet_runtime.passEmscriptenInternals({
   isPThread: ENVIRONMENT_IS_PTHREAD,
   quit_: quit_,
   ExitStatus: ExitStatus,
   updateMemoryViews: updateMemoryViews,
   getMemory: () => wasmMemory,
   getWasmIndirectFunctionTable: () => wasmTable
  }, emscriptenBuildOptions);
  if (ENVIRONMENT_IS_PTHREAD) {
   Module.config = {};
   Module.__dotnet_runtime.configureWorkerStartup(Module);
  } else {
   Module.__dotnet_runtime.configureEmscriptenStartup(Module);
  }
 }
};

function _mono_interp_tier_prepare_jiterpreter() {
 return {
  runtime_idx: 7
 };
}

function _mono_wasm_browser_entropy() {
 return {
  runtime_idx: 18
 };
}

function _mono_wasm_cancel_promise() {
 return {
  runtime_idx: 26
 };
}

function _mono_wasm_console_clear() {
 return {
  runtime_idx: 20
 };
}

function _mono_wasm_dump_threads() {
 return {
  runtime_idx: 40
 };
}

function _mono_wasm_free_method_data() {
 return {
  runtime_idx: 13
 };
}

function _mono_wasm_get_locale_info() {
 return {
  runtime_idx: 27
 };
}

function _mono_wasm_install_js_worker_interop() {
 return {
  runtime_idx: 41
 };
}

function _mono_wasm_invoke_js_function() {
 return {
  runtime_idx: 23
 };
}

function _mono_wasm_invoke_jsimport_MT() {
 return {
  runtime_idx: 43
 };
}

function _mono_wasm_process_current_pid() {
 return {
  runtime_idx: 19
 };
}

function _mono_wasm_pthread_on_pthread_attached() {
 return {
  runtime_idx: 34
 };
}

function _mono_wasm_pthread_on_pthread_registered() {
 return {
  runtime_idx: 33
 };
}

function _mono_wasm_pthread_on_pthread_unregistered() {
 return {
  runtime_idx: 35
 };
}

function _mono_wasm_pthread_set_name() {
 return {
  runtime_idx: 36
 };
}

function _mono_wasm_release_cs_owned_object() {
 return {
  runtime_idx: 21
 };
}

function _mono_wasm_resolve_or_reject_promise() {
 return {
  runtime_idx: 25
 };
}

function _mono_wasm_schedule_synchronization_context() {
 return {
  runtime_idx: 39
 };
}

function _mono_wasm_set_entrypoint_breakpoint() {
 return {
  runtime_idx: 17
 };
}

function _mono_wasm_start_deputy_thread_async() {
 return {
  runtime_idx: 37
 };
}

function _mono_wasm_start_io_thread_async() {
 return {
  runtime_idx: 38
 };
}

function _mono_wasm_trace_logger() {
 return {
  runtime_idx: 16
 };
}

function _mono_wasm_uninstall_js_worker_interop() {
 return {
  runtime_idx: 42
 };
}

function _mono_wasm_warn_about_blocking_wait() {
 return {
  runtime_idx: 44
 };
}

var arraySum = (array, index) => {
 var sum = 0;
 for (var i = 0; i <= index; sum += array[i++]) {}
 return sum;
};

var MONTH_DAYS_LEAP = [ 31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31 ];

var MONTH_DAYS_REGULAR = [ 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31 ];

var addDays = (date, days) => {
 var newDate = new Date(date.getTime());
 while (days > 0) {
  var leap = isLeapYear(newDate.getFullYear());
  var currentMonth = newDate.getMonth();
  var daysInCurrentMonth = (leap ? MONTH_DAYS_LEAP : MONTH_DAYS_REGULAR)[currentMonth];
  if (days > daysInCurrentMonth - newDate.getDate()) {
   days -= (daysInCurrentMonth - newDate.getDate() + 1);
   newDate.setDate(1);
   if (currentMonth < 11) {
    newDate.setMonth(currentMonth + 1);
   } else {
    newDate.setMonth(0);
    newDate.setFullYear(newDate.getFullYear() + 1);
   }
  } else {
   newDate.setDate(newDate.getDate() + days);
   return newDate;
  }
 }
 return newDate;
};

var writeArrayToMemory = (array, buffer) => {
 GROWABLE_HEAP_I8().set(array, buffer);
};

var _strftime = (s, maxsize, format, tm) => {
 var tm_zone = GROWABLE_HEAP_U32()[(((tm) + (40)) >> 2)];
 var date = {
  tm_sec: GROWABLE_HEAP_I32()[((tm) >> 2)],
  tm_min: GROWABLE_HEAP_I32()[(((tm) + (4)) >> 2)],
  tm_hour: GROWABLE_HEAP_I32()[(((tm) + (8)) >> 2)],
  tm_mday: GROWABLE_HEAP_I32()[(((tm) + (12)) >> 2)],
  tm_mon: GROWABLE_HEAP_I32()[(((tm) + (16)) >> 2)],
  tm_year: GROWABLE_HEAP_I32()[(((tm) + (20)) >> 2)],
  tm_wday: GROWABLE_HEAP_I32()[(((tm) + (24)) >> 2)],
  tm_yday: GROWABLE_HEAP_I32()[(((tm) + (28)) >> 2)],
  tm_isdst: GROWABLE_HEAP_I32()[(((tm) + (32)) >> 2)],
  tm_gmtoff: GROWABLE_HEAP_I32()[(((tm) + (36)) >> 2)],
  tm_zone: tm_zone ? UTF8ToString(tm_zone) : ""
 };
 var pattern = UTF8ToString(format);
 var EXPANSION_RULES_1 = {
  "%c": "%a %b %d %H:%M:%S %Y",
  "%D": "%m/%d/%y",
  "%F": "%Y-%m-%d",
  "%h": "%b",
  "%r": "%I:%M:%S %p",
  "%R": "%H:%M",
  "%T": "%H:%M:%S",
  "%x": "%m/%d/%y",
  "%X": "%H:%M:%S",
  "%Ec": "%c",
  "%EC": "%C",
  "%Ex": "%m/%d/%y",
  "%EX": "%H:%M:%S",
  "%Ey": "%y",
  "%EY": "%Y",
  "%Od": "%d",
  "%Oe": "%e",
  "%OH": "%H",
  "%OI": "%I",
  "%Om": "%m",
  "%OM": "%M",
  "%OS": "%S",
  "%Ou": "%u",
  "%OU": "%U",
  "%OV": "%V",
  "%Ow": "%w",
  "%OW": "%W",
  "%Oy": "%y"
 };
 for (var rule in EXPANSION_RULES_1) {
  pattern = pattern.replace(new RegExp(rule, "g"), EXPANSION_RULES_1[rule]);
 }
 var WEEKDAYS = [ "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday" ];
 var MONTHS = [ "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ];
 function leadingSomething(value, digits, character) {
  var str = typeof value == "number" ? value.toString() : (value || "");
  while (str.length < digits) {
   str = character[0] + str;
  }
  return str;
 }
 function leadingNulls(value, digits) {
  return leadingSomething(value, digits, "0");
 }
 function compareByDay(date1, date2) {
  function sgn(value) {
   return value < 0 ? -1 : (value > 0 ? 1 : 0);
  }
  var compare;
  if ((compare = sgn(date1.getFullYear() - date2.getFullYear())) === 0) {
   if ((compare = sgn(date1.getMonth() - date2.getMonth())) === 0) {
    compare = sgn(date1.getDate() - date2.getDate());
   }
  }
  return compare;
 }
 function getFirstWeekStartDate(janFourth) {
  switch (janFourth.getDay()) {
  case 0:
   return new Date(janFourth.getFullYear() - 1, 11, 29);

  case 1:
   return janFourth;

  case 2:
   return new Date(janFourth.getFullYear(), 0, 3);

  case 3:
   return new Date(janFourth.getFullYear(), 0, 2);

  case 4:
   return new Date(janFourth.getFullYear(), 0, 1);

  case 5:
   return new Date(janFourth.getFullYear() - 1, 11, 31);

  case 6:
   return new Date(janFourth.getFullYear() - 1, 11, 30);
  }
 }
 function getWeekBasedYear(date) {
  var thisDate = addDays(new Date(date.tm_year + 1900, 0, 1), date.tm_yday);
  var janFourthThisYear = new Date(thisDate.getFullYear(), 0, 4);
  var janFourthNextYear = new Date(thisDate.getFullYear() + 1, 0, 4);
  var firstWeekStartThisYear = getFirstWeekStartDate(janFourthThisYear);
  var firstWeekStartNextYear = getFirstWeekStartDate(janFourthNextYear);
  if (compareByDay(firstWeekStartThisYear, thisDate) <= 0) {
   if (compareByDay(firstWeekStartNextYear, thisDate) <= 0) {
    return thisDate.getFullYear() + 1;
   }
   return thisDate.getFullYear();
  }
  return thisDate.getFullYear() - 1;
 }
 var EXPANSION_RULES_2 = {
  "%a": date => WEEKDAYS[date.tm_wday].substring(0, 3),
  "%A": date => WEEKDAYS[date.tm_wday],
  "%b": date => MONTHS[date.tm_mon].substring(0, 3),
  "%B": date => MONTHS[date.tm_mon],
  "%C": date => {
   var year = date.tm_year + 1900;
   return leadingNulls((year / 100) | 0, 2);
  },
  "%d": date => leadingNulls(date.tm_mday, 2),
  "%e": date => leadingSomething(date.tm_mday, 2, " "),
  "%g": date => getWeekBasedYear(date).toString().substring(2),
  "%G": getWeekBasedYear,
  "%H": date => leadingNulls(date.tm_hour, 2),
  "%I": date => {
   var twelveHour = date.tm_hour;
   if (twelveHour == 0) twelveHour = 12; else if (twelveHour > 12) twelveHour -= 12;
   return leadingNulls(twelveHour, 2);
  },
  "%j": date => leadingNulls(date.tm_mday + arraySum(isLeapYear(date.tm_year + 1900) ? MONTH_DAYS_LEAP : MONTH_DAYS_REGULAR, date.tm_mon - 1), 3),
  "%m": date => leadingNulls(date.tm_mon + 1, 2),
  "%M": date => leadingNulls(date.tm_min, 2),
  "%n": () => "\n",
  "%p": date => {
   if (date.tm_hour >= 0 && date.tm_hour < 12) {
    return "AM";
   }
   return "PM";
  },
  "%S": date => leadingNulls(date.tm_sec, 2),
  "%t": () => "\t",
  "%u": date => date.tm_wday || 7,
  "%U": date => {
   var days = date.tm_yday + 7 - date.tm_wday;
   return leadingNulls(Math.floor(days / 7), 2);
  },
  "%V": date => {
   var val = Math.floor((date.tm_yday + 7 - (date.tm_wday + 6) % 7) / 7);
   if ((date.tm_wday + 371 - date.tm_yday - 2) % 7 <= 2) {
    val++;
   }
   if (!val) {
    val = 52;
    var dec31 = (date.tm_wday + 7 - date.tm_yday - 1) % 7;
    if (dec31 == 4 || (dec31 == 5 && isLeapYear(date.tm_year % 400 - 1))) {
     val++;
    }
   } else if (val == 53) {
    var jan1 = (date.tm_wday + 371 - date.tm_yday) % 7;
    if (jan1 != 4 && (jan1 != 3 || !isLeapYear(date.tm_year))) val = 1;
   }
   return leadingNulls(val, 2);
  },
  "%w": date => date.tm_wday,
  "%W": date => {
   var days = date.tm_yday + 7 - ((date.tm_wday + 6) % 7);
   return leadingNulls(Math.floor(days / 7), 2);
  },
  "%y": date => (date.tm_year + 1900).toString().substring(2),
  "%Y": date => date.tm_year + 1900,
  "%z": date => {
   var off = date.tm_gmtoff;
   var ahead = off >= 0;
   off = Math.abs(off) / 60;
   off = (off / 60) * 100 + (off % 60);
   return (ahead ? "+" : "-") + String("0000" + off).slice(-4);
  },
  "%Z": date => date.tm_zone,
  "%%": () => "%"
 };
 pattern = pattern.replace(/%%/g, "\0\0");
 for (var rule in EXPANSION_RULES_2) {
  if (pattern.includes(rule)) {
   pattern = pattern.replace(new RegExp(rule, "g"), EXPANSION_RULES_2[rule](date));
  }
 }
 pattern = pattern.replace(/\0\0/g, "%");
 var bytes = intArrayFromString(pattern, false);
 if (bytes.length > maxsize) {
  return 0;
 }
 writeArrayToMemory(bytes, s);
 return bytes.length - 1;
};

var _strftime_l = (s, maxsize, format, tm, loc) => _strftime(s, maxsize, format, tm);

var getCFunc = ident => {
 var func = Module["_" + ident];
 return func;
};

var stringToUTF8OnStack = str => {
 var size = lengthBytesUTF8(str) + 1;
 var ret = stackAlloc(size);
 stringToUTF8(str, ret, size);
 return ret;
};

/**
     * @param {string|null=} returnType
     * @param {Array=} argTypes
     * @param {Arguments|Array=} args
     * @param {Object=} opts
     */ var ccall = (ident, returnType, argTypes, args, opts) => {
 var toC = {
  "string": str => {
   var ret = 0;
   if (str !== null && str !== undefined && str !== 0) {
    ret = stringToUTF8OnStack(str);
   }
   return ret;
  },
  "array": arr => {
   var ret = stackAlloc(arr.length);
   writeArrayToMemory(arr, ret);
   return ret;
  }
 };
 function convertReturnValue(ret) {
  if (returnType === "string") {
   return UTF8ToString(ret);
  }
  if (returnType === "boolean") return Boolean(ret);
  return ret;
 }
 var func = getCFunc(ident);
 var cArgs = [];
 var stack = 0;
 if (args) {
  for (var i = 0; i < args.length; i++) {
   var converter = toC[argTypes[i]];
   if (converter) {
    if (stack === 0) stack = stackSave();
    cArgs[i] = converter(args[i]);
   } else {
    cArgs[i] = args[i];
   }
  }
 }
 var ret = func(...cArgs);
 function onDone(ret) {
  if (stack !== 0) stackRestore(stack);
  return convertReturnValue(ret);
 }
 ret = onDone(ret);
 return ret;
};

/**
     * @param {string=} returnType
     * @param {Array=} argTypes
     * @param {Object=} opts
     */ var cwrap = (ident, returnType, argTypes, opts) => {
 var numericArgs = !argTypes || argTypes.every(type => type === "number" || type === "boolean");
 var numericRet = returnType !== "string";
 if (numericRet && numericArgs && !opts) {
  return getCFunc(ident);
 }
 return (...args) => ccall(ident, returnType, argTypes, args, opts);
};

var FS_unlink = path => FS.unlink(path);

PThread.init();

FS.createPreloadedFile = FS_createPreloadedFile;

FS.staticInit();

Module["FS_createPath"] = FS.createPath;

Module["FS_createDataFile"] = FS.createDataFile;

Module["FS_createPath"] = FS.createPath;

Module["FS_createDataFile"] = FS.createDataFile;

Module["FS_createPreloadedFile"] = FS.createPreloadedFile;

Module["FS_unlink"] = FS.unlink;

Module["FS_createLazyFile"] = FS.createLazyFile;

Module["FS_createDevice"] = FS.createDevice;

var GLctx;

Module["requestFullscreen"] = Browser.requestFullscreen;

Module["requestAnimationFrame"] = Browser.requestAnimationFrame;

Module["setCanvasSize"] = Browser.setCanvasSize;

Module["pauseMainLoop"] = Browser.mainLoop.pause;

Module["resumeMainLoop"] = Browser.mainLoop.resume;

Module["getUserMedia"] = Browser.getUserMedia;

Module["createContext"] = Browser.createContext;

var preloadedImages = {};

var preloadedAudios = {};

for (var i = 0; i < 32; ++i) tempFixedLengthArray.push(new Array(i));

var miniTempWebGLIntBuffersStorage = new Int32Array(288);

for (/**@suppress{duplicate}*/ var i = 0; i < 288; ++i) {
 miniTempWebGLIntBuffers[i] = miniTempWebGLIntBuffersStorage.subarray(0, i + 1);
}

var miniTempWebGLFloatBuffersStorage = new Float32Array(288);

for (/**@suppress{duplicate}*/ var i = 0; i < 288; ++i) {
 miniTempWebGLFloatBuffers[i] = miniTempWebGLFloatBuffersStorage.subarray(0, i + 1);
}

Module["request_quit"] = function() {
 GodotOS.request_quit();
};

Module["onExit"] = GodotOS.cleanup;

GodotOS._fs_sync_promise = Promise.resolve();

Module["initConfig"] = GodotConfig.init_config;

Module["initFS"] = GodotFS.init;

Module["copyToFS"] = GodotFS.copy_to_fs;

GodotOS.atexit(function(resolve, reject) {
 GodotDisplayCursor.clear();
 resolve();
}, true);

GodotOS.atexit(function(resolve, reject) {
 GodotEventListeners.clear();
 resolve();
}, true);

GodotOS.atexit(function(resolve, reject) {
 GodotDisplayVK.clear();
 resolve();
}, true);

GodotOS.atexit(function(resolve, reject) {
 GodotIME.clear();
 resolve();
}, true);

if (typeof PThread !== "undefined") {
 PThread.tlsInitFunctions.push(() => wasmExports["godot_web_sync_side_modules"]());
}

GodotJSWrapper.proxies = new Map;

DOTNET.setup({
 wasmEnableSIMD: true,
 wasmEnableEH: true,
 enableAotProfiler: false,
 enableDevToolsProfiler: false,
 enableLogProfiler: false,
 enableEventPipe: false,
 runAOTCompilation: false,
 wasmEnableThreads: true,
 gitHash: "4099f83977f4d29604a9aeb971fb0a7bc1d5f699"
});

var proxiedFunctionTable = [ _proc_exit, exitOnMainThread, pthreadCreateProxied, ___syscall_chdir, ___syscall_chmod, ___syscall_connect, ___syscall_faccessat, ___syscall_fadvise64, ___syscall_fchmod, ___syscall_fcntl64, ___syscall_fstat64, ___syscall_fstatfs64, ___syscall_statfs64, ___syscall_ftruncate64, ___syscall_getcwd, ___syscall_getdents64, ___syscall_ioctl, ___syscall_lstat64, ___syscall_mkdirat, ___syscall_mknodat, ___syscall_newfstatat, ___syscall_openat, ___syscall_readlinkat, ___syscall_renameat, ___syscall_rmdir, ___syscall_sendto, ___syscall_socket, ___syscall_stat64, ___syscall_symlink, ___syscall_unlinkat, ___syscall_utimensat, __emscripten_runtime_keepalive_clear, __mmap_js, __munmap_js, _emscripten_force_exit, setCanvasElementSizeMainThread, _emscripten_webgl_destroy_context, _emscripten_webgl_create_context_proxied, _emscripten_webgl_enable_extension, _emscripten_webgl_get_supported_extensions, _environ_get, _environ_sizes_get, _fd_close, _fd_fdstat_get, _fd_pread, _fd_pwrite, _fd_read, _fd_seek, _fd_sync, _fd_write, _godot_audio_get_sample_playback_position, _godot_audio_has_script_processor, _godot_audio_has_worklet, _godot_audio_init, _godot_audio_input_start, _godot_audio_input_stop, _godot_audio_is_available, _godot_audio_resume, _godot_audio_sample_bus_add, _godot_audio_sample_bus_move, _godot_audio_sample_bus_remove, _godot_audio_sample_bus_set_count, _godot_audio_sample_bus_set_mute, _godot_audio_sample_bus_set_send, _godot_audio_sample_bus_set_solo, _godot_audio_sample_bus_set_volume_db, _godot_audio_sample_is_active, _godot_audio_sample_register_stream, _godot_audio_sample_set_finished_callback, _godot_audio_sample_set_pause, _godot_audio_sample_set_volumes_linear, _godot_audio_sample_start, _godot_audio_sample_stop, _godot_audio_sample_stream_is_registered, _godot_audio_sample_unregister_stream, _godot_audio_sample_update_pitch_scale, _godot_audio_script_create, _godot_audio_script_start, _godot_audio_worklet_create, _godot_audio_worklet_start, _godot_js_config_canvas_id_get, _godot_js_config_locale_get, _godot_js_display_alert, _godot_js_display_canvas_focus, _godot_js_display_canvas_is_focused, _godot_js_display_clipboard_get, _godot_js_display_clipboard_set, _godot_js_display_cursor_is_hidden, _godot_js_display_cursor_is_locked, _godot_js_display_cursor_lock_set, _godot_js_display_cursor_set_custom_shape, _godot_js_display_cursor_set_shape, _godot_js_display_cursor_set_visible, _godot_js_display_desired_size_set, _godot_js_display_fullscreen_cb, _godot_js_display_fullscreen_exit, _godot_js_display_fullscreen_request, _godot_js_display_has_webgl, _godot_js_display_is_swap_ok_cancel, _godot_js_display_notification_cb, _godot_js_display_pixel_ratio_get, _godot_js_display_screen_dpi_get, _godot_js_display_screen_size_get, _godot_js_display_setup_canvas, _godot_js_display_size_update, _godot_js_display_touchscreen_is_available, _godot_js_display_tts_available, _godot_js_display_vk_available, _godot_js_display_vk_cb, _godot_js_display_vk_hide, _godot_js_display_vk_show, _godot_js_display_window_blur_cb, _godot_js_display_window_icon_set, _godot_js_display_window_size_get, _godot_js_display_window_title_set, _godot_js_emscripten_get_version, _godot_js_eval, _godot_js_fetch_create, _godot_js_fetch_free, _godot_js_fetch_http_status_get, _godot_js_fetch_is_chunked, _godot_js_fetch_read_chunk, _godot_js_fetch_read_headers, _godot_js_fetch_state_get, _godot_js_input_drop_files_cb, _godot_js_input_gamepad_cb, _godot_js_input_gamepad_sample, _godot_js_input_gamepad_sample_count, _godot_js_input_gamepad_sample_get, _godot_js_input_key_cb, _godot_js_input_mouse_button_cb, _godot_js_input_mouse_move_cb, _godot_js_input_mouse_wheel_cb, _godot_js_input_paste_cb, _godot_js_input_touch_cb, _godot_js_input_vibrate_handheld, _godot_js_is_ime_focused, _godot_js_os_download_buffer, _godot_js_os_execute, _godot_js_os_finish_async, _godot_js_os_fs_is_persistent, _godot_js_os_fs_sync, _godot_js_os_has_feature, _godot_js_os_hw_concurrency_get, _godot_js_os_request_quit_cb, _godot_js_os_shell_open, _godot_js_os_thread_pool_size_get, _godot_js_pwa_cb, _godot_js_pwa_update, _godot_js_rtc_datachannel_close, _godot_js_rtc_datachannel_connect, _godot_js_rtc_datachannel_destroy, _godot_js_rtc_datachannel_get_buffered_amount, _godot_js_rtc_datachannel_id_get, _godot_js_rtc_datachannel_is_negotiated, _godot_js_rtc_datachannel_is_ordered, _godot_js_rtc_datachannel_label_get, _godot_js_rtc_datachannel_max_packet_lifetime_get, _godot_js_rtc_datachannel_max_retransmits_get, _godot_js_rtc_datachannel_ready_state_get, _godot_js_rtc_datachannel_send, _godot_js_rtc_pc_close, _godot_js_rtc_pc_create, _godot_js_rtc_pc_datachannel_create, _godot_js_rtc_pc_destroy, _godot_js_rtc_pc_ice_candidate_add, _godot_js_rtc_pc_local_description_set, _godot_js_rtc_pc_offer_create, _godot_js_rtc_pc_remote_description_set, _godot_js_set_ime_active, _godot_js_set_ime_cb, _godot_js_set_ime_position, _godot_js_tts_get_voices, _godot_js_tts_is_paused, _godot_js_tts_is_speaking, _godot_js_tts_pause, _godot_js_tts_resume, _godot_js_tts_speak, _godot_js_tts_stop, _godot_js_webmidi_close_midi_inputs, _godot_js_webmidi_open_midi_inputs, _godot_js_websocket_buffered_amount, _godot_js_websocket_close, _godot_js_websocket_create, _godot_js_websocket_destroy, _godot_js_websocket_send, _godot_js_wrapper_create_cb, _godot_js_wrapper_create_object, _godot_js_wrapper_interface_get, _godot_js_wrapper_object_call, _godot_js_wrapper_object_get, _godot_js_wrapper_object_getvar, _godot_js_wrapper_object_is_buffer, _godot_js_wrapper_object_set, _godot_js_wrapper_object_set_cb_ret, _godot_js_wrapper_object_setvar, _godot_js_wrapper_object_transfer_buffer, _godot_js_wrapper_object_unref, _godot_webgl2_glFramebufferTextureMultisampleMultiviewOVR, _godot_webgl2_glFramebufferTextureMultiviewOVR, _godot_webgl2_glGetBufferSubData ];

var wasmImports = {
 /** @export */ __assert_fail: ___assert_fail,
 /** @export */ __call_sighandler: ___call_sighandler,
 /** @export */ __emscripten_init_main_thread_js: ___emscripten_init_main_thread_js,
 /** @export */ __emscripten_thread_cleanup: ___emscripten_thread_cleanup,
 /** @export */ __pthread_create_js: ___pthread_create_js,
 /** @export */ __syscall_chdir: ___syscall_chdir,
 /** @export */ __syscall_chmod: ___syscall_chmod,
 /** @export */ __syscall_connect: ___syscall_connect,
 /** @export */ __syscall_faccessat: ___syscall_faccessat,
 /** @export */ __syscall_fadvise64: ___syscall_fadvise64,
 /** @export */ __syscall_fchmod: ___syscall_fchmod,
 /** @export */ __syscall_fcntl64: ___syscall_fcntl64,
 /** @export */ __syscall_fstat64: ___syscall_fstat64,
 /** @export */ __syscall_fstatfs64: ___syscall_fstatfs64,
 /** @export */ __syscall_ftruncate64: ___syscall_ftruncate64,
 /** @export */ __syscall_getcwd: ___syscall_getcwd,
 /** @export */ __syscall_getdents64: ___syscall_getdents64,
 /** @export */ __syscall_ioctl: ___syscall_ioctl,
 /** @export */ __syscall_lstat64: ___syscall_lstat64,
 /** @export */ __syscall_mkdirat: ___syscall_mkdirat,
 /** @export */ __syscall_mknodat: ___syscall_mknodat,
 /** @export */ __syscall_newfstatat: ___syscall_newfstatat,
 /** @export */ __syscall_openat: ___syscall_openat,
 /** @export */ __syscall_readlinkat: ___syscall_readlinkat,
 /** @export */ __syscall_renameat: ___syscall_renameat,
 /** @export */ __syscall_rmdir: ___syscall_rmdir,
 /** @export */ __syscall_sendto: ___syscall_sendto,
 /** @export */ __syscall_socket: ___syscall_socket,
 /** @export */ __syscall_stat64: ___syscall_stat64,
 /** @export */ __syscall_statfs64: ___syscall_statfs64,
 /** @export */ __syscall_symlink: ___syscall_symlink,
 /** @export */ __syscall_unlinkat: ___syscall_unlinkat,
 /** @export */ __syscall_utimensat: ___syscall_utimensat,
 /** @export */ _emscripten_get_now_is_monotonic: __emscripten_get_now_is_monotonic,
 /** @export */ _emscripten_notify_mailbox_postmessage: __emscripten_notify_mailbox_postmessage,
 /** @export */ _emscripten_proxied_gl_context_activated_from_main_browser_thread: __emscripten_proxied_gl_context_activated_from_main_browser_thread,
 /** @export */ _emscripten_receive_on_main_thread_js: __emscripten_receive_on_main_thread_js,
 /** @export */ _emscripten_runtime_keepalive_clear: __emscripten_runtime_keepalive_clear,
 /** @export */ _emscripten_thread_mailbox_await: __emscripten_thread_mailbox_await,
 /** @export */ _emscripten_thread_set_strongref: __emscripten_thread_set_strongref,
 /** @export */ _gmtime_js: __gmtime_js,
 /** @export */ _localtime_js: __localtime_js,
 /** @export */ _mmap_js: __mmap_js,
 /** @export */ _munmap_js: __munmap_js,
 /** @export */ _tzset_js: __tzset_js,
 /** @export */ abort: _abort,
 /** @export */ emscripten_cancel_main_loop: _emscripten_cancel_main_loop,
 /** @export */ emscripten_check_blocking_allowed: _emscripten_check_blocking_allowed,
 /** @export */ emscripten_date_now: _emscripten_date_now,
 /** @export */ emscripten_err: _emscripten_err,
 /** @export */ emscripten_exit_with_live_runtime: _emscripten_exit_with_live_runtime,
 /** @export */ emscripten_force_exit: _emscripten_force_exit,
 /** @export */ emscripten_get_heap_max: _emscripten_get_heap_max,
 /** @export */ emscripten_get_now: _emscripten_get_now,
 /** @export */ emscripten_get_now_res: _emscripten_get_now_res,
 /** @export */ emscripten_glActiveTexture: _emscripten_glActiveTexture,
 /** @export */ emscripten_glAttachShader: _emscripten_glAttachShader,
 /** @export */ emscripten_glBeginTransformFeedback: _emscripten_glBeginTransformFeedback,
 /** @export */ emscripten_glBindBuffer: _emscripten_glBindBuffer,
 /** @export */ emscripten_glBindBufferBase: _emscripten_glBindBufferBase,
 /** @export */ emscripten_glBindBufferRange: _emscripten_glBindBufferRange,
 /** @export */ emscripten_glBindFramebuffer: _emscripten_glBindFramebuffer,
 /** @export */ emscripten_glBindRenderbuffer: _emscripten_glBindRenderbuffer,
 /** @export */ emscripten_glBindTexture: _emscripten_glBindTexture,
 /** @export */ emscripten_glBindVertexArray: _emscripten_glBindVertexArray,
 /** @export */ emscripten_glBlendColor: _emscripten_glBlendColor,
 /** @export */ emscripten_glBlendEquation: _emscripten_glBlendEquation,
 /** @export */ emscripten_glBlendFunc: _emscripten_glBlendFunc,
 /** @export */ emscripten_glBlendFuncSeparate: _emscripten_glBlendFuncSeparate,
 /** @export */ emscripten_glBlitFramebuffer: _emscripten_glBlitFramebuffer,
 /** @export */ emscripten_glBufferData: _emscripten_glBufferData,
 /** @export */ emscripten_glBufferSubData: _emscripten_glBufferSubData,
 /** @export */ emscripten_glCheckFramebufferStatus: _emscripten_glCheckFramebufferStatus,
 /** @export */ emscripten_glClear: _emscripten_glClear,
 /** @export */ emscripten_glClearBufferfv: _emscripten_glClearBufferfv,
 /** @export */ emscripten_glClearColor: _emscripten_glClearColor,
 /** @export */ emscripten_glClearDepthf: _emscripten_glClearDepthf,
 /** @export */ emscripten_glClearStencil: _emscripten_glClearStencil,
 /** @export */ emscripten_glColorMask: _emscripten_glColorMask,
 /** @export */ emscripten_glCompileShader: _emscripten_glCompileShader,
 /** @export */ emscripten_glCompressedTexImage2D: _emscripten_glCompressedTexImage2D,
 /** @export */ emscripten_glCompressedTexImage3D: _emscripten_glCompressedTexImage3D,
 /** @export */ emscripten_glCompressedTexSubImage3D: _emscripten_glCompressedTexSubImage3D,
 /** @export */ emscripten_glCopyBufferSubData: _emscripten_glCopyBufferSubData,
 /** @export */ emscripten_glCreateProgram: _emscripten_glCreateProgram,
 /** @export */ emscripten_glCreateShader: _emscripten_glCreateShader,
 /** @export */ emscripten_glCullFace: _emscripten_glCullFace,
 /** @export */ emscripten_glDeleteBuffers: _emscripten_glDeleteBuffers,
 /** @export */ emscripten_glDeleteFramebuffers: _emscripten_glDeleteFramebuffers,
 /** @export */ emscripten_glDeleteProgram: _emscripten_glDeleteProgram,
 /** @export */ emscripten_glDeleteQueries: _emscripten_glDeleteQueries,
 /** @export */ emscripten_glDeleteRenderbuffers: _emscripten_glDeleteRenderbuffers,
 /** @export */ emscripten_glDeleteShader: _emscripten_glDeleteShader,
 /** @export */ emscripten_glDeleteSync: _emscripten_glDeleteSync,
 /** @export */ emscripten_glDeleteTextures: _emscripten_glDeleteTextures,
 /** @export */ emscripten_glDeleteVertexArrays: _emscripten_glDeleteVertexArrays,
 /** @export */ emscripten_glDepthFunc: _emscripten_glDepthFunc,
 /** @export */ emscripten_glDepthMask: _emscripten_glDepthMask,
 /** @export */ emscripten_glDisable: _emscripten_glDisable,
 /** @export */ emscripten_glDisableVertexAttribArray: _emscripten_glDisableVertexAttribArray,
 /** @export */ emscripten_glDrawArrays: _emscripten_glDrawArrays,
 /** @export */ emscripten_glDrawArraysInstanced: _emscripten_glDrawArraysInstanced,
 /** @export */ emscripten_glDrawBuffers: _emscripten_glDrawBuffers,
 /** @export */ emscripten_glDrawElements: _emscripten_glDrawElements,
 /** @export */ emscripten_glDrawElementsInstanced: _emscripten_glDrawElementsInstanced,
 /** @export */ emscripten_glEnable: _emscripten_glEnable,
 /** @export */ emscripten_glEnableVertexAttribArray: _emscripten_glEnableVertexAttribArray,
 /** @export */ emscripten_glEndTransformFeedback: _emscripten_glEndTransformFeedback,
 /** @export */ emscripten_glFenceSync: _emscripten_glFenceSync,
 /** @export */ emscripten_glFinish: _emscripten_glFinish,
 /** @export */ emscripten_glFramebufferRenderbuffer: _emscripten_glFramebufferRenderbuffer,
 /** @export */ emscripten_glFramebufferTexture2D: _emscripten_glFramebufferTexture2D,
 /** @export */ emscripten_glFramebufferTextureLayer: _emscripten_glFramebufferTextureLayer,
 /** @export */ emscripten_glFrontFace: _emscripten_glFrontFace,
 /** @export */ emscripten_glGenBuffers: _emscripten_glGenBuffers,
 /** @export */ emscripten_glGenFramebuffers: _emscripten_glGenFramebuffers,
 /** @export */ emscripten_glGenQueries: _emscripten_glGenQueries,
 /** @export */ emscripten_glGenRenderbuffers: _emscripten_glGenRenderbuffers,
 /** @export */ emscripten_glGenTextures: _emscripten_glGenTextures,
 /** @export */ emscripten_glGenVertexArrays: _emscripten_glGenVertexArrays,
 /** @export */ emscripten_glGenerateMipmap: _emscripten_glGenerateMipmap,
 /** @export */ emscripten_glGetFloatv: _emscripten_glGetFloatv,
 /** @export */ emscripten_glGetInteger64v: _emscripten_glGetInteger64v,
 /** @export */ emscripten_glGetIntegerv: _emscripten_glGetIntegerv,
 /** @export */ emscripten_glGetProgramInfoLog: _emscripten_glGetProgramInfoLog,
 /** @export */ emscripten_glGetProgramiv: _emscripten_glGetProgramiv,
 /** @export */ emscripten_glGetShaderInfoLog: _emscripten_glGetShaderInfoLog,
 /** @export */ emscripten_glGetShaderiv: _emscripten_glGetShaderiv,
 /** @export */ emscripten_glGetString: _emscripten_glGetString,
 /** @export */ emscripten_glGetSynciv: _emscripten_glGetSynciv,
 /** @export */ emscripten_glGetUniformBlockIndex: _emscripten_glGetUniformBlockIndex,
 /** @export */ emscripten_glGetUniformLocation: _emscripten_glGetUniformLocation,
 /** @export */ emscripten_glLinkProgram: _emscripten_glLinkProgram,
 /** @export */ emscripten_glPixelStorei: _emscripten_glPixelStorei,
 /** @export */ emscripten_glReadBuffer: _emscripten_glReadBuffer,
 /** @export */ emscripten_glReadPixels: _emscripten_glReadPixels,
 /** @export */ emscripten_glRenderbufferStorage: _emscripten_glRenderbufferStorage,
 /** @export */ emscripten_glRenderbufferStorageMultisample: _emscripten_glRenderbufferStorageMultisample,
 /** @export */ emscripten_glScissor: _emscripten_glScissor,
 /** @export */ emscripten_glShaderSource: _emscripten_glShaderSource,
 /** @export */ emscripten_glStencilFunc: _emscripten_glStencilFunc,
 /** @export */ emscripten_glStencilMask: _emscripten_glStencilMask,
 /** @export */ emscripten_glStencilOp: _emscripten_glStencilOp,
 /** @export */ emscripten_glTexImage2D: _emscripten_glTexImage2D,
 /** @export */ emscripten_glTexImage3D: _emscripten_glTexImage3D,
 /** @export */ emscripten_glTexParameterf: _emscripten_glTexParameterf,
 /** @export */ emscripten_glTexParameteri: _emscripten_glTexParameteri,
 /** @export */ emscripten_glTexStorage2D: _emscripten_glTexStorage2D,
 /** @export */ emscripten_glTexSubImage3D: _emscripten_glTexSubImage3D,
 /** @export */ emscripten_glTransformFeedbackVaryings: _emscripten_glTransformFeedbackVaryings,
 /** @export */ emscripten_glUniform1f: _emscripten_glUniform1f,
 /** @export */ emscripten_glUniform1i: _emscripten_glUniform1i,
 /** @export */ emscripten_glUniform1iv: _emscripten_glUniform1iv,
 /** @export */ emscripten_glUniform1ui: _emscripten_glUniform1ui,
 /** @export */ emscripten_glUniform1uiv: _emscripten_glUniform1uiv,
 /** @export */ emscripten_glUniform2f: _emscripten_glUniform2f,
 /** @export */ emscripten_glUniform2fv: _emscripten_glUniform2fv,
 /** @export */ emscripten_glUniform2iv: _emscripten_glUniform2iv,
 /** @export */ emscripten_glUniform3fv: _emscripten_glUniform3fv,
 /** @export */ emscripten_glUniform4f: _emscripten_glUniform4f,
 /** @export */ emscripten_glUniform4fv: _emscripten_glUniform4fv,
 /** @export */ emscripten_glUniformBlockBinding: _emscripten_glUniformBlockBinding,
 /** @export */ emscripten_glUniformMatrix3fv: _emscripten_glUniformMatrix3fv,
 /** @export */ emscripten_glUniformMatrix4fv: _emscripten_glUniformMatrix4fv,
 /** @export */ emscripten_glUseProgram: _emscripten_glUseProgram,
 /** @export */ emscripten_glVertexAttrib4f: _emscripten_glVertexAttrib4f,
 /** @export */ emscripten_glVertexAttribDivisor: _emscripten_glVertexAttribDivisor,
 /** @export */ emscripten_glVertexAttribI4ui: _emscripten_glVertexAttribI4ui,
 /** @export */ emscripten_glVertexAttribIPointer: _emscripten_glVertexAttribIPointer,
 /** @export */ emscripten_glVertexAttribPointer: _emscripten_glVertexAttribPointer,
 /** @export */ emscripten_glViewport: _emscripten_glViewport,
 /** @export */ emscripten_num_logical_cores: _emscripten_num_logical_cores,
 /** @export */ emscripten_resize_heap: _emscripten_resize_heap,
 /** @export */ emscripten_set_canvas_element_size: _emscripten_set_canvas_element_size,
 /** @export */ emscripten_set_main_loop: _emscripten_set_main_loop,
 /** @export */ emscripten_set_timeout: _emscripten_set_timeout,
 /** @export */ emscripten_supports_offscreencanvas: _emscripten_supports_offscreencanvas,
 /** @export */ emscripten_unwind_to_js_event_loop: _emscripten_unwind_to_js_event_loop,
 /** @export */ emscripten_webgl_destroy_context: _emscripten_webgl_destroy_context,
 /** @export */ emscripten_webgl_do_commit_frame: _emscripten_webgl_do_commit_frame,
 /** @export */ emscripten_webgl_do_create_context: _emscripten_webgl_do_create_context,
 /** @export */ emscripten_webgl_enable_extension: _emscripten_webgl_enable_extension,
 /** @export */ emscripten_webgl_get_supported_extensions: _emscripten_webgl_get_supported_extensions,
 /** @export */ emscripten_webgl_make_context_current_calling_thread: _emscripten_webgl_make_context_current_calling_thread,
 /** @export */ environ_get: _environ_get,
 /** @export */ environ_sizes_get: _environ_sizes_get,
 /** @export */ exit: _exit,
 /** @export */ fd_close: _fd_close,
 /** @export */ fd_fdstat_get: _fd_fdstat_get,
 /** @export */ fd_pread: _fd_pread,
 /** @export */ fd_pwrite: _fd_pwrite,
 /** @export */ fd_read: _fd_read,
 /** @export */ fd_seek: _fd_seek,
 /** @export */ fd_sync: _fd_sync,
 /** @export */ fd_write: _fd_write,
 /** @export */ godot_audio_get_sample_playback_position: _godot_audio_get_sample_playback_position,
 /** @export */ godot_audio_has_script_processor: _godot_audio_has_script_processor,
 /** @export */ godot_audio_has_worklet: _godot_audio_has_worklet,
 /** @export */ godot_audio_init: _godot_audio_init,
 /** @export */ godot_audio_input_start: _godot_audio_input_start,
 /** @export */ godot_audio_input_stop: _godot_audio_input_stop,
 /** @export */ godot_audio_is_available: _godot_audio_is_available,
 /** @export */ godot_audio_resume: _godot_audio_resume,
 /** @export */ godot_audio_sample_bus_add: _godot_audio_sample_bus_add,
 /** @export */ godot_audio_sample_bus_move: _godot_audio_sample_bus_move,
 /** @export */ godot_audio_sample_bus_remove: _godot_audio_sample_bus_remove,
 /** @export */ godot_audio_sample_bus_set_count: _godot_audio_sample_bus_set_count,
 /** @export */ godot_audio_sample_bus_set_mute: _godot_audio_sample_bus_set_mute,
 /** @export */ godot_audio_sample_bus_set_send: _godot_audio_sample_bus_set_send,
 /** @export */ godot_audio_sample_bus_set_solo: _godot_audio_sample_bus_set_solo,
 /** @export */ godot_audio_sample_bus_set_volume_db: _godot_audio_sample_bus_set_volume_db,
 /** @export */ godot_audio_sample_is_active: _godot_audio_sample_is_active,
 /** @export */ godot_audio_sample_register_stream: _godot_audio_sample_register_stream,
 /** @export */ godot_audio_sample_set_finished_callback: _godot_audio_sample_set_finished_callback,
 /** @export */ godot_audio_sample_set_pause: _godot_audio_sample_set_pause,
 /** @export */ godot_audio_sample_set_volumes_linear: _godot_audio_sample_set_volumes_linear,
 /** @export */ godot_audio_sample_start: _godot_audio_sample_start,
 /** @export */ godot_audio_sample_stop: _godot_audio_sample_stop,
 /** @export */ godot_audio_sample_stream_is_registered: _godot_audio_sample_stream_is_registered,
 /** @export */ godot_audio_sample_unregister_stream: _godot_audio_sample_unregister_stream,
 /** @export */ godot_audio_sample_update_pitch_scale: _godot_audio_sample_update_pitch_scale,
 /** @export */ godot_audio_script_create: _godot_audio_script_create,
 /** @export */ godot_audio_script_start: _godot_audio_script_start,
 /** @export */ godot_audio_worklet_create: _godot_audio_worklet_create,
 /** @export */ godot_audio_worklet_start: _godot_audio_worklet_start,
 /** @export */ godot_audio_worklet_state_add: _godot_audio_worklet_state_add,
 /** @export */ godot_audio_worklet_state_get: _godot_audio_worklet_state_get,
 /** @export */ godot_audio_worklet_state_wait: _godot_audio_worklet_state_wait,
 /** @export */ godot_js_config_canvas_id_get: _godot_js_config_canvas_id_get,
 /** @export */ godot_js_config_locale_get: _godot_js_config_locale_get,
 /** @export */ godot_js_display_alert: _godot_js_display_alert,
 /** @export */ godot_js_display_canvas_focus: _godot_js_display_canvas_focus,
 /** @export */ godot_js_display_canvas_is_focused: _godot_js_display_canvas_is_focused,
 /** @export */ godot_js_display_clipboard_get: _godot_js_display_clipboard_get,
 /** @export */ godot_js_display_clipboard_set: _godot_js_display_clipboard_set,
 /** @export */ godot_js_display_cursor_is_hidden: _godot_js_display_cursor_is_hidden,
 /** @export */ godot_js_display_cursor_is_locked: _godot_js_display_cursor_is_locked,
 /** @export */ godot_js_display_cursor_lock_set: _godot_js_display_cursor_lock_set,
 /** @export */ godot_js_display_cursor_set_custom_shape: _godot_js_display_cursor_set_custom_shape,
 /** @export */ godot_js_display_cursor_set_shape: _godot_js_display_cursor_set_shape,
 /** @export */ godot_js_display_cursor_set_visible: _godot_js_display_cursor_set_visible,
 /** @export */ godot_js_display_desired_size_set: _godot_js_display_desired_size_set,
 /** @export */ godot_js_display_fullscreen_cb: _godot_js_display_fullscreen_cb,
 /** @export */ godot_js_display_fullscreen_exit: _godot_js_display_fullscreen_exit,
 /** @export */ godot_js_display_fullscreen_request: _godot_js_display_fullscreen_request,
 /** @export */ godot_js_display_has_webgl: _godot_js_display_has_webgl,
 /** @export */ godot_js_display_is_swap_ok_cancel: _godot_js_display_is_swap_ok_cancel,
 /** @export */ godot_js_display_notification_cb: _godot_js_display_notification_cb,
 /** @export */ godot_js_display_pixel_ratio_get: _godot_js_display_pixel_ratio_get,
 /** @export */ godot_js_display_screen_dpi_get: _godot_js_display_screen_dpi_get,
 /** @export */ godot_js_display_screen_size_get: _godot_js_display_screen_size_get,
 /** @export */ godot_js_display_setup_canvas: _godot_js_display_setup_canvas,
 /** @export */ godot_js_display_size_update: _godot_js_display_size_update,
 /** @export */ godot_js_display_touchscreen_is_available: _godot_js_display_touchscreen_is_available,
 /** @export */ godot_js_display_tts_available: _godot_js_display_tts_available,
 /** @export */ godot_js_display_vk_available: _godot_js_display_vk_available,
 /** @export */ godot_js_display_vk_cb: _godot_js_display_vk_cb,
 /** @export */ godot_js_display_vk_hide: _godot_js_display_vk_hide,
 /** @export */ godot_js_display_vk_show: _godot_js_display_vk_show,
 /** @export */ godot_js_display_window_blur_cb: _godot_js_display_window_blur_cb,
 /** @export */ godot_js_display_window_icon_set: _godot_js_display_window_icon_set,
 /** @export */ godot_js_display_window_size_get: _godot_js_display_window_size_get,
 /** @export */ godot_js_display_window_title_set: _godot_js_display_window_title_set,
 /** @export */ godot_js_dylink_error: _godot_js_dylink_error,
 /** @export */ godot_js_dylink_symbol: _godot_js_dylink_symbol,
 /** @export */ godot_js_dylink_thread_load: _godot_js_dylink_thread_load,
 /** @export */ godot_js_emscripten_get_version: _godot_js_emscripten_get_version,
 /** @export */ godot_js_eval: _godot_js_eval,
 /** @export */ godot_js_fetch_create: _godot_js_fetch_create,
 /** @export */ godot_js_fetch_free: _godot_js_fetch_free,
 /** @export */ godot_js_fetch_http_status_get: _godot_js_fetch_http_status_get,
 /** @export */ godot_js_fetch_is_chunked: _godot_js_fetch_is_chunked,
 /** @export */ godot_js_fetch_read_chunk: _godot_js_fetch_read_chunk,
 /** @export */ godot_js_fetch_read_headers: _godot_js_fetch_read_headers,
 /** @export */ godot_js_fetch_state_get: _godot_js_fetch_state_get,
 /** @export */ godot_js_input_drop_files_cb: _godot_js_input_drop_files_cb,
 /** @export */ godot_js_input_gamepad_cb: _godot_js_input_gamepad_cb,
 /** @export */ godot_js_input_gamepad_sample: _godot_js_input_gamepad_sample,
 /** @export */ godot_js_input_gamepad_sample_count: _godot_js_input_gamepad_sample_count,
 /** @export */ godot_js_input_gamepad_sample_get: _godot_js_input_gamepad_sample_get,
 /** @export */ godot_js_input_key_cb: _godot_js_input_key_cb,
 /** @export */ godot_js_input_mouse_button_cb: _godot_js_input_mouse_button_cb,
 /** @export */ godot_js_input_mouse_move_cb: _godot_js_input_mouse_move_cb,
 /** @export */ godot_js_input_mouse_wheel_cb: _godot_js_input_mouse_wheel_cb,
 /** @export */ godot_js_input_paste_cb: _godot_js_input_paste_cb,
 /** @export */ godot_js_input_touch_cb: _godot_js_input_touch_cb,
 /** @export */ godot_js_input_vibrate_handheld: _godot_js_input_vibrate_handheld,
 /** @export */ godot_js_is_ime_focused: _godot_js_is_ime_focused,
 /** @export */ godot_js_os_download_buffer: _godot_js_os_download_buffer,
 /** @export */ godot_js_os_execute: _godot_js_os_execute,
 /** @export */ godot_js_os_finish_async: _godot_js_os_finish_async,
 /** @export */ godot_js_os_fs_is_persistent: _godot_js_os_fs_is_persistent,
 /** @export */ godot_js_os_fs_sync: _godot_js_os_fs_sync,
 /** @export */ godot_js_os_has_feature: _godot_js_os_has_feature,
 /** @export */ godot_js_os_hw_concurrency_get: _godot_js_os_hw_concurrency_get,
 /** @export */ godot_js_os_request_quit_cb: _godot_js_os_request_quit_cb,
 /** @export */ godot_js_os_shell_open: _godot_js_os_shell_open,
 /** @export */ godot_js_os_thread_pool_size_get: _godot_js_os_thread_pool_size_get,
 /** @export */ godot_js_pwa_cb: _godot_js_pwa_cb,
 /** @export */ godot_js_pwa_update: _godot_js_pwa_update,
 /** @export */ godot_js_rtc_datachannel_close: _godot_js_rtc_datachannel_close,
 /** @export */ godot_js_rtc_datachannel_connect: _godot_js_rtc_datachannel_connect,
 /** @export */ godot_js_rtc_datachannel_destroy: _godot_js_rtc_datachannel_destroy,
 /** @export */ godot_js_rtc_datachannel_get_buffered_amount: _godot_js_rtc_datachannel_get_buffered_amount,
 /** @export */ godot_js_rtc_datachannel_id_get: _godot_js_rtc_datachannel_id_get,
 /** @export */ godot_js_rtc_datachannel_is_negotiated: _godot_js_rtc_datachannel_is_negotiated,
 /** @export */ godot_js_rtc_datachannel_is_ordered: _godot_js_rtc_datachannel_is_ordered,
 /** @export */ godot_js_rtc_datachannel_label_get: _godot_js_rtc_datachannel_label_get,
 /** @export */ godot_js_rtc_datachannel_max_packet_lifetime_get: _godot_js_rtc_datachannel_max_packet_lifetime_get,
 /** @export */ godot_js_rtc_datachannel_max_retransmits_get: _godot_js_rtc_datachannel_max_retransmits_get,
 /** @export */ godot_js_rtc_datachannel_protocol_get: _godot_js_rtc_datachannel_protocol_get,
 /** @export */ godot_js_rtc_datachannel_ready_state_get: _godot_js_rtc_datachannel_ready_state_get,
 /** @export */ godot_js_rtc_datachannel_send: _godot_js_rtc_datachannel_send,
 /** @export */ godot_js_rtc_pc_close: _godot_js_rtc_pc_close,
 /** @export */ godot_js_rtc_pc_create: _godot_js_rtc_pc_create,
 /** @export */ godot_js_rtc_pc_datachannel_create: _godot_js_rtc_pc_datachannel_create,
 /** @export */ godot_js_rtc_pc_destroy: _godot_js_rtc_pc_destroy,
 /** @export */ godot_js_rtc_pc_ice_candidate_add: _godot_js_rtc_pc_ice_candidate_add,
 /** @export */ godot_js_rtc_pc_local_description_set: _godot_js_rtc_pc_local_description_set,
 /** @export */ godot_js_rtc_pc_offer_create: _godot_js_rtc_pc_offer_create,
 /** @export */ godot_js_rtc_pc_remote_description_set: _godot_js_rtc_pc_remote_description_set,
 /** @export */ godot_js_set_ime_active: _godot_js_set_ime_active,
 /** @export */ godot_js_set_ime_cb: _godot_js_set_ime_cb,
 /** @export */ godot_js_set_ime_position: _godot_js_set_ime_position,
 /** @export */ godot_js_tts_get_voices: _godot_js_tts_get_voices,
 /** @export */ godot_js_tts_is_paused: _godot_js_tts_is_paused,
 /** @export */ godot_js_tts_is_speaking: _godot_js_tts_is_speaking,
 /** @export */ godot_js_tts_pause: _godot_js_tts_pause,
 /** @export */ godot_js_tts_resume: _godot_js_tts_resume,
 /** @export */ godot_js_tts_speak: _godot_js_tts_speak,
 /** @export */ godot_js_tts_stop: _godot_js_tts_stop,
 /** @export */ godot_js_webmidi_close_midi_inputs: _godot_js_webmidi_close_midi_inputs,
 /** @export */ godot_js_webmidi_open_midi_inputs: _godot_js_webmidi_open_midi_inputs,
 /** @export */ godot_js_websocket_buffered_amount: _godot_js_websocket_buffered_amount,
 /** @export */ godot_js_websocket_close: _godot_js_websocket_close,
 /** @export */ godot_js_websocket_create: _godot_js_websocket_create,
 /** @export */ godot_js_websocket_destroy: _godot_js_websocket_destroy,
 /** @export */ godot_js_websocket_send: _godot_js_websocket_send,
 /** @export */ godot_js_wrapper_create_cb: _godot_js_wrapper_create_cb,
 /** @export */ godot_js_wrapper_create_object: _godot_js_wrapper_create_object,
 /** @export */ godot_js_wrapper_interface_get: _godot_js_wrapper_interface_get,
 /** @export */ godot_js_wrapper_object_call: _godot_js_wrapper_object_call,
 /** @export */ godot_js_wrapper_object_get: _godot_js_wrapper_object_get,
 /** @export */ godot_js_wrapper_object_getvar: _godot_js_wrapper_object_getvar,
 /** @export */ godot_js_wrapper_object_is_buffer: _godot_js_wrapper_object_is_buffer,
 /** @export */ godot_js_wrapper_object_set: _godot_js_wrapper_object_set,
 /** @export */ godot_js_wrapper_object_set_cb_ret: _godot_js_wrapper_object_set_cb_ret,
 /** @export */ godot_js_wrapper_object_setvar: _godot_js_wrapper_object_setvar,
 /** @export */ godot_js_wrapper_object_transfer_buffer: _godot_js_wrapper_object_transfer_buffer,
 /** @export */ godot_js_wrapper_object_unref: _godot_js_wrapper_object_unref,
 /** @export */ godot_webgl2_glFramebufferTextureMultisampleMultiviewOVR: _godot_webgl2_glFramebufferTextureMultisampleMultiviewOVR,
 /** @export */ godot_webgl2_glFramebufferTextureMultiviewOVR: _godot_webgl2_glFramebufferTextureMultiviewOVR,
 /** @export */ godot_webgl2_glGetBufferSubData: _godot_webgl2_glGetBufferSubData,
 /** @export */ memory: wasmMemory || Module["wasmMemory"],
 /** @export */ mono_interp_tier_prepare_jiterpreter: _mono_interp_tier_prepare_jiterpreter,
 /** @export */ mono_wasm_browser_entropy: _mono_wasm_browser_entropy,
 /** @export */ mono_wasm_cancel_promise: _mono_wasm_cancel_promise,
 /** @export */ mono_wasm_console_clear: _mono_wasm_console_clear,
 /** @export */ mono_wasm_dump_threads: _mono_wasm_dump_threads,
 /** @export */ mono_wasm_free_method_data: _mono_wasm_free_method_data,
 /** @export */ mono_wasm_get_locale_info: _mono_wasm_get_locale_info,
 /** @export */ mono_wasm_install_js_worker_interop: _mono_wasm_install_js_worker_interop,
 /** @export */ mono_wasm_invoke_js_function: _mono_wasm_invoke_js_function,
 /** @export */ mono_wasm_invoke_jsimport_MT: _mono_wasm_invoke_jsimport_MT,
 /** @export */ mono_wasm_process_current_pid: _mono_wasm_process_current_pid,
 /** @export */ mono_wasm_pthread_on_pthread_attached: _mono_wasm_pthread_on_pthread_attached,
 /** @export */ mono_wasm_pthread_on_pthread_registered: _mono_wasm_pthread_on_pthread_registered,
 /** @export */ mono_wasm_pthread_on_pthread_unregistered: _mono_wasm_pthread_on_pthread_unregistered,
 /** @export */ mono_wasm_pthread_set_name: _mono_wasm_pthread_set_name,
 /** @export */ mono_wasm_release_cs_owned_object: _mono_wasm_release_cs_owned_object,
 /** @export */ mono_wasm_resolve_or_reject_promise: _mono_wasm_resolve_or_reject_promise,
 /** @export */ mono_wasm_schedule_synchronization_context: _mono_wasm_schedule_synchronization_context,
 /** @export */ mono_wasm_set_entrypoint_breakpoint: _mono_wasm_set_entrypoint_breakpoint,
 /** @export */ mono_wasm_start_deputy_thread_async: _mono_wasm_start_deputy_thread_async,
 /** @export */ mono_wasm_start_io_thread_async: _mono_wasm_start_io_thread_async,
 /** @export */ mono_wasm_trace_logger: _mono_wasm_trace_logger,
 /** @export */ mono_wasm_uninstall_js_worker_interop: _mono_wasm_uninstall_js_worker_interop,
 /** @export */ mono_wasm_warn_about_blocking_wait: _mono_wasm_warn_about_blocking_wait,
 /** @export */ proc_exit: _proc_exit,
 /** @export */ strftime: _strftime,
 /** @export */ strftime_l: _strftime_l
};

var wasmExports = createWasm();

var ___wasm_call_ctors = () => (___wasm_call_ctors = wasmExports["__wasm_call_ctors"])();

var _godot_web_sync_side_modules = Module["_godot_web_sync_side_modules"] = () => (_godot_web_sync_side_modules = Module["_godot_web_sync_side_modules"] = wasmExports["godot_web_sync_side_modules"])();

var _godotsharp_game_main_init = Module["_godotsharp_game_main_init"] = (a0, a1, a2, a3) => (_godotsharp_game_main_init = Module["_godotsharp_game_main_init"] = wasmExports["godotsharp_game_main_init"])(a0, a1, a2, a3);

var _acosf = Module["_acosf"] = a0 => (_acosf = Module["_acosf"] = wasmExports["acosf"])(a0);

var _sinf = Module["_sinf"] = a0 => (_sinf = Module["_sinf"] = wasmExports["sinf"])(a0);

var _cosf = Module["_cosf"] = a0 => (_cosf = Module["_cosf"] = wasmExports["cosf"])(a0);

var _atan2f = Module["_atan2f"] = (a0, a1) => (_atan2f = Module["_atan2f"] = wasmExports["atan2f"])(a0, a1);

var _fmodf = Module["_fmodf"] = (a0, a1) => (_fmodf = Module["_fmodf"] = wasmExports["fmodf"])(a0, a1);

var _free = Module["_free"] = a0 => (_free = Module["_free"] = wasmExports["free"])(a0);

var _memset = Module["_memset"] = (a0, a1, a2) => (_memset = Module["_memset"] = wasmExports["memset"])(a0, a1, a2);

var _sin = Module["_sin"] = a0 => (_sin = Module["_sin"] = wasmExports["sin"])(a0);

var _cos = Module["_cos"] = a0 => (_cos = Module["_cos"] = wasmExports["cos"])(a0);

var _tan = Module["_tan"] = a0 => (_tan = Module["_tan"] = wasmExports["tan"])(a0);

var _sinh = Module["_sinh"] = a0 => (_sinh = Module["_sinh"] = wasmExports["sinh"])(a0);

var _cosh = Module["_cosh"] = a0 => (_cosh = Module["_cosh"] = wasmExports["cosh"])(a0);

var _tanh = Module["_tanh"] = a0 => (_tanh = Module["_tanh"] = wasmExports["tanh"])(a0);

var _asin = Module["_asin"] = a0 => (_asin = Module["_asin"] = wasmExports["asin"])(a0);

var _acos = Module["_acos"] = a0 => (_acos = Module["_acos"] = wasmExports["acos"])(a0);

var _atan = Module["_atan"] = a0 => (_atan = Module["_atan"] = wasmExports["atan"])(a0);

var _atan2 = Module["_atan2"] = (a0, a1) => (_atan2 = Module["_atan2"] = wasmExports["atan2"])(a0, a1);

var _asinh = Module["_asinh"] = a0 => (_asinh = Module["_asinh"] = wasmExports["asinh"])(a0);

var _acosh = Module["_acosh"] = a0 => (_acosh = Module["_acosh"] = wasmExports["acosh"])(a0);

var _atanh = Module["_atanh"] = a0 => (_atanh = Module["_atanh"] = wasmExports["atanh"])(a0);

var _fmod = Module["_fmod"] = (a0, a1) => (_fmod = Module["_fmod"] = wasmExports["fmod"])(a0, a1);

var _pow = Module["_pow"] = (a0, a1) => (_pow = Module["_pow"] = wasmExports["pow"])(a0, a1);

var _log = Module["_log"] = a0 => (_log = Module["_log"] = wasmExports["log"])(a0);

var _exp = Module["_exp"] = a0 => (_exp = Module["_exp"] = wasmExports["exp"])(a0);

var _logf = Module["_logf"] = a0 => (_logf = Module["_logf"] = wasmExports["logf"])(a0);

var _malloc = Module["_malloc"] = a0 => (_malloc = Module["_malloc"] = wasmExports["malloc"])(a0);

var _powf = Module["_powf"] = (a0, a1) => (_powf = Module["_powf"] = wasmExports["powf"])(a0, a1);

var _log2 = Module["_log2"] = a0 => (_log2 = Module["_log2"] = wasmExports["log2"])(a0);

var _tanf = Module["_tanf"] = a0 => (_tanf = Module["_tanf"] = wasmExports["tanf"])(a0);

var _log10 = Module["_log10"] = a0 => (_log10 = Module["_log10"] = wasmExports["log10"])(a0);

var _log2f = Module["_log2f"] = a0 => (_log2f = Module["_log2f"] = wasmExports["log2f"])(a0);

var _fflush = a0 => (_fflush = wasmExports["fflush"])(a0);

var _expf = Module["_expf"] = a0 => (_expf = Module["_expf"] = wasmExports["expf"])(a0);

var _cbrtf = Module["_cbrtf"] = a0 => (_cbrtf = Module["_cbrtf"] = wasmExports["cbrtf"])(a0);

var _atanf = Module["_atanf"] = a0 => (_atanf = Module["_atanf"] = wasmExports["atanf"])(a0);

var _posix_memalign = Module["_posix_memalign"] = (a0, a1, a2) => (_posix_memalign = Module["_posix_memalign"] = wasmExports["posix_memalign"])(a0, a1, a2);

var _htons = Module["_htons"] = a0 => (_htons = Module["_htons"] = wasmExports["htons"])(a0);

var _ntohs = Module["_ntohs"] = a0 => (_ntohs = Module["_ntohs"] = wasmExports["ntohs"])(a0);

var _tanhf = Module["_tanhf"] = a0 => (_tanhf = Module["_tanhf"] = wasmExports["tanhf"])(a0);

var _emscripten_webgl_commit_frame = () => (_emscripten_webgl_commit_frame = wasmExports["emscripten_webgl_commit_frame"])();

var _asinf = Module["_asinf"] = a0 => (_asinf = Module["_asinf"] = wasmExports["asinf"])(a0);

var _log10f = Module["_log10f"] = a0 => (_log10f = Module["_log10f"] = wasmExports["log10f"])(a0);

var _mono_wasm_register_root = Module["_mono_wasm_register_root"] = (a0, a1, a2) => (_mono_wasm_register_root = Module["_mono_wasm_register_root"] = wasmExports["mono_wasm_register_root"])(a0, a1, a2);

var _mono_wasm_deregister_root = Module["_mono_wasm_deregister_root"] = a0 => (_mono_wasm_deregister_root = Module["_mono_wasm_deregister_root"] = wasmExports["mono_wasm_deregister_root"])(a0);

var _mono_wasm_add_assembly = Module["_mono_wasm_add_assembly"] = (a0, a1, a2) => (_mono_wasm_add_assembly = Module["_mono_wasm_add_assembly"] = wasmExports["mono_wasm_add_assembly"])(a0, a1, a2);

var _mono_wasm_add_satellite_assembly = Module["_mono_wasm_add_satellite_assembly"] = (a0, a1, a2, a3) => (_mono_wasm_add_satellite_assembly = Module["_mono_wasm_add_satellite_assembly"] = wasmExports["mono_wasm_add_satellite_assembly"])(a0, a1, a2, a3);

var _mono_wasm_setenv = Module["_mono_wasm_setenv"] = (a0, a1) => (_mono_wasm_setenv = Module["_mono_wasm_setenv"] = wasmExports["mono_wasm_setenv"])(a0, a1);

var _mono_wasm_getenv = Module["_mono_wasm_getenv"] = a0 => (_mono_wasm_getenv = Module["_mono_wasm_getenv"] = wasmExports["mono_wasm_getenv"])(a0);

var _mono_wasm_load_runtime = Module["_mono_wasm_load_runtime"] = (a0, a1, a2, a3) => (_mono_wasm_load_runtime = Module["_mono_wasm_load_runtime"] = wasmExports["mono_wasm_load_runtime"])(a0, a1, a2, a3);

var _mono_wasm_invoke_jsexport = Module["_mono_wasm_invoke_jsexport"] = (a0, a1) => (_mono_wasm_invoke_jsexport = Module["_mono_wasm_invoke_jsexport"] = wasmExports["mono_wasm_invoke_jsexport"])(a0, a1);

var _mono_wasm_print_thread_dump = Module["_mono_wasm_print_thread_dump"] = () => (_mono_wasm_print_thread_dump = Module["_mono_wasm_print_thread_dump"] = wasmExports["mono_wasm_print_thread_dump"])();

var _mono_wasm_invoke_jsexport_async_post = Module["_mono_wasm_invoke_jsexport_async_post"] = (a0, a1, a2) => (_mono_wasm_invoke_jsexport_async_post = Module["_mono_wasm_invoke_jsexport_async_post"] = wasmExports["mono_wasm_invoke_jsexport_async_post"])(a0, a1, a2);

var _mono_wasm_invoke_jsexport_sync = Module["_mono_wasm_invoke_jsexport_sync"] = (a0, a1) => (_mono_wasm_invoke_jsexport_sync = Module["_mono_wasm_invoke_jsexport_sync"] = wasmExports["mono_wasm_invoke_jsexport_sync"])(a0, a1);

var _mono_wasm_invoke_jsexport_sync_send = Module["_mono_wasm_invoke_jsexport_sync_send"] = (a0, a1, a2) => (_mono_wasm_invoke_jsexport_sync_send = Module["_mono_wasm_invoke_jsexport_sync_send"] = wasmExports["mono_wasm_invoke_jsexport_sync_send"])(a0, a1, a2);

var _mono_wasm_synchronization_context_pump = Module["_mono_wasm_synchronization_context_pump"] = () => (_mono_wasm_synchronization_context_pump = Module["_mono_wasm_synchronization_context_pump"] = wasmExports["mono_wasm_synchronization_context_pump"])();

var _mono_wasm_string_from_utf16_ref = Module["_mono_wasm_string_from_utf16_ref"] = (a0, a1, a2) => (_mono_wasm_string_from_utf16_ref = Module["_mono_wasm_string_from_utf16_ref"] = wasmExports["mono_wasm_string_from_utf16_ref"])(a0, a1, a2);

var _mono_wasm_exec_regression = Module["_mono_wasm_exec_regression"] = (a0, a1) => (_mono_wasm_exec_regression = Module["_mono_wasm_exec_regression"] = wasmExports["mono_wasm_exec_regression"])(a0, a1);

var _mono_wasm_exit = Module["_mono_wasm_exit"] = a0 => (_mono_wasm_exit = Module["_mono_wasm_exit"] = wasmExports["mono_wasm_exit"])(a0);

var _mono_wasm_set_main_args = Module["_mono_wasm_set_main_args"] = (a0, a1) => (_mono_wasm_set_main_args = Module["_mono_wasm_set_main_args"] = wasmExports["mono_wasm_set_main_args"])(a0, a1);

var _mono_wasm_strdup = Module["_mono_wasm_strdup"] = a0 => (_mono_wasm_strdup = Module["_mono_wasm_strdup"] = wasmExports["mono_wasm_strdup"])(a0);

var _mono_wasm_parse_runtime_options = Module["_mono_wasm_parse_runtime_options"] = (a0, a1) => (_mono_wasm_parse_runtime_options = Module["_mono_wasm_parse_runtime_options"] = wasmExports["mono_wasm_parse_runtime_options"])(a0, a1);

var _mono_wasm_intern_string_ref = Module["_mono_wasm_intern_string_ref"] = a0 => (_mono_wasm_intern_string_ref = Module["_mono_wasm_intern_string_ref"] = wasmExports["mono_wasm_intern_string_ref"])(a0);

var _mono_wasm_string_get_data_ref = Module["_mono_wasm_string_get_data_ref"] = (a0, a1, a2, a3) => (_mono_wasm_string_get_data_ref = Module["_mono_wasm_string_get_data_ref"] = wasmExports["mono_wasm_string_get_data_ref"])(a0, a1, a2, a3);

var _mono_wasm_write_managed_pointer_unsafe = Module["_mono_wasm_write_managed_pointer_unsafe"] = (a0, a1) => (_mono_wasm_write_managed_pointer_unsafe = Module["_mono_wasm_write_managed_pointer_unsafe"] = wasmExports["mono_wasm_write_managed_pointer_unsafe"])(a0, a1);

var _mono_wasm_copy_managed_pointer = Module["_mono_wasm_copy_managed_pointer"] = (a0, a1) => (_mono_wasm_copy_managed_pointer = Module["_mono_wasm_copy_managed_pointer"] = wasmExports["mono_wasm_copy_managed_pointer"])(a0, a1);

var _mono_wasm_init_finalizer_thread = Module["_mono_wasm_init_finalizer_thread"] = () => (_mono_wasm_init_finalizer_thread = Module["_mono_wasm_init_finalizer_thread"] = wasmExports["mono_wasm_init_finalizer_thread"])();

var _mono_wasm_i52_to_f64 = Module["_mono_wasm_i52_to_f64"] = (a0, a1) => (_mono_wasm_i52_to_f64 = Module["_mono_wasm_i52_to_f64"] = wasmExports["mono_wasm_i52_to_f64"])(a0, a1);

var _mono_wasm_u52_to_f64 = Module["_mono_wasm_u52_to_f64"] = (a0, a1) => (_mono_wasm_u52_to_f64 = Module["_mono_wasm_u52_to_f64"] = wasmExports["mono_wasm_u52_to_f64"])(a0, a1);

var _mono_wasm_f64_to_u52 = Module["_mono_wasm_f64_to_u52"] = (a0, a1) => (_mono_wasm_f64_to_u52 = Module["_mono_wasm_f64_to_u52"] = wasmExports["mono_wasm_f64_to_u52"])(a0, a1);

var _mono_wasm_f64_to_i52 = Module["_mono_wasm_f64_to_i52"] = (a0, a1) => (_mono_wasm_f64_to_i52 = Module["_mono_wasm_f64_to_i52"] = wasmExports["mono_wasm_f64_to_i52"])(a0, a1);

var _mono_wasm_method_get_full_name = Module["_mono_wasm_method_get_full_name"] = a0 => (_mono_wasm_method_get_full_name = Module["_mono_wasm_method_get_full_name"] = wasmExports["mono_wasm_method_get_full_name"])(a0);

var _mono_wasm_method_get_name = Module["_mono_wasm_method_get_name"] = a0 => (_mono_wasm_method_get_name = Module["_mono_wasm_method_get_name"] = wasmExports["mono_wasm_method_get_name"])(a0);

var _mono_wasm_method_get_name_ex = Module["_mono_wasm_method_get_name_ex"] = a0 => (_mono_wasm_method_get_name_ex = Module["_mono_wasm_method_get_name_ex"] = wasmExports["mono_wasm_method_get_name_ex"])(a0);

var _mono_wasm_get_f32_unaligned = Module["_mono_wasm_get_f32_unaligned"] = a0 => (_mono_wasm_get_f32_unaligned = Module["_mono_wasm_get_f32_unaligned"] = wasmExports["mono_wasm_get_f32_unaligned"])(a0);

var _mono_wasm_get_f64_unaligned = Module["_mono_wasm_get_f64_unaligned"] = a0 => (_mono_wasm_get_f64_unaligned = Module["_mono_wasm_get_f64_unaligned"] = wasmExports["mono_wasm_get_f64_unaligned"])(a0);

var _mono_wasm_get_i32_unaligned = Module["_mono_wasm_get_i32_unaligned"] = a0 => (_mono_wasm_get_i32_unaligned = Module["_mono_wasm_get_i32_unaligned"] = wasmExports["mono_wasm_get_i32_unaligned"])(a0);

var _mono_wasm_is_zero_page_reserved = Module["_mono_wasm_is_zero_page_reserved"] = () => (_mono_wasm_is_zero_page_reserved = Module["_mono_wasm_is_zero_page_reserved"] = wasmExports["mono_wasm_is_zero_page_reserved"])();

var _mono_wasm_read_as_bool_or_null_unsafe = Module["_mono_wasm_read_as_bool_or_null_unsafe"] = a0 => (_mono_wasm_read_as_bool_or_null_unsafe = Module["_mono_wasm_read_as_bool_or_null_unsafe"] = wasmExports["mono_wasm_read_as_bool_or_null_unsafe"])(a0);

var _mono_wasm_assembly_load = Module["_mono_wasm_assembly_load"] = a0 => (_mono_wasm_assembly_load = Module["_mono_wasm_assembly_load"] = wasmExports["mono_wasm_assembly_load"])(a0);

var _mono_wasm_assembly_find_class = Module["_mono_wasm_assembly_find_class"] = (a0, a1, a2) => (_mono_wasm_assembly_find_class = Module["_mono_wasm_assembly_find_class"] = wasmExports["mono_wasm_assembly_find_class"])(a0, a1, a2);

var _mono_wasm_assembly_find_method = Module["_mono_wasm_assembly_find_method"] = (a0, a1, a2) => (_mono_wasm_assembly_find_method = Module["_mono_wasm_assembly_find_method"] = wasmExports["mono_wasm_assembly_find_method"])(a0, a1, a2);

var _mono_wasm_send_dbg_command_with_parms = Module["_mono_wasm_send_dbg_command_with_parms"] = (a0, a1, a2, a3, a4, a5, a6) => (_mono_wasm_send_dbg_command_with_parms = Module["_mono_wasm_send_dbg_command_with_parms"] = wasmExports["mono_wasm_send_dbg_command_with_parms"])(a0, a1, a2, a3, a4, a5, a6);

var _mono_wasm_send_dbg_command = Module["_mono_wasm_send_dbg_command"] = (a0, a1, a2, a3, a4) => (_mono_wasm_send_dbg_command = Module["_mono_wasm_send_dbg_command"] = wasmExports["mono_wasm_send_dbg_command"])(a0, a1, a2, a3, a4);

var _mono_jiterp_register_jit_call_thunk = Module["_mono_jiterp_register_jit_call_thunk"] = (a0, a1) => (_mono_jiterp_register_jit_call_thunk = Module["_mono_jiterp_register_jit_call_thunk"] = wasmExports["mono_jiterp_register_jit_call_thunk"])(a0, a1);

var _mono_jiterp_stackval_to_data = Module["_mono_jiterp_stackval_to_data"] = (a0, a1, a2) => (_mono_jiterp_stackval_to_data = Module["_mono_jiterp_stackval_to_data"] = wasmExports["mono_jiterp_stackval_to_data"])(a0, a1, a2);

var _mono_jiterp_stackval_from_data = Module["_mono_jiterp_stackval_from_data"] = (a0, a1, a2) => (_mono_jiterp_stackval_from_data = Module["_mono_jiterp_stackval_from_data"] = wasmExports["mono_jiterp_stackval_from_data"])(a0, a1, a2);

var _mono_jiterp_get_arg_offset = Module["_mono_jiterp_get_arg_offset"] = (a0, a1, a2) => (_mono_jiterp_get_arg_offset = Module["_mono_jiterp_get_arg_offset"] = wasmExports["mono_jiterp_get_arg_offset"])(a0, a1, a2);

var _mono_jiterp_overflow_check_i4 = Module["_mono_jiterp_overflow_check_i4"] = (a0, a1, a2) => (_mono_jiterp_overflow_check_i4 = Module["_mono_jiterp_overflow_check_i4"] = wasmExports["mono_jiterp_overflow_check_i4"])(a0, a1, a2);

var _mono_jiterp_overflow_check_u4 = Module["_mono_jiterp_overflow_check_u4"] = (a0, a1, a2) => (_mono_jiterp_overflow_check_u4 = Module["_mono_jiterp_overflow_check_u4"] = wasmExports["mono_jiterp_overflow_check_u4"])(a0, a1, a2);

var _mono_jiterp_ld_delegate_method_ptr = Module["_mono_jiterp_ld_delegate_method_ptr"] = (a0, a1) => (_mono_jiterp_ld_delegate_method_ptr = Module["_mono_jiterp_ld_delegate_method_ptr"] = wasmExports["mono_jiterp_ld_delegate_method_ptr"])(a0, a1);

var _mono_jiterp_interp_entry = Module["_mono_jiterp_interp_entry"] = (a0, a1) => (_mono_jiterp_interp_entry = Module["_mono_jiterp_interp_entry"] = wasmExports["mono_jiterp_interp_entry"])(a0, a1);

var _cbrt = Module["_cbrt"] = a0 => (_cbrt = Module["_cbrt"] = wasmExports["cbrt"])(a0);

var _fma = Module["_fma"] = (a0, a1, a2) => (_fma = Module["_fma"] = wasmExports["fma"])(a0, a1, a2);

var _asinhf = Module["_asinhf"] = a0 => (_asinhf = Module["_asinhf"] = wasmExports["asinhf"])(a0);

var _acoshf = Module["_acoshf"] = a0 => (_acoshf = Module["_acoshf"] = wasmExports["acoshf"])(a0);

var _atanhf = Module["_atanhf"] = a0 => (_atanhf = Module["_atanhf"] = wasmExports["atanhf"])(a0);

var _coshf = Module["_coshf"] = a0 => (_coshf = Module["_coshf"] = wasmExports["coshf"])(a0);

var _sinhf = Module["_sinhf"] = a0 => (_sinhf = Module["_sinhf"] = wasmExports["sinhf"])(a0);

var _fmaf = Module["_fmaf"] = (a0, a1, a2) => (_fmaf = Module["_fmaf"] = wasmExports["fmaf"])(a0, a1, a2);

var _mono_jiterp_get_polling_required_address = Module["_mono_jiterp_get_polling_required_address"] = () => (_mono_jiterp_get_polling_required_address = Module["_mono_jiterp_get_polling_required_address"] = wasmExports["mono_jiterp_get_polling_required_address"])();

var _mono_jiterp_prof_enter = Module["_mono_jiterp_prof_enter"] = (a0, a1) => (_mono_jiterp_prof_enter = Module["_mono_jiterp_prof_enter"] = wasmExports["mono_jiterp_prof_enter"])(a0, a1);

var _mono_jiterp_prof_samplepoint = Module["_mono_jiterp_prof_samplepoint"] = (a0, a1) => (_mono_jiterp_prof_samplepoint = Module["_mono_jiterp_prof_samplepoint"] = wasmExports["mono_jiterp_prof_samplepoint"])(a0, a1);

var _mono_jiterp_prof_leave = Module["_mono_jiterp_prof_leave"] = (a0, a1) => (_mono_jiterp_prof_leave = Module["_mono_jiterp_prof_leave"] = wasmExports["mono_jiterp_prof_leave"])(a0, a1);

var _mono_jiterp_do_safepoint = Module["_mono_jiterp_do_safepoint"] = (a0, a1) => (_mono_jiterp_do_safepoint = Module["_mono_jiterp_do_safepoint"] = wasmExports["mono_jiterp_do_safepoint"])(a0, a1);

var _mono_jiterp_imethod_to_ftnptr = Module["_mono_jiterp_imethod_to_ftnptr"] = a0 => (_mono_jiterp_imethod_to_ftnptr = Module["_mono_jiterp_imethod_to_ftnptr"] = wasmExports["mono_jiterp_imethod_to_ftnptr"])(a0);

var _mono_jiterp_enum_hasflag = Module["_mono_jiterp_enum_hasflag"] = (a0, a1, a2, a3) => (_mono_jiterp_enum_hasflag = Module["_mono_jiterp_enum_hasflag"] = wasmExports["mono_jiterp_enum_hasflag"])(a0, a1, a2, a3);

var _mono_jiterp_get_simd_intrinsic = Module["_mono_jiterp_get_simd_intrinsic"] = (a0, a1) => (_mono_jiterp_get_simd_intrinsic = Module["_mono_jiterp_get_simd_intrinsic"] = wasmExports["mono_jiterp_get_simd_intrinsic"])(a0, a1);

var _mono_jiterp_get_simd_opcode = Module["_mono_jiterp_get_simd_opcode"] = (a0, a1) => (_mono_jiterp_get_simd_opcode = Module["_mono_jiterp_get_simd_opcode"] = wasmExports["mono_jiterp_get_simd_opcode"])(a0, a1);

var _mono_jiterp_get_opcode_info = Module["_mono_jiterp_get_opcode_info"] = (a0, a1) => (_mono_jiterp_get_opcode_info = Module["_mono_jiterp_get_opcode_info"] = wasmExports["mono_jiterp_get_opcode_info"])(a0, a1);

var _mono_jiterp_placeholder_trace = Module["_mono_jiterp_placeholder_trace"] = (a0, a1, a2, a3) => (_mono_jiterp_placeholder_trace = Module["_mono_jiterp_placeholder_trace"] = wasmExports["mono_jiterp_placeholder_trace"])(a0, a1, a2, a3);

var _mono_jiterp_placeholder_jit_call = Module["_mono_jiterp_placeholder_jit_call"] = (a0, a1, a2, a3) => (_mono_jiterp_placeholder_jit_call = Module["_mono_jiterp_placeholder_jit_call"] = wasmExports["mono_jiterp_placeholder_jit_call"])(a0, a1, a2, a3);

var _mono_jiterp_get_interp_entry_func = Module["_mono_jiterp_get_interp_entry_func"] = a0 => (_mono_jiterp_get_interp_entry_func = Module["_mono_jiterp_get_interp_entry_func"] = wasmExports["mono_jiterp_get_interp_entry_func"])(a0);

var _mono_jiterp_is_enabled = Module["_mono_jiterp_is_enabled"] = () => (_mono_jiterp_is_enabled = Module["_mono_jiterp_is_enabled"] = wasmExports["mono_jiterp_is_enabled"])();

var _mono_jiterp_encode_leb64_ref = Module["_mono_jiterp_encode_leb64_ref"] = (a0, a1, a2) => (_mono_jiterp_encode_leb64_ref = Module["_mono_jiterp_encode_leb64_ref"] = wasmExports["mono_jiterp_encode_leb64_ref"])(a0, a1, a2);

var _mono_jiterp_encode_leb52 = Module["_mono_jiterp_encode_leb52"] = (a0, a1, a2) => (_mono_jiterp_encode_leb52 = Module["_mono_jiterp_encode_leb52"] = wasmExports["mono_jiterp_encode_leb52"])(a0, a1, a2);

var _mono_jiterp_encode_leb_signed_boundary = Module["_mono_jiterp_encode_leb_signed_boundary"] = (a0, a1, a2) => (_mono_jiterp_encode_leb_signed_boundary = Module["_mono_jiterp_encode_leb_signed_boundary"] = wasmExports["mono_jiterp_encode_leb_signed_boundary"])(a0, a1, a2);

var _mono_jiterp_increase_entry_count = Module["_mono_jiterp_increase_entry_count"] = a0 => (_mono_jiterp_increase_entry_count = Module["_mono_jiterp_increase_entry_count"] = wasmExports["mono_jiterp_increase_entry_count"])(a0);

var _mono_jiterp_object_unbox = Module["_mono_jiterp_object_unbox"] = a0 => (_mono_jiterp_object_unbox = Module["_mono_jiterp_object_unbox"] = wasmExports["mono_jiterp_object_unbox"])(a0);

var _mono_jiterp_type_is_byref = Module["_mono_jiterp_type_is_byref"] = a0 => (_mono_jiterp_type_is_byref = Module["_mono_jiterp_type_is_byref"] = wasmExports["mono_jiterp_type_is_byref"])(a0);

var _mono_jiterp_value_copy = Module["_mono_jiterp_value_copy"] = (a0, a1, a2) => (_mono_jiterp_value_copy = Module["_mono_jiterp_value_copy"] = wasmExports["mono_jiterp_value_copy"])(a0, a1, a2);

var _mono_jiterp_try_newobj_inlined = Module["_mono_jiterp_try_newobj_inlined"] = (a0, a1) => (_mono_jiterp_try_newobj_inlined = Module["_mono_jiterp_try_newobj_inlined"] = wasmExports["mono_jiterp_try_newobj_inlined"])(a0, a1);

var _mono_jiterp_try_newstr = Module["_mono_jiterp_try_newstr"] = (a0, a1) => (_mono_jiterp_try_newstr = Module["_mono_jiterp_try_newstr"] = wasmExports["mono_jiterp_try_newstr"])(a0, a1);

var _mono_jiterp_try_newarr = Module["_mono_jiterp_try_newarr"] = (a0, a1, a2) => (_mono_jiterp_try_newarr = Module["_mono_jiterp_try_newarr"] = wasmExports["mono_jiterp_try_newarr"])(a0, a1, a2);

var _mono_jiterp_gettype_ref = Module["_mono_jiterp_gettype_ref"] = (a0, a1) => (_mono_jiterp_gettype_ref = Module["_mono_jiterp_gettype_ref"] = wasmExports["mono_jiterp_gettype_ref"])(a0, a1);

var _mono_jiterp_has_parent_fast = Module["_mono_jiterp_has_parent_fast"] = (a0, a1) => (_mono_jiterp_has_parent_fast = Module["_mono_jiterp_has_parent_fast"] = wasmExports["mono_jiterp_has_parent_fast"])(a0, a1);

var _mono_jiterp_implements_interface = Module["_mono_jiterp_implements_interface"] = (a0, a1) => (_mono_jiterp_implements_interface = Module["_mono_jiterp_implements_interface"] = wasmExports["mono_jiterp_implements_interface"])(a0, a1);

var _mono_jiterp_is_special_interface = Module["_mono_jiterp_is_special_interface"] = a0 => (_mono_jiterp_is_special_interface = Module["_mono_jiterp_is_special_interface"] = wasmExports["mono_jiterp_is_special_interface"])(a0);

var _mono_jiterp_implements_special_interface = Module["_mono_jiterp_implements_special_interface"] = (a0, a1, a2) => (_mono_jiterp_implements_special_interface = Module["_mono_jiterp_implements_special_interface"] = wasmExports["mono_jiterp_implements_special_interface"])(a0, a1, a2);

var _mono_jiterp_cast_v2 = Module["_mono_jiterp_cast_v2"] = (a0, a1, a2, a3) => (_mono_jiterp_cast_v2 = Module["_mono_jiterp_cast_v2"] = wasmExports["mono_jiterp_cast_v2"])(a0, a1, a2, a3);

var _mono_jiterp_localloc = Module["_mono_jiterp_localloc"] = (a0, a1, a2) => (_mono_jiterp_localloc = Module["_mono_jiterp_localloc"] = wasmExports["mono_jiterp_localloc"])(a0, a1, a2);

var _mono_jiterp_ldtsflda = Module["_mono_jiterp_ldtsflda"] = (a0, a1) => (_mono_jiterp_ldtsflda = Module["_mono_jiterp_ldtsflda"] = wasmExports["mono_jiterp_ldtsflda"])(a0, a1);

var _mono_jiterp_box_ref = Module["_mono_jiterp_box_ref"] = (a0, a1, a2, a3) => (_mono_jiterp_box_ref = Module["_mono_jiterp_box_ref"] = wasmExports["mono_jiterp_box_ref"])(a0, a1, a2, a3);

var _mono_jiterp_conv = Module["_mono_jiterp_conv"] = (a0, a1, a2) => (_mono_jiterp_conv = Module["_mono_jiterp_conv"] = wasmExports["mono_jiterp_conv"])(a0, a1, a2);

var _mono_jiterp_relop_fp = Module["_mono_jiterp_relop_fp"] = (a0, a1, a2) => (_mono_jiterp_relop_fp = Module["_mono_jiterp_relop_fp"] = wasmExports["mono_jiterp_relop_fp"])(a0, a1, a2);

var _mono_jiterp_get_size_of_stackval = Module["_mono_jiterp_get_size_of_stackval"] = () => (_mono_jiterp_get_size_of_stackval = Module["_mono_jiterp_get_size_of_stackval"] = wasmExports["mono_jiterp_get_size_of_stackval"])();

var _mono_jiterp_type_get_raw_value_size = Module["_mono_jiterp_type_get_raw_value_size"] = a0 => (_mono_jiterp_type_get_raw_value_size = Module["_mono_jiterp_type_get_raw_value_size"] = wasmExports["mono_jiterp_type_get_raw_value_size"])(a0);

var _mono_jiterp_trace_bailout = Module["_mono_jiterp_trace_bailout"] = a0 => (_mono_jiterp_trace_bailout = Module["_mono_jiterp_trace_bailout"] = wasmExports["mono_jiterp_trace_bailout"])(a0);

var _mono_jiterp_get_trace_bailout_count = Module["_mono_jiterp_get_trace_bailout_count"] = a0 => (_mono_jiterp_get_trace_bailout_count = Module["_mono_jiterp_get_trace_bailout_count"] = wasmExports["mono_jiterp_get_trace_bailout_count"])(a0);

var _mono_jiterp_adjust_abort_count = Module["_mono_jiterp_adjust_abort_count"] = (a0, a1) => (_mono_jiterp_adjust_abort_count = Module["_mono_jiterp_adjust_abort_count"] = wasmExports["mono_jiterp_adjust_abort_count"])(a0, a1);

var _mono_jiterp_interp_entry_prologue = Module["_mono_jiterp_interp_entry_prologue"] = (a0, a1) => (_mono_jiterp_interp_entry_prologue = Module["_mono_jiterp_interp_entry_prologue"] = wasmExports["mono_jiterp_interp_entry_prologue"])(a0, a1);

var _mono_jiterp_get_opcode_value_table_entry = Module["_mono_jiterp_get_opcode_value_table_entry"] = a0 => (_mono_jiterp_get_opcode_value_table_entry = Module["_mono_jiterp_get_opcode_value_table_entry"] = wasmExports["mono_jiterp_get_opcode_value_table_entry"])(a0);

var _mono_jiterp_get_trace_hit_count = Module["_mono_jiterp_get_trace_hit_count"] = a0 => (_mono_jiterp_get_trace_hit_count = Module["_mono_jiterp_get_trace_hit_count"] = wasmExports["mono_jiterp_get_trace_hit_count"])(a0);

var _mono_jiterp_parse_option = Module["_mono_jiterp_parse_option"] = a0 => (_mono_jiterp_parse_option = Module["_mono_jiterp_parse_option"] = wasmExports["mono_jiterp_parse_option"])(a0);

var _mono_jiterp_get_options_version = Module["_mono_jiterp_get_options_version"] = () => (_mono_jiterp_get_options_version = Module["_mono_jiterp_get_options_version"] = wasmExports["mono_jiterp_get_options_version"])();

var _mono_jiterp_get_options_as_json = Module["_mono_jiterp_get_options_as_json"] = () => (_mono_jiterp_get_options_as_json = Module["_mono_jiterp_get_options_as_json"] = wasmExports["mono_jiterp_get_options_as_json"])();

var _mono_jiterp_get_option_as_int = Module["_mono_jiterp_get_option_as_int"] = a0 => (_mono_jiterp_get_option_as_int = Module["_mono_jiterp_get_option_as_int"] = wasmExports["mono_jiterp_get_option_as_int"])(a0);

var _mono_jiterp_object_has_component_size = Module["_mono_jiterp_object_has_component_size"] = a0 => (_mono_jiterp_object_has_component_size = Module["_mono_jiterp_object_has_component_size"] = wasmExports["mono_jiterp_object_has_component_size"])(a0);

var _mono_jiterp_get_hashcode = Module["_mono_jiterp_get_hashcode"] = a0 => (_mono_jiterp_get_hashcode = Module["_mono_jiterp_get_hashcode"] = wasmExports["mono_jiterp_get_hashcode"])(a0);

var _mono_jiterp_try_get_hashcode = Module["_mono_jiterp_try_get_hashcode"] = a0 => (_mono_jiterp_try_get_hashcode = Module["_mono_jiterp_try_get_hashcode"] = wasmExports["mono_jiterp_try_get_hashcode"])(a0);

var _mono_jiterp_get_signature_has_this = Module["_mono_jiterp_get_signature_has_this"] = a0 => (_mono_jiterp_get_signature_has_this = Module["_mono_jiterp_get_signature_has_this"] = wasmExports["mono_jiterp_get_signature_has_this"])(a0);

var _mono_jiterp_get_signature_return_type = Module["_mono_jiterp_get_signature_return_type"] = a0 => (_mono_jiterp_get_signature_return_type = Module["_mono_jiterp_get_signature_return_type"] = wasmExports["mono_jiterp_get_signature_return_type"])(a0);

var _mono_jiterp_get_signature_param_count = Module["_mono_jiterp_get_signature_param_count"] = a0 => (_mono_jiterp_get_signature_param_count = Module["_mono_jiterp_get_signature_param_count"] = wasmExports["mono_jiterp_get_signature_param_count"])(a0);

var _mono_jiterp_get_signature_params = Module["_mono_jiterp_get_signature_params"] = a0 => (_mono_jiterp_get_signature_params = Module["_mono_jiterp_get_signature_params"] = wasmExports["mono_jiterp_get_signature_params"])(a0);

var _mono_jiterp_type_to_ldind = Module["_mono_jiterp_type_to_ldind"] = a0 => (_mono_jiterp_type_to_ldind = Module["_mono_jiterp_type_to_ldind"] = wasmExports["mono_jiterp_type_to_ldind"])(a0);

var _mono_jiterp_type_to_stind = Module["_mono_jiterp_type_to_stind"] = a0 => (_mono_jiterp_type_to_stind = Module["_mono_jiterp_type_to_stind"] = wasmExports["mono_jiterp_type_to_stind"])(a0);

var _mono_jiterp_get_array_rank = Module["_mono_jiterp_get_array_rank"] = (a0, a1) => (_mono_jiterp_get_array_rank = Module["_mono_jiterp_get_array_rank"] = wasmExports["mono_jiterp_get_array_rank"])(a0, a1);

var _mono_jiterp_get_array_element_size = Module["_mono_jiterp_get_array_element_size"] = (a0, a1) => (_mono_jiterp_get_array_element_size = Module["_mono_jiterp_get_array_element_size"] = wasmExports["mono_jiterp_get_array_element_size"])(a0, a1);

var _mono_jiterp_set_object_field = Module["_mono_jiterp_set_object_field"] = (a0, a1, a2, a3) => (_mono_jiterp_set_object_field = Module["_mono_jiterp_set_object_field"] = wasmExports["mono_jiterp_set_object_field"])(a0, a1, a2, a3);

var _mono_jiterp_debug_count = Module["_mono_jiterp_debug_count"] = () => (_mono_jiterp_debug_count = Module["_mono_jiterp_debug_count"] = wasmExports["mono_jiterp_debug_count"])();

var _mono_jiterp_stelem_ref = Module["_mono_jiterp_stelem_ref"] = (a0, a1, a2) => (_mono_jiterp_stelem_ref = Module["_mono_jiterp_stelem_ref"] = wasmExports["mono_jiterp_stelem_ref"])(a0, a1, a2);

var _mono_jiterp_get_member_offset = Module["_mono_jiterp_get_member_offset"] = a0 => (_mono_jiterp_get_member_offset = Module["_mono_jiterp_get_member_offset"] = wasmExports["mono_jiterp_get_member_offset"])(a0);

var _mono_jiterp_get_counter = Module["_mono_jiterp_get_counter"] = a0 => (_mono_jiterp_get_counter = Module["_mono_jiterp_get_counter"] = wasmExports["mono_jiterp_get_counter"])(a0);

var _mono_jiterp_modify_counter = Module["_mono_jiterp_modify_counter"] = (a0, a1) => (_mono_jiterp_modify_counter = Module["_mono_jiterp_modify_counter"] = wasmExports["mono_jiterp_modify_counter"])(a0, a1);

var _mono_jiterp_write_number_unaligned = Module["_mono_jiterp_write_number_unaligned"] = (a0, a1, a2) => (_mono_jiterp_write_number_unaligned = Module["_mono_jiterp_write_number_unaligned"] = wasmExports["mono_jiterp_write_number_unaligned"])(a0, a1, a2);

var _mono_jiterp_get_rejected_trace_count = Module["_mono_jiterp_get_rejected_trace_count"] = () => (_mono_jiterp_get_rejected_trace_count = Module["_mono_jiterp_get_rejected_trace_count"] = wasmExports["mono_jiterp_get_rejected_trace_count"])();

var _mono_jiterp_boost_back_branch_target = Module["_mono_jiterp_boost_back_branch_target"] = a0 => (_mono_jiterp_boost_back_branch_target = Module["_mono_jiterp_boost_back_branch_target"] = wasmExports["mono_jiterp_boost_back_branch_target"])(a0);

var _mono_jiterp_is_imethod_var_address_taken = Module["_mono_jiterp_is_imethod_var_address_taken"] = (a0, a1) => (_mono_jiterp_is_imethod_var_address_taken = Module["_mono_jiterp_is_imethod_var_address_taken"] = wasmExports["mono_jiterp_is_imethod_var_address_taken"])(a0, a1);

var _mono_jiterp_initialize_table = Module["_mono_jiterp_initialize_table"] = (a0, a1, a2) => (_mono_jiterp_initialize_table = Module["_mono_jiterp_initialize_table"] = wasmExports["mono_jiterp_initialize_table"])(a0, a1, a2);

var _mono_jiterp_allocate_table_entry = Module["_mono_jiterp_allocate_table_entry"] = a0 => (_mono_jiterp_allocate_table_entry = Module["_mono_jiterp_allocate_table_entry"] = wasmExports["mono_jiterp_allocate_table_entry"])(a0);

var _mono_jiterp_tlqueue_next = Module["_mono_jiterp_tlqueue_next"] = a0 => (_mono_jiterp_tlqueue_next = Module["_mono_jiterp_tlqueue_next"] = wasmExports["mono_jiterp_tlqueue_next"])(a0);

var _mono_jiterp_tlqueue_add = Module["_mono_jiterp_tlqueue_add"] = (a0, a1) => (_mono_jiterp_tlqueue_add = Module["_mono_jiterp_tlqueue_add"] = wasmExports["mono_jiterp_tlqueue_add"])(a0, a1);

var _mono_jiterp_tlqueue_clear = Module["_mono_jiterp_tlqueue_clear"] = a0 => (_mono_jiterp_tlqueue_clear = Module["_mono_jiterp_tlqueue_clear"] = wasmExports["mono_jiterp_tlqueue_clear"])(a0);

var _mono_interp_pgo_load_table = Module["_mono_interp_pgo_load_table"] = (a0, a1) => (_mono_interp_pgo_load_table = Module["_mono_interp_pgo_load_table"] = wasmExports["mono_interp_pgo_load_table"])(a0, a1);

var _mono_interp_pgo_save_table = Module["_mono_interp_pgo_save_table"] = (a0, a1) => (_mono_interp_pgo_save_table = Module["_mono_interp_pgo_save_table"] = wasmExports["mono_interp_pgo_save_table"])(a0, a1);

var _mono_llvm_cpp_catch_exception = Module["_mono_llvm_cpp_catch_exception"] = (a0, a1, a2) => (_mono_llvm_cpp_catch_exception = Module["_mono_llvm_cpp_catch_exception"] = wasmExports["mono_llvm_cpp_catch_exception"])(a0, a1, a2);

var _mono_jiterp_begin_catch = Module["_mono_jiterp_begin_catch"] = a0 => (_mono_jiterp_begin_catch = Module["_mono_jiterp_begin_catch"] = wasmExports["mono_jiterp_begin_catch"])(a0);

var _mono_jiterp_end_catch = Module["_mono_jiterp_end_catch"] = () => (_mono_jiterp_end_catch = Module["_mono_jiterp_end_catch"] = wasmExports["mono_jiterp_end_catch"])();

var _pthread_self = Module["_pthread_self"] = () => (_pthread_self = Module["_pthread_self"] = wasmExports["pthread_self"])();

var _emscripten_main_runtime_thread_id = Module["_emscripten_main_runtime_thread_id"] = () => (_emscripten_main_runtime_thread_id = Module["_emscripten_main_runtime_thread_id"] = wasmExports["emscripten_main_runtime_thread_id"])();

var _mono_wasm_create_deputy_thread = Module["_mono_wasm_create_deputy_thread"] = () => (_mono_wasm_create_deputy_thread = Module["_mono_wasm_create_deputy_thread"] = wasmExports["mono_wasm_create_deputy_thread"])();

var _mono_wasm_create_io_thread = Module["_mono_wasm_create_io_thread"] = () => (_mono_wasm_create_io_thread = Module["_mono_wasm_create_io_thread"] = wasmExports["mono_wasm_create_io_thread"])();

var _mono_wasm_register_ui_thread = Module["_mono_wasm_register_ui_thread"] = () => (_mono_wasm_register_ui_thread = Module["_mono_wasm_register_ui_thread"] = wasmExports["mono_wasm_register_ui_thread"])();

var _mono_wasm_register_io_thread = Module["_mono_wasm_register_io_thread"] = () => (_mono_wasm_register_io_thread = Module["_mono_wasm_register_io_thread"] = wasmExports["mono_wasm_register_io_thread"])();

var _mono_threads_wasm_sync_run_in_target_thread_done = Module["_mono_threads_wasm_sync_run_in_target_thread_done"] = a0 => (_mono_threads_wasm_sync_run_in_target_thread_done = Module["_mono_threads_wasm_sync_run_in_target_thread_done"] = wasmExports["mono_threads_wasm_sync_run_in_target_thread_done"])(a0);

var _mono_wasm_gc_lock = Module["_mono_wasm_gc_lock"] = () => (_mono_wasm_gc_lock = Module["_mono_wasm_gc_lock"] = wasmExports["mono_wasm_gc_lock"])();

var _mono_wasm_gc_unlock = Module["_mono_wasm_gc_unlock"] = () => (_mono_wasm_gc_unlock = Module["_mono_wasm_gc_unlock"] = wasmExports["mono_wasm_gc_unlock"])();

var _mono_print_method_from_ip = Module["_mono_print_method_from_ip"] = a0 => (_mono_print_method_from_ip = Module["_mono_print_method_from_ip"] = wasmExports["mono_print_method_from_ip"])(a0);

var _mono_wasm_load_icu_data = Module["_mono_wasm_load_icu_data"] = a0 => (_mono_wasm_load_icu_data = Module["_mono_wasm_load_icu_data"] = wasmExports["mono_wasm_load_icu_data"])(a0);

var __emscripten_tls_init = Module["__emscripten_tls_init"] = () => (__emscripten_tls_init = Module["__emscripten_tls_init"] = wasmExports["_emscripten_tls_init"])();

var _emscripten_builtin_memalign = (a0, a1) => (_emscripten_builtin_memalign = wasmExports["emscripten_builtin_memalign"])(a0, a1);

var _emscripten_webgl_get_current_context = () => (_emscripten_webgl_get_current_context = wasmExports["emscripten_webgl_get_current_context"])();

var __emscripten_run_callback_on_thread = (a0, a1, a2, a3, a4) => (__emscripten_run_callback_on_thread = wasmExports["_emscripten_run_callback_on_thread"])(a0, a1, a2, a3, a4);

var ___funcs_on_exit = () => (___funcs_on_exit = wasmExports["__funcs_on_exit"])();

var __emscripten_thread_init = Module["__emscripten_thread_init"] = (a0, a1, a2, a3, a4, a5) => (__emscripten_thread_init = Module["__emscripten_thread_init"] = wasmExports["_emscripten_thread_init"])(a0, a1, a2, a3, a4, a5);

var __emscripten_thread_crashed = Module["__emscripten_thread_crashed"] = () => (__emscripten_thread_crashed = Module["__emscripten_thread_crashed"] = wasmExports["_emscripten_thread_crashed"])();

var _emscripten_main_thread_process_queued_calls = () => (_emscripten_main_thread_process_queued_calls = wasmExports["emscripten_main_thread_process_queued_calls"])();

var __emscripten_run_on_main_thread_js = (a0, a1, a2, a3, a4) => (__emscripten_run_on_main_thread_js = wasmExports["_emscripten_run_on_main_thread_js"])(a0, a1, a2, a3, a4);

var __emscripten_thread_free_data = a0 => (__emscripten_thread_free_data = wasmExports["_emscripten_thread_free_data"])(a0);

var __emscripten_thread_exit = Module["__emscripten_thread_exit"] = a0 => (__emscripten_thread_exit = Module["__emscripten_thread_exit"] = wasmExports["_emscripten_thread_exit"])(a0);

var _sbrk = Module["_sbrk"] = a0 => (_sbrk = Module["_sbrk"] = wasmExports["sbrk"])(a0);

var __emscripten_check_mailbox = () => (__emscripten_check_mailbox = wasmExports["_emscripten_check_mailbox"])();

var _memalign = Module["_memalign"] = (a0, a1) => (_memalign = Module["_memalign"] = wasmExports["memalign"])(a0, a1);

var ___trap = () => (___trap = wasmExports["__trap"])();

var _emscripten_stack_set_limits = (a0, a1) => (_emscripten_stack_set_limits = wasmExports["emscripten_stack_set_limits"])(a0, a1);

var stackSave = Module["stackSave"] = () => (stackSave = Module["stackSave"] = wasmExports["stackSave"])();

var stackRestore = Module["stackRestore"] = a0 => (stackRestore = Module["stackRestore"] = wasmExports["stackRestore"])(a0);

var stackAlloc = Module["stackAlloc"] = a0 => (stackAlloc = Module["stackAlloc"] = wasmExports["stackAlloc"])(a0);

Module["addRunDependency"] = addRunDependency;

Module["removeRunDependency"] = removeRunDependency;

Module["FS_createPath"] = FS.createPath;

Module["FS_createLazyFile"] = FS.createLazyFile;

Module["FS_createDevice"] = FS.createDevice;

Module["out"] = out;

Module["err"] = err;

Module["callMain"] = callMain;

Module["abort"] = abort;

Module["wasmMemory"] = wasmMemory;

Module["wasmExports"] = wasmExports;

Module["keepRuntimeAlive"] = keepRuntimeAlive;

Module["runtimeKeepalivePush"] = runtimeKeepalivePush;

Module["runtimeKeepalivePop"] = runtimeKeepalivePop;

Module["maybeExit"] = maybeExit;

Module["ccall"] = ccall;

Module["cwrap"] = cwrap;

Module["addFunction"] = addFunction;

Module["setValue"] = setValue;

Module["getValue"] = getValue;

Module["UTF8ArrayToString"] = UTF8ArrayToString;

Module["UTF8ToString"] = UTF8ToString;

Module["stringToUTF8Array"] = stringToUTF8Array;

Module["lengthBytesUTF8"] = lengthBytesUTF8;

Module["ExitStatus"] = ExitStatus;

Module["safeSetTimeout"] = safeSetTimeout;

Module["FS_createPreloadedFile"] = FS.createPreloadedFile;

Module["FS"] = FS;

Module["FS_createDataFile"] = FS.createDataFile;

Module["FS_unlink"] = FS.unlink;

Module["PThread"] = PThread;

var calledRun;

dependenciesFulfilled = function runCaller() {
 if (!calledRun) run();
 if (!calledRun) dependenciesFulfilled = runCaller;
};

function run() {
 if (runDependencies > 0) {
  return;
 }
 if (ENVIRONMENT_IS_PTHREAD) {
  readyPromiseResolve(Module);
  initRuntime();
  startWorker(Module);
  return;
 }
 preRun();
 if (runDependencies > 0) {
  return;
 }
 function doRun() {
  if (calledRun) return;
  calledRun = true;
  Module["calledRun"] = true;
  if (ABORT) return;
  initRuntime();
  readyPromiseResolve(Module);
  if (Module["onRuntimeInitialized"]) Module["onRuntimeInitialized"]();
  postRun();
 }
 if (Module["setStatus"]) {
  Module["setStatus"]("Running...");
  setTimeout(function() {
   setTimeout(function() {
    Module["setStatus"]("");
   }, 1);
   doRun();
  }, 1);
 } else {
  doRun();
 }
}

if (Module["preInit"]) {
 if (typeof Module["preInit"] == "function") Module["preInit"] = [ Module["preInit"] ];
 while (Module["preInit"].length > 0) {
  Module["preInit"].pop()();
 }
}

run();

/**************************************************************************/ addOnPostRun(function() {
 GL.getSource = (shader, count, string, length) => {
  let source = "";
  for (let i = 0; i < count; ++i) {
   const ptr = GROWABLE_HEAP_U32()[(string + i * 4) >> 2];
   const len = length ? GROWABLE_HEAP_U32()[(length + i * 4) >> 2] : undefined;
   if (len) {
    const endPtr = ptr + len;
    const slice = GROWABLE_HEAP_U8().buffer instanceof ArrayBuffer ? GROWABLE_HEAP_U8().subarray(ptr, endPtr) : GROWABLE_HEAP_U8().slice(ptr, endPtr);
    source += UTF8Decoder.decode(slice);
   } else {
    source += UTF8ToString(ptr, len);
   }
  }
  return source;
 };
});


  return moduleArg.ready
}
);
})();
export default createDotnetRuntime;
var fetch = fetch || undefined; var require = require || undefined; var __dirname = __dirname || ''; var _nativeModuleLoaded = false;
