+++
Categories = ["CheatSheet"]
date = "2016-03-23T16:40:02+08:00"
title = "Linux 命令不完全手册"

+++

<!--more-->

> 最近因为要参加全国云计算比赛，需要使用 Linux；所以我把关于 Linux 系统的一些命令整理在这里，以便查阅。

```
pwd #查看当前路径
date #查看当前时间
file #查看文件类型
cat #查看文件内容
head #查看文件头10行内容
tail #查看文件末尾10行内容 -f 追踪文件最新增加的内容 follow
ifconfig #查看网卡信息
touch #创建空文件
wc #统计文本
more #分屏显示
```

## ls
```
-a #显示隐藏文件
-l #以列表形式显示详细信息
-h #文件大小人性化显示
-i #显示inode
-r #反向排序     Reverse(相反)
-R #操作文件夹下的所有文件     Recursive(递归)
-S #按文件大小降序排列     Size

[root@compute ~]$ ll -Shr
total 20K
-rw-------. 1 root root 1.2K Mar 29 14:35 anaconda-ks.cfg
-rw-r--r--. 1 root root 3.1K Mar 29 14:34 install.log.syslog
-rw-r--r--. 1 root root 8.9K Mar 29 14:35 install.log
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

Tips : 
ll = ls -l
ls `cat 123` # ` ` 包含的命令 bash 会先执行
```

## mkdir
```
-p #递归创建目录

mkdir -p 1/2/3
```

## cd
```
cd #进入当前用户家目录
cd - #进入上一次的目录
cd .. #进入上一级目录
```

## rmdir
```
rmdir #删除空白目录，不常用
```

## rm
```
-r #操作文件夹下的所有文件     Recursive(递归)
-f #不显示确认信息
-v #显示详细信息

rm -rf *
rm -rf `ls | grep -v word` #删除除了 word 之外的所有文件
```

## cp
```
cp [选项] [原文件或目录] [目标目录]
-u #只复制比目标新的文件
-r #操作文件夹下的所有文件     Recursive(递归)
-p #连带文件属性复制
-d #若原文件是链接文件，则复制链接属性
-a #相当于 -rpd

cp -r /root/install.log .
```

## mv
```
mv [选项] [原文件或目录] [目标目录]
-u #只移动比目标新的文件

mv 123 1 #相当于重命名
```

## ln
```
ln [原文件]  [目标文件]
-s #创建软链接 soft，不加则创建硬链接 hard，需使用绝对路径

软链接：类似于windows快捷方式，删除原文件，软连接不能使用
硬链接：拥有相同的i节点和存储block块，可以看作同一个文件，删除其中之一，另一个还能使用，可通过i节点识别，不能跨分区和针对目录使用，相当于backup，防止误删。
```

## locate
```
locate [文件名] #在数据库中搜索文件名，速度非常快
updatedb #手动更新数据库

yum -y install mlocate #安装 locate
/var/lib/mlocate     数据库位置,默认一天一更新
/etc/updatedb.conf     locate配置文件
```

## ZModem
```
yum -y install lrzsz #安装 ZModem
rz #上传文件     对于 Linux Receive(收到)
sz #下载文件     对于 Linux Send(发送)
```

## tree
```
yum -y install tree #安装 tree
-a #显示所有文件和目录     all
-d #只显示目录     directory
-f #在文件和目录前显示绝对路径     full
-u #在文件和目录前显示所属用户     user
-g #在文件和目录前显示所属组     group
-s #列出文件和目录大小     size
-h #列出文件和目录大小     human
-p #列出权限标识     purview
-i #不以阶梯状列出文件和目录     Ignore indentation
-C #文件夹显示不同颜色     color

[root@controller ~]$ tree -a /root
/root
├── anaconda-ks.cfg
├── .bash_history
├── .bash_logout
├── .bash_profile
├── .bashrc
├── .cshrc
├── install.log
├── install.log.syslog
├── .novaclient
│   └── 21232f297a57a5a743894a0e4a801fc3
│       ├── keypair-human-id-cache
│       └── keypair-uuid-cache
├── .rnd
├── .ssh
│   ├── id_rsa
│   ├── id_rsa.pub
│   └── known_hosts
├── .tcshrc
└── .viminfo
3 directories, 16 files
```

