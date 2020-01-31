import * as wasm from './warbots_bg.wasm';

const heap = new Array(32);

heap.fill(undefined);

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
function __wbg_adapter_18(arg0, arg1, arg2) {
    wasm._dyn_core__ops__function__FnMut__A____Output___R_as_wasm_bindgen__closure__WasmClosure___describe__invoke__haaf94a5dba405506(arg0, arg1, arg2);
}

function __wbg_adapter_21(arg0, arg1, arg2) {
    wasm._dyn_core__ops__function__FnMut__A____Output___R_as_wasm_bindgen__closure__WasmClosure___describe__invoke__h072b7017afb2afcd(arg0, arg1, addHeapObject(arg2));
}

/**
*/
export function start() {
    wasm.start();
}

function _assertClass(instance, klass) {
    if (!(instance instanceof klass)) {
        throw new Error(`expected instance of ${klass.name}`);
    }
    return instance.ptr;
}

function isLikeNone(x) {
    return x === undefined || x === null;
}

function handleError(e) {
    wasm.__wbindgen_exn_store(addHeapObject(e));
}

function getArrayU8FromWasm0(ptr, len) {
    return getUint8Memory0().subarray(ptr / 1, ptr / 1 + len);
}
/**
*/
export class Config {

    static __wrap(ptr) {
        const obj = Object.create(Config.prototype);
        obj.ptr = ptr;

        return obj;
    }

    free() {
        const ptr = this.ptr;
        this.ptr = 0;

        wasm.__wbg_config_free(ptr);
    }
    /**
    * @returns {Config}
    */
    static new() {
        var ret = wasm.config_new();
        return Config.__wrap(ret);
    }
    /**
    * @returns {number}
    */
    height() {
        var ret = wasm.config_height(this.ptr);
        return ret;
    }
    /**
    * @returns {number}
    */
    width() {
        var ret = wasm.config_width(this.ptr);
        return ret;
    }
    /**
    * @returns {number}
    */
    tank_width() {
        var ret = wasm.config_tank_width(this.ptr);
        return ret;
    }
    /**
    * @returns {number}
    */
    tank_height() {
        var ret = wasm.config_tank_height(this.ptr);
        return ret;
    }
    /**
    * @returns {number}
    */
    tank_left_pos() {
        var ret = wasm.config_tank_left_pos(this.ptr);
        return ret;
    }
    /**
    * @returns {number}
    */
    tank_right_pos() {
        var ret = wasm.config_tank_right_pos(this.ptr);
        return ret;
    }
    /**
    * @returns {number}
    */
    max_power() {
        var ret = wasm.config_max_power(this.ptr);
        return ret;
    }
    /**
    * @returns {number}
    */
    min_power() {
        var ret = wasm.config_min_power(this.ptr);
        return ret;
    }
    /**
    * @returns {number}
    */
    max_angle() {
        var ret = wasm.config_max_angle(this.ptr);
        return ret;
    }
    /**
    * @returns {number}
    */
    min_angle() {
        var ret = wasm.config_min_angle(this.ptr);
        return ret;
    }
}
/**
*/
export class Point {

    static __wrap(ptr) {
        const obj = Object.create(Point.prototype);
        obj.ptr = ptr;

        return obj;
    }

    free() {
        const ptr = this.ptr;
        this.ptr = 0;

        wasm.__wbg_point_free(ptr);
    }
    /**
    * @param {number} x
    * @param {number} y
    * @returns {Point}
    */
    static new(x, y) {
        var ret = wasm.point_new(x, y);
        return Point.__wrap(ret);
    }
    /**
    * @returns {number}
    */
    x() {
        var ret = wasm.point_x(this.ptr);
        return ret;
    }
    /**
    * @returns {number}
    */
    y() {
        var ret = wasm.point_y(this.ptr);
        return ret;
    }
}
/**
*/
export class Projectile {

    static __wrap(ptr) {
        const obj = Object.create(Projectile.prototype);
        obj.ptr = ptr;

        return obj;
    }

    free() {
        const ptr = this.ptr;
        this.ptr = 0;

        wasm.__wbg_projectile_free(ptr);
    }
    /**
    * @returns {Projectile}
    */
    static new() {
        var ret = wasm.projectile_new();
        return Projectile.__wrap(ret);
    }
    /**
    * @returns {Point}
    */
    point() {
        var ret = wasm.projectile_point(this.ptr);
        return Point.__wrap(ret);
    }
    /**
    * @returns {string}
    */
    color_hex() {
        try {
            wasm.projectile_color_hex(8, this.ptr);
            var r0 = getInt32Memory0()[8 / 4 + 0];
            var r1 = getInt32Memory0()[8 / 4 + 1];
            return getStringFromWasm0(r0, r1);
        } finally {
            wasm.__wbindgen_free(r0, r1);
        }
    }
    /**
    * @param {number} power
    * @param {number} angle
    */
    fire(power, angle) {
        wasm.projectile_fire(this.ptr, power, angle);
    }
}
/**
*/
export class Tank {

