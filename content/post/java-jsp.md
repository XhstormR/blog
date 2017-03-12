+++
Categories = ["JAVA"]
date = "2017-03-09T23:30:26+08:00"
title = "Java Server Pages"

+++

<!--more-->

Updated on 2017-03-09

> https://tomcat.apache.org/index.html
>
> https://tomcat.apache.org/tomcat-9.0-doc/api/allclasses-noframe.html
>
> https://tomcat.apache.org/tomcat-9.0-doc/jspapi/allclasses-noframe.html
>
> https://tomcat.apache.org/tomcat-9.0-doc/servletapi/allclasses-noframe.html

## Tomcat
### 环境变量
|变量值|变量名||
|:--|:--|:--|
|CATALINA_HOME|D:\Download\apache-tomcat-9.0.0|配置 Tomcat 安装路径|
|------------------------------|---------------------------------------------------|------------------------------|

### 默认欢迎页
```xml
D:\Download\apache-tomcat-9.0.0\conf\web.xml
⇳
<welcome-file-list>
    <welcome-file>index.html</welcome-file>
    <welcome-file>index.htm</welcome-file>
    <welcome-file>index.jsp</welcome-file>
</welcome-file-list>
```

### 默认端口号
```xml
D:\Download\apache-tomcat-9.0.0\conf\server.xml
⇳
<Connector port="8080" protocol="HTTP/1.1"
           connectionTimeout="20000"
           redirectPort="8443" />
```

### 去掉空白行
```xml
全局
----
D:\Download\apache-tomcat-9.0.0\conf\web.xml
⇳
<init-param>
    <param-name>trimSpaces</param-name>
    <param-value>true</param-value>
</init-param>

单个页面
----
<%@ page trimDirectiveWhitespaces="true" %>
```

### IDEA Deployment
```
C:\Users\Administrator\.IntelliJIdea2016.3\system\tomcat\
```

## JSP

### 指令
#### page
```xml
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ page import="java.util.Arrays" %>
<%@ page import="java.util.HashMap" %>
```
#### include
#### taglib

### 注释
```jsp
客户端可见注释：

<!-- HTML 注释 -->

客户端不可见注释：

<%-- JSP 注释 --%>

<%
    // Java 单行注释
    /*
    *  Java 多行注释
    * */
%>
```

### 声明
```jsp
<%!     Servlet 中的成员（可声明为 static）
    private String s = "ABC";     属性

    private int add(int x, int y) {     方法
        return x + y;
    }
%>
```

### 脚本
```jsp
<%     Servlet 中的 jspService() 的方法代码
    System.out.println("你好");     输出至控制台
    out.println("你好");     输出至页面（out 是 JspWriter 的实例化对象）
%>
```

### 表达式
```jsp
<%=s%>     调用属性（注意表达式不加分号）
<br>
<%=add(1, 2)%>     调用方法

----
输出：
ABC
3
```

---

```java
输出九九乘法表
----
<%!     声明方法
    private String a() {
        StringBuilder s = new StringBuilder();
        for (int i = 1; i <= 9; i++) {
            for (int j = 1; j <= i; j++) {
                s.append(i).append('*').append(j).append('=').append(i * j).append("&nbsp;&nbsp;&nbsp;&nbsp;");     空格
            }
            s.append("<br>");     换行
        }
        return s.toString();
    }
%>

<%=a()%>     调用方法
```

## 生命周期
{{< image "/uploads/java-jsp.svg" "Java Server Pages" "0" "1" >}}

## 内置对象

### out

### request
```
index.jsp
----
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>登录页面</title>
</head>
<body>
<h1>登录页面</h1>
<hr>
<form action="doLogin.jsp" name="loginForm" method="post">
    <table>
        <tr>
            <td>账号：</td>
            <td><input type="text" name="account"></td>
        </tr>
        <tr>
            <td>密码：</td>
            <td><input type="password" name="password"></td>
        </tr>
        <tr>
            <td colspan="2"><input type="submit" value="登录"></td>
        </tr>
    </table>
</form>
</body>
</html>

doLogin.jsp
----
<%@ page contentType="text/html;charset=UTF-8" language="java" %>     指定输出字符集
<html>
<head>
    <title>登录成功</title>
</head>
<body>
<%
    request.setCharacterEncoding("UTF-8");     指定输入字符集
    request.setAttribute("str", "欢迎!");
%>
<h1>登录成功</h1>
<hr>
账号：<%=request.getParameter("account")%><br>
密码：<%=request.getParameter("password")%><br>
属性：<%=request.getAttribute("str")%><br>
协议类型：<%=request.getProtocol()%><br>
请求类型：<%=request.getContentType()%><br>
请求大小：<%=request.getContentLength()%> 字节<br>
相对路径：<%=request.getContextPath()%><br>
请求路径：<%=request.getServletPath()%><br>
真实路径：<%=request.getServletContext().getRealPath("doLogin.jsp")%><br>
主机名称：<%=request.getServerName()%><br>
主机端口：<%=request.getServerPort()%><br>
客户端 IP 地址：<%=request.getRemoteAddr()%><br>
服务端 IP 地址：<%=request.getLocalAddr()%><br>
</body>
</html>

----
输出：
账号：123456
密码：123456
属性：欢迎!
协议类型：HTTP/1.1
请求类型：application/x-www-form-urlencoded
请求大小：30 字节
相对路径：
请求路径：/doLogin.jsp
真实路径：C:\Users\Administrator\IdeaProjects\untitled1\out\artifacts\untitled1_war_exploded\doLogin.jsp
主机名称：localhost
主机端口：8080
客户端 IP 地址：0:0:0:0:0:0:0:1
服务端 IP 地址：0:0:0:0:0:0:0:1
```

