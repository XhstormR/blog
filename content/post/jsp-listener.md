---
author: XhstormR
categories:
- JSP
date: 2017-05-02T15:08:50+08:00
title: JSP Listener
---

<!--more-->

Updated on 2017-05-02

>

## 工作原理
用于监听 ServletContext、ServletRequest、HttpSession 等对象的创建、销毁以及属性增删事件。

* 按监听对象划分
  * ServletContext（application）
      * Servlet**Context**Listener
      * Servlet**Context**AttributeListener
  * ServletRequest（request）
      * Servlet**Request**Listener
      * Servlet**Request**AttributeListener
  * HttpSession（session）
      * Http**Session**Listener
      * Http**Session**AttributeListener
  * JavaBean
      * Http**Session**BindingListener（绑定 - 解绑）
      * Http**Session**ActivationListener（钝化 - 活化）
* 按监听事件划分
  * 对象的创建与销毁
      * Servlet**Context**Listener
      * Servlet**Request**Listener
      * Http**Session**Listener
  * 属性的增加、删除与替换
      * Servlet**Context**AttributeListener
      * Servlet**Request**AttributeListener
      * Http**Session**AttributeListener
  * 绑定至 HttpSession 中属性状态的改变
      * Http**Session**BindingListener（绑定 - 解绑）
      * Http**Session**ActivationListener（钝化 - 活化）

### User
```kotlin
package a

import java.io.Serializable
import javax.servlet.http.HttpSessionActivationListener
import javax.servlet.http.HttpSessionBindingEvent
import javax.servlet.http.HttpSessionBindingListener
import javax.servlet.http.HttpSessionEvent

data class User(val name: String = "Tom") : HttpSessionBindingListener, HttpSessionActivationListener, Serializable {
    override fun valueBound(event: HttpSessionBindingEvent) {
        println("实体绑定：${event.name} :: ${event.value}")
    }

    override fun valueUnbound(event: HttpSessionBindingEvent) {
        println("实体解绑：${event.name} :: ${event.value}")
    }

    override fun sessionWillPassivate(se: HttpSessionEvent) {
        println("会话序列化（钝化）：" + se.session)
    }

    override fun sessionDidActivate(se: HttpSessionEvent) {
        println("会话反序列化（活化）：" + se.session)
    }
}
```

### MyListener
```kotlin
package a

import javax.servlet.ServletContextEvent
import javax.servlet.ServletContextListener
import javax.servlet.ServletRequestEvent
import javax.servlet.ServletRequestListener
import javax.servlet.annotation.WebListener
import javax.servlet.http.HttpSessionAttributeListener
import javax.servlet.http.HttpSessionBindingEvent
import javax.servlet.http.HttpSessionEvent
import javax.servlet.http.HttpSessionListener

@WebListener     //通过注解方式配置监听器
class MyListener : ServletContextListener, ServletRequestListener, HttpSessionListener, HttpSessionAttributeListener {
    override fun contextInitialized(sce: ServletContextEvent) {
        println("应用初始化：" + sce.servletContext)
    }

    override fun contextDestroyed(sce: ServletContextEvent) {
        println("应用销毁：" + sce.servletContext)
    }

    override fun requestInitialized(sre: ServletRequestEvent) {
        println("请求创建：" + sre.servletRequest)
    }

    override fun requestDestroyed(sre: ServletRequestEvent) {
        println("请求销毁：" + sre.servletRequest)
    }

    override fun sessionCreated(se: HttpSessionEvent) {
        println("会话创建：" + se.session)
    }

    override fun sessionDestroyed(se: HttpSessionEvent) {
        println("会话销毁：" + se.session)
    }

    override fun attributeAdded(sbe: HttpSessionBindingEvent) {
        println("会话添加属性：${sbe.name} :: ${sbe.value}")
    }

    override fun attributeReplaced(sbe: HttpSessionBindingEvent) {
        println("会话替换属性：${sbe.name} :: ${sbe.value}")
    }

    override fun attributeRemoved(sbe: HttpSessionBindingEvent) {
        println("会话移除属性：${sbe.name} :: ${sbe.value}")
    }
}
```

### web.xml
```xml
<?xml version="1.0" encoding="UTF-8"?>
<web-app xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xmlns="http://xmlns.jcp.org/xml/ns/javaee"
         xsi:schemaLocation="http://xmlns.jcp.org/xml/ns/javaee http://xmlns.jcp.org/xml/ns/javaee/web-app_3_1.xsd"
         version="3.1">

    <listener>
        <listener-class>a.MyListener</listener-class>
    </listener>

</web-app>

加载顺序：监听器 > 过滤器 > Servlet
```

## 在线用户案例
### JSP
```
index.jsp
----
<%@ page import="a.User" %>
<%@ page import="java.util.List" %>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>A</title>
</head>
<body>
<%
    final List<User> users = (List<User>) application.getAttribute("users");
%>
当前在线用户人数：<%=users.size()%><br>
<%
    for (User user : users) {
%>
ID：<%=user.getId()%>，IP：<%=user.getIp()%>，FirstAccessTime：<%=user.getFirstAccessTime()%><br>
<%
    }
%>
</body>
</html>
```

### MyListener
```kotlin
package a

import java.text.SimpleDateFormat
import java.util.*
import javax.servlet.ServletContextEvent
import javax.servlet.ServletContextListener
import javax.servlet.ServletRequestEvent
import javax.servlet.ServletRequestListener
import javax.servlet.annotation.WebListener
import javax.servlet.http.HttpServletRequest
import javax.servlet.http.HttpSessionEvent
import javax.servlet.http.HttpSessionListener

@WebListener
class MyListener : ServletContextListener, HttpSessionListener, ServletRequestListener {
    val users = arrayListOf<User>()
    val sdf = SimpleDateFormat("yyyy-MM-dd HH:mm:ss")

    override fun contextInitialized(sce: ServletContextEvent) {
        sce.servletContext.setAttribute("users", users)
    }

    override fun contextDestroyed(sce: ServletContextEvent) {
        sce.servletContext.removeAttribute("users")
    }

    override fun sessionCreated(se: HttpSessionEvent) {
        //Do nothing
    }

    override fun sessionDestroyed(se: HttpSessionEvent) {
        val id = se.session.id
        users.removeAll { it.id == id }
    }

    override fun requestInitialized(sre: ServletRequestEvent) {
        val request = sre.servletRequest as HttpServletRequest
        val session = request.session
        val id = session.id
        if (!users.map { it.id }.contains(id)) {
            val ip = request.remoteAddr
            val time = sdf.format(Date(session.creationTime))
            users.add(User(id, ip, time))
        }
    }

    override fun requestDestroyed(sre: ServletRequestEvent) {
        //Do nothing
    }
}
```

### User
```kotlin
package a

data class User(val id: String, val ip: String, val firstAccessTime: String)
```
