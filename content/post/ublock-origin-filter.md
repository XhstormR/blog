+++
Categories = ["Notes"]
date = "2016-02-27T22:12:44+08:00"
title = "uBlock Origin Filter"

+++

<!--more-->

Updated on 2016-08-26

> {{< image "/uploads/ublock.svg" "" "0" "1" >}}
>
> [uBlock Origin](https://github.com/gorhill/uBlock)
>
> uBlock Origin is NOT an "ad blocker": it is a wide-spectrum blocker -- which happens to be able to function as a mere "ad blocker". The default behavior of uBlock Origin when newly installed is to block ads, trackers and malware sites.
>
> 我把我自定义的 uBlock Origin Filter 整理在这里，以便查阅。

```json
{
  "timeStamp": 1472908628657,
  "version": "1.9.4",
  "userSettings": {
    "advancedUserEnabled": true,
    "autoUpdate": true,
    "cloudStorageEnabled": true,
    "collapseBlocked": true,
    "colorBlindFriendly": false,
    "contextMenuEnabled": false,
    "dynamicFilteringEnabled": true,
    "externalLists": "https://code.csdn.net/i_square/i/blob/master/iFL.txt",
    "firewallPaneMinimized": true,
    "hyperlinkAuditingDisabled": true,
    "ignoreGenericCosmeticFilters": false,
    "largeMediaSize": 50,
    "parseAllABPHideFilters": true,
    "prefetchingDisabled": true,
    "requestLogMaxEntries": 1000,
    "showIconBadge": true,
    "tooltipsDisabled": false,
    "webrtcIPAddressHidden": false
  },
  "filterLists": {
    "assets/thirdparties/easylist-downloads.adblockplus.org/easylist.txt": {
      "entryCount": 66918,
      "entryUsedCount": 66494,
      "group": "ads",
      "homeURL": "https://easylist.to/easylist/easylist.txt",
      "off": false,
      "supportURL": "https://forums.lanik.us/",
      "title": "EasyList"
    },
    "assets/thirdparties/easylist-downloads.adblockplus.org/easyprivacy.txt": {
      "entryCount": 11916,
      "entryUsedCount": 11916,
      "group": "privacy",
      "homeURL": "https://easylist.to/easylist/easyprivacy.txt",
      "off": false,
      "supportURL": "https://forums.lanik.us/",
      "title": "EasyPrivacy"
    },
    "assets/thirdparties/mirror1.malwaredomains.com/files/justdomains": {
      "entryCount": 19217,
      "entryUsedCount": 16476,
      "group": "malware",
      "homeURL": "https://mirror.cedia.org.ec/malwaredomains/justdomains",
      "off": true,
      "supportURL": "http://www.malwaredomains.com/",
      "title": "Malware domains"
    },
    "assets/thirdparties/pgl.yoyo.org/as/serverlist": {
      "entryCount": 2402,
      "entryUsedCount": 2397,
      "group": "ads",
      "homeURL": "https://pgl.yoyo.org/adservers/serverlist.php?hostformat=hosts&showintro=1&mimetype=plaintext",
      "off": true,
      "supportURL": "https://pgl.yoyo.org/adservers/",
      "title": "Peter Lowe’s Ad server list"
    },
    "assets/thirdparties/www.malwaredomainlist.com/hostslist/hosts.txt": {
      "entryCount": 1337,
      "entryUsedCount": 1259,
      "group": "malware",
      "homeURL": "https://www.malwaredomainlist.com/hostslist/hosts.txt",
      "off": true,
      "title": "Malware Domain List"
    },
    "assets/user/filters.txt": {
      "entryCount": 0,
      "entryUsedCount": 0,
      "group": "default",
      "off": false
    },
    "https://code.csdn.net/i_square/i/blob/master/iFL.txt": {
      "entryCount": 214,
      "entryUsedCount": 187,
      "external": true,
      "group": "custom",
      "off": false,
      "title": "iFL"
    },
    "https://easylist-downloads.adblockplus.org/easylistchina.txt": {
      "entryCount": 13080,
      "entryUsedCount": 13069,
      "group": "regions",
      "lang": "zh",
      "off": false,
      "supportURL": "http://abpchina.org/forum/forum.php",
      "title": "CHN: EasyList China (中文)"
    },
    "https://raw.githubusercontent.com/cjx82630/cjxlist/master/cjxlist.txt": {
      "entryCount": 433,
      "entryUsedCount": 433,
      "group": "regions",
      "off": false,
      "supportURL": "https://github.com/cjx82630/cjxlist",
      "title": "CHN: CJX's EasyList Lite (main focus on Chinese sites)"
    }
  },
  "netWhitelist": "192.168.1.1\nabout-scheme\nbehind-the-scene\nchrome-extension-scheme\nchrome-scheme\nlocalhost\nloopconversation.about-scheme\nopera-scheme\nxhstormr.tk",
  "dynamicFilteringString": "* * inline-script block\n* * 1p-script block\n* * 3p-script block\n* * 3p-frame block\n* * image block\n* ajax.googleapis.com * block\n* bootstrapcdn.com * block\n* fonts.googleapis.com * block\n* imgur.com * noop\n* sinaimg.cn * noop\n* zythum.sinaapp.com * noop\nbilibili.com bilibili.com * noop\nbilibili.com hdslb.com * noop\npan.baidu.com baidupcs.com * noop\npan.baidu.com pan.baidu.com * noop\npan.baidu.com pcsdata.baidu.com * noop\npan.baidu.com s1.pan.bdstatic.com * noop\nw.mail.qq.com qq.com * noop\nwww.draw.io draw.io * noop\nwww.imooc.com imooc.com * noop\nwww.v2ex.com * 3p block\nyouku.com ykimg.com * noop\nyouku.com youku.com * noop\nzhihu.com zhihu.com * noop\nzhihu.com zhimg.com * noop",
  "urlFilteringString": "",
  "hostnameSwitchesString": "no-remote-fonts: * true",
  "userFilters": ""
}
```