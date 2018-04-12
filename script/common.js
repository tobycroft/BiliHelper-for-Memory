function go_Login() {
    if (!login_check()) {
        api.openWin({
            name : 'login',
            url : 'widget://html/login/login.html',
            //          bounces: true
        });
    } else {
        api.toast({
            msg : '您已经登陆'
        });
    }
}

function go_LoginCheck() {
    api.openWin({
        name : 'LoginCheck',
        url : 'logincheck.html'
    });
}

function go_Logout() {
    if (login_check()) {
        api.confirm({
            title : '是否开始更新密码？',
            msg : '请务必查看说明！\n请务必查看说明！\n请务必查看说明！\n',
            buttons : ['确定', '取消']
        }, function(ret, err) {
            var index = ret.buttonIndex;
            if (index == '1') {
                api.sendEvent({
                    name : 'reload'
                });
                api.openWin({
                    name : 'Logout',
                    url : 'logout.html'
                });
            }
        });
    } else {
        go_Login();
    }
}

function go_exit() {
    api.confirm({
        title : '是否退出',
        msg : '如果您有多个帐号需要登陆，在退出后您依然可以接收到之前帐号的推送信息，如果您有使用助手的离线挂机功能，在您退出后离线功能将会被中止，如果您是加入C2C节点挂机的，您的退出不会导致您退出C2C节点请放心！助手网络是实时网络，如果您没有多帐号的需求，我们建议您要定期查看您的帐号状态以保证安全~助手会在这里等您重新回来哦~',
        buttons : ['确定', '取消']
    }, function(ret, err) {
        var index = ret.buttonIndex;
        if (index == '1') {
            api.sendEvent({
                name : 'reload'
            });
            api.sendEvent({
                name : 'logout'
            });
            goto_exit();
        }
    });
}

function goto_exit() {
    api.ajax({
        url : URL() + '/index/api/v1/act/logout',
        method : 'post',
        data : {
            values : {
                username : get_userName(),
                token : get_userToken(),
            },
        }
    }, function(ret, err) {
    if(ret){
            if (ret.code == '0') {
            api.alert({
                msg : ret.data
            });
            logout();
        } else if (ret.code == '-1') {
            logout();
        } else {
            api.alert({
                msg : ret
            });
        }
    }
    });
}

function login_check() {
    if ($api.getStorage('usertoken')) {
        return true;
    } else {
        return false;
    }
}

function goto_login() {
    if (!login_check()) {
        go_Login();
    }
}

function get_userName() {
    if ($api.getStorage('username')) {
        return $api.getStorage('username');
    }
}

function no() {
    alert('抱歉还没有做好……请等待更新！');
}

function URL() {
    if ($api.getStorage('server_select') == 'uni') {
        return 'http://unicom.bili.api.tuuz.cn:81';
    } else if ($api.getStorage('server_select') == 'tele') {
        return 'http://telecom.bili.api.tuuz.cn:81';
    } else if ($api.getStorage('server_select') == 'auto') {
        return 'http://bili.api.tuuz.cn:81';
    } else {
        return 'http://bili.api.tuuz.cn:81';
    }
}

function urladdress(data) {
    var str = URL() + data;
    return str;
}

function closepage() {
    api.closeWin({
    });
}

function closetoroot() {
    api.closeToWin({
        name : 'root'
    });
}

function get_userToken() {
    if ($api.getStorage('usertoken')) {
        return $api.getStorage('usertoken');
    }

}

function __contentBuilder(content) {
    return '<span class="subtitle">' + content + '</span>';
}

function __tagBuilder(color, tag) {
    switch (color) {
        case 'red':
            return '<span class="a1 tag">' + tag + '</span>';
            break;
        case 'blue':
            return '<span class="a2 tag">' + tag + '</span>';
            break;
        case 'ornage':
            return '<span class="a3 tag">' + tag + '</span>';
            break;
        case 'green':
            return '<span class="a4 tag">' + tag + '</span>';
            break;
        default:
            return '<span class="a2 tag">' + tag + '</span>';
            break;
    }
}

function app_sign() {
    showProgress();
    api.ajax({
        url : URL() + '/index/api/v1/act/app_user_sign',
        method : 'post',
        data : {
            values : {
                username : get_userName(),
                token : get_userToken(),
            },
        }
    }, function(ret, err) {
        if (ret) {
            if (ret.code == '0') {
                api.alert({
                    msg : ret.data
                });
                check_sign();
            } else if (ret.code == '-1') {
                logout();
            } else {
                api.alert({
                    msg : ret.data
                });
            }
        }
        hideProgress();
    });
}

