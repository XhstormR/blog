---
author: XhstormR
categories:
- Notes
date: 2020-10-12T15:31:42+08:00
title: JDK Keytool
---

<!--more-->

Updated on 2020-10-12

>

```
生成密钥对：
keytool -genkeypair -keystore release.p12 -storepass changeit -storetype pkcs12 -alias release -keyalg RSA -dname "cn=123" -ext "san=dns:*.example.com,ip:127.0.0.1" -validity 365
keytool -list       -keystore release.p12 -storepass changeit -storetype pkcs12

导出证书：
keytool -exportcert -keystore release.p12 -storepass changeit -alias release -file release.cer -rfc
keytool -printcert -file release.cer

信任证书：
keytool -importcert -cacerts -trustcacerts -storepass changeit -alias release -file release.cer -noprompt
keytool -list -cacerts -storepass changeit

删除证书：
keytool -delete -cacerts -trustcacerts -storepass changeit -alias release

转换密钥对格式：
keytool -importkeystore ^
-srckeystore release.p12 -srcstoretype pkcs12 -srcstorepass changeit ^
-destkeystore release.jks -deststoretype jks -deststorepass changeit
```

```
导出证书：
openssl pkcs12 -in release.p12 -password pass:changeit -out cer.pem -nokeys

导出私钥：
openssl pkcs12 -in release.p12 -password pass:changeit -out key.pem -nocerts -nodes
```

## Reference
* https://docs.oracle.com/en/java/javase/15/docs/specs/man/keytool.html
