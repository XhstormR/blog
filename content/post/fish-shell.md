---
author: XhstormR
categories:
- Notes
date: 2020-03-15T17:16:19+08:00
title: Fish Shell
---

<!--more-->

Updated on 2020-03-15

> https://github.com/fish-shell/fish-shell
>
> https://fishshell.com/docs/current/commands.html
>
> https://software.opensuse.org/package/fish

## Build
```bash
yum -y install gcc make cmake ncurses-devel

curl -LO https://github.com/fish-shell/fish-shell/archive/master.zip
unzip master.zip && cd fish-shell-master

mkdir build; cd build
cmake ..
make install
```

## config.fish
```
export TERM="screen-256color"
export LANG=zh_CN.UTF-8

alias rm='rm -i'
alias cp='cp -i'
alias mv='mv -i'

alias df='df -h'
alias du='du -h'

alias less='less -r'
alias whence='type -a'
alias grep='grep -n --color=auto'
alias egrep='egrep --color=auto'
alias fgrep='fgrep --color=auto'
alias pgrep='pgrep -a'

export EXA_COLORS='da=2;0:gm=1;0'
alias exa='exa -Fg --group-directories-first --color=auto --time-style=long-iso --git --icons --color-scale --sort=Name'

# alias ls='ls -hFX --group-directories-first --color=auto --time-style=long-iso'
alias ls='exa'
alias l='ls'
alias ll='ls -l'
alias la='ll -a'

alias vi='vim'
alias cat='bat'

alias ..='c ..'
alias ...='c ../..'
alias ....='c ../../..'

alias gs='git status'
alias gd='git diff'

alias now='date +"%F %T"'
alias myip='curl -sk https://myip.ipip.net/'
alias rand='openssl rand -hex 30'
alias aria2c='aria2c -s16 -x16 -k1M'
alias jq='jq -C'

export HISTCONTROL=ignoredups

function start.
    # set -l path (cygpath -w (pwd))
    # explorer $path

    # nautilus (pwd)

    open .
end

function c
    cd $argv[1] && ll
end

function h
    $argv[1] --help || $argv[1] -help || $argv[1] help
end

function v
    $argv[1] --version || $argv[1] -version || $argv[1] version
end

function take
    mkdir -p $argv
    cd $argv
end

function proxy_on
    set -xU all_proxy socks5://127.0.0.1:1080
    set -xU http_proxy http://127.0.0.1:1080
    set -xU https_proxy http://127.0.0.1:1080
end

function proxy_off
    set -e all_proxy
    set -e http_proxy
    set -e https_proxy
end

function fish_prompt
    set -l last_pipestatus $pipestatus
    set -l normal (set_color normal)

    set -l suffix '>'
    if contains -- $USER root
        set suffix '#'
    end

    set -l prompt_status (__fish_print_pipestatus " [" "]" "|" (set_color $fish_color_status) (set_color --bold $fish_color_status) $last_pipestatus)
    if test "$prompt_status" = ''
        set prompt_status $normal
    end

    # set -l prompt_vcs (fish_vcs_prompt) # too slow
    if test "$prompt_vcs" = ''
        set prompt_vcs $normal
    end

    printf '%s %s%s%s%s%s\n %s ' \
    (prompt_login) \
    (set_color bryellow) (pwd) $normal \
    $prompt_vcs $prompt_status $suffix
end

fish_add_path (brew --prefix)/opt/coreutils/libexec/gnubin
fish_add_path -Pma /usr/bin # 移动至最后，降低优先级

lua ~/z.lua --init fish once | source

eval conda "shell.fish" "hook" $argv | source
```

```
"D:\Work\msys64\msys2_shell.cmd" -no-start -full-path -mingw64 -shell fish
```
