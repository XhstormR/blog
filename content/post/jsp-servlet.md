---
author: XhstormR
categories:
- JSP
date: 2017-04-11T18:15:43+08:00
title: JSP Servlet
---

<!--more-->

Updated on 2017-04-11

>

## 工作原理
### MyServlet
```kotlin
package a

import javax.servlet.annotation.WebInitParam
import javax.servlet.annotation.WebServlet
import javax.servlet.http.HttpServlet
import javax.servlet.http.HttpServletRequest
import javax.servlet.http.HttpServletResponse

@WebServlet(urlPatterns = arrayOf("/abc"), initParams = arrayOf(WebInitParam(name = "name", value = "Tom")), loadOnStartup = 1)     //通过注解方式配置 Servlet
class MyServlet : HttpServlet() {     继承 HttpServlet
    init {
        println("实例化")
    }

    override fun init() {
        println("初始化")
        val s = getInitParameter("name")
        println(s)
    }

    override fun destroy() {
        println("销毁")
    }

    override fun doGet(req: HttpServletRequest, resp: HttpServletResponse) {     由 service 方法中转
        println("处理请求 Get")
        resp.contentType = "text/html;charset=UTF-8"     设置内容类型
        val out = resp.writer
        out.use { it.write("<strong>ABC</strong><br>") }
    }

    override fun doPost(req: HttpServletRequest, resp: HttpServletResponse) {     由 service 方法中转
        println("处理请求 Post")
        resp.contentType = "text/html;charset=UTF-8"     设置内容类型
        val out = resp.writer
        out.use { it.write("<strong>ABC</strong><br>") }
    }
}

若 WebApp 的上下文不为 "/"，则使用绝对路径时需要加上 request.getContextPath()
例：<a href="<%=request.getContextPath()%>/abc">链接</a>
https://tomcat.apache.org/tomcat-9.0-doc/servletapi/javax/servlet/http/HttpServletRequest.html#getContextPath--
```

### web.xml
```xml
<?xml version="1.0" encoding="UTF-8"?>
<web-app xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xmlns="http://xmlns.jcp.org/xml/ns/javaee"
         xsi:schemaLocation="http://xmlns.jcp.org/xml/ns/javaee http://xmlns.jcp.org/xml/ns/javaee/web-app_3_1.xsd"
         version="3.1">

    <servlet>
        <servlet-name>s</servlet-name>
        <servlet-class>a.MyServlet</servlet-class>
        <load-on-startup>1</load-on-startup>     设置启动时自动加载（数值越小越先加载）
        <init-param>
            <param-name>name</param-name>     初始化参数
            <param-value>Tom</param-value>
        </init-param>
    </servlet>
    <servlet-mapping>
        <servlet-name>s</servlet-name>
        <url-pattern>/abc</url-pattern>     匹配地址：http://localhost:8080/abc
    </servlet-mapping>

</web-app>
```
