(function() {
    try {
        var tools = {
            moveed: false,
            setCookies: function(cookie_name, value, Days, cookiedomain) {
                if (Days == "" || typeof Days == "undefined") {
                    Days = 1;
                }
                var oDate = new Date();
                oDate.setDate(oDate.getDate() + Days);
                if (cookiedomain != "" && typeof cookiedomain != "undefined") {
                    document.cookie = cookie_name + "=" + encodeURI(value) + ";expires=" + oDate + ";Domain:" + cookiedomain;
                } else {
                    document.cookie = cookie_name + "=" + encodeURI(value) + ";expires=" + oDate;
                }
            },
            getCookies: function(cookie_name) {
                var arr1 = document.cookie.split("; ");
                for (var i = 0; i < arr1.length; i++) {
                    var arr2 = arr1[i].split("=");
                    if (arr2[0] == cookie_name) {
                        return decodeURI(arr2[1]);
                    }
                }
                return "";
            },
            delCookies: function(key, domain) {
                this.setCookies(key, "", -1, domain);
            },
            setLocalStorage: function(key, value) {
                try {
                    if (localStorage) {
                        localStorage.setItem(key, value);
                    }
                } catch(e) {}
            },
            getLocalStorage: function(key) {
                try {
                    if (localStorage) {
                        return localStorage.getItem(key);
                    }
                } catch(e) {}
            },
            removeLocalStorage: function(key) {
                try {
                    if (localStorage) {
                        return localStorage.removeItem(key);
                    }
                } catch(e) {}
            },
            tap: function(selector, callback, classname) {
                var elements = document.querySelectorAll(selector);
                if (elements.length <= 0) {
                    return
                }
                var _bind;
                _bind = function(fn, me) {
                    return function() {
                        return fn(me);
                    };
                };
                for (var i = 0; i < elements.length; i++) {
                    if (this.ensureos() !== "pc") {
                        var _this = elements[i];
                        elements[i].addEventListener("touchstart", _bind(function(e) {
                            window.event.stopPropagation();
                            this.moveed = false;
                            $(selector).removeClass(classname);
                            $(e).addClass(classname);
                        },
                        elements[i]));
                        elements[i].addEventListener("touchmove", _bind(function(e) {
                            this.moveed = true;
                            $(selector).removeClass(classname);
                        },
                        elements[i]));
                        elements[i].addEventListener("touchend", _bind(function(e) {
                            window.event.stopPropagation();
                            $(selector).removeClass(classname);
                            if (!this.moveed) {
                                this.moveed = true;
                                callback(e);
                            }
                        },
                        elements[i]));
                    } else {
                        elements[i].addEventListener("click", _bind(function(e) {
                            callback(e);
                        },
                        elements[i]));
                    }
                }
            },
            historyPush: function(url) {
                var state = {
                    url: window.location.href
                };
                history.pushState(state, document.title, url);
            },
            historyReplace: function(url) {
                var state = {
                    url: window.location.href
                };
                history.replaceState(state, document.title, url);
            },
            getBrowser: function() {
                var Sys = {};
                var ua = navigator.userAgent.toLowerCase();
                var browser = "chrome";
                var s; (s = ua.match(/msie ([\d.]+)/)) ? Sys.ie = s[1] : (s = ua.match(/firefox\/([\d.]+)/)) ? Sys.firefox = s[1] : (s = ua.match(/chrome\/([\d.]+)/)) ? Sys.chrome = s[1] : (s = ua.match(/opera.([\d.]+)/)) ? Sys.opera = s[1] : (s = ua.match(/version\/([\d.]+).*safari/)) ? Sys.safari = s[1] : 0;
                if (Sys.ie) {
                    browser = "ie";
                } else {
                    if (Sys.firefox) {
                        browser = "firefox";
                    } else {
                        if (Sys.chrome) {
                            browser = "chrome";
                        } else {
                            if (Sys.opera) {
                                browser = "opera";
                            } else {
                                if (Sys.safari) {
                                    browser = "safari";
                                }
                            }
                        }
                    }
                }
                return browser;
            },
            getBrowserType: function() {
                var browserType = this.getBrowser();
                if (browserType == "firefox") {
                    browserType = "moz";
                } else {
                    if (browserType == "chrome" || browserType == "opera" || browserType == "safari") {
                        browserType = "webkit";
                    } else {
                        if (browserType == "ie") {
                            browserType = "mise";
                        }
                    }
                }
                return browserType;
            },
            ensureos: function() {
                var ua = navigator.userAgent;
                var os = "";
                if (ua.indexOf("iPad") != -1 || ua.indexOf("iPhone") != -1 || ua.indexOf("iPod") != -1) {
                    os = "ios";
                } else {
                    if (ua.indexOf("Android") != -1) {
                        os = "android";
                    } else {
                        if (ua.indexOf("Windows Phone") != -1) {
                            os = "windowsphone";
                        } else {
                            if (ua.indexOf("windows8 metro") != -1) {
                                os = "windows8";
                            } else {
                                os = "pc";
                            }
                        }
                    }
                }
                return os;
            },
            checkAndroidSys: function() {
                var u = navigator.userAgent,
                app = navigator.appVersion;
                if (u.indexOf("Android 2") > -1) {
                    return 2;
                }
            },
            is_weixin: function() {
                var ua = navigator.userAgent.toLowerCase();
                if (ua.match(/MicroMessenger/i) == "micromessenger") {
                    return true;
                } else {
                    return false;
                }
            },
            addScript: function(url) {
                var head = document.getElementsByTagName("head")[0];
                var script = document.createElement("script");
                script.type = "text/javascript";
                script.src = url;
                head.appendChild(script);
                return script;
            },
            addCss: function(url) {
                var head = document.getElementsByTagName("head")[0];
                var node = document.createElement("link");
                node.href = url;
                node.rel = "stylesheet";
                node.type = "text/css";
                head.appendChild(node);
                return node;
            },
            _ajax: function(obj) {
                var _url = obj.url;
                var _type = obj.type;
                var _data = obj.data;
                var _dataType = obj.dataType;
                if ("function" == typeof obj.success) {
                    var _success = obj.success;
                } else {
                    alert("success方法未定义");
                    return
                }
                if ("function" == typeof obj.error) {
                    _error = obj.error;
                } else {
                    var _error = function(XMLHttpRequest, textStatus) {
                        lock = false;
                        if (XMLHttpRequest.status == 0) {
                            $(" .loadingtext").text("网络未连接,请检查网络设置...");
                            $(".imgloading").hide();
                        } else {
                            $(" .loadingtext").text("联网错误，请点击重试...");
                            $(".imgloading").hide();
                        }
                        if ("timeout" == textStatus) {
                            $(" .loadingtext").text("网络连接超时，请点击重试...");
                            $(".imgloading").hide();
                        }
                    };
                }
                $.ajax({
                    url: _url,
                    type: _type,
                    data: _data,
                    dataType: _dataType,
                    success: function(data) {
                        _success(data);
                    },
                    error: function(XMLHttpRequest, textStatus) {
                        _error(XMLHttpRequest, textStatus);
                    }
                });
            },
            uuid: {
                CHARS: "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz".split(""),
                def: function(len, radix) {
                    var chars = this.CHARS,
                    uuid = [],
                    i;
                    radix = radix || chars.length;
                    if (len) {
                        for (i = 0; i < len; i++) {
                            uuid[i] = chars[0 | Math.random() * radix];
                        }
                    } else {
                        var r;
                        uuid[8] = uuid[13] = uuid[18] = uuid[23] = "-";
                        uuid[14] = "4";
                        for (i = 0; i < 36; i++) {
                            if (!uuid[i]) {
                                r = 0 | Math.random() * 16;
                                uuid[i] = chars[(i == 19) ? (r & 3) | 8 : r];
                            }
                        }
                    }
                    return uuid.join("");
                },
                fast: function() {
                    var chars = this.CHARS,
                    uuid = new Array(36),
                    rnd = 0,
                    r;
                    for (var i = 0; i < 36; i++) {
                        if (i == 8 || i == 13 || i == 18 || i == 23) {
                            uuid[i] = "-";
                        } else {
                            if (i == 14) {
                                uuid[i] = "4";
                            } else {
                                if (rnd <= 2) {
                                    rnd = 33554432 + (Math.random() * 16777216) | 0;
                                }
                                r = rnd & 15;
                                rnd = rnd >> 4;
                                uuid[i] = chars[(i == 19) ? (r & 3) | 8 : r];
                            }
                        }
                    }
                    return uuid.join("");
                },
                compact: function() {
                    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g,
                    function(c) {
                        var r = Math.random() * 16 | 0,
                        v = c == "x" ? r: (r & 3 | 8);
                        return v.toString(16);
                    });
                }
            }
        };
        window.RTool = tools;
    } catch(e) {}
})(); 

