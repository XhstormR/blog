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
    private Object o1;
    @Column("age")
    private Object o2;
    @Column("name")
    private Object o3;
    @Column("city")
    private Object o4;
    @Column("email")
    private Object o5;

    private Object o6;

    public Object getO1() {
        return o1;
    }

    public void setO1(Object o1) {
        this.o1 = o1;
    }

    public Object getO2() {
        return o2;
    }

    public void setO2(Object o2) {
        this.o2 = o2;
    }

    public Object getO3() {
        return o3;
    }

    public void setO3(Object o3) {
        this.o3 = o3;
    }

    public Object getO4() {
        return o4;
    }

    public void setO4(Object o4) {
        this.o4 = o4;
    }

    public Object getO5() {
        return o5;
    }

    public void setO5(Object o5) {
        this.o5 = o5;
    }

    public Object getO6() {
        return o6;
    }

    public void setO6(Object o6) {
        this.o6 = o6;
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
        filter1.setO2(10);
        filter1.setO3("Tom");

        Filter filter2 = new Filter();
        filter2.setO1(1);
        filter2.setO4("Chongqing");

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
            String columnName = column.value();
            if (fieldValue instanceof String) {
                sb.append(" and ").append(columnName).append("=").append('\'').append(fieldValue).append('\'');
            } else {
                sb.append(" and ").append(columnName).append("=").append(fieldValue);
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
