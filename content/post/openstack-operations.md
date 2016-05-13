+++
Categories = ["OpenStack"]
date = "2016-05-07T08:15:41+08:00"
title = "OpenStack 不完全使用手册"

+++

<!--more-->

Updated on 2016-05-11

> ![](/uploads/openstack-logo.svg)

## curl
*OpenStack 服务提供 RESTful API，而 curl 能通过命令行直接发送和接收 HTTP 的请求和响应*
```bash
-X [HEAD,POST,GET,PUT,DELETE] # 指定 HTTP 的请求类型     Request
-H "name:123" #添加 HTTP 请求头     Header
-D [123,-] #将 HTTP 响应头输出到[文件或stdout]     Dump
-i #同时显示 HTTP 响应头     Include
-I #只显示文档信息     Head
-u admin:pass #登录授权页面     User
-k #忽略 HTTPS 的证书     Insecure
-s #不显示进度条     Silent
-v #显示详细信息     Verbose

curl -s -H "X-Auth-Token:123" http://0.0.0.0:35357/v2.0/tenants | python -mjson.tool #格式化输出 JSON

[root@controller ~]$ a=`keystone token-get | awk 'NR==5{print $4}'`
[root@controller ~]$ echo $a
[root@controller ~]$ curl -H "X-Auth-Token:$a" http://0.0.0.0:35357/v2.0/tenants
```

## KEYSTONE
```bash
keystone token-get | awk 'NR==5{print $4}'     获取 Token     第5行第4列
nova endpoints | grep -A 7 Keystone     获取 Endpoint     35357
curl -H "X-Auth-Token:$a" http://0.0.0.0:35357/v2.0/users     返回用户
curl -H "X-Auth-Token:$a" http://0.0.0.0:35357/v2.0/users/123     返回某个用户
curl -H "X-Auth-Token:$a" http://0.0.0.0:35357/v2.0/tenants     返回租户
curl -H "X-Auth-Token:$a" http://0.0.0.0:35357/v2.0/tenants/123     返回某个租户
curl -H "X-Auth-Token:$a" http://0.0.0.0:35357/v2.0/tenants/123/users/123/roles     返回某个租户上用户被授予的角色
curl -H "X-Auth-Token:$a" http://0.0.0.0:35357/v2.0/endpoints     返回服务端点
curl -H "X-Auth-Token:$a" http://0.0.0.0:35357/v2.0/tokens/$a     检验 Token 有效性，并返回 Token 信息
curl -I -H "X-Auth-Token:$a" http://0.0.0.0:35357/v2.0/tokens/$a     使用 Header 校验 Token 有效性
-------------------------------------------------------

```

## GLANCE
```bash
keystone token-get | awk 'NR==5{print $4}'     获取 Token     第5行第4列
nova endpoints | grep -A 7 glance     获取 Endpoint     9292
curl -H "X-Auth-Token:$a" http://0.0.0.0:9292/v1/images     返回镜像列表
curl -H "X-Auth-Token:$a" http://0.0.0.0:9292/v1/images/detail     返回镜像列表(详细)
curl -H "X-Auth-Token:$a" http://0.0.0.0:9292/v1/images/detail?name=centos     返回某个镜像的详细信息
curl -H "X-Auth-Token:$a" http://0.0.0.0:9292/v2/images     返回镜像列表(详细)
curl -H "X-Auth-Token:$a" http://0.0.0.0:9292/v2/images/123     返回某个镜像的详细信息
curl -I -X HEAD -H "X-Auth-Token:$a" http://0.0.0.0:9292/v1/images/123     返回某个镜像的 Metadata
curl -X GET -H "X-Auth-Token:$a" http://0.0.0.0:9292/v1/images/123 > test.img     下载某个镜像
-------------------------------------------------------

```

## Sahara
```
ssh cloud-user@192.168.200.104
sudo passwd root #修改 root 密码
su #转到 root 用户
passwd cloud-user #修改 cloud-user 密码
passwd hadoop #修改 hadoop 密码
su hadoop #转到 hadoop 用户
jps #查看 Hadoop 进程，开始 Hadoop 操作 >>>
```