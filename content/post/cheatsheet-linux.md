+++
Categories = ["CheatSheet"]
date = "2016-03-23T16:40:02+08:00"
title = "Linux 命令不完全手册"

+++

<!--more-->

> 最近因为要参加全国云计算比赛，需要使用 Linux；所以我把关于 Linux 系统的一些命令整理在这里，以便查阅。

```bash
pwd #查看当前路径
date #查看当前时间
cat #查看文件数据
ifconfig #查看网卡信息
touch #创建空文件
wc #统计文本
more #分屏显示
```

## ls
```bash
-a #显示隐藏文件
-l #以列表形式显示详细信息
-h #文件大小人性化显示
-i #显示inode

[root@controller ~]$ ls -l
total 20
-rw-------. 1 root root  986 Mar 18 10:14 anaconda-ks.cfg
-rw-r--r--. 1 root root 9072 Mar 18 10:14 install.log
-rw-r--r--. 1 root root 3161 Mar 18 10:13 install.log.syslog

10位     前1(-文件 d目录 l连接)     后9(rw-r--r--)
rw-r--r--(333)
u所属用户     g所属组     o其他人
r读     w写     x执行
1引用计数     root所属用户     root所属组     9072文件大小

Tips : ll = ls -l
```

## mkdir
```bash
-p #递归创建目录

mkdir -p 1/2/3
```

## cd
```bash
cd #进入当前用户家目录
cd - #进入上一次的目录
cd .. #进入上一级目录
```

## rmdir
```bash
rmdir #删除空白目录，不常用
```

## rm
```bash
-r #删除目录
-f #不显示确认信息
-v #显示详细信息

rm -rf *
rm -rf `ls | grep -v word` #删除除了 word 之外的所有文件
```

## cp
```bash
cp [选项] [原文件或目录] [目标目录]
-u #只复制比目标新的文件
-r #复制目录
-p #连带文件属性复制
-d #若原文件是链接文件，则复制链接属性
-a #相当于 -rpd

cp -r /root/install.log .
```

## mv
```bash
mv [选项] [原文件或目录] [目标目录]
-u #只移动比目标新的文件

mv 123 1 #相当于重命名
```

## ln
```bash
ln [原文件]  [目标文件]
-s #创建软链接 soft，不加则创建硬链接 hard，需使用绝对路径

软链接：类似于windows快捷方式，删除原文件，软连接不能使用
硬链接：拥有相同的i节点和存储block块，可以看作同一个文件，删除其中之一，另一个还能使用，可通过i节点识别，不能跨分区和针对目录使用，相当于backup，防止误删。
```

## locate
```bash
locate [文件名] #在数据库中搜索文件名，速度非常快
updatedb #手动更新数据库

/var/lib/mlocate     数据库位置,默认一天一更新
/etc/updatedb.conf     locate配置文件
```

## find
```bash
find [搜索范围]  [搜索条件]  [搜索文件]
find / -name 123.log

搜索条件:
-iname #不区分大小写
-nouser #查找没有所有者的文件
-user root #按所有者搜索
-inum 262422 #查找i节点是262422的文件

-atime +10 #查找10天前访问的文件
-ctime +10 #查找10天前属性改变的文件
-mtime +10 #查找10天前修改的文件
+            10            -            now
10天前 10天当天 10天内

-size +25k #查找大于25k的文件
+            25            -
大于       等于       小于

find . -size +20k -a -size -50k #查找当前目录下大于20k小于50k的文件
-a and 逻辑与，2者都满足
-o or 逻辑或，2者满足之一即可

find . -size +20k -a -size -50k -exec ls -lh {} \; #查找当前目录下大于20k小于50k的文件，并显示详细信息
-exec/-ok [命令] {} \; 对搜索结果执行[命令]操作

Tips :
应当避免大范围搜索，会非常耗费资源。
默认为完全匹配查询，可使用通配符进行模糊查询。
find /etc/ -name '*.ini' #查找 /etc 目录中以 .ini 结尾的文件
```

## grep
```bash
grep[选项] 字符串 文件名     在文件当中查找匹配符合条件的字符串
-i #忽略大小写
-v #排除指定字符串，取反

Tips : 默认为包含匹配，可使用正则表达式进行包含匹配
grep ^[a-z] /etc/nova/nova.conf #使用正则表达式去掉注释
```