    static __wrap(ptr) {
        const obj = Object.create(Tank.prototype);
        obj.ptr = ptr;

        return obj;
    }

    free() {
        const ptr = this.ptr;
        this.ptr = 0;

        wasm.__wbg_tank_free(ptr);
    }
    /**
    * @param {Point} point
    * @returns {Tank}
    */
    static new(point) {
        _assertClass(point, Point);
        var ptr0 = point.ptr;
        point.ptr = 0;
        var ret = wasm.tank_new(ptr0);
        return Tank.__wrap(ret);
    }
    /**
    */
    draw() {
        wasm.tank_draw(this.ptr);
    }
}
/**
*/
export class Terrain {

    free() {
        const ptr = this.ptr;
        this.ptr = 0;

        wasm.__wbg_terrain_free(ptr);
    }
}
/**
*/
export class Turn {

    static __wrap(ptr) {
        const obj = Object.create(Turn.prototype);
        obj.ptr = ptr;

        return obj;
    }

    free() {
        const ptr = this.ptr;
        this.ptr = 0;

        wasm.__wbg_turn_free(ptr);
    }
    /**
    * @returns {Turn}
    */
    static new() {
        var ret = wasm.turn_new();
        return Turn.__wrap(ret);
    }
    /**
    */
    take() {
        wasm.turn_take(this.ptr);
    }
    /**
    */
    end() {
        wasm.turn_end(this.ptr);
    }
}

export const __wbindgen_object_drop_ref = function(arg0) {
    takeObject(arg0);
};

export const __wbindgen_string_new = function(arg0, arg1) {
    var ret = getStringFromWasm0(arg0, arg1);
    return addHeapObject(ret);
};

export const __wbg_log_88e27b1e444831b7 = function(arg0, arg1) {
    console.log(getStringFromWasm0(arg0, arg1));
};

export const __wbindgen_cb_forget = function(arg0) {
    takeObject(arg0);
};

export const __wbindgen_cb_drop = function(arg0) {
    const obj = takeObject(arg0).original;
    if (obj.cnt-- == 1) {
        obj.a = 0;
        return true;
    }
    var ret = false;
    return ret;
};

export const __widl_instanceof_Window = function(arg0) {
    var ret = getObject(arg0) instanceof Window;
    return ret;
};

export const __widl_instanceof_CanvasRenderingContext2D = function(arg0) {
    var ret = getObject(arg0) instanceof CanvasRenderingContext2D;
    return ret;
};

export const __widl_f_begin_path_CanvasRenderingContext2D = function(arg0) {
    getObject(arg0).beginPath();
};

export const __widl_f_stroke_CanvasRenderingContext2D = function(arg0) {
    getObject(arg0).stroke();
};

export const __widl_f_set_stroke_style_CanvasRenderingContext2D = function(arg0, arg1) {
    getObject(arg0).strokeStyle = getObject(arg1);
};

export const __widl_f_set_fill_style_CanvasRenderingContext2D = function(arg0, arg1) {
    getObject(arg0).fillStyle = getObject(arg1);
};

export const __widl_f_line_to_CanvasRenderingContext2D = function(arg0, arg1, arg2) {
    getObject(arg0).lineTo(arg1, arg2);
};

export const __widl_f_move_to_CanvasRenderingContext2D = function(arg0, arg1, arg2) {
    getObject(arg0).moveTo(arg1, arg2);
};

export const __widl_f_fill_rect_CanvasRenderingContext2D = function(arg0, arg1, arg2, arg3, arg4) {
    getObject(arg0).fillRect(arg1, arg2, arg3, arg4);
};

export const __widl_f_get_element_by_id_Document = function(arg0, arg1, arg2) {
    var ret = getObject(arg0).getElementById(getStringFromWasm0(arg1, arg2));
    return isLikeNone(ret) ? 0 : addHeapObject(ret);
};

export const __widl_instanceof_HTMLCanvasElement = function(arg0) {
    var ret = getObject(arg0) instanceof HTMLCanvasElement;
    return ret;
};

export const __widl_f_get_context_HTMLCanvasElement = function(arg0, arg1, arg2) {
    try {
        var ret = getObject(arg0).getContext(getStringFromWasm0(arg1, arg2));
        return isLikeNone(ret) ? 0 : addHeapObject(ret);
    } catch (e) {
        handleError(e)
    }
};

export const __widl_f_key_code_KeyboardEvent = function(arg0) {
    var ret = getObject(arg0).keyCode;
    return ret;
};

