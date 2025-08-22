---
author: XhstormR
tags:
- Spring
date: 2017-05-21T20:11:22+08:00
title: Spring Framework
---

<!--more-->

Updated on 2017-07-11

> {{< image "uploads/spring.png" "Spring Framework" "1" "1" >}}
>
> https://spring.io/projects
>
> https://github.com/spring-projects/spring-framework
>
> https://github.com/spring-projects/spring-boot
>
> [Dependency](https://raw.githubusercontent.com/spring-projects/spring-boot/master/spring-boot-project/spring-boot-dependencies/build.gradle)
>
> [Spring Doc](https://docs.spring.io/spring/docs/current/spring-framework-reference/htmlsingle/)
> |
> [Spring API](https://docs.spring.io/spring/docs/current/javadoc-api/allclasses-noframe.html)
>
> [Spring Boot Doc](https://docs.spring.io/spring-boot/docs/current/reference/htmlsingle/)
> |
> [Spring Boot API](https://docs.spring.io/spring-boot/docs/current/api/allclasses-noframe.html)
>
> [Spring Security Doc](https://docs.spring.io/spring-security/site/docs/current/reference/htmlsingle/)
> |
> [Spring Security API](https://docs.spring.io/spring-security/site/docs/current/api/allclasses-noframe.html)
>
> [Spring Data JPA Doc](https://docs.spring.io/spring-data/jpa/docs/current/reference/html/#jpa.query-methods.query-creation)
> |
> [Spring Data JPA API](https://docs.spring.io/spring-data/jpa/docs/current/api/allclasses-noframe.html)

## Concept
* 控制反转（IOC）：应用程序本身不负责依赖对象的创建与维护，而是**由外部容器负责管理**。
  * 依赖注入（DI）是其实现方式。
  * 依赖对象 **通过接口** 了解注入对象并 **表明依赖关系**。（面向接口编程）
  * 作用：负责 **创建** 对象并 **维护** 对象之间的依赖关系，使应用对象彼此之间保持 **低耦合**。
  * 对象解耦。
* 面向切面编程（AOP）：用另一种编程架构的思想来 **补充面向对象编程**（OOP）的思想。
  * AOP 进行 **提取**，OOP 进行 **封装**。
  * AOP 主要的模块单元是 **切面**（Aspect），而 OOP 主要的模块单元是 **类**（Class）。
  * 作用：使诸如日志管理等分散在各个应用对象的 **逻辑（横切关注点）模块化为切面**。
  * 功能解耦。
* 装配：Wiring。
* 感知：Aware。
* 组件：@Component
  * 控制层：@Controller
  * 业务层：@Service
  * 持久层：@Repository

## Configuration
### build.gradle.kts
```bash
compile("org.springframework:spring-context:+")

compile("org.springframework:spring-aspects:+")
```

## 装配方式
### 组件扫描和自动装配（隐式装配）
#### soundsystem
##### CompactDisc
```java
package soundsystem;

public interface CompactDisc {
    void play();
}
```
##### MediaPlayer
```java
package soundsystem;

public interface MediaPlayer {
    void play();
}
```
##### **SgtPeppers**
```java
package soundsystem;

import org.springframework.stereotype.Component;

@Component     组件（Java 规范中的 Named 作用与其相同）
public class SgtPeppers implements CompactDisc {
    private final String title = "Sgt. Pepper's Lonely Hearts Club Band";
    private final String artist = "The Beatles";

    @Override
    public void play() {
        System.out.println("Playing " + title + " by " + artist);
    }
}

Bean 名称的缺省值为类名（首字母小写）（@Component）。
```
##### **CDPlayer**
```java
package soundsystem;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component     组件（Java 规范中的 Named 作用与其相同）
public class CDPlayer implements MediaPlayer {
    private CompactDisc cd;

    @Autowired     自动装配（Java 规范中的 Inject 作用与其相同）
    public CDPlayer(CompactDisc cd) {     构造注入
        this.cd = cd;
    }

    @Override
    public void play() {
        cd.play();
    }
}
```
#### **AppConfig**
```java
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;

@Configuration     指示为配置类
@ComponentScan(basePackages = {"soundsystem"})     组件扫描（搜寻其他 Component 和 Configuration）
public class AppConfig {
}
```
#### Main
```java
import org.springframework.context.annotation.AnnotationConfigApplicationContext;
import soundsystem.CDPlayer;

public class Main {
    public static void main(String[] args) {
        AnnotationConfigApplicationContext context = new AnnotationConfigApplicationContext(AppConfig.class);

        CDPlayer cdPlayer = context.getBean(CDPlayer.class);
        cdPlayer.play();

        context.destroy();
    }
}

----
输出：
Playing Sgt. Pepper's Lonely Hearts Club Band by The Beatles
```

### Java 注解（显式装配）
#### soundsystem
##### CompactDisc
```java
package soundsystem;

public interface CompactDisc {
    void play();
}
```
##### MediaPlayer
```java
package soundsystem;

public interface MediaPlayer {
    void play();
}
```
##### SgtPeppers
```java
package soundsystem;

public class SgtPeppers implements CompactDisc {
    private final String title = "Sgt. Pepper's Lonely Hearts Club Band";
    private final String artist = "The Beatles";

    @Override
    public void play() {
        System.out.println("Playing " + title + " by " + artist);
    }
}
```
##### CDPlayer
```java
package soundsystem;

public class CDPlayer implements MediaPlayer {
    private CompactDisc cd;

    public CDPlayer(CompactDisc cd) {
        this.cd = cd;
    }

    @Override
    public void play() {
        cd.play();
    }
}
```
#### **AppConfig**
```java
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import soundsystem.CDPlayer;
import soundsystem.CompactDisc;
import soundsystem.MediaPlayer;
import soundsystem.SgtPeppers;

@Configuration     指示为配置类（用于定义 Bean）
public class AppConfig {
    @Bean     指示该方法返回 Bean 对象并在容器中注册
    public CompactDisc sgtPeppers() {
        return new SgtPeppers();
    }

    @Bean     指示该方法返回 Bean 对象并在容器中注册
    public MediaPlayer cdPlayer(CompactDisc cd) {     从容器中获取依赖对象
        return new CDPlayer(cd);     并注入（装配）
    }
}

Bean 名称的缺省值为方法名（@Bean）。
```
#### Main
```java
import org.springframework.context.annotation.AnnotationConfigApplicationContext;
import soundsystem.CDPlayer;

public class Main {
    public static void main(String[] args) {
        AnnotationConfigApplicationContext context = new AnnotationConfigApplicationContext(AppConfig.class);

        CDPlayer cdPlayer = context.getBean(CDPlayer.class);
        cdPlayer.play();

        context.destroy();
    }
}

----
输出：
Playing Sgt. Pepper's Lonely Hearts Club Band by The Beatles
```

### XML 文件（显式装配）
#### soundsystem
##### CompactDisc
```java
package soundsystem;

public interface CompactDisc {
    void play();
}
```
##### MediaPlayer
```java
package soundsystem;

public interface MediaPlayer {
    void play();
}
```
##### SgtPeppers
```java
package soundsystem;

public class SgtPeppers implements CompactDisc {
    private final String title = "Sgt. Pepper's Lonely Hearts Club Band";
    private final String artist = "The Beatles";

    @Override
    public void play() {
        System.out.println("Playing " + title + " by " + artist);
    }
}
```
##### CDPlayer
```java
package soundsystem;

public class CDPlayer implements MediaPlayer {
    private CompactDisc cd;

    public CDPlayer(CompactDisc cd) {
        this.cd = cd;
    }

    @Override
    public void play() {
        cd.play();
    }
}
```
#### Main
```java
import org.springframework.context.support.GenericXmlApplicationContext;
import soundsystem.CDPlayer;

public class Main {
    public static void main(String[] args) {
        GenericXmlApplicationContext context = new GenericXmlApplicationContext("123.xml");

        CDPlayer cdPlayer = context.getBean(CDPlayer.class);
        cdPlayer.play();

        context.destroy();
    }
}

----
输出：
Playing Sgt. Pepper's Lonely Hearts Club Band by The Beatles
```
#### **123.xml**
```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE beans PUBLIC
        "-//SPRING//DTD BEAN 2.0//EN"
        "http://www.springframework.org/dtd/spring-beans-2.0.dtd">
<beans>
    <bean id="sgtPeppers" class="soundsystem.SgtPeppers"/>     声明 Bean 并指定名称

    <bean class="soundsystem.CDPlayer">     声明 Bean，缺省名称为 "soundsystem.CDPlayer#0"
        <constructor-arg ref="sgtPeppers"/>     强制依赖的注入可使用构造方法（构造注入）
        ----
        <property name="cd" ref="sgtPeppers"/>     可选依赖的注入可使用 Setter（设值注入）
        对应 Setter：
        public void setCd(CompactDisc cd) {
            this.cd = cd;
        }
    </bean>
</beans>
```

### 混合使用
#### **cd-config.xml**
```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE beans PUBLIC
        "-//SPRING//DTD BEAN 2.0//EN"
        "http://www.springframework.org/dtd/spring-beans-2.0.dtd">
<beans>
    <bean class="soundsystem.SgtPeppers"/>
</beans>
```
#### **PlayerConfig**
```java
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import soundsystem.CDPlayer;
import soundsystem.CompactDisc;
import soundsystem.MediaPlayer;

@Configuration     指示为配置类
public class PlayerConfig {
    @Bean
    public MediaPlayer cdPlayer(CompactDisc cd) {
        return new CDPlayer(cd);
    }
}
```
#### **AppConfig**
```java
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Import;
import org.springframework.context.annotation.ImportResource;

@Configuration
@Import(PlayerConfig.class)     导入 Java 注解
@ImportResource("cd-config.xml")     导入 XML 文件
public class AppConfig {
}
```
#### Main
```java
import org.springframework.context.annotation.AnnotationConfigApplicationContext;
import soundsystem.CDPlayer;

public class Main {
    public static void main(String[] args) {
        AnnotationConfigApplicationContext context = new AnnotationConfigApplicationContext(AppConfig.class);

        CDPlayer cdPlayer = context.getBean(CDPlayer.class);
        cdPlayer.play();

        context.destroy();
    }
}

----
输出：
Playing Sgt. Pepper's Lonely Hearts Club Band by The Beatles
```
