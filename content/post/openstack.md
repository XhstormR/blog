---
Categories:
- OpenStack
date: 2016-05-03T15:54:58+08:00
title: 自学 OpenStack
---

<!--more-->

Updated on 2016-05-26

> https://www.openstack.org/
>
> http://docs.openstack.org/
>
> ![](/uploads/openstack-architecture.png "概念架构")
> 概念架构 (Conceptual Architecture)
>
> ![](/uploads/openstack-architecture2.png "逻辑架构")
> 逻辑架构 (Logical Architecture)
>
> OpenStack is a cloud operating system that controls large pools of compute, storage, and networking resources throughout a datacenter, all managed through a dashboard that gives administrators control while empowering their users to provision resources through a web interface.
>
> OpenStack，1化N，通过虚拟化的方式提供灵活高利用率的计算能力。
>
> Hadoop，N化1，通过分布式文件系统解决单台大机器无法解决的计算和存储问题。

## Projects
![](/uploads/openstack-core.png)

### Core Services (6)
|NAME|SERVICE||
|:--|:--|:--|
|KEYSTONE|Identity|认证*|
|GLANCE|Image|镜像*|
|NOVA|Compute|计算*|
|NEUTRON|Networking|网络*|
|CINDER|Block Storage|块存储|
|SWIFT|Object Storage|对象存储|
|---------------------|-----------------------|------------|

### Optional Services (13)
|NAME|SERVICE||
|:--|:--|:--|
|Horizon|Dashboard|面板*|
|Heat|Orchestration|编配|
|Ceilometer|Telemetry|监控|
|Sahara|Elastic Map Reduce|大数据部署|
|.......|.......|
|---------------------|---------------------------|---------------|
`注 * 为本人必须安装项`

## KEYSTONE
![](/uploads/openstack-keystone.svg "流程")

* Keystone：一个公司的安全部门
  * Authentication(认证) 和 Authorization(授权)
  * 管理用户及其权限
  * 维护 Service 的 Endpoint
* Tenant：安全部门的多个办公室
  * 也叫 Project，将 OpenStack 的资源进行分组和隔离，是各个服务中的一些可以访问的资源集合
  * 资源所有权属于 Project，而不是 User
  * 所有 User 必须挂在 Project 里才能使用并且共享该 Project 里的资源
* User：在办公室上班的员工
  * User 指代任何使用 OpenStack 的实体，可以是用户或程序
  * User 可以属于多个 Project，针对每个 Project，User 拥有一个角色(Role)
* Role：安全部门内的各种权限 - Authorization(授权)
  * 可以为 User 分配多个 Role
  * OpenStack 默认定义了 2 种角色
      * member：典型用户
      * admin：超级管理用户，对所有 Project 都有完全的权限，相当于 root
* Service：被安全部门认可的职能
  * Service 通过 Endpoint 暴露自己的 API
  * Service 通过`policy.json`决定每个 Role 能做什么事
  * `policy.json`默认只区分`admin`和非`admin`Role；若要对特定 Role 进行授权，需要修改`policy.json`
* Endpoint：职能办公室的入口
  * User 通过 Endpoint 访问资源和执行操作
  * Endpoint 包含 3 种 URL
      * publicURL，可以被全局访问，外网普通服务入口 eg.http://controller:5000/v2.0
      * internalURL，只能被局域网访问，内网普通服务入口 eg.http://controller:5000/v2.0
      * adminURL，被从常规的访问中分离，内网管理员入口 eg.http://controller:35357/v2.0
          * Keystone 分业务端口(5000)和管理端口(35357)
* Token：访问职能办公室的钥匙
  * User 成功认证后由 Keystone 分配的字符串 - Authentication(认证)
  * 在与其他服务交互中只需要携带 Token 即可，Token 有效期默认为 24 小时

```
[root@controller ~]$ ps -e | grep keystone
 2385 ?        00:01:14 keystone-all
```

## GLANCE
![](/uploads/openstack-glance.svg "架构")

* glance-api：对外提供 REST API，响应 Image 查询、获取和存储的调用
  * glance-api 不会真正处理请求
      * 关于 Image Metadata 的相关操作，请求转发给 glance-registry
      * 关于 Image 自身获取的相关操作，请求转发给该 Image 的 Store backend
* glance-registry：负责处理和存取 Image 的 Metadata 到 Database 中
  * Glance 支持多种格式的 Image
  * Image 的 Metadata 会存储在 Database 中，默认是 MySQL > glance
* Store backend：Glance 自己并不存储 Image，真正的 Image 存放在 backed 中
  * Glance 支持多种 backed，默认是`Local File System`，存储在`/var/lib/glance/images`中
  * 除了上图列举出的 backed，还有 GridFS、Ceph、Sheepdog、VMware ESX

---------------------------------------![](/uploads/openstack-glance2.svg "Glance 与 OpenStack 其他 Service 间的关系")---------------------------------------

```
[root@controller ~]$ ps -e | grep glance | sort -uk 4
 2089 ?        00:00:00 glance-api
 2308 ?        00:00:00 glance-registry
```

## NOVA

* nova-api：接收和响应客户的 API 调用
* nova-scheduler：虚拟机调度服务，负责决定在哪个计算节点上运行虚拟机
* nova-compute：管理虚拟机的核心服务，通过调用 Hypervisor API 实现虚拟机生命周期管理
* nova-conductor：代替 nova-compute 访问数据库
* nova-consoleauth：负责对访问虚拟机控制台请求提供 Token 认证
* nova-console：用户可以通过多种方式访问虚拟机的控制台
  * nova-novncproxy：基于 Web 浏览器的 VNC 访问
  * nova-spicehtml5proxy：基于 HTML5 浏览器的 SPICE 访问
  * nova-xvpnvncproxy：基于 Java 客户端的 VNC 访问
* nova-cert：提供 x509 证书支持

---------
* Message Queue(消息队列)：子服务的信息中转站 - Qpid
* Database：MySQL

```
* 我采取的是双节点
[root@controller ~]$ ps -e | grep nova | sort -uk 4
 2427 ?        00:01:42 nova-api
 2435 ?        00:00:07 nova-cert
 2443 ?        00:01:40 nova-conductor
 2451 ?        00:00:07 nova-consoleaut
 2459 ?        00:00:02 nova-novncproxy     #nova-console
 2467 ?        00:00:07 nova-scheduler
[root@compute ~]$ ps -e | grep nova | sort -uk 4
 2173 ?        00:01:53 nova-compute
```