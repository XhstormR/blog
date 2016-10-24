+++
Categories = ["JAVA"]
date = "2016-10-19T18:12:06+08:00"
title = "JAVA Thread"

+++

<!--more-->

Updated on 2016-10-24

> {{< image "/uploads/java-thread.svg" "Thread 状态" "1" "1" >}}
>
> [Thread](http://download.java.net/jdk/jdk-api-localizations/jdk-api-zh-cn/publish/1.6.0/html/zh_CN/api/java/lang/Thread.html)
>
> [Thread.State](http://download.java.net/jdk/jdk-api-localizations/jdk-api-zh-cn/publish/1.6.0/html/zh_CN/api/java/lang/Thread.State.html)
>
> [Object.wait()](http://download.java.net/jdk/jdk-api-localizations/jdk-api-zh-cn/publish/1.6.0/html/zh_CN/api/java/lang/Object.html#wait())
> |
> [Object.notifyAll()](http://download.java.net/jdk/jdk-api-localizations/jdk-api-zh-cn/publish/1.6.0/html/zh_CN/api/java/lang/Object.html#notifyAll())

* 进程：一块包含了某些资源的内存区域。
  * 一个进程中至少包含一个或多个线程（执行单元）。
  * 进程的内存区域仅能被它所包含的线程访问。
* 线程：进程的顺序执行流，系统中最小的执行单元。
  * 线程只能归属于一个进程并且只能访问该进程的资源。
  * 进程的所有线程共享同一块内存空间。
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
                Thread.sleep(1000);     当前线程进入阻塞状态 1 秒（不会释放锁），之后重新进入 Runnable 状态，等待获得时间片
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
public class A implements Runnable {     通过调用 interrupt 方法（实质为设置退出旗标）
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
    private volatile boolean mRunning = true;     volatile 关键字保证了多线程同步中的可见性，使线程能够正确获得变量的最新值

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
* 异步一一一一：多线程并发，各干各的。
* 同步（互斥）：有先后顺序，你干完我再干。
  * `synchronized` 给修饰的代码块或方法加上 **同步锁**，保证了 **可见性** 和 **原子性**。
      * 同步锁：同时只允许一个线程持有，且此时只有该线程能够执行该同步锁修饰的代码块或方法。
          * 静态方法锁：锁对象是类对象。`Man.class`
          * 非静态方法锁：锁对象是类的对象。`new Man()`
      * 线程进入同步代码块或方法时获得锁。
      * 线程退出同步代码块或方法时释放锁。
* 可见性：对变量的读操作，总是能看到对这个变量最后的写操作。
  * happens-before 关系：确保程序语句之间的排序在内存中的写对其他语句都是可见的。
  * `volatile`修饰的变量强制线程每次读写的时候都需要与主内存进行同步，保证了 **可见性**。
      * 读：直接读取主内存中的值。
      * 写：立即刷新主内存中的值。
* 原子性：操作不可分割，视作一个整体，且 **不会被线程调度机制打断**，则称为原子操作。

---

```java
happens-before 关系
-------------------------------------------------------
定义变量
----
private int i1 = 1;
private int i2 = 2;
private int i3 = 3;
private volatile boolean mBoolean = false;     用 volatile 修饰的变量

读
----
（错）System.out.println(i1);     JVM 的重排序对普通变量的读操作不会排在对 volatile 变量的读操作之前，只会排在对 volatile 变量的读操作之后
System.out.println(mBoolean);
System.out.println(i1);
System.out.println(i2);
System.out.println(i3);

写
----
i1 = 4;
i2 = 5;
i3 = 6;
mBoolean = true;
（错）i1 = 7;     JVM 的重排序对普通变量的写操作不会排在对 volatile 变量的写操作之后，只会排在对 volatile 变量的写操作之前
```

```java
public class A implements Runnable {
    public int mInt = 0;     值（应当守恒）
    public volatile boolean mRunning = true;     退出旗标

    @Override
    public void run() {
        while (mRunning) {     无限循环
            synchronized (this) {     同步锁（锁对象是类的对象）
                mInt++;
                mInt--;
            }
        }
    }
}

----

public class Initial {
    public static void main(String[] args) throws InterruptedException {
        A a = new A();     线程体
        for (int i = 0; i < 3; i++) {     启动 3 个线程
            new Thread(a).start();     传入同一个线程体，执行其中的 run 方法
        }
        Thread.sleep(1000);     当前线程进入阻塞状态 1 秒
        a.mRunning = false;     标记为 false
        System.out.println(a.mInt);     输出值
    }
}
----
输出：
0
```

```java
public class A implements Runnable {
    private final int[] mInts;     能量数组（锁对象应该用 final 修饰）

    public A(int[] ints) {     构造函数
        mInts = ints;
    }

    @Override
    public void run() {     线程体
        Random random = new Random();
        while (true) {     无限循环
            int from = ((int) (mInts.length * random.nextDouble()));     随机
            int to = ((int) (mInts.length * random.nextDouble()));     随机
            int i = ((int) (1000 * random.nextDouble()));     随机
            transfer(from, to, i);     转移能量
            try {
                Thread.sleep(10);     阻塞 10 毫秒
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
        }
    }

    private void transfer(int from, int to, int i) {     转移能量
        if (mInts[from] < i) {     能量不足
            return;
        }
        synchronized (mInts) {     同步锁（多个需要同步的线程的同步锁应该是同一个锁对象的引用，否则无法得到同步效果）
            mInts[from] -= i;     减少
            mInts[to] += i;     增加
            DecimalFormat decimalFormat1 = new DecimalFormat("00");     格式化
            DecimalFormat decimalFormat2 = new DecimalFormat("000");     格式化
            System.out.printf("%s\t 从 %s 转移 %s 到 %s \t%d\n", Thread.currentThread().getName(), decimalFormat1.format(from), decimalFormat2.format(i), decimalFormat1.format(to), getAll());
        }
    }

    private int getAll() {     获得总能量（应当守恒）
        int sum = 0;
        for (int i : mInts) {
            sum += i;
        }
        return sum;
    }
}

----

public class Initial {
    public static void main(String[] args) {
        int[] ints = new int[100];     初始化能量数组（共 100 个单元，每个单元 1000 能量）
        for (int i = 0; i < ints.length; i++) {
            ints[i] = 1000;
        }

        DecimalFormat decimalFormat = new DecimalFormat("000");
        for (int i = 0; i < ints.length; ) {     启动 100 个线程
            Thread thread = new Thread(new A(ints), "A_" + decimalFormat.format(++i));     传入同一个数组，对其进行操作，并作为锁对象
            thread.start();     启动线程
        }
    }
}
----
输出：
A_042	 从 39 转移 209 到 49 	100000
A_056	 从 22 转移 017 到 31 	100000
A_044	 从 29 转移 055 到 30 	100000
A_068	 从 28 转移 717 到 66 	100000
A_069	 从 85 转移 020 到 16 	100000
A_070	 从 00 转移 380 到 54 	100000
A_072	 从 67 转移 783 到 25 	100000
A_034	 从 58 转移 377 到 02 	100000
A_073	 从 04 转移 710 到 98 	100000
A_074	 从 30 转移 499 到 57 	100000
A_075	 从 95 转移 299 到 81 	100000
...
```