function user_info() {
    showProgress();
    api.ajax({
        url : URL() + '/index/api/v1/act/user_info',
        method : 'post',
        data : {
            values : {
                username : get_userName(),
                token : get_userToken(),
            },
        }
    }, function(ret, err) {
        if (ret) {
            if (ret.code == '0') {
                $api.setStorage('uname', ret.data.uname);
                $api.setStorage('head_img', ret.data.s_face);
                $api.setStorage('birthday', ret.data.birthday);
                $api.setStorage('user_level_color', ret.data.user_level_color);
                $api.setStorage('silver', ret.data.silver);
                $api.setStorage('user_level', ret.data.user_level);
                $api.setStorage('is_up', ret.data.is_up);
                $api.setStorage('update_time', ret.data.date);
                $api.setStorage('jointime', ret.data.jointime);
                $api.setStorage('mobile_verified', ret.data.mobile_verified);
                $api.setStorage('coins', ret.data.coins);
                api.sendEvent({
                    name : 'reload'
                });
            } else if (ret.code == '-1') {
                logout();
            } else {
                api.alert({
                    msg : '个人信息获取失败'
                });
            }
        }
        hideProgress();
    });
}

function logout() {
    $api.clearStorage();
    api.toast({
        msg : '已退出'
    });
    api.sendEvent({
        name : 'reload'
    });
    api.sendEvent({
        name : 'logout'
    });
    goto_login();
}

function browser(url) {
    api.openApp({
        androidPkg : 'android.intent.action.VIEW',
        mimeType : 'text/html',
        uri : url
    }, function(ret, err) {
    });
}

function sign_covert() {
    showProgress();
    api.ajax({
        url : URL() + '/index/api/v1/act/sign_avail_days',
        method : 'post',
        data : {
            values : {
                username : get_userName(),
                token : get_userToken(),
            },
        }
    }, function(ret, err) {
        if (ret) {
            if (ret.code == '0') {
                api.confirm({
                    title : '您有' + ret.data.day + '天可兑换',
                    msg : ret.data.msg,
                    buttons : ['确定', '取消']
                }, function(ret, err) {
                    var index = ret.buttonIndex;
                    if (index == '1') {
                        __sign_convert();
                    }
                });
            } else if (ret.code == '-1') {
                logout();
            } else {
                api.alert({
                    msg : ret.data
                });
            }
        }
        hideProgress();
    });
}

function __sign_convert() {
    showProgress()
    api.ajax({
        url : URL() + '/index/api/v1/act/sign_to_date',
        method : 'post',
        data : {
            values : {
                username : get_userName(),
                token : get_userToken(),
            },
        }
    }, function(ret, err) {
        if (ret) {
            if (ret.code == '0') {
                api.alert({
                    msg : ret.data
                });
                api.sendEvent({
                    name : 'reload'
                });
            } else if (ret.code == '-1') {
                logout();
            } else {
                api.alert({
                    msg : '个人信息获取失败'
                });
            }
        }
        hideProgress();
    });
}

function checkTime(i) {
    if (i < 10) {
        i = "0" + i
    }
    return i
}

function dhi() {
    var today = new Date();
    var ss = checkTime(today.getDate());
    var h = checkTime(today.getHours());
    var m = checkTime(today.getMinutes());
    return ss + "" + h;
}

function second() {
    var today = new Date();
    var m = checkTime(today.getSeconds());
    return m;
}

function heart_delay(delay) {
    if (delay) {
        $api.setStorage("heart_delay", delay);
    } else {
        $api.getStorage("heart_delay");
    }
}

function silver_delay(delay) {
    if (delay) {
        $api.setStorage("silver_delay", delay);
    } else {
        $api.getStorage("silver_delay");
    }
}

function tv_delay(delay) {
    if (delay) {
        $api.setStorage("tv_delay", delay);
    } else {
        $api.getStorage("tv_delay");
    }
}

function huodong_delay(delay) {
    if (delay) {
        $api.setStorage("huodong_delay", delay);
    } else {
        $api.getStorage("huodong_delay");
    }
}

function listerninfo(value) {
    var listernerinfo = $api.getStorage("listernerinfo");
    if (value) {
        if (listernerinfo) {
            var json = JSON.parse(listernerinfo);
            json.push(value + " " + Now());
            $api.setStorage("listernerinfo", JSON.stringify(json));
        } else {
            listernerinfo = [value + " " + Now()];
            $api.setStorage("listernerinfo", JSON.stringify(listernerinfo));
        }
    } else {
        if (listernerinfo) {
            listerninfo_clear();
            return JSON.parse(listernerinfo);
        } else {
            return [];
        }

    }
}

function listerninfo_clear() {
    $api.setStorage("listernerinfo", null);
}

function Now() {
    var date = new Date();
    return date.toLocaleString();
}

function not() {
    api.toast({
        msg : '下个版本修复'
    });
}

function showProgress() {
    var activity = api.require('UILoading');
    activity.keyFrame({
        rect : {
            w : 80,
            h : 100
        },
        styles : {
            bg : 'rgba(0,0,0,0.5)',
            corner : 5,
            interval : 50,
            frame : {
                w : 80,
                h : 80
            }
        }
    }, function(ret) {
        //  alert(JSON.stringify(ret));
    });
}

function hideProgress() {
    var uiloading = api.require('UILoading');
    uiloading.closeKeyFrame();
}
