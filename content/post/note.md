+++
categories = ["Notes"]
date = "2016-02-08T21:08:50+08:00"
title = "Note"

+++

<!--more-->

>

## 特殊符号
```java
特殊符号：
·⊙①?◎Θ⊙●○¤㊣㈱＠の■□★☆◆◇◣◢◤◥▲△▼▽⊿◢▂▃▄▅▆▇█▉▊▋▌▍▎▏■□〓≡↑↓→←↘↙♀♂┇┅‖$@* amp;#※卍卐∞Ψ§∮№⌒＊？？？？？？？？？？？？◆◇？◎●？？☉？？？？？？？？？？？？？？？？？？？？？？

标点符号：
．。，、；：？！ˉˇ¨`~々～‖∶＂＇｀｜·…—～-〃‘’“”〝〞〔〕〈〉《》「」『』〖〗【】（）［］｛｝︻︼﹄﹃

数学符号：
＋－×÷﹢﹣±／＝∥∠≌∽≦≧≒﹤﹥≈≡≠＝≤≥＜＞≮≯∷∶∫∮∝∞∧∨∑∏∪∩∈∵∴⊥∥∠⌒⊙√∟⊿㏒㏑％‰

单位符号：
㎎㎏㎜㎝㎞㎡㏄㏎㏑㏒㏕℡％‰℃℉°′″＄￡￥￠♂♀℅

数字序号：
①②③④⑤⑥⑦⑧⑨⑩㈠㈡㈢㈣㈤㈥㈦㈧㈨㈩№⑴⑵⑶⑷⑸⑹⑺⑻⑼⑽⑾⑿⒀⒁⒂⒃⒄⒅⒆⒇⒈⒉⒊⒋⒌⒍⒎⒏⒐⒑⒒⒓⒔⒕⒖⒗⒘⒙⒚⒛ⅠⅡⅢⅣⅤⅥⅦⅧⅨⅩⅪⅫⅰⅱⅲⅳⅴⅵⅶⅷⅸⅹ

希腊字母：
ΑΒΓΔΕΖΗΘΙΚΛΜΝΞΟΠΡΣΤΥΦΧΨΩαβγδεζνξοπρσηθικλμτυφχψω
```

## DOTA2
```java
启动：
-novid -console -high

控制台：
net_graph 1
dota_disable_range_finder 0
```

## 纯 UEFI 模式下转换 GPT 格式
```java
1. BIOS 设置中启动项关闭兼容模式
2. 插入 Win8 启动盘后，出现第一个"下一步"，按shift+f10调出命令对话框
3. 输入 diskpart
4. 输入 select  disk 0
5. 输入 clean
6. 输入 convert gpt

到这里就可以关闭命令对话框，按下一步进行正常的分区设置了，系统会自动分出三个区用于UEFI的启动。
```

## GPU & CPU 天梯表
```bash
http://malu.me/gpu/
http://malu.me/cpu/
```

## DNS
```bash
OpenDNS：
208.67.222.222
208.67.220.220
```

## Chrome CSS
```css
a{text-decoration:none !important}
a:hover { text-decoration: underline !important;}
*:not([class*="icon"]):not(i){font-family: "Microsoft YaHei","Symbol" !important;}
```

## IDM
```java
127.0.0.1 registeridm.com
127.0.0.1 www.registeridm.com
127.0.0.1 www.internetdownloadmanager.com

R2C1T-O0KQO-JAVU2-4MMYP
```

## 磁盘分区空间量设置
```java
100 G：
100 * 1024 + 615 = 103015
```

## 提取支付宝安全登录控件
```java
解压 aliedit.exe，找到以下 6 个文件：Alidcp.dll、aliedit.dll、npalidcp.dll、npaliedit.dll、npAlipaydhc.dll、npAliSecCtrl.dll。

IE内核浏览器：
需要这 4 个文件：Alidcp.dll、aliedit.dll、npAlipaydhc.dll、npAliSecCtrl.dll，64 位系统放置于 C:\WINDOWS\syswow64\aliedit 下。
以管理员身份运行如下命令：
regsvr32 C:\WINDOWS\syswow64\aliedit\alidcp.dll
regsvr32 C:\WINDOWS\syswow64\aliedit\aliedit.dll
regsvr32 C:\WINDOWS\syswow64\aliedit\npAlipaydhc.dll
regsvr32 C:\WINDOWS\syswow64\aliedit\npAliSecCtrl.dll

非IE内核浏览器：
需要这 3 个文件：npalidcp.dll、npaliedit.dll、npAliSecCtrl.dll，将这 3 个文件拷贝到浏览器的 Plugins 目录下即可。
```

## Git-GUI
```java
"D:\Download\PortableGit-MSysGit\bin\wish.exe D:/Download/PortableGit-MSysGit/libexec/git-core/git-gui"
```

## Clevo mirror
```bash
BIOS：
http://repo.palkeo.com/clevo-mirror/

