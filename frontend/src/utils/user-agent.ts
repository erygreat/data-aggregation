const system = {
    'Windows NT 10.0': 'Win 10',
    'winnt x86_64 10.0': 'Win 10',
    'Windows NT 6.3': 'Win 8.1',
    'Windows NT 6.2': 'Win 8',
    'Windows NT 6.1': 'Win 7',
    'Windows NT 6.0': 'Win Vista',
    'Windows NT 5.1': 'Win XP',
    'Windows NT 5.0': 'Win 2000',
    'Macintosh; Intel Mac OS X': 'MacOSX',
    'Android': 'Android',
    'iPhone': 'iPhone',
    'iPad': 'iPad',
    'Linux': 'Linux',
    'zycounsellor': '辅导客户端',
}
export const getSystem = (userAgent: string): string | null=> {
    for (const key in system) {
        if(userAgent.indexOf(key) > -1) {
            return system[key];
        }
    }
    return null;
}
const getBrowerVersion = function(userAgent: string, brower: string): string | null {
    let reg = RegExp(brower + '([\\d|\.]+)');
    let version = userAgent.match(reg)
    if(!version) {
        return null;
    } else {
        return version.length >= 1 ? version[1] : version[0]; 
    }
}
interface Brower {
    brower: string | null,
    version: string | null,
}
export const getBrower = function (userAgent: string): Brower {
    if (userAgent.indexOf("Edge") > -1) {
        return {
            brower: "Edge(旧版)",
            version: getBrowerVersion(userAgent, "Edge/")
        };
    } else if (userAgent.indexOf("Edg") > -1) {
        return {
            brower: "Edge",
            version: getBrowerVersion(userAgent, "Edg/")
        };
    } else if (userAgent.indexOf("BaiduHD") > -1) {
        return {
            brower: "Baidu Browser HD",
            version: getBrowerVersion(userAgent, "BaiduHD/")
        };
    } else if (userAgent.indexOf("SogouMobileBrowser") > -1) {
        return {
            brower: "搜狗手机浏览器",
            version: getBrowerVersion(userAgent, "SogouMobileBrowser/")
        };
    } else if (userAgent.indexOf("MicroMessenger") > -1) {
        return {
            brower: "微信",
            version: getBrowerVersion(userAgent, "MicroMessenger/")
        };
    } else if (userAgent.indexOf("LBBROWSER") > -1) {
        return {
            brower: "猎豹浏览器",
            version: getBrowerVersion(userAgent, "LBBROWSER/")
        };
    } else if (userAgent.indexOf("zycounsellor") > -1) {
        return {
            brower: "一起学客户端",
            version: getBrowerVersion(userAgent, "zycounsellor/")
        };
    } else if (userAgent.indexOf("17Yunketang iOS") > -1) {
        return {
            brower: "一起云课堂(IOS)",
            version: getBrowerVersion(userAgent, "17Yunketang iOS ")
        };
    } else if (userAgent.indexOf("OPR") > -1) {
        return {
            brower: "Opera",
            version: getBrowerVersion(userAgent, "OPR/")
        };
    } else if (userAgent.indexOf("Version") > -1 && userAgent.indexOf("Safari") > -1) {
        return {
            brower: "Safari",
            version: getBrowerVersion(userAgent, "Version/")
        };
    } else if (userAgent.indexOf("Firefox") > -1) {
        return {
            brower: "Firefox",
            version: getBrowerVersion(userAgent, "Firefox/")
        };
    } else if (userAgent.indexOf("compatible") > -1) {
        return {
            brower: "IE",
            version: getBrowerVersion(userAgent, "MSIE ")
        };
    } else if (userAgent.indexOf("QQBrowser") > -1) {
        return {
            brower: "QQBrowser",
            version: getBrowerVersion(userAgent, "QQBrowser/")
        };
    }else if (userAgent.indexOf("Chrome") > -1) {
        let safariVersion = getBrowerVersion(userAgent, "Safari/");
        let _userAgent = userAgent.replace(" FS", "");
        //谷歌浏览器也有可能是使用Chrome内核的其他浏览器
        if(!safariVersion || safariVersion.length + _userAgent.indexOf("Safari/") + "Safari/".length !== _userAgent.length) {
            return {
                brower: null,
                version: null
            }
        } else {
            return {
                brower: "Chrome",
                version: getBrowerVersion(_userAgent, "Chrome/")
            };
        }
    }
    return {
        brower: null,
        version: null
    };
}