## mount
```bash
mount #查询系统中已经挂载的设备
mount -a #依据配置文件/etc/fstab的内容，自动挂载
umount [设备文件名或挂载点] #卸载设备
mount [-t 文件系统] [-o特殊选项] 设备文件名 挂载点

example:
挂载光盘
mkdir /mnt/cdrom #创建空文件夹
mount /dev/cdrom(or `sr0`) /mnt/cdrom/ #把设备文件挂载到空文件夹(挂载点)上
挂载U盘
mkdir /mnt/usb #创建空文件
fdisk -l #查看U盘设备文件名
mount -t vfat /dev/sdb1 /mnt/usb/ #把设备文件挂载到空文件夹(挂载点)上，vfat意思为fat32
挂载本地镜像
mount -o loop 123.iso /mnt/

Tips : linux默认是不支持NTFS文件系统的
```

## echo
```bash
echo [选项] [输出内容]
-e #支持反斜线控制的字符转换

echo -e "\e[1;31m 123456 \e[0m" #输出红颜色 (31m)
```

## alias
```bash
alias #查看系统中所有的命令别名
alias 别名='原命令' #设定命令别名，重启失效
unalias 别名 #删除别名

别名永久生效
vi ~/.bashrc
将命令写入环境变量配置文件，每个用户都分别有一个，~代表家目录。
重启后生效，若想直接生效可用 source .bashrc 重新调用。
```

## chmod
```bash
chmod [选项] [参数]
rwx rw- r--(333)
r=读取     值 = 4
w=写入     值 = 2
x=执行     值 = 1

chmod 764 file01 #把 file01 的权限改为 rwx rw- r--

Tips : 预设的情況下，系统中所有的帐号与一般身份使用者的相关信息都是记录在 /etc/passwd  文件中；每个人的密码则是记录在 /etc/shadow 文件下；所有的组群名称记录在 /etc/group 內。
```

## chown
```bash
chown [选项] [参数]

参数：
用户:组：指定所有者和所属工作组。当省略“:组”，仅改变文件所有者；
文件：指定要改变所有者和工作组的文件列表。支持多个文件和目标，支持shell通配符。

chown user:market file01 #把 file01 给 user，并添加到 market 组中
```

## history
```bash
history [选项] [历史命令保存文件]
-c #清空历史命令
-w #把缓存中的历史命令写入历史命令保存文件 ~/.bash_history

!n 重复执行第n条历史命令
!! 重复执行上一条命令
!abc 重复执行最后一条以abc开头的命令
```

## shutdown
```bash
shutdown [选项]  [时间 (now立即) ]
-h #关机
-r #重启
-k #只是发布消息
-c #取消前一个关机命令
```

## init
```bash
init [0-6] #切换系统运行级别
runlevel #查询系统当前运行级别
/etc/inittab     系统默认运行级别配置文件,默认为3
0关机     1单用户     2不完全多用户(不含NFS服务)     3完全多用户(默认字符界面)     4未分配     5图形界面     6重启
```

## zip 压缩
```bash
zip [压缩文件名] [源文件] #压缩文件
zip -r [压缩文件名] [源目录] #压缩目录
unzip [压缩文件名] #解压缩
```

## gz 压缩
```bash
gzip [源文件] #压缩为.gz格式压缩文件，源文件会消失
gzip -r [目录] #分别压缩目录下的所有子文件，不能压缩目录
gunzip or gzip -d [压缩文件] #解压缩
gzip -c [源文件] > [压缩文件] #压缩为.gz格式压缩文件，源文件保留

gzip -c abc > abc.gz
```

## bz2 压缩
```bash
bzip2 [源文件] #压缩为.bz2格式的压缩文件，源文件会消失
bzip2 -k [源文件] #压缩之后保留源文件
`bunzip2` or `bzip2` -d [压缩文件] [-k 保留源文件] #解压缩

Tips : bzip2不支持目录压缩
```

## tar 压缩
```bash
tar -[cxt]f [打包解包文件名] [源文件]
-c #打包
-x #解包
-t #测试
-v #显示过程
-f #指定打包后的文件名
-z #直接打包为.tar.gz文件
-j #直接打包为.tar.bz2文件

tar -xf 123.tar.gz -C /tmp/ #指定解包位置
```

## 退出登录
```bash
logout
exit

Tips : 
Ctrl+D #快捷键退出
```

## 搜索系统命令
```bash
whereis [命令名] #查找可执行文件和帮助文件
which [命令名] #查找可执行文件和默认别名

[root@controller ~]$ whereis ls
ls: /bin/ls /usr/share/man/man1/ls.1.gz
[root@controller ~]$ which ls  
alias ls='ls --color=auto'
        /bin/ls
```

