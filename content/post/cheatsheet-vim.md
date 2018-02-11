---
Categories:
- CheatSheet
date: 2016-03-31T11:09:57+08:00
title: Vim 命令不完全手册
---

<!--more-->

Updated on 2018-01-02

> https://github.com/vim/vim
>
> http://www.lagmonster.org/docs/vi.html
>
> {{< image "/uploads/vim.png" "Vim" "1" "1" >}}
>
> Vim is often called a "programmer's editor," and so useful for programming that many consider it an entire IDE. It's not just for programmers, though. Vim is perfect for all kinds of text editing, from composing email to editing configuration files.
>
> 只要接触 Linux ，不可避免的会用到 Vim 编辑器。一方面它基本上是所有 Linux 发行版的默认编辑器；另一方面它是也一个拥有20年历史的超级强大的文本编辑器。

```bash
vim +5 file #打开文件并跳到第5行，无数字跳到最后一行
vim +/abc file #打开文件并搜索 `abc`，按 n 切换至下一个 `abc`
vim file1 file2 file3 #打开3个文件，按 `:n` 切换至下一个文件，`:N` or `:prev` 切换至上一个文件

  <----- a、i、o   ↓↓   : ----->
输入模式         命令模式        底行模式
       ESC ----->      <----- ESC

输入模式常用指令
Ctrl+C     ESC
Ctrl+N     自动补全     next
Ctrl+P     自动补全     previous
Ctrl+Y     自动输入与上一行相对应的字符
Ctrl+W     删除光标前的一个单词
Ctrl+U     删除光标前的所有字符
Ctrl+R     插入寄存器内容

底行模式常用指令
:w     保存
:w 123     将当前编辑的文件保存到 123 文件中
:q     退出
:q!    不保存退出
:x     保存并退出
:wq    保存并退出
:wqa   全部保存并退出
:15    跳到第15行
:e 123     打开 123 文件
:e!     放弃修改重新编辑
:b1     选择缓冲区(文件)     (推荐)
:bn     切换至下一缓冲区
:bN     切换至上一缓冲区
:bd     关闭当前缓冲区
:n     切换至下一个文件
:N     切换至上一个文件
:ls    列出打开的所有文件
:history    查看历史命令
:!ls -l     执行外部命令
:s/old/new/     替换光标所在行第一次出现的 old 为 new
:s/old/new/g     替换光标所在行全部的 old 为 new
:1,10s/old/new/g     替换1到10行之间出现的 old 为 new
:%s/old/new/g     替换全文的 old 为 new
:%s/old/new/gc     替换全文的 old 为 new 并询问用户确认每个替换
:%TOhtml     把全文转化为 HTML 网页

命令模式常用指令
h    j    k    l
左   下   上   右
a     在光标后进入输入模式     Append(追加)
A     在行尾进入输入模式
i     在光标前进入输入模式     Insert(插入)
I     在行首进入输入模式
o     在下方插入一行并进入输入模式     Open(打开)
O     在上方插入一行并进入输入模式
b     光标移动到上一个单词
w     光标移动到下一个单词
e     光标移动到单词的结尾
B     光标移动到上一个单词，以空格为分隔符
W     光标移动到下一个单词，以空格为分隔符
E     光标移动到单词的结尾，以空格为分隔符
HOME     移动到行首
END     移动到行尾
PgUp     向上翻页
PgDn     向下翻页
Ctrl+B     向上翻页 Back
Ctrl+F     向下翻页 Front
D      删除所在行光标之后的内容     Delete(删除)
C      删除所在行光标之后的内容并进入输入模式     Change(修改)
dd     删除整行
cc     删除整行并进入输入模式
2de    删除光标处开始的 2 个单词     [执行次数，缺省1][操作符][操作对象]
2ce    删除光标处开始的 2 个单词并进入输入模式
yy     复制整行     Yank(复制)
5yy    复制光标处开始的 5 行
p      在光标后粘贴     Put(粘贴)     可粘贴最近一次删除的内容
P      在光标前粘贴
/abc     从光标位置向下搜索 `abc`
?abc     从光标位置向上搜索 `abc`
n     显示搜索命令定位到的下一个字符串
N     显示搜索命令定位到的上一个字符串
r     替换当前字符
R     替换当前字符及其后的字符，直至按ESC键
x     删除当前字符
X     删除之前的字符
s     删除当前字符并进入输入模式
S     删除当前行并进入输入模式
u     撤销上一步的操作
U     撤销这一行的操作
Ctrl+R     恢复上一步的操作
ZZ     保存并退出
ZQ     不保存退出
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
5j     向下移动 5 行     (Jump)
5J     向下合并 5 行     (Join)
15G     跳到第 15 行
Ctrl+D     移动半屏
Ctrl+^     在打开的文件中切换
Ctrl+G     显示文本信息
g+Ctrl+G     显示全局文本信息

v     可视
V     可视行
Ctrl+Q     可视块 -> Shift+I     批量插入

za     折叠 <-> 展开
zM     折叠所有代码
zR     展开所有代码

di(     删除 () 中的内容     inner
da[     删除 [] 中的内容，包括 []     all
dtA     删除从光标处至 A 之间的内容     to
dfA     删除从光标处至 A 之间的内容，包括 A     found

分割窗口
:sp  123       水平分割窗口并打开文件123
:vsp 123       垂直分割窗口并打开文件123
Ctrl+W - S     水平分割窗口
Ctrl+W - V     垂直分割窗口
Ctrl+W - Q     退出当前窗口
Ctrl+W - W     切换窗口
Ctrl+W - 方向键     选择窗口

Tips：
大部分 Linux 发行版默认编辑器是 Vi，Vim 是它的升级版。
二者的区别：
https://zh.m.wikipedia.org/zh-cn/Vi
https://zh.m.wikipedia.org/zh-cn/Vim

配置文件：
/etc/vimrc

yum -y install vim #安装 Vim
vim /root/.bashrc #设置别名，替换系统默认编辑器
    alias vi=vim

https://raw.githubusercontent.com/amix/vimrc/master/vimrcs/basic.vim

https://raw.githubusercontent.com/vim/vim/master/runtime/rgb.txt
https://raw.githubusercontent.com/vim/vim/master/runtime/doc/motion.txt
https://raw.githubusercontent.com/vim/vim/master/runtime/doc/options.txt
```

