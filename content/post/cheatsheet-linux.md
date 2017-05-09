---
Categories:
- CheatSheet
date: 2016-03-23T16:40:02+08:00
title: Linux 命令不完全手册
---

<!--more-->

Updated on 2017-01-12

> ![](/uploads/linux-centos.svg)
>
> https://www.centos.org/
>
> 最近因为要参加全国云计算比赛，需要使用 Linux；所以我把关于 Linux 系统的一些命令整理在这里，以便查阅。
>
> Update：市赛以第一名出线，国赛获得二等奖。
>
> Update 2：学校要求我留下，继续参加下一届比赛。

```
pwd #查看当前路径
date #查看当前时间
type #查看命令类型
file #查看文件类型 -i 显示MIME类别
stat #查看文件属性
cat #查看文件内容     Concatenate
head #查看文件头10行内容
tail #查看文件末尾10行内容 -f 监视文件最新增加的内容     Follow
ifconfig #查看网卡信息
touch #创建空文件
grep service #取带有 service 字符的行
awk '{print $2}' #取第 2 列     /123/ 模拟grep取行     NR==5 第5行
     ll | awk -F ' ' '/read/ {print $9}' #以空格为列分隔符，取带有 read 字符的行，取第 9 列
sort #排序文本     -u 去重     -k 2 以第二列为目标     -t : 以 `:` 为分隔符     -r 以相反顺序来排序（降序）     -c 检查文本是否已排序     -o123 将结果存入 123 文件中
wc #统计文本     行数 单词数 字节数     -l -w -c
less #分屏显示 -5 每次显示5行 -N 显示行号
more #分页显示 -5 每次显示5行     推荐用 less
reset #初始化终端
```

## ls
```bash
-a #显示隐藏文件
-d #只显示当前文件夹信息
-l #以列表形式显示详细信息
-F #显示类型标识符     /目录 *可执行文件 @符号链接 =Sockets套接字 |FIFO命令管道 普通文件无标识符     Classify(分类)
-h #人性化显示大小
-i #显示inode
-r #反向排序     Reverse(相反)
-R #操作文件夹下的所有文件     Recursive(递归)
-S #按文件大小降序排列     Size
-t #按文件时间排序     Time

[root@controller ~]$ ll -Shr #人性化显示大小并按大小升序排列
total 20K
-rw-------. 1 root root 1.2K Mar 29 14:35 anaconda-ks.cfg
-rw-r--r--. 1 root root 3.1K Mar 29 14:34 install.log.syslog
-rw-r--r--. 1 root root 8.9K Mar 29 14:35 install.log
[root@controller ~]$ ls -lF
total 24
-rw-------. 1 root root 1208 Apr 12 14:42 anaconda-ks.cfg
-rw-r--r--. 1 root root 9114 Apr 12 16:22 install.log
-rw-r--r--. 1 root root 3161 Apr 12 14:41 install.log.syslog
drwxr-xr-x. 2 root root 4096 Apr 13 06:06 test/
-rwxr-xr-x. 1 root root    0 Apr 13 06:06 test.sh*
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
ls `cat 123`     ``包含的命令 bash 会先执行
ll /root/{1,2}     等同于 ll /root/1 /root/2
```

## mkdir
```
-p #递归创建目录

mkdir -p 1/2/3
```

## cd
```
cd #进入当前用户家目录
cd ~ #进入当前用户家目录
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

删除文件名前带有特殊字符的文件
    rm -rf -- -123
    rm -rf ./-123

cp -- 1 -1     -1
cp 1 \\1     \1
```

## chattr
```
-R #操作文件夹下的所有文件     Recursive(递归)
+ 属性 #开启属性
- 属性 #关闭属性

第二扩展文件系统属性：
a：让文件或目录仅供附加用途
b：不更新文件或目录的最后存取时间
c：将文件或目录压缩后存放
d：将文件或目录排除在倾倒操作之外
i：不得任意更动文件或目录
s：保密性删除文件或目录
S：即时更新文件或目录
u：预防意外删除

[root@controller ~]$ chattr +i 123 #添加 i 属性，保护文件
[root@controller ~]$ lsattr #查看文件的第二扩展文件系统属性
----i--------e- ./123
[root@controller ~]$ rm -rf 123 #不能删除
rm: cannot remove 123: Operation not permitted
[root@controller ~]$ chattr -i 123 #关闭属性
[root@controller ~]$ rm -rfv 123
removed 123

[root@controller ~]$ chattr +a 123 #只能往里面追加内容，不能删除
```