(function() {
    iydfunctions = {
        lazy: {
            Img: null,
            getY: function(obj) {
                var curtop = 0;
                if (obj && obj.offsetParent) {
                    while (obj.offsetParent) {
                        curtop += obj.offsetTop;
                        obj = obj.offsetParent;
                    }
                } else {
                    if (obj && obj.y) {
                        curtop += obj.y;
                    }
                }
                return curtop;
            },
            scrollY: function() {
                var de = document.documentElement;
                return self.pageYOffset || (de && de.scrollTop) || document.body.scrollTop || 0;
            },
            windowHeight: function() {
                var de = document.documentElement;
                return self.innerHeight || (de && de.clientHeight) || document.body.clientHeight;
            },
            currentHeight: function() {
                return this.scrollY() + this.windowHeight();
            },
            load: function() {
                if (this.Img == null) {
                    this.init();
                }
                var currentHeight = this.currentHeight() + 300;
                console.log("lazy.load:加载" + currentHeight + "  " + this.Img.length);
                for (var _index = 0; _index < this.Img.length; _index++) {
                    if ($(this.Img[_index]).attr("this") == undefined) {
                        $(this.Img[_index]).attr("this", "n");
                    }
                    if ($(this.Img[_index]).attr("this") == "y") {
                        console.log("lazy.load:加载了吗？" + currentHeight + "  " + this.Img.length);
                        continue;
                    }
                    $(this.Img[_index]).bind("error",
                    function() {
                        if (this.id == "subject") {
                            $(this).attr("src", "");
                        } else {
                            $(this).removeAttr("src");
                            $(this).css("visibility", "hidden");
                        }
                    });
                    var imgTop = this.getY(this.Img[_index]);
                    if (imgTop < currentHeight) {
                        if (this.Img[_index].getAttribute("data-src") != "") {
                            this.Img[_index].src = this.Img[_index].getAttribute("data-src");
                        }
                        $(this.Img[_index]).attr("this", "y");
                        $(this.Img[_index]).removeClass("lazy");
                    }
                }
                this.Img = null;
            },
            init: function() {
                console.log("lazy.init");
                var allImg = document.querySelectorAll("img.lazy");
                this.Img = allImg;
                console.log("allImg:" + allImg.length);
            },
            test: function() {
                this.init();
            },
            loadcheck: function() {
                console.log("lazy.loadcheck");
                setTimeout(this.load(), 100);
            }
        },
        base64: {
            base64encodechars: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",
            base64decodechars: new Array( - 1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 62, -1, -1, -1, 63, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, -1, -1, -1, -1, -1, -1, -1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, -1, -1, -1, -1, -1, -1, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, -1, -1, -1, -1, -1),
            encode: function(str) {
                var out, i, len;
                var c1, c2, c3;
                len = str.length;
                i = 0;
                out = "";
                while (i < len) {
                    c1 = str.charCodeAt(i++) & 255;
                    if (i == len) {
                        out += this.base64encodechars.charAt(c1 >> 2);
                        out += this.base64encodechars.charAt((c1 & 3) << 4);
                        out += "==";
                        break;
                    }
                    c2 = str.charCodeAt(i++);
                    if (i == len) {
                        out += this.base64encodechars.charAt(c1 >> 2);
                        out += this.base64encodechars.charAt(((c1 & 3) << 4) | ((c2 & 240) >> 4));
                        out += this.base64encodechars.charAt((c2 & 15) << 2);
                        out += "=";
                        break;
                    }
                    c3 = str.charCodeAt(i++);
                    out += this.base64encodechars.charAt(c1 >> 2);
                    out += this.base64encodechars.charAt(((c1 & 3) << 4) | ((c2 & 240) >> 4));
                    out += this.base64encodechars.charAt(((c2 & 15) << 2) | ((c3 & 192) >> 6));
                    out += this.base64encodechars.charAt(c3 & 63);
                }
                console.log(out);
                return out;
            },
            decode: function(str) {
                var c1, c2, c3, c4;
                var i, len, out;
                len = str.length;
                i = 0;
                out = "";
                while (i < len) {
                    do {
                        c1 = this.base64decodechars[str.charCodeAt(i++) & 255];
                    } while ( i < len && c1 == - 1 );
                    if (c1 == -1) {
                        break;
                    }
                    do {
                        c2 = this.base64decodechars[str.charCodeAt(i++) & 255];
                    } while ( i < len && c2 == - 1 );
                    if (c2 == -1) {
                        break;
                    }
                    out += String.fromCharCode((c1 << 2) | ((c2 & 48) >> 4));
                    do {
                        c3 = str.charCodeAt(i++) & 255;
                        if (c3 == 61) {
                            return out;
                        }
                        c3 = this.base64decodechars[c3];
                    } while ( i < len && c3 == - 1 );
                    if (c3 == -1) {
                        break;
                    }
                    out += String.fromCharCode(((c2 & 15) << 4) | ((c3 & 60) >> 2));
                    do {
                        c4 = str.charCodeAt(i++) & 255;
                        if (c4 == 61) {
                            return out;
                        }
                        c4 = this.base64decodechars[c4];
                    } while ( i < len && c4 == - 1 );
                    if (c4 == -1) {
                        break;
                    }
                    out += String.fromCharCode(((c3 & 3) << 6) | c4);
                }
                console.log(out);
                return out;
            },
            utf16to8: function(str) {
                var out, i, len, c;
                out = "";
                len = str.length;
                for (i = 0; i < len; i++) {
                    c = str.charCodeAt(i);
                    if ((c >= 1) && (c <= 127)) {
                        out += str.charAt(i);
                    } else {
                        if (c > 2047) {
                            out += String.fromCharCode(224 | ((c >> 12) & 15));
                            out += String.fromCharCode(128 | ((c >> 6) & 63));
                            out += String.fromCharCode(128 | ((c >> 0) & 63));
                        } else {
                            out += String.fromCharCode(192 | ((c >> 6) & 31));
                            out += String.fromCharCode(128 | ((c >> 0) & 63));
                        }
                    }
                }
                return out;
            },
            utf8to16: function(str) {
                var out, i, len, c;
                var char2, char3;
                out = "";
                len = str.length;
                i = 0;
                while (i < len) {
                    c = str.charCodeAt(i++);
                    switch (c >> 4) {
                    case 0:
                    case 1:
                    case 2:
                    case 3:
                    case 4:
                    case 5:
                    case 6:
                    case 7:
                        out += str.charAt(i - 1);
                        break;
                    case 12:
                    case 13:
                        char2 = str.charCodeAt(i++);
                        out += String.fromCharCode(((c & 31) << 6) | (char2 & 63));
                        break;
                    case 14:
                        char2 = str.charCodeAt(i++);
                        char3 = str.charCodeAt(i++);
                        out += String.fromCharCode(((c & 15) << 12) | ((char2 & 63) << 6) | ((char3 & 63) << 0));
                        break;
                    }
                }
                return out;
            }
        }
    };
    window.ifs = window.iydf = iydfunctions;
})();

