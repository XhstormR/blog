---
categories:
- Python
date: 2016-02-08T21:08:48+08:00
title: Python(一)
---

<!--more-->

## 解释器

官方版本的解释器：CPython,但下载的是MSI文件,本人比较洁癖,想用绿色版,绿化方法如下 :

打开CMD，输入
```
msiexec /a "F:\test.msi" /qb TARGETDIR="F:\dir"
```
其中`F:\test.msi`是msi文件的路径，`F:\dir`是解压路径。

## Python版本

我用的是最新版Python_3.4.2,但是选择最新的.不代表是最好的选择。网上的教程大多是2.0版本的,语法跟3.0版本略不同,所以只能跟[官网][1]对比着语法学习。

## 语法

1. `print(123)`,输出`123`

    对于英文`print(abc)`不行,`print('abc')`就可以,加了`''`便会视为字符串,输出`abc`

    没加的话,就会视为变量,如果之前没用到`abc=input()`为变量赋值的话,便会报错.

2. `name=input(mike)`,为`name`赋值为`mike`

    跟语法1相结合我们可以先用`name=input()`赋值为`mike`,再输入`print('hello',name)`,便会得到`hello,mike`

    ![print(123)+name=input(mike)][2]

    另外我们可以这样输入`name=input('please enter your name:')`便会有提示信息`please enter your name:`显示.

    ![please enter your name:][3]

[1]:https://www.python.org/
[2]:/uploads/python1.png
[3]:/uploads/python2.png
