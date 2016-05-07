+++
Categories = ["OpenStack"]
date = "2016-05-07T08:15:41+08:00"
title = "OpenStack 不完全使用手册"

+++

<!--more-->

Updated on 2016-05-08

>

## curl
```bash
-X [HEAD,POST,PUT,GET,DELETE] # 描述 HTTP 的请求方法     Request
-H "name:123" #添加 HTTP 请求头     Header
-D [123,-] #将 HTTP 响应头输出到[文件或stdout]     Dump
-I #只显示 HTTP 响应头     Head
-u admin:pass #登录授权页面     User
-k #忽略 HTTPS 的证书     Insecure
-v #显示详细信息     Verbose

curl -D - -H "X-Auth-Token:123" http://0.0.0.0:35357/v2.0/tenants
curl -D 123 -H "X-Auth-Token:123" http://0.0.0.0:35357/v2.0/tenants | python -mjson.tool #格式化输出 JSON
```

## KEYSTONE
```bash
keystone token-get     获取 Token
curl -H "X-Auth-Token:123" http://0.0.0.0:35357/v2.0/users | python -mjson.tool     返回用户
curl -H "X-Auth-Token:123" http://0.0.0.0:35357/v2.0/users/123 | python -mjson.tool     返回某个用户
curl -H "X-Auth-Token:123" http://0.0.0.0:35357/v2.0/tenants | python -mjson.tool     返回租户
curl -H "X-Auth-Token:123" http://0.0.0.0:35357/v2.0/tenants/123 | python -mjson.tool     返回某个租户
curl -H "X-Auth-Token:123" http://0.0.0.0:35357/v2.0/tenants/123/users/123/roles | python -mjson.tool     返回某个租户上用户被授予的角色
-------------------------------------------------------

```

## GLANCE
```bash
keystone token-get     获取 Token
nova endpoints | grep -A 7 glance     获取 Endpoint
curl -H "X-Auth-Token:123" http://0.0.0.0:9292/v1/images/ | python -mjson.tool     返回镜像列表
curl -H "X-Auth-Token:123" http://0.0.0.0:9292/v1/images/detail | python -mjson.tool     返回镜像列表(详细)
curl -I -X HEAD -H "X-Auth-Token:123" http://0.0.0.0:9292/v1/images/123     返回某个镜像的 Metadata
curl -X GET -H "X-Auth-Token:123" http://0.0.0.0:9292/v1/images/123 > test.img     下载某个镜像
-------------------------------------------------------

```