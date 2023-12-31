(function(b) {
	b.MtaH5 = b.MtaH5 || {};
	MtaH5.hack = function() {
		var b = document.getElementsByName("MTAH5"),
			f = {
				conf: {
					autoReport: 1,
					senseHash: 1,
					senseQuery: 0,
					userReport: 0
				},
				user: {
					user_id: ""
				},
				version: "2.0.14"
			};
		if(0 == b.length)
			for(var l = document.getElementsByTagName("script"), k = 0; k < l.length; k++)
				if("undefined" !== typeof l[k].attributes.name && "MTAH5" == l[k].attributes.name.nodeValue) {
					b = [];
					b.push(l[k]);
					break
				}
		0 < b.length && function() {
			"undefined" !== typeof b[0].attributes.sid && (f.conf.sid = b[0].attributes.sid.nodeValue);
			"undefined" !==
			typeof b[0].attributes.cid && (f.conf.cid = b[0].attributes.cid.nodeValue);
			"object" === typeof _mtac && function() {
				for(var b in _mtac)
					if("ignoreParams" == b) {
						if("string" == typeof _mtac[b] && /\w(,?)\w+/.test(_mtac[b])) {
							var k = _mtac[b].split(",");
							_mtac.hasOwnProperty(b) && (f.conf[b] = k)
						}
						"object" == typeof _mtac[b] && 0 < _mtac[b].length && _mtac.hasOwnProperty(b) && (f.conf[b] = _mtac[b])
					} else _mtac.hasOwnProperty(b) && (f.conf[b] = _mtac[b])
			}();
			"object" === typeof _user && function() {
				for(var b in _user) f.user.hasOwnProperty(b) && (f.user[b] =
					_user[b])
			}()
		}();
		f.conf.user = f.user;
		f.conf.version = f.version;
		return f
	}
})(this);
(function(b, q) {
	function f(a) {
		a = window.localStorage ? localStorage.getItem(a) || sessionStorage.getItem(a) : (a = document.cookie.match(new RegExp("(?:^|;\\s)" + a + "=(.*?)(?:;\\s|$)"))) ? a[1] : "";
		return a
	}

	function l(a, b, e) {
		if(window.localStorage) try {
			e ? localStorage.setItem(a, b) : sessionStorage.setItem(a, b)
		} catch(h) {} else {
			var d = window.location.host,
				f = {
					"com.cn": 1,
					"js.cn": 1,
					"net.cn": 1,
					"gov.cn": 1,
					"com.hk": 1,
					"co.nz": 1
				},
				g = d.split(".");
			2 < g.length && (d = (f[g.slice(-2).join(".")] ? g.slice(-3) : g.slice(-2)).join("."));
			document.cookie =
				a + "=" + b + ";path=/;domain=" + d + (e ? ";expires=" + e : "")
		}
	}

	function k(a) {
		var d = {},
			e;
		if(void 0 === a) {
			var c = window.location;
			a = c.host;
			var f = c.pathname;
			var g = c.search.substr(1);
			var h = c.hash
		} else c = a.match(/\w+:\/\/((?:[\w-]+\.)+\w+)(?::\d+)?(\/[^\?\\"'\|:<>]*)?(?:\?([^'"\\<>#]*))?(?:#(\w+))?/i) || [], a = c[1], f = c[2], g = c[3], h = c[4];
		void 0 !== h && (h = h.replace(/"|'|<|>/ig, "M"));
		g && function() {
			for(var a = g.split("&"), b = 0, e = a.length; b < e; b++)
				if(-1 != a[b].indexOf("=")) {
					var h = a[b].indexOf("="),
						c = a[b].slice(0, h);
					h = a[b].slice(h + 1);
					d[c] = h
				}
		}();
		g = function() {
			if("undefined" === typeof g) return g;
			for(var a = g.split("&"), e = [], d = 0, h = a.length; d < h; d++)
				if(-1 != a[d].indexOf("=")) {
					var c = a[d].indexOf("="),
						f = a[d].slice(0, c);
					c = a[d].slice(c + 1);
					b.ignoreParams && -1 != b.ignoreParams.indexOf(f) || e.push(f + "=" + c)
				}
			return e.join("&")
		}();
		h && function() {
			for(var a = 0 == h.indexOf("#") ? h.substr(1).split("&") : h.split("&"), b = 0, d = a.length; b < d; b++)
				if(-1 != a[b].indexOf("=")) {
					var c = a[b].indexOf("="),
						g = a[b].slice(0, c);
					c = a[b].slice(c + 1);
					if("adtag" === g.toLowerCase()) {
						e = c;
						break
					}
				}
		}();
		return {
			host: a,
			path: f,
			search: g,
			hash: h,
			param: d,
			adtag: e
		}
	}

	function w(a) {
		for(var b = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9], e = 10; 1 < e; e--) {
			var c = Math.floor(10 * Math.random()),
				f = b[c];
			b[c] = b[e - 1];
			b[e - 1] = f
		}
		for(e = c = 0; 5 > e; e++) c = 10 * c + b[e];
		return(a || "") + (c + "" + +new Date)
	}

	function r() {
		var a = k(),
			d = {
				dm: a.host,
				pvi: "",
				si: "",
				url: a.path,
				arg: encodeURIComponent(a.search || "").substr(0, 512),
				ty: 0
			};
		d.pvi = function() {
			if(b.userReport) {
				var a = f("pgv_uid");
				a && a == b.user.user_id || (d.ty = 1, l("pgv_uid", b.user.user_id, "Sun, 18 Jan 2038 00:00:00 GMT;"));
				a = b.user.user_id
			} else a = f("pgv_pvi"), a || (d.ty = 1, a = w(void 0), l("pgv_pvi", a, "Sun, 18 Jan 2038 00:00:00 GMT;"));
			return a
		}();
		d.si = function() {
			var a = f("pgv_si");
			a || (a = w("s"), l("pgv_si", a));
			return a
		}();
		d.url = function() {
			var d = a.path;
			b.senseQuery && (d += a.search ? "?" + encodeURIComponent(a.search || "").substr(0, 512) : "");
			b.senseHash && (d += a.hash ? encodeURIComponent(a.hash) : "");
			return d
		}();
		return d
	}

	function v() {
		var a = k(document.referrer),
			b = k();
		return {
			rdm: a.host,
			rurl: a.path,
			rarg: encodeURIComponent(a.search || "").substr(0,
				512),
			adt: b.param.ADTAG || b.param.adtag || b.param.CKTAG || b.param.cktag || b.param.PTAG || b.param.ptag || b.adtag
		}
	}

	function t() {
		try {
			var a = navigator,
				b = screen || {
					width: "",
					height: "",
					colorDepth: ""
				},
				e = {
					scr: b.width + "x" + b.height,
					scl: b.colorDepth + "-bit",
					lg: (a.language || a.userLanguage).toLowerCase(),
					tz: (new Date).getTimezoneOffset() / 60
				}
		} catch(c) {
			return {}
		}
		return e
	}

	function u(a) {
		arr = {};
		if(a) {
			var b = arr,
				e = [],
				c;
			for(c in a) a.hasOwnProperty(c) && e.push(encodeURIComponent(c) + "=" + encodeURIComponent(a[c]));
			a = e.join(";");
			b.ext =
				a
		}
		return arr
	}

	function x(a) {
		a = a || {};
		for(var d in a) a.hasOwnProperty(d) && (b[d] = a[d]);
		if(b.sid)
			if(!b.userReport || b.user.user_id && !parseInt(b.user.user_id, 10) !== b.user.user_id) {
				a = [];
				for(var e = 0, c = [r(), v(), {
						r2: b.sid
					}, t(), u({
						version: b.version
					}), {
						random: +new Date
					}], f = c.length; e < f; e++)
					for(d in c[e]) c[e].hasOwnProperty(d) && a.push(d + "=" + ("undefined" == typeof c[e][d] ? "" : c[e][d]));
				var g = function(a) {
					// a = Ta.src = ("https:" == document.location.protocol ? "https://pingtas.qq.com/webview" : "http://pingtcss.qq.com") + "/pingd?" + a.join("&").toLowerCase();
					var c = new Image;
					Ta[b.sid] = c;
					c.onload = c.onerror = c.onabort = function() {
						c = c.onload = c.onerror = c.onabort = null;
						Ta[b.sid] = !0
					};
					c.src = a
				};
				g(a);
				b.performanceMonitor && (d = function() {
					if(window.performance) {
						var a = window.performance.timing;
						var c = {
							value: a.domainLookupEnd - a.domainLookupStart
						};
						var d = {
								value: a.connectEnd - a.connectStart
							},
							e = {
								value: a.responseStart - (a.requestStart || a.responseStart + 1)
							},
							f = a.responseEnd - a.responseStart;
						a.domContentLoadedEventStart ? 0 > f && (f = 0) : f = -1;
						a = {
							domainLookupTime: c,
							connectTime: d,
							requestTime: e,
							resourcesLoadedTime: {
								value: f
							},
							domParsingTime: {
								value: a.domContentLoadedEventStart ? a.domInteractive - a.domLoading : -1
							},
							domContentLoadedTime: {
								value: a.domContentLoadedEventStart ? a.domContentLoadedEventStart - a.fetchStart : -1
							}
						}
					} else a = "";
					c = a;
					d = [];
					a = [];
					e = 0;
					f = [r(), {
						r2: b.cid
					}, t(), {
						random: +new Date
					}];
					for(var k = f.length; e < k; e++)
						for(var n in f[e]) f[e].hasOwnProperty(n) && a.push(n + "=" + ("undefined" == typeof f[e][n] ? "" : f[e][n]));
					for(n in c) c.hasOwnProperty(n) && ("domContentLoadedTime" == n ? a.push("r3=" +
						c[n].value) : d.push(c[n].value));
					n = u({
						pfm: d.join("_"),
						version: b.version
					});
					a.push("ext=" + n.ext);
					g(a)
				}, "undefined" !== typeof window.performance && "undefined" !== typeof window.performance.timing && 0 != window.performance.timing.loadEventEnd ? d() : window.attachEvent ? window.attachEvent("onload", d) : window.addEventListener && window.addEventListener("load", d, !1))
			} else console.log("MTA H5\u5206\u6790\u9519\u8bef\u63d0\u793a\uff1a\u60a8\u9009\u62e9\u4e86\u7528\u6237\u7edf\u8ba1uv\uff0c\u8bf7\u8bbe\u7f6e\u4e1a\u52a1\u7684user_id\uff0c\u9700\u4e3aint\u7c7b\u578b");
		else console.log("MTA H5\u5206\u6790\u9519\u8bef\u63d0\u793a\uff1a\u60a8\u6ca1\u6709\u8bbe\u7f6esid")
	}
	q.MtaH5 = q.MtaH5 || {};
	q.Ta = q.Ta || {};
	MtaH5.pgv = x;
	Ta.clickStat = MtaH5.clickStat = function(a, d) {
		var e = MtaH5.hack ? MtaH5.hack() : "",
			c = {};
		e.conf && function() {
			var a = e.conf,
				b;
			for(b in a) a.hasOwnProperty(b) && (c[b] = a[b])
		}();
		if(c.cid) {
			var f = [],
				g = r(),
				h = {
					r2: b.sid
				};
			g.dm = "taclick";
			g.url = a.toString().toLowerCase();
			h.r2 = c.cid;
			h.r5 = function(a) {
				a = "undefined" === typeof a ? {} : a;
				var b = [],
					c;
				for(c in a) a.hasOwnProperty(c) && b.push(c +
					"=" + encodeURIComponent(a[c]));
				return b.join(";")
			}(d);
			var k = 0;
			g = [g, v(), h, t(), u({
				version: c.version
			}), {
				random: +new Date
			}];
			for(h = g.length; k < h; k++)
				for(var m in g[k]) g[k].hasOwnProperty(m) && f.push(m + "=" + ("undefined" == typeof g[k][m] ? "" : g[k][m]));
			// f = MtaH5.src = ("https:" == document.location.protocol ? "https://pingtas.qq.com/webview" : "http://pingtcss.qq.com") + "/pingd?" + f.join("&");
			var p = new Image;
			MtaH5["click_" + c.sid] = p;
			p.onload = p.onerror = p.onabort = function() {
				p = p.onload = p.onerror = p.onabort = null;
				MtaH5[c.sid] = !0
			};
			p.src = f
		} else console.log("MTA H5\u5206\u6790\u9519\u8bef\u63d0\u793a\uff1a\u60a8\u6ca1\u6709\u8bbe\u7f6ecid,\u8bf7\u5230\u7ba1\u7406\u53f0\u5f00\u901a\u81ea\u5b9a\u4e49\u4e8b\u4ef6\u5e76\u66f4\u65b0\u7edf\u8ba1\u4ee3\u7801")
	};
	Ta.clickShare = MtaH5.clickShare = function(a) {
		var d = MtaH5.hack ? MtaH5.hack() : "",
			e = {},
			c = k();
		c = c.param.CKTAG || c.param.ckatg;
		var f = "undefined" === typeof c ? [] : c.split(".");
		d.conf && function() {
			var a = d.conf,
				b;
			for(b in a) a.hasOwnProperty(b) && (e[b] = a[b])
		}();
		if(e.cid) {
			c = [];
			var g = r(),
				h = {
					r2: b.sid
				};
			g.dm = "taclick_share";
			g.url = "mtah5-share-" + a;
			h.r2 = e.cid;
			h.r5 = function(a, b) {
				var c = [];
				2 === a.length && a[0] == b && c.push(a[0] + "=" + a[1]);
				return c.join(";")
			}(f, "mtah5_share");
			a = 0;
			g = [g, v(), h, t(), u({
				version: e.version
			}), {
				random: +new Date
			}];
			for(h = g.length; a < h; a++)
				for(var l in g[a]) g[a].hasOwnProperty(l) && c.push(l + "=" + ("undefined" == typeof g[a][l] ? "" : g[a][l]));
			// l = MtaH5.src = ("https:" == document.location.protocol ? "https://pingtas.qq.com/webview" : "http://pingtcss.qq.com") + "/pingd?" + c.join("&").toLowerCase();
			var m = new Image;
			MtaH5["click_" + e.sid] = m;
			m.onload = m.onerror = m.onabort = function() {
				m = m.onload = m.onerror = m.onabort = null;
				MtaH5[e.sid] = !0
			};
			m.src = l
		}
	};
	var y = MtaH5.hack ? MtaH5.hack() : {};
	y.conf && function() {
		var a = y.conf,
			d;
		for(d in a) a.hasOwnProperty(d) && (b[d] = a[d])
	}();
	b.autoReport && x()
})({}, this);