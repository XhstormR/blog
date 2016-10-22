+++
Categories = ["JAVA"]
date = "2016-10-19T18:12:06+08:00"
title = "JAVA Thread"

+++

<!--more-->

Updated on 2016-10-19

>

* 进程：一块包含了某些资源的内存区域。
  * 一个进程中至少包含一个或多个线程（执行单元）。
* 线程：进程的顺序执行流，系统中最小的执行单元。
  * 所有线程共享同一个进程的资源。
* 并发：OS 的线程调度机制将时间划分为很多时间片（**分时**），尽可能均匀分配给正在运行的线程（**抢占**），获得 CPU 时间片的线程得以被执行，其他则等待；而 CPU 则在这些线程上来回切换运行。
  * 微观上走走停停，宏观上都在运行。

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

public class A implements Runnable {     通过实现 Runnable 接口（推荐，因为单继承，多实现）
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
        Thread a = new Thread() {     Thread 方式
            @Override
            public void run() {     执行逻辑
                for (int i = 0; i < 5; i++) {
                    System.out.println("123");
                }
            }
        };
        a.start();     启动线程

        Thread b = new Thread(new Runnable() {     Runnable 方式
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

### 线程信息
```java
public class A implements Runnable {
    public static void main(String[] args) throws InterruptedException {
        Thread thread = Thread.currentThread();     获取当前线程对象（这里获得了主线程对象）
        System.out.println("标识符::名称::优先级::状态::是否处于活动状态::是否标记为中断");
        System.out.println(thread.getId() + "::" + thread.getName() + "::" + thread.getPriority() + "::" + thread.getState() + "::" + thread.isAlive() + "::" + thread.isInterrupted());

        System.out.println();
        Thread a = new Thread(new A(), "MyThread_1");     实例化线程并传入线程体
        System.out.println(a.getId() + "::" + a.getName() + "::" + a.getPriority() + "::" + a.getState() + "::" + a.isAlive() + "::" + a.isInterrupted());
        a.start();     启动线程
        System.out.println(a.getId() + "::" + a.getName() + "::" + a.getPriority() + "::" + a.getState() + "::" + a.isAlive() + "::" + a.isInterrupted());
        Thread.sleep(1000);     当前线程进入阻塞状态 1 秒（1000 毫秒 = 1 秒）
        System.out.println(a.getId() + "::" + a.getName() + "::" + a.getPriority() + "::" + a.getState() + "::" + a.isAlive() + "::" + a.isInterrupted());

        System.out.println();
        Thread b = new Thread(new A(), "MyThread_2");     实例化线程并传入线程体
        System.out.println(b.getId() + "::" + b.getName() + "::" + b.getPriority() + "::" + b.getState() + "::" + b.isAlive() + "::" + b.isInterrupted());
        b.start();     启动线程
        System.out.println(b.getId() + "::" + b.getName() + "::" + b.getPriority() + "::" + b.getState() + "::" + b.isAlive() + "::" + b.isInterrupted());
        Thread.sleep(1000);     当前线程进入阻塞状态 1 秒（1000 毫秒 = 1 秒）
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

### 线程优先级
```java
public class A implements Runnable {
    public static void main(String[] args) {
        Thread a = new Thread(new A(), "MyThread_1");
        Thread b = new Thread(new A(), "MyThread_2");
        a.setPriority(Thread.NORM_PRIORITY);     默认优先级 5
        a.setPriority(Thread.MIN_PRIORITY);     设置为最小优先级 1（降低线程获得时间片的几率）
        b.setPriority(Thread.MAX_PRIORITY);     设置为最大优先级 10（提高线程获得时间片的几率）
        a.start();     启动线程
        b.start();     启动线程
    }

    @Override
    public void run() {
        Thread thread = Thread.currentThread();     获取当前线程对象
        for (int i = 0; i < 5; i++) {
            System.out.println(thread.getName());
        }
    }
}
----
输出：
MyThread_2
MyThread_2
MyThread_2
MyThread_2
MyThread_2
MyThread_1
MyThread_1
MyThread_1
MyThread_1
MyThread_1
```

### 守护线程
```java
public class A implements Runnable {
    public static void main(String[] args) {
        Thread a = new Thread(new A(), "Daemon");
        a.setDaemon(true);     设置为守护线程（特点：当进程中只剩下守护线程时，所有守护线程将被强制终止）
        a.start();     启动线程
    }

    @Override
    public void run() {
        Thread thread = Thread.currentThread();     获取当前线程对象
        for (int i = 1; true; i++) {
            System.out.println(thread.getName() + "::" + i);
            try {
                Thread.sleep(1000);     当前线程进入阻塞状态 1 秒
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
        }
    }
}
----
输出：
（无）
```

### 阻塞线程

#### sleep
```java
public class A {
    public static void main(String[] args) {
        SimpleDateFormat simpleDateFormat = new SimpleDateFormat("hh:mm:ss");
        while (true) {
            System.out.println(simpleDateFormat.format(new Date()));
            try {
                Thread.sleep(1000);     当前线程进入阻塞状态 1 秒，之后重新进入 Runnable 状态，等待获得时间片
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
        }
    }
}
----
输出：
11:44:23
11:44:24
11:44:25
11:44:26
11:44:27
11:44:28
...
```

#### join
```java
public class A implements Runnable {     使用 join 方法
    public static void main(String[] args) {
        Thread a = new Thread(new A(), "MyThread_1");
        a.start();     启动线程
        try {
            a.join();     当前线程进入阻塞状态，等待调用 join 方法的线程的线程体（run 方法）结束
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
        System.out.println("—————————————");
    }

    @Override
    public void run() {
        Thread thread = Thread.currentThread();
        for (int i = 0; i < 5; ) {
            System.out.println(thread.getName() + "::" + ++i);
            try {
                Thread.sleep(1000);
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
        }
    }
}
----
输出：
MyThread_1::1
MyThread_1::2
MyThread_1::3
MyThread_1::4
MyThread_1::5
—————————————

-------------------------------------------------------

public class A implements Runnable {     未使用 join 方法
    public static void main(String[] args) {
        Thread a = new Thread(new A(), "MyThread_1");
        a.start();     启动线程
        System.out.println("—————————————");
    }

    @Override
    public void run() {
        Thread thread = Thread.currentThread();
        for (int i = 0; i < 5; ) {
            System.out.println(thread.getName() + "::" + ++i);
            try {
                Thread.sleep(1000);
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
        }
    }
}
----
输出：
—————————————
MyThread_1::1
MyThread_1::2
MyThread_1::3
MyThread_1::4
MyThread_1::5
```

### yield
```java
public class A implements Runnable {     使用 yield 方法
    public static void main(String[] args) {
        Thread a = new Thread(new A(), "MyThread_1");
        Thread b = new Thread(new A(), "MyThread_2");
        a.start();     启动线程
        b.start();     启动线程
    }

    @Override
    public void run() {
        Thread thread = Thread.currentThread();
        for (int i = 0; i < 5; i++) {
            System.out.println(thread.getName());
            Thread.yield();     强制当前线程主动让出 CPU 时间片，回到 Runnable 状态，等待获得时间片
        }
    }
}
----
输出：
MyThread_1
MyThread_2
MyThread_1
MyThread_2
MyThread_1
MyThread_2
MyThread_1
MyThread_2
MyThread_1
MyThread_2

-------------------------------------------------------

public class A implements Runnable {     未使用 yield 方法
    public static void main(String[] args) {
        Thread a = new Thread(new A(), "MyThread_1");
        Thread b = new Thread(new A(), "MyThread_2");
        a.start();     启动线程
        b.start();     启动线程
    }

    @Override
    public void run() {
        Thread thread = Thread.currentThread();
        for (int i = 0; i < 5; i++) {
            System.out.println(thread.getName());
        }
    }
}
----
输出：
MyThread_1
MyThread_1
MyThread_1
MyThread_1
MyThread_2
MyThread_2
MyThread_2
MyThread_2
MyThread_2
MyThread_1
```

### 停止线程
```java
public class A implements Runnable {     通过调用 interrupt 方法
    public static void main(String[] args) {
        Thread a = new Thread(new A());
        a.start();     启动线程
        try {
            Thread.sleep(1000);     当前线程进入阻塞状态 1 秒
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
        a.interrupt();     标记线程为中断状态
    }

    @Override
    public void run() {
        while (!Thread.interrupted()) {     判断线程是否为中断状态
            System.out.println("Running...");
            try {
                Thread.sleep(200);     当前线程进入阻塞状态 0.2 秒
            } catch (InterruptedException e) {     阻塞状态下中断线程将引发该异常，且中断状态将被清除
                break;     跳出循环
            }
        }
        System.out.println("Stop!");     收尾工作
    }
}
----
输出：
Running...
Running...
Running...
Running...
Running...
Stop!

-------------------------------------------------------

public class A implements Runnable {     通过设置退出旗标
    private volatile boolean mRunning = true;

    public static void main(String[] args) {
        Runnable runnable = new A();
        Thread a = new Thread(runnable);
        a.start();     启动线程
        try {
            Thread.sleep(1000);     当前线程进入阻塞状态 1 秒
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
        ((A) runnable).mRunning = false;     标记为 false
    }

    @Override
    public void run() {
        while (mRunning) {     判断是否继续运行
            System.out.println("Running...");
            try {
                Thread.sleep(200);     当前线程进入阻塞状态 0.2 秒
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
        }
        System.out.println("Stop!");     收尾工作
    }
}
----
输出：
Running...
Running...
Running...
Running...
Running...
Stop!
```

### 同步线程
* 异步：多线程并发，各干各的。
* 同步：有先后顺序，你干完我再干。

```java

```