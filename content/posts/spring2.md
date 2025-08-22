---
author: XhstormR
tags:
- Spring
date: 2017-06-07T13:20:02+08:00
title: Spring Framework
---

<!--more-->

Updated on 2017-06-07

> {{< image "uploads/spring.png" "Spring Framework" "1" "1" >}}
>
> -
>
> {{< image "uploads/spring.svg" "Bean 的生命周期" "1" "1" >}}
>
> -
>
> {{< image "uploads/spring-aop.svg" "面向切面编程" "1" "1" >}}

## Bean 的条件化注册
### MyCondition
```java
import org.springframework.context.annotation.Condition;
import org.springframework.context.annotation.ConditionContext;
import org.springframework.core.env.Environment;
import org.springframework.core.type.AnnotatedTypeMetadata;

public class MyCondition implements Condition {
    @Override
    public boolean matches(ConditionContext context, AnnotatedTypeMetadata metadata) {
        Environment environment = context.getEnvironment();
        return environment.getProperty("OS").equals("Windows_NT");     注册条件
    }
}
```
### AppConfig
```java
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Conditional;
import org.springframework.context.annotation.Configuration;

@Configuration
public class AppConfig {
    @Bean
    @Conditional(MyCondition.class)     指示注册条件
    public String str() {
        return "Hello, Windows";
    }
}
```
### Main
```java
import org.springframework.context.annotation.AnnotationConfigApplicationContext;

public class Main {
    public static void main(String[] args) {
        AnnotationConfigApplicationContext context = new AnnotationConfigApplicationContext(AppConfig.class);

        System.out.println(context.containsBean("str"));

        context.destroy();
    }
}

----
输出：
true
```

## Bean 的装配歧义
### food.Dessert
```java
package food;

import org.springframework.context.annotation.Primary;
import org.springframework.stereotype.Component;

public interface Dessert {
}

@Component
@Primary     首选（也可用在 @Bean 上）
@Qualifier("cake")     限定（也可用在 @Bean 上）（显式指定 Bean 的限定符）
class Cake implements Dessert {
}

@Component
class IceCream implements Dessert {
}
```
### AppConfig
```java
import food.Dessert;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;

@Configuration
@ComponentScan("food")
public class AppConfig {
    private Dessert dessert;

    @Autowired
    @Qualifier("cake")     限定（也可用在 @Bean 上）
    public void setDessert(Dessert dessert) {
        this.dessert = dessert;
    }
}

Bean 的限定符的缺省值为 Bean 的名称；
Bean 的一名称的缺省值为 Bean 的类名（@Component）或者方法名（@Bean）。
```

## Bean 的作用域
* 单例：每个 **容器** 创建一个。（Singleton）（默认）
* 原型：每次 **注入** 创建一个。（Prototype）
* 会话：每个 **会话** 创建一个。（Session）
* 请求：每个 **请求** 创建一个。（Request）

### AppConfig
```java
import org.springframework.beans.factory.config.ConfigurableBeanFactory;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Scope;

@Configuration
public class AppConfig {
    @Bean
    @Scope(ConfigurableBeanFactory.SCOPE_PROTOTYPE)    指示每次注入都新创建一个（也可用在 @Component 上）
    public String str() {
        return new String("ABC");
    }
}
```
### Main
```java
import org.springframework.context.annotation.AnnotationConfigApplicationContext;

public class Main {
    public static void main(String[] args) {
        AnnotationConfigApplicationContext context = new AnnotationConfigApplicationContext(AppConfig.class);

        System.out.println(context.getBean("str") == context.getBean("str"));

        context.destroy();
    }
}

----
输出：
false
```

## 运行时值注入
### 123.properties
```java
name=David
```
### AppConfig
```java
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.PropertySource;
import org.springframework.core.env.Environment;

@Configuration
@PropertySource("classpath:/123.properties")     指示加载属性文件至 Spring 中的 Environment
public class AppConfig {
    @Bean
    public String str1(Environment environment) {     方式一：通过检索 Environment 获取属性
        return environment.getProperty("name", "缺省值");
    }

    @Bean
    public String str2(@Value("${name:缺省值}") String name) {     方式二：属性占位符
        return name;
    }

    @Bean
    public String str3(@Value("#{environment['name']?:'缺省值'}") String name) {     方式三：SpEL
        return name;
    }
}
```
### Main
```java
import org.springframework.context.annotation.AnnotationConfigApplicationContext;

public class Main {
    public static void main(String[] args) {
        AnnotationConfigApplicationContext context = new AnnotationConfigApplicationContext(AppConfig.class);

        System.out.println(context.getBean("str1"));
        System.out.println(context.getBean("str2"));
        System.out.println(context.getBean("str3"));

        context.destroy();
    }
}

----
输出：
David
David
David
```

