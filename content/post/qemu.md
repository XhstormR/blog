---
author: XhstormR
categories:
- Notes
date: 2018-04-20T10:29:55+08:00
title: QEMU
---

<!--more-->

Updated on 2018-04-22

> https://wiki.qemu.org/Documentation
>
> https://qemu.weilnetz.de/doc/qemu-doc.html

## QEMU

* https://qemu.weilnetz.de/w64/

```bash
创建镜像：qemu-img.exe create -f qcow2 123.qcow2 512M
安装系统：qemu-system-x86_64.exe -hda 123.qcow2 -m 512M -nographic -boot once=d,menu=on -cdrom alpine-virt-3.7.0-x86_64.iso
启动系统：qemu-system-x86_64.exe -hda 123.qcow2 -m 512M -nographic

脱离：Ctrl+Alt+G
全屏：Ctrl+Alt+F
```

## TAP

* https://build.openvpn.net/downloads/releases/tap-windows-9.22.1.zip

```bash
安装：tapinstall install OemVista.inf TAP0901
卸载：tapinstall remove TAP0901

重命名 TAP 接口
----
netsh interface show interface "以太网 2"
netsh interface set  interface "以太网 2" newname=my_tap
netsh interface show interface my_tap

https://github.com/OpenVPN/tap-windows6
```

## Linux

* [https://mirrors.tuna.tsinghua.edu.cn/alpine/latest-stable/releases/x86_64/alpine.iso](https://mirrors.tuna.tsinghua.edu.cn/alpine/latest-stable/releases/x86_64/alpine-virt-3.7.0-x86_64.iso)
* [https://mirrors.tuna.tsinghua.edu.cn/tinycorelinux/9.x/x86_64/release/CorePure64.iso](https://mirrors.tuna.tsinghua.edu.cn/tinycorelinux/9.x/x86_64/release/CorePure64-current.iso)

```bash
Alpine
----
设置：setup-alpine
安装：apk add curl tree vim
服务：rc-service -l
重启：reboot
关机：poweroff

允许 ROOT 用户密码登录 SSH
----
echo PermitRootLogin yes >> /etc/ssh/sshd_config
```

## Windows

* https://sourceforge.net/projects/reactos/files/ReactOS/

## 网络连接

### NAT

```bash
1. 无网络配置的缺省模式。
2. 虚拟机可以通过宿主机访问外网，但宿主机无法访问虚拟机。

配置端口转发，使宿主机能够访问虚拟机的 22 端口
----
-nic user,hostfwd=tcp::5555-:22
```

### TAP

```bash
-nic tap,ifname=my_tap,script=no
```

#### 桥接

```bash
1. TAP 接口和虚拟机的接口都为 DHCP。
2. TAP 接口和宿主机的主网络适配器组成网桥，使宿主机和虚拟机在同一网段。
3. 虚拟机的接口的 IP 地址将直接由外部路由器分配。

宿主机
----
netsh interface ipv4 set  address   my_tap dhcp
netsh interface ipv4 show addresses my_tap

虚拟机
----
dhcp
```

#### 非桥接

```bash
1. TAP 接口和虚拟机的接口都为 STATIC。
2. 虚拟机除网关 10.1.1.1 外，不能访问任何外部网络，但宿主机能够访问虚拟机，与 NAT 模式相反。
3. 怀疑是网关 10.1.1.1 的路由问题，有待解决。

宿主机
----
netsh interface ipv4 set  address   my_tap static 10.1.1.1 255.255.255.0
netsh interface ipv4 show addresses my_tap

虚拟机
----
static
address 10.1.1.15
netmask 255.255.255.0
gateway 10.1.1.1
```
