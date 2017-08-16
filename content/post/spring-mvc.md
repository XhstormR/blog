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
>
> https://github.com/thymeleaf/thymeleaf
>
> [MappingJackson2HttpMessageConverter](https://docs.spring.io/spring/docs/current/javadoc-api/org/springframework/http/converter/json/MappingJackson2HttpMessageConverter.html)

## Concept
* REST：将资源的 **状态** 以 **适合** 客户端的 **格式** 从服务端 **传递** 至客户端（或者反过来）。
  * 资源通过 URL 进行标识，通过 HTTP Method 进行管理，通过 HTTP Header 表述格式。
      * 资源：URL（统一资源定位器）
      * 格式：Accept、Content-Type 头部信息。
      * 动词：[CRUD](/post/postgresql/#concept)（增删改查）
          * 幂等：**同一操作** 执行 **任意次数** 所产生的影响或结果 **相同**。

## Configuration
### build.gradle.kts
```bash
plugin("war")

compile("org.springframework:spring-webmvc:+")
compile("javax.servlet:javax.servlet-api:+")

compile("org.hibernate:hibernate-validator:5.+")

compile("org.thymeleaf:thymeleaf-spring4:+")
compile("org.slf4j:slf4j-jdk14:+")

compile("com.fasterxml.jackson.core:jackson-databind:+")
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

    override fun getServletFilters(): Array<Filter> = arrayOf(CharacterEncodingFilter("UTF-8", true))     添加过滤器

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
import org.springframework.format.FormatterRegistry
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

    override fun configureDefaultServletHandling(configurer: DefaultServletHandlerConfigurer) = configurer.enable()     提供静态资源访问（启用 DefaultServletHttpRequestHandler）

    override fun addInterceptors(registry: InterceptorRegistry) {
        registry.addInterceptor(MyInterceptor()).addPathPatterns("/**")     注册拦截器
    }

    override fun addFormatters(registry: FormatterRegistry) {
        registry.addFormatter(MyDateFormatter())             注册 Formatter
        registry.addConverter(MyStringToDateConverter())     注册 Converter
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

    override fun postHandle(request: HttpServletRequest, response: HttpServletResponse, handler: Any, modelAndView: ModelAndView?) {
        println("后处理")
        if (modelAndView != null) {
            modelAndView.model["msg"] = "信息"
        }
    }

    override fun afterCompletion(request: HttpServletRequest, response: HttpServletResponse, handler: Any, ex: Exception?) {
        println("请求结束")
    }
}

基于切面思想的应用：
过滤器：基于 Servlet 容器，能够过滤所有请求，使用回调函数。（Filter）
拦截器：基于 Spring  容器，只能拦截部分请求，使用反射机制。（Interceptor）
```
### MyDateFormatter
```kotlin
import org.springframework.format.Formatter
import java.text.SimpleDateFormat
import java.util.*

class MyDateFormatter : Formatter<Date> {     Formatter：String <-> T
    private val sdf = SimpleDateFormat("yyyy-MM-dd")

    override fun parse(text: String, locale: Locale): Date = sdf.parse(text)

    override fun print(`object`: Date, locale: Locale): String = sdf.format(`object`)
}
```
### MyStringToDateConverter
```kotlin
import org.springframework.core.convert.converter.Converter
import java.text.SimpleDateFormat
import java.util.*

class MyStringToDateConverter : Converter<String, Date> {     Converter：S --> T
    private val sdf = SimpleDateFormat("yyyy-MM-dd")

    override fun convert(source: String): Date = sdf.parse(source)
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

import entity.Account
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
class AController {     视图
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
        if (!model.containsAttribute("account")) {
            model.addAttribute(Account(username, password, age))
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
    fun c(@Valid account: Account, errors: Errors, model: RedirectAttributes): String {
        if (errors.hasErrors()) {
            return "redirect:/"
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
#### BController
```kotlin
package controller

import entity.Account
import org.springframework.http.HttpStatus
import org.springframework.http.MediaType
import org.springframework.validation.Errors
import org.springframework.web.bind.annotation.*
import javax.validation.Valid

@RestController     转换响应体(类级别)(ResponseBody + Controller)
@RequestMapping("/b")
class BController {     REST API
    //@ResponseBody     转换响应体(方法级别)
    @RequestMapping(path = arrayOf("/jsonOut"), method = arrayOf(RequestMethod.GET), produces = arrayOf(MediaType.APPLICATION_JSON_UTF8_VALUE))     限制 Accept 头部信息
    @ResponseStatus(HttpStatus.OK)     指定 HTTP 状态码
    fun a(): Account {
        return Account("张三", "123456", 20)
    }

    @RequestMapping(path = arrayOf("/jsonInOut"), method = arrayOf(RequestMethod.POST), consumes = arrayOf(MediaType.APPLICATION_JSON_UTF8_VALUE))     限制 Content-Type 头部信息
    @ResponseStatus(HttpStatus.CREATED)
    fun b(@RequestBody @Valid account: Account, errors: Errors): Account {     转换请求体
        if (errors.hasErrors()) {
            throw AccountNotFoundException(9527)
        }
        return account.apply { this.username = "李四" }
    }

    @ExceptionHandler(AccountNotFoundException::class)
    @ResponseStatus(HttpStatus.NOT_FOUND)
    fun handleError(e: AccountNotFoundException): Error {
        return Error(4, "账户 ${e.accountId} 未找到")
    }
}

data class AccountNotFoundException(
        val accountId: Int
) : RuntimeException()

data class Error(
        val code: Int,
        val message: String
)
```
#### CController
```kotlin
package controller

import entity.Account
import org.springframework.format.annotation.DateTimeFormat
import org.springframework.web.bind.annotation.*
import java.util.*

@RestController
@RequestMapping("/c")
class CController {
    http://localhost:8080/c/base.do?age=123
    Int ：Kotlin 编译为原始类型，参数必选
    Int?：Kotlin 编译为包装类型，参数可选
    @GetMapping("/base.do")
    fun base(age: Int?) = age.toString()

    Array
    http://localhost:8080/c/array.do?names=Tom&names=Lucy&names=Jim
    @GetMapping("/array.do")
    fun array(names: Array<String>) = Arrays.toString(names)

    Date
    http://localhost:8080/c/date.do?date=2017-07-15
    默认时间格式为 DateFormat.SHORT：15/07/17 14:30
    @GetMapping("/date.do")
    fun date(@DateTimeFormat(iso = DateTimeFormat.ISO.DATE) date: Date) = date

    Object
    http://localhost:8080/c/object.do
    /*
    {
        "username": "张三",
        "password": "123456",
        "age": 20
    }
    */
    @PostMapping("/object.do")
    fun `object`(@RequestBody account: Account) = account

    List,Set
    http://localhost:8080/c/list.do
    /*
    [
        {
            "username": "张三",
            "password": "123456",
            "age": 20
        },
        {
            "username": "张三",
            "password": "123456",
            "age": 20
        }
    ]
    */
    @PostMapping("/list.do")
    fun list(@RequestBody accounts: List<Account>) = accounts

    Map
    http://localhost:8080/c/map.do
    /*
    {
        "a": {
            "username": "张三",
            "password": "123456",
            "age": 20
        },
        "b": {
            "username": "张三",
            "password": "123456",
            "age": 20
        }
    }
    */
    @PostMapping("/map.do")
    fun map(@RequestBody accounts: Map<String, Account>) = accounts
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
<html xmlns:th="http://www.thymeleaf.org">     Thymeleaf 命名空间
<head>
    <meta charset="UTF-8">
    <title>Title</title>
</head>
<body>
<p th:text="${account}"></p>
</body>
</html>

变量表达式：${ }，基于 SpEL 表达式。
选择表达式：*{ }，基于选中对象。
路径表达式：@{ }。
对象表达式：#{ }。
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
