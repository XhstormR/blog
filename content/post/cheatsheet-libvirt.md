+++
Categories = ["CheatSheet"]
date = "2016-04-06T11:28:51+08:00"
title = "Libvirt 不完全使用手册"

+++

<!--more-->

Updated on 2016-05-31

> https://libvirt.org/
>
> http://wiki.qemu.org/Main_Page
>
> http://www.linux-kvm.org/page/Main_Page
>
> https://qemu.weilnetz.de/w64/
>
> KVM 负责 CPU 和 RAM 的虚拟化；QEMU 则负责模拟 IO 设备，如网卡和硬盘；KVM 加上 QEMU 之后就能实现真正意义上的服务器虚拟化，称之为 QEMU-KVM。
>
> 而 Libvirt 则是调用 KVM 虚拟化技术的接口间接控制 QEMU-KVM，包含一个API库，一个守护程序 Libvirtd，一个命令行工具 virsh，如果直接用 QEMU-KVM 的接口会非常繁琐。另外 OpenStack 也是用 Libvirt 的库管理 VM，可以控制除了 QEMU 以外的模拟器，包括 VMWARE, VirtualBox, Xen等等。

## Libvirt 部分
```
yum -y install virt-manager
yum -y install libvirt
yum -y install kvm
yum -y install libguestfs-tools

[root@controller ~]$ virsh net-start default #启动虚拟网络
[root@controller ~]$ virsh net-list #查看虚拟网络，默认为 NAT
Name                 State      Autostart     Persistent
--------------------------------------------------
default              active     yes           yes
[root@controller ~]$ qemu-img create -f qcow2 /tmp/1.qcow2 10G #创建 qcow2 虚拟磁盘
[root@controller ~]$ virt-install --virt-type kvm --name 1 --ram 1024 \
--cdrom /tmp/CentOS-6.5-x86_64-bin.iso \
--disk /tmp/1.qcow2,size=10,format=qcow2 \
--network network=default \
--graphics vnc,listen=0.0.0.0 --noautoconsole \
--os-type=linux --os-variant=rhel6 #创建虚拟机，使用 VNC 远程链接虚拟机
[root@controller ~]$ virsh list #查看已启动的虚拟机
 Id    Name                           State
----------------------------------------------------
 1     1                             running
[root@controller ~]$ virsh vncdisplay 1 #查看 VNC 端口为5901
:1
[root@controller ~]$ virsh start 1 #启动虚拟机
[root@controller ~]$ virsh destroy 1 #停止虚拟机（粗暴）

virt-install --os-variant list #查看支持系统版本
virsh list --all #列出所有虚拟机
virsh dominfo 1 #查看虚拟机
virsh dumpxml 1 #显示虚拟机配置文件内容
virsh define /tmp/1.xml #添加虚拟机     定义
virsh create /tmp/1.xml #添加并创建虚拟机
virsh undefine 1 #移除虚拟机     取消定义
virsh suspend 1 #暂停虚拟机
vrish resume 1 #恢复虚拟机
virsh shutdown 1 #停止虚拟机（优雅），需要 `yum -y install acpid`
virsh save 1 /tmp/1save #生成虚拟机快照，跳过文件系统缓存--bypass-cache，同时生成XML配置文件--xml 1，还原后自动启动--running
virsh restore /tmp/1save --bypass-cache --running #还原虚拟机，需先关闭虚拟机
virsh domblklist 1 #查看虚拟机使用的磁盘文件
qemu-img info 1.qcow2 #查看虚拟磁盘信息
virt-cat 1.qcow2 /etc/passwd #查看虚拟磁盘里的文件
virt-edit 1.qcow2 /etc/passwd #编辑虚拟磁盘里的文件，虚拟机必须处于关机状态
virt-df -h 1.qcow2 #查看虚拟磁盘使用情况
virt-copy-out 1.qcow2 /etc/passwd /tmp/ #拷贝虚拟磁盘中的 passwd 文件到 /tmp 目录下
virt-copy-in 1.qcow2 /tmp/1.txt /root/ #拷贝本地的 1.txt 文件到虚拟磁盘的 /root/ 目录下

[root@controller ~]$ virt-host-validate #检查配置是否正确
QEMU: Checking for hardware virtualization                                 : PASS
QEMU: Checking for device /dev/kvm                                         : PASS
QEMU: Checking for device /dev/vhost-net                                   : PASS
QEMU: Checking for device /dev/net/tun                                     : PASS
LXC: Checking for Linux >= 2.6.26                                         : PASS
[root@controller ~]$ dmesg | grep kvm #检查内核日志
[root@controller ~]$ lsmod | grep kvm #显示加载到内核中的模块的状态信息
kvm_intel              54285  0
kvm                   333172  1 kvm_intel
名称     大小     依赖模块个数     依赖模块内容

Tips：
虚拟机配置文件在 /etc/libvirt/qemu/
虚拟网络配置文件在 /etc/libvirt/qemu/networks/
最好关闭虚拟机内部的 iptables selinux
     service iptables stop
     chkconfig iptables off
     /etc/selinux/config 修改为 SELINUX=disabled
     setenforce 0
```

## OpenStack 部分
```
[root@controller ~]$ virt-sysprep -d 1 #清理虚拟机，如 MAC 地址
[root@controller ~]$ virsh undefine 1 #取消定义虚拟机
[root@controller ~]$ virt-sparsify --compress /tmp/1.qcow2 /tmp/1done.qcow2 #压缩镜像（可选）
[root@controller ~]$ glance image-create --name 1 --disk-format qcow2 --container-format bare < /tmp/1.qcow2 #上传镜像
```