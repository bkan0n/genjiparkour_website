/*! @sentry/browser 7.60.0 (be788f0) | https://github.com/getsentry/sentry-javascript */
var Sentry = function(t) {
    class n {
        static __initStatic() {
            this.id = "Replay"
        }
        __init() {
            this.name = n.id
        }
        constructor(t) {
            n.prototype.__init.call(this),
            console.error("You are using new Replay() even though this bundle does not include replay.")
        }
        setupOnce() {}
        start() {}
        stop() {}
        flush() {}
    }
    n.__initStatic();
    class e {
        static __initStatic() {
            this.id = "BrowserTracing"
        }
        __init() {
            this.name = e.id
        }
        constructor(t) {
            e.prototype.__init.call(this),
            console.error("You are using new BrowserTracing() even though this bundle does not include tracing.")
        }
        setupOnce() {}
    }
    e.__initStatic();
    const r = Object.prototype.toString;
    function i(t) {
        switch (r.call(t)) {
        case "[object Error]":
        case "[object Exception]":
        case "[object DOMException]":
            return !0;
        default:
            return d(t, Error)
        }
    }
    function s(t, n) {
        return r.call(t) === `[object ${n}]`
    }
    function o(t) {
        return s(t, "ErrorEvent")
    }
    function c(t) {
        return s(t, "DOMError")
    }
    function u(t) {
        return s(t, "String")
    }
    function a(t) {
        return null === t || "object" != typeof t && "function" != typeof t
    }
    function f(t) {
        return s(t, "Object")
    }
    function h(t) {
        return "undefined" != typeof Event && d(t, Event)
    }
    function l(t) {
        return Boolean(t && t.then && "function" == typeof t.then)
    }
    function d(t, n) {
        try {
            return t instanceof n
        } catch (t) {
            return !1
        }
    }
    function p(t, n=0) {
        return "string" != typeof t || 0 === n || t.length <= n ? t : `${t.slice(0, n)}...`
    }
    function y(t, n) {
        if (!Array.isArray(t))
            return "";
        const e = [];
        for (let n = 0; n < t.length; n++) {
            const r = t[n];
            try {
                e.push(String(r))
            } catch (t) {
                e.push("[value cannot be serialized]")
            }
        }
        return e.join(n)
    }
    function m(t, n, e=!1) {
        return !!u(t) && (s(n, "RegExp") ? n.test(t) : !!u(n) && (e ? t === n : t.includes(n)))
    }
    function v(t, n=[], e=!1) {
        return n.some((n => m(t, n, e)))
    }
    function g(t, n, e=250, r, i, s, o) {
        if (!(s.exception && s.exception.values && o && d(o.originalException, Error)))
            return;
        const c = s.exception.values.length > 0 ? s.exception.values[s.exception.values.length - 1] : void 0;
        var u, a;
        c && (s.exception.values = (u = _(t, n, i, o.originalException, r, s.exception.values, c, 0),
        a = e,
        u.map((t => (t.value && (t.value = p(t.value, a)),
        t)))))
    }
    function _(t, n, e, r, i, s, o, c) {
        if (s.length >= e + 1)
            return s;
        let u = [...s];
        if (d(r[i], Error)) {
            b(o, c);
            const s = t(n, r[i])
              , a = u.length;
            w(s, i, a, c),
            u = _(t, n, e, r[i], i, [s, ...u], s, a)
        }
        return Array.isArray(r.errors) && r.errors.forEach(( (r, s) => {
            if (d(r, Error)) {
                b(o, c);
                const a = t(n, r)
                  , f = u.length;
                w(a, `errors[${s}]`, f, c),
                u = _(t, n, e, r, i, [a, ...u], a, f)
            }
        }
        )),
        u
    }
    function b(t, n) {
        t.mechanism = t.mechanism || {
            type: "generic",
            handled: !0
        },
        t.mechanism = {
            ...t.mechanism,
            is_exception_group: !0,
            exception_id: n
        }
    }
    function w(t, n, e, r) {
        t.mechanism = t.mechanism || {
            type: "generic",
            handled: !0
        },
        t.mechanism = {
            ...t.mechanism,
            type: "chained",
            source: n,
            exception_id: e,
            parent_id: r
        }
    }
    function E(t) {
        return t && t.Math == Math ? t : void 0
    }
    const $ = "object" == typeof globalThis && E(globalThis) || "object" == typeof window && E(window) || "object" == typeof self && E(self) || "object" == typeof global && E(global) || function() {
        return this
    }() || {};
    function S() {
        return $
    }
    function x(t, n, e) {
        const r = e || $
          , i = r.__SENTRY__ = r.__SENTRY__ || {};
        return i[t] || (i[t] = n())
    }
    const T = S();
    function k(t, n={}) {
        try {
            let e = t;
            const r = 5
              , i = [];
            let s = 0
              , o = 0;
            const c = " > "
              , u = c.length;
            let a;
            const f = Array.isArray(n) ? n : n.keyAttrs
              , h = !Array.isArray(n) && n.maxStringLength || 80;
            for (; e && s++ < r && (a = j(e, f),
            !("html" === a || s > 1 && o + i.length * u + a.length >= h)); )
                i.push(a),
                o += a.length,
                e = e.parentNode;
            return i.reverse().join(c)
        } catch (t) {
            return "<unknown>"
        }
    }
    function j(t, n) {
        const e = t
          , r = [];
        let i, s, o, c, a;
        if (!e || !e.tagName)
            return "";
        r.push(e.tagName.toLowerCase());
        const f = n && n.length ? n.filter((t => e.getAttribute(t))).map((t => [t, e.getAttribute(t)])) : null;
        if (f && f.length)
            f.forEach((t => {
                r.push(`[${t[0]}="${t[1]}"]`)
            }
            ));
        else if (e.id && r.push(`#${e.id}`),
        i = e.className,
        i && u(i))
            for (s = i.split(/\s+/),
            a = 0; a < s.length; a++)
                r.push(`.${s[a]}`);
        const h = ["aria-label", "type", "name", "title", "alt"];
        for (a = 0; a < h.length; a++)
            o = h[a],
            c = e.getAttribute(o),
            c && r.push(`[${o}="${c}"]`);
        return r.join("")
    }
    const O = ["debug", "info", "warn", "error", "log", "assert", "trace"];
    !function() {
        const t = {
            enable: () => {}
            ,
            disable: () => {}
        };
        O.forEach((n => {
            t[n] = () => {}
        }
        ))
    }();
    const D = /^(?:(\w+):)\/\/(?:(\w+)(?::(\w+)?)?@)([\w.-]+)(?::(\d+))?\/(.+)/;
    function R(t, n=!1) {
        const {host: e, path: r, pass: i, port: s, projectId: o, protocol: c, publicKey: u} = t;
        return `${c}://${u}${n && i ? `:${i}` : ""}@${e}${s ? `:${s}` : ""}/${r ? `${r}/` : r}${o}`
    }
    function I(t) {
        return {
            protocol: t.protocol,
            publicKey: t.publicKey || "",
            pass: t.pass || "",
            host: t.host,
            port: t.port || "",
            path: t.path || "",
            projectId: t.projectId
        }
    }
    function M(t) {
        const n = "string" == typeof t ? function(t) {
            const n = D.exec(t);
            if (!n)
                return void console.error(`Invalid Sentry Dsn: ${t}`);
            const [e,r,i="",s,o="",c] = n.slice(1);
            let u = ""
              , a = c;
            const f = a.split("/");
            if (f.length > 1 && (u = f.slice(0, -1).join("/"),
            a = f.pop()),
            a) {
                const t = a.match(/^\d+/);
                t && (a = t[0])
            }
            return I({
                host: s,
                pass: i,
                path: u,
                projectId: a,
                port: o,
                protocol: e,
                publicKey: r
            })
        }(t) : I(t);
        if (n)
            return n
    }
    class A extends Error {
        constructor(t, n="warn") {
            super(t),
            this.message = t,
            this.name = new.target.prototype.constructor.name,
            Object.setPrototypeOf(this, new.target.prototype),
            this.logLevel = n
        }
    }
    function C(t, n, e) {
        if (!(n in t))
            return;
        const r = t[n]
          , i = e(r);
        if ("function" == typeof i)
            try {
                N(i, r)
            } catch (t) {}
        t[n] = i
    }
    function L(t, n, e) {
        Object.defineProperty(t, n, {
            value: e,
            writable: !0,
            configurable: !0
        })
    }
    function N(t, n) {
        const e = n.prototype || {};
        t.prototype = n.prototype = e,
        L(t, "__sentry_original__", n)
    }
    function U(t) {
        return t.__sentry_original__
    }
    function q(t) {
        if (i(t))
            return {
                message: t.message,
                name: t.name,
                stack: t.stack,
                ...B(t)
            };
        if (h(t)) {
            const n = {
                type: t.type,
                target: P(t.target),
                currentTarget: P(t.currentTarget),
                ...B(t)
            };
            return "undefined" != typeof CustomEvent && d(t, CustomEvent) && (n.detail = t.detail),
            n
        }
        return t
    }
    function P(t) {
        try {
            return n = t,
            "undefined" != typeof Element && d(n, Element) ? k(t) : Object.prototype.toString.call(t)
        } catch (t) {
            return "<unknown>"
        }
        var n
    }
    function B(t) {
        if ("object" == typeof t && null !== t) {
            const n = {};
            for (const e in t)
                Object.prototype.hasOwnProperty.call(t, e) && (n[e] = t[e]);
            return n
        }
        return {}
    }
    function H(t) {
        return F(t, new Map)
    }
    function F(t, n) {
        if (f(t)) {
            const e = n.get(t);
            if (void 0 !== e)
                return e;
            const r = {};
            n.set(t, r);
            for (const e of Object.keys(t))
                void 0 !== t[e] && (r[e] = F(t[e], n));
            return r
        }
        if (Array.isArray(t)) {
            const e = n.get(t);
            if (void 0 !== e)
                return e;
            const r = [];
            return n.set(t, r),
            t.forEach((t => {
                r.push(F(t, n))
            }
            )),
            r
        }
        return t
    }
    const X = /\(error: (.*)\)/;
    function z(...t) {
        const n = t.sort(( (t, n) => t[0] - n[0])).map((t => t[1]));
        return (t, e=0) => {
            const r = []
              , i = t.split("\n");
            for (let t = e; t < i.length; t++) {
                const e = i[t];
                if (e.length > 1024)
                    continue;
                const s = X.test(e) ? e.replace(X, "$1") : e;
                if (!s.match(/\S*Error: /)) {
                    for (const t of n) {
                        const n = t(s);
                        if (n) {
                            r.push(n);
                            break
                        }
                    }
                    if (r.length >= 50)
                        break
                }
            }
            return function(t) {
                if (!t.length)
                    return [];
                const n = t.slice(0, 50)
                  , e = n[n.length - 1].function;
                e && /sentryWrapped/.test(e) && n.pop();
                n.reverse();
                const r = n[n.length - 1].function;
                r && /captureMessage|captureException/.test(r) && n.pop();
                return n.map((t => ({
                    ...t,
                    filename: t.filename || n[n.length - 1].filename,
                    function: t.function || "?"
                })))
            }(r)
        }
    }
    const W = "<anonymous>";
    function G(t) {
        try {
            return t && "function" == typeof t && t.name || W
        } catch (t) {
            return W
        }
    }
    const J = S();
    function K() {
        if (!("fetch"in J))
            return !1;
        try {
            return new Headers,
            new Request("http://www.example.com"),
            new Response,
            !0
        } catch (t) {
            return !1
        }
    }
    function Y(t) {
        return t && /^function fetch\(\)\s+\{\s+\[native code\]\s+\}$/.test(t.toString())
    }
    const V = S();
    const Q = S()
      , Z = {}
      , tt = {};
    function nt(t) {
        if (!tt[t])
            switch (tt[t] = !0,
            t) {
            case "console":
                !function() {
                    if (!("console"in Q))
                        return;
                    O.forEach((function(t) {
                        t in Q.console && C(Q.console, t, (function(n) {
                            return function(...e) {
                                rt("console", {
                                    args: e,
                                    level: t
                                }),
                                n && n.apply(Q.console, e)
                            }
                        }
                        ))
                    }
                    ))
                }();
                break;
            case "dom":
                !function() {
                    if (!("document"in Q))
                        return;
                    const t = rt.bind(null, "dom")
                      , n = at(t, !0);
                    Q.document.addEventListener("click", n, !1),
                    Q.document.addEventListener("keypress", n, !1),
                    ["EventTarget", "Node"].forEach((n => {
                        const e = Q[n] && Q[n].prototype;
                        e && e.hasOwnProperty && e.hasOwnProperty("addEventListener") && (C(e, "addEventListener", (function(n) {
                            return function(e, r, i) {
                                if ("click" === e || "keypress" == e)
                                    try {
                                        const r = this
                                          , s = r.__sentry_instrumentation_handlers__ = r.__sentry_instrumentation_handlers__ || {}
                                          , o = s[e] = s[e] || {
                                            refCount: 0
                                        };
                                        if (!o.handler) {
                                            const r = at(t);
                                            o.handler = r,
                                            n.call(this, e, r, i)
                                        }
                                        o.refCount++
                                    } catch (t) {}
                                return n.call(this, e, r, i)
                            }
                        }
                        )),
                        C(e, "removeEventListener", (function(t) {
                            return function(n, e, r) {
                                if ("click" === n || "keypress" == n)
                                    try {
                                        const e = this
                                          , i = e.__sentry_instrumentation_handlers__ || {}
                                          , s = i[n];
                                        s && (s.refCount--,
                                        s.refCount <= 0 && (t.call(this, n, s.handler, r),
                                        s.handler = void 0,
                                        delete i[n]),
                                        0 === Object.keys(i).length && delete e.__sentry_instrumentation_handlers__)
                                    } catch (t) {}
                                return t.call(this, n, e, r)
                            }
                        }
                        )))
                    }
                    ))
                }();
                break;
            case "xhr":
                !function() {
                    if (!("XMLHttpRequest"in Q))
                        return;
                    const t = XMLHttpRequest.prototype;
                    C(t, "open", (function(t) {
                        return function(...n) {
                            const e = n[1]
                              , r = this.__sentry_xhr_v2__ = {
                                method: u(n[0]) ? n[0].toUpperCase() : n[0],
                                url: n[1],
                                request_headers: {}
                            };
                            u(e) && "POST" === r.method && e.match(/sentry_key/) && (this.__sentry_own_request__ = !0);
                            const i = () => {
                                const t = this.__sentry_xhr_v2__;
                                if (t && 4 === this.readyState) {
                                    try {
                                        t.status_code = this.status
                                    } catch (t) {}
                                    rt("xhr", {
                                        args: n,
                                        endTimestamp: Date.now(),
                                        startTimestamp: Date.now(),
                                        xhr: this
                                    })
                                }
                            }
                            ;
                            return "onreadystatechange"in this && "function" == typeof this.onreadystatechange ? C(this, "onreadystatechange", (function(t) {
                                return function(...n) {
                                    return i(),
                                    t.apply(this, n)
                                }
                            }
                            )) : this.addEventListener("readystatechange", i),
                            C(this, "setRequestHeader", (function(t) {
                                return function(...n) {
                                    const [e,r] = n
                                      , i = this.__sentry_xhr_v2__;
                                    return i && (i.request_headers[e.toLowerCase()] = r),
                                    t.apply(this, n)
                                }
                            }
                            )),
                            t.apply(this, n)
                        }
                    }
                    )),
                    C(t, "send", (function(t) {
                        return function(...n) {
                            const e = this.__sentry_xhr_v2__;
                            return e && void 0 !== n[0] && (e.body = n[0]),
                            rt("xhr", {
                                args: n,
                                startTimestamp: Date.now(),
                                xhr: this
                            }),
                            t.apply(this, n)
                        }
                    }
                    ))
                }();
                break;
            case "fetch":
                !function() {
                    if (!function() {
                        if (!K())
                            return !1;
                        if (Y(J.fetch))
                            return !0;
                        let t = !1;
                        const n = J.document;
                        if (n && "function" == typeof n.createElement)
                            try {
                                const e = n.createElement("iframe");
                                e.hidden = !0,
                                n.head.appendChild(e),
                                e.contentWindow && e.contentWindow.fetch && (t = Y(e.contentWindow.fetch)),
                                n.head.removeChild(e)
                            } catch (t) {}
                        return t
                    }())
                        return;
                    C(Q, "fetch", (function(t) {
                        return function(...n) {
                            const {method: e, url: r} = function(t) {
                                if (0 === t.length)
                                    return {
                                        method: "GET",
                                        url: ""
                                    };
                                if (2 === t.length) {
                                    const [n,e] = t;
                                    return {
                                        url: st(n),
                                        method: it(e, "method") ? String(e.method).toUpperCase() : "GET"
                                    }
                                }
                                const n = t[0];
                                return {
                                    url: st(n),
                                    method: it(n, "method") ? String(n.method).toUpperCase() : "GET"
                                }
                            }(n)
                              , i = {
                                args: n,
                                fetchData: {
                                    method: e,
                                    url: r
                                },
                                startTimestamp: Date.now()
                            };
                            return rt("fetch", {
                                ...i
                            }),
                            t.apply(Q, n).then((t => (rt("fetch", {
                                ...i,
                                endTimestamp: Date.now(),
                                response: t
                            }),
                            t)), (t => {
                                throw rt("fetch", {
                                    ...i,
                                    endTimestamp: Date.now(),
                                    error: t
                                }),
                                t
                            }
                            ))
                        }
                    }
                    ))
                }();
                break;
            case "history":
                !function() {
                    if (!function() {
                        const t = V.chrome
                          , n = t && t.app && t.app.runtime
                          , e = "history"in V && !!V.history.pushState && !!V.history.replaceState;
                        return !n && e
                    }())
                        return;
                    const t = Q.onpopstate;
                    function n(t) {
                        return function(...n) {
                            const e = n.length > 2 ? n[2] : void 0;
                            if (e) {
                                const t = ot
                                  , n = String(e);
                                ot = n,
                                rt("history", {
                                    from: t,
                                    to: n
                                })
                            }
                            return t.apply(this, n)
                        }
                    }
                    Q.onpopstate = function(...n) {
                        const e = Q.location.href
                          , r = ot;
                        if (ot = e,
                        rt("history", {
                            from: r,
                            to: e
                        }),
                        t)
                            try {
                                return t.apply(this, n)
                            } catch (t) {}
                    }
                    ,
                    C(Q.history, "pushState", n),
                    C(Q.history, "replaceState", n)
                }();
                break;
            case "error":
                ft = Q.onerror,
                Q.onerror = function(t, n, e, r, i) {
                    return rt("error", {
                        column: r,
                        error: i,
                        line: e,
                        msg: t,
                        url: n
                    }),
                    !(!ft || ft.__SENTRY_LOADER__) && ft.apply(this, arguments)
                }
                ,
                Q.onerror.__SENTRY_INSTRUMENTED__ = !0;
                break;
            case "unhandledrejection":
                ht = Q.onunhandledrejection,
                Q.onunhandledrejection = function(t) {
                    return rt("unhandledrejection", t),
                    !(ht && !ht.__SENTRY_LOADER__) || ht.apply(this, arguments)
                }
                ,
                Q.onunhandledrejection.__SENTRY_INSTRUMENTED__ = !0;
                break;
            default:
                return
            }
    }
    function et(t, n) {
        Z[t] = Z[t] || [],
        Z[t].push(n),
        nt(t)
    }
    function rt(t, n) {
        if (t && Z[t])
            for (const e of Z[t] || [])
                try {
                    e(n)
                } catch (t) {}
    }
    function it(t, n) {
        return !!t && "object" == typeof t && !!t[n]
    }
    function st(t) {
        return "string" == typeof t ? t : t ? it(t, "url") ? t.url : t.toString ? t.toString() : "" : ""
    }
    let ot;
    let ct, ut;
    function at(t, n=!1) {
        return e => {
            if (!e || ut === e)
                return;
            if (function(t) {
                if ("keypress" !== t.type)
                    return !1;
                try {
                    const n = t.target;
                    if (!n || !n.tagName)
                        return !0;
                    if ("INPUT" === n.tagName || "TEXTAREA" === n.tagName || n.isContentEditable)
                        return !1
                } catch (t) {}
                return !0
            }(e))
                return;
            const r = "keypress" === e.type ? "input" : e.type;
            (void 0 === ct || function(t, n) {
                if (!t)
                    return !0;
                if (t.type !== n.type)
                    return !0;
                try {
                    if (t.target !== n.target)
                        return !0
                } catch (t) {}
                return !1
            }(ut, e)) && (t({
                event: e,
                name: r,
                global: n
            }),
            ut = e),
            clearTimeout(ct),
            ct = Q.setTimeout(( () => {
                ct = void 0
            }
            ), 1e3)
        }
    }
    let ft = null;
    let ht = null;
    function lt() {
        const t = $
          , n = t.crypto || t.msCrypto;
        if (n && n.randomUUID)
            return n.randomUUID().replace(/-/g, "");
        const e = n && n.getRandomValues ? () => n.getRandomValues(new Uint8Array(1))[0] : () => 16 * Math.random();
        return ([1e7] + 1e3 + 4e3 + 8e3 + 1e11).replace(/[018]/g, (t => (t ^ (15 & e()) >> t / 4).toString(16)))
    }
    function dt(t) {
        return t.exception && t.exception.values ? t.exception.values[0] : void 0
    }
    function pt(t) {
        const {message: n, event_id: e} = t;
        if (n)
            return n;
        const r = dt(t);
        return r ? r.type && r.value ? `${r.type}: ${r.value}` : r.type || r.value || e || "<unknown>" : e || "<unknown>"
    }
    function yt(t, n, e) {
        const r = t.exception = t.exception || {}
          , i = r.values = r.values || []
          , s = i[0] = i[0] || {};
        s.value || (s.value = n || ""),
        s.type || (s.type = e || "Error")
    }
    function mt(t, n) {
        const e = dt(t);
        if (!e)
            return;
        const r = e.mechanism;
        if (e.mechanism = {
            type: "generic",
            handled: !0,
            ...r,
            ...n
        },
        n && "data"in n) {
            const t = {
                ...r && r.data,
                ...n.data
            };
            e.mechanism.data = t
        }
    }
    function vt(t) {
        if (t && t.__sentry_captured__)
            return !0;
        try {
            L(t, "__sentry_captured__", !0)
        } catch (t) {}
        return !1
    }
    function gt(t) {
        return Array.isArray(t) ? t : [t]
    }
    function _t(t, n=100, e=1 / 0) {
        try {
            return wt("", t, n, e)
        } catch (t) {
            return {
                ERROR: `**non-serializable** (${t})`
            }
        }
    }
    function bt(t, n=3, e=102400) {
        const r = _t(t, n);
        return i = r,
        function(t) {
            return ~-encodeURI(t).split(/%..|./).length
        }(JSON.stringify(i)) > e ? bt(t, n - 1, e) : r;
        var i
    }
    function wt(t, n, e=1 / 0, r=1 / 0, i=function() {
        const t = "function" == typeof WeakSet
          , n = t ? new WeakSet : [];
        return [function(e) {
            if (t)
                return !!n.has(e) || (n.add(e),
                !1);
            for (let t = 0; t < n.length; t++)
                if (n[t] === e)
                    return !0;
            return n.push(e),
            !1
        }
        , function(e) {
            if (t)
                n.delete(e);
            else
                for (let t = 0; t < n.length; t++)
                    if (n[t] === e) {
                        n.splice(t, 1);
                        break
                    }
        }
        ]
    }()) {
        const [s,o] = i;
        if (null == n || ["number", "boolean", "string"].includes(typeof n) && ("number" != typeof (c = n) || c == c))
            return n;
        var c;
        const u = function(t, n) {
            try {
                if ("domain" === t && n && "object" == typeof n && n.t)
                    return "[Domain]";
                if ("domainEmitter" === t)
                    return "[DomainEmitter]";
                if ("undefined" != typeof global && n === global)
                    return "[Global]";
                if ("undefined" != typeof window && n === window)
                    return "[Window]";
                if ("undefined" != typeof document && n === document)
                    return "[Document]";
                if (function(t) {
                    return f(t) && "nativeEvent"in t && "preventDefault"in t && "stopPropagation"in t
                }(n))
                    return "[SyntheticEvent]";
                if ("number" == typeof n && n != n)
                    return "[NaN]";
                if ("function" == typeof n)
                    return `[Function: ${G(n)}]`;
                if ("symbol" == typeof n)
                    return `[${String(n)}]`;
                if ("bigint" == typeof n)
                    return `[BigInt: ${String(n)}]`;
                const e = function(t) {
                    const n = Object.getPrototypeOf(t);
                    return n ? n.constructor.name : "null prototype"
                }(n);
                return /^HTML(\w*)Element$/.test(e) ? `[HTMLElement: ${e}]` : `[object ${e}]`
            } catch (t) {
                return `**non-serializable** (${t})`
            }
        }(t, n);
        if (!u.startsWith("[object "))
            return u;
        if (n.__sentry_skip_normalization__)
            return n;
        const a = "number" == typeof n.__sentry_override_normalization_depth__ ? n.__sentry_override_normalization_depth__ : e;
        if (0 === a)
            return u.replace("object ", "");
        if (s(n))
            return "[Circular ~]";
        const h = n;
        if (h && "function" == typeof h.toJSON)
            try {
                return wt("", h.toJSON(), a - 1, r, i)
            } catch (t) {}
        const l = Array.isArray(n) ? [] : {};
        let d = 0;
        const p = q(n);
        for (const t in p) {
            if (!Object.prototype.hasOwnProperty.call(p, t))
                continue;
            if (d >= r) {
                l[t] = "[MaxProperties ~]";
                break
            }
            const n = p[t];
            l[t] = wt(t, n, a - 1, r, i),
            d++
        }
        return o(n),
        l
    }
    var Et;
    function $t(t) {
        return new xt((n => {
            n(t)
        }
        ))
    }
    function St(t) {
        return new xt(( (n, e) => {
            e(t)
        }
        ))
    }
    !function(t) {
        t[t.PENDING = 0] = "PENDING";
        t[t.RESOLVED = 1] = "RESOLVED";
        t[t.REJECTED = 2] = "REJECTED"
    }(Et || (Et = {}));
    class xt {
        __init() {
            this.i = Et.PENDING
        }
        __init2() {
            this.o = []
        }
        constructor(t) {
            xt.prototype.__init.call(this),
            xt.prototype.__init2.call(this),
            xt.prototype.__init3.call(this),
            xt.prototype.__init4.call(this),
            xt.prototype.__init5.call(this),
            xt.prototype.__init6.call(this);
            try {
                t(this.u, this.h)
            } catch (t) {
                this.h(t)
            }
        }
        then(t, n) {
            return new xt(( (e, r) => {
                this.o.push([!1, n => {
                    if (t)
                        try {
                            e(t(n))
                        } catch (t) {
                            r(t)
                        }
                    else
                        e(n)
                }
                , t => {
                    if (n)
                        try {
                            e(n(t))
                        } catch (t) {
                            r(t)
                        }
                    else
                        r(t)
                }
                ]),
                this.l()
            }
            ))
        }
        catch(t) {
            return this.then((t => t), t)
        }
        finally(t) {
            return new xt(( (n, e) => {
                let r, i;
                return this.then((n => {
                    i = !1,
                    r = n,
                    t && t()
                }
                ), (n => {
                    i = !0,
                    r = n,
                    t && t()
                }
                )).then(( () => {
                    i ? e(r) : n(r)
                }
                ))
            }
            ))
        }
        __init3() {
            this.u = t => {
                this.p(Et.RESOLVED, t)
            }
        }
        __init4() {
            this.h = t => {
                this.p(Et.REJECTED, t)
            }
        }
        __init5() {
            this.p = (t, n) => {
                this.i === Et.PENDING && (l(n) ? n.then(this.u, this.h) : (this.i = t,
                this.m = n,
                this.l()))
            }
        }
        __init6() {
            this.l = () => {
                if (this.i === Et.PENDING)
                    return;
                const t = this.o.slice();
                this.o = [],
                t.forEach((t => {
                    t[0] || (this.i === Et.RESOLVED && t[1](this.m),
                    this.i === Et.REJECTED && t[2](this.m),
                    t[0] = !0)
                }
                ))
            }
        }
    }
    function Tt(t) {
        const n = [];
        function e(t) {
            return n.splice(n.indexOf(t), 1)[0]
        }
        return {
            $: n,
            add: function(r) {
                if (!(void 0 === t || n.length < t))
                    return St(new A("Not adding Promise because buffer limit was reached."));
                const i = r();
                return -1 === n.indexOf(i) && n.push(i),
                i.then(( () => e(i))).then(null, ( () => e(i).then(null, ( () => {}
                )))),
                i
            },
            drain: function(t) {
                return new xt(( (e, r) => {
                    let i = n.length;
                    if (!i)
                        return e(!0);
                    const s = setTimeout(( () => {
                        t && t > 0 && e(!1)
                    }
                    ), t);
                    n.forEach((t => {
                        $t(t).then(( () => {
                            --i || (clearTimeout(s),
                            e(!0))
                        }
                        ), r)
                    }
                    ))
                }
                ))
            }
        }
    }
    function kt(t) {
        if (!t)
            return {};
        const n = t.match(/^(([^:/?#]+):)?(\/\/([^/?#]*))?([^?#]*)(\?([^#]*))?(#(.*))?$/);
        if (!n)
            return {};
        const e = n[6] || ""
          , r = n[8] || "";
        return {
            host: n[4],
            path: n[5],
            protocol: n[2],
            search: e,
            hash: r,
            relative: n[5] + e + r
        }
    }
    const jt = ["fatal", "error", "warning", "log", "info", "debug"];
    const Ot = S()
      , Dt = {
        nowSeconds: () => Date.now() / 1e3
    };
    const Rt = function() {
        const {performance: t} = Ot;
        if (!t || !t.now)
            return;
        return {
            now: () => t.now(),
            timeOrigin: Date.now() - t.now()
        }
    }()
      , It = void 0 === Rt ? Dt : {
        nowSeconds: () => (Rt.timeOrigin + Rt.now()) / 1e3
    }
      , Mt = Dt.nowSeconds.bind(Dt)
      , At = It.nowSeconds.bind(It);
    function Ct(t, n=[]) {
        return [t, n]
    }
    function Lt(t, n) {
        const [e,r] = t;
        return [e, [...r, n]]
    }
    function Nt(t, n) {
        const e = t[1];
        for (const t of e) {
            if (n(t, t[0].type))
                return !0
        }
        return !1
    }
    function Ut(t, n) {
        return (n || new TextEncoder).encode(t)
    }
    function qt(t, n) {
        const [e,r] = t;
        let i = JSON.stringify(e);
        function s(t) {
            "string" == typeof i ? i = "string" == typeof t ? i + t : [Ut(i, n), t] : i.push("string" == typeof t ? Ut(t, n) : t)
        }
        for (const t of r) {
            const [n,e] = t;
            if (s(`\n${JSON.stringify(n)}\n`),
            "string" == typeof e || e instanceof Uint8Array)
                s(e);
            else {
                let t;
                try {
                    t = JSON.stringify(e)
                } catch (n) {
                    t = JSON.stringify(_t(e))
                }
                s(t)
            }
        }
        return "string" == typeof i ? i : function(t) {
            const n = t.reduce(( (t, n) => t + n.length), 0)
              , e = new Uint8Array(n);
            let r = 0;
            for (const n of t)
                e.set(n, r),
                r += n.length;
            return e
        }(i)
    }
    function Pt(t, n) {
        const e = "string" == typeof t.data ? Ut(t.data, n) : t.data;
        return [H({
            type: "attachment",
            length: e.length,
            filename: t.filename,
            content_type: t.contentType,
            attachment_type: t.attachmentType
        }), e]
    }
    ( () => {
        const {performance: t} = Ot;
        if (!t || !t.now)
            return;
        const n = 36e5
          , e = t.now()
          , r = Date.now()
          , i = t.timeOrigin ? Math.abs(t.timeOrigin + e - r) : n
          , s = i < n
          , o = t.timing && t.timing.navigationStart
          , c = "number" == typeof o ? Math.abs(o + e - r) : n;
        (s || c < n) && (i <= c && t.timeOrigin)
    }
    )();
    const Bt = {
        session: "session",
        sessions: "session",
        attachment: "attachment",
        transaction: "transaction",
        event: "error",
        client_report: "internal",
        user_report: "default",
        profile: "profile",
        replay_event: "replay",
        replay_recording: "replay",
        check_in: "monitor"
    };
    function Ht(t) {
        return Bt[t]
    }
    function Ft(t) {
        if (!t || !t.sdk)
            return;
        const {name: n, version: e} = t.sdk;
        return {
            name: n,
            version: e
        }
    }
    function Xt(t, {statusCode: n, headers: e}, r=Date.now()) {
        const i = {
            ...t
        }
          , s = e && e["x-sentry-rate-limits"]
          , o = e && e["retry-after"];
        if (s)
            for (const t of s.trim().split(",")) {
                const [n,e] = t.split(":", 2)
                  , s = parseInt(n, 10)
                  , o = 1e3 * (isNaN(s) ? 60 : s);
                if (e)
                    for (const t of e.split(";"))
                        i[t] = r + o;
                else
                    i.all = r + o
            }
        else
            o ? i.all = r + function(t, n=Date.now()) {
                const e = parseInt(`${t}`, 10);
                if (!isNaN(e))
                    return 1e3 * e;
                const r = Date.parse(`${t}`);
                return isNaN(r) ? 6e4 : r - n
            }(o, r) : 429 === n && (i.all = r + 6e4);
        return i
    }
    const zt = "production";
    function Wt(t) {
        const n = At()
          , e = {
            sid: lt(),
            init: !0,
            timestamp: n,
            started: n,
            duration: 0,
            status: "ok",
            errors: 0,
            ignoreDuration: !1,
            toJSON: () => function(t) {
                return H({
                    sid: `${t.sid}`,
                    init: t.init,
                    started: new Date(1e3 * t.started).toISOString(),
                    timestamp: new Date(1e3 * t.timestamp).toISOString(),
                    status: t.status,
                    errors: t.errors,
                    did: "number" == typeof t.did || "string" == typeof t.did ? `${t.did}` : void 0,
                    duration: t.duration,
                    attrs: {
                        release: t.release,
                        environment: t.environment,
                        ip_address: t.ipAddress,
                        user_agent: t.userAgent
                    }
                })
            }(e)
        };
        return t && Gt(e, t),
        e
    }
    function Gt(t, n={}) {
        if (n.user && (!t.ipAddress && n.user.ip_address && (t.ipAddress = n.user.ip_address),
        t.did || n.did || (t.did = n.user.id || n.user.email || n.user.username)),
        t.timestamp = n.timestamp || At(),
        n.ignoreDuration && (t.ignoreDuration = n.ignoreDuration),
        n.sid && (t.sid = 32 === n.sid.length ? n.sid : lt()),
        void 0 !== n.init && (t.init = n.init),
        !t.did && n.did && (t.did = `${n.did}`),
        "number" == typeof n.started && (t.started = n.started),
        t.ignoreDuration)
            t.duration = void 0;
        else if ("number" == typeof n.duration)
            t.duration = n.duration;
        else {
            const n = t.timestamp - t.started;
            t.duration = n >= 0 ? n : 0
        }
        n.release && (t.release = n.release),
        n.environment && (t.environment = n.environment),
        !t.ipAddress && n.ipAddress && (t.ipAddress = n.ipAddress),
        !t.userAgent && n.userAgent && (t.userAgent = n.userAgent),
        "number" == typeof n.errors && (t.errors = n.errors),
        n.status && (t.status = n.status)
    }
    class Jt {
        constructor() {
            this.v = !1,
            this.g = [],
            this._ = [],
            this.S = [],
            this.T = [],
            this.k = {},
            this.j = {},
            this.O = {},
            this.D = {},
            this.R = {},
            this.I = Vt()
        }
        static clone(t) {
            const n = new Jt;
            return t && (n.S = [...t.S],
            n.j = {
                ...t.j
            },
            n.O = {
                ...t.O
            },
            n.D = {
                ...t.D
            },
            n.k = t.k,
            n.M = t.M,
            n.A = t.A,
            n.C = t.C,
            n.L = t.L,
            n.N = t.N,
            n._ = [...t._],
            n.U = t.U,
            n.T = [...t.T],
            n.R = {
                ...t.R
            },
            n.I = {
                ...t.I
            }),
            n
        }
        addScopeListener(t) {
            this.g.push(t)
        }
        addEventProcessor(t) {
            return this._.push(t),
            this
        }
        setUser(t) {
            return this.k = t || {},
            this.C && Gt(this.C, {
                user: t
            }),
            this.q(),
            this
        }
        getUser() {
            return this.k
        }
        getRequestSession() {
            return this.U
        }
        setRequestSession(t) {
            return this.U = t,
            this
        }
        setTags(t) {
            return this.j = {
                ...this.j,
                ...t
            },
            this.q(),
            this
        }
        setTag(t, n) {
            return this.j = {
                ...this.j,
                [t]: n
            },
            this.q(),
            this
        }
        setExtras(t) {
            return this.O = {
                ...this.O,
                ...t
            },
            this.q(),
            this
        }
        setExtra(t, n) {
            return this.O = {
                ...this.O,
                [t]: n
            },
            this.q(),
            this
        }
        setFingerprint(t) {
            return this.N = t,
            this.q(),
            this
        }
        setLevel(t) {
            return this.M = t,
            this.q(),
            this
        }
        setTransactionName(t) {
            return this.L = t,
            this.q(),
            this
        }
        setContext(t, n) {
            return null === n ? delete this.D[t] : this.D[t] = n,
            this.q(),
            this
        }
        setSpan(t) {
            return this.A = t,
            this.q(),
            this
        }
        getSpan() {
            return this.A
        }
        getTransaction() {
            const t = this.getSpan();
            return t && t.transaction
        }
        setSession(t) {
            return t ? this.C = t : delete this.C,
            this.q(),
            this
        }
        getSession() {
            return this.C
        }
        update(t) {
            if (!t)
                return this;
            if ("function" == typeof t) {
                const n = t(this);
                return n instanceof Jt ? n : this
            }
            return t instanceof Jt ? (this.j = {
                ...this.j,
                ...t.j
            },
            this.O = {
                ...this.O,
                ...t.O
            },
            this.D = {
                ...this.D,
                ...t.D
            },
            t.k && Object.keys(t.k).length && (this.k = t.k),
            t.M && (this.M = t.M),
            t.N && (this.N = t.N),
            t.U && (this.U = t.U),
            t.I && (this.I = t.I)) : f(t) && (t = t,
            this.j = {
                ...this.j,
                ...t.tags
            },
            this.O = {
                ...this.O,
                ...t.extra
            },
            this.D = {
                ...this.D,
                ...t.contexts
            },
            t.user && (this.k = t.user),
            t.level && (this.M = t.level),
            t.fingerprint && (this.N = t.fingerprint),
            t.requestSession && (this.U = t.requestSession),
            t.propagationContext && (this.I = t.propagationContext)),
            this
        }
        clear() {
            return this.S = [],
            this.j = {},
            this.O = {},
            this.k = {},
            this.D = {},
            this.M = void 0,
            this.L = void 0,
            this.N = void 0,
            this.U = void 0,
            this.A = void 0,
            this.C = void 0,
            this.q(),
            this.T = [],
            this.I = Vt(),
            this
        }
        addBreadcrumb(t, n) {
            const e = "number" == typeof n ? n : 100;
            if (e <= 0)
                return this;
            const r = {
                timestamp: Mt(),
                ...t
            };
            return this.S = [...this.S, r].slice(-e),
            this.q(),
            this
        }
        getLastBreadcrumb() {
            return this.S[this.S.length - 1]
        }
        clearBreadcrumbs() {
            return this.S = [],
            this.q(),
            this
        }
        addAttachment(t) {
            return this.T.push(t),
            this
        }
        getAttachments() {
            return this.T
        }
        clearAttachments() {
            return this.T = [],
            this
        }
        applyToEvent(t, n={}) {
            if (this.O && Object.keys(this.O).length && (t.extra = {
                ...this.O,
                ...t.extra
            }),
            this.j && Object.keys(this.j).length && (t.tags = {
                ...this.j,
                ...t.tags
            }),
            this.k && Object.keys(this.k).length && (t.user = {
                ...this.k,
                ...t.user
            }),
            this.D && Object.keys(this.D).length && (t.contexts = {
                ...this.D,
                ...t.contexts
            }),
            this.M && (t.level = this.M),
            this.L && (t.transaction = this.L),
            this.A) {
                t.contexts = {
                    trace: this.A.getTraceContext(),
                    ...t.contexts
                };
                const n = this.A.transaction;
                if (n) {
                    t.sdkProcessingMetadata = {
                        dynamicSamplingContext: n.getDynamicSamplingContext(),
                        ...t.sdkProcessingMetadata
                    };
                    const e = n.name;
                    e && (t.tags = {
                        transaction: e,
                        ...t.tags
                    })
                }
            }
            return this.P(t),
            t.breadcrumbs = [...t.breadcrumbs || [], ...this.S],
            t.breadcrumbs = t.breadcrumbs.length > 0 ? t.breadcrumbs : void 0,
            t.sdkProcessingMetadata = {
                ...t.sdkProcessingMetadata,
                ...this.R,
                propagationContext: this.I
            },
            this.B([...Kt(), ...this._], t, n)
        }
        setSDKProcessingMetadata(t) {
            return this.R = {
                ...this.R,
                ...t
            },
            this
        }
        setPropagationContext(t) {
            return this.I = t,
            this
        }
        getPropagationContext() {
            return this.I
        }
        B(t, n, e, r=0) {
            return new xt(( (i, s) => {
                const o = t[r];
                if (null === n || "function" != typeof o)
                    i(n);
                else {
                    const c = o({
                        ...n
                    }, e);
                    l(c) ? c.then((n => this.B(t, n, e, r + 1).then(i))).then(null, s) : this.B(t, c, e, r + 1).then(i).then(null, s)
                }
            }
            ))
        }
        q() {
            this.v || (this.v = !0,
            this.g.forEach((t => {
                t(this)
            }
            )),
            this.v = !1)
        }
        P(t) {
            t.fingerprint = t.fingerprint ? gt(t.fingerprint) : [],
            this.N && (t.fingerprint = t.fingerprint.concat(this.N)),
            t.fingerprint && !t.fingerprint.length && delete t.fingerprint
        }
    }
    function Kt() {
        return x("globalEventProcessors", ( () => []))
    }
    function Yt(t) {
        Kt().push(t)
    }
    function Vt() {
        return {
            traceId: lt(),
            spanId: lt().substring(16),
            sampled: !1
        }
    }
    const Qt = 100;
    class Zt {
        constructor(t, n=new Jt, e=4) {
            this.H = e,
            this.F = [{
                scope: n
            }],
            t && this.bindClient(t)
        }
        isOlderThan(t) {
            return this.H < t
        }
        bindClient(t) {
            this.getStackTop().client = t,
            t && t.setupIntegrations && t.setupIntegrations()
        }
        pushScope() {
            const t = Jt.clone(this.getScope());
            return this.getStack().push({
                client: this.getClient(),
                scope: t
            }),
            t
        }
        popScope() {
            return !(this.getStack().length <= 1) && !!this.getStack().pop()
        }
        withScope(t) {
            const n = this.pushScope();
            try {
                t(n)
            } finally {
                this.popScope()
            }
        }
        getClient() {
            return this.getStackTop().client
        }
        getScope() {
            return this.getStackTop().scope
        }
        getStack() {
            return this.F
        }
        getStackTop() {
            return this.F[this.F.length - 1]
        }
        captureException(t, n) {
            const e = this.X = n && n.event_id ? n.event_id : lt()
              , r = new Error("Sentry syntheticException");
            return this.W(( (i, s) => {
                i.captureException(t, {
                    originalException: t,
                    syntheticException: r,
                    ...n,
                    event_id: e
                }, s)
            }
            )),
            e
        }
        captureMessage(t, n, e) {
            const r = this.X = e && e.event_id ? e.event_id : lt()
              , i = new Error(t);
            return this.W(( (s, o) => {
                s.captureMessage(t, n, {
                    originalException: t,
                    syntheticException: i,
                    ...e,
                    event_id: r
                }, o)
            }
            )),
            r
        }
        captureEvent(t, n) {
            const e = n && n.event_id ? n.event_id : lt();
            return t.type || (this.X = e),
            this.W(( (r, i) => {
                r.captureEvent(t, {
                    ...n,
                    event_id: e
                }, i)
            }
            )),
            e
        }
        lastEventId() {
            return this.X
        }
        addBreadcrumb(t, n) {
            const {scope: e, client: r} = this.getStackTop();
            if (!r)
                return;
            const {beforeBreadcrumb: i=null, maxBreadcrumbs: s=Qt} = r.getOptions && r.getOptions() || {};
            if (s <= 0)
                return;
            const o = {
                timestamp: Mt(),
                ...t
            }
              , c = i ? function(t) {
                if (!("console"in $))
                    return t();
                const n = $.console
                  , e = {};
                O.forEach((t => {
                    const r = n[t] && n[t].__sentry_original__;
                    t in n && r && (e[t] = n[t],
                    n[t] = r)
                }
                ));
                try {
                    return t()
                } finally {
                    Object.keys(e).forEach((t => {
                        n[t] = e[t]
                    }
                    ))
                }
            }(( () => i(o, n))) : o;
            null !== c && (r.emit && r.emit("beforeAddBreadcrumb", c, n),
            e.addBreadcrumb(c, s))
        }
        setUser(t) {
            this.getScope().setUser(t)
        }
        setTags(t) {
            this.getScope().setTags(t)
        }
        setExtras(t) {
            this.getScope().setExtras(t)
        }
        setTag(t, n) {
            this.getScope().setTag(t, n)
        }
        setExtra(t, n) {
            this.getScope().setExtra(t, n)
        }
        setContext(t, n) {
            this.getScope().setContext(t, n)
        }
        configureScope(t) {
            const {scope: n, client: e} = this.getStackTop();
            e && t(n)
        }
        run(t) {
            const n = nn(this);
            try {
                t(this)
            } finally {
                nn(n)
            }
        }
        getIntegration(t) {
            const n = this.getClient();
            if (!n)
                return null;
            try {
                return n.getIntegration(t)
            } catch (t) {
                return null
            }
        }
        startTransaction(t, n) {
            return this.G("startTransaction", t, n)
        }
        traceHeaders() {
            return this.G("traceHeaders")
        }
        captureSession(t=!1) {
            if (t)
                return this.endSession();
            this.J()
        }
        endSession() {
            const t = this.getStackTop().scope
              , n = t.getSession();
            n && function(t, n) {
                let e = {};
                n ? e = {
                    status: n
                } : "ok" === t.status && (e = {
                    status: "exited"
                }),
                Gt(t, e)
            }(n),
            this.J(),
            t.setSession()
        }
        startSession(t) {
            const {scope: n, client: e} = this.getStackTop()
              , {release: r, environment: i=zt} = e && e.getOptions() || {}
              , {userAgent: s} = $.navigator || {}
              , o = Wt({
                release: r,
                environment: i,
                user: n.getUser(),
                ...s && {
                    userAgent: s
                },
                ...t
            })
              , c = n.getSession && n.getSession();
            return c && "ok" === c.status && Gt(c, {
                status: "exited"
            }),
            this.endSession(),
            n.setSession(o),
            o
        }
        shouldSendDefaultPii() {
            const t = this.getClient()
              , n = t && t.getOptions();
            return Boolean(n && n.sendDefaultPii)
        }
        J() {
            const {scope: t, client: n} = this.getStackTop()
              , e = t.getSession();
            e && n && n.captureSession && n.captureSession(e)
        }
        W(t) {
            const {scope: n, client: e} = this.getStackTop();
            e && t(e, n)
        }
        G(t, ...n) {
            const e = tn().__SENTRY__;
            if (e && e.extensions && "function" == typeof e.extensions[t])
                return e.extensions[t].apply(this, n)
        }
    }
    function tn() {
        return $.__SENTRY__ = $.__SENTRY__ || {
            extensions: {},
            hub: void 0
        },
        $
    }
    function nn(t) {
        const n = tn()
          , e = rn(n);
        return sn(n, t),
        e
    }
    function en() {
        const t = tn();
        if (t.__SENTRY__ && t.__SENTRY__.acs) {
            const n = t.__SENTRY__.acs.getCurrentHub();
            if (n)
                return n
        }
        return function(t=tn()) {
            n = t,
            n && n.__SENTRY__ && n.__SENTRY__.hub && !rn(t).isOlderThan(4) || sn(t, new Zt);
            var n;
            return rn(t)
        }(t)
    }
    function rn(t) {
        return x("hub", ( () => new Zt), t)
    }
    function sn(t, n) {
        if (!t)
            return !1;
        return (t.__SENTRY__ = t.__SENTRY__ || {}).hub = n,
        !0
    }
    function captureException(t, n) {
        return en().captureException(t, {
            captureContext: n
        })
    }
    function on(t) {
        en().withScope(t)
    }
    function cn(t) {
        const n = t.protocol ? `${t.protocol}:` : ""
          , e = t.port ? `:${t.port}` : "";
        return `${n}//${t.host}${e}${t.path ? `/${t.path}` : ""}/api/`
    }
    function un(t, n) {
        return e = {
            sentry_key: t.publicKey,
            sentry_version: "7",
            ...n && {
                sentry_client: `${n.name}/${n.version}`
            }
        },
        Object.keys(e).map((t => `${encodeURIComponent(t)}=${encodeURIComponent(e[t])}`)).join("&");
        var e
    }
    function an(t, n={}) {
        const e = "string" == typeof n ? n : n.tunnel
          , r = "string" != typeof n && n.K ? n.K.sdk : void 0;
        return e || `${function(t) {
            return `${cn(t)}${t.projectId}/envelope/`
        }(t)}?${un(t, r)}`
    }
    function fn(t, n, e, r) {
        const i = Ft(e)
          , s = t.type && "replay_event" !== t.type ? t.type : "event";
        !function(t, n) {
            n && (t.sdk = t.sdk || {},
            t.sdk.name = t.sdk.name || n.name,
            t.sdk.version = t.sdk.version || n.version,
            t.sdk.integrations = [...t.sdk.integrations || [], ...n.integrations || []],
            t.sdk.packages = [...t.sdk.packages || [], ...n.packages || []])
        }(t, e && e.sdk);
        const o = function(t, n, e, r) {
            const i = t.sdkProcessingMetadata && t.sdkProcessingMetadata.dynamicSamplingContext;
            return {
                event_id: t.event_id,
                sent_at: (new Date).toISOString(),
                ...n && {
                    sdk: n
                },
                ...!!e && {
                    dsn: R(r)
                },
                ...i && {
                    trace: H({
                        ...i
                    })
                }
            }
        }(t, i, r, n);
        delete t.sdkProcessingMetadata;
        return Ct(o, [[{
            type: s
        }, t]])
    }
    const hn = [];
    function ln(t) {
        const n = t.defaultIntegrations || []
          , e = t.integrations;
        let r;
        n.forEach((t => {
            t.isDefaultInstance = !0
        }
        )),
        r = Array.isArray(e) ? [...n, ...e] : "function" == typeof e ? gt(e(n)) : n;
        const i = function(t) {
            const n = {};
            return t.forEach((t => {
                const {name: e} = t
                  , r = n[e];
                r && !r.isDefaultInstance && t.isDefaultInstance || (n[e] = t)
            }
            )),
            Object.keys(n).map((t => n[t]))
        }(r)
          , s = function(t, n) {
            for (let e = 0; e < t.length; e++)
                if (!0 === n(t[e]))
                    return e;
            return -1
        }(i, (t => "Debug" === t.name));
        if (-1 !== s) {
            const [t] = i.splice(s, 1);
            i.push(t)
        }
        return i
    }
    function dn(t, n) {
        n[t.name] = t,
        -1 === hn.indexOf(t.name) && (t.setupOnce(Yt, en),
        hn.push(t.name))
    }
    function pn(t, n, e, r) {
        const {normalizeDepth: i=3, normalizeMaxBreadth: s=1e3} = t
          , o = {
            ...n,
            event_id: n.event_id || e.event_id || lt(),
            timestamp: n.timestamp || Mt()
        }
          , c = e.integrations || t.integrations.map((t => t.name));
        !function(t, n) {
            const {environment: e, release: r, dist: i, maxValueLength: s=250} = n;
            "environment"in t || (t.environment = "environment"in n ? e : zt);
            void 0 === t.release && void 0 !== r && (t.release = r);
            void 0 === t.dist && void 0 !== i && (t.dist = i);
            t.message && (t.message = p(t.message, s));
            const o = t.exception && t.exception.values && t.exception.values[0];
            o && o.value && (o.value = p(o.value, s));
            const c = t.request;
            c && c.url && (c.url = p(c.url, s))
        }(o, t),
        function(t, n) {
            n.length > 0 && (t.sdk = t.sdk || {},
            t.sdk.integrations = [...t.sdk.integrations || [], ...n])
        }(o, c),
        void 0 === n.type && function(t, n) {
            const e = $._sentryDebugIds;
            if (!e)
                return;
            let r;
            const i = yn.get(n);
            i ? r = i : (r = new Map,
            yn.set(n, r));
            const s = Object.keys(e).reduce(( (t, i) => {
                let s;
                const o = r.get(i);
                o ? s = o : (s = n(i),
                r.set(i, s));
                for (let n = s.length - 1; n >= 0; n--) {
                    const r = s[n];
                    if (r.filename) {
                        t[r.filename] = e[i];
                        break
                    }
                }
                return t
            }
            ), {});
            try {
                t.exception.values.forEach((t => {
                    t.stacktrace.frames.forEach((t => {
                        t.filename && (t.debug_id = s[t.filename])
                    }
                    ))
                }
                ))
            } catch (t) {}
        }(o, t.stackParser);
        let u = r;
        e.captureContext && (u = Jt.clone(u).update(e.captureContext));
        let a = $t(o);
        if (u) {
            if (u.getAttachments) {
                const t = [...e.attachments || [], ...u.getAttachments()];
                t.length && (e.attachments = t)
            }
            a = u.applyToEvent(o, e)
        }
        return a.then((t => (t && function(t) {
            const n = {};
            try {
                t.exception.values.forEach((t => {
                    t.stacktrace.frames.forEach((t => {
                        t.debug_id && (t.abs_path ? n[t.abs_path] = t.debug_id : t.filename && (n[t.filename] = t.debug_id),
                        delete t.debug_id)
                    }
                    ))
                }
                ))
            } catch (t) {}
            if (0 === Object.keys(n).length)
                return;
            t.debug_meta = t.debug_meta || {},
            t.debug_meta.images = t.debug_meta.images || [];
            const e = t.debug_meta.images;
            Object.keys(n).forEach((t => {
                e.push({
                    type: "sourcemap",
                    code_file: t,
                    debug_id: n[t]
                })
            }
            ))
        }(t),
        "number" == typeof i && i > 0 ? function(t, n, e) {
            if (!t)
                return null;
            const r = {
                ...t,
                ...t.breadcrumbs && {
                    breadcrumbs: t.breadcrumbs.map((t => ({
                        ...t,
                        ...t.data && {
                            data: _t(t.data, n, e)
                        }
                    })))
                },
                ...t.user && {
                    user: _t(t.user, n, e)
                },
                ...t.contexts && {
                    contexts: _t(t.contexts, n, e)
                },
                ...t.extra && {
                    extra: _t(t.extra, n, e)
                }
            };
            t.contexts && t.contexts.trace && r.contexts && (r.contexts.trace = t.contexts.trace,
            t.contexts.trace.data && (r.contexts.trace.data = _t(t.contexts.trace.data, n, e)));
            t.spans && (r.spans = t.spans.map((t => (t.data && (t.data = _t(t.data, n, e)),
            t))));
            return r
        }(t, i, s) : t)))
    }
    const yn = new WeakMap;
    class mn {
        __init() {
            this._integrations = {}
        }
        __init2() {
            this.Y = !1
        }
        __init3() {
            this.V = 0
        }
        __init4() {
            this.Z = {}
        }
        __init5() {
            this.tt = {}
        }
        constructor(t) {
            if (mn.prototype.__init.call(this),
            mn.prototype.__init2.call(this),
            mn.prototype.__init3.call(this),
            mn.prototype.__init4.call(this),
            mn.prototype.__init5.call(this),
            this.nt = t,
            t.dsn && (this.et = M(t.dsn)),
            this.et) {
                const n = an(this.et, t);
                this.rt = t.transport({
                    recordDroppedEvent: this.recordDroppedEvent.bind(this),
                    ...t.transportOptions,
                    url: n
                })
            }
        }
        captureException(t, n, e) {
            if (vt(t))
                return;
            let r = n && n.event_id;
            return this.it(this.eventFromException(t, n).then((t => this.st(t, n, e))).then((t => {
                r = t
            }
            ))),
            r
        }
        captureMessage(t, n, e, r) {
            let i = e && e.event_id;
            const s = a(t) ? this.eventFromMessage(String(t), n, e) : this.eventFromException(t, e);
            return this.it(s.then((t => this.st(t, e, r))).then((t => {
                i = t
            }
            ))),
            i
        }
        captureEvent(t, n, e) {
            if (n && n.originalException && vt(n.originalException))
                return;
            let r = n && n.event_id;
            return this.it(this.st(t, n, e).then((t => {
                r = t
            }
            ))),
            r
        }
        captureSession(t) {
            this.ot() && ("string" != typeof t.release || (this.sendSession(t),
            Gt(t, {
                init: !1
            })))
        }
        getDsn() {
            return this.et
        }
        getOptions() {
            return this.nt
        }
        getSdkMetadata() {
            return this.nt.K
        }
        getTransport() {
            return this.rt
        }
        flush(t) {
            const n = this.rt;
            return n ? this.ct(t).then((e => n.flush(t).then((t => e && t)))) : $t(!0)
        }
        close(t) {
            return this.flush(t).then((t => (this.getOptions().enabled = !1,
            t)))
        }
        setupIntegrations() {
            this.ot() && !this.Y && (this._integrations = function(t) {
                const n = {};
                return t.forEach((t => {
                    t && dn(t, n)
                }
                )),
                n
            }(this.nt.integrations),
            this.Y = !0)
        }
        getIntegrationById(t) {
            return this._integrations[t]
        }
        getIntegration(t) {
            try {
                return this._integrations[t.id] || null
            } catch (t) {
                return null
            }
        }
        addIntegration(t) {
            dn(t, this._integrations)
        }
        sendEvent(t, n={}) {
            if (this.et) {
                let e = fn(t, this.et, this.nt.K, this.nt.tunnel);
                for (const t of n.attachments || [])
                    e = Lt(e, Pt(t, this.nt.transportOptions && this.nt.transportOptions.textEncoder));
                const r = this.ut(e);
                r && r.then((n => this.emit("afterSendEvent", t, n)), null)
            }
        }
        sendSession(t) {
            if (this.et) {
                const n = function(t, n, e, r) {
                    const i = Ft(e);
                    return Ct({
                        sent_at: (new Date).toISOString(),
                        ...i && {
                            sdk: i
                        },
                        ...!!r && {
                            dsn: R(n)
                        }
                    }, ["aggregates"in t ? [{
                        type: "sessions"
                    }, t] : [{
                        type: "session"
                    }, t.toJSON()]])
                }(t, this.et, this.nt.K, this.nt.tunnel);
                this.ut(n)
            }
        }
        recordDroppedEvent(t, n, e) {
            if (this.nt.sendClientReports) {
                const e = `${t}:${n}`;
                this.Z[e] = this.Z[e] + 1 || 1
            }
        }
        on(t, n) {
            this.tt[t] || (this.tt[t] = []),
            this.tt[t].push(n)
        }
        emit(t, ...n) {
            this.tt[t] && this.tt[t].forEach((t => t(...n)))
        }
        ft(t, n) {
            let e = !1
              , r = !1;
            const i = n.exception && n.exception.values;
            if (i) {
                r = !0;
                for (const t of i) {
                    const n = t.mechanism;
                    if (n && !1 === n.handled) {
                        e = !0;
                        break
                    }
                }
            }
            const s = "ok" === t.status;
            (s && 0 === t.errors || s && e) && (Gt(t, {
                ...e && {
                    status: "crashed"
                },
                errors: t.errors || Number(r || e)
            }),
            this.captureSession(t))
        }
        ct(t) {
            return new xt((n => {
                let e = 0;
                const r = setInterval(( () => {
                    0 == this.V ? (clearInterval(r),
                    n(!0)) : (e += 1,
                    t && e >= t && (clearInterval(r),
                    n(!1)))
                }
                ), 1)
            }
            ))
        }
        ot() {
            return !1 !== this.getOptions().enabled && void 0 !== this.et
        }
        ht(t, n, e) {
            const r = this.getOptions()
              , i = Object.keys(this._integrations);
            return !n.integrations && i.length > 0 && (n.integrations = i),
            pn(r, t, n, e).then((t => {
                if (null === t)
                    return t;
                const {propagationContext: n} = t.sdkProcessingMetadata || {};
                if (!(t.contexts && t.contexts.trace) && n) {
                    const {traceId: r, spanId: i, parentSpanId: s, dsc: o} = n;
                    t.contexts = {
                        trace: {
                            trace_id: r,
                            span_id: i,
                            parent_span_id: s
                        },
                        ...t.contexts
                    };
                    const c = o || function(t, n, e) {
                        const r = n.getOptions()
                          , {publicKey: i} = n.getDsn() || {}
                          , {segment: s} = e && e.getUser() || {}
                          , o = H({
                            environment: r.environment || zt,
                            release: r.release,
                            user_segment: s,
                            public_key: i,
                            trace_id: t
                        });
                        return n.emit && n.emit("createDsc", o),
                        o
                    }(r, this, e);
                    t.sdkProcessingMetadata = {
                        dynamicSamplingContext: c,
                        ...t.sdkProcessingMetadata
                    }
                }
                return t
            }
            ))
        }
        st(t, n={}, e) {
            return this.lt(t, n, e).then((t => t.event_id), (t => {}
            ))
        }
        lt(t, n, e) {
            const r = this.getOptions()
              , {sampleRate: i} = r;
            if (!this.ot())
                return St(new A("SDK not enabled, will not capture event.","log"));
            const s = gn(t)
              , o = vn(t)
              , c = t.type || "error"
              , u = `before send for type \`${c}\``;
            if (o && "number" == typeof i && Math.random() > i)
                return this.recordDroppedEvent("sample_rate", "error", t),
                St(new A(`Discarding event because it's not included in the random sample (sampling rate = ${i})`,"log"));
            const a = "replay_event" === c ? "replay" : c;
            return this.ht(t, n, e).then((e => {
                if (null === e)
                    throw this.recordDroppedEvent("event_processor", a, t),
                    new A("An event processor returned `null`, will not send event.","log");
                if (n.data && !0 === n.data.__sentry__)
                    return e;
                const i = function(t, n, e) {
                    const {beforeSend: r, beforeSendTransaction: i} = t;
                    if (vn(n) && r)
                        return r(n, e);
                    if (gn(n) && i)
                        return i(n, e);
                    return n
                }(r, e, n);
                return function(t, n) {
                    const e = `${n} must return \`null\` or a valid event.`;
                    if (l(t))
                        return t.then((t => {
                            if (!f(t) && null !== t)
                                throw new A(e);
                            return t
                        }
                        ), (t => {
                            throw new A(`${n} rejected with ${t}`)
                        }
                        ));
                    if (!f(t) && null !== t)
                        throw new A(e);
                    return t
                }(i, u)
            }
            )).then((r => {
                if (null === r)
                    throw this.recordDroppedEvent("before_send", a, t),
                    new A(`${u} returned \`null\`, will not send event.`,"log");
                const i = e && e.getSession();
                !s && i && this.ft(i, r);
                const o = r.transaction_info;
                if (s && o && r.transaction !== t.transaction) {
                    const t = "custom";
                    r.transaction_info = {
                        ...o,
                        source: t
                    }
                }
                return this.sendEvent(r, n),
                r
            }
            )).then(null, (t => {
                if (t instanceof A)
                    throw t;
                throw this.captureException(t, {
                    data: {
                        __sentry__: !0
                    },
                    originalException: t
                }),
                new A(`Event processing pipeline threw an error, original event will not be sent. Details have been sent as a new event.\nReason: ${t}`)
            }
            ))
        }
        it(t) {
            this.V++,
            t.then((t => (this.V--,
            t)), (t => (this.V--,
            t)))
        }
        ut(t) {
            if (this.rt && this.et)
                return this.emit("beforeEnvelope", t),
                this.rt.send(t).then(null, (t => {}
                ))
        }
        dt() {
            const t = this.Z;
            return this.Z = {},
            Object.keys(t).map((n => {
                const [e,r] = n.split(":");
                return {
                    reason: e,
                    category: r,
                    quantity: t[n]
                }
            }
            ))
        }
    }
    function vn(t) {
        return void 0 === t.type
    }
    function gn(t) {
        return "transaction" === t.type
    }
    function _n(t, n, e=Tt(t.bufferSize || 30)) {
        let r = {};
        function i(i) {
            const s = [];
            if (Nt(i, ( (n, e) => {
                const i = Ht(e);
                if (function(t, n, e=Date.now()) {
                    return function(t, n) {
                        return t[n] || t.all || 0
                    }(t, n) > e
                }(r, i)) {
                    const r = bn(n, e);
                    t.recordDroppedEvent("ratelimit_backoff", i, r)
                } else
                    s.push(n)
            }
            )),
            0 === s.length)
                return $t();
            const o = Ct(i[0], s)
              , c = n => {
                Nt(o, ( (e, r) => {
                    const i = bn(e, r);
                    t.recordDroppedEvent(n, Ht(r), i)
                }
                ))
            }
            ;
            return e.add(( () => n({
                body: qt(o, t.textEncoder)
            }).then((t => (r = Xt(r, t),
            t)), (t => {
                throw c("network_error"),
                t
            }
            )))).then((t => t), (t => {
                if (t instanceof A)
                    return c("queue_overflow"),
                    $t();
                throw t
            }
            ))
        }
        return i.__sentry__baseTransport__ = !0,
        {
            send: i,
            flush: t => e.drain(t)
        }
    }
    function bn(t, n) {
        if ("event" === n || "transaction" === n)
            return Array.isArray(t) ? t[1] : void 0
    }
    const wn = "7.60.0";
    let En;
    class $n {
        constructor() {
            $n.prototype.__init.call(this)
        }
        static __initStatic() {
            this.id = "FunctionToString"
        }
        __init() {
            this.name = $n.id
        }
        setupOnce() {
            En = Function.prototype.toString;
            try {
                Function.prototype.toString = function(...t) {
                    const n = U(this) || this;
                    return En.apply(n, t)
                }
            } catch (t) {}
        }
    }
    $n.__initStatic();
    const Sn = [/^Script error\.?$/, /^Javascript error: Script error\.? on line 0$/]
      , xn = [/^.*healthcheck.*$/, /^.*healthy.*$/, /^.*live.*$/, /^.*ready.*$/, /^.*heartbeat.*$/, /^.*\/health$/, /^.*\/healthz$/];
    class Tn {
        static __initStatic() {
            this.id = "InboundFilters"
        }
        __init() {
            this.name = Tn.id
        }
        constructor(t={}) {
            this.nt = t,
            Tn.prototype.__init.call(this)
        }
        setupOnce(t, n) {
            const e = t => {
                const e = n();
                if (e) {
                    const n = e.getIntegration(Tn);
                    if (n) {
                        const r = e.getClient()
                          , i = r ? r.getOptions() : {}
                          , s = function(t={}, n={}) {
                            return {
                                allowUrls: [...t.allowUrls || [], ...n.allowUrls || []],
                                denyUrls: [...t.denyUrls || [], ...n.denyUrls || []],
                                ignoreErrors: [...t.ignoreErrors || [], ...n.ignoreErrors || [], ...t.disableErrorDefaults ? [] : Sn],
                                ignoreTransactions: [...t.ignoreTransactions || [], ...n.ignoreTransactions || [], ...t.disableTransactionDefaults ? [] : xn],
                                ignoreInternal: void 0 === t.ignoreInternal || t.ignoreInternal
                            }
                        }(n.nt, i);
                        return function(t, n) {
                            if (n.ignoreInternal && function(t) {
                                try {
                                    return "SentryError" === t.exception.values[0].type
                                } catch (t) {}
                                return !1
                            }(t))
                                return !0;
                            if (function(t, n) {
                                if (t.type || !n || !n.length)
                                    return !1;
                                return function(t) {
                                    if (t.message)
                                        return [t.message];
                                    if (t.exception) {
                                        const {values: n} = t.exception;
                                        try {
                                            const {type: t="", value: e=""} = n && n[n.length - 1] || {};
                                            return [`${e}`, `${t}: ${e}`]
                                        } catch (t) {
                                            return []
                                        }
                                    }
                                    return []
                                }(t).some((t => v(t, n)))
                            }(t, n.ignoreErrors))
                                return !0;
                            if (function(t, n) {
                                if ("transaction" !== t.type || !n || !n.length)
                                    return !1;
                                const e = t.transaction;
                                return !!e && v(e, n)
                            }(t, n.ignoreTransactions))
                                return !0;
                            if (function(t, n) {
                                if (!n || !n.length)
                                    return !1;
                                const e = kn(t);
                                return !!e && v(e, n)
                            }(t, n.denyUrls))
                                return !0;
                            if (!function(t, n) {
                                if (!n || !n.length)
                                    return !0;
                                const e = kn(t);
                                return !e || v(e, n)
                            }(t, n.allowUrls))
                                return !0;
                            return !1
                        }(t, s) ? null : t
                    }
                }
                return t
            }
            ;
            e.id = this.name,
            t(e)
        }
    }
    function kn(t) {
        try {
            let n;
            try {
                n = t.exception.values[0].stacktrace.frames
            } catch (t) {}
            return n ? function(t=[]) {
                for (let n = t.length - 1; n >= 0; n--) {
                    const e = t[n];
                    if (e && "<anonymous>" !== e.filename && "[native code]" !== e.filename)
                        return e.filename || null
                }
                return null
            }(n) : null
        } catch (t) {
            return null
        }
    }
    Tn.__initStatic();
    var jn = Object.freeze({
        __proto__: null,
        FunctionToString: $n,
        InboundFilters: Tn
    });
    const On = $;
    let Dn = 0;
    function Rn() {
        return Dn > 0
    }
    function In() {
        Dn++,
        setTimeout(( () => {
            Dn--
        }
        ))
    }
    function Mn(t, n={}, e) {
        if ("function" != typeof t)
            return t;
        try {
            const n = t.__sentry_wrapped__;
            if (n)
                return n;
            if (U(t))
                return t
        } catch (n) {
            return t
        }
        const sentryWrapped = function() {
            const r = Array.prototype.slice.call(arguments);
            try {
                e && "function" == typeof e && e.apply(this, arguments);
                const i = r.map((t => Mn(t, n)));
                return t.apply(this, i)
            } catch (t) {
                throw In(),
                on((e => {
                    e.addEventProcessor((t => (n.mechanism && (yt(t, void 0, void 0),
                    mt(t, n.mechanism)),
                    t.extra = {
                        ...t.extra,
                        arguments: r
                    },
                    t))),
                    captureException(t)
                }
                )),
                t
            }
        };
        try {
            for (const n in t)
                Object.prototype.hasOwnProperty.call(t, n) && (sentryWrapped[n] = t[n])
        } catch (t) {}
        N(sentryWrapped, t),
        L(t, "__sentry_wrapped__", sentryWrapped);
        try {
            Object.getOwnPropertyDescriptor(sentryWrapped, "name").configurable && Object.defineProperty(sentryWrapped, "name", {
                get: () => t.name
            })
        } catch (t) {}
        return sentryWrapped
    }
    function An(t, n) {
        const e = Ln(t, n)
          , r = {
            type: n && n.name,
            value: Un(n)
        };
        return e.length && (r.stacktrace = {
            frames: e
        }),
        void 0 === r.type && "" === r.value && (r.value = "Unrecoverable error caught"),
        r
    }
    function Cn(t, n) {
        return {
            exception: {
                values: [An(t, n)]
            }
        }
    }
    function Ln(t, n) {
        const e = n.stacktrace || n.stack || ""
          , r = function(t) {
            if (t) {
                if ("number" == typeof t.framesToPop)
                    return t.framesToPop;
                if (Nn.test(t.message))
                    return 1
            }
            return 0
        }(n);
        try {
            return t(e, r)
        } catch (t) {}
        return []
    }
    const Nn = /Minified React error #\d+;/i;
    function Un(t) {
        const n = t && t.message;
        return n ? n.error && "string" == typeof n.error.message ? n.error.message : n : "No error message"
    }
    function qn(t, n, e, r) {
        const i = Bn(t, n, e && e.syntheticException || void 0, r);
        return mt(i),
        i.level = "error",
        e && e.event_id && (i.event_id = e.event_id),
        $t(i)
    }
    function Pn(t, n, e="info", r, i) {
        const s = Hn(t, n, r && r.syntheticException || void 0, i);
        return s.level = e,
        r && r.event_id && (s.event_id = r.event_id),
        $t(s)
    }
    function Bn(t, n, e, r, u) {
        let a;
        if (o(n) && n.error) {
            return Cn(t, n.error)
        }
        if (c(n) || s(n, "DOMException")) {
            const i = n;
            if ("stack"in n)
                a = Cn(t, n);
            else {
                const n = i.name || (c(i) ? "DOMError" : "DOMException")
                  , s = i.message ? `${n}: ${i.message}` : n;
                a = Hn(t, s, e, r),
                yt(a, s)
            }
            return "code"in i && (a.tags = {
                ...a.tags,
                "DOMException.code": `${i.code}`
            }),
            a
        }
        if (i(n))
            return Cn(t, n);
        if (f(n) || h(n)) {
            return a = function(t, n, e, r) {
                const i = en().getClient()
                  , s = i && i.getOptions().normalizeDepth
                  , o = {
                    exception: {
                        values: [{
                            type: h(n) ? n.constructor.name : r ? "UnhandledRejection" : "Error",
                            value: Fn(n, {
                                isUnhandledRejection: r
                            })
                        }]
                    },
                    extra: {
                        __serialized__: bt(n, s)
                    }
                };
                if (e) {
                    const n = Ln(t, e);
                    n.length && (o.exception.values[0].stacktrace = {
                        frames: n
                    })
                }
                return o
            }(t, n, e, u),
            mt(a, {
                synthetic: !0
            }),
            a
        }
        return a = Hn(t, n, e, r),
        yt(a, `${n}`, void 0),
        mt(a, {
            synthetic: !0
        }),
        a
    }
    function Hn(t, n, e, r) {
        const i = {
            message: n
        };
        if (r && e) {
            const r = Ln(t, e);
            r.length && (i.exception = {
                values: [{
                    value: n,
                    stacktrace: {
                        frames: r
                    }
                }]
            })
        }
        return i
    }
    function Fn(t, {isUnhandledRejection: n}) {
        const e = function(t, n=40) {
            const e = Object.keys(q(t));
            if (e.sort(),
            !e.length)
                return "[object has no keys]";
            if (e[0].length >= n)
                return p(e[0], n);
            for (let t = e.length; t > 0; t--) {
                const r = e.slice(0, t).join(", ");
                if (!(r.length > n))
                    return t === e.length ? r : p(r, n)
            }
            return ""
        }(t)
          , r = n ? "promise rejection" : "exception";
        if (o(t))
            return `Event \`ErrorEvent\` captured as ${r} with message \`${t.message}\``;
        if (h(t)) {
            return `Event \`${function(t) {
                try {
                    const n = Object.getPrototypeOf(t);
                    return n ? n.constructor.name : void 0
                } catch (t) {}
            }(t)}\` (type=${t.type}) captured as ${r}`
        }
        return `Object captured as ${r} with keys: ${e}`
    }
    const Xn = 1024
      , zn = "Breadcrumbs";
    class Wn {
        static __initStatic() {
            this.id = zn
        }
        __init() {
            this.name = Wn.id
        }
        constructor(t) {
            Wn.prototype.__init.call(this),
            this.options = {
                console: !0,
                dom: !0,
                fetch: !0,
                history: !0,
                sentry: !0,
                xhr: !0,
                ...t
            }
        }
        setupOnce() {
            this.options.console && et("console", Gn),
            this.options.dom && et("dom", function(t) {
                function n(n) {
                    let e, r = "object" == typeof t ? t.serializeAttribute : void 0, i = "object" == typeof t && "number" == typeof t.maxStringLength ? t.maxStringLength : void 0;
                    i && i > Xn && (i = Xn),
                    "string" == typeof r && (r = [r]);
                    try {
                        const t = n.event;
                        e = function(t) {
                            return !!t && !!t.target
                        }(t) ? k(t.target, {
                            keyAttrs: r,
                            maxStringLength: i
                        }) : k(t, {
                            keyAttrs: r,
                            maxStringLength: i
                        })
                    } catch (t) {
                        e = "<unknown>"
                    }
                    0 !== e.length && en().addBreadcrumb({
                        category: `ui.${n.name}`,
                        message: e
                    }, {
                        event: n.event,
                        name: n.name,
                        global: n.global
                    })
                }
                return n
            }(this.options.dom)),
            this.options.xhr && et("xhr", Jn),
            this.options.fetch && et("fetch", Kn),
            this.options.history && et("history", Yn)
        }
        addSentryBreadcrumb(t) {
            this.options.sentry && en().addBreadcrumb({
                category: "sentry." + ("transaction" === t.type ? "transaction" : "event"),
                event_id: t.event_id,
                level: t.level,
                message: pt(t)
            }, {
                event: t
            })
        }
    }
    function Gn(t) {
        for (let n = 0; n < t.args.length; n++)
            if ("ref=Ref<" === t.args[n]) {
                t.args[n + 1] = "viewRef";
                break
            }
        const n = {
            category: "console",
            data: {
                arguments: t.args,
                logger: "console"
            },
            level: (e = t.level,
            "warn" === e ? "warning" : jt.includes(e) ? e : "log"),
            message: y(t.args, " ")
        };
        var e;
        if ("assert" === t.level) {
            if (!1 !== t.args[0])
                return;
            n.message = `Assertion failed: ${y(t.args.slice(1), " ") || "console.assert"}`,
            n.data.arguments = t.args.slice(1)
        }
        en().addBreadcrumb(n, {
            input: t.args,
            level: t.level
        })
    }
    function Jn(t) {
        const {startTimestamp: n, endTimestamp: e} = t
          , r = t.xhr.__sentry_xhr_v2__;
        if (!n || !e || !r)
            return;
        const {method: i, url: s, status_code: o, body: c} = r
          , u = {
            method: i,
            url: s,
            status_code: o
        }
          , a = {
            xhr: t.xhr,
            input: c,
            startTimestamp: n,
            endTimestamp: e
        };
        en().addBreadcrumb({
            category: "xhr",
            data: u,
            type: "http"
        }, a)
    }
    function Kn(t) {
        const {startTimestamp: n, endTimestamp: e} = t;
        if (e && (!t.fetchData.url.match(/sentry_key/) || "POST" !== t.fetchData.method))
            if (t.error) {
                const r = t.fetchData
                  , i = {
                    data: t.error,
                    input: t.args,
                    startTimestamp: n,
                    endTimestamp: e
                };
                en().addBreadcrumb({
                    category: "fetch",
                    data: r,
                    level: "error",
                    type: "http"
                }, i)
            } else {
                const r = {
                    ...t.fetchData,
                    status_code: t.response && t.response.status
                }
                  , i = {
                    input: t.args,
                    response: t.response,
                    startTimestamp: n,
                    endTimestamp: e
                };
                en().addBreadcrumb({
                    category: "fetch",
                    data: r,
                    type: "http"
                }, i)
            }
    }
    function Yn(t) {
        let n = t.from
          , e = t.to;
        const r = kt(On.location.href);
        let i = kt(n);
        const s = kt(e);
        i.path || (i = r),
        r.protocol === s.protocol && r.host === s.host && (e = s.relative),
        r.protocol === i.protocol && r.host === i.host && (n = i.relative),
        en().addBreadcrumb({
            category: "navigation",
            data: {
                from: n,
                to: e
            }
        })
    }
    function Vn(t, {metadata: n, tunnel: e, dsn: r}) {
        const i = {
            event_id: t.event_id,
            sent_at: (new Date).toISOString(),
            ...n && n.sdk && {
                sdk: {
                    name: n.sdk.name,
                    version: n.sdk.version
                }
            },
            ...!!e && !!r && {
                dsn: R(r)
            }
        }
          , s = function(t) {
            return [{
                type: "user_report"
            }, t]
        }(t);
        return Ct(i, [s])
    }
    Wn.__initStatic();
    class Qn extends mn {
        constructor(t) {
            const n = On.SENTRY_SDK_SOURCE || "npm";
            t.K = t.K || {},
            t.K.sdk = t.K.sdk || {
                name: "sentry.javascript.browser",
                packages: [{
                    name: `${n}:@sentry/browser`,
                    version: wn
                }],
                version: wn
            },
            super(t),
            t.sendClientReports && On.document && On.document.addEventListener("visibilitychange", ( () => {
                "hidden" === On.document.visibilityState && this.yt()
            }
            ))
        }
        eventFromException(t, n) {
            return qn(this.nt.stackParser, t, n, this.nt.attachStacktrace)
        }
        eventFromMessage(t, n="info", e) {
            return Pn(this.nt.stackParser, t, n, e, this.nt.attachStacktrace)
        }
        sendEvent(t, n) {
            const e = this.getIntegrationById(zn);
            e && e.addSentryBreadcrumb && e.addSentryBreadcrumb(t),
            super.sendEvent(t, n)
        }
        captureUserFeedback(t) {
            if (!this.ot())
                return;
            const n = Vn(t, {
                metadata: this.getSdkMetadata(),
                dsn: this.getDsn(),
                tunnel: this.getOptions().tunnel
            });
            this.ut(n)
        }
        ht(t, n, e) {
            return t.platform = t.platform || "javascript",
            super.ht(t, n, e)
        }
        yt() {
            const t = this.dt();
            if (0 === t.length)
                return;
            if (!this.et)
                return;
            const n = (e = t,
            Ct((r = this.nt.tunnel && R(this.et)) ? {
                dsn: r
            } : {}, [[{
                type: "client_report"
            }, {
                timestamp: i || Mt(),
                discarded_events: e
            }]]));
            var e, r, i;
            this.ut(n)
        }
    }
    let Zn;
    function te(t, n=function() {
        if (Zn)
            return Zn;
        if (Y(On.fetch))
            return Zn = On.fetch.bind(On);
        const t = On.document;
        let n = On.fetch;
        if (t && "function" == typeof t.createElement)
            try {
                const e = t.createElement("iframe");
                e.hidden = !0,
                t.head.appendChild(e);
                const r = e.contentWindow;
                r && r.fetch && (n = r.fetch),
                t.head.removeChild(e)
            } catch (t) {}
        return Zn = n.bind(On)
    }()) {
        let e = 0
          , r = 0;
        return _n(t, (function(i) {
            const s = i.body.length;
            e += s,
            r++;
            const o = {
                body: i.body,
                method: "POST",
                referrerPolicy: "origin",
                headers: t.headers,
                keepalive: e <= 6e4 && r < 15,
                ...t.fetchOptions
            };
            try {
                return n(t.url, o).then((t => (e -= s,
                r--,
                {
                    statusCode: t.status,
                    headers: {
                        "x-sentry-rate-limits": t.headers.get("X-Sentry-Rate-Limits"),
                        "retry-after": t.headers.get("Retry-After")
                    }
                })))
            } catch (t) {
                return Zn = void 0,
                e -= s,
                r--,
                St(t)
            }
        }
        ))
    }
    function ne(t) {
        return _n(t, (function(n) {
            return new xt(( (e, r) => {
                const i = new XMLHttpRequest;
                i.onerror = r,
                i.onreadystatechange = () => {
                    4 === i.readyState && e({
                        statusCode: i.status,
                        headers: {
                            "x-sentry-rate-limits": i.getResponseHeader("X-Sentry-Rate-Limits"),
                            "retry-after": i.getResponseHeader("Retry-After")
                        }
                    })
                }
                ,
                i.open("POST", t.url);
                for (const n in t.headers)
                    Object.prototype.hasOwnProperty.call(t.headers, n) && i.setRequestHeader(n, t.headers[n]);
                i.send(n.body)
            }
            ))
        }
        ))
    }
    const ee = "?";
    function re(t, n, e, r) {
        const i = {
            filename: t,
            function: n,
            in_app: !0
        };
        return void 0 !== e && (i.lineno = e),
        void 0 !== r && (i.colno = r),
        i
    }
    const ie = /^\s*at (?:(.+?\)(?: \[.+\])?|.*?) ?\((?:address at )?)?(?:async )?((?:<anonymous>|[-a-z]+:|.*bundle|\/)?.*?)(?::(\d+))?(?::(\d+))?\)?\s*$/i
      , se = /\((\S*)(?::(\d+))(?::(\d+))\)/
      , oe = [30, t => {
        const n = ie.exec(t);
        if (n) {
            if (n[2] && 0 === n[2].indexOf("eval")) {
                const t = se.exec(n[2]);
                t && (n[2] = t[1],
                n[3] = t[2],
                n[4] = t[3])
            }
            const [t,e] = ge(n[1] || ee, n[2]);
            return re(e, t, n[3] ? +n[3] : void 0, n[4] ? +n[4] : void 0)
        }
    }
    ]
      , ce = /^\s*(.*?)(?:\((.*?)\))?(?:^|@)?((?:[-a-z]+)?:\/.*?|\[native code\]|[^@]*(?:bundle|\d+\.js)|\/[\w\-. /=]+)(?::(\d+))?(?::(\d+))?\s*$/i
      , ue = /(\S+) line (\d+)(?: > eval line \d+)* > eval/i
      , ae = [50, t => {
        const n = ce.exec(t);
        if (n) {
            if (n[3] && n[3].indexOf(" > eval") > -1) {
                const t = ue.exec(n[3]);
                t && (n[1] = n[1] || "eval",
                n[3] = t[1],
                n[4] = t[2],
                n[5] = "")
            }
            let t = n[3]
              , e = n[1] || ee;
            return [e,t] = ge(e, t),
            re(t, e, n[4] ? +n[4] : void 0, n[5] ? +n[5] : void 0)
        }
    }
    ]
      , fe = /^\s*at (?:((?:\[object object\])?.+) )?\(?((?:[-a-z]+):.*?):(\d+)(?::(\d+))?\)?\s*$/i
      , he = [40, t => {
        const n = fe.exec(t);
        return n ? re(n[2], n[1] || ee, +n[3], n[4] ? +n[4] : void 0) : void 0
    }
    ]
      , le = / line (\d+).*script (?:in )?(\S+)(?:: in function (\S+))?$/i
      , de = [10, t => {
        const n = le.exec(t);
        return n ? re(n[2], n[3] || ee, +n[1]) : void 0
    }
    ]
      , pe = / line (\d+), column (\d+)\s*(?:in (?:<anonymous function: ([^>]+)>|([^)]+))\(.*\))? in (.*):\s*$/i
      , ye = [20, t => {
        const n = pe.exec(t);
        return n ? re(n[5], n[3] || n[4] || ee, +n[1], +n[2]) : void 0
    }
    ]
      , me = [oe, ae, he]
      , ve = z(...me)
      , ge = (t, n) => {
        const e = -1 !== t.indexOf("safari-extension")
          , r = -1 !== t.indexOf("safari-web-extension");
        return e || r ? [-1 !== t.indexOf("@") ? t.split("@")[0] : ee, e ? `safari-extension:${n}` : `safari-web-extension:${n}`] : [t, n]
    }
    ;
    class _e {
        static __initStatic() {
            this.id = "GlobalHandlers"
        }
        __init() {
            this.name = _e.id
        }
        __init2() {
            this.vt = {
                onerror: be,
                onunhandledrejection: we
            }
        }
        constructor(t) {
            _e.prototype.__init.call(this),
            _e.prototype.__init2.call(this),
            this.nt = {
                onerror: !0,
                onunhandledrejection: !0,
                ...t
            }
        }
        setupOnce() {
            Error.stackTraceLimit = 50;
            const t = this.nt;
            for (const n in t) {
                const e = this.vt[n];
                e && t[n] && (e(),
                this.vt[n] = void 0)
            }
        }
    }
    function be() {
        et("error", (t => {
            const [n,e,r] = Se();
            if (!n.getIntegration(_e))
                return;
            const {msg: i, url: s, line: c, column: a, error: f} = t;
            if (Rn() || f && f.__sentry_own_request__)
                return;
            const h = void 0 === f && u(i) ? function(t, n, e, r) {
                const i = /^(?:[Uu]ncaught (?:exception: )?)?(?:((?:Eval|Internal|Range|Reference|Syntax|Type|URI|)Error): )?(.*)$/i;
                let s = o(t) ? t.message : t
                  , c = "Error";
                const u = s.match(i);
                u && (c = u[1],
                s = u[2]);
                return Ee({
                    exception: {
                        values: [{
                            type: c,
                            value: s
                        }]
                    }
                }, n, e, r)
            }(i, s, c, a) : Ee(Bn(e, f || i, void 0, r, !1), s, c, a);
            h.level = "error",
            $e(n, f, h, "onerror")
        }
        ))
    }
    function we() {
        et("unhandledrejection", (t => {
            const [n,e,r] = Se();
            if (!n.getIntegration(_e))
                return;
            let i = t;
            try {
                "reason"in t ? i = t.reason : "detail"in t && "reason"in t.detail && (i = t.detail.reason)
            } catch (t) {}
            if (Rn() || i && i.__sentry_own_request__)
                return !0;
            const s = a(i) ? {
                exception: {
                    values: [{
                        type: "UnhandledRejection",
                        value: `Non-Error promise rejection captured with value: ${String(i)}`
                    }]
                }
            } : Bn(e, i, void 0, r, !0);
            s.level = "error",
            $e(n, i, s, "onunhandledrejection")
        }
        ))
    }
    function Ee(t, n, e, r) {
        const i = t.exception = t.exception || {}
          , s = i.values = i.values || []
          , o = s[0] = s[0] || {}
          , c = o.stacktrace = o.stacktrace || {}
          , a = c.frames = c.frames || []
          , f = isNaN(parseInt(r, 10)) ? void 0 : r
          , h = isNaN(parseInt(e, 10)) ? void 0 : e
          , l = u(n) && n.length > 0 ? n : function() {
            try {
                return T.document.location.href
            } catch (t) {
                return ""
            }
        }();
        return 0 === a.length && a.push({
            colno: f,
            filename: l,
            function: "?",
            in_app: !0,
            lineno: h
        }),
        t
    }
    function $e(t, n, e, r) {
        mt(e, {
            handled: !1,
            type: r
        }),
        t.captureEvent(e, {
            originalException: n
        })
    }
    function Se() {
        const t = en()
          , n = t.getClient()
          , e = n && n.getOptions() || {
            stackParser: () => [],
            attachStacktrace: !1
        };
        return [t, e.stackParser, e.attachStacktrace]
    }
    _e.__initStatic();
    const xe = ["EventTarget", "Window", "Node", "ApplicationCache", "AudioTrackList", "ChannelMergerNode", "CryptoOperation", "EventSource", "FileReader", "HTMLUnknownElement", "IDBDatabase", "IDBRequest", "IDBTransaction", "KeyOperation", "MediaController", "MessagePort", "ModalWindow", "Notification", "SVGElementInstance", "Screen", "TextTrack", "TextTrackCue", "TextTrackList", "WebSocket", "WebSocketWorker", "Worker", "XMLHttpRequest", "XMLHttpRequestEventTarget", "XMLHttpRequestUpload"];
    class Te {
        static __initStatic() {
            this.id = "TryCatch"
        }
        __init() {
            this.name = Te.id
        }
        constructor(t) {
            Te.prototype.__init.call(this),
            this.nt = {
                XMLHttpRequest: !0,
                eventTarget: !0,
                requestAnimationFrame: !0,
                setInterval: !0,
                setTimeout: !0,
                ...t
            }
        }
        setupOnce() {
            this.nt.setTimeout && C(On, "setTimeout", ke),
            this.nt.setInterval && C(On, "setInterval", ke),
            this.nt.requestAnimationFrame && C(On, "requestAnimationFrame", je),
            this.nt.XMLHttpRequest && "XMLHttpRequest"in On && C(XMLHttpRequest.prototype, "send", Oe);
            const t = this.nt.eventTarget;
            if (t) {
                (Array.isArray(t) ? t : xe).forEach(De)
            }
        }
    }
    function ke(t) {
        return function(...n) {
            const e = n[0];
            return n[0] = Mn(e, {
                mechanism: {
                    data: {
                        function: G(t)
                    },
                    handled: !0,
                    type: "instrument"
                }
            }),
            t.apply(this, n)
        }
    }
    function je(t) {
        return function(n) {
            return t.apply(this, [Mn(n, {
                mechanism: {
                    data: {
                        function: "requestAnimationFrame",
                        handler: G(t)
                    },
                    handled: !0,
                    type: "instrument"
                }
            })])
        }
    }
    function Oe(t) {
        return function(...n) {
            const e = this;
            return ["onload", "onerror", "onprogress", "onreadystatechange"].forEach((t => {
                t in e && "function" == typeof e[t] && C(e, t, (function(n) {
                    const e = {
                        mechanism: {
                            data: {
                                function: t,
                                handler: G(n)
                            },
                            handled: !0,
                            type: "instrument"
                        }
                    }
                      , r = U(n);
                    return r && (e.mechanism.data.handler = G(r)),
                    Mn(n, e)
                }
                ))
            }
            )),
            t.apply(this, n)
        }
    }
    function De(t) {
        const n = On
          , e = n[t] && n[t].prototype;
        e && e.hasOwnProperty && e.hasOwnProperty("addEventListener") && (C(e, "addEventListener", (function(n) {
            return function(e, r, i) {
                try {
                    "function" == typeof r.handleEvent && (r.handleEvent = Mn(r.handleEvent, {
                        mechanism: {
                            data: {
                                function: "handleEvent",
                                handler: G(r),
                                target: t
                            },
                            handled: !0,
                            type: "instrument"
                        }
                    }))
                } catch (t) {}
                return n.apply(this, [e, Mn(r, {
                    mechanism: {
                        data: {
                            function: "addEventListener",
                            handler: G(r),
                            target: t
                        },
                        handled: !0,
                        type: "instrument"
                    }
                }), i])
            }
        }
        )),
        C(e, "removeEventListener", (function(t) {
            return function(n, e, r) {
                const i = e;
                try {
                    const e = i && i.__sentry_wrapped__;
                    e && t.call(this, n, e, r)
                } catch (t) {}
                return t.call(this, n, i, r)
            }
        }
        )))
    }
    Te.__initStatic();
    class Re {
        static __initStatic() {
            this.id = "LinkedErrors"
        }
        __init() {
            this.name = Re.id
        }
        constructor(t={}) {
            Re.prototype.__init.call(this),
            this.gt = t.key || "cause",
            this._t = t.limit || 5
        }
        setupOnce(t, n) {
            t(( (t, e) => {
                const r = n()
                  , i = r.getClient()
                  , s = r.getIntegration(Re);
                if (!i || !s)
                    return t;
                const o = i.getOptions();
                return g(An, o.stackParser, o.maxValueLength, s.gt, s._t, t, e),
                t
            }
            ))
        }
    }
    Re.__initStatic();
    class Ie {
        constructor() {
            Ie.prototype.__init.call(this)
        }
        static __initStatic() {
            this.id = "HttpContext"
        }
        __init() {
            this.name = Ie.id
        }
        setupOnce() {
            Yt((t => {
                if (en().getIntegration(Ie)) {
                    if (!On.navigator && !On.location && !On.document)
                        return t;
                    const n = t.request && t.request.url || On.location && On.location.href
                      , {referrer: e} = On.document || {}
                      , {userAgent: r} = On.navigator || {}
                      , i = {
                        ...t.request && t.request.headers,
                        ...e && {
                            Referer: e
                        },
                        ...r && {
                            "User-Agent": r
                        }
                    }
                      , s = {
                        ...t.request,
                        ...n && {
                            url: n
                        },
                        headers: i
                    };
                    return {
                        ...t,
                        request: s
                    }
                }
                return t
            }
            ))
        }
    }
    Ie.__initStatic();
    class Me {
        constructor() {
            Me.prototype.__init.call(this)
        }
        static __initStatic() {
            this.id = "Dedupe"
        }
        __init() {
            this.name = Me.id
        }
        setupOnce(t, n) {
            const e = t => {
                if (t.type)
                    return t;
                const e = n().getIntegration(Me);
                if (e) {
                    try {
                        if (function(t, n) {
                            if (!n)
                                return !1;
                            if (function(t, n) {
                                const e = t.message
                                  , r = n.message;
                                if (!e && !r)
                                    return !1;
                                if (e && !r || !e && r)
                                    return !1;
                                if (e !== r)
                                    return !1;
                                if (!Ce(t, n))
                                    return !1;
                                if (!Ae(t, n))
                                    return !1;
                                return !0
                            }(t, n))
                                return !0;
                            if (function(t, n) {
                                const e = Le(n)
                                  , r = Le(t);
                                if (!e || !r)
                                    return !1;
                                if (e.type !== r.type || e.value !== r.value)
                                    return !1;
                                if (!Ce(t, n))
                                    return !1;
                                if (!Ae(t, n))
                                    return !1;
                                return !0
                            }(t, n))
                                return !0;
                            return !1
                        }(t, e.bt))
                            return null
                    } catch (n) {
                        return e.bt = t
                    }
                    return e.bt = t
                }
                return t
            }
            ;
            e.id = this.name,
            t(e)
        }
    }
    function Ae(t, n) {
        let e = Ne(t)
          , r = Ne(n);
        if (!e && !r)
            return !0;
        if (e && !r || !e && r)
            return !1;
        if (e = e,
        r = r,
        r.length !== e.length)
            return !1;
        for (let t = 0; t < r.length; t++) {
            const n = r[t]
              , i = e[t];
            if (n.filename !== i.filename || n.lineno !== i.lineno || n.colno !== i.colno || n.function !== i.function)
                return !1
        }
        return !0
    }
    function Ce(t, n) {
        let e = t.fingerprint
          , r = n.fingerprint;
        if (!e && !r)
            return !0;
        if (e && !r || !e && r)
            return !1;
        e = e,
        r = r;
        try {
            return !(e.join("") !== r.join(""))
        } catch (t) {
            return !1
        }
    }
    function Le(t) {
        return t.exception && t.exception.values && t.exception.values[0]
    }
    function Ne(t) {
        const n = t.exception;
        if (n)
            try {
                return n.values[0].stacktrace.frames
            } catch (t) {
                return
            }
    }
    Me.__initStatic();
    var Ue = Object.freeze({
        __proto__: null,
        GlobalHandlers: _e,
        TryCatch: Te,
        Breadcrumbs: Wn,
        LinkedErrors: Re,
        HttpContext: Ie,
        Dedupe: Me
    });
    const qe = [new Tn, new $n, new Te, new Wn, new _e, new Re, new Me, new Ie];
    function Pe(t) {
        t.startSession({
            ignoreDuration: !0
        }),
        t.captureSession()
    }
    let Be = {};
    On.Sentry && On.Sentry.Integrations && (Be = On.Sentry.Integrations);
    const He = {
        ...Be,
        ...jn,
        ...Ue
    };
    return He.Replay = n,
    He.BrowserTracing = e,
    t.Breadcrumbs = Wn,
    t.BrowserClient = Qn,
    t.BrowserTracing = e,
    t.Dedupe = Me,
    t.FunctionToString = $n,
    t.GlobalHandlers = _e,
    t.HttpContext = Ie,
    t.Hub = Zt,
    t.InboundFilters = Tn,
    t.Integrations = He,
    t.LinkedErrors = Re,
    t.Replay = n,
    t.SDK_VERSION = wn,
    t.Scope = Jt,
    t.TryCatch = Te,
    t.WINDOW = On,
    t.addBreadcrumb = function(t) {
        en().addBreadcrumb(t)
    }
    ,
    t.addGlobalEventProcessor = Yt,
    t.addTracingExtensions = function() {}
    ,
    t.captureEvent = function(t, n) {
        return en().captureEvent(t, n)
    }
    ,
    t.captureException = captureException,
    t.captureMessage = function(t, n) {
        const e = "string" == typeof n ? n : void 0
          , r = "string" != typeof n ? {
            captureContext: n
        } : void 0;
        return en().captureMessage(t, e, r)
    }
    ,
    t.captureUserFeedback = function(t) {
        const n = en().getClient();
        n && n.captureUserFeedback(t)
    }
    ,
    t.chromeStackLineParser = oe,
    t.close = function(t) {
        const n = en().getClient();
        return n ? n.close(t) : $t(!1)
    }
    ,
    t.configureScope = function(t) {
        en().configureScope(t)
    }
    ,
    t.createTransport = _n,
    t.createUserFeedbackEnvelope = Vn,
    t.defaultIntegrations = qe,
    t.defaultStackLineParsers = me,
    t.defaultStackParser = ve,
    t.eventFromException = qn,
    t.eventFromMessage = Pn,
    t.flush = function(t) {
        const n = en().getClient();
        return n ? n.flush(t) : $t(!1)
    }
    ,
    t.forceLoad = function() {}
    ,
    t.geckoStackLineParser = ae,
    t.getCurrentHub = en,
    t.getHubFromCarrier = rn,
    t.init = function(t={}) {
        void 0 === t.defaultIntegrations && (t.defaultIntegrations = qe),
        void 0 === t.release && ("string" == typeof __SENTRY_RELEASE__ && (t.release = __SENTRY_RELEASE__),
        On.SENTRY_RELEASE && On.SENTRY_RELEASE.id && (t.release = On.SENTRY_RELEASE.id)),
        void 0 === t.autoSessionTracking && (t.autoSessionTracking = !0),
        void 0 === t.sendClientReports && (t.sendClientReports = !0);
        const n = {
            ...t,
            stackParser: (e = t.stackParser || ve,
            Array.isArray(e) ? z(...e) : e),
            integrations: ln(t),
            transport: t.transport || (K() ? te : ne)
        };
        var e;
        !function(t, n) {
            !0 === n.debug && console.warn("[Sentry] Cannot initialize SDK with `debug` option using a non-debug bundle.");
            const e = en();
            e.getScope().update(n.initialScope);
            const r = new t(n);
            e.bindClient(r)
        }(Qn, n),
        t.autoSessionTracking && function() {
            if (void 0 === On.document)
                return;
            const t = en();
            if (!t.captureSession)
                return;
            Pe(t),
            et("history", ( ({from: t, to: n}) => {
                void 0 !== t && t !== n && Pe(en())
            }
            ))
        }()
    }
    ,
    t.lastEventId = function() {
        return en().lastEventId()
    }
    ,
    t.makeFetchTransport = te,
    t.makeMain = nn,
    t.makeXHRTransport = ne,
    t.onLoad = function(t) {
        t()
    }
    ,
    t.opera10StackLineParser = de,
    t.opera11StackLineParser = ye,
    t.setContext = function(t, n) {
        en().setContext(t, n)
    }
    ,
    t.setExtra = function(t, n) {
        en().setExtra(t, n)
    }
    ,
    t.setExtras = function(t) {
        en().setExtras(t)
    }
    ,
    t.setTag = function(t, n) {
        en().setTag(t, n)
    }
    ,
    t.setTags = function(t) {
        en().setTags(t)
    }
    ,
    t.setUser = function(t) {
        en().setUser(t)
    }
    ,
    t.showReportDialog = function(t={}, n=en()) {
        if (!On.document)
            return;
        const {client: e, scope: r} = n.getStackTop()
          , i = t.dsn || e && e.getDsn();
        if (!i)
            return;
        r && (t.user = {
            ...r.getUser(),
            ...t.user
        }),
        t.eventId || (t.eventId = n.lastEventId());
        const s = On.document.createElement("script");
        s.async = !0,
        s.crossOrigin = "anonymous",
        s.src = function(t, n) {
            const e = M(t);
            if (!e)
                return "";
            const r = `${cn(e)}embed/error-page/`;
            let i = `dsn=${R(e)}`;
            for (const t in n)
                if ("dsn" !== t)
                    if ("user" === t) {
                        const t = n.user;
                        if (!t)
                            continue;
                        t.name && (i += `&name=${encodeURIComponent(t.name)}`),
                        t.email && (i += `&email=${encodeURIComponent(t.email)}`)
                    } else
                        i += `&${encodeURIComponent(t)}=${encodeURIComponent(n[t])}`;
            return `${r}?${i}`
        }(i, t),
        t.onLoad && (s.onload = t.onLoad);
        const o = On.document.head || On.document.body;
        o && o.appendChild(s)
    }
    ,
    t.startTransaction = function(t, n) {
        return en().startTransaction({
            ...t
        }, n)
    }
    ,
    t.winjsStackLineParser = he,
    t.withScope = on,
    t.wrap = function(t) {
        return Mn(t)()
    }
    ,
    t
}({});
//# sourceMappingURL=bundle.min.js.map