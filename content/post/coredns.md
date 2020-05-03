---
author: XhstormR
categories:
- Notes
date: 2020-05-03T10:03:50+08:00
title: CoreDNS
---

<!--more-->

Updated on 2020-05-03

> https://coredns.io/plugins/
>
> https://github.com/coredns/coredns

## Corefile
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
* https://www.alidns.com/faqs/#dns-safe
