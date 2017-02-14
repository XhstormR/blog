+++
Categories = ["JAVA"]
date = "2016-11-19T14:16:15+08:00"
title = "Java Singleton"

+++

<!--more-->

Updated on 2016-11-19

> https://zh.wikipedia.org/zh-cn/单例模式
>
> [src](https://github.com/bumptech/glide/blob/master/integration/okhttp/src/main/java/com/bumptech/glide/integration/okhttp/OkHttpUrlLoader.java#L40)

## 饿汉方式
实例在 **加载时** 就创建。

```java
public class A {
    private static final A Instance = new A();

    private A() {     私有构造方法
    }

    public static A getInstance() {
        return Instance;
    }
}
```

## 懒汉方式
实例在 **使用时** 才创建。

```java
public class A {     双重校验锁
    private static volatile A Instance;     禁止指令重排并保证可见性

    private A() {     私有构造方法
    }

    public static A getInstance() {
        if (Instance == null) {     第一次检查
            synchronized (A.class) {
                if (Instance == null) {    第二次检查（防止多个进程因同时判断实例为 null，而进入同步块，而再次实例化）
                    Instance = new A();
                }
            }
        }
        return Instance;
    }
}
```

```java
public class A {     静态内部类
    private A() {     私有构造方法
    }

    public static A getInstance() {
        return InstanceHolder.Instance;     由 JVM 类加载机制来保证单例
    }

    private static class InstanceHolder {     静态内部类为饿汉方式
        private static final A Instance = new A();
    }
}
```

---

```java
public static void main(String[] args) {
    IntStream.range(0, 2000).forEach(o -> new Thread(() -> System.out.println(A.getInstance().hashCode())).start());
    or
    Stream.generate(() -> new Thread(() -> System.out.println(A.getInstance().hashCode()))).limit(2000).forEach(Thread::start);
}
```