## vimrc
```
set nocp     "取消兼容 Vi
set hlsearch     "高亮搜索
set incsearch     "实时搜索
set smartcase     "智能区分大小写
set ignorecase     "不区分大小写
set ruler      "显示行列信息
set number     "显示行号信息
set showcmd     "显示命令
set showmode     "显示模式
set showmatch     "显示配对括号
set matchtime=10     "显示 1s
set linebreak     "整词换行
set wildmenu     "显示补全行
set cursorline     "高亮当前行
set encoding=utf-8     "设置文件编码
set fileencoding=utf-8     "设置文件编码
set scrolloff=5     "滚动缓冲区
set laststatus=2     "总是显示状态栏
"set statusline=%F%m     "设置状态栏
set colorcolumn=78     "对齐线
set backspace=indent,eol,start     "使退格键工作
set tabstop=4     "4 空格
set shiftwidth=4     "4 空格
set softtabstop=4     "4 空格
set smarttab     "智能 TAB
set expandtab     "使用空格而不是 TAB
set cindent     "使用 C 系缩进
set autoindent     "自动缩进
set smartindent     "智能缩进
set foldmethod=syntax     "开启代码折叠
set nofoldenable     "不自动进行代码折叠
set virtualedit=block     "启用虚拟编辑

setf c     "设置文件类型
syntax on     "开启语法高亮
syntax enable     "开启语法高亮
filetype on     "开启文件类型检测
filetype indent on     "开启缩进规则

autocmd InsertEnter,InsertLeave * set cursorline!     "高亮当前行切换显示

nmap <silent> <F2> :nohlsearch <CR>     "在命令模式下按 F2 相当于输入 `:nohlsearch` 跟一个回车，取消搜索高亮
nmap <silent> <F8> :w <CR> :!gcc % -o %< && %< <CR>     "保存 -> 编译 -> 运行

nmap <silent> <C-H> <C-W>h     "快速选择窗口
nmap <silent> <C-J> <C-W>j
nmap <silent> <C-K> <C-W>k
nmap <silent> <C-L> <C-W>l

let mapleader=";"     "定义 <Leader>
vmap <Leader>y "+y     "vim 复制至系统剪贴板
nmap <Leader>p "+p     "系统剪贴板粘贴至 vim

if has("gui_running")     "GUI
  colorscheme evening     "配色方案
  set lines=50 columns=120     "窗口大小
  set guifont=Consolas:h10:cANSI     "字体大小
  set guicursor+=a:blinkon0     "取消光标闪烁
  set guioptions-=m     "取消菜单栏
  set guioptions-=T     "取消工具栏
  set guioptions-=l     "取消左滚动条
  set guioptions-=L     "取消左滚动条

  nmap <silent> <F3> :call ToggleScreen()<CR>
  nmap <silent> <F4> :call ToggleMenu()<CR>

  let s:flag_screen = 0
  let s:flag_menu = 0

  function ToggleScreen()
    if s:flag_screen
      simalt ~r~     "窗口还原
    else
      simalt ~x~     "窗口最大化
    endif
    let s:flag_screen = !s:flag_screen     ""取反
  endfunction

  function ToggleMenu()
    if s:flag_menu
      set guioptions-=m
      set guioptions-=T
    else
      set guioptions+=m
      set guioptions+=T
    endif
    let s:flag_menu = !s:flag_menu
  endfunction

endif
```