## 查看命令帮助
```bash
whatis [命令]
相当于
man -f [命令]
-k net 查找包含`net`的命令
```

## 查看用户登录信息
```bash
当前登录用户：
w
who

[root@controller ~]$ w
 08:28:35 up  1:50,  2 users,  load average: 0.02, 0.23, 0.19
USER     TTY      FROM              LOGIN@   IDLE   JCPU   PCPU WHAT
root     pts/0    192.168.100.65   06:41    8.00s  0.08s  0.08s -bash
root     pts/1    192.168.100.151  07:47    0.00s  0.06s  0.00s w
[root@controller ~]$ who
root     pts/0        2016-03-24 06:41 (192.168.100.65)
root     pts/1        2016-03-24 07:47 (192.168.100.151)

last #过去登录用户
last命令默认读取 /var/log/wtmp 文件

lastlog #查询所有用户的最后一次登录时间
lastlog命令默认读取 /var/log/lastlog 文件
```

## 通配符
```bash
*     匹配任意字符     123*
?     匹配一个任意字符     12?.log
[]     匹配中括号中内的任意一个字符     12[34].log = 123.log or 124.log
[-]     匹配中括号中内的任意一个字符，- 代表一个范围。例如：[a-z]代表匹配一个小写字母
[^]     逻辑非，表示匹配不是中括号内的一个字符。例如：[^0-9]代表匹配一个不是数字的字符
```

## 管道符
```bash
命令1 | 命令2     命令1的正确输出作为命令2的操作对象，注意命令2必须能够处理命令1的输出

ls -l /etc | more
netstat -an | grep ESTABLISHED | wc -l
keystone tenant-list | grep service | awk '{print $2}'
```

## 重定向
```bash
标准输出重定向
命令 > 文件
ls > test.log #以覆盖方式把本该输出至屏幕的信息保存至文件当中
ls >> test.log #以追加方式把本该输出至屏幕的信息保存至文件当中

标准错误输出重定向
错误命令 2[>,>>]文件
lsss 2[>,>>]test.log #以[覆盖,追加]方式把本该输出至屏幕的错误信息保存至文件当中

- 命令 &>>文件     正确输出和错误输出同时追加保存
- 命令 >> 文件1 2>>文件2     正确输出和错误输出分开保存
```

## 多命令顺序执行
```bash
;     命令1; 命令2     多个命令按顺序顺序执行，命令之间没有任何逻辑联系
&&     命令1 && 命令2     逻辑与，只有当命令1执行成功时，命令2才会执行
||     命令1 || 命令2     逻辑或，命令1执行成功时，命令2不会执行；命令1执行失败，命令2才会执行

ls && echo yes || echo no #判断命令是否执行成功
```

## 后台进程
```bash
Ctrl+Z     暂停进程并放入后台
jobs #显示暂停的进程
bg %N #使第N个进程在后台运行     back
fg %N #使第N个进程在前台运行     front

Tips : bg 和 fg 不带 %N 时默认对最后一个进程进行操作
```

## 脚本
```bash
vi hello.sh
#!/bin/bash
echo -e "\e[1;36m 123456 \e[0m"

执行脚本
- chmod 755 hello.sh #赋予执行权限，直接运行
   ./hello.sh
- bash hello.sh #通过Bash调用执行脚本
```

## Linux 目录
```bash
/boot     启动文件目录
/dev     设备文件目录
/etc     配置文件目录
/home     普通用户的家目录
/root     超级用户的家目录
/lib     系统库目录，so等于DLL文件
/tmp     临时文件目录
/usr     系统软件资源目录
/var     系统文档目录
/proc|/sys     内存挂载点，不能操作
/mnt|/media|/misc     媒体设备挂载点

根目录(/)下的bin和sbin，usr目录(/user)下的的bin和sbin，这四个目录都是用来保存系统命令的。
区别在于2个sbin目录只有root用户才能执行。
```

## 快捷键
```bash
Ctrl+L     清屏
Ctrl+Z     暂停进程并放入后台
Ctrl+C     终止当前命令
Ctrl+D     退出登录
Ctrl+A     光标移动到行首
Ctrl+E     光标移动到行尾
Ctrl+U     从光标所在位置删除到行首
Ctrl+W     删除光标前的一个字段
Ctrl+R     在历史命令中搜索
Ctrl+M     回车键 (Enter)
Ctrl+S     暂停屏幕输出
Ctrl+Q     恢复屏幕输出
```