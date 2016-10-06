+++
Categories = ["OpenStack"]
date = "2016-05-07T08:15:41+08:00"
title = "OpenStack 不完全使用手册"

+++

<!--more-->

Updated on 2016-10-06

> ![](/uploads/openstack-logo.svg)

## curl - *命令行浏览器*
*OpenStack 服务提供 RESTful API，而 curl 能通过命令行直接发送和接收 HTTP 的请求和响应*
```bash
-X [HEAD,POST,GET,PUT,DELETE] # 指定 HTTP 的请求类型     Request
-H "name:123" #添加 HTTP 请求头     Header
-D [123,-] #将 HTTP 响应头输出到[文件或终端]     Dump
-i #同时显示 HTTP 响应头     Include
-I #只显示文档信息     Head
-u admin:pass #登录授权页面     User
-k #忽略 HTTPS 的证书     Insecure
-s #不显示进度条     Silent
-v #显示详细信息     Verbose
-------------------------------------------------------
-A "Mozilla/5.0 (Linux; Android 5.1.1; Nexus 6 Build/LYZ28E) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/44.0.2403.20 Mobile Safari/537.36" #指定 User-Agent
-e "www.qq.com" #指定 Referer URL
-x 10.34.3.71:808 #指定代理服务器
-o "123.7z" #保存至本地
-O #根据服务器上的文件名自动保存至本地
-b "NAME1=VALUE1; NAME2=VALUE2" #设置 Cookie
-b 123.txt #读取 Cookie
-c 123.txt #保存 Cookie
-C - #断点续传     Continue
-L #自动重定向     Location
--limit-rate 200K #限速

curl -s -H "X-Auth-Token:123" http://0.0.0.0:35357/v2.0/tenants | python -mjson.tool #格式化输出 JSON

[root@controller ~]$ a=`keystone token-get | awk 'NR==5{print $4}'`
[root@controller ~]$ echo $a
[root@controller ~]$ curl -H "X-Auth-Token:$a" http://0.0.0.0:35357/v2.0/tenants
-------------------------------------------------------
[root@controller ~]$ keystone --debug tenant-list     v2.0
[root@controller ~]$ glance --debug image-list     v1
[root@controller ~]$ nova --debug list     v2
-------------------------------------------------------
keystone catalog
nova endpoints
-------------------------------------------------------
openstack-status
openstack-service restart
```

## KEYSTONE
```bash
keystone token-get | awk 'NR==5{print $4}'     获取 Token     第5行第4列
nova endpoints | grep -A 7 keystone     获取 Endpoint     35357
curl -H "X-Auth-Token:$a" http://0.0.0.0:35357/v2.0/users     返回用户
curl -H "X-Auth-Token:$a" http://0.0.0.0:35357/v2.0/users/123     返回某个用户
curl -H "X-Auth-Token:$a" http://0.0.0.0:35357/v2.0/tenants     返回租户
curl -H "X-Auth-Token:$a" http://0.0.0.0:35357/v2.0/tenants/123     返回某个租户
curl -H "X-Auth-Token:$a" http://0.0.0.0:35357/v2.0/tenants/123/users/123/roles     返回某个租户上用户被授予的角色
curl -H "X-Auth-Token:$a" http://0.0.0.0:35357/v2.0/endpoints     返回服务端点
curl -H "X-Auth-Token:$a" http://0.0.0.0:35357/v2.0/tokens/$a     检验 Token 有效性，并返回 Token 信息
curl -I -H "X-Auth-Token:$a" http://0.0.0.0:35357/v2.0/tokens/$a     使用 Header 校验 Token 有效性
-------------------------------------------------------
keystone user-role-list --user 123 --tenant admin     查看用户在某个租户中的角色
keystone --os-token 123 --os-endpoint http://0.0.0.0:35357/v2.0 user-role-add --user admin --role admin --tenant admin     使用 Token 鉴权     keystone.conf - admin_token = 123
     Token 验证
     export OS_SERVICE_TOKEN=cacb79002f
     export OS_SERVICE_ENDPOINT=http://0.0.0.0:35357/v2.0
     -----------
     Password 验证
     export OS_USERNAME=admin
     export OS_PASSWORD=000000
     export OS_TENANT_NAME=admin
     export OS_AUTH_URL=http://0.0.0.0:35357/v2.0
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
glance image-create --name centos6.5 --disk-format qcow2 --container-format bare --is-public True --progress < centos_65_x86_6420140327.qcow2     上传镜像
glance image-update centos6.5 --property hw_disk_bus=scsi --property hw_scsi_model=virtio-scsi     更新镜像
glance image-update centos6.5 --name centos6.5_scsi     更新镜像
     Property：
     hw_disk_bus=scsi
     hw_scsi_model=virtio-scsi
     hw_cdrom_bus=ide
-------------------------------------------------------
CirrOS
http://download.cirros-cloud.net/
user:cirros     password:cubswin:)
glance image-create --name cirros --disk-format qcow2 --container-format bare < cirros-0.3.4-x86_64-disk.img
```

