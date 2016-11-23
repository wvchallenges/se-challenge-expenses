/*!
 * CanJS - 2.1.3
 * http://canjs.us/
 * Copyright (c) 2014 Bitovi
 * Sat, 18 Oct 2014 01:10:28 GMT
 * Licensed MIT
 * Includes: can/component/component.js,can/construct/construct.js,can/map/map.js,can/list/list.js,can/compute/compute.js,can/model/model.js,can/view/view.js,can/control/control.js,can/route/route.js,can/control/route/route.js,can/view/mustache/mustache.js
 * Download from: http://bitbuilder.herokuapp.com/can.custom.js?configuration=jquery&minify=true&plugins=can%2Fcomponent%2Fcomponent.js&plugins=can%2Fconstruct%2Fconstruct.js&plugins=can%2Fmap%2Fmap.js&plugins=can%2Flist%2Flist.js&plugins=can%2Fcompute%2Fcompute.js&plugins=can%2Fmodel%2Fmodel.js&plugins=can%2Fview%2Fview.js&plugins=can%2Fcontrol%2Fcontrol.js&plugins=can%2Froute%2Froute.js&plugins=can%2Fcontrol%2Froute%2Froute.js&plugins=can%2Fview%2Fmustache%2Fmustache.js
 */
(function (undefined) {
    var __m4 = function () {
        var t = window.can || {};
        ("undefined" == typeof GLOBALCAN || GLOBALCAN !== !1) && (window.can = t), t.k = function () {
        }, t.isDeferred = function (t) {
            return t && "function" == typeof t.then && "function" == typeof t.pipe
        };
        var e = 0;
        return t.cid = function (t, n) {
            return t._cid || (e++, t._cid = (n || "") + e), t._cid
        }, t.VERSION = "@EDGE", t.simpleExtend = function (t, e) {
            for (var n in e)t[n] = e[n];
            return t
        }, t.frag = function (e) {
            var n;
            return e && "string" != typeof e ? 11 === e.nodeType ? e : "number" == typeof e.nodeType ? (n = document.createDocumentFragment(), n.appendChild(e), n) : "number" == typeof e.length ? (n = document.createDocumentFragment(), t.each(e, function (e) {
                n.appendChild(t.frag(e))
            }), n) : (n = t.buildFragment("" + e, document.body), n.childNodes.length || n.appendChild(document.createTextNode("")), n) : (n = t.buildFragment(null == e ? "" : "" + e, document.body), n.childNodes.length || n.appendChild(document.createTextNode("")), n)
        }, t.__reading = function () {
        }, t
    }(), __m5 = function (t) {
        var e = window.setImmediate || function (t) {
                return setTimeout(t, 0)
            }, n = {
            MutationObserver: window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver,
            map: {
                "class": "className",
                value: "value",
                innerText: "innerText",
                textContent: "textContent",
                checked: !0,
                disabled: !0,
                readonly: !0,
                required: !0,
                src: function (t, e) {
                    return null == e || "" === e ? (t.removeAttribute("src"), null) : (t.setAttribute("src", e), e)
                },
                style: function (t, e) {
                    return t.style.cssText = e || ""
                }
            },
            defaultValue: ["input", "textarea"],
            set: function (e, r, i) {
                var a;
                n.MutationObserver || (a = n.get(e, r));
                var s, o = ("" + e.nodeName).toLowerCase(), u = n.map[r];
                "function" == typeof u ? s = u(e, i) : u === !0 ? (s = e[r] = !0, "checked" === r && "radio" === e.type && t.inArray(o, n.defaultValue) >= 0 && (e.defaultChecked = !0)) : u ? (s = e[u] = i, "value" === u && t.inArray(o, n.defaultValue) >= 0 && (e.defaultValue = i)) : (e.setAttribute(r, i), s = i), n.MutationObserver || s === a || n.trigger(e, r, a)
            },
            trigger: function (n, r, i) {
                return t.data(t.$(n), "canHasAttributesBindings") ? e(function () {
                    t.trigger(n, {type: "attributes", attributeName: r, target: n, oldValue: i, bubbles: !1}, [])
                }) : undefined
            },
            get: function (t, e) {
                var r = n.map[e];
                return "string" == typeof r && t[r] ? t[r] : t.getAttribute(e)
            },
            remove: function (t, e) {
                var r;
                n.MutationObserver || (r = n.get(t, e));
                var i = n.map[e];
                "function" == typeof i && i(t, undefined), i === !0 ? t[e] = !1 : "string" == typeof i ? t[i] = "" : t.removeAttribute(e), n.MutationObserver || null == r || n.trigger(t, e, r)
            },
            has: function () {
                var t = document.createElement("div");
                return t.hasAttribute ? function (t, e) {
                    return t.hasAttribute(e)
                } : function (t, e) {
                    return null !== t.getAttribute(e)
                }
            }()
        };
        return n
    }(__m4), __m6 = function (t) {
        return t.addEvent = function (t, e) {
            var n = this.__bindEvents || (this.__bindEvents = {}), r = n[t] || (n[t] = []);
            return r.push({handler: e, name: t}), this
        }, t.listenTo = function (e, n, r) {
            var i = this.__listenToEvents;
            i || (i = this.__listenToEvents = {});
            var a = t.cid(e), s = i[a];
            s || (s = i[a] = {obj: e, events: {}});
            var o = s.events[n];
            o || (o = s.events[n] = []), o.push(r), t.bind.call(e, n, r)
        }, t.stopListening = function (e, n, r) {
            var i = this.__listenToEvents, a = i, s = 0;
            if (!i)return this;
            if (e) {
                var o = t.cid(e);
                if ((a = {})[o] = i[o], !i[o])return this
            }
            for (var u in a) {
                var c, l = a[u];
                e = i[u].obj, n ? (c = {})[n] = l.events[n] : c = l.events;
                for (var f in c) {
                    var d = c[f] || [];
                    for (s = 0; d.length > s;)r && r === d[s] || !r ? (t.unbind.call(e, f, d[s]), d.splice(s, 1)) : s++;
                    d.length || delete l.events[f]
                }
                t.isEmptyObject(l.events) && delete i[u]
            }
            return this
        }, t.removeEvent = function (t, e, n) {
            if (!this.__bindEvents)return this;
            for (var r, i = this.__bindEvents[t] || [], a = 0, s = "function" == typeof e; i.length > a;)r = i[a], (n ? n(r, t, e) : s && r.handler === e || !s && (r.cid === e || !e)) ? i.splice(a, 1) : a++;
            return this
        }, t.dispatch = function (t, e) {
            var n = this.__bindEvents;
            if (n) {
                "string" == typeof t && (t = {type: t});
                var r = t.type, i = (n[r] || []).slice(0), a = [t];
                e && a.push.apply(a, e);
                for (var s = 0, o = i.length; o > s; s++)i[s].handler.apply(this, a);
                return t
            }
        }, t.one = function (e, n) {
            var r = function () {
                return t.unbind.call(this, e, r), n.apply(this, arguments)
            };
            return t.bind.call(this, e, r), this
        }, t.event = {
            on: function () {
                return 0 === arguments.length && t.Control && this instanceof t.Control ? t.Control.prototype.on.call(this) : t.addEvent.apply(this, arguments)
            },
            off: function () {
                return 0 === arguments.length && t.Control && this instanceof t.Control ? t.Control.prototype.off.call(this) : t.removeEvent.apply(this, arguments)
            },
            bind: t.addEvent,
            unbind: t.removeEvent,
            delegate: function (e, n, r) {
                return t.addEvent.call(this, n, r)
            },
            undelegate: function (e, n, r) {
                return t.removeEvent.call(this, n, r)
            },
            trigger: t.dispatch,
            one: t.one,
            addEvent: t.addEvent,
            removeEvent: t.removeEvent,
            listenTo: t.listenTo,
            stopListening: t.stopListening,
            dispatch: t.dispatch
        }, t.event
    }(__m4), __m7 = function (t) {
        var e = function (t) {
            var e = t.length;
            return "function" != typeof arr && (0 === e || "number" == typeof e && e > 0 && e - 1 in t)
        };
        return t.each = function (n, r, i) {
            var a, s, o, u = 0;
            if (n)if (e(n))if (t.List && n instanceof t.List)for (s = n.attr("length"); s > u && (o = n.attr(u), r.call(i || o, o, u, n) !== !1); u++); else for (s = n.length; s > u && (o = n[u], r.call(i || o, o, u, n) !== !1); u++); else if ("object" == typeof n)if (t.Map && n instanceof t.Map || n === t.route) {
                var c = t.Map.keys(n);
                for (u = 0, s = c.length; s > u && (a = c[u], o = n.attr(a), r.call(i || o, o, a, n) !== !1); u++);
            } else for (a in n)if (n.hasOwnProperty(a) && r.call(i || n[a], n[a], a, n) === !1)break;
            return n
        }, t
    }(__m4), __m8 = function (t) {
        t.inserted = function (e) {
            e = t.makeArray(e);
            for (var n, r, i = !1, a = t.$(document.contains ? document : document.body), s = 0; (r = e[s]) !== undefined; s++) {
                if (!i) {
                    if (!r.getElementsByTagName)continue;
                    if (!t.has(a, r).length)return;
                    i = !0
                }
                if (i && r.getElementsByTagName) {
                    n = t.makeArray(r.getElementsByTagName("*")), t.trigger(r, "inserted", [], !1);
                    for (var o, u = 0; (o = n[u]) !== undefined; u++)t.trigger(o, "inserted", [], !1)
                }
            }
        }, t.appendChild = function (e, n) {
            var r;
            r = 11 === n.nodeType ? t.makeArray(n.childNodes) : [n], e.appendChild(n), t.inserted(r)
        }, t.insertBefore = function (e, n, r) {
            var i;
            i = 11 === n.nodeType ? t.makeArray(n.childNodes) : [n], e.insertBefore(n, r), t.inserted(i)
        }
    }(__m4), __m2 = function (t, e, n) {
        var r = function (t) {
            return t.nodeName && (1 === t.nodeType || 9 === t.nodeType) || t == window
        };
        t.extend(e, t, {
            trigger: function (n, i, a, s) {
                r(n) ? t.event.trigger(i, a, n, !s) : n.trigger ? n.trigger(i, a) : ("string" == typeof i && (i = {type: i}), i.target = i.target || n, a && (a.length && "string" == typeof a ? a = [a] : a.length || (a = [a])), a || (a = []), e.dispatch.call(n, i, a))
            }, event: e.event, addEvent: e.addEvent, removeEvent: e.removeEvent, buildFragment: function (e, n) {
                var r;
                return e = [e], n = n || document, n = !n.nodeType && n[0] || n, n = n.ownerDocument || n, r = t.buildFragment(e, n), r.cacheable ? t.clone(r.fragment) : r.fragment || r
            }, $: t, each: e.each, bind: function (n, i) {
                return this.bind && this.bind !== e.bind ? this.bind(n, i) : r(this) ? t.event.add(this, n, i) : e.addEvent.call(this, n, i), this
            }, unbind: function (n, i) {
                return this.unbind && this.unbind !== e.unbind ? this.unbind(n, i) : r(this) ? t.event.remove(this, n, i) : e.removeEvent.call(this, n, i), this
            }, delegate: function (n, i, a) {
                return this.delegate ? this.delegate(n, i, a) : r(this) ? t(this).delegate(n, i, a) : e.bind.call(this, i, a), this
            }, undelegate: function (n, i, a) {
                return this.undelegate ? this.undelegate(n, i, a) : r(this) ? t(this).undelegate(n, i, a) : e.unbind.call(this, i, a), this
            }, proxy: function (t, e) {
                return function () {
                    return t.apply(e, arguments)
                }
            }, attr: n
        }), e.on = e.bind, e.off = e.unbind, t.each(["append", "filter", "addClass", "remove", "data", "get", "has"], function (t, n) {
            e[n] = function (t) {
                return t[n].apply(t, e.makeArray(arguments).slice(1))
            }
        });
        var i = t.cleanData;
        t.cleanData = function (n) {
            t.each(n, function (t, n) {
                n && e.trigger(n, "removed", [], !1)
            }), i(n)
        };
        var a, s = t.fn.domManip;
        if (t.fn.domManip = function () {
                for (var t = 1; arguments.length > t; t++)if ("function" == typeof arguments[t]) {
                    a = t;
                    break
                }
                return s.apply(this, arguments)
            }, t(document.createElement("div")).append(document.createElement("div")), t.fn.domManip = 2 === a ? function (t, n, r) {
                return s.call(this, t, n, function (t) {
                    var n;
                    11 === t.nodeType && (n = e.makeArray(t.childNodes));
                    var i = r.apply(this, arguments);
                    return e.inserted(n ? n : [t]), i
                })
            } : function (t, n) {
                return s.call(this, t, function (t) {
                    var r;
                    11 === t.nodeType && (r = e.makeArray(t.childNodes));
                    var i = n.apply(this, arguments);
                    return e.inserted(r ? r : [t]), i
                })
            }, e.attr.MutationObserver)t.event.special.attributes = {
            setup: function () {
                var t = this, n = new e.attr.MutationObserver(function (n) {
                    n.forEach(function (n) {
                        var r = e.simpleExtend({}, n);
                        e.trigger(t, r, [])
                    })
                });
                n.observe(this, {attributes: !0, attributeOldValue: !0}), e.data(e.$(this), "canAttributesObserver", n)
            }, teardown: function () {
                e.data(e.$(this), "canAttributesObserver").disconnect(), t.removeData(this, "canAttributesObserver")
            }
        }; else {
            var o = t.attr;
            t.attr = function (t, n) {
                var r, i;
                arguments.length >= 3 && (r = o.call(this, t, n));
                var a = o.apply(this, arguments);
                return arguments.length >= 3 && (i = o.call(this, t, n)), i !== r && e.attr.trigger(t, n, r), a
            };
            var u = t.removeAttr;
            t.removeAttr = function (t, n) {
                var r = o.call(this, t, n), i = u.apply(this, arguments);
                return null != r && e.attr.trigger(t, n, r), i
            }, t.event.special.attributes = {
                setup: function () {
                    e.data(e.$(this), "canHasAttributesBindings", !0)
                }, teardown: function () {
                    t.removeData(this, "canHasAttributesBindings")
                }
            }
        }
        return function () {
            var t = "<-\n>", n = e.buildFragment(t, document);
            if (t !== n.childNodes[0].nodeValue) {
                var r = e.buildFragment;
                e.buildFragment = function (t, e) {
                    var n = r(t, e);
                    return 1 === n.childNodes.length && 3 === n.childNodes[0].nodeType && (n.childNodes[0].nodeValue = t), n
                }
            }
        }(), t.event.special.inserted = {}, t.event.special.removed = {}, e
    }(jQuery, __m4, __m5, __m6, __m7, __m8), __m10 = function (t) {
        var e = t.isFunction, n = t.makeArray, r = 1, i = function (t) {
            var e = function () {
                return c.frag(t.apply(this, arguments))
            };
            return e.render = function () {
                return t.apply(t, arguments)
            }, e
        }, a = function (t, e) {
            if (!t.length)throw"can.view: No template or empty template:" + e
        }, s = function (e, n) {
            var r, i, s, o = "string" == typeof e ? e : e.url, u = e.engine && "." + e.engine || o.match(/\.[\w\d]+$/);
            if (o.match(/^#/) && (o = o.substr(1)), (i = document.getElementById(o)) && (u = "." + i.type.match(/\/(x\-)?(.+)/)[2]), u || c.cached[o] || (o += u = c.ext), t.isArray(u) && (u = u[0]), s = c.toId(o), o.match(/^\/\//) && (o = o.substr(2), o = window.steal ? steal.config().root.mapJoin("" + steal.id(o)) : o), window.require && require.toUrl && (o = require.toUrl(o)), r = c.types[u], c.cached[s])return c.cached[s];
            if (i)return c.registerView(s, i.innerHTML, r);
            var l = new t.Deferred;
            return t.ajax({
                async: n, url: o, dataType: "text", error: function (t) {
                    a("", o), l.reject(t)
                }, success: function (t) {
                    a(t, o), c.registerView(s, t, r, l)
                }
            }), l
        }, o = function (e) {
            var n = [];
            if (t.isDeferred(e))return [e];
            for (var r in e)t.isDeferred(e[r]) && n.push(e[r]);
            return n
        }, u = function (e) {
            return t.isArray(e) && "success" === e[1] ? e[0] : e
        }, c = t.view = t.template = function (t, n, r, i) {
            e(r) && (i = r, r = undefined);
            var a;
            return a = e(t) ? t(n, r, i) : c.renderAs("fragment", t, n, r, i)
        };
        return t.extend(c, {
            frag: function (t, e) {
                return c.hookup(c.fragment(t), e)
            }, fragment: function (e) {
                if ("string" != typeof e && 11 === e.nodeType)return e;
                var n = t.buildFragment(e, document.body);
                return n.childNodes.length || n.appendChild(document.createTextNode("")), n
            }, toId: function (e) {
                return t.map(("" + e).split(/\/|\./g), function (t) {
                    return t ? t : undefined
                }).join("_")
            }, toStr: function (t) {
                return null == t ? "" : "" + t
            }, hookup: function (e, n) {
                var r, i, a = [];
                return t.each(e.childNodes ? t.makeArray(e.childNodes) : e, function (e) {
                    1 === e.nodeType && (a.push(e), a.push.apply(a, t.makeArray(e.getElementsByTagName("*"))))
                }), t.each(a, function (t) {
                    t.getAttribute && (r = t.getAttribute("data-view-id")) && (i = c.hookups[r]) && (i(t, n, r), delete c.hookups[r], t.removeAttribute("data-view-id"))
                }), e
            }, hookups: {}, hook: function (t) {
                return c.hookups[++r] = t, " data-view-id='" + r + "'"
            }, cached: {}, cachedRenderers: {}, cache: !0, register: function (e) {
                this.types["." + e.suffix] = e, t[e.suffix] = c[e.suffix] = function (t, n) {
                    var r, a;
                    if (!n)return a = function () {
                        return r || (r = e.fragRenderer ? e.fragRenderer(null, t) : i(e.renderer(null, t))), r.apply(this, arguments)
                    }, a.render = function () {
                        var n = e.renderer(null, t);
                        return n.apply(n, arguments)
                    }, a;
                    var s = function () {
                        return r || (r = e.fragRenderer ? e.fragRenderer(t, n) : e.renderer(t, n)), r.apply(this, arguments)
                    };
                    return e.fragRenderer ? c.preload(t, s) : c.preloadStringRenderer(t, s)
                }
            }, types: {}, ext: ".ejs", registerScript: function (t, e, n) {
                return "can.view.preloadStringRenderer('" + e + "'," + c.types["." + t].script(e, n) + ");"
            }, preload: function (e, n) {
                var r = c.cached[e] = (new t.Deferred).resolve(function (t, e) {
                    return n.call(t, t, e)
                });
                return r.__view_id = e, c.cachedRenderers[e] = n, n
            }, preloadStringRenderer: function (t, e) {
                return this.preload(t, i(e))
            }, render: function (e, n, r, i) {
                return t.view.renderAs("string", e, n, r, i)
            }, renderTo: function (t, e, n, r) {
                return ("string" === t && e.render ? e.render : e)(n, r)
            }, renderAs: function (r, i, a, l, f) {
                e(l) && (f = l, l = undefined);
                var d, p, h, g, m, v = o(a);
                if (v.length)return p = new t.Deferred, h = t.extend({}, a), v.push(s(i, !0)), t.when.apply(t, v).then(function (e) {
                    var i, s = n(arguments), o = s.pop();
                    if (t.isDeferred(a))h = u(e); else for (var c in a)t.isDeferred(a[c]) && (h[c] = u(s.shift()));
                    i = t.view.renderTo(r, o, h, l), p.resolve(i, h), f && f(i, h)
                }, function () {
                    p.reject.apply(p, arguments)
                }), p;
                if (d = t.__clearReading(), g = e(f), p = s(i, g), d && t.__setReading(d), g)m = p, p.then(function (e) {
                    f(a ? t.view.renderTo(r, e, a, l) : e)
                }); else {
                    if ("resolved" === p.state() && p.__view_id) {
                        var _ = c.cachedRenderers[p.__view_id];
                        return a ? t.view.renderTo(r, _, a, l) : _
                    }
                    p.then(function (e) {
                        m = a ? t.view.renderTo(r, e, a, l) : e
                    })
                }
                return m
            }, registerView: function (e, n, r, a) {
                var s, o = "object" == typeof r ? r : c.types[r || c.ext];
                return s = o.fragRenderer ? o.fragRenderer(e, n) : i(o.renderer(e, n)), a = a || new t.Deferred, c.cache && (c.cached[e] = a, a.__view_id = e, c.cachedRenderers[e] = s), a.resolve(s)
            }
        }), t
    }(__m2), __m9 = function (t) {
        var e = t.view.attr = function (t, e) {
            if (!e) {
                var i = n[t];
                if (!i)for (var a = 0, s = r.length; s > a; a++) {
                    var o = r[a];
                    if (o.match.test(t)) {
                        i = o.handler;
                        break
                    }
                }
                return i
            }
            "string" == typeof t ? n[t] = e : r.push({match: t, handler: e})
        }, n = {}, r = [], i = /[-\:]/, a = t.view.tag = function (t, e) {
            if (!e) {
                var n = s[t.toLowerCase()];
                return !n && i.test(t) && (n = function () {
                }), n
            }
            window.html5 && (window.html5.elements += " " + t, window.html5.shivDocument()), s[t.toLowerCase()] = e
        }, s = {};
        return t.view.callbacks = {
            _tags: s,
            _attributes: n,
            _regExpAttributes: r,
            tag: a,
            attr: e,
            tagHandler: function (e, n, r) {
                var i, a = r.options.attr("tags." + n), o = a || s[n], u = r.scope;
                if (o) {
                    var c = t.__clearReading();
                    i = o(e, r), t.__setReading(c)
                } else i = u;
                if (i && r.subtemplate) {
                    u !== i && (u = u.add(i));
                    var l = r.subtemplate(u, r.options), f = "string" == typeof l ? t.view.frag(l) : l;
                    t.appendChild(e, f)
                }
            }
        }, t.view.callbacks
    }(__m2, __m10), __m13 = function (t) {
        var e = /_|-/, n = /\=\=/, r = /([A-Z]+)([A-Z][a-z])/g, i = /([a-z\d])([A-Z])/g, a = /([a-z\d])([A-Z])/g, s = /\{([^\}]+)\}/g, o = /"/g, u = /'/g, c = /-+(.)?/g, l = /[a-z][A-Z]/g, f = function (t, e, n) {
            var r = t[e];
            return r === undefined && n === !0 && (r = t[e] = {}), r
        }, d = function (t) {
            return /^f|^o/.test(typeof t)
        }, p = function (t) {
            var e = null === t || t === undefined || isNaN(t) && "NaN" == "" + t;
            return "" + (e ? "" : t)
        };
        return t.extend(t, {
            esc: function (t) {
                return p(t).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(o, "&#34;").replace(u, "&#39;")
            }, getObject: function (e, n, r) {
                var i, a, s, o, u = e ? e.split(".") : [], c = u.length, l = 0;
                if (n = t.isArray(n) ? n : [n || window], o = n.length, !c)return n[0];
                for (l; o > l; l++) {
                    for (i = n[l], s = undefined, a = 0; c > a && d(i); a++)s = i, i = f(s, u[a]);
                    if (s !== undefined && i !== undefined)break
                }
                if (r === !1 && i !== undefined && delete s[u[a - 1]], r === !0 && i === undefined)for (i = n[0], a = 0; c > a && d(i); a++)i = f(i, u[a], !0);
                return i
            }, capitalize: function (t) {
                return t.charAt(0).toUpperCase() + t.slice(1)
            }, camelize: function (t) {
                return p(t).replace(c, function (t, e) {
                    return e ? e.toUpperCase() : ""
                })
            }, hyphenate: function (t) {
                return p(t).replace(l, function (t) {
                    return t.charAt(0) + "-" + t.charAt(1).toLowerCase()
                })
            }, underscore: function (t) {
                return t.replace(n, "/").replace(r, "$1_$2").replace(i, "$1_$2").replace(a, "_").toLowerCase()
            }, sub: function (e, n, r) {
                var i = [];
                return e = e || "", i.push(e.replace(s, function (e, a) {
                    var s = t.getObject(a, n, r === !0 ? !1 : undefined);
                    return s === undefined || null === s ? (i = null, "") : d(s) && i ? (i.push(s), "") : "" + s
                })), null === i ? i : 1 >= i.length ? i[0] : i
            }, replacer: s, undHash: e
        }), t
    }(__m2), __m12 = function (t) {
        var e = 0;
        return t.Construct = function () {
            return arguments.length ? t.Construct.extend.apply(t.Construct, arguments) : undefined
        }, t.extend(t.Construct, {
            constructorExtends: !0, newInstance: function () {
                var t, e = this.instance();
                return e.setup && (t = e.setup.apply(e, arguments)), e.init && e.init.apply(e, t || arguments), e
            }, _inherit: function (e, n, r) {
                t.extend(r || e, e || {})
            }, _overwrite: function (t, e, n, r) {
                t[n] = r
            }, setup: function (e) {
                this.defaults = t.extend(!0, {}, e.defaults, this.defaults)
            }, instance: function () {
                e = 1;
                var t = new this;
                return e = 0, t
            }, extend: function (n, r, i) {
                function a() {
                    return e ? undefined : this.constructor !== a && arguments.length && a.constructorExtends ? a.extend.apply(a, arguments) : a.newInstance.apply(a, arguments)
                }

                var s = n, o = r, u = i;
                "string" != typeof s && (u = o, o = s, s = null), u || (u = o, o = null), u = u || {};
                var c, l, f, d, p, h, g, m, v = this, _ = this.prototype;
                m = this.instance(), t.Construct._inherit(u, _, m);
                for (p in v)v.hasOwnProperty(p) && (a[p] = v[p]);
                t.Construct._inherit(o, v, a), s && (c = s.split("."), h = c.pop(), l = t.getObject(c.join("."), window, !0), g = l, f = t.underscore(s.replace(/\./g, "_")), d = t.underscore(h), l[h] = a), t.extend(a, {
                    constructor: a,
                    prototype: m,
                    namespace: g,
                    _shortName: d,
                    fullName: s,
                    _fullName: f
                }), h !== undefined && (a.shortName = h), a.prototype.constructor = a;
                var b = [v].concat(t.makeArray(arguments)), y = a.setup.apply(a, b);
                return a.init && a.init.apply(a, y || b), a
            }
        }), t.Construct.prototype.setup = function () {
        }, t.Construct.prototype.init = function () {
        }, t.Construct
    }(__m13), __m11 = function (t) {
        var e, n = function (e, n, r) {
            return t.bind.call(e, n, r), function () {
                t.unbind.call(e, n, r)
            }
        }, r = t.isFunction, i = t.extend, a = t.each, s = [].slice, o = /\{([^\}]+)\}/g, u = t.getObject("$.event.special", [t]) || {}, c = function (e, n, r, i) {
            return t.delegate.call(e, n, r, i), function () {
                t.undelegate.call(e, n, r, i)
            }
        }, l = function (e, r, i, a) {
            return a ? c(e, t.trim(a), r, i) : n(e, r, i)
        }, f = t.Control = t.Construct({
            setup: function () {
                if (t.Construct.setup.apply(this, arguments), t.Control) {
                    var e, n = this;
                    n.actions = {};
                    for (e in n.prototype)n._isAction(e) && (n.actions[e] = n._action(e))
                }
            }, _shifter: function (e, n) {
                var i = "string" == typeof n ? e[n] : n;
                return r(i) || (i = e[i]), function () {
                    return e.called = n, i.apply(e, [this.nodeName ? t.$(this) : this].concat(s.call(arguments, 0)))
                }
            }, _isAction: function (t) {
                var e = this.prototype[t], n = typeof e;
                return "constructor" !== t && ("function" === n || "string" === n && r(this.prototype[e])) && !!(u[t] || d[t] || /[^\w]/.test(t))
            }, _action: function (n, r) {
                if (o.lastIndex = 0, r || !o.test(n)) {
                    var i = r ? t.sub(n, this._lookup(r)) : n;
                    if (!i)return null;
                    var a = t.isArray(i), s = a ? i[1] : i, u = s.split(/\s+/g), c = u.pop();
                    return {processor: d[c] || e, parts: [s, u.join(" "), c], delegate: a ? i[0] : undefined}
                }
            }, _lookup: function (t) {
                return [t, window]
            }, processors: {}, defaults: {}
        }, {
            setup: function (e, n) {
                var r, a = this.constructor, s = a.pluginName || a._fullName;
                return this.element = t.$(e), s && "can_control" !== s && this.element.addClass(s), r = t.data(this.element, "controls"), r || (r = [], t.data(this.element, "controls", r)), r.push(this), this.options = i({}, a.defaults, n), this.on(), [this.element, this.options]
            }, on: function (e, n, r, i) {
                if (!e) {
                    this.off();
                    var a, s, o = this.constructor, u = this._bindings, c = o.actions, f = this.element, d = t.Control._shifter(this, "destroy");
                    for (a in c)c.hasOwnProperty(a) && (s = c[a] || o._action(a, this.options, this), s && (u.control[a] = s.processor(s.delegate || f, s.parts[2], s.parts[1], a, this)));
                    return t.bind.call(f, "removed", d), u.user.push(function (e) {
                        t.unbind.call(e, "removed", d)
                    }), u.user.length
                }
                return "string" == typeof e && (i = r, r = n, n = e, e = this.element), i === undefined && (i = r, r = n, n = null), "string" == typeof i && (i = t.Control._shifter(this, i)), this._bindings.user.push(l(e, r, i, n)), this._bindings.user.length
            }, off: function () {
                var t = this.element[0], e = this._bindings;
                e && (a(e.user || [], function (e) {
                    e(t)
                }), a(e.control || {}, function (e) {
                    e(t)
                })), this._bindings = {user: [], control: {}}
            }, destroy: function () {
                if (null !== this.element) {
                    var e, n = this.constructor, r = n.pluginName || n._fullName;
                    this.off(), r && "can_control" !== r && this.element.removeClass(r), e = t.data(this.element, "controls"), e.splice(t.inArray(this, e), 1), t.trigger(this, "destroyed"), this.element = null
                }
            }
        }), d = t.Control.processors;
        return e = function (e, n, r, i, a) {
            return l(e, n, t.Control._shifter(a, i), r)
        }, a(["change", "click", "contextmenu", "dblclick", "keydown", "keyup", "keypress", "mousedown", "mousemove", "mouseout", "mouseover", "mouseup", "reset", "resize", "scroll", "select", "submit", "focusin", "focusout", "mouseenter", "mouseleave", "touchstart", "touchmove", "touchcancel", "touchend", "touchleave", "inserted", "removed"], function (t) {
            d[t] = e
        }), f
    }(__m2, __m12), __m16 = function (t) {
        return t.bindAndSetup = function () {
            return t.addEvent.apply(this, arguments), this._init || (this._bindings ? this._bindings++ : (this._bindings = 1, this._bindsetup && this._bindsetup())), this
        }, t.unbindAndTeardown = function () {
            return t.removeEvent.apply(this, arguments), null === this._bindings ? this._bindings = 0 : this._bindings--, !this._bindings && this._bindteardown && this._bindteardown(), this
        }, t
    }(__m2), __m17 = function (t) {
        var e = t.bubble = {
            event: function (t, e) {
                return t.constructor._bubbleRule(e, t)
            }, childrenOf: function (t, n) {
                t._each(function (r, i) {
                    r && r.bind && e.toParent(r, t, i, n)
                })
            }, teardownChildrenFrom: function (t, n) {
                t._each(function (r) {
                    e.teardownFromParent(t, r, n)
                })
            }, toParent: function (e, n, r, i) {
                t.listenTo.call(n, e, i, function () {
                    var i = t.makeArray(arguments), a = i.shift();
                    i[0] = (t.List && n instanceof t.List ? n.indexOf(e) : r) + (i[0] ? "." + i[0] : ""), a.triggeredNS = a.triggeredNS || {}, a.triggeredNS[n._cid] || (a.triggeredNS[n._cid] = !0, t.trigger(n, a, i))
                })
            }, teardownFromParent: function (e, n, r) {
                n && n.unbind && t.stopListening.call(e, n, r)
            }, isBubbling: function (t, e) {
                return t._bubbleBindings && t._bubbleBindings[e]
            }, bind: function (t, n) {
                if (!t._init) {
                    var r = e.event(t, n);
                    r && (t._bubbleBindings || (t._bubbleBindings = {}), t._bubbleBindings[r] ? t._bubbleBindings[r]++ : (t._bubbleBindings[r] = 1, e.childrenOf(t, r)))
                }
            }, unbind: function (n, r) {
                var i = e.event(n, r);
                i && (n._bubbleBindings && n._bubbleBindings[i]--, n._bubbleBindings && !n._bubbleBindings[i] && (delete n._bubbleBindings[i], e.teardownChildrenFrom(n, i), t.isEmptyObject(n._bubbleBindings) && delete n._bubbleBindings))
            }, add: function (n, r, i) {
                if (r instanceof t.Map && n._bubbleBindings)for (var a in n._bubbleBindings)n._bubbleBindings[a] && (e.teardownFromParent(n, r, a), e.toParent(r, n, i, a))
            }, removeMany: function (t, n) {
                for (var r = 0, i = n.length; i > r; r++)e.remove(t, n[r])
            }, remove: function (n, r) {
                if (r instanceof t.Map && n._bubbleBindings)for (var i in n._bubbleBindings)n._bubbleBindings[i] && e.teardownFromParent(n, r, i)
            }, set: function (n, r, i, a) {
                return t.Map.helpers.isObservable(i) && e.add(n, i, r), t.Map.helpers.isObservable(a) && e.remove(n, a), i
            }
        };
        return e
    }(__m2), __m18 = function (t) {
        var e = 1, n = 0, r = [], i = [];
        t.batch = {
            start: function (t) {
                n++, t && i.push(t)
            }, stop: function (a, s) {
                if (a ? n = 0 : n--, 0 === n) {
                    var o, u, c = r.slice(0), l = i.slice(0);
                    for (r = [], i = [], e++, s && t.batch.start(), o = 0, u = c.length; u > o; o++)t.dispatch.apply(c[o][0], c[o][1]);
                    for (o = 0, u = l.length; l.length > o; o++)l[o]()
                }
            }, trigger: function (i, a, s) {
                if (!i._init) {
                    if (0 === n)return t.dispatch.call(i, a, s);
                    a = "string" == typeof a ? {type: a} : a, a.batchNum = e, r.push([i, [a, s]])
                }
            }
        }
    }(__m4), __m15 = function (t, e, n) {
        var r = null, i = function () {
            for (var t in r)r[t].added && delete r[t].obj._cid;
            r = null
        }, a = function (t) {
            return r && r[t._cid] && r[t._cid].instance
        }, s = null, o = t.Map = t.Construct.extend({
            setup: function () {
                if (t.Construct.setup.apply(this, arguments), t.Map) {
                    this.defaults || (this.defaults = {}), this._computes = [];
                    for (var e in this.prototype)"define" !== e && "function" != typeof this.prototype[e] ? this.defaults[e] = this.prototype[e] : this.prototype[e].isComputed && this._computes.push(e);
                    this.helpers.define && this.helpers.define(this)
                }
                !t.List || this.prototype instanceof t.List || (this.List = o.List.extend({Map: this}, {}))
            },
            _bubble: n,
            _bubbleRule: function (t) {
                return ("change" === t || t.indexOf(".") >= 0) && "change"
            },
            _computes: [],
            bind: t.bindAndSetup,
            on: t.bindAndSetup,
            unbind: t.unbindAndTeardown,
            off: t.unbindAndTeardown,
            id: "id",
            helpers: {
                define: null, attrParts: function (t, e) {
                    return e ? [t] : "object" == typeof t ? t : ("" + t).split(".")
                }, addToMap: function (e, n) {
                    var a;
                    r || (a = i, r = {});
                    var s = e._cid, o = t.cid(e);
                    return r[o] || (r[o] = {obj: e, instance: n, added: !s}), a
                }, isObservable: function (e) {
                    return e instanceof t.Map || e && e === t.route
                }, canMakeObserve: function (e) {
                    return e && !t.isDeferred(e) && (t.isArray(e) || t.isPlainObject(e))
                }, serialize: function (e, n, r) {
                    var i = t.cid(e), a = !1;
                    return s || (a = !0, s = {attr: {}, serialize: {}}), s[n][i] = r, e.each(function (i, a) {
                        var u, c = o.helpers.isObservable(i), l = c && s[n][t.cid(i)];
                        u = l ? l : "serialize" === n ? o.helpers._serialize(e, a, i) : o.helpers._getValue(e, a, i, n), u !== undefined && (r[a] = u)
                    }), t.__reading(e, "__keys"), a && (s = null), r
                }, _serialize: function (t, e, n) {
                    return o.helpers._getValue(t, e, n, "serialize")
                }, _getValue: function (t, e, n, r) {
                    return o.helpers.isObservable(n) ? n[r]() : n
                }
            },
            keys: function (e) {
                var n = [];
                t.__reading(e, "__keys");
                for (var r in e._data)n.push(r);
                return n
            }
        }, {
            setup: function (e) {
                e instanceof t.Map && (e = e.serialize()), this._data = {}, t.cid(this, ".map"), this._init = 1;
                var n = this._setupDefaults();
                this._setupComputes(n);
                var r = e && t.Map.helpers.addToMap(e, this), i = t.extend(t.extend(!0, {}, n), e);
                this.attr(i), r && r(), this.bind("change", t.proxy(this._changes, this)), delete this._init
            }, _setupComputes: function () {
                var t = this.constructor._computes;
                this._computedBindings = {};
                for (var e, n = 0, r = t.length; r > n; n++)e = t[n], this[e] = this[e].clone(this), this._computedBindings[e] = {count: 0}
            }, _setupDefaults: function () {
                return this.constructor.defaults || {}
            }, _bindsetup: function () {
            }, _bindteardown: function () {
            }, _changes: function (e, n, r, i, a) {
                t.batch.trigger(this, {type: n, batchNum: e.batchNum, target: e.target}, [i, a])
            }, _triggerChange: function (e, r, i, a) {
                n.isBubbling(this, "change") ? t.batch.trigger(this, {
                    type: "change",
                    target: this
                }, [e, r, i, a]) : t.batch.trigger(this, e, [i, a]), ("remove" === r || "add" === r) && t.batch.trigger(this, {
                    type: "__keys",
                    target: this
                })
            }, _each: function (t) {
                var e = this.__get();
                for (var n in e)e.hasOwnProperty(n) && t(e[n], n)
            }, attr: function (e, n) {
                var r = typeof e;
                return "string" !== r && "number" !== r ? this._attrs(e, n) : 1 === arguments.length ? (t.__reading(this, e), this._get(e)) : (this._set(e, n), this)
            }, each: function () {
                return t.each.apply(undefined, [this].concat(t.makeArray(arguments)))
            }, removeAttr: function (e) {
                var n = t.List && this instanceof t.List, r = t.Map.helpers.attrParts(e), i = r.shift(), a = n ? this[i] : this._data[i];
                return r.length && a ? a.removeAttr(r) : ("string" == typeof e && ~e.indexOf(".") && (i = e), this._remove(i, a), a)
            }, _remove: function (t, e) {
                t in this._data && (delete this._data[t], t in this.constructor.prototype || delete this[t], this._triggerChange(t, "remove", undefined, e))
            }, _get: function (t) {
                t = "" + t;
                var e = t.indexOf(".");
                if (e >= 0) {
                    var n = this.__get(t);
                    if (n !== undefined)return n;
                    var r = t.substr(0, e), i = t.substr(e + 1), a = this.__get(r);
                    return a && a._get ? a._get(i) : undefined
                }
                return this.__get(t)
            }, __get: function (t) {
                return t ? this._computedBindings[t] ? this[t]() : this._data[t] : this._data
            }, __type: function (e) {
                if (!(e instanceof t.Map) && t.Map.helpers.canMakeObserve(e)) {
                    var n = a(e);
                    if (n)return n;
                    if (t.isArray(e)) {
                        var r = t.List;
                        return new r(e)
                    }
                    var i = this.constructor.Map || t.Map;
                    return new i(e)
                }
                return e
            }, _set: function (t, e, n) {
                t = "" + t;
                var r, i = t.indexOf(".");
                if (!n && i >= 0) {
                    var a = t.substr(0, i), s = t.substr(i + 1);
                    if (r = this._init ? undefined : this.__get(a), !o.helpers.isObservable(r))throw"can.Map: Object does not exist";
                    r._set(s, e)
                } else this.__convert && (e = this.__convert(t, e)), r = this._init ? undefined : this.__get(t), this.__set(t, this.__type(e, t), r)
            }, __set: function (t, e, n) {
                if (e !== n) {
                    var r = n !== undefined || this.__get().hasOwnProperty(t) ? "set" : "add";
                    this.___set(t, this.constructor._bubble.set(this, t, e, n)), this._triggerChange(t, r, e, n), n && this.constructor._bubble.teardownFromParent(this, n)
                }
            }, ___set: function (t, e) {
                this._computedBindings[t] ? this[t](e) : this._data[t] = e, "function" == typeof this.constructor.prototype[t] || this._computedBindings[t] || (this[t] = e)
            }, bind: function (e) {
                var n = this._computedBindings && this._computedBindings[e];
                if (n)if (n.count)n.count++; else {
                    n.count = 1;
                    var r = this;
                    n.handler = function (n, i, a) {
                        t.batch.trigger(r, {type: e, batchNum: n.batchNum, target: r}, [i, a])
                    }, this[e].bind("change", n.handler)
                }
                return this.constructor._bubble.bind(this, e), t.bindAndSetup.apply(this, arguments)
            }, unbind: function (e) {
                var n = this._computedBindings && this._computedBindings[e];
                return n && (1 === n.count ? (n.count = 0, this[e].unbind("change", n.handler), delete n.handler) : n.count--), this.constructor._bubble.unbind(this, e), t.unbindAndTeardown.apply(this, arguments)
            }, serialize: function () {
                return t.Map.helpers.serialize(this, "serialize", {})
            }, _attrs: function (e, n) {
                if (e === undefined)return o.helpers.serialize(this, "attr", {});
                e = t.simpleExtend({}, e);
                var r, i, a = this;
                t.batch.start(), this.each(function (t, r) {
                    if ("_cid" !== r) {
                        if (i = e[r], i === undefined)return n && a.removeAttr(r), undefined;
                        a.__convert && (i = a.__convert(r, i)), o.helpers.isObservable(i) ? a.__set(r, a.__type(i, r), t) : o.helpers.isObservable(t) && o.helpers.canMakeObserve(i) ? t.attr(i, n) : t !== i && a.__set(r, a.__type(i, r), t), delete e[r]
                    }
                });
                for (r in e)"_cid" !== r && (i = e[r], this._set(r, i, !0));
                return t.batch.stop(), this
            }, compute: function (e) {
                if (t.isFunction(this.constructor.prototype[e]))return t.compute(this[e], this);
                var n = e.split("."), r = n.length - 1, i = {args: []};
                return t.compute(function (e) {
                    return arguments.length ? (t.compute.read(this, n.slice(0, r)).value.attr(n[r], e), undefined) : t.compute.read(this, n, i).value
                }, this)
            }
        });
        return o.prototype.on = o.prototype.bind, o.prototype.off = o.prototype.unbind, o
    }(__m2, __m16, __m17, __m12, __m18), __m19 = function (t, e, n) {
        var r = [].splice, i = function () {
            var t = {0: "a", length: 1};
            return r.call(t, 0, 1), !t[0]
        }(), a = e.extend({Map: e}, {
            setup: function (e, n) {
                this.length = 0, t.cid(this, ".map"), this._init = 1, this._setupComputes(), e = e || [];
                var r;
                t.isDeferred(e) ? this.replace(e) : (r = e.length && t.Map.helpers.addToMap(e, this), this.push.apply(this, t.makeArray(e || []))), r && r(), this.bind("change", t.proxy(this._changes, this)), t.simpleExtend(this, n), delete this._init
            }, _triggerChange: function (n, r, i, a) {
                e.prototype._triggerChange.apply(this, arguments);
                var s = +n;
                ~n.indexOf(".") || isNaN(s) || ("add" === r ? (t.batch.trigger(this, r, [i, s]), t.batch.trigger(this, "length", [this.length])) : "remove" === r ? (t.batch.trigger(this, r, [a, s]), t.batch.trigger(this, "length", [this.length])) : t.batch.trigger(this, r, [i, s]))
            }, __get: function (e) {
                return e ? this[e] && this[e].isComputed && t.isFunction(this.constructor.prototype[e]) ? this[e]() : this[e] : this
            }, ___set: function (t, e) {
                this[t] = e, +t >= this.length && (this.length = +t + 1)
            }, _remove: function (t, e) {
                isNaN(+t) ? (delete this[t], this._triggerChange(t, "remove", undefined, e)) : this.splice(t, 1)
            }, _each: function (t) {
                for (var e = this.__get(), n = 0; e.length > n; n++)t(e[n], n)
            }, serialize: function () {
                return e.helpers.serialize(this, "serialize", [])
            }, splice: function (e, a) {
                var s, o, u = t.makeArray(arguments), c = [];
                for (s = 2; u.length > s; s++)u[s] = n.set(this, s, this.__type(u[s], s)), c.push(u[s]);
                a === undefined && (a = u[1] = this.length - e);
                var l = r.apply(this, u), f = l;
                if (c.length && l.length)for (o = 0; l.length > o; o++)t.inArray(l[o], c) >= 0 && f.splice(o, 1);
                if (!i)for (s = this.length; l.length + this.length > s; s++)delete this[s];
                return t.batch.start(), a > 0 && (this._triggerChange("" + e, "remove", undefined, l), n.removeMany(this, l)), u.length > 2 && this._triggerChange("" + e, "add", u.slice(2), l), t.batch.stop(), l
            }, _attrs: function (n, r) {
                return n === undefined ? e.helpers.serialize(this, "attr", []) : (n = t.makeArray(n), t.batch.start(), this._updateAttrs(n, r), t.batch.stop(), undefined)
            }, _updateAttrs: function (t, n) {
                for (var r = Math.min(t.length, this.length), i = 0; r > i; i++) {
                    var a = this[i], s = t[i];
                    e.helpers.isObservable(a) && e.helpers.canMakeObserve(s) ? a.attr(s, n) : a !== s && this._set(i, s)
                }
                t.length > this.length ? this.push.apply(this, t.slice(this.length)) : t.length < this.length && n && this.splice(t.length)
            }
        }), s = function (e) {
            return e[0] && t.isArray(e[0]) ? e[0] : t.makeArray(e)
        };
        return t.each({push: "length", unshift: 0}, function (t, e) {
            var r = [][e];
            a.prototype[e] = function () {
                for (var e, i, a = [], s = t ? this.length : 0, o = arguments.length; o--;)i = arguments[o], a[o] = n.set(this, o, this.__type(i, o));
                return e = r.apply(this, a), (!this.comparator || a.length) && this._triggerChange("" + s, "add", a, undefined), e
            }
        }), t.each({pop: "length", shift: 0}, function (t, e) {
            a.prototype[e] = function () {
                var r = s(arguments), i = t && this.length ? this.length - 1 : 0, a = [][e].apply(this, r);
                return this._triggerChange("" + i, "remove", undefined, [a]), a && a.unbind && n.remove(this, a), a
            }
        }), t.extend(a.prototype, {
            indexOf: function (e, n) {
                return this.attr("length"), t.inArray(e, this, n)
            }, join: function () {
                return [].join.apply(this.attr(), arguments)
            }, reverse: function () {
                var e = t.makeArray([].reverse.call(this));
                this.replace(e)
            }, slice: function () {
                var t = Array.prototype.slice.apply(this, arguments);
                return new this.constructor(t)
            }, concat: function () {
                var e = [];
                return t.each(t.makeArray(arguments), function (n, r) {
                    e[r] = n instanceof t.List ? n.serialize() : n
                }), new this.constructor(Array.prototype.concat.apply(this.serialize(), e))
            }, forEach: function (e, n) {
                return t.each(this, e, n || this)
            }, replace: function (e) {
                return t.isDeferred(e) ? e.then(t.proxy(this.replace, this)) : this.splice.apply(this, [0, this.length].concat(t.makeArray(e || []))), this
            }, filter: function (e, n) {
                var r, i = new t.List, a = this;
                return this.each(function (t, s) {
                    r = e.call(n | a, t, s, a), r && i.push(t)
                }), i
            }
        }), t.List = e.List = a, t.List
    }(__m2, __m15, __m17), __m20 = function (t) {
        var e = [];
        t.__read = function (t, n) {
            e.push({});
            var r = t.call(n);
            return {value: r, observed: e.pop()}
        }, t.__reading = function (t, n) {
            e.length && (e[e.length - 1][t._cid + "|" + n] = {obj: t, event: n + ""})
        }, t.__clearReading = function () {
            if (e.length) {
                var t = e[e.length - 1];
                return e[e.length - 1] = {}, t
            }
        }, t.__setReading = function (t) {
            e.length && (e[e.length - 1] = t)
        }, t.__addReading = function (n) {
            e.length && t.simpleExtend(e[e.length - 1], n)
        };
        var n = function (e, n, i, s) {
            var o = t.__read(e, n), u = o.observed;
            return r(i, u, s), a(i, s), o
        }, r = function (t, e, n) {
            for (var r in e)i(t, e, r, n)
        }, i = function (t, e, n, r) {
            if (t[n])delete t[n]; else {
                var i = e[n];
                i.obj.bind(i.event, r)
            }
        }, a = function (t, e) {
            for (var n in t) {
                var r = t[n];
                r.obj.unbind(r.event, e)
            }
        }, s = function (e, n, r, i) {
            n !== r && t.batch.trigger(e, i ? {type: "change", batchNum: i} : "change", [n, r])
        }, o = function (e, r, i, a) {
            var s, o, u;
            return {
                on: function (c) {
                    o || (o = function (t) {
                        if (e.bound && (t.batchNum === undefined || t.batchNum !== u)) {
                            var a = s.value;
                            s = n(r, i, s.observed, o), c(s.value, a, t.batchNum), u = u = t.batchNum
                        }
                    }), s = n(r, i, {}, o), a(s.value), e.hasDependencies = !t.isEmptyObject(s.observed)
                }, off: function () {
                    for (var t in s.observed) {
                        var e = s.observed[t];
                        e.obj.unbind(e.event, o)
                    }
                }
            }
        }, u = function (e, r, i, a) {
            var s, o, u, c;
            return {
                on: function (l) {
                    u || (u = function (n) {
                        if (e.bound && (n.batchNum === undefined || n.batchNum !== c)) {
                            var a = t.__clearReading(), s = r.call(i);
                            t.__setReading(a), l(s, o, n.batchNum), o = s, c = c = n.batchNum
                        }
                    }), s = n(r, i, {}, u), o = s.value, a(s.value), e.hasDependencies = !t.isEmptyObject(s.observed)
                }, off: function () {
                    for (var t in s.observed) {
                        var e = s.observed[t];
                        e.obj.unbind(e.event, u)
                    }
                }
            }
        }, c = function (e) {
            return e instanceof t.Map || e && e.__get
        }, l = function () {
        };
        t.compute = function (n, r, i, a) {
            if (n && n.isComputed)return n;
            for (var c, f, d, p = l, h = l, g = function () {
                return f
            }, m = function (t) {
                f = t
            }, v = m, _ = [], b = function (t, e, n) {
                v(t), s(c, t, e, n)
            }, y = 0, w = arguments.length; w > y; y++)_[y] = arguments[y];
            if (c = function (n) {
                    if (arguments.length) {
                        var i = f, a = m.call(r, n, i);
                        return c.hasDependencies ? g.call(r) : (f = a === undefined ? g.call(r) : a, s(c, f, i), f)
                    }
                    return e.length && c.canReadForChangeEvent !== !1 && (t.__reading(c, "change"), c.bound || t.compute.temporarilyBind(c)), c.bound ? f : g.call(r)
                }, "function" == typeof n) {
                m = n, g = n, c.canReadForChangeEvent = i === !1 ? !1 : !0;
                var x = a ? u(c, n, r || this, v) : o(c, n, r || this, v);
                p = x.on, h = x.off
            } else if (r)if ("string" == typeof r) {
                var k = r, C = n instanceof t.Map;
                if (C) {
                    c.hasDependencies = !0;
                    var A;
                    g = function () {
                        return n.attr(k)
                    }, m = function (t) {
                        n.attr(k, t)
                    }, p = function (e) {
                        A = function (t, n, r) {
                            e(n, r, t.batchNum)
                        }, n.bind(i || k, A), f = t.__read(g).value
                    }, h = function () {
                        n.unbind(i || k, A)
                    }
                } else g = function () {
                    return n[k]
                }, m = function (t) {
                    n[k] = t
                }, p = function (e) {
                    A = function () {
                        e(g(), f)
                    }, t.bind.call(n, i || k, A), f = t.__read(g).value
                }, h = function () {
                    t.unbind.call(n, i || k, A)
                }
            } else if ("function" == typeof r)f = n, m = r, r = i, d = "setter"; else {
                f = n;
                var N = r, T = b;
                if (r = N.context || N, g = N.get || g, m = N.set || function () {
                        return f
                    }, N.fn) {
                    var M, O = N.fn;
                    g = function () {
                        return O.call(r, f)
                    }, 0 === O.length ? M = o(c, O, r, v) : 1 === O.length ? M = o(c, function () {
                        return O.call(r, f)
                    }, r, v) : (b = function (t) {
                        t !== undefined && T(t, f)
                    }, M = o(c, function () {
                        var t = O.call(r, f, function (t) {
                            T(t, f)
                        });
                        return t !== undefined ? t : f
                    }, r, v)), p = M.on, h = M.off
                } else b = function () {
                    var t = g.call(r);
                    T(t, f)
                };
                p = N.on || p, h = N.off || h
            } else f = n;
            return t.cid(c, "compute"), t.simpleExtend(c, {
                isComputed: !0, _bindsetup: function () {
                    this.bound = !0;
                    var e = t.__clearReading();
                    p.call(this, b), t.__setReading(e)
                }, _bindteardown: function () {
                    h.call(this, b), this.bound = !1
                }, bind: t.bindAndSetup, unbind: t.unbindAndTeardown, clone: function (e) {
                    return e && ("setter" === d ? _[2] = e : _[1] = e), t.compute.apply(t, _)
                }
            })
        };
        var f, d = function () {
            for (var t = 0, e = f.length; e > t; t++)f[t].unbind("change", l);
            f = null
        };
        return t.compute.temporarilyBind = function (t) {
            t.bind("change", l), f || (f = [], setTimeout(d, 10)), f.push(t)
        }, t.compute.truthy = function (e) {
            return t.compute(function () {
                var t = e();
                return "function" == typeof t && (t = t()), !!t
            })
        }, t.compute.async = function (e, n, r) {
            return t.compute(e, {fn: n, context: r})
        }, t.compute.read = function (e, n, r) {
            r = r || {};
            for (var i, a, s, o = e, u = 0, l = n.length; l > u; u++)if (a = o, a && a.isComputed && (r.foundObservable && r.foundObservable(a, u), a = o = a()), c(a) ? (!s && r.foundObservable && r.foundObservable(a, u), s = 1, o = "function" == typeof a[n[u]] && a.constructor.prototype[n[u]] === a[n[u]] ? r.returnObserveMethods ? o[n[u]] : "constructor" === n[u] && a instanceof t.Construct ? a[n[u]] : a[n[u]].apply(a, r.args || []) : o.attr(n[u])) : o = a[n[u]], i = typeof o, o && o.isComputed && !r.isArgument && l - 1 > u ? (!s && r.foundObservable && r.foundObservable(a, u + 1), o = o()) : n.length - 1 > u && "function" === i && r.executeAnonymousFunctions && !(t.Construct && o.prototype instanceof t.Construct) && (o = o()), n.length - 1 > u && (null === o || "function" !== i && "object" !== i))return r.earlyExit && r.earlyExit(a, u, o), {
                value: undefined,
                parent: a
            };
            return "function" != typeof o || t.Construct && o.prototype instanceof t.Construct || t.route && o === t.route || (r.isArgument ? o.isComputed || r.proxyMethods === !1 || (o = t.proxy(o, a)) : (o.isComputed && !s && r.foundObservable && r.foundObservable(o, u), o = o.call(a))), o === undefined && r.earlyExit && r.earlyExit(a, u - 1), {
                value: o,
                parent: a
            }
        }, t.compute
    }(__m2, __m16, __m18), __m14 = function (t) {
        return t.Observe = t.Map, t.Observe.startBatch = t.batch.start, t.Observe.stopBatch = t.batch.stop, t.Observe.triggerBatch = t.batch.trigger, t
    }(__m2, __m15, __m19, __m20), __m22 = function (t) {
        var e = /(\\)?\./g, n = /\\\./g, r = function (t) {
            var r = [], i = 0;
            return t.replace(e, function (e, a, s) {
                a || (r.push(t.slice(i, s).replace(n, ".")), i = s + e.length)
            }), r.push(t.slice(i).replace(n, ".")), r
        }, i = t.Construct.extend({read: t.compute.read}, {
            init: function (t, e) {
                this._context = t, this._parent = e, this.__cache = {}
            }, attr: function (e) {
                var n = t.__clearReading(), r = this.read(e, {
                    isArgument: !0,
                    returnObserveMethods: !0,
                    proxyMethods: !1
                }).value;
                return t.__setReading(n), r
            }, add: function (t) {
                return t !== this._context ? new this.constructor(t, this) : this
            }, computeData: function (e, n) {
                n = n || {args: []};
                var r, i, a = this, s = {
                    compute: t.compute(function (o) {
                        if (!arguments.length) {
                            if (r)return t.compute.read(r, i, n).value;
                            var u = a.read(e, n);
                            return r = u.rootObserve, i = u.reads, s.scope = u.scope, s.initialValue = u.value, s.reads = u.reads, s.root = r, u.value
                        }
                        if (r.isComputed && !i.length)r(o); else {
                            var c = i.length - 1;
                            t.compute.read(r, i.slice(0, c)).value.attr(i[c], o)
                        }
                    })
                };
                return s
            }, compute: function (t, e) {
                return this.computeData(t, e).compute
            }, read: function (e, n) {
                var i;
                if ("./" === e.substr(0, 2))i = !0, e = e.substr(2); else {
                    if ("../" === e.substr(0, 3))return this._parent.read(e.substr(3), n);
                    if (".." === e)return {value: this._parent._context};
                    if ("." === e || "this" === e)return {value: this._context}
                }
                for (var a, s, o, u, c, l, f = -1 === e.indexOf("\\.") ? e.split(".") : r(e), d = this, p = [], h = -1; d;) {
                    if (a = d._context, null !== a) {
                        var g = t.compute.read(a, f, t.simpleExtend({
                            foundObservable: function (t, e) {
                                c = t, l = f.slice(e)
                            }, earlyExit: function (e, n) {
                                n > h && (s = c, p = l, h = n, u = d, o = t.__clearReading())
                            }, executeAnonymousFunctions: !0
                        }, n));
                        if (g.value !== undefined)return {scope: d, rootObserve: c, value: g.value, reads: l}
                    }
                    t.__clearReading(), d = i ? null : d._parent
                }
                return s ? (t.__setReading(o), {scope: u, rootObserve: s, reads: p, value: undefined}) : {
                    names: f,
                    value: undefined
                }
            }
        });
        return t.view.Scope = i, i
    }(__m2, __m12, __m15, __m19, __m10, __m20), __m24 = function (t) {
        var e = function () {
            return 1 === t.$(document.createComment("~")).length
        }(), n = {
            tagToContentPropMap: {
                option: "textContent"in document.createElement("option") ? "textContent" : "innerText",
                textarea: "value"
            },
            attrMap: t.attr.map,
            attrReg: /([^\s=]+)[\s]*=[\s]*/,
            defaultValue: t.attr.defaultValue,
            tagMap: {
                "": "span",
                colgroup: "col",
                table: "tbody",
                tr: "td",
                ol: "li",
                ul: "li",
                tbody: "tr",
                thead: "tr",
                tfoot: "tr",
                select: "option",
                optgroup: "option"
            },
            reverseTagMap: {col: "colgroup", tr: "tbody", option: "select", td: "tr", th: "tr", li: "ul"},
            getParentNode: function (t, e) {
                return e && 11 === t.parentNode.nodeType ? e : t.parentNode
            },
            setAttr: t.attr.set,
            getAttr: t.attr.get,
            removeAttr: t.attr.remove,
            contentText: function (t) {
                return "string" == typeof t ? t : t || 0 === t ? "" + t : ""
            },
            after: function (e, n) {
                var r = e[e.length - 1];
                r.nextSibling ? t.insertBefore(r.parentNode, n, r.nextSibling) : t.appendChild(r.parentNode, n)
            },
            replace: function (r, i) {
                n.after(r, i), t.remove(t.$(r)).length < r.length && !e && t.each(r, function (t) {
                    8 === t.nodeType && t.parentNode.removeChild(t)
                })
            }
        };
        return t.view.elements = n, n
    }(__m2, __m10), __m23 = function (can, elements, viewCallbacks) {
        var newLine = /(\r|\n)+/g, notEndTag = /\//, clean = function (t) {
            return t.split("\\").join("\\\\").split("\n").join("\\n").split('"').join('\\"').split("	").join("\\t")
        }, getTag = function (t, e, n) {
            if (t)return t;
            for (; e.length > n;) {
                if ("<" === e[n] && !notEndTag.test(e[n + 1]))return elements.reverseTagMap[e[n + 1]] || "span";
                n++
            }
            return ""
        }, bracketNum = function (t) {
            return --t.split("{").length - --t.split("}").length
        }, myEval = function (script) {
            eval(script)
        }, attrReg = /([^\s]+)[\s]*=[\s]*$/, startTxt = "var ___v1ew = [];", finishTxt = "return ___v1ew.join('')", put_cmd = "___v1ew.push(\n", insert_cmd = put_cmd, htmlTag = null, quote = null, beforeQuote = null, rescan = null, getAttrName = function () {
            var t = beforeQuote.match(attrReg);
            return t && t[1]
        }, status = function () {
            return quote ? "'" + getAttrName() + "'" : htmlTag ? 1 : 0
        }, top = function (t) {
            return t[t.length - 1]
        }, Scanner;
        return can.view.Scanner = Scanner = function (t) {
            can.extend(this, {
                text: {},
                tokens: []
            }, t), this.text.options = this.text.options || "", this.tokenReg = [], this.tokenSimple = {
                "<": "<",
                ">": ">",
                '"': '"',
                "'": "'"
            }, this.tokenComplex = [], this.tokenMap = {};
            for (var e, n = 0; e = this.tokens[n]; n++)e[2] ? (this.tokenReg.push(e[2]), this.tokenComplex.push({
                abbr: e[1],
                re: RegExp(e[2]),
                rescan: e[3]
            })) : (this.tokenReg.push(e[1]), this.tokenSimple[e[1]] = e[0]), this.tokenMap[e[0]] = e[1];
            this.tokenReg = RegExp("(" + this.tokenReg.slice(0).concat(["<", ">", '"', "'"]).join("|") + ")", "g")
        }, Scanner.prototype = {
            helpers: [], scan: function (t, e) {
                var n = [], r = 0, i = this.tokenSimple, a = this.tokenComplex;
                t = t.replace(newLine, "\n"), this.transform && (t = this.transform(t)), t.replace(this.tokenReg, function (e, s) {
                    var o = arguments[arguments.length - 2];
                    if (o > r && n.push(t.substring(r, o)), i[e])n.push(e); else for (var u, c = 0; u = a[c]; c++)if (u.re.test(e)) {
                        n.push(u.abbr), u.rescan && n.push(u.rescan(s));
                        break
                    }
                    r = o + s.length
                }), t.length > r && n.push(t.substr(r));
                var s, o, u, c, l = "", f = [startTxt + (this.text.start || "")], d = function (t, e) {
                    f.push(put_cmd, '"', clean(t), '"' + (e || "") + ");")
                }, p = [], h = null, g = !1, m = {
                    attributeHookups: [],
                    tagHookups: [],
                    lastTagHookup: ""
                }, v = function () {
                    m.lastTagHookup = m.tagHookups.pop() + m.tagHookups.length
                }, _ = "", b = [], y = !1, w = !1, x = 0, k = this.tokenMap;
                for (htmlTag = quote = beforeQuote = null; (u = n[x++]) !== undefined;) {
                    if (null === h)switch (u) {
                        case k.left:
                        case k.escapeLeft:
                        case k.returnLeft:
                            g = htmlTag && 1;
                        case k.commentLeft:
                            h = u, l.length && d(l), l = "";
                            break;
                        case k.escapeFull:
                            g = htmlTag && 1, rescan = 1, h = k.escapeLeft, l.length && d(l), rescan = n[x++], l = rescan.content || rescan, rescan.before && d(rescan.before), n.splice(x, 0, k.right);
                            break;
                        case k.commentFull:
                            break;
                        case k.templateLeft:
                            l += k.left;
                            break;
                        case"<":
                            0 !== n[x].indexOf("!--") && (htmlTag = 1, g = 0), l += u;
                            break;
                        case">":
                            htmlTag = 0;
                            var C = "/" === l.substr(l.length - 1) || "--" === l.substr(l.length - 2), A = "";
                            if (m.attributeHookups.length && (A = "attrs: ['" + m.attributeHookups.join("','") + "'], ", m.attributeHookups = []), _ + m.tagHookups.length !== m.lastTagHookup && _ === top(m.tagHookups))C && (l = l.substr(0, l.length - 1)), f.push(put_cmd, '"', clean(l), '"', ",can.view.pending({tagName:'" + _ + "'," + A + "scope: " + (this.text.scope || "this") + this.text.options), C ? (f.push("}));"), l = "/>", v()) : "<" === n[x] && n[x + 1] === "/" + _ ? (f.push("}));"), l = u, v()) : (f.push(",subtemplate: function(" + this.text.argNames + "){\n" + startTxt + (this.text.start || "")), l = ""); else if (g || !y && elements.tagToContentPropMap[b[b.length - 1]] || A) {
                                var N = ",can.view.pending({" + A + "scope: " + (this.text.scope || "this") + this.text.options + '}),"';
                                C ? d(l.substr(0, l.length - 1), N + '/>"') : d(l, N + '>"'), l = "", g = 0
                            } else l += u;
                            (C || y) && (b.pop(), _ = b[b.length - 1], y = !1), m.attributeHookups = [];
                            break;
                        case"'":
                        case'"':
                            if (htmlTag)if (quote && quote === u) {
                                quote = null;
                                var T = getAttrName();
                                if (viewCallbacks.attr(T) && m.attributeHookups.push(T), w) {
                                    l += u, d(l), f.push(finishTxt, "}));\n"), l = "", w = !1;
                                    break
                                }
                            } else if (null === quote && (quote = u, beforeQuote = s, c = getAttrName(), "img" === _ && "src" === c || "style" === c)) {
                                d(l.replace(attrReg, "")), l = "", w = !0, f.push(insert_cmd, "can.view.txt(2,'" + getTag(_, n, x) + "'," + status() + ",this,function(){", startTxt), d(c + "=" + u);
                                break
                            }
                        default:
                            if ("<" === s) {
                                _ = "!--" === u.substr(0, 3) ? "!--" : u.split(/\s/)[0];
                                var M, O = !1;
                                0 === _.indexOf("/") && (O = !0, M = _.substr(1)), O ? (top(b) === M && (_ = M, y = !0), top(m.tagHookups) === M && (d(l.substr(0, l.length - 1)), f.push(finishTxt + "}}) );"), l = "><", v())) : (_.lastIndexOf("/") === _.length - 1 && (_ = _.substr(0, _.length - 1)), "!--" !== _ && viewCallbacks.tag(_) && ("content" === _ && elements.tagMap[top(b)] && (u = u.replace("content", elements.tagMap[top(b)])), m.tagHookups.push(_)), b.push(_))
                            }
                            l += u
                    } else switch (u) {
                        case k.right:
                        case k.returnRight:
                            switch (h) {
                                case k.left:
                                    o = bracketNum(l), 1 === o ? (f.push(insert_cmd, "can.view.txt(0,'" + getTag(_, n, x) + "'," + status() + ",this,function(){", startTxt, l), p.push({
                                        before: "",
                                        after: finishTxt + "}));\n"
                                    })) : (r = p.length && -1 === o ? p.pop() : {after: ";"}, r.before && f.push(r.before), f.push(l, ";", r.after));
                                    break;
                                case k.escapeLeft:
                                case k.returnLeft:
                                    o = bracketNum(l), o && p.push({before: finishTxt, after: "}));\n"});
                                    for (var E = h === k.escapeLeft ? 1 : 0, L = {
                                        insert: insert_cmd,
                                        tagName: getTag(_, n, x),
                                        status: status(),
                                        specialAttribute: w
                                    }, j = 0; this.helpers.length > j; j++) {
                                        var R = this.helpers[j];
                                        if (R.name.test(l)) {
                                            l = R.fn(l, L), R.name.source === /^>[\s]*\w*/.source && (E = 0);
                                            break
                                        }
                                    }
                                    "object" == typeof l ? l.startTxt && l.end && w ? f.push(insert_cmd, "can.view.toStr( ", l.content, "() ) );") : (l.startTxt ? f.push(insert_cmd, "can.view.txt(\n" + ("string" == typeof status() || (null != l.escaped ? l.escaped : E)) + ",\n'" + _ + "',\n" + status() + ",\nthis,\n") : l.startOnlyTxt && f.push(insert_cmd, "can.view.onlytxt(this,\n"), f.push(l.content), l.end && f.push("));")) : w ? f.push(insert_cmd, l, ");") : f.push(insert_cmd, "can.view.txt(\n" + ("string" == typeof status() || E) + ",\n'" + _ + "',\n" + status() + ",\nthis,\nfunction(){ " + (this.text.escape || "") + "return ", l, o ? startTxt : "}));\n"), rescan && rescan.after && rescan.after.length && (d(rescan.after.length), rescan = null)
                            }
                            h = null, l = "";
                            break;
                        case k.templateLeft:
                            l += k.left;
                            break;
                        default:
                            l += u
                    }
                    s = u
                }
                l.length && d(l), f.push(";");
                var S = f.join(""), B = {out: (this.text.outStart || "") + S + " " + finishTxt + (this.text.outEnd || "")};
                return myEval.call(B, "this.fn = (function(" + this.text.argNames + "){" + B.out + "});\r\n//# sourceURL=" + e + ".js"), B
            }
        }, can.view.pending = function (t) {
            var e = can.view.getHooks();
            return can.view.hook(function (n) {
                can.each(e, function (t) {
                    t(n)
                }), t.templateType = "legacy", t.tagName && viewCallbacks.tagHandler(n, t.tagName, t), can.each(t && t.attrs || [], function (e) {
                    t.attributeName = e;
                    var r = viewCallbacks.attr(e);
                    r && r(n, t)
                })
            })
        }, can.view.tag("content", function (t, e) {
            return e.scope
        }), can.view.Scanner = Scanner, Scanner
    }(__m10, __m24, __m9), __m27 = function (t) {
        var e = !0;
        try {
            document.createTextNode("")._ = 0
        } catch (n) {
            e = !1
        }
        var r = {}, i = {}, a = "ejs_" + Math.random(), s = 0, o = function (t, n) {
            var r = n || i, o = u(t, r);
            return o ? o : e || 3 !== t.nodeType ? (++s, t[a] = (t.nodeName ? "element_" : "obj_") + s) : (++s, r["text_" + s] = t, "text_" + s)
        }, u = function (t, n) {
            if (e || 3 !== t.nodeType)return t[a];
            for (var r in n)if (n[r] === t)return r
        }, c = [].splice, l = [].push, f = function (t) {
            for (var e = 0, n = 0, r = t.length; r > n; n++) {
                var i = t[n];
                i.nodeType ? e++ : e += f(i)
            }
            return e
        }, d = function (t, e) {
            for (var n = {}, r = 0, i = t.length; i > r; r++) {
                var a = p.first(t[r]);
                n[o(a, e)] = t[r]
            }
            return n
        }, p = {
            id: o, update: function (e, n) {
                var r = p.unregisterChildren(e);
                n = t.makeArray(n);
                var i = e.length;
                return c.apply(e, [0, i].concat(n)), e.replacements ? p.nestReplacements(e) : p.nestList(e), r
            }, nestReplacements: function (t) {
                for (var e = 0, n = {}, r = d(t.replacements, n), i = t.replacements.length; t.length > e && i;) {
                    var a = t[e], s = r[u(a, n)];
                    s && (t.splice(e, f(s), s), i--), e++
                }
                t.replacements = []
            }, nestList: function (t) {
                for (var e = 0; t.length > e;) {
                    var n = t[e], i = r[o(n)];
                    i ? i !== t && t.splice(e, f(i), i) : r[o(n)] = t, e++
                }
            }, last: function (t) {
                var e = t[t.length - 1];
                return e.nodeType ? e : p.last(e)
            }, first: function (t) {
                var e = t[0];
                return e.nodeType ? e : p.first(e)
            }, register: function (t, e, n) {
                return t.unregistered = e, t.parentList = n, n === !0 ? t.replacements = [] : n ? (n.replacements.push(t), t.replacements = []) : p.nestList(t), t
            }, unregisterChildren: function (e) {
                var n = [];
                return t.each(e, function (t) {
                    t.nodeType ? (e.replacements || delete r[o(t)], n.push(t)) : l.apply(n, p.unregister(t))
                }), n
            }, unregister: function (t) {
                var e = p.unregisterChildren(t);
                if (t.unregistered) {
                    var n = t.unregistered;
                    delete t.unregistered, delete t.replacements, n()
                }
                return e
            }, nodeMap: r
        };
        return t.view.nodeLists = p, p
    }(__m2, __m24), __m28 = function (t) {
        function e(t) {
            for (var e = {}, n = t.split(","), r = 0; n.length > r; r++)e[n[r]] = !0;
            return e
        }

        var n = "-A-Za-z0-9_", r = "[a-zA-Z_:][" + n + ":.]*", i = "\\s*=\\s*", a = '"((?:\\\\.|[^"])*)"', s = "'((?:\\\\.|[^'])*)'", o = "(?:" + i + "(?:" + "(?:\"[^\"]*\")|(?:'[^']*')|[^>\\s]+))?", u = "\\{\\{[^\\}]*\\}\\}\\}?", c = "\\{\\{([^\\}]*)\\}\\}\\}?", l = RegExp("^<([" + n + "]+)" + "(" + "(?:\\s*" + "(?:(?:" + "(?:" + r + ")?" + o + ")|" + "(?:" + u + ")+)" + ")*" + ")\\s*(\\/?)>"), f = RegExp("^<\\/([" + n + "]+)[^>]*>"), d = RegExp("(?:(?:(" + r + ")|" + c + ")" + "(?:" + i + "(?:" + "(?:" + a + ")|(?:" + s + ")|([^>\\s]+)" + ")" + ")?)", "g"), p = RegExp(c, "g"), h = /<|\{\{/, g = e("area,base,basefont,br,col,frame,hr,img,input,isindex,link,meta,param,embed"), m = e("address,article,applet,aside,audio,blockquote,button,canvas,center,dd,del,dir,div,dl,dt,fieldset,figcaption,figure,footer,form,frameset,h1,h2,h3,h4,h5,h6,header,hgroup,hr,iframe,ins,isindex,li,map,menu,noframes,noscript,object,ol,output,p,pre,section,script,table,tbody,td,tfoot,th,thead,tr,ul,video"), v = e("a,abbr,acronym,applet,b,basefont,bdo,big,br,button,cite,code,del,dfn,em,font,i,iframe,img,input,ins,kbd,label,map,object,q,s,samp,script,select,small,span,strike,strong,sub,sup,textarea,tt,u,var"), _ = e("colgroup,dd,dt,li,options,p,td,tfoot,th,thead,tr"), b = e("checked,compact,declare,defer,disabled,ismap,multiple,nohref,noresize,noshade,nowrap,readonly,selected"), y = e("script,style"), w = function (t, e) {
            function n(t, n, i, a) {
                if (n = n.toLowerCase(), m[n])for (; u.last() && v[u.last()];)r("", u.last());
                _[n] && u.last() === n && r("", n), a = g[n] || !!a, e.start(n, a), a || u.push(n), w.parseAttrs(i, e), e.end(n, a)
            }

            function r(t, n) {
                var r;
                if (n)for (r = u.length - 1; r >= 0 && u[r] !== n; r--); else r = 0;
                if (r >= 0) {
                    for (var i = u.length - 1; i >= r; i--)e.close && e.close(u[i]);
                    u.length = r
                }
            }

            function i(t, n) {
                e.special && e.special(n)
            }

            var a, s, o, u = [], c = t;
            for (u.last = function () {
                return this[this.length - 1]
            }; t;) {
                if (s = !0, u.last() && y[u.last()])t = t.replace(RegExp("([\\s\\S]*?)</" + u.last() + "[^>]*>"), function (t, n) {
                    return n = n.replace(/<!--([\s\S]*?)-->|<!\[CDATA\[([\s\S]*?)]]>/g, "$1$2"), e.chars && e.chars(n), ""
                }), r("", u.last()); else if (0 === t.indexOf("<!--") ? (a = t.indexOf("-->"), a >= 0 && (e.comment && e.comment(t.substring(4, a)), t = t.substring(a + 3), s = !1)) : 0 === t.indexOf("</") ? (o = t.match(f), o && (t = t.substring(o[0].length), o[0].replace(f, r), s = !1)) : 0 === t.indexOf("<") ? (o = t.match(l), o && (t = t.substring(o[0].length), o[0].replace(l, n), s = !1)) : 0 === t.indexOf("{{") && (o = t.match(p), o && (t = t.substring(o[0].length), o[0].replace(p, i))), s) {
                    a = t.search(h);
                    var d = 0 > a ? t : t.substring(0, a);
                    t = 0 > a ? "" : t.substring(a), e.chars && d && e.chars(d)
                }
                if (t === c)throw"Parse Error: " + t;
                c = t
            }
            r(), e.done()
        };
        return w.parseAttrs = function (t, e) {
            (null != t ? t : "").replace(d, function (t, n, r, i, a, s) {
                if (r && e.special(r), n || i || a || s) {
                    var o = arguments[3] ? arguments[3] : arguments[4] ? arguments[4] : arguments[5] ? arguments[5] : b[n.toLowerCase()] ? n : "";
                    e.attrStart(n || "");
                    for (var u, c = p.lastIndex = 0, l = p.exec(o); l;)u = o.substring(c, p.lastIndex - l[0].length), u.length && e.attrValue(u), e.special(l[1]), c = p.lastIndex, l = p.exec(o);
                    u = o.substr(c, o.length), u && e.attrValue(u), e.attrEnd(n || "")
                }
            })
        }, t.view.parser = w, w
    }(__m10), __m26 = function (t, e, n, r, i) {
        e = e || t.view.elements, r = r || t.view.NodeLists, i = i || t.view.parser;
        var a = function (e, n, r) {
            var i = !1, a = function () {
                return i || (i = !0, r(s), t.unbind.call(e, "removed", a)), !0
            }, s = {
                teardownCheck: function (t) {
                    return t ? !1 : a()
                }
            };
            return t.bind.call(e, "removed", a), n(s), s
        }, s = function (t, e, n) {
            return a(t, function () {
                e.bind("change", n)
            }, function (t) {
                e.unbind("change", n), t.nodeList && r.unregister(t.nodeList)
            })
        }, o = function (t) {
            var e, n = {};
            return i.parseAttrs(t, {
                attrStart: function (t) {
                    n[t] = "", e = t
                }, attrValue: function (t) {
                    n[e] += t
                }, attrEnd: function () {
                }
            }), n
        }, u = [].splice, c = function (t) {
            return t && t.nodeType
        }, l = function (t) {
            t.childNodes.length || t.appendChild(document.createTextNode(""))
        }, f = {
            list: function (n, i, s, o, c, l) {
                var d, p = l || [n], h = [], g = function (n, i, a) {
                    var c = document.createDocumentFragment(), f = [], d = [];
                    t.each(i, function (e, n) {
                        var i = [];
                        l && r.register(i, null, !0);
                        var u = t.compute(n + a), p = s.call(o, e, u, i), h = "string" == typeof p, g = t.frag(p);
                        g = h ? t.view.hookup(g) : g;
                        var m = t.makeArray(g.childNodes);
                        l ? (r.update(i, m), f.push(i)) : f.push(r.register(m)), c.appendChild(g), d.push(u)
                    });
                    var g = a + 1;
                    if (p[g]) {
                        var m = r.first(p[g]);
                        t.insertBefore(m.parentNode, c, m)
                    } else e.after(1 === g ? [v] : [r.last(p[g - 1])], c);
                    u.apply(p, [g, 0].concat(f)), u.apply(h, [a, 0].concat(d));
                    for (var _ = a + d.length, b = h.length; b > _; _++)h[_](_)
                }, m = function (e, n, i, a, s) {
                    if (a || !y.teardownCheck(v.parentNode)) {
                        var o = p.splice(i + 1, n.length), u = [];
                        t.each(o, function (t) {
                            var e = r.unregister(t);
                            [].push.apply(u, e)
                        }), h.splice(i, n.length);
                        for (var c = i, l = h.length; l > c; c++)h[c](c);
                        s || t.remove(t.$(u))
                    }
                }, v = document.createTextNode(""), _ = function (t) {
                    d && d.unbind && d.unbind("add", g).unbind("remove", m), m({}, {length: p.length - 1}, 0, !0, t)
                }, b = function (t, e) {
                    _(), d = e || [], d.bind && d.bind("add", g).bind("remove", m), g({}, d, 0)
                };
                c = e.getParentNode(n, c);
                var y = a(c, function () {
                    t.isFunction(i) && i.bind("change", b)
                }, function () {
                    t.isFunction(i) && i.unbind("change", b), _(!0)
                });
                l ? (e.replace(p, v), r.update(p, [v]), l.unregistered = y.teardownCheck) : f.replace(p, v, y.teardownCheck), b({}, t.isFunction(i) ? i() : i)
            }, html: function (n, i, a, o) {
                var u;
                a = e.getParentNode(n, a), u = s(a, i, function (t, e) {
                    var n = r.first(f).parentNode;
                    n && d(e), u.teardownCheck(r.first(f).parentNode)
                });
                var f = o || [n], d = function (n) {
                    var i = !c(n), s = t.frag(n), o = t.makeArray(f);
                    l(s), i && (s = t.view.hookup(s, a)), o = r.update(f, s.childNodes), e.replace(o, s)
                };
                u.nodeList = f, o ? o.unregistered = u.teardownCheck : r.register(f, u.teardownCheck), d(i())
            }, replace: function (n, i, a) {
                var s = n.slice(0), o = t.frag(i);
                return r.register(n, a), "string" == typeof i && (o = t.view.hookup(o, n[0].parentNode)), r.update(n, o.childNodes), e.replace(s, o), n
            }, text: function (n, i, a, o) {
                var u = e.getParentNode(n, a), c = s(u, i, function (e, n) {
                    "unknown" != typeof l.nodeValue && (l.nodeValue = t.view.toStr(n)), c.teardownCheck(l.parentNode)
                }), l = document.createTextNode(t.view.toStr(i()));
                o ? (o.unregistered = c.teardownCheck, c.nodeList = o, r.update(o, [l]), e.replace([n], l)) : c.nodeList = f.replace([n], l, c.teardownCheck)
            }, setAttributes: function (e, n) {
                var r = o(n);
                for (var i in r)t.attr.set(e, i, r[i])
            }, attributes: function (n, r, i) {
                var a = {}, u = function (r) {
                    var i, s = o(r);
                    for (i in s) {
                        var u = s[i], c = a[i];
                        u !== c && t.attr.set(n, i, u), delete a[i]
                    }
                    for (i in a)e.removeAttr(n, i);
                    a = s
                };
                s(n, r, function (t, e) {
                    u(e)
                }), arguments.length >= 3 ? a = o(i) : u(r())
            }, attributePlaceholder: "__!!__", attributeReplace: /__!!__/g, attribute: function (n, r, i) {
                s(n, i, function () {
                    e.setAttr(n, r, u.render())
                });
                var a, o = t.$(n);
                a = t.data(o, "hooks"), a || t.data(o, "hooks", a = {});
                var u, c = e.getAttr(n, r), l = c.split(f.attributePlaceholder), d = [];
                d.push(l.shift(), l.join(f.attributePlaceholder)), a[r] ? a[r].computes.push(i) : a[r] = {
                    render: function () {
                        var t = 0, n = c ? c.replace(f.attributeReplace, function () {
                            return e.contentText(u.computes[t++]())
                        }) : e.contentText(u.computes[t++]());
                        return n
                    }, computes: [i], batchNum: undefined
                }, u = a[r], d.splice(1, 0, i()), e.setAttr(n, r, d.join(""))
            }, specialAttribute: function (t, n, r) {
                s(t, r, function (r, i) {
                    e.setAttr(t, n, p(i))
                }), e.setAttr(t, n, p(r()))
            }, simpleAttribute: function (t, n, r) {
                s(t, r, function (r, i) {
                    e.setAttr(t, n, i)
                }), e.setAttr(t, n, r())
            }
        };
        f.attr = f.simpleAttribute, f.attrs = f.attributes;
        var d = /(\r|\n)+/g, p = function (t) {
            var n = /^["'].*["']$/;
            return t = t.replace(e.attrReg, "").replace(d, ""), n.test(t) ? t.substr(1, t.length - 2) : t
        };
        return t.view.live = f, f
    }(__m2, __m24, __m10, __m27, __m28), __m25 = function (t, e, n) {
        var r, i = [], a = function (t) {
            var n = e.tagMap[t] || "span";
            return "span" === n ? "@@!!@@" : "<" + n + ">" + a(n) + "</" + n + ">"
        }, s = function (e, n) {
            if ("string" == typeof e)return e;
            if (!e && 0 !== e)return "";
            var r = e.hookup && function (t, n) {
                    e.hookup.call(e, t, n)
                } || "function" == typeof e && e;
            return r ? n ? "<" + n + " " + t.view.hook(r) + "></" + n + ">" : (i.push(r), "") : "" + e
        }, o = function (e, n) {
            return "string" == typeof e || "number" == typeof e ? t.esc(e) : s(e, n)
        }, u = !1, c = function () {
        };
        return t.extend(t.view, {
            live: n, setupLists: function () {
                var e, n = t.view.lists;
                return t.view.lists = function (t, n) {
                    return e = {list: t, renderer: n}, Math.random()
                }, function () {
                    return t.view.lists = n, e
                }
            }, getHooks: function () {
                var t = i.slice(0);
                return r = t, i = [], t
            }, onlytxt: function (t, e) {
                return o(e.call(t))
            }, txt: function (l, f, d, p, h) {
                var g, m, v, _, b = e.tagMap[f] || "span", y = !1, w = c;
                if (u)g = h.call(p); else {
                    ("string" == typeof d || 1 === d) && (u = !0);
                    var x = t.view.setupLists();
                    w = function () {
                        v.unbind("change", c)
                    }, v = t.compute(h, p, !1), v.bind("change", c), m = x(), g = v(), u = !1, y = v.hasDependencies
                }
                if (m)return w(), "<" + b + t.view.hook(function (t, e) {
                    n.list(t, m.list, m.renderer, p, e)
                }) + "></" + b + ">";
                if (!y || "function" == typeof g)return w(), (u || 2 === l || !l ? s : o)(g, 0 === d && b);
                var k = e.tagToContentPropMap[f];
                return 0 !== d || k ? 1 === d ? (i.push(function (t) {
                    n.attributes(t, v, v()), w()
                }), v()) : 2 === l ? (_ = d, i.push(function (t) {
                    n.specialAttribute(t, _, v), w()
                }), v()) : (_ = 0 === d ? k : d, (0 === d ? r : i).push(function (t) {
                    n.attribute(t, _, v), w()
                }), n.attributePlaceholder) : "<" + b + t.view.hook(l && "object" != typeof g ? function (t, e) {
                    n.text(t, v, e), w()
                } : function (t, e) {
                    n.html(t, v, e), w()
                }) + ">" + a(b) + "</" + b + ">"
            }
        }), t
    }(__m10, __m24, __m26, __m13), __m21 = function (t) {
        t.view.ext = ".mustache";
        var e = "scope", n = "___h4sh", r = "{scope:" + e + ",options:options}", i = "{scope:" + e + ",options:options, special: true}", a = e + ",options", s = /((([^'"\s]+?=)?('.*?'|".*?"))|.*?)\s/g, o = /^(('.*?'|".*?"|[0-9]+\.?[0-9]*|true|false|null|undefined)|((.+?)=(('.*?'|".*?"|[0-9]+\.?[0-9]*|true|false)|(.+))))$/, u = function (t) {
            return '{get:"' + t.replace(/"/g, '\\"') + '"}'
        }, c = function (t) {
            return t && "string" == typeof t.get
        }, l = function (e) {
            return e instanceof t.Map || e && !!e._get
        }, f = function (t) {
            return t && t.splice && "number" == typeof t.length
        }, d = function (e, n, r) {
            var i = function (t, r) {
                return e(t || n, r)
            };
            return function (e, a) {
                return e === undefined || e instanceof t.view.Scope || (e = n.add(e)), a === undefined || a instanceof t.view.Options || (a = r.add(a)), i(e, a || r)
            }
        }, p = function (e) {
            if (this.constructor !== p) {
                var n = new p(e);
                return function (t, e) {
                    return n.render(t, e)
                }
            }
            return "function" == typeof e ? (this.template = {fn: e}, undefined) : (t.extend(this, e), this.template = this.scanner.scan(this.text, this.name), undefined)
        };
        t.Mustache = window.Mustache = p, p.prototype.render = function (e, n) {
            return e instanceof t.view.Scope || (e = new t.view.Scope(e || {})), n instanceof t.view.Options || (n = new t.view.Options(n || {})), n = n || {}, this.template.fn.call(e, e, n)
        }, t.extend(p.prototype, {
            scanner: new t.view.Scanner({
                text: {
                    start: "",
                    scope: e,
                    options: ",options: options",
                    argNames: a
                },
                tokens: [["returnLeft", "{{{", "{{[{&]"], ["commentFull", "{{!}}", "^[\\s\\t]*{{!.+?}}\\n"], ["commentLeft", "{{!", "(\\n[\\s\\t]*{{!|{{!)"], ["escapeFull", "{{}}", "(^[\\s\\t]*{{[#/^][^}]+?}}\\n|\\n[\\s\\t]*{{[#/^][^}]+?}}\\n|\\n[\\s\\t]*{{[#/^][^}]+?}}$)", function (t) {
                    return {before: /^\n.+?\n$/.test(t) ? "\n" : "", content: t.match(/\{\{(.+?)\}\}/)[1] || ""}
                }], ["escapeLeft", "{{"], ["returnRight", "}}}"], ["right", "}}"]],
                helpers: [{
                    name: /^>[\s]*\w*/, fn: function (e) {
                        var n = t.trim(e.replace(/^>\s?/, "")).replace(/["|']/g, "");
                        return "can.Mustache.renderPartial('" + n + "'," + a + ")"
                    }
                }, {
                    name: /^\s*data\s/, fn: function (t) {
                        var n = t.match(/["|'](.*)["|']/)[1];
                        return "can.proxy(function(__){can.data(can.$(__),'" + n + "', this.attr('.')); }, " + e + ")"
                    }
                }, {
                    name: /\s*\(([\$\w]+)\)\s*->([^\n]*)/, fn: function (t) {
                        var n = /\s*\(([\$\w]+)\)\s*->([^\n]*)/, r = t.match(n);
                        return "can.proxy(function(__){var " + r[1] + "=can.$(__);with(" + e + ".attr('.')){" + r[2] + "}}, this);"
                    }
                }, {
                    name: /^.*$/, fn: function (e, c) {
                        var l = !1, f = {content: "", startTxt: !1, startOnlyTxt: !1, end: !1};
                        if (e = t.trim(e), e.length && (l = e.match(/^([#^/]|else$)/))) {
                            switch (l = l[0]) {
                                case"#":
                                case"^":
                                    c.specialAttribute ? f.startOnlyTxt = !0 : (f.startTxt = !0, f.escaped = 0);
                                    break;
                                case"/":
                                    return f.end = !0, f.content += 'return ___v1ew.join("");}}])', f
                            }
                            e = e.substring(1)
                        }
                        if ("else" !== l) {
                            var d, p = [], h = [], g = 0;
                            f.content += "can.Mustache.txt(\n" + (c.specialAttribute ? i : r) + ",\n" + (l ? '"' + l + '"' : "null") + ",", (t.trim(e) + " ").replace(s, function (t, e) {
                                g && (d = e.match(o)) ? d[2] ? p.push(d[0]) : h.push(d[4] + ":" + (d[6] ? d[6] : u(d[5]))) : p.push(u(e)), g++
                            }), f.content += p.join(","), h.length && (f.content += ",{" + n + ":{" + h.join(",") + "}}")
                        }
                        switch (l && "else" !== l && (f.content += ",[\n\n"), l) {
                            case"^":
                            case"#":
                                f.content += "{fn:function(" + a + "){var ___v1ew = [];";
                                break;
                            case"else":
                                f.content += 'return ___v1ew.join("");}},\n{inverse:function(' + a + "){\nvar ___v1ew = [];";
                                break;
                            default:
                                f.content += ")"
                        }
                        return l || (f.startTxt = !0, f.end = !0), f
                    }
                }]
            })
        });
        for (var h = t.view.Scanner.prototype.helpers, g = 0; h.length > g; g++)p.prototype.scanner.helpers.unshift(h[g]);
        return p.txt = function (e, r, i) {
            for (var a, s, o = e.scope, u = e.options, h = [], g = {
                fn: function () {
                }, inverse: function () {
                }
            }, m = o.attr("."), v = !0, _ = 3; arguments.length > _; _++) {
                var b = arguments[_];
                if (r && t.isArray(b))g = t.extend.apply(t, [g].concat(b)); else if (b && b[n]) {
                    a = b[n];
                    for (var y in a)c(a[y]) && (a[y] = p.get(a[y].get, e, !1, !0))
                } else b && c(b) ? h.push(p.get(b.get, e, !1, !0, !0)) : h.push(b)
            }
            if (c(i)) {
                var w = i.get;
                i = p.get(i.get, e, h.length, !1), v = w === i
            }
            if (g.fn = d(g.fn, o, u), g.inverse = d(g.inverse, o, u), "^" === r) {
                var x = g.fn;
                g.fn = g.inverse, g.inverse = x
            }
            return (s = v && "string" == typeof i && p.getHelper(i, u) || t.isFunction(i) && !i.isComputed && {fn: i}) ? (t.extend(g, {
                context: m,
                scope: o,
                contexts: o,
                hash: a
            }), h.push(g), function () {
                return s.fn.apply(m, h) || ""
            }) : function () {
                var e;
                e = t.isFunction(i) && i.isComputed ? i() : i;
                var n, a, s, o = h.length ? h : [e], u = !0, c = [];
                if (r)for (n = 0; o.length > n; n++)s = o[n], a = s !== undefined && l(s), f(s) ? "#" === r ? u = u && !!(a ? s.attr("length") : s.length) : "^" === r && (u = u && !(a ? s.attr("length") : s.length)) : u = "#" === r ? u && !!s : "^" === r ? u && !s : u;
                if (u) {
                    if ("#" === r) {
                        if (f(e)) {
                            var d = l(e);
                            for (n = 0; e.length > n; n++)c.push(g.fn(d ? e.attr("" + n) : e[n]));
                            return c.join("")
                        }
                        return g.fn(e || {}) || ""
                    }
                    return "^" === r ? g.inverse(e || {}) || "" : "" + (null != e ? e : "")
                }
                return ""
            }
        }, p.get = function (e, n, r, i, a) {
            var s = n.scope.attr("."), o = n.options || {};
            if (r) {
                if (p.getHelper(e, o))return e;
                if (n.scope && t.isFunction(s[e]))return s[e]
            }
            var u = n.scope.computeData(e, {isArgument: i, args: [s, n.scope]}), c = u.compute;
            t.compute.temporarilyBind(c);
            var l = u.initialValue;
            return a || l !== undefined && u.scope === n.scope || !p.getHelper(e, o) ? c.hasDependencies ? c : l : e
        }, p.resolve = function (e) {
            return l(e) && f(e) && e.attr("length") ? e : t.isFunction(e) ? e() : e
        }, t.view.Options = t.view.Scope.extend({
            init: function (e) {
                e.helpers || e.partials || e.tags || (e = {helpers: e}), t.view.Scope.prototype.init.apply(this, arguments)
            }
        }), p._helpers = {}, p.registerHelper = function (t, e) {
            this._helpers[t] = {name: t, fn: e}
        }, p.getHelper = function (t, e) {
            var n = e.attr("helpers." + t);
            return n ? {fn: n} : this._helpers[t]
        }, p.render = function (e, n, r) {
            if (!t.view.cached[e]) {
                var i = t.__clearReading();
                n.attr("partial") && (e = n.attr("partial")), t.__setReading(i)
            }
            return t.view.render(e, n, r)
        }, p.safeString = function (t) {
            return {
                toString: function () {
                    return t
                }
            }
        }, p.renderPartial = function (e, n, r) {
            var i = r.attr("partials." + e);
            return i ? i.render ? i.render(n, r) : i(n, r) : t.Mustache.render(e, n, r)
        }, t.each({
            "if": function (e, n) {
                var r;
                return r = t.isFunction(e) ? t.compute.truthy(e)() : !!p.resolve(e), r ? n.fn(n.contexts || this) : n.inverse(n.contexts || this)
            }, unless: function (e, n) {
                return p._helpers["if"].fn.apply(this, [t.isFunction(e) ? t.compute(function () {
                    return !e()
                }) : !e, n])
            }, each: function (e, n) {
                var r, i, a, s = p.resolve(e), o = [];
                if (t.view.lists && (s instanceof t.List || e && e.isComputed && s === undefined))return t.view.lists(e, function (t, e) {
                    return n.fn(n.scope.add({"@index": e}).add(t))
                });
                if (e = s, e && f(e)) {
                    for (a = 0; e.length > a; a++)o.push(n.fn(n.scope.add({"@index": a}).add(e[a])));
                    return o.join("")
                }
                if (l(e)) {
                    for (r = t.Map.keys(e), a = 0; r.length > a; a++)i = r[a], o.push(n.fn(n.scope.add({"@key": i}).add(e[i])));
                    return o.join("")
                }
                if (e instanceof Object) {
                    for (i in e)o.push(n.fn(n.scope.add({"@key": i}).add(e[i])));
                    return o.join("")
                }
            }, "with": function (t, e) {
                var n = t;
                return t = p.resolve(t), t ? e.fn(n) : undefined
            }, log: function (t, e) {
                "undefined" != typeof console && console.log && (e ? console.log(t, e.context) : console.log(t.context))
            }, "@index": function (e, n) {
                n || (n = e, e = 0);
                var r = n.scope.attr("@index");
                return "" + ((t.isFunction(r) ? r() : r) + e)
            }
        }, function (t, e) {
            p.registerHelper(e, t)
        }), t.view.register({
            suffix: "mustache", contentType: "x-mustache-template", script: function (t, e) {
                return "can.Mustache(function(" + a + ") { " + new p({text: e, name: t}).template.out + " })"
            }, renderer: function (t, e) {
                return p({text: e, name: t})
            }
        }), t.mustache.registerHelper = t.proxy(t.Mustache.registerHelper, t.Mustache), t.mustache.safeString = t.Mustache.safeString, t
    }(__m2, __m22, __m10, __m23, __m20, __m25), __m29 = function (t) {
        var e = function () {
            var t = {"": !0, "true": !0, "false": !1}, e = function (e) {
                if (e && e.getAttribute) {
                    var n = e.getAttribute("contenteditable");
                    return t[n]
                }
            };
            return function (t) {
                var n = e(t);
                return "boolean" == typeof n ? n : !!e(t.parentNode)
            }
        }(), n = function (t) {
            return "{" === t[0] && "}" === t[t.length - 1] ? t.substr(1, t.length - 2) : t
        };
        t.view.attr("can-value", function (r, u) {
            var c, l, f = n(r.getAttribute("can-value")), d = u.scope.computeData(f, {args: []}).compute;
            return "input" === r.nodeName.toLowerCase() && ("checkbox" === r.type && (c = t.attr.has(r, "can-true-value") ? r.getAttribute("can-true-value") : !0, l = t.attr.has(r, "can-false-value") ? r.getAttribute("can-false-value") : !1), "checkbox" === r.type || "radio" === r.type) ? (new a(r, {
                value: d,
                trueValue: c,
                falseValue: l
            }), undefined) : "select" === r.nodeName.toLowerCase() && r.multiple ? (new s(r, {value: d}), undefined) : e(r) ? (new o(r, {value: d}), undefined) : (new i(r, {value: d}), undefined)
        });
        var r = {
            enter: function (t, e, n) {
                return {
                    event: "keyup", handler: function (t) {
                        return 13 === t.keyCode ? n.call(this, t) : undefined
                    }
                }
            }
        };
        t.view.attr(/can-[\w\.]+/, function (e, i) {
            var a = i.attributeName, s = a.substr("can-".length), o = function (r) {
                var s = n(e.getAttribute(a)), o = i.scope.read(s, {returnObserveMethods: !0, isArgument: !0});
                return o.value.call(o.parent, i.scope._context, t.$(this), r)
            };
            if (r[s]) {
                var u = r[s](i, e, o);
                o = u.handler, s = u.event
            }
            t.bind.call(e, s, o)
        });
        var i = t.Control.extend({
            init: function () {
                "SELECT" === this.element[0].nodeName.toUpperCase() ? setTimeout(t.proxy(this.set, this), 1) : this.set()
            }, "{value} change": "set", set: function () {
                if (this.element) {
                    var t = this.options.value();
                    this.element[0].value = null == t ? "" : t
                }
            }, change: function () {
                this.element && this.options.value(this.element[0].value)
            }
        }), a = t.Control.extend({
            init: function () {
                this.isCheckbox = "checkbox" === this.element[0].type.toLowerCase(), this.check()
            }, "{value} change": "check", check: function () {
                if (this.isCheckbox) {
                    var e = this.options.value(), n = this.options.trueValue || !0;
                    this.element[0].checked = e === n
                } else {
                    var r = this.options.value() == this.element[0].value ? "set" : "remove";
                    t.attr[r](this.element[0], "checked", !0)
                }
            }, change: function () {
                this.isCheckbox ? this.options.value(this.element[0].checked ? this.options.trueValue : this.options.falseValue) : this.element[0].checked && this.options.value(this.element[0].value)
            }
        }), s = i.extend({
            init: function () {
                this.delimiter = ";", this.set()
            }, set: function () {
                var e = this.options.value();
                "string" == typeof e ? (e = e.split(this.delimiter), this.isString = !0) : e && (e = t.makeArray(e));
                var n = {};
                t.each(e, function (t) {
                    n[t] = !0
                }), t.each(this.element[0].childNodes, function (t) {
                    t.value && (t.selected = !!n[t.value])
                })
            }, get: function () {
                var e = [], n = this.element[0].childNodes;
                return t.each(n, function (t) {
                    t.selected && t.value && e.push(t.value)
                }), e
            }, change: function () {
                var e = this.get(), n = this.options.value();
                this.isString || "string" == typeof n ? (this.isString = !0, this.options.value(e.join(this.delimiter))) : n instanceof t.List ? n.attr(e, !0) : this.options.value(e)
            }
        }), o = t.Control.extend({
            init: function () {
                this.set(), this.on("blur", "setValue")
            }, "{value} change": "set", set: function () {
                var t = this.options.value();
                this.element[0].innerHTML = t === undefined ? "" : t
            }, setValue: function () {
                this.options.value(this.element[0].innerHTML)
            }
        })
    }(__m2, __m21, __m11), __m1 = function (t, e) {
        var n = /^(dataViewId|class|id)$/i, r = /\{([^\}]+)\}/g, i = t.Component = t.Construct.extend({
            setup: function () {
                if (t.Construct.setup.apply(this, arguments), t.Component) {
                    var e = this, n = this.prototype.scope;
                    if (this.Control = a.extend(this.prototype.events), n && ("object" != typeof n || n instanceof t.Map) ? n.prototype instanceof t.Map && (this.Map = n) : this.Map = t.Map.extend(n || {}), this.attributeScopeMappings = {}, t.each(this.Map ? this.Map.defaults : {}, function (t, n) {
                            "@" === t && (e.attributeScopeMappings[n] = n)
                        }), this.prototype.template)if ("function" == typeof this.prototype.template) {
                        var r = this.prototype.template;
                        this.renderer = function () {
                            return t.view.frag(r.apply(null, arguments))
                        }
                    } else this.renderer = t.view.mustache(this.prototype.template);
                    t.view.tag(this.prototype.tag, function (t, n) {
                        new e(t, n)
                    })
                }
            }
        }, {
            setup: function (r, i) {
                var a, s, o, u = {}, c = this, l = {};
                if (t.each(this.constructor.attributeScopeMappings, function (e, n) {
                        u[n] = r.getAttribute(t.hyphenate(e))
                    }), t.each(t.makeArray(r.attributes), function (o) {
                        var f = t.camelize(o.nodeName.toLowerCase()), d = o.value;
                        if (!(c.constructor.attributeScopeMappings[f] || n.test(f) || e.attr(o.nodeName))) {
                            if ("{" === d[0] && "}" === d[d.length - 1])d = d.substr(1, d.length - 2); else if ("legacy" !== i.templateType)return u[f] = d, undefined;
                            var p = i.scope.computeData(d, {args: []}), h = p.compute, g = function (t, e) {
                                a = f, s.attr(f, e), a = null
                            };
                            h.bind("change", g), u[f] = h(), h.hasDependencies ? (t.bind.call(r, "removed", function () {
                                h.unbind("change", g)
                            }), l[f] = p) : h.unbind("change", g)
                        }
                    }), this.constructor.Map)s = new this.constructor.Map(u); else if (this.scope instanceof t.Map)s = this.scope; else if (t.isFunction(this.scope)) {
                    var f = this.scope(u, i.scope, r);
                    s = f instanceof t.Map ? f : f.prototype instanceof t.Map ? new f(u) : new (t.Map.extend(f))(u)
                }
                var d = {};
                t.each(l, function (t, e) {
                    d[e] = function (n, r) {
                        a !== e && t.compute(r)
                    }, s.bind(e, d[e])
                }), t.bind.call(r, "removed", function () {
                    t.each(d, function (t, e) {
                        s.unbind(e, d[e])
                    })
                }), t.isEmptyObject(this.constructor.attributeScopeMappings) && "legacy" === i.templateType || t.bind.call(r, "attributes", function (e) {
                    var i = t.camelize(e.attributeName);
                    l[i] || n.test(i) || s.attr(i, r.getAttribute(e.attributeName))
                }), this.scope = s, t.data(t.$(r), "scope", this.scope);
                var p = i.scope.add(this.scope), h = {helpers: {}};
                t.each(this.helpers || {}, function (e, n) {
                    t.isFunction(e) && (h.helpers[n] = function () {
                        return e.apply(s, arguments)
                    })
                }), this._control = new this.constructor.Control(r, {scope: this.scope}), this.constructor.renderer ? (h.tags || (h.tags = {}), h.tags.content = function g(e, n) {
                    var r = i.subtemplate || n.subtemplate;
                    r && (delete h.tags.content, t.view.live.replace([e], r(n.scope, n.options)), h.tags.content = g)
                }, o = this.constructor.renderer(p, i.options.add(h))) : o = "legacy" === i.templateType ? t.view.frag(i.subtemplate ? i.subtemplate(p, i.options.add(h)) : "") : i.subtemplate ? i.subtemplate(p, i.options.add(h)) : document.createDocumentFragment(), t.appendChild(r, o)
            }
        }), a = t.Control.extend({
            _lookup: function (t) {
                return [t.scope, t, window]
            }, _action: function (e, n, i) {
                var a, s;
                if (r.lastIndex = 0, a = r.test(e), i || !a) {
                    if (a) {
                        s = t.compute(function () {
                            var i, a = e.replace(r, function (e, r) {
                                var a;
                                return "scope" === r ? (i = n.scope, "") : (r = r.replace(/^scope\./, ""), a = t.compute.read(n.scope, r.split("."), {isArgument: !0}).value, a === undefined && (a = t.getObject(r)), "string" == typeof a ? a : (i = a, ""))
                            }), s = a.split(/\s+/g), o = s.pop();
                            return {
                                processor: this.processors[o] || this.processors.click,
                                parts: [a, s.join(" "), o],
                                delegate: i || undefined
                            }
                        }, this);
                        var o = function (t, n) {
                            i._bindings.control[e](i.element), i._bindings.control[e] = n.processor(n.delegate || i.element, n.parts[2], n.parts[1], e, i)
                        };
                        return s.bind("change", o), i._bindings.readyComputes[e] = {compute: s, handler: o}, s()
                    }
                    return t.Control._action.apply(this, arguments)
                }
            }
        }, {
            setup: function (e, n) {
                return this.scope = n.scope, t.Control.prototype.setup.call(this, e, n)
            }, off: function () {
                this._bindings && t.each(this._bindings.readyComputes || {}, function (t) {
                    t.compute.unbind("change", t.handler)
                }), t.Control.prototype.off.apply(this, arguments), this._bindings.readyComputes = {}
            }
        });
        return window.$ && $.fn && ($.fn.scope = function (t) {
            return t ? this.data("scope").attr(t) : this.data("scope")
        }), t.scope = function (e, n) {
            return e = t.$(e), n ? t.data(e, "scope").attr(n) : t.data(e, "scope")
        }, i
    }(__m2, __m9, __m11, __m14, __m21, __m29), __m30 = function (t) {
        var e = function (e, n, r) {
            var i = new t.Deferred;
            return e.then(function () {
                var e = t.makeArray(arguments), a = !0;
                try {
                    e[0] = r.apply(n, e)
                } catch (s) {
                    a = !1, i.rejectWith(i, [s].concat(e))
                }
                a && i.resolveWith(i, e)
            }, function () {
                i.rejectWith(this, arguments)
            }), "function" == typeof e.abort && (i.abort = function () {
                return e.abort()
            }), i
        }, n = 0, r = function (e) {
            return t.__reading(e, e.constructor.id), e.__get(e.constructor.id)
        }, i = function (e, n, r, i, a, s) {
            var o = {};
            if ("string" == typeof e) {
                var u = e.split(/\s+/);
                o.url = u.pop(), u.length && (o.type = u.pop())
            } else t.extend(o, e);
            return o.data = "object" != typeof n || t.isArray(n) ? n : t.extend(o.data || {}, n), o.url = t.sub(o.url, o.data, !0), t.ajax(t.extend({
                type: r || "post",
                dataType: i || "json",
                success: a,
                error: s
            }, o))
        }, a = function (n, i, a, s, o) {
            var u;
            t.isArray(n) ? (u = n[1], n = n[0]) : u = n.serialize(), u = [u];
            var c, l, f = n.constructor;
            return ("update" === i || "destroy" === i) && u.unshift(r(n)), l = f[i].apply(f, u), c = e(l, n, function (t) {
                return n[o || i + "d"](t, l), n
            }), l.abort && (c.abort = function () {
                l.abort()
            }), c.then(a, s), c
        }, s = {
            models: function (e) {
                return function (n, r) {
                    if (t.Model._reqs++, n) {
                        if (n instanceof this.List)return n;
                        var i = this, a = [], s = i.List || g, o = r instanceof t.List ? r : new s, u = t.isArray(n), c = n instanceof g, l = u ? n : c ? n.serialize() : t.getObject(e || "data", n);
                        if (l === undefined)throw Error("Could not get any raw data while converting using .models");
                        return o.length && o.splice(0), t.each(l, function (t) {
                            a.push(i.model(t))
                        }), o.push.apply(o, a), u || t.each(n, function (t, e) {
                            "data" !== e && o.attr(e, t)
                        }), setTimeout(t.proxy(this._clean, this), 1), o
                    }
                }
            }, model: function (e) {
                return function (n) {
                    if (n) {
                        "function" == typeof n.serialize && (n = n.serialize()), this.parseModel ? n = this.parseModel.apply(this, arguments) : e && (n = t.getObject(e || "data", n));
                        var r = n[this.id], i = (r || 0 === r) && this.store[r] ? this.store[r].attr(n, this.removeAttr || !1) : new this(n);
                        return i
                    }
                }
            }
        }, o = function (e) {
            return function (n) {
                return e ? t.getObject(e || "data", n) : n
            }
        }, u = {parseModel: o, parseModels: o}, c = {
            create: {url: "_shortName", type: "post"},
            update: {
                data: function (e, n) {
                    n = n || {};
                    var r = this.id;
                    return n[r] && n[r] !== e && (n["new" + t.capitalize(e)] = n[r], delete n[r]), n[r] = e, n
                }, type: "put"
            },
            destroy: {
                type: "delete", data: function (t, e) {
                    return e = e || {}, e.id = e[this.id] = t, e
                }
            },
            findAll: {url: "_shortName"},
            findOne: {}
        }, l = function (t, e) {
            return function (n) {
                return n = t.data ? t.data.apply(this, arguments) : n, i(e || this[t.url || "_url"], n, t.type || "get")
            }
        }, f = function (t, e) {
            if (t.resource) {
                var n = t.resource.replace(/\/+$/, "");
                return "findAll" === e || "create" === e ? n : n + "/{" + t.id + "}"
            }
        };
        t.Model = t.Map.extend({
            fullName: "can.Model", _reqs: 0, setup: function (e, r, i, a) {
                if ("string" != typeof r && (a = i, i = r), a || (a = i), this.store = {}, t.Map.setup.apply(this, arguments), t.Model) {
                    i && i.List ? (this.List = i.List, this.List.Map = this) : this.List = e.List.extend({Map: this}, {});
                    var o = this, d = t.proxy(this._clean, o);
                    t.each(c, function (n, r) {
                        if (i && i[r] && ("string" == typeof i[r] || "object" == typeof i[r]) ? o[r] = l(n, i[r]) : i && i.resource && (o[r] = l(n, f(o, r))), o["make" + t.capitalize(r)]) {
                            var a = o["make" + t.capitalize(r)](o[r]);
                            t.Construct._overwrite(o, e, r, function () {
                                t.Model._reqs++;
                                var e = a.apply(this, arguments), n = e.then(d, d);
                                return n.abort = e.abort, n
                            })
                        }
                    }), t.each(s, function (n, r) {
                        var a = "parse" + t.capitalize(r), s = o[r];
                        "string" == typeof s ? (t.Construct._overwrite(o, e, a, u[a](s)), t.Construct._overwrite(o, e, r, n(s))) : i && (i[r] || i[a]) || t.Construct._overwrite(o, e, a, u[a]())
                    }), t.each(u, function (n, r) {
                        "string" == typeof o[r] && t.Construct._overwrite(o, e, r, n(o[r]))
                    }), "can.Model" !== o.fullName && o.fullName || (o.fullName = "Model" + ++n), t.Model._reqs = 0, this._url = this._shortName + "/{" + this.id + "}"
                }
            }, _ajax: l, _makeRequest: a, _clean: function () {
                if (t.Model._reqs--, !t.Model._reqs)for (var e in this.store)this.store[e]._bindings || delete this.store[e];
                return arguments[0]
            }, models: s.models("data"), model: s.model()
        }, {
            setup: function (e) {
                var n = e && e[this.constructor.id];
                t.Model._reqs && null != n && (this.constructor.store[n] = this), t.Map.prototype.setup.apply(this, arguments)
            }, isNew: function () {
                var t = r(this);
                return !(t || 0 === t)
            }, save: function (t, e) {
                return a(this, this.isNew() ? "create" : "update", t, e)
            }, destroy: function (e, n) {
                if (this.isNew()) {
                    var r = this, i = t.Deferred();
                    return i.then(e, n), i.done(function (t) {
                        r.destroyed(t)
                    }).resolve(r)
                }
                return a(this, "destroy", e, n, "destroyed")
            }, _bindsetup: function () {
                return this.constructor.store[this.__get(this.constructor.id)] = this, t.Map.prototype._bindsetup.apply(this, arguments)
            }, _bindteardown: function () {
                return delete this.constructor.store[r(this)], t.Map.prototype._bindteardown.apply(this, arguments)
            }, ___set: function (e, n) {
                t.Map.prototype.___set.call(this, e, n), e === this.constructor.id && this._bindings && (this.constructor.store[r(this)] = this)
            }
        });
        var d = function (e) {
            var n = "parse" + t.capitalize(e);
            return function (t) {
                return this[n] && (t = this[n].apply(this, arguments)), this[e](t)
            }
        }, p = function (t) {
            return this.parseModel ? this.parseModel.apply(this, arguments) : this.model(t)
        }, h = {makeFindAll: d("models"), makeFindOne: d("model"), makeCreate: p, makeUpdate: p};
        t.each(h, function (n, r) {
            t.Model[r] = function (r) {
                return function () {
                    var i = t.makeArray(arguments), a = t.isFunction(i[1]) ? i.splice(0, 1) : i.splice(0, 2), s = e(r.apply(this, a), this, n);
                    return s.then(i[0], i[1]), s
                }
            }
        }), t.each(["created", "updated", "destroyed"], function (e) {
            t.Model.prototype[e] = function (n) {
                var r, i = this.constructor;
                r = n && "object" == typeof n && this.attr(n.attr ? n.attr() : n), t.dispatch.call(this, {
                    type: "change",
                    target: this
                }, [e]), t.dispatch.call(i, e, [this])
            }
        });
        var g = t.Model.List = t.List.extend({
            _bubbleRule: function (e, n) {
                return t.List._bubbleRule(e, n) || "destroyed"
            }
        }, {
            setup: function (e) {
                t.isPlainObject(e) && !t.isArray(e) ? (t.List.prototype.setup.apply(this), this.replace(t.isDeferred(e) ? e : this.constructor.Map.findAll(e))) : t.List.prototype.setup.apply(this, arguments), this._init = 1, this.bind("destroyed", t.proxy(this._destroyed, this)), delete this._init
            }, _destroyed: function (t, e) {
                if (/\w+/.test(e))for (var n; (n = this.indexOf(t.target)) > -1;)this.splice(n, 1)
            }
        });
        return t.Model
    }(__m2, __m15, __m19), __m32 = function (t) {
        var e = /^\d+$/, n = /([^\[\]]+)|(\[\])/g, r = /([^?#]*)(#.*)?$/, i = function (t) {
            return decodeURIComponent(t.replace(/\+/g, " "))
        };
        return t.extend(t, {
            deparam: function (a) {
                var s, o, u = {};
                return a && r.test(a) && (s = a.split("&"), t.each(s, function (t) {
                    var r = t.split("="), a = i(r.shift()), s = i(r.join("=")), c = u;
                    if (a) {
                        r = a.match(n);
                        for (var l = 0, f = r.length - 1; f > l; l++)c[r[l]] || (c[r[l]] = e.test(r[l + 1]) || "[]" === r[l + 1] ? [] : {}), c = c[r[l]];
                        o = r.pop(), "[]" === o ? c.push(s) : c[o] = s
                    }
                })), u
            }
        }), t
    }(__m2, __m13), __m31 = function (t) {
        var e, n, r, i, a = /\:([\w\.]+)/g, s = /^(?:&[^=]+=[^&]*)+/, o = function (e) {
            var n = [];
            return t.each(e, function (e, r) {
                n.push(("className" === r ? "class" : r) + '="' + ("href" === r ? e : t.esc(e)) + '"')
            }), n.join(" ")
        }, u = function (t, e) {
            var n = 0, r = 0, i = {};
            for (var a in t.defaults)t.defaults[a] === e[a] && (i[a] = 1, n++);
            for (; t.names.length > r; r++) {
                if (!e.hasOwnProperty(t.names[r]))return -1;
                i[t.names[r]] || n++
            }
            return n
        }, c = window.location, l = function (t) {
            return (t + "").replace(/([.?*+\^$\[\]\\(){}|\-])/g, "\\$1")
        }, f = t.each, d = t.extend, p = function (e) {
            return e && "object" == typeof e ? (e = e instanceof t.Map ? e.attr() : t.isFunction(e.slice) ? e.slice() : t.extend({}, e), t.each(e, function (t, n) {
                e[n] = p(t)
            })) : e !== undefined && null !== e && t.isFunction(e.toString) && (e = "" + e), e
        }, h = function (t) {
            return t.replace(/\\/g, "")
        }, g = function () {
            i = 1, clearTimeout(e), e = setTimeout(function () {
                i = 0;
                var e = t.route.data.serialize(), n = t.route.param(e, !0);
                t.route._call("setURL", n), t.batch.trigger(m, "__url", [n, r]), r = n
            }, 10)
        }, m = t.extend({}, t.event);
        t.route = function (e, n) {
            var r = t.route._call("root");
            r.lastIndexOf("/") === r.length - 1 && 0 === e.indexOf("/") && (e = e.substr(1)), n = n || {};
            for (var i, s, o = [], u = "", c = a.lastIndex = 0, f = t.route._call("querySeparator"), d = t.route._call("matchSlashes"); i = a.exec(e);)o.push(i[1]), u += h(e.substring(c, a.lastIndex - i[0].length)), s = "\\" + (h(e.substr(a.lastIndex, 1)) || f + (d ? "" : "|/")), u += "([^" + s + "]" + (n[i[1]] ? "*" : "+") + ")", c = a.lastIndex;
            return u += e.substr(c).replace("\\", ""), t.route.routes[e] = {
                test: RegExp("^" + u + "($|" + l(f) + ")"),
                route: e,
                names: o,
                defaults: n,
                length: e.split("/").length
            }, t.route
        }, d(t.route, {
            param: function (e, n) {
                var r, i, s = 0, o = e.route, c = 0;
                if (delete e.route, f(e, function () {
                        c++
                    }), f(t.route.routes, function (t) {
                        return i = u(t, e), i > s && (r = t, s = i), i >= c ? !1 : undefined
                    }), t.route.routes[o] && u(t.route.routes[o], e) === s && (r = t.route.routes[o]), r) {
                    var l, p = d({}, e), h = r.route.replace(a, function (t, n) {
                        return delete p[n], e[n] === r.defaults[n] ? "" : encodeURIComponent(e[n])
                    }).replace("\\", "");
                    return f(r.defaults, function (t, e) {
                        p[e] === t && delete p[e]
                    }), l = t.param(p), n && t.route.attr("route", r.route), h + (l ? t.route._call("querySeparator") + l : "")
                }
                return t.isEmptyObject(e) ? "" : t.route._call("querySeparator") + t.param(e)
            }, deparam: function (e) {
                var n = t.route._call("root");
                n.lastIndexOf("/") === n.length - 1 && 0 === e.indexOf("/") && (e = e.substr(1));
                var r = {length: -1}, i = t.route._call("querySeparator"), a = t.route._call("paramsMatcher");
                if (f(t.route.routes, function (t) {
                        t.test.test(e) && t.length > r.length && (r = t)
                    }), r.length > -1) {
                    var s = e.match(r.test), o = s.shift(), u = e.substr(o.length - (s[s.length - 1] === i ? 1 : 0)), c = u && a.test(u) ? t.deparam(u.slice(1)) : {};
                    return c = d(!0, {}, r.defaults, c), f(s, function (t, e) {
                        t && t !== i && (c[r.names[e]] = decodeURIComponent(t))
                    }), c.route = r.route, c
                }
                return e.charAt(0) !== i && (e = i + e), a.test(e) ? t.deparam(e.slice(1)) : {}
            }, data: new t.Map({}), map: function (e) {
                var n;
                n = e.prototype instanceof t.Map ? new e : e, t.route.data = n
            }, routes: {}, ready: function (e) {
                return e !== !0 && (t.route._setup(), t.route.setState()), t.route
            }, url: function (e, n) {
                return n && (e = t.extend({}, t.route.deparam(t.route._call("matchingPartOfURL")), e)), t.route._call("root") + t.route.param(e)
            }, link: function (e, n, r, i) {
                return "<a " + o(d({href: t.route.url(n, i)}, r)) + ">" + e + "</a>"
            }, current: function (e) {
                return t.__reading(m, "__url"), this._call("matchingPartOfURL") === t.route.param(e)
            }, bindings: {
                hashchange: {
                    paramsMatcher: s, querySeparator: "&", matchSlashes: !1, bind: function () {
                        t.bind.call(window, "hashchange", v)
                    }, unbind: function () {
                        t.unbind.call(window, "hashchange", v)
                    }, matchingPartOfURL: function () {
                        return c.href.split(/#!?/)[1] || ""
                    }, setURL: function (t) {
                        return c.hash = "#!" + t, t
                    }, root: "#!"
                }
            }, defaultBinding: "hashchange", currentBinding: null, _setup: function () {
                t.route.currentBinding || (t.route._call("bind"), t.route.bind("change", g), t.route.currentBinding = t.route.defaultBinding)
            }, _teardown: function () {
                t.route.currentBinding && (t.route._call("unbind"), t.route.unbind("change", g), t.route.currentBinding = null), clearTimeout(e), i = 0
            }, _call: function () {
                var e = t.makeArray(arguments), n = e.shift(), r = t.route.bindings[t.route.currentBinding || t.route.defaultBinding], i = r[n];
                return i.apply ? i.apply(r, e) : i
            }
        }), f(["bind", "unbind", "on", "off", "delegate", "undelegate", "removeAttr", "compute", "_get", "__get", "each"], function (e) {
            t.route[e] = function () {
                return t.route.data[e] ? t.route.data[e].apply(t.route.data, arguments) : undefined
            }
        }), t.route.attr = function (e, n) {
            var r, i = typeof e;
            return r = n === undefined ? arguments : "string" !== i && "number" !== i ? [p(e), n] : [e, p(n)], t.route.data.attr.apply(t.route.data, r)
        };
        var v = t.route.setState = function () {
            var e = t.route._call("matchingPartOfURL"), a = n;
            if (n = t.route.deparam(e), !i || e !== r) {
                t.batch.start();
                for (var s in a)n[s] || t.route.removeAttr(s);
                t.route.attr(n), t.batch.trigger(m, "__url", [e, r]), t.batch.stop()
            }
        };
        return t.route
    }(__m2, __m15, __m19, __m32), __m33 = function (t) {
        return t.Control.processors.route = function (e, n, r, i, a) {
            r = r || "", t.route.routes[r] || ("/" === r[0] && (r = r.substring(1)), t.route(r));
            var s, o = function (e) {
                if (t.route.attr("route") === r && (e.batchNum === undefined || e.batchNum !== s)) {
                    s = e.batchNum;
                    var n = t.route.attr();
                    delete n.route, t.isFunction(a[i]) ? a[i](n) : a[a[i]](n)
                }
            };
            return t.route.bind("change", o), function () {
                t.route.unbind("change", o)
            }
        }, t
    }(__m2, __m31, __m11);
    window.can = __m4
})();
