---
Categories:
- Notes
date: 2016-02-27T22:12:44+08:00
title: uBlock Origin Filter
---

<!--more-->

Updated on 2018-03-23

> {{< image "/uploads/ublock.svg" "" "0" "1" >}}
>
> [uBlock Origin](https://github.com/gorhill/uBlock)
>
> uBlock Origin is NOT an "ad blocker": it is a wide-spectrum blocker -- which happens to be able to function as a mere "ad blocker". The default behavior of uBlock Origin when newly installed is to block ads, trackers and malware sites.
>
> 我把我自定义的 uBlock Origin Filter 整理在这里，以便查阅。

```json
{
  "timeStamp": 1521787919293,
  "version": "1.15.18",
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
    "webrtcIPAddressHidden": true
  },
  "selectedFilterLists": [
    "CHN-0",
    "CHN-1",
    "plowe-0",
    "easyprivacy",
    "easylist",
    "user-filters",
    "ublock-unbreak",
    "ublock-abuse",
    "ublock-privacy",
    "ublock-experimental",
    "ublock-badware",
    "ublock-annoyances",
    "ublock-filters"
  ],
  "hiddenSettings": {
    "assetFetchTimeout": 30,
    "autoUpdateAssetFetchPeriod": 120,
    "autoUpdatePeriod": 7,
    "ignoreRedirectFilters": false,
    "ignoreScriptInjectFilters": false,
    "streamScriptInjectFilters": false,
    "manualUpdateAssetFetchPeriod": 2000,
    "popupFontSize": "unset",
    "suspendTabsUntilReady": false,
    "userResourcesLocation": "unset"
  },
  "netWhitelist": "127.0.0.1\n192.168.1.1\nabout-scheme\nbehind-the-scene\nchrome-extension-scheme\nchrome-scheme\nlocalhost\nloopconversation.about-scheme\nmoz-extension-scheme\nopera-scheme\nvivaldi-scheme\nxhstormr.tk",
  "dynamicFilteringString": "* * inline-script block\n* * 1p-script block\n* * 3p-script block\n* * 3p-frame block\n* * image block\n* fonts.googleapis.com * block\n* github.com * noop\n* imgur.com * noop\n* sinaimg.cn * noop\nbilibili.com bilibili.com * noop\nbilibili.com hdslb.com * noop\npan.baidu.com baidupcs.com * noop\npan.baidu.com pan.baidu.com * noop\npan.baidu.com pcsdata.baidu.com * noop\ntranslate.google.cn google.cn * noop\nw.mail.qq.com qq.com * noop\nwww.imooc.com imooc.com * noop\nzhihu.com zhihu.com * noop\nzhihu.com zhimg.com * noop\nduckduckgo.com duckduckgo.com * noop",
  "urlFilteringString": "",
  "hostnameSwitchesString": "no-remote-fonts: * true\nno-csp-reports: * true\nno-remote-fonts: bilibili.com false",
  "userFilters": ""
}
```
