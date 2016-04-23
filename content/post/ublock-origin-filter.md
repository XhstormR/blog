+++
Categories = ["Notes"]
date = "2016-02-27T22:12:44+08:00"
title = "uBlock Origin Filter"

+++

<!--more-->

Updated on April 21, 2016

> ![](/uploads/ublock.svg)
>
> [uBlock Origin](https://github.com/gorhill/uBlock)
>
> uBlock Origin is NOT an "ad blocker": it is a wide-spectrum blocker -- which happens to be able to function as a mere "ad blocker". The default behavior of uBlock Origin when newly installed is to block ads, trackers and malware sites.
>
> 我把我自定义的 uBlock Origin Filter 整理在这里，以便查阅。

```
{
  "timeStamp": 1456584751630,
  "version": "1.6.2",
  "userSettings": {
    "advancedUserEnabled": true,
    "autoUpdate": true,
    "cloudStorageEnabled": true,
    "collapseBlocked": true,
    "colorBlindFriendly": false,
    "contextMenuEnabled": false,
    "dynamicFilteringEnabled": true,
    "experimentalEnabled": false,
    "externalLists": "https://code.csdn.net/i_square/i/blob/master/iFL.txt",
    "firewallPaneMinimized": true,
    "hyperlinkAuditingDisabled": true,
    "largeMediaSize": 50,
    "parseAllABPHideFilters": true,
    "prefetchingDisabled": true,
    "requestLogMaxEntries": 1000,
    "showIconBadge": true,
    "tooltipsDisabled": false,
    "webrtcIPAddressHidden": false
  },
  "filterLists": {
    "assets/user/filters.txt": {
      "group": "default",
      "off": false,
      "entryCount": 0,
      "entryUsedCount": 0
    },
    "https://code.csdn.net/i_square/i/blob/master/iFL.txt": {
      "title": "iFL",
      "group": "custom",
      "external": true,
      "off": false,
      "entryCount": 214,
      "entryUsedCount": 187
    },
    "assets/thirdparties/easylist-downloads.adblockplus.org/easylist.txt": {
      "title": "EasyList",
      "group": "ads",
      "homeURL": "https://easylist-downloads.adblockplus.org/easylist.txt",
      "supportURL": "https://forums.lanik.us/",
      "off": false,
      "entryCount": 61832,
      "entryUsedCount": 61429
    },
    "https://easylist-downloads.adblockplus.org/easylistchina.txt": {
      "off": false,
      "title": "CHN: EasyList China (中文)",
      "group": "regions",
      "lang": "zh",
      "supportURL": "http://abpchina.org/forum/forum.php",
      "entryCount": 12230,
      "entryUsedCount": 12218
    },
    "https://raw.githubusercontent.com/cjx82630/cjxlist/master/cjxlist.txt": {
      "off": false,
      "title": "CHN: CJX's EasyList Lite (main focus on Chinese sites)",
      "group": "regions",
      "supportURL": "https://github.com/cjx82630/cjxlist",
      "entryCount": 404,
      "entryUsedCount": 403
    },
    "assets/thirdparties/easylist-downloads.adblockplus.org/easyprivacy.txt": {
      "title": "EasyPrivacy",
      "group": "privacy",
      "homeURL": "https://easylist-downloads.adblockplus.org/easyprivacy.txt",
      "supportURL": "https://forums.lanik.us/",
      "off": false,
      "entryCount": 11093,
      "entryUsedCount": 11093
    },
    "assets/thirdparties/mirror1.malwaredomains.com/files/justdomains": {
      "title": "Malware domains",
      "group": "malware",
      "homeURL": "https://mirror.cedia.org.ec/malwaredomains/justdomains",
      "supportURL": "http://www.malwaredomains.com/",
      "off": true,
      "entryCount": 19217,
      "entryUsedCount": 16476
    },
    "assets/thirdparties/pgl.yoyo.org/as/serverlist": {
      "title": "Peter Lowe’s Ad server list",
      "group": "ads",
      "homeURL": "https://pgl.yoyo.org/adservers/serverlist.php?hostformat=hosts&showintro=1&mimetype=plaintext",
      "supportURL": "https://pgl.yoyo.org/adservers/",
      "off": true,
      "entryCount": 2402,
      "entryUsedCount": 2397
    },
    "assets/thirdparties/www.malwaredomainlist.com/hostslist/hosts.txt": {
      "title": "Malware Domain List",
      "group": "malware",
      "homeURL": "https://www.malwaredomainlist.com/hostslist/hosts.txt",
      "off": true,
      "entryCount": 1337,
      "entryUsedCount": 1259
    }
  },
  "netWhitelist": "192.168.1.1\nabout-scheme\nbehind-the-scene\nchrome-extension-scheme\nchrome-scheme\nloopconversation.about-scheme\nopera-scheme",
  "dynamicFilteringString": "* * inline-script block\n* * 1p-script block\n* * 3p-script block\n* * 3p-frame block\n* * image block\n* ajax.googleapis.com * block\n* bilibili.com * noop\n* bootstrapcdn.com * block\n* fonts.googleapis.com * block\n* hdslb.com * noop\n* microsofttranslator.com * noop\n* zythum.sinaapp.com * noop\npan.baidu.com pan.baidu.com * noop\npan.baidu.com s1.pan.bdstatic.com * noop\nw.mail.qq.com qq.com * noop\nwww.bing.com * inline-script noop\nwww.bing.com * 1p-script noop\nwww.v2ex.com * 3p block\nwww.zhihu.com * inline-script noop\nwww.zhihu.com * 1p-script noop\nyouku.com * inline-script noop\nyouku.com * 1p-script noop\nyunpan.cn qhimg.com * noop\nyunpan.cn yunpan.cn * noop",
  "urlFilteringString": "",
  "hostnameSwitchesString": "no-cosmetic-filtering: www.zdfans.com true\nno-remote-fonts: * true",
  "userFilters": ""
}
```