---
author: XhstormR
categories:
- security
date: 2020-01-21T19:59:06+08:00
title: BeEF
---

<!--more-->

Updated on 2020-01-21

> {{< image "uploads/beef.png" "BeEF" "1" "1" >}}
>
> https://github.com/beefproject/beef
>
> https://github.com/beefproject/beef/wiki

## Native

```bash
wget https://github.com/beefproject/beef/archive/master.zip
unzip master.zip
cd beef-master/

./install
./set-new-pass.rb config.yaml 123456
./beef -p 9527 &
```

### Ruby

```bash
curl -sSL https://get.rvm.io | bash -s stable
source /etc/profile.d/rvm.sh
rvm reload
rvm install 2.7
rvm use 2.7 --default
gem sources --add https://mirrors.tuna.tsinghua.edu.cn/rubygems/ --remove https://rubygems.org/

rvm list known
rvm -v
ruby -v
gem -v
gem sources -l
```

### SQLite
* https://pkgs.org/download/sqlite
* https://kojipkgs.fedoraproject.org/packages/sqlite

```bash
curl -O https://kojipkgs.fedoraproject.org/packages/sqlite/3.11.0/1.fc22/x86_64/sqlite-3.11.0-1.fc22.x86_64.rpm
curl -O https://kojipkgs.fedoraproject.org/packages/sqlite/3.11.0/1.fc22/x86_64/sqlite-libs-3.11.0-1.fc22.x86_64.rpm
curl -O https://kojipkgs.fedoraproject.org/packages/sqlite/3.11.0/1.fc22/x86_64/sqlite-devel-3.11.0-1.fc22.x86_64.rpm
yum -y install *
```

## Docker

### Kali
```bash
docker pull kalilinux/kali-rolling:latest
docker run -it -p 9527:9527 kalilinux/kali-rolling
apt update && apt -y install beef-xss
cd /usr/share/beef-xss && ls -l
```

### Parrot
```bash
docker pull parrotsec/security:latest
docker run -it -p 9527:9527 parrotsec/security
cd /usr/share/beef-xss && ls -l
```

---

```bash
docker start b37fcb2827f8
docker exec -it b37fcb2827f8 bash
```

```bash
export LANG=C.UTF-8
export LANGUAGE=C.UTF-8
export LC_ALL=C.UTF-8
locale
```
