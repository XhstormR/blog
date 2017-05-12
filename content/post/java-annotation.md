---
author: XhstormR
categories:
- JAVA
date: 2017-05-09T21:08:55+08:00
title: Java Annotation
---

<!--more-->

Updated on 2017-05-09

> {{< image "/uploads/java-annotation.png" "Annotation" "1" "1" >}}
>
> [注解 API](http://download.java.net/jdk/jdk-api-localizations/jdk-api-zh-cn/publish/1.6.0/html/zh_CN/api/java/lang/annotation/package-summary.html)

## 元注解
负责注解注解的注解

### @Target（多个参数）
指示注解目标。

#### ElementType
* TYPE：类、接口、枚举、注解
* FIELD：属性
* METHOD：方法
* CONSTRUCTOR：构造方法
* PARAMETER：参数
* LOCAL_VARIABLE：变量
* ANNOTATION_TYPE：注解
* PACKAGE：包

### @Retention（一个参数）
指示生命周期。

#### RetentionPolicy
* SOURCE：源代码，**源码** 注解。
* CLASS：字节码，**编译** 注解，注解在虚拟机 **运行时被忽略**。（缺省行为）
* RUNTIME：字节码，**运行** 注解，注解在虚拟机 **运行时被保留**，因此 **可通过反射读取**。

### @Inherited（标识注解）
指示 **自动继承** 此注解。（仅对类注解有效）

### @Documented（标识注解）
指示 **文档包含** 此注解。

## Code

### @User
```java
import java.lang.annotation.*;

@Target({ElementType.METHOD, ElementType.TYPE})
@Retention(RetentionPolicy.RUNTIME)
@Inherited
@Documented
public @interface User {
    String name();

    int age() default 15;

    String description() default "Description";
}
```

### A
```java
import java.lang.reflect.Method;

@User(name = "Mack", age = 18)
public class A {

    @User(name = "Jack", age = 27)
    public static void main(String[] args) {
        Class<A> c = A.class;
        boolean b;

        b = c.isAnnotationPresent(User.class);
        if (b) {
            System.out.print("类注解：");
            User user = c.getAnnotation(User.class);
            show(user);
        }

        Method[] methods = c.getDeclaredMethods();
        for (Method method : methods) {
            b = method.isAnnotationPresent(User.class);
            if (b) {
                System.out.print("方法注解：");
                User user = method.getAnnotation(User.class);
                show(user);
            }
        }
    }

    @User(name = "Dave")
    private static void show(User user) {
        int age = user.age();
        String name = user.name();
        String description = user.description();
        System.out.printf("%s %d %s\n", name, age, description);
    }
}

----
输出：
类注解：Mack 18 Description
方法注解：Jack 27 Description
方法注解：Dave 15 Description
```

---

### @Table
```java
import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

@Target(ElementType.TYPE)
@Retention(RetentionPolicy.RUNTIME)
public @interface Table {
    String value();
}
```

### @Column
```java
import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

@Target(ElementType.FIELD)
@Retention(RetentionPolicy.RUNTIME)
public @interface Column {
    String value();
}
```

### Filter
```java
@Table("user")
public class Filter {
    @Column("id")
    private Integer i1;
    @Column("age")
    private Integer i2;

    private Integer i3;
    @Column("name")
    private String s1;
    @Column("city")
    private String s2;
    @Column("email")
    private String s3;

    public Integer getI1() {
        return i1;
    }

    public void setI1(Integer i1) {
        this.i1 = i1;
    }

    public Integer getI2() {
        return i2;
    }

    public void setI2(Integer i2) {
        this.i2 = i2;
    }

    public Integer getI3() {
        return i3;
    }

    public void setI3(Integer i3) {
        this.i3 = i3;
    }

    public String getS1() {
        return s1;
    }

    public void setS1(String s1) {
        this.s1 = s1;
    }

    public String getS2() {
        return s2;
    }

    public void setS2(String s2) {
        this.s2 = s2;
    }

    public String getS3() {
        return s3;
    }

    public void setS3(String s3) {
        this.s3 = s3;
    }
}
```

### A
```java
import java.lang.reflect.Field;
import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;

public class A {
    public static void main(String[] args) throws NoSuchMethodException, InvocationTargetException, IllegalAccessException {
        Filter filter1 = new Filter();
        filter1.setI2(10);
        filter1.setS1("Tom");

        Filter filter2 = new Filter();
        filter2.setI1(1);
        filter2.setS2("Chongqing");

        System.out.println(query(filter1));
        System.out.println(query(filter2));
    }

    private static String query(Filter filter) throws NoSuchMethodException, InvocationTargetException, IllegalAccessException {
        Class<? extends Filter> c = filter.getClass();
        boolean b = c.isAnnotationPresent(Table.class);
        if (!b) {
            return null;
        }
        StringBuilder sb = new StringBuilder();

        Table table = c.getAnnotation(Table.class);
        String s = table.value();
        sb.append("select * from ").append(s).append(" where 1=1");

        Field[] fields = c.getDeclaredFields();
        for (Field field : fields) {
            b = field.isAnnotationPresent(Column.class);
            if (!b) {
                continue;
            }
            String fieldName = field.getName();
            s = "get" + fieldName.substring(0, 1).toUpperCase() + fieldName.substring(1);
            Method method = c.getMethod(s);
            Object fieldValue = method.invoke(filter);
            if (fieldValue == null) {
                continue;
            }
            Column column = field.getAnnotation(Column.class);
            fieldName = column.value();
            if (fieldValue instanceof String) {
                sb.append(" and ").append(fieldName).append("=").append('\'').append(fieldValue).append('\'');
            } else {
                sb.append(" and ").append(fieldName).append("=").append(fieldValue);
            }
        }

        return sb.append(';').toString();
    }
}

----
输出：
select * from user where 1=1 and age=10 and name='Tom';
select * from user where 1=1 and id=1 and city='Chongqing';
```
