---
author: XhstormR
categories:
- Spring
date: 2017-06-17T10:49:25+08:00
title: Spring MVC
---

<!--more-->

Updated on 2017-06-22

> {{< image "/uploads/spring.png" "Spring Framework" "1" "1" >}}

## Concept
### Thymeleaf
* 变量表达式：`${ }`，基于 SpEL 表达式。
* 选择表达式：`*{ }`，基于选中对象。
* 路径表达式：`@{ }`。
* 对象表达式：`#{ }`。

## Configuration
### build.gradle.kts
```bash
plugin("war")

compile("org.springframework:spring-webmvc:+")

compile("javax.servlet:javax.servlet-api:+")

compile("org.hibernate:hibernate-validator:5.+")

compile("org.thymeleaf:thymeleaf-spring4:+")
compile("org.slf4j:slf4j-jdk14:+")
```

## Code
### AppConfig
```kotlin
import org.springframework.web.filter.CharacterEncodingFilter
import org.springframework.web.servlet.support.AbstractAnnotationConfigDispatcherServletInitializer
import javax.servlet.Filter
import javax.servlet.MultipartConfigElement
import javax.servlet.ServletRegistration

class AppConfig : AbstractAnnotationConfigDispatcherServletInitializer() {
    override fun getServletMappings(): Array<String> = arrayOf("/")

    override fun getRootConfigClasses(): Array<Class<*>> = arrayOf(RootConfig::class.java)

    override fun getServletConfigClasses(): Array<Class<*>> = arrayOf(WebConfig::class.java)

    override fun getServletFilters(): Array<Filter> = arrayOf(CharacterEncodingFilter("UTF-8", true))

    override fun customizeRegistration(registration: ServletRegistration.Dynamic) {
        val mb = 1024 * 1024L     限制文件最大为 2 MB，请求最大为 4 MB
        registration.setMultipartConfig(MultipartConfigElement("D:/TEMP", 2 * mb, 4 * mb, 0))
    }
}
```
### WebConfig
```kotlin
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.ComponentScan
import org.springframework.context.annotation.Configuration
import org.springframework.web.multipart.MultipartResolver
import org.springframework.web.multipart.support.StandardServletMultipartResolver
import org.springframework.web.servlet.ViewResolver
import org.springframework.web.servlet.config.annotation.DefaultServletHandlerConfigurer
import org.springframework.web.servlet.config.annotation.EnableWebMvc
import org.springframework.web.servlet.config.annotation.InterceptorRegistry
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter
import org.thymeleaf.spring4.SpringTemplateEngine
import org.thymeleaf.spring4.view.ThymeleafViewResolver
import org.thymeleaf.templateresolver.ITemplateResolver
import org.thymeleaf.templateresolver.ServletContextTemplateResolver
import javax.servlet.ServletContext

@Configuration
@EnableWebMvc     启用 Spring MVC
@ComponentScan("controller")
open class WebConfig : WebMvcConfigurerAdapter() {
    @Bean     1
    open fun templateResolver(servletContext: ServletContext): ITemplateResolver =
            ServletContextTemplateResolver(servletContext).apply {
                this.characterEncoding = "UTF-8"
                this.prefix = "/WEB-INF/views/"
                this.suffix = ".html"
            }

    @Bean     2
    open fun templateEngine(templateResolver: ITemplateResolver): SpringTemplateEngine =
            SpringTemplateEngine().apply { this.setTemplateResolver(templateResolver) }

    @Bean     3
    open fun viewResolver(templateEngine: SpringTemplateEngine): ViewResolver =
            ThymeleafViewResolver().apply {
                this.characterEncoding = "UTF-8"
                this.templateEngine = templateEngine
            }

    @Bean
    open fun multipartResolver(): MultipartResolver = StandardServletMultipartResolver()     提供文件上传支持

    override fun configureDefaultServletHandling(configurer: DefaultServletHandlerConfigurer) = configurer.enable()     提供静态资源访问

    override fun addInterceptors(registry: InterceptorRegistry) {
        registry.addInterceptor(MyInterceptor()).addPathPatterns("/**")     注册拦截器
    }
}
```
### RootConfig
```kotlin
import org.springframework.context.annotation.Configuration

@Configuration
open class RootConfig
```
### MyInterceptor
```kotlin
import org.springframework.web.servlet.ModelAndView
import org.springframework.web.servlet.handler.HandlerInterceptorAdapter
import java.lang.Exception
import javax.servlet.http.HttpServletRequest
import javax.servlet.http.HttpServletResponse

class MyInterceptor : HandlerInterceptorAdapter() {     拦截器
    override fun preHandle(request: HttpServletRequest, response: HttpServletResponse, handler: Any): Boolean {
        println("预处理")
        return true     是否放行请求（true 放行，false 拦截）
    }

    override fun postHandle(request: HttpServletRequest, response: HttpServletResponse, handler: Any, modelAndView: ModelAndView) {
        println("后处理")
        modelAndView.model["msg"] = "信息"
    }

    override fun afterCompletion(request: HttpServletRequest, response: HttpServletResponse, handler: Any, ex: Exception) {
        println("请求结束")
    }
}
```
### entity
#### Account
```kotlin
package entity

import javax.validation.constraints.Min
import javax.validation.constraints.NotNull
import javax.validation.constraints.Size

data class Account(
        @field:NotNull     校验属性
        @field:Size(min = 2, max = 4)
        var username: String? = null,
        @field:NotNull
        @field:Size(min = 6, max = 12)
        var password: String? = null,
        @field:NotNull
        @field:Min(18)
        var age: Int? = null
)
```
### controller
#### HomeController
```kotlin
package controller

import org.springframework.stereotype.Controller
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RequestMethod

@Controller     声明为控制器
@RequestMapping("/")     映射至 127.0.0.1:8080/
class HomeController {
    @RequestMapping(method = arrayOf(RequestMethod.GET))     处理 GET 请求
    fun home(): String {
        return "home"     解析为 /WEB-INF/views/home.html 视图
    }
}
```
#### AController
```kotlin
package controller

import org.springframework.stereotype.Controller
import org.springframework.ui.Model
import org.springframework.validation.Errors
import org.springframework.web.bind.annotation.*
import org.springframework.web.multipart.MultipartFile
import org.springframework.web.servlet.mvc.support.RedirectAttributes
import java.io.File
import javax.validation.Valid

@Controller
@RequestMapping("/a")
class AController {
    查询参数：127.0.0.1:8080/a?username=张三&password=123456&age=20
    @RequestMapping(method = arrayOf(RequestMethod.GET))     可简化为 @GetMapping
    fun a(@RequestParam(defaultValue = "张三") username: String,
          @RequestParam(defaultValue = "123456") password: String,
          @RequestParam(defaultValue = "20") age: Int,
          model: Model): String {
        if (!model.containsAttribute("account")) {     跨重定向请求传递复杂数据
            model.addAttribute("account", Account(username, password, age))
            可简化为
            model.addAttribute(Account(username, password, age))     根据对象类型推断 Key
        }
        return "a"
    }

    进一步简化：根据请求路径推断视图（a），根据对象类型推断 Key（account）
    @RequestMapping(method = arrayOf(RequestMethod.GET))
    fun a(@RequestParam(defaultValue = "张三") username: String,
          @RequestParam(defaultValue = "123456") password: String,
          @RequestParam(defaultValue = "20") age: Int): Account {
        return Account(username, password, age)
    }

    路径变量：127.0.0.1:8080/a/张三/123456/20
    @RequestMapping(path = arrayOf("/{username}/{password}/{age}"), method = arrayOf(RequestMethod.GET))
    fun b(@PathVariable username: String,
          @PathVariable password: String,
          @PathVariable age: Int,
          model: Model): String {
        if (!model.containsAttribute("account")) {     跨重定向请求传递复杂数据
            model.addAttribute("account", Account(username, password, age))
            可简化为
            model.addAttribute(Account(username, password, age))     根据对象类型推断 Key
        }
        return "a"
    }

    表单参数
    @RequestMapping(path = arrayOf("/form"), method = arrayOf(RequestMethod.POST))
    fun c(@Valid account: Account, errors: Errors, model: Model): String {     校验属性
        if (errors.hasErrors()) {     检查校验是否出错
            return "redirect:/"     重定向（redirect:），请求转发（forward:）
        }
        model.addAttribute("username", account.username)     跨重定向请求传递简单数据
        model.addAttribute("password", account.password)
        model.addAttribute("age", account.age)

        return "redirect:/a/{username}/{password}/{age}"     通过路径变量的形式传递数据：127.0.0.1:8080/a/张三/123456/20
        或者
        return "redirect:/a"     通过查询参数的形式传递数据：127.0.0.1:8080/a?username=张三&password=123456&age=20
    }

    跨重定向请求传递复杂数据：
    @RequestMapping(path = arrayOf("/form"), method = arrayOf(RequestMethod.POST))
    fun c(@Valid account: Account, errors: Errors, model: RedirectAttributes): String {     校验属性
        if (errors.hasErrors()) {     检查校验是否出错
            return "redirect:/"     重定向（redirect:），请求转发（forward:）
        }
        model.addFlashAttribute(account)     跨重定向请求传递复杂数据
        return "redirect:/a"     通过 flash 属性传递复杂数据
    }

    文件上传
    @RequestMapping(path = arrayOf("/upload"), method = arrayOf(RequestMethod.POST))     可简化为 @PostMapping
    fun d(@RequestPart myPic: MultipartFile): String {
        myPic.transferTo(File("D:/TEMP2/${myPic.originalFilename}"))
        return "redirect:/"
    }

    异常处理（作用于单个控制器）
    @ExceptionHandler(Throwable::class)
    fun handleError(): String {
        return "error"
    }
}
```
#### AppErrorHandler
```kotlin
package controller

import org.springframework.web.bind.annotation.ControllerAdvice
import org.springframework.web.bind.annotation.ExceptionHandler

@ControllerAdvice     控制器通知
class AppErrorHandler {
    @ExceptionHandler(Throwable::class)     异常处理（作用于所有控制器）
    fun handleError(): String {
        return "error"
    }
}
```
## HTML
### a.html
```html
<html xmlns:th="http://www.w3.org/1999/xhtml">     Thymeleaf 命名空间
<head>
    <meta charset="UTF-8">
    <title>Title</title>
</head>
<body>
<p th:text="${account}"></p>
</body>
</html>
```
### b.html
```html
<html>
<head>
    <meta charset="UTF-8">
    <title>Title</title>
</head>
<body>
<form action="/a/form" method="post">
    <input name="username" type="text"><br>
    <input name="password" type="text"><br>
    <input name="age" type="number"><br>
    <input type="submit"><br>
</form>
</body>
</html>
```
### c.html
```html
<html>
<head>
    <meta charset="UTF-8">
    <title>Title</title>
</head>
<body>
<form action="/a/upload" method="post" enctype="multipart/form-data">     以 multipart 格式提交表单
    <input name="myPic" type="file"><br>
    <input type="submit"><br>
</form>
</body>
</html>
```
