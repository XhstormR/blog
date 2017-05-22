---
author: XhstormR
categories:
- Spring
date: 2017-05-21T20:11:22+08:00
title: Spring Framework
---

<!--more-->

Updated on 2017-05-21

> {{< image "/uploads/spring.png" "Spring Framework" "1" "1" >}}
>
> https://spring.io/projects
>
> https://github.com/spring-projects/spring-framework
>
> https://docs.spring.io/spring/docs/current/javadoc-api/allclasses-noframe.html

## Concept
* 控制反转（IOC）：应用程序本身不负责依赖对象的创建与维护，而是**由外部容器负责管理**。
  * 依赖注入（DI）是其实现方式。
  * 作用：**创建** 对象并 **维护** 对象之间的依赖关系。

## Configuration
### build.gradle.kts
```bash
compile("org.springframework:spring-context:+")
```

### 123.xml
```xml
<?xml version='1.0' encoding='utf-8'?>
<!DOCTYPE beans PUBLIC
        "-//SPRING//DTD BEAN 2.0//EN"
        "http://www.springframework.org/dtd/spring-beans-2.0.dtd">
<beans>
</beans>
```