## SSH
```
ssh-keygen #在 ~/.ssh 目录下生成公钥和私钥
ssh-copy-id user@host #将公钥复制到 user@host 下的 ~/.ssh/authorized_keys 以启用无密码 SSH 登录
ssh user@host #以 SSH 方式登陆远程主机

yum -y install openssh-clients #安装 SSH 套件
```

## scp
```
-r #操作文件夹下的所有文件     Recursive(递归)
-p #指定远程主机的端口号

[root@controller ~]$ scp -r /tmp/soft root@192.168.100.10:/tmp/ #上传本地目录到远程机器指定目录
[root@controller ~]$ scp -r root@192.168.100.10:/tmp/soft /tmp/ #从远处复制到本地
```

## find
```
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
```
grep[选项] 字符串 文件名     在文件当中查找匹配符合条件的字符串
-n #显示行号
-i #忽略大小写
-v #排除指定字符串，取反
-c #统计文本中匹配字符串的行数
-e #执行多条编辑命令
-r #操作文件夹下的所有文件     Recursive(递归)
--color=auto #高亮匹配字符

Tips : 默认为包含匹配，可使用正则表达式进行包含匹配     ^开头     结尾$
grep ^[a-z] /etc/nova/nova.conf #使用正则表达式去掉注释
grep -vn -e ^井 -e '^$' /etc/vsftpd/vsftpd.conf #使用正则表达式取反去掉注释和空行并显示行号
```

## sed
```
-i #将修改写入文件
-e #执行多条编辑命令

命令
d #删除

sed -i -e '/^$/'d -e '/^#/'d openrc.sh #删除 空白行 和 注释行
sed -i 's/b/strong/g' index.html #搜索 index.html 中的 b 并将其替换为 strong
```

## mount
```
mount #查询系统中已经挂载的设备
mount -a #依据配置文件/etc/fstab的内容，自动挂载
mount [-t 文件系统] [-o特殊选项] 设备文件名 挂载点 #挂载设备     type     option
umount [设备文件名或挂载点] #卸载设备

-t #一般不必指定，mount 会自动选择正确的类型
     光盘、光盘镜像：iso9660
     DOS fat16：msdos
     Windows9x fat32：vfat
     WindowsNT ntfs：ntfs
     Windows 网络文件共享：smbfs
     Linux 网络文件共享：nfs
-o #挂载方式
     loop：把一个文件当成硬盘分区挂载
     ro：采用只读方式挂接设备
     rw：采用读写方式挂接设备
     iocharset：指定访问文件系统所用字符集

example:
挂载光盘
mount /dev/cdrom(or `sr0`) /mnt/ #把设备文件挂载到空文件夹(挂载点)上
挂载U盘
fdisk -l #查看分区表
mount /dev/sdb1 /mnt/ #把设备文件挂载到空文件夹(挂载点)上，若中文乱码加上`-o iocharset=cp936`
挂载本地镜像
mount -o loop 1.iso /mnt/

Tips：
[root@controller ~]$ cat /proc/partitions #同样可以查看分区表
major minor  blocks  name
   8        0  292421632 sda
   8        1    1024000 sda1
   8        2  204800000 sda2
   8        3    8192000 sda3
linux默认是不支持NTFS文件系统的
cp /dev/cdrom /tmp/1.iso #从光盘制作光盘镜像文件
```

## echo
```
echo [选项] [输出内容]
-e #支持反斜线控制的字符转换

echo -e "\e[1;31m 123456 \e[0m" #输出红颜色 (31m)
```

## alias
```
alias #查看系统中所有的命令别名
alias 别名='原命令' #设定命令别名，重启失效
unalias 别名 #删除别名

别名永久生效
vi ~/.bashrc
将命令写入环境变量配置文件，每个用户都分别有一个，~代表家目录。
重启后生效，若想直接生效可用 source .bashrc 重新调用。
```

## lsblk
```
-a #显示所有设备
-f #显示文件系统信息

[root@controller ~]$ lsblk  
NAME   MAJ:MIN RM   SIZE RO TYPE MOUNTPOINT
sda      8:0    0 278.9G  0 disk 
├─sda1   8:1    0  1000M  0 part /boot
├─sda2   8:2    0 195.3G  0 part /
└─sda3   8:3    0   7.8G  0 part [SWAP]
设备名     主要和次要设备号     是否为可移动设备     容量     是否为只读     类型     挂载点
```

## yum
```
-y #对所有提问都回答 yes

