+++
categories = ["Notes"]
date = "2016-02-08T21:08:50+08:00"
title = "Note"

+++

<!--more-->

> {{< image "/uploads/note.png" "Kratos" "1" "1" >}}

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

## Pandoc
```bash
将 Markdown 转化成 HTML：
pandoc 123.md -o 123.html

使用指定 CSS：
pandoc -c 123.css 123.md -o 123.html

生成独立 HTML：
pandoc --self-contained -c 123.css 123.md -o 123.html
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

Xshell：保持活动状态 -> 字符串 -> 0 \n
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

## Chrome CSS
```css
a{text-decoration:none !important}
a:hover { text-decoration: underline !important;}
*:not([class*="icon"]):not(i){font-family: "Microsoft YaHei","Symbol" !important;}
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
https://duckduckgo.com/
https://encrypted.google.com/ncr
http://serve.netsh.org/pub/ipv4-hosts/
https://raw.githubusercontent.com/racaljk/hosts/master/hosts

EXE：
https://en.wikipedia.org/wiki/Google_Chrome
https://api.shuax.com/tools/getchrome
https://repo.fdzh.org/chrome/exe/
-
https://commondatastorage.googleapis.com/chromium-browser-snapshots/index.html
https://commondatastorage.googleapis.com/chromium-browser-snapshots/index.html?prefix=Android/441086/
https://commondatastorage.googleapis.com/chromium-browser-snapshots/index.html?prefix=Win_x64/441085/
https://commondatastorage.googleapis.com/chromium-browser-snapshots/Android/LAST_CHANGE
https://commondatastorage.googleapis.com/chromium-browser-snapshots/Win_x64/LAST_CHANGE
-
type nul > "D:\Program Files\Chrome\User Data\SwReporter"

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

## HSTS
```html
chrome://net-internals/#hsts

强制忽略证书错误：badidea
```

## Hosts
```bash
C:\Windows\System32\drivers\etc\
⇳
64.233.189.121 feeds.feedburner.com
64.233.189.121 www.repacks.org
64.233.189.121 www.draw.io
54.231.66.16 s3.amazonaws.com
209.99.20.16 dl.dumptruck.goldenfrog.com
151.101.128.133 blog.xhstormr.tk
151.101.128.133 assets-cdn.github.com
151.101.128.133 raw.githubusercontent.com
```

## SQL
```bash
SQLite
https://www.sqlite.org/index.html
https://github.com/xerial/sqlite-jdbc
https://jcenter.bintray.com/org/xerial/sqlite-jdbc/

sqlite3.exe 123.db ".mode column" ".header on" "select * from user;" > 1.txt

compile 'org.xerial:sqlite-jdbc:3.16.1'

PostgreSQL
https://www.enterprisedb.com/download-postgresql-binaries
https://jdbc.postgresql.org/download.html
https://github.com/pgjdbc/pgjdbc
https://jcenter.bintray.com/org/postgresql/postgresql/

initdb.exe -A md5 -E UTF8 --no-locale --lc-messages="Chinese (Simplified)_China.936" -U 123 -W -D D:\12345
pg_ctl.exe -l D:\log.txt -D D:\12345 start
pg_ctl.exe -l D:\log.txt -D D:\12345 stop
psql.exe -e -E -h 127.0.0.1 -p 5432 -U 123 -W -d postgres

compile 'org.postgresql:postgresql:9.4.1212'

Tool：
http://www.heidisql.com/download.php
https://www.postgresql.org/ftp/pgadmin3/pgadmin4/
https://github.com/sosedoff/pgweb/releases/latest
https://www.jetbrains.com/datagrip/
```

## Wget 递归下载
```bash
wget -m -k -E -np -c -N --no-if-modified-since -p -P ./123 https://java.sx/java/index.html
```

## Operating System（Mirrors）
```bash
MSDN：
http://msdn.itellyou.cn/
https://www.microsoft.com/zh-cn/software-download/windows10ISO
https://msdn.microsoft.com/en-us/subscriptions/downloads/
https://msdn.microsoft.com/zh-cn/library/ms123401.aspx

Linux（CentOS）：
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

https://download.lineageos.org/
```

## FFmpeg
```bash
ffmpeg.exe -i http://example.com/1.m3u8 -c copy 123.mkv
ffplay.exe "http://example.com/1.m3u8"

H.264：
ffmpeg.exe -i 123.gif -c:v libx264 -preset medium -crf 28 -c:a aac -b:a 128k 123.mp4
H.265：
ffmpeg.exe -i 123.gif -c:v libx265 -preset medium -crf 28 -c:a aac -b:a 128k 123.mp4
VP9：
ffmpeg.exe -i 123.gif -c:v libvpx-vp9 -crf 45 -b:v 0 -c:a libvorbis 123.webm
H.264 to RAW：
ffmpeg.exe -i 123.mp4 -vcodec copy -an -bsf:v h264_mp4toannexb 123.h264

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

CMD 操作示例：
reg add HKEY_LOCAL_MACHINE\SYSTEM\CurrentControlSet\Services\TimeBrokerSvc /v Start /t REG_DWORD /d 4 /f
```

## Domain
```bash
注册：https://my.freenom.com/
解析：https://www.cloudxns.net/
解析：https://www.cloudflare.com/a
解析：https://my.incapsula.com/mysites
```

## ImageMagick
```html
https://www.imagemagick.org/script/binary-releases.php

https://pngquant.org/
http://advsys.net/ken/utils.htm
https://sourceforge.net/projects/optipng/files/OptiPNG/

https://tinypng.com/
http://m.2gei.com/bgremover/
https://imageoptim.com/mozjpeg
```

## 修改 CMD 环境变量（暂时）
```bash
set /?
set path
set path=%path%;D:\Download\123
```

## 迅雷启用边下边播
```ini
Program\Xmp.ini
⇳
[global]
Path=C:\PotPlayer\PotPlayerMini.exe
```

## WebX
```html
https://storage.googleapis.com/downloads.webmproject.org/releases/webm/index.html
https://storage.googleapis.com/downloads.webmproject.org/releases/webp/index.html
```
