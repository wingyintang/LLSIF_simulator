function decode(a) {
    for (var b = atob(a), c = new Uint8Array(28), d = 0; 28 > d; d++) c[d] = b.charCodeAt(27 - d);
    for (var e = new DataView(c.buffer), f = e.getUint32(0), g = e.getUint16(5, !0), h = e.getUint16(7), i = e.getUint16(9, !0), j = new Uint8Array(5), d = 0; 5 > d; d++) j[d] = e.getUint8(11 + d);
    var k = String.fromCharCode.apply(null, j),
        l = e.getUint32(17),
        m = e.getUint32(22),
        n = e.getUint16(26, !0);
    return {
        score: f,
        perfect: g,
        great: h,
        good: i,
        uid: l,
        ts: m,
        combo: n,
        liveid: k
    }
}

function navController(a, b, c) {
    function d() {
        user.islogin() && user.ajaxGetQuery("/API/unread_count", {
            uid: user.uid()
        }, function(b) {
            a.unreadCount = b.count, a.$apply()
        })
    }
    a.back = function() {
        window.history.back()
    }, a.jump = function(a) {
        window.location.href = a
    }, a.speek = function() {
        speek()
    }, a.login = function() {
        var a = c.$new();
        b.open({
            templateUrl: "views/login/login.html",
            controller: ["$scope", "$modalInstance", loginController],
            scope: a,
            size: "sm"
        })
    }, a.logout = function() {
        user.logout(), window.location.href = "#index"
    }, a.islogin = function() {
        return user.islogin()
    }, a.username = function() {
        return user.getusername()
    }, a.isadmin = function() {
        return user.isadmin()
    }, user.checkLogin(function() {}), a.unreadCount = 0, setInterval(d, 3e5), d(), a.jumpUCenter = function() {
        user.ajaxGetQuery("/API/clear_unread", {}, function() {
            d()
        }), window.location.href = "#userCenter"
    }
}

function loginController(a, b) {
    a.login = function() {
        return a.username && a.password ? void user.login(a.username, a.password, function() {
            b.close()
        }, function(b) {
            a.error = b, a.$apply()
        }) : void(a.error = "请填写所有字段")
    }, a.closemodal = function() {
        b.close(), window.location.href = "#/signup"
    }, a.jump = function(a) {
        window.location.href = a
    }
}

function avatarUploadController(a, b) {
    var c;
    a.scale = 1, a.init = function() {
        c = window.imageUploader("editorCanvas", a.useCamera, a.file)
    }, a.scaleChange = function() {
        c.scale(a.scale)
    }, a.capture = function() {
        a.stop ? c.live() : c.capture(), a.stop = !a.stop
    }, a.supportTouch = function() {
        return !!document.createTouch
    }, a.cancel = function() {
        c.close(), b.close()
    }, a.upload = function() {
        var d = c.getBlob();
        user.postfile(apiurl + "upload_avatar", {}, d, function() {
            a.get_info(), c.close(), b.close()
        })
    }
}

function delConfirm(a, b) {
    a.confirm = function() {
        b.close(a.reason)
    }, a.cancel = function() {
        b.dismiss("cancel")
    }
}

function uploadImage(a, b) {
    var c;
    a.size = "topic-image-md", a.uploadFile = function(b) {
        if (!c) {
            var d = document.createElement("input");
            a.src = null, d.type = "file", d.onchange = function() {
                if (!(d.files.length = 0)) {
                    var b = d.files[0];
                    user.postfile(apiurl + "uploadFile", {
                        type: "image"
                    }, b, function(b) {
                        var c = b.filename;
                        a.src = "/upload/" + c, a.progress = 0, a.$apply()
                    }, function(b) {
                        a.error = b, a.progress = 0, a.$apply()
                    }, function(b) {
                        a.progress = b, a.$apply()
                    })
                }
            }, d.click()
        }
    }, a.confirm = function() {
        a.src && b.close({
            src: a.src,
            size: a.size
        })
    }, a.cancel = function() {
        b.dismiss()
    }
}

function insertLive(a, b) {
    function c(a) {
        for (var b, c = [], d = a.slice(a.indexOf("?") + 1).split("&"), e = 0; e < d.length; e++) b = d[e].split("="), c.push(b[0]), c[b[0]] = b[1];
        return c
    }
    a.live_info = null, a.getInfo = function() {
        var b = c(a.posturl).live_id;
        API.getLiveInfo(b, function(b) {
            a.live_info = b, a.$apply()
        })
    }, a.confirm = function() {
        a.live_info && b.close(a.live_info)
    }, a.cancel = function() {
        b.dismiss()
    }
}

function footerCtl(a) {
    a.onlineCount = "updating", socket.on("onlineCount", function(b) {
        a.onlineCount = b
    })
}

function BufferLoader(a, b, c) {
    this.context = a, this.urlList = b, this.onload = c, this.bufferList = [], this.loadCount = 0
}

function ismobile() {
    var a = navigator.userAgent;
    return a.indexOf("Mobile") > -1 || a.indexOf("Android") > -1
}

function getformdata(a) {
    for (var b = document.getElementById(a), c = b.getElementsByTagName("input"), d = {}, e = 0; e < c.length; e++) d[c[e].name] = c[e].value, "checkbox" == c[e].type && (d[c[e].name] = c[e].checked);
    return d
}

function getFormData(form, filler) {
    for (var data = {}, i = 0; i < form.length; ++i) {
        var name = form[i].name,
            value = form[i].value;
        if (0 != name.length) {
            if (0 == value.length) {
                if (!filler) continue;
                value = filler
            }
            var sz = "data." + name + " = '" + value + "'";
            try {
                eval(sz)
            } catch (e) {
                alert(e)
            }
        }
    }
    return data
}

function getRndSring(a) {
    for (var b = [], c = 0; a > c; c++) b[c] = 65 + Math.floor(26 * Math.random());
    return String.fromCharCode.apply(null, b)
}

function info_popup(a) {
    switch (a) {
        case 1:
            $("#common-popup").append('<div class=\'md-trigger\' data-modal=\'info-dialog\'><div class="md-modal md-effect-1 md-show" id="info-dialog"><div class="md-content"  style="background: #4FCF50;"><h3>Add to Main Screen</h3><div><div style=\'background:url(http://ll.tianyi9.com/noti_info.png);background-size: contain;background-repeat: no-repeat;background-position-x: center;height:150px\'></div><input type="submit" class="buttonWrap button button-turqoise contactSubmitButton md-close" value="知道了" /></div></div></div><div class="md-overlay md-close"></div></div>');
            break;
        case 2:
    }
    ModalEffects()
}

function addtomain() {
    window.settings.get("addtomain") || (info_popup(1), window.settings.set("addtomain", 1))
}

function Validate(a, b) {
    switch (a) {
        case "login":
            return void user.login(b.username, b.password, function(a) {
                window.location.reload()
            }, function(a) {
                alert("登录失败" + a), window.location.reload()
            });
        case "register":
            var c = document.getElementById("reg");
            delerror();
            var d = Validator.Validate(c, 3);
            if (1 == d) try {
                user.signUp(b.username, b.password, b.Email, function(a) {
                    alert("注册成功"), window.location.href = "login.php"
                }, function(a) {
                    alert("注册失败" + a), window.location.reload()
                })
            } catch (e) {
                alert(e)
            }
            return;
        default:
            return
    }
}

function delerror() {
    var a = this.document.getElementsByClassName("__ErrorMessagePanel"),
        b = 0;
    if (0 != a.length) {
        var c = a.length;
        for (b = 0; c > b; b++) a[0].parentNode.removeChild(a[0])
    }
}

function getQueryString(a, b) {
    var c = new RegExp("(^|&)" + a + "=([^&]*)(&|$)", "i"),
        d = b ? b.match(c) : window.location.search.substr(1).match(c);
    return null != d ? unescape(d[2]) : null
}

function copyobj(a) {
    var b = {};
    for (var c in a) b[c] = a[c];
    return b
}

function fullscreen() {
    if (navigator.userAgent.indexOf("iPhone") > -1 || navigator.userAgent.indexOf("iPad") > -1) return void alert("iOS用户请在safari菜单中添加本页到主屏幕.\niOS users could add this page to home screen in safari' menu.");
    var a = document.querySelector("html");
    try {
        return void a.requestFullScreen()
    } catch (b) {}
    try {
        return void a.msRequestFullScreen()
    } catch (b) {}
    try {
        return void a.webkitRequestFullScreen()
    } catch (b) {}
}

function speek() {
    if (!(Math.random() > .005) && speechSynthesis) {
        var a = ["JUU0JUJEJUEwJUU0JUJCJUFDJUU4JUJGJTk5JUU0JUJBJTlCJUU1JUI5JUI0JUU4JUJEJUJCJUU0JUJBJUJBJUVGJUJDJThDJUU1JTlCJUJFJUU2JUEwJUI3", "JUU0JUJEJTlDJUU0JUI4JUJBJUU0JUI4JTgwJUU0JUI4JUFBJUU2JThFJThDJUU4JTgwJTg1", "JUU2JTg4JTkxJUU4JUE2JTgxJUU1JTkxJThBJUU4JUFGJTg5JUU0JUJEJUEwJUU0JUJCJUFDJUU0JUJBJUJBJUU3JTk0JTlGJUU3JTlBJTg0JUU5JTgxJTkzJUU3JTkwJTg2"],
            b = a[Math.floor(a.length * Math.random())];
        b = decodeURI(atob(b));
        var c = new SpeechSynthesisUtterance;
        c.text = b, c.rate = .2, speechSynthesis.speak(c)
    }
}

function rotateRight(a, b) {
    return b >>> a | b << 32 - a
}

function choice(a, b, c) {
    return a & b ^ ~a & c
}

function majority(a, b, c) {
    return a & b ^ a & c ^ b & c
}

function sha256_Sigma0(a) {
    return rotateRight(2, a) ^ rotateRight(13, a) ^ rotateRight(22, a)
}

function sha256_Sigma1(a) {
    return rotateRight(6, a) ^ rotateRight(11, a) ^ rotateRight(25, a)
}

function sha256_sigma0(a) {
    return rotateRight(7, a) ^ rotateRight(18, a) ^ a >>> 3
}

function sha256_sigma1(a) {
    return rotateRight(17, a) ^ rotateRight(19, a) ^ a >>> 10
}

function sha256_expand(a, b) {
    return a[15 & b] += sha256_sigma1(a[b + 14 & 15]) + a[b + 9 & 15] + sha256_sigma0(a[b + 1 & 15])
}

function safe_add(a, b) {
    var c = (65535 & a) + (65535 & b),
        d = (a >> 16) + (b >> 16) + (c >> 16);
    return d << 16 | 65535 & c
}

function sha256_init() {
    ihash = new Array(8), count = new Array(2), buffer = new Array(64), count[0] = count[1] = 0, ihash[0] = 1779033703, ihash[1] = 3144134277, ihash[2] = 1013904242, ihash[3] = 2773480762, ihash[4] = 1359893119, ihash[5] = 2600822924, ihash[6] = 528734635, ihash[7] = 1541459225
}

function sha256_transform() {
    var a, b, c, d, e, f, g, h, i, j, k = new Array(16);
    a = ihash[0], b = ihash[1], c = ihash[2], d = ihash[3], e = ihash[4], f = ihash[5], g = ihash[6], h = ihash[7];
    for (var l = 0; 16 > l; l++) k[l] = buffer[(l << 2) + 3] | buffer[(l << 2) + 2] << 8 | buffer[(l << 2) + 1] << 16 | buffer[l << 2] << 24;
    for (var m = 0; 64 > m; m++) i = h + sha256_Sigma1(e) + choice(e, f, g) + K256[m], i += 16 > m ? k[m] : sha256_expand(k, m), j = sha256_Sigma0(a) + majority(a, b, c), h = g, g = f, f = e, e = safe_add(d, i), d = c, c = b, b = a, a = safe_add(i, j);
    ihash[0] += a, ihash[1] += b, ihash[2] += c, ihash[3] += d, ihash[4] += e, ihash[5] += f, ihash[6] += g, ihash[7] += h
}

function sha256_update(a, b) {
    var c, d, e = 0;
    d = count[0] >> 3 & 63;
    var f = 63 & b;
    for ((count[0] += b << 3) < b << 3 && count[1]++, count[1] += b >> 29, c = 0; b > c + 63; c += 64) {
        for (var g = d; 64 > g; g++) buffer[g] = a.charCodeAt(e++);
        sha256_transform(), d = 0
    }
    for (var g = 0; f > g; g++) buffer[g] = a.charCodeAt(e++)
}

function sha256_final() {
    var a = count[0] >> 3 & 63;
    if (buffer[a++] = 128, 56 >= a)
        for (var b = a; 56 > b; b++) buffer[b] = 0;
    else {
        for (var b = a; 64 > b; b++) buffer[b] = 0;
        sha256_transform();
        for (var b = 0; 56 > b; b++) buffer[b] = 0
    }
    buffer[56] = count[1] >>> 24 & 255, buffer[57] = count[1] >>> 16 & 255, buffer[58] = count[1] >>> 8 & 255, buffer[59] = 255 & count[1], buffer[60] = count[0] >>> 24 & 255, buffer[61] = count[0] >>> 16 & 255, buffer[62] = count[0] >>> 8 & 255, buffer[63] = 255 & count[0], sha256_transform()
}

function sha256_encode_bytes() {
    for (var a = 0, b = new Array(32), c = 0; 8 > c; c++) b[a++] = ihash[c] >>> 24 & 255, b[a++] = ihash[c] >>> 16 & 255, b[a++] = ihash[c] >>> 8 & 255, b[a++] = 255 & ihash[c];
    return b
}

function sha256_encode_hex() {
    for (var a = "", b = 0; 8 > b; b++)
        for (var c = 28; c >= 0; c -= 4) a += sha256_hex_digits.charAt(ihash[b] >>> c & 15);
    return a
}

function sha256_digest(a) {
    return sha256_init(), sha256_update(a, a.length), sha256_final(), sha256_encode_hex()
}