yum install tree #安装包
yum remove tree #移除包
yum reinstall tree #重新安装包
yum search tree #搜索包
yum list #列出所有包
yum list installed #列出已安装的包
yum update #更新系统
yum check-update #更新包列表
yum repolist #列出源
yum provides /bin/bash #查找某一文件的提供包
yum info bash #查看软件包详情
yum clean all #删除缓存

添加源：add to /etc/yum.repos.d/
移除源：remove from /etc/yum.repos.d/
```

## chmod
```
chmod [选项] [参数]
-R #操作文件夹下的所有文件     Recursive(递归)

rwx rw- r--(333)
r=读取     值 = 4
w=写入     值 = 2
x=执行     值 = 1

chmod 764 file01 #把 file01 的权限改为 rwx rw- r--

Tips : 预设的情況下，系统中所有的帐号与一般身份使用者的相关信息都是记录在 /etc/passwd  文件中；每个人的密码则是记录在 /etc/shadow 文件下；所有的组群名称记录在 /etc/group 內。
```

## chown
```
chown [选项] [参数]
-R #操作文件夹下的所有文件     Recursive(递归)

参数：
用户:组：指定所有者和所属工作组。当省略“:组”，仅改变文件所有者；
文件：指定要改变所有者和工作组的文件列表。支持多个文件和目标，支持shell通配符。

chown user:market file01 #把 file01 给 user，并添加到 market 组中
```

## history
```
history [选项] [历史命令保存文件]
-c #清空历史命令
-w #把缓存中的历史命令写入历史命令保存文件 ~/.bash_history

!n 重复执行第n条历史命令
!! 重复执行上一条命令
!abc 重复执行最后一条以abc开头的命令
```

## uname
```
-a #显示全部系统信息
-m #电脑类型
-n #主机名称
-v #内核版本
-r #内核发行编号

[root@controller ~]$ uname -a
Linux controller 2.6.32-431.el6.x86_64 井1 SMP Fri Nov 22 03:15:09 UTC 2013 x86_64 x86_64 x86_64 GNU/Linux
```

## lsb_release
```
-a #显示全部发行版本信息

[root@controller ~]$ lsb_release -a
LSB Version:    :base-4.0-amd64:base-4.0-noarch:core-4.0-amd64:core-4.0-noarch
Distributor ID: CentOS
Description:    CentOS release 6.5 (Final)
Release:        6.5
Codename:       Final
                                   标准     基础
Tips：LSB 是 Linux Standard Base 的缩写
```

## shutdown
```
shutdown [选项]  [时间 (now立即) ]
-h #关机
-r #重启
-k #只是发布消息
-c #取消前一个关机命令

shutdown -h now #立即关机
shutdown -r now #立即重启
```

## init
```
init [0-6] #切换系统运行级别
runlevel #查询系统当前运行级别

/etc/inittab     系统默认运行级别配置文件,默认为3
0关机     1单用户     2不完全多用户(不含NFS服务)     3完全多用户(默认字符界面)     4未分配     5图形界面     6重启

Tips : 
Ctrl+ALT+F1~7 #在图形界面和字符界面中切换
```

## zip 压缩
```
zip [压缩文件名] [源文件] #压缩文件
zip -r [压缩文件名] [源目录] #压缩目录
unzip [压缩文件名] #解压缩
```

## gz 压缩
```
gzip [源文件] #压缩为.gz格式压缩文件，源文件会消失
gzip -r [目录] #分别压缩目录下的所有子文件，不能压缩目录
gunzip or gzip -d [压缩文件] #解压缩
gzip -c [源文件] > [压缩文件] #压缩为.gz格式压缩文件，源文件保留

gzip -c abc > abc.gz
```

## bz2 压缩
```
bzip2 [源文件] #压缩为.bz2格式的压缩文件，源文件会消失
bzip2 -k [源文件] #压缩之后保留源文件
`bunzip2` or `bzip2` -d [压缩文件] [-k 保留源文件] #解压缩

Tips : bzip2不支持目录压缩
```

## tar 压缩
```
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
```
logout
exit

Tips : 
Ctrl+D #快捷键退出
```

## 搜索系统命令
```
whereis [命令名] #查找可执行文件和帮助文件
which [命令名] #查找可执行文件和默认别名

[root@controller ~]$ whereis ls
ls: /bin/ls /usr/share/man/man1/ls.1.gz
[root@controller ~]$ which ls  
alias ls='ls --color=auto'
        /bin/ls
```

