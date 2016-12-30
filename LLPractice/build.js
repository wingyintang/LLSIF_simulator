! function(a) {
    function b(a, b, e) {
        return 4 === arguments.length ? c.apply(this, arguments) : void d(a, {
            declarative: !0,
            deps: b,
            declare: e
        })
    }

    function c(a, b, c, e) {
        d(a, {
            declarative: !1,
            deps: b,
            executingRequire: c,
            execute: e
        })
    }

    function d(a, b) {
        b.name = a, a in o || (o[a] = b), b.normalizedDeps = b.deps
    }

    function e(a, b) {
        if (b[a.groupIndex] = b[a.groupIndex] || [], -1 == p.call(b[a.groupIndex], a)) {
            b[a.groupIndex].push(a);
            for (var c = 0, d = a.normalizedDeps.length; d > c; c++) {
                var f = a.normalizedDeps[c],
                    g = o[f];
                if (g && !g.evaluated) {
                    var h = a.groupIndex + (g.declarative != a.declarative);
                    if (void 0 === g.groupIndex || g.groupIndex < h) {
                        if (void 0 !== g.groupIndex && (b[g.groupIndex].splice(p.call(b[g.groupIndex], g), 1), 0 == b[g.groupIndex].length)) throw new TypeError("Mixed dependency cycle detected");
                        g.groupIndex = h
                    }
                    e(g, b)
                }
            }
        }
    }

    function f(a) {
        var b = o[a];
        b.groupIndex = 0;
        var c = [];
        e(b, c);
        for (var d = !!b.declarative == c.length % 2, f = c.length - 1; f >= 0; f--) {
            for (var g = c[f], i = 0; i < g.length; i++) {
                var k = g[i];
                d ? h(k) : j(k)
            }
            d = !d
        }
    }

    function g(a) {
        return s[a] || (s[a] = {
            name: a,
            dependencies: [],
            exports: {},
            importers: []
        })
    }

    function h(b) {
        if (!b.module) {
            var c = b.module = g(b.name),
                d = b.module.exports,
                e = b.declare.call(a, function(a, b) {
                    if (c.locked = !0, "object" == typeof a)
                        for (var e in a) d[e] = a[e];
                    else d[a] = b;
                    for (var f = 0, g = c.importers.length; g > f; f++) {
                        var h = c.importers[f];
                        if (!h.locked)
                            for (var i = 0; i < h.dependencies.length; ++i) h.dependencies[i] === c && h.setters[i](d)
                    }
                    return c.locked = !1, b
                }, b.name);
            c.setters = e.setters, c.execute = e.execute;
            for (var f = 0, i = b.normalizedDeps.length; i > f; f++) {
                var j, k = b.normalizedDeps[f],
                    l = o[k],
                    m = s[k];
                m ? j = m.exports : l && !l.declarative ? j = l.esModule : l ? (h(l), m = l.module, j = m.exports) : j = n(k), m && m.importers ? (m.importers.push(c), c.dependencies.push(m)) : c.dependencies.push(null), c.setters[f] && c.setters[f](j)
            }
        }
    }

    function i(a) {
        var b, c = o[a];
        if (c) c.declarative ? m(a, []) : c.evaluated || j(c), b = c.module.exports;
        else if (b = n(a), !b) throw new Error("Unable to load dependency " + a + ".");
        return (!c || c.declarative) && b && b.__useDefault ? b.default : b
    }

    function j(b) {
        if (!b.module) {
            var c = {},
                d = b.module = {
                    exports: c,
                    id: b.name
                };
            if (!b.executingRequire)
                for (var e = 0, f = b.normalizedDeps.length; f > e; e++) {
                    var g = b.normalizedDeps[e],
                        h = o[g];
                    h && j(h)
                }
            b.evaluated = !0;
            var l = b.execute.call(a, function(a) {
                for (var c = 0, d = b.deps.length; d > c; c++)
                    if (b.deps[c] == a) return i(b.normalizedDeps[c]);
                throw new TypeError("Module " + a + " not declared as a dependency.")
            }, c, d);
            l && (d.exports = l), c = d.exports, c && c.__esModule ? b.esModule = c : b.esModule = k(c)
        }
    }

    function k(b) {
        var c = {};
        if (("object" == typeof b || "function" == typeof b) && b !== a)
            if (q)
                for (var d in b) "default" !== d && l(c, b, d);
            else {
                var e = b && b.hasOwnProperty;
                for (var d in b) "default" === d || e && !b.hasOwnProperty(d) || (c[d] = b[d])
            }
        return c.default = b, r(c, "__useDefault", {
            value: !0
        }), c
    }

    function l(a, b, c) {
        try {
            var d;
            (d = Object.getOwnPropertyDescriptor(b, c)) && r(a, c, d)
        } catch (d) {
            return a[c] = b[c], !1
        }
    }

    function m(b, c) {
        var d = o[b];
        if (d && !d.evaluated && d.declarative) {
            c.push(b);
            for (var e = 0, f = d.normalizedDeps.length; f > e; e++) {
                var g = d.normalizedDeps[e]; - 1 == p.call(c, g) && (o[g] ? m(g, c) : n(g))
            }
            d.evaluated || (d.evaluated = !0, d.module.execute.call(a))
        }
    }

    function n(a) {
        if (u[a]) return u[a];
        if ("@node/" == a.substr(0, 6)) return t(a.substr(6));
        var b = o[a];
        if (!b) throw "Module " + a + " not present.";
        return f(a), m(a, []), o[a] = void 0, b.declarative && r(b.module.exports, "__esModule", {
            value: !0
        }), u[a] = b.declarative ? b.module.exports : b.esModule
    }
    var o = {},
        p = Array.prototype.indexOf || function(a) {
            for (var b = 0, c = this.length; c > b; b++)
                if (this[b] === a) return b;
            return -1
        },
        q = !0;
    try {
        Object.getOwnPropertyDescriptor({
            a: 0
        }, "a")
    } catch (a) {
        q = !1
    }
    var r;
    ! function() {
        try {
            Object.defineProperty({}, "a", {}) && (r = Object.defineProperty)
        } catch (a) {
            r = function(a, b, c) {
                try {
                    a[b] = c.value || c.get.call(a)
                } catch (a) {}
            }
        }
    }();
    var s = {},
        t = "undefined" != typeof System && System._nodeRequire || "undefined" != typeof require && require.resolve && "undefined" != typeof process && require,
        u = {
            "@empty": {}
        };
    return function(a, d, e, f) {
        return function(g) {
            g(function(g) {
                for (var h = {
                        _nodeRequire: t,
                        register: b,
                        registerDynamic: c,
                        get: n,
                        set: function(a, b) {
                            u[a] = b
                        },
                        newModule: function(a) {
                            return a
                        }
                    }, i = 0; i < d.length; i++)(function(a, b) {
                    b && b.__esModule ? u[a] = b : u[a] = k(b)
                })(d[i], arguments[i]);
                f(h);
                var j = n(a[0]);
                if (a.length > 1)
                    for (var i = 1; i < a.length; i++) n(a[i]);
                return e ? j.default : j
            })
        }
    }
}("undefined" != typeof self ? self : global)(["1"], [], !1, function(a) {
    this.require, this.exports, this.module;
    a.register("2", [], function(a, b) {
        "use strict";

        function c(a, b) {
            return b >>> a | b << 32 - a
        }

        function d(a, b, c) {
            return a & b ^ ~a & c
        }

        function e(a, b, c) {
            return a & b ^ a & c ^ b & c
        }

        function f(a) {
            return c(2, a) ^ c(13, a) ^ c(22, a)
        }

        function g(a) {
            return c(6, a) ^ c(11, a) ^ c(25, a)
        }

        function h(a) {
            return c(7, a) ^ c(18, a) ^ a >>> 3
        }

        function i(a) {
            return c(17, a) ^ c(19, a) ^ a >>> 10
        }

        function j(a, b) {
            return a[15 & b] += i(a[b + 14 & 15]) + a[b + 9 & 15] + h(a[b + 1 & 15])
        }

        function k(a, b) {
            var c = (65535 & a) + (65535 & b),
                d = (a >> 16) + (b >> 16) + (c >> 16);
            return d << 16 | 65535 & c
        }

        function l() {
            t = new Array(8), u = new Array(2), v = new Array(64), u[0] = u[1] = 0, t[0] = 1779033703, t[1] = 3144134277, t[2] = 1013904242, t[3] = 2773480762, t[4] = 1359893119, t[5] = 2600822924, t[6] = 528734635, t[7] = 1541459225
        }

        function m() {
            var a, b, c, h, i, l, m, n, o, p, q = new Array(16);
            a = t[0], b = t[1], c = t[2], h = t[3], i = t[4], l = t[5], m = t[6], n = t[7];
            for (var r = 0; r < 16; r++) q[r] = v[(r << 2) + 3] | v[(r << 2) + 2] << 8 | v[(r << 2) + 1] << 16 | v[r << 2] << 24;
            for (var u = 0; u < 64; u++) o = n + g(i) + d(i, l, m) + s[u], o += u < 16 ? q[u] : j(q, u), p = f(a) + e(a, b, c), n = m, m = l, l = i, i = k(h, o), h = c, c = b, b = a, a = k(o, p);
            t[0] += a, t[1] += b, t[2] += c, t[3] += h, t[4] += i, t[5] += l, t[6] += m, t[7] += n
        }

        function n(a, b) {
            var c, d, e = 0;
            d = u[0] >> 3 & 63;
            var f = 63 & b;
            for ((u[0] += b << 3) < b << 3 && u[1]++, u[1] += b >> 29, c = 0; c + 63 < b; c += 64) {
                for (var g = d; g < 64; g++) v[g] = a.charCodeAt(e++);
                m(), d = 0
            }
            for (var h = 0; h < f; h++) v[h] = a.charCodeAt(e++)
        }

        function o() {
            var a = u[0] >> 3 & 63;
            if (v[a++] = 128, a <= 56)
                for (var b = a; b < 56; b++) v[b] = 0;
            else {
                for (var b = a; b < 64; b++) v[b] = 0;
                m();
                for (var b = 0; b < 56; b++) v[b] = 0
            }
            v[56] = u[1] >>> 24 & 255, v[57] = u[1] >>> 16 & 255, v[58] = u[1] >>> 8 & 255, v[59] = 255 & u[1], v[60] = u[0] >>> 24 & 255, v[61] = u[0] >>> 16 & 255, v[62] = u[0] >>> 8 & 255, v[63] = 255 & u[0], m()
        }

        function p() {
            for (var a = "", b = 0; b < 8; b++)
                for (var c = 28; c >= 0; c -= 4) a += w.charAt(t[b] >>> c & 15);
            return a
        }

        function q(a) {
            return l(), n(a, a.length), o(), p()
        }

        function r(a) {
            var b = JSON.parse(localStorage.getItem("logininfo"));
            return b || (b = {
                username: "",
                userid: "",
                token: "",
                logincookie: "",
                islogin: !1
            }), a = a + "&logincookie=" + b.logincookie + "&timestamp=" + Date.now(), [a, q(a.match(/\?(.+)/)[1] + b.token)]
        }
        var s, t, u, v, w;
        b && b.id;
        return a("sign", r), {
            setters: [],
            execute: function() {
                s = [1116352408, 1899447441, 3049323471, 3921009573, 961987163, 1508970993, 2453635748, 2870763221, 3624381080, 310598401, 607225278, 1426881987, 1925078388, 2162078206, 2614888103, 3248222580, 3835390401, 4022224774, 264347078, 604807628, 770255983, 1249150122, 1555081692, 1996064986, 2554220882, 2821834349, 2952996808, 3210313671, 3336571891, 3584528711, 113926993, 338241895, 666307205, 773529912, 1294757372, 1396182291, 1695183700, 1986661051, 2177026350, 2456956037, 2730485921, 2820302411, 3259730800, 3345764771, 3516065817, 3600352804, 4094571909, 275423344, 430227734, 506948616, 659060556, 883997877, 958139571, 1322822218, 1537002063, 1747873779, 1955562222, 2024104815, 2227730452, 2361852424, 2428436474, 2756734187, 3204031479, 3329325298], w = "0123456789abcdef"
            }
        }
    }), a.register("3", ["4", "2"], function(a, b) {
        "use strict";

        function c(a) {
            return a ? Promise.resolve(a) : e.GET("/API/getRandomLive").then(function(a) {
                return a.content.live_id
            })
        }

        function d(b) {
            return c(b).then(function(a) {
                var b, c = "/API/getlive?live_id=" + a;
                return d = f.sign(c), c = d[0], b = d[1], e.GET(c, {
                    headers: {
                        "X-sign": b
                    },
                    params: {}
                });
                var d
            }).then(function(b) {
                e.GET("/API/startplay?live_id=" + b.content.live_id), a("liveinfo", i = {
                    bgimg: g + b.content.bgimg_path,
                    bgm: g + b.content.bgm_path,
                    map: g + b.content.map_path,
                    perfect: h + "fx/perfect.mp3",
                    great: h + "fx/great.mp3",
                    good: h + "fx/good.mp3",
                    uiAssets: b.content.assets_path ? g + b.content.assets_path : "assets/uiAssets.png",
                    title: b.content.live_name,
                    coverImg: g + b.content.cover_path,
                    customize: b.content.customize_path ? g + b.content.customize_path : null
                })
            })
        }
        var e, f, g, h, i;
        b && b.id;
        return a("load", d), {
            setters: [function(a) {
                e = a
            }, function(a) {
                f = a
            }],
            execute: function() {
                g = "/upload/", h = "/llplayer/assets/"
            }
        }
    }), a.register("5", ["6"], function(a, b) {
        "use strict";
        var c, d;
        b && b.id;
        return {
            setters: [function(a) {
                c = a
            }],
            execute: function() {
                d = function() {
                    function a(a, b, d) {
                        void 0 === a && (a = 128), void 0 === b && (b = 128), this.sizeW = a, this.sizeH = b, this.gl = c.render.gl, this.texture = this.gl.createTexture(), c.render.currentGlTexture[0] = null, this.gl.bindTexture(this.gl.TEXTURE_2D, this.texture), this.gl.texImage2D(this.gl.TEXTURE_2D, 0, this.gl.RGBA, a, b, 0, this.gl.RGBA, d ? this.gl[d] : this.gl.UNSIGNED_BYTE, null), this.fbo = this.gl.createFramebuffer(), this.gl.bindFramebuffer(this.gl.FRAMEBUFFER, this.fbo), this.gl.framebufferTexture2D(this.gl.FRAMEBUFFER, this.gl.COLOR_ATTACHMENT0, this.gl.TEXTURE_2D, this.texture, 0), this.gl.bindFramebuffer(this.gl.FRAMEBUFFER, null), this.setFilter("NEAREST", "NEAREST")
                    }
                    return a.prototype.use = function() {
                        this.gl.bindFramebuffer(this.gl.FRAMEBUFFER, this.fbo), this.gl.viewport(0, 0, this.sizeW, this.sizeH)
                    }, a.prototype.release = function() {
                        this.gl.bindFramebuffer(this.gl.FRAMEBUFFER, null), this.gl.viewport(0, 0, c.render.p * c.render.width, c.render.p * c.render.height)
                    }, a.prototype.setFilter = function(a, b) {
                        this.gl.bindTexture(this.gl.TEXTURE_2D, this.texture), c.render.currentGlTexture[0] = null, this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MIN_FILTER, this.gl[a]), this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MAG_FILTER, this.gl[b])
                    }, a
                }(), a("FrameBuffer", d)
            }
        }
    }), a.register("7", ["8", "9"], function(a, b) {
        "use strict";
        var c, d, e, f = (b && b.id, this && this.__extends || function(a, b) {
            function c() {
                this.constructor = a
            }
            for (var d in b) b.hasOwnProperty(d) && (a[d] = b[d]);
            a.prototype = null === b ? Object.create(b) : (c.prototype = b.prototype, new c)
        });
        return {
            setters: [function(a) {
                c = a
            }, function(a) {
                d = a
            }],
            execute: function() {
                e = function(a) {
                    function b(b, c) {
                        void 0 === c && (c = d.EmitterType.point), a.call(this), this.emitterType = c, this.vst = "\n        attribute vec2 position;\n        varying vec2 uv;\n        void main() {\n        uv=(position+1.0)*0.5;\n        gl_Position=vec4(position,0.0,1.0);\n        }\n    ", this.fst = "\n        precision highp float;\n        varying vec2 uv;\n        uniform highp float deltaTime;\n        uniform highp float currentTime;\n        uniform lowp sampler2D velocityTexture;\n        uniform sampler2D positionTexture;\n        //描述粒子基本属性，x为大小，，z为出生时间，w为寿命\n        uniform sampler2D staticTexture;\n        uniform highp vec3 emitterPosition;\n\n        #if (EMITTER_TYPE==0)\n\n        #elif (EMITTER_TYPE==1)\n\n        #elif (EMITTER_TYPE==2)\n        uniform vec4 direction;\n        #elif (EMITTER_TYPE==3)\n        //half size;\n        uniform highp vec3 emitterSize;\n        #endif\n\n        vec4 unpack(const in float depth)\n        {\n            const vec4 bit_shift = vec4(256.0*256.0*256.0, 256.0*256.0, 256.0, 1.0);\n            const vec4 bit_mask  = vec4(0.0, 1.0/256.0, 1.0/256.0, 1.0/256.0);\n            vec4 res = fract(depth * bit_shift);\n            res -= res.xxyz * bit_mask;\n            return res;\n        }\n\n        float pack(const in vec4 rgba_depth)\n        {\n            const vec4 bit_shift = vec4(1.0/(256.0*256.0*256.0), 1.0/(256.0*256.0), 1.0/256.0, 1.0);\n            float depth = dot(rgba_depth, bit_shift);\n            return depth;\n        }\n\n        float lastRand=0.0;\n        float rnd(){\n            lastRand=fract(11035.15245*lastRand+0.12345);\n            return lastRand;\n        }\n        float rnd_ext(){\n            return 2.0*rnd()-1.0;\n        }\n\n\n        void main() {\n\n        vec4 staticInfo=texture2D(staticTexture,uv);\n        lastRand=staticInfo.y;\n        vec4 pos=texture2D(positionTexture,uv);\n\n        float particleTime=mod(currentTime-staticInfo.z,totalTime);\n           //寿命结束\n         if(particleTime>staticInfo.w){\n            pos.w=0.0;\n            gl_FragColor=vec4(pos);\n            return;\n         }\n         //生成粒子\n         if(particleTime>0.0 && particleTime<=deltaTime){\n                #if (EMITTER_TYPE==0)\n                 pos=vec4(emitterPosition,1.0);\n                #elif (EMITTER_TYPE==1)\n                 pos=vec4(emitterPosition,1.0);\n                #elif (EMITTER_TYPE==2)\n\n                #elif (EMITTER_TYPE==3)\n                lastRand=staticInfo.y*fract(currentTime/totalTime);\n                  pos=vec4(emitterPosition+vec3(rnd_ext()*emitterSize.x,rnd_ext()*emitterSize.y,rnd_ext()*emitterSize.z),1.0);\n                #endif\n             }\n         vec4 v=texture2D(velocityTexture,uv);\n         pos.xyz=pos.xyz+v.xyz*deltaTime;\n\n         gl_FragColor=vec4(pos.xyz,v.w);\n         //gl_FragColor=vec4(1.0,1.0,1.0,1.0);\n\n        }\n    ", this.totalTime = b, this.attributes = [{
                            name: "position",
                            size: 2
                        }], this.uniforms = [{
                            name: "positionTexture",
                            type: "1i",
                            value: 0
                        }, {
                            name: "velocityTexture",
                            type: "1i",
                            value: 1
                        }, {
                            name: "staticTexture",
                            type: "1i",
                            value: 2
                        }, {
                            name: "emitterPosition",
                            type: "3fv",
                            value: [0, 0, 0]
                        }, {
                            name: "currentTime",
                            type: "1f",
                            value: 0
                        }, {
                            name: "deltaTime",
                            type: "1f",
                            value: 0
                        }, {
                            name: "emitColor",
                            type: "4fv",
                            value: [1, 1, 1, 1]
                        }, {
                            name: "emitterSize",
                            type: "3fv",
                            value: [1, 1, 1]
                        }], this.enableBlend = !1, this.enableDepthTest = !1, this.enableDepthWrite = !1, this.init()
                    }
                    return f(b, a), b.prototype.init = function() {
                        this.initProgram(this.vst, this.fst, {
                            EMITTER_TYPE: this.emitterType,
                            totalTime: this.totalTime
                        })
                    }, b
                }(c.Material), a("PositionMaterial", e)
            }
        }
    }), a.register("a", ["8", "9"], function(a, b) {
        "use strict";
        var c, d, e, f = (b && b.id, this && this.__extends || function(a, b) {
            function c() {
                this.constructor = a
            }
            for (var d in b) b.hasOwnProperty(d) && (a[d] = b[d]);
            a.prototype = null === b ? Object.create(b) : (c.prototype = b.prototype, new c)
        });
        return {
            setters: [function(a) {
                c = a
            }, function(a) {
                d = a
            }],
            execute: function() {
                e = function(a) {
                    function b(b) {
                        a.call(this), this.vst = "\n        attribute vec2 position;\n        varying vec2 uv;\n        void main() {\n        uv=(position+1.0)*0.5;\n        gl_Position=vec4(position,0.0,1.0);\n        }\n    ", this.fst = "\n            precision highp float;\n            varying vec2 uv;\n            uniform highp float deltaTime;\n            uniform highp float currentTime;\n            uniform vec3 gravity;\n\n            //阻力系数\n            uniform float resistance;\n\n            uniform sampler2D velocityTexture;\n\n            //描述粒子基本属性，x为大小,y为随机种子，z为出生时间，w为寿命\n            uniform sampler2D staticTexture;\n\n\n            uniform vec3 wind;\n\n\n\n            uniform float emitSpeed;\n            uniform float emitVary;\n            uniform float emitPercent;\n            uniform float speedVary;\n\n\n            #if (EMITTER_TYPE==0)\n\n            #elif (EMITTER_TYPE==1)\n            uniform vec4 direction;\n            #elif (EMITTER_TYPE==2)\n            uniform vec4 direction;\n            #elif (EMITTER_TYPE==3)\n\n            #endif\n\n             highp float lastRand;\n             float rnd(){\n                    lastRand=fract(1103.515245*lastRand+0.12345);\n                    return lastRand;\n             }\n             float rnd_ext(){\n                    return 2.0*rnd()-1.0;\n             }\n\n\n            void main() {\n\n                 mediump vec4 staticInfo=texture2D(staticTexture,uv);\n                 lastRand=fract(staticInfo.y+currentTime/totalTime);\n                 vec4 v=texture2D(velocityTexture,uv);\n                 highp float particleTime=mod(currentTime-staticInfo.z,totalTime);\n                    //寿命结束\n\n                  if(particleTime>staticInfo.w){\n                  gl_FragColor=vec4(0.0,0.0,0.0,0.0);\n                     return;\n                  }\n                  highp float offsetTime=mod(currentTime,totalTime)-staticInfo.z;\n                 if(offsetTime < deltaTime&&offsetTime>0.0){\n                 if(rnd()>emitPercent){\n                 gl_FragColor=vec4(0.0,0.0,0.0,0.0);\n                 return;\n                 }\n                    #if (EMITTER_TYPE==0)\n                        vec3 dir=normalize(vec3(rnd_ext(),rnd_ext(),rnd_ext()));\n                    #elif (EMITTER_TYPE==1)\n                        vec3 dir=normalize(direction.xyz+direction.w*vec3(rnd_ext(),rnd_ext(),rnd_ext()));\n                    #elif (EMITTER_TYPE==2)\n                        vec3 dir=normalize(direction.xyz+direction.w*vec3(rnd_ext(),rnd_ext(),rnd_ext()));\n                    #elif (EMITTER_TYPE==3)\n                        vec3 dir=normalize(vec3(rnd_ext(),rnd_ext(),rnd_ext()));\n                    #endif\n                   v.xyz=dir*emitSpeed*(1.0+emitVary*rnd_ext());\n\n                   v.w=1.0;\n\n\n                 }\n                 vec3 a=gravity;\n                 a=a+vec3(rnd_ext(),rnd_ext(),rnd_ext())*speedVary*v.xyz;\n\n                 //#if (USE_WIND==1)\n                 //a=a-edge(v.xyz,0.001)*0.5*pow(v.xyz-wind,2.0)*resistance*staticInfo.x*staticInfo.x;\n                 //#else\n\n\n\n                 //#endif\n\n                 v.xyz=v.xyz+a*deltaTime;\n                 v.xyz=v.xyz*(1.0-resistance*resistance);\n\n                 gl_FragColor=v;\n             }\n    ", this.emitterType = d.EmitterType.point, this.totalTime = b, this.attributes = [{
                            name: "position",
                            size: 2
                        }], this.uniforms = [{
                            name: "velocityTexture",
                            type: "1i",
                            value: 0
                        }, {
                            name: "staticTexture",
                            type: "1i",
                            value: 1
                        }, {
                            name: "emitSpeed",
                            type: "1f",
                            value: 1
                        }, {
                            name: "emitVary",
                            type: "1f",
                            value: 1
                        }, {
                            name: "emitPercent",
                            type: "1f",
                            value: 1
                        }, {
                            name: "speedVary",
                            type: "1f",
                            value: 1
                        }, {
                            name: "resistance",
                            type: "1f",
                            value: 1
                        }, {
                            name: "currentTime",
                            type: "1f",
                            value: 0
                        }, {
                            name: "deltaTime",
                            type: "1f",
                            value: 0
                        }, {
                            name: "gravity",
                            type: "3fv",
                            value: [1, 1, 1]
                        }, {
                            name: "wind",
                            type: "3fv",
                            value: [0, 0, 0]
                        }], this.enableBlend = !1, this.enableDepthTest = !1, this.enableDepthWrite = !1, this.init()
                    }
                    return f(b, a), b.prototype.init = function() {
                        this.initProgram(this.vst, this.fst, {
                            EMITTER_TYPE: this.emitterType,
                            totalTime: this.totalTime,
                            USE_WIND: 0
                        })
                    }, b
                }(c.Material), a("VelocityMaterial", e)
            }
        }
    }), a.register("b", ["8", "6"], function(a, b) {
        "use strict";
        var c, d, e, f = (b && b.id, this && this.__extends || function(a, b) {
            function c() {
                this.constructor = a
            }
            for (var d in b) b.hasOwnProperty(d) && (a[d] = b[d]);
            a.prototype = null === b ? Object.create(b) : (c.prototype = b.prototype, new c)
        });
        return {
            setters: [function(a) {
                c = a
            }, function(a) {
                d = a
            }],
            execute: function() {
                e = function(a) {
                    function b(b, c, d, e, f, g) {
                        void 0 === d && (d = 0), void 0 === e && (e = 0), void 0 === f && (f = 0), void 0 === g && (g = null), a.call(this), this.particleType = d, this.vst = "\n        //#define PARTICLE_TYPE 0\n        //#define totalTime 10.0\n        /*#define PARTICLE_TYPE\n            0:pointSprite;\n            1:rectangle;\n            2:cube\n        */\n\n        //#define USE_TEXTURE 0\n\n\n\n        attribute vec2 uv;\n        uniform float currentTime;\n\n\n        uniform sampler2D positionTexture;\n        uniform sampler2D staticTexture;\n\n\n        uniform mat4 mvpMat;\n\n        varying float opacity;\n        // 范围 0-10\n        uniform float fade;\n\n        #if (USE_TEXTURE==0)\n            varying vec4 vcolor;\n        #endif\n\n        #if (PARTICLE_TYPE==0)\n            uniform float pointScale;\n        #else\n            attribute vec2 uvCoord;\n            uniform float rotateSpeed;\n            varying vec2 vUvCoord;\n        #endif\n        float lastRand=0.0;\n         float rnd(){\n                lastRand=fract(11035.15245*lastRand+0.12345);\n                return lastRand;\n         }\n         float rnd_ext(){\n                return 2.0*rnd()-1.0;\n         }\n         mat4 rotationMatrix(vec3 axis, float angle){\n            axis = normalize(axis);\n            float s = sin(angle);\n            float c = cos(angle);\n            float oc = 1.0 - c;\n            return mat4(oc * axis.x * axis.x + c,           oc * axis.x * axis.y - axis.z * s,  oc * axis.z * axis.x + axis.y * s,  0.0,\n            oc * axis.x * axis.y + axis.z * s,  oc * axis.y * axis.y + c,           oc * axis.y * axis.z - axis.x * s,  0.0,\n            oc * axis.z * axis.x - axis.y * s,  oc * axis.y * axis.z + axis.x * s,  oc * axis.z * axis.z + c,           0.0,\n            0.0,                                0.0,                                0.0,                                1.0);   }\n        void main() {\n            vec4 position=texture2D(positionTexture,uv);\n\n            vec4 staticInfo=texture2D(staticTexture,uv);\n            float particleTime=mod(currentTime-staticInfo.z,totalTime);\n            if(particleTime>=staticInfo.w||position.w==0.0){\n                    gl_Position=vec4(5.0,5.0,5.0,0.0);\n                    return;\n                  }\n            gl_Position=mvpMat*position;\n            #if (PARTICLE_TYPE==0)\n                #if (SIMPLE_PARTICLE==0)\n                     gl_PointSize=clamp(staticInfo.x/(gl_Position.z)*pointScale,1.0,50.0)*P;\n                     //gl_PointSize=sqrt(staticInfo.x/gl_Position.z);\n                #else\n                     gl_PointSize=1.0*P;\n                #endif\n            #else\n\n                lastRand=particleTime;\n                vec3 rotateDir=normalize(vec3(rnd_ext(),rnd_ext(),rnd_ext()));\n                position=position*rotationMatrix(rotateDir,particleTime*rotateSpeed);\n                vUvCoord=uvCoord;\n\n            #endif\n\n            #if (USE_TEXTURE==0)\n                vcolor=vec4(1.0,1.0,1.0,1.0);\n            #endif\n            float timeRatio=particleTime/staticInfo.w;\n            opacity=mix(pow(timeRatio,0.1*fade),pow(1.0-timeRatio,0.1*fade),timeRatio);\n            opacity=opacity/pow(gl_PointSize,0.08);\n\n        }", this.fst = "\n        precision mediump float;\n\n        varying float opacity;\n        uniform float feather;\n        uniform float alpha;\n        uniform vec3 color;\n        #if (PARTICLE_TYPE==0)\n\n        #else\n            varying vec2 vUvCoord;\n        #endif\n\n        #if (USE_TEXTURE==0)\n            varying vec4 vcolor;\n        #else\n            uniform sampler2D particleTexture;\n        #endif\n\n        void main() {\n        #if (PARTICLE_TYPE==0)\n            vec2 uv=gl_PointCoord;\n        #else\n            vec2 uv=vUvCoord;\n        #endif\n\n        #if (USE_TEXTURE==0)\n            vec4 out_color=vcolor;\n        #else\n            vec4 out_color=texture2D(particleTexture,vUvCoord);\n        #endif\n        #if (SIMPLE_PARTICLE==0)\n            float fopacity=max(0.0,1.0-2.0*distance(uv,vec2(0.5,0.5)));\n            //float fopacity=1.0-step(0.5,distance(uv,vec2(0.5,0.5)));\n            gl_FragColor=vec4(out_color.xyz,fopacity*opacity*out_color[3]*fopacity*alpha);\n        #else\n            gl_FragColor=out_color;\n        #endif\n            gl_FragColor.xyz=gl_FragColor.xyz*color;\n        }\n    ", this._simpleParticle = 0, this._useTexture = 0, this.needUpdate = !0, this.pointScale = 1, this.fade = 1, this.alpha = 1, this.enableBlend = !0, this.enableDepthTest = !1, this.enableDepthWrite = !1, this.totalTime = b, this.simpleParticle = e, this.useTexture = f, this.attributes = [{
                            name: "uv",
                            size: 2
                        }], this.particleType > 0 && this.attributes.push({
                            name: "uvCoord",
                            size: 2
                        }), this.uniforms = [{
                            name: "currentTime",
                            type: "1f",
                            value: 0
                        }, {
                            name: "positionTexture",
                            type: "1i",
                            value: 0
                        }, {
                            name: "staticTexture",
                            type: "1i",
                            value: 1
                        }, {
                            name: "feather",
                            type: "1f",
                            value: 0
                        }, {
                            name: "pointScale",
                            type: "1f",
                            value: 1
                        }, {
                            name: "fade",
                            type: "1f",
                            value: 8
                        }, {
                            name: "alpha",
                            type: "1f",
                            value: 8
                        }, {
                            name: "color",
                            type: "3fv",
                            value: [1, 1, 1]
                        }], this.init()
                    }
                    return f(b, a), Object.defineProperty(b.prototype, "simpleParticle", {
                        set: function(a) {
                            this._simpleParticle = a, this.needUpdate = !0
                        },
                        enumerable: !0,
                        configurable: !0
                    }), Object.defineProperty(b.prototype, "useTexture", {
                        set: function(a) {
                            this._useTexture = a, this.needUpdate = !0
                        },
                        enumerable: !0,
                        configurable: !0
                    }), b.prototype.init = function() {
                        a.prototype.initProgram.call(this, this.vst, this.fst, {
                            totalTime: this.totalTime,
                            PARTICLE_TYPE: this.particleType,
                            SIMPLE_PARTICLE: this._simpleParticle ? 1 : 0,
                            USE_TEXTURE: this._useTexture,
                            P: d.render.p.toPrecision(5)
                        }), this.needUpdate = !1
                    }, b.prototype.active = function(b) {
                        this.needUpdate && this.init(), a.prototype.active.call(this, b)
                    }, b
                }(c.Material), a("ParticleMaterial", e)
            }
        }
    }), a.register("9", ["c", "d", "6", "5", "7", "a", "b"], function(a, b) {
        "use strict";
        var c, d, e, f, g, h, i, j, k, l, m = (b && b.id, this && this.__extends || function(a, b) {
            function c() {
                this.constructor = a
            }
            for (var d in b) b.hasOwnProperty(d) && (a[d] = b[d]);
            a.prototype = null === b ? Object.create(b) : (c.prototype = b.prototype, new c)
        });
        return {
            setters: [function(a) {
                c = a
            }, function(a) {
                d = a
            }, function(a) {
                e = a
            }, function(a) {
                f = a
            }, function(a) {
                g = a
            }, function(a) {
                h = a
            }, function(a) {
                i = a
            }],
            execute: function() {
                ! function(a) {
                    a[a.point = 0] = "point", a[a.rectangle = 1] = "rectangle"
                }(j || (j = {})), a("ParticleType", j),
                    function(a) {
                        a[a.point = 0] = "point", a[a.directional = 1] = "directional", a[a.plane = 2] = "plane", a[a.volume_cube = 3] = "volume_cube", a[a.volume_Sphere = 4] = "volume_Sphere"
                    }(k || (k = {})), a("EmitterType", k), l = function(a) {
                        function b(b, c) {
                            var f = c.emitSpeed,
                                g = void 0 === f ? 1 : f,
                                h = c.size,
                                i = void 0 === h ? 10 : h,
                                l = c.life,
                                m = void 0 === l ? 10 : l,
                                n = c.lifeVary,
                                o = void 0 === n ? .1 : n,
                                p = c.sizeVary,
                                q = void 0 === p ? .1 : p,
                                r = (c.sizeLevel, c.particleType),
                                s = (void 0 === r ? j.point : r, c.useTexture, c.emitterType),
                                t = void 0 === s ? k.point : s,
                                u = (c.useWind, c.gravity),
                                v = void 0 === u ? [0, -1, 0] : u,
                                w = c.speedVary,
                                x = void 0 === w ? 10 : w,
                                y = c.simpleParticle,
                                z = void 0 !== y && y,
                                A = c.feather,
                                B = void 0 === A ? 0 : A,
                                C = c.resistance,
                                D = void 0 === C ? 0 : C,
                                E = c.pointScale,
                                F = void 0 === E ? 1 : E,
                                G = c.fade,
                                H = void 0 === G ? 1 : G,
                                I = c.enabled,
                                J = void 0 === I || I,
                                K = c.color,
                                L = void 0 === K ? [1, 1, 1] : K;
                            if (a.call(this), this.enabled = !0, this.support = !1, this.emitColor = [1, 1, 1, 1], this.particleType = 0, this.particleProperty = {
                                    size: 10,
                                    sizeVary: .1,
                                    life: 10,
                                    lifeVary: .1,
                                    speedVary: .01
                                }, this.emitVary = 0, this.emitSpeed = 1, this.emitPercent = 1, this.resistance = 0, this.wind = d.vec3.create(), this.emitPosition = d.vec3.create(), this.pointScale = 1, this.emitterSize = [2, 2, 2], this.fade = 1, this.opacity = 1, this.lastTime = 0, this.startTime = 0, this.enabled = J, J) {
                                if (this.gl = e.render.gl, !this.gl.HALF_FLOAT) return this.support = !1, this;
                                this.support = !0, this.maxCountSqrt = Math.pow(2, i), this.maxCount = Math.pow(this.maxCountSqrt, 2), this.totalTime = b ? this.maxCount / b : Math.pow(2, 64), this.particleProperty.size = i, this.particleProperty.sizeVary = q, this.particleProperty.life = m, this.particleProperty.lifeVary = o, this.particleProperty.speedVary = x, this.emitSpeed = g, this.gravity = v, this.particlePerSec = b, this.simpleParticle = z, this.feather = B, this.emitterType = t, this.pointScale = F, this.fade = H, this.init(), this.resistance = D, this.color = L
                            }
                        }
                        return m(b, a), b.prototype.init = function() {
                            this.gl.activeTexture(this.gl.TEXTURE0), this.positionFB = new f.FrameBuffer(this.maxCountSqrt, this.maxCountSqrt, "HALF_FLOAT"), this.positionBufferedFB = new f.FrameBuffer(this.maxCountSqrt, this.maxCountSqrt, "HALF_FLOAT"), this.velocityFB = new f.FrameBuffer(this.maxCountSqrt, this.maxCountSqrt, "HALF_FLOAT"), this.velocityBufferedFB = new f.FrameBuffer(this.maxCountSqrt, this.maxCountSqrt, "HALF_FLOAT"), e.render.currentGlTexture[0] = null;
                            for (var a = new Float32Array(4 * this.maxCount), b = this.particleProperty.size * e.render.p, c = this.particleProperty.sizeVary, d = (this.maxCount / this.particlePerSec, this.particleProperty.life), j = this.particleProperty.lifeVary, k = 0; k < this.maxCount; k++) a[4 * k] = b * (1 + c * (2 * Math.random() - 1)), a[4 * k + 1] = Math.random(), a[4 * k + 2] = k / this.maxCount * this.totalTime, a[4 * k + 3] = d * (1 + j * (2 * Math.random() - 1));
                            this.staticInfoTexture = this.gl.createTexture(), this.gl.bindTexture(this.gl.TEXTURE_2D, this.staticInfoTexture), this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MIN_FILTER, this.gl.NEAREST), this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MAG_FILTER, this.gl.NEAREST), this.gl.texImage2D(this.gl.TEXTURE_2D, 0, this.gl.RGBA, this.maxCountSqrt, this.maxCountSqrt, 0, this.gl.RGBA, this.gl.FLOAT, a), this.positionMaterial = new g.PositionMaterial(this.totalTime, this.emitterType), this.positionMaterial.bufferData("position", new Float32Array([-1, -1, 1, -1, 1, 1, -1, -1, 1, 1, -1, 1])), this.positionMaterial.textures = [this.positionBufferedFB.texture, this.velocityFB.texture, this.staticInfoTexture], this.velocityMaterial = new h.VelocityMaterial(this.totalTime), this.velocityMaterial.bufferData("position", new Float32Array([-1, -1, 1, -1, 1, 1, -1, -1, 1, 1, -1, 1])), this.velocityMaterial.textures = [this.velocityBufferedFB.texture, this.staticInfoTexture];
                            var l, m;
                            switch (this.particleType) {
                                case 0:
                                    l = 2, m = new Uint16Array(this.maxCount);
                                    for (var k = 0; k < this.maxCount; k++) m[k] = k;
                                    break;
                                case 1:
                                    l = 8
                            }
                            for (var n = new Float32Array(2 * this.maxCount), o = 1 / this.maxCountSqrt, p = 0; p < this.maxCountSqrt; p++)
                                for (var q = 0; q < this.maxCountSqrt; q++) {
                                    var r = 2 * (this.maxCountSqrt * q + p);
                                    n[r] = p * o, n[r + 1] = q * o
                                }
                            this.particleMaterial = new i.ParticleMaterial(this.totalTime, this.particleType, this.particleType, this.simpleParticle, 0), this.particleMaterial.bufferData("uv", n), this.particleMaterial.bufferIBO(m), this.particleMaterial.textures = [this.positionFB.texture, this.staticInfoTexture], this.particleMaterial.mvpMat = this.mvpMat
                        }, b.prototype.updatePositionTexture = function(a, b) {
                            this.positionMaterial.deltaTime = a, this.positionMaterial.currentTime = b, this.positionMaterial.emitterPosition = this.emitPosition, this.positionMaterial.emitterSize = this.emitterSize, c = [this.positionBufferedFB, this.positionFB], this.positionFB = c[0], this.positionBufferedFB = c[1], this.positionMaterial.textures[0] = this.positionBufferedFB.texture, this.positionMaterial.textures[1] = this.velocityFB.texture, this.positionMaterial.active(), this.positionFB.use(), this.gl.drawArrays(this.gl.TRIANGLES, 0, 6), this.positionFB.release();
                            var c
                        }, b.prototype.updateVelocityTexture = function(a, b) {
                            this.velocityMaterial.deltaTime = a, this.velocityMaterial.currentTime = b, this.velocityMaterial.emitSpeed = this.emitSpeed, this.velocityMaterial.gravity = this.gravity, this.velocityMaterial.emitPercent = this.emitPercent, this.velocityMaterial.emitVary = this.emitVary, this.velocityMaterial.wind = this.wind, this.velocityMaterial.resistance = this.resistance, this.velocityMaterial.speedVary = this.particleProperty.speedVary, c = [this.velocityBufferedFB, this.velocityFB], this.velocityFB = c[0], this.velocityBufferedFB = c[1], this.velocityMaterial.textures[0] = this.velocityBufferedFB.texture, this.velocityMaterial.active(), this.velocityFB.use(), this.gl.drawArrays(this.gl.TRIANGLES, 0, 6), this.velocityFB.release();
                            var c
                        }, b.prototype.drawParticle = function(a, b) {
                            this.particleMaterial.currentTime = b, this.particleMaterial.feather = this.feather, this.particleMaterial.pointScale = this.pointScale, this.particleMaterial.fade = this.fade, this.particleMaterial.alpha = this.opacity, this.particleMaterial.color = this.color, this.particleMaterial.active(), this.gl.drawElements(this.gl.POINTS, this.maxCount, this.gl.UNSIGNED_SHORT, 0)
                        }, b.prototype.update = function() {
                            if (this.support && this.enabled) {
                                a.prototype.update.call(this);
                                var b = .001 * Date.now();
                                this.startTime || (this.startTime = b), b -= this.startTime;
                                var c;
                                c = this.lastTime ? b - this.lastTime : 0, this.lastTime = b, this.updateVelocityTexture(c, b), this.updatePositionTexture(c, b), this.drawParticle(c, b)
                            }
                        }, b
                    }(c.Object3D), a("GpuParticleSystem", l)
            }
        }
    }), a.register("e", ["9", "f"], function(a, b) {
        "use strict";

        function c() {
            a("particleSystem", f = new d.GpuParticleSystem(200, e.Settings.loadingParticleSystem)), f.resistance = .05
        }
        var d, e, f;
        b && b.id;
        return a("init", c), {
            setters: [function(a) {
                d = a
            }, function(a) {
                e = a
            }],
            execute: function() {}
        }
    }), a.register("10", [], function(a, b) {
        "use strict";

        function c() {
            0 == g && (window.ondevicemotion = d), g++
        }

        function d(a) {
            var b = a.accelerationIncludingGravity;
            switch (window.orientation) {
                case 180:
                    f[0] = .1 * -b.x, f[1] = .1 * -b.y;
                    break;
                case 0:
                    f[0] = .1 * b.x, f[1] = .1 * b.y;
                    break;
                case 90:
                    f[0] = .1 * -b.y, f[1] = .1 * b.x;
                    break;
                case -90:
                    f[0] = .1 * b.y, f[1] = .1 * -b.x
            }
            f[2] = .1 * b.z
        }

        function e() {
            g--, 0 == g && (window.ondevicemotion = null)
        }
        var f, g;
        b && b.id;
        return a("start", c), a("stop", e), {
            setters: [],
            execute: function() {
                a("gravity", f = [0, -1, 0]), g = 0
            }
        }
    }), a.register("11", ["6", "12", "13", "14", "e", "10", "f"], function(a, b) {
        "use strict";

        function c() {
            k.init(), r = m.Settings.loadingPromotion, n = new h.SpriteBatchNode, o = new i.TextSprite(500, 200, "加载中..", 50), p = new i.TextSprite(100, 50, "0%", 30), p.y = -.2, o.opacity = 0, j.Tween(o, "opacity").translateTo(1, 500).translateTo(0, 500).then(d), n.appendChild(o), n.appendChild(p), g.render.appendChild(n), l.start(), k.particleSystem.gravity = l.gravity, g.render.appendChild(k.particleSystem)
        }

        function d() {
            q || (o.text = r[Math.floor(r.length * Math.random())], j.Tween(o, "opacity").translateTo(1, 500).delay(2e3).translateTo(0, 500).then(d))
        }

        function e(a) {
            isNaN(a) || (p.text = "" + Math.floor(100 * a) + "%")
        }

        function f() {
            return q = !0, n.removeChild(p), o.text = "即将开始", new Promise(function(a) {
                j.Tween(o, "opacity").end(), j.Tween(k.particleSystem, "opacity").delay(1500).translateTo(0, 500),
                    j.Tween(o, "opacity").translateTo(1, 500).delay(1e3).translateTo(0, 500).then(function() {
                        n.destroy(), g.render.removeChild(n), g.render.removeChild(k.particleSystem), l.stop(), a()
                    })
            })
        }
        var g, h, i, j, k, l, m, n, o, p, q, r;
        b && b.id;
        return a("start", c), a("progress", e), a("stop", f), {
            setters: [function(a) {
                g = a
            }, function(a) {
                h = a
            }, function(a) {
                i = a
            }, function(a) {
                j = a
            }, function(a) {
                k = a
            }, function(a) {
                l = a
            }, function(a) {
                m = a
            }],
            execute: function() {
                q = !1, r = null
            }
        }
    }), a.register("13", ["15", "16", "17"], function(a, b) {
        "use strict";
        var c, d, e, f, g, h = (b && b.id, this && this.__extends || function(a, b) {
            function c() {
                this.constructor = a
            }
            for (var d in b) b.hasOwnProperty(d) && (a[d] = b[d]);
            a.prototype = null === b ? Object.create(b) : (c.prototype = b.prototype, new c)
        });
        return {
            setters: [function(a) {
                c = a
            }, function(a) {
                d = a
            }, function(a) {
                e = a
            }],
            execute: function() {
                f = function(a) {
                    function b(b, d) {
                        a.call(this), this.name = "canvas", this.resetSize(b, d), this.texture = c.GlTexture.getTexture(this.canvas)
                    }
                    return h(b, a), b.prototype.resetSize = function(a, b) {
                        this.width = a, this.height = b, this.canvas = document.createElement("canvas"), this.canvas.width = a, this.canvas.height = b
                    }, b
                }(e.ObjectBase), g = function(a) {
                    function b(b, c, d, e) {
                        void 0 === e && (e = 15), a.call(this, new f(b, c), 0, 0, null, null, {}), this.needUpdate = !0, this._textContent = "", this.canvasItem = this.resource, this.canvas = this.canvasItem.canvas.getContext("2d"), this.canvas.textAlign = "center", this.canvas.textBaseline = "middle;", this.textColor = "#FFFFFF", this.shadowColor = "#000000", this.fontSize = e, this.fontType = 'SimHei, "Microsoft YaHei", Arial, Helvetica, sans-serif', this.shadowBlur = 0, this.text = d || ""
                    }
                    return h(b, a), Object.defineProperty(b.prototype, "fontType", {
                        set: function(a) {
                            this._fontType = a, this.canvas.font = this._fontSize + "px " + this._fontType, this.needUpdate = !0
                        },
                        enumerable: !0,
                        configurable: !0
                    }), Object.defineProperty(b.prototype, "fontSize", {
                        set: function(a) {
                            this._fontSize = a, this.canvas.font = this._fontSize + "px " + this._fontType, this.needUpdate = !0
                        },
                        enumerable: !0,
                        configurable: !0
                    }), Object.defineProperty(b.prototype, "textColor", {
                        set: function(a) {
                            this.canvas.fillStyle = a, this.needUpdate = !0
                        },
                        enumerable: !0,
                        configurable: !0
                    }), Object.defineProperty(b.prototype, "shadowColor", {
                        set: function(a) {
                            this.canvas.shadowColor = a, this.needUpdate = !0
                        },
                        enumerable: !0,
                        configurable: !0
                    }), Object.defineProperty(b.prototype, "shadowBlur", {
                        set: function(a) {
                            this.canvas.shadowBlur = a, this.needUpdate = !0
                        },
                        enumerable: !0,
                        configurable: !0
                    }), Object.defineProperty(b.prototype, "shadowOffset", {
                        set: function(a) {
                            this.canvas.shadowOffsetX = a[0], this.canvas.shadowOffsetY = a[1], this.needUpdate = !0
                        },
                        enumerable: !0,
                        configurable: !0
                    }), Object.defineProperty(b.prototype, "text", {
                        set: function(a) {
                            this._textContent = a, this.needUpdate = !0
                        },
                        enumerable: !0,
                        configurable: !0
                    }), b.prototype.update = function() {
                        this.needUpdate && (this.canvas.clearRect(0, 0, this.canvasItem.width, this.canvasItem.height), this.canvas.fillText(this._textContent, this.canvasItem.width / 2, this.canvasItem.height / 2), this.canvasItem.texture.update(), this.needUpdate = !1), a.prototype.update.call(this)
                    }, b
                }(d.Sprite), a("TextSprite", g)
            }
        }
    }), a.register("18", ["19", "14", "13", "f", "6", "16", "12", "1"], function(a, b) {
        "use strict";

        function c() {
            d.combo.opacity = 0;
            var a = new f.TextSprite(200, 60, d.stat.perfect || "0", 40),
                b = new f.TextSprite(200, 60, d.stat.great || "0", 40),
                c = new f.TextSprite(200, 60, d.stat.good || "0", 40),
                l = new f.TextSprite(200, 60, d.stat.bad || "0", 40),
                m = new f.TextSprite(200, 60, d.stat.miss || "0", 40),
                n = h.resourceCtl.getItem("uiAssets"),
                o = new i.Sprite(n, g.Settings.rankInitialState.x, g.Settings.rankInitialState.y, null, null, g.Settings.sprites.perfect);
            o.x = 0, o.opacity = 1, o.y = .5 * o.h;
            var p = new i.Sprite(null, null, null, 1, 1, {});
            a.y = -.5 * a.h, p.appendChildren([a, o]);
            var q = new i.Sprite(n, g.Settings.rankInitialState.x, g.Settings.rankInitialState.y, null, null, g.Settings.sprites.great);
            q.x = 0, q.y = .5 * q.h, q.opacity = 1;
            var r = new i.Sprite(null, null, null, 1, 1, {});
            b.y = -.5 * b.h, r.appendChildren([b, q]);
            var s = new i.Sprite(n, g.Settings.rankInitialState.x, g.Settings.rankInitialState.y, null, null, g.Settings.sprites.good);
            s.x = 0, s.y = .5 * s.h, s.opacity = 1;
            var t = new i.Sprite(null, null, null, 1, 1, {});
            c.y = -.5 * c.h, t.appendChildren([c, s]);
            var u = new i.Sprite(n, g.Settings.rankInitialState.x, g.Settings.rankInitialState.y, null, null, g.Settings.sprites.bad);
            u.x = 0, u.y = .5 * u.h, u.opacity = 1;
            var v = new i.Sprite(null, null, null, 1, 1, {});
            l.y = -.5 * l.h, v.appendChildren([l, u]);
            var w = new i.Sprite(n, g.Settings.rankInitialState.x, g.Settings.rankInitialState.y, null, null, g.Settings.sprites.miss);
            w.x = 0, w.y = .5 * w.h, w.opacity = 1;
            var x = new i.Sprite(null, null, null, 1, 1, {});
            m.y = -.5 * m.h, x.appendChildren([m, w]);
            var y = d.stat.getFinalResult(),
                z = new j.SpriteBatchNode;
            z.appendChildren([p, r, t, v, x]), h.render.appendChild(z), e.Tween(d.score).playAction(g.Settings.resultScoreAction), e.Tween(d.score, "number").translateTo(y, 1e3), e.Tween(p).playAction(g.Settings.resultRankCountActions.perfect), e.Tween(r).playAction(g.Settings.resultRankCountActions.great), e.Tween(t).playAction(g.Settings.resultRankCountActions.good), e.Tween(v).playAction(g.Settings.resultRankCountActions.bad), e.Tween(x).playAction(g.Settings.resultRankCountActions.miss);
            var A = new f.TextSprite(800, 40, "MAX COMBO:" + d.stat.maxCombo + " TOTAL NOTES:" + d.stat.count + " LATENCY:" + d.stat.getLatencyStat().toPrecision(2) + "ms OFFSET:" + d.stat.getOffsetStat().toPrecision(2) + "ms");
            A.shadowColor = "#000000", A.shadowBlur = 3, A.y = -.4, z.appendChild(A), e.Tween(A).playAction(g.Settings.resultRankCountActions.technical), e.Tween(k.bgLayer, "opacity").translateTo(.3, "500");
            var B = new f.TextSprite(600, 80, "Touch to Restart", 50);
            B.y = -.7, z.appendChild(B), e.Tween(B, "opacity").set(0).delay(1500).translateTo(1, 500).then(function() {
                h.touchCtl.addEventListener("touchend", function() {
                    return location.reload()
                })
            });
            var C = new f.TextSprite(500, 50, k.title, 20);
            C.x = -.8, C.y = .7, z.appendChild(C)
        }
        var d, e, f, g, h, i, j, k;
        b && b.id;
        return a("showResult", c), {
            setters: [function(a) {
                d = a
            }, function(a) {
                e = a
            }, function(a) {
                f = a
            }, function(a) {
                g = a
            }, function(a) {
                h = a
            }, function(a) {
                i = a
            }, function(a) {
                j = a
            }, function(a) {
                k = a
            }],
            execute: function() {}
        }
    }), a.register("1a", ["17", "d"], function(a, b) {
        "use strict";
        var c, d, e, f = (b && b.id, this && this.__extends || function(a, b) {
            function c() {
                this.constructor = a
            }
            for (var d in b) b.hasOwnProperty(d) && (a[d] = b[d]);
            a.prototype = null === b ? Object.create(b) : (c.prototype = b.prototype, new c)
        });
        return {
            setters: [function(a) {
                c = a
            }, function(a) {
                d = a
            }],
            execute: function() {
                e = function(a) {
                    function b(b, c, e, f, g, h, i, j, k) {
                        void 0 === c && (c = 0), void 0 === e && (e = 0), void 0 === f && (f = 0), void 0 === g && (g = 0), void 0 === h && (h = d.vec2.create()), void 0 === i && (i = d.vec2.create()), void 0 === j && (j = d.vec2.create()), void 0 === k && (k = d.vec2.create()), a.call(this), this.sx = c, this.sy = e, this.sw = f, this.sh = g, this.p0 = h, this.p1 = i, this.p2 = j, this.p3 = k, this.opacity = 1, this.zIndex = 0, this.rp0 = d.vec2.create(), this.rp1 = d.vec2.create(), this.rp2 = d.vec2.create(), this.rp3 = d.vec2.create(), this.texture = b.texture, this.sx = this.sx / b.width, this.sy = this.sy / b.height, this.sw = this.sw ? this.sw / b.width : 1, this.sh = this.sh ? this.sh / b.height : 1
                    }
                    return f(b, a), b.prototype.setNewChild = function() {}, b.prototype.appendChild = function(a) {}, b.prototype.update = function() {
                        var b = this.parent,
                            c = (this.parent.rOpacity || this.parent.opacity) * this.opacity;
                        if (0 != c) {
                            this.isRootSprite ? (this.rp0[0] = this.p0[0], this.rp0[1] = this.p0[1], this.rp1[0] = this.p1[0], this.rp1[1] = this.p1[1], this.rp2[0] = this.p2[0], this.rp2[1] = this.p2[1], this.rp3[0] = this.p3[0], this.rp3[1] = this.p3[1]) : (this.rp0[0] = this.p0[0] * b.rw + b.rx, this.rp0[1] = this.p0[1] * b.rh + b.ry, this.rp1[0] = this.p1[0] * b.rw + b.rx, this.rp1[1] = this.p1[1] * b.rh + b.ry, this.rp2[0] = this.p2[0] * b.rw + b.rx, this.rp2[1] = this.p2[1] * b.rh + b.ry, this.rp3[0] = this.p3[0] * b.rw + b.rx, this.rp3[1] = this.p3[1] * b.rh + b.ry), a.prototype.update.call(this, null), this.batchNode.currentTexture != (this.texture.bufferTex || this.texture) && (this.batchNode.drawBuffer(), this.batchNode.currentTexture = this.texture.bufferTex || this.texture);
                            var d = this.batchNode.posBuffer,
                                e = this.batchNode.uvBuffer,
                                f = this.batchNode.opacityBuffer,
                                g = 2 * this.batchNode.updateCursor,
                                h = 3 * this.batchNode.updateCursor,
                                i = this.batchNode.enableZPosition ? this.zIndex : 0,
                                j = this.texture.sx + this.sx * this.texture.sw,
                                k = this.texture.sy + this.sy * this.texture.sh,
                                l = this.texture.sw * this.sw,
                                m = this.texture.sh * this.sh;
                            d[h++] = this.rp0[0], e[g++] = j, d[h++] = this.rp0[1], e[g++] = k, d[h++] = i, d[h++] = this.rp2[0], e[g++] = j, d[h++] = this.rp2[1], e[g++] = k + m, d[h++] = i, d[h++] = this.rp1[0], e[g++] = j + l, d[h++] = this.rp1[1], e[g++] = k, d[h++] = i, d[h++] = this.rp3[0], e[g++] = j + l, d[h++] = this.rp3[1], e[g++] = k + m, d[h++] = i;
                            var n = this.batchNode.updateCursor;
                            f[n++] = f[n++] = f[n++] = f[n++] = c, this.batchNode.updateCursor += 4
                        }
                    }, b.prototype.serialize = function() {}, b
                }(c.NodeBase), a("QuadrangleSprite", e)
            }
        }
    }), a.register("1b", ["6", "1", "16", "14", "1a", "f"], function(a, b) {
        "use strict";

        function c(a) {
            if (void 0 === a && (a = !1), j.length > 0) {
                var b = j.pop();
                return b.opacity = 1, b.parallel = a, b.long = !1, b.tail = !1, b.note = !0, b
            }
            var c = d.resourceCtl.getItem("uiAssets"),
                g = new k(null, 0, 0, 1, 1, {}),
                l = new f.Sprite(c, 0, 0, 1, 1, i.Settings.sprites.noteSpr),
                m = new f.Sprite(c, 0, 0, 1, i.Settings.sprites.parallelSpr.sh / i.Settings.sprites.parallelSpr.sw, i.Settings.sprites.parallelSpr),
                n = new f.Sprite(c, 0, 0, 1, 1, i.Settings.sprites.tailSpr),
                o = new h.QuadrangleSprite(c, i.Settings.sprites.longNoteSpr.sx, i.Settings.sprites.longNoteSpr.sy, i.Settings.sprites.longNoteSpr.sw, i.Settings.sprites.longNoteSpr.sh);
            return g.appendChild(m), g.appendChild(l), g.noteSpr = l, g.parallelSpr = m, g.tailSprite = n, g.longNoteSpr = o, g.parallel = a, g.opacity = 1, e.uiLayer.appendChild(o), e.uiLayer.appendChild(n), e.uiLayer.appendChild(g), g.long = !1, g.tail = !1, g
        }
        var d, e, f, g, h, i, j, k, l = (b && b.id, this && this.__extends || function(a, b) {
            function c() {
                this.constructor = a
            }
            for (var d in b) b.hasOwnProperty(d) && (a[d] = b[d]);
            a.prototype = null === b ? Object.create(b) : (c.prototype = b.prototype, new c)
        });
        return a("noteSpriteFactory", c), {
            setters: [function(a) {
                d = a
            }, function(a) {
                e = a
            }, function(a) {
                f = a
            }, function(a) {
                g = a
            }, function(a) {
                h = a
            }, function(a) {
                i = a
            }],
            execute: function() {
                j = [], k = function(a) {
                    function b() {
                        a.apply(this, arguments)
                    }
                    return l(b, a), Object.defineProperty(b.prototype, "parallel", {
                        set: function(a) {
                            this.parallelSpr.opacity = a ? 1 : 0
                        },
                        enumerable: !0,
                        configurable: !0
                    }), Object.defineProperty(b.prototype, "tail", {
                        set: function(a) {
                            this.tailSprite.opacity = a ? 1 : 0
                        },
                        enumerable: !0,
                        configurable: !0
                    }), Object.defineProperty(b.prototype, "long", {
                        set: function(a) {
                            this.longNoteSpr.opacity = a ? i.Settings.longNoteInitialState.opacity : 0
                        },
                        enumerable: !0,
                        configurable: !0
                    }), Object.defineProperty(b.prototype, "note", {
                        set: function(a) {
                            this.noteSpr.opacity = a ? 1 : 0
                        },
                        enumerable: !0,
                        configurable: !0
                    }), b.prototype.destroy = function() {
                        return j.push(this), this.opacity = 0, this.tail = !1, this.long = !1, this
                    }, b.prototype.clearLongNoteAnimation = function() {
                        return g.Tween(this.longNoteSpr).endAll(), this
                    }, b
                }(f.Sprite)
            }
        }
    }), a.register("1c", ["6", "1b", "19", "14", "f"], function(a, b) {
        "use strict";

        function c(a) {
            s = q.userSpeed || a.speed, r = a.lane, u = r.map(function(a) {
                return []
            });
            for (var b = 0; b < r.length; b++) w[b] = v[b] = 0;
            o.init(r.reduce(function(a, b) {
                return a + b.reduce(function(a, b) {
                    return a + (b.longnote ? 2 : 1)
                }, 0)
            }, 0)), t = !0, l.touchCtl.addEventListener("touchstart", f), l.touchCtl.addEventListener("touchend", g), l.keyboard.addEventListener("keydown", h), l.keyboard.addEventListener("keyup", i), l.eventBus.addEventListener("beforeupdate", function() {
                if (t)
                    for (var a = 1e3 * l.audioCtl.getBgmTime(), b = .37537, c = 0; c < r.length; c++) {
                        for (var d = r[c], e = u[c];;) {
                            if (0 == d.length) break;
                            if (d[0].starttime > a + 128e3 / s) break;
                            var f = d.shift();
                            f.sprite = m.noteSpriteFactory(f.parallel), f.longnote && (f.sprite.long = !0), f.holdCount = 0, e.push(f), v[c] = 0
                        }
                        for (;;) {
                            if (0 == e.length) break;
                            var g = e[0];
                            if (g.starttime > a - n.rankTiming.miss) break;
                            if (g.longnote && g.hold) {
                                if (!(g.endtime < a - n.rankTiming.miss)) break;
                                e.shift().sprite.clearLongNoteAnimation().destroy(), n.rank(null)
                            } else g.longnote && n.rank(null), e.shift().sprite.destroy(), n.rank(null)
                        }
                        for (var h = 0, i = e; h < i.length; h++) {
                            var j = i[h],
                                k = j.sprite,
                                o = Math.max(0, 1 - (j.starttime - a) / 128e3 * s);
                            k.w = k.h = b * o;
                            var p = y * o,
                                q = .125 * j.lane * Math.PI,
                                w = Math.cos(q),
                                z = Math.sin(q);
                            if (k.y = x - p * z, k.x = -p * w, j.longnote) {
                                var A = 1,
                                    B = Math.max(1 - (j.endtime - a) / 128e3 * s, 0),
                                    C = j.sprite.longNoteSpr,
                                    D = 0,
                                    E = 0;
                                j.hold ? (D = -y * w, E = x - y * z) : (A = o, D = k.x, E = k.y), C.p0[0] = D + b * A * z * .5, C.p0[1] = E - b * A * w * .5, C.p2[0] = D - b * A * z * .5, C.p2[1] = E + b * A * w * .5;
                                var F = x - y * B * z,
                                    G = -y * B * w;
                                if (C.p1[0] = G - b * B * z * .5, C.p1[1] = F + b * B * w * .5, C.p3[0] = G + b * B * z * .5, C.p3[1] = F - b * B * w * .5, B > 0) {
                                    var H = k.tailSprite;
                                    k.tail = !0, H.x = G, H.y = F, H.w = H.h = b * B
                                } else k.tail = !1
                            }
                        }
                    }
            })
        }

        function d() {
            a("running", z = !0)
        }

        function e() {
            a("running", z = !1)
        }

        function f(a) {
            if (z) {
                var b = a.x,
                    c = a.y;
                if (!(c > x + .37537)) {
                    var d = Math.sqrt(b * b + (x - c) * (x - c)),
                        e = Math.acos(-b / d),
                        f = Math.round(e / Math.PI * 8);
                    j(f)
                }
            }
        }

        function g(a) {
            if (z) {
                var b = a.x,
                    c = a.y;
                if (!(c > x + .37537)) {
                    var d = Math.sqrt(b * b + (x - c) * (x - c)),
                        e = Math.acos(-b / d),
                        f = Math.round(e / Math.PI * 8);
                    k(f)
                }
            }
        }

        function h(a) {
            A[a] > -1 && j(A[a])
        }

        function i(a) {
            A[a] > -1 && k(A[a])
        }

        function j(a) {
            if (v[a]++, !(v[a] > 1)) {
                var b = u[a][0];
                if (b) {
                    if (b.hold) return void b.holdCount++;
                    var c = 1e3 * l.audioCtl.getBgmTime() + q.delay,
                        d = c - b.starttime;
                    Math.abs(d) > n.rankTiming.miss || (n.rank(d, a), b.longnote ? (b.sprite.note = !1, b.sprite.parallel = !1, p.Tween(b.sprite.longNoteSpr).playAction(q.Settings.longNotePressAction), b.hold = !0, b.holdCount++) : u[a].shift().sprite.destroy())
                }
            }
        }

        function k(a) {
            if (v[a]--, v[a] = Math.max(0, v[a]), !(v[a] >= 1)) {
                var b = u[a][0];
                if (b) {
                    var c = 1e3 * l.audioCtl.getBgmTime() + q.delay,
                        d = c - b.endtime;
                    b.longnote && b.hold && (1 == b.holdCount ? (n.rank(d, a), u[a].shift().sprite.destroy().clearLongNoteAnimation()) : b.holdCount--)
                }
            }
        }
        var l, m, n, o, p, q, r, s, t, u, v, w, x, y, z, A;
        b && b.id;
        return a("init", c), a("enableTouch", d), a("disableTouch", e), {
            setters: [function(a) {
                l = a
            }, function(a) {
                m = a
            }, function(a) {
                n = a, o = a
            }, function(a) {
                p = a
            }, function(a) {
                q = a
            }],
            execute: function() {
                r = [], s = 160, t = !1, v = [], w = [], x = .501466, y = 1.246334, a("running", z = !1), A = {
                    a: 0,
                    s: 1,
                    d: 2,
                    f: 3,
                    " ": 4,
                    j: 5,
                    k: 6,
                    l: 7,
                    ";": 8
                }
            }
        }
    }), a.register("1d", ["8"], function(a, b) {
        "use strict";
        var c, d;
        b && b.id;
        return {
            setters: [function(a) {
                c = a
            }],
            execute: function() {
                a("CreateSpriteMaterial", d = function() {
                    var a = new c.Material;
                    a.uniforms = [{
                        name: "texture",
                        type: "1i",
                        value: 0
                    }], a.attributes = [{
                        name: "position",
                        size: 3
                    }, {
                        name: "uv",
                        size: 2
                    }, {
                        name: "opacity",
                        size: 1
                    }], a.autoBindAttrib = !1, a.enableBlend = !0, a.enableDepthTest = !0, a.enableDepthWrite = !0;
                    var b = "\n                attribute vec3 position;\n                attribute vec2 uv;\n                attribute float opacity;\n                uniform mat4 mvpMat;\n                varying float vOpacity;\n                varying vec2 uvCoord;\n                void main(){\n                    vec4 pos=vec4(position,1.0);\n                    gl_Position=mvpMat*pos;\n                    uvCoord=uv;\n                    vOpacity=opacity;\n                }\n            ",
                        d = "\n                precision lowp float;\n                varying vec2 uvCoord;\n                uniform sampler2D texture;\n                varying float vOpacity;\n                void main(){\n                    vec4 color=texture2D(texture,uvCoord);\n                    color[3]=color[3]*vOpacity;\n                    gl_FragColor=color;\n                }\n            ";
                    return a.initProgram(b, d), a
                })
            }
        }
    }), a.register("12", ["c", "1d"], function(a, b) {
        "use strict";
        var c, d, e, f = (b && b.id, this && this.__extends || function(a, b) {
            function c() {
                this.constructor = a
            }
            for (var d in b) b.hasOwnProperty(d) && (a[d] = b[d]);
            a.prototype = null === b ? Object.create(b) : (c.prototype = b.prototype, new c)
        });
        return {
            setters: [function(a) {
                c = a
            }, function(a) {
                d = a
            }],
            execute: function() {
                e = function(a) {
                    function b(b) {
                        void 0 === b && (b = 32), a.call(this), this.material = d.CreateSpriteMaterial(), this.opacity = 1, this.updateCursor = 0, this.enablePerspective = !1, this.enableZPosition = !1, this.needUpdate = !1, this.initBuffer(b)
                    }
                    return f(b, a), b.prototype.initBuffer = function(a) {
                        this.size = a, this.posBuffer = new Float32Array(12 * a), this.uvBuffer = new Float32Array(8 * a), this.opacityBuffer = new Float32Array(4 * a);
                        for (var b = new Uint16Array(6 * a), c = 0; c < a; c++) b[6 * c] = 4 * c, b[6 * c + 1] = 4 * c + 1, b[6 * c + 2] = 4 * c + 2, b[6 * c + 3] = 4 * c, b[6 * c + 4] = 4 * c + 2, b[6 * c + 5] = 4 * c + 3;
                        this.material.bufferIBO(b)
                    }, b.prototype.appendChild = function(b) {
                        b.batchNode = this, b.parent = this, b.setNewChild(), b.isRootSprite = !0, a.prototype.appendChild.call(this, b), this.needUpdate = !0
                    }, b.prototype.insertChild = function(b, c) {
                        b.batchNode = this, b.setNewChild(), b.isRootSprite = !0, a.prototype.insertChild.call(this, b, c), this.needUpdate = !0
                    }, b.prototype.removeChild = function(b) {
                        a.prototype.removeChild.call(this, b)
                    }, b.prototype.update = function() {
                        this.needUpdate && this.updateChildren(), a.prototype.update.call(this), this.material.active(), this.drawBuffer()
                    }, b.prototype.updateChildren = function() {
                        this.needUpdate = !1;
                        var a = this.getChildrenCount();
                        a < .5 * this.size && (this.size = Math.max(Math.pow(2, Math.ceil(Math.log(a) / Math.log(2))), 16), this.initBuffer(this.size)), a > this.size && (this.size = Math.pow(2, Math.ceil(Math.log(a) / Math.log(2))), this.initBuffer(this.size))
                    }, b.prototype.drawBuffer = function() {
                        if (0 != this.updateCursor) {
                            this.currentTexture.active(), this.material.bufferData("position", this.posBuffer, !0), this.material.bufferData("uv", this.uvBuffer, !0), this.material.bufferData("opacity", this.opacityBuffer, !0);
                            var a = this.material.gl;
                            a.drawElements(a.TRIANGLES, 1.5 * this.updateCursor, a.UNSIGNED_SHORT, 0), this.updateCursor = 0
                        }
                    }, b
                }(c.Object3D), a("SpriteBatchNode", e)
            }
        }
    }), a.register("1e", ["1f", "6", "17"], function(a, b) {
        "use strict";
        var c, d, e, f, g = (b && b.id, this && this.__extends || function(a, b) {
            function c() {
                this.constructor = a
            }
            for (var d in b) b.hasOwnProperty(d) && (a[d] = b[d]);
            a.prototype = null === b ? Object.create(b) : (c.prototype = b.prototype, new c)
        });
        return {
            setters: [function(a) {
                c = a
            }, function(a) {
                d = a
            }, function(a) {
                e = a
            }],
            execute: function() {
                f = function(a) {
                    function b(b, c, d, e) {
                        a.call(this), this.scale = 1, this.listenerCount = {}, this.zIndex = 0, this.rayCastColor = 0, this.hit = !1, f = [b, c, d, e], this.x = f[0], this.y = f[1], this.w = f[2], this.h = f[3];
                        var f
                    }
                    return g(b, a), b.prototype.addEventListener = function(b, e, f) {
                        return c.TouchEvents[b] && (d.touchCtl.addTouchItem(this, b), this.listenerCount[b] = this.listenerCount[b] ? this.listenerCount[b] + 1 : 1), a.prototype.addEventListener.call(this, b, e, f || !1)
                    }, b.prototype.addOneTimeListener = function(b, e) {
                        return c.TouchEvents[b] ? (d.touchCtl.addTouchItem(this, b), this.listenerCount[b] = this.listenerCount[b] ? this.listenerCount[b] + 1 : 1, a.prototype.addOneTimeListener.call(this, b, function() {
                            e(), this.listenerCount--, this.checkListeners()
                        }.bind(this))) : void a.prototype.addOneTimeListener.call(this, b, e)
                    }, b.prototype.checkListeners = function() {
                        for (var a in this.listenerCount) 0 == this.listenerCount[a] && d.touchCtl.removeTouchItem(this, a)
                    }, b.prototype.removeListenerById = function(b, d) {
                        a.prototype.removeListenerById.call(this, b, d), c.TouchEvents[b] && (this.listenerCount[b]--, this.checkListeners())
                    }, b.prototype.removeAllListeners = function() {
                        a.prototype.removeAllListeners.call(this);
                        for (var b in this.listenerCount) this.listenerCount[b] = 0;
                        this.checkListeners()
                    }, b.prototype.destroy = function() {
                        this.removeAllListeners(), a.prototype.destroy.call(this)
                    }, b
                }(e.NodeBase), a("TouchItem", f)
            }
        }
    }), a.register("16", ["6", "1e", "14"], function(a, b) {
        "use strict";
        var c, d, e, f, g = (b && b.id, this && this.__extends || function(a, b) {
            function c() {
                this.constructor = a
            }
            for (var d in b) b.hasOwnProperty(d) && (a[d] = b[d]);
            a.prototype = null === b ? Object.create(b) : (c.prototype = b.prototype, new c)
        });
        return {
            setters: [function(a) {
                c = a
            }, function(a) {
                d = a
            }, function(a) {
                e = a
            }],
            execute: function() {
                f = function(a) {
                    function b(b, d, f, g, h, i) {
                        var j = i.x,
                            k = void 0 === j ? 0 : j,
                            l = i.y,
                            m = void 0 === l ? 0 : l,
                            n = i.w,
                            o = void 0 === n ? null : n,
                            p = i.h,
                            q = void 0 === p ? null : p,
                            r = i.sx,
                            s = void 0 === r ? 0 : r,
                            t = i.sy,
                            u = void 0 === t ? 0 : t,
                            v = i.sw,
                            w = void 0 === v ? 0 : v,
                            x = i.sh,
                            y = void 0 === x ? 0 : x,
                            z = i.frameCount,
                            A = void 0 === z ? 1 : z,
                            B = i.stride,
                            C = void 0 === B ? 1 : B,
                            D = i.zIndex,
                            E = void 0 === D ? 0 : D,
                            F = i.opacity,
                            G = void 0 === F ? 1 : F,
                            H = i.action,
                            I = void 0 === H ? null : H;
                        a.call(this, d || k || 0, f || m || 0, g || o || 2 * (w || b.width) / c.render.designResolution[1], h || q || 2 * (y || b.height) / c.render.designResolution[1]), this.rotation = 0, this.opacity = 1, this.isRootSprite = !1, this.frame = 0, this.actions = {}, this.needUpdate = !1, b && (this.texture = b.texture, this.resourceName = b.name, this.resource = b, s /= b.width, u /= b.height, w = w ? w / b.width : 1, y = y ? y / b.height : 1), this.frameCount = A || 1, this.stride = C || 1, this.row = Math.floor(this.frameCount / this.stride), J = [s, u, w, y, E, G], this.sx = J[0], this.sy = J[1], this.sw = J[2], this.sh = J[3], this.zIndex = J[4], this.opacity = J[5], I && e.Tween(this).playAction(I);
                        var J
                    }
                    return g(b, a), b.prototype.update = function() {
                        if (this.rOpacity = this.isRootSprite ? this.opacity * this.batchNode.opacity : this.opacity * this.parent.rOpacity, 0 != this.rOpacity) {
                            if (this.needUpdate && (this.children.sort(function(a, b) {
                                    return a.zIndex - b.zIndex
                                }), this.needUpdate = !1), this.isRootSprite) this.rx = this.x, this.ry = this.y, this.rw = this.w, this.rh = this.h, this.rScale = this.scale, this.rRotation = this.rotation;
                            else {
                                var b = this.parent;
                                this.rScale = this.scale * b.rScale, this.rx = this.x * this.parent.rScale + b.rx, this.ry = this.y * this.parent.rScale + b.ry, this.rw = this.w * b.rw, this.rh = this.h * b.rh, this.rRotation = this.rotation + b.rRotation
                            }
                            if (a.prototype.update.call(this, null), this.texture) {
                                this.batchNode.currentTexture != (this.texture.bufferTex || this.texture) && (this.batchNode.drawBuffer(), this.batchNode.currentTexture = this.texture.bufferTex || this.texture);
                                var c = this.batchNode.posBuffer,
                                    d = this.batchNode.uvBuffer,
                                    e = this.batchNode.opacityBuffer,
                                    f = Math.floor(this.frame % (this.stride * this.row)),
                                    g = this.rw * this.rScale * .5,
                                    h = this.rh * this.rScale * .5,
                                    i = Math.cos(this.rRotation),
                                    j = Math.sin(this.rRotation),
                                    k = i * g,
                                    l = i * h,
                                    m = j * g,
                                    n = j * h,
                                    o = -k - n + this.rx,
                                    p = -m + l + this.ry,
                                    q = o + k + k,
                                    r = p + m + m,
                                    s = q + n + n,
                                    t = r - l - l,
                                    u = o + n + n,
                                    v = t - m - m,
                                    w = this.sw / this.stride,
                                    x = this.sh / this.row,
                                    y = w * (f % this.stride),
                                    z = x * Math.floor(f / this.stride),
                                    A = this.texture.sw,
                                    B = this.texture.sh,
                                    C = this.texture.sx + this.sx * this.texture.sw,
                                    D = this.texture.sy + this.sy * this.texture.sh,
                                    E = 2 * this.batchNode.updateCursor,
                                    F = 3 * this.batchNode.updateCursor,
                                    G = this.batchNode.enableZPosition ? this.zIndex : 0;
                                c[F] = o, d[E] = C + A * y, F++, E++, c[F] = p, d[E] = D + B * z, F++, c[F] = G, F++, E++, c[F] = q, d[E] = C + A * (y + w), F++, E++, c[F] = r, d[E] = d[E - 2], F++, c[F] = G, F++, E++, c[F] = s, d[E] = d[E - 2], F++, E++, c[F] = t, d[E] = D + B * (z + x), F++, c[F] = G, F++, E++, c[F] = u, d[E] = d[E - 6], F++, E++, c[F] = v, d[E] = d[E - 2], F++, c[F] = G;
                                var H = this.batchNode.updateCursor;
                                e[H] = e[H + 1] = e[H + 2] = e[H + 3] = this.rOpacity, this.batchNode.updateCursor += 4
                            }
                        }
                    }, b.prototype.setNewChild = function() {
                        if (this.batchNode)
                            for (var a = 0; a < this.children.length; a++) {
                                var b = this.children[a];
                                b.batchNode = this.batchNode, b.isRootSprite = !1, b.setNewChild()
                            }
                    }, b.prototype.appendChild = function(b) {
                        this.needUpdate = !0, a.prototype.appendChild.call(this, b), this.setNewChild()
                    }, b.prototype.insertChild = function(b, c) {
                        this.needUpdate = !0, a.prototype.insertChild.call(this, b, c), this.setNewChild()
                    }, b.deserialize = function(a) {
                        for (var d = new b(c.resourceCtl.getItem(a.resourceName), a.x, a.y, a.w, a.h, a), e = 0; e < a.children.length; e++) d.appendChild(b.deserialize(a[e]));
                        return d
                    }, b.prototype.serialize = function() {
                        var a = {};
                        a.children = [];
                        for (var b = 0; b < this.children.length; b++) a.children.push(this.children[b].serialize())
                    }, b
                }(d.TouchItem), a("Sprite", f)
            }
        }
    }), a.register("20", ["16"], function(a, b) {
        "use strict";
        var c, d, e = (b && b.id, this && this.__extends || function(a, b) {
            function c() {
                this.constructor = a
            }
            for (var d in b) b.hasOwnProperty(d) && (a[d] = b[d]);
            a.prototype = null === b ? Object.create(b) : (c.prototype = b.prototype, new c)
        });
        return {
            setters: [function(a) {
                c = a
            }],
            execute: function() {
                d = function(a) {
                    function b(b, c, d, e, f) {
                        void 0 === e && (e = null);
                        var g = f.sw,
                            h = void 0 === g ? 0 : g,
                            i = f.sh,
                            j = void 0 === i ? 0 : i,
                            k = f.sx,
                            l = void 0 === k ? 0 : k,
                            m = f.sy,
                            n = void 0 === m ? 0 : m,
                            o = f.alignCenter,
                            p = void 0 === o || o,
                            q = f.x,
                            r = void 0 === q ? 0 : q,
                            s = f.y,
                            t = void 0 === s ? 0 : s,
                            u = f.h,
                            v = void 0 === u ? 1 : u;
                        if (a.call(this, null, 0, 0, 1, 1, {}), this.stride = c, this.row = d, this.aspect = 1, this._number = null, this.alignCenter = !0, this.needUpdate = !0, this.numberSprs = [], this._h = 1, d * c != 10) throw "You should have 10 digits";
                        this.imgItem = b, this.aspect = h / c / j * d, this._number = e, this.sx = l / b.width, this.sy = n / b.height, this.sw = h ? h / b.width : 1, this.sh = j ? j / b.height : 1, this.x = r, this.y = t, this.w = this.h = v, this.alignCenter = p, this.updateNumber()
                    }
                    return e(b, a), b.prototype.updateNumber = function() {
                        if (null == this.number) {
                            for (var a = 0, b = this.children; a < b.length; a++) {
                                var d = b[a];
                                d.opacity = 0
                            }
                            return void(this.needUpdate = !1)
                        }
                        for (var e = Math.round(this.number) + "", f = e.length, d = this.numberSprs.length; d < f; d++) {
                            var g = new c.Sprite(this.imgItem, 0, 0, this.aspect, 1, {
                                sh: this.sh * this.imgItem.height,
                                sw: this.sw * this.imgItem.width,
                                sx: this.sx * this.imgItem.width,
                                sy: this.sy * this.imgItem.height,
                                frameCount: 10,
                                stride: this.stride
                            });
                            this.appendChild(g), this.numberSprs.push(g)
                        }
                        for (var h = this.alignCenter ? -(f - 1) * this.aspect * .5 : 0, d = 0; d < f; d++) {
                            var i = this.numberSprs[d];
                            i.frame = parseInt(e[d]), i.x = (h + this.aspect * d) * this._h, i.opacity = 1
                        }
                        for (var d = f; d < this.numberSprs.length; d++) this.numberSprs[d].opacity = 0;
                        this.needUpdate = !1
                    }, Object.defineProperty(b.prototype, "number", {
                        get: function() {
                            return this._number
                        },
                        set: function(a) {
                            this._number = a, this.needUpdate = !0
                        },
                        enumerable: !0,
                        configurable: !0
                    }), Object.defineProperty(b.prototype, "h", {
                        get: function() {
                            return this._h
                        },
                        set: function(a) {
                            this._h = this.w = a, this.needUpdate = !0
                        },
                        enumerable: !0,
                        configurable: !0
                    }), b.prototype.update = function() {
                        this.needUpdate && this.opacity > 0 && this.updateNumber(), a.prototype.update.call(this)
                    }, b
                }(c.Sprite), a("Digits", d)
            }
        }
    }), a.register("21", [], function(a, b) {
        "use strict";

        function c(a, b) {
            var c = (65535 & a) + (65535 & b),
                d = (a >> 16) + (b >> 16) + (c >> 16);
            return d << 16 | 65535 & c
        }

        function d(a, b) {
            return a << b | a >>> 32 - b
        }

        function e(a, b, e, f, g, h) {
            return c(d(c(c(b, a), c(f, h)), g), e)
        }

        function f(a, b, c, d, f, g, h) {
            return e(b & c | ~b & d, a, b, f, g, h)
        }

        function g(a, b, c, d, f, g, h) {
            return e(b & d | c & ~d, a, b, f, g, h)
        }

        function h(a, b, c, d, f, g, h) {
            return e(b ^ c ^ d, a, b, f, g, h)
        }

        function i(a, b, c, d, f, g, h) {
            return e(c ^ (b | ~d), a, b, f, g, h)
        }

        function j(a, b) {
            a[b >> 5] |= 128 << b % 32, a[(b + 64 >>> 9 << 4) + 14] = b;
            var d, e, j, k, l, m = 1732584193,
                n = -271733879,
                o = -1732584194,
                p = 271733878;
            for (d = 0; d < a.length; d += 16) e = m, j = n, k = o, l = p, m = f(m, n, o, p, a[d], 7, -680876936), p = f(p, m, n, o, a[d + 1], 12, -389564586), o = f(o, p, m, n, a[d + 2], 17, 606105819), n = f(n, o, p, m, a[d + 3], 22, -1044525330), m = f(m, n, o, p, a[d + 4], 7, -176418897), p = f(p, m, n, o, a[d + 5], 12, 1200080426), o = f(o, p, m, n, a[d + 6], 17, -1473231341), n = f(n, o, p, m, a[d + 7], 22, -45705983), m = f(m, n, o, p, a[d + 8], 7, 1770035416), p = f(p, m, n, o, a[d + 9], 12, -1958414417), o = f(o, p, m, n, a[d + 10], 17, -42063), n = f(n, o, p, m, a[d + 11], 22, -1990404162), m = f(m, n, o, p, a[d + 12], 7, 1804603682), p = f(p, m, n, o, a[d + 13], 12, -40341101), o = f(o, p, m, n, a[d + 14], 17, -1502002290), n = f(n, o, p, m, a[d + 15], 22, 1236535329), m = g(m, n, o, p, a[d + 1], 5, -165796510), p = g(p, m, n, o, a[d + 6], 9, -1069501632), o = g(o, p, m, n, a[d + 11], 14, 643717713), n = g(n, o, p, m, a[d], 20, -373897302), m = g(m, n, o, p, a[d + 5], 5, -701558691), p = g(p, m, n, o, a[d + 10], 9, 38016083), o = g(o, p, m, n, a[d + 15], 14, -660478335), n = g(n, o, p, m, a[d + 4], 20, -405537848), m = g(m, n, o, p, a[d + 9], 5, 568446438), p = g(p, m, n, o, a[d + 14], 9, -1019803690), o = g(o, p, m, n, a[d + 3], 14, -187363961), n = g(n, o, p, m, a[d + 8], 20, 1163531501), m = g(m, n, o, p, a[d + 13], 5, -1444681467), p = g(p, m, n, o, a[d + 2], 9, -51403784), o = g(o, p, m, n, a[d + 7], 14, 1735328473), n = g(n, o, p, m, a[d + 12], 20, -1926607734), m = h(m, n, o, p, a[d + 5], 4, -378558), p = h(p, m, n, o, a[d + 8], 11, -2022574463), o = h(o, p, m, n, a[d + 11], 16, 1839030562), n = h(n, o, p, m, a[d + 14], 23, -35309556), m = h(m, n, o, p, a[d + 1], 4, -1530992060), p = h(p, m, n, o, a[d + 4], 11, 1272893353), o = h(o, p, m, n, a[d + 7], 16, -155497632), n = h(n, o, p, m, a[d + 10], 23, -1094730640), m = h(m, n, o, p, a[d + 13], 4, 681279174), p = h(p, m, n, o, a[d], 11, -358537222), o = h(o, p, m, n, a[d + 3], 16, -722521979), n = h(n, o, p, m, a[d + 6], 23, 76029189), m = h(m, n, o, p, a[d + 9], 4, -640364487), p = h(p, m, n, o, a[d + 12], 11, -421815835), o = h(o, p, m, n, a[d + 15], 16, 530742520), n = h(n, o, p, m, a[d + 2], 23, -995338651), m = i(m, n, o, p, a[d], 6, -198630844), p = i(p, m, n, o, a[d + 7], 10, 1126891415), o = i(o, p, m, n, a[d + 14], 15, -1416354905), n = i(n, o, p, m, a[d + 5], 21, -57434055), m = i(m, n, o, p, a[d + 12], 6, 1700485571), p = i(p, m, n, o, a[d + 3], 10, -1894986606), o = i(o, p, m, n, a[d + 10], 15, -1051523), n = i(n, o, p, m, a[d + 1], 21, -2054922799), m = i(m, n, o, p, a[d + 8], 6, 1873313359), p = i(p, m, n, o, a[d + 15], 10, -30611744), o = i(o, p, m, n, a[d + 6], 15, -1560198380), n = i(n, o, p, m, a[d + 13], 21, 1309151649), m = i(m, n, o, p, a[d + 4], 6, -145523070), p = i(p, m, n, o, a[d + 11], 10, -1120210379), o = i(o, p, m, n, a[d + 2], 15, 718787259), n = i(n, o, p, m, a[d + 9], 21, -343485551), m = c(m, e), n = c(n, j), o = c(o, k), p = c(p, l);
            return [m, n, o, p]
        }

        function k(a) {
            var b, c = "";
            for (b = 0; b < 32 * a.length; b += 8) c += String.fromCharCode(a[b >> 5] >>> b % 32 & 255);
            return c
        }

        function l(a) {
            var b, c = [];
            for (c[(a.length >> 2) - 1] = void 0, b = 0; b < c.length; b += 1) c[b] = 0;
            for (b = 0; b < 8 * a.length; b += 8) c[b >> 5] |= (255 & a.charCodeAt(b / 8)) << b % 32;
            return c
        }

        function m(a) {
            return k(j(l(a), 8 * a.length))
        }

        function n(a, b) {
            var c, d, e = l(a),
                f = [],
                g = [];
            for (f[15] = g[15] = void 0, e.length > 16 && (e = j(e, 8 * a.length)), c = 0; 16 > c; c += 1) f[c] = 909522486 ^ e[c], g[c] = 1549556828 ^ e[c];
            return d = j(f.concat(l(b)), 512 + 8 * b.length), k(j(g.concat(d), 640))
        }

        function o(a) {
            var b, c, d = "0123456789abcdef",
                e = "";
            for (c = 0; c < a.length; c += 1) b = a.charCodeAt(c), e += d.charAt(b >>> 4 & 15) + d.charAt(15 & b);
            return e
        }

        function p(a) {
            return unescape(encodeURIComponent(a))
        }

        function q(a) {
            return m(p(a))
        }

        function r(a) {
            return o(q(a))
        }

        function s(a, b) {
            return n(p(a), p(b))
        }

        function t(a, b) {
            return o(s(a, b))
        }

        function u(a, b, c) {
            return b ? c ? s(b, a) : t(b, a) : c ? q(a) : r(a)
        }
        var v;
        b && b.id;
        return {
            setters: [],
            execute: function() {
                a("digest", v = u)
            }
        }
    }), a.register("22", ["6", "21"], function(a, b) {
        "use strict";
        var c, d, e;
        b && b.id;
        return {
            setters: [function(a) {
                c = a
            }, function(a) {
                d = a
            }],
            execute: function() {
                e = function() {
                    function a() {}
                    return a.getProgram = function(b, e, f) {
                        var g = a.getFlags(f);
                        b = g + b, e = g + e;
                        var h = d.digest(b) + d.digest(e);
                        if (a.programCache[h]) return a.programCache[h];
                        var i = c.render.gl,
                            j = a.getShader(b, i, !0),
                            k = a.getShader(e, i, !1),
                            l = i.createProgram();
                        return i.attachShader(l, j), i.attachShader(l, k), i.linkProgram(l), i.getProgramParameter(l, i.LINK_STATUS) ? (a.programCache[h] = l, l) : void console.log(i.getProgramInfoLog(l))
                    }, a.getShader = function(a, b, c) {
                        var d = b.createShader(c ? b.VERTEX_SHADER : b.FRAGMENT_SHADER);
                        return b.shaderSource(d, a), b.compileShader(d), b.getShaderParameter(d, b.COMPILE_STATUS) ? d : void console.debug(b.getShaderInfoLog(d))
                    }, a.getFlags = function(a) {
                        if (!a) return "";
                        var b = "";
                        for (var c in a) b += "#define " + c + " " + a[c] + "\n";
                        return b
                    }, a.programCache = {}, a
                }(), a("GlProgram", e)
            }
        }
    }), a.register("8", ["17", "6", "22"], function(a, b) {
        "use strict";
        var c, d, e, f, g = (b && b.id, this && this.__extends || function(a, b) {
            function c() {
                this.constructor = a
            }
            for (var d in b) b.hasOwnProperty(d) && (a[d] = b[d]);
            a.prototype = null === b ? Object.create(b) : (c.prototype = b.prototype, new c)
        });
        return {
            setters: [function(a) {
                c = a
            }, function(a) {
                d = a
            }, function(a) {
                e = a
            }],
            execute: function() {
                f = function(a) {
                    function b(b, c) {
                        a.call(this), this.enableBlend = !1, this.enableDepthTest = !1, this.enableDepthWrite = !1, this.uniformList = {}, this.attributeList = {}, this.textures = [], this.uniforms = [], this.attributes = [], this.autoBindAttrib = !0, this.gl = d.render.gl, this.uniformList = b || this.uniformList, this.attributeList = c || this.attributeList
                    }
                    return g(b, a), b.prototype.initProgram = function(a, b, c) {
                        this.program = e.GlProgram.getProgram(a, b, c), this.gl.useProgram(this.program);
                        try {
                            this.bindUniform("mvpMat", "Matrix4fv")
                        } catch (a) {}
                        this.bindUniforms(this.uniforms), this.bindAttributes(this.attributes)
                    }, b.prototype.bindUniform = function(a, b, c) {
                        this.uniformList[a] = {
                            name: a,
                            location: this.gl.getUniformLocation(this.program, a),
                            func: this.gl["uniform" + b].bind(this.gl),
                            ismat: b.indexOf("Matrix") >= 0,
                            value: c
                        }
                    }, b.prototype.bindUniforms = function(a) {
                        for (var b = 0; b < a.length; b++) this.bindUniform(a[b].name, a[b].type, a[b].value)
                    }, b.prototype.uniformData = function(a, b, c) {
                        if (void 0 === c && (c = !1), this.uniformList[a].value = b, c) {
                            var d = this.uniformList[a];
                            d.ismat ? d.func(d.location, !1, b) : d.func(d.location, b)
                        }
                    }, b.prototype.bindAttribute = function(a, b, c) {
                        void 0 === c && (c = "FLOAT"), this.attributeList[a] = {
                            name: a,
                            location: this.gl.getAttribLocation(this.program, a),
                            size: b,
                            type: this.gl[c]
                        }
                    }, b.prototype.bindVBO = function(a, b) {
                        var c = this.attributeList[a];
                        c && (this.gl.bindBuffer(this.gl.ARRAY_BUFFER, b), this.gl.enableVertexAttribArray(c.location), this.gl.vertexAttribPointer(c.location, c.size, c.type, !1, 0, 0))
                    }, b.prototype.bindIBO = function(a) {
                        this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, a)
                    }, b.prototype.bufferIBO = function(a) {
                        this.IBO || (this.IBO = this.gl.createBuffer()), this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, this.IBO), this.gl.bufferData(this.gl.ELEMENT_ARRAY_BUFFER, a, this.gl.STATIC_DRAW)
                    }, b.prototype.bindAttributes = function(a) {
                        for (var b = 0; b < a.length; b++) this.bindAttribute(a[b].name, a[b].size, a[b].type)
                    }, b.prototype.bufferData = function(a, b, c) {
                        void 0 === c && (c = !1);
                        var d = this.attributeList[a];
                        d.vbo || (d.vbo = this.gl.createBuffer()), this.gl.bindBuffer(this.gl.ARRAY_BUFFER, d.vbo), this.gl.bufferData(this.gl.ARRAY_BUFFER, b, c ? this.gl.DYNAMIC_DRAW : this.gl.STATIC_DRAW),
                            this.gl.enableVertexAttribArray(d.location), this.gl.vertexAttribPointer(d.location, d.size, this.gl.FLOAT, !1, 0, 0)
                    }, b.prototype.bindTexture = function(a, b) {
                        this.textures[b] = a
                    }, b.prototype.active = function(a) {
                        void 0 === a && (a = !1), a ? d.render.materialStack.push(this) : d.render.materialStack[d.render.materialStack.length - 1] = this, this.gl.useProgram(this.program), this.enableBlend ? this.gl.enable(this.gl.BLEND) : this.gl.disable(this.gl.BLEND), this.enableDepthTest ? (this.gl.enable(this.gl.DEPTH_TEST), this.gl.depthFunc(this.gl.LEQUAL)) : this.gl.disable(this.gl.DEPTH_TEST), this.gl.depthMask(this.enableDepthWrite);
                        for (var b in this.uniformList) {
                            var c = this.uniformList[b],
                                e = this[c.name],
                                f = null == e || void 0 == e ? c.value : e;
                            if (c.ismat) {
                                if (!f) continue;
                                c.func(c.location, !1, f)
                            } else c.func(c.location, f)
                        }
                        if (this.autoBindAttrib)
                            for (var g in this.attributeList) {
                                var h = this.attributeList[g];
                                h.vbo && (this.gl.bindBuffer(this.gl.ARRAY_BUFFER, h.vbo), this.gl.enableVertexAttribArray(h.location), this.gl.vertexAttribPointer(h.location, h.size, this.gl.FLOAT, !1, 0, 0))
                            }
                        this.IBO && this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, this.IBO);
                        for (var i = 0; i < this.textures.length; i++) this.textures[i] && (this.gl.activeTexture(this.gl.TEXTURE0 + i), this.textures[i].active ? this.textures[i].active(i) : this.gl.bindTexture(this.gl.TEXTURE_2D, this.textures[i]))
                    }, b.prototype.popMaterial = function() {
                        d.render.materialStack.pop(), d.render.materialStack[d.render.materialStack.length - 1].active()
                    }, b
                }(c.ObjectBase), a("Material", f)
            }
        }
    }), a.register("23", ["8", "6"], function(a, b) {
        "use strict";
        var c, d, e, f = (b && b.id, this && this.__extends || function(a, b) {
            function c() {
                this.constructor = a
            }
            for (var d in b) b.hasOwnProperty(d) && (a[d] = b[d]);
            a.prototype = null === b ? Object.create(b) : (c.prototype = b.prototype, new c)
        });
        return {
            setters: [function(a) {
                c = a
            }, function(a) {
                d = a
            }],
            execute: function() {
                e = function(a) {
                    function b(b, c, e, f, g, h) {
                        a.call(this), this.sx = b, this.sy = c, this.sh = e, this.sw = f, this.row = g, this.stride = h, this.color = [1, 1, 1, 1], this.progress = 0, this.size = 5, this.opacity = 1, this.fade = 1, this.speed = 1;
                        var i = "\n            //x,y,size\n            attribute vec3 position;\n            //born,direction,speed,textureType\n            attribute vec4 properties;\n            uniform mat4 mvpMat;\n            uniform float progress;\n            uniform float fade;\n            uniform float size;\n            uniform float speed;\n            varying float textType;\n            varying float fopacity;\n            void main(){\n                float p=max(0.0,progress-properties[0]);\n                vec2 _speed=vec2(cos(properties[1]),sin(properties[1]))*properties[2];\n                gl_Position=mvpMat*vec4(position.xy+_speed*speed*p,0.0,1.0);\n                gl_PointSize=position[2]*size*P;\n                if(p==0.0){gl_PointSize=0.0;};\n                textType=properties[3];\n                fopacity=1.0-pow(progress,3.0/fade);\n\n            }\n        ",
                            j = "\n        //#define sx=0.0;\n        //#define sy=0.0;\n        //#define sw=0.0;\n        //#define sh=0.0;\n        //#define row=0.0;\n        //#define stride=0.0;\n        precision mediump float;\n        uniform sampler2D texture;\n        uniform vec4 color;\n        uniform float opacity;\n        varying float textType;\n        varying float fopacity;\n        void main(){\n            float x=mod(textType,stride);\n            float y=mod(floor(textType/stride),row);\n            vec2 uv=gl_PointCoord*vec2(sw/stride,sh/row)+vec2(sx+x*sw/stride,sy+y*sh/row);\n            //gl_FragColor=texture2D(texture,gl_PointCoord*vec2(sw,sh)+vec2(sx,sy));\n            gl_FragColor=texture2D(texture,uv)*color;\n            gl_FragColor.xyz=gl_FragColor.xyz*1.5*gl_FragColor.a;\n            gl_FragColor[3]=gl_FragColor[3]*opacity*fopacity*1.5;\n\n\n\n        }";
                        this.uniforms = [{
                            name: "color",
                            type: "4fv"
                        }, {
                            name: "progress",
                            type: "1f"
                        }, {
                            name: "fade",
                            type: "1f"
                        }, {
                            name: "size",
                            type: "1f"
                        }, {
                            name: "texture",
                            type: "1i",
                            value: 0
                        }, {
                            name: "opacity",
                            type: "1f"
                        }, {
                            name: "speed",
                            type: "1f"
                        }], this.attributes = [{
                            name: "position",
                            size: 3
                        }, {
                            name: "properties",
                            size: 4
                        }], this.initProgram(i, j, {
                            sx: b.toPrecision(5),
                            sy: c.toPrecision(5),
                            sh: e.toPrecision(5),
                            sw: f.toPrecision(5),
                            row: g.toPrecision(5),
                            stride: h.toPrecision(5),
                            P: d.render.pointScale.toPrecision(5)
                        }), this.enableBlend = !0, this.enableDepthTest = !1, this.enableDepthWrite = !1
                    }
                    return f(b, a), b
                }(c.Material), a("SimpleParticleMaterial", e)
            }
        }
    }), a.register("24", ["c", "6", "23"], function(a, b) {
        "use strict";
        var c, d, e, f, g = (b && b.id, this && this.__extends || function(a, b) {
            function c() {
                this.constructor = a
            }
            for (var d in b) b.hasOwnProperty(d) && (a[d] = b[d]);
            a.prototype = null === b ? Object.create(b) : (c.prototype = b.prototype, new c)
        });
        return {
            setters: [function(a) {
                c = a
            }, function(a) {
                d = a
            }, function(a) {
                e = a
            }],
            execute: function() {
                f = function(a) {
                    function b(b, c) {
                        var d = c.x,
                            f = void 0 === d ? 0 : d,
                            g = c.y,
                            h = void 0 === g ? 0 : g,
                            i = c.sx,
                            j = void 0 === i ? 0 : i,
                            k = c.sy,
                            l = void 0 === k ? 0 : k,
                            m = c.sh,
                            n = void 0 === m ? null : m,
                            o = c.sw,
                            p = void 0 === o ? null : o,
                            q = c.row,
                            r = void 0 === q ? 1 : q,
                            s = c.stride,
                            t = void 0 === s ? 1 : s,
                            u = c.size,
                            v = void 0 === u ? 4 : u,
                            w = c.particleCount,
                            x = void 0 === w ? 200 : w,
                            y = c.randomize,
                            z = void 0 === y ? 1 : y,
                            A = c.color,
                            B = void 0 === A ? [1, 1, 1, 1] : A,
                            C = c.opacity,
                            D = void 0 === C ? 1 : C,
                            E = c.speed,
                            F = void 0 === E ? 1 : E,
                            G = c.scale,
                            H = void 0 === G ? 1 : G,
                            I = c.fade,
                            J = void 0 === I ? 1 : I;
                        a.call(this), this.progress = 0, this.fade = 1, this.speed = 1, this.particleCount = x, this.enablePerspective = !1, j = j / b.width * b.texture.sw, l = l / b.height * b.texture.sh, p = (p ? p / b.width : 1) * b.texture.sw, n = (n ? n / b.height : 1) * b.texture.sh, this.x = f, this.y = h, this.size = v, this.color = B, this.opacity = D, this.scale = H, this.speed = F, this.fade = J;
                        for (var K = r * t, L = new Float32Array(3 * x), M = new Float32Array(4 * x), N = 0; N < x; N++) {
                            var O = 2 * Math.PI * Math.random(),
                                P = Math.pow(Math.random(), 3) * z;
                            L[3 * N] = P * Math.cos(O), L[3 * N + 1] = P * Math.sin(O), L[3 * N + 2] = 1 + Math.pow(Math.random(), 1.5) * z * (Math.random() < .5 ? 1 : -1), M[4 * N] = Math.random(), M[4 * N + 1] = Math.random() * Math.PI * 2, M[4 * N + 2] = 1 + Math.pow(Math.random(), 1.5) * z * (Math.random() < .5 ? 1 : -1), M[4 * N + 3] = Math.floor(Math.random() * K)
                        }
                        this.material = new e.SimpleParticleMaterial(j, l, n, p, r, t), this.material.textures = [b.texture], this.material.bufferData("position", L), this.material.bufferData("properties", M), this.material.mvpMat = this.mvpMat
                    }
                    return g(b, a), Object.defineProperty(b.prototype, "x", {
                        get: function() {
                            return this.position[0]
                        },
                        set: function(a) {
                            this.position[0] = a
                        },
                        enumerable: !0,
                        configurable: !0
                    }), Object.defineProperty(b.prototype, "y", {
                        get: function() {
                            return this.position[1]
                        },
                        set: function(a) {
                            this.position[1] = a
                        },
                        enumerable: !0,
                        configurable: !0
                    }), b.prototype.update = function() {
                        this.opacity <= 0 || this.progress >= 1 || this.progress <= 0 || (a.prototype.update.call(this), this.material.color = this.color, this.material.opacity = this.opacity, this.material.progress = this.progress, this.material.size = this.size, this.material.fade = this.fade, this.material.speed = this.speed, this.material.active(), d.render.gl.drawArrays(d.render.gl.POINTS, 0, this.particleCount))
                    }, b
                }(c.Object3D), a("SimpleParticleSystem", f)
            }
        }
    }), a.register("25", [], function(a, b) {
        "use strict";
        var c;
        b && b.id;
        return {
            setters: [],
            execute: function() {
                c = function() {
                    function a() {}
                    return a.easeInQuad = function(a, b, c, d) {
                        return c * (a /= d) * a + b
                    }, a.easeOutQuad = function(a, b, c, d) {
                        return -c * (a /= d) * (a - 2) + b
                    }, a.easeInOutQuad = function(a, b, c, d) {
                        return (a /= d / 2) < 1 ? c / 2 * a * a + b : -c / 2 * (--a * (a - 2) - 1) + b
                    }, a.easeInCubic = function(a, b, c, d) {
                        return c * (a /= d) * a * a + b
                    }, a.easeOutCubic = function(a, b, c, d) {
                        return c * ((a = a / d - 1) * a * a + 1) + b
                    }, a.easeInOutCubic = function(a, b, c, d) {
                        return (a /= d / 2) < 1 ? c / 2 * a * a * a + b : c / 2 * ((a -= 2) * a * a + 2) + b
                    }, a.easeInQuart = function(a, b, c, d) {
                        return c * (a /= d) * a * a * a + b
                    }, a.easeOutQuart = function(a, b, c, d) {
                        return -c * ((a = a / d - 1) * a * a * a - 1) + b
                    }, a.easeInOutQuart = function(a, b, c, d) {
                        return (a /= d / 2) < 1 ? c / 2 * a * a * a * a + b : -c / 2 * ((a -= 2) * a * a * a - 2) + b
                    }, a.easeInQuint = function(a, b, c, d) {
                        return c * (a /= d) * a * a * a * a + b
                    }, a.easeOutQuint = function(a, b, c, d) {
                        return c * ((a = a / d - 1) * a * a * a * a + 1) + b
                    }, a.easeInOutQuint = function(a, b, c, d) {
                        return (a /= d / 2) < 1 ? c / 2 * a * a * a * a * a + b : c / 2 * ((a -= 2) * a * a * a * a + 2) + b
                    }, a.easeInSine = function(a, b, c, d) {
                        return -c * Math.cos(a / d * (Math.PI / 2)) + c + b
                    }, a.easeOutSine = function(a, b, c, d) {
                        return c * Math.sin(a / d * (Math.PI / 2)) + b
                    }, a.easeInOutSine = function(a, b, c, d) {
                        return -c / 2 * (Math.cos(Math.PI * a / d) - 1) + b
                    }, a.easeInExpo = function(a, b, c, d) {
                        return 0 == a ? b : c * Math.pow(2, 10 * (a / d - 1)) + b
                    }, a.easeOutExpo = function(a, b, c, d) {
                        return a == d ? b + c : c * (-Math.pow(2, -10 * a / d) + 1) + b
                    }, a.easeInOutExpo = function(a, b, c, d) {
                        return 0 == a ? b : a == d ? b + c : (a /= d / 2) < 1 ? c / 2 * Math.pow(2, 10 * (a - 1)) + b : c / 2 * (-Math.pow(2, -10 * --a) + 2) + b
                    }, a.easeInCirc = function(a, b, c, d) {
                        return -c * (Math.sqrt(1 - (a /= d) * a) - 1) + b
                    }, a.easeOutCirc = function(a, b, c, d) {
                        return c * Math.sqrt(1 - (a = a / d - 1) * a) + b
                    }, a.easeInOutCirc = function(a, b, c, d) {
                        return (a /= d / 2) < 1 ? -c / 2 * (Math.sqrt(1 - a * a) - 1) + b : c / 2 * (Math.sqrt(1 - (a -= 2) * a) + 1) + b
                    }, a.easeInElastic = function(a, b, c, d) {
                        var e = 1.70158,
                            f = 0,
                            g = c;
                        if (0 == a) return b;
                        if (1 == (a /= d)) return b + c;
                        if (f || (f = .3 * d), g < Math.abs(c)) {
                            g = c;
                            var e = f / 4
                        } else var e = f / (2 * Math.PI) * Math.asin(c / g);
                        return -(g * Math.pow(2, 10 * (a -= 1)) * Math.sin((a * d - e) * (2 * Math.PI) / e)) + b
                    }, a.easeOutElastic = function(a, b, c, d) {
                        var e = 1.70158,
                            f = 0,
                            g = c;
                        if (0 == a) return b;
                        if (1 == (a /= d)) return b + c;
                        if (f || (f = .3 * d), g < Math.abs(c)) {
                            g = c;
                            var e = f / 4
                        } else var e = f / (2 * Math.PI) * Math.asin(c / g);
                        return g * Math.pow(2, -10 * a) * Math.sin((a * d - e) * (2 * Math.PI) / f) + c + b
                    }, a.easeInOutElastic = function(a, b, c, d) {
                        var e = 1.70158,
                            f = 0,
                            g = c;
                        if (0 == a) return b;
                        if (2 == (a /= d / 2)) return b + c;
                        if (f || (f = d * (.3 * 1.5)), g < Math.abs(c)) {
                            g = c;
                            var e = f / 4
                        } else var e = f / (2 * Math.PI) * Math.asin(c / g);
                        return a < 1 ? -.5 * (g * Math.pow(2, 10 * (a -= 1)) * Math.sin((a * d - e) * (2 * Math.PI) / f)) + b : g * Math.pow(2, -10 * (a -= 1)) * Math.sin((a * d - e) * (2 * Math.PI) / f) * .5 + c + b
                    }, a.easeInBack = function(a, b, c, d) {
                        var e = 1.70158;
                        return c * (a /= d) * a * ((e + 1) * a - e) + b
                    }, a.easeOutBack = function(a, b, c, d) {
                        var e = 1.70158;
                        return c * ((a = a / d - 1) * a * ((e + 1) * a + e) + 1) + b
                    }, a.easeInOutBack = function(a, b, c, d) {
                        var e = 1.70158;
                        return (a /= d / 2) < 1 ? c / 2 * (a * a * (((e *= 1.525) + 1) * a - e)) + b : c / 2 * ((a -= 2) * a * (((e *= 1.525) + 1) * a + e) + 2) + b
                    }, a.easeOutBounce = function(a, b, c, d) {
                        return (a /= d) < 1 / 2.75 ? c * (7.5625 * a * a) + b : a < 2 / 2.75 ? c * (7.5625 * (a -= 1.5 / 2.75) * a + .75) + b : a < 2.5 / 2.75 ? c * (7.5625 * (a -= 2.25 / 2.75) * a + .9375) + b : c * (7.5625 * (a -= 2.625 / 2.75) * a + .984375) + b
                    }, a.linear = function(a, b, c, d) {
                        return b + c / d * a
                    }, a
                }(), a("Easing", c)
            }
        }
    }), a.register("c", ["d", "17", "6"], function(a, b) {
        "use strict";
        var c, d, e, f, g = (b && b.id, this && this.__extends || function(a, b) {
            function c() {
                this.constructor = a
            }
            for (var d in b) b.hasOwnProperty(d) && (a[d] = b[d]);
            a.prototype = null === b ? Object.create(b) : (c.prototype = b.prototype, new c)
        });
        return {
            setters: [function(a) {
                c = a
            }, function(a) {
                d = a
            }, function(a) {
                e = a
            }],
            execute: function() {
                f = function(a) {
                    function b() {
                        a.apply(this, arguments), this.isRoot = !1, this.position = c.vec3.create(), this.rotate = c.vec3.create(), this.scaleV = c.vec3.clone(new Float32Array([1, 1, 1])), this.worldMat = c.mat4.create(), this.modelMat = c.mat4.create(), this.aspectMat = c.mat4.create(), this.mvpMat = c.mat4.create(), this.enablePerspective = !0, this.zIndex = 0, this.needUpdate = !1
                    }
                    return g(b, a), b.prototype.update = function() {
                        this.needUpdate && (this.children.sort(function(a, b) {
                            return a.zIndex - b.zIndex
                        }), this.needUpdate = !1), this.isRoot || (this.enablePerspective ? (c.mat4.identity(this.modelMat), c.mat4.rotate(this.modelMat, this.modelMat, 1, this.rotate), c.mat4.scale(this.modelMat, this.modelMat, this.scaleV), c.mat4.translate(this.modelMat, this.modelMat, this.position), c.mat4.mul(this.worldMat, this.modelMat, this.parent.worldMat), c.mat4.mul(this.mvpMat, this.root.vpMat, this.worldMat)) : (c.mat4.identity(this.modelMat), c.mat4.rotate(this.modelMat, this.modelMat, 1, this.rotate), c.mat4.translate(this.modelMat, this.modelMat, this.position), c.mat4.scale(this.modelMat, this.modelMat, this.scaleV), c.mat4.mul(this.worldMat, this.modelMat, this.parent.worldMat), e.render.landscape ? (this.aspectMat[0] = e.render.aspect, this.aspectMat[5] = 1) : (this.aspectMat[0] = e.render.designAspect, this.aspectMat[5] = 1 / e.render.aspect * e.render.designAspect), c.mat4.mul(this.mvpMat, this.aspectMat, this.worldMat))), this.material && (this.material.mvpMat = this.mvpMat), a.prototype.update.call(this)
                    }, b.prototype.appendChild = function(b) {
                        a.prototype.appendChild.call(this, b), this.needUpdate = !0
                    }, Object.defineProperty(b.prototype, "posX", {
                        get: function() {
                            return this.position[0]
                        },
                        set: function(a) {
                            this.position[0] = a
                        },
                        enumerable: !0,
                        configurable: !0
                    }), Object.defineProperty(b.prototype, "posY", {
                        get: function() {
                            return this.position[1]
                        },
                        set: function(a) {
                            this.position[1] = a
                        },
                        enumerable: !0,
                        configurable: !0
                    }), Object.defineProperty(b.prototype, "posZ", {
                        get: function() {
                            return this.position[2]
                        },
                        set: function(a) {
                            this.position[2] = a
                        },
                        enumerable: !0,
                        configurable: !0
                    }), b.prototype.translate = function(a, b, c) {
                        this.position[0] += a, this.position[1] += b, this.position[2] += c
                    }, Object.defineProperty(b.prototype, "scale", {
                        set: function(a) {
                            this.scaleV[0] = a, this.scaleV[1] = a, this.scaleV[2] = a
                        },
                        enumerable: !0,
                        configurable: !0
                    }), b.prototype.rotateBy = function(a, b, c) {
                        this.rotate[0] += a, this.rotate[1] += b, this.rotate[2] += c
                    }, b.prototype.rotateTo = function(a, b, c) {
                        this.rotate[0] = a, this.rotate[1] = b, this.rotate[2] = c
                    }, b
                }(d.NodeBase), a("Object3D", f)
            }
        }
    }), a.register("26", ["d", "c"], function(a, b) {
        "use strict";
        var c, d, e, f, g = (b && b.id, this && this.__extends || function(a, b) {
            function c() {
                this.constructor = a
            }
            for (var d in b) b.hasOwnProperty(d) && (a[d] = b[d]);
            a.prototype = null === b ? Object.create(b) : (c.prototype = b.prototype, new c)
        });
        return {
            setters: [function(a) {
                c = a
            }, function(a) {
                d = a
            }],
            execute: function() {
                e = function(a) {
                    function b(b) {
                        a.call(this), this.isActive = !1, this.viewMat = c.mat4.create(), this.perspectiveMat = c.mat4.create(), this.isRoot = !0, this.render = b
                    }
                    return g(b, a), b.prototype.setAsDefaultCamera = function() {
                        this.render.defaultCamera && (this.render.defaultCamera.isActive = !1), this.isActive = !0, this.render.defaultCamera = this, this.render.viewMat = this.viewMat, this.render.perspectiveMat = this.perspectiveMat
                    }, b
                }(d.Object3D), a("Camera", e), f = function(a) {
                    function b(b, d, e, f, g, h, i, j) {
                        void 0 === d && (d = 0), void 0 === e && (e = 0), void 0 === f && (f = 1.5), void 0 === g && (g = 67.3), void 0 === h && (h = .1), void 0 === i && (i = 300), void 0 === j && (j = null), a.call(this, b), this.center = c.vec3.create(), this.headerUp = new Float32Array([0, 1, 0]), this.aspect = j, this.position[0] = d, this.position[1] = e, this.position[2] = f, this.fov = g, this.near = h, this.far = i
                    }
                    return g(b, a), b.prototype.update = function() {
                        c.mat4.lookAt(this.viewMat, this.position, this.center, this.headerUp), c.mat4.perspective(this.perspectiveMat, this.fov / 180 * Math.PI, this.aspect || 1 / this.render.aspect, this.near, this.far)
                    }, b.prototype.lookAt = function(a, b) {
                        c.vec3.copy(this.center, a), c.vec3.copy(this.headerUp, b)
                    }, b
                }(e), a("PerspectiveCamera", f)
            }
        }
    }), a.registerDynamic("27", ["28"], !0, function(a, b, c) {
        var d = a("28"),
            e = {};
        return e.create = function() {
            var a = new d.ARRAY_TYPE(4);
            return a[0] = 1, a[1] = 0, a[2] = 0, a[3] = 1, a
        }, e.clone = function(a) {
            var b = new d.ARRAY_TYPE(4);
            return b[0] = a[0], b[1] = a[1], b[2] = a[2], b[3] = a[3], b
        }, e.copy = function(a, b) {
            return a[0] = b[0], a[1] = b[1], a[2] = b[2], a[3] = b[3], a
        }, e.identity = function(a) {
            return a[0] = 1, a[1] = 0, a[2] = 0, a[3] = 1, a
        }, e.fromValues = function(a, b, c, e) {
            var f = new d.ARRAY_TYPE(4);
            return f[0] = a, f[1] = b, f[2] = c, f[3] = e, f
        }, e.set = function(a, b, c, d, e) {
            return a[0] = b, a[1] = c, a[2] = d, a[3] = e, a
        }, e.transpose = function(a, b) {
            if (a === b) {
                var c = b[1];
                a[1] = b[2], a[2] = c
            } else a[0] = b[0], a[1] = b[2], a[2] = b[1], a[3] = b[3];
            return a
        }, e.invert = function(a, b) {
            var c = b[0],
                d = b[1],
                e = b[2],
                f = b[3],
                g = c * f - e * d;
            return g ? (g = 1 / g, a[0] = f * g, a[1] = -d * g, a[2] = -e * g, a[3] = c * g, a) : null
        }, e.adjoint = function(a, b) {
            var c = b[0];
            return a[0] = b[3], a[1] = -b[1], a[2] = -b[2], a[3] = c, a
        }, e.determinant = function(a) {
            return a[0] * a[3] - a[2] * a[1]
        }, e.multiply = function(a, b, c) {
            var d = b[0],
                e = b[1],
                f = b[2],
                g = b[3],
                h = c[0],
                i = c[1],
                j = c[2],
                k = c[3];
            return a[0] = d * h + f * i, a[1] = e * h + g * i, a[2] = d * j + f * k, a[3] = e * j + g * k, a
        }, e.mul = e.multiply, e.rotate = function(a, b, c) {
            var d = b[0],
                e = b[1],
                f = b[2],
                g = b[3],
                h = Math.sin(c),
                i = Math.cos(c);
            return a[0] = d * i + f * h, a[1] = e * i + g * h, a[2] = d * -h + f * i, a[3] = e * -h + g * i, a
        }, e.scale = function(a, b, c) {
            var d = b[0],
                e = b[1],
                f = b[2],
                g = b[3],
                h = c[0],
                i = c[1];
            return a[0] = d * h, a[1] = e * h, a[2] = f * i, a[3] = g * i, a
        }, e.fromRotation = function(a, b) {
            var c = Math.sin(b),
                d = Math.cos(b);
            return a[0] = d, a[1] = c, a[2] = -c, a[3] = d, a
        }, e.fromScaling = function(a, b) {
            return a[0] = b[0], a[1] = 0, a[2] = 0, a[3] = b[1], a
        }, e.str = function(a) {
            return "mat2(" + a[0] + ", " + a[1] + ", " + a[2] + ", " + a[3] + ")"
        }, e.frob = function(a) {
            return Math.sqrt(Math.pow(a[0], 2) + Math.pow(a[1], 2) + Math.pow(a[2], 2) + Math.pow(a[3], 2))
        }, e.LDU = function(a, b, c, d) {
            return a[2] = d[2] / d[0], c[0] = d[0], c[1] = d[1], c[3] = d[3] - a[2] * c[1], [a, b, c]
        }, e.add = function(a, b, c) {
            return a[0] = b[0] + c[0], a[1] = b[1] + c[1], a[2] = b[2] + c[2], a[3] = b[3] + c[3], a
        }, e.subtract = function(a, b, c) {
            return a[0] = b[0] - c[0], a[1] = b[1] - c[1], a[2] = b[2] - c[2], a[3] = b[3] - c[3], a
        }, e.sub = e.subtract, e.exactEquals = function(a, b) {
            return a[0] === b[0] && a[1] === b[1] && a[2] === b[2] && a[3] === b[3]
        }, e.equals = function(a, b) {
            var c = a[0],
                e = a[1],
                f = a[2],
                g = a[3],
                h = b[0],
                i = b[1],
                j = b[2],
                k = b[3];
            return Math.abs(c - h) <= d.EPSILON * Math.max(1, Math.abs(c), Math.abs(h)) && Math.abs(e - i) <= d.EPSILON * Math.max(1, Math.abs(e), Math.abs(i)) && Math.abs(f - j) <= d.EPSILON * Math.max(1, Math.abs(f), Math.abs(j)) && Math.abs(g - k) <= d.EPSILON * Math.max(1, Math.abs(g), Math.abs(k))
        }, e.multiplyScalar = function(a, b, c) {
            return a[0] = b[0] * c, a[1] = b[1] * c, a[2] = b[2] * c, a[3] = b[3] * c, a
        }, e.multiplyScalarAndAdd = function(a, b, c, d) {
            return a[0] = b[0] + c[0] * d, a[1] = b[1] + c[1] * d, a[2] = b[2] + c[2] * d, a[3] = b[3] + c[3] * d, a
        }, c.exports = e, c.exports
    }), a.registerDynamic("29", ["28"], !0, function(a, b, c) {
        var d = a("28"),
            e = {};
        return e.create = function() {
            var a = new d.ARRAY_TYPE(6);
            return a[0] = 1, a[1] = 0, a[2] = 0, a[3] = 1, a[4] = 0, a[5] = 0, a
        }, e.clone = function(a) {
            var b = new d.ARRAY_TYPE(6);
            return b[0] = a[0], b[1] = a[1], b[2] = a[2], b[3] = a[3], b[4] = a[4], b[5] = a[5], b
        }, e.copy = function(a, b) {
            return a[0] = b[0], a[1] = b[1], a[2] = b[2], a[3] = b[3], a[4] = b[4], a[5] = b[5], a
        }, e.identity = function(a) {
            return a[0] = 1, a[1] = 0, a[2] = 0, a[3] = 1, a[4] = 0, a[5] = 0, a
        }, e.fromValues = function(a, b, c, e, f, g) {
            var h = new d.ARRAY_TYPE(6);
            return h[0] = a, h[1] = b, h[2] = c, h[3] = e, h[4] = f, h[5] = g, h
        }, e.set = function(a, b, c, d, e, f, g) {
            return a[0] = b, a[1] = c, a[2] = d, a[3] = e, a[4] = f, a[5] = g, a
        }, e.invert = function(a, b) {
            var c = b[0],
                d = b[1],
                e = b[2],
                f = b[3],
                g = b[4],
                h = b[5],
                i = c * f - d * e;
            return i ? (i = 1 / i, a[0] = f * i, a[1] = -d * i, a[2] = -e * i, a[3] = c * i, a[4] = (e * h - f * g) * i, a[5] = (d * g - c * h) * i, a) : null
        }, e.determinant = function(a) {
            return a[0] * a[3] - a[1] * a[2]
        }, e.multiply = function(a, b, c) {
            var d = b[0],
                e = b[1],
                f = b[2],
                g = b[3],
                h = b[4],
                i = b[5],
                j = c[0],
                k = c[1],
                l = c[2],
                m = c[3],
                n = c[4],
                o = c[5];
            return a[0] = d * j + f * k, a[1] = e * j + g * k, a[2] = d * l + f * m, a[3] = e * l + g * m, a[4] = d * n + f * o + h, a[5] = e * n + g * o + i, a
        }, e.mul = e.multiply, e.rotate = function(a, b, c) {
            var d = b[0],
                e = b[1],
                f = b[2],
                g = b[3],
                h = b[4],
                i = b[5],
                j = Math.sin(c),
                k = Math.cos(c);
            return a[0] = d * k + f * j, a[1] = e * k + g * j, a[2] = d * -j + f * k, a[3] = e * -j + g * k, a[4] = h, a[5] = i, a
        }, e.scale = function(a, b, c) {
            var d = b[0],
                e = b[1],
                f = b[2],
                g = b[3],
                h = b[4],
                i = b[5],
                j = c[0],
                k = c[1];
            return a[0] = d * j, a[1] = e * j, a[2] = f * k, a[3] = g * k, a[4] = h, a[5] = i, a
        }, e.translate = function(a, b, c) {
            var d = b[0],
                e = b[1],
                f = b[2],
                g = b[3],
                h = b[4],
                i = b[5],
                j = c[0],
                k = c[1];
            return a[0] = d, a[1] = e, a[2] = f, a[3] = g, a[4] = d * j + f * k + h, a[5] = e * j + g * k + i, a
        }, e.fromRotation = function(a, b) {
            var c = Math.sin(b),
                d = Math.cos(b);
            return a[0] = d, a[1] = c, a[2] = -c, a[3] = d, a[4] = 0, a[5] = 0, a
        }, e.fromScaling = function(a, b) {
            return a[0] = b[0], a[1] = 0, a[2] = 0, a[3] = b[1], a[4] = 0, a[5] = 0, a
        }, e.fromTranslation = function(a, b) {
            return a[0] = 1, a[1] = 0, a[2] = 0, a[3] = 1, a[4] = b[0], a[5] = b[1], a
        }, e.str = function(a) {
            return "mat2d(" + a[0] + ", " + a[1] + ", " + a[2] + ", " + a[3] + ", " + a[4] + ", " + a[5] + ")"
        }, e.frob = function(a) {
            return Math.sqrt(Math.pow(a[0], 2) + Math.pow(a[1], 2) + Math.pow(a[2], 2) + Math.pow(a[3], 2) + Math.pow(a[4], 2) + Math.pow(a[5], 2) + 1)
        }, e.add = function(a, b, c) {
            return a[0] = b[0] + c[0], a[1] = b[1] + c[1], a[2] = b[2] + c[2], a[3] = b[3] + c[3], a[4] = b[4] + c[4], a[5] = b[5] + c[5], a
        }, e.subtract = function(a, b, c) {
            return a[0] = b[0] - c[0], a[1] = b[1] - c[1], a[2] = b[2] - c[2], a[3] = b[3] - c[3], a[4] = b[4] - c[4], a[5] = b[5] - c[5], a
        }, e.sub = e.subtract, e.multiplyScalar = function(a, b, c) {
            return a[0] = b[0] * c, a[1] = b[1] * c, a[2] = b[2] * c, a[3] = b[3] * c, a[4] = b[4] * c, a[5] = b[5] * c, a
        }, e.multiplyScalarAndAdd = function(a, b, c, d) {
            return a[0] = b[0] + c[0] * d, a[1] = b[1] + c[1] * d, a[2] = b[2] + c[2] * d, a[3] = b[3] + c[3] * d, a[4] = b[4] + c[4] * d, a[5] = b[5] + c[5] * d, a
        }, e.exactEquals = function(a, b) {
            return a[0] === b[0] && a[1] === b[1] && a[2] === b[2] && a[3] === b[3] && a[4] === b[4] && a[5] === b[5]
        }, e.equals = function(a, b) {
            var c = a[0],
                e = a[1],
                f = a[2],
                g = a[3],
                h = a[4],
                i = a[5],
                j = b[0],
                k = b[1],
                l = b[2],
                m = b[3],
                n = b[4],
                o = b[5];
            return Math.abs(c - j) <= d.EPSILON * Math.max(1, Math.abs(c), Math.abs(j)) && Math.abs(e - k) <= d.EPSILON * Math.max(1, Math.abs(e), Math.abs(k)) && Math.abs(f - l) <= d.EPSILON * Math.max(1, Math.abs(f), Math.abs(l)) && Math.abs(g - m) <= d.EPSILON * Math.max(1, Math.abs(g), Math.abs(m)) && Math.abs(h - n) <= d.EPSILON * Math.max(1, Math.abs(h), Math.abs(n)) && Math.abs(i - o) <= d.EPSILON * Math.max(1, Math.abs(i), Math.abs(o))
        }, c.exports = e, c.exports
    }), a.registerDynamic("2a", ["28"], !0, function(a, b, c) {
        var d = a("28"),
            e = {
                scalar: {},
                SIMD: {}
            };
        return e.create = function() {
            var a = new d.ARRAY_TYPE(16);
            return a[0] = 1, a[1] = 0, a[2] = 0, a[3] = 0, a[4] = 0, a[5] = 1, a[6] = 0, a[7] = 0, a[8] = 0, a[9] = 0, a[10] = 1, a[11] = 0, a[12] = 0, a[13] = 0, a[14] = 0, a[15] = 1, a
        }, e.clone = function(a) {
            var b = new d.ARRAY_TYPE(16);
            return b[0] = a[0], b[1] = a[1], b[2] = a[2], b[3] = a[3], b[4] = a[4], b[5] = a[5], b[6] = a[6], b[7] = a[7], b[8] = a[8], b[9] = a[9], b[10] = a[10], b[11] = a[11], b[12] = a[12], b[13] = a[13], b[14] = a[14], b[15] = a[15], b
        }, e.copy = function(a, b) {
            return a[0] = b[0], a[1] = b[1], a[2] = b[2], a[3] = b[3], a[4] = b[4], a[5] = b[5], a[6] = b[6], a[7] = b[7], a[8] = b[8], a[9] = b[9], a[10] = b[10], a[11] = b[11], a[12] = b[12], a[13] = b[13], a[14] = b[14], a[15] = b[15], a
        }, e.fromValues = function(a, b, c, e, f, g, h, i, j, k, l, m, n, o, p, q) {
            var r = new d.ARRAY_TYPE(16);
            return r[0] = a, r[1] = b, r[2] = c, r[3] = e, r[4] = f, r[5] = g, r[6] = h, r[7] = i, r[8] = j, r[9] = k, r[10] = l, r[11] = m, r[12] = n, r[13] = o, r[14] = p, r[15] = q, r
        }, e.set = function(a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q) {
            return a[0] = b, a[1] = c, a[2] = d, a[3] = e, a[4] = f, a[5] = g, a[6] = h, a[7] = i, a[8] = j, a[9] = k, a[10] = l, a[11] = m, a[12] = n, a[13] = o, a[14] = p, a[15] = q, a
        }, e.identity = function(a) {
            return a[0] = 1, a[1] = 0, a[2] = 0, a[3] = 0, a[4] = 0, a[5] = 1, a[6] = 0, a[7] = 0, a[8] = 0, a[9] = 0, a[10] = 1, a[11] = 0, a[12] = 0, a[13] = 0, a[14] = 0, a[15] = 1, a
        }, e.scalar.transpose = function(a, b) {
            if (a === b) {
                var c = b[1],
                    d = b[2],
                    e = b[3],
                    f = b[6],
                    g = b[7],
                    h = b[11];
                a[1] = b[4], a[2] = b[8], a[3] = b[12], a[4] = c, a[6] = b[9], a[7] = b[13], a[8] = d, a[9] = f, a[11] = b[14], a[12] = e, a[13] = g, a[14] = h
            } else a[0] = b[0], a[1] = b[4], a[2] = b[8], a[3] = b[12], a[4] = b[1], a[5] = b[5], a[6] = b[9], a[7] = b[13], a[8] = b[2], a[9] = b[6], a[10] = b[10], a[11] = b[14], a[12] = b[3], a[13] = b[7], a[14] = b[11], a[15] = b[15];
            return a
        }, e.SIMD.transpose = function(a, b) {
            var c, d, e, f, g, h, i, j, k, l;
            return c = SIMD.Float32x4.load(b, 0), d = SIMD.Float32x4.load(b, 4), e = SIMD.Float32x4.load(b, 8), f = SIMD.Float32x4.load(b, 12), g = SIMD.Float32x4.shuffle(c, d, 0, 1, 4, 5), h = SIMD.Float32x4.shuffle(e, f, 0, 1, 4, 5), i = SIMD.Float32x4.shuffle(g, h, 0, 2, 4, 6), j = SIMD.Float32x4.shuffle(g, h, 1, 3, 5, 7), SIMD.Float32x4.store(a, 0, i), SIMD.Float32x4.store(a, 4, j), g = SIMD.Float32x4.shuffle(c, d, 2, 3, 6, 7), h = SIMD.Float32x4.shuffle(e, f, 2, 3, 6, 7), k = SIMD.Float32x4.shuffle(g, h, 0, 2, 4, 6), l = SIMD.Float32x4.shuffle(g, h, 1, 3, 5, 7), SIMD.Float32x4.store(a, 8, k), SIMD.Float32x4.store(a, 12, l), a
        }, e.transpose = d.USE_SIMD ? e.SIMD.transpose : e.scalar.transpose, e.scalar.invert = function(a, b) {
            var c = b[0],
                d = b[1],
                e = b[2],
                f = b[3],
                g = b[4],
                h = b[5],
                i = b[6],
                j = b[7],
                k = b[8],
                l = b[9],
                m = b[10],
                n = b[11],
                o = b[12],
                p = b[13],
                q = b[14],
                r = b[15],
                s = c * h - d * g,
                t = c * i - e * g,
                u = c * j - f * g,
                v = d * i - e * h,
                w = d * j - f * h,
                x = e * j - f * i,
                y = k * p - l * o,
                z = k * q - m * o,
                A = k * r - n * o,
                B = l * q - m * p,
                C = l * r - n * p,
                D = m * r - n * q,
                E = s * D - t * C + u * B + v * A - w * z + x * y;
            return E ? (E = 1 / E, a[0] = (h * D - i * C + j * B) * E, a[1] = (e * C - d * D - f * B) * E, a[2] = (p * x - q * w + r * v) * E, a[3] = (m * w - l * x - n * v) * E, a[4] = (i * A - g * D - j * z) * E, a[5] = (c * D - e * A + f * z) * E, a[6] = (q * u - o * x - r * t) * E, a[7] = (k * x - m * u + n * t) * E, a[8] = (g * C - h * A + j * y) * E, a[9] = (d * A - c * C - f * y) * E, a[10] = (o * w - p * u + r * s) * E, a[11] = (l * u - k * w - n * s) * E, a[12] = (h * z - g * B - i * y) * E, a[13] = (c * B - d * z + e * y) * E, a[14] = (p * t - o * v - q * s) * E, a[15] = (k * v - l * t + m * s) * E, a) : null
        }, e.SIMD.invert = function(a, b) {
            var c, d, e, f, g, h, i, j, k, l, m = SIMD.Float32x4.load(b, 0),
                n = SIMD.Float32x4.load(b, 4),
                o = SIMD.Float32x4.load(b, 8),
                p = SIMD.Float32x4.load(b, 12);
            return g = SIMD.Float32x4.shuffle(m, n, 0, 1, 4, 5), d = SIMD.Float32x4.shuffle(o, p, 0, 1, 4, 5), c = SIMD.Float32x4.shuffle(g, d, 0, 2, 4, 6), d = SIMD.Float32x4.shuffle(d, g, 1, 3, 5, 7), g = SIMD.Float32x4.shuffle(m, n, 2, 3, 6, 7), f = SIMD.Float32x4.shuffle(o, p, 2, 3, 6, 7), e = SIMD.Float32x4.shuffle(g, f, 0, 2, 4, 6), f = SIMD.Float32x4.shuffle(f, g, 1, 3, 5, 7), g = SIMD.Float32x4.mul(e, f), g = SIMD.Float32x4.swizzle(g, 1, 0, 3, 2), h = SIMD.Float32x4.mul(d, g), i = SIMD.Float32x4.mul(c, g), g = SIMD.Float32x4.swizzle(g, 2, 3, 0, 1), h = SIMD.Float32x4.sub(SIMD.Float32x4.mul(d, g), h), i = SIMD.Float32x4.sub(SIMD.Float32x4.mul(c, g), i), i = SIMD.Float32x4.swizzle(i, 2, 3, 0, 1), g = SIMD.Float32x4.mul(d, e), g = SIMD.Float32x4.swizzle(g, 1, 0, 3, 2), h = SIMD.Float32x4.add(SIMD.Float32x4.mul(f, g), h), k = SIMD.Float32x4.mul(c, g), g = SIMD.Float32x4.swizzle(g, 2, 3, 0, 1), h = SIMD.Float32x4.sub(h, SIMD.Float32x4.mul(f, g)), k = SIMD.Float32x4.sub(SIMD.Float32x4.mul(c, g), k), k = SIMD.Float32x4.swizzle(k, 2, 3, 0, 1), g = SIMD.Float32x4.mul(SIMD.Float32x4.swizzle(d, 2, 3, 0, 1), f), g = SIMD.Float32x4.swizzle(g, 1, 0, 3, 2), e = SIMD.Float32x4.swizzle(e, 2, 3, 0, 1), h = SIMD.Float32x4.add(SIMD.Float32x4.mul(e, g), h), j = SIMD.Float32x4.mul(c, g), g = SIMD.Float32x4.swizzle(g, 2, 3, 0, 1), h = SIMD.Float32x4.sub(h, SIMD.Float32x4.mul(e, g)), j = SIMD.Float32x4.sub(SIMD.Float32x4.mul(c, g), j), j = SIMD.Float32x4.swizzle(j, 2, 3, 0, 1), g = SIMD.Float32x4.mul(c, d), g = SIMD.Float32x4.swizzle(g, 1, 0, 3, 2), j = SIMD.Float32x4.add(SIMD.Float32x4.mul(f, g), j), k = SIMD.Float32x4.sub(SIMD.Float32x4.mul(e, g), k), g = SIMD.Float32x4.swizzle(g, 2, 3, 0, 1), j = SIMD.Float32x4.sub(SIMD.Float32x4.mul(f, g), j), k = SIMD.Float32x4.sub(k, SIMD.Float32x4.mul(e, g)), g = SIMD.Float32x4.mul(c, f), g = SIMD.Float32x4.swizzle(g, 1, 0, 3, 2), i = SIMD.Float32x4.sub(i, SIMD.Float32x4.mul(e, g)), j = SIMD.Float32x4.add(SIMD.Float32x4.mul(d, g), j), g = SIMD.Float32x4.swizzle(g, 2, 3, 0, 1), i = SIMD.Float32x4.add(SIMD.Float32x4.mul(e, g), i), j = SIMD.Float32x4.sub(j, SIMD.Float32x4.mul(d, g)), g = SIMD.Float32x4.mul(c, e), g = SIMD.Float32x4.swizzle(g, 1, 0, 3, 2), i = SIMD.Float32x4.add(SIMD.Float32x4.mul(f, g), i), k = SIMD.Float32x4.sub(k, SIMD.Float32x4.mul(d, g)), g = SIMD.Float32x4.swizzle(g, 2, 3, 0, 1), i = SIMD.Float32x4.sub(i, SIMD.Float32x4.mul(f, g)), k = SIMD.Float32x4.add(SIMD.Float32x4.mul(d, g), k), l = SIMD.Float32x4.mul(c, h), l = SIMD.Float32x4.add(SIMD.Float32x4.swizzle(l, 2, 3, 0, 1), l), l = SIMD.Float32x4.add(SIMD.Float32x4.swizzle(l, 1, 0, 3, 2), l), g = SIMD.Float32x4.reciprocalApproximation(l), l = SIMD.Float32x4.sub(SIMD.Float32x4.add(g, g), SIMD.Float32x4.mul(l, SIMD.Float32x4.mul(g, g))), (l = SIMD.Float32x4.swizzle(l, 0, 0, 0, 0)) ? (SIMD.Float32x4.store(a, 0, SIMD.Float32x4.mul(l, h)), SIMD.Float32x4.store(a, 4, SIMD.Float32x4.mul(l, i)), SIMD.Float32x4.store(a, 8, SIMD.Float32x4.mul(l, j)), SIMD.Float32x4.store(a, 12, SIMD.Float32x4.mul(l, k)), a) : null
        }, e.invert = d.USE_SIMD ? e.SIMD.invert : e.scalar.invert, e.scalar.adjoint = function(a, b) {
            var c = b[0],
                d = b[1],
                e = b[2],
                f = b[3],
                g = b[4],
                h = b[5],
                i = b[6],
                j = b[7],
                k = b[8],
                l = b[9],
                m = b[10],
                n = b[11],
                o = b[12],
                p = b[13],
                q = b[14],
                r = b[15];
            return a[0] = h * (m * r - n * q) - l * (i * r - j * q) + p * (i * n - j * m), a[1] = -(d * (m * r - n * q) - l * (e * r - f * q) + p * (e * n - f * m)), a[2] = d * (i * r - j * q) - h * (e * r - f * q) + p * (e * j - f * i), a[3] = -(d * (i * n - j * m) - h * (e * n - f * m) + l * (e * j - f * i)), a[4] = -(g * (m * r - n * q) - k * (i * r - j * q) + o * (i * n - j * m)), a[5] = c * (m * r - n * q) - k * (e * r - f * q) + o * (e * n - f * m), a[6] = -(c * (i * r - j * q) - g * (e * r - f * q) + o * (e * j - f * i)), a[7] = c * (i * n - j * m) - g * (e * n - f * m) + k * (e * j - f * i), a[8] = g * (l * r - n * p) - k * (h * r - j * p) + o * (h * n - j * l), a[9] = -(c * (l * r - n * p) - k * (d * r - f * p) + o * (d * n - f * l)), a[10] = c * (h * r - j * p) - g * (d * r - f * p) + o * (d * j - f * h), a[11] = -(c * (h * n - j * l) - g * (d * n - f * l) + k * (d * j - f * h)), a[12] = -(g * (l * q - m * p) - k * (h * q - i * p) + o * (h * m - i * l)), a[13] = c * (l * q - m * p) - k * (d * q - e * p) + o * (d * m - e * l), a[14] = -(c * (h * q - i * p) - g * (d * q - e * p) + o * (d * i - e * h)), a[15] = c * (h * m - i * l) - g * (d * m - e * l) + k * (d * i - e * h), a
        }, e.SIMD.adjoint = function(a, b) {
            var c, d, e, f, g, h, i, j, k, l, m, n, o, c = SIMD.Float32x4.load(b, 0),
                d = SIMD.Float32x4.load(b, 4),
                e = SIMD.Float32x4.load(b, 8),
                f = SIMD.Float32x4.load(b, 12);
            return k = SIMD.Float32x4.shuffle(c, d, 0, 1, 4, 5), h = SIMD.Float32x4.shuffle(e, f, 0, 1, 4, 5), g = SIMD.Float32x4.shuffle(k, h, 0, 2, 4, 6), h = SIMD.Float32x4.shuffle(h, k, 1, 3, 5, 7), k = SIMD.Float32x4.shuffle(c, d, 2, 3, 6, 7), j = SIMD.Float32x4.shuffle(e, f, 2, 3, 6, 7), i = SIMD.Float32x4.shuffle(k, j, 0, 2, 4, 6), j = SIMD.Float32x4.shuffle(j, k, 1, 3, 5, 7), k = SIMD.Float32x4.mul(i, j), k = SIMD.Float32x4.swizzle(k, 1, 0, 3, 2), l = SIMD.Float32x4.mul(h, k), m = SIMD.Float32x4.mul(g, k), k = SIMD.Float32x4.swizzle(k, 2, 3, 0, 1), l = SIMD.Float32x4.sub(SIMD.Float32x4.mul(h, k), l), m = SIMD.Float32x4.sub(SIMD.Float32x4.mul(g, k), m), m = SIMD.Float32x4.swizzle(m, 2, 3, 0, 1), k = SIMD.Float32x4.mul(h, i), k = SIMD.Float32x4.swizzle(k, 1, 0, 3, 2), l = SIMD.Float32x4.add(SIMD.Float32x4.mul(j, k), l), o = SIMD.Float32x4.mul(g, k), k = SIMD.Float32x4.swizzle(k, 2, 3, 0, 1), l = SIMD.Float32x4.sub(l, SIMD.Float32x4.mul(j, k)), o = SIMD.Float32x4.sub(SIMD.Float32x4.mul(g, k), o), o = SIMD.Float32x4.swizzle(o, 2, 3, 0, 1), k = SIMD.Float32x4.mul(SIMD.Float32x4.swizzle(h, 2, 3, 0, 1), j), k = SIMD.Float32x4.swizzle(k, 1, 0, 3, 2), i = SIMD.Float32x4.swizzle(i, 2, 3, 0, 1), l = SIMD.Float32x4.add(SIMD.Float32x4.mul(i, k), l), n = SIMD.Float32x4.mul(g, k), k = SIMD.Float32x4.swizzle(k, 2, 3, 0, 1), l = SIMD.Float32x4.sub(l, SIMD.Float32x4.mul(i, k)), n = SIMD.Float32x4.sub(SIMD.Float32x4.mul(g, k), n), n = SIMD.Float32x4.swizzle(n, 2, 3, 0, 1), k = SIMD.Float32x4.mul(g, h), k = SIMD.Float32x4.swizzle(k, 1, 0, 3, 2), n = SIMD.Float32x4.add(SIMD.Float32x4.mul(j, k), n), o = SIMD.Float32x4.sub(SIMD.Float32x4.mul(i, k), o), k = SIMD.Float32x4.swizzle(k, 2, 3, 0, 1), n = SIMD.Float32x4.sub(SIMD.Float32x4.mul(j, k), n), o = SIMD.Float32x4.sub(o, SIMD.Float32x4.mul(i, k)), k = SIMD.Float32x4.mul(g, j), k = SIMD.Float32x4.swizzle(k, 1, 0, 3, 2), m = SIMD.Float32x4.sub(m, SIMD.Float32x4.mul(i, k)), n = SIMD.Float32x4.add(SIMD.Float32x4.mul(h, k), n), k = SIMD.Float32x4.swizzle(k, 2, 3, 0, 1), m = SIMD.Float32x4.add(SIMD.Float32x4.mul(i, k), m), n = SIMD.Float32x4.sub(n, SIMD.Float32x4.mul(h, k)), k = SIMD.Float32x4.mul(g, i), k = SIMD.Float32x4.swizzle(k, 1, 0, 3, 2), m = SIMD.Float32x4.add(SIMD.Float32x4.mul(j, k), m), o = SIMD.Float32x4.sub(o, SIMD.Float32x4.mul(h, k)), k = SIMD.Float32x4.swizzle(k, 2, 3, 0, 1), m = SIMD.Float32x4.sub(m, SIMD.Float32x4.mul(j, k)), o = SIMD.Float32x4.add(SIMD.Float32x4.mul(h, k), o), SIMD.Float32x4.store(a, 0, l), SIMD.Float32x4.store(a, 4, m), SIMD.Float32x4.store(a, 8, n), SIMD.Float32x4.store(a, 12, o), a
        }, e.adjoint = d.USE_SIMD ? e.SIMD.adjoint : e.scalar.adjoint, e.determinant = function(a) {
            var b = a[0],
                c = a[1],
                d = a[2],
                e = a[3],
                f = a[4],
                g = a[5],
                h = a[6],
                i = a[7],
                j = a[8],
                k = a[9],
                l = a[10],
                m = a[11],
                n = a[12],
                o = a[13],
                p = a[14],
                q = a[15],
                r = b * g - c * f,
                s = b * h - d * f,
                t = b * i - e * f,
                u = c * h - d * g,
                v = c * i - e * g,
                w = d * i - e * h,
                x = j * o - k * n,
                y = j * p - l * n,
                z = j * q - m * n,
                A = k * p - l * o,
                B = k * q - m * o,
                C = l * q - m * p;
            return r * C - s * B + t * A + u * z - v * y + w * x
        }, e.SIMD.multiply = function(a, b, c) {
            var d = SIMD.Float32x4.load(b, 0),
                e = SIMD.Float32x4.load(b, 4),
                f = SIMD.Float32x4.load(b, 8),
                g = SIMD.Float32x4.load(b, 12),
                h = SIMD.Float32x4.load(c, 0),
                i = SIMD.Float32x4.add(SIMD.Float32x4.mul(SIMD.Float32x4.swizzle(h, 0, 0, 0, 0), d), SIMD.Float32x4.add(SIMD.Float32x4.mul(SIMD.Float32x4.swizzle(h, 1, 1, 1, 1), e), SIMD.Float32x4.add(SIMD.Float32x4.mul(SIMD.Float32x4.swizzle(h, 2, 2, 2, 2), f), SIMD.Float32x4.mul(SIMD.Float32x4.swizzle(h, 3, 3, 3, 3), g))));
            SIMD.Float32x4.store(a, 0, i);
            var j = SIMD.Float32x4.load(c, 4),
                k = SIMD.Float32x4.add(SIMD.Float32x4.mul(SIMD.Float32x4.swizzle(j, 0, 0, 0, 0), d), SIMD.Float32x4.add(SIMD.Float32x4.mul(SIMD.Float32x4.swizzle(j, 1, 1, 1, 1), e), SIMD.Float32x4.add(SIMD.Float32x4.mul(SIMD.Float32x4.swizzle(j, 2, 2, 2, 2), f), SIMD.Float32x4.mul(SIMD.Float32x4.swizzle(j, 3, 3, 3, 3), g))));
            SIMD.Float32x4.store(a, 4, k);
            var l = SIMD.Float32x4.load(c, 8),
                m = SIMD.Float32x4.add(SIMD.Float32x4.mul(SIMD.Float32x4.swizzle(l, 0, 0, 0, 0), d), SIMD.Float32x4.add(SIMD.Float32x4.mul(SIMD.Float32x4.swizzle(l, 1, 1, 1, 1), e), SIMD.Float32x4.add(SIMD.Float32x4.mul(SIMD.Float32x4.swizzle(l, 2, 2, 2, 2), f), SIMD.Float32x4.mul(SIMD.Float32x4.swizzle(l, 3, 3, 3, 3), g))));
            SIMD.Float32x4.store(a, 8, m);
            var n = SIMD.Float32x4.load(c, 12),
                o = SIMD.Float32x4.add(SIMD.Float32x4.mul(SIMD.Float32x4.swizzle(n, 0, 0, 0, 0), d), SIMD.Float32x4.add(SIMD.Float32x4.mul(SIMD.Float32x4.swizzle(n, 1, 1, 1, 1), e), SIMD.Float32x4.add(SIMD.Float32x4.mul(SIMD.Float32x4.swizzle(n, 2, 2, 2, 2), f), SIMD.Float32x4.mul(SIMD.Float32x4.swizzle(n, 3, 3, 3, 3), g))));
            return SIMD.Float32x4.store(a, 12, o), a
        }, e.scalar.multiply = function(a, b, c) {
            var d = b[0],
                e = b[1],
                f = b[2],
                g = b[3],
                h = b[4],
                i = b[5],
                j = b[6],
                k = b[7],
                l = b[8],
                m = b[9],
                n = b[10],
                o = b[11],
                p = b[12],
                q = b[13],
                r = b[14],
                s = b[15],
                t = c[0],
                u = c[1],
                v = c[2],
                w = c[3];
            return a[0] = t * d + u * h + v * l + w * p, a[1] = t * e + u * i + v * m + w * q, a[2] = t * f + u * j + v * n + w * r, a[3] = t * g + u * k + v * o + w * s, t = c[4], u = c[5], v = c[6], w = c[7], a[4] = t * d + u * h + v * l + w * p, a[5] = t * e + u * i + v * m + w * q, a[6] = t * f + u * j + v * n + w * r, a[7] = t * g + u * k + v * o + w * s, t = c[8], u = c[9], v = c[10], w = c[11], a[8] = t * d + u * h + v * l + w * p, a[9] = t * e + u * i + v * m + w * q, a[10] = t * f + u * j + v * n + w * r, a[11] = t * g + u * k + v * o + w * s, t = c[12], u = c[13], v = c[14], w = c[15], a[12] = t * d + u * h + v * l + w * p, a[13] = t * e + u * i + v * m + w * q, a[14] = t * f + u * j + v * n + w * r, a[15] = t * g + u * k + v * o + w * s, a
        }, e.multiply = d.USE_SIMD ? e.SIMD.multiply : e.scalar.multiply, e.mul = e.multiply, e.scalar.translate = function(a, b, c) {
            var d, e, f, g, h, i, j, k, l, m, n, o, p = c[0],
                q = c[1],
                r = c[2];
            return b === a ? (a[12] = b[0] * p + b[4] * q + b[8] * r + b[12], a[13] = b[1] * p + b[5] * q + b[9] * r + b[13], a[14] = b[2] * p + b[6] * q + b[10] * r + b[14],
                a[15] = b[3] * p + b[7] * q + b[11] * r + b[15]) : (d = b[0], e = b[1], f = b[2], g = b[3], h = b[4], i = b[5], j = b[6], k = b[7], l = b[8], m = b[9], n = b[10], o = b[11], a[0] = d, a[1] = e, a[2] = f, a[3] = g, a[4] = h, a[5] = i, a[6] = j, a[7] = k, a[8] = l, a[9] = m, a[10] = n, a[11] = o, a[12] = d * p + h * q + l * r + b[12], a[13] = e * p + i * q + m * r + b[13], a[14] = f * p + j * q + n * r + b[14], a[15] = g * p + k * q + o * r + b[15]), a
        }, e.SIMD.translate = function(a, b, c) {
            var d = SIMD.Float32x4.load(b, 0),
                e = SIMD.Float32x4.load(b, 4),
                f = SIMD.Float32x4.load(b, 8),
                g = SIMD.Float32x4.load(b, 12),
                h = SIMD.Float32x4(c[0], c[1], c[2], 0);
            b !== a && (a[0] = b[0], a[1] = b[1], a[2] = b[2], a[3] = b[3], a[4] = b[4], a[5] = b[5], a[6] = b[6], a[7] = b[7], a[8] = b[8], a[9] = b[9], a[10] = b[10], a[11] = b[11]), d = SIMD.Float32x4.mul(d, SIMD.Float32x4.swizzle(h, 0, 0, 0, 0)), e = SIMD.Float32x4.mul(e, SIMD.Float32x4.swizzle(h, 1, 1, 1, 1)), f = SIMD.Float32x4.mul(f, SIMD.Float32x4.swizzle(h, 2, 2, 2, 2));
            var i = SIMD.Float32x4.add(d, SIMD.Float32x4.add(e, SIMD.Float32x4.add(f, g)));
            return SIMD.Float32x4.store(a, 12, i), a
        }, e.translate = d.USE_SIMD ? e.SIMD.translate : e.scalar.translate, e.scalar.scale = function(a, b, c) {
            var d = c[0],
                e = c[1],
                f = c[2];
            return a[0] = b[0] * d, a[1] = b[1] * d, a[2] = b[2] * d, a[3] = b[3] * d, a[4] = b[4] * e, a[5] = b[5] * e, a[6] = b[6] * e, a[7] = b[7] * e, a[8] = b[8] * f, a[9] = b[9] * f, a[10] = b[10] * f, a[11] = b[11] * f, a[12] = b[12], a[13] = b[13], a[14] = b[14], a[15] = b[15], a
        }, e.SIMD.scale = function(a, b, c) {
            var d, e, f, g = SIMD.Float32x4(c[0], c[1], c[2], 0);
            return d = SIMD.Float32x4.load(b, 0), SIMD.Float32x4.store(a, 0, SIMD.Float32x4.mul(d, SIMD.Float32x4.swizzle(g, 0, 0, 0, 0))), e = SIMD.Float32x4.load(b, 4), SIMD.Float32x4.store(a, 4, SIMD.Float32x4.mul(e, SIMD.Float32x4.swizzle(g, 1, 1, 1, 1))), f = SIMD.Float32x4.load(b, 8), SIMD.Float32x4.store(a, 8, SIMD.Float32x4.mul(f, SIMD.Float32x4.swizzle(g, 2, 2, 2, 2))), a[12] = b[12], a[13] = b[13], a[14] = b[14], a[15] = b[15], a
        }, e.scale = d.USE_SIMD ? e.SIMD.scale : e.scalar.scale, e.rotate = function(a, b, c, e) {
            var f, g, h, i, j, k, l, m, n, o, p, q, r, s, t, u, v, w, x, y, z, A, B, C, D = e[0],
                E = e[1],
                F = e[2],
                G = Math.sqrt(D * D + E * E + F * F);
            return Math.abs(G) < d.EPSILON ? null : (G = 1 / G, D *= G, E *= G, F *= G, f = Math.sin(c), g = Math.cos(c), h = 1 - g, i = b[0], j = b[1], k = b[2], l = b[3], m = b[4], n = b[5], o = b[6], p = b[7], q = b[8], r = b[9], s = b[10], t = b[11], u = D * D * h + g, v = E * D * h + F * f, w = F * D * h - E * f, x = D * E * h - F * f, y = E * E * h + g, z = F * E * h + D * f, A = D * F * h + E * f, B = E * F * h - D * f, C = F * F * h + g, a[0] = i * u + m * v + q * w, a[1] = j * u + n * v + r * w, a[2] = k * u + o * v + s * w, a[3] = l * u + p * v + t * w, a[4] = i * x + m * y + q * z, a[5] = j * x + n * y + r * z, a[6] = k * x + o * y + s * z, a[7] = l * x + p * y + t * z, a[8] = i * A + m * B + q * C, a[9] = j * A + n * B + r * C, a[10] = k * A + o * B + s * C, a[11] = l * A + p * B + t * C, b !== a && (a[12] = b[12], a[13] = b[13], a[14] = b[14], a[15] = b[15]), a)
        }, e.scalar.rotateX = function(a, b, c) {
            var d = Math.sin(c),
                e = Math.cos(c),
                f = b[4],
                g = b[5],
                h = b[6],
                i = b[7],
                j = b[8],
                k = b[9],
                l = b[10],
                m = b[11];
            return b !== a && (a[0] = b[0], a[1] = b[1], a[2] = b[2], a[3] = b[3], a[12] = b[12], a[13] = b[13], a[14] = b[14], a[15] = b[15]), a[4] = f * e + j * d, a[5] = g * e + k * d, a[6] = h * e + l * d, a[7] = i * e + m * d, a[8] = j * e - f * d, a[9] = k * e - g * d, a[10] = l * e - h * d, a[11] = m * e - i * d, a
        }, e.SIMD.rotateX = function(a, b, c) {
            var d = SIMD.Float32x4.splat(Math.sin(c)),
                e = SIMD.Float32x4.splat(Math.cos(c));
            b !== a && (a[0] = b[0], a[1] = b[1], a[2] = b[2], a[3] = b[3], a[12] = b[12], a[13] = b[13], a[14] = b[14], a[15] = b[15]);
            var f = SIMD.Float32x4.load(b, 4),
                g = SIMD.Float32x4.load(b, 8);
            return SIMD.Float32x4.store(a, 4, SIMD.Float32x4.add(SIMD.Float32x4.mul(f, e), SIMD.Float32x4.mul(g, d))), SIMD.Float32x4.store(a, 8, SIMD.Float32x4.sub(SIMD.Float32x4.mul(g, e), SIMD.Float32x4.mul(f, d))), a
        }, e.rotateX = d.USE_SIMD ? e.SIMD.rotateX : e.scalar.rotateX, e.scalar.rotateY = function(a, b, c) {
            var d = Math.sin(c),
                e = Math.cos(c),
                f = b[0],
                g = b[1],
                h = b[2],
                i = b[3],
                j = b[8],
                k = b[9],
                l = b[10],
                m = b[11];
            return b !== a && (a[4] = b[4], a[5] = b[5], a[6] = b[6], a[7] = b[7], a[12] = b[12], a[13] = b[13], a[14] = b[14], a[15] = b[15]), a[0] = f * e - j * d, a[1] = g * e - k * d, a[2] = h * e - l * d, a[3] = i * e - m * d, a[8] = f * d + j * e, a[9] = g * d + k * e, a[10] = h * d + l * e, a[11] = i * d + m * e, a
        }, e.SIMD.rotateY = function(a, b, c) {
            var d = SIMD.Float32x4.splat(Math.sin(c)),
                e = SIMD.Float32x4.splat(Math.cos(c));
            b !== a && (a[4] = b[4], a[5] = b[5], a[6] = b[6], a[7] = b[7], a[12] = b[12], a[13] = b[13], a[14] = b[14], a[15] = b[15]);
            var f = SIMD.Float32x4.load(b, 0),
                g = SIMD.Float32x4.load(b, 8);
            return SIMD.Float32x4.store(a, 0, SIMD.Float32x4.sub(SIMD.Float32x4.mul(f, e), SIMD.Float32x4.mul(g, d))), SIMD.Float32x4.store(a, 8, SIMD.Float32x4.add(SIMD.Float32x4.mul(f, d), SIMD.Float32x4.mul(g, e))), a
        }, e.rotateY = d.USE_SIMD ? e.SIMD.rotateY : e.scalar.rotateY, e.scalar.rotateZ = function(a, b, c) {
            var d = Math.sin(c),
                e = Math.cos(c),
                f = b[0],
                g = b[1],
                h = b[2],
                i = b[3],
                j = b[4],
                k = b[5],
                l = b[6],
                m = b[7];
            return b !== a && (a[8] = b[8], a[9] = b[9], a[10] = b[10], a[11] = b[11], a[12] = b[12], a[13] = b[13], a[14] = b[14], a[15] = b[15]), a[0] = f * e + j * d, a[1] = g * e + k * d, a[2] = h * e + l * d, a[3] = i * e + m * d, a[4] = j * e - f * d, a[5] = k * e - g * d, a[6] = l * e - h * d, a[7] = m * e - i * d, a
        }, e.SIMD.rotateZ = function(a, b, c) {
            var d = SIMD.Float32x4.splat(Math.sin(c)),
                e = SIMD.Float32x4.splat(Math.cos(c));
            b !== a && (a[8] = b[8], a[9] = b[9], a[10] = b[10], a[11] = b[11], a[12] = b[12], a[13] = b[13], a[14] = b[14], a[15] = b[15]);
            var f = SIMD.Float32x4.load(b, 0),
                g = SIMD.Float32x4.load(b, 4);
            return SIMD.Float32x4.store(a, 0, SIMD.Float32x4.add(SIMD.Float32x4.mul(f, e), SIMD.Float32x4.mul(g, d))), SIMD.Float32x4.store(a, 4, SIMD.Float32x4.sub(SIMD.Float32x4.mul(g, e), SIMD.Float32x4.mul(f, d))), a
        }, e.rotateZ = d.USE_SIMD ? e.SIMD.rotateZ : e.scalar.rotateZ, e.fromTranslation = function(a, b) {
            return a[0] = 1, a[1] = 0, a[2] = 0, a[3] = 0, a[4] = 0, a[5] = 1, a[6] = 0, a[7] = 0, a[8] = 0, a[9] = 0, a[10] = 1, a[11] = 0, a[12] = b[0], a[13] = b[1], a[14] = b[2], a[15] = 1, a
        }, e.fromScaling = function(a, b) {
            return a[0] = b[0], a[1] = 0, a[2] = 0, a[3] = 0, a[4] = 0, a[5] = b[1], a[6] = 0, a[7] = 0, a[8] = 0, a[9] = 0, a[10] = b[2], a[11] = 0, a[12] = 0, a[13] = 0, a[14] = 0, a[15] = 1, a
        }, e.fromRotation = function(a, b, c) {
            var e, f, g, h = c[0],
                i = c[1],
                j = c[2],
                k = Math.sqrt(h * h + i * i + j * j);
            return Math.abs(k) < d.EPSILON ? null : (k = 1 / k, h *= k, i *= k, j *= k, e = Math.sin(b), f = Math.cos(b), g = 1 - f, a[0] = h * h * g + f, a[1] = i * h * g + j * e, a[2] = j * h * g - i * e, a[3] = 0, a[4] = h * i * g - j * e, a[5] = i * i * g + f, a[6] = j * i * g + h * e, a[7] = 0, a[8] = h * j * g + i * e, a[9] = i * j * g - h * e, a[10] = j * j * g + f, a[11] = 0, a[12] = 0, a[13] = 0, a[14] = 0, a[15] = 1, a)
        }, e.fromXRotation = function(a, b) {
            var c = Math.sin(b),
                d = Math.cos(b);
            return a[0] = 1, a[1] = 0, a[2] = 0, a[3] = 0, a[4] = 0, a[5] = d, a[6] = c, a[7] = 0, a[8] = 0, a[9] = -c, a[10] = d, a[11] = 0, a[12] = 0, a[13] = 0, a[14] = 0, a[15] = 1, a
        }, e.fromYRotation = function(a, b) {
            var c = Math.sin(b),
                d = Math.cos(b);
            return a[0] = d, a[1] = 0, a[2] = -c, a[3] = 0, a[4] = 0, a[5] = 1, a[6] = 0, a[7] = 0, a[8] = c, a[9] = 0, a[10] = d, a[11] = 0, a[12] = 0, a[13] = 0, a[14] = 0, a[15] = 1, a
        }, e.fromZRotation = function(a, b) {
            var c = Math.sin(b),
                d = Math.cos(b);
            return a[0] = d, a[1] = c, a[2] = 0, a[3] = 0, a[4] = -c, a[5] = d, a[6] = 0, a[7] = 0, a[8] = 0, a[9] = 0, a[10] = 1, a[11] = 0, a[12] = 0, a[13] = 0, a[14] = 0, a[15] = 1, a
        }, e.fromRotationTranslation = function(a, b, c) {
            var d = b[0],
                e = b[1],
                f = b[2],
                g = b[3],
                h = d + d,
                i = e + e,
                j = f + f,
                k = d * h,
                l = d * i,
                m = d * j,
                n = e * i,
                o = e * j,
                p = f * j,
                q = g * h,
                r = g * i,
                s = g * j;
            return a[0] = 1 - (n + p), a[1] = l + s, a[2] = m - r, a[3] = 0, a[4] = l - s, a[5] = 1 - (k + p), a[6] = o + q, a[7] = 0, a[8] = m + r, a[9] = o - q, a[10] = 1 - (k + n), a[11] = 0, a[12] = c[0], a[13] = c[1], a[14] = c[2], a[15] = 1, a
        }, e.getTranslation = function(a, b) {
            return a[0] = b[12], a[1] = b[13], a[2] = b[14], a
        }, e.getRotation = function(a, b) {
            var c = b[0] + b[5] + b[10],
                d = 0;
            return c > 0 ? (d = 2 * Math.sqrt(c + 1), a[3] = .25 * d, a[0] = (b[6] - b[9]) / d, a[1] = (b[8] - b[2]) / d, a[2] = (b[1] - b[4]) / d) : b[0] > b[5] & b[0] > b[10] ? (d = 2 * Math.sqrt(1 + b[0] - b[5] - b[10]), a[3] = (b[6] - b[9]) / d, a[0] = .25 * d, a[1] = (b[1] + b[4]) / d, a[2] = (b[8] + b[2]) / d) : b[5] > b[10] ? (d = 2 * Math.sqrt(1 + b[5] - b[0] - b[10]), a[3] = (b[8] - b[2]) / d, a[0] = (b[1] + b[4]) / d, a[1] = .25 * d, a[2] = (b[6] + b[9]) / d) : (d = 2 * Math.sqrt(1 + b[10] - b[0] - b[5]), a[3] = (b[1] - b[4]) / d, a[0] = (b[8] + b[2]) / d, a[1] = (b[6] + b[9]) / d, a[2] = .25 * d), a
        }, e.fromRotationTranslationScale = function(a, b, c, d) {
            var e = b[0],
                f = b[1],
                g = b[2],
                h = b[3],
                i = e + e,
                j = f + f,
                k = g + g,
                l = e * i,
                m = e * j,
                n = e * k,
                o = f * j,
                p = f * k,
                q = g * k,
                r = h * i,
                s = h * j,
                t = h * k,
                u = d[0],
                v = d[1],
                w = d[2];
            return a[0] = (1 - (o + q)) * u, a[1] = (m + t) * u, a[2] = (n - s) * u, a[3] = 0, a[4] = (m - t) * v, a[5] = (1 - (l + q)) * v, a[6] = (p + r) * v, a[7] = 0, a[8] = (n + s) * w, a[9] = (p - r) * w, a[10] = (1 - (l + o)) * w, a[11] = 0, a[12] = c[0], a[13] = c[1], a[14] = c[2], a[15] = 1, a
        }, e.fromRotationTranslationScaleOrigin = function(a, b, c, d, e) {
            var f = b[0],
                g = b[1],
                h = b[2],
                i = b[3],
                j = f + f,
                k = g + g,
                l = h + h,
                m = f * j,
                n = f * k,
                o = f * l,
                p = g * k,
                q = g * l,
                r = h * l,
                s = i * j,
                t = i * k,
                u = i * l,
                v = d[0],
                w = d[1],
                x = d[2],
                y = e[0],
                z = e[1],
                A = e[2];
            return a[0] = (1 - (p + r)) * v, a[1] = (n + u) * v, a[2] = (o - t) * v, a[3] = 0, a[4] = (n - u) * w, a[5] = (1 - (m + r)) * w, a[6] = (q + s) * w, a[7] = 0, a[8] = (o + t) * x, a[9] = (q - s) * x, a[10] = (1 - (m + p)) * x, a[11] = 0, a[12] = c[0] + y - (a[0] * y + a[4] * z + a[8] * A), a[13] = c[1] + z - (a[1] * y + a[5] * z + a[9] * A), a[14] = c[2] + A - (a[2] * y + a[6] * z + a[10] * A), a[15] = 1, a
        }, e.fromQuat = function(a, b) {
            var c = b[0],
                d = b[1],
                e = b[2],
                f = b[3],
                g = c + c,
                h = d + d,
                i = e + e,
                j = c * g,
                k = d * g,
                l = d * h,
                m = e * g,
                n = e * h,
                o = e * i,
                p = f * g,
                q = f * h,
                r = f * i;
            return a[0] = 1 - l - o, a[1] = k + r, a[2] = m - q, a[3] = 0, a[4] = k - r, a[5] = 1 - j - o, a[6] = n + p, a[7] = 0, a[8] = m + q, a[9] = n - p, a[10] = 1 - j - l, a[11] = 0, a[12] = 0, a[13] = 0, a[14] = 0, a[15] = 1, a
        }, e.frustum = function(a, b, c, d, e, f, g) {
            var h = 1 / (c - b),
                i = 1 / (e - d),
                j = 1 / (f - g);
            return a[0] = 2 * f * h, a[1] = 0, a[2] = 0, a[3] = 0, a[4] = 0, a[5] = 2 * f * i, a[6] = 0, a[7] = 0, a[8] = (c + b) * h, a[9] = (e + d) * i, a[10] = (g + f) * j, a[11] = -1, a[12] = 0, a[13] = 0, a[14] = g * f * 2 * j, a[15] = 0, a
        }, e.perspective = function(a, b, c, d, e) {
            var f = 1 / Math.tan(b / 2),
                g = 1 / (d - e);
            return a[0] = f / c, a[1] = 0, a[2] = 0, a[3] = 0, a[4] = 0, a[5] = f, a[6] = 0, a[7] = 0, a[8] = 0, a[9] = 0, a[10] = (e + d) * g, a[11] = -1, a[12] = 0, a[13] = 0, a[14] = 2 * e * d * g, a[15] = 0, a
        }, e.perspectiveFromFieldOfView = function(a, b, c, d) {
            var e = Math.tan(b.upDegrees * Math.PI / 180),
                f = Math.tan(b.downDegrees * Math.PI / 180),
                g = Math.tan(b.leftDegrees * Math.PI / 180),
                h = Math.tan(b.rightDegrees * Math.PI / 180),
                i = 2 / (g + h),
                j = 2 / (e + f);
            return a[0] = i, a[1] = 0, a[2] = 0, a[3] = 0, a[4] = 0, a[5] = j, a[6] = 0, a[7] = 0, a[8] = -((g - h) * i * .5), a[9] = (e - f) * j * .5, a[10] = d / (c - d), a[11] = -1, a[12] = 0, a[13] = 0, a[14] = d * c / (c - d), a[15] = 0, a
        }, e.ortho = function(a, b, c, d, e, f, g) {
            var h = 1 / (b - c),
                i = 1 / (d - e),
                j = 1 / (f - g);
            return a[0] = -2 * h, a[1] = 0, a[2] = 0, a[3] = 0, a[4] = 0, a[5] = -2 * i, a[6] = 0, a[7] = 0, a[8] = 0, a[9] = 0, a[10] = 2 * j, a[11] = 0, a[12] = (b + c) * h, a[13] = (e + d) * i, a[14] = (g + f) * j, a[15] = 1, a
        }, e.lookAt = function(a, b, c, f) {
            var g, h, i, j, k, l, m, n, o, p, q = b[0],
                r = b[1],
                s = b[2],
                t = f[0],
                u = f[1],
                v = f[2],
                w = c[0],
                x = c[1],
                y = c[2];
            return Math.abs(q - w) < d.EPSILON && Math.abs(r - x) < d.EPSILON && Math.abs(s - y) < d.EPSILON ? e.identity(a) : (m = q - w, n = r - x, o = s - y, p = 1 / Math.sqrt(m * m + n * n + o * o), m *= p, n *= p, o *= p, g = u * o - v * n, h = v * m - t * o, i = t * n - u * m, p = Math.sqrt(g * g + h * h + i * i), p ? (p = 1 / p, g *= p, h *= p, i *= p) : (g = 0, h = 0, i = 0), j = n * i - o * h, k = o * g - m * i, l = m * h - n * g, p = Math.sqrt(j * j + k * k + l * l), p ? (p = 1 / p, j *= p, k *= p, l *= p) : (j = 0, k = 0, l = 0), a[0] = g, a[1] = j, a[2] = m, a[3] = 0, a[4] = h, a[5] = k, a[6] = n, a[7] = 0, a[8] = i, a[9] = l, a[10] = o, a[11] = 0, a[12] = -(g * q + h * r + i * s), a[13] = -(j * q + k * r + l * s), a[14] = -(m * q + n * r + o * s), a[15] = 1, a)
        }, e.str = function(a) {
            return "mat4(" + a[0] + ", " + a[1] + ", " + a[2] + ", " + a[3] + ", " + a[4] + ", " + a[5] + ", " + a[6] + ", " + a[7] + ", " + a[8] + ", " + a[9] + ", " + a[10] + ", " + a[11] + ", " + a[12] + ", " + a[13] + ", " + a[14] + ", " + a[15] + ")"
        }, e.frob = function(a) {
            return Math.sqrt(Math.pow(a[0], 2) + Math.pow(a[1], 2) + Math.pow(a[2], 2) + Math.pow(a[3], 2) + Math.pow(a[4], 2) + Math.pow(a[5], 2) + Math.pow(a[6], 2) + Math.pow(a[7], 2) + Math.pow(a[8], 2) + Math.pow(a[9], 2) + Math.pow(a[10], 2) + Math.pow(a[11], 2) + Math.pow(a[12], 2) + Math.pow(a[13], 2) + Math.pow(a[14], 2) + Math.pow(a[15], 2))
        }, e.add = function(a, b, c) {
            return a[0] = b[0] + c[0], a[1] = b[1] + c[1], a[2] = b[2] + c[2], a[3] = b[3] + c[3], a[4] = b[4] + c[4], a[5] = b[5] + c[5], a[6] = b[6] + c[6], a[7] = b[7] + c[7], a[8] = b[8] + c[8], a[9] = b[9] + c[9], a[10] = b[10] + c[10], a[11] = b[11] + c[11], a[12] = b[12] + c[12], a[13] = b[13] + c[13], a[14] = b[14] + c[14], a[15] = b[15] + c[15], a
        }, e.subtract = function(a, b, c) {
            return a[0] = b[0] - c[0], a[1] = b[1] - c[1], a[2] = b[2] - c[2], a[3] = b[3] - c[3], a[4] = b[4] - c[4], a[5] = b[5] - c[5], a[6] = b[6] - c[6], a[7] = b[7] - c[7], a[8] = b[8] - c[8], a[9] = b[9] - c[9], a[10] = b[10] - c[10], a[11] = b[11] - c[11], a[12] = b[12] - c[12], a[13] = b[13] - c[13], a[14] = b[14] - c[14], a[15] = b[15] - c[15], a
        }, e.sub = e.subtract, e.multiplyScalar = function(a, b, c) {
            return a[0] = b[0] * c, a[1] = b[1] * c, a[2] = b[2] * c, a[3] = b[3] * c, a[4] = b[4] * c, a[5] = b[5] * c, a[6] = b[6] * c, a[7] = b[7] * c, a[8] = b[8] * c, a[9] = b[9] * c, a[10] = b[10] * c, a[11] = b[11] * c, a[12] = b[12] * c, a[13] = b[13] * c, a[14] = b[14] * c, a[15] = b[15] * c, a
        }, e.multiplyScalarAndAdd = function(a, b, c, d) {
            return a[0] = b[0] + c[0] * d, a[1] = b[1] + c[1] * d, a[2] = b[2] + c[2] * d, a[3] = b[3] + c[3] * d, a[4] = b[4] + c[4] * d, a[5] = b[5] + c[5] * d, a[6] = b[6] + c[6] * d, a[7] = b[7] + c[7] * d, a[8] = b[8] + c[8] * d, a[9] = b[9] + c[9] * d, a[10] = b[10] + c[10] * d, a[11] = b[11] + c[11] * d, a[12] = b[12] + c[12] * d, a[13] = b[13] + c[13] * d, a[14] = b[14] + c[14] * d, a[15] = b[15] + c[15] * d, a
        }, e.exactEquals = function(a, b) {
            return a[0] === b[0] && a[1] === b[1] && a[2] === b[2] && a[3] === b[3] && a[4] === b[4] && a[5] === b[5] && a[6] === b[6] && a[7] === b[7] && a[8] === b[8] && a[9] === b[9] && a[10] === b[10] && a[11] === b[11] && a[12] === b[12] && a[13] === b[13] && a[14] === b[14] && a[15] === b[15]
        }, e.equals = function(a, b) {
            var c = a[0],
                e = a[1],
                f = a[2],
                g = a[3],
                h = a[4],
                i = a[5],
                j = a[6],
                k = a[7],
                l = a[8],
                m = a[9],
                n = a[10],
                o = a[11],
                p = a[12],
                q = a[13],
                r = a[14],
                s = a[15],
                t = b[0],
                u = b[1],
                v = b[2],
                w = b[3],
                x = b[4],
                y = b[5],
                z = b[6],
                A = b[7],
                B = b[8],
                C = b[9],
                D = b[10],
                E = b[11],
                F = b[12],
                G = b[13],
                H = b[14],
                I = b[15];
            return Math.abs(c - t) <= d.EPSILON * Math.max(1, Math.abs(c), Math.abs(t)) && Math.abs(e - u) <= d.EPSILON * Math.max(1, Math.abs(e), Math.abs(u)) && Math.abs(f - v) <= d.EPSILON * Math.max(1, Math.abs(f), Math.abs(v)) && Math.abs(g - w) <= d.EPSILON * Math.max(1, Math.abs(g), Math.abs(w)) && Math.abs(h - x) <= d.EPSILON * Math.max(1, Math.abs(h), Math.abs(x)) && Math.abs(i - y) <= d.EPSILON * Math.max(1, Math.abs(i), Math.abs(y)) && Math.abs(j - z) <= d.EPSILON * Math.max(1, Math.abs(j), Math.abs(z)) && Math.abs(k - A) <= d.EPSILON * Math.max(1, Math.abs(k), Math.abs(A)) && Math.abs(l - B) <= d.EPSILON * Math.max(1, Math.abs(l), Math.abs(B)) && Math.abs(m - C) <= d.EPSILON * Math.max(1, Math.abs(m), Math.abs(C)) && Math.abs(n - D) <= d.EPSILON * Math.max(1, Math.abs(n), Math.abs(D)) && Math.abs(o - E) <= d.EPSILON * Math.max(1, Math.abs(o), Math.abs(E)) && Math.abs(p - F) <= d.EPSILON * Math.max(1, Math.abs(p), Math.abs(F)) && Math.abs(q - G) <= d.EPSILON * Math.max(1, Math.abs(q), Math.abs(G)) && Math.abs(r - H) <= d.EPSILON * Math.max(1, Math.abs(r), Math.abs(H)) && Math.abs(s - I) <= d.EPSILON * Math.max(1, Math.abs(s), Math.abs(I))
        }, c.exports = e, c.exports
    }), a.registerDynamic("2b", ["28"], !0, function(a, b, c) {
        var d = a("28"),
            e = {};
        return e.create = function() {
            var a = new d.ARRAY_TYPE(9);
            return a[0] = 1, a[1] = 0, a[2] = 0, a[3] = 0, a[4] = 1, a[5] = 0, a[6] = 0, a[7] = 0, a[8] = 1, a
        }, e.fromMat4 = function(a, b) {
            return a[0] = b[0], a[1] = b[1], a[2] = b[2], a[3] = b[4], a[4] = b[5], a[5] = b[6], a[6] = b[8], a[7] = b[9], a[8] = b[10], a
        }, e.clone = function(a) {
            var b = new d.ARRAY_TYPE(9);
            return b[0] = a[0], b[1] = a[1], b[2] = a[2], b[3] = a[3], b[4] = a[4], b[5] = a[5], b[6] = a[6], b[7] = a[7], b[8] = a[8], b
        }, e.copy = function(a, b) {
            return a[0] = b[0], a[1] = b[1], a[2] = b[2], a[3] = b[3], a[4] = b[4], a[5] = b[5], a[6] = b[6], a[7] = b[7], a[8] = b[8], a
        }, e.fromValues = function(a, b, c, e, f, g, h, i, j) {
            var k = new d.ARRAY_TYPE(9);
            return k[0] = a, k[1] = b, k[2] = c, k[3] = e, k[4] = f, k[5] = g, k[6] = h, k[7] = i, k[8] = j, k
        }, e.set = function(a, b, c, d, e, f, g, h, i, j) {
            return a[0] = b, a[1] = c, a[2] = d, a[3] = e, a[4] = f, a[5] = g, a[6] = h, a[7] = i, a[8] = j, a
        }, e.identity = function(a) {
            return a[0] = 1, a[1] = 0, a[2] = 0, a[3] = 0, a[4] = 1, a[5] = 0, a[6] = 0, a[7] = 0, a[8] = 1, a
        }, e.transpose = function(a, b) {
            if (a === b) {
                var c = b[1],
                    d = b[2],
                    e = b[5];
                a[1] = b[3], a[2] = b[6], a[3] = c, a[5] = b[7], a[6] = d, a[7] = e
            } else a[0] = b[0], a[1] = b[3], a[2] = b[6], a[3] = b[1], a[4] = b[4], a[5] = b[7], a[6] = b[2], a[7] = b[5], a[8] = b[8];
            return a
        }, e.invert = function(a, b) {
            var c = b[0],
                d = b[1],
                e = b[2],
                f = b[3],
                g = b[4],
                h = b[5],
                i = b[6],
                j = b[7],
                k = b[8],
                l = k * g - h * j,
                m = -k * f + h * i,
                n = j * f - g * i,
                o = c * l + d * m + e * n;
            return o ? (o = 1 / o, a[0] = l * o, a[1] = (-k * d + e * j) * o, a[2] = (h * d - e * g) * o, a[3] = m * o, a[4] = (k * c - e * i) * o, a[5] = (-h * c + e * f) * o, a[6] = n * o, a[7] = (-j * c + d * i) * o, a[8] = (g * c - d * f) * o, a) : null
        }, e.adjoint = function(a, b) {
            var c = b[0],
                d = b[1],
                e = b[2],
                f = b[3],
                g = b[4],
                h = b[5],
                i = b[6],
                j = b[7],
                k = b[8];
            return a[0] = g * k - h * j, a[1] = e * j - d * k, a[2] = d * h - e * g, a[3] = h * i - f * k, a[4] = c * k - e * i, a[5] = e * f - c * h, a[6] = f * j - g * i, a[7] = d * i - c * j, a[8] = c * g - d * f, a
        }, e.determinant = function(a) {
            var b = a[0],
                c = a[1],
                d = a[2],
                e = a[3],
                f = a[4],
                g = a[5],
                h = a[6],
                i = a[7],
                j = a[8];
            return b * (j * f - g * i) + c * (-j * e + g * h) + d * (i * e - f * h)
        }, e.multiply = function(a, b, c) {
            var d = b[0],
                e = b[1],
                f = b[2],
                g = b[3],
                h = b[4],
                i = b[5],
                j = b[6],
                k = b[7],
                l = b[8],
                m = c[0],
                n = c[1],
                o = c[2],
                p = c[3],
                q = c[4],
                r = c[5],
                s = c[6],
                t = c[7],
                u = c[8];
            return a[0] = m * d + n * g + o * j, a[1] = m * e + n * h + o * k, a[2] = m * f + n * i + o * l, a[3] = p * d + q * g + r * j, a[4] = p * e + q * h + r * k, a[5] = p * f + q * i + r * l, a[6] = s * d + t * g + u * j, a[7] = s * e + t * h + u * k, a[8] = s * f + t * i + u * l, a
        }, e.mul = e.multiply, e.translate = function(a, b, c) {
            var d = b[0],
                e = b[1],
                f = b[2],
                g = b[3],
                h = b[4],
                i = b[5],
                j = b[6],
                k = b[7],
                l = b[8],
                m = c[0],
                n = c[1];
            return a[0] = d, a[1] = e, a[2] = f, a[3] = g, a[4] = h, a[5] = i, a[6] = m * d + n * g + j, a[7] = m * e + n * h + k, a[8] = m * f + n * i + l, a
        }, e.rotate = function(a, b, c) {
            var d = b[0],
                e = b[1],
                f = b[2],
                g = b[3],
                h = b[4],
                i = b[5],
                j = b[6],
                k = b[7],
                l = b[8],
                m = Math.sin(c),
                n = Math.cos(c);
            return a[0] = n * d + m * g, a[1] = n * e + m * h, a[2] = n * f + m * i, a[3] = n * g - m * d, a[4] = n * h - m * e, a[5] = n * i - m * f, a[6] = j, a[7] = k, a[8] = l, a
        }, e.scale = function(a, b, c) {
            var d = c[0],
                e = c[1];
            return a[0] = d * b[0], a[1] = d * b[1], a[2] = d * b[2], a[3] = e * b[3], a[4] = e * b[4], a[5] = e * b[5], a[6] = b[6], a[7] = b[7], a[8] = b[8], a
        }, e.fromTranslation = function(a, b) {
            return a[0] = 1, a[1] = 0, a[2] = 0, a[3] = 0, a[4] = 1, a[5] = 0, a[6] = b[0], a[7] = b[1], a[8] = 1, a
        }, e.fromRotation = function(a, b) {
            var c = Math.sin(b),
                d = Math.cos(b);
            return a[0] = d, a[1] = c, a[2] = 0, a[3] = -c, a[4] = d, a[5] = 0, a[6] = 0, a[7] = 0, a[8] = 1, a
        }, e.fromScaling = function(a, b) {
            return a[0] = b[0], a[1] = 0, a[2] = 0, a[3] = 0, a[4] = b[1], a[5] = 0, a[6] = 0, a[7] = 0, a[8] = 1, a
        }, e.fromMat2d = function(a, b) {
            return a[0] = b[0], a[1] = b[1], a[2] = 0, a[3] = b[2], a[4] = b[3], a[5] = 0, a[6] = b[4], a[7] = b[5], a[8] = 1, a
        }, e.fromQuat = function(a, b) {
            var c = b[0],
                d = b[1],
                e = b[2],
                f = b[3],
                g = c + c,
                h = d + d,
                i = e + e,
                j = c * g,
                k = d * g,
                l = d * h,
                m = e * g,
                n = e * h,
                o = e * i,
                p = f * g,
                q = f * h,
                r = f * i;
            return a[0] = 1 - l - o, a[3] = k - r, a[6] = m + q, a[1] = k + r, a[4] = 1 - j - o, a[7] = n - p, a[2] = m - q, a[5] = n + p, a[8] = 1 - j - l, a
        }, e.normalFromMat4 = function(a, b) {
            var c = b[0],
                d = b[1],
                e = b[2],
                f = b[3],
                g = b[4],
                h = b[5],
                i = b[6],
                j = b[7],
                k = b[8],
                l = b[9],
                m = b[10],
                n = b[11],
                o = b[12],
                p = b[13],
                q = b[14],
                r = b[15],
                s = c * h - d * g,
                t = c * i - e * g,
                u = c * j - f * g,
                v = d * i - e * h,
                w = d * j - f * h,
                x = e * j - f * i,
                y = k * p - l * o,
                z = k * q - m * o,
                A = k * r - n * o,
                B = l * q - m * p,
                C = l * r - n * p,
                D = m * r - n * q,
                E = s * D - t * C + u * B + v * A - w * z + x * y;
            return E ? (E = 1 / E, a[0] = (h * D - i * C + j * B) * E, a[1] = (i * A - g * D - j * z) * E, a[2] = (g * C - h * A + j * y) * E, a[3] = (e * C - d * D - f * B) * E, a[4] = (c * D - e * A + f * z) * E, a[5] = (d * A - c * C - f * y) * E, a[6] = (p * x - q * w + r * v) * E, a[7] = (q * u - o * x - r * t) * E, a[8] = (o * w - p * u + r * s) * E, a) : null
        }, e.str = function(a) {
            return "mat3(" + a[0] + ", " + a[1] + ", " + a[2] + ", " + a[3] + ", " + a[4] + ", " + a[5] + ", " + a[6] + ", " + a[7] + ", " + a[8] + ")"
        }, e.frob = function(a) {
            return Math.sqrt(Math.pow(a[0], 2) + Math.pow(a[1], 2) + Math.pow(a[2], 2) + Math.pow(a[3], 2) + Math.pow(a[4], 2) + Math.pow(a[5], 2) + Math.pow(a[6], 2) + Math.pow(a[7], 2) + Math.pow(a[8], 2))
        }, e.add = function(a, b, c) {
            return a[0] = b[0] + c[0], a[1] = b[1] + c[1], a[2] = b[2] + c[2], a[3] = b[3] + c[3], a[4] = b[4] + c[4], a[5] = b[5] + c[5], a[6] = b[6] + c[6], a[7] = b[7] + c[7], a[8] = b[8] + c[8], a
        }, e.subtract = function(a, b, c) {
            return a[0] = b[0] - c[0], a[1] = b[1] - c[1], a[2] = b[2] - c[2], a[3] = b[3] - c[3], a[4] = b[4] - c[4], a[5] = b[5] - c[5], a[6] = b[6] - c[6], a[7] = b[7] - c[7], a[8] = b[8] - c[8], a
        }, e.sub = e.subtract, e.multiplyScalar = function(a, b, c) {
            return a[0] = b[0] * c, a[1] = b[1] * c, a[2] = b[2] * c, a[3] = b[3] * c, a[4] = b[4] * c, a[5] = b[5] * c, a[6] = b[6] * c, a[7] = b[7] * c, a[8] = b[8] * c, a
        }, e.multiplyScalarAndAdd = function(a, b, c, d) {
            return a[0] = b[0] + c[0] * d, a[1] = b[1] + c[1] * d, a[2] = b[2] + c[2] * d, a[3] = b[3] + c[3] * d, a[4] = b[4] + c[4] * d, a[5] = b[5] + c[5] * d, a[6] = b[6] + c[6] * d, a[7] = b[7] + c[7] * d, a[8] = b[8] + c[8] * d, a
        }, e.exactEquals = function(a, b) {
            return a[0] === b[0] && a[1] === b[1] && a[2] === b[2] && a[3] === b[3] && a[4] === b[4] && a[5] === b[5] && a[6] === b[6] && a[7] === b[7] && a[8] === b[8]
        }, e.equals = function(a, b) {
            var c = a[0],
                e = a[1],
                f = a[2],
                g = a[3],
                h = a[4],
                i = a[5],
                j = a[6],
                k = a[7],
                l = a[8],
                m = b[0],
                n = b[1],
                o = b[2],
                p = b[3],
                q = b[4],
                r = b[5],
                s = a[6],
                t = b[7],
                u = b[8];
            return Math.abs(c - m) <= d.EPSILON * Math.max(1, Math.abs(c), Math.abs(m)) && Math.abs(e - n) <= d.EPSILON * Math.max(1, Math.abs(e), Math.abs(n)) && Math.abs(f - o) <= d.EPSILON * Math.max(1, Math.abs(f), Math.abs(o)) && Math.abs(g - p) <= d.EPSILON * Math.max(1, Math.abs(g), Math.abs(p)) && Math.abs(h - q) <= d.EPSILON * Math.max(1, Math.abs(h), Math.abs(q)) && Math.abs(i - r) <= d.EPSILON * Math.max(1, Math.abs(i), Math.abs(r)) && Math.abs(j - s) <= d.EPSILON * Math.max(1, Math.abs(j), Math.abs(s)) && Math.abs(k - t) <= d.EPSILON * Math.max(1, Math.abs(k), Math.abs(t)) && Math.abs(l - u) <= d.EPSILON * Math.max(1, Math.abs(l), Math.abs(u))
        }, c.exports = e, c.exports
    }), a.registerDynamic("2c", ["28", "2b", "2d", "2e"], !0, function(a, b, c) {
        var d = a("28"),
            e = a("2b"),
            f = a("2d"),
            g = a("2e"),
            h = {};
        return h.create = function() {
            var a = new d.ARRAY_TYPE(4);
            return a[0] = 0, a[1] = 0, a[2] = 0, a[3] = 1, a
        }, h.rotationTo = function() {
            var a = f.create(),
                b = f.fromValues(1, 0, 0),
                c = f.fromValues(0, 1, 0);
            return function(d, e, g) {
                var i = f.dot(e, g);
                return i < -.999999 ? (f.cross(a, b, e), f.length(a) < 1e-6 && f.cross(a, c, e), f.normalize(a, a), h.setAxisAngle(d, a, Math.PI), d) : i > .999999 ? (d[0] = 0, d[1] = 0, d[2] = 0, d[3] = 1, d) : (f.cross(a, e, g), d[0] = a[0], d[1] = a[1], d[2] = a[2], d[3] = 1 + i, h.normalize(d, d))
            }
        }(), h.setAxes = function() {
            var a = e.create();
            return function(b, c, d, e) {
                return a[0] = d[0], a[3] = d[1], a[6] = d[2], a[1] = e[0], a[4] = e[1], a[7] = e[2], a[2] = -c[0], a[5] = -c[1], a[8] = -c[2], h.normalize(b, h.fromMat3(b, a))
            }
        }(), h.clone = g.clone, h.fromValues = g.fromValues, h.copy = g.copy, h.set = g.set, h.identity = function(a) {
            return a[0] = 0, a[1] = 0, a[2] = 0, a[3] = 1, a
        }, h.setAxisAngle = function(a, b, c) {
            c = .5 * c;
            var d = Math.sin(c);
            return a[0] = d * b[0], a[1] = d * b[1], a[2] = d * b[2], a[3] = Math.cos(c), a
        }, h.getAxisAngle = function(a, b) {
            var c = 2 * Math.acos(b[3]),
                d = Math.sin(c / 2);
            return 0 != d ? (a[0] = b[0] / d, a[1] = b[1] / d, a[2] = b[2] / d) : (a[0] = 1, a[1] = 0, a[2] = 0), c
        }, h.add = g.add, h.multiply = function(a, b, c) {
            var d = b[0],
                e = b[1],
                f = b[2],
                g = b[3],
                h = c[0],
                i = c[1],
                j = c[2],
                k = c[3];
            return a[0] = d * k + g * h + e * j - f * i, a[1] = e * k + g * i + f * h - d * j, a[2] = f * k + g * j + d * i - e * h, a[3] = g * k - d * h - e * i - f * j, a
        }, h.mul = h.multiply, h.scale = g.scale, h.rotateX = function(a, b, c) {
            c *= .5;
            var d = b[0],
                e = b[1],
                f = b[2],
                g = b[3],
                h = Math.sin(c),
                i = Math.cos(c);
            return a[0] = d * i + g * h, a[1] = e * i + f * h, a[2] = f * i - e * h, a[3] = g * i - d * h, a
        }, h.rotateY = function(a, b, c) {
            c *= .5;
            var d = b[0],
                e = b[1],
                f = b[2],
                g = b[3],
                h = Math.sin(c),
                i = Math.cos(c);
            return a[0] = d * i - f * h, a[1] = e * i + g * h, a[2] = f * i + d * h, a[3] = g * i - e * h, a
        }, h.rotateZ = function(a, b, c) {
            c *= .5;
            var d = b[0],
                e = b[1],
                f = b[2],
                g = b[3],
                h = Math.sin(c),
                i = Math.cos(c);
            return a[0] = d * i + e * h, a[1] = e * i - d * h, a[2] = f * i + g * h, a[3] = g * i - f * h, a
        }, h.calculateW = function(a, b) {
            var c = b[0],
                d = b[1],
                e = b[2];
            return a[0] = c, a[1] = d, a[2] = e, a[3] = Math.sqrt(Math.abs(1 - c * c - d * d - e * e)), a
        }, h.dot = g.dot, h.lerp = g.lerp, h.slerp = function(a, b, c, d) {
            var e, f, g, h, i, j = b[0],
                k = b[1],
                l = b[2],
                m = b[3],
                n = c[0],
                o = c[1],
                p = c[2],
                q = c[3];
            return f = j * n + k * o + l * p + m * q, f < 0 && (f = -f, n = -n, o = -o, p = -p, q = -q), 1 - f > 1e-6 ? (e = Math.acos(f), g = Math.sin(e), h = Math.sin((1 - d) * e) / g, i = Math.sin(d * e) / g) : (h = 1 - d, i = d), a[0] = h * j + i * n, a[1] = h * k + i * o, a[2] = h * l + i * p, a[3] = h * m + i * q, a
        }, h.sqlerp = function() {
            var a = h.create(),
                b = h.create();
            return function(c, d, e, f, g, i) {
                return h.slerp(a, d, g, i), h.slerp(b, e, f, i), h.slerp(c, a, b, 2 * i * (1 - i)), c
            }
        }(), h.invert = function(a, b) {
            var c = b[0],
                d = b[1],
                e = b[2],
                f = b[3],
                g = c * c + d * d + e * e + f * f,
                h = g ? 1 / g : 0;
            return a[0] = -c * h, a[1] = -d * h, a[2] = -e * h, a[3] = f * h, a
        }, h.conjugate = function(a, b) {
            return a[0] = -b[0], a[1] = -b[1], a[2] = -b[2], a[3] = b[3], a
        }, h.length = g.length, h.len = h.length, h.squaredLength = g.squaredLength, h.sqrLen = h.squaredLength, h.normalize = g.normalize, h.fromMat3 = function(a, b) {
            var c, d = b[0] + b[4] + b[8];
            if (d > 0) c = Math.sqrt(d + 1), a[3] = .5 * c, c = .5 / c, a[0] = (b[5] - b[7]) * c, a[1] = (b[6] - b[2]) * c, a[2] = (b[1] - b[3]) * c;
            else {
                var e = 0;
                b[4] > b[0] && (e = 1), b[8] > b[3 * e + e] && (e = 2);
                var f = (e + 1) % 3,
                    g = (e + 2) % 3;
                c = Math.sqrt(b[3 * e + e] - b[3 * f + f] - b[3 * g + g] + 1), a[e] = .5 * c, c = .5 / c, a[3] = (b[3 * f + g] - b[3 * g + f]) * c, a[f] = (b[3 * f + e] + b[3 * e + f]) * c, a[g] = (b[3 * g + e] + b[3 * e + g]) * c
            }
            return a
        }, h.str = function(a) {
            return "quat(" + a[0] + ", " + a[1] + ", " + a[2] + ", " + a[3] + ")"
        }, h.exactEquals = g.exactEquals, h.equals = g.equals, c.exports = h, c.exports
    }), a.registerDynamic("2f", ["28"], !0, function(a, b, c) {
        var d = a("28"),
            e = {};
        return e.create = function() {
            var a = new d.ARRAY_TYPE(2);
            return a[0] = 0, a[1] = 0, a
        }, e.clone = function(a) {
            var b = new d.ARRAY_TYPE(2);
            return b[0] = a[0], b[1] = a[1], b
        }, e.fromValues = function(a, b) {
            var c = new d.ARRAY_TYPE(2);
            return c[0] = a, c[1] = b, c
        }, e.copy = function(a, b) {
            return a[0] = b[0], a[1] = b[1], a
        }, e.set = function(a, b, c) {
            return a[0] = b, a[1] = c, a
        }, e.add = function(a, b, c) {
            return a[0] = b[0] + c[0], a[1] = b[1] + c[1], a
        }, e.subtract = function(a, b, c) {
            return a[0] = b[0] - c[0], a[1] = b[1] - c[1], a
        }, e.sub = e.subtract, e.multiply = function(a, b, c) {
            return a[0] = b[0] * c[0], a[1] = b[1] * c[1], a
        }, e.mul = e.multiply, e.divide = function(a, b, c) {
            return a[0] = b[0] / c[0], a[1] = b[1] / c[1], a
        }, e.div = e.divide, e.ceil = function(a, b) {
            return a[0] = Math.ceil(b[0]), a[1] = Math.ceil(b[1]), a
        }, e.floor = function(a, b) {
            return a[0] = Math.floor(b[0]), a[1] = Math.floor(b[1]), a
        }, e.min = function(a, b, c) {
            return a[0] = Math.min(b[0], c[0]), a[1] = Math.min(b[1], c[1]), a
        }, e.max = function(a, b, c) {
            return a[0] = Math.max(b[0], c[0]), a[1] = Math.max(b[1], c[1]), a
        }, e.round = function(a, b) {
            return a[0] = Math.round(b[0]), a[1] = Math.round(b[1]), a
        }, e.scale = function(a, b, c) {
            return a[0] = b[0] * c, a[1] = b[1] * c, a
        }, e.scaleAndAdd = function(a, b, c, d) {
            return a[0] = b[0] + c[0] * d, a[1] = b[1] + c[1] * d, a
        }, e.distance = function(a, b) {
            var c = b[0] - a[0],
                d = b[1] - a[1];
            return Math.sqrt(c * c + d * d)
        }, e.dist = e.distance, e.squaredDistance = function(a, b) {
            var c = b[0] - a[0],
                d = b[1] - a[1];
            return c * c + d * d
        }, e.sqrDist = e.squaredDistance, e.length = function(a) {
            var b = a[0],
                c = a[1];
            return Math.sqrt(b * b + c * c)
        }, e.len = e.length, e.squaredLength = function(a) {
            var b = a[0],
                c = a[1];
            return b * b + c * c
        }, e.sqrLen = e.squaredLength, e.negate = function(a, b) {
            return a[0] = -b[0], a[1] = -b[1], a
        }, e.inverse = function(a, b) {
            return a[0] = 1 / b[0], a[1] = 1 / b[1], a
        }, e.normalize = function(a, b) {
            var c = b[0],
                d = b[1],
                e = c * c + d * d;
            return e > 0 && (e = 1 / Math.sqrt(e), a[0] = b[0] * e, a[1] = b[1] * e), a
        }, e.dot = function(a, b) {
            return a[0] * b[0] + a[1] * b[1]
        }, e.cross = function(a, b, c) {
            var d = b[0] * c[1] - b[1] * c[0];
            return a[0] = a[1] = 0, a[2] = d, a
        }, e.lerp = function(a, b, c, d) {
            var e = b[0],
                f = b[1];
            return a[0] = e + d * (c[0] - e), a[1] = f + d * (c[1] - f), a
        }, e.random = function(a, b) {
            b = b || 1;
            var c = 2 * d.RANDOM() * Math.PI;
            return a[0] = Math.cos(c) * b, a[1] = Math.sin(c) * b, a
        }, e.transformMat2 = function(a, b, c) {
            var d = b[0],
                e = b[1];
            return a[0] = c[0] * d + c[2] * e, a[1] = c[1] * d + c[3] * e, a
        }, e.transformMat2d = function(a, b, c) {
            var d = b[0],
                e = b[1];
            return a[0] = c[0] * d + c[2] * e + c[4], a[1] = c[1] * d + c[3] * e + c[5], a
        }, e.transformMat3 = function(a, b, c) {
            var d = b[0],
                e = b[1];
            return a[0] = c[0] * d + c[3] * e + c[6], a[1] = c[1] * d + c[4] * e + c[7], a
        }, e.transformMat4 = function(a, b, c) {
            var d = b[0],
                e = b[1];
            return a[0] = c[0] * d + c[4] * e + c[12], a[1] = c[1] * d + c[5] * e + c[13], a
        }, e.forEach = function() {
            var a = e.create();
            return function(b, c, d, e, f, g) {
                var h, i;
                for (c || (c = 2), d || (d = 0), i = e ? Math.min(e * c + d, b.length) : b.length, h = d; h < i; h += c) a[0] = b[h], a[1] = b[h + 1], f(a, a, g), b[h] = a[0], b[h + 1] = a[1];
                return b
            }
        }(), e.str = function(a) {
            return "vec2(" + a[0] + ", " + a[1] + ")"
        }, e.exactEquals = function(a, b) {
            return a[0] === b[0] && a[1] === b[1]
        }, e.equals = function(a, b) {
            var c = a[0],
                e = a[1],
                f = b[0],
                g = b[1];
            return Math.abs(c - f) <= d.EPSILON * Math.max(1, Math.abs(c), Math.abs(f)) && Math.abs(e - g) <= d.EPSILON * Math.max(1, Math.abs(e), Math.abs(g))
        }, c.exports = e, c.exports
    }), a.registerDynamic("2d", ["28"], !0, function(a, b, c) {
        var d = a("28"),
            e = {};
        return e.create = function() {
            var a = new d.ARRAY_TYPE(3);
            return a[0] = 0, a[1] = 0, a[2] = 0, a
        }, e.clone = function(a) {
            var b = new d.ARRAY_TYPE(3);
            return b[0] = a[0], b[1] = a[1], b[2] = a[2], b
        }, e.fromValues = function(a, b, c) {
            var e = new d.ARRAY_TYPE(3);
            return e[0] = a, e[1] = b, e[2] = c, e
        }, e.copy = function(a, b) {
            return a[0] = b[0], a[1] = b[1], a[2] = b[2], a
        }, e.set = function(a, b, c, d) {
            return a[0] = b, a[1] = c, a[2] = d, a
        }, e.add = function(a, b, c) {
            return a[0] = b[0] + c[0], a[1] = b[1] + c[1], a[2] = b[2] + c[2], a
        }, e.subtract = function(a, b, c) {
            return a[0] = b[0] - c[0], a[1] = b[1] - c[1], a[2] = b[2] - c[2], a
        }, e.sub = e.subtract, e.multiply = function(a, b, c) {
            return a[0] = b[0] * c[0], a[1] = b[1] * c[1], a[2] = b[2] * c[2], a
        }, e.mul = e.multiply, e.divide = function(a, b, c) {
            return a[0] = b[0] / c[0], a[1] = b[1] / c[1], a[2] = b[2] / c[2], a
        }, e.div = e.divide, e.ceil = function(a, b) {
            return a[0] = Math.ceil(b[0]), a[1] = Math.ceil(b[1]), a[2] = Math.ceil(b[2]), a
        }, e.floor = function(a, b) {
            return a[0] = Math.floor(b[0]), a[1] = Math.floor(b[1]), a[2] = Math.floor(b[2]), a
        }, e.min = function(a, b, c) {
            return a[0] = Math.min(b[0], c[0]), a[1] = Math.min(b[1], c[1]), a[2] = Math.min(b[2], c[2]), a
        }, e.max = function(a, b, c) {
            return a[0] = Math.max(b[0], c[0]), a[1] = Math.max(b[1], c[1]), a[2] = Math.max(b[2], c[2]), a
        }, e.round = function(a, b) {
            return a[0] = Math.round(b[0]), a[1] = Math.round(b[1]), a[2] = Math.round(b[2]), a
        }, e.scale = function(a, b, c) {
            return a[0] = b[0] * c, a[1] = b[1] * c, a[2] = b[2] * c, a
        }, e.scaleAndAdd = function(a, b, c, d) {
            return a[0] = b[0] + c[0] * d, a[1] = b[1] + c[1] * d, a[2] = b[2] + c[2] * d, a
        }, e.distance = function(a, b) {
            var c = b[0] - a[0],
                d = b[1] - a[1],
                e = b[2] - a[2];
            return Math.sqrt(c * c + d * d + e * e)
        }, e.dist = e.distance, e.squaredDistance = function(a, b) {
            var c = b[0] - a[0],
                d = b[1] - a[1],
                e = b[2] - a[2];
            return c * c + d * d + e * e
        }, e.sqrDist = e.squaredDistance, e.length = function(a) {
            var b = a[0],
                c = a[1],
                d = a[2];
            return Math.sqrt(b * b + c * c + d * d)
        }, e.len = e.length, e.squaredLength = function(a) {
            var b = a[0],
                c = a[1],
                d = a[2];
            return b * b + c * c + d * d
        }, e.sqrLen = e.squaredLength, e.negate = function(a, b) {
            return a[0] = -b[0], a[1] = -b[1], a[2] = -b[2], a
        }, e.inverse = function(a, b) {
            return a[0] = 1 / b[0], a[1] = 1 / b[1], a[2] = 1 / b[2], a
        }, e.normalize = function(a, b) {
            var c = b[0],
                d = b[1],
                e = b[2],
                f = c * c + d * d + e * e;
            return f > 0 && (f = 1 / Math.sqrt(f), a[0] = b[0] * f, a[1] = b[1] * f, a[2] = b[2] * f), a
        }, e.dot = function(a, b) {
            return a[0] * b[0] + a[1] * b[1] + a[2] * b[2]
        }, e.cross = function(a, b, c) {
            var d = b[0],
                e = b[1],
                f = b[2],
                g = c[0],
                h = c[1],
                i = c[2];
            return a[0] = e * i - f * h, a[1] = f * g - d * i, a[2] = d * h - e * g, a
        }, e.lerp = function(a, b, c, d) {
            var e = b[0],
                f = b[1],
                g = b[2];
            return a[0] = e + d * (c[0] - e), a[1] = f + d * (c[1] - f), a[2] = g + d * (c[2] - g), a
        }, e.hermite = function(a, b, c, d, e, f) {
            var g = f * f,
                h = g * (2 * f - 3) + 1,
                i = g * (f - 2) + f,
                j = g * (f - 1),
                k = g * (3 - 2 * f);
            return a[0] = b[0] * h + c[0] * i + d[0] * j + e[0] * k, a[1] = b[1] * h + c[1] * i + d[1] * j + e[1] * k, a[2] = b[2] * h + c[2] * i + d[2] * j + e[2] * k, a
        }, e.bezier = function(a, b, c, d, e, f) {
            var g = 1 - f,
                h = g * g,
                i = f * f,
                j = h * g,
                k = 3 * f * h,
                l = 3 * i * g,
                m = i * f;
            return a[0] = b[0] * j + c[0] * k + d[0] * l + e[0] * m, a[1] = b[1] * j + c[1] * k + d[1] * l + e[1] * m, a[2] = b[2] * j + c[2] * k + d[2] * l + e[2] * m, a
        }, e.random = function(a, b) {
            b = b || 1;
            var c = 2 * d.RANDOM() * Math.PI,
                e = 2 * d.RANDOM() - 1,
                f = Math.sqrt(1 - e * e) * b;
            return a[0] = Math.cos(c) * f, a[1] = Math.sin(c) * f, a[2] = e * b, a
        }, e.transformMat4 = function(a, b, c) {
            var d = b[0],
                e = b[1],
                f = b[2],
                g = c[3] * d + c[7] * e + c[11] * f + c[15];
            return g = g || 1, a[0] = (c[0] * d + c[4] * e + c[8] * f + c[12]) / g, a[1] = (c[1] * d + c[5] * e + c[9] * f + c[13]) / g, a[2] = (c[2] * d + c[6] * e + c[10] * f + c[14]) / g, a
        }, e.transformMat3 = function(a, b, c) {
            var d = b[0],
                e = b[1],
                f = b[2];
            return a[0] = d * c[0] + e * c[3] + f * c[6], a[1] = d * c[1] + e * c[4] + f * c[7], a[2] = d * c[2] + e * c[5] + f * c[8], a
        }, e.transformQuat = function(a, b, c) {
            var d = b[0],
                e = b[1],
                f = b[2],
                g = c[0],
                h = c[1],
                i = c[2],
                j = c[3],
                k = j * d + h * f - i * e,
                l = j * e + i * d - g * f,
                m = j * f + g * e - h * d,
                n = -g * d - h * e - i * f;
            return a[0] = k * j + n * -g + l * -i - m * -h, a[1] = l * j + n * -h + m * -g - k * -i, a[2] = m * j + n * -i + k * -h - l * -g, a
        }, e.rotateX = function(a, b, c, d) {
            var e = [],
                f = [];
            return e[0] = b[0] - c[0], e[1] = b[1] - c[1], e[2] = b[2] - c[2], f[0] = e[0], f[1] = e[1] * Math.cos(d) - e[2] * Math.sin(d), f[2] = e[1] * Math.sin(d) + e[2] * Math.cos(d), a[0] = f[0] + c[0], a[1] = f[1] + c[1], a[2] = f[2] + c[2], a
        }, e.rotateY = function(a, b, c, d) {
            var e = [],
                f = [];
            return e[0] = b[0] - c[0], e[1] = b[1] - c[1], e[2] = b[2] - c[2], f[0] = e[2] * Math.sin(d) + e[0] * Math.cos(d), f[1] = e[1], f[2] = e[2] * Math.cos(d) - e[0] * Math.sin(d), a[0] = f[0] + c[0], a[1] = f[1] + c[1], a[2] = f[2] + c[2], a
        }, e.rotateZ = function(a, b, c, d) {
            var e = [],
                f = [];
            return e[0] = b[0] - c[0], e[1] = b[1] - c[1], e[2] = b[2] - c[2], f[0] = e[0] * Math.cos(d) - e[1] * Math.sin(d), f[1] = e[0] * Math.sin(d) + e[1] * Math.cos(d), f[2] = e[2], a[0] = f[0] + c[0], a[1] = f[1] + c[1], a[2] = f[2] + c[2], a
        }, e.forEach = function() {
            var a = e.create();
            return function(b, c, d, e, f, g) {
                var h, i;
                for (c || (c = 3), d || (d = 0), i = e ? Math.min(e * c + d, b.length) : b.length, h = d; h < i; h += c) a[0] = b[h], a[1] = b[h + 1], a[2] = b[h + 2], f(a, a, g), b[h] = a[0], b[h + 1] = a[1], b[h + 2] = a[2];
                return b
            }
        }(), e.angle = function(a, b) {
            var c = e.fromValues(a[0], a[1], a[2]),
                d = e.fromValues(b[0], b[1], b[2]);
            e.normalize(c, c), e.normalize(d, d);
            var f = e.dot(c, d);
            return f > 1 ? 0 : Math.acos(f)
        }, e.str = function(a) {
            return "vec3(" + a[0] + ", " + a[1] + ", " + a[2] + ")"
        }, e.exactEquals = function(a, b) {
            return a[0] === b[0] && a[1] === b[1] && a[2] === b[2]
        }, e.equals = function(a, b) {
            var c = a[0],
                e = a[1],
                f = a[2],
                g = b[0],
                h = b[1],
                i = b[2];
            return Math.abs(c - g) <= d.EPSILON * Math.max(1, Math.abs(c), Math.abs(g)) && Math.abs(e - h) <= d.EPSILON * Math.max(1, Math.abs(e), Math.abs(h)) && Math.abs(f - i) <= d.EPSILON * Math.max(1, Math.abs(f), Math.abs(i))
        }, c.exports = e, c.exports
    }), a.registerDynamic("28", [], !0, function(a, b, c) {
        var d = {};
        d.EPSILON = 1e-6, d.ARRAY_TYPE = "undefined" != typeof Float32Array ? Float32Array : Array, d.RANDOM = Math.random, d.ENABLE_SIMD = !1, d.SIMD_AVAILABLE = d.ARRAY_TYPE === Float32Array && "SIMD" in this, d.USE_SIMD = d.ENABLE_SIMD && d.SIMD_AVAILABLE, d.setMatrixArrayType = function(a) {
            d.ARRAY_TYPE = a
        };
        var e = Math.PI / 180;
        return d.toRadian = function(a) {
            return a * e
        }, d.equals = function(a, b) {
            return Math.abs(a - b) <= d.EPSILON * Math.max(1, Math.abs(a), Math.abs(b))
        }, c.exports = d, c.exports
    }), a.registerDynamic("2e", ["28"], !0, function(a, b, c) {
        var d = a("28"),
            e = {};
        return e.create = function() {
            var a = new d.ARRAY_TYPE(4);
            return a[0] = 0, a[1] = 0, a[2] = 0, a[3] = 0, a
        }, e.clone = function(a) {
            var b = new d.ARRAY_TYPE(4);
            return b[0] = a[0], b[1] = a[1], b[2] = a[2], b[3] = a[3], b
        }, e.fromValues = function(a, b, c, e) {
            var f = new d.ARRAY_TYPE(4);
            return f[0] = a, f[1] = b, f[2] = c, f[3] = e, f
        }, e.copy = function(a, b) {
            return a[0] = b[0], a[1] = b[1], a[2] = b[2], a[3] = b[3], a
        }, e.set = function(a, b, c, d, e) {
            return a[0] = b, a[1] = c, a[2] = d, a[3] = e, a
        }, e.add = function(a, b, c) {
            return a[0] = b[0] + c[0], a[1] = b[1] + c[1], a[2] = b[2] + c[2], a[3] = b[3] + c[3], a
        }, e.subtract = function(a, b, c) {
            return a[0] = b[0] - c[0], a[1] = b[1] - c[1], a[2] = b[2] - c[2], a[3] = b[3] - c[3], a
        }, e.sub = e.subtract, e.multiply = function(a, b, c) {
            return a[0] = b[0] * c[0], a[1] = b[1] * c[1], a[2] = b[2] * c[2], a[3] = b[3] * c[3], a
        }, e.mul = e.multiply, e.divide = function(a, b, c) {
            return a[0] = b[0] / c[0], a[1] = b[1] / c[1], a[2] = b[2] / c[2], a[3] = b[3] / c[3], a
        }, e.div = e.divide, e.ceil = function(a, b) {
            return a[0] = Math.ceil(b[0]), a[1] = Math.ceil(b[1]), a[2] = Math.ceil(b[2]),
                a[3] = Math.ceil(b[3]), a
        }, e.floor = function(a, b) {
            return a[0] = Math.floor(b[0]), a[1] = Math.floor(b[1]), a[2] = Math.floor(b[2]), a[3] = Math.floor(b[3]), a
        }, e.min = function(a, b, c) {
            return a[0] = Math.min(b[0], c[0]), a[1] = Math.min(b[1], c[1]), a[2] = Math.min(b[2], c[2]), a[3] = Math.min(b[3], c[3]), a
        }, e.max = function(a, b, c) {
            return a[0] = Math.max(b[0], c[0]), a[1] = Math.max(b[1], c[1]), a[2] = Math.max(b[2], c[2]), a[3] = Math.max(b[3], c[3]), a
        }, e.round = function(a, b) {
            return a[0] = Math.round(b[0]), a[1] = Math.round(b[1]), a[2] = Math.round(b[2]), a[3] = Math.round(b[3]), a
        }, e.scale = function(a, b, c) {
            return a[0] = b[0] * c, a[1] = b[1] * c, a[2] = b[2] * c, a[3] = b[3] * c, a
        }, e.scaleAndAdd = function(a, b, c, d) {
            return a[0] = b[0] + c[0] * d, a[1] = b[1] + c[1] * d, a[2] = b[2] + c[2] * d, a[3] = b[3] + c[3] * d, a
        }, e.distance = function(a, b) {
            var c = b[0] - a[0],
                d = b[1] - a[1],
                e = b[2] - a[2],
                f = b[3] - a[3];
            return Math.sqrt(c * c + d * d + e * e + f * f)
        }, e.dist = e.distance, e.squaredDistance = function(a, b) {
            var c = b[0] - a[0],
                d = b[1] - a[1],
                e = b[2] - a[2],
                f = b[3] - a[3];
            return c * c + d * d + e * e + f * f
        }, e.sqrDist = e.squaredDistance, e.length = function(a) {
            var b = a[0],
                c = a[1],
                d = a[2],
                e = a[3];
            return Math.sqrt(b * b + c * c + d * d + e * e)
        }, e.len = e.length, e.squaredLength = function(a) {
            var b = a[0],
                c = a[1],
                d = a[2],
                e = a[3];
            return b * b + c * c + d * d + e * e
        }, e.sqrLen = e.squaredLength, e.negate = function(a, b) {
            return a[0] = -b[0], a[1] = -b[1], a[2] = -b[2], a[3] = -b[3], a
        }, e.inverse = function(a, b) {
            return a[0] = 1 / b[0], a[1] = 1 / b[1], a[2] = 1 / b[2], a[3] = 1 / b[3], a
        }, e.normalize = function(a, b) {
            var c = b[0],
                d = b[1],
                e = b[2],
                f = b[3],
                g = c * c + d * d + e * e + f * f;
            return g > 0 && (g = 1 / Math.sqrt(g), a[0] = c * g, a[1] = d * g, a[2] = e * g, a[3] = f * g), a
        }, e.dot = function(a, b) {
            return a[0] * b[0] + a[1] * b[1] + a[2] * b[2] + a[3] * b[3]
        }, e.lerp = function(a, b, c, d) {
            var e = b[0],
                f = b[1],
                g = b[2],
                h = b[3];
            return a[0] = e + d * (c[0] - e), a[1] = f + d * (c[1] - f), a[2] = g + d * (c[2] - g), a[3] = h + d * (c[3] - h), a
        }, e.random = function(a, b) {
            return b = b || 1, a[0] = d.RANDOM(), a[1] = d.RANDOM(), a[2] = d.RANDOM(), a[3] = d.RANDOM(), e.normalize(a, a), e.scale(a, a, b), a
        }, e.transformMat4 = function(a, b, c) {
            var d = b[0],
                e = b[1],
                f = b[2],
                g = b[3];
            return a[0] = c[0] * d + c[4] * e + c[8] * f + c[12] * g, a[1] = c[1] * d + c[5] * e + c[9] * f + c[13] * g, a[2] = c[2] * d + c[6] * e + c[10] * f + c[14] * g, a[3] = c[3] * d + c[7] * e + c[11] * f + c[15] * g, a
        }, e.transformQuat = function(a, b, c) {
            var d = b[0],
                e = b[1],
                f = b[2],
                g = c[0],
                h = c[1],
                i = c[2],
                j = c[3],
                k = j * d + h * f - i * e,
                l = j * e + i * d - g * f,
                m = j * f + g * e - h * d,
                n = -g * d - h * e - i * f;
            return a[0] = k * j + n * -g + l * -i - m * -h, a[1] = l * j + n * -h + m * -g - k * -i, a[2] = m * j + n * -i + k * -h - l * -g, a[3] = b[3], a
        }, e.forEach = function() {
            var a = e.create();
            return function(b, c, d, e, f, g) {
                var h, i;
                for (c || (c = 4), d || (d = 0), i = e ? Math.min(e * c + d, b.length) : b.length, h = d; h < i; h += c) a[0] = b[h], a[1] = b[h + 1], a[2] = b[h + 2], a[3] = b[h + 3], f(a, a, g), b[h] = a[0], b[h + 1] = a[1], b[h + 2] = a[2], b[h + 3] = a[3];
                return b
            }
        }(), e.str = function(a) {
            return "vec4(" + a[0] + ", " + a[1] + ", " + a[2] + ", " + a[3] + ")"
        }, e.exactEquals = function(a, b) {
            return a[0] === b[0] && a[1] === b[1] && a[2] === b[2] && a[3] === b[3]
        }, e.equals = function(a, b) {
            var c = a[0],
                e = a[1],
                f = a[2],
                g = a[3],
                h = b[0],
                i = b[1],
                j = b[2],
                k = b[3];
            return Math.abs(c - h) <= d.EPSILON * Math.max(1, Math.abs(c), Math.abs(h)) && Math.abs(e - i) <= d.EPSILON * Math.max(1, Math.abs(e), Math.abs(i)) && Math.abs(f - j) <= d.EPSILON * Math.max(1, Math.abs(f), Math.abs(j)) && Math.abs(g - k) <= d.EPSILON * Math.max(1, Math.abs(g), Math.abs(k))
        }, c.exports = e, c.exports
    }), a.registerDynamic("30", ["28", "27", "29", "2b", "2a", "2c", "2f", "2d", "2e"], !0, function(a, b, c) {
        return b.glMatrix = a("28"), b.mat2 = a("27"), b.mat2d = a("29"), b.mat3 = a("2b"), b.mat4 = a("2a"), b.quat = a("2c"), b.vec2 = a("2f"), b.vec3 = a("2d"), b.vec4 = a("2e"), c.exports
    }), a.registerDynamic("d", ["30"], !0, function(a, b, c) {
        return c.exports = a("30"), c.exports
    }), a.register("31", ["c", "6", "26", "d"], function(a, b) {
        "use strict";
        var c, d, e, f, g, h = (b && b.id, this && this.__extends || function(a, b) {
            function c() {
                this.constructor = a
            }
            for (var d in b) b.hasOwnProperty(d) && (a[d] = b[d]);
            a.prototype = null === b ? Object.create(b) : (c.prototype = b.prototype, new c)
        });
        return {
            setters: [function(a) {
                c = a
            }, function(a) {
                d = a
            }, function(a) {
                e = a
            }, function(a) {
                f = a
            }],
            execute: function() {
                g = function(a) {
                    function b(b) {
                        void 0 === b && (b = [1024, 768]), a.call(this), this.designResolution = b, this.designAspect = 1, this.width = 0, this.height = 0, this.landscape = !0, this.p = 1, this.vpMat = f.mat4.create(), this.materialStack = [], this.pointScale = 1, this.currentGlTexture = [], this.root = this, this.isRoot = !0, this.designAspect = this.designResolution[1] / this.designResolution[0], this.p = d.settings.pixelRatio, this.container = d.settings.container, this.canvas = document.createElement("canvas"), this.container.appendChild(this.canvas), this.canvas.style.width = this.canvas.style.height = "100%", this.setupGL(), this.defaultCamera = new e.PerspectiveCamera(this), this.defaultCamera.setAsDefaultCamera(), this.resize(), window.addEventListener("resize", function() {
                            this.resize()
                        }.bind(this)), this.dispatchEvent("InitFinished"), this.update()
                    }
                    return h(b, a), b.prototype.setupGL = function() {
                        if (this.gl = this.canvas.getContext("webgl", {
                                premultipliedAlpha: !1,
                                alpha: !1
                            }) || this.canvas.getContext("experimental-webgl", {
                                premultipliedAlpha: !1,
                                alpha: !1
                            }), !this.gl) throw "WebGL Not Support";
                        this.gl.clearColor(0, 0, 0, 1), this.gl.blendFunc(this.gl.SRC_ALPHA, this.gl.ONE_MINUS_SRC_ALPHA);
                        var a = this.gl.getExtension("OES_texture_half_float");
                        a && (this.gl.HALF_FLOAT = a.HALF_FLOAT_OES), this.gl.getExtension("OES_texture_float"), this.gl.clear(this.gl.COLOR_BUFFER_BIT)
                    }, b.prototype.resize = function() {
                        this.canvas.style.width = this.container.offsetWidth + "px", this.canvas.style.height = this.container.offsetHeight + "px", this.canvas.width = (this.width = this.canvas.offsetWidth) * this.p, this.canvas.height = (this.height = this.canvas.offsetHeight) * this.p, this.aspect = this.height / this.width, this.gl.viewport(0, 0, this.width * this.p, this.height * this.p), this.landscape = this.designResolution[1] / this.designResolution[0] > this.aspect, this.landscape ? this.pointScale = this.height / this.designResolution[1] * this.p : this.pointScale = this.width / this.designResolution[1] * this.p, this.dispatchEvent("resize")
                    }, b.prototype.update = function() {
                        window.requestAnimationFrame(this.update.bind(this)), d.eventBus.dispatchEvent("beforeupdate"), d.audioCtl.update(), this.gl.clear(this.gl.COLOR_BUFFER_BIT), this.defaultCamera && this.defaultCamera.update(), f.mat4.multiply(this.vpMat, this.perspectiveMat, this.viewMat), a.prototype.update.call(this), d.eventBus.dispatchEvent("afterupdate")
                    }, b
                }(c.Object3D), a("Render", g)
            }
        }
    }), a.register("1f", ["17", "6"], function(a, b) {
        "use strict";
        var c, d, e, f, g = (b && b.id, this && this.__extends || function(a, b) {
            function c() {
                this.constructor = a
            }
            for (var d in b) b.hasOwnProperty(d) && (a[d] = b[d]);
            a.prototype = null === b ? Object.create(b) : (c.prototype = b.prototype, new c)
        });
        return {
            setters: [function(a) {
                c = a
            }, function(a) {
                d = a
            }],
            execute: function() {
                a("TouchEvents", e = {
                    touchstart: "touchstart",
                    touchend: "touchend"
                }), f = function(a) {
                    function b() {
                        a.call(this), this.itemList = {}, this.figureState = {}, this.canvas = d.render.canvas, document.createTouch ? (this.canvas.addEventListener("touchstart", this.onTouchStart.bind(this), !0), this.canvas.addEventListener("touchend", this.onTouchEnd.bind(this), !0)) : (this.canvas.addEventListener("mousedown", this.onMouseDown.bind(this), !0), this.canvas.addEventListener("mouseup", this.onMouseUp.bind(this), !0))
                    }
                    return g(b, a), b.prototype.getPos = function(a, b) {
                        return d.render.landscape ? [(2 * a / d.render.width - 1) / d.render.aspect, 1 - 2 * b / d.render.height] : [(2 * a / d.render.width - 1) / d.render.designAspect, d.render.aspect / d.render.designAspect * (1 - 2 * b / d.render.height)]
                    }, b.prototype.onTouchStart = function(a) {
                        a.stopPropagation(), a.preventDefault();
                        for (var b = 0; b < a.changedTouches.length; b++) {
                            var c = a.changedTouches[b],
                                d = this.getPos(c.pageX, c.pageY),
                                f = d[0],
                                g = d[1];
                            this.findAndDispatchEvent(e.touchstart, f, g), this.dispatchEvent("touchstart", {
                                x: f,
                                y: g
                            })
                        }
                    }, b.prototype.onTouchMove = function(a) {}, b.prototype.onTouchEnd = function(a) {
                        a.stopPropagation(), a.preventDefault();
                        for (var b = 0; b < a.changedTouches.length; b++) {
                            var c = a.changedTouches[b],
                                d = this.getPos(c.pageX, c.pageY),
                                f = d[0],
                                g = d[1];
                            this.findAndDispatchEvent(e.touchend, f, g), this.dispatchEvent("touchend", {
                                x: f,
                                y: g
                            })
                        }
                    }, b.prototype.onMouseDown = function(a) {
                        a.stopPropagation(), a.preventDefault();
                        var b = this.getPos(a.offsetX, a.offsetY),
                            c = b[0],
                            d = b[1];
                        this.findAndDispatchEvent(e.touchstart, c, d), this.dispatchEvent("touchstart", {
                            x: c,
                            y: d
                        })
                    }, b.prototype.onMouseMove = function(a) {}, b.prototype.onMouseUp = function(a) {
                        a.stopPropagation(), a.preventDefault();
                        var b = this.getPos(a.offsetX, a.offsetY),
                            c = b[0],
                            d = b[1];
                        this.findAndDispatchEvent(e.touchend, c, d), this.dispatchEvent("touchend", {
                            x: c,
                            y: d
                        })
                    }, b.prototype.addTouchItem = function(a, b) {
                        var c = a.level;
                        this.itemList[b] || (this.itemList[b] = []), this.itemList[b][c] || (this.itemList[b][c] = []), this.itemList[b][c].push(a), this.itemList[b].sort(function(a, b) {
                            return b.zIndex - a.zIndex
                        }), a.addEventListener("levelchange", function() {}.bind(this))
                    }, b.prototype.removeTouchItem = function(a, b) {
                        var c = a.level,
                            d = this.itemList[b][c];
                        if (d) {
                            var e = d.indexOf(a);
                            e >= 0 && d.splice(e, 1)
                        }
                    }, b.prototype.findAndDispatchEvent = function(a, b, c) {
                        if (this.itemList[a]) {
                            for (var d = 0; d < this.itemList[a].length; d++) {
                                var e = this.itemList[a][d];
                                if (e)
                                    for (var f = 0; f < e.length; f++) {
                                        var g = e[f];
                                        if (g && b > g.rx - .5 * g.rw && b < g.rx + .5 * g.rw && c > g.ry - .5 * g.rh && c < g.ry + .5 * g.rh) {
                                            if (g.dispatchEvent(a, g, !0)) return;
                                            g.hit = !0
                                        }
                                    }
                            }
                            for (var h = this.itemList[a].length - 1; h >= 0; h--) {
                                var i = this.itemList[a][h];
                                if (i)
                                    for (var j = i.length - 1; j >= 0; j--) 1 == i[j].hit && (i[j].dispatchEvent(a, i[j]), i[j].hit = !1)
                            }
                        }
                    }, b
                }(c.EventBase), a("TouchCtl", f)
            }
        }
    }), a.register("15", ["17", "6"], function(a, b) {
        "use strict";
        var c, d, e, f, g = (b && b.id, this && this.__extends || function(a, b) {
            function c() {
                this.constructor = a
            }
            for (var d in b) b.hasOwnProperty(d) && (a[d] = b[d]);
            a.prototype = null === b ? Object.create(b) : (c.prototype = b.prototype, new c)
        });
        return {
            setters: [function(a) {
                c = a
            }, function(a) {
                d = a
            }],
            execute: function() {
                e = function() {
                    function a(a, b) {
                        this.subTextures = [], this.gl = a, this.size = b, this.glTexture = a.createTexture(), a.activeTexture(a.TEXTURE0), a.bindTexture(a.TEXTURE_2D, this.glTexture), a.texImage2D(a.TEXTURE_2D, 0, a.RGBA, b, b, 0, a.RGBA, a.UNSIGNED_BYTE, new Uint8Array(b * b * 4)), a.texParameteri(a.TEXTURE_2D, a.TEXTURE_MIN_FILTER, a.NEAREST), a.texParameteri(a.TEXTURE_2D, a.TEXTURE_MAG_FILTER, a.LINEAR)
                    }
                    return a.prototype.removeSubTex = function(a) {
                        this.subTextures.splice(this.subTextures.indexOf(a), 1), 0 == this.subTextures.length && (this.gl.deleteTexture(this.glTexture), f.removeBuffer(this))
                    }, a.prototype.active = function(a) {
                        void 0 === a && (a = 0), this.gl.activeTexture(this.gl.TEXTURE0 + a), this.gl.bindTexture(this.gl.TEXTURE_2D, this.glTexture)
                    }, a
                }(), f = function(a) {
                    function b(b, c, d, e, f, g) {
                        a.call(this), this.standAlone = !1, this.source = b, c ? (h = [d, e, f, g], this.x = h[0], this.y = h[1], this.w = h[2], this.h = h[3], this.bufferTex = c, this.glTexture = this.bufferTex.glTexture, this.sx = d / c.size, this.sy = e / c.size, this.sw = f / c.size, this.sh = g / c.size) : (this.standAlone = !0, this.sx = 0, this.sy = 0, this.sw = 1, this.sh = 1);
                        var h
                    }
                    return g(b, a), b.getTexture = function(a, c) {
                        if (void 0 === c && (c = !1), a.uuid || (a.uuid = Math.random() + ""), b.textureIndex[a.uuid]) return b.textureIndex[a.uuid];
                        var e = a.width,
                            f = a.height,
                            g = d.render.gl;
                        if (c) {
                            var h = new b;
                            return h.glTexture = g.createTexture(), g.bindTexture(g.TEXTURE_2D, h.glTexture), g.texParameteri(g.TEXTURE_2D, g.TEXTURE_MAG_FILTER, g.LINEAR), g.texParameteri(g.TEXTURE_2D, g.TEXTURE_MIN_FILTER, g.LINEAR), g.texParameteri(g.TEXTURE_2D, g.TEXTURE_WRAP_S, g.CLAMP_TO_EDGE), g.texParameteri(g.TEXTURE_2D, g.TEXTURE_WRAP_T, g.CLAMP_TO_EDGE), g.texImage2D(g.TEXTURE_2D, 0, g.RGBA, g.RGBA, g.UNSIGNED_BYTE, a), h
                        }
                        if (Math.max(e, f) > Math.min(g.getParameter(g.MAX_CUBE_MAP_TEXTURE_SIZE), 4096)) throw "Could not create Texture: Image is too large";
                        var i = b.findSpace(e, f, a);
                        return i.update(), i.bufferTex.subTextures.push(i), b.textureIndex[a.uuid] = i, i
                    }, b.findSpace = function(a, c, f) {
                        for (var g = 0; g < b.bufferTexList.length; g++) {
                            var h = b.bufferTexList[g];
                            if (0 == h.subTextures.length) return new b(f, h, 0, 0, a, c);
                            for (var i = h.subTextures.length - 1; i >= 0; i--) {
                                for (var j = h.subTextures[i], k = j.x + j.w + 2, l = j.y + 2, m = j.x + 2, n = j.y + j.h + 2, o = !1, p = !1, q = h.subTextures.length - 1; q >= 0; q--) {
                                    var r = h.subTextures[q],
                                        s = r.x,
                                        t = r.y,
                                        u = r.w,
                                        v = r.h;
                                    (k > s + u || l > t + v || k + a < s || l + c < t) && k + a < h.size && l + c < h.size || (o = !0), (m > s + u || n > t + v || m + a < s || n + c < t) && m + a < h.size && n + c < h.size && (p = !0)
                                }
                                if (!o) return new b(f, h, k, l, a, c);
                                if (!p) return new b(f, h, m, n, a, c)
                            }
                        }
                        var w = d.render.gl,
                            x = new e(w, Math.min(w.getParameter(w.MAX_TEXTURE_SIZE), 4096));
                        return b.bufferTexList.push(x), new b(f, x, 0, 0, a, c)
                    }, b.removeBuffer = function(a) {
                        b.bufferTexList.splice(b.bufferTexList.indexOf(a), 1)
                    }, b.prototype.update = function() {
                        var a = d.render.gl;
                        a.activeTexture(a.TEXTURE0), a.bindTexture(a.TEXTURE_2D, this.bufferTex.glTexture), a.texSubImage2D(a.TEXTURE_2D, 0, this.x, this.y, a.RGBA, a.UNSIGNED_BYTE, this.source)
                    }, b.prototype.deleteSource = function() {
                        this.source = null
                    }, b.prototype.destroy = function() {
                        this.bufferTex.removeSubTex(this);
                        var a = d.render.gl;
                        a.activeTexture(a.Texture0), a.bindTexture(a.TEXTURE_2D, this.bufferTex.glTexture), a.texSubImage2D(a.TEXTURE_2D, 0, this.x, this.y, this.w, this.h, a.RGBA, a.UNSIGNED_BYTE, new Uint8Array(4 * this.w * this.h))
                    }, b.prototype.active = function(a) {
                        void 0 === a && (a = 0);
                        var b = d.render.gl;
                        b.activeTexture(b.TEXTURE0 + a), b.bindTexture(b.TEXTURE_2D, this.glTexture), d.render.currentGlTexture[a] = this.glTexture
                    }, b.textureIndex = {}, b.bufferTexList = [], b
                }(c.ObjectBase), a("GlTexture", f)
            }
        }
    }), a.register("32", ["17", "15"], function(a, b) {
        "use strict";
        var c, d, e, f, g, h, i = (b && b.id, this && this.__extends || function(a, b) {
            function c() {
                this.constructor = a
            }
            for (var d in b) b.hasOwnProperty(d) && (a[d] = b[d]);
            a.prototype = null === b ? Object.create(b) : (c.prototype = b.prototype, new c)
        });
        return {
            setters: [function(a) {
                c = a
            }, function(a) {
                d = a
            }],
            execute: function() {
                e = function(a) {
                    function b(b, c) {
                        a.call(this), this.prepared = !1, this.controller = b, this.name = c
                    }
                    return i(b, a), b.prototype.prepare = function() {}, b.prototype.destroy = function() {
                        this.controller.destroyItem(this)
                    }, b
                }(c.ObjectBase), a("ResourceItem", e), f = function(a) {
                    function b(b, c, d) {
                        a.call(this, c, d), this.prepared = !0, this.audioBuffer = b, this.bgmDuration = this.audioBuffer.duration
                    }
                    return i(b, a), b.prototype.prepare = function() {}, b.prototype.prepareBgm = function() {}, b.prototype.destroy = function() {
                        a.prototype.destroy.call(this), this.audioBuffer = null
                    }, b
                }(e), a("AudioItem", f), g = function(a) {
                    function b(b, c, d) {
                        a.call(this, c, d), this.img = b, this.width = b.width, this.height = b.height
                    }
                    return i(b, a), b.prototype.prepare = function(a) {
                        void 0 === a && (a = !1), this.prepared || (this.texture = d.GlTexture.getTexture(this.img, a), this.texture.deleteSource(), this.img = null)
                    }, b.prototype.destroy = function() {
                        this.texture.destroy()
                    }, b
                }(e), a("ImageItem", g), h = function(a) {
                    function b(b, c, d) {
                        a.call(this, c, d), this.content = b
                    }
                    return i(b, a), b.prototype.json = function() {
                        return "object" == typeof this.content ? this.content : JSON.parse(this.content)
                    }, b.prototype.text = function() {}, b
                }(e), a("TextItem", h)
            }
        }
    }), a.register("33", ["17", "6", "32", "4"], function(a, b) {
        "use strict";
        var c, d, e, f, g, h = (b && b.id, this && this.__extends || function(a, b) {
            function c() {
                this.constructor = a
            }
            for (var d in b) b.hasOwnProperty(d) && (a[d] = b[d]);
            a.prototype = null === b ? Object.create(b) : (c.prototype = b.prototype, new c)
        });
        return {
            setters: [function(a) {
                c = a
            }, function(a) {
                d = a
            }, function(a) {
                e = a
            }, function(a) {
                f = a
            }],
            execute: function() {
                g = function(a) {
                    function b() {
                        a.apply(this, arguments), this.resultDic = {}
                    }
                    return h(b, a), b.prototype.loadResources = function(a, b) {
                        var c = this;
                        return new Promise(function(d, e) {
                            return c.loadResources_raw(a, d, e, b)
                        })
                    }, b.prototype.loadResources_raw = function(a, b, c, g) {
                        c = c || function() {}, g = g || function() {};
                        for (var h = 0, i = 0, j = [], k = 0; k < a.length; k++) {
                            var l = a[k],
                                m = l.name,
                                n = l.url,
                                o = l.cache,
                                p = l.standAloneTexture || !1,
                                q = function(a, l, m, n) {
                                    var o = this;
                                    if (/.+\.(jpg|png|jpeg)$/.test(l.toLowerCase())) {
                                        h++, i++, j[k] = 0;
                                        var p = k,
                                            q = document.createElement("img");
                                        q.onload = function() {
                                            this.resultDic[a] = new e.ImageItem(q, this, a), this.resultDic[a].prepare(n), i--, j[p] = 1;
                                            for (var c = 0, d = 0; d < h; d++) c += j[d];
                                            g(c / h), 0 == i && b(this)
                                        }.bind(this), q.onerror = function(a) {
                                            c(a.toString())
                                        }, q.src = l
                                    } else if (/.+\.(mp3|m4a)$/.test(l.toLowerCase())) {
                                        h++, i++, j[k] = 0;
                                        var r = k,
                                            s = new XMLHttpRequest;
                                        s.open("GET", l, !0), s.responseType = "arraybuffer", s.onload = function() {
                                            s.status >= 400 && c(s.statusText), d.audioCtl.ctx.decodeAudioData(s.response, function(c) {
                                                this.resultDic[a] = new e.AudioItem(c, this, a), i--, j[r] = 1, g(j), 0 == i && b()
                                            }.bind(this), function() {
                                                c("AudioFile Decode Error: Resource name" + a)
                                            })
                                        }.bind(this), s.onprogress = function(a) {
                                            j[r] = a.loaded / a.total;
                                            for (var b = 0, c = 0; c < h; c++) b += j[c];
                                            g(b / h)
                                        }, s.onerror = function() {
                                            c(s.statusText)
                                        }, s.send()
                                    } else {
                                        h++, i++, j[k] = 0;
                                        var t = k;
                                        f.GET(l, null, null, function(a) {}).then(function(c) {
                                            o.resultDic[a] = new e.TextItem(c, o, a), i--, j[t] = 1, g(j), 0 == i && b()
                                        }).catch(function(a) {
                                            c(a)
                                        })
                                    }
                                }.bind(this);
                            q(m, n, o, p)
                        }
                    }, b.prototype.getItem = function(a) {
                        return this.resultDic[a]
                    }, b.prototype.destroyItem = function(a) {
                        delete this.resultDic[a.name]
                    }, b
                }(c.EventBase), a("ResourceCtl", g)
            }
        }
    }), a.register("34", ["17", "6"], function(a, b) {
        "use strict";
        var c, d, e, f = (b && b.id, this && this.__extends || function(a, b) {
            function c() {
                this.constructor = a
            }
            for (var d in b) b.hasOwnProperty(d) && (a[d] = b[d]);
            a.prototype = null === b ? Object.create(b) : (c.prototype = b.prototype, new c)
        });
        return {
            setters: [function(a) {
                c = a
            }, function(a) {
                d = a
            }],
            execute: function() {
                e = function(a) {
                    function b() {
                        a.call(this), this.isPlaying = !1, this.currentTime = 0, this.startTime = 0, this.useDate = !1, this.ctx = new(window.AudioContext || window.webkitAudioContext), d.eventBus.addEventListener("beforeupdate", this.update.bind(this)), /android/i.test(navigator.userAgent) && (this.useDate = !0)
                    }
                    return f(b, a), b.prototype.startSession = function() {
                        this.ctx.resume()
                    }, b.prototype.getTime = function() {
                        return this.useDate ? .001 * Date.now() : this.ctx.currentTime
                    }, b.prototype.loadBgm = function(a) {
                        this.bgmBuffer = a.audioBuffer, this.duration = a.bgmDuration
                    }, b.prototype.playAudioItem = function(a) {
                        var b = this.ctx.createBufferSource();
                        b.buffer = a.audioBuffer, b.connect(this.ctx.destination), b.start(this.ctx.currentTime)
                    }, b.prototype.play = function(a) {
                        void 0 === a && (a = 0), this.bgmBuffer && !this.isPlaying && (this.bgmSource = this.ctx.createBufferSource(), this.bgmSource.buffer = this.bgmBuffer, this.bgmSource.connect(this.ctx.destination), this.ctx.resume ? (a > 0 && setTimeout(this.playNow.bind(this), 1e3 * a), this.ctx.resume()) : a > 0 && (this.bgmSource.start(this.ctx.currentTime + a, this.currentTime, this.duration), this.isPlaying = !0), this.startTime = this.getTime() - this.currentTime + a, this.isPlaying = !0, 0 == a && this.playNow())
                    }, b.prototype.playNow = function() {
                        this.bgmSource.start(this.ctx.currentTime, this.currentTime, this.duration), this.startTime = this.getTime() - this.currentTime, this.isPlaying = !0
                    }, b.prototype.pause = function() {
                        if (this.isPlaying) {
                            try {
                                this.bgmSource.stop()
                            } catch (a) {}
                            this.currentTime = this.getTime() - this.startTime, this.isPlaying = !1
                        }
                    }, b.prototype.seek = function(a) {
                        this.currentTime = a, this.play(0)
                    }, b.prototype.getBgmTime = function() {
                        return this.isPlaying ? this.getTime() - this.startTime : this.currentTime - this.startTime
                    }, b.prototype.update = function() {
                        this.isPlaying && this.getBgmTime() > this.duration + 1 && (this.pause(), d.eventBus.dispatchEvent("bgmEnd"))
                    }, b
                }(c.EventBase), a("AudioCtl", e)
            }
        }
    }), a.register("17", [], function(a, b) {
        "use strict";
        var c, d, e, f = (b && b.id, this && this.__extends || function(a, b) {
            function c() {
                this.constructor = a
            }
            for (var d in b) b.hasOwnProperty(d) && (a[d] = b[d]);
            a.prototype = null === b ? Object.create(b) : (c.prototype = b.prototype, new c)
        });
        return {
            setters: [],
            execute: function() {
                c = function() {
                    function a() {
                        this.uuid = Math.random() + ""
                    }
                    return a.prototype.resetState = function(a) {
                        for (var b in a) this[b] = a[b]
                    }, a.prototype.destroy = function() {}, a
                }(), a("ObjectBase", c), d = function(a) {
                    function b() {
                        a.call(this), this.listeners = {}
                    }
                    return f(b, a), b.prototype.dispatchEvent = function(a, b, c) {
                        if (void 0 === c && (c = !1), !this.listeners[a]) return !1;
                        var d = !1;
                        for (var e in this.listeners[a]) {
                            var f = this.listeners[a][e];
                            0 == f.useCapture && 1 == c || (f.listener(b, this), f.oneTime && (delete this.listeners[a][e], d = !0))
                        }
                        return d
                    }, b.prototype.addEventListener = function(a, b, c) {
                        void 0 === c && (c = !1), this.listeners[a] || (this.listeners[a] = []);
                        var d = Math.random();
                        return this.listeners[a].push({
                            listener: b,
                            useCapture: c,
                            id: d
                        }), d
                    }, b.prototype.addOneTimeListener = function(a, b) {
                        this.listeners[a] || (this.listeners[a] = []);
                        var c = Math.random();
                        return this.listeners[a].push({
                            listener: b,
                            useCapture: !0,
                            id: c,
                            oneTime: !0
                        }), c
                    }, b.prototype.removeAllEventListenersOfEvent = function(a) {
                        this.listeners[a] = []
                    }, b.prototype.removeListenerById = function(a, b) {
                        for (var c = this.listeners[a], d = 0; d < c.length; d++)
                            if (c[d].id == b) return void c.splice(d, 1)
                    }, b.prototype.removeAllListeners = function() {
                        this.listeners = {}
                    }, b
                }(c), a("EventBase", d), e = function(a) {
                    function b() {
                        a.call(this), this.children = [], this.visible = !0, this.level = 0, this._id = null
                    }
                    return f(b, a), b.getNodeById = function(a) {
                        return b.nodeList[a]
                    }, Object.defineProperty(b.prototype, "id", {
                        get: function() {
                            return this._id
                        },
                        set: function(a) {
                            if (b.nodeList[a]) throw "Duplicated id for node";
                            b.nodeList[this._id] && delete b.nodeList[this._id], b.nodeList[a] = this
                        },
                        enumerable: !0,
                        configurable: !0
                    }), b.prototype.setNode = function() {
                        this.level = this.parent.level + 1;
                        for (var a = 0; a < this.children.length; a++) this.children[a].setNode()
                    }, b.prototype.update = function(a) {
                        for (var b = 0; b < this.children.length; b++) {
                            var c = this.children[b];
                            c.visible && c.update()
                        }
                    }, b.prototype.appendChild = function(a) {
                        a.root = this.root, a.parent = this, this.children.push(a), a.setNode()
                    }, b.prototype.appendChildren = function(a) {
                        for (var b = 0, c = a; b < c.length; b++) {
                            var d = c[b];
                            this.appendChild(d)
                        }
                    }, b.prototype.insertChild = function(a, b) {
                        void 0 === b && (b = 0), a.root = this.root, a.parent = this, this.children.splice(b, 0, a), a.setNode()
                    }, b.prototype.indexOfChild = function(a) {
                        return this.children.indexOf(a)
                    }, b.prototype.removeChild = function(a) {
                        this.children.splice(this.children.indexOf(a), 1)
                    }, b.prototype.getChildrenCount = function() {
                        for (var a = this.children.length, b = 0, c = a; b < c; b++) a += this.children[b].getChildrenCount();
                        return a
                    }, b.prototype.destroy = function() {
                        delete b.nodeList[this._id]
                    }, b.nodeList = {}, b
                }(d), a("NodeBase", e)
            }
        }
    }), a.register("35", ["17"], function(a, b) {
        "use strict";
        var c, d, e = (b && b.id, this && this.__extends || function(a, b) {
            function c() {
                this.constructor = a
            }
            for (var d in b) b.hasOwnProperty(d) && (a[d] = b[d]);
            a.prototype = null === b ? Object.create(b) : (c.prototype = b.prototype, new c)
        });
        return {
            setters: [function(a) {
                c = a
            }],
            execute: function() {
                d = function(a) {
                    function b() {
                        a.apply(this, arguments), this.initialized = !1
                    }
                    return e(b, a), b.prototype.init = function() {
                        this.initialized || (window.addEventListener("keydown", this.onKeyDown.bind(this)), window.addEventListener("keyup", this.onKeyUp.bind(this)), this.initialized = !0)
                    }, b.prototype.addEventListener = function(b, c, d) {
                        return void 0 === d && (d = !1), this.init(), a.prototype.addEventListener.call(this, b, c, d)
                    }, b.prototype.onKeyDown = function(a) {
                        a.preventDefault(), a.stopPropagation(), this.dispatchEvent("keydown", a.key)
                    }, b.prototype.onKeyUp = function(a) {
                        a.preventDefault(), a.stopPropagation(), this.dispatchEvent("keyup", a.key)
                    }, b
                }(c.EventBase), a("Keyboard", d)
            }
        }
    }), a.register("6", ["17", "31", "1f", "33", "34", "35"], function(a, b) {
        "use strict";

        function c(b, c, d) {
            void 0 === c && (c = [1024, 768]), void 0 === d && (d = window.devicePixelRatio), k.container = b, k.pixelRatio = d, a("audioCtl", l = new i.AudioCtl), a("resourceCtl", m = new h.ResourceCtl), a("render", n = new f.Render(c)), a("touchCtl", o = new g.TouchCtl)
        }

        function d(a) {
            var b = document.createElement("script");
            document.body.appendChild(b), b.src = a
        }
        var e, f, g, h, i, j, k, l, m, n, o, p, q;
        b && b.id;
        return a("setEngine", c), a("loadScript", d), {
            setters: [function(a) {
                e = a
            }, function(a) {
                f = a
            }, function(a) {
                g = a
            }, function(a) {
                h = a
            }, function(a) {
                i = a
            }, function(a) {
                j = a
            }],
            execute: function() {
                a("settings", k = {
                    container: null,
                    pixelRatio: 1
                }), a("eventBus", p = new e.EventBase), a("keyboard", q = new j.Keyboard)
            }
        }
    }), a.register("36", [], function(a, b) {
        "use strict";

        function c() {
            return Date.now()
        }
        b && b.id;
        return a("getTime", c), {
            setters: [],
            execute: function() {}
        }
    }), a.register("14", ["25", "6", "36"], function(a, b) {
        "use strict";

        function c(a, b, c) {
            if (0 == h.length) return new i(a, b, c);
            var d = h.shift();
            return d.object = a, d.field = b, d.controller = c, d.start(), d
        }
        var d, e, f, g, h, i, j, k, l;
        b && b.id;
        return {
            setters: [function(a) {
                d = a
            }, function(a) {
                e = a
            }, function(a) {
                f = a
            }],
            execute: function() {
                ! function(a) {
                    var b = function() {
                        function a(a, b) {
                            this.type = 0, this.value = a, this.time = b
                        }
                        return a
                    }();
                    a.Translate = b;
                    var c = function() {
                        function a(a, b) {
                            this.type = 1, this.value = a, this.time = b
                        }
                        return a
                    }();
                    a.TranslateTo = c;
                    var d = function() {
                        function a(a) {
                            this.times = 0, this.type = 2, a ? this.times = a : this.times = Number.MAX_VALUE
                        }
                        return a
                    }();
                    a.Loop = d;
                    var e = function() {
                        function a(a) {
                            this.type = 3, this.callback = a
                        }
                        return a
                    }();
                    a.Then = e;
                    var f = function() {
                        function a(a) {
                            this.type = 4, this.value = a
                        }
                        return a
                    }();
                    a.Set = f
                }(g || (g = {})), h = [], i = function() {
                    function a(a, b, c) {
                        this.tweenActList = [], this.currentActionIndex = 0, this.loopStart = 0, this.currentLoop = 0, this._resetAfterFinished = !1, this._loopAfterFinished = !1, this.active = !0, this.object = a, this.field = b, this.controller = c, this.start()
                    }
                    return a.prototype.start = function() {
                        this.loopStartValue = this.lastActionValue = this.initialValue = this.object[this.field], this.lastActionTime = this.startTime = f.getTime()
                    }, a.prototype.reset = function() {
                        this.object[this.field] = this.initialValue, this.currentActionIndex = 0, this.loopStart = 0, this.currentLoop = 0, this.loopStartValue = this.lastActionValue = this.initialValue, this.lastActionTime = this.startTime = f.getTime()
                    }, a.prototype.endAll = function() {
                        this.controller.removeAllAnimations(this.object)
                    }, a.prototype.end = function() {
                        return this._loopAfterFinished ? void this.reset() : (this._resetAfterFinished && (this.object[this.field] = this.initialValue), this.controller.remove(this.object, this.field), this._loopAfterFinished = !1, this._resetAfterFinished = !1, this.object = null, this.currentLoop = 0, this.loopStart = 0, this.currentActionIndex = 0, this.tweenActList = [], this.lastAct = null, void h.push(this))
                    }, a.prototype.update = function(a) {
                        var b = this.tweenActList[this.currentActionIndex];
                        do {
                            if (0 == b.type ? a - this.lastActionTime >= b.time && (this.currentActionIndex++, this.lastActionValue = this.lastActionValue + b.value, this.object[this.field] = this.lastActionValue, this.lastActionTime = this.lastActionTime + b.time) : 1 == b.type ? a - this.lastActionTime >= b.time && (this.currentActionIndex++, this.lastActionValue = b.value, this.object[this.field] = this.lastActionValue, this.lastActionTime = this.lastActionTime + b.time) : 2 == b.type ? (this.currentLoop++, this.currentLoop > b.times ? (this.currentActionIndex++, this.currentLoop = 0, this.loopStart = this.currentActionIndex, this.loopStartValue = this.lastActionValue) : (this.currentActionIndex = this.loopStart, this.lastActionValue = this.loopStartValue, this.currentLoop++)) : 3 == b.type ? (this.currentActionIndex++, b.callback()) : 4 == b.type && (this.currentActionIndex++, this.object[this.field] = b.value), this.currentActionIndex >= this.tweenActList.length) return void this.end();
                            b = this.tweenActList[this.currentActionIndex]
                        } while (!(b.type < 2));
                        0 == b.type ? b.easing ? this.object[this.field] = b.easing(a - this.lastActionTime, this.lastActionValue, b.value, b.time) : this.object[this.field] = this.lastActionValue + b.value * (a - this.lastActionTime) / b.time : 1 == b.type && (b.easing ? this.object[this.field] = b.easing(a - this.lastActionTime, this.lastActionValue, b.value - this.lastActionValue, b.time) : this.object[this.field] = this.lastActionValue + (b.value - this.lastActionValue) * (a - this.lastActionTime) / b.time)
                    }, a.prototype.addTweenAction = function(a) {
                        this.tweenActList.push(a), this.lastAct = a
                    }, a.prototype.translateTo = function(a, b) {
                        return this.addTweenAction(new g.TranslateTo(a, b)), this
                    }, a.prototype.translate = function(a, b) {
                        return this.addTweenAction(new g.Translate(a, b)), this
                    }, a.prototype.easing = function(a) {
                        return this.lastAct.easing = a, this
                    }, a.prototype.loop = function(a) {
                        return this.addTweenAction(new g.Loop(a)), this
                    }, a.prototype.delay = function(a) {
                        return this.addTweenAction(new g.Translate(0, a)), this
                    }, a.prototype.then = function(a) {
                        return this.addTweenAction(new g.Then(a)), this
                    }, a.prototype.set = function(a) {
                        return this.addTweenAction(new g.TranslateTo(a, 0)), this
                    }, a.prototype.resetAfterFinished = function(a) {
                        void 0 === a && (a = !0), this._resetAfterFinished = a
                    }, a.prototype.loopAfterFinished = function(a) {
                        void 0 === a && (a = !0), this._loopAfterFinished = a
                    }, a
                }(), j = function() {
                    function a() {
                        this.animationList = {}, this.selectObject = {}, e.eventBus.addEventListener("beforeupdate", this.update.bind(this))
                    }
                    return a.prototype.add = function(a, b) {
                        if (a.uuid || (a.uuid = Math.random() + ""), !b) return this.selectObject = a, this;
                        var d = a.uuid + b;
                        return this.animationList[d] || (this.animationList[d] = c(a, b, this)), this.animationList[d]
                    }, a.prototype.select = function(a, b) {
                        return this.add(a, b)
                    }, a.prototype.endAll = function() {
                        this.removeAllAnimations(this.selectObject)
                    }, a.prototype.removeAllAnimations = function(a) {
                        for (var b in this.animationList) this.animationList[b].object == a && (this.animationList[b].end(), delete this.animationList[b])
                    }, a.prototype.remove = function(a, b) {
                        delete this.animationList[a.uuid + b]
                    }, a.prototype.playAction = function(a) {
                        this.removeAllAnimations(this.selectObject);
                        for (var b, c, e = 0, f = Object.keys(a); e < f.length; e++) {
                            var g = f[e],
                                h = a[g],
                                i = this.add(this.selectObject, g);
                            c = i;
                            for (var j = 0; j < h.length; j++) {
                                var k = h[j];
                                switch (k.type) {
                                    case "translate":
                                        i.translate(k.value, k.time);
                                        break;
                                    case "translateTo":
                                        i.translateTo(k.value, k.time);
                                        break;
                                    case "delay":
                                        i.delay(k.time);
                                        break;
                                    case "loop":
                                        i.loop(k.times);
                                        break;
                                    case "set":
                                        i.set(k.value);
                                        break;
                                    case "end":
                                        b = i
                                }
                                k.easing && "none" != k.easing && i.easing(d.Easing[k.easing])
                            }
                        }
                        return b || c
                    }, a.prototype.update = function() {
                        var a = f.getTime();
                        for (var b in this.animationList) this.animationList[b].update(a)
                    }, a
                }(), a("TweenCtl", k = new j), a("Tween", l = k.add.bind(k))
            }
        }
    }), a.register("37", ["6", "f", "24", "14"], function(a, b) {
        "use strict";

        function c() {
            for (var a = 0; a < 9; a++) {
                var b = new g.SimpleParticleSystem(e.resourceCtl.getItem("uiAssets"), f.Settings.rankParticleSystem);
                b.x = 1.246334 * -Math.cos(Math.PI * (a / 8)), b.y = .501466 - 1.246334 * Math.sin(Math.PI * (a / 8)), b.zIndex = 100, i.push(b), e.render.appendChild(b)
            }
        }

        function d(a, b) {
            var c = i[a];
            h.Tween(c).endAll(), h.Tween(c).playAction(f.Settings.rankParticleAction), c.color = f.Settings.rankParticleColor[b]
        }
        var e, f, g, h, i;
        b && b.id;
        return a("init", c), a("playFX", d), {
            setters: [function(a) {
                e = a
            }, function(a) {
                f = a
            }, function(a) {
                g = a
            }, function(a) {
                h = a
            }],
            execute: function() {
                a("rankFXes", i = [])
            }
        }
    }), a.register("19", ["6", "16", "14", "12", "20", "f", "37"], function(a, b) {
        "use strict";

        function c(b) {
            n.init(), a("stat", p = new o(b)), r = h.resourceCtl.getItem("perfect"), s = h.resourceCtl.getItem("great"), t = h.resourceCtl.getItem("good");
            var c = h.resourceCtl.getItem("uiAssets");
            a("perfectSpr", u = new i.Sprite(c, m.Settings.rankInitialState.x, m.Settings.rankInitialState.y, null, null, m.Settings.sprites.perfect)), a("greatSpr", v = new i.Sprite(c, m.Settings.rankInitialState.x, m.Settings.rankInitialState.y, null, null, m.Settings.sprites.great)), a("goodSpr", w = new i.Sprite(c, m.Settings.rankInitialState.x, m.Settings.rankInitialState.y, null, null, m.Settings.sprites.good)), a("badSpr", x = new i.Sprite(c, m.Settings.rankInitialState.x, m.Settings.rankInitialState.y, null, null, m.Settings.sprites.bad)), a("missSpr", y = new i.Sprite(c, m.Settings.rankInitialState.x, m.Settings.rankInitialState.y, null, null, m.Settings.sprites.miss)), A = new k.SpriteBatchNode, A.appendChildren([u, v, w, x, y]), a("score", B = new l.Digits(h.resourceCtl.getItem("uiAssets"), 5, 2, null, m.Settings.sprites.scoreDigits)), a("combo", C = new l.Digits(h.resourceCtl.getItem("uiAssets"), 5, 2, null, m.Settings.sprites.comboDigits)), B.y = m.Settings.scoreInitialState.y, B.h = m.Settings.scoreInitialState.h, B.x = m.Settings.scoreInitialState.x, C.y = m.Settings.comboInitialState.y, C.x = m.Settings.comboInitialState.x, C.h = m.Settings.comboInitialState.h, C.opacity = 0, B.opacity = 0, A.appendChildren([B, C]), h.render.appendChild(A)
        }

        function d() {
            j.Tween(B, "opacity").translateTo(1, 300), j.Tween(C, "opacity").translateTo(1, 300)
        }

        function e() {
            j.Tween(B, "opacity").translateTo(0, 300), j.Tween(C, "opacity").translateTo(0, 300)
        }

        function f(a) {
            z && (j.Tween(z).endAll(), z.opacity = 0), z = a, a.resetState(m.Settings.rankInitialState), j.Tween(a).playAction(m.Settings.rankAction), j.Tween(C).endAll(), C.resetState(m.Settings.comboInitialState), C.scale = m.Settings.comboInitialState.scale, C.number = p.currentCombo ? p.currentCombo : null, j.Tween(C).playAction(m.Settings.comboAction)
        }

        function g(a, b) {
            if (null == a) return f(y), p.miss++, void p.breakCombo();
            var c = Math.abs(a);
            c <= q.perfect ? (h.audioCtl.playAudioItem(r), p.perfect++, p.combo(), p.score += p.scorePerNote, f(u), n.playFX(b, "perfect")) : c <= q.great ? (h.audioCtl.playAudioItem(s), p.great++, p.combo(), p.score += .8 * p.scorePerNote, f(v), n.playFX(b, "great")) : c <= q.good ? (h.audioCtl.playAudioItem(t), p.good++, p.breakCombo(), p.score += .5 * p.scorePerNote, f(w), n.playFX(b, "good")) : c <= q.bad ? (p.bad++, p.breakCombo(), p.score += .3 * p.scorePerNote, f(x),
                n.playFX(b, "bad")) : (p.miss++, p.breakCombo(), f(y), p.count--), p.offsetData[p.count] = a, p.count++, j.Tween(B, "number").end(), j.Tween(B, "number").translateTo(p.score, 300)
        }
        var h, i, j, k, l, m, n, o, p, q, r, s, t, u, v, w, x, y, z, A, B, C;
        b && b.id;
        return a("init", c), a("showScore", d), a("hideScore", e), a("rank", g), {
            setters: [function(a) {
                h = a
            }, function(a) {
                i = a
            }, function(a) {
                j = a
            }, function(a) {
                k = a
            }, function(a) {
                l = a
            }, function(a) {
                m = a
            }, function(a) {
                n = a
            }],
            execute: function() {
                o = function() {
                    function a(a) {
                        this.totalNotes = a, this.perfect = 0, this.great = 0, this.good = 0, this.bad = 0, this.miss = 0, this.offsetData = new Float32Array(1e4), this.count = 0, this.maxCombo = 0, this.currentCombo = 0, this.scorePerNote = 0, this.score = 0, this.scorePerNote = 9e5 / a
                    }
                    return a.prototype.combo = function() {
                        this.currentCombo++, this.maxCombo = Math.max(this.currentCombo, this.maxCombo)
                    }, a.prototype.breakCombo = function() {
                        this.currentCombo = 0
                    }, a.prototype.getFinalResult = function() {
                        return Math.min(1e6, Math.round(this.score + Math.min(this.maxCombo / this.totalNotes * 1e5 * 2, 1e5)))
                    }, a.prototype.getLatencyStat = function() {
                        for (var a = 0, b = 0; b < this.count; b++) a += this.offsetData[b];
                        return a / this.count
                    }, a.prototype.getOffsetStat = function() {
                        for (var a = 0, b = 0; b < this.count; b++) a += Math.abs(this.offsetData[b]);
                        return a / this.count
                    }, a
                }(), a("rankTiming", q = {
                    miss: 200,
                    bad: 160,
                    good: 115.2,
                    great: 72,
                    perfect: 34.5
                })
            }
        }
    }), a.register("4", [], function(a, b) {
        "use strict";

        function c(a, b, c, d, e, g) {
            return void 0 === b && (b = "GET"), void 0 === c && (c = {
                headers: {},
                params: {}
            }), void 0 === d && (d = null), new Promise(function(h, i) {
                c = c || {
                    headers: {},
                    params: {}
                };
                var j = new f;
                j.open(a, b, c.params, c.headers, d, e, function(a) {
                    h(a)
                }, function(a) {
                    i(a)
                }, g)
            })
        }

        function d(a, b, d, e) {
            return void 0 === b && (b = {
                headers: {},
                params: {}
            }), c(a, "GET", b, null, d, e)
        }

        function e(a, b, d, e) {
            return void 0 === b && (b = {
                headers: {},
                params: {}
            }), void 0 === d && (d = null), c(a, "POST", b, d, e)
        }
        var f;
        b && b.id;
        return a("HTTP", c), a("GET", d), a("POST", e), {
            setters: [],
            execute: function() {
                f = function() {
                    function a() {}
                    return a.prototype.open = function(a, b, c, d, e, f, g, h, i) {
                        void 0 === b && (b = "GET"), void 0 === c && (c = {}), void 0 === d && (d = {}), void 0 === e && (e = null), void 0 === g && (g = function(a) {}), void 0 === h && (h = function(a) {}), void 0 === i && (i = function(a, b) {});
                        var j = new XMLHttpRequest,
                            k = [];
                        for (var l in c) c.hasOwnProperty(l) && k.push(l + "=" + c[l]);
                        var m = "";
                        k.length > 0 && (m = "?" + k.join("&")), j.open(b, a + m);
                        for (var l in d) d.hasOwnProperty(l) && j.setRequestHeader(l, d[l]);
                        f && (j.responseType = f), j.onload = function() {
                            j.status >= 400 ? h(j.statusText) : g("application/json" == j.getResponseHeader("Content-Type") ? JSON.parse(j.responseText) : j.response)
                        }, j.onerror = function(a) {
                            h(j.statusText)
                        }, j.onprogress = function(a) {
                            i(a.loaded / a.total, a)
                        }, j.send(e)
                    }, a
                }(), a("Request", f)
            }
        }
    }), a.register("f", ["4"], function(a, b) {
        "use strict";

        function c(b) {
            return d.GET(b).then(function(b) {
                for (var c in e) b.hasOwnProperty(c) || (b[c] = e[c]);
                a("Settings", e = b)
            })
        }
        var d, e, f, g, h;
        b && b.id;
        return a("loadSettings", c), {
            setters: [function(a) {
                d = a
            }],
            execute: function() {
                a("Settings", e = {
                    settingVersion: 1,
                    loadingPromotion: ["加载中..", "正在同步神经接口..", "正在和长者谈笑风生..", "正在前往花村..", "正在丢雷姆..", "正在召集lo娘..", "正在打call..", "正在潜入音乃木坂学院..", "正在鄙视bog..", "正在和小学生对喷..", "正在pr穹妹..", "正在重构LLP..", "正在给LLP续命..", "正在发现女装少年..", "少女祈祷中..", "正在吞谱..", "正在卡loading..", "正在准备面基..", "正在收扶老二..", "正在为您接通妖妖灵..", "正在调戏日日日..", "正在擦洗note..", "正在爆破手机..", "正在捕食二刺螈..", "正在播撒头皮屑.."],
                    loadingParticleSystem: {
                        size: 6,
                        simpleParticle: !1,
                        emitterType: 3,
                        pointScale: 5,
                        emitSpeed: 1,
                        fade: 5,
                        enabled: !0,
                        color: [1, 1, 1]
                    },
                    sprites: {
                        noteSpr: {
                            sx: 396,
                            sy: 15,
                            sw: 128,
                            sh: 128
                        },
                        parallelSpr: {
                            sx: 242,
                            sy: 417,
                            sw: 128,
                            sh: 24
                        },
                        tailSpr: {
                            sx: 255,
                            sy: 275,
                            sw: 128,
                            sh: 128
                        },
                        longNoteSpr: {
                            sx: 36,
                            sy: 560,
                            sw: 500,
                            sh: 10
                        },
                        perfect: {
                            sx: 12,
                            sy: 4,
                            sw: 372,
                            sh: 102,
                            opacity: 0,
                            scale: .7
                        },
                        great: {
                            sx: 20,
                            sy: 109,
                            sw: 257,
                            sh: 80,
                            opacity: 0,
                            scale: .7
                        },
                        good: {
                            sx: 19,
                            sy: 209,
                            sw: 246,
                            sh: 80,
                            opacity: 0,
                            scale: .7
                        },
                        bad: {
                            sx: 19,
                            sy: 306,
                            sw: 172,
                            sh: 80,
                            opacity: 0,
                            scale: .7
                        },
                        miss: {
                            sx: 21,
                            sy: 398,
                            sw: 200,
                            sh: 80,
                            opacity: 0,
                            scale: .7
                        },
                        comboDigits: {
                            sw: 250,
                            sh: 200,
                            sx: 600,
                            sy: 200,
                            row: 2,
                            stride: 5
                        },
                        scoreDigits: {
                            sw: 250,
                            sh: 200,
                            sx: 600,
                            sy: 200,
                            row: 2,
                            stride: 5
                        }
                    },
                    rankInitialState: {
                        x: 0,
                        y: 0,
                        scale: .5,
                        opacity: 1
                    },
                    rankAction: {
                        opacity: [{
                            type: "delay",
                            time: 100
                        }, {
                            type: "translateTo",
                            time: 500,
                            value: 0
                        }],
                        scale: [{
                            type: "translateTo",
                            time: 200,
                            value: .8,
                            easing: "easeOutElastic"
                        }]
                    },
                    comboInitialState: {
                        x: 0,
                        y: .3,
                        h: .2,
                        scale: 1,
                        opacity: 1
                    },
                    comboAction: {
                        scale: [{
                            type: "translateTo",
                            value: 1.4,
                            time: 60
                        }, {
                            type: "translateTo",
                            value: 1,
                            time: 100
                        }]
                    },
                    longNotePressAction: {
                        opacity: [{
                            type: "translateTo",
                            value: .2,
                            time: 1e3
                        }, {
                            type: "translateTo",
                            value: .5,
                            time: 1e3
                        }, {
                            type: "loop",
                            times: null
                        }]
                    },
                    longNoteInitialState: {
                        opacity: .5
                    },
                    backgroundSprites: [],
                    rankParticleSystem: {
                        sw: 128,
                        sh: 128,
                        sx: 600,
                        sy: 400,
                        stride: 2,
                        row: 2,
                        size: 35,
                        speed: 3,
                        scale: .1,
                        randomize: 1,
                        fade: 2
                    },
                    rankParticleColor: {
                        perfect: [1, 1, .76, 1],
                        great: [.7, .7, 1, 1],
                        good: [.8, .6, .6, 1],
                        bad: [.6, .6, .6, 1]
                    },
                    rankParticleAction: {
                        progress: [{
                            type: "set",
                            value: .4,
                            time: 300
                        }, {
                            type: "translateTo",
                            value: 1,
                            time: 300
                        }]
                    },
                    resultScoreAction: {
                        x: [{
                            type: "translateTo",
                            value: .5,
                            time: 300
                        }],
                        scale: [{
                            type: "translateTo",
                            value: 2,
                            time: 300
                        }]
                    },
                    scoreInitialState: {
                        x: 0,
                        y: .75,
                        h: .15
                    },
                    resultRankCountActions: {
                        great: {
                            scale: [{
                                type: "set",
                                value: .6
                            }],
                            y: [{
                                type: "set",
                                value: .3
                            }],
                            x: [{
                                type: "set",
                                value: 2
                            }, {
                                type: "delay",
                                time: 200
                            }, {
                                type: "translateTo",
                                value: -.6,
                                time: 400,
                                easing: "easeOutQuad"
                            }],
                            w: [{
                                type: "set",
                                value: 1
                            }, {
                                type: "delay",
                                time: 6e3
                            }, {
                                type: "translateTo",
                                value: -1,
                                time: 300
                            }, {
                                type: "translateTo",
                                value: 1,
                                time: 300
                            }, {
                                type: "loop",
                                times: null
                            }]
                        },
                        perfect: {
                            scale: [{
                                type: "set",
                                value: .6
                            }, {
                                type: "delay",
                                time: 5e3
                            }, {
                                type: "translateTo",
                                value: .8,
                                time: 70
                            }, {
                                type: "translateTo",
                                value: .6,
                                time: 200
                            }, {
                                type: "loop",
                                times: null
                            }],
                            y: [{
                                type: "set",
                                value: .3
                            }],
                            x: [{
                                type: "set",
                                value: 2
                            }, {
                                type: "translateTo",
                                value: 0,
                                time: 400,
                                easing: "easeOutQuad"
                            }]
                        },
                        good: {
                            scale: [{
                                type: "set",
                                value: .6
                            }],
                            y: [{
                                type: "set",
                                value: .3
                            }],
                            x: [{
                                type: "set",
                                value: 2
                            }, {
                                type: "delay",
                                time: 400
                            }, {
                                type: "translateTo",
                                value: .6,
                                time: 400,
                                easing: "easeOutQuad"
                            }],
                            rotation: [{
                                type: "delay",
                                time: 8e3
                            }, {
                                type: "translate",
                                value: 18.849556,
                                time: 500,
                                easing: "easeOutQuad"
                            }, {
                                type: "loop",
                                times: null
                            }]
                        },
                        bad: {
                            scale: [{
                                type: "set",
                                value: .6
                            }],
                            y: [{
                                type: "set",
                                value: -.1
                            }],
                            x: [{
                                type: "set",
                                value: 2
                            }, {
                                type: "delay",
                                time: 600
                            }, {
                                type: "translateTo",
                                value: -.4,
                                time: 400,
                                easing: "easeOutQuad"
                            }]
                        },
                        miss: {
                            scale: [{
                                type: "set",
                                value: .6
                            }],
                            y: [{
                                type: "set",
                                value: -.1
                            }],
                            x: [{
                                type: "set",
                                value: 2
                            }, {
                                type: "delay",
                                time: 800
                            }, {
                                type: "translateTo",
                                value: .4,
                                time: 400,
                                easing: "easeOutQuad"
                            }]
                        },
                        technical: {
                            opacity: [{
                                type: "set",
                                value: 0
                            }, {
                                type: "delay",
                                time: 1e3
                            }, {
                                type: "translateTo",
                                value: 1,
                                time: 300
                            }]
                        }
                    }
                }), a("renderPrecision", f = parseFloat(localStorage.getItem("renderP") || "1") || 1), a("delay", g = parseFloat(localStorage.getItem("delay") || "0") || 0), a("userSpeed", h = parseInt(localStorage.getItem("speed") || "0") || null)
            }
        }
    }), a.register("1", ["6", "12", "16", "3", "11", "14", "25", "13", "18", "1c", "19", "f"], function(a, b) {
        "use strict";
        var c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, r;
        b && b.id;
        return {
            setters: [function(a) {
                c = a
            }, function(a) {
                d = a
            }, function(a) {
                e = a
            }, function(a) {
                f = a
            }, function(a) {
                g = a
            }, function(a) {
                h = a
            }, function(a) {
                i = a
            }, function(a) {
                j = a
            }, function(a) {
                k = a
            }, function(a) {
                l = a
            }, function(a) {
                m = a
            }, function(a) {
                n = a
            }],
            execute: function() {
                c.setEngine(document.body, [1024, 682], window.devicePixelRatio * n.renderPrecision);
                try {
                    r = location.href.match(/live_id=(.+)/)[1]
                } catch (a) {
                    r = null
                }
                f.load(r).then(function(a) {
                    return f.liveinfo.customize ? n.loadSettings(f.liveinfo.customize) : null
                }).then(function(b) {
                    return g.start(), document.title = f.liveinfo.title, a("title", q = f.liveinfo.title), c.resourceCtl.loadResources([{
                        name: "bg",
                        url: f.liveinfo.bgimg,
                        standAloneTexture: !0
                    }, {
                        name: "perfect",
                        url: f.liveinfo.perfect
                    }, {
                        name: "great",
                        url: f.liveinfo.great
                    }, {
                        name: "good",
                        url: f.liveinfo.good
                    }, {
                        name: "uiAssets",
                        url: f.liveinfo.uiAssets,
                        standAloneTexture: !0
                    }, {
                        name: "bgm",
                        url: f.liveinfo.bgm
                    }, {
                        name: "map",
                        url: f.liveinfo.map
                    }, {
                        name: "coverImg",
                        url: f.liveinfo.coverImg,
                        standAloneTexture: !0
                    }], function(a) {
                        return g.progress(a)
                    })
                }).then(function() {
                    return g.stop()
                }).then(function() {
                    function b() {}
                    a("bgLayer", p = new d.SpriteBatchNode), a("uiLayer", o = new d.SpriteBatchNode(64));
                    var f = (c.resourceCtl.getItem("perfect"), c.resourceCtl.getItem("bg")),
                        g = new e.Sprite(f, 0, 0, f.width / f.height * 2, 2, {});
                    c.render.addEventListener("resize", b), b(), p.appendChild(g), c.audioCtl.loadBgm(c.resourceCtl.getItem("bgm"));
                    var n = c.resourceCtl.getItem("coverImg"),
                        q = new e.Sprite(n, 0, .3, n.width / n.height, 1, {}),
                        r = new j.TextSprite(400, 100, "Touch To Start", 40);
                    r.y = -.4, p.appendChild(q), p.appendChild(r), c.render.appendChild(p), g.opacity = .1, p.opacity = 0, h.Tween(p, "opacity").translateTo(1, 500), l.init(c.resourceCtl.getItem("map").json());
                    var s = !1,
                        t = function() {
                            s || (s = !0, l.enableTouch(), c.audioCtl.play(1.5), h.Tween(r, "opacity").translateTo(0, 200).then(function() {
                                return c.render.appendChild(o)
                            }), h.Tween(q, "opacity").translateTo(0, 200).then(function() {
                                return p.removeChild(q)
                            }), h.Tween(q, "scale").translateTo(2, 300).easing(i.Easing.easeInQuad), h.Tween(r, "scale").translateTo(2, 300).easing(i.Easing.easeInQuad).then(function() {
                                p.removeChild(r), m.showScore()
                            }), h.Tween(g, "opacity").translateTo(1, 1e3))
                        };
                    g.addOneTimeListener("touchend", t), c.keyboard.addOneTimeListener("keyup", t), c.eventBus.addEventListener("bgmEnd", function() {
                        return k.showResult()
                    })
                })
            }
        }
    })
})(function(a) {
    a()
});