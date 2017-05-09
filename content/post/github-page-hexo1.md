---
categories:
- Hexo
date: 2016-02-08T21:04:48+08:00
title: Hexo(一)
---

<!--more-->

> 仅针对Windows平台
>
> 纯绿色,全便携

## 下载运行环境

1. 下载Node.js官方EXE单文件版程序：

    http://nodejs.org/download/

    选择Windows Binary(.exe)即可。

    将node.exe添加到系统环境变量Path中。

    从0.6.1开始，Node.js在Windows平台上提供了两种安装方式，一是.MSI安装文件，另外还有一个.EXE可执行文件。

    我选择了.EXE文件。因为.MSI安装文件除了将node.exe复制到C:\Program File (x86)\目录中及修改系统Path之外，没发现还有其他作用。

    ![node.exe](/uploads/node.png)

2. 下载便携版Git :

    https://github.com/msysgit/msysgit/releases/latest

    选择PortableGit-1.9.5-preview20141217.7z解压即可。

    ![PortableGit](/uploads/PortableGit.png)

3. 下载npm源代码：

    https://github.com/npm/npm/releases/latest

    选择Source code(zip)解压即可。

    在命令提示符窗口中执行下面的操作，完成npm的编译：

    ````
    C:\>D:
    D:\>cd npmjs
    D:\npmjs>node cli.js install -gf
    ````

    ![npm.zip](/uploads/npm.png)

    还有一种安装npm的方法,虽然很麻烦,但更绿色,我就是用的这种.

        1. 新建一个文件夹如D:\Node,在其中新建npm-cache,npm-global二个文件夹.把node.exe和解压好的npm源文件放在Node中.

        2. 在D:\Node\node_modules中再复制一个npm文件夹(node.exe也要在其中).

        3. 把D:\Node\bin中的npm,npm.cmd2个文件复制到D:\Node中.

        4. 把npm-global文件夹添加到系统环境变量Path中.

        5. 然后在CMD中运行 :
        npm config set prefix "D:\Node\npm-global"       #全局安装路径
        npm config set cache "D:\Node\npm-cache"       #缓存文件路径

4. 下载Hexo

    在解压后的PortableGit中运行Git bash.bat，输入npm 命令 ,Hexo就下载到本地了。
    ```
    $ npm install hexo -g
    ```

## 搭建Hexo

1. 新建一个需要当做目录的文件夹(如`H:\hexo`)。

    进入该文件夹之后,加入hexo程序和npm依赖包。
    ```
    $ hexo init
    $ npm install
    ```
2. 现在我们已经搭建起本地的hexo了，执行以下命令(在`H:\hexo`)，然后到浏览器输入`localhost:4000`看看。
    ```
    hexo generate #生成静态页面至public目录
    hexo server #开启预览访问端口（默认端口4000，'ctrl + c'关闭server）
    ```
    没有错误,便可以部署至Github了。
    ```
    hexo clean #清除缓存 网页正常情况下可以忽略此条命令
    hexo generate #生成静态页面至public目录
    hexo deploy #将.deploy目录部署到GitHub
    ```

## Tips

1. 每次使用命令时，都要在H:\hexo目录下，在Git bash.bat中输入。每次修改本地文件后，需要hexo generate才能保存。

2. Hexo现在支持更加简单的命令格式了，比如：

        hexo n == hexo new
        hexo g == hexo generate
        hexo s == hexo server
        hexo d == hexo deploy

3. 想要在生成后发布，你可以运行下面命令中的任何一个，效果都是相同的。

        hexo generate -deploy
        hexo deploy -generate
