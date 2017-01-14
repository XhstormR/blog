+++
Categories = ["Notes"]
date = "2017-01-14T08:49:47+08:00"
title = "Windows SSH Server"

+++

<!--more-->

Updated on 2017-01-14

> https://github.com/git-for-windows/git/releases/latest

## 配置
```bash
D:\Work\BLOG\GIT>

md var\empty\sshd

type nul > etc\passwd
echo sshd:x:74:74:Privilege-separated SSH:/var/empty/sshd:/sbin/nologin > etc\passwd

usr\bin\ssh-keygen -A

可选：

usr\bin\ssh-keygen
copy /y "C:\Users\XhstormR\.ssh\id_rsa.pub" "C:\Users\XhstormR\.ssh\authorized_keys"

type nul > etc\motd
echo 登录信息： > etc\motd
echo 你好！ >> etc\motd

echo PrintMotd yes >> etc\ssh\sshd_config
echo PermitRootLogin no >> etc\ssh\sshd_config
echo PasswordAuthentication no >> etc\ssh\sshd_config
echo Subsystem sftp internal-sftp >> etc\ssh\sshd_config
```

## 启动
```bash
D:\Work\BLOG\GIT\usr\bin\sshd
```

## 停止
```bash
netstat -ano | find "0.0.0.0:22"

tasklist | find "16940"

taskkill /f /t /im sshd.exe

简化：

netstat -ano | find "0.0.0.0:22"

taskkill /f /t /pid 16940

简化：

taskkill /f /t /im sshd.exe
```
