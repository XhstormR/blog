---
tags:
- Notes
date: 2016-09-18T14:27:24+08:00
title: BiliBili API
---

<!--more-->

Updated on 2016-09-18

> {{< video "/uploads/video/doge.webm" "Doge" "0">}}
>
> [GetBilibili](https://github.com/XhstormR/GetBilibili)
>
> http://www.bilibili.com/video/av5262155/

```html
http://interface.bilibili.com/player?id=cid:8551612
```

```xml
<ip>221.7.77.107</ip>
<zoneid>151404674</zoneid>
<country>中国</country>
<isp>联通</isp>
<login>true</login>
<name>XhstormR [中国]</name>
<user>1824443</user>
<scores>5580</scores>
<money>793</money>
<face>http://i1.hdslb.com/bfs/face/df2cca3b4649ba7057583cd662daba034efd82f2.jpg</face>
<pwd>undefined</pwd>
<isadmin>true</isadmin>
<permission>10000,1001</permission>
<time>1474189543</time>
<rank>10000</rank>
<level>正式会员</level>
<level_info>{"current_level":4,"current_min":4500,"current_exp":7441,"next_exp":10800}</level_info>
<vip>{"vipType":0,"vipDueDate":0,"dueRemark":"","accessStatus":1,"vipStatus":0,"vipStatusWarn":""}</vip>
<official_verify>{"type":-1,"desc":""}</official_verify>
<shot>false</shot>
<suggest_comment>false</suggest_comment>
<maxlimit>1000</maxlimit>
<chatid>8551612</chatid>
<server>chat.bilibili.com</server>
<vtype>vupload</vtype>
<aid>5262155</aid>
<typeid>82</typeid>
<pid>1</pid>
<click>97</click>
<favourites>1</favourites>
<credits>0</credits>
<coins>0</coins>
<fw_click>4</fw_click>
<duration>4:43</duration>
<arctype>Copy</arctype>
<danmu>0</danmu>
<bottom>0</bottom>
<sinapi>1</sinapi>
<acceptguest>true</acceptguest>
<acceptaccel>false</acceptaccel>
```

---

```html
http://interface.bilibili.com/count?key=27f582250563d5d6b11d6833&aid=5262155
```

```javascript
111;$('#dianji').html('97');$('#stow_count').html('1');$('#v_ctimes').html(0);$('.v_ctimes').html(0);$('#dm_count').html(0);$('.dm_count').html(0);
```

---

```html
http://www.bilibili.com/widget/getPageList?aid=4044639
```

```json
[
   {
      "page":1,
      "pagename":"01 \u6df1\u5177\u4f20\u7edf\u7684\u53e4\u5178\u6587\u5b66\u90e8\u4e4b\u91cd\u751f",
      "cid":6525010
   },
   {
      "page":2,
      "pagename":"02 \u503c\u5f97\u5938\u8000\u7684\u53e4\u5178\u6587\u5b66\u90e8\u4e4b\u6d3b\u52a8",
      "cid":6525011
   },
   {
      "page":3,
      "pagename":"03 \u53e6\u6709\u9690\u60c5\u7684\u53e4\u5178\u6587\u5b66\u90e8\u4e4b\u540e\u88d4",
      "cid":6525012
   },
   {
      "page":4,
      "pagename":"04 \u7efd\u653e\u8363\u5149\u7684\u53e4\u5178\u6587\u5b66\u90e8\u4e4b\u8fc7\u5f80",
      "cid":6525013
   },
   {
      "page":5,
      "pagename":"05 \u72ec\u5177\u5386\u53f2\u7684\u53e4\u5178\u6587\u5b66\u90e8\u4e4b\u771f\u76f8",
      "cid":6525014
   },
   {
      "page":6,
      "pagename":"06 \u72af\u4e0b\u5927\u7f6a",
      "cid":6525015
   },
   {
      "page":7,
      "pagename":"07 \u521d\u89c1\u771f\u8eab",
      "cid":6525016
   },
   {
      "page":8,
      "pagename":"08 \u53bb\u53c2\u52a0\u8bd5\u6620\u4f1a\u5427\uff01",
      "cid":6525017
   },
   {
      "page":9,
      "pagename":"09 \u53e4\u4e18\u5e9f\u6751\u6740\u4eba\u4e8b\u4ef6",
      "cid":6525018
   },
   {
      "page":10,
      "pagename":"10 \u4e07\u4eba\u7684\u6b7b\u89d2",
      "cid":6525019
   },
   {
      "page":11,
      "pagename":"11 \u611a\u8005\u7684\u7247\u5c3e",
      "cid":6525020
   },
   {
      "page":12,
      "pagename":"11.5 \u5e94\u6301\u4e4b\u7269",
      "cid":6525021
   },
   {
      "page":13,
      "pagename":"12 \u65e0\u9650\u5806\u79ef\u7684\u300c\u90a3\u4e2a\u300d",
      "cid":6525022
   },
   {
      "page":14,
      "pagename":"13 \u9ec4\u660f\u73b0\u767d\u9aa8",
      "cid":6525023
   },
   {
      "page":15,
      "pagename":"14 \u91ce\u706b",
      "cid":6525024
   },
   {
      "page":16,
      "pagename":"15 \u5341\u6587\u5b57\u4e8b\u4ef6",
      "cid":6525025
   },
   {
      "page":17,
      "pagename":"16 \u6700\u540e\u7684\u76ee\u6807",
      "cid":6525026
   },
   {
      "page":18,
      "pagename":"17 \u5e93\u7279\u5229\u4e9a\u8299\u5361\u7684\u6392\u5e8f",
      "cid":6525027
   },
   {
      "page":19,
      "pagename":"18 \u5cf0\u5ce6\u80fd\u5426\u653e\u6674",
      "cid":6525028
   },
   {
      "page":20,
      "pagename":"19 \u76f8\u5173\u4eba\u5458",
      "cid":6525029
   },
   {
      "page":21,
      "pagename":"20 \u5f00\u95e8\u5feb\u4e50",
      "cid":6525030
   },
   {
      "page":22,
      "pagename":"21 \u624b\u5236\u5de7\u514b\u529b\u4e8b\u4ef6",
      "cid":6525031
   },
   {
      "page":23,
      "pagename":"22 \u7ed5\u8fdc\u7684\u5076\u4eba",
      "cid":6525032
   }
]
```

---

```html
http://www.bilibili.com/m/html5?aid=5262155&page=1
```

```json
{
   "img":"http://i2.hdslb.com/bfs/archive/8aeeb95c288b51c18c17cf0d1bf777b1107fc95b.jpg",
   "cid":"http://comment.bilibili.com/8551612.xml",
   "src":"http://cn-cq1-cu.acgvideo.com/vg1/8/ca/8551612-1.mp4?expires=1474268100&ssig=5hl71UMv4NXLbthQKpIUYw&oi=3708243307&internal=1&rate=0"
}
```

---

```html
http://interface.bilibili.com/playurl?cid=8551612&appkey=6f90a59ac58a4123&otype=json&type=flv&quality=3&sign=6a43d8cd634b31d0f6863509d41ccde0
```

```json
{
   "from":"local",
   "result":"suee",
   "format":"flv",
   "timelength":283324,
   "accept_format":"mp4,hdmp4,flv",
   "accept_quality":[
      3,
      2,
      1
   ],
   "seek_param":"start",
   "seek_type":"offset",
   "durl":[
      {
         "order":1,
         "length":283324,     毫秒
         "size":72450795,     字节
         "url":"http://cn-cq3-cu.acgvideo.com/vg2/8/a6/8551612-1.flv?expires=1474288500&ssig=GJ9c8OJUz3mZQT3OGT41UQ&oi=3708243307&rate=0",
         "backup_url":[
            "http://cn-tj3-cu.acgvideo.com/vg6/a/9c/8551612-1.flv?expires=1474288500&ssig=ky9JegSFg9MwP-VBWMtBHw&oi=3708243307&rate=0",
            "http://ws.acgvideo.com/0/22/8551612-1.flv?wsTime=1474288705&wsSecret2=4a18abf3b78cbcc277c5c1b814170bc2&oi=3708243307"
         ]
      }
   ]
}
```

---

## 123.bat
```bash
node 123.js > 123.txt
aria2c.exe  --input-file=123.txt  --disk-cache=32M  --enable-mmap=true  --max-mmap-limit=2048M  --continue=true  --max-concurrent-downloads=1  --max-connection-per-server=16  --min-split-size=10M  --split=20  --http-no-cache=true  --user-agent=Windows  --referer=https://www.bilibili.com/ --dir=123
busybox find 123 -type f | busybox xargs -I {} echo -i {} | busybox xargs D:\Download\ffmpeg.exe -c copy 123.mp4 -y
```

## 123.js
```javascript
var window = {}
var json = window.__playinfo__ = {"code":0,"ttl":1,"message":"0","data":{"accept_format":"hdflv2,flv,flv720,flv480,flv360","code":0,"seek_param":"start","is_preview":0,"fnval":16,"video_project":true,"fnver":0,"type":"DASH","bp":0,"result":"suee","seek_type":"offset","vip_type":1,"from":"local","video_codecid":7,"no_rexcode":1,"format":"hdflv2","message":"","accept_quality":[112,80,64,32,16],"quality":112,"timelength":6033130,"has_paid":true,"vip_status":1,"dash":{"duration":6034,"minBufferTime":1.5,"min_buffer_time":1.5,"video":[{"start_with_sap":1,"bandwidth":4004119,"sar":"1:1","backupUrl":["https://upos-hz-mirrorks3u.acgvideo.com/upgcxcode/51/73/48137351/48137351_da4-1-30112.m4s?e=ig8euxZM2rNcNbdlhoNvNC8BqJIzNbfqXBvEqxTEto8BTrNvN0GvT90W5JZMkX_YN0MvXg8gNEV4NC8xNEV4N03eN0B5tZlqNxTEto8BTrNvNeZVuJ10Kj_g2UB02J0mN0B5tZlqNCNEto8BTrNvNC7MTX502C8f2jmMQJ6mqF2fka1mqx6gqj0eN0B599M=&uipk=5&nbs=1&deadline=1575823389&gen=playurl&os=ks3u&oi=2085520452&trid=04f28450a4fd4b70b54e71584da39569p&platform=pc&upsig=980130f332833267d442e6bbc9d82338&uparams=e,uipk,nbs,deadline,gen,os,oi,trid,platform&mid=133948365"],"codecs":"avc1.640028","base_url":"https://upos-hz-mirrorcosu.acgvideo.com/upgcxcode/51/73/48137351/48137351_da4-1-30112.m4s?e=ig8euxZM2rNcNbdlhoNvNC8BqJIzNbfqXBvEqxTEto8BTrNvN0GvT90W5JZMkX_YN0MvXg8gNEV4NC8xNEV4N03eN0B5tZlqNxTEto8BTrNvNeZVuJ10Kj_g2UB02J0mN0B5tZlqNCNEto8BTrNvNC7MTX502C8f2jmMQJ6mqF2fka1mqx6gqj0eN0B599M=&uipk=5&nbs=1&deadline=1575823389&gen=playurl&os=cosu&oi=2085520452&trid=04f28450a4fd4b70b54e71584da39569p&platform=pc&upsig=77b3ca211b9b7bee63fb2b2537ae5db6&uparams=e,uipk,nbs,deadline,gen,os,oi,trid,platform&mid=133948365","backup_url":["https://upos-hz-mirrorks3u.acgvideo.com/upgcxcode/51/73/48137351/48137351_da4-1-30112.m4s?e=ig8euxZM2rNcNbdlhoNvNC8BqJIzNbfqXBvEqxTEto8BTrNvN0GvT90W5JZMkX_YN0MvXg8gNEV4NC8xNEV4N03eN0B5tZlqNxTEto8BTrNvNeZVuJ10Kj_g2UB02J0mN0B5tZlqNCNEto8BTrNvNC7MTX502C8f2jmMQJ6mqF2fka1mqx6gqj0eN0B599M=&uipk=5&nbs=1&deadline=1575823389&gen=playurl&os=ks3u&oi=2085520452&trid=04f28450a4fd4b70b54e71584da39569p&platform=pc&upsig=980130f332833267d442e6bbc9d82338&uparams=e,uipk,nbs,deadline,gen,os,oi,trid,platform&mid=133948365"],"segment_base":{"initialization":"0-973","index_range":"974-9765"},"mimeType":"video/mp4","frame_rate":"16000/672","SegmentBase":{"Initialization":"0-973","indexRange":"974-9765"},"frameRate":"16000/672","codecid":7,"baseUrl":"https://upos-hz-mirrorcosu.acgvideo.com/upgcxcode/51/73/48137351/48137351_da4-1-30112.m4s?e=ig8euxZM2rNcNbdlhoNvNC8BqJIzNbfqXBvEqxTEto8BTrNvN0GvT90W5JZMkX_YN0MvXg8gNEV4NC8xNEV4N03eN0B5tZlqNxTEto8BTrNvNeZVuJ10Kj_g2UB02J0mN0B5tZlqNCNEto8BTrNvNC7MTX502C8f2jmMQJ6mqF2fka1mqx6gqj0eN0B599M=&uipk=5&nbs=1&deadline=1575823389&gen=playurl&os=cosu&oi=2085520452&trid=04f28450a4fd4b70b54e71584da39569p&platform=pc&upsig=77b3ca211b9b7bee63fb2b2537ae5db6&uparams=e,uipk,nbs,deadline,gen,os,oi,trid,platform&mid=133948365","size":0,"mime_type":"video/mp4","width":1920,"startWithSAP":1,"id":112,"height":1040,"md5":""}],"audio":[{"start_with_sap":0,"bandwidth":193670,"sar":"","backupUrl":["https://upos-hz-mirrorks3u.acgvideo.com/upgcxcode/51/73/48137351/48137351_da4-1-30280.m4s?e=ig8euxZM2rNcNbdlhoNvNC8BqJIzNbfqXBvEqxTEto8BTrNvN0GvT90W5JZMkX_YN0MvXg8gNEV4NC8xNEV4N03eN0B5tZlqNxTEto8BTrNvNeZVuJ10Kj_g2UB02J0mN0B5tZlqNCNEto8BTrNvNC7MTX502C8f2jmMQJ6mqF2fka1mqx6gqj0eN0B599M=&uipk=5&nbs=1&deadline=1575823389&gen=playurl&os=ks3u&oi=2085520452&trid=04f28450a4fd4b70b54e71584da39569p&platform=pc&upsig=10daf7329479560272000492dd7d7eaa&uparams=e,uipk,nbs,deadline,gen,os,oi,trid,platform&mid=133948365"],"codecs":"mp4a.40.2","base_url":"https://upos-hz-mirrorhw.acgvideo.com/upgcxcode/51/73/48137351/48137351_da4-1-30280.m4s?e=ig8euxZM2rNcNbdlhoNvNC8BqJIzNbfqXBvEqxTEto8BTrNvN0GvT90W5JZMkX_YN0MvXg8gNEV4NC8xNEV4N03eN0B5tZlqNxTEto8BTrNvNeZVuJ10Kj_g2UB02J0mN0B5tZlqNCNEto8BTrNvNC7MTX502C8f2jmMQJ6mqF2fka1mqx6gqj0eN0B599M=&uipk=5&nbs=1&deadline=1575823389&gen=playurl&os=hw&oi=2085520452&trid=04f28450a4fd4b70b54e71584da39569p&platform=pc&upsig=20728ef4ab0fb7b33203b554ede9dcb5&uparams=e,uipk,nbs,deadline,gen,os,oi,trid,platform&mid=133948365","backup_url":["https://upos-hz-mirrorks3u.acgvideo.com/upgcxcode/51/73/48137351/48137351_da4-1-30280.m4s?e=ig8euxZM2rNcNbdlhoNvNC8BqJIzNbfqXBvEqxTEto8BTrNvN0GvT90W5JZMkX_YN0MvXg8gNEV4NC8xNEV4N03eN0B5tZlqNxTEto8BTrNvNeZVuJ10Kj_g2UB02J0mN0B5tZlqNCNEto8BTrNvNC7MTX502C8f2jmMQJ6mqF2fka1mqx6gqj0eN0B599M=&uipk=5&nbs=1&deadline=1575823389&gen=playurl&os=ks3u&oi=2085520452&trid=04f28450a4fd4b70b54e71584da39569p&platform=pc&upsig=10daf7329479560272000492dd7d7eaa&uparams=e,uipk,nbs,deadline,gen,os,oi,trid,platform&mid=133948365"],"segment_base":{"initialization":"0-907","index_range":"908-15423"},"mimeType":"audio/mp4","frame_rate":"","SegmentBase":{"Initialization":"0-907","indexRange":"908-15423"},"frameRate":"","codecid":0,"baseUrl":"https://upos-hz-mirrorhw.acgvideo.com/upgcxcode/51/73/48137351/48137351_da4-1-30280.m4s?e=ig8euxZM2rNcNbdlhoNvNC8BqJIzNbfqXBvEqxTEto8BTrNvN0GvT90W5JZMkX_YN0MvXg8gNEV4NC8xNEV4N03eN0B5tZlqNxTEto8BTrNvNeZVuJ10Kj_g2UB02J0mN0B5tZlqNCNEto8BTrNvNC7MTX502C8f2jmMQJ6mqF2fka1mqx6gqj0eN0B599M=&uipk=5&nbs=1&deadline=1575823389&gen=playurl&os=hw&oi=2085520452&trid=04f28450a4fd4b70b54e71584da39569p&platform=pc&upsig=20728ef4ab0fb7b33203b554ede9dcb5&uparams=e,uipk,nbs,deadline,gen,os,oi,trid,platform&mid=133948365","size":0,"mime_type":"audio/mp4","width":0,"startWithSAP":0,"id":30280,"height":0,"md5":""},{"start_with_sap":0,"bandwidth":67205,"sar":"","backupUrl":["https://upos-hz-mirrorks3u.acgvideo.com/upgcxcode/51/73/48137351/48137351_da4-1-30216.m4s?e=ig8euxZM2rNcNbdlhoNvNC8BqJIzNbfqXBvEqxTEto8BTrNvN0GvT90W5JZMkX_YN0MvXg8gNEV4NC8xNEV4N03eN0B5tZlqNxTEto8BTrNvNeZVuJ10Kj_g2UB02J0mN0B5tZlqNCNEto8BTrNvNC7MTX502C8f2jmMQJ6mqF2fka1mqx6gqj0eN0B599M=&uipk=5&nbs=1&deadline=1575823389&gen=playurl&os=ks3u&oi=2085520452&trid=04f28450a4fd4b70b54e71584da39569p&platform=pc&upsig=efc6b85b33d839d5cc9df3a2a7a1120f&uparams=e,uipk,nbs,deadline,gen,os,oi,trid,platform&mid=133948365"],"codecs":"mp4a.40.2","base_url":"https://upos-hz-mirrorks3u.acgvideo.com/upgcxcode/51/73/48137351/48137351_da4-1-30216.m4s?e=ig8euxZM2rNcNbdlhoNvNC8BqJIzNbfqXBvEqxTEto8BTrNvN0GvT90W5JZMkX_YN0MvXg8gNEV4NC8xNEV4N03eN0B5tZlqNxTEto8BTrNvNeZVuJ10Kj_g2UB02J0mN0B5tZlqNCNEto8BTrNvNC7MTX502C8f2jmMQJ6mqF2fka1mqx6gqj0eN0B599M=&uipk=5&nbs=1&deadline=1575823389&gen=playurl&os=ks3u&oi=2085520452&trid=04f28450a4fd4b70b54e71584da39569p&platform=pc&upsig=efc6b85b33d839d5cc9df3a2a7a1120f&uparams=e,uipk,nbs,deadline,gen,os,oi,trid,platform&mid=133948365","backup_url":["https://upos-hz-mirrorks3u.acgvideo.com/upgcxcode/51/73/48137351/48137351_da4-1-30216.m4s?e=ig8euxZM2rNcNbdlhoNvNC8BqJIzNbfqXBvEqxTEto8BTrNvN0GvT90W5JZMkX_YN0MvXg8gNEV4NC8xNEV4N03eN0B5tZlqNxTEto8BTrNvNeZVuJ10Kj_g2UB02J0mN0B5tZlqNCNEto8BTrNvNC7MTX502C8f2jmMQJ6mqF2fka1mqx6gqj0eN0B599M=&uipk=5&nbs=1&deadline=1575823389&gen=playurl&os=ks3u&oi=2085520452&trid=04f28450a4fd4b70b54e71584da39569p&platform=pc&upsig=efc6b85b33d839d5cc9df3a2a7a1120f&uparams=e,uipk,nbs,deadline,gen,os,oi,trid,platform&mid=133948365"],"segment_base":{"initialization":"0-907","index_range":"908-15423"},"mimeType":"audio/mp4","frame_rate":"","SegmentBase":{"Initialization":"0-907","indexRange":"908-15423"},"frameRate":"","codecid":0,"baseUrl":"https://upos-hz-mirrorks3u.acgvideo.com/upgcxcode/51/73/48137351/48137351_da4-1-30216.m4s?e=ig8euxZM2rNcNbdlhoNvNC8BqJIzNbfqXBvEqxTEto8BTrNvN0GvT90W5JZMkX_YN0MvXg8gNEV4NC8xNEV4N03eN0B5tZlqNxTEto8BTrNvNeZVuJ10Kj_g2UB02J0mN0B5tZlqNCNEto8BTrNvNC7MTX502C8f2jmMQJ6mqF2fka1mqx6gqj0eN0B599M=&uipk=5&nbs=1&deadline=1575823389&gen=playurl&os=ks3u&oi=2085520452&trid=04f28450a4fd4b70b54e71584da39569p&platform=pc&upsig=efc6b85b33d839d5cc9df3a2a7a1120f&uparams=e,uipk,nbs,deadline,gen,os,oi,trid,platform&mid=133948365","size":0,"mime_type":"audio/mp4","width":0,"startWithSAP":0,"id":30216,"height":0,"md5":""}]},"accept_description":["高清 1080P+","高清 1080P","高清 720P","清晰 480P","流畅 360P"],"status":13},"session":"22707ade90b657dc027943d215e70d27"}
console.log(json.data.dash.audio[0].base_url)
console.log(json.data.dash.video[0].base_url)
```
