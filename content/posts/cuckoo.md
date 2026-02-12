---
author: XhstormR
tags:
  - Notes
date: 2020-04-27T22:18:01+08:00
title: Cuckoo
---

<!--more-->

Updated on 2020-04-27

> https://github.com/cuckoosandbox/cuckoo
>
> https://cuckoo.sh/docs/installation/index.html

## Basic

```bash
conda config --add channels conda-forge
conda create -y -n myenv2 pycryptodome m2crypto python=2
conda activate myenv2

python -m pip install --index-url=https://mirrors.aliyun.com/pypi/simple/ --upgrade cuckoo M2CryptoWin64

cuckoo init
cuckoo community
cuckoo

cuckoo submit --package exe --options arguments="-Lvk http://www.qq.com" curl.exe
```

## Web

```bash
cuckoo web runserver 0.0.0.0:1234
```

### MongoDB

```bash
mongod --dbpath D:\Work\mongo\db --bind_ip_all

mongo
----
use admin
db.createUser({user: "root", pwd: "123456", roles: [{db: "admin", role: "root"}]})
use cuckoo
db.createUser({user: "123",  pwd: "123456", roles: [{db: "cuckoo", role: "dbOwner"}]})
db.getUsers()

mongod --dbpath D:\Work\mongo\db --bind_ip_all --auth
```

## API

```bash
cuckoo api -H 0.0.0.0 -p 1337

python -m pip install --index-url=https://mirrors.aliyun.com/pypi/simple/ --upgrade flask

curl -H "Authorization: Bearer giDMhiP63PZiCfnI0Oz3Yw" http://127.0.0.1:1337/tasks/list
```

## Misc

```bash
mklink cuckoo cuckoo.exe
```

```bash
tcpdump -D
getmac /fo list /v
```

```
Lib\site-packages\cuckoo\auxiliary\sniffer.py
----
err_whitelist_start
----
"tcpdump.exe: listening on ",
```

```bash
resultserver 的 IP 为主机 HOST-ONLY 网卡的 IPv4 地址，推荐设置为 192.168.137.1。
```

## Reference

- https://sec.xiaomi.com/article/45
- https://blog.csdn.net/baobaoyu_/article/details/103047082

---

- https://www.mongodb.com/download-center/community
- https://mirrors.huaweicloud.com/python/2.7.18/python-2.7.18.amd64.msi
- https://mirrors.tuna.tsinghua.edu.cn/virtualbox/virtualbox-Win-latest.exe
- https://mirrors.tuna.tsinghua.edu.cn/anaconda/miniconda/Miniconda3-latest-Windows-x86_64.exe