function sha256_self_test() {
    return "f7846f55cf23e14eebeab5b4e1550cad5b509e3348fbc4efa3a1413d393cb650" == sha256_digest("message digest")
}
var enTranslations = {
        ADMIN_PAGE: "Admin Page",
        REVIEW_LIST: "Review List",
        FULL_LIST: "Full List",
        ALL_POSTS: "All Posts",
        AVATAR_LIVE: "Live",
        AVATAR_CAPTURE: "Capture",
        CONFIRM_UPLOAD: "Upload",
        CANCEL: "Cancel",
        AVATAR_UPLOAD: "Upload Avatar",
        FILTER_BY_CATEGORY: "Filter by Categories",
        NO_COMMENT: "No Comment",
        REFRESH: "Refresh",
        COMMENTS_LIST: "Comments List",
        DELETE: "Delete",
        VISITOR: "Visitor",
        POSTED_AT: "posted at",
        PUBLISH_COMMENT: "Comment",
        SENDING: "Sending...",
        CREATE_POST: "Create post",
        TITLE: "Title",
        DESCRIPTION: "Description",
        STATUS: "Status",
        STATUS_PUBLISHED: "Published",
        STATUS_REVIEW: "In Review",
        STATUS_EDIT: "Edit",
        ARTIST: "Artist",
        LEVEL: "Level",
        DESCRIPTION_EDIT: "Description (please append some related tags if possible)",
        CATEGORY: "Category",
        MEMBER_ONLY: "Login required",
        DELETE_POST: "Delete this post",
        COVER_IMAGE: "Cover Image",
        BACKGROUND_IMAGE: "Background image",
        USE_DEFAULT: "Use default bgimg",
        MAP_FILE: "Beat map",
        READY: "Ready",
        NOT_READY: "Not ready",
        EDIT_ONLINE: "Edit online",
        BGM_FILE: "BGM file(mp3/m4a)",
        TEST: "Test",
        CONFIRM_POST: "I'm ready!",
        FAVORITES: "Favorites",
        LIVE_NOT_FOUND: "Live not found",
        RANDOM_ANOTHER: "I'm feeling lucky!",
        ADDED_FAV: "Added",
        FAV: "Favorite",
        AUTHOR: "Author",
        POSTS_COUNT: "Posts count",
        NEW_POSTS: "What's new",
        SEARCH: "Search",
        NO_RESULT: "No result",
        NULL_LIST: "Null",
        PLAYED: "Played",
        DELETE_FAV: "Delete favorite",
        EDIT_POST: "Edit post",
        PASS_POST: "Pass",
        DENY_POST: "Deny",
        ADD_FEATURED: "Add to featured",
        SIGN_IN: "Sign in",
        SIGN_UP: "Sign up",
        USERNAME_OR_EMAIL: "Username or E-mail",
        PASSWORD: "Password",
        "CONFIRM?": "Confirm?",
        OK: "OK",
        "CONFIRM_DELETE?": "Confirm delete?",
        REASON: "REASON",
        RANDOM: "Random",
        LOG_OUT: "Log out",
        FAVS: "Favorites",
        MY_POSTS: "My posts",
        POSTS_IN_REVIEW: "Posts in review",
        SETTINGS: "Settings",
        DELAY: "DELAY(ms)",
        INVITE_CODE: "Invite code (if you have)",
        REPEAT_PASSWORD: "Repeat password",
        SIGNUP_SUCCESS: "Success! Please wait for a few seconds...",
        CHANGE_AVATAR: "Change avatar",
        USE_CAMERA: "Use camera",
        CLICK_COUNT: "Click count",
        COMMENT_COUNT: "Comment count",
        PUBLISHED_POSTS: "Published Posts",
        HELP: "Help",
        USER_AGREEMENT: "User agreement",
        FULL_SCREEN: "Full screen",
        CONFIRM_EDIT: "Confirm edit",
        FINISH_ALL_FIELDS: "Please finish all fields",
        SUCCESS: "Success",
        FINISH_ALL_FILES: "Please upload all files.",
        FAIL: "FAIL",
        LIKE_AFTER_SIGNIN: "You can like it after signed in",
        ALREADY_FAV: "Favorite added",
        USERNAME: "Username",
        CONFIRM_REQUEST_REVIEW: "Please post after everything is finished.",
        REPLY: "Reply",
        NOTIFICATIONS: "Notifications",
        POST_DENY_P1: "Sorry, but your post ",
        POST_DENY_P2: " doesn't satisfy our publish standard, you should edit it before you post it again.",
        POST_PASS_P1: "Congratulations! Your post ",
        POST_PASS_P2: " has published.",
        REFER_P1: "You were referred in ",
        REFER_P2: ":",
        NEW_COMMENT_P1: "There is a new comment in your post ",
        NEW_COMMENT_P2: ":",
        AT_HELP: "You can refer others by using @username in your comment.",
        CACHE: "Cache All the favorites"
    },
    zh_cnTranslations = {
        ADMIN_PAGE: "管理",
        REVIEW_LIST: "待审列表",
        FULL_LIST: "完整列表",
        ALL_POSTS: "所有歌曲",
        AVATAR_LIVE: "实时",
        AVATAR_CAPTURE: "拍摄",
        CONFIRM_UPLOAD: "确认上传",
        CANCEL: "取消",
        AVATAR_UPLOAD: "上传头像",
        FILTER_BY_CATEGORY: "分类",
        NO_COMMENT: "暂时没有评论",
        REFRESH: "刷新",
        COMMENTS_LIST: "评论列表",
        DELETE: "删除",
        VISITOR: "游客",
        POSTED_AT: "发布于",
        PUBLISH_COMMENT: "发送评论",
        SENDING: "发送中...",
        CREATE_POST: "新建投稿",
        TITLE: "标题",
        DESCRIPTION: "描述",
        STATUS: "状态",
        STATUS_PUBLISHED: "已发布",
        STATUS_REVIEW: "审核中",
        STATUS_EDIT: "编辑中",
        ARTIST: "原作",
        LEVEL: "Level",
        DESCRIPTION_EDIT: "描述（请在最后加上相关的标签用空格隔开，以增加被搜索到的几率）",
        CATEGORY: "类别",
        MEMBER_ONLY: "会员可见",
        DELETE_POST: "删除投稿",
        COVER_IMAGE: "封面图片",
        BACKGROUND_IMAGE: "背景图片",
        USE_DEFAULT: "使用默认背景",
        MAP_FILE: "谱面",
        READY: "就绪",
        NOT_READY: "未就绪",
        EDIT_ONLINE: "在线编辑",
        BGM_FILE: "BGM 文件(mp3/m4a)",
        TEST: "测试",
        CONFIRM_POST: "确认投稿",
        FAVORITES: "收藏列表",
        LIVE_NOT_FOUND: "您打开的歌曲可能不见了",
        RANDOM_ANOTHER: "换一首",
        ADDED_FAV: "已收藏",
        FAV: "收藏",
        AUTHOR: "作者",
        POSTS_COUNT: "投稿数",
        NEW_POSTS: "最新投稿",
        SEARCH: "搜索",
        NO_RESULT: "无结果",
        NULL_LIST: "空列表",
        PLAYED: "点击",
        DELETE_FAV: "删除收藏",
        EDIT_POST: "编辑投稿",
        PASS_POST: "通过投稿",
        DENY_POST: "拒绝投稿",
        ADD_FEATURED: "添加精选",
        SIGN_IN: "登录",
        SIGN_UP: "注册",
        USERNAME_OR_EMAIL: "用户名或E-mail",
        PASSWORD: "密码",
        "CONFIRM?": "确认?",
        OK: "OK",
        "CONFIRM_DELETE?": "确认删除?",
        REASON: "原因",
        RANDOM: "手气不错",
        LOG_OUT: "注销",
        FAVS: "收藏列表",
        MY_POSTS: "我的投稿",
        POSTS_IN_REVIEW: "审核列表",
        SETTINGS: "设置",
        DELAY: "延迟(ms)",
        INVITE_CODE: "邀请码（可能需要）",
        REPEAT_PASSWORD: "重复密码",
        SIGNUP_SUCCESS: "注册成功!5秒后跳转首页.....",
        CHANGE_AVATAR: "修改头像",
        USE_CAMERA: "使用相机",
        CLICK_COUNT: "总点击",
        COMMENT_COUNT: "总评论",
        PUBLISHED_POSTS: "已通过投稿",
        HELP: "做谱帮助",
        USER_AGREEMENT: "用户协议",
        FULL_SCREEN: "全屏",
        CONFIRM_EDIT: "确认修改",
        FINISH_ALL_FIELDS: "请完成所有字段",
        SUCCESS: "成功！",
        FINISH_ALL_FILES: "请完成所有文件",
        FAIL: "失败",
        LIKE_AFTER_SIGNIN: "登录后才可以赞",
        ALREADY_FAV: "已收藏",
        USERNAME: "用户名",
        CONFIRM_REQUEST_REVIEW: "请确认谱面以及其他信息完成之后再投稿，不用投稿也能进行测试.",
        REPLY: "回复",
        NOTIFICATIONS: "最新消息",
        POST_DENY_P1: "很抱歉，您的投稿",
        POST_DENY_P2: "不符合发布标准，未能发布，请前往查看原因.",
        POST_PASS_P1: "您的投稿",
        POST_PASS_P2: "已经成功发布.",
        REFER_P1: "您在",
        REFER_P2: "的评论中被提到:",
        NEW_COMMENT_P1: "您的投稿",
        NEW_COMMENT_P2: "被评论到:",
        AT_HELP: "可以在评论中使用@用户名 的方式召唤其他用户，用户名后面要加上空格",
        CACHE: "缓存所有收藏歌曲(bgm和封面)"
    },
    ja_jpTranslations = {
        ADMIN_PAGE: "管理者専用ページ",
        REVIEW_LIST: "審査待ち",
        FULL_LIST: "フルリスト",
        ALL_POSTS: "全曲",
        AVATAR_LIVE: "リアルタイム",
        AVATAR_CAPTURE: "写真撮る",
        CONFIRM_UPLOAD: "アップロード",
        CANCEL: "キャンセル",
        AVATAR_UPLOAD: "画像をアップロード",
        FILTER_BY_CATEGORY: "カテゴリー",
        NO_COMMENT: "コメントなし",
        REFRESH: "更新",
        COMMENTS_LIST: "コメントリスト",
        DELETE: "削除",
        VISITOR: "名無しさん",
        POSTED_AT: "が",
        PUBLISH_COMMENT: "コメントする",
        SENDING: "発信中",
        CREATE_POST: "新規投稿",
        TITLE: "タイトル",
        DESCRIPTION: "説明",
        STATUS: "ステータス",
        STATUS_PUBLISHED: "発表済み",
        STATUS_REVIEW: "審査中",
        STATUS_EDIT: "編集中",
        ARTIST: "アーティスト",
        LEVEL: "レベル",
        DESCRIPTION_EDIT: "説明（スペースで分けたタグを付けたら、検索に当たる確率が上昇します）",
        CATEGORY: "カテゴリー",
        MEMBER_ONLY: "メンバー限定",
        DELETE_POST: "投稿削除",
        COVER_IMAGE: "ジャケット",
        BACKGROUND_IMAGE: "背景",
        USE_DEFAULT: "デフォルト",
        MAP_FILE: "譜面",
        READY: "準備完了",
        NOT_READY: "準備未完成",
        EDIT_ONLINE: "オンラインエデ",
        BGM_FILE: "BGMファイル(mp3/m4a)",
        TEST: "テスト",
        CONFIRM_POST: "投稿を確認",
        FAVORITES: "お気に入り",
        LIVE_NOT_FOUND: "曲が見つかりません",
        RANDOM_ANOTHER: "ランダム選曲",
        ADDED_FAV: "お気に入りに入れました",
        FAV: "お気に入り",
        AUTHOR: "作者",
        POSTS_COUNT: "投稿数",
        NEW_POSTS: "新曲",
        SEARCH: "検索",
        NO_RESULT: "見つかりませんでした",
        NULL_LIST: "空白リスト",
        PLAYED: "プレイカウント",
        DELETE_FAV: "お気に入りから削除",
        EDIT_POST: "投稿を編集",
        PASS_POST: "投稿を採用",
        DENY_POST: "投稿を拒否",
        ADD_FEATURED: "オススメにする",
        SIGN_IN: "ログイン",
        SIGN_UP: "新規登録",
        USERNAME_OR_EMAIL: "ユーザーネームやE-mail",
        PASSWORD: "パスワード",
        "CONFIRM?": "確認しますか？",
        OK: "OK",
        "CONFIRM_DELETE?": "削除しますか？",
        REASON: "原因",
        RANDOM: "ランダム選曲",
        LOG_OUT: "ログアウト",
        FAVS: "お気に入り",
        MY_POSTS: "自分の投稿",
        POSTS_IN_REVIEW: "審査リスト",
        SETTINGS: "設定",
        DELAY: "遅滞(ms)",
        INVITE_CODE: "招待コード（必要かも）",
        REPEAT_PASSWORD: "パスワードを確認",
        SIGNUP_SUCCESS: "登録完了！ホームページへ転送しています",
        CHANGE_AVATAR: "プロファイル画像",
        USE_CAMERA: "カメラを使う",
        CLICK_COUNT: "総計プレイカウント",
        COMMENT_COUNT: "総計コメント数",
        PUBLISHED_POSTS: "発表済みの投稿",
        HELP: "ヘルプ",
        USER_AGREEMENT: "使用許諾契約",
        FULL_SCREEN: "フルスクリーン",
        CONFIRM_EDIT: "変更確認",
        FINISH_ALL_FIELDS: "すべての空欄を埋めてください",
        SUCCESS: "成功！",
        FINISH_ALL_FILES: "すべてのファイルをアップロードしてください",
        FAIL: "失敗",
        LIKE_AFTER_SIGNIN: "ログインしてからいいね！をしてくださいね☆",
        ALREADY_FAV: "お気に入りに存在します",
        USERNAME: "ユーザーネーム",
        REPLY: "返信",
        NOTIFICATIONS: "通知",
        POST_DENY_P1: "申し訳ありません、ご投稿の",
        POST_DENY_P2: "曲ページで審査さんからのコメントを確認ください.",
        POST_PASS_P1: "ご投稿の",
        POST_PASS_P2: "は発表させていただきました",
        REFER_P1: "あなたは",
        REFER_P2: "のコメントに＠されました:",
        NEW_COMMENT_P1: "ご投稿の",
        NEW_COMMENT_P2: "に新しいコメントが届きました:",
        AT_HELP: "コメントは＠機能が使えます、使い方はツイッターに参照する",
        CACHE: "Offline cache All the favorites"
    };
