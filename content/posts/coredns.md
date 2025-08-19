---
author: XhstormR
tags:
- Notes
date: 2020-05-03T10:03:50+08:00
title: Proxy DNS
---

<!--more-->

Updated on 2020-05-03

## V2Ray
* https://github.com/v2fly/v2ray-core
* https://www.v2fly.org/guide/start.html

```json
{
  "inbound": {
    "port": 1080,
    "listen": "127.0.0.1",
    "protocol": "socks"
  },
  "outbound": {
    "protocol": "freedom",
    "settings": {
        "domainStrategy": "UseIPv4"
    }
  },
  "dns": {
    "queryStrategy": "UseIPv4",
    "disableCache": false,
    "servers": [
      "https://9.9.9.9/dns-query"
    ]
  }
}
```

## Clash
* https://dreamacro.github.io/clash/
* https://github.com/Dreamacro/clash/wiki/Configuration

```yaml
dns:
    enable: true
    default-nameserver:
        - 8.8.8.8
    nameserver:
        - https://9.9.9.9/dns-query
```

```bash
curl 'https://www.google.com' -Ivx socks5h://127.0.0.1:1080
```

## CoreDNS
* https://github.com/coredns/coredns
* https://coredns.io/plugins/

### Corefile
```
. {
    forward . tls://223.5.5.5 tls://223.6.6.6 {
        tls_servername dns.alidns.com
    }
    log
    errors
    cache
}
```

```bash
nslookup google.com 127.0.0.1
```

## Reference
* https://www.alidns.com
