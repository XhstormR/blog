---
author: XhstormR
categories:
- Spring
date: 2017-06-07T13:20:02+08:00
title: Spring Framework
---

<!--more-->

Updated on 2017-06-07

> {{< image "/uploads/spring.png" "Spring Framework" "1" "1" >}}

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
* 单例：每个 **应用** 创建一个。（Singleton）（默认）
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
    @Scope(ConfigurableBeanFactory.SCOPE_PROTOTYPE)     每次注入都创建一个（也可用在 @Component 上）
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
@PropertySource("123.properties")     指示加载属性文件至 Spring 中的 Environment
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