angular.module("myApp", ["ngRoute", "ui.bootstrap", "ngTouch", "myApp.index", "myApp.getlive", "myApp.newposts", "myApp.userCenter", "myApp.favorites", "myApp.userInfo", "myApp.signup", "myApp.createpost", "myApp.editpost", "myApp.postlist", "myApp.search", "myApp.adminpage", "myApp.review", "myApp.category", "myApp.alllist", "myApp.settings", "myApp.help", "pascalprecht.translate", "wysiwyg.module", "myApp.createTopic", "myApp.editTopic", "myApp.competition", "myApp.record", "angular-json-editor"]).config(["$routeProvider", "$translateProvider", function(a, b) {
        a.otherwise({
            redirectTo: "/index"
        }), b.useSanitizeValueStrategy(null), b.translations("en", enTranslations), b.translations("zh-cn", zh_cnTranslations), b.translations("ja-jp", ja_jpTranslations);
        var c = {
                preferredLang: "preferLang"
            },
            d = localStorage[c.preferredLang];
        if (!d || !b.translations()[d])
            for (var e = [navigator.language || navigator.userLanguage] || navigator.languages, f = b.translations(), g = 0; g < e.length; ++g)
                if (e[g].toLowerCase() in f) {
                    d = e[g].toLowerCase(), localStorage[c.preferredLang] = d;
                    break
                }
        d ? b.preferredLanguage(d) : b.preferredLanguage("en"), window.socket = io.connect("https://m.tianyi9.com")
    }]).factory("T", ["$translate", function(a) {
        var b = {
            T: function(b) {
                return b ? a.instant(b) : b
            }
        };
        return b
    }]),
    function(a, b) {
        "use strict";
        var c = [
            ["bold", "italic", "underline", "strikethrough", "subscript", "superscript"],
            ["format-block"],
            ["font"],
            ["font-size"],
            ["font-color", "hilite-color"],
            ["remove-format"],
            ["ordered-list", "unordered-list", "outdent", "indent"],
            ["left-justify", "center-justify", "right-justify"],
            ["code", "quote", "paragraph"],
            ["link", "image", "post"]
        ];
        a.module("wysiwyg.module", ["colorpicker.module"]).directive("wysiwyg", ["$timeout", "wysiwgGui", "$compile", "$modal", function(c, d, e, f) {
            function g(g, h, i, j) {
                function k() {
                    l(), m(), n(), o()
                }

                function l() {
                    d.setCustomElements(g.textareaCustomMenu);
                    var a = h.children("div.wysiwyg-menu")[0];
                    a.appendChild(d.createMenu(g.textareaMenu)), e(a)(g)
                }

                function m() {
                    g.$watch("disabled", function(b) {
                        a.element("div.wysiwyg-menu").find("button").each(function() {
                            a.element(this).attr("disabled", b)
                        }), a.element("div.wysiwyg-menu").find("select").each(function() {
                            a.element(this).attr("disabled", b)
                        })
                    })
                }

                function n() {
                    "true" === i.enableBootstrapTitle && i.enableBootstrapTitle !== b && h.find("button[title]").tooltip({
                        container: "body"
                    })
                }

                function o() {
                    a.element(".wysiwyg-menu").find("button").on("click", function() {
                        var b = a.element(this);
                        g.$emit("wysiwyg.click", b.attr("title") || b.attr("data-original-title"))
                    }), r.on("input keyup paste mouseup", function() {
                        var a = r.html();
                        "<br>" == a && (a = ""), j.$setViewValue(a)
                    }), r.on("keydown", function(a) {
                        if (9 == a.keyCode) {
                            var b = (r.html(), window.getSelection());
                            b.anchorOffset;
                            a.preventDefault()
                        }
                    }), r.on("click keyup focus mouseup", function() {
                        c(function() {
                            g.isBold = g.cmdState("bold"), g.isUnderlined = g.cmdState("underline"), g.isStrikethrough = g.cmdState("strikethrough"), g.isItalic = g.cmdState("italic"), g.isSuperscript = p("SUP"), g.isSubscript = p("SUB"), g.isRightJustified = g.cmdState("justifyright"), g.isLeftJustified = g.cmdState("justifyleft"), g.isCenterJustified = g.cmdState("justifycenter"), g.isPre = "pre" === g.cmdValue("formatblock"), g.isBlockquote = "blockquote" === g.cmdValue("formatblock"), g.isOrderedList = g.cmdState("insertorderedlist"), g.isUnorderedList = g.cmdState("insertunorderedlist"), g.fonts.forEach(function(a, b) {
                                return g.cmdValue("fontname").indexOf(a) > -1 ? (g.font = a, !1) : void 0
                            }), g.cmdValue("formatblock").toLowerCase(), g.formatBlocks.forEach(function(a, b) {
                                return g.cmdValue("formatblock").toLowerCase() === a.value.toLowerCase() ? (g.formatBlock = a, !1) : void 0
                            }), g.fontSizes.forEach(function(a, b) {
                                return g.cmdValue("fontsize") === a.value ? (g.fontSize = a, !1) : void 0
                            }), g.hiliteColor = q(), h.find("button.wysiwyg-hiliteColor").css("background-color", g.hiliteColor), g.fontColor = g.cmdValue("forecolor"), h.find("button.wysiwyg-fontcolor").css("color", g.fontColor), g.isLink = p("A")
                        }, 0)
                    })
                }

                function p(a) {
                    var b = window.getSelection().getRangeAt(0);
                    return b && (b.startContainer.parentNode.tagName === a.toUpperCase() || b.endContainer.parentNode.tagName === a.toUpperCase()) ? !0 : !1
                }

                function q() {
                    var b = window.getSelection().getRangeAt(0);
                    if (b) {
                        var c = a.element(b.startContainer.parentNode).attr("style");
                        if (!a.isDefined(c)) return !1;
                        for (var d = c.split(";"), e = 0; e < d.length; e++) {
                            var f = d[e].split(":");
                            if ("background-color" === f[0]) return f[1]
                        }
                        return "#fff"
                    }
                    return "#fff"
                }
                var r = h.find("div.wysiwyg-textarea");
                g.isLink = !1, g.fontSizes = [{
                    value: "1",
                    size: "10px"
                }, {
                    value: "2",
                    size: "13px"
                }, {
                    value: "3",
                    size: "16px"
                }, {
                    value: "4",
                    size: "18px"
                }, {
                    value: "5",
                    size: "24px"
                }, {
                    value: "6",
                    size: "32px"
                }, {
                    value: "7",
                    size: "48px"
                }], g.formatBlocks = [{
                    name: "Heading Blocks",
                    value: "div"
                }, {
                    name: "Heading 1",
                    value: "h1"
                }, {
                    name: "Heading 2",
                    value: "h2"
                }, {
                    name: "Heading 3",
                    value: "h3"
                }, {
                    name: "Heading 4",
                    value: "h4"
                }, {
                    name: "Heading 5",
                    value: "h5"
                }, {
                    name: "Heading 6",
                    value: "h6"
                }], g.formatBlock = g.formatBlocks[0], g.fontSize = g.fontSizes[1], a.isArray(g.cssClasses) && (g.cssClasses.unshift("css"), g.cssClass = g.cssClasses[0]), g.fonts = ["Georgia", "Palatino Linotype", "Times New Roman", "Arial", "Helvetica", "Arial Black", "Comic Sans MS", "Impact", "Lucida Sans Unicode", "Tahoma", "Trebuchet MS", "Verdana", "Courier New", "Lucida Console", "Helvetica Neue"].sort(), g.font = g.fonts[6], k(), j.$render = function() {
                    r.html(j.$viewValue)
                }, g.format = function(a, b) {
                    document.execCommand(a, !1, b)
                }, g.cmdState = function(a) {
                    return document.queryCommandState(a)
                }, g.cmdValue = function(a) {
                    return document.queryCommandValue(a)
                }, g.createLink = function() {
                    var a = prompt("Enter the link URL");
                    a && a !== b && g.format("createlink", a)
                }, g.insertImage = function() {
                    f.open({
                        templateUrl: "views/modal/uploadImageModal.html",
                        controller: ["$scope", "$modalInstance", uploadImage]
                    }).result.then(function(a) {
                        document.querySelector("#" + g.textareaId).focus(), g.format("insertHTML", '<img class="' + a.size + '" src="' + a.src + '">')
                    })
                }, g.insertPost = function() {
                    f.open({
                        templateUrl: "views/modal/insertLiveModal.html",
                        controller: ["$scope", "$modalInstance", insertLive]
                    }).result.then(function(a) {
                        document.querySelector("#" + g.textareaId).focus();
                        var b = {};
                        b.live_id = a.live_id, b.live_name = a.live_name, b.cover_path = a.cover_path, b.upload_user = a.upload_user.username, g.format("insertHTML", "[LIVE:" + JSON.stringify(b) + "/LIVE]")
                    })
                }, g.setFont = function() {
                    g.format("fontname", g.font)
                }, g.setFontSize = function() {
                    g.format("fontsize", g.fontSize.value)
                }, g.setFormatBlock = function() {
                    g.format("formatBlock", g.formatBlock.value)
                }, g.setFontColor = function() {
                    g.format("forecolor", g.fontColor)
                }, g.setHiliteColor = function() {
                    g.format("hiliteColor", g.hiliteColor)
                }, g.format("enableobjectresizing", !0), g.format("styleWithCSS", !0)
            }
            return {
                template: '<div><style>   .wysiwyg-textarea[contentEditable="false"] { background-color:#eee}   .wysiwyg-btn-group-margin { margin-right:5px; }   .wysiwyg-select { height:30px;margin-bottom:1px;}   .wysiwyg-colorpicker { font-family: arial, sans-serif !important;font-size:16px !important; padding:2px 10px !important;}</style><div class="wysiwyg-menu"></div><div id="{{textareaId}}" ng-attr-style="resize:vertical;height:{{textareaHeight || \'80px\'}}; overflow:auto" contentEditable="{{!disabled}}" class="{{textareaClass}} wysiwyg-textarea" rows="{{textareaRows}}" name="{{textareaName}}" required="{{textareaRequired}}" placeholder="{{textareaPlaceholder}}" ng-model="value"></div></div>',
                restrict: "E",
                scope: {
                    value: "=ngModel",
                    textareaHeight: "@textareaHeight",
                    textareaName: "@textareaName",
                    textareaClass: "@textareaClass",
                    textareaRequired: "@textareaRequired",
                    textareaId: "@textareaId",
                    textareaMenu: "=textareaMenu",
                    textareaCustomMenu: "=textareaCustomMenu",
                    fn: "&",
                    disabled: "=?disabled"
                },
                replace: !0,
                require: "ngModel",
                link: g,
                transclude: !0
            }
        }]).factory("wysiwgGui", ["wysiwgGuiElements", function(b) {
            function d(a) {
                var b;
                if (a.tag) b = document.createElement(a.tag);
                else {
                    if (!a.text) return console.log("cannot create this element."), b = document.createElement("span");
                    b = document.createElement("span")
                }
                if (a.text && document.all ? b.innerText = a.text : b.textContent = a.text, a.classes && (b.className = a.classes), a.html && (b.innerHTML = a.html), a.attributes && a.attributes.length)
                    for (var c in a.attributes) {
                        var e = a.attributes[c];
                        e.name && e.value && b.setAttribute(e.name, e.value)
                    }
                if (a.data && a.data.length)
                    for (var f in a.data) b.appendChild(d(a.data[f]));
                return b
            }
            var e = b,
                f = {},
                g = function(a) {
                    f = a
                },
                h = function() {
                    return {
                        tag: "div",
                        classes: "btn-group btn-group-sm wysiwyg-btn-group-margin"
                    }
                },
                i = function(a) {
                    return e[a] || {}
                },
                j = function(b) {
                    a.extend(e, f), b = a.isDefined(b) && "" !== b ? b : c;
                    for (var g, j = document.createElement("div"), k = 0; k < b.length; k++) {
                        for (var l = d(h()), m = 0; m < b[k].length; m++) "link" === b[k][m] && (g = d(i("unlink")), l.appendChild(g)), g = d(i(b[k][m])), l.appendChild(g);
                        j.appendChild(l)
                    }
                    return j
                };
            return {
                createMenu: j,
                setCustomElements: g
            }
        }]).value("wysiwgGuiElements", {
            bold: {
                tag: "button",
                classes: "btn btn-default",
                attributes: [{
                    name: "title",
                    value: "Bold"
                }, {
                    name: "ng-click",
                    value: "format('bold')"
                }, {
                    name: "ng-class",
                    value: "{ active: isBold }"
                }, {
                    name: "type",
                    value: "button"
                }],
                data: [{
                    tag: "i",
                    classes: "fa fa-bold"
                }]
            },
            italic: {
                tag: "button",
                classes: "btn btn-default",
                attributes: [{
                    name: "title",
                    value: "Italic"
                }, {
                    name: "ng-click",
                    value: "format('italic')"
                }, {
                    name: "ng-class",
                    value: "{ active: isItalic }"
                }, {
                    name: "type",
                    value: "button"
                }],
                data: [{
                    tag: "i",
                    classes: "fa fa-italic"
                }]
            },
            underline: {
                tag: "button",
                classes: "btn btn-default",
                attributes: [{
                    name: "title",
                    value: "Underline"
                }, {
                    name: "ng-click",
                    value: "format('underline')"
                }, {
                    name: "ng-class",
                    value: "{ active: isUnderlined }"
                }, {
                    name: "type",
                    value: "button"
                }],
                data: [{
                    tag: "i",
                    classes: "fa fa-underline"
                }]
            },
            strikethrough: {
                tag: "button",
                classes: "btn btn-default",
                attributes: [{
                    name: "title",
                    value: "Strikethrough"
                }, {
                    name: "ng-click",
                    value: "format('strikethrough')"
                }, {
                    name: "ng-class",
                    value: "{ active: isStrikethrough }"
                }, {
                    name: "type",
                    value: "button"
                }],
                data: [{
                    tag: "i",
                    classes: "fa fa-strikethrough"
                }]
            },
            subscript: {
                tag: "button",
                classes: "btn btn-default",
                attributes: [{
                    name: "title",
                    value: "Subscript"
                }, {
                    name: "ng-click",
                    value: "format('subscript')"
                }, {
                    name: "ng-class",
                    value: "{ active: isSubscript }"
                }, {
                    name: "type",
                    value: "button"
                }],
                data: [{
                    tag: "i",
                    classes: "fa fa-subscript"
                }]
            },
            superscript: {
                tag: "button",
                classes: "btn btn-default",
                attributes: [{
                    name: "title",
                    value: "Superscript"
                }, {
                    name: "ng-click",
                    value: "format('superscript')"
                }, {
                    name: "ng-class",
                    value: "{ active: isSuperscript }"
                }, {
                    name: "type",
                    value: "button"
                }],
                data: [{
                    tag: "i",
                    classes: "fa fa-superscript"
                }]
            },
            "remove-format": {
                tag: "button",
                classes: "btn btn-default",
                attributes: [{
                    name: "title",
                    value: "Remove Formatting"
                }, {
                    name: "ng-click",
                    value: "format('removeFormat')"
                }, {
                    name: "type",
                    value: "button"
                }],
                data: [{
                    tag: "i",
                    classes: "fa fa-eraser"
                }]
            },
            "ordered-list": {
                tag: "button",
                classes: "btn btn-default",
                attributes: [{
                    name: "title",
                    value: "Ordered List"
                }, {
                    name: "ng-click",
                    value: "format('insertorderedlist')"
                }, {
                    name: "ng-class",
                    value: "{ active: isOrderedList }"
                }, {
                    name: "type",
                    value: "button"
                }],
                data: [{
                    tag: "i",
                    classes: "fa fa-list-ol"
                }]
            },
            "unordered-list": {
                tag: "button",
                classes: "btn btn-default",
                attributes: [{
                    name: "title",
                    value: "Unordered List"
                }, {
                    name: "ng-click",
                    value: "format('insertunorderedlist')"
                }, {
                    name: "ng-class",
                    value: "{ active: isUnorderedList }"
                }, {
                    name: "type",
                    value: "button"
                }],
                data: [{
                    tag: "i",
                    classes: "fa fa-list-ul"
                }]
            },
            outdent: {
                tag: "button",
                classes: "btn btn-default",
                attributes: [{
                    name: "title",
                    value: "Outdent"
                }, {
                    name: "ng-click",
                    value: "format('outdent')"
                }, {
                    name: "type",
                    value: "button"
                }],
                data: [{
                    tag: "i",
                    classes: "fa fa-outdent"
                }]
            },
            indent: {
                tag: "button",
                classes: "btn btn-default",
                attributes: [{
                    name: "title",
                    value: "Indent"
                }, {
                    name: "ng-click",
                    value: "format('indent')"
                }, {
                    name: "type",
                    value: "button"
                }],
                data: [{
                    tag: "i",
                    classes: "fa fa-indent"
                }]
            },
            "left-justify": {
                tag: "button",
                classes: "btn btn-default",
                attributes: [{
                    name: "title",
                    value: "Left Justify"
                }, {
                    name: "ng-click",
                    value: "format('justifyleft')"
                }, {
                    name: "ng-class",
                    value: "{ active: isLeftJustified }"
                }, {
                    name: "type",
                    value: "button"
                }],
                data: [{
                    tag: "i",
                    classes: "fa fa-align-left"
                }]
            },
            "center-justify": {
                tag: "button",
                classes: "btn btn-default",
                attributes: [{
                    name: "title",
                    value: "Center Justify"
                }, {
                    name: "ng-click",
                    value: "format('justifycenter')"
                }, {
                    name: "ng-class",
                    value: "{ active: isCenterJustified }"
                }, {
                    name: "type",
                    value: "button"
                }],
                data: [{
                    tag: "i",
                    classes: "fa fa-align-center"
                }]
            },
            "right-justify": {
                tag: "button",
                classes: "btn btn-default",
                attributes: [{
                    name: "title",
                    value: "Right Justify"
                }, {
                    name: "ng-click",
                    value: "format('justifyright')"
                }, {
                    name: "ng-class",
                    value: "{ active: isRightJustified }"
                }, {
                    name: "type",
                    value: "button"
                }],
                data: [{
                    tag: "i",
                    classes: "fa fa-align-right"
                }]
            },
            code: {
                tag: "button",
                classes: "btn btn-default",
                attributes: [{
                    name: "title",
                    value: "Code"
                }, {
                    name: "ng-click",
                    value: "format('formatblock', 'pre')"
                }, {
                    name: "ng-class",
                    value: "{ active: isPre }"
                }, {
                    name: "type",
                    value: "button"
                }],
                data: [{
                    tag: "i",
                    classes: "fa fa-code"
                }]
            },
            quote: {
                tag: "button",
                classes: "btn btn-default",
                attributes: [{
                    name: "title",
                    value: "Quote"
                }, {
                    name: "ng-click",
                    value: "format('formatblock', 'blockquote')"
                }, {
                    name: "ng-class",
                    value: "{ active: isBlockquote }"
                }, {
                    name: "type",
                    value: "button"
                }],
                data: [{
                    tag: "i",
                    classes: "fa fa-quote-right"
                }]
            },
            paragraph: {
                tag: "button",
                classes: "btn btn-default",
                text: "P",
                attributes: [{
                    name: "title",
                    value: "Paragragh"
                }, {
                    name: "ng-click",
                    value: "format('insertParagraph')"
                }, {
                    name: "ng-class",
                    value: "{ active: isParagraph }"
                }, {
                    name: "type",
                    value: "button"
                }]
            },
            image: {
                tag: "button",
                classes: "btn btn-default",
                attributes: [{
                    name: "title",
                    value: "Image"
                }, {
                    name: "ng-click",
                    value: "insertImage()"
                }, {
                    name: "type",
                    value: "button"
                }],
                data: [{
                    tag: "i",
                    classes: "fa fa-picture-o"
                }]
            },
            post: {
                tag: "button",
                classes: "btn btn-default",
                attributes: [{
                    name: "title",
                    value: "稿件"
                }, {
                    name: "ng-click",
                    value: "insertPost()"
                }, {
                    name: "type",
                    value: "button"
                }],
                data: [{
                    tag: "i",
                    classes: "fa fa-music"
                }]
            },
            "font-color": {
                tag: "button",
                classes: "btn btn-default wysiwyg-colorpicker wysiwyg-fontcolor",
                text: "A",
                attributes: [{
                    name: "title",
                    value: "Font Color"
                }, {
                    name: "colorpicker",
                    value: "rgba"
                }, {
                    name: "colorpicker-position",
                    value: "top"
                }, {
                    name: "ng-model",
                    value: "fontColor"
                }, {
                    name: "ng-change",
                    value: "setFontColor()"
                }, {
                    name: "type",
                    value: "button"
                }]
            },
            "hilite-color": {
                tag: "button",
                classes: "btn btn-default wysiwyg-colorpicker wysiwyg-fontcolor",
                text: "H",
                attributes: [{
                    name: "title",
                    value: "Hilite Color"
                }, {
                    name: "colorpicker",
                    value: "rgba"
                }, {
                    name: "colorpicker-position",
                    value: "top"
                }, {
                    name: "ng-model",
                    value: "hiliteColor"
                }, {
                    name: "ng-change",
                    value: "setHiliteColor()"
                }, {
                    name: "type",
                    value: "button"
                }]
            },
            font: {
                tag: "select",
                classes: "form-control wysiwyg-select",
                attributes: [{
                    name: "title",
                    value: "Image"
                }, {
                    name: "ng-model",
                    value: "font"
                }, {
                    name: "ng-options",
                    value: "f for f in fonts"
                }, {
                    name: "ng-change",
                    value: "setFont()"
                }]
            },
            "font-size": {
                tag: "select",
                classes: "form-control wysiwyg-select",
                attributes: [{
                    name: "title",
                    value: "Image"
                }, {
                    name: "ng-model",
                    value: "fontSize"
                }, {
                    name: "ng-options",
                    value: "f.size for f in fontSizes"
                }, {
                    name: "ng-change",
                    value: "setFontSize()"
                }]
            },
            "format-block": {
                tag: "select",
                classes: "form-control wysiwyg-select",
                attributes: [{
                    name: "title",
                    value: "Format Block"
                }, {
                    name: "ng-model",
                    value: "formatBlock"
                }, {
                    name: "ng-options",
                    value: "f.name for f in formatBlocks"
                }, {
                    name: "ng-change",
                    value: "setFormatBlock()"
                }]
            },
            link: {
                tag: "button",
                classes: "btn btn-default",
                attributes: [{
                    name: "title",
                    value: "Link"
                }, {
                    name: "ng-click",
                    value: "createLink()"
                }, {
                    name: "ng-show",
                    value: "!isLink"
                }, {
                    name: "type",
                    value: "button"
                }],
                data: [{
                    tag: "i",
                    classes: "fa fa-link"
                }]
            },
            unlink: {
                tag: "button",
                classes: "btn btn-default",
                attributes: [{
                    name: "title",
                    value: "Unlink"
                }, {
                    name: "ng-click",
                    value: "format('unlink')"
                }, {
                    name: "ng-show",
                    value: "isLink"
                }, {
                    name: "type",
                    value: "button"
                }],
                data: [{
                    tag: "i",
                    classes: "fa fa-unlink"
                }]
            }
        })
    }(angular), angular.module("myApp.index", ["ngRoute"]).config(["$routeProvider", function(a) {
        a.when("/index", {
            templateUrl: "views/index/index.html",
            controller: "indexCtrl"
        })
    }]).controller("indexCtrl", ["$scope", function(a) {
        a.slides = [], a.type = "public", a.getSlides = function() {
            API.getFeaturedList(function(b) {
                a.slides = b.items, a.$apply()
            })
        }, ga("send", "pageview", "/index")
    }]), angular.module("myApp.getlive", ["ngRoute"]).config(["$routeProvider", function(a) {
        a.when("/getlive", {
            templateUrl: "views/getlive/getlive.html",
            controller: "getliveCtrl"
        })
    }]).controller("getliveCtrl", ["$scope", "$routeParams", "T", function(a, b, c) {
        "random" == b.live_id ? (a.isrnd = !0, user.ajaxGetQuery(apiurl + "getRandomLive", {}, function(b) {
            a.live_id = b.live_id, a.updateLive()
        })) : a.live_id = b.live_id, a.islogin = function() {
            return user.islogin()
        }, a.jump = function(a) {
            window.location.href = a
        }, a.updateLive = function() {
            a.live_id && API.getLiveInfo(a.live_id, function(b) {
                a.live_info = b, a.$apply()
            }, function() {
                a.notFound = !0, a.$apply()
            })
        }, a.addFavorite = function() {
            return a.live_info.added_fav ? void(a.success_info = c.T("ALREADY_FAV")) : void user.ajaxGetQuery(apiurl + "addFavorite", {
                live_id: a.live_id
            }, function() {
                a.live_info.added_fav = !0, a.success_info = c.T("SUCCESS"), a.$apply()
            }, function(b) {
                a.error = c.T("FAIL") + ":" + b, a.$apply()
            })
        }, a.addLike = function() {
            return a.islogin() ? void user.ajaxGetQuery(apiurl + "likeLive", {
                live_id: a.live_id
            }, function() {
                a.live_info.added_like ? (a.live_info.added_like = !1, a.live_info.like_count -= 1) : (a.live_info.added_like = !0, a.live_info.like_count += 1), a.$apply()
            }, function(b) {
                a.error = c.T("FAIL") + ":" + b, a.$apply()
            }) : void(a.error = c.T("LIKE_AFTER_SIGNIN"))
        }, a.refresh = function() {
            window.location.reload()
        }, ga("send", "pageview", "/getlive?live_id=" + b.live_id)
    }]), angular.module("myApp").controller("liveListCtrl", ["$scope", "$routeParams", "$modal", function(a, b, c) {
        function d(c) {
            a.totalItems = c.count, a.noresult = !c.count;
            for (var d in c.items) 1 != c.items[d].memberonly || user.islogin() ? c.items[d].shouldShow = !0 : c.items[d].shouldShow = !1;
            a.liveList = c.items, e && (a.current_page = b.page || sessionStorage["pageList:" + f] || 1, sessionStorage["pageList:" + f] = a.current_page, e = !1), a.$apply()
        }
        a.liveList = [], a.type = a.type || "public", a.totalItems = 0, a.itemPerPage = a.itemPerPage || 24;
        var e = !0;
        a.detail = [], a.changePage = function() {
            a.updateList(), sessionStorage["pageList:" + f] = a.current_page
        };
        var f = location.href;
        a.updateList = function() {
            if ("search" == a.type) {
                if (!a.keyword) return;
                return void user.ajaxGetQuery(apiurl + "search", {
                    keyword: a.keyword,
                    limit: a.itemPerPage,
                    offset: a.itemPerPage * ((a.current_page || 1) - 1)
                }, d)
            }
            API.getLiveList(a.type, a.itemPerPage, a.itemPerPage * ((a.current_page || b.page || sessionStorage["pageList:" + f] || 1) - 1), a.uid, a.category, d)
        }, a.del_favorite = function(b, c) {
            user.ajaxGetQuery(apiurl + "delFavorite", {
                live_id: b
            }, function() {
                a.updateList()
            }, function(a) {})
        }, a.jump = function(a) {
            window.location.href = a
        }, a.keypressfuc = function(b) {
            13 === b.which && a.updateList()
        }, a.review = function(b, d) {
            if (d) {
                var e = c.open({
                    templateUrl: "views/modal/ConfirmModal.html",
                    controller: ["$scope", "$modalInstance", delConfirm],
                    size: "sm"
                });
                e.result.then(function() {
                    user.ajaxGetQuery(apiurl + "reviewlive", {
                        live_id: b,
                        pass: !0
                    }, function() {
                        a.updateList()
                    }, function(a) {
                        alert(a)
                    })
                })
            } else {
                var f = c.open({
                    templateUrl: "views/modal/inputConfirmModal.html",
                    controller: ["$scope", "$modalInstance", delConfirm],
                    size: "sm"
                });
                f.result.then(function(c) {
                    user.ajaxGetQuery(apiurl + "reviewlive", {
                        live_id: b,
                        pass: !1,
                        reason: c
                    }, function() {
                        a.updateList()
                    }, function(a) {
                        alert(a)
                    })
                })
            }
        }, a.category = 1, "category" == a.type && API.getCagoList(function(b) {
            a.categoryList = b.items, a.$apply()
        }), a.changeCategory = function(b) {
            a.category = b, a.updateList()
        }, a.setFeatured = function(a) {
            var b = c.open({
                templateUrl: "views/modal/ConfirmModal.html",
                controller: ["$scope", "$modalInstance", delConfirm],
                size: "sm"
            });
            b.result.then(function() {
                API.setFeatured(a, function() {
                    alert("成功")
                }, function(a) {
                    alert(a)
                })
            })
        }
    }]), angular.module("myApp").controller("commentListCtrl", ["$scope", "$modal", function(a, b) {
        a.commentList = [], a.currentPage = 1, a.totalItems = 0, a.itemPerPage = 20, a.formatDate = function(a) {
            return window.formatDate(new Date(a), "yyyy-MM-dd hh:mm:ss")
        }, a.$watch("live_id", function() {
            a.updateComment()
        }), a.updateComment = function() {
            a.live_id && API.getComments(a.live_id, a.itemPerPage, a.itemPerPage * (a.currentPage - 1), function(b) {
                a.totalItems = b.count, a.commentList = b.items, a.$apply()
            })
        }, a.islogin = function() {
            return user.islogin()
        }, a.isadmin = function() {
            return user.isadmin()
        }, a.sending = !1, a.postComment = function() {
            return a.new_comment ? a.new_comment.length < 5 ? void(a.error = "评论过短") : (a.sending = !0, void API.postComment(a.live_id, a.new_comment, "public", function() {
                a.new_comment = "", a.sending = !1, a.updateComment()
            }, function(b) {
                a.error = b, a.sending = !1
            })) : void(a.error = "评论过短")
        }, a.deleteComment = function(c) {
            var d = b.open({
                templateUrl: "views/modal/delConfirmModal.html",
                controller: ["$scope", "$modalInstance", delConfirm],
                size: "sm"
            });
            d.result.then(function() {
                API.deleteComment(c, function() {
                    a.updateComment()
                }, function(a) {
                    alert(a)
                })
            }, function() {})
        }, a.reply = function(b) {
            a.new_comment += "@" + b + " "
        }, a.new_comment = ""
    }]), angular.module("myApp.newposts", ["ngRoute"]).config(["$routeProvider", function(a) {
        a.when("/newposts", {
            templateUrl: "views/newposts/newposts.html",
            controller: "newpostsCtrl"
        })
    }]).controller("newpostsCtrl", ["$scope", function(a) {
        a.type = "public", ga("send", "pageview", "/newposts")
    }]);
