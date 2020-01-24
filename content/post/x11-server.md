---
author: XhstormR
categories:
- Notes
date: 2020-01-24T11:05:41+08:00
title: X11 Server
---

<!--more-->

Updated on 2020-01-24

> https://www.x.org/releases/individual/
>
> https://www.x.org/wiki/ModuleDescriptions/
>
> https://man.openbsd.org/sshd_config

```bash
yum -y install xorg-x11-apps xorg-x11-xauth xorg-x11-server-Xorg

echo X11Forwarding yes >> /etc/ssh/sshd_config
echo AddressFamily inet >> /etc/ssh/sshd_config
systemctl restart sshd

echo $DISPLAY
xeyes
xmessage -file .bashrc
```

## Docker X11 Forward
```bash
docker run -it --rm -v $HOME/.Xauthority:$HOME/.Xauthority:ro -e DISPLAY --net=host parrotsec/security
```

## Reference
* https://bugzilla.redhat.com/show_bug.cgi?id=1027197
* https://stackoverflow.com/questions/16296753/can-you-run-gui-applications-in-a-docker-container
