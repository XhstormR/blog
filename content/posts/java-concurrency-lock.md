---
author: XhstormR
categories:
- JAVA
date: 2017-08-01T11:14:11+08:00
title: Java Concurrency Lock
---

<!--more-->

Updated on 2017-08-05

> [https://docs.oracle.com/javase/10/docs/api/java/util/concurrent](https://docs.oracle.com/javase/10/docs/api/java/util/concurrent/locks/package-summary.html)
> |
> [中文](http://download.java.net/jdk/jdk-api-localizations/jdk-api-zh-cn/publish/1.6.0/html/zh_CN/api/java/util/concurrent/locks/package-summary.html)

## Concept
* 阻塞 -> Unsafe 类 -> park 操作

## Code
### 锁
#### LockSupport
* 内部封装了 Unsafe 类的 park 操作。

```java
import java.util.concurrent.TimeUnit;
import java.util.concurrent.locks.LockSupport;

public class Main {
    public static void main(String[] args) {
        Thread a = new Thread(() -> {
            System.out.println("a 开始阻塞 5s");
            LockSupport.parkUntil(System.currentTimeMillis() + TimeUnit.MILLISECONDS.convert(5, TimeUnit.SECONDS));     绝对时间
            或
            LockSupport.parkNanos(TimeUnit.NANOSECONDS.convert(5, TimeUnit.SECONDS));     相对时间
            System.out.println("a 停止阻塞");
        });
        Thread b = new Thread(() -> {
            System.out.println("b 开始阻塞 无期限");
            LockSupport.park();
            System.out.println("b 停止阻塞");
        });
        Thread c = new Thread(() -> {
            try {
                TimeUnit.SECONDS.sleep(2);
                LockSupport.unpark(b);     线程停止阻塞
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
        });

        a.start();
        b.start();
        c.start();
    }
}
----
输出：
a 开始阻塞 5s
b 开始阻塞 无期限
b 停止阻塞
a 停止阻塞
```
#### ReentrantLock
* 独占锁（排它锁）

```java
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.TimeUnit;
import java.util.concurrent.locks.ReentrantLock;

public class Main {
    public static void main(String[] args) {
        ReentrantLock lock = new ReentrantLock();

        ExecutorService executorService = Executors.newCachedThreadPool();
        for (int n = 0; n < 2; n++) {
            executorService.execute(() -> {
                System.out.println(Thread.currentThread().getName() + " 争夺锁");
                lock.lock();     在 try 块外加锁
                try {
                    System.out.println(Thread.currentThread().getName() + " 获得锁");
                    for (int i = 0; i < 2; i++) {
                        System.out.println(Thread.currentThread().getName() + " 运行中...");
                        TimeUnit.SECONDS.sleep(1);
                    }
                } catch (InterruptedException e) {     处理中断异常
                    e.printStackTrace();
                } finally {
                    lock.unlock();     在 finally 块中解锁
                    System.out.println(Thread.currentThread().getName() + " 释放锁");
                }
            });
        }
        executorService.shutdown();
    }
}
----
输出：
pool-1-thread-1 争夺锁
pool-1-thread-2 争夺锁
pool-1-thread-1 获得锁
pool-1-thread-1 运行中...
pool-1-thread-1 运行中...
pool-1-thread-1 释放锁
pool-1-thread-2 获得锁
pool-1-thread-2 运行中...
pool-1-thread-2 运行中...
pool-1-thread-2 释放锁
```
#### ReentrantReadWriteLock
* 读写锁
  * 读锁：**共享锁**，阻塞写锁　　　，同时只能有 **多个读**。
  * 写锁：**独占锁**，阻塞写锁和读锁，同时只能有 **一个写**。

```java
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.TimeUnit;
import java.util.concurrent.locks.ReentrantReadWriteLock;

public class Main {
    public static void main(String[] args) {
        ReentrantReadWriteLock lock = new ReentrantReadWriteLock();

        ExecutorService executorService = Executors.newCachedThreadPool();
        for (int n = 0; n < 2; n++) {
            executorService.execute(() -> {
                System.out.println(Thread.currentThread().getName() + " 争夺写锁");
                lock.writeLock().lock();
                try {
                    System.out.println(Thread.currentThread().getName() + " 获得写锁");
                    for (int i = 0; i < 2; i++) {
                        System.out.println(Thread.currentThread().getName() + " 运行中...");
                        TimeUnit.SECONDS.sleep(1);
                    }
                } catch (InterruptedException e) {
                    e.printStackTrace();
                } finally {
                    lock.writeLock().unlock();
                    System.out.println(Thread.currentThread().getName() + " 释放写锁");
                }
            });
        }
        for (int n = 0; n < 2; n++) {
            executorService.execute(() -> {
                System.out.println(Thread.currentThread().getName() + " 争夺读锁");
                lock.readLock().lock();
                try {
                    System.out.println(Thread.currentThread().getName() + " 获得读锁");
                    for (int i = 0; i < 2; i++) {
                        System.out.println(Thread.currentThread().getName() + " 运行中...");
                        TimeUnit.SECONDS.sleep(1);
                    }
                } catch (InterruptedException e) {
                    e.printStackTrace();
                } finally {
                    lock.readLock().unlock();
                    System.out.println(Thread.currentThread().getName() + " 释放读锁");
                }
            });
        }
        executorService.shutdown();
    }
}
----
输出：
pool-1-thread-1 争夺写锁
pool-1-thread-2 争夺写锁
pool-1-thread-1 获得写锁
pool-1-thread-1 运行中...
pool-1-thread-3 争夺读锁
pool-1-thread-4 争夺读锁
pool-1-thread-1 运行中...
pool-1-thread-1 释放写锁
pool-1-thread-2 获得写锁
pool-1-thread-2 运行中...
pool-1-thread-2 运行中...
pool-1-thread-2 释放写锁
pool-1-thread-3 获得读锁
pool-1-thread-3 运行中...
pool-1-thread-4 获得读锁
pool-1-thread-4 运行中...
pool-1-thread-3 运行中...
pool-1-thread-4 运行中...
pool-1-thread-3 释放读锁
pool-1-thread-4 释放读锁
```
### 同步器
#### CountDownLatch
* 一次性栅栏

```java
import java.util.concurrent.*;

public class Main {
    public static void main(String[] args) {
        int n = 3;
        CountDownLatch latch = new CountDownLatch(n);     初始阈值为 3

        ExecutorService executorService = Executors.newCachedThreadPool();
        for (int i = 0; i < 5; i++) {
            executorService.execute(() -> {
                try {
                    System.out.println(Thread.currentThread().getName() + " 等待中...");
                    latch.await();     等待阈值减为 0
                    System.out.println(Thread.currentThread().getName() + " 运行中...");
                } catch (InterruptedException e) {
                    e.printStackTrace();
                }
            });
        }
        for (int i = 0; i < n; i++) {
            executorService.execute(() -> {
                try {
                    TimeUnit.SECONDS.sleep(ThreadLocalRandom.current().nextInt(5));
                    latch.countDown();     阈值减 1
                    System.out.println(Thread.currentThread().getName() + " 运行...");
                } catch (InterruptedException e) {
                    e.printStackTrace();
                }
            });
        }
        executorService.shutdown();
    }
}
----
输出：
pool-1-thread-1 等待中...
pool-1-thread-2 等待中...
pool-1-thread-3 等待中...
pool-1-thread-4 等待中...
pool-1-thread-5 等待中...
pool-1-thread-7 运行...
pool-1-thread-6 运行...
pool-1-thread-8 运行...
pool-1-thread-1 运行中...
pool-1-thread-5 运行中...
pool-1-thread-4 运行中...
pool-1-thread-2 运行中...
pool-1-thread-3 运行中...
```
#### CyclicBarrier
* 循环同步栅栏

```java
import java.util.concurrent.*;

public class Main {
    public static void main(String[] args) {
        int n = 3;
        CyclicBarrier barrier = new CyclicBarrier(n, () -> System.out.println("阶段性完成"));     初始阈值为 3

        ExecutorService executorService = Executors.newCachedThreadPool();
        for (int i = 0; i < n; i++) {
            executorService.execute(() -> {
                try {
                    for (int j = 1; j <= 4; j++) {
                        TimeUnit.SECONDS.sleep(ThreadLocalRandom.current().nextInt(5));
                        System.out.println(Thread.currentThread().getName() + " 完成任务 " + j);
                        barrier.await();     阈值减 1，并等待阈值减为 0；同步后，重置阈值，并调用回调事件
                    }
                } catch (InterruptedException | BrokenBarrierException e) {
                    e.printStackTrace();
                }
            });
        }
        executorService.shutdown();
    }
}
----
输出：
pool-1-thread-1 完成任务 1
pool-1-thread-3 完成任务 1
pool-1-thread-2 完成任务 1
阶段性完成
pool-1-thread-1 完成任务 2
pool-1-thread-3 完成任务 2
pool-1-thread-2 完成任务 2
阶段性完成
pool-1-thread-3 完成任务 3
pool-1-thread-2 完成任务 3
pool-1-thread-1 完成任务 3
阶段性完成
pool-1-thread-3 完成任务 4
pool-1-thread-1 完成任务 4
pool-1-thread-2 完成任务 4
阶段性完成
```
#### Semaphore
* 计数信号量

```java
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.Semaphore;
import java.util.concurrent.TimeUnit;

public class Main {
    public static void main(String[] args) {
        Semaphore semaphore = new Semaphore(3);     信号量（最大并发量）为 3

        ExecutorService executorService = Executors.newCachedThreadPool();
        for (int n = 0; n < 5; n++) {
            executorService.execute(() -> {
                System.out.println(Thread.currentThread().getName() + " 等待信号...");
                semaphore.acquire();     获得信号（应该在 try 块外获得信号，以防止不必要的释放信号）
                try {
                    System.out.println(Thread.currentThread().getName() + " 获得信号...");
                    for (int i = 0; i < 2; i++) {
                        System.out.println(Thread.currentThread().getName() + " 运行中...");
                        TimeUnit.SECONDS.sleep(1);
                    }
                } catch (InterruptedException e) {
                    e.printStackTrace();
                } finally {
                    semaphore.release();     释放信号
                    System.out.println(Thread.currentThread().getName() + " 释放信号...");
                }
            });
        }
        executorService.shutdown();
    }
}
----
输出：
pool-1-thread-1 等待信号...
pool-1-thread-2 等待信号...
pool-1-thread-3 等待信号...
pool-1-thread-1 获得信号...
pool-1-thread-2 获得信号...
pool-1-thread-1 运行中...
pool-1-thread-3 获得信号...
pool-1-thread-3 运行中...
pool-1-thread-2 运行中...
pool-1-thread-4 等待信号...
pool-1-thread-5 等待信号...
pool-1-thread-1 运行中...
pool-1-thread-2 运行中...
pool-1-thread-3 运行中...
pool-1-thread-2 释放信号...
pool-1-thread-4 获得信号...
pool-1-thread-4 运行中...
pool-1-thread-1 释放信号...
pool-1-thread-3 释放信号...
pool-1-thread-5 获得信号...
pool-1-thread-5 运行中...
pool-1-thread-4 运行中...
pool-1-thread-5 运行中...
pool-1-thread-5 释放信号...
pool-1-thread-4 释放信号...
```
#### Exchanger
* 用于在 **成对** 的线程之间 **同步交换数据**。

```java
import java.util.concurrent.*;

public class Main {
    public static void main(String[] args) {
        Exchanger<String> exchanger = new Exchanger<>();

        ExecutorService executorService = Executors.newCachedThreadPool();
        executorService.execute(() -> {
            try {
                String s = " A";
                System.out.println(Thread.currentThread().getName() + s);
                TimeUnit.SECONDS.sleep(ThreadLocalRandom.current().nextInt(5));
                s = exchanger.exchange(s);     等待另一个线程调用 exchange 方法，同步交换数据
                System.out.println(Thread.currentThread().getName() + s);
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
        });
        executorService.execute(() -> {
            try {
                String s = " B";
                System.out.println(Thread.currentThread().getName() + s);
                TimeUnit.SECONDS.sleep(ThreadLocalRandom.current().nextInt(5));
                s = exchanger.exchange(s);
                System.out.println(Thread.currentThread().getName() + s);
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
        });
        executorService.shutdown();
    }
}
----
输出：
pool-1-thread-1 A
pool-1-thread-2 B
pool-1-thread-1 B
pool-1-thread-2 A
```
#### Phaser
* 把多个线程 **协同** 执行的任务划分为 **多个** 阶段。
  * 每个 **阶段** 可以为其加入 **任意** 数量的线程。
  * 每个 **线程** 可以 **随时** 注册并参与某个阶段。

##### 模拟 CountDownLatch
```java
import java.util.concurrent.*;

public class Main {
    private static final int n = 3;
    private static final Phaser phaser = new Phaser(n);     线程的初始注册数为 3

    public static void main(String[] args) throws InterruptedException {
        System.out.println(show());     //3 = 0 + 3

        ExecutorService executorService = Executors.newCachedThreadPool();
        for (int i = 0; i < 5; i++) {
            executorService.execute(() -> {
                try {
                    phaser.register();     注册线程（注册数加 1）
                    System.out.println(show() + Thread.currentThread().getName() + " 等待中...");
                    TimeUnit.SECONDS.sleep(1);
                    phaser.arriveAndAwaitAdvance();     线程到达并等待所有线程到达（注册数 == 到达数）；同步后，重置为未到达状态，进入下一个阶段
                    System.out.println(show() + Thread.currentThread().getName() + " 运行中...");
                } catch (InterruptedException e) {
                    e.printStackTrace();
                }
            });
        }
        for (int i = 0; i < n; i++) {
            executorService.execute(() -> {
                try {
                    TimeUnit.SECONDS.sleep(ThreadLocalRandom.current().nextInt(3, 10));
                    phaser.arriveAndDeregister();     线程到达并进行注销（注册数减 1）
                    System.out.println(show() + Thread.currentThread().getName() + " 运行...");
                } catch (InterruptedException e) {
                    e.printStackTrace();
                }
            });
        }

        TimeUnit.SECONDS.sleep(2);
        System.out.println(show());     //8 = 5 + 3

        executorService.shutdown();
    }

    private static String show() {
        注册数 = 到达数 + 未到达数
        return String.format("%d = %d + %d ",
                phaser.getRegisteredParties(),    当前  注册数
                phaser.get   ArrivedParties(),    当前  到达数
                phaser.get UnarrivedParties());   当前未到达数
              //phaser.get            Phase()     当前阶段
    }
}
----
输出：
3 = 0 + 3
4 = 0 + 4 pool-1-thread-1 等待中...
5 = 0 + 5 pool-1-thread-2 等待中...
6 = 0 + 6 pool-1-thread-3 等待中...
7 = 0 + 7 pool-1-thread-4 等待中...
8 = 0 + 8 pool-1-thread-5 等待中...
8 = 5 + 3
7 = 5 + 2 pool-1-thread-8 运行...
6 = 5 + 1 pool-1-thread-6 运行...
5 = 0 + 5 pool-1-thread-7 运行...
5 = 0 + 5 pool-1-thread-4 运行中...
5 = 0 + 5 pool-1-thread-5 运行中...
5 = 0 + 5 pool-1-thread-2 运行中...
5 = 0 + 5 pool-1-thread-3 运行中...
5 = 0 + 5 pool-1-thread-1 运行中...
```
##### 模拟 CyclicBarrier
```java
import java.util.concurrent.*;

public class Main {
    public static void main(String[] args) {
        int n = 3;     线程的初始注册数
        int m = 4;     阶段的数量
        Phaser phaser = new Phaser(n) {
            @Override                 //（当前阶段，当前注册数）
            protected boolean onAdvance(int phase, int registeredParties) {     重写回调事件
                System.out.println("阶段性完成");
                return phase >= (m - 1) || registeredParties == 0;     是否进入终止状态（true 终止，false 继续）
            }
        };

        ExecutorService executorService = Executors.newCachedThreadPool();
        for (int i = 0; i < n; i++) {
            executorService.execute(() -> {
                try {
                    while (!phaser.isTerminated()) {     是否处于终止状态
                        TimeUnit.SECONDS.sleep(ThreadLocalRandom.current().nextInt(5));
                        System.out.println(Thread.currentThread().getName() + " 完成任务 " + (phaser.getPhase() + 1));     获得当前阶段
                        phaser.arriveAndAwaitAdvance();     线程到达并等待所有线程到达（注册数 == 到达数）；同步后，重置为未到达状态，进入下一个阶段
                    }
                } catch (InterruptedException e) {
                    e.printStackTrace();
                }
            });
        }
        executorService.shutdown();
    }
}
----
输出：
pool-1-thread-3 完成任务 1
pool-1-thread-2 完成任务 1
pool-1-thread-1 完成任务 1
阶段性完成
pool-1-thread-3 完成任务 2
pool-1-thread-1 完成任务 2
pool-1-thread-2 完成任务 2
阶段性完成
pool-1-thread-3 完成任务 3
pool-1-thread-2 完成任务 3
pool-1-thread-1 完成任务 3
阶段性完成
pool-1-thread-3 完成任务 4
pool-1-thread-2 完成任务 4
pool-1-thread-1 完成任务 4
阶段性完成
```