export const __widl_f_request_animation_frame_Window = function(arg0, arg1) {
    try {
        var ret = getObject(arg0).requestAnimationFrame(getObject(arg1));
        return ret;
    } catch (e) {
        handleError(e)
    }
};

export const __widl_f_document_Window = function(arg0) {
    var ret = getObject(arg0).document;
    return isLikeNone(ret) ? 0 : addHeapObject(ret);
};

export const __widl_f_set_onkeyup_Window = function(arg0, arg1) {
    getObject(arg0).onkeyup = getObject(arg1);
};

export const __wbg_newnoargs_c4b2cbbd30e2d057 = function(arg0, arg1) {
    var ret = new Function(getStringFromWasm0(arg0, arg1));
    return addHeapObject(ret);
};

export const __wbg_call_12b949cfc461d154 = function(arg0, arg1) {
    try {
        var ret = getObject(arg0).call(getObject(arg1));
        return addHeapObject(ret);
    } catch (e) {
        handleError(e)
    }
};

export const __wbg_globalThis_22e06d4bea0084e3 = function() {
    try {
        var ret = globalThis.globalThis;
        return addHeapObject(ret);
    } catch (e) {
        handleError(e)
    }
};

export const __wbg_self_00b0599bca667294 = function() {
    try {
        var ret = self.self;
        return addHeapObject(ret);
    } catch (e) {
        handleError(e)
    }
};

export const __wbg_window_aa795c5aad79b8ac = function() {
    try {
        var ret = window.window;
        return addHeapObject(ret);
    } catch (e) {
        handleError(e)
    }
};

export const __wbg_global_cc239dc2303f417c = function() {
    try {
        var ret = global.global;
        return addHeapObject(ret);
    } catch (e) {
        handleError(e)
    }
};

export const __wbindgen_is_undefined = function(arg0) {
    var ret = getObject(arg0) === undefined;
    return ret;
};

export const __wbindgen_object_clone_ref = function(arg0) {
    var ret = getObject(arg0);
    return addHeapObject(ret);
};

export const __wbg_randomFillSync_d5bd2d655fdf256a = function(arg0, arg1, arg2) {
    getObject(arg0).randomFillSync(getArrayU8FromWasm0(arg1, arg2));
};

export const __wbg_getRandomValues_f5e14ab7ac8e995d = function(arg0, arg1, arg2) {
    getObject(arg0).getRandomValues(getArrayU8FromWasm0(arg1, arg2));
};

export const __wbg_self_1b7a39e3a92c949c = function() {
    try {
        var ret = self.self;
        return addHeapObject(ret);
    } catch (e) {
        handleError(e)
    }
};

export const __wbg_require_604837428532a733 = function(arg0, arg1) {
    var ret = require(getStringFromWasm0(arg0, arg1));
    return addHeapObject(ret);
};

export const __wbg_crypto_968f1772287e2df0 = function(arg0) {
    var ret = getObject(arg0).crypto;
    return addHeapObject(ret);
};

export const __wbg_getRandomValues_a3d34b4fee3c2869 = function(arg0) {
    var ret = getObject(arg0).getRandomValues;
    return addHeapObject(ret);
};

export const __wbindgen_debug_string = function(arg0, arg1) {
    var ret = debugString(getObject(arg1));
    var ptr0 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
    var len0 = WASM_VECTOR_LEN;
    getInt32Memory0()[arg0 / 4 + 1] = len0;
    getInt32Memory0()[arg0 / 4 + 0] = ptr0;
};

export const __wbindgen_throw = function(arg0, arg1) {
    throw new Error(getStringFromWasm0(arg0, arg1));
};

export const __wbindgen_closure_wrapper207 = function(arg0, arg1, arg2) {

    const state = { a: arg0, b: arg1, cnt: 1 };
    const real = (arg0) => {
        state.cnt++;
        const a = state.a;
        state.a = 0;
        try {
            return __wbg_adapter_18(a, state.b, arg0);
        } finally {
            if (--state.cnt === 0) wasm.__wbindgen_export_2.get(30)(a, state.b);
            else state.a = a;
        }
    }
    ;
    real.original = state;
    var ret = real;
    return addHeapObject(ret);
};

export const __wbindgen_closure_wrapper209 = function(arg0, arg1, arg2) {

    const state = { a: arg0, b: arg1, cnt: 1 };
    const real = (arg0) => {
        state.cnt++;
        const a = state.a;
        state.a = 0;
        try {
            return __wbg_adapter_21(a, state.b, arg0);
        } finally {
            if (--state.cnt === 0) wasm.__wbindgen_export_2.get(32)(a, state.b);
            else state.a = a;
        }
    }
    ;
    real.original = state;
    var ret = real;
    return addHeapObject(ret);
};

