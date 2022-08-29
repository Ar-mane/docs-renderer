var qe = Object.defineProperty;
var Ye = (t, i, r) => i in t ? qe(t, i, { enumerable: !0, configurable: !0, writable: !0, value: r }) : t[i] = r;
var It = (t, i, r) => (Ye(t, typeof i != "symbol" ? i + "" : i, r), r), ae = (t, i, r) => {
  if (!i.has(t))
    throw TypeError("Cannot " + r);
};
var M = (t, i, r) => (ae(t, i, "read from private field"), r ? r.call(t) : i.get(t)), at = (t, i, r) => {
  if (i.has(t))
    throw TypeError("Cannot add the same private member more than once");
  i instanceof WeakSet ? i.add(t) : i.set(t, r);
}, ut = (t, i, r, e) => (ae(t, i, "write to private field"), e ? e.call(t, r) : i.set(t, r), r), oe = (t, i, r, e) => ({
  set _(d) {
    ut(t, i, d, r);
  },
  get _() {
    return M(t, i, e);
  }
}), lt = (t, i, r) => (ae(t, i, "access private method"), r);
import React, { useState, useImperativeHandle, Component, useContext, useRef, useEffect } from "react";
import styled from "styled-components";
const PDFToolbar = styled.div.withConfig({
  displayName: "PDFToolbar",
  componentId: "sc-ufnf2g-0"
})(["align-items:center;background-color:#292828 !important;border-radius:6px;bottom:20px;box-shadow:0px 4px 4px rgba(0,0,0,0.25);column-gap:30px;display:flex;flex-direction:row;height:42px;padding:0 5px;position:absolute;"]), StyledIcon = styled.div.withConfig({
  displayName: "StyledIcon",
  componentId: "sc-ufnf2g-1"
})(["align-items:center;border-radius:4px;display:flex;height:30px;justify-content:center;width:30px;"]), StyledPageController = styled.div.withConfig({
  displayName: "StyledPageController",
  componentId: "sc-ufnf2g-2"
})(["align-items:center;color:white;column-gap:6px;display:flex;flex-direction:row;"]), StyledZoomController = styled.div.withConfig({
  displayName: "StyledZoomController",
  componentId: "sc-ufnf2g-3"
})(["align-items:center;color:white;column-gap:4px;display:flex;flex-direction:row;"]), StyledPageLabel = styled.div.withConfig({
  displayName: "StyledPageLabel",
  componentId: "sc-ufnf2g-4"
})(["align-items:center;color:white;column-gap:6px;display:flex;flex-direction:row;font-size:12px;span{align-items:center;color:white;column-gap:5px;display:flex;flex-direction:row;}"]);
var DefaultContext = {
  color: void 0,
  size: void 0,
  className: void 0,
  style: void 0,
  attr: void 0
}, IconContext = React.createContext && React.createContext(DefaultContext), __assign$1 = globalThis && globalThis.__assign || function() {
  return __assign$1 = Object.assign || function(t) {
    for (var i, r = 1, e = arguments.length; r < e; r++) {
      i = arguments[r];
      for (var d in i)
        Object.prototype.hasOwnProperty.call(i, d) && (t[d] = i[d]);
    }
    return t;
  }, __assign$1.apply(this, arguments);
}, __rest = globalThis && globalThis.__rest || function(t, i) {
  var r = {};
  for (var e in t)
    Object.prototype.hasOwnProperty.call(t, e) && i.indexOf(e) < 0 && (r[e] = t[e]);
  if (t != null && typeof Object.getOwnPropertySymbols == "function")
    for (var d = 0, e = Object.getOwnPropertySymbols(t); d < e.length; d++)
      i.indexOf(e[d]) < 0 && Object.prototype.propertyIsEnumerable.call(t, e[d]) && (r[e[d]] = t[e[d]]);
  return r;
};
function Tree2Element(t) {
  return t && t.map(function(i, r) {
    return React.createElement(i.tag, __assign$1({
      key: r
    }, i.attr), Tree2Element(i.child));
  });
}
function GenIcon(t) {
  return function(i) {
    return React.createElement(IconBase, __assign$1({
      attr: __assign$1({}, t.attr)
    }, i), Tree2Element(t.child));
  };
}
function IconBase(t) {
  var i = function(r) {
    var e = t.attr, d = t.size, C = t.title, T = __rest(t, ["attr", "size", "title"]), I = d || r.size || "1em", x;
    return r.className && (x = r.className), t.className && (x = (x ? x + " " : "") + t.className), React.createElement("svg", __assign$1({
      stroke: "currentColor",
      fill: "currentColor",
      strokeWidth: "0"
    }, r.attr, e, T, {
      className: x,
      style: __assign$1(__assign$1({
        color: t.color || r.color
      }, r.style), t.style),
      height: I,
      width: I,
      xmlns: "http://www.w3.org/2000/svg"
    }), C && React.createElement("title", null, C), t.children);
  };
  return IconContext !== void 0 ? React.createElement(IconContext.Consumer, null, function(r) {
    return i(r);
  }) : i(DefaultContext);
}
function AiOutlineZoomIn(t) {
  return GenIcon({ tag: "svg", attr: { viewBox: "0 0 1024 1024" }, child: [{ tag: "path", attr: { d: "M637 443H519V309c0-4.4-3.6-8-8-8h-60c-4.4 0-8 3.6-8 8v134H325c-4.4 0-8 3.6-8 8v60c0 4.4 3.6 8 8 8h118v134c0 4.4 3.6 8 8 8h60c4.4 0 8-3.6 8-8V519h118c4.4 0 8-3.6 8-8v-60c0-4.4-3.6-8-8-8zm284 424L775 721c122.1-148.9 113.6-369.5-26-509-148-148.1-388.4-148.1-537 0-148.1 148.6-148.1 389 0 537 139.5 139.6 360.1 148.1 509 26l146 146c3.2 2.8 8.3 2.8 11 0l43-43c2.8-2.7 2.8-7.8 0-11zM696 696c-118.8 118.7-311.2 118.7-430 0-118.7-118.8-118.7-311.2 0-430 118.8-118.7 311.2-118.7 430 0 118.7 118.8 118.7 311.2 0 430z" } }] })(t);
}
function BiMinus(t) {
  return GenIcon({ tag: "svg", attr: { viewBox: "0 0 24 24" }, child: [{ tag: "path", attr: { d: "M5 11h14v2H5z" } }] })(t);
}
function BiPlus(t) {
  return GenIcon({ tag: "svg", attr: { viewBox: "0 0 24 24" }, child: [{ tag: "path", attr: { d: "M19 11h-6V5h-2v6H5v2h6v6h2v-6h6z" } }] })(t);
}
function BsChevronLeft(t) {
  return GenIcon({ tag: "svg", attr: { fill: "currentColor", viewBox: "0 0 16 16" }, child: [{ tag: "path", attr: { fillRule: "evenodd", d: "M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z" } }] })(t);
}
function BsChevronRight(t) {
  return GenIcon({ tag: "svg", attr: { fill: "currentColor", viewBox: "0 0 16 16" }, child: [{ tag: "path", attr: { fillRule: "evenodd", d: "M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z" } }] })(t);
}
const DefaultDocumentToolbar = ({
  currentPage: t,
  pageCount: i,
  onPageChange: r,
  onZoomIn: e,
  onZoomOut: d
}) => {
  const C = t > 1, T = t < i;
  return /* @__PURE__ */ React.createElement(PDFToolbar, null, /* @__PURE__ */ React.createElement(StyledPageController, null, /* @__PURE__ */ React.createElement(StyledIcon, null, /* @__PURE__ */ React.createElement(BsChevronLeft, {
    size: 15,
    fill: "white",
    strokeWidth: 1,
    onClick: () => {
      C && r(t - 1);
    }
  })), /* @__PURE__ */ React.createElement(StyledPageLabel, null, "Page :", /* @__PURE__ */ React.createElement("span", null, `${t} / ${i}`)), /* @__PURE__ */ React.createElement(StyledIcon, null, /* @__PURE__ */ React.createElement(BsChevronRight, {
    size: 15,
    fill: "white",
    strokeWidth: 1,
    onClick: () => {
      T && r(t + 1);
    }
  }))), /* @__PURE__ */ React.createElement(StyledZoomController, null, /* @__PURE__ */ React.createElement(StyledIcon, null, /* @__PURE__ */ React.createElement(BiMinus, {
    size: 20,
    fill: "white",
    onClick: d
  })), /* @__PURE__ */ React.createElement(AiOutlineZoomIn, {
    size: 20,
    fill: "white"
  }), /* @__PURE__ */ React.createElement(StyledIcon, null, /* @__PURE__ */ React.createElement(BiPlus, {
    size: 20,
    fill: "white",
    onClick: e
  }))));
};
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
var extendStatics = function(t, i) {
  return extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(r, e) {
    r.__proto__ = e;
  } || function(r, e) {
    for (var d in e)
      Object.prototype.hasOwnProperty.call(e, d) && (r[d] = e[d]);
  }, extendStatics(t, i);
};
function __extends(t, i) {
  if (typeof i != "function" && i !== null)
    throw new TypeError("Class extends value " + String(i) + " is not a constructor or null");
  extendStatics(t, i);
  function r() {
    this.constructor = t;
  }
  t.prototype = i === null ? Object.create(i) : (r.prototype = i.prototype, new r());
}
var __assign = function() {
  return __assign = Object.assign || function(i) {
    for (var r, e = 1, d = arguments.length; e < d; e++) {
      r = arguments[e];
      for (var C in r)
        Object.prototype.hasOwnProperty.call(r, C) && (i[C] = r[C]);
    }
    return i;
  }, __assign.apply(this, arguments);
};
function __spreadArray(t, i, r) {
  if (r || arguments.length === 2)
    for (var e = 0, d = i.length, C; e < d; e++)
      (C || !(e in i)) && (C || (C = Array.prototype.slice.call(i, 0, e)), C[e] = i[e]);
  return t.concat(C || i);
}
var roundNumber = function(t, i) {
  return Number(t.toFixed(i));
}, checkIsNumber = function(t, i) {
  return typeof t == "number" ? t : i;
}, handleCallback = function(t, i, r) {
  r && typeof r == "function" && r(t, i);
}, easeOut = function(t) {
  return -Math.cos(t * Math.PI) / 2 + 0.5;
}, linear = function(t) {
  return t;
}, easeInQuad = function(t) {
  return t * t;
}, easeOutQuad = function(t) {
  return t * (2 - t);
}, easeInOutQuad = function(t) {
  return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
}, easeInCubic = function(t) {
  return t * t * t;
}, easeOutCubic = function(t) {
  return --t * t * t + 1;
}, easeInOutCubic = function(t) {
  return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
}, easeInQuart = function(t) {
  return t * t * t * t;
}, easeOutQuart = function(t) {
  return 1 - --t * t * t * t;
}, easeInOutQuart = function(t) {
  return t < 0.5 ? 8 * t * t * t * t : 1 - 8 * --t * t * t * t;
}, easeInQuint = function(t) {
  return t * t * t * t * t;
}, easeOutQuint = function(t) {
  return 1 + --t * t * t * t * t;
}, easeInOutQuint = function(t) {
  return t < 0.5 ? 16 * t * t * t * t * t : 1 + 16 * --t * t * t * t * t;
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
}, handleCancelAnimationFrame = function(t) {
  typeof t == "number" && cancelAnimationFrame(t);
}, handleCancelAnimation = function(t) {
  !t.mounted || (handleCancelAnimationFrame(t.animation), t.animate = !1, t.animation = null, t.velocity = null);
};
function handleSetupAnimation(t, i, r, e) {
  if (!!t.mounted) {
    var d = new Date().getTime(), C = 1;
    handleCancelAnimation(t), t.animation = function() {
      if (!t.mounted)
        return handleCancelAnimationFrame(t.animation);
      var T = new Date().getTime() - d, I = T / r, x = animations[i], m = x(I);
      T >= r ? (e(C), t.animation = null) : t.animation && (e(m), requestAnimationFrame(t.animation));
    }, requestAnimationFrame(t.animation);
  }
}
function animate(t, i, r, e) {
  var d = isValidTargetState(i);
  if (!(!t.mounted || !d)) {
    var C = t.setTransformState, T = t.transformState, I = T.scale, x = T.positionX, m = T.positionY, S = i.scale - I, R = i.positionX - x, A = i.positionY - m;
    r === 0 ? C(i.scale, i.positionX, i.positionY) : handleSetupAnimation(t, e, r, function(P) {
      var u = I + S * P, n = x + R * P, a = m + A * P;
      C(u, n, a);
    });
  }
}
function isValidTargetState(t) {
  var i = t.scale, r = t.positionX, e = t.positionY;
  return !(isNaN(i) || isNaN(r) || isNaN(e));
}
function getComponentsSizes(t, i, r) {
  var e = t.offsetWidth, d = t.offsetHeight, C = i.offsetWidth, T = i.offsetHeight, I = C * r, x = T * r, m = e - I, S = d - x;
  return {
    wrapperWidth: e,
    wrapperHeight: d,
    newContentWidth: I,
    newDiffWidth: m,
    newContentHeight: x,
    newDiffHeight: S
  };
}
var getBounds = function(t, i, r, e, d, C, T) {
  var I = t > i ? r * (T ? 1 : 0.5) : 0, x = e > d ? C * (T ? 1 : 0.5) : 0, m = t - i - I, S = I, R = e - d - x, A = x;
  return { minPositionX: m, maxPositionX: S, minPositionY: R, maxPositionY: A };
}, calculateBounds = function(t, i) {
  var r = t.wrapperComponent, e = t.contentComponent, d = t.setup.centerZoomedOut;
  if (!r || !e)
    throw new Error("Components are not mounted");
  var C = getComponentsSizes(r, e, i), T = C.wrapperWidth, I = C.wrapperHeight, x = C.newContentWidth, m = C.newDiffWidth, S = C.newContentHeight, R = C.newDiffHeight, A = getBounds(T, x, m, I, S, R, Boolean(d));
  return A;
}, handleCalculateBounds = function(t, i) {
  var r = calculateBounds(t, i);
  return t.bounds = r, r;
};
function getMouseBoundedPosition(t, i, r, e, d, C, T) {
  var I = r.minPositionX, x = r.minPositionY, m = r.maxPositionX, S = r.maxPositionY, R = 0, A = 0;
  T && (R = d, A = C);
  var P = boundLimiter(t, I - R, m + R, e), u = boundLimiter(i, x - A, S + A, e);
  return { x: P, y: u };
}
var boundLimiter = function(t, i, r, e) {
  return e ? t < i ? roundNumber(i, 2) : t > r ? roundNumber(r, 2) : roundNumber(t, 2) : roundNumber(t, 2);
};
function handleCalculateZoomPositions(t, i, r, e, d, C) {
  var T = t.transformState, I = T.scale, x = T.positionX, m = T.positionY, S = e - I;
  if (typeof i != "number" || typeof r != "number")
    return console.error("Mouse X and Y position were not provided!"), { x, y: m };
  var R = x - i * S, A = m - r * S, P = getMouseBoundedPosition(R, A, d, C, 0, 0, null);
  return P;
}
function checkZoomBounds(t, i, r, e, d) {
  var C = d ? e : 0, T = i - C;
  return !isNaN(r) && t >= r ? r : !isNaN(i) && t <= T ? T : t;
}
var isPanningStartAllowed = function(t, i) {
  var r = t.setup.panning.excluded, e = t.isInitialized, d = t.wrapperComponent, C = i.target, T = d == null ? void 0 : d.contains(C), I = e && C && T;
  if (!I)
    return !1;
  var x = isExcludedNode(C, r);
  return !x;
}, isPanningAllowed = function(t) {
  var i = t.isInitialized, r = t.isPanning, e = t.setup, d = e.panning.disabled, C = i && r && !d;
  return !!C;
}, handlePanningSetup = function(t, i) {
  var r = t.transformState, e = r.positionX, d = r.positionY;
  t.isPanning = !0;
  var C = i.clientX, T = i.clientY;
  t.startCoords = { x: C - e, y: T - d };
}, handleTouchPanningSetup = function(t, i) {
  var r = i.touches, e = t.transformState, d = e.positionX, C = e.positionY;
  t.isPanning = !0;
  var T = r.length === 1;
  if (T) {
    var I = r[0].clientX, x = r[0].clientY;
    t.startCoords = { x: I - d, y: x - C };
  }
};
function handlePanToBounds(t) {
  var i = t.transformState, r = i.positionX, e = i.positionY, d = i.scale, C = t.setup, T = C.disabled, I = C.limitToBounds, x = C.centerZoomedOut, m = t.wrapperComponent;
  if (!(T || !m || !t.bounds)) {
    var S = t.bounds, R = S.maxPositionX, A = S.minPositionX, P = S.maxPositionY, u = S.minPositionY, n = r > R || r < A, a = e > P || e < u, l = r > R ? m.offsetWidth : t.setup.minPositionX || 0, F = e > P ? m.offsetHeight : t.setup.minPositionY || 0, y = handleCalculateZoomPositions(t, l, F, d, t.bounds, I || x), g = y.x, o = y.y;
    return {
      scale: d,
      positionX: n ? g : r,
      positionY: a ? o : e
    };
  }
}
function handleNewPosition(t, i, r, e, d) {
  var C = t.setup.limitToBounds, T = t.wrapperComponent, I = t.bounds, x = t.transformState, m = x.scale, S = x.positionX, R = x.positionY, A = i !== S, P = r !== R, u = !A || !P;
  if (!(!T || u || !I)) {
    var n = getMouseBoundedPosition(i, r, I, C, e, d, T), a = n.x, l = n.y;
    t.setTransformState(m, a, l);
  }
}
var getPanningClientPosition = function(t, i, r) {
  var e = t.startCoords, d = t.transformState, C = t.setup.panning, T = C.lockAxisX, I = C.lockAxisY, x = d.positionX, m = d.positionY;
  if (!e)
    return { x, y: m };
  var S = i - e.x, R = r - e.y, A = T ? x : S, P = I ? m : R;
  return { x: A, y: P };
}, getPaddingValue = function(t, i) {
  var r = t.setup, e = t.transformState, d = e.scale, C = r.minScale;
  return i > 0 && d >= C ? i : 0;
}, isVelocityCalculationAllowed = function(t) {
  var i = t.mounted, r = t.setup, e = r.disabled, d = r.velocityAnimation, C = t.transformState.scale, T = d.disabled, I = !T || C > 1 || !e || i;
  return !!I;
}, isVelocityAllowed = function(t) {
  var i = t.mounted, r = t.velocity, e = t.bounds, d = t.setup, C = d.disabled, T = d.velocityAnimation, I = t.transformState.scale, x = T.disabled, m = !x || I > 1 || !C || i;
  return !(!m || !r || !e);
};
function getVelocityMoveTime(t, i) {
  var r = t.setup.velocityAnimation, e = r.equalToMove, d = r.animationTime, C = r.sensitivity;
  return e ? d * i * C : d;
}
function getVelocityPosition(t, i, r, e, d, C, T, I, x, m) {
  if (d) {
    if (i > T && r > T) {
      var S = T + (t - T) * m;
      return S > x ? x : S < T ? T : S;
    }
    if (i < C && r < C) {
      var S = C + (t - C) * m;
      return S < I ? I : S > C ? C : S;
    }
  }
  return e ? i : boundLimiter(t, C, T, d);
}
function getSizeMultiplier(t, i) {
  var r = 1;
  return i ? Math.min(r, t.offsetWidth / window.innerWidth) : r;
}
function handleCalculateVelocity(t, i) {
  var r = isVelocityCalculationAllowed(t);
  if (!!r) {
    var e = t.lastMousePosition, d = t.velocityTime, C = t.setup, T = t.wrapperComponent, I = C.velocityAnimation.equalToMove, x = Date.now();
    if (e && d && T) {
      var m = getSizeMultiplier(T, I), S = i.x - e.x, R = i.y - e.y, A = S / m, P = R / m, u = x - d, n = S * S + R * R, a = Math.sqrt(n) / u;
      t.velocity = { velocityX: A, velocityY: P, total: a };
    }
    t.lastMousePosition = i, t.velocityTime = x;
  }
}
function handleVelocityPanning(t) {
  var i = t.velocity, r = t.bounds, e = t.setup, d = t.wrapperComponent, C = isVelocityAllowed(t);
  if (!(!C || !i || !r || !d)) {
    var T = i.velocityX, I = i.velocityY, x = i.total, m = r.maxPositionX, S = r.minPositionX, R = r.maxPositionY, A = r.minPositionY, P = e.limitToBounds, u = e.alignmentAnimation, n = e.zoomAnimation, a = e.panning, l = a.lockAxisY, F = a.lockAxisX, y = n.animationType, g = u.sizeX, o = u.sizeY, h = u.velocityAlignmentTime, v = h, O = getVelocityMoveTime(t, x), D = Math.max(O, v), L = getPaddingValue(t, g), U = getPaddingValue(t, o), J = L * d.offsetWidth / 100, V = U * d.offsetHeight / 100, N = m + J, G = S - J, k = R + V, z = A - V, W = t.transformState, st = new Date().getTime();
    handleSetupAnimation(t, y, D, function(ot) {
      var ct = t.transformState, mt = ct.scale, bt = ct.positionX, B = ct.positionY, b = new Date().getTime() - st, f = b / v, w = animations[u.animationType], s = 1 - w(Math.min(1, f)), c = 1 - ot, p = bt + T * c, _ = B + I * c, E = getVelocityPosition(p, W.positionX, bt, F, P, S, m, G, N, s), j = getVelocityPosition(_, W.positionY, B, l, P, A, R, z, k, s);
      (bt !== p || B !== _) && t.setTransformState(mt, E, j);
    });
  }
}
function handlePanningStart(t, i) {
  var r = t.transformState.scale;
  handleCancelAnimation(t), handleCalculateBounds(t, r), i.touches ? handleTouchPanningSetup(t, i) : handlePanningSetup(t, i);
}
function handlePanning(t, i, r) {
  var e = t.startCoords, d = t.setup, C = d.alignmentAnimation, T = C.sizeX, I = C.sizeY;
  if (!!e) {
    var x = getPanningClientPosition(t, i, r), m = x.x, S = x.y, R = getPaddingValue(t, T), A = getPaddingValue(t, I);
    handleCalculateVelocity(t, { x: m, y: S }), handleNewPosition(t, m, S, R, A);
  }
}
function handlePanningEnd(t) {
  if (t.isPanning) {
    var i = t.setup.panning.velocityDisabled, r = t.velocity, e = t.wrapperComponent, d = t.contentComponent;
    t.isPanning = !1, t.animate = !1, t.animation = null;
    var C = e == null ? void 0 : e.getBoundingClientRect(), T = d == null ? void 0 : d.getBoundingClientRect(), I = (C == null ? void 0 : C.width) || 0, x = (C == null ? void 0 : C.height) || 0, m = (T == null ? void 0 : T.width) || 0, S = (T == null ? void 0 : T.height) || 0, R = I < m || x < S, A = !i && r && (r == null ? void 0 : r.total) > 0.1 && R;
    A ? handleVelocityPanning(t) : handleAlignToBounds(t);
  }
}
function handleAlignToBounds(t) {
  var i = t.transformState.scale, r = t.setup, e = r.minScale, d = r.alignmentAnimation, C = d.disabled, T = d.sizeX, I = d.sizeY, x = d.animationTime, m = d.animationType, S = C || i < e || !T && !I;
  if (!S) {
    var R = handlePanToBounds(t);
    R && animate(t, R, x, m);
  }
}
function handleAlignToScaleBounds(t, i, r) {
  var e = t.transformState.scale, d = t.wrapperComponent, C = t.setup, T = C.minScale, I = C.limitToBounds, x = C.zoomAnimation, m = x.disabled, S = x.animationTime, R = x.animationType, A = m || e >= T;
  if ((e >= 1 || I) && handleAlignToBounds(t), !(A || !d || !t.mounted)) {
    var P = i || d.offsetWidth / 2, u = r || d.offsetHeight / 2, n = handleZoomToPoint(t, T, P, u);
    n && animate(t, n, S, R);
  }
}
function handleZoomToPoint(t, i, r, e) {
  var d = t.setup, C = d.minScale, T = d.maxScale, I = d.limitToBounds, x = checkZoomBounds(roundNumber(i, 2), C, T, 0, !1), m = handleCalculateBounds(t, x), S = handleCalculateZoomPositions(t, r, e, x, m, I), R = S.x, A = S.y;
  return { scale: x, positionX: R, positionY: A };
}
var initialState = {
  previousScale: 1,
  scale: 1,
  positionX: 0,
  positionY: 0
}, contextInitialState = __assign(__assign({}, initialState), { setComponents: function() {
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
}, createState = function(t) {
  var i, r, e, d;
  return {
    previousScale: (i = t.initialScale) !== null && i !== void 0 ? i : initialState.scale,
    scale: (r = t.initialScale) !== null && r !== void 0 ? r : initialState.scale,
    positionX: (e = t.initialPositionX) !== null && e !== void 0 ? e : initialState.positionX,
    positionY: (d = t.initialPositionY) !== null && d !== void 0 ? d : initialState.positionY
  };
}, createSetup = function(t) {
  var i = __assign({}, initialSetup);
  return Object.keys(t).forEach(function(r) {
    var e = typeof t[r] < "u", d = typeof initialSetup[r] < "u";
    if (d && e) {
      var C = Object.prototype.toString.call(initialSetup[r]), T = C === "[object Object]", I = C === "[object Array]";
      T ? i[r] = __assign(__assign({}, initialSetup[r]), t[r]) : I ? i[r] = __spreadArray(__spreadArray([], initialSetup[r]), t[r]) : i[r] = t[r];
    }
  }), i;
}, handleCalculateButtonZoom = function(t, i, r) {
  var e = t.transformState.scale, d = t.wrapperComponent, C = t.setup, T = C.maxScale, I = C.minScale, x = C.zoomAnimation, m = x.size;
  if (!d)
    throw new Error("Wrapper is not mounted");
  var S = e * Math.exp(i * r), R = checkZoomBounds(roundNumber(S, 3), I, T, m, !1);
  return R;
};
function handleZoomToViewCenter(t, i, r, e, d) {
  var C = t.wrapperComponent, T = t.transformState, I = T.scale, x = T.positionX, m = T.positionY;
  if (!C)
    return console.error("No WrapperComponent found");
  var S = C.offsetWidth, R = C.offsetHeight, A = (S / 2 - x) / I, P = (R / 2 - m) / I, u = handleCalculateButtonZoom(t, i, r), n = handleZoomToPoint(t, u, A, P);
  if (!n)
    return console.error("Error during zoom event. New transformation state was not calculated.");
  animate(t, n, e, d);
}
function resetTransformations(t, i, r) {
  var e = t.setup, d = t.wrapperComponent, C = e.limitToBounds, T = createState(t.props), I = t.transformState, x = I.scale, m = I.positionX, S = I.positionY;
  if (!!d) {
    var R = calculateBounds(t, T.scale), A = getMouseBoundedPosition(T.positionX, T.positionY, R, C, 0, 0, d), P = {
      scale: T.scale,
      positionX: A.x,
      positionY: A.y
    };
    x === T.scale && m === T.positionX && S === T.positionY || animate(t, P, i, r);
  }
}
function calculateZoomToNode(t, i, r) {
  var e = t.wrapperComponent, d = t.setup, C = d.limitToBounds, T = d.minScale, I = d.maxScale;
  if (!e)
    return initialState;
  var x = e.getBoundingClientRect(), m = getOffset(i), S = m.x, R = m.y, A = i.offsetWidth, P = i.offsetHeight, u = e.offsetWidth / A, n = e.offsetHeight / P, a = checkZoomBounds(r || Math.min(u, n), T, I, 0, !1), l = (x.width - A * a) / 2, F = (x.height - P * a) / 2, y = (x.left - S) * a + l, g = (x.top - R) * a + F, o = calculateBounds(t, a), h = getMouseBoundedPosition(y, g, o, C, 0, 0, e), v = h.x, O = h.y;
  return { positionX: v, positionY: O, scale: a };
}
function getOffset(t) {
  for (var i = t, r = 0, e = 0; i; )
    r += i.offsetLeft, e += i.offsetTop, i = i.offsetParent;
  return {
    x: r,
    y: e
  };
}
function isValidZoomNode(t) {
  if (t) {
    if ((t == null ? void 0 : t.offsetWidth) === void 0 || (t == null ? void 0 : t.offsetHeight) === void 0)
      return console.error("Zoom node is not valid - it must contain offsetWidth and offsetHeight"), !1;
  } else
    return console.error("Zoom node not found"), !1;
  return !0;
}
var zoomIn = function(t) {
  return function(i, r, e) {
    i === void 0 && (i = 0.5), r === void 0 && (r = 300), e === void 0 && (e = "easeOut"), handleZoomToViewCenter(t, 1, i, r, e);
  };
}, zoomOut = function(t) {
  return function(i, r, e) {
    i === void 0 && (i = 0.5), r === void 0 && (r = 300), e === void 0 && (e = "easeOut"), handleZoomToViewCenter(t, -1, i, r, e);
  };
}, setTransform = function(t) {
  return function(i, r, e, d, C) {
    d === void 0 && (d = 300), C === void 0 && (C = "easeOut");
    var T = t.transformState, I = T.positionX, x = T.positionY, m = T.scale, S = t.wrapperComponent, R = t.contentComponent, A = t.setup.disabled;
    if (!(A || !S || !R)) {
      var P = {
        positionX: isNaN(i) ? I : i,
        positionY: isNaN(r) ? x : r,
        scale: isNaN(e) ? m : e
      };
      animate(t, P, d, C);
    }
  };
}, resetTransform = function(t) {
  return function(i, r) {
    i === void 0 && (i = 200), r === void 0 && (r = "easeOut"), resetTransformations(t, i, r);
  };
}, centerView = function(t) {
  return function(i, r, e) {
    r === void 0 && (r = 200), e === void 0 && (e = "easeOut");
    var d = t.transformState, C = t.wrapperComponent, T = t.contentComponent;
    if (C && T) {
      var I = getCenterPosition(i || d.scale, C, T);
      animate(t, I, r, e);
    }
  };
}, zoomToElement = function(t) {
  return function(i, r, e, d) {
    e === void 0 && (e = 600), d === void 0 && (d = "easeOut"), handleCancelAnimation(t);
    var C = t.wrapperComponent, T = typeof i == "string" ? document.getElementById(i) : i;
    if (C && isValidZoomNode(T) && T && C.contains(T)) {
      var I = calculateZoomToNode(t, T, r);
      animate(t, I, e, d);
    }
  };
}, getContext = function(t) {
  return {
    instance: t,
    state: t.transformState,
    zoomIn: zoomIn(t),
    zoomOut: zoomOut(t),
    setTransform: setTransform(t),
    resetTransform: resetTransform(t),
    centerView: centerView(t),
    zoomToElement: zoomToElement(t)
  };
}, passiveSupported = !1;
function makePassiveEventOption() {
  try {
    var t = {
      get passive() {
        return passiveSupported = !0, !1;
      }
    };
    return t;
  } catch {
    return passiveSupported = !1, passiveSupported;
  }
}
var isExcludedNode = function(t, i) {
  var r = t.tagName.toUpperCase(), e = i.find(function(C) {
    return C.toUpperCase() === r;
  });
  if (e)
    return !0;
  var d = i.find(function(C) {
    return t.classList.contains(C);
  });
  return !!d;
}, cancelTimeout = function(t) {
  t && clearTimeout(t);
}, getTransformStyles = function(t, i, r) {
  return "translate3d(" + t + "px, " + i + "px, 0) scale(" + r + ")";
}, getCenterPosition = function(t, i, r) {
  var e = r.offsetWidth * t, d = r.offsetHeight * t, C = (i.offsetWidth - e) / 2, T = (i.offsetHeight - d) / 2;
  return {
    scale: t,
    positionX: C,
    positionY: T
  };
}, isWheelAllowed = function(t, i) {
  var r = t.setup.wheel, e = r.disabled, d = r.wheelDisabled, C = r.touchPadDisabled, T = r.excluded, I = t.isInitialized, x = t.isPanning, m = i.target, S = I && !x && !e && m;
  if (!S || d && !i.ctrlKey || C && i.ctrlKey)
    return !1;
  var R = isExcludedNode(m, T);
  return !R;
};
function getDelta(t, i) {
  var r = t ? t.deltaY < 0 ? 1 : -1 : 0, e = checkIsNumber(i, r);
  return e;
}
function getMousePosition(t, i, r) {
  var e = i.getBoundingClientRect(), d = 0, C = 0;
  if ("clientX" in t)
    d = (t.clientX - e.left) / r, C = (t.clientY - e.top) / r;
  else {
    var T = t.touches[0];
    d = (T.clientX - e.left) / r, C = (T.clientY - e.top) / r;
  }
  return (isNaN(d) || isNaN(C)) && console.error("No mouse or touch offset found"), {
    x: d,
    y: C
  };
}
var handleCalculateWheelZoom = function(t, i, r, e, d) {
  var C = t.transformState.scale, T = t.wrapperComponent, I = t.setup, x = I.maxScale, m = I.minScale, S = I.zoomAnimation, R = S.size, A = S.disabled;
  if (!T)
    throw new Error("Wrapper is not mounted");
  var P = C + i * (C - C * r) * r;
  if (d)
    return P;
  var u = e ? !1 : !A, n = checkZoomBounds(roundNumber(P, 3), m, x, R, u);
  return n;
}, handleWheelZoomStop = function(t, i) {
  var r = t.previousWheelEvent, e = t.transformState.scale, d = t.setup, C = d.maxScale, T = d.minScale;
  return r ? e < C || e > T || Math.sign(r.deltaY) !== Math.sign(i.deltaY) || r.deltaY > 0 && r.deltaY < i.deltaY || r.deltaY < 0 && r.deltaY > i.deltaY || Math.sign(r.deltaY) !== Math.sign(i.deltaY) : !1;
}, isPinchStartAllowed = function(t, i) {
  var r = t.setup.pinch, e = r.disabled, d = r.excluded, C = t.isInitialized, T = i.target, I = C && !e && T;
  if (!I)
    return !1;
  var x = isExcludedNode(T, d);
  return !x;
}, isPinchAllowed = function(t) {
  var i = t.setup.pinch.disabled, r = t.isInitialized, e = t.pinchStartDistance, d = r && !i && e;
  return !!d;
}, calculateTouchMidPoint = function(t, i, r) {
  var e = r.getBoundingClientRect(), d = t.touches, C = roundNumber(d[0].clientX - e.left, 5), T = roundNumber(d[0].clientY - e.top, 5), I = roundNumber(d[1].clientX - e.left, 5), x = roundNumber(d[1].clientY - e.top, 5);
  return {
    x: (C + I) / 2 / i,
    y: (T + x) / 2 / i
  };
}, getTouchDistance = function(t) {
  return Math.sqrt(Math.pow(t.touches[0].pageX - t.touches[1].pageX, 2) + Math.pow(t.touches[0].pageY - t.touches[1].pageY, 2));
}, calculatePinchZoom = function(t, i) {
  var r = t.pinchStartScale, e = t.pinchStartDistance, d = t.setup, C = d.maxScale, T = d.minScale, I = d.zoomAnimation, x = I.size, m = I.disabled;
  if (!r || e === null || !i)
    throw new Error("Pinch touches distance was not provided");
  if (i < 0)
    return t.transformState.scale;
  var S = i / e, R = S * r;
  return checkZoomBounds(roundNumber(R, 2), T, C, x, !m);
}, wheelStopEventTime = 160, wheelAnimationTime = 100, handleWheelStart = function(t, i) {
  var r = t.props, e = r.onWheelStart, d = r.onZoomStart;
  t.wheelStopEventTimer || (handleCancelAnimation(t), handleCallback(getContext(t), i, e), handleCallback(getContext(t), i, d));
}, handleWheelZoom = function(t, i) {
  var r = t.props, e = r.onWheel, d = r.onZoom, C = t.contentComponent, T = t.setup, I = t.transformState, x = I.scale, m = T.limitToBounds, S = T.centerZoomedOut, R = T.zoomAnimation, A = T.wheel, P = R.size, u = R.disabled, n = A.step;
  if (!C)
    throw new Error("Component not mounted");
  i.preventDefault(), i.stopPropagation();
  var a = getDelta(i, null), l = handleCalculateWheelZoom(t, a, n, !i.ctrlKey);
  if (x !== l) {
    var F = handleCalculateBounds(t, l), y = getMousePosition(i, C, x), g = u || P === 0 || S, o = m && g, h = handleCalculateZoomPositions(t, y.x, y.y, l, F, o), v = h.x, O = h.y;
    t.previousWheelEvent = i, t.setTransformState(l, v, O), handleCallback(getContext(t), i, e), handleCallback(getContext(t), i, d);
  }
}, handleWheelStop = function(t, i) {
  var r = t.props, e = r.onWheelStop, d = r.onZoomStop;
  cancelTimeout(t.wheelAnimationTimer), t.wheelAnimationTimer = setTimeout(function() {
    !t.mounted || (handleAlignToScaleBounds(t, i.x, i.y), t.wheelAnimationTimer = null);
  }, wheelAnimationTime);
  var C = handleWheelZoomStop(t, i);
  C && (cancelTimeout(t.wheelStopEventTimer), t.wheelStopEventTimer = setTimeout(function() {
    !t.mounted || (t.wheelStopEventTimer = null, handleCallback(getContext(t), i, e), handleCallback(getContext(t), i, d));
  }, wheelStopEventTime));
}, handlePinchStart = function(t, i) {
  var r = getTouchDistance(i);
  t.pinchStartDistance = r, t.lastDistance = r, t.pinchStartScale = t.transformState.scale, t.isPanning = !1, handleCancelAnimation(t);
}, handlePinchZoom = function(t, i) {
  var r = t.contentComponent, e = t.pinchStartDistance, d = t.transformState.scale, C = t.setup, T = C.limitToBounds, I = C.centerZoomedOut, x = C.zoomAnimation, m = x.disabled, S = x.size;
  if (!(e === null || !r)) {
    var R = calculateTouchMidPoint(i, d, r);
    if (!(!isFinite(R.x) || !isFinite(R.y))) {
      var A = getTouchDistance(i), P = calculatePinchZoom(t, A);
      if (P !== d) {
        var u = handleCalculateBounds(t, P), n = m || S === 0 || I, a = T && n, l = handleCalculateZoomPositions(t, R.x, R.y, P, u, a), F = l.x, y = l.y;
        t.pinchMidpoint = R, t.lastDistance = A, t.setTransformState(P, F, y);
      }
    }
  }
}, handlePinchStop = function(t) {
  var i = t.pinchMidpoint;
  t.velocity = null, t.lastDistance = null, t.pinchMidpoint = null, t.pinchStartScale = null, t.pinchStartDistance = null, handleAlignToScaleBounds(t, i == null ? void 0 : i.x, i == null ? void 0 : i.y);
};
function handleDoubleClick(t, i) {
  var r = t.setup.doubleClick, e = r.disabled, d = r.mode, C = r.step, T = r.animationTime, I = r.animationType;
  if (!e) {
    if (d === "reset")
      return resetTransformations(t, T, I);
    var x = t.transformState.scale, m = t.contentComponent;
    if (!m)
      return console.error("No ContentComponent found");
    var S = d === "zoomOut" ? -1 : 1, R = handleCalculateButtonZoom(t, S, C), A = getMousePosition(i, m, x), P = handleZoomToPoint(t, R, A.x, A.y);
    if (!P)
      return console.error("Error during zoom event. New transformation state was not calculated.");
    animate(t, P, T, I);
  }
}
var isDoubleClickAllowed = function(t, i) {
  var r = t.isInitialized, e = t.setup, d = t.wrapperComponent, C = e.doubleClick, T = C.disabled, I = C.excluded, x = i.target, m = d == null ? void 0 : d.contains(x), S = r && x && m && !T;
  if (!S)
    return !1;
  var R = isExcludedNode(x, I);
  return !(R || !S);
}, Context = React.createContext(contextInitialState), TransformContext = function(t) {
  __extends(i, t);
  function i() {
    var r = t !== null && t.apply(this, arguments) || this;
    return r.mounted = !0, r.transformState = createState(r.props), r.setup = createSetup(r.props), r.wrapperComponent = null, r.contentComponent = null, r.isInitialized = !1, r.bounds = null, r.previousWheelEvent = null, r.wheelStopEventTimer = null, r.wheelAnimationTimer = null, r.isPanning = !1, r.startCoords = null, r.lastTouch = null, r.distance = null, r.lastDistance = null, r.pinchStartDistance = null, r.pinchStartScale = null, r.pinchMidpoint = null, r.velocity = null, r.velocityTime = null, r.lastMousePosition = null, r.animate = !1, r.animation = null, r.maxBounds = null, r.pressedKeys = {}, r.handleInitializeWrapperEvents = function(e) {
      var d = makePassiveEventOption();
      e.addEventListener("wheel", r.onWheelZoom, d), e.addEventListener("dblclick", r.onDoubleClick, d), e.addEventListener("touchstart", r.onTouchPanningStart, d), e.addEventListener("touchmove", r.onTouchPanning, d), e.addEventListener("touchend", r.onTouchPanningStop, d);
    }, r.handleInitialize = function() {
      var e = r.setup.centerOnInit;
      r.applyTransformation(), r.forceUpdate(), e && (setTimeout(function() {
        r.mounted && r.setCenter();
      }, 50), setTimeout(function() {
        r.mounted && r.setCenter();
      }, 100), setTimeout(function() {
        r.mounted && r.setCenter();
      }, 200));
    }, r.onWheelZoom = function(e) {
      var d = r.setup.disabled;
      if (!d) {
        var C = isWheelAllowed(r, e);
        if (!!C) {
          var T = r.isPressingKeys(r.setup.wheel.activationKeys);
          !T || (handleWheelStart(r, e), handleWheelZoom(r, e), handleWheelStop(r, e));
        }
      }
    }, r.onPanningStart = function(e) {
      var d = r.setup.disabled, C = r.props.onPanningStart;
      if (!d) {
        var T = isPanningStartAllowed(r, e);
        if (!!T) {
          var I = r.isPressingKeys(r.setup.panning.activationKeys);
          !I || (e.preventDefault(), e.stopPropagation(), handleCancelAnimation(r), handlePanningStart(r, e), handleCallback(getContext(r), e, C));
        }
      }
    }, r.onPanning = function(e) {
      var d = r.setup.disabled, C = r.props.onPanning;
      if (!d) {
        var T = isPanningAllowed(r);
        if (!!T) {
          var I = r.isPressingKeys(r.setup.panning.activationKeys);
          !I || (e.preventDefault(), e.stopPropagation(), handlePanning(r, e.clientX, e.clientY), handleCallback(getContext(r), e, C));
        }
      }
    }, r.onPanningStop = function(e) {
      var d = r.props.onPanningStop;
      r.isPanning && (handlePanningEnd(r), handleCallback(getContext(r), e, d));
    }, r.onPinchStart = function(e) {
      var d = r.setup.disabled, C = r.props, T = C.onPinchingStart, I = C.onZoomStart;
      if (!d) {
        var x = isPinchStartAllowed(r, e);
        !x || (handlePinchStart(r, e), handleCancelAnimation(r), handleCallback(getContext(r), e, T), handleCallback(getContext(r), e, I));
      }
    }, r.onPinch = function(e) {
      var d = r.setup.disabled, C = r.props, T = C.onPinching, I = C.onZoom;
      if (!d) {
        var x = isPinchAllowed(r);
        !x || (e.preventDefault(), e.stopPropagation(), handlePinchZoom(r, e), handleCallback(getContext(r), e, T), handleCallback(getContext(r), e, I));
      }
    }, r.onPinchStop = function(e) {
      var d = r.props, C = d.onPinchingStop, T = d.onZoomStop;
      r.pinchStartScale && (handlePinchStop(r), handleCallback(getContext(r), e, C), handleCallback(getContext(r), e, T));
    }, r.onTouchPanningStart = function(e) {
      var d = r.setup.disabled, C = r.props.onPanningStart;
      if (!d) {
        var T = isPanningStartAllowed(r, e);
        if (!!T) {
          var I = r.lastTouch && +new Date() - r.lastTouch < 200;
          if (I && e.touches.length === 1)
            r.onDoubleClick(e);
          else {
            r.lastTouch = +new Date(), handleCancelAnimation(r);
            var x = e.touches, m = x.length === 1, S = x.length === 2;
            m && (handleCancelAnimation(r), handlePanningStart(r, e), handleCallback(getContext(r), e, C)), S && r.onPinchStart(e);
          }
        }
      }
    }, r.onTouchPanning = function(e) {
      var d = r.setup.disabled, C = r.props.onPanning;
      if (r.isPanning && e.touches.length === 1) {
        if (d)
          return;
        var T = isPanningAllowed(r);
        if (!T)
          return;
        e.preventDefault(), e.stopPropagation();
        var I = e.touches[0];
        handlePanning(r, I.clientX, I.clientY), handleCallback(getContext(r), e, C);
      } else
        e.touches.length > 1 && r.onPinch(e);
    }, r.onTouchPanningStop = function(e) {
      r.onPanningStop(e), r.onPinchStop(e);
    }, r.onDoubleClick = function(e) {
      var d = r.setup.disabled;
      if (!d) {
        var C = isDoubleClickAllowed(r, e);
        !C || handleDoubleClick(r, e);
      }
    }, r.clearPanning = function(e) {
      r.isPanning && r.onPanningStop(e);
    }, r.setKeyPressed = function(e) {
      r.pressedKeys[e.key] = !0;
    }, r.setKeyUnPressed = function(e) {
      r.pressedKeys[e.key] = !1;
    }, r.isPressingKeys = function(e) {
      return e.length ? Boolean(e.find(function(d) {
        return r.pressedKeys[d];
      })) : !0;
    }, r.setComponents = function(e, d) {
      r.wrapperComponent = e, r.contentComponent = d, handleCalculateBounds(r, r.transformState.scale), r.handleInitializeWrapperEvents(e), r.handleInitialize(), r.handleRef(), r.isInitialized = !0, handleCallback(getContext(r), void 0, r.props.onInit);
    }, r.setTransformState = function(e, d, C) {
      !isNaN(e) && !isNaN(d) && !isNaN(C) ? (e !== r.transformState.scale && (r.transformState.previousScale = r.transformState.scale, r.transformState.scale = e), r.transformState.positionX = d, r.transformState.positionY = C, r.applyTransformation()) : console.error("Detected NaN set state values");
    }, r.setCenter = function() {
      if (r.wrapperComponent && r.contentComponent) {
        var e = getCenterPosition(r.transformState.scale, r.wrapperComponent, r.contentComponent);
        r.setTransformState(e.scale, e.positionX, e.positionY);
      }
    }, r.applyTransformation = function() {
      if (!(!r.mounted || !r.contentComponent)) {
        var e = r.transformState, d = e.scale, C = e.positionX, T = e.positionY, I = getTransformStyles(C, T, d);
        r.contentComponent.style.transform = I, r.handleRef();
      }
    }, r.handleRef = function() {
      r.props.setRef(getContext(r));
    }, r;
  }
  return i.prototype.componentDidMount = function() {
    var r = makePassiveEventOption();
    window.addEventListener("mousedown", this.onPanningStart, r), window.addEventListener("mousemove", this.onPanning, r), window.addEventListener("mouseup", this.onPanningStop, r), document.addEventListener("mouseleave", this.clearPanning, r), window.addEventListener("keyup", this.setKeyUnPressed, r), window.addEventListener("keydown", this.setKeyPressed, r), this.handleRef();
  }, i.prototype.componentWillUnmount = function() {
    var r = makePassiveEventOption();
    window.removeEventListener("mousedown", this.onPanningStart, r), window.removeEventListener("mousemove", this.onPanning, r), window.removeEventListener("mouseup", this.onPanningStop, r), window.removeEventListener("keyup", this.setKeyUnPressed, r), window.removeEventListener("keydown", this.setKeyPressed, r), handleCancelAnimation(this);
  }, i.prototype.componentDidUpdate = function(r) {
    r !== this.props && (handleCalculateBounds(this, this.transformState.scale), this.setup = createSetup(this.props));
  }, i.prototype.render = function() {
    var r = getContext(this), e = this.props.children, d = typeof e == "function" ? e(r) : e;
    return React.createElement(Context.Provider, { value: __assign(__assign({}, this.transformState), { setComponents: this.setComponents, contextInstance: this }) }, d);
  }, i;
}(Component), TransformWrapper = React.forwardRef(function(t, i) {
  var r = useState(null), e = r[0], d = r[1];
  return useImperativeHandle(i, function() {
    return e;
  }, [e]), React.createElement(TransformContext, __assign({}, t, { setRef: d }));
});
function styleInject(t, i) {
  i === void 0 && (i = {});
  var r = i.insertAt;
  if (!(!t || typeof document > "u")) {
    var e = document.head || document.getElementsByTagName("head")[0], d = document.createElement("style");
    d.type = "text/css", r === "top" && e.firstChild ? e.insertBefore(d, e.firstChild) : e.appendChild(d), d.styleSheet ? d.styleSheet.cssText = t : d.appendChild(document.createTextNode(t));
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
var TransformComponent = function(t) {
  var i = t.children, r = t.wrapperClass, e = r === void 0 ? "" : r, d = t.contentClass, C = d === void 0 ? "" : d, T = t.wrapperStyle, I = t.contentStyle, x = useContext(Context).setComponents, m = useRef(null), S = useRef(null);
  return useEffect(function() {
    var R = m.current, A = S.current;
    R !== null && A !== null && x && x(R, A);
  }, []), React.createElement(
    "div",
    { ref: m, className: "react-transform-wrapper " + styles.wrapper + " " + e, style: T },
    React.createElement("div", { ref: S, className: "react-transform-component " + styles.content + " " + C, style: I }, i)
  );
};
const DocsRendererMainContainer = styled.div.withConfig({
  displayName: "DocsRendererMainContainer",
  componentId: "sc-1d8sv0v-0"
})(["align-content:center;display:flex;height:inherit;justify-content:center;position:relative;width:inherit;.react-transform-wrapper{height:unset !important;width:inherit;}"]), StyledScrollContainer = styled(TransformWrapper).withConfig({
  displayName: "StyledScrollContainer",
  componentId: "sc-1d8sv0v-1"
})([""]), StyledTransformComponent = styled(TransformComponent).withConfig({
  displayName: "StyledTransformComponent",
  componentId: "sc-1d8sv0v-2"
})(["height:inherit;width:inherit;"]), StyledDocument = styled.canvas.withConfig({
  displayName: "StyledDocument",
  componentId: "sc-1d8sv0v-3"
})([""]), StyledImage = styled.img.withConfig({
  displayName: "StyledImage",
  componentId: "sc-1d8sv0v-4"
})([""]), DocumentViewer = ({
  file: t,
  ZoomConfig: i = defaultZoomConfig
}) => {
  const {
    controll: {
      setCurrentPage: r,
      setPageCount: e,
      setScale: d
    },
    state: {
      currentPage: C,
      pageCount: T,
      scale: I
    }
  } = useDocumentState(i), {
    maxScale: x,
    minScale: m,
    step: S,
    initialScale: R
  } = i, A = useRef(null), P = useRef(null), {
    documentBase64: u,
    contentType: n
  } = useDocumentConverter(t);
  return usePdfJsRenderer({
    canvasRef: P,
    file: u,
    page: C,
    scale: I,
    onPageCount: e
  }), useEffect(() => {
    A.current && A.current.setAttribute("height", `${I * 82}%`);
  }, [I]), /* @__PURE__ */ React.createElement(DocsRendererMainContainer, null, /* @__PURE__ */ React.createElement(StyledScrollContainer, {
    initialScale: R,
    initialPositionX: 0,
    initialPositionY: 0,
    minScale: m,
    maxScale: x,
    wheel: {
      step: i.step
    },
    pinch: {
      step: i.step
    }
  }, ({
    zoomIn: a,
    zoomOut: l,
    state: {
      scale: F
    }
  }) => (d(F), /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(StyledTransformComponent, null, n === ContentType.PDF ? /* @__PURE__ */ React.createElement(StyledDocument, {
    ref: P
  }) : /* @__PURE__ */ React.createElement(StyledImage, {
    ref: A,
    src: u
  })), /* @__PURE__ */ React.createElement(DefaultDocumentToolbar, {
    currentPage: C,
    pageCount: T,
    onPageChange: r,
    onZoomIn: () => a(i.step),
    onZoomOut: () => l(i.step)
  })))));
};
var ContentType = /* @__PURE__ */ ((t) => (t.PDF = "application/pdf", t.PNG = "IMAGE/PNG", t.JPG = "IMAGE/JPG", t))(ContentType || {});
const useDocumentConverter = (t) => {
  const [i, r] = useState();
  async function e(d) {
    return new Promise((C, T) => {
      const I = new FileReader();
      I.onloadend = () => {
        C(I.result);
      }, I.readAsDataURL(d);
    });
  }
  return useEffect(() => {
    t instanceof Blob && e(t).then((d) => {
      r(String(d));
    });
  }, []), t instanceof Blob ? {
    documentBase64: i,
    contentType: t.type
  } : {
    documentBase64: t,
    contentType: ContentType.PDF
  };
}, defaultZoomConfig = {
  step: 0.1,
  maxScale: 5,
  minScale: 1,
  initialScale: 1.2
}, useDocumentState = (t = defaultZoomConfig) => {
  const [i, r] = useState(0), [e, d] = useState(1), [C, T] = useState(t.minScale);
  return {
    controll: {
      setCurrentPage: d,
      setPageCount: r,
      setScale: T
    },
    state: {
      pageCount: i,
      scale: C,
      currentPage: e
    }
  };
};
function getAugmentedNamespace(t) {
  var i = t.default;
  if (typeof i == "function") {
    var r = function() {
      return i.apply(this, arguments);
    };
    r.prototype = i.prototype;
  } else
    r = {};
  return Object.defineProperty(r, "__esModule", {
    value: !0
  }), Object.keys(t).forEach(function(e) {
    var d = Object.getOwnPropertyDescriptor(t, e);
    Object.defineProperty(r, e, d.get ? d : {
      enumerable: !0,
      get: function() {
        return t[e];
      }
    });
  }), r;
}
function commonjsRequire(t) {
  throw new Error('Could not dynamically require "' + t + '". Please configure the dynamicRequireTargets or/and ignoreDynamicRequires option of @rollup/plugin-commonjs appropriately for this require call to work.');
}
var pdf = { exports: {} };
const __viteBrowserExternal = {}, __viteBrowserExternal$1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: __viteBrowserExternal
}, Symbol.toStringTag, { value: "Module" })), require$$5 = /* @__PURE__ */ getAugmentedNamespace(__viteBrowserExternal$1);
(function(module, exports) {
  (function(i, r) {
    module.exports = r();
  })(globalThis, () => (() => {
    var __webpack_modules__ = [
      ,
      (t, i, r) => {
        Object.defineProperty(i, "__esModule", {
          value: !0
        }), i.VerbosityLevel = i.Util = i.UnknownErrorException = i.UnexpectedResponseException = i.UNSUPPORTED_FEATURES = i.TextRenderingMode = i.StreamType = i.RenderingIntentFlag = i.PermissionFlag = i.PasswordResponses = i.PasswordException = i.PageActionEventType = i.OPS = i.MissingPDFException = i.LINE_FACTOR = i.LINE_DESCENT_FACTOR = i.InvalidPDFException = i.ImageKind = i.IDENTITY_MATRIX = i.FormatError = i.FontType = i.FeatureTest = i.FONT_IDENTITY_MATRIX = i.DocumentActionEventType = i.CMapCompressionType = i.BaseException = i.AnnotationType = i.AnnotationStateModelType = i.AnnotationReviewState = i.AnnotationReplyType = i.AnnotationMode = i.AnnotationMarkedState = i.AnnotationFlag = i.AnnotationFieldFlag = i.AnnotationEditorType = i.AnnotationEditorPrefix = i.AnnotationEditorParamsType = i.AnnotationBorderStyleType = i.AnnotationActionEventType = i.AbortException = void 0, i.arrayByteLength = tt, i.arraysToBytes = K, i.assert = bt, i.bytesToString = $, i.createPromiseCapability = ht, i.createValidAbsoluteUrl = b, i.escapeString = St, i.getModificationDate = nt, i.getVerbosityLevel = st, i.info = ot, i.isArrayBuffer = Vt, i.isArrayEqual = Dt, i.isAscii = kt, i.objectFromMap = pt, i.objectSize = ft, i.setVerbosityLevel = W, i.shadow = f, i.string32 = et, i.stringToBytes = q, i.stringToPDFString = wt, i.stringToUTF16BEString = Ft, i.stringToUTF8String = Bt, i.unreachable = mt, i.utf8StringToString = Pt, i.warn = ct, r(2);
        const e = [1, 0, 0, 1, 0, 0];
        i.IDENTITY_MATRIX = e;
        const d = [1e-3, 0, 0, 1e-3, 0, 0];
        i.FONT_IDENTITY_MATRIX = d;
        const C = 1.35;
        i.LINE_FACTOR = C;
        const T = 0.35;
        i.LINE_DESCENT_FACTOR = T;
        const I = {
          ANY: 1,
          DISPLAY: 2,
          PRINT: 4,
          ANNOTATIONS_FORMS: 16,
          ANNOTATIONS_STORAGE: 32,
          ANNOTATIONS_DISABLE: 64,
          OPLIST: 256
        };
        i.RenderingIntentFlag = I;
        const x = {
          DISABLE: 0,
          ENABLE: 1,
          ENABLE_FORMS: 2,
          ENABLE_STORAGE: 3
        };
        i.AnnotationMode = x;
        const m = "pdfjs_internal_editor_";
        i.AnnotationEditorPrefix = m;
        const S = {
          DISABLE: -1,
          NONE: 0,
          FREETEXT: 3,
          INK: 15
        };
        i.AnnotationEditorType = S;
        const R = {
          FREETEXT_SIZE: 1,
          FREETEXT_COLOR: 2,
          FREETEXT_OPACITY: 3,
          INK_COLOR: 11,
          INK_THICKNESS: 12,
          INK_OPACITY: 13
        };
        i.AnnotationEditorParamsType = R;
        const A = {
          PRINT: 4,
          MODIFY_CONTENTS: 8,
          COPY: 16,
          MODIFY_ANNOTATIONS: 32,
          FILL_INTERACTIVE_FORMS: 256,
          COPY_FOR_ACCESSIBILITY: 512,
          ASSEMBLE: 1024,
          PRINT_HIGH_QUALITY: 2048
        };
        i.PermissionFlag = A;
        const P = {
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
        i.TextRenderingMode = P;
        const u = {
          GRAYSCALE_1BPP: 1,
          RGB_24BPP: 2,
          RGBA_32BPP: 3
        };
        i.ImageKind = u;
        const n = {
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
        i.AnnotationType = n;
        const a = {
          MARKED: "Marked",
          REVIEW: "Review"
        };
        i.AnnotationStateModelType = a;
        const l = {
          MARKED: "Marked",
          UNMARKED: "Unmarked"
        };
        i.AnnotationMarkedState = l;
        const F = {
          ACCEPTED: "Accepted",
          REJECTED: "Rejected",
          CANCELLED: "Cancelled",
          COMPLETED: "Completed",
          NONE: "None"
        };
        i.AnnotationReviewState = F;
        const y = {
          GROUP: "Group",
          REPLY: "R"
        };
        i.AnnotationReplyType = y;
        const g = {
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
        i.AnnotationFlag = g;
        const o = {
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
        i.AnnotationFieldFlag = o;
        const h = {
          SOLID: 1,
          DASHED: 2,
          BEVELED: 3,
          INSET: 4,
          UNDERLINE: 5
        };
        i.AnnotationBorderStyleType = h;
        const v = {
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
        i.AnnotationActionEventType = v;
        const O = {
          WC: "WillClose",
          WS: "WillSave",
          DS: "DidSave",
          WP: "WillPrint",
          DP: "DidPrint"
        };
        i.DocumentActionEventType = O;
        const D = {
          O: "PageOpen",
          C: "PageClose"
        };
        i.PageActionEventType = D;
        const L = {
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
        i.StreamType = L;
        const U = {
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
        i.FontType = U;
        const J = {
          ERRORS: 0,
          WARNINGS: 1,
          INFOS: 5
        };
        i.VerbosityLevel = J;
        const V = {
          NONE: 0,
          BINARY: 1,
          STREAM: 2
        };
        i.CMapCompressionType = V;
        const N = {
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
        i.OPS = N;
        const G = {
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
        i.UNSUPPORTED_FEATURES = G;
        const k = {
          NEED_PASSWORD: 1,
          INCORRECT_PASSWORD: 2
        };
        i.PasswordResponses = k;
        let z = J.WARNINGS;
        function W(Q) {
          Number.isInteger(Q) && (z = Q);
        }
        function st() {
          return z;
        }
        function ot(Q) {
          z >= J.INFOS && console.log(`Info: ${Q}`);
        }
        function ct(Q) {
          z >= J.WARNINGS && console.log(`Warning: ${Q}`);
        }
        function mt(Q) {
          throw new Error(Q);
        }
        function bt(Q, H) {
          Q || mt(H);
        }
        function B(Q) {
          if (!Q)
            return !1;
          switch (Q.protocol) {
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
        function b(Q, H = null, Y = null) {
          if (!Q)
            return null;
          try {
            if (Y && typeof Q == "string") {
              if (Y.addDefaultProtocol && Q.startsWith("www.")) {
                const gt = Q.match(/\./g);
                gt && gt.length >= 2 && (Q = `http://${Q}`);
              }
              if (Y.tryConvertEncoding)
                try {
                  Q = Bt(Q);
                } catch {
                }
            }
            const dt = H ? new URL(Q, H) : new URL(Q);
            if (B(dt))
              return dt;
          } catch {
          }
          return null;
        }
        function f(Q, H, Y) {
          return Object.defineProperty(Q, H, {
            value: Y,
            enumerable: !0,
            configurable: !0,
            writable: !1
          }), Y;
        }
        const w = function() {
          function H(Y, dt) {
            this.constructor === H && mt("Cannot initialize BaseException."), this.message = Y, this.name = dt;
          }
          return H.prototype = new Error(), H.constructor = H, H;
        }();
        i.BaseException = w;
        class s extends w {
          constructor(H, Y) {
            super(H, "PasswordException"), this.code = Y;
          }
        }
        i.PasswordException = s;
        class c extends w {
          constructor(H, Y) {
            super(H, "UnknownErrorException"), this.details = Y;
          }
        }
        i.UnknownErrorException = c;
        class p extends w {
          constructor(H) {
            super(H, "InvalidPDFException");
          }
        }
        i.InvalidPDFException = p;
        class _ extends w {
          constructor(H) {
            super(H, "MissingPDFException");
          }
        }
        i.MissingPDFException = _;
        class E extends w {
          constructor(H, Y) {
            super(H, "UnexpectedResponseException"), this.status = Y;
          }
        }
        i.UnexpectedResponseException = E;
        class j extends w {
          constructor(H) {
            super(H, "FormatError");
          }
        }
        i.FormatError = j;
        class X extends w {
          constructor(H) {
            super(H, "AbortException");
          }
        }
        i.AbortException = X;
        function $(Q) {
          (typeof Q != "object" || Q === null || Q.length === void 0) && mt("Invalid argument for bytesToString");
          const H = Q.length, Y = 8192;
          if (H < Y)
            return String.fromCharCode.apply(null, Q);
          const dt = [];
          for (let gt = 0; gt < H; gt += Y) {
            const _t = Math.min(gt + Y, H), Ct = Q.subarray(gt, _t);
            dt.push(String.fromCharCode.apply(null, Ct));
          }
          return dt.join("");
        }
        function q(Q) {
          typeof Q != "string" && mt("Invalid argument for stringToBytes");
          const H = Q.length, Y = new Uint8Array(H);
          for (let dt = 0; dt < H; ++dt)
            Y[dt] = Q.charCodeAt(dt) & 255;
          return Y;
        }
        function tt(Q) {
          if (Q.length !== void 0)
            return Q.length;
          if (Q.byteLength !== void 0)
            return Q.byteLength;
          mt("Invalid argument for arrayByteLength");
        }
        function K(Q) {
          const H = Q.length;
          if (H === 1 && Q[0] instanceof Uint8Array)
            return Q[0];
          let Y = 0;
          for (let _t = 0; _t < H; _t++)
            Y += tt(Q[_t]);
          let dt = 0;
          const gt = new Uint8Array(Y);
          for (let _t = 0; _t < H; _t++) {
            let Ct = Q[_t];
            Ct instanceof Uint8Array || (typeof Ct == "string" ? Ct = q(Ct) : Ct = new Uint8Array(Ct));
            const Tt = Ct.byteLength;
            gt.set(Ct, dt), dt += Tt;
          }
          return gt;
        }
        function et(Q) {
          return String.fromCharCode(Q >> 24 & 255, Q >> 16 & 255, Q >> 8 & 255, Q & 255);
        }
        function ft(Q) {
          return Object.keys(Q).length;
        }
        function pt(Q) {
          const H = /* @__PURE__ */ Object.create(null);
          for (const [Y, dt] of Q)
            H[Y] = dt;
          return H;
        }
        function vt() {
          const Q = new Uint8Array(4);
          return Q[0] = 1, new Uint32Array(Q.buffer, 0, 1)[0] === 1;
        }
        function rt() {
          try {
            return new Function(""), !0;
          } catch {
            return !1;
          }
        }
        class yt {
          static get isLittleEndian() {
            return f(this, "isLittleEndian", vt());
          }
          static get isEvalSupported() {
            return f(this, "isEvalSupported", rt());
          }
          static get isOffscreenCanvasSupported() {
            return f(this, "isOffscreenCanvasSupported", typeof OffscreenCanvas < "u");
          }
        }
        i.FeatureTest = yt;
        const Z = [...Array(256).keys()].map((Q) => Q.toString(16).padStart(2, "0"));
        class it {
          static makeHexColor(H, Y, dt) {
            return `#${Z[H]}${Z[Y]}${Z[dt]}`;
          }
          static scaleMinMax(H, Y) {
            let dt;
            H[0] ? (H[0] < 0 && (dt = Y[0], Y[0] = Y[1], Y[1] = dt), Y[0] *= H[0], Y[1] *= H[0], H[3] < 0 && (dt = Y[2], Y[2] = Y[3], Y[3] = dt), Y[2] *= H[3], Y[3] *= H[3]) : (dt = Y[0], Y[0] = Y[2], Y[2] = dt, dt = Y[1], Y[1] = Y[3], Y[3] = dt, H[1] < 0 && (dt = Y[2], Y[2] = Y[3], Y[3] = dt), Y[2] *= H[1], Y[3] *= H[1], H[2] < 0 && (dt = Y[0], Y[0] = Y[1], Y[1] = dt), Y[0] *= H[2], Y[1] *= H[2]), Y[0] += H[4], Y[1] += H[4], Y[2] += H[5], Y[3] += H[5];
          }
          static transform(H, Y) {
            return [H[0] * Y[0] + H[2] * Y[1], H[1] * Y[0] + H[3] * Y[1], H[0] * Y[2] + H[2] * Y[3], H[1] * Y[2] + H[3] * Y[3], H[0] * Y[4] + H[2] * Y[5] + H[4], H[1] * Y[4] + H[3] * Y[5] + H[5]];
          }
          static applyTransform(H, Y) {
            const dt = H[0] * Y[0] + H[1] * Y[2] + Y[4], gt = H[0] * Y[1] + H[1] * Y[3] + Y[5];
            return [dt, gt];
          }
          static applyInverseTransform(H, Y) {
            const dt = Y[0] * Y[3] - Y[1] * Y[2], gt = (H[0] * Y[3] - H[1] * Y[2] + Y[2] * Y[5] - Y[4] * Y[3]) / dt, _t = (-H[0] * Y[1] + H[1] * Y[0] + Y[4] * Y[1] - Y[5] * Y[0]) / dt;
            return [gt, _t];
          }
          static getAxialAlignedBoundingBox(H, Y) {
            const dt = it.applyTransform(H, Y), gt = it.applyTransform(H.slice(2, 4), Y), _t = it.applyTransform([H[0], H[3]], Y), Ct = it.applyTransform([H[2], H[1]], Y);
            return [Math.min(dt[0], gt[0], _t[0], Ct[0]), Math.min(dt[1], gt[1], _t[1], Ct[1]), Math.max(dt[0], gt[0], _t[0], Ct[0]), Math.max(dt[1], gt[1], _t[1], Ct[1])];
          }
          static inverseTransform(H) {
            const Y = H[0] * H[3] - H[1] * H[2];
            return [H[3] / Y, -H[1] / Y, -H[2] / Y, H[0] / Y, (H[2] * H[5] - H[4] * H[3]) / Y, (H[4] * H[1] - H[5] * H[0]) / Y];
          }
          static apply3dTransform(H, Y) {
            return [H[0] * Y[0] + H[1] * Y[1] + H[2] * Y[2], H[3] * Y[0] + H[4] * Y[1] + H[5] * Y[2], H[6] * Y[0] + H[7] * Y[1] + H[8] * Y[2]];
          }
          static singularValueDecompose2dScale(H) {
            const Y = [H[0], H[2], H[1], H[3]], dt = H[0] * Y[0] + H[1] * Y[2], gt = H[0] * Y[1] + H[1] * Y[3], _t = H[2] * Y[0] + H[3] * Y[2], Ct = H[2] * Y[1] + H[3] * Y[3], Tt = (dt + Ct) / 2, Mt = Math.sqrt((dt + Ct) ** 2 - 4 * (dt * Ct - _t * gt)) / 2, Rt = Tt + Mt || 1, Et = Tt - Mt || 1;
            return [Math.sqrt(Rt), Math.sqrt(Et)];
          }
          static normalizeRect(H) {
            const Y = H.slice(0);
            return H[0] > H[2] && (Y[0] = H[2], Y[2] = H[0]), H[1] > H[3] && (Y[1] = H[3], Y[3] = H[1]), Y;
          }
          static intersect(H, Y) {
            const dt = Math.max(Math.min(H[0], H[2]), Math.min(Y[0], Y[2])), gt = Math.min(Math.max(H[0], H[2]), Math.max(Y[0], Y[2]));
            if (dt > gt)
              return null;
            const _t = Math.max(Math.min(H[1], H[3]), Math.min(Y[1], Y[3])), Ct = Math.min(Math.max(H[1], H[3]), Math.max(Y[1], Y[3]));
            return _t > Ct ? null : [dt, _t, gt, Ct];
          }
          static bezierBoundingBox(H, Y, dt, gt, _t, Ct, Tt, Mt) {
            const Rt = [], Et = [[], []];
            let Lt, Ot, Ut, xt, Nt, zt, Yt, Gt;
            for (let $t = 0; $t < 2; ++$t) {
              if ($t === 0 ? (Ot = 6 * H - 12 * dt + 6 * _t, Lt = -3 * H + 9 * dt - 9 * _t + 3 * Tt, Ut = 3 * dt - 3 * H) : (Ot = 6 * Y - 12 * gt + 6 * Ct, Lt = -3 * Y + 9 * gt - 9 * Ct + 3 * Mt, Ut = 3 * gt - 3 * Y), Math.abs(Lt) < 1e-12) {
                if (Math.abs(Ot) < 1e-12)
                  continue;
                xt = -Ut / Ot, 0 < xt && xt < 1 && Rt.push(xt);
                continue;
              }
              Yt = Ot * Ot - 4 * Ut * Lt, Gt = Math.sqrt(Yt), !(Yt < 0) && (Nt = (-Ot + Gt) / (2 * Lt), 0 < Nt && Nt < 1 && Rt.push(Nt), zt = (-Ot - Gt) / (2 * Lt), 0 < zt && zt < 1 && Rt.push(zt));
            }
            let Ht = Rt.length, jt;
            const Xt = Ht;
            for (; Ht--; )
              xt = Rt[Ht], jt = 1 - xt, Et[0][Ht] = jt * jt * jt * H + 3 * jt * jt * xt * dt + 3 * jt * xt * xt * _t + xt * xt * xt * Tt, Et[1][Ht] = jt * jt * jt * Y + 3 * jt * jt * xt * gt + 3 * jt * xt * xt * Ct + xt * xt * xt * Mt;
            return Et[0][Xt] = H, Et[1][Xt] = Y, Et[0][Xt + 1] = Tt, Et[1][Xt + 1] = Mt, Et[0].length = Et[1].length = Xt + 2, [Math.min(...Et[0]), Math.min(...Et[1]), Math.max(...Et[0]), Math.max(...Et[1])];
          }
        }
        i.Util = it;
        const At = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 728, 711, 710, 729, 733, 731, 730, 732, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 8226, 8224, 8225, 8230, 8212, 8211, 402, 8260, 8249, 8250, 8722, 8240, 8222, 8220, 8221, 8216, 8217, 8218, 8482, 64257, 64258, 321, 338, 352, 376, 381, 305, 322, 339, 353, 382, 0, 8364];
        function wt(Q) {
          if (Q[0] >= "\xEF") {
            let Y;
            if (Q[0] === "\xFE" && Q[1] === "\xFF" ? Y = "utf-16be" : Q[0] === "\xFF" && Q[1] === "\xFE" ? Y = "utf-16le" : Q[0] === "\xEF" && Q[1] === "\xBB" && Q[2] === "\xBF" && (Y = "utf-8"), Y)
              try {
                const dt = new TextDecoder(Y, {
                  fatal: !0
                }), gt = q(Q);
                return dt.decode(gt);
              } catch (dt) {
                ct(`stringToPDFString: "${dt}".`);
              }
          }
          const H = [];
          for (let Y = 0, dt = Q.length; Y < dt; Y++) {
            const gt = At[Q.charCodeAt(Y)];
            H.push(gt ? String.fromCharCode(gt) : Q.charAt(Y));
          }
          return H.join("");
        }
        function St(Q) {
          return Q.replace(/([()\\\n\r])/g, (H) => H === `
` ? "\\n" : H === "\r" ? "\\r" : `\\${H}`);
        }
        function kt(Q) {
          return /^[\x00-\x7F]*$/.test(Q);
        }
        function Ft(Q) {
          const H = ["\xFE\xFF"];
          for (let Y = 0, dt = Q.length; Y < dt; Y++) {
            const gt = Q.charCodeAt(Y);
            H.push(String.fromCharCode(gt >> 8 & 255), String.fromCharCode(gt & 255));
          }
          return H.join("");
        }
        function Bt(Q) {
          return decodeURIComponent(escape(Q));
        }
        function Pt(Q) {
          return unescape(encodeURIComponent(Q));
        }
        function Vt(Q) {
          return typeof Q == "object" && Q !== null && Q.byteLength !== void 0;
        }
        function Dt(Q, H) {
          if (Q.length !== H.length)
            return !1;
          for (let Y = 0, dt = Q.length; Y < dt; Y++)
            if (Q[Y] !== H[Y])
              return !1;
          return !0;
        }
        function nt(Q = new Date()) {
          return [Q.getUTCFullYear().toString(), (Q.getUTCMonth() + 1).toString().padStart(2, "0"), Q.getUTCDate().toString().padStart(2, "0"), Q.getUTCHours().toString().padStart(2, "0"), Q.getUTCMinutes().toString().padStart(2, "0"), Q.getUTCSeconds().toString().padStart(2, "0")].join("");
        }
        function ht() {
          const Q = /* @__PURE__ */ Object.create(null);
          let H = !1;
          return Object.defineProperty(Q, "settled", {
            get() {
              return H;
            }
          }), Q.promise = new Promise(function(Y, dt) {
            Q.resolve = function(gt) {
              H = !0, Y(gt);
            }, Q.reject = function(gt) {
              H = !0, dt(gt);
            };
          }), Q;
        }
      },
      (t, i, r) => {
        r(3);
      },
      (t, i) => {
        Object.defineProperty(i, "__esModule", {
          value: !0
        }), i.isNodeJS = void 0;
        const r = typeof process == "object" && process + "" == "[object process]" && !process.versions.nw && !(process.versions.electron && process.type && process.type !== "browser");
        i.isNodeJS = r;
      },
      (t, i, r) => {
        Object.defineProperty(i, "__esModule", {
          value: !0
        }), i.StatTimer = i.RenderingCancelledException = i.PixelsPerInch = i.PageViewport = i.PDFDateString = i.DOMStandardFontDataFactory = i.DOMSVGFactory = i.DOMCanvasFactory = i.DOMCMapReaderFactory = void 0, i.binarySearchFirstItem = U, i.deprecated = o, i.getColorValues = L, i.getFilenameFromUrl = a, i.getPdfFilenameFromUrl = l, i.getRGB = D, i.getXfaPageViewport = O, i.isDataScheme = u, i.isPdfFile = n, i.isValidFetchUrl = y, i.loadScript = g;
        var e = r(5), d = r(1);
        const C = "http://www.w3.org/2000/svg", J = class {
        };
        let T = J;
        It(T, "CSS", 96), It(T, "PDF", 72), It(T, "PDF_TO_CSS_UNITS", J.CSS / J.PDF), i.PixelsPerInch = T;
        class I extends e.BaseCanvasFactory {
          constructor({
            ownerDocument: N = globalThis.document
          } = {}) {
            super(), this._document = N;
          }
          _createCanvas(N, G) {
            const k = this._document.createElement("canvas");
            return k.width = N, k.height = G, k;
          }
        }
        i.DOMCanvasFactory = I;
        async function x(V, N = !1) {
          if (y(V, document.baseURI)) {
            const G = await fetch(V);
            if (!G.ok)
              throw new Error(G.statusText);
            return N ? new Uint8Array(await G.arrayBuffer()) : (0, d.stringToBytes)(await G.text());
          }
          return new Promise((G, k) => {
            const z = new XMLHttpRequest();
            z.open("GET", V, !0), N && (z.responseType = "arraybuffer"), z.onreadystatechange = () => {
              if (z.readyState === XMLHttpRequest.DONE) {
                if (z.status === 200 || z.status === 0) {
                  let W;
                  if (N && z.response ? W = new Uint8Array(z.response) : !N && z.responseText && (W = (0, d.stringToBytes)(z.responseText)), W) {
                    G(W);
                    return;
                  }
                }
                k(new Error(z.statusText));
              }
            }, z.send(null);
          });
        }
        class m extends e.BaseCMapReaderFactory {
          _fetchData(N, G) {
            return x(N, this.isCompressed).then((k) => ({
              cMapData: k,
              compressionType: G
            }));
          }
        }
        i.DOMCMapReaderFactory = m;
        class S extends e.BaseStandardFontDataFactory {
          _fetchData(N) {
            return x(N, !0);
          }
        }
        i.DOMStandardFontDataFactory = S;
        class R extends e.BaseSVGFactory {
          _createSVG(N) {
            return document.createElementNS(C, N);
          }
        }
        i.DOMSVGFactory = R;
        class A {
          constructor({
            viewBox: N,
            scale: G,
            rotation: k,
            offsetX: z = 0,
            offsetY: W = 0,
            dontFlip: st = !1
          }) {
            this.viewBox = N, this.scale = G, this.rotation = k, this.offsetX = z, this.offsetY = W;
            const ot = (N[2] + N[0]) / 2, ct = (N[3] + N[1]) / 2;
            let mt, bt, B, b;
            switch (k %= 360, k < 0 && (k += 360), k) {
              case 180:
                mt = -1, bt = 0, B = 0, b = 1;
                break;
              case 90:
                mt = 0, bt = 1, B = 1, b = 0;
                break;
              case 270:
                mt = 0, bt = -1, B = -1, b = 0;
                break;
              case 0:
                mt = 1, bt = 0, B = 0, b = -1;
                break;
              default:
                throw new Error("PageViewport: Invalid rotation, must be a multiple of 90 degrees.");
            }
            st && (B = -B, b = -b);
            let f, w, s, c;
            mt === 0 ? (f = Math.abs(ct - N[1]) * G + z, w = Math.abs(ot - N[0]) * G + W, s = Math.abs(N[3] - N[1]) * G, c = Math.abs(N[2] - N[0]) * G) : (f = Math.abs(ot - N[0]) * G + z, w = Math.abs(ct - N[1]) * G + W, s = Math.abs(N[2] - N[0]) * G, c = Math.abs(N[3] - N[1]) * G), this.transform = [mt * G, bt * G, B * G, b * G, f - mt * G * ot - B * G * ct, w - bt * G * ot - b * G * ct], this.width = s, this.height = c;
          }
          clone({
            scale: N = this.scale,
            rotation: G = this.rotation,
            offsetX: k = this.offsetX,
            offsetY: z = this.offsetY,
            dontFlip: W = !1
          } = {}) {
            return new A({
              viewBox: this.viewBox.slice(),
              scale: N,
              rotation: G,
              offsetX: k,
              offsetY: z,
              dontFlip: W
            });
          }
          convertToViewportPoint(N, G) {
            return d.Util.applyTransform([N, G], this.transform);
          }
          convertToViewportRectangle(N) {
            const G = d.Util.applyTransform([N[0], N[1]], this.transform), k = d.Util.applyTransform([N[2], N[3]], this.transform);
            return [G[0], G[1], k[0], k[1]];
          }
          convertToPdfPoint(N, G) {
            return d.Util.applyInverseTransform([N, G], this.transform);
          }
        }
        i.PageViewport = A;
        class P extends d.BaseException {
          constructor(N, G) {
            super(N, "RenderingCancelledException"), this.type = G;
          }
        }
        i.RenderingCancelledException = P;
        function u(V) {
          const N = V.length;
          let G = 0;
          for (; G < N && V[G].trim() === ""; )
            G++;
          return V.substring(G, G + 5).toLowerCase() === "data:";
        }
        function n(V) {
          return typeof V == "string" && /\.pdf$/i.test(V);
        }
        function a(V) {
          const N = V.indexOf("#"), G = V.indexOf("?"), k = Math.min(N > 0 ? N : V.length, G > 0 ? G : V.length);
          return V.substring(V.lastIndexOf("/", k) + 1, k);
        }
        function l(V, N = "document.pdf") {
          if (typeof V != "string")
            return N;
          if (u(V))
            return (0, d.warn)('getPdfFilenameFromUrl: ignore "data:"-URL for performance reasons.'), N;
          const G = /^(?:(?:[^:]+:)?\/\/[^/]+)?([^?#]*)(\?[^#]*)?(#.*)?$/, k = /[^/?#=]+\.pdf\b(?!.*\.pdf\b)/i, z = G.exec(V);
          let W = k.exec(z[1]) || k.exec(z[2]) || k.exec(z[3]);
          if (W && (W = W[0], W.includes("%")))
            try {
              W = k.exec(decodeURIComponent(W))[0];
            } catch {
            }
          return W || N;
        }
        class F {
          constructor() {
            this.started = /* @__PURE__ */ Object.create(null), this.times = [];
          }
          time(N) {
            N in this.started && (0, d.warn)(`Timer is already running for ${N}`), this.started[N] = Date.now();
          }
          timeEnd(N) {
            N in this.started || (0, d.warn)(`Timer has not been started for ${N}`), this.times.push({
              name: N,
              start: this.started[N],
              end: Date.now()
            }), delete this.started[N];
          }
          toString() {
            const N = [];
            let G = 0;
            for (const k of this.times) {
              const z = k.name;
              z.length > G && (G = z.length);
            }
            for (const k of this.times) {
              const z = k.end - k.start;
              N.push(`${k.name.padEnd(G)} ${z}ms
`);
            }
            return N.join("");
          }
        }
        i.StatTimer = F;
        function y(V, N) {
          try {
            const {
              protocol: G
            } = N ? new URL(V, N) : new URL(V);
            return G === "http:" || G === "https:";
          } catch {
            return !1;
          }
        }
        function g(V, N = !1) {
          return new Promise((G, k) => {
            const z = document.createElement("script");
            z.src = V, z.onload = function(W) {
              N && z.remove(), G(W);
            }, z.onerror = function() {
              k(new Error(`Cannot load script at: ${z.src}`));
            }, (document.head || document.documentElement).append(z);
          });
        }
        function o(V) {
          console.log("Deprecated API usage: " + V);
        }
        let h;
        class v {
          static toDateObject(N) {
            if (!N || typeof N != "string")
              return null;
            h || (h = new RegExp("^D:(\\d{4})(\\d{2})?(\\d{2})?(\\d{2})?(\\d{2})?(\\d{2})?([Z|+|-])?(\\d{2})?'?(\\d{2})?'?"));
            const G = h.exec(N);
            if (!G)
              return null;
            const k = parseInt(G[1], 10);
            let z = parseInt(G[2], 10);
            z = z >= 1 && z <= 12 ? z - 1 : 0;
            let W = parseInt(G[3], 10);
            W = W >= 1 && W <= 31 ? W : 1;
            let st = parseInt(G[4], 10);
            st = st >= 0 && st <= 23 ? st : 0;
            let ot = parseInt(G[5], 10);
            ot = ot >= 0 && ot <= 59 ? ot : 0;
            let ct = parseInt(G[6], 10);
            ct = ct >= 0 && ct <= 59 ? ct : 0;
            const mt = G[7] || "Z";
            let bt = parseInt(G[8], 10);
            bt = bt >= 0 && bt <= 23 ? bt : 0;
            let B = parseInt(G[9], 10) || 0;
            return B = B >= 0 && B <= 59 ? B : 0, mt === "-" ? (st += bt, ot += B) : mt === "+" && (st -= bt, ot -= B), new Date(Date.UTC(k, z, W, st, ot, ct));
          }
        }
        i.PDFDateString = v;
        function O(V, {
          scale: N = 1,
          rotation: G = 0
        }) {
          const {
            width: k,
            height: z
          } = V.attributes.style, W = [0, 0, parseInt(k), parseInt(z)];
          return new A({
            viewBox: W,
            scale: N,
            rotation: G
          });
        }
        function D(V) {
          if (V.startsWith("#")) {
            const N = parseInt(V.slice(1), 16);
            return [(N & 16711680) >> 16, (N & 65280) >> 8, N & 255];
          }
          return V.startsWith("rgb(") ? V.slice(4, -1).split(",").map((N) => parseInt(N)) : V.startsWith("rgba(") ? V.slice(5, -1).split(",").map((N) => parseInt(N)).slice(0, 3) : ((0, d.warn)(`Not a valid color format: "${V}"`), [0, 0, 0]);
        }
        function L(V) {
          const N = document.createElement("span");
          N.style.visibility = "hidden", document.body.append(N);
          for (const G of V.keys()) {
            N.style.color = G;
            const k = window.getComputedStyle(N).color;
            V.set(G, D(k));
          }
          N.remove();
        }
        function U(V, N, G = 0) {
          let k = G, z = V.length - 1;
          if (z < 0 || !N(V[z]))
            return V.length;
          if (N(V[k]))
            return k;
          for (; k < z; ) {
            const W = k + z >> 1, st = V[W];
            N(st) ? z = W : k = W + 1;
          }
          return k;
        }
      },
      (t, i, r) => {
        Object.defineProperty(i, "__esModule", {
          value: !0
        }), i.BaseStandardFontDataFactory = i.BaseSVGFactory = i.BaseCanvasFactory = i.BaseCMapReaderFactory = void 0;
        var e = r(1);
        class d {
          constructor() {
            this.constructor === d && (0, e.unreachable)("Cannot initialize BaseCanvasFactory.");
          }
          create(m, S) {
            if (m <= 0 || S <= 0)
              throw new Error("Invalid canvas size");
            const R = this._createCanvas(m, S);
            return {
              canvas: R,
              context: R.getContext("2d")
            };
          }
          reset(m, S, R) {
            if (!m.canvas)
              throw new Error("Canvas is not specified");
            if (S <= 0 || R <= 0)
              throw new Error("Invalid canvas size");
            m.canvas.width = S, m.canvas.height = R;
          }
          destroy(m) {
            if (!m.canvas)
              throw new Error("Canvas is not specified");
            m.canvas.width = 0, m.canvas.height = 0, m.canvas = null, m.context = null;
          }
          _createCanvas(m, S) {
            (0, e.unreachable)("Abstract method `_createCanvas` called.");
          }
        }
        i.BaseCanvasFactory = d;
        class C {
          constructor({
            baseUrl: m = null,
            isCompressed: S = !1
          }) {
            this.constructor === C && (0, e.unreachable)("Cannot initialize BaseCMapReaderFactory."), this.baseUrl = m, this.isCompressed = S;
          }
          async fetch({
            name: m
          }) {
            if (!this.baseUrl)
              throw new Error('The CMap "baseUrl" parameter must be specified, ensure that the "cMapUrl" and "cMapPacked" API parameters are provided.');
            if (!m)
              throw new Error("CMap name must be specified.");
            const S = this.baseUrl + m + (this.isCompressed ? ".bcmap" : ""), R = this.isCompressed ? e.CMapCompressionType.BINARY : e.CMapCompressionType.NONE;
            return this._fetchData(S, R).catch((A) => {
              throw new Error(`Unable to load ${this.isCompressed ? "binary " : ""}CMap at: ${S}`);
            });
          }
          _fetchData(m, S) {
            (0, e.unreachable)("Abstract method `_fetchData` called.");
          }
        }
        i.BaseCMapReaderFactory = C;
        class T {
          constructor({
            baseUrl: m = null
          }) {
            this.constructor === T && (0, e.unreachable)("Cannot initialize BaseStandardFontDataFactory."), this.baseUrl = m;
          }
          async fetch({
            filename: m
          }) {
            if (!this.baseUrl)
              throw new Error('The standard font "baseUrl" parameter must be specified, ensure that the "standardFontDataUrl" API parameter is provided.');
            if (!m)
              throw new Error("Font filename must be specified.");
            const S = `${this.baseUrl}${m}`;
            return this._fetchData(S).catch((R) => {
              throw new Error(`Unable to load font data at: ${S}`);
            });
          }
          _fetchData(m) {
            (0, e.unreachable)("Abstract method `_fetchData` called.");
          }
        }
        i.BaseStandardFontDataFactory = T;
        class I {
          constructor() {
            this.constructor === I && (0, e.unreachable)("Cannot initialize BaseSVGFactory.");
          }
          create(m, S, R = !1) {
            if (m <= 0 || S <= 0)
              throw new Error("Invalid SVG dimensions");
            const A = this._createSVG("svg:svg");
            return A.setAttribute("version", "1.1"), R || (A.setAttribute("width", `${m}px`), A.setAttribute("height", `${S}px`)), A.setAttribute("preserveAspectRatio", "none"), A.setAttribute("viewBox", `0 0 ${m} ${S}`), A;
          }
          createElement(m) {
            if (typeof m != "string")
              throw new Error("Invalid SVG element type");
            return this._createSVG(m);
          }
          _createSVG(m) {
            (0, e.unreachable)("Abstract method `_createSVG` called.");
          }
        }
        i.BaseSVGFactory = I;
      },
      (__unused_webpack_module, exports, __w_pdfjs_require__) => {
        var t, r, e, d, C, T, I, x, m, le, R, A;
        Object.defineProperty(exports, "__esModule", {
          value: !0
        }), exports.build = exports.RenderTask = exports.PDFWorkerUtil = exports.PDFWorker = exports.PDFPageProxy = exports.PDFDocumentProxy = exports.PDFDocumentLoadingTask = exports.PDFDataRangeTransport = exports.LoopbackPort = exports.DefaultStandardFontDataFactory = exports.DefaultCanvasFactory = exports.DefaultCMapReaderFactory = void 0, exports.getDocument = getDocument, exports.setPDFNetworkStreamFactory = setPDFNetworkStreamFactory, exports.version = void 0;
        var _util = __w_pdfjs_require__(1), _annotation_storage = __w_pdfjs_require__(7), _display_utils = __w_pdfjs_require__(4), _font_loader = __w_pdfjs_require__(11), _canvas = __w_pdfjs_require__(12), _worker_options = __w_pdfjs_require__(15), _is_node = __w_pdfjs_require__(3), _message_handler = __w_pdfjs_require__(16), _metadata = __w_pdfjs_require__(17), _optional_content_config = __w_pdfjs_require__(18), _transport_stream = __w_pdfjs_require__(19), _xfa_text = __w_pdfjs_require__(20);
        const DEFAULT_RANGE_CHUNK_SIZE = 65536, RENDERING_CANCELLED_TIMEOUT = 100;
        let DefaultCanvasFactory = _display_utils.DOMCanvasFactory;
        exports.DefaultCanvasFactory = DefaultCanvasFactory;
        let DefaultCMapReaderFactory = _display_utils.DOMCMapReaderFactory;
        exports.DefaultCMapReaderFactory = DefaultCMapReaderFactory;
        let DefaultStandardFontDataFactory = _display_utils.DOMStandardFontDataFactory;
        if (exports.DefaultStandardFontDataFactory = DefaultStandardFontDataFactory, _is_node.isNodeJS) {
          const {
            NodeCanvasFactory: u,
            NodeCMapReaderFactory: n,
            NodeStandardFontDataFactory: a
          } = __w_pdfjs_require__(21);
          exports.DefaultCanvasFactory = DefaultCanvasFactory = u, exports.DefaultCMapReaderFactory = DefaultCMapReaderFactory = n, exports.DefaultStandardFontDataFactory = DefaultStandardFontDataFactory = a;
        }
        let createPDFNetworkStream;
        function setPDFNetworkStreamFactory(u) {
          createPDFNetworkStream = u;
        }
        function getDocument(u) {
          const n = new PDFDocumentLoadingTask();
          let a;
          if (typeof u == "string" || u instanceof URL)
            a = {
              url: u
            };
          else if ((0, _util.isArrayBuffer)(u))
            a = {
              data: u
            };
          else if (u instanceof PDFDataRangeTransport)
            a = {
              range: u
            };
          else {
            if (typeof u != "object")
              throw new Error("Invalid parameter in getDocument, need either string, URL, Uint8Array, or parameter object.");
            if (!u.url && !u.data && !u.range)
              throw new Error("Invalid parameter object: need either .data, .range or .url");
            a = u;
          }
          const l = /* @__PURE__ */ Object.create(null);
          let F = null, y = null;
          for (const o in a) {
            const h = a[o];
            switch (o) {
              case "url":
                if (typeof window < "u")
                  try {
                    l[o] = new URL(h, window.location).href;
                    continue;
                  } catch (v) {
                    (0, _util.warn)(`Cannot create valid URL: "${v}".`);
                  }
                else if (typeof h == "string" || h instanceof URL) {
                  l[o] = h.toString();
                  continue;
                }
                throw new Error("Invalid PDF url data: either string or URL-object is expected in the url property.");
              case "range":
                F = h;
                continue;
              case "worker":
                y = h;
                continue;
              case "data":
                if (_is_node.isNodeJS && typeof Buffer < "u" && h instanceof Buffer)
                  l[o] = new Uint8Array(h);
                else {
                  if (h instanceof Uint8Array)
                    break;
                  if (typeof h == "string")
                    l[o] = (0, _util.stringToBytes)(h);
                  else if (typeof h == "object" && h !== null && !isNaN(h.length))
                    l[o] = new Uint8Array(h);
                  else if ((0, _util.isArrayBuffer)(h))
                    l[o] = new Uint8Array(h);
                  else
                    throw new Error("Invalid PDF binary data: either typed array, string, or array-like object is expected in the data property.");
                }
                continue;
            }
            l[o] = h;
          }
          if (l.CMapReaderFactory = l.CMapReaderFactory || DefaultCMapReaderFactory, l.StandardFontDataFactory = l.StandardFontDataFactory || DefaultStandardFontDataFactory, l.ignoreErrors = l.stopAtErrors !== !0, l.fontExtraProperties = l.fontExtraProperties === !0, l.pdfBug = l.pdfBug === !0, l.enableXfa = l.enableXfa === !0, (!Number.isInteger(l.rangeChunkSize) || l.rangeChunkSize < 1) && (l.rangeChunkSize = DEFAULT_RANGE_CHUNK_SIZE), (typeof l.docBaseUrl != "string" || (0, _display_utils.isDataScheme)(l.docBaseUrl)) && (l.docBaseUrl = null), (!Number.isInteger(l.maxImageSize) || l.maxImageSize < -1) && (l.maxImageSize = -1), typeof l.cMapUrl != "string" && (l.cMapUrl = null), typeof l.standardFontDataUrl != "string" && (l.standardFontDataUrl = null), typeof l.useWorkerFetch != "boolean" && (l.useWorkerFetch = l.CMapReaderFactory === _display_utils.DOMCMapReaderFactory && l.StandardFontDataFactory === _display_utils.DOMStandardFontDataFactory), typeof l.isEvalSupported != "boolean" && (l.isEvalSupported = !0), typeof l.disableFontFace != "boolean" && (l.disableFontFace = _is_node.isNodeJS), typeof l.useSystemFonts != "boolean" && (l.useSystemFonts = !_is_node.isNodeJS && !l.disableFontFace), (typeof l.ownerDocument != "object" || l.ownerDocument === null) && (l.ownerDocument = globalThis.document), typeof l.disableRange != "boolean" && (l.disableRange = !1), typeof l.disableStream != "boolean" && (l.disableStream = !1), typeof l.disableAutoFetch != "boolean" && (l.disableAutoFetch = !1), (0, _util.setVerbosityLevel)(l.verbosity), !y) {
            const o = {
              verbosity: l.verbosity,
              port: _worker_options.GlobalWorkerOptions.workerPort
            };
            y = o.port ? PDFWorker.fromPort(o) : new PDFWorker(o), n._worker = y;
          }
          const g = n.docId;
          return y.promise.then(function() {
            if (n.destroyed)
              throw new Error("Loading aborted");
            const o = _fetchDocument(y, l, F, g), h = new Promise(function(v) {
              let O;
              F ? O = new _transport_stream.PDFDataTransportStream({
                length: l.length,
                initialData: l.initialData,
                progressiveDone: l.progressiveDone,
                contentDispositionFilename: l.contentDispositionFilename,
                disableRange: l.disableRange,
                disableStream: l.disableStream
              }, F) : l.data || (O = createPDFNetworkStream({
                url: l.url,
                length: l.length,
                httpHeaders: l.httpHeaders,
                withCredentials: l.withCredentials,
                rangeChunkSize: l.rangeChunkSize,
                disableRange: l.disableRange,
                disableStream: l.disableStream
              })), v(O);
            });
            return Promise.all([o, h]).then(function([v, O]) {
              if (n.destroyed)
                throw new Error("Loading aborted");
              const D = new _message_handler.MessageHandler(g, v, y.port), L = new WorkerTransport(D, n, O, l);
              n._transport = L, D.send("Ready", null);
            });
          }).catch(n._capability.reject), n;
        }
        async function _fetchDocument(u, n, a, l) {
          if (u.destroyed)
            throw new Error("Worker was destroyed");
          a && (n.length = a.length, n.initialData = a.initialData, n.progressiveDone = a.progressiveDone, n.contentDispositionFilename = a.contentDispositionFilename);
          const F = await u.messageHandler.sendWithPromise("GetDocRequest", {
            docId: l,
            apiVersion: "2.15.349",
            source: {
              data: n.data,
              url: n.url,
              password: n.password,
              disableAutoFetch: n.disableAutoFetch,
              rangeChunkSize: n.rangeChunkSize,
              length: n.length
            },
            maxImageSize: n.maxImageSize,
            disableFontFace: n.disableFontFace,
            docBaseUrl: n.docBaseUrl,
            ignoreErrors: n.ignoreErrors,
            isEvalSupported: n.isEvalSupported,
            fontExtraProperties: n.fontExtraProperties,
            enableXfa: n.enableXfa,
            useSystemFonts: n.useSystemFonts,
            cMapUrl: n.useWorkerFetch ? n.cMapUrl : null,
            standardFontDataUrl: n.useWorkerFetch ? n.standardFontDataUrl : null
          });
          if (n.data && (n.data = null), u.destroyed)
            throw new Error("Worker was destroyed");
          return F;
        }
        const i = class {
          constructor() {
            this._capability = (0, _util.createPromiseCapability)(), this._transport = null, this._worker = null, this.docId = `d${oe(i, t)._++}`, this.destroyed = !1, this.onPassword = null, this.onProgress = null, this.onUnsupportedFeature = null;
          }
          get promise() {
            return this._capability.promise;
          }
          async destroy() {
            var n;
            this.destroyed = !0, await ((n = this._transport) == null ? void 0 : n.destroy()), this._transport = null, this._worker && (this._worker.destroy(), this._worker = null);
          }
        };
        let PDFDocumentLoadingTask = i;
        t = new WeakMap(), at(PDFDocumentLoadingTask, t, 0), exports.PDFDocumentLoadingTask = PDFDocumentLoadingTask;
        class PDFDataRangeTransport {
          constructor(n, a, l = !1, F = null) {
            this.length = n, this.initialData = a, this.progressiveDone = l, this.contentDispositionFilename = F, this._rangeListeners = [], this._progressListeners = [], this._progressiveReadListeners = [], this._progressiveDoneListeners = [], this._readyCapability = (0, _util.createPromiseCapability)();
          }
          addRangeListener(n) {
            this._rangeListeners.push(n);
          }
          addProgressListener(n) {
            this._progressListeners.push(n);
          }
          addProgressiveReadListener(n) {
            this._progressiveReadListeners.push(n);
          }
          addProgressiveDoneListener(n) {
            this._progressiveDoneListeners.push(n);
          }
          onDataRange(n, a) {
            for (const l of this._rangeListeners)
              l(n, a);
          }
          onDataProgress(n, a) {
            this._readyCapability.promise.then(() => {
              for (const l of this._progressListeners)
                l(n, a);
            });
          }
          onDataProgressiveRead(n) {
            this._readyCapability.promise.then(() => {
              for (const a of this._progressiveReadListeners)
                a(n);
            });
          }
          onDataProgressiveDone() {
            this._readyCapability.promise.then(() => {
              for (const n of this._progressiveDoneListeners)
                n();
            });
          }
          transportReady() {
            this._readyCapability.resolve();
          }
          requestDataRange(n, a) {
            (0, _util.unreachable)("Abstract method PDFDataRangeTransport.requestDataRange");
          }
          abort() {
          }
        }
        exports.PDFDataRangeTransport = PDFDataRangeTransport;
        class PDFDocumentProxy {
          constructor(n, a) {
            this._pdfInfo = n, this._transport = a, Object.defineProperty(this, "fingerprint", {
              get() {
                return (0, _display_utils.deprecated)("`PDFDocumentProxy.fingerprint`, please use `PDFDocumentProxy.fingerprints` instead."), this.fingerprints[0];
              }
            }), Object.defineProperty(this, "getStats", {
              value: async () => ((0, _display_utils.deprecated)("`PDFDocumentProxy.getStats`, please use the `PDFDocumentProxy.stats`-getter instead."), this.stats || {
                streamTypes: {},
                fontTypes: {}
              })
            });
          }
          get annotationStorage() {
            return this._transport.annotationStorage;
          }
          get numPages() {
            return this._pdfInfo.numPages;
          }
          get fingerprints() {
            return this._pdfInfo.fingerprints;
          }
          get stats() {
            return this._transport.stats;
          }
          get isPureXfa() {
            return !!this._transport._htmlForXfa;
          }
          get allXfaHtml() {
            return this._transport._htmlForXfa;
          }
          getPage(n) {
            return this._transport.getPage(n);
          }
          getPageIndex(n) {
            return this._transport.getPageIndex(n);
          }
          getDestinations() {
            return this._transport.getDestinations();
          }
          getDestination(n) {
            return this._transport.getDestination(n);
          }
          getPageLabels() {
            return this._transport.getPageLabels();
          }
          getPageLayout() {
            return this._transport.getPageLayout();
          }
          getPageMode() {
            return this._transport.getPageMode();
          }
          getViewerPreferences() {
            return this._transport.getViewerPreferences();
          }
          getOpenAction() {
            return this._transport.getOpenAction();
          }
          getAttachments() {
            return this._transport.getAttachments();
          }
          getJavaScript() {
            return this._transport.getJavaScript();
          }
          getJSActions() {
            return this._transport.getDocJSActions();
          }
          getOutline() {
            return this._transport.getOutline();
          }
          getOptionalContentConfig() {
            return this._transport.getOptionalContentConfig();
          }
          getPermissions() {
            return this._transport.getPermissions();
          }
          getMetadata() {
            return this._transport.getMetadata();
          }
          getMarkInfo() {
            return this._transport.getMarkInfo();
          }
          getData() {
            return this._transport.getData();
          }
          getDownloadInfo() {
            return this._transport.downloadInfoCapability.promise;
          }
          cleanup(n = !1) {
            return this._transport.startCleanup(n || this.isPureXfa);
          }
          destroy() {
            return this.loadingTask.destroy();
          }
          get loadingParams() {
            return this._transport.loadingParams;
          }
          get loadingTask() {
            return this._transport.loadingTask;
          }
          saveDocument() {
            return this._transport.annotationStorage.size <= 0 && (0, _display_utils.deprecated)("saveDocument called while `annotationStorage` is empty, please use the getData-method instead."), this._transport.saveDocument();
          }
          getFieldObjects() {
            return this._transport.getFieldObjects();
          }
          hasJSActions() {
            return this._transport.hasJSActions();
          }
          getCalculationOrderIds() {
            return this._transport.getCalculationOrderIds();
          }
        }
        exports.PDFDocumentProxy = PDFDocumentProxy;
        class PDFPageProxy {
          constructor(n, a, l, F, y = !1) {
            this._pageIndex = n, this._pageInfo = a, this._ownerDocument = F, this._transport = l, this._stats = y ? new _display_utils.StatTimer() : null, this._pdfBug = y, this.commonObjs = l.commonObjs, this.objs = new PDFObjects(), this._bitmaps = /* @__PURE__ */ new Set(), this.cleanupAfterRender = !1, this.pendingCleanup = !1, this._intentStates = /* @__PURE__ */ new Map(), this._annotationPromises = /* @__PURE__ */ new Map(), this.destroyed = !1;
          }
          get pageNumber() {
            return this._pageIndex + 1;
          }
          get rotate() {
            return this._pageInfo.rotate;
          }
          get ref() {
            return this._pageInfo.ref;
          }
          get userUnit() {
            return this._pageInfo.userUnit;
          }
          get view() {
            return this._pageInfo.view;
          }
          getViewport({
            scale: n,
            rotation: a = this.rotate,
            offsetX: l = 0,
            offsetY: F = 0,
            dontFlip: y = !1
          } = {}) {
            return new _display_utils.PageViewport({
              viewBox: this.view,
              scale: n,
              rotation: a,
              offsetX: l,
              offsetY: F,
              dontFlip: y
            });
          }
          getAnnotations({
            intent: n = "display"
          } = {}) {
            const a = this._transport.getRenderingIntent(n);
            let l = this._annotationPromises.get(a.cacheKey);
            return l || (l = this._transport.getAnnotations(this._pageIndex, a.renderingIntent), this._annotationPromises.set(a.cacheKey, l), l = l.then((F) => {
              for (const y of F)
                y.titleObj !== void 0 && Object.defineProperty(y, "title", {
                  get() {
                    return (0, _display_utils.deprecated)("`title`-property on annotation, please use `titleObj` instead."), y.titleObj.str;
                  }
                }), y.contentsObj !== void 0 && Object.defineProperty(y, "contents", {
                  get() {
                    return (0, _display_utils.deprecated)("`contents`-property on annotation, please use `contentsObj` instead."), y.contentsObj.str;
                  }
                });
              return F;
            })), l;
          }
          getJSActions() {
            return this._jsActionsPromise || (this._jsActionsPromise = this._transport.getPageJSActions(this._pageIndex));
          }
          async getXfa() {
            var n;
            return ((n = this._transport._htmlForXfa) == null ? void 0 : n.children[this._pageIndex]) || null;
          }
          render({
            canvasContext: n,
            viewport: a,
            intent: l = "display",
            annotationMode: F = _util.AnnotationMode.ENABLE,
            transform: y = null,
            imageLayer: g = null,
            canvasFactory: o = null,
            background: h = null,
            optionalContentConfigPromise: v = null,
            annotationCanvasMap: O = null,
            pageColors: D = null,
            printAnnotationStorage: L = null
          }) {
            var W, st;
            ((W = arguments[0]) == null ? void 0 : W.renderInteractiveForms) !== void 0 && ((0, _display_utils.deprecated)("render no longer accepts the `renderInteractiveForms`-option, please use the `annotationMode`-option instead."), arguments[0].renderInteractiveForms === !0 && F === _util.AnnotationMode.ENABLE && (F = _util.AnnotationMode.ENABLE_FORMS)), ((st = arguments[0]) == null ? void 0 : st.includeAnnotationStorage) !== void 0 && ((0, _display_utils.deprecated)("render no longer accepts the `includeAnnotationStorage`-option, please use the `annotationMode`-option instead."), arguments[0].includeAnnotationStorage === !0 && F === _util.AnnotationMode.ENABLE && (F = _util.AnnotationMode.ENABLE_STORAGE)), this._stats && this._stats.time("Overall");
            const U = this._transport.getRenderingIntent(l, F, L);
            this.pendingCleanup = !1, v || (v = this._transport.getOptionalContentConfig());
            let J = this._intentStates.get(U.cacheKey);
            J || (J = /* @__PURE__ */ Object.create(null), this._intentStates.set(U.cacheKey, J)), J.streamReaderCancelTimeout && (clearTimeout(J.streamReaderCancelTimeout), J.streamReaderCancelTimeout = null);
            const V = o || new DefaultCanvasFactory({
              ownerDocument: this._ownerDocument
            }), N = !!(U.renderingIntent & _util.RenderingIntentFlag.PRINT);
            J.displayReadyCapability || (J.displayReadyCapability = (0, _util.createPromiseCapability)(), J.operatorList = {
              fnArray: [],
              argsArray: [],
              lastChunk: !1,
              separateAnnots: null
            }, this._stats && this._stats.time("Page Request"), this._pumpOperatorList(U));
            const G = (ot) => {
              J.renderTasks.delete(k), (this.cleanupAfterRender || N) && (this.pendingCleanup = !0), this._tryCleanup(), ot ? (k.capability.reject(ot), this._abortOperatorList({
                intentState: J,
                reason: ot instanceof Error ? ot : new Error(ot)
              })) : k.capability.resolve(), this._stats && (this._stats.timeEnd("Rendering"), this._stats.timeEnd("Overall"));
            }, k = new InternalRenderTask({
              callback: G,
              params: {
                canvasContext: n,
                viewport: a,
                transform: y,
                imageLayer: g,
                background: h
              },
              objs: this.objs,
              commonObjs: this.commonObjs,
              annotationCanvasMap: O,
              operatorList: J.operatorList,
              pageIndex: this._pageIndex,
              canvasFactory: V,
              useRequestAnimationFrame: !N,
              pdfBug: this._pdfBug,
              pageColors: D
            });
            (J.renderTasks || (J.renderTasks = /* @__PURE__ */ new Set())).add(k);
            const z = k.task;
            return Promise.all([J.displayReadyCapability.promise, v]).then(([ot, ct]) => {
              if (this.pendingCleanup) {
                G();
                return;
              }
              this._stats && this._stats.time("Rendering"), k.initializeGraphics({
                transparency: ot,
                optionalContentConfig: ct
              }), k.operatorListChanged();
            }).catch(G), z;
          }
          getOperatorList({
            intent: n = "display",
            annotationMode: a = _util.AnnotationMode.ENABLE,
            printAnnotationStorage: l = null
          } = {}) {
            function F() {
              g.operatorList.lastChunk && (g.opListReadCapability.resolve(g.operatorList), g.renderTasks.delete(o));
            }
            const y = this._transport.getRenderingIntent(n, a, l, !0);
            let g = this._intentStates.get(y.cacheKey);
            g || (g = /* @__PURE__ */ Object.create(null), this._intentStates.set(y.cacheKey, g));
            let o;
            return g.opListReadCapability || (o = /* @__PURE__ */ Object.create(null), o.operatorListChanged = F, g.opListReadCapability = (0, _util.createPromiseCapability)(), (g.renderTasks || (g.renderTasks = /* @__PURE__ */ new Set())).add(o), g.operatorList = {
              fnArray: [],
              argsArray: [],
              lastChunk: !1,
              separateAnnots: null
            }, this._stats && this._stats.time("Page Request"), this._pumpOperatorList(y)), g.opListReadCapability.promise;
          }
          streamTextContent({
            disableCombineTextItems: n = !1,
            includeMarkedContent: a = !1
          } = {}) {
            return this._transport.messageHandler.sendWithStream("GetTextContent", {
              pageIndex: this._pageIndex,
              combineTextItems: n !== !0,
              includeMarkedContent: a === !0
            }, {
              highWaterMark: 100,
              size(F) {
                return F.items.length;
              }
            });
          }
          getTextContent(n = {}) {
            if (this._transport._htmlForXfa)
              return this.getXfa().then((l) => _xfa_text.XfaText.textContent(l));
            const a = this.streamTextContent(n);
            return new Promise(function(l, F) {
              function y() {
                g.read().then(function({
                  value: h,
                  done: v
                }) {
                  if (v) {
                    l(o);
                    return;
                  }
                  Object.assign(o.styles, h.styles), o.items.push(...h.items), y();
                }, F);
              }
              const g = a.getReader(), o = {
                items: [],
                styles: /* @__PURE__ */ Object.create(null)
              };
              y();
            });
          }
          getStructTree() {
            return this._structTreePromise || (this._structTreePromise = this._transport.getStructTree(this._pageIndex));
          }
          _destroy() {
            this.destroyed = !0;
            const n = [];
            for (const a of this._intentStates.values())
              if (this._abortOperatorList({
                intentState: a,
                reason: new Error("Page was destroyed."),
                force: !0
              }), !a.opListReadCapability)
                for (const l of a.renderTasks)
                  n.push(l.completed), l.cancel();
            this.objs.clear();
            for (const a of this._bitmaps)
              a.close();
            return this._bitmaps.clear(), this._annotationPromises.clear(), this._jsActionsPromise = null, this._structTreePromise = null, this.pendingCleanup = !1, Promise.all(n);
          }
          cleanup(n = !1) {
            return this.pendingCleanup = !0, this._tryCleanup(n);
          }
          _tryCleanup(n = !1) {
            if (!this.pendingCleanup)
              return !1;
            for (const {
              renderTasks: a,
              operatorList: l
            } of this._intentStates.values())
              if (a.size > 0 || !l.lastChunk)
                return !1;
            this._intentStates.clear(), this.objs.clear(), this._annotationPromises.clear(), this._jsActionsPromise = null, this._structTreePromise = null, n && this._stats && (this._stats = new _display_utils.StatTimer());
            for (const a of this._bitmaps)
              a.close();
            return this._bitmaps.clear(), this.pendingCleanup = !1, !0;
          }
          _startRenderPage(n, a) {
            const l = this._intentStates.get(a);
            !l || (this._stats && this._stats.timeEnd("Page Request"), l.displayReadyCapability && l.displayReadyCapability.resolve(n));
          }
          _renderPageChunk(n, a) {
            for (let l = 0, F = n.length; l < F; l++)
              a.operatorList.fnArray.push(n.fnArray[l]), a.operatorList.argsArray.push(n.argsArray[l]);
            a.operatorList.lastChunk = n.lastChunk, a.operatorList.separateAnnots = n.separateAnnots;
            for (const l of a.renderTasks)
              l.operatorListChanged();
            n.lastChunk && this._tryCleanup();
          }
          _pumpOperatorList({
            renderingIntent: n,
            cacheKey: a,
            annotationStorageMap: l
          }) {
            const y = this._transport.messageHandler.sendWithStream("GetOperatorList", {
              pageIndex: this._pageIndex,
              intent: n,
              cacheKey: a,
              annotationStorage: l
            }).getReader(), g = this._intentStates.get(a);
            g.streamReader = y;
            const o = () => {
              y.read().then(({
                value: h,
                done: v
              }) => {
                if (v) {
                  g.streamReader = null;
                  return;
                }
                this._transport.destroyed || (this._renderPageChunk(h, g), o());
              }, (h) => {
                if (g.streamReader = null, !this._transport.destroyed) {
                  if (g.operatorList) {
                    g.operatorList.lastChunk = !0;
                    for (const v of g.renderTasks)
                      v.operatorListChanged();
                    this._tryCleanup();
                  }
                  if (g.displayReadyCapability)
                    g.displayReadyCapability.reject(h);
                  else if (g.opListReadCapability)
                    g.opListReadCapability.reject(h);
                  else
                    throw h;
                }
              });
            };
            o();
          }
          _abortOperatorList({
            intentState: n,
            reason: a,
            force: l = !1
          }) {
            if (!!n.streamReader) {
              if (!l) {
                if (n.renderTasks.size > 0)
                  return;
                if (a instanceof _display_utils.RenderingCancelledException) {
                  n.streamReaderCancelTimeout = setTimeout(() => {
                    this._abortOperatorList({
                      intentState: n,
                      reason: a,
                      force: !0
                    }), n.streamReaderCancelTimeout = null;
                  }, RENDERING_CANCELLED_TIMEOUT);
                  return;
                }
              }
              if (n.streamReader.cancel(new _util.AbortException(a.message)).catch(() => {
              }), n.streamReader = null, !this._transport.destroyed) {
                for (const [F, y] of this._intentStates)
                  if (y === n) {
                    this._intentStates.delete(F);
                    break;
                  }
                this.cleanup();
              }
            }
          }
          get stats() {
            return this._stats;
          }
        }
        exports.PDFPageProxy = PDFPageProxy;
        class LoopbackPort {
          constructor() {
            this._listeners = [], this._deferred = Promise.resolve();
          }
          postMessage(n, a) {
            const l = {
              data: structuredClone(n, a)
            };
            this._deferred.then(() => {
              for (const F of this._listeners)
                F.call(this, l);
            });
          }
          addEventListener(n, a) {
            this._listeners.push(a);
          }
          removeEventListener(n, a) {
            const l = this._listeners.indexOf(a);
            this._listeners.splice(l, 1);
          }
          terminate() {
            this._listeners.length = 0;
          }
        }
        exports.LoopbackPort = LoopbackPort;
        const PDFWorkerUtil = {
          isWorkerDisabled: !1,
          fallbackWorkerSrc: null,
          fakeWorkerId: 0
        };
        exports.PDFWorkerUtil = PDFWorkerUtil;
        {
          if (_is_node.isNodeJS && typeof commonjsRequire == "function")
            PDFWorkerUtil.isWorkerDisabled = !0, PDFWorkerUtil.fallbackWorkerSrc = "./pdf.worker.js";
          else if (typeof document == "object") {
            const u = (r = document == null ? void 0 : document.currentScript) == null ? void 0 : r.src;
            u && (PDFWorkerUtil.fallbackWorkerSrc = u.replace(/(\.(?:min\.)?js)(\?.*)?$/i, ".worker$1$2"));
          }
          PDFWorkerUtil.isSameOrigin = function(u, n) {
            let a;
            try {
              if (a = new URL(u), !a.origin || a.origin === "null")
                return !1;
            } catch {
              return !1;
            }
            const l = new URL(n, a);
            return a.origin === l.origin;
          }, PDFWorkerUtil.createCDNWrapper = function(u) {
            const n = `importScripts("${u}");`;
            return URL.createObjectURL(new Blob([n]));
          };
        }
        const _PDFWorker = class {
          constructor({
            name: u = null,
            port: n = null,
            verbosity: a = (0, _util.getVerbosityLevel)()
          } = {}) {
            if (n && M(_PDFWorker, e).has(n))
              throw new Error("Cannot use more than one PDFWorker per port.");
            if (this.name = u, this.destroyed = !1, this.verbosity = a, this._readyCapability = (0, _util.createPromiseCapability)(), this._port = null, this._webWorker = null, this._messageHandler = null, n) {
              M(_PDFWorker, e).set(n, this), this._initializeFromPort(n);
              return;
            }
            this._initialize();
          }
          get promise() {
            return this._readyCapability.promise;
          }
          get port() {
            return this._port;
          }
          get messageHandler() {
            return this._messageHandler;
          }
          _initializeFromPort(u) {
            this._port = u, this._messageHandler = new _message_handler.MessageHandler("main", "worker", u), this._messageHandler.on("ready", function() {
            }), this._readyCapability.resolve();
          }
          _initialize() {
            if (typeof Worker < "u" && !PDFWorkerUtil.isWorkerDisabled && !_PDFWorker._mainThreadWorkerMessageHandler) {
              let u = _PDFWorker.workerSrc;
              try {
                PDFWorkerUtil.isSameOrigin(window.location.href, u) || (u = PDFWorkerUtil.createCDNWrapper(new URL(u, window.location).href));
                const n = new Worker(u), a = new _message_handler.MessageHandler("main", "worker", n), l = () => {
                  n.removeEventListener("error", F), a.destroy(), n.terminate(), this.destroyed ? this._readyCapability.reject(new Error("Worker was destroyed")) : this._setupFakeWorker();
                }, F = () => {
                  this._webWorker || l();
                };
                n.addEventListener("error", F), a.on("test", (g) => {
                  if (n.removeEventListener("error", F), this.destroyed) {
                    l();
                    return;
                  }
                  g ? (this._messageHandler = a, this._port = n, this._webWorker = n, this._readyCapability.resolve(), a.send("configure", {
                    verbosity: this.verbosity
                  })) : (this._setupFakeWorker(), a.destroy(), n.terminate());
                }), a.on("ready", (g) => {
                  if (n.removeEventListener("error", F), this.destroyed) {
                    l();
                    return;
                  }
                  try {
                    y();
                  } catch {
                    this._setupFakeWorker();
                  }
                });
                const y = () => {
                  const g = new Uint8Array();
                  a.send("test", g, [g.buffer]);
                };
                y();
                return;
              } catch {
                (0, _util.info)("The worker has been disabled.");
              }
            }
            this._setupFakeWorker();
          }
          _setupFakeWorker() {
            PDFWorkerUtil.isWorkerDisabled || ((0, _util.warn)("Setting up fake worker."), PDFWorkerUtil.isWorkerDisabled = !0), _PDFWorker._setupFakeWorkerGlobal.then((u) => {
              if (this.destroyed) {
                this._readyCapability.reject(new Error("Worker was destroyed"));
                return;
              }
              const n = new LoopbackPort();
              this._port = n;
              const a = `fake${PDFWorkerUtil.fakeWorkerId++}`, l = new _message_handler.MessageHandler(a + "_worker", a, n);
              u.setup(l, n);
              const F = new _message_handler.MessageHandler(a, a + "_worker", n);
              this._messageHandler = F, this._readyCapability.resolve(), F.send("configure", {
                verbosity: this.verbosity
              });
            }).catch((u) => {
              this._readyCapability.reject(new Error(`Setting up fake worker failed: "${u.message}".`));
            });
          }
          destroy() {
            this.destroyed = !0, this._webWorker && (this._webWorker.terminate(), this._webWorker = null), M(_PDFWorker, e).delete(this._port), this._port = null, this._messageHandler && (this._messageHandler.destroy(), this._messageHandler = null);
          }
          static fromPort(u) {
            if (!(u != null && u.port))
              throw new Error("PDFWorker.fromPort - invalid method signature.");
            return M(this, e).has(u.port) ? M(this, e).get(u.port) : new _PDFWorker(u);
          }
          static get workerSrc() {
            if (_worker_options.GlobalWorkerOptions.workerSrc)
              return _worker_options.GlobalWorkerOptions.workerSrc;
            if (PDFWorkerUtil.fallbackWorkerSrc !== null)
              return _is_node.isNodeJS || (0, _display_utils.deprecated)('No "GlobalWorkerOptions.workerSrc" specified.'), PDFWorkerUtil.fallbackWorkerSrc;
            throw new Error('No "GlobalWorkerOptions.workerSrc" specified.');
          }
          static get _mainThreadWorkerMessageHandler() {
            var u;
            try {
              return ((u = globalThis.pdfjsWorker) == null ? void 0 : u.WorkerMessageHandler) || null;
            } catch {
              return null;
            }
          }
          static get _setupFakeWorkerGlobal() {
            const loader = async () => {
              const mainWorkerMessageHandler = this._mainThreadWorkerMessageHandler;
              if (mainWorkerMessageHandler)
                return mainWorkerMessageHandler;
              if (_is_node.isNodeJS && typeof commonjsRequire == "function") {
                const worker = eval("require")(this.workerSrc);
                return worker.WorkerMessageHandler;
              }
              return await (0, _display_utils.loadScript)(this.workerSrc), window.pdfjsWorker.WorkerMessageHandler;
            };
            return (0, _util.shadow)(this, "_setupFakeWorkerGlobal", loader());
          }
        };
        let PDFWorker = _PDFWorker;
        e = new WeakMap(), at(PDFWorker, e, /* @__PURE__ */ new WeakMap()), exports.PDFWorker = PDFWorker, PDFWorker.getWorkerSrc = function() {
          return (0, _display_utils.deprecated)("`PDFWorker.getWorkerSrc()`, please use `PDFWorker.workerSrc` instead."), this.workerSrc;
        };
        class WorkerTransport {
          constructor(n, a, l, F) {
            at(this, d, null);
            at(this, C, /* @__PURE__ */ new Map());
            at(this, T, /* @__PURE__ */ new Map());
            at(this, I, null);
            this.messageHandler = n, this.loadingTask = a, this.commonObjs = new PDFObjects(), this.fontLoader = new _font_loader.FontLoader({
              docId: a.docId,
              onUnsupportedFeature: this._onUnsupportedFeature.bind(this),
              ownerDocument: F.ownerDocument,
              styleElement: F.styleElement
            }), this._params = F, F.useWorkerFetch || (this.CMapReaderFactory = new F.CMapReaderFactory({
              baseUrl: F.cMapUrl,
              isCompressed: F.cMapPacked
            }), this.StandardFontDataFactory = new F.StandardFontDataFactory({
              baseUrl: F.standardFontDataUrl
            })), this.destroyed = !1, this.destroyCapability = null, this._passwordCapability = null, this._networkStream = l, this._fullReader = null, this._lastProgress = null, this.downloadInfoCapability = (0, _util.createPromiseCapability)(), this.setupMessageHandler();
          }
          get annotationStorage() {
            return (0, _util.shadow)(this, "annotationStorage", new _annotation_storage.AnnotationStorage());
          }
          get stats() {
            return M(this, d);
          }
          getRenderingIntent(n, a = _util.AnnotationMode.ENABLE, l = null, F = !1) {
            let y = _util.RenderingIntentFlag.DISPLAY, g = null;
            switch (n) {
              case "any":
                y = _util.RenderingIntentFlag.ANY;
                break;
              case "display":
                break;
              case "print":
                y = _util.RenderingIntentFlag.PRINT;
                break;
              default:
                (0, _util.warn)(`getRenderingIntent - invalid intent: ${n}`);
            }
            switch (a) {
              case _util.AnnotationMode.DISABLE:
                y += _util.RenderingIntentFlag.ANNOTATIONS_DISABLE;
                break;
              case _util.AnnotationMode.ENABLE:
                break;
              case _util.AnnotationMode.ENABLE_FORMS:
                y += _util.RenderingIntentFlag.ANNOTATIONS_FORMS;
                break;
              case _util.AnnotationMode.ENABLE_STORAGE:
                y += _util.RenderingIntentFlag.ANNOTATIONS_STORAGE, g = (y & _util.RenderingIntentFlag.PRINT && l instanceof _annotation_storage.PrintAnnotationStorage ? l : this.annotationStorage).serializable;
                break;
              default:
                (0, _util.warn)(`getRenderingIntent - invalid annotationMode: ${a}`);
            }
            return F && (y += _util.RenderingIntentFlag.OPLIST), {
              renderingIntent: y,
              cacheKey: `${y}_${_annotation_storage.AnnotationStorage.getHash(g)}`,
              annotationStorageMap: g
            };
          }
          destroy() {
            if (this.destroyCapability)
              return this.destroyCapability.promise;
            this.destroyed = !0, this.destroyCapability = (0, _util.createPromiseCapability)(), this._passwordCapability && this._passwordCapability.reject(new Error("Worker was destroyed during onPassword callback"));
            const n = [];
            for (const l of M(this, C).values())
              n.push(l._destroy());
            M(this, C).clear(), M(this, T).clear(), this.hasOwnProperty("annotationStorage") && this.annotationStorage.resetModified();
            const a = this.messageHandler.sendWithPromise("Terminate", null);
            return n.push(a), Promise.all(n).then(() => {
              this.commonObjs.clear(), this.fontLoader.clear(), ut(this, I, null), this._getFieldObjectsPromise = null, this._hasJSActionsPromise = null, this._networkStream && this._networkStream.cancelAllRequests(new _util.AbortException("Worker was terminated.")), this.messageHandler && (this.messageHandler.destroy(), this.messageHandler = null), this.destroyCapability.resolve();
            }, this.destroyCapability.reject), this.destroyCapability.promise;
          }
          setupMessageHandler() {
            const {
              messageHandler: n,
              loadingTask: a
            } = this;
            n.on("GetReader", (l, F) => {
              (0, _util.assert)(this._networkStream, "GetReader - no `IPDFStream` instance available."), this._fullReader = this._networkStream.getFullReader(), this._fullReader.onProgress = (y) => {
                this._lastProgress = {
                  loaded: y.loaded,
                  total: y.total
                };
              }, F.onPull = () => {
                this._fullReader.read().then(function({
                  value: y,
                  done: g
                }) {
                  if (g) {
                    F.close();
                    return;
                  }
                  (0, _util.assert)((0, _util.isArrayBuffer)(y), "GetReader - expected an ArrayBuffer."), F.enqueue(new Uint8Array(y), 1, [y]);
                }).catch((y) => {
                  F.error(y);
                });
              }, F.onCancel = (y) => {
                this._fullReader.cancel(y), F.ready.catch((g) => {
                  if (!this.destroyed)
                    throw g;
                });
              };
            }), n.on("ReaderHeadersReady", (l) => {
              const F = (0, _util.createPromiseCapability)(), y = this._fullReader;
              return y.headersReady.then(() => {
                var g;
                (!y.isStreamingSupported || !y.isRangeSupported) && (this._lastProgress && ((g = a.onProgress) == null || g.call(a, this._lastProgress)), y.onProgress = (o) => {
                  var h;
                  (h = a.onProgress) == null || h.call(a, {
                    loaded: o.loaded,
                    total: o.total
                  });
                }), F.resolve({
                  isStreamingSupported: y.isStreamingSupported,
                  isRangeSupported: y.isRangeSupported,
                  contentLength: y.contentLength
                });
              }, F.reject), F.promise;
            }), n.on("GetRangeReader", (l, F) => {
              (0, _util.assert)(this._networkStream, "GetRangeReader - no `IPDFStream` instance available.");
              const y = this._networkStream.getRangeReader(l.begin, l.end);
              if (!y) {
                F.close();
                return;
              }
              F.onPull = () => {
                y.read().then(function({
                  value: g,
                  done: o
                }) {
                  if (o) {
                    F.close();
                    return;
                  }
                  (0, _util.assert)((0, _util.isArrayBuffer)(g), "GetRangeReader - expected an ArrayBuffer."), F.enqueue(new Uint8Array(g), 1, [g]);
                }).catch((g) => {
                  F.error(g);
                });
              }, F.onCancel = (g) => {
                y.cancel(g), F.ready.catch((o) => {
                  if (!this.destroyed)
                    throw o;
                });
              };
            }), n.on("GetDoc", ({
              pdfInfo: l
            }) => {
              this._numPages = l.numPages, this._htmlForXfa = l.htmlForXfa, delete l.htmlForXfa, a._capability.resolve(new PDFDocumentProxy(l, this));
            }), n.on("DocException", function(l) {
              let F;
              switch (l.name) {
                case "PasswordException":
                  F = new _util.PasswordException(l.message, l.code);
                  break;
                case "InvalidPDFException":
                  F = new _util.InvalidPDFException(l.message);
                  break;
                case "MissingPDFException":
                  F = new _util.MissingPDFException(l.message);
                  break;
                case "UnexpectedResponseException":
                  F = new _util.UnexpectedResponseException(l.message, l.status);
                  break;
                case "UnknownErrorException":
                  F = new _util.UnknownErrorException(l.message, l.details);
                  break;
                default:
                  (0, _util.unreachable)("DocException - expected a valid Error.");
              }
              a._capability.reject(F);
            }), n.on("PasswordRequest", (l) => {
              if (this._passwordCapability = (0, _util.createPromiseCapability)(), a.onPassword) {
                const F = (y) => {
                  y instanceof Error ? this._passwordCapability.reject(y) : this._passwordCapability.resolve({
                    password: y
                  });
                };
                try {
                  a.onPassword(F, l.code);
                } catch (y) {
                  this._passwordCapability.reject(y);
                }
              } else
                this._passwordCapability.reject(new _util.PasswordException(l.message, l.code));
              return this._passwordCapability.promise;
            }), n.on("DataLoaded", (l) => {
              var F;
              (F = a.onProgress) == null || F.call(a, {
                loaded: l.length,
                total: l.length
              }), this.downloadInfoCapability.resolve(l);
            }), n.on("StartRenderPage", (l) => {
              if (this.destroyed)
                return;
              M(this, C).get(l.pageIndex)._startRenderPage(l.transparency, l.cacheKey);
            }), n.on("commonobj", ([l, F, y]) => {
              var g;
              if (!this.destroyed && !this.commonObjs.has(l))
                switch (F) {
                  case "Font":
                    const o = this._params;
                    if ("error" in y) {
                      const O = y.error;
                      (0, _util.warn)(`Error during font loading: ${O}`), this.commonObjs.resolve(l, O);
                      break;
                    }
                    let h = null;
                    o.pdfBug && ((g = globalThis.FontInspector) == null ? void 0 : g.enabled) && (h = {
                      registerFont(O, D) {
                        globalThis.FontInspector.fontAdded(O, D);
                      }
                    });
                    const v = new _font_loader.FontFaceObject(y, {
                      isEvalSupported: o.isEvalSupported,
                      disableFontFace: o.disableFontFace,
                      ignoreErrors: o.ignoreErrors,
                      onUnsupportedFeature: this._onUnsupportedFeature.bind(this),
                      fontRegistry: h
                    });
                    this.fontLoader.bind(v).catch((O) => n.sendWithPromise("FontFallback", {
                      id: l
                    })).finally(() => {
                      !o.fontExtraProperties && v.data && (v.data = null), this.commonObjs.resolve(l, v);
                    });
                    break;
                  case "FontPath":
                  case "Image":
                    this.commonObjs.resolve(l, y);
                    break;
                  default:
                    throw new Error(`Got unknown common object type ${F}`);
                }
            }), n.on("obj", ([l, F, y, g]) => {
              var h;
              if (this.destroyed)
                return;
              const o = M(this, C).get(F);
              if (!o.objs.has(l))
                switch (y) {
                  case "Image":
                    o.objs.resolve(l, g);
                    const v = 8e6;
                    if (g) {
                      let O;
                      if (g.bitmap) {
                        const {
                          bitmap: D,
                          width: L,
                          height: U
                        } = g;
                        O = L * U * 4, o._bitmaps.add(D);
                      } else
                        O = ((h = g.data) == null ? void 0 : h.length) || 0;
                      O > v && (o.cleanupAfterRender = !0);
                    }
                    break;
                  case "Pattern":
                    o.objs.resolve(l, g);
                    break;
                  default:
                    throw new Error(`Got unknown object type ${y}`);
                }
            }), n.on("DocProgress", (l) => {
              var F;
              this.destroyed || (F = a.onProgress) == null || F.call(a, {
                loaded: l.loaded,
                total: l.total
              });
            }), n.on("DocStats", (l) => {
              this.destroyed || ut(this, d, Object.freeze({
                streamTypes: Object.freeze(l.streamTypes),
                fontTypes: Object.freeze(l.fontTypes)
              }));
            }), n.on("UnsupportedFeature", this._onUnsupportedFeature.bind(this)), n.on("FetchBuiltInCMap", (l) => this.destroyed ? Promise.reject(new Error("Worker was destroyed.")) : this.CMapReaderFactory ? this.CMapReaderFactory.fetch(l) : Promise.reject(new Error("CMapReaderFactory not initialized, see the `useWorkerFetch` parameter."))), n.on("FetchStandardFontData", (l) => this.destroyed ? Promise.reject(new Error("Worker was destroyed.")) : this.StandardFontDataFactory ? this.StandardFontDataFactory.fetch(l) : Promise.reject(new Error("StandardFontDataFactory not initialized, see the `useWorkerFetch` parameter.")));
          }
          _onUnsupportedFeature({
            featureId: n
          }) {
            var a, l;
            this.destroyed || (l = (a = this.loadingTask).onUnsupportedFeature) == null || l.call(a, n);
          }
          getData() {
            return this.messageHandler.sendWithPromise("GetData", null);
          }
          getPage(n) {
            if (!Number.isInteger(n) || n <= 0 || n > this._numPages)
              return Promise.reject(new Error("Invalid page request."));
            const a = n - 1, l = M(this, T).get(a);
            if (l)
              return l;
            const F = this.messageHandler.sendWithPromise("GetPage", {
              pageIndex: a
            }).then((y) => {
              if (this.destroyed)
                throw new Error("Transport destroyed");
              const g = new PDFPageProxy(a, y, this, this._params.ownerDocument, this._params.pdfBug);
              return M(this, C).set(a, g), g;
            });
            return M(this, T).set(a, F), F;
          }
          getPageIndex(n) {
            return typeof n != "object" || n === null || !Number.isInteger(n.num) || n.num < 0 || !Number.isInteger(n.gen) || n.gen < 0 ? Promise.reject(new Error("Invalid pageIndex request.")) : this.messageHandler.sendWithPromise("GetPageIndex", {
              num: n.num,
              gen: n.gen
            });
          }
          getAnnotations(n, a) {
            return this.messageHandler.sendWithPromise("GetAnnotations", {
              pageIndex: n,
              intent: a
            });
          }
          saveDocument() {
            var n, a;
            return this.messageHandler.sendWithPromise("SaveDocument", {
              isPureXfa: !!this._htmlForXfa,
              numPages: this._numPages,
              annotationStorage: this.annotationStorage.serializable,
              filename: (a = (n = this._fullReader) == null ? void 0 : n.filename) != null ? a : null
            }).finally(() => {
              this.annotationStorage.resetModified();
            });
          }
          getFieldObjects() {
            return this._getFieldObjectsPromise || (this._getFieldObjectsPromise = this.messageHandler.sendWithPromise("GetFieldObjects", null));
          }
          hasJSActions() {
            return this._hasJSActionsPromise || (this._hasJSActionsPromise = this.messageHandler.sendWithPromise("HasJSActions", null));
          }
          getCalculationOrderIds() {
            return this.messageHandler.sendWithPromise("GetCalculationOrderIds", null);
          }
          getDestinations() {
            return this.messageHandler.sendWithPromise("GetDestinations", null);
          }
          getDestination(n) {
            return typeof n != "string" ? Promise.reject(new Error("Invalid destination request.")) : this.messageHandler.sendWithPromise("GetDestination", {
              id: n
            });
          }
          getPageLabels() {
            return this.messageHandler.sendWithPromise("GetPageLabels", null);
          }
          getPageLayout() {
            return this.messageHandler.sendWithPromise("GetPageLayout", null);
          }
          getPageMode() {
            return this.messageHandler.sendWithPromise("GetPageMode", null);
          }
          getViewerPreferences() {
            return this.messageHandler.sendWithPromise("GetViewerPreferences", null);
          }
          getOpenAction() {
            return this.messageHandler.sendWithPromise("GetOpenAction", null);
          }
          getAttachments() {
            return this.messageHandler.sendWithPromise("GetAttachments", null);
          }
          getJavaScript() {
            return this.messageHandler.sendWithPromise("GetJavaScript", null);
          }
          getDocJSActions() {
            return this.messageHandler.sendWithPromise("GetDocJSActions", null);
          }
          getPageJSActions(n) {
            return this.messageHandler.sendWithPromise("GetPageJSActions", {
              pageIndex: n
            });
          }
          getStructTree(n) {
            return this.messageHandler.sendWithPromise("GetStructTree", {
              pageIndex: n
            });
          }
          getOutline() {
            return this.messageHandler.sendWithPromise("GetOutline", null);
          }
          getOptionalContentConfig() {
            return this.messageHandler.sendWithPromise("GetOptionalContentConfig", null).then((n) => new _optional_content_config.OptionalContentConfig(n));
          }
          getPermissions() {
            return this.messageHandler.sendWithPromise("GetPermissions", null);
          }
          getMetadata() {
            return M(this, I) || ut(this, I, this.messageHandler.sendWithPromise("GetMetadata", null).then((n) => {
              var a, l, F, y;
              return {
                info: n[0],
                metadata: n[1] ? new _metadata.Metadata(n[1]) : null,
                contentDispositionFilename: (l = (a = this._fullReader) == null ? void 0 : a.filename) != null ? l : null,
                contentLength: (y = (F = this._fullReader) == null ? void 0 : F.contentLength) != null ? y : null
              };
            }));
          }
          getMarkInfo() {
            return this.messageHandler.sendWithPromise("GetMarkInfo", null);
          }
          async startCleanup(n = !1) {
            if (await this.messageHandler.sendWithPromise("Cleanup", null), !this.destroyed) {
              for (const a of M(this, C).values())
                if (!a.cleanup())
                  throw new Error(`startCleanup: Page ${a.pageNumber} is currently rendering.`);
              this.commonObjs.clear(), n || this.fontLoader.clear(), ut(this, I, null), this._getFieldObjectsPromise = null, this._hasJSActionsPromise = null;
            }
          }
          get loadingParams() {
            const n = this._params;
            return (0, _util.shadow)(this, "loadingParams", {
              disableAutoFetch: n.disableAutoFetch,
              enableXfa: n.enableXfa
            });
          }
        }
        d = new WeakMap(), C = new WeakMap(), T = new WeakMap(), I = new WeakMap();
        class PDFObjects {
          constructor() {
            at(this, m);
            at(this, x, /* @__PURE__ */ Object.create(null));
          }
          get(n, a = null) {
            if (a) {
              const F = lt(this, m, le).call(this, n);
              return F.capability.promise.then(() => a(F.data)), null;
            }
            const l = M(this, x)[n];
            if (!(l != null && l.capability.settled))
              throw new Error(`Requesting object that isn't resolved yet ${n}.`);
            return l.data;
          }
          has(n) {
            const a = M(this, x)[n];
            return (a == null ? void 0 : a.capability.settled) || !1;
          }
          resolve(n, a = null) {
            const l = lt(this, m, le).call(this, n);
            l.data = a, l.capability.resolve();
          }
          clear() {
            ut(this, x, /* @__PURE__ */ Object.create(null));
          }
        }
        x = new WeakMap(), m = new WeakSet(), le = function(n) {
          const a = M(this, x)[n];
          return a || (M(this, x)[n] = {
            capability: (0, _util.createPromiseCapability)(),
            data: null
          });
        };
        class RenderTask {
          constructor(n) {
            at(this, R, null);
            ut(this, R, n), this.onContinue = null;
          }
          get promise() {
            return M(this, R).capability.promise;
          }
          cancel() {
            M(this, R).cancel();
          }
          get separateAnnots() {
            const {
              separateAnnots: n
            } = M(this, R).operatorList;
            if (!n)
              return !1;
            const {
              annotationCanvasMap: a
            } = M(this, R);
            return n.form || n.canvas && (a == null ? void 0 : a.size) > 0;
          }
        }
        R = new WeakMap(), exports.RenderTask = RenderTask;
        const P = class {
          constructor({
            callback: n,
            params: a,
            objs: l,
            commonObjs: F,
            annotationCanvasMap: y,
            operatorList: g,
            pageIndex: o,
            canvasFactory: h,
            useRequestAnimationFrame: v = !1,
            pdfBug: O = !1,
            pageColors: D = null
          }) {
            this.callback = n, this.params = a, this.objs = l, this.commonObjs = F, this.annotationCanvasMap = y, this.operatorListIdx = null, this.operatorList = g, this._pageIndex = o, this.canvasFactory = h, this._pdfBug = O, this.pageColors = D, this.running = !1, this.graphicsReadyCallback = null, this.graphicsReady = !1, this._useRequestAnimationFrame = v === !0 && typeof window < "u", this.cancelled = !1, this.capability = (0, _util.createPromiseCapability)(), this.task = new RenderTask(this), this._cancelBound = this.cancel.bind(this), this._continueBound = this._continue.bind(this), this._scheduleNextBound = this._scheduleNext.bind(this), this._nextBound = this._next.bind(this), this._canvas = a.canvasContext.canvas;
          }
          get completed() {
            return this.capability.promise.catch(function() {
            });
          }
          initializeGraphics({
            transparency: n = !1,
            optionalContentConfig: a
          }) {
            var h;
            if (this.cancelled)
              return;
            if (this._canvas) {
              if (M(P, A).has(this._canvas))
                throw new Error("Cannot use the same canvas during multiple render() operations. Use different canvas or ensure previous operations were cancelled or completed.");
              M(P, A).add(this._canvas);
            }
            this._pdfBug && ((h = globalThis.StepperManager) == null ? void 0 : h.enabled) && (this.stepper = globalThis.StepperManager.create(this._pageIndex), this.stepper.init(this.operatorList), this.stepper.nextBreakPoint = this.stepper.getNextBreakPoint());
            const {
              canvasContext: l,
              viewport: F,
              transform: y,
              imageLayer: g,
              background: o
            } = this.params;
            this.gfx = new _canvas.CanvasGraphics(l, this.commonObjs, this.objs, this.canvasFactory, g, a, this.annotationCanvasMap, this.pageColors), this.gfx.beginDrawing({
              transform: y,
              viewport: F,
              transparency: n,
              background: o
            }), this.operatorListIdx = 0, this.graphicsReady = !0, this.graphicsReadyCallback && this.graphicsReadyCallback();
          }
          cancel(n = null) {
            this.running = !1, this.cancelled = !0, this.gfx && this.gfx.endDrawing(), this._canvas && M(P, A).delete(this._canvas), this.callback(n || new _display_utils.RenderingCancelledException(`Rendering cancelled, page ${this._pageIndex + 1}`, "canvas"));
          }
          operatorListChanged() {
            if (!this.graphicsReady) {
              this.graphicsReadyCallback || (this.graphicsReadyCallback = this._continueBound);
              return;
            }
            this.stepper && this.stepper.updateOperatorList(this.operatorList), !this.running && this._continue();
          }
          _continue() {
            this.running = !0, !this.cancelled && (this.task.onContinue ? this.task.onContinue(this._scheduleNextBound) : this._scheduleNext());
          }
          _scheduleNext() {
            this._useRequestAnimationFrame ? window.requestAnimationFrame(() => {
              this._nextBound().catch(this._cancelBound);
            }) : Promise.resolve().then(this._nextBound).catch(this._cancelBound);
          }
          async _next() {
            this.cancelled || (this.operatorListIdx = this.gfx.executeOperatorList(this.operatorList, this.operatorListIdx, this._continueBound, this.stepper), this.operatorListIdx === this.operatorList.argsArray.length && (this.running = !1, this.operatorList.lastChunk && (this.gfx.endDrawing(), this._canvas && M(P, A).delete(this._canvas), this.callback())));
          }
        };
        let InternalRenderTask = P;
        A = new WeakMap(), at(InternalRenderTask, A, /* @__PURE__ */ new WeakSet());
        const version = "2.15.349";
        exports.version = version;
        const build = "b8aa9c622";
        exports.build = build;
      },
      (t, i, r) => {
        var x, Te, S;
        Object.defineProperty(i, "__esModule", {
          value: !0
        }), i.PrintAnnotationStorage = i.AnnotationStorage = void 0;
        var e = r(1), d = r(8), C = r(10);
        class T {
          constructor() {
            at(this, x);
            this._storage = /* @__PURE__ */ new Map(), this._modified = !1, this.onSetModified = null, this.onResetModified = null;
          }
          getValue(A, P) {
            const u = this._storage.get(A);
            return u === void 0 ? P : Object.assign(P, u);
          }
          getRawValue(A) {
            return this._storage.get(A);
          }
          removeKey(A) {
            this._storage.delete(A), this._storage.size === 0 && this.resetModified();
          }
          setValue(A, P) {
            const u = this._storage.get(A);
            let n = !1;
            if (u !== void 0)
              for (const [a, l] of Object.entries(P))
                u[a] !== l && (n = !0, u[a] = l);
            else
              n = !0, this._storage.set(A, P);
            n && lt(this, x, Te).call(this);
          }
          has(A) {
            return this._storage.has(A);
          }
          getAll() {
            return this._storage.size > 0 ? (0, e.objectFromMap)(this._storage) : null;
          }
          get size() {
            return this._storage.size;
          }
          resetModified() {
            this._modified && (this._modified = !1, typeof this.onResetModified == "function" && this.onResetModified());
          }
          get print() {
            return new I(this);
          }
          get serializable() {
            if (this._storage.size === 0)
              return null;
            const A = /* @__PURE__ */ new Map();
            for (const [P, u] of this._storage) {
              const n = u instanceof d.AnnotationEditor ? u.serialize() : u;
              n && A.set(P, n);
            }
            return A;
          }
          static getHash(A) {
            if (!A)
              return "";
            const P = new C.MurmurHash3_64();
            for (const [u, n] of A)
              P.update(`${u}:${JSON.stringify(n)}`);
            return P.hexdigest();
          }
        }
        x = new WeakSet(), Te = function() {
          this._modified || (this._modified = !0, typeof this.onSetModified == "function" && this.onSetModified());
        }, i.AnnotationStorage = T;
        class I extends T {
          constructor(P) {
            super();
            at(this, S, null);
            ut(this, S, structuredClone(P.serializable));
          }
          get print() {
            (0, e.unreachable)("Should not call PrintAnnotationStorage.print");
          }
          get serializable() {
            return M(this, S);
          }
        }
        S = new WeakMap(), i.PrintAnnotationStorage = I;
      },
      (t, i, r) => {
        var T, I, x, m, S, R;
        Object.defineProperty(i, "__esModule", {
          value: !0
        }), i.AnnotationEditor = void 0;
        var e = r(9), d = r(1);
        const A = class {
          constructor(u) {
            at(this, T, this.focusin.bind(this));
            at(this, I, this.focusout.bind(this));
            at(this, x, !1);
            at(this, m, !1);
            at(this, S, !1);
            at(this, R, A._zIndex++);
            this.constructor === A && (0, d.unreachable)("Cannot initialize AnnotationEditor."), this.parent = u.parent, this.id = u.id, this.width = this.height = null, this.pageIndex = u.parent.pageIndex, this.name = u.name, this.div = null;
            const [n, a] = this.parent.viewportBaseDimensions;
            this.x = u.x / n, this.y = u.y / a, this.rotation = this.parent.viewport.rotation, this.isAttachedToDOM = !1;
          }
          static get _defaultLineColor() {
            return (0, d.shadow)(this, "_defaultLineColor", this._colorManager.getHexCode("CanvasText"));
          }
          setInBackground() {
            this.div.style.zIndex = 0;
          }
          setInForeground() {
            this.div.style.zIndex = M(this, R);
          }
          focusin(u) {
            M(this, x) ? ut(this, x, !1) : this.parent.setSelected(this);
          }
          focusout(u) {
            if (!this.isAttachedToDOM)
              return;
            const n = u.relatedTarget;
            n != null && n.closest(`#${this.id}`) || (u.preventDefault(), this.parent.isMultipleSelection || this.commitOrRemove());
          }
          commitOrRemove() {
            this.isEmpty() ? this.remove() : this.commit();
          }
          commit() {
            this.parent.addToAnnotationStorage(this);
          }
          dragstart(u) {
            const n = this.parent.div.getBoundingClientRect();
            this.startX = u.clientX - n.x, this.startY = u.clientY - n.y, u.dataTransfer.setData("text/plain", this.id), u.dataTransfer.effectAllowed = "move";
          }
          setAt(u, n, a, l) {
            const [F, y] = this.parent.viewportBaseDimensions;
            [a, l] = this.screenToPageTranslation(a, l), this.x = (u + a) / F, this.y = (n + l) / y, this.div.style.left = `${100 * this.x}%`, this.div.style.top = `${100 * this.y}%`;
          }
          translate(u, n) {
            const [a, l] = this.parent.viewportBaseDimensions;
            [u, n] = this.screenToPageTranslation(u, n), this.x += u / a, this.y += n / l, this.div.style.left = `${100 * this.x}%`, this.div.style.top = `${100 * this.y}%`;
          }
          screenToPageTranslation(u, n) {
            const {
              rotation: a
            } = this.parent.viewport;
            switch (a) {
              case 90:
                return [n, -u];
              case 180:
                return [-u, -n];
              case 270:
                return [-n, u];
              default:
                return [u, n];
            }
          }
          setDims(u, n) {
            const [a, l] = this.parent.viewportBaseDimensions;
            this.div.style.width = `${100 * u / a}%`, this.div.style.height = `${100 * n / l}%`;
          }
          getInitialTranslation() {
            return [0, 0];
          }
          render() {
            this.div = document.createElement("div"), this.div.setAttribute("data-editor-rotation", (360 - this.rotation) % 360), this.div.className = this.name, this.div.setAttribute("id", this.id), this.div.setAttribute("tabIndex", 0), this.setInForeground(), this.div.addEventListener("focusin", M(this, T)), this.div.addEventListener("focusout", M(this, I));
            const [u, n] = this.getInitialTranslation();
            return this.translate(u, n), (0, e.bindEvents)(this, this.div, ["dragstart", "pointerdown"]), this.div;
          }
          pointerdown(u) {
            const n = e.KeyboardManager.platform.isMac;
            if (u.button !== 0 || u.ctrlKey && n) {
              u.preventDefault();
              return;
            }
            u.ctrlKey && !n || u.shiftKey || u.metaKey && n ? this.parent.toggleSelected(this) : this.parent.setSelected(this), ut(this, x, !0);
          }
          getRect(u, n) {
            const [a, l] = this.parent.viewportBaseDimensions, [F, y] = this.parent.pageDimensions, g = F * u / a, o = y * n / l, h = this.x * F, v = this.y * y, O = this.width * F, D = this.height * y;
            switch (this.rotation) {
              case 0:
                return [h + g, y - v - o - D, h + g + O, y - v - o];
              case 90:
                return [h + o, y - v + g, h + o + D, y - v + g + O];
              case 180:
                return [h - g - O, y - v + o, h - g, y - v + o + D];
              case 270:
                return [h - o - D, y - v - g - O, h - o, y - v - g];
              default:
                throw new Error("Invalid rotation");
            }
          }
          getRectInCurrentCoords(u, n) {
            const [a, l, F, y] = u, g = F - a, o = y - l;
            switch (this.rotation) {
              case 0:
                return [a, n - y, g, o];
              case 90:
                return [a, n - l, o, g];
              case 180:
                return [F, n - l, g, o];
              case 270:
                return [F, n - y, o, g];
              default:
                throw new Error("Invalid rotation");
            }
          }
          onceAdded() {
          }
          isEmpty() {
            return !1;
          }
          enableEditMode() {
            ut(this, S, !0);
          }
          disableEditMode() {
            ut(this, S, !1);
          }
          isInEditMode() {
            return M(this, S);
          }
          shouldGetKeyboardEvents() {
            return !1;
          }
          needsToBeRebuilt() {
            return this.div && !this.isAttachedToDOM;
          }
          rebuild() {
            var u;
            (u = this.div) == null || u.addEventListener("focusin", M(this, T));
          }
          serialize() {
            (0, d.unreachable)("An editor must be serializable");
          }
          static deserialize(u, n) {
            const a = new this.prototype.constructor({
              parent: n,
              id: n.getNextId()
            });
            a.rotation = u.rotation;
            const [l, F] = n.pageDimensions, [y, g, o, h] = a.getRectInCurrentCoords(u.rect, F);
            return a.x = y / l, a.y = g / F, a.width = o / l, a.height = h / F, a;
          }
          remove() {
            this.div.removeEventListener("focusin", M(this, T)), this.div.removeEventListener("focusout", M(this, I)), this.isEmpty() || this.commit(), this.parent.remove(this);
          }
          select() {
            var u;
            (u = this.div) == null || u.classList.add("selectedEditor");
          }
          unselect() {
            var u;
            (u = this.div) == null || u.classList.remove("selectedEditor");
          }
          updateParams(u, n) {
          }
          disableEditing() {
          }
          enableEditing() {
          }
          getIdForTextLayer() {
            return this.id;
          }
          get propertiesToUpdate() {
            return {};
          }
          get contentDiv() {
            return this.div;
          }
          get isEditing() {
            return M(this, m);
          }
          set isEditing(u) {
            ut(this, m, u), u ? (this.parent.setSelected(this), this.parent.setActiveEditor(this)) : this.parent.setActiveEditor(null);
          }
        };
        let C = A;
        T = new WeakMap(), I = new WeakMap(), x = new WeakMap(), m = new WeakMap(), S = new WeakMap(), R = new WeakMap(), It(C, "_colorManager", new e.ColorManager()), It(C, "_zIndex", 1), i.AnnotationEditor = C;
      },
      (t, i, r) => {
        var P, u, n, a, l, F, we, o, v, O, D, L, U, J, V, N, G, k, z, W, st, ot, ct, mt, bt, B, b, Pe, w, ce, c, Wt, _, Qt, j, xe, $, ke, tt, he, et, Jt, pt, te;
        Object.defineProperty(i, "__esModule", {
          value: !0
        }), i.KeyboardManager = i.CommandManager = i.ColorManager = i.AnnotationEditorUIManager = void 0, i.bindEvents = C, i.opacityToHex = T;
        var e = r(1), d = r(4);
        function C(yt, Z, it) {
          for (const At of it)
            Z.addEventListener(At, yt[At].bind(yt));
        }
        function T(yt) {
          return Math.round(Math.min(255, Math.max(1, 255 * yt))).toString(16).padStart(2, "0");
        }
        class I {
          constructor() {
            at(this, P, 0);
          }
          getId() {
            return `${e.AnnotationEditorPrefix}${oe(this, P)._++}`;
          }
        }
        P = new WeakMap();
        class x {
          constructor(Z = 128) {
            at(this, u, []);
            at(this, n, !1);
            at(this, a, void 0);
            at(this, l, -1);
            ut(this, a, Z);
          }
          add({
            cmd: Z,
            undo: it,
            mustExec: At,
            type: wt = NaN,
            overwriteIfSameType: St = !1,
            keepUndo: kt = !1
          }) {
            if (At && Z(), M(this, n))
              return;
            const Ft = {
              cmd: Z,
              undo: it,
              type: wt
            };
            if (M(this, l) === -1) {
              M(this, u).length > 0 && (M(this, u).length = 0), ut(this, l, 0), M(this, u).push(Ft);
              return;
            }
            if (St && M(this, u)[M(this, l)].type === wt) {
              kt && (Ft.undo = M(this, u)[M(this, l)].undo), M(this, u)[M(this, l)] = Ft;
              return;
            }
            const Bt = M(this, l) + 1;
            Bt === M(this, a) ? M(this, u).splice(0, 1) : (ut(this, l, Bt), Bt < M(this, u).length && M(this, u).splice(Bt)), M(this, u).push(Ft);
          }
          undo() {
            M(this, l) !== -1 && (ut(this, n, !0), M(this, u)[M(this, l)].undo(), ut(this, n, !1), ut(this, l, M(this, l) - 1));
          }
          redo() {
            M(this, l) < M(this, u).length - 1 && (ut(this, l, M(this, l) + 1), ut(this, n, !0), M(this, u)[M(this, l)].cmd(), ut(this, n, !1));
          }
          hasSomethingToUndo() {
            return M(this, l) !== -1;
          }
          hasSomethingToRedo() {
            return M(this, l) < M(this, u).length - 1;
          }
          destroy() {
            ut(this, u, null);
          }
        }
        u = new WeakMap(), n = new WeakMap(), a = new WeakMap(), l = new WeakMap(), i.CommandManager = x;
        const g = class {
          constructor(Z) {
            at(this, F);
            this.buffer = [], this.callbacks = /* @__PURE__ */ new Map(), this.allKeys = /* @__PURE__ */ new Set();
            const it = g.platform.isMac;
            for (const [At, wt] of Z)
              for (const St of At) {
                const kt = St.startsWith("mac+");
                it && kt ? (this.callbacks.set(St.slice(4), wt), this.allKeys.add(St.split("+").at(-1))) : !it && !kt && (this.callbacks.set(St, wt), this.allKeys.add(St.split("+").at(-1)));
              }
          }
          static get platform() {
            const Z = typeof navigator < "u" ? navigator.platform : "";
            return (0, e.shadow)(this, "platform", {
              isWin: Z.includes("Win"),
              isMac: Z.includes("Mac")
            });
          }
          exec(Z, it) {
            if (!this.allKeys.has(it.key))
              return;
            const At = this.callbacks.get(lt(this, F, we).call(this, it));
            !At || (At.bind(Z)(), it.stopPropagation(), it.preventDefault());
          }
        };
        let m = g;
        F = new WeakSet(), we = function(Z) {
          Z.altKey && this.buffer.push("alt"), Z.ctrlKey && this.buffer.push("ctrl"), Z.metaKey && this.buffer.push("meta"), Z.shiftKey && this.buffer.push("shift"), this.buffer.push(Z.key);
          const it = this.buffer.join("+");
          return this.buffer.length = 0, it;
        }, i.KeyboardManager = m;
        class S {
          constructor() {
            at(this, o, null);
          }
          copy(Z) {
            !Z || (Array.isArray(Z) ? ut(this, o, Z.map((it) => it.serialize())) : ut(this, o, [Z.serialize()]), ut(this, o, M(this, o).filter((it) => !!it)), M(this, o).length === 0 && ut(this, o, null));
          }
          paste() {
            return M(this, o);
          }
          isEmpty() {
            return M(this, o) === null;
          }
          destroy() {
            ut(this, o, null);
          }
        }
        o = new WeakMap();
        const h = class {
          get _colors() {
            const Z = /* @__PURE__ */ new Map([["CanvasText", null], ["Canvas", null]]);
            return (0, d.getColorValues)(Z), (0, e.shadow)(this, "_colors", Z);
          }
          convert(Z) {
            const it = (0, d.getRGB)(Z);
            if (!window.matchMedia("(forced-colors: active)").matches)
              return it;
            for (const [At, wt] of this._colors)
              if (wt.every((St, kt) => St === it[kt]))
                return h._colorsMapping.get(At);
            return it;
          }
          getHexCode(Z) {
            const it = this._colors.get(Z);
            return it ? e.Util.makeHexColor(...it) : Z;
          }
        };
        let R = h;
        It(R, "_colorsMapping", /* @__PURE__ */ new Map([["CanvasText", [0, 0, 0]], ["Canvas", [255, 255, 255]]])), i.ColorManager = R;
        const rt = class {
          constructor(Z, it) {
            at(this, b);
            at(this, w);
            at(this, c);
            at(this, _);
            at(this, j);
            at(this, $);
            at(this, tt);
            at(this, et);
            at(this, pt);
            at(this, v, null);
            at(this, O, /* @__PURE__ */ new Map());
            at(this, D, /* @__PURE__ */ new Map());
            at(this, L, new S());
            at(this, U, new x());
            at(this, J, 0);
            at(this, V, null);
            at(this, N, null);
            at(this, G, new I());
            at(this, k, !1);
            at(this, z, e.AnnotationEditorType.NONE);
            at(this, W, /* @__PURE__ */ new Set());
            at(this, st, this.keydown.bind(this));
            at(this, ot, this.onEditingAction.bind(this));
            at(this, ct, this.onPageChanging.bind(this));
            at(this, mt, this.onTextLayerRendered.bind(this));
            at(this, bt, {
              isEditing: !1,
              isEmpty: !0,
              hasEmptyClipboard: !0,
              hasSomethingToUndo: !1,
              hasSomethingToRedo: !1,
              hasSelectedEditor: !1
            });
            at(this, B, null);
            ut(this, B, Z), ut(this, N, it), M(this, N)._on("editingaction", M(this, ot)), M(this, N)._on("pagechanging", M(this, ct)), M(this, N)._on("textlayerrendered", M(this, mt));
          }
          destroy() {
            lt(this, w, ce).call(this), M(this, N)._off("editingaction", M(this, ot)), M(this, N)._off("pagechanging", M(this, ct)), M(this, N)._off("textlayerrendered", M(this, mt));
            for (const Z of M(this, D).values())
              Z.destroy();
            M(this, D).clear(), M(this, O).clear(), ut(this, v, null), M(this, W).clear(), M(this, L).destroy(), M(this, U).destroy();
          }
          onPageChanging({
            pageNumber: Z
          }) {
            ut(this, J, Z - 1);
          }
          onTextLayerRendered({
            pageNumber: Z
          }) {
            const it = Z - 1, At = M(this, D).get(it);
            At == null || At.onTextLayerRendered();
          }
          focusMainContainer() {
            M(this, B).focus();
          }
          keydown(Z) {
            var it;
            (it = this.getActive()) != null && it.shouldGetKeyboardEvents() || rt._keyboardManager.exec(this, Z);
          }
          onEditingAction(Z) {
            ["undo", "redo", "cut", "copy", "paste", "delete", "selectAll"].includes(Z.name) && this[Z.name]();
          }
          setEditingState(Z) {
            Z ? (lt(this, b, Pe).call(this), lt(this, c, Wt).call(this, {
              isEditing: M(this, z) !== e.AnnotationEditorType.NONE,
              isEmpty: lt(this, et, Jt).call(this),
              hasSomethingToUndo: M(this, U).hasSomethingToUndo(),
              hasSomethingToRedo: M(this, U).hasSomethingToRedo(),
              hasSelectedEditor: !1,
              hasEmptyClipboard: M(this, L).isEmpty()
            })) : (lt(this, w, ce).call(this), lt(this, c, Wt).call(this, {
              isEditing: !1
            }));
          }
          registerEditorTypes(Z) {
            ut(this, V, Z);
            for (const it of M(this, V))
              lt(this, _, Qt).call(this, it.defaultPropertiesToUpdate);
          }
          getId() {
            return M(this, G).getId();
          }
          addLayer(Z) {
            M(this, D).set(Z.pageIndex, Z), M(this, k) ? Z.enable() : Z.disable();
          }
          removeLayer(Z) {
            M(this, D).delete(Z.pageIndex);
          }
          updateMode(Z) {
            if (ut(this, z, Z), Z === e.AnnotationEditorType.NONE)
              this.setEditingState(!1), lt(this, $, ke).call(this);
            else {
              this.setEditingState(!0), lt(this, j, xe).call(this);
              for (const it of M(this, D).values())
                it.updateMode(Z);
            }
          }
          updateToolbar(Z) {
            Z !== M(this, z) && M(this, N).dispatch("switchannotationeditormode", {
              source: this,
              mode: Z
            });
          }
          updateParams(Z, it) {
            for (const At of M(this, W))
              At.updateParams(Z, it);
            for (const At of M(this, V))
              At.updateDefaultParams(Z, it);
          }
          getEditors(Z) {
            const it = [];
            for (const At of M(this, O).values())
              At.pageIndex === Z && it.push(At);
            return it;
          }
          getEditor(Z) {
            return M(this, O).get(Z);
          }
          addEditor(Z) {
            M(this, O).set(Z.id, Z);
          }
          removeEditor(Z) {
            M(this, O).delete(Z.id), this.unselect(Z);
          }
          setActiveEditor(Z) {
            M(this, v) !== Z && (ut(this, v, Z), Z && lt(this, _, Qt).call(this, Z.propertiesToUpdate));
          }
          toggleSelected(Z) {
            if (M(this, W).has(Z)) {
              M(this, W).delete(Z), Z.unselect(), lt(this, c, Wt).call(this, {
                hasSelectedEditor: this.hasSelection
              });
              return;
            }
            M(this, W).add(Z), Z.select(), lt(this, _, Qt).call(this, Z.propertiesToUpdate), lt(this, c, Wt).call(this, {
              hasSelectedEditor: !0
            });
          }
          setSelected(Z) {
            for (const it of M(this, W))
              it !== Z && it.unselect();
            M(this, W).clear(), M(this, W).add(Z), Z.select(), lt(this, _, Qt).call(this, Z.propertiesToUpdate), lt(this, c, Wt).call(this, {
              hasSelectedEditor: !0
            });
          }
          isSelected(Z) {
            return M(this, W).has(Z);
          }
          unselect(Z) {
            Z.unselect(), M(this, W).delete(Z), lt(this, c, Wt).call(this, {
              hasSelectedEditor: this.hasSelection
            });
          }
          get hasSelection() {
            return M(this, W).size !== 0;
          }
          undo() {
            M(this, U).undo(), lt(this, c, Wt).call(this, {
              hasSomethingToUndo: M(this, U).hasSomethingToUndo(),
              hasSomethingToRedo: !0,
              isEmpty: lt(this, et, Jt).call(this)
            });
          }
          redo() {
            M(this, U).redo(), lt(this, c, Wt).call(this, {
              hasSomethingToUndo: !0,
              hasSomethingToRedo: M(this, U).hasSomethingToRedo(),
              isEmpty: lt(this, et, Jt).call(this)
            });
          }
          addCommands(Z) {
            M(this, U).add(Z), lt(this, c, Wt).call(this, {
              hasSomethingToUndo: !0,
              hasSomethingToRedo: !1,
              isEmpty: lt(this, et, Jt).call(this)
            });
          }
          delete() {
            if (M(this, v) && M(this, v).commitOrRemove(), !this.hasSelection)
              return;
            const Z = [...M(this, W)], it = () => {
              for (const wt of Z)
                wt.remove();
            }, At = () => {
              for (const wt of Z)
                lt(this, tt, he).call(this, wt);
            };
            this.addCommands({
              cmd: it,
              undo: At,
              mustExec: !0
            });
          }
          copy() {
            if (M(this, v) && M(this, v).commitOrRemove(), this.hasSelection) {
              const Z = [];
              for (const it of M(this, W))
                it.isEmpty() || Z.push(it);
              if (Z.length === 0)
                return;
              M(this, L).copy(Z), lt(this, c, Wt).call(this, {
                hasEmptyClipboard: !1
              });
            }
          }
          cut() {
            this.copy(), this.delete();
          }
          paste() {
            if (M(this, L).isEmpty())
              return;
            this.unselectAll();
            const Z = M(this, D).get(M(this, J)), it = M(this, L).paste().map((St) => Z.deserialize(St)), At = () => {
              for (const St of it)
                lt(this, tt, he).call(this, St);
              lt(this, pt, te).call(this, it);
            }, wt = () => {
              for (const St of it)
                St.remove();
            };
            this.addCommands({
              cmd: At,
              undo: wt,
              mustExec: !0
            });
          }
          selectAll() {
            for (const Z of M(this, W))
              Z.commit();
            lt(this, pt, te).call(this, M(this, O).values());
          }
          unselectAll() {
            if (M(this, v)) {
              M(this, v).commitOrRemove();
              return;
            }
            if (lt(this, pt, te).size !== 0) {
              for (const Z of M(this, W))
                Z.unselect();
              M(this, W).clear(), lt(this, c, Wt).call(this, {
                hasSelectedEditor: !1
              });
            }
          }
          isActive(Z) {
            return M(this, v) === Z;
          }
          getActive() {
            return M(this, v);
          }
          getMode() {
            return M(this, z);
          }
        };
        let A = rt;
        v = new WeakMap(), O = new WeakMap(), D = new WeakMap(), L = new WeakMap(), U = new WeakMap(), J = new WeakMap(), V = new WeakMap(), N = new WeakMap(), G = new WeakMap(), k = new WeakMap(), z = new WeakMap(), W = new WeakMap(), st = new WeakMap(), ot = new WeakMap(), ct = new WeakMap(), mt = new WeakMap(), bt = new WeakMap(), B = new WeakMap(), b = new WeakSet(), Pe = function() {
          M(this, B).addEventListener("keydown", M(this, st));
        }, w = new WeakSet(), ce = function() {
          M(this, B).removeEventListener("keydown", M(this, st));
        }, c = new WeakSet(), Wt = function(Z) {
          Object.entries(Z).some(([At, wt]) => M(this, bt)[At] !== wt) && M(this, N).dispatch("annotationeditorstateschanged", {
            source: this,
            details: Object.assign(M(this, bt), Z)
          });
        }, _ = new WeakSet(), Qt = function(Z) {
          M(this, N).dispatch("annotationeditorparamschanged", {
            source: this,
            details: Z
          });
        }, j = new WeakSet(), xe = function() {
          if (!M(this, k)) {
            ut(this, k, !0);
            for (const Z of M(this, D).values())
              Z.enable();
          }
        }, $ = new WeakSet(), ke = function() {
          if (this.unselectAll(), M(this, k)) {
            ut(this, k, !1);
            for (const Z of M(this, D).values())
              Z.disable();
          }
        }, tt = new WeakSet(), he = function(Z) {
          const it = M(this, D).get(Z.pageIndex);
          it ? it.addOrRebuild(Z) : this.addEditor(Z);
        }, et = new WeakSet(), Jt = function() {
          if (M(this, O).size === 0)
            return !0;
          if (M(this, O).size === 1)
            for (const Z of M(this, O).values())
              return Z.isEmpty();
          return !1;
        }, pt = new WeakSet(), te = function(Z) {
          M(this, W).clear();
          for (const it of Z)
            it.isEmpty() || (M(this, W).add(it), it.select());
          lt(this, c, Wt).call(this, {
            hasSelectedEditor: !0
          });
        }, It(A, "_keyboardManager", new m([[["ctrl+a", "mac+meta+a"], rt.prototype.selectAll], [["ctrl+c", "mac+meta+c"], rt.prototype.copy], [["ctrl+v", "mac+meta+v"], rt.prototype.paste], [["ctrl+x", "mac+meta+x"], rt.prototype.cut], [["ctrl+z", "mac+meta+z"], rt.prototype.undo], [["ctrl+y", "ctrl+shift+Z", "mac+meta+shift+Z"], rt.prototype.redo], [["Backspace", "alt+Backspace", "ctrl+Backspace", "shift+Backspace", "mac+Backspace", "mac+alt+Backspace", "mac+ctrl+Backspace", "Delete", "ctrl+Delete", "shift+Delete"], rt.prototype.delete], [["Escape", "mac+Escape"], rt.prototype.unselectAll]])), i.AnnotationEditorUIManager = A;
      },
      (t, i, r) => {
        Object.defineProperty(i, "__esModule", {
          value: !0
        }), i.MurmurHash3_64 = void 0;
        var e = r(1);
        const d = 3285377520, C = 4294901760, T = 65535;
        class I {
          constructor(m) {
            this.h1 = m ? m & 4294967295 : d, this.h2 = m ? m & 4294967295 : d;
          }
          update(m) {
            let S, R;
            if (typeof m == "string") {
              S = new Uint8Array(m.length * 2), R = 0;
              for (let v = 0, O = m.length; v < O; v++) {
                const D = m.charCodeAt(v);
                D <= 255 ? S[R++] = D : (S[R++] = D >>> 8, S[R++] = D & 255);
              }
            } else if ((0, e.isArrayBuffer)(m))
              S = m.slice(), R = S.byteLength;
            else
              throw new Error("Wrong data format in MurmurHash3_64_update. Input must be a string or array.");
            const A = R >> 2, P = R - A * 4, u = new Uint32Array(S.buffer, 0, A);
            let n = 0, a = 0, l = this.h1, F = this.h2;
            const y = 3432918353, g = 461845907, o = y & T, h = g & T;
            for (let v = 0; v < A; v++)
              v & 1 ? (n = u[v], n = n * y & C | n * o & T, n = n << 15 | n >>> 17, n = n * g & C | n * h & T, l ^= n, l = l << 13 | l >>> 19, l = l * 5 + 3864292196) : (a = u[v], a = a * y & C | a * o & T, a = a << 15 | a >>> 17, a = a * g & C | a * h & T, F ^= a, F = F << 13 | F >>> 19, F = F * 5 + 3864292196);
            switch (n = 0, P) {
              case 3:
                n ^= S[A * 4 + 2] << 16;
              case 2:
                n ^= S[A * 4 + 1] << 8;
              case 1:
                n ^= S[A * 4], n = n * y & C | n * o & T, n = n << 15 | n >>> 17, n = n * g & C | n * h & T, A & 1 ? l ^= n : F ^= n;
            }
            this.h1 = l, this.h2 = F;
          }
          hexdigest() {
            let m = this.h1, S = this.h2;
            m ^= S >>> 1, m = m * 3981806797 & C | m * 36045 & T, S = S * 4283543511 & C | ((S << 16 | m >>> 16) * 2950163797 & C) >>> 16, m ^= S >>> 1, m = m * 444984403 & C | m * 60499 & T, S = S * 3301882366 & C | ((S << 16 | m >>> 16) * 3120437893 & C) >>> 16, m ^= S >>> 1;
            const R = (m >>> 0).toString(16), A = (S >>> 0).toString(16);
            return R.padStart(8, "0") + A.padStart(8, "0");
          }
        }
        i.MurmurHash3_64 = I;
      },
      (t, i, r) => {
        Object.defineProperty(i, "__esModule", {
          value: !0
        }), i.FontLoader = i.FontFaceObject = void 0;
        var e = r(1);
        class d {
          constructor({
            docId: x,
            onUnsupportedFeature: m,
            ownerDocument: S = globalThis.document,
            styleElement: R = null
          }) {
            this.constructor === d && (0, e.unreachable)("Cannot initialize BaseFontLoader."), this.docId = x, this._onUnsupportedFeature = m, this._document = S, this.nativeFontFaces = [], this.styleElement = null;
          }
          addNativeFontFace(x) {
            this.nativeFontFaces.push(x), this._document.fonts.add(x);
          }
          insertRule(x) {
            let m = this.styleElement;
            m || (m = this.styleElement = this._document.createElement("style"), m.id = `PDFJS_FONT_STYLE_TAG_${this.docId}`, this._document.documentElement.getElementsByTagName("head")[0].append(m));
            const S = m.sheet;
            S.insertRule(x, S.cssRules.length);
          }
          clear() {
            for (const x of this.nativeFontFaces)
              this._document.fonts.delete(x);
            this.nativeFontFaces.length = 0, this.styleElement && (this.styleElement.remove(), this.styleElement = null);
          }
          async bind(x) {
            if (x.attached || x.missingFile)
              return;
            if (x.attached = !0, this.isFontLoadingAPISupported) {
              const S = x.createNativeFontFace();
              if (S) {
                this.addNativeFontFace(S);
                try {
                  await S.loaded;
                } catch (R) {
                  throw this._onUnsupportedFeature({
                    featureId: e.UNSUPPORTED_FEATURES.errorFontLoadNative
                  }), (0, e.warn)(`Failed to load font '${S.family}': '${R}'.`), x.disableFontFace = !0, R;
                }
              }
              return;
            }
            const m = x.createFontFaceRule();
            if (m) {
              if (this.insertRule(m), this.isSyncFontLoadingSupported)
                return;
              await new Promise((S) => {
                const R = this._queueLoadingCallback(S);
                this._prepareFontLoadEvent([m], [x], R);
              });
            }
          }
          _queueLoadingCallback(x) {
            (0, e.unreachable)("Abstract method `_queueLoadingCallback`.");
          }
          get isFontLoadingAPISupported() {
            var m;
            const x = !!((m = this._document) != null && m.fonts);
            return (0, e.shadow)(this, "isFontLoadingAPISupported", x);
          }
          get isSyncFontLoadingSupported() {
            (0, e.unreachable)("Abstract method `isSyncFontLoadingSupported`.");
          }
          get _loadTestFont() {
            (0, e.unreachable)("Abstract method `_loadTestFont`.");
          }
          _prepareFontLoadEvent(x, m, S) {
            (0, e.unreachable)("Abstract method `_prepareFontLoadEvent`.");
          }
        }
        let C;
        i.FontLoader = C, i.FontLoader = C = class extends d {
          constructor(x) {
            super(x), this.loadingContext = {
              requests: [],
              nextRequestId: 0
            }, this.loadTestFontId = 0;
          }
          get isSyncFontLoadingSupported() {
            let x = !1;
            if (typeof navigator > "u")
              x = !0;
            else {
              const m = /Mozilla\/5.0.*?rv:(\d+).*? Gecko/.exec(navigator.userAgent);
              (m == null ? void 0 : m[1]) >= 14 && (x = !0);
            }
            return (0, e.shadow)(this, "isSyncFontLoadingSupported", x);
          }
          _queueLoadingCallback(x) {
            function m() {
              for ((0, e.assert)(!R.done, "completeRequest() cannot be called twice."), R.done = !0; S.requests.length > 0 && S.requests[0].done; ) {
                const A = S.requests.shift();
                setTimeout(A.callback, 0);
              }
            }
            const S = this.loadingContext, R = {
              id: `pdfjs-font-loading-${S.nextRequestId++}`,
              done: !1,
              complete: m,
              callback: x
            };
            return S.requests.push(R), R;
          }
          get _loadTestFont() {
            const x = function() {
              return atob("T1RUTwALAIAAAwAwQ0ZGIDHtZg4AAAOYAAAAgUZGVE1lkzZwAAAEHAAAABxHREVGABQAFQAABDgAAAAeT1MvMlYNYwkAAAEgAAAAYGNtYXABDQLUAAACNAAAAUJoZWFk/xVFDQAAALwAAAA2aGhlYQdkA+oAAAD0AAAAJGhtdHgD6AAAAAAEWAAAAAZtYXhwAAJQAAAAARgAAAAGbmFtZVjmdH4AAAGAAAAAsXBvc3T/hgAzAAADeAAAACAAAQAAAAEAALZRFsRfDzz1AAsD6AAAAADOBOTLAAAAAM4KHDwAAAAAA+gDIQAAAAgAAgAAAAAAAAABAAADIQAAAFoD6AAAAAAD6AABAAAAAAAAAAAAAAAAAAAAAQAAUAAAAgAAAAQD6AH0AAUAAAKKArwAAACMAooCvAAAAeAAMQECAAACAAYJAAAAAAAAAAAAAQAAAAAAAAAAAAAAAFBmRWQAwAAuAC4DIP84AFoDIQAAAAAAAQAAAAAAAAAAACAAIAABAAAADgCuAAEAAAAAAAAAAQAAAAEAAAAAAAEAAQAAAAEAAAAAAAIAAQAAAAEAAAAAAAMAAQAAAAEAAAAAAAQAAQAAAAEAAAAAAAUAAQAAAAEAAAAAAAYAAQAAAAMAAQQJAAAAAgABAAMAAQQJAAEAAgABAAMAAQQJAAIAAgABAAMAAQQJAAMAAgABAAMAAQQJAAQAAgABAAMAAQQJAAUAAgABAAMAAQQJAAYAAgABWABYAAAAAAAAAwAAAAMAAAAcAAEAAAAAADwAAwABAAAAHAAEACAAAAAEAAQAAQAAAC7//wAAAC7////TAAEAAAAAAAABBgAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMAAAAAAAD/gwAyAAAAAQAAAAAAAAAAAAAAAAAAAAABAAQEAAEBAQJYAAEBASH4DwD4GwHEAvgcA/gXBIwMAYuL+nz5tQXkD5j3CBLnEQACAQEBIVhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYAAABAQAADwACAQEEE/t3Dov6fAH6fAT+fPp8+nwHDosMCvm1Cvm1DAz6fBQAAAAAAAABAAAAAMmJbzEAAAAAzgTjFQAAAADOBOQpAAEAAAAAAAAADAAUAAQAAAABAAAAAgABAAAAAAAAAAAD6AAAAAAAAA==");
            };
            return (0, e.shadow)(this, "_loadTestFont", x());
          }
          _prepareFontLoadEvent(x, m, S) {
            function R(V, N) {
              return V.charCodeAt(N) << 24 | V.charCodeAt(N + 1) << 16 | V.charCodeAt(N + 2) << 8 | V.charCodeAt(N + 3) & 255;
            }
            function A(V, N, G, k) {
              const z = V.substring(0, N), W = V.substring(N + G);
              return z + k + W;
            }
            let P, u;
            const n = this._document.createElement("canvas");
            n.width = 1, n.height = 1;
            const a = n.getContext("2d");
            let l = 0;
            function F(V, N) {
              if (l++, l > 30) {
                (0, e.warn)("Load test font never loaded."), N();
                return;
              }
              if (a.font = "30px " + V, a.fillText(".", 0, 20), a.getImageData(0, 0, 1, 1).data[3] > 0) {
                N();
                return;
              }
              setTimeout(F.bind(null, V, N));
            }
            const y = `lt${Date.now()}${this.loadTestFontId++}`;
            let g = this._loadTestFont;
            g = A(g, 976, y.length, y);
            const h = 16, v = 1482184792;
            let O = R(g, h);
            for (P = 0, u = y.length - 3; P < u; P += 4)
              O = O - v + R(y, P) | 0;
            P < y.length && (O = O - v + R(y + "XXX", P) | 0), g = A(g, h, 4, (0, e.string32)(O));
            const D = `url(data:font/opentype;base64,${btoa(g)});`, L = `@font-face {font-family:"${y}";src:${D}}`;
            this.insertRule(L);
            const U = [];
            for (const V of m)
              U.push(V.loadedName);
            U.push(y);
            const J = this._document.createElement("div");
            J.style.visibility = "hidden", J.style.width = J.style.height = "10px", J.style.position = "absolute", J.style.top = J.style.left = "0px";
            for (const V of U) {
              const N = this._document.createElement("span");
              N.textContent = "Hi", N.style.fontFamily = V, J.append(N);
            }
            this._document.body.append(J), F(y, () => {
              J.remove(), S.complete();
            });
          }
        };
        class T {
          constructor(x, {
            isEvalSupported: m = !0,
            disableFontFace: S = !1,
            ignoreErrors: R = !1,
            onUnsupportedFeature: A,
            fontRegistry: P = null
          }) {
            this.compiledGlyphs = /* @__PURE__ */ Object.create(null);
            for (const u in x)
              this[u] = x[u];
            this.isEvalSupported = m !== !1, this.disableFontFace = S === !0, this.ignoreErrors = R === !0, this._onUnsupportedFeature = A, this.fontRegistry = P;
          }
          createNativeFontFace() {
            if (!this.data || this.disableFontFace)
              return null;
            let x;
            if (!this.cssFontInfo)
              x = new FontFace(this.loadedName, this.data, {});
            else {
              const m = {
                weight: this.cssFontInfo.fontWeight
              };
              this.cssFontInfo.italicAngle && (m.style = `oblique ${this.cssFontInfo.italicAngle}deg`), x = new FontFace(this.cssFontInfo.fontFamily, this.data, m);
            }
            return this.fontRegistry && this.fontRegistry.registerFont(this), x;
          }
          createFontFaceRule() {
            if (!this.data || this.disableFontFace)
              return null;
            const x = (0, e.bytesToString)(this.data), m = `url(data:${this.mimetype};base64,${btoa(x)});`;
            let S;
            if (!this.cssFontInfo)
              S = `@font-face {font-family:"${this.loadedName}";src:${m}}`;
            else {
              let R = `font-weight: ${this.cssFontInfo.fontWeight};`;
              this.cssFontInfo.italicAngle && (R += `font-style: oblique ${this.cssFontInfo.italicAngle}deg;`), S = `@font-face {font-family:"${this.cssFontInfo.fontFamily}";${R}src:${m}}`;
            }
            return this.fontRegistry && this.fontRegistry.registerFont(this, m), S;
          }
          getPathGenerator(x, m) {
            if (this.compiledGlyphs[m] !== void 0)
              return this.compiledGlyphs[m];
            let S;
            try {
              S = x.get(this.loadedName + "_path_" + m);
            } catch (R) {
              if (!this.ignoreErrors)
                throw R;
              return this._onUnsupportedFeature({
                featureId: e.UNSUPPORTED_FEATURES.errorFontGetPath
              }), (0, e.warn)(`getPathGenerator - ignoring character: "${R}".`), this.compiledGlyphs[m] = function(A, P) {
              };
            }
            if (this.isEvalSupported && e.FeatureTest.isEvalSupported) {
              const R = [];
              for (const A of S) {
                const P = A.args !== void 0 ? A.args.join(",") : "";
                R.push("c.", A.cmd, "(", P, `);
`);
              }
              return this.compiledGlyphs[m] = new Function("c", "size", R.join(""));
            }
            return this.compiledGlyphs[m] = function(R, A) {
              for (const P of S)
                P.cmd === "scale" && (P.args = [A, -A]), R[P.cmd].apply(R, P.args);
            };
          }
        }
        i.FontFaceObject = T;
      },
      (t, i, r) => {
        var ct, de;
        Object.defineProperty(i, "__esModule", {
          value: !0
        }), i.CanvasGraphics = void 0;
        var e = r(1), d = r(4), C = r(13), T = r(14), I = r(3);
        const x = 16, m = 100, S = 4096, R = 15, A = 10, P = 1e3, u = 16, n = 1.000001;
        function a(B, b) {
          if (B._removeMirroring)
            throw new Error("Context is already forwarding operations.");
          B.__originalSave = B.save, B.__originalRestore = B.restore, B.__originalRotate = B.rotate, B.__originalScale = B.scale, B.__originalTranslate = B.translate, B.__originalTransform = B.transform, B.__originalSetTransform = B.setTransform, B.__originalResetTransform = B.resetTransform, B.__originalClip = B.clip, B.__originalMoveTo = B.moveTo, B.__originalLineTo = B.lineTo, B.__originalBezierCurveTo = B.bezierCurveTo, B.__originalRect = B.rect, B.__originalClosePath = B.closePath, B.__originalBeginPath = B.beginPath, B._removeMirroring = () => {
            B.save = B.__originalSave, B.restore = B.__originalRestore, B.rotate = B.__originalRotate, B.scale = B.__originalScale, B.translate = B.__originalTranslate, B.transform = B.__originalTransform, B.setTransform = B.__originalSetTransform, B.resetTransform = B.__originalResetTransform, B.clip = B.__originalClip, B.moveTo = B.__originalMoveTo, B.lineTo = B.__originalLineTo, B.bezierCurveTo = B.__originalBezierCurveTo, B.rect = B.__originalRect, B.closePath = B.__originalClosePath, B.beginPath = B.__originalBeginPath, delete B._removeMirroring;
          }, B.save = function() {
            b.save(), this.__originalSave();
          }, B.restore = function() {
            b.restore(), this.__originalRestore();
          }, B.translate = function(w, s) {
            b.translate(w, s), this.__originalTranslate(w, s);
          }, B.scale = function(w, s) {
            b.scale(w, s), this.__originalScale(w, s);
          }, B.transform = function(w, s, c, p, _, E) {
            b.transform(w, s, c, p, _, E), this.__originalTransform(w, s, c, p, _, E);
          }, B.setTransform = function(w, s, c, p, _, E) {
            b.setTransform(w, s, c, p, _, E), this.__originalSetTransform(w, s, c, p, _, E);
          }, B.resetTransform = function() {
            b.resetTransform(), this.__originalResetTransform();
          }, B.rotate = function(w) {
            b.rotate(w), this.__originalRotate(w);
          }, B.clip = function(w) {
            b.clip(w), this.__originalClip(w);
          }, B.moveTo = function(f, w) {
            b.moveTo(f, w), this.__originalMoveTo(f, w);
          }, B.lineTo = function(f, w) {
            b.lineTo(f, w), this.__originalLineTo(f, w);
          }, B.bezierCurveTo = function(f, w, s, c, p, _) {
            b.bezierCurveTo(f, w, s, c, p, _), this.__originalBezierCurveTo(f, w, s, c, p, _);
          }, B.rect = function(f, w, s, c) {
            b.rect(f, w, s, c), this.__originalRect(f, w, s, c);
          }, B.closePath = function() {
            b.closePath(), this.__originalClosePath();
          }, B.beginPath = function() {
            b.beginPath(), this.__originalBeginPath();
          };
        }
        function l(B) {
          if (B._transformStack && (B._transformStack = []), !B.mozCurrentTransform) {
            B._originalSave = B.save, B._originalRestore = B.restore, B._originalRotate = B.rotate, B._originalScale = B.scale, B._originalTranslate = B.translate, B._originalTransform = B.transform, B._originalSetTransform = B.setTransform, B._originalResetTransform = B.resetTransform, B._transformMatrix = B._transformMatrix || [1, 0, 0, 1, 0, 0], B._transformStack = [];
            try {
              const b = Object.getOwnPropertyDescriptor(Object.getPrototypeOf(B), "lineWidth");
              B._setLineWidth = b.set, B._getLineWidth = b.get, Object.defineProperty(B, "lineWidth", {
                set: function(w) {
                  this._setLineWidth(w * n);
                },
                get: function() {
                  return this._getLineWidth();
                }
              });
            } catch {
            }
            Object.defineProperty(B, "mozCurrentTransform", {
              get: function() {
                return this._transformMatrix;
              }
            }), Object.defineProperty(B, "mozCurrentTransformInverse", {
              get: function() {
                const [f, w, s, c, p, _] = this._transformMatrix, E = f * c - w * s, j = w * s - f * c;
                return [c / E, w / j, s / j, f / E, (c * p - s * _) / j, (w * p - f * _) / E];
              }
            }), B.save = function() {
              const f = this._transformMatrix;
              this._transformStack.push(f), this._transformMatrix = f.slice(0, 6), this._originalSave();
            }, B.restore = function() {
              this._transformStack.length === 0 && (0, e.warn)("Tried to restore a ctx when the stack was already empty.");
              const f = this._transformStack.pop();
              f && (this._transformMatrix = f, this._originalRestore());
            }, B.translate = function(f, w) {
              const s = this._transformMatrix;
              s[4] = s[0] * f + s[2] * w + s[4], s[5] = s[1] * f + s[3] * w + s[5], this._originalTranslate(f, w);
            }, B.scale = function(f, w) {
              const s = this._transformMatrix;
              s[0] *= f, s[1] *= f, s[2] *= w, s[3] *= w, this._originalScale(f, w);
            }, B.transform = function(f, w, s, c, p, _) {
              const E = this._transformMatrix;
              this._transformMatrix = [E[0] * f + E[2] * w, E[1] * f + E[3] * w, E[0] * s + E[2] * c, E[1] * s + E[3] * c, E[0] * p + E[2] * _ + E[4], E[1] * p + E[3] * _ + E[5]], B._originalTransform(f, w, s, c, p, _);
            }, B.setTransform = function(f, w, s, c, p, _) {
              this._transformMatrix = [f, w, s, c, p, _], B._originalSetTransform(f, w, s, c, p, _);
            }, B.resetTransform = function() {
              this._transformMatrix = [1, 0, 0, 1, 0, 0], B._originalResetTransform();
            }, B.rotate = function(f) {
              const w = Math.cos(f), s = Math.sin(f), c = this._transformMatrix;
              this._transformMatrix = [c[0] * w + c[2] * s, c[1] * w + c[3] * s, c[0] * -s + c[2] * w, c[1] * -s + c[3] * w, c[4], c[5]], this._originalRotate(f);
            };
          }
        }
        class F {
          constructor(b) {
            this.canvasFactory = b, this.cache = /* @__PURE__ */ Object.create(null);
          }
          getCanvas(b, f, w, s) {
            let c;
            return this.cache[b] !== void 0 ? (c = this.cache[b], this.canvasFactory.reset(c, f, w), c.context.setTransform(1, 0, 0, 1, 0, 0)) : (c = this.canvasFactory.create(f, w), this.cache[b] = c), s && l(c.context), c;
          }
          delete(b) {
            delete this.cache[b];
          }
          clear() {
            for (const b in this.cache) {
              const f = this.cache[b];
              this.canvasFactory.destroy(f), delete this.cache[b];
            }
          }
        }
        function y(B, b, f, w, s, c, p, _, E, j) {
          const [X, $, q, tt, K, et] = B.mozCurrentTransform;
          if ($ === 0 && q === 0) {
            const vt = p * X + K, rt = Math.round(vt), yt = _ * tt + et, Z = Math.round(yt), it = (p + E) * X + K, At = Math.abs(Math.round(it) - rt) || 1, wt = (_ + j) * tt + et, St = Math.abs(Math.round(wt) - Z) || 1;
            return B.setTransform(Math.sign(X), 0, 0, Math.sign(tt), rt, Z), B.drawImage(b, f, w, s, c, 0, 0, At, St), B.setTransform(X, $, q, tt, K, et), [At, St];
          }
          if (X === 0 && tt === 0) {
            const vt = _ * q + K, rt = Math.round(vt), yt = p * $ + et, Z = Math.round(yt), it = (_ + j) * q + K, At = Math.abs(Math.round(it) - rt) || 1, wt = (p + E) * $ + et, St = Math.abs(Math.round(wt) - Z) || 1;
            return B.setTransform(0, Math.sign($), Math.sign(q), 0, rt, Z), B.drawImage(b, f, w, s, c, 0, 0, St, At), B.setTransform(X, $, q, tt, K, et), [St, At];
          }
          B.drawImage(b, f, w, s, c, p, _, E, j);
          const ft = Math.hypot(X, $), pt = Math.hypot(q, tt);
          return [ft * E, pt * j];
        }
        function g(B) {
          const {
            width: b,
            height: f
          } = B;
          if (b > P || f > P)
            return null;
          const w = 1e3, s = new Uint8Array([0, 2, 4, 0, 1, 0, 5, 4, 8, 10, 0, 8, 0, 2, 1, 0]), c = b + 1;
          let p = new Uint8Array(c * (f + 1)), _, E, j;
          const X = b + 7 & -8;
          let $ = new Uint8Array(X * f), q = 0;
          for (const rt of B.data) {
            let yt = 128;
            for (; yt > 0; )
              $[q++] = rt & yt ? 0 : 255, yt >>= 1;
          }
          let tt = 0;
          for (q = 0, $[q] !== 0 && (p[0] = 1, ++tt), E = 1; E < b; E++)
            $[q] !== $[q + 1] && (p[E] = $[q] ? 2 : 1, ++tt), q++;
          for ($[q] !== 0 && (p[E] = 2, ++tt), _ = 1; _ < f; _++) {
            q = _ * X, j = _ * c, $[q - X] !== $[q] && (p[j] = $[q] ? 1 : 8, ++tt);
            let rt = ($[q] ? 4 : 0) + ($[q - X] ? 8 : 0);
            for (E = 1; E < b; E++)
              rt = (rt >> 2) + ($[q + 1] ? 4 : 0) + ($[q - X + 1] ? 8 : 0), s[rt] && (p[j + E] = s[rt], ++tt), q++;
            if ($[q - X] !== $[q] && (p[j + E] = $[q] ? 2 : 4, ++tt), tt > w)
              return null;
          }
          for (q = X * (f - 1), j = _ * c, $[q] !== 0 && (p[j] = 8, ++tt), E = 1; E < b; E++)
            $[q] !== $[q + 1] && (p[j + E] = $[q] ? 4 : 8, ++tt), q++;
          if ($[q] !== 0 && (p[j + E] = 4, ++tt), tt > w)
            return null;
          const K = new Int32Array([0, c, -1, 0, -c, 0, 0, 0, 1]);
          let et, ft, pt;
          for (I.isNodeJS ? ft = [] : et = new Path2D(), _ = 0; tt && _ <= f; _++) {
            let rt = _ * c;
            const yt = rt + b;
            for (; rt < yt && !p[rt]; )
              rt++;
            if (rt === yt)
              continue;
            et ? et.moveTo(rt % c, _) : pt = [rt % c, _];
            const Z = rt;
            let it = p[rt];
            do {
              const At = K[it];
              do
                rt += At;
              while (!p[rt]);
              const wt = p[rt];
              wt !== 5 && wt !== 10 ? (it = wt, p[rt] = 0) : (it = wt & 51 * it >> 4, p[rt] &= it >> 2 | it << 2), et ? et.lineTo(rt % c, rt / c | 0) : pt.push(rt % c, rt / c | 0), p[rt] || --tt;
            } while (Z !== rt);
            et || ft.push(pt), --_;
          }
          return $ = null, p = null, function(rt) {
            if (rt.save(), rt.scale(1 / b, -1 / f), rt.translate(0, -f), et)
              rt.fill(et);
            else {
              rt.beginPath();
              for (const yt of ft) {
                rt.moveTo(yt[0], yt[1]);
                for (let Z = 2, it = yt.length; Z < it; Z += 2)
                  rt.lineTo(yt[Z], yt[Z + 1]);
              }
              rt.fill();
            }
            rt.beginPath(), rt.restore();
          };
        }
        class o {
          constructor(b, f) {
            this.alphaIsShape = !1, this.fontSize = 0, this.fontSizeScale = 1, this.textMatrix = e.IDENTITY_MATRIX, this.textMatrixScale = 1, this.fontMatrix = e.FONT_IDENTITY_MATRIX, this.leading = 0, this.x = 0, this.y = 0, this.lineX = 0, this.lineY = 0, this.charSpacing = 0, this.wordSpacing = 0, this.textHScale = 1, this.textRenderingMode = e.TextRenderingMode.FILL, this.textRise = 0, this.fillColor = "#000000", this.strokeColor = "#000000", this.patternFill = !1, this.fillAlpha = 1, this.strokeAlpha = 1, this.lineWidth = 1, this.activeSMask = null, this.transferMaps = null, this.startNewPathAndClipBox([0, 0, b, f]);
          }
          clone() {
            const b = Object.create(this);
            return b.clipBox = this.clipBox.slice(), b;
          }
          setCurrentPoint(b, f) {
            this.x = b, this.y = f;
          }
          updatePathMinMax(b, f, w) {
            [f, w] = e.Util.applyTransform([f, w], b), this.minX = Math.min(this.minX, f), this.minY = Math.min(this.minY, w), this.maxX = Math.max(this.maxX, f), this.maxY = Math.max(this.maxY, w);
          }
          updateRectMinMax(b, f) {
            const w = e.Util.applyTransform(f, b), s = e.Util.applyTransform(f.slice(2), b);
            this.minX = Math.min(this.minX, w[0], s[0]), this.minY = Math.min(this.minY, w[1], s[1]), this.maxX = Math.max(this.maxX, w[0], s[0]), this.maxY = Math.max(this.maxY, w[1], s[1]);
          }
          updateScalingPathMinMax(b, f) {
            e.Util.scaleMinMax(b, f), this.minX = Math.min(this.minX, f[0]), this.maxX = Math.max(this.maxX, f[1]), this.minY = Math.min(this.minY, f[2]), this.maxY = Math.max(this.maxY, f[3]);
          }
          updateCurvePathMinMax(b, f, w, s, c, p, _, E, j, X) {
            const $ = e.Util.bezierBoundingBox(f, w, s, c, p, _, E, j);
            if (X) {
              X[0] = Math.min(X[0], $[0], $[2]), X[1] = Math.max(X[1], $[0], $[2]), X[2] = Math.min(X[2], $[1], $[3]), X[3] = Math.max(X[3], $[1], $[3]);
              return;
            }
            this.updateRectMinMax(b, $);
          }
          getPathBoundingBox(b = C.PathType.FILL, f = null) {
            const w = [this.minX, this.minY, this.maxX, this.maxY];
            if (b === C.PathType.STROKE) {
              f || (0, e.unreachable)("Stroke bounding box must include transform.");
              const s = e.Util.singularValueDecompose2dScale(f), c = s[0] * this.lineWidth / 2, p = s[1] * this.lineWidth / 2;
              w[0] -= c, w[1] -= p, w[2] += c, w[3] += p;
            }
            return w;
          }
          updateClipFromPath() {
            const b = e.Util.intersect(this.clipBox, this.getPathBoundingBox());
            this.startNewPathAndClipBox(b || [0, 0, 0, 0]);
          }
          isEmptyClip() {
            return this.minX === 1 / 0;
          }
          startNewPathAndClipBox(b) {
            this.clipBox = b, this.minX = 1 / 0, this.minY = 1 / 0, this.maxX = 0, this.maxY = 0;
          }
          getClippedPathBoundingBox(b = C.PathType.FILL, f = null) {
            return e.Util.intersect(this.clipBox, this.getPathBoundingBox(b, f));
          }
        }
        function h(B, b, f = null) {
          if (typeof ImageData < "u" && b instanceof ImageData) {
            B.putImageData(b, 0, 0);
            return;
          }
          const w = b.height, s = b.width, c = w % u, p = (w - c) / u, _ = c === 0 ? p : p + 1, E = B.createImageData(s, u);
          let j = 0, X;
          const $ = b.data, q = E.data;
          let tt, K, et, ft, pt, vt, rt, yt;
          if (f)
            switch (f.length) {
              case 1:
                pt = f[0], vt = f[0], rt = f[0], yt = f[0];
                break;
              case 4:
                pt = f[0], vt = f[1], rt = f[2], yt = f[3];
                break;
            }
          if (b.kind === e.ImageKind.GRAYSCALE_1BPP) {
            const Z = $.byteLength, it = new Uint32Array(q.buffer, 0, q.byteLength >> 2), At = it.length, wt = s + 7 >> 3;
            let St = 4294967295, kt = e.FeatureTest.isLittleEndian ? 4278190080 : 255;
            for (yt && yt[0] === 255 && yt[255] === 0 && ([St, kt] = [kt, St]), tt = 0; tt < _; tt++) {
              for (et = tt < p ? u : c, X = 0, K = 0; K < et; K++) {
                const Ft = Z - j;
                let Bt = 0;
                const Pt = Ft > wt ? s : Ft * 8 - 7, Vt = Pt & -8;
                let Dt = 0, nt = 0;
                for (; Bt < Vt; Bt += 8)
                  nt = $[j++], it[X++] = nt & 128 ? St : kt, it[X++] = nt & 64 ? St : kt, it[X++] = nt & 32 ? St : kt, it[X++] = nt & 16 ? St : kt, it[X++] = nt & 8 ? St : kt, it[X++] = nt & 4 ? St : kt, it[X++] = nt & 2 ? St : kt, it[X++] = nt & 1 ? St : kt;
                for (; Bt < Pt; Bt++)
                  Dt === 0 && (nt = $[j++], Dt = 128), it[X++] = nt & Dt ? St : kt, Dt >>= 1;
              }
              for (; X < At; )
                it[X++] = 0;
              B.putImageData(E, 0, tt * u);
            }
          } else if (b.kind === e.ImageKind.RGBA_32BPP) {
            const Z = !!(pt || vt || rt);
            for (K = 0, ft = s * u * 4, tt = 0; tt < p; tt++) {
              if (q.set($.subarray(j, j + ft)), j += ft, Z)
                for (let it = 0; it < ft; it += 4)
                  pt && (q[it + 0] = pt[q[it + 0]]), vt && (q[it + 1] = vt[q[it + 1]]), rt && (q[it + 2] = rt[q[it + 2]]);
              B.putImageData(E, 0, K), K += u;
            }
            if (tt < _) {
              if (ft = s * c * 4, q.set($.subarray(j, j + ft)), Z)
                for (let it = 0; it < ft; it += 4)
                  pt && (q[it + 0] = pt[q[it + 0]]), vt && (q[it + 1] = vt[q[it + 1]]), rt && (q[it + 2] = rt[q[it + 2]]);
              B.putImageData(E, 0, K);
            }
          } else if (b.kind === e.ImageKind.RGB_24BPP) {
            const Z = !!(pt || vt || rt);
            for (et = u, ft = s * et, tt = 0; tt < _; tt++) {
              for (tt >= p && (et = c, ft = s * et), X = 0, K = ft; K--; )
                q[X++] = $[j++], q[X++] = $[j++], q[X++] = $[j++], q[X++] = 255;
              if (Z)
                for (let it = 0; it < X; it += 4)
                  pt && (q[it + 0] = pt[q[it + 0]]), vt && (q[it + 1] = vt[q[it + 1]]), rt && (q[it + 2] = rt[q[it + 2]]);
              B.putImageData(E, 0, tt * u);
            }
          } else
            throw new Error(`bad image kind: ${b.kind}`);
        }
        function v(B, b) {
          if (b.bitmap) {
            B.drawImage(b.bitmap, 0, 0);
            return;
          }
          const f = b.height, w = b.width, s = f % u, c = (f - s) / u, p = s === 0 ? c : c + 1, _ = B.createImageData(w, u);
          let E = 0;
          const j = b.data, X = _.data;
          for (let $ = 0; $ < p; $++) {
            const q = $ < c ? u : s;
            ({
              srcPos: E
            } = (0, T.applyMaskImageData)({
              src: j,
              srcPos: E,
              dest: X,
              width: w,
              height: q
            })), B.putImageData(_, 0, $ * u);
          }
        }
        function O(B, b) {
          const f = ["strokeStyle", "fillStyle", "fillRule", "globalAlpha", "lineWidth", "lineCap", "lineJoin", "miterLimit", "globalCompositeOperation", "font"];
          for (let w = 0, s = f.length; w < s; w++) {
            const c = f[w];
            B[c] !== void 0 && (b[c] = B[c]);
          }
          B.setLineDash !== void 0 && (b.setLineDash(B.getLineDash()), b.lineDashOffset = B.lineDashOffset);
        }
        function D(B, b) {
          B.strokeStyle = B.fillStyle = b || "#000000", B.fillRule = "nonzero", B.globalAlpha = 1, B.lineWidth = 1, B.lineCap = "butt", B.lineJoin = "miter", B.miterLimit = 10, B.globalCompositeOperation = "source-over", B.font = "10px sans-serif", B.setLineDash !== void 0 && (B.setLineDash([]), B.lineDashOffset = 0);
        }
        function L(B, b, f, w) {
          const s = B.length;
          for (let c = 3; c < s; c += 4) {
            const p = B[c];
            if (p === 0)
              B[c - 3] = b, B[c - 2] = f, B[c - 1] = w;
            else if (p < 255) {
              const _ = 255 - p;
              B[c - 3] = B[c - 3] * p + b * _ >> 8, B[c - 2] = B[c - 2] * p + f * _ >> 8, B[c - 1] = B[c - 1] * p + w * _ >> 8;
            }
          }
        }
        function U(B, b, f) {
          const w = B.length, s = 1 / 255;
          for (let c = 3; c < w; c += 4) {
            const p = f ? f[B[c]] : B[c];
            b[c] = b[c] * p * s | 0;
          }
        }
        function J(B, b, f) {
          const w = B.length;
          for (let s = 3; s < w; s += 4) {
            const c = B[s - 3] * 77 + B[s - 2] * 152 + B[s - 1] * 28;
            b[s] = f ? b[s] * f[c >> 8] >> 8 : b[s] * c >> 16;
          }
        }
        function V(B, b, f, w, s, c, p, _, E, j, X) {
          const $ = !!c, q = $ ? c[0] : 0, tt = $ ? c[1] : 0, K = $ ? c[2] : 0;
          let et;
          s === "Luminosity" ? et = J : et = U;
          const pt = Math.min(w, Math.ceil(1048576 / f));
          for (let vt = 0; vt < w; vt += pt) {
            const rt = Math.min(pt, w - vt), yt = B.getImageData(_ - j, vt + (E - X), f, rt), Z = b.getImageData(_, vt + E, f, rt);
            $ && L(yt.data, q, tt, K), et(yt.data, Z.data, p), b.putImageData(Z, _, vt + E);
          }
        }
        function N(B, b, f, w) {
          const s = w[0], c = w[1], p = w[2] - s, _ = w[3] - c;
          p === 0 || _ === 0 || (V(b.context, f, p, _, b.subtype, b.backdrop, b.transferMap, s, c, b.offsetX, b.offsetY), B.save(), B.globalAlpha = 1, B.globalCompositeOperation = "source-over", B.setTransform(1, 0, 0, 1, 0, 0), B.drawImage(f.canvas, 0, 0), B.restore());
        }
        function G(B, b) {
          const f = e.Util.singularValueDecompose2dScale(B);
          f[0] = Math.fround(f[0]), f[1] = Math.fround(f[1]);
          const w = Math.fround((globalThis.devicePixelRatio || 1) * d.PixelsPerInch.PDF_TO_CSS_UNITS);
          return b !== void 0 ? b : f[0] <= w || f[1] <= w;
        }
        const k = ["butt", "round", "square"], z = ["miter", "round", "bevel"], W = {}, st = {}, bt = class {
          constructor(b, f, w, s, c, p, _, E) {
            at(this, ct);
            this.ctx = b, this.current = new o(this.ctx.canvas.width, this.ctx.canvas.height), this.stateStack = [], this.pendingClip = null, this.pendingEOFill = !1, this.res = null, this.xobjs = null, this.commonObjs = f, this.objs = w, this.canvasFactory = s, this.imageLayer = c, this.groupStack = [], this.processingType3 = null, this.baseTransform = null, this.baseTransformStack = [], this.groupLevel = 0, this.smaskStack = [], this.smaskCounter = 0, this.tempSMask = null, this.suspendedCtx = null, this.contentVisible = !0, this.markedContentStack = [], this.optionalContentConfig = p, this.cachedCanvases = new F(this.canvasFactory), this.cachedPatterns = /* @__PURE__ */ new Map(), this.annotationCanvasMap = _, this.viewportScale = 1, this.outputScaleX = 1, this.outputScaleY = 1, this.backgroundColor = (E == null ? void 0 : E.background) || null, this.foregroundColor = (E == null ? void 0 : E.foreground) || null, b && l(b), this._cachedScaleForStroking = null, this._cachedGetSinglePixelWidth = null, this._cachedBitmapsMap = /* @__PURE__ */ new Map();
          }
          getObject(b, f = null) {
            return typeof b == "string" ? b.startsWith("g_") ? this.commonObjs.get(b) : this.objs.get(b) : f;
          }
          beginDrawing({
            transform: b,
            viewport: f,
            transparency: w = !1,
            background: s = null
          }) {
            const c = this.ctx.canvas.width, p = this.ctx.canvas.height, _ = s || "#ffffff";
            if (this.ctx.save(), this.foregroundColor && this.backgroundColor) {
              this.ctx.fillStyle = this.foregroundColor;
              const E = this.foregroundColor = this.ctx.fillStyle;
              this.ctx.fillStyle = this.backgroundColor;
              const j = this.backgroundColor = this.ctx.fillStyle;
              let X = !0, $ = _;
              if (this.ctx.fillStyle = _, $ = this.ctx.fillStyle, X = typeof $ == "string" && /^#[0-9A-Fa-f]{6}$/.test($), E === "#000000" && j === "#ffffff" || E === j || !X)
                this.foregroundColor = this.backgroundColor = null;
              else {
                const [q, tt, K] = (0, d.getRGB)($), et = (pt) => (pt /= 255, pt <= 0.03928 ? pt / 12.92 : ((pt + 0.055) / 1.055) ** 2.4), ft = Math.round(0.2126 * et(q) + 0.7152 * et(tt) + 0.0722 * et(K));
                this.selectColor = (pt, vt, rt) => {
                  const yt = 0.2126 * et(pt) + 0.7152 * et(vt) + 0.0722 * et(rt);
                  return Math.round(yt) === ft ? j : E;
                };
              }
            }
            if (this.ctx.fillStyle = this.backgroundColor || _, this.ctx.fillRect(0, 0, c, p), this.ctx.restore(), w) {
              const E = this.cachedCanvases.getCanvas("transparent", c, p, !0);
              this.compositeCtx = this.ctx, this.transparentCanvas = E.canvas, this.ctx = E.context, this.ctx.save(), this.ctx.transform.apply(this.ctx, this.compositeCtx.mozCurrentTransform);
            }
            this.ctx.save(), D(this.ctx, this.foregroundColor), b && (this.ctx.transform.apply(this.ctx, b), this.outputScaleX = b[0], this.outputScaleY = b[0]), this.ctx.transform.apply(this.ctx, f.transform), this.viewportScale = f.scale, this.baseTransform = this.ctx.mozCurrentTransform.slice(), this.imageLayer && this.imageLayer.beginLayout();
          }
          executeOperatorList(b, f, w, s) {
            const c = b.argsArray, p = b.fnArray;
            let _ = f || 0;
            const E = c.length;
            if (E === _)
              return _;
            const j = E - _ > A && typeof w == "function", X = j ? Date.now() + R : 0;
            let $ = 0;
            const q = this.commonObjs, tt = this.objs;
            let K;
            for (; ; ) {
              if (s !== void 0 && _ === s.nextBreakPoint)
                return s.breakIt(_, w), _;
              if (K = p[_], K !== e.OPS.dependency)
                this[K].apply(this, c[_]);
              else
                for (const et of c[_]) {
                  const ft = et.startsWith("g_") ? q : tt;
                  if (!ft.has(et))
                    return ft.get(et, w), _;
                }
              if (_++, _ === E)
                return _;
              if (j && ++$ > A) {
                if (Date.now() > X)
                  return w(), _;
                $ = 0;
              }
            }
          }
          endDrawing() {
            lt(this, ct, de).call(this), this.cachedCanvases.clear(), this.cachedPatterns.clear();
            for (const b of this._cachedBitmapsMap.values()) {
              for (const f of b.values())
                typeof HTMLCanvasElement < "u" && f instanceof HTMLCanvasElement && (f.width = f.height = 0);
              b.clear();
            }
            this._cachedBitmapsMap.clear(), this.imageLayer && this.imageLayer.endLayout();
          }
          _scaleImage(b, f) {
            const w = b.width, s = b.height;
            let c = Math.max(Math.hypot(f[0], f[1]), 1), p = Math.max(Math.hypot(f[2], f[3]), 1), _ = w, E = s, j = "prescale1", X, $;
            for (; c > 2 && _ > 1 || p > 2 && E > 1; ) {
              let q = _, tt = E;
              c > 2 && _ > 1 && (q = Math.ceil(_ / 2), c /= _ / q), p > 2 && E > 1 && (tt = Math.ceil(E / 2), p /= E / tt), X = this.cachedCanvases.getCanvas(j, q, tt, !1), $ = X.context, $.clearRect(0, 0, q, tt), $.drawImage(b, 0, 0, _, E, 0, 0, q, tt), b = X.canvas, _ = q, E = tt, j = j === "prescale1" ? "prescale2" : "prescale1";
            }
            return {
              img: b,
              paintWidth: _,
              paintHeight: E
            };
          }
          _createMaskCanvas(b) {
            const f = this.ctx, {
              width: w,
              height: s
            } = b, c = this.current.fillColor, p = this.current.patternFill, _ = f.mozCurrentTransform;
            let E, j, X, $;
            if ((b.bitmap || b.data) && b.count > 1) {
              const At = b.bitmap || b.data.buffer, wt = _.slice(0, 4);
              j = JSON.stringify(p ? wt : [wt, c]), E = this._cachedBitmapsMap.get(At), E || (E = /* @__PURE__ */ new Map(), this._cachedBitmapsMap.set(At, E));
              const St = E.get(j);
              if (St && !p) {
                const kt = Math.round(Math.min(_[0], _[2]) + _[4]), Ft = Math.round(Math.min(_[1], _[3]) + _[5]);
                return {
                  canvas: St,
                  offsetX: kt,
                  offsetY: Ft
                };
              }
              X = St;
            }
            X || ($ = this.cachedCanvases.getCanvas("maskCanvas", w, s, !1), v($.context, b));
            let q = e.Util.transform(_, [1 / w, 0, 0, -1 / s, 0, 0]);
            q = e.Util.transform(q, [1, 0, 0, 1, 0, -s]);
            const tt = e.Util.applyTransform([0, 0], q), K = e.Util.applyTransform([w, s], q), et = e.Util.normalizeRect([tt[0], tt[1], K[0], K[1]]), ft = Math.round(et[2] - et[0]) || 1, pt = Math.round(et[3] - et[1]) || 1, vt = this.cachedCanvases.getCanvas("fillCanvas", ft, pt, !0), rt = vt.context, yt = Math.min(tt[0], K[0]), Z = Math.min(tt[1], K[1]);
            rt.translate(-yt, -Z), rt.transform.apply(rt, q), X || (X = this._scaleImage($.canvas, rt.mozCurrentTransformInverse), X = X.img, E && p && E.set(j, X)), rt.imageSmoothingEnabled = G(rt.mozCurrentTransform, b.interpolate), y(rt, X, 0, 0, X.width, X.height, 0, 0, w, s), rt.globalCompositeOperation = "source-in";
            const it = e.Util.transform(rt.mozCurrentTransformInverse, [1, 0, 0, 1, -yt, -Z]);
            return rt.fillStyle = p ? c.getPattern(f, this, it, C.PathType.FILL) : c, rt.fillRect(0, 0, w, s), E && !p && (this.cachedCanvases.delete("fillCanvas"), E.set(j, vt.canvas)), {
              canvas: vt.canvas,
              offsetX: Math.round(yt),
              offsetY: Math.round(Z)
            };
          }
          setLineWidth(b) {
            b !== this.current.lineWidth && (this._cachedScaleForStroking = null), this.current.lineWidth = b, this.ctx.lineWidth = b;
          }
          setLineCap(b) {
            this.ctx.lineCap = k[b];
          }
          setLineJoin(b) {
            this.ctx.lineJoin = z[b];
          }
          setMiterLimit(b) {
            this.ctx.miterLimit = b;
          }
          setDash(b, f) {
            const w = this.ctx;
            w.setLineDash !== void 0 && (w.setLineDash(b), w.lineDashOffset = f);
          }
          setRenderingIntent(b) {
          }
          setFlatness(b) {
          }
          setGState(b) {
            for (let f = 0, w = b.length; f < w; f++) {
              const s = b[f], c = s[0], p = s[1];
              switch (c) {
                case "LW":
                  this.setLineWidth(p);
                  break;
                case "LC":
                  this.setLineCap(p);
                  break;
                case "LJ":
                  this.setLineJoin(p);
                  break;
                case "ML":
                  this.setMiterLimit(p);
                  break;
                case "D":
                  this.setDash(p[0], p[1]);
                  break;
                case "RI":
                  this.setRenderingIntent(p);
                  break;
                case "FL":
                  this.setFlatness(p);
                  break;
                case "Font":
                  this.setFont(p[0], p[1]);
                  break;
                case "CA":
                  this.current.strokeAlpha = s[1];
                  break;
                case "ca":
                  this.current.fillAlpha = s[1], this.ctx.globalAlpha = s[1];
                  break;
                case "BM":
                  this.ctx.globalCompositeOperation = p;
                  break;
                case "SMask":
                  this.current.activeSMask = p ? this.tempSMask : null, this.tempSMask = null, this.checkSMaskState();
                  break;
                case "TR":
                  this.current.transferMaps = p;
              }
            }
          }
          get inSMaskMode() {
            return !!this.suspendedCtx;
          }
          checkSMaskState() {
            const b = this.inSMaskMode;
            this.current.activeSMask && !b ? this.beginSMaskMode() : !this.current.activeSMask && b && this.endSMaskMode();
          }
          beginSMaskMode() {
            if (this.inSMaskMode)
              throw new Error("beginSMaskMode called while already in smask mode");
            const b = this.ctx.canvas.width, f = this.ctx.canvas.height, w = "smaskGroupAt" + this.groupLevel, s = this.cachedCanvases.getCanvas(w, b, f, !0);
            this.suspendedCtx = this.ctx, this.ctx = s.context;
            const c = this.ctx;
            c.setTransform.apply(c, this.suspendedCtx.mozCurrentTransform), O(this.suspendedCtx, c), a(c, this.suspendedCtx), this.setGState([["BM", "source-over"], ["ca", 1], ["CA", 1]]);
          }
          endSMaskMode() {
            if (!this.inSMaskMode)
              throw new Error("endSMaskMode called while not in smask mode");
            this.ctx._removeMirroring(), O(this.ctx, this.suspendedCtx), this.ctx = this.suspendedCtx, this.suspendedCtx = null;
          }
          compose(b) {
            if (!this.current.activeSMask)
              return;
            b ? (b[0] = Math.floor(b[0]), b[1] = Math.floor(b[1]), b[2] = Math.ceil(b[2]), b[3] = Math.ceil(b[3])) : b = [0, 0, this.ctx.canvas.width, this.ctx.canvas.height];
            const f = this.current.activeSMask, w = this.suspendedCtx;
            N(w, f, this.ctx, b), this.ctx.save(), this.ctx.setTransform(1, 0, 0, 1, 0, 0), this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height), this.ctx.restore();
          }
          save() {
            this.inSMaskMode ? (O(this.ctx, this.suspendedCtx), this.suspendedCtx.save()) : this.ctx.save();
            const b = this.current;
            this.stateStack.push(b), this.current = b.clone();
          }
          restore() {
            this.stateStack.length === 0 && this.inSMaskMode && this.endSMaskMode(), this.stateStack.length !== 0 && (this.current = this.stateStack.pop(), this.inSMaskMode ? (this.suspendedCtx.restore(), O(this.suspendedCtx, this.ctx)) : this.ctx.restore(), this.checkSMaskState(), this.pendingClip = null, this._cachedScaleForStroking = null, this._cachedGetSinglePixelWidth = null);
          }
          transform(b, f, w, s, c, p) {
            this.ctx.transform(b, f, w, s, c, p), this._cachedScaleForStroking = null, this._cachedGetSinglePixelWidth = null;
          }
          constructPath(b, f, w) {
            const s = this.ctx, c = this.current;
            let p = c.x, _ = c.y, E, j;
            const X = s.mozCurrentTransform, $ = X[0] === 0 && X[3] === 0 || X[1] === 0 && X[2] === 0, q = $ ? w.slice(0) : null;
            for (let tt = 0, K = 0, et = b.length; tt < et; tt++)
              switch (b[tt] | 0) {
                case e.OPS.rectangle:
                  p = f[K++], _ = f[K++];
                  const ft = f[K++], pt = f[K++], vt = p + ft, rt = _ + pt;
                  s.moveTo(p, _), ft === 0 || pt === 0 ? s.lineTo(vt, rt) : (s.lineTo(vt, _), s.lineTo(vt, rt), s.lineTo(p, rt)), $ || c.updateRectMinMax(X, [p, _, vt, rt]), s.closePath();
                  break;
                case e.OPS.moveTo:
                  p = f[K++], _ = f[K++], s.moveTo(p, _), $ || c.updatePathMinMax(X, p, _);
                  break;
                case e.OPS.lineTo:
                  p = f[K++], _ = f[K++], s.lineTo(p, _), $ || c.updatePathMinMax(X, p, _);
                  break;
                case e.OPS.curveTo:
                  E = p, j = _, p = f[K + 4], _ = f[K + 5], s.bezierCurveTo(f[K], f[K + 1], f[K + 2], f[K + 3], p, _), c.updateCurvePathMinMax(X, E, j, f[K], f[K + 1], f[K + 2], f[K + 3], p, _, q), K += 6;
                  break;
                case e.OPS.curveTo2:
                  E = p, j = _, s.bezierCurveTo(p, _, f[K], f[K + 1], f[K + 2], f[K + 3]), c.updateCurvePathMinMax(X, E, j, p, _, f[K], f[K + 1], f[K + 2], f[K + 3], q), p = f[K + 2], _ = f[K + 3], K += 4;
                  break;
                case e.OPS.curveTo3:
                  E = p, j = _, p = f[K + 2], _ = f[K + 3], s.bezierCurveTo(f[K], f[K + 1], p, _, p, _), c.updateCurvePathMinMax(X, E, j, f[K], f[K + 1], p, _, p, _, q), K += 4;
                  break;
                case e.OPS.closePath:
                  s.closePath();
                  break;
              }
            $ && c.updateScalingPathMinMax(X, q), c.setCurrentPoint(p, _);
          }
          closePath() {
            this.ctx.closePath();
          }
          stroke(b) {
            b = typeof b < "u" ? b : !0;
            const f = this.ctx, w = this.current.strokeColor;
            f.globalAlpha = this.current.strokeAlpha, this.contentVisible && (typeof w == "object" && (w == null ? void 0 : w.getPattern) ? (f.save(), f.strokeStyle = w.getPattern(f, this, f.mozCurrentTransformInverse, C.PathType.STROKE), this.rescaleAndStroke(!1), f.restore()) : this.rescaleAndStroke(!0)), b && this.consumePath(this.current.getClippedPathBoundingBox()), f.globalAlpha = this.current.fillAlpha;
          }
          closeStroke() {
            this.closePath(), this.stroke();
          }
          fill(b) {
            b = typeof b < "u" ? b : !0;
            const f = this.ctx, w = this.current.fillColor, s = this.current.patternFill;
            let c = !1;
            s && (f.save(), f.fillStyle = w.getPattern(f, this, f.mozCurrentTransformInverse, C.PathType.FILL), c = !0);
            const p = this.current.getClippedPathBoundingBox();
            this.contentVisible && p !== null && (this.pendingEOFill ? (f.fill("evenodd"), this.pendingEOFill = !1) : f.fill()), c && f.restore(), b && this.consumePath(p);
          }
          eoFill() {
            this.pendingEOFill = !0, this.fill();
          }
          fillStroke() {
            this.fill(!1), this.stroke(!1), this.consumePath();
          }
          eoFillStroke() {
            this.pendingEOFill = !0, this.fillStroke();
          }
          closeFillStroke() {
            this.closePath(), this.fillStroke();
          }
          closeEOFillStroke() {
            this.pendingEOFill = !0, this.closePath(), this.fillStroke();
          }
          endPath() {
            this.consumePath();
          }
          clip() {
            this.pendingClip = W;
          }
          eoClip() {
            this.pendingClip = st;
          }
          beginText() {
            this.current.textMatrix = e.IDENTITY_MATRIX, this.current.textMatrixScale = 1, this.current.x = this.current.lineX = 0, this.current.y = this.current.lineY = 0;
          }
          endText() {
            const b = this.pendingTextPaths, f = this.ctx;
            if (b === void 0) {
              f.beginPath();
              return;
            }
            f.save(), f.beginPath();
            for (const w of b)
              f.setTransform.apply(f, w.transform), f.translate(w.x, w.y), w.addToPath(f, w.fontSize);
            f.restore(), f.clip(), f.beginPath(), delete this.pendingTextPaths;
          }
          setCharSpacing(b) {
            this.current.charSpacing = b;
          }
          setWordSpacing(b) {
            this.current.wordSpacing = b;
          }
          setHScale(b) {
            this.current.textHScale = b / 100;
          }
          setLeading(b) {
            this.current.leading = -b;
          }
          setFont(b, f) {
            const w = this.commonObjs.get(b), s = this.current;
            if (!w)
              throw new Error(`Can't find font for ${b}`);
            if (s.fontMatrix = w.fontMatrix || e.FONT_IDENTITY_MATRIX, (s.fontMatrix[0] === 0 || s.fontMatrix[3] === 0) && (0, e.warn)("Invalid font matrix for font " + b), f < 0 ? (f = -f, s.fontDirection = -1) : s.fontDirection = 1, this.current.font = w, this.current.fontSize = f, w.isType3Font)
              return;
            const c = w.loadedName || "sans-serif";
            let p = "normal";
            w.black ? p = "900" : w.bold && (p = "bold");
            const _ = w.italic ? "italic" : "normal", E = `"${c}", ${w.fallbackName}`;
            let j = f;
            f < x ? j = x : f > m && (j = m), this.current.fontSizeScale = f / j, this.ctx.font = `${_} ${p} ${j}px ${E}`;
          }
          setTextRenderingMode(b) {
            this.current.textRenderingMode = b;
          }
          setTextRise(b) {
            this.current.textRise = b;
          }
          moveText(b, f) {
            this.current.x = this.current.lineX += b, this.current.y = this.current.lineY += f;
          }
          setLeadingMoveText(b, f) {
            this.setLeading(-f), this.moveText(b, f);
          }
          setTextMatrix(b, f, w, s, c, p) {
            this.current.textMatrix = [b, f, w, s, c, p], this.current.textMatrixScale = Math.hypot(b, f), this.current.x = this.current.lineX = 0, this.current.y = this.current.lineY = 0;
          }
          nextLine() {
            this.moveText(0, this.current.leading);
          }
          paintChar(b, f, w, s) {
            const c = this.ctx, p = this.current, _ = p.font, E = p.textRenderingMode, j = p.fontSize / p.fontSizeScale, X = E & e.TextRenderingMode.FILL_STROKE_MASK, $ = !!(E & e.TextRenderingMode.ADD_TO_PATH_FLAG), q = p.patternFill && !_.missingFile;
            let tt;
            (_.disableFontFace || $ || q) && (tt = _.getPathGenerator(this.commonObjs, b)), _.disableFontFace || q ? (c.save(), c.translate(f, w), c.beginPath(), tt(c, j), s && c.setTransform.apply(c, s), (X === e.TextRenderingMode.FILL || X === e.TextRenderingMode.FILL_STROKE) && c.fill(), (X === e.TextRenderingMode.STROKE || X === e.TextRenderingMode.FILL_STROKE) && c.stroke(), c.restore()) : ((X === e.TextRenderingMode.FILL || X === e.TextRenderingMode.FILL_STROKE) && c.fillText(b, f, w), (X === e.TextRenderingMode.STROKE || X === e.TextRenderingMode.FILL_STROKE) && c.strokeText(b, f, w)), $ && (this.pendingTextPaths || (this.pendingTextPaths = [])).push({
              transform: c.mozCurrentTransform,
              x: f,
              y: w,
              fontSize: j,
              addToPath: tt
            });
          }
          get isFontSubpixelAAEnabled() {
            const {
              context: b
            } = this.cachedCanvases.getCanvas("isFontSubpixelAAEnabled", 10, 10, !1);
            b.scale(1.5, 1), b.fillText("I", 0, 10);
            const f = b.getImageData(0, 0, 10, 10).data;
            let w = !1;
            for (let s = 3; s < f.length; s += 4)
              if (f[s] > 0 && f[s] < 255) {
                w = !0;
                break;
              }
            return (0, e.shadow)(this, "isFontSubpixelAAEnabled", w);
          }
          showText(b) {
            const f = this.current, w = f.font;
            if (w.isType3Font)
              return this.showType3Text(b);
            const s = f.fontSize;
            if (s === 0)
              return;
            const c = this.ctx, p = f.fontSizeScale, _ = f.charSpacing, E = f.wordSpacing, j = f.fontDirection, X = f.textHScale * j, $ = b.length, q = w.vertical, tt = q ? 1 : -1, K = w.defaultVMetrics, et = s * f.fontMatrix[0], ft = f.textRenderingMode === e.TextRenderingMode.FILL && !w.disableFontFace && !f.patternFill;
            c.save(), c.transform.apply(c, f.textMatrix), c.translate(f.x, f.y + f.textRise), j > 0 ? c.scale(X, -1) : c.scale(X, 1);
            let pt;
            if (f.patternFill) {
              c.save();
              const it = f.fillColor.getPattern(c, this, c.mozCurrentTransformInverse, C.PathType.FILL);
              pt = c.mozCurrentTransform, c.restore(), c.fillStyle = it;
            }
            let vt = f.lineWidth;
            const rt = f.textMatrixScale;
            if (rt === 0 || vt === 0) {
              const it = f.textRenderingMode & e.TextRenderingMode.FILL_STROKE_MASK;
              (it === e.TextRenderingMode.STROKE || it === e.TextRenderingMode.FILL_STROKE) && (vt = this.getSinglePixelWidth());
            } else
              vt /= rt;
            p !== 1 && (c.scale(p, p), vt /= p), c.lineWidth = vt;
            let yt = 0, Z;
            for (Z = 0; Z < $; ++Z) {
              const it = b[Z];
              if (typeof it == "number") {
                yt += tt * it * s / 1e3;
                continue;
              }
              let At = !1;
              const wt = (it.isSpace ? E : 0) + _, St = it.fontChar, kt = it.accent;
              let Ft, Bt, Pt = it.width;
              if (q) {
                const Dt = it.vmetric || K, nt = -(it.vmetric ? Dt[1] : Pt * 0.5) * et, ht = Dt[2] * et;
                Pt = Dt ? -Dt[0] : Pt, Ft = nt / p, Bt = (yt + ht) / p;
              } else
                Ft = yt / p, Bt = 0;
              if (w.remeasure && Pt > 0) {
                const Dt = c.measureText(St).width * 1e3 / s * p;
                if (Pt < Dt && this.isFontSubpixelAAEnabled) {
                  const nt = Pt / Dt;
                  At = !0, c.save(), c.scale(nt, 1), Ft /= nt;
                } else
                  Pt !== Dt && (Ft += (Pt - Dt) / 2e3 * s / p);
              }
              if (this.contentVisible && (it.isInFont || w.missingFile)) {
                if (ft && !kt)
                  c.fillText(St, Ft, Bt);
                else if (this.paintChar(St, Ft, Bt, pt), kt) {
                  const Dt = Ft + s * kt.offset.x / p, nt = Bt - s * kt.offset.y / p;
                  this.paintChar(kt.fontChar, Dt, nt, pt);
                }
              }
              let Vt;
              q ? Vt = Pt * et - wt * j : Vt = Pt * et + wt * j, yt += Vt, At && c.restore();
            }
            q ? f.y -= yt : f.x += yt * X, c.restore(), this.compose();
          }
          showType3Text(b) {
            const f = this.ctx, w = this.current, s = w.font, c = w.fontSize, p = w.fontDirection, _ = s.vertical ? 1 : -1, E = w.charSpacing, j = w.wordSpacing, X = w.textHScale * p, $ = w.fontMatrix || e.FONT_IDENTITY_MATRIX, q = b.length, tt = w.textRenderingMode === e.TextRenderingMode.INVISIBLE;
            let K, et, ft, pt;
            if (!(tt || c === 0)) {
              for (this._cachedScaleForStroking = null, this._cachedGetSinglePixelWidth = null, f.save(), f.transform.apply(f, w.textMatrix), f.translate(w.x, w.y), f.scale(X, p), K = 0; K < q; ++K) {
                if (et = b[K], typeof et == "number") {
                  pt = _ * et * c / 1e3, this.ctx.translate(pt, 0), w.x += pt * X;
                  continue;
                }
                const vt = (et.isSpace ? j : 0) + E, rt = s.charProcOperatorList[et.operatorListId];
                if (!rt) {
                  (0, e.warn)(`Type3 character "${et.operatorListId}" is not available.`);
                  continue;
                }
                this.contentVisible && (this.processingType3 = et, this.save(), f.scale(c, c), f.transform.apply(f, $), this.executeOperatorList(rt), this.restore()), ft = e.Util.applyTransform([et.width, 0], $)[0] * c + vt, f.translate(ft, 0), w.x += ft * X;
              }
              f.restore(), this.processingType3 = null;
            }
          }
          setCharWidth(b, f) {
          }
          setCharWidthAndBounds(b, f, w, s, c, p) {
            this.ctx.rect(w, s, c - w, p - s), this.ctx.clip(), this.endPath();
          }
          getColorN_Pattern(b) {
            let f;
            if (b[0] === "TilingPattern") {
              const w = b[1], s = this.baseTransform || this.ctx.mozCurrentTransform.slice(), c = {
                createCanvasGraphics: (p) => new bt(p, this.commonObjs, this.objs, this.canvasFactory)
              };
              f = new C.TilingPattern(b, w, this.ctx, c, s);
            } else
              f = this._getPattern(b[1], b[2]);
            return f;
          }
          setStrokeColorN() {
            this.current.strokeColor = this.getColorN_Pattern(arguments);
          }
          setFillColorN() {
            this.current.fillColor = this.getColorN_Pattern(arguments), this.current.patternFill = !0;
          }
          setStrokeRGBColor(b, f, w) {
            var c;
            const s = ((c = this.selectColor) == null ? void 0 : c.call(this, b, f, w)) || e.Util.makeHexColor(b, f, w);
            this.ctx.strokeStyle = s, this.current.strokeColor = s;
          }
          setFillRGBColor(b, f, w) {
            var c;
            const s = ((c = this.selectColor) == null ? void 0 : c.call(this, b, f, w)) || e.Util.makeHexColor(b, f, w);
            this.ctx.fillStyle = s, this.current.fillColor = s, this.current.patternFill = !1;
          }
          _getPattern(b, f = null) {
            let w;
            return this.cachedPatterns.has(b) ? w = this.cachedPatterns.get(b) : (w = (0, C.getShadingPattern)(this.objs.get(b)), this.cachedPatterns.set(b, w)), f && (w.matrix = f), w;
          }
          shadingFill(b) {
            if (!this.contentVisible)
              return;
            const f = this.ctx;
            this.save();
            const w = this._getPattern(b);
            f.fillStyle = w.getPattern(f, this, f.mozCurrentTransformInverse, C.PathType.SHADING);
            const s = f.mozCurrentTransformInverse;
            if (s) {
              const c = f.canvas, p = c.width, _ = c.height, E = e.Util.applyTransform([0, 0], s), j = e.Util.applyTransform([0, _], s), X = e.Util.applyTransform([p, 0], s), $ = e.Util.applyTransform([p, _], s), q = Math.min(E[0], j[0], X[0], $[0]), tt = Math.min(E[1], j[1], X[1], $[1]), K = Math.max(E[0], j[0], X[0], $[0]), et = Math.max(E[1], j[1], X[1], $[1]);
              this.ctx.fillRect(q, tt, K - q, et - tt);
            } else
              this.ctx.fillRect(-1e10, -1e10, 2e10, 2e10);
            this.compose(this.current.getClippedPathBoundingBox()), this.restore();
          }
          beginInlineImage() {
            (0, e.unreachable)("Should not call beginInlineImage");
          }
          beginImageData() {
            (0, e.unreachable)("Should not call beginImageData");
          }
          paintFormXObjectBegin(b, f) {
            if (!!this.contentVisible && (this.save(), this.baseTransformStack.push(this.baseTransform), Array.isArray(b) && b.length === 6 && this.transform.apply(this, b), this.baseTransform = this.ctx.mozCurrentTransform, f)) {
              const w = f[2] - f[0], s = f[3] - f[1];
              this.ctx.rect(f[0], f[1], w, s), this.current.updateRectMinMax(this.ctx.mozCurrentTransform, f), this.clip(), this.endPath();
            }
          }
          paintFormXObjectEnd() {
            !this.contentVisible || (this.restore(), this.baseTransform = this.baseTransformStack.pop());
          }
          beginGroup(b) {
            if (!this.contentVisible)
              return;
            this.save(), this.inSMaskMode && (this.endSMaskMode(), this.current.activeSMask = null);
            const f = this.ctx;
            b.isolated || (0, e.info)("TODO: Support non-isolated groups."), b.knockout && (0, e.warn)("Knockout groups not supported.");
            const w = f.mozCurrentTransform;
            if (b.matrix && f.transform.apply(f, b.matrix), !b.bbox)
              throw new Error("Bounding box is required.");
            let s = e.Util.getAxialAlignedBoundingBox(b.bbox, f.mozCurrentTransform);
            const c = [0, 0, f.canvas.width, f.canvas.height];
            s = e.Util.intersect(s, c) || [0, 0, 0, 0];
            const p = Math.floor(s[0]), _ = Math.floor(s[1]);
            let E = Math.max(Math.ceil(s[2]) - p, 1), j = Math.max(Math.ceil(s[3]) - _, 1), X = 1, $ = 1;
            E > S && (X = E / S, E = S), j > S && ($ = j / S, j = S), this.current.startNewPathAndClipBox([0, 0, E, j]);
            let q = "groupAt" + this.groupLevel;
            b.smask && (q += "_smask_" + this.smaskCounter++ % 2);
            const tt = this.cachedCanvases.getCanvas(q, E, j, !0), K = tt.context;
            K.scale(1 / X, 1 / $), K.translate(-p, -_), K.transform.apply(K, w), b.smask ? this.smaskStack.push({
              canvas: tt.canvas,
              context: K,
              offsetX: p,
              offsetY: _,
              scaleX: X,
              scaleY: $,
              subtype: b.smask.subtype,
              backdrop: b.smask.backdrop,
              transferMap: b.smask.transferMap || null,
              startTransformInverse: null
            }) : (f.setTransform(1, 0, 0, 1, 0, 0), f.translate(p, _), f.scale(X, $), f.save()), O(f, K), this.ctx = K, this.setGState([["BM", "source-over"], ["ca", 1], ["CA", 1]]), this.groupStack.push(f), this.groupLevel++;
          }
          endGroup(b) {
            if (!this.contentVisible)
              return;
            this.groupLevel--;
            const f = this.ctx, w = this.groupStack.pop();
            if (this.ctx = w, this.ctx.imageSmoothingEnabled = !1, b.smask)
              this.tempSMask = this.smaskStack.pop(), this.restore();
            else {
              this.ctx.restore();
              const s = this.ctx.mozCurrentTransform;
              this.restore(), this.ctx.save(), this.ctx.setTransform.apply(this.ctx, s);
              const c = e.Util.getAxialAlignedBoundingBox([0, 0, f.canvas.width, f.canvas.height], s);
              this.ctx.drawImage(f.canvas, 0, 0), this.ctx.restore(), this.compose(c);
            }
          }
          beginAnnotation(b, f, w, s, c) {
            if (lt(this, ct, de).call(this), D(this.ctx, this.foregroundColor), this.ctx.save(), this.save(), this.baseTransform && this.ctx.setTransform.apply(this.ctx, this.baseTransform), Array.isArray(f) && f.length === 4) {
              const p = f[2] - f[0], _ = f[3] - f[1];
              if (c && this.annotationCanvasMap) {
                w = w.slice(), w[4] -= f[0], w[5] -= f[1], f = f.slice(), f[0] = f[1] = 0, f[2] = p, f[3] = _;
                const [E, j] = e.Util.singularValueDecompose2dScale(this.ctx.mozCurrentTransform), {
                  viewportScale: X
                } = this, $ = Math.ceil(p * this.outputScaleX * X), q = Math.ceil(_ * this.outputScaleY * X);
                this.annotationCanvas = this.canvasFactory.create($, q);
                const {
                  canvas: tt,
                  context: K
                } = this.annotationCanvas;
                this.annotationCanvasMap.set(b, tt), this.annotationCanvas.savedCtx = this.ctx, this.ctx = K, l(this.ctx), this.ctx.setTransform(E, 0, 0, -j, 0, _ * j), D(this.ctx, this.foregroundColor);
              } else
                D(this.ctx, this.foregroundColor), this.ctx.rect(f[0], f[1], p, _), this.ctx.clip(), this.endPath();
            }
            this.current = new o(this.ctx.canvas.width, this.ctx.canvas.height), this.transform.apply(this, w), this.transform.apply(this, s);
          }
          endAnnotation() {
            this.annotationCanvas && (this.ctx = this.annotationCanvas.savedCtx, delete this.annotationCanvas.savedCtx, delete this.annotationCanvas);
          }
          paintImageMaskXObject(b) {
            if (!this.contentVisible)
              return;
            const f = b.count;
            b = this.getObject(b.data, b), b.count = f;
            const w = this.ctx, s = this.processingType3;
            if (s && (s.compiled === void 0 && (s.compiled = g(b)), s.compiled)) {
              s.compiled(w);
              return;
            }
            const c = this._createMaskCanvas(b), p = c.canvas;
            w.save(), w.setTransform(1, 0, 0, 1, 0, 0), w.drawImage(p, c.offsetX, c.offsetY), w.restore(), this.compose();
          }
          paintImageMaskXObjectRepeat(b, f, w = 0, s = 0, c, p) {
            if (!this.contentVisible)
              return;
            b = this.getObject(b.data, b);
            const _ = this.ctx;
            _.save();
            const E = _.mozCurrentTransform;
            _.transform(f, w, s, c, 0, 0);
            const j = this._createMaskCanvas(b);
            _.setTransform(1, 0, 0, 1, 0, 0);
            for (let X = 0, $ = p.length; X < $; X += 2) {
              const q = e.Util.transform(E, [f, w, s, c, p[X], p[X + 1]]), [tt, K] = e.Util.applyTransform([0, 0], q);
              _.drawImage(j.canvas, tt, K);
            }
            _.restore(), this.compose();
          }
          paintImageMaskXObjectGroup(b) {
            if (!this.contentVisible)
              return;
            const f = this.ctx, w = this.current.fillColor, s = this.current.patternFill;
            for (const c of b) {
              const {
                data: p,
                width: _,
                height: E,
                transform: j
              } = c, X = this.cachedCanvases.getCanvas("maskCanvas", _, E, !1), $ = X.context;
              $.save();
              const q = this.getObject(p, c);
              v($, q), $.globalCompositeOperation = "source-in", $.fillStyle = s ? w.getPattern($, this, f.mozCurrentTransformInverse, C.PathType.FILL) : w, $.fillRect(0, 0, _, E), $.restore(), f.save(), f.transform.apply(f, j), f.scale(1, -1), y(f, X.canvas, 0, 0, _, E, 0, -1, 1, 1), f.restore();
            }
            this.compose();
          }
          paintImageXObject(b) {
            if (!this.contentVisible)
              return;
            const f = this.getObject(b);
            if (!f) {
              (0, e.warn)("Dependent image isn't ready yet");
              return;
            }
            this.paintInlineImageXObject(f);
          }
          paintImageXObjectRepeat(b, f, w, s) {
            if (!this.contentVisible)
              return;
            const c = this.getObject(b);
            if (!c) {
              (0, e.warn)("Dependent image isn't ready yet");
              return;
            }
            const p = c.width, _ = c.height, E = [];
            for (let j = 0, X = s.length; j < X; j += 2)
              E.push({
                transform: [f, 0, 0, w, s[j], s[j + 1]],
                x: 0,
                y: 0,
                w: p,
                h: _
              });
            this.paintInlineImageXObjectGroup(c, E);
          }
          paintInlineImageXObject(b) {
            if (!this.contentVisible)
              return;
            const f = b.width, w = b.height, s = this.ctx;
            this.save(), s.scale(1 / f, -1 / w);
            let c;
            if (typeof HTMLElement == "function" && b instanceof HTMLElement || !b.data)
              c = b;
            else {
              const j = this.cachedCanvases.getCanvas("inlineImage", f, w, !1), X = j.context;
              h(X, b, this.current.transferMaps), c = j.canvas;
            }
            const p = this._scaleImage(c, s.mozCurrentTransformInverse);
            s.imageSmoothingEnabled = G(s.mozCurrentTransform, b.interpolate);
            const [_, E] = y(s, p.img, 0, 0, p.paintWidth, p.paintHeight, 0, -w, f, w);
            if (this.imageLayer) {
              const j = this.getCanvasPosition(0, -w);
              this.imageLayer.appendImage({
                imgData: b,
                left: j[0],
                top: j[1],
                width: _,
                height: E
              });
            }
            this.compose(), this.restore();
          }
          paintInlineImageXObjectGroup(b, f) {
            if (!this.contentVisible)
              return;
            const w = this.ctx, s = b.width, c = b.height, p = this.cachedCanvases.getCanvas("inlineImage", s, c, !1), _ = p.context;
            h(_, b, this.current.transferMaps);
            for (let E = 0, j = f.length; E < j; E++) {
              const X = f[E];
              if (w.save(), w.transform.apply(w, X.transform), w.scale(1, -1), y(w, p.canvas, X.x, X.y, X.w, X.h, 0, -1, 1, 1), this.imageLayer) {
                const $ = this.getCanvasPosition(X.x, X.y);
                this.imageLayer.appendImage({
                  imgData: b,
                  left: $[0],
                  top: $[1],
                  width: s,
                  height: c
                });
              }
              w.restore();
            }
            this.compose();
          }
          paintSolidColorImageMask() {
            !this.contentVisible || (this.ctx.fillRect(0, 0, 1, 1), this.compose());
          }
          markPoint(b) {
          }
          markPointProps(b, f) {
          }
          beginMarkedContent(b) {
            this.markedContentStack.push({
              visible: !0
            });
          }
          beginMarkedContentProps(b, f) {
            b === "OC" ? this.markedContentStack.push({
              visible: this.optionalContentConfig.isVisible(f)
            }) : this.markedContentStack.push({
              visible: !0
            }), this.contentVisible = this.isContentVisible();
          }
          endMarkedContent() {
            this.markedContentStack.pop(), this.contentVisible = this.isContentVisible();
          }
          beginCompat() {
          }
          endCompat() {
          }
          consumePath(b) {
            const f = this.current.isEmptyClip();
            this.pendingClip && this.current.updateClipFromPath(), this.pendingClip || this.compose(b);
            const w = this.ctx;
            this.pendingClip && (f || (this.pendingClip === st ? w.clip("evenodd") : w.clip()), this.pendingClip = null), this.current.startNewPathAndClipBox(this.current.clipBox), w.beginPath();
          }
          getSinglePixelWidth() {
            if (!this._cachedGetSinglePixelWidth) {
              const b = this.ctx.mozCurrentTransform;
              if (b[1] === 0 && b[2] === 0)
                this._cachedGetSinglePixelWidth = 1 / Math.min(Math.abs(b[0]), Math.abs(b[3]));
              else {
                const f = Math.abs(b[0] * b[3] - b[2] * b[1]), w = Math.hypot(b[0], b[2]), s = Math.hypot(b[1], b[3]);
                this._cachedGetSinglePixelWidth = Math.max(w, s) / f;
              }
            }
            return this._cachedGetSinglePixelWidth;
          }
          getScaleForStroking() {
            if (!this._cachedScaleForStroking) {
              const {
                lineWidth: b
              } = this.current, f = this.ctx.mozCurrentTransform;
              let w, s;
              if (f[1] === 0 && f[2] === 0) {
                const c = Math.abs(f[0]), p = Math.abs(f[3]);
                if (b === 0)
                  w = 1 / c, s = 1 / p;
                else {
                  const _ = c * b, E = p * b;
                  w = _ < 1 ? 1 / _ : 1, s = E < 1 ? 1 / E : 1;
                }
              } else {
                const c = Math.abs(f[0] * f[3] - f[2] * f[1]), p = Math.hypot(f[0], f[1]), _ = Math.hypot(f[2], f[3]);
                if (b === 0)
                  w = _ / c, s = p / c;
                else {
                  const E = b * c;
                  w = _ > E ? _ / E : 1, s = p > E ? p / E : 1;
                }
              }
              this._cachedScaleForStroking = [w, s];
            }
            return this._cachedScaleForStroking;
          }
          rescaleAndStroke(b) {
            const {
              ctx: f
            } = this, {
              lineWidth: w
            } = this.current, [s, c] = this.getScaleForStroking();
            if (f.lineWidth = w || 1, s === 1 && c === 1) {
              f.stroke();
              return;
            }
            let p, _, E;
            b && (p = f.mozCurrentTransform.slice(), _ = f.getLineDash().slice(), E = f.lineDashOffset), f.scale(s, c);
            const j = Math.max(s, c);
            f.setLineDash(f.getLineDash().map((X) => X / j)), f.lineDashOffset /= j, f.stroke(), b && (f.setTransform(...p), f.setLineDash(_), f.lineDashOffset = E);
          }
          getCanvasPosition(b, f) {
            const w = this.ctx.mozCurrentTransform;
            return [w[0] * b + w[2] * f + w[4], w[1] * b + w[3] * f + w[5]];
          }
          isContentVisible() {
            for (let b = this.markedContentStack.length - 1; b >= 0; b--)
              if (!this.markedContentStack[b].visible)
                return !1;
            return !0;
          }
        };
        let ot = bt;
        ct = new WeakSet(), de = function() {
          for (; this.stateStack.length || this.inSMaskMode; )
            this.restore();
          this.ctx.restore(), this.transparentCanvas && (this.ctx = this.compositeCtx, this.ctx.save(), this.ctx.setTransform(1, 0, 0, 1, 0, 0), this.ctx.drawImage(this.transparentCanvas, 0, 0), this.ctx.restore(), this.transparentCanvas = null);
        }, i.CanvasGraphics = ot;
        for (const B in e.OPS)
          ot.prototype[B] !== void 0 && (ot.prototype[e.OPS[B]] = ot.prototype[B]);
      },
      (t, i, r) => {
        Object.defineProperty(i, "__esModule", {
          value: !0
        }), i.TilingPattern = i.PathType = void 0, i.getShadingPattern = P;
        var e = r(1), d = r(3);
        const C = {
          FILL: "Fill",
          STROKE: "Stroke",
          SHADING: "Shading"
        };
        i.PathType = C;
        function T(a, l) {
          if (!l || d.isNodeJS)
            return;
          const F = l[2] - l[0], y = l[3] - l[1], g = new Path2D();
          g.rect(l[0], l[1], F, y), a.clip(g);
        }
        class I {
          constructor() {
            this.constructor === I && (0, e.unreachable)("Cannot initialize BaseShadingPattern.");
          }
          getPattern() {
            (0, e.unreachable)("Abstract method `getPattern` called.");
          }
        }
        class x extends I {
          constructor(l) {
            super(), this._type = l[1], this._bbox = l[2], this._colorStops = l[3], this._p0 = l[4], this._p1 = l[5], this._r0 = l[6], this._r1 = l[7], this.matrix = null;
          }
          _createGradient(l) {
            let F;
            this._type === "axial" ? F = l.createLinearGradient(this._p0[0], this._p0[1], this._p1[0], this._p1[1]) : this._type === "radial" && (F = l.createRadialGradient(this._p0[0], this._p0[1], this._r0, this._p1[0], this._p1[1], this._r1));
            for (const y of this._colorStops)
              F.addColorStop(y[0], y[1]);
            return F;
          }
          getPattern(l, F, y, g) {
            let o;
            if (g === C.STROKE || g === C.FILL) {
              const h = F.current.getClippedPathBoundingBox(g, l.mozCurrentTransform) || [0, 0, 0, 0], v = Math.ceil(h[2] - h[0]) || 1, O = Math.ceil(h[3] - h[1]) || 1, D = F.cachedCanvases.getCanvas("pattern", v, O, !0), L = D.context;
              L.clearRect(0, 0, L.canvas.width, L.canvas.height), L.beginPath(), L.rect(0, 0, L.canvas.width, L.canvas.height), L.translate(-h[0], -h[1]), y = e.Util.transform(y, [1, 0, 0, 1, h[0], h[1]]), L.transform.apply(L, F.baseTransform), this.matrix && L.transform.apply(L, this.matrix), T(L, this._bbox), L.fillStyle = this._createGradient(L), L.fill(), o = l.createPattern(D.canvas, "no-repeat");
              const U = new DOMMatrix(y);
              try {
                o.setTransform(U);
              } catch (J) {
                (0, e.warn)(`RadialAxialShadingPattern.getPattern: "${J == null ? void 0 : J.message}".`);
              }
            } else
              T(l, this._bbox), o = this._createGradient(l);
            return o;
          }
        }
        function m(a, l, F, y, g, o, h, v) {
          const O = l.coords, D = l.colors, L = a.data, U = a.width * 4;
          let J;
          O[F + 1] > O[y + 1] && (J = F, F = y, y = J, J = o, o = h, h = J), O[y + 1] > O[g + 1] && (J = y, y = g, g = J, J = h, h = v, v = J), O[F + 1] > O[y + 1] && (J = F, F = y, y = J, J = o, o = h, h = J);
          const V = (O[F] + l.offsetX) * l.scaleX, N = (O[F + 1] + l.offsetY) * l.scaleY, G = (O[y] + l.offsetX) * l.scaleX, k = (O[y + 1] + l.offsetY) * l.scaleY, z = (O[g] + l.offsetX) * l.scaleX, W = (O[g + 1] + l.offsetY) * l.scaleY;
          if (N >= W)
            return;
          const st = D[o], ot = D[o + 1], ct = D[o + 2], mt = D[h], bt = D[h + 1], B = D[h + 2], b = D[v], f = D[v + 1], w = D[v + 2], s = Math.round(N), c = Math.round(W);
          let p, _, E, j, X, $, q, tt;
          for (let K = s; K <= c; K++) {
            if (K < k) {
              let rt;
              K < N ? rt = 0 : rt = (N - K) / (N - k), p = V - (V - G) * rt, _ = st - (st - mt) * rt, E = ot - (ot - bt) * rt, j = ct - (ct - B) * rt;
            } else {
              let rt;
              K > W ? rt = 1 : k === W ? rt = 0 : rt = (k - K) / (k - W), p = G - (G - z) * rt, _ = mt - (mt - b) * rt, E = bt - (bt - f) * rt, j = B - (B - w) * rt;
            }
            let et;
            K < N ? et = 0 : K > W ? et = 1 : et = (N - K) / (N - W), X = V - (V - z) * et, $ = st - (st - b) * et, q = ot - (ot - f) * et, tt = ct - (ct - w) * et;
            const ft = Math.round(Math.min(p, X)), pt = Math.round(Math.max(p, X));
            let vt = U * K + ft * 4;
            for (let rt = ft; rt <= pt; rt++)
              et = (p - rt) / (p - X), et < 0 ? et = 0 : et > 1 && (et = 1), L[vt++] = _ - (_ - $) * et | 0, L[vt++] = E - (E - q) * et | 0, L[vt++] = j - (j - tt) * et | 0, L[vt++] = 255;
          }
        }
        function S(a, l, F) {
          const y = l.coords, g = l.colors;
          let o, h;
          switch (l.type) {
            case "lattice":
              const v = l.verticesPerRow, O = Math.floor(y.length / v) - 1, D = v - 1;
              for (o = 0; o < O; o++) {
                let L = o * v;
                for (let U = 0; U < D; U++, L++)
                  m(a, F, y[L], y[L + 1], y[L + v], g[L], g[L + 1], g[L + v]), m(a, F, y[L + v + 1], y[L + 1], y[L + v], g[L + v + 1], g[L + 1], g[L + v]);
              }
              break;
            case "triangles":
              for (o = 0, h = y.length; o < h; o += 3)
                m(a, F, y[o], y[o + 1], y[o + 2], g[o], g[o + 1], g[o + 2]);
              break;
            default:
              throw new Error("illegal figure");
          }
        }
        class R extends I {
          constructor(l) {
            super(), this._coords = l[2], this._colors = l[3], this._figures = l[4], this._bounds = l[5], this._bbox = l[7], this._background = l[8], this.matrix = null;
          }
          _createMeshCanvas(l, F, y) {
            const v = Math.floor(this._bounds[0]), O = Math.floor(this._bounds[1]), D = Math.ceil(this._bounds[2]) - v, L = Math.ceil(this._bounds[3]) - O, U = Math.min(Math.ceil(Math.abs(D * l[0] * 1.1)), 3e3), J = Math.min(Math.ceil(Math.abs(L * l[1] * 1.1)), 3e3), V = D / U, N = L / J, G = {
              coords: this._coords,
              colors: this._colors,
              offsetX: -v,
              offsetY: -O,
              scaleX: 1 / V,
              scaleY: 1 / N
            }, k = U + 2 * 2, z = J + 2 * 2, W = y.getCanvas("mesh", k, z, !1), st = W.context, ot = st.createImageData(U, J);
            if (F) {
              const mt = ot.data;
              for (let bt = 0, B = mt.length; bt < B; bt += 4)
                mt[bt] = F[0], mt[bt + 1] = F[1], mt[bt + 2] = F[2], mt[bt + 3] = 255;
            }
            for (const mt of this._figures)
              S(ot, mt, G);
            return st.putImageData(ot, 2, 2), {
              canvas: W.canvas,
              offsetX: v - 2 * V,
              offsetY: O - 2 * N,
              scaleX: V,
              scaleY: N
            };
          }
          getPattern(l, F, y, g) {
            T(l, this._bbox);
            let o;
            if (g === C.SHADING)
              o = e.Util.singularValueDecompose2dScale(l.mozCurrentTransform);
            else if (o = e.Util.singularValueDecompose2dScale(F.baseTransform), this.matrix) {
              const v = e.Util.singularValueDecompose2dScale(this.matrix);
              o = [o[0] * v[0], o[1] * v[1]];
            }
            const h = this._createMeshCanvas(o, g === C.SHADING ? null : this._background, F.cachedCanvases);
            return g !== C.SHADING && (l.setTransform.apply(l, F.baseTransform), this.matrix && l.transform.apply(l, this.matrix)), l.translate(h.offsetX, h.offsetY), l.scale(h.scaleX, h.scaleY), l.createPattern(h.canvas, "no-repeat");
          }
        }
        class A extends I {
          getPattern() {
            return "hotpink";
          }
        }
        function P(a) {
          switch (a[0]) {
            case "RadialAxial":
              return new x(a);
            case "Mesh":
              return new R(a);
            case "Dummy":
              return new A();
          }
          throw new Error(`Unknown IR type: ${a[0]}`);
        }
        const u = {
          COLORED: 1,
          UNCOLORED: 2
        };
        class n {
          static get MAX_PATTERN_SIZE() {
            return (0, e.shadow)(this, "MAX_PATTERN_SIZE", 3e3);
          }
          constructor(l, F, y, g, o) {
            this.operatorList = l[2], this.matrix = l[3] || [1, 0, 0, 1, 0, 0], this.bbox = l[4], this.xstep = l[5], this.ystep = l[6], this.paintType = l[7], this.tilingType = l[8], this.color = F, this.ctx = y, this.canvasGraphicsFactory = g, this.baseTransform = o;
          }
          createPatternCanvas(l) {
            const F = this.operatorList, y = this.bbox, g = this.xstep, o = this.ystep, h = this.paintType, v = this.tilingType, O = this.color, D = this.canvasGraphicsFactory;
            (0, e.info)("TilingType: " + v);
            const L = y[0], U = y[1], J = y[2], V = y[3], N = e.Util.singularValueDecompose2dScale(this.matrix), G = e.Util.singularValueDecompose2dScale(this.baseTransform), k = [N[0] * G[0], N[1] * G[1]], z = this.getSizeAndScale(g, this.ctx.canvas.width, k[0]), W = this.getSizeAndScale(o, this.ctx.canvas.height, k[1]), st = l.cachedCanvases.getCanvas("pattern", z.size, W.size, !0), ot = st.context, ct = D.createCanvasGraphics(ot);
            ct.groupLevel = l.groupLevel, this.setFillAndStrokeStyleToContext(ct, h, O);
            let mt = L, bt = U, B = J, b = V;
            return L < 0 && (mt = 0, B += Math.abs(L)), U < 0 && (bt = 0, b += Math.abs(U)), ot.translate(-(z.scale * mt), -(W.scale * bt)), ct.transform(z.scale, 0, 0, W.scale, 0, 0), ot.save(), this.clipBbox(ct, mt, bt, B, b), ct.baseTransform = ct.ctx.mozCurrentTransform.slice(), ct.executeOperatorList(F), ct.endDrawing(), {
              canvas: st.canvas,
              scaleX: z.scale,
              scaleY: W.scale,
              offsetX: mt,
              offsetY: bt
            };
          }
          getSizeAndScale(l, F, y) {
            l = Math.abs(l);
            const g = Math.max(n.MAX_PATTERN_SIZE, F);
            let o = Math.ceil(l * y);
            return o >= g ? o = g : y = o / l, {
              scale: y,
              size: o
            };
          }
          clipBbox(l, F, y, g, o) {
            const h = g - F, v = o - y;
            l.ctx.rect(F, y, h, v), l.current.updateRectMinMax(l.ctx.mozCurrentTransform, [F, y, g, o]), l.clip(), l.endPath();
          }
          setFillAndStrokeStyleToContext(l, F, y) {
            const g = l.ctx, o = l.current;
            switch (F) {
              case u.COLORED:
                const h = this.ctx;
                g.fillStyle = h.fillStyle, g.strokeStyle = h.strokeStyle, o.fillColor = h.fillStyle, o.strokeColor = h.strokeStyle;
                break;
              case u.UNCOLORED:
                const v = e.Util.makeHexColor(y[0], y[1], y[2]);
                g.fillStyle = v, g.strokeStyle = v, o.fillColor = v, o.strokeColor = v;
                break;
              default:
                throw new e.FormatError(`Unsupported paint type: ${F}`);
            }
          }
          getPattern(l, F, y, g) {
            let o = y;
            g !== C.SHADING && (o = e.Util.transform(o, F.baseTransform), this.matrix && (o = e.Util.transform(o, this.matrix)));
            const h = this.createPatternCanvas(F);
            let v = new DOMMatrix(o);
            v = v.translate(h.offsetX, h.offsetY), v = v.scale(1 / h.scaleX, 1 / h.scaleY);
            const O = l.createPattern(h.canvas, "repeat");
            try {
              O.setTransform(v);
            } catch (D) {
              (0, e.warn)(`TilingPattern.getPattern: "${D == null ? void 0 : D.message}".`);
            }
            return O;
          }
        }
        i.TilingPattern = n;
      },
      (t, i, r) => {
        Object.defineProperty(i, "__esModule", {
          value: !0
        }), i.applyMaskImageData = d;
        var e = r(1);
        function d({
          src: C,
          srcPos: T = 0,
          dest: I,
          destPos: x = 0,
          width: m,
          height: S,
          inverseDecode: R = !1
        }) {
          const A = e.FeatureTest.isLittleEndian ? 4278190080 : 255, [P, u] = R ? [0, A] : [A, 0], n = m >> 3, a = m & 7, l = C.length;
          I = new Uint32Array(I.buffer);
          for (let F = 0; F < S; F++) {
            for (const g = T + n; T < g; T++) {
              const o = T < l ? C[T] : 255;
              I[x++] = o & 128 ? u : P, I[x++] = o & 64 ? u : P, I[x++] = o & 32 ? u : P, I[x++] = o & 16 ? u : P, I[x++] = o & 8 ? u : P, I[x++] = o & 4 ? u : P, I[x++] = o & 2 ? u : P, I[x++] = o & 1 ? u : P;
            }
            if (a === 0)
              continue;
            const y = T < l ? C[T++] : 255;
            for (let g = 0; g < a; g++)
              I[x++] = y & 1 << 7 - g ? u : P;
          }
          return {
            srcPos: T,
            destPos: x
          };
        }
      },
      (t, i) => {
        Object.defineProperty(i, "__esModule", {
          value: !0
        }), i.GlobalWorkerOptions = void 0;
        const r = /* @__PURE__ */ Object.create(null);
        i.GlobalWorkerOptions = r, r.workerPort = r.workerPort === void 0 ? null : r.workerPort, r.workerSrc = r.workerSrc === void 0 ? "" : r.workerSrc;
      },
      (t, i, r) => {
        Object.defineProperty(i, "__esModule", {
          value: !0
        }), i.MessageHandler = void 0;
        var e = r(1);
        const d = {
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
        function T(x) {
          switch (x instanceof Error || typeof x == "object" && x !== null || (0, e.unreachable)('wrapReason: Expected "reason" to be a (possibly cloned) Error.'), x.name) {
            case "AbortException":
              return new e.AbortException(x.message);
            case "MissingPDFException":
              return new e.MissingPDFException(x.message);
            case "PasswordException":
              return new e.PasswordException(x.message, x.code);
            case "UnexpectedResponseException":
              return new e.UnexpectedResponseException(x.message, x.status);
            case "UnknownErrorException":
              return new e.UnknownErrorException(x.message, x.details);
            default:
              return new e.UnknownErrorException(x.message, x.toString());
          }
        }
        class I {
          constructor(m, S, R) {
            this.sourceName = m, this.targetName = S, this.comObj = R, this.callbackId = 1, this.streamId = 1, this.streamSinks = /* @__PURE__ */ Object.create(null), this.streamControllers = /* @__PURE__ */ Object.create(null), this.callbackCapabilities = /* @__PURE__ */ Object.create(null), this.actionHandler = /* @__PURE__ */ Object.create(null), this._onComObjOnMessage = (A) => {
              const P = A.data;
              if (P.targetName !== this.sourceName)
                return;
              if (P.stream) {
                this._processStreamMessage(P);
                return;
              }
              if (P.callback) {
                const n = P.callbackId, a = this.callbackCapabilities[n];
                if (!a)
                  throw new Error(`Cannot resolve callback ${n}`);
                if (delete this.callbackCapabilities[n], P.callback === d.DATA)
                  a.resolve(P.data);
                else if (P.callback === d.ERROR)
                  a.reject(T(P.reason));
                else
                  throw new Error("Unexpected callback case");
                return;
              }
              const u = this.actionHandler[P.action];
              if (!u)
                throw new Error(`Unknown action from worker: ${P.action}`);
              if (P.callbackId) {
                const n = this.sourceName, a = P.sourceName;
                new Promise(function(l) {
                  l(u(P.data));
                }).then(function(l) {
                  R.postMessage({
                    sourceName: n,
                    targetName: a,
                    callback: d.DATA,
                    callbackId: P.callbackId,
                    data: l
                  });
                }, function(l) {
                  R.postMessage({
                    sourceName: n,
                    targetName: a,
                    callback: d.ERROR,
                    callbackId: P.callbackId,
                    reason: T(l)
                  });
                });
                return;
              }
              if (P.streamId) {
                this._createStreamSink(P);
                return;
              }
              u(P.data);
            }, R.addEventListener("message", this._onComObjOnMessage);
          }
          on(m, S) {
            const R = this.actionHandler;
            if (R[m])
              throw new Error(`There is already an actionName called "${m}"`);
            R[m] = S;
          }
          send(m, S, R) {
            this.comObj.postMessage({
              sourceName: this.sourceName,
              targetName: this.targetName,
              action: m,
              data: S
            }, R);
          }
          sendWithPromise(m, S, R) {
            const A = this.callbackId++, P = (0, e.createPromiseCapability)();
            this.callbackCapabilities[A] = P;
            try {
              this.comObj.postMessage({
                sourceName: this.sourceName,
                targetName: this.targetName,
                action: m,
                callbackId: A,
                data: S
              }, R);
            } catch (u) {
              P.reject(u);
            }
            return P.promise;
          }
          sendWithStream(m, S, R, A) {
            const P = this.streamId++, u = this.sourceName, n = this.targetName, a = this.comObj;
            return new ReadableStream({
              start: (l) => {
                const F = (0, e.createPromiseCapability)();
                return this.streamControllers[P] = {
                  controller: l,
                  startCall: F,
                  pullCall: null,
                  cancelCall: null,
                  isClosed: !1
                }, a.postMessage({
                  sourceName: u,
                  targetName: n,
                  action: m,
                  streamId: P,
                  data: S,
                  desiredSize: l.desiredSize
                }, A), F.promise;
              },
              pull: (l) => {
                const F = (0, e.createPromiseCapability)();
                return this.streamControllers[P].pullCall = F, a.postMessage({
                  sourceName: u,
                  targetName: n,
                  stream: C.PULL,
                  streamId: P,
                  desiredSize: l.desiredSize
                }), F.promise;
              },
              cancel: (l) => {
                (0, e.assert)(l instanceof Error, "cancel must have a valid reason");
                const F = (0, e.createPromiseCapability)();
                return this.streamControllers[P].cancelCall = F, this.streamControllers[P].isClosed = !0, a.postMessage({
                  sourceName: u,
                  targetName: n,
                  stream: C.CANCEL,
                  streamId: P,
                  reason: T(l)
                }), F.promise;
              }
            }, R);
          }
          _createStreamSink(m) {
            const S = m.streamId, R = this.sourceName, A = m.sourceName, P = this.comObj, u = this, n = this.actionHandler[m.action], a = {
              enqueue(l, F = 1, y) {
                if (this.isCancelled)
                  return;
                const g = this.desiredSize;
                this.desiredSize -= F, g > 0 && this.desiredSize <= 0 && (this.sinkCapability = (0, e.createPromiseCapability)(), this.ready = this.sinkCapability.promise), P.postMessage({
                  sourceName: R,
                  targetName: A,
                  stream: C.ENQUEUE,
                  streamId: S,
                  chunk: l
                }, y);
              },
              close() {
                this.isCancelled || (this.isCancelled = !0, P.postMessage({
                  sourceName: R,
                  targetName: A,
                  stream: C.CLOSE,
                  streamId: S
                }), delete u.streamSinks[S]);
              },
              error(l) {
                (0, e.assert)(l instanceof Error, "error must have a valid reason"), !this.isCancelled && (this.isCancelled = !0, P.postMessage({
                  sourceName: R,
                  targetName: A,
                  stream: C.ERROR,
                  streamId: S,
                  reason: T(l)
                }));
              },
              sinkCapability: (0, e.createPromiseCapability)(),
              onPull: null,
              onCancel: null,
              isCancelled: !1,
              desiredSize: m.desiredSize,
              ready: null
            };
            a.sinkCapability.resolve(), a.ready = a.sinkCapability.promise, this.streamSinks[S] = a, new Promise(function(l) {
              l(n(m.data, a));
            }).then(function() {
              P.postMessage({
                sourceName: R,
                targetName: A,
                stream: C.START_COMPLETE,
                streamId: S,
                success: !0
              });
            }, function(l) {
              P.postMessage({
                sourceName: R,
                targetName: A,
                stream: C.START_COMPLETE,
                streamId: S,
                reason: T(l)
              });
            });
          }
          _processStreamMessage(m) {
            const S = m.streamId, R = this.sourceName, A = m.sourceName, P = this.comObj, u = this.streamControllers[S], n = this.streamSinks[S];
            switch (m.stream) {
              case C.START_COMPLETE:
                m.success ? u.startCall.resolve() : u.startCall.reject(T(m.reason));
                break;
              case C.PULL_COMPLETE:
                m.success ? u.pullCall.resolve() : u.pullCall.reject(T(m.reason));
                break;
              case C.PULL:
                if (!n) {
                  P.postMessage({
                    sourceName: R,
                    targetName: A,
                    stream: C.PULL_COMPLETE,
                    streamId: S,
                    success: !0
                  });
                  break;
                }
                n.desiredSize <= 0 && m.desiredSize > 0 && n.sinkCapability.resolve(), n.desiredSize = m.desiredSize, new Promise(function(a) {
                  a(n.onPull && n.onPull());
                }).then(function() {
                  P.postMessage({
                    sourceName: R,
                    targetName: A,
                    stream: C.PULL_COMPLETE,
                    streamId: S,
                    success: !0
                  });
                }, function(a) {
                  P.postMessage({
                    sourceName: R,
                    targetName: A,
                    stream: C.PULL_COMPLETE,
                    streamId: S,
                    reason: T(a)
                  });
                });
                break;
              case C.ENQUEUE:
                if ((0, e.assert)(u, "enqueue should have stream controller"), u.isClosed)
                  break;
                u.controller.enqueue(m.chunk);
                break;
              case C.CLOSE:
                if ((0, e.assert)(u, "close should have stream controller"), u.isClosed)
                  break;
                u.isClosed = !0, u.controller.close(), this._deleteStreamController(u, S);
                break;
              case C.ERROR:
                (0, e.assert)(u, "error should have stream controller"), u.controller.error(T(m.reason)), this._deleteStreamController(u, S);
                break;
              case C.CANCEL_COMPLETE:
                m.success ? u.cancelCall.resolve() : u.cancelCall.reject(T(m.reason)), this._deleteStreamController(u, S);
                break;
              case C.CANCEL:
                if (!n)
                  break;
                new Promise(function(a) {
                  a(n.onCancel && n.onCancel(T(m.reason)));
                }).then(function() {
                  P.postMessage({
                    sourceName: R,
                    targetName: A,
                    stream: C.CANCEL_COMPLETE,
                    streamId: S,
                    success: !0
                  });
                }, function(a) {
                  P.postMessage({
                    sourceName: R,
                    targetName: A,
                    stream: C.CANCEL_COMPLETE,
                    streamId: S,
                    reason: T(a)
                  });
                }), n.sinkCapability.reject(T(m.reason)), n.isCancelled = !0, delete this.streamSinks[S];
                break;
              default:
                throw new Error("Unexpected stream case");
            }
          }
          async _deleteStreamController(m, S) {
            await Promise.allSettled([m.startCall && m.startCall.promise, m.pullCall && m.pullCall.promise, m.cancelCall && m.cancelCall.promise]), delete this.streamControllers[S];
          }
          destroy() {
            this.comObj.removeEventListener("message", this._onComObjOnMessage);
          }
        }
        i.MessageHandler = I;
      },
      (t, i, r) => {
        var C, T;
        Object.defineProperty(i, "__esModule", {
          value: !0
        }), i.Metadata = void 0;
        var e = r(1);
        class d {
          constructor({
            parsedData: x,
            rawData: m
          }) {
            at(this, C, void 0);
            at(this, T, void 0);
            ut(this, C, x), ut(this, T, m);
          }
          getRaw() {
            return M(this, T);
          }
          get(x) {
            var m;
            return (m = M(this, C).get(x)) != null ? m : null;
          }
          getAll() {
            return (0, e.objectFromMap)(M(this, C));
          }
          has(x) {
            return M(this, C).has(x);
          }
        }
        C = new WeakMap(), T = new WeakMap(), i.Metadata = d;
      },
      (t, i, r) => {
        var I, x, m, S, R, A, ue;
        Object.defineProperty(i, "__esModule", {
          value: !0
        }), i.OptionalContentConfig = void 0;
        var e = r(1);
        const d = Symbol("INTERNAL");
        class C {
          constructor(n, a) {
            at(this, I, !0);
            this.name = n, this.intent = a;
          }
          get visible() {
            return M(this, I);
          }
          _setVisible(n, a) {
            n !== d && (0, e.unreachable)("Internal method `_setVisible` called."), ut(this, I, a);
          }
        }
        I = new WeakMap();
        class T {
          constructor(n) {
            at(this, A);
            at(this, x, !0);
            at(this, m, /* @__PURE__ */ new Map());
            at(this, S, null);
            at(this, R, null);
            if (this.name = null, this.creator = null, n !== null) {
              this.name = n.name, this.creator = n.creator, ut(this, R, n.order);
              for (const a of n.groups)
                M(this, m).set(a.id, new C(a.name, a.intent));
              if (n.baseState === "OFF")
                for (const a of M(this, m).values())
                  a._setVisible(d, !1);
              for (const a of n.on)
                M(this, m).get(a)._setVisible(d, !0);
              for (const a of n.off)
                M(this, m).get(a)._setVisible(d, !1);
              ut(this, S, /* @__PURE__ */ new Map());
              for (const [a, l] of M(this, m))
                M(this, S).set(a, l.visible);
            }
          }
          isVisible(n) {
            if (M(this, m).size === 0)
              return !0;
            if (!n)
              return (0, e.warn)("Optional content group not defined."), !0;
            if (n.type === "OCG")
              return M(this, m).has(n.id) ? M(this, m).get(n.id).visible : ((0, e.warn)(`Optional content group not found: ${n.id}`), !0);
            if (n.type === "OCMD") {
              if (n.expression)
                return lt(this, A, ue).call(this, n.expression);
              if (!n.policy || n.policy === "AnyOn") {
                for (const a of n.ids) {
                  if (!M(this, m).has(a))
                    return (0, e.warn)(`Optional content group not found: ${a}`), !0;
                  if (M(this, m).get(a).visible)
                    return !0;
                }
                return !1;
              } else if (n.policy === "AllOn") {
                for (const a of n.ids) {
                  if (!M(this, m).has(a))
                    return (0, e.warn)(`Optional content group not found: ${a}`), !0;
                  if (!M(this, m).get(a).visible)
                    return !1;
                }
                return !0;
              } else if (n.policy === "AnyOff") {
                for (const a of n.ids) {
                  if (!M(this, m).has(a))
                    return (0, e.warn)(`Optional content group not found: ${a}`), !0;
                  if (!M(this, m).get(a).visible)
                    return !0;
                }
                return !1;
              } else if (n.policy === "AllOff") {
                for (const a of n.ids) {
                  if (!M(this, m).has(a))
                    return (0, e.warn)(`Optional content group not found: ${a}`), !0;
                  if (M(this, m).get(a).visible)
                    return !1;
                }
                return !0;
              }
              return (0, e.warn)(`Unknown optional content policy ${n.policy}.`), !0;
            }
            return (0, e.warn)(`Unknown group type ${n.type}.`), !0;
          }
          setVisibility(n, a = !0) {
            if (!M(this, m).has(n)) {
              (0, e.warn)(`Optional content group not found: ${n}`);
              return;
            }
            M(this, m).get(n)._setVisible(d, !!a), ut(this, x, null);
          }
          get hasInitialVisibility() {
            if (M(this, x) !== null)
              return M(this, x);
            for (const [n, a] of M(this, m)) {
              const l = M(this, S).get(n);
              if (a.visible !== l)
                return ut(this, x, !1);
            }
            return ut(this, x, !0);
          }
          getOrder() {
            return M(this, m).size ? M(this, R) ? M(this, R).slice() : [...M(this, m).keys()] : null;
          }
          getGroups() {
            return M(this, m).size > 0 ? (0, e.objectFromMap)(M(this, m)) : null;
          }
          getGroup(n) {
            return M(this, m).get(n) || null;
          }
        }
        x = new WeakMap(), m = new WeakMap(), S = new WeakMap(), R = new WeakMap(), A = new WeakSet(), ue = function(n) {
          const a = n.length;
          if (a < 2)
            return !0;
          const l = n[0];
          for (let F = 1; F < a; F++) {
            const y = n[F];
            let g;
            if (Array.isArray(y))
              g = lt(this, A, ue).call(this, y);
            else if (M(this, m).has(y))
              g = M(this, m).get(y).visible;
            else
              return (0, e.warn)(`Optional content group not found: ${y}`), !0;
            switch (l) {
              case "And":
                if (!g)
                  return !1;
                break;
              case "Or":
                if (g)
                  return !0;
                break;
              case "Not":
                return !g;
              default:
                return !0;
            }
          }
          return l === "And";
        }, i.OptionalContentConfig = T;
      },
      (t, i, r) => {
        Object.defineProperty(i, "__esModule", {
          value: !0
        }), i.PDFDataTransportStream = void 0;
        var e = r(1), d = r(4);
        class C {
          constructor(m, S) {
            (0, e.assert)(S, 'PDFDataTransportStream - missing required "pdfDataRangeTransport" argument.'), this._queuedChunks = [], this._progressiveDone = m.progressiveDone || !1, this._contentDispositionFilename = m.contentDispositionFilename || null;
            const R = m.initialData;
            if ((R == null ? void 0 : R.length) > 0) {
              const A = new Uint8Array(R).buffer;
              this._queuedChunks.push(A);
            }
            this._pdfDataRangeTransport = S, this._isStreamingSupported = !m.disableStream, this._isRangeSupported = !m.disableRange, this._contentLength = m.length, this._fullRequestReader = null, this._rangeReaders = [], this._pdfDataRangeTransport.addRangeListener((A, P) => {
              this._onReceiveData({
                begin: A,
                chunk: P
              });
            }), this._pdfDataRangeTransport.addProgressListener((A, P) => {
              this._onProgress({
                loaded: A,
                total: P
              });
            }), this._pdfDataRangeTransport.addProgressiveReadListener((A) => {
              this._onReceiveData({
                chunk: A
              });
            }), this._pdfDataRangeTransport.addProgressiveDoneListener(() => {
              this._onProgressiveDone();
            }), this._pdfDataRangeTransport.transportReady();
          }
          _onReceiveData(m) {
            const S = new Uint8Array(m.chunk).buffer;
            if (m.begin === void 0)
              this._fullRequestReader ? this._fullRequestReader._enqueue(S) : this._queuedChunks.push(S);
            else {
              const R = this._rangeReaders.some(function(A) {
                return A._begin !== m.begin ? !1 : (A._enqueue(S), !0);
              });
              (0, e.assert)(R, "_onReceiveData - no `PDFDataTransportStreamRangeReader` instance found.");
            }
          }
          get _progressiveDataLength() {
            var m, S;
            return (S = (m = this._fullRequestReader) == null ? void 0 : m._loaded) != null ? S : 0;
          }
          _onProgress(m) {
            if (m.total === void 0) {
              const S = this._rangeReaders[0];
              S != null && S.onProgress && S.onProgress({
                loaded: m.loaded
              });
            } else {
              const S = this._fullRequestReader;
              S != null && S.onProgress && S.onProgress({
                loaded: m.loaded,
                total: m.total
              });
            }
          }
          _onProgressiveDone() {
            this._fullRequestReader && this._fullRequestReader.progressiveDone(), this._progressiveDone = !0;
          }
          _removeRangeReader(m) {
            const S = this._rangeReaders.indexOf(m);
            S >= 0 && this._rangeReaders.splice(S, 1);
          }
          getFullReader() {
            (0, e.assert)(!this._fullRequestReader, "PDFDataTransportStream.getFullReader can only be called once.");
            const m = this._queuedChunks;
            return this._queuedChunks = null, new T(this, m, this._progressiveDone, this._contentDispositionFilename);
          }
          getRangeReader(m, S) {
            if (S <= this._progressiveDataLength)
              return null;
            const R = new I(this, m, S);
            return this._pdfDataRangeTransport.requestDataRange(m, S), this._rangeReaders.push(R), R;
          }
          cancelAllRequests(m) {
            this._fullRequestReader && this._fullRequestReader.cancel(m);
            for (const S of this._rangeReaders.slice(0))
              S.cancel(m);
            this._pdfDataRangeTransport.abort();
          }
        }
        i.PDFDataTransportStream = C;
        class T {
          constructor(m, S, R = !1, A = null) {
            this._stream = m, this._done = R || !1, this._filename = (0, d.isPdfFile)(A) ? A : null, this._queuedChunks = S || [], this._loaded = 0;
            for (const P of this._queuedChunks)
              this._loaded += P.byteLength;
            this._requests = [], this._headersReady = Promise.resolve(), m._fullRequestReader = this, this.onProgress = null;
          }
          _enqueue(m) {
            this._done || (this._requests.length > 0 ? this._requests.shift().resolve({
              value: m,
              done: !1
            }) : this._queuedChunks.push(m), this._loaded += m.byteLength);
          }
          get headersReady() {
            return this._headersReady;
          }
          get filename() {
            return this._filename;
          }
          get isRangeSupported() {
            return this._stream._isRangeSupported;
          }
          get isStreamingSupported() {
            return this._stream._isStreamingSupported;
          }
          get contentLength() {
            return this._stream._contentLength;
          }
          async read() {
            if (this._queuedChunks.length > 0)
              return {
                value: this._queuedChunks.shift(),
                done: !1
              };
            if (this._done)
              return {
                value: void 0,
                done: !0
              };
            const m = (0, e.createPromiseCapability)();
            return this._requests.push(m), m.promise;
          }
          cancel(m) {
            this._done = !0;
            for (const S of this._requests)
              S.resolve({
                value: void 0,
                done: !0
              });
            this._requests.length = 0;
          }
          progressiveDone() {
            this._done || (this._done = !0);
          }
        }
        class I {
          constructor(m, S, R) {
            this._stream = m, this._begin = S, this._end = R, this._queuedChunk = null, this._requests = [], this._done = !1, this.onProgress = null;
          }
          _enqueue(m) {
            if (!this._done) {
              if (this._requests.length === 0)
                this._queuedChunk = m;
              else {
                this._requests.shift().resolve({
                  value: m,
                  done: !1
                });
                for (const R of this._requests)
                  R.resolve({
                    value: void 0,
                    done: !0
                  });
                this._requests.length = 0;
              }
              this._done = !0, this._stream._removeRangeReader(this);
            }
          }
          get isStreamingSupported() {
            return !1;
          }
          async read() {
            if (this._queuedChunk) {
              const S = this._queuedChunk;
              return this._queuedChunk = null, {
                value: S,
                done: !1
              };
            }
            if (this._done)
              return {
                value: void 0,
                done: !0
              };
            const m = (0, e.createPromiseCapability)();
            return this._requests.push(m), m.promise;
          }
          cancel(m) {
            this._done = !0;
            for (const S of this._requests)
              S.resolve({
                value: void 0,
                done: !0
              });
            this._requests.length = 0, this._stream._removeRangeReader(this);
          }
        }
      },
      (t, i) => {
        Object.defineProperty(i, "__esModule", {
          value: !0
        }), i.XfaText = void 0;
        class r {
          static textContent(d) {
            const C = [], T = {
              items: C,
              styles: /* @__PURE__ */ Object.create(null)
            };
            function I(x) {
              var R;
              if (!x)
                return;
              let m = null;
              const S = x.name;
              if (S === "#text")
                m = x.value;
              else if (r.shouldBuildText(S))
                (R = x == null ? void 0 : x.attributes) != null && R.textContent ? m = x.attributes.textContent : x.value && (m = x.value);
              else
                return;
              if (m !== null && C.push({
                str: m
              }), !!x.children)
                for (const A of x.children)
                  I(A);
            }
            return I(d), T;
          }
          static shouldBuildText(d) {
            return !(d === "textarea" || d === "input" || d === "option" || d === "select");
          }
        }
        i.XfaText = r;
      },
      (t, i, r) => {
        Object.defineProperty(i, "__esModule", {
          value: !0
        }), i.NodeStandardFontDataFactory = i.NodeCanvasFactory = i.NodeCMapReaderFactory = void 0;
        var e = r(5);
        const d = function(x) {
          return new Promise((m, S) => {
            require$$5.readFile(x, (A, P) => {
              if (A || !P) {
                S(new Error(A));
                return;
              }
              m(new Uint8Array(P));
            });
          });
        };
        class C extends e.BaseCanvasFactory {
          _createCanvas(m, S) {
            return require$$5.createCanvas(m, S);
          }
        }
        i.NodeCanvasFactory = C;
        class T extends e.BaseCMapReaderFactory {
          _fetchData(m, S) {
            return d(m).then((R) => ({
              cMapData: R,
              compressionType: S
            }));
          }
        }
        i.NodeCMapReaderFactory = T;
        class I extends e.BaseStandardFontDataFactory {
          _fetchData(m) {
            return d(m);
          }
        }
        i.NodeStandardFontDataFactory = I;
      },
      (t, i, r) => {
        var m, S, R, A, P, u, n, a, l, F, fe, g, pe, h, ee, O, Re, L, ge, J, Fe;
        Object.defineProperty(i, "__esModule", {
          value: !0
        }), i.AnnotationEditorLayer = void 0;
        var e = r(1), d = r(9), C = r(4), T = r(23), I = r(24);
        const N = class {
          constructor(k) {
            at(this, F);
            at(this, g);
            at(this, O);
            at(this, L);
            at(this, J);
            at(this, m, !1);
            at(this, S, this.pointerup.bind(this));
            at(this, R, this.pointerdown.bind(this));
            at(this, A, /* @__PURE__ */ new Map());
            at(this, P, !1);
            at(this, u, /* @__PURE__ */ new WeakMap());
            at(this, n, /* @__PURE__ */ new Map());
            at(this, a, void 0);
            at(this, l, /* @__PURE__ */ new Set());
            N._initialized || (N._initialized = !0, T.FreeTextEditor.initialize(k.l10n), I.InkEditor.initialize(k.l10n), k.uiManager.registerEditorTypes([T.FreeTextEditor, I.InkEditor])), ut(this, a, k.uiManager), this.annotationStorage = k.annotationStorage, this.pageIndex = k.pageIndex, this.div = k.div, M(this, a).addLayer(this);
          }
          get textLayerElements() {
            const k = this.div.parentNode.getElementsByClassName("textLayer").item(0);
            if (!k)
              return (0, e.shadow)(this, "textLayerElements", null);
            let z = M(this, u).get(k);
            return z || (z = k.querySelectorAll('span[role="presentation"]'), z.length === 0 ? (0, e.shadow)(this, "textLayerElements", null) : (z = Array.from(z), z.sort(lt(N, h, ee)), M(this, u).set(k, z), z));
          }
          updateToolbar(k) {
            M(this, a).updateToolbar(k);
          }
          updateMode(k = M(this, a).getMode()) {
            lt(this, J, Fe).call(this), k === e.AnnotationEditorType.INK ? (this.addInkEditorIfNeeded(!1), this.disableClick()) : this.enableClick(), M(this, a).unselectAll();
          }
          addInkEditorIfNeeded(k) {
            if (!k && M(this, a).getMode() !== e.AnnotationEditorType.INK)
              return;
            if (!k) {
              for (const W of M(this, A).values())
                if (W.isEmpty()) {
                  W.setInBackground();
                  return;
                }
            }
            lt(this, L, ge).call(this, {
              offsetX: 0,
              offsetY: 0
            }).setInBackground();
          }
          setEditingState(k) {
            M(this, a).setEditingState(k);
          }
          addCommands(k) {
            M(this, a).addCommands(k);
          }
          enable() {
            this.div.style.pointerEvents = "auto";
            for (const k of M(this, A).values())
              k.enableEditing();
          }
          disable() {
            this.div.style.pointerEvents = "none";
            for (const k of M(this, A).values())
              k.disableEditing();
          }
          setActiveEditor(k) {
            M(this, a).getActive() !== k && M(this, a).setActiveEditor(k);
          }
          enableClick() {
            this.div.addEventListener("pointerdown", M(this, R)), this.div.addEventListener("pointerup", M(this, S));
          }
          disableClick() {
            this.div.removeEventListener("pointerdown", M(this, R)), this.div.removeEventListener("pointerup", M(this, S));
          }
          attach(k) {
            M(this, A).set(k.id, k);
          }
          detach(k) {
            M(this, A).delete(k.id), this.removePointerInTextLayer(k);
          }
          remove(k) {
            M(this, a).removeEditor(k), this.detach(k), this.annotationStorage.removeKey(k.id), k.div.style.display = "none", setTimeout(() => {
              k.div.style.display = "", k.div.remove(), k.isAttachedToDOM = !1, document.activeElement === document.body && M(this, a).focusMainContainer();
            }, 0), M(this, P) || this.addInkEditorIfNeeded(!1);
          }
          onTextLayerRendered() {
            M(this, n).clear();
            for (const k of M(this, l))
              k.isAttachedToDOM && this.addPointerInTextLayer(k);
            M(this, l).clear();
          }
          removePointerInTextLayer(k) {
            if (!M(this, F, fe)) {
              M(this, l).delete(k);
              return;
            }
            const {
              id: z
            } = k, W = M(this, n).get(z);
            if (!W)
              return;
            M(this, n).delete(z);
            let st = W.getAttribute("aria-owns");
            st != null && st.includes(z) && (st = st.split(" ").filter((ot) => ot !== z).join(" "), st ? W.setAttribute("aria-owns", st) : (W.removeAttribute("aria-owns"), W.setAttribute("role", "presentation")));
          }
          addPointerInTextLayer(k) {
            if (!M(this, F, fe)) {
              M(this, l).add(k);
              return;
            }
            this.removePointerInTextLayer(k);
            const z = this.textLayerElements;
            if (!z)
              return;
            const {
              contentDiv: W
            } = k, st = k.getIdForTextLayer(), ot = (0, C.binarySearchFirstItem)(z, (bt) => {
              var B;
              return lt(B = N, h, ee).call(B, W, bt) < 0;
            }), ct = z[Math.max(0, ot - 1)], mt = ct.getAttribute("aria-owns");
            mt != null && mt.includes(st) || ct.setAttribute("aria-owns", mt ? `${mt} ${st}` : st), ct.removeAttribute("role"), M(this, n).set(st, ct);
          }
          moveDivInDOM(k) {
            this.addPointerInTextLayer(k);
            const {
              div: z,
              contentDiv: W
            } = k;
            if (!this.div.hasChildNodes()) {
              this.div.append(z);
              return;
            }
            const st = Array.from(this.div.childNodes).filter((ct) => ct !== z);
            if (st.length === 0)
              return;
            const ot = (0, C.binarySearchFirstItem)(st, (ct) => {
              var mt;
              return lt(mt = N, h, ee).call(mt, W, ct) < 0;
            });
            ot === 0 ? st[0].before(z) : st[ot - 1].after(z);
          }
          add(k) {
            if (lt(this, g, pe).call(this, k), this.addToAnnotationStorage(k), M(this, a).addEditor(k), this.attach(k), !k.isAttachedToDOM) {
              const z = k.render();
              this.div.append(z), k.isAttachedToDOM = !0;
            }
            this.moveDivInDOM(k), k.onceAdded();
          }
          addToAnnotationStorage(k) {
            !k.isEmpty() && !this.annotationStorage.has(k.id) && this.annotationStorage.setValue(k.id, k);
          }
          addOrRebuild(k) {
            k.needsToBeRebuilt() ? k.rebuild() : this.add(k);
          }
          addANewEditor(k) {
            const z = () => {
              this.addOrRebuild(k);
            }, W = () => {
              k.remove();
            };
            this.addCommands({
              cmd: z,
              undo: W,
              mustExec: !0
            });
          }
          addUndoableEditor(k) {
            const z = () => {
              this.addOrRebuild(k);
            }, W = () => {
              k.remove();
            };
            this.addCommands({
              cmd: z,
              undo: W,
              mustExec: !1
            });
          }
          getNextId() {
            return M(this, a).getId();
          }
          deserialize(k) {
            switch (k.annotationType) {
              case e.AnnotationEditorType.FREETEXT:
                return T.FreeTextEditor.deserialize(k, this);
              case e.AnnotationEditorType.INK:
                return I.InkEditor.deserialize(k, this);
            }
            return null;
          }
          setSelected(k) {
            M(this, a).setSelected(k);
          }
          toggleSelected(k) {
            M(this, a).toggleSelected(k);
          }
          isSelected(k) {
            return M(this, a).isSelected(k);
          }
          unselect(k) {
            M(this, a).unselect(k);
          }
          pointerup(k) {
            const z = d.KeyboardManager.platform.isMac;
            if (!(k.button !== 0 || k.ctrlKey && z) && k.target === this.div) {
              if (!M(this, m)) {
                ut(this, m, !0);
                return;
              }
              lt(this, L, ge).call(this, k);
            }
          }
          pointerdown(k) {
            const z = d.KeyboardManager.platform.isMac;
            if (k.button !== 0 || k.ctrlKey && z || k.target !== this.div)
              return;
            const W = M(this, a).getActive();
            ut(this, m, !W || W.isEmpty());
          }
          drop(k) {
            const z = k.dataTransfer.getData("text/plain"), W = M(this, a).getEditor(z);
            if (!W)
              return;
            k.preventDefault(), k.dataTransfer.dropEffect = "move", lt(this, g, pe).call(this, W);
            const st = this.div.getBoundingClientRect(), ot = k.clientX - st.x, ct = k.clientY - st.y;
            W.translate(ot - W.startX, ct - W.startY), this.moveDivInDOM(W), W.div.focus();
          }
          dragover(k) {
            k.preventDefault();
          }
          destroy() {
            var k;
            ((k = M(this, a).getActive()) == null ? void 0 : k.parent) === this && M(this, a).setActiveEditor(null);
            for (const z of M(this, A).values())
              this.removePointerInTextLayer(z), z.isAttachedToDOM = !1, z.div.remove(), z.parent = null;
            M(this, n).clear(), this.div = null, M(this, A).clear(), M(this, l).clear(), M(this, a).removeLayer(this);
          }
          render(k) {
            this.viewport = k.viewport, (0, d.bindEvents)(this, this.div, ["dragover", "drop"]), this.setDimensions();
            for (const z of M(this, a).getEditors(this.pageIndex))
              this.add(z);
            this.updateMode();
          }
          update(k) {
            this.viewport = k.viewport, this.setDimensions(), this.updateMode();
          }
          get scaleFactor() {
            return this.viewport.scale;
          }
          get pageDimensions() {
            const [k, z, W, st] = this.viewport.viewBox, ot = W - k, ct = st - z;
            return [ot, ct];
          }
          get viewportBaseDimensions() {
            const {
              width: k,
              height: z,
              rotation: W
            } = this.viewport;
            return W % 180 === 0 ? [k, z] : [z, k];
          }
          setDimensions() {
            const {
              width: k,
              height: z,
              rotation: W
            } = this.viewport, st = W % 180 !== 0, ot = Math.floor(k) + "px", ct = Math.floor(z) + "px";
            this.div.style.width = st ? ct : ot, this.div.style.height = st ? ot : ct, this.div.setAttribute("data-main-rotation", W);
          }
        };
        let x = N;
        m = new WeakMap(), S = new WeakMap(), R = new WeakMap(), A = new WeakMap(), P = new WeakMap(), u = new WeakMap(), n = new WeakMap(), a = new WeakMap(), l = new WeakMap(), F = new WeakSet(), fe = function() {
          return !!this.div.parentNode.querySelector(".textLayer .endOfContent");
        }, g = new WeakSet(), pe = function(k) {
          var z;
          k.parent !== this && (this.attach(k), k.pageIndex = this.pageIndex, (z = k.parent) == null || z.detach(k), k.parent = this, k.div && k.isAttachedToDOM && (k.div.remove(), this.div.append(k.div)));
        }, h = new WeakSet(), ee = function(k, z) {
          const W = k.getBoundingClientRect(), st = z.getBoundingClientRect();
          if (W.y + W.height <= st.y)
            return -1;
          if (st.y + st.height <= W.y)
            return 1;
          const ot = W.x + W.width / 2, ct = st.x + st.width / 2;
          return ot - ct;
        }, O = new WeakSet(), Re = function(k) {
          switch (M(this, a).getMode()) {
            case e.AnnotationEditorType.FREETEXT:
              return new T.FreeTextEditor(k);
            case e.AnnotationEditorType.INK:
              return new I.InkEditor(k);
          }
          return null;
        }, L = new WeakSet(), ge = function(k) {
          const z = this.getNextId(), W = lt(this, O, Re).call(this, {
            parent: this,
            id: z,
            x: k.offsetX,
            y: k.offsetY
          });
          return W && this.add(W), W;
        }, J = new WeakSet(), Fe = function() {
          ut(this, P, !0);
          for (const k of M(this, A).values())
            k.isEmpty() && k.remove();
          ut(this, P, !1);
        }, at(x, h), It(x, "_initialized", !1), i.AnnotationEditorLayer = x;
      },
      (t, i, r) => {
        var I, x, m, S, R, A, P, u, n, Me, l, Oe, y, De, o, me;
        Object.defineProperty(i, "__esModule", {
          value: !0
        }), i.FreeTextEditor = void 0;
        var e = r(1), d = r(9), C = r(8);
        const v = class extends C.AnnotationEditor {
          constructor(L) {
            super({
              ...L,
              name: "freeTextEditor"
            });
            at(this, n);
            at(this, l);
            at(this, y);
            at(this, o);
            at(this, I, this.editorDivBlur.bind(this));
            at(this, x, this.editorDivFocus.bind(this));
            at(this, m, this.editorDivKeydown.bind(this));
            at(this, S, void 0);
            at(this, R, "");
            at(this, A, "");
            at(this, P, !1);
            at(this, u, void 0);
            ut(this, S, L.color || v._defaultColor || C.AnnotationEditor._defaultLineColor), ut(this, u, L.fontSize || v._defaultFontSize);
          }
          static initialize(L) {
            this._l10nPromise = new Map(["free_text_default_content", "editor_free_text_aria_label"].map((J) => [J, L.get(J)]));
            const U = getComputedStyle(document.documentElement);
            this._internalPadding = parseFloat(U.getPropertyValue("--freetext-padding"));
          }
          static updateDefaultParams(L, U) {
            switch (L) {
              case e.AnnotationEditorParamsType.FREETEXT_SIZE:
                v._defaultFontSize = U;
                break;
              case e.AnnotationEditorParamsType.FREETEXT_COLOR:
                v._defaultColor = U;
                break;
            }
          }
          updateParams(L, U) {
            switch (L) {
              case e.AnnotationEditorParamsType.FREETEXT_SIZE:
                lt(this, n, Me).call(this, U);
                break;
              case e.AnnotationEditorParamsType.FREETEXT_COLOR:
                lt(this, l, Oe).call(this, U);
                break;
            }
          }
          static get defaultPropertiesToUpdate() {
            return [[e.AnnotationEditorParamsType.FREETEXT_SIZE, v._defaultFontSize], [e.AnnotationEditorParamsType.FREETEXT_COLOR, v._defaultColor || C.AnnotationEditor._defaultLineColor]];
          }
          get propertiesToUpdate() {
            return [[e.AnnotationEditorParamsType.FREETEXT_SIZE, M(this, u)], [e.AnnotationEditorParamsType.FREETEXT_COLOR, M(this, S)]];
          }
          getInitialTranslation() {
            return [-v._internalPadding * this.parent.scaleFactor, -(v._internalPadding + M(this, u)) * this.parent.scaleFactor];
          }
          rebuild() {
            super.rebuild(), this.div !== null && (this.isAttachedToDOM || this.parent.add(this));
          }
          enableEditMode() {
            this.isInEditMode() || (this.parent.setEditingState(!1), this.parent.updateToolbar(e.AnnotationEditorType.FREETEXT), super.enableEditMode(), this.overlayDiv.classList.remove("enabled"), this.editorDiv.contentEditable = !0, this.div.draggable = !1, this.editorDiv.addEventListener("keydown", M(this, m)), this.editorDiv.addEventListener("focus", M(this, x)), this.editorDiv.addEventListener("blur", M(this, I)));
          }
          disableEditMode() {
            !this.isInEditMode() || (this.parent.setEditingState(!0), super.disableEditMode(), this.overlayDiv.classList.add("enabled"), this.editorDiv.contentEditable = !1, this.div.draggable = !0, this.editorDiv.removeEventListener("keydown", M(this, m)), this.editorDiv.removeEventListener("focus", M(this, x)), this.editorDiv.removeEventListener("blur", M(this, I)), this.div.focus(), this.isEditing = !1);
          }
          focusin(L) {
            super.focusin(L), L.target !== this.editorDiv && this.editorDiv.focus();
          }
          onceAdded() {
            this.width || (this.enableEditMode(), this.editorDiv.focus());
          }
          isEmpty() {
            return !this.editorDiv || this.editorDiv.innerText.trim() === "";
          }
          remove() {
            this.isEditing = !1, this.parent.setEditingState(!0), super.remove();
          }
          commit() {
            super.commit(), M(this, P) || (ut(this, P, !0), this.parent.addUndoableEditor(this)), this.disableEditMode(), ut(this, A, this.editorDiv.innerHTML), ut(this, R, lt(this, y, De).call(this).trimEnd()), lt(this, o, me).call(this);
          }
          shouldGetKeyboardEvents() {
            return this.isInEditMode();
          }
          dblclick(L) {
            this.enableEditMode(), this.editorDiv.focus();
          }
          keydown(L) {
            L.target === this.div && L.key === "Enter" && (this.enableEditMode(), this.editorDiv.focus());
          }
          editorDivKeydown(L) {
            v._keyboardManager.exec(this, L);
          }
          editorDivFocus(L) {
            this.isEditing = !0;
          }
          editorDivBlur(L) {
            this.isEditing = !1;
          }
          disableEditing() {
            this.editorDiv.setAttribute("role", "comment"), this.editorDiv.removeAttribute("aria-multiline");
          }
          enableEditing() {
            this.editorDiv.setAttribute("role", "textbox"), this.editorDiv.setAttribute("aria-multiline", !0);
          }
          getIdForTextLayer() {
            return this.editorDiv.id;
          }
          render() {
            if (this.div)
              return this.div;
            let L, U;
            this.width && (L = this.x, U = this.y), super.render(), this.editorDiv = document.createElement("div"), this.editorDiv.className = "internal", this.editorDiv.setAttribute("id", `${this.id}-editor`), this.enableEditing(), v._l10nPromise.get("editor_free_text_aria_label").then((V) => {
              var N;
              return (N = this.editorDiv) == null ? void 0 : N.setAttribute("aria-label", V);
            }), v._l10nPromise.get("free_text_default_content").then((V) => {
              var N;
              return (N = this.editorDiv) == null ? void 0 : N.setAttribute("default-content", V);
            }), this.editorDiv.contentEditable = !0;
            const {
              style: J
            } = this.editorDiv;
            if (J.fontSize = `calc(${M(this, u)}px * var(--scale-factor))`, J.color = M(this, S), this.div.append(this.editorDiv), this.overlayDiv = document.createElement("div"), this.overlayDiv.classList.add("overlay", "enabled"), this.div.append(this.overlayDiv), (0, d.bindEvents)(this, this.div, ["dblclick", "keydown"]), this.width) {
              const [V, N] = this.parent.viewportBaseDimensions;
              this.setAt(L * V, U * N, this.width * V, this.height * N), this.editorDiv.innerHTML = M(this, A), this.div.draggable = !0, this.editorDiv.contentEditable = !1;
            } else
              this.div.draggable = !1, this.editorDiv.contentEditable = !0;
            return this.div;
          }
          get contentDiv() {
            return this.editorDiv;
          }
          static deserialize(L, U) {
            const J = super.deserialize(L, U);
            return ut(J, u, L.fontSize), ut(J, S, e.Util.makeHexColor(...L.color)), ut(J, R, L.value), ut(J, A, L.value.split(`
`).map((V) => `<div>${V}</div>`).join("")), J;
          }
          serialize() {
            if (this.isEmpty())
              return null;
            const L = v._internalPadding * this.parent.scaleFactor, U = this.getRect(L, L), J = C.AnnotationEditor._colorManager.convert(getComputedStyle(this.editorDiv).color);
            return {
              annotationType: e.AnnotationEditorType.FREETEXT,
              color: J,
              fontSize: M(this, u),
              value: M(this, R),
              pageIndex: this.parent.pageIndex,
              rect: U,
              rotation: this.rotation
            };
          }
        };
        let T = v;
        I = new WeakMap(), x = new WeakMap(), m = new WeakMap(), S = new WeakMap(), R = new WeakMap(), A = new WeakMap(), P = new WeakMap(), u = new WeakMap(), n = new WeakSet(), Me = function(L) {
          const U = (V) => {
            this.editorDiv.style.fontSize = `calc(${V}px * var(--scale-factor))`, this.translate(0, -(V - M(this, u)) * this.parent.scaleFactor), ut(this, u, V), lt(this, o, me).call(this);
          }, J = M(this, u);
          this.parent.addCommands({
            cmd: () => {
              U(L);
            },
            undo: () => {
              U(J);
            },
            mustExec: !0,
            type: e.AnnotationEditorParamsType.FREETEXT_SIZE,
            overwriteIfSameType: !0,
            keepUndo: !0
          });
        }, l = new WeakSet(), Oe = function(L) {
          const U = M(this, S);
          this.parent.addCommands({
            cmd: () => {
              ut(this, S, L), this.editorDiv.style.color = L;
            },
            undo: () => {
              ut(this, S, U), this.editorDiv.style.color = U;
            },
            mustExec: !0,
            type: e.AnnotationEditorParamsType.FREETEXT_COLOR,
            overwriteIfSameType: !0,
            keepUndo: !0
          });
        }, y = new WeakSet(), De = function() {
          const L = this.editorDiv.getElementsByTagName("div");
          if (L.length === 0)
            return this.editorDiv.innerText;
          const U = [];
          for (let J = 0, V = L.length; J < V; J++) {
            const G = L[J].firstChild;
            (G == null ? void 0 : G.nodeName) === "#text" ? U.push(G.data) : U.push("");
          }
          return U.join(`
`);
        }, o = new WeakSet(), me = function() {
          const [L, U] = this.parent.viewportBaseDimensions, J = this.div.getBoundingClientRect();
          this.width = J.width / L, this.height = J.height / U;
        }, It(T, "_freeTextDefaultContent", ""), It(T, "_l10nPromise"), It(T, "_internalPadding", 0), It(T, "_defaultColor", null), It(T, "_defaultFontSize", 10), It(T, "_keyboardManager", new d.KeyboardManager([[["ctrl+Enter", "mac+meta+Enter", "Escape", "mac+Escape"], v.prototype.commitOrRemove]])), i.FreeTextEditor = T;
      },
      (t, i, r) => {
        var m, S, R, A, P, u, n, a, l, F, y, g, o, h, v, Le, D, Ne, U, Ie, V, Be, G, be, z, je, st, Ue, ct, We, bt, qt, b, _e, w, ne, c, ie, _, Kt, j, ve, $, se, tt, ye, et, ze, pt, Xe, rt, He, Z, Ae, At, re, St, Zt, Ft, Se;
        Object.defineProperty(i, "__esModule", {
          value: !0
        }), i.InkEditor = void 0, Object.defineProperty(i, "fitCurve", {
          enumerable: !0,
          get: function() {
            return C.fitCurve;
          }
        });
        var e = r(1), d = r(8), C = r(25), T = r(9);
        const I = 16, Pt = class extends d.AnnotationEditor {
          constructor(nt) {
            super({
              ...nt,
              name: "inkEditor"
            });
            at(this, v);
            at(this, D);
            at(this, U);
            at(this, V);
            at(this, G);
            at(this, z);
            at(this, st);
            at(this, ct);
            at(this, bt);
            at(this, b);
            at(this, w);
            at(this, c);
            at(this, _);
            at(this, j);
            at(this, $);
            at(this, et);
            at(this, pt);
            at(this, rt);
            at(this, Z);
            at(this, At);
            at(this, St);
            at(this, Ft);
            at(this, m, 0);
            at(this, S, 0);
            at(this, R, 0);
            at(this, A, this.canvasPointermove.bind(this));
            at(this, P, this.canvasPointerleave.bind(this));
            at(this, u, this.canvasPointerup.bind(this));
            at(this, n, this.canvasPointerdown.bind(this));
            at(this, a, !1);
            at(this, l, !1);
            at(this, F, null);
            at(this, y, null);
            at(this, g, 0);
            at(this, o, 0);
            at(this, h, null);
            this.color = nt.color || null, this.thickness = nt.thickness || null, this.opacity = nt.opacity || null, this.paths = [], this.bezierPath2D = [], this.currentPath = [], this.scaleFactor = 1, this.translationX = this.translationY = 0, this.x = 0, this.y = 0;
          }
          static initialize(nt) {
            this._l10nPromise = new Map(["editor_ink_canvas_aria_label", "editor_ink_aria_label"].map((ht) => [ht, nt.get(ht)]));
          }
          static updateDefaultParams(nt, ht) {
            switch (nt) {
              case e.AnnotationEditorParamsType.INK_THICKNESS:
                Pt._defaultThickness = ht;
                break;
              case e.AnnotationEditorParamsType.INK_COLOR:
                Pt._defaultColor = ht;
                break;
              case e.AnnotationEditorParamsType.INK_OPACITY:
                Pt._defaultOpacity = ht / 100;
                break;
            }
          }
          updateParams(nt, ht) {
            switch (nt) {
              case e.AnnotationEditorParamsType.INK_THICKNESS:
                lt(this, v, Le).call(this, ht);
                break;
              case e.AnnotationEditorParamsType.INK_COLOR:
                lt(this, D, Ne).call(this, ht);
                break;
              case e.AnnotationEditorParamsType.INK_OPACITY:
                lt(this, U, Ie).call(this, ht);
                break;
            }
          }
          static get defaultPropertiesToUpdate() {
            return [[e.AnnotationEditorParamsType.INK_THICKNESS, Pt._defaultThickness], [e.AnnotationEditorParamsType.INK_COLOR, Pt._defaultColor || d.AnnotationEditor._defaultLineColor], [e.AnnotationEditorParamsType.INK_OPACITY, Math.round(Pt._defaultOpacity * 100)]];
          }
          get propertiesToUpdate() {
            var nt;
            return [[e.AnnotationEditorParamsType.INK_THICKNESS, this.thickness || Pt._defaultThickness], [e.AnnotationEditorParamsType.INK_COLOR, this.color || Pt._defaultColor || d.AnnotationEditor._defaultLineColor], [e.AnnotationEditorParamsType.INK_OPACITY, Math.round(100 * ((nt = this.opacity) != null ? nt : Pt._defaultOpacity))]];
          }
          rebuild() {
            super.rebuild(), this.div !== null && (this.canvas || (lt(this, w, ne).call(this), lt(this, c, ie).call(this)), this.isAttachedToDOM || (this.parent.add(this), lt(this, _, Kt).call(this)), lt(this, St, Zt).call(this));
          }
          remove() {
            this.canvas !== null && (this.isEmpty() || this.commit(), this.canvas.width = this.canvas.height = 0, this.canvas.remove(), this.canvas = null, M(this, y).disconnect(), ut(this, y, null), super.remove());
          }
          enableEditMode() {
            M(this, a) || this.canvas === null || (super.enableEditMode(), this.div.draggable = !1, this.canvas.addEventListener("pointerdown", M(this, n)), this.canvas.addEventListener("pointerup", M(this, u)));
          }
          disableEditMode() {
            !this.isInEditMode() || this.canvas === null || (super.disableEditMode(), this.div.draggable = !this.isEmpty(), this.div.classList.remove("editing"), this.canvas.removeEventListener("pointerdown", M(this, n)), this.canvas.removeEventListener("pointerup", M(this, u)));
          }
          onceAdded() {
            this.div.draggable = !this.isEmpty();
          }
          isEmpty() {
            return this.paths.length === 0 || this.paths.length === 1 && this.paths[0].length === 0;
          }
          commit() {
            M(this, a) || (super.commit(), this.isEditing = !1, this.disableEditMode(), this.setInForeground(), ut(this, a, !0), this.div.classList.add("disabled"), lt(this, St, Zt).call(this, !0), this.parent.addInkEditorIfNeeded(!0), this.parent.moveDivInDOM(this), this.div.focus());
          }
          focusin(nt) {
            super.focusin(nt), this.enableEditMode();
          }
          canvasPointerdown(nt) {
            nt.button !== 0 || !this.isInEditMode() || M(this, a) || (this.setInForeground(), nt.type !== "mouse" && this.div.focus(), nt.stopPropagation(), this.canvas.addEventListener("pointerleave", M(this, P)), this.canvas.addEventListener("pointermove", M(this, A)), lt(this, z, je).call(this, nt.offsetX, nt.offsetY));
          }
          canvasPointermove(nt) {
            nt.stopPropagation(), lt(this, st, Ue).call(this, nt.offsetX, nt.offsetY);
          }
          canvasPointerup(nt) {
            nt.button === 0 && this.isInEditMode() && this.currentPath.length !== 0 && (nt.stopPropagation(), lt(this, b, _e).call(this, nt), this.setInBackground());
          }
          canvasPointerleave(nt) {
            lt(this, b, _e).call(this, nt), this.setInBackground();
          }
          render() {
            if (this.div)
              return this.div;
            let nt, ht;
            this.width && (nt = this.x, ht = this.y), super.render(), Pt._l10nPromise.get("editor_ink_aria_label").then((gt) => {
              var _t;
              return (_t = this.div) == null ? void 0 : _t.setAttribute("aria-label", gt);
            });
            const [Q, H, Y, dt] = lt(this, V, Be).call(this);
            if (this.setAt(Q, H, 0, 0), this.setDims(Y, dt), lt(this, w, ne).call(this), this.width) {
              const [gt, _t] = this.parent.viewportBaseDimensions;
              this.setAt(nt * gt, ht * _t, this.width * gt, this.height * _t), ut(this, l, !0), lt(this, _, Kt).call(this), this.setDims(this.width * gt, this.height * _t), lt(this, bt, qt).call(this), lt(this, Ft, Se).call(this), this.div.classList.add("disabled");
            } else
              this.div.classList.add("editing"), this.enableEditMode();
            return lt(this, c, ie).call(this), this.div;
          }
          setDimensions(nt, ht) {
            const Q = Math.round(nt), H = Math.round(ht);
            if (M(this, g) === Q && M(this, o) === H)
              return;
            ut(this, g, Q), ut(this, o, H), this.canvas.style.visibility = "hidden", M(this, m) && Math.abs(M(this, m) - nt / ht) > 0.01 && (ht = Math.ceil(nt / M(this, m)), this.setDims(nt, ht));
            const [Y, dt] = this.parent.viewportBaseDimensions;
            this.width = nt / Y, this.height = ht / dt, M(this, a) && lt(this, j, ve).call(this, nt, ht), lt(this, _, Kt).call(this), lt(this, bt, qt).call(this), this.canvas.style.visibility = "visible";
          }
          static deserialize(nt, ht) {
            var Mt, Rt;
            const Q = super.deserialize(nt, ht);
            Q.thickness = nt.thickness, Q.color = e.Util.makeHexColor(...nt.color), Q.opacity = nt.opacity;
            const [H, Y] = ht.pageDimensions, dt = Q.width * H, gt = Q.height * Y, _t = ht.scaleFactor, Ct = nt.thickness / 2;
            ut(Q, m, dt / gt), ut(Q, a, !0), ut(Q, g, Math.round(dt)), ut(Q, o, Math.round(gt));
            for (const {
              bezier: Et
            } of nt.paths) {
              const Lt = [];
              Q.paths.push(Lt);
              let Ot = _t * (Et[0] - Ct), Ut = _t * (gt - Et[1] - Ct);
              for (let Nt = 2, zt = Et.length; Nt < zt; Nt += 6) {
                const Yt = _t * (Et[Nt] - Ct), Gt = _t * (gt - Et[Nt + 1] - Ct), Ht = _t * (Et[Nt + 2] - Ct), jt = _t * (gt - Et[Nt + 3] - Ct), Xt = _t * (Et[Nt + 4] - Ct), $t = _t * (gt - Et[Nt + 5] - Ct);
                Lt.push([[Ot, Ut], [Yt, Gt], [Ht, jt], [Xt, $t]]), Ot = Xt, Ut = $t;
              }
              const xt = lt(this, tt, ye).call(this, Lt);
              Q.bezierPath2D.push(xt);
            }
            const Tt = lt(Mt = Q, Z, Ae).call(Mt);
            return ut(Q, R, Tt[2] - Tt[0]), ut(Q, S, Tt[3] - Tt[1]), lt(Rt = Q, j, ve).call(Rt, dt, gt), Q;
          }
          serialize() {
            if (this.isEmpty())
              return null;
            const nt = this.getRect(0, 0), ht = this.rotation % 180 === 0 ? nt[3] - nt[1] : nt[2] - nt[0], Q = d.AnnotationEditor._colorManager.convert(this.ctx.strokeStyle);
            return {
              annotationType: e.AnnotationEditorType.INK,
              color: Q,
              thickness: this.thickness,
              opacity: this.opacity,
              paths: lt(this, et, ze).call(this, this.scaleFactor / this.parent.scaleFactor, this.translationX, this.translationY, ht),
              pageIndex: this.parent.pageIndex,
              rect: nt,
              rotation: this.rotation
            };
          }
        };
        let x = Pt;
        m = new WeakMap(), S = new WeakMap(), R = new WeakMap(), A = new WeakMap(), P = new WeakMap(), u = new WeakMap(), n = new WeakMap(), a = new WeakMap(), l = new WeakMap(), F = new WeakMap(), y = new WeakMap(), g = new WeakMap(), o = new WeakMap(), h = new WeakMap(), v = new WeakSet(), Le = function(nt) {
          const ht = this.thickness;
          this.parent.addCommands({
            cmd: () => {
              this.thickness = nt, lt(this, St, Zt).call(this);
            },
            undo: () => {
              this.thickness = ht, lt(this, St, Zt).call(this);
            },
            mustExec: !0,
            type: e.AnnotationEditorParamsType.INK_THICKNESS,
            overwriteIfSameType: !0,
            keepUndo: !0
          });
        }, D = new WeakSet(), Ne = function(nt) {
          const ht = this.color;
          this.parent.addCommands({
            cmd: () => {
              this.color = nt, lt(this, bt, qt).call(this);
            },
            undo: () => {
              this.color = ht, lt(this, bt, qt).call(this);
            },
            mustExec: !0,
            type: e.AnnotationEditorParamsType.INK_COLOR,
            overwriteIfSameType: !0,
            keepUndo: !0
          });
        }, U = new WeakSet(), Ie = function(nt) {
          nt /= 100;
          const ht = this.opacity;
          this.parent.addCommands({
            cmd: () => {
              this.opacity = nt, lt(this, bt, qt).call(this);
            },
            undo: () => {
              this.opacity = ht, lt(this, bt, qt).call(this);
            },
            mustExec: !0,
            type: e.AnnotationEditorParamsType.INK_OPACITY,
            overwriteIfSameType: !0,
            keepUndo: !0
          });
        }, V = new WeakSet(), Be = function() {
          const {
            width: nt,
            height: ht,
            rotation: Q
          } = this.parent.viewport;
          switch (Q) {
            case 90:
              return [0, nt, nt, ht];
            case 180:
              return [nt, ht, nt, ht];
            case 270:
              return [ht, 0, nt, ht];
            default:
              return [0, 0, nt, ht];
          }
        }, G = new WeakSet(), be = function() {
          this.ctx.lineWidth = this.thickness * this.parent.scaleFactor / this.scaleFactor, this.ctx.lineCap = "round", this.ctx.lineJoin = "round", this.ctx.miterLimit = 10, this.ctx.strokeStyle = `${this.color}${(0, T.opacityToHex)(this.opacity)}`;
        }, z = new WeakSet(), je = function(nt, ht) {
          var Q;
          this.isEditing = !0, M(this, l) || (ut(this, l, !0), lt(this, _, Kt).call(this), this.thickness || (this.thickness = Pt._defaultThickness), this.color || (this.color = Pt._defaultColor || d.AnnotationEditor._defaultLineColor), (Q = this.opacity) != null || (this.opacity = Pt._defaultOpacity)), this.currentPath.push([nt, ht]), ut(this, F, null), lt(this, G, be).call(this), this.ctx.beginPath(), this.ctx.moveTo(nt, ht), ut(this, h, () => {
            !M(this, h) || (M(this, F) && (this.isEmpty() ? (this.ctx.setTransform(1, 0, 0, 1, 0, 0), this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)) : lt(this, bt, qt).call(this), this.ctx.lineTo(...M(this, F)), ut(this, F, null), this.ctx.stroke()), window.requestAnimationFrame(M(this, h)));
          }), window.requestAnimationFrame(M(this, h));
        }, st = new WeakSet(), Ue = function(nt, ht) {
          const [Q, H] = this.currentPath.at(-1);
          nt === Q && ht === H || (this.currentPath.push([nt, ht]), ut(this, F, [nt, ht]));
        }, ct = new WeakSet(), We = function(nt, ht) {
          var Ct;
          this.ctx.closePath(), ut(this, h, null), nt = Math.min(Math.max(nt, 0), this.canvas.width), ht = Math.min(Math.max(ht, 0), this.canvas.height);
          const [Q, H] = this.currentPath.at(-1);
          (nt !== Q || ht !== H) && this.currentPath.push([nt, ht]);
          let Y;
          if (this.currentPath.length !== 1)
            Y = (0, C.fitCurve)(this.currentPath, 30, null);
          else {
            const Tt = [nt, ht];
            Y = [[Tt, Tt.slice(), Tt.slice(), Tt]];
          }
          const dt = lt(Ct = Pt, tt, ye).call(Ct, Y);
          this.currentPath.length = 0;
          const gt = () => {
            this.paths.push(Y), this.bezierPath2D.push(dt), this.rebuild();
          }, _t = () => {
            this.paths.pop(), this.bezierPath2D.pop(), this.paths.length === 0 ? this.remove() : (this.canvas || (lt(this, w, ne).call(this), lt(this, c, ie).call(this)), lt(this, St, Zt).call(this));
          };
          this.parent.addCommands({
            cmd: gt,
            undo: _t,
            mustExec: !0
          });
        }, bt = new WeakSet(), qt = function() {
          if (this.isEmpty()) {
            lt(this, $, se).call(this);
            return;
          }
          lt(this, G, be).call(this);
          const {
            canvas: nt,
            ctx: ht
          } = this;
          ht.setTransform(1, 0, 0, 1, 0, 0), ht.clearRect(0, 0, nt.width, nt.height), lt(this, $, se).call(this);
          for (const Q of this.bezierPath2D)
            ht.stroke(Q);
        }, b = new WeakSet(), _e = function(nt) {
          lt(this, ct, We).call(this, nt.offsetX, nt.offsetY), this.canvas.removeEventListener("pointerleave", M(this, P)), this.canvas.removeEventListener("pointermove", M(this, A)), this.parent.addToAnnotationStorage(this);
        }, w = new WeakSet(), ne = function() {
          this.canvas = document.createElement("canvas"), this.canvas.width = this.canvas.height = 0, this.canvas.className = "inkEditorCanvas", Pt._l10nPromise.get("editor_ink_canvas_aria_label").then((nt) => {
            var ht;
            return (ht = this.canvas) == null ? void 0 : ht.setAttribute("aria-label", nt);
          }), this.div.append(this.canvas), this.ctx = this.canvas.getContext("2d");
        }, c = new WeakSet(), ie = function() {
          ut(this, y, new ResizeObserver((nt) => {
            const ht = nt[0].contentRect;
            ht.width && ht.height && this.setDimensions(ht.width, ht.height);
          })), M(this, y).observe(this.div);
        }, _ = new WeakSet(), Kt = function() {
          if (!M(this, l))
            return;
          const [nt, ht] = this.parent.viewportBaseDimensions;
          this.canvas.width = Math.ceil(this.width * nt), this.canvas.height = Math.ceil(this.height * ht), lt(this, $, se).call(this);
        }, j = new WeakSet(), ve = function(nt, ht) {
          const Q = lt(this, At, re).call(this), H = (nt - Q) / M(this, R), Y = (ht - Q) / M(this, S);
          this.scaleFactor = Math.min(H, Y);
        }, $ = new WeakSet(), se = function() {
          const nt = lt(this, At, re).call(this) / 2;
          this.ctx.setTransform(this.scaleFactor, 0, 0, this.scaleFactor, this.translationX * this.scaleFactor + nt, this.translationY * this.scaleFactor + nt);
        }, tt = new WeakSet(), ye = function(nt) {
          const ht = new Path2D();
          for (let Q = 0, H = nt.length; Q < H; Q++) {
            const [Y, dt, gt, _t] = nt[Q];
            Q === 0 && ht.moveTo(...Y), ht.bezierCurveTo(dt[0], dt[1], gt[0], gt[1], _t[0], _t[1]);
          }
          return ht;
        }, et = new WeakSet(), ze = function(nt, ht, Q, H) {
          const dt = [], gt = this.thickness / 2;
          let _t, Ct;
          for (const Tt of this.paths) {
            _t = [], Ct = [];
            for (let Mt = 0, Rt = Tt.length; Mt < Rt; Mt++) {
              const [Et, Lt, Ot, Ut] = Tt[Mt], xt = nt * (Et[0] + ht) + gt, Nt = H - nt * (Et[1] + Q) - gt, zt = nt * (Lt[0] + ht) + gt, Yt = H - nt * (Lt[1] + Q) - gt, Gt = nt * (Ot[0] + ht) + gt, Ht = H - nt * (Ot[1] + Q) - gt, jt = nt * (Ut[0] + ht) + gt, Xt = H - nt * (Ut[1] + Q) - gt;
              Mt === 0 && (_t.push(xt, Nt), Ct.push(xt, Nt)), _t.push(zt, Yt, Gt, Ht, jt, Xt), lt(this, pt, Xe).call(this, xt, Nt, zt, Yt, Gt, Ht, jt, Xt, 4, Ct);
            }
            dt.push({
              bezier: _t,
              points: Ct
            });
          }
          return dt;
        }, pt = new WeakSet(), Xe = function(nt, ht, Q, H, Y, dt, gt, _t, Ct, Tt) {
          if (lt(this, rt, He).call(this, nt, ht, Q, H, Y, dt, gt, _t)) {
            Tt.push(gt, _t);
            return;
          }
          for (let Mt = 1; Mt < Ct - 1; Mt++) {
            const Rt = Mt / Ct, Et = 1 - Rt;
            let Lt = Rt * nt + Et * Q, Ot = Rt * ht + Et * H, Ut = Rt * Q + Et * Y, xt = Rt * H + Et * dt;
            const Nt = Rt * Y + Et * gt, zt = Rt * dt + Et * _t;
            Lt = Rt * Lt + Et * Ut, Ot = Rt * Ot + Et * xt, Ut = Rt * Ut + Et * Nt, xt = Rt * xt + Et * zt, Lt = Rt * Lt + Et * Ut, Ot = Rt * Ot + Et * xt, Tt.push(Lt, Ot);
          }
          Tt.push(gt, _t);
        }, rt = new WeakSet(), He = function(nt, ht, Q, H, Y, dt, gt, _t) {
          const Tt = (3 * Q - 2 * nt - gt) ** 2, Mt = (3 * H - 2 * ht - _t) ** 2, Rt = (3 * Y - nt - 2 * gt) ** 2, Et = (3 * dt - ht - 2 * _t) ** 2;
          return Math.max(Tt, Rt) + Math.max(Mt, Et) <= 10;
        }, Z = new WeakSet(), Ae = function() {
          let nt = 1 / 0, ht = -1 / 0, Q = 1 / 0, H = -1 / 0;
          for (const Y of this.paths)
            for (const [dt, gt, _t, Ct] of Y) {
              const Tt = e.Util.bezierBoundingBox(...dt, ...gt, ..._t, ...Ct);
              nt = Math.min(nt, Tt[0]), Q = Math.min(Q, Tt[1]), ht = Math.max(ht, Tt[2]), H = Math.max(H, Tt[3]);
            }
          return [nt, Q, ht, H];
        }, At = new WeakSet(), re = function() {
          return M(this, a) ? Math.ceil(this.thickness * this.parent.scaleFactor) : 0;
        }, St = new WeakSet(), Zt = function(nt = !1) {
          if (this.isEmpty())
            return;
          if (!M(this, a)) {
            lt(this, bt, qt).call(this);
            return;
          }
          const ht = lt(this, Z, Ae).call(this), Q = lt(this, At, re).call(this);
          ut(this, R, Math.max(I, ht[2] - ht[0])), ut(this, S, Math.max(I, ht[3] - ht[1]));
          const H = Math.ceil(Q + M(this, R) * this.scaleFactor), Y = Math.ceil(Q + M(this, S) * this.scaleFactor), [dt, gt] = this.parent.viewportBaseDimensions;
          this.width = H / dt, this.height = Y / gt, ut(this, m, H / Y), lt(this, Ft, Se).call(this);
          const _t = this.translationX, Ct = this.translationY;
          this.translationX = -ht[0], this.translationY = -ht[1], lt(this, _, Kt).call(this), lt(this, bt, qt).call(this), ut(this, g, H), ut(this, o, Y), this.setDims(H, Y);
          const Tt = nt ? Q / this.scaleFactor / 2 : 0;
          this.translate(_t - this.translationX - Tt, Ct - this.translationY - Tt);
        }, Ft = new WeakSet(), Se = function() {
          const {
            style: nt
          } = this.div;
          M(this, m) >= 1 ? (nt.minHeight = `${I}px`, nt.minWidth = `${Math.round(M(this, m) * I)}px`) : (nt.minWidth = `${I}px`, nt.minHeight = `${Math.round(I / M(this, m))}px`);
        }, at(x, tt), It(x, "_defaultColor", null), It(x, "_defaultOpacity", 1), It(x, "_defaultThickness", 1), It(x, "_l10nPromise"), i.InkEditor = x;
      },
      (t, i, r) => {
        Object.defineProperty(i, "__esModule", {
          value: !0
        }), i.fitCurve = void 0;
        const e = r(26);
        i.fitCurve = e;
      },
      (t) => {
        function i(u, n, a) {
          if (!Array.isArray(u))
            throw new TypeError("First argument should be an array");
          if (u.forEach((g) => {
            if (!Array.isArray(g) || g.some((o) => typeof o != "number") || g.length !== u[0].length)
              throw Error("Each point should be an array of numbers. Each point should have the same amount of numbers.");
          }), u = u.filter((g, o) => o === 0 || !g.every((h, v) => h === u[o - 1][v])), u.length < 2)
            return [];
          const l = u.length, F = R(u[1], u[0]), y = R(u[l - 2], u[l - 1]);
          return r(u, F, y, n, a);
        }
        function r(u, n, a, l, F) {
          var g, o, h, v, O, D, L, U, J, V, N, G, k;
          if (u.length === 2)
            return G = A.vectorLen(A.subtract(u[0], u[1])) / 3, g = [u[0], A.addArrays(u[0], A.mulItems(n, G)), A.addArrays(u[1], A.mulItems(a, G)), u[1]], [g];
          if (o = I(u), [g, v, D] = e(u, o, o, n, a, F), v === 0 || v < l)
            return [g];
          if (v < l * l)
            for (h = o, O = v, L = D, k = 0; k < 20; k++) {
              if (h = C(g, u, h), [g, v, D] = e(u, o, h, n, a, F), v < l)
                return [g];
              if (D === L) {
                let z = v / O;
                if (z > 0.9999 && z < 1.0001)
                  break;
              }
              O = v, L = D;
            }
          return N = [], U = A.subtract(u[D - 1], u[D + 1]), U.every((z) => z === 0) && (U = A.subtract(u[D - 1], u[D]), [U[0], U[1]] = [-U[1], U[0]]), J = A.normalize(U), V = A.mulItems(J, -1), N = N.concat(r(u.slice(0, D + 1), n, J, l, F)), N = N.concat(r(u.slice(D), V, a, l, F)), N;
        }
        function e(u, n, a, l, F, y) {
          var g, o, h;
          return g = d(u, a, l, F), [o, h] = x(u, g, n), y && y({
            bez: g,
            points: u,
            params: n,
            maxErr: o,
            maxPoint: h
          }), [g, o, h];
        }
        function d(u, n, a, l) {
          var F, y, g, o, h, v, O, D, L, U, J, V, N, G, k, z, W, st = u[0], ot = u[u.length - 1];
          for (F = [st, null, null, ot], y = A.zeros_Xx2x2(n.length), N = 0, G = n.length; N < G; N++)
            z = n[N], W = 1 - z, g = y[N], g[0] = A.mulItems(a, 3 * z * (W * W)), g[1] = A.mulItems(l, 3 * W * (z * z));
          for (o = [[0, 0], [0, 0]], h = [0, 0], N = 0, G = u.length; N < G; N++)
            z = n[N], g = y[N], o[0][0] += A.dot(g[0], g[0]), o[0][1] += A.dot(g[0], g[1]), o[1][0] += A.dot(g[0], g[1]), o[1][1] += A.dot(g[1], g[1]), k = A.subtract(u[N], P.q([st, st, ot, ot], z)), h[0] += A.dot(g[0], k), h[1] += A.dot(g[1], k);
          return v = o[0][0] * o[1][1] - o[1][0] * o[0][1], O = o[0][0] * h[1] - o[1][0] * h[0], D = h[0] * o[1][1] - h[1] * o[0][1], L = v === 0 ? 0 : D / v, U = v === 0 ? 0 : O / v, V = A.vectorLen(A.subtract(st, ot)), J = 1e-6 * V, L < J || U < J ? (F[1] = A.addArrays(st, A.mulItems(a, V / 3)), F[2] = A.addArrays(ot, A.mulItems(l, V / 3))) : (F[1] = A.addArrays(st, A.mulItems(a, L)), F[2] = A.addArrays(ot, A.mulItems(l, U))), F;
        }
        function C(u, n, a) {
          return a.map((l, F) => T(u, n[F], l));
        }
        function T(u, n, a) {
          var l = A.subtract(P.q(u, a), n), F = P.qprime(u, a), y = A.mulMatrix(l, F), g = A.sum(A.squareItems(F)) + 2 * A.mulMatrix(l, P.qprimeprime(u, a));
          return g === 0 ? a : a - y / g;
        }
        function I(u) {
          var n = [], a, l, F;
          return u.forEach((y, g) => {
            a = g ? l + A.vectorLen(A.subtract(y, F)) : 0, n.push(a), l = a, F = y;
          }), n = n.map((y) => y / l), n;
        }
        function x(u, n, a) {
          var l, F, y, g, o, h, v, O;
          F = 0, y = Math.floor(u.length / 2);
          const D = m(n, 10);
          for (o = 0, h = u.length; o < h; o++)
            v = u[o], O = S(n, a[o], D, 10), g = A.subtract(P.q(n, O), v), l = g[0] * g[0] + g[1] * g[1], l > F && (F = l, y = o);
          return [F, y];
        }
        var m = function(u, n) {
          for (var a, l = [0], F = u[0], y = 0, g = 1; g <= n; g++)
            a = P.q(u, g / n), y += A.vectorLen(A.subtract(a, F)), l.push(y), F = a;
          return l = l.map((o) => o / y), l;
        };
        function S(u, n, a, l) {
          if (n < 0)
            return 0;
          if (n > 1)
            return 1;
          for (var F, y, g, o, h, v = 1; v <= l; v++)
            if (n <= a[v]) {
              o = (v - 1) / l, g = v / l, y = a[v - 1], F = a[v], h = (n - y) / (F - y) * (g - o) + o;
              break;
            }
          return h;
        }
        function R(u, n) {
          return A.normalize(A.subtract(u, n));
        }
        class A {
          static zeros_Xx2x2(n) {
            for (var a = []; n--; )
              a.push([0, 0]);
            return a;
          }
          static mulItems(n, a) {
            return n.map((l) => l * a);
          }
          static mulMatrix(n, a) {
            return n.reduce((l, F, y) => l + F * a[y], 0);
          }
          static subtract(n, a) {
            return n.map((l, F) => l - a[F]);
          }
          static addArrays(n, a) {
            return n.map((l, F) => l + a[F]);
          }
          static addItems(n, a) {
            return n.map((l) => l + a);
          }
          static sum(n) {
            return n.reduce((a, l) => a + l);
          }
          static dot(n, a) {
            return A.mulMatrix(n, a);
          }
          static vectorLen(n) {
            return Math.hypot(...n);
          }
          static divItems(n, a) {
            return n.map((l) => l / a);
          }
          static squareItems(n) {
            return n.map((a) => a * a);
          }
          static normalize(n) {
            return this.divItems(n, this.vectorLen(n));
          }
        }
        class P {
          static q(n, a) {
            var l = 1 - a, F = A.mulItems(n[0], l * l * l), y = A.mulItems(n[1], 3 * l * l * a), g = A.mulItems(n[2], 3 * l * a * a), o = A.mulItems(n[3], a * a * a);
            return A.addArrays(A.addArrays(F, y), A.addArrays(g, o));
          }
          static qprime(n, a) {
            var l = 1 - a, F = A.mulItems(A.subtract(n[1], n[0]), 3 * l * l), y = A.mulItems(A.subtract(n[2], n[1]), 6 * l * a), g = A.mulItems(A.subtract(n[3], n[2]), 3 * a * a);
            return A.addArrays(A.addArrays(F, y), g);
          }
          static qprimeprime(n, a) {
            return A.addArrays(A.mulItems(A.addArrays(A.subtract(n[2], A.mulItems(n[1], 2)), n[0]), 6 * (1 - a)), A.mulItems(A.addArrays(A.subtract(n[3], A.mulItems(n[2], 2)), n[1]), 6 * a));
          }
        }
        t.exports = i, t.exports.fitCubic = r, t.exports.createTangent = R;
      },
      (t, i, r) => {
        var bt, Ce, b, Ee;
        Object.defineProperty(i, "__esModule", {
          value: !0
        }), i.AnnotationLayer = void 0;
        var e = r(1), d = r(4), C = r(7), T = r(28), I = r(29);
        const x = 1e3, m = 9, S = /* @__PURE__ */ new WeakSet();
        function R(w) {
          return {
            width: w[2] - w[0],
            height: w[3] - w[1]
          };
        }
        class A {
          static create(s) {
            switch (s.data.annotationType) {
              case e.AnnotationType.LINK:
                return new u(s);
              case e.AnnotationType.TEXT:
                return new n(s);
              case e.AnnotationType.WIDGET:
                switch (s.data.fieldType) {
                  case "Tx":
                    return new l(s);
                  case "Btn":
                    return s.data.radioButton ? new y(s) : s.data.checkBox ? new F(s) : new g(s);
                  case "Ch":
                    return new o(s);
                }
                return new a(s);
              case e.AnnotationType.POPUP:
                return new h(s);
              case e.AnnotationType.FREETEXT:
                return new O(s);
              case e.AnnotationType.LINE:
                return new D(s);
              case e.AnnotationType.SQUARE:
                return new L(s);
              case e.AnnotationType.CIRCLE:
                return new U(s);
              case e.AnnotationType.POLYLINE:
                return new J(s);
              case e.AnnotationType.CARET:
                return new N(s);
              case e.AnnotationType.INK:
                return new G(s);
              case e.AnnotationType.POLYGON:
                return new V(s);
              case e.AnnotationType.HIGHLIGHT:
                return new k(s);
              case e.AnnotationType.UNDERLINE:
                return new z(s);
              case e.AnnotationType.SQUIGGLY:
                return new W(s);
              case e.AnnotationType.STRIKEOUT:
                return new st(s);
              case e.AnnotationType.STAMP:
                return new ot(s);
              case e.AnnotationType.FILEATTACHMENT:
                return new ct(s);
              default:
                return new P(s);
            }
          }
        }
        class P {
          constructor(s, {
            isRenderable: c = !1,
            ignoreBorder: p = !1,
            createQuadrilaterals: _ = !1
          } = {}) {
            this.isRenderable = c, this.data = s.data, this.layer = s.layer, this.page = s.page, this.viewport = s.viewport, this.linkService = s.linkService, this.downloadManager = s.downloadManager, this.imageResourcesPath = s.imageResourcesPath, this.renderForms = s.renderForms, this.svgFactory = s.svgFactory, this.annotationStorage = s.annotationStorage, this.enableScripting = s.enableScripting, this.hasJSActions = s.hasJSActions, this._fieldObjects = s.fieldObjects, this._mouseState = s.mouseState, c && (this.container = this._createContainer(p)), _ && (this.quadrilaterals = this._createQuadrilaterals(p));
          }
          _createContainer(s = !1) {
            const c = this.data, p = this.page, _ = this.viewport, E = document.createElement("section"), {
              width: j,
              height: X
            } = R(c.rect), [$, q, tt, K] = _.viewBox, et = tt - $, ft = K - q;
            E.setAttribute("data-annotation-id", c.id);
            const pt = e.Util.normalizeRect([c.rect[0], p.view[3] - c.rect[1] + p.view[1], c.rect[2], p.view[3] - c.rect[3] + p.view[1]]);
            if (!s && c.borderStyle.width > 0) {
              E.style.borderWidth = `${c.borderStyle.width}px`;
              const rt = c.borderStyle.horizontalCornerRadius, yt = c.borderStyle.verticalCornerRadius;
              if (rt > 0 || yt > 0) {
                const it = `calc(${rt}px * var(--scale-factor)) / calc(${yt}px * var(--scale-factor))`;
                E.style.borderRadius = it;
              }
              switch (c.borderStyle.style) {
                case e.AnnotationBorderStyleType.SOLID:
                  E.style.borderStyle = "solid";
                  break;
                case e.AnnotationBorderStyleType.DASHED:
                  E.style.borderStyle = "dashed";
                  break;
                case e.AnnotationBorderStyleType.BEVELED:
                  (0, e.warn)("Unimplemented border style: beveled");
                  break;
                case e.AnnotationBorderStyleType.INSET:
                  (0, e.warn)("Unimplemented border style: inset");
                  break;
                case e.AnnotationBorderStyleType.UNDERLINE:
                  E.style.borderBottomStyle = "solid";
                  break;
              }
              const Z = c.borderColor || null;
              Z ? E.style.borderColor = e.Util.makeHexColor(Z[0] | 0, Z[1] | 0, Z[2] | 0) : E.style.borderWidth = 0;
            }
            E.style.left = `${100 * (pt[0] - $) / et}%`, E.style.top = `${100 * (pt[1] - q) / ft}%`;
            const {
              rotation: vt
            } = c;
            return c.hasOwnCanvas || vt === 0 ? (E.style.width = `${100 * j / et}%`, E.style.height = `${100 * X / ft}%`) : this.setRotation(vt, E), E;
          }
          setRotation(s, c = this.container) {
            const [p, _, E, j] = this.viewport.viewBox, X = E - p, $ = j - _, {
              width: q,
              height: tt
            } = R(this.data.rect);
            let K, et;
            s % 180 === 0 ? (K = 100 * q / X, et = 100 * tt / $) : (K = 100 * tt / X, et = 100 * q / $), c.style.width = `${K}%`, c.style.height = `${et}%`, c.setAttribute("data-main-rotation", (360 - s) % 360);
          }
          get _commonActions() {
            const s = (c, p, _) => {
              const E = _.detail[c];
              _.target.style[p] = T.ColorConverters[`${E[0]}_HTML`](E.slice(1));
            };
            return (0, e.shadow)(this, "_commonActions", {
              display: (c) => {
                const p = c.detail.display % 2 === 1;
                this.container.style.visibility = p ? "hidden" : "visible", this.annotationStorage.setValue(this.data.id, {
                  hidden: p,
                  print: c.detail.display === 0 || c.detail.display === 3
                });
              },
              print: (c) => {
                this.annotationStorage.setValue(this.data.id, {
                  print: c.detail.print
                });
              },
              hidden: (c) => {
                this.container.style.visibility = c.detail.hidden ? "hidden" : "visible", this.annotationStorage.setValue(this.data.id, {
                  hidden: c.detail.hidden
                });
              },
              focus: (c) => {
                setTimeout(() => c.target.focus({
                  preventScroll: !1
                }), 0);
              },
              userName: (c) => {
                c.target.title = c.detail.userName;
              },
              readonly: (c) => {
                c.detail.readonly ? c.target.setAttribute("readonly", "") : c.target.removeAttribute("readonly");
              },
              required: (c) => {
                this._setRequired(c.target, c.detail.required);
              },
              bgColor: (c) => {
                s("bgColor", "backgroundColor", c);
              },
              fillColor: (c) => {
                s("fillColor", "backgroundColor", c);
              },
              fgColor: (c) => {
                s("fgColor", "color", c);
              },
              textColor: (c) => {
                s("textColor", "color", c);
              },
              borderColor: (c) => {
                s("borderColor", "borderColor", c);
              },
              strokeColor: (c) => {
                s("strokeColor", "borderColor", c);
              },
              rotation: (c) => {
                const p = c.detail.rotation;
                this.setRotation(p), this.annotationStorage.setValue(this.data.id, {
                  rotation: p
                });
              }
            });
          }
          _dispatchEventFromSandbox(s, c) {
            const p = this._commonActions;
            for (const _ of Object.keys(c.detail)) {
              const E = s[_] || p[_];
              E && E(c);
            }
          }
          _setDefaultPropertiesFromJS(s) {
            if (!this.enableScripting)
              return;
            const c = this.annotationStorage.getRawValue(this.data.id);
            if (!c)
              return;
            const p = this._commonActions;
            for (const [_, E] of Object.entries(c)) {
              const j = p[_];
              j && (j({
                detail: E,
                target: s
              }), delete c[_]);
            }
          }
          _createQuadrilaterals(s = !1) {
            if (!this.data.quadPoints)
              return null;
            const c = [], p = this.data.rect;
            for (const _ of this.data.quadPoints)
              this.data.rect = [_[2].x, _[2].y, _[1].x, _[1].y], c.push(this._createContainer(s));
            return this.data.rect = p, c;
          }
          _createPopup(s, c) {
            let p = this.container;
            this.quadrilaterals && (s = s || this.quadrilaterals, p = this.quadrilaterals[0]), s || (s = document.createElement("div"), s.className = "popupTriggerArea", p.append(s));
            const E = new v({
              container: p,
              trigger: s,
              color: c.color,
              titleObj: c.titleObj,
              modificationDate: c.modificationDate,
              contentsObj: c.contentsObj,
              richText: c.richText,
              hideWrapper: !0
            }).render();
            E.style.left = "100%", p.append(E);
          }
          _renderQuadrilaterals(s) {
            for (const c of this.quadrilaterals)
              c.className = s;
            return this.quadrilaterals;
          }
          render() {
            (0, e.unreachable)("Abstract method `AnnotationElement.render` called");
          }
          _getElementsByName(s, c = null) {
            const p = [];
            if (this._fieldObjects) {
              const _ = this._fieldObjects[s];
              if (_)
                for (const {
                  page: E,
                  id: j,
                  exportValues: X
                } of _) {
                  if (E === -1 || j === c)
                    continue;
                  const $ = typeof X == "string" ? X : null, q = document.querySelector(`[data-element-id="${j}"]`);
                  if (q && !S.has(q)) {
                    (0, e.warn)(`_getElementsByName - element not allowed: ${j}`);
                    continue;
                  }
                  p.push({
                    id: j,
                    exportValue: $,
                    domElement: q
                  });
                }
              return p;
            }
            for (const _ of document.getElementsByName(s)) {
              const {
                id: E,
                exportValue: j
              } = _;
              E !== c && (!S.has(_) || p.push({
                id: E,
                exportValue: j,
                domElement: _
              }));
            }
            return p;
          }
          static get platform() {
            const s = typeof navigator < "u" ? navigator.platform : "";
            return (0, e.shadow)(this, "platform", {
              isWin: s.includes("Win"),
              isMac: s.includes("Mac")
            });
          }
        }
        class u extends P {
          constructor(s, c = null) {
            super(s, {
              isRenderable: !0,
              ignoreBorder: !!(c != null && c.ignoreBorder),
              createQuadrilaterals: !0
            }), this.isTooltipOnly = s.data.isTooltipOnly;
          }
          render() {
            const {
              data: s,
              linkService: c
            } = this, p = document.createElement("a");
            p.setAttribute("data-element-id", s.id);
            let _ = !1;
            return s.url ? (c.addLinkAttributes(p, s.url, s.newWindow), _ = !0) : s.action ? (this._bindNamedAction(p, s.action), _ = !0) : s.dest ? (this._bindLink(p, s.dest), _ = !0) : (s.actions && (s.actions.Action || s.actions["Mouse Up"] || s.actions["Mouse Down"]) && this.enableScripting && this.hasJSActions && (this._bindJSAction(p, s), _ = !0), s.resetForm ? (this._bindResetFormAction(p, s.resetForm), _ = !0) : this.isTooltipOnly && !_ && (this._bindLink(p, ""), _ = !0)), this.quadrilaterals ? this._renderQuadrilaterals("linkAnnotation").map((E, j) => {
              const X = j === 0 ? p : p.cloneNode();
              return E.append(X), E;
            }) : (this.container.className = "linkAnnotation", _ && this.container.append(p), this.container);
          }
          _bindLink(s, c) {
            s.href = this.linkService.getDestinationHash(c), s.onclick = () => (c && this.linkService.goToDestination(c), !1), (c || c === "") && (s.className = "internalLink");
          }
          _bindNamedAction(s, c) {
            s.href = this.linkService.getAnchorUrl(""), s.onclick = () => (this.linkService.executeNamedAction(c), !1), s.className = "internalLink";
          }
          _bindJSAction(s, c) {
            s.href = this.linkService.getAnchorUrl("");
            const p = /* @__PURE__ */ new Map([["Action", "onclick"], ["Mouse Up", "onmouseup"], ["Mouse Down", "onmousedown"]]);
            for (const _ of Object.keys(c.actions)) {
              const E = p.get(_);
              !E || (s[E] = () => {
                var j;
                return (j = this.linkService.eventBus) == null || j.dispatch("dispatcheventinsandbox", {
                  source: this,
                  detail: {
                    id: c.id,
                    name: _
                  }
                }), !1;
              });
            }
            s.onclick || (s.onclick = () => !1), s.className = "internalLink";
          }
          _bindResetFormAction(s, c) {
            const p = s.onclick;
            if (p || (s.href = this.linkService.getAnchorUrl("")), s.className = "internalLink", !this._fieldObjects) {
              (0, e.warn)('_bindResetFormAction - "resetForm" action not supported, ensure that the `fieldObjects` parameter is provided.'), p || (s.onclick = () => !1);
              return;
            }
            s.onclick = () => {
              var tt;
              p && p();
              const {
                fields: _,
                refs: E,
                include: j
              } = c, X = [];
              if (_.length !== 0 || E.length !== 0) {
                const K = new Set(E);
                for (const et of _) {
                  const ft = this._fieldObjects[et] || [];
                  for (const {
                    id: pt
                  } of ft)
                    K.add(pt);
                }
                for (const et of Object.values(this._fieldObjects))
                  for (const ft of et)
                    K.has(ft.id) === j && X.push(ft);
              } else
                for (const K of Object.values(this._fieldObjects))
                  X.push(...K);
              const $ = this.annotationStorage, q = [];
              for (const K of X) {
                const {
                  id: et
                } = K;
                switch (q.push(et), K.type) {
                  case "text": {
                    const pt = K.defaultValue || "";
                    $.setValue(et, {
                      value: pt
                    });
                    break;
                  }
                  case "checkbox":
                  case "radiobutton": {
                    const pt = K.defaultValue === K.exportValues;
                    $.setValue(et, {
                      value: pt
                    });
                    break;
                  }
                  case "combobox":
                  case "listbox": {
                    const pt = K.defaultValue || "";
                    $.setValue(et, {
                      value: pt
                    });
                    break;
                  }
                  default:
                    continue;
                }
                const ft = document.querySelector(`[data-element-id="${et}"]`);
                if (ft) {
                  if (!S.has(ft)) {
                    (0, e.warn)(`_bindResetFormAction - element not allowed: ${et}`);
                    continue;
                  }
                } else
                  continue;
                ft.dispatchEvent(new Event("resetform"));
              }
              return this.enableScripting && ((tt = this.linkService.eventBus) == null || tt.dispatch("dispatcheventinsandbox", {
                source: this,
                detail: {
                  id: "app",
                  ids: q,
                  name: "ResetForm"
                }
              })), !1;
            };
          }
        }
        class n extends P {
          constructor(s) {
            var p, _, E;
            const c = !!(s.data.hasPopup || ((p = s.data.titleObj) == null ? void 0 : p.str) || ((_ = s.data.contentsObj) == null ? void 0 : _.str) || ((E = s.data.richText) == null ? void 0 : E.str));
            super(s, {
              isRenderable: c
            });
          }
          render() {
            this.container.className = "textAnnotation";
            const s = document.createElement("img");
            return s.src = this.imageResourcesPath + "annotation-" + this.data.name.toLowerCase() + ".svg", s.alt = "[{{type}} Annotation]", s.dataset.l10nId = "text_annotation_type", s.dataset.l10nArgs = JSON.stringify({
              type: this.data.name
            }), this.data.hasPopup || this._createPopup(s, this.data), this.container.append(s), this.container;
          }
        }
        class a extends P {
          render() {
            return this.data.alternativeText && (this.container.title = this.data.alternativeText), this.container;
          }
          _getKeyModifier(s) {
            const {
              isWin: c,
              isMac: p
            } = P.platform;
            return c && s.ctrlKey || p && s.metaKey;
          }
          _setEventListener(s, c, p, _) {
            c.includes("mouse") ? s.addEventListener(c, (E) => {
              var j;
              (j = this.linkService.eventBus) == null || j.dispatch("dispatcheventinsandbox", {
                source: this,
                detail: {
                  id: this.data.id,
                  name: p,
                  value: _(E),
                  shift: E.shiftKey,
                  modifier: this._getKeyModifier(E)
                }
              });
            }) : s.addEventListener(c, (E) => {
              var j;
              (j = this.linkService.eventBus) == null || j.dispatch("dispatcheventinsandbox", {
                source: this,
                detail: {
                  id: this.data.id,
                  name: p,
                  value: _(E)
                }
              });
            });
          }
          _setEventListeners(s, c, p) {
            var _;
            for (const [E, j] of c)
              (j === "Action" || ((_ = this.data.actions) == null ? void 0 : _[j])) && this._setEventListener(s, E, j, p);
          }
          _setBackgroundColor(s) {
            const c = this.data.backgroundColor || null;
            s.style.backgroundColor = c === null ? "transparent" : e.Util.makeHexColor(c[0], c[1], c[2]);
          }
          _setTextStyle(s) {
            const c = ["left", "center", "right"], {
              fontColor: p
            } = this.data.defaultAppearanceData, _ = this.data.defaultAppearanceData.fontSize || m, E = s.style;
            let j;
            if (this.data.multiLine) {
              const X = Math.abs(this.data.rect[3] - this.data.rect[1]), $ = Math.round(X / (e.LINE_FACTOR * _)) || 1, q = X / $;
              j = Math.min(_, Math.round(q / e.LINE_FACTOR));
            } else {
              const X = Math.abs(this.data.rect[3] - this.data.rect[1]);
              j = Math.min(_, Math.round(X / e.LINE_FACTOR));
            }
            E.fontSize = `calc(${j}px * var(--scale-factor))`, E.color = e.Util.makeHexColor(p[0], p[1], p[2]), this.data.textAlignment !== null && (E.textAlign = c[this.data.textAlignment]);
          }
          _setRequired(s, c) {
            c ? s.setAttribute("required", !0) : s.removeAttribute("required"), s.setAttribute("aria-required", c);
          }
        }
        class l extends a {
          constructor(s) {
            const c = s.renderForms || !s.data.hasAppearance && !!s.data.fieldValue;
            super(s, {
              isRenderable: c
            });
          }
          setPropertyOnSiblings(s, c, p, _) {
            const E = this.annotationStorage;
            for (const j of this._getElementsByName(s.name, s.id))
              j.domElement && (j.domElement[c] = p), E.setValue(j.id, {
                [_]: p
              });
          }
          render() {
            var _;
            const s = this.annotationStorage, c = this.data.id;
            this.container.className = "textWidgetAnnotation";
            let p = null;
            if (this.renderForms) {
              const E = s.getValue(c, {
                value: this.data.fieldValue
              }), j = E.formattedValue || E.value || "", X = {
                userValue: j,
                formattedValue: null,
                valueOnFocus: ""
              };
              this.data.multiLine ? (p = document.createElement("textarea"), p.textContent = j, this.data.doNotScroll && (p.style.overflowY = "hidden")) : (p = document.createElement("input"), p.type = "text", p.setAttribute("value", j), this.data.doNotScroll && (p.style.overflowX = "hidden")), S.add(p), p.setAttribute("data-element-id", c), p.disabled = this.data.readOnly, p.name = this.data.fieldName, p.tabIndex = x, this._setRequired(p, this.data.required), p.addEventListener("input", (q) => {
                s.setValue(c, {
                  value: q.target.value
                }), this.setPropertyOnSiblings(p, "value", q.target.value, "value");
              }), p.addEventListener("resetform", (q) => {
                var K;
                const tt = (K = this.data.defaultFieldValue) != null ? K : "";
                p.value = X.userValue = tt, X.formattedValue = null;
              });
              let $ = (q) => {
                const {
                  formattedValue: tt
                } = X;
                tt != null && (q.target.value = tt), q.target.scrollLeft = 0;
              };
              if (this.enableScripting && this.hasJSActions) {
                p.addEventListener("focus", (tt) => {
                  X.userValue && (tt.target.value = X.userValue), X.valueOnFocus = tt.target.value;
                }), p.addEventListener("updatefromsandbox", (tt) => {
                  const K = {
                    value(et) {
                      var ft;
                      X.userValue = (ft = et.detail.value) != null ? ft : "", s.setValue(c, {
                        value: X.userValue.toString()
                      }), et.target.value = X.userValue;
                    },
                    formattedValue(et) {
                      const {
                        formattedValue: ft
                      } = et.detail;
                      X.formattedValue = ft, ft != null && et.target !== document.activeElement && (et.target.value = ft), s.setValue(c, {
                        formattedValue: ft
                      });
                    },
                    selRange(et) {
                      et.target.setSelectionRange(...et.detail.selRange);
                    }
                  };
                  this._dispatchEventFromSandbox(K, tt);
                }), p.addEventListener("keydown", (tt) => {
                  var ft;
                  let K = -1;
                  if (tt.key === "Escape" ? K = 0 : tt.key === "Enter" ? K = 2 : tt.key === "Tab" && (K = 3), K === -1)
                    return;
                  const {
                    value: et
                  } = tt.target;
                  X.valueOnFocus !== et && (X.userValue = et, (ft = this.linkService.eventBus) == null || ft.dispatch("dispatcheventinsandbox", {
                    source: this,
                    detail: {
                      id: c,
                      name: "Keystroke",
                      value: et,
                      willCommit: !0,
                      commitKey: K,
                      selStart: tt.target.selectionStart,
                      selEnd: tt.target.selectionEnd
                    }
                  }));
                });
                const q = $;
                $ = null, p.addEventListener("blur", (tt) => {
                  var et;
                  const {
                    value: K
                  } = tt.target;
                  X.userValue = K, this._mouseState.isDown && X.valueOnFocus !== K && ((et = this.linkService.eventBus) == null || et.dispatch("dispatcheventinsandbox", {
                    source: this,
                    detail: {
                      id: c,
                      name: "Keystroke",
                      value: K,
                      willCommit: !0,
                      commitKey: 1,
                      selStart: tt.target.selectionStart,
                      selEnd: tt.target.selectionEnd
                    }
                  })), q(tt);
                }), (_ = this.data.actions) != null && _.Keystroke && p.addEventListener("beforeinput", (tt) => {
                  var Z;
                  const {
                    data: K,
                    target: et
                  } = tt, {
                    value: ft,
                    selectionStart: pt,
                    selectionEnd: vt
                  } = et;
                  let rt = pt, yt = vt;
                  switch (tt.inputType) {
                    case "deleteWordBackward": {
                      const it = ft.substring(0, pt).match(/\w*[^\w]*$/);
                      it && (rt -= it[0].length);
                      break;
                    }
                    case "deleteWordForward": {
                      const it = ft.substring(pt).match(/^[^\w]*\w*/);
                      it && (yt += it[0].length);
                      break;
                    }
                    case "deleteContentBackward":
                      pt === vt && (rt -= 1);
                      break;
                    case "deleteContentForward":
                      pt === vt && (yt += 1);
                      break;
                  }
                  tt.preventDefault(), (Z = this.linkService.eventBus) == null || Z.dispatch("dispatcheventinsandbox", {
                    source: this,
                    detail: {
                      id: c,
                      name: "Keystroke",
                      value: ft,
                      change: K || "",
                      willCommit: !1,
                      selStart: rt,
                      selEnd: yt
                    }
                  });
                }), this._setEventListeners(p, [["focus", "Focus"], ["blur", "Blur"], ["mousedown", "Mouse Down"], ["mouseenter", "Mouse Enter"], ["mouseleave", "Mouse Exit"], ["mouseup", "Mouse Up"]], (tt) => tt.target.value);
              }
              if ($ && p.addEventListener("blur", $), this.data.maxLen !== null && (p.maxLength = this.data.maxLen), this.data.comb) {
                const tt = (this.data.rect[2] - this.data.rect[0]) / this.data.maxLen;
                p.classList.add("comb"), p.style.letterSpacing = `calc(${tt}px * var(--scale-factor) - 1ch)`;
              }
            } else
              p = document.createElement("div"), p.textContent = this.data.fieldValue, p.style.verticalAlign = "middle", p.style.display = "table-cell";
            return this._setTextStyle(p), this._setBackgroundColor(p), this._setDefaultPropertiesFromJS(p), this.container.append(p), this.container;
          }
        }
        class F extends a {
          constructor(s) {
            super(s, {
              isRenderable: s.renderForms
            });
          }
          render() {
            const s = this.annotationStorage, c = this.data, p = c.id;
            let _ = s.getValue(p, {
              value: c.exportValue === c.fieldValue
            }).value;
            typeof _ == "string" && (_ = _ !== "Off", s.setValue(p, {
              value: _
            })), this.container.className = "buttonWidgetAnnotation checkBox";
            const E = document.createElement("input");
            return S.add(E), E.setAttribute("data-element-id", p), E.disabled = c.readOnly, this._setRequired(E, this.data.required), E.type = "checkbox", E.name = c.fieldName, _ && E.setAttribute("checked", !0), E.setAttribute("exportValue", c.exportValue), E.tabIndex = x, E.addEventListener("change", (j) => {
              const {
                name: X,
                checked: $
              } = j.target;
              for (const q of this._getElementsByName(X, p)) {
                const tt = $ && q.exportValue === c.exportValue;
                q.domElement && (q.domElement.checked = tt), s.setValue(q.id, {
                  value: tt
                });
              }
              s.setValue(p, {
                value: $
              });
            }), E.addEventListener("resetform", (j) => {
              const X = c.defaultFieldValue || "Off";
              j.target.checked = X === c.exportValue;
            }), this.enableScripting && this.hasJSActions && (E.addEventListener("updatefromsandbox", (j) => {
              const X = {
                value($) {
                  $.target.checked = $.detail.value !== "Off", s.setValue(p, {
                    value: $.target.checked
                  });
                }
              };
              this._dispatchEventFromSandbox(X, j);
            }), this._setEventListeners(E, [["change", "Validate"], ["change", "Action"], ["focus", "Focus"], ["blur", "Blur"], ["mousedown", "Mouse Down"], ["mouseenter", "Mouse Enter"], ["mouseleave", "Mouse Exit"], ["mouseup", "Mouse Up"]], (j) => j.target.checked)), this._setBackgroundColor(E), this._setDefaultPropertiesFromJS(E), this.container.append(E), this.container;
          }
        }
        class y extends a {
          constructor(s) {
            super(s, {
              isRenderable: s.renderForms
            });
          }
          render() {
            this.container.className = "buttonWidgetAnnotation radioButton";
            const s = this.annotationStorage, c = this.data, p = c.id;
            let _ = s.getValue(p, {
              value: c.fieldValue === c.buttonValue
            }).value;
            typeof _ == "string" && (_ = _ !== c.buttonValue, s.setValue(p, {
              value: _
            }));
            const E = document.createElement("input");
            if (S.add(E), E.setAttribute("data-element-id", p), E.disabled = c.readOnly, this._setRequired(E, this.data.required), E.type = "radio", E.name = c.fieldName, _ && E.setAttribute("checked", !0), E.tabIndex = x, E.addEventListener("change", (j) => {
              const {
                name: X,
                checked: $
              } = j.target;
              for (const q of this._getElementsByName(X, p))
                s.setValue(q.id, {
                  value: !1
                });
              s.setValue(p, {
                value: $
              });
            }), E.addEventListener("resetform", (j) => {
              const X = c.defaultFieldValue;
              j.target.checked = X != null && X === c.buttonValue;
            }), this.enableScripting && this.hasJSActions) {
              const j = c.buttonValue;
              E.addEventListener("updatefromsandbox", (X) => {
                const $ = {
                  value: (q) => {
                    const tt = j === q.detail.value;
                    for (const K of this._getElementsByName(q.target.name)) {
                      const et = tt && K.id === p;
                      K.domElement && (K.domElement.checked = et), s.setValue(K.id, {
                        value: et
                      });
                    }
                  }
                };
                this._dispatchEventFromSandbox($, X);
              }), this._setEventListeners(E, [["change", "Validate"], ["change", "Action"], ["focus", "Focus"], ["blur", "Blur"], ["mousedown", "Mouse Down"], ["mouseenter", "Mouse Enter"], ["mouseleave", "Mouse Exit"], ["mouseup", "Mouse Up"]], (X) => X.target.checked);
            }
            return this._setBackgroundColor(E), this._setDefaultPropertiesFromJS(E), this.container.append(E), this.container;
          }
        }
        class g extends u {
          constructor(s) {
            super(s, {
              ignoreBorder: s.data.hasAppearance
            });
          }
          render() {
            const s = super.render();
            s.className = "buttonWidgetAnnotation pushButton", this.data.alternativeText && (s.title = this.data.alternativeText);
            const c = s.lastChild;
            return this.enableScripting && this.hasJSActions && c && (this._setDefaultPropertiesFromJS(c), c.addEventListener("updatefromsandbox", (p) => {
              this._dispatchEventFromSandbox({}, p);
            })), s;
          }
        }
        class o extends a {
          constructor(s) {
            super(s, {
              isRenderable: s.renderForms
            });
          }
          render() {
            this.container.className = "choiceWidgetAnnotation";
            const s = this.annotationStorage, c = this.data.id, p = s.getValue(c, {
              value: this.data.fieldValue
            }), _ = document.createElement("select");
            S.add(_), _.setAttribute("data-element-id", c), _.disabled = this.data.readOnly, this._setRequired(_, this.data.required), _.name = this.data.fieldName, _.tabIndex = x;
            let E = this.data.combo && this.data.options.length > 0;
            this.data.combo || (_.size = this.data.options.length, this.data.multiSelect && (_.multiple = !0)), _.addEventListener("resetform", (q) => {
              const tt = this.data.defaultFieldValue;
              for (const K of _.options)
                K.selected = K.value === tt;
            });
            for (const q of this.data.options) {
              const tt = document.createElement("option");
              tt.textContent = q.displayValue, tt.value = q.exportValue, p.value.includes(q.exportValue) && (tt.setAttribute("selected", !0), E = !1), _.append(tt);
            }
            let j = null;
            if (E) {
              const q = document.createElement("option");
              q.value = " ", q.setAttribute("hidden", !0), q.setAttribute("selected", !0), _.prepend(q), j = () => {
                q.remove(), _.removeEventListener("input", j), j = null;
              }, _.addEventListener("input", j);
            }
            const X = (q, tt) => {
              const K = tt ? "value" : "textContent", et = q.target.options;
              return q.target.multiple ? Array.prototype.filter.call(et, (ft) => ft.selected).map((ft) => ft[K]) : et.selectedIndex === -1 ? null : et[et.selectedIndex][K];
            }, $ = (q) => {
              const tt = q.target.options;
              return Array.prototype.map.call(tt, (K) => ({
                displayValue: K.textContent,
                exportValue: K.value
              }));
            };
            return this.enableScripting && this.hasJSActions ? (_.addEventListener("updatefromsandbox", (q) => {
              const tt = {
                value(K) {
                  j == null || j();
                  const et = K.detail.value, ft = new Set(Array.isArray(et) ? et : [et]);
                  for (const pt of _.options)
                    pt.selected = ft.has(pt.value);
                  s.setValue(c, {
                    value: X(K, !0)
                  });
                },
                multipleSelection(K) {
                  _.multiple = !0;
                },
                remove(K) {
                  const et = _.options, ft = K.detail.remove;
                  et[ft].selected = !1, _.remove(ft), et.length > 0 && Array.prototype.findIndex.call(et, (vt) => vt.selected) === -1 && (et[0].selected = !0), s.setValue(c, {
                    value: X(K, !0),
                    items: $(K)
                  });
                },
                clear(K) {
                  for (; _.length !== 0; )
                    _.remove(0);
                  s.setValue(c, {
                    value: null,
                    items: []
                  });
                },
                insert(K) {
                  const {
                    index: et,
                    displayValue: ft,
                    exportValue: pt
                  } = K.detail.insert, vt = _.children[et], rt = document.createElement("option");
                  rt.textContent = ft, rt.value = pt, vt ? vt.before(rt) : _.append(rt), s.setValue(c, {
                    value: X(K, !0),
                    items: $(K)
                  });
                },
                items(K) {
                  const {
                    items: et
                  } = K.detail;
                  for (; _.length !== 0; )
                    _.remove(0);
                  for (const ft of et) {
                    const {
                      displayValue: pt,
                      exportValue: vt
                    } = ft, rt = document.createElement("option");
                    rt.textContent = pt, rt.value = vt, _.append(rt);
                  }
                  _.options.length > 0 && (_.options[0].selected = !0), s.setValue(c, {
                    value: X(K, !0),
                    items: $(K)
                  });
                },
                indices(K) {
                  const et = new Set(K.detail.indices);
                  for (const ft of K.target.options)
                    ft.selected = et.has(ft.index);
                  s.setValue(c, {
                    value: X(K, !0)
                  });
                },
                editable(K) {
                  K.target.disabled = !K.detail.editable;
                }
              };
              this._dispatchEventFromSandbox(tt, q);
            }), _.addEventListener("input", (q) => {
              var et;
              const tt = X(q, !0), K = X(q, !1);
              s.setValue(c, {
                value: tt
              }), (et = this.linkService.eventBus) == null || et.dispatch("dispatcheventinsandbox", {
                source: this,
                detail: {
                  id: c,
                  name: "Keystroke",
                  value: K,
                  changeEx: tt,
                  willCommit: !0,
                  commitKey: 1,
                  keyDown: !1
                }
              });
            }), this._setEventListeners(_, [["focus", "Focus"], ["blur", "Blur"], ["mousedown", "Mouse Down"], ["mouseenter", "Mouse Enter"], ["mouseleave", "Mouse Exit"], ["mouseup", "Mouse Up"], ["input", "Action"]], (q) => q.target.checked)) : _.addEventListener("input", function(q) {
              s.setValue(c, {
                value: X(q, !0)
              });
            }), this.data.combo && this._setTextStyle(_), this._setBackgroundColor(_), this._setDefaultPropertiesFromJS(_), this.container.append(_), this.container;
          }
        }
        class h extends P {
          constructor(s) {
            var p, _, E;
            const c = !!(((p = s.data.titleObj) == null ? void 0 : p.str) || ((_ = s.data.contentsObj) == null ? void 0 : _.str) || ((E = s.data.richText) == null ? void 0 : E.str));
            super(s, {
              isRenderable: c
            });
          }
          render() {
            const s = ["Line", "Square", "Circle", "PolyLine", "Polygon", "Ink"];
            if (this.container.className = "popupAnnotation", s.includes(this.data.parentType))
              return this.container;
            const c = `[data-annotation-id="${this.data.parentId}"]`, p = this.layer.querySelectorAll(c);
            if (p.length === 0)
              return this.container;
            const _ = new v({
              container: this.container,
              trigger: Array.from(p),
              color: this.data.color,
              titleObj: this.data.titleObj,
              modificationDate: this.data.modificationDate,
              contentsObj: this.data.contentsObj,
              richText: this.data.richText
            }), E = this.page, j = e.Util.normalizeRect([this.data.parentRect[0], E.view[3] - this.data.parentRect[1] + E.view[1], this.data.parentRect[2], E.view[3] - this.data.parentRect[3] + E.view[1]]), X = j[0] + this.data.parentRect[2] - this.data.parentRect[0], $ = j[1], [q, tt, K, et] = this.viewport.viewBox, ft = K - q, pt = et - tt;
            return this.container.style.left = `${100 * (X - q) / ft}%`, this.container.style.top = `${100 * ($ - tt) / pt}%`, this.container.append(_.render()), this.container;
          }
        }
        class v {
          constructor(s) {
            this.container = s.container, this.trigger = s.trigger, this.color = s.color, this.titleObj = s.titleObj, this.modificationDate = s.modificationDate, this.contentsObj = s.contentsObj, this.richText = s.richText, this.hideWrapper = s.hideWrapper || !1, this.pinned = !1;
          }
          render() {
            var X, $;
            const c = document.createElement("div");
            c.className = "popupWrapper", this.hideElement = this.hideWrapper ? c : this.container, this.hideElement.hidden = !0;
            const p = document.createElement("div");
            p.className = "popup";
            const _ = this.color;
            if (_) {
              const q = 0.7 * (255 - _[0]) + _[0], tt = 0.7 * (255 - _[1]) + _[1], K = 0.7 * (255 - _[2]) + _[2];
              p.style.backgroundColor = e.Util.makeHexColor(q | 0, tt | 0, K | 0);
            }
            const E = document.createElement("h1");
            E.dir = this.titleObj.dir, E.textContent = this.titleObj.str, p.append(E);
            const j = d.PDFDateString.toDateObject(this.modificationDate);
            if (j) {
              const q = document.createElement("span");
              q.className = "popupDate", q.textContent = "{{date}}, {{time}}", q.dataset.l10nId = "annotation_date_string", q.dataset.l10nArgs = JSON.stringify({
                date: j.toLocaleDateString(),
                time: j.toLocaleTimeString()
              }), p.append(q);
            }
            if (((X = this.richText) == null ? void 0 : X.str) && (!(($ = this.contentsObj) != null && $.str) || this.contentsObj.str === this.richText.str))
              I.XfaLayer.render({
                xfaHtml: this.richText.html,
                intent: "richText",
                div: p
              }), p.lastChild.className = "richText popupContent";
            else {
              const q = this._formatContents(this.contentsObj);
              p.append(q);
            }
            Array.isArray(this.trigger) || (this.trigger = [this.trigger]);
            for (const q of this.trigger)
              q.addEventListener("click", this._toggle.bind(this)), q.addEventListener("mouseover", this._show.bind(this, !1)), q.addEventListener("mouseout", this._hide.bind(this, !1));
            return p.addEventListener("click", this._hide.bind(this, !0)), c.append(p), c;
          }
          _formatContents({
            str: s,
            dir: c
          }) {
            const p = document.createElement("p");
            p.className = "popupContent", p.dir = c;
            const _ = s.split(/(?:\r\n?|\n)/);
            for (let E = 0, j = _.length; E < j; ++E) {
              const X = _[E];
              p.append(document.createTextNode(X)), E < j - 1 && p.append(document.createElement("br"));
            }
            return p;
          }
          _toggle() {
            this.pinned ? this._hide(!0) : this._show(!0);
          }
          _show(s = !1) {
            s && (this.pinned = !0), this.hideElement.hidden && (this.hideElement.hidden = !1, this.container.style.zIndex += 1);
          }
          _hide(s = !0) {
            s && (this.pinned = !1), !this.hideElement.hidden && !this.pinned && (this.hideElement.hidden = !0, this.container.style.zIndex -= 1);
          }
        }
        class O extends P {
          constructor(s) {
            var p, _, E;
            const c = !!(s.data.hasPopup || ((p = s.data.titleObj) == null ? void 0 : p.str) || ((_ = s.data.contentsObj) == null ? void 0 : _.str) || ((E = s.data.richText) == null ? void 0 : E.str));
            super(s, {
              isRenderable: c,
              ignoreBorder: !0
            });
          }
          render() {
            return this.container.className = "freeTextAnnotation", this.data.hasPopup || this._createPopup(null, this.data), this.container;
          }
        }
        class D extends P {
          constructor(s) {
            var p, _, E;
            const c = !!(s.data.hasPopup || ((p = s.data.titleObj) == null ? void 0 : p.str) || ((_ = s.data.contentsObj) == null ? void 0 : _.str) || ((E = s.data.richText) == null ? void 0 : E.str));
            super(s, {
              isRenderable: c,
              ignoreBorder: !0
            });
          }
          render() {
            this.container.className = "lineAnnotation";
            const s = this.data, {
              width: c,
              height: p
            } = R(s.rect), _ = this.svgFactory.create(c, p, !0), E = this.svgFactory.createElement("svg:line");
            return E.setAttribute("x1", s.rect[2] - s.lineCoordinates[0]), E.setAttribute("y1", s.rect[3] - s.lineCoordinates[1]), E.setAttribute("x2", s.rect[2] - s.lineCoordinates[2]), E.setAttribute("y2", s.rect[3] - s.lineCoordinates[3]), E.setAttribute("stroke-width", s.borderStyle.width || 1), E.setAttribute("stroke", "transparent"), E.setAttribute("fill", "transparent"), _.append(E), this.container.append(_), this._createPopup(E, s), this.container;
          }
        }
        class L extends P {
          constructor(s) {
            var p, _, E;
            const c = !!(s.data.hasPopup || ((p = s.data.titleObj) == null ? void 0 : p.str) || ((_ = s.data.contentsObj) == null ? void 0 : _.str) || ((E = s.data.richText) == null ? void 0 : E.str));
            super(s, {
              isRenderable: c,
              ignoreBorder: !0
            });
          }
          render() {
            this.container.className = "squareAnnotation";
            const s = this.data, {
              width: c,
              height: p
            } = R(s.rect), _ = this.svgFactory.create(c, p, !0), E = s.borderStyle.width, j = this.svgFactory.createElement("svg:rect");
            return j.setAttribute("x", E / 2), j.setAttribute("y", E / 2), j.setAttribute("width", c - E), j.setAttribute("height", p - E), j.setAttribute("stroke-width", E || 1), j.setAttribute("stroke", "transparent"), j.setAttribute("fill", "transparent"), _.append(j), this.container.append(_), this._createPopup(j, s), this.container;
          }
        }
        class U extends P {
          constructor(s) {
            var p, _, E;
            const c = !!(s.data.hasPopup || ((p = s.data.titleObj) == null ? void 0 : p.str) || ((_ = s.data.contentsObj) == null ? void 0 : _.str) || ((E = s.data.richText) == null ? void 0 : E.str));
            super(s, {
              isRenderable: c,
              ignoreBorder: !0
            });
          }
          render() {
            this.container.className = "circleAnnotation";
            const s = this.data, {
              width: c,
              height: p
            } = R(s.rect), _ = this.svgFactory.create(c, p, !0), E = s.borderStyle.width, j = this.svgFactory.createElement("svg:ellipse");
            return j.setAttribute("cx", c / 2), j.setAttribute("cy", p / 2), j.setAttribute("rx", c / 2 - E / 2), j.setAttribute("ry", p / 2 - E / 2), j.setAttribute("stroke-width", E || 1), j.setAttribute("stroke", "transparent"), j.setAttribute("fill", "transparent"), _.append(j), this.container.append(_), this._createPopup(j, s), this.container;
          }
        }
        class J extends P {
          constructor(s) {
            var p, _, E;
            const c = !!(s.data.hasPopup || ((p = s.data.titleObj) == null ? void 0 : p.str) || ((_ = s.data.contentsObj) == null ? void 0 : _.str) || ((E = s.data.richText) == null ? void 0 : E.str));
            super(s, {
              isRenderable: c,
              ignoreBorder: !0
            }), this.containerClassName = "polylineAnnotation", this.svgElementName = "svg:polyline";
          }
          render() {
            this.container.className = this.containerClassName;
            const s = this.data, {
              width: c,
              height: p
            } = R(s.rect), _ = this.svgFactory.create(c, p, !0);
            let E = [];
            for (const X of s.vertices) {
              const $ = X.x - s.rect[0], q = s.rect[3] - X.y;
              E.push($ + "," + q);
            }
            E = E.join(" ");
            const j = this.svgFactory.createElement(this.svgElementName);
            return j.setAttribute("points", E), j.setAttribute("stroke-width", s.borderStyle.width || 1), j.setAttribute("stroke", "transparent"), j.setAttribute("fill", "transparent"), _.append(j), this.container.append(_), this._createPopup(j, s), this.container;
          }
        }
        class V extends J {
          constructor(s) {
            super(s), this.containerClassName = "polygonAnnotation", this.svgElementName = "svg:polygon";
          }
        }
        class N extends P {
          constructor(s) {
            var p, _, E;
            const c = !!(s.data.hasPopup || ((p = s.data.titleObj) == null ? void 0 : p.str) || ((_ = s.data.contentsObj) == null ? void 0 : _.str) || ((E = s.data.richText) == null ? void 0 : E.str));
            super(s, {
              isRenderable: c,
              ignoreBorder: !0
            });
          }
          render() {
            return this.container.className = "caretAnnotation", this.data.hasPopup || this._createPopup(null, this.data), this.container;
          }
        }
        class G extends P {
          constructor(s) {
            var p, _, E;
            const c = !!(s.data.hasPopup || ((p = s.data.titleObj) == null ? void 0 : p.str) || ((_ = s.data.contentsObj) == null ? void 0 : _.str) || ((E = s.data.richText) == null ? void 0 : E.str));
            super(s, {
              isRenderable: c,
              ignoreBorder: !0
            }), this.containerClassName = "inkAnnotation", this.svgElementName = "svg:polyline";
          }
          render() {
            this.container.className = this.containerClassName;
            const s = this.data, {
              width: c,
              height: p
            } = R(s.rect), _ = this.svgFactory.create(c, p, !0);
            for (const E of s.inkLists) {
              let j = [];
              for (const $ of E) {
                const q = $.x - s.rect[0], tt = s.rect[3] - $.y;
                j.push(`${q},${tt}`);
              }
              j = j.join(" ");
              const X = this.svgFactory.createElement(this.svgElementName);
              X.setAttribute("points", j), X.setAttribute("stroke-width", s.borderStyle.width || 1), X.setAttribute("stroke", "transparent"), X.setAttribute("fill", "transparent"), this._createPopup(X, s), _.append(X);
            }
            return this.container.append(_), this.container;
          }
        }
        class k extends P {
          constructor(s) {
            var p, _, E;
            const c = !!(s.data.hasPopup || ((p = s.data.titleObj) == null ? void 0 : p.str) || ((_ = s.data.contentsObj) == null ? void 0 : _.str) || ((E = s.data.richText) == null ? void 0 : E.str));
            super(s, {
              isRenderable: c,
              ignoreBorder: !0,
              createQuadrilaterals: !0
            });
          }
          render() {
            return this.data.hasPopup || this._createPopup(null, this.data), this.quadrilaterals ? this._renderQuadrilaterals("highlightAnnotation") : (this.container.className = "highlightAnnotation", this.container);
          }
        }
        class z extends P {
          constructor(s) {
            var p, _, E;
            const c = !!(s.data.hasPopup || ((p = s.data.titleObj) == null ? void 0 : p.str) || ((_ = s.data.contentsObj) == null ? void 0 : _.str) || ((E = s.data.richText) == null ? void 0 : E.str));
            super(s, {
              isRenderable: c,
              ignoreBorder: !0,
              createQuadrilaterals: !0
            });
          }
          render() {
            return this.data.hasPopup || this._createPopup(null, this.data), this.quadrilaterals ? this._renderQuadrilaterals("underlineAnnotation") : (this.container.className = "underlineAnnotation", this.container);
          }
        }
        class W extends P {
          constructor(s) {
            var p, _, E;
            const c = !!(s.data.hasPopup || ((p = s.data.titleObj) == null ? void 0 : p.str) || ((_ = s.data.contentsObj) == null ? void 0 : _.str) || ((E = s.data.richText) == null ? void 0 : E.str));
            super(s, {
              isRenderable: c,
              ignoreBorder: !0,
              createQuadrilaterals: !0
            });
          }
          render() {
            return this.data.hasPopup || this._createPopup(null, this.data), this.quadrilaterals ? this._renderQuadrilaterals("squigglyAnnotation") : (this.container.className = "squigglyAnnotation", this.container);
          }
        }
        class st extends P {
          constructor(s) {
            var p, _, E;
            const c = !!(s.data.hasPopup || ((p = s.data.titleObj) == null ? void 0 : p.str) || ((_ = s.data.contentsObj) == null ? void 0 : _.str) || ((E = s.data.richText) == null ? void 0 : E.str));
            super(s, {
              isRenderable: c,
              ignoreBorder: !0,
              createQuadrilaterals: !0
            });
          }
          render() {
            return this.data.hasPopup || this._createPopup(null, this.data), this.quadrilaterals ? this._renderQuadrilaterals("strikeoutAnnotation") : (this.container.className = "strikeoutAnnotation", this.container);
          }
        }
        class ot extends P {
          constructor(s) {
            var p, _, E;
            const c = !!(s.data.hasPopup || ((p = s.data.titleObj) == null ? void 0 : p.str) || ((_ = s.data.contentsObj) == null ? void 0 : _.str) || ((E = s.data.richText) == null ? void 0 : E.str));
            super(s, {
              isRenderable: c,
              ignoreBorder: !0
            });
          }
          render() {
            return this.container.className = "stampAnnotation", this.data.hasPopup || this._createPopup(null, this.data), this.container;
          }
        }
        class ct extends P {
          constructor(s) {
            var _;
            super(s, {
              isRenderable: !0
            });
            const {
              filename: c,
              content: p
            } = this.data.file;
            this.filename = (0, d.getFilenameFromUrl)(c), this.content = p, (_ = this.linkService.eventBus) == null || _.dispatch("fileattachmentannotation", {
              source: this,
              filename: c,
              content: p
            });
          }
          render() {
            var c, p;
            this.container.className = "fileAttachmentAnnotation";
            const s = document.createElement("div");
            return s.className = "popupTriggerArea", s.addEventListener("dblclick", this._download.bind(this)), !this.data.hasPopup && (((c = this.data.titleObj) == null ? void 0 : c.str) || ((p = this.data.contentsObj) == null ? void 0 : p.str) || this.data.richText) && this._createPopup(s, this.data), this.container.append(s), this.container;
          }
          _download() {
            var s;
            (s = this.downloadManager) == null || s.openOrDownloadData(this.container, this.content, this.filename);
          }
        }
        class mt {
          static render(s) {
            const {
              annotations: c,
              div: p,
              viewport: _
            } = s;
            lt(this, bt, Ce).call(this, p, _);
            const E = [], j = [];
            for (const X of c) {
              if (!X)
                continue;
              if (X.annotationType === e.AnnotationType.POPUP) {
                j.push(X);
                continue;
              }
              const {
                width: $,
                height: q
              } = R(X.rect);
              $ <= 0 || q <= 0 || E.push(X);
            }
            j.length && E.push(...j);
            for (const X of E) {
              const $ = A.create({
                data: X,
                layer: p,
                page: s.page,
                viewport: _,
                linkService: s.linkService,
                downloadManager: s.downloadManager,
                imageResourcesPath: s.imageResourcesPath || "",
                renderForms: s.renderForms !== !1,
                svgFactory: new d.DOMSVGFactory(),
                annotationStorage: s.annotationStorage || new C.AnnotationStorage(),
                enableScripting: s.enableScripting,
                hasJSActions: s.hasJSActions,
                fieldObjects: s.fieldObjects,
                mouseState: s.mouseState || {
                  isDown: !1
                }
              });
              if ($.isRenderable) {
                const q = $.render();
                if (X.hidden && (q.style.visibility = "hidden"), Array.isArray(q))
                  for (const tt of q)
                    p.append(tt);
                else
                  $ instanceof h ? p.prepend(q) : p.append(q);
              }
            }
            lt(this, b, Ee).call(this, p, s.annotationCanvasMap);
          }
          static update(s) {
            const {
              annotationCanvasMap: c,
              div: p,
              viewport: _
            } = s;
            lt(this, bt, Ce).call(this, p, _), lt(this, b, Ee).call(this, p, c), p.hidden = !1;
          }
        }
        bt = new WeakSet(), Ce = function(s, {
          width: c,
          height: p,
          rotation: _
        }) {
          const {
            style: E
          } = s, j = _ % 180 !== 0, X = Math.floor(c) + "px", $ = Math.floor(p) + "px";
          E.width = j ? $ : X, E.height = j ? X : $, s.setAttribute("data-main-rotation", _);
        }, b = new WeakSet(), Ee = function(s, c) {
          if (!!c) {
            for (const [p, _] of c) {
              const E = s.querySelector(`[data-annotation-id="${p}"]`);
              if (!E)
                continue;
              const {
                firstChild: j
              } = E;
              j ? j.nodeName === "CANVAS" ? j.replaceWith(_) : j.before(_) : E.append(_);
            }
            c.clear();
          }
        }, at(mt, bt), at(mt, b), i.AnnotationLayer = mt;
      },
      (t, i) => {
        Object.defineProperty(i, "__esModule", {
          value: !0
        }), i.ColorConverters = void 0;
        function r(d) {
          return Math.floor(Math.max(0, Math.min(1, d)) * 255).toString(16).padStart(2, "0");
        }
        class e {
          static CMYK_G([C, T, I, x]) {
            return ["G", 1 - Math.min(1, 0.3 * C + 0.59 * I + 0.11 * T + x)];
          }
          static G_CMYK([C]) {
            return ["CMYK", 0, 0, 0, 1 - C];
          }
          static G_RGB([C]) {
            return ["RGB", C, C, C];
          }
          static G_HTML([C]) {
            const T = r(C);
            return `#${T}${T}${T}`;
          }
          static RGB_G([C, T, I]) {
            return ["G", 0.3 * C + 0.59 * T + 0.11 * I];
          }
          static RGB_HTML([C, T, I]) {
            const x = r(C), m = r(T), S = r(I);
            return `#${x}${m}${S}`;
          }
          static T_HTML() {
            return "#00000000";
          }
          static CMYK_RGB([C, T, I, x]) {
            return ["RGB", 1 - Math.min(1, C + x), 1 - Math.min(1, I + x), 1 - Math.min(1, T + x)];
          }
          static CMYK_HTML(C) {
            const T = this.CMYK_RGB(C).slice(1);
            return this.RGB_HTML(T);
          }
          static RGB_CMYK([C, T, I]) {
            const x = 1 - C, m = 1 - T, S = 1 - I, R = Math.min(x, m, S);
            return ["CMYK", x, m, S, R];
          }
        }
        i.ColorConverters = e;
      },
      (t, i, r) => {
        Object.defineProperty(i, "__esModule", {
          value: !0
        }), i.XfaLayer = void 0;
        var e = r(20);
        class d {
          static setupStorage(T, I, x, m, S) {
            const R = m.getValue(I, {
              value: null
            });
            switch (x.name) {
              case "textarea":
                if (R.value !== null && (T.textContent = R.value), S === "print")
                  break;
                T.addEventListener("input", (A) => {
                  m.setValue(I, {
                    value: A.target.value
                  });
                });
                break;
              case "input":
                if (x.attributes.type === "radio" || x.attributes.type === "checkbox") {
                  if (R.value === x.attributes.xfaOn ? T.setAttribute("checked", !0) : R.value === x.attributes.xfaOff && T.removeAttribute("checked"), S === "print")
                    break;
                  T.addEventListener("change", (A) => {
                    m.setValue(I, {
                      value: A.target.checked ? A.target.getAttribute("xfaOn") : A.target.getAttribute("xfaOff")
                    });
                  });
                } else {
                  if (R.value !== null && T.setAttribute("value", R.value), S === "print")
                    break;
                  T.addEventListener("input", (A) => {
                    m.setValue(I, {
                      value: A.target.value
                    });
                  });
                }
                break;
              case "select":
                if (R.value !== null)
                  for (const A of x.children)
                    A.attributes.value === R.value && (A.attributes.selected = !0);
                T.addEventListener("input", (A) => {
                  const P = A.target.options, u = P.selectedIndex === -1 ? "" : P[P.selectedIndex].value;
                  m.setValue(I, {
                    value: u
                  });
                });
                break;
            }
          }
          static setAttributes({
            html: T,
            element: I,
            storage: x = null,
            intent: m,
            linkService: S
          }) {
            const {
              attributes: R
            } = I, A = T instanceof HTMLAnchorElement;
            R.type === "radio" && (R.name = `${R.name}-${m}`);
            for (const [P, u] of Object.entries(R))
              if (u != null)
                switch (P) {
                  case "class":
                    u.length && T.setAttribute(P, u.join(" "));
                    break;
                  case "dataId":
                    break;
                  case "id":
                    T.setAttribute("data-element-id", u);
                    break;
                  case "style":
                    Object.assign(T.style, u);
                    break;
                  case "textContent":
                    T.textContent = u;
                    break;
                  default:
                    (!A || P !== "href" && P !== "newWindow") && T.setAttribute(P, u);
                }
            A && S.addLinkAttributes(T, R.href, R.newWindow), x && R.dataId && this.setupStorage(T, R.dataId, I, x);
          }
          static render(T) {
            var n;
            const I = T.annotationStorage, x = T.linkService, m = T.xfaHtml, S = T.intent || "display", R = document.createElement(m.name);
            m.attributes && this.setAttributes({
              html: R,
              element: m,
              intent: S,
              linkService: x
            });
            const A = [[m, -1, R]], P = T.div;
            if (P.append(R), T.viewport) {
              const a = `matrix(${T.viewport.transform.join(",")})`;
              P.style.transform = a;
            }
            S !== "richText" && P.setAttribute("class", "xfaLayer xfaFont");
            const u = [];
            for (; A.length > 0; ) {
              const [a, l, F] = A.at(-1);
              if (l + 1 === a.children.length) {
                A.pop();
                continue;
              }
              const y = a.children[++A.at(-1)[1]];
              if (y === null)
                continue;
              const {
                name: g
              } = y;
              if (g === "#text") {
                const h = document.createTextNode(y.value);
                u.push(h), F.append(h);
                continue;
              }
              let o;
              if ((n = y == null ? void 0 : y.attributes) != null && n.xmlns ? o = document.createElementNS(y.attributes.xmlns, g) : o = document.createElement(g), F.append(o), y.attributes && this.setAttributes({
                html: o,
                element: y,
                storage: I,
                intent: S,
                linkService: x
              }), y.children && y.children.length > 0)
                A.push([y, -1, o]);
              else if (y.value) {
                const h = document.createTextNode(y.value);
                e.XfaText.shouldBuildText(g) && u.push(h), o.append(h);
              }
            }
            for (const a of P.querySelectorAll(".xfaNonInteractive input, .xfaNonInteractive textarea"))
              a.setAttribute("readOnly", !0);
            return {
              textDivs: u
            };
          }
          static update(T) {
            const I = `matrix(${T.viewport.transform.join(",")})`;
            T.div.style.transform = I, T.div.hidden = !1;
          }
        }
        i.XfaLayer = d;
      },
      (t, i, r) => {
        Object.defineProperty(i, "__esModule", {
          value: !0
        }), i.TextLayerRenderTask = void 0, i.renderTextLayer = F;
        var e = r(1), d = r(4);
        const C = 1e5, T = 30, I = 0.8, x = /* @__PURE__ */ new Map(), m = /^\s+$/g;
        function S(y, g) {
          const o = x.get(y);
          if (o)
            return o;
          g.save(), g.font = `${T}px ${y}`;
          const h = g.measureText("");
          let v = h.fontBoundingBoxAscent, O = Math.abs(h.fontBoundingBoxDescent);
          if (v) {
            g.restore();
            const L = v / (v + O);
            return x.set(y, L), L;
          }
          g.strokeStyle = "red", g.clearRect(0, 0, T, T), g.strokeText("g", 0, 0);
          let D = g.getImageData(0, 0, T, T).data;
          O = 0;
          for (let L = D.length - 1 - 3; L >= 0; L -= 4)
            if (D[L] > 0) {
              O = Math.ceil(L / 4 / T);
              break;
            }
          g.clearRect(0, 0, T, T), g.strokeText("A", 0, T), D = g.getImageData(0, 0, T, T).data, v = 0;
          for (let L = 0, U = D.length; L < U; L += 4)
            if (D[L] > 0) {
              v = T - Math.floor(L / 4 / T);
              break;
            }
          if (g.restore(), v) {
            const L = v / (v + O);
            return x.set(y, L), L;
          }
          return x.set(y, I), I;
        }
        function R(y, g, o, h) {
          const v = document.createElement("span"), O = y._enhanceTextSelection ? {
            angle: 0,
            canvasWidth: 0,
            hasText: g.str !== "",
            hasEOL: g.hasEOL,
            originalTransform: null,
            paddingBottom: 0,
            paddingLeft: 0,
            paddingRight: 0,
            paddingTop: 0,
            scale: 1,
            fontSize: 0
          } : {
            angle: 0,
            canvasWidth: 0,
            hasText: g.str !== "",
            hasEOL: g.hasEOL,
            fontSize: 0
          };
          y._textDivs.push(v);
          const D = e.Util.transform(y._viewport.transform, g.transform);
          let L = Math.atan2(D[1], D[0]);
          const U = o[g.fontName];
          U.vertical && (L += Math.PI / 2);
          const J = Math.hypot(D[2], D[3]), V = J * S(U.fontFamily, h);
          let N, G;
          L === 0 ? (N = D[4], G = D[5] - V) : (N = D[4] + V * Math.sin(L), G = D[5] - V * Math.cos(L)), v.style.left = `${N}px`, v.style.top = `${G}px`, v.style.fontSize = `${J}px`, v.style.fontFamily = U.fontFamily, O.fontSize = J, v.setAttribute("role", "presentation"), v.textContent = g.str, v.dir = g.dir, y._fontInspectorEnabled && (v.dataset.fontName = g.fontName), L !== 0 && (O.angle = L * (180 / Math.PI));
          let k = !1;
          if (g.str.length > 1 || y._enhanceTextSelection && m.test(g.str))
            k = !0;
          else if (g.str !== " " && g.transform[0] !== g.transform[3]) {
            const z = Math.abs(g.transform[0]), W = Math.abs(g.transform[3]);
            z !== W && Math.max(z, W) / Math.min(z, W) > 1.5 && (k = !0);
          }
          if (k && (U.vertical ? O.canvasWidth = g.height * y._viewport.scale : O.canvasWidth = g.width * y._viewport.scale), y._textDivProperties.set(v, O), y._textContentStream && y._layoutText(v), y._enhanceTextSelection && O.hasText) {
            let z = 1, W = 0;
            L !== 0 && (z = Math.cos(L), W = Math.sin(L));
            const st = (U.vertical ? g.height : g.width) * y._viewport.scale, ot = J;
            let ct, mt;
            L !== 0 ? (ct = [z, W, -W, z, N, G], mt = e.Util.getAxialAlignedBoundingBox([0, 0, st, ot], ct)) : mt = [N, G, N + st, G + ot], y._bounds.push({
              left: mt[0],
              top: mt[1],
              right: mt[2],
              bottom: mt[3],
              div: v,
              size: [st, ot],
              m: ct
            });
          }
        }
        function A(y) {
          if (y._canceled)
            return;
          const g = y._textDivs, o = y._capability, h = g.length;
          if (h > C) {
            y._renderingDone = !0, o.resolve();
            return;
          }
          if (!y._textContentStream)
            for (let v = 0; v < h; v++)
              y._layoutText(g[v]);
          y._renderingDone = !0, o.resolve();
        }
        function P(y, g, o) {
          let h = 0;
          for (let v = 0; v < o; v++) {
            const O = y[g++];
            O > 0 && (h = h ? Math.min(O, h) : O);
          }
          return h;
        }
        function u(y) {
          const g = y._bounds, o = y._viewport, h = n(o.width, o.height, g);
          for (let v = 0; v < h.length; v++) {
            const O = g[v].div, D = y._textDivProperties.get(O);
            if (D.angle === 0) {
              D.paddingLeft = g[v].left - h[v].left, D.paddingTop = g[v].top - h[v].top, D.paddingRight = h[v].right - g[v].right, D.paddingBottom = h[v].bottom - g[v].bottom, y._textDivProperties.set(O, D);
              continue;
            }
            const L = h[v], U = g[v], J = U.m, V = J[0], N = J[1], G = [[0, 0], [0, U.size[1]], [U.size[0], 0], U.size], k = new Float64Array(64);
            for (let W = 0, st = G.length; W < st; W++) {
              const ot = e.Util.applyTransform(G[W], J);
              k[W + 0] = V && (L.left - ot[0]) / V, k[W + 4] = N && (L.top - ot[1]) / N, k[W + 8] = V && (L.right - ot[0]) / V, k[W + 12] = N && (L.bottom - ot[1]) / N, k[W + 16] = N && (L.left - ot[0]) / -N, k[W + 20] = V && (L.top - ot[1]) / V, k[W + 24] = N && (L.right - ot[0]) / -N, k[W + 28] = V && (L.bottom - ot[1]) / V, k[W + 32] = V && (L.left - ot[0]) / -V, k[W + 36] = N && (L.top - ot[1]) / -N, k[W + 40] = V && (L.right - ot[0]) / -V, k[W + 44] = N && (L.bottom - ot[1]) / -N, k[W + 48] = N && (L.left - ot[0]) / N, k[W + 52] = V && (L.top - ot[1]) / -V, k[W + 56] = N && (L.right - ot[0]) / N, k[W + 60] = V && (L.bottom - ot[1]) / -V;
            }
            const z = 1 + Math.min(Math.abs(V), Math.abs(N));
            D.paddingLeft = P(k, 32, 16) / z, D.paddingTop = P(k, 48, 16) / z, D.paddingRight = P(k, 0, 16) / z, D.paddingBottom = P(k, 16, 16) / z, y._textDivProperties.set(O, D);
          }
        }
        function n(y, g, o) {
          const h = o.map(function(O, D) {
            return {
              x1: O.left,
              y1: O.top,
              x2: O.right,
              y2: O.bottom,
              index: D,
              x1New: void 0,
              x2New: void 0
            };
          });
          a(y, h);
          const v = new Array(o.length);
          for (const O of h) {
            const D = O.index;
            v[D] = {
              left: O.x1New,
              top: 0,
              right: O.x2New,
              bottom: 0
            };
          }
          o.map(function(O, D) {
            const L = v[D], U = h[D];
            U.x1 = O.top, U.y1 = y - L.right, U.x2 = O.bottom, U.y2 = y - L.left, U.index = D, U.x1New = void 0, U.x2New = void 0;
          }), a(g, h);
          for (const O of h) {
            const D = O.index;
            v[D].top = O.x1New, v[D].bottom = O.x2New;
          }
          return v;
        }
        function a(y, g) {
          g.sort(function(v, O) {
            return v.x1 - O.x1 || v.index - O.index;
          });
          const h = [{
            start: -1 / 0,
            end: 1 / 0,
            boundary: {
              x1: -1 / 0,
              y1: -1 / 0,
              x2: 0,
              y2: 1 / 0,
              index: -1,
              x1New: 0,
              x2New: 0
            }
          }];
          for (const v of g) {
            let O = 0;
            for (; O < h.length && h[O].end <= v.y1; )
              O++;
            let D = h.length - 1;
            for (; D >= 0 && h[D].start >= v.y2; )
              D--;
            let L, U, J, V, N = -1 / 0;
            for (J = O; J <= D; J++) {
              L = h[J], U = L.boundary;
              let z;
              U.x2 > v.x1 ? z = U.index > v.index ? U.x1New : v.x1 : U.x2New === void 0 ? z = (U.x2 + v.x1) / 2 : z = U.x2New, z > N && (N = z);
            }
            for (v.x1New = N, J = O; J <= D; J++)
              L = h[J], U = L.boundary, U.x2New === void 0 ? U.x2 > v.x1 ? U.index > v.index && (U.x2New = U.x2) : U.x2New = N : U.x2New > N && (U.x2New = Math.max(N, U.x2));
            const G = [];
            let k = null;
            for (J = O; J <= D; J++) {
              L = h[J], U = L.boundary;
              const z = U.x2 > v.x2 ? U : v;
              k === z ? G.at(-1).end = L.end : (G.push({
                start: L.start,
                end: L.end,
                boundary: z
              }), k = z);
            }
            for (h[O].start < v.y1 && (G[0].start = v.y1, G.unshift({
              start: h[O].start,
              end: v.y1,
              boundary: h[O].boundary
            })), v.y2 < h[D].end && (G.at(-1).end = v.y2, G.push({
              start: v.y2,
              end: h[D].end,
              boundary: h[D].boundary
            })), J = O; J <= D; J++) {
              if (L = h[J], U = L.boundary, U.x2New !== void 0)
                continue;
              let z = !1;
              for (V = O - 1; !z && V >= 0 && h[V].start >= U.y1; V--)
                z = h[V].boundary === U;
              for (V = D + 1; !z && V < h.length && h[V].end <= U.y2; V++)
                z = h[V].boundary === U;
              for (V = 0; !z && V < G.length; V++)
                z = G[V].boundary === U;
              z || (U.x2New = N);
            }
            Array.prototype.splice.apply(h, [O, D - O + 1, ...G]);
          }
          for (const v of h) {
            const O = v.boundary;
            O.x2New === void 0 && (O.x2New = Math.max(y, O.x2));
          }
        }
        class l {
          constructor({
            textContent: g,
            textContentStream: o,
            container: h,
            viewport: v,
            textDivs: O,
            textContentItemsStr: D,
            enhanceTextSelection: L
          }) {
            var U;
            L && (0, d.deprecated)("The `enhanceTextSelection` functionality will be removed in the future."), this._textContent = g, this._textContentStream = o, this._container = h, this._document = h.ownerDocument, this._viewport = v, this._textDivs = O || [], this._textContentItemsStr = D || [], this._enhanceTextSelection = !!L, this._fontInspectorEnabled = !!((U = globalThis.FontInspector) != null && U.enabled), this._reader = null, this._layoutTextLastFontSize = null, this._layoutTextLastFontFamily = null, this._layoutTextCtx = null, this._textDivProperties = /* @__PURE__ */ new WeakMap(), this._renderingDone = !1, this._canceled = !1, this._capability = (0, e.createPromiseCapability)(), this._renderTimer = null, this._bounds = [], this._devicePixelRatio = globalThis.devicePixelRatio || 1, this._capability.promise.finally(() => {
              this._enhanceTextSelection || (this._textDivProperties = null), this._layoutTextCtx && (this._layoutTextCtx.canvas.width = 0, this._layoutTextCtx.canvas.height = 0, this._layoutTextCtx = null);
            }).catch(() => {
            });
          }
          get promise() {
            return this._capability.promise;
          }
          cancel() {
            this._canceled = !0, this._reader && (this._reader.cancel(new e.AbortException("TextLayer task cancelled.")).catch(() => {
            }), this._reader = null), this._renderTimer !== null && (clearTimeout(this._renderTimer), this._renderTimer = null), this._capability.reject(new Error("TextLayer task cancelled."));
          }
          _processItems(g, o) {
            for (let h = 0, v = g.length; h < v; h++) {
              if (g[h].str === void 0) {
                if (g[h].type === "beginMarkedContentProps" || g[h].type === "beginMarkedContent") {
                  const O = this._container;
                  this._container = document.createElement("span"), this._container.classList.add("markedContent"), g[h].id !== null && this._container.setAttribute("id", `${g[h].id}`), O.append(this._container);
                } else
                  g[h].type === "endMarkedContent" && (this._container = this._container.parentNode);
                continue;
              }
              this._textContentItemsStr.push(g[h].str), R(this, g[h], o, this._layoutTextCtx);
            }
          }
          _layoutText(g) {
            const o = this._textDivProperties.get(g);
            let h = "";
            if (o.canvasWidth !== 0 && o.hasText) {
              const {
                fontFamily: v
              } = g.style, {
                fontSize: O
              } = o;
              (O !== this._layoutTextLastFontSize || v !== this._layoutTextLastFontFamily) && (this._layoutTextCtx.font = `${O * this._devicePixelRatio}px ${v}`, this._layoutTextLastFontSize = O, this._layoutTextLastFontFamily = v);
              const {
                width: D
              } = this._layoutTextCtx.measureText(g.textContent);
              if (D > 0) {
                const L = this._devicePixelRatio * o.canvasWidth / D;
                this._enhanceTextSelection && (o.scale = L), h = `scaleX(${L})`;
              }
            }
            if (o.angle !== 0 && (h = `rotate(${o.angle}deg) ${h}`), h.length > 0 && (this._enhanceTextSelection && (o.originalTransform = h), g.style.transform = h), o.hasText && this._container.append(g), o.hasEOL) {
              const v = document.createElement("br");
              v.setAttribute("role", "presentation"), this._container.append(v);
            }
          }
          _render(g = 0) {
            const o = (0, e.createPromiseCapability)();
            let h = /* @__PURE__ */ Object.create(null);
            const v = this._document.createElement("canvas");
            if (v.height = v.width = T, this._layoutTextCtx = v.getContext("2d", {
              alpha: !1
            }), this._textContent) {
              const O = this._textContent.items, D = this._textContent.styles;
              this._processItems(O, D), o.resolve();
            } else if (this._textContentStream) {
              const O = () => {
                this._reader.read().then(({
                  value: D,
                  done: L
                }) => {
                  if (L) {
                    o.resolve();
                    return;
                  }
                  Object.assign(h, D.styles), this._processItems(D.items, h), O();
                }, o.reject);
              };
              this._reader = this._textContentStream.getReader(), O();
            } else
              throw new Error('Neither "textContent" nor "textContentStream" parameters specified.');
            o.promise.then(() => {
              h = null, g ? this._renderTimer = setTimeout(() => {
                A(this), this._renderTimer = null;
              }, g) : A(this);
            }, this._capability.reject);
          }
          expandTextDivs(g = !1) {
            if (!this._enhanceTextSelection || !this._renderingDone)
              return;
            this._bounds !== null && (u(this), this._bounds = null);
            const o = [], h = [];
            for (let v = 0, O = this._textDivs.length; v < O; v++) {
              const D = this._textDivs[v], L = this._textDivProperties.get(D);
              !L.hasText || (g ? (o.length = 0, h.length = 0, L.originalTransform && o.push(L.originalTransform), L.paddingTop > 0 ? (h.push(`${L.paddingTop}px`), o.push(`translateY(${-L.paddingTop}px)`)) : h.push(0), L.paddingRight > 0 ? h.push(`${L.paddingRight / L.scale}px`) : h.push(0), L.paddingBottom > 0 ? h.push(`${L.paddingBottom}px`) : h.push(0), L.paddingLeft > 0 ? (h.push(`${L.paddingLeft / L.scale}px`), o.push(`translateX(${-L.paddingLeft / L.scale}px)`)) : h.push(0), D.style.padding = h.join(" "), o.length && (D.style.transform = o.join(" "))) : (D.style.padding = null, D.style.transform = L.originalTransform));
            }
          }
        }
        i.TextLayerRenderTask = l;
        function F(y) {
          const g = new l({
            textContent: y.textContent,
            textContentStream: y.textContentStream,
            container: y.container,
            viewport: y.viewport,
            textDivs: y.textDivs,
            textContentItemsStr: y.textContentItemsStr,
            enhanceTextSelection: y.enhanceTextSelection
          });
          return g._render(y.timeout), g;
        }
      },
      (t, i, r) => {
        Object.defineProperty(i, "__esModule", {
          value: !0
        }), i.SVGGraphics = void 0;
        var e = r(4), d = r(1), C = r(3);
        let T = class {
          constructor() {
            (0, d.unreachable)("Not implemented: SVGGraphics");
          }
        };
        i.SVGGraphics = T;
        {
          let n = function(o) {
            let h = [];
            const v = [];
            for (const O of o) {
              if (O.fn === "save") {
                h.push({
                  fnId: 92,
                  fn: "group",
                  items: []
                }), v.push(h), h = h.at(-1).items;
                continue;
              }
              O.fn === "restore" ? h = v.pop() : h.push(O);
            }
            return h;
          }, a = function(o) {
            if (Number.isInteger(o))
              return o.toString();
            const h = o.toFixed(10);
            let v = h.length - 1;
            if (h[v] !== "0")
              return h;
            do
              v--;
            while (h[v] === "0");
            return h.substring(0, h[v] === "." ? v : v + 1);
          }, l = function(o) {
            if (o[4] === 0 && o[5] === 0) {
              if (o[1] === 0 && o[2] === 0)
                return o[0] === 1 && o[3] === 1 ? "" : `scale(${a(o[0])} ${a(o[3])})`;
              if (o[0] === o[3] && o[1] === -o[2]) {
                const h = Math.acos(o[0]) * 180 / Math.PI;
                return `rotate(${a(h)})`;
              }
            } else if (o[0] === 1 && o[1] === 0 && o[2] === 0 && o[3] === 1)
              return `translate(${a(o[4])} ${a(o[5])})`;
            return `matrix(${a(o[0])} ${a(o[1])} ${a(o[2])} ${a(o[3])} ${a(o[4])} ${a(o[5])})`;
          };
          const I = {
            fontStyle: "normal",
            fontWeight: "normal",
            fillColor: "#000000"
          }, x = "http://www.w3.org/XML/1998/namespace", m = "http://www.w3.org/1999/xlink", S = ["butt", "round", "square"], R = ["miter", "round", "bevel"], A = function(o, h = "", v = !1) {
            if (URL.createObjectURL && typeof Blob < "u" && !v)
              return URL.createObjectURL(new Blob([o], {
                type: h
              }));
            const O = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
            let D = `data:${h};base64,`;
            for (let L = 0, U = o.length; L < U; L += 3) {
              const J = o[L] & 255, V = o[L + 1] & 255, N = o[L + 2] & 255, G = J >> 2, k = (J & 3) << 4 | V >> 4, z = L + 1 < U ? (V & 15) << 2 | N >> 6 : 64, W = L + 2 < U ? N & 63 : 64;
              D += O[G] + O[k] + O[z] + O[W];
            }
            return D;
          }, P = function() {
            const o = new Uint8Array([137, 80, 78, 71, 13, 10, 26, 10]), h = 12, v = new Int32Array(256);
            for (let N = 0; N < 256; N++) {
              let G = N;
              for (let k = 0; k < 8; k++)
                G & 1 ? G = 3988292384 ^ G >> 1 & 2147483647 : G = G >> 1 & 2147483647;
              v[N] = G;
            }
            function O(N, G, k) {
              let z = -1;
              for (let W = G; W < k; W++) {
                const st = (z ^ N[W]) & 255, ot = v[st];
                z = z >>> 8 ^ ot;
              }
              return z ^ -1;
            }
            function D(N, G, k, z) {
              let W = z;
              const st = G.length;
              k[W] = st >> 24 & 255, k[W + 1] = st >> 16 & 255, k[W + 2] = st >> 8 & 255, k[W + 3] = st & 255, W += 4, k[W] = N.charCodeAt(0) & 255, k[W + 1] = N.charCodeAt(1) & 255, k[W + 2] = N.charCodeAt(2) & 255, k[W + 3] = N.charCodeAt(3) & 255, W += 4, k.set(G, W), W += G.length;
              const ot = O(k, z + 4, W);
              k[W] = ot >> 24 & 255, k[W + 1] = ot >> 16 & 255, k[W + 2] = ot >> 8 & 255, k[W + 3] = ot & 255;
            }
            function L(N, G, k) {
              let z = 1, W = 0;
              for (let st = G; st < k; ++st)
                z = (z + (N[st] & 255)) % 65521, W = (W + z) % 65521;
              return W << 16 | z;
            }
            function U(N) {
              if (!C.isNodeJS)
                return J(N);
              try {
                let G;
                parseInt(process.versions.node) >= 8 ? G = N : G = Buffer.from(N);
                const k = require$$5.deflateSync(G, {
                  level: 9
                });
                return k instanceof Uint8Array ? k : new Uint8Array(k);
              } catch (G) {
                (0, d.warn)("Not compressing PNG because zlib.deflateSync is unavailable: " + G);
              }
              return J(N);
            }
            function J(N) {
              let G = N.length;
              const k = 65535, z = Math.ceil(G / k), W = new Uint8Array(2 + G + z * 5 + 4);
              let st = 0;
              W[st++] = 120, W[st++] = 156;
              let ot = 0;
              for (; G > k; )
                W[st++] = 0, W[st++] = 255, W[st++] = 255, W[st++] = 0, W[st++] = 0, W.set(N.subarray(ot, ot + k), st), st += k, ot += k, G -= k;
              W[st++] = 1, W[st++] = G & 255, W[st++] = G >> 8 & 255, W[st++] = ~G & 65535 & 255, W[st++] = (~G & 65535) >> 8 & 255, W.set(N.subarray(ot), st), st += N.length - ot;
              const ct = L(N, 0, N.length);
              return W[st++] = ct >> 24 & 255, W[st++] = ct >> 16 & 255, W[st++] = ct >> 8 & 255, W[st++] = ct & 255, W;
            }
            function V(N, G, k, z) {
              const W = N.width, st = N.height;
              let ot, ct, mt;
              const bt = N.data;
              switch (G) {
                case d.ImageKind.GRAYSCALE_1BPP:
                  ct = 0, ot = 1, mt = W + 7 >> 3;
                  break;
                case d.ImageKind.RGB_24BPP:
                  ct = 2, ot = 8, mt = W * 3;
                  break;
                case d.ImageKind.RGBA_32BPP:
                  ct = 6, ot = 8, mt = W * 4;
                  break;
                default:
                  throw new Error("invalid format");
              }
              const B = new Uint8Array((1 + mt) * st);
              let b = 0, f = 0;
              for (let E = 0; E < st; ++E)
                B[b++] = 0, B.set(bt.subarray(f, f + mt), b), f += mt, b += mt;
              if (G === d.ImageKind.GRAYSCALE_1BPP && z) {
                b = 0;
                for (let E = 0; E < st; E++) {
                  b++;
                  for (let j = 0; j < mt; j++)
                    B[b++] ^= 255;
                }
              }
              const w = new Uint8Array([W >> 24 & 255, W >> 16 & 255, W >> 8 & 255, W & 255, st >> 24 & 255, st >> 16 & 255, st >> 8 & 255, st & 255, ot, ct, 0, 0, 0]), s = U(B), c = o.length + h * 3 + w.length + s.length, p = new Uint8Array(c);
              let _ = 0;
              return p.set(o, _), _ += o.length, D("IHDR", w, p, _), _ += h + w.length, D("IDATA", s, p, _), _ += h + s.length, D("IEND", new Uint8Array(0), p, _), A(p, "image/png", k);
            }
            return function(G, k, z) {
              const W = G.kind === void 0 ? d.ImageKind.GRAYSCALE_1BPP : G.kind;
              return V(G, W, k, z);
            };
          }();
          class u {
            constructor() {
              this.fontSizeScale = 1, this.fontWeight = I.fontWeight, this.fontSize = 0, this.textMatrix = d.IDENTITY_MATRIX, this.fontMatrix = d.FONT_IDENTITY_MATRIX, this.leading = 0, this.textRenderingMode = d.TextRenderingMode.FILL, this.textMatrixScale = 1, this.x = 0, this.y = 0, this.lineX = 0, this.lineY = 0, this.charSpacing = 0, this.wordSpacing = 0, this.textHScale = 1, this.textRise = 0, this.fillColor = I.fillColor, this.strokeColor = "#000000", this.fillAlpha = 1, this.strokeAlpha = 1, this.lineWidth = 1, this.lineJoin = "", this.lineCap = "", this.miterLimit = 0, this.dashArray = [], this.dashPhase = 0, this.dependencies = [], this.activeClipUrl = null, this.clipGroup = null, this.maskId = "";
            }
            clone() {
              return Object.create(this);
            }
            setCurrentPoint(h, v) {
              this.x = h, this.y = v;
            }
          }
          let F = 0, y = 0, g = 0;
          i.SVGGraphics = T = class {
            constructor(o, h, v = !1) {
              (0, e.deprecated)("The SVG back-end is no longer maintained and *may* be removed in the future."), this.svgFactory = new e.DOMSVGFactory(), this.current = new u(), this.transformMatrix = d.IDENTITY_MATRIX, this.transformStack = [], this.extraStack = [], this.commonObjs = o, this.objs = h, this.pendingClip = null, this.pendingEOFill = !1, this.embedFonts = !1, this.embeddedFonts = /* @__PURE__ */ Object.create(null), this.cssStyle = null, this.forceDataSchema = !!v, this._operatorIdMapping = [];
              for (const O in d.OPS)
                this._operatorIdMapping[d.OPS[O]] = O;
            }
            save() {
              this.transformStack.push(this.transformMatrix);
              const o = this.current;
              this.extraStack.push(o), this.current = o.clone();
            }
            restore() {
              this.transformMatrix = this.transformStack.pop(), this.current = this.extraStack.pop(), this.pendingClip = null, this.tgrp = null;
            }
            group(o) {
              this.save(), this.executeOpTree(o), this.restore();
            }
            loadDependencies(o) {
              const h = o.fnArray, v = o.argsArray;
              for (let O = 0, D = h.length; O < D; O++)
                if (h[O] === d.OPS.dependency)
                  for (const L of v[O]) {
                    const U = L.startsWith("g_") ? this.commonObjs : this.objs, J = new Promise((V) => {
                      U.get(L, V);
                    });
                    this.current.dependencies.push(J);
                  }
              return Promise.all(this.current.dependencies);
            }
            transform(o, h, v, O, D, L) {
              const U = [o, h, v, O, D, L];
              this.transformMatrix = d.Util.transform(this.transformMatrix, U), this.tgrp = null;
            }
            getSVG(o, h) {
              this.viewport = h;
              const v = this._initialize(h);
              return this.loadDependencies(o).then(() => (this.transformMatrix = d.IDENTITY_MATRIX, this.executeOpTree(this.convertOpList(o)), v));
            }
            convertOpList(o) {
              const h = this._operatorIdMapping, v = o.argsArray, O = o.fnArray, D = [];
              for (let L = 0, U = O.length; L < U; L++) {
                const J = O[L];
                D.push({
                  fnId: J,
                  fn: h[J],
                  args: v[L]
                });
              }
              return n(D);
            }
            executeOpTree(o) {
              for (const h of o) {
                const v = h.fn, O = h.fnId, D = h.args;
                switch (O | 0) {
                  case d.OPS.beginText:
                    this.beginText();
                    break;
                  case d.OPS.dependency:
                    break;
                  case d.OPS.setLeading:
                    this.setLeading(D);
                    break;
                  case d.OPS.setLeadingMoveText:
                    this.setLeadingMoveText(D[0], D[1]);
                    break;
                  case d.OPS.setFont:
                    this.setFont(D);
                    break;
                  case d.OPS.showText:
                    this.showText(D[0]);
                    break;
                  case d.OPS.showSpacedText:
                    this.showText(D[0]);
                    break;
                  case d.OPS.endText:
                    this.endText();
                    break;
                  case d.OPS.moveText:
                    this.moveText(D[0], D[1]);
                    break;
                  case d.OPS.setCharSpacing:
                    this.setCharSpacing(D[0]);
                    break;
                  case d.OPS.setWordSpacing:
                    this.setWordSpacing(D[0]);
                    break;
                  case d.OPS.setHScale:
                    this.setHScale(D[0]);
                    break;
                  case d.OPS.setTextMatrix:
                    this.setTextMatrix(D[0], D[1], D[2], D[3], D[4], D[5]);
                    break;
                  case d.OPS.setTextRise:
                    this.setTextRise(D[0]);
                    break;
                  case d.OPS.setTextRenderingMode:
                    this.setTextRenderingMode(D[0]);
                    break;
                  case d.OPS.setLineWidth:
                    this.setLineWidth(D[0]);
                    break;
                  case d.OPS.setLineJoin:
                    this.setLineJoin(D[0]);
                    break;
                  case d.OPS.setLineCap:
                    this.setLineCap(D[0]);
                    break;
                  case d.OPS.setMiterLimit:
                    this.setMiterLimit(D[0]);
                    break;
                  case d.OPS.setFillRGBColor:
                    this.setFillRGBColor(D[0], D[1], D[2]);
                    break;
                  case d.OPS.setStrokeRGBColor:
                    this.setStrokeRGBColor(D[0], D[1], D[2]);
                    break;
                  case d.OPS.setStrokeColorN:
                    this.setStrokeColorN(D);
                    break;
                  case d.OPS.setFillColorN:
                    this.setFillColorN(D);
                    break;
                  case d.OPS.shadingFill:
                    this.shadingFill(D[0]);
                    break;
                  case d.OPS.setDash:
                    this.setDash(D[0], D[1]);
                    break;
                  case d.OPS.setRenderingIntent:
                    this.setRenderingIntent(D[0]);
                    break;
                  case d.OPS.setFlatness:
                    this.setFlatness(D[0]);
                    break;
                  case d.OPS.setGState:
                    this.setGState(D[0]);
                    break;
                  case d.OPS.fill:
                    this.fill();
                    break;
                  case d.OPS.eoFill:
                    this.eoFill();
                    break;
                  case d.OPS.stroke:
                    this.stroke();
                    break;
                  case d.OPS.fillStroke:
                    this.fillStroke();
                    break;
                  case d.OPS.eoFillStroke:
                    this.eoFillStroke();
                    break;
                  case d.OPS.clip:
                    this.clip("nonzero");
                    break;
                  case d.OPS.eoClip:
                    this.clip("evenodd");
                    break;
                  case d.OPS.paintSolidColorImageMask:
                    this.paintSolidColorImageMask();
                    break;
                  case d.OPS.paintImageXObject:
                    this.paintImageXObject(D[0]);
                    break;
                  case d.OPS.paintInlineImageXObject:
                    this.paintInlineImageXObject(D[0]);
                    break;
                  case d.OPS.paintImageMaskXObject:
                    this.paintImageMaskXObject(D[0]);
                    break;
                  case d.OPS.paintFormXObjectBegin:
                    this.paintFormXObjectBegin(D[0], D[1]);
                    break;
                  case d.OPS.paintFormXObjectEnd:
                    this.paintFormXObjectEnd();
                    break;
                  case d.OPS.closePath:
                    this.closePath();
                    break;
                  case d.OPS.closeStroke:
                    this.closeStroke();
                    break;
                  case d.OPS.closeFillStroke:
                    this.closeFillStroke();
                    break;
                  case d.OPS.closeEOFillStroke:
                    this.closeEOFillStroke();
                    break;
                  case d.OPS.nextLine:
                    this.nextLine();
                    break;
                  case d.OPS.transform:
                    this.transform(D[0], D[1], D[2], D[3], D[4], D[5]);
                    break;
                  case d.OPS.constructPath:
                    this.constructPath(D[0], D[1]);
                    break;
                  case d.OPS.endPath:
                    this.endPath();
                    break;
                  case 92:
                    this.group(h.items);
                    break;
                  default:
                    (0, d.warn)(`Unimplemented operator ${v}`);
                    break;
                }
              }
            }
            setWordSpacing(o) {
              this.current.wordSpacing = o;
            }
            setCharSpacing(o) {
              this.current.charSpacing = o;
            }
            nextLine() {
              this.moveText(0, this.current.leading);
            }
            setTextMatrix(o, h, v, O, D, L) {
              const U = this.current;
              U.textMatrix = U.lineMatrix = [o, h, v, O, D, L], U.textMatrixScale = Math.hypot(o, h), U.x = U.lineX = 0, U.y = U.lineY = 0, U.xcoords = [], U.ycoords = [], U.tspan = this.svgFactory.createElement("svg:tspan"), U.tspan.setAttributeNS(null, "font-family", U.fontFamily), U.tspan.setAttributeNS(null, "font-size", `${a(U.fontSize)}px`), U.tspan.setAttributeNS(null, "y", a(-U.y)), U.txtElement = this.svgFactory.createElement("svg:text"), U.txtElement.append(U.tspan);
            }
            beginText() {
              const o = this.current;
              o.x = o.lineX = 0, o.y = o.lineY = 0, o.textMatrix = d.IDENTITY_MATRIX, o.lineMatrix = d.IDENTITY_MATRIX, o.textMatrixScale = 1, o.tspan = this.svgFactory.createElement("svg:tspan"), o.txtElement = this.svgFactory.createElement("svg:text"), o.txtgrp = this.svgFactory.createElement("svg:g"), o.xcoords = [], o.ycoords = [];
            }
            moveText(o, h) {
              const v = this.current;
              v.x = v.lineX += o, v.y = v.lineY += h, v.xcoords = [], v.ycoords = [], v.tspan = this.svgFactory.createElement("svg:tspan"), v.tspan.setAttributeNS(null, "font-family", v.fontFamily), v.tspan.setAttributeNS(null, "font-size", `${a(v.fontSize)}px`), v.tspan.setAttributeNS(null, "y", a(-v.y));
            }
            showText(o) {
              const h = this.current, v = h.font, O = h.fontSize;
              if (O === 0)
                return;
              const D = h.fontSizeScale, L = h.charSpacing, U = h.wordSpacing, J = h.fontDirection, V = h.textHScale * J, N = v.vertical, G = N ? 1 : -1, k = v.defaultVMetrics, z = O * h.fontMatrix[0];
              let W = 0;
              for (const ct of o) {
                if (ct === null) {
                  W += J * U;
                  continue;
                } else if (typeof ct == "number") {
                  W += G * ct * O / 1e3;
                  continue;
                }
                const mt = (ct.isSpace ? U : 0) + L, bt = ct.fontChar;
                let B, b, f = ct.width;
                if (N) {
                  let s;
                  const c = ct.vmetric || k;
                  s = ct.vmetric ? c[1] : f * 0.5, s = -s * z;
                  const p = c[2] * z;
                  f = c ? -c[0] : f, B = s / D, b = (W + p) / D;
                } else
                  B = W / D, b = 0;
                (ct.isInFont || v.missingFile) && (h.xcoords.push(h.x + B), N && h.ycoords.push(-h.y + b), h.tspan.textContent += bt);
                let w;
                N ? w = f * z - mt * J : w = f * z + mt * J, W += w;
              }
              h.tspan.setAttributeNS(null, "x", h.xcoords.map(a).join(" ")), N ? h.tspan.setAttributeNS(null, "y", h.ycoords.map(a).join(" ")) : h.tspan.setAttributeNS(null, "y", a(-h.y)), N ? h.y -= W : h.x += W * V, h.tspan.setAttributeNS(null, "font-family", h.fontFamily), h.tspan.setAttributeNS(null, "font-size", `${a(h.fontSize)}px`), h.fontStyle !== I.fontStyle && h.tspan.setAttributeNS(null, "font-style", h.fontStyle), h.fontWeight !== I.fontWeight && h.tspan.setAttributeNS(null, "font-weight", h.fontWeight);
              const st = h.textRenderingMode & d.TextRenderingMode.FILL_STROKE_MASK;
              if (st === d.TextRenderingMode.FILL || st === d.TextRenderingMode.FILL_STROKE ? (h.fillColor !== I.fillColor && h.tspan.setAttributeNS(null, "fill", h.fillColor), h.fillAlpha < 1 && h.tspan.setAttributeNS(null, "fill-opacity", h.fillAlpha)) : h.textRenderingMode === d.TextRenderingMode.ADD_TO_PATH ? h.tspan.setAttributeNS(null, "fill", "transparent") : h.tspan.setAttributeNS(null, "fill", "none"), st === d.TextRenderingMode.STROKE || st === d.TextRenderingMode.FILL_STROKE) {
                const ct = 1 / (h.textMatrixScale || 1);
                this._setStrokeAttributes(h.tspan, ct);
              }
              let ot = h.textMatrix;
              h.textRise !== 0 && (ot = ot.slice(), ot[5] += h.textRise), h.txtElement.setAttributeNS(null, "transform", `${l(ot)} scale(${a(V)}, -1)`), h.txtElement.setAttributeNS(x, "xml:space", "preserve"), h.txtElement.append(h.tspan), h.txtgrp.append(h.txtElement), this._ensureTransformGroup().append(h.txtElement);
            }
            setLeadingMoveText(o, h) {
              this.setLeading(-h), this.moveText(o, h);
            }
            addFontStyle(o) {
              if (!o.data)
                throw new Error('addFontStyle: No font data available, ensure that the "fontExtraProperties" API parameter is set.');
              this.cssStyle || (this.cssStyle = this.svgFactory.createElement("svg:style"), this.cssStyle.setAttributeNS(null, "type", "text/css"), this.defs.append(this.cssStyle));
              const h = A(o.data, o.mimetype, this.forceDataSchema);
              this.cssStyle.textContent += `@font-face { font-family: "${o.loadedName}"; src: url(${h}); }
`;
            }
            setFont(o) {
              const h = this.current, v = this.commonObjs.get(o[0]);
              let O = o[1];
              h.font = v, this.embedFonts && !v.missingFile && !this.embeddedFonts[v.loadedName] && (this.addFontStyle(v), this.embeddedFonts[v.loadedName] = v), h.fontMatrix = v.fontMatrix || d.FONT_IDENTITY_MATRIX;
              let D = "normal";
              v.black ? D = "900" : v.bold && (D = "bold");
              const L = v.italic ? "italic" : "normal";
              O < 0 ? (O = -O, h.fontDirection = -1) : h.fontDirection = 1, h.fontSize = O, h.fontFamily = v.loadedName, h.fontWeight = D, h.fontStyle = L, h.tspan = this.svgFactory.createElement("svg:tspan"), h.tspan.setAttributeNS(null, "y", a(-h.y)), h.xcoords = [], h.ycoords = [];
            }
            endText() {
              var h;
              const o = this.current;
              o.textRenderingMode & d.TextRenderingMode.ADD_TO_PATH_FLAG && ((h = o.txtElement) == null ? void 0 : h.hasChildNodes()) && (o.element = o.txtElement, this.clip("nonzero"), this.endPath());
            }
            setLineWidth(o) {
              o > 0 && (this.current.lineWidth = o);
            }
            setLineCap(o) {
              this.current.lineCap = S[o];
            }
            setLineJoin(o) {
              this.current.lineJoin = R[o];
            }
            setMiterLimit(o) {
              this.current.miterLimit = o;
            }
            setStrokeAlpha(o) {
              this.current.strokeAlpha = o;
            }
            setStrokeRGBColor(o, h, v) {
              this.current.strokeColor = d.Util.makeHexColor(o, h, v);
            }
            setFillAlpha(o) {
              this.current.fillAlpha = o;
            }
            setFillRGBColor(o, h, v) {
              this.current.fillColor = d.Util.makeHexColor(o, h, v), this.current.tspan = this.svgFactory.createElement("svg:tspan"), this.current.xcoords = [], this.current.ycoords = [];
            }
            setStrokeColorN(o) {
              this.current.strokeColor = this._makeColorN_Pattern(o);
            }
            setFillColorN(o) {
              this.current.fillColor = this._makeColorN_Pattern(o);
            }
            shadingFill(o) {
              const h = this.viewport.width, v = this.viewport.height, O = d.Util.inverseTransform(this.transformMatrix), D = d.Util.applyTransform([0, 0], O), L = d.Util.applyTransform([0, v], O), U = d.Util.applyTransform([h, 0], O), J = d.Util.applyTransform([h, v], O), V = Math.min(D[0], L[0], U[0], J[0]), N = Math.min(D[1], L[1], U[1], J[1]), G = Math.max(D[0], L[0], U[0], J[0]), k = Math.max(D[1], L[1], U[1], J[1]), z = this.svgFactory.createElement("svg:rect");
              z.setAttributeNS(null, "x", V), z.setAttributeNS(null, "y", N), z.setAttributeNS(null, "width", G - V), z.setAttributeNS(null, "height", k - N), z.setAttributeNS(null, "fill", this._makeShadingPattern(o)), this.current.fillAlpha < 1 && z.setAttributeNS(null, "fill-opacity", this.current.fillAlpha), this._ensureTransformGroup().append(z);
            }
            _makeColorN_Pattern(o) {
              return o[0] === "TilingPattern" ? this._makeTilingPattern(o) : this._makeShadingPattern(o);
            }
            _makeTilingPattern(o) {
              const h = o[1], v = o[2], O = o[3] || d.IDENTITY_MATRIX, [D, L, U, J] = o[4], V = o[5], N = o[6], G = o[7], k = `shading${g++}`, [z, W, st, ot] = d.Util.normalizeRect([...d.Util.applyTransform([D, L], O), ...d.Util.applyTransform([U, J], O)]), [ct, mt] = d.Util.singularValueDecompose2dScale(O), bt = V * ct, B = N * mt, b = this.svgFactory.createElement("svg:pattern");
              b.setAttributeNS(null, "id", k), b.setAttributeNS(null, "patternUnits", "userSpaceOnUse"), b.setAttributeNS(null, "width", bt), b.setAttributeNS(null, "height", B), b.setAttributeNS(null, "x", `${z}`), b.setAttributeNS(null, "y", `${W}`);
              const f = this.svg, w = this.transformMatrix, s = this.current.fillColor, c = this.current.strokeColor, p = this.svgFactory.create(st - z, ot - W);
              if (this.svg = p, this.transformMatrix = O, G === 2) {
                const _ = d.Util.makeHexColor(...h);
                this.current.fillColor = _, this.current.strokeColor = _;
              }
              return this.executeOpTree(this.convertOpList(v)), this.svg = f, this.transformMatrix = w, this.current.fillColor = s, this.current.strokeColor = c, b.append(p.childNodes[0]), this.defs.append(b), `url(#${k})`;
            }
            _makeShadingPattern(o) {
              switch (typeof o == "string" && (o = this.objs.get(o)), o[0]) {
                case "RadialAxial":
                  const h = `shading${g++}`, v = o[3];
                  let O;
                  switch (o[1]) {
                    case "axial":
                      const D = o[4], L = o[5];
                      O = this.svgFactory.createElement("svg:linearGradient"), O.setAttributeNS(null, "id", h), O.setAttributeNS(null, "gradientUnits", "userSpaceOnUse"), O.setAttributeNS(null, "x1", D[0]), O.setAttributeNS(null, "y1", D[1]), O.setAttributeNS(null, "x2", L[0]), O.setAttributeNS(null, "y2", L[1]);
                      break;
                    case "radial":
                      const U = o[4], J = o[5], V = o[6], N = o[7];
                      O = this.svgFactory.createElement("svg:radialGradient"), O.setAttributeNS(null, "id", h), O.setAttributeNS(null, "gradientUnits", "userSpaceOnUse"), O.setAttributeNS(null, "cx", J[0]), O.setAttributeNS(null, "cy", J[1]), O.setAttributeNS(null, "r", N), O.setAttributeNS(null, "fx", U[0]), O.setAttributeNS(null, "fy", U[1]), O.setAttributeNS(null, "fr", V);
                      break;
                    default:
                      throw new Error(`Unknown RadialAxial type: ${o[1]}`);
                  }
                  for (const D of v) {
                    const L = this.svgFactory.createElement("svg:stop");
                    L.setAttributeNS(null, "offset", D[0]), L.setAttributeNS(null, "stop-color", D[1]), O.append(L);
                  }
                  return this.defs.append(O), `url(#${h})`;
                case "Mesh":
                  return (0, d.warn)("Unimplemented pattern Mesh"), null;
                case "Dummy":
                  return "hotpink";
                default:
                  throw new Error(`Unknown IR type: ${o[0]}`);
              }
            }
            setDash(o, h) {
              this.current.dashArray = o, this.current.dashPhase = h;
            }
            constructPath(o, h) {
              const v = this.current;
              let O = v.x, D = v.y, L = [], U = 0;
              for (const J of o)
                switch (J | 0) {
                  case d.OPS.rectangle:
                    O = h[U++], D = h[U++];
                    const V = h[U++], N = h[U++], G = O + V, k = D + N;
                    L.push("M", a(O), a(D), "L", a(G), a(D), "L", a(G), a(k), "L", a(O), a(k), "Z");
                    break;
                  case d.OPS.moveTo:
                    O = h[U++], D = h[U++], L.push("M", a(O), a(D));
                    break;
                  case d.OPS.lineTo:
                    O = h[U++], D = h[U++], L.push("L", a(O), a(D));
                    break;
                  case d.OPS.curveTo:
                    O = h[U + 4], D = h[U + 5], L.push("C", a(h[U]), a(h[U + 1]), a(h[U + 2]), a(h[U + 3]), a(O), a(D)), U += 6;
                    break;
                  case d.OPS.curveTo2:
                    L.push("C", a(O), a(D), a(h[U]), a(h[U + 1]), a(h[U + 2]), a(h[U + 3])), O = h[U + 2], D = h[U + 3], U += 4;
                    break;
                  case d.OPS.curveTo3:
                    O = h[U + 2], D = h[U + 3], L.push("C", a(h[U]), a(h[U + 1]), a(O), a(D), a(O), a(D)), U += 4;
                    break;
                  case d.OPS.closePath:
                    L.push("Z");
                    break;
                }
              L = L.join(" "), v.path && o.length > 0 && o[0] !== d.OPS.rectangle && o[0] !== d.OPS.moveTo ? L = v.path.getAttributeNS(null, "d") + L : (v.path = this.svgFactory.createElement("svg:path"), this._ensureTransformGroup().append(v.path)), v.path.setAttributeNS(null, "d", L), v.path.setAttributeNS(null, "fill", "none"), v.element = v.path, v.setCurrentPoint(O, D);
            }
            endPath() {
              const o = this.current;
              if (o.path = null, !this.pendingClip)
                return;
              if (!o.element) {
                this.pendingClip = null;
                return;
              }
              const h = `clippath${F++}`, v = this.svgFactory.createElement("svg:clipPath");
              v.setAttributeNS(null, "id", h), v.setAttributeNS(null, "transform", l(this.transformMatrix));
              const O = o.element.cloneNode(!0);
              if (this.pendingClip === "evenodd" ? O.setAttributeNS(null, "clip-rule", "evenodd") : O.setAttributeNS(null, "clip-rule", "nonzero"), this.pendingClip = null, v.append(O), this.defs.append(v), o.activeClipUrl) {
                o.clipGroup = null;
                for (const D of this.extraStack)
                  D.clipGroup = null;
                v.setAttributeNS(null, "clip-path", o.activeClipUrl);
              }
              o.activeClipUrl = `url(#${h})`, this.tgrp = null;
            }
            clip(o) {
              this.pendingClip = o;
            }
            closePath() {
              const o = this.current;
              if (o.path) {
                const h = `${o.path.getAttributeNS(null, "d")}Z`;
                o.path.setAttributeNS(null, "d", h);
              }
            }
            setLeading(o) {
              this.current.leading = -o;
            }
            setTextRise(o) {
              this.current.textRise = o;
            }
            setTextRenderingMode(o) {
              this.current.textRenderingMode = o;
            }
            setHScale(o) {
              this.current.textHScale = o / 100;
            }
            setRenderingIntent(o) {
            }
            setFlatness(o) {
            }
            setGState(o) {
              for (const [h, v] of o)
                switch (h) {
                  case "LW":
                    this.setLineWidth(v);
                    break;
                  case "LC":
                    this.setLineCap(v);
                    break;
                  case "LJ":
                    this.setLineJoin(v);
                    break;
                  case "ML":
                    this.setMiterLimit(v);
                    break;
                  case "D":
                    this.setDash(v[0], v[1]);
                    break;
                  case "RI":
                    this.setRenderingIntent(v);
                    break;
                  case "FL":
                    this.setFlatness(v);
                    break;
                  case "Font":
                    this.setFont(v);
                    break;
                  case "CA":
                    this.setStrokeAlpha(v);
                    break;
                  case "ca":
                    this.setFillAlpha(v);
                    break;
                  default:
                    (0, d.warn)(`Unimplemented graphic state operator ${h}`);
                    break;
                }
            }
            fill() {
              const o = this.current;
              o.element && (o.element.setAttributeNS(null, "fill", o.fillColor), o.element.setAttributeNS(null, "fill-opacity", o.fillAlpha), this.endPath());
            }
            stroke() {
              const o = this.current;
              o.element && (this._setStrokeAttributes(o.element), o.element.setAttributeNS(null, "fill", "none"), this.endPath());
            }
            _setStrokeAttributes(o, h = 1) {
              const v = this.current;
              let O = v.dashArray;
              h !== 1 && O.length > 0 && (O = O.map(function(D) {
                return h * D;
              })), o.setAttributeNS(null, "stroke", v.strokeColor), o.setAttributeNS(null, "stroke-opacity", v.strokeAlpha), o.setAttributeNS(null, "stroke-miterlimit", a(v.miterLimit)), o.setAttributeNS(null, "stroke-linecap", v.lineCap), o.setAttributeNS(null, "stroke-linejoin", v.lineJoin), o.setAttributeNS(null, "stroke-width", a(h * v.lineWidth) + "px"), o.setAttributeNS(null, "stroke-dasharray", O.map(a).join(" ")), o.setAttributeNS(null, "stroke-dashoffset", a(h * v.dashPhase) + "px");
            }
            eoFill() {
              this.current.element && this.current.element.setAttributeNS(null, "fill-rule", "evenodd"), this.fill();
            }
            fillStroke() {
              this.stroke(), this.fill();
            }
            eoFillStroke() {
              this.current.element && this.current.element.setAttributeNS(null, "fill-rule", "evenodd"), this.fillStroke();
            }
            closeStroke() {
              this.closePath(), this.stroke();
            }
            closeFillStroke() {
              this.closePath(), this.fillStroke();
            }
            closeEOFillStroke() {
              this.closePath(), this.eoFillStroke();
            }
            paintSolidColorImageMask() {
              const o = this.svgFactory.createElement("svg:rect");
              o.setAttributeNS(null, "x", "0"), o.setAttributeNS(null, "y", "0"), o.setAttributeNS(null, "width", "1px"), o.setAttributeNS(null, "height", "1px"), o.setAttributeNS(null, "fill", this.current.fillColor), this._ensureTransformGroup().append(o);
            }
            paintImageXObject(o) {
              const h = o.startsWith("g_") ? this.commonObjs.get(o) : this.objs.get(o);
              if (!h) {
                (0, d.warn)(`Dependent image with object ID ${o} is not ready yet`);
                return;
              }
              this.paintInlineImageXObject(h);
            }
            paintInlineImageXObject(o, h) {
              const v = o.width, O = o.height, D = P(o, this.forceDataSchema, !!h), L = this.svgFactory.createElement("svg:rect");
              L.setAttributeNS(null, "x", "0"), L.setAttributeNS(null, "y", "0"), L.setAttributeNS(null, "width", a(v)), L.setAttributeNS(null, "height", a(O)), this.current.element = L, this.clip("nonzero");
              const U = this.svgFactory.createElement("svg:image");
              U.setAttributeNS(m, "xlink:href", D), U.setAttributeNS(null, "x", "0"), U.setAttributeNS(null, "y", a(-O)), U.setAttributeNS(null, "width", a(v) + "px"), U.setAttributeNS(null, "height", a(O) + "px"), U.setAttributeNS(null, "transform", `scale(${a(1 / v)} ${a(-1 / O)})`), h ? h.append(U) : this._ensureTransformGroup().append(U);
            }
            paintImageMaskXObject(o) {
              const h = this.current, v = o.width, O = o.height, D = h.fillColor;
              h.maskId = `mask${y++}`;
              const L = this.svgFactory.createElement("svg:mask");
              L.setAttributeNS(null, "id", h.maskId);
              const U = this.svgFactory.createElement("svg:rect");
              U.setAttributeNS(null, "x", "0"), U.setAttributeNS(null, "y", "0"), U.setAttributeNS(null, "width", a(v)), U.setAttributeNS(null, "height", a(O)), U.setAttributeNS(null, "fill", D), U.setAttributeNS(null, "mask", `url(#${h.maskId})`), this.defs.append(L), this._ensureTransformGroup().append(U), this.paintInlineImageXObject(o, L);
            }
            paintFormXObjectBegin(o, h) {
              if (Array.isArray(o) && o.length === 6 && this.transform(o[0], o[1], o[2], o[3], o[4], o[5]), h) {
                const v = h[2] - h[0], O = h[3] - h[1], D = this.svgFactory.createElement("svg:rect");
                D.setAttributeNS(null, "x", h[0]), D.setAttributeNS(null, "y", h[1]), D.setAttributeNS(null, "width", a(v)), D.setAttributeNS(null, "height", a(O)), this.current.element = D, this.clip("nonzero"), this.endPath();
              }
            }
            paintFormXObjectEnd() {
            }
            _initialize(o) {
              const h = this.svgFactory.create(o.width, o.height), v = this.svgFactory.createElement("svg:defs");
              h.append(v), this.defs = v;
              const O = this.svgFactory.createElement("svg:g");
              return O.setAttributeNS(null, "transform", l(o.transform)), h.append(O), this.svg = O, h;
            }
            _ensureClipGroup() {
              if (!this.current.clipGroup) {
                const o = this.svgFactory.createElement("svg:g");
                o.setAttributeNS(null, "clip-path", this.current.activeClipUrl), this.svg.append(o), this.current.clipGroup = o;
              }
              return this.current.clipGroup;
            }
            _ensureTransformGroup() {
              return this.tgrp || (this.tgrp = this.svgFactory.createElement("svg:g"), this.tgrp.setAttributeNS(null, "transform", l(this.transformMatrix)), this.current.activeClipUrl ? this._ensureClipGroup().append(this.tgrp) : this.svg.append(this.tgrp)), this.tgrp;
            }
          };
        }
      },
      (t, i, r) => {
        Object.defineProperty(i, "__esModule", {
          value: !0
        }), i.PDFNodeStream = void 0;
        var e = r(1), d = r(33);
        const C = require$$5, T = require$$5, I = require$$5, x = require$$5, m = /^file:\/\/\/[a-zA-Z]:\//;
        function S(y) {
          const g = x.parse(y);
          return g.protocol === "file:" || g.host ? g : /^[a-z]:[/\\]/i.test(y) ? x.parse(`file:///${y}`) : (g.host || (g.protocol = "file:"), g);
        }
        class R {
          constructor(g) {
            this.source = g, this.url = S(g.url), this.isHttp = this.url.protocol === "http:" || this.url.protocol === "https:", this.isFsUrl = this.url.protocol === "file:", this.httpHeaders = this.isHttp && g.httpHeaders || {}, this._fullRequestReader = null, this._rangeRequestReaders = [];
          }
          get _progressiveDataLength() {
            var g, o;
            return (o = (g = this._fullRequestReader) == null ? void 0 : g._loaded) != null ? o : 0;
          }
          getFullReader() {
            return (0, e.assert)(!this._fullRequestReader, "PDFNodeStream.getFullReader can only be called once."), this._fullRequestReader = this.isFsUrl ? new l(this) : new n(this), this._fullRequestReader;
          }
          getRangeReader(g, o) {
            if (o <= this._progressiveDataLength)
              return null;
            const h = this.isFsUrl ? new F(this, g, o) : new a(this, g, o);
            return this._rangeRequestReaders.push(h), h;
          }
          cancelAllRequests(g) {
            this._fullRequestReader && this._fullRequestReader.cancel(g);
            for (const o of this._rangeRequestReaders.slice(0))
              o.cancel(g);
          }
        }
        i.PDFNodeStream = R;
        class A {
          constructor(g) {
            this._url = g.url, this._done = !1, this._storedError = null, this.onProgress = null;
            const o = g.source;
            this._contentLength = o.length, this._loaded = 0, this._filename = null, this._disableRange = o.disableRange || !1, this._rangeChunkSize = o.rangeChunkSize, !this._rangeChunkSize && !this._disableRange && (this._disableRange = !0), this._isStreamingSupported = !o.disableStream, this._isRangeSupported = !o.disableRange, this._readableStream = null, this._readCapability = (0, e.createPromiseCapability)(), this._headersCapability = (0, e.createPromiseCapability)();
          }
          get headersReady() {
            return this._headersCapability.promise;
          }
          get filename() {
            return this._filename;
          }
          get contentLength() {
            return this._contentLength;
          }
          get isRangeSupported() {
            return this._isRangeSupported;
          }
          get isStreamingSupported() {
            return this._isStreamingSupported;
          }
          async read() {
            if (await this._readCapability.promise, this._done)
              return {
                value: void 0,
                done: !0
              };
            if (this._storedError)
              throw this._storedError;
            const g = this._readableStream.read();
            return g === null ? (this._readCapability = (0, e.createPromiseCapability)(), this.read()) : (this._loaded += g.length, this.onProgress && this.onProgress({
              loaded: this._loaded,
              total: this._contentLength
            }), {
              value: new Uint8Array(g).buffer,
              done: !1
            });
          }
          cancel(g) {
            if (!this._readableStream) {
              this._error(g);
              return;
            }
            this._readableStream.destroy(g);
          }
          _error(g) {
            this._storedError = g, this._readCapability.resolve();
          }
          _setReadableStream(g) {
            this._readableStream = g, g.on("readable", () => {
              this._readCapability.resolve();
            }), g.on("end", () => {
              g.destroy(), this._done = !0, this._readCapability.resolve();
            }), g.on("error", (o) => {
              this._error(o);
            }), !this._isStreamingSupported && this._isRangeSupported && this._error(new e.AbortException("streaming is disabled")), this._storedError && this._readableStream.destroy(this._storedError);
          }
        }
        class P {
          constructor(g) {
            this._url = g.url, this._done = !1, this._storedError = null, this.onProgress = null, this._loaded = 0, this._readableStream = null, this._readCapability = (0, e.createPromiseCapability)();
            const o = g.source;
            this._isStreamingSupported = !o.disableStream;
          }
          get isStreamingSupported() {
            return this._isStreamingSupported;
          }
          async read() {
            if (await this._readCapability.promise, this._done)
              return {
                value: void 0,
                done: !0
              };
            if (this._storedError)
              throw this._storedError;
            const g = this._readableStream.read();
            return g === null ? (this._readCapability = (0, e.createPromiseCapability)(), this.read()) : (this._loaded += g.length, this.onProgress && this.onProgress({
              loaded: this._loaded
            }), {
              value: new Uint8Array(g).buffer,
              done: !1
            });
          }
          cancel(g) {
            if (!this._readableStream) {
              this._error(g);
              return;
            }
            this._readableStream.destroy(g);
          }
          _error(g) {
            this._storedError = g, this._readCapability.resolve();
          }
          _setReadableStream(g) {
            this._readableStream = g, g.on("readable", () => {
              this._readCapability.resolve();
            }), g.on("end", () => {
              g.destroy(), this._done = !0, this._readCapability.resolve();
            }), g.on("error", (o) => {
              this._error(o);
            }), this._storedError && this._readableStream.destroy(this._storedError);
          }
        }
        function u(y, g) {
          return {
            protocol: y.protocol,
            auth: y.auth,
            host: y.hostname,
            port: y.port,
            path: y.path,
            method: "GET",
            headers: g
          };
        }
        class n extends A {
          constructor(g) {
            super(g);
            const o = (h) => {
              if (h.statusCode === 404) {
                const L = new e.MissingPDFException(`Missing PDF "${this._url}".`);
                this._storedError = L, this._headersCapability.reject(L);
                return;
              }
              this._headersCapability.resolve(), this._setReadableStream(h);
              const v = (L) => this._readableStream.headers[L.toLowerCase()], {
                allowRangeRequests: O,
                suggestedLength: D
              } = (0, d.validateRangeRequestCapabilities)({
                getResponseHeader: v,
                isHttp: g.isHttp,
                rangeChunkSize: this._rangeChunkSize,
                disableRange: this._disableRange
              });
              this._isRangeSupported = O, this._contentLength = D || this._contentLength, this._filename = (0, d.extractFilenameFromHeader)(v);
            };
            this._request = null, this._url.protocol === "http:" ? this._request = T.request(u(this._url, g.httpHeaders), o) : this._request = I.request(u(this._url, g.httpHeaders), o), this._request.on("error", (h) => {
              this._storedError = h, this._headersCapability.reject(h);
            }), this._request.end();
          }
        }
        class a extends P {
          constructor(g, o, h) {
            super(g), this._httpHeaders = {};
            for (const O in g.httpHeaders) {
              const D = g.httpHeaders[O];
              typeof D > "u" || (this._httpHeaders[O] = D);
            }
            this._httpHeaders.Range = `bytes=${o}-${h - 1}`;
            const v = (O) => {
              if (O.statusCode === 404) {
                const D = new e.MissingPDFException(`Missing PDF "${this._url}".`);
                this._storedError = D;
                return;
              }
              this._setReadableStream(O);
            };
            this._request = null, this._url.protocol === "http:" ? this._request = T.request(u(this._url, this._httpHeaders), v) : this._request = I.request(u(this._url, this._httpHeaders), v), this._request.on("error", (O) => {
              this._storedError = O;
            }), this._request.end();
          }
        }
        class l extends A {
          constructor(g) {
            super(g);
            let o = decodeURIComponent(this._url.path);
            m.test(this._url.href) && (o = o.replace(/^\//, "")), C.lstat(o, (h, v) => {
              if (h) {
                h.code === "ENOENT" && (h = new e.MissingPDFException(`Missing PDF "${o}".`)), this._storedError = h, this._headersCapability.reject(h);
                return;
              }
              this._contentLength = v.size, this._setReadableStream(C.createReadStream(o)), this._headersCapability.resolve();
            });
          }
        }
        class F extends P {
          constructor(g, o, h) {
            super(g);
            let v = decodeURIComponent(this._url.path);
            m.test(this._url.href) && (v = v.replace(/^\//, "")), this._setReadableStream(C.createReadStream(v, {
              start: o,
              end: h - 1
            }));
          }
        }
      },
      (t, i, r) => {
        Object.defineProperty(i, "__esModule", {
          value: !0
        }), i.createResponseStatusError = x, i.extractFilenameFromHeader = I, i.validateRangeRequestCapabilities = T, i.validateResponseStatus = m;
        var e = r(1), d = r(34), C = r(4);
        function T({
          getResponseHeader: S,
          isHttp: R,
          rangeChunkSize: A,
          disableRange: P
        }) {
          const u = {
            allowRangeRequests: !1,
            suggestedLength: void 0
          }, n = parseInt(S("Content-Length"), 10);
          return !Number.isInteger(n) || (u.suggestedLength = n, n <= 2 * A) || P || !R || S("Accept-Ranges") !== "bytes" || (S("Content-Encoding") || "identity") !== "identity" || (u.allowRangeRequests = !0), u;
        }
        function I(S) {
          const R = S("Content-Disposition");
          if (R) {
            let A = (0, d.getFilenameFromContentDispositionHeader)(R);
            if (A.includes("%"))
              try {
                A = decodeURIComponent(A);
              } catch {
              }
            if ((0, C.isPdfFile)(A))
              return A;
          }
          return null;
        }
        function x(S, R) {
          return S === 404 || S === 0 && R.startsWith("file:") ? new e.MissingPDFException('Missing PDF "' + R + '".') : new e.UnexpectedResponseException(`Unexpected server response (${S}) while retrieving PDF "${R}".`, S);
        }
        function m(S) {
          return S === 200 || S === 206;
        }
      },
      (t, i, r) => {
        Object.defineProperty(i, "__esModule", {
          value: !0
        }), i.getFilenameFromContentDispositionHeader = d;
        var e = r(1);
        function d(C) {
          let T = !0, I = x("filename\\*", "i").exec(C);
          if (I) {
            I = I[1];
            let n = A(I);
            return n = unescape(n), n = P(n), n = u(n), S(n);
          }
          if (I = R(C), I) {
            const n = u(I);
            return S(n);
          }
          if (I = x("filename", "i").exec(C), I) {
            I = I[1];
            let n = A(I);
            return n = u(n), S(n);
          }
          function x(n, a) {
            return new RegExp("(?:^|;)\\s*" + n + '\\s*=\\s*([^";\\s][^;\\s]*|"(?:[^"\\\\]|\\\\"?)+"?)', a);
          }
          function m(n, a) {
            if (n) {
              if (!/^[\x00-\xFF]+$/.test(a))
                return a;
              try {
                const l = new TextDecoder(n, {
                  fatal: !0
                }), F = (0, e.stringToBytes)(a);
                a = l.decode(F), T = !1;
              } catch {
              }
            }
            return a;
          }
          function S(n) {
            return T && /[\x80-\xff]/.test(n) && (n = m("utf-8", n), T && (n = m("iso-8859-1", n))), n;
          }
          function R(n) {
            const a = [];
            let l;
            const F = x("filename\\*((?!0\\d)\\d+)(\\*?)", "ig");
            for (; (l = F.exec(n)) !== null; ) {
              let [, g, o, h] = l;
              if (g = parseInt(g, 10), g in a) {
                if (g === 0)
                  break;
                continue;
              }
              a[g] = [o, h];
            }
            const y = [];
            for (let g = 0; g < a.length && g in a; ++g) {
              let [o, h] = a[g];
              h = A(h), o && (h = unescape(h), g === 0 && (h = P(h))), y.push(h);
            }
            return y.join("");
          }
          function A(n) {
            if (n.startsWith('"')) {
              const a = n.slice(1).split('\\"');
              for (let l = 0; l < a.length; ++l) {
                const F = a[l].indexOf('"');
                F !== -1 && (a[l] = a[l].slice(0, F), a.length = l + 1), a[l] = a[l].replace(/\\(.)/g, "$1");
              }
              n = a.join('"');
            }
            return n;
          }
          function P(n) {
            const a = n.indexOf("'");
            if (a === -1)
              return n;
            const l = n.slice(0, a), y = n.slice(a + 1).replace(/^[^']*'/, "");
            return m(l, y);
          }
          function u(n) {
            return !n.startsWith("=?") || /[\x00-\x19\x80-\xff]/.test(n) ? n : n.replace(/=\?([\w-]*)\?([QqBb])\?((?:[^?]|\?(?!=))*)\?=/g, function(a, l, F, y) {
              if (F === "q" || F === "Q")
                return y = y.replace(/_/g, " "), y = y.replace(/=([0-9a-fA-F]{2})/g, function(g, o) {
                  return String.fromCharCode(parseInt(o, 16));
                }), m(l, y);
              try {
                y = atob(y);
              } catch {
              }
              return m(l, y);
            });
          }
          return "";
        }
      },
      (t, i, r) => {
        Object.defineProperty(i, "__esModule", {
          value: !0
        }), i.PDFNetworkStream = void 0;
        var e = r(1), d = r(33);
        const C = 200, T = 206;
        function I(A) {
          const P = A.response;
          return typeof P != "string" ? P : (0, e.stringToBytes)(P).buffer;
        }
        class x {
          constructor(P, u = {}) {
            this.url = P, this.isHttp = /^https?:/i.test(P), this.httpHeaders = this.isHttp && u.httpHeaders || /* @__PURE__ */ Object.create(null), this.withCredentials = u.withCredentials || !1, this.getXhr = u.getXhr || function() {
              return new XMLHttpRequest();
            }, this.currXhrId = 0, this.pendingRequests = /* @__PURE__ */ Object.create(null);
          }
          requestRange(P, u, n) {
            const a = {
              begin: P,
              end: u
            };
            for (const l in n)
              a[l] = n[l];
            return this.request(a);
          }
          requestFull(P) {
            return this.request(P);
          }
          request(P) {
            const u = this.getXhr(), n = this.currXhrId++, a = this.pendingRequests[n] = {
              xhr: u
            };
            u.open("GET", this.url), u.withCredentials = this.withCredentials;
            for (const l in this.httpHeaders) {
              const F = this.httpHeaders[l];
              typeof F > "u" || u.setRequestHeader(l, F);
            }
            return this.isHttp && "begin" in P && "end" in P ? (u.setRequestHeader("Range", `bytes=${P.begin}-${P.end - 1}`), a.expectedStatus = T) : a.expectedStatus = C, u.responseType = "arraybuffer", P.onError && (u.onerror = function(l) {
              P.onError(u.status);
            }), u.onreadystatechange = this.onStateChange.bind(this, n), u.onprogress = this.onProgress.bind(this, n), a.onHeadersReceived = P.onHeadersReceived, a.onDone = P.onDone, a.onError = P.onError, a.onProgress = P.onProgress, u.send(null), n;
          }
          onProgress(P, u) {
            var a;
            const n = this.pendingRequests[P];
            !n || (a = n.onProgress) == null || a.call(n, u);
          }
          onStateChange(P, u) {
            var g, o, h;
            const n = this.pendingRequests[P];
            if (!n)
              return;
            const a = n.xhr;
            if (a.readyState >= 2 && n.onHeadersReceived && (n.onHeadersReceived(), delete n.onHeadersReceived), a.readyState !== 4 || !(P in this.pendingRequests))
              return;
            if (delete this.pendingRequests[P], a.status === 0 && this.isHttp) {
              (g = n.onError) == null || g.call(n, a.status);
              return;
            }
            const l = a.status || C;
            if (!(l === C && n.expectedStatus === T) && l !== n.expectedStatus) {
              (o = n.onError) == null || o.call(n, a.status);
              return;
            }
            const y = I(a);
            if (l === T) {
              const v = a.getResponseHeader("Content-Range"), O = /bytes (\d+)-(\d+)\/(\d+)/.exec(v);
              n.onDone({
                begin: parseInt(O[1], 10),
                chunk: y
              });
            } else
              y ? n.onDone({
                begin: 0,
                chunk: y
              }) : (h = n.onError) == null || h.call(n, a.status);
          }
          getRequestXhr(P) {
            return this.pendingRequests[P].xhr;
          }
          isPendingRequest(P) {
            return P in this.pendingRequests;
          }
          abortRequest(P) {
            const u = this.pendingRequests[P].xhr;
            delete this.pendingRequests[P], u.abort();
          }
        }
        class m {
          constructor(P) {
            this._source = P, this._manager = new x(P.url, {
              httpHeaders: P.httpHeaders,
              withCredentials: P.withCredentials
            }), this._rangeChunkSize = P.rangeChunkSize, this._fullRequestReader = null, this._rangeRequestReaders = [];
          }
          _onRangeRequestReaderClosed(P) {
            const u = this._rangeRequestReaders.indexOf(P);
            u >= 0 && this._rangeRequestReaders.splice(u, 1);
          }
          getFullReader() {
            return (0, e.assert)(!this._fullRequestReader, "PDFNetworkStream.getFullReader can only be called once."), this._fullRequestReader = new S(this._manager, this._source), this._fullRequestReader;
          }
          getRangeReader(P, u) {
            const n = new R(this._manager, P, u);
            return n.onClosed = this._onRangeRequestReaderClosed.bind(this), this._rangeRequestReaders.push(n), n;
          }
          cancelAllRequests(P) {
            var u;
            (u = this._fullRequestReader) == null || u.cancel(P);
            for (const n of this._rangeRequestReaders.slice(0))
              n.cancel(P);
          }
        }
        i.PDFNetworkStream = m;
        class S {
          constructor(P, u) {
            this._manager = P;
            const n = {
              onHeadersReceived: this._onHeadersReceived.bind(this),
              onDone: this._onDone.bind(this),
              onError: this._onError.bind(this),
              onProgress: this._onProgress.bind(this)
            };
            this._url = u.url, this._fullRequestId = P.requestFull(n), this._headersReceivedCapability = (0, e.createPromiseCapability)(), this._disableRange = u.disableRange || !1, this._contentLength = u.length, this._rangeChunkSize = u.rangeChunkSize, !this._rangeChunkSize && !this._disableRange && (this._disableRange = !0), this._isStreamingSupported = !1, this._isRangeSupported = !1, this._cachedChunks = [], this._requests = [], this._done = !1, this._storedError = void 0, this._filename = null, this.onProgress = null;
          }
          _onHeadersReceived() {
            const P = this._fullRequestId, u = this._manager.getRequestXhr(P), n = (F) => u.getResponseHeader(F), {
              allowRangeRequests: a,
              suggestedLength: l
            } = (0, d.validateRangeRequestCapabilities)({
              getResponseHeader: n,
              isHttp: this._manager.isHttp,
              rangeChunkSize: this._rangeChunkSize,
              disableRange: this._disableRange
            });
            a && (this._isRangeSupported = !0), this._contentLength = l || this._contentLength, this._filename = (0, d.extractFilenameFromHeader)(n), this._isRangeSupported && this._manager.abortRequest(P), this._headersReceivedCapability.resolve();
          }
          _onDone(P) {
            if (P && (this._requests.length > 0 ? this._requests.shift().resolve({
              value: P.chunk,
              done: !1
            }) : this._cachedChunks.push(P.chunk)), this._done = !0, !(this._cachedChunks.length > 0)) {
              for (const u of this._requests)
                u.resolve({
                  value: void 0,
                  done: !0
                });
              this._requests.length = 0;
            }
          }
          _onError(P) {
            this._storedError = (0, d.createResponseStatusError)(P, this._url), this._headersReceivedCapability.reject(this._storedError);
            for (const u of this._requests)
              u.reject(this._storedError);
            this._requests.length = 0, this._cachedChunks.length = 0;
          }
          _onProgress(P) {
            var u;
            (u = this.onProgress) == null || u.call(this, {
              loaded: P.loaded,
              total: P.lengthComputable ? P.total : this._contentLength
            });
          }
          get filename() {
            return this._filename;
          }
          get isRangeSupported() {
            return this._isRangeSupported;
          }
          get isStreamingSupported() {
            return this._isStreamingSupported;
          }
          get contentLength() {
            return this._contentLength;
          }
          get headersReady() {
            return this._headersReceivedCapability.promise;
          }
          async read() {
            if (this._storedError)
              throw this._storedError;
            if (this._cachedChunks.length > 0)
              return {
                value: this._cachedChunks.shift(),
                done: !1
              };
            if (this._done)
              return {
                value: void 0,
                done: !0
              };
            const P = (0, e.createPromiseCapability)();
            return this._requests.push(P), P.promise;
          }
          cancel(P) {
            this._done = !0, this._headersReceivedCapability.reject(P);
            for (const u of this._requests)
              u.resolve({
                value: void 0,
                done: !0
              });
            this._requests.length = 0, this._manager.isPendingRequest(this._fullRequestId) && this._manager.abortRequest(this._fullRequestId), this._fullRequestReader = null;
          }
        }
        class R {
          constructor(P, u, n) {
            this._manager = P;
            const a = {
              onDone: this._onDone.bind(this),
              onError: this._onError.bind(this),
              onProgress: this._onProgress.bind(this)
            };
            this._url = P.url, this._requestId = P.requestRange(u, n, a), this._requests = [], this._queuedChunk = null, this._done = !1, this._storedError = void 0, this.onProgress = null, this.onClosed = null;
          }
          _close() {
            var P;
            (P = this.onClosed) == null || P.call(this, this);
          }
          _onDone(P) {
            const u = P.chunk;
            this._requests.length > 0 ? this._requests.shift().resolve({
              value: u,
              done: !1
            }) : this._queuedChunk = u, this._done = !0;
            for (const n of this._requests)
              n.resolve({
                value: void 0,
                done: !0
              });
            this._requests.length = 0, this._close();
          }
          _onError(P) {
            this._storedError = (0, d.createResponseStatusError)(P, this._url);
            for (const u of this._requests)
              u.reject(this._storedError);
            this._requests.length = 0, this._queuedChunk = null;
          }
          _onProgress(P) {
            var u;
            this.isStreamingSupported || (u = this.onProgress) == null || u.call(this, {
              loaded: P.loaded
            });
          }
          get isStreamingSupported() {
            return !1;
          }
          async read() {
            if (this._storedError)
              throw this._storedError;
            if (this._queuedChunk !== null) {
              const u = this._queuedChunk;
              return this._queuedChunk = null, {
                value: u,
                done: !1
              };
            }
            if (this._done)
              return {
                value: void 0,
                done: !0
              };
            const P = (0, e.createPromiseCapability)();
            return this._requests.push(P), P.promise;
          }
          cancel(P) {
            this._done = !0;
            for (const u of this._requests)
              u.resolve({
                value: void 0,
                done: !0
              });
            this._requests.length = 0, this._manager.isPendingRequest(this._requestId) && this._manager.abortRequest(this._requestId), this._close();
          }
        }
      },
      (t, i, r) => {
        Object.defineProperty(i, "__esModule", {
          value: !0
        }), i.PDFFetchStream = void 0;
        var e = r(1), d = r(33);
        function C(S, R, A) {
          return {
            method: "GET",
            headers: S,
            signal: A == null ? void 0 : A.signal,
            mode: "cors",
            credentials: R ? "include" : "same-origin",
            redirect: "follow"
          };
        }
        function T(S) {
          const R = new Headers();
          for (const A in S) {
            const P = S[A];
            typeof P > "u" || R.append(A, P);
          }
          return R;
        }
        class I {
          constructor(R) {
            this.source = R, this.isHttp = /^https?:/i.test(R.url), this.httpHeaders = this.isHttp && R.httpHeaders || {}, this._fullRequestReader = null, this._rangeRequestReaders = [];
          }
          get _progressiveDataLength() {
            var R, A;
            return (A = (R = this._fullRequestReader) == null ? void 0 : R._loaded) != null ? A : 0;
          }
          getFullReader() {
            return (0, e.assert)(!this._fullRequestReader, "PDFFetchStream.getFullReader can only be called once."), this._fullRequestReader = new x(this), this._fullRequestReader;
          }
          getRangeReader(R, A) {
            if (A <= this._progressiveDataLength)
              return null;
            const P = new m(this, R, A);
            return this._rangeRequestReaders.push(P), P;
          }
          cancelAllRequests(R) {
            this._fullRequestReader && this._fullRequestReader.cancel(R);
            for (const A of this._rangeRequestReaders.slice(0))
              A.cancel(R);
          }
        }
        i.PDFFetchStream = I;
        class x {
          constructor(R) {
            this._stream = R, this._reader = null, this._loaded = 0, this._filename = null;
            const A = R.source;
            this._withCredentials = A.withCredentials || !1, this._contentLength = A.length, this._headersCapability = (0, e.createPromiseCapability)(), this._disableRange = A.disableRange || !1, this._rangeChunkSize = A.rangeChunkSize, !this._rangeChunkSize && !this._disableRange && (this._disableRange = !0), typeof AbortController < "u" && (this._abortController = new AbortController()), this._isStreamingSupported = !A.disableStream, this._isRangeSupported = !A.disableRange, this._headers = T(this._stream.httpHeaders);
            const P = A.url;
            fetch(P, C(this._headers, this._withCredentials, this._abortController)).then((u) => {
              if (!(0, d.validateResponseStatus)(u.status))
                throw (0, d.createResponseStatusError)(u.status, P);
              this._reader = u.body.getReader(), this._headersCapability.resolve();
              const n = (F) => u.headers.get(F), {
                allowRangeRequests: a,
                suggestedLength: l
              } = (0, d.validateRangeRequestCapabilities)({
                getResponseHeader: n,
                isHttp: this._stream.isHttp,
                rangeChunkSize: this._rangeChunkSize,
                disableRange: this._disableRange
              });
              this._isRangeSupported = a, this._contentLength = l || this._contentLength, this._filename = (0, d.extractFilenameFromHeader)(n), !this._isStreamingSupported && this._isRangeSupported && this.cancel(new e.AbortException("Streaming is disabled."));
            }).catch(this._headersCapability.reject), this.onProgress = null;
          }
          get headersReady() {
            return this._headersCapability.promise;
          }
          get filename() {
            return this._filename;
          }
          get contentLength() {
            return this._contentLength;
          }
          get isRangeSupported() {
            return this._isRangeSupported;
          }
          get isStreamingSupported() {
            return this._isStreamingSupported;
          }
          async read() {
            await this._headersCapability.promise;
            const {
              value: R,
              done: A
            } = await this._reader.read();
            return A ? {
              value: R,
              done: A
            } : (this._loaded += R.byteLength, this.onProgress && this.onProgress({
              loaded: this._loaded,
              total: this._contentLength
            }), {
              value: new Uint8Array(R).buffer,
              done: !1
            });
          }
          cancel(R) {
            this._reader && this._reader.cancel(R), this._abortController && this._abortController.abort();
          }
        }
        class m {
          constructor(R, A, P) {
            this._stream = R, this._reader = null, this._loaded = 0;
            const u = R.source;
            this._withCredentials = u.withCredentials || !1, this._readCapability = (0, e.createPromiseCapability)(), this._isStreamingSupported = !u.disableStream, typeof AbortController < "u" && (this._abortController = new AbortController()), this._headers = T(this._stream.httpHeaders), this._headers.append("Range", `bytes=${A}-${P - 1}`);
            const n = u.url;
            fetch(n, C(this._headers, this._withCredentials, this._abortController)).then((a) => {
              if (!(0, d.validateResponseStatus)(a.status))
                throw (0, d.createResponseStatusError)(a.status, n);
              this._readCapability.resolve(), this._reader = a.body.getReader();
            }).catch(this._readCapability.reject), this.onProgress = null;
          }
          get isStreamingSupported() {
            return this._isStreamingSupported;
          }
          async read() {
            await this._readCapability.promise;
            const {
              value: R,
              done: A
            } = await this._reader.read();
            return A ? {
              value: R,
              done: A
            } : (this._loaded += R.byteLength, this.onProgress && this.onProgress({
              loaded: this._loaded
            }), {
              value: new Uint8Array(R).buffer,
              done: !1
            });
          }
          cancel(R) {
            this._reader && this._reader.cancel(R), this._abortController && this._abortController.abort();
          }
        }
      }
    ], __webpack_module_cache__ = {};
    function __w_pdfjs_require__(t) {
      var i = __webpack_module_cache__[t];
      if (i !== void 0)
        return i.exports;
      var r = __webpack_module_cache__[t] = {
        exports: {}
      };
      return __webpack_modules__[t](r, r.exports, __w_pdfjs_require__), r.exports;
    }
    var __webpack_exports__ = {};
    return (() => {
      var t = __webpack_exports__;
      Object.defineProperty(t, "__esModule", {
        value: !0
      }), Object.defineProperty(t, "AnnotationEditorLayer", {
        enumerable: !0,
        get: function() {
          return d.AnnotationEditorLayer;
        }
      }), Object.defineProperty(t, "AnnotationEditorParamsType", {
        enumerable: !0,
        get: function() {
          return i.AnnotationEditorParamsType;
        }
      }), Object.defineProperty(t, "AnnotationEditorType", {
        enumerable: !0,
        get: function() {
          return i.AnnotationEditorType;
        }
      }), Object.defineProperty(t, "AnnotationEditorUIManager", {
        enumerable: !0,
        get: function() {
          return C.AnnotationEditorUIManager;
        }
      }), Object.defineProperty(t, "AnnotationLayer", {
        enumerable: !0,
        get: function() {
          return T.AnnotationLayer;
        }
      }), Object.defineProperty(t, "AnnotationMode", {
        enumerable: !0,
        get: function() {
          return i.AnnotationMode;
        }
      }), Object.defineProperty(t, "CMapCompressionType", {
        enumerable: !0,
        get: function() {
          return i.CMapCompressionType;
        }
      }), Object.defineProperty(t, "GlobalWorkerOptions", {
        enumerable: !0,
        get: function() {
          return I.GlobalWorkerOptions;
        }
      }), Object.defineProperty(t, "InvalidPDFException", {
        enumerable: !0,
        get: function() {
          return i.InvalidPDFException;
        }
      }), Object.defineProperty(t, "LoopbackPort", {
        enumerable: !0,
        get: function() {
          return e.LoopbackPort;
        }
      }), Object.defineProperty(t, "MissingPDFException", {
        enumerable: !0,
        get: function() {
          return i.MissingPDFException;
        }
      }), Object.defineProperty(t, "OPS", {
        enumerable: !0,
        get: function() {
          return i.OPS;
        }
      }), Object.defineProperty(t, "PDFDataRangeTransport", {
        enumerable: !0,
        get: function() {
          return e.PDFDataRangeTransport;
        }
      }), Object.defineProperty(t, "PDFDateString", {
        enumerable: !0,
        get: function() {
          return r.PDFDateString;
        }
      }), Object.defineProperty(t, "PDFWorker", {
        enumerable: !0,
        get: function() {
          return e.PDFWorker;
        }
      }), Object.defineProperty(t, "PasswordResponses", {
        enumerable: !0,
        get: function() {
          return i.PasswordResponses;
        }
      }), Object.defineProperty(t, "PermissionFlag", {
        enumerable: !0,
        get: function() {
          return i.PermissionFlag;
        }
      }), Object.defineProperty(t, "PixelsPerInch", {
        enumerable: !0,
        get: function() {
          return r.PixelsPerInch;
        }
      }), Object.defineProperty(t, "RenderingCancelledException", {
        enumerable: !0,
        get: function() {
          return r.RenderingCancelledException;
        }
      }), Object.defineProperty(t, "SVGGraphics", {
        enumerable: !0,
        get: function() {
          return S.SVGGraphics;
        }
      }), Object.defineProperty(t, "UNSUPPORTED_FEATURES", {
        enumerable: !0,
        get: function() {
          return i.UNSUPPORTED_FEATURES;
        }
      }), Object.defineProperty(t, "UnexpectedResponseException", {
        enumerable: !0,
        get: function() {
          return i.UnexpectedResponseException;
        }
      }), Object.defineProperty(t, "Util", {
        enumerable: !0,
        get: function() {
          return i.Util;
        }
      }), Object.defineProperty(t, "VerbosityLevel", {
        enumerable: !0,
        get: function() {
          return i.VerbosityLevel;
        }
      }), Object.defineProperty(t, "XfaLayer", {
        enumerable: !0,
        get: function() {
          return R.XfaLayer;
        }
      }), Object.defineProperty(t, "binarySearchFirstItem", {
        enumerable: !0,
        get: function() {
          return r.binarySearchFirstItem;
        }
      }), Object.defineProperty(t, "build", {
        enumerable: !0,
        get: function() {
          return e.build;
        }
      }), Object.defineProperty(t, "createPromiseCapability", {
        enumerable: !0,
        get: function() {
          return i.createPromiseCapability;
        }
      }), Object.defineProperty(t, "createValidAbsoluteUrl", {
        enumerable: !0,
        get: function() {
          return i.createValidAbsoluteUrl;
        }
      }), Object.defineProperty(t, "getDocument", {
        enumerable: !0,
        get: function() {
          return e.getDocument;
        }
      }), Object.defineProperty(t, "getFilenameFromUrl", {
        enumerable: !0,
        get: function() {
          return r.getFilenameFromUrl;
        }
      }), Object.defineProperty(t, "getPdfFilenameFromUrl", {
        enumerable: !0,
        get: function() {
          return r.getPdfFilenameFromUrl;
        }
      }), Object.defineProperty(t, "getXfaPageViewport", {
        enumerable: !0,
        get: function() {
          return r.getXfaPageViewport;
        }
      }), Object.defineProperty(t, "isPdfFile", {
        enumerable: !0,
        get: function() {
          return r.isPdfFile;
        }
      }), Object.defineProperty(t, "loadScript", {
        enumerable: !0,
        get: function() {
          return r.loadScript;
        }
      }), Object.defineProperty(t, "renderTextLayer", {
        enumerable: !0,
        get: function() {
          return m.renderTextLayer;
        }
      }), Object.defineProperty(t, "shadow", {
        enumerable: !0,
        get: function() {
          return i.shadow;
        }
      }), Object.defineProperty(t, "version", {
        enumerable: !0,
        get: function() {
          return e.version;
        }
      });
      var i = __w_pdfjs_require__(1), r = __w_pdfjs_require__(4), e = __w_pdfjs_require__(6), d = __w_pdfjs_require__(22), C = __w_pdfjs_require__(9), T = __w_pdfjs_require__(27), I = __w_pdfjs_require__(15), x = __w_pdfjs_require__(3), m = __w_pdfjs_require__(30), S = __w_pdfjs_require__(31), R = __w_pdfjs_require__(29);
      if (x.isNodeJS) {
        const {
          PDFNodeStream: A
        } = __w_pdfjs_require__(32);
        (0, e.setPDFNetworkStreamFactory)((P) => new A(P));
      } else {
        const {
          PDFNetworkStream: A
        } = __w_pdfjs_require__(35), {
          PDFFetchStream: P
        } = __w_pdfjs_require__(36);
        (0, e.setPDFNetworkStreamFactory)((u) => (0, r.isValidFetchUrl)(u.url) ? new P(u) : new A(u));
      }
    })(), __webpack_exports__;
  })());
})(pdf);
function isFunction(t) {
  return typeof t == "function";
}
const RenderingCancelledException = "RenderingCancelledException", usePdfJsRenderer = ({
  canvasRef: t,
  file: i,
  onDocumentLoadSuccess: r,
  onPageCount: e,
  onDocumentLoadFail: d,
  onPageLoadSuccess: C,
  onPageLoadFail: T,
  onPageRenderSuccess: I,
  onPageRenderFail: x,
  scale: m = 1,
  rotate: S = 0,
  page: R = 1,
  cMapUrl: A,
  cMapPacked: P,
  workerSrc: u = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdf.exports.version}/pdf.worker.js`,
  withCredentials: n = !1
}) => {
  const [a, l] = useState(), [F, y] = useState(), g = useRef(null), o = useRef(r), h = useRef(d), v = useRef(C), O = useRef(T), D = useRef(I), L = useRef(x);
  return useEffect(() => {
    o.current = r;
  }, [r]), useEffect(() => {
    h.current = d;
  }, [d]), useEffect(() => {
    v.current = C;
  }, [C]), useEffect(() => {
    O.current = T;
  }, [T]), useEffect(() => {
    D.current = I;
  }, [I]), useEffect(() => {
    L.current = x;
  }, [x]), useEffect(() => {
    pdf.exports.GlobalWorkerOptions.workerSrc = u;
  }, [u]), useEffect(() => {
    const U = {
      url: i,
      withCredentials: n
    };
    A && (U.cMapUrl = A, U.cMapPacked = P), pdf.exports.getDocument(U).promise.then((J) => {
      l(J), isFunction(e) && e(J.numPages), isFunction(o.current) && o.current(J);
    }, () => {
      isFunction(h.current) && h.current();
    });
  }, [i, n, A, P]), useEffect(() => {
    const U = (J) => {
      const V = S === 0 ? J.rotate : J.rotate + S, N = window.devicePixelRatio, G = m * N, k = J.getViewport({
        scale: G,
        rotation: V
      }), z = t.current;
      if (!z)
        return;
      const W = z.getContext("2d");
      if (!!W) {
        if (z.style.width = `${k.width / N}px`, z.style.height = `${k.height / N}px`, z.height = k.height, z.width = k.width, g.current) {
          g.current.cancel();
          return;
        }
        return g.current = J.render({
          canvasContext: W,
          viewport: k
        }), g.current.promise.then(() => {
          g.current = null, isFunction(D.current) && D.current(J);
        }, (st) => {
          g.current = null, st && st.name === RenderingCancelledException ? U(J) : isFunction(L.current) && L.current();
        });
      }
    };
    a && a.getPage(R).then((J) => {
      y(J), isFunction(v.current) && v.current(J), U(J);
    }, () => {
      isFunction(O.current) && O.current();
    });
  }, [t, R, a, S, m]), {
    pdfDocument: a,
    pdfPage: F
  };
};
export {
  ContentType,
  DefaultDocumentToolbar as DocumentToolbar,
  DocumentViewer,
  defaultZoomConfig,
  useDocumentConverter,
  useDocumentState,
  usePdfJsRenderer
};
//# sourceMappingURL=docs-renderer.es.js.map
