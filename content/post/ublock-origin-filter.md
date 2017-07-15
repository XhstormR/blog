---
Categories:
- Notes
date: 2016-02-27T22:12:44+08:00
title: uBlock Origin Filter
---

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
  "timeStamp": 1500085225973,
  "version": "1.13.2",
  "userSettings": {
    "advancedUserEnabled": true,
    "alwaysDetachLogger": false,
    "autoUpdate": true,
    "cloudStorageEnabled": true,
    "collapseBlocked": true,
    "colorBlindFriendly": false,
    "contextMenuEnabled": true,
    "dynamicFilteringEnabled": true,
    "externalLists": "",
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
  "selectedFilterLists": [
    "CHN-0",
    "CHN-1",
    "CHN-2",
    "plowe-0",
    "malware-1",
    "malware-0",
    "easyprivacy",
    "easylist",
    "ublock-unbreak",
    "ublock-privacy",
    "ublock-experimental",
    "ublock-badware",
    "ublock-filters",
    "user-filters"
  ],
  "hiddenSettingsString": "assetFetchTimeout 30\nautoUpdateAssetFetchPeriod 120\nautoUpdatePeriod 7\nignoreRedirectFilters false\nignoreScriptInjectFilters false\nmanualUpdateAssetFetchPeriod 2000\npopupFontSize unset\nsuspendTabsUntilReady false\nuserResourcesLocation unset",
  "netWhitelist": "127.0.0.1\n192.168.1.1\nabout-scheme\nbehind-the-scene\nchrome-extension-scheme\nchrome-scheme\nlocalhost\nloopconversation.about-scheme\nmoz-extension-scheme\nopera-scheme\nvivaldi-scheme\nxhstormr.tk",
  "dynamicFilteringString": "* * inline-script block\n* * 1p-script block\n* * 3p-script block\n* * 3p-frame block\n* * image block\n* ajax.googleapis.com * block\n* bootstrapcdn.com * block\n* duckduckgo.com * noop\n* fonts.googleapis.com * block\n* github.com * noop\n* imgur.com * noop\n* sinaimg.cn * noop\nbilibili.com bilibili.com * noop\nbilibili.com hdslb.com * noop\npan.baidu.com baidupcs.com * noop\npan.baidu.com pan.baidu.com * noop\npan.baidu.com pcsdata.baidu.com * noop\npan.baidu.com s1.pan.bdstatic.com * noop\ntranslate.google.cn google.cn * noop\nw.mail.qq.com qq.com * noop\nwww.draw.io draw.io * noop\nwww.imooc.com imooc.com * noop\nwww.v2ex.com * 3p block\nyouku.com ykimg.com * noop\nyouku.com youku.com * noop\nzhihu.com zhihu.com * noop\nzhihu.com zhimg.com * noop",
  "urlFilteringString": "",
  "hostnameSwitchesString": "no-remote-fonts: * true",
  "userFilters": "",
  "filterLists": {
    "https://easylist-downloads.adblockplus.org/easylistchina.txt": {
      "off": false
    },
    "https://raw.githubusercontent.com/cjx82630/cjxlist/master/cjxlist.txt": {
      "off": false
    },
    "https://raw.githubusercontent.com/cjx82630/cjxlist/master/cjx-annoyance.txt": {
      "off": false
    },
    "assets/thirdparties/pgl.yoyo.org/as/serverlist": {
      "off": false
    },
    "assets/thirdparties/mirror1.malwaredomains.com/files/justdomains": {
      "off": false
    },
    "assets/thirdparties/www.malwaredomainlist.com/hostslist/hosts.txt": {
      "off": false
    },
    "assets/thirdparties/easylist-downloads.adblockplus.org/easyprivacy.txt": {
      "off": false
    },
    "assets/thirdparties/easylist-downloads.adblockplus.org/easylist.txt": {
      "off": false
    },
    "assets/ublock/unbreak.txt": {
      "off": false
    },
    "assets/ublock/privacy.txt": {
      "off": false
    },
    "assets/ublock/experimental.txt": {
      "off": false
    },
    "assets/ublock/badware.txt": {
      "off": false
    },
    "assets/ublock/filters.txt": {
      "off": false
    },
    "assets/user/filters.txt": {
      "off": false
    }
  }
}
```