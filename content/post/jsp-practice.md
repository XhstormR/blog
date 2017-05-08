---
author: XhstormR
categories:
- "JAVA"
date: 2017-05-05T18:43:44+08:00
title: "JSP 实例"
---

<!--more-->

Updated on 2017-05-05

>

## 生成验证码并验证

### 原生

#### JSP
```
index.jsp
----
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>A</title>
</head>
<body>
<img id="checkImg" src="./abc">
<a href="javascript:a()">看不清!</a>

<form action="./def" method="post">
    验证码:
    <input name="checkCode" type="text" maxlength="4" size="4">
    <input type="submit">
</form>

<script>
    function a() {
        document.getElementById("checkImg").src = "./abc?" + new Date().getTime();     URL 附上时间戳，来改变网址，避免缓存
    }
</script>
</body>
</html>
```

#### MyServlet1
```kotlin
package a

import java.awt.Color
import java.awt.Font
import java.awt.image.BufferedImage
import java.util.*
import javax.imageio.ImageIO
import javax.servlet.annotation.WebServlet
import javax.servlet.http.HttpServlet
import javax.servlet.http.HttpServletRequest
import javax.servlet.http.HttpServletResponse

@WebServlet(urlPatterns = arrayOf("/abc"))
class MyServlet1 : HttpServlet() {     生成
    val random = Random()
    val strings = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ"

    override fun doGet(request: HttpServletRequest, response: HttpServletResponse) {
        val image = BufferedImage(70, 25, BufferedImage.TYPE_INT_RGB)     图片
        val graphics = image.graphics.apply {     获得画笔
            this.font = Font("Microsoft YaHei UI", Font.PLAIN, 18)     设置字体
            this.color = Color(200, 150, 255)     设置画笔颜色（R,G,B）
            this.fillRect(0, 0, 70, 25)     填充矩形
        }
        val checkCode = StringBuilder()
        for (i in 0..3) {     4 次（0,1,2,3）
            val c = strings[random.nextInt(strings.length)]     随机获取字符
            graphics.color = Color(random.nextInt())     设置画笔颜色
            graphics.drawString(c.toString(), (i * 16) + 5, 20)     画出字符
            checkCode.append(c)     添加字符
        }
        request.session.setAttribute("checkCode", checkCode)     将验证码保存至 Session 中
        ImageIO.write(image, "PNG", response.outputStream)     将图片输出至 Response
    }
}
```

#### MyServlet2
```kotlin
package a

import javax.servlet.annotation.WebServlet
import javax.servlet.http.HttpServlet
import javax.servlet.http.HttpServletRequest
import javax.servlet.http.HttpServletResponse

@WebServlet(urlPatterns = arrayOf("/def"))
class MyServlet2 : HttpServlet() {     验证
    override fun doPost(request: HttpServletRequest, response: HttpServletResponse) {
        request.characterEncoding = "UTF-8"     指定输入字符集
        response.characterEncoding = "UTF-8"     指定输出字符集
        response.contentType = "text/html;charset=UTF-8"     指定输出内容类型

        val temp1 = request.session.getAttribute("checkCode")?.toString()?.toLowerCase()
        val temp2 = request.getParameter("checkCode").toString().toLowerCase()

        if (temp1 == temp2) {     将接收到的验证码和 Session 中的验证码进行比较
            response.writer.use { it.write("$temp1 : $temp2 <br>验证码输入正确!") }
        } else {
            response.writer.use { it.write("$temp1 : $temp2 <br>验证码输入错误!") }
        }
    }
}
```

### 使用开源组件 kaptcha
```
compile 'com.github.penggle:kaptcha:2.3.2'
```

#### JSP
```
index.jsp
----
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>A</title>
</head>
<body>
<img id="checkImg" src="./abc">
<a href="javascript:a()">看不清!</a>

<form action="./def" method="post">
    验证码:
    <input name="checkCode" type="text" maxlength="5" size="5">
    <input type="submit">
</form>

<script>
    function a() {
        document.getElementById("checkImg").src = "./abc?" + new Date().getTime();
    }
</script>
</body>
</html>
```

#### MyServlet
```kotlin
package a

import javax.servlet.annotation.WebServlet
import javax.servlet.http.HttpServlet
import javax.servlet.http.HttpServletRequest
import javax.servlet.http.HttpServletResponse

@WebServlet(urlPatterns = arrayOf("/def"))
class MyServlet : HttpServlet() {     验证
    override fun doPost(request: HttpServletRequest, response: HttpServletResponse) {
        request.characterEncoding = "UTF-8"
        response.characterEncoding = "UTF-8"
        response.contentType = "text/html;charset=UTF-8"

        val temp1 = request.session.getAttribute(com.google.code.kaptcha.Constants.KAPTCHA_SESSION_KEY)?.toString()?.toLowerCase()
        val temp2 = request.getParameter("checkCode").toString().toLowerCase()

        if (temp1 == temp2) {
            response.writer.use { it.write("$temp1 : $temp2 <br>验证码输入正确!") }
        } else {
            response.writer.use { it.write("$temp1 : $temp2 <br>验证码输入错误!") }
        }
    }
}
```

#### web.xml
```xml
<?xml version="1.0" encoding="UTF-8"?>
<web-app xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xmlns="http://xmlns.jcp.org/xml/ns/javaee"
         xsi:schemaLocation="http://xmlns.jcp.org/xml/ns/javaee http://xmlns.jcp.org/xml/ns/javaee/web-app_3_1.xsd"
         version="3.1">

    <servlet>
        <servlet-name>a</servlet-name>
        <servlet-class>com.google.code.kaptcha.servlet.KaptchaServlet</servlet-class>     生成
        <!-- 中文验证码 -->
        <init-param>
            <param-name>kaptcha.textproducer.impl</param-name>
            <param-value>com.google.code.kaptcha.text.impl.ChineseTextProducer</param-value>     配置为中文验证码
        </init-param>
        <init-param>
            <param-name>kaptcha.textproducer.font.names</param-name>
            <param-value>Microsoft YaHei UI</param-value>     配置字体
        </init-param>
        <!-- 中文验证码 -->
    </servlet>
    <servlet-mapping>
        <servlet-name>a</servlet-name>
        <url-pattern>/abc</url-pattern>
    </servlet-mapping>

</web-app>
```