## 加载外部资源
### Main
```java
import org.springframework.context.support.GenericXmlApplicationContext;
import org.springframework.core.io.Resource;

import java.io.IOException;

public class Main {
    public static void main(String[] args) throws IOException {
        GenericXmlApplicationContext context = new GenericXmlApplicationContext("123.xml");

        Resource resource = context.getResource("classpath:123.xml");
//      Resource resource = context.getResource("file:C:\\123.txt");
//      Resource resource = context.getResource("http://localhost/spring.png");
        System.out.println(resource.getFilename());
        System.out.println(resource.contentLength());

        context.destroy();
    }
}

----
输出：
123.xml
190

https://docs.spring.io/spring/docs/current/javadoc-api/org/springframework/core/io/ResourceLoader.html#getResource-java.lang.String-
```

## 面向切面编程
### 方法包装
#### 无参
##### concert
###### Performance
```java
package concert;

public interface Performance {
    void perform();
}
```
###### Concert
```java
package concert;

import org.springframework.stereotype.Component;

@Component
public class Concert implements Performance {
    @Override
    public void perform() {
        System.out.println("音乐会演奏..");
    }
}
```
###### **Audience**
```java
package concert;

import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.*;
import org.springframework.stereotype.Component;

@Aspect     指示该类为切面
@Component     指示该类为组件（Bean）
public class Audience {     切面
    @Pointcut("execution(* concert.Performance.perform(..))")     切点
    public void performance() {
    }

    -------------------------------------------------------
    第一种方式

    @Before("performance()")     前置通知
    public void a() {
        System.out.println("观众入场就座");
    }

    @Before("performance()")     前置通知
    public void b() {
        System.out.println("观众关闭手机");
    }

    @AfterReturning("performance()")     后置通知（成功返回）
    public void c() {
        System.out.println("观众鼓掌喝彩");
    }

    @AfterThrowing("performance()")     后置通知（发生异常）
    public void d() {
        System.out.println("观众要求退款");
    }

    -------------------------------------------------------
    第二种方式

    @Around("performance()")     环绕通知
    public Object x(ProceedingJoinPoint pjp) {
        Object o = null;
        try {
            System.out.println("观众入场就座");
            System.out.println("观众关闭手机");
            o = pjp.proceed();
            System.out.println("观众鼓掌喝彩");
        } catch (Throwable e) {
            System.out.println("观众要求退款");
        }
        return o;
    }
}

execution 匹配执行方法（连接点）。
```
##### **AppConfig**
```java
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.EnableAspectJAutoProxy;

@Configuration
@EnableAspectJAutoProxy     启用 AspectJ 自动代理
@ComponentScan("concert")
public class AppConfig {
}
```
##### Main
```java
import concert.Performance;
import org.springframework.context.annotation.AnnotationConfigApplicationContext;

public class Main {
    public static void main(String[] args) {
        AnnotationConfigApplicationContext context = new AnnotationConfigApplicationContext(AppConfig.class);

        Performance performance = context.getBean(Performance.class);
        performance.perform();

        System.out.println(performance.getClass());

        context.destroy();
    }
}

----
输出：
观众入场就座
观众关闭手机
音乐会演奏..
观众鼓掌喝彩
class com.sun.proxy.$Proxy16     使用基于接口的代理（推荐）
```
#### 有参
##### log
###### Log
```java
package log;

import org.springframework.stereotype.Component;

@Component
public class Log {
    public void print(Object o) {
        System.out.println(o);
    }
}
```
###### **LogInterceptor**
```java
package log;

import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
import org.aspectj.lang.annotation.Pointcut;
import org.springframework.stereotype.Component;

@Aspect
@Component     组件（Bean）
public class LogInterceptor {     切面
    @Pointcut("execution(* log.Log.print(Object)) && args(i)")     切点
    public void logged(Object i) {
    }

    @Before("logged(j)")     前置通知
    public void capture(Object j) {
        System.out.println("捕获:" + j);
    }
}

execution 匹配执行方法（连接点）。
args 指示将被通知方法的入参传递给通知方法。（Arguments）
```
##### **AppConfig**
```java
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.EnableAspectJAutoProxy;

@Configuration
@EnableAspectJAutoProxy     启用 AspectJ 自动代理
@ComponentScan("log")
public class AppConfig {
}
```
##### Main
```java
import log.Log;
import org.springframework.context.annotation.AnnotationConfigApplicationContext;

public class Main {
    public static void main(String[] args) {
        AnnotationConfigApplicationContext context = new AnnotationConfigApplicationContext(AppConfig.class);

        Log log = context.getBean(Log.class);
        log.print(1);
        log.print(2);
        log.print("A");

        System.out.println(log.getClass());

        context.destroy();
    }
}

----
输出：
捕获:1
1
捕获:2
2
捕获:A
A
class log.Log$$EnhancerBySpringCGLIB$$72b5a387     由于 Bean 未实现任何接口，使用 CGLib 生成基于类的代理（不推荐）
```
### 方法引入
Kotlin 原生支持扩展函数。
