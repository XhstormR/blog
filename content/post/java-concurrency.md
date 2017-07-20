---
author: XhstormR
categories:
- JAVA
date: 2017-07-16T20:48:40+08:00
title: Java Concurrency
---

<!--more-->

Updated on 2017-07-16

>

## Concept
* 串行：多个线程 **按照顺序** 使用同一个核心。（单核心）（Serial）
* 并发：多个线程 **共同轮流** 使用同一个核心。（单核心）（线程 **同时存在**）（Concurrent）
* 并行：多个线程 **各自分别** 使用一一个核心。（多核心）（线程 **同时执行**）（Parallel）
  * 并行是并发的一个 **子集**，区别在于 CPU 是否为多核心。