var userInfoController = function(a, b, c, d) {
    function e(d) {
        var e = c.$new();
        e.file = f, e.useCamera = d, e.get_info = a.get_info;
        b.open({
            templateUrl: "views/avatarUpload/avatarUpload.html",
            controller: ["$scope", "$modalInstance", avatarUploadController],
            scope: e,
            size: "sm",
            backdrop: "static"
        })
    }
    if (d.uid || user.islogin()) {
        a.uid = d.uid || user.uid(), a.type = "user_public", a.getAvatar = function() {
            return a.user_info && a.user_info.avatar_path ? "url(/upload/" + a.user_info.avatar_path + ")" : "url(images/default_avatar.jpg)"
        }, a.uploadAvatar = function() {
            document.querySelector("#upload_file").click()
        };
        var f;
        a.fileSelected = function() {
            f = document.querySelector("#upload_file").files[0], e()
        }, a.supportCamera = function() {
            var a = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
            return !!a
        }, a.cameraCapture = function() {
            e(!0)
        }, a.get_info = function() {
            user.ajaxGetQuery(apiurl + "user_info", {
                uid: a.uid
            }, function(b) {
                a.user_info = b, a.$apply()
            })
        }, a.isAdmin = function() {
            return user.islogin() ? user.isadmin() : !1
        }, a.notifications = [], a.formatDate = function(a) {
            return window.formatDate(new Date(a), "yyyy-MM-dd hh:mm:ss")
        }, a.getNotification = function() {
            user.ajaxGetQuery("/API/get_notification", {}, function(b) {
                a.notifications = b, a.$apply(), user.ajaxGetQuery("/API/clear_unread", {})
            })
        }, a.get_info(), ga("send", "pageview", "/userCenter")
    }
};
angular.module("myApp.userCenter", ["ngRoute"]).config(["$routeProvider", function(a) {
        a.when("/userCenter", {
            templateUrl: "views/userCenter/userCenter.html",
            controller: "userCenterCtrl"
        })
    }]).controller("userCenterCtrl", ["$scope", "$modal", "$rootScope", "$routeParams", userInfoController]), angular.module("myApp.userInfo", ["ngRoute"]).config(["$routeProvider", function(a) {
        a.when("/userInfo", {
            templateUrl: "views/userCenter/userInfo.html",
            controller: "userInfoCtrl"
        })
    }]).controller("userInfoCtrl", ["$scope", "$modal", "$rootScope", "$routeParams", userInfoController]), angular.module("myApp.favorites", ["ngRoute"]).config(["$routeProvider", function(a) {
        a.when("/favorites", {
            templateUrl: "views/favorites/favorites.html",
            controller: "favoritesCtrl"
        })
    }]).controller("favoritesCtrl", ["$scope", "$http", function(a, b) {
        a.type = "favorite", ga("send", "pageview", "favorites"), a.jump = function(a) {
            b.get("/API/update_cache").then(function() {
                window.location.href = a
            })
        }
    }]),
    function() {
        window.imageUploader = function(a, b, c) {
            function d(a) {
                return a && (H = parseFloat(a) || 1, u()), H
            }

            function e(a) {
                return a && (I = a, u()), I
            }

            function f() {
                b && requestAnimationFrame(f);
                var a = H * G * P;
                M[0] = J + L[0], M[0] < -.5 * (C[0] * a - D[0]) - 20 && (M[0] = -.5 * (C[0] * a - D[0]) - 20), M[0] > .5 * (C[0] * a - D[0]) + 20 && (M[0] = .5 * (C[0] * a - D[0]) + 20), M[1] = K + L[1], M[1] < -.5 * (C[1] * a - D[1]) - 20 && (M[1] = -.5 * (C[1] * a - D[1]) - 20), M[1] > .5 * (C[1] * a - D[1]) + 20 && (M[1] = .5 * (C[1] * a - D[1]) + 20), w.clearRect(0, 0, 2 * D[0], D[1]);
                var c = Math.cos(I) * a,
                    d = Math.sin(I) * a;
                w.setTransform(c, d, -d, c, M[0] - .5 * (C[0] * a - D[0]), M[1] - .5 * (C[1] * a - D[1])), w.drawImage(z, 0, 0), w.setTransform(1, 0, 0, 1, 0, 0);
                var e = w.getImageData(0, 0, 400, 400);
                w.putImageData(e, 400, 0), w.drawImage(y, 400, 0), w.drawImage(v, 0, 0, D[0], D[1])
            }

            function g(a) {
                N[0] = a.pageX, N[1] = a.pageY, O = !0
            }

            function h() {
                O = !1, J = M[0], K = M[1], L[0] = 0, L[1] = 0
            }

            function i(a) {
                O && (L[0] = 2 * (a.pageX - N[0]), L[1] = 2 * (a.pageY - N[1]), u())
            }

            function j(a) {
                J = M[0], K = M[1], L[0] = 0, L[1] = 0;
                for (var b = 0, c = 0, d = a.touches.length, e = 0; d > e; e++) b += a.touches[e].pageX, c += a.touches[e].pageY;
                N[0] = b / d, N[1] = c / d
            }

            function k(a) {
                for (var b = 0, c = 0, d = a.touches.length, e = 0; d > e; e++) b += a.touches[e].pageX, c += a.touches[e].pageY;
                L[0] = 2 * (b / d - N[0]), L[1] = 2 * (c / d - N[1]), a.preventDefault(), u()
            }

            function l(a) {
                J = M[0], K = M[1], L[0] = 0, L[1] = 0, a.touches.length > 0 && j(a)
            }

            function m(a) {
                H *= a.scale, 1 > H && (H = 1), P = 1
            }

            function n(a) {
                P = 1
            }

            function o(a) {
                var b = a.scale;
                1 > H * b && (b = 1 / H), P = b, u()
            }

            function p(a) {
                for (var b = window.atob(a), c = b.length, d = new Uint8Array(c), e = 0; c > e; e++) d[e] = b.charCodeAt(e);
                return d.buffer
            }

            function q() {
                var a = document.createElement("canvas");
                a.width = 360, a.height = 360, a.getContext("2d").drawImage(x, -20, -20);
                var b = a.toDataURL().split(",")[1],
                    c = new Blob([p(b)], {
                        type: "image/png"
                    });
                return c.name = "avatar.png", c
            }

            function r(a, b) {
                var c = q(),
                    d = new FormData;
                d.append("file", c);
                var e = new XMLHttpRequest;
                e.open("POST", E), e.onload = function() {
                    if (e.status >= 400) return void b(e.responseText);
                    try {
                        var c = JSON.parse(e.responseText);
                        return void a(c)
                    } catch (d) {}
                    b(e.responseText)
                }, e.onerror = function() {
                    b()
                }, e.send(d)
            }

            function s() {
                z.pause()
            }

            function t() {
                z.play()
            }

            function u() {
                b || requestAnimationFrame(f)
            }
            var v, w, x, y, z, A, B, C = [],
                D = [400, 400],
                E = "https://m.tianyi9.com/API/upload.php";
            A = document.querySelector("#" + a), x = document.createElement("canvas"), x.id = "editorMainCanvas", x.style.width = "250px", x.style.height = "125", x.width = 2 * D[0], x.height = D[1], w = x.getContext("2d"), y = document.createElement("canvas"), y.width = 400, y.height = 400;
            var F = y.getContext("2d");
            F.fillStyle = "#FFFFFF", F.fillRect(0, 0, 400, 400), F.globalCompositeOperation = "destination-out", F.arc(200, 200, 180, 0, 6.3), F.fill(), A.appendChild(x), v = document.createElement("img"), v.onload = function() {
                if (z = b ? document.createElement("video") : document.createElement("img"), z.onload = function() {
                        C[0] = z.width, C[1] = z.height, G = 360 / Math.min(C[0], C[1]), x.addEventListener("mousedown", g), x.addEventListener("mouseup", h), x.addEventListener("mousemove", i), x.addEventListener("mouseout", h), document.createTouch && (x.addEventListener("touchstart", j), x.addEventListener("touchmove", k), x.addEventListener("touchend", l), x.addEventListener("touchcancel", l), x.addEventListener("gesturestart", n), x.addEventListener("gesturechange", o), x.addEventListener("gestureend", m)), u()
                    }, b) {
                    var a = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
                    if (!a) throw "Not support video capture";
                    navigator.webkitGetUserMedia({
                        video: !0
                    }, function(a) {
                        z.src = URL.createObjectURL(a), B = a, z.play(), z.onplaying = function() {
                            z.onload(), C[0] = z.videoWidth, C[1] = z.videoHeight, G = 360 / Math.min(C[0], C[1]), f()
                        }
                    }, function() {})
                } else z.src = URL.createObjectURL(c)
            }, v.src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMgAAADICAYAAACtWK6eAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyNpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNS1jMDE0IDc5LjE1MTQ4MSwgMjAxMy8wMy8xMy0xMjowOToxNSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIChNYWNpbnRvc2gpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOkU1NDM1OUY5RTM3NjExRTRCQkEwOTcxRThFMkVDNDRDIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOkU1NDM1OUZBRTM3NjExRTRCQkEwOTcxRThFMkVDNDRDIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6RTU0MzU5RjdFMzc2MTFFNEJCQTA5NzFFOEUyRUM0NEMiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6RTU0MzU5RjhFMzc2MTFFNEJCQTA5NzFFOEUyRUM0NEMiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz67Y28jAAABsklEQVR42uzasQ0AIAgAQTXM6lAuiwtYaKne1VQkHxpqZvYCLDUrAIGAQEAgIBAQCAgEBAICgf/EweywLh6y9UHigoBAQCAgEBAICAQEAgIBgYBAAIGAQEAgIBAQCAgEBAICAYGAQACBgEBAICAQEAgIBAQCAgGBAAIBgYBAQCAgEBAICAQEAgIBgQACAYGAQEAgIBAQCAgEBAICAQQCAgGBgEBAICAQEAgIBAQCAgEEAgIBgYBAQCAgEBAICAQEAggEBAICAYGAQEAgIBAQCAgEBAIIBAQCAgGBgEBAICAQEAgIBBAICAQEAgIBgYBAQCAgEBAICAQQCAgEBAICAYGAQEAgIBAQCAgEEAgIBAQCAgGBgEBAICAQEAggEBAICAQEAgIBgYBAQCAgEBAIIBAQCAgEBAICAYGAQEAgIBBAICAQEAgIBAQCAgGBgEBAICAQQCAgEBAICAQEAgIBgYBAQCCAQEAgIBAQCAgEBAICAYGAQEAggEBAICAQEAgIBAQCAgGBgEAAgYBAQCAgEBAICAQEAleLg9luXbgggEBAICAQEAgIBAQCAgGBwPOmAAMA4C0GXRGegDkAAAAASUVORK5CYII=";
            var G = 0,
                H = 1,
                I = 0,
                J = 0,
                K = 0,
                L = [0, 0],
                M = [0, 0],
                N = [0, 0],
                O = !1,
                P = 1;
            return {
                scale: d,
                uploadImage: r,
                capture: s,
                live: t,
                rotate: e,
                getBlob: q,
                close: function() {
                    B && B.stop()
                }
            }
        }
    }(), angular.module("myApp.signup", ["ngRoute"]).config(["$routeProvider", function(a) {
        a.when("/signup", {
            templateUrl: "views/signup/signup.html",
            controller: "signupCtrl"
        })
    }]).controller("signupCtrl", ["$scope", function(a) {
        a.loading = !1, a.signup = function() {
            return a.password != a.check_password ? void(a.error = "密码不一致") : (a.loading = !0, void window.user.signUp(a.username, a.password, a.email, a.reg_code || " ", function() {
                a.signUpSuccess = !0, a.$apply(), setTimeout(function() {
                    window.location.href = "#index"
                }, 5e3)
            }, function(b) {
                a.loading = !1, a.error = b, a.$apply()
            }))
        }, ga("send", "pageview", "/signup")
    }]), angular.module("myApp.createpost", ["ngRoute"]).config(["$routeProvider", function(a) {
        a.when("/createpost", {
            templateUrl: "views/createpost/createpost.html",
            controller: "createpostCtrl"
        })
    }]).controller("createpostCtrl", ["$scope", function(a) {
        a.sending = !1, a.createPost = function() {
            a.sending || (a.sending = !0, API.createLive(a.live_name, a.live_info, function(a) {
                var b = a.live_id;
                location.href = "#editpost?live_id=" + b
            }, function(b) {
                a.error = b, a.sending = !1, a.$apply()
            }))
        }, a.deletePost = function() {}, ga("send", "pageview", "createpost")
    }]), angular.module("myApp.editpost", ["ngRoute"]).config(["$routeProvider", function(a) {
        a.when("/editpost", {
            templateUrl: "views/editpost/editpost.html",
            controller: "editpostCtrl"
        })
    }]).controller("editpostCtrl", ["$scope", "$modal", "$routeParams", "T", function(a, b, c, d) {
        var e = c.live_id;
        a.loading = !0, a.category = [], a.LiveState = {
            "public": "STATUS_PUBLISHED",
            review: "STATUS_REVIEW",
            edit: "STATUS_EDIT"
        }, a.getPostInfo = function() {
            API.getLiveInfo(e, function(b) {
                a.live_info = b, b.live_setting && (a.videoId = JSON.parse(b.live_setting).youkuVideoBG || ""), a.loading = !1, a.$apply()
            }), API.getCagoList(function(b) {
                a.category = b.items, a.$apply()
            })
        }, a.postEdit = function() {
            var b = copyobj(a.live_info);
            return b.live_name && b.live_info && b.artist && b.level ? (a.success = d.T("SENDING"), a.videoId ? b.live_setting = JSON.stringify({
                youkuVideoBG: a.videoId
            }) : b.live_setting = "", b.category = a.live_info.category.id, void user.postQuery(apiurl + "updatemultifields", b, function() {
                a.success = d.T("SUCCESS"), a.$apply()
            }, function(b) {
                a.error = b, a.$apply()
            })) : void(a.error = d.T("FINISH_ALL_FIELDS"))
        }, a.logincookie = function() {
            return user.logincookie()
        };
        var f = !1;
        a.uploadFile = function(b) {
            if (!f) {
                var c = document.createElement("input");
                c.type = "file", c.onchange = function() {
                    if (!(c.files.length = 0)) {
                        var f = c.files[0];
                        user.postfile(apiurl + "uploadFile", {
                            live_id: e,
                            type: b
                        }, f, function() {
                            a.success = d.T("SUCCESS"), a.getPostInfo(), a.progress = 0, a.$apply()
                        }, function(b) {
                            a.error = b, a.progress = 0, a.$apply()
                        }, function(b) {
                            a.progress = b, a.$apply()
                        })
                    }
                }, c.click()
            }
        }, a.getStatic = function(a) {
            return apiurl + "fo?file_id=" + a + "&live_id=" + e + "&logincookie=" + user.logincookie()
        }, a.useDefaultBgimg = function() {
            a.live_info.bgimg_file = "background.jpg", a.postEdit()
        }, a.confirmPost = function() {
            return a.live_info.bgm_file && a.live_info.bgimg_file && a.live_info.map_file && a.live_info.cover_path ? void(a.sending || (a.sending = !0, user.ajaxGetQuery(apiurl + "reviewRequest", {
                live_id: e
            }, function() {
                a.success = d.T("SUCCESS"), a.sending = !1, a.$apply()
            }, function(b) {
                a.error = b, a.sending = !1, a.$apply()
            }))) : void(a.error = d.T("FINISH_ALL_FILES"))
        }, a.deletePost = function() {
            b.open({
                templateUrl: "views/modal/delConfirmModal.html",
                controller: ["$scope", "$modalInstance", delConfirm],
                size: "sm"
            }).result.then(function() {
                user.ajaxGetQuery(apiurl + "deletelive", {
                    live_id: e
                }, function() {
                    window.location.href = "#/postlist"
                })
            })
        }, a.jump = function(a) {
            window.location.href = a
        }, a.testVideo = function() {
            user.ajaxGetQuery("/API/parse_youku/" + a.videoId, {}, function(b) {
                a.videoSrc = b.videoSrc, document.querySelector("video").src = a.videoSrc, a.$apply()
            })
        }, ga("send", "pageview", "editpost?live_id=" + e)
    }]), angular.module("myApp.postlist", ["ngRoute"]).config(["$routeProvider", function(a) {
        a.when("/postlist", {
            templateUrl: "views/postlist/postlist.html",
            controller: "postlistCtrl"
        })
    }]).controller("postlistCtrl", ["$scope", function(a) {
        a.type = "user", ga("send", "pageview", "/postlist")
    }]), angular.module("myApp.search", ["ngRoute"]).config(["$routeProvider", function(a) {
        a.when("/search", {
            templateUrl: "views/search/search.html",
            controller: "searchCtrl"
        })
    }]).controller("searchCtrl", ["$scope", function(a) {
        a.type = "search", a.itemPerPage = 12, ga("send", "pageview", "/search")
    }]), angular.module("myApp.adminpage", ["ngRoute"]).config(["$routeProvider", function(a) {
        a.when("/adminpage", {
            templateUrl: "views/adminpage/adminpage.html",
            controller: "adminpageCtrl"
        })
    }]).controller("adminpageCtrl", ["$scope", function(a) {
        a.type = "public", ga("send", "pageview", "/adminpage")
    }]), angular.module("myApp.review", ["ngRoute"]).config(["$routeProvider", function(a) {
        a.when("/review", {
            templateUrl: "views/reviewlist/reviewlist.html",
            controller: "reviewCtrl"
        })
    }]).controller("reviewCtrl", ["$scope", function(a) {
        user.isadmin() && user.islogin() || (window.location.href = "#index"), a.type = "review", ga("send", "pageview", "/reviewlist")
    }]), angular.module("myApp.category", ["ngRoute"]).config(["$routeProvider", function(a) {
        a.when("/category", {
            templateUrl: "views/category/category.html",
            controller: "categoryCtrl"
        })
    }]).controller("categoryCtrl", ["$scope", function(a) {
        a.type = "category", ga("send", "pageview", "/category")
    }]), angular.module("myApp.alllist", ["ngRoute"]).config(["$routeProvider", function(a) {
        a.when("/alllist", {
            templateUrl: "views/alllist/alllist.html",
            controller: "alllistCtrl"
        })
    }]).controller("alllistCtrl", ["$scope", function(a) {
        a.type = "all", ga("send", "pageview", "/alllist")
    }]);