DRIVERS：
http://www.sagernotebook.com/drivers.php?cat=580
```

## VPN
```bash
http://www.ipmana.com
http://vpn.wwdhz.com
https://code.google.com/p/goagent
https://wk.dxtl.net/dokuwiki/doku.php/start
https://www.imfreevpn.com/
```

## 在线输入法（书签）
```bash
javascript:void(document.body.appendChild(document.createElement('script')).src='https://www.baidu.com/olime/bdime_open.js')
```

## 无界
```bash
无界：
http://ultrasurf.us/index.html

自由：
http://dongtaiwang.com/loc/download.en.php

汇总：
http://forums.internetfreedom.org/index.php?wap2

Psiphon：
https://psiphon.ca
https://www.psiphon3.com

lantern：
https://getlantern.org
```

## Firefox
```bash
https://ftp.mozilla.org/pub/firefox/
https://download-origin.cdn.mozilla.net/pub/firefox/
https://download-installer.cdn.mozilla.net/pub/firefox/
```

## Hosts
```bash
64.233.189.121 feeds.feedburner.com
64.233.189.121 www.repacks.org
64.233.189.121 www.draw.io
54.231.66.16 s3.amazonaws.com
209.99.20.16 dl.dumptruck.goldenfrog.com
```

## Pandoc
```bash
将 Markdown 转化成 HTML：
pandoc test.md -o test.html

使用指定 CSS：
pandoc -c test.css test.md -o test.html

生成独立 HTML：
pandoc --self-contained -c test.css test.md -o test.html
```

## Server（Win）
```bash
Apache：
https://www.apachehaus.com/cgi-bin/download.plx

Nginx：
http://nginx.org/en/download.html

Caddy：
https://github.com/mholt/caddy/releases/latest

Serv-U：
http://www.serv-u.com/releasenotes
http://downloads.solarwinds.com/solarwinds/Release/SU/15.1.4/SU-FTP-Server-Windows-v15.1.4.zip
```

## Nginx 开启目录索引
```
http or server 段中加入：

autoindex on;
autoindex_localtime on;
autoindex_exact_size off;
access_log off;     #关闭访问日志

nginx.exe -s reload
nginx.exe -s quit
```

## 善用佳软
```bash
游览器：Chrome
播放器：MPC-BE
下载器：Aria2
清系统：CCleaner
解压缩：7-Zip
看图片：IrfanView
输入法：华宇拼音输入法
```

## Aria2 Curl Wget 代理下载
```html
Curl：
https://curl.haxx.se/download.html#Win64
curl -x 10.34.3.71:808 www.baidu.com

Wget：
https://eternallybored.org/misc/wget/
wget -e "http_proxy=10.34.3.71:808" www.baidu.com

Aria2：
https://github.com/aria2/aria2/releases/latest
aria2c --all-proxy="10.34.3.71:808" --max-connection-per-server=10 --min-split-size=5M http://www.baidu.com/

https://www.gnu.org/software/wget/manual/wget.html
```

## Search
```bash
https://www.baidu.com/s?wd=123&tn=baidulocal
https://www.google.com/search?newwindow=1&q=123
```

## Xshell & Xftp
```bash
https://www.netsarang.com/download/down_live.html?productcode=2
https://www.netsarang.com/download/down_live.html?productcode=3
```

## Video Download
```html
youtube-dl：（FFmpeg 自动合并）
https://yt-dl.org/downloads/latest/
youtube-dl.exe -F URL
youtube-dl.exe -f 137+140 --proxy socks5://127.0.0.1:1080 URL

you-get：
https://github.com/soimort/you-get/releases/latest

Bilibili：
http://www.bilibilijj.com/DownLoad/Cid/10143543

Andy's FLV Joiner：（FLV 合并）
http://www.videohelp.com/download/FLVJoin0.6.zip

yamdi：（FLV 关键帧）
https://sourceforge.net/projects/yamdi/files/
yamdi -i src.flv -o dst.flv

XML to ASS：（弹幕转字幕）
https://tiansh.github.io/us-danmaku/bilibili/
https://danmu2ass.codeplex.com/releases
```

## Chrome User Agent
```bash
iPhone：
--User-Agent="Mozilla/5.0 (iPhone; CPU iPhone OS 7_0 like Mac OS X; en-us) AppleWebKit/537.51.1 (KHTML, like Gecko) Version/7.0 Mobile/11A465 Safari/9537.53"