### response
```
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>Title</title>
</head>
<body>
<%
    response.setContentType("text/html;charset=UTF-8");     与 page 指令中的 contentType 属性作用相同
    response.sendRedirect("request.jsp");     请求重定向（response）

    request.getRequestDispatcher("request.jsp").forward(request, response);     请求转发（request）
%>
</body>
</html>

Note：
请求重定向（客户端行为）（共发起 2 次请求）（游览器地址会改变）（不传递原有请求对象）（302 临时跳转）
请求转发一（服务端行为）（共发起 1 次请求）（游览器地址不改变）（会传递原有请求对象）
```

### session
```
index.jsp
----
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ page import="java.text.SimpleDateFormat" %>
<%@ page import="java.util.Date" %>
<%@ page import="java.util.Enumeration" %>
<html>
<head>
    <title>Title</title>
</head>
<body>
<%
    session.setAttribute("username", "admin");
    session.setAttribute("password", "123456");
    session.setAttribute("age", 20);
    session.setMaxInactiveInterval(3600);     设置生存间隔时间（秒）
%>
Session ID：<%=session.getId()%><br>
Session 一一创建时间：<%=a(session.getCreationTime())%><br>
Session 最近请求时间：<%=a(session.getLastAccessedTime())%><br>
Session 生存间隔时间：<%=session.getMaxInactiveInterval()%> 秒<br>
Session 中保存的属性：<%
    Enumeration<String> attributeNames = session.getAttributeNames();
    StringBuilder s = new StringBuilder();
    while (attributeNames.hasMoreElements()) {
        String k = attributeNames.nextElement();
        Object v = session.getAttribute(k);
        s.append(k).append('=').append(v.toString()).append("&nbsp;&nbsp;&nbsp;&nbsp;");
    }
    out.print(s.toString());
%><br>
</body>
</html>
<%!
    private SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");

    private String a(long i) {
        return dateFormat.format(new Date(i));
    }
%>

----
输出：
Session ID：C9E1EDACE8806D15DA4BE0354BBD75E8
Session 一一创建时间：2017-03-11 20:37:55
Session 最近请求时间：2017-03-11 20:43:09
Session 生存间隔时间：3600 秒
Session 中保存的属性：password=123456    age=20    username=admin

Note：
Session 生命周期
----
1. 创建
首次访问（无 JSESSIONID Cookie）：发送 Cookie:JSESSIONID=4619A7A93D0DA9622F3FB06F93E2A328

2. 活动
重置 Session 生存间隔时间。

3. 销毁
主动：session.invalidate()、重启 Tomcat、重启浏览器（JSESSIONID Cookie 重启游览器失效）。
被动：Session 过期。

设置 Session 超时时间（默认 30 分钟）
----
session.setMaxInactiveInterval(1800);     秒

D:\Download\apache-tomcat-9.0.0\conf\web.xml（全局）
⇳
<session-config>
    <session-timeout>30</session-timeout>     分
</session-config>
```

### application
```
<%
    application.getServerInfo();     Apache Tomcat/9.0.0.M17
    application.setAttribute("str", "ABC");
    application.getAttribute("str");
%>

Note：
application 对象类似于 Java 中的 static 成员，属于 Web APP，由所有用户共享，可用于存放全局变量。
application 对象始于服务器，终于服务器。
```

### page
```
page 对象类似于 Java 中的 this 指针，指代当前 JSP 页面本身，是 java.lang.Object 的实例。
```

### pageContext
```
pageContext 对象提供了对 JSP 页面内所有的命名空间的访问，相当于页面中所有功能的集大成者。

pageContext.forward("a.jsp");     使当前页面重定向至另一个页面（服务端重定向）
pageContext.include("a.jsp");     使当前位置包含另一个页面的内容
```

### config
```
<%
    StringBuilder s = new StringBuilder();
    Enumeration<String> initParameterNames = config.getInitParameterNames();
    while (initParameterNames.hasMoreElements()) {
        String k = initParameterNames.nextElement();
        String v = config.getInitParameter(k);
        s.append(k).append(" = ").append(v).append("<br>");
    }
    out.print(s.toString());
%>

----
输出：
fork = false
trimSpaces = true
classdebuginfo = true
xpoweredBy = false
```

### exception
```
index.jsp
----
<%@ page contentType="text/html;charset=UTF-8" language="java" errorPage="a.jsp" %>     指定异常处理页面
<html>
<head>
    <title>Title</title>
</head>
<body>
<%
    int i = 100 / 0;     将产生运行时异常
%>
</body>
</html>

a.jsp
----
<%@ page contentType="text/html;charset=UTF-8" language="java" isErrorPage="true" %>     设置为异常处理页面（可以使用 exception 对象）
<html>
<head>
    <title>Exception</title>
</head>
<body>
<%=exception.toString()%><br>     输出异常信息
</body>
</html>
```
