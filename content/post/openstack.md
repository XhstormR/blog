+++
Categories = ["OpenStack"]
date = "2016-05-03T15:54:58+08:00"
title = "自学 OpenStack"

+++

<!--more-->

Updated on May 5, 2016

> https://www.openstack.org/
>
> http://docs.openstack.org/
>
> ![](/uploads/openstack-architecture.png)
> 概念架构 (Conceptual Architecture)
>
> ![](/uploads/openstack-architecture2.png)
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
|---------------------|---------------------|

### Optional Services (13)
|NAME|SERVICE||
|:--|:--|:--|
|Horizon|Dashboard|面板*|
|Heat|Orchestration|编配|
|Ceilometer|Telemetry|监控|
|Sahara|Elastic Map Reduce|大数据部署|
|.......|.......|
|---------------------|---------------------|
`注 * 为本人必须安装项`

## KEYSTONE