+++
Categories = ["Notes"]
date = "2016-09-18T14:27:24+08:00"
title = "BiliBili API"

+++

<!--more-->

Updated on 2016-09-18

> GetBilibili

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
         "length":283324,
         "size":72450795,
         "url":"http://cn-cq3-cu.acgvideo.com/vg2/8/a6/8551612-1.flv?expires=1474288500&ssig=GJ9c8OJUz3mZQT3OGT41UQ&oi=3708243307&rate=0",
         "backup_url":[
            "http://cn-tj3-cu.acgvideo.com/vg6/a/9c/8551612-1.flv?expires=1474288500&ssig=ky9JegSFg9MwP-VBWMtBHw&oi=3708243307&rate=0",
            "http://ws.acgvideo.com/0/22/8551612-1.flv?wsTime=1474288705&wsSecret2=4a18abf3b78cbcc277c5c1b814170bc2&oi=3708243307"
         ]
      }
   ]
}
```

## About JSON
* JSON 规范：
  * 数据在键值对中
  * 数据由逗号分隔
  * 花括号保存对象
  * 方括号保存数组
* JSON 值：
  * 字符串（双引号 `" "`）
  * 布尔值
  * 数字
  * 对象（花括号 `{ }`）
  * 数组（方括号 `[ ]`）
  * null
* JSON 有且仅有 2 种结构：对象、数组。