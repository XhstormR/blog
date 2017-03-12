+++
Categories = ["Notes"]
date = "2017-01-14T08:49:47+08:00"
title = "Windows SSH Server"

+++

<!--more-->

Updated on 2017-01-14

> http://man.openbsd.org/sshd_config
>
> https://github.com/git-for-windows/git/releases/latest

## 配置
```bash
D:\Work\BLOG\GIT>

type nul > etc\passwd
echo sshd:x:74:74:Privilege-separated SSH:/var/empty/sshd:/sbin/nologin > etc\passwd

md var\empty\sshd

usr\bin\ssh-keygen -A

可选：

type nul > etc\motd
echo 登录信息： > etc\motd
echo 你好！ >> etc\motd

type nul > etc\ssh\sshd_config
echo PrintMotd yes > etc\ssh\sshd_config
echo PermitRootLogin no >> etc\ssh\sshd_config
echo PasswordAuthentication no >> etc\ssh\sshd_config
echo Subsystem sftp internal-sftp >> etc\ssh\sshd_config
echo AuthorizedKeysFile .ssh/authorized_keys >> etc\ssh\sshd_config

usr\bin\ssh-keygen
copy /y "C:\Users\XhstormR\.ssh\id_rsa.pub" "C:\Users\XhstormR\.ssh\authorized_keys"

PS：
md .12     创建空文件夹（`.` 前缀）
type nul > .123     创建空文件（`.` 前缀）
```

## 启动
```bash
D:\Work\BLOG\GIT\usr\bin\sshd
```

## 停止
```bash
netstat -ano | findstr "0.0.0.0:22"

tasklist | findstr "16940"

taskkill /f /t /im sshd.exe

简化：

netstat -ano | findstr "0.0.0.0:22"

taskkill /f /t /pid 16940

简化：

taskkill /f /t /im sshd.exe
```
