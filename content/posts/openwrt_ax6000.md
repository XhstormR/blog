---
title: OpenWrt Redmi AX6000
date: 2024-11-25T05:30:18+03:00
author: XhstormR
tags:
  - openwrt
---

<!--more-->

> https://openwrt.org/toh/xiaomi/redmi_ax6000
>
> https://firmware-selector.openwrt.org
>
> https://github.com/openwrt/openwrt

## uboot

- https://cmi.hanwckf.top/p/mt798x-uboot-usage/
- https://github.com/hanwckf/bl-mt798x/releases/latest

按住路由器的RESET按钮之后通电，保持至少15秒后松开，路由器会自动进入uboot的failsafe模式，由于uboot没有DHCP功能，需要把电脑的IP地址设置成静态IP `192.168.31.100/24`。

- 更新固件: `http://192.168.31.1/`
- 更新 uboot: `http://192.168.31.1/uboot.html`

```shell
scp -O '/Users/user/Downloads/mt7986_redmi_ax6000-fip-fixed-parts-multi-layout.bin' root@192.168.1.1:/tmp/
```

```shell
opkg update && opkg install wget kmod-mtd-rw
insmod /lib/modules/$(uname -r)/mtd-rw.ko i_want_a_brick=1

mtd write /tmp/mt7986_redmi_ax6000-fip-fixed-parts-multi-layout.bin FIP
mtd verify /tmp/mt7986_redmi_ax6000-fip-fixed-parts-multi-layout.bin FIP
```

## sing-box

- https://github.com/SagerNet/sing-box/releases
- https://github.com/openwrt/packages/blob/master/net/sing-box/files/sing-box.conf

```shell
opkg update && opkg install sing-box
service sing-box reload
service sing-box restart
service sing-box status
service sing-box info
```

### /etc/config/sing-box

```
option enabled '1'
option user 'root'
```

### /etc/sing-box/config.json

```json
"inbounds": [
  {
    "type": "tun",
    "address": [
      "172.19.0.1/30"
    ],
    "auto_route": true,
    "strict_route": true
  }
],
"experimental": {
  "clash_api": {
    "external_controller": "0.0.0.0:9090",
    "external_ui": "dashboard", // http://192.168.6.1:9090/ui/
    "secret": "123456"
  }
}
```

### 关联 tun 接口，分配防火墙区域

![](uploads/openwrt_ax6000_1.png)
![](uploads/openwrt_ax6000_2.png)

## Reference

- https://www.right.com.cn/forum/thread-8261104-1-1.html
- https://www.right.com.cn/forum/thread-8265832-1-1.html
