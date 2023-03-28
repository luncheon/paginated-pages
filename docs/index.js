"use strict";
(() => {
  // index.ts
  var rangeClosed = (min, max) => {
    const result = [];
    for (let i4 = min; i4 <= max; i4++) {
      result.push(i4);
    }
    return result;
  };
  var paginatedPages = (currentPage2, pageCount2, maxVisibleCount2) => {
    if (pageCount2 <= 1) {
      return [[1]];
    }
    if (pageCount2 <= maxVisibleCount2) {
      return [rangeClosed(1, pageCount2)];
    }
    const halfVisibleCount = maxVisibleCount2 / 2;
    if (currentPage2 < halfVisibleCount + 1) {
      return [rangeClosed(1, maxVisibleCount2 - 2), [pageCount2]];
    }
    if (currentPage2 >= pageCount2 - halfVisibleCount) {
      return [[1], rangeClosed(pageCount2 - maxVisibleCount2 + 3, pageCount2)];
    }
    return [[1], rangeClosed(currentPage2 - Math.ceil(halfVisibleCount) + 3, currentPage2 + Math.floor(halfVisibleCount) - 2), [pageCount2]];
  };

  // docs/src/PaginatedPagesElement.ts
  var PaginatedPagesElement = class extends HTMLElement {
    static get observedAttributes() {
      return ["current-page", "page-count", "max-visible-count"];
    }
    #pages;
    #onPopState = () => {
      this.#render();
    };
    constructor() {
      super();
      this.#pages = this.attachShadow({ mode: "open" }).appendChild(document.createElement("div"));
      this.#pages.part.add("pages");
      this.#pages.addEventListener("click", (event) => {
        if (event.button === 0 && !event.ctrlKey && !event.metaKey && !event.shiftKey) {
          const href = event.target.closest("a")?.href;
          if (href) {
            event.preventDefault();
            history.pushState(0, "", href);
            this.#render();
            this.dispatchEvent(new CustomEvent("page:changed", { bubbles: true, cancelable: true }));
          }
        }
      });
    }
    connectedCallback() {
      addEventListener("popstate", this.#onPopState);
      this.#render();
    }
    disconnectedCallback() {
      removeEventListener("popstate", this.#onPopState);
    }
    attributeChangedCallback(name, _oldValue, newValue) {
      if (this.#isAttributeChangedCallbackEnabled && _oldValue !== newValue) {
        switch (name) {
          case "page-count":
            this.pageCount = +newValue;
            return;
          case "current-page-param-name":
            this.currentPageParamName = newValue;
            return;
          case "max-visible-count":
            this.maxVisibleCount = +newValue;
            return;
        }
      }
    }
    #isAttributeChangedCallbackEnabled = 1;
    #renderRequest;
    #render() {
      this.#isAttributeChangedCallbackEnabled = 0;
      this.setAttribute("page-count", this.#pageCount);
      this.setAttribute("max-visible-count", this.#maxVisibleCount);
      this.#isAttributeChangedCallbackEnabled = 1;
      this.#renderRequest ??= requestAnimationFrame(() => {
        this.#renderRequest = void 0;
        const root = this.#pages;
        const paramsBase = new URLSearchParams(location.search);
        const currentPage2 = +paramsBase.get(this.currentPageParamName) || 1;
        paramsBase.delete(this.currentPageParamName);
        const href = (page) => {
          if (page === currentPage2 || page < 1 || page > this.pageCount) {
            return "";
          }
          const params = new URLSearchParams(paramsBase);
          params.set(this.currentPageParamName, page);
          return ` href="?${params.toString()}"`;
        };
        root.innerHTML = `<a draggable=false part="page icon${currentPage2 === 1 ? " disabled" : ""}"${href(currentPage2 - 1)}>\u2039</a>`;
        paginatedPages(currentPage2, this.pageCount, this.maxVisibleCount).forEach((pages2, i4) => {
          if (i4 !== 0) {
            root.innerHTML += "<span part=dots>...</span>";
          }
          for (const page of pages2) {
            root.innerHTML += `<a draggable=false part="page${page === currentPage2 ? " active" : ""}"${href(page)}>${page}</a>`;
          }
        });
        root.innerHTML += `<a draggable=false part="page icon${currentPage2 === this.pageCount ? " disabled" : ""}"${href(
          currentPage2 + 1
        )}>\u203A</a>`;
      });
    }
    #currentPageParamName = "page";
    get currentPageParamName() {
      return this.#currentPageParamName;
    }
    set currentPageParamName(currentPageParamName) {
      if (this.#currentPageParamName !== currentPageParamName) {
        this.#currentPageParamName = currentPageParamName;
        this.#render();
      }
    }
    #pageCount = 0;
    get pageCount() {
      return this.#pageCount;
    }
    set pageCount(pageCount2) {
      if (this.#pageCount !== pageCount2 && pageCount2 > 0) {
        this.#pageCount = pageCount2;
        this.#render();
      }
    }
    #maxVisibleCount = 9;
    get maxVisibleCount() {
      return this.#maxVisibleCount;
    }
    set maxVisibleCount(maxVisibleCount2) {
      if (this.#maxVisibleCount !== maxVisibleCount2 && maxVisibleCount2 > 0) {
        this.#maxVisibleCount = maxVisibleCount2;
        this.#render();
      }
    }
  };
  customElements.define("paginated-pages", PaginatedPagesElement);

  // node_modules/preact/dist/preact.module.js
  var n;
  var l;
  var u;
  var i;
  var t;
  var r;
  var o;
  var f;
  var e;
  var c = {};
  var s = [];
  var a = /acit|ex(?:s|g|n|p|$)|rph|grid|ows|mnc|ntw|ine[ch]|zoo|^ord|itera/i;
  function h(n3, l5) {
    for (var u4 in l5)
      n3[u4] = l5[u4];
    return n3;
  }
  function v(n3) {
    var l5 = n3.parentNode;
    l5 && l5.removeChild(n3);
  }
  function y(l5, u4, i4) {
    var t4, r4, o5, f4 = {};
    for (o5 in u4)
      "key" == o5 ? t4 = u4[o5] : "ref" == o5 ? r4 = u4[o5] : f4[o5] = u4[o5];
    if (arguments.length > 2 && (f4.children = arguments.length > 3 ? n.call(arguments, 2) : i4), "function" == typeof l5 && null != l5.defaultProps)
      for (o5 in l5.defaultProps)
        void 0 === f4[o5] && (f4[o5] = l5.defaultProps[o5]);
    return p(l5, f4, t4, r4, null);
  }
  function p(n3, i4, t4, r4, o5) {
    var f4 = { type: n3, props: i4, key: t4, ref: r4, __k: null, __: null, __b: 0, __e: null, __d: void 0, __c: null, __h: null, constructor: void 0, __v: null == o5 ? ++u : o5 };
    return null == o5 && null != l.vnode && l.vnode(f4), f4;
  }
  function _(n3) {
    return n3.children;
  }
  function k(n3, l5) {
    this.props = n3, this.context = l5;
  }
  function b(n3, l5) {
    if (null == l5)
      return n3.__ ? b(n3.__, n3.__.__k.indexOf(n3) + 1) : null;
    for (var u4; l5 < n3.__k.length; l5++)
      if (null != (u4 = n3.__k[l5]) && null != u4.__e)
        return u4.__e;
    return "function" == typeof n3.type ? b(n3) : null;
  }
  function g(n3) {
    var l5, u4;
    if (null != (n3 = n3.__) && null != n3.__c) {
      for (n3.__e = n3.__c.base = null, l5 = 0; l5 < n3.__k.length; l5++)
        if (null != (u4 = n3.__k[l5]) && null != u4.__e) {
          n3.__e = n3.__c.base = u4.__e;
          break;
        }
      return g(n3);
    }
  }
  function m(n3) {
    (!n3.__d && (n3.__d = true) && t.push(n3) && !w.__r++ || r !== l.debounceRendering) && ((r = l.debounceRendering) || o)(w);
  }
  function w() {
    var n3, l5, u4, i4, r4, o5, e4, c5;
    for (t.sort(f); n3 = t.shift(); )
      n3.__d && (l5 = t.length, i4 = void 0, r4 = void 0, e4 = (o5 = (u4 = n3).__v).__e, (c5 = u4.__P) && (i4 = [], (r4 = h({}, o5)).__v = o5.__v + 1, L(c5, o5, r4, u4.__n, void 0 !== c5.ownerSVGElement, null != o5.__h ? [e4] : null, i4, null == e4 ? b(o5) : e4, o5.__h), M(i4, o5), o5.__e != e4 && g(o5)), t.length > l5 && t.sort(f));
    w.__r = 0;
  }
  function x(n3, l5, u4, i4, t4, r4, o5, f4, e4, a4) {
    var h3, v5, y3, d4, k3, g4, m3, w4 = i4 && i4.__k || s, x2 = w4.length;
    for (u4.__k = [], h3 = 0; h3 < l5.length; h3++)
      if (null != (d4 = u4.__k[h3] = null == (d4 = l5[h3]) || "boolean" == typeof d4 || "function" == typeof d4 ? null : "string" == typeof d4 || "number" == typeof d4 || "bigint" == typeof d4 ? p(null, d4, null, null, d4) : Array.isArray(d4) ? p(_, { children: d4 }, null, null, null) : d4.__b > 0 ? p(d4.type, d4.props, d4.key, d4.ref ? d4.ref : null, d4.__v) : d4)) {
        if (d4.__ = u4, d4.__b = u4.__b + 1, null === (y3 = w4[h3]) || y3 && d4.key == y3.key && d4.type === y3.type)
          w4[h3] = void 0;
        else
          for (v5 = 0; v5 < x2; v5++) {
            if ((y3 = w4[v5]) && d4.key == y3.key && d4.type === y3.type) {
              w4[v5] = void 0;
              break;
            }
            y3 = null;
          }
        L(n3, d4, y3 = y3 || c, t4, r4, o5, f4, e4, a4), k3 = d4.__e, (v5 = d4.ref) && y3.ref != v5 && (m3 || (m3 = []), y3.ref && m3.push(y3.ref, null, d4), m3.push(v5, d4.__c || k3, d4)), null != k3 ? (null == g4 && (g4 = k3), "function" == typeof d4.type && d4.__k === y3.__k ? d4.__d = e4 = A(d4, e4, n3) : e4 = C(n3, d4, y3, w4, k3, e4), "function" == typeof u4.type && (u4.__d = e4)) : e4 && y3.__e == e4 && e4.parentNode != n3 && (e4 = b(y3));
      }
    for (u4.__e = g4, h3 = x2; h3--; )
      null != w4[h3] && ("function" == typeof u4.type && null != w4[h3].__e && w4[h3].__e == u4.__d && (u4.__d = $(i4).nextSibling), S(w4[h3], w4[h3]));
    if (m3)
      for (h3 = 0; h3 < m3.length; h3++)
        O(m3[h3], m3[++h3], m3[++h3]);
  }
  function A(n3, l5, u4) {
    for (var i4, t4 = n3.__k, r4 = 0; t4 && r4 < t4.length; r4++)
      (i4 = t4[r4]) && (i4.__ = n3, l5 = "function" == typeof i4.type ? A(i4, l5, u4) : C(u4, i4, i4, t4, i4.__e, l5));
    return l5;
  }
  function C(n3, l5, u4, i4, t4, r4) {
    var o5, f4, e4;
    if (void 0 !== l5.__d)
      o5 = l5.__d, l5.__d = void 0;
    else if (null == u4 || t4 != r4 || null == t4.parentNode)
      n:
        if (null == r4 || r4.parentNode !== n3)
          n3.appendChild(t4), o5 = null;
        else {
          for (f4 = r4, e4 = 0; (f4 = f4.nextSibling) && e4 < i4.length; e4 += 1)
            if (f4 == t4)
              break n;
          n3.insertBefore(t4, r4), o5 = r4;
        }
    return void 0 !== o5 ? o5 : t4.nextSibling;
  }
  function $(n3) {
    var l5, u4, i4;
    if (null == n3.type || "string" == typeof n3.type)
      return n3.__e;
    if (n3.__k) {
      for (l5 = n3.__k.length - 1; l5 >= 0; l5--)
        if ((u4 = n3.__k[l5]) && (i4 = $(u4)))
          return i4;
    }
    return null;
  }
  function H(n3, l5, u4, i4, t4) {
    var r4;
    for (r4 in u4)
      "children" === r4 || "key" === r4 || r4 in l5 || T(n3, r4, null, u4[r4], i4);
    for (r4 in l5)
      t4 && "function" != typeof l5[r4] || "children" === r4 || "key" === r4 || "value" === r4 || "checked" === r4 || u4[r4] === l5[r4] || T(n3, r4, l5[r4], u4[r4], i4);
  }
  function I(n3, l5, u4) {
    "-" === l5[0] ? n3.setProperty(l5, null == u4 ? "" : u4) : n3[l5] = null == u4 ? "" : "number" != typeof u4 || a.test(l5) ? u4 : u4 + "px";
  }
  function T(n3, l5, u4, i4, t4) {
    var r4;
    n:
      if ("style" === l5)
        if ("string" == typeof u4)
          n3.style.cssText = u4;
        else {
          if ("string" == typeof i4 && (n3.style.cssText = i4 = ""), i4)
            for (l5 in i4)
              u4 && l5 in u4 || I(n3.style, l5, "");
          if (u4)
            for (l5 in u4)
              i4 && u4[l5] === i4[l5] || I(n3.style, l5, u4[l5]);
        }
      else if ("o" === l5[0] && "n" === l5[1])
        r4 = l5 !== (l5 = l5.replace(/Capture$/, "")), l5 = l5.toLowerCase() in n3 ? l5.toLowerCase().slice(2) : l5.slice(2), n3.l || (n3.l = {}), n3.l[l5 + r4] = u4, u4 ? i4 || n3.addEventListener(l5, r4 ? z : j, r4) : n3.removeEventListener(l5, r4 ? z : j, r4);
      else if ("dangerouslySetInnerHTML" !== l5) {
        if (t4)
          l5 = l5.replace(/xlink(H|:h)/, "h").replace(/sName$/, "s");
        else if ("width" !== l5 && "height" !== l5 && "href" !== l5 && "list" !== l5 && "form" !== l5 && "tabIndex" !== l5 && "download" !== l5 && l5 in n3)
          try {
            n3[l5] = null == u4 ? "" : u4;
            break n;
          } catch (n4) {
          }
        "function" == typeof u4 || (null == u4 || false === u4 && "-" !== l5[4] ? n3.removeAttribute(l5) : n3.setAttribute(l5, u4));
      }
  }
  function j(n3) {
    return this.l[n3.type + false](l.event ? l.event(n3) : n3);
  }
  function z(n3) {
    return this.l[n3.type + true](l.event ? l.event(n3) : n3);
  }
  function L(n3, u4, i4, t4, r4, o5, f4, e4, c5) {
    var s4, a4, v5, y3, p5, d4, b4, g4, m3, w4, A2, P, C2, $2, H2, I2 = u4.type;
    if (void 0 !== u4.constructor)
      return null;
    null != i4.__h && (c5 = i4.__h, e4 = u4.__e = i4.__e, u4.__h = null, o5 = [e4]), (s4 = l.__b) && s4(u4);
    try {
      n:
        if ("function" == typeof I2) {
          if (g4 = u4.props, m3 = (s4 = I2.contextType) && t4[s4.__c], w4 = s4 ? m3 ? m3.props.value : s4.__ : t4, i4.__c ? b4 = (a4 = u4.__c = i4.__c).__ = a4.__E : ("prototype" in I2 && I2.prototype.render ? u4.__c = a4 = new I2(g4, w4) : (u4.__c = a4 = new k(g4, w4), a4.constructor = I2, a4.render = q), m3 && m3.sub(a4), a4.props = g4, a4.state || (a4.state = {}), a4.context = w4, a4.__n = t4, v5 = a4.__d = true, a4.__h = [], a4._sb = []), null == a4.__s && (a4.__s = a4.state), null != I2.getDerivedStateFromProps && (a4.__s == a4.state && (a4.__s = h({}, a4.__s)), h(a4.__s, I2.getDerivedStateFromProps(g4, a4.__s))), y3 = a4.props, p5 = a4.state, a4.__v = u4, v5)
            null == I2.getDerivedStateFromProps && null != a4.componentWillMount && a4.componentWillMount(), null != a4.componentDidMount && a4.__h.push(a4.componentDidMount);
          else {
            if (null == I2.getDerivedStateFromProps && g4 !== y3 && null != a4.componentWillReceiveProps && a4.componentWillReceiveProps(g4, w4), !a4.__e && null != a4.shouldComponentUpdate && false === a4.shouldComponentUpdate(g4, a4.__s, w4) || u4.__v === i4.__v) {
              for (u4.__v !== i4.__v && (a4.props = g4, a4.state = a4.__s, a4.__d = false), a4.__e = false, u4.__e = i4.__e, u4.__k = i4.__k, u4.__k.forEach(function(n4) {
                n4 && (n4.__ = u4);
              }), A2 = 0; A2 < a4._sb.length; A2++)
                a4.__h.push(a4._sb[A2]);
              a4._sb = [], a4.__h.length && f4.push(a4);
              break n;
            }
            null != a4.componentWillUpdate && a4.componentWillUpdate(g4, a4.__s, w4), null != a4.componentDidUpdate && a4.__h.push(function() {
              a4.componentDidUpdate(y3, p5, d4);
            });
          }
          if (a4.context = w4, a4.props = g4, a4.__P = n3, P = l.__r, C2 = 0, "prototype" in I2 && I2.prototype.render) {
            for (a4.state = a4.__s, a4.__d = false, P && P(u4), s4 = a4.render(a4.props, a4.state, a4.context), $2 = 0; $2 < a4._sb.length; $2++)
              a4.__h.push(a4._sb[$2]);
            a4._sb = [];
          } else
            do {
              a4.__d = false, P && P(u4), s4 = a4.render(a4.props, a4.state, a4.context), a4.state = a4.__s;
            } while (a4.__d && ++C2 < 25);
          a4.state = a4.__s, null != a4.getChildContext && (t4 = h(h({}, t4), a4.getChildContext())), v5 || null == a4.getSnapshotBeforeUpdate || (d4 = a4.getSnapshotBeforeUpdate(y3, p5)), H2 = null != s4 && s4.type === _ && null == s4.key ? s4.props.children : s4, x(n3, Array.isArray(H2) ? H2 : [H2], u4, i4, t4, r4, o5, f4, e4, c5), a4.base = u4.__e, u4.__h = null, a4.__h.length && f4.push(a4), b4 && (a4.__E = a4.__ = null), a4.__e = false;
        } else
          null == o5 && u4.__v === i4.__v ? (u4.__k = i4.__k, u4.__e = i4.__e) : u4.__e = N(i4.__e, u4, i4, t4, r4, o5, f4, c5);
      (s4 = l.diffed) && s4(u4);
    } catch (n4) {
      u4.__v = null, (c5 || null != o5) && (u4.__e = e4, u4.__h = !!c5, o5[o5.indexOf(e4)] = null), l.__e(n4, u4, i4);
    }
  }
  function M(n3, u4) {
    l.__c && l.__c(u4, n3), n3.some(function(u5) {
      try {
        n3 = u5.__h, u5.__h = [], n3.some(function(n4) {
          n4.call(u5);
        });
      } catch (n4) {
        l.__e(n4, u5.__v);
      }
    });
  }
  function N(l5, u4, i4, t4, r4, o5, f4, e4) {
    var s4, a4, h3, y3 = i4.props, p5 = u4.props, d4 = u4.type, _5 = 0;
    if ("svg" === d4 && (r4 = true), null != o5) {
      for (; _5 < o5.length; _5++)
        if ((s4 = o5[_5]) && "setAttribute" in s4 == !!d4 && (d4 ? s4.localName === d4 : 3 === s4.nodeType)) {
          l5 = s4, o5[_5] = null;
          break;
        }
    }
    if (null == l5) {
      if (null === d4)
        return document.createTextNode(p5);
      l5 = r4 ? document.createElementNS("http://www.w3.org/2000/svg", d4) : document.createElement(d4, p5.is && p5), o5 = null, e4 = false;
    }
    if (null === d4)
      y3 === p5 || e4 && l5.data === p5 || (l5.data = p5);
    else {
      if (o5 = o5 && n.call(l5.childNodes), a4 = (y3 = i4.props || c).dangerouslySetInnerHTML, h3 = p5.dangerouslySetInnerHTML, !e4) {
        if (null != o5)
          for (y3 = {}, _5 = 0; _5 < l5.attributes.length; _5++)
            y3[l5.attributes[_5].name] = l5.attributes[_5].value;
        (h3 || a4) && (h3 && (a4 && h3.__html == a4.__html || h3.__html === l5.innerHTML) || (l5.innerHTML = h3 && h3.__html || ""));
      }
      if (H(l5, p5, y3, r4, e4), h3)
        u4.__k = [];
      else if (_5 = u4.props.children, x(l5, Array.isArray(_5) ? _5 : [_5], u4, i4, t4, r4 && "foreignObject" !== d4, o5, f4, o5 ? o5[0] : i4.__k && b(i4, 0), e4), null != o5)
        for (_5 = o5.length; _5--; )
          null != o5[_5] && v(o5[_5]);
      e4 || ("value" in p5 && void 0 !== (_5 = p5.value) && (_5 !== l5.value || "progress" === d4 && !_5 || "option" === d4 && _5 !== y3.value) && T(l5, "value", _5, y3.value, false), "checked" in p5 && void 0 !== (_5 = p5.checked) && _5 !== l5.checked && T(l5, "checked", _5, y3.checked, false));
    }
    return l5;
  }
  function O(n3, u4, i4) {
    try {
      "function" == typeof n3 ? n3(u4) : n3.current = u4;
    } catch (n4) {
      l.__e(n4, i4);
    }
  }
  function S(n3, u4, i4) {
    var t4, r4;
    if (l.unmount && l.unmount(n3), (t4 = n3.ref) && (t4.current && t4.current !== n3.__e || O(t4, null, u4)), null != (t4 = n3.__c)) {
      if (t4.componentWillUnmount)
        try {
          t4.componentWillUnmount();
        } catch (n4) {
          l.__e(n4, u4);
        }
      t4.base = t4.__P = null, n3.__c = void 0;
    }
    if (t4 = n3.__k)
      for (r4 = 0; r4 < t4.length; r4++)
        t4[r4] && S(t4[r4], u4, i4 || "function" != typeof n3.type);
    i4 || null == n3.__e || v(n3.__e), n3.__ = n3.__e = n3.__d = void 0;
  }
  function q(n3, l5, u4) {
    return this.constructor(n3, u4);
  }
  function B(u4, i4, t4) {
    var r4, o5, f4;
    l.__ && l.__(u4, i4), o5 = (r4 = "function" == typeof t4) ? null : t4 && t4.__k || i4.__k, f4 = [], L(i4, u4 = (!r4 && t4 || i4).__k = y(_, null, [u4]), o5 || c, c, void 0 !== i4.ownerSVGElement, !r4 && t4 ? [t4] : o5 ? null : i4.firstChild ? n.call(i4.childNodes) : null, f4, !r4 && t4 ? t4 : o5 ? o5.__e : i4.firstChild, r4), M(f4, u4);
  }
  n = s.slice, l = { __e: function(n3, l5, u4, i4) {
    for (var t4, r4, o5; l5 = l5.__; )
      if ((t4 = l5.__c) && !t4.__)
        try {
          if ((r4 = t4.constructor) && null != r4.getDerivedStateFromError && (t4.setState(r4.getDerivedStateFromError(n3)), o5 = t4.__d), null != t4.componentDidCatch && (t4.componentDidCatch(n3, i4 || {}), o5 = t4.__d), o5)
            return t4.__E = t4;
        } catch (l6) {
          n3 = l6;
        }
    throw n3;
  } }, u = 0, i = function(n3) {
    return null != n3 && void 0 === n3.constructor;
  }, k.prototype.setState = function(n3, l5) {
    var u4;
    u4 = null != this.__s && this.__s !== this.state ? this.__s : this.__s = h({}, this.state), "function" == typeof n3 && (n3 = n3(h({}, u4), this.props)), n3 && h(u4, n3), null != n3 && this.__v && (l5 && this._sb.push(l5), m(this));
  }, k.prototype.forceUpdate = function(n3) {
    this.__v && (this.__e = true, n3 && this.__h.push(n3), m(this));
  }, k.prototype.render = _, t = [], o = "function" == typeof Promise ? Promise.prototype.then.bind(Promise.resolve()) : setTimeout, f = function(n3, l5) {
    return n3.__v.__b - l5.__v.__b;
  }, w.__r = 0, e = 0;

  // node_modules/preact/hooks/dist/hooks.module.js
  var t2;
  var r2;
  var u2;
  var i2;
  var o2 = 0;
  var f2 = [];
  var c2 = [];
  var e2 = l.__b;
  var a2 = l.__r;
  var v2 = l.diffed;
  var l2 = l.__c;
  var m2 = l.unmount;
  function d(t4, u4) {
    l.__h && l.__h(r2, t4, o2 || u4), o2 = 0;
    var i4 = r2.__H || (r2.__H = { __: [], __h: [] });
    return t4 >= i4.__.length && i4.__.push({ __V: c2 }), i4.__[t4];
  }
  function F(n3, r4) {
    var u4 = d(t2++, 7);
    return z2(u4.__H, r4) ? (u4.__V = n3(), u4.i = r4, u4.__h = n3, u4.__V) : u4.__;
  }
  function b2() {
    for (var t4; t4 = f2.shift(); )
      if (t4.__P && t4.__H)
        try {
          t4.__H.__h.forEach(k2), t4.__H.__h.forEach(w2), t4.__H.__h = [];
        } catch (r4) {
          t4.__H.__h = [], l.__e(r4, t4.__v);
        }
  }
  l.__b = function(n3) {
    r2 = null, e2 && e2(n3);
  }, l.__r = function(n3) {
    a2 && a2(n3), t2 = 0;
    var i4 = (r2 = n3.__c).__H;
    i4 && (u2 === r2 ? (i4.__h = [], r2.__h = [], i4.__.forEach(function(n4) {
      n4.__N && (n4.__ = n4.__N), n4.__V = c2, n4.__N = n4.i = void 0;
    })) : (i4.__h.forEach(k2), i4.__h.forEach(w2), i4.__h = [])), u2 = r2;
  }, l.diffed = function(t4) {
    v2 && v2(t4);
    var o5 = t4.__c;
    o5 && o5.__H && (o5.__H.__h.length && (1 !== f2.push(o5) && i2 === l.requestAnimationFrame || ((i2 = l.requestAnimationFrame) || j2)(b2)), o5.__H.__.forEach(function(n3) {
      n3.i && (n3.__H = n3.i), n3.__V !== c2 && (n3.__ = n3.__V), n3.i = void 0, n3.__V = c2;
    })), u2 = r2 = null;
  }, l.__c = function(t4, r4) {
    r4.some(function(t5) {
      try {
        t5.__h.forEach(k2), t5.__h = t5.__h.filter(function(n3) {
          return !n3.__ || w2(n3);
        });
      } catch (u4) {
        r4.some(function(n3) {
          n3.__h && (n3.__h = []);
        }), r4 = [], l.__e(u4, t5.__v);
      }
    }), l2 && l2(t4, r4);
  }, l.unmount = function(t4) {
    m2 && m2(t4);
    var r4, u4 = t4.__c;
    u4 && u4.__H && (u4.__H.__.forEach(function(n3) {
      try {
        k2(n3);
      } catch (n4) {
        r4 = n4;
      }
    }), u4.__H = void 0, r4 && l.__e(r4, u4.__v));
  };
  var g2 = "function" == typeof requestAnimationFrame;
  function j2(n3) {
    var t4, r4 = function() {
      clearTimeout(u4), g2 && cancelAnimationFrame(t4), setTimeout(n3);
    }, u4 = setTimeout(r4, 100);
    g2 && (t4 = requestAnimationFrame(r4));
  }
  function k2(n3) {
    var t4 = r2, u4 = n3.__c;
    "function" == typeof u4 && (n3.__c = void 0, u4()), r2 = t4;
  }
  function w2(n3) {
    var t4 = r2;
    n3.__c = n3.__(), r2 = t4;
  }
  function z2(n3, t4) {
    return !n3 || n3.length !== t4.length || t4.some(function(t5, r4) {
      return t5 !== n3[r4];
    });
  }

  // node_modules/@preact/signals-core/dist/signals-core.module.js
  function i3() {
    throw new Error("Cycle detected");
  }
  function t3() {
    if (!(s2 > 1)) {
      var i4, t4 = false;
      while (void 0 !== r3) {
        var h3 = r3;
        r3 = void 0;
        n2++;
        while (void 0 !== h3) {
          var o5 = h3.o;
          h3.o = void 0;
          h3.f &= -3;
          if (!(8 & h3.f) && d2(h3))
            try {
              h3.c();
            } catch (h4) {
              if (!t4) {
                i4 = h4;
                t4 = true;
              }
            }
          h3 = o5;
        }
      }
      n2 = 0;
      s2--;
      if (t4)
        throw i4;
    } else
      s2--;
  }
  var o3 = void 0;
  var r3 = void 0;
  var s2 = 0;
  var n2 = 0;
  var f3 = 0;
  function v3(i4) {
    if (void 0 !== o3) {
      var t4 = i4.n;
      if (void 0 === t4 || t4.t !== o3) {
        t4 = { i: 0, S: i4, p: o3.s, n: void 0, t: o3, e: void 0, x: void 0, r: t4 };
        if (void 0 !== o3.s)
          o3.s.n = t4;
        o3.s = t4;
        i4.n = t4;
        if (32 & o3.f)
          i4.S(t4);
        return t4;
      } else if (-1 === t4.i) {
        t4.i = 0;
        if (void 0 !== t4.n) {
          t4.n.p = t4.p;
          if (void 0 !== t4.p)
            t4.p.n = t4.n;
          t4.p = o3.s;
          t4.n = void 0;
          o3.s.n = t4;
          o3.s = t4;
        }
        return t4;
      }
    }
  }
  function e3(i4) {
    this.v = i4;
    this.i = 0;
    this.n = void 0;
    this.t = void 0;
  }
  e3.prototype.h = function() {
    return true;
  };
  e3.prototype.S = function(i4) {
    if (this.t !== i4 && void 0 === i4.e) {
      i4.x = this.t;
      if (void 0 !== this.t)
        this.t.e = i4;
      this.t = i4;
    }
  };
  e3.prototype.U = function(i4) {
    if (void 0 !== this.t) {
      var t4 = i4.e, h3 = i4.x;
      if (void 0 !== t4) {
        t4.x = h3;
        i4.e = void 0;
      }
      if (void 0 !== h3) {
        h3.e = t4;
        i4.x = void 0;
      }
      if (i4 === this.t)
        this.t = h3;
    }
  };
  e3.prototype.subscribe = function(i4) {
    var t4 = this;
    return p2(function() {
      var h3 = t4.value, o5 = 32 & this.f;
      this.f &= -33;
      try {
        i4(h3);
      } finally {
        this.f |= o5;
      }
    });
  };
  e3.prototype.valueOf = function() {
    return this.value;
  };
  e3.prototype.toString = function() {
    return this.value + "";
  };
  e3.prototype.peek = function() {
    return this.v;
  };
  Object.defineProperty(e3.prototype, "value", { get: function() {
    var i4 = v3(this);
    if (void 0 !== i4)
      i4.i = this.i;
    return this.v;
  }, set: function(h3) {
    if (h3 !== this.v) {
      if (n2 > 100)
        i3();
      this.v = h3;
      this.i++;
      f3++;
      s2++;
      try {
        for (var o5 = this.t; void 0 !== o5; o5 = o5.x)
          o5.t.N();
      } finally {
        t3();
      }
    }
  } });
  function u3(i4) {
    return new e3(i4);
  }
  function d2(i4) {
    for (var t4 = i4.s; void 0 !== t4; t4 = t4.n)
      if (t4.S.i !== t4.i || !t4.S.h() || t4.S.i !== t4.i)
        return true;
    return false;
  }
  function c3(i4) {
    for (var t4 = i4.s; void 0 !== t4; t4 = t4.n) {
      var h3 = t4.S.n;
      if (void 0 !== h3)
        t4.r = h3;
      t4.S.n = t4;
      t4.i = -1;
      if (void 0 === t4.n) {
        i4.s = t4;
        break;
      }
    }
  }
  function a3(i4) {
    var t4 = i4.s, h3 = void 0;
    while (void 0 !== t4) {
      var o5 = t4.p;
      if (-1 === t4.i) {
        t4.S.U(t4);
        if (void 0 !== o5)
          o5.n = t4.n;
        if (void 0 !== t4.n)
          t4.n.p = o5;
      } else
        h3 = t4;
      t4.S.n = t4.r;
      if (void 0 !== t4.r)
        t4.r = void 0;
      t4 = o5;
    }
    i4.s = h3;
  }
  function l3(i4) {
    e3.call(this, void 0);
    this.x = i4;
    this.s = void 0;
    this.g = f3 - 1;
    this.f = 4;
  }
  (l3.prototype = new e3()).h = function() {
    this.f &= -3;
    if (1 & this.f)
      return false;
    if (32 == (36 & this.f))
      return true;
    this.f &= -5;
    if (this.g === f3)
      return true;
    this.g = f3;
    this.f |= 1;
    if (this.i > 0 && !d2(this)) {
      this.f &= -2;
      return true;
    }
    var i4 = o3;
    try {
      c3(this);
      o3 = this;
      var t4 = this.x();
      if (16 & this.f || this.v !== t4 || 0 === this.i) {
        this.v = t4;
        this.f &= -17;
        this.i++;
      }
    } catch (i5) {
      this.v = i5;
      this.f |= 16;
      this.i++;
    }
    o3 = i4;
    a3(this);
    this.f &= -2;
    return true;
  };
  l3.prototype.S = function(i4) {
    if (void 0 === this.t) {
      this.f |= 36;
      for (var t4 = this.s; void 0 !== t4; t4 = t4.n)
        t4.S.S(t4);
    }
    e3.prototype.S.call(this, i4);
  };
  l3.prototype.U = function(i4) {
    if (void 0 !== this.t) {
      e3.prototype.U.call(this, i4);
      if (void 0 === this.t) {
        this.f &= -33;
        for (var t4 = this.s; void 0 !== t4; t4 = t4.n)
          t4.S.U(t4);
      }
    }
  };
  l3.prototype.N = function() {
    if (!(2 & this.f)) {
      this.f |= 6;
      for (var i4 = this.t; void 0 !== i4; i4 = i4.x)
        i4.t.N();
    }
  };
  l3.prototype.peek = function() {
    if (!this.h())
      i3();
    if (16 & this.f)
      throw this.v;
    return this.v;
  };
  Object.defineProperty(l3.prototype, "value", { get: function() {
    if (1 & this.f)
      i3();
    var t4 = v3(this);
    this.h();
    if (void 0 !== t4)
      t4.i = this.i;
    if (16 & this.f)
      throw this.v;
    return this.v;
  } });
  function w3(i4) {
    return new l3(i4);
  }
  function y2(i4) {
    var h3 = i4.u;
    i4.u = void 0;
    if ("function" == typeof h3) {
      s2++;
      var r4 = o3;
      o3 = void 0;
      try {
        h3();
      } catch (t4) {
        i4.f &= -2;
        i4.f |= 8;
        _2(i4);
        throw t4;
      } finally {
        o3 = r4;
        t3();
      }
    }
  }
  function _2(i4) {
    for (var t4 = i4.s; void 0 !== t4; t4 = t4.n)
      t4.S.U(t4);
    i4.x = void 0;
    i4.s = void 0;
    y2(i4);
  }
  function g3(i4) {
    if (o3 !== this)
      throw new Error("Out-of-order effect");
    a3(this);
    o3 = i4;
    this.f &= -2;
    if (8 & this.f)
      _2(this);
    t3();
  }
  function b3(i4) {
    this.x = i4;
    this.u = void 0;
    this.s = void 0;
    this.o = void 0;
    this.f = 32;
  }
  b3.prototype.c = function() {
    var i4 = this.S();
    try {
      if (!(8 & this.f) && void 0 !== this.x)
        this.u = this.x();
    } finally {
      i4();
    }
  };
  b3.prototype.S = function() {
    if (1 & this.f)
      i3();
    this.f |= 1;
    this.f &= -9;
    y2(this);
    c3(this);
    s2++;
    var t4 = o3;
    o3 = this;
    return g3.bind(this, t4);
  };
  b3.prototype.N = function() {
    if (!(2 & this.f)) {
      this.f |= 2;
      this.o = r3;
      r3 = this;
    }
  };
  b3.prototype.d = function() {
    this.f |= 8;
    if (!(1 & this.f))
      _2(this);
  };
  function p2(i4) {
    var t4 = new b3(i4);
    try {
      t4.c();
    } catch (i5) {
      t4.d();
      throw i5;
    }
    return t4.d.bind(t4);
  }

  // node_modules/@preact/signals/dist/signals.module.js
  var c4;
  var v4;
  function s3(n3, i4) {
    l[n3] = i4.bind(null, l[n3] || function() {
    });
  }
  function l4(n3) {
    if (v4)
      v4();
    v4 = n3 && n3.S();
  }
  function d3(n3) {
    var r4 = this, t4 = n3.data, f4 = useSignal(t4);
    f4.value = t4;
    var o5 = F(function() {
      var n4 = r4.__v;
      while (n4 = n4.__)
        if (n4.__c) {
          n4.__c.__$f |= 4;
          break;
        }
      r4.__$u.c = function() {
        r4.base.data = o5.peek();
      };
      return w3(function() {
        var n5 = f4.value.value;
        return 0 === n5 ? 0 : true === n5 ? "" : n5 || "";
      });
    }, []);
    return o5.value;
  }
  d3.displayName = "_st";
  Object.defineProperties(e3.prototype, { constructor: { configurable: true, value: void 0 }, type: { configurable: true, value: d3 }, props: { configurable: true, get: function() {
    return { data: this };
  } }, __b: { configurable: true, value: 1 } });
  s3("__b", function(n3, r4) {
    if ("string" == typeof r4.type) {
      var i4, t4 = r4.props;
      for (var f4 in t4)
        if ("children" !== f4) {
          var e4 = t4[f4];
          if (e4 instanceof e3) {
            if (!i4)
              r4.__np = i4 = {};
            i4[f4] = e4;
            t4[f4] = e4.peek();
          }
        }
    }
    n3(r4);
  });
  s3("__r", function(n3, r4) {
    l4();
    var i4, t4 = r4.__c;
    if (t4) {
      t4.__$f &= -2;
      if (void 0 === (i4 = t4.__$u))
        t4.__$u = i4 = function(n4) {
          var r5;
          p2(function() {
            r5 = this;
          });
          r5.c = function() {
            t4.__$f |= 1;
            t4.setState({});
          };
          return r5;
        }();
    }
    c4 = t4;
    l4(i4);
    n3(r4);
  });
  s3("__e", function(n3, r4, i4, t4) {
    l4();
    c4 = void 0;
    n3(r4, i4, t4);
  });
  s3("diffed", function(n3, r4) {
    l4();
    c4 = void 0;
    var i4;
    if ("string" == typeof r4.type && (i4 = r4.__e)) {
      var t4 = r4.__np, f4 = r4.props;
      if (t4) {
        var o5 = i4.U;
        if (o5)
          for (var e4 in o5) {
            var u4 = o5[e4];
            if (void 0 !== u4 && !(e4 in t4)) {
              u4.d();
              o5[e4] = void 0;
            }
          }
        else
          i4.U = o5 = {};
        for (var a4 in t4) {
          var v5 = o5[a4], s4 = t4[a4];
          if (void 0 === v5) {
            v5 = p4(i4, a4, s4, f4);
            o5[a4] = v5;
          } else
            v5.o(s4, f4);
        }
      }
    }
    n3(r4);
  });
  function p4(n3, r4, i4, t4) {
    var f4 = r4 in n3 && void 0 === n3.ownerSVGElement, o5 = u3(i4);
    return { o: function(n4, r5) {
      o5.value = n4;
      t4 = r5;
    }, d: p2(function() {
      var i5 = o5.value.value;
      if (t4[r4] !== i5) {
        t4[r4] = i5;
        if (f4)
          n3[r4] = i5;
        else if (i5)
          n3.setAttribute(r4, i5);
        else
          n3.removeAttribute(r4);
      }
    }) };
  }
  s3("unmount", function(n3, r4) {
    if ("string" == typeof r4.type) {
      var i4 = r4.__e;
      if (i4) {
        var t4 = i4.U;
        if (t4) {
          i4.U = void 0;
          for (var f4 in t4) {
            var o5 = t4[f4];
            if (o5)
              o5.d();
          }
        }
      }
    } else {
      var e4 = r4.__c;
      if (e4) {
        var u4 = e4.__$u;
        if (u4) {
          e4.__$u = void 0;
          u4.d();
        }
      }
    }
    n3(r4);
  });
  s3("__h", function(n3, r4, i4, t4) {
    if (t4 < 3)
      r4.__$f |= 2;
    n3(r4, i4, t4);
  });
  k.prototype.shouldComponentUpdate = function(n3, r4) {
    var i4 = this.__$u;
    if (!(i4 && void 0 !== i4.s || 4 & this.__$f))
      return true;
    if (3 & this.__$f)
      return true;
    for (var t4 in r4)
      return true;
    for (var f4 in n3)
      if ("__source" !== f4 && n3[f4] !== this.props[f4])
        return true;
    for (var o5 in this.props)
      if (!(o5 in n3))
        return true;
    return false;
  };
  function useSignal(n3) {
    return F(function() {
      return u3(n3);
    }, []);
  }

  // node_modules/preact/jsx-runtime/dist/jsxRuntime.module.js
  var _4 = 0;
  function o4(o5, e4, n3, t4, f4, l5) {
    var s4, u4, a4 = {};
    for (u4 in e4)
      "ref" == u4 ? s4 = e4[u4] : a4[u4] = e4[u4];
    var i4 = { type: o5, props: a4, key: n3, ref: s4, __k: null, __: null, __b: 0, __e: null, __d: void 0, __c: null, __h: null, constructor: void 0, __v: --_4, __source: f4, __self: l5 };
    if ("function" == typeof o5 && (s4 = o5.defaultProps))
      for (u4 in s4)
        void 0 === a4[u4] && (a4[u4] = s4[u4]);
    return l.vnode && l.vnode(i4), i4;
  }

  // docs/src/demo.tsx
  var currentPage = u3(+new URLSearchParams(location.search).get("page") || 1);
  var pageCount = u3(20);
  var maxVisibleCount = u3(9);
  var pages = w3(
    () => JSON.stringify(paginatedPages(currentPage.value, pageCount.value, maxVisibleCount.value)).replaceAll(",", ", ")
  );
  var App = () => {
    return /* @__PURE__ */ o4(_, { children: [
      /* @__PURE__ */ o4("div", { style: "font-size: 40px; letter-spacing: -1px", children: [
        /* @__PURE__ */ o4("div", { style: "display: flex; align-items: flex-end", children: [
          "paginatedPages(",
          /* @__PURE__ */ o4("label", { children: [
            /* @__PURE__ */ o4("span", { children: "currentPage:" }),
            /* @__PURE__ */ o4("input", { name: "currentPage", type: "number", value: currentPage, readonly: true })
          ] }),
          ",\xA0",
          /* @__PURE__ */ o4("label", { children: [
            /* @__PURE__ */ o4("span", { children: "pageCount:" }),
            /* @__PURE__ */ o4(
              "input",
              {
                name: "pageCount",
                type: "number",
                min: "0",
                max: "9999",
                value: pageCount,
                onInput: (event) => pageCount.value = event.currentTarget.valueAsNumber
              }
            )
          ] }),
          ",\xA0",
          /* @__PURE__ */ o4("label", { children: [
            /* @__PURE__ */ o4("span", { children: "maxVisibleCount:" }),
            /* @__PURE__ */ o4(
              "input",
              {
                name: "maxVisibleCount",
                type: "number",
                min: "5",
                max: "20",
                value: maxVisibleCount,
                onInput: (event) => maxVisibleCount.value = event.currentTarget.valueAsNumber
              }
            )
          ] }),
          ")"
        ] }),
        /* @__PURE__ */ o4("div", { style: "text-align: right", children: [
          "=> ",
          pages
        ] })
      ] }),
      /* @__PURE__ */ o4("paginated-pages", { "page-count": pageCount, "current-page": currentPage, "max-visible-count": maxVisibleCount }),
      /* @__PURE__ */ o4("a", { style: "font-size: 24px", href: "https://github.com/luncheon/paginated-pages", children: "GitHub" })
    ] });
  };
  B(/* @__PURE__ */ o4(App, {}), document.body.appendChild(document.createElement("main")));
  addEventListener("page:changed", () => currentPage.value = +new URLSearchParams(location.search).get("page") || 1);
})();
