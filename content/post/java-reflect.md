---
author: XhstormR
categories:
- JAVA
date: 2017-05-08T10:37:40+08:00
title: Java Reflect
---

<!--more-->

Updated on 2017-05-08

> {{< image "/uploads/java-reflect.png" "Reflect" "1" "1" >}}
>
> [反射 API](http://download.java.net/jdk/jdk-api-localizations/jdk-api-zh-cn/publish/1.6.0/html/zh_CN/api/java/lang/reflect/package-summary.html)

## Class 对象
类是 java.lang.Class 的实例对象。

```java
package a;

public class A {
    public static void main(String[] args) throws ClassNotFoundException, IllegalAccessException, InstantiationException {
        编译时刻就加载类（静态加载）
        Class<? extends A> c1 = new A().getClass();     通过实例对象获得 Class 对象
        Class<A> c2 = A.class;     通过静态成员获得 Class 对象
        运行时刻才加载类（动态加载）
        Class<?> c3 = Class.forName("a.A");     动态加载类（可能会抛出 ClassNotFoundException 异常）

        System.out.println(c1);
        System.out.println(c2);
        System.out.println(c3);
        System.out.println(c1.getName());     获得完全类名限定符
        System.out.println(c1.getSimpleName());     获得类名
        System.out.println(c1 == c2);
        System.out.println(c2 == c3);

        A a = c1.newInstance();     通过 Class 对象实例化类（需要有无参构造方法）

        A a = new A();     a 是 A 的实例对象
        Class<A> c = A.class;     c 是 Class 的实例对象
    }
}

----
输出：
class a.A
class a.A
class a.A
a.A
A
true
true
```

## Method 对象
```java
package a;

import java.lang.reflect.Method;
import java.util.Arrays;

public class A {
    public static void main(String[] args) {
        Class<A> c = A.class;
        Method[] methods1 = c.getMethods();     获得所有公有的方法（包括继承）
        Method[] methods2 = c.getDeclaredMethods();     获得所有自己的方法（包括私有）
        show(methods1);
        System.out.println();
        show(methods2);
    }

    private static void show(Method[] methods) {
        for (Method method : methods) {
            String methodName = method.getName();     获得方法名
            String returnTypeName = method.getReturnType().getSimpleName();     获得返回类型的类名
            Class<?>[] parameterTypes = method.getParameterTypes();     获得参数类型
            System.out.println(methodName + "  " + returnTypeName + "  " + Arrays.toString(parameterTypes));
        }
    }
}

----
输出：
main  void  [class [Ljava.lang.String;]
wait  void  []
wait  void  [long, int]
wait  void  [long]
equals  boolean  [class java.lang.Object]
toString  String  []
hashCode  int  []
getClass  Class  []
notify  void  []
notifyAll  void  []

main  void  [class [Ljava.lang.String;]
show  void  [class [Ljava.lang.reflect.Method;]
```

### Method Invoke
```java
package a;

import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;

public class A {
    public static void main(String[] args) throws IllegalAccessException, InstantiationException, NoSuchMethodException, InvocationTargetException {
        Class<A> c = A.class;
        A a = c.newInstance();     通过 Class 对象实例化类（需要有无参构造方法）
        Method print1 = c.getMethod("print");     获得公有方法
        Method print2 = c.getMethod("print", int.class);
        Method print3 = c.getDeclaredMethod("print", String.class);     获得私有方法

//      a.print();     正常调用方法
//      a.print(1);
//      a.print("A");
        Object o1 = print1.invoke(a);     反射调用方法（无返回值为 null）
        Object o2 = print2.invoke(a, 1);
        Object o3 = print3.invoke(a, "A");
        System.out.println(o1);
        System.out.println(o2);
        System.out.println(o3);
    }

    public void print() {
        System.out.println("A");
    }

    public String print(int i) {
        System.out.println("B");
        return "B";
    }

    private void print(String s) {
        System.out.println("C");
    }
}

----
输出：
A
B
C
null
B
null
```

## Field 对象
```java
package a;

import java.lang.reflect.Field;
import java.lang.reflect.Modifier;

public class A {
    public static void main(String[] args) {
        Class<String> c = String.class;
        Field[] fields1 = c.getFields();     获得所有公有的属性（包括继承）
        Field[] fields2 = c.getDeclaredFields();     获得所有自己的属性（包括私有）

        show(fields1);
        System.out.println();
        show(fields2);
    }

    private static void show(Field[] fields) {
        for (Field field : fields) {
            String fieldName = field.getName();     获得属性名
            String fieldTypeName = field.getType().getSimpleName();     获得属性类型的类名
            String modifiers = Modifier.toString(field.getModifiers());     获得访问修饰符
            System.out.println(fieldName + "  " + fieldTypeName);
        }
    }
}

----
输出：
CASE_INSENSITIVE_ORDER  Comparator

value  char[]
hash  int
serialVersionUID  long
serialPersistentFields  ObjectStreamField[]
CASE_INSENSITIVE_ORDER  Comparator
```

## Constructor 对象
```java
package a;

import java.lang.reflect.Constructor;
import java.util.Arrays;

public class A {
    public static void main(String[] args) {
        Class<Integer> c = Integer.class;
        Constructor<?>[] constructors1 = c.getConstructors();     获得所有公有构造方法
        Constructor<?>[] constructors2 = c.getDeclaredConstructors();     获得所有构造方法（包括私有）

        show(constructors1);
        System.out.println();
        show(constructors2);
    }

    private static void show(Constructor<?>[] constructors) {
        for (Constructor<?> constructor : constructors) {
            String constructorName = constructor.getName();     获得方法名
            Class<?>[] parameterTypes = constructor.getParameterTypes();     获得参数类型
            System.out.println(constructorName + "  " + Arrays.toString(parameterTypes));
        }
    }
}

----
输出：
java.lang.Integer  [int]
java.lang.Integer  [class java.lang.String]

java.lang.Integer  [int]
java.lang.Integer  [class java.lang.String]
```

## 通过反射理解泛型本质
1. 反射的操作都是在**运行时刻**进行。
2. **编译之后**的集合会**去掉泛型约束**。
  * 泛型约束只在编译阶段有效。
3. 绕过编译 ➜ 绕过泛型。

```java
import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;
import java.util.ArrayList;

public class A {
    public static void main(String[] args) throws NoSuchMethodException, InvocationTargetException, IllegalAccessException {
        ArrayList<Integer> list = new ArrayList<>();
        list.add(1);
//      list.add("A");     错误（泛型约束）

        System.out.println(list);

        Class<? extends ArrayList> c = list.getClass();
        Method add = c.getMethod("add", Object.class);
        add.invoke(list, "A");

        System.out.println(list);
    }
}

----
输出：
[1]
[1, A]
```