Android：
--User-Agent="Mozilla/5.0 (Linux; Android 5.1.1; Nexus 6 Build/LYZ28E) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/44.0.2403.20 Mobile Safari/537.36"

Windows：
--User-Agent="Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/53.0.2785.143 Safari/537.36 Linux Nexus"
```

## Google Hosts
```html
https://ipv6.google.com/ncr
http://serve.netsh.org/pub/ipv4-hosts/
https://raw.githubusercontent.com/racaljk/hosts/master/hosts

EXE：
https://api.shuax.com/tools/getchrome
https://repo.fdzh.org/chrome/exe/
-
https://commondatastorage.googleapis.com/chromium-browser-continuous/Win_x64/LAST_CHANGE
https://commondatastorage.googleapis.com/chromium-browser-continuous/index.html?prefix=Win_x64/356774/
http://gsdview.appspot.com/chromium-browser-continuous/Win_x64/356774/

CRX：
http://crx.2333.me/
http://yurl.sinaapp.com/crx.php
http://chrome-extension-downloader.com/

APK：
https://apps.evozi.com/apk-downloader/
http://m.apkpure.com/
http://apkleecher.com/
http://www.apk4fun.com/
```

## SQLite
```bash
sqlite3.exe 123.db ".mode column" ".header on" "select * from user;" > 1.txt

https://www.sqlite.org/index.html
```

## Wget 递归下载
```bash
wget -m -k -E -np -c -N --no-if-modified-since -p -P ./123 https://java.sx/java/index.html
```

## Operating System（Mirrors）
```bash
MSDN：
http://msdn.itellyou.cn/

CentOS：
https://www.centos.org/download/
https://mirrors.cqu.edu.cn/webin/simple.php
https://mirrors.tuna.tsinghua.edu.cn/
https://mirrors.ustc.edu.cn/
http://mirrors.hust.edu.cn/
http://mirror.bit.edu.cn/web/
http://mirrors.163.com/
http://mirrors.aliyun.com/
http://mirrors.yun-idc.com/

RHEL：
https://access.redhat.com/products/red-hat-enterprise-linux/

https://npm.taobao.org/mirrors
http://mirrors.cnnic.cn/
```

## FFmpeg m3u8
```bash
ffmpeg.exe -i http://example.com/1.m3u8 -c copy 123.mkv
ffplay.exe "http://example.com/1.m3u8"

https://ffmpeg.zeranoe.com/builds/
https://sourceforge.net/projects/mplayer-win32/files/MPlayer%20and%20MEncoder/
```

## Win10 禁用 OneDrive、Defender 等组件
```bash
gpedit.msc -> 计算机配置 -> 管理模板 -> Windows 组件 -> OneDrive & Windows Defender

卸载 OneDrive：
taskkill /f /im OneDrive.exe
%SystemRoot%\SysWOW64\OneDriveSetup.exe /uninstall
rd "%UserProfile%\OneDrive" /Q /S
rd "%LocalAppData%\Microsoft\OneDrive" /Q /S
rd "%ProgramData%\Microsoft OneDrive" /Q /S
rd "C:\OneDriveTemp" /Q /S
REG Delete "HKEY_CLASSES_ROOT\CLSID\{018D5C66-4533-4307-9B53-224DE2ED1FE6}" /f
REG Delete "HKEY_CLASSES_ROOT\Wow6432Node\CLSID\{018D5C66-4533-4307-9B53-224DE2ED1FE6}" /f

禁用 Unistack 服务组：
HKEY_LOCAL_MACHINE\SYSTEM\CurrentControlSet\Services\CDP* -> Start = 4
HKEY_LOCAL_MACHINE\SYSTEM\CurrentControlSet\Services\OneSyncSvc* -> Start = 4
HKEY_LOCAL_MACHINE\SYSTEM\CurrentControlSet\Services\UserDataSvc* -> Start = 4
HKEY_LOCAL_MACHINE\SYSTEM\CurrentControlSet\Services\UnistoreSvc* -> Start = 4
HKEY_LOCAL_MACHINE\SYSTEM\CurrentControlSet\Services\PimIndexMaintenanceSvc* -> Start = 4
-
HKEY_LOCAL_MACHINE\SYSTEM\CurrentControlSet\Services\TimeBrokerSvc -> Start = 4
HKEY_LOCAL_MACHINE\SYSTEM\CurrentControlSet\Services\tiledatamodelsvc -> Start = 4

CMD：
reg add HKEY_LOCAL_MACHINE\SYSTEM\CurrentControlSet\Services\TimeBrokerSvc /v Start /t REG_DWORD /d 4 /f
```

## Domain
```bash
注册：https://my.freenom.com/
解析：https://www.cloudxns.net/
解析：https://www.cloudflare.com/a
解析：https://my.incapsula.com/mysites
```