var SettingsController = function() {
    function a(a) {
        this.$translate = a
    }
    return Object.defineProperty(a.prototype, "lang", {
        get: function() {
            return localStorage.getItem("preferLang")
        },
        set: function(a) {
            this.$translate.use(a), localStorage.setItem("preferLang", a)
        },
        enumerable: !0,
        configurable: !0
    }), Object.defineProperty(a.prototype, "delay", {
        get: function() {
            return parseInt(localStorage.getItem("delay"))
        },
        set: function(a) {
            settings.set("delay", a + ""), localStorage.setItem("delay", a + "")
        },
        enumerable: !0,
        configurable: !0
    }), Object.defineProperty(a.prototype, "renderP", {
        get: function() {
            return localStorage.getItem("renderP")
        },
        set: function(a) {
            localStorage.setItem("renderP", a + "")
        },
        enumerable: !0,
        configurable: !0
    }), Object.defineProperty(a.prototype, "speed", {
        get: function() {
            return localStorage.getItem("speed")
        },
        set: function(a) {
            localStorage.setItem("speed", a + "")
        },
        enumerable: !0,
        configurable: !0
    }), Object.defineProperty(a.prototype, "speedN", {
        get: function() {
            return parseInt(localStorage.getItem("speed"))
        },
        set: function(a) {
            localStorage.setItem("speed", a + "")
        },
        enumerable: !0,
        configurable: !0
    }), a
}();
angular.module("myApp.settings", ["ngRoute"]).config(["$routeProvider", function(a) {
    a.when("/settings", {
        template: "<settings></settings>"
    })
}]).component("settings", {
    template: '\n            <div class="container top-blank">\n    <h2>{{\'SETTINGS\'|translate}}</h2>\n    <div class="col-md-4 placeholder top-blank-sm"></div>\n    <div class="col-md-4  top-blank-sm">\n    <form class="form-group">\n        {{\'DELAY\'|translate}}:{{$ctrl.delay}}<br>\n        <input type="number" min="-150" max="150" class="form-control" step="1" ng-model="$ctrl.delay">\n        渲染精度(性能不够请降低)\n        <select ng-model="$ctrl.renderP" class="form-control">\n            <option value="">100%(默认精度)</option>\n            <option value="0.05">5%(红白机画质)</option>\n            <option value="0.20">20%(极低画质)</option>\n            <option value="0.50">50%(感人画质)</option>\n            <option value="0.75">75%(低画质)</option>\n            <option value="1.50">150%(高画质)</option>\n            <option value="2.00">200%(超高画质)</option>\n        </select>\n        自定义note速度\n        <select ng-model="$ctrl.speed" class="form-control">\n            <option value="">使用谱面设置</option>\n            <option value=160>160相当于ex</option>\n            <option value=128>128相当于hard</option>\n            <option value=96>96相当于normal</option>\n            <option value=200>200</option>\n            <option value=256>256</option>\n        </select>\n        <input class="form-control" ng-model="$ctrl.speedN" placeholder="speed" type="number" step="1">\n        <i class="fa fa-language"></i>:\n        <select ng-model="$ctrl.lang" class="form-control">\n            <option value="en">English</option>\n            <option value=\'zh-cn\'>简体中文</option>\n            <option value="ja-jp">日本語</option>\n        </select>\n    </form>\n        \n        </div>\n        </div>\n        <div class="placeholder top-blank-lg"></div>\n        ',
    controller: ["$translate", SettingsController]
}), angular.module("myApp").controller("navCtrl", ["$scope", "$modal", "$rootScope", navController]).controller("footerCtl", ["$scope", footerCtl]);
var staticpath = "https://m.tianyi9.com/",
    formatDate = function(a, b) {
        var c = {
            "M+": a.getMonth() + 1,
            "d+": a.getDate(),
            "h+": a.getHours(),
            "m+": a.getMinutes(),
            "s+": a.getSeconds(),
            "q+": Math.floor((a.getMonth() + 3) / 3),
            S: a.getMilliseconds()
        };
        /(y+)/.test(b) && (b = b.replace(RegExp.$1, (a.getFullYear() + "").substr(4 - RegExp.$1.length)));
        for (var d in c) new RegExp("(" + d + ")").test(b) && (b = b.replace(RegExp.$1, 1 == RegExp.$1.length ? c[d] : ("00" + c[d]).substr(("" + c[d]).length)));
        return b
    };