## NOVA
```
nova secgroup-list     列出安全组
nova secgroup-list-rules default     查看安全组
nova secgroup-add-rule default tcp 1 65535 0.0.0.0/0     添加规则
nova secgroup-add-rule default udp 1 65535 0.0.0.0/0     添加规则
nova secgroup-add-rule default icmp -1 -1 0.0.0.0/0     添加规则
-------------------------------------------------------
nova keypair-list     列出密钥对
nova keypair-add 123 > 123.priv     创建密钥对
nova keypair-add --pub-key /root/.ssh/id_rsa.pub 123     添加密钥对     事先已做 ssh-keygen
-------------------------------------------------------
nova flavor-list     列出 VM 类型
nova flavor-create 123 auto 1024 20 1     创建 VM 类型     名称 编号 内存 磁盘 内核
-------------------------------------------------------
nova boot --flavor m1.small --image centos6.5 --nic net-id=17589f7c-0504-4485-8c13-53f1b306eab1 123     创建实例
nova list     列出实例     virsh list --all
nova show 123     查看实例
nova suspend 123     暂停实例
nova resume 123     恢复实例
nova start 123     启动实例
nova stop 123     停止实例
nova reboot 123     重启实例
nova delete 123     终止实例
nova rename 123 swift     重命名实例
nova image-create 123 snapshot1     为实例创建快照
nova console-log 123     查看启动日志
nova get-vnc-console 123 novnc     获取 VNC URL，通过游览器访问
nova usage-list     列出平台资源使用情况
nova hypervisor-stats     列出虚拟机监控器统计数据
-------------------------------------------------------
nova volume-list     列出云硬盘     CINDER
nova volume-show test     显示云硬盘     CINDER
nova volume-create --display-name test 1     创建云硬盘     CINDER
nova volume-attach 123 5495c0aa-896d-4a50-b40f-3a0730cd6a64     为实例挂载云硬盘     CINDER
nova volume-detach 123 5495c0aa-896d-4a50-b40f-3a0730cd6a64     为实例断开云硬盘     CINDER
-------------------------------------------------------
nova floating-ip-pool-list     列出浮动 IP 池(外部网络)     GRE网络
nova floating-ip-list     列出获取的浮动 IP     GRE网络
nova floating-ip-create ext     获取浮动 IP     GRE网络
nova floating-ip-associate 123 192.168.200.105     关联浮动 IP     GRE网络
```

## CINDER
```
3：MySQL+KEYSTONE+CINDER
-------------------------------------------------------
```

## SWIFT
```
3：MySQL+KEYSTONE+SWIFT
-------------------------------------------------------
swift-init all restart     重新启动所有 SWIFT 服务
swift -U 1:1 -K 1 -V 2 -A http://0.0.0.0:35357/v2.0 stat     查看特定用户信息
swift --os-username=1 --os-password=1 --os-tenant-name=1 --os-auth-url=http://0.0.0.0:35357/v2.0 stat     查看特定用户信息
```

## Heat
```
heat stack-list     列出栈
heat stack-create -f server.yml  -P ImageID=centos6.5 -P NetID=int mystack     创建栈
heat event-list mystack     查看栈的事件日志
heat event-show mystack server1 d9c12983-d4df-42ad-bd01-350c9b8abfd6     查看事件日志的详细信息
```

## Ceilometer
```
ceilometer meter-list     查看所有测量值
ceilometer resource-list     查看所有资源
ceilometer resource-show -r  a3f74bc8-8200-4345-9f07-fa4aae11567d     查看资源详情
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

---

## GLANCE

使用未加 SCSI 属性的镜像创建的VM - virtio-blk

![](/uploads/openstack-glance-normal.png "virtio-blk")

使用已加 SCSI 属性的镜像创建的VM - virtio-scsi（更灵活、更具扩展性）

![](/uploads/openstack-glance-scsi.png "virtio-scsi")