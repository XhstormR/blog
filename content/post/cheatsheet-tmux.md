---
Categories:
- CheatSheet
date: 2016-04-10T12:16:09+08:00
title: Tmux 不完全使用手册
---

<!--more-->

Updated on 2016-04-14

> https://tmux.github.io/
>
> {{< image "/uploads/tmux.png" "Tmux" "1" "1" >}}
>
> Tmux is a terminal multiplexer.It lets you switch easily between several programs in one terminal, detach them (they keep running in the background) and reattach them to a different terminal.
>
> 一个 Session 可以包含多个 Window，而每个 Window 又可以包含多个 Pane。


```
Session     会话
Window     窗口
Pane     面板
Attach     附加
Detach     分离

[root@controller ~]$ yum -y installl tmux #安装 tmux
[root@controller ~]$ tmux new -s haha #创建一个叫做 haha 的会话
[root@controller ~]$ tmux ls #列出所有会话
0: 1 windows (created Sun Apr 10 13:31:27 2016) [83x47]
2: 1 windows (created Sun Apr 10 13:32:15 2016) [83x47]
haha: 1 windows (created Sun Apr 10 13:32:07 2016) [83x47]
[root@controller ~]$ tmux a -t 2 #连接到 2 号会话，没有指定目标会自动连接到上一次使用的会话     Target(目标)
[root@controller ~]$ tmux killl-server #关闭所有会话

Ctrl+D or `exit`     退出
Ctrl+B - ?     列出所有快捷键
Ctrl+B - T     显示时间
Ctrl+B - :     进入命令行模式
Ctrl+B - [     进入复制模式
Ctrl+B - ]     粘贴
Ctrl+B - ~     查看历史信息
Ctrl+B - PgUp or PgDn     查看历史命令

Session
Ctrl+B - S     列出所有会话
Ctrl+B - D     暂时脱离当前会话（后台运行）
Ctrl+B - $     重命名当前会话
Ctrl+B - Ctrl+Z     挂起当前会话

Window
Ctrl+B - C     创建一个新窗口
Ctrl+B - &     关闭当前窗口
Ctrl+B - W     列出所有窗口
Ctrl+B - 2     切换到 2 号窗口
Ctrl+B - L     切换到上一次使用的窗口     Last     *当前 -上次
Ctrl+B - P     切换到上一个窗口
Ctrl+B - N     切换到下一个窗口
Ctrl+B - ,     重命名当前窗口
Ctrl+B - .     修改当前窗口编号
Ctrl+B - F     在所有窗口中查找指定文本

Pane
Ctrl+B - %     水平创建面板
Ctrl+B - “     垂直创建面板
Ctrl+B - X     关闭当前面板
Ctrl+B - !     将当前面板置于新窗口
Ctrl+B - Q     显示面板编号
Ctrl+B - 空格键     切换页面布局
Ctrl+B - 方向键     自由选择面板

Prefix = Ctrl+B
vi ~/.tmux.conf #设置 Prefix 为 Ctrl+A，复制模式设置为 vi - 默认为 SPACE开始 ENTER结束 ESC清空
    unbind C-b
    set -g prefix C-a
    setw -g mode-keys vi
```