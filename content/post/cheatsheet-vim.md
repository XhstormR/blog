---
Categories:
- CheatSheet
date: 2016-03-31T11:09:57+08:00
title: Vim 命令不完全手册
---

<!--more-->

Updated on 2016-06-28

> http://www.vim.org/
>
> http://www.lagmonster.org/docs/vi.html
>
> {{< image "/uploads/vim.png" "Vim" "1" "1" >}}
>
> Vim is often called a "programmer's editor," and so useful for programming that many consider it an entire IDE. It's not just for programmers, though. Vim is perfect for all kinds of text editing, from composing email to editing configuration files.
>
> 只要接触 Linux ，不可避免的会用到 Vim 编辑器。一方面它基本上是所有 Linux 发行版的默认编辑器；另一方面它是也一个拥有20年历史的超级强大的文本编辑器。

```bash
vim +5 file #打开文件并跳到第5行，无指定数字则跳到最后一行
vim +/abc file #打开文件并搜索 `abc`，按 n 切换至下一个 `abc`
vim file1 file2 file3 #打开3个文件，按 `:n` 切换至下一个文件，`:N` or `:prev` 切换至上一个文件

  <----- a、i、o    ↓↓    : ----->
输入模式          命令模式          底行模式
          ESC ----->       <----- ESC

输入模式常用指令
Ctrl+N     自动补全     next
Ctrl+P     自动补全     previous
Ctrl+Y     自动输入与上一行相对应的字符
Ctrl+W     删除光标前的一个字段
Ctrl+U     删除光标所在行

底行模式常用指令
:w     保存
:w 123     将当前编辑的文件保存到 123 文件中
:q     退出
:q!     强制退出不保存
:wq     保存并退出
:x     保存并退出
:15     跳到第15行
:e 123     打开 123 文件
:e!     放弃修改重新编辑
:bn     切换至下一缓冲区(文件)     (推荐)
:bN     切换至上一缓冲区
:bd     关闭当前缓冲区
:n     切换至下一个文件
:N     切换至上一个文件
:ls     列出打开的所有文件
:history     查看历史输入命令
:!ls -l     执行外部命令
:s/old/new/     替换光标所在行第一次出现的 old 为 new
:s/old/new/g     替换光标所在行全部的 old 为 new
:1,10s/old/new/g     替换1到10行之间出现的 old 为 new
:%s/old/new/g     替换全文的 old 为 new
:%s/old/new/gc     替换全文的 old 为 new 并询问用户确认每个替换
:%TOhtml     把全文转化为 HTML 网页

命令模式常用指令
h     j     k     l
左   下   上   右
a     在光标后进入输入模式     append(追加)
A     在行尾进入输入模式
i     在光标前进入输入模式     insert(插入)
I     在行首进入输入模式
o     在光标所在行的下方插入一行并进入输入模式     open(打开)
O     在光标所在行的上方插入一行并进入输入模式
w     光标移动到下一个单词
b     光标移动到上一个单词
W     光标移动到下一个单词     分隔符为空格
B     光标移动到上一个单词     分隔符为空格
HOME     移动到行首
END     移动到行尾
PgUp     向上翻页
PgDn     向下翻页
Ctrl+B     向上翻页 back
Ctrl+F     向下翻页 front
D     删除所在行光标之后的内容
dd     删除(剪切)光标所在的一整行
5dd     删除(剪切)光标处开始的5行     [number 执行次数，默认1] d [object 操作对象]
yy     复制光标所在的一整行     yank(猛拉)
5yy     复制光标处开始的5行
p     在光标后粘贴     paste(贴)     可粘贴最后一次删除的内容
P     在光标前粘贴
/abc     从光标位置向下搜索 `abc`
?abc     从光标位置向上搜索 `abc`
n     显示搜索命令定位到的下一个字符串
N     显示搜索命令定位到的上一个字符串
r     替换当前字符
R     替换当前字符及其后的字符，直至按ESC键
x     删除当前字符
X     删除之前的字符
s     删除当前字符并进入编辑模式
S     删除当前行并进入编辑模式
u     撤销上一步的操作
U     撤销这一行的操作
Ctrl+R     恢复上一步的操作
ZZ     保存并退出
ZQ     强制退出不保存
zz     把光标所在的行置于屏幕中央
gg     跳到第一行
G     跳到最后一行
H     跳到屏幕第一行
M     跳到屏幕中间一行
L     跳到屏幕最后一行
%     跳到匹配括号的另一端
*     向下搜索光标下的单词
^     行首
$     行尾
15G     跳到第15行
Ctrl+D     移动半屏
Ctrl+^     在打开的文件中切换
Ctrl+G     显示正在编辑的文本信息

分割窗口
Ctrl+W - S     水平分割窗口
Ctrl+W - V     垂直分割窗口
Ctrl+W - Q     退出当前窗口
Ctrl+W - W     切换窗口
Ctrl+W - 方向键     自由选择窗口
:sp 1     分割窗口并打开文件1

Vim 的配置文件为 /etc/vimrc
    set nocp     关闭 Vi 兼容模式
    set is     开启实时检索
    set number     显示行号
    set cursorline     高亮当前行
    nmap <F2> :nohlsearch<CR>     在命令模式下按 F2 相当于输入 `:nohlsearch` 跟一个回车，取消搜索加亮

Tips：
yum -y install vim #安装 Vim
vim /root/.bashrc #设置别名，替换系统默认编辑器
    alias vi=vim

大部分 Linux 发行版默认编辑器是 Vi，Vim 是它的升级版。
关于它俩的区别：
https://zh.m.wikipedia.org/zh-cn/Vi
https://zh.m.wikipedia.org/zh-cn/Vim
```