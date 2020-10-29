---
author: XhstormR
categories:
- Notes
date: 2020-10-13T11:18:15+08:00
title: JBoss Keycloak
---

<!--more-->

Updated on 2020-10-13

> https://hub.docker.com/r/jboss/keycloak
>
> https://www.keycloak.org/documentation
>
> https://github.com/keycloak/keycloak
>
> https://github.com/keycloak/keycloak-documentation

```
关闭强制 SSL 连接
/opt/jboss/keycloak/bin/kcadm.sh update realms/master -s sslRequired=NONE --server http://localhost:8080/auth --realm master --user admin
```