BufferLoader.prototype.loadBuffer = function(a, b) {
    var c = new XMLHttpRequest;
    c.open("GET", a, !0), c.responseType = "arraybuffer";
    var d = this;
    c.onload = function() {
        d.context.decodeAudioData(c.response, function(c) {
            return c ? (d.bufferList[b] = c, void(++d.loadCount == d.urlList.length && d.onload(d.bufferList))) : void alert("error decoding file data: " + a)
        })
    }, c.onerror = function() {
        alert("BufferLoader: XHR error")
    }, c.send()
}, BufferLoader.prototype.load = function() {
    for (var a = 0; a < this.urlList.length; ++a) this.loadBuffer(this.urlList[a], a)
};
var browser = {
    versions: function() {
        var a = navigator.userAgent;
        navigator.appVersion;
        return {
            trident: a.indexOf("Trident") > -1,
            presto: a.indexOf("Presto") > -1,
            webKit: a.indexOf("AppleWebKit") > -1,
            gecko: a.indexOf("Gecko") > -1 && -1 == a.indexOf("KHTML"),
            mobile: !!a.match(/AppleWebKit.*Mobile.*/) || !!a.match(/AppleWebKit/),
            ios: !!a.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/),
            android: a.indexOf("Android") > -1 || a.indexOf("Linux") > -1,
            iPhone: a.indexOf("iPhone") > -1 || a.indexOf("Mac") > -1,
            iPad: a.indexOf("iPad") > -1,
            webApp: -1 == a.indexOf("Safari")
        }
    }(),
    language: (navigator.browserLanguage || navigator.language).toLowerCase()
};
window.browser = browser;
var myHistory = {
    clearHistory: function() {
        settings.set("src", null)
    },
    pushHistory: function(a) {
        try {
            var b = settings.get("src");
            if ("" == a) return void settings.set("src", null);
            b = b ? JSON.parse(b) : [], b.push(a), settings.set("src", JSON.stringify(b))
        } catch (c) {
            settings.set("src", null)
        }
    },
    popHistory: function(a) {
        try {
            var b = settings.get("src");
            if (!b) return;
            if (b = JSON.parse(b), a) var c = b.pop();
            else var c = b[b.length - 1];
            return settings.set("src", JSON.stringify(b)), c
        } catch (d) {
            settings.set("src", null)
        }
    }
};
window.myHistory = myHistory,
    function(a, b) {
        "object" == typeof module && "object" == typeof module.exports ? module.exports = a.document ? b(a, !0) : function(a) {
            if (!a.document) throw new Error("You requires a window with a document");
            return b(a)
        } : b(a)
    }("undefined" != typeof window ? window : this, function(window) {
        function __clear(a) {
            return clearTimeout(a), clearInterval(a), null
        }

        function __attach_event(a, b) {
            window.addEventListener ? window.addEventListener(a, b, !1) : window.attachEvent && window.attachEvent("on" + a, b)
        }

        function __domReady(a) {
            return __domReady.done ? a() : void(__domReady.timer ? __domReady.ready.push(a) : (__attach_event("load", __isDOMReady), __domReady.ready = [a], __domReady.timer = setInterval(__isDOMReady, 100)))
        }

        function __isDOMReady() {
            if (__domReady.done) return !1;
            if (document && document.getElementsByTagName && document.getElementById && document.body) {
                __clear(__domReady.timer), __domReady.timer = null;
                for (var a = 0; a < __domReady.ready.length; a++) __domReady.ready[a]();
                __domReady.ready = null, __domReady.done = !0
            }
        }

        function addStyle(a) {
            var b = document.createElement("style");
            b.type = "text/css";
            var c = document.createDocumentFragment();
            c.appendChild(document.createTextNode(a)), b.appendChild(c), document.getElementsByTagName("head")[0].appendChild(b)
        }

        function init(controllerobj) {
            controller = controllerobj, Object.prototype.format = function(model_string) {
                var result = "" + model_string;
                for (var i in this)
                    if (this.hasOwnProperty(i)) {
                        var reg = eval("/%" + i + "/g"),
                            replace = this[i];
                        result = result.replace(reg, replace)
                    }
                return result.replace("%%", "%"), result
            }, Array.prototype.format = function(a) {
                for (var b = [], c = 0, d = this.length; d > c; c++) b.push(this[c].format(a));
                return b.join("")
            }, __domReady(parsedoc)
        }

        function parsedoc() {
            for (var a = document.getElementsByTagName("t-div"), b = 0; b < a.length; b++) {
                var c = a[b],
                    d = c.attributes.datasource.value;
                d && (controller[d].delay || c.updateByModel())
            }
        }
        format = function(obj, model_string) {
            var result = "" + model_string;
            for (var i in obj)
                if (obj.hasOwnProperty(i)) {
                    var reg = eval("/%" + i + "/g"),
                        replace = obj[i];
                    result = result.replace(reg, replace)
                }
            return result.replace("%%", "%"), result
        };
        var controller;
        addStyle("t-div:display:none"), Element.prototype.updateByModel = function(a, b) {
            var c = this.attributes.args,
                d = c ? c.value.split(",") : [];
            b = b || d, a = a || this.attributes.datasource.value, controller[a] && (controller[a].async ? this.updateByModelAsync(a, b) : this.updateByModelsync(a, b))
        }, Element.prototype.updateByModelAsync = function(a, b) {
            controller[a].modelstring || (controller[a].modelstring = this.innerHTML);
            var c = controller[a].method,
                d = this,
                e = function(b) {
                    d.innerHTML = b.format(controller[a].modelstring), d.style.display = "block"
                };
            c.apply(this, [e].concat(b))
        }, Element.prototype.updateByModelsync = function(a, b) {
            controller[a].modelstring || (controller[a].modelstring = this.innerHTML);
            var c = controller[a].method;
            if ("function" == typeof a) {
                var d = c.apply(this, b).format(controller[a].modelstring);
                return d ? (this.innerHTML = d, this.style.display = "block", !0) : !1
            }
            this.innerHTML = c.format(controller[a].modelstring), this.style.display = "block"
        }, templateFrm = function() {
            return {
                init: function(a) {
                    init(a)
                }
            }
        }, window.templateFrm = templateFrm()
    }), Validator = {
        Require: /.+/,
        Email: /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/,
        Phone: /^((\(\d{2,3}\))|(\d{3}\-))?(\(0\d{2,3}\)|0\d{2,3}-)?[1-9]\d{6,7}(\-\d{1,4})?$/,
        Mobile: /^((\(\d{2,3}\))|(\d{3}\-))?13\d{9}$/,
        Url: /^http:\/\/[A-Za-z0-9]+\.[A-Za-z0-9]+[\/=\?%\-&_~`@[\]\':+!]*([^<>\"\"])*$/,
        IdCard: "this.IsIdCard(value)",
        Currency: /^\d+(\.\d+)?$/,
        Number: /^\d+$/,
        Zip: /^[1-9]\d{5}$/,
        QQ: /^[1-9]\d{4,8}$/,
        Integer: /^[-\+]?\d+$/,
        Double: /^[-\+]?\d+(\.\d+)?$/,
        English: /^[A-Za-z]+$/,
        Chinese: /^[\u0391-\uFFE5]+$/,
        Username: /^(?!_)(?!.*?_$)[a-zA-Z0-9_\u4e00-\u9fa5]{3,}$/i,
        UnSafe: /^(([A-Z]*|[a-z]*|\d*|[-_\~!@#\$%\^&\*\.\(\)\[\]\{\}<>\?\\\/\'\"]*)|.{0,5})$|\s/,
        IsSafe: function(a) {
            return !this.UnSafe.test(a)
        },
        SafeString: "this.IsSafe(value)",
        Filter: "this.DoFilter(value, getAttribute('accept'))",
        Limit: "this.limit(value.length,getAttribute('min'),  getAttribute('max'))",
        LimitB: "this.limit(this.LenB(value), getAttribute('min'), getAttribute('max'))",
        Date: "this.IsDate(value, getAttribute('min'), getAttribute('format'))",
        Repeat: "value == document.getElementsByName(getAttribute('to'))[0].value",
        Range: "getAttribute('min') < (value|0) && (value|0) < getAttribute('max')",
        Compare: "this.compare(value,getAttribute('operator'),getAttribute('to'))",
        Custom: "this.Exec(value, getAttribute('regexp'))",
        Group: "this.MustChecked(getAttribute('name'), getAttribute('min'), getAttribute('max'))",
        ErrorItem: [document.forms[0]],
        ErrorMessage: ["以下原因导致提交失败：				"],
        Validate: function(theForm, mode) {
            var obj = theForm || event.srcElement,
                count = obj.elements.length;
            this.ErrorMessage.length = 1, this.ErrorItem.length = 1, this.ErrorItem[0] = obj;
            for (var i = 0; count > i; i++) with(obj.elements[i]) {
                var _dataType = getAttribute("dataType");
                if ("object" == typeof _dataType || "undefined" == typeof this[_dataType]) continue;
                if (this.ClearState(obj.elements[i]), "false" == getAttribute("require") && "" == value) continue;
                switch (_dataType) {
                    case "IdCard":
                    case "Date":
                    case "Repeat":
                    case "Range":
                    case "Compare":
                    case "Custom":
                    case "Group":
                    case "Limit":
                    case "LimitB":
                    case "SafeString":
                    case "Filter":
                        eval(this[_dataType]) || this.AddError(i, getAttribute("msg"));
                        break;
                    default:
                        this[_dataType].test(value) || this.AddError(i, getAttribute("msg"))
                }
            }
            if (this.ErrorMessage.length > 1) {
                modemode = mode || 1;
                var errCount = this.ErrorItem.length;
                switch (mode) {
                    case 2:
                        for (var i = 1; errCount > i; i++) this.ErrorItem[i].style.color = "red";
                    case 1:
                        alert(this.ErrorMessage.join("\n")), this.ErrorItem[1].focus();
                        break;
                    case 3:
                        for (var i = 1; errCount > i; i++) try {
                            var span = document.createElement("p"),
                                child = this.ErrorItem[i];
                            span.className = "__ErrorMessagePanel", span.style.color = "red", this.ErrorItem[i].parentNode.insertBefore(span, child), span.innerHTML = this.ErrorMessage[i].replace(/\d+:/, "*")
                        } catch (e) {
                            alert(e.description)
                        }
                        this.ErrorItem[1].focus();
                        break;
                    default:
                        alert(this.ErrorMessage.join("\n"))
                }
                return !1
            }
            return !0
        },
        limit: function(a, b, c) {
            return minmin = b || 0, maxmax = c || Number.MAX_VALUE, a >= b && c >= a
        },
        LenB: function(a) {
            return a.replace(/[^\x00-\xff]/g, "**").length
        },
        ClearState: function(elem) {
            with(elem) {
                "red" == style.color && (style.color = "");
                var lastNode = parentNode.childNodes[parentNode.childNodes.length - 1];
                "__ErrorMessagePanel" == lastNode.id && parentNode.removeChild(lastNode)
            }
        },
        AddError: function(a, b) {
            this.ErrorItem[this.ErrorItem.length] = this.ErrorItem[0].elements[a], this.ErrorMessage[this.ErrorMessage.length] = this.ErrorMessage.length + ":" + b
        },
        Exec: function(a, b) {
            return new RegExp(b, "g").test(a)
        },
        compare: function(a, b, c) {
            switch (b) {
                case "NotEqual":
                    return a != c;
                case "GreaterThan":
                    return a > c;
                case "GreaterThanEqual":
                    return a >= c;
                case "LessThan":
                    return c > a;
                case "LessThanEqual":
                    return c >= a;
                default:
                    return a == c
            }
        },
        MustChecked: function(a, b, c) {
            var d = document.getElementsByName(a),
                e = 0;
            minmin = b || 1, maxmax = c || d.length;
            for (var f = d.length - 1; f >= 0; f--) d[f].checked && e++;
            return e >= b && c >= e
        },
        DoFilter: function(a, b) {
            return new RegExp("^.+.(?=EXT)(EXT)$".replace(/EXT/g, b.split(/\s*,\s*/).join("|")), "gi").test(a)
        },
        IsIdCard: function(a) {
            var b, c, d = "10x98765432",
                e = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2],
                f = ["", "", "", "", "", "", "", "", "", "", "", "北京", "天津", "河北", "山西", "内蒙古", "", "", "", "", "", "辽宁", "吉林", "黑龙江", "", "", "", "", "", "", "", "上海", "江苏", "浙江", "安微", "福建", "江西", "山东", "", "", "", "河南", "湖北", "湖南", "广东", "广西", "海南", "", "", "", "重庆", "四川", "贵州", "云南", "西藏", "", "", "", "", "", "", "陕西", "甘肃", "青海", "宁夏", "新疆", "", "", "", "", "", "台湾", "", "", "", "", "", "", "", "", "", "香港", "澳门", "", "", "", "", "", "", "", "", "国外"],
                g = a.match(/^(\d{2})\d{4}(((\d{2})(\d{2})(\d{2})(\d{3}))|((\d{4})(\d{2})(\d{2})(\d{3}[x\d])))$/i);
            if (null == g) return !1;
            if (g[1] >= f.length || "" == f[g[1]]) return !1;
            if (12 == g[2].length ? (c = a.substr(0, 17), b = [g[9], g[10], g[11]].join("-")) : (c = a.substr(0, 6) + "19" + a.substr(6), b = ["19" + g[4], g[5], g[6]].join("-")), !this.IsDate(b, "ymd")) return !1;
            for (var h = 0, i = 0; 16 >= i; i++) h += c.charAt(i) * e[i];
            return c += d.charAt(h % 11), 15 == a.length || 18 == a.length && a == c
        },
        IsDate: function(a, b) {
            function c(a) {
                return (30 > a ? "20" : "19") + a | 0
            }
            formatStringformatString = b || "ymd";
            var d, e, f, g;
            switch (b) {
                case "ymd":
                    if (d = a.match(new RegExp("^((\\d{4})|(\\d{2}))([-./])(\\d{1,2})\\4(\\d{1,2})$")), null == d) return !1;
                    g = d[6], mmonth = 1 * d[5], e = 4 == d[2].length ? d[2] : c(parseInt(d[3], 10));
                    break;
                case "dmy":
                    if (d = a.match(new RegExp("^(\\d{1,2})([-./])(\\d{1,2})\\2((\\d{4})|(\\d{2}))$")), null == d) return !1;
                    g = d[1], mmonth = 1 * d[3], e = 4 == d[5].length ? d[5] : c(parseInt(d[6], 10))
            }
            if (!parseInt(f)) return !1;
            monthmonth = 0 == f ? 12 : f;
            var h = new Date(e, f - 1, g);
            return "object" == typeof h && e == h.getFullYear() && f == h.getMonth() + 1 && g == h.getDate()
        }
    };
var K256 = [1116352408, 1899447441, 3049323471, 3921009573, 961987163, 1508970993, 2453635748, 2870763221, 3624381080, 310598401, 607225278, 1426881987, 1925078388, 2162078206, 2614888103, 3248222580, 3835390401, 4022224774, 264347078, 604807628, 770255983, 1249150122, 1555081692, 1996064986, 2554220882, 2821834349, 2952996808, 3210313671, 3336571891, 3584528711, 113926993, 338241895, 666307205, 773529912, 1294757372, 1396182291, 1695183700, 1986661051, 2177026350, 2456956037, 2730485921, 2820302411, 3259730800, 3345764771, 3516065817, 3600352804, 4094571909, 275423344, 430227734, 506948616, 659060556, 883997877, 958139571, 1322822218, 1537002063, 1747873779, 1955562222, 2024104815, 2227730452, 2361852424, 2428436474, 2756734187, 3204031479, 3329325298],
    ihash, count, buffer, sha256_hex_digits = "0123456789abcdef";
! function(a, b) {
    "object" == typeof module && "object" == typeof module.exports ? module.exports = a.document ? b(a, !0) : function(a) {
        if (!a.document) throw new Error("You requires a window with a document");
        return b(a)
    } : b(a)
}("undefined" != typeof window ? window : this, function(a) {
    function b(a, b, c, d) {
        c = c || function() {}, d = d || function() {};
        var e = "as_8^yg8*R",
            f = {
                username: a,
                password: sha256_digest(e + b)
            };
        j(l, f, function(a) {
            n = a, n.islogin = !0, localStorage.setItem("logininfo", JSON.stringify(n)), c()
        }, function(a) {
            d(a)
        })
    }

    function c(a, b, c, d, e, f) {
        if (e = e || function() {}, f = f || function() {}, !a || !b || !c) throw "ERR:SignUp Fields Miss";
        var g = "as_8^yg8*R",
            h = {
                username: a,
                password: sha256_digest(g + b),
                email: c,
                reg_code: d
            };
        j(m, h, function() {
            e()
        }, function(a) {
            f(a)
        })
    }

    function d(a) {
        return sha256_digest(a + n.token)
    }

    function e() {
        n.username = n.username || "", n.islogin = !1, n.token = null, n.role = "user", a.localStorage.setItem("logininfo", JSON.stringify(n))
    }

    function f(a) {
        var b = "";
        for (var c in a) a.hasOwnProperty(c) && (b += c + "=" + a[c] + "&");
        return b.slice(0, b.length - 1)
    }

    function g(a, b, c, e) {
        e = e || function() {}, n.uid && (b.logincookie = n.logincookie), b = f(b);
        var g;
        n.islogin && (b += "&timestamp=" + (new Date).getTime(), g = d(b));
        var h = new XMLHttpRequest;
        h.open("GET", a + "?" + b, !0), h.setRequestHeader("X-sign", g), h.onloadend = function() {
            var a;
            try {
                a = JSON.parse(h.responseText)
            } catch (b) {
                e("网络连接错误")
            }
            a.succeed ? c && c(a.content) : (1 == a.errcode || 2 == a.errcode, e(a.message))
        }, h.onerror = function(a) {
            e("网络连接错误")
        }, h.send()
    }

    function h(a, b, c, e, g, h) {
        e = e || function() {}, g = g || function() {}, h = h || function() {}, b.logincookie = n.logincookie;
        var i = new FormData,
            j = new XMLHttpRequest;
        for (var k in b) b.hasOwnProperty(k) && i.append(k, b[k]);
        b = f(b);
        var l;
        n.islogin && (b += "&timestamp=" + (new Date).getTime(), l = d(b)), i.append("file", c), j.open("POST", a + "?" + b), j.setRequestHeader("X-sign", l), j.onloadend = function() {
            var a;
            try {
                a = JSON.parse(j.responseText)
            } catch (b) {
                g("网络连接错误")
            }
            a.succeed ? e(a.content) : g(a.message)
        }, j.onerror = function(a) {
            g("网络连接错误")
        }, j.upload.onprogress = function(a) {
            h(Math.round(100 * a.loaded / a.total))
        }, j.send(i)
    }

    function i(a, b, c, e, g) {
        e = e || function() {}, g = g || function() {}, b.logincookie = n.logincookie, b = f(b), b = d(b), b = b + "&raw=" + btoa(b);
        var h = new XMLHttpRequest;
        h.open("POST", a + "?" + b, !0), h.onloadend = function() {
            var a = JSON.parse(h.responseText);
            a.succeed ? e(a.content) : g(a.message)
        }, h.onerror = function(a) {
            g("网络连接错误")
        }, h.send(c)
    }

    function j(a, b, c, e) {
        c = c || function() {}, e = e || function() {};
        var g, h;
        n.islogin ? (g = {
            logincookie: n.logincookie
        }, g = f(g), g += "&timestamp=" + (new Date).getTime(), h = d(g)) : g = "";
        var i = new XMLHttpRequest;
        i.open("POST", a + "?" + g, !0), i.setRequestHeader("X-sign", h), i.onloadend = function() {
            var a = JSON.parse(i.responseText);
            a.succeed ? c(a.content) : e(a.message)
        }, i.onerror = function(a) {
            e("网络连接错误")
        }, i.setRequestHeader("content-type", "application/json"), i.send(JSON.stringify(b))
    }

    function k(a) {
        return n.islogin ? void g(apiurl + "checkLogin", {}, function() {
            n.islogin = !0, a()
        }, function() {
            n.islogin = !1, a()
        }) : void a()
    }
    var l = "/API/login",
        m = "/API/signup";
    a.apiurl = "/API/";
    var n;
    n = JSON.parse(localStorage.getItem("logininfo")), n || (n = {
        username: "",
        userid: "",
        token: "",
        logincookie: "",
        islogin: !1
    });
    var o = function() {
        return {
            login: function(a, c, d, e) {
                b(a, c, d, e)
            },
            signUp: function(a, b, d, e, f, g) {
                c(a, b, d, e, f, g)
            },
            ajaxGetQuery: function(a, b, c, d) {
                g(a, b, c, d)
            },
            postQuery: function(a, b, c, d) {
                j(a, b, c, d)
            },
            postfile: function(a, b, c, d, e, f) {
                h(a, b, c, d, e, f)
            },
            signedpost: function(a, b, c, d, e) {
                i(a, b, c, d, e)
            },
            uid: function() {
                return n.uid
            },
            logincookie: function() {
                return n.logincookie
            },
            islogin: function() {
                return n.islogin || !1
            },
            logout: function() {
                e()
            },
            isadmin: function() {
                return "admin" == n.role || "superadmin" == n.role
            },
            getusername: function() {
                return n.username
            },
            checkLogin: function(a) {
                k(a)
            },
            token: function() {
                return n.token
            }
        }
    };
    a.user = o()
}),
function(a, b) {
    "object" == typeof module && "object" == typeof module.exports ? module.exports = a.document ? b(a, !0) : function(a) {
        if (!a.document) throw new Error("You requires a window with a document");
        return b(a)
    } : b(a)
}("undefined" != typeof window ? window : this, function(a) {
    function b(a, b) {
        c(function(b) {
            a(b)
        }, b, "featured")
    }

    function c(a, b, c, d, e, f, g) {
        c = c || "new", f = f || user.uid() || 0, g = g || 0, a = a || function() {};
        var h = {
                type: c,
                offset: e,
                limit: d,
                uid: f,
                category: g
            },
            i = "getlivelist";
        "favorite" == c && (i = "getFavorites"), user.ajaxGetQuery(apiurl + i, h, function(b) {
            a(b)
        }, function(a) {
            b(a)
        })
    }

    function d(a, b) {
        a = a || function() {};
        var c = {};
        user.ajaxGetQuery(apiurl + "getcategory", c, function(b) {
            a(b)
        }, function(a) {
            b(a)
        })
    }

    function e(a, b, c) {
        b = b || function() {};
        var d = {
            live_id: a
        };
        user.ajaxGetQuery(apiurl + "getlive", d, function(a) {
            b(a)
        }, function(a) {
            c(a)
        })
    }

    function f(a, b, c, d, e) {
        d = d || function() {}, e = e || function() {};
        var f = {
            live_id: a,
            comment: b,
            type: c
        };
        user.postQuery(apiurl + "postcomment", f, function(a) {
            d(a)
        }, function(a) {
            e(a)
        })
    }

    function g(a, b, c, d, e) {
        d = d || function() {}, e = e || function() {};
        var f = {
            live_id: a,
            limit: b,
            offset: c
        };
        user.ajaxGetQuery(apiurl + "getcomments", f, function(a) {
            d(a)
        }, function(a) {
            e(a)
        })
    }

    function h(a, b, c) {
        b = b || function() {}, c = c || function() {};
        var d = {
            id: a
        };
        user.ajaxGetQuery(apiurl + "deleteComment", d, function(a) {
            b(a)
        }, function(a) {
            c(a)
        })
    }

    function i(a, b, c, d) {
        a = a || function() {};
        var e = {
            live_name: b,
            live_info: c
        };
        user.postQuery(apiurl + "createlive", e, function(b) {
            a(b)
        }, function(a) {
            d(a)
        })
    }

    function j(a, b, c, d, e) {
        a = a || function() {};
        var g = {
            live_id: c,
            pass: d
        };
        user.ajaxGetQuery(apiurl + "reviewlive", g, function(b) {
            a(b), f(function() {}, c, e, "private", function() {})
        }, function(a) {
            b(a)
        })
    }

    function k(a, b, c) {
        a = a || function() {};
        var d = {
            live_id: c
        };
        user.ajaxGetQuery(apiurl + "deletelive", d, function(b) {
            a(b)
        }, function(a) {
            b(a)
        })
    }

    function l(a, b) {
        b = b || 0, a = a || function() {};
        var c = {
            page: b
        };
        user.ajaxGetQuery(apiurl + "getuserlist", c, function(b) {
            a(b)
        })
    }

    function m(a, b, c, d) {
        var e = {
            live_id: c,
            updatevalues: b
        };
        user.postQuery(apiurl + "updatemultifields", e, function(b) {
            a(b)
        }, function(a) {
            d(a)
        })
    }

    function n(a, b, c) {
        var d = {
            live_id: a
        };
        user.ajaxGetQuery(apiurl + "setfeaturedlive", d, function(a) {
            b(a)
        }, c)
    }

    function o(a, b, c) {
        var d = {
            live_id: c
        };
        user.ajaxGetQuery(apiurl + "delfeaturedlive", d, function(b) {
            a(b)
        }, b)
    }

    function p(a, b, c, d, e, f) {
        a = a || function() {}, b = b || function() {}, c = c || function() {}, user.postfile(r, {
            type: e,
            live_id: d
        }, f, function(b) {
            a(b)
        }, function(a) {
            c(a)
        }, function(a) {
            b(a)
        })
    }

    function q(a, b, c) {
        b = b || function() {}, user.ajaxGetQuery(apiurl + "getYoukuVideo", {
            youkuId: c
        }, function(b) {
            a(b)
        })
    }
    var r = "https://m.tianyi9.com/upload.php";
    api = function() {
        return {
            createLive: function(a, b, c, d) {
                i(c, a, b, d)
            },
            getLiveList: function(a, b, d, e, f, g, h) {
                c(g, h, a, b, d, e, f)
            },
            getUserList: function(a, b) {
                l(a, b)
            },
            uploadfile: p,
            getLiveInfo: e,
            updateMultiFields: m,
            reviewLive: j,
            deleteLive: k,
            postComment: f,
            getComments: g,
            deleteComment: h,
            setFeatured: n,
            getFeaturedList: b,
            delFeatured: o,
            getCagoList: d,
            getYoukuVideo: q
        }
    }, a.API = api()
}),
function(a, b) {
    "object" == typeof module && "object" == typeof module.exports ? module.exports = a.document ? b(a, !0) : function(a) {
        if (!a.document) throw new Error("You requires a window with a document");
        return b(a)
    } : b(a)
}("undefined" != typeof window ? window : this, function(a) {
    function b() {
        localStorage.setItem("llpsettings", JSON.stringify(d))
    }
    var c = {
            version: 1,
            delay: 0,
            addtomain: 0,
            src: null
        },
        d = {},
        e = localStorage.getItem("llpsettings");
    if (e) {
        if (d = JSON.parse(e), d.version < c.version)
            for (i in c) d.hasOwnProperty(i) || (d[i] = d[i])
    } else d = c;
    a.addEventListener("unload", b), settings = function() {
        return {
            get: function(a) {
                return d[a]
            },
            set: function(a, c) {
                d[a] = c, b()
            },
            reset: function() {
                d = c, b()
            }
        }
    }, a.settings = settings()
}), angular.module("myApp.help", ["ngRoute"]).config(["$routeProvider", function(a) {
    a.when("/help", {
        templateUrl: "views/help/help.html",
        controller: "helpCtrl"
    })
}]).controller("helpCtrl", ["$scope", function(a) {
    ga("send", "pageview", "/help")
}]), angular.module("myApp.createTopic", ["ngRoute"]).config(["$routeProvider", function(a) {
    a.when("/createTopic", {
        templateUrl: "views/topic/createTopic.html",
        controller: "createTopicCtrl"
    })
}]).controller("createTopicCtrl", ["$scope", function(a) {
    a.sending = !1, a.createTopic = function() {
        (a.topic_name && a.description || !a.sending) && (a.sending = !0, user.postQuery("/API/create_topic", {
            topic_name: a.topic_name,
            description: a.description
        }, function(a) {
            location.href = "#editTopic?topic_id=" + a.topic_id
        }, function(b) {
            a.error = b, a.sending = !1, a.$apply()
        }))
    }, a.getTopicInfo = function() {}, user.isadmin() && user.islogin() || (window.location.href = "#index"), ga("send", "pageview", "/createTopic")
}]), angular.module("myApp.editTopic", ["ngRoute"]).config(["$routeProvider", function(a) {
    a.when("/editTopic", {
        templateUrl: "views/topic/editTopic.html",
        controller: "editTopicCtrl"
    })
}]).controller("editTopicCtrl", ["$scope", "$modal", "$routeParams", "T", function(a, b, c, d) {
    var e = c.topic_id;
    a.getTopicInfo = function() {
        user.ajaxGetQuery("/API/get_topic", {
            topic_id: e
        }, function(b) {
            a.data = b, a.$apply()
        }, function() {})
    }, a.editTopic = function() {
        user.postQuery("/API/edit_topic", {
            topic_id: e,
            data: a.data
        }, function() {
            a.success = "Success!"
        }, function(b) {
            a.error = b
        })
    }
}]), angular.module("myApp.getTopic", ["ngRoute"]).config(["$routeProvider", function(a) {
    a.when("/getTopic", {
        templateUrl: "views/topic/getTopic.html",
        controller: "getTopicCtrl"
    })
}]).controller("getTopicCtrl", ["$scope", "$modal", "$routeParams", "T", function(a, b, c) {
    var d = c.topic_id;
    a.getTopicInfo = function() {
        user.ajaxGetQuery("/API/get_topic", {
            topic_id: d
        }, function(b) {
            a.topic_info = b;
            var c = /[LIVE:(.{8,20})]/;
            "testtest[LIVE:235454554]kknndiir".match(c), a.$apply()
        }, function() {})
    }
}]), angular.module("myApp.competition", ["ngRoute"]).config(["$routeProvider", function(a) {
    a.when("/competition", {
        templateUrl: "views/competition/competition.html",
        controller: "cpCtrl"
    })
}]).controller("cpCtrl", ["$scope", function(a) {
    ga("send", "pageview", "/competition")
}]), angular.module("myApp.record", ["ngRoute"]).config(["$routeProvider", function(a) {
    a.when("/record", {
        templateUrl: "views/record/record.html",
        controller: "recordCtrl"
    })
}]).controller("recordCtrl", ["$scope", function(a) {
    ga("send", "pageview", "/help"), a.check = function() {
        user.ajaxGetQuery("/API/checkrecord", {
            record: a.recordId
        }, function(b) {
            a.record = b, a.detail = decode(b.sign), user.ajaxGetQuery("/API/user_info", {
                uid: b.uid
            }, function(b) {
                a.user = b, a.$apply()
            }, function(b) {
                alert("获取用户信息,出现错误" + b), a.user = null, a.detail = null, a.record = null, a.$apply()
            }), a.$apply()
        }, function(b) {
            alert("获取记录,出现错误" + b), a.user = null, a.detail = null, a.record = null, a.$apply()
        })
    }, a.formatTS = function(a) {
        return a ? new Date(1e3 * a).toLocaleString() : ""
    }
}]);
var defaultSetting = {
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
        },
        scoreInitialState: {
            x: 0,
            y: .75,
            h: .15
        }
    },
    schema = {
        title: "设置",
        type: "object",
        collapsed: !0,
        definitions: {
            sprite: {
                title: "图元",
                type: "object",
                format: "table",
                options: {
                    collapsed: !0
                },
                properties: {
                    x: {
                        title: "位置X",
                        type: "number"
                    },
                    y: {
                        title: "位置Y",
                        type: "number"
                    },
                    w: {
                        title: "宽度",
                        type: "number"
                    },
                    h: {
                        title: "高度",
                        type: "number"
                    },
                    sx: {
                        title: "素材位置X(像素)",
                        type: "number"
                    },
                    sy: {
                        title: "素材位置Y(像素)",
                        type: "number"
                    },
                    sw: {
                        title: "素材宽度(像素)",
                        type: "number"
                    },
                    sh: {
                        title: "素材高度(像素)",
                        type: "number"
                    },
                    opacity: {
                        title: "透明度(0-1)",
                        type: "number"
                    },
                    scale: {
                        title: "缩放倍数",
                        type: "number"
                    },
                    rotation: {
                        title: "旋转",
                        type: "number"
                    },
                    row: {
                        title: "图案行数",
                        type: "number"
                    },
                    stride: {
                        title: "图案列数",
                        type: "number"
                    }
                }
            },
            action: {
                title: "动画",
                type: "object",
                options: {
                    collapsed: !0
                },
                additionalProperties: {
                    type: "array",
                    format: "table",
                    items: {
                        type: "object",
                        properties: {
                            type: {
                                title: "类型",
                                type: "string",
                                "enum": ["set", "translate", "translateTo", "loop", "end", "delay"]
                            },
                            time: {
                                title: "进行时间ms",
                                type: "number"
                            },
                            times: {
                                title: "循环次数(仅对loop类型有效)",
                                type: "number"
                            },
                            value: {
                                title: "值",
                                type: "number"
                            },
                            easing: {
                                title: "缓动",
                                type: "string",
                                "enum": ["none", "easeInQuad", "easeOutQuad", "easeInOutQuad", "easeInCubic", "easeOutCubic", "easeInOutCubic", "easeInQuart", "easeOutQuart", "easeInOutQuart", "easeInQuint", "easeOutQuint", "easeInOutQuint", "easeInSine", "easeOutSine", "easeInOutSine", "easeInExpo", "easeOutExpo", "easeInOutExpo", "easeInCirc", "easeOutCirc", "easeInOutCirc", "easeInElastic", "easeOutElastic", "easeInOutElastic", "easeInBack", "easeOutBack", "easeInOutBack", "easeOutBounce", "linear"]
                            }
                        }
                    }
                }
            }
        },
        properties: {
            loadingPromotion: {
                options: {
                    collapsed: !0
                },
                title: "加载提示内容",
                type: "array",
                format: "table",
                items: {
                    type: "string"
                }
            },
            loadingParticleSystem: {
                options: {
                    collapsed: !0
                },
                title: "加载粒子系统样式",
                type: "object",
                properties: {
                    size: {
                        title: "规模(4-7)",
                        type: "number",
                        max: 7,
                        min: 4
                    },
                    simpleParticle: {
                        title: "使用简单粒子渲染",
                        type: "boolean"
                    },
                    emitterType: {
                        title: "发生器类型(1:点,3:立方体)",
                        type: "number",
                        "enum": [1, 3]
                    },
                    pointScale: {
                        title: "粒子大小",
                        type: "number"
                    },
                    emitSpeed: {
                        title: "发射速度",
                        type: "number"
                    },
                    fade: {
                        title: "渐隐",
                        type: "number"
                    },
                    enabled: {
                        title: "显示本粒子系统",
                        type: "boolean"
                    },
                    color: {
                        title: "颜色,分别为 红 绿 蓝,取值范围 0-1",
                        type: "array",
                        format: "table",
                        items: {
                            type: "number",
                            length: 3,
                            max: 1,
                            min: 0
                        }
                    }
                }
            },
            sprites: {
                collapsed: !0,
                title: "默认图元",
                type: "object",
                format: "table",
                options: {
                    collapsed: !0
                },
                properties: {
                    noteSpr: {
                        title: "note",
                        $ref: "#/definitions/sprite"
                    },
                    parallelSpr: {
                        title: "note同时标记",
                        $ref: "#/definitions/sprite"
                    },
                    tailSpr: {
                        title: "长note尾部",
                        $ref: "#/definitions/sprite"
                    },
                    longNoteSpr: {
                        title: "长条",
                        $ref: "#/definitions/sprite"
                    },
                    perfect: {
                        title: "perfect标志",
                        $ref: "#/definitions/sprite"
                    },
                    great: {
                        title: "great标志",
                        $ref: "#/definitions/sprite"
                    },
                    good: {
                        title: "good标志",
                        $ref: "#/definitions/sprite"
                    },
                    bad: {
                        title: "bad标志",
                        $ref: "#/definitions/sprite"
                    },
                    miss: {
                        title: "miss标志",
                        $ref: "#/definitions/sprite"
                    },
                    comboDigits: {
                        title: "combo数字",
                        $ref: "#/definitions/sprite"
                    },
                    scoreDigits: {
                        title: "分数数字",
                        $ref: "#/definitions/sprite"
                    }
                }
            },
            settingVersion: {
                title: "版本号(修改无效)",
                type: "number",
                enable: !1,
                options: {
                    hidden: !0
                }
            },
            rankInitialState: {
                options: {
                    collapsed: !0
                },
                title: "ranking图案初始状态",
                $ref: "#/definitions/sprite"
            },
            comboInitialState: {
                options: {
                    collapsed: !0
                },
                title: "combo 数字初始状态",
                $ref: "#/definitions/sprite"
            },
            rankAction: {
                options: {
                    collapsed: !0
                },
                title: "rank动画",
                $ref: "#/definitions/action"
            },
            longNotePressAction: {
                options: {
                    collapsed: !0
                },
                title: "长条按压动画",
                $ref: "#/definitions/action"
            },
            comboAction: {
                options: {
                    collapsed: !0
                },
                title: "combo动画",
                $ref: "#/definitions/action"
            },
            resultRankCountActions: {
                title: "结算界面ranking动画",
                type: "object",
                options: {
                    collapsed: !0
                },
                properties: {
                    perfect: {
                        title: "perfect",
                        $ref: "#/definitions/action"
                    },
                    great: {
                        title: "great",
                        $ref: "#/definitions/action"
                    },
                    good: {
                        title: "good",
                        $ref: "#/definitions/action"
                    },
                    bad: {
                        title: "bad",
                        $ref: "#/definitions/action"
                    },
                    miss: {
                        title: "miss",
                        $ref: "#/definitions/action"
                    }
                }
            },
            resultScoreAction: {
                options: {
                    collapsed: !0
                },
                title: "结算分数动画",
                $ref: "#/definitions/action"
            },
            rankParticleAction: {
                options: {
                    collapsed: !0
                },
                title: "ranking效果粒子动画",
                $ref: "#/definitions/action"
            },
            rankParticleColor: {
                type: "object",
                title: "打击效果粒子颜色",
                options: {
                    collapsed: !0
                },
                additionalProperties: {
                    title: "颜色(红 绿 蓝 透明度 范围0-1)",
                    type: "array",
                    format: "table",
                    items: {
                        type: "number"
                    }
                }
            },
            longNoteInitialState: {
                title: "长条初始状态",
                options: {
                    collapsed: !0
                },
                $ref: "#/definitions/sprite"
            },
            scoreInitialState: {
                title: "分数初始状态",
                options: {
                    collapsed: !0
                },
                $ref: "#/definitions/sprite"
            },
            rankParticleSystem: {
                type: "object",
                title: "打击效果粒子",
                options: {
                    collapsed: !0
                },
                properties: {
                    x: {
                        title: "位置X",
                        type: "number"
                    },
                    y: {
                        title: "位置Y",
                        type: "number"
                    },
                    w: {
                        title: "宽度",
                        type: "number"
                    },
                    h: {
                        title: "高度",
                        type: "number"
                    },
                    sx: {
                        title: "素材位置X(像素)",
                        type: "number"
                    },
                    sy: {
                        title: "素材位置Y(像素)",
                        type: "number"
                    },
                    sw: {
                        title: "素材宽度(像素)",
                        type: "number"
                    },
                    sh: {
                        title: "素材高度(像素)",
                        type: "number"
                    },
                    opacity: {
                        title: "透明度(0-1)",
                        type: "number"
                    },
                    speed: {
                        title: "发射速度",
                        type: "number"
                    },
                    randomize: {
                        title: "随机性(0-1)",
                        type: "number"
                    },
                    fade: {
                        title: "渐隐",
                        type: "number"
                    },
                    size: {
                        title: "粒子大小",
                        type: "number"
                    },
                    scale: {
                        title: "缩放倍数",
                        type: "number"
                    },
                    row: {
                        title: "素材行数",
                        type: "number"
                    },
                    stride: {
                        title: "素材列数",
                        type: "number"
                    }
                }
            }
        }
    },
    Customize = function() {
        function a(a, b, c) {
            this.$scope = b, this.$http = c, this.schema = schema, this.startVal = null, this.assetsUrl = "https://m.tianyi9.com/NGLLP/assets/uiAssets.png", this.customizeUrl = null, this.editData = null, this.uploading = !1, this.progress = 0, this.live_id = a.live_id, this.updateAll()
        }
        return a.prototype.updateAll = function() {
            var a = this;
            user.ajaxGetQuery("/API/getlive", {
                live_id: this.live_id
            }, function(b) {
                a.assetsUrl = b.assets_path ? "/upload/" + b.assets_path : a.assetsUrl, a.customizeUrl = b.customize_path, a.customizeUrl ? a.updateCustomize() : a.startVal = defaultSetting, a.$scope.$apply()
            })
        }, a.prototype.updateCustomize = function() {
            var a = this;
            this.$http.get("/upload/" + this.customizeUrl).then(function(b) {
                return a.startVal = b.data
            })
        }, a.prototype.dataChanged = function(a) {
            this.editData = a
        }, a.prototype.uploadCustomize = function() {
            var a = this;
            user.postfile("/API/customize/" + this.live_id, {}, new Blob([JSON.stringify(this.editData)], {
                type: "application/json"
            }), function(b) {
                a.updateAll(), alert("已更新")
            }, function(a) {
                return alert(a)
            })
        }, a.prototype.resetCustomize = function() {
            this.editData = this.startVal = defaultSetting, user.postfile("/API/customize/" + this.live_id, {}, new Blob([JSON.stringify(this.editData)], {
                type: "application/json"
            }), function(a) {
                location.reload()
            }, function(a) {
                return alert(a)
            })
        }, a.prototype.uploadAssets = function() {
            var a = this;
            if (!this.uploading) {
                var b = document.createElement("input");
                b.type = "file", b.onchange = function() {
                    if (!(b.files.length = 0)) {
                        var c = b.files[0];
                        user.postfile("/API/assets/" + this.live_id, {}, c, function() {
                            this.success = "成功", this.updateAll(), this.progress = 0, this.uploading = !1, this.$scope.$apply()
                        }.bind(a), function(a) {
                            this.error = a, this.progress = 0, this.uploading = !1, this.$scope.$apply()
                        }.bind(a), function(a) {
                            this.progress = a, this.$scope.$apply()
                        }.bind(a))
                    }
                }.bind(this), b.click()
            }
        }, a
    }(),
    CustomizeTemplate = '\n<h4>当前资源图片</h4>\n<img ng-src="{{$ctrl.assetsUrl}}" style="background: white;max-width: 512px;max-height:512px">\n<a href="/NGLLP/assets/uiAssets.png">下载默认资源图片</a>\n<button class="btn btn-default" ng-click="$ctrl.uploadAssets()">上传资源图片(.png)</button>\n     <progressbar ng-show="$ctrl.progress" class="progress-striped active" value="$ctrl.progress" type="success">\n                {{$ctrl.progress}}\n            </progressbar>\n     <alert ng-show="$ctrl.success" type="success" close="$ctrl.success=null">{{$ctrl.success}}</alert>\n     <alert ng-show="$ctrl.error" type="danger" close="$ctrl.error=null">{{$ctrl.error}}</alert>\n<div>\n<json-editor ng-if="$ctrl.startVal" schema="$ctrl.schema" startval="$ctrl.startVal"  on-change="$ctrl.dataChanged($editorValue)">\n</div>\n<button class="btn btn-default" ng-click="$ctrl.uploadCustomize()">确认修改</button>\n<button class="btn btn-default" ng-click="$ctrl.resetCustomize()">恢复默认</button>\n\n';
angular.module("myApp").config(["$routeProvider", "JSONEditorProvider", function(a, b) {
    a.when("/customize", {
        template: '\n            <div class="top-blank-lg container">\n                <customize></customize>\n            </div>\n            '
    }), b.configure({
        defaults: {
            options: {
                disable_array_reorder: !0,
                iconlib: "bootstrap3",
                theme: "bootstrap3",
                collapsed: !0
            }
        }
    })
}]).component("customize", {
    template: CustomizeTemplate,
    controller: ["$routeParams", "$scope", "$http", Customize]
});
