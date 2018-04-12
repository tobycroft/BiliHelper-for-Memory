function Toga() {
    doSign();
    onlineHeart();
    getSilver();
    var oint = self.setInterval("onlineHeart()", heart_delay() * 1000);
    $api.setStorage("oint", oint);
    var sint = self.setInterval("getSilver()", silver_delay() * 1000);
    $api.setStorage("sint", sint);
    var tint = self.setInterval("timeMachine()", timemachine_delay() * 1000);
    $api.setStorage("tint", tint);
    var signt = self.setInterval("doSign()",  21600* 1000);
    $api.setStorage("signint", signt);
}

function Rever() {
    window.clearInterval($api.getStorage("oint"));
    window.clearInterval($api.getStorage("sint"));
    window.clearInterval($api.getStorage("tint"));
    window.clearInterval($api.getStorage("signint"));
    listerninfo_clear();
}

function Gift_already() {

}

function offline_on() {
    api.ajax({
        url : urladdress('/index/api/v3/act/offline_on'),
        method : 'post',
        data : {
            values : {
                username : get_userName(),
                token : get_userToken(),
            }
        }
    }, function(ret, err) {
        if (ret.code == '0') {
            api.toast({
                msg : ret.data
            });
            api.sendEvent({
                name : 'logout'
            });
        } else if (ret.code == '-1') {
            logout();
        } else {
            api.toast({
                msg : ret.data
            });
            api.sendEvent({
                name : 'login_comp'
            });
        }
    });
}

function offline_off() {
    api.ajax({
        url : urladdress('/index/api/v3/act/offline_off'),
        method : 'post',
        data : {
            values : {
                username : get_userName(),
                token : get_userToken(),
            }
        }
    }, function(ret, err) {
        if (ret.code == '0') {
            api.toast({
                msg : ret.data
            });
        } else if (ret.code == '-1') {
            logout();
        } else {
            api.toast({
                msg : ret.data
            });
            api.sendEvent({
                name : 'logout'
            });
        }
    });
}

function doSign() {
    var funcname = /function\s+(\w+)/.exec(arguments.callee)[1];
    info(funcname);
}

function getSilver() {
    var funcname = /function\s+(\w+)/.exec(arguments.callee)[1];
    var ds = {
        username : get_userName(),
        token : get_userToken(),
        dhi : new_dhi(),
    };
    api.ajax({
        url : URL() + '/index/fadec/app/act/getsilvertask',
        method : 'post',
        data : {
            values : ds
        }
    }, function(ret, err) {
        if (ret.code == '0') {
            var decret = Dec(ret.data);
            api.ajax({
                url : decret.url,
                method : 'get',
            }, function(ret, err) {
                if (ret) {
                    job = new Object()
                    job.time_start = ret.data.time_start;
                    job.time_end = ret.data.time_end;
//                  alert($api.jsonToStr(job));
                    info(funcname, job);
                }
            });

        } else {
            var decret = Dec(ret.data);
            listerninfo(decret);
        }
    });
    //  info(funcname);
}

function timeMachine() {
    var funcname = /function\s+(\w+)/.exec(arguments.callee)[1];
    var ds = {
        username : get_userName(),
        token : get_userToken(),
        dhi : new_dhi(),
    };
    api.ajax({
        url : URL() + '/index/fadec/app/act/' + funcname,
        method : 'post',
        data : {
            values : ds
        }
    }, function(ret, err) {
        if (ret.code == '0') {
            var json = Dec(ret.data);
            for (var key in json) {
                if (!GiftCheck(key)) {
                    var roomid = json[key].roomid;
                    var type = json[key].type;
                    EnterGift(type, key, roomid);
                    GiftUsed(key);
                }
            }
        }
    });
}

function silver_delay() {
    var funcname = /function\s+(\w+)/.exec(arguments.callee)[1];
    var delay = $api.getStorage(funcname);
    if (delay) {
        return delay;
    } else {
        $api.setStorage(funcname, "300");
        return $api.getStorage(funcname);
    }
}

function heart_delay() {
    var funcname = /function\s+(\w+)/.exec(arguments.callee)[1];
    var delay = $api.getStorage(funcname);
    if (delay) {
        return delay;
    } else {
        $api.setStorage(funcname, "39");
        return $api.getStorage(funcname);
    }
}