## 查看命令帮助
```
whatis [命令]
相当于
man -f [命令]
-k net 查找包含`net`的命令
```

## 查看用户登录信息
```
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
```
*     匹配任意字符     123*
?     匹配一个任意字符     12?.log
[]     匹配中括号中内的任意一个字符     12[34].log = 123.log or 124.log
[-]     匹配中括号中内的任意一个字符，- 代表一个范围。例如：[a-z]代表匹配一个小写字母
[^]     逻辑非，表示匹配不是中括号内的一个字符。例如：[^0-9]代表匹配一个不是数字的字符
```

## 管道符
```
命令1 | 命令2     命令1的正确输出作为命令2的操作对象，注意命令2必须能够处理命令1的输出

ls -l /etc | more
netstat -an | grep ESTABLISHED | wc -l
keystone tenant-list | grep service | awk '{print $2}'
```

## 重定向
```
标准输出重定向
命令 > 文件
ls > test.log #以覆盖方式把本该输出至屏幕的信息保存至文件当中
ls >> test.log #以追加方式把本该输出至屏幕的信息保存至文件当中

标准错误输出重定向
错误命令 2[>,>>] 文件
lsss 2[>,>>] test.log #以[覆盖,追加]方式把本该输出至屏幕的错误信息保存至文件当中

- 命令 &>> 文件     正确输出和错误输出同时追加保存
- 命令 >> 文件1 2>> 文件2     正确输出和错误输出分开保存
```

## 多命令顺序执行
```
;     命令1; 命令2     多个命令按顺序顺序执行，命令之间没有任何逻辑联系
&&     命令1 && 命令2     逻辑与，只有当命令1执行成功时，命令2才会执行
||     命令1 || 命令2     逻辑或，命令1执行成功时，命令2不会执行；命令1执行失败，命令2才会执行

ls `cat 123` # ` ` 包含的命令 bash 会先执行
ls && echo yes || echo no #判断命令是否执行成功
```

## 后台进程
```
Ctrl+Z     暂停进程并放入后台
jobs #显示暂停的进程
bg %N #使第N个进程在后台运行     back
fg %N #使第N个进程在前台运行     front

Tips : bg 和 fg 不带 %N 时默认对最后一个进程进行操作
```

## 脚本
```
vi hello.sh
#!/bin/bash
echo -e "\e[1;36m 123456 \e[0m"

执行脚本
- chmod 755 hello.sh #赋予执行权限，直接运行
   ./hello.sh
- bash hello.sh #通过Bash调用执行脚本
```

## Linux 目录
```
/boot     启动文件目录
/dev     设备文件目录
/etc     配置文件目录
/home     普通用户的家目录
/root     超级用户的家目录
/lib     系统函数库目录
/tmp     临时文件目录
/usr     系统软件资源目录
/opt     第三方软件资源目录
/var     系统文档目录
/proc|/sys     内存挂载点，不能操作
/mnt|/media|/misc     媒体设备挂载点

根目录(/)下的bin和sbin，usr目录(/usr)下的的bin和sbin，这四个目录都是用来保存系统命令的。
区别在于2个sbin目录只有root用户才能执行。
```

## 快捷键
```
Ctrl+L     清屏
Ctrl+Z     暂停进程并放入后台
Ctrl+C     终止当前命令
Ctrl+D     退出登录
Ctrl+A     光标移动到行首
Ctrl+E     光标移动到行尾
Ctrl+U     剪切光标之前的内容
Ctrl+K     剪切光标之后的内容
Ctrl+W     剪切光标前的一个字段
Ctrl+Y     粘贴上一次快捷键剪切的内容
Ctrl+?     撤消前一次动作
Ctrl+O     重复执行命令
Ctrl+R     在历史命令中搜索
Ctrl+M     回车键 (Enter)
Ctrl+S     暂停屏幕输出
Ctrl+Q     恢复屏幕输出
Ctrl+ALT+F1~7     在图形界面和字符界面中切换
Ctrl+ALT+T     在图形界面中打开终端（CentOS 需要自己设置快捷键）

~+TAB*2     All Present Users on system from "/etc/passwd"
@+TAB*2     Entries from "/etc/hosts"
```