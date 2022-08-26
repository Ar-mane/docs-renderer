import React, { createContext, PureComponent, createRef, useState, useImperativeHandle, Component, useContext, useRef, useEffect } from "react";
import styled from "styled-components";
const global$1 = typeof global < "u" ? global : typeof self < "u" ? self : typeof window < "u" ? window : {};
var lookup = [], revLookup = [], Arr = typeof Uint8Array < "u" ? Uint8Array : Array, inited = !1;
function init() {
  inited = !0;
  for (var n = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/", r = 0, e = n.length; r < e; ++r)
    lookup[r] = n[r], revLookup[n.charCodeAt(r)] = r;
  revLookup["-".charCodeAt(0)] = 62, revLookup["_".charCodeAt(0)] = 63;
}
function toByteArray(n) {
  inited || init();
  var r, e, t, a, i, s, u = n.length;
  if (u % 4 > 0)
    throw new Error("Invalid string. Length must be a multiple of 4");
  i = n[u - 2] === "=" ? 2 : n[u - 1] === "=" ? 1 : 0, s = new Arr(u * 3 / 4 - i), t = i > 0 ? u - 4 : u;
  var c = 0;
  for (r = 0, e = 0; r < t; r += 4, e += 3)
    a = revLookup[n.charCodeAt(r)] << 18 | revLookup[n.charCodeAt(r + 1)] << 12 | revLookup[n.charCodeAt(r + 2)] << 6 | revLookup[n.charCodeAt(r + 3)], s[c++] = a >> 16 & 255, s[c++] = a >> 8 & 255, s[c++] = a & 255;
  return i === 2 ? (a = revLookup[n.charCodeAt(r)] << 2 | revLookup[n.charCodeAt(r + 1)] >> 4, s[c++] = a & 255) : i === 1 && (a = revLookup[n.charCodeAt(r)] << 10 | revLookup[n.charCodeAt(r + 1)] << 4 | revLookup[n.charCodeAt(r + 2)] >> 2, s[c++] = a >> 8 & 255, s[c++] = a & 255), s;
}
function tripletToBase64(n) {
  return lookup[n >> 18 & 63] + lookup[n >> 12 & 63] + lookup[n >> 6 & 63] + lookup[n & 63];
}
function encodeChunk(n, r, e) {
  for (var t, a = [], i = r; i < e; i += 3)
    t = (n[i] << 16) + (n[i + 1] << 8) + n[i + 2], a.push(tripletToBase64(t));
  return a.join("");
}
function fromByteArray(n) {
  inited || init();
  for (var r, e = n.length, t = e % 3, a = "", i = [], s = 16383, u = 0, c = e - t; u < c; u += s)
    i.push(encodeChunk(n, u, u + s > c ? c : u + s));
  return t === 1 ? (r = n[e - 1], a += lookup[r >> 2], a += lookup[r << 4 & 63], a += "==") : t === 2 && (r = (n[e - 2] << 8) + n[e - 1], a += lookup[r >> 10], a += lookup[r >> 4 & 63], a += lookup[r << 2 & 63], a += "="), i.push(a), i.join("");
}
function read(n, r, e, t, a) {
  var i, s, u = a * 8 - t - 1, c = (1 << u) - 1, g = c >> 1, b = -7, A = e ? a - 1 : 0, I = e ? -1 : 1, C = n[r + A];
  for (A += I, i = C & (1 << -b) - 1, C >>= -b, b += u; b > 0; i = i * 256 + n[r + A], A += I, b -= 8)
    ;
  for (s = i & (1 << -b) - 1, i >>= -b, b += t; b > 0; s = s * 256 + n[r + A], A += I, b -= 8)
    ;
  if (i === 0)
    i = 1 - g;
  else {
    if (i === c)
      return s ? NaN : (C ? -1 : 1) * (1 / 0);
    s = s + Math.pow(2, t), i = i - g;
  }
  return (C ? -1 : 1) * s * Math.pow(2, i - t);
}
function write(n, r, e, t, a, i) {
  var s, u, c, g = i * 8 - a - 1, b = (1 << g) - 1, A = b >> 1, I = a === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0, C = t ? 0 : i - 1, E = t ? 1 : -1, O = r < 0 || r === 0 && 1 / r < 0 ? 1 : 0;
  for (r = Math.abs(r), isNaN(r) || r === 1 / 0 ? (u = isNaN(r) ? 1 : 0, s = b) : (s = Math.floor(Math.log(r) / Math.LN2), r * (c = Math.pow(2, -s)) < 1 && (s--, c *= 2), s + A >= 1 ? r += I / c : r += I * Math.pow(2, 1 - A), r * c >= 2 && (s++, c /= 2), s + A >= b ? (u = 0, s = b) : s + A >= 1 ? (u = (r * c - 1) * Math.pow(2, a), s = s + A) : (u = r * Math.pow(2, A - 1) * Math.pow(2, a), s = 0)); a >= 8; n[e + C] = u & 255, C += E, u /= 256, a -= 8)
    ;
  for (s = s << a | u, g += a; g > 0; n[e + C] = s & 255, C += E, s /= 256, g -= 8)
    ;
  n[e + C - E] |= O * 128;
}
var toString = {}.toString, isArray = Array.isArray || function(n) {
  return toString.call(n) == "[object Array]";
};
/*!
 * The buffer module from node.js, for the browser.
 *
 * @author   Feross Aboukhadijeh <feross@feross.org> <http://feross.org>
 * @license  MIT
 */
var INSPECT_MAX_BYTES = 50;
Buffer.TYPED_ARRAY_SUPPORT = global$1.TYPED_ARRAY_SUPPORT !== void 0 ? global$1.TYPED_ARRAY_SUPPORT : !0;
kMaxLength();
function kMaxLength() {
  return Buffer.TYPED_ARRAY_SUPPORT ? 2147483647 : 1073741823;
}
function createBuffer(n, r) {
  if (kMaxLength() < r)
    throw new RangeError("Invalid typed array length");
  return Buffer.TYPED_ARRAY_SUPPORT ? (n = new Uint8Array(r), n.__proto__ = Buffer.prototype) : (n === null && (n = new Buffer(r)), n.length = r), n;
}
function Buffer(n, r, e) {
  if (!Buffer.TYPED_ARRAY_SUPPORT && !(this instanceof Buffer))
    return new Buffer(n, r, e);
  if (typeof n == "number") {
    if (typeof r == "string")
      throw new Error(
        "If encoding is specified then the first argument must be a string"
      );
    return allocUnsafe(this, n);
  }
  return from(this, n, r, e);
}
Buffer.poolSize = 8192;
Buffer._augment = function(n) {
  return n.__proto__ = Buffer.prototype, n;
};
function from(n, r, e, t) {
  if (typeof r == "number")
    throw new TypeError('"value" argument must not be a number');
  return typeof ArrayBuffer < "u" && r instanceof ArrayBuffer ? fromArrayBuffer(n, r, e, t) : typeof r == "string" ? fromString(n, r, e) : fromObject(n, r);
}
Buffer.from = function(n, r, e) {
  return from(null, n, r, e);
};
Buffer.TYPED_ARRAY_SUPPORT && (Buffer.prototype.__proto__ = Uint8Array.prototype, Buffer.__proto__ = Uint8Array);
function assertSize(n) {
  if (typeof n != "number")
    throw new TypeError('"size" argument must be a number');
  if (n < 0)
    throw new RangeError('"size" argument must not be negative');
}
function alloc(n, r, e, t) {
  return assertSize(r), r <= 0 ? createBuffer(n, r) : e !== void 0 ? typeof t == "string" ? createBuffer(n, r).fill(e, t) : createBuffer(n, r).fill(e) : createBuffer(n, r);
}
Buffer.alloc = function(n, r, e) {
  return alloc(null, n, r, e);
};
function allocUnsafe(n, r) {
  if (assertSize(r), n = createBuffer(n, r < 0 ? 0 : checked(r) | 0), !Buffer.TYPED_ARRAY_SUPPORT)
    for (var e = 0; e < r; ++e)
      n[e] = 0;
  return n;
}
Buffer.allocUnsafe = function(n) {
  return allocUnsafe(null, n);
};
Buffer.allocUnsafeSlow = function(n) {
  return allocUnsafe(null, n);
};
function fromString(n, r, e) {
  if ((typeof e != "string" || e === "") && (e = "utf8"), !Buffer.isEncoding(e))
    throw new TypeError('"encoding" must be a valid string encoding');
  var t = byteLength(r, e) | 0;
  n = createBuffer(n, t);
  var a = n.write(r, e);
  return a !== t && (n = n.slice(0, a)), n;
}
function fromArrayLike(n, r) {
  var e = r.length < 0 ? 0 : checked(r.length) | 0;
  n = createBuffer(n, e);
  for (var t = 0; t < e; t += 1)
    n[t] = r[t] & 255;
  return n;
}
function fromArrayBuffer(n, r, e, t) {
  if (r.byteLength, e < 0 || r.byteLength < e)
    throw new RangeError("'offset' is out of bounds");
  if (r.byteLength < e + (t || 0))
    throw new RangeError("'length' is out of bounds");
  return e === void 0 && t === void 0 ? r = new Uint8Array(r) : t === void 0 ? r = new Uint8Array(r, e) : r = new Uint8Array(r, e, t), Buffer.TYPED_ARRAY_SUPPORT ? (n = r, n.__proto__ = Buffer.prototype) : n = fromArrayLike(n, r), n;
}
function fromObject(n, r) {
  if (internalIsBuffer(r)) {
    var e = checked(r.length) | 0;
    return n = createBuffer(n, e), n.length === 0 || r.copy(n, 0, 0, e), n;
  }
  if (r) {
    if (typeof ArrayBuffer < "u" && r.buffer instanceof ArrayBuffer || "length" in r)
      return typeof r.length != "number" || isnan(r.length) ? createBuffer(n, 0) : fromArrayLike(n, r);
    if (r.type === "Buffer" && isArray(r.data))
      return fromArrayLike(n, r.data);
  }
  throw new TypeError("First argument must be a string, Buffer, ArrayBuffer, Array, or array-like object.");
}
function checked(n) {
  if (n >= kMaxLength())
    throw new RangeError("Attempt to allocate Buffer larger than maximum size: 0x" + kMaxLength().toString(16) + " bytes");
  return n | 0;
}
Buffer.isBuffer = isBuffer;
function internalIsBuffer(n) {
  return !!(n != null && n._isBuffer);
}
Buffer.compare = function(r, e) {
  if (!internalIsBuffer(r) || !internalIsBuffer(e))
    throw new TypeError("Arguments must be Buffers");
  if (r === e)
    return 0;
  for (var t = r.length, a = e.length, i = 0, s = Math.min(t, a); i < s; ++i)
    if (r[i] !== e[i]) {
      t = r[i], a = e[i];
      break;
    }
  return t < a ? -1 : a < t ? 1 : 0;
};
Buffer.isEncoding = function(r) {
  switch (String(r).toLowerCase()) {
    case "hex":
    case "utf8":
    case "utf-8":
    case "ascii":
    case "latin1":
    case "binary":
    case "base64":
    case "ucs2":
    case "ucs-2":
    case "utf16le":
    case "utf-16le":
      return !0;
    default:
      return !1;
  }
};
Buffer.concat = function(r, e) {
  if (!isArray(r))
    throw new TypeError('"list" argument must be an Array of Buffers');
  if (r.length === 0)
    return Buffer.alloc(0);
  var t;
  if (e === void 0)
    for (e = 0, t = 0; t < r.length; ++t)
      e += r[t].length;
  var a = Buffer.allocUnsafe(e), i = 0;
  for (t = 0; t < r.length; ++t) {
    var s = r[t];
    if (!internalIsBuffer(s))
      throw new TypeError('"list" argument must be an Array of Buffers');
    s.copy(a, i), i += s.length;
  }
  return a;
};
function byteLength(n, r) {
  if (internalIsBuffer(n))
    return n.length;
  if (typeof ArrayBuffer < "u" && typeof ArrayBuffer.isView == "function" && (ArrayBuffer.isView(n) || n instanceof ArrayBuffer))
    return n.byteLength;
  typeof n != "string" && (n = "" + n);
  var e = n.length;
  if (e === 0)
    return 0;
  for (var t = !1; ; )
    switch (r) {
      case "ascii":
      case "latin1":
      case "binary":
        return e;
      case "utf8":
      case "utf-8":
      case void 0:
        return utf8ToBytes(n).length;
      case "ucs2":
      case "ucs-2":
      case "utf16le":
      case "utf-16le":
        return e * 2;
      case "hex":
        return e >>> 1;
      case "base64":
        return base64ToBytes(n).length;
      default:
        if (t)
          return utf8ToBytes(n).length;
        r = ("" + r).toLowerCase(), t = !0;
    }
}
Buffer.byteLength = byteLength;
function slowToString(n, r, e) {
  var t = !1;
  if ((r === void 0 || r < 0) && (r = 0), r > this.length || ((e === void 0 || e > this.length) && (e = this.length), e <= 0) || (e >>>= 0, r >>>= 0, e <= r))
    return "";
  for (n || (n = "utf8"); ; )
    switch (n) {
      case "hex":
        return hexSlice(this, r, e);
      case "utf8":
      case "utf-8":
        return utf8Slice(this, r, e);
      case "ascii":
        return asciiSlice(this, r, e);
      case "latin1":
      case "binary":
        return latin1Slice(this, r, e);
      case "base64":
        return base64Slice(this, r, e);
      case "ucs2":
      case "ucs-2":
      case "utf16le":
      case "utf-16le":
        return utf16leSlice(this, r, e);
      default:
        if (t)
          throw new TypeError("Unknown encoding: " + n);
        n = (n + "").toLowerCase(), t = !0;
    }
}
Buffer.prototype._isBuffer = !0;
function swap(n, r, e) {
  var t = n[r];
  n[r] = n[e], n[e] = t;
}
Buffer.prototype.swap16 = function() {
  var r = this.length;
  if (r % 2 !== 0)
    throw new RangeError("Buffer size must be a multiple of 16-bits");
  for (var e = 0; e < r; e += 2)
    swap(this, e, e + 1);
  return this;
};
Buffer.prototype.swap32 = function() {
  var r = this.length;
  if (r % 4 !== 0)
    throw new RangeError("Buffer size must be a multiple of 32-bits");
  for (var e = 0; e < r; e += 4)
    swap(this, e, e + 3), swap(this, e + 1, e + 2);
  return this;
};
Buffer.prototype.swap64 = function() {
  var r = this.length;
  if (r % 8 !== 0)
    throw new RangeError("Buffer size must be a multiple of 64-bits");
  for (var e = 0; e < r; e += 8)
    swap(this, e, e + 7), swap(this, e + 1, e + 6), swap(this, e + 2, e + 5), swap(this, e + 3, e + 4);
  return this;
};
Buffer.prototype.toString = function() {
  var r = this.length | 0;
  return r === 0 ? "" : arguments.length === 0 ? utf8Slice(this, 0, r) : slowToString.apply(this, arguments);
};
Buffer.prototype.equals = function(r) {
  if (!internalIsBuffer(r))
    throw new TypeError("Argument must be a Buffer");
  return this === r ? !0 : Buffer.compare(this, r) === 0;
};
Buffer.prototype.inspect = function() {
  var r = "", e = INSPECT_MAX_BYTES;
  return this.length > 0 && (r = this.toString("hex", 0, e).match(/.{2}/g).join(" "), this.length > e && (r += " ... ")), "<Buffer " + r + ">";
};
Buffer.prototype.compare = function(r, e, t, a, i) {
  if (!internalIsBuffer(r))
    throw new TypeError("Argument must be a Buffer");
  if (e === void 0 && (e = 0), t === void 0 && (t = r ? r.length : 0), a === void 0 && (a = 0), i === void 0 && (i = this.length), e < 0 || t > r.length || a < 0 || i > this.length)
    throw new RangeError("out of range index");
  if (a >= i && e >= t)
    return 0;
  if (a >= i)
    return -1;
  if (e >= t)
    return 1;
  if (e >>>= 0, t >>>= 0, a >>>= 0, i >>>= 0, this === r)
    return 0;
  for (var s = i - a, u = t - e, c = Math.min(s, u), g = this.slice(a, i), b = r.slice(e, t), A = 0; A < c; ++A)
    if (g[A] !== b[A]) {
      s = g[A], u = b[A];
      break;
    }
  return s < u ? -1 : u < s ? 1 : 0;
};
function bidirectionalIndexOf(n, r, e, t, a) {
  if (n.length === 0)
    return -1;
  if (typeof e == "string" ? (t = e, e = 0) : e > 2147483647 ? e = 2147483647 : e < -2147483648 && (e = -2147483648), e = +e, isNaN(e) && (e = a ? 0 : n.length - 1), e < 0 && (e = n.length + e), e >= n.length) {
    if (a)
      return -1;
    e = n.length - 1;
  } else if (e < 0)
    if (a)
      e = 0;
    else
      return -1;
  if (typeof r == "string" && (r = Buffer.from(r, t)), internalIsBuffer(r))
    return r.length === 0 ? -1 : arrayIndexOf(n, r, e, t, a);
  if (typeof r == "number")
    return r = r & 255, Buffer.TYPED_ARRAY_SUPPORT && typeof Uint8Array.prototype.indexOf == "function" ? a ? Uint8Array.prototype.indexOf.call(n, r, e) : Uint8Array.prototype.lastIndexOf.call(n, r, e) : arrayIndexOf(n, [r], e, t, a);
  throw new TypeError("val must be string, number or Buffer");
}
function arrayIndexOf(n, r, e, t, a) {
  var i = 1, s = n.length, u = r.length;
  if (t !== void 0 && (t = String(t).toLowerCase(), t === "ucs2" || t === "ucs-2" || t === "utf16le" || t === "utf-16le")) {
    if (n.length < 2 || r.length < 2)
      return -1;
    i = 2, s /= 2, u /= 2, e /= 2;
  }
  function c(C, E) {
    return i === 1 ? C[E] : C.readUInt16BE(E * i);
  }
  var g;
  if (a) {
    var b = -1;
    for (g = e; g < s; g++)
      if (c(n, g) === c(r, b === -1 ? 0 : g - b)) {
        if (b === -1 && (b = g), g - b + 1 === u)
          return b * i;
      } else
        b !== -1 && (g -= g - b), b = -1;
  } else
    for (e + u > s && (e = s - u), g = e; g >= 0; g--) {
      for (var A = !0, I = 0; I < u; I++)
        if (c(n, g + I) !== c(r, I)) {
          A = !1;
          break;
        }
      if (A)
        return g;
    }
  return -1;
}
Buffer.prototype.includes = function(r, e, t) {
  return this.indexOf(r, e, t) !== -1;
};
Buffer.prototype.indexOf = function(r, e, t) {
  return bidirectionalIndexOf(this, r, e, t, !0);
};
Buffer.prototype.lastIndexOf = function(r, e, t) {
  return bidirectionalIndexOf(this, r, e, t, !1);
};
function hexWrite(n, r, e, t) {
  e = Number(e) || 0;
  var a = n.length - e;
  t ? (t = Number(t), t > a && (t = a)) : t = a;
  var i = r.length;
  if (i % 2 !== 0)
    throw new TypeError("Invalid hex string");
  t > i / 2 && (t = i / 2);
  for (var s = 0; s < t; ++s) {
    var u = parseInt(r.substr(s * 2, 2), 16);
    if (isNaN(u))
      return s;
    n[e + s] = u;
  }
  return s;
}
function utf8Write(n, r, e, t) {
  return blitBuffer(utf8ToBytes(r, n.length - e), n, e, t);
}
function asciiWrite(n, r, e, t) {
  return blitBuffer(asciiToBytes(r), n, e, t);
}
function latin1Write(n, r, e, t) {
  return asciiWrite(n, r, e, t);
}
function base64Write(n, r, e, t) {
  return blitBuffer(base64ToBytes(r), n, e, t);
}
function ucs2Write(n, r, e, t) {
  return blitBuffer(utf16leToBytes(r, n.length - e), n, e, t);
}
Buffer.prototype.write = function(r, e, t, a) {
  if (e === void 0)
    a = "utf8", t = this.length, e = 0;
  else if (t === void 0 && typeof e == "string")
    a = e, t = this.length, e = 0;
  else if (isFinite(e))
    e = e | 0, isFinite(t) ? (t = t | 0, a === void 0 && (a = "utf8")) : (a = t, t = void 0);
  else
    throw new Error(
      "Buffer.write(string, encoding, offset[, length]) is no longer supported"
    );
  var i = this.length - e;
  if ((t === void 0 || t > i) && (t = i), r.length > 0 && (t < 0 || e < 0) || e > this.length)
    throw new RangeError("Attempt to write outside buffer bounds");
  a || (a = "utf8");
  for (var s = !1; ; )
    switch (a) {
      case "hex":
        return hexWrite(this, r, e, t);
      case "utf8":
      case "utf-8":
        return utf8Write(this, r, e, t);
      case "ascii":
        return asciiWrite(this, r, e, t);
      case "latin1":
      case "binary":
        return latin1Write(this, r, e, t);
      case "base64":
        return base64Write(this, r, e, t);
      case "ucs2":
      case "ucs-2":
      case "utf16le":
      case "utf-16le":
        return ucs2Write(this, r, e, t);
      default:
        if (s)
          throw new TypeError("Unknown encoding: " + a);
        a = ("" + a).toLowerCase(), s = !0;
    }
};
Buffer.prototype.toJSON = function() {
  return {
    type: "Buffer",
    data: Array.prototype.slice.call(this._arr || this, 0)
  };
};
function base64Slice(n, r, e) {
  return r === 0 && e === n.length ? fromByteArray(n) : fromByteArray(n.slice(r, e));
}
function utf8Slice(n, r, e) {
  e = Math.min(n.length, e);
  for (var t = [], a = r; a < e; ) {
    var i = n[a], s = null, u = i > 239 ? 4 : i > 223 ? 3 : i > 191 ? 2 : 1;
    if (a + u <= e) {
      var c, g, b, A;
      switch (u) {
        case 1:
          i < 128 && (s = i);
          break;
        case 2:
          c = n[a + 1], (c & 192) === 128 && (A = (i & 31) << 6 | c & 63, A > 127 && (s = A));
          break;
        case 3:
          c = n[a + 1], g = n[a + 2], (c & 192) === 128 && (g & 192) === 128 && (A = (i & 15) << 12 | (c & 63) << 6 | g & 63, A > 2047 && (A < 55296 || A > 57343) && (s = A));
          break;
        case 4:
          c = n[a + 1], g = n[a + 2], b = n[a + 3], (c & 192) === 128 && (g & 192) === 128 && (b & 192) === 128 && (A = (i & 15) << 18 | (c & 63) << 12 | (g & 63) << 6 | b & 63, A > 65535 && A < 1114112 && (s = A));
      }
    }
    s === null ? (s = 65533, u = 1) : s > 65535 && (s -= 65536, t.push(s >>> 10 & 1023 | 55296), s = 56320 | s & 1023), t.push(s), a += u;
  }
  return decodeCodePointsArray(t);
}
var MAX_ARGUMENTS_LENGTH = 4096;
function decodeCodePointsArray(n) {
  var r = n.length;
  if (r <= MAX_ARGUMENTS_LENGTH)
    return String.fromCharCode.apply(String, n);
  for (var e = "", t = 0; t < r; )
    e += String.fromCharCode.apply(
      String,
      n.slice(t, t += MAX_ARGUMENTS_LENGTH)
    );
  return e;
}
function asciiSlice(n, r, e) {
  var t = "";
  e = Math.min(n.length, e);
  for (var a = r; a < e; ++a)
    t += String.fromCharCode(n[a] & 127);
  return t;
}
function latin1Slice(n, r, e) {
  var t = "";
  e = Math.min(n.length, e);
  for (var a = r; a < e; ++a)
    t += String.fromCharCode(n[a]);
  return t;
}
function hexSlice(n, r, e) {
  var t = n.length;
  (!r || r < 0) && (r = 0), (!e || e < 0 || e > t) && (e = t);
  for (var a = "", i = r; i < e; ++i)
    a += toHex(n[i]);
  return a;
}
function utf16leSlice(n, r, e) {
  for (var t = n.slice(r, e), a = "", i = 0; i < t.length; i += 2)
    a += String.fromCharCode(t[i] + t[i + 1] * 256);
  return a;
}
Buffer.prototype.slice = function(r, e) {
  var t = this.length;
  r = ~~r, e = e === void 0 ? t : ~~e, r < 0 ? (r += t, r < 0 && (r = 0)) : r > t && (r = t), e < 0 ? (e += t, e < 0 && (e = 0)) : e > t && (e = t), e < r && (e = r);
  var a;
  if (Buffer.TYPED_ARRAY_SUPPORT)
    a = this.subarray(r, e), a.__proto__ = Buffer.prototype;
  else {
    var i = e - r;
    a = new Buffer(i, void 0);
    for (var s = 0; s < i; ++s)
      a[s] = this[s + r];
  }
  return a;
};
function checkOffset(n, r, e) {
  if (n % 1 !== 0 || n < 0)
    throw new RangeError("offset is not uint");
  if (n + r > e)
    throw new RangeError("Trying to access beyond buffer length");
}
Buffer.prototype.readUIntLE = function(r, e, t) {
  r = r | 0, e = e | 0, t || checkOffset(r, e, this.length);
  for (var a = this[r], i = 1, s = 0; ++s < e && (i *= 256); )
    a += this[r + s] * i;
  return a;
};
Buffer.prototype.readUIntBE = function(r, e, t) {
  r = r | 0, e = e | 0, t || checkOffset(r, e, this.length);
  for (var a = this[r + --e], i = 1; e > 0 && (i *= 256); )
    a += this[r + --e] * i;
  return a;
};
Buffer.prototype.readUInt8 = function(r, e) {
  return e || checkOffset(r, 1, this.length), this[r];
};
Buffer.prototype.readUInt16LE = function(r, e) {
  return e || checkOffset(r, 2, this.length), this[r] | this[r + 1] << 8;
};
Buffer.prototype.readUInt16BE = function(r, e) {
  return e || checkOffset(r, 2, this.length), this[r] << 8 | this[r + 1];
};
Buffer.prototype.readUInt32LE = function(r, e) {
  return e || checkOffset(r, 4, this.length), (this[r] | this[r + 1] << 8 | this[r + 2] << 16) + this[r + 3] * 16777216;
};
Buffer.prototype.readUInt32BE = function(r, e) {
  return e || checkOffset(r, 4, this.length), this[r] * 16777216 + (this[r + 1] << 16 | this[r + 2] << 8 | this[r + 3]);
};
Buffer.prototype.readIntLE = function(r, e, t) {
  r = r | 0, e = e | 0, t || checkOffset(r, e, this.length);
  for (var a = this[r], i = 1, s = 0; ++s < e && (i *= 256); )
    a += this[r + s] * i;
  return i *= 128, a >= i && (a -= Math.pow(2, 8 * e)), a;
};
Buffer.prototype.readIntBE = function(r, e, t) {
  r = r | 0, e = e | 0, t || checkOffset(r, e, this.length);
  for (var a = e, i = 1, s = this[r + --a]; a > 0 && (i *= 256); )
    s += this[r + --a] * i;
  return i *= 128, s >= i && (s -= Math.pow(2, 8 * e)), s;
};
Buffer.prototype.readInt8 = function(r, e) {
  return e || checkOffset(r, 1, this.length), this[r] & 128 ? (255 - this[r] + 1) * -1 : this[r];
};
Buffer.prototype.readInt16LE = function(r, e) {
  e || checkOffset(r, 2, this.length);
  var t = this[r] | this[r + 1] << 8;
  return t & 32768 ? t | 4294901760 : t;
};
Buffer.prototype.readInt16BE = function(r, e) {
  e || checkOffset(r, 2, this.length);
  var t = this[r + 1] | this[r] << 8;
  return t & 32768 ? t | 4294901760 : t;
};
Buffer.prototype.readInt32LE = function(r, e) {
  return e || checkOffset(r, 4, this.length), this[r] | this[r + 1] << 8 | this[r + 2] << 16 | this[r + 3] << 24;
};
Buffer.prototype.readInt32BE = function(r, e) {
  return e || checkOffset(r, 4, this.length), this[r] << 24 | this[r + 1] << 16 | this[r + 2] << 8 | this[r + 3];
};
Buffer.prototype.readFloatLE = function(r, e) {
  return e || checkOffset(r, 4, this.length), read(this, r, !0, 23, 4);
};
Buffer.prototype.readFloatBE = function(r, e) {
  return e || checkOffset(r, 4, this.length), read(this, r, !1, 23, 4);
};
Buffer.prototype.readDoubleLE = function(r, e) {
  return e || checkOffset(r, 8, this.length), read(this, r, !0, 52, 8);
};
Buffer.prototype.readDoubleBE = function(r, e) {
  return e || checkOffset(r, 8, this.length), read(this, r, !1, 52, 8);
};
function checkInt(n, r, e, t, a, i) {
  if (!internalIsBuffer(n))
    throw new TypeError('"buffer" argument must be a Buffer instance');
  if (r > a || r < i)
    throw new RangeError('"value" argument is out of bounds');
  if (e + t > n.length)
    throw new RangeError("Index out of range");
}
Buffer.prototype.writeUIntLE = function(r, e, t, a) {
  if (r = +r, e = e | 0, t = t | 0, !a) {
    var i = Math.pow(2, 8 * t) - 1;
    checkInt(this, r, e, t, i, 0);
  }
  var s = 1, u = 0;
  for (this[e] = r & 255; ++u < t && (s *= 256); )
    this[e + u] = r / s & 255;
  return e + t;
};
Buffer.prototype.writeUIntBE = function(r, e, t, a) {
  if (r = +r, e = e | 0, t = t | 0, !a) {
    var i = Math.pow(2, 8 * t) - 1;
    checkInt(this, r, e, t, i, 0);
  }
  var s = t - 1, u = 1;
  for (this[e + s] = r & 255; --s >= 0 && (u *= 256); )
    this[e + s] = r / u & 255;
  return e + t;
};
Buffer.prototype.writeUInt8 = function(r, e, t) {
  return r = +r, e = e | 0, t || checkInt(this, r, e, 1, 255, 0), Buffer.TYPED_ARRAY_SUPPORT || (r = Math.floor(r)), this[e] = r & 255, e + 1;
};
function objectWriteUInt16(n, r, e, t) {
  r < 0 && (r = 65535 + r + 1);
  for (var a = 0, i = Math.min(n.length - e, 2); a < i; ++a)
    n[e + a] = (r & 255 << 8 * (t ? a : 1 - a)) >>> (t ? a : 1 - a) * 8;
}
Buffer.prototype.writeUInt16LE = function(r, e, t) {
  return r = +r, e = e | 0, t || checkInt(this, r, e, 2, 65535, 0), Buffer.TYPED_ARRAY_SUPPORT ? (this[e] = r & 255, this[e + 1] = r >>> 8) : objectWriteUInt16(this, r, e, !0), e + 2;
};
Buffer.prototype.writeUInt16BE = function(r, e, t) {
  return r = +r, e = e | 0, t || checkInt(this, r, e, 2, 65535, 0), Buffer.TYPED_ARRAY_SUPPORT ? (this[e] = r >>> 8, this[e + 1] = r & 255) : objectWriteUInt16(this, r, e, !1), e + 2;
};
function objectWriteUInt32(n, r, e, t) {
  r < 0 && (r = 4294967295 + r + 1);
  for (var a = 0, i = Math.min(n.length - e, 4); a < i; ++a)
    n[e + a] = r >>> (t ? a : 3 - a) * 8 & 255;
}
Buffer.prototype.writeUInt32LE = function(r, e, t) {
  return r = +r, e = e | 0, t || checkInt(this, r, e, 4, 4294967295, 0), Buffer.TYPED_ARRAY_SUPPORT ? (this[e + 3] = r >>> 24, this[e + 2] = r >>> 16, this[e + 1] = r >>> 8, this[e] = r & 255) : objectWriteUInt32(this, r, e, !0), e + 4;
};
Buffer.prototype.writeUInt32BE = function(r, e, t) {
  return r = +r, e = e | 0, t || checkInt(this, r, e, 4, 4294967295, 0), Buffer.TYPED_ARRAY_SUPPORT ? (this[e] = r >>> 24, this[e + 1] = r >>> 16, this[e + 2] = r >>> 8, this[e + 3] = r & 255) : objectWriteUInt32(this, r, e, !1), e + 4;
};
Buffer.prototype.writeIntLE = function(r, e, t, a) {
  if (r = +r, e = e | 0, !a) {
    var i = Math.pow(2, 8 * t - 1);
    checkInt(this, r, e, t, i - 1, -i);
  }
  var s = 0, u = 1, c = 0;
  for (this[e] = r & 255; ++s < t && (u *= 256); )
    r < 0 && c === 0 && this[e + s - 1] !== 0 && (c = 1), this[e + s] = (r / u >> 0) - c & 255;
  return e + t;
};
Buffer.prototype.writeIntBE = function(r, e, t, a) {
  if (r = +r, e = e | 0, !a) {
    var i = Math.pow(2, 8 * t - 1);
    checkInt(this, r, e, t, i - 1, -i);
  }
  var s = t - 1, u = 1, c = 0;
  for (this[e + s] = r & 255; --s >= 0 && (u *= 256); )
    r < 0 && c === 0 && this[e + s + 1] !== 0 && (c = 1), this[e + s] = (r / u >> 0) - c & 255;
  return e + t;
};
Buffer.prototype.writeInt8 = function(r, e, t) {
  return r = +r, e = e | 0, t || checkInt(this, r, e, 1, 127, -128), Buffer.TYPED_ARRAY_SUPPORT || (r = Math.floor(r)), r < 0 && (r = 255 + r + 1), this[e] = r & 255, e + 1;
};
Buffer.prototype.writeInt16LE = function(r, e, t) {
  return r = +r, e = e | 0, t || checkInt(this, r, e, 2, 32767, -32768), Buffer.TYPED_ARRAY_SUPPORT ? (this[e] = r & 255, this[e + 1] = r >>> 8) : objectWriteUInt16(this, r, e, !0), e + 2;
};
Buffer.prototype.writeInt16BE = function(r, e, t) {
  return r = +r, e = e | 0, t || checkInt(this, r, e, 2, 32767, -32768), Buffer.TYPED_ARRAY_SUPPORT ? (this[e] = r >>> 8, this[e + 1] = r & 255) : objectWriteUInt16(this, r, e, !1), e + 2;
};
Buffer.prototype.writeInt32LE = function(r, e, t) {
  return r = +r, e = e | 0, t || checkInt(this, r, e, 4, 2147483647, -2147483648), Buffer.TYPED_ARRAY_SUPPORT ? (this[e] = r & 255, this[e + 1] = r >>> 8, this[e + 2] = r >>> 16, this[e + 3] = r >>> 24) : objectWriteUInt32(this, r, e, !0), e + 4;
};
Buffer.prototype.writeInt32BE = function(r, e, t) {
  return r = +r, e = e | 0, t || checkInt(this, r, e, 4, 2147483647, -2147483648), r < 0 && (r = 4294967295 + r + 1), Buffer.TYPED_ARRAY_SUPPORT ? (this[e] = r >>> 24, this[e + 1] = r >>> 16, this[e + 2] = r >>> 8, this[e + 3] = r & 255) : objectWriteUInt32(this, r, e, !1), e + 4;
};
function checkIEEE754(n, r, e, t, a, i) {
  if (e + t > n.length)
    throw new RangeError("Index out of range");
  if (e < 0)
    throw new RangeError("Index out of range");
}
function writeFloat(n, r, e, t, a) {
  return a || checkIEEE754(n, r, e, 4), write(n, r, e, t, 23, 4), e + 4;
}
Buffer.prototype.writeFloatLE = function(r, e, t) {
  return writeFloat(this, r, e, !0, t);
};
Buffer.prototype.writeFloatBE = function(r, e, t) {
  return writeFloat(this, r, e, !1, t);
};
function writeDouble(n, r, e, t, a) {
  return a || checkIEEE754(n, r, e, 8), write(n, r, e, t, 52, 8), e + 8;
}
Buffer.prototype.writeDoubleLE = function(r, e, t) {
  return writeDouble(this, r, e, !0, t);
};
Buffer.prototype.writeDoubleBE = function(r, e, t) {
  return writeDouble(this, r, e, !1, t);
};
Buffer.prototype.copy = function(r, e, t, a) {
  if (t || (t = 0), !a && a !== 0 && (a = this.length), e >= r.length && (e = r.length), e || (e = 0), a > 0 && a < t && (a = t), a === t || r.length === 0 || this.length === 0)
    return 0;
  if (e < 0)
    throw new RangeError("targetStart out of bounds");
  if (t < 0 || t >= this.length)
    throw new RangeError("sourceStart out of bounds");
  if (a < 0)
    throw new RangeError("sourceEnd out of bounds");
  a > this.length && (a = this.length), r.length - e < a - t && (a = r.length - e + t);
  var i = a - t, s;
  if (this === r && t < e && e < a)
    for (s = i - 1; s >= 0; --s)
      r[s + e] = this[s + t];
  else if (i < 1e3 || !Buffer.TYPED_ARRAY_SUPPORT)
    for (s = 0; s < i; ++s)
      r[s + e] = this[s + t];
  else
    Uint8Array.prototype.set.call(
      r,
      this.subarray(t, t + i),
      e
    );
  return i;
};
Buffer.prototype.fill = function(r, e, t, a) {
  if (typeof r == "string") {
    if (typeof e == "string" ? (a = e, e = 0, t = this.length) : typeof t == "string" && (a = t, t = this.length), r.length === 1) {
      var i = r.charCodeAt(0);
      i < 256 && (r = i);
    }
    if (a !== void 0 && typeof a != "string")
      throw new TypeError("encoding must be a string");
    if (typeof a == "string" && !Buffer.isEncoding(a))
      throw new TypeError("Unknown encoding: " + a);
  } else
    typeof r == "number" && (r = r & 255);
  if (e < 0 || this.length < e || this.length < t)
    throw new RangeError("Out of range index");
  if (t <= e)
    return this;
  e = e >>> 0, t = t === void 0 ? this.length : t >>> 0, r || (r = 0);
  var s;
  if (typeof r == "number")
    for (s = e; s < t; ++s)
      this[s] = r;
  else {
    var u = internalIsBuffer(r) ? r : utf8ToBytes(new Buffer(r, a).toString()), c = u.length;
    for (s = 0; s < t - e; ++s)
      this[s + e] = u[s % c];
  }
  return this;
};
var INVALID_BASE64_RE = /[^+\/0-9A-Za-z-_]/g;
function base64clean(n) {
  if (n = stringtrim(n).replace(INVALID_BASE64_RE, ""), n.length < 2)
    return "";
  for (; n.length % 4 !== 0; )
    n = n + "=";
  return n;
}
function stringtrim(n) {
  return n.trim ? n.trim() : n.replace(/^\s+|\s+$/g, "");
}
function toHex(n) {
  return n < 16 ? "0" + n.toString(16) : n.toString(16);
}
function utf8ToBytes(n, r) {
  r = r || 1 / 0;
  for (var e, t = n.length, a = null, i = [], s = 0; s < t; ++s) {
    if (e = n.charCodeAt(s), e > 55295 && e < 57344) {
      if (!a) {
        if (e > 56319) {
          (r -= 3) > -1 && i.push(239, 191, 189);
          continue;
        } else if (s + 1 === t) {
          (r -= 3) > -1 && i.push(239, 191, 189);
          continue;
        }
        a = e;
        continue;
      }
      if (e < 56320) {
        (r -= 3) > -1 && i.push(239, 191, 189), a = e;
        continue;
      }
      e = (a - 55296 << 10 | e - 56320) + 65536;
    } else
      a && (r -= 3) > -1 && i.push(239, 191, 189);
    if (a = null, e < 128) {
      if ((r -= 1) < 0)
        break;
      i.push(e);
    } else if (e < 2048) {
      if ((r -= 2) < 0)
        break;
      i.push(
        e >> 6 | 192,
        e & 63 | 128
      );
    } else if (e < 65536) {
      if ((r -= 3) < 0)
        break;
      i.push(
        e >> 12 | 224,
        e >> 6 & 63 | 128,
        e & 63 | 128
      );
    } else if (e < 1114112) {
      if ((r -= 4) < 0)
        break;
      i.push(
        e >> 18 | 240,
        e >> 12 & 63 | 128,
        e >> 6 & 63 | 128,
        e & 63 | 128
      );
    } else
      throw new Error("Invalid code point");
  }
  return i;
}
function asciiToBytes(n) {
  for (var r = [], e = 0; e < n.length; ++e)
    r.push(n.charCodeAt(e) & 255);
  return r;
}
function utf16leToBytes(n, r) {
  for (var e, t, a, i = [], s = 0; s < n.length && !((r -= 2) < 0); ++s)
    e = n.charCodeAt(s), t = e >> 8, a = e % 256, i.push(a), i.push(t);
  return i;
}
function base64ToBytes(n) {
  return toByteArray(base64clean(n));
}
function blitBuffer(n, r, e, t) {
  for (var a = 0; a < t && !(a + e >= r.length || a >= n.length); ++a)
    r[a + e] = n[a];
  return a;
}
function isnan(n) {
  return n !== n;
}
function isBuffer(n) {
  return n != null && (!!n._isBuffer || isFastBuffer(n) || isSlowBuffer(n));
}
function isFastBuffer(n) {
  return !!n.constructor && typeof n.constructor.isBuffer == "function" && n.constructor.isBuffer(n);
}
function isSlowBuffer(n) {
  return typeof n.readFloatLE == "function" && typeof n.slice == "function" && isFastBuffer(n.slice(0, 0));
}
function defaultSetTimout() {
  throw new Error("setTimeout has not been defined");
}
function defaultClearTimeout() {
  throw new Error("clearTimeout has not been defined");
}
var cachedSetTimeout = defaultSetTimout, cachedClearTimeout = defaultClearTimeout;
typeof global$1.setTimeout == "function" && (cachedSetTimeout = setTimeout);
typeof global$1.clearTimeout == "function" && (cachedClearTimeout = clearTimeout);
function runTimeout(n) {
  if (cachedSetTimeout === setTimeout)
    return setTimeout(n, 0);
  if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout)
    return cachedSetTimeout = setTimeout, setTimeout(n, 0);
  try {
    return cachedSetTimeout(n, 0);
  } catch {
    try {
      return cachedSetTimeout.call(null, n, 0);
    } catch {
      return cachedSetTimeout.call(this, n, 0);
    }
  }
}
function runClearTimeout(n) {
  if (cachedClearTimeout === clearTimeout)
    return clearTimeout(n);
  if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout)
    return cachedClearTimeout = clearTimeout, clearTimeout(n);
  try {
    return cachedClearTimeout(n);
  } catch {
    try {
      return cachedClearTimeout.call(null, n);
    } catch {
      return cachedClearTimeout.call(this, n);
    }
  }
}
var queue = [], draining = !1, currentQueue, queueIndex = -1;
function cleanUpNextTick() {
  !draining || !currentQueue || (draining = !1, currentQueue.length ? queue = currentQueue.concat(queue) : queueIndex = -1, queue.length && drainQueue());
}
function drainQueue() {
  if (!draining) {
    var n = runTimeout(cleanUpNextTick);
    draining = !0;
    for (var r = queue.length; r; ) {
      for (currentQueue = queue, queue = []; ++queueIndex < r; )
        currentQueue && currentQueue[queueIndex].run();
      queueIndex = -1, r = queue.length;
    }
    currentQueue = null, draining = !1, runClearTimeout(n);
  }
}
function nextTick(n) {
  var r = new Array(arguments.length - 1);
  if (arguments.length > 1)
    for (var e = 1; e < arguments.length; e++)
      r[e - 1] = arguments[e];
  queue.push(new Item(n, r)), queue.length === 1 && !draining && runTimeout(drainQueue);
}
function Item(n, r) {
  this.fun = n, this.array = r;
}
Item.prototype.run = function() {
  this.fun.apply(null, this.array);
};
var title = "browser", platform = "browser", browser = !0, env = {}, argv = [], version = "", versions = {}, release = {}, config = {};
function noop() {
}
var on = noop, addListener = noop, once = noop, off = noop, removeListener = noop, removeAllListeners = noop, emit = noop;
function binding(n) {
  throw new Error("process.binding is not supported");
}
function cwd() {
  return "/";
}
function chdir(n) {
  throw new Error("process.chdir is not supported");
}
function umask() {
  return 0;
}
var performance = global$1.performance || {}, performanceNow = performance.now || performance.mozNow || performance.msNow || performance.oNow || performance.webkitNow || function() {
  return new Date().getTime();
};
function hrtime(n) {
  var r = performanceNow.call(performance) * 1e-3, e = Math.floor(r), t = Math.floor(r % 1 * 1e9);
  return n && (e = e - n[0], t = t - n[1], t < 0 && (e--, t += 1e9)), [e, t];
}
var startTime = new Date();
function uptime() {
  var n = new Date(), r = n - startTime;
  return r / 1e3;
}
var browser$1 = {
  nextTick,
  title,
  browser,
  env,
  argv,
  version,
  versions,
  on,
  addListener,
  once,
  off,
  removeListener,
  removeAllListeners,
  emit,
  binding,
  cwd,
  chdir,
  umask,
  hrtime,
  platform,
  release,
  config,
  uptime
}, commonjsGlobal = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function getAugmentedNamespace(n) {
  var r = n.default;
  if (typeof r == "function") {
    var e = function() {
      return r.apply(this, arguments);
    };
    e.prototype = r.prototype;
  } else
    e = {};
  return Object.defineProperty(e, "__esModule", { value: !0 }), Object.keys(n).forEach(function(t) {
    var a = Object.getOwnPropertyDescriptor(n, t);
    Object.defineProperty(e, t, a.get ? a : {
      enumerable: !0,
      get: function() {
        return n[t];
      }
    });
  }), e;
}
function commonjsRequire(n) {
  throw new Error('Could not dynamically require "' + n + '". Please configure the dynamicRequireTargets or/and ignoreDynamicRequires option of @rollup/plugin-commonjs appropriately for this require call to work.');
}
var pdf = { exports: {} };
const __viteBrowserExternal = {}, __viteBrowserExternal$1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: __viteBrowserExternal
}, Symbol.toStringTag, { value: "Module" })), require$$5 = /* @__PURE__ */ getAugmentedNamespace(__viteBrowserExternal$1);
(function(module, exports) {
  (function(r, e) {
    module.exports = e();
  })(commonjsGlobal, function() {
    return (() => {
      var __webpack_modules__ = [
        ,
        (n, r, e) => {
          function t(D) {
            return typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? t = function(d) {
              return typeof d;
            } : t = function(d) {
              return d && typeof Symbol == "function" && d.constructor === Symbol && d !== Symbol.prototype ? "symbol" : typeof d;
            }, t(D);
          }
          Object.defineProperty(r, "__esModule", {
            value: !0
          }), r.StatTimer = r.RenderingCancelledException = r.PixelsPerInch = r.PageViewport = r.PDFDateString = r.LinkTarget = r.DOMStandardFontDataFactory = r.DOMSVGFactory = r.DOMCanvasFactory = r.DOMCMapReaderFactory = void 0, r.addLinkAttributes = q, r.deprecated = de, r.getFilenameFromUrl = P, r.getPdfFilenameFromUrl = F, r.getXfaPageViewport = j, r.isDataScheme = w, r.isPdfFile = p, r.isValidFetchUrl = Z, r.loadScript = Y;
          var a = u(e(2)), i = e(4), s = e(135);
          function u(D) {
            return D && D.__esModule ? D : { default: D };
          }
          function c(D, h) {
            var d = typeof Symbol < "u" && D[Symbol.iterator] || D["@@iterator"];
            if (!d) {
              if (Array.isArray(D) || (d = g(D)) || h && D && typeof D.length == "number") {
                d && (D = d);
                var T = 0, B = function() {
                };
                return { s: B, n: function() {
                  return T >= D.length ? { done: !0 } : { done: !1, value: D[T++] };
                }, e: function(ye) {
                  throw ye;
                }, f: B };
              }
              throw new TypeError(`Invalid attempt to iterate non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
            }
            var z = !0, ee = !1, le;
            return { s: function() {
              d = d.call(D);
            }, n: function() {
              var ye = d.next();
              return z = ye.done, ye;
            }, e: function(ye) {
              ee = !0, le = ye;
            }, f: function() {
              try {
                !z && d.return != null && d.return();
              } finally {
                if (ee)
                  throw le;
              }
            } };
          }
          function g(D, h) {
            if (!!D) {
              if (typeof D == "string")
                return b(D, h);
              var d = Object.prototype.toString.call(D).slice(8, -1);
              if (d === "Object" && D.constructor && (d = D.constructor.name), d === "Map" || d === "Set")
                return Array.from(D);
              if (d === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(d))
                return b(D, h);
            }
          }
          function b(D, h) {
            (h == null || h > D.length) && (h = D.length);
            for (var d = 0, T = new Array(h); d < h; d++)
              T[d] = D[d];
            return T;
          }
          function A(D, h, d, T, B, z, ee) {
            try {
              var le = D[z](ee), ve = le.value;
            } catch (ye) {
              d(ye);
              return;
            }
            le.done ? h(ve) : Promise.resolve(ve).then(T, B);
          }
          function I(D) {
            return function() {
              var h = this, d = arguments;
              return new Promise(function(T, B) {
                var z = D.apply(h, d);
                function ee(ve) {
                  A(z, T, B, ee, le, "next", ve);
                }
                function le(ve) {
                  A(z, T, B, ee, le, "throw", ve);
                }
                ee(void 0);
              });
            };
          }
          function C(D, h) {
            if (!(D instanceof h))
              throw new TypeError("Cannot call a class as a function");
          }
          function E(D, h) {
            for (var d = 0; d < h.length; d++) {
              var T = h[d];
              T.enumerable = T.enumerable || !1, T.configurable = !0, "value" in T && (T.writable = !0), Object.defineProperty(D, T.key, T);
            }
          }
          function O(D, h, d) {
            return h && E(D.prototype, h), d && E(D, d), D;
          }
          function k(D, h) {
            if (typeof h != "function" && h !== null)
              throw new TypeError("Super expression must either be null or a function");
            D.prototype = Object.create(h && h.prototype, { constructor: { value: D, writable: !0, configurable: !0 } }), h && N(D, h);
          }
          function N(D, h) {
            return N = Object.setPrototypeOf || function(T, B) {
              return T.__proto__ = B, T;
            }, N(D, h);
          }
          function x(D) {
            var h = f();
            return function() {
              var T = v(D), B;
              if (h) {
                var z = v(this).constructor;
                B = Reflect.construct(T, arguments, z);
              } else
                B = T.apply(this, arguments);
              return U(this, B);
            };
          }
          function U(D, h) {
            if (h && (t(h) === "object" || typeof h == "function"))
              return h;
            if (h !== void 0)
              throw new TypeError("Derived constructors may only return object or undefined");
            return m(D);
          }
          function m(D) {
            if (D === void 0)
              throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return D;
          }
          function f() {
            if (typeof Reflect > "u" || !Reflect.construct || Reflect.construct.sham)
              return !1;
            if (typeof Proxy == "function")
              return !0;
            try {
              return Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
              })), !0;
            } catch {
              return !1;
            }
          }
          function v(D) {
            return v = Object.setPrototypeOf ? Object.getPrototypeOf : function(d) {
              return d.__proto__ || Object.getPrototypeOf(d);
            }, v(D);
          }
          var _ = "noopener noreferrer nofollow", S = "http://www.w3.org/2000/svg", y = {
            CSS: 96,
            PDF: 72,
            get PDF_TO_CSS_UNITS() {
              return (0, i.shadow)(this, "PDF_TO_CSS_UNITS", this.CSS / this.PDF);
            }
          };
          r.PixelsPerInch = y;
          var R = /* @__PURE__ */ function(D) {
            k(d, D);
            var h = x(d);
            function d() {
              var T, B = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {}, z = B.ownerDocument, ee = z === void 0 ? globalThis.document : z;
              return C(this, d), T = h.call(this), T._document = ee, T;
            }
            return O(d, [{
              key: "_createCanvas",
              value: function(B, z) {
                var ee = this._document.createElement("canvas");
                return ee.width = B, ee.height = z, ee;
              }
            }]), d;
          }(s.BaseCanvasFactory);
          r.DOMCanvasFactory = R;
          function L(D) {
            return $.apply(this, arguments);
          }
          function $() {
            return $ = I(/* @__PURE__ */ a.default.mark(function D(h) {
              var d, T, B = arguments;
              return a.default.wrap(function(ee) {
                for (; ; )
                  switch (ee.prev = ee.next) {
                    case 0:
                      if (d = B.length > 1 && B[1] !== void 0 ? B[1] : !1, !Z(h, document.baseURI)) {
                        ee.next = 21;
                        break;
                      }
                      return ee.next = 4, fetch(h);
                    case 4:
                      if (T = ee.sent, T.ok) {
                        ee.next = 7;
                        break;
                      }
                      throw new Error(T.statusText);
                    case 7:
                      if (!d) {
                        ee.next = 15;
                        break;
                      }
                      return ee.t1 = Uint8Array, ee.next = 11, T.arrayBuffer();
                    case 11:
                      ee.t2 = ee.sent, ee.t0 = new ee.t1(ee.t2), ee.next = 20;
                      break;
                    case 15:
                      return ee.t3 = i.stringToBytes, ee.next = 18, T.text();
                    case 18:
                      ee.t4 = ee.sent, ee.t0 = (0, ee.t3)(ee.t4);
                    case 20:
                      return ee.abrupt("return", ee.t0);
                    case 21:
                      return ee.abrupt("return", new Promise(function(le, ve) {
                        var ye = new XMLHttpRequest();
                        ye.open("GET", h, !0), d && (ye.responseType = "arraybuffer"), ye.onreadystatechange = function() {
                          if (ye.readyState === XMLHttpRequest.DONE) {
                            if (ye.status === 200 || ye.status === 0) {
                              var me;
                              if (d && ye.response ? me = new Uint8Array(ye.response) : !d && ye.responseText && (me = (0, i.stringToBytes)(ye.responseText)), me) {
                                le(me);
                                return;
                              }
                            }
                            ve(new Error(ye.statusText));
                          }
                        }, ye.send(null);
                      }));
                    case 22:
                    case "end":
                      return ee.stop();
                  }
              }, D);
            })), $.apply(this, arguments);
          }
          var W = /* @__PURE__ */ function(D) {
            k(d, D);
            var h = x(d);
            function d() {
              return C(this, d), h.apply(this, arguments);
            }
            return O(d, [{
              key: "_fetchData",
              value: function(B, z) {
                return L(B, this.isCompressed).then(function(ee) {
                  return {
                    cMapData: ee,
                    compressionType: z
                  };
                });
              }
            }]), d;
          }(s.BaseCMapReaderFactory);
          r.DOMCMapReaderFactory = W;
          var X = /* @__PURE__ */ function(D) {
            k(d, D);
            var h = x(d);
            function d() {
              return C(this, d), h.apply(this, arguments);
            }
            return O(d, [{
              key: "_fetchData",
              value: function(B) {
                return L(B, !0);
              }
            }]), d;
          }(s.BaseStandardFontDataFactory);
          r.DOMStandardFontDataFactory = X;
          var te = /* @__PURE__ */ function(D) {
            k(d, D);
            var h = x(d);
            function d() {
              return C(this, d), h.apply(this, arguments);
            }
            return O(d, [{
              key: "_createSVG",
              value: function(B) {
                return document.createElementNS(S, B);
              }
            }]), d;
          }(s.BaseSVGFactory);
          r.DOMSVGFactory = te;
          var K = /* @__PURE__ */ function() {
            function D(h) {
              var d = h.viewBox, T = h.scale, B = h.rotation, z = h.offsetX, ee = z === void 0 ? 0 : z, le = h.offsetY, ve = le === void 0 ? 0 : le, ye = h.dontFlip, me = ye === void 0 ? !1 : ye;
              C(this, D), this.viewBox = d, this.scale = T, this.rotation = B, this.offsetX = ee, this.offsetY = ve;
              var we = (d[2] + d[0]) / 2, Pe = (d[3] + d[1]) / 2, Ee, Fe, Ie, We;
              switch (B %= 360, B < 0 && (B += 360), B) {
                case 180:
                  Ee = -1, Fe = 0, Ie = 0, We = 1;
                  break;
                case 90:
                  Ee = 0, Fe = 1, Ie = 1, We = 0;
                  break;
                case 270:
                  Ee = 0, Fe = -1, Ie = -1, We = 0;
                  break;
                case 0:
                  Ee = 1, Fe = 0, Ie = 0, We = -1;
                  break;
                default:
                  throw new Error("PageViewport: Invalid rotation, must be a multiple of 90 degrees.");
              }
              me && (Ie = -Ie, We = -We);
              var je, fe, he, H;
              Ee === 0 ? (je = Math.abs(Pe - d[1]) * T + ee, fe = Math.abs(we - d[0]) * T + ve, he = Math.abs(d[3] - d[1]) * T, H = Math.abs(d[2] - d[0]) * T) : (je = Math.abs(we - d[0]) * T + ee, fe = Math.abs(Pe - d[1]) * T + ve, he = Math.abs(d[2] - d[0]) * T, H = Math.abs(d[3] - d[1]) * T), this.transform = [Ee * T, Fe * T, Ie * T, We * T, je - Ee * T * we - Ie * T * Pe, fe - Fe * T * we - We * T * Pe], this.width = he, this.height = H;
            }
            return O(D, [{
              key: "clone",
              value: function() {
                var d = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {}, T = d.scale, B = T === void 0 ? this.scale : T, z = d.rotation, ee = z === void 0 ? this.rotation : z, le = d.offsetX, ve = le === void 0 ? this.offsetX : le, ye = d.offsetY, me = ye === void 0 ? this.offsetY : ye, we = d.dontFlip, Pe = we === void 0 ? !1 : we;
                return new D({
                  viewBox: this.viewBox.slice(),
                  scale: B,
                  rotation: ee,
                  offsetX: ve,
                  offsetY: me,
                  dontFlip: Pe
                });
              }
            }, {
              key: "convertToViewportPoint",
              value: function(d, T) {
                return i.Util.applyTransform([d, T], this.transform);
              }
            }, {
              key: "convertToViewportRectangle",
              value: function(d) {
                var T = i.Util.applyTransform([d[0], d[1]], this.transform), B = i.Util.applyTransform([d[2], d[3]], this.transform);
                return [T[0], T[1], B[0], B[1]];
              }
            }, {
              key: "convertToPdfPoint",
              value: function(d, T) {
                return i.Util.applyInverseTransform([d, T], this.transform);
              }
            }]), D;
          }();
          r.PageViewport = K;
          var ae = /* @__PURE__ */ function(D) {
            k(d, D);
            var h = x(d);
            function d(T, B) {
              var z;
              return C(this, d), z = h.call(this, T, "RenderingCancelledException"), z.type = B, z;
            }
            return d;
          }(i.BaseException);
          r.RenderingCancelledException = ae;
          var V = {
            NONE: 0,
            SELF: 1,
            BLANK: 2,
            PARENT: 3,
            TOP: 4
          };
          r.LinkTarget = V;
          function q(D) {
            var h = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, d = h.url, T = h.target, B = h.rel, z = h.enabled, ee = z === void 0 ? !0 : z;
            (0, i.assert)(d && typeof d == "string", 'addLinkAttributes: A valid "url" parameter must provided.');
            var le = (0, i.removeNullCharacters)(d);
            ee ? D.href = D.title = le : (D.href = "", D.title = "Disabled: ".concat(le), D.onclick = function() {
              return !1;
            });
            var ve = "";
            switch (T) {
              case V.NONE:
                break;
              case V.SELF:
                ve = "_self";
                break;
              case V.BLANK:
                ve = "_blank";
                break;
              case V.PARENT:
                ve = "_parent";
                break;
              case V.TOP:
                ve = "_top";
                break;
            }
            D.target = ve, D.rel = typeof B == "string" ? B : _;
          }
          function w(D) {
            for (var h = D.length, d = 0; d < h && D[d].trim() === ""; )
              d++;
            return D.substring(d, d + 5).toLowerCase() === "data:";
          }
          function p(D) {
            return typeof D == "string" && /\.pdf$/i.test(D);
          }
          function P(D) {
            var h = D.indexOf("#"), d = D.indexOf("?"), T = Math.min(h > 0 ? h : D.length, d > 0 ? d : D.length);
            return D.substring(D.lastIndexOf("/", T) + 1, T);
          }
          function F(D) {
            var h = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "document.pdf";
            if (typeof D != "string")
              return h;
            if (w(D))
              return (0, i.warn)('getPdfFilenameFromUrl: ignore "data:"-URL for performance reasons.'), h;
            var d = /^(?:(?:[^:]+:)?\/\/[^/]+)?([^?#]*)(\?[^#]*)?(#.*)?$/, T = /[^/?#=]+\.pdf\b(?!.*\.pdf\b)/i, B = d.exec(D), z = T.exec(B[1]) || T.exec(B[2]) || T.exec(B[3]);
            if (z && (z = z[0], z.includes("%")))
              try {
                z = T.exec(decodeURIComponent(z))[0];
              } catch {
              }
            return z || h;
          }
          var G = /* @__PURE__ */ function() {
            function D() {
              C(this, D), this.started = /* @__PURE__ */ Object.create(null), this.times = [];
            }
            return O(D, [{
              key: "time",
              value: function(d) {
                d in this.started && (0, i.warn)("Timer is already running for ".concat(d)), this.started[d] = Date.now();
              }
            }, {
              key: "timeEnd",
              value: function(d) {
                d in this.started || (0, i.warn)("Timer has not been started for ".concat(d)), this.times.push({
                  name: d,
                  start: this.started[d],
                  end: Date.now()
                }), delete this.started[d];
              }
            }, {
              key: "toString",
              value: function() {
                var d = [], T = 0, B = c(this.times), z;
                try {
                  for (B.s(); !(z = B.n()).done; ) {
                    var ee = z.value, le = ee.name;
                    le.length > T && (T = le.length);
                  }
                } catch (Pe) {
                  B.e(Pe);
                } finally {
                  B.f();
                }
                var ve = c(this.times), ye;
                try {
                  for (ve.s(); !(ye = ve.n()).done; ) {
                    var me = ye.value, we = me.end - me.start;
                    d.push("".concat(me.name.padEnd(T), " ").concat(we, `ms
`));
                  }
                } catch (Pe) {
                  ve.e(Pe);
                } finally {
                  ve.f();
                }
                return d.join("");
              }
            }]), D;
          }();
          r.StatTimer = G;
          function Z(D, h) {
            try {
              var d = h ? new URL(D, h) : new URL(D), T = d.protocol;
              return T === "http:" || T === "https:";
            } catch {
              return !1;
            }
          }
          function Y(D) {
            var h = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !1;
            return new Promise(function(d, T) {
              var B = document.createElement("script");
              B.src = D, B.onload = function(z) {
                h && B.remove(), d(z);
              }, B.onerror = function() {
                T(new Error("Cannot load script at: ".concat(B.src)));
              }, (document.head || document.documentElement).appendChild(B);
            });
          }
          function de(D) {
            console.log("Deprecated API usage: " + D);
          }
          var Se, _e = /* @__PURE__ */ function() {
            function D() {
              C(this, D);
            }
            return O(D, null, [{
              key: "toDateObject",
              value: function(d) {
                if (!d || !(0, i.isString)(d))
                  return null;
                Se || (Se = new RegExp("^D:(\\d{4})(\\d{2})?(\\d{2})?(\\d{2})?(\\d{2})?(\\d{2})?([Z|+|-])?(\\d{2})?'?(\\d{2})?'?"));
                var T = Se.exec(d);
                if (!T)
                  return null;
                var B = parseInt(T[1], 10), z = parseInt(T[2], 10);
                z = z >= 1 && z <= 12 ? z - 1 : 0;
                var ee = parseInt(T[3], 10);
                ee = ee >= 1 && ee <= 31 ? ee : 1;
                var le = parseInt(T[4], 10);
                le = le >= 0 && le <= 23 ? le : 0;
                var ve = parseInt(T[5], 10);
                ve = ve >= 0 && ve <= 59 ? ve : 0;
                var ye = parseInt(T[6], 10);
                ye = ye >= 0 && ye <= 59 ? ye : 0;
                var me = T[7] || "Z", we = parseInt(T[8], 10);
                we = we >= 0 && we <= 23 ? we : 0;
                var Pe = parseInt(T[9], 10) || 0;
                return Pe = Pe >= 0 && Pe <= 59 ? Pe : 0, me === "-" ? (le += we, ve += Pe) : me === "+" && (le -= we, ve -= Pe), new Date(Date.UTC(B, z, ee, le, ve, ye));
              }
            }]), D;
          }();
          r.PDFDateString = _e;
          function j(D, h) {
            var d = h.scale, T = d === void 0 ? 1 : d, B = h.rotation, z = B === void 0 ? 0 : B, ee = D.attributes.style, le = ee.width, ve = ee.height, ye = [0, 0, parseInt(le), parseInt(ve)];
            return new K({
              viewBox: ye,
              scale: T,
              rotation: z
            });
          }
        },
        (n, r, e) => {
          n.exports = e(3);
        },
        (n, r, e) => {
          n = e.nmd(n);
          function t(i) {
            return typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? t = function(u) {
              return typeof u;
            } : t = function(u) {
              return u && typeof Symbol == "function" && u.constructor === Symbol && u !== Symbol.prototype ? "symbol" : typeof u;
            }, t(i);
          }
          var a = function(i) {
            var s = Object.prototype, u = s.hasOwnProperty, c, g = typeof Symbol == "function" ? Symbol : {}, b = g.iterator || "@@iterator", A = g.asyncIterator || "@@asyncIterator", I = g.toStringTag || "@@toStringTag";
            function C(p, P, F) {
              return Object.defineProperty(p, P, {
                value: F,
                enumerable: !0,
                configurable: !0,
                writable: !0
              }), p[P];
            }
            try {
              C({}, "");
            } catch {
              C = function(F, G, Z) {
                return F[G] = Z;
              };
            }
            function E(p, P, F, G) {
              var Z = P && P.prototype instanceof f ? P : f, Y = Object.create(Z.prototype), de = new V(G || []);
              return Y._invoke = X(p, F, de), Y;
            }
            i.wrap = E;
            function O(p, P, F) {
              try {
                return {
                  type: "normal",
                  arg: p.call(P, F)
                };
              } catch (G) {
                return {
                  type: "throw",
                  arg: G
                };
              }
            }
            var k = "suspendedStart", N = "suspendedYield", x = "executing", U = "completed", m = {};
            function f() {
            }
            function v() {
            }
            function _() {
            }
            var S = {};
            C(S, b, function() {
              return this;
            });
            var y = Object.getPrototypeOf, R = y && y(y(q([])));
            R && R !== s && u.call(R, b) && (S = R);
            var L = _.prototype = f.prototype = Object.create(S);
            v.prototype = _, C(L, "constructor", _), C(_, "constructor", v), v.displayName = C(_, I, "GeneratorFunction");
            function $(p) {
              ["next", "throw", "return"].forEach(function(P) {
                C(p, P, function(F) {
                  return this._invoke(P, F);
                });
              });
            }
            i.isGeneratorFunction = function(p) {
              var P = typeof p == "function" && p.constructor;
              return P ? P === v || (P.displayName || P.name) === "GeneratorFunction" : !1;
            }, i.mark = function(p) {
              return Object.setPrototypeOf ? Object.setPrototypeOf(p, _) : (p.__proto__ = _, C(p, I, "GeneratorFunction")), p.prototype = Object.create(L), p;
            }, i.awrap = function(p) {
              return {
                __await: p
              };
            };
            function W(p, P) {
              function F(Y, de, Se, _e) {
                var j = O(p[Y], p, de);
                if (j.type === "throw")
                  _e(j.arg);
                else {
                  var D = j.arg, h = D.value;
                  return h && t(h) === "object" && u.call(h, "__await") ? P.resolve(h.__await).then(function(d) {
                    F("next", d, Se, _e);
                  }, function(d) {
                    F("throw", d, Se, _e);
                  }) : P.resolve(h).then(function(d) {
                    D.value = d, Se(D);
                  }, function(d) {
                    return F("throw", d, Se, _e);
                  });
                }
              }
              var G;
              function Z(Y, de) {
                function Se() {
                  return new P(function(_e, j) {
                    F(Y, de, _e, j);
                  });
                }
                return G = G ? G.then(Se, Se) : Se();
              }
              this._invoke = Z;
            }
            $(W.prototype), C(W.prototype, A, function() {
              return this;
            }), i.AsyncIterator = W, i.async = function(p, P, F, G, Z) {
              Z === void 0 && (Z = Promise);
              var Y = new W(E(p, P, F, G), Z);
              return i.isGeneratorFunction(P) ? Y : Y.next().then(function(de) {
                return de.done ? de.value : Y.next();
              });
            };
            function X(p, P, F) {
              var G = k;
              return function(Y, de) {
                if (G === x)
                  throw new Error("Generator is already running");
                if (G === U) {
                  if (Y === "throw")
                    throw de;
                  return w();
                }
                for (F.method = Y, F.arg = de; ; ) {
                  var Se = F.delegate;
                  if (Se) {
                    var _e = te(Se, F);
                    if (_e) {
                      if (_e === m)
                        continue;
                      return _e;
                    }
                  }
                  if (F.method === "next")
                    F.sent = F._sent = F.arg;
                  else if (F.method === "throw") {
                    if (G === k)
                      throw G = U, F.arg;
                    F.dispatchException(F.arg);
                  } else
                    F.method === "return" && F.abrupt("return", F.arg);
                  G = x;
                  var j = O(p, P, F);
                  if (j.type === "normal") {
                    if (G = F.done ? U : N, j.arg === m)
                      continue;
                    return {
                      value: j.arg,
                      done: F.done
                    };
                  } else
                    j.type === "throw" && (G = U, F.method = "throw", F.arg = j.arg);
                }
              };
            }
            function te(p, P) {
              var F = p.iterator[P.method];
              if (F === c) {
                if (P.delegate = null, P.method === "throw") {
                  if (p.iterator.return && (P.method = "return", P.arg = c, te(p, P), P.method === "throw"))
                    return m;
                  P.method = "throw", P.arg = new TypeError("The iterator does not provide a 'throw' method");
                }
                return m;
              }
              var G = O(F, p.iterator, P.arg);
              if (G.type === "throw")
                return P.method = "throw", P.arg = G.arg, P.delegate = null, m;
              var Z = G.arg;
              if (!Z)
                return P.method = "throw", P.arg = new TypeError("iterator result is not an object"), P.delegate = null, m;
              if (Z.done)
                P[p.resultName] = Z.value, P.next = p.nextLoc, P.method !== "return" && (P.method = "next", P.arg = c);
              else
                return Z;
              return P.delegate = null, m;
            }
            $(L), C(L, I, "Generator"), C(L, b, function() {
              return this;
            }), C(L, "toString", function() {
              return "[object Generator]";
            });
            function K(p) {
              var P = {
                tryLoc: p[0]
              };
              1 in p && (P.catchLoc = p[1]), 2 in p && (P.finallyLoc = p[2], P.afterLoc = p[3]), this.tryEntries.push(P);
            }
            function ae(p) {
              var P = p.completion || {};
              P.type = "normal", delete P.arg, p.completion = P;
            }
            function V(p) {
              this.tryEntries = [{
                tryLoc: "root"
              }], p.forEach(K, this), this.reset(!0);
            }
            i.keys = function(p) {
              var P = [];
              for (var F in p)
                P.push(F);
              return P.reverse(), function G() {
                for (; P.length; ) {
                  var Z = P.pop();
                  if (Z in p)
                    return G.value = Z, G.done = !1, G;
                }
                return G.done = !0, G;
              };
            };
            function q(p) {
              if (p) {
                var P = p[b];
                if (P)
                  return P.call(p);
                if (typeof p.next == "function")
                  return p;
                if (!isNaN(p.length)) {
                  var F = -1, G = function Z() {
                    for (; ++F < p.length; )
                      if (u.call(p, F))
                        return Z.value = p[F], Z.done = !1, Z;
                    return Z.value = c, Z.done = !0, Z;
                  };
                  return G.next = G;
                }
              }
              return {
                next: w
              };
            }
            i.values = q;
            function w() {
              return {
                value: c,
                done: !0
              };
            }
            return V.prototype = {
              constructor: V,
              reset: function(P) {
                if (this.prev = 0, this.next = 0, this.sent = this._sent = c, this.done = !1, this.delegate = null, this.method = "next", this.arg = c, this.tryEntries.forEach(ae), !P)
                  for (var F in this)
                    F.charAt(0) === "t" && u.call(this, F) && !isNaN(+F.slice(1)) && (this[F] = c);
              },
              stop: function() {
                this.done = !0;
                var P = this.tryEntries[0], F = P.completion;
                if (F.type === "throw")
                  throw F.arg;
                return this.rval;
              },
              dispatchException: function(P) {
                if (this.done)
                  throw P;
                var F = this;
                function G(j, D) {
                  return de.type = "throw", de.arg = P, F.next = j, D && (F.method = "next", F.arg = c), !!D;
                }
                for (var Z = this.tryEntries.length - 1; Z >= 0; --Z) {
                  var Y = this.tryEntries[Z], de = Y.completion;
                  if (Y.tryLoc === "root")
                    return G("end");
                  if (Y.tryLoc <= this.prev) {
                    var Se = u.call(Y, "catchLoc"), _e = u.call(Y, "finallyLoc");
                    if (Se && _e) {
                      if (this.prev < Y.catchLoc)
                        return G(Y.catchLoc, !0);
                      if (this.prev < Y.finallyLoc)
                        return G(Y.finallyLoc);
                    } else if (Se) {
                      if (this.prev < Y.catchLoc)
                        return G(Y.catchLoc, !0);
                    } else if (_e) {
                      if (this.prev < Y.finallyLoc)
                        return G(Y.finallyLoc);
                    } else
                      throw new Error("try statement without catch or finally");
                  }
                }
              },
              abrupt: function(P, F) {
                for (var G = this.tryEntries.length - 1; G >= 0; --G) {
                  var Z = this.tryEntries[G];
                  if (Z.tryLoc <= this.prev && u.call(Z, "finallyLoc") && this.prev < Z.finallyLoc) {
                    var Y = Z;
                    break;
                  }
                }
                Y && (P === "break" || P === "continue") && Y.tryLoc <= F && F <= Y.finallyLoc && (Y = null);
                var de = Y ? Y.completion : {};
                return de.type = P, de.arg = F, Y ? (this.method = "next", this.next = Y.finallyLoc, m) : this.complete(de);
              },
              complete: function(P, F) {
                if (P.type === "throw")
                  throw P.arg;
                return P.type === "break" || P.type === "continue" ? this.next = P.arg : P.type === "return" ? (this.rval = this.arg = P.arg, this.method = "return", this.next = "end") : P.type === "normal" && F && (this.next = F), m;
              },
              finish: function(P) {
                for (var F = this.tryEntries.length - 1; F >= 0; --F) {
                  var G = this.tryEntries[F];
                  if (G.finallyLoc === P)
                    return this.complete(G.completion, G.afterLoc), ae(G), m;
                }
              },
              catch: function(P) {
                for (var F = this.tryEntries.length - 1; F >= 0; --F) {
                  var G = this.tryEntries[F];
                  if (G.tryLoc === P) {
                    var Z = G.completion;
                    if (Z.type === "throw") {
                      var Y = Z.arg;
                      ae(G);
                    }
                    return Y;
                  }
                }
                throw new Error("illegal catch attempt");
              },
              delegateYield: function(P, F, G) {
                return this.delegate = {
                  iterator: q(P),
                  resultName: F,
                  nextLoc: G
                }, this.method === "next" && (this.arg = c), m;
              }
            }, i;
          }(t(n) === "object" ? n.exports : {});
          try {
            regeneratorRuntime = a;
          } catch {
            (typeof globalThis > "u" ? "undefined" : t(globalThis)) === "object" ? globalThis.regeneratorRuntime = a : Function("r", "regeneratorRuntime = r")(a);
          }
        },
        (n, r, e) => {
          Object.defineProperty(r, "__esModule", {
            value: !0
          }), r.VerbosityLevel = r.Util = r.UnknownErrorException = r.UnexpectedResponseException = r.UNSUPPORTED_FEATURES = r.TextRenderingMode = r.StreamType = r.RenderingIntentFlag = r.PermissionFlag = r.PasswordResponses = r.PasswordException = r.PageActionEventType = r.OPS = r.MissingPDFException = r.IsLittleEndianCached = r.IsEvalSupportedCached = r.InvalidPDFException = r.ImageKind = r.IDENTITY_MATRIX = r.FormatError = r.FontType = r.FONT_IDENTITY_MATRIX = r.DocumentActionEventType = r.CMapCompressionType = r.BaseException = r.AnnotationType = r.AnnotationStateModelType = r.AnnotationReviewState = r.AnnotationReplyType = r.AnnotationMode = r.AnnotationMarkedState = r.AnnotationFlag = r.AnnotationFieldFlag = r.AnnotationBorderStyleType = r.AnnotationActionEventType = r.AbortException = void 0, r.arrayByteLength = ce, r.arraysToBytes = Ae, r.assert = ye, r.bytesToString = J, r.createObjectURL = Rt, r.createPromiseCapability = _t, r.createValidAbsoluteUrl = Pe, r.escapeString = Je, r.getModificationDate = Xt, r.getVerbosityLevel = z, r.info = ee, r.isArrayBuffer = Ot, r.isArrayEqual = Ft, r.isAscii = rt, r.isBool = kt, r.isNum = Vt, r.isSameOrigin = me, r.isString = xt, r.objectFromMap = Le, r.objectSize = De, r.removeNullCharacters = ne, r.setVerbosityLevel = B, r.shadow = Ee, r.string32 = Re, r.stringToBytes = pe, r.stringToPDFString = Xe, r.stringToUTF16BEString = it, r.stringToUTF8String = mt, r.unreachable = ve, r.utf8StringToString = ht, r.warn = le, e(5);
          function t(ue, Ce) {
            for (var se = 0; se < Ce.length; se++) {
              var ge = Ce[se];
              ge.enumerable = ge.enumerable || !1, ge.configurable = !0, "value" in ge && (ge.writable = !0), Object.defineProperty(ue, ge.key, ge);
            }
          }
          function a(ue, Ce, se) {
            return Ce && t(ue.prototype, Ce), se && t(ue, se), ue;
          }
          function i(ue) {
            return c(ue) || u(ue) || E(ue) || s();
          }
          function s() {
            throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
          }
          function u(ue) {
            if (typeof Symbol < "u" && ue[Symbol.iterator] != null || ue["@@iterator"] != null)
              return Array.from(ue);
          }
          function c(ue) {
            if (Array.isArray(ue))
              return O(ue);
          }
          function g(ue, Ce) {
            return I(ue) || A(ue, Ce) || E(ue, Ce) || b();
          }
          function b() {
            throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
          }
          function A(ue, Ce) {
            var se = ue == null ? null : typeof Symbol < "u" && ue[Symbol.iterator] || ue["@@iterator"];
            if (se != null) {
              var ge = [], Ue = !0, Ge = !1, He, qe;
              try {
                for (se = se.call(ue); !(Ue = (He = se.next()).done) && (ge.push(He.value), !(Ce && ge.length === Ce)); Ue = !0)
                  ;
              } catch (nt) {
                Ge = !0, qe = nt;
              } finally {
                try {
                  !Ue && se.return != null && se.return();
                } finally {
                  if (Ge)
                    throw qe;
                }
              }
              return ge;
            }
          }
          function I(ue) {
            if (Array.isArray(ue))
              return ue;
          }
          function C(ue, Ce) {
            var se = typeof Symbol < "u" && ue[Symbol.iterator] || ue["@@iterator"];
            if (!se) {
              if (Array.isArray(ue) || (se = E(ue)) || Ce && ue && typeof ue.length == "number") {
                se && (ue = se);
                var ge = 0, Ue = function() {
                };
                return { s: Ue, n: function() {
                  return ge >= ue.length ? { done: !0 } : { done: !1, value: ue[ge++] };
                }, e: function(ot) {
                  throw ot;
                }, f: Ue };
              }
              throw new TypeError(`Invalid attempt to iterate non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
            }
            var Ge = !0, He = !1, qe;
            return { s: function() {
              se = se.call(ue);
            }, n: function() {
              var ot = se.next();
              return Ge = ot.done, ot;
            }, e: function(ot) {
              He = !0, qe = ot;
            }, f: function() {
              try {
                !Ge && se.return != null && se.return();
              } finally {
                if (He)
                  throw qe;
              }
            } };
          }
          function E(ue, Ce) {
            if (!!ue) {
              if (typeof ue == "string")
                return O(ue, Ce);
              var se = Object.prototype.toString.call(ue).slice(8, -1);
              if (se === "Object" && ue.constructor && (se = ue.constructor.name), se === "Map" || se === "Set")
                return Array.from(ue);
              if (se === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(se))
                return O(ue, Ce);
            }
          }
          function O(ue, Ce) {
            (Ce == null || Ce > ue.length) && (Ce = ue.length);
            for (var se = 0, ge = new Array(Ce); se < Ce; se++)
              ge[se] = ue[se];
            return ge;
          }
          function k(ue) {
            return typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? k = function(se) {
              return typeof se;
            } : k = function(se) {
              return se && typeof Symbol == "function" && se.constructor === Symbol && se !== Symbol.prototype ? "symbol" : typeof se;
            }, k(ue);
          }
          function N(ue, Ce) {
            if (!(ue instanceof Ce))
              throw new TypeError("Cannot call a class as a function");
          }
          function x(ue, Ce) {
            if (typeof Ce != "function" && Ce !== null)
              throw new TypeError("Super expression must either be null or a function");
            ue.prototype = Object.create(Ce && Ce.prototype, { constructor: { value: ue, writable: !0, configurable: !0 } }), Ce && U(ue, Ce);
          }
          function U(ue, Ce) {
            return U = Object.setPrototypeOf || function(ge, Ue) {
              return ge.__proto__ = Ue, ge;
            }, U(ue, Ce);
          }
          function m(ue) {
            var Ce = _();
            return function() {
              var ge = S(ue), Ue;
              if (Ce) {
                var Ge = S(this).constructor;
                Ue = Reflect.construct(ge, arguments, Ge);
              } else
                Ue = ge.apply(this, arguments);
              return f(this, Ue);
            };
          }
          function f(ue, Ce) {
            if (Ce && (k(Ce) === "object" || typeof Ce == "function"))
              return Ce;
            if (Ce !== void 0)
              throw new TypeError("Derived constructors may only return object or undefined");
            return v(ue);
          }
          function v(ue) {
            if (ue === void 0)
              throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return ue;
          }
          function _() {
            if (typeof Reflect > "u" || !Reflect.construct || Reflect.construct.sham)
              return !1;
            if (typeof Proxy == "function")
              return !0;
            try {
              return Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
              })), !0;
            } catch {
              return !1;
            }
          }
          function S(ue) {
            return S = Object.setPrototypeOf ? Object.getPrototypeOf : function(se) {
              return se.__proto__ || Object.getPrototypeOf(se);
            }, S(ue);
          }
          var y = [1, 0, 0, 1, 0, 0];
          r.IDENTITY_MATRIX = y;
          var R = [1e-3, 0, 0, 1e-3, 0, 0];
          r.FONT_IDENTITY_MATRIX = R;
          var L = {
            ANY: 1,
            DISPLAY: 2,
            PRINT: 4,
            ANNOTATIONS_FORMS: 16,
            ANNOTATIONS_STORAGE: 32,
            ANNOTATIONS_DISABLE: 64,
            OPLIST: 256
          };
          r.RenderingIntentFlag = L;
          var $ = {
            DISABLE: 0,
            ENABLE: 1,
            ENABLE_FORMS: 2,
            ENABLE_STORAGE: 3
          };
          r.AnnotationMode = $;
          var W = {
            PRINT: 4,
            MODIFY_CONTENTS: 8,
            COPY: 16,
            MODIFY_ANNOTATIONS: 32,
            FILL_INTERACTIVE_FORMS: 256,
            COPY_FOR_ACCESSIBILITY: 512,
            ASSEMBLE: 1024,
            PRINT_HIGH_QUALITY: 2048
          };
          r.PermissionFlag = W;
          var X = {
            FILL: 0,
            STROKE: 1,
            FILL_STROKE: 2,
            INVISIBLE: 3,
            FILL_ADD_TO_PATH: 4,
            STROKE_ADD_TO_PATH: 5,
            FILL_STROKE_ADD_TO_PATH: 6,
            ADD_TO_PATH: 7,
            FILL_STROKE_MASK: 3,
            ADD_TO_PATH_FLAG: 4
          };
          r.TextRenderingMode = X;
          var te = {
            GRAYSCALE_1BPP: 1,
            RGB_24BPP: 2,
            RGBA_32BPP: 3
          };
          r.ImageKind = te;
          var K = {
            TEXT: 1,
            LINK: 2,
            FREETEXT: 3,
            LINE: 4,
            SQUARE: 5,
            CIRCLE: 6,
            POLYGON: 7,
            POLYLINE: 8,
            HIGHLIGHT: 9,
            UNDERLINE: 10,
            SQUIGGLY: 11,
            STRIKEOUT: 12,
            STAMP: 13,
            CARET: 14,
            INK: 15,
            POPUP: 16,
            FILEATTACHMENT: 17,
            SOUND: 18,
            MOVIE: 19,
            WIDGET: 20,
            SCREEN: 21,
            PRINTERMARK: 22,
            TRAPNET: 23,
            WATERMARK: 24,
            THREED: 25,
            REDACT: 26
          };
          r.AnnotationType = K;
          var ae = {
            MARKED: "Marked",
            REVIEW: "Review"
          };
          r.AnnotationStateModelType = ae;
          var V = {
            MARKED: "Marked",
            UNMARKED: "Unmarked"
          };
          r.AnnotationMarkedState = V;
          var q = {
            ACCEPTED: "Accepted",
            REJECTED: "Rejected",
            CANCELLED: "Cancelled",
            COMPLETED: "Completed",
            NONE: "None"
          };
          r.AnnotationReviewState = q;
          var w = {
            GROUP: "Group",
            REPLY: "R"
          };
          r.AnnotationReplyType = w;
          var p = {
            INVISIBLE: 1,
            HIDDEN: 2,
            PRINT: 4,
            NOZOOM: 8,
            NOROTATE: 16,
            NOVIEW: 32,
            READONLY: 64,
            LOCKED: 128,
            TOGGLENOVIEW: 256,
            LOCKEDCONTENTS: 512
          };
          r.AnnotationFlag = p;
          var P = {
            READONLY: 1,
            REQUIRED: 2,
            NOEXPORT: 4,
            MULTILINE: 4096,
            PASSWORD: 8192,
            NOTOGGLETOOFF: 16384,
            RADIO: 32768,
            PUSHBUTTON: 65536,
            COMBO: 131072,
            EDIT: 262144,
            SORT: 524288,
            FILESELECT: 1048576,
            MULTISELECT: 2097152,
            DONOTSPELLCHECK: 4194304,
            DONOTSCROLL: 8388608,
            COMB: 16777216,
            RICHTEXT: 33554432,
            RADIOSINUNISON: 33554432,
            COMMITONSELCHANGE: 67108864
          };
          r.AnnotationFieldFlag = P;
          var F = {
            SOLID: 1,
            DASHED: 2,
            BEVELED: 3,
            INSET: 4,
            UNDERLINE: 5
          };
          r.AnnotationBorderStyleType = F;
          var G = {
            E: "Mouse Enter",
            X: "Mouse Exit",
            D: "Mouse Down",
            U: "Mouse Up",
            Fo: "Focus",
            Bl: "Blur",
            PO: "PageOpen",
            PC: "PageClose",
            PV: "PageVisible",
            PI: "PageInvisible",
            K: "Keystroke",
            F: "Format",
            V: "Validate",
            C: "Calculate"
          };
          r.AnnotationActionEventType = G;
          var Z = {
            WC: "WillClose",
            WS: "WillSave",
            DS: "DidSave",
            WP: "WillPrint",
            DP: "DidPrint"
          };
          r.DocumentActionEventType = Z;
          var Y = {
            O: "PageOpen",
            C: "PageClose"
          };
          r.PageActionEventType = Y;
          var de = {
            UNKNOWN: "UNKNOWN",
            FLATE: "FLATE",
            LZW: "LZW",
            DCT: "DCT",
            JPX: "JPX",
            JBIG: "JBIG",
            A85: "A85",
            AHX: "AHX",
            CCF: "CCF",
            RLX: "RLX"
          };
          r.StreamType = de;
          var Se = {
            UNKNOWN: "UNKNOWN",
            TYPE1: "TYPE1",
            TYPE1STANDARD: "TYPE1STANDARD",
            TYPE1C: "TYPE1C",
            CIDFONTTYPE0: "CIDFONTTYPE0",
            CIDFONTTYPE0C: "CIDFONTTYPE0C",
            TRUETYPE: "TRUETYPE",
            CIDFONTTYPE2: "CIDFONTTYPE2",
            TYPE3: "TYPE3",
            OPENTYPE: "OPENTYPE",
            TYPE0: "TYPE0",
            MMTYPE1: "MMTYPE1"
          };
          r.FontType = Se;
          var _e = {
            ERRORS: 0,
            WARNINGS: 1,
            INFOS: 5
          };
          r.VerbosityLevel = _e;
          var j = {
            NONE: 0,
            BINARY: 1,
            STREAM: 2
          };
          r.CMapCompressionType = j;
          var D = {
            dependency: 1,
            setLineWidth: 2,
            setLineCap: 3,
            setLineJoin: 4,
            setMiterLimit: 5,
            setDash: 6,
            setRenderingIntent: 7,
            setFlatness: 8,
            setGState: 9,
            save: 10,
            restore: 11,
            transform: 12,
            moveTo: 13,
            lineTo: 14,
            curveTo: 15,
            curveTo2: 16,
            curveTo3: 17,
            closePath: 18,
            rectangle: 19,
            stroke: 20,
            closeStroke: 21,
            fill: 22,
            eoFill: 23,
            fillStroke: 24,
            eoFillStroke: 25,
            closeFillStroke: 26,
            closeEOFillStroke: 27,
            endPath: 28,
            clip: 29,
            eoClip: 30,
            beginText: 31,
            endText: 32,
            setCharSpacing: 33,
            setWordSpacing: 34,
            setHScale: 35,
            setLeading: 36,
            setFont: 37,
            setTextRenderingMode: 38,
            setTextRise: 39,
            moveText: 40,
            setLeadingMoveText: 41,
            setTextMatrix: 42,
            nextLine: 43,
            showText: 44,
            showSpacedText: 45,
            nextLineShowText: 46,
            nextLineSetSpacingShowText: 47,
            setCharWidth: 48,
            setCharWidthAndBounds: 49,
            setStrokeColorSpace: 50,
            setFillColorSpace: 51,
            setStrokeColor: 52,
            setStrokeColorN: 53,
            setFillColor: 54,
            setFillColorN: 55,
            setStrokeGray: 56,
            setFillGray: 57,
            setStrokeRGBColor: 58,
            setFillRGBColor: 59,
            setStrokeCMYKColor: 60,
            setFillCMYKColor: 61,
            shadingFill: 62,
            beginInlineImage: 63,
            beginImageData: 64,
            endInlineImage: 65,
            paintXObject: 66,
            markPoint: 67,
            markPointProps: 68,
            beginMarkedContent: 69,
            beginMarkedContentProps: 70,
            endMarkedContent: 71,
            beginCompat: 72,
            endCompat: 73,
            paintFormXObjectBegin: 74,
            paintFormXObjectEnd: 75,
            beginGroup: 76,
            endGroup: 77,
            beginAnnotations: 78,
            endAnnotations: 79,
            beginAnnotation: 80,
            endAnnotation: 81,
            paintJpegXObject: 82,
            paintImageMaskXObject: 83,
            paintImageMaskXObjectGroup: 84,
            paintImageXObject: 85,
            paintInlineImageXObject: 86,
            paintInlineImageXObjectGroup: 87,
            paintImageXObjectRepeat: 88,
            paintImageMaskXObjectRepeat: 89,
            paintSolidColorImageMask: 90,
            constructPath: 91
          };
          r.OPS = D;
          var h = {
            unknown: "unknown",
            forms: "forms",
            javaScript: "javaScript",
            signatures: "signatures",
            smask: "smask",
            shadingPattern: "shadingPattern",
            font: "font",
            errorTilingPattern: "errorTilingPattern",
            errorExtGState: "errorExtGState",
            errorXObject: "errorXObject",
            errorFontLoadType3: "errorFontLoadType3",
            errorFontState: "errorFontState",
            errorFontMissing: "errorFontMissing",
            errorFontTranslate: "errorFontTranslate",
            errorColorSpace: "errorColorSpace",
            errorOperatorList: "errorOperatorList",
            errorFontToUnicode: "errorFontToUnicode",
            errorFontLoadNative: "errorFontLoadNative",
            errorFontBuildPath: "errorFontBuildPath",
            errorFontGetPath: "errorFontGetPath",
            errorMarkedContent: "errorMarkedContent",
            errorContentSubStream: "errorContentSubStream"
          };
          r.UNSUPPORTED_FEATURES = h;
          var d = {
            NEED_PASSWORD: 1,
            INCORRECT_PASSWORD: 2
          };
          r.PasswordResponses = d;
          var T = _e.WARNINGS;
          function B(ue) {
            Number.isInteger(ue) && (T = ue);
          }
          function z() {
            return T;
          }
          function ee(ue) {
            T >= _e.INFOS && console.log("Info: ".concat(ue));
          }
          function le(ue) {
            T >= _e.WARNINGS && console.log("Warning: ".concat(ue));
          }
          function ve(ue) {
            throw new Error(ue);
          }
          function ye(ue, Ce) {
            ue || ve(Ce);
          }
          function me(ue, Ce) {
            var se;
            try {
              if (se = new URL(ue), !se.origin || se.origin === "null")
                return !1;
            } catch {
              return !1;
            }
            var ge = new URL(Ce, se);
            return se.origin === ge.origin;
          }
          function we(ue) {
            if (!ue)
              return !1;
            switch (ue.protocol) {
              case "http:":
              case "https:":
              case "ftp:":
              case "mailto:":
              case "tel:":
                return !0;
              default:
                return !1;
            }
          }
          function Pe(ue) {
            var Ce = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : null, se = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : null;
            if (!ue)
              return null;
            try {
              if (se && typeof ue == "string") {
                if (se.addDefaultProtocol && ue.startsWith("www.")) {
                  var ge = ue.match(/\./g);
                  ge && ge.length >= 2 && (ue = "http://".concat(ue));
                }
                if (se.tryConvertEncoding)
                  try {
                    ue = mt(ue);
                  } catch {
                  }
              }
              var Ue = Ce ? new URL(ue, Ce) : new URL(ue);
              if (we(Ue))
                return Ue;
            } catch {
            }
            return null;
          }
          function Ee(ue, Ce, se) {
            return Object.defineProperty(ue, Ce, {
              value: se,
              enumerable: !0,
              configurable: !0,
              writable: !1
            }), se;
          }
          var Fe = function() {
            function Ce(se, ge) {
              this.constructor === Ce && ve("Cannot initialize BaseException."), this.message = se, this.name = ge;
            }
            return Ce.prototype = new Error(), Ce.constructor = Ce, Ce;
          }();
          r.BaseException = Fe;
          var Ie = /* @__PURE__ */ function(ue) {
            x(se, ue);
            var Ce = m(se);
            function se(ge, Ue) {
              var Ge;
              return N(this, se), Ge = Ce.call(this, ge, "PasswordException"), Ge.code = Ue, Ge;
            }
            return se;
          }(Fe);
          r.PasswordException = Ie;
          var We = /* @__PURE__ */ function(ue) {
            x(se, ue);
            var Ce = m(se);
            function se(ge, Ue) {
              var Ge;
              return N(this, se), Ge = Ce.call(this, ge, "UnknownErrorException"), Ge.details = Ue, Ge;
            }
            return se;
          }(Fe);
          r.UnknownErrorException = We;
          var je = /* @__PURE__ */ function(ue) {
            x(se, ue);
            var Ce = m(se);
            function se(ge) {
              return N(this, se), Ce.call(this, ge, "InvalidPDFException");
            }
            return se;
          }(Fe);
          r.InvalidPDFException = je;
          var fe = /* @__PURE__ */ function(ue) {
            x(se, ue);
            var Ce = m(se);
            function se(ge) {
              return N(this, se), Ce.call(this, ge, "MissingPDFException");
            }
            return se;
          }(Fe);
          r.MissingPDFException = fe;
          var he = /* @__PURE__ */ function(ue) {
            x(se, ue);
            var Ce = m(se);
            function se(ge, Ue) {
              var Ge;
              return N(this, se), Ge = Ce.call(this, ge, "UnexpectedResponseException"), Ge.status = Ue, Ge;
            }
            return se;
          }(Fe);
          r.UnexpectedResponseException = he;
          var H = /* @__PURE__ */ function(ue) {
            x(se, ue);
            var Ce = m(se);
            function se(ge) {
              return N(this, se), Ce.call(this, ge, "FormatError");
            }
            return se;
          }(Fe);
          r.FormatError = H;
          var re = /* @__PURE__ */ function(ue) {
            x(se, ue);
            var Ce = m(se);
            function se(ge) {
              return N(this, se), Ce.call(this, ge, "AbortException");
            }
            return se;
          }(Fe);
          r.AbortException = re;
          var Q = /\x00+/g, oe = /[\x01-\x1F]/g;
          function ne(ue) {
            var Ce = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !1;
            return typeof ue != "string" ? (le("The argument for removeNullCharacters must be a string."), ue) : (Ce && (ue = ue.replace(oe, " ")), ue.replace(Q, ""));
          }
          function J(ue) {
            ye(ue !== null && k(ue) === "object" && ue.length !== void 0, "Invalid argument for bytesToString");
            var Ce = ue.length, se = 8192;
            if (Ce < se)
              return String.fromCharCode.apply(null, ue);
            for (var ge = [], Ue = 0; Ue < Ce; Ue += se) {
              var Ge = Math.min(Ue + se, Ce), He = ue.subarray(Ue, Ge);
              ge.push(String.fromCharCode.apply(null, He));
            }
            return ge.join("");
          }
          function pe(ue) {
            ye(typeof ue == "string", "Invalid argument for stringToBytes");
            for (var Ce = ue.length, se = new Uint8Array(Ce), ge = 0; ge < Ce; ++ge)
              se[ge] = ue.charCodeAt(ge) & 255;
            return se;
          }
          function ce(ue) {
            return ue.length !== void 0 ? ue.length : (ye(ue.byteLength !== void 0, "arrayByteLength - invalid argument."), ue.byteLength);
          }
          function Ae(ue) {
            var Ce = ue.length;
            if (Ce === 1 && ue[0] instanceof Uint8Array)
              return ue[0];
            for (var se = 0, ge = 0; ge < Ce; ge++)
              se += ce(ue[ge]);
            for (var Ue = 0, Ge = new Uint8Array(se), He = 0; He < Ce; He++) {
              var qe = ue[He];
              qe instanceof Uint8Array || (typeof qe == "string" ? qe = pe(qe) : qe = new Uint8Array(qe));
              var nt = qe.byteLength;
              Ge.set(qe, Ue), Ue += nt;
            }
            return Ge;
          }
          function Re(ue) {
            return String.fromCharCode(ue >> 24 & 255, ue >> 16 & 255, ue >> 8 & 255, ue & 255);
          }
          function De(ue) {
            return Object.keys(ue).length;
          }
          function Le(ue) {
            var Ce = /* @__PURE__ */ Object.create(null), se = C(ue), ge;
            try {
              for (se.s(); !(ge = se.n()).done; ) {
                var Ue = g(ge.value, 2), Ge = Ue[0], He = Ue[1];
                Ce[Ge] = He;
              }
            } catch (qe) {
              se.e(qe);
            } finally {
              se.f();
            }
            return Ce;
          }
          function Te() {
            var ue = new Uint8Array(4);
            ue[0] = 1;
            var Ce = new Uint32Array(ue.buffer, 0, 1);
            return Ce[0] === 1;
          }
          var ze = {
            get value() {
              return Ee(this, "value", Te());
            }
          };
          r.IsLittleEndianCached = ze;
          function xe() {
            try {
              return new Function(""), !0;
            } catch {
              return !1;
            }
          }
          var Oe = {
            get value() {
              return Ee(this, "value", xe());
            }
          };
          r.IsEvalSupportedCached = Oe;
          var Be = i(Array(256).keys()).map(function(ue) {
            return ue.toString(16).padStart(2, "0");
          }), Ne = /* @__PURE__ */ function() {
            function ue() {
              N(this, ue);
            }
            return a(ue, null, [{
              key: "makeHexColor",
              value: function(se, ge, Ue) {
                return "#".concat(Be[se]).concat(Be[ge]).concat(Be[Ue]);
              }
            }, {
              key: "transform",
              value: function(se, ge) {
                return [se[0] * ge[0] + se[2] * ge[1], se[1] * ge[0] + se[3] * ge[1], se[0] * ge[2] + se[2] * ge[3], se[1] * ge[2] + se[3] * ge[3], se[0] * ge[4] + se[2] * ge[5] + se[4], se[1] * ge[4] + se[3] * ge[5] + se[5]];
              }
            }, {
              key: "applyTransform",
              value: function(se, ge) {
                var Ue = se[0] * ge[0] + se[1] * ge[2] + ge[4], Ge = se[0] * ge[1] + se[1] * ge[3] + ge[5];
                return [Ue, Ge];
              }
            }, {
              key: "applyInverseTransform",
              value: function(se, ge) {
                var Ue = ge[0] * ge[3] - ge[1] * ge[2], Ge = (se[0] * ge[3] - se[1] * ge[2] + ge[2] * ge[5] - ge[4] * ge[3]) / Ue, He = (-se[0] * ge[1] + se[1] * ge[0] + ge[4] * ge[1] - ge[5] * ge[0]) / Ue;
                return [Ge, He];
              }
            }, {
              key: "getAxialAlignedBoundingBox",
              value: function(se, ge) {
                var Ue = ue.applyTransform(se, ge), Ge = ue.applyTransform(se.slice(2, 4), ge), He = ue.applyTransform([se[0], se[3]], ge), qe = ue.applyTransform([se[2], se[1]], ge);
                return [Math.min(Ue[0], Ge[0], He[0], qe[0]), Math.min(Ue[1], Ge[1], He[1], qe[1]), Math.max(Ue[0], Ge[0], He[0], qe[0]), Math.max(Ue[1], Ge[1], He[1], qe[1])];
              }
            }, {
              key: "inverseTransform",
              value: function(se) {
                var ge = se[0] * se[3] - se[1] * se[2];
                return [se[3] / ge, -se[1] / ge, -se[2] / ge, se[0] / ge, (se[2] * se[5] - se[4] * se[3]) / ge, (se[4] * se[1] - se[5] * se[0]) / ge];
              }
            }, {
              key: "apply3dTransform",
              value: function(se, ge) {
                return [se[0] * ge[0] + se[1] * ge[1] + se[2] * ge[2], se[3] * ge[0] + se[4] * ge[1] + se[5] * ge[2], se[6] * ge[0] + se[7] * ge[1] + se[8] * ge[2]];
              }
            }, {
              key: "singularValueDecompose2dScale",
              value: function(se) {
                var ge = [se[0], se[2], se[1], se[3]], Ue = se[0] * ge[0] + se[1] * ge[2], Ge = se[0] * ge[1] + se[1] * ge[3], He = se[2] * ge[0] + se[3] * ge[2], qe = se[2] * ge[1] + se[3] * ge[3], nt = (Ue + qe) / 2, ot = Math.sqrt(Math.pow(Ue + qe, 2) - 4 * (Ue * qe - He * Ge)) / 2, pt = nt + ot || 1, ft = nt - ot || 1;
                return [Math.sqrt(pt), Math.sqrt(ft)];
              }
            }, {
              key: "normalizeRect",
              value: function(se) {
                var ge = se.slice(0);
                return se[0] > se[2] && (ge[0] = se[2], ge[2] = se[0]), se[1] > se[3] && (ge[1] = se[3], ge[3] = se[1]), ge;
              }
            }, {
              key: "intersect",
              value: function(se, ge) {
                function Ue(nt, ot) {
                  return nt - ot;
                }
                var Ge = [se[0], se[2], ge[0], ge[2]].sort(Ue), He = [se[1], se[3], ge[1], ge[3]].sort(Ue), qe = [];
                if (se = ue.normalizeRect(se), ge = ue.normalizeRect(ge), Ge[0] === se[0] && Ge[1] === ge[0] || Ge[0] === ge[0] && Ge[1] === se[0])
                  qe[0] = Ge[1], qe[2] = Ge[2];
                else
                  return null;
                if (He[0] === se[1] && He[1] === ge[1] || He[0] === ge[1] && He[1] === se[1])
                  qe[1] = He[1], qe[3] = He[2];
                else
                  return null;
                return qe;
              }
            }, {
              key: "bezierBoundingBox",
              value: function(se, ge, Ue, Ge, He, qe, nt, ot) {
                for (var pt = [], ft = [[], []], At, yt, It, at, jt, zt, nr, qt, Gt = 0; Gt < 2; ++Gt) {
                  if (Gt === 0 ? (yt = 6 * se - 12 * Ue + 6 * He, At = -3 * se + 9 * Ue - 9 * He + 3 * nt, It = 3 * Ue - 3 * se) : (yt = 6 * ge - 12 * Ge + 6 * qe, At = -3 * ge + 9 * Ge - 9 * qe + 3 * ot, It = 3 * Ge - 3 * ge), Math.abs(At) < 1e-12) {
                    if (Math.abs(yt) < 1e-12)
                      continue;
                    at = -It / yt, 0 < at && at < 1 && pt.push(at);
                    continue;
                  }
                  nr = yt * yt - 4 * It * At, qt = Math.sqrt(nr), !(nr < 0) && (jt = (-yt + qt) / (2 * At), 0 < jt && jt < 1 && pt.push(jt), zt = (-yt - qt) / (2 * At), 0 < zt && zt < 1 && pt.push(zt));
                }
                for (var gt = pt.length, lt, Mt = gt; gt--; )
                  at = pt[gt], lt = 1 - at, ft[0][gt] = lt * lt * lt * se + 3 * lt * lt * at * Ue + 3 * lt * at * at * He + at * at * at * nt, ft[1][gt] = lt * lt * lt * ge + 3 * lt * lt * at * Ge + 3 * lt * at * at * qe + at * at * at * ot;
                return ft[0][Mt] = se, ft[1][Mt] = ge, ft[0][Mt + 1] = nt, ft[1][Mt + 1] = ot, ft[0].length = ft[1].length = Mt + 2, [Math.min.apply(Math, i(ft[0])), Math.min.apply(Math, i(ft[1])), Math.max.apply(Math, i(ft[0])), Math.max.apply(Math, i(ft[1]))];
              }
            }]), ue;
          }();
          r.Util = Ne;
          var $e = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 728, 711, 710, 729, 733, 731, 730, 732, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 8226, 8224, 8225, 8230, 8212, 8211, 402, 8260, 8249, 8250, 8722, 8240, 8222, 8220, 8221, 8216, 8217, 8218, 8482, 64257, 64258, 321, 338, 352, 376, 381, 305, 322, 339, 353, 382, 0, 8364];
          function Xe(ue) {
            var Ce = ue.length, se = [];
            if (ue[0] === "\xFE" && ue[1] === "\xFF")
              for (var ge = 2; ge < Ce; ge += 2)
                se.push(String.fromCharCode(ue.charCodeAt(ge) << 8 | ue.charCodeAt(ge + 1)));
            else if (ue[0] === "\xFF" && ue[1] === "\xFE")
              for (var Ue = 2; Ue < Ce; Ue += 2)
                se.push(String.fromCharCode(ue.charCodeAt(Ue + 1) << 8 | ue.charCodeAt(Ue)));
            else
              for (var Ge = 0; Ge < Ce; ++Ge) {
                var He = $e[ue.charCodeAt(Ge)];
                se.push(He ? String.fromCharCode(He) : ue.charAt(Ge));
              }
            return se.join("");
          }
          function Je(ue) {
            return ue.replace(/([()\\\n\r])/g, function(Ce) {
              return Ce === `
` ? "\\n" : Ce === "\r" ? "\\r" : "\\".concat(Ce);
            });
          }
          function rt(ue) {
            return /^[\x00-\x7F]*$/.test(ue);
          }
          function it(ue) {
            for (var Ce = ["\xFE\xFF"], se = 0, ge = ue.length; se < ge; se++) {
              var Ue = ue.charCodeAt(se);
              Ce.push(String.fromCharCode(Ue >> 8 & 255), String.fromCharCode(Ue & 255));
            }
            return Ce.join("");
          }
          function mt(ue) {
            return decodeURIComponent(escape(ue));
          }
          function ht(ue) {
            return unescape(encodeURIComponent(ue));
          }
          function kt(ue) {
            return typeof ue == "boolean";
          }
          function Vt(ue) {
            return typeof ue == "number";
          }
          function xt(ue) {
            return typeof ue == "string";
          }
          function Ot(ue) {
            return k(ue) === "object" && ue !== null && ue.byteLength !== void 0;
          }
          function Ft(ue, Ce) {
            if (ue.length !== Ce.length)
              return !1;
            for (var se = 0, ge = ue.length; se < ge; se++)
              if (ue[se] !== Ce[se])
                return !1;
            return !0;
          }
          function Xt() {
            var ue = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : new Date(), Ce = [ue.getUTCFullYear().toString(), (ue.getUTCMonth() + 1).toString().padStart(2, "0"), ue.getUTCDate().toString().padStart(2, "0"), ue.getUTCHours().toString().padStart(2, "0"), ue.getUTCMinutes().toString().padStart(2, "0"), ue.getUTCSeconds().toString().padStart(2, "0")];
            return Ce.join("");
          }
          function _t() {
            var ue = /* @__PURE__ */ Object.create(null), Ce = !1;
            return Object.defineProperty(ue, "settled", {
              get: function() {
                return Ce;
              }
            }), ue.promise = new Promise(function(se, ge) {
              ue.resolve = function(Ue) {
                Ce = !0, se(Ue);
              }, ue.reject = function(Ue) {
                Ce = !0, ge(Ue);
              };
            }), ue;
          }
          function Rt(ue) {
            var Ce = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "", se = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : !1;
            if (URL.createObjectURL && typeof Blob < "u" && !se)
              return URL.createObjectURL(new Blob([ue], {
                type: Ce
              }));
            for (var ge = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=", Ue = "data:".concat(Ce, ";base64,"), Ge = 0, He = ue.length; Ge < He; Ge += 3) {
              var qe = ue[Ge] & 255, nt = ue[Ge + 1] & 255, ot = ue[Ge + 2] & 255, pt = qe >> 2, ft = (qe & 3) << 4 | nt >> 4, At = Ge + 1 < He ? (nt & 15) << 2 | ot >> 6 : 64, yt = Ge + 2 < He ? ot & 63 : 64;
              Ue += ge[pt] + ge[ft] + ge[At] + ge[yt];
            }
            return Ue;
          }
        },
        (n, r, e) => {
          var t = e(6);
          (typeof globalThis > "u" || !globalThis._pdfjsCompatibilityChecked) && ((typeof globalThis > "u" || globalThis.Math !== Math) && (globalThis = e(7)), globalThis._pdfjsCompatibilityChecked = !0, function() {
            globalThis.btoa || !t.isNodeJS || (globalThis.btoa = function(i) {
              return Buffer.from(i, "binary").toString("base64");
            });
          }(), function() {
            globalThis.atob || !t.isNodeJS || (globalThis.atob = function(i) {
              return Buffer.from(i, "base64").toString("binary");
            });
          }(), function() {
            globalThis.DOMMatrix || !t.isNodeJS || (globalThis.DOMMatrix = e(69));
          }(), function() {
            Object.fromEntries || e(70);
          }(), function() {
            globalThis.Promise.allSettled || (globalThis.Promise = e(97));
          }(), function() {
            globalThis.ReadableStream || !t.isNodeJS || (globalThis.ReadableStream = e(134).ReadableStream);
          }());
        },
        (n, r) => {
          Object.defineProperty(r, "__esModule", {
            value: !0
          }), r.isNodeJS = void 0;
          function e(a) {
            return typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? e = function(s) {
              return typeof s;
            } : e = function(s) {
              return s && typeof Symbol == "function" && s.constructor === Symbol && s !== Symbol.prototype ? "symbol" : typeof s;
            }, e(a);
          }
          var t = (typeof browser$1 > "u" ? "undefined" : e(browser$1)) === "object" && browser$1 + "" == "[object process]" && !browser$1.versions.nw && !(browser$1.versions.electron && browser$1.type && browser$1.type !== "browser");
          r.isNodeJS = t;
        },
        (n, r, e) => {
          e(8), n.exports = e(10);
        },
        (n, r, e) => {
          var t = e(9), a = e(10);
          t({ global: !0 }, { globalThis: a });
        },
        (n, r, e) => {
          var t = e(10), a = e(11).f, i = e(47), s = e(50), u = e(41), c = e(57), g = e(68);
          n.exports = function(b, A) {
            var I = b.target, C = b.global, E = b.stat, O, k, N, x, U, m;
            if (C ? k = t : E ? k = t[I] || u(I, {}) : k = (t[I] || {}).prototype, k)
              for (N in A) {
                if (U = A[N], b.noTargetGet ? (m = a(k, N), x = m && m.value) : x = k[N], O = g(C ? N : I + (E ? "." : "#") + N, b.forced), !O && x !== void 0) {
                  if (typeof U == typeof x)
                    continue;
                  c(U, x);
                }
                (b.sham || x && x.sham) && i(U, "sham", !0), s(k, N, U, b);
              }
          };
        },
        (n) => {
          var r = function(e) {
            return e && e.Math == Math && e;
          };
          n.exports = r(typeof globalThis == "object" && globalThis) || r(typeof window == "object" && window) || r(typeof self == "object" && self) || r(typeof commonjsGlobal == "object" && commonjsGlobal) || function() {
            return this;
          }() || Function("return this")();
        },
        (n, r, e) => {
          var t = e(12), a = e(14), i = e(15), s = e(16), u = e(17), c = e(22), g = e(42), b = e(45), A = Object.getOwnPropertyDescriptor;
          r.f = t ? A : function(C, E) {
            if (C = u(C), E = c(E), b)
              try {
                return A(C, E);
              } catch {
              }
            if (g(C, E))
              return s(!a(i.f, C, E), C[E]);
          };
        },
        (n, r, e) => {
          var t = e(13);
          n.exports = !t(function() {
            return Object.defineProperty({}, 1, {
              get: function() {
                return 7;
              }
            })[1] != 7;
          });
        },
        (n) => {
          n.exports = function(r) {
            try {
              return !!r();
            } catch {
              return !0;
            }
          };
        },
        (n) => {
          var r = Function.prototype.call;
          n.exports = r.bind ? r.bind(r) : function() {
            return r.apply(r, arguments);
          };
        },
        (n, r) => {
          var e = {}.propertyIsEnumerable, t = Object.getOwnPropertyDescriptor, a = t && !e.call({ 1: 2 }, 1);
          r.f = a ? function(s) {
            var u = t(this, s);
            return !!u && u.enumerable;
          } : e;
        },
        (n) => {
          n.exports = function(r, e) {
            return {
              enumerable: !(r & 1),
              configurable: !(r & 2),
              writable: !(r & 4),
              value: e
            };
          };
        },
        (n, r, e) => {
          var t = e(18), a = e(21);
          n.exports = function(i) {
            return t(a(i));
          };
        },
        (n, r, e) => {
          var t = e(10), a = e(19), i = e(13), s = e(20), u = t.Object, c = a("".split);
          n.exports = i(function() {
            return !u("z").propertyIsEnumerable(0);
          }) ? function(g) {
            return s(g) == "String" ? c(g, "") : u(g);
          } : u;
        },
        (n) => {
          var r = Function.prototype, e = r.bind, t = r.call, a = e && e.bind(t);
          n.exports = e ? function(i) {
            return i && a(t, i);
          } : function(i) {
            return i && function() {
              return t.apply(i, arguments);
            };
          };
        },
        (n, r, e) => {
          var t = e(19), a = t({}.toString), i = t("".slice);
          n.exports = function(s) {
            return i(a(s), 8, -1);
          };
        },
        (n, r, e) => {
          var t = e(10), a = t.TypeError;
          n.exports = function(i) {
            if (i == null)
              throw a("Can't call method on " + i);
            return i;
          };
        },
        (n, r, e) => {
          var t = e(23), a = e(26);
          n.exports = function(i) {
            var s = t(i, "string");
            return a(s) ? s : s + "";
          };
        },
        (n, r, e) => {
          var t = e(10), a = e(14), i = e(24), s = e(26), u = e(33), c = e(36), g = e(37), b = t.TypeError, A = g("toPrimitive");
          n.exports = function(I, C) {
            if (!i(I) || s(I))
              return I;
            var E = u(I, A), O;
            if (E) {
              if (C === void 0 && (C = "default"), O = a(E, I, C), !i(O) || s(O))
                return O;
              throw b("Can't convert object to primitive value");
            }
            return C === void 0 && (C = "number"), c(I, C);
          };
        },
        (n, r, e) => {
          var t = e(25);
          n.exports = function(a) {
            return typeof a == "object" ? a !== null : t(a);
          };
        },
        (n) => {
          n.exports = function(r) {
            return typeof r == "function";
          };
        },
        (n, r, e) => {
          var t = e(10), a = e(27), i = e(25), s = e(28), u = e(29), c = t.Object;
          n.exports = u ? function(g) {
            return typeof g == "symbol";
          } : function(g) {
            var b = a("Symbol");
            return i(b) && s(b.prototype, c(g));
          };
        },
        (n, r, e) => {
          var t = e(10), a = e(25), i = function(s) {
            return a(s) ? s : void 0;
          };
          n.exports = function(s, u) {
            return arguments.length < 2 ? i(t[s]) : t[s] && t[s][u];
          };
        },
        (n, r, e) => {
          var t = e(19);
          n.exports = t({}.isPrototypeOf);
        },
        (n, r, e) => {
          var t = e(30);
          n.exports = t && !Symbol.sham && typeof Symbol.iterator == "symbol";
        },
        (n, r, e) => {
          var t = e(31), a = e(13);
          n.exports = !!Object.getOwnPropertySymbols && !a(function() {
            var i = Symbol();
            return !String(i) || !(Object(i) instanceof Symbol) || !Symbol.sham && t && t < 41;
          });
        },
        (n, r, e) => {
          var t = e(10), a = e(32), i = t.process, s = t.Deno, u = i && i.versions || s && s.version, c = u && u.v8, g, b;
          c && (g = c.split("."), b = g[0] > 0 && g[0] < 4 ? 1 : +(g[0] + g[1])), !b && a && (g = a.match(/Edge\/(\d+)/), (!g || g[1] >= 74) && (g = a.match(/Chrome\/(\d+)/), g && (b = +g[1]))), n.exports = b;
        },
        (n, r, e) => {
          var t = e(27);
          n.exports = t("navigator", "userAgent") || "";
        },
        (n, r, e) => {
          var t = e(34);
          n.exports = function(a, i) {
            var s = a[i];
            return s == null ? void 0 : t(s);
          };
        },
        (n, r, e) => {
          var t = e(10), a = e(25), i = e(35), s = t.TypeError;
          n.exports = function(u) {
            if (a(u))
              return u;
            throw s(i(u) + " is not a function");
          };
        },
        (n, r, e) => {
          var t = e(10), a = t.String;
          n.exports = function(i) {
            try {
              return a(i);
            } catch {
              return "Object";
            }
          };
        },
        (n, r, e) => {
          var t = e(10), a = e(14), i = e(25), s = e(24), u = t.TypeError;
          n.exports = function(c, g) {
            var b, A;
            if (g === "string" && i(b = c.toString) && !s(A = a(b, c)) || i(b = c.valueOf) && !s(A = a(b, c)) || g !== "string" && i(b = c.toString) && !s(A = a(b, c)))
              return A;
            throw u("Can't convert object to primitive value");
          };
        },
        (n, r, e) => {
          var t = e(10), a = e(38), i = e(42), s = e(44), u = e(30), c = e(29), g = a("wks"), b = t.Symbol, A = b && b.for, I = c ? b : b && b.withoutSetter || s;
          n.exports = function(C) {
            if (!i(g, C) || !(u || typeof g[C] == "string")) {
              var E = "Symbol." + C;
              u && i(b, C) ? g[C] = b[C] : c && A ? g[C] = A(E) : g[C] = I(E);
            }
            return g[C];
          };
        },
        (n, r, e) => {
          var t = e(39), a = e(40);
          (n.exports = function(i, s) {
            return a[i] || (a[i] = s !== void 0 ? s : {});
          })("versions", []).push({
            version: "3.19.3",
            mode: t ? "pure" : "global",
            copyright: "\xA9 2021 Denis Pushkarev (zloirock.ru)"
          });
        },
        (n) => {
          n.exports = !1;
        },
        (n, r, e) => {
          var t = e(10), a = e(41), i = "__core-js_shared__", s = t[i] || a(i, {});
          n.exports = s;
        },
        (n, r, e) => {
          var t = e(10), a = Object.defineProperty;
          n.exports = function(i, s) {
            try {
              a(t, i, {
                value: s,
                configurable: !0,
                writable: !0
              });
            } catch {
              t[i] = s;
            }
            return s;
          };
        },
        (n, r, e) => {
          var t = e(19), a = e(43), i = t({}.hasOwnProperty);
          n.exports = Object.hasOwn || function(u, c) {
            return i(a(u), c);
          };
        },
        (n, r, e) => {
          var t = e(10), a = e(21), i = t.Object;
          n.exports = function(s) {
            return i(a(s));
          };
        },
        (n, r, e) => {
          var t = e(19), a = 0, i = Math.random(), s = t(1 .toString);
          n.exports = function(u) {
            return "Symbol(" + (u === void 0 ? "" : u) + ")_" + s(++a + i, 36);
          };
        },
        (n, r, e) => {
          var t = e(12), a = e(13), i = e(46);
          n.exports = !t && !a(function() {
            return Object.defineProperty(i("div"), "a", {
              get: function() {
                return 7;
              }
            }).a != 7;
          });
        },
        (n, r, e) => {
          var t = e(10), a = e(24), i = t.document, s = a(i) && a(i.createElement);
          n.exports = function(u) {
            return s ? i.createElement(u) : {};
          };
        },
        (n, r, e) => {
          var t = e(12), a = e(48), i = e(16);
          n.exports = t ? function(s, u, c) {
            return a.f(s, u, i(1, c));
          } : function(s, u, c) {
            return s[u] = c, s;
          };
        },
        (n, r, e) => {
          var t = e(10), a = e(12), i = e(45), s = e(49), u = e(22), c = t.TypeError, g = Object.defineProperty;
          r.f = a ? g : function(A, I, C) {
            if (s(A), I = u(I), s(C), i)
              try {
                return g(A, I, C);
              } catch {
              }
            if ("get" in C || "set" in C)
              throw c("Accessors not supported");
            return "value" in C && (A[I] = C.value), A;
          };
        },
        (n, r, e) => {
          var t = e(10), a = e(24), i = t.String, s = t.TypeError;
          n.exports = function(u) {
            if (a(u))
              return u;
            throw s(i(u) + " is not an object");
          };
        },
        (n, r, e) => {
          var t = e(10), a = e(25), i = e(42), s = e(47), u = e(41), c = e(51), g = e(52), b = e(56).CONFIGURABLE, A = g.get, I = g.enforce, C = String(String).split("String");
          (n.exports = function(E, O, k, N) {
            var x = N ? !!N.unsafe : !1, U = N ? !!N.enumerable : !1, m = N ? !!N.noTargetGet : !1, f = N && N.name !== void 0 ? N.name : O, v;
            if (a(k) && (String(f).slice(0, 7) === "Symbol(" && (f = "[" + String(f).replace(/^Symbol\(([^)]*)\)/, "$1") + "]"), (!i(k, "name") || b && k.name !== f) && s(k, "name", f), v = I(k), v.source || (v.source = C.join(typeof f == "string" ? f : ""))), E === t) {
              U ? E[O] = k : u(O, k);
              return;
            } else
              x ? !m && E[O] && (U = !0) : delete E[O];
            U ? E[O] = k : s(E, O, k);
          })(Function.prototype, "toString", function() {
            return a(this) && A(this).source || c(this);
          });
        },
        (n, r, e) => {
          var t = e(19), a = e(25), i = e(40), s = t(Function.toString);
          a(i.inspectSource) || (i.inspectSource = function(u) {
            return s(u);
          }), n.exports = i.inspectSource;
        },
        (n, r, e) => {
          var t = e(53), a = e(10), i = e(19), s = e(24), u = e(47), c = e(42), g = e(40), b = e(54), A = e(55), I = "Object already initialized", C = a.TypeError, E = a.WeakMap, O, k, N, x = function(y) {
            return N(y) ? k(y) : O(y, {});
          }, U = function(y) {
            return function(R) {
              var L;
              if (!s(R) || (L = k(R)).type !== y)
                throw C("Incompatible receiver, " + y + " required");
              return L;
            };
          };
          if (t || g.state) {
            var m = g.state || (g.state = new E()), f = i(m.get), v = i(m.has), _ = i(m.set);
            O = function(y, R) {
              if (v(m, y))
                throw new C(I);
              return R.facade = y, _(m, y, R), R;
            }, k = function(y) {
              return f(m, y) || {};
            }, N = function(y) {
              return v(m, y);
            };
          } else {
            var S = b("state");
            A[S] = !0, O = function(y, R) {
              if (c(y, S))
                throw new C(I);
              return R.facade = y, u(y, S, R), R;
            }, k = function(y) {
              return c(y, S) ? y[S] : {};
            }, N = function(y) {
              return c(y, S);
            };
          }
          n.exports = {
            set: O,
            get: k,
            has: N,
            enforce: x,
            getterFor: U
          };
        },
        (n, r, e) => {
          var t = e(10), a = e(25), i = e(51), s = t.WeakMap;
          n.exports = a(s) && /native code/.test(i(s));
        },
        (n, r, e) => {
          var t = e(38), a = e(44), i = t("keys");
          n.exports = function(s) {
            return i[s] || (i[s] = a(s));
          };
        },
        (n) => {
          n.exports = {};
        },
        (n, r, e) => {
          var t = e(12), a = e(42), i = Function.prototype, s = t && Object.getOwnPropertyDescriptor, u = a(i, "name"), c = u && function() {
          }.name === "something", g = u && (!t || t && s(i, "name").configurable);
          n.exports = {
            EXISTS: u,
            PROPER: c,
            CONFIGURABLE: g
          };
        },
        (n, r, e) => {
          var t = e(42), a = e(58), i = e(11), s = e(48);
          n.exports = function(u, c) {
            for (var g = a(c), b = s.f, A = i.f, I = 0; I < g.length; I++) {
              var C = g[I];
              t(u, C) || b(u, C, A(c, C));
            }
          };
        },
        (n, r, e) => {
          var t = e(27), a = e(19), i = e(59), s = e(67), u = e(49), c = a([].concat);
          n.exports = t("Reflect", "ownKeys") || function(b) {
            var A = i.f(u(b)), I = s.f;
            return I ? c(A, I(b)) : A;
          };
        },
        (n, r, e) => {
          var t = e(60), a = e(66), i = a.concat("length", "prototype");
          r.f = Object.getOwnPropertyNames || function(u) {
            return t(u, i);
          };
        },
        (n, r, e) => {
          var t = e(19), a = e(42), i = e(17), s = e(61).indexOf, u = e(55), c = t([].push);
          n.exports = function(g, b) {
            var A = i(g), I = 0, C = [], E;
            for (E in A)
              !a(u, E) && a(A, E) && c(C, E);
            for (; b.length > I; )
              a(A, E = b[I++]) && (~s(C, E) || c(C, E));
            return C;
          };
        },
        (n, r, e) => {
          var t = e(17), a = e(62), i = e(64), s = function(u) {
            return function(c, g, b) {
              var A = t(c), I = i(A), C = a(b, I), E;
              if (u && g != g) {
                for (; I > C; )
                  if (E = A[C++], E != E)
                    return !0;
              } else
                for (; I > C; C++)
                  if ((u || C in A) && A[C] === g)
                    return u || C || 0;
              return !u && -1;
            };
          };
          n.exports = {
            includes: s(!0),
            indexOf: s(!1)
          };
        },
        (n, r, e) => {
          var t = e(63), a = Math.max, i = Math.min;
          n.exports = function(s, u) {
            var c = t(s);
            return c < 0 ? a(c + u, 0) : i(c, u);
          };
        },
        (n) => {
          var r = Math.ceil, e = Math.floor;
          n.exports = function(t) {
            var a = +t;
            return a !== a || a === 0 ? 0 : (a > 0 ? e : r)(a);
          };
        },
        (n, r, e) => {
          var t = e(65);
          n.exports = function(a) {
            return t(a.length);
          };
        },
        (n, r, e) => {
          var t = e(63), a = Math.min;
          n.exports = function(i) {
            return i > 0 ? a(t(i), 9007199254740991) : 0;
          };
        },
        (n) => {
          n.exports = [
            "constructor",
            "hasOwnProperty",
            "isPrototypeOf",
            "propertyIsEnumerable",
            "toLocaleString",
            "toString",
            "valueOf"
          ];
        },
        (n, r) => {
          r.f = Object.getOwnPropertySymbols;
        },
        (n, r, e) => {
          var t = e(13), a = e(25), i = /#|\.prototype\./, s = function(A, I) {
            var C = c[u(A)];
            return C == b ? !0 : C == g ? !1 : a(I) ? t(I) : !!I;
          }, u = s.normalize = function(A) {
            return String(A).replace(i, ".").toLowerCase();
          }, c = s.data = {}, g = s.NATIVE = "N", b = s.POLYFILL = "P";
          n.exports = s;
        },
        (n, r, e) => {
          var t, a;
          function i(s) {
            return typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? i = function(c) {
              return typeof c;
            } : i = function(c) {
              return c && typeof Symbol == "function" && c.constructor === Symbol && c !== Symbol.prototype ? "symbol" : typeof c;
            }, i(s);
          }
          (function(s, u) {
            i(r) === "object" ? n.exports = u() : (t = u, a = typeof t == "function" ? t.call(r, e, r, n) : t, a !== void 0 && (n.exports = a));
          })(void 0, function() {
            function s(m) {
              var f = new k(), v = Array.from(m);
              if (!v.every(function(_e) {
                return !Number.isNaN(_e);
              }))
                throw TypeError('CSSMatrix: "' + m + '" must only have numbers.');
              if (v.length === 16) {
                var _ = v[0], S = v[1], y = v[2], R = v[3], L = v[4], $ = v[5], W = v[6], X = v[7], te = v[8], K = v[9], ae = v[10], V = v[11], q = v[12], w = v[13], p = v[14], P = v[15];
                f.m11 = _, f.a = _, f.m21 = L, f.c = L, f.m31 = te, f.m41 = q, f.e = q, f.m12 = S, f.b = S, f.m22 = $, f.d = $, f.m32 = K, f.m42 = w, f.f = w, f.m13 = y, f.m23 = W, f.m33 = ae, f.m43 = p, f.m14 = R, f.m24 = X, f.m34 = V, f.m44 = P;
              } else if (v.length === 6) {
                var F = v[0], G = v[1], Z = v[2], Y = v[3], de = v[4], Se = v[5];
                f.m11 = F, f.a = F, f.m12 = G, f.b = G, f.m21 = Z, f.c = Z, f.m22 = Y, f.d = Y, f.m41 = de, f.e = de, f.m42 = Se, f.f = Se;
              } else
                throw new TypeError("CSSMatrix: expecting an Array of 6/16 values.");
              return f;
            }
            function u(m) {
              var f = Object.keys(new k());
              if (i(m) === "object" && f.every(function(v) {
                return v in m;
              }))
                return s([m.m11, m.m12, m.m13, m.m14, m.m21, m.m22, m.m23, m.m24, m.m31, m.m32, m.m33, m.m34, m.m41, m.m42, m.m43, m.m44]);
              throw TypeError('CSSMatrix: "' + m + '" is not a DOMMatrix / CSSMatrix / JSON compatible object.');
            }
            function c(m) {
              if (typeof m != "string")
                throw TypeError('CSSMatrix: "' + m + '" is not a string.');
              var f = String(m).replace(/\s/g, ""), v = new k(), _ = 'CSSMatrix: invalid transform string "' + m + '"';
              return f.split(")").filter(function(S) {
                return S;
              }).forEach(function(S) {
                var y = S.split("("), R = y[0], L = y[1];
                if (!L)
                  throw TypeError(_);
                var $ = L.split(",").map(function(Y) {
                  return Y.includes("rad") ? parseFloat(Y) * (180 / Math.PI) : parseFloat(Y);
                }), W = $[0], X = $[1], te = $[2], K = $[3], ae = [W, X, te], V = [W, X, te, K];
                if (R === "perspective" && W && [X, te].every(function(Y) {
                  return Y === void 0;
                }))
                  v.m34 = -1 / W;
                else if (R.includes("matrix") && [6, 16].includes($.length) && $.every(function(Y) {
                  return !Number.isNaN(+Y);
                })) {
                  var q = $.map(function(Y) {
                    return Math.abs(Y) < 1e-6 ? 0 : Y;
                  });
                  v = v.multiply(s(q));
                } else if (R === "translate3d" && ae.every(function(Y) {
                  return !Number.isNaN(+Y);
                }))
                  v = v.translate(W, X, te);
                else if (R === "translate" && W && te === void 0)
                  v = v.translate(W, X || 0, 0);
                else if (R === "rotate3d" && V.every(function(Y) {
                  return !Number.isNaN(+Y);
                }) && K)
                  v = v.rotateAxisAngle(W, X, te, K);
                else if (R === "rotate" && W && [X, te].every(function(Y) {
                  return Y === void 0;
                }))
                  v = v.rotate(0, 0, W);
                else if (R === "scale3d" && ae.every(function(Y) {
                  return !Number.isNaN(+Y);
                }) && ae.some(function(Y) {
                  return Y !== 1;
                }))
                  v = v.scale(W, X, te);
                else if (R === "scale" && !Number.isNaN(W) && W !== 1 && te === void 0) {
                  var w = Number.isNaN(+X), p = w ? W : X;
                  v = v.scale(W, p, 1);
                } else if (R === "skew" && W && te === void 0)
                  v = v.skewX(W), v = X ? v.skewY(X) : v;
                else if (/[XYZ]/.test(R) && W && [X, te].every(function(Y) {
                  return Y === void 0;
                }) && ["translate", "rotate", "scale", "skew"].some(function(Y) {
                  return R.includes(Y);
                }))
                  if (["skewX", "skewY"].includes(R))
                    v = v[R](W);
                  else {
                    var P = R.replace(/[XYZ]/, ""), F = R.replace(P, ""), G = ["X", "Y", "Z"].indexOf(F), Z = [G === 0 ? W : 0, G === 1 ? W : 0, G === 2 ? W : 0];
                    v = v[P].apply(v, Z);
                  }
                else
                  throw TypeError(_);
              }), v;
            }
            function g(m, f, v) {
              var _ = new k();
              return _.m41 = m, _.e = m, _.m42 = f, _.f = f, _.m43 = v, _;
            }
            function b(m, f, v) {
              var _ = new k(), S = Math.PI / 180, y = m * S, R = f * S, L = v * S, $ = Math.cos(y), W = -Math.sin(y), X = Math.cos(R), te = -Math.sin(R), K = Math.cos(L), ae = -Math.sin(L), V = X * K, q = -X * ae;
              _.m11 = V, _.a = V, _.m12 = q, _.b = q, _.m13 = te;
              var w = W * te * K + $ * ae;
              _.m21 = w, _.c = w;
              var p = $ * K - W * te * ae;
              return _.m22 = p, _.d = p, _.m23 = -W * X, _.m31 = W * ae - $ * te * K, _.m32 = W * K + $ * te * ae, _.m33 = $ * X, _;
            }
            function A(m, f, v, _) {
              var S = new k(), y = _ * (Math.PI / 360), R = Math.sin(y), L = Math.cos(y), $ = R * R, W = Math.sqrt(m * m + f * f + v * v), X = m, te = f, K = v;
              W === 0 ? (X = 0, te = 0, K = 1) : (X /= W, te /= W, K /= W);
              var ae = X * X, V = te * te, q = K * K, w = 1 - 2 * (V + q) * $;
              S.m11 = w, S.a = w;
              var p = 2 * (X * te * $ + K * R * L);
              S.m12 = p, S.b = p, S.m13 = 2 * (X * K * $ - te * R * L);
              var P = 2 * (te * X * $ - K * R * L);
              S.m21 = P, S.c = P;
              var F = 1 - 2 * (q + ae) * $;
              return S.m22 = F, S.d = F, S.m23 = 2 * (te * K * $ + X * R * L), S.m31 = 2 * (K * X * $ + te * R * L), S.m32 = 2 * (K * te * $ - X * R * L), S.m33 = 1 - 2 * (ae + V) * $, S;
            }
            function I(m, f, v) {
              var _ = new k();
              return _.m11 = m, _.a = m, _.m22 = f, _.d = f, _.m33 = v, _;
            }
            function C(m) {
              var f = new k(), v = m * Math.PI / 180, _ = Math.tan(v);
              return f.m21 = _, f.c = _, f;
            }
            function E(m) {
              var f = new k(), v = m * Math.PI / 180, _ = Math.tan(v);
              return f.m12 = _, f.b = _, f;
            }
            function O(m, f) {
              var v = f.m11 * m.m11 + f.m12 * m.m21 + f.m13 * m.m31 + f.m14 * m.m41, _ = f.m11 * m.m12 + f.m12 * m.m22 + f.m13 * m.m32 + f.m14 * m.m42, S = f.m11 * m.m13 + f.m12 * m.m23 + f.m13 * m.m33 + f.m14 * m.m43, y = f.m11 * m.m14 + f.m12 * m.m24 + f.m13 * m.m34 + f.m14 * m.m44, R = f.m21 * m.m11 + f.m22 * m.m21 + f.m23 * m.m31 + f.m24 * m.m41, L = f.m21 * m.m12 + f.m22 * m.m22 + f.m23 * m.m32 + f.m24 * m.m42, $ = f.m21 * m.m13 + f.m22 * m.m23 + f.m23 * m.m33 + f.m24 * m.m43, W = f.m21 * m.m14 + f.m22 * m.m24 + f.m23 * m.m34 + f.m24 * m.m44, X = f.m31 * m.m11 + f.m32 * m.m21 + f.m33 * m.m31 + f.m34 * m.m41, te = f.m31 * m.m12 + f.m32 * m.m22 + f.m33 * m.m32 + f.m34 * m.m42, K = f.m31 * m.m13 + f.m32 * m.m23 + f.m33 * m.m33 + f.m34 * m.m43, ae = f.m31 * m.m14 + f.m32 * m.m24 + f.m33 * m.m34 + f.m34 * m.m44, V = f.m41 * m.m11 + f.m42 * m.m21 + f.m43 * m.m31 + f.m44 * m.m41, q = f.m41 * m.m12 + f.m42 * m.m22 + f.m43 * m.m32 + f.m44 * m.m42, w = f.m41 * m.m13 + f.m42 * m.m23 + f.m43 * m.m33 + f.m44 * m.m43, p = f.m41 * m.m14 + f.m42 * m.m24 + f.m43 * m.m34 + f.m44 * m.m44;
              return s([v, _, S, y, R, L, $, W, X, te, K, ae, V, q, w, p]);
            }
            var k = function() {
              for (var f = [], v = arguments.length; v--; )
                f[v] = arguments[v];
              var _ = this;
              if (_.a = 1, _.b = 0, _.c = 0, _.d = 1, _.e = 0, _.f = 0, _.m11 = 1, _.m12 = 0, _.m13 = 0, _.m14 = 0, _.m21 = 0, _.m22 = 1, _.m23 = 0, _.m24 = 0, _.m31 = 0, _.m32 = 0, _.m33 = 1, _.m34 = 0, _.m41 = 0, _.m42 = 0, _.m43 = 0, _.m44 = 1, f && f.length) {
                var S = [16, 6].some(function(y) {
                  return y === f.length;
                }) ? f : f[0];
                return _.setMatrixValue(S);
              }
              return _;
            }, N = {
              isIdentity: {
                configurable: !0
              },
              is2D: {
                configurable: !0
              }
            };
            N.isIdentity.set = function(m) {
              this.isIdentity = m;
            }, N.isIdentity.get = function() {
              var m = this;
              return m.m11 === 1 && m.m12 === 0 && m.m13 === 0 && m.m14 === 0 && m.m21 === 0 && m.m22 === 1 && m.m23 === 0 && m.m24 === 0 && m.m31 === 0 && m.m32 === 0 && m.m33 === 1 && m.m34 === 0 && m.m41 === 0 && m.m42 === 0 && m.m43 === 0 && m.m44 === 1;
            }, N.is2D.get = function() {
              var m = this;
              return m.m31 === 0 && m.m32 === 0 && m.m33 === 1 && m.m34 === 0 && m.m43 === 0 && m.m44 === 1;
            }, N.is2D.set = function(m) {
              this.is2D = m;
            }, k.prototype.setMatrixValue = function(f) {
              var v = this;
              return [Array, Float64Array, Float32Array].some(function(_) {
                return f instanceof _;
              }) ? s(f) : typeof f == "string" && f.length && f !== "none" ? c(f) : i(f) === "object" ? u(f) : v;
            }, k.prototype.toArray = function() {
              var f = this, v = Math.pow(10, 6), _;
              return f.is2D ? _ = [f.a, f.b, f.c, f.d, f.e, f.f] : _ = [f.m11, f.m12, f.m13, f.m14, f.m21, f.m22, f.m23, f.m24, f.m31, f.m32, f.m33, f.m34, f.m41, f.m42, f.m43, f.m44], _.map(function(S) {
                return Math.abs(S) < 1e-6 ? 0 : (S * v >> 0) / v;
              });
            }, k.prototype.toString = function() {
              var f = this, v = f.toArray(), _ = f.is2D ? "matrix" : "matrix3d";
              return _ + "(" + v + ")";
            }, k.prototype.toJSON = function() {
              var f = this, v = f.is2D, _ = f.isIdentity;
              return Object.assign({}, f, {
                is2D: v,
                isIdentity: _
              });
            }, k.prototype.multiply = function(f) {
              return O(this, f);
            }, k.prototype.translate = function(f, v, _) {
              var S = f, y = v, R = _;
              return R === void 0 && (R = 0), y === void 0 && (y = 0), O(this, g(S, y, R));
            }, k.prototype.scale = function(f, v, _) {
              var S = f, y = v, R = _;
              return y === void 0 && (y = f), R === void 0 && (R = 1), O(this, I(S, y, R));
            }, k.prototype.rotate = function(f, v, _) {
              var S = f, y = v, R = _;
              return y === void 0 && (y = 0), R === void 0 && (R = S, S = 0), O(this, b(S, y, R));
            }, k.prototype.rotateAxisAngle = function(f, v, _, S) {
              if ([f, v, _, S].some(function(y) {
                return Number.isNaN(y);
              }))
                throw new TypeError("CSSMatrix: expecting 4 values");
              return O(this, A(f, v, _, S));
            }, k.prototype.skewX = function(f) {
              return O(this, C(f));
            }, k.prototype.skewY = function(f) {
              return O(this, E(f));
            }, k.prototype.transformPoint = function(f) {
              var v = this, _ = g(f.x, f.y, f.z);
              return _.m44 = f.w || 1, _ = v.multiply(_), {
                x: _.m41,
                y: _.m42,
                z: _.m43,
                w: _.m44
              };
            }, k.prototype.transform = function(f) {
              var v = this, _ = v.m11 * f.x + v.m12 * f.y + v.m13 * f.z + v.m14 * f.w, S = v.m21 * f.x + v.m22 * f.y + v.m23 * f.z + v.m24 * f.w, y = v.m31 * f.x + v.m32 * f.y + v.m33 * f.z + v.m34 * f.w, R = v.m41 * f.x + v.m42 * f.y + v.m43 * f.z + v.m44 * f.w;
              return {
                x: _ / R,
                y: S / R,
                z: y / R,
                w: R
              };
            }, Object.defineProperties(k.prototype, N), Object.assign(k, {
              Translate: g,
              Rotate: b,
              RotateAxisAngle: A,
              Scale: I,
              SkewX: C,
              SkewY: E,
              Multiply: O,
              fromArray: s,
              fromMatrix: u,
              fromString: c
            });
            var x = "0.0.24", U = x;
            return Object.assign(k, {
              Version: U
            }), k;
          });
        },
        (n, r, e) => {
          e(71), e(86);
          var t = e(96);
          n.exports = t.Object.fromEntries;
        },
        (n, r, e) => {
          var t = e(17), a = e(72), i = e(77), s = e(52), u = e(78), c = "Array Iterator", g = s.set, b = s.getterFor(c);
          n.exports = u(Array, "Array", function(A, I) {
            g(this, {
              type: c,
              target: t(A),
              index: 0,
              kind: I
            });
          }, function() {
            var A = b(this), I = A.target, C = A.kind, E = A.index++;
            return !I || E >= I.length ? (A.target = void 0, {
              value: void 0,
              done: !0
            }) : C == "keys" ? {
              value: E,
              done: !1
            } : C == "values" ? {
              value: I[E],
              done: !1
            } : {
              value: [
                E,
                I[E]
              ],
              done: !1
            };
          }, "values"), i.Arguments = i.Array, a("keys"), a("values"), a("entries");
        },
        (n, r, e) => {
          var t = e(37), a = e(73), i = e(48), s = t("unscopables"), u = Array.prototype;
          u[s] == null && i.f(u, s, {
            configurable: !0,
            value: a(null)
          }), n.exports = function(c) {
            u[s][c] = !0;
          };
        },
        (n, r, e) => {
          var t = e(49), a = e(74), i = e(66), s = e(55), u = e(76), c = e(46), g = e(54), b = ">", A = "<", I = "prototype", C = "script", E = g("IE_PROTO"), O = function() {
          }, k = function(f) {
            return A + C + b + f + A + "/" + C + b;
          }, N = function(f) {
            f.write(k("")), f.close();
            var v = f.parentWindow.Object;
            return f = null, v;
          }, x = function() {
            var f = c("iframe"), v = "java" + C + ":", _;
            return f.style.display = "none", u.appendChild(f), f.src = String(v), _ = f.contentWindow.document, _.open(), _.write(k("document.F=Object")), _.close(), _.F;
          }, U, m = function() {
            try {
              U = new ActiveXObject("htmlfile");
            } catch {
            }
            m = typeof document < "u" ? document.domain && U ? N(U) : x() : N(U);
            for (var f = i.length; f--; )
              delete m[I][i[f]];
            return m();
          };
          s[E] = !0, n.exports = Object.create || function(v, _) {
            var S;
            return v !== null ? (O[I] = t(v), S = new O(), O[I] = null, S[E] = v) : S = m(), _ === void 0 ? S : a(S, _);
          };
        },
        (n, r, e) => {
          var t = e(12), a = e(48), i = e(49), s = e(17), u = e(75);
          n.exports = t ? Object.defineProperties : function(g, b) {
            i(g);
            for (var A = s(b), I = u(b), C = I.length, E = 0, O; C > E; )
              a.f(g, O = I[E++], A[O]);
            return g;
          };
        },
        (n, r, e) => {
          var t = e(60), a = e(66);
          n.exports = Object.keys || function(s) {
            return t(s, a);
          };
        },
        (n, r, e) => {
          var t = e(27);
          n.exports = t("document", "documentElement");
        },
        (n) => {
          n.exports = {};
        },
        (n, r, e) => {
          var t = e(9), a = e(14), i = e(39), s = e(56), u = e(25), c = e(79), g = e(81), b = e(84), A = e(83), I = e(47), C = e(50), E = e(37), O = e(77), k = e(80), N = s.PROPER, x = s.CONFIGURABLE, U = k.IteratorPrototype, m = k.BUGGY_SAFARI_ITERATORS, f = E("iterator"), v = "keys", _ = "values", S = "entries", y = function() {
            return this;
          };
          n.exports = function(R, L, $, W, X, te, K) {
            c($, L, W);
            var ae = function(de) {
              if (de === X && P)
                return P;
              if (!m && de in w)
                return w[de];
              switch (de) {
                case v:
                  return function() {
                    return new $(this, de);
                  };
                case _:
                  return function() {
                    return new $(this, de);
                  };
                case S:
                  return function() {
                    return new $(this, de);
                  };
              }
              return function() {
                return new $(this);
              };
            }, V = L + " Iterator", q = !1, w = R.prototype, p = w[f] || w["@@iterator"] || X && w[X], P = !m && p || ae(X), F = L == "Array" && w.entries || p, G, Z, Y;
            if (F && (G = g(F.call(new R())), G !== Object.prototype && G.next && (!i && g(G) !== U && (b ? b(G, U) : u(G[f]) || C(G, f, y)), A(G, V, !0, !0), i && (O[V] = y))), N && X == _ && p && p.name !== _ && (!i && x ? I(w, "name", _) : (q = !0, P = function() {
              return a(p, this);
            })), X)
              if (Z = {
                values: ae(_),
                keys: te ? P : ae(v),
                entries: ae(S)
              }, K)
                for (Y in Z)
                  (m || q || !(Y in w)) && C(w, Y, Z[Y]);
              else
                t({
                  target: L,
                  proto: !0,
                  forced: m || q
                }, Z);
            return (!i || K) && w[f] !== P && C(w, f, P, { name: X }), O[L] = P, Z;
          };
        },
        (n, r, e) => {
          var t = e(80).IteratorPrototype, a = e(73), i = e(16), s = e(83), u = e(77), c = function() {
            return this;
          };
          n.exports = function(g, b, A, I) {
            var C = b + " Iterator";
            return g.prototype = a(t, { next: i(+!I, A) }), s(g, C, !1, !0), u[C] = c, g;
          };
        },
        (n, r, e) => {
          var t = e(13), a = e(25), i = e(73), s = e(81), u = e(50), c = e(37), g = e(39), b = c("iterator"), A = !1, I, C, E;
          [].keys && (E = [].keys(), "next" in E ? (C = s(s(E)), C !== Object.prototype && (I = C)) : A = !0);
          var O = I == null || t(function() {
            var k = {};
            return I[b].call(k) !== k;
          });
          O ? I = {} : g && (I = i(I)), a(I[b]) || u(I, b, function() {
            return this;
          }), n.exports = {
            IteratorPrototype: I,
            BUGGY_SAFARI_ITERATORS: A
          };
        },
        (n, r, e) => {
          var t = e(10), a = e(42), i = e(25), s = e(43), u = e(54), c = e(82), g = u("IE_PROTO"), b = t.Object, A = b.prototype;
          n.exports = c ? b.getPrototypeOf : function(I) {
            var C = s(I);
            if (a(C, g))
              return C[g];
            var E = C.constructor;
            return i(E) && C instanceof E ? E.prototype : C instanceof b ? A : null;
          };
        },
        (n, r, e) => {
          var t = e(13);
          n.exports = !t(function() {
            function a() {
            }
            return a.prototype.constructor = null, Object.getPrototypeOf(new a()) !== a.prototype;
          });
        },
        (n, r, e) => {
          var t = e(48).f, a = e(42), i = e(37), s = i("toStringTag");
          n.exports = function(u, c, g) {
            u && !a(u = g ? u : u.prototype, s) && t(u, s, {
              configurable: !0,
              value: c
            });
          };
        },
        (n, r, e) => {
          var t = e(19), a = e(49), i = e(85);
          n.exports = Object.setPrototypeOf || ("__proto__" in {} ? function() {
            var s = !1, u = {}, c;
            try {
              c = t(Object.getOwnPropertyDescriptor(Object.prototype, "__proto__").set), c(u, []), s = u instanceof Array;
            } catch {
            }
            return function(b, A) {
              return a(b), i(A), s ? c(b, A) : b.__proto__ = A, b;
            };
          }() : void 0);
        },
        (n, r, e) => {
          var t = e(10), a = e(25), i = t.String, s = t.TypeError;
          n.exports = function(u) {
            if (typeof u == "object" || a(u))
              return u;
            throw s("Can't set " + i(u) + " as a prototype");
          };
        },
        (n, r, e) => {
          var t = e(9), a = e(87), i = e(95);
          t({
            target: "Object",
            stat: !0
          }, {
            fromEntries: function(u) {
              var c = {};
              return a(u, function(g, b) {
                i(c, g, b);
              }, { AS_ENTRIES: !0 }), c;
            }
          });
        },
        (n, r, e) => {
          var t = e(10), a = e(88), i = e(14), s = e(49), u = e(35), c = e(89), g = e(64), b = e(28), A = e(90), I = e(91), C = e(94), E = t.TypeError, O = function(N, x) {
            this.stopped = N, this.result = x;
          }, k = O.prototype;
          n.exports = function(N, x, U) {
            var m = U && U.that, f = !!(U && U.AS_ENTRIES), v = !!(U && U.IS_ITERATOR), _ = !!(U && U.INTERRUPTED), S = a(x, m), y, R, L, $, W, X, te, K = function(V) {
              return y && C(y, "normal", V), new O(!0, V);
            }, ae = function(V) {
              return f ? (s(V), _ ? S(V[0], V[1], K) : S(V[0], V[1])) : _ ? S(V, K) : S(V);
            };
            if (v)
              y = N;
            else {
              if (R = I(N), !R)
                throw E(u(N) + " is not iterable");
              if (c(R)) {
                for (L = 0, $ = g(N); $ > L; L++)
                  if (W = ae(N[L]), W && b(k, W))
                    return W;
                return new O(!1);
              }
              y = A(N, R);
            }
            for (X = y.next; !(te = i(X, y)).done; ) {
              try {
                W = ae(te.value);
              } catch (V) {
                C(y, "throw", V);
              }
              if (typeof W == "object" && W && b(k, W))
                return W;
            }
            return new O(!1);
          };
        },
        (n, r, e) => {
          var t = e(19), a = e(34), i = t(t.bind);
          n.exports = function(s, u) {
            return a(s), u === void 0 ? s : i ? i(s, u) : function() {
              return s.apply(u, arguments);
            };
          };
        },
        (n, r, e) => {
          var t = e(37), a = e(77), i = t("iterator"), s = Array.prototype;
          n.exports = function(u) {
            return u !== void 0 && (a.Array === u || s[i] === u);
          };
        },
        (n, r, e) => {
          var t = e(10), a = e(14), i = e(34), s = e(49), u = e(35), c = e(91), g = t.TypeError;
          n.exports = function(b, A) {
            var I = arguments.length < 2 ? c(b) : A;
            if (i(I))
              return s(a(I, b));
            throw g(u(b) + " is not iterable");
          };
        },
        (n, r, e) => {
          var t = e(92), a = e(33), i = e(77), s = e(37), u = s("iterator");
          n.exports = function(c) {
            if (c != null)
              return a(c, u) || a(c, "@@iterator") || i[t(c)];
          };
        },
        (n, r, e) => {
          var t = e(10), a = e(93), i = e(25), s = e(20), u = e(37), c = u("toStringTag"), g = t.Object, b = s(function() {
            return arguments;
          }()) == "Arguments", A = function(I, C) {
            try {
              return I[C];
            } catch {
            }
          };
          n.exports = a ? s : function(I) {
            var C, E, O;
            return I === void 0 ? "Undefined" : I === null ? "Null" : typeof (E = A(C = g(I), c)) == "string" ? E : b ? s(C) : (O = s(C)) == "Object" && i(C.callee) ? "Arguments" : O;
          };
        },
        (n, r, e) => {
          var t = e(37), a = t("toStringTag"), i = {};
          i[a] = "z", n.exports = String(i) === "[object z]";
        },
        (n, r, e) => {
          var t = e(14), a = e(49), i = e(33);
          n.exports = function(s, u, c) {
            var g, b;
            a(s);
            try {
              if (g = i(s, "return"), !g) {
                if (u === "throw")
                  throw c;
                return c;
              }
              g = t(g, s);
            } catch (A) {
              b = !0, g = A;
            }
            if (u === "throw")
              throw c;
            if (b)
              throw g;
            return a(g), c;
          };
        },
        (n, r, e) => {
          var t = e(22), a = e(48), i = e(16);
          n.exports = function(s, u, c) {
            var g = t(u);
            g in s ? a.f(s, g, i(0, c)) : s[g] = c;
          };
        },
        (n, r, e) => {
          var t = e(10);
          n.exports = t;
        },
        (n, r, e) => {
          e(98), e(71), e(105), e(107), e(129), e(130), e(131), e(132);
          var t = e(96);
          n.exports = t.Promise;
        },
        (n, r, e) => {
          var t = e(9), a = e(10), i = e(28), s = e(81), u = e(84), c = e(57), g = e(73), b = e(47), A = e(16), I = e(99), C = e(101), E = e(87), O = e(102), k = e(37), N = e(104), x = k("toStringTag"), U = a.Error, m = [].push, f = function(S, y) {
            var R = arguments.length > 2 ? arguments[2] : void 0, L = i(v, this), $;
            u ? $ = u(new U(void 0), L ? s(this) : v) : ($ = L ? this : g(v), b($, x, "Error")), b($, "message", O(y, "")), N && b($, "stack", I($.stack, 1)), C($, R);
            var W = [];
            return E(S, m, { that: W }), b($, "errors", W), $;
          };
          u ? u(f, U) : c(f, U);
          var v = f.prototype = g(U.prototype, {
            constructor: A(1, f),
            message: A(1, ""),
            name: A(1, "AggregateError")
          });
          t({ global: !0 }, { AggregateError: f });
        },
        (n, r, e) => {
          var t = e(19), a = e(100), i = t("".replace), s = t("".split), u = t([].join), c = function(I) {
            return String(Error(I).stack);
          }("zxcasd"), g = /\n\s*at [^:]*:[^\n]*/, b = g.test(c), A = /@[^\n]*\n/.test(c) && !/zxcasd/.test(c);
          n.exports = function(I, C) {
            if (typeof I != "string")
              return I;
            if (b)
              for (; C--; )
                I = i(I, g, "");
            else if (A)
              return u(a(s(I, `
`), C), `
`);
            return I;
          };
        },
        (n, r, e) => {
          var t = e(10), a = e(62), i = e(64), s = e(95), u = t.Array, c = Math.max;
          n.exports = function(g, b, A) {
            for (var I = i(g), C = a(b, I), E = a(A === void 0 ? I : A, I), O = u(c(E - C, 0)), k = 0; C < E; C++, k++)
              s(O, k, g[C]);
            return O.length = k, O;
          };
        },
        (n, r, e) => {
          var t = e(24), a = e(47);
          n.exports = function(i, s) {
            t(s) && "cause" in s && a(i, "cause", s.cause);
          };
        },
        (n, r, e) => {
          var t = e(103);
          n.exports = function(a, i) {
            return a === void 0 ? arguments.length < 2 ? "" : i : t(a);
          };
        },
        (n, r, e) => {
          var t = e(10), a = e(92), i = t.String;
          n.exports = function(s) {
            if (a(s) === "Symbol")
              throw TypeError("Cannot convert a Symbol value to a string");
            return i(s);
          };
        },
        (n, r, e) => {
          var t = e(13), a = e(16);
          n.exports = !t(function() {
            var i = Error("a");
            return "stack" in i ? (Object.defineProperty(i, "stack", a(1, 7)), i.stack !== 7) : !0;
          });
        },
        (n, r, e) => {
          var t = e(93), a = e(50), i = e(106);
          t || a(Object.prototype, "toString", i, { unsafe: !0 });
        },
        (n, r, e) => {
          var t = e(93), a = e(92);
          n.exports = t ? {}.toString : function() {
            return "[object " + a(this) + "]";
          };
        },
        (n, r, e) => {
          var t = e(9), a = e(39), i = e(10), s = e(27), u = e(14), c = e(108), g = e(50), b = e(109), A = e(84), I = e(83), C = e(110), E = e(34), O = e(25), k = e(24), N = e(111), x = e(51), U = e(87), m = e(112), f = e(113), v = e(116).set, _ = e(121), S = e(124), y = e(126), R = e(125), L = e(127), $ = e(52), W = e(68), X = e(37), te = e(128), K = e(120), ae = e(31), V = X("species"), q = "Promise", w = $.getterFor(q), p = $.set, P = $.getterFor(q), F = c && c.prototype, G = c, Z = F, Y = i.TypeError, de = i.document, Se = i.process, _e = R.f, j = _e, D = !!(de && de.createEvent && i.dispatchEvent), h = O(i.PromiseRejectionEvent), d = "unhandledrejection", T = "rejectionhandled", B = 0, z = 1, ee = 2, le = 1, ve = 2, ye = !1, me, we, Pe, Ee, Fe = W(q, function() {
            var J = x(G), pe = J !== String(G);
            if (!pe && ae === 66 || a && !Z.finally)
              return !0;
            if (ae >= 51 && /native code/.test(J))
              return !1;
            var ce = new G(function(De) {
              De(1);
            }), Ae = function(De) {
              De(function() {
              }, function() {
              });
            }, Re = ce.constructor = {};
            return Re[V] = Ae, ye = ce.then(function() {
            }) instanceof Ae, ye ? !pe && te && !h : !0;
          }), Ie = Fe || !m(function(J) {
            G.all(J).catch(function() {
            });
          }), We = function(J) {
            var pe;
            return k(J) && O(pe = J.then) ? pe : !1;
          }, je = function(J, pe) {
            if (!J.notified) {
              J.notified = !0;
              var ce = J.reactions;
              _(function() {
                for (var Ae = J.value, Re = J.state == z, De = 0; ce.length > De; ) {
                  var Le = ce[De++], Te = Re ? Le.ok : Le.fail, ze = Le.resolve, xe = Le.reject, Oe = Le.domain, Be, Ne, $e;
                  try {
                    Te ? (Re || (J.rejection === ve && re(J), J.rejection = le), Te === !0 ? Be = Ae : (Oe && Oe.enter(), Be = Te(Ae), Oe && (Oe.exit(), $e = !0)), Be === Le.promise ? xe(Y("Promise-chain cycle")) : (Ne = We(Be)) ? u(Ne, Be, ze, xe) : ze(Be)) : xe(Ae);
                  } catch (Xe) {
                    Oe && !$e && Oe.exit(), xe(Xe);
                  }
                }
                J.reactions = [], J.notified = !1, pe && !J.rejection && he(J);
              });
            }
          }, fe = function(J, pe, ce) {
            var Ae, Re;
            D ? (Ae = de.createEvent("Event"), Ae.promise = pe, Ae.reason = ce, Ae.initEvent(J, !1, !0), i.dispatchEvent(Ae)) : Ae = {
              promise: pe,
              reason: ce
            }, !h && (Re = i["on" + J]) ? Re(Ae) : J === d && y("Unhandled promise rejection", ce);
          }, he = function(J) {
            u(v, i, function() {
              var pe = J.facade, ce = J.value, Ae = H(J), Re;
              if (Ae && (Re = L(function() {
                K ? Se.emit("unhandledRejection", ce, pe) : fe(d, pe, ce);
              }), J.rejection = K || H(J) ? ve : le, Re.error))
                throw Re.value;
            });
          }, H = function(J) {
            return J.rejection !== le && !J.parent;
          }, re = function(J) {
            u(v, i, function() {
              var pe = J.facade;
              K ? Se.emit("rejectionHandled", pe) : fe(T, pe, J.value);
            });
          }, Q = function(J, pe, ce) {
            return function(Ae) {
              J(pe, Ae, ce);
            };
          }, oe = function(J, pe, ce) {
            J.done || (J.done = !0, ce && (J = ce), J.value = pe, J.state = ee, je(J, !0));
          }, ne = function(J, pe, ce) {
            if (!J.done) {
              J.done = !0, ce && (J = ce);
              try {
                if (J.facade === pe)
                  throw Y("Promise can't be resolved itself");
                var Ae = We(pe);
                Ae ? _(function() {
                  var Re = { done: !1 };
                  try {
                    u(Ae, pe, Q(ne, Re, J), Q(oe, Re, J));
                  } catch (De) {
                    oe(Re, De, J);
                  }
                }) : (J.value = pe, J.state = z, je(J, !1));
              } catch (Re) {
                oe({ done: !1 }, Re, J);
              }
            }
          };
          if (Fe && (G = function(pe) {
            N(this, Z), E(pe), u(me, this);
            var ce = w(this);
            try {
              pe(Q(ne, ce), Q(oe, ce));
            } catch (Ae) {
              oe(ce, Ae);
            }
          }, Z = G.prototype, me = function(pe) {
            p(this, {
              type: q,
              done: !1,
              notified: !1,
              parent: !1,
              reactions: [],
              rejection: !1,
              state: B,
              value: void 0
            });
          }, me.prototype = b(Z, {
            then: function(pe, ce) {
              var Ae = P(this), Re = Ae.reactions, De = _e(f(this, G));
              return De.ok = O(pe) ? pe : !0, De.fail = O(ce) && ce, De.domain = K ? Se.domain : void 0, Ae.parent = !0, Re[Re.length] = De, Ae.state != B && je(Ae, !1), De.promise;
            },
            catch: function(J) {
              return this.then(void 0, J);
            }
          }), we = function() {
            var J = new me(), pe = w(J);
            this.promise = J, this.resolve = Q(ne, pe), this.reject = Q(oe, pe);
          }, R.f = _e = function(J) {
            return J === G || J === Pe ? new we(J) : j(J);
          }, !a && O(c) && F !== Object.prototype)) {
            Ee = F.then, ye || (g(F, "then", function(pe, ce) {
              var Ae = this;
              return new G(function(Re, De) {
                u(Ee, Ae, Re, De);
              }).then(pe, ce);
            }, { unsafe: !0 }), g(F, "catch", Z.catch, { unsafe: !0 }));
            try {
              delete F.constructor;
            } catch {
            }
            A && A(F, Z);
          }
          t({
            global: !0,
            wrap: !0,
            forced: Fe
          }, { Promise: G }), I(G, q, !1, !0), C(q), Pe = s(q), t({
            target: q,
            stat: !0,
            forced: Fe
          }, {
            reject: function(pe) {
              var ce = _e(this);
              return u(ce.reject, void 0, pe), ce.promise;
            }
          }), t({
            target: q,
            stat: !0,
            forced: a || Fe
          }, {
            resolve: function(pe) {
              return S(a && this === Pe ? G : this, pe);
            }
          }), t({
            target: q,
            stat: !0,
            forced: Ie
          }, {
            all: function(pe) {
              var ce = this, Ae = _e(ce), Re = Ae.resolve, De = Ae.reject, Le = L(function() {
                var Te = E(ce.resolve), ze = [], xe = 0, Oe = 1;
                U(pe, function(Be) {
                  var Ne = xe++, $e = !1;
                  Oe++, u(Te, ce, Be).then(function(Xe) {
                    $e || ($e = !0, ze[Ne] = Xe, --Oe || Re(ze));
                  }, De);
                }), --Oe || Re(ze);
              });
              return Le.error && De(Le.value), Ae.promise;
            },
            race: function(pe) {
              var ce = this, Ae = _e(ce), Re = Ae.reject, De = L(function() {
                var Le = E(ce.resolve);
                U(pe, function(Te) {
                  u(Le, ce, Te).then(Ae.resolve, Re);
                });
              });
              return De.error && Re(De.value), Ae.promise;
            }
          });
        },
        (n, r, e) => {
          var t = e(10);
          n.exports = t.Promise;
        },
        (n, r, e) => {
          var t = e(50);
          n.exports = function(a, i, s) {
            for (var u in i)
              t(a, u, i[u], s);
            return a;
          };
        },
        (n, r, e) => {
          var t = e(27), a = e(48), i = e(37), s = e(12), u = i("species");
          n.exports = function(c) {
            var g = t(c), b = a.f;
            s && g && !g[u] && b(g, u, {
              configurable: !0,
              get: function() {
                return this;
              }
            });
          };
        },
        (n, r, e) => {
          var t = e(10), a = e(28), i = t.TypeError;
          n.exports = function(s, u) {
            if (a(u, s))
              return s;
            throw i("Incorrect invocation");
          };
        },
        (n, r, e) => {
          var t = e(37), a = t("iterator"), i = !1;
          try {
            var s = 0, u = {
              next: function() {
                return { done: !!s++ };
              },
              return: function() {
                i = !0;
              }
            };
            u[a] = function() {
              return this;
            }, Array.from(u, function() {
              throw 2;
            });
          } catch {
          }
          n.exports = function(c, g) {
            if (!g && !i)
              return !1;
            var b = !1;
            try {
              var A = {};
              A[a] = function() {
                return {
                  next: function() {
                    return { done: b = !0 };
                  }
                };
              }, c(A);
            } catch {
            }
            return b;
          };
        },
        (n, r, e) => {
          var t = e(49), a = e(114), i = e(37), s = i("species");
          n.exports = function(u, c) {
            var g = t(u).constructor, b;
            return g === void 0 || (b = t(g)[s]) == null ? c : a(b);
          };
        },
        (n, r, e) => {
          var t = e(10), a = e(115), i = e(35), s = t.TypeError;
          n.exports = function(u) {
            if (a(u))
              return u;
            throw s(i(u) + " is not a constructor");
          };
        },
        (n, r, e) => {
          var t = e(19), a = e(13), i = e(25), s = e(92), u = e(27), c = e(51), g = function() {
          }, b = [], A = u("Reflect", "construct"), I = /^\s*(?:class|function)\b/, C = t(I.exec), E = !I.exec(g), O = function(N) {
            if (!i(N))
              return !1;
            try {
              return A(g, b, N), !0;
            } catch {
              return !1;
            }
          }, k = function(N) {
            if (!i(N))
              return !1;
            switch (s(N)) {
              case "AsyncFunction":
              case "GeneratorFunction":
              case "AsyncGeneratorFunction":
                return !1;
            }
            return E || !!C(I, c(N));
          };
          n.exports = !A || a(function() {
            var N;
            return O(O.call) || !O(Object) || !O(function() {
              N = !0;
            }) || N;
          }) ? k : O;
        },
        (n, r, e) => {
          var t = e(10), a = e(117), i = e(88), s = e(25), u = e(42), c = e(13), g = e(76), b = e(118), A = e(46), I = e(119), C = e(120), E = t.setImmediate, O = t.clearImmediate, k = t.process, N = t.Dispatch, x = t.Function, U = t.MessageChannel, m = t.String, f = 0, v = {}, _ = "onreadystatechange", S, y, R, L;
          try {
            S = t.location;
          } catch {
          }
          var $ = function(K) {
            if (u(v, K)) {
              var ae = v[K];
              delete v[K], ae();
            }
          }, W = function(K) {
            return function() {
              $(K);
            };
          }, X = function(K) {
            $(K.data);
          }, te = function(K) {
            t.postMessage(m(K), S.protocol + "//" + S.host);
          };
          (!E || !O) && (E = function(ae) {
            var V = b(arguments, 1);
            return v[++f] = function() {
              a(s(ae) ? ae : x(ae), void 0, V);
            }, y(f), f;
          }, O = function(ae) {
            delete v[ae];
          }, C ? y = function(K) {
            k.nextTick(W(K));
          } : N && N.now ? y = function(K) {
            N.now(W(K));
          } : U && !I ? (R = new U(), L = R.port2, R.port1.onmessage = X, y = i(L.postMessage, L)) : t.addEventListener && s(t.postMessage) && !t.importScripts && S && S.protocol !== "file:" && !c(te) ? (y = te, t.addEventListener("message", X, !1)) : _ in A("script") ? y = function(K) {
            g.appendChild(A("script"))[_] = function() {
              g.removeChild(this), $(K);
            };
          } : y = function(K) {
            setTimeout(W(K), 0);
          }), n.exports = {
            set: E,
            clear: O
          };
        },
        (n) => {
          var r = Function.prototype, e = r.apply, t = r.bind, a = r.call;
          n.exports = typeof Reflect == "object" && Reflect.apply || (t ? a.bind(e) : function() {
            return a.apply(e, arguments);
          });
        },
        (n, r, e) => {
          var t = e(19);
          n.exports = t([].slice);
        },
        (n, r, e) => {
          var t = e(32);
          n.exports = /(?:ipad|iphone|ipod).*applewebkit/i.test(t);
        },
        (n, r, e) => {
          var t = e(20), a = e(10);
          n.exports = t(a.process) == "process";
        },
        (n, r, e) => {
          var t = e(10), a = e(88), i = e(11).f, s = e(116).set, u = e(119), c = e(122), g = e(123), b = e(120), A = t.MutationObserver || t.WebKitMutationObserver, I = t.document, C = t.process, E = t.Promise, O = i(t, "queueMicrotask"), k = O && O.value, N, x, U, m, f, v, _, S;
          k || (N = function() {
            var y, R;
            for (b && (y = C.domain) && y.exit(); x; ) {
              R = x.fn, x = x.next;
              try {
                R();
              } catch (L) {
                throw x ? m() : U = void 0, L;
              }
            }
            U = void 0, y && y.enter();
          }, !u && !b && !g && A && I ? (f = !0, v = I.createTextNode(""), new A(N).observe(v, { characterData: !0 }), m = function() {
            v.data = f = !f;
          }) : !c && E && E.resolve ? (_ = E.resolve(void 0), _.constructor = E, S = a(_.then, _), m = function() {
            S(N);
          }) : b ? m = function() {
            C.nextTick(N);
          } : (s = a(s, t), m = function() {
            s(N);
          })), n.exports = k || function(y) {
            var R = {
              fn: y,
              next: void 0
            };
            U && (U.next = R), x || (x = R, m()), U = R;
          };
        },
        (n, r, e) => {
          var t = e(32), a = e(10);
          n.exports = /ipad|iphone|ipod/i.test(t) && a.Pebble !== void 0;
        },
        (n, r, e) => {
          var t = e(32);
          n.exports = /web0s(?!.*chrome)/i.test(t);
        },
        (n, r, e) => {
          var t = e(49), a = e(24), i = e(125);
          n.exports = function(s, u) {
            if (t(s), a(u) && u.constructor === s)
              return u;
            var c = i.f(s), g = c.resolve;
            return g(u), c.promise;
          };
        },
        (n, r, e) => {
          var t = e(34), a = function(i) {
            var s, u;
            this.promise = new i(function(c, g) {
              if (s !== void 0 || u !== void 0)
                throw TypeError("Bad Promise constructor");
              s = c, u = g;
            }), this.resolve = t(s), this.reject = t(u);
          };
          n.exports.f = function(i) {
            return new a(i);
          };
        },
        (n, r, e) => {
          var t = e(10);
          n.exports = function(a, i) {
            var s = t.console;
            s && s.error && (arguments.length == 1 ? s.error(a) : s.error(a, i));
          };
        },
        (n) => {
          n.exports = function(r) {
            try {
              return {
                error: !1,
                value: r()
              };
            } catch (e) {
              return {
                error: !0,
                value: e
              };
            }
          };
        },
        (n) => {
          n.exports = typeof window == "object";
        },
        (n, r, e) => {
          var t = e(9), a = e(14), i = e(34), s = e(125), u = e(127), c = e(87);
          t({
            target: "Promise",
            stat: !0
          }, {
            allSettled: function(b) {
              var A = this, I = s.f(A), C = I.resolve, E = I.reject, O = u(function() {
                var k = i(A.resolve), N = [], x = 0, U = 1;
                c(b, function(m) {
                  var f = x++, v = !1;
                  U++, a(k, A, m).then(function(_) {
                    v || (v = !0, N[f] = {
                      status: "fulfilled",
                      value: _
                    }, --U || C(N));
                  }, function(_) {
                    v || (v = !0, N[f] = {
                      status: "rejected",
                      reason: _
                    }, --U || C(N));
                  });
                }), --U || C(N);
              });
              return O.error && E(O.value), I.promise;
            }
          });
        },
        (n, r, e) => {
          var t = e(9), a = e(34), i = e(27), s = e(14), u = e(125), c = e(127), g = e(87), b = "No one promise resolved";
          t({
            target: "Promise",
            stat: !0
          }, {
            any: function(I) {
              var C = this, E = i("AggregateError"), O = u.f(C), k = O.resolve, N = O.reject, x = c(function() {
                var U = a(C.resolve), m = [], f = 0, v = 1, _ = !1;
                g(I, function(S) {
                  var y = f++, R = !1;
                  v++, s(U, C, S).then(function(L) {
                    R || _ || (_ = !0, k(L));
                  }, function(L) {
                    R || _ || (R = !0, m[y] = L, --v || N(new E(m, b)));
                  });
                }), --v || N(new E(m, b));
              });
              return x.error && N(x.value), O.promise;
            }
          });
        },
        (n, r, e) => {
          var t = e(9), a = e(39), i = e(108), s = e(13), u = e(27), c = e(25), g = e(113), b = e(124), A = e(50), I = !!i && s(function() {
            i.prototype.finally.call({
              then: function() {
              }
            }, function() {
            });
          });
          if (t({
            target: "Promise",
            proto: !0,
            real: !0,
            forced: I
          }, {
            finally: function(E) {
              var O = g(this, u("Promise")), k = c(E);
              return this.then(k ? function(N) {
                return b(O, E()).then(function() {
                  return N;
                });
              } : E, k ? function(N) {
                return b(O, E()).then(function() {
                  throw N;
                });
              } : E);
            }
          }), !a && c(i)) {
            var C = u("Promise").prototype.finally;
            i.prototype.finally !== C && A(i.prototype, "finally", C, { unsafe: !0 });
          }
        },
        (n, r, e) => {
          var t = e(133).charAt, a = e(103), i = e(52), s = e(78), u = "String Iterator", c = i.set, g = i.getterFor(u);
          s(String, "String", function(b) {
            c(this, {
              type: u,
              string: a(b),
              index: 0
            });
          }, function() {
            var A = g(this), I = A.string, C = A.index, E;
            return C >= I.length ? {
              value: void 0,
              done: !0
            } : (E = t(I, C), A.index += E.length, {
              value: E,
              done: !1
            });
          });
        },
        (n, r, e) => {
          var t = e(19), a = e(63), i = e(103), s = e(21), u = t("".charAt), c = t("".charCodeAt), g = t("".slice), b = function(A) {
            return function(I, C) {
              var E = i(s(I)), O = a(C), k = E.length, N, x;
              return O < 0 || O >= k ? A ? "" : void 0 : (N = c(E, O), N < 55296 || N > 56319 || O + 1 === k || (x = c(E, O + 1)) < 56320 || x > 57343 ? A ? u(E, O) : N : A ? g(E, O, O + 2) : (N - 55296 << 10) + (x - 56320) + 65536);
            };
          };
          n.exports = {
            codeAt: b(!1),
            charAt: b(!0)
          };
        },
        function(n, r) {
          (function(e, t) {
            t(r);
          })(this, function(e) {
            var t = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? Symbol : function(o) {
              return "Symbol(" + o + ")";
            };
            function a() {
            }
            function i() {
              if (typeof self < "u")
                return self;
              if (typeof window < "u")
                return window;
              if (typeof commonjsGlobal < "u")
                return commonjsGlobal;
            }
            var s = i();
            function u(o) {
              return typeof o == "object" && o !== null || typeof o == "function";
            }
            var c = a, g = Promise, b = Promise.prototype.then, A = Promise.resolve.bind(g), I = Promise.reject.bind(g);
            function C(o) {
              return new g(o);
            }
            function E(o) {
              return A(o);
            }
            function O(o) {
              return I(o);
            }
            function k(o, l, M) {
              return b.call(o, l, M);
            }
            function N(o, l, M) {
              k(k(o, l, M), void 0, c);
            }
            function x(o, l) {
              N(o, l);
            }
            function U(o, l) {
              N(o, void 0, l);
            }
            function m(o, l, M) {
              return k(o, l, M);
            }
            function f(o) {
              k(o, void 0, c);
            }
            var v = function() {
              var o = s && s.queueMicrotask;
              if (typeof o == "function")
                return o;
              var l = E(void 0);
              return function(M) {
                return k(l, M);
              };
            }();
            function _(o, l, M) {
              if (typeof o != "function")
                throw new TypeError("Argument is not a function");
              return Function.prototype.apply.call(o, l, M);
            }
            function S(o, l, M) {
              try {
                return E(_(o, l, M));
              } catch (ie) {
                return O(ie);
              }
            }
            var y = 16384, R = function() {
              function o() {
                this._cursor = 0, this._size = 0, this._front = {
                  _elements: [],
                  _next: void 0
                }, this._back = this._front, this._cursor = 0, this._size = 0;
              }
              return Object.defineProperty(o.prototype, "length", {
                get: function() {
                  return this._size;
                },
                enumerable: !1,
                configurable: !0
              }), o.prototype.push = function(l) {
                var M = this._back, ie = M;
                M._elements.length === y - 1 && (ie = {
                  _elements: [],
                  _next: void 0
                }), M._elements.push(l), ie !== M && (this._back = ie, M._next = ie), ++this._size;
              }, o.prototype.shift = function() {
                var l = this._front, M = l, ie = this._cursor, be = ie + 1, ke = l._elements, Me = ke[ie];
                return be === y && (M = l._next, be = 0), --this._size, this._cursor = be, l !== M && (this._front = M), ke[ie] = void 0, Me;
              }, o.prototype.forEach = function(l) {
                for (var M = this._cursor, ie = this._front, be = ie._elements; (M !== be.length || ie._next !== void 0) && !(M === be.length && (ie = ie._next, be = ie._elements, M = 0, be.length === 0)); )
                  l(be[M]), ++M;
              }, o.prototype.peek = function() {
                var l = this._front, M = this._cursor;
                return l._elements[M];
              }, o;
            }();
            function L(o, l) {
              o._ownerReadableStream = l, l._reader = o, l._state === "readable" ? te(o) : l._state === "closed" ? ae(o) : K(o, l._storedError);
            }
            function $(o, l) {
              var M = o._ownerReadableStream;
              return bt(M, l);
            }
            function W(o) {
              o._ownerReadableStream._state === "readable" ? V(o, new TypeError("Reader was released and can no longer be used to monitor the stream's closedness")) : q(o, new TypeError("Reader was released and can no longer be used to monitor the stream's closedness")), o._ownerReadableStream._reader = void 0, o._ownerReadableStream = void 0;
            }
            function X(o) {
              return new TypeError("Cannot " + o + " a stream using a released reader");
            }
            function te(o) {
              o._closedPromise = C(function(l, M) {
                o._closedPromise_resolve = l, o._closedPromise_reject = M;
              });
            }
            function K(o, l) {
              te(o), V(o, l);
            }
            function ae(o) {
              te(o), w(o);
            }
            function V(o, l) {
              o._closedPromise_reject !== void 0 && (f(o._closedPromise), o._closedPromise_reject(l), o._closedPromise_resolve = void 0, o._closedPromise_reject = void 0);
            }
            function q(o, l) {
              K(o, l);
            }
            function w(o) {
              o._closedPromise_resolve !== void 0 && (o._closedPromise_resolve(void 0), o._closedPromise_resolve = void 0, o._closedPromise_reject = void 0);
            }
            var p = t("[[AbortSteps]]"), P = t("[[ErrorSteps]]"), F = t("[[CancelSteps]]"), G = t("[[PullSteps]]"), Z = Number.isFinite || function(o) {
              return typeof o == "number" && isFinite(o);
            }, Y = Math.trunc || function(o) {
              return o < 0 ? Math.ceil(o) : Math.floor(o);
            };
            function de(o) {
              return typeof o == "object" || typeof o == "function";
            }
            function Se(o, l) {
              if (o !== void 0 && !de(o))
                throw new TypeError(l + " is not an object.");
            }
            function _e(o, l) {
              if (typeof o != "function")
                throw new TypeError(l + " is not a function.");
            }
            function j(o) {
              return typeof o == "object" && o !== null || typeof o == "function";
            }
            function D(o, l) {
              if (!j(o))
                throw new TypeError(l + " is not an object.");
            }
            function h(o, l, M) {
              if (o === void 0)
                throw new TypeError("Parameter " + l + " is required in '" + M + "'.");
            }
            function d(o, l, M) {
              if (o === void 0)
                throw new TypeError(l + " is required in '" + M + "'.");
            }
            function T(o) {
              return Number(o);
            }
            function B(o) {
              return o === 0 ? 0 : o;
            }
            function z(o) {
              return B(Y(o));
            }
            function ee(o, l) {
              var M = 0, ie = Number.MAX_SAFE_INTEGER, be = Number(o);
              if (be = B(be), !Z(be))
                throw new TypeError(l + " is not a finite number");
              if (be = z(be), be < M || be > ie)
                throw new TypeError(l + " is outside the accepted range of " + M + " to " + ie + ", inclusive");
              return !Z(be) || be === 0 ? 0 : be;
            }
            function le(o, l) {
              if (!Nt(o))
                throw new TypeError(l + " is not a ReadableStream.");
            }
            function ve(o) {
              return new Ee(o);
            }
            function ye(o, l) {
              o._reader._readRequests.push(l);
            }
            function me(o, l, M) {
              var ie = o._reader, be = ie._readRequests.shift();
              M ? be._closeSteps() : be._chunkSteps(l);
            }
            function we(o) {
              return o._reader._readRequests.length;
            }
            function Pe(o) {
              var l = o._reader;
              return !(l === void 0 || !Fe(l));
            }
            var Ee = function() {
              function o(l) {
                if (h(l, 1, "ReadableStreamDefaultReader"), le(l, "First parameter"), Bt(l))
                  throw new TypeError("This stream has already been locked for exclusive reading by another reader");
                L(this, l), this._readRequests = new R();
              }
              return Object.defineProperty(o.prototype, "closed", {
                get: function() {
                  return Fe(this) ? this._closedPromise : O(We("closed"));
                },
                enumerable: !1,
                configurable: !0
              }), o.prototype.cancel = function(l) {
                return l === void 0 && (l = void 0), Fe(this) ? this._ownerReadableStream === void 0 ? O(X("cancel")) : $(this, l) : O(We("cancel"));
              }, o.prototype.read = function() {
                if (!Fe(this))
                  return O(We("read"));
                if (this._ownerReadableStream === void 0)
                  return O(X("read from"));
                var l, M, ie = C(function(ke, Me) {
                  l = ke, M = Me;
                }), be = {
                  _chunkSteps: function(ke) {
                    return l({
                      value: ke,
                      done: !1
                    });
                  },
                  _closeSteps: function() {
                    return l({
                      value: void 0,
                      done: !0
                    });
                  },
                  _errorSteps: function(ke) {
                    return M(ke);
                  }
                };
                return Ie(this, be), ie;
              }, o.prototype.releaseLock = function() {
                if (!Fe(this))
                  throw We("releaseLock");
                if (this._ownerReadableStream !== void 0) {
                  if (this._readRequests.length > 0)
                    throw new TypeError("Tried to release a reader lock when that reader has pending read() calls un-settled");
                  W(this);
                }
              }, o;
            }();
            Object.defineProperties(Ee.prototype, {
              cancel: { enumerable: !0 },
              read: { enumerable: !0 },
              releaseLock: { enumerable: !0 },
              closed: { enumerable: !0 }
            }), typeof t.toStringTag == "symbol" && Object.defineProperty(Ee.prototype, t.toStringTag, {
              value: "ReadableStreamDefaultReader",
              configurable: !0
            });
            function Fe(o) {
              return !u(o) || !Object.prototype.hasOwnProperty.call(o, "_readRequests") ? !1 : o instanceof Ee;
            }
            function Ie(o, l) {
              var M = o._ownerReadableStream;
              M._disturbed = !0, M._state === "closed" ? l._closeSteps() : M._state === "errored" ? l._errorSteps(M._storedError) : M._readableStreamController[G](l);
            }
            function We(o) {
              return new TypeError("ReadableStreamDefaultReader.prototype." + o + " can only be used on a ReadableStreamDefaultReader");
            }
            var je, fe;
            typeof t.asyncIterator == "symbol" && (fe = (je = {}, je[t.asyncIterator] = function() {
              return this;
            }, je), Object.defineProperty(fe, t.asyncIterator, { enumerable: !1 }));
            var he = function() {
              function o(l, M) {
                this._ongoingPromise = void 0, this._isFinished = !1, this._reader = l, this._preventCancel = M;
              }
              return o.prototype.next = function() {
                var l = this, M = function() {
                  return l._nextSteps();
                };
                return this._ongoingPromise = this._ongoingPromise ? m(this._ongoingPromise, M, M) : M(), this._ongoingPromise;
              }, o.prototype.return = function(l) {
                var M = this, ie = function() {
                  return M._returnSteps(l);
                };
                return this._ongoingPromise ? m(this._ongoingPromise, ie, ie) : ie();
              }, o.prototype._nextSteps = function() {
                var l = this;
                if (this._isFinished)
                  return Promise.resolve({
                    value: void 0,
                    done: !0
                  });
                var M = this._reader;
                if (M._ownerReadableStream === void 0)
                  return O(X("iterate"));
                var ie, be, ke = C(function(Ye, Ke) {
                  ie = Ye, be = Ke;
                }), Me = {
                  _chunkSteps: function(Ye) {
                    l._ongoingPromise = void 0, v(function() {
                      return ie({
                        value: Ye,
                        done: !1
                      });
                    });
                  },
                  _closeSteps: function() {
                    l._ongoingPromise = void 0, l._isFinished = !0, W(M), ie({
                      value: void 0,
                      done: !0
                    });
                  },
                  _errorSteps: function(Ye) {
                    l._ongoingPromise = void 0, l._isFinished = !0, W(M), be(Ye);
                  }
                };
                return Ie(M, Me), ke;
              }, o.prototype._returnSteps = function(l) {
                if (this._isFinished)
                  return Promise.resolve({
                    value: l,
                    done: !0
                  });
                this._isFinished = !0;
                var M = this._reader;
                if (M._ownerReadableStream === void 0)
                  return O(X("finish iterating"));
                if (!this._preventCancel) {
                  var ie = $(M, l);
                  return W(M), m(ie, function() {
                    return {
                      value: l,
                      done: !0
                    };
                  });
                }
                return W(M), E({
                  value: l,
                  done: !0
                });
              }, o;
            }(), H = {
              next: function() {
                return Q(this) ? this._asyncIteratorImpl.next() : O(oe("next"));
              },
              return: function(o) {
                return Q(this) ? this._asyncIteratorImpl.return(o) : O(oe("return"));
              }
            };
            fe !== void 0 && Object.setPrototypeOf(H, fe);
            function re(o, l) {
              var M = ve(o), ie = new he(M, l), be = Object.create(H);
              return be._asyncIteratorImpl = ie, be;
            }
            function Q(o) {
              if (!u(o) || !Object.prototype.hasOwnProperty.call(o, "_asyncIteratorImpl"))
                return !1;
              try {
                return o._asyncIteratorImpl instanceof he;
              } catch {
                return !1;
              }
            }
            function oe(o) {
              return new TypeError("ReadableStreamAsyncIterator." + o + " can only be used on a ReadableSteamAsyncIterator");
            }
            var ne = Number.isNaN || function(o) {
              return o !== o;
            };
            function J(o) {
              return o.slice();
            }
            function pe(o, l, M, ie, be) {
              new Uint8Array(o).set(new Uint8Array(M, ie, be), l);
            }
            function ce(o) {
              return o;
            }
            function Ae(o) {
              return !1;
            }
            function Re(o, l, M) {
              if (o.slice)
                return o.slice(l, M);
              var ie = M - l, be = new ArrayBuffer(ie);
              return pe(be, 0, o, l, ie), be;
            }
            function De(o) {
              return !(typeof o != "number" || ne(o) || o < 0);
            }
            function Le(o) {
              var l = Re(o.buffer, o.byteOffset, o.byteOffset + o.byteLength);
              return new Uint8Array(l);
            }
            function Te(o) {
              var l = o._queue.shift();
              return o._queueTotalSize -= l.size, o._queueTotalSize < 0 && (o._queueTotalSize = 0), l.value;
            }
            function ze(o, l, M) {
              if (!De(M) || M === 1 / 0)
                throw new RangeError("Size must be a finite, non-NaN, non-negative number.");
              o._queue.push({
                value: l,
                size: M
              }), o._queueTotalSize += M;
            }
            function xe(o) {
              var l = o._queue.peek();
              return l.value;
            }
            function Oe(o) {
              o._queue = new R(), o._queueTotalSize = 0;
            }
            var Be = function() {
              function o() {
                throw new TypeError("Illegal constructor");
              }
              return Object.defineProperty(o.prototype, "view", {
                get: function() {
                  if (!Xe(this))
                    throw It("view");
                  return this._view;
                },
                enumerable: !1,
                configurable: !0
              }), o.prototype.respond = function(l) {
                if (!Xe(this))
                  throw It("respond");
                if (h(l, 1, "respond"), l = ee(l, "First parameter"), this._associatedReadableByteStreamController === void 0)
                  throw new TypeError("This BYOB request has been invalidated");
                Ae(this._view.buffer), ot(this._associatedReadableByteStreamController, l);
              }, o.prototype.respondWithNewView = function(l) {
                if (!Xe(this))
                  throw It("respondWithNewView");
                if (h(l, 1, "respondWithNewView"), !ArrayBuffer.isView(l))
                  throw new TypeError("You can only respond with array buffer views");
                if (this._associatedReadableByteStreamController === void 0)
                  throw new TypeError("This BYOB request has been invalidated");
                Ae(l.buffer), pt(this._associatedReadableByteStreamController, l);
              }, o;
            }();
            Object.defineProperties(Be.prototype, {
              respond: { enumerable: !0 },
              respondWithNewView: { enumerable: !0 },
              view: { enumerable: !0 }
            }), typeof t.toStringTag == "symbol" && Object.defineProperty(Be.prototype, t.toStringTag, {
              value: "ReadableStreamBYOBRequest",
              configurable: !0
            });
            var Ne = function() {
              function o() {
                throw new TypeError("Illegal constructor");
              }
              return Object.defineProperty(o.prototype, "byobRequest", {
                get: function() {
                  if (!$e(this))
                    throw at("byobRequest");
                  return qe(this);
                },
                enumerable: !1,
                configurable: !0
              }), Object.defineProperty(o.prototype, "desiredSize", {
                get: function() {
                  if (!$e(this))
                    throw at("desiredSize");
                  return nt(this);
                },
                enumerable: !1,
                configurable: !0
              }), o.prototype.close = function() {
                if (!$e(this))
                  throw at("close");
                if (this._closeRequested)
                  throw new TypeError("The stream has already been closed; do not close it again!");
                var l = this._controlledReadableByteStream._state;
                if (l !== "readable")
                  throw new TypeError("The stream (in " + l + " state) is not in the readable state and cannot be closed");
                Ue(this);
              }, o.prototype.enqueue = function(l) {
                if (!$e(this))
                  throw at("enqueue");
                if (h(l, 1, "enqueue"), !ArrayBuffer.isView(l))
                  throw new TypeError("chunk must be an array buffer view");
                if (l.byteLength === 0)
                  throw new TypeError("chunk must have non-zero byteLength");
                if (l.buffer.byteLength === 0)
                  throw new TypeError("chunk's buffer must have non-zero byteLength");
                if (this._closeRequested)
                  throw new TypeError("stream is closed or draining");
                var M = this._controlledReadableByteStream._state;
                if (M !== "readable")
                  throw new TypeError("The stream (in " + M + " state) is not in the readable state and cannot be enqueued to");
                Ge(this, l);
              }, o.prototype.error = function(l) {
                if (l === void 0 && (l = void 0), !$e(this))
                  throw at("error");
                He(this, l);
              }, o.prototype[F] = function(l) {
                rt(this), Oe(this);
                var M = this._cancelAlgorithm(l);
                return ge(this), M;
              }, o.prototype[G] = function(l) {
                var M = this._controlledReadableByteStream;
                if (this._queueTotalSize > 0) {
                  var ie = this._queue.shift();
                  this._queueTotalSize -= ie.byteLength, xt(this);
                  var be = new Uint8Array(ie.buffer, ie.byteOffset, ie.byteLength);
                  l._chunkSteps(be);
                  return;
                }
                var ke = this._autoAllocateChunkSize;
                if (ke !== void 0) {
                  var Me = void 0;
                  try {
                    Me = new ArrayBuffer(ke);
                  } catch (Ke) {
                    l._errorSteps(Ke);
                    return;
                  }
                  var Ye = {
                    buffer: Me,
                    bufferByteLength: ke,
                    byteOffset: 0,
                    byteLength: ke,
                    bytesFilled: 0,
                    elementSize: 1,
                    viewConstructor: Uint8Array,
                    readerType: "default"
                  };
                  this._pendingPullIntos.push(Ye);
                }
                ye(M, l), Je(this);
              }, o;
            }();
            Object.defineProperties(Ne.prototype, {
              close: { enumerable: !0 },
              enqueue: { enumerable: !0 },
              error: { enumerable: !0 },
              byobRequest: { enumerable: !0 },
              desiredSize: { enumerable: !0 }
            }), typeof t.toStringTag == "symbol" && Object.defineProperty(Ne.prototype, t.toStringTag, {
              value: "ReadableByteStreamController",
              configurable: !0
            });
            function $e(o) {
              return !u(o) || !Object.prototype.hasOwnProperty.call(o, "_controlledReadableByteStream") ? !1 : o instanceof Ne;
            }
            function Xe(o) {
              return !u(o) || !Object.prototype.hasOwnProperty.call(o, "_associatedReadableByteStreamController") ? !1 : o instanceof Be;
            }
            function Je(o) {
              var l = se(o);
              if (!!l) {
                if (o._pulling) {
                  o._pullAgain = !0;
                  return;
                }
                o._pulling = !0;
                var M = o._pullAlgorithm();
                N(M, function() {
                  o._pulling = !1, o._pullAgain && (o._pullAgain = !1, Je(o));
                }, function(ie) {
                  He(o, ie);
                });
              }
            }
            function rt(o) {
              Ot(o), o._pendingPullIntos = new R();
            }
            function it(o, l) {
              var M = !1;
              o._state === "closed" && (M = !0);
              var ie = mt(l);
              l.readerType === "default" ? me(o, ie, M) : nr(o, ie, M);
            }
            function mt(o) {
              var l = o.bytesFilled, M = o.elementSize;
              return new o.viewConstructor(o.buffer, o.byteOffset, l / M);
            }
            function ht(o, l, M, ie) {
              o._queue.push({
                buffer: l,
                byteOffset: M,
                byteLength: ie
              }), o._queueTotalSize += ie;
            }
            function kt(o, l) {
              var M = l.elementSize, ie = l.bytesFilled - l.bytesFilled % M, be = Math.min(o._queueTotalSize, l.byteLength - l.bytesFilled), ke = l.bytesFilled + be, Me = ke - ke % M, Ye = be, Ke = !1;
              Me > ie && (Ye = Me - l.bytesFilled, Ke = !0);
              for (var Qe = o._queue; Ye > 0; ) {
                var Ze = Qe.peek(), et = Math.min(Ye, Ze.byteLength), ct = l.byteOffset + l.bytesFilled;
                pe(l.buffer, ct, Ze.buffer, Ze.byteOffset, et), Ze.byteLength === et ? Qe.shift() : (Ze.byteOffset += et, Ze.byteLength -= et), o._queueTotalSize -= et, Vt(o, et, l), Ye -= et;
              }
              return Ke;
            }
            function Vt(o, l, M) {
              M.bytesFilled += l;
            }
            function xt(o) {
              o._queueTotalSize === 0 && o._closeRequested ? (ge(o), cr(o._controlledReadableByteStream)) : Je(o);
            }
            function Ot(o) {
              o._byobRequest !== null && (o._byobRequest._associatedReadableByteStreamController = void 0, o._byobRequest._view = null, o._byobRequest = null);
            }
            function Ft(o) {
              for (; o._pendingPullIntos.length > 0; ) {
                if (o._queueTotalSize === 0)
                  return;
                var l = o._pendingPullIntos.peek();
                kt(o, l) && (Ce(o), it(o._controlledReadableByteStream, l));
              }
            }
            function Xt(o, l, M) {
              var ie = o._controlledReadableByteStream, be = 1;
              l.constructor !== DataView && (be = l.constructor.BYTES_PER_ELEMENT);
              var ke = l.constructor, Me = l.buffer, Ye = {
                buffer: Me,
                bufferByteLength: Me.byteLength,
                byteOffset: l.byteOffset,
                byteLength: l.byteLength,
                bytesFilled: 0,
                elementSize: be,
                viewConstructor: ke,
                readerType: "byob"
              };
              if (o._pendingPullIntos.length > 0) {
                o._pendingPullIntos.push(Ye), zt(ie, M);
                return;
              }
              if (ie._state === "closed") {
                var Ke = new ke(Ye.buffer, Ye.byteOffset, 0);
                M._closeSteps(Ke);
                return;
              }
              if (o._queueTotalSize > 0) {
                if (kt(o, Ye)) {
                  var Qe = mt(Ye);
                  xt(o), M._chunkSteps(Qe);
                  return;
                }
                if (o._closeRequested) {
                  var Ze = new TypeError("Insufficient bytes to fill elements in the given buffer");
                  He(o, Ze), M._errorSteps(Ze);
                  return;
                }
              }
              o._pendingPullIntos.push(Ye), zt(ie, M), Je(o);
            }
            function _t(o, l) {
              var M = o._controlledReadableByteStream;
              if (Gt(M))
                for (; qt(M) > 0; ) {
                  var ie = Ce(o);
                  it(M, ie);
                }
            }
            function Rt(o, l, M) {
              if (Vt(o, l, M), !(M.bytesFilled < M.elementSize)) {
                Ce(o);
                var ie = M.bytesFilled % M.elementSize;
                if (ie > 0) {
                  var be = M.byteOffset + M.bytesFilled, ke = Re(M.buffer, be - ie, be);
                  ht(o, ke, 0, ke.byteLength);
                }
                M.bytesFilled -= ie, it(o._controlledReadableByteStream, M), Ft(o);
              }
            }
            function ue(o, l) {
              var M = o._pendingPullIntos.peek();
              Ot(o);
              var ie = o._controlledReadableByteStream._state;
              ie === "closed" ? _t(o) : Rt(o, l, M), Je(o);
            }
            function Ce(o) {
              var l = o._pendingPullIntos.shift();
              return l;
            }
            function se(o) {
              var l = o._controlledReadableByteStream;
              if (l._state !== "readable" || o._closeRequested || !o._started)
                return !1;
              if (Pe(l) && we(l) > 0 || Gt(l) && qt(l) > 0)
                return !0;
              var M = nt(o);
              return M > 0;
            }
            function ge(o) {
              o._pullAlgorithm = void 0, o._cancelAlgorithm = void 0;
            }
            function Ue(o) {
              var l = o._controlledReadableByteStream;
              if (!(o._closeRequested || l._state !== "readable")) {
                if (o._queueTotalSize > 0) {
                  o._closeRequested = !0;
                  return;
                }
                if (o._pendingPullIntos.length > 0) {
                  var M = o._pendingPullIntos.peek();
                  if (M.bytesFilled > 0) {
                    var ie = new TypeError("Insufficient bytes to fill elements in the given buffer");
                    throw He(o, ie), ie;
                  }
                }
                ge(o), cr(l);
              }
            }
            function Ge(o, l) {
              var M = o._controlledReadableByteStream;
              if (!(o._closeRequested || M._state !== "readable")) {
                var ie = l.buffer, be = l.byteOffset, ke = l.byteLength, Me = ie;
                if (o._pendingPullIntos.length > 0) {
                  var Ye = o._pendingPullIntos.peek();
                  Ae(Ye.buffer), Ye.buffer = Ye.buffer;
                }
                if (Ot(o), Pe(M))
                  if (we(M) === 0)
                    ht(o, Me, be, ke);
                  else {
                    o._pendingPullIntos.length > 0 && Ce(o);
                    var Ke = new Uint8Array(Me, be, ke);
                    me(M, Ke, !1);
                  }
                else
                  Gt(M) ? (ht(o, Me, be, ke), Ft(o)) : ht(o, Me, be, ke);
                Je(o);
              }
            }
            function He(o, l) {
              var M = o._controlledReadableByteStream;
              M._state === "readable" && (rt(o), Oe(o), ge(o), Sn(M, l));
            }
            function qe(o) {
              if (o._byobRequest === null && o._pendingPullIntos.length > 0) {
                var l = o._pendingPullIntos.peek(), M = new Uint8Array(l.buffer, l.byteOffset + l.bytesFilled, l.byteLength - l.bytesFilled), ie = Object.create(Be.prototype);
                yt(ie, o, M), o._byobRequest = ie;
              }
              return o._byobRequest;
            }
            function nt(o) {
              var l = o._controlledReadableByteStream._state;
              return l === "errored" ? null : l === "closed" ? 0 : o._strategyHWM - o._queueTotalSize;
            }
            function ot(o, l) {
              var M = o._pendingPullIntos.peek(), ie = o._controlledReadableByteStream._state;
              if (ie === "closed") {
                if (l !== 0)
                  throw new TypeError("bytesWritten must be 0 when calling respond() on a closed stream");
              } else {
                if (l === 0)
                  throw new TypeError("bytesWritten must be greater than 0 when calling respond() on a readable stream");
                if (M.bytesFilled + l > M.byteLength)
                  throw new RangeError("bytesWritten out of range");
              }
              M.buffer = M.buffer, ue(o, l);
            }
            function pt(o, l) {
              var M = o._pendingPullIntos.peek(), ie = o._controlledReadableByteStream._state;
              if (ie === "closed") {
                if (l.byteLength !== 0)
                  throw new TypeError("The view's length must be 0 when calling respondWithNewView() on a closed stream");
              } else if (l.byteLength === 0)
                throw new TypeError("The view's length must be greater than 0 when calling respondWithNewView() on a readable stream");
              if (M.byteOffset + M.bytesFilled !== l.byteOffset)
                throw new RangeError("The region specified by view does not match byobRequest");
              if (M.bufferByteLength !== l.buffer.byteLength)
                throw new RangeError("The buffer of view has different capacity than byobRequest");
              if (M.bytesFilled + l.byteLength > M.byteLength)
                throw new RangeError("The region specified by view is larger than byobRequest");
              var be = l.byteLength;
              M.buffer = l.buffer, ue(o, be);
            }
            function ft(o, l, M, ie, be, ke, Me) {
              l._controlledReadableByteStream = o, l._pullAgain = !1, l._pulling = !1, l._byobRequest = null, l._queue = l._queueTotalSize = void 0, Oe(l), l._closeRequested = !1, l._started = !1, l._strategyHWM = ke, l._pullAlgorithm = ie, l._cancelAlgorithm = be, l._autoAllocateChunkSize = Me, l._pendingPullIntos = new R(), o._readableStreamController = l;
              var Ye = M();
              N(E(Ye), function() {
                l._started = !0, Je(l);
              }, function(Ke) {
                He(l, Ke);
              });
            }
            function At(o, l, M) {
              var ie = Object.create(Ne.prototype), be = function() {
              }, ke = function() {
                return E(void 0);
              }, Me = function() {
                return E(void 0);
              };
              l.start !== void 0 && (be = function() {
                return l.start(ie);
              }), l.pull !== void 0 && (ke = function() {
                return l.pull(ie);
              }), l.cancel !== void 0 && (Me = function(Ke) {
                return l.cancel(Ke);
              });
              var Ye = l.autoAllocateChunkSize;
              if (Ye === 0)
                throw new TypeError("autoAllocateChunkSize must be greater than 0");
              ft(o, ie, be, ke, Me, M, Ye);
            }
            function yt(o, l, M) {
              o._associatedReadableByteStreamController = l, o._view = M;
            }
            function It(o) {
              return new TypeError("ReadableStreamBYOBRequest.prototype." + o + " can only be used on a ReadableStreamBYOBRequest");
            }
            function at(o) {
              return new TypeError("ReadableByteStreamController.prototype." + o + " can only be used on a ReadableByteStreamController");
            }
            function jt(o) {
              return new gt(o);
            }
            function zt(o, l) {
              o._reader._readIntoRequests.push(l);
            }
            function nr(o, l, M) {
              var ie = o._reader, be = ie._readIntoRequests.shift();
              M ? be._closeSteps(l) : be._chunkSteps(l);
            }
            function qt(o) {
              return o._reader._readIntoRequests.length;
            }
            function Gt(o) {
              var l = o._reader;
              return !(l === void 0 || !lt(l));
            }
            var gt = function() {
              function o(l) {
                if (h(l, 1, "ReadableStreamBYOBReader"), le(l, "First parameter"), Bt(l))
                  throw new TypeError("This stream has already been locked for exclusive reading by another reader");
                if (!$e(l._readableStreamController))
                  throw new TypeError("Cannot construct a ReadableStreamBYOBReader for a stream not constructed with a byte source");
                L(this, l), this._readIntoRequests = new R();
              }
              return Object.defineProperty(o.prototype, "closed", {
                get: function() {
                  return lt(this) ? this._closedPromise : O(hr("closed"));
                },
                enumerable: !1,
                configurable: !0
              }), o.prototype.cancel = function(l) {
                return l === void 0 && (l = void 0), lt(this) ? this._ownerReadableStream === void 0 ? O(X("cancel")) : $(this, l) : O(hr("cancel"));
              }, o.prototype.read = function(l) {
                if (!lt(this))
                  return O(hr("read"));
                if (!ArrayBuffer.isView(l))
                  return O(new TypeError("view must be an array buffer view"));
                if (l.byteLength === 0)
                  return O(new TypeError("view must have non-zero byteLength"));
                if (l.buffer.byteLength === 0)
                  return O(new TypeError("view's buffer must have non-zero byteLength"));
                if (Ae(l.buffer), this._ownerReadableStream === void 0)
                  return O(X("read from"));
                var M, ie, be = C(function(Me, Ye) {
                  M = Me, ie = Ye;
                }), ke = {
                  _chunkSteps: function(Me) {
                    return M({
                      value: Me,
                      done: !1
                    });
                  },
                  _closeSteps: function(Me) {
                    return M({
                      value: Me,
                      done: !0
                    });
                  },
                  _errorSteps: function(Me) {
                    return ie(Me);
                  }
                };
                return Mt(this, l, ke), be;
              }, o.prototype.releaseLock = function() {
                if (!lt(this))
                  throw hr("releaseLock");
                if (this._ownerReadableStream !== void 0) {
                  if (this._readIntoRequests.length > 0)
                    throw new TypeError("Tried to release a reader lock when that reader has pending read() calls un-settled");
                  W(this);
                }
              }, o;
            }();
            Object.defineProperties(gt.prototype, {
              cancel: { enumerable: !0 },
              read: { enumerable: !0 },
              releaseLock: { enumerable: !0 },
              closed: { enumerable: !0 }
            }), typeof t.toStringTag == "symbol" && Object.defineProperty(gt.prototype, t.toStringTag, {
              value: "ReadableStreamBYOBReader",
              configurable: !0
            });
            function lt(o) {
              return !u(o) || !Object.prototype.hasOwnProperty.call(o, "_readIntoRequests") ? !1 : o instanceof gt;
            }
            function Mt(o, l, M) {
              var ie = o._ownerReadableStream;
              ie._disturbed = !0, ie._state === "errored" ? M._errorSteps(ie._storedError) : Xt(ie._readableStreamController, l, M);
            }
            function hr(o) {
              return new TypeError("ReadableStreamBYOBReader.prototype." + o + " can only be used on a ReadableStreamBYOBReader");
            }
            function ar(o, l) {
              var M = o.highWaterMark;
              if (M === void 0)
                return l;
              if (ne(M) || M < 0)
                throw new RangeError("Invalid highWaterMark");
              return M;
            }
            function pr(o) {
              var l = o.size;
              return l || function() {
                return 1;
              };
            }
            function vr(o, l) {
              Se(o, l);
              var M = o == null ? void 0 : o.highWaterMark, ie = o == null ? void 0 : o.size;
              return {
                highWaterMark: M === void 0 ? void 0 : T(M),
                size: ie === void 0 ? void 0 : Mn(ie, l + " has member 'size' that")
              };
            }
            function Mn(o, l) {
              return _e(o, l), function(M) {
                return T(o(M));
              };
            }
            function Dn(o, l) {
              Se(o, l);
              var M = o == null ? void 0 : o.abort, ie = o == null ? void 0 : o.close, be = o == null ? void 0 : o.start, ke = o == null ? void 0 : o.type, Me = o == null ? void 0 : o.write;
              return {
                abort: M === void 0 ? void 0 : Ln(M, o, l + " has member 'abort' that"),
                close: ie === void 0 ? void 0 : Nn(ie, o, l + " has member 'close' that"),
                start: be === void 0 ? void 0 : Bn(be, o, l + " has member 'start' that"),
                write: Me === void 0 ? void 0 : Wn(Me, o, l + " has member 'write' that"),
                type: ke
              };
            }
            function Ln(o, l, M) {
              return _e(o, M), function(ie) {
                return S(o, l, [ie]);
              };
            }
            function Nn(o, l, M) {
              return _e(o, M), function() {
                return S(o, l, []);
              };
            }
            function Bn(o, l, M) {
              return _e(o, M), function(ie) {
                return _(o, l, [ie]);
              };
            }
            function Wn(o, l, M) {
              return _e(o, M), function(ie, be) {
                return S(o, l, [
                  ie,
                  be
                ]);
              };
            }
            function Kr(o, l) {
              if (!Kt(o))
                throw new TypeError(l + " is not a WritableStream.");
            }
            function Un(o) {
              if (typeof o != "object" || o === null)
                return !1;
              try {
                return typeof o.aborted == "boolean";
              } catch {
                return !1;
              }
            }
            var jn = typeof AbortController == "function";
            function zn() {
              if (jn)
                return new AbortController();
            }
            var ir = function() {
              function o(l, M) {
                l === void 0 && (l = {}), M === void 0 && (M = {}), l === void 0 ? l = null : D(l, "First parameter");
                var ie = vr(M, "Second parameter"), be = Dn(l, "First parameter");
                Jr(this);
                var ke = be.type;
                if (ke !== void 0)
                  throw new RangeError("Invalid type is specified");
                var Me = pr(ie), Ye = ar(ie, 1);
                ra(this, be, Ye, Me);
              }
              return Object.defineProperty(o.prototype, "locked", {
                get: function() {
                  if (!Kt(this))
                    throw Sr("locked");
                  return Qt(this);
                },
                enumerable: !1,
                configurable: !0
              }), o.prototype.abort = function(l) {
                return l === void 0 && (l = void 0), Kt(this) ? Qt(this) ? O(new TypeError("Cannot abort a stream that already has a writer")) : mr(this, l) : O(Sr("abort"));
              }, o.prototype.close = function() {
                return Kt(this) ? Qt(this) ? O(new TypeError("Cannot close a stream that already has a writer")) : wt(this) ? O(new TypeError("Cannot close an already-closing stream")) : Zr(this) : O(Sr("close"));
              }, o.prototype.getWriter = function() {
                if (!Kt(this))
                  throw Sr("getWriter");
                return Qr(this);
              }, o;
            }();
            Object.defineProperties(ir.prototype, {
              abort: { enumerable: !0 },
              close: { enumerable: !0 },
              getWriter: { enumerable: !0 },
              locked: { enumerable: !0 }
            }), typeof t.toStringTag == "symbol" && Object.defineProperty(ir.prototype, t.toStringTag, {
              value: "WritableStream",
              configurable: !0
            });
            function Qr(o) {
              return new or(o);
            }
            function Gn(o, l, M, ie, be, ke) {
              be === void 0 && (be = 1), ke === void 0 && (ke = function() {
                return 1;
              });
              var Me = Object.create(ir.prototype);
              Jr(Me);
              var Ye = Object.create(Jt.prototype);
              return sn(Me, Ye, o, l, M, ie, be, ke), Me;
            }
            function Jr(o) {
              o._state = "writable", o._storedError = void 0, o._writer = void 0, o._writableStreamController = void 0, o._writeRequests = new R(), o._inFlightWriteRequest = void 0, o._closeRequest = void 0, o._inFlightCloseRequest = void 0, o._pendingAbortRequest = void 0, o._backpressure = !1;
            }
            function Kt(o) {
              return !u(o) || !Object.prototype.hasOwnProperty.call(o, "_writableStreamController") ? !1 : o instanceof ir;
            }
            function Qt(o) {
              return o._writer !== void 0;
            }
            function mr(o, l) {
              var M;
              if (o._state === "closed" || o._state === "errored")
                return E(void 0);
              o._writableStreamController._abortReason = l, (M = o._writableStreamController._abortController) === null || M === void 0 || M.abort();
              var ie = o._state;
              if (ie === "closed" || ie === "errored")
                return E(void 0);
              if (o._pendingAbortRequest !== void 0)
                return o._pendingAbortRequest._promise;
              var be = !1;
              ie === "erroring" && (be = !0, l = void 0);
              var ke = C(function(Me, Ye) {
                o._pendingAbortRequest = {
                  _promise: void 0,
                  _resolve: Me,
                  _reject: Ye,
                  _reason: l,
                  _wasAlreadyErroring: be
                };
              });
              return o._pendingAbortRequest._promise = ke, be || Lr(o, l), ke;
            }
            function Zr(o) {
              var l = o._state;
              if (l === "closed" || l === "errored")
                return O(new TypeError("The stream (in " + l + " state) is not in the writable state and cannot be closed"));
              var M = C(function(be, ke) {
                var Me = {
                  _resolve: be,
                  _reject: ke
                };
                o._closeRequest = Me;
              }), ie = o._writer;
              return ie !== void 0 && o._backpressure && l === "writable" && $r(ie), na(o._writableStreamController), M;
            }
            function Yn(o) {
              var l = C(function(M, ie) {
                var be = {
                  _resolve: M,
                  _reject: ie
                };
                o._writeRequests.push(be);
              });
              return l;
            }
            function Dr(o, l) {
              var M = o._state;
              if (M === "writable") {
                Lr(o, l);
                return;
              }
              Nr(o);
            }
            function Lr(o, l) {
              var M = o._writableStreamController;
              o._state = "erroring", o._storedError = l;
              var ie = o._writer;
              ie !== void 0 && tn(ie, l), !qn(o) && M._started && Nr(o);
            }
            function Nr(o) {
              o._state = "errored", o._writableStreamController[P]();
              var l = o._storedError;
              if (o._writeRequests.forEach(function(be) {
                be._reject(l);
              }), o._writeRequests = new R(), o._pendingAbortRequest === void 0) {
                yr(o);
                return;
              }
              var M = o._pendingAbortRequest;
              if (o._pendingAbortRequest = void 0, M._wasAlreadyErroring) {
                M._reject(l), yr(o);
                return;
              }
              var ie = o._writableStreamController[p](M._reason);
              N(ie, function() {
                M._resolve(), yr(o);
              }, function(be) {
                M._reject(be), yr(o);
              });
            }
            function $n(o) {
              o._inFlightWriteRequest._resolve(void 0), o._inFlightWriteRequest = void 0;
            }
            function Hn(o, l) {
              o._inFlightWriteRequest._reject(l), o._inFlightWriteRequest = void 0, Dr(o, l);
            }
            function Vn(o) {
              o._inFlightCloseRequest._resolve(void 0), o._inFlightCloseRequest = void 0;
              var l = o._state;
              l === "erroring" && (o._storedError = void 0, o._pendingAbortRequest !== void 0 && (o._pendingAbortRequest._resolve(), o._pendingAbortRequest = void 0)), o._state = "closed";
              var M = o._writer;
              M !== void 0 && fn(M);
            }
            function Xn(o, l) {
              o._inFlightCloseRequest._reject(l), o._inFlightCloseRequest = void 0, o._pendingAbortRequest !== void 0 && (o._pendingAbortRequest._reject(l), o._pendingAbortRequest = void 0), Dr(o, l);
            }
            function wt(o) {
              return !(o._closeRequest === void 0 && o._inFlightCloseRequest === void 0);
            }
            function qn(o) {
              return !(o._inFlightWriteRequest === void 0 && o._inFlightCloseRequest === void 0);
            }
            function Kn(o) {
              o._inFlightCloseRequest = o._closeRequest, o._closeRequest = void 0;
            }
            function Qn(o) {
              o._inFlightWriteRequest = o._writeRequests.shift();
            }
            function yr(o) {
              o._closeRequest !== void 0 && (o._closeRequest._reject(o._storedError), o._closeRequest = void 0);
              var l = o._writer;
              l !== void 0 && Gr(l, o._storedError);
            }
            function Br(o, l) {
              var M = o._writer;
              M !== void 0 && l !== o._backpressure && (l ? ca(M) : $r(M)), o._backpressure = l;
            }
            var or = function() {
              function o(l) {
                if (h(l, 1, "WritableStreamDefaultWriter"), Kr(l, "First parameter"), Qt(l))
                  throw new TypeError("This stream has already been locked for exclusive writing by another writer");
                this._ownerWritableStream = l, l._writer = this;
                var M = l._state;
                if (M === "writable")
                  !wt(l) && l._backpressure ? Ar(this) : dn(this), _r(this);
                else if (M === "erroring")
                  Yr(this, l._storedError), _r(this);
                else if (M === "closed")
                  dn(this), ua(this);
                else {
                  var ie = l._storedError;
                  Yr(this, ie), cn(this, ie);
                }
              }
              return Object.defineProperty(o.prototype, "closed", {
                get: function() {
                  return Yt(this) ? this._closedPromise : O($t("closed"));
                },
                enumerable: !1,
                configurable: !0
              }), Object.defineProperty(o.prototype, "desiredSize", {
                get: function() {
                  if (!Yt(this))
                    throw $t("desiredSize");
                  if (this._ownerWritableStream === void 0)
                    throw sr("desiredSize");
                  return ta(this);
                },
                enumerable: !1,
                configurable: !0
              }), Object.defineProperty(o.prototype, "ready", {
                get: function() {
                  return Yt(this) ? this._readyPromise : O($t("ready"));
                },
                enumerable: !1,
                configurable: !0
              }), o.prototype.abort = function(l) {
                return l === void 0 && (l = void 0), Yt(this) ? this._ownerWritableStream === void 0 ? O(sr("abort")) : Jn(this, l) : O($t("abort"));
              }, o.prototype.close = function() {
                if (!Yt(this))
                  return O($t("close"));
                var l = this._ownerWritableStream;
                return l === void 0 ? O(sr("close")) : wt(l) ? O(new TypeError("Cannot close an already-closing stream")) : en(this);
              }, o.prototype.releaseLock = function() {
                if (!Yt(this))
                  throw $t("releaseLock");
                var l = this._ownerWritableStream;
                l !== void 0 && rn(this);
              }, o.prototype.write = function(l) {
                return l === void 0 && (l = void 0), Yt(this) ? this._ownerWritableStream === void 0 ? O(sr("write to")) : nn(this, l) : O($t("write"));
              }, o;
            }();
            Object.defineProperties(or.prototype, {
              abort: { enumerable: !0 },
              close: { enumerable: !0 },
              releaseLock: { enumerable: !0 },
              write: { enumerable: !0 },
              closed: { enumerable: !0 },
              desiredSize: { enumerable: !0 },
              ready: { enumerable: !0 }
            }), typeof t.toStringTag == "symbol" && Object.defineProperty(or.prototype, t.toStringTag, {
              value: "WritableStreamDefaultWriter",
              configurable: !0
            });
            function Yt(o) {
              return !u(o) || !Object.prototype.hasOwnProperty.call(o, "_ownerWritableStream") ? !1 : o instanceof or;
            }
            function Jn(o, l) {
              var M = o._ownerWritableStream;
              return mr(M, l);
            }
            function en(o) {
              var l = o._ownerWritableStream;
              return Zr(l);
            }
            function Zn(o) {
              var l = o._ownerWritableStream, M = l._state;
              return wt(l) || M === "closed" ? E(void 0) : M === "errored" ? O(l._storedError) : en(o);
            }
            function ea(o, l) {
              o._closedPromiseState === "pending" ? Gr(o, l) : la(o, l);
            }
            function tn(o, l) {
              o._readyPromiseState === "pending" ? hn(o, l) : fa(o, l);
            }
            function ta(o) {
              var l = o._ownerWritableStream, M = l._state;
              return M === "errored" || M === "erroring" ? null : M === "closed" ? 0 : un(l._writableStreamController);
            }
            function rn(o) {
              var l = o._ownerWritableStream, M = new TypeError("Writer was released and can no longer be used to monitor the stream's closedness");
              tn(o, M), ea(o, M), l._writer = void 0, o._ownerWritableStream = void 0;
            }
            function nn(o, l) {
              var M = o._ownerWritableStream, ie = M._writableStreamController, be = aa(ie, l);
              if (M !== o._ownerWritableStream)
                return O(sr("write to"));
              var ke = M._state;
              if (ke === "errored")
                return O(M._storedError);
              if (wt(M) || ke === "closed")
                return O(new TypeError("The stream is closing or closed and cannot be written to"));
              if (ke === "erroring")
                return O(M._storedError);
              var Me = Yn(M);
              return ia(ie, l, be), Me;
            }
            var an = {}, Jt = function() {
              function o() {
                throw new TypeError("Illegal constructor");
              }
              return Object.defineProperty(o.prototype, "abortReason", {
                get: function() {
                  if (!Wr(this))
                    throw zr("abortReason");
                  return this._abortReason;
                },
                enumerable: !1,
                configurable: !0
              }), Object.defineProperty(o.prototype, "signal", {
                get: function() {
                  if (!Wr(this))
                    throw zr("signal");
                  if (this._abortController === void 0)
                    throw new TypeError("WritableStreamDefaultController.prototype.signal is not supported");
                  return this._abortController.signal;
                },
                enumerable: !1,
                configurable: !0
              }), o.prototype.error = function(l) {
                if (l === void 0 && (l = void 0), !Wr(this))
                  throw zr("error");
                var M = this._controlledWritableStream._state;
                M === "writable" && ln(this, l);
              }, o.prototype[p] = function(l) {
                var M = this._abortAlgorithm(l);
                return gr(this), M;
              }, o.prototype[P] = function() {
                Oe(this);
              }, o;
            }();
            Object.defineProperties(Jt.prototype, {
              abortReason: { enumerable: !0 },
              signal: { enumerable: !0 },
              error: { enumerable: !0 }
            }), typeof t.toStringTag == "symbol" && Object.defineProperty(Jt.prototype, t.toStringTag, {
              value: "WritableStreamDefaultController",
              configurable: !0
            });
            function Wr(o) {
              return !u(o) || !Object.prototype.hasOwnProperty.call(o, "_controlledWritableStream") ? !1 : o instanceof Jt;
            }
            function sn(o, l, M, ie, be, ke, Me, Ye) {
              l._controlledWritableStream = o, o._writableStreamController = l, l._queue = void 0, l._queueTotalSize = void 0, Oe(l), l._abortReason = void 0, l._abortController = zn(), l._started = !1, l._strategySizeAlgorithm = Ye, l._strategyHWM = Me, l._writeAlgorithm = ie, l._closeAlgorithm = be, l._abortAlgorithm = ke;
              var Ke = jr(l);
              Br(o, Ke);
              var Qe = M(), Ze = E(Qe);
              N(Ze, function() {
                l._started = !0, br(l);
              }, function(et) {
                l._started = !0, Dr(o, et);
              });
            }
            function ra(o, l, M, ie) {
              var be = Object.create(Jt.prototype), ke = function() {
              }, Me = function() {
                return E(void 0);
              }, Ye = function() {
                return E(void 0);
              }, Ke = function() {
                return E(void 0);
              };
              l.start !== void 0 && (ke = function() {
                return l.start(be);
              }), l.write !== void 0 && (Me = function(Qe) {
                return l.write(Qe, be);
              }), l.close !== void 0 && (Ye = function() {
                return l.close();
              }), l.abort !== void 0 && (Ke = function(Qe) {
                return l.abort(Qe);
              }), sn(o, be, ke, Me, Ye, Ke, M, ie);
            }
            function gr(o) {
              o._writeAlgorithm = void 0, o._closeAlgorithm = void 0, o._abortAlgorithm = void 0, o._strategySizeAlgorithm = void 0;
            }
            function na(o) {
              ze(o, an, 0), br(o);
            }
            function aa(o, l) {
              try {
                return o._strategySizeAlgorithm(l);
              } catch (M) {
                return Ur(o, M), 1;
              }
            }
            function un(o) {
              return o._strategyHWM - o._queueTotalSize;
            }
            function ia(o, l, M) {
              try {
                ze(o, l, M);
              } catch (ke) {
                Ur(o, ke);
                return;
              }
              var ie = o._controlledWritableStream;
              if (!wt(ie) && ie._state === "writable") {
                var be = jr(o);
                Br(ie, be);
              }
              br(o);
            }
            function br(o) {
              var l = o._controlledWritableStream;
              if (!!o._started && l._inFlightWriteRequest === void 0) {
                var M = l._state;
                if (M === "erroring") {
                  Nr(l);
                  return;
                }
                if (o._queue.length !== 0) {
                  var ie = xe(o);
                  ie === an ? oa(o) : sa(o, ie);
                }
              }
            }
            function Ur(o, l) {
              o._controlledWritableStream._state === "writable" && ln(o, l);
            }
            function oa(o) {
              var l = o._controlledWritableStream;
              Kn(l), Te(o);
              var M = o._closeAlgorithm();
              gr(o), N(M, function() {
                Vn(l);
              }, function(ie) {
                Xn(l, ie);
              });
            }
            function sa(o, l) {
              var M = o._controlledWritableStream;
              Qn(M);
              var ie = o._writeAlgorithm(l);
              N(ie, function() {
                $n(M);
                var be = M._state;
                if (Te(o), !wt(M) && be === "writable") {
                  var ke = jr(o);
                  Br(M, ke);
                }
                br(o);
              }, function(be) {
                M._state === "writable" && gr(o), Hn(M, be);
              });
            }
            function jr(o) {
              var l = un(o);
              return l <= 0;
            }
            function ln(o, l) {
              var M = o._controlledWritableStream;
              gr(o), Lr(M, l);
            }
            function Sr(o) {
              return new TypeError("WritableStream.prototype." + o + " can only be used on a WritableStream");
            }
            function zr(o) {
              return new TypeError("WritableStreamDefaultController.prototype." + o + " can only be used on a WritableStreamDefaultController");
            }
            function $t(o) {
              return new TypeError("WritableStreamDefaultWriter.prototype." + o + " can only be used on a WritableStreamDefaultWriter");
            }
            function sr(o) {
              return new TypeError("Cannot " + o + " a stream using a released writer");
            }
            function _r(o) {
              o._closedPromise = C(function(l, M) {
                o._closedPromise_resolve = l, o._closedPromise_reject = M, o._closedPromiseState = "pending";
              });
            }
            function cn(o, l) {
              _r(o), Gr(o, l);
            }
            function ua(o) {
              _r(o), fn(o);
            }
            function Gr(o, l) {
              o._closedPromise_reject !== void 0 && (f(o._closedPromise), o._closedPromise_reject(l), o._closedPromise_resolve = void 0, o._closedPromise_reject = void 0, o._closedPromiseState = "rejected");
            }
            function la(o, l) {
              cn(o, l);
            }
            function fn(o) {
              o._closedPromise_resolve !== void 0 && (o._closedPromise_resolve(void 0), o._closedPromise_resolve = void 0, o._closedPromise_reject = void 0, o._closedPromiseState = "resolved");
            }
            function Ar(o) {
              o._readyPromise = C(function(l, M) {
                o._readyPromise_resolve = l, o._readyPromise_reject = M;
              }), o._readyPromiseState = "pending";
            }
            function Yr(o, l) {
              Ar(o), hn(o, l);
            }
            function dn(o) {
              Ar(o), $r(o);
            }
            function hn(o, l) {
              o._readyPromise_reject !== void 0 && (f(o._readyPromise), o._readyPromise_reject(l), o._readyPromise_resolve = void 0, o._readyPromise_reject = void 0, o._readyPromiseState = "rejected");
            }
            function ca(o) {
              Ar(o);
            }
            function fa(o, l) {
              Yr(o, l);
            }
            function $r(o) {
              o._readyPromise_resolve !== void 0 && (o._readyPromise_resolve(void 0), o._readyPromise_resolve = void 0, o._readyPromise_reject = void 0, o._readyPromiseState = "fulfilled");
            }
            var pn = typeof DOMException < "u" ? DOMException : void 0;
            function da(o) {
              if (!(typeof o == "function" || typeof o == "object"))
                return !1;
              try {
                return new o(), !0;
              } catch {
                return !1;
              }
            }
            function ha() {
              var o = function(M, ie) {
                this.message = M || "", this.name = ie || "Error", Error.captureStackTrace && Error.captureStackTrace(this, this.constructor);
              };
              return o.prototype = Object.create(Error.prototype), Object.defineProperty(o.prototype, "constructor", {
                value: o,
                writable: !0,
                configurable: !0
              }), o;
            }
            var pa = da(pn) ? pn : ha();
            function vn(o, l, M, ie, be, ke) {
              var Me = ve(o), Ye = Qr(l);
              o._disturbed = !0;
              var Ke = !1, Qe = E(void 0);
              return C(function(Ze, et) {
                var ct;
                if (ke !== void 0) {
                  if (ct = function() {
                    var Ve = new pa("Aborted", "AbortError"), tt = [];
                    ie || tt.push(function() {
                      return l._state === "writable" ? mr(l, Ve) : E(void 0);
                    }), be || tt.push(function() {
                      return o._state === "readable" ? bt(o, Ve) : E(void 0);
                    }), vt(function() {
                      return Promise.all(tt.map(function(ut) {
                        return ut();
                      }));
                    }, !0, Ve);
                  }, ke.aborted) {
                    ct();
                    return;
                  }
                  ke.addEventListener("abort", ct);
                }
                function St() {
                  return C(function(Ve, tt) {
                    function ut(Ct) {
                      Ct ? Ve() : k(tr(), ut, tt);
                    }
                    ut(!1);
                  });
                }
                function tr() {
                  return Ke ? E(!0) : k(Ye._readyPromise, function() {
                    return C(function(Ve, tt) {
                      Ie(Me, {
                        _chunkSteps: function(ut) {
                          Qe = k(nn(Ye, ut), void 0, a), Ve(!1);
                        },
                        _closeSteps: function() {
                          return Ve(!0);
                        },
                        _errorSteps: tt
                      });
                    });
                  });
                }
                if (dt(o, Me._closedPromise, function(Ve) {
                  ie ? Et(!0, Ve) : vt(function() {
                    return mr(l, Ve);
                  }, !0, Ve);
                }), dt(l, Ye._closedPromise, function(Ve) {
                  be ? Et(!0, Ve) : vt(function() {
                    return bt(o, Ve);
                  }, !0, Ve);
                }), Pt(o, Me._closedPromise, function() {
                  M ? Et() : vt(function() {
                    return Zn(Ye);
                  });
                }), wt(l) || l._state === "closed") {
                  var Wt = new TypeError("the destination writable stream closed before all data could be piped to it");
                  be ? Et(!0, Wt) : vt(function() {
                    return bt(o, Wt);
                  }, !0, Wt);
                }
                f(St());
                function Tt() {
                  var Ve = Qe;
                  return k(Qe, function() {
                    return Ve !== Qe ? Tt() : void 0;
                  });
                }
                function dt(Ve, tt, ut) {
                  Ve._state === "errored" ? ut(Ve._storedError) : U(tt, ut);
                }
                function Pt(Ve, tt, ut) {
                  Ve._state === "closed" ? ut() : x(tt, ut);
                }
                function vt(Ve, tt, ut) {
                  if (Ke)
                    return;
                  Ke = !0, l._state === "writable" && !wt(l) ? x(Tt(), Ct) : Ct();
                  function Ct() {
                    N(Ve(), function() {
                      return st(tt, ut);
                    }, function(Ut) {
                      return st(!0, Ut);
                    });
                  }
                }
                function Et(Ve, tt) {
                  Ke || (Ke = !0, l._state === "writable" && !wt(l) ? x(Tt(), function() {
                    return st(Ve, tt);
                  }) : st(Ve, tt));
                }
                function st(Ve, tt) {
                  rn(Ye), W(Me), ke !== void 0 && ke.removeEventListener("abort", ct), Ve ? et(tt) : Ze(void 0);
                }
              });
            }
            var Zt = function() {
              function o() {
                throw new TypeError("Illegal constructor");
              }
              return Object.defineProperty(o.prototype, "desiredSize", {
                get: function() {
                  if (!wr(this))
                    throw Cr("desiredSize");
                  return Hr(this);
                },
                enumerable: !1,
                configurable: !0
              }), o.prototype.close = function() {
                if (!wr(this))
                  throw Cr("close");
                if (!er(this))
                  throw new TypeError("The stream is not in a state that permits close");
                lr(this);
              }, o.prototype.enqueue = function(l) {
                if (l === void 0 && (l = void 0), !wr(this))
                  throw Cr("enqueue");
                if (!er(this))
                  throw new TypeError("The stream is not in a state that permits enqueue");
                return Pr(this, l);
              }, o.prototype.error = function(l) {
                if (l === void 0 && (l = void 0), !wr(this))
                  throw Cr("error");
                Dt(this, l);
              }, o.prototype[F] = function(l) {
                Oe(this);
                var M = this._cancelAlgorithm(l);
                return Tr(this), M;
              }, o.prototype[G] = function(l) {
                var M = this._controlledReadableStream;
                if (this._queue.length > 0) {
                  var ie = Te(this);
                  this._closeRequested && this._queue.length === 0 ? (Tr(this), cr(M)) : ur(this), l._chunkSteps(ie);
                } else
                  ye(M, l), ur(this);
              }, o;
            }();
            Object.defineProperties(Zt.prototype, {
              close: { enumerable: !0 },
              enqueue: { enumerable: !0 },
              error: { enumerable: !0 },
              desiredSize: { enumerable: !0 }
            }), typeof t.toStringTag == "symbol" && Object.defineProperty(Zt.prototype, t.toStringTag, {
              value: "ReadableStreamDefaultController",
              configurable: !0
            });
            function wr(o) {
              return !u(o) || !Object.prototype.hasOwnProperty.call(o, "_controlledReadableStream") ? !1 : o instanceof Zt;
            }
            function ur(o) {
              var l = mn(o);
              if (!!l) {
                if (o._pulling) {
                  o._pullAgain = !0;
                  return;
                }
                o._pulling = !0;
                var M = o._pullAlgorithm();
                N(M, function() {
                  o._pulling = !1, o._pullAgain && (o._pullAgain = !1, ur(o));
                }, function(ie) {
                  Dt(o, ie);
                });
              }
            }
            function mn(o) {
              var l = o._controlledReadableStream;
              if (!er(o) || !o._started)
                return !1;
              if (Bt(l) && we(l) > 0)
                return !0;
              var M = Hr(o);
              return M > 0;
            }
            function Tr(o) {
              o._pullAlgorithm = void 0, o._cancelAlgorithm = void 0, o._strategySizeAlgorithm = void 0;
            }
            function lr(o) {
              if (!!er(o)) {
                var l = o._controlledReadableStream;
                o._closeRequested = !0, o._queue.length === 0 && (Tr(o), cr(l));
              }
            }
            function Pr(o, l) {
              if (!!er(o)) {
                var M = o._controlledReadableStream;
                if (Bt(M) && we(M) > 0)
                  me(M, l, !1);
                else {
                  var ie = void 0;
                  try {
                    ie = o._strategySizeAlgorithm(l);
                  } catch (be) {
                    throw Dt(o, be), be;
                  }
                  try {
                    ze(o, l, ie);
                  } catch (be) {
                    throw Dt(o, be), be;
                  }
                }
                ur(o);
              }
            }
            function Dt(o, l) {
              var M = o._controlledReadableStream;
              M._state === "readable" && (Oe(o), Tr(o), Sn(M, l));
            }
            function Hr(o) {
              var l = o._controlledReadableStream._state;
              return l === "errored" ? null : l === "closed" ? 0 : o._strategyHWM - o._queueTotalSize;
            }
            function va(o) {
              return !mn(o);
            }
            function er(o) {
              var l = o._controlledReadableStream._state;
              return !o._closeRequested && l === "readable";
            }
            function yn(o, l, M, ie, be, ke, Me) {
              l._controlledReadableStream = o, l._queue = void 0, l._queueTotalSize = void 0, Oe(l), l._started = !1, l._closeRequested = !1, l._pullAgain = !1, l._pulling = !1, l._strategySizeAlgorithm = Me, l._strategyHWM = ke, l._pullAlgorithm = ie, l._cancelAlgorithm = be, o._readableStreamController = l;
              var Ye = M();
              N(E(Ye), function() {
                l._started = !0, ur(l);
              }, function(Ke) {
                Dt(l, Ke);
              });
            }
            function ma(o, l, M, ie) {
              var be = Object.create(Zt.prototype), ke = function() {
              }, Me = function() {
                return E(void 0);
              }, Ye = function() {
                return E(void 0);
              };
              l.start !== void 0 && (ke = function() {
                return l.start(be);
              }), l.pull !== void 0 && (Me = function() {
                return l.pull(be);
              }), l.cancel !== void 0 && (Ye = function(Ke) {
                return l.cancel(Ke);
              }), yn(o, be, ke, Me, Ye, M, ie);
            }
            function Cr(o) {
              return new TypeError("ReadableStreamDefaultController.prototype." + o + " can only be used on a ReadableStreamDefaultController");
            }
            function ya(o, l) {
              return $e(o._readableStreamController) ? ba(o) : ga(o);
            }
            function ga(o, l) {
              var M = ve(o), ie = !1, be = !1, ke = !1, Me = !1, Ye, Ke, Qe, Ze, et, ct = C(function(dt) {
                et = dt;
              });
              function St() {
                if (ie)
                  return be = !0, E(void 0);
                ie = !0;
                var dt = {
                  _chunkSteps: function(Pt) {
                    v(function() {
                      be = !1;
                      var vt = Pt, Et = Pt;
                      ke || Pr(Qe._readableStreamController, vt), Me || Pr(Ze._readableStreamController, Et), ie = !1, be && St();
                    });
                  },
                  _closeSteps: function() {
                    ie = !1, ke || lr(Qe._readableStreamController), Me || lr(Ze._readableStreamController), (!ke || !Me) && et(void 0);
                  },
                  _errorSteps: function() {
                    ie = !1;
                  }
                };
                return Ie(M, dt), E(void 0);
              }
              function tr(dt) {
                if (ke = !0, Ye = dt, Me) {
                  var Pt = J([
                    Ye,
                    Ke
                  ]), vt = bt(o, Pt);
                  et(vt);
                }
                return ct;
              }
              function Wt(dt) {
                if (Me = !0, Ke = dt, ke) {
                  var Pt = J([
                    Ye,
                    Ke
                  ]), vt = bt(o, Pt);
                  et(vt);
                }
                return ct;
              }
              function Tt() {
              }
              return Qe = Vr(Tt, St, tr), Ze = Vr(Tt, St, Wt), U(M._closedPromise, function(dt) {
                Dt(Qe._readableStreamController, dt), Dt(Ze._readableStreamController, dt), (!ke || !Me) && et(void 0);
              }), [
                Qe,
                Ze
              ];
            }
            function ba(o) {
              var l = ve(o), M = !1, ie = !1, be = !1, ke = !1, Me = !1, Ye, Ke, Qe, Ze, et, ct = C(function(st) {
                et = st;
              });
              function St(st) {
                U(st._closedPromise, function(Ve) {
                  st === l && (He(Qe._readableStreamController, Ve), He(Ze._readableStreamController, Ve), (!ke || !Me) && et(void 0));
                });
              }
              function tr() {
                lt(l) && (W(l), l = ve(o), St(l));
                var st = {
                  _chunkSteps: function(Ve) {
                    v(function() {
                      ie = !1, be = !1;
                      var tt = Ve, ut = Ve;
                      if (!ke && !Me)
                        try {
                          ut = Le(Ve);
                        } catch (Ct) {
                          He(Qe._readableStreamController, Ct), He(Ze._readableStreamController, Ct), et(bt(o, Ct));
                          return;
                        }
                      ke || Ge(Qe._readableStreamController, tt), Me || Ge(Ze._readableStreamController, ut), M = !1, ie ? Tt() : be && dt();
                    });
                  },
                  _closeSteps: function() {
                    M = !1, ke || Ue(Qe._readableStreamController), Me || Ue(Ze._readableStreamController), Qe._readableStreamController._pendingPullIntos.length > 0 && ot(Qe._readableStreamController, 0), Ze._readableStreamController._pendingPullIntos.length > 0 && ot(Ze._readableStreamController, 0), (!ke || !Me) && et(void 0);
                  },
                  _errorSteps: function() {
                    M = !1;
                  }
                };
                Ie(l, st);
              }
              function Wt(st, Ve) {
                Fe(l) && (W(l), l = jt(o), St(l));
                var tt = Ve ? Ze : Qe, ut = Ve ? Qe : Ze, Ct = {
                  _chunkSteps: function(Ut) {
                    v(function() {
                      ie = !1, be = !1;
                      var rr = Ve ? Me : ke, dr = Ve ? ke : Me;
                      if (dr)
                        rr || pt(tt._readableStreamController, Ut);
                      else {
                        var In = void 0;
                        try {
                          In = Le(Ut);
                        } catch (qr) {
                          He(tt._readableStreamController, qr), He(ut._readableStreamController, qr), et(bt(o, qr));
                          return;
                        }
                        rr || pt(tt._readableStreamController, Ut), Ge(ut._readableStreamController, In);
                      }
                      M = !1, ie ? Tt() : be && dt();
                    });
                  },
                  _closeSteps: function(Ut) {
                    M = !1;
                    var rr = Ve ? Me : ke, dr = Ve ? ke : Me;
                    rr || Ue(tt._readableStreamController), dr || Ue(ut._readableStreamController), Ut !== void 0 && (rr || pt(tt._readableStreamController, Ut), !dr && ut._readableStreamController._pendingPullIntos.length > 0 && ot(ut._readableStreamController, 0)), (!rr || !dr) && et(void 0);
                  },
                  _errorSteps: function() {
                    M = !1;
                  }
                };
                Mt(l, st, Ct);
              }
              function Tt() {
                if (M)
                  return ie = !0, E(void 0);
                M = !0;
                var st = qe(Qe._readableStreamController);
                return st === null ? tr() : Wt(st._view, !1), E(void 0);
              }
              function dt() {
                if (M)
                  return be = !0, E(void 0);
                M = !0;
                var st = qe(Ze._readableStreamController);
                return st === null ? tr() : Wt(st._view, !0), E(void 0);
              }
              function Pt(st) {
                if (ke = !0, Ye = st, Me) {
                  var Ve = J([
                    Ye,
                    Ke
                  ]), tt = bt(o, Ve);
                  et(tt);
                }
                return ct;
              }
              function vt(st) {
                if (Me = !0, Ke = st, ke) {
                  var Ve = J([
                    Ye,
                    Ke
                  ]), tt = bt(o, Ve);
                  et(tt);
                }
                return ct;
              }
              function Et() {
              }
              return Qe = bn(Et, Tt, Pt), Ze = bn(Et, dt, vt), St(l), [
                Qe,
                Ze
              ];
            }
            function Sa(o, l) {
              Se(o, l);
              var M = o, ie = M == null ? void 0 : M.autoAllocateChunkSize, be = M == null ? void 0 : M.cancel, ke = M == null ? void 0 : M.pull, Me = M == null ? void 0 : M.start, Ye = M == null ? void 0 : M.type;
              return {
                autoAllocateChunkSize: ie === void 0 ? void 0 : ee(ie, l + " has member 'autoAllocateChunkSize' that"),
                cancel: be === void 0 ? void 0 : _a(be, M, l + " has member 'cancel' that"),
                pull: ke === void 0 ? void 0 : Aa(ke, M, l + " has member 'pull' that"),
                start: Me === void 0 ? void 0 : wa(Me, M, l + " has member 'start' that"),
                type: Ye === void 0 ? void 0 : Ta(Ye, l + " has member 'type' that")
              };
            }
            function _a(o, l, M) {
              return _e(o, M), function(ie) {
                return S(o, l, [ie]);
              };
            }
            function Aa(o, l, M) {
              return _e(o, M), function(ie) {
                return S(o, l, [ie]);
              };
            }
            function wa(o, l, M) {
              return _e(o, M), function(ie) {
                return _(o, l, [ie]);
              };
            }
            function Ta(o, l) {
              if (o = "" + o, o !== "bytes")
                throw new TypeError(l + " '" + o + "' is not a valid enumeration value for ReadableStreamType");
              return o;
            }
            function Pa(o, l) {
              Se(o, l);
              var M = o == null ? void 0 : o.mode;
              return { mode: M === void 0 ? void 0 : Ca(M, l + " has member 'mode' that") };
            }
            function Ca(o, l) {
              if (o = "" + o, o !== "byob")
                throw new TypeError(l + " '" + o + "' is not a valid enumeration value for ReadableStreamReaderMode");
              return o;
            }
            function ka(o, l) {
              Se(o, l);
              var M = o == null ? void 0 : o.preventCancel;
              return { preventCancel: Boolean(M) };
            }
            function gn(o, l) {
              Se(o, l);
              var M = o == null ? void 0 : o.preventAbort, ie = o == null ? void 0 : o.preventCancel, be = o == null ? void 0 : o.preventClose, ke = o == null ? void 0 : o.signal;
              return ke !== void 0 && Ra(ke, l + " has member 'signal' that"), {
                preventAbort: Boolean(M),
                preventCancel: Boolean(ie),
                preventClose: Boolean(be),
                signal: ke
              };
            }
            function Ra(o, l) {
              if (!Un(o))
                throw new TypeError(l + " is not an AbortSignal.");
            }
            function Ea(o, l) {
              Se(o, l);
              var M = o == null ? void 0 : o.readable;
              d(M, "readable", "ReadableWritablePair"), le(M, l + " has member 'readable' that");
              var ie = o == null ? void 0 : o.writable;
              return d(ie, "writable", "ReadableWritablePair"), Kr(ie, l + " has member 'writable' that"), {
                readable: M,
                writable: ie
              };
            }
            var Lt = function() {
              function o(l, M) {
                l === void 0 && (l = {}), M === void 0 && (M = {}), l === void 0 ? l = null : D(l, "First parameter");
                var ie = vr(M, "Second parameter"), be = Sa(l, "First parameter");
                if (Xr(this), be.type === "bytes") {
                  if (ie.size !== void 0)
                    throw new RangeError("The strategy for a byte stream cannot have a size function");
                  var ke = ar(ie, 0);
                  At(this, be, ke);
                } else {
                  var Me = pr(ie), ke = ar(ie, 1);
                  ma(this, be, ke, Me);
                }
              }
              return Object.defineProperty(o.prototype, "locked", {
                get: function() {
                  if (!Nt(this))
                    throw Ht("locked");
                  return Bt(this);
                },
                enumerable: !1,
                configurable: !0
              }), o.prototype.cancel = function(l) {
                return l === void 0 && (l = void 0), Nt(this) ? Bt(this) ? O(new TypeError("Cannot cancel a stream that already has a reader")) : bt(this, l) : O(Ht("cancel"));
              }, o.prototype.getReader = function(l) {
                if (l === void 0 && (l = void 0), !Nt(this))
                  throw Ht("getReader");
                var M = Pa(l, "First parameter");
                return M.mode === void 0 ? ve(this) : jt(this);
              }, o.prototype.pipeThrough = function(l, M) {
                if (M === void 0 && (M = {}), !Nt(this))
                  throw Ht("pipeThrough");
                h(l, 1, "pipeThrough");
                var ie = Ea(l, "First parameter"), be = gn(M, "Second parameter");
                if (Bt(this))
                  throw new TypeError("ReadableStream.prototype.pipeThrough cannot be used on a locked ReadableStream");
                if (Qt(ie.writable))
                  throw new TypeError("ReadableStream.prototype.pipeThrough cannot be used on a locked WritableStream");
                var ke = vn(this, ie.writable, be.preventClose, be.preventAbort, be.preventCancel, be.signal);
                return f(ke), ie.readable;
              }, o.prototype.pipeTo = function(l, M) {
                if (M === void 0 && (M = {}), !Nt(this))
                  return O(Ht("pipeTo"));
                if (l === void 0)
                  return O("Parameter 1 is required in 'pipeTo'.");
                if (!Kt(l))
                  return O(new TypeError("ReadableStream.prototype.pipeTo's first argument must be a WritableStream"));
                var ie;
                try {
                  ie = gn(M, "Second parameter");
                } catch (be) {
                  return O(be);
                }
                return Bt(this) ? O(new TypeError("ReadableStream.prototype.pipeTo cannot be used on a locked ReadableStream")) : Qt(l) ? O(new TypeError("ReadableStream.prototype.pipeTo cannot be used on a locked WritableStream")) : vn(this, l, ie.preventClose, ie.preventAbort, ie.preventCancel, ie.signal);
              }, o.prototype.tee = function() {
                if (!Nt(this))
                  throw Ht("tee");
                var l = ya(this);
                return J(l);
              }, o.prototype.values = function(l) {
                if (l === void 0 && (l = void 0), !Nt(this))
                  throw Ht("values");
                var M = ka(l, "First parameter");
                return re(this, M.preventCancel);
              }, o;
            }();
            Object.defineProperties(Lt.prototype, {
              cancel: { enumerable: !0 },
              getReader: { enumerable: !0 },
              pipeThrough: { enumerable: !0 },
              pipeTo: { enumerable: !0 },
              tee: { enumerable: !0 },
              values: { enumerable: !0 },
              locked: { enumerable: !0 }
            }), typeof t.toStringTag == "symbol" && Object.defineProperty(Lt.prototype, t.toStringTag, {
              value: "ReadableStream",
              configurable: !0
            }), typeof t.asyncIterator == "symbol" && Object.defineProperty(Lt.prototype, t.asyncIterator, {
              value: Lt.prototype.values,
              writable: !0,
              configurable: !0
            });
            function Vr(o, l, M, ie, be) {
              ie === void 0 && (ie = 1), be === void 0 && (be = function() {
                return 1;
              });
              var ke = Object.create(Lt.prototype);
              Xr(ke);
              var Me = Object.create(Zt.prototype);
              return yn(ke, Me, o, l, M, ie, be), ke;
            }
            function bn(o, l, M) {
              var ie = Object.create(Lt.prototype);
              Xr(ie);
              var be = Object.create(Ne.prototype);
              return ft(ie, be, o, l, M, 0, void 0), ie;
            }
            function Xr(o) {
              o._state = "readable", o._reader = void 0, o._storedError = void 0, o._disturbed = !1;
            }
            function Nt(o) {
              return !u(o) || !Object.prototype.hasOwnProperty.call(o, "_readableStreamController") ? !1 : o instanceof Lt;
            }
            function Bt(o) {
              return o._reader !== void 0;
            }
            function bt(o, l) {
              if (o._disturbed = !0, o._state === "closed")
                return E(void 0);
              if (o._state === "errored")
                return O(o._storedError);
              cr(o);
              var M = o._reader;
              M !== void 0 && lt(M) && (M._readIntoRequests.forEach(function(be) {
                be._closeSteps(void 0);
              }), M._readIntoRequests = new R());
              var ie = o._readableStreamController[F](l);
              return m(ie, a);
            }
            function cr(o) {
              o._state = "closed";
              var l = o._reader;
              l !== void 0 && (w(l), Fe(l) && (l._readRequests.forEach(function(M) {
                M._closeSteps();
              }), l._readRequests = new R()));
            }
            function Sn(o, l) {
              o._state = "errored", o._storedError = l;
              var M = o._reader;
              M !== void 0 && (V(M, l), Fe(M) ? (M._readRequests.forEach(function(ie) {
                ie._errorSteps(l);
              }), M._readRequests = new R()) : (M._readIntoRequests.forEach(function(ie) {
                ie._errorSteps(l);
              }), M._readIntoRequests = new R()));
            }
            function Ht(o) {
              return new TypeError("ReadableStream.prototype." + o + " can only be used on a ReadableStream");
            }
            function _n(o, l) {
              Se(o, l);
              var M = o == null ? void 0 : o.highWaterMark;
              return d(M, "highWaterMark", "QueuingStrategyInit"), { highWaterMark: T(M) };
            }
            var An = function(o) {
              return o.byteLength;
            };
            Object.defineProperty(An, "name", {
              value: "size",
              configurable: !0
            });
            var kr = function() {
              function o(l) {
                h(l, 1, "ByteLengthQueuingStrategy"), l = _n(l, "First parameter"), this._byteLengthQueuingStrategyHighWaterMark = l.highWaterMark;
              }
              return Object.defineProperty(o.prototype, "highWaterMark", {
                get: function() {
                  if (!Tn(this))
                    throw wn("highWaterMark");
                  return this._byteLengthQueuingStrategyHighWaterMark;
                },
                enumerable: !1,
                configurable: !0
              }), Object.defineProperty(o.prototype, "size", {
                get: function() {
                  if (!Tn(this))
                    throw wn("size");
                  return An;
                },
                enumerable: !1,
                configurable: !0
              }), o;
            }();
            Object.defineProperties(kr.prototype, {
              highWaterMark: { enumerable: !0 },
              size: { enumerable: !0 }
            }), typeof t.toStringTag == "symbol" && Object.defineProperty(kr.prototype, t.toStringTag, {
              value: "ByteLengthQueuingStrategy",
              configurable: !0
            });
            function wn(o) {
              return new TypeError("ByteLengthQueuingStrategy.prototype." + o + " can only be used on a ByteLengthQueuingStrategy");
            }
            function Tn(o) {
              return !u(o) || !Object.prototype.hasOwnProperty.call(o, "_byteLengthQueuingStrategyHighWaterMark") ? !1 : o instanceof kr;
            }
            var Pn = function() {
              return 1;
            };
            Object.defineProperty(Pn, "name", {
              value: "size",
              configurable: !0
            });
            var Rr = function() {
              function o(l) {
                h(l, 1, "CountQueuingStrategy"), l = _n(l, "First parameter"), this._countQueuingStrategyHighWaterMark = l.highWaterMark;
              }
              return Object.defineProperty(o.prototype, "highWaterMark", {
                get: function() {
                  if (!kn(this))
                    throw Cn("highWaterMark");
                  return this._countQueuingStrategyHighWaterMark;
                },
                enumerable: !1,
                configurable: !0
              }), Object.defineProperty(o.prototype, "size", {
                get: function() {
                  if (!kn(this))
                    throw Cn("size");
                  return Pn;
                },
                enumerable: !1,
                configurable: !0
              }), o;
            }();
            Object.defineProperties(Rr.prototype, {
              highWaterMark: { enumerable: !0 },
              size: { enumerable: !0 }
            }), typeof t.toStringTag == "symbol" && Object.defineProperty(Rr.prototype, t.toStringTag, {
              value: "CountQueuingStrategy",
              configurable: !0
            });
            function Cn(o) {
              return new TypeError("CountQueuingStrategy.prototype." + o + " can only be used on a CountQueuingStrategy");
            }
            function kn(o) {
              return !u(o) || !Object.prototype.hasOwnProperty.call(o, "_countQueuingStrategyHighWaterMark") ? !1 : o instanceof Rr;
            }
            function xa(o, l) {
              Se(o, l);
              var M = o == null ? void 0 : o.flush, ie = o == null ? void 0 : o.readableType, be = o == null ? void 0 : o.start, ke = o == null ? void 0 : o.transform, Me = o == null ? void 0 : o.writableType;
              return {
                flush: M === void 0 ? void 0 : Oa(M, o, l + " has member 'flush' that"),
                readableType: ie,
                start: be === void 0 ? void 0 : Fa(be, o, l + " has member 'start' that"),
                transform: ke === void 0 ? void 0 : Ia(ke, o, l + " has member 'transform' that"),
                writableType: Me
              };
            }
            function Oa(o, l, M) {
              return _e(o, M), function(ie) {
                return S(o, l, [ie]);
              };
            }
            function Fa(o, l, M) {
              return _e(o, M), function(ie) {
                return _(o, l, [ie]);
              };
            }
            function Ia(o, l, M) {
              return _e(o, M), function(ie, be) {
                return S(o, l, [
                  ie,
                  be
                ]);
              };
            }
            var Er = function() {
              function o(l, M, ie) {
                l === void 0 && (l = {}), M === void 0 && (M = {}), ie === void 0 && (ie = {}), l === void 0 && (l = null);
                var be = vr(M, "Second parameter"), ke = vr(ie, "Third parameter"), Me = xa(l, "First parameter");
                if (Me.readableType !== void 0)
                  throw new RangeError("Invalid readableType specified");
                if (Me.writableType !== void 0)
                  throw new RangeError("Invalid writableType specified");
                var Ye = ar(ke, 0), Ke = pr(ke), Qe = ar(be, 1), Ze = pr(be), et, ct = C(function(St) {
                  et = St;
                });
                Ma(this, ct, Qe, Ze, Ye, Ke), La(this, Me), Me.start !== void 0 ? et(Me.start(this._transformStreamController)) : et(void 0);
              }
              return Object.defineProperty(o.prototype, "readable", {
                get: function() {
                  if (!Rn(this))
                    throw Fn("readable");
                  return this._readable;
                },
                enumerable: !1,
                configurable: !0
              }), Object.defineProperty(o.prototype, "writable", {
                get: function() {
                  if (!Rn(this))
                    throw Fn("writable");
                  return this._writable;
                },
                enumerable: !1,
                configurable: !0
              }), o;
            }();
            Object.defineProperties(Er.prototype, {
              readable: { enumerable: !0 },
              writable: { enumerable: !0 }
            }), typeof t.toStringTag == "symbol" && Object.defineProperty(Er.prototype, t.toStringTag, {
              value: "TransformStream",
              configurable: !0
            });
            function Ma(o, l, M, ie, be, ke) {
              function Me() {
                return l;
              }
              function Ye(ct) {
                return Wa(o, ct);
              }
              function Ke(ct) {
                return Ua(o, ct);
              }
              function Qe() {
                return ja(o);
              }
              o._writable = Gn(Me, Ye, Qe, Ke, M, ie);
              function Ze() {
                return za(o);
              }
              function et(ct) {
                return Or(o, ct), E(void 0);
              }
              o._readable = Vr(Me, Ze, et, be, ke), o._backpressure = void 0, o._backpressureChangePromise = void 0, o._backpressureChangePromise_resolve = void 0, Fr(o, !0), o._transformStreamController = void 0;
            }
            function Rn(o) {
              return !u(o) || !Object.prototype.hasOwnProperty.call(o, "_transformStreamController") ? !1 : o instanceof Er;
            }
            function xr(o, l) {
              Dt(o._readable._readableStreamController, l), Or(o, l);
            }
            function Or(o, l) {
              En(o._transformStreamController), Ur(o._writable._writableStreamController, l), o._backpressure && Fr(o, !1);
            }
            function Fr(o, l) {
              o._backpressureChangePromise !== void 0 && o._backpressureChangePromise_resolve(), o._backpressureChangePromise = C(function(M) {
                o._backpressureChangePromise_resolve = M;
              }), o._backpressure = l;
            }
            var fr = function() {
              function o() {
                throw new TypeError("Illegal constructor");
              }
              return Object.defineProperty(o.prototype, "desiredSize", {
                get: function() {
                  if (!Ir(this))
                    throw Mr("desiredSize");
                  var l = this._controlledTransformStream._readable._readableStreamController;
                  return Hr(l);
                },
                enumerable: !1,
                configurable: !0
              }), o.prototype.enqueue = function(l) {
                if (l === void 0 && (l = void 0), !Ir(this))
                  throw Mr("enqueue");
                xn(this, l);
              }, o.prototype.error = function(l) {
                if (l === void 0 && (l = void 0), !Ir(this))
                  throw Mr("error");
                Na(this, l);
              }, o.prototype.terminate = function() {
                if (!Ir(this))
                  throw Mr("terminate");
                Ba(this);
              }, o;
            }();
            Object.defineProperties(fr.prototype, {
              enqueue: { enumerable: !0 },
              error: { enumerable: !0 },
              terminate: { enumerable: !0 },
              desiredSize: { enumerable: !0 }
            }), typeof t.toStringTag == "symbol" && Object.defineProperty(fr.prototype, t.toStringTag, {
              value: "TransformStreamDefaultController",
              configurable: !0
            });
            function Ir(o) {
              return !u(o) || !Object.prototype.hasOwnProperty.call(o, "_controlledTransformStream") ? !1 : o instanceof fr;
            }
            function Da(o, l, M, ie) {
              l._controlledTransformStream = o, o._transformStreamController = l, l._transformAlgorithm = M, l._flushAlgorithm = ie;
            }
            function La(o, l) {
              var M = Object.create(fr.prototype), ie = function(ke) {
                try {
                  return xn(M, ke), E(void 0);
                } catch (Me) {
                  return O(Me);
                }
              }, be = function() {
                return E(void 0);
              };
              l.transform !== void 0 && (ie = function(ke) {
                return l.transform(ke, M);
              }), l.flush !== void 0 && (be = function() {
                return l.flush(M);
              }), Da(o, M, ie, be);
            }
            function En(o) {
              o._transformAlgorithm = void 0, o._flushAlgorithm = void 0;
            }
            function xn(o, l) {
              var M = o._controlledTransformStream, ie = M._readable._readableStreamController;
              if (!er(ie))
                throw new TypeError("Readable side is not in a state that permits enqueue");
              try {
                Pr(ie, l);
              } catch (ke) {
                throw Or(M, ke), M._readable._storedError;
              }
              var be = va(ie);
              be !== M._backpressure && Fr(M, !0);
            }
            function Na(o, l) {
              xr(o._controlledTransformStream, l);
            }
            function On(o, l) {
              var M = o._transformAlgorithm(l);
              return m(M, void 0, function(ie) {
                throw xr(o._controlledTransformStream, ie), ie;
              });
            }
            function Ba(o) {
              var l = o._controlledTransformStream, M = l._readable._readableStreamController;
              lr(M);
              var ie = new TypeError("TransformStream terminated");
              Or(l, ie);
            }
            function Wa(o, l) {
              var M = o._transformStreamController;
              if (o._backpressure) {
                var ie = o._backpressureChangePromise;
                return m(ie, function() {
                  var be = o._writable, ke = be._state;
                  if (ke === "erroring")
                    throw be._storedError;
                  return On(M, l);
                });
              }
              return On(M, l);
            }
            function Ua(o, l) {
              return xr(o, l), E(void 0);
            }
            function ja(o) {
              var l = o._readable, M = o._transformStreamController, ie = M._flushAlgorithm();
              return En(M), m(ie, function() {
                if (l._state === "errored")
                  throw l._storedError;
                lr(l._readableStreamController);
              }, function(be) {
                throw xr(o, be), l._storedError;
              });
            }
            function za(o) {
              return Fr(o, !1), o._backpressureChangePromise;
            }
            function Mr(o) {
              return new TypeError("TransformStreamDefaultController.prototype." + o + " can only be used on a TransformStreamDefaultController");
            }
            function Fn(o) {
              return new TypeError("TransformStream.prototype." + o + " can only be used on a TransformStream");
            }
            e.ByteLengthQueuingStrategy = kr, e.CountQueuingStrategy = Rr, e.ReadableByteStreamController = Ne, e.ReadableStream = Lt, e.ReadableStreamBYOBReader = gt, e.ReadableStreamBYOBRequest = Be, e.ReadableStreamDefaultController = Zt, e.ReadableStreamDefaultReader = Ee, e.TransformStream = Er, e.TransformStreamDefaultController = fr, e.WritableStream = ir, e.WritableStreamDefaultController = Jt, e.WritableStreamDefaultWriter = or, Object.defineProperty(e, "__esModule", { value: !0 });
          });
        },
        (n, r, e) => {
          Object.defineProperty(r, "__esModule", {
            value: !0
          }), r.BaseStandardFontDataFactory = r.BaseSVGFactory = r.BaseCanvasFactory = r.BaseCMapReaderFactory = void 0;
          var t = i(e(2)), a = e(4);
          function i(O) {
            return O && O.__esModule ? O : { default: O };
          }
          function s(O, k, N, x, U, m, f) {
            try {
              var v = O[m](f), _ = v.value;
            } catch (S) {
              N(S);
              return;
            }
            v.done ? k(_) : Promise.resolve(_).then(x, U);
          }
          function u(O) {
            return function() {
              var k = this, N = arguments;
              return new Promise(function(x, U) {
                var m = O.apply(k, N);
                function f(_) {
                  s(m, x, U, f, v, "next", _);
                }
                function v(_) {
                  s(m, x, U, f, v, "throw", _);
                }
                f(void 0);
              });
            };
          }
          function c(O, k) {
            if (!(O instanceof k))
              throw new TypeError("Cannot call a class as a function");
          }
          function g(O, k) {
            for (var N = 0; N < k.length; N++) {
              var x = k[N];
              x.enumerable = x.enumerable || !1, x.configurable = !0, "value" in x && (x.writable = !0), Object.defineProperty(O, x.key, x);
            }
          }
          function b(O, k, N) {
            return k && g(O.prototype, k), N && g(O, N), O;
          }
          var A = /* @__PURE__ */ function() {
            function O() {
              c(this, O), this.constructor === O && (0, a.unreachable)("Cannot initialize BaseCanvasFactory.");
            }
            return b(O, [{
              key: "create",
              value: function(N, x) {
                if (N <= 0 || x <= 0)
                  throw new Error("Invalid canvas size");
                var U = this._createCanvas(N, x);
                return {
                  canvas: U,
                  context: U.getContext("2d")
                };
              }
            }, {
              key: "reset",
              value: function(N, x, U) {
                if (!N.canvas)
                  throw new Error("Canvas is not specified");
                if (x <= 0 || U <= 0)
                  throw new Error("Invalid canvas size");
                N.canvas.width = x, N.canvas.height = U;
              }
            }, {
              key: "destroy",
              value: function(N) {
                if (!N.canvas)
                  throw new Error("Canvas is not specified");
                N.canvas.width = 0, N.canvas.height = 0, N.canvas = null, N.context = null;
              }
            }, {
              key: "_createCanvas",
              value: function(N, x) {
                (0, a.unreachable)("Abstract method `_createCanvas` called.");
              }
            }]), O;
          }();
          r.BaseCanvasFactory = A;
          var I = /* @__PURE__ */ function() {
            function O(k) {
              var N = k.baseUrl, x = N === void 0 ? null : N, U = k.isCompressed, m = U === void 0 ? !1 : U;
              c(this, O), this.constructor === O && (0, a.unreachable)("Cannot initialize BaseCMapReaderFactory."), this.baseUrl = x, this.isCompressed = m;
            }
            return b(O, [{
              key: "fetch",
              value: function() {
                var k = u(/* @__PURE__ */ t.default.mark(function x(U) {
                  var m = this, f, v, _;
                  return t.default.wrap(function(y) {
                    for (; ; )
                      switch (y.prev = y.next) {
                        case 0:
                          if (f = U.name, this.baseUrl) {
                            y.next = 3;
                            break;
                          }
                          throw new Error('The CMap "baseUrl" parameter must be specified, ensure that the "cMapUrl" and "cMapPacked" API parameters are provided.');
                        case 3:
                          if (f) {
                            y.next = 5;
                            break;
                          }
                          throw new Error("CMap name must be specified.");
                        case 5:
                          return v = this.baseUrl + f + (this.isCompressed ? ".bcmap" : ""), _ = this.isCompressed ? a.CMapCompressionType.BINARY : a.CMapCompressionType.NONE, y.abrupt("return", this._fetchData(v, _).catch(function(R) {
                            throw new Error("Unable to load ".concat(m.isCompressed ? "binary " : "", "CMap at: ").concat(v));
                          }));
                        case 8:
                        case "end":
                          return y.stop();
                      }
                  }, x, this);
                }));
                function N(x) {
                  return k.apply(this, arguments);
                }
                return N;
              }()
            }, {
              key: "_fetchData",
              value: function(N, x) {
                (0, a.unreachable)("Abstract method `_fetchData` called.");
              }
            }]), O;
          }();
          r.BaseCMapReaderFactory = I;
          var C = /* @__PURE__ */ function() {
            function O(k) {
              var N = k.baseUrl, x = N === void 0 ? null : N;
              c(this, O), this.constructor === O && (0, a.unreachable)("Cannot initialize BaseStandardFontDataFactory."), this.baseUrl = x;
            }
            return b(O, [{
              key: "fetch",
              value: function() {
                var k = u(/* @__PURE__ */ t.default.mark(function x(U) {
                  var m, f;
                  return t.default.wrap(function(_) {
                    for (; ; )
                      switch (_.prev = _.next) {
                        case 0:
                          if (m = U.filename, this.baseUrl) {
                            _.next = 3;
                            break;
                          }
                          throw new Error('The standard font "baseUrl" parameter must be specified, ensure that the "standardFontDataUrl" API parameter is provided.');
                        case 3:
                          if (m) {
                            _.next = 5;
                            break;
                          }
                          throw new Error("Font filename must be specified.");
                        case 5:
                          return f = "".concat(this.baseUrl).concat(m), _.abrupt("return", this._fetchData(f).catch(function(S) {
                            throw new Error("Unable to load font data at: ".concat(f));
                          }));
                        case 7:
                        case "end":
                          return _.stop();
                      }
                  }, x, this);
                }));
                function N(x) {
                  return k.apply(this, arguments);
                }
                return N;
              }()
            }, {
              key: "_fetchData",
              value: function(N) {
                (0, a.unreachable)("Abstract method `_fetchData` called.");
              }
            }]), O;
          }();
          r.BaseStandardFontDataFactory = C;
          var E = /* @__PURE__ */ function() {
            function O() {
              c(this, O), this.constructor === O && (0, a.unreachable)("Cannot initialize BaseSVGFactory.");
            }
            return b(O, [{
              key: "create",
              value: function(N, x) {
                if (N <= 0 || x <= 0)
                  throw new Error("Invalid SVG dimensions");
                var U = this._createSVG("svg:svg");
                return U.setAttribute("version", "1.1"), U.setAttribute("width", "".concat(N, "px")), U.setAttribute("height", "".concat(x, "px")), U.setAttribute("preserveAspectRatio", "none"), U.setAttribute("viewBox", "0 0 ".concat(N, " ").concat(x)), U;
              }
            }, {
              key: "createElement",
              value: function(N) {
                if (typeof N != "string")
                  throw new Error("Invalid SVG element type");
                return this._createSVG(N);
              }
            }, {
              key: "_createSVG",
              value: function(N) {
                (0, a.unreachable)("Abstract method `_createSVG` called.");
              }
            }]), O;
          }();
          r.BaseSVGFactory = E;
        },
        (__unused_webpack_module, exports, __w_pdfjs_require__) => {
          Object.defineProperty(exports, "__esModule", {
            value: !0
          }), exports.build = exports.RenderTask = exports.PDFWorker = exports.PDFPageProxy = exports.PDFDocumentProxy = exports.PDFDocumentLoadingTask = exports.PDFDataRangeTransport = exports.LoopbackPort = exports.DefaultStandardFontDataFactory = exports.DefaultCanvasFactory = exports.DefaultCMapReaderFactory = void 0, exports.getDocument = getDocument, exports.setPDFNetworkStreamFactory = setPDFNetworkStreamFactory, exports.version = void 0;
          var _regenerator = _interopRequireDefault(__w_pdfjs_require__(2)), _util = __w_pdfjs_require__(4), _display_utils = __w_pdfjs_require__(1), _font_loader = __w_pdfjs_require__(137), _node_utils = __w_pdfjs_require__(138), _annotation_storage = __w_pdfjs_require__(139), _canvas = __w_pdfjs_require__(140), _worker_options = __w_pdfjs_require__(142), _is_node = __w_pdfjs_require__(6), _message_handler = __w_pdfjs_require__(143), _metadata = __w_pdfjs_require__(144), _optional_content_config = __w_pdfjs_require__(145), _transport_stream = __w_pdfjs_require__(146), _xfa_text = __w_pdfjs_require__(147);
          function _interopRequireDefault(n) {
            return n && n.__esModule ? n : { default: n };
          }
          function _classPrivateFieldInitSpec(n, r, e) {
            _checkPrivateRedeclaration(n, r), r.set(n, e);
          }
          function _checkPrivateRedeclaration(n, r) {
            if (r.has(n))
              throw new TypeError("Cannot initialize the same private elements twice on an object");
          }
          function _classPrivateFieldSet(n, r, e) {
            var t = _classExtractFieldDescriptor(n, r, "set");
            return _classApplyDescriptorSet(n, t, e), e;
          }
          function _classApplyDescriptorSet(n, r, e) {
            if (r.set)
              r.set.call(n, e);
            else {
              if (!r.writable)
                throw new TypeError("attempted to set read only private field");
              r.value = e;
            }
          }
          function _classPrivateFieldGet(n, r) {
            var e = _classExtractFieldDescriptor(n, r, "get");
            return _classApplyDescriptorGet(n, e);
          }
          function _classExtractFieldDescriptor(n, r, e) {
            if (!r.has(n))
              throw new TypeError("attempted to " + e + " private field on non-instance");
            return r.get(n);
          }
          function _classApplyDescriptorGet(n, r) {
            return r.get ? r.get.call(n) : r.value;
          }
          function _toConsumableArray(n) {
            return _arrayWithoutHoles(n) || _iterableToArray(n) || _unsupportedIterableToArray(n) || _nonIterableSpread();
          }
          function _nonIterableSpread() {
            throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
          }
          function _iterableToArray(n) {
            if (typeof Symbol < "u" && n[Symbol.iterator] != null || n["@@iterator"] != null)
              return Array.from(n);
          }
          function _arrayWithoutHoles(n) {
            if (Array.isArray(n))
              return _arrayLikeToArray(n);
          }
          function _createForOfIteratorHelper(n, r) {
            var e = typeof Symbol < "u" && n[Symbol.iterator] || n["@@iterator"];
            if (!e) {
              if (Array.isArray(n) || (e = _unsupportedIterableToArray(n)) || r && n && typeof n.length == "number") {
                e && (n = e);
                var t = 0, a = function() {
                };
                return { s: a, n: function() {
                  return t >= n.length ? { done: !0 } : { done: !1, value: n[t++] };
                }, e: function(g) {
                  throw g;
                }, f: a };
              }
              throw new TypeError(`Invalid attempt to iterate non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
            }
            var i = !0, s = !1, u;
            return { s: function() {
              e = e.call(n);
            }, n: function() {
              var g = e.next();
              return i = g.done, g;
            }, e: function(g) {
              s = !0, u = g;
            }, f: function() {
              try {
                !i && e.return != null && e.return();
              } finally {
                if (s)
                  throw u;
              }
            } };
          }
          function _classCallCheck(n, r) {
            if (!(n instanceof r))
              throw new TypeError("Cannot call a class as a function");
          }
          function _defineProperties(n, r) {
            for (var e = 0; e < r.length; e++) {
              var t = r[e];
              t.enumerable = t.enumerable || !1, t.configurable = !0, "value" in t && (t.writable = !0), Object.defineProperty(n, t.key, t);
            }
          }
          function _createClass(n, r, e) {
            return r && _defineProperties(n.prototype, r), e && _defineProperties(n, e), n;
          }
          function asyncGeneratorStep(n, r, e, t, a, i, s) {
            try {
              var u = n[i](s), c = u.value;
            } catch (g) {
              e(g);
              return;
            }
            u.done ? r(c) : Promise.resolve(c).then(t, a);
          }
          function _asyncToGenerator(n) {
            return function() {
              var r = this, e = arguments;
              return new Promise(function(t, a) {
                var i = n.apply(r, e);
                function s(c) {
                  asyncGeneratorStep(i, t, a, s, u, "next", c);
                }
                function u(c) {
                  asyncGeneratorStep(i, t, a, s, u, "throw", c);
                }
                s(void 0);
              });
            };
          }
          function _slicedToArray(n, r) {
            return _arrayWithHoles(n) || _iterableToArrayLimit(n, r) || _unsupportedIterableToArray(n, r) || _nonIterableRest();
          }
          function _nonIterableRest() {
            throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
          }
          function _unsupportedIterableToArray(n, r) {
            if (!!n) {
              if (typeof n == "string")
                return _arrayLikeToArray(n, r);
              var e = Object.prototype.toString.call(n).slice(8, -1);
              if (e === "Object" && n.constructor && (e = n.constructor.name), e === "Map" || e === "Set")
                return Array.from(n);
              if (e === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(e))
                return _arrayLikeToArray(n, r);
            }
          }
          function _arrayLikeToArray(n, r) {
            (r == null || r > n.length) && (r = n.length);
            for (var e = 0, t = new Array(r); e < r; e++)
              t[e] = n[e];
            return t;
          }
          function _iterableToArrayLimit(n, r) {
            var e = n == null ? null : typeof Symbol < "u" && n[Symbol.iterator] || n["@@iterator"];
            if (e != null) {
              var t = [], a = !0, i = !1, s, u;
              try {
                for (e = e.call(n); !(a = (s = e.next()).done) && (t.push(s.value), !(r && t.length === r)); a = !0)
                  ;
              } catch (c) {
                i = !0, u = c;
              } finally {
                try {
                  !a && e.return != null && e.return();
                } finally {
                  if (i)
                    throw u;
                }
              }
              return t;
            }
          }
          function _arrayWithHoles(n) {
            if (Array.isArray(n))
              return n;
          }
          function _typeof(n) {
            return typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? _typeof = function(e) {
              return typeof e;
            } : _typeof = function(e) {
              return e && typeof Symbol == "function" && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
            }, _typeof(n);
          }
          var DEFAULT_RANGE_CHUNK_SIZE = 65536, RENDERING_CANCELLED_TIMEOUT = 100, DefaultCanvasFactory = _is_node.isNodeJS ? _node_utils.NodeCanvasFactory : _display_utils.DOMCanvasFactory;
          exports.DefaultCanvasFactory = DefaultCanvasFactory;
          var DefaultCMapReaderFactory = _is_node.isNodeJS ? _node_utils.NodeCMapReaderFactory : _display_utils.DOMCMapReaderFactory;
          exports.DefaultCMapReaderFactory = DefaultCMapReaderFactory;
          var DefaultStandardFontDataFactory = _is_node.isNodeJS ? _node_utils.NodeStandardFontDataFactory : _display_utils.DOMStandardFontDataFactory;
          exports.DefaultStandardFontDataFactory = DefaultStandardFontDataFactory;
          var createPDFNetworkStream;
          function setPDFNetworkStreamFactory(n) {
            createPDFNetworkStream = n;
          }
          function getDocument(n) {
            var r = new PDFDocumentLoadingTask(), e;
            if (typeof n == "string" || n instanceof URL)
              e = {
                url: n
              };
            else if ((0, _util.isArrayBuffer)(n))
              e = {
                data: n
              };
            else if (n instanceof PDFDataRangeTransport)
              e = {
                range: n
              };
            else {
              if (_typeof(n) !== "object")
                throw new Error("Invalid parameter in getDocument, need either string, URL, Uint8Array, or parameter object.");
              if (!n.url && !n.data && !n.range)
                throw new Error("Invalid parameter object: need either .data, .range or .url");
              e = n;
            }
            var t = /* @__PURE__ */ Object.create(null), a = null, i = null;
            for (var s in e) {
              var u = e[s];
              switch (s) {
                case "url":
                  if (typeof window < "u")
                    try {
                      t[s] = new URL(u, window.location).href;
                      continue;
                    } catch (b) {
                      (0, _util.warn)('Cannot create valid URL: "'.concat(b, '".'));
                    }
                  else if (typeof u == "string" || u instanceof URL) {
                    t[s] = u.toString();
                    continue;
                  }
                  throw new Error("Invalid PDF url data: either string or URL-object is expected in the url property.");
                case "range":
                  a = u;
                  continue;
                case "worker":
                  i = u;
                  continue;
                case "data":
                  if (_is_node.isNodeJS && typeof Buffer < "u" && u instanceof Buffer)
                    t[s] = new Uint8Array(u);
                  else {
                    if (u instanceof Uint8Array)
                      break;
                    if (typeof u == "string")
                      t[s] = (0, _util.stringToBytes)(u);
                    else if (_typeof(u) === "object" && u !== null && !isNaN(u.length))
                      t[s] = new Uint8Array(u);
                    else if ((0, _util.isArrayBuffer)(u))
                      t[s] = new Uint8Array(u);
                    else
                      throw new Error("Invalid PDF binary data: either typed array, string, or array-like object is expected in the data property.");
                  }
                  continue;
              }
              t[s] = u;
            }
            if (t.rangeChunkSize = t.rangeChunkSize || DEFAULT_RANGE_CHUNK_SIZE, t.CMapReaderFactory = t.CMapReaderFactory || DefaultCMapReaderFactory, t.StandardFontDataFactory = t.StandardFontDataFactory || DefaultStandardFontDataFactory, t.ignoreErrors = t.stopAtErrors !== !0, t.fontExtraProperties = t.fontExtraProperties === !0, t.pdfBug = t.pdfBug === !0, t.enableXfa = t.enableXfa === !0, (typeof t.docBaseUrl != "string" || (0, _display_utils.isDataScheme)(t.docBaseUrl)) && (t.docBaseUrl = null), Number.isInteger(t.maxImageSize) || (t.maxImageSize = -1), typeof t.useWorkerFetch != "boolean" && (t.useWorkerFetch = t.CMapReaderFactory === _display_utils.DOMCMapReaderFactory && t.StandardFontDataFactory === _display_utils.DOMStandardFontDataFactory), typeof t.isEvalSupported != "boolean" && (t.isEvalSupported = !0), typeof t.disableFontFace != "boolean" && (t.disableFontFace = _is_node.isNodeJS), typeof t.useSystemFonts != "boolean" && (t.useSystemFonts = !_is_node.isNodeJS && !t.disableFontFace), typeof t.ownerDocument > "u" && (t.ownerDocument = globalThis.document), typeof t.disableRange != "boolean" && (t.disableRange = !1), typeof t.disableStream != "boolean" && (t.disableStream = !1), typeof t.disableAutoFetch != "boolean" && (t.disableAutoFetch = !1), (0, _util.setVerbosityLevel)(t.verbosity), !i) {
              var c = {
                verbosity: t.verbosity,
                port: _worker_options.GlobalWorkerOptions.workerPort
              };
              i = c.port ? PDFWorker.fromPort(c) : new PDFWorker(c), r._worker = i;
            }
            var g = r.docId;
            return i.promise.then(function() {
              if (r.destroyed)
                throw new Error("Loading aborted");
              var b = _fetchDocument(i, t, a, g), A = new Promise(function(I) {
                var C;
                a ? C = new _transport_stream.PDFDataTransportStream({
                  length: t.length,
                  initialData: t.initialData,
                  progressiveDone: t.progressiveDone,
                  contentDispositionFilename: t.contentDispositionFilename,
                  disableRange: t.disableRange,
                  disableStream: t.disableStream
                }, a) : t.data || (C = createPDFNetworkStream({
                  url: t.url,
                  length: t.length,
                  httpHeaders: t.httpHeaders,
                  withCredentials: t.withCredentials,
                  rangeChunkSize: t.rangeChunkSize,
                  disableRange: t.disableRange,
                  disableStream: t.disableStream
                })), I(C);
              });
              return Promise.all([b, A]).then(function(I) {
                var C = _slicedToArray(I, 2), E = C[0], O = C[1];
                if (r.destroyed)
                  throw new Error("Loading aborted");
                var k = new _message_handler.MessageHandler(g, E, i.port), N = new WorkerTransport(k, r, O, t);
                r._transport = N, k.send("Ready", null);
              });
            }).catch(r._capability.reject), r;
          }
          function _fetchDocument(n, r, e, t) {
            return _fetchDocument2.apply(this, arguments);
          }
          function _fetchDocument2() {
            return _fetchDocument2 = _asyncToGenerator(/* @__PURE__ */ _regenerator.default.mark(function n(r, e, t, a) {
              var i;
              return _regenerator.default.wrap(function(u) {
                for (; ; )
                  switch (u.prev = u.next) {
                    case 0:
                      if (!r.destroyed) {
                        u.next = 2;
                        break;
                      }
                      throw new Error("Worker was destroyed");
                    case 2:
                      return t && (e.length = t.length, e.initialData = t.initialData, e.progressiveDone = t.progressiveDone, e.contentDispositionFilename = t.contentDispositionFilename), u.next = 5, r.messageHandler.sendWithPromise("GetDocRequest", {
                        docId: a,
                        apiVersion: "2.12.313",
                        source: {
                          data: e.data,
                          url: e.url,
                          password: e.password,
                          disableAutoFetch: e.disableAutoFetch,
                          rangeChunkSize: e.rangeChunkSize,
                          length: e.length
                        },
                        maxImageSize: e.maxImageSize,
                        disableFontFace: e.disableFontFace,
                        docBaseUrl: e.docBaseUrl,
                        ignoreErrors: e.ignoreErrors,
                        isEvalSupported: e.isEvalSupported,
                        fontExtraProperties: e.fontExtraProperties,
                        enableXfa: e.enableXfa,
                        useSystemFonts: e.useSystemFonts,
                        cMapUrl: e.useWorkerFetch ? e.cMapUrl : null,
                        standardFontDataUrl: e.useWorkerFetch ? e.standardFontDataUrl : null
                      });
                    case 5:
                      if (i = u.sent, !r.destroyed) {
                        u.next = 8;
                        break;
                      }
                      throw new Error("Worker was destroyed");
                    case 8:
                      return u.abrupt("return", i);
                    case 9:
                    case "end":
                      return u.stop();
                  }
              }, n);
            })), _fetchDocument2.apply(this, arguments);
          }
          var PDFDocumentLoadingTask = /* @__PURE__ */ function() {
            function n() {
              _classCallCheck(this, n), this._capability = (0, _util.createPromiseCapability)(), this._transport = null, this._worker = null, this.docId = "d".concat(n.idCounters.doc++), this.destroyed = !1, this.onPassword = null, this.onProgress = null, this.onUnsupportedFeature = null;
            }
            return _createClass(n, [{
              key: "promise",
              get: function() {
                return this._capability.promise;
              }
            }, {
              key: "destroy",
              value: function() {
                var r = _asyncToGenerator(/* @__PURE__ */ _regenerator.default.mark(function t() {
                  var a;
                  return _regenerator.default.wrap(function(s) {
                    for (; ; )
                      switch (s.prev = s.next) {
                        case 0:
                          return this.destroyed = !0, s.next = 3, (a = this._transport) === null || a === void 0 ? void 0 : a.destroy();
                        case 3:
                          this._transport = null, this._worker && (this._worker.destroy(), this._worker = null);
                        case 5:
                        case "end":
                          return s.stop();
                      }
                  }, t, this);
                }));
                function e() {
                  return r.apply(this, arguments);
                }
                return e;
              }()
            }], [{
              key: "idCounters",
              get: function() {
                return (0, _util.shadow)(this, "idCounters", {
                  doc: 0
                });
              }
            }]), n;
          }();
          exports.PDFDocumentLoadingTask = PDFDocumentLoadingTask;
          var PDFDataRangeTransport = /* @__PURE__ */ function() {
            function n(r, e) {
              var t = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : !1, a = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : null;
              _classCallCheck(this, n), this.length = r, this.initialData = e, this.progressiveDone = t, this.contentDispositionFilename = a, this._rangeListeners = [], this._progressListeners = [], this._progressiveReadListeners = [], this._progressiveDoneListeners = [], this._readyCapability = (0, _util.createPromiseCapability)();
            }
            return _createClass(n, [{
              key: "addRangeListener",
              value: function(e) {
                this._rangeListeners.push(e);
              }
            }, {
              key: "addProgressListener",
              value: function(e) {
                this._progressListeners.push(e);
              }
            }, {
              key: "addProgressiveReadListener",
              value: function(e) {
                this._progressiveReadListeners.push(e);
              }
            }, {
              key: "addProgressiveDoneListener",
              value: function(e) {
                this._progressiveDoneListeners.push(e);
              }
            }, {
              key: "onDataRange",
              value: function(e, t) {
                var a = _createForOfIteratorHelper(this._rangeListeners), i;
                try {
                  for (a.s(); !(i = a.n()).done; ) {
                    var s = i.value;
                    s(e, t);
                  }
                } catch (u) {
                  a.e(u);
                } finally {
                  a.f();
                }
              }
            }, {
              key: "onDataProgress",
              value: function(e, t) {
                var a = this;
                this._readyCapability.promise.then(function() {
                  var i = _createForOfIteratorHelper(a._progressListeners), s;
                  try {
                    for (i.s(); !(s = i.n()).done; ) {
                      var u = s.value;
                      u(e, t);
                    }
                  } catch (c) {
                    i.e(c);
                  } finally {
                    i.f();
                  }
                });
              }
            }, {
              key: "onDataProgressiveRead",
              value: function(e) {
                var t = this;
                this._readyCapability.promise.then(function() {
                  var a = _createForOfIteratorHelper(t._progressiveReadListeners), i;
                  try {
                    for (a.s(); !(i = a.n()).done; ) {
                      var s = i.value;
                      s(e);
                    }
                  } catch (u) {
                    a.e(u);
                  } finally {
                    a.f();
                  }
                });
              }
            }, {
              key: "onDataProgressiveDone",
              value: function() {
                var e = this;
                this._readyCapability.promise.then(function() {
                  var t = _createForOfIteratorHelper(e._progressiveDoneListeners), a;
                  try {
                    for (t.s(); !(a = t.n()).done; ) {
                      var i = a.value;
                      i();
                    }
                  } catch (s) {
                    t.e(s);
                  } finally {
                    t.f();
                  }
                });
              }
            }, {
              key: "transportReady",
              value: function() {
                this._readyCapability.resolve();
              }
            }, {
              key: "requestDataRange",
              value: function(e, t) {
                (0, _util.unreachable)("Abstract method PDFDataRangeTransport.requestDataRange");
              }
            }, {
              key: "abort",
              value: function() {
              }
            }]), n;
          }();
          exports.PDFDataRangeTransport = PDFDataRangeTransport;
          var PDFDocumentProxy = /* @__PURE__ */ function() {
            function n(r, e) {
              var t = this;
              _classCallCheck(this, n), this._pdfInfo = r, this._transport = e, Object.defineProperty(this, "fingerprint", {
                get: function() {
                  return (0, _display_utils.deprecated)("`PDFDocumentProxy.fingerprint`, please use `PDFDocumentProxy.fingerprints` instead."), this.fingerprints[0];
                }
              }), Object.defineProperty(this, "getStats", {
                value: function() {
                  var a = _asyncToGenerator(/* @__PURE__ */ _regenerator.default.mark(function s() {
                    return _regenerator.default.wrap(function(c) {
                      for (; ; )
                        switch (c.prev = c.next) {
                          case 0:
                            return (0, _display_utils.deprecated)("`PDFDocumentProxy.getStats`, please use the `PDFDocumentProxy.stats`-getter instead."), c.abrupt("return", t.stats || {
                              streamTypes: {},
                              fontTypes: {}
                            });
                          case 2:
                          case "end":
                            return c.stop();
                        }
                    }, s);
                  }));
                  function i() {
                    return a.apply(this, arguments);
                  }
                  return i;
                }()
              });
            }
            return _createClass(n, [{
              key: "annotationStorage",
              get: function() {
                return this._transport.annotationStorage;
              }
            }, {
              key: "numPages",
              get: function() {
                return this._pdfInfo.numPages;
              }
            }, {
              key: "fingerprints",
              get: function() {
                return this._pdfInfo.fingerprints;
              }
            }, {
              key: "stats",
              get: function() {
                return this._transport.stats;
              }
            }, {
              key: "isPureXfa",
              get: function() {
                return !!this._transport._htmlForXfa;
              }
            }, {
              key: "allXfaHtml",
              get: function() {
                return this._transport._htmlForXfa;
              }
            }, {
              key: "getPage",
              value: function(e) {
                return this._transport.getPage(e);
              }
            }, {
              key: "getPageIndex",
              value: function(e) {
                return this._transport.getPageIndex(e);
              }
            }, {
              key: "getDestinations",
              value: function() {
                return this._transport.getDestinations();
              }
            }, {
              key: "getDestination",
              value: function(e) {
                return this._transport.getDestination(e);
              }
            }, {
              key: "getPageLabels",
              value: function() {
                return this._transport.getPageLabels();
              }
            }, {
              key: "getPageLayout",
              value: function() {
                return this._transport.getPageLayout();
              }
            }, {
              key: "getPageMode",
              value: function() {
                return this._transport.getPageMode();
              }
            }, {
              key: "getViewerPreferences",
              value: function() {
                return this._transport.getViewerPreferences();
              }
            }, {
              key: "getOpenAction",
              value: function() {
                return this._transport.getOpenAction();
              }
            }, {
              key: "getAttachments",
              value: function() {
                return this._transport.getAttachments();
              }
            }, {
              key: "getJavaScript",
              value: function() {
                return this._transport.getJavaScript();
              }
            }, {
              key: "getJSActions",
              value: function() {
                return this._transport.getDocJSActions();
              }
            }, {
              key: "getOutline",
              value: function() {
                return this._transport.getOutline();
              }
            }, {
              key: "getOptionalContentConfig",
              value: function() {
                return this._transport.getOptionalContentConfig();
              }
            }, {
              key: "getPermissions",
              value: function() {
                return this._transport.getPermissions();
              }
            }, {
              key: "getMetadata",
              value: function() {
                return this._transport.getMetadata();
              }
            }, {
              key: "getMarkInfo",
              value: function() {
                return this._transport.getMarkInfo();
              }
            }, {
              key: "getData",
              value: function() {
                return this._transport.getData();
              }
            }, {
              key: "getDownloadInfo",
              value: function() {
                return this._transport.downloadInfoCapability.promise;
              }
            }, {
              key: "cleanup",
              value: function() {
                var e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : !1;
                return this._transport.startCleanup(e || this.isPureXfa);
              }
            }, {
              key: "destroy",
              value: function() {
                return this.loadingTask.destroy();
              }
            }, {
              key: "loadingParams",
              get: function() {
                return this._transport.loadingParams;
              }
            }, {
              key: "loadingTask",
              get: function() {
                return this._transport.loadingTask;
              }
            }, {
              key: "saveDocument",
              value: function() {
                return this._transport.annotationStorage.size <= 0 && (0, _display_utils.deprecated)("saveDocument called while `annotationStorage` is empty, please use the getData-method instead."), this._transport.saveDocument();
              }
            }, {
              key: "getFieldObjects",
              value: function() {
                return this._transport.getFieldObjects();
              }
            }, {
              key: "hasJSActions",
              value: function() {
                return this._transport.hasJSActions();
              }
            }, {
              key: "getCalculationOrderIds",
              value: function() {
                return this._transport.getCalculationOrderIds();
              }
            }]), n;
          }();
          exports.PDFDocumentProxy = PDFDocumentProxy;
          var PDFPageProxy = /* @__PURE__ */ function() {
            function n(r, e, t, a) {
              var i = arguments.length > 4 && arguments[4] !== void 0 ? arguments[4] : !1;
              _classCallCheck(this, n), this._pageIndex = r, this._pageInfo = e, this._ownerDocument = a, this._transport = t, this._stats = i ? new _display_utils.StatTimer() : null, this._pdfBug = i, this.commonObjs = t.commonObjs, this.objs = new PDFObjects(), this.cleanupAfterRender = !1, this.pendingCleanup = !1, this._intentStates = /* @__PURE__ */ new Map(), this._annotationPromises = /* @__PURE__ */ new Map(), this.destroyed = !1;
            }
            return _createClass(n, [{
              key: "pageNumber",
              get: function() {
                return this._pageIndex + 1;
              }
            }, {
              key: "rotate",
              get: function() {
                return this._pageInfo.rotate;
              }
            }, {
              key: "ref",
              get: function() {
                return this._pageInfo.ref;
              }
            }, {
              key: "userUnit",
              get: function() {
                return this._pageInfo.userUnit;
              }
            }, {
              key: "view",
              get: function() {
                return this._pageInfo.view;
              }
            }, {
              key: "getViewport",
              value: function() {
                var e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {}, t = e.scale, a = e.rotation, i = a === void 0 ? this.rotate : a, s = e.offsetX, u = s === void 0 ? 0 : s, c = e.offsetY, g = c === void 0 ? 0 : c, b = e.dontFlip, A = b === void 0 ? !1 : b;
                return new _display_utils.PageViewport({
                  viewBox: this.view,
                  scale: t,
                  rotation: i,
                  offsetX: u,
                  offsetY: g,
                  dontFlip: A
                });
              }
            }, {
              key: "getAnnotations",
              value: function() {
                var e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {}, t = e.intent, a = t === void 0 ? "display" : t, i = this._transport.getRenderingIntent(a), s = this._annotationPromises.get(i.cacheKey);
                return s || (s = this._transport.getAnnotations(this._pageIndex, i.renderingIntent), this._annotationPromises.set(i.cacheKey, s), s = s.then(function(u) {
                  var c = _createForOfIteratorHelper(u), g;
                  try {
                    var b = function() {
                      var I = g.value;
                      I.titleObj !== void 0 && Object.defineProperty(I, "title", {
                        get: function() {
                          return (0, _display_utils.deprecated)("`title`-property on annotation, please use `titleObj` instead."), I.titleObj.str;
                        }
                      }), I.contentsObj !== void 0 && Object.defineProperty(I, "contents", {
                        get: function() {
                          return (0, _display_utils.deprecated)("`contents`-property on annotation, please use `contentsObj` instead."), I.contentsObj.str;
                        }
                      });
                    };
                    for (c.s(); !(g = c.n()).done; )
                      b();
                  } catch (A) {
                    c.e(A);
                  } finally {
                    c.f();
                  }
                  return u;
                })), s;
              }
            }, {
              key: "getJSActions",
              value: function() {
                return this._jsActionsPromise || (this._jsActionsPromise = this._transport.getPageJSActions(this._pageIndex));
              }
            }, {
              key: "getXfa",
              value: function() {
                var r = _asyncToGenerator(/* @__PURE__ */ _regenerator.default.mark(function t() {
                  var a;
                  return _regenerator.default.wrap(function(s) {
                    for (; ; )
                      switch (s.prev = s.next) {
                        case 0:
                          return s.abrupt("return", ((a = this._transport._htmlForXfa) === null || a === void 0 ? void 0 : a.children[this._pageIndex]) || null);
                        case 1:
                        case "end":
                          return s.stop();
                      }
                  }, t, this);
                }));
                function e() {
                  return r.apply(this, arguments);
                }
                return e;
              }()
            }, {
              key: "render",
              value: function(e) {
                var t, a, i = this, s, u = e.canvasContext, c = e.viewport, g = e.intent, b = g === void 0 ? "display" : g, A = e.annotationMode, I = A === void 0 ? _util.AnnotationMode.ENABLE : A, C = e.transform, E = C === void 0 ? null : C, O = e.imageLayer, k = O === void 0 ? null : O, N = e.canvasFactory, x = N === void 0 ? null : N, U = e.background, m = U === void 0 ? null : U, f = e.optionalContentConfigPromise, v = f === void 0 ? null : f, _ = e.annotationCanvasMap, S = _ === void 0 ? null : _;
                ((t = arguments[0]) === null || t === void 0 ? void 0 : t.renderInteractiveForms) !== void 0 && ((0, _display_utils.deprecated)("render no longer accepts the `renderInteractiveForms`-option, please use the `annotationMode`-option instead."), arguments[0].renderInteractiveForms === !0 && I === _util.AnnotationMode.ENABLE && (I = _util.AnnotationMode.ENABLE_FORMS)), ((a = arguments[0]) === null || a === void 0 ? void 0 : a.includeAnnotationStorage) !== void 0 && ((0, _display_utils.deprecated)("render no longer accepts the `includeAnnotationStorage`-option, please use the `annotationMode`-option instead."), arguments[0].includeAnnotationStorage === !0 && I === _util.AnnotationMode.ENABLE && (I = _util.AnnotationMode.ENABLE_STORAGE)), this._stats && this._stats.time("Overall");
                var y = this._transport.getRenderingIntent(b, I);
                this.pendingCleanup = !1, v || (v = this._transport.getOptionalContentConfig());
                var R = this._intentStates.get(y.cacheKey);
                R || (R = /* @__PURE__ */ Object.create(null), this._intentStates.set(y.cacheKey, R)), R.streamReaderCancelTimeout && (clearTimeout(R.streamReaderCancelTimeout), R.streamReaderCancelTimeout = null);
                var L = x || new DefaultCanvasFactory({
                  ownerDocument: this._ownerDocument
                }), $ = !!(y.renderingIntent & _util.RenderingIntentFlag.PRINT);
                R.displayReadyCapability || (R.displayReadyCapability = (0, _util.createPromiseCapability)(), R.operatorList = {
                  fnArray: [],
                  argsArray: [],
                  lastChunk: !1
                }, this._stats && this._stats.time("Page Request"), this._pumpOperatorList(y));
                var W = function(ae) {
                  R.renderTasks.delete(X), (i.cleanupAfterRender || $) && (i.pendingCleanup = !0), i._tryCleanup(), ae ? (X.capability.reject(ae), i._abortOperatorList({
                    intentState: R,
                    reason: ae instanceof Error ? ae : new Error(ae)
                  })) : X.capability.resolve(), i._stats && (i._stats.timeEnd("Rendering"), i._stats.timeEnd("Overall"));
                }, X = new InternalRenderTask({
                  callback: W,
                  params: {
                    canvasContext: u,
                    viewport: c,
                    transform: E,
                    imageLayer: k,
                    background: m
                  },
                  objs: this.objs,
                  commonObjs: this.commonObjs,
                  annotationCanvasMap: S,
                  operatorList: R.operatorList,
                  pageIndex: this._pageIndex,
                  canvasFactory: L,
                  useRequestAnimationFrame: !$,
                  pdfBug: this._pdfBug
                });
                ((s = R).renderTasks || (s.renderTasks = /* @__PURE__ */ new Set())).add(X);
                var te = X.task;
                return Promise.all([R.displayReadyCapability.promise, v]).then(function(K) {
                  var ae = _slicedToArray(K, 2), V = ae[0], q = ae[1];
                  if (i.pendingCleanup) {
                    W();
                    return;
                  }
                  i._stats && i._stats.time("Rendering"), X.initializeGraphics({
                    transparency: V,
                    optionalContentConfig: q
                  }), X.operatorListChanged();
                }).catch(W), te;
              }
            }, {
              key: "getOperatorList",
              value: function() {
                var e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {}, t = e.intent, a = t === void 0 ? "display" : t, i = e.annotationMode, s = i === void 0 ? _util.AnnotationMode.ENABLE : i;
                function u() {
                  g.operatorList.lastChunk && (g.opListReadCapability.resolve(g.operatorList), g.renderTasks.delete(b));
                }
                var c = this._transport.getRenderingIntent(a, s, !0), g = this._intentStates.get(c.cacheKey);
                g || (g = /* @__PURE__ */ Object.create(null), this._intentStates.set(c.cacheKey, g));
                var b;
                if (!g.opListReadCapability) {
                  var A;
                  b = /* @__PURE__ */ Object.create(null), b.operatorListChanged = u, g.opListReadCapability = (0, _util.createPromiseCapability)(), ((A = g).renderTasks || (A.renderTasks = /* @__PURE__ */ new Set())).add(b), g.operatorList = {
                    fnArray: [],
                    argsArray: [],
                    lastChunk: !1
                  }, this._stats && this._stats.time("Page Request"), this._pumpOperatorList(c);
                }
                return g.opListReadCapability.promise;
              }
            }, {
              key: "streamTextContent",
              value: function() {
                var e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {}, t = e.normalizeWhitespace, a = t === void 0 ? !1 : t, i = e.disableCombineTextItems, s = i === void 0 ? !1 : i, u = e.includeMarkedContent, c = u === void 0 ? !1 : u, g = 100;
                return this._transport.messageHandler.sendWithStream("GetTextContent", {
                  pageIndex: this._pageIndex,
                  normalizeWhitespace: a === !0,
                  combineTextItems: s !== !0,
                  includeMarkedContent: c === !0
                }, {
                  highWaterMark: g,
                  size: function(A) {
                    return A.items.length;
                  }
                });
              }
            }, {
              key: "getTextContent",
              value: function() {
                var e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
                if (this._transport._htmlForXfa)
                  return this.getXfa().then(function(a) {
                    return _xfa_text.XfaText.textContent(a);
                  });
                var t = this.streamTextContent(e);
                return new Promise(function(a, i) {
                  function s() {
                    u.read().then(function(g) {
                      var b, A = g.value, I = g.done;
                      if (I) {
                        a(c);
                        return;
                      }
                      Object.assign(c.styles, A.styles), (b = c.items).push.apply(b, _toConsumableArray(A.items)), s();
                    }, i);
                  }
                  var u = t.getReader(), c = {
                    items: [],
                    styles: /* @__PURE__ */ Object.create(null)
                  };
                  s();
                });
              }
            }, {
              key: "getStructTree",
              value: function() {
                return this._structTreePromise || (this._structTreePromise = this._transport.getStructTree(this._pageIndex));
              }
            }, {
              key: "_destroy",
              value: function() {
                this.destroyed = !0;
                var e = [], t = _createForOfIteratorHelper(this._intentStates.values()), a;
                try {
                  for (t.s(); !(a = t.n()).done; ) {
                    var i = a.value;
                    if (this._abortOperatorList({
                      intentState: i,
                      reason: new Error("Page was destroyed."),
                      force: !0
                    }), !i.opListReadCapability) {
                      var s = _createForOfIteratorHelper(i.renderTasks), u;
                      try {
                        for (s.s(); !(u = s.n()).done; ) {
                          var c = u.value;
                          e.push(c.completed), c.cancel();
                        }
                      } catch (g) {
                        s.e(g);
                      } finally {
                        s.f();
                      }
                    }
                  }
                } catch (g) {
                  t.e(g);
                } finally {
                  t.f();
                }
                return this.objs.clear(), this._annotationPromises.clear(), this._jsActionsPromise = null, this._structTreePromise = null, this.pendingCleanup = !1, Promise.all(e);
              }
            }, {
              key: "cleanup",
              value: function() {
                var e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : !1;
                return this.pendingCleanup = !0, this._tryCleanup(e);
              }
            }, {
              key: "_tryCleanup",
              value: function() {
                var e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : !1;
                if (!this.pendingCleanup)
                  return !1;
                var t = _createForOfIteratorHelper(this._intentStates.values()), a;
                try {
                  for (t.s(); !(a = t.n()).done; ) {
                    var i = a.value, s = i.renderTasks, u = i.operatorList;
                    if (s.size > 0 || !u.lastChunk)
                      return !1;
                  }
                } catch (c) {
                  t.e(c);
                } finally {
                  t.f();
                }
                return this._intentStates.clear(), this.objs.clear(), this._annotationPromises.clear(), this._jsActionsPromise = null, this._structTreePromise = null, e && this._stats && (this._stats = new _display_utils.StatTimer()), this.pendingCleanup = !1, !0;
              }
            }, {
              key: "_startRenderPage",
              value: function(e, t) {
                var a = this._intentStates.get(t);
                !a || (this._stats && this._stats.timeEnd("Page Request"), a.displayReadyCapability && a.displayReadyCapability.resolve(e));
              }
            }, {
              key: "_renderPageChunk",
              value: function(e, t) {
                for (var a = 0, i = e.length; a < i; a++)
                  t.operatorList.fnArray.push(e.fnArray[a]), t.operatorList.argsArray.push(e.argsArray[a]);
                t.operatorList.lastChunk = e.lastChunk;
                var s = _createForOfIteratorHelper(t.renderTasks), u;
                try {
                  for (s.s(); !(u = s.n()).done; ) {
                    var c = u.value;
                    c.operatorListChanged();
                  }
                } catch (g) {
                  s.e(g);
                } finally {
                  s.f();
                }
                e.lastChunk && this._tryCleanup();
              }
            }, {
              key: "_pumpOperatorList",
              value: function(e) {
                var t = this, a = e.renderingIntent, i = e.cacheKey, s = this._transport.messageHandler.sendWithStream("GetOperatorList", {
                  pageIndex: this._pageIndex,
                  intent: a,
                  cacheKey: i,
                  annotationStorage: a & _util.RenderingIntentFlag.ANNOTATIONS_STORAGE ? this._transport.annotationStorage.serializable : null
                }), u = s.getReader(), c = this._intentStates.get(i);
                c.streamReader = u;
                var g = function b() {
                  u.read().then(function(A) {
                    var I = A.value, C = A.done;
                    if (C) {
                      c.streamReader = null;
                      return;
                    }
                    t._transport.destroyed || (t._renderPageChunk(I, c), b());
                  }, function(A) {
                    if (c.streamReader = null, !t._transport.destroyed) {
                      if (c.operatorList) {
                        c.operatorList.lastChunk = !0;
                        var I = _createForOfIteratorHelper(c.renderTasks), C;
                        try {
                          for (I.s(); !(C = I.n()).done; ) {
                            var E = C.value;
                            E.operatorListChanged();
                          }
                        } catch (O) {
                          I.e(O);
                        } finally {
                          I.f();
                        }
                        t._tryCleanup();
                      }
                      if (c.displayReadyCapability)
                        c.displayReadyCapability.reject(A);
                      else if (c.opListReadCapability)
                        c.opListReadCapability.reject(A);
                      else
                        throw A;
                    }
                  });
                };
                g();
              }
            }, {
              key: "_abortOperatorList",
              value: function(e) {
                var t = this, a = e.intentState, i = e.reason, s = e.force, u = s === void 0 ? !1 : s;
                if (!!a.streamReader) {
                  if (!u) {
                    if (a.renderTasks.size > 0)
                      return;
                    if (i instanceof _display_utils.RenderingCancelledException) {
                      a.streamReaderCancelTimeout = setTimeout(function() {
                        t._abortOperatorList({
                          intentState: a,
                          reason: i,
                          force: !0
                        }), a.streamReaderCancelTimeout = null;
                      }, RENDERING_CANCELLED_TIMEOUT);
                      return;
                    }
                  }
                  if (a.streamReader.cancel(new _util.AbortException(i.message)).catch(function() {
                  }), a.streamReader = null, !this._transport.destroyed) {
                    var c = _createForOfIteratorHelper(this._intentStates), g;
                    try {
                      for (c.s(); !(g = c.n()).done; ) {
                        var b = _slicedToArray(g.value, 2), A = b[0], I = b[1];
                        if (I === a) {
                          this._intentStates.delete(A);
                          break;
                        }
                      }
                    } catch (C) {
                      c.e(C);
                    } finally {
                      c.f();
                    }
                    this.cleanup();
                  }
                }
              }
            }, {
              key: "stats",
              get: function() {
                return this._stats;
              }
            }]), n;
          }();
          exports.PDFPageProxy = PDFPageProxy;
          var LoopbackPort = /* @__PURE__ */ function() {
            function n() {
              _classCallCheck(this, n), this._listeners = [], this._deferred = Promise.resolve();
            }
            return _createClass(n, [{
              key: "postMessage",
              value: function(e, t) {
                var a = this;
                function i(u) {
                  if (globalThis.structuredClone)
                    return globalThis.structuredClone(u, t);
                  function c(b) {
                    if (typeof b == "function" || _typeof(b) === "symbol" || b instanceof URL)
                      throw new Error("LoopbackPort.postMessage - cannot clone: ".concat(b == null ? void 0 : b.toString()));
                    if (_typeof(b) !== "object" || b === null)
                      return b;
                    if (g.has(b))
                      return g.get(b);
                    var A, I;
                    if ((A = b.buffer) && (0, _util.isArrayBuffer)(A))
                      return t != null && t.includes(A) ? I = new b.constructor(A, b.byteOffset, b.byteLength) : I = new b.constructor(b), g.set(b, I), I;
                    if (b instanceof Map) {
                      I = /* @__PURE__ */ new Map(), g.set(b, I);
                      var C = _createForOfIteratorHelper(b), E;
                      try {
                        for (C.s(); !(E = C.n()).done; ) {
                          var O = _slicedToArray(E.value, 2), k = O[0], N = O[1];
                          I.set(k, c(N));
                        }
                      } catch (y) {
                        C.e(y);
                      } finally {
                        C.f();
                      }
                      return I;
                    }
                    if (b instanceof Set) {
                      I = /* @__PURE__ */ new Set(), g.set(b, I);
                      var x = _createForOfIteratorHelper(b), U;
                      try {
                        for (x.s(); !(U = x.n()).done; ) {
                          var m = U.value;
                          I.add(c(m));
                        }
                      } catch (y) {
                        x.e(y);
                      } finally {
                        x.f();
                      }
                      return I;
                    }
                    I = Array.isArray(b) ? [] : /* @__PURE__ */ Object.create(null), g.set(b, I);
                    for (var f in b) {
                      for (var v, _ = void 0, S = b; !(_ = Object.getOwnPropertyDescriptor(S, f)); )
                        S = Object.getPrototypeOf(S);
                      typeof _.value > "u" || typeof _.value == "function" && !((v = b.hasOwnProperty) !== null && v !== void 0 && v.call(b, f)) || (I[f] = c(_.value));
                    }
                    return I;
                  }
                  var g = /* @__PURE__ */ new WeakMap();
                  return c(u);
                }
                var s = {
                  data: i(e)
                };
                this._deferred.then(function() {
                  var u = _createForOfIteratorHelper(a._listeners), c;
                  try {
                    for (u.s(); !(c = u.n()).done; ) {
                      var g = c.value;
                      g.call(a, s);
                    }
                  } catch (b) {
                    u.e(b);
                  } finally {
                    u.f();
                  }
                });
              }
            }, {
              key: "addEventListener",
              value: function(e, t) {
                this._listeners.push(t);
              }
            }, {
              key: "removeEventListener",
              value: function(e, t) {
                var a = this._listeners.indexOf(t);
                this._listeners.splice(a, 1);
              }
            }, {
              key: "terminate",
              value: function() {
                this._listeners.length = 0;
              }
            }]), n;
          }();
          exports.LoopbackPort = LoopbackPort;
          var PDFWorkerUtil = {
            isWorkerDisabled: !1,
            fallbackWorkerSrc: null,
            fakeWorkerId: 0
          };
          {
            if (_is_node.isNodeJS && typeof commonjsRequire == "function")
              PDFWorkerUtil.isWorkerDisabled = !0, PDFWorkerUtil.fallbackWorkerSrc = "./pdf.worker.js";
            else if ((typeof document > "u" ? "undefined" : _typeof(document)) === "object") {
              var _document, _document$currentScri, pdfjsFilePath = (_document = document) === null || _document === void 0 || (_document$currentScri = _document.currentScript) === null || _document$currentScri === void 0 ? void 0 : _document$currentScri.src;
              pdfjsFilePath && (PDFWorkerUtil.fallbackWorkerSrc = pdfjsFilePath.replace(/(\.(?:min\.)?js)(\?.*)?$/i, ".worker$1$2"));
            }
            PDFWorkerUtil.createCDNWrapper = function(n) {
              var r = 'importScripts("'.concat(n, '");');
              return URL.createObjectURL(new Blob([r]));
            };
          }
          var PDFWorker = /* @__PURE__ */ function() {
            function PDFWorker() {
              var n = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {}, r = n.name, e = r === void 0 ? null : r, t = n.port, a = t === void 0 ? null : t, i = n.verbosity, s = i === void 0 ? (0, _util.getVerbosityLevel)() : i;
              if (_classCallCheck(this, PDFWorker), a && PDFWorker._workerPorts.has(a))
                throw new Error("Cannot use more than one PDFWorker per port.");
              if (this.name = e, this.destroyed = !1, this.verbosity = s, this._readyCapability = (0, _util.createPromiseCapability)(), this._port = null, this._webWorker = null, this._messageHandler = null, a) {
                PDFWorker._workerPorts.set(a, this), this._initializeFromPort(a);
                return;
              }
              this._initialize();
            }
            return _createClass(PDFWorker, [{
              key: "promise",
              get: function() {
                return this._readyCapability.promise;
              }
            }, {
              key: "port",
              get: function() {
                return this._port;
              }
            }, {
              key: "messageHandler",
              get: function() {
                return this._messageHandler;
              }
            }, {
              key: "_initializeFromPort",
              value: function(r) {
                this._port = r, this._messageHandler = new _message_handler.MessageHandler("main", "worker", r), this._messageHandler.on("ready", function() {
                }), this._readyCapability.resolve();
              }
            }, {
              key: "_initialize",
              value: function() {
                var r = this;
                if (typeof Worker < "u" && !PDFWorkerUtil.isWorkerDisabled && !PDFWorker._mainThreadWorkerMessageHandler) {
                  var e = PDFWorker.workerSrc;
                  try {
                    (0, _util.isSameOrigin)(window.location.href, e) || (e = PDFWorkerUtil.createCDNWrapper(new URL(e, window.location).href));
                    var t = new Worker(e), a = new _message_handler.MessageHandler("main", "worker", t), i = function() {
                      t.removeEventListener("error", s), a.destroy(), t.terminate(), r.destroyed ? r._readyCapability.reject(new Error("Worker was destroyed")) : r._setupFakeWorker();
                    }, s = function() {
                      r._webWorker || i();
                    };
                    t.addEventListener("error", s), a.on("test", function(c) {
                      if (t.removeEventListener("error", s), r.destroyed) {
                        i();
                        return;
                      }
                      c ? (r._messageHandler = a, r._port = t, r._webWorker = t, r._readyCapability.resolve(), a.send("configure", {
                        verbosity: r.verbosity
                      })) : (r._setupFakeWorker(), a.destroy(), t.terminate());
                    }), a.on("ready", function(c) {
                      if (t.removeEventListener("error", s), r.destroyed) {
                        i();
                        return;
                      }
                      try {
                        u();
                      } catch {
                        r._setupFakeWorker();
                      }
                    });
                    var u = function() {
                      var g = new Uint8Array([255]);
                      try {
                        a.send("test", g, [g.buffer]);
                      } catch {
                        (0, _util.warn)("Cannot use postMessage transfers."), g[0] = 0, a.send("test", g);
                      }
                    };
                    u();
                    return;
                  } catch {
                    (0, _util.info)("The worker has been disabled.");
                  }
                }
                this._setupFakeWorker();
              }
            }, {
              key: "_setupFakeWorker",
              value: function() {
                var r = this;
                PDFWorkerUtil.isWorkerDisabled || ((0, _util.warn)("Setting up fake worker."), PDFWorkerUtil.isWorkerDisabled = !0), PDFWorker._setupFakeWorkerGlobal.then(function(e) {
                  if (r.destroyed) {
                    r._readyCapability.reject(new Error("Worker was destroyed"));
                    return;
                  }
                  var t = new LoopbackPort();
                  r._port = t;
                  var a = "fake".concat(PDFWorkerUtil.fakeWorkerId++), i = new _message_handler.MessageHandler(a + "_worker", a, t);
                  e.setup(i, t);
                  var s = new _message_handler.MessageHandler(a, a + "_worker", t);
                  r._messageHandler = s, r._readyCapability.resolve(), s.send("configure", {
                    verbosity: r.verbosity
                  });
                }).catch(function(e) {
                  r._readyCapability.reject(new Error('Setting up fake worker failed: "'.concat(e.message, '".')));
                });
              }
            }, {
              key: "destroy",
              value: function() {
                this.destroyed = !0, this._webWorker && (this._webWorker.terminate(), this._webWorker = null), PDFWorker._workerPorts.delete(this._port), this._port = null, this._messageHandler && (this._messageHandler.destroy(), this._messageHandler = null);
              }
            }], [{
              key: "_workerPorts",
              get: function() {
                return (0, _util.shadow)(this, "_workerPorts", /* @__PURE__ */ new WeakMap());
              }
            }, {
              key: "fromPort",
              value: function(r) {
                if (!(r != null && r.port))
                  throw new Error("PDFWorker.fromPort - invalid method signature.");
                return this._workerPorts.has(r.port) ? this._workerPorts.get(r.port) : new PDFWorker(r);
              }
            }, {
              key: "workerSrc",
              get: function() {
                if (_worker_options.GlobalWorkerOptions.workerSrc)
                  return _worker_options.GlobalWorkerOptions.workerSrc;
                if (PDFWorkerUtil.fallbackWorkerSrc !== null)
                  return _is_node.isNodeJS || (0, _display_utils.deprecated)('No "GlobalWorkerOptions.workerSrc" specified.'), PDFWorkerUtil.fallbackWorkerSrc;
                throw new Error('No "GlobalWorkerOptions.workerSrc" specified.');
              }
            }, {
              key: "_mainThreadWorkerMessageHandler",
              get: function() {
                try {
                  var r;
                  return ((r = globalThis.pdfjsWorker) === null || r === void 0 ? void 0 : r.WorkerMessageHandler) || null;
                } catch {
                  return null;
                }
              }
            }, {
              key: "_setupFakeWorkerGlobal",
              get: function get() {
                var _this11 = this, loader = /* @__PURE__ */ function() {
                  var _ref15 = _asyncToGenerator(/* @__PURE__ */ _regenerator.default.mark(function _callee4() {
                    var mainWorkerMessageHandler, worker;
                    return _regenerator.default.wrap(function _callee4$(_context4) {
                      for (; ; )
                        switch (_context4.prev = _context4.next) {
                          case 0:
                            if (mainWorkerMessageHandler = _this11._mainThreadWorkerMessageHandler, !mainWorkerMessageHandler) {
                              _context4.next = 3;
                              break;
                            }
                            return _context4.abrupt("return", mainWorkerMessageHandler);
                          case 3:
                            if (!(_is_node.isNodeJS && typeof commonjsRequire == "function")) {
                              _context4.next = 6;
                              break;
                            }
                            return worker = eval("require")(_this11.workerSrc), _context4.abrupt("return", worker.WorkerMessageHandler);
                          case 6:
                            return _context4.next = 8, (0, _display_utils.loadScript)(_this11.workerSrc);
                          case 8:
                            return _context4.abrupt("return", window.pdfjsWorker.WorkerMessageHandler);
                          case 9:
                          case "end":
                            return _context4.stop();
                        }
                    }, _callee4);
                  }));
                  return function n() {
                    return _ref15.apply(this, arguments);
                  };
                }();
                return (0, _util.shadow)(this, "_setupFakeWorkerGlobal", loader());
              }
            }]), PDFWorker;
          }();
          exports.PDFWorker = PDFWorker, PDFWorker.getWorkerSrc = function() {
            return (0, _display_utils.deprecated)("`PDFWorker.getWorkerSrc()`, please use `PDFWorker.workerSrc` instead."), this.workerSrc;
          };
          var _docStats = /* @__PURE__ */ new WeakMap(), _pageCache = /* @__PURE__ */ new WeakMap(), _pagePromises = /* @__PURE__ */ new WeakMap(), _metadataPromise = /* @__PURE__ */ new WeakMap(), WorkerTransport = /* @__PURE__ */ function() {
            function n(r, e, t, a) {
              _classCallCheck(this, n), _classPrivateFieldInitSpec(this, _docStats, {
                writable: !0,
                value: null
              }), _classPrivateFieldInitSpec(this, _pageCache, {
                writable: !0,
                value: /* @__PURE__ */ new Map()
              }), _classPrivateFieldInitSpec(this, _pagePromises, {
                writable: !0,
                value: /* @__PURE__ */ new Map()
              }), _classPrivateFieldInitSpec(this, _metadataPromise, {
                writable: !0,
                value: null
              }), this.messageHandler = r, this.loadingTask = e, this.commonObjs = new PDFObjects(), this.fontLoader = new _font_loader.FontLoader({
                docId: e.docId,
                onUnsupportedFeature: this._onUnsupportedFeature.bind(this),
                ownerDocument: a.ownerDocument,
                styleElement: a.styleElement
              }), this._params = a, a.useWorkerFetch || (this.CMapReaderFactory = new a.CMapReaderFactory({
                baseUrl: a.cMapUrl,
                isCompressed: a.cMapPacked
              }), this.StandardFontDataFactory = new a.StandardFontDataFactory({
                baseUrl: a.standardFontDataUrl
              })), this.destroyed = !1, this.destroyCapability = null, this._passwordCapability = null, this._networkStream = t, this._fullReader = null, this._lastProgress = null, this.downloadInfoCapability = (0, _util.createPromiseCapability)(), this.setupMessageHandler();
            }
            return _createClass(n, [{
              key: "annotationStorage",
              get: function() {
                return (0, _util.shadow)(this, "annotationStorage", new _annotation_storage.AnnotationStorage());
              }
            }, {
              key: "stats",
              get: function() {
                return _classPrivateFieldGet(this, _docStats);
              }
            }, {
              key: "getRenderingIntent",
              value: function(e) {
                var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : _util.AnnotationMode.ENABLE, a = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : !1, i = _util.RenderingIntentFlag.DISPLAY, s = "";
                switch (e) {
                  case "any":
                    i = _util.RenderingIntentFlag.ANY;
                    break;
                  case "display":
                    break;
                  case "print":
                    i = _util.RenderingIntentFlag.PRINT;
                    break;
                  default:
                    (0, _util.warn)("getRenderingIntent - invalid intent: ".concat(e));
                }
                switch (t) {
                  case _util.AnnotationMode.DISABLE:
                    i += _util.RenderingIntentFlag.ANNOTATIONS_DISABLE;
                    break;
                  case _util.AnnotationMode.ENABLE:
                    break;
                  case _util.AnnotationMode.ENABLE_FORMS:
                    i += _util.RenderingIntentFlag.ANNOTATIONS_FORMS;
                    break;
                  case _util.AnnotationMode.ENABLE_STORAGE:
                    i += _util.RenderingIntentFlag.ANNOTATIONS_STORAGE, s = this.annotationStorage.lastModified;
                    break;
                  default:
                    (0, _util.warn)("getRenderingIntent - invalid annotationMode: ".concat(t));
                }
                return a && (i += _util.RenderingIntentFlag.OPLIST), {
                  renderingIntent: i,
                  cacheKey: "".concat(i, "_").concat(s)
                };
              }
            }, {
              key: "destroy",
              value: function() {
                var e = this;
                if (this.destroyCapability)
                  return this.destroyCapability.promise;
                this.destroyed = !0, this.destroyCapability = (0, _util.createPromiseCapability)(), this._passwordCapability && this._passwordCapability.reject(new Error("Worker was destroyed during onPassword callback"));
                var t = [], a = _createForOfIteratorHelper(_classPrivateFieldGet(this, _pageCache).values()), i;
                try {
                  for (a.s(); !(i = a.n()).done; ) {
                    var s = i.value;
                    t.push(s._destroy());
                  }
                } catch (c) {
                  a.e(c);
                } finally {
                  a.f();
                }
                _classPrivateFieldGet(this, _pageCache).clear(), _classPrivateFieldGet(this, _pagePromises).clear(), this.hasOwnProperty("annotationStorage") && this.annotationStorage.resetModified();
                var u = this.messageHandler.sendWithPromise("Terminate", null);
                return t.push(u), Promise.all(t).then(function() {
                  e.commonObjs.clear(), e.fontLoader.clear(), _classPrivateFieldSet(e, _metadataPromise, null), e._getFieldObjectsPromise = null, e._hasJSActionsPromise = null, e._networkStream && e._networkStream.cancelAllRequests(new _util.AbortException("Worker was terminated.")), e.messageHandler && (e.messageHandler.destroy(), e.messageHandler = null), e.destroyCapability.resolve();
                }, this.destroyCapability.reject), this.destroyCapability.promise;
              }
            }, {
              key: "setupMessageHandler",
              value: function() {
                var e = this, t = this.messageHandler, a = this.loadingTask;
                t.on("GetReader", function(i, s) {
                  (0, _util.assert)(e._networkStream, "GetReader - no `IPDFStream` instance available."), e._fullReader = e._networkStream.getFullReader(), e._fullReader.onProgress = function(u) {
                    e._lastProgress = {
                      loaded: u.loaded,
                      total: u.total
                    };
                  }, s.onPull = function() {
                    e._fullReader.read().then(function(u) {
                      var c = u.value, g = u.done;
                      if (g) {
                        s.close();
                        return;
                      }
                      (0, _util.assert)((0, _util.isArrayBuffer)(c), "GetReader - expected an ArrayBuffer."), s.enqueue(new Uint8Array(c), 1, [c]);
                    }).catch(function(u) {
                      s.error(u);
                    });
                  }, s.onCancel = function(u) {
                    e._fullReader.cancel(u), s.ready.catch(function(c) {
                      if (!e.destroyed)
                        throw c;
                    });
                  };
                }), t.on("ReaderHeadersReady", function(i) {
                  var s = (0, _util.createPromiseCapability)(), u = e._fullReader;
                  return u.headersReady.then(function() {
                    if (!u.isStreamingSupported || !u.isRangeSupported) {
                      if (e._lastProgress) {
                        var c;
                        (c = a.onProgress) === null || c === void 0 || c.call(a, e._lastProgress);
                      }
                      u.onProgress = function(g) {
                        var b;
                        (b = a.onProgress) === null || b === void 0 || b.call(a, {
                          loaded: g.loaded,
                          total: g.total
                        });
                      };
                    }
                    s.resolve({
                      isStreamingSupported: u.isStreamingSupported,
                      isRangeSupported: u.isRangeSupported,
                      contentLength: u.contentLength
                    });
                  }, s.reject), s.promise;
                }), t.on("GetRangeReader", function(i, s) {
                  (0, _util.assert)(e._networkStream, "GetRangeReader - no `IPDFStream` instance available.");
                  var u = e._networkStream.getRangeReader(i.begin, i.end);
                  if (!u) {
                    s.close();
                    return;
                  }
                  s.onPull = function() {
                    u.read().then(function(c) {
                      var g = c.value, b = c.done;
                      if (b) {
                        s.close();
                        return;
                      }
                      (0, _util.assert)((0, _util.isArrayBuffer)(g), "GetRangeReader - expected an ArrayBuffer."), s.enqueue(new Uint8Array(g), 1, [g]);
                    }).catch(function(c) {
                      s.error(c);
                    });
                  }, s.onCancel = function(c) {
                    u.cancel(c), s.ready.catch(function(g) {
                      if (!e.destroyed)
                        throw g;
                    });
                  };
                }), t.on("GetDoc", function(i) {
                  var s = i.pdfInfo;
                  e._numPages = s.numPages, e._htmlForXfa = s.htmlForXfa, delete s.htmlForXfa, a._capability.resolve(new PDFDocumentProxy(s, e));
                }), t.on("DocException", function(i) {
                  var s;
                  switch (i.name) {
                    case "PasswordException":
                      s = new _util.PasswordException(i.message, i.code);
                      break;
                    case "InvalidPDFException":
                      s = new _util.InvalidPDFException(i.message);
                      break;
                    case "MissingPDFException":
                      s = new _util.MissingPDFException(i.message);
                      break;
                    case "UnexpectedResponseException":
                      s = new _util.UnexpectedResponseException(i.message, i.status);
                      break;
                    case "UnknownErrorException":
                      s = new _util.UnknownErrorException(i.message, i.details);
                      break;
                    default:
                      (0, _util.unreachable)("DocException - expected a valid Error.");
                  }
                  a._capability.reject(s);
                }), t.on("PasswordRequest", function(i) {
                  if (e._passwordCapability = (0, _util.createPromiseCapability)(), a.onPassword) {
                    var s = function(c) {
                      e._passwordCapability.resolve({
                        password: c
                      });
                    };
                    try {
                      a.onPassword(s, i.code);
                    } catch (u) {
                      e._passwordCapability.reject(u);
                    }
                  } else
                    e._passwordCapability.reject(new _util.PasswordException(i.message, i.code));
                  return e._passwordCapability.promise;
                }), t.on("DataLoaded", function(i) {
                  var s;
                  (s = a.onProgress) === null || s === void 0 || s.call(a, {
                    loaded: i.length,
                    total: i.length
                  }), e.downloadInfoCapability.resolve(i);
                }), t.on("StartRenderPage", function(i) {
                  if (!e.destroyed) {
                    var s = _classPrivateFieldGet(e, _pageCache).get(i.pageIndex);
                    s._startRenderPage(i.transparency, i.cacheKey);
                  }
                }), t.on("commonobj", function(i) {
                  var s, u = _slicedToArray(i, 3), c = u[0], g = u[1], b = u[2];
                  if (!e.destroyed && !e.commonObjs.has(c))
                    switch (g) {
                      case "Font":
                        var A = e._params;
                        if ("error" in b) {
                          var I = b.error;
                          (0, _util.warn)("Error during font loading: ".concat(I)), e.commonObjs.resolve(c, I);
                          break;
                        }
                        var C = null;
                        A.pdfBug && (s = globalThis.FontInspector) !== null && s !== void 0 && s.enabled && (C = {
                          registerFont: function(k, N) {
                            globalThis.FontInspector.fontAdded(k, N);
                          }
                        });
                        var E = new _font_loader.FontFaceObject(b, {
                          isEvalSupported: A.isEvalSupported,
                          disableFontFace: A.disableFontFace,
                          ignoreErrors: A.ignoreErrors,
                          onUnsupportedFeature: e._onUnsupportedFeature.bind(e),
                          fontRegistry: C
                        });
                        e.fontLoader.bind(E).catch(function(O) {
                          return t.sendWithPromise("FontFallback", {
                            id: c
                          });
                        }).finally(function() {
                          !A.fontExtraProperties && E.data && (E.data = null), e.commonObjs.resolve(c, E);
                        });
                        break;
                      case "FontPath":
                      case "Image":
                        e.commonObjs.resolve(c, b);
                        break;
                      default:
                        throw new Error("Got unknown common object type ".concat(g));
                    }
                }), t.on("obj", function(i) {
                  var s, u = _slicedToArray(i, 4), c = u[0], g = u[1], b = u[2], A = u[3];
                  if (!e.destroyed) {
                    var I = _classPrivateFieldGet(e, _pageCache).get(g);
                    if (!I.objs.has(c))
                      switch (b) {
                        case "Image":
                          I.objs.resolve(c, A);
                          var C = 8e6;
                          (A == null || (s = A.data) === null || s === void 0 ? void 0 : s.length) > C && (I.cleanupAfterRender = !0);
                          break;
                        case "Pattern":
                          I.objs.resolve(c, A);
                          break;
                        default:
                          throw new Error("Got unknown object type ".concat(b));
                      }
                  }
                }), t.on("DocProgress", function(i) {
                  var s;
                  e.destroyed || (s = a.onProgress) === null || s === void 0 || s.call(a, {
                    loaded: i.loaded,
                    total: i.total
                  });
                }), t.on("DocStats", function(i) {
                  e.destroyed || _classPrivateFieldSet(e, _docStats, Object.freeze({
                    streamTypes: Object.freeze(i.streamTypes),
                    fontTypes: Object.freeze(i.fontTypes)
                  }));
                }), t.on("UnsupportedFeature", this._onUnsupportedFeature.bind(this)), t.on("FetchBuiltInCMap", function(i) {
                  return e.destroyed ? Promise.reject(new Error("Worker was destroyed.")) : e.CMapReaderFactory ? e.CMapReaderFactory.fetch(i) : Promise.reject(new Error("CMapReaderFactory not initialized, see the `useWorkerFetch` parameter."));
                }), t.on("FetchStandardFontData", function(i) {
                  return e.destroyed ? Promise.reject(new Error("Worker was destroyed.")) : e.StandardFontDataFactory ? e.StandardFontDataFactory.fetch(i) : Promise.reject(new Error("StandardFontDataFactory not initialized, see the `useWorkerFetch` parameter."));
                });
              }
            }, {
              key: "_onUnsupportedFeature",
              value: function(e) {
                var t, a, i = e.featureId;
                this.destroyed || (t = (a = this.loadingTask).onUnsupportedFeature) === null || t === void 0 || t.call(a, i);
              }
            }, {
              key: "getData",
              value: function() {
                return this.messageHandler.sendWithPromise("GetData", null);
              }
            }, {
              key: "getPage",
              value: function(e) {
                var t = this;
                if (!Number.isInteger(e) || e <= 0 || e > this._numPages)
                  return Promise.reject(new Error("Invalid page request"));
                var a = e - 1, i = _classPrivateFieldGet(this, _pagePromises).get(a);
                if (i)
                  return i;
                var s = this.messageHandler.sendWithPromise("GetPage", {
                  pageIndex: a
                }).then(function(u) {
                  if (t.destroyed)
                    throw new Error("Transport destroyed");
                  var c = new PDFPageProxy(a, u, t, t._params.ownerDocument, t._params.pdfBug);
                  return _classPrivateFieldGet(t, _pageCache).set(a, c), c;
                });
                return _classPrivateFieldGet(this, _pagePromises).set(a, s), s;
              }
            }, {
              key: "getPageIndex",
              value: function(e) {
                return this.messageHandler.sendWithPromise("GetPageIndex", {
                  ref: e
                });
              }
            }, {
              key: "getAnnotations",
              value: function(e, t) {
                return this.messageHandler.sendWithPromise("GetAnnotations", {
                  pageIndex: e,
                  intent: t
                });
              }
            }, {
              key: "saveDocument",
              value: function() {
                var e, t, a = this;
                return this.messageHandler.sendWithPromise("SaveDocument", {
                  isPureXfa: !!this._htmlForXfa,
                  numPages: this._numPages,
                  annotationStorage: this.annotationStorage.serializable,
                  filename: (e = (t = this._fullReader) === null || t === void 0 ? void 0 : t.filename) !== null && e !== void 0 ? e : null
                }).finally(function() {
                  a.annotationStorage.resetModified();
                });
              }
            }, {
              key: "getFieldObjects",
              value: function() {
                return this._getFieldObjectsPromise || (this._getFieldObjectsPromise = this.messageHandler.sendWithPromise("GetFieldObjects", null));
              }
            }, {
              key: "hasJSActions",
              value: function() {
                return this._hasJSActionsPromise || (this._hasJSActionsPromise = this.messageHandler.sendWithPromise("HasJSActions", null));
              }
            }, {
              key: "getCalculationOrderIds",
              value: function() {
                return this.messageHandler.sendWithPromise("GetCalculationOrderIds", null);
              }
            }, {
              key: "getDestinations",
              value: function() {
                return this.messageHandler.sendWithPromise("GetDestinations", null);
              }
            }, {
              key: "getDestination",
              value: function(e) {
                return typeof e != "string" ? Promise.reject(new Error("Invalid destination request.")) : this.messageHandler.sendWithPromise("GetDestination", {
                  id: e
                });
              }
            }, {
              key: "getPageLabels",
              value: function() {
                return this.messageHandler.sendWithPromise("GetPageLabels", null);
              }
            }, {
              key: "getPageLayout",
              value: function() {
                return this.messageHandler.sendWithPromise("GetPageLayout", null);
              }
            }, {
              key: "getPageMode",
              value: function() {
                return this.messageHandler.sendWithPromise("GetPageMode", null);
              }
            }, {
              key: "getViewerPreferences",
              value: function() {
                return this.messageHandler.sendWithPromise("GetViewerPreferences", null);
              }
            }, {
              key: "getOpenAction",
              value: function() {
                return this.messageHandler.sendWithPromise("GetOpenAction", null);
              }
            }, {
              key: "getAttachments",
              value: function() {
                return this.messageHandler.sendWithPromise("GetAttachments", null);
              }
            }, {
              key: "getJavaScript",
              value: function() {
                return this.messageHandler.sendWithPromise("GetJavaScript", null);
              }
            }, {
              key: "getDocJSActions",
              value: function() {
                return this.messageHandler.sendWithPromise("GetDocJSActions", null);
              }
            }, {
              key: "getPageJSActions",
              value: function(e) {
                return this.messageHandler.sendWithPromise("GetPageJSActions", {
                  pageIndex: e
                });
              }
            }, {
              key: "getStructTree",
              value: function(e) {
                return this.messageHandler.sendWithPromise("GetStructTree", {
                  pageIndex: e
                });
              }
            }, {
              key: "getOutline",
              value: function() {
                return this.messageHandler.sendWithPromise("GetOutline", null);
              }
            }, {
              key: "getOptionalContentConfig",
              value: function() {
                return this.messageHandler.sendWithPromise("GetOptionalContentConfig", null).then(function(e) {
                  return new _optional_content_config.OptionalContentConfig(e);
                });
              }
            }, {
              key: "getPermissions",
              value: function() {
                return this.messageHandler.sendWithPromise("GetPermissions", null);
              }
            }, {
              key: "getMetadata",
              value: function() {
                var e = this;
                return _classPrivateFieldGet(this, _metadataPromise) || _classPrivateFieldSet(this, _metadataPromise, this.messageHandler.sendWithPromise("GetMetadata", null).then(function(t) {
                  var a, i, s, u;
                  return {
                    info: t[0],
                    metadata: t[1] ? new _metadata.Metadata(t[1]) : null,
                    contentDispositionFilename: (a = (i = e._fullReader) === null || i === void 0 ? void 0 : i.filename) !== null && a !== void 0 ? a : null,
                    contentLength: (s = (u = e._fullReader) === null || u === void 0 ? void 0 : u.contentLength) !== null && s !== void 0 ? s : null
                  };
                }));
              }
            }, {
              key: "getMarkInfo",
              value: function() {
                return this.messageHandler.sendWithPromise("GetMarkInfo", null);
              }
            }, {
              key: "startCleanup",
              value: function() {
                var r = _asyncToGenerator(/* @__PURE__ */ _regenerator.default.mark(function t() {
                  var a, i, s, u, c, g = arguments;
                  return _regenerator.default.wrap(function(A) {
                    for (; ; )
                      switch (A.prev = A.next) {
                        case 0:
                          return a = g.length > 0 && g[0] !== void 0 ? g[0] : !1, A.next = 3, this.messageHandler.sendWithPromise("Cleanup", null);
                        case 3:
                          if (!this.destroyed) {
                            A.next = 5;
                            break;
                          }
                          return A.abrupt("return");
                        case 5:
                          i = _createForOfIteratorHelper(_classPrivateFieldGet(this, _pageCache).values()), A.prev = 6, i.s();
                        case 8:
                          if ((s = i.n()).done) {
                            A.next = 15;
                            break;
                          }
                          if (u = s.value, c = u.cleanup(), c) {
                            A.next = 13;
                            break;
                          }
                          throw new Error("startCleanup: Page ".concat(u.pageNumber, " is currently rendering."));
                        case 13:
                          A.next = 8;
                          break;
                        case 15:
                          A.next = 20;
                          break;
                        case 17:
                          A.prev = 17, A.t0 = A.catch(6), i.e(A.t0);
                        case 20:
                          return A.prev = 20, i.f(), A.finish(20);
                        case 23:
                          this.commonObjs.clear(), a || this.fontLoader.clear(), _classPrivateFieldSet(this, _metadataPromise, null), this._getFieldObjectsPromise = null, this._hasJSActionsPromise = null;
                        case 28:
                        case "end":
                          return A.stop();
                      }
                  }, t, this, [[6, 17, 20, 23]]);
                }));
                function e() {
                  return r.apply(this, arguments);
                }
                return e;
              }()
            }, {
              key: "loadingParams",
              get: function() {
                var e = this._params;
                return (0, _util.shadow)(this, "loadingParams", {
                  disableAutoFetch: e.disableAutoFetch,
                  enableXfa: e.enableXfa
                });
              }
            }]), n;
          }(), PDFObjects = /* @__PURE__ */ function() {
            function n() {
              _classCallCheck(this, n), this._objs = /* @__PURE__ */ Object.create(null);
            }
            return _createClass(n, [{
              key: "_ensureObj",
              value: function(e) {
                return this._objs[e] ? this._objs[e] : this._objs[e] = {
                  capability: (0, _util.createPromiseCapability)(),
                  data: null,
                  resolved: !1
                };
              }
            }, {
              key: "get",
              value: function(e) {
                var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : null;
                if (t)
                  return this._ensureObj(e).capability.promise.then(t), null;
                var a = this._objs[e];
                if (!a || !a.resolved)
                  throw new Error("Requesting object that isn't resolved yet ".concat(e, "."));
                return a.data;
              }
            }, {
              key: "has",
              value: function(e) {
                var t = this._objs[e];
                return (t == null ? void 0 : t.resolved) || !1;
              }
            }, {
              key: "resolve",
              value: function(e, t) {
                var a = this._ensureObj(e);
                a.resolved = !0, a.data = t, a.capability.resolve(t);
              }
            }, {
              key: "clear",
              value: function() {
                this._objs = /* @__PURE__ */ Object.create(null);
              }
            }]), n;
          }(), RenderTask = /* @__PURE__ */ function() {
            function n(r) {
              _classCallCheck(this, n), this._internalRenderTask = r, this.onContinue = null;
            }
            return _createClass(n, [{
              key: "promise",
              get: function() {
                return this._internalRenderTask.capability.promise;
              }
            }, {
              key: "cancel",
              value: function() {
                this._internalRenderTask.cancel();
              }
            }]), n;
          }();
          exports.RenderTask = RenderTask;
          var InternalRenderTask = /* @__PURE__ */ function() {
            function n(r) {
              var e = r.callback, t = r.params, a = r.objs, i = r.commonObjs, s = r.annotationCanvasMap, u = r.operatorList, c = r.pageIndex, g = r.canvasFactory, b = r.useRequestAnimationFrame, A = b === void 0 ? !1 : b, I = r.pdfBug, C = I === void 0 ? !1 : I;
              _classCallCheck(this, n), this.callback = e, this.params = t, this.objs = a, this.commonObjs = i, this.annotationCanvasMap = s, this.operatorListIdx = null, this.operatorList = u, this._pageIndex = c, this.canvasFactory = g, this._pdfBug = C, this.running = !1, this.graphicsReadyCallback = null, this.graphicsReady = !1, this._useRequestAnimationFrame = A === !0 && typeof window < "u", this.cancelled = !1, this.capability = (0, _util.createPromiseCapability)(), this.task = new RenderTask(this), this._cancelBound = this.cancel.bind(this), this._continueBound = this._continue.bind(this), this._scheduleNextBound = this._scheduleNext.bind(this), this._nextBound = this._next.bind(this), this._canvas = t.canvasContext.canvas;
            }
            return _createClass(n, [{
              key: "completed",
              get: function() {
                return this.capability.promise.catch(function() {
                });
              }
            }, {
              key: "initializeGraphics",
              value: function(e) {
                var t, a = e.transparency, i = a === void 0 ? !1 : a, s = e.optionalContentConfig;
                if (!this.cancelled) {
                  if (this._canvas) {
                    if (n.canvasInUse.has(this._canvas))
                      throw new Error("Cannot use the same canvas during multiple render() operations. Use different canvas or ensure previous operations were cancelled or completed.");
                    n.canvasInUse.add(this._canvas);
                  }
                  this._pdfBug && (t = globalThis.StepperManager) !== null && t !== void 0 && t.enabled && (this.stepper = globalThis.StepperManager.create(this._pageIndex), this.stepper.init(this.operatorList), this.stepper.nextBreakPoint = this.stepper.getNextBreakPoint());
                  var u = this.params, c = u.canvasContext, g = u.viewport, b = u.transform, A = u.imageLayer, I = u.background;
                  this.gfx = new _canvas.CanvasGraphics(c, this.commonObjs, this.objs, this.canvasFactory, A, s, this.annotationCanvasMap), this.gfx.beginDrawing({
                    transform: b,
                    viewport: g,
                    transparency: i,
                    background: I
                  }), this.operatorListIdx = 0, this.graphicsReady = !0, this.graphicsReadyCallback && this.graphicsReadyCallback();
                }
              }
            }, {
              key: "cancel",
              value: function() {
                var e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : null;
                this.running = !1, this.cancelled = !0, this.gfx && this.gfx.endDrawing(), this._canvas && n.canvasInUse.delete(this._canvas), this.callback(e || new _display_utils.RenderingCancelledException("Rendering cancelled, page ".concat(this._pageIndex + 1), "canvas"));
              }
            }, {
              key: "operatorListChanged",
              value: function() {
                if (!this.graphicsReady) {
                  this.graphicsReadyCallback || (this.graphicsReadyCallback = this._continueBound);
                  return;
                }
                this.stepper && this.stepper.updateOperatorList(this.operatorList), !this.running && this._continue();
              }
            }, {
              key: "_continue",
              value: function() {
                this.running = !0, !this.cancelled && (this.task.onContinue ? this.task.onContinue(this._scheduleNextBound) : this._scheduleNext());
              }
            }, {
              key: "_scheduleNext",
              value: function() {
                var e = this;
                this._useRequestAnimationFrame ? window.requestAnimationFrame(function() {
                  e._nextBound().catch(e._cancelBound);
                }) : Promise.resolve().then(this._nextBound).catch(this._cancelBound);
              }
            }, {
              key: "_next",
              value: function() {
                var r = _asyncToGenerator(/* @__PURE__ */ _regenerator.default.mark(function t() {
                  return _regenerator.default.wrap(function(i) {
                    for (; ; )
                      switch (i.prev = i.next) {
                        case 0:
                          if (!this.cancelled) {
                            i.next = 2;
                            break;
                          }
                          return i.abrupt("return");
                        case 2:
                          this.operatorListIdx = this.gfx.executeOperatorList(this.operatorList, this.operatorListIdx, this._continueBound, this.stepper), this.operatorListIdx === this.operatorList.argsArray.length && (this.running = !1, this.operatorList.lastChunk && (this.gfx.endDrawing(), this._canvas && n.canvasInUse.delete(this._canvas), this.callback()));
                        case 4:
                        case "end":
                          return i.stop();
                      }
                  }, t, this);
                }));
                function e() {
                  return r.apply(this, arguments);
                }
                return e;
              }()
            }], [{
              key: "canvasInUse",
              get: function() {
                return (0, _util.shadow)(this, "canvasInUse", /* @__PURE__ */ new WeakSet());
              }
            }]), n;
          }(), version = "2.12.313";
          exports.version = version;
          var build = "a2ae56f39";
          exports.build = build;
        },
        (n, r, e) => {
          function t(y) {
            return typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? t = function(L) {
              return typeof L;
            } : t = function(L) {
              return L && typeof Symbol == "function" && L.constructor === Symbol && L !== Symbol.prototype ? "symbol" : typeof L;
            }, t(y);
          }
          Object.defineProperty(r, "__esModule", {
            value: !0
          }), r.FontLoader = r.FontFaceObject = void 0;
          var a = s(e(2)), i = e(4);
          function s(y) {
            return y && y.__esModule ? y : { default: y };
          }
          function u(y, R) {
            if (typeof R != "function" && R !== null)
              throw new TypeError("Super expression must either be null or a function");
            y.prototype = Object.create(R && R.prototype, { constructor: { value: y, writable: !0, configurable: !0 } }), R && c(y, R);
          }
          function c(y, R) {
            return c = Object.setPrototypeOf || function($, W) {
              return $.__proto__ = W, $;
            }, c(y, R);
          }
          function g(y) {
            var R = I();
            return function() {
              var $ = C(y), W;
              if (R) {
                var X = C(this).constructor;
                W = Reflect.construct($, arguments, X);
              } else
                W = $.apply(this, arguments);
              return b(this, W);
            };
          }
          function b(y, R) {
            if (R && (t(R) === "object" || typeof R == "function"))
              return R;
            if (R !== void 0)
              throw new TypeError("Derived constructors may only return object or undefined");
            return A(y);
          }
          function A(y) {
            if (y === void 0)
              throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return y;
          }
          function I() {
            if (typeof Reflect > "u" || !Reflect.construct || Reflect.construct.sham)
              return !1;
            if (typeof Proxy == "function")
              return !0;
            try {
              return Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
              })), !0;
            } catch {
              return !1;
            }
          }
          function C(y) {
            return C = Object.setPrototypeOf ? Object.getPrototypeOf : function(L) {
              return L.__proto__ || Object.getPrototypeOf(L);
            }, C(y);
          }
          function E(y, R, L, $, W, X, te) {
            try {
              var K = y[X](te), ae = K.value;
            } catch (V) {
              L(V);
              return;
            }
            K.done ? R(ae) : Promise.resolve(ae).then($, W);
          }
          function O(y) {
            return function() {
              var R = this, L = arguments;
              return new Promise(function($, W) {
                var X = y.apply(R, L);
                function te(ae) {
                  E(X, $, W, te, K, "next", ae);
                }
                function K(ae) {
                  E(X, $, W, te, K, "throw", ae);
                }
                te(void 0);
              });
            };
          }
          function k(y, R) {
            var L = typeof Symbol < "u" && y[Symbol.iterator] || y["@@iterator"];
            if (!L) {
              if (Array.isArray(y) || (L = N(y)) || R && y && typeof y.length == "number") {
                L && (y = L);
                var $ = 0, W = function() {
                };
                return { s: W, n: function() {
                  return $ >= y.length ? { done: !0 } : { done: !1, value: y[$++] };
                }, e: function(V) {
                  throw V;
                }, f: W };
              }
              throw new TypeError(`Invalid attempt to iterate non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
            }
            var X = !0, te = !1, K;
            return { s: function() {
              L = L.call(y);
            }, n: function() {
              var V = L.next();
              return X = V.done, V;
            }, e: function(V) {
              te = !0, K = V;
            }, f: function() {
              try {
                !X && L.return != null && L.return();
              } finally {
                if (te)
                  throw K;
              }
            } };
          }
          function N(y, R) {
            if (!!y) {
              if (typeof y == "string")
                return x(y, R);
              var L = Object.prototype.toString.call(y).slice(8, -1);
              if (L === "Object" && y.constructor && (L = y.constructor.name), L === "Map" || L === "Set")
                return Array.from(y);
              if (L === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(L))
                return x(y, R);
            }
          }
          function x(y, R) {
            (R == null || R > y.length) && (R = y.length);
            for (var L = 0, $ = new Array(R); L < R; L++)
              $[L] = y[L];
            return $;
          }
          function U(y, R) {
            if (!(y instanceof R))
              throw new TypeError("Cannot call a class as a function");
          }
          function m(y, R) {
            for (var L = 0; L < R.length; L++) {
              var $ = R[L];
              $.enumerable = $.enumerable || !1, $.configurable = !0, "value" in $ && ($.writable = !0), Object.defineProperty(y, $.key, $);
            }
          }
          function f(y, R, L) {
            return R && m(y.prototype, R), L && m(y, L), y;
          }
          var v = /* @__PURE__ */ function() {
            function y(R) {
              var L = R.docId, $ = R.onUnsupportedFeature, W = R.ownerDocument, X = W === void 0 ? globalThis.document : W;
              R.styleElement, U(this, y), this.constructor === y && (0, i.unreachable)("Cannot initialize BaseFontLoader."), this.docId = L, this._onUnsupportedFeature = $, this._document = X, this.nativeFontFaces = [], this.styleElement = null;
            }
            return f(y, [{
              key: "addNativeFontFace",
              value: function(L) {
                this.nativeFontFaces.push(L), this._document.fonts.add(L);
              }
            }, {
              key: "insertRule",
              value: function(L) {
                var $ = this.styleElement;
                $ || ($ = this.styleElement = this._document.createElement("style"), $.id = "PDFJS_FONT_STYLE_TAG_".concat(this.docId), this._document.documentElement.getElementsByTagName("head")[0].appendChild($));
                var W = $.sheet;
                W.insertRule(L, W.cssRules.length);
              }
            }, {
              key: "clear",
              value: function() {
                var L = k(this.nativeFontFaces), $;
                try {
                  for (L.s(); !($ = L.n()).done; ) {
                    var W = $.value;
                    this._document.fonts.delete(W);
                  }
                } catch (X) {
                  L.e(X);
                } finally {
                  L.f();
                }
                this.nativeFontFaces.length = 0, this.styleElement && (this.styleElement.remove(), this.styleElement = null);
              }
            }, {
              key: "bind",
              value: function() {
                var R = O(/* @__PURE__ */ a.default.mark(function $(W) {
                  var X = this, te, K;
                  return a.default.wrap(function(V) {
                    for (; ; )
                      switch (V.prev = V.next) {
                        case 0:
                          if (!(W.attached || W.missingFile)) {
                            V.next = 2;
                            break;
                          }
                          return V.abrupt("return");
                        case 2:
                          if (W.attached = !0, !this.isFontLoadingAPISupported) {
                            V.next = 19;
                            break;
                          }
                          if (te = W.createNativeFontFace(), !te) {
                            V.next = 18;
                            break;
                          }
                          return this.addNativeFontFace(te), V.prev = 7, V.next = 10, te.loaded;
                        case 10:
                          V.next = 18;
                          break;
                        case 12:
                          throw V.prev = 12, V.t0 = V.catch(7), this._onUnsupportedFeature({
                            featureId: i.UNSUPPORTED_FEATURES.errorFontLoadNative
                          }), (0, i.warn)("Failed to load font '".concat(te.family, "': '").concat(V.t0, "'.")), W.disableFontFace = !0, V.t0;
                        case 18:
                          return V.abrupt("return");
                        case 19:
                          if (K = W.createFontFaceRule(), !K) {
                            V.next = 26;
                            break;
                          }
                          if (this.insertRule(K), !this.isSyncFontLoadingSupported) {
                            V.next = 24;
                            break;
                          }
                          return V.abrupt("return");
                        case 24:
                          return V.next = 26, new Promise(function(q) {
                            var w = X._queueLoadingCallback(q);
                            X._prepareFontLoadEvent([K], [W], w);
                          });
                        case 26:
                        case "end":
                          return V.stop();
                      }
                  }, $, this, [[7, 12]]);
                }));
                function L($) {
                  return R.apply(this, arguments);
                }
                return L;
              }()
            }, {
              key: "_queueLoadingCallback",
              value: function(L) {
                (0, i.unreachable)("Abstract method `_queueLoadingCallback`.");
              }
            }, {
              key: "isFontLoadingAPISupported",
              get: function() {
                var L, $ = !!((L = this._document) !== null && L !== void 0 && L.fonts);
                return (0, i.shadow)(this, "isFontLoadingAPISupported", $);
              }
            }, {
              key: "isSyncFontLoadingSupported",
              get: function() {
                (0, i.unreachable)("Abstract method `isSyncFontLoadingSupported`.");
              }
            }, {
              key: "_loadTestFont",
              get: function() {
                (0, i.unreachable)("Abstract method `_loadTestFont`.");
              }
            }, {
              key: "_prepareFontLoadEvent",
              value: function(L, $, W) {
                (0, i.unreachable)("Abstract method `_prepareFontLoadEvent`.");
              }
            }]), y;
          }(), _;
          r.FontLoader = _, r.FontLoader = _ = /* @__PURE__ */ function(y) {
            u(L, y);
            var R = g(L);
            function L($) {
              var W;
              return U(this, L), W = R.call(this, $), W.loadingContext = {
                requests: [],
                nextRequestId: 0
              }, W.loadTestFontId = 0, W;
            }
            return f(L, [{
              key: "isSyncFontLoadingSupported",
              get: function() {
                var W = !1;
                if (typeof navigator > "u")
                  W = !0;
                else {
                  var X = /Mozilla\/5.0.*?rv:(\d+).*? Gecko/.exec(navigator.userAgent);
                  (X == null ? void 0 : X[1]) >= 14 && (W = !0);
                }
                return (0, i.shadow)(this, "isSyncFontLoadingSupported", W);
              }
            }, {
              key: "_queueLoadingCallback",
              value: function(W) {
                function X() {
                  for ((0, i.assert)(!K.done, "completeRequest() cannot be called twice."), K.done = !0; te.requests.length > 0 && te.requests[0].done; ) {
                    var ae = te.requests.shift();
                    setTimeout(ae.callback, 0);
                  }
                }
                var te = this.loadingContext, K = {
                  id: "pdfjs-font-loading-".concat(te.nextRequestId++),
                  done: !1,
                  complete: X,
                  callback: W
                };
                return te.requests.push(K), K;
              }
            }, {
              key: "_loadTestFont",
              get: function() {
                var W = function() {
                  return atob("T1RUTwALAIAAAwAwQ0ZGIDHtZg4AAAOYAAAAgUZGVE1lkzZwAAAEHAAAABxHREVGABQAFQAABDgAAAAeT1MvMlYNYwkAAAEgAAAAYGNtYXABDQLUAAACNAAAAUJoZWFk/xVFDQAAALwAAAA2aGhlYQdkA+oAAAD0AAAAJGhtdHgD6AAAAAAEWAAAAAZtYXhwAAJQAAAAARgAAAAGbmFtZVjmdH4AAAGAAAAAsXBvc3T/hgAzAAADeAAAACAAAQAAAAEAALZRFsRfDzz1AAsD6AAAAADOBOTLAAAAAM4KHDwAAAAAA+gDIQAAAAgAAgAAAAAAAAABAAADIQAAAFoD6AAAAAAD6AABAAAAAAAAAAAAAAAAAAAAAQAAUAAAAgAAAAQD6AH0AAUAAAKKArwAAACMAooCvAAAAeAAMQECAAACAAYJAAAAAAAAAAAAAQAAAAAAAAAAAAAAAFBmRWQAwAAuAC4DIP84AFoDIQAAAAAAAQAAAAAAAAAAACAAIAABAAAADgCuAAEAAAAAAAAAAQAAAAEAAAAAAAEAAQAAAAEAAAAAAAIAAQAAAAEAAAAAAAMAAQAAAAEAAAAAAAQAAQAAAAEAAAAAAAUAAQAAAAEAAAAAAAYAAQAAAAMAAQQJAAAAAgABAAMAAQQJAAEAAgABAAMAAQQJAAIAAgABAAMAAQQJAAMAAgABAAMAAQQJAAQAAgABAAMAAQQJAAUAAgABAAMAAQQJAAYAAgABWABYAAAAAAAAAwAAAAMAAAAcAAEAAAAAADwAAwABAAAAHAAEACAAAAAEAAQAAQAAAC7//wAAAC7////TAAEAAAAAAAABBgAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMAAAAAAAD/gwAyAAAAAQAAAAAAAAAAAAAAAAAAAAABAAQEAAEBAQJYAAEBASH4DwD4GwHEAvgcA/gXBIwMAYuL+nz5tQXkD5j3CBLnEQACAQEBIVhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYAAABAQAADwACAQEEE/t3Dov6fAH6fAT+fPp8+nwHDosMCvm1Cvm1DAz6fBQAAAAAAAABAAAAAMmJbzEAAAAAzgTjFQAAAADOBOQpAAEAAAAAAAAADAAUAAQAAAABAAAAAgABAAAAAAAAAAAD6AAAAAAAAA==");
                };
                return (0, i.shadow)(this, "_loadTestFont", W());
              }
            }, {
              key: "_prepareFontLoadEvent",
              value: function(W, X, te) {
                function K(me, we) {
                  return me.charCodeAt(we) << 24 | me.charCodeAt(we + 1) << 16 | me.charCodeAt(we + 2) << 8 | me.charCodeAt(we + 3) & 255;
                }
                function ae(me, we, Pe, Ee) {
                  var Fe = me.substring(0, we), Ie = me.substring(we + Pe);
                  return Fe + Ee + Ie;
                }
                var V, q, w = this._document.createElement("canvas");
                w.width = 1, w.height = 1;
                var p = w.getContext("2d"), P = 0;
                function F(me, we) {
                  if (P++, P > 30) {
                    (0, i.warn)("Load test font never loaded."), we();
                    return;
                  }
                  p.font = "30px " + me, p.fillText(".", 0, 20);
                  var Pe = p.getImageData(0, 0, 1, 1);
                  if (Pe.data[3] > 0) {
                    we();
                    return;
                  }
                  setTimeout(F.bind(null, me, we));
                }
                var G = "lt".concat(Date.now()).concat(this.loadTestFontId++), Z = this._loadTestFont, Y = 976;
                Z = ae(Z, Y, G.length, G);
                var de = 16, Se = 1482184792, _e = K(Z, de);
                for (V = 0, q = G.length - 3; V < q; V += 4)
                  _e = _e - Se + K(G, V) | 0;
                V < G.length && (_e = _e - Se + K(G + "XXX", V) | 0), Z = ae(Z, de, 4, (0, i.string32)(_e));
                var j = "url(data:font/opentype;base64,".concat(btoa(Z), ");"), D = '@font-face {font-family:"'.concat(G, '";src:').concat(j, "}");
                this.insertRule(D);
                var h = [], d = k(X), T;
                try {
                  for (d.s(); !(T = d.n()).done; ) {
                    var B = T.value;
                    h.push(B.loadedName);
                  }
                } catch (me) {
                  d.e(me);
                } finally {
                  d.f();
                }
                h.push(G);
                var z = this._document.createElement("div");
                z.style.visibility = "hidden", z.style.width = z.style.height = "10px", z.style.position = "absolute", z.style.top = z.style.left = "0px";
                for (var ee = 0, le = h; ee < le.length; ee++) {
                  var ve = le[ee], ye = this._document.createElement("span");
                  ye.textContent = "Hi", ye.style.fontFamily = ve, z.appendChild(ye);
                }
                this._document.body.appendChild(z), F(G, function() {
                  z.remove(), te.complete();
                });
              }
            }]), L;
          }(v);
          var S = /* @__PURE__ */ function() {
            function y(R, L) {
              var $ = L.isEvalSupported, W = $ === void 0 ? !0 : $, X = L.disableFontFace, te = X === void 0 ? !1 : X, K = L.ignoreErrors, ae = K === void 0 ? !1 : K, V = L.onUnsupportedFeature, q = L.fontRegistry, w = q === void 0 ? null : q;
              U(this, y), this.compiledGlyphs = /* @__PURE__ */ Object.create(null);
              for (var p in R)
                this[p] = R[p];
              this.isEvalSupported = W !== !1, this.disableFontFace = te === !0, this.ignoreErrors = ae === !0, this._onUnsupportedFeature = V, this.fontRegistry = w;
            }
            return f(y, [{
              key: "createNativeFontFace",
              value: function() {
                if (!this.data || this.disableFontFace)
                  return null;
                var L;
                if (!this.cssFontInfo)
                  L = new FontFace(this.loadedName, this.data, {});
                else {
                  var $ = {
                    weight: this.cssFontInfo.fontWeight
                  };
                  this.cssFontInfo.italicAngle && ($.style = "oblique ".concat(this.cssFontInfo.italicAngle, "deg")), L = new FontFace(this.cssFontInfo.fontFamily, this.data, $);
                }
                return this.fontRegistry && this.fontRegistry.registerFont(this), L;
              }
            }, {
              key: "createFontFaceRule",
              value: function() {
                if (!this.data || this.disableFontFace)
                  return null;
                var L = (0, i.bytesToString)(this.data), $ = "url(data:".concat(this.mimetype, ";base64,").concat(btoa(L), ");"), W;
                if (!this.cssFontInfo)
                  W = '@font-face {font-family:"'.concat(this.loadedName, '";src:').concat($, "}");
                else {
                  var X = "font-weight: ".concat(this.cssFontInfo.fontWeight, ";");
                  this.cssFontInfo.italicAngle && (X += "font-style: oblique ".concat(this.cssFontInfo.italicAngle, "deg;")), W = '@font-face {font-family:"'.concat(this.cssFontInfo.fontFamily, '";').concat(X, "src:").concat($, "}");
                }
                return this.fontRegistry && this.fontRegistry.registerFont(this, $), W;
              }
            }, {
              key: "getPathGenerator",
              value: function(L, $) {
                if (this.compiledGlyphs[$] !== void 0)
                  return this.compiledGlyphs[$];
                var W;
                try {
                  W = L.get(this.loadedName + "_path_" + $);
                } catch (q) {
                  if (!this.ignoreErrors)
                    throw q;
                  return this._onUnsupportedFeature({
                    featureId: i.UNSUPPORTED_FEATURES.errorFontGetPath
                  }), (0, i.warn)('getPathGenerator - ignoring character: "'.concat(q, '".')), this.compiledGlyphs[$] = function(w, p) {
                  };
                }
                if (this.isEvalSupported && i.IsEvalSupportedCached.value) {
                  var X = [], te = k(W), K;
                  try {
                    for (te.s(); !(K = te.n()).done; ) {
                      var ae = K.value, V = ae.args !== void 0 ? ae.args.join(",") : "";
                      X.push("c.", ae.cmd, "(", V, `);
`);
                    }
                  } catch (q) {
                    te.e(q);
                  } finally {
                    te.f();
                  }
                  return this.compiledGlyphs[$] = new Function("c", "size", X.join(""));
                }
                return this.compiledGlyphs[$] = function(q, w) {
                  var p = k(W), P;
                  try {
                    for (p.s(); !(P = p.n()).done; ) {
                      var F = P.value;
                      F.cmd === "scale" && (F.args = [w, -w]), q[F.cmd].apply(q, F.args);
                    }
                  } catch (G) {
                    p.e(G);
                  } finally {
                    p.f();
                  }
                };
              }
            }]), y;
          }();
          r.FontFaceObject = S;
        },
        (n, r, e) => {
          function t(f) {
            return typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? t = function(_) {
              return typeof _;
            } : t = function(_) {
              return _ && typeof Symbol == "function" && _.constructor === Symbol && _ !== Symbol.prototype ? "symbol" : typeof _;
            }, t(f);
          }
          Object.defineProperty(r, "__esModule", {
            value: !0
          }), r.NodeStandardFontDataFactory = r.NodeCanvasFactory = r.NodeCMapReaderFactory = void 0;
          var a = e(135), i = e(6), s = e(4);
          function u(f, v) {
            for (var _ = 0; _ < v.length; _++) {
              var S = v[_];
              S.enumerable = S.enumerable || !1, S.configurable = !0, "value" in S && (S.writable = !0), Object.defineProperty(f, S.key, S);
            }
          }
          function c(f, v, _) {
            return v && u(f.prototype, v), _ && u(f, _), f;
          }
          function g(f, v) {
            if (typeof v != "function" && v !== null)
              throw new TypeError("Super expression must either be null or a function");
            f.prototype = Object.create(v && v.prototype, { constructor: { value: f, writable: !0, configurable: !0 } }), v && b(f, v);
          }
          function b(f, v) {
            return b = Object.setPrototypeOf || function(S, y) {
              return S.__proto__ = y, S;
            }, b(f, v);
          }
          function A(f) {
            var v = E();
            return function() {
              var S = O(f), y;
              if (v) {
                var R = O(this).constructor;
                y = Reflect.construct(S, arguments, R);
              } else
                y = S.apply(this, arguments);
              return I(this, y);
            };
          }
          function I(f, v) {
            if (v && (t(v) === "object" || typeof v == "function"))
              return v;
            if (v !== void 0)
              throw new TypeError("Derived constructors may only return object or undefined");
            return C(f);
          }
          function C(f) {
            if (f === void 0)
              throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return f;
          }
          function E() {
            if (typeof Reflect > "u" || !Reflect.construct || Reflect.construct.sham)
              return !1;
            if (typeof Proxy == "function")
              return !0;
            try {
              return Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
              })), !0;
            } catch {
              return !1;
            }
          }
          function O(f) {
            return O = Object.setPrototypeOf ? Object.getPrototypeOf : function(_) {
              return _.__proto__ || Object.getPrototypeOf(_);
            }, O(f);
          }
          function k(f, v) {
            if (!(f instanceof v))
              throw new TypeError("Cannot call a class as a function");
          }
          var N = function f() {
            k(this, f), (0, s.unreachable)("Not implemented: NodeCanvasFactory");
          };
          r.NodeCanvasFactory = N;
          var x = function f() {
            k(this, f), (0, s.unreachable)("Not implemented: NodeCMapReaderFactory");
          };
          r.NodeCMapReaderFactory = x;
          var U = function f() {
            k(this, f), (0, s.unreachable)("Not implemented: NodeStandardFontDataFactory");
          };
          if (r.NodeStandardFontDataFactory = U, i.isNodeJS) {
            var m = function(v) {
              return new Promise(function(_, S) {
                var y = require$$5;
                y.readFile(v, function(R, L) {
                  if (R || !L) {
                    S(new Error(R));
                    return;
                  }
                  _(new Uint8Array(L));
                });
              });
            };
            r.NodeCanvasFactory = N = /* @__PURE__ */ function(f) {
              g(_, f);
              var v = A(_);
              function _() {
                return k(this, _), v.apply(this, arguments);
              }
              return c(_, [{
                key: "_createCanvas",
                value: function(y, R) {
                  var L = require$$5;
                  return L.createCanvas(y, R);
                }
              }]), _;
            }(a.BaseCanvasFactory), r.NodeCMapReaderFactory = x = /* @__PURE__ */ function(f) {
              g(_, f);
              var v = A(_);
              function _() {
                return k(this, _), v.apply(this, arguments);
              }
              return c(_, [{
                key: "_fetchData",
                value: function(y, R) {
                  return m(y).then(function(L) {
                    return {
                      cMapData: L,
                      compressionType: R
                    };
                  });
                }
              }]), _;
            }(a.BaseCMapReaderFactory), r.NodeStandardFontDataFactory = U = /* @__PURE__ */ function(f) {
              g(_, f);
              var v = A(_);
              function _() {
                return k(this, _), v.apply(this, arguments);
              }
              return c(_, [{
                key: "_fetchData",
                value: function(y) {
                  return m(y);
                }
              }]), _;
            }(a.BaseStandardFontDataFactory);
          }
        },
        (n, r, e) => {
          Object.defineProperty(r, "__esModule", {
            value: !0
          }), r.AnnotationStorage = void 0;
          var t = e(4);
          function a(E, O) {
            return g(E) || c(E, O) || s(E, O) || i();
          }
          function i() {
            throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
          }
          function s(E, O) {
            if (!!E) {
              if (typeof E == "string")
                return u(E, O);
              var k = Object.prototype.toString.call(E).slice(8, -1);
              if (k === "Object" && E.constructor && (k = E.constructor.name), k === "Map" || k === "Set")
                return Array.from(E);
              if (k === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(k))
                return u(E, O);
            }
          }
          function u(E, O) {
            (O == null || O > E.length) && (O = E.length);
            for (var k = 0, N = new Array(O); k < O; k++)
              N[k] = E[k];
            return N;
          }
          function c(E, O) {
            var k = E == null ? null : typeof Symbol < "u" && E[Symbol.iterator] || E["@@iterator"];
            if (k != null) {
              var N = [], x = !0, U = !1, m, f;
              try {
                for (k = k.call(E); !(x = (m = k.next()).done) && (N.push(m.value), !(O && N.length === O)); x = !0)
                  ;
              } catch (v) {
                U = !0, f = v;
              } finally {
                try {
                  !x && k.return != null && k.return();
                } finally {
                  if (U)
                    throw f;
                }
              }
              return N;
            }
          }
          function g(E) {
            if (Array.isArray(E))
              return E;
          }
          function b(E, O) {
            if (!(E instanceof O))
              throw new TypeError("Cannot call a class as a function");
          }
          function A(E, O) {
            for (var k = 0; k < O.length; k++) {
              var N = O[k];
              N.enumerable = N.enumerable || !1, N.configurable = !0, "value" in N && (N.writable = !0), Object.defineProperty(E, N.key, N);
            }
          }
          function I(E, O, k) {
            return O && A(E.prototype, O), k && A(E, k), E;
          }
          var C = /* @__PURE__ */ function() {
            function E() {
              b(this, E), this._storage = /* @__PURE__ */ new Map(), this._timeStamp = Date.now(), this._modified = !1, this.onSetModified = null, this.onResetModified = null;
            }
            return I(E, [{
              key: "getValue",
              value: function(k, N) {
                var x = this._storage.get(k);
                return x === void 0 ? N : Object.assign(N, x);
              }
            }, {
              key: "setValue",
              value: function(k, N) {
                var x = this._storage.get(k), U = !1;
                if (x !== void 0)
                  for (var m = 0, f = Object.entries(N); m < f.length; m++) {
                    var v = a(f[m], 2), _ = v[0], S = v[1];
                    x[_] !== S && (U = !0, x[_] = S);
                  }
                else
                  U = !0, this._storage.set(k, N);
                U && (this._timeStamp = Date.now(), this._setModified());
              }
            }, {
              key: "getAll",
              value: function() {
                return this._storage.size > 0 ? (0, t.objectFromMap)(this._storage) : null;
              }
            }, {
              key: "size",
              get: function() {
                return this._storage.size;
              }
            }, {
              key: "_setModified",
              value: function() {
                this._modified || (this._modified = !0, typeof this.onSetModified == "function" && this.onSetModified());
              }
            }, {
              key: "resetModified",
              value: function() {
                this._modified && (this._modified = !1, typeof this.onResetModified == "function" && this.onResetModified());
              }
            }, {
              key: "serializable",
              get: function() {
                return this._storage.size > 0 ? this._storage : null;
              }
            }, {
              key: "lastModified",
              get: function() {
                return this._timeStamp.toString();
              }
            }]), E;
          }();
          r.AnnotationStorage = C;
        },
        (n, r, e) => {
          Object.defineProperty(r, "__esModule", {
            value: !0
          }), r.CanvasGraphics = void 0;
          var t = e(4), a = e(141), i = e(1);
          function s(j) {
            return typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? s = function(h) {
              return typeof h;
            } : s = function(h) {
              return h && typeof Symbol == "function" && h.constructor === Symbol && h !== Symbol.prototype ? "symbol" : typeof h;
            }, s(j);
          }
          function u(j, D) {
            var h = typeof Symbol < "u" && j[Symbol.iterator] || j["@@iterator"];
            if (!h) {
              if (Array.isArray(j) || (h = C(j)) || D && j && typeof j.length == "number") {
                h && (j = h);
                var d = 0, T = function() {
                };
                return { s: T, n: function() {
                  return d >= j.length ? { done: !0 } : { done: !1, value: j[d++] };
                }, e: function(ve) {
                  throw ve;
                }, f: T };
              }
              throw new TypeError(`Invalid attempt to iterate non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
            }
            var B = !0, z = !1, ee;
            return { s: function() {
              h = h.call(j);
            }, n: function() {
              var ve = h.next();
              return B = ve.done, ve;
            }, e: function(ve) {
              z = !0, ee = ve;
            }, f: function() {
              try {
                !B && h.return != null && h.return();
              } finally {
                if (z)
                  throw ee;
              }
            } };
          }
          function c(j, D) {
            if (!(j instanceof D))
              throw new TypeError("Cannot call a class as a function");
          }
          function g(j, D) {
            for (var h = 0; h < D.length; h++) {
              var d = D[h];
              d.enumerable = d.enumerable || !1, d.configurable = !0, "value" in d && (d.writable = !0), Object.defineProperty(j, d.key, d);
            }
          }
          function b(j, D, h) {
            return D && g(j.prototype, D), h && g(j, h), j;
          }
          function A(j, D) {
            return k(j) || O(j, D) || C(j, D) || I();
          }
          function I() {
            throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
          }
          function C(j, D) {
            if (!!j) {
              if (typeof j == "string")
                return E(j, D);
              var h = Object.prototype.toString.call(j).slice(8, -1);
              if (h === "Object" && j.constructor && (h = j.constructor.name), h === "Map" || h === "Set")
                return Array.from(j);
              if (h === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(h))
                return E(j, D);
            }
          }
          function E(j, D) {
            (D == null || D > j.length) && (D = j.length);
            for (var h = 0, d = new Array(D); h < D; h++)
              d[h] = j[h];
            return d;
          }
          function O(j, D) {
            var h = j == null ? null : typeof Symbol < "u" && j[Symbol.iterator] || j["@@iterator"];
            if (h != null) {
              var d = [], T = !0, B = !1, z, ee;
              try {
                for (h = h.call(j); !(T = (z = h.next()).done) && (d.push(z.value), !(D && d.length === D)); T = !0)
                  ;
              } catch (le) {
                B = !0, ee = le;
              } finally {
                try {
                  !T && h.return != null && h.return();
                } finally {
                  if (B)
                    throw ee;
                }
              }
              return d;
            }
          }
          function k(j) {
            if (Array.isArray(j))
              return j;
          }
          var N = 16, x = 100, U = 4096, m = 15, f = 10, v = 1e3, _ = 16, S = 1.000001;
          function y(j, D) {
            if (j._removeMirroring)
              throw new Error("Context is already forwarding operations.");
            j.__originalSave = j.save, j.__originalRestore = j.restore, j.__originalRotate = j.rotate, j.__originalScale = j.scale, j.__originalTranslate = j.translate, j.__originalTransform = j.transform, j.__originalSetTransform = j.setTransform, j.__originalResetTransform = j.resetTransform, j.__originalClip = j.clip, j.__originalMoveTo = j.moveTo, j.__originalLineTo = j.lineTo, j.__originalBezierCurveTo = j.bezierCurveTo, j.__originalRect = j.rect, j.__originalClosePath = j.closePath, j.__originalBeginPath = j.beginPath, j._removeMirroring = function() {
              j.save = j.__originalSave, j.restore = j.__originalRestore, j.rotate = j.__originalRotate, j.scale = j.__originalScale, j.translate = j.__originalTranslate, j.transform = j.__originalTransform, j.setTransform = j.__originalSetTransform, j.resetTransform = j.__originalResetTransform, j.clip = j.__originalClip, j.moveTo = j.__originalMoveTo, j.lineTo = j.__originalLineTo, j.bezierCurveTo = j.__originalBezierCurveTo, j.rect = j.__originalRect, j.closePath = j.__originalClosePath, j.beginPath = j.__originalBeginPath, delete j._removeMirroring;
            }, j.save = function() {
              D.save(), this.__originalSave();
            }, j.restore = function() {
              D.restore(), this.__originalRestore();
            }, j.translate = function(d, T) {
              D.translate(d, T), this.__originalTranslate(d, T);
            }, j.scale = function(d, T) {
              D.scale(d, T), this.__originalScale(d, T);
            }, j.transform = function(d, T, B, z, ee, le) {
              D.transform(d, T, B, z, ee, le), this.__originalTransform(d, T, B, z, ee, le);
            }, j.setTransform = function(d, T, B, z, ee, le) {
              D.setTransform(d, T, B, z, ee, le), this.__originalSetTransform(d, T, B, z, ee, le);
            }, j.resetTransform = function() {
              D.resetTransform(), this.__originalResetTransform();
            }, j.rotate = function(d) {
              D.rotate(d), this.__originalRotate(d);
            }, j.clip = function(d) {
              D.clip(d), this.__originalClip(d);
            }, j.moveTo = function(h, d) {
              D.moveTo(h, d), this.__originalMoveTo(h, d);
            }, j.lineTo = function(h, d) {
              D.lineTo(h, d), this.__originalLineTo(h, d);
            }, j.bezierCurveTo = function(h, d, T, B, z, ee) {
              D.bezierCurveTo(h, d, T, B, z, ee), this.__originalBezierCurveTo(h, d, T, B, z, ee);
            }, j.rect = function(h, d, T, B) {
              D.rect(h, d, T, B), this.__originalRect(h, d, T, B);
            }, j.closePath = function() {
              D.closePath(), this.__originalClosePath();
            }, j.beginPath = function() {
              D.beginPath(), this.__originalBeginPath();
            };
          }
          function R(j) {
            if (!j.mozCurrentTransform) {
              j._originalSave = j.save, j._originalRestore = j.restore, j._originalRotate = j.rotate, j._originalScale = j.scale, j._originalTranslate = j.translate, j._originalTransform = j.transform, j._originalSetTransform = j.setTransform, j._originalResetTransform = j.resetTransform, j._transformMatrix = j._transformMatrix || [1, 0, 0, 1, 0, 0], j._transformStack = [];
              try {
                var D = Object.getOwnPropertyDescriptor(Object.getPrototypeOf(j), "lineWidth");
                j._setLineWidth = D.set, j._getLineWidth = D.get, Object.defineProperty(j, "lineWidth", {
                  set: function(d) {
                    this._setLineWidth(d * S);
                  },
                  get: function() {
                    return this._getLineWidth();
                  }
                });
              } catch {
              }
              Object.defineProperty(j, "mozCurrentTransform", {
                get: function() {
                  return this._transformMatrix;
                }
              }), Object.defineProperty(j, "mozCurrentTransformInverse", {
                get: function() {
                  var d = A(this._transformMatrix, 6), T = d[0], B = d[1], z = d[2], ee = d[3], le = d[4], ve = d[5], ye = T * ee - B * z, me = B * z - T * ee;
                  return [ee / ye, B / me, z / me, T / ye, (ee * le - z * ve) / me, (B * le - T * ve) / ye];
                }
              }), j.save = function() {
                var d = this._transformMatrix;
                this._transformStack.push(d), this._transformMatrix = d.slice(0, 6), this._originalSave();
              }, j.restore = function() {
                var d = this._transformStack.pop();
                d && (this._transformMatrix = d, this._originalRestore());
              }, j.translate = function(d, T) {
                var B = this._transformMatrix;
                B[4] = B[0] * d + B[2] * T + B[4], B[5] = B[1] * d + B[3] * T + B[5], this._originalTranslate(d, T);
              }, j.scale = function(d, T) {
                var B = this._transformMatrix;
                B[0] *= d, B[1] *= d, B[2] *= T, B[3] *= T, this._originalScale(d, T);
              }, j.transform = function(d, T, B, z, ee, le) {
                var ve = this._transformMatrix;
                this._transformMatrix = [ve[0] * d + ve[2] * T, ve[1] * d + ve[3] * T, ve[0] * B + ve[2] * z, ve[1] * B + ve[3] * z, ve[0] * ee + ve[2] * le + ve[4], ve[1] * ee + ve[3] * le + ve[5]], j._originalTransform(d, T, B, z, ee, le);
              }, j.setTransform = function(d, T, B, z, ee, le) {
                this._transformMatrix = [d, T, B, z, ee, le], j._originalSetTransform(d, T, B, z, ee, le);
              }, j.resetTransform = function() {
                this._transformMatrix = [1, 0, 0, 1, 0, 0], j._originalResetTransform();
              }, j.rotate = function(d) {
                var T = Math.cos(d), B = Math.sin(d), z = this._transformMatrix;
                this._transformMatrix = [z[0] * T + z[2] * B, z[1] * T + z[3] * B, z[0] * -B + z[2] * T, z[1] * -B + z[3] * T, z[4], z[5]], this._originalRotate(d);
              };
            }
          }
          var L = /* @__PURE__ */ function() {
            function j(D) {
              c(this, j), this.canvasFactory = D, this.cache = /* @__PURE__ */ Object.create(null);
            }
            return b(j, [{
              key: "getCanvas",
              value: function(h, d, T, B) {
                var z;
                return this.cache[h] !== void 0 ? (z = this.cache[h], this.canvasFactory.reset(z, d, T), z.context.setTransform(1, 0, 0, 1, 0, 0)) : (z = this.canvasFactory.create(d, T), this.cache[h] = z), B && R(z.context), z;
              }
            }, {
              key: "clear",
              value: function() {
                for (var h in this.cache) {
                  var d = this.cache[h];
                  this.canvasFactory.destroy(d), delete this.cache[h];
                }
              }
            }]), j;
          }();
          function $(j) {
            var D = 1e3, h = new Uint8Array([0, 2, 4, 0, 1, 0, 5, 4, 8, 10, 0, 8, 0, 2, 1, 0]), d = j.width, T = j.height, B = d + 1, z, ee, le, ve, ye = new Uint8Array(B * (T + 1)), me = d + 7 & -8, we = j.data, Pe = new Uint8Array(me * T), Ee = 0;
            for (z = 0, ee = we.length; z < ee; z++)
              for (var Fe = we[z], Ie = 128; Ie > 0; )
                Pe[Ee++] = Fe & Ie ? 0 : 255, Ie >>= 1;
            var We = 0;
            for (Ee = 0, Pe[Ee] !== 0 && (ye[0] = 1, ++We), le = 1; le < d; le++)
              Pe[Ee] !== Pe[Ee + 1] && (ye[le] = Pe[Ee] ? 2 : 1, ++We), Ee++;
            for (Pe[Ee] !== 0 && (ye[le] = 2, ++We), z = 1; z < T; z++) {
              Ee = z * me, ve = z * B, Pe[Ee - me] !== Pe[Ee] && (ye[ve] = Pe[Ee] ? 1 : 8, ++We);
              var je = (Pe[Ee] ? 4 : 0) + (Pe[Ee - me] ? 8 : 0);
              for (le = 1; le < d; le++)
                je = (je >> 2) + (Pe[Ee + 1] ? 4 : 0) + (Pe[Ee - me + 1] ? 8 : 0), h[je] && (ye[ve + le] = h[je], ++We), Ee++;
              if (Pe[Ee - me] !== Pe[Ee] && (ye[ve + le] = Pe[Ee] ? 2 : 4, ++We), We > D)
                return null;
            }
            for (Ee = me * (T - 1), ve = z * B, Pe[Ee] !== 0 && (ye[ve] = 8, ++We), le = 1; le < d; le++)
              Pe[Ee] !== Pe[Ee + 1] && (ye[ve + le] = Pe[Ee] ? 4 : 8, ++We), Ee++;
            if (Pe[Ee] !== 0 && (ye[ve + le] = 4, ++We), We > D)
              return null;
            var fe = new Int32Array([0, B, -1, 0, -B, 0, 0, 0, 1]), he = [];
            for (z = 0; We && z <= T; z++) {
              for (var H = z * B, re = H + d; H < re && !ye[H]; )
                H++;
              if (H !== re) {
                var Q = [H % B, z], oe = H, ne = ye[H];
                do {
                  var J = fe[ne];
                  do
                    H += J;
                  while (!ye[H]);
                  var pe = ye[H];
                  pe !== 5 && pe !== 10 ? (ne = pe, ye[H] = 0) : (ne = pe & 51 * ne >> 4, ye[H] &= ne >> 2 | ne << 2), Q.push(H % B, H / B | 0), ye[H] || --We;
                } while (oe !== H);
                he.push(Q), --z;
              }
            }
            var ce = function(Re) {
              Re.save(), Re.scale(1 / d, -1 / T), Re.translate(0, -T), Re.beginPath();
              for (var De = 0, Le = he.length; De < Le; De++) {
                var Te = he[De];
                Re.moveTo(Te[0], Te[1]);
                for (var ze = 2, xe = Te.length; ze < xe; ze += 2)
                  Re.lineTo(Te[ze], Te[ze + 1]);
              }
              Re.fill(), Re.beginPath(), Re.restore();
            };
            return ce;
          }
          var W = /* @__PURE__ */ function() {
            function j(D, h) {
              c(this, j), this.alphaIsShape = !1, this.fontSize = 0, this.fontSizeScale = 1, this.textMatrix = t.IDENTITY_MATRIX, this.textMatrixScale = 1, this.fontMatrix = t.FONT_IDENTITY_MATRIX, this.leading = 0, this.x = 0, this.y = 0, this.lineX = 0, this.lineY = 0, this.charSpacing = 0, this.wordSpacing = 0, this.textHScale = 1, this.textRenderingMode = t.TextRenderingMode.FILL, this.textRise = 0, this.fillColor = "#000000", this.strokeColor = "#000000", this.patternFill = !1, this.fillAlpha = 1, this.strokeAlpha = 1, this.lineWidth = 1, this.activeSMask = null, this.transferMaps = null, this.startNewPathAndClipBox([0, 0, D, h]);
            }
            return b(j, [{
              key: "clone",
              value: function() {
                var h = Object.create(this);
                return h.clipBox = this.clipBox.slice(), h;
              }
            }, {
              key: "setCurrentPoint",
              value: function(h, d) {
                this.x = h, this.y = d;
              }
            }, {
              key: "updatePathMinMax",
              value: function(h, d, T) {
                var B = t.Util.applyTransform([d, T], h), z = A(B, 2);
                d = z[0], T = z[1], this.minX = Math.min(this.minX, d), this.minY = Math.min(this.minY, T), this.maxX = Math.max(this.maxX, d), this.maxY = Math.max(this.maxY, T);
              }
            }, {
              key: "updateCurvePathMinMax",
              value: function(h, d, T, B, z, ee, le, ve, ye) {
                var me = t.Util.bezierBoundingBox(d, T, B, z, ee, le, ve, ye);
                this.updatePathMinMax(h, me[0], me[1]), this.updatePathMinMax(h, me[2], me[3]);
              }
            }, {
              key: "getPathBoundingBox",
              value: function() {
                var h = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : a.PathType.FILL, d = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : null, T = [this.minX, this.minY, this.maxX, this.maxY];
                if (h === a.PathType.STROKE) {
                  d || (0, t.unreachable)("Stroke bounding box must include transform.");
                  var B = t.Util.singularValueDecompose2dScale(d), z = B[0] * this.lineWidth / 2, ee = B[1] * this.lineWidth / 2;
                  T[0] -= z, T[1] -= ee, T[2] += z, T[3] += ee;
                }
                return T;
              }
            }, {
              key: "updateClipFromPath",
              value: function() {
                var h = t.Util.intersect(this.clipBox, this.getPathBoundingBox());
                this.startNewPathAndClipBox(h || [0, 0, 0, 0]);
              }
            }, {
              key: "startNewPathAndClipBox",
              value: function(h) {
                this.clipBox = h, this.minX = 1 / 0, this.minY = 1 / 0, this.maxX = 0, this.maxY = 0;
              }
            }, {
              key: "getClippedPathBoundingBox",
              value: function() {
                var h = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : a.PathType.FILL, d = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : null;
                return t.Util.intersect(this.clipBox, this.getPathBoundingBox(h, d));
              }
            }]), j;
          }();
          function X(j, D) {
            var h = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : null;
            if (typeof ImageData < "u" && D instanceof ImageData) {
              j.putImageData(D, 0, 0);
              return;
            }
            var d = D.height, T = D.width, B = d % _, z = (d - B) / _, ee = B === 0 ? z : z + 1, le = j.createImageData(T, _), ve = 0, ye, me = D.data, we = le.data, Pe, Ee, Fe, Ie, We, je, fe, he;
            if (h)
              switch (h.length) {
                case 1:
                  We = h[0], je = h[0], fe = h[0], he = h[0];
                  break;
                case 4:
                  We = h[0], je = h[1], fe = h[2], he = h[3];
                  break;
              }
            if (D.kind === t.ImageKind.GRAYSCALE_1BPP) {
              var H = me.byteLength, re = new Uint32Array(we.buffer, 0, we.byteLength >> 2), Q = re.length, oe = T + 7 >> 3, ne = 4294967295, J = t.IsLittleEndianCached.value ? 4278190080 : 255;
              if (he && he[0] === 255 && he[255] === 0) {
                var pe = [J, ne];
                ne = pe[0], J = pe[1];
              }
              for (Pe = 0; Pe < ee; Pe++) {
                for (Fe = Pe < z ? _ : B, ye = 0, Ee = 0; Ee < Fe; Ee++) {
                  for (var ce = H - ve, Ae = 0, Re = ce > oe ? T : ce * 8 - 7, De = Re & -8, Le = 0, Te = 0; Ae < De; Ae += 8)
                    Te = me[ve++], re[ye++] = Te & 128 ? ne : J, re[ye++] = Te & 64 ? ne : J, re[ye++] = Te & 32 ? ne : J, re[ye++] = Te & 16 ? ne : J, re[ye++] = Te & 8 ? ne : J, re[ye++] = Te & 4 ? ne : J, re[ye++] = Te & 2 ? ne : J, re[ye++] = Te & 1 ? ne : J;
                  for (; Ae < Re; Ae++)
                    Le === 0 && (Te = me[ve++], Le = 128), re[ye++] = Te & Le ? ne : J, Le >>= 1;
                }
                for (; ye < Q; )
                  re[ye++] = 0;
                j.putImageData(le, 0, Pe * _);
              }
            } else if (D.kind === t.ImageKind.RGBA_32BPP) {
              var ze = !!(We || je || fe);
              for (Ee = 0, Ie = T * _ * 4, Pe = 0; Pe < z; Pe++) {
                if (we.set(me.subarray(ve, ve + Ie)), ve += Ie, ze)
                  for (var xe = 0; xe < Ie; xe += 4)
                    We && (we[xe + 0] = We[we[xe + 0]]), je && (we[xe + 1] = je[we[xe + 1]]), fe && (we[xe + 2] = fe[we[xe + 2]]);
                j.putImageData(le, 0, Ee), Ee += _;
              }
              if (Pe < ee) {
                if (Ie = T * B * 4, we.set(me.subarray(ve, ve + Ie)), ze)
                  for (var Oe = 0; Oe < Ie; Oe += 4)
                    We && (we[Oe + 0] = We[we[Oe + 0]]), je && (we[Oe + 1] = je[we[Oe + 1]]), fe && (we[Oe + 2] = fe[we[Oe + 2]]);
                j.putImageData(le, 0, Ee);
              }
            } else if (D.kind === t.ImageKind.RGB_24BPP) {
              var Be = !!(We || je || fe);
              for (Fe = _, Ie = T * Fe, Pe = 0; Pe < ee; Pe++) {
                for (Pe >= z && (Fe = B, Ie = T * Fe), ye = 0, Ee = Ie; Ee--; )
                  we[ye++] = me[ve++], we[ye++] = me[ve++], we[ye++] = me[ve++], we[ye++] = 255;
                if (Be)
                  for (var Ne = 0; Ne < ye; Ne += 4)
                    We && (we[Ne + 0] = We[we[Ne + 0]]), je && (we[Ne + 1] = je[we[Ne + 1]]), fe && (we[Ne + 2] = fe[we[Ne + 2]]);
                j.putImageData(le, 0, Pe * _);
              }
            } else
              throw new Error("bad image kind: ".concat(D.kind));
          }
          function te(j, D) {
            for (var h = D.height, d = D.width, T = h % _, B = (h - T) / _, z = T === 0 ? B : B + 1, ee = j.createImageData(d, _), le = 0, ve = D.data, ye = ee.data, me = 0; me < z; me++) {
              for (var we = me < B ? _ : T, Pe = 3, Ee = 0; Ee < we; Ee++)
                for (var Fe = void 0, Ie = 0, We = 0; We < d; We++)
                  Ie || (Fe = ve[le++], Ie = 128), ye[Pe] = Fe & Ie ? 0 : 255, Pe += 4, Ie >>= 1;
              j.putImageData(ee, 0, me * _);
            }
          }
          function K(j, D) {
            for (var h = ["strokeStyle", "fillStyle", "fillRule", "globalAlpha", "lineWidth", "lineCap", "lineJoin", "miterLimit", "globalCompositeOperation", "font"], d = 0, T = h.length; d < T; d++) {
              var B = h[d];
              j[B] !== void 0 && (D[B] = j[B]);
            }
            j.setLineDash !== void 0 && (D.setLineDash(j.getLineDash()), D.lineDashOffset = j.lineDashOffset);
          }
          function ae(j) {
            j.strokeStyle = "#000000", j.fillStyle = "#000000", j.fillRule = "nonzero", j.globalAlpha = 1, j.lineWidth = 1, j.lineCap = "butt", j.lineJoin = "miter", j.miterLimit = 10, j.globalCompositeOperation = "source-over", j.font = "10px sans-serif", j.setLineDash !== void 0 && (j.setLineDash([]), j.lineDashOffset = 0);
          }
          function V(j, D, h, d) {
            for (var T = j.length, B = 3; B < T; B += 4) {
              var z = j[B];
              if (z === 0)
                j[B - 3] = D, j[B - 2] = h, j[B - 1] = d;
              else if (z < 255) {
                var ee = 255 - z;
                j[B - 3] = j[B - 3] * z + D * ee >> 8, j[B - 2] = j[B - 2] * z + h * ee >> 8, j[B - 1] = j[B - 1] * z + d * ee >> 8;
              }
            }
          }
          function q(j, D, h) {
            for (var d = j.length, T = 1 / 255, B = 3; B < d; B += 4) {
              var z = h ? h[j[B]] : j[B];
              D[B] = D[B] * z * T | 0;
            }
          }
          function w(j, D, h) {
            for (var d = j.length, T = 3; T < d; T += 4) {
              var B = j[T - 3] * 77 + j[T - 2] * 152 + j[T - 1] * 28;
              D[T] = h ? D[T] * h[B >> 8] >> 8 : D[T] * B >> 16;
            }
          }
          function p(j, D, h, d, T, B, z, ee, le, ve, ye) {
            var me = !!B, we = me ? B[0] : 0, Pe = me ? B[1] : 0, Ee = me ? B[2] : 0, Fe;
            T === "Luminosity" ? Fe = w : Fe = q;
            for (var Ie = 1048576, We = Math.min(d, Math.ceil(Ie / h)), je = 0; je < d; je += We) {
              var fe = Math.min(We, d - je), he = j.getImageData(ee - ve, je + (le - ye), h, fe), H = D.getImageData(ee, je + le, h, fe);
              me && V(he.data, we, Pe, Ee), Fe(he.data, H.data, z), D.putImageData(H, ee, je + le);
            }
          }
          function P(j, D, h, d) {
            var T = d[0], B = d[1], z = d[2] - T, ee = d[3] - B;
            z === 0 || ee === 0 || (p(D.context, h, z, ee, D.subtype, D.backdrop, D.transferMap, T, B, D.offsetX, D.offsetY), j.save(), j.globalAlpha = 1, j.globalCompositeOperation = "source-over", j.setTransform(1, 0, 0, 1, 0, 0), j.drawImage(h.canvas, 0, 0), j.restore());
          }
          function F(j, D) {
            var h = t.Util.singularValueDecompose2dScale(j);
            h[0] = Math.fround(h[0]), h[1] = Math.fround(h[1]);
            var d = Math.fround((globalThis.devicePixelRatio || 1) * i.PixelsPerInch.PDF_TO_CSS_UNITS);
            return D !== void 0 ? D : h[0] <= d || h[1] <= d;
          }
          var G = ["butt", "round", "square"], Z = ["miter", "round", "bevel"], Y = {}, de = {}, Se = /* @__PURE__ */ function() {
            function j(D, h, d, T, B, z, ee) {
              c(this, j), this.ctx = D, this.current = new W(this.ctx.canvas.width, this.ctx.canvas.height), this.stateStack = [], this.pendingClip = null, this.pendingEOFill = !1, this.res = null, this.xobjs = null, this.commonObjs = h, this.objs = d, this.canvasFactory = T, this.imageLayer = B, this.groupStack = [], this.processingType3 = null, this.baseTransform = null, this.baseTransformStack = [], this.groupLevel = 0, this.smaskStack = [], this.smaskCounter = 0, this.tempSMask = null, this.suspendedCtx = null, this.contentVisible = !0, this.markedContentStack = [], this.optionalContentConfig = z, this.cachedCanvases = new L(this.canvasFactory), this.cachedPatterns = /* @__PURE__ */ new Map(), this.annotationCanvasMap = ee, this.viewportScale = 1, this.outputScaleX = 1, this.outputScaleY = 1, D && R(D), this._cachedGetSinglePixelWidth = null;
            }
            return b(j, [{
              key: "beginDrawing",
              value: function(h) {
                var d = h.transform, T = h.viewport, B = h.transparency, z = B === void 0 ? !1 : B, ee = h.background, le = ee === void 0 ? null : ee, ve = this.ctx.canvas.width, ye = this.ctx.canvas.height;
                if (this.ctx.save(), this.ctx.fillStyle = le || "rgb(255, 255, 255)", this.ctx.fillRect(0, 0, ve, ye), this.ctx.restore(), z) {
                  var me = this.cachedCanvases.getCanvas("transparent", ve, ye, !0);
                  this.compositeCtx = this.ctx, this.transparentCanvas = me.canvas, this.ctx = me.context, this.ctx.save(), this.ctx.transform.apply(this.ctx, this.compositeCtx.mozCurrentTransform);
                }
                this.ctx.save(), ae(this.ctx), d && (this.ctx.transform.apply(this.ctx, d), this.outputScaleX = d[0], this.outputScaleY = d[0]), this.ctx.transform.apply(this.ctx, T.transform), this.viewportScale = T.scale, this.baseTransform = this.ctx.mozCurrentTransform.slice(), this._combinedScaleFactor = Math.hypot(this.baseTransform[0], this.baseTransform[2]), this.imageLayer && this.imageLayer.beginLayout();
              }
            }, {
              key: "executeOperatorList",
              value: function(h, d, T, B) {
                var z = h.argsArray, ee = h.fnArray, le = d || 0, ve = z.length;
                if (ve === le)
                  return le;
                for (var ye = ve - le > f && typeof T == "function", me = ye ? Date.now() + m : 0, we = 0, Pe = this.commonObjs, Ee = this.objs, Fe; ; ) {
                  if (B !== void 0 && le === B.nextBreakPoint)
                    return B.breakIt(le, T), le;
                  if (Fe = ee[le], Fe !== t.OPS.dependency)
                    this[Fe].apply(this, z[le]);
                  else {
                    var Ie = u(z[le]), We;
                    try {
                      for (Ie.s(); !(We = Ie.n()).done; ) {
                        var je = We.value, fe = je.startsWith("g_") ? Pe : Ee;
                        if (!fe.has(je))
                          return fe.get(je, T), le;
                      }
                    } catch (he) {
                      Ie.e(he);
                    } finally {
                      Ie.f();
                    }
                  }
                  if (le++, le === ve)
                    return le;
                  if (ye && ++we > f) {
                    if (Date.now() > me)
                      return T(), le;
                    we = 0;
                  }
                }
              }
            }, {
              key: "endDrawing",
              value: function() {
                for (; this.stateStack.length || this.current.activeSMask !== null; )
                  this.restore();
                this.ctx.restore(), this.transparentCanvas && (this.ctx = this.compositeCtx, this.ctx.save(), this.ctx.setTransform(1, 0, 0, 1, 0, 0), this.ctx.drawImage(this.transparentCanvas, 0, 0), this.ctx.restore(), this.transparentCanvas = null), this.cachedCanvases.clear(), this.cachedPatterns.clear(), this.imageLayer && this.imageLayer.endLayout();
              }
            }, {
              key: "_scaleImage",
              value: function(h, d) {
                for (var T = h.width, B = h.height, z = Math.max(Math.hypot(d[0], d[1]), 1), ee = Math.max(Math.hypot(d[2], d[3]), 1), le = T, ve = B, ye = "prescale1", me, we; z > 2 && le > 1 || ee > 2 && ve > 1; ) {
                  var Pe = le, Ee = ve;
                  z > 2 && le > 1 && (Pe = Math.ceil(le / 2), z /= le / Pe), ee > 2 && ve > 1 && (Ee = Math.ceil(ve / 2), ee /= ve / Ee), me = this.cachedCanvases.getCanvas(ye, Pe, Ee), we = me.context, we.clearRect(0, 0, Pe, Ee), we.drawImage(h, 0, 0, le, ve, 0, 0, Pe, Ee), h = me.canvas, le = Pe, ve = Ee, ye = ye === "prescale1" ? "prescale2" : "prescale1";
                }
                return {
                  img: h,
                  paintWidth: le,
                  paintHeight: ve
                };
              }
            }, {
              key: "_createMaskCanvas",
              value: function(h) {
                var d = this.ctx, T = h.width, B = h.height, z = this.current.fillColor, ee = this.current.patternFill, le = this.cachedCanvases.getCanvas("maskCanvas", T, B), ve = le.context;
                te(ve, h);
                var ye = d.mozCurrentTransform, me = t.Util.transform(ye, [1 / T, 0, 0, -1 / B, 0, 0]);
                me = t.Util.transform(me, [1, 0, 0, 1, 0, -B]);
                var we = t.Util.applyTransform([0, 0], me), Pe = t.Util.applyTransform([T, B], me), Ee = t.Util.normalizeRect([we[0], we[1], Pe[0], Pe[1]]), Fe = Math.ceil(Ee[2] - Ee[0]), Ie = Math.ceil(Ee[3] - Ee[1]), We = this.cachedCanvases.getCanvas("fillCanvas", Fe, Ie, !0), je = We.context, fe = Math.min(we[0], Pe[0]), he = Math.min(we[1], Pe[1]);
                je.translate(-fe, -he), je.transform.apply(je, me);
                var H = this._scaleImage(le.canvas, je.mozCurrentTransformInverse);
                je.imageSmoothingEnabled = F(je.mozCurrentTransform, h.interpolate), je.drawImage(H.img, 0, 0, H.img.width, H.img.height, 0, 0, T, B), je.globalCompositeOperation = "source-in";
                var re = t.Util.transform(je.mozCurrentTransformInverse, [1, 0, 0, 1, -fe, -he]);
                return je.fillStyle = ee ? z.getPattern(d, this, re, a.PathType.FILL) : z, je.fillRect(0, 0, T, B), {
                  canvas: We.canvas,
                  offsetX: Math.round(fe),
                  offsetY: Math.round(he)
                };
              }
            }, {
              key: "setLineWidth",
              value: function(h) {
                this.current.lineWidth = h, this.ctx.lineWidth = h;
              }
            }, {
              key: "setLineCap",
              value: function(h) {
                this.ctx.lineCap = G[h];
              }
            }, {
              key: "setLineJoin",
              value: function(h) {
                this.ctx.lineJoin = Z[h];
              }
            }, {
              key: "setMiterLimit",
              value: function(h) {
                this.ctx.miterLimit = h;
              }
            }, {
              key: "setDash",
              value: function(h, d) {
                var T = this.ctx;
                T.setLineDash !== void 0 && (T.setLineDash(h), T.lineDashOffset = d);
              }
            }, {
              key: "setRenderingIntent",
              value: function(h) {
              }
            }, {
              key: "setFlatness",
              value: function(h) {
              }
            }, {
              key: "setGState",
              value: function(h) {
                for (var d = 0, T = h.length; d < T; d++) {
                  var B = h[d], z = B[0], ee = B[1];
                  switch (z) {
                    case "LW":
                      this.setLineWidth(ee);
                      break;
                    case "LC":
                      this.setLineCap(ee);
                      break;
                    case "LJ":
                      this.setLineJoin(ee);
                      break;
                    case "ML":
                      this.setMiterLimit(ee);
                      break;
                    case "D":
                      this.setDash(ee[0], ee[1]);
                      break;
                    case "RI":
                      this.setRenderingIntent(ee);
                      break;
                    case "FL":
                      this.setFlatness(ee);
                      break;
                    case "Font":
                      this.setFont(ee[0], ee[1]);
                      break;
                    case "CA":
                      this.current.strokeAlpha = B[1];
                      break;
                    case "ca":
                      this.current.fillAlpha = B[1], this.ctx.globalAlpha = B[1];
                      break;
                    case "BM":
                      this.ctx.globalCompositeOperation = ee;
                      break;
                    case "SMask":
                      this.current.activeSMask = ee ? this.tempSMask : null, this.tempSMask = null, this.checkSMaskState();
                      break;
                    case "TR":
                      this.current.transferMaps = ee;
                  }
                }
              }
            }, {
              key: "checkSMaskState",
              value: function() {
                var h = !!this.suspendedCtx;
                this.current.activeSMask && !h ? this.beginSMaskMode() : !this.current.activeSMask && h && this.endSMaskMode();
              }
            }, {
              key: "beginSMaskMode",
              value: function() {
                if (this.suspendedCtx)
                  throw new Error("beginSMaskMode called while already in smask mode");
                var h = this.ctx.canvas.width, d = this.ctx.canvas.height, T = "smaskGroupAt" + this.groupLevel, B = this.cachedCanvases.getCanvas(T, h, d, !0);
                this.suspendedCtx = this.ctx, this.ctx = B.context;
                var z = this.ctx;
                z.setTransform.apply(z, this.suspendedCtx.mozCurrentTransform), K(this.suspendedCtx, z), y(z, this.suspendedCtx), this.setGState([["BM", "source-over"], ["ca", 1], ["CA", 1]]);
              }
            }, {
              key: "endSMaskMode",
              value: function() {
                if (!this.suspendedCtx)
                  throw new Error("endSMaskMode called while not in smask mode");
                this.ctx._removeMirroring(), K(this.ctx, this.suspendedCtx), this.ctx = this.suspendedCtx, this.current.activeSMask = null, this.suspendedCtx = null;
              }
            }, {
              key: "compose",
              value: function(h) {
                if (!!this.current.activeSMask) {
                  h ? (h[0] = Math.floor(h[0]), h[1] = Math.floor(h[1]), h[2] = Math.ceil(h[2]), h[3] = Math.ceil(h[3])) : h = [0, 0, this.ctx.canvas.width, this.ctx.canvas.height];
                  var d = this.current.activeSMask, T = this.suspendedCtx;
                  P(T, d, this.ctx, h), this.ctx.save(), this.ctx.setTransform(1, 0, 0, 1, 0, 0), this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height), this.ctx.restore();
                }
              }
            }, {
              key: "save",
              value: function() {
                this.ctx.save();
                var h = this.current;
                this.stateStack.push(h), this.current = h.clone();
              }
            }, {
              key: "restore",
              value: function() {
                this.stateStack.length === 0 && this.current.activeSMask && this.endSMaskMode(), this.stateStack.length !== 0 && (this.current = this.stateStack.pop(), this.ctx.restore(), this.checkSMaskState(), this.pendingClip = null, this._cachedGetSinglePixelWidth = null);
              }
            }, {
              key: "transform",
              value: function(h, d, T, B, z, ee) {
                this.ctx.transform(h, d, T, B, z, ee), this._cachedGetSinglePixelWidth = null;
              }
            }, {
              key: "constructPath",
              value: function(h, d) {
                for (var T = this.ctx, B = this.current, z = B.x, ee = B.y, le, ve, ye = 0, me = 0, we = h.length; ye < we; ye++)
                  switch (h[ye] | 0) {
                    case t.OPS.rectangle:
                      z = d[me++], ee = d[me++];
                      var Pe = d[me++], Ee = d[me++], Fe = z + Pe, Ie = ee + Ee;
                      T.moveTo(z, ee), Pe === 0 || Ee === 0 ? T.lineTo(Fe, Ie) : (T.lineTo(Fe, ee), T.lineTo(Fe, Ie), T.lineTo(z, Ie)), B.updatePathMinMax(T.mozCurrentTransform, z, ee), B.updatePathMinMax(T.mozCurrentTransform, Fe, Ie), T.closePath();
                      break;
                    case t.OPS.moveTo:
                      z = d[me++], ee = d[me++], T.moveTo(z, ee), B.updatePathMinMax(T.mozCurrentTransform, z, ee);
                      break;
                    case t.OPS.lineTo:
                      z = d[me++], ee = d[me++], T.lineTo(z, ee), B.updatePathMinMax(T.mozCurrentTransform, z, ee);
                      break;
                    case t.OPS.curveTo:
                      le = z, ve = ee, z = d[me + 4], ee = d[me + 5], T.bezierCurveTo(d[me], d[me + 1], d[me + 2], d[me + 3], z, ee), B.updateCurvePathMinMax(T.mozCurrentTransform, le, ve, d[me], d[me + 1], d[me + 2], d[me + 3], z, ee), me += 6;
                      break;
                    case t.OPS.curveTo2:
                      le = z, ve = ee, T.bezierCurveTo(z, ee, d[me], d[me + 1], d[me + 2], d[me + 3]), B.updateCurvePathMinMax(T.mozCurrentTransform, le, ve, z, ee, d[me], d[me + 1], d[me + 2], d[me + 3]), z = d[me + 2], ee = d[me + 3], me += 4;
                      break;
                    case t.OPS.curveTo3:
                      le = z, ve = ee, z = d[me + 2], ee = d[me + 3], T.bezierCurveTo(d[me], d[me + 1], z, ee, z, ee), B.updateCurvePathMinMax(T.mozCurrentTransform, le, ve, d[me], d[me + 1], z, ee, z, ee), me += 4;
                      break;
                    case t.OPS.closePath:
                      T.closePath();
                      break;
                  }
                B.setCurrentPoint(z, ee);
              }
            }, {
              key: "closePath",
              value: function() {
                this.ctx.closePath();
              }
            }, {
              key: "stroke",
              value: function(h) {
                h = typeof h < "u" ? h : !0;
                var d = this.ctx, T = this.current.strokeColor;
                if (d.globalAlpha = this.current.strokeAlpha, this.contentVisible)
                  if (s(T) === "object" && T !== null && T !== void 0 && T.getPattern) {
                    var B = this.getSinglePixelWidth();
                    d.save(), d.strokeStyle = T.getPattern(d, this, d.mozCurrentTransformInverse, a.PathType.STROKE), d.lineWidth = Math.max(B, this.current.lineWidth), d.stroke(), d.restore();
                  } else {
                    var z = this.getSinglePixelWidth();
                    z < 0 && -z >= this.current.lineWidth ? (d.save(), d.resetTransform(), d.lineWidth = Math.round(this._combinedScaleFactor), d.stroke(), d.restore()) : (d.lineWidth = Math.max(z, this.current.lineWidth), d.stroke());
                  }
                h && this.consumePath(this.current.getClippedPathBoundingBox()), d.globalAlpha = this.current.fillAlpha;
              }
            }, {
              key: "closeStroke",
              value: function() {
                this.closePath(), this.stroke();
              }
            }, {
              key: "fill",
              value: function(h) {
                h = typeof h < "u" ? h : !0;
                var d = this.ctx, T = this.current.fillColor, B = this.current.patternFill, z = !1;
                B && (d.save(), d.fillStyle = T.getPattern(d, this, d.mozCurrentTransformInverse, a.PathType.FILL), z = !0);
                var ee = this.current.getClippedPathBoundingBox();
                this.contentVisible && ee !== null && (this.pendingEOFill ? (d.fill("evenodd"), this.pendingEOFill = !1) : d.fill()), z && d.restore(), h && this.consumePath(ee);
              }
            }, {
              key: "eoFill",
              value: function() {
                this.pendingEOFill = !0, this.fill();
              }
            }, {
              key: "fillStroke",
              value: function() {
                this.fill(!1), this.stroke(!1), this.consumePath();
              }
            }, {
              key: "eoFillStroke",
              value: function() {
                this.pendingEOFill = !0, this.fillStroke();
              }
            }, {
              key: "closeFillStroke",
              value: function() {
                this.closePath(), this.fillStroke();
              }
            }, {
              key: "closeEOFillStroke",
              value: function() {
                this.pendingEOFill = !0, this.closePath(), this.fillStroke();
              }
            }, {
              key: "endPath",
              value: function() {
                this.consumePath();
              }
            }, {
              key: "clip",
              value: function() {
                this.pendingClip = Y;
              }
            }, {
              key: "eoClip",
              value: function() {
                this.pendingClip = de;
              }
            }, {
              key: "beginText",
              value: function() {
                this.current.textMatrix = t.IDENTITY_MATRIX, this.current.textMatrixScale = 1, this.current.x = this.current.lineX = 0, this.current.y = this.current.lineY = 0;
              }
            }, {
              key: "endText",
              value: function() {
                var h = this.pendingTextPaths, d = this.ctx;
                if (h === void 0) {
                  d.beginPath();
                  return;
                }
                d.save(), d.beginPath();
                for (var T = 0; T < h.length; T++) {
                  var B = h[T];
                  d.setTransform.apply(d, B.transform), d.translate(B.x, B.y), B.addToPath(d, B.fontSize);
                }
                d.restore(), d.clip(), d.beginPath(), delete this.pendingTextPaths;
              }
            }, {
              key: "setCharSpacing",
              value: function(h) {
                this.current.charSpacing = h;
              }
            }, {
              key: "setWordSpacing",
              value: function(h) {
                this.current.wordSpacing = h;
              }
            }, {
              key: "setHScale",
              value: function(h) {
                this.current.textHScale = h / 100;
              }
            }, {
              key: "setLeading",
              value: function(h) {
                this.current.leading = -h;
              }
            }, {
              key: "setFont",
              value: function(h, d) {
                var T = this.commonObjs.get(h), B = this.current;
                if (!T)
                  throw new Error("Can't find font for ".concat(h));
                if (B.fontMatrix = T.fontMatrix || t.FONT_IDENTITY_MATRIX, (B.fontMatrix[0] === 0 || B.fontMatrix[3] === 0) && (0, t.warn)("Invalid font matrix for font " + h), d < 0 ? (d = -d, B.fontDirection = -1) : B.fontDirection = 1, this.current.font = T, this.current.fontSize = d, !T.isType3Font) {
                  var z = T.loadedName || "sans-serif", ee = "normal";
                  T.black ? ee = "900" : T.bold && (ee = "bold");
                  var le = T.italic ? "italic" : "normal", ve = '"'.concat(z, '", ').concat(T.fallbackName), ye = d;
                  d < N ? ye = N : d > x && (ye = x), this.current.fontSizeScale = d / ye, this.ctx.font = "".concat(le, " ").concat(ee, " ").concat(ye, "px ").concat(ve);
                }
              }
            }, {
              key: "setTextRenderingMode",
              value: function(h) {
                this.current.textRenderingMode = h;
              }
            }, {
              key: "setTextRise",
              value: function(h) {
                this.current.textRise = h;
              }
            }, {
              key: "moveText",
              value: function(h, d) {
                this.current.x = this.current.lineX += h, this.current.y = this.current.lineY += d;
              }
            }, {
              key: "setLeadingMoveText",
              value: function(h, d) {
                this.setLeading(-d), this.moveText(h, d);
              }
            }, {
              key: "setTextMatrix",
              value: function(h, d, T, B, z, ee) {
                this.current.textMatrix = [h, d, T, B, z, ee], this.current.textMatrixScale = Math.hypot(h, d), this.current.x = this.current.lineX = 0, this.current.y = this.current.lineY = 0;
              }
            }, {
              key: "nextLine",
              value: function() {
                this.moveText(0, this.current.leading);
              }
            }, {
              key: "paintChar",
              value: function(h, d, T, B, z) {
                var ee = this.ctx, le = this.current, ve = le.font, ye = le.textRenderingMode, me = le.fontSize / le.fontSizeScale, we = ye & t.TextRenderingMode.FILL_STROKE_MASK, Pe = !!(ye & t.TextRenderingMode.ADD_TO_PATH_FLAG), Ee = le.patternFill && !ve.missingFile, Fe;
                if ((ve.disableFontFace || Pe || Ee) && (Fe = ve.getPathGenerator(this.commonObjs, h)), ve.disableFontFace || Ee ? (ee.save(), ee.translate(d, T), ee.beginPath(), Fe(ee, me), B && ee.setTransform.apply(ee, B), (we === t.TextRenderingMode.FILL || we === t.TextRenderingMode.FILL_STROKE) && ee.fill(), (we === t.TextRenderingMode.STROKE || we === t.TextRenderingMode.FILL_STROKE) && (z && (ee.resetTransform(), ee.lineWidth = Math.round(this._combinedScaleFactor)), ee.stroke()), ee.restore()) : ((we === t.TextRenderingMode.FILL || we === t.TextRenderingMode.FILL_STROKE) && ee.fillText(h, d, T), (we === t.TextRenderingMode.STROKE || we === t.TextRenderingMode.FILL_STROKE) && (z ? (ee.save(), ee.moveTo(d, T), ee.resetTransform(), ee.lineWidth = Math.round(this._combinedScaleFactor), ee.strokeText(h, 0, 0), ee.restore()) : ee.strokeText(h, d, T))), Pe) {
                  var Ie = this.pendingTextPaths || (this.pendingTextPaths = []);
                  Ie.push({
                    transform: ee.mozCurrentTransform,
                    x: d,
                    y: T,
                    fontSize: me,
                    addToPath: Fe
                  });
                }
              }
            }, {
              key: "isFontSubpixelAAEnabled",
              get: function() {
                var h = this.cachedCanvases.getCanvas("isFontSubpixelAAEnabled", 10, 10), d = h.context;
                d.scale(1.5, 1), d.fillText("I", 0, 10);
                for (var T = d.getImageData(0, 0, 10, 10).data, B = !1, z = 3; z < T.length; z += 4)
                  if (T[z] > 0 && T[z] < 255) {
                    B = !0;
                    break;
                  }
                return (0, t.shadow)(this, "isFontSubpixelAAEnabled", B);
              }
            }, {
              key: "showText",
              value: function(h) {
                var d = this.current, T = d.font;
                if (T.isType3Font)
                  return this.showType3Text(h);
                var B = d.fontSize;
                if (B !== 0) {
                  var z = this.ctx, ee = d.fontSizeScale, le = d.charSpacing, ve = d.wordSpacing, ye = d.fontDirection, me = d.textHScale * ye, we = h.length, Pe = T.vertical, Ee = Pe ? 1 : -1, Fe = T.defaultVMetrics, Ie = B * d.fontMatrix[0], We = d.textRenderingMode === t.TextRenderingMode.FILL && !T.disableFontFace && !d.patternFill;
                  z.save(), z.transform.apply(z, d.textMatrix), z.translate(d.x, d.y + d.textRise), ye > 0 ? z.scale(me, -1) : z.scale(me, 1);
                  var je;
                  if (d.patternFill) {
                    z.save();
                    var fe = d.fillColor.getPattern(z, this, z.mozCurrentTransformInverse, a.PathType.FILL);
                    je = z.mozCurrentTransform, z.restore(), z.fillStyle = fe;
                  }
                  var he = d.lineWidth, H = !1, re = d.textMatrixScale;
                  if (re === 0 || he === 0) {
                    var Q = d.textRenderingMode & t.TextRenderingMode.FILL_STROKE_MASK;
                    (Q === t.TextRenderingMode.STROKE || Q === t.TextRenderingMode.FILL_STROKE) && (this._cachedGetSinglePixelWidth = null, he = this.getSinglePixelWidth(), H = he < 0);
                  } else
                    he /= re;
                  ee !== 1 && (z.scale(ee, ee), he /= ee), z.lineWidth = he;
                  var oe = 0, ne;
                  for (ne = 0; ne < we; ++ne) {
                    var J = h[ne];
                    if ((0, t.isNum)(J)) {
                      oe += Ee * J * B / 1e3;
                      continue;
                    }
                    var pe = !1, ce = (J.isSpace ? ve : 0) + le, Ae = J.fontChar, Re = J.accent, De = void 0, Le = void 0, Te = J.width;
                    if (Pe) {
                      var ze = J.vmetric || Fe, xe = -(J.vmetric ? ze[1] : Te * 0.5) * Ie, Oe = ze[2] * Ie;
                      Te = ze ? -ze[0] : Te, De = xe / ee, Le = (oe + Oe) / ee;
                    } else
                      De = oe / ee, Le = 0;
                    if (T.remeasure && Te > 0) {
                      var Be = z.measureText(Ae).width * 1e3 / B * ee;
                      if (Te < Be && this.isFontSubpixelAAEnabled) {
                        var Ne = Te / Be;
                        pe = !0, z.save(), z.scale(Ne, 1), De /= Ne;
                      } else
                        Te !== Be && (De += (Te - Be) / 2e3 * B / ee);
                    }
                    if (this.contentVisible && (J.isInFont || T.missingFile)) {
                      if (We && !Re)
                        z.fillText(Ae, De, Le);
                      else if (this.paintChar(Ae, De, Le, je, H), Re) {
                        var $e = De + B * Re.offset.x / ee, Xe = Le - B * Re.offset.y / ee;
                        this.paintChar(Re.fontChar, $e, Xe, je, H);
                      }
                    }
                    var Je = void 0;
                    Pe ? Je = Te * Ie - ce * ye : Je = Te * Ie + ce * ye, oe += Je, pe && z.restore();
                  }
                  Pe ? d.y -= oe : d.x += oe * me, z.restore(), this.compose();
                }
              }
            }, {
              key: "showType3Text",
              value: function(h) {
                var d = this.ctx, T = this.current, B = T.font, z = T.fontSize, ee = T.fontDirection, le = B.vertical ? 1 : -1, ve = T.charSpacing, ye = T.wordSpacing, me = T.textHScale * ee, we = T.fontMatrix || t.FONT_IDENTITY_MATRIX, Pe = h.length, Ee = T.textRenderingMode === t.TextRenderingMode.INVISIBLE, Fe, Ie, We, je;
                if (!(Ee || z === 0)) {
                  for (this._cachedGetSinglePixelWidth = null, d.save(), d.transform.apply(d, T.textMatrix), d.translate(T.x, T.y), d.scale(me, ee), Fe = 0; Fe < Pe; ++Fe) {
                    if (Ie = h[Fe], (0, t.isNum)(Ie)) {
                      je = le * Ie * z / 1e3, this.ctx.translate(je, 0), T.x += je * me;
                      continue;
                    }
                    var fe = (Ie.isSpace ? ye : 0) + ve, he = B.charProcOperatorList[Ie.operatorListId];
                    if (!he) {
                      (0, t.warn)('Type3 character "'.concat(Ie.operatorListId, '" is not available.'));
                      continue;
                    }
                    this.contentVisible && (this.processingType3 = Ie, this.save(), d.scale(z, z), d.transform.apply(d, we), this.executeOperatorList(he), this.restore());
                    var H = t.Util.applyTransform([Ie.width, 0], we);
                    We = H[0] * z + fe, d.translate(We, 0), T.x += We * me;
                  }
                  d.restore(), this.processingType3 = null;
                }
              }
            }, {
              key: "setCharWidth",
              value: function(h, d) {
              }
            }, {
              key: "setCharWidthAndBounds",
              value: function(h, d, T, B, z, ee) {
                this.ctx.rect(T, B, z - T, ee - B), this.clip(), this.endPath();
              }
            }, {
              key: "getColorN_Pattern",
              value: function(h) {
                var d = this, T;
                if (h[0] === "TilingPattern") {
                  var B = h[1], z = this.baseTransform || this.ctx.mozCurrentTransform.slice(), ee = {
                    createCanvasGraphics: function(ve) {
                      return new j(ve, d.commonObjs, d.objs, d.canvasFactory);
                    }
                  };
                  T = new a.TilingPattern(h, B, this.ctx, ee, z);
                } else
                  T = this._getPattern(h[1], h[2]);
                return T;
              }
            }, {
              key: "setStrokeColorN",
              value: function() {
                this.current.strokeColor = this.getColorN_Pattern(arguments);
              }
            }, {
              key: "setFillColorN",
              value: function() {
                this.current.fillColor = this.getColorN_Pattern(arguments), this.current.patternFill = !0;
              }
            }, {
              key: "setStrokeRGBColor",
              value: function(h, d, T) {
                var B = t.Util.makeHexColor(h, d, T);
                this.ctx.strokeStyle = B, this.current.strokeColor = B;
              }
            }, {
              key: "setFillRGBColor",
              value: function(h, d, T) {
                var B = t.Util.makeHexColor(h, d, T);
                this.ctx.fillStyle = B, this.current.fillColor = B, this.current.patternFill = !1;
              }
            }, {
              key: "_getPattern",
              value: function(h) {
                var d = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : null, T;
                return this.cachedPatterns.has(h) ? T = this.cachedPatterns.get(h) : (T = (0, a.getShadingPattern)(this.objs.get(h)), this.cachedPatterns.set(h, T)), d && (T.matrix = d), T;
              }
            }, {
              key: "shadingFill",
              value: function(h) {
                if (!!this.contentVisible) {
                  var d = this.ctx;
                  this.save();
                  var T = this._getPattern(h);
                  d.fillStyle = T.getPattern(d, this, d.mozCurrentTransformInverse, a.PathType.SHADING);
                  var B = d.mozCurrentTransformInverse;
                  if (B) {
                    var z = d.canvas, ee = z.width, le = z.height, ve = t.Util.applyTransform([0, 0], B), ye = t.Util.applyTransform([0, le], B), me = t.Util.applyTransform([ee, 0], B), we = t.Util.applyTransform([ee, le], B), Pe = Math.min(ve[0], ye[0], me[0], we[0]), Ee = Math.min(ve[1], ye[1], me[1], we[1]), Fe = Math.max(ve[0], ye[0], me[0], we[0]), Ie = Math.max(ve[1], ye[1], me[1], we[1]);
                    this.ctx.fillRect(Pe, Ee, Fe - Pe, Ie - Ee);
                  } else
                    this.ctx.fillRect(-1e10, -1e10, 2e10, 2e10);
                  this.compose(this.current.getClippedPathBoundingBox()), this.restore();
                }
              }
            }, {
              key: "beginInlineImage",
              value: function() {
                (0, t.unreachable)("Should not call beginInlineImage");
              }
            }, {
              key: "beginImageData",
              value: function() {
                (0, t.unreachable)("Should not call beginImageData");
              }
            }, {
              key: "paintFormXObjectBegin",
              value: function(h, d) {
                if (!!this.contentVisible && (this.save(), this.baseTransformStack.push(this.baseTransform), Array.isArray(h) && h.length === 6 && this.transform.apply(this, h), this.baseTransform = this.ctx.mozCurrentTransform, d)) {
                  var T = d[2] - d[0], B = d[3] - d[1];
                  this.ctx.rect(d[0], d[1], T, B), this.current.updatePathMinMax(this.ctx.mozCurrentTransform, d[0], d[1]), this.current.updatePathMinMax(this.ctx.mozCurrentTransform, d[2], d[3]), this.clip(), this.endPath();
                }
              }
            }, {
              key: "paintFormXObjectEnd",
              value: function() {
                !this.contentVisible || (this.restore(), this.baseTransform = this.baseTransformStack.pop());
              }
            }, {
              key: "beginGroup",
              value: function(h) {
                if (!!this.contentVisible) {
                  this.save();
                  var d = this.suspendedCtx;
                  this.current.activeSMask && (this.suspendedCtx = null, this.current.activeSMask = null);
                  var T = this.ctx;
                  h.isolated || (0, t.info)("TODO: Support non-isolated groups."), h.knockout && (0, t.warn)("Knockout groups not supported.");
                  var B = T.mozCurrentTransform;
                  if (h.matrix && T.transform.apply(T, h.matrix), !h.bbox)
                    throw new Error("Bounding box is required.");
                  var z = t.Util.getAxialAlignedBoundingBox(h.bbox, T.mozCurrentTransform), ee = [0, 0, T.canvas.width, T.canvas.height];
                  z = t.Util.intersect(z, ee) || [0, 0, 0, 0];
                  var le = Math.floor(z[0]), ve = Math.floor(z[1]), ye = Math.max(Math.ceil(z[2]) - le, 1), me = Math.max(Math.ceil(z[3]) - ve, 1), we = 1, Pe = 1;
                  ye > U && (we = ye / U, ye = U), me > U && (Pe = me / U, me = U), this.current.startNewPathAndClipBox([0, 0, ye, me]);
                  var Ee = "groupAt" + this.groupLevel;
                  h.smask && (Ee += "_smask_" + this.smaskCounter++ % 2);
                  var Fe = this.cachedCanvases.getCanvas(Ee, ye, me, !0), Ie = Fe.context;
                  Ie.scale(1 / we, 1 / Pe), Ie.translate(-le, -ve), Ie.transform.apply(Ie, B), h.smask ? this.smaskStack.push({
                    canvas: Fe.canvas,
                    context: Ie,
                    offsetX: le,
                    offsetY: ve,
                    scaleX: we,
                    scaleY: Pe,
                    subtype: h.smask.subtype,
                    backdrop: h.smask.backdrop,
                    transferMap: h.smask.transferMap || null,
                    startTransformInverse: null
                  }) : (T.setTransform(1, 0, 0, 1, 0, 0), T.translate(le, ve), T.scale(we, Pe), T.save()), K(T, Ie), this.ctx = Ie, this.setGState([["BM", "source-over"], ["ca", 1], ["CA", 1]]), this.groupStack.push({
                    ctx: T,
                    suspendedCtx: d
                  }), this.groupLevel++;
                }
              }
            }, {
              key: "endGroup",
              value: function(h) {
                if (!!this.contentVisible) {
                  this.groupLevel--;
                  var d = this.ctx, T = this.groupStack.pop(), B = T.ctx, z = T.suspendedCtx;
                  if (this.ctx = B, this.ctx.imageSmoothingEnabled = !1, z && (this.suspendedCtx = z), h.smask)
                    this.tempSMask = this.smaskStack.pop(), this.restore();
                  else {
                    this.ctx.restore();
                    var ee = this.ctx.mozCurrentTransform;
                    this.restore(), this.ctx.save(), this.ctx.setTransform.apply(this.ctx, ee);
                    var le = t.Util.getAxialAlignedBoundingBox([0, 0, d.canvas.width, d.canvas.height], ee);
                    this.ctx.drawImage(d.canvas, 0, 0), this.ctx.restore(), this.compose(le);
                  }
                }
              }
            }, {
              key: "beginAnnotations",
              value: function() {
                this.save(), this.baseTransform && this.ctx.setTransform.apply(this.ctx, this.baseTransform);
              }
            }, {
              key: "endAnnotations",
              value: function() {
                this.restore();
              }
            }, {
              key: "beginAnnotation",
              value: function(h, d, T, B, z) {
                if (this.save(), Array.isArray(d) && d.length === 4) {
                  var ee = d[2] - d[0], le = d[3] - d[1];
                  if (z && this.annotationCanvasMap) {
                    T = T.slice(), T[4] -= d[0], T[5] -= d[1], d = d.slice(), d[0] = d[1] = 0, d[2] = ee, d[3] = le;
                    var ve = t.Util.singularValueDecompose2dScale(this.ctx.mozCurrentTransform), ye = A(ve, 2), me = ye[0], we = ye[1], Pe = this.viewportScale, Ee = Math.ceil(ee * this.outputScaleX * Pe), Fe = Math.ceil(le * this.outputScaleY * Pe);
                    this.annotationCanvas = this.canvasFactory.create(Ee, Fe);
                    var Ie = this.annotationCanvas, We = Ie.canvas, je = Ie.context;
                    We.style.width = "calc(".concat(ee, "px * var(--viewport-scale-factor))"), We.style.height = "calc(".concat(le, "px * var(--viewport-scale-factor))"), this.annotationCanvasMap.set(h, We), this.annotationCanvas.savedCtx = this.ctx, this.ctx = je, this.ctx.setTransform(me, 0, 0, -we, 0, le * we), R(this.ctx), ae(this.ctx);
                  } else
                    ae(this.ctx), this.ctx.rect(d[0], d[1], ee, le), this.clip(), this.endPath();
                }
                this.current = new W(this.ctx.canvas.width, this.ctx.canvas.height), this.transform.apply(this, T), this.transform.apply(this, B);
              }
            }, {
              key: "endAnnotation",
              value: function() {
                this.annotationCanvas && (this.ctx = this.annotationCanvas.savedCtx, delete this.annotationCanvas.savedCtx, delete this.annotationCanvas), this.restore();
              }
            }, {
              key: "paintImageMaskXObject",
              value: function(h) {
                if (!!this.contentVisible) {
                  var d = this.ctx, T = h.width, B = h.height, z = this.processingType3;
                  if (z && z.compiled === void 0 && (T <= v && B <= v ? z.compiled = $({
                    data: h.data,
                    width: T,
                    height: B
                  }) : z.compiled = null), z != null && z.compiled) {
                    z.compiled(d);
                    return;
                  }
                  var ee = this._createMaskCanvas(h), le = ee.canvas;
                  d.save(), d.setTransform(1, 0, 0, 1, 0, 0), d.drawImage(le, ee.offsetX, ee.offsetY), d.restore(), this.compose();
                }
              }
            }, {
              key: "paintImageMaskXObjectRepeat",
              value: function(h, d) {
                var T = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : 0, B = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : 0, z = arguments.length > 4 ? arguments[4] : void 0, ee = arguments.length > 5 ? arguments[5] : void 0;
                if (!!this.contentVisible) {
                  var le = this.ctx;
                  le.save();
                  var ve = le.mozCurrentTransform;
                  le.transform(d, T, B, z, 0, 0);
                  var ye = this._createMaskCanvas(h);
                  le.setTransform(1, 0, 0, 1, 0, 0);
                  for (var me = 0, we = ee.length; me < we; me += 2) {
                    var Pe = t.Util.transform(ve, [d, T, B, z, ee[me], ee[me + 1]]), Ee = t.Util.applyTransform([0, 0], Pe), Fe = A(Ee, 2), Ie = Fe[0], We = Fe[1];
                    le.drawImage(ye.canvas, Ie, We);
                  }
                  le.restore(), this.compose();
                }
              }
            }, {
              key: "paintImageMaskXObjectGroup",
              value: function(h) {
                if (!!this.contentVisible) {
                  for (var d = this.ctx, T = this.current.fillColor, B = this.current.patternFill, z = 0, ee = h.length; z < ee; z++) {
                    var le = h[z], ve = le.width, ye = le.height, me = this.cachedCanvases.getCanvas("maskCanvas", ve, ye), we = me.context;
                    we.save(), te(we, le), we.globalCompositeOperation = "source-in", we.fillStyle = B ? T.getPattern(we, this, d.mozCurrentTransformInverse, a.PathType.FILL) : T, we.fillRect(0, 0, ve, ye), we.restore(), d.save(), d.transform.apply(d, le.transform), d.scale(1, -1), d.drawImage(me.canvas, 0, 0, ve, ye, 0, -1, 1, 1), d.restore();
                  }
                  this.compose();
                }
              }
            }, {
              key: "paintImageXObject",
              value: function(h) {
                if (!!this.contentVisible) {
                  var d = h.startsWith("g_") ? this.commonObjs.get(h) : this.objs.get(h);
                  if (!d) {
                    (0, t.warn)("Dependent image isn't ready yet");
                    return;
                  }
                  this.paintInlineImageXObject(d);
                }
              }
            }, {
              key: "paintImageXObjectRepeat",
              value: function(h, d, T, B) {
                if (!!this.contentVisible) {
                  var z = h.startsWith("g_") ? this.commonObjs.get(h) : this.objs.get(h);
                  if (!z) {
                    (0, t.warn)("Dependent image isn't ready yet");
                    return;
                  }
                  for (var ee = z.width, le = z.height, ve = [], ye = 0, me = B.length; ye < me; ye += 2)
                    ve.push({
                      transform: [d, 0, 0, T, B[ye], B[ye + 1]],
                      x: 0,
                      y: 0,
                      w: ee,
                      h: le
                    });
                  this.paintInlineImageXObjectGroup(z, ve);
                }
              }
            }, {
              key: "paintInlineImageXObject",
              value: function(h) {
                if (!!this.contentVisible) {
                  var d = h.width, T = h.height, B = this.ctx;
                  this.save(), B.scale(1 / d, -1 / T);
                  var z;
                  if (typeof HTMLElement == "function" && h instanceof HTMLElement || !h.data)
                    z = h;
                  else {
                    var ee = this.cachedCanvases.getCanvas("inlineImage", d, T), le = ee.context;
                    X(le, h, this.current.transferMaps), z = ee.canvas;
                  }
                  var ve = this._scaleImage(z, B.mozCurrentTransformInverse);
                  if (B.imageSmoothingEnabled = F(B.mozCurrentTransform, h.interpolate), B.drawImage(ve.img, 0, 0, ve.paintWidth, ve.paintHeight, 0, -T, d, T), this.imageLayer) {
                    var ye = this.getCanvasPosition(0, -T);
                    this.imageLayer.appendImage({
                      imgData: h,
                      left: ye[0],
                      top: ye[1],
                      width: d / B.mozCurrentTransformInverse[0],
                      height: T / B.mozCurrentTransformInverse[3]
                    });
                  }
                  this.compose(), this.restore();
                }
              }
            }, {
              key: "paintInlineImageXObjectGroup",
              value: function(h, d) {
                if (!!this.contentVisible) {
                  var T = this.ctx, B = h.width, z = h.height, ee = this.cachedCanvases.getCanvas("inlineImage", B, z), le = ee.context;
                  X(le, h, this.current.transferMaps);
                  for (var ve = 0, ye = d.length; ve < ye; ve++) {
                    var me = d[ve];
                    if (T.save(), T.transform.apply(T, me.transform), T.scale(1, -1), T.drawImage(ee.canvas, me.x, me.y, me.w, me.h, 0, -1, 1, 1), this.imageLayer) {
                      var we = this.getCanvasPosition(me.x, me.y);
                      this.imageLayer.appendImage({
                        imgData: h,
                        left: we[0],
                        top: we[1],
                        width: B,
                        height: z
                      });
                    }
                    T.restore();
                  }
                  this.compose();
                }
              }
            }, {
              key: "paintSolidColorImageMask",
              value: function() {
                !this.contentVisible || (this.ctx.fillRect(0, 0, 1, 1), this.compose());
              }
            }, {
              key: "markPoint",
              value: function(h) {
              }
            }, {
              key: "markPointProps",
              value: function(h, d) {
              }
            }, {
              key: "beginMarkedContent",
              value: function(h) {
                this.markedContentStack.push({
                  visible: !0
                });
              }
            }, {
              key: "beginMarkedContentProps",
              value: function(h, d) {
                h === "OC" ? this.markedContentStack.push({
                  visible: this.optionalContentConfig.isVisible(d)
                }) : this.markedContentStack.push({
                  visible: !0
                }), this.contentVisible = this.isContentVisible();
              }
            }, {
              key: "endMarkedContent",
              value: function() {
                this.markedContentStack.pop(), this.contentVisible = this.isContentVisible();
              }
            }, {
              key: "beginCompat",
              value: function() {
              }
            }, {
              key: "endCompat",
              value: function() {
              }
            }, {
              key: "consumePath",
              value: function(h) {
                this.pendingClip && this.current.updateClipFromPath(), this.pendingClip || this.compose(h);
                var d = this.ctx;
                this.pendingClip && (this.pendingClip === de ? d.clip("evenodd") : d.clip(), this.pendingClip = null), this.current.startNewPathAndClipBox(this.current.clipBox), d.beginPath();
              }
            }, {
              key: "getSinglePixelWidth",
              value: function() {
                if (this._cachedGetSinglePixelWidth === null) {
                  var h = this.ctx.mozCurrentTransform, d = Math.abs(h[0] * h[3] - h[2] * h[1]), T = Math.pow(h[0], 2) + Math.pow(h[2], 2), B = Math.pow(h[1], 2) + Math.pow(h[3], 2), z = Math.sqrt(Math.max(T, B)) / d;
                  T !== B && this._combinedScaleFactor * z > 1 ? this._cachedGetSinglePixelWidth = -(this._combinedScaleFactor * z) : d > Number.EPSILON ? this._cachedGetSinglePixelWidth = z : this._cachedGetSinglePixelWidth = 1;
                }
                return this._cachedGetSinglePixelWidth;
              }
            }, {
              key: "getCanvasPosition",
              value: function(h, d) {
                var T = this.ctx.mozCurrentTransform;
                return [T[0] * h + T[2] * d + T[4], T[1] * h + T[3] * d + T[5]];
              }
            }, {
              key: "isContentVisible",
              value: function() {
                for (var h = this.markedContentStack.length - 1; h >= 0; h--)
                  if (!this.markedContentStack[h].visible)
                    return !1;
                return !0;
              }
            }]), j;
          }();
          r.CanvasGraphics = Se;
          for (var _e in t.OPS)
            Se.prototype[_e] !== void 0 && (Se.prototype[t.OPS[_e]] = Se.prototype[_e]);
        },
        (n, r, e) => {
          function t(W) {
            return typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? t = function(te) {
              return typeof te;
            } : t = function(te) {
              return te && typeof Symbol == "function" && te.constructor === Symbol && te !== Symbol.prototype ? "symbol" : typeof te;
            }, t(W);
          }
          Object.defineProperty(r, "__esModule", {
            value: !0
          }), r.TilingPattern = r.PathType = void 0, r.getShadingPattern = R;
          var a = e(4);
          function i(W, X) {
            var te = typeof Symbol < "u" && W[Symbol.iterator] || W["@@iterator"];
            if (!te) {
              if (Array.isArray(W) || (te = s(W)) || X && W && typeof W.length == "number") {
                te && (W = te);
                var K = 0, ae = function() {
                };
                return { s: ae, n: function() {
                  return K >= W.length ? { done: !0 } : { done: !1, value: W[K++] };
                }, e: function(P) {
                  throw P;
                }, f: ae };
              }
              throw new TypeError(`Invalid attempt to iterate non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
            }
            var V = !0, q = !1, w;
            return { s: function() {
              te = te.call(W);
            }, n: function() {
              var P = te.next();
              return V = P.done, P;
            }, e: function(P) {
              q = !0, w = P;
            }, f: function() {
              try {
                !V && te.return != null && te.return();
              } finally {
                if (q)
                  throw w;
              }
            } };
          }
          function s(W, X) {
            if (!!W) {
              if (typeof W == "string")
                return u(W, X);
              var te = Object.prototype.toString.call(W).slice(8, -1);
              if (te === "Object" && W.constructor && (te = W.constructor.name), te === "Map" || te === "Set")
                return Array.from(W);
              if (te === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(te))
                return u(W, X);
            }
          }
          function u(W, X) {
            (X == null || X > W.length) && (X = W.length);
            for (var te = 0, K = new Array(X); te < X; te++)
              K[te] = W[te];
            return K;
          }
          function c(W, X) {
            if (typeof X != "function" && X !== null)
              throw new TypeError("Super expression must either be null or a function");
            W.prototype = Object.create(X && X.prototype, { constructor: { value: W, writable: !0, configurable: !0 } }), X && g(W, X);
          }
          function g(W, X) {
            return g = Object.setPrototypeOf || function(K, ae) {
              return K.__proto__ = ae, K;
            }, g(W, X);
          }
          function b(W) {
            var X = C();
            return function() {
              var K = E(W), ae;
              if (X) {
                var V = E(this).constructor;
                ae = Reflect.construct(K, arguments, V);
              } else
                ae = K.apply(this, arguments);
              return A(this, ae);
            };
          }
          function A(W, X) {
            if (X && (t(X) === "object" || typeof X == "function"))
              return X;
            if (X !== void 0)
              throw new TypeError("Derived constructors may only return object or undefined");
            return I(W);
          }
          function I(W) {
            if (W === void 0)
              throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return W;
          }
          function C() {
            if (typeof Reflect > "u" || !Reflect.construct || Reflect.construct.sham)
              return !1;
            if (typeof Proxy == "function")
              return !0;
            try {
              return Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
              })), !0;
            } catch {
              return !1;
            }
          }
          function E(W) {
            return E = Object.setPrototypeOf ? Object.getPrototypeOf : function(te) {
              return te.__proto__ || Object.getPrototypeOf(te);
            }, E(W);
          }
          function O(W, X) {
            if (!(W instanceof X))
              throw new TypeError("Cannot call a class as a function");
          }
          function k(W, X) {
            for (var te = 0; te < X.length; te++) {
              var K = X[te];
              K.enumerable = K.enumerable || !1, K.configurable = !0, "value" in K && (K.writable = !0), Object.defineProperty(W, K.key, K);
            }
          }
          function N(W, X, te) {
            return X && k(W.prototype, X), te && k(W, te), W;
          }
          var x = {
            FILL: "Fill",
            STROKE: "Stroke",
            SHADING: "Shading"
          };
          r.PathType = x;
          function U(W, X) {
            if (!(!X || typeof Path2D > "u")) {
              var te = X[2] - X[0], K = X[3] - X[1], ae = new Path2D();
              ae.rect(X[0], X[1], te, K), W.clip(ae);
            }
          }
          var m = /* @__PURE__ */ function() {
            function W() {
              O(this, W), this.constructor === W && (0, a.unreachable)("Cannot initialize BaseShadingPattern.");
            }
            return N(W, [{
              key: "getPattern",
              value: function() {
                (0, a.unreachable)("Abstract method `getPattern` called.");
              }
            }]), W;
          }(), f = /* @__PURE__ */ function(W) {
            c(te, W);
            var X = b(te);
            function te(K) {
              var ae;
              return O(this, te), ae = X.call(this), ae._type = K[1], ae._bbox = K[2], ae._colorStops = K[3], ae._p0 = K[4], ae._p1 = K[5], ae._r0 = K[6], ae._r1 = K[7], ae.matrix = null, ae;
            }
            return N(te, [{
              key: "_createGradient",
              value: function(ae) {
                var V;
                this._type === "axial" ? V = ae.createLinearGradient(this._p0[0], this._p0[1], this._p1[0], this._p1[1]) : this._type === "radial" && (V = ae.createRadialGradient(this._p0[0], this._p0[1], this._r0, this._p1[0], this._p1[1], this._r1));
                var q = i(this._colorStops), w;
                try {
                  for (q.s(); !(w = q.n()).done; ) {
                    var p = w.value;
                    V.addColorStop(p[0], p[1]);
                  }
                } catch (P) {
                  q.e(P);
                } finally {
                  q.f();
                }
                return V;
              }
            }, {
              key: "getPattern",
              value: function(ae, V, q, w) {
                var p;
                if (w === x.STROKE || w === x.FILL) {
                  var P = V.current.getClippedPathBoundingBox(w, ae.mozCurrentTransform) || [0, 0, 0, 0], F = Math.ceil(P[2] - P[0]) || 1, G = Math.ceil(P[3] - P[1]) || 1, Z = V.cachedCanvases.getCanvas("pattern", F, G, !0), Y = Z.context;
                  Y.clearRect(0, 0, Y.canvas.width, Y.canvas.height), Y.beginPath(), Y.rect(0, 0, Y.canvas.width, Y.canvas.height), Y.translate(-P[0], -P[1]), q = a.Util.transform(q, [1, 0, 0, 1, P[0], P[1]]), Y.transform.apply(Y, V.baseTransform), this.matrix && Y.transform.apply(Y, this.matrix), U(Y, this._bbox), Y.fillStyle = this._createGradient(Y), Y.fill(), p = ae.createPattern(Z.canvas, "no-repeat");
                  var de = new DOMMatrix(q);
                  try {
                    p.setTransform(de);
                  } catch (Se) {
                    (0, a.warn)('RadialAxialShadingPattern.getPattern: "'.concat(Se == null ? void 0 : Se.message, '".'));
                  }
                } else
                  U(ae, this._bbox), p = this._createGradient(ae);
                return p;
              }
            }]), te;
          }(m);
          function v(W, X, te, K, ae, V, q, w) {
            var p = X.coords, P = X.colors, F = W.data, G = W.width * 4, Z;
            p[te + 1] > p[K + 1] && (Z = te, te = K, K = Z, Z = V, V = q, q = Z), p[K + 1] > p[ae + 1] && (Z = K, K = ae, ae = Z, Z = q, q = w, w = Z), p[te + 1] > p[K + 1] && (Z = te, te = K, K = Z, Z = V, V = q, q = Z);
            var Y = (p[te] + X.offsetX) * X.scaleX, de = (p[te + 1] + X.offsetY) * X.scaleY, Se = (p[K] + X.offsetX) * X.scaleX, _e = (p[K + 1] + X.offsetY) * X.scaleY, j = (p[ae] + X.offsetX) * X.scaleX, D = (p[ae + 1] + X.offsetY) * X.scaleY;
            if (!(de >= D))
              for (var h = P[V], d = P[V + 1], T = P[V + 2], B = P[q], z = P[q + 1], ee = P[q + 2], le = P[w], ve = P[w + 1], ye = P[w + 2], me = Math.round(de), we = Math.round(D), Pe, Ee, Fe, Ie, We, je, fe, he, H = me; H <= we; H++) {
                if (H < _e) {
                  var re = void 0;
                  H < de ? re = 0 : re = (de - H) / (de - _e), Pe = Y - (Y - Se) * re, Ee = h - (h - B) * re, Fe = d - (d - z) * re, Ie = T - (T - ee) * re;
                } else {
                  var Q = void 0;
                  H > D ? Q = 1 : _e === D ? Q = 0 : Q = (_e - H) / (_e - D), Pe = Se - (Se - j) * Q, Ee = B - (B - le) * Q, Fe = z - (z - ve) * Q, Ie = ee - (ee - ye) * Q;
                }
                var oe = void 0;
                H < de ? oe = 0 : H > D ? oe = 1 : oe = (de - H) / (de - D), We = Y - (Y - j) * oe, je = h - (h - le) * oe, fe = d - (d - ve) * oe, he = T - (T - ye) * oe;
                for (var ne = Math.round(Math.min(Pe, We)), J = Math.round(Math.max(Pe, We)), pe = G * H + ne * 4, ce = ne; ce <= J; ce++)
                  oe = (Pe - ce) / (Pe - We), oe < 0 ? oe = 0 : oe > 1 && (oe = 1), F[pe++] = Ee - (Ee - je) * oe | 0, F[pe++] = Fe - (Fe - fe) * oe | 0, F[pe++] = Ie - (Ie - he) * oe | 0, F[pe++] = 255;
              }
          }
          function _(W, X, te) {
            var K = X.coords, ae = X.colors, V, q;
            switch (X.type) {
              case "lattice":
                var w = X.verticesPerRow, p = Math.floor(K.length / w) - 1, P = w - 1;
                for (V = 0; V < p; V++)
                  for (var F = V * w, G = 0; G < P; G++, F++)
                    v(W, te, K[F], K[F + 1], K[F + w], ae[F], ae[F + 1], ae[F + w]), v(W, te, K[F + w + 1], K[F + 1], K[F + w], ae[F + w + 1], ae[F + 1], ae[F + w]);
                break;
              case "triangles":
                for (V = 0, q = K.length; V < q; V += 3)
                  v(W, te, K[V], K[V + 1], K[V + 2], ae[V], ae[V + 1], ae[V + 2]);
                break;
              default:
                throw new Error("illegal figure");
            }
          }
          var S = /* @__PURE__ */ function(W) {
            c(te, W);
            var X = b(te);
            function te(K) {
              var ae;
              return O(this, te), ae = X.call(this), ae._coords = K[2], ae._colors = K[3], ae._figures = K[4], ae._bounds = K[5], ae._bbox = K[7], ae._background = K[8], ae.matrix = null, ae;
            }
            return N(te, [{
              key: "_createMeshCanvas",
              value: function(ae, V, q) {
                var w = 1.1, p = 3e3, P = 2, F = Math.floor(this._bounds[0]), G = Math.floor(this._bounds[1]), Z = Math.ceil(this._bounds[2]) - F, Y = Math.ceil(this._bounds[3]) - G, de = Math.min(Math.ceil(Math.abs(Z * ae[0] * w)), p), Se = Math.min(Math.ceil(Math.abs(Y * ae[1] * w)), p), _e = Z / de, j = Y / Se, D = {
                  coords: this._coords,
                  colors: this._colors,
                  offsetX: -F,
                  offsetY: -G,
                  scaleX: 1 / _e,
                  scaleY: 1 / j
                }, h = de + P * 2, d = Se + P * 2, T = q.getCanvas("mesh", h, d, !1), B = T.context, z = B.createImageData(de, Se);
                if (V)
                  for (var ee = z.data, le = 0, ve = ee.length; le < ve; le += 4)
                    ee[le] = V[0], ee[le + 1] = V[1], ee[le + 2] = V[2], ee[le + 3] = 255;
                var ye = i(this._figures), me;
                try {
                  for (ye.s(); !(me = ye.n()).done; ) {
                    var we = me.value;
                    _(z, we, D);
                  }
                } catch (Ee) {
                  ye.e(Ee);
                } finally {
                  ye.f();
                }
                B.putImageData(z, P, P);
                var Pe = T.canvas;
                return {
                  canvas: Pe,
                  offsetX: F - P * _e,
                  offsetY: G - P * j,
                  scaleX: _e,
                  scaleY: j
                };
              }
            }, {
              key: "getPattern",
              value: function(ae, V, q, w) {
                U(ae, this._bbox);
                var p;
                if (w === x.SHADING)
                  p = a.Util.singularValueDecompose2dScale(ae.mozCurrentTransform);
                else if (p = a.Util.singularValueDecompose2dScale(V.baseTransform), this.matrix) {
                  var P = a.Util.singularValueDecompose2dScale(this.matrix);
                  p = [p[0] * P[0], p[1] * P[1]];
                }
                var F = this._createMeshCanvas(p, w === x.SHADING ? null : this._background, V.cachedCanvases);
                return w !== x.SHADING && (ae.setTransform.apply(ae, V.baseTransform), this.matrix && ae.transform.apply(ae, this.matrix)), ae.translate(F.offsetX, F.offsetY), ae.scale(F.scaleX, F.scaleY), ae.createPattern(F.canvas, "no-repeat");
              }
            }]), te;
          }(m), y = /* @__PURE__ */ function(W) {
            c(te, W);
            var X = b(te);
            function te() {
              return O(this, te), X.apply(this, arguments);
            }
            return N(te, [{
              key: "getPattern",
              value: function() {
                return "hotpink";
              }
            }]), te;
          }(m);
          function R(W) {
            switch (W[0]) {
              case "RadialAxial":
                return new f(W);
              case "Mesh":
                return new S(W);
              case "Dummy":
                return new y();
            }
            throw new Error("Unknown IR type: ".concat(W[0]));
          }
          var L = {
            COLORED: 1,
            UNCOLORED: 2
          }, $ = /* @__PURE__ */ function() {
            function W(X, te, K, ae, V) {
              O(this, W), this.operatorList = X[2], this.matrix = X[3] || [1, 0, 0, 1, 0, 0], this.bbox = X[4], this.xstep = X[5], this.ystep = X[6], this.paintType = X[7], this.tilingType = X[8], this.color = te, this.ctx = K, this.canvasGraphicsFactory = ae, this.baseTransform = V;
            }
            return N(W, [{
              key: "createPatternCanvas",
              value: function(te) {
                var K = this.operatorList, ae = this.bbox, V = this.xstep, q = this.ystep, w = this.paintType, p = this.tilingType, P = this.color, F = this.canvasGraphicsFactory;
                (0, a.info)("TilingType: " + p);
                var G = ae[0], Z = ae[1], Y = ae[2], de = ae[3], Se = a.Util.singularValueDecompose2dScale(this.matrix), _e = a.Util.singularValueDecompose2dScale(this.baseTransform), j = [Se[0] * _e[0], Se[1] * _e[1]], D = this.getSizeAndScale(V, this.ctx.canvas.width, j[0]), h = this.getSizeAndScale(q, this.ctx.canvas.height, j[1]), d = te.cachedCanvases.getCanvas("pattern", D.size, h.size, !0), T = d.context, B = F.createCanvasGraphics(T);
                B.groupLevel = te.groupLevel, this.setFillAndStrokeStyleToContext(B, w, P);
                var z = G, ee = Z, le = Y, ve = de;
                return G < 0 && (z = 0, le += Math.abs(G)), Z < 0 && (ee = 0, ve += Math.abs(Z)), T.translate(-(D.scale * z), -(h.scale * ee)), B.transform(D.scale, 0, 0, h.scale, 0, 0), this.clipBbox(B, z, ee, le, ve), B.baseTransform = B.ctx.mozCurrentTransform.slice(), B.executeOperatorList(K), B.endDrawing(), {
                  canvas: d.canvas,
                  scaleX: D.scale,
                  scaleY: h.scale,
                  offsetX: z,
                  offsetY: ee
                };
              }
            }, {
              key: "getSizeAndScale",
              value: function(te, K, ae) {
                te = Math.abs(te);
                var V = Math.max(W.MAX_PATTERN_SIZE, K), q = Math.ceil(te * ae);
                return q >= V ? q = V : ae = q / te, {
                  scale: ae,
                  size: q
                };
              }
            }, {
              key: "clipBbox",
              value: function(te, K, ae, V, q) {
                var w = V - K, p = q - ae;
                te.ctx.rect(K, ae, w, p), te.clip(), te.endPath();
              }
            }, {
              key: "setFillAndStrokeStyleToContext",
              value: function(te, K, ae) {
                var V = te.ctx, q = te.current;
                switch (K) {
                  case L.COLORED:
                    var w = this.ctx;
                    V.fillStyle = w.fillStyle, V.strokeStyle = w.strokeStyle, q.fillColor = w.fillStyle, q.strokeColor = w.strokeStyle;
                    break;
                  case L.UNCOLORED:
                    var p = a.Util.makeHexColor(ae[0], ae[1], ae[2]);
                    V.fillStyle = p, V.strokeStyle = p, q.fillColor = p, q.strokeColor = p;
                    break;
                  default:
                    throw new a.FormatError("Unsupported paint type: ".concat(K));
                }
              }
            }, {
              key: "getPattern",
              value: function(te, K, ae, V) {
                var q = ae;
                V !== x.SHADING && (q = a.Util.transform(q, K.baseTransform), this.matrix && (q = a.Util.transform(q, this.matrix)));
                var w = this.createPatternCanvas(K), p = new DOMMatrix(q);
                p = p.translate(w.offsetX, w.offsetY), p = p.scale(1 / w.scaleX, 1 / w.scaleY);
                var P = te.createPattern(w.canvas, "repeat");
                try {
                  P.setTransform(p);
                } catch (F) {
                  (0, a.warn)('TilingPattern.getPattern: "'.concat(F == null ? void 0 : F.message, '".'));
                }
                return P;
              }
            }], [{
              key: "MAX_PATTERN_SIZE",
              get: function() {
                return (0, a.shadow)(this, "MAX_PATTERN_SIZE", 3e3);
              }
            }]), W;
          }();
          r.TilingPattern = $;
        },
        (n, r) => {
          Object.defineProperty(r, "__esModule", {
            value: !0
          }), r.GlobalWorkerOptions = void 0;
          var e = /* @__PURE__ */ Object.create(null);
          r.GlobalWorkerOptions = e, e.workerPort = e.workerPort === void 0 ? null : e.workerPort, e.workerSrc = e.workerSrc === void 0 ? "" : e.workerSrc;
        },
        (n, r, e) => {
          Object.defineProperty(r, "__esModule", {
            value: !0
          }), r.MessageHandler = void 0;
          var t = i(e(2)), a = e(4);
          function i(k) {
            return k && k.__esModule ? k : { default: k };
          }
          function s(k, N, x, U, m, f, v) {
            try {
              var _ = k[f](v), S = _.value;
            } catch (y) {
              x(y);
              return;
            }
            _.done ? N(S) : Promise.resolve(S).then(U, m);
          }
          function u(k) {
            return function() {
              var N = this, x = arguments;
              return new Promise(function(U, m) {
                var f = k.apply(N, x);
                function v(S) {
                  s(f, U, m, v, _, "next", S);
                }
                function _(S) {
                  s(f, U, m, v, _, "throw", S);
                }
                v(void 0);
              });
            };
          }
          function c(k, N) {
            if (!(k instanceof N))
              throw new TypeError("Cannot call a class as a function");
          }
          function g(k, N) {
            for (var x = 0; x < N.length; x++) {
              var U = N[x];
              U.enumerable = U.enumerable || !1, U.configurable = !0, "value" in U && (U.writable = !0), Object.defineProperty(k, U.key, U);
            }
          }
          function b(k, N, x) {
            return N && g(k.prototype, N), x && g(k, x), k;
          }
          function A(k) {
            return typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? A = function(x) {
              return typeof x;
            } : A = function(x) {
              return x && typeof Symbol == "function" && x.constructor === Symbol && x !== Symbol.prototype ? "symbol" : typeof x;
            }, A(k);
          }
          var I = {
            UNKNOWN: 0,
            DATA: 1,
            ERROR: 2
          }, C = {
            UNKNOWN: 0,
            CANCEL: 1,
            CANCEL_COMPLETE: 2,
            CLOSE: 3,
            ENQUEUE: 4,
            ERROR: 5,
            PULL: 6,
            PULL_COMPLETE: 7,
            START_COMPLETE: 8
          };
          function E(k) {
            if (!(k instanceof Error || A(k) === "object" && k !== null))
              return (0, a.warn)('wrapReason: Expected "reason" to be a (possibly cloned) Error.'), k;
            switch (k.name) {
              case "AbortException":
                return new a.AbortException(k.message);
              case "MissingPDFException":
                return new a.MissingPDFException(k.message);
              case "PasswordException":
                return new a.PasswordException(k.message, k.code);
              case "UnexpectedResponseException":
                return new a.UnexpectedResponseException(k.message, k.status);
              case "UnknownErrorException":
                return new a.UnknownErrorException(k.message, k.details);
              default:
                return new a.UnknownErrorException(k.message, k.toString());
            }
          }
          var O = /* @__PURE__ */ function() {
            function k(N, x, U) {
              var m = this;
              c(this, k), this.sourceName = N, this.targetName = x, this.comObj = U, this.callbackId = 1, this.streamId = 1, this.streamSinks = /* @__PURE__ */ Object.create(null), this.streamControllers = /* @__PURE__ */ Object.create(null), this.callbackCapabilities = /* @__PURE__ */ Object.create(null), this.actionHandler = /* @__PURE__ */ Object.create(null), this._onComObjOnMessage = function(f) {
                var v = f.data;
                if (v.targetName === m.sourceName) {
                  if (v.stream) {
                    m._processStreamMessage(v);
                    return;
                  }
                  if (v.callback) {
                    var _ = v.callbackId, S = m.callbackCapabilities[_];
                    if (!S)
                      throw new Error("Cannot resolve callback ".concat(_));
                    if (delete m.callbackCapabilities[_], v.callback === I.DATA)
                      S.resolve(v.data);
                    else if (v.callback === I.ERROR)
                      S.reject(E(v.reason));
                    else
                      throw new Error("Unexpected callback case");
                    return;
                  }
                  var y = m.actionHandler[v.action];
                  if (!y)
                    throw new Error("Unknown action from worker: ".concat(v.action));
                  if (v.callbackId) {
                    var R = m.sourceName, L = v.sourceName;
                    new Promise(function($) {
                      $(y(v.data));
                    }).then(function($) {
                      U.postMessage({
                        sourceName: R,
                        targetName: L,
                        callback: I.DATA,
                        callbackId: v.callbackId,
                        data: $
                      });
                    }, function($) {
                      U.postMessage({
                        sourceName: R,
                        targetName: L,
                        callback: I.ERROR,
                        callbackId: v.callbackId,
                        reason: E($)
                      });
                    });
                    return;
                  }
                  if (v.streamId) {
                    m._createStreamSink(v);
                    return;
                  }
                  y(v.data);
                }
              }, U.addEventListener("message", this._onComObjOnMessage);
            }
            return b(k, [{
              key: "on",
              value: function(x, U) {
                var m = this.actionHandler;
                if (m[x])
                  throw new Error('There is already an actionName called "'.concat(x, '"'));
                m[x] = U;
              }
            }, {
              key: "send",
              value: function(x, U, m) {
                this.comObj.postMessage({
                  sourceName: this.sourceName,
                  targetName: this.targetName,
                  action: x,
                  data: U
                }, m);
              }
            }, {
              key: "sendWithPromise",
              value: function(x, U, m) {
                var f = this.callbackId++, v = (0, a.createPromiseCapability)();
                this.callbackCapabilities[f] = v;
                try {
                  this.comObj.postMessage({
                    sourceName: this.sourceName,
                    targetName: this.targetName,
                    action: x,
                    callbackId: f,
                    data: U
                  }, m);
                } catch (_) {
                  v.reject(_);
                }
                return v.promise;
              }
            }, {
              key: "sendWithStream",
              value: function(x, U, m, f) {
                var v = this, _ = this.streamId++, S = this.sourceName, y = this.targetName, R = this.comObj;
                return new ReadableStream({
                  start: function($) {
                    var W = (0, a.createPromiseCapability)();
                    return v.streamControllers[_] = {
                      controller: $,
                      startCall: W,
                      pullCall: null,
                      cancelCall: null,
                      isClosed: !1
                    }, R.postMessage({
                      sourceName: S,
                      targetName: y,
                      action: x,
                      streamId: _,
                      data: U,
                      desiredSize: $.desiredSize
                    }, f), W.promise;
                  },
                  pull: function($) {
                    var W = (0, a.createPromiseCapability)();
                    return v.streamControllers[_].pullCall = W, R.postMessage({
                      sourceName: S,
                      targetName: y,
                      stream: C.PULL,
                      streamId: _,
                      desiredSize: $.desiredSize
                    }), W.promise;
                  },
                  cancel: function($) {
                    (0, a.assert)($ instanceof Error, "cancel must have a valid reason");
                    var W = (0, a.createPromiseCapability)();
                    return v.streamControllers[_].cancelCall = W, v.streamControllers[_].isClosed = !0, R.postMessage({
                      sourceName: S,
                      targetName: y,
                      stream: C.CANCEL,
                      streamId: _,
                      reason: E($)
                    }), W.promise;
                  }
                }, m);
              }
            }, {
              key: "_createStreamSink",
              value: function(x) {
                var U = x.streamId, m = this.sourceName, f = x.sourceName, v = this.comObj, _ = this, S = this.actionHandler[x.action], y = {
                  enqueue: function(L) {
                    var $ = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 1, W = arguments.length > 2 ? arguments[2] : void 0;
                    if (!this.isCancelled) {
                      var X = this.desiredSize;
                      this.desiredSize -= $, X > 0 && this.desiredSize <= 0 && (this.sinkCapability = (0, a.createPromiseCapability)(), this.ready = this.sinkCapability.promise), v.postMessage({
                        sourceName: m,
                        targetName: f,
                        stream: C.ENQUEUE,
                        streamId: U,
                        chunk: L
                      }, W);
                    }
                  },
                  close: function() {
                    this.isCancelled || (this.isCancelled = !0, v.postMessage({
                      sourceName: m,
                      targetName: f,
                      stream: C.CLOSE,
                      streamId: U
                    }), delete _.streamSinks[U]);
                  },
                  error: function(L) {
                    (0, a.assert)(L instanceof Error, "error must have a valid reason"), !this.isCancelled && (this.isCancelled = !0, v.postMessage({
                      sourceName: m,
                      targetName: f,
                      stream: C.ERROR,
                      streamId: U,
                      reason: E(L)
                    }));
                  },
                  sinkCapability: (0, a.createPromiseCapability)(),
                  onPull: null,
                  onCancel: null,
                  isCancelled: !1,
                  desiredSize: x.desiredSize,
                  ready: null
                };
                y.sinkCapability.resolve(), y.ready = y.sinkCapability.promise, this.streamSinks[U] = y, new Promise(function(R) {
                  R(S(x.data, y));
                }).then(function() {
                  v.postMessage({
                    sourceName: m,
                    targetName: f,
                    stream: C.START_COMPLETE,
                    streamId: U,
                    success: !0
                  });
                }, function(R) {
                  v.postMessage({
                    sourceName: m,
                    targetName: f,
                    stream: C.START_COMPLETE,
                    streamId: U,
                    reason: E(R)
                  });
                });
              }
            }, {
              key: "_processStreamMessage",
              value: function(x) {
                var U = x.streamId, m = this.sourceName, f = x.sourceName, v = this.comObj, _ = this.streamControllers[U], S = this.streamSinks[U];
                switch (x.stream) {
                  case C.START_COMPLETE:
                    x.success ? _.startCall.resolve() : _.startCall.reject(E(x.reason));
                    break;
                  case C.PULL_COMPLETE:
                    x.success ? _.pullCall.resolve() : _.pullCall.reject(E(x.reason));
                    break;
                  case C.PULL:
                    if (!S) {
                      v.postMessage({
                        sourceName: m,
                        targetName: f,
                        stream: C.PULL_COMPLETE,
                        streamId: U,
                        success: !0
                      });
                      break;
                    }
                    S.desiredSize <= 0 && x.desiredSize > 0 && S.sinkCapability.resolve(), S.desiredSize = x.desiredSize, new Promise(function(y) {
                      y(S.onPull && S.onPull());
                    }).then(function() {
                      v.postMessage({
                        sourceName: m,
                        targetName: f,
                        stream: C.PULL_COMPLETE,
                        streamId: U,
                        success: !0
                      });
                    }, function(y) {
                      v.postMessage({
                        sourceName: m,
                        targetName: f,
                        stream: C.PULL_COMPLETE,
                        streamId: U,
                        reason: E(y)
                      });
                    });
                    break;
                  case C.ENQUEUE:
                    if ((0, a.assert)(_, "enqueue should have stream controller"), _.isClosed)
                      break;
                    _.controller.enqueue(x.chunk);
                    break;
                  case C.CLOSE:
                    if ((0, a.assert)(_, "close should have stream controller"), _.isClosed)
                      break;
                    _.isClosed = !0, _.controller.close(), this._deleteStreamController(_, U);
                    break;
                  case C.ERROR:
                    (0, a.assert)(_, "error should have stream controller"), _.controller.error(E(x.reason)), this._deleteStreamController(_, U);
                    break;
                  case C.CANCEL_COMPLETE:
                    x.success ? _.cancelCall.resolve() : _.cancelCall.reject(E(x.reason)), this._deleteStreamController(_, U);
                    break;
                  case C.CANCEL:
                    if (!S)
                      break;
                    new Promise(function(y) {
                      y(S.onCancel && S.onCancel(E(x.reason)));
                    }).then(function() {
                      v.postMessage({
                        sourceName: m,
                        targetName: f,
                        stream: C.CANCEL_COMPLETE,
                        streamId: U,
                        success: !0
                      });
                    }, function(y) {
                      v.postMessage({
                        sourceName: m,
                        targetName: f,
                        stream: C.CANCEL_COMPLETE,
                        streamId: U,
                        reason: E(y)
                      });
                    }), S.sinkCapability.reject(E(x.reason)), S.isCancelled = !0, delete this.streamSinks[U];
                    break;
                  default:
                    throw new Error("Unexpected stream case");
                }
              }
            }, {
              key: "_deleteStreamController",
              value: function() {
                var N = u(/* @__PURE__ */ t.default.mark(function U(m, f) {
                  return t.default.wrap(function(_) {
                    for (; ; )
                      switch (_.prev = _.next) {
                        case 0:
                          return _.next = 2, Promise.allSettled([m.startCall && m.startCall.promise, m.pullCall && m.pullCall.promise, m.cancelCall && m.cancelCall.promise]);
                        case 2:
                          delete this.streamControllers[f];
                        case 3:
                        case "end":
                          return _.stop();
                      }
                  }, U, this);
                }));
                function x(U, m) {
                  return N.apply(this, arguments);
                }
                return x;
              }()
            }, {
              key: "destroy",
              value: function() {
                this.comObj.removeEventListener("message", this._onComObjOnMessage);
              }
            }]), k;
          }();
          r.MessageHandler = O;
        },
        (n, r, e) => {
          Object.defineProperty(r, "__esModule", {
            value: !0
          }), r.Metadata = void 0;
          var t = e(4);
          function a(N, x) {
            if (!(N instanceof x))
              throw new TypeError("Cannot call a class as a function");
          }
          function i(N, x) {
            for (var U = 0; U < x.length; U++) {
              var m = x[U];
              m.enumerable = m.enumerable || !1, m.configurable = !0, "value" in m && (m.writable = !0), Object.defineProperty(N, m.key, m);
            }
          }
          function s(N, x, U) {
            return x && i(N.prototype, x), U && i(N, U), N;
          }
          function u(N, x, U) {
            c(N, x), x.set(N, U);
          }
          function c(N, x) {
            if (x.has(N))
              throw new TypeError("Cannot initialize the same private elements twice on an object");
          }
          function g(N, x) {
            var U = I(N, x, "get");
            return b(N, U);
          }
          function b(N, x) {
            return x.get ? x.get.call(N) : x.value;
          }
          function A(N, x, U) {
            var m = I(N, x, "set");
            return C(N, m, U), U;
          }
          function I(N, x, U) {
            if (!x.has(N))
              throw new TypeError("attempted to " + U + " private field on non-instance");
            return x.get(N);
          }
          function C(N, x, U) {
            if (x.set)
              x.set.call(N, U);
            else {
              if (!x.writable)
                throw new TypeError("attempted to set read only private field");
              x.value = U;
            }
          }
          var E = /* @__PURE__ */ new WeakMap(), O = /* @__PURE__ */ new WeakMap(), k = /* @__PURE__ */ function() {
            function N(x) {
              var U = x.parsedData, m = x.rawData;
              a(this, N), u(this, E, {
                writable: !0,
                value: void 0
              }), u(this, O, {
                writable: !0,
                value: void 0
              }), A(this, E, U), A(this, O, m);
            }
            return s(N, [{
              key: "getRaw",
              value: function() {
                return g(this, O);
              }
            }, {
              key: "get",
              value: function(U) {
                var m;
                return (m = g(this, E).get(U)) !== null && m !== void 0 ? m : null;
              }
            }, {
              key: "getAll",
              value: function() {
                return (0, t.objectFromMap)(g(this, E));
              }
            }, {
              key: "has",
              value: function(U) {
                return g(this, E).has(U);
              }
            }]), N;
          }();
          r.Metadata = k;
        },
        (n, r, e) => {
          Object.defineProperty(r, "__esModule", {
            value: !0
          }), r.OptionalContentConfig = void 0;
          var t = e(4);
          function a(I, C) {
            var E = typeof Symbol < "u" && I[Symbol.iterator] || I["@@iterator"];
            if (!E) {
              if (Array.isArray(I) || (E = i(I)) || C && I && typeof I.length == "number") {
                E && (I = E);
                var O = 0, k = function() {
                };
                return { s: k, n: function() {
                  return O >= I.length ? { done: !0 } : { done: !1, value: I[O++] };
                }, e: function(f) {
                  throw f;
                }, f: k };
              }
              throw new TypeError(`Invalid attempt to iterate non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
            }
            var N = !0, x = !1, U;
            return { s: function() {
              E = E.call(I);
            }, n: function() {
              var f = E.next();
              return N = f.done, f;
            }, e: function(f) {
              x = !0, U = f;
            }, f: function() {
              try {
                !N && E.return != null && E.return();
              } finally {
                if (x)
                  throw U;
              }
            } };
          }
          function i(I, C) {
            if (!!I) {
              if (typeof I == "string")
                return s(I, C);
              var E = Object.prototype.toString.call(I).slice(8, -1);
              if (E === "Object" && I.constructor && (E = I.constructor.name), E === "Map" || E === "Set")
                return Array.from(I);
              if (E === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(E))
                return s(I, C);
            }
          }
          function s(I, C) {
            (C == null || C > I.length) && (C = I.length);
            for (var E = 0, O = new Array(C); E < C; E++)
              O[E] = I[E];
            return O;
          }
          function u(I, C) {
            for (var E = 0; E < C.length; E++) {
              var O = C[E];
              O.enumerable = O.enumerable || !1, O.configurable = !0, "value" in O && (O.writable = !0), Object.defineProperty(I, O.key, O);
            }
          }
          function c(I, C, E) {
            return C && u(I.prototype, C), E && u(I, E), I;
          }
          function g(I, C) {
            if (!(I instanceof C))
              throw new TypeError("Cannot call a class as a function");
          }
          var b = function I(C, E) {
            g(this, I), this.visible = !0, this.name = C, this.intent = E;
          }, A = /* @__PURE__ */ function() {
            function I(C) {
              if (g(this, I), this.name = null, this.creator = null, this._order = null, this._groups = /* @__PURE__ */ new Map(), C !== null) {
                this.name = C.name, this.creator = C.creator, this._order = C.order;
                var E = a(C.groups), O;
                try {
                  for (E.s(); !(O = E.n()).done; ) {
                    var k = O.value;
                    this._groups.set(k.id, new b(k.name, k.intent));
                  }
                } catch (R) {
                  E.e(R);
                } finally {
                  E.f();
                }
                if (C.baseState === "OFF") {
                  var N = a(this._groups), x;
                  try {
                    for (N.s(); !(x = N.n()).done; ) {
                      var U = x.value;
                      U.visible = !1;
                    }
                  } catch (R) {
                    N.e(R);
                  } finally {
                    N.f();
                  }
                }
                var m = a(C.on), f;
                try {
                  for (m.s(); !(f = m.n()).done; ) {
                    var v = f.value;
                    this._groups.get(v).visible = !0;
                  }
                } catch (R) {
                  m.e(R);
                } finally {
                  m.f();
                }
                var _ = a(C.off), S;
                try {
                  for (_.s(); !(S = _.n()).done; ) {
                    var y = S.value;
                    this._groups.get(y).visible = !1;
                  }
                } catch (R) {
                  _.e(R);
                } finally {
                  _.f();
                }
              }
            }
            return c(I, [{
              key: "_evaluateVisibilityExpression",
              value: function(E) {
                var O = E.length;
                if (O < 2)
                  return !0;
                for (var k = E[0], N = 1; N < O; N++) {
                  var x = E[N], U = void 0;
                  if (Array.isArray(x))
                    U = this._evaluateVisibilityExpression(x);
                  else if (this._groups.has(x))
                    U = this._groups.get(x).visible;
                  else
                    return (0, t.warn)("Optional content group not found: ".concat(x)), !0;
                  switch (k) {
                    case "And":
                      if (!U)
                        return !1;
                      break;
                    case "Or":
                      if (U)
                        return !0;
                      break;
                    case "Not":
                      return !U;
                    default:
                      return !0;
                  }
                }
                return k === "And";
              }
            }, {
              key: "isVisible",
              value: function(E) {
                if (this._groups.size === 0)
                  return !0;
                if (!E)
                  return (0, t.warn)("Optional content group not defined."), !0;
                if (E.type === "OCG")
                  return this._groups.has(E.id) ? this._groups.get(E.id).visible : ((0, t.warn)("Optional content group not found: ".concat(E.id)), !0);
                if (E.type === "OCMD") {
                  if (E.expression)
                    return this._evaluateVisibilityExpression(E.expression);
                  if (!E.policy || E.policy === "AnyOn") {
                    var O = a(E.ids), k;
                    try {
                      for (O.s(); !(k = O.n()).done; ) {
                        var N = k.value;
                        if (!this._groups.has(N))
                          return (0, t.warn)("Optional content group not found: ".concat(N)), !0;
                        if (this._groups.get(N).visible)
                          return !0;
                      }
                    } catch (L) {
                      O.e(L);
                    } finally {
                      O.f();
                    }
                    return !1;
                  } else if (E.policy === "AllOn") {
                    var x = a(E.ids), U;
                    try {
                      for (x.s(); !(U = x.n()).done; ) {
                        var m = U.value;
                        if (!this._groups.has(m))
                          return (0, t.warn)("Optional content group not found: ".concat(m)), !0;
                        if (!this._groups.get(m).visible)
                          return !1;
                      }
                    } catch (L) {
                      x.e(L);
                    } finally {
                      x.f();
                    }
                    return !0;
                  } else if (E.policy === "AnyOff") {
                    var f = a(E.ids), v;
                    try {
                      for (f.s(); !(v = f.n()).done; ) {
                        var _ = v.value;
                        if (!this._groups.has(_))
                          return (0, t.warn)("Optional content group not found: ".concat(_)), !0;
                        if (!this._groups.get(_).visible)
                          return !0;
                      }
                    } catch (L) {
                      f.e(L);
                    } finally {
                      f.f();
                    }
                    return !1;
                  } else if (E.policy === "AllOff") {
                    var S = a(E.ids), y;
                    try {
                      for (S.s(); !(y = S.n()).done; ) {
                        var R = y.value;
                        if (!this._groups.has(R))
                          return (0, t.warn)("Optional content group not found: ".concat(R)), !0;
                        if (this._groups.get(R).visible)
                          return !1;
                      }
                    } catch (L) {
                      S.e(L);
                    } finally {
                      S.f();
                    }
                    return !0;
                  }
                  return (0, t.warn)("Unknown optional content policy ".concat(E.policy, ".")), !0;
                }
                return (0, t.warn)("Unknown group type ".concat(E.type, ".")), !0;
              }
            }, {
              key: "setVisibility",
              value: function(E) {
                var O = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !0;
                if (!this._groups.has(E)) {
                  (0, t.warn)("Optional content group not found: ".concat(E));
                  return;
                }
                this._groups.get(E).visible = !!O;
              }
            }, {
              key: "getOrder",
              value: function() {
                return this._groups.size ? this._order ? this._order.slice() : Array.from(this._groups.keys()) : null;
              }
            }, {
              key: "getGroups",
              value: function() {
                return this._groups.size > 0 ? (0, t.objectFromMap)(this._groups) : null;
              }
            }, {
              key: "getGroup",
              value: function(E) {
                return this._groups.get(E) || null;
              }
            }]), I;
          }();
          r.OptionalContentConfig = A;
        },
        (n, r, e) => {
          Object.defineProperty(r, "__esModule", {
            value: !0
          }), r.PDFDataTransportStream = void 0;
          var t = s(e(2)), a = e(4), i = e(1);
          function s(x) {
            return x && x.__esModule ? x : { default: x };
          }
          function u(x, U, m, f, v, _, S) {
            try {
              var y = x[_](S), R = y.value;
            } catch (L) {
              m(L);
              return;
            }
            y.done ? U(R) : Promise.resolve(R).then(f, v);
          }
          function c(x) {
            return function() {
              var U = this, m = arguments;
              return new Promise(function(f, v) {
                var _ = x.apply(U, m);
                function S(R) {
                  u(_, f, v, S, y, "next", R);
                }
                function y(R) {
                  u(_, f, v, S, y, "throw", R);
                }
                S(void 0);
              });
            };
          }
          function g(x, U) {
            var m = typeof Symbol < "u" && x[Symbol.iterator] || x["@@iterator"];
            if (!m) {
              if (Array.isArray(x) || (m = b(x)) || U && x && typeof x.length == "number") {
                m && (x = m);
                var f = 0, v = function() {
                };
                return { s: v, n: function() {
                  return f >= x.length ? { done: !0 } : { done: !1, value: x[f++] };
                }, e: function(L) {
                  throw L;
                }, f: v };
              }
              throw new TypeError(`Invalid attempt to iterate non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
            }
            var _ = !0, S = !1, y;
            return { s: function() {
              m = m.call(x);
            }, n: function() {
              var L = m.next();
              return _ = L.done, L;
            }, e: function(L) {
              S = !0, y = L;
            }, f: function() {
              try {
                !_ && m.return != null && m.return();
              } finally {
                if (S)
                  throw y;
              }
            } };
          }
          function b(x, U) {
            if (!!x) {
              if (typeof x == "string")
                return A(x, U);
              var m = Object.prototype.toString.call(x).slice(8, -1);
              if (m === "Object" && x.constructor && (m = x.constructor.name), m === "Map" || m === "Set")
                return Array.from(x);
              if (m === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(m))
                return A(x, U);
            }
          }
          function A(x, U) {
            (U == null || U > x.length) && (U = x.length);
            for (var m = 0, f = new Array(U); m < U; m++)
              f[m] = x[m];
            return f;
          }
          function I(x, U) {
            if (!(x instanceof U))
              throw new TypeError("Cannot call a class as a function");
          }
          function C(x, U) {
            for (var m = 0; m < U.length; m++) {
              var f = U[m];
              f.enumerable = f.enumerable || !1, f.configurable = !0, "value" in f && (f.writable = !0), Object.defineProperty(x, f.key, f);
            }
          }
          function E(x, U, m) {
            return U && C(x.prototype, U), m && C(x, m), x;
          }
          var O = /* @__PURE__ */ function() {
            function x(U, m) {
              var f = this;
              I(this, x), (0, a.assert)(m, 'PDFDataTransportStream - missing required "pdfDataRangeTransport" argument.'), this._queuedChunks = [], this._progressiveDone = U.progressiveDone || !1, this._contentDispositionFilename = U.contentDispositionFilename || null;
              var v = U.initialData;
              if ((v == null ? void 0 : v.length) > 0) {
                var _ = new Uint8Array(v).buffer;
                this._queuedChunks.push(_);
              }
              this._pdfDataRangeTransport = m, this._isStreamingSupported = !U.disableStream, this._isRangeSupported = !U.disableRange, this._contentLength = U.length, this._fullRequestReader = null, this._rangeReaders = [], this._pdfDataRangeTransport.addRangeListener(function(S, y) {
                f._onReceiveData({
                  begin: S,
                  chunk: y
                });
              }), this._pdfDataRangeTransport.addProgressListener(function(S, y) {
                f._onProgress({
                  loaded: S,
                  total: y
                });
              }), this._pdfDataRangeTransport.addProgressiveReadListener(function(S) {
                f._onReceiveData({
                  chunk: S
                });
              }), this._pdfDataRangeTransport.addProgressiveDoneListener(function() {
                f._onProgressiveDone();
              }), this._pdfDataRangeTransport.transportReady();
            }
            return E(x, [{
              key: "_onReceiveData",
              value: function(m) {
                var f = new Uint8Array(m.chunk).buffer;
                if (m.begin === void 0)
                  this._fullRequestReader ? this._fullRequestReader._enqueue(f) : this._queuedChunks.push(f);
                else {
                  var v = this._rangeReaders.some(function(_) {
                    return _._begin !== m.begin ? !1 : (_._enqueue(f), !0);
                  });
                  (0, a.assert)(v, "_onReceiveData - no `PDFDataTransportStreamRangeReader` instance found.");
                }
              }
            }, {
              key: "_progressiveDataLength",
              get: function() {
                var m, f;
                return (m = (f = this._fullRequestReader) === null || f === void 0 ? void 0 : f._loaded) !== null && m !== void 0 ? m : 0;
              }
            }, {
              key: "_onProgress",
              value: function(m) {
                if (m.total === void 0) {
                  var f = this._rangeReaders[0];
                  f != null && f.onProgress && f.onProgress({
                    loaded: m.loaded
                  });
                } else {
                  var v = this._fullRequestReader;
                  v != null && v.onProgress && v.onProgress({
                    loaded: m.loaded,
                    total: m.total
                  });
                }
              }
            }, {
              key: "_onProgressiveDone",
              value: function() {
                this._fullRequestReader && this._fullRequestReader.progressiveDone(), this._progressiveDone = !0;
              }
            }, {
              key: "_removeRangeReader",
              value: function(m) {
                var f = this._rangeReaders.indexOf(m);
                f >= 0 && this._rangeReaders.splice(f, 1);
              }
            }, {
              key: "getFullReader",
              value: function() {
                (0, a.assert)(!this._fullRequestReader, "PDFDataTransportStream.getFullReader can only be called once.");
                var m = this._queuedChunks;
                return this._queuedChunks = null, new k(this, m, this._progressiveDone, this._contentDispositionFilename);
              }
            }, {
              key: "getRangeReader",
              value: function(m, f) {
                if (f <= this._progressiveDataLength)
                  return null;
                var v = new N(this, m, f);
                return this._pdfDataRangeTransport.requestDataRange(m, f), this._rangeReaders.push(v), v;
              }
            }, {
              key: "cancelAllRequests",
              value: function(m) {
                this._fullRequestReader && this._fullRequestReader.cancel(m);
                var f = g(this._rangeReaders.slice(0)), v;
                try {
                  for (f.s(); !(v = f.n()).done; ) {
                    var _ = v.value;
                    _.cancel(m);
                  }
                } catch (S) {
                  f.e(S);
                } finally {
                  f.f();
                }
                this._pdfDataRangeTransport.abort();
              }
            }]), x;
          }();
          r.PDFDataTransportStream = O;
          var k = /* @__PURE__ */ function() {
            function x(U, m) {
              var f = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : !1, v = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : null;
              I(this, x), this._stream = U, this._done = f || !1, this._filename = (0, i.isPdfFile)(v) ? v : null, this._queuedChunks = m || [], this._loaded = 0;
              var _ = g(this._queuedChunks), S;
              try {
                for (_.s(); !(S = _.n()).done; ) {
                  var y = S.value;
                  this._loaded += y.byteLength;
                }
              } catch (R) {
                _.e(R);
              } finally {
                _.f();
              }
              this._requests = [], this._headersReady = Promise.resolve(), U._fullRequestReader = this, this.onProgress = null;
            }
            return E(x, [{
              key: "_enqueue",
              value: function(m) {
                if (!this._done) {
                  if (this._requests.length > 0) {
                    var f = this._requests.shift();
                    f.resolve({
                      value: m,
                      done: !1
                    });
                  } else
                    this._queuedChunks.push(m);
                  this._loaded += m.byteLength;
                }
              }
            }, {
              key: "headersReady",
              get: function() {
                return this._headersReady;
              }
            }, {
              key: "filename",
              get: function() {
                return this._filename;
              }
            }, {
              key: "isRangeSupported",
              get: function() {
                return this._stream._isRangeSupported;
              }
            }, {
              key: "isStreamingSupported",
              get: function() {
                return this._stream._isStreamingSupported;
              }
            }, {
              key: "contentLength",
              get: function() {
                return this._stream._contentLength;
              }
            }, {
              key: "read",
              value: function() {
                var U = c(/* @__PURE__ */ t.default.mark(function f() {
                  var v, _;
                  return t.default.wrap(function(y) {
                    for (; ; )
                      switch (y.prev = y.next) {
                        case 0:
                          if (!(this._queuedChunks.length > 0)) {
                            y.next = 3;
                            break;
                          }
                          return v = this._queuedChunks.shift(), y.abrupt("return", {
                            value: v,
                            done: !1
                          });
                        case 3:
                          if (!this._done) {
                            y.next = 5;
                            break;
                          }
                          return y.abrupt("return", {
                            value: void 0,
                            done: !0
                          });
                        case 5:
                          return _ = (0, a.createPromiseCapability)(), this._requests.push(_), y.abrupt("return", _.promise);
                        case 8:
                        case "end":
                          return y.stop();
                      }
                  }, f, this);
                }));
                function m() {
                  return U.apply(this, arguments);
                }
                return m;
              }()
            }, {
              key: "cancel",
              value: function(m) {
                this._done = !0;
                var f = g(this._requests), v;
                try {
                  for (f.s(); !(v = f.n()).done; ) {
                    var _ = v.value;
                    _.resolve({
                      value: void 0,
                      done: !0
                    });
                  }
                } catch (S) {
                  f.e(S);
                } finally {
                  f.f();
                }
                this._requests.length = 0;
              }
            }, {
              key: "progressiveDone",
              value: function() {
                this._done || (this._done = !0);
              }
            }]), x;
          }(), N = /* @__PURE__ */ function() {
            function x(U, m, f) {
              I(this, x), this._stream = U, this._begin = m, this._end = f, this._queuedChunk = null, this._requests = [], this._done = !1, this.onProgress = null;
            }
            return E(x, [{
              key: "_enqueue",
              value: function(m) {
                if (!this._done) {
                  if (this._requests.length === 0)
                    this._queuedChunk = m;
                  else {
                    var f = this._requests.shift();
                    f.resolve({
                      value: m,
                      done: !1
                    });
                    var v = g(this._requests), _;
                    try {
                      for (v.s(); !(_ = v.n()).done; ) {
                        var S = _.value;
                        S.resolve({
                          value: void 0,
                          done: !0
                        });
                      }
                    } catch (y) {
                      v.e(y);
                    } finally {
                      v.f();
                    }
                    this._requests.length = 0;
                  }
                  this._done = !0, this._stream._removeRangeReader(this);
                }
              }
            }, {
              key: "isStreamingSupported",
              get: function() {
                return !1;
              }
            }, {
              key: "read",
              value: function() {
                var U = c(/* @__PURE__ */ t.default.mark(function f() {
                  var v, _;
                  return t.default.wrap(function(y) {
                    for (; ; )
                      switch (y.prev = y.next) {
                        case 0:
                          if (!this._queuedChunk) {
                            y.next = 4;
                            break;
                          }
                          return v = this._queuedChunk, this._queuedChunk = null, y.abrupt("return", {
                            value: v,
                            done: !1
                          });
                        case 4:
                          if (!this._done) {
                            y.next = 6;
                            break;
                          }
                          return y.abrupt("return", {
                            value: void 0,
                            done: !0
                          });
                        case 6:
                          return _ = (0, a.createPromiseCapability)(), this._requests.push(_), y.abrupt("return", _.promise);
                        case 9:
                        case "end":
                          return y.stop();
                      }
                  }, f, this);
                }));
                function m() {
                  return U.apply(this, arguments);
                }
                return m;
              }()
            }, {
              key: "cancel",
              value: function(m) {
                this._done = !0;
                var f = g(this._requests), v;
                try {
                  for (f.s(); !(v = f.n()).done; ) {
                    var _ = v.value;
                    _.resolve({
                      value: void 0,
                      done: !0
                    });
                  }
                } catch (S) {
                  f.e(S);
                } finally {
                  f.f();
                }
                this._requests.length = 0, this._stream._removeRangeReader(this);
              }
            }]), x;
          }();
        },
        (n, r) => {
          Object.defineProperty(r, "__esModule", {
            value: !0
          }), r.XfaText = void 0;
          function e(g, b) {
            var A = typeof Symbol < "u" && g[Symbol.iterator] || g["@@iterator"];
            if (!A) {
              if (Array.isArray(g) || (A = t(g)) || b && g && typeof g.length == "number") {
                A && (g = A);
                var I = 0, C = function() {
                };
                return { s: C, n: function() {
                  return I >= g.length ? { done: !0 } : { done: !1, value: g[I++] };
                }, e: function(x) {
                  throw x;
                }, f: C };
              }
              throw new TypeError(`Invalid attempt to iterate non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
            }
            var E = !0, O = !1, k;
            return { s: function() {
              A = A.call(g);
            }, n: function() {
              var x = A.next();
              return E = x.done, x;
            }, e: function(x) {
              O = !0, k = x;
            }, f: function() {
              try {
                !E && A.return != null && A.return();
              } finally {
                if (O)
                  throw k;
              }
            } };
          }
          function t(g, b) {
            if (!!g) {
              if (typeof g == "string")
                return a(g, b);
              var A = Object.prototype.toString.call(g).slice(8, -1);
              if (A === "Object" && g.constructor && (A = g.constructor.name), A === "Map" || A === "Set")
                return Array.from(g);
              if (A === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(A))
                return a(g, b);
            }
          }
          function a(g, b) {
            (b == null || b > g.length) && (b = g.length);
            for (var A = 0, I = new Array(b); A < b; A++)
              I[A] = g[A];
            return I;
          }
          function i(g, b) {
            if (!(g instanceof b))
              throw new TypeError("Cannot call a class as a function");
          }
          function s(g, b) {
            for (var A = 0; A < b.length; A++) {
              var I = b[A];
              I.enumerable = I.enumerable || !1, I.configurable = !0, "value" in I && (I.writable = !0), Object.defineProperty(g, I.key, I);
            }
          }
          function u(g, b, A) {
            return b && s(g.prototype, b), A && s(g, A), g;
          }
          var c = /* @__PURE__ */ function() {
            function g() {
              i(this, g);
            }
            return u(g, null, [{
              key: "textContent",
              value: function(A) {
                var I = [], C = {
                  items: I,
                  styles: /* @__PURE__ */ Object.create(null)
                };
                function E(O) {
                  var k;
                  if (!!O) {
                    var N = null, x = O.name;
                    if (x === "#text")
                      N = O.value;
                    else if (g.shouldBuildText(x))
                      O != null && (k = O.attributes) !== null && k !== void 0 && k.textContent ? N = O.attributes.textContent : O.value && (N = O.value);
                    else
                      return;
                    if (N !== null && I.push({
                      str: N
                    }), !!O.children) {
                      var U = e(O.children), m;
                      try {
                        for (U.s(); !(m = U.n()).done; ) {
                          var f = m.value;
                          E(f);
                        }
                      } catch (v) {
                        U.e(v);
                      } finally {
                        U.f();
                      }
                    }
                  }
                }
                return E(A), C;
              }
            }, {
              key: "shouldBuildText",
              value: function(A) {
                return !(A === "textarea" || A === "input" || A === "option" || A === "select");
              }
            }]), g;
          }();
          r.XfaText = c;
        },
        (n, r, e) => {
          function t(fe) {
            return typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? t = function(H) {
              return typeof H;
            } : t = function(H) {
              return H && typeof Symbol == "function" && H.constructor === Symbol && H !== Symbol.prototype ? "symbol" : typeof H;
            }, t(fe);
          }
          Object.defineProperty(r, "__esModule", {
            value: !0
          }), r.AnnotationLayer = void 0;
          var a = e(4), i = e(1), s = e(139), u = e(149), c = e(150);
          function g(fe, he, H) {
            return b(fe, he), H;
          }
          function b(fe, he) {
            if (fe !== he)
              throw new TypeError("Private static access of wrong provenance");
          }
          function A(fe, he, H) {
            return typeof Reflect < "u" && Reflect.get ? A = Reflect.get : A = function(Q, oe, ne) {
              var J = I(Q, oe);
              if (!!J) {
                var pe = Object.getOwnPropertyDescriptor(J, oe);
                return pe.get ? pe.get.call(ne) : pe.value;
              }
            }, A(fe, he, H || fe);
          }
          function I(fe, he) {
            for (; !Object.prototype.hasOwnProperty.call(fe, he) && (fe = S(fe), fe !== null); )
              ;
            return fe;
          }
          function C(fe, he, H) {
            return he in fe ? Object.defineProperty(fe, he, { value: H, enumerable: !0, configurable: !0, writable: !0 }) : fe[he] = H, fe;
          }
          function E(fe) {
            return N(fe) || k(fe) || $(fe) || O();
          }
          function O() {
            throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
          }
          function k(fe) {
            if (typeof Symbol < "u" && fe[Symbol.iterator] != null || fe["@@iterator"] != null)
              return Array.from(fe);
          }
          function N(fe) {
            if (Array.isArray(fe))
              return W(fe);
          }
          function x(fe, he) {
            if (typeof he != "function" && he !== null)
              throw new TypeError("Super expression must either be null or a function");
            fe.prototype = Object.create(he && he.prototype, { constructor: { value: fe, writable: !0, configurable: !0 } }), he && U(fe, he);
          }
          function U(fe, he) {
            return U = Object.setPrototypeOf || function(re, Q) {
              return re.__proto__ = Q, re;
            }, U(fe, he);
          }
          function m(fe) {
            var he = _();
            return function() {
              var re = S(fe), Q;
              if (he) {
                var oe = S(this).constructor;
                Q = Reflect.construct(re, arguments, oe);
              } else
                Q = re.apply(this, arguments);
              return f(this, Q);
            };
          }
          function f(fe, he) {
            if (he && (t(he) === "object" || typeof he == "function"))
              return he;
            if (he !== void 0)
              throw new TypeError("Derived constructors may only return object or undefined");
            return v(fe);
          }
          function v(fe) {
            if (fe === void 0)
              throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return fe;
          }
          function _() {
            if (typeof Reflect > "u" || !Reflect.construct || Reflect.construct.sham)
              return !1;
            if (typeof Proxy == "function")
              return !0;
            try {
              return Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
              })), !0;
            } catch {
              return !1;
            }
          }
          function S(fe) {
            return S = Object.setPrototypeOf ? Object.getPrototypeOf : function(H) {
              return H.__proto__ || Object.getPrototypeOf(H);
            }, S(fe);
          }
          function y(fe, he) {
            var H = typeof Symbol < "u" && fe[Symbol.iterator] || fe["@@iterator"];
            if (!H) {
              if (Array.isArray(fe) || (H = $(fe)) || he && fe && typeof fe.length == "number") {
                H && (fe = H);
                var re = 0, Q = function() {
                };
                return { s: Q, n: function() {
                  return re >= fe.length ? { done: !0 } : { done: !1, value: fe[re++] };
                }, e: function(ce) {
                  throw ce;
                }, f: Q };
              }
              throw new TypeError(`Invalid attempt to iterate non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
            }
            var oe = !0, ne = !1, J;
            return { s: function() {
              H = H.call(fe);
            }, n: function() {
              var ce = H.next();
              return oe = ce.done, ce;
            }, e: function(ce) {
              ne = !0, J = ce;
            }, f: function() {
              try {
                !oe && H.return != null && H.return();
              } finally {
                if (ne)
                  throw J;
              }
            } };
          }
          function R(fe, he) {
            return te(fe) || X(fe, he) || $(fe, he) || L();
          }
          function L() {
            throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
          }
          function $(fe, he) {
            if (!!fe) {
              if (typeof fe == "string")
                return W(fe, he);
              var H = Object.prototype.toString.call(fe).slice(8, -1);
              if (H === "Object" && fe.constructor && (H = fe.constructor.name), H === "Map" || H === "Set")
                return Array.from(fe);
              if (H === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(H))
                return W(fe, he);
            }
          }
          function W(fe, he) {
            (he == null || he > fe.length) && (he = fe.length);
            for (var H = 0, re = new Array(he); H < he; H++)
              re[H] = fe[H];
            return re;
          }
          function X(fe, he) {
            var H = fe == null ? null : typeof Symbol < "u" && fe[Symbol.iterator] || fe["@@iterator"];
            if (H != null) {
              var re = [], Q = !0, oe = !1, ne, J;
              try {
                for (H = H.call(fe); !(Q = (ne = H.next()).done) && (re.push(ne.value), !(he && re.length === he)); Q = !0)
                  ;
              } catch (pe) {
                oe = !0, J = pe;
              } finally {
                try {
                  !Q && H.return != null && H.return();
                } finally {
                  if (oe)
                    throw J;
                }
              }
              return re;
            }
          }
          function te(fe) {
            if (Array.isArray(fe))
              return fe;
          }
          function K(fe, he) {
            if (!(fe instanceof he))
              throw new TypeError("Cannot call a class as a function");
          }
          function ae(fe, he) {
            for (var H = 0; H < he.length; H++) {
              var re = he[H];
              re.enumerable = re.enumerable || !1, re.configurable = !0, "value" in re && (re.writable = !0), Object.defineProperty(fe, re.key, re);
            }
          }
          function V(fe, he, H) {
            return he && ae(fe.prototype, he), H && ae(fe, H), fe;
          }
          var q = 1e3, w = /* @__PURE__ */ new WeakSet(), p = /* @__PURE__ */ function() {
            function fe() {
              K(this, fe);
            }
            return V(fe, null, [{
              key: "create",
              value: function(H) {
                var re = H.data.annotationType;
                switch (re) {
                  case a.AnnotationType.LINK:
                    return new F(H);
                  case a.AnnotationType.TEXT:
                    return new G(H);
                  case a.AnnotationType.WIDGET:
                    var Q = H.data.fieldType;
                    switch (Q) {
                      case "Tx":
                        return new Y(H);
                      case "Btn":
                        return H.data.radioButton ? new Se(H) : H.data.checkBox ? new de(H) : new _e(H);
                      case "Ch":
                        return new j(H);
                    }
                    return new Z(H);
                  case a.AnnotationType.POPUP:
                    return new D(H);
                  case a.AnnotationType.FREETEXT:
                    return new d(H);
                  case a.AnnotationType.LINE:
                    return new T(H);
                  case a.AnnotationType.SQUARE:
                    return new B(H);
                  case a.AnnotationType.CIRCLE:
                    return new z(H);
                  case a.AnnotationType.POLYLINE:
                    return new ee(H);
                  case a.AnnotationType.CARET:
                    return new ve(H);
                  case a.AnnotationType.INK:
                    return new ye(H);
                  case a.AnnotationType.POLYGON:
                    return new le(H);
                  case a.AnnotationType.HIGHLIGHT:
                    return new me(H);
                  case a.AnnotationType.UNDERLINE:
                    return new we(H);
                  case a.AnnotationType.SQUIGGLY:
                    return new Pe(H);
                  case a.AnnotationType.STRIKEOUT:
                    return new Ee(H);
                  case a.AnnotationType.STAMP:
                    return new Fe(H);
                  case a.AnnotationType.FILEATTACHMENT:
                    return new Ie(H);
                  default:
                    return new P(H);
                }
              }
            }]), fe;
          }(), P = /* @__PURE__ */ function() {
            function fe(he) {
              var H = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, re = H.isRenderable, Q = re === void 0 ? !1 : re, oe = H.ignoreBorder, ne = oe === void 0 ? !1 : oe, J = H.createQuadrilaterals, pe = J === void 0 ? !1 : J;
              K(this, fe), this.isRenderable = Q, this.data = he.data, this.layer = he.layer, this.page = he.page, this.viewport = he.viewport, this.linkService = he.linkService, this.downloadManager = he.downloadManager, this.imageResourcesPath = he.imageResourcesPath, this.renderForms = he.renderForms, this.svgFactory = he.svgFactory, this.annotationStorage = he.annotationStorage, this.enableScripting = he.enableScripting, this.hasJSActions = he.hasJSActions, this._fieldObjects = he.fieldObjects, this._mouseState = he.mouseState, Q && (this.container = this._createContainer(ne)), pe && (this.quadrilaterals = this._createQuadrilaterals(ne));
            }
            return V(fe, [{
              key: "_createContainer",
              value: function() {
                var H = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : !1, re = this.data, Q = this.page, oe = this.viewport, ne = document.createElement("section"), J = re.rect[2] - re.rect[0], pe = re.rect[3] - re.rect[1];
                ne.setAttribute("data-annotation-id", re.id);
                var ce = a.Util.normalizeRect([re.rect[0], Q.view[3] - re.rect[1] + Q.view[1], re.rect[2], Q.view[3] - re.rect[3] + Q.view[1]]);
                if (re.hasOwnCanvas) {
                  var Ae = oe.transform.slice(), Re = a.Util.singularValueDecompose2dScale(Ae), De = R(Re, 2), Le = De[0], Te = De[1];
                  J = Math.ceil(J * Le), pe = Math.ceil(pe * Te), ce[0] *= Le, ce[1] *= Te;
                  for (var ze = 0; ze < 4; ze++)
                    Ae[ze] = Math.sign(Ae[ze]);
                  ne.style.transform = "matrix(".concat(Ae.join(","), ")");
                } else
                  ne.style.transform = "matrix(".concat(oe.transform.join(","), ")");
                if (ne.style.transformOrigin = "".concat(-ce[0], "px ").concat(-ce[1], "px"), !H && re.borderStyle.width > 0) {
                  ne.style.borderWidth = "".concat(re.borderStyle.width, "px"), re.borderStyle.style !== a.AnnotationBorderStyleType.UNDERLINE && (J -= 2 * re.borderStyle.width, pe -= 2 * re.borderStyle.width);
                  var xe = re.borderStyle.horizontalCornerRadius, Oe = re.borderStyle.verticalCornerRadius;
                  if (xe > 0 || Oe > 0) {
                    var Be = "".concat(xe, "px / ").concat(Oe, "px");
                    ne.style.borderRadius = Be;
                  }
                  switch (re.borderStyle.style) {
                    case a.AnnotationBorderStyleType.SOLID:
                      ne.style.borderStyle = "solid";
                      break;
                    case a.AnnotationBorderStyleType.DASHED:
                      ne.style.borderStyle = "dashed";
                      break;
                    case a.AnnotationBorderStyleType.BEVELED:
                      (0, a.warn)("Unimplemented border style: beveled");
                      break;
                    case a.AnnotationBorderStyleType.INSET:
                      (0, a.warn)("Unimplemented border style: inset");
                      break;
                    case a.AnnotationBorderStyleType.UNDERLINE:
                      ne.style.borderBottomStyle = "solid";
                      break;
                  }
                  var Ne = re.borderColor || re.color || null;
                  Ne ? ne.style.borderColor = a.Util.makeHexColor(re.color[0] | 0, re.color[1] | 0, re.color[2] | 0) : ne.style.borderWidth = 0;
                }
                return ne.style.left = "".concat(ce[0], "px"), ne.style.top = "".concat(ce[1], "px"), re.hasOwnCanvas ? ne.style.width = ne.style.height = "auto" : (ne.style.width = "".concat(J, "px"), ne.style.height = "".concat(pe, "px")), ne;
              }
            }, {
              key: "_createQuadrilaterals",
              value: function() {
                var H = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : !1;
                if (!this.data.quadPoints)
                  return null;
                var re = [], Q = this.data.rect, oe = y(this.data.quadPoints), ne;
                try {
                  for (oe.s(); !(ne = oe.n()).done; ) {
                    var J = ne.value;
                    this.data.rect = [J[2].x, J[2].y, J[1].x, J[1].y], re.push(this._createContainer(H));
                  }
                } catch (pe) {
                  oe.e(pe);
                } finally {
                  oe.f();
                }
                return this.data.rect = Q, re;
              }
            }, {
              key: "_createPopup",
              value: function(H, re) {
                var Q = this.container;
                this.quadrilaterals && (H = H || this.quadrilaterals, Q = this.quadrilaterals[0]), H || (H = document.createElement("div"), H.style.height = Q.style.height, H.style.width = Q.style.width, Q.appendChild(H));
                var oe = new h({
                  container: Q,
                  trigger: H,
                  color: re.color,
                  titleObj: re.titleObj,
                  modificationDate: re.modificationDate,
                  contentsObj: re.contentsObj,
                  richText: re.richText,
                  hideWrapper: !0
                }), ne = oe.render();
                ne.style.left = Q.style.width, Q.appendChild(ne);
              }
            }, {
              key: "_renderQuadrilaterals",
              value: function(H) {
                var re = y(this.quadrilaterals), Q;
                try {
                  for (re.s(); !(Q = re.n()).done; ) {
                    var oe = Q.value;
                    oe.className = H;
                  }
                } catch (ne) {
                  re.e(ne);
                } finally {
                  re.f();
                }
                return this.quadrilaterals;
              }
            }, {
              key: "render",
              value: function() {
                (0, a.unreachable)("Abstract method `AnnotationElement.render` called");
              }
            }, {
              key: "_getElementsByName",
              value: function(H) {
                var re = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : null, Q = [];
                if (this._fieldObjects) {
                  var oe = this._fieldObjects[H];
                  if (oe) {
                    var ne = y(oe), J;
                    try {
                      for (ne.s(); !(J = ne.n()).done; ) {
                        var pe = J.value, ce = pe.page, Ae = pe.id, Re = pe.exportValues;
                        if (ce !== -1 && Ae !== re) {
                          var De = typeof Re == "string" ? Re : null, Le = document.getElementById(Ae);
                          if (Le && !w.has(Le)) {
                            (0, a.warn)("_getElementsByName - element not allowed: ".concat(Ae));
                            continue;
                          }
                          Q.push({
                            id: Ae,
                            exportValue: De,
                            domElement: Le
                          });
                        }
                      }
                    } catch (Ne) {
                      ne.e(Ne);
                    } finally {
                      ne.f();
                    }
                  }
                  return Q;
                }
                var Te = y(document.getElementsByName(H)), ze;
                try {
                  for (Te.s(); !(ze = Te.n()).done; ) {
                    var xe = ze.value, Oe = xe.id, Be = xe.exportValue;
                    Oe !== re && (!w.has(xe) || Q.push({
                      id: Oe,
                      exportValue: Be,
                      domElement: xe
                    }));
                  }
                } catch (Ne) {
                  Te.e(Ne);
                } finally {
                  Te.f();
                }
                return Q;
              }
            }], [{
              key: "platform",
              get: function() {
                var H = typeof navigator < "u" ? navigator.platform : "";
                return (0, a.shadow)(this, "platform", {
                  isWin: H.includes("Win"),
                  isMac: H.includes("Mac")
                });
              }
            }]), fe;
          }(), F = /* @__PURE__ */ function(fe) {
            x(H, fe);
            var he = m(H);
            function H(re) {
              var Q = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : null;
              K(this, H);
              var oe = !!(re.data.url || re.data.dest || re.data.action || re.data.isTooltipOnly || re.data.resetForm || re.data.actions && (re.data.actions.Action || re.data.actions["Mouse Up"] || re.data.actions["Mouse Down"]));
              return he.call(this, re, {
                isRenderable: oe,
                ignoreBorder: !!(Q != null && Q.ignoreBorder),
                createQuadrilaterals: !0
              });
            }
            return V(H, [{
              key: "render",
              value: function() {
                var Q = this.data, oe = this.linkService, ne = document.createElement("a");
                if (Q.url) {
                  var J;
                  oe.addLinkAttributes || (0, a.warn)("LinkAnnotationElement.render - missing `addLinkAttributes`-method on the `linkService`-instance."), (J = oe.addLinkAttributes) === null || J === void 0 || J.call(oe, ne, Q.url, Q.newWindow);
                } else if (Q.action)
                  this._bindNamedAction(ne, Q.action);
                else if (Q.dest)
                  this._bindLink(ne, Q.dest);
                else {
                  var pe = !1;
                  Q.actions && (Q.actions.Action || Q.actions["Mouse Up"] || Q.actions["Mouse Down"]) && this.enableScripting && this.hasJSActions && (pe = !0, this._bindJSAction(ne, Q)), Q.resetForm ? this._bindResetFormAction(ne, Q.resetForm) : pe || this._bindLink(ne, "");
                }
                return this.quadrilaterals ? this._renderQuadrilaterals("linkAnnotation").map(function(ce, Ae) {
                  var Re = Ae === 0 ? ne : ne.cloneNode();
                  return ce.appendChild(Re), ce;
                }) : (this.container.className = "linkAnnotation", this.container.appendChild(ne), this.container);
              }
            }, {
              key: "_bindLink",
              value: function(Q, oe) {
                var ne = this;
                Q.href = this.linkService.getDestinationHash(oe), Q.onclick = function() {
                  return oe && ne.linkService.goToDestination(oe), !1;
                }, (oe || oe === "") && (Q.className = "internalLink");
              }
            }, {
              key: "_bindNamedAction",
              value: function(Q, oe) {
                var ne = this;
                Q.href = this.linkService.getAnchorUrl(""), Q.onclick = function() {
                  return ne.linkService.executeNamedAction(oe), !1;
                }, Q.className = "internalLink";
              }
            }, {
              key: "_bindJSAction",
              value: function(Q, oe) {
                var ne = this;
                Q.href = this.linkService.getAnchorUrl("");
                for (var J = /* @__PURE__ */ new Map([["Action", "onclick"], ["Mouse Up", "onmouseup"], ["Mouse Down", "onmousedown"]]), pe = function() {
                  var Le = Ae[ce], Te = J.get(Le);
                  if (!Te)
                    return "continue";
                  Q[Te] = function() {
                    var ze;
                    return (ze = ne.linkService.eventBus) === null || ze === void 0 || ze.dispatch("dispatcheventinsandbox", {
                      source: ne,
                      detail: {
                        id: oe.id,
                        name: Le
                      }
                    }), !1;
                  };
                }, ce = 0, Ae = Object.keys(oe.actions); ce < Ae.length; ce++)
                  var Re = pe();
                Q.onclick || (Q.onclick = function() {
                  return !1;
                }), Q.className = "internalLink";
              }
            }, {
              key: "_bindResetFormAction",
              value: function(Q, oe) {
                var ne = this, J = Q.onclick;
                if (J || (Q.href = this.linkService.getAnchorUrl("")), Q.className = "internalLink", !this._fieldObjects) {
                  (0, a.warn)('_bindResetFormAction - "resetForm" action not supported, ensure that the `fieldObjects` parameter is provided.'), J || (Q.onclick = function() {
                    return !1;
                  });
                  return;
                }
                Q.onclick = function() {
                  J && J();
                  var pe = oe.fields, ce = oe.refs, Ae = oe.include, Re = [];
                  if (pe.length !== 0 || ce.length !== 0) {
                    var De = new Set(ce), Le = y(pe), Te;
                    try {
                      for (Le.s(); !(Te = Le.n()).done; ) {
                        var ze = Te.value, xe = ne._fieldObjects[ze] || [], Oe = y(xe), Be;
                        try {
                          for (Oe.s(); !(Be = Oe.n()).done; ) {
                            var Ne = Be.value.id;
                            De.add(Ne);
                          }
                        } catch (Ge) {
                          Oe.e(Ge);
                        } finally {
                          Oe.f();
                        }
                      }
                    } catch (Ge) {
                      Le.e(Ge);
                    } finally {
                      Le.f();
                    }
                    for (var $e = 0, Xe = Object.values(ne._fieldObjects); $e < Xe.length; $e++) {
                      var Je = Xe[$e], rt = y(Je), it;
                      try {
                        for (rt.s(); !(it = rt.n()).done; ) {
                          var mt = it.value;
                          De.has(mt.id) === Ae && Re.push(mt);
                        }
                      } catch (Ge) {
                        rt.e(Ge);
                      } finally {
                        rt.f();
                      }
                    }
                  } else
                    for (var ht = 0, kt = Object.values(ne._fieldObjects); ht < kt.length; ht++) {
                      var Vt = kt[ht];
                      Re.push.apply(Re, E(Vt));
                    }
                  for (var xt = ne.annotationStorage, Ot = [], Ft = 0, Xt = Re; Ft < Xt.length; Ft++) {
                    var _t = Xt[Ft], Rt = _t.id;
                    switch (Ot.push(Rt), _t.type) {
                      case "text": {
                        var ue = _t.defaultValue || "";
                        xt.setValue(Rt, {
                          value: ue,
                          valueAsString: ue
                        });
                        break;
                      }
                      case "checkbox":
                      case "radiobutton": {
                        var Ce = _t.defaultValue === _t.exportValues;
                        xt.setValue(Rt, {
                          value: Ce
                        });
                        break;
                      }
                      case "combobox":
                      case "listbox": {
                        var se = _t.defaultValue || "";
                        xt.setValue(Rt, {
                          value: se
                        });
                        break;
                      }
                      default:
                        continue;
                    }
                    var ge = document.getElementById(Rt);
                    !ge || !w.has(ge) || ge.dispatchEvent(new Event("resetform"));
                  }
                  if (ne.enableScripting) {
                    var Ue;
                    (Ue = ne.linkService.eventBus) === null || Ue === void 0 || Ue.dispatch("dispatcheventinsandbox", {
                      source: ne,
                      detail: {
                        id: "app",
                        ids: Ot,
                        name: "ResetForm"
                      }
                    });
                  }
                  return !1;
                };
              }
            }]), H;
          }(P), G = /* @__PURE__ */ function(fe) {
            x(H, fe);
            var he = m(H);
            function H(re) {
              var Q, oe, ne;
              K(this, H);
              var J = !!(re.data.hasPopup || (Q = re.data.titleObj) !== null && Q !== void 0 && Q.str || (oe = re.data.contentsObj) !== null && oe !== void 0 && oe.str || (ne = re.data.richText) !== null && ne !== void 0 && ne.str);
              return he.call(this, re, {
                isRenderable: J
              });
            }
            return V(H, [{
              key: "render",
              value: function() {
                this.container.className = "textAnnotation";
                var Q = document.createElement("img");
                return Q.style.height = this.container.style.height, Q.style.width = this.container.style.width, Q.src = this.imageResourcesPath + "annotation-" + this.data.name.toLowerCase() + ".svg", Q.alt = "[{{type}} Annotation]", Q.dataset.l10nId = "text_annotation_type", Q.dataset.l10nArgs = JSON.stringify({
                  type: this.data.name
                }), this.data.hasPopup || this._createPopup(Q, this.data), this.container.appendChild(Q), this.container;
              }
            }]), H;
          }(P), Z = /* @__PURE__ */ function(fe) {
            x(H, fe);
            var he = m(H);
            function H() {
              return K(this, H), he.apply(this, arguments);
            }
            return V(H, [{
              key: "render",
              value: function() {
                return this.data.alternativeText && (this.container.title = this.data.alternativeText), this.container;
              }
            }, {
              key: "_getKeyModifier",
              value: function(Q) {
                var oe = P.platform, ne = oe.isWin, J = oe.isMac;
                return ne && Q.ctrlKey || J && Q.metaKey;
              }
            }, {
              key: "_setEventListener",
              value: function(Q, oe, ne, J) {
                var pe = this;
                oe.includes("mouse") ? Q.addEventListener(oe, function(ce) {
                  var Ae;
                  (Ae = pe.linkService.eventBus) === null || Ae === void 0 || Ae.dispatch("dispatcheventinsandbox", {
                    source: pe,
                    detail: {
                      id: pe.data.id,
                      name: ne,
                      value: J(ce),
                      shift: ce.shiftKey,
                      modifier: pe._getKeyModifier(ce)
                    }
                  });
                }) : Q.addEventListener(oe, function(ce) {
                  var Ae;
                  (Ae = pe.linkService.eventBus) === null || Ae === void 0 || Ae.dispatch("dispatcheventinsandbox", {
                    source: pe,
                    detail: {
                      id: pe.data.id,
                      name: ne,
                      value: ce.target.checked
                    }
                  });
                });
              }
            }, {
              key: "_setEventListeners",
              value: function(Q, oe, ne) {
                var J = y(oe), pe;
                try {
                  for (J.s(); !(pe = J.n()).done; ) {
                    var ce, Ae = R(pe.value, 2), Re = Ae[0], De = Ae[1];
                    (De === "Action" || (ce = this.data.actions) !== null && ce !== void 0 && ce[De]) && this._setEventListener(Q, Re, De, ne);
                  }
                } catch (Le) {
                  J.e(Le);
                } finally {
                  J.f();
                }
              }
            }, {
              key: "_setBackgroundColor",
              value: function(Q) {
                var oe = this.data.backgroundColor || null;
                Q.style.backgroundColor = oe === null ? "transparent" : a.Util.makeHexColor(oe[0], oe[1], oe[2]);
              }
            }, {
              key: "_dispatchEventFromSandbox",
              value: function(Q, oe) {
                for (var ne = this, J = function(Te, ze, xe) {
                  var Oe = xe.detail[Te];
                  xe.target.style[ze] = u.ColorConverters["".concat(Oe[0], "_HTML")](Oe.slice(1));
                }, pe = {
                  display: function(Te) {
                    var ze = Te.detail.display % 2 === 1;
                    Te.target.style.visibility = ze ? "hidden" : "visible", ne.annotationStorage.setValue(ne.data.id, {
                      hidden: ze,
                      print: Te.detail.display === 0 || Te.detail.display === 3
                    });
                  },
                  print: function(Te) {
                    ne.annotationStorage.setValue(ne.data.id, {
                      print: Te.detail.print
                    });
                  },
                  hidden: function(Te) {
                    Te.target.style.visibility = Te.detail.hidden ? "hidden" : "visible", ne.annotationStorage.setValue(ne.data.id, {
                      hidden: Te.detail.hidden
                    });
                  },
                  focus: function(Te) {
                    setTimeout(function() {
                      return Te.target.focus({
                        preventScroll: !1
                      });
                    }, 0);
                  },
                  userName: function(Te) {
                    Te.target.title = Te.detail.userName;
                  },
                  readonly: function(Te) {
                    Te.detail.readonly ? Te.target.setAttribute("readonly", "") : Te.target.removeAttribute("readonly");
                  },
                  required: function(Te) {
                    Te.detail.required ? Te.target.setAttribute("required", "") : Te.target.removeAttribute("required");
                  },
                  bgColor: function(Te) {
                    J("bgColor", "backgroundColor", Te);
                  },
                  fillColor: function(Te) {
                    J("fillColor", "backgroundColor", Te);
                  },
                  fgColor: function(Te) {
                    J("fgColor", "color", Te);
                  },
                  textColor: function(Te) {
                    J("textColor", "color", Te);
                  },
                  borderColor: function(Te) {
                    J("borderColor", "borderColor", Te);
                  },
                  strokeColor: function(Te) {
                    J("strokeColor", "borderColor", Te);
                  }
                }, ce = 0, Ae = Object.keys(oe.detail); ce < Ae.length; ce++) {
                  var Re = Ae[ce], De = Q[Re] || pe[Re];
                  De && De(oe);
                }
              }
            }]), H;
          }(P), Y = /* @__PURE__ */ function(fe) {
            x(H, fe);
            var he = m(H);
            function H(re) {
              K(this, H);
              var Q = re.renderForms || !re.data.hasAppearance && !!re.data.fieldValue;
              return he.call(this, re, {
                isRenderable: Q
              });
            }
            return V(H, [{
              key: "setPropertyOnSiblings",
              value: function(Q, oe, ne, J) {
                var pe = this.annotationStorage, ce = y(this._getElementsByName(Q.name, Q.id)), Ae;
                try {
                  for (ce.s(); !(Ae = ce.n()).done; ) {
                    var Re = Ae.value;
                    Re.domElement && (Re.domElement[oe] = ne), pe.setValue(Re.id, C({}, J, ne));
                  }
                } catch (De) {
                  ce.e(De);
                } finally {
                  ce.f();
                }
              }
            }, {
              key: "render",
              value: function() {
                var Q = this, oe = this.annotationStorage, ne = this.data.id;
                this.container.className = "textWidgetAnnotation";
                var J = null;
                if (this.renderForms) {
                  var pe = oe.getValue(ne, {
                    value: this.data.fieldValue,
                    valueAsString: this.data.fieldValue
                  }), ce = pe.valueAsString || pe.value || "", Ae = {
                    userValue: null,
                    formattedValue: null,
                    beforeInputSelectionRange: null,
                    beforeInputValue: null
                  };
                  this.data.multiLine ? (J = document.createElement("textarea"), J.textContent = ce) : (J = document.createElement("input"), J.type = "text", J.setAttribute("value", ce)), w.add(J), J.disabled = this.data.readOnly, J.name = this.data.fieldName, J.tabIndex = q, Ae.userValue = ce, J.setAttribute("id", ne), J.addEventListener("input", function(xe) {
                    oe.setValue(ne, {
                      value: xe.target.value
                    }), Q.setPropertyOnSiblings(J, "value", xe.target.value, "value");
                  }), J.addEventListener("resetform", function(xe) {
                    var Oe = Q.data.defaultFieldValue || "";
                    J.value = Ae.userValue = Oe, delete Ae.formattedValue;
                  });
                  var Re = function(Oe) {
                    Ae.formattedValue && (Oe.target.value = Ae.formattedValue), Oe.target.scrollLeft = 0, Ae.beforeInputSelectionRange = null;
                  };
                  if (this.enableScripting && this.hasJSActions) {
                    var De;
                    J.addEventListener("focus", function(xe) {
                      Ae.userValue && (xe.target.value = Ae.userValue);
                    }), J.addEventListener("updatefromsandbox", function(xe) {
                      var Oe = {
                        value: function(Ne) {
                          Ae.userValue = Ne.detail.value || "", oe.setValue(ne, {
                            value: Ae.userValue.toString()
                          }), Ae.formattedValue || (Ne.target.value = Ae.userValue);
                        },
                        valueAsString: function(Ne) {
                          Ae.formattedValue = Ne.detail.valueAsString || "", Ne.target !== document.activeElement && (Ne.target.value = Ae.formattedValue), oe.setValue(ne, {
                            formattedValue: Ae.formattedValue
                          });
                        },
                        selRange: function(Ne) {
                          var $e = R(Ne.detail.selRange, 2), Xe = $e[0], Je = $e[1];
                          Xe >= 0 && Je < Ne.target.value.length && Ne.target.setSelectionRange(Xe, Je);
                        }
                      };
                      Q._dispatchEventFromSandbox(Oe, xe);
                    }), J.addEventListener("keydown", function(xe) {
                      var Oe;
                      Ae.beforeInputValue = xe.target.value;
                      var Be = -1;
                      xe.key === "Escape" ? Be = 0 : xe.key === "Enter" ? Be = 2 : xe.key === "Tab" && (Be = 3), Be !== -1 && (Ae.userValue = xe.target.value, (Oe = Q.linkService.eventBus) === null || Oe === void 0 || Oe.dispatch("dispatcheventinsandbox", {
                        source: Q,
                        detail: {
                          id: ne,
                          name: "Keystroke",
                          value: xe.target.value,
                          willCommit: !0,
                          commitKey: Be,
                          selStart: xe.target.selectionStart,
                          selEnd: xe.target.selectionEnd
                        }
                      }));
                    });
                    var Le = Re;
                    Re = null, J.addEventListener("blur", function(xe) {
                      if (Q._mouseState.isDown) {
                        var Oe;
                        Ae.userValue = xe.target.value, (Oe = Q.linkService.eventBus) === null || Oe === void 0 || Oe.dispatch("dispatcheventinsandbox", {
                          source: Q,
                          detail: {
                            id: ne,
                            name: "Keystroke",
                            value: xe.target.value,
                            willCommit: !0,
                            commitKey: 1,
                            selStart: xe.target.selectionStart,
                            selEnd: xe.target.selectionEnd
                          }
                        });
                      }
                      Le(xe);
                    }), J.addEventListener("mousedown", function(xe) {
                      Ae.beforeInputValue = xe.target.value, Ae.beforeInputSelectionRange = null;
                    }), J.addEventListener("keyup", function(xe) {
                      xe.target.selectionStart === xe.target.selectionEnd && (Ae.beforeInputSelectionRange = null);
                    }), J.addEventListener("select", function(xe) {
                      Ae.beforeInputSelectionRange = [xe.target.selectionStart, xe.target.selectionEnd];
                    }), (De = this.data.actions) !== null && De !== void 0 && De.Keystroke && J.addEventListener("input", function(xe) {
                      var Oe, Be = -1, Ne = -1;
                      if (Ae.beforeInputSelectionRange) {
                        var $e = R(Ae.beforeInputSelectionRange, 2);
                        Be = $e[0], Ne = $e[1];
                      }
                      (Oe = Q.linkService.eventBus) === null || Oe === void 0 || Oe.dispatch("dispatcheventinsandbox", {
                        source: Q,
                        detail: {
                          id: ne,
                          name: "Keystroke",
                          value: Ae.beforeInputValue,
                          change: xe.data,
                          willCommit: !1,
                          selStart: Be,
                          selEnd: Ne
                        }
                      });
                    }), this._setEventListeners(J, [["focus", "Focus"], ["blur", "Blur"], ["mousedown", "Mouse Down"], ["mouseenter", "Mouse Enter"], ["mouseleave", "Mouse Exit"], ["mouseup", "Mouse Up"]], function(xe) {
                      return xe.target.value;
                    });
                  }
                  if (Re && J.addEventListener("blur", Re), this.data.maxLen !== null && (J.maxLength = this.data.maxLen), this.data.comb) {
                    var Te = this.data.rect[2] - this.data.rect[0], ze = Te / this.data.maxLen;
                    J.classList.add("comb"), J.style.letterSpacing = "calc(".concat(ze, "px - 1ch)");
                  }
                } else
                  J = document.createElement("div"), J.textContent = this.data.fieldValue, J.style.verticalAlign = "middle", J.style.display = "table-cell";
                return this._setTextStyle(J), this._setBackgroundColor(J), this.container.appendChild(J), this.container;
              }
            }, {
              key: "_setTextStyle",
              value: function(Q) {
                var oe = ["left", "center", "right"], ne = this.data.defaultAppearanceData, J = ne.fontSize, pe = ne.fontColor, ce = Q.style;
                J && (ce.fontSize = "".concat(J, "px")), ce.color = a.Util.makeHexColor(pe[0], pe[1], pe[2]), this.data.textAlignment !== null && (ce.textAlign = oe[this.data.textAlignment]);
              }
            }]), H;
          }(Z), de = /* @__PURE__ */ function(fe) {
            x(H, fe);
            var he = m(H);
            function H(re) {
              return K(this, H), he.call(this, re, {
                isRenderable: re.renderForms
              });
            }
            return V(H, [{
              key: "render",
              value: function() {
                var Q = this, oe = this.annotationStorage, ne = this.data, J = ne.id, pe = oe.getValue(J, {
                  value: ne.exportValue === ne.fieldValue
                }).value;
                typeof pe == "string" && (pe = pe !== "Off", oe.setValue(J, {
                  value: pe
                })), this.container.className = "buttonWidgetAnnotation checkBox";
                var ce = document.createElement("input");
                return w.add(ce), ce.disabled = ne.readOnly, ce.type = "checkbox", ce.name = ne.fieldName, pe && ce.setAttribute("checked", !0), ce.setAttribute("id", J), ce.setAttribute("exportValue", ne.exportValue), ce.tabIndex = q, ce.addEventListener("change", function(Ae) {
                  var Re = Ae.target, De = Re.name, Le = Re.checked, Te = y(Q._getElementsByName(De, J)), ze;
                  try {
                    for (Te.s(); !(ze = Te.n()).done; ) {
                      var xe = ze.value, Oe = Le && xe.exportValue === ne.exportValue;
                      xe.domElement && (xe.domElement.checked = Oe), oe.setValue(xe.id, {
                        value: Oe
                      });
                    }
                  } catch (Be) {
                    Te.e(Be);
                  } finally {
                    Te.f();
                  }
                  oe.setValue(J, {
                    value: Le
                  });
                }), ce.addEventListener("resetform", function(Ae) {
                  var Re = ne.defaultFieldValue || "Off";
                  Ae.target.checked = Re === ne.exportValue;
                }), this.enableScripting && this.hasJSActions && (ce.addEventListener("updatefromsandbox", function(Ae) {
                  var Re = {
                    value: function(Le) {
                      Le.target.checked = Le.detail.value !== "Off", oe.setValue(J, {
                        value: Le.target.checked
                      });
                    }
                  };
                  Q._dispatchEventFromSandbox(Re, Ae);
                }), this._setEventListeners(ce, [["change", "Validate"], ["change", "Action"], ["focus", "Focus"], ["blur", "Blur"], ["mousedown", "Mouse Down"], ["mouseenter", "Mouse Enter"], ["mouseleave", "Mouse Exit"], ["mouseup", "Mouse Up"]], function(Ae) {
                  return Ae.target.checked;
                })), this._setBackgroundColor(ce), this.container.appendChild(ce), this.container;
              }
            }]), H;
          }(Z), Se = /* @__PURE__ */ function(fe) {
            x(H, fe);
            var he = m(H);
            function H(re) {
              return K(this, H), he.call(this, re, {
                isRenderable: re.renderForms
              });
            }
            return V(H, [{
              key: "render",
              value: function() {
                var Q = this;
                this.container.className = "buttonWidgetAnnotation radioButton";
                var oe = this.annotationStorage, ne = this.data, J = ne.id, pe = oe.getValue(J, {
                  value: ne.fieldValue === ne.buttonValue
                }).value;
                typeof pe == "string" && (pe = pe !== ne.buttonValue, oe.setValue(J, {
                  value: pe
                }));
                var ce = document.createElement("input");
                if (w.add(ce), ce.disabled = ne.readOnly, ce.type = "radio", ce.name = ne.fieldName, pe && ce.setAttribute("checked", !0), ce.setAttribute("id", J), ce.tabIndex = q, ce.addEventListener("change", function(Re) {
                  var De = Re.target, Le = De.name, Te = De.checked, ze = y(Q._getElementsByName(Le, J)), xe;
                  try {
                    for (ze.s(); !(xe = ze.n()).done; ) {
                      var Oe = xe.value;
                      oe.setValue(Oe.id, {
                        value: !1
                      });
                    }
                  } catch (Be) {
                    ze.e(Be);
                  } finally {
                    ze.f();
                  }
                  oe.setValue(J, {
                    value: Te
                  });
                }), ce.addEventListener("resetform", function(Re) {
                  var De = ne.defaultFieldValue;
                  Re.target.checked = De != null && De === ne.buttonValue;
                }), this.enableScripting && this.hasJSActions) {
                  var Ae = ne.buttonValue;
                  ce.addEventListener("updatefromsandbox", function(Re) {
                    var De = {
                      value: function(Te) {
                        var ze = Ae === Te.detail.value, xe = y(Q._getElementsByName(Te.target.name)), Oe;
                        try {
                          for (xe.s(); !(Oe = xe.n()).done; ) {
                            var Be = Oe.value, Ne = ze && Be.id === J;
                            Be.domElement && (Be.domElement.checked = Ne), oe.setValue(Be.id, {
                              value: Ne
                            });
                          }
                        } catch ($e) {
                          xe.e($e);
                        } finally {
                          xe.f();
                        }
                      }
                    };
                    Q._dispatchEventFromSandbox(De, Re);
                  }), this._setEventListeners(ce, [["change", "Validate"], ["change", "Action"], ["focus", "Focus"], ["blur", "Blur"], ["mousedown", "Mouse Down"], ["mouseenter", "Mouse Enter"], ["mouseleave", "Mouse Exit"], ["mouseup", "Mouse Up"]], function(Re) {
                    return Re.target.checked;
                  });
                }
                return this._setBackgroundColor(ce), this.container.appendChild(ce), this.container;
              }
            }]), H;
          }(Z), _e = /* @__PURE__ */ function(fe) {
            x(H, fe);
            var he = m(H);
            function H(re) {
              return K(this, H), he.call(this, re, {
                ignoreBorder: re.data.hasAppearance
              });
            }
            return V(H, [{
              key: "render",
              value: function() {
                var Q = A(S(H.prototype), "render", this).call(this);
                return Q.className = "buttonWidgetAnnotation pushButton", this.data.alternativeText && (Q.title = this.data.alternativeText), Q;
              }
            }]), H;
          }(F), j = /* @__PURE__ */ function(fe) {
            x(H, fe);
            var he = m(H);
            function H(re) {
              return K(this, H), he.call(this, re, {
                isRenderable: re.renderForms
              });
            }
            return V(H, [{
              key: "render",
              value: function() {
                var Q = this;
                this.container.className = "choiceWidgetAnnotation";
                var oe = this.annotationStorage, ne = this.data.id;
                oe.getValue(ne, {
                  value: this.data.fieldValue.length > 0 ? this.data.fieldValue[0] : void 0
                });
                var J = this.data.defaultAppearanceData.fontSize;
                J || (J = 9);
                var pe = "calc(".concat(J, "px * var(--zoom-factor))"), ce = document.createElement("select");
                w.add(ce), ce.disabled = this.data.readOnly, ce.name = this.data.fieldName, ce.setAttribute("id", ne), ce.tabIndex = q, ce.style.fontSize = "".concat(J, "px"), this.data.combo || (ce.size = this.data.options.length, this.data.multiSelect && (ce.multiple = !0)), ce.addEventListener("resetform", function(xe) {
                  var Oe = Q.data.defaultFieldValue, Be = y(ce.options), Ne;
                  try {
                    for (Be.s(); !(Ne = Be.n()).done; ) {
                      var $e = Ne.value;
                      $e.selected = $e.value === Oe;
                    }
                  } catch (Xe) {
                    Be.e(Xe);
                  } finally {
                    Be.f();
                  }
                });
                var Ae = y(this.data.options), Re;
                try {
                  for (Ae.s(); !(Re = Ae.n()).done; ) {
                    var De = Re.value, Le = document.createElement("option");
                    Le.textContent = De.displayValue, Le.value = De.exportValue, this.data.combo && (Le.style.fontSize = pe), this.data.fieldValue.includes(De.exportValue) && Le.setAttribute("selected", !0), ce.appendChild(Le);
                  }
                } catch (xe) {
                  Ae.e(xe);
                } finally {
                  Ae.f();
                }
                var Te = function(Oe, Be) {
                  var Ne = Be ? "value" : "textContent", $e = Oe.target.options;
                  return Oe.target.multiple ? Array.prototype.filter.call($e, function(Xe) {
                    return Xe.selected;
                  }).map(function(Xe) {
                    return Xe[Ne];
                  }) : $e.selectedIndex === -1 ? null : $e[$e.selectedIndex][Ne];
                }, ze = function(Oe) {
                  var Be = Oe.target.options;
                  return Array.prototype.map.call(Be, function(Ne) {
                    return {
                      displayValue: Ne.textContent,
                      exportValue: Ne.value
                    };
                  });
                };
                return this.enableScripting && this.hasJSActions ? (ce.addEventListener("updatefromsandbox", function(xe) {
                  var Oe = {
                    value: function(Ne) {
                      var $e = Ne.detail.value, Xe = new Set(Array.isArray($e) ? $e : [$e]), Je = y(ce.options), rt;
                      try {
                        for (Je.s(); !(rt = Je.n()).done; ) {
                          var it = rt.value;
                          it.selected = Xe.has(it.value);
                        }
                      } catch (mt) {
                        Je.e(mt);
                      } finally {
                        Je.f();
                      }
                      oe.setValue(ne, {
                        value: Te(Ne, !0)
                      });
                    },
                    multipleSelection: function(Ne) {
                      ce.multiple = !0;
                    },
                    remove: function(Ne) {
                      var $e = ce.options, Xe = Ne.detail.remove;
                      if ($e[Xe].selected = !1, ce.remove(Xe), $e.length > 0) {
                        var Je = Array.prototype.findIndex.call($e, function(rt) {
                          return rt.selected;
                        });
                        Je === -1 && ($e[0].selected = !0);
                      }
                      oe.setValue(ne, {
                        value: Te(Ne, !0),
                        items: ze(Ne)
                      });
                    },
                    clear: function(Ne) {
                      for (; ce.length !== 0; )
                        ce.remove(0);
                      oe.setValue(ne, {
                        value: null,
                        items: []
                      });
                    },
                    insert: function(Ne) {
                      var $e = Ne.detail.insert, Xe = $e.index, Je = $e.displayValue, rt = $e.exportValue, it = document.createElement("option");
                      it.textContent = Je, it.value = rt, ce.insertBefore(it, ce.children[Xe]), oe.setValue(ne, {
                        value: Te(Ne, !0),
                        items: ze(Ne)
                      });
                    },
                    items: function(Ne) {
                      for (var $e = Ne.detail.items; ce.length !== 0; )
                        ce.remove(0);
                      var Xe = y($e), Je;
                      try {
                        for (Xe.s(); !(Je = Xe.n()).done; ) {
                          var rt = Je.value, it = rt.displayValue, mt = rt.exportValue, ht = document.createElement("option");
                          ht.textContent = it, ht.value = mt, ce.appendChild(ht);
                        }
                      } catch (kt) {
                        Xe.e(kt);
                      } finally {
                        Xe.f();
                      }
                      ce.options.length > 0 && (ce.options[0].selected = !0), oe.setValue(ne, {
                        value: Te(Ne, !0),
                        items: ze(Ne)
                      });
                    },
                    indices: function(Ne) {
                      var $e = new Set(Ne.detail.indices), Xe = y(Ne.target.options), Je;
                      try {
                        for (Xe.s(); !(Je = Xe.n()).done; ) {
                          var rt = Je.value;
                          rt.selected = $e.has(rt.index);
                        }
                      } catch (it) {
                        Xe.e(it);
                      } finally {
                        Xe.f();
                      }
                      oe.setValue(ne, {
                        value: Te(Ne, !0)
                      });
                    },
                    editable: function(Ne) {
                      Ne.target.disabled = !Ne.detail.editable;
                    }
                  };
                  Q._dispatchEventFromSandbox(Oe, xe);
                }), ce.addEventListener("input", function(xe) {
                  var Oe, Be = Te(xe, !0), Ne = Te(xe, !1);
                  oe.setValue(ne, {
                    value: Be
                  }), (Oe = Q.linkService.eventBus) === null || Oe === void 0 || Oe.dispatch("dispatcheventinsandbox", {
                    source: Q,
                    detail: {
                      id: ne,
                      name: "Keystroke",
                      value: Ne,
                      changeEx: Be,
                      willCommit: !0,
                      commitKey: 1,
                      keyDown: !1
                    }
                  });
                }), this._setEventListeners(ce, [["focus", "Focus"], ["blur", "Blur"], ["mousedown", "Mouse Down"], ["mouseenter", "Mouse Enter"], ["mouseleave", "Mouse Exit"], ["mouseup", "Mouse Up"], ["input", "Action"]], function(xe) {
                  return xe.target.checked;
                })) : ce.addEventListener("input", function(xe) {
                  oe.setValue(ne, {
                    value: Te(xe)
                  });
                }), this._setBackgroundColor(ce), this.container.appendChild(ce), this.container;
              }
            }]), H;
          }(Z), D = /* @__PURE__ */ function(fe) {
            x(H, fe);
            var he = m(H);
            function H(re) {
              var Q, oe, ne;
              K(this, H);
              var J = !!((Q = re.data.titleObj) !== null && Q !== void 0 && Q.str || (oe = re.data.contentsObj) !== null && oe !== void 0 && oe.str || (ne = re.data.richText) !== null && ne !== void 0 && ne.str);
              return he.call(this, re, {
                isRenderable: J
              });
            }
            return V(H, [{
              key: "render",
              value: function() {
                var Q = ["Line", "Square", "Circle", "PolyLine", "Polygon", "Ink"];
                if (this.container.className = "popupAnnotation", Q.includes(this.data.parentType))
                  return this.container;
                var oe = '[data-annotation-id="'.concat(this.data.parentId, '"]'), ne = this.layer.querySelectorAll(oe);
                if (ne.length === 0)
                  return this.container;
                var J = new h({
                  container: this.container,
                  trigger: Array.from(ne),
                  color: this.data.color,
                  titleObj: this.data.titleObj,
                  modificationDate: this.data.modificationDate,
                  contentsObj: this.data.contentsObj,
                  richText: this.data.richText
                }), pe = this.page, ce = a.Util.normalizeRect([this.data.parentRect[0], pe.view[3] - this.data.parentRect[1] + pe.view[1], this.data.parentRect[2], pe.view[3] - this.data.parentRect[3] + pe.view[1]]), Ae = ce[0] + this.data.parentRect[2] - this.data.parentRect[0], Re = ce[1];
                return this.container.style.transformOrigin = "".concat(-Ae, "px ").concat(-Re, "px"), this.container.style.left = "".concat(Ae, "px"), this.container.style.top = "".concat(Re, "px"), this.container.appendChild(J.render()), this.container;
              }
            }]), H;
          }(P), h = /* @__PURE__ */ function() {
            function fe(he) {
              K(this, fe), this.container = he.container, this.trigger = he.trigger, this.color = he.color, this.titleObj = he.titleObj, this.modificationDate = he.modificationDate, this.contentsObj = he.contentsObj, this.richText = he.richText, this.hideWrapper = he.hideWrapper || !1, this.pinned = !1;
            }
            return V(fe, [{
              key: "render",
              value: function() {
                var H, re, Q = 0.7, oe = document.createElement("div");
                oe.className = "popupWrapper", this.hideElement = this.hideWrapper ? oe : this.container, this.hideElement.hidden = !0;
                var ne = document.createElement("div");
                ne.className = "popup";
                var J = this.color;
                if (J) {
                  var pe = Q * (255 - J[0]) + J[0], ce = Q * (255 - J[1]) + J[1], Ae = Q * (255 - J[2]) + J[2];
                  ne.style.backgroundColor = a.Util.makeHexColor(pe | 0, ce | 0, Ae | 0);
                }
                var Re = document.createElement("h1");
                Re.dir = this.titleObj.dir, Re.textContent = this.titleObj.str, ne.appendChild(Re);
                var De = i.PDFDateString.toDateObject(this.modificationDate);
                if (De) {
                  var Le = document.createElement("span");
                  Le.className = "popupDate", Le.textContent = "{{date}}, {{time}}", Le.dataset.l10nId = "annotation_date_string", Le.dataset.l10nArgs = JSON.stringify({
                    date: De.toLocaleDateString(),
                    time: De.toLocaleTimeString()
                  }), ne.appendChild(Le);
                }
                if ((H = this.richText) !== null && H !== void 0 && H.str && (!((re = this.contentsObj) !== null && re !== void 0 && re.str) || this.contentsObj.str === this.richText.str))
                  c.XfaLayer.render({
                    xfaHtml: this.richText.html,
                    intent: "richText",
                    div: ne
                  }), ne.lastChild.className = "richText popupContent";
                else {
                  var Te = this._formatContents(this.contentsObj);
                  ne.appendChild(Te);
                }
                Array.isArray(this.trigger) || (this.trigger = [this.trigger]);
                var ze = y(this.trigger), xe;
                try {
                  for (ze.s(); !(xe = ze.n()).done; ) {
                    var Oe = xe.value;
                    Oe.addEventListener("click", this._toggle.bind(this)), Oe.addEventListener("mouseover", this._show.bind(this, !1)), Oe.addEventListener("mouseout", this._hide.bind(this, !1));
                  }
                } catch (Be) {
                  ze.e(Be);
                } finally {
                  ze.f();
                }
                return ne.addEventListener("click", this._hide.bind(this, !0)), oe.appendChild(ne), oe;
              }
            }, {
              key: "_formatContents",
              value: function(H) {
                var re = H.str, Q = H.dir, oe = document.createElement("p");
                oe.className = "popupContent", oe.dir = Q;
                for (var ne = re.split(/(?:\r\n?|\n)/), J = 0, pe = ne.length; J < pe; ++J) {
                  var ce = ne[J];
                  oe.appendChild(document.createTextNode(ce)), J < pe - 1 && oe.appendChild(document.createElement("br"));
                }
                return oe;
              }
            }, {
              key: "_toggle",
              value: function() {
                this.pinned ? this._hide(!0) : this._show(!0);
              }
            }, {
              key: "_show",
              value: function() {
                var H = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : !1;
                H && (this.pinned = !0), this.hideElement.hidden && (this.hideElement.hidden = !1, this.container.style.zIndex += 1);
              }
            }, {
              key: "_hide",
              value: function() {
                var H = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : !0;
                H && (this.pinned = !1), !this.hideElement.hidden && !this.pinned && (this.hideElement.hidden = !0, this.container.style.zIndex -= 1);
              }
            }]), fe;
          }(), d = /* @__PURE__ */ function(fe) {
            x(H, fe);
            var he = m(H);
            function H(re) {
              var Q, oe, ne;
              K(this, H);
              var J = !!(re.data.hasPopup || (Q = re.data.titleObj) !== null && Q !== void 0 && Q.str || (oe = re.data.contentsObj) !== null && oe !== void 0 && oe.str || (ne = re.data.richText) !== null && ne !== void 0 && ne.str);
              return he.call(this, re, {
                isRenderable: J,
                ignoreBorder: !0
              });
            }
            return V(H, [{
              key: "render",
              value: function() {
                return this.container.className = "freeTextAnnotation", this.data.hasPopup || this._createPopup(null, this.data), this.container;
              }
            }]), H;
          }(P), T = /* @__PURE__ */ function(fe) {
            x(H, fe);
            var he = m(H);
            function H(re) {
              var Q, oe, ne;
              K(this, H);
              var J = !!(re.data.hasPopup || (Q = re.data.titleObj) !== null && Q !== void 0 && Q.str || (oe = re.data.contentsObj) !== null && oe !== void 0 && oe.str || (ne = re.data.richText) !== null && ne !== void 0 && ne.str);
              return he.call(this, re, {
                isRenderable: J,
                ignoreBorder: !0
              });
            }
            return V(H, [{
              key: "render",
              value: function() {
                this.container.className = "lineAnnotation";
                var Q = this.data, oe = Q.rect[2] - Q.rect[0], ne = Q.rect[3] - Q.rect[1], J = this.svgFactory.create(oe, ne), pe = this.svgFactory.createElement("svg:line");
                return pe.setAttribute("x1", Q.rect[2] - Q.lineCoordinates[0]), pe.setAttribute("y1", Q.rect[3] - Q.lineCoordinates[1]), pe.setAttribute("x2", Q.rect[2] - Q.lineCoordinates[2]), pe.setAttribute("y2", Q.rect[3] - Q.lineCoordinates[3]), pe.setAttribute("stroke-width", Q.borderStyle.width || 1), pe.setAttribute("stroke", "transparent"), pe.setAttribute("fill", "transparent"), J.appendChild(pe), this.container.append(J), this._createPopup(pe, Q), this.container;
              }
            }]), H;
          }(P), B = /* @__PURE__ */ function(fe) {
            x(H, fe);
            var he = m(H);
            function H(re) {
              var Q, oe, ne;
              K(this, H);
              var J = !!(re.data.hasPopup || (Q = re.data.titleObj) !== null && Q !== void 0 && Q.str || (oe = re.data.contentsObj) !== null && oe !== void 0 && oe.str || (ne = re.data.richText) !== null && ne !== void 0 && ne.str);
              return he.call(this, re, {
                isRenderable: J,
                ignoreBorder: !0
              });
            }
            return V(H, [{
              key: "render",
              value: function() {
                this.container.className = "squareAnnotation";
                var Q = this.data, oe = Q.rect[2] - Q.rect[0], ne = Q.rect[3] - Q.rect[1], J = this.svgFactory.create(oe, ne), pe = Q.borderStyle.width, ce = this.svgFactory.createElement("svg:rect");
                return ce.setAttribute("x", pe / 2), ce.setAttribute("y", pe / 2), ce.setAttribute("width", oe - pe), ce.setAttribute("height", ne - pe), ce.setAttribute("stroke-width", pe || 1), ce.setAttribute("stroke", "transparent"), ce.setAttribute("fill", "transparent"), J.appendChild(ce), this.container.append(J), this._createPopup(ce, Q), this.container;
              }
            }]), H;
          }(P), z = /* @__PURE__ */ function(fe) {
            x(H, fe);
            var he = m(H);
            function H(re) {
              var Q, oe, ne;
              K(this, H);
              var J = !!(re.data.hasPopup || (Q = re.data.titleObj) !== null && Q !== void 0 && Q.str || (oe = re.data.contentsObj) !== null && oe !== void 0 && oe.str || (ne = re.data.richText) !== null && ne !== void 0 && ne.str);
              return he.call(this, re, {
                isRenderable: J,
                ignoreBorder: !0
              });
            }
            return V(H, [{
              key: "render",
              value: function() {
                this.container.className = "circleAnnotation";
                var Q = this.data, oe = Q.rect[2] - Q.rect[0], ne = Q.rect[3] - Q.rect[1], J = this.svgFactory.create(oe, ne), pe = Q.borderStyle.width, ce = this.svgFactory.createElement("svg:ellipse");
                return ce.setAttribute("cx", oe / 2), ce.setAttribute("cy", ne / 2), ce.setAttribute("rx", oe / 2 - pe / 2), ce.setAttribute("ry", ne / 2 - pe / 2), ce.setAttribute("stroke-width", pe || 1), ce.setAttribute("stroke", "transparent"), ce.setAttribute("fill", "transparent"), J.appendChild(ce), this.container.append(J), this._createPopup(ce, Q), this.container;
              }
            }]), H;
          }(P), ee = /* @__PURE__ */ function(fe) {
            x(H, fe);
            var he = m(H);
            function H(re) {
              var Q, oe, ne, J;
              K(this, H);
              var pe = !!(re.data.hasPopup || (Q = re.data.titleObj) !== null && Q !== void 0 && Q.str || (oe = re.data.contentsObj) !== null && oe !== void 0 && oe.str || (ne = re.data.richText) !== null && ne !== void 0 && ne.str);
              return J = he.call(this, re, {
                isRenderable: pe,
                ignoreBorder: !0
              }), J.containerClassName = "polylineAnnotation", J.svgElementName = "svg:polyline", J;
            }
            return V(H, [{
              key: "render",
              value: function() {
                this.container.className = this.containerClassName;
                var Q = this.data, oe = Q.rect[2] - Q.rect[0], ne = Q.rect[3] - Q.rect[1], J = this.svgFactory.create(oe, ne), pe = [], ce = y(Q.vertices), Ae;
                try {
                  for (ce.s(); !(Ae = ce.n()).done; ) {
                    var Re = Ae.value, De = Re.x - Q.rect[0], Le = Q.rect[3] - Re.y;
                    pe.push(De + "," + Le);
                  }
                } catch (ze) {
                  ce.e(ze);
                } finally {
                  ce.f();
                }
                pe = pe.join(" ");
                var Te = this.svgFactory.createElement(this.svgElementName);
                return Te.setAttribute("points", pe), Te.setAttribute("stroke-width", Q.borderStyle.width || 1), Te.setAttribute("stroke", "transparent"), Te.setAttribute("fill", "transparent"), J.appendChild(Te), this.container.append(J), this._createPopup(Te, Q), this.container;
              }
            }]), H;
          }(P), le = /* @__PURE__ */ function(fe) {
            x(H, fe);
            var he = m(H);
            function H(re) {
              var Q;
              return K(this, H), Q = he.call(this, re), Q.containerClassName = "polygonAnnotation", Q.svgElementName = "svg:polygon", Q;
            }
            return H;
          }(ee), ve = /* @__PURE__ */ function(fe) {
            x(H, fe);
            var he = m(H);
            function H(re) {
              var Q, oe, ne;
              K(this, H);
              var J = !!(re.data.hasPopup || (Q = re.data.titleObj) !== null && Q !== void 0 && Q.str || (oe = re.data.contentsObj) !== null && oe !== void 0 && oe.str || (ne = re.data.richText) !== null && ne !== void 0 && ne.str);
              return he.call(this, re, {
                isRenderable: J,
                ignoreBorder: !0
              });
            }
            return V(H, [{
              key: "render",
              value: function() {
                return this.container.className = "caretAnnotation", this.data.hasPopup || this._createPopup(null, this.data), this.container;
              }
            }]), H;
          }(P), ye = /* @__PURE__ */ function(fe) {
            x(H, fe);
            var he = m(H);
            function H(re) {
              var Q, oe, ne, J;
              K(this, H);
              var pe = !!(re.data.hasPopup || (Q = re.data.titleObj) !== null && Q !== void 0 && Q.str || (oe = re.data.contentsObj) !== null && oe !== void 0 && oe.str || (ne = re.data.richText) !== null && ne !== void 0 && ne.str);
              return J = he.call(this, re, {
                isRenderable: pe,
                ignoreBorder: !0
              }), J.containerClassName = "inkAnnotation", J.svgElementName = "svg:polyline", J;
            }
            return V(H, [{
              key: "render",
              value: function() {
                this.container.className = this.containerClassName;
                var Q = this.data, oe = Q.rect[2] - Q.rect[0], ne = Q.rect[3] - Q.rect[1], J = this.svgFactory.create(oe, ne), pe = y(Q.inkLists), ce;
                try {
                  for (pe.s(); !(ce = pe.n()).done; ) {
                    var Ae = ce.value, Re = [], De = y(Ae), Le;
                    try {
                      for (De.s(); !(Le = De.n()).done; ) {
                        var Te = Le.value, ze = Te.x - Q.rect[0], xe = Q.rect[3] - Te.y;
                        Re.push("".concat(ze, ",").concat(xe));
                      }
                    } catch (Be) {
                      De.e(Be);
                    } finally {
                      De.f();
                    }
                    Re = Re.join(" ");
                    var Oe = this.svgFactory.createElement(this.svgElementName);
                    Oe.setAttribute("points", Re), Oe.setAttribute("stroke-width", Q.borderStyle.width || 1), Oe.setAttribute("stroke", "transparent"), Oe.setAttribute("fill", "transparent"), this._createPopup(Oe, Q), J.appendChild(Oe);
                  }
                } catch (Be) {
                  pe.e(Be);
                } finally {
                  pe.f();
                }
                return this.container.append(J), this.container;
              }
            }]), H;
          }(P), me = /* @__PURE__ */ function(fe) {
            x(H, fe);
            var he = m(H);
            function H(re) {
              var Q, oe, ne;
              K(this, H);
              var J = !!(re.data.hasPopup || (Q = re.data.titleObj) !== null && Q !== void 0 && Q.str || (oe = re.data.contentsObj) !== null && oe !== void 0 && oe.str || (ne = re.data.richText) !== null && ne !== void 0 && ne.str);
              return he.call(this, re, {
                isRenderable: J,
                ignoreBorder: !0,
                createQuadrilaterals: !0
              });
            }
            return V(H, [{
              key: "render",
              value: function() {
                return this.data.hasPopup || this._createPopup(null, this.data), this.quadrilaterals ? this._renderQuadrilaterals("highlightAnnotation") : (this.container.className = "highlightAnnotation", this.container);
              }
            }]), H;
          }(P), we = /* @__PURE__ */ function(fe) {
            x(H, fe);
            var he = m(H);
            function H(re) {
              var Q, oe, ne;
              K(this, H);
              var J = !!(re.data.hasPopup || (Q = re.data.titleObj) !== null && Q !== void 0 && Q.str || (oe = re.data.contentsObj) !== null && oe !== void 0 && oe.str || (ne = re.data.richText) !== null && ne !== void 0 && ne.str);
              return he.call(this, re, {
                isRenderable: J,
                ignoreBorder: !0,
                createQuadrilaterals: !0
              });
            }
            return V(H, [{
              key: "render",
              value: function() {
                return this.data.hasPopup || this._createPopup(null, this.data), this.quadrilaterals ? this._renderQuadrilaterals("underlineAnnotation") : (this.container.className = "underlineAnnotation", this.container);
              }
            }]), H;
          }(P), Pe = /* @__PURE__ */ function(fe) {
            x(H, fe);
            var he = m(H);
            function H(re) {
              var Q, oe, ne;
              K(this, H);
              var J = !!(re.data.hasPopup || (Q = re.data.titleObj) !== null && Q !== void 0 && Q.str || (oe = re.data.contentsObj) !== null && oe !== void 0 && oe.str || (ne = re.data.richText) !== null && ne !== void 0 && ne.str);
              return he.call(this, re, {
                isRenderable: J,
                ignoreBorder: !0,
                createQuadrilaterals: !0
              });
            }
            return V(H, [{
              key: "render",
              value: function() {
                return this.data.hasPopup || this._createPopup(null, this.data), this.quadrilaterals ? this._renderQuadrilaterals("squigglyAnnotation") : (this.container.className = "squigglyAnnotation", this.container);
              }
            }]), H;
          }(P), Ee = /* @__PURE__ */ function(fe) {
            x(H, fe);
            var he = m(H);
            function H(re) {
              var Q, oe, ne;
              K(this, H);
              var J = !!(re.data.hasPopup || (Q = re.data.titleObj) !== null && Q !== void 0 && Q.str || (oe = re.data.contentsObj) !== null && oe !== void 0 && oe.str || (ne = re.data.richText) !== null && ne !== void 0 && ne.str);
              return he.call(this, re, {
                isRenderable: J,
                ignoreBorder: !0,
                createQuadrilaterals: !0
              });
            }
            return V(H, [{
              key: "render",
              value: function() {
                return this.data.hasPopup || this._createPopup(null, this.data), this.quadrilaterals ? this._renderQuadrilaterals("strikeoutAnnotation") : (this.container.className = "strikeoutAnnotation", this.container);
              }
            }]), H;
          }(P), Fe = /* @__PURE__ */ function(fe) {
            x(H, fe);
            var he = m(H);
            function H(re) {
              var Q, oe, ne;
              K(this, H);
              var J = !!(re.data.hasPopup || (Q = re.data.titleObj) !== null && Q !== void 0 && Q.str || (oe = re.data.contentsObj) !== null && oe !== void 0 && oe.str || (ne = re.data.richText) !== null && ne !== void 0 && ne.str);
              return he.call(this, re, {
                isRenderable: J,
                ignoreBorder: !0
              });
            }
            return V(H, [{
              key: "render",
              value: function() {
                return this.container.className = "stampAnnotation", this.data.hasPopup || this._createPopup(null, this.data), this.container;
              }
            }]), H;
          }(P), Ie = /* @__PURE__ */ function(fe) {
            x(H, fe);
            var he = m(H);
            function H(re) {
              var Q, oe;
              K(this, H), oe = he.call(this, re, {
                isRenderable: !0
              });
              var ne = oe.data.file, J = ne.filename, pe = ne.content;
              return oe.filename = (0, i.getFilenameFromUrl)(J), oe.content = pe, (Q = oe.linkService.eventBus) === null || Q === void 0 || Q.dispatch("fileattachmentannotation", {
                source: v(oe),
                id: (0, a.stringToPDFString)(J),
                filename: J,
                content: pe
              }), oe;
            }
            return V(H, [{
              key: "render",
              value: function() {
                var Q, oe;
                this.container.className = "fileAttachmentAnnotation";
                var ne = document.createElement("div");
                return ne.style.height = this.container.style.height, ne.style.width = this.container.style.width, ne.addEventListener("dblclick", this._download.bind(this)), !this.data.hasPopup && ((Q = this.data.titleObj) !== null && Q !== void 0 && Q.str || (oe = this.data.contentsObj) !== null && oe !== void 0 && oe.str || this.data.richText) && this._createPopup(ne, this.data), this.container.appendChild(ne), this.container;
              }
            }, {
              key: "_download",
              value: function() {
                var Q;
                (Q = this.downloadManager) === null || Q === void 0 || Q.openOrDownloadData(this.container, this.content, this.filename);
              }
            }]), H;
          }(P), We = /* @__PURE__ */ function() {
            function fe() {
              K(this, fe);
            }
            return V(fe, null, [{
              key: "render",
              value: function(H) {
                var re = [], Q = [], oe = y(H.annotations), ne;
                try {
                  for (oe.s(); !(ne = oe.n()).done; ) {
                    var J = ne.value;
                    if (!!J) {
                      if (J.annotationType === a.AnnotationType.POPUP) {
                        Q.push(J);
                        continue;
                      }
                      re.push(J);
                    }
                  }
                } catch (Oe) {
                  oe.e(Oe);
                } finally {
                  oe.f();
                }
                Q.length && re.push.apply(re, Q);
                for (var pe = H.div, ce = 0, Ae = re; ce < Ae.length; ce++) {
                  var Re = Ae[ce], De = p.create({
                    data: Re,
                    layer: pe,
                    page: H.page,
                    viewport: H.viewport,
                    linkService: H.linkService,
                    downloadManager: H.downloadManager,
                    imageResourcesPath: H.imageResourcesPath || "",
                    renderForms: H.renderForms !== !1,
                    svgFactory: new i.DOMSVGFactory(),
                    annotationStorage: H.annotationStorage || new s.AnnotationStorage(),
                    enableScripting: H.enableScripting,
                    hasJSActions: H.hasJSActions,
                    fieldObjects: H.fieldObjects,
                    mouseState: H.mouseState || {
                      isDown: !1
                    }
                  });
                  if (De.isRenderable) {
                    var Le = De.render();
                    if (Re.hidden && (Le.style.visibility = "hidden"), Array.isArray(Le)) {
                      var Te = y(Le), ze;
                      try {
                        for (Te.s(); !(ze = Te.n()).done; ) {
                          var xe = ze.value;
                          pe.appendChild(xe);
                        }
                      } catch (Oe) {
                        Te.e(Oe);
                      } finally {
                        Te.f();
                      }
                    } else
                      De instanceof D ? pe.prepend(Le) : pe.appendChild(Le);
                  }
                }
                g(this, fe, je).call(this, pe, H.annotationCanvasMap);
              }
            }, {
              key: "update",
              value: function(H) {
                var re = H.page, Q = H.viewport, oe = H.annotations, ne = H.annotationCanvasMap, J = H.div, pe = Q.transform, ce = "matrix(".concat(pe.join(","), ")"), Ae, Re, De = y(oe), Le;
                try {
                  for (De.s(); !(Le = De.n()).done; ) {
                    var Te = Le.value, ze = J.querySelectorAll('[data-annotation-id="'.concat(Te.id, '"]'));
                    if (ze) {
                      var xe = y(ze), Oe;
                      try {
                        for (xe.s(); !(Oe = xe.n()).done; ) {
                          var Be = Oe.value;
                          if (Te.hasOwnCanvas) {
                            var Ne = a.Util.normalizeRect([Te.rect[0], re.view[3] - Te.rect[1] + re.view[1], Te.rect[2], re.view[3] - Te.rect[3] + re.view[1]]);
                            if (!Re) {
                              Ae = Math.abs(pe[0] || pe[1]);
                              for (var $e = pe.slice(), Xe = 0; Xe < 4; Xe++)
                                $e[Xe] = Math.sign($e[Xe]);
                              Re = "matrix(".concat($e.join(","), ")");
                            }
                            var Je = Ne[0] * Ae, rt = Ne[1] * Ae;
                            Be.style.left = "".concat(Je, "px"), Be.style.top = "".concat(rt, "px"), Be.style.transformOrigin = "".concat(-Je, "px ").concat(-rt, "px"), Be.style.transform = Re;
                          } else
                            Be.style.transform = ce;
                        }
                      } catch (it) {
                        xe.e(it);
                      } finally {
                        xe.f();
                      }
                    }
                  }
                } catch (it) {
                  De.e(it);
                } finally {
                  De.f();
                }
                g(this, fe, je).call(this, J, ne), J.hidden = !1;
              }
            }]), fe;
          }();
          r.AnnotationLayer = We;
          function je(fe, he) {
            if (!!he) {
              var H = y(he), re;
              try {
                for (H.s(); !(re = H.n()).done; ) {
                  var Q = R(re.value, 2), oe = Q[0], ne = Q[1], J = fe.querySelector('[data-annotation-id="'.concat(oe, '"]'));
                  if (!!J) {
                    var pe = J.firstChild;
                    pe.nodeName === "CANVAS" ? J.replaceChild(ne, pe) : J.insertBefore(ne, pe);
                  }
                }
              } catch (ce) {
                H.e(ce);
              } finally {
                H.f();
              }
              he.clear();
            }
          }
        },
        (n, r) => {
          Object.defineProperty(r, "__esModule", {
            value: !0
          }), r.ColorConverters = void 0;
          function e(C, E) {
            return u(C) || s(C, E) || a(C, E) || t();
          }
          function t() {
            throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
          }
          function a(C, E) {
            if (!!C) {
              if (typeof C == "string")
                return i(C, E);
              var O = Object.prototype.toString.call(C).slice(8, -1);
              if (O === "Object" && C.constructor && (O = C.constructor.name), O === "Map" || O === "Set")
                return Array.from(C);
              if (O === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(O))
                return i(C, E);
            }
          }
          function i(C, E) {
            (E == null || E > C.length) && (E = C.length);
            for (var O = 0, k = new Array(E); O < E; O++)
              k[O] = C[O];
            return k;
          }
          function s(C, E) {
            var O = C == null ? null : typeof Symbol < "u" && C[Symbol.iterator] || C["@@iterator"];
            if (O != null) {
              var k = [], N = !0, x = !1, U, m;
              try {
                for (O = O.call(C); !(N = (U = O.next()).done) && (k.push(U.value), !(E && k.length === E)); N = !0)
                  ;
              } catch (f) {
                x = !0, m = f;
              } finally {
                try {
                  !N && O.return != null && O.return();
                } finally {
                  if (x)
                    throw m;
                }
              }
              return k;
            }
          }
          function u(C) {
            if (Array.isArray(C))
              return C;
          }
          function c(C, E) {
            if (!(C instanceof E))
              throw new TypeError("Cannot call a class as a function");
          }
          function g(C, E) {
            for (var O = 0; O < E.length; O++) {
              var k = E[O];
              k.enumerable = k.enumerable || !1, k.configurable = !0, "value" in k && (k.writable = !0), Object.defineProperty(C, k.key, k);
            }
          }
          function b(C, E, O) {
            return E && g(C.prototype, E), O && g(C, O), C;
          }
          function A(C) {
            return Math.floor(Math.max(0, Math.min(1, C)) * 255).toString(16).padStart(2, "0");
          }
          var I = /* @__PURE__ */ function() {
            function C() {
              c(this, C);
            }
            return b(C, null, [{
              key: "CMYK_G",
              value: function(O) {
                var k = e(O, 4), N = k[0], x = k[1], U = k[2], m = k[3];
                return ["G", 1 - Math.min(1, 0.3 * N + 0.59 * U + 0.11 * x + m)];
              }
            }, {
              key: "G_CMYK",
              value: function(O) {
                var k = e(O, 1), N = k[0];
                return ["CMYK", 0, 0, 0, 1 - N];
              }
            }, {
              key: "G_RGB",
              value: function(O) {
                var k = e(O, 1), N = k[0];
                return ["RGB", N, N, N];
              }
            }, {
              key: "G_HTML",
              value: function(O) {
                var k = e(O, 1), N = k[0], x = A(N);
                return "#".concat(x).concat(x).concat(x);
              }
            }, {
              key: "RGB_G",
              value: function(O) {
                var k = e(O, 3), N = k[0], x = k[1], U = k[2];
                return ["G", 0.3 * N + 0.59 * x + 0.11 * U];
              }
            }, {
              key: "RGB_HTML",
              value: function(O) {
                var k = e(O, 3), N = k[0], x = k[1], U = k[2], m = A(N), f = A(x), v = A(U);
                return "#".concat(m).concat(f).concat(v);
              }
            }, {
              key: "T_HTML",
              value: function() {
                return "#00000000";
              }
            }, {
              key: "CMYK_RGB",
              value: function(O) {
                var k = e(O, 4), N = k[0], x = k[1], U = k[2], m = k[3];
                return ["RGB", 1 - Math.min(1, N + m), 1 - Math.min(1, U + m), 1 - Math.min(1, x + m)];
              }
            }, {
              key: "CMYK_HTML",
              value: function(O) {
                return this.RGB_HTML(this.CMYK_RGB(O));
              }
            }, {
              key: "RGB_CMYK",
              value: function(O) {
                var k = e(O, 3), N = k[0], x = k[1], U = k[2], m = 1 - N, f = 1 - x, v = 1 - U, _ = Math.min(m, f, v);
                return ["CMYK", m, f, v, _];
              }
            }]), C;
          }();
          r.ColorConverters = I;
        },
        (n, r, e) => {
          Object.defineProperty(r, "__esModule", {
            value: !0
          }), r.XfaLayer = void 0;
          var t = e(4), a = e(147);
          function i(k, N) {
            return c(k) || u(k, N) || b(k, N) || s();
          }
          function s() {
            throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
          }
          function u(k, N) {
            var x = k == null ? null : typeof Symbol < "u" && k[Symbol.iterator] || k["@@iterator"];
            if (x != null) {
              var U = [], m = !0, f = !1, v, _;
              try {
                for (x = x.call(k); !(m = (v = x.next()).done) && (U.push(v.value), !(N && U.length === N)); m = !0)
                  ;
              } catch (S) {
                f = !0, _ = S;
              } finally {
                try {
                  !m && x.return != null && x.return();
                } finally {
                  if (f)
                    throw _;
                }
              }
              return U;
            }
          }
          function c(k) {
            if (Array.isArray(k))
              return k;
          }
          function g(k, N) {
            var x = typeof Symbol < "u" && k[Symbol.iterator] || k["@@iterator"];
            if (!x) {
              if (Array.isArray(k) || (x = b(k)) || N && k && typeof k.length == "number") {
                x && (k = x);
                var U = 0, m = function() {
                };
                return { s: m, n: function() {
                  return U >= k.length ? { done: !0 } : { done: !1, value: k[U++] };
                }, e: function(y) {
                  throw y;
                }, f: m };
              }
              throw new TypeError(`Invalid attempt to iterate non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
            }
            var f = !0, v = !1, _;
            return { s: function() {
              x = x.call(k);
            }, n: function() {
              var y = x.next();
              return f = y.done, y;
            }, e: function(y) {
              v = !0, _ = y;
            }, f: function() {
              try {
                !f && x.return != null && x.return();
              } finally {
                if (v)
                  throw _;
              }
            } };
          }
          function b(k, N) {
            if (!!k) {
              if (typeof k == "string")
                return A(k, N);
              var x = Object.prototype.toString.call(k).slice(8, -1);
              if (x === "Object" && k.constructor && (x = k.constructor.name), x === "Map" || x === "Set")
                return Array.from(k);
              if (x === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(x))
                return A(k, N);
            }
          }
          function A(k, N) {
            (N == null || N > k.length) && (N = k.length);
            for (var x = 0, U = new Array(N); x < N; x++)
              U[x] = k[x];
            return U;
          }
          function I(k, N) {
            if (!(k instanceof N))
              throw new TypeError("Cannot call a class as a function");
          }
          function C(k, N) {
            for (var x = 0; x < N.length; x++) {
              var U = N[x];
              U.enumerable = U.enumerable || !1, U.configurable = !0, "value" in U && (U.writable = !0), Object.defineProperty(k, U.key, U);
            }
          }
          function E(k, N, x) {
            return N && C(k.prototype, N), x && C(k, x), k;
          }
          var O = /* @__PURE__ */ function() {
            function k() {
              I(this, k);
            }
            return E(k, null, [{
              key: "setupStorage",
              value: function(x, U, m, f, v) {
                var _ = f.getValue(U, {
                  value: null
                });
                switch (m.name) {
                  case "textarea":
                    if (_.value !== null && (x.textContent = _.value), v === "print")
                      break;
                    x.addEventListener("input", function(L) {
                      f.setValue(U, {
                        value: L.target.value
                      });
                    });
                    break;
                  case "input":
                    if (m.attributes.type === "radio" || m.attributes.type === "checkbox") {
                      if (_.value === m.attributes.xfaOn ? x.setAttribute("checked", !0) : _.value === m.attributes.xfaOff && x.removeAttribute("checked"), v === "print")
                        break;
                      x.addEventListener("change", function(L) {
                        f.setValue(U, {
                          value: L.target.checked ? L.target.getAttribute("xfaOn") : L.target.getAttribute("xfaOff")
                        });
                      });
                    } else {
                      if (_.value !== null && x.setAttribute("value", _.value), v === "print")
                        break;
                      x.addEventListener("input", function(L) {
                        f.setValue(U, {
                          value: L.target.value
                        });
                      });
                    }
                    break;
                  case "select":
                    if (_.value !== null) {
                      var S = g(m.children), y;
                      try {
                        for (S.s(); !(y = S.n()).done; ) {
                          var R = y.value;
                          R.attributes.value === _.value && (R.attributes.selected = !0);
                        }
                      } catch (L) {
                        S.e(L);
                      } finally {
                        S.f();
                      }
                    }
                    x.addEventListener("input", function(L) {
                      var $ = L.target.options, W = $.selectedIndex === -1 ? "" : $[$.selectedIndex].value;
                      f.setValue(U, {
                        value: W
                      });
                    });
                    break;
                }
              }
            }, {
              key: "setAttributes",
              value: function(x) {
                var U = x.html, m = x.element, f = x.storage, v = f === void 0 ? null : f, _ = x.intent, S = x.linkService, y = m.attributes, R = U instanceof HTMLAnchorElement;
                y.type === "radio" && (y.name = "".concat(y.name, "-").concat(_));
                for (var L = 0, $ = Object.entries(y); L < $.length; L++) {
                  var W = i($[L], 2), X = W[0], te = W[1];
                  if (!(te == null || X === "dataId"))
                    if (X !== "style")
                      if (X === "textContent")
                        U.textContent = te;
                      else if (X === "class")
                        te.length && U.setAttribute(X, te.join(" "));
                      else {
                        if (R && (X === "href" || X === "newWindow"))
                          continue;
                        U.setAttribute(X, te);
                      }
                    else
                      Object.assign(U.style, te);
                }
                if (R) {
                  var K;
                  S.addLinkAttributes || (0, t.warn)("XfaLayer.setAttribute - missing `addLinkAttributes`-method on the `linkService`-instance."), (K = S.addLinkAttributes) === null || K === void 0 || K.call(S, U, y.href, y.newWindow);
                }
                v && y.dataId && this.setupStorage(U, y.dataId, m, v);
              }
            }, {
              key: "render",
              value: function(x) {
                var U = x.annotationStorage, m = x.linkService, f = x.xfaHtml, v = x.intent || "display", _ = document.createElement(f.name);
                f.attributes && this.setAttributes({
                  html: _,
                  element: f,
                  intent: v,
                  linkService: m
                });
                var S = [[f, -1, _]], y = x.div;
                if (y.appendChild(_), x.viewport) {
                  var R = "matrix(".concat(x.viewport.transform.join(","), ")");
                  y.style.transform = R;
                }
                v !== "richText" && y.setAttribute("class", "xfaLayer xfaFont");
                for (var L = []; S.length > 0; ) {
                  var $, W = i(S[S.length - 1], 3), X = W[0], te = W[1], K = W[2];
                  if (te + 1 === X.children.length) {
                    S.pop();
                    continue;
                  }
                  var ae = X.children[++S[S.length - 1][1]];
                  if (ae !== null) {
                    var V = ae.name;
                    if (V === "#text") {
                      var q = document.createTextNode(ae.value);
                      L.push(q), K.appendChild(q);
                      continue;
                    }
                    var w = void 0;
                    if (ae != null && ($ = ae.attributes) !== null && $ !== void 0 && $.xmlns ? w = document.createElementNS(ae.attributes.xmlns, V) : w = document.createElement(V), K.appendChild(w), ae.attributes && this.setAttributes({
                      html: w,
                      element: ae,
                      storage: U,
                      intent: v,
                      linkService: m
                    }), ae.children && ae.children.length > 0)
                      S.push([ae, -1, w]);
                    else if (ae.value) {
                      var p = document.createTextNode(ae.value);
                      a.XfaText.shouldBuildText(V) && L.push(p), w.appendChild(p);
                    }
                  }
                }
                var P = g(y.querySelectorAll(".xfaNonInteractive input, .xfaNonInteractive textarea")), F;
                try {
                  for (P.s(); !(F = P.n()).done; ) {
                    var G = F.value;
                    G.setAttribute("readOnly", !0);
                  }
                } catch (Z) {
                  P.e(Z);
                } finally {
                  P.f();
                }
                return {
                  textDivs: L
                };
              }
            }, {
              key: "update",
              value: function(x) {
                var U = "matrix(".concat(x.viewport.transform.join(","), ")");
                x.div.style.transform = U, x.div.hidden = !1;
              }
            }]), k;
          }();
          r.XfaLayer = O;
        },
        (n, r, e) => {
          Object.defineProperty(r, "__esModule", {
            value: !0
          }), r.renderTextLayer = _;
          var t = e(4);
          function a(S, y) {
            if (!(S instanceof y))
              throw new TypeError("Cannot call a class as a function");
          }
          function i(S, y) {
            for (var R = 0; R < y.length; R++) {
              var L = y[R];
              L.enumerable = L.enumerable || !1, L.configurable = !0, "value" in L && (L.writable = !0), Object.defineProperty(S, L.key, L);
            }
          }
          function s(S, y, R) {
            return y && i(S.prototype, y), R && i(S, R), S;
          }
          function u(S, y) {
            var R = typeof Symbol < "u" && S[Symbol.iterator] || S["@@iterator"];
            if (!R) {
              if (Array.isArray(S) || (R = c(S)) || y && S && typeof S.length == "number") {
                R && (S = R);
                var L = 0, $ = function() {
                };
                return { s: $, n: function() {
                  return L >= S.length ? { done: !0 } : { done: !1, value: S[L++] };
                }, e: function(ae) {
                  throw ae;
                }, f: $ };
              }
              throw new TypeError(`Invalid attempt to iterate non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
            }
            var W = !0, X = !1, te;
            return { s: function() {
              R = R.call(S);
            }, n: function() {
              var ae = R.next();
              return W = ae.done, ae;
            }, e: function(ae) {
              X = !0, te = ae;
            }, f: function() {
              try {
                !W && R.return != null && R.return();
              } finally {
                if (X)
                  throw te;
              }
            } };
          }
          function c(S, y) {
            if (!!S) {
              if (typeof S == "string")
                return g(S, y);
              var R = Object.prototype.toString.call(S).slice(8, -1);
              if (R === "Object" && S.constructor && (R = S.constructor.name), R === "Map" || R === "Set")
                return Array.from(S);
              if (R === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(R))
                return g(S, y);
            }
          }
          function g(S, y) {
            (y == null || y > S.length) && (y = S.length);
            for (var R = 0, L = new Array(y); R < y; R++)
              L[R] = S[R];
            return L;
          }
          var b = 1e5, A = 30, I = 0.8, C = /* @__PURE__ */ new Map(), E = /^\s+$/g;
          function O(S, y) {
            var R = C.get(S);
            if (R)
              return R;
            y.save(), y.font = "".concat(A, "px ").concat(S);
            var L = y.measureText(""), $ = L.fontBoundingBoxAscent, W = Math.abs(L.fontBoundingBoxDescent);
            if ($) {
              y.restore();
              var X = $ / ($ + W);
              return C.set(S, X), X;
            }
            y.strokeStyle = "red", y.clearRect(0, 0, A, A), y.strokeText("g", 0, 0);
            var te = y.getImageData(0, 0, A, A).data;
            W = 0;
            for (var K = te.length - 1 - 3; K >= 0; K -= 4)
              if (te[K] > 0) {
                W = Math.ceil(K / 4 / A);
                break;
              }
            y.clearRect(0, 0, A, A), y.strokeText("A", 0, A), te = y.getImageData(0, 0, A, A).data, $ = 0;
            for (var ae = 0, V = te.length; ae < V; ae += 4)
              if (te[ae] > 0) {
                $ = A - Math.floor(ae / 4 / A);
                break;
              }
            if (y.restore(), $) {
              var q = $ / ($ + W);
              return C.set(S, q), q;
            }
            return C.set(S, I), I;
          }
          function k(S, y, R, L) {
            var $ = document.createElement("span"), W = S._enhanceTextSelection ? {
              angle: 0,
              canvasWidth: 0,
              hasText: y.str !== "",
              hasEOL: y.hasEOL,
              originalTransform: null,
              paddingBottom: 0,
              paddingLeft: 0,
              paddingRight: 0,
              paddingTop: 0,
              scale: 1
            } : {
              angle: 0,
              canvasWidth: 0,
              hasText: y.str !== "",
              hasEOL: y.hasEOL
            };
            S._textDivs.push($);
            var X = t.Util.transform(S._viewport.transform, y.transform), te = Math.atan2(X[1], X[0]), K = R[y.fontName];
            K.vertical && (te += Math.PI / 2);
            var ae = Math.hypot(X[2], X[3]), V = ae * O(K.fontFamily, L), q, w;
            te === 0 ? (q = X[4], w = X[5] - V) : (q = X[4] + V * Math.sin(te), w = X[5] - V * Math.cos(te)), $.style.left = "".concat(q, "px"), $.style.top = "".concat(w, "px"), $.style.fontSize = "".concat(ae, "px"), $.style.fontFamily = K.fontFamily, $.setAttribute("role", "presentation"), $.textContent = y.str, $.dir = y.dir, S._fontInspectorEnabled && ($.dataset.fontName = y.fontName), te !== 0 && (W.angle = te * (180 / Math.PI));
            var p = !1;
            if (y.str.length > 1 || S._enhanceTextSelection && E.test(y.str))
              p = !0;
            else if (y.str !== " " && y.transform[0] !== y.transform[3]) {
              var P = Math.abs(y.transform[0]), F = Math.abs(y.transform[3]);
              P !== F && Math.max(P, F) / Math.min(P, F) > 1.5 && (p = !0);
            }
            if (p && (K.vertical ? W.canvasWidth = y.height * S._viewport.scale : W.canvasWidth = y.width * S._viewport.scale), S._textDivProperties.set($, W), S._textContentStream && S._layoutText($), S._enhanceTextSelection && W.hasText) {
              var G = 1, Z = 0;
              te !== 0 && (G = Math.cos(te), Z = Math.sin(te));
              var Y = (K.vertical ? y.height : y.width) * S._viewport.scale, de = ae, Se, _e;
              te !== 0 ? (Se = [G, Z, -Z, G, q, w], _e = t.Util.getAxialAlignedBoundingBox([0, 0, Y, de], Se)) : _e = [q, w, q + Y, w + de], S._bounds.push({
                left: _e[0],
                top: _e[1],
                right: _e[2],
                bottom: _e[3],
                div: $,
                size: [Y, de],
                m: Se
              });
            }
          }
          function N(S) {
            if (!S._canceled) {
              var y = S._textDivs, R = S._capability, L = y.length;
              if (L > b) {
                S._renderingDone = !0, R.resolve();
                return;
              }
              if (!S._textContentStream)
                for (var $ = 0; $ < L; $++)
                  S._layoutText(y[$]);
              S._renderingDone = !0, R.resolve();
            }
          }
          function x(S, y, R) {
            for (var L = 0, $ = 0; $ < R; $++) {
              var W = S[y++];
              W > 0 && (L = L ? Math.min(W, L) : W);
            }
            return L;
          }
          function U(S) {
            for (var y = S._bounds, R = S._viewport, L = m(R.width, R.height, y), $ = 0; $ < L.length; $++) {
              var W = y[$].div, X = S._textDivProperties.get(W);
              if (X.angle === 0) {
                X.paddingLeft = y[$].left - L[$].left, X.paddingTop = y[$].top - L[$].top, X.paddingRight = L[$].right - y[$].right, X.paddingBottom = L[$].bottom - y[$].bottom, S._textDivProperties.set(W, X);
                continue;
              }
              for (var te = L[$], K = y[$], ae = K.m, V = ae[0], q = ae[1], w = [[0, 0], [0, K.size[1]], [K.size[0], 0], K.size], p = new Float64Array(64), P = 0, F = w.length; P < F; P++) {
                var G = t.Util.applyTransform(w[P], ae);
                p[P + 0] = V && (te.left - G[0]) / V, p[P + 4] = q && (te.top - G[1]) / q, p[P + 8] = V && (te.right - G[0]) / V, p[P + 12] = q && (te.bottom - G[1]) / q, p[P + 16] = q && (te.left - G[0]) / -q, p[P + 20] = V && (te.top - G[1]) / V, p[P + 24] = q && (te.right - G[0]) / -q, p[P + 28] = V && (te.bottom - G[1]) / V, p[P + 32] = V && (te.left - G[0]) / -V, p[P + 36] = q && (te.top - G[1]) / -q, p[P + 40] = V && (te.right - G[0]) / -V, p[P + 44] = q && (te.bottom - G[1]) / -q, p[P + 48] = q && (te.left - G[0]) / q, p[P + 52] = V && (te.top - G[1]) / -V, p[P + 56] = q && (te.right - G[0]) / q, p[P + 60] = V && (te.bottom - G[1]) / -V;
              }
              var Z = 1 + Math.min(Math.abs(V), Math.abs(q));
              X.paddingLeft = x(p, 32, 16) / Z, X.paddingTop = x(p, 48, 16) / Z, X.paddingRight = x(p, 0, 16) / Z, X.paddingBottom = x(p, 16, 16) / Z, S._textDivProperties.set(W, X);
            }
          }
          function m(S, y, R) {
            var L = R.map(function(p, P) {
              return {
                x1: p.left,
                y1: p.top,
                x2: p.right,
                y2: p.bottom,
                index: P,
                x1New: void 0,
                x2New: void 0
              };
            });
            f(S, L);
            var $ = new Array(R.length), W = u(L), X;
            try {
              for (W.s(); !(X = W.n()).done; ) {
                var te = X.value, K = te.index;
                $[K] = {
                  left: te.x1New,
                  top: 0,
                  right: te.x2New,
                  bottom: 0
                };
              }
            } catch (p) {
              W.e(p);
            } finally {
              W.f();
            }
            R.map(function(p, P) {
              var F = $[P], G = L[P];
              G.x1 = p.top, G.y1 = S - F.right, G.x2 = p.bottom, G.y2 = S - F.left, G.index = P, G.x1New = void 0, G.x2New = void 0;
            }), f(y, L);
            var ae = u(L), V;
            try {
              for (ae.s(); !(V = ae.n()).done; ) {
                var q = V.value, w = q.index;
                $[w].top = q.x1New, $[w].bottom = q.x2New;
              }
            } catch (p) {
              ae.e(p);
            } finally {
              ae.f();
            }
            return $;
          }
          function f(S, y) {
            y.sort(function(D, h) {
              return D.x1 - h.x1 || D.index - h.index;
            });
            var R = {
              x1: -1 / 0,
              y1: -1 / 0,
              x2: 0,
              y2: 1 / 0,
              index: -1,
              x1New: 0,
              x2New: 0
            }, L = [{
              start: -1 / 0,
              end: 1 / 0,
              boundary: R
            }], $ = u(y), W;
            try {
              for ($.s(); !(W = $.n()).done; ) {
                for (var X = W.value, te = 0; te < L.length && L[te].end <= X.y1; )
                  te++;
                for (var K = L.length - 1; K >= 0 && L[K].start >= X.y2; )
                  K--;
                var ae = void 0, V = void 0, q = void 0, w = void 0, p = -1 / 0;
                for (q = te; q <= K; q++) {
                  ae = L[q], V = ae.boundary;
                  var P = void 0;
                  V.x2 > X.x1 ? P = V.index > X.index ? V.x1New : X.x1 : V.x2New === void 0 ? P = (V.x2 + X.x1) / 2 : P = V.x2New, P > p && (p = P);
                }
                for (X.x1New = p, q = te; q <= K; q++)
                  ae = L[q], V = ae.boundary, V.x2New === void 0 ? V.x2 > X.x1 ? V.index > X.index && (V.x2New = V.x2) : V.x2New = p : V.x2New > p && (V.x2New = Math.max(p, V.x2));
                var F = [], G = null;
                for (q = te; q <= K; q++) {
                  ae = L[q], V = ae.boundary;
                  var Z = V.x2 > X.x2 ? V : X;
                  G === Z ? F[F.length - 1].end = ae.end : (F.push({
                    start: ae.start,
                    end: ae.end,
                    boundary: Z
                  }), G = Z);
                }
                for (L[te].start < X.y1 && (F[0].start = X.y1, F.unshift({
                  start: L[te].start,
                  end: X.y1,
                  boundary: L[te].boundary
                })), X.y2 < L[K].end && (F[F.length - 1].end = X.y2, F.push({
                  start: X.y2,
                  end: L[K].end,
                  boundary: L[K].boundary
                })), q = te; q <= K; q++)
                  if (ae = L[q], V = ae.boundary, V.x2New === void 0) {
                    var Y = !1;
                    for (w = te - 1; !Y && w >= 0 && L[w].start >= V.y1; w--)
                      Y = L[w].boundary === V;
                    for (w = K + 1; !Y && w < L.length && L[w].end <= V.y2; w++)
                      Y = L[w].boundary === V;
                    for (w = 0; !Y && w < F.length; w++)
                      Y = F[w].boundary === V;
                    Y || (V.x2New = p);
                  }
                Array.prototype.splice.apply(L, [te, K - te + 1].concat(F));
              }
            } catch (D) {
              $.e(D);
            } finally {
              $.f();
            }
            for (var de = 0, Se = L; de < Se.length; de++) {
              var _e = Se[de], j = _e.boundary;
              j.x2New === void 0 && (j.x2New = Math.max(S, j.x2));
            }
          }
          var v = /* @__PURE__ */ function() {
            function S(y) {
              var R, L = this, $ = y.textContent, W = y.textContentStream, X = y.container, te = y.viewport, K = y.textDivs, ae = y.textContentItemsStr, V = y.enhanceTextSelection;
              a(this, S), this._textContent = $, this._textContentStream = W, this._container = X, this._document = X.ownerDocument, this._viewport = te, this._textDivs = K || [], this._textContentItemsStr = ae || [], this._enhanceTextSelection = !!V, this._fontInspectorEnabled = !!((R = globalThis.FontInspector) !== null && R !== void 0 && R.enabled), this._reader = null, this._layoutTextLastFontSize = null, this._layoutTextLastFontFamily = null, this._layoutTextCtx = null, this._textDivProperties = /* @__PURE__ */ new WeakMap(), this._renderingDone = !1, this._canceled = !1, this._capability = (0, t.createPromiseCapability)(), this._renderTimer = null, this._bounds = [], this._capability.promise.finally(function() {
                L._enhanceTextSelection || (L._textDivProperties = null), L._layoutTextCtx && (L._layoutTextCtx.canvas.width = 0, L._layoutTextCtx.canvas.height = 0, L._layoutTextCtx = null);
              }).catch(function() {
              });
            }
            return s(S, [{
              key: "promise",
              get: function() {
                return this._capability.promise;
              }
            }, {
              key: "cancel",
              value: function() {
                this._canceled = !0, this._reader && (this._reader.cancel(new t.AbortException("TextLayer task cancelled.")).catch(function() {
                }), this._reader = null), this._renderTimer !== null && (clearTimeout(this._renderTimer), this._renderTimer = null), this._capability.reject(new Error("TextLayer task cancelled."));
              }
            }, {
              key: "_processItems",
              value: function(R, L) {
                for (var $ = 0, W = R.length; $ < W; $++) {
                  if (R[$].str === void 0) {
                    if (R[$].type === "beginMarkedContentProps" || R[$].type === "beginMarkedContent") {
                      var X = this._container;
                      this._container = document.createElement("span"), this._container.classList.add("markedContent"), R[$].id !== null && this._container.setAttribute("id", "".concat(R[$].id)), X.appendChild(this._container);
                    } else
                      R[$].type === "endMarkedContent" && (this._container = this._container.parentNode);
                    continue;
                  }
                  this._textContentItemsStr.push(R[$].str), k(this, R[$], L, this._layoutTextCtx);
                }
              }
            }, {
              key: "_layoutText",
              value: function(R) {
                var L = this._textDivProperties.get(R), $ = "";
                if (L.canvasWidth !== 0 && L.hasText) {
                  var W = R.style, X = W.fontSize, te = W.fontFamily;
                  (X !== this._layoutTextLastFontSize || te !== this._layoutTextLastFontFamily) && (this._layoutTextCtx.font = "".concat(X, " ").concat(te), this._layoutTextLastFontSize = X, this._layoutTextLastFontFamily = te);
                  var K = this._layoutTextCtx.measureText(R.textContent), ae = K.width;
                  if (ae > 0) {
                    var V = L.canvasWidth / ae;
                    this._enhanceTextSelection && (L.scale = V), $ = "scaleX(".concat(V, ")");
                  }
                }
                if (L.angle !== 0 && ($ = "rotate(".concat(L.angle, "deg) ").concat($)), $.length > 0 && (this._enhanceTextSelection && (L.originalTransform = $), R.style.transform = $), L.hasText && this._container.appendChild(R), L.hasEOL) {
                  var q = document.createElement("br");
                  q.setAttribute("role", "presentation"), this._container.appendChild(q);
                }
              }
            }, {
              key: "_render",
              value: function() {
                var R = this, L = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : 0, $ = (0, t.createPromiseCapability)(), W = /* @__PURE__ */ Object.create(null), X = this._document.createElement("canvas");
                if (X.height = X.width = A, X.mozOpaque = !0, this._layoutTextCtx = X.getContext("2d", {
                  alpha: !1
                }), this._textContent) {
                  var te = this._textContent.items, K = this._textContent.styles;
                  this._processItems(te, K), $.resolve();
                } else if (this._textContentStream) {
                  var ae = function V() {
                    R._reader.read().then(function(q) {
                      var w = q.value, p = q.done;
                      if (p) {
                        $.resolve();
                        return;
                      }
                      Object.assign(W, w.styles), R._processItems(w.items, W), V();
                    }, $.reject);
                  };
                  this._reader = this._textContentStream.getReader(), ae();
                } else
                  throw new Error('Neither "textContent" nor "textContentStream" parameters specified.');
                $.promise.then(function() {
                  W = null, L ? R._renderTimer = setTimeout(function() {
                    N(R), R._renderTimer = null;
                  }, L) : N(R);
                }, this._capability.reject);
              }
            }, {
              key: "expandTextDivs",
              value: function() {
                var R = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : !1;
                if (!(!this._enhanceTextSelection || !this._renderingDone)) {
                  this._bounds !== null && (U(this), this._bounds = null);
                  for (var L = [], $ = [], W = 0, X = this._textDivs.length; W < X; W++) {
                    var te = this._textDivs[W], K = this._textDivProperties.get(te);
                    !K.hasText || (R ? (L.length = 0, $.length = 0, K.originalTransform && L.push(K.originalTransform), K.paddingTop > 0 ? ($.push("".concat(K.paddingTop, "px")), L.push("translateY(".concat(-K.paddingTop, "px)"))) : $.push(0), K.paddingRight > 0 ? $.push("".concat(K.paddingRight / K.scale, "px")) : $.push(0), K.paddingBottom > 0 ? $.push("".concat(K.paddingBottom, "px")) : $.push(0), K.paddingLeft > 0 ? ($.push("".concat(K.paddingLeft / K.scale, "px")), L.push("translateX(".concat(-K.paddingLeft / K.scale, "px)"))) : $.push(0), te.style.padding = $.join(" "), L.length && (te.style.transform = L.join(" "))) : (te.style.padding = null, te.style.transform = K.originalTransform));
                  }
                }
              }
            }]), S;
          }();
          function _(S) {
            var y = new v({
              textContent: S.textContent,
              textContentStream: S.textContentStream,
              container: S.container,
              viewport: S.viewport,
              textDivs: S.textDivs,
              textContentItemsStr: S.textContentItemsStr,
              enhanceTextSelection: S.enhanceTextSelection
            });
            return y._render(S.timeout), y;
          }
        },
        (n, r, e) => {
          Object.defineProperty(r, "__esModule", {
            value: !0
          }), r.SVGGraphics = void 0;
          var t = e(4), a = e(1), i = e(6);
          function s(V) {
            return g(V) || c(V) || O(V) || u();
          }
          function u() {
            throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
          }
          function c(V) {
            if (typeof Symbol < "u" && V[Symbol.iterator] != null || V["@@iterator"] != null)
              return Array.from(V);
          }
          function g(V) {
            if (Array.isArray(V))
              return k(V);
          }
          function b(V, q) {
            return C(V) || I(V, q) || O(V, q) || A();
          }
          function A() {
            throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
          }
          function I(V, q) {
            var w = V == null ? null : typeof Symbol < "u" && V[Symbol.iterator] || V["@@iterator"];
            if (w != null) {
              var p = [], P = !0, F = !1, G, Z;
              try {
                for (w = w.call(V); !(P = (G = w.next()).done) && (p.push(G.value), !(q && p.length === q)); P = !0)
                  ;
              } catch (Y) {
                F = !0, Z = Y;
              } finally {
                try {
                  !P && w.return != null && w.return();
                } finally {
                  if (F)
                    throw Z;
                }
              }
              return p;
            }
          }
          function C(V) {
            if (Array.isArray(V))
              return V;
          }
          function E(V, q) {
            var w = typeof Symbol < "u" && V[Symbol.iterator] || V["@@iterator"];
            if (!w) {
              if (Array.isArray(V) || (w = O(V)) || q && V && typeof V.length == "number") {
                w && (V = w);
                var p = 0, P = function() {
                };
                return { s: P, n: function() {
                  return p >= V.length ? { done: !0 } : { done: !1, value: V[p++] };
                }, e: function(de) {
                  throw de;
                }, f: P };
              }
              throw new TypeError(`Invalid attempt to iterate non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
            }
            var F = !0, G = !1, Z;
            return { s: function() {
              w = w.call(V);
            }, n: function() {
              var de = w.next();
              return F = de.done, de;
            }, e: function(de) {
              G = !0, Z = de;
            }, f: function() {
              try {
                !F && w.return != null && w.return();
              } finally {
                if (G)
                  throw Z;
              }
            } };
          }
          function O(V, q) {
            if (!!V) {
              if (typeof V == "string")
                return k(V, q);
              var w = Object.prototype.toString.call(V).slice(8, -1);
              if (w === "Object" && V.constructor && (w = V.constructor.name), w === "Map" || w === "Set")
                return Array.from(V);
              if (w === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(w))
                return k(V, q);
            }
          }
          function k(V, q) {
            (q == null || q > V.length) && (q = V.length);
            for (var w = 0, p = new Array(q); w < q; w++)
              p[w] = V[w];
            return p;
          }
          function N(V, q) {
            for (var w = 0; w < q.length; w++) {
              var p = q[w];
              p.enumerable = p.enumerable || !1, p.configurable = !0, "value" in p && (p.writable = !0), Object.defineProperty(V, p.key, p);
            }
          }
          function x(V, q, w) {
            return q && N(V.prototype, q), w && N(V, w), V;
          }
          function U(V, q) {
            if (!(V instanceof q))
              throw new TypeError("Cannot call a class as a function");
          }
          var m = function V() {
            U(this, V), (0, t.unreachable)("Not implemented: SVGGraphics");
          };
          r.SVGGraphics = m;
          {
            var f = function(q) {
              var w = [], p = [], P = E(q), F;
              try {
                for (P.s(); !(F = P.n()).done; ) {
                  var G = F.value;
                  if (G.fn === "save") {
                    w.push({
                      fnId: 92,
                      fn: "group",
                      items: []
                    }), p.push(w), w = w[w.length - 1].items;
                    continue;
                  }
                  G.fn === "restore" ? w = p.pop() : w.push(G);
                }
              } catch (Z) {
                P.e(Z);
              } finally {
                P.f();
              }
              return w;
            }, v = function(q) {
              if (Number.isInteger(q))
                return q.toString();
              var w = q.toFixed(10), p = w.length - 1;
              if (w[p] !== "0")
                return w;
              do
                p--;
              while (w[p] === "0");
              return w.substring(0, w[p] === "." ? p : p + 1);
            }, _ = function(q) {
              if (q[4] === 0 && q[5] === 0) {
                if (q[1] === 0 && q[2] === 0)
                  return q[0] === 1 && q[3] === 1 ? "" : "scale(".concat(v(q[0]), " ").concat(v(q[3]), ")");
                if (q[0] === q[3] && q[1] === -q[2]) {
                  var w = Math.acos(q[0]) * 180 / Math.PI;
                  return "rotate(".concat(v(w), ")");
                }
              } else if (q[0] === 1 && q[1] === 0 && q[2] === 0 && q[3] === 1)
                return "translate(".concat(v(q[4]), " ").concat(v(q[5]), ")");
              return "matrix(".concat(v(q[0]), " ").concat(v(q[1]), " ").concat(v(q[2]), " ").concat(v(q[3]), " ").concat(v(q[4]), " ") + "".concat(v(q[5]), ")");
            }, S = {
              fontStyle: "normal",
              fontWeight: "normal",
              fillColor: "#000000"
            }, y = "http://www.w3.org/XML/1998/namespace", R = "http://www.w3.org/1999/xlink", L = ["butt", "round", "square"], $ = ["miter", "round", "bevel"], W = function() {
              for (var V = new Uint8Array([137, 80, 78, 71, 13, 10, 26, 10]), q = 12, w = new Int32Array(256), p = 0; p < 256; p++) {
                for (var P = p, F = 0; F < 8; F++)
                  P & 1 ? P = 3988292384 ^ P >> 1 & 2147483647 : P = P >> 1 & 2147483647;
                w[p] = P;
              }
              function G(j, D, h) {
                for (var d = -1, T = D; T < h; T++) {
                  var B = (d ^ j[T]) & 255, z = w[B];
                  d = d >>> 8 ^ z;
                }
                return d ^ -1;
              }
              function Z(j, D, h, d) {
                var T = d, B = D.length;
                h[T] = B >> 24 & 255, h[T + 1] = B >> 16 & 255, h[T + 2] = B >> 8 & 255, h[T + 3] = B & 255, T += 4, h[T] = j.charCodeAt(0) & 255, h[T + 1] = j.charCodeAt(1) & 255, h[T + 2] = j.charCodeAt(2) & 255, h[T + 3] = j.charCodeAt(3) & 255, T += 4, h.set(D, T), T += D.length;
                var z = G(h, d + 4, T);
                h[T] = z >> 24 & 255, h[T + 1] = z >> 16 & 255, h[T + 2] = z >> 8 & 255, h[T + 3] = z & 255;
              }
              function Y(j, D, h) {
                for (var d = 1, T = 0, B = D; B < h; ++B)
                  d = (d + (j[B] & 255)) % 65521, T = (T + d) % 65521;
                return T << 16 | d;
              }
              function de(j) {
                if (!i.isNodeJS)
                  return Se(j);
                try {
                  var D;
                  parseInt(browser$1.versions.node) >= 8 ? D = j : D = Buffer.from(j);
                  var h = require$$5.deflateSync(D, {
                    level: 9
                  });
                  return h instanceof Uint8Array ? h : new Uint8Array(h);
                } catch (d) {
                  (0, t.warn)("Not compressing PNG because zlib.deflateSync is unavailable: " + d);
                }
                return Se(j);
              }
              function Se(j) {
                var D = j.length, h = 65535, d = Math.ceil(D / h), T = new Uint8Array(2 + D + d * 5 + 4), B = 0;
                T[B++] = 120, T[B++] = 156;
                for (var z = 0; D > h; )
                  T[B++] = 0, T[B++] = 255, T[B++] = 255, T[B++] = 0, T[B++] = 0, T.set(j.subarray(z, z + h), B), B += h, z += h, D -= h;
                T[B++] = 1, T[B++] = D & 255, T[B++] = D >> 8 & 255, T[B++] = ~D & 65535 & 255, T[B++] = (~D & 65535) >> 8 & 255, T.set(j.subarray(z), B), B += j.length - z;
                var ee = Y(j, 0, j.length);
                return T[B++] = ee >> 24 & 255, T[B++] = ee >> 16 & 255, T[B++] = ee >> 8 & 255, T[B++] = ee & 255, T;
              }
              function _e(j, D, h, d) {
                var T = j.width, B = j.height, z, ee, le, ve = j.data;
                switch (D) {
                  case t.ImageKind.GRAYSCALE_1BPP:
                    ee = 0, z = 1, le = T + 7 >> 3;
                    break;
                  case t.ImageKind.RGB_24BPP:
                    ee = 2, z = 8, le = T * 3;
                    break;
                  case t.ImageKind.RGBA_32BPP:
                    ee = 6, z = 8, le = T * 4;
                    break;
                  default:
                    throw new Error("invalid format");
                }
                for (var ye = new Uint8Array((1 + le) * B), me = 0, we = 0, Pe = 0; Pe < B; ++Pe)
                  ye[me++] = 0, ye.set(ve.subarray(we, we + le), me), we += le, me += le;
                if (D === t.ImageKind.GRAYSCALE_1BPP && d) {
                  me = 0;
                  for (var Ee = 0; Ee < B; Ee++) {
                    me++;
                    for (var Fe = 0; Fe < le; Fe++)
                      ye[me++] ^= 255;
                  }
                }
                var Ie = new Uint8Array([T >> 24 & 255, T >> 16 & 255, T >> 8 & 255, T & 255, B >> 24 & 255, B >> 16 & 255, B >> 8 & 255, B & 255, z, ee, 0, 0, 0]), We = de(ye), je = V.length + q * 3 + Ie.length + We.length, fe = new Uint8Array(je), he = 0;
                return fe.set(V, he), he += V.length, Z("IHDR", Ie, fe, he), he += q + Ie.length, Z("IDATA", We, fe, he), he += q + We.length, Z("IEND", new Uint8Array(0), fe, he), (0, t.createObjectURL)(fe, "image/png", h);
              }
              return function(D, h, d) {
                var T = D.kind === void 0 ? t.ImageKind.GRAYSCALE_1BPP : D.kind;
                return _e(D, T, h, d);
              };
            }(), X = /* @__PURE__ */ function() {
              function V() {
                U(this, V), this.fontSizeScale = 1, this.fontWeight = S.fontWeight, this.fontSize = 0, this.textMatrix = t.IDENTITY_MATRIX, this.fontMatrix = t.FONT_IDENTITY_MATRIX, this.leading = 0, this.textRenderingMode = t.TextRenderingMode.FILL, this.textMatrixScale = 1, this.x = 0, this.y = 0, this.lineX = 0, this.lineY = 0, this.charSpacing = 0, this.wordSpacing = 0, this.textHScale = 1, this.textRise = 0, this.fillColor = S.fillColor, this.strokeColor = "#000000", this.fillAlpha = 1, this.strokeAlpha = 1, this.lineWidth = 1, this.lineJoin = "", this.lineCap = "", this.miterLimit = 0, this.dashArray = [], this.dashPhase = 0, this.dependencies = [], this.activeClipUrl = null, this.clipGroup = null, this.maskId = "";
              }
              return x(V, [{
                key: "clone",
                value: function() {
                  return Object.create(this);
                }
              }, {
                key: "setCurrentPoint",
                value: function(w, p) {
                  this.x = w, this.y = p;
                }
              }]), V;
            }(), te = 0, K = 0, ae = 0;
            r.SVGGraphics = m = /* @__PURE__ */ function() {
              function V(q, w) {
                var p = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : !1;
                U(this, V), this.svgFactory = new a.DOMSVGFactory(), this.current = new X(), this.transformMatrix = t.IDENTITY_MATRIX, this.transformStack = [], this.extraStack = [], this.commonObjs = q, this.objs = w, this.pendingClip = null, this.pendingEOFill = !1, this.embedFonts = !1, this.embeddedFonts = /* @__PURE__ */ Object.create(null), this.cssStyle = null, this.forceDataSchema = !!p, this._operatorIdMapping = [];
                for (var P in t.OPS)
                  this._operatorIdMapping[t.OPS[P]] = P;
              }
              return x(V, [{
                key: "save",
                value: function() {
                  this.transformStack.push(this.transformMatrix);
                  var w = this.current;
                  this.extraStack.push(w), this.current = w.clone();
                }
              }, {
                key: "restore",
                value: function() {
                  this.transformMatrix = this.transformStack.pop(), this.current = this.extraStack.pop(), this.pendingClip = null, this.tgrp = null;
                }
              }, {
                key: "group",
                value: function(w) {
                  this.save(), this.executeOpTree(w), this.restore();
                }
              }, {
                key: "loadDependencies",
                value: function(w) {
                  for (var p = this, P = w.fnArray, F = w.argsArray, G = 0, Z = P.length; G < Z; G++)
                    if (P[G] === t.OPS.dependency) {
                      var Y = E(F[G]), de;
                      try {
                        var Se = function() {
                          var j = de.value, D = j.startsWith("g_") ? p.commonObjs : p.objs, h = new Promise(function(d) {
                            D.get(j, d);
                          });
                          p.current.dependencies.push(h);
                        };
                        for (Y.s(); !(de = Y.n()).done; )
                          Se();
                      } catch (_e) {
                        Y.e(_e);
                      } finally {
                        Y.f();
                      }
                    }
                  return Promise.all(this.current.dependencies);
                }
              }, {
                key: "transform",
                value: function(w, p, P, F, G, Z) {
                  var Y = [w, p, P, F, G, Z];
                  this.transformMatrix = t.Util.transform(this.transformMatrix, Y), this.tgrp = null;
                }
              }, {
                key: "getSVG",
                value: function(w, p) {
                  var P = this;
                  this.viewport = p;
                  var F = this._initialize(p);
                  return this.loadDependencies(w).then(function() {
                    return P.transformMatrix = t.IDENTITY_MATRIX, P.executeOpTree(P.convertOpList(w)), F;
                  });
                }
              }, {
                key: "convertOpList",
                value: function(w) {
                  for (var p = this._operatorIdMapping, P = w.argsArray, F = w.fnArray, G = [], Z = 0, Y = F.length; Z < Y; Z++) {
                    var de = F[Z];
                    G.push({
                      fnId: de,
                      fn: p[de],
                      args: P[Z]
                    });
                  }
                  return f(G);
                }
              }, {
                key: "executeOpTree",
                value: function(w) {
                  var p = E(w), P;
                  try {
                    for (p.s(); !(P = p.n()).done; ) {
                      var F = P.value, G = F.fn, Z = F.fnId, Y = F.args;
                      switch (Z | 0) {
                        case t.OPS.beginText:
                          this.beginText();
                          break;
                        case t.OPS.dependency:
                          break;
                        case t.OPS.setLeading:
                          this.setLeading(Y);
                          break;
                        case t.OPS.setLeadingMoveText:
                          this.setLeadingMoveText(Y[0], Y[1]);
                          break;
                        case t.OPS.setFont:
                          this.setFont(Y);
                          break;
                        case t.OPS.showText:
                          this.showText(Y[0]);
                          break;
                        case t.OPS.showSpacedText:
                          this.showText(Y[0]);
                          break;
                        case t.OPS.endText:
                          this.endText();
                          break;
                        case t.OPS.moveText:
                          this.moveText(Y[0], Y[1]);
                          break;
                        case t.OPS.setCharSpacing:
                          this.setCharSpacing(Y[0]);
                          break;
                        case t.OPS.setWordSpacing:
                          this.setWordSpacing(Y[0]);
                          break;
                        case t.OPS.setHScale:
                          this.setHScale(Y[0]);
                          break;
                        case t.OPS.setTextMatrix:
                          this.setTextMatrix(Y[0], Y[1], Y[2], Y[3], Y[4], Y[5]);
                          break;
                        case t.OPS.setTextRise:
                          this.setTextRise(Y[0]);
                          break;
                        case t.OPS.setTextRenderingMode:
                          this.setTextRenderingMode(Y[0]);
                          break;
                        case t.OPS.setLineWidth:
                          this.setLineWidth(Y[0]);
                          break;
                        case t.OPS.setLineJoin:
                          this.setLineJoin(Y[0]);
                          break;
                        case t.OPS.setLineCap:
                          this.setLineCap(Y[0]);
                          break;
                        case t.OPS.setMiterLimit:
                          this.setMiterLimit(Y[0]);
                          break;
                        case t.OPS.setFillRGBColor:
                          this.setFillRGBColor(Y[0], Y[1], Y[2]);
                          break;
                        case t.OPS.setStrokeRGBColor:
                          this.setStrokeRGBColor(Y[0], Y[1], Y[2]);
                          break;
                        case t.OPS.setStrokeColorN:
                          this.setStrokeColorN(Y);
                          break;
                        case t.OPS.setFillColorN:
                          this.setFillColorN(Y);
                          break;
                        case t.OPS.shadingFill:
                          this.shadingFill(Y[0]);
                          break;
                        case t.OPS.setDash:
                          this.setDash(Y[0], Y[1]);
                          break;
                        case t.OPS.setRenderingIntent:
                          this.setRenderingIntent(Y[0]);
                          break;
                        case t.OPS.setFlatness:
                          this.setFlatness(Y[0]);
                          break;
                        case t.OPS.setGState:
                          this.setGState(Y[0]);
                          break;
                        case t.OPS.fill:
                          this.fill();
                          break;
                        case t.OPS.eoFill:
                          this.eoFill();
                          break;
                        case t.OPS.stroke:
                          this.stroke();
                          break;
                        case t.OPS.fillStroke:
                          this.fillStroke();
                          break;
                        case t.OPS.eoFillStroke:
                          this.eoFillStroke();
                          break;
                        case t.OPS.clip:
                          this.clip("nonzero");
                          break;
                        case t.OPS.eoClip:
                          this.clip("evenodd");
                          break;
                        case t.OPS.paintSolidColorImageMask:
                          this.paintSolidColorImageMask();
                          break;
                        case t.OPS.paintImageXObject:
                          this.paintImageXObject(Y[0]);
                          break;
                        case t.OPS.paintInlineImageXObject:
                          this.paintInlineImageXObject(Y[0]);
                          break;
                        case t.OPS.paintImageMaskXObject:
                          this.paintImageMaskXObject(Y[0]);
                          break;
                        case t.OPS.paintFormXObjectBegin:
                          this.paintFormXObjectBegin(Y[0], Y[1]);
                          break;
                        case t.OPS.paintFormXObjectEnd:
                          this.paintFormXObjectEnd();
                          break;
                        case t.OPS.closePath:
                          this.closePath();
                          break;
                        case t.OPS.closeStroke:
                          this.closeStroke();
                          break;
                        case t.OPS.closeFillStroke:
                          this.closeFillStroke();
                          break;
                        case t.OPS.closeEOFillStroke:
                          this.closeEOFillStroke();
                          break;
                        case t.OPS.nextLine:
                          this.nextLine();
                          break;
                        case t.OPS.transform:
                          this.transform(Y[0], Y[1], Y[2], Y[3], Y[4], Y[5]);
                          break;
                        case t.OPS.constructPath:
                          this.constructPath(Y[0], Y[1]);
                          break;
                        case t.OPS.endPath:
                          this.endPath();
                          break;
                        case 92:
                          this.group(F.items);
                          break;
                        default:
                          (0, t.warn)("Unimplemented operator ".concat(G));
                          break;
                      }
                    }
                  } catch (de) {
                    p.e(de);
                  } finally {
                    p.f();
                  }
                }
              }, {
                key: "setWordSpacing",
                value: function(w) {
                  this.current.wordSpacing = w;
                }
              }, {
                key: "setCharSpacing",
                value: function(w) {
                  this.current.charSpacing = w;
                }
              }, {
                key: "nextLine",
                value: function() {
                  this.moveText(0, this.current.leading);
                }
              }, {
                key: "setTextMatrix",
                value: function(w, p, P, F, G, Z) {
                  var Y = this.current;
                  Y.textMatrix = Y.lineMatrix = [w, p, P, F, G, Z], Y.textMatrixScale = Math.hypot(w, p), Y.x = Y.lineX = 0, Y.y = Y.lineY = 0, Y.xcoords = [], Y.ycoords = [], Y.tspan = this.svgFactory.createElement("svg:tspan"), Y.tspan.setAttributeNS(null, "font-family", Y.fontFamily), Y.tspan.setAttributeNS(null, "font-size", "".concat(v(Y.fontSize), "px")), Y.tspan.setAttributeNS(null, "y", v(-Y.y)), Y.txtElement = this.svgFactory.createElement("svg:text"), Y.txtElement.appendChild(Y.tspan);
                }
              }, {
                key: "beginText",
                value: function() {
                  var w = this.current;
                  w.x = w.lineX = 0, w.y = w.lineY = 0, w.textMatrix = t.IDENTITY_MATRIX, w.lineMatrix = t.IDENTITY_MATRIX, w.textMatrixScale = 1, w.tspan = this.svgFactory.createElement("svg:tspan"), w.txtElement = this.svgFactory.createElement("svg:text"), w.txtgrp = this.svgFactory.createElement("svg:g"), w.xcoords = [], w.ycoords = [];
                }
              }, {
                key: "moveText",
                value: function(w, p) {
                  var P = this.current;
                  P.x = P.lineX += w, P.y = P.lineY += p, P.xcoords = [], P.ycoords = [], P.tspan = this.svgFactory.createElement("svg:tspan"), P.tspan.setAttributeNS(null, "font-family", P.fontFamily), P.tspan.setAttributeNS(null, "font-size", "".concat(v(P.fontSize), "px")), P.tspan.setAttributeNS(null, "y", v(-P.y));
                }
              }, {
                key: "showText",
                value: function(w) {
                  var p = this.current, P = p.font, F = p.fontSize;
                  if (F !== 0) {
                    var G = p.fontSizeScale, Z = p.charSpacing, Y = p.wordSpacing, de = p.fontDirection, Se = p.textHScale * de, _e = P.vertical, j = _e ? 1 : -1, D = P.defaultVMetrics, h = F * p.fontMatrix[0], d = 0, T = E(w), B;
                    try {
                      for (T.s(); !(B = T.n()).done; ) {
                        var z = B.value;
                        if (z === null) {
                          d += de * Y;
                          continue;
                        } else if ((0, t.isNum)(z)) {
                          d += j * z * F / 1e3;
                          continue;
                        }
                        var ee = (z.isSpace ? Y : 0) + Z, le = z.fontChar, ve = void 0, ye = void 0, me = z.width;
                        if (_e) {
                          var we = void 0, Pe = z.vmetric || D;
                          we = z.vmetric ? Pe[1] : me * 0.5, we = -we * h;
                          var Ee = Pe[2] * h;
                          me = Pe ? -Pe[0] : me, ve = we / G, ye = (d + Ee) / G;
                        } else
                          ve = d / G, ye = 0;
                        (z.isInFont || P.missingFile) && (p.xcoords.push(p.x + ve), _e && p.ycoords.push(-p.y + ye), p.tspan.textContent += le);
                        var Fe = void 0;
                        _e ? Fe = me * h - ee * de : Fe = me * h + ee * de, d += Fe;
                      }
                    } catch (fe) {
                      T.e(fe);
                    } finally {
                      T.f();
                    }
                    p.tspan.setAttributeNS(null, "x", p.xcoords.map(v).join(" ")), _e ? p.tspan.setAttributeNS(null, "y", p.ycoords.map(v).join(" ")) : p.tspan.setAttributeNS(null, "y", v(-p.y)), _e ? p.y -= d : p.x += d * Se, p.tspan.setAttributeNS(null, "font-family", p.fontFamily), p.tspan.setAttributeNS(null, "font-size", "".concat(v(p.fontSize), "px")), p.fontStyle !== S.fontStyle && p.tspan.setAttributeNS(null, "font-style", p.fontStyle), p.fontWeight !== S.fontWeight && p.tspan.setAttributeNS(null, "font-weight", p.fontWeight);
                    var Ie = p.textRenderingMode & t.TextRenderingMode.FILL_STROKE_MASK;
                    if (Ie === t.TextRenderingMode.FILL || Ie === t.TextRenderingMode.FILL_STROKE ? (p.fillColor !== S.fillColor && p.tspan.setAttributeNS(null, "fill", p.fillColor), p.fillAlpha < 1 && p.tspan.setAttributeNS(null, "fill-opacity", p.fillAlpha)) : p.textRenderingMode === t.TextRenderingMode.ADD_TO_PATH ? p.tspan.setAttributeNS(null, "fill", "transparent") : p.tspan.setAttributeNS(null, "fill", "none"), Ie === t.TextRenderingMode.STROKE || Ie === t.TextRenderingMode.FILL_STROKE) {
                      var We = 1 / (p.textMatrixScale || 1);
                      this._setStrokeAttributes(p.tspan, We);
                    }
                    var je = p.textMatrix;
                    p.textRise !== 0 && (je = je.slice(), je[5] += p.textRise), p.txtElement.setAttributeNS(null, "transform", "".concat(_(je), " scale(").concat(v(Se), ", -1)")), p.txtElement.setAttributeNS(y, "xml:space", "preserve"), p.txtElement.appendChild(p.tspan), p.txtgrp.appendChild(p.txtElement), this._ensureTransformGroup().appendChild(p.txtElement);
                  }
                }
              }, {
                key: "setLeadingMoveText",
                value: function(w, p) {
                  this.setLeading(-p), this.moveText(w, p);
                }
              }, {
                key: "addFontStyle",
                value: function(w) {
                  if (!w.data)
                    throw new Error('addFontStyle: No font data available, ensure that the "fontExtraProperties" API parameter is set.');
                  this.cssStyle || (this.cssStyle = this.svgFactory.createElement("svg:style"), this.cssStyle.setAttributeNS(null, "type", "text/css"), this.defs.appendChild(this.cssStyle));
                  var p = (0, t.createObjectURL)(w.data, w.mimetype, this.forceDataSchema);
                  this.cssStyle.textContent += '@font-face { font-family: "'.concat(w.loadedName, '";') + " src: url(".concat(p, `); }
`);
                }
              }, {
                key: "setFont",
                value: function(w) {
                  var p = this.current, P = this.commonObjs.get(w[0]), F = w[1];
                  p.font = P, this.embedFonts && !P.missingFile && !this.embeddedFonts[P.loadedName] && (this.addFontStyle(P), this.embeddedFonts[P.loadedName] = P), p.fontMatrix = P.fontMatrix || t.FONT_IDENTITY_MATRIX;
                  var G = "normal";
                  P.black ? G = "900" : P.bold && (G = "bold");
                  var Z = P.italic ? "italic" : "normal";
                  F < 0 ? (F = -F, p.fontDirection = -1) : p.fontDirection = 1, p.fontSize = F, p.fontFamily = P.loadedName, p.fontWeight = G, p.fontStyle = Z, p.tspan = this.svgFactory.createElement("svg:tspan"), p.tspan.setAttributeNS(null, "y", v(-p.y)), p.xcoords = [], p.ycoords = [];
                }
              }, {
                key: "endText",
                value: function() {
                  var w, p = this.current;
                  p.textRenderingMode & t.TextRenderingMode.ADD_TO_PATH_FLAG && (w = p.txtElement) !== null && w !== void 0 && w.hasChildNodes() && (p.element = p.txtElement, this.clip("nonzero"), this.endPath());
                }
              }, {
                key: "setLineWidth",
                value: function(w) {
                  w > 0 && (this.current.lineWidth = w);
                }
              }, {
                key: "setLineCap",
                value: function(w) {
                  this.current.lineCap = L[w];
                }
              }, {
                key: "setLineJoin",
                value: function(w) {
                  this.current.lineJoin = $[w];
                }
              }, {
                key: "setMiterLimit",
                value: function(w) {
                  this.current.miterLimit = w;
                }
              }, {
                key: "setStrokeAlpha",
                value: function(w) {
                  this.current.strokeAlpha = w;
                }
              }, {
                key: "setStrokeRGBColor",
                value: function(w, p, P) {
                  this.current.strokeColor = t.Util.makeHexColor(w, p, P);
                }
              }, {
                key: "setFillAlpha",
                value: function(w) {
                  this.current.fillAlpha = w;
                }
              }, {
                key: "setFillRGBColor",
                value: function(w, p, P) {
                  this.current.fillColor = t.Util.makeHexColor(w, p, P), this.current.tspan = this.svgFactory.createElement("svg:tspan"), this.current.xcoords = [], this.current.ycoords = [];
                }
              }, {
                key: "setStrokeColorN",
                value: function(w) {
                  this.current.strokeColor = this._makeColorN_Pattern(w);
                }
              }, {
                key: "setFillColorN",
                value: function(w) {
                  this.current.fillColor = this._makeColorN_Pattern(w);
                }
              }, {
                key: "shadingFill",
                value: function(w) {
                  var p = this.viewport.width, P = this.viewport.height, F = t.Util.inverseTransform(this.transformMatrix), G = t.Util.applyTransform([0, 0], F), Z = t.Util.applyTransform([0, P], F), Y = t.Util.applyTransform([p, 0], F), de = t.Util.applyTransform([p, P], F), Se = Math.min(G[0], Z[0], Y[0], de[0]), _e = Math.min(G[1], Z[1], Y[1], de[1]), j = Math.max(G[0], Z[0], Y[0], de[0]), D = Math.max(G[1], Z[1], Y[1], de[1]), h = this.svgFactory.createElement("svg:rect");
                  h.setAttributeNS(null, "x", Se), h.setAttributeNS(null, "y", _e), h.setAttributeNS(null, "width", j - Se), h.setAttributeNS(null, "height", D - _e), h.setAttributeNS(null, "fill", this._makeShadingPattern(w)), this.current.fillAlpha < 1 && h.setAttributeNS(null, "fill-opacity", this.current.fillAlpha), this._ensureTransformGroup().appendChild(h);
                }
              }, {
                key: "_makeColorN_Pattern",
                value: function(w) {
                  return w[0] === "TilingPattern" ? this._makeTilingPattern(w) : this._makeShadingPattern(w);
                }
              }, {
                key: "_makeTilingPattern",
                value: function(w) {
                  var p = w[1], P = w[2], F = w[3] || t.IDENTITY_MATRIX, G = b(w[4], 4), Z = G[0], Y = G[1], de = G[2], Se = G[3], _e = w[5], j = w[6], D = w[7], h = "shading".concat(ae++), d = t.Util.normalizeRect([].concat(s(t.Util.applyTransform([Z, Y], F)), s(t.Util.applyTransform([de, Se], F)))), T = b(d, 4), B = T[0], z = T[1], ee = T[2], le = T[3], ve = t.Util.singularValueDecompose2dScale(F), ye = b(ve, 2), me = ye[0], we = ye[1], Pe = _e * me, Ee = j * we, Fe = this.svgFactory.createElement("svg:pattern");
                  Fe.setAttributeNS(null, "id", h), Fe.setAttributeNS(null, "patternUnits", "userSpaceOnUse"), Fe.setAttributeNS(null, "width", Pe), Fe.setAttributeNS(null, "height", Ee), Fe.setAttributeNS(null, "x", "".concat(B)), Fe.setAttributeNS(null, "y", "".concat(z));
                  var Ie = this.svg, We = this.transformMatrix, je = this.current.fillColor, fe = this.current.strokeColor, he = this.svgFactory.create(ee - B, le - z);
                  if (this.svg = he, this.transformMatrix = F, D === 2) {
                    var H = t.Util.makeHexColor.apply(t.Util, s(p));
                    this.current.fillColor = H, this.current.strokeColor = H;
                  }
                  return this.executeOpTree(this.convertOpList(P)), this.svg = Ie, this.transformMatrix = We, this.current.fillColor = je, this.current.strokeColor = fe, Fe.appendChild(he.childNodes[0]), this.defs.appendChild(Fe), "url(#".concat(h, ")");
                }
              }, {
                key: "_makeShadingPattern",
                value: function(w) {
                  switch (typeof w == "string" && (w = this.objs.get(w)), w[0]) {
                    case "RadialAxial":
                      var p = "shading".concat(ae++), P = w[3], F;
                      switch (w[1]) {
                        case "axial":
                          var G = w[4], Z = w[5];
                          F = this.svgFactory.createElement("svg:linearGradient"), F.setAttributeNS(null, "id", p), F.setAttributeNS(null, "gradientUnits", "userSpaceOnUse"), F.setAttributeNS(null, "x1", G[0]), F.setAttributeNS(null, "y1", G[1]), F.setAttributeNS(null, "x2", Z[0]), F.setAttributeNS(null, "y2", Z[1]);
                          break;
                        case "radial":
                          var Y = w[4], de = w[5], Se = w[6], _e = w[7];
                          F = this.svgFactory.createElement("svg:radialGradient"), F.setAttributeNS(null, "id", p), F.setAttributeNS(null, "gradientUnits", "userSpaceOnUse"), F.setAttributeNS(null, "cx", de[0]), F.setAttributeNS(null, "cy", de[1]), F.setAttributeNS(null, "r", _e), F.setAttributeNS(null, "fx", Y[0]), F.setAttributeNS(null, "fy", Y[1]), F.setAttributeNS(null, "fr", Se);
                          break;
                        default:
                          throw new Error("Unknown RadialAxial type: ".concat(w[1]));
                      }
                      var j = E(P), D;
                      try {
                        for (j.s(); !(D = j.n()).done; ) {
                          var h = D.value, d = this.svgFactory.createElement("svg:stop");
                          d.setAttributeNS(null, "offset", h[0]), d.setAttributeNS(null, "stop-color", h[1]), F.appendChild(d);
                        }
                      } catch (T) {
                        j.e(T);
                      } finally {
                        j.f();
                      }
                      return this.defs.appendChild(F), "url(#".concat(p, ")");
                    case "Mesh":
                      return (0, t.warn)("Unimplemented pattern Mesh"), null;
                    case "Dummy":
                      return "hotpink";
                    default:
                      throw new Error("Unknown IR type: ".concat(w[0]));
                  }
                }
              }, {
                key: "setDash",
                value: function(w, p) {
                  this.current.dashArray = w, this.current.dashPhase = p;
                }
              }, {
                key: "constructPath",
                value: function(w, p) {
                  var P = this.current, F = P.x, G = P.y, Z = [], Y = 0, de = E(w), Se;
                  try {
                    for (de.s(); !(Se = de.n()).done; ) {
                      var _e = Se.value;
                      switch (_e | 0) {
                        case t.OPS.rectangle:
                          F = p[Y++], G = p[Y++];
                          var j = p[Y++], D = p[Y++], h = F + j, d = G + D;
                          Z.push("M", v(F), v(G), "L", v(h), v(G), "L", v(h), v(d), "L", v(F), v(d), "Z");
                          break;
                        case t.OPS.moveTo:
                          F = p[Y++], G = p[Y++], Z.push("M", v(F), v(G));
                          break;
                        case t.OPS.lineTo:
                          F = p[Y++], G = p[Y++], Z.push("L", v(F), v(G));
                          break;
                        case t.OPS.curveTo:
                          F = p[Y + 4], G = p[Y + 5], Z.push("C", v(p[Y]), v(p[Y + 1]), v(p[Y + 2]), v(p[Y + 3]), v(F), v(G)), Y += 6;
                          break;
                        case t.OPS.curveTo2:
                          Z.push("C", v(F), v(G), v(p[Y]), v(p[Y + 1]), v(p[Y + 2]), v(p[Y + 3])), F = p[Y + 2], G = p[Y + 3], Y += 4;
                          break;
                        case t.OPS.curveTo3:
                          F = p[Y + 2], G = p[Y + 3], Z.push("C", v(p[Y]), v(p[Y + 1]), v(F), v(G), v(F), v(G)), Y += 4;
                          break;
                        case t.OPS.closePath:
                          Z.push("Z");
                          break;
                      }
                    }
                  } catch (T) {
                    de.e(T);
                  } finally {
                    de.f();
                  }
                  Z = Z.join(" "), P.path && w.length > 0 && w[0] !== t.OPS.rectangle && w[0] !== t.OPS.moveTo ? Z = P.path.getAttributeNS(null, "d") + Z : (P.path = this.svgFactory.createElement("svg:path"), this._ensureTransformGroup().appendChild(P.path)), P.path.setAttributeNS(null, "d", Z), P.path.setAttributeNS(null, "fill", "none"), P.element = P.path, P.setCurrentPoint(F, G);
                }
              }, {
                key: "endPath",
                value: function() {
                  var w = this.current;
                  if (w.path = null, !!this.pendingClip) {
                    if (!w.element) {
                      this.pendingClip = null;
                      return;
                    }
                    var p = "clippath".concat(te++), P = this.svgFactory.createElement("svg:clipPath");
                    P.setAttributeNS(null, "id", p), P.setAttributeNS(null, "transform", _(this.transformMatrix));
                    var F = w.element.cloneNode(!0);
                    if (this.pendingClip === "evenodd" ? F.setAttributeNS(null, "clip-rule", "evenodd") : F.setAttributeNS(null, "clip-rule", "nonzero"), this.pendingClip = null, P.appendChild(F), this.defs.appendChild(P), w.activeClipUrl) {
                      w.clipGroup = null;
                      var G = E(this.extraStack), Z;
                      try {
                        for (G.s(); !(Z = G.n()).done; ) {
                          var Y = Z.value;
                          Y.clipGroup = null;
                        }
                      } catch (de) {
                        G.e(de);
                      } finally {
                        G.f();
                      }
                      P.setAttributeNS(null, "clip-path", w.activeClipUrl);
                    }
                    w.activeClipUrl = "url(#".concat(p, ")"), this.tgrp = null;
                  }
                }
              }, {
                key: "clip",
                value: function(w) {
                  this.pendingClip = w;
                }
              }, {
                key: "closePath",
                value: function() {
                  var w = this.current;
                  if (w.path) {
                    var p = "".concat(w.path.getAttributeNS(null, "d"), "Z");
                    w.path.setAttributeNS(null, "d", p);
                  }
                }
              }, {
                key: "setLeading",
                value: function(w) {
                  this.current.leading = -w;
                }
              }, {
                key: "setTextRise",
                value: function(w) {
                  this.current.textRise = w;
                }
              }, {
                key: "setTextRenderingMode",
                value: function(w) {
                  this.current.textRenderingMode = w;
                }
              }, {
                key: "setHScale",
                value: function(w) {
                  this.current.textHScale = w / 100;
                }
              }, {
                key: "setRenderingIntent",
                value: function(w) {
                }
              }, {
                key: "setFlatness",
                value: function(w) {
                }
              }, {
                key: "setGState",
                value: function(w) {
                  var p = E(w), P;
                  try {
                    for (p.s(); !(P = p.n()).done; ) {
                      var F = b(P.value, 2), G = F[0], Z = F[1];
                      switch (G) {
                        case "LW":
                          this.setLineWidth(Z);
                          break;
                        case "LC":
                          this.setLineCap(Z);
                          break;
                        case "LJ":
                          this.setLineJoin(Z);
                          break;
                        case "ML":
                          this.setMiterLimit(Z);
                          break;
                        case "D":
                          this.setDash(Z[0], Z[1]);
                          break;
                        case "RI":
                          this.setRenderingIntent(Z);
                          break;
                        case "FL":
                          this.setFlatness(Z);
                          break;
                        case "Font":
                          this.setFont(Z);
                          break;
                        case "CA":
                          this.setStrokeAlpha(Z);
                          break;
                        case "ca":
                          this.setFillAlpha(Z);
                          break;
                        default:
                          (0, t.warn)("Unimplemented graphic state operator ".concat(G));
                          break;
                      }
                    }
                  } catch (Y) {
                    p.e(Y);
                  } finally {
                    p.f();
                  }
                }
              }, {
                key: "fill",
                value: function() {
                  var w = this.current;
                  w.element && (w.element.setAttributeNS(null, "fill", w.fillColor), w.element.setAttributeNS(null, "fill-opacity", w.fillAlpha), this.endPath());
                }
              }, {
                key: "stroke",
                value: function() {
                  var w = this.current;
                  w.element && (this._setStrokeAttributes(w.element), w.element.setAttributeNS(null, "fill", "none"), this.endPath());
                }
              }, {
                key: "_setStrokeAttributes",
                value: function(w) {
                  var p = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 1, P = this.current, F = P.dashArray;
                  p !== 1 && F.length > 0 && (F = F.map(function(G) {
                    return p * G;
                  })), w.setAttributeNS(null, "stroke", P.strokeColor), w.setAttributeNS(null, "stroke-opacity", P.strokeAlpha), w.setAttributeNS(null, "stroke-miterlimit", v(P.miterLimit)), w.setAttributeNS(null, "stroke-linecap", P.lineCap), w.setAttributeNS(null, "stroke-linejoin", P.lineJoin), w.setAttributeNS(null, "stroke-width", v(p * P.lineWidth) + "px"), w.setAttributeNS(null, "stroke-dasharray", F.map(v).join(" ")), w.setAttributeNS(null, "stroke-dashoffset", v(p * P.dashPhase) + "px");
                }
              }, {
                key: "eoFill",
                value: function() {
                  this.current.element && this.current.element.setAttributeNS(null, "fill-rule", "evenodd"), this.fill();
                }
              }, {
                key: "fillStroke",
                value: function() {
                  this.stroke(), this.fill();
                }
              }, {
                key: "eoFillStroke",
                value: function() {
                  this.current.element && this.current.element.setAttributeNS(null, "fill-rule", "evenodd"), this.fillStroke();
                }
              }, {
                key: "closeStroke",
                value: function() {
                  this.closePath(), this.stroke();
                }
              }, {
                key: "closeFillStroke",
                value: function() {
                  this.closePath(), this.fillStroke();
                }
              }, {
                key: "closeEOFillStroke",
                value: function() {
                  this.closePath(), this.eoFillStroke();
                }
              }, {
                key: "paintSolidColorImageMask",
                value: function() {
                  var w = this.svgFactory.createElement("svg:rect");
                  w.setAttributeNS(null, "x", "0"), w.setAttributeNS(null, "y", "0"), w.setAttributeNS(null, "width", "1px"), w.setAttributeNS(null, "height", "1px"), w.setAttributeNS(null, "fill", this.current.fillColor), this._ensureTransformGroup().appendChild(w);
                }
              }, {
                key: "paintImageXObject",
                value: function(w) {
                  var p = w.startsWith("g_") ? this.commonObjs.get(w) : this.objs.get(w);
                  if (!p) {
                    (0, t.warn)("Dependent image with object ID ".concat(w, " is not ready yet"));
                    return;
                  }
                  this.paintInlineImageXObject(p);
                }
              }, {
                key: "paintInlineImageXObject",
                value: function(w, p) {
                  var P = w.width, F = w.height, G = W(w, this.forceDataSchema, !!p), Z = this.svgFactory.createElement("svg:rect");
                  Z.setAttributeNS(null, "x", "0"), Z.setAttributeNS(null, "y", "0"), Z.setAttributeNS(null, "width", v(P)), Z.setAttributeNS(null, "height", v(F)), this.current.element = Z, this.clip("nonzero");
                  var Y = this.svgFactory.createElement("svg:image");
                  Y.setAttributeNS(R, "xlink:href", G), Y.setAttributeNS(null, "x", "0"), Y.setAttributeNS(null, "y", v(-F)), Y.setAttributeNS(null, "width", v(P) + "px"), Y.setAttributeNS(null, "height", v(F) + "px"), Y.setAttributeNS(null, "transform", "scale(".concat(v(1 / P), " ").concat(v(-1 / F), ")")), p ? p.appendChild(Y) : this._ensureTransformGroup().appendChild(Y);
                }
              }, {
                key: "paintImageMaskXObject",
                value: function(w) {
                  var p = this.current, P = w.width, F = w.height, G = p.fillColor;
                  p.maskId = "mask".concat(K++);
                  var Z = this.svgFactory.createElement("svg:mask");
                  Z.setAttributeNS(null, "id", p.maskId);
                  var Y = this.svgFactory.createElement("svg:rect");
                  Y.setAttributeNS(null, "x", "0"), Y.setAttributeNS(null, "y", "0"), Y.setAttributeNS(null, "width", v(P)), Y.setAttributeNS(null, "height", v(F)), Y.setAttributeNS(null, "fill", G), Y.setAttributeNS(null, "mask", "url(#".concat(p.maskId, ")")), this.defs.appendChild(Z), this._ensureTransformGroup().appendChild(Y), this.paintInlineImageXObject(w, Z);
                }
              }, {
                key: "paintFormXObjectBegin",
                value: function(w, p) {
                  if (Array.isArray(w) && w.length === 6 && this.transform(w[0], w[1], w[2], w[3], w[4], w[5]), p) {
                    var P = p[2] - p[0], F = p[3] - p[1], G = this.svgFactory.createElement("svg:rect");
                    G.setAttributeNS(null, "x", p[0]), G.setAttributeNS(null, "y", p[1]), G.setAttributeNS(null, "width", v(P)), G.setAttributeNS(null, "height", v(F)), this.current.element = G, this.clip("nonzero"), this.endPath();
                  }
                }
              }, {
                key: "paintFormXObjectEnd",
                value: function() {
                }
              }, {
                key: "_initialize",
                value: function(w) {
                  var p = this.svgFactory.create(w.width, w.height), P = this.svgFactory.createElement("svg:defs");
                  p.appendChild(P), this.defs = P;
                  var F = this.svgFactory.createElement("svg:g");
                  return F.setAttributeNS(null, "transform", _(w.transform)), p.appendChild(F), this.svg = F, p;
                }
              }, {
                key: "_ensureClipGroup",
                value: function() {
                  if (!this.current.clipGroup) {
                    var w = this.svgFactory.createElement("svg:g");
                    w.setAttributeNS(null, "clip-path", this.current.activeClipUrl), this.svg.appendChild(w), this.current.clipGroup = w;
                  }
                  return this.current.clipGroup;
                }
              }, {
                key: "_ensureTransformGroup",
                value: function() {
                  return this.tgrp || (this.tgrp = this.svgFactory.createElement("svg:g"), this.tgrp.setAttributeNS(null, "transform", _(this.transformMatrix)), this.current.activeClipUrl ? this._ensureClipGroup().appendChild(this.tgrp) : this.svg.appendChild(this.tgrp)), this.tgrp;
                }
              }]), V;
            }();
          }
        },
        (n, r, e) => {
          function t(p) {
            return typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? t = function(F) {
              return typeof F;
            } : t = function(F) {
              return F && typeof Symbol == "function" && F.constructor === Symbol && F !== Symbol.prototype ? "symbol" : typeof F;
            }, t(p);
          }
          Object.defineProperty(r, "__esModule", {
            value: !0
          }), r.PDFNodeStream = void 0;
          var a = u(e(2)), i = e(4), s = e(154);
          function u(p) {
            return p && p.__esModule ? p : { default: p };
          }
          function c(p, P) {
            if (typeof P != "function" && P !== null)
              throw new TypeError("Super expression must either be null or a function");
            p.prototype = Object.create(P && P.prototype, { constructor: { value: p, writable: !0, configurable: !0 } }), P && g(p, P);
          }
          function g(p, P) {
            return g = Object.setPrototypeOf || function(G, Z) {
              return G.__proto__ = Z, G;
            }, g(p, P);
          }
          function b(p) {
            var P = C();
            return function() {
              var G = E(p), Z;
              if (P) {
                var Y = E(this).constructor;
                Z = Reflect.construct(G, arguments, Y);
              } else
                Z = G.apply(this, arguments);
              return A(this, Z);
            };
          }
          function A(p, P) {
            if (P && (t(P) === "object" || typeof P == "function"))
              return P;
            if (P !== void 0)
              throw new TypeError("Derived constructors may only return object or undefined");
            return I(p);
          }
          function I(p) {
            if (p === void 0)
              throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return p;
          }
          function C() {
            if (typeof Reflect > "u" || !Reflect.construct || Reflect.construct.sham)
              return !1;
            if (typeof Proxy == "function")
              return !0;
            try {
              return Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
              })), !0;
            } catch {
              return !1;
            }
          }
          function E(p) {
            return E = Object.setPrototypeOf ? Object.getPrototypeOf : function(F) {
              return F.__proto__ || Object.getPrototypeOf(F);
            }, E(p);
          }
          function O(p, P, F, G, Z, Y, de) {
            try {
              var Se = p[Y](de), _e = Se.value;
            } catch (j) {
              F(j);
              return;
            }
            Se.done ? P(_e) : Promise.resolve(_e).then(G, Z);
          }
          function k(p) {
            return function() {
              var P = this, F = arguments;
              return new Promise(function(G, Z) {
                var Y = p.apply(P, F);
                function de(_e) {
                  O(Y, G, Z, de, Se, "next", _e);
                }
                function Se(_e) {
                  O(Y, G, Z, de, Se, "throw", _e);
                }
                de(void 0);
              });
            };
          }
          function N(p, P) {
            var F = typeof Symbol < "u" && p[Symbol.iterator] || p["@@iterator"];
            if (!F) {
              if (Array.isArray(p) || (F = x(p)) || P && p && typeof p.length == "number") {
                F && (p = F);
                var G = 0, Z = function() {
                };
                return { s: Z, n: function() {
                  return G >= p.length ? { done: !0 } : { done: !1, value: p[G++] };
                }, e: function(j) {
                  throw j;
                }, f: Z };
              }
              throw new TypeError(`Invalid attempt to iterate non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
            }
            var Y = !0, de = !1, Se;
            return { s: function() {
              F = F.call(p);
            }, n: function() {
              var j = F.next();
              return Y = j.done, j;
            }, e: function(j) {
              de = !0, Se = j;
            }, f: function() {
              try {
                !Y && F.return != null && F.return();
              } finally {
                if (de)
                  throw Se;
              }
            } };
          }
          function x(p, P) {
            if (!!p) {
              if (typeof p == "string")
                return U(p, P);
              var F = Object.prototype.toString.call(p).slice(8, -1);
              if (F === "Object" && p.constructor && (F = p.constructor.name), F === "Map" || F === "Set")
                return Array.from(p);
              if (F === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(F))
                return U(p, P);
            }
          }
          function U(p, P) {
            (P == null || P > p.length) && (P = p.length);
            for (var F = 0, G = new Array(P); F < P; F++)
              G[F] = p[F];
            return G;
          }
          function m(p, P) {
            if (!(p instanceof P))
              throw new TypeError("Cannot call a class as a function");
          }
          function f(p, P) {
            for (var F = 0; F < P.length; F++) {
              var G = P[F];
              G.enumerable = G.enumerable || !1, G.configurable = !0, "value" in G && (G.writable = !0), Object.defineProperty(p, G.key, G);
            }
          }
          function v(p, P, F) {
            return P && f(p.prototype, P), F && f(p, F), p;
          }
          var _ = require$$5, S = require$$5, y = require$$5, R = require$$5, L = /^file:\/\/\/[a-zA-Z]:\//;
          function $(p) {
            var P = R.parse(p);
            return P.protocol === "file:" || P.host ? P : /^[a-z]:[/\\]/i.test(p) ? R.parse("file:///".concat(p)) : (P.host || (P.protocol = "file:"), P);
          }
          var W = /* @__PURE__ */ function() {
            function p(P) {
              m(this, p), this.source = P, this.url = $(P.url), this.isHttp = this.url.protocol === "http:" || this.url.protocol === "https:", this.isFsUrl = this.url.protocol === "file:", this.httpHeaders = this.isHttp && P.httpHeaders || {}, this._fullRequestReader = null, this._rangeRequestReaders = [];
            }
            return v(p, [{
              key: "_progressiveDataLength",
              get: function() {
                var F, G;
                return (F = (G = this._fullRequestReader) === null || G === void 0 ? void 0 : G._loaded) !== null && F !== void 0 ? F : 0;
              }
            }, {
              key: "getFullReader",
              value: function() {
                return (0, i.assert)(!this._fullRequestReader, "PDFNodeStream.getFullReader can only be called once."), this._fullRequestReader = this.isFsUrl ? new q(this) : new ae(this), this._fullRequestReader;
              }
            }, {
              key: "getRangeReader",
              value: function(F, G) {
                if (G <= this._progressiveDataLength)
                  return null;
                var Z = this.isFsUrl ? new w(this, F, G) : new V(this, F, G);
                return this._rangeRequestReaders.push(Z), Z;
              }
            }, {
              key: "cancelAllRequests",
              value: function(F) {
                this._fullRequestReader && this._fullRequestReader.cancel(F);
                var G = N(this._rangeRequestReaders.slice(0)), Z;
                try {
                  for (G.s(); !(Z = G.n()).done; ) {
                    var Y = Z.value;
                    Y.cancel(F);
                  }
                } catch (de) {
                  G.e(de);
                } finally {
                  G.f();
                }
              }
            }]), p;
          }();
          r.PDFNodeStream = W;
          var X = /* @__PURE__ */ function() {
            function p(P) {
              m(this, p), this._url = P.url, this._done = !1, this._storedError = null, this.onProgress = null;
              var F = P.source;
              this._contentLength = F.length, this._loaded = 0, this._filename = null, this._disableRange = F.disableRange || !1, this._rangeChunkSize = F.rangeChunkSize, !this._rangeChunkSize && !this._disableRange && (this._disableRange = !0), this._isStreamingSupported = !F.disableStream, this._isRangeSupported = !F.disableRange, this._readableStream = null, this._readCapability = (0, i.createPromiseCapability)(), this._headersCapability = (0, i.createPromiseCapability)();
            }
            return v(p, [{
              key: "headersReady",
              get: function() {
                return this._headersCapability.promise;
              }
            }, {
              key: "filename",
              get: function() {
                return this._filename;
              }
            }, {
              key: "contentLength",
              get: function() {
                return this._contentLength;
              }
            }, {
              key: "isRangeSupported",
              get: function() {
                return this._isRangeSupported;
              }
            }, {
              key: "isStreamingSupported",
              get: function() {
                return this._isStreamingSupported;
              }
            }, {
              key: "read",
              value: function() {
                var P = k(/* @__PURE__ */ a.default.mark(function G() {
                  var Z, Y;
                  return a.default.wrap(function(Se) {
                    for (; ; )
                      switch (Se.prev = Se.next) {
                        case 0:
                          return Se.next = 2, this._readCapability.promise;
                        case 2:
                          if (!this._done) {
                            Se.next = 4;
                            break;
                          }
                          return Se.abrupt("return", {
                            value: void 0,
                            done: !0
                          });
                        case 4:
                          if (!this._storedError) {
                            Se.next = 6;
                            break;
                          }
                          throw this._storedError;
                        case 6:
                          if (Z = this._readableStream.read(), Z !== null) {
                            Se.next = 10;
                            break;
                          }
                          return this._readCapability = (0, i.createPromiseCapability)(), Se.abrupt("return", this.read());
                        case 10:
                          return this._loaded += Z.length, this.onProgress && this.onProgress({
                            loaded: this._loaded,
                            total: this._contentLength
                          }), Y = new Uint8Array(Z).buffer, Se.abrupt("return", {
                            value: Y,
                            done: !1
                          });
                        case 14:
                        case "end":
                          return Se.stop();
                      }
                  }, G, this);
                }));
                function F() {
                  return P.apply(this, arguments);
                }
                return F;
              }()
            }, {
              key: "cancel",
              value: function(F) {
                if (!this._readableStream) {
                  this._error(F);
                  return;
                }
                this._readableStream.destroy(F);
              }
            }, {
              key: "_error",
              value: function(F) {
                this._storedError = F, this._readCapability.resolve();
              }
            }, {
              key: "_setReadableStream",
              value: function(F) {
                var G = this;
                this._readableStream = F, F.on("readable", function() {
                  G._readCapability.resolve();
                }), F.on("end", function() {
                  F.destroy(), G._done = !0, G._readCapability.resolve();
                }), F.on("error", function(Z) {
                  G._error(Z);
                }), !this._isStreamingSupported && this._isRangeSupported && this._error(new i.AbortException("streaming is disabled")), this._storedError && this._readableStream.destroy(this._storedError);
              }
            }]), p;
          }(), te = /* @__PURE__ */ function() {
            function p(P) {
              m(this, p), this._url = P.url, this._done = !1, this._storedError = null, this.onProgress = null, this._loaded = 0, this._readableStream = null, this._readCapability = (0, i.createPromiseCapability)();
              var F = P.source;
              this._isStreamingSupported = !F.disableStream;
            }
            return v(p, [{
              key: "isStreamingSupported",
              get: function() {
                return this._isStreamingSupported;
              }
            }, {
              key: "read",
              value: function() {
                var P = k(/* @__PURE__ */ a.default.mark(function G() {
                  var Z, Y;
                  return a.default.wrap(function(Se) {
                    for (; ; )
                      switch (Se.prev = Se.next) {
                        case 0:
                          return Se.next = 2, this._readCapability.promise;
                        case 2:
                          if (!this._done) {
                            Se.next = 4;
                            break;
                          }
                          return Se.abrupt("return", {
                            value: void 0,
                            done: !0
                          });
                        case 4:
                          if (!this._storedError) {
                            Se.next = 6;
                            break;
                          }
                          throw this._storedError;
                        case 6:
                          if (Z = this._readableStream.read(), Z !== null) {
                            Se.next = 10;
                            break;
                          }
                          return this._readCapability = (0, i.createPromiseCapability)(), Se.abrupt("return", this.read());
                        case 10:
                          return this._loaded += Z.length, this.onProgress && this.onProgress({
                            loaded: this._loaded
                          }), Y = new Uint8Array(Z).buffer, Se.abrupt("return", {
                            value: Y,
                            done: !1
                          });
                        case 14:
                        case "end":
                          return Se.stop();
                      }
                  }, G, this);
                }));
                function F() {
                  return P.apply(this, arguments);
                }
                return F;
              }()
            }, {
              key: "cancel",
              value: function(F) {
                if (!this._readableStream) {
                  this._error(F);
                  return;
                }
                this._readableStream.destroy(F);
              }
            }, {
              key: "_error",
              value: function(F) {
                this._storedError = F, this._readCapability.resolve();
              }
            }, {
              key: "_setReadableStream",
              value: function(F) {
                var G = this;
                this._readableStream = F, F.on("readable", function() {
                  G._readCapability.resolve();
                }), F.on("end", function() {
                  F.destroy(), G._done = !0, G._readCapability.resolve();
                }), F.on("error", function(Z) {
                  G._error(Z);
                }), this._storedError && this._readableStream.destroy(this._storedError);
              }
            }]), p;
          }();
          function K(p, P) {
            return {
              protocol: p.protocol,
              auth: p.auth,
              host: p.hostname,
              port: p.port,
              path: p.path,
              method: "GET",
              headers: P
            };
          }
          var ae = /* @__PURE__ */ function(p) {
            c(F, p);
            var P = b(F);
            function F(G) {
              var Z;
              m(this, F), Z = P.call(this, G);
              var Y = function(Se) {
                if (Se.statusCode === 404) {
                  var _e = new i.MissingPDFException('Missing PDF "'.concat(Z._url, '".'));
                  Z._storedError = _e, Z._headersCapability.reject(_e);
                  return;
                }
                Z._headersCapability.resolve(), Z._setReadableStream(Se);
                var j = function(B) {
                  return Z._readableStream.headers[B.toLowerCase()];
                }, D = (0, s.validateRangeRequestCapabilities)({
                  getResponseHeader: j,
                  isHttp: G.isHttp,
                  rangeChunkSize: Z._rangeChunkSize,
                  disableRange: Z._disableRange
                }), h = D.allowRangeRequests, d = D.suggestedLength;
                Z._isRangeSupported = h, Z._contentLength = d || Z._contentLength, Z._filename = (0, s.extractFilenameFromHeader)(j);
              };
              return Z._request = null, Z._url.protocol === "http:" ? Z._request = S.request(K(Z._url, G.httpHeaders), Y) : Z._request = y.request(K(Z._url, G.httpHeaders), Y), Z._request.on("error", function(de) {
                Z._storedError = de, Z._headersCapability.reject(de);
              }), Z._request.end(), Z;
            }
            return F;
          }(X), V = /* @__PURE__ */ function(p) {
            c(F, p);
            var P = b(F);
            function F(G, Z, Y) {
              var de;
              m(this, F), de = P.call(this, G), de._httpHeaders = {};
              for (var Se in G.httpHeaders) {
                var _e = G.httpHeaders[Se];
                typeof _e > "u" || (de._httpHeaders[Se] = _e);
              }
              de._httpHeaders.Range = "bytes=".concat(Z, "-").concat(Y - 1);
              var j = function(h) {
                if (h.statusCode === 404) {
                  var d = new i.MissingPDFException('Missing PDF "'.concat(de._url, '".'));
                  de._storedError = d;
                  return;
                }
                de._setReadableStream(h);
              };
              return de._request = null, de._url.protocol === "http:" ? de._request = S.request(K(de._url, de._httpHeaders), j) : de._request = y.request(K(de._url, de._httpHeaders), j), de._request.on("error", function(D) {
                de._storedError = D;
              }), de._request.end(), de;
            }
            return F;
          }(te), q = /* @__PURE__ */ function(p) {
            c(F, p);
            var P = b(F);
            function F(G) {
              var Z;
              m(this, F), Z = P.call(this, G);
              var Y = decodeURIComponent(Z._url.path);
              return L.test(Z._url.href) && (Y = Y.replace(/^\//, "")), _.lstat(Y, function(de, Se) {
                if (de) {
                  de.code === "ENOENT" && (de = new i.MissingPDFException('Missing PDF "'.concat(Y, '".'))), Z._storedError = de, Z._headersCapability.reject(de);
                  return;
                }
                Z._contentLength = Se.size, Z._setReadableStream(_.createReadStream(Y)), Z._headersCapability.resolve();
              }), Z;
            }
            return F;
          }(X), w = /* @__PURE__ */ function(p) {
            c(F, p);
            var P = b(F);
            function F(G, Z, Y) {
              var de;
              m(this, F), de = P.call(this, G);
              var Se = decodeURIComponent(de._url.path);
              return L.test(de._url.href) && (Se = Se.replace(/^\//, "")), de._setReadableStream(_.createReadStream(Se, {
                start: Z,
                end: Y - 1
              })), de;
            }
            return F;
          }(te);
        },
        (n, r, e) => {
          Object.defineProperty(r, "__esModule", {
            value: !0
          }), r.createResponseStatusError = c, r.extractFilenameFromHeader = u, r.validateRangeRequestCapabilities = s, r.validateResponseStatus = g;
          var t = e(4), a = e(155), i = e(1);
          function s(b) {
            var A = b.getResponseHeader, I = b.isHttp, C = b.rangeChunkSize, E = b.disableRange;
            (0, t.assert)(C > 0, "Range chunk size must be larger than zero");
            var O = {
              allowRangeRequests: !1,
              suggestedLength: void 0
            }, k = parseInt(A("Content-Length"), 10);
            if (!Number.isInteger(k) || (O.suggestedLength = k, k <= 2 * C) || E || !I || A("Accept-Ranges") !== "bytes")
              return O;
            var N = A("Content-Encoding") || "identity";
            return N !== "identity" || (O.allowRangeRequests = !0), O;
          }
          function u(b) {
            var A = b("Content-Disposition");
            if (A) {
              var I = (0, a.getFilenameFromContentDispositionHeader)(A);
              if (I.includes("%"))
                try {
                  I = decodeURIComponent(I);
                } catch {
                }
              if ((0, i.isPdfFile)(I))
                return I;
            }
            return null;
          }
          function c(b, A) {
            return b === 404 || b === 0 && A.startsWith("file:") ? new t.MissingPDFException('Missing PDF "' + A + '".') : new t.UnexpectedResponseException("Unexpected server response (".concat(b, ') while retrieving PDF "').concat(A, '".'), b);
          }
          function g(b) {
            return b === 200 || b === 206;
          }
        },
        (n, r, e) => {
          Object.defineProperty(r, "__esModule", {
            value: !0
          }), r.getFilenameFromContentDispositionHeader = b;
          var t = e(4);
          function a(A, I) {
            return g(A) || c(A, I) || s(A, I) || i();
          }
          function i() {
            throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
          }
          function s(A, I) {
            if (!!A) {
              if (typeof A == "string")
                return u(A, I);
              var C = Object.prototype.toString.call(A).slice(8, -1);
              if (C === "Object" && A.constructor && (C = A.constructor.name), C === "Map" || C === "Set")
                return Array.from(A);
              if (C === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(C))
                return u(A, I);
            }
          }
          function u(A, I) {
            (I == null || I > A.length) && (I = A.length);
            for (var C = 0, E = new Array(I); C < I; C++)
              E[C] = A[C];
            return E;
          }
          function c(A, I) {
            var C = A == null ? null : typeof Symbol < "u" && A[Symbol.iterator] || A["@@iterator"];
            if (C != null) {
              var E = [], O = !0, k = !1, N, x;
              try {
                for (C = C.call(A); !(O = (N = C.next()).done) && (E.push(N.value), !(I && E.length === I)); O = !0)
                  ;
              } catch (U) {
                k = !0, x = U;
              } finally {
                try {
                  !O && C.return != null && C.return();
                } finally {
                  if (k)
                    throw x;
                }
              }
              return E;
            }
          }
          function g(A) {
            if (Array.isArray(A))
              return A;
          }
          function b(A) {
            var I = !0, C = N("filename\\*", "i").exec(A);
            if (C) {
              C = C[1];
              var E = f(C);
              return E = unescape(E), E = v(E), E = _(E), U(E);
            }
            if (C = m(A), C) {
              var O = _(C);
              return U(O);
            }
            if (C = N("filename", "i").exec(A), C) {
              C = C[1];
              var k = f(C);
              return k = _(k), U(k);
            }
            function N(S, y) {
              return new RegExp("(?:^|;)\\s*" + S + '\\s*=\\s*([^";\\s][^;\\s]*|"(?:[^"\\\\]|\\\\"?)+"?)', y);
            }
            function x(S, y) {
              if (S) {
                if (!/^[\x00-\xFF]+$/.test(y))
                  return y;
                try {
                  var R = new TextDecoder(S, {
                    fatal: !0
                  }), L = (0, t.stringToBytes)(y);
                  y = R.decode(L), I = !1;
                } catch {
                  if (/^utf-?8$/i.test(S))
                    try {
                      y = decodeURIComponent(escape(y)), I = !1;
                    } catch {
                    }
                }
              }
              return y;
            }
            function U(S) {
              return I && /[\x80-\xff]/.test(S) && (S = x("utf-8", S), I && (S = x("iso-8859-1", S))), S;
            }
            function m(S) {
              for (var y = [], R, L = N("filename\\*((?!0\\d)\\d+)(\\*?)", "ig"); (R = L.exec(S)) !== null; ) {
                var $ = R, W = a($, 4), X = W[1], te = W[2], K = W[3];
                if (X = parseInt(X, 10), X in y) {
                  if (X === 0)
                    break;
                  continue;
                }
                y[X] = [te, K];
              }
              for (var ae = [], V = 0; V < y.length && V in y; ++V) {
                var q = a(y[V], 2), w = q[0], p = q[1];
                p = f(p), w && (p = unescape(p), V === 0 && (p = v(p))), ae.push(p);
              }
              return ae.join("");
            }
            function f(S) {
              if (S.startsWith('"')) {
                for (var y = S.slice(1).split('\\"'), R = 0; R < y.length; ++R) {
                  var L = y[R].indexOf('"');
                  L !== -1 && (y[R] = y[R].slice(0, L), y.length = R + 1), y[R] = y[R].replace(/\\(.)/g, "$1");
                }
                S = y.join('"');
              }
              return S;
            }
            function v(S) {
              var y = S.indexOf("'");
              if (y === -1)
                return S;
              var R = S.slice(0, y), L = S.slice(y + 1), $ = L.replace(/^[^']*'/, "");
              return x(R, $);
            }
            function _(S) {
              return !S.startsWith("=?") || /[\x00-\x19\x80-\xff]/.test(S) ? S : S.replace(/=\?([\w-]*)\?([QqBb])\?((?:[^?]|\?(?!=))*)\?=/g, function(y, R, L, $) {
                if (L === "q" || L === "Q")
                  return $ = $.replace(/_/g, " "), $ = $.replace(/=([0-9a-fA-F]{2})/g, function(W, X) {
                    return String.fromCharCode(parseInt(X, 16));
                  }), x(R, $);
                try {
                  $ = atob($);
                } catch {
                }
                return x(R, $);
              });
            }
            return "";
          }
        },
        (n, r, e) => {
          Object.defineProperty(r, "__esModule", {
            value: !0
          }), r.PDFNetworkStream = void 0;
          var t = s(e(2)), a = e(4), i = e(154);
          function s(v) {
            return v && v.__esModule ? v : { default: v };
          }
          function u(v, _, S, y, R, L, $) {
            try {
              var W = v[L]($), X = W.value;
            } catch (te) {
              S(te);
              return;
            }
            W.done ? _(X) : Promise.resolve(X).then(y, R);
          }
          function c(v) {
            return function() {
              var _ = this, S = arguments;
              return new Promise(function(y, R) {
                var L = v.apply(_, S);
                function $(X) {
                  u(L, y, R, $, W, "next", X);
                }
                function W(X) {
                  u(L, y, R, $, W, "throw", X);
                }
                $(void 0);
              });
            };
          }
          function g(v, _) {
            var S = typeof Symbol < "u" && v[Symbol.iterator] || v["@@iterator"];
            if (!S) {
              if (Array.isArray(v) || (S = b(v)) || _ && v && typeof v.length == "number") {
                S && (v = S);
                var y = 0, R = function() {
                };
                return { s: R, n: function() {
                  return y >= v.length ? { done: !0 } : { done: !1, value: v[y++] };
                }, e: function(te) {
                  throw te;
                }, f: R };
              }
              throw new TypeError(`Invalid attempt to iterate non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
            }
            var L = !0, $ = !1, W;
            return { s: function() {
              S = S.call(v);
            }, n: function() {
              var te = S.next();
              return L = te.done, te;
            }, e: function(te) {
              $ = !0, W = te;
            }, f: function() {
              try {
                !L && S.return != null && S.return();
              } finally {
                if ($)
                  throw W;
              }
            } };
          }
          function b(v, _) {
            if (!!v) {
              if (typeof v == "string")
                return A(v, _);
              var S = Object.prototype.toString.call(v).slice(8, -1);
              if (S === "Object" && v.constructor && (S = v.constructor.name), S === "Map" || S === "Set")
                return Array.from(v);
              if (S === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(S))
                return A(v, _);
            }
          }
          function A(v, _) {
            (_ == null || _ > v.length) && (_ = v.length);
            for (var S = 0, y = new Array(_); S < _; S++)
              y[S] = v[S];
            return y;
          }
          function I(v, _) {
            if (!(v instanceof _))
              throw new TypeError("Cannot call a class as a function");
          }
          function C(v, _) {
            for (var S = 0; S < _.length; S++) {
              var y = _[S];
              y.enumerable = y.enumerable || !1, y.configurable = !0, "value" in y && (y.writable = !0), Object.defineProperty(v, y.key, y);
            }
          }
          function E(v, _, S) {
            return _ && C(v.prototype, _), S && C(v, S), v;
          }
          var O = 200, k = 206;
          function N(v) {
            var _ = v.response;
            if (typeof _ != "string")
              return _;
            var S = (0, a.stringToBytes)(_);
            return S.buffer;
          }
          var x = /* @__PURE__ */ function() {
            function v(_) {
              var S = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
              I(this, v), this.url = _, this.isHttp = /^https?:/i.test(_), this.httpHeaders = this.isHttp && S.httpHeaders || /* @__PURE__ */ Object.create(null), this.withCredentials = S.withCredentials || !1, this.getXhr = S.getXhr || function() {
                return new XMLHttpRequest();
              }, this.currXhrId = 0, this.pendingRequests = /* @__PURE__ */ Object.create(null);
            }
            return E(v, [{
              key: "requestRange",
              value: function(S, y, R) {
                var L = {
                  begin: S,
                  end: y
                };
                for (var $ in R)
                  L[$] = R[$];
                return this.request(L);
              }
            }, {
              key: "requestFull",
              value: function(S) {
                return this.request(S);
              }
            }, {
              key: "request",
              value: function(S) {
                var y = this.getXhr(), R = this.currXhrId++, L = this.pendingRequests[R] = {
                  xhr: y
                };
                y.open("GET", this.url), y.withCredentials = this.withCredentials;
                for (var $ in this.httpHeaders) {
                  var W = this.httpHeaders[$];
                  typeof W > "u" || y.setRequestHeader($, W);
                }
                return this.isHttp && "begin" in S && "end" in S ? (y.setRequestHeader("Range", "bytes=".concat(S.begin, "-").concat(S.end - 1)), L.expectedStatus = k) : L.expectedStatus = O, y.responseType = "arraybuffer", S.onError && (y.onerror = function(X) {
                  S.onError(y.status);
                }), y.onreadystatechange = this.onStateChange.bind(this, R), y.onprogress = this.onProgress.bind(this, R), L.onHeadersReceived = S.onHeadersReceived, L.onDone = S.onDone, L.onError = S.onError, L.onProgress = S.onProgress, y.send(null), R;
              }
            }, {
              key: "onProgress",
              value: function(S, y) {
                var R, L = this.pendingRequests[S];
                !L || (R = L.onProgress) === null || R === void 0 || R.call(L, y);
              }
            }, {
              key: "onStateChange",
              value: function(S, y) {
                var R = this.pendingRequests[S];
                if (!!R) {
                  var L = R.xhr;
                  if (L.readyState >= 2 && R.onHeadersReceived && (R.onHeadersReceived(), delete R.onHeadersReceived), L.readyState === 4 && S in this.pendingRequests) {
                    if (delete this.pendingRequests[S], L.status === 0 && this.isHttp) {
                      var $;
                      ($ = R.onError) === null || $ === void 0 || $.call(R, L.status);
                      return;
                    }
                    var W = L.status || O, X = W === O && R.expectedStatus === k;
                    if (!X && W !== R.expectedStatus) {
                      var te;
                      (te = R.onError) === null || te === void 0 || te.call(R, L.status);
                      return;
                    }
                    var K = N(L);
                    if (W === k) {
                      var ae = L.getResponseHeader("Content-Range"), V = /bytes (\d+)-(\d+)\/(\d+)/.exec(ae);
                      R.onDone({
                        begin: parseInt(V[1], 10),
                        chunk: K
                      });
                    } else if (K)
                      R.onDone({
                        begin: 0,
                        chunk: K
                      });
                    else {
                      var q;
                      (q = R.onError) === null || q === void 0 || q.call(R, L.status);
                    }
                  }
                }
              }
            }, {
              key: "getRequestXhr",
              value: function(S) {
                return this.pendingRequests[S].xhr;
              }
            }, {
              key: "isPendingRequest",
              value: function(S) {
                return S in this.pendingRequests;
              }
            }, {
              key: "abortRequest",
              value: function(S) {
                var y = this.pendingRequests[S].xhr;
                delete this.pendingRequests[S], y.abort();
              }
            }]), v;
          }(), U = /* @__PURE__ */ function() {
            function v(_) {
              I(this, v), this._source = _, this._manager = new x(_.url, {
                httpHeaders: _.httpHeaders,
                withCredentials: _.withCredentials
              }), this._rangeChunkSize = _.rangeChunkSize, this._fullRequestReader = null, this._rangeRequestReaders = [];
            }
            return E(v, [{
              key: "_onRangeRequestReaderClosed",
              value: function(S) {
                var y = this._rangeRequestReaders.indexOf(S);
                y >= 0 && this._rangeRequestReaders.splice(y, 1);
              }
            }, {
              key: "getFullReader",
              value: function() {
                return (0, a.assert)(!this._fullRequestReader, "PDFNetworkStream.getFullReader can only be called once."), this._fullRequestReader = new m(this._manager, this._source), this._fullRequestReader;
              }
            }, {
              key: "getRangeReader",
              value: function(S, y) {
                var R = new f(this._manager, S, y);
                return R.onClosed = this._onRangeRequestReaderClosed.bind(this), this._rangeRequestReaders.push(R), R;
              }
            }, {
              key: "cancelAllRequests",
              value: function(S) {
                var y;
                (y = this._fullRequestReader) === null || y === void 0 || y.cancel(S);
                var R = g(this._rangeRequestReaders.slice(0)), L;
                try {
                  for (R.s(); !(L = R.n()).done; ) {
                    var $ = L.value;
                    $.cancel(S);
                  }
                } catch (W) {
                  R.e(W);
                } finally {
                  R.f();
                }
              }
            }]), v;
          }();
          r.PDFNetworkStream = U;
          var m = /* @__PURE__ */ function() {
            function v(_, S) {
              I(this, v), this._manager = _;
              var y = {
                onHeadersReceived: this._onHeadersReceived.bind(this),
                onDone: this._onDone.bind(this),
                onError: this._onError.bind(this),
                onProgress: this._onProgress.bind(this)
              };
              this._url = S.url, this._fullRequestId = _.requestFull(y), this._headersReceivedCapability = (0, a.createPromiseCapability)(), this._disableRange = S.disableRange || !1, this._contentLength = S.length, this._rangeChunkSize = S.rangeChunkSize, !this._rangeChunkSize && !this._disableRange && (this._disableRange = !0), this._isStreamingSupported = !1, this._isRangeSupported = !1, this._cachedChunks = [], this._requests = [], this._done = !1, this._storedError = void 0, this._filename = null, this.onProgress = null;
            }
            return E(v, [{
              key: "_onHeadersReceived",
              value: function() {
                var S = this._fullRequestId, y = this._manager.getRequestXhr(S), R = function(te) {
                  return y.getResponseHeader(te);
                }, L = (0, i.validateRangeRequestCapabilities)({
                  getResponseHeader: R,
                  isHttp: this._manager.isHttp,
                  rangeChunkSize: this._rangeChunkSize,
                  disableRange: this._disableRange
                }), $ = L.allowRangeRequests, W = L.suggestedLength;
                $ && (this._isRangeSupported = !0), this._contentLength = W || this._contentLength, this._filename = (0, i.extractFilenameFromHeader)(R), this._isRangeSupported && this._manager.abortRequest(S), this._headersReceivedCapability.resolve();
              }
            }, {
              key: "_onDone",
              value: function(S) {
                if (S)
                  if (this._requests.length > 0) {
                    var y = this._requests.shift();
                    y.resolve({
                      value: S.chunk,
                      done: !1
                    });
                  } else
                    this._cachedChunks.push(S.chunk);
                if (this._done = !0, !(this._cachedChunks.length > 0)) {
                  var R = g(this._requests), L;
                  try {
                    for (R.s(); !(L = R.n()).done; ) {
                      var $ = L.value;
                      $.resolve({
                        value: void 0,
                        done: !0
                      });
                    }
                  } catch (W) {
                    R.e(W);
                  } finally {
                    R.f();
                  }
                  this._requests.length = 0;
                }
              }
            }, {
              key: "_onError",
              value: function(S) {
                this._storedError = (0, i.createResponseStatusError)(S, this._url), this._headersReceivedCapability.reject(this._storedError);
                var y = g(this._requests), R;
                try {
                  for (y.s(); !(R = y.n()).done; ) {
                    var L = R.value;
                    L.reject(this._storedError);
                  }
                } catch ($) {
                  y.e($);
                } finally {
                  y.f();
                }
                this._requests.length = 0, this._cachedChunks.length = 0;
              }
            }, {
              key: "_onProgress",
              value: function(S) {
                var y;
                (y = this.onProgress) === null || y === void 0 || y.call(this, {
                  loaded: S.loaded,
                  total: S.lengthComputable ? S.total : this._contentLength
                });
              }
            }, {
              key: "filename",
              get: function() {
                return this._filename;
              }
            }, {
              key: "isRangeSupported",
              get: function() {
                return this._isRangeSupported;
              }
            }, {
              key: "isStreamingSupported",
              get: function() {
                return this._isStreamingSupported;
              }
            }, {
              key: "contentLength",
              get: function() {
                return this._contentLength;
              }
            }, {
              key: "headersReady",
              get: function() {
                return this._headersReceivedCapability.promise;
              }
            }, {
              key: "read",
              value: function() {
                var _ = c(/* @__PURE__ */ t.default.mark(function y() {
                  var R, L;
                  return t.default.wrap(function(W) {
                    for (; ; )
                      switch (W.prev = W.next) {
                        case 0:
                          if (!this._storedError) {
                            W.next = 2;
                            break;
                          }
                          throw this._storedError;
                        case 2:
                          if (!(this._cachedChunks.length > 0)) {
                            W.next = 5;
                            break;
                          }
                          return R = this._cachedChunks.shift(), W.abrupt("return", {
                            value: R,
                            done: !1
                          });
                        case 5:
                          if (!this._done) {
                            W.next = 7;
                            break;
                          }
                          return W.abrupt("return", {
                            value: void 0,
                            done: !0
                          });
                        case 7:
                          return L = (0, a.createPromiseCapability)(), this._requests.push(L), W.abrupt("return", L.promise);
                        case 10:
                        case "end":
                          return W.stop();
                      }
                  }, y, this);
                }));
                function S() {
                  return _.apply(this, arguments);
                }
                return S;
              }()
            }, {
              key: "cancel",
              value: function(S) {
                this._done = !0, this._headersReceivedCapability.reject(S);
                var y = g(this._requests), R;
                try {
                  for (y.s(); !(R = y.n()).done; ) {
                    var L = R.value;
                    L.resolve({
                      value: void 0,
                      done: !0
                    });
                  }
                } catch ($) {
                  y.e($);
                } finally {
                  y.f();
                }
                this._requests.length = 0, this._manager.isPendingRequest(this._fullRequestId) && this._manager.abortRequest(this._fullRequestId), this._fullRequestReader = null;
              }
            }]), v;
          }(), f = /* @__PURE__ */ function() {
            function v(_, S, y) {
              I(this, v), this._manager = _;
              var R = {
                onDone: this._onDone.bind(this),
                onError: this._onError.bind(this),
                onProgress: this._onProgress.bind(this)
              };
              this._url = _.url, this._requestId = _.requestRange(S, y, R), this._requests = [], this._queuedChunk = null, this._done = !1, this._storedError = void 0, this.onProgress = null, this.onClosed = null;
            }
            return E(v, [{
              key: "_close",
              value: function() {
                var S;
                (S = this.onClosed) === null || S === void 0 || S.call(this, this);
              }
            }, {
              key: "_onDone",
              value: function(S) {
                var y = S.chunk;
                if (this._requests.length > 0) {
                  var R = this._requests.shift();
                  R.resolve({
                    value: y,
                    done: !1
                  });
                } else
                  this._queuedChunk = y;
                this._done = !0;
                var L = g(this._requests), $;
                try {
                  for (L.s(); !($ = L.n()).done; ) {
                    var W = $.value;
                    W.resolve({
                      value: void 0,
                      done: !0
                    });
                  }
                } catch (X) {
                  L.e(X);
                } finally {
                  L.f();
                }
                this._requests.length = 0, this._close();
              }
            }, {
              key: "_onError",
              value: function(S) {
                this._storedError = (0, i.createResponseStatusError)(S, this._url);
                var y = g(this._requests), R;
                try {
                  for (y.s(); !(R = y.n()).done; ) {
                    var L = R.value;
                    L.reject(this._storedError);
                  }
                } catch ($) {
                  y.e($);
                } finally {
                  y.f();
                }
                this._requests.length = 0, this._queuedChunk = null;
              }
            }, {
              key: "_onProgress",
              value: function(S) {
                if (!this.isStreamingSupported) {
                  var y;
                  (y = this.onProgress) === null || y === void 0 || y.call(this, {
                    loaded: S.loaded
                  });
                }
              }
            }, {
              key: "isStreamingSupported",
              get: function() {
                return !1;
              }
            }, {
              key: "read",
              value: function() {
                var _ = c(/* @__PURE__ */ t.default.mark(function y() {
                  var R, L;
                  return t.default.wrap(function(W) {
                    for (; ; )
                      switch (W.prev = W.next) {
                        case 0:
                          if (!this._storedError) {
                            W.next = 2;
                            break;
                          }
                          throw this._storedError;
                        case 2:
                          if (this._queuedChunk === null) {
                            W.next = 6;
                            break;
                          }
                          return R = this._queuedChunk, this._queuedChunk = null, W.abrupt("return", {
                            value: R,
                            done: !1
                          });
                        case 6:
                          if (!this._done) {
                            W.next = 8;
                            break;
                          }
                          return W.abrupt("return", {
                            value: void 0,
                            done: !0
                          });
                        case 8:
                          return L = (0, a.createPromiseCapability)(), this._requests.push(L), W.abrupt("return", L.promise);
                        case 11:
                        case "end":
                          return W.stop();
                      }
                  }, y, this);
                }));
                function S() {
                  return _.apply(this, arguments);
                }
                return S;
              }()
            }, {
              key: "cancel",
              value: function(S) {
                this._done = !0;
                var y = g(this._requests), R;
                try {
                  for (y.s(); !(R = y.n()).done; ) {
                    var L = R.value;
                    L.resolve({
                      value: void 0,
                      done: !0
                    });
                  }
                } catch ($) {
                  y.e($);
                } finally {
                  y.f();
                }
                this._requests.length = 0, this._manager.isPendingRequest(this._requestId) && this._manager.abortRequest(this._requestId), this._close();
              }
            }]), v;
          }();
        },
        (n, r, e) => {
          Object.defineProperty(r, "__esModule", {
            value: !0
          }), r.PDFFetchStream = void 0;
          var t = s(e(2)), a = e(4), i = e(154);
          function s(m) {
            return m && m.__esModule ? m : { default: m };
          }
          function u(m, f, v, _, S, y, R) {
            try {
              var L = m[y](R), $ = L.value;
            } catch (W) {
              v(W);
              return;
            }
            L.done ? f($) : Promise.resolve($).then(_, S);
          }
          function c(m) {
            return function() {
              var f = this, v = arguments;
              return new Promise(function(_, S) {
                var y = m.apply(f, v);
                function R($) {
                  u(y, _, S, R, L, "next", $);
                }
                function L($) {
                  u(y, _, S, R, L, "throw", $);
                }
                R(void 0);
              });
            };
          }
          function g(m, f) {
            var v = typeof Symbol < "u" && m[Symbol.iterator] || m["@@iterator"];
            if (!v) {
              if (Array.isArray(m) || (v = b(m)) || f && m && typeof m.length == "number") {
                v && (m = v);
                var _ = 0, S = function() {
                };
                return { s: S, n: function() {
                  return _ >= m.length ? { done: !0 } : { done: !1, value: m[_++] };
                }, e: function(W) {
                  throw W;
                }, f: S };
              }
              throw new TypeError(`Invalid attempt to iterate non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
            }
            var y = !0, R = !1, L;
            return { s: function() {
              v = v.call(m);
            }, n: function() {
              var W = v.next();
              return y = W.done, W;
            }, e: function(W) {
              R = !0, L = W;
            }, f: function() {
              try {
                !y && v.return != null && v.return();
              } finally {
                if (R)
                  throw L;
              }
            } };
          }
          function b(m, f) {
            if (!!m) {
              if (typeof m == "string")
                return A(m, f);
              var v = Object.prototype.toString.call(m).slice(8, -1);
              if (v === "Object" && m.constructor && (v = m.constructor.name), v === "Map" || v === "Set")
                return Array.from(m);
              if (v === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(v))
                return A(m, f);
            }
          }
          function A(m, f) {
            (f == null || f > m.length) && (f = m.length);
            for (var v = 0, _ = new Array(f); v < f; v++)
              _[v] = m[v];
            return _;
          }
          function I(m, f) {
            if (!(m instanceof f))
              throw new TypeError("Cannot call a class as a function");
          }
          function C(m, f) {
            for (var v = 0; v < f.length; v++) {
              var _ = f[v];
              _.enumerable = _.enumerable || !1, _.configurable = !0, "value" in _ && (_.writable = !0), Object.defineProperty(m, _.key, _);
            }
          }
          function E(m, f, v) {
            return f && C(m.prototype, f), v && C(m, v), m;
          }
          function O(m, f, v) {
            return {
              method: "GET",
              headers: m,
              signal: v == null ? void 0 : v.signal,
              mode: "cors",
              credentials: f ? "include" : "same-origin",
              redirect: "follow"
            };
          }
          function k(m) {
            var f = new Headers();
            for (var v in m) {
              var _ = m[v];
              typeof _ > "u" || f.append(v, _);
            }
            return f;
          }
          var N = /* @__PURE__ */ function() {
            function m(f) {
              I(this, m), this.source = f, this.isHttp = /^https?:/i.test(f.url), this.httpHeaders = this.isHttp && f.httpHeaders || {}, this._fullRequestReader = null, this._rangeRequestReaders = [];
            }
            return E(m, [{
              key: "_progressiveDataLength",
              get: function() {
                var v, _;
                return (v = (_ = this._fullRequestReader) === null || _ === void 0 ? void 0 : _._loaded) !== null && v !== void 0 ? v : 0;
              }
            }, {
              key: "getFullReader",
              value: function() {
                return (0, a.assert)(!this._fullRequestReader, "PDFFetchStream.getFullReader can only be called once."), this._fullRequestReader = new x(this), this._fullRequestReader;
              }
            }, {
              key: "getRangeReader",
              value: function(v, _) {
                if (_ <= this._progressiveDataLength)
                  return null;
                var S = new U(this, v, _);
                return this._rangeRequestReaders.push(S), S;
              }
            }, {
              key: "cancelAllRequests",
              value: function(v) {
                this._fullRequestReader && this._fullRequestReader.cancel(v);
                var _ = g(this._rangeRequestReaders.slice(0)), S;
                try {
                  for (_.s(); !(S = _.n()).done; ) {
                    var y = S.value;
                    y.cancel(v);
                  }
                } catch (R) {
                  _.e(R);
                } finally {
                  _.f();
                }
              }
            }]), m;
          }();
          r.PDFFetchStream = N;
          var x = /* @__PURE__ */ function() {
            function m(f) {
              var v = this;
              I(this, m), this._stream = f, this._reader = null, this._loaded = 0, this._filename = null;
              var _ = f.source;
              this._withCredentials = _.withCredentials || !1, this._contentLength = _.length, this._headersCapability = (0, a.createPromiseCapability)(), this._disableRange = _.disableRange || !1, this._rangeChunkSize = _.rangeChunkSize, !this._rangeChunkSize && !this._disableRange && (this._disableRange = !0), typeof AbortController < "u" && (this._abortController = new AbortController()), this._isStreamingSupported = !_.disableStream, this._isRangeSupported = !_.disableRange, this._headers = k(this._stream.httpHeaders);
              var S = _.url;
              fetch(S, O(this._headers, this._withCredentials, this._abortController)).then(function(y) {
                if (!(0, i.validateResponseStatus)(y.status))
                  throw (0, i.createResponseStatusError)(y.status, S);
                v._reader = y.body.getReader(), v._headersCapability.resolve();
                var R = function(te) {
                  return y.headers.get(te);
                }, L = (0, i.validateRangeRequestCapabilities)({
                  getResponseHeader: R,
                  isHttp: v._stream.isHttp,
                  rangeChunkSize: v._rangeChunkSize,
                  disableRange: v._disableRange
                }), $ = L.allowRangeRequests, W = L.suggestedLength;
                v._isRangeSupported = $, v._contentLength = W || v._contentLength, v._filename = (0, i.extractFilenameFromHeader)(R), !v._isStreamingSupported && v._isRangeSupported && v.cancel(new a.AbortException("Streaming is disabled."));
              }).catch(this._headersCapability.reject), this.onProgress = null;
            }
            return E(m, [{
              key: "headersReady",
              get: function() {
                return this._headersCapability.promise;
              }
            }, {
              key: "filename",
              get: function() {
                return this._filename;
              }
            }, {
              key: "contentLength",
              get: function() {
                return this._contentLength;
              }
            }, {
              key: "isRangeSupported",
              get: function() {
                return this._isRangeSupported;
              }
            }, {
              key: "isStreamingSupported",
              get: function() {
                return this._isStreamingSupported;
              }
            }, {
              key: "read",
              value: function() {
                var f = c(/* @__PURE__ */ t.default.mark(function _() {
                  var S, y, R, L;
                  return t.default.wrap(function(W) {
                    for (; ; )
                      switch (W.prev = W.next) {
                        case 0:
                          return W.next = 2, this._headersCapability.promise;
                        case 2:
                          return W.next = 4, this._reader.read();
                        case 4:
                          if (S = W.sent, y = S.value, R = S.done, !R) {
                            W.next = 9;
                            break;
                          }
                          return W.abrupt("return", {
                            value: y,
                            done: R
                          });
                        case 9:
                          return this._loaded += y.byteLength, this.onProgress && this.onProgress({
                            loaded: this._loaded,
                            total: this._contentLength
                          }), L = new Uint8Array(y).buffer, W.abrupt("return", {
                            value: L,
                            done: !1
                          });
                        case 13:
                        case "end":
                          return W.stop();
                      }
                  }, _, this);
                }));
                function v() {
                  return f.apply(this, arguments);
                }
                return v;
              }()
            }, {
              key: "cancel",
              value: function(v) {
                this._reader && this._reader.cancel(v), this._abortController && this._abortController.abort();
              }
            }]), m;
          }(), U = /* @__PURE__ */ function() {
            function m(f, v, _) {
              var S = this;
              I(this, m), this._stream = f, this._reader = null, this._loaded = 0;
              var y = f.source;
              this._withCredentials = y.withCredentials || !1, this._readCapability = (0, a.createPromiseCapability)(), this._isStreamingSupported = !y.disableStream, typeof AbortController < "u" && (this._abortController = new AbortController()), this._headers = k(this._stream.httpHeaders), this._headers.append("Range", "bytes=".concat(v, "-").concat(_ - 1));
              var R = y.url;
              fetch(R, O(this._headers, this._withCredentials, this._abortController)).then(function(L) {
                if (!(0, i.validateResponseStatus)(L.status))
                  throw (0, i.createResponseStatusError)(L.status, R);
                S._readCapability.resolve(), S._reader = L.body.getReader();
              }).catch(this._readCapability.reject), this.onProgress = null;
            }
            return E(m, [{
              key: "isStreamingSupported",
              get: function() {
                return this._isStreamingSupported;
              }
            }, {
              key: "read",
              value: function() {
                var f = c(/* @__PURE__ */ t.default.mark(function _() {
                  var S, y, R, L;
                  return t.default.wrap(function(W) {
                    for (; ; )
                      switch (W.prev = W.next) {
                        case 0:
                          return W.next = 2, this._readCapability.promise;
                        case 2:
                          return W.next = 4, this._reader.read();
                        case 4:
                          if (S = W.sent, y = S.value, R = S.done, !R) {
                            W.next = 9;
                            break;
                          }
                          return W.abrupt("return", {
                            value: y,
                            done: R
                          });
                        case 9:
                          return this._loaded += y.byteLength, this.onProgress && this.onProgress({
                            loaded: this._loaded
                          }), L = new Uint8Array(y).buffer, W.abrupt("return", {
                            value: L,
                            done: !1
                          });
                        case 13:
                        case "end":
                          return W.stop();
                      }
                  }, _, this);
                }));
                function v() {
                  return f.apply(this, arguments);
                }
                return v;
              }()
            }, {
              key: "cancel",
              value: function(v) {
                this._reader && this._reader.cancel(v), this._abortController && this._abortController.abort();
              }
            }]), m;
          }();
        }
      ], __webpack_module_cache__ = {};
      function __w_pdfjs_require__(n) {
        var r = __webpack_module_cache__[n];
        if (r !== void 0)
          return r.exports;
        var e = __webpack_module_cache__[n] = {
          id: n,
          loaded: !1,
          exports: {}
        };
        return __webpack_modules__[n].call(e.exports, e, e.exports, __w_pdfjs_require__), e.loaded = !0, e.exports;
      }
      __w_pdfjs_require__.nmd = (n) => (n.paths = [], n.children || (n.children = []), n);
      var __webpack_exports__ = {};
      return (() => {
        var n = __webpack_exports__;
        Object.defineProperty(n, "__esModule", {
          value: !0
        }), Object.defineProperty(n, "AnnotationLayer", {
          enumerable: !0,
          get: function() {
            return a.AnnotationLayer;
          }
        }), Object.defineProperty(n, "AnnotationMode", {
          enumerable: !0,
          get: function() {
            return e.AnnotationMode;
          }
        }), Object.defineProperty(n, "CMapCompressionType", {
          enumerable: !0,
          get: function() {
            return e.CMapCompressionType;
          }
        }), Object.defineProperty(n, "GlobalWorkerOptions", {
          enumerable: !0,
          get: function() {
            return i.GlobalWorkerOptions;
          }
        }), Object.defineProperty(n, "InvalidPDFException", {
          enumerable: !0,
          get: function() {
            return e.InvalidPDFException;
          }
        }), Object.defineProperty(n, "LinkTarget", {
          enumerable: !0,
          get: function() {
            return r.LinkTarget;
          }
        }), Object.defineProperty(n, "LoopbackPort", {
          enumerable: !0,
          get: function() {
            return t.LoopbackPort;
          }
        }), Object.defineProperty(n, "MissingPDFException", {
          enumerable: !0,
          get: function() {
            return e.MissingPDFException;
          }
        }), Object.defineProperty(n, "OPS", {
          enumerable: !0,
          get: function() {
            return e.OPS;
          }
        }), Object.defineProperty(n, "PDFDataRangeTransport", {
          enumerable: !0,
          get: function() {
            return t.PDFDataRangeTransport;
          }
        }), Object.defineProperty(n, "PDFDateString", {
          enumerable: !0,
          get: function() {
            return r.PDFDateString;
          }
        }), Object.defineProperty(n, "PDFWorker", {
          enumerable: !0,
          get: function() {
            return t.PDFWorker;
          }
        }), Object.defineProperty(n, "PasswordResponses", {
          enumerable: !0,
          get: function() {
            return e.PasswordResponses;
          }
        }), Object.defineProperty(n, "PermissionFlag", {
          enumerable: !0,
          get: function() {
            return e.PermissionFlag;
          }
        }), Object.defineProperty(n, "PixelsPerInch", {
          enumerable: !0,
          get: function() {
            return r.PixelsPerInch;
          }
        }), Object.defineProperty(n, "RenderingCancelledException", {
          enumerable: !0,
          get: function() {
            return r.RenderingCancelledException;
          }
        }), Object.defineProperty(n, "SVGGraphics", {
          enumerable: !0,
          get: function() {
            return c.SVGGraphics;
          }
        }), Object.defineProperty(n, "UNSUPPORTED_FEATURES", {
          enumerable: !0,
          get: function() {
            return e.UNSUPPORTED_FEATURES;
          }
        }), Object.defineProperty(n, "UnexpectedResponseException", {
          enumerable: !0,
          get: function() {
            return e.UnexpectedResponseException;
          }
        }), Object.defineProperty(n, "Util", {
          enumerable: !0,
          get: function() {
            return e.Util;
          }
        }), Object.defineProperty(n, "VerbosityLevel", {
          enumerable: !0,
          get: function() {
            return e.VerbosityLevel;
          }
        }), Object.defineProperty(n, "XfaLayer", {
          enumerable: !0,
          get: function() {
            return g.XfaLayer;
          }
        }), Object.defineProperty(n, "addLinkAttributes", {
          enumerable: !0,
          get: function() {
            return r.addLinkAttributes;
          }
        }), Object.defineProperty(n, "build", {
          enumerable: !0,
          get: function() {
            return t.build;
          }
        }), Object.defineProperty(n, "createObjectURL", {
          enumerable: !0,
          get: function() {
            return e.createObjectURL;
          }
        }), Object.defineProperty(n, "createPromiseCapability", {
          enumerable: !0,
          get: function() {
            return e.createPromiseCapability;
          }
        }), Object.defineProperty(n, "createValidAbsoluteUrl", {
          enumerable: !0,
          get: function() {
            return e.createValidAbsoluteUrl;
          }
        }), Object.defineProperty(n, "getDocument", {
          enumerable: !0,
          get: function() {
            return t.getDocument;
          }
        }), Object.defineProperty(n, "getFilenameFromUrl", {
          enumerable: !0,
          get: function() {
            return r.getFilenameFromUrl;
          }
        }), Object.defineProperty(n, "getPdfFilenameFromUrl", {
          enumerable: !0,
          get: function() {
            return r.getPdfFilenameFromUrl;
          }
        }), Object.defineProperty(n, "getXfaPageViewport", {
          enumerable: !0,
          get: function() {
            return r.getXfaPageViewport;
          }
        }), Object.defineProperty(n, "isPdfFile", {
          enumerable: !0,
          get: function() {
            return r.isPdfFile;
          }
        }), Object.defineProperty(n, "loadScript", {
          enumerable: !0,
          get: function() {
            return r.loadScript;
          }
        }), Object.defineProperty(n, "removeNullCharacters", {
          enumerable: !0,
          get: function() {
            return e.removeNullCharacters;
          }
        }), Object.defineProperty(n, "renderTextLayer", {
          enumerable: !0,
          get: function() {
            return u.renderTextLayer;
          }
        }), Object.defineProperty(n, "shadow", {
          enumerable: !0,
          get: function() {
            return e.shadow;
          }
        }), Object.defineProperty(n, "version", {
          enumerable: !0,
          get: function() {
            return t.version;
          }
        });
        var r = __w_pdfjs_require__(1), e = __w_pdfjs_require__(4), t = __w_pdfjs_require__(136), a = __w_pdfjs_require__(148), i = __w_pdfjs_require__(142), s = __w_pdfjs_require__(6), u = __w_pdfjs_require__(151), c = __w_pdfjs_require__(152), g = __w_pdfjs_require__(150);
        if (s.isNodeJS) {
          var b = __w_pdfjs_require__(153), A = b.PDFNodeStream;
          (0, t.setPDFNetworkStreamFactory)(function(k) {
            return new A(k);
          });
        } else {
          var I = __w_pdfjs_require__(156), C = I.PDFNetworkStream, E = __w_pdfjs_require__(157), O = E.PDFFetchStream;
          (0, t.setPDFNetworkStreamFactory)(function(k) {
            return (0, r.isValidFetchUrl)(k.url) ? new O(k) : new C(k);
          });
        }
      })(), __webpack_exports__;
    })();
  });
})(pdf);
function _extends() {
  return _extends = Object.assign ? Object.assign.bind() : function(n) {
    for (var r = 1; r < arguments.length; r++) {
      var e = arguments[r];
      for (var t in e)
        Object.prototype.hasOwnProperty.call(e, t) && (n[t] = e[t]);
    }
    return n;
  }, _extends.apply(this, arguments);
}
function _objectWithoutPropertiesLoose(n, r) {
  if (n == null)
    return {};
  var e = {}, t = Object.keys(n), a, i;
  for (i = 0; i < t.length; i++)
    a = t[i], !(r.indexOf(a) >= 0) && (e[a] = n[a]);
  return e;
}
function _objectWithoutProperties(n, r) {
  if (n == null)
    return {};
  var e = _objectWithoutPropertiesLoose(n, r), t, a;
  if (Object.getOwnPropertySymbols) {
    var i = Object.getOwnPropertySymbols(n);
    for (a = 0; a < i.length; a++)
      t = i[a], !(r.indexOf(t) >= 0) && (!Object.prototype.propertyIsEnumerable.call(n, t) || (e[t] = n[t]));
  }
  return e;
}
function _typeof(n) {
  return _typeof = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(r) {
    return typeof r;
  } : function(r) {
    return r && typeof Symbol == "function" && r.constructor === Symbol && r !== Symbol.prototype ? "symbol" : typeof r;
  }, _typeof(n);
}
function _classCallCheck(n, r) {
  if (!(n instanceof r))
    throw new TypeError("Cannot call a class as a function");
}
function _defineProperties(n, r) {
  for (var e = 0; e < r.length; e++) {
    var t = r[e];
    t.enumerable = t.enumerable || !1, t.configurable = !0, "value" in t && (t.writable = !0), Object.defineProperty(n, t.key, t);
  }
}
function _createClass(n, r, e) {
  return r && _defineProperties(n.prototype, r), e && _defineProperties(n, e), Object.defineProperty(n, "prototype", {
    writable: !1
  }), n;
}
function _assertThisInitialized(n) {
  if (n === void 0)
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return n;
}
function _setPrototypeOf(n, r) {
  return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(t, a) {
    return t.__proto__ = a, t;
  }, _setPrototypeOf(n, r);
}
function _inherits(n, r) {
  if (typeof r != "function" && r !== null)
    throw new TypeError("Super expression must either be null or a function");
  n.prototype = Object.create(r && r.prototype, {
    constructor: {
      value: n,
      writable: !0,
      configurable: !0
    }
  }), Object.defineProperty(n, "prototype", {
    writable: !1
  }), r && _setPrototypeOf(n, r);
}
function _possibleConstructorReturn(n, r) {
  if (r && (_typeof(r) === "object" || typeof r == "function"))
    return r;
  if (r !== void 0)
    throw new TypeError("Derived constructors may only return object or undefined");
  return _assertThisInitialized(n);
}
function _getPrototypeOf(n) {
  return _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(e) {
    return e.__proto__ || Object.getPrototypeOf(e);
  }, _getPrototypeOf(n);
}
function _defineProperty(n, r, e) {
  return r in n ? Object.defineProperty(n, r, {
    value: e,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : n[r] = e, n;
}
var propTypes = { exports: {} }, reactIs = { exports: {} }, reactIs_production_min = {};
/** @license React v16.13.1
 * react-is.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var hasRequiredReactIs_production_min;
function requireReactIs_production_min() {
  if (hasRequiredReactIs_production_min)
    return reactIs_production_min;
  hasRequiredReactIs_production_min = 1;
  var n = typeof Symbol == "function" && Symbol.for, r = n ? Symbol.for("react.element") : 60103, e = n ? Symbol.for("react.portal") : 60106, t = n ? Symbol.for("react.fragment") : 60107, a = n ? Symbol.for("react.strict_mode") : 60108, i = n ? Symbol.for("react.profiler") : 60114, s = n ? Symbol.for("react.provider") : 60109, u = n ? Symbol.for("react.context") : 60110, c = n ? Symbol.for("react.async_mode") : 60111, g = n ? Symbol.for("react.concurrent_mode") : 60111, b = n ? Symbol.for("react.forward_ref") : 60112, A = n ? Symbol.for("react.suspense") : 60113, I = n ? Symbol.for("react.suspense_list") : 60120, C = n ? Symbol.for("react.memo") : 60115, E = n ? Symbol.for("react.lazy") : 60116, O = n ? Symbol.for("react.block") : 60121, k = n ? Symbol.for("react.fundamental") : 60117, N = n ? Symbol.for("react.responder") : 60118, x = n ? Symbol.for("react.scope") : 60119;
  function U(f) {
    if (typeof f == "object" && f !== null) {
      var v = f.$$typeof;
      switch (v) {
        case r:
          switch (f = f.type, f) {
            case c:
            case g:
            case t:
            case i:
            case a:
            case A:
              return f;
            default:
              switch (f = f && f.$$typeof, f) {
                case u:
                case b:
                case E:
                case C:
                case s:
                  return f;
                default:
                  return v;
              }
          }
        case e:
          return v;
      }
    }
  }
  function m(f) {
    return U(f) === g;
  }
  return reactIs_production_min.AsyncMode = c, reactIs_production_min.ConcurrentMode = g, reactIs_production_min.ContextConsumer = u, reactIs_production_min.ContextProvider = s, reactIs_production_min.Element = r, reactIs_production_min.ForwardRef = b, reactIs_production_min.Fragment = t, reactIs_production_min.Lazy = E, reactIs_production_min.Memo = C, reactIs_production_min.Portal = e, reactIs_production_min.Profiler = i, reactIs_production_min.StrictMode = a, reactIs_production_min.Suspense = A, reactIs_production_min.isAsyncMode = function(f) {
    return m(f) || U(f) === c;
  }, reactIs_production_min.isConcurrentMode = m, reactIs_production_min.isContextConsumer = function(f) {
    return U(f) === u;
  }, reactIs_production_min.isContextProvider = function(f) {
    return U(f) === s;
  }, reactIs_production_min.isElement = function(f) {
    return typeof f == "object" && f !== null && f.$$typeof === r;
  }, reactIs_production_min.isForwardRef = function(f) {
    return U(f) === b;
  }, reactIs_production_min.isFragment = function(f) {
    return U(f) === t;
  }, reactIs_production_min.isLazy = function(f) {
    return U(f) === E;
  }, reactIs_production_min.isMemo = function(f) {
    return U(f) === C;
  }, reactIs_production_min.isPortal = function(f) {
    return U(f) === e;
  }, reactIs_production_min.isProfiler = function(f) {
    return U(f) === i;
  }, reactIs_production_min.isStrictMode = function(f) {
    return U(f) === a;
  }, reactIs_production_min.isSuspense = function(f) {
    return U(f) === A;
  }, reactIs_production_min.isValidElementType = function(f) {
    return typeof f == "string" || typeof f == "function" || f === t || f === g || f === i || f === a || f === A || f === I || typeof f == "object" && f !== null && (f.$$typeof === E || f.$$typeof === C || f.$$typeof === s || f.$$typeof === u || f.$$typeof === b || f.$$typeof === k || f.$$typeof === N || f.$$typeof === x || f.$$typeof === O);
  }, reactIs_production_min.typeOf = U, reactIs_production_min;
}
var reactIs_development = {}, hasRequiredReactIs_development;
function requireReactIs_development() {
  return hasRequiredReactIs_development || (hasRequiredReactIs_development = 1, browser$1.env.NODE_ENV !== "production" && function() {
    var n = typeof Symbol == "function" && Symbol.for, r = n ? Symbol.for("react.element") : 60103, e = n ? Symbol.for("react.portal") : 60106, t = n ? Symbol.for("react.fragment") : 60107, a = n ? Symbol.for("react.strict_mode") : 60108, i = n ? Symbol.for("react.profiler") : 60114, s = n ? Symbol.for("react.provider") : 60109, u = n ? Symbol.for("react.context") : 60110, c = n ? Symbol.for("react.async_mode") : 60111, g = n ? Symbol.for("react.concurrent_mode") : 60111, b = n ? Symbol.for("react.forward_ref") : 60112, A = n ? Symbol.for("react.suspense") : 60113, I = n ? Symbol.for("react.suspense_list") : 60120, C = n ? Symbol.for("react.memo") : 60115, E = n ? Symbol.for("react.lazy") : 60116, O = n ? Symbol.for("react.block") : 60121, k = n ? Symbol.for("react.fundamental") : 60117, N = n ? Symbol.for("react.responder") : 60118, x = n ? Symbol.for("react.scope") : 60119;
    function U(h) {
      return typeof h == "string" || typeof h == "function" || h === t || h === g || h === i || h === a || h === A || h === I || typeof h == "object" && h !== null && (h.$$typeof === E || h.$$typeof === C || h.$$typeof === s || h.$$typeof === u || h.$$typeof === b || h.$$typeof === k || h.$$typeof === N || h.$$typeof === x || h.$$typeof === O);
    }
    function m(h) {
      if (typeof h == "object" && h !== null) {
        var d = h.$$typeof;
        switch (d) {
          case r:
            var T = h.type;
            switch (T) {
              case c:
              case g:
              case t:
              case i:
              case a:
              case A:
                return T;
              default:
                var B = T && T.$$typeof;
                switch (B) {
                  case u:
                  case b:
                  case E:
                  case C:
                  case s:
                    return B;
                  default:
                    return d;
                }
            }
          case e:
            return d;
        }
      }
    }
    var f = c, v = g, _ = u, S = s, y = r, R = b, L = t, $ = E, W = C, X = e, te = i, K = a, ae = A, V = !1;
    function q(h) {
      return V || (V = !0, console.warn("The ReactIs.isAsyncMode() alias has been deprecated, and will be removed in React 17+. Update your code to use ReactIs.isConcurrentMode() instead. It has the exact same API.")), w(h) || m(h) === c;
    }
    function w(h) {
      return m(h) === g;
    }
    function p(h) {
      return m(h) === u;
    }
    function P(h) {
      return m(h) === s;
    }
    function F(h) {
      return typeof h == "object" && h !== null && h.$$typeof === r;
    }
    function G(h) {
      return m(h) === b;
    }
    function Z(h) {
      return m(h) === t;
    }
    function Y(h) {
      return m(h) === E;
    }
    function de(h) {
      return m(h) === C;
    }
    function Se(h) {
      return m(h) === e;
    }
    function _e(h) {
      return m(h) === i;
    }
    function j(h) {
      return m(h) === a;
    }
    function D(h) {
      return m(h) === A;
    }
    reactIs_development.AsyncMode = f, reactIs_development.ConcurrentMode = v, reactIs_development.ContextConsumer = _, reactIs_development.ContextProvider = S, reactIs_development.Element = y, reactIs_development.ForwardRef = R, reactIs_development.Fragment = L, reactIs_development.Lazy = $, reactIs_development.Memo = W, reactIs_development.Portal = X, reactIs_development.Profiler = te, reactIs_development.StrictMode = K, reactIs_development.Suspense = ae, reactIs_development.isAsyncMode = q, reactIs_development.isConcurrentMode = w, reactIs_development.isContextConsumer = p, reactIs_development.isContextProvider = P, reactIs_development.isElement = F, reactIs_development.isForwardRef = G, reactIs_development.isFragment = Z, reactIs_development.isLazy = Y, reactIs_development.isMemo = de, reactIs_development.isPortal = Se, reactIs_development.isProfiler = _e, reactIs_development.isStrictMode = j, reactIs_development.isSuspense = D, reactIs_development.isValidElementType = U, reactIs_development.typeOf = m;
  }()), reactIs_development;
}
var hasRequiredReactIs;
function requireReactIs() {
  return hasRequiredReactIs || (hasRequiredReactIs = 1, function(n) {
    browser$1.env.NODE_ENV === "production" ? n.exports = requireReactIs_production_min() : n.exports = requireReactIs_development();
  }(reactIs)), reactIs.exports;
}
/*
object-assign
(c) Sindre Sorhus
@license MIT
*/
var objectAssign, hasRequiredObjectAssign;
function requireObjectAssign() {
  if (hasRequiredObjectAssign)
    return objectAssign;
  hasRequiredObjectAssign = 1;
  var n = Object.getOwnPropertySymbols, r = Object.prototype.hasOwnProperty, e = Object.prototype.propertyIsEnumerable;
  function t(i) {
    if (i == null)
      throw new TypeError("Object.assign cannot be called with null or undefined");
    return Object(i);
  }
  function a() {
    try {
      if (!Object.assign)
        return !1;
      var i = new String("abc");
      if (i[5] = "de", Object.getOwnPropertyNames(i)[0] === "5")
        return !1;
      for (var s = {}, u = 0; u < 10; u++)
        s["_" + String.fromCharCode(u)] = u;
      var c = Object.getOwnPropertyNames(s).map(function(b) {
        return s[b];
      });
      if (c.join("") !== "0123456789")
        return !1;
      var g = {};
      return "abcdefghijklmnopqrst".split("").forEach(function(b) {
        g[b] = b;
      }), Object.keys(Object.assign({}, g)).join("") === "abcdefghijklmnopqrst";
    } catch {
      return !1;
    }
  }
  return objectAssign = a() ? Object.assign : function(i, s) {
    for (var u, c = t(i), g, b = 1; b < arguments.length; b++) {
      u = Object(arguments[b]);
      for (var A in u)
        r.call(u, A) && (c[A] = u[A]);
      if (n) {
        g = n(u);
        for (var I = 0; I < g.length; I++)
          e.call(u, g[I]) && (c[g[I]] = u[g[I]]);
      }
    }
    return c;
  }, objectAssign;
}
var ReactPropTypesSecret_1, hasRequiredReactPropTypesSecret;
function requireReactPropTypesSecret() {
  if (hasRequiredReactPropTypesSecret)
    return ReactPropTypesSecret_1;
  hasRequiredReactPropTypesSecret = 1;
  var n = "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED";
  return ReactPropTypesSecret_1 = n, ReactPropTypesSecret_1;
}
var has, hasRequiredHas;
function requireHas() {
  return hasRequiredHas || (hasRequiredHas = 1, has = Function.call.bind(Object.prototype.hasOwnProperty)), has;
}
var checkPropTypes_1, hasRequiredCheckPropTypes;
function requireCheckPropTypes() {
  if (hasRequiredCheckPropTypes)
    return checkPropTypes_1;
  hasRequiredCheckPropTypes = 1;
  var n = function() {
  };
  if (browser$1.env.NODE_ENV !== "production") {
    var r = requireReactPropTypesSecret(), e = {}, t = requireHas();
    n = function(i) {
      var s = "Warning: " + i;
      typeof console < "u" && console.error(s);
      try {
        throw new Error(s);
      } catch {
      }
    };
  }
  function a(i, s, u, c, g) {
    if (browser$1.env.NODE_ENV !== "production") {
      for (var b in i)
        if (t(i, b)) {
          var A;
          try {
            if (typeof i[b] != "function") {
              var I = Error(
                (c || "React class") + ": " + u + " type `" + b + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof i[b] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`."
              );
              throw I.name = "Invariant Violation", I;
            }
            A = i[b](s, b, c, u, null, r);
          } catch (E) {
            A = E;
          }
          if (A && !(A instanceof Error) && n(
            (c || "React class") + ": type specification of " + u + " `" + b + "` is invalid; the type checker function must return `null` or an `Error` but returned a " + typeof A + ". You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument)."
          ), A instanceof Error && !(A.message in e)) {
            e[A.message] = !0;
            var C = g ? g() : "";
            n(
              "Failed " + u + " type: " + A.message + (C != null ? C : "")
            );
          }
        }
    }
  }
  return a.resetWarningCache = function() {
    browser$1.env.NODE_ENV !== "production" && (e = {});
  }, checkPropTypes_1 = a, checkPropTypes_1;
}
var factoryWithTypeCheckers, hasRequiredFactoryWithTypeCheckers;
function requireFactoryWithTypeCheckers() {
  if (hasRequiredFactoryWithTypeCheckers)
    return factoryWithTypeCheckers;
  hasRequiredFactoryWithTypeCheckers = 1;
  var n = requireReactIs(), r = requireObjectAssign(), e = requireReactPropTypesSecret(), t = requireHas(), a = requireCheckPropTypes(), i = function() {
  };
  browser$1.env.NODE_ENV !== "production" && (i = function(u) {
    var c = "Warning: " + u;
    typeof console < "u" && console.error(c);
    try {
      throw new Error(c);
    } catch {
    }
  });
  function s() {
    return null;
  }
  return factoryWithTypeCheckers = function(u, c) {
    var g = typeof Symbol == "function" && Symbol.iterator, b = "@@iterator";
    function A(w) {
      var p = w && (g && w[g] || w[b]);
      if (typeof p == "function")
        return p;
    }
    var I = "<<anonymous>>", C = {
      array: N("array"),
      bigint: N("bigint"),
      bool: N("boolean"),
      func: N("function"),
      number: N("number"),
      object: N("object"),
      string: N("string"),
      symbol: N("symbol"),
      any: x(),
      arrayOf: U,
      element: m(),
      elementType: f(),
      instanceOf: v,
      node: R(),
      objectOf: S,
      oneOf: _,
      oneOfType: y,
      shape: $,
      exact: W
    };
    function E(w, p) {
      return w === p ? w !== 0 || 1 / w === 1 / p : w !== w && p !== p;
    }
    function O(w, p) {
      this.message = w, this.data = p && typeof p == "object" ? p : {}, this.stack = "";
    }
    O.prototype = Error.prototype;
    function k(w) {
      if (browser$1.env.NODE_ENV !== "production")
        var p = {}, P = 0;
      function F(Z, Y, de, Se, _e, j, D) {
        if (Se = Se || I, j = j || de, D !== e) {
          if (c) {
            var h = new Error(
              "Calling PropTypes validators directly is not supported by the `prop-types` package. Use `PropTypes.checkPropTypes()` to call them. Read more at http://fb.me/use-check-prop-types"
            );
            throw h.name = "Invariant Violation", h;
          } else if (browser$1.env.NODE_ENV !== "production" && typeof console < "u") {
            var d = Se + ":" + de;
            !p[d] && P < 3 && (i(
              "You are manually calling a React.PropTypes validation function for the `" + j + "` prop on `" + Se + "`. This is deprecated and will throw in the standalone `prop-types` package. You may be seeing this warning due to a third-party PropTypes library. See https://fb.me/react-warning-dont-call-proptypes for details."
            ), p[d] = !0, P++);
          }
        }
        return Y[de] == null ? Z ? Y[de] === null ? new O("The " + _e + " `" + j + "` is marked as required " + ("in `" + Se + "`, but its value is `null`.")) : new O("The " + _e + " `" + j + "` is marked as required in " + ("`" + Se + "`, but its value is `undefined`.")) : null : w(Y, de, Se, _e, j);
      }
      var G = F.bind(null, !1);
      return G.isRequired = F.bind(null, !0), G;
    }
    function N(w) {
      function p(P, F, G, Z, Y, de) {
        var Se = P[F], _e = K(Se);
        if (_e !== w) {
          var j = ae(Se);
          return new O(
            "Invalid " + Z + " `" + Y + "` of type " + ("`" + j + "` supplied to `" + G + "`, expected ") + ("`" + w + "`."),
            { expectedType: w }
          );
        }
        return null;
      }
      return k(p);
    }
    function x() {
      return k(s);
    }
    function U(w) {
      function p(P, F, G, Z, Y) {
        if (typeof w != "function")
          return new O("Property `" + Y + "` of component `" + G + "` has invalid PropType notation inside arrayOf.");
        var de = P[F];
        if (!Array.isArray(de)) {
          var Se = K(de);
          return new O("Invalid " + Z + " `" + Y + "` of type " + ("`" + Se + "` supplied to `" + G + "`, expected an array."));
        }
        for (var _e = 0; _e < de.length; _e++) {
          var j = w(de, _e, G, Z, Y + "[" + _e + "]", e);
          if (j instanceof Error)
            return j;
        }
        return null;
      }
      return k(p);
    }
    function m() {
      function w(p, P, F, G, Z) {
        var Y = p[P];
        if (!u(Y)) {
          var de = K(Y);
          return new O("Invalid " + G + " `" + Z + "` of type " + ("`" + de + "` supplied to `" + F + "`, expected a single ReactElement."));
        }
        return null;
      }
      return k(w);
    }
    function f() {
      function w(p, P, F, G, Z) {
        var Y = p[P];
        if (!n.isValidElementType(Y)) {
          var de = K(Y);
          return new O("Invalid " + G + " `" + Z + "` of type " + ("`" + de + "` supplied to `" + F + "`, expected a single ReactElement type."));
        }
        return null;
      }
      return k(w);
    }
    function v(w) {
      function p(P, F, G, Z, Y) {
        if (!(P[F] instanceof w)) {
          var de = w.name || I, Se = q(P[F]);
          return new O("Invalid " + Z + " `" + Y + "` of type " + ("`" + Se + "` supplied to `" + G + "`, expected ") + ("instance of `" + de + "`."));
        }
        return null;
      }
      return k(p);
    }
    function _(w) {
      if (!Array.isArray(w))
        return browser$1.env.NODE_ENV !== "production" && (arguments.length > 1 ? i(
          "Invalid arguments supplied to oneOf, expected an array, got " + arguments.length + " arguments. A common mistake is to write oneOf(x, y, z) instead of oneOf([x, y, z])."
        ) : i("Invalid argument supplied to oneOf, expected an array.")), s;
      function p(P, F, G, Z, Y) {
        for (var de = P[F], Se = 0; Se < w.length; Se++)
          if (E(de, w[Se]))
            return null;
        var _e = JSON.stringify(w, function(D, h) {
          var d = ae(h);
          return d === "symbol" ? String(h) : h;
        });
        return new O("Invalid " + Z + " `" + Y + "` of value `" + String(de) + "` " + ("supplied to `" + G + "`, expected one of " + _e + "."));
      }
      return k(p);
    }
    function S(w) {
      function p(P, F, G, Z, Y) {
        if (typeof w != "function")
          return new O("Property `" + Y + "` of component `" + G + "` has invalid PropType notation inside objectOf.");
        var de = P[F], Se = K(de);
        if (Se !== "object")
          return new O("Invalid " + Z + " `" + Y + "` of type " + ("`" + Se + "` supplied to `" + G + "`, expected an object."));
        for (var _e in de)
          if (t(de, _e)) {
            var j = w(de, _e, G, Z, Y + "." + _e, e);
            if (j instanceof Error)
              return j;
          }
        return null;
      }
      return k(p);
    }
    function y(w) {
      if (!Array.isArray(w))
        return browser$1.env.NODE_ENV !== "production" && i("Invalid argument supplied to oneOfType, expected an instance of array."), s;
      for (var p = 0; p < w.length; p++) {
        var P = w[p];
        if (typeof P != "function")
          return i(
            "Invalid argument supplied to oneOfType. Expected an array of check functions, but received " + V(P) + " at index " + p + "."
          ), s;
      }
      function F(G, Z, Y, de, Se) {
        for (var _e = [], j = 0; j < w.length; j++) {
          var D = w[j], h = D(G, Z, Y, de, Se, e);
          if (h == null)
            return null;
          h.data && t(h.data, "expectedType") && _e.push(h.data.expectedType);
        }
        var d = _e.length > 0 ? ", expected one of type [" + _e.join(", ") + "]" : "";
        return new O("Invalid " + de + " `" + Se + "` supplied to " + ("`" + Y + "`" + d + "."));
      }
      return k(F);
    }
    function R() {
      function w(p, P, F, G, Z) {
        return X(p[P]) ? null : new O("Invalid " + G + " `" + Z + "` supplied to " + ("`" + F + "`, expected a ReactNode."));
      }
      return k(w);
    }
    function L(w, p, P, F, G) {
      return new O(
        (w || "React class") + ": " + p + " type `" + P + "." + F + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + G + "`."
      );
    }
    function $(w) {
      function p(P, F, G, Z, Y) {
        var de = P[F], Se = K(de);
        if (Se !== "object")
          return new O("Invalid " + Z + " `" + Y + "` of type `" + Se + "` " + ("supplied to `" + G + "`, expected `object`."));
        for (var _e in w) {
          var j = w[_e];
          if (typeof j != "function")
            return L(G, Z, Y, _e, ae(j));
          var D = j(de, _e, G, Z, Y + "." + _e, e);
          if (D)
            return D;
        }
        return null;
      }
      return k(p);
    }
    function W(w) {
      function p(P, F, G, Z, Y) {
        var de = P[F], Se = K(de);
        if (Se !== "object")
          return new O("Invalid " + Z + " `" + Y + "` of type `" + Se + "` " + ("supplied to `" + G + "`, expected `object`."));
        var _e = r({}, P[F], w);
        for (var j in _e) {
          var D = w[j];
          if (t(w, j) && typeof D != "function")
            return L(G, Z, Y, j, ae(D));
          if (!D)
            return new O(
              "Invalid " + Z + " `" + Y + "` key `" + j + "` supplied to `" + G + "`.\nBad object: " + JSON.stringify(P[F], null, "  ") + `
Valid keys: ` + JSON.stringify(Object.keys(w), null, "  ")
            );
          var h = D(de, j, G, Z, Y + "." + j, e);
          if (h)
            return h;
        }
        return null;
      }
      return k(p);
    }
    function X(w) {
      switch (typeof w) {
        case "number":
        case "string":
        case "undefined":
          return !0;
        case "boolean":
          return !w;
        case "object":
          if (Array.isArray(w))
            return w.every(X);
          if (w === null || u(w))
            return !0;
          var p = A(w);
          if (p) {
            var P = p.call(w), F;
            if (p !== w.entries) {
              for (; !(F = P.next()).done; )
                if (!X(F.value))
                  return !1;
            } else
              for (; !(F = P.next()).done; ) {
                var G = F.value;
                if (G && !X(G[1]))
                  return !1;
              }
          } else
            return !1;
          return !0;
        default:
          return !1;
      }
    }
    function te(w, p) {
      return w === "symbol" ? !0 : p ? p["@@toStringTag"] === "Symbol" || typeof Symbol == "function" && p instanceof Symbol : !1;
    }
    function K(w) {
      var p = typeof w;
      return Array.isArray(w) ? "array" : w instanceof RegExp ? "object" : te(p, w) ? "symbol" : p;
    }
    function ae(w) {
      if (typeof w > "u" || w === null)
        return "" + w;
      var p = K(w);
      if (p === "object") {
        if (w instanceof Date)
          return "date";
        if (w instanceof RegExp)
          return "regexp";
      }
      return p;
    }
    function V(w) {
      var p = ae(w);
      switch (p) {
        case "array":
        case "object":
          return "an " + p;
        case "boolean":
        case "date":
        case "regexp":
          return "a " + p;
        default:
          return p;
      }
    }
    function q(w) {
      return !w.constructor || !w.constructor.name ? I : w.constructor.name;
    }
    return C.checkPropTypes = a, C.resetWarningCache = a.resetWarningCache, C.PropTypes = C, C;
  }, factoryWithTypeCheckers;
}
var factoryWithThrowingShims, hasRequiredFactoryWithThrowingShims;
function requireFactoryWithThrowingShims() {
  if (hasRequiredFactoryWithThrowingShims)
    return factoryWithThrowingShims;
  hasRequiredFactoryWithThrowingShims = 1;
  var n = requireReactPropTypesSecret();
  function r() {
  }
  function e() {
  }
  return e.resetWarningCache = r, factoryWithThrowingShims = function() {
    function t(s, u, c, g, b, A) {
      if (A !== n) {
        var I = new Error(
          "Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types"
        );
        throw I.name = "Invariant Violation", I;
      }
    }
    t.isRequired = t;
    function a() {
      return t;
    }
    var i = {
      array: t,
      bigint: t,
      bool: t,
      func: t,
      number: t,
      object: t,
      string: t,
      symbol: t,
      any: t,
      arrayOf: a,
      element: t,
      elementType: t,
      instanceOf: a,
      node: t,
      objectOf: a,
      oneOf: a,
      oneOfType: a,
      shape: a,
      exact: a,
      checkPropTypes: e,
      resetWarningCache: r
    };
    return i.PropTypes = i, i;
  }, factoryWithThrowingShims;
}
if (browser$1.env.NODE_ENV !== "production") {
  var ReactIs = requireReactIs(), throwOnDirectAccess = !0;
  propTypes.exports = requireFactoryWithTypeCheckers()(ReactIs.isElement, throwOnDirectAccess);
} else
  propTypes.exports = requireFactoryWithThrowingShims()();
var clipboardEvents = ["onCopy", "onCut", "onPaste"], compositionEvents = ["onCompositionEnd", "onCompositionStart", "onCompositionUpdate"], keyboardEvents = ["onKeyDown", "onKeyPress", "onKeyUp"], focusEvents = ["onFocus", "onBlur"], formEvents = ["onChange", "onInput", "onInvalid", "onReset", "onSubmit"], genericEvents = ["onError", "onLoad"], mouseEvents = ["onClick", "onContextMenu", "onDoubleClick", "onDrag", "onDragEnd", "onDragEnter", "onDragExit", "onDragLeave", "onDragOver", "onDragStart", "onDrop", "onMouseDown", "onMouseEnter", "onMouseLeave", "onMouseMove", "onMouseOut", "onMouseOver", "onMouseUp"], pointerEvents = ["onPointerDown", "onPointerMove", "onPointerUp", "onPointerCancel", "onGotPointerCapture", "onLostPointerCapture", "onPointerEnter", "onPointerLeave", "onPointerOver", "onPointerOut"], selectionEvents = ["onSelect"], touchEvents = ["onTouchCancel", "onTouchEnd", "onTouchMove", "onTouchStart"], uiEvents = ["onScroll"], wheelEvents = ["onWheel"], mediaEvents = ["onAbort", "onCanPlay", "onCanPlayThrough", "onDurationChange", "onEmptied", "onEncrypted", "onEnded", "onError", "onLoadedData", "onLoadedMetadata", "onLoadStart", "onPause", "onPlay", "onPlaying", "onProgress", "onRateChange", "onSeeked", "onSeeking", "onStalled", "onSuspend", "onTimeUpdate", "onVolumeChange", "onWaiting"], imageEvents = ["onLoad", "onError"], animationEvents = ["onAnimationStart", "onAnimationEnd", "onAnimationIteration"], transitionEvents = ["onTransitionEnd"], otherEvents = ["onToggle"], allEvents = [].concat(clipboardEvents, compositionEvents, keyboardEvents, focusEvents, formEvents, genericEvents, mouseEvents, pointerEvents, selectionEvents, touchEvents, uiEvents, wheelEvents, mediaEvents, imageEvents, animationEvents, transitionEvents, otherEvents), makeEventProps = function n(r, e) {
  var t = {};
  return allEvents.forEach(function(a) {
    if (a in r) {
      if (!e) {
        t[a] = r[a];
        return;
      }
      t[a] = function(i) {
        return r[a](i, e(a));
      };
    }
  }), t;
};
function makeCancellablePromise(n) {
  var r = !1, e = new Promise(function(t, a) {
    n.then(function() {
      return !r && t.apply(void 0, arguments);
    }).catch(function(i) {
      return !r && a(i);
    });
  });
  return {
    promise: e,
    cancel: function() {
      r = !0;
    }
  };
}
function mergeClassNames() {
  return Array.prototype.slice.call(arguments).reduce(function(n, r) {
    return n.concat(r);
  }, []).filter(function(n) {
    return typeof n == "string";
  }).join(" ");
}
var isProduction$1 = browser$1.env.NODE_ENV === "production", prefix = "Invariant failed";
function invariant(n, r) {
  if (!n) {
    if (isProduction$1)
      throw new Error(prefix);
    var e = typeof r == "function" ? r() : r, t = e ? prefix + ": " + e : prefix;
    throw new Error(t);
  }
}
var isProduction = browser$1.env.NODE_ENV === "production";
function warning(n, r) {
  if (!isProduction) {
    if (n)
      return;
    var e = "Warning: " + r;
    typeof console < "u" && console.warn(e);
    try {
      throw Error(e);
    } catch {
    }
  }
}
const DocumentContext = /* @__PURE__ */ createContext(null);
function Message(n) {
  var r = n.children, e = n.type;
  return /* @__PURE__ */ React.createElement("div", {
    className: "react-pdf__message react-pdf__message--".concat(e)
  }, r);
}
Message.propTypes = {
  children: propTypes.exports.node,
  type: propTypes.exports.oneOf(["error", "loading", "no-data"]).isRequired
};
var DEFAULT_LINK_REL = "noopener noreferrer nofollow", LinkService = /* @__PURE__ */ function() {
  function n() {
    _classCallCheck(this, n), this.externalLinkTarget = null, this.externalLinkRel = null;
  }
  return _createClass(n, [{
    key: "setDocument",
    value: function(e) {
      this.pdfDocument = e;
    }
  }, {
    key: "setViewer",
    value: function(e) {
      this.pdfViewer = e;
    }
  }, {
    key: "setExternalLinkRel",
    value: function(e) {
      this.externalLinkRel = e;
    }
  }, {
    key: "setExternalLinkTarget",
    value: function(e) {
      this.externalLinkTarget = e;
    }
  }, {
    key: "setHistory",
    value: function() {
    }
  }, {
    key: "pagesCount",
    get: function() {
      return this.pdfDocument ? this.pdfDocument.numPages : 0;
    }
  }, {
    key: "page",
    get: function() {
      return this.pdfViewer.currentPageNumber;
    },
    set: function(e) {
      this.pdfViewer.currentPageNumber = e;
    }
  }, {
    key: "rotation",
    get: function() {
      return 0;
    },
    set: function(e) {
    }
  }, {
    key: "goToDestination",
    value: function(e) {
      var t = this;
      new Promise(function(a) {
        typeof e == "string" ? t.pdfDocument.getDestination(e).then(a) : Array.isArray(e) ? a(e) : e.then(a);
      }).then(function(a) {
        invariant(Array.isArray(a), '"'.concat(a, '" is not a valid destination array.'));
        var i = a[0];
        new Promise(function(s) {
          i instanceof Object ? t.pdfDocument.getPageIndex(i).then(function(u) {
            s(u);
          }).catch(function() {
            invariant(!1, '"'.concat(i, '" is not a valid page reference.'));
          }) : typeof i == "number" ? s(i) : invariant(!1, '"'.concat(i, '" is not a valid destination reference.'));
        }).then(function(s) {
          var u = s + 1;
          invariant(u >= 1 && u <= t.pagesCount, '"'.concat(u, '" is not a valid page number.')), t.pdfViewer.scrollPageIntoView({
            dest: e,
            pageIndex: s,
            pageNumber: u
          });
        });
      });
    }
  }, {
    key: "navigateTo",
    value: function(e) {
      this.goToDestination(e);
    }
  }, {
    key: "goToPage",
    value: function() {
    }
  }, {
    key: "addLinkAttributes",
    value: function(e, t, a) {
      e.href = t, e.rel = this.externalLinkRel || DEFAULT_LINK_REL, e.target = a ? "_blank" : this.externalLinkTarget || "";
    }
  }, {
    key: "getDestinationHash",
    value: function() {
      return "#";
    }
  }, {
    key: "getAnchorUrl",
    value: function() {
      return "#";
    }
  }, {
    key: "setHash",
    value: function() {
    }
  }, {
    key: "executeNamedAction",
    value: function() {
    }
  }, {
    key: "cachePageRef",
    value: function() {
    }
  }, {
    key: "isPageVisible",
    value: function() {
      return !0;
    }
  }, {
    key: "isPageCached",
    value: function() {
      return !0;
    }
  }]), n;
}(), PasswordResponses = {
  NEED_PASSWORD: 1,
  INCORRECT_PASSWORD: 2
};
function _arrayWithHoles(n) {
  if (Array.isArray(n))
    return n;
}
function _iterableToArrayLimit(n, r) {
  var e = n == null ? null : typeof Symbol < "u" && n[Symbol.iterator] || n["@@iterator"];
  if (e != null) {
    var t = [], a = !0, i = !1, s, u;
    try {
      for (e = e.call(n); !(a = (s = e.next()).done) && (t.push(s.value), !(r && t.length === r)); a = !0)
        ;
    } catch (c) {
      i = !0, u = c;
    } finally {
      try {
        !a && e.return != null && e.return();
      } finally {
        if (i)
          throw u;
      }
    }
    return t;
  }
}
function _arrayLikeToArray(n, r) {
  (r == null || r > n.length) && (r = n.length);
  for (var e = 0, t = new Array(r); e < r; e++)
    t[e] = n[e];
  return t;
}
function _unsupportedIterableToArray(n, r) {
  if (!!n) {
    if (typeof n == "string")
      return _arrayLikeToArray(n, r);
    var e = Object.prototype.toString.call(n).slice(8, -1);
    if (e === "Object" && n.constructor && (e = n.constructor.name), e === "Map" || e === "Set")
      return Array.from(n);
    if (e === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(e))
      return _arrayLikeToArray(n, r);
  }
}
function _nonIterableRest() {
  throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function _slicedToArray(n, r) {
  return _arrayWithHoles(n) || _iterableToArrayLimit(n, r) || _unsupportedIterableToArray(n, r) || _nonIterableRest();
}
var isBrowser = typeof window < "u", isLocalFileSystem = isBrowser && window.location.protocol === "file:";
function isDefined(n) {
  return typeof n < "u";
}
function isProvided(n) {
  return isDefined(n) && n !== null;
}
function isString(n) {
  return typeof n == "string";
}
function isArrayBuffer(n) {
  return n instanceof ArrayBuffer;
}
function isBlob(n) {
  return invariant(isBrowser, "isBlob can only be used in a browser environment"), n instanceof Blob;
}
function isFile$1(n) {
  return invariant(isBrowser, "isFile can only be used in a browser environment"), n instanceof File;
}
function isDataURI(n) {
  return isString(n) && /^data:/.test(n);
}
function dataURItoByteString(n) {
  invariant(isDataURI(n), "Invalid data URI.");
  var r = n.split(","), e = _slicedToArray(r, 2), t = e[0], a = e[1], i = t.split(";");
  return i.indexOf("base64") !== -1 ? atob(a) : unescape(a);
}
function getPixelRatio() {
  return isBrowser && window.devicePixelRatio || 1;
}
var allowFileAccessFromFilesTip = "On Chromium based browsers, you can use --allow-file-access-from-files flag for debugging purposes.";
function displayCORSWarning() {
  warning(!isLocalFileSystem, "Loading PDF as base64 strings/URLs may not work on protocols other than HTTP/HTTPS. ".concat(allowFileAccessFromFilesTip));
}
function displayWorkerWarning() {
  warning(!isLocalFileSystem, "Loading PDF.js worker may not work on protocols other than HTTP/HTTPS. ".concat(allowFileAccessFromFilesTip));
}
function cancelRunningTask(n) {
  n && n.cancel && n.cancel();
}
function makePageCallback(n, r) {
  return Object.defineProperty(n, "width", {
    get: function() {
      return this.view[2] * r;
    },
    configurable: !0
  }), Object.defineProperty(n, "height", {
    get: function() {
      return this.view[3] * r;
    },
    configurable: !0
  }), Object.defineProperty(n, "originalWidth", {
    get: function() {
      return this.view[2];
    },
    configurable: !0
  }), Object.defineProperty(n, "originalHeight", {
    get: function() {
      return this.view[3];
    },
    configurable: !0
  }), n;
}
function isCancelException(n) {
  return n.name === "RenderingCancelledException";
}
function loadFromFile(n) {
  return new Promise(function(r, e) {
    var t = new FileReader();
    return t.onload = function() {
      return r(new Uint8Array(t.result));
    }, t.onerror = function(a) {
      switch (a.target.error.code) {
        case a.target.error.NOT_FOUND_ERR:
          return e(new Error("Error while reading a file: File not found."));
        case a.target.error.NOT_READABLE_ERR:
          return e(new Error("Error while reading a file: File not readable."));
        case a.target.error.SECURITY_ERR:
          return e(new Error("Error while reading a file: Security error."));
        case a.target.error.ABORT_ERR:
          return e(new Error("Error while reading a file: Aborted."));
        default:
          return e(new Error("Error while reading a file."));
      }
    }, t.readAsArrayBuffer(n), null;
  });
}
function _arrayWithoutHoles(n) {
  if (Array.isArray(n))
    return _arrayLikeToArray(n);
}
function _iterableToArray(n) {
  if (typeof Symbol < "u" && n[Symbol.iterator] != null || n["@@iterator"] != null)
    return Array.from(n);
}
function _nonIterableSpread() {
  throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function _toConsumableArray(n) {
  return _arrayWithoutHoles(n) || _iterableToArray(n) || _unsupportedIterableToArray(n) || _nonIterableSpread();
}
var eventProps = function() {
  var n = {};
  return [].concat(_toConsumableArray(mouseEvents), _toConsumableArray(touchEvents), _toConsumableArray(keyboardEvents)).forEach(function(r) {
    n[r] = propTypes.exports.func;
  }), n;
}(), fileTypes = [propTypes.exports.string, propTypes.exports.instanceOf(ArrayBuffer), propTypes.exports.shape({
  data: propTypes.exports.oneOfType([propTypes.exports.object, propTypes.exports.string]),
  httpHeaders: propTypes.exports.object,
  range: propTypes.exports.object,
  url: propTypes.exports.string,
  withCredentials: propTypes.exports.bool
})];
typeof File < "u" && fileTypes.push(propTypes.exports.instanceOf(File));
typeof Blob < "u" && fileTypes.push(propTypes.exports.instanceOf(Blob));
var isClassName = propTypes.exports.oneOfType([propTypes.exports.string, propTypes.exports.arrayOf(propTypes.exports.string)]), isFile = propTypes.exports.oneOfType(fileTypes), isLinkService = propTypes.exports.instanceOf(LinkService);
propTypes.exports.oneOf(["_self", "_blank", "_parent", "_top"]);
var isPage = propTypes.exports.shape({
  _transport: propTypes.exports.shape({
    fontLoader: propTypes.exports.object.isRequired
  }).isRequired,
  commonObjs: propTypes.exports.shape({
    _objs: propTypes.exports.object.isRequired
  }).isRequired,
  getAnnotations: propTypes.exports.func.isRequired,
  getTextContent: propTypes.exports.func.isRequired,
  getViewport: propTypes.exports.func.isRequired,
  render: propTypes.exports.func.isRequired
}), isPageIndex = function n(r, e, t) {
  var a = r[e], i = r.pageNumber, s = r.pdf;
  if (!isDefined(s))
    return null;
  if (isDefined(a)) {
    if (typeof a != "number")
      return new Error("`".concat(e, "` of type `").concat(_typeof(a), "` supplied to `").concat(t, "`, expected `number`."));
    if (a < 0)
      return new Error("Expected `".concat(e, "` to be greater or equal to 0."));
    var u = s.numPages;
    if (a + 1 > u)
      return new Error("Expected `".concat(e, "` to be less or equal to ").concat(u - 1, "."));
  } else if (!isDefined(i))
    return new Error("`".concat(e, "` not supplied. Either pageIndex or pageNumber must be supplied to `").concat(t, "`."));
  return null;
}, isPageNumber = function n(r, e, t) {
  var a = r[e], i = r.pageIndex, s = r.pdf;
  if (!isDefined(s))
    return null;
  if (isDefined(a)) {
    if (typeof a != "number")
      return new Error("`".concat(e, "` of type `").concat(_typeof(a), "` supplied to `").concat(t, "`, expected `number`."));
    if (a < 1)
      return new Error("Expected `".concat(e, "` to be greater or equal to 1."));
    var u = s.numPages;
    if (a > u)
      return new Error("Expected `".concat(e, "` to be less or equal to ").concat(u, "."));
  } else if (!isDefined(i))
    return new Error("`".concat(e, "` not supplied. Either pageIndex or pageNumber must be supplied to `").concat(t, "`."));
  return null;
}, isPdf = propTypes.exports.oneOfType([propTypes.exports.shape({
  getDestination: propTypes.exports.func.isRequired,
  getOutline: propTypes.exports.func.isRequired,
  getPage: propTypes.exports.func.isRequired,
  numPages: propTypes.exports.number.isRequired
}), propTypes.exports.bool]), isRef = propTypes.exports.oneOfType([propTypes.exports.func, propTypes.exports.shape({
  current: propTypes.exports.any
})]), isRenderMode = propTypes.exports.oneOf(["canvas", "none", "svg"]), isRotate = propTypes.exports.oneOf([0, 90, 180, 270]), _excluded = ["url"];
function ownKeys$2(n, r) {
  var e = Object.keys(n);
  if (Object.getOwnPropertySymbols) {
    var t = Object.getOwnPropertySymbols(n);
    r && (t = t.filter(function(a) {
      return Object.getOwnPropertyDescriptor(n, a).enumerable;
    })), e.push.apply(e, t);
  }
  return e;
}
function _objectSpread$2(n) {
  for (var r = 1; r < arguments.length; r++) {
    var e = arguments[r] != null ? arguments[r] : {};
    r % 2 ? ownKeys$2(Object(e), !0).forEach(function(t) {
      _defineProperty(n, t, e[t]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(n, Object.getOwnPropertyDescriptors(e)) : ownKeys$2(Object(e)).forEach(function(t) {
      Object.defineProperty(n, t, Object.getOwnPropertyDescriptor(e, t));
    });
  }
  return n;
}
function _createSuper$6(n) {
  var r = _isNativeReflectConstruct$6();
  return function() {
    var t = _getPrototypeOf(n), a;
    if (r) {
      var i = _getPrototypeOf(this).constructor;
      a = Reflect.construct(t, arguments, i);
    } else
      a = t.apply(this, arguments);
    return _possibleConstructorReturn(this, a);
  };
}
function _isNativeReflectConstruct$6() {
  if (typeof Reflect > "u" || !Reflect.construct || Reflect.construct.sham)
    return !1;
  if (typeof Proxy == "function")
    return !0;
  try {
    return Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
    })), !0;
  } catch {
    return !1;
  }
}
var PDFDataRangeTransport = pdf.exports.PDFDataRangeTransport, Document = /* @__PURE__ */ function(n) {
  _inherits(e, n);
  var r = _createSuper$6(e);
  function e() {
    var t;
    _classCallCheck(this, e);
    for (var a = arguments.length, i = new Array(a), s = 0; s < a; s++)
      i[s] = arguments[s];
    return t = r.call.apply(r, [this].concat(i)), _defineProperty(_assertThisInitialized(t), "state", {
      pdf: null
    }), _defineProperty(_assertThisInitialized(t), "viewer", {
      scrollPageIntoView: function(c) {
        var g = c.dest, b = c.pageIndex, A = c.pageNumber, I = t.props.onItemClick;
        if (I) {
          I({
            dest: g,
            pageIndex: b,
            pageNumber: A
          });
          return;
        }
        var C = t.pages[b];
        if (C) {
          C.scrollIntoView();
          return;
        }
        warning(!1, "An internal link leading to page ".concat(A, " was clicked, but neither <Document> was provided with onItemClick nor it was able to find the page within itself. Either provide onItemClick to <Document> and handle navigating by yourself or ensure that all pages are rendered within <Document>."));
      }
    }), _defineProperty(_assertThisInitialized(t), "linkService", new LinkService()), _defineProperty(_assertThisInitialized(t), "loadDocument", function() {
      cancelRunningTask(t.runningTask), t.loadingTask && t.loadingTask.destroy();
      var u = makeCancellablePromise(t.findDocumentSource());
      t.runningTask = u, u.promise.then(function(c) {
        if (t.onSourceSuccess(), !!c) {
          t.setState(function(E) {
            return E.pdf ? {
              pdf: null
            } : null;
          });
          var g = t.props, b = g.options, A = g.onLoadProgress, I = g.onPassword;
          t.loadingTask = pdf.exports.getDocument(_objectSpread$2(_objectSpread$2({}, c), b)), t.loadingTask.onPassword = I, A && (t.loadingTask.onProgress = A);
          var C = makeCancellablePromise(t.loadingTask.promise);
          t.runningTask = C, C.promise.then(function(E) {
            t.setState(function(O) {
              return O.pdf && O.pdf.fingerprint === E.fingerprint ? null : {
                pdf: E
              };
            }, t.onLoadSuccess);
          }).catch(function(E) {
            t.onLoadError(E);
          });
        }
      }).catch(function(c) {
        t.onSourceError(c);
      });
    }), _defineProperty(_assertThisInitialized(t), "setupLinkService", function() {
      var u = t.props, c = u.externalLinkRel, g = u.externalLinkTarget;
      t.linkService.setViewer(t.viewer), t.linkService.setExternalLinkRel(c), t.linkService.setExternalLinkTarget(g);
    }), _defineProperty(_assertThisInitialized(t), "onSourceSuccess", function() {
      var u = t.props.onSourceSuccess;
      u && u();
    }), _defineProperty(_assertThisInitialized(t), "onSourceError", function(u) {
      warning(u);
      var c = t.props.onSourceError;
      c && c(u);
    }), _defineProperty(_assertThisInitialized(t), "onLoadSuccess", function() {
      var u = t.props.onLoadSuccess, c = t.state.pdf;
      u && u(c), t.pages = new Array(c.numPages), t.linkService.setDocument(c);
    }), _defineProperty(_assertThisInitialized(t), "onLoadError", function(u) {
      t.setState({
        pdf: !1
      }), warning(u);
      var c = t.props.onLoadError;
      c && c(u);
    }), _defineProperty(_assertThisInitialized(t), "findDocumentSource", function() {
      return new Promise(function(u) {
        var c = t.props.file;
        if (c || u(null), typeof c == "string") {
          if (isDataURI(c)) {
            var g = dataURItoByteString(c);
            u({
              data: g
            });
          }
          displayCORSWarning(), u({
            url: c
          });
        }
        if (c instanceof PDFDataRangeTransport && u({
          range: c
        }), isArrayBuffer(c) && u({
          data: c
        }), isBrowser && (isBlob(c) || isFile$1(c))) {
          loadFromFile(c).then(function(C) {
            u({
              data: C
            });
          });
          return;
        }
        if (invariant(_typeof(c) === "object", "Invalid parameter in file, need either Uint8Array, string or a parameter object"), invariant(c.url || c.data || c.range, "Invalid parameter object: need either .data, .range or .url"), typeof c.url == "string") {
          if (isDataURI(c.url)) {
            var b = c.url, A = _objectWithoutProperties(c, _excluded), I = dataURItoByteString(b);
            u(_objectSpread$2({
              data: I
            }, A));
          }
          displayCORSWarning();
        }
        u(c);
      });
    }), _defineProperty(_assertThisInitialized(t), "registerPage", function(u, c) {
      t.pages[u] = c;
    }), _defineProperty(_assertThisInitialized(t), "unregisterPage", function(u) {
      delete t.pages[u];
    }), t;
  }
  return _createClass(e, [{
    key: "componentDidMount",
    value: function() {
      this.loadDocument(), this.setupLinkService();
    }
  }, {
    key: "componentDidUpdate",
    value: function(a) {
      var i = this.props.file;
      i !== a.file && this.loadDocument();
    }
  }, {
    key: "componentWillUnmount",
    value: function() {
      cancelRunningTask(this.runningTask), this.loadingTask && this.loadingTask.destroy();
    }
  }, {
    key: "childContext",
    get: function() {
      var a = this.linkService, i = this.registerPage, s = this.unregisterPage, u = this.props, c = u.imageResourcesPath, g = u.renderMode, b = u.rotate, A = this.state.pdf;
      return {
        imageResourcesPath: c,
        linkService: a,
        pdf: A,
        registerPage: i,
        renderMode: g,
        rotate: b,
        unregisterPage: s
      };
    }
  }, {
    key: "eventProps",
    get: function() {
      var a = this;
      return makeEventProps(this.props, function() {
        return a.state.pdf;
      });
    }
  }, {
    key: "renderChildren",
    value: function() {
      var a = this.props.children;
      return /* @__PURE__ */ React.createElement(DocumentContext.Provider, {
        value: this.childContext
      }, a);
    }
  }, {
    key: "renderContent",
    value: function() {
      var a = this.props.file, i = this.state.pdf;
      if (!a) {
        var s = this.props.noData;
        return /* @__PURE__ */ React.createElement(Message, {
          type: "no-data"
        }, typeof s == "function" ? s() : s);
      }
      if (i === null) {
        var u = this.props.loading;
        return /* @__PURE__ */ React.createElement(Message, {
          type: "loading"
        }, typeof u == "function" ? u() : u);
      }
      if (i === !1) {
        var c = this.props.error;
        return /* @__PURE__ */ React.createElement(Message, {
          type: "error"
        }, typeof c == "function" ? c() : c);
      }
      return this.renderChildren();
    }
  }, {
    key: "render",
    value: function() {
      var a = this.props, i = a.className, s = a.inputRef;
      return /* @__PURE__ */ React.createElement("div", _extends({
        className: mergeClassNames("react-pdf__Document", i),
        ref: s
      }, this.eventProps), this.renderContent());
    }
  }]), e;
}(PureComponent);
Document.defaultProps = {
  error: "Failed to load PDF file.",
  loading: "Loading PDF\u2026",
  noData: "No PDF file specified.",
  onPassword: function n(r, e) {
    switch (e) {
      case PasswordResponses.NEED_PASSWORD: {
        var t = prompt("Enter the password to open this PDF file.");
        r(t);
        break;
      }
      case PasswordResponses.INCORRECT_PASSWORD: {
        var a = prompt("Invalid password. Please try again.");
        r(a);
        break;
      }
    }
  }
};
var isFunctionOrNode$1 = propTypes.exports.oneOfType([propTypes.exports.func, propTypes.exports.node]);
Document.propTypes = _objectSpread$2(_objectSpread$2({}, eventProps), {}, {
  children: propTypes.exports.node,
  className: isClassName,
  error: isFunctionOrNode$1,
  externalLinkRel: propTypes.exports.string,
  externalLinkTarget: propTypes.exports.string,
  file: isFile,
  imageResourcesPath: propTypes.exports.string,
  inputRef: isRef,
  loading: isFunctionOrNode$1,
  noData: isFunctionOrNode$1,
  onItemClick: propTypes.exports.func,
  onLoadError: propTypes.exports.func,
  onLoadProgress: propTypes.exports.func,
  onLoadSuccess: propTypes.exports.func,
  onPassword: propTypes.exports.func,
  onSourceError: propTypes.exports.func,
  onSourceSuccess: propTypes.exports.func,
  rotate: propTypes.exports.number
});
var isDestination = propTypes.exports.oneOfType([propTypes.exports.string, propTypes.exports.arrayOf(propTypes.exports.any)]);
propTypes.exports.shape({
  dest: isDestination,
  items: propTypes.exports.arrayOf(propTypes.exports.shape({
    dest: isDestination,
    title: propTypes.exports.string
  })),
  title: propTypes.exports.string
}).isRequired, propTypes.exports.func, isPdf.isRequired;
function ownKeys$1(n, r) {
  var e = Object.keys(n);
  if (Object.getOwnPropertySymbols) {
    var t = Object.getOwnPropertySymbols(n);
    r && (t = t.filter(function(a) {
      return Object.getOwnPropertyDescriptor(n, a).enumerable;
    })), e.push.apply(e, t);
  }
  return e;
}
function _objectSpread$1(n) {
  for (var r = 1; r < arguments.length; r++) {
    var e = arguments[r] != null ? arguments[r] : {};
    r % 2 ? ownKeys$1(Object(e), !0).forEach(function(t) {
      _defineProperty(n, t, e[t]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(n, Object.getOwnPropertyDescriptors(e)) : ownKeys$1(Object(e)).forEach(function(t) {
      Object.defineProperty(n, t, Object.getOwnPropertyDescriptor(e, t));
    });
  }
  return n;
}
_objectSpread$1({
  className: isClassName,
  inputRef: isRef,
  onItemClick: propTypes.exports.func,
  onLoadError: propTypes.exports.func,
  onLoadSuccess: propTypes.exports.func,
  pdf: isPdf
}, eventProps);
function mergeRefs() {
  for (var n = arguments.length, r = new Array(n), e = 0; e < n; e++)
    r[e] = arguments[e];
  var t = r.filter(Boolean);
  return t.length <= 1 ? t[0] : function(i) {
    t.forEach(function(s) {
      typeof s == "function" ? s(i) : s.current = i;
    });
  };
}
const PageContext = /* @__PURE__ */ createContext(null);
function _createSuper$5(n) {
  var r = _isNativeReflectConstruct$5();
  return function() {
    var t = _getPrototypeOf(n), a;
    if (r) {
      var i = _getPrototypeOf(this).constructor;
      a = Reflect.construct(t, arguments, i);
    } else
      a = t.apply(this, arguments);
    return _possibleConstructorReturn(this, a);
  };
}
function _isNativeReflectConstruct$5() {
  if (typeof Reflect > "u" || !Reflect.construct || Reflect.construct.sham)
    return !1;
  if (typeof Proxy == "function")
    return !0;
  try {
    return Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
    })), !0;
  } catch {
    return !1;
  }
}
var ANNOTATION_MODE = pdf.exports.AnnotationMode, PageCanvasInternal = /* @__PURE__ */ function(n) {
  _inherits(e, n);
  var r = _createSuper$5(e);
  function e() {
    var t;
    _classCallCheck(this, e);
    for (var a = arguments.length, i = new Array(a), s = 0; s < a; s++)
      i[s] = arguments[s];
    return t = r.call.apply(r, [this].concat(i)), _defineProperty(_assertThisInitialized(t), "canvasElement", /* @__PURE__ */ createRef()), _defineProperty(_assertThisInitialized(t), "onRenderSuccess", function() {
      t.renderer = null;
      var u = t.props, c = u.onRenderSuccess, g = u.page, b = u.scale;
      c && c(makePageCallback(g, b));
    }), _defineProperty(_assertThisInitialized(t), "onRenderError", function(u) {
      if (!isCancelException(u)) {
        warning(u);
        var c = t.props.onRenderError;
        c && c(u);
      }
    }), _defineProperty(_assertThisInitialized(t), "drawPageOnCanvas", function() {
      var u = t.canvasElement.current;
      if (!u)
        return null;
      var c = _assertThisInitialized(t), g = c.renderViewport, b = c.viewport, A = t.props, I = A.canvasBackground, C = A.page, E = A.renderForms;
      u.width = g.width, u.height = g.height, u.style.width = "".concat(Math.floor(b.width), "px"), u.style.height = "".concat(Math.floor(b.height), "px");
      var O = {
        annotationMode: E ? ANNOTATION_MODE.ENABLE_FORMS : ANNOTATION_MODE.ENABLE,
        get canvasContext() {
          return u.getContext("2d");
        },
        viewport: g
      };
      return I && (O.background = I), t.cancelRenderingTask(), t.renderer = C.render(O), t.renderer.promise.then(t.onRenderSuccess).catch(t.onRenderError);
    }), t;
  }
  return _createClass(e, [{
    key: "componentDidMount",
    value: function() {
      this.drawPageOnCanvas();
    }
  }, {
    key: "componentDidUpdate",
    value: function(a) {
      var i = this.props, s = i.canvasBackground, u = i.page, c = i.renderForms;
      (s !== a.canvasBackground || c !== a.renderForms) && (u.cleanup(), this.drawPageOnCanvas());
    }
  }, {
    key: "componentWillUnmount",
    value: function() {
      this.cancelRenderingTask();
      var a = this.canvasElement.current;
      a && (a.width = 0, a.height = 0);
    }
  }, {
    key: "cancelRenderingTask",
    value: function() {
      this.renderer && (this.renderer.cancel(), this.renderer = null);
    }
  }, {
    key: "renderViewport",
    get: function() {
      var a = this.props, i = a.page, s = a.rotate, u = a.scale, c = getPixelRatio();
      return i.getViewport({
        scale: u * c,
        rotation: s
      });
    }
  }, {
    key: "viewport",
    get: function() {
      var a = this.props, i = a.page, s = a.rotate, u = a.scale;
      return i.getViewport({
        scale: u,
        rotation: s
      });
    }
  }, {
    key: "render",
    value: function() {
      var a = this.props.canvasRef;
      return /* @__PURE__ */ React.createElement("canvas", {
        className: "react-pdf__Page__canvas",
        dir: "ltr",
        ref: mergeRefs(a, this.canvasElement),
        style: {
          display: "block",
          userSelect: "none"
        }
      });
    }
  }]), e;
}(PureComponent);
PageCanvasInternal.propTypes = {
  canvasBackground: propTypes.exports.string,
  canvasRef: isRef,
  onRenderError: propTypes.exports.func,
  onRenderSuccess: propTypes.exports.func,
  page: isPage.isRequired,
  renderForms: propTypes.exports.bool,
  rotate: isRotate,
  scale: propTypes.exports.number.isRequired
};
function PageCanvas(n) {
  return /* @__PURE__ */ React.createElement(PageContext.Consumer, null, function(r) {
    return /* @__PURE__ */ React.createElement(PageCanvasInternal, _extends({}, r, n));
  });
}
function _createSuper$4(n) {
  var r = _isNativeReflectConstruct$4();
  return function() {
    var t = _getPrototypeOf(n), a;
    if (r) {
      var i = _getPrototypeOf(this).constructor;
      a = Reflect.construct(t, arguments, i);
    } else
      a = t.apply(this, arguments);
    return _possibleConstructorReturn(this, a);
  };
}
function _isNativeReflectConstruct$4() {
  if (typeof Reflect > "u" || !Reflect.construct || Reflect.construct.sham)
    return !1;
  if (typeof Proxy == "function")
    return !0;
  try {
    return Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
    })), !0;
  } catch {
    return !1;
  }
}
var PageSVGInternal = /* @__PURE__ */ function(n) {
  _inherits(e, n);
  var r = _createSuper$4(e);
  function e() {
    var t;
    _classCallCheck(this, e);
    for (var a = arguments.length, i = new Array(a), s = 0; s < a; s++)
      i[s] = arguments[s];
    return t = r.call.apply(r, [this].concat(i)), _defineProperty(_assertThisInitialized(t), "state", {
      svg: null
    }), _defineProperty(_assertThisInitialized(t), "onRenderSuccess", function() {
      t.renderer = null;
      var u = t.props, c = u.onRenderSuccess, g = u.page, b = u.scale;
      c && c(makePageCallback(g, b));
    }), _defineProperty(_assertThisInitialized(t), "onRenderError", function(u) {
      if (!isCancelException(u)) {
        warning(u);
        var c = t.props.onRenderError;
        c && c(u);
      }
    }), _defineProperty(_assertThisInitialized(t), "renderSVG", function() {
      var u = t.props.page;
      return t.renderer = u.getOperatorList(), t.renderer.then(function(c) {
        var g = new pdf.exports.SVGGraphics(u.commonObjs, u.objs);
        t.renderer = g.getSVG(c, t.viewport).then(function(b) {
          t.setState({
            svg: b
          }, t.onRenderSuccess);
        }).catch(t.onRenderError);
      }).catch(t.onRenderError);
    }), _defineProperty(_assertThisInitialized(t), "drawPageOnContainer", function(u) {
      var c = t.state.svg;
      if (!(!u || !c)) {
        u.firstElementChild || u.appendChild(c);
        var g = t.viewport, b = g.width, A = g.height;
        c.setAttribute("width", b), c.setAttribute("height", A);
      }
    }), t;
  }
  return _createClass(e, [{
    key: "componentDidMount",
    value: function() {
      this.renderSVG();
    }
  }, {
    key: "viewport",
    get: function() {
      var a = this.props, i = a.page, s = a.rotate, u = a.scale;
      return i.getViewport({
        scale: u,
        rotation: s
      });
    }
  }, {
    key: "render",
    value: function() {
      var a = this, i = this.viewport, s = i.width, u = i.height;
      return /* @__PURE__ */ React.createElement("div", {
        className: "react-pdf__Page__svg",
        ref: function(g) {
          return a.drawPageOnContainer(g);
        },
        style: {
          display: "block",
          backgroundColor: "white",
          overflow: "hidden",
          width: s,
          height: u,
          userSelect: "none"
        }
      });
    }
  }]), e;
}(PureComponent);
PageSVGInternal.propTypes = {
  onRenderError: propTypes.exports.func,
  onRenderSuccess: propTypes.exports.func,
  page: isPage.isRequired,
  rotate: isRotate,
  scale: propTypes.exports.number.isRequired
};
function PageSVG(n) {
  return /* @__PURE__ */ React.createElement(PageContext.Consumer, null, function(r) {
    return /* @__PURE__ */ React.createElement(PageSVGInternal, _extends({}, r, n));
  });
}
function _createSuper$3(n) {
  var r = _isNativeReflectConstruct$3();
  return function() {
    var t = _getPrototypeOf(n), a;
    if (r) {
      var i = _getPrototypeOf(this).constructor;
      a = Reflect.construct(t, arguments, i);
    } else
      a = t.apply(this, arguments);
    return _possibleConstructorReturn(this, a);
  };
}
function _isNativeReflectConstruct$3() {
  if (typeof Reflect > "u" || !Reflect.construct || Reflect.construct.sham)
    return !1;
  if (typeof Proxy == "function")
    return !0;
  try {
    return Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
    })), !0;
  } catch {
    return !1;
  }
}
var TextLayerItemInternal = /* @__PURE__ */ function(n) {
  _inherits(e, n);
  var r = _createSuper$3(e);
  function e() {
    var t;
    _classCallCheck(this, e);
    for (var a = arguments.length, i = new Array(a), s = 0; s < a; s++)
      i[s] = arguments[s];
    return t = r.call.apply(r, [this].concat(i)), _defineProperty(_assertThisInitialized(t), "itemElement", /* @__PURE__ */ createRef()), _defineProperty(_assertThisInitialized(t), "getElementWidth", function(u) {
      var c = _assertThisInitialized(t), g = c.sideways;
      return u.getBoundingClientRect()[g ? "height" : "width"];
    }), t;
  }
  return _createClass(e, [{
    key: "componentDidMount",
    value: function() {
      this.alignTextItem();
    }
  }, {
    key: "componentDidUpdate",
    value: function() {
      this.alignTextItem();
    }
  }, {
    key: "unrotatedViewport",
    get: function() {
      var a = this.props, i = a.page, s = a.scale;
      return i.getViewport({
        scale: s
      });
    }
  }, {
    key: "rotate",
    get: function() {
      var a = this.props, i = a.page, s = a.rotate;
      return s - i.rotate;
    }
  }, {
    key: "sideways",
    get: function() {
      var a = this.rotate;
      return a % 180 !== 0;
    }
  }, {
    key: "defaultSideways",
    get: function() {
      var a = this.unrotatedViewport.rotation;
      return a % 180 !== 0;
    }
  }, {
    key: "fontSize",
    get: function() {
      var a = this.props.transform, i = this.defaultSideways, s = _slicedToArray(a, 2), u = s[0], c = s[1];
      return i ? c : u;
    }
  }, {
    key: "top",
    get: function() {
      var a = this.props.transform, i = this.unrotatedViewport, s = this.defaultSideways, u = _slicedToArray(a, 6), c = u[2], g = u[3], b = u[4], A = u[5], I = _slicedToArray(i.viewBox, 4), C = I[1], E = I[3];
      return s ? b + c + C : E - (A + g);
    }
  }, {
    key: "left",
    get: function() {
      var a = this.props.transform, i = this.unrotatedViewport, s = this.defaultSideways, u = _slicedToArray(a, 6), c = u[4], g = u[5], b = _slicedToArray(i.viewBox, 1), A = b[0];
      return s ? g - A : c - A;
    }
  }, {
    key: "getFontData",
    value: function(a) {
      var i = this.props.page;
      return new Promise(function(s) {
        i.commonObjs.get(a, s);
      });
    }
  }, {
    key: "alignTextItem",
    value: function() {
      var a = this, i = this.itemElement.current;
      if (!!i) {
        i.style.transform = "";
        var s = this.props, u = s.fontName, c = s.scale, g = s.width;
        i.style.fontFamily = "".concat(u, ", sans-serif"), this.getFontData(u).then(function(b) {
          var A = b ? b.fallbackName : "sans-serif";
          i.style.fontFamily = "".concat(u, ", ").concat(A);
          var I = g * c, C = a.getElementWidth(i), E = "scaleX(".concat(I / C, ")"), O = b ? b.ascent : 0;
          O && (E += " translateY(".concat((1 - O) * 100, "%)")), i.style.transform = E, i.style.WebkitTransform = E;
        });
      }
    }
  }, {
    key: "render",
    value: function() {
      var a = this.fontSize, i = this.top, s = this.left, u = this.props, c = u.customTextRenderer, g = u.scale, b = u.str;
      return /* @__PURE__ */ React.createElement("span", {
        ref: this.itemElement,
        style: {
          height: "1em",
          fontFamily: "sans-serif",
          fontSize: "".concat(a * g, "px"),
          position: "absolute",
          top: "".concat(i * g, "px"),
          left: "".concat(s * g, "px"),
          transformOrigin: "left bottom",
          whiteSpace: "pre",
          pointerEvents: "all"
        }
      }, c ? c(this.props) : b);
    }
  }]), e;
}(PureComponent);
TextLayerItemInternal.propTypes = {
  customTextRenderer: propTypes.exports.func,
  fontName: propTypes.exports.string.isRequired,
  itemIndex: propTypes.exports.number.isRequired,
  page: isPage.isRequired,
  rotate: isRotate,
  scale: propTypes.exports.number,
  str: propTypes.exports.string.isRequired,
  transform: propTypes.exports.arrayOf(propTypes.exports.number).isRequired,
  width: propTypes.exports.number.isRequired
};
function TextLayerItem(n) {
  return /* @__PURE__ */ React.createElement(PageContext.Consumer, null, function(r) {
    return /* @__PURE__ */ React.createElement(TextLayerItemInternal, _extends({}, r, n));
  });
}
function _createSuper$2(n) {
  var r = _isNativeReflectConstruct$2();
  return function() {
    var t = _getPrototypeOf(n), a;
    if (r) {
      var i = _getPrototypeOf(this).constructor;
      a = Reflect.construct(t, arguments, i);
    } else
      a = t.apply(this, arguments);
    return _possibleConstructorReturn(this, a);
  };
}
function _isNativeReflectConstruct$2() {
  if (typeof Reflect > "u" || !Reflect.construct || Reflect.construct.sham)
    return !1;
  if (typeof Proxy == "function")
    return !0;
  try {
    return Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
    })), !0;
  } catch {
    return !1;
  }
}
var TextLayerInternal = /* @__PURE__ */ function(n) {
  _inherits(e, n);
  var r = _createSuper$2(e);
  function e() {
    var t;
    _classCallCheck(this, e);
    for (var a = arguments.length, i = new Array(a), s = 0; s < a; s++)
      i[s] = arguments[s];
    return t = r.call.apply(r, [this].concat(i)), _defineProperty(_assertThisInitialized(t), "state", {
      textItems: null
    }), _defineProperty(_assertThisInitialized(t), "loadTextItems", function() {
      var u = t.props.page, c = makeCancellablePromise(u.getTextContent());
      t.runningTask = c, c.promise.then(function(g) {
        var b = g.items;
        t.setState({
          textItems: b
        }, t.onLoadSuccess);
      }).catch(function(g) {
        t.onLoadError(g);
      });
    }), _defineProperty(_assertThisInitialized(t), "onLoadSuccess", function() {
      var u = t.props.onGetTextSuccess, c = t.state.textItems;
      u && u(c);
    }), _defineProperty(_assertThisInitialized(t), "onLoadError", function(u) {
      t.setState({
        textItems: !1
      }), warning(u);
      var c = t.props.onGetTextError;
      c && c(u);
    }), t;
  }
  return _createClass(e, [{
    key: "componentDidMount",
    value: function() {
      var a = this.props.page;
      invariant(a, "Attempted to load page text content, but no page was specified."), this.loadTextItems();
    }
  }, {
    key: "componentDidUpdate",
    value: function(a) {
      var i = this.props.page;
      a.page && i !== a.page && this.loadTextItems();
    }
  }, {
    key: "componentWillUnmount",
    value: function() {
      cancelRunningTask(this.runningTask);
    }
  }, {
    key: "unrotatedViewport",
    get: function() {
      var a = this.props, i = a.page, s = a.scale;
      return i.getViewport({
        scale: s
      });
    }
  }, {
    key: "rotate",
    get: function() {
      var a = this.props, i = a.page, s = a.rotate;
      return s - i.rotate;
    }
  }, {
    key: "renderTextItems",
    value: function() {
      var a = this.state.textItems;
      return a ? a.map(function(i, s) {
        return /* @__PURE__ */ React.createElement(
          TextLayerItem,
          _extends({
            key: s,
            itemIndex: s
          }, i)
        );
      }) : null;
    }
  }, {
    key: "render",
    value: function() {
      var a = this.unrotatedViewport, i = this.rotate;
      return /* @__PURE__ */ React.createElement("div", {
        className: "react-pdf__Page__textContent",
        style: {
          position: "absolute",
          top: "50%",
          left: "50%",
          width: "".concat(a.width, "px"),
          height: "".concat(a.height, "px"),
          color: "transparent",
          transform: "translate(-50%, -50%) rotate(".concat(i, "deg)"),
          WebkitTransform: "translate(-50%, -50%) rotate(".concat(i, "deg)"),
          pointerEvents: "none"
        }
      }, this.renderTextItems());
    }
  }]), e;
}(PureComponent);
TextLayerInternal.propTypes = {
  onGetTextError: propTypes.exports.func,
  onGetTextSuccess: propTypes.exports.func,
  page: isPage.isRequired,
  rotate: isRotate,
  scale: propTypes.exports.number
};
function TextLayer(n) {
  return /* @__PURE__ */ React.createElement(PageContext.Consumer, null, function(r) {
    return /* @__PURE__ */ React.createElement(TextLayerInternal, _extends({}, r, n));
  });
}
function _createSuper$1(n) {
  var r = _isNativeReflectConstruct$1();
  return function() {
    var t = _getPrototypeOf(n), a;
    if (r) {
      var i = _getPrototypeOf(this).constructor;
      a = Reflect.construct(t, arguments, i);
    } else
      a = t.apply(this, arguments);
    return _possibleConstructorReturn(this, a);
  };
}
function _isNativeReflectConstruct$1() {
  if (typeof Reflect > "u" || !Reflect.construct || Reflect.construct.sham)
    return !1;
  if (typeof Proxy == "function")
    return !0;
  try {
    return Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
    })), !0;
  } catch {
    return !1;
  }
}
var AnnotationLayerInternal = /* @__PURE__ */ function(n) {
  _inherits(e, n);
  var r = _createSuper$1(e);
  function e() {
    var t;
    _classCallCheck(this, e);
    for (var a = arguments.length, i = new Array(a), s = 0; s < a; s++)
      i[s] = arguments[s];
    return t = r.call.apply(r, [this].concat(i)), _defineProperty(_assertThisInitialized(t), "state", {
      annotations: null
    }), _defineProperty(_assertThisInitialized(t), "layerElement", /* @__PURE__ */ createRef()), _defineProperty(_assertThisInitialized(t), "loadAnnotations", function() {
      var u = t.props.page, c = makeCancellablePromise(u.getAnnotations());
      t.runningTask = c, c.promise.then(function(g) {
        t.setState({
          annotations: g
        }, t.onLoadSuccess);
      }).catch(function(g) {
        t.onLoadError(g);
      });
    }), _defineProperty(_assertThisInitialized(t), "onLoadSuccess", function() {
      var u = t.props.onGetAnnotationsSuccess, c = t.state.annotations;
      u && u(c);
    }), _defineProperty(_assertThisInitialized(t), "onLoadError", function(u) {
      t.setState({
        annotations: !1
      }), warning(u);
      var c = t.props.onGetAnnotationsError;
      c && c(u);
    }), _defineProperty(_assertThisInitialized(t), "onRenderSuccess", function() {
      var u = t.props.onRenderAnnotationLayerSuccess;
      u && u();
    }), _defineProperty(_assertThisInitialized(t), "onRenderError", function(u) {
      warning(u);
      var c = t.props.onRenderAnnotationLayerError;
      c && c(u);
    }), t;
  }
  return _createClass(e, [{
    key: "componentDidMount",
    value: function() {
      var a = this.props.page;
      invariant(a, "Attempted to load page annotations, but no page was specified."), this.loadAnnotations();
    }
  }, {
    key: "componentDidUpdate",
    value: function(a) {
      var i = this.props, s = i.page, u = i.renderForms;
      (a.page && s !== a.page || u !== a.renderForms) && this.loadAnnotations();
    }
  }, {
    key: "componentWillUnmount",
    value: function() {
      cancelRunningTask(this.runningTask);
    }
  }, {
    key: "viewport",
    get: function() {
      var a = this.props, i = a.page, s = a.rotate, u = a.scale;
      return i.getViewport({
        scale: u,
        rotation: s
      });
    }
  }, {
    key: "renderAnnotationLayer",
    value: function() {
      var a = this.state.annotations;
      if (!!a) {
        var i = this.props, s = i.imageResourcesPath, u = i.linkService, c = i.page, g = i.renderForms, b = this.viewport.clone({
          dontFlip: !0
        }), A = {
          annotations: a,
          div: this.layerElement.current,
          imageResourcesPath: s,
          linkService: u,
          page: c,
          renderForms: g,
          viewport: b
        };
        this.layerElement.current.innerHTML = "";
        try {
          pdf.exports.AnnotationLayer.render(A), this.onRenderSuccess();
        } catch (I) {
          this.onRenderError(I);
        }
      }
    }
  }, {
    key: "render",
    value: function() {
      return /* @__PURE__ */ React.createElement("div", {
        className: "react-pdf__Page__annotations annotationLayer",
        ref: this.layerElement
      }, this.renderAnnotationLayer());
    }
  }]), e;
}(PureComponent);
AnnotationLayerInternal.propTypes = {
  imageResourcesPath: propTypes.exports.string,
  linkService: isLinkService.isRequired,
  onGetAnnotationsError: propTypes.exports.func,
  onGetAnnotationsSuccess: propTypes.exports.func,
  onRenderAnnotationLayerError: propTypes.exports.func,
  onRenderAnnotationLayerSuccess: propTypes.exports.func,
  page: isPage,
  renderForms: propTypes.exports.bool,
  rotate: isRotate,
  scale: propTypes.exports.number
};
var AnnotationLayer = function n(r) {
  return /* @__PURE__ */ React.createElement(DocumentContext.Consumer, null, function(e) {
    return /* @__PURE__ */ React.createElement(PageContext.Consumer, null, function(t) {
      return /* @__PURE__ */ React.createElement(AnnotationLayerInternal, _extends({}, e, t, r));
    });
  });
};
function ownKeys(n, r) {
  var e = Object.keys(n);
  if (Object.getOwnPropertySymbols) {
    var t = Object.getOwnPropertySymbols(n);
    r && (t = t.filter(function(a) {
      return Object.getOwnPropertyDescriptor(n, a).enumerable;
    })), e.push.apply(e, t);
  }
  return e;
}
function _objectSpread(n) {
  for (var r = 1; r < arguments.length; r++) {
    var e = arguments[r] != null ? arguments[r] : {};
    r % 2 ? ownKeys(Object(e), !0).forEach(function(t) {
      _defineProperty(n, t, e[t]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(n, Object.getOwnPropertyDescriptors(e)) : ownKeys(Object(e)).forEach(function(t) {
      Object.defineProperty(n, t, Object.getOwnPropertyDescriptor(e, t));
    });
  }
  return n;
}
function _createSuper(n) {
  var r = _isNativeReflectConstruct();
  return function() {
    var t = _getPrototypeOf(n), a;
    if (r) {
      var i = _getPrototypeOf(this).constructor;
      a = Reflect.construct(t, arguments, i);
    } else
      a = t.apply(this, arguments);
    return _possibleConstructorReturn(this, a);
  };
}
function _isNativeReflectConstruct() {
  if (typeof Reflect > "u" || !Reflect.construct || Reflect.construct.sham)
    return !1;
  if (typeof Proxy == "function")
    return !0;
  try {
    return Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
    })), !0;
  } catch {
    return !1;
  }
}
var defaultScale = 1, PageInternal = /* @__PURE__ */ function(n) {
  _inherits(e, n);
  var r = _createSuper(e);
  function e() {
    var t;
    _classCallCheck(this, e);
    for (var a = arguments.length, i = new Array(a), s = 0; s < a; s++)
      i[s] = arguments[s];
    return t = r.call.apply(r, [this].concat(i)), _defineProperty(_assertThisInitialized(t), "state", {
      page: null
    }), _defineProperty(_assertThisInitialized(t), "pageElement", /* @__PURE__ */ createRef()), _defineProperty(_assertThisInitialized(t), "onLoadSuccess", function() {
      var u = t.props, c = u.onLoadSuccess, g = u.registerPage, b = t.state.page;
      c && c(makePageCallback(b, t.scale)), g && g(t.pageIndex, t.pageElement.current);
    }), _defineProperty(_assertThisInitialized(t), "onLoadError", function(u) {
      t.setState({
        page: !1
      }), warning(u);
      var c = t.props.onLoadError;
      c && c(u);
    }), _defineProperty(_assertThisInitialized(t), "loadPage", function() {
      var u = t.props.pdf, c = t.getPageNumber();
      if (!!c) {
        t.setState(function(b) {
          return b.page ? {
            page: null
          } : null;
        });
        var g = makeCancellablePromise(u.getPage(c));
        t.runningTask = g, g.promise.then(function(b) {
          t.setState({
            page: b
          }, t.onLoadSuccess);
        }).catch(function(b) {
          t.onLoadError(b);
        });
      }
    }), t;
  }
  return _createClass(e, [{
    key: "componentDidMount",
    value: function() {
      var a = this.props.pdf;
      invariant(a, "Attempted to load a page, but no document was specified."), this.loadPage();
    }
  }, {
    key: "componentDidUpdate",
    value: function(a) {
      var i = this.props.pdf;
      if (a.pdf && i !== a.pdf || this.getPageNumber() !== this.getPageNumber(a)) {
        var s = this.props.unregisterPage;
        s && s(this.getPageIndex(a)), this.loadPage();
      }
    }
  }, {
    key: "componentWillUnmount",
    value: function() {
      var a = this.props.unregisterPage;
      a && a(this.pageIndex), cancelRunningTask(this.runningTask);
    }
  }, {
    key: "childContext",
    get: function() {
      var a = this.state.page;
      if (!a)
        return {};
      var i = this.props, s = i.canvasBackground, u = i.customTextRenderer, c = i.onGetAnnotationsError, g = i.onGetAnnotationsSuccess, b = i.onGetTextError, A = i.onGetTextSuccess, I = i.onRenderAnnotationLayerError, C = i.onRenderAnnotationLayerSuccess, E = i.onRenderError, O = i.onRenderSuccess, k = i.renderForms, N = i.renderInteractiveForms;
      return {
        canvasBackground: s,
        customTextRenderer: u,
        onGetAnnotationsError: c,
        onGetAnnotationsSuccess: g,
        onGetTextError: b,
        onGetTextSuccess: A,
        onRenderAnnotationLayerError: I,
        onRenderAnnotationLayerSuccess: C,
        onRenderError: E,
        onRenderSuccess: O,
        page: a,
        renderForms: k != null ? k : N,
        rotate: this.rotate,
        scale: this.scale
      };
    }
  }, {
    key: "getPageIndex",
    value: function() {
      var a = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : this.props;
      return isProvided(a.pageNumber) ? a.pageNumber - 1 : isProvided(a.pageIndex) ? a.pageIndex : null;
    }
  }, {
    key: "getPageNumber",
    value: function() {
      var a = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : this.props;
      return isProvided(a.pageNumber) ? a.pageNumber : isProvided(a.pageIndex) ? a.pageIndex + 1 : null;
    }
  }, {
    key: "pageIndex",
    get: function() {
      return this.getPageIndex();
    }
  }, {
    key: "pageNumber",
    get: function() {
      return this.getPageNumber();
    }
  }, {
    key: "rotate",
    get: function() {
      var a = this.props.rotate;
      if (isProvided(a))
        return a;
      var i = this.state.page;
      return i ? i.rotate : null;
    }
  }, {
    key: "scale",
    get: function() {
      var a = this.state.page;
      if (!a)
        return null;
      var i = this.props, s = i.scale, u = i.width, c = i.height, g = this.rotate, b = 1, A = s === null ? defaultScale : s;
      if (u || c) {
        var I = a.getViewport({
          scale: 1,
          rotation: g
        });
        b = u ? u / I.width : c / I.height;
      }
      return A * b;
    }
  }, {
    key: "eventProps",
    get: function() {
      var a = this;
      return makeEventProps(this.props, function() {
        var i = a.state.page;
        return i && makePageCallback(i, a.scale);
      });
    }
  }, {
    key: "pageKey",
    get: function() {
      var a = this.state.page;
      return "".concat(a.pageIndex, "@").concat(this.scale, "/").concat(this.rotate);
    }
  }, {
    key: "pageKeyNoScale",
    get: function() {
      var a = this.state.page;
      return "".concat(a.pageIndex, "/").concat(this.rotate);
    }
  }, {
    key: "renderMainLayer",
    value: function() {
      var a = this.props, i = a.canvasRef, s = a.renderMode;
      switch (s) {
        case "none":
          return null;
        case "svg":
          return /* @__PURE__ */ React.createElement(PageSVG, {
            key: "".concat(this.pageKeyNoScale, "_svg")
          });
        case "canvas":
        default:
          return /* @__PURE__ */ React.createElement(PageCanvas, {
            key: "".concat(this.pageKey, "_canvas"),
            canvasRef: i
          });
      }
    }
  }, {
    key: "renderTextLayer",
    value: function() {
      var a = this.props.renderTextLayer;
      return a ? /* @__PURE__ */ React.createElement(TextLayer, {
        key: "".concat(this.pageKey, "_text")
      }) : null;
    }
  }, {
    key: "renderAnnotationLayer",
    value: function() {
      var a = this.props.renderAnnotationLayer;
      return a ? /* @__PURE__ */ React.createElement(AnnotationLayer, {
        key: "".concat(this.pageKey, "_annotations")
      }) : null;
    }
  }, {
    key: "renderChildren",
    value: function() {
      var a = this.props.children;
      return /* @__PURE__ */ React.createElement(PageContext.Provider, {
        value: this.childContext
      }, this.renderMainLayer(), this.renderTextLayer(), this.renderAnnotationLayer(), a);
    }
  }, {
    key: "renderContent",
    value: function() {
      var a = this.pageNumber, i = this.props.pdf, s = this.state.page;
      if (!a) {
        var u = this.props.noData;
        return /* @__PURE__ */ React.createElement(Message, {
          type: "no-data"
        }, typeof u == "function" ? u() : u);
      }
      if (i === null || s === null) {
        var c = this.props.loading;
        return /* @__PURE__ */ React.createElement(Message, {
          type: "loading"
        }, typeof c == "function" ? c() : c);
      }
      if (i === !1 || s === !1) {
        var g = this.props.error;
        return /* @__PURE__ */ React.createElement(Message, {
          type: "error"
        }, typeof g == "function" ? g() : g);
      }
      return this.renderChildren();
    }
  }, {
    key: "render",
    value: function() {
      var a = this.pageNumber, i = this.props, s = i.className, u = i.inputRef;
      return /* @__PURE__ */ React.createElement("div", _extends({
        className: mergeClassNames("react-pdf__Page", s),
        "data-page-number": a,
        ref: mergeRefs(u, this.pageElement),
        style: {
          position: "relative"
        }
      }, this.eventProps), this.renderContent());
    }
  }]), e;
}(PureComponent);
PageInternal.defaultProps = {
  error: "Failed to load the page.",
  loading: "Loading page\u2026",
  noData: "No page specified.",
  renderAnnotationLayer: !0,
  renderForms: !1,
  renderMode: "canvas",
  renderTextLayer: !0,
  scale: defaultScale
};
var isFunctionOrNode = propTypes.exports.oneOfType([propTypes.exports.func, propTypes.exports.node]);
PageInternal.propTypes = _objectSpread(_objectSpread({}, eventProps), {}, {
  canvasBackground: propTypes.exports.string,
  children: propTypes.exports.node,
  className: isClassName,
  customTextRenderer: propTypes.exports.func,
  error: isFunctionOrNode,
  height: propTypes.exports.number,
  imageResourcesPath: propTypes.exports.string,
  inputRef: isRef,
  loading: isFunctionOrNode,
  noData: isFunctionOrNode,
  onGetTextError: propTypes.exports.func,
  onGetTextSuccess: propTypes.exports.func,
  onLoadError: propTypes.exports.func,
  onLoadSuccess: propTypes.exports.func,
  onRenderError: propTypes.exports.func,
  onRenderSuccess: propTypes.exports.func,
  pageIndex: isPageIndex,
  pageNumber: isPageNumber,
  pdf: isPdf,
  registerPage: propTypes.exports.func,
  renderAnnotationLayer: propTypes.exports.bool,
  renderForms: propTypes.exports.bool,
  renderInteractiveForms: propTypes.exports.bool,
  renderMode: isRenderMode,
  renderTextLayer: propTypes.exports.bool,
  rotate: isRotate,
  scale: propTypes.exports.number,
  unregisterPage: propTypes.exports.func,
  width: propTypes.exports.number
});
function Page(n, r) {
  return /* @__PURE__ */ React.createElement(DocumentContext.Consumer, null, function(e) {
    return /* @__PURE__ */ React.createElement(PageInternal, _extends({
      ref: r
    }, e, n));
  });
}
const Page$1 = /* @__PURE__ */ React.forwardRef(Page);
displayWorkerWarning();
pdf.exports.GlobalWorkerOptions.workerSrc = "pdf.worker.js";
/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
var extendStatics = function(n, r) {
  return extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(e, t) {
    e.__proto__ = t;
  } || function(e, t) {
    for (var a in t)
      Object.prototype.hasOwnProperty.call(t, a) && (e[a] = t[a]);
  }, extendStatics(n, r);
};
function __extends(n, r) {
  if (typeof r != "function" && r !== null)
    throw new TypeError("Class extends value " + String(r) + " is not a constructor or null");
  extendStatics(n, r);
  function e() {
    this.constructor = n;
  }
  n.prototype = r === null ? Object.create(r) : (e.prototype = r.prototype, new e());
}
var __assign$1 = function() {
  return __assign$1 = Object.assign || function(r) {
    for (var e, t = 1, a = arguments.length; t < a; t++) {
      e = arguments[t];
      for (var i in e)
        Object.prototype.hasOwnProperty.call(e, i) && (r[i] = e[i]);
    }
    return r;
  }, __assign$1.apply(this, arguments);
};
function __spreadArray(n, r, e) {
  if (e || arguments.length === 2)
    for (var t = 0, a = r.length, i; t < a; t++)
      (i || !(t in r)) && (i || (i = Array.prototype.slice.call(r, 0, t)), i[t] = r[t]);
  return n.concat(i || r);
}
var roundNumber = function(n, r) {
  return Number(n.toFixed(r));
}, checkIsNumber = function(n, r) {
  return typeof n == "number" ? n : r;
}, handleCallback = function(n, r, e) {
  e && typeof e == "function" && e(n, r);
}, easeOut = function(n) {
  return -Math.cos(n * Math.PI) / 2 + 0.5;
}, linear = function(n) {
  return n;
}, easeInQuad = function(n) {
  return n * n;
}, easeOutQuad = function(n) {
  return n * (2 - n);
}, easeInOutQuad = function(n) {
  return n < 0.5 ? 2 * n * n : -1 + (4 - 2 * n) * n;
}, easeInCubic = function(n) {
  return n * n * n;
}, easeOutCubic = function(n) {
  return --n * n * n + 1;
}, easeInOutCubic = function(n) {
  return n < 0.5 ? 4 * n * n * n : (n - 1) * (2 * n - 2) * (2 * n - 2) + 1;
}, easeInQuart = function(n) {
  return n * n * n * n;
}, easeOutQuart = function(n) {
  return 1 - --n * n * n * n;
}, easeInOutQuart = function(n) {
  return n < 0.5 ? 8 * n * n * n * n : 1 - 8 * --n * n * n * n;
}, easeInQuint = function(n) {
  return n * n * n * n * n;
}, easeOutQuint = function(n) {
  return 1 + --n * n * n * n * n;
}, easeInOutQuint = function(n) {
  return n < 0.5 ? 16 * n * n * n * n * n : 1 + 16 * --n * n * n * n * n;
}, animations = {
  easeOut,
  linear,
  easeInQuad,
  easeOutQuad,
  easeInOutQuad,
  easeInCubic,
  easeOutCubic,
  easeInOutCubic,
  easeInQuart,
  easeOutQuart,
  easeInOutQuart,
  easeInQuint,
  easeOutQuint,
  easeInOutQuint
}, handleCancelAnimationFrame = function(n) {
  typeof n == "number" && cancelAnimationFrame(n);
}, handleCancelAnimation = function(n) {
  !n.mounted || (handleCancelAnimationFrame(n.animation), n.animate = !1, n.animation = null, n.velocity = null);
};
function handleSetupAnimation(n, r, e, t) {
  if (!!n.mounted) {
    var a = new Date().getTime(), i = 1;
    handleCancelAnimation(n), n.animation = function() {
      if (!n.mounted)
        return handleCancelAnimationFrame(n.animation);
      var s = new Date().getTime() - a, u = s / e, c = animations[r], g = c(u);
      s >= e ? (t(i), n.animation = null) : n.animation && (t(g), requestAnimationFrame(n.animation));
    }, requestAnimationFrame(n.animation);
  }
}
function animate(n, r, e, t) {
  var a = isValidTargetState(r);
  if (!(!n.mounted || !a)) {
    var i = n.setTransformState, s = n.transformState, u = s.scale, c = s.positionX, g = s.positionY, b = r.scale - u, A = r.positionX - c, I = r.positionY - g;
    e === 0 ? i(r.scale, r.positionX, r.positionY) : handleSetupAnimation(n, t, e, function(C) {
      var E = u + b * C, O = c + A * C, k = g + I * C;
      i(E, O, k);
    });
  }
}
function isValidTargetState(n) {
  var r = n.scale, e = n.positionX, t = n.positionY;
  return !(isNaN(r) || isNaN(e) || isNaN(t));
}
function getComponentsSizes(n, r, e) {
  var t = n.offsetWidth, a = n.offsetHeight, i = r.offsetWidth, s = r.offsetHeight, u = i * e, c = s * e, g = t - u, b = a - c;
  return {
    wrapperWidth: t,
    wrapperHeight: a,
    newContentWidth: u,
    newDiffWidth: g,
    newContentHeight: c,
    newDiffHeight: b
  };
}
var getBounds = function(n, r, e, t, a, i, s) {
  var u = n > r ? e * (s ? 1 : 0.5) : 0, c = t > a ? i * (s ? 1 : 0.5) : 0, g = n - r - u, b = u, A = t - a - c, I = c;
  return { minPositionX: g, maxPositionX: b, minPositionY: A, maxPositionY: I };
}, calculateBounds = function(n, r) {
  var e = n.wrapperComponent, t = n.contentComponent, a = n.setup.centerZoomedOut;
  if (!e || !t)
    throw new Error("Components are not mounted");
  var i = getComponentsSizes(e, t, r), s = i.wrapperWidth, u = i.wrapperHeight, c = i.newContentWidth, g = i.newDiffWidth, b = i.newContentHeight, A = i.newDiffHeight, I = getBounds(s, c, g, u, b, A, Boolean(a));
  return I;
}, handleCalculateBounds = function(n, r) {
  var e = calculateBounds(n, r);
  return n.bounds = e, e;
};
function getMouseBoundedPosition(n, r, e, t, a, i, s) {
  var u = e.minPositionX, c = e.minPositionY, g = e.maxPositionX, b = e.maxPositionY, A = 0, I = 0;
  s && (A = a, I = i);
  var C = boundLimiter(n, u - A, g + A, t), E = boundLimiter(r, c - I, b + I, t);
  return { x: C, y: E };
}
var boundLimiter = function(n, r, e, t) {
  return t ? n < r ? roundNumber(r, 2) : n > e ? roundNumber(e, 2) : roundNumber(n, 2) : roundNumber(n, 2);
};
function handleCalculateZoomPositions(n, r, e, t, a, i) {
  var s = n.transformState, u = s.scale, c = s.positionX, g = s.positionY, b = t - u;
  if (typeof r != "number" || typeof e != "number")
    return console.error("Mouse X and Y position were not provided!"), { x: c, y: g };
  var A = c - r * b, I = g - e * b, C = getMouseBoundedPosition(A, I, a, i, 0, 0, null);
  return C;
}
function checkZoomBounds(n, r, e, t, a) {
  var i = a ? t : 0, s = r - i;
  return !isNaN(e) && n >= e ? e : !isNaN(r) && n <= s ? s : n;
}
var isPanningStartAllowed = function(n, r) {
  var e = n.setup.panning.excluded, t = n.isInitialized, a = n.wrapperComponent, i = r.target, s = a == null ? void 0 : a.contains(i), u = t && i && s;
  if (!u)
    return !1;
  var c = isExcludedNode(i, e);
  return !c;
}, isPanningAllowed = function(n) {
  var r = n.isInitialized, e = n.isPanning, t = n.setup, a = t.panning.disabled, i = r && e && !a;
  return !!i;
}, handlePanningSetup = function(n, r) {
  var e = n.transformState, t = e.positionX, a = e.positionY;
  n.isPanning = !0;
  var i = r.clientX, s = r.clientY;
  n.startCoords = { x: i - t, y: s - a };
}, handleTouchPanningSetup = function(n, r) {
  var e = r.touches, t = n.transformState, a = t.positionX, i = t.positionY;
  n.isPanning = !0;
  var s = e.length === 1;
  if (s) {
    var u = e[0].clientX, c = e[0].clientY;
    n.startCoords = { x: u - a, y: c - i };
  }
};
function handlePanToBounds(n) {
  var r = n.transformState, e = r.positionX, t = r.positionY, a = r.scale, i = n.setup, s = i.disabled, u = i.limitToBounds, c = i.centerZoomedOut, g = n.wrapperComponent;
  if (!(s || !g || !n.bounds)) {
    var b = n.bounds, A = b.maxPositionX, I = b.minPositionX, C = b.maxPositionY, E = b.minPositionY, O = e > A || e < I, k = t > C || t < E, N = e > A ? g.offsetWidth : n.setup.minPositionX || 0, x = t > C ? g.offsetHeight : n.setup.minPositionY || 0, U = handleCalculateZoomPositions(n, N, x, a, n.bounds, u || c), m = U.x, f = U.y;
    return {
      scale: a,
      positionX: O ? m : e,
      positionY: k ? f : t
    };
  }
}
function handleNewPosition(n, r, e, t, a) {
  var i = n.setup.limitToBounds, s = n.wrapperComponent, u = n.bounds, c = n.transformState, g = c.scale, b = c.positionX, A = c.positionY, I = r !== b, C = e !== A, E = !I || !C;
  if (!(!s || E || !u)) {
    var O = getMouseBoundedPosition(r, e, u, i, t, a, s), k = O.x, N = O.y;
    n.setTransformState(g, k, N);
  }
}
var getPanningClientPosition = function(n, r, e) {
  var t = n.startCoords, a = n.transformState, i = n.setup.panning, s = i.lockAxisX, u = i.lockAxisY, c = a.positionX, g = a.positionY;
  if (!t)
    return { x: c, y: g };
  var b = r - t.x, A = e - t.y, I = s ? c : b, C = u ? g : A;
  return { x: I, y: C };
}, getPaddingValue = function(n, r) {
  var e = n.setup, t = n.transformState, a = t.scale, i = e.minScale;
  return r > 0 && a >= i ? r : 0;
}, isVelocityCalculationAllowed = function(n) {
  var r = n.mounted, e = n.setup, t = e.disabled, a = e.velocityAnimation, i = n.transformState.scale, s = a.disabled, u = !s || i > 1 || !t || r;
  return !!u;
}, isVelocityAllowed = function(n) {
  var r = n.mounted, e = n.velocity, t = n.bounds, a = n.setup, i = a.disabled, s = a.velocityAnimation, u = n.transformState.scale, c = s.disabled, g = !c || u > 1 || !i || r;
  return !(!g || !e || !t);
};
function getVelocityMoveTime(n, r) {
  var e = n.setup.velocityAnimation, t = e.equalToMove, a = e.animationTime, i = e.sensitivity;
  return t ? a * r * i : a;
}
function getVelocityPosition(n, r, e, t, a, i, s, u, c, g) {
  if (a) {
    if (r > s && e > s) {
      var b = s + (n - s) * g;
      return b > c ? c : b < s ? s : b;
    }
    if (r < i && e < i) {
      var b = i + (n - i) * g;
      return b < u ? u : b > i ? i : b;
    }
  }
  return t ? r : boundLimiter(n, i, s, a);
}
function getSizeMultiplier(n, r) {
  var e = 1;
  return r ? Math.min(e, n.offsetWidth / window.innerWidth) : e;
}
function handleCalculateVelocity(n, r) {
  var e = isVelocityCalculationAllowed(n);
  if (!!e) {
    var t = n.lastMousePosition, a = n.velocityTime, i = n.setup, s = n.wrapperComponent, u = i.velocityAnimation.equalToMove, c = Date.now();
    if (t && a && s) {
      var g = getSizeMultiplier(s, u), b = r.x - t.x, A = r.y - t.y, I = b / g, C = A / g, E = c - a, O = b * b + A * A, k = Math.sqrt(O) / E;
      n.velocity = { velocityX: I, velocityY: C, total: k };
    }
    n.lastMousePosition = r, n.velocityTime = c;
  }
}
function handleVelocityPanning(n) {
  var r = n.velocity, e = n.bounds, t = n.setup, a = n.wrapperComponent, i = isVelocityAllowed(n);
  if (!(!i || !r || !e || !a)) {
    var s = r.velocityX, u = r.velocityY, c = r.total, g = e.maxPositionX, b = e.minPositionX, A = e.maxPositionY, I = e.minPositionY, C = t.limitToBounds, E = t.alignmentAnimation, O = t.zoomAnimation, k = t.panning, N = k.lockAxisY, x = k.lockAxisX, U = O.animationType, m = E.sizeX, f = E.sizeY, v = E.velocityAlignmentTime, _ = v, S = getVelocityMoveTime(n, c), y = Math.max(S, _), R = getPaddingValue(n, m), L = getPaddingValue(n, f), $ = R * a.offsetWidth / 100, W = L * a.offsetHeight / 100, X = g + $, te = b - $, K = A + W, ae = I - W, V = n.transformState, q = new Date().getTime();
    handleSetupAnimation(n, U, y, function(w) {
      var p = n.transformState, P = p.scale, F = p.positionX, G = p.positionY, Z = new Date().getTime() - q, Y = Z / _, de = animations[E.animationType], Se = 1 - de(Math.min(1, Y)), _e = 1 - w, j = F + s * _e, D = G + u * _e, h = getVelocityPosition(j, V.positionX, F, x, C, b, g, te, X, Se), d = getVelocityPosition(D, V.positionY, G, N, C, I, A, ae, K, Se);
      (F !== j || G !== D) && n.setTransformState(P, h, d);
    });
  }
}
function handlePanningStart(n, r) {
  var e = n.transformState.scale;
  handleCancelAnimation(n), handleCalculateBounds(n, e), r.touches ? handleTouchPanningSetup(n, r) : handlePanningSetup(n, r);
}
function handlePanning(n, r, e) {
  var t = n.startCoords, a = n.setup, i = a.alignmentAnimation, s = i.sizeX, u = i.sizeY;
  if (!!t) {
    var c = getPanningClientPosition(n, r, e), g = c.x, b = c.y, A = getPaddingValue(n, s), I = getPaddingValue(n, u);
    handleCalculateVelocity(n, { x: g, y: b }), handleNewPosition(n, g, b, A, I);
  }
}
function handlePanningEnd(n) {
  if (n.isPanning) {
    var r = n.setup.panning.velocityDisabled, e = n.velocity, t = n.wrapperComponent, a = n.contentComponent;
    n.isPanning = !1, n.animate = !1, n.animation = null;
    var i = t == null ? void 0 : t.getBoundingClientRect(), s = a == null ? void 0 : a.getBoundingClientRect(), u = (i == null ? void 0 : i.width) || 0, c = (i == null ? void 0 : i.height) || 0, g = (s == null ? void 0 : s.width) || 0, b = (s == null ? void 0 : s.height) || 0, A = u < g || c < b, I = !r && e && (e == null ? void 0 : e.total) > 0.1 && A;
    I ? handleVelocityPanning(n) : handleAlignToBounds(n);
  }
}
function handleAlignToBounds(n) {
  var r = n.transformState.scale, e = n.setup, t = e.minScale, a = e.alignmentAnimation, i = a.disabled, s = a.sizeX, u = a.sizeY, c = a.animationTime, g = a.animationType, b = i || r < t || !s && !u;
  if (!b) {
    var A = handlePanToBounds(n);
    A && animate(n, A, c, g);
  }
}
function handleAlignToScaleBounds(n, r, e) {
  var t = n.transformState.scale, a = n.wrapperComponent, i = n.setup, s = i.minScale, u = i.limitToBounds, c = i.zoomAnimation, g = c.disabled, b = c.animationTime, A = c.animationType, I = g || t >= s;
  if ((t >= 1 || u) && handleAlignToBounds(n), !(I || !a || !n.mounted)) {
    var C = r || a.offsetWidth / 2, E = e || a.offsetHeight / 2, O = handleZoomToPoint(n, s, C, E);
    O && animate(n, O, b, A);
  }
}
function handleZoomToPoint(n, r, e, t) {
  var a = n.setup, i = a.minScale, s = a.maxScale, u = a.limitToBounds, c = checkZoomBounds(roundNumber(r, 2), i, s, 0, !1), g = handleCalculateBounds(n, c), b = handleCalculateZoomPositions(n, e, t, c, g, u), A = b.x, I = b.y;
  return { scale: c, positionX: A, positionY: I };
}
var initialState = {
  previousScale: 1,
  scale: 1,
  positionX: 0,
  positionY: 0
}, contextInitialState = __assign$1(__assign$1({}, initialState), { setComponents: function() {
}, contextInstance: null }), initialSetup = {
  disabled: !1,
  minPositionX: null,
  maxPositionX: null,
  minPositionY: null,
  maxPositionY: null,
  minScale: 1,
  maxScale: 8,
  limitToBounds: !0,
  centerZoomedOut: !1,
  centerOnInit: !1,
  wheel: {
    step: 0.2,
    disabled: !1,
    wheelDisabled: !1,
    touchPadDisabled: !1,
    activationKeys: [],
    excluded: []
  },
  panning: {
    disabled: !1,
    velocityDisabled: !1,
    lockAxisX: !1,
    lockAxisY: !1,
    activationKeys: [],
    excluded: []
  },
  pinch: {
    step: 5,
    disabled: !1,
    excluded: []
  },
  doubleClick: {
    disabled: !1,
    step: 0.7,
    mode: "zoomIn",
    animationType: "easeOut",
    animationTime: 200,
    excluded: []
  },
  zoomAnimation: {
    disabled: !1,
    size: 0.4,
    animationTime: 200,
    animationType: "easeOut"
  },
  alignmentAnimation: {
    disabled: !1,
    sizeX: 100,
    sizeY: 100,
    animationTime: 200,
    velocityAlignmentTime: 400,
    animationType: "easeOut"
  },
  velocityAnimation: {
    disabled: !1,
    sensitivity: 1,
    animationTime: 400,
    animationType: "easeOut",
    equalToMove: !0
  }
}, createState = function(n) {
  var r, e, t, a;
  return {
    previousScale: (r = n.initialScale) !== null && r !== void 0 ? r : initialState.scale,
    scale: (e = n.initialScale) !== null && e !== void 0 ? e : initialState.scale,
    positionX: (t = n.initialPositionX) !== null && t !== void 0 ? t : initialState.positionX,
    positionY: (a = n.initialPositionY) !== null && a !== void 0 ? a : initialState.positionY
  };
}, createSetup = function(n) {
  var r = __assign$1({}, initialSetup);
  return Object.keys(n).forEach(function(e) {
    var t = typeof n[e] < "u", a = typeof initialSetup[e] < "u";
    if (a && t) {
      var i = Object.prototype.toString.call(initialSetup[e]), s = i === "[object Object]", u = i === "[object Array]";
      s ? r[e] = __assign$1(__assign$1({}, initialSetup[e]), n[e]) : u ? r[e] = __spreadArray(__spreadArray([], initialSetup[e]), n[e]) : r[e] = n[e];
    }
  }), r;
}, handleCalculateButtonZoom = function(n, r, e) {
  var t = n.transformState.scale, a = n.wrapperComponent, i = n.setup, s = i.maxScale, u = i.minScale, c = i.zoomAnimation, g = c.size;
  if (!a)
    throw new Error("Wrapper is not mounted");
  var b = t * Math.exp(r * e), A = checkZoomBounds(roundNumber(b, 3), u, s, g, !1);
  return A;
};
function handleZoomToViewCenter(n, r, e, t, a) {
  var i = n.wrapperComponent, s = n.transformState, u = s.scale, c = s.positionX, g = s.positionY;
  if (!i)
    return console.error("No WrapperComponent found");
  var b = i.offsetWidth, A = i.offsetHeight, I = (b / 2 - c) / u, C = (A / 2 - g) / u, E = handleCalculateButtonZoom(n, r, e), O = handleZoomToPoint(n, E, I, C);
  if (!O)
    return console.error("Error during zoom event. New transformation state was not calculated.");
  animate(n, O, t, a);
}
function resetTransformations(n, r, e) {
  var t = n.setup, a = n.wrapperComponent, i = t.limitToBounds, s = createState(n.props), u = n.transformState, c = u.scale, g = u.positionX, b = u.positionY;
  if (!!a) {
    var A = calculateBounds(n, s.scale), I = getMouseBoundedPosition(s.positionX, s.positionY, A, i, 0, 0, a), C = {
      scale: s.scale,
      positionX: I.x,
      positionY: I.y
    };
    c === s.scale && g === s.positionX && b === s.positionY || animate(n, C, r, e);
  }
}
function calculateZoomToNode(n, r, e) {
  var t = n.wrapperComponent, a = n.setup, i = a.limitToBounds, s = a.minScale, u = a.maxScale;
  if (!t)
    return initialState;
  var c = t.getBoundingClientRect(), g = getOffset(r), b = g.x, A = g.y, I = r.offsetWidth, C = r.offsetHeight, E = t.offsetWidth / I, O = t.offsetHeight / C, k = checkZoomBounds(e || Math.min(E, O), s, u, 0, !1), N = (c.width - I * k) / 2, x = (c.height - C * k) / 2, U = (c.left - b) * k + N, m = (c.top - A) * k + x, f = calculateBounds(n, k), v = getMouseBoundedPosition(U, m, f, i, 0, 0, t), _ = v.x, S = v.y;
  return { positionX: _, positionY: S, scale: k };
}
function getOffset(n) {
  for (var r = n, e = 0, t = 0; r; )
    e += r.offsetLeft, t += r.offsetTop, r = r.offsetParent;
  return {
    x: e,
    y: t
  };
}
function isValidZoomNode(n) {
  if (n) {
    if ((n == null ? void 0 : n.offsetWidth) === void 0 || (n == null ? void 0 : n.offsetHeight) === void 0)
      return console.error("Zoom node is not valid - it must contain offsetWidth and offsetHeight"), !1;
  } else
    return console.error("Zoom node not found"), !1;
  return !0;
}
var zoomIn = function(n) {
  return function(r, e, t) {
    r === void 0 && (r = 0.5), e === void 0 && (e = 300), t === void 0 && (t = "easeOut"), handleZoomToViewCenter(n, 1, r, e, t);
  };
}, zoomOut = function(n) {
  return function(r, e, t) {
    r === void 0 && (r = 0.5), e === void 0 && (e = 300), t === void 0 && (t = "easeOut"), handleZoomToViewCenter(n, -1, r, e, t);
  };
}, setTransform = function(n) {
  return function(r, e, t, a, i) {
    a === void 0 && (a = 300), i === void 0 && (i = "easeOut");
    var s = n.transformState, u = s.positionX, c = s.positionY, g = s.scale, b = n.wrapperComponent, A = n.contentComponent, I = n.setup.disabled;
    if (!(I || !b || !A)) {
      var C = {
        positionX: isNaN(r) ? u : r,
        positionY: isNaN(e) ? c : e,
        scale: isNaN(t) ? g : t
      };
      animate(n, C, a, i);
    }
  };
}, resetTransform = function(n) {
  return function(r, e) {
    r === void 0 && (r = 200), e === void 0 && (e = "easeOut"), resetTransformations(n, r, e);
  };
}, centerView = function(n) {
  return function(r, e, t) {
    e === void 0 && (e = 200), t === void 0 && (t = "easeOut");
    var a = n.transformState, i = n.wrapperComponent, s = n.contentComponent;
    if (i && s) {
      var u = getCenterPosition(r || a.scale, i, s);
      animate(n, u, e, t);
    }
  };
}, zoomToElement = function(n) {
  return function(r, e, t, a) {
    t === void 0 && (t = 600), a === void 0 && (a = "easeOut"), handleCancelAnimation(n);
    var i = n.wrapperComponent, s = typeof r == "string" ? document.getElementById(r) : r;
    if (i && isValidZoomNode(s) && s && i.contains(s)) {
      var u = calculateZoomToNode(n, s, e);
      animate(n, u, t, a);
    }
  };
}, getContext = function(n) {
  return {
    instance: n,
    state: n.transformState,
    zoomIn: zoomIn(n),
    zoomOut: zoomOut(n),
    setTransform: setTransform(n),
    resetTransform: resetTransform(n),
    centerView: centerView(n),
    zoomToElement: zoomToElement(n)
  };
}, passiveSupported = !1;
function makePassiveEventOption() {
  try {
    var n = {
      get passive() {
        return passiveSupported = !0, !1;
      }
    };
    return n;
  } catch {
    return passiveSupported = !1, passiveSupported;
  }
}
var isExcludedNode = function(n, r) {
  var e = n.tagName.toUpperCase(), t = r.find(function(i) {
    return i.toUpperCase() === e;
  });
  if (t)
    return !0;
  var a = r.find(function(i) {
    return n.classList.contains(i);
  });
  return !!a;
}, cancelTimeout = function(n) {
  n && clearTimeout(n);
}, getTransformStyles = function(n, r, e) {
  return "translate3d(" + n + "px, " + r + "px, 0) scale(" + e + ")";
}, getCenterPosition = function(n, r, e) {
  var t = e.offsetWidth * n, a = e.offsetHeight * n, i = (r.offsetWidth - t) / 2, s = (r.offsetHeight - a) / 2;
  return {
    scale: n,
    positionX: i,
    positionY: s
  };
}, isWheelAllowed = function(n, r) {
  var e = n.setup.wheel, t = e.disabled, a = e.wheelDisabled, i = e.touchPadDisabled, s = e.excluded, u = n.isInitialized, c = n.isPanning, g = r.target, b = u && !c && !t && g;
  if (!b || a && !r.ctrlKey || i && r.ctrlKey)
    return !1;
  var A = isExcludedNode(g, s);
  return !A;
};
function getDelta(n, r) {
  var e = n ? n.deltaY < 0 ? 1 : -1 : 0, t = checkIsNumber(r, e);
  return t;
}
function getMousePosition(n, r, e) {
  var t = r.getBoundingClientRect(), a = 0, i = 0;
  if ("clientX" in n)
    a = (n.clientX - t.left) / e, i = (n.clientY - t.top) / e;
  else {
    var s = n.touches[0];
    a = (s.clientX - t.left) / e, i = (s.clientY - t.top) / e;
  }
  return (isNaN(a) || isNaN(i)) && console.error("No mouse or touch offset found"), {
    x: a,
    y: i
  };
}
var handleCalculateWheelZoom = function(n, r, e, t, a) {
  var i = n.transformState.scale, s = n.wrapperComponent, u = n.setup, c = u.maxScale, g = u.minScale, b = u.zoomAnimation, A = b.size, I = b.disabled;
  if (!s)
    throw new Error("Wrapper is not mounted");
  var C = i + r * (i - i * e) * e;
  if (a)
    return C;
  var E = t ? !1 : !I, O = checkZoomBounds(roundNumber(C, 3), g, c, A, E);
  return O;
}, handleWheelZoomStop = function(n, r) {
  var e = n.previousWheelEvent, t = n.transformState.scale, a = n.setup, i = a.maxScale, s = a.minScale;
  return e ? t < i || t > s || Math.sign(e.deltaY) !== Math.sign(r.deltaY) || e.deltaY > 0 && e.deltaY < r.deltaY || e.deltaY < 0 && e.deltaY > r.deltaY || Math.sign(e.deltaY) !== Math.sign(r.deltaY) : !1;
}, isPinchStartAllowed = function(n, r) {
  var e = n.setup.pinch, t = e.disabled, a = e.excluded, i = n.isInitialized, s = r.target, u = i && !t && s;
  if (!u)
    return !1;
  var c = isExcludedNode(s, a);
  return !c;
}, isPinchAllowed = function(n) {
  var r = n.setup.pinch.disabled, e = n.isInitialized, t = n.pinchStartDistance, a = e && !r && t;
  return !!a;
}, calculateTouchMidPoint = function(n, r, e) {
  var t = e.getBoundingClientRect(), a = n.touches, i = roundNumber(a[0].clientX - t.left, 5), s = roundNumber(a[0].clientY - t.top, 5), u = roundNumber(a[1].clientX - t.left, 5), c = roundNumber(a[1].clientY - t.top, 5);
  return {
    x: (i + u) / 2 / r,
    y: (s + c) / 2 / r
  };
}, getTouchDistance = function(n) {
  return Math.sqrt(Math.pow(n.touches[0].pageX - n.touches[1].pageX, 2) + Math.pow(n.touches[0].pageY - n.touches[1].pageY, 2));
}, calculatePinchZoom = function(n, r) {
  var e = n.pinchStartScale, t = n.pinchStartDistance, a = n.setup, i = a.maxScale, s = a.minScale, u = a.zoomAnimation, c = u.size, g = u.disabled;
  if (!e || t === null || !r)
    throw new Error("Pinch touches distance was not provided");
  if (r < 0)
    return n.transformState.scale;
  var b = r / t, A = b * e;
  return checkZoomBounds(roundNumber(A, 2), s, i, c, !g);
}, wheelStopEventTime = 160, wheelAnimationTime = 100, handleWheelStart = function(n, r) {
  var e = n.props, t = e.onWheelStart, a = e.onZoomStart;
  n.wheelStopEventTimer || (handleCancelAnimation(n), handleCallback(getContext(n), r, t), handleCallback(getContext(n), r, a));
}, handleWheelZoom = function(n, r) {
  var e = n.props, t = e.onWheel, a = e.onZoom, i = n.contentComponent, s = n.setup, u = n.transformState, c = u.scale, g = s.limitToBounds, b = s.centerZoomedOut, A = s.zoomAnimation, I = s.wheel, C = A.size, E = A.disabled, O = I.step;
  if (!i)
    throw new Error("Component not mounted");
  r.preventDefault(), r.stopPropagation();
  var k = getDelta(r, null), N = handleCalculateWheelZoom(n, k, O, !r.ctrlKey);
  if (c !== N) {
    var x = handleCalculateBounds(n, N), U = getMousePosition(r, i, c), m = E || C === 0 || b, f = g && m, v = handleCalculateZoomPositions(n, U.x, U.y, N, x, f), _ = v.x, S = v.y;
    n.previousWheelEvent = r, n.setTransformState(N, _, S), handleCallback(getContext(n), r, t), handleCallback(getContext(n), r, a);
  }
}, handleWheelStop = function(n, r) {
  var e = n.props, t = e.onWheelStop, a = e.onZoomStop;
  cancelTimeout(n.wheelAnimationTimer), n.wheelAnimationTimer = setTimeout(function() {
    !n.mounted || (handleAlignToScaleBounds(n, r.x, r.y), n.wheelAnimationTimer = null);
  }, wheelAnimationTime);
  var i = handleWheelZoomStop(n, r);
  i && (cancelTimeout(n.wheelStopEventTimer), n.wheelStopEventTimer = setTimeout(function() {
    !n.mounted || (n.wheelStopEventTimer = null, handleCallback(getContext(n), r, t), handleCallback(getContext(n), r, a));
  }, wheelStopEventTime));
}, handlePinchStart = function(n, r) {
  var e = getTouchDistance(r);
  n.pinchStartDistance = e, n.lastDistance = e, n.pinchStartScale = n.transformState.scale, n.isPanning = !1, handleCancelAnimation(n);
}, handlePinchZoom = function(n, r) {
  var e = n.contentComponent, t = n.pinchStartDistance, a = n.transformState.scale, i = n.setup, s = i.limitToBounds, u = i.centerZoomedOut, c = i.zoomAnimation, g = c.disabled, b = c.size;
  if (!(t === null || !e)) {
    var A = calculateTouchMidPoint(r, a, e);
    if (!(!isFinite(A.x) || !isFinite(A.y))) {
      var I = getTouchDistance(r), C = calculatePinchZoom(n, I);
      if (C !== a) {
        var E = handleCalculateBounds(n, C), O = g || b === 0 || u, k = s && O, N = handleCalculateZoomPositions(n, A.x, A.y, C, E, k), x = N.x, U = N.y;
        n.pinchMidpoint = A, n.lastDistance = I, n.setTransformState(C, x, U);
      }
    }
  }
}, handlePinchStop = function(n) {
  var r = n.pinchMidpoint;
  n.velocity = null, n.lastDistance = null, n.pinchMidpoint = null, n.pinchStartScale = null, n.pinchStartDistance = null, handleAlignToScaleBounds(n, r == null ? void 0 : r.x, r == null ? void 0 : r.y);
};
function handleDoubleClick(n, r) {
  var e = n.setup.doubleClick, t = e.disabled, a = e.mode, i = e.step, s = e.animationTime, u = e.animationType;
  if (!t) {
    if (a === "reset")
      return resetTransformations(n, s, u);
    var c = n.transformState.scale, g = n.contentComponent;
    if (!g)
      return console.error("No ContentComponent found");
    var b = a === "zoomOut" ? -1 : 1, A = handleCalculateButtonZoom(n, b, i), I = getMousePosition(r, g, c), C = handleZoomToPoint(n, A, I.x, I.y);
    if (!C)
      return console.error("Error during zoom event. New transformation state was not calculated.");
    animate(n, C, s, u);
  }
}
var isDoubleClickAllowed = function(n, r) {
  var e = n.isInitialized, t = n.setup, a = n.wrapperComponent, i = t.doubleClick, s = i.disabled, u = i.excluded, c = r.target, g = a == null ? void 0 : a.contains(c), b = e && c && g && !s;
  if (!b)
    return !1;
  var A = isExcludedNode(c, u);
  return !(A || !b);
}, Context = React.createContext(contextInitialState), TransformContext = function(n) {
  __extends(r, n);
  function r() {
    var e = n !== null && n.apply(this, arguments) || this;
    return e.mounted = !0, e.transformState = createState(e.props), e.setup = createSetup(e.props), e.wrapperComponent = null, e.contentComponent = null, e.isInitialized = !1, e.bounds = null, e.previousWheelEvent = null, e.wheelStopEventTimer = null, e.wheelAnimationTimer = null, e.isPanning = !1, e.startCoords = null, e.lastTouch = null, e.distance = null, e.lastDistance = null, e.pinchStartDistance = null, e.pinchStartScale = null, e.pinchMidpoint = null, e.velocity = null, e.velocityTime = null, e.lastMousePosition = null, e.animate = !1, e.animation = null, e.maxBounds = null, e.pressedKeys = {}, e.handleInitializeWrapperEvents = function(t) {
      var a = makePassiveEventOption();
      t.addEventListener("wheel", e.onWheelZoom, a), t.addEventListener("dblclick", e.onDoubleClick, a), t.addEventListener("touchstart", e.onTouchPanningStart, a), t.addEventListener("touchmove", e.onTouchPanning, a), t.addEventListener("touchend", e.onTouchPanningStop, a);
    }, e.handleInitialize = function() {
      var t = e.setup.centerOnInit;
      e.applyTransformation(), e.forceUpdate(), t && (setTimeout(function() {
        e.mounted && e.setCenter();
      }, 50), setTimeout(function() {
        e.mounted && e.setCenter();
      }, 100), setTimeout(function() {
        e.mounted && e.setCenter();
      }, 200));
    }, e.onWheelZoom = function(t) {
      var a = e.setup.disabled;
      if (!a) {
        var i = isWheelAllowed(e, t);
        if (!!i) {
          var s = e.isPressingKeys(e.setup.wheel.activationKeys);
          !s || (handleWheelStart(e, t), handleWheelZoom(e, t), handleWheelStop(e, t));
        }
      }
    }, e.onPanningStart = function(t) {
      var a = e.setup.disabled, i = e.props.onPanningStart;
      if (!a) {
        var s = isPanningStartAllowed(e, t);
        if (!!s) {
          var u = e.isPressingKeys(e.setup.panning.activationKeys);
          !u || (t.preventDefault(), t.stopPropagation(), handleCancelAnimation(e), handlePanningStart(e, t), handleCallback(getContext(e), t, i));
        }
      }
    }, e.onPanning = function(t) {
      var a = e.setup.disabled, i = e.props.onPanning;
      if (!a) {
        var s = isPanningAllowed(e);
        if (!!s) {
          var u = e.isPressingKeys(e.setup.panning.activationKeys);
          !u || (t.preventDefault(), t.stopPropagation(), handlePanning(e, t.clientX, t.clientY), handleCallback(getContext(e), t, i));
        }
      }
    }, e.onPanningStop = function(t) {
      var a = e.props.onPanningStop;
      e.isPanning && (handlePanningEnd(e), handleCallback(getContext(e), t, a));
    }, e.onPinchStart = function(t) {
      var a = e.setup.disabled, i = e.props, s = i.onPinchingStart, u = i.onZoomStart;
      if (!a) {
        var c = isPinchStartAllowed(e, t);
        !c || (handlePinchStart(e, t), handleCancelAnimation(e), handleCallback(getContext(e), t, s), handleCallback(getContext(e), t, u));
      }
    }, e.onPinch = function(t) {
      var a = e.setup.disabled, i = e.props, s = i.onPinching, u = i.onZoom;
      if (!a) {
        var c = isPinchAllowed(e);
        !c || (t.preventDefault(), t.stopPropagation(), handlePinchZoom(e, t), handleCallback(getContext(e), t, s), handleCallback(getContext(e), t, u));
      }
    }, e.onPinchStop = function(t) {
      var a = e.props, i = a.onPinchingStop, s = a.onZoomStop;
      e.pinchStartScale && (handlePinchStop(e), handleCallback(getContext(e), t, i), handleCallback(getContext(e), t, s));
    }, e.onTouchPanningStart = function(t) {
      var a = e.setup.disabled, i = e.props.onPanningStart;
      if (!a) {
        var s = isPanningStartAllowed(e, t);
        if (!!s) {
          var u = e.lastTouch && +new Date() - e.lastTouch < 200;
          if (u && t.touches.length === 1)
            e.onDoubleClick(t);
          else {
            e.lastTouch = +new Date(), handleCancelAnimation(e);
            var c = t.touches, g = c.length === 1, b = c.length === 2;
            g && (handleCancelAnimation(e), handlePanningStart(e, t), handleCallback(getContext(e), t, i)), b && e.onPinchStart(t);
          }
        }
      }
    }, e.onTouchPanning = function(t) {
      var a = e.setup.disabled, i = e.props.onPanning;
      if (e.isPanning && t.touches.length === 1) {
        if (a)
          return;
        var s = isPanningAllowed(e);
        if (!s)
          return;
        t.preventDefault(), t.stopPropagation();
        var u = t.touches[0];
        handlePanning(e, u.clientX, u.clientY), handleCallback(getContext(e), t, i);
      } else
        t.touches.length > 1 && e.onPinch(t);
    }, e.onTouchPanningStop = function(t) {
      e.onPanningStop(t), e.onPinchStop(t);
    }, e.onDoubleClick = function(t) {
      var a = e.setup.disabled;
      if (!a) {
        var i = isDoubleClickAllowed(e, t);
        !i || handleDoubleClick(e, t);
      }
    }, e.clearPanning = function(t) {
      e.isPanning && e.onPanningStop(t);
    }, e.setKeyPressed = function(t) {
      e.pressedKeys[t.key] = !0;
    }, e.setKeyUnPressed = function(t) {
      e.pressedKeys[t.key] = !1;
    }, e.isPressingKeys = function(t) {
      return t.length ? Boolean(t.find(function(a) {
        return e.pressedKeys[a];
      })) : !0;
    }, e.setComponents = function(t, a) {
      e.wrapperComponent = t, e.contentComponent = a, handleCalculateBounds(e, e.transformState.scale), e.handleInitializeWrapperEvents(t), e.handleInitialize(), e.handleRef(), e.isInitialized = !0, handleCallback(getContext(e), void 0, e.props.onInit);
    }, e.setTransformState = function(t, a, i) {
      !isNaN(t) && !isNaN(a) && !isNaN(i) ? (t !== e.transformState.scale && (e.transformState.previousScale = e.transformState.scale, e.transformState.scale = t), e.transformState.positionX = a, e.transformState.positionY = i, e.applyTransformation()) : console.error("Detected NaN set state values");
    }, e.setCenter = function() {
      if (e.wrapperComponent && e.contentComponent) {
        var t = getCenterPosition(e.transformState.scale, e.wrapperComponent, e.contentComponent);
        e.setTransformState(t.scale, t.positionX, t.positionY);
      }
    }, e.applyTransformation = function() {
      if (!(!e.mounted || !e.contentComponent)) {
        var t = e.transformState, a = t.scale, i = t.positionX, s = t.positionY, u = getTransformStyles(i, s, a);
        e.contentComponent.style.transform = u, e.handleRef();
      }
    }, e.handleRef = function() {
      e.props.setRef(getContext(e));
    }, e;
  }
  return r.prototype.componentDidMount = function() {
    var e = makePassiveEventOption();
    window.addEventListener("mousedown", this.onPanningStart, e), window.addEventListener("mousemove", this.onPanning, e), window.addEventListener("mouseup", this.onPanningStop, e), document.addEventListener("mouseleave", this.clearPanning, e), window.addEventListener("keyup", this.setKeyUnPressed, e), window.addEventListener("keydown", this.setKeyPressed, e), this.handleRef();
  }, r.prototype.componentWillUnmount = function() {
    var e = makePassiveEventOption();
    window.removeEventListener("mousedown", this.onPanningStart, e), window.removeEventListener("mousemove", this.onPanning, e), window.removeEventListener("mouseup", this.onPanningStop, e), window.removeEventListener("keyup", this.setKeyUnPressed, e), window.removeEventListener("keydown", this.setKeyPressed, e), handleCancelAnimation(this);
  }, r.prototype.componentDidUpdate = function(e) {
    e !== this.props && (handleCalculateBounds(this, this.transformState.scale), this.setup = createSetup(this.props));
  }, r.prototype.render = function() {
    var e = getContext(this), t = this.props.children, a = typeof t == "function" ? t(e) : t;
    return React.createElement(Context.Provider, { value: __assign$1(__assign$1({}, this.transformState), { setComponents: this.setComponents, contextInstance: this }) }, a);
  }, r;
}(Component), TransformWrapper = React.forwardRef(function(n, r) {
  var e = useState(null), t = e[0], a = e[1];
  return useImperativeHandle(r, function() {
    return t;
  }, [t]), React.createElement(TransformContext, __assign$1({}, n, { setRef: a }));
});
function styleInject(n, r) {
  r === void 0 && (r = {});
  var e = r.insertAt;
  if (!(!n || typeof document > "u")) {
    var t = document.head || document.getElementsByTagName("head")[0], a = document.createElement("style");
    a.type = "text/css", e === "top" && t.firstChild ? t.insertBefore(a, t.firstChild) : t.appendChild(a), a.styleSheet ? a.styleSheet.cssText = n : a.appendChild(document.createTextNode(n));
  }
}
var css_248z = `.transform-component-module_wrapper__1_Fgj {
  position: relative;
  width: -moz-fit-content;
  width: fit-content;
  height: -moz-fit-content;
  height: fit-content;
  overflow: hidden;
  -webkit-touch-callout: none; /* iOS Safari */
  -webkit-user-select: none; /* Safari */
  -khtml-user-select: none; /* Konqueror HTML */
  -moz-user-select: none; /* Firefox */
  -ms-user-select: none; /* Internet Explorer/Edge */
  user-select: none;
  margin: 0;
  padding: 0;
}
.transform-component-module_content__2jYgh {
  display: flex;
  flex-wrap: wrap;
  width: -moz-fit-content;
  width: fit-content;
  height: -moz-fit-content;
  height: fit-content;
  margin: 0;
  padding: 0;
  transform-origin: 0% 0%;
}
.transform-component-module_content__2jYgh img {
  pointer-events: none;
}
`, styles = { wrapper: "transform-component-module_wrapper__1_Fgj", content: "transform-component-module_content__2jYgh" };
styleInject(css_248z);
var TransformComponent = function(n) {
  var r = n.children, e = n.wrapperClass, t = e === void 0 ? "" : e, a = n.contentClass, i = a === void 0 ? "" : a, s = n.wrapperStyle, u = n.contentStyle, c = useContext(Context).setComponents, g = useRef(null), b = useRef(null);
  return useEffect(function() {
    var A = g.current, I = b.current;
    A !== null && I !== null && c && c(A, I);
  }, []), React.createElement(
    "div",
    { ref: g, className: "react-transform-wrapper " + styles.wrapper + " " + t, style: s },
    React.createElement("div", { ref: b, className: "react-transform-component " + styles.content + " " + i, style: u }, r)
  );
};
const StyledWrapper = styled.div`
    padding: 26px 30px;
    height: 100vh;
    box-sizing: border-box;
`, StyledGridItem = styled.div`
    display: flex;
    align-content: center;
    justify-content: center;
    height: 100%;
    width: 100%;
`, StyledScrollContainer = styled(TransformWrapper)``, StyledDocument = styled(Document)``, StyledPage = styled(Page$1)``, PDFToolbar = styled.div`
    display: flex;
    flex-direction: row;
    position: absolute;
    bottom: 100px;
    align-items: center;
    height: 42px;
    column-gap: 30px;
    padding: 0 5px;
    background: '#e40707';
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 6px;
`, StyledIcon = styled.div`
    border-radius: 4px;
    width: 30px;
    height: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
`, StyledPageController = styled.div`
    display: flex;
    flex-direction: row;
    column-gap: 6px;
    align-items: center;
`, StyledZoomController = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    column-gap: 4px;
`, StyledPageLabel = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    font-size: 12px;
    column-gap: 6px;

    span {
        display: flex;
        column-gap: 5px;
        flex-direction: row;
        align-items: center;
        color: wheat;
    }
`;
var ContentType = /* @__PURE__ */ ((n) => (n.PDF = "application/pdf", n.PNG = "IMAGE/PNG", n.JPG = "IMAGE/JPG", n))(ContentType || {});
const useDocumentConverter = (n) => {
  const [r, e] = useState();
  async function t(a) {
    return new Promise((i, s) => {
      const u = new FileReader();
      u.onloadend = () => {
        i(u.result);
      }, u.readAsDataURL(a);
    });
  }
  return useEffect(() => {
    n instanceof Blob && t(n).then((a) => {
      e(String(a));
    });
  }, []), n instanceof Blob ? { documentBase64: r, contentType: n.type } : { documentBase64: n, contentType: ContentType.PDF };
};
var DefaultContext = {
  color: void 0,
  size: void 0,
  className: void 0,
  style: void 0,
  attr: void 0
}, IconContext = React.createContext && React.createContext(DefaultContext), __assign = globalThis && globalThis.__assign || function() {
  return __assign = Object.assign || function(n) {
    for (var r, e = 1, t = arguments.length; e < t; e++) {
      r = arguments[e];
      for (var a in r)
        Object.prototype.hasOwnProperty.call(r, a) && (n[a] = r[a]);
    }
    return n;
  }, __assign.apply(this, arguments);
}, __rest = globalThis && globalThis.__rest || function(n, r) {
  var e = {};
  for (var t in n)
    Object.prototype.hasOwnProperty.call(n, t) && r.indexOf(t) < 0 && (e[t] = n[t]);
  if (n != null && typeof Object.getOwnPropertySymbols == "function")
    for (var a = 0, t = Object.getOwnPropertySymbols(n); a < t.length; a++)
      r.indexOf(t[a]) < 0 && Object.prototype.propertyIsEnumerable.call(n, t[a]) && (e[t[a]] = n[t[a]]);
  return e;
};
function Tree2Element(n) {
  return n && n.map(function(r, e) {
    return React.createElement(r.tag, __assign({
      key: e
    }, r.attr), Tree2Element(r.child));
  });
}
function GenIcon(n) {
  return function(r) {
    return React.createElement(IconBase, __assign({
      attr: __assign({}, n.attr)
    }, r), Tree2Element(n.child));
  };
}
function IconBase(n) {
  var r = function(e) {
    var t = n.attr, a = n.size, i = n.title, s = __rest(n, ["attr", "size", "title"]), u = a || e.size || "1em", c;
    return e.className && (c = e.className), n.className && (c = (c ? c + " " : "") + n.className), React.createElement("svg", __assign({
      stroke: "currentColor",
      fill: "currentColor",
      strokeWidth: "0"
    }, e.attr, t, s, {
      className: c,
      style: __assign(__assign({
        color: n.color || e.color
      }, e.style), n.style),
      height: u,
      width: u,
      xmlns: "http://www.w3.org/2000/svg"
    }), i && React.createElement("title", null, i), n.children);
  };
  return IconContext !== void 0 ? React.createElement(IconContext.Consumer, null, function(e) {
    return r(e);
  }) : r(DefaultContext);
}
function AiOutlineZoomIn(n) {
  return GenIcon({ tag: "svg", attr: { viewBox: "0 0 1024 1024" }, child: [{ tag: "path", attr: { d: "M637 443H519V309c0-4.4-3.6-8-8-8h-60c-4.4 0-8 3.6-8 8v134H325c-4.4 0-8 3.6-8 8v60c0 4.4 3.6 8 8 8h118v134c0 4.4 3.6 8 8 8h60c4.4 0 8-3.6 8-8V519h118c4.4 0 8-3.6 8-8v-60c0-4.4-3.6-8-8-8zm284 424L775 721c122.1-148.9 113.6-369.5-26-509-148-148.1-388.4-148.1-537 0-148.1 148.6-148.1 389 0 537 139.5 139.6 360.1 148.1 509 26l146 146c3.2 2.8 8.3 2.8 11 0l43-43c2.8-2.7 2.8-7.8 0-11zM696 696c-118.8 118.7-311.2 118.7-430 0-118.7-118.8-118.7-311.2 0-430 118.8-118.7 311.2-118.7 430 0 118.7 118.8 118.7 311.2 0 430z" } }] })(n);
}
function BiMinus(n) {
  return GenIcon({ tag: "svg", attr: { viewBox: "0 0 24 24" }, child: [{ tag: "path", attr: { d: "M5 11h14v2H5z" } }] })(n);
}
function BiPlus(n) {
  return GenIcon({ tag: "svg", attr: { viewBox: "0 0 24 24" }, child: [{ tag: "path", attr: { d: "M19 11h-6V5h-2v6H5v2h6v6h2v-6h6z" } }] })(n);
}
function BsChevronLeft(n) {
  return GenIcon({ tag: "svg", attr: { fill: "currentColor", viewBox: "0 0 16 16" }, child: [{ tag: "path", attr: { fillRule: "evenodd", d: "M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z" } }] })(n);
}
function BsChevronRight(n) {
  return GenIcon({ tag: "svg", attr: { fill: "currentColor", viewBox: "0 0 16 16" }, child: [{ tag: "path", attr: { fillRule: "evenodd", d: "M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z" } }] })(n);
}
const DocumentViewerToolbar = ({
  currentPage: n,
  pageCount: r,
  zoom: e,
  onPageChange: t,
  onZoomChange: a
}) => {
  const i = n > 1, s = n < r, u = e < 2.5, c = e > 1.2, g = 0.1;
  return /* @__PURE__ */ React.createElement(PDFToolbar, null, /* @__PURE__ */ React.createElement(StyledPageController, null, /* @__PURE__ */ React.createElement(StyledIcon, null, /* @__PURE__ */ React.createElement(BsChevronLeft, {
    size: 15,
    fill: "white",
    strokeWidth: 1,
    onClick: () => {
      i && t(n - 1);
    }
  })), /* @__PURE__ */ React.createElement(StyledPageLabel, null, "Page :", /* @__PURE__ */ React.createElement("span", null, `${n} / ${r}`)), /* @__PURE__ */ React.createElement(StyledIcon, null, /* @__PURE__ */ React.createElement(BsChevronRight, {
    size: 15,
    fill: "white",
    strokeWidth: 1,
    onClick: () => {
      s && t(n + 1);
    }
  }))), /* @__PURE__ */ React.createElement(StyledZoomController, null, /* @__PURE__ */ React.createElement(StyledIcon, null, /* @__PURE__ */ React.createElement(BiMinus, {
    size: 20,
    fill: "white",
    onClick: () => {
      c && a(e - g);
    }
  })), /* @__PURE__ */ React.createElement(AiOutlineZoomIn, {
    size: 20,
    fill: "white"
  }), /* @__PURE__ */ React.createElement(StyledIcon, null, /* @__PURE__ */ React.createElement(BiPlus, {
    size: 20,
    fill: "white",
    onClick: () => {
      u && a(e + g);
    }
  }))));
};
pdf.exports.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdf.exports.version}/build/pdf.worker.min.js`;
const DocumentViewer = ({ file: n }) => {
  const [r, e] = useState(1), [t, a] = useState(1), [i, s] = useState(1.2), { documentBase64: u, contentType: c } = useDocumentConverter(n), g = useRef(null);
  return useEffect(() => {
    g.current && g.current.setAttribute("height", `${i * 82}%`);
  }, [i]), /* @__PURE__ */ React.createElement(StyledWrapper, null, /* @__PURE__ */ React.createElement(StyledGridItem, null, /* @__PURE__ */ React.createElement(StyledScrollContainer, {
    initialScale: 1,
    initialPositionX: 200,
    initialPositionY: 100
  }, /* @__PURE__ */ React.createElement(TransformComponent, null, c === ContentType.PDF ? /* @__PURE__ */ React.createElement(StyledDocument, {
    file: u,
    onLoadSuccess: (b) => {
      e(b.numPages);
    }
  }, /* @__PURE__ */ React.createElement(StyledPage, {
    pageNumber: t,
    scale: i
  })) : /* @__PURE__ */ React.createElement("img", {
    ref: g,
    src: u
  }))), /* @__PURE__ */ React.createElement(DocumentViewerToolbar, {
    currentPage: t,
    pageCount: r,
    zoom: i,
    onPageChange: a,
    onZoomChange: s
  })));
}, DocumentContainer = ({}) => /* @__PURE__ */ React.createElement(DocumentViewer, {
  file: new Blob(["/JavaLesBases.pdf"], { type: "application/pdf" })
});
export {
  DocumentContainer,
  DocumentViewer
};
//# sourceMappingURL=docs-renderer.es.js.map