function tv_delay() {
    var funcname = /function\s+(\w+)/.exec(arguments.callee)[1];
    var delay = $api.getStorage(funcname);
    if (delay) {
        return delay;
    } else {
        $api.setStorage(funcname, "1");
        return $api.getStorage(funcname);
    }
}

function huodong_delay() {
    var funcname = /function\s+(\w+)/.exec(arguments.callee)[1];
    var delay = $api.getStorage(funcname);
    if (delay) {
        return delay;
    } else {
        $api.setStorage(funcname, "1");
        return $api.getStorage(funcname);
    }
}

function refresh_delay() {
    var funcname = /function\s+(\w+)/.exec(arguments.callee)[1];
    var delay = $api.getStorage(funcname);
    if (delay) {
        return delay;
    } else {
        $api.setStorage(funcname, "1");
        return $api.getStorage(funcname);
    }
}

function timemachine_delay() {
    var funcname = /function\s+(\w+)/.exec(arguments.callee)[1];
    var delay = $api.getStorage(funcname);
    if (delay) {
        return delay;
    } else {
        $api.setStorage(funcname, "30");
        return $api.getStorage(funcname);
    }
}

function onlineHeart() {
    var funcname = /function\s+(\w+)/.exec(arguments.callee)[1];
    info(funcname);
}

function EnterGift(type, tv_event, roomid) {
    if (type == "tv") {
        setTimeout(join_tv(tv_event, roomid), tv_delay() * 1000);
    } else {
        setTimeout(join_huodong(tv_event, roomid), huodong_delay() * 1000);
    }
}

function join_tv(tvid, room_id) {
    var data = {
        "tvid" : tvid,
        "room_id" : room_id
    };
    info("tv", data);
}

function join_huodong(event_type, room_id) {
    var data = {
        "event_type" : event_type,
        "room_id" : room_id
    };
    info("huodong", data);
}

function info(url, data) {
    var ds = {
        username : get_userName(),
        token : get_userToken(),
        dhi : new_dhi(),
        data : Enc(JSON.stringify(data))
    };
    api.ajax({
        url : URL() + '/index/fadec/app/act/' + url,
        method : 'post',
        data : {
            values : ds
        }
    }, function(ret, err) {
        if (ret.code == '0') {
            var decret = Dec(ret.data);
            Enter(decret.method, decret.url, decret.retaddr, decret.postString);
        } else {
            var decret = Dec(ret.data);
            listerninfo(decret);
        }
    });
}

function Enter(method, url, retaddr, postarr) {
    if (method.toString() == "GET") {
        Get(url, retaddr);
    } else {
        Post(url, retaddr, postarr);
    }
}

function Get(url, retaddr) {
    api.ajax({
        url : url,
        method : 'get',
    }, function(ret, err) {
        if (ret) {
            Callback(retaddr, ret);
        }
    });
}

function Post(url, retaddr, postarr) {
    var ds = {
        username : get_userName(),
        token : get_userToken(),
        dhi : new_dhi(),
    };
    var obj = Object.assign(ds, postarr);
    api.ajax({
        url : url,
        method : 'post',
        data : {
            values : obj
        }
    }, function(ret, err) {
        if (ret) {
            Callback(retaddr, ret);
        }
    });
}

function Callback(returl, data) {
    var ds = {
        username : get_userName(),
        token : get_userToken(),
        dhi : new_dhi(),
        data : Enc(data),
    };
    api.ajax({
        url : URL() + returl,
        method : 'post',
        data : {
            values : ds
        }
    }, function(ret, err) {
        if (ret.code == '0') {
            listerninfo(ret.data);
            //          api.alert({
            //              msg : ret.data
            //          });
        } else {
            listerninfo(ret.data);
            //          api.alert({
            //              msg : ret.data
            //          });
        }
    });
}

function GiftCheck(value) {
    var gift = GiftUsed();
    for (var i in gift) {
        if (gift[i] == value) {
            return true
        }
    }
}

function GiftUsed(value) {
    var GiftUsed = $api.getStorage("giftlist");
    if (value) {
        if (GiftUsed) {
            var json = JSON.parse(GiftUsed);
            json.push(value);
            $api.setStorage("giftlist", JSON.stringify(json));
        } else {
            GiftUsed = [value];
            $api.setStorage("giftlist", JSON.stringify(GiftUsed));
        }
    } else {
        if (GiftUsed) {
            return JSON.parse(GiftUsed);
        } else {
            return [];
        }

    }

}

function GiftClear() {
    $api.setStorage("giftlist", null);
}
