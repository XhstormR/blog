---
author: XhstormR
tags:
- security
date: 2020-01-23T21:31:52+08:00
title: Patator
---

<!--more-->

Updated on 2020-01-23

> https://github.com/lanjelot/patator
>
> https://github.com/danielmiessler/SecLists

```bash
docker pull parrotsec/security:latest
docker run -it --rm -v `pwd`:`pwd` -w `pwd` parrotsec/security
patator http_fuzz --help
```

```bash
wget https://mirrors.aliyun.com/kali/pool/main/s/seclists/seclists_2020.1.orig.tar.gz
tar -xvf seclists_2020.1.orig.tar.gz
```
