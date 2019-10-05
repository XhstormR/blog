---
author: XhstormR
categories:
- Compile
date: 2019-10-03T17:00:34+08:00
title: 构建 tmux
---

<!--more-->

Updated on 2019-10-03

> https://github.com/tmux/tmux

```bash
wget https://github.com/tmux/tmux/archive/master.zip
unzip master.zip
cd tmux-master/

yum groups install 'Development Tools'
yum install -y ncurses-devel
yum install -y libevent-devel

sh autogen.sh
./configure && make install
```
