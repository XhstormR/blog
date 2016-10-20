+++
Categories = ["JAVA"]
date = "2016-10-19T18:12:06+08:00"
title = "JAVA Thread"

+++

<!--more-->

Updated on 2016-10-19

>

* 进程：包含了某些资源的内存区域。
  * 一个进程中可以包含多个线程。
* 线程：进程的顺序执行流，系统中最小的执行单元。
  * 线程共享进程的资源。

## 创建线程
```java
public class A extends Thread {     通过继承 Thread 类
    public static void main(String[] args) {
        Thread a = new A();     实例化线程
        a.start();     启动线程
    }

    @Override
    public void run() {     执行逻辑
        for (int i = 0; i < 5; i++) {
            System.out.println("123");
        }
    }
}

----

public class A implements Runnable {     通过实现 Runnable 接口（推荐）
    public static void main(String[] args) {
        Thread a = new Thread(new A());     实例化线程并传入线程体
        a.start();     启动线程
    }

    @Override
    public void run() {     执行逻辑
        for (int i = 0; i < 5; i++) {
            System.out.println("123");
        }
    }
}

----

public class A {     通过创建匿名内部类
    public static void main(String[] args) {
        Thread a = new Thread() {
            @Override
            public void run() {     执行逻辑
                for (int i = 0; i < 5; i++) {
                    System.out.println("123");
                }
            }
        };
        a.start();     启动线程

        Thread b = new Thread(new Runnable() {
            @Override
            public void run() {     执行逻辑
                for (int i = 0; i < 5; i++) {
                    System.out.println("123");
                }
            }
        });
        b.start();     启动线程
    }
}
```

## 操作线程
```java
public class A implements Runnable {
    public static void main(String[] args) throws InterruptedException {
        Thread thread = Thread.currentThread();     主线程
        System.out.println("标识符::名称::优先级::状态::是否处于活动状态::是否标记为中断");
        System.out.println(thread.getId() + "::" + thread.getName() + "::" + thread.getPriority() + "::" + thread.getState() + "::" + thread.isAlive() + "::" + thread.isInterrupted());

        System.out.println();
        Thread a = new Thread(new A(), "MyThread_1");     实例化线程并传入线程体
        System.out.println(a.getId() + "::" + a.getName() + "::" + a.getPriority() + "::" + a.getState() + "::" + a.isAlive() + "::" + a.isInterrupted());
        a.start();     启动线程
        System.out.println(a.getId() + "::" + a.getName() + "::" + a.getPriority() + "::" + a.getState() + "::" + a.isAlive() + "::" + a.isInterrupted());
        Thread.sleep(1000);     进入阻塞状态 1 秒（1000 毫秒 = 1 秒）
        System.out.println(a.getId() + "::" + a.getName() + "::" + a.getPriority() + "::" + a.getState() + "::" + a.isAlive() + "::" + a.isInterrupted());

        System.out.println();
        Thread b = new Thread(new A(), "MyThread_2");     实例化线程并传入线程体
        System.out.println(b.getId() + "::" + b.getName() + "::" + b.getPriority() + "::" + b.getState() + "::" + b.isAlive() + "::" + b.isInterrupted());
        b.start();     启动线程
        System.out.println(b.getId() + "::" + b.getName() + "::" + b.getPriority() + "::" + b.getState() + "::" + b.isAlive() + "::" + b.isInterrupted());
        Thread.sleep(1000);     进入阻塞状态 1 秒（1000 毫秒 = 1 秒）
        System.out.println(b.getId() + "::" + b.getName() + "::" + b.getPriority() + "::" + b.getState() + "::" + b.isAlive() + "::" + b.isInterrupted());
    }

    @Override
    public void run() {
    }
}
----
输出：
标识符::名称::优先级::状态::是否处于活动状态::是否标记为中断
1::main::5::RUNNABLE::true::false

11::MyThread_1::5::NEW::false::false
11::MyThread_1::5::RUNNABLE::true::false
11::MyThread_1::5::TERMINATED::false::false

12::MyThread_2::5::NEW::false::false
12::MyThread_2::5::RUNNABLE::true::false
12::MyThread_2::5::TERMINATED::false::false
```

### 优先级
### 守护线程