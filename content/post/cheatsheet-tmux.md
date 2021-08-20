---
Categories:
- CheatSheet
date: 2016-04-10T12:16:09+08:00
title: Tmux 不完全使用手册
---

<!--more-->

Updated on 2016-04-14

> https://github.com/tmux/tmux
>
> https://man.openbsd.org/tmux
>
> https://leanpub.com/the-tao-of-tmux/read
>
> {{< image "/uploads/tmux.png" "Tmux" "1" "1" >}}
>
> Tmux is a terminal multiplexer.It lets you switch easily between several programs in one terminal, detach them (they keep running in the background) and reattach them to a different terminal.
>
> 一个 Session 可以包含多个 Window，而每个 Window 又可以包含多个 Pane。

```
Session     会话
Window      窗口
Pane        面板
Attach      连接
Detach      分离

[root@controller ~]$ yum -y installl tmux #安装 tmux
[root@controller ~]$ tmux -V #查看版本号
[root@controller ~]$ tmux lscm #查看内置命令
[root@controller ~]$ tmux new -s home #创建一个叫做 home 的会话
[root@controller ~]$ tmux ls #列出所有会话
0: 1 windows (created Sun Apr 10 13:31:27 2016) [83x47]
1: 1 windows (created Sun Apr 10 13:32:15 2016) [83x47]
home: 1 windows (created Sun Apr 10 13:32:07 2016) [83x47]
[root@controller ~]$ tmux a -t home #连接到 home 会话，没有指定目标会自动连接到最近使用的会话     Target(目标)
[root@controller ~]$ tmux kill-server #关闭所有会话

Ctrl+D or `exit`     退出
Ctrl+B - ?     显示快捷键，Q 退出
Ctrl+B - T     显示时间，Q 退出
Ctrl+B - :     进入命令模式
Ctrl+B - [     进入复制模式
Ctrl+B - ]     粘贴
Ctrl+B - ~     查看历史信息
Ctrl+B - PgUp or PgDn     查看历史命令

Session
Ctrl+B - D     暂时脱离当前会话（后台运行）
Ctrl+B - S     列出所有会话
Ctrl+B - $     重命名当前会话
Ctrl+B - Ctrl+Z     挂起当前会话

Window
Ctrl+B - C     创建新窗口
Ctrl+B - &     关闭当前窗口
Ctrl+B - W     列出所有窗口
Ctrl+B - 2     切换到 2 号窗口
Ctrl+B - L     切换到上一次使用的窗口     Last     *当前 -上次
Ctrl+B - P     切换到上一个窗口（Previous）
Ctrl+B - N     切换到下一个窗口（Next）
Ctrl+B - ,     重命名当前窗口
Ctrl+B - .     修改当前窗口编号
Ctrl+B - F     在所有窗口中查找指定文本

Pane
Ctrl+B - %     水平创建面板
Ctrl+B - “     垂直创建面板
Ctrl+B - X     关闭当前面板
Ctrl+B - Z     缩放当前面板
Ctrl+B - O     移动当前面板
Ctrl+B - !     将当前面板置于新窗口
Ctrl+B - Q     显示面板编号
Ctrl+B - 空格键     切换面板布局
Ctrl+B - 方向键     自由选择面板

Prefix = Ctrl+B
```

## .tmux.conf
```
set -g default-terminal "screen-256color"
set -ga terminal-overrides "*-256color:Tc"

set -g escape-time 0
set -g display-time 1500
set -g history-limit 10000

set -g base-index 1
set -g pane-base-index 1

set -g mouse on

set -g set-titles on

set -g allow-rename on
set -g automatic-rename on

set -g focus-events on

set -g renumber-windows on

set -g aggressive-resize on

set -g monitor-activity on

set -g mode-keys vi #复制模式设置为 vi, SPACE开始 ENTER结束

set -g default-shell /usr/local/bin/fish

# set-hook -g after-new-window 'command-prompt -I "#{window_name}" "rename-window '%%'"'

bind -n C-k clear-history

# Ctrl
bind -n C-up switch-client -n
bind -n C-down new-window -c "#{pane_current_path}"
bind -n C-left prev
bind -n C-right next

# Shift 选择面板
bind -n S-up    select-pane -U
bind -n S-down  select-pane -D
bind -n S-left  select-pane -L
bind -n S-right select-pane -R

# Ctrl+Shift 调整面板
bind -n C-S-up    resize-pane -U 5
bind -n C-S-down  resize-pane -D 5
bind -n C-S-left  resize-pane -L 5
bind -n C-S-right resize-pane -R 5

bind - split-window -v -c "#{pane_current_path}"
bind \\ split-window -h -c "#{pane_current_path}"

bind P pipe-pane -o "cat >> ~/#I.log" \; display "Toggled logging to ~/#I.log"

bind z resize-pane -Z

bind r command-prompt -I "#{window_name}" "rename-window '%%'"
bind R command-prompt -I "#{session_name}" "rename-session '%%'"

bind C-b last-window # double prefix

bind C-n next-layout # 切换面板布局

bind C-r source-file ~/.tmux.conf \; display "Config reloaded!"

# tmuxline start
set -g status-bg default
set -g status-justify right

set -g status-right "#[fg=white] | #S | #(whoami) | #H | %F %R "
set -g status-right-length 100

set -g window-status-format "#{?window_activity_flag,#[bg=brightyellow#,bold],#[fg=white]}#I:#W#F"
set -g window-status-current-format "#[fg=brightgreen,bold]➤ #I:#W#F"

set -g pane-active-border-style fg=brightyellow
# tmuxline end

bind -n DoubleClick1Pane new-window

bind -n MouseDrag1Status swap-window -t=

bind -n MouseDown2Pane run 'tmux set-buffer "$(pbpaste)"; tmux paste-buffer' \; display-message "Pasted from clipboard"

bind -T copy-mode-vi MouseDragEnd1Pane send -X copy-pipe-and-cancel "tmux show-buffer | pbcopy" \; display-message "Copied to clipboard"
```

## .bashrc
```bash
if which tmux >/dev/null 2>&1; then
    #if not inside a tmux session, and if no session is started, start a new session
    test -z "$TMUX" && (tmux attach -c `pwd` || tmux new)
fi
```