## cp
```
cp [选项] [原文件或目录] [目标目录]
-u #只复制比目标新的文件
-r #操作文件夹下的所有文件     Recursive(递归)
-p #连带文件属性复制
-d #若原文件是链接文件，则复制链接属性
-a #相当于 -rpd

cp /root/123 .     复制文件到当前目录
cp /root/123{,.bak}     备份文件,等同于 cp /root/123 /root/123.bak
```

## mv
```bash
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

## z
```
echo '. /root/z.sh' >> .bashrc #安装 z

https://github.com/rupa/z
https://github.com/rupa/z/raw/master/z.sh
```

## locate
```bash
yum -y install mlocate #安装 locate
locate [文件名] #在数据库中搜索文件名，速度非常快
updatedb #手动更新数据库

/var/lib/mlocate     数据库位置,默认一天一更新
/etc/updatedb.conf     locate配置文件
```

## ZModem
```
yum -y install lrzsz #安装 ZModem
rz #上传文件     对于 Linux Receive(收到)
sz #下载文件     对于 Linux Send(发送)
```

## parted
```bash
yum -y install parted #安装 parted
-l #输出分区信息

交互命令
help [COMMAND]     获取帮助信息
mklabel     设置分区表，如 gpt 和 msdos
mkpart     创建新分区     mkpart PART-TYPE [FS-TYPE] START END
print     输出分区信息，可简写为 p
      free     同时显示磁盘剩余空间
      all     显示所有磁盘信息
      number     显示指定分区信息
rm     删除分区
select     选择设备
quit     退出，可简写为 q

[root@controller ~]$ parted
      select /dev/sdb #选择设备
      p #显示磁盘分区信息
      mklabel gpt #将分区表修改为 gpt 格式
      mkpart primary 265gb 275gb #创建一个大小为 10GB 的主分区，分区起始位置：265gb，分区结束位置：275gb
      mkpart primary 275gb 280gb #创建一个大小为 5GB 的主分区，分区起始位置：275gb，分区结束位置：280gb
      rm 2 #删除大小为 5GB 的分区
      p free #同时查看磁盘剩余空间
      q #退出
[root@controller ~]$ mkfs.ext4 /dev/sdb1 #格式化为 ext4 文件系统
[root@controller ~]$ mkdir /123 #挂载
[root@controller ~]$ mount /dev/sdb1 /123/ #挂载
[root@controller ~]$ df -h|grep 123 #查看挂载分区
/dev/sdb1       9.6G  138M  9.3G   2% /123

[root@controller ~]$ parted /dev/sdb
      mklabel gpt
      mkpart primary 0% 100%
      q
[root@controller ~]$ mkfs.ext4 /dev/sdb1
[root@controller ~]$ mkdir /123
[root@controller ~]$ mount /dev/sdb1 /123
```

## 7z
```bash
yum -y install p7zip* #安装 7z     p7zip，p7zip-plugins，7za和7zr是7z的精简版，建议使用7z
a     添加到压缩文件
b     基准测试     Benchmark
d     从压缩文件中删除
l     列出压缩文件中的内容
t     测试压缩文件
e     解压到当前目录，但没有目录结构，即所有文件都在同一个目录下
x     以完整路径解压
-o     指定输出文件夹     output
-mx[0,1,3,5,7,9]     指定压缩级别

7z a 123 * #将当前目录下的所有文件和文件夹都压缩到 123.7z 中
7z a /root/123 /tmp/ #将 /tmp 中的所有内容压缩到 /root 目录中的 123.7z 中
7z l 123.7z #列出压缩文件中的内容
7z x 123.7z #解压 123.7z 中的所有文件到当前目录下
7z x 123.7z -o456 #解压 123.7z 中的所有文件到 456 目录中，456 目录会自动创建

7z a 123 123 -mx9 #将当前文件夹里的 123 文件夹以 ultra 级别压缩到 123.7z 中
```

## ncdu
```c
yum -y install ncdu #安装 ncdu

交互命令
n     按文件名排序
s     按文件大小排序
r     重新统计大小
g     切换统计视图
e     显示隐藏文件
d     删除文件/文件夹
i     显示文件/目录信息
↑↓     上/下
←→     返回/进入

[root@controller ~]$ ncdu /root/
ncdu 1.7 ~ Use the arrow keys to navigate, press ? for help
--- /root -----------------------------------------------------------------------
   16.0kiB [ 13.8% ##########]  .bash_history
   16.0kiB [ 13.8% ##########] /.ssh
   12.0kiB [ 10.3% #######   ]  install.log
    8.0kiB [  6.9% #####     ] /.novaclient
    8.0kiB [  6.9% #####     ] /.m2
    8.0kiB [  6.9% #####     ]  .viminfo
    8.0kiB [  6.9% #####     ] /.karaf
    4.0kiB [  3.4% ##        ]  install.log.syslog
    4.0kiB [  3.4% ##        ]  anaconda-ks.cfg
    4.0kiB [  3.4% ##        ]  .rnd
    4.0kiB [  3.4% ##        ]  .mysql_history
    4.0kiB [  3.4% ##        ]  .bashrc
    4.0kiB [  3.4% ##        ]  .bash_profile
    4.0kiB [  3.4% ##        ]  .tcshrc
    4.0kiB [  3.4% ##        ]  .cshrc
    4.0kiB [  3.4% ##        ]  .bash_logout
 Total disk usage: 116.0kiB  Apparent size:  66.3kiB  Items: 30
```

## nethogs
```
yum -y install nethogs #安装 nethogs
-d 2 #设置刷新频率为 2 秒，默认 1 秒     delay(延迟)

交互命令
m     切换统计视图     KB/sec -> Total[KB -> B -> MB]
s     按发送流量排序     SEND
r     按接收流量排序     RECEIVED
q     退出

[root@controller ~]$ nethogs eth0 eth1 #同时监视 eth0、eth1 网卡，默认只监视 eth0
NetHogs version 0.8.0
  PID USER     PROGRAM                                DEV        SENT      RECEIVED
2039  qpidd    /usr/sbin/qpidd                        eth0       0.350       0.397 KB/sec
16415 root     sshd: root@pts/4                       eth0       2.509       0.047 KB/sec
28605 root     sshd: root@pts/0                       eth0       0.645       0.047 KB/sec
1885  mysql    /usr/libexec/mysqld                    eth0       0.000       0.000 KB/sec
?     root     unknown TCP                                       0.000       0.000 KB/sec
  TOTAL                                                          3.504       0.491 KB/sec
```

## iftop
```
yum -y install iftop #安装 iftop
-i eth1 #设定监视网卡

交互命令
n     是否解析 IP
N     是否解析端口
s     是否显示本地 主机
d     是否显示远端 主机
S     是否显示本地 端口
D     是否显示远端 端口
p     是否显示端口连接
P     是否暂停
b     是否显示平均流量刻度条
B     切换刻度条时间单位     2s，10s，40s
l     打开屏幕过滤功能
L     切换刻度条单位
t     切换显示格式
T     是否显示每个连接的总流量
j,k     滚动屏幕
1,2,3     根据右侧3列流量排序
<     根据本地主机名排序
>     根据远端主机名排序

TX     发送Transport     cum     运行到目前的总流量     peak     流量峰值     rates     过去2s，10s，40s的平均流量
RX     接收Received
TOTAL     总流量

                 19.1Mb            38.1Mb            57.2Mb            76.3Mb      95.4Mb
└────────────────┴─────────────────┴─────────────────┴──────────────
192.168.100.10:ssh         => 192.168.100.151:54315        116KB  4.09Kb  4.09Kb  4.06Kb
                           <=                             12.1KB   320b    320b    418b
192.168.100.10:ssh         => 192.168.100.151:53704        687KB   688b    726b   1.49Kb
                           <=                              155KB   160b    160b    311b
────────────────────────────────────────────────────────────────────
TX:             cum:   14.6MB   peak:   11.4Kb           rates:   4.77Kb  4.80Kb  5.54Kb
RX:                     715MB           2.27Kb                     480b    480b    730b
TOTAL:                  729MB           13.7Kb                    5.23Kb  5.27Kb  6.26Kb
```

## tree
```bash
yum -y install tree #安装 tree
-a #显示所有文件和目录     all
-d #只显示目录     directory
-f #在文件和目录前显示绝对路径     full
-u #在文件和目录前显示所属用户     user
-g #在文件和目录前显示所属组     group
-s #列出文件和目录大小     size
-h #列出文件和目录大小并人性化显示     human
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

## ssh
```
yum -y install openssh-clients #安装 SSH 套件
ssh-keygen #在 ~/.ssh 目录下生成公钥和私钥
ssh-copy-id user@host #将公钥复制到 user@host 下的 ~/.ssh/authorized_keys 以启用无密码 SSH 登录
ssh user@host #以 SSH 方式登陆远程主机

Tips：
干掉弱密码
[root@controller ~]$ openssl rand -hex 30 #十六进制格式
6ae8592f578b0d2ec704a1ac347cdfc9205d41ede0f853eb15cb28786553
[root@controller ~]$ openssl rand -base64 30 #Base64编码
HTUKtp8wVb2m8ZIIsLtXkQDGKc+V8SeSWJg8yU0Z

openssl enc -aes-256-cfb -k 123456 -a -p -e -in 1.txt -out 2.txt #加密文件
openssl enc -aes-256-cfb -k 123456 -a -p -d -in 2.txt -out 3.txt #解密文件

https://mirrors.tuna.tsinghua.edu.cn/apache/tomcat/tomcat-connectors/native/
```

## scp
```
-r #操作文件夹下的所有文件     Recursive(递归)
-P #指定远程主机的 SSH 端口号

[root@controller ~]$ scp -r /tmp/soft root@192.168.100.10:/tmp/ #上传本地目录到远端指定目录
[root@controller ~]$ scp -r root@192.168.100.10:/tmp/soft /tmp/ #从远端下载到本地
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
-I #忽略二进制文件
-l #只列出匹配的文件名称
-L #只列出不匹配的文件名称
-v #排除指定字符串，取反
-c #统计文本中匹配字符串的行数
-e #执行多条编辑命令
-r #操作文件夹下的所有文件     Recursive(递归)
-A 3 #显示匹配结果的后 3 行
-B 3 #显示匹配结果的前 3 行
-C 3 #显示匹配结果的前 3 行和后 3 行
-3 #Same as -C
--color=auto #高亮匹配字符

[root@controller ~]$ grep "ls --color=auto" /etc/ -rn #递归查找并显示行号
/etc/profile.d/colorls.sh:40:alias ls='ls --color=auto' 2>/dev/null
/etc/profile.d/colorls.csh:46:alias ls 'ls --color=auto'

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
   8        0  488386584 sda
   8        1     204800 sda1
   8        2    1024000 sda2
   8        3  204800000 sda3
   8        4    8192000 sda4
[root@controller ~]$ lsblk #同样可以查看分区表
NAME   MAJ:MIN RM   SIZE RO TYPE MOUNTPOINT
sda      8:0    0 465.8G  0 disk
├─sda1   8:1    0   200M  0 part /boot/efi
├─sda2   8:2    0  1000M  0 part /boot
├─sda3   8:3    0 195.3G  0 part /
└─sda4   8:4    0   7.8G  0 part [SWAP]

linux默认是不支持NTFS文件系统的
cp /dev/cdrom /tmp/1.iso #从光盘制作光盘镜像文件
```

## echo
```
echo [选项] [输出内容]
-e #激活转义字符，支持反斜线控制的字符转换
     \a 发出警告声
     \f 换行但光标仍旧停留在原来的位置
     \n 换行且光标移至行首
     \t 插入制表符     TAB键
     \\ 插入 \

echo -e "\e[1;31m 123456 \e[0m" #输出红颜色 (31m)
echo -e "123\n45\f6" >> 123 #追加写入文件
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
-d #只显示磁盘
-f #显示文件系统信息

[root@controller ~]$ lsblk
NAME   MAJ:MIN RM   SIZE RO TYPE MOUNTPOINT
sda      8:0    0 278.9G  0 disk
├─sda1   8:1    0  1000M  0 part /boot
├─sda2   8:2    0 195.3G  0 part /
└─sda3   8:3    0   7.8G  0 part [SWAP]
设备名     主要和次要设备号     是否为可移动设备     容量     是否为只读     类型     挂载点
```

## df
```bash
-a #显示所有文件系统
-h #大小人性化显示
-T #显示文件系统类型

[root@controller ~]$ df -Th
Filesystem     Type   Size  Used Avail Use% Mounted on
/dev/sda3      ext4   193G  2.7G  180G   2% /
tmpfs          tmpfs  5.8G     0  5.8G   0% /dev/shm
/dev/sda2      ext4   985M   38M  897M   5% /boot
/dev/sda1      vfat   200M  260K  200M   1% /boot/efi
```

## du
```
-a #同时显示文件大小
-c #同时显示大小总和
-s #仅显示大小总和
-h #大小人性化显示
-S #目录大小不包含子目录的大小
--max-depth=0 #列出小于队列深度的文件夹，0等同于 -s

[root@controller ~]$ du -hac #人性化显示所有文件目录及总和的大小
4.0K    ./.bash_profile
4.0K    ./.bash_logout
4.0K    ./installl.log.syslog
4.0K    ./.ssh/known_hosts
4.0K    ./.ssh/authorized_keys
12K     ./.ssh
4.0K    ./anaconda-ks.cfg
12K     ./installl.log
4.0K    ./.bashrc
4.0K    ./.cshrc
4.0K    ./.viminfo
4.0K    ./.bash_history
4.0K    ./.tcshrc
64K     .
64K     total
[root@controller ~]$ du --max-depth=1 -h /opt/ #列出各子目录所使用的空间
3.3G    /opt/paas
24K     /opt/distribution-karaf-0.2.1-Helium-SR1.1
2.7G    /opt/iaas
441M    /opt/opendaylight
4.2G    /opt/centos
21G     /opt/
```

## yum
```
-y #对所有提问都回答 yes

yum install tree #安装包
yum reinstall tree #重新安装包
yum remove tree #移除包
yum search tree #搜索包
yum list #列出所有包
yum list installed #列出已安装的包
yum update #更新系统
yum check-update #更新包列表
yum repolist #列出源
yum provides /bin/bash #查找某一文件的提供包
yum info bash #查看软件包详情
yum clean all #删除缓存

添加源：add <repo> to /etc/yum.repos.d/
移除源：remove <repo> from /etc/yum.repos.d/
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

## passwd
```
-d #删除密码
-l #锁住密码     Lock
-u #解开锁住的密码     Unlock
-S #查看密码的相关信息     Status

passwd #更改当前登录用户密码
passwd mysql #更改 mysql 用户的密码
passwd -d root #删除 root 用户的密码，注意删除 root 用户密码后，便不能用 root 用户远程登录了
```

## history
```
history [选项]
-c #清空历史命令
-w #把缓存中的历史命令写入历史命令保存文件 ~/.bash_history

[root@controller ~]$ echo $HISTSIZE #存储数量由环境变量 `HISTSIZE` 控制，默认1000条
1000
[root@controller ~]$ history 10 #显示最近10条历史命令
   92  ls
   93  cd ..
   94  ls
   95  exit
   96  ls -a
   97  cd .ssh/
   98  ls
   99  cat known_hosts
  100  exit
  101  history 10

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

## free
```bash
-m #以 MB 为单位
-g #以 GB 为单位
-s 1 #每 1 秒更新内存使用情况

[root@controller ~]$ free -g
                    total       used       free     shared    buffers     cached
Mem:                11          2          9          0          0          0
-/+ buffers/cache:          2          9
Swap:                  7          0          7

total     内存总数     total=used+free
used     已使用的内存
free     空闲内存
shared     废弃内存
buffers     缓存内存
cached     缓存内存
-buffers/cache     used-buffers-cached 被程序实实在在使用的内存
+buffers/cache     free+buffers+cached 可以被挪用的内存
Swap     交换分区
```

## netstat
```
-a #显示所有端口
     -at #显示所有 TCP 端口
     -au #显示所有 UDP 端口
-l #只显示监听状态的端口     Listen
     同上
-s #显示所有端口的统计信息
     同上
-n #不解析 IP
-o #显示计时器
-p #显示PID     Program name
-r #显示核心路由     Route
-i #显示网络接口     Interface
-c #持续输出网络信息     Continue

[root@controller ~]$ netstat -anp | grep ssh #查找进程
tcp        0      0 0.0.0.0:22                  0.0.0.0:*                   LISTEN      1604/sshd
tcp        0      0 192.168.100.10:22           192.168.100.151:54704       ESTABLISHED 24349/sshd
tcp        0      0 :::22                       :::*                        LISTEN      1604/sshd
unix  2      [ ]         DGRAM                    4581866 24349/sshd
[root@controller ~]$ netstat -anp | grep ':80' #查找端口
tcp        0      0 0.0.0.0:8000                0.0.0.0:*                   LISTEN      2330/python
tcp        0      0 0.0.0.0:8004                0.0.0.0:*                   LISTEN      2322/python
tcp        0      0 :::80                       :::*                        LISTEN      1884/httpd
```

## ps
```
-A #显示所有程序
-f #显示所有内容
-e #与 `A` 选项相同

[root@controller ~]$ ps -ef | grep vim #查找进程
所属用户 进程ID 父进程ID                                进程名
root      7207  2965  0 11:30 pts/1    00:00:00 vim
root      7542  2965  0 11:30 pts/1    00:00:00 grep vim
[root@controller ~]$ kill -9 7207 #强制终止进程，默认终止进程发送信号15

[root@controller ~]$ kill -l #列出信号
 1) SIGHUP       2) SIGINT       3) SIGQUIT      4) SIGILL       5) SIGTRAP
 6) SIGABRT      7) SIGBUS       8) SIGFPE       9) SIGKILL     10) SIGUSR1
11) SIGSEGV     12) SIGUSR2     13) SIGPIPE     14) SIGALRM     15) SIGTERM
16) SIGSTKFLT   17) SIGCHLD     18) SIGCONT     19) SIGSTOP     20) SIGTSTP
21) SIGTTIN     22) SIGTTOU     23) SIGURG      24) SIGXCPU     25) SIGXFSZ
26) SIGVTALRM   27) SIGPROF     28) SIGWINCH    29) SIGIO       30) SIGPWR
31) SIGSYS      34) SIGRTMIN    35) SIGRTMIN+1  36) SIGRTMIN+2  37) SIGRTMIN+3
38) SIGRTMIN+4  39) SIGRTMIN+5  40) SIGRTMIN+6  41) SIGRTMIN+7  42) SIGRTMIN+8
43) SIGRTMIN+9  44) SIGRTMIN+10 45) SIGRTMIN+11 46) SIGRTMIN+12 47) SIGRTMIN+13
48) SIGRTMIN+14 49) SIGRTMIN+15 50) SIGRTMAX-14 51) SIGRTMAX-13 52) SIGRTMAX-12
53) SIGRTMAX-11 54) SIGRTMAX-10 55) SIGRTMAX-9  56) SIGRTMAX-8  57) SIGRTMAX-7
58) SIGRTMAX-6  59) SIGRTMAX-5  60) SIGRTMAX-4  61) SIGRTMAX-3  62) SIGRTMAX-2
63) SIGRTMAX-1  64) SIGRTMAX
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

/etc/inittab     系统默认运行级别配置文件,默认为3     initial table
0关机     1单用户     2不完全多用户(不含NFS服务)     3完全多用户(默认字符界面)     4未分配     5图形界面(X11)     6重启

Tips :
Ctrl+ALT+F1~7 #在图形界面和字符界面中切换
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

tar -xvf 123.tar.gz -C /tmp/ #指定解包位置
```

## CentOS 7

### hostnamectl
```bash
hostnamectl set-hostname controller     设置主机名

[root@controller ~]$ hostnamectl
Static hostname: controller
Icon name: computer-vm
Chassis: vm
Machine ID: 4c81baeee82945e8a47b4cdeb31bfc42
Boot ID: 2a89be262fa347159bb7243922dee933
Virtualization: vmware
Operating System: CentOS Linux 7 (Core)
CPE OS Name: cpe:/o:centos:centos:7
Kernel: Linux 3.10.0-514.el7.x86_64
Architecture: x86-64
```

## 退出登录
```
logout #退出并执行 ~/.bash_logout
exit #退出

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
whoami     euid 有效用户 当前操作的用户ID     Effective
who am i     uid 实际用户 登录时使用的用户ID

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
ps -e | grep nova | awk '{print $4}' | sort -u
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

ls `cat 123` # ` ` 包含的命令 bash 会先执行，其输出会作为另外一个命令的输入
ls && echo yes || echo no #判断命令是否执行成功
```

## 后台进程
```
Ctrl+Z     挂起当前命令
jobs #显示挂起的命令
bg %N #使第 N 个进程在后台运行     back
fg %N #使第 N 个进程在前台运行     front

Tips : bg 和 fg 不带 %N 时默认对最后一个进程进行操作
```

## 自定义登录信息
```
登录前 /etc/issue 本地设备     /etc/issue.net 远程设备
     \l 显示第几个终端机接口
     \d 日期
     \t 时间
登录后 /etc/motd     Message Of The Day
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

## Linux 快捷键
```
Ctrl+L     清屏     （另外 CMD 下的清屏命令是 `cls`）
Ctrl+Z     挂起当前命令
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
$+TAB*2     All Sys variables
```

## SecureCRT 快捷键
```bash
ALT+B     新建选项卡
Ctrl+TAB     切换选项卡
ALT+2     切换至第 2 个选项卡
ALT+Enter     全屏
Ctrl+Shift+V     粘贴
Shift+Insert     粘贴
```