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

alias ls='ls -hFX --group-directories-first --color=auto --time-style=long-iso'
alias l='ls'
alias ll='ls -l'
alias la='ll -A'

alias vi='vim'

alias ..='cd ..'
alias ...='cd ../..'
alias ....='cd ../../..'

alias gs='git status'
alias gd='git diff'

alias now='date +"%F %T"'
alias myip='curl -sk https://myip.ipip.net/'
alias rand='openssl rand -hex 30'
alias aria2c='aria2c -s16 -x16 -k1M'
alias jq='jq -C'

set -x HISTCONTROL ignoredups

function start.
    set -l path (cygpath -w (pwd))
    explorer $path
    # nautilus (pwd)
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

    set -l prompt_vcs (fish_vcs_prompt)
    if test "$prompt_vcs" = ''
        set prompt_vcs $normal
    end

    printf '%s%s%s@%s%s%s %s%s%s%s%s\n %s ' \
    (set_color brgreen) (whoami) $normal \
    (set_color brgreen) (hostname) $normal \
    (set_color bryellow) (pwd) $normal \
    $prompt_vcs $prompt_status $suffix
end

source (lua ~/z.lua --init fish | psub)

eval conda "shell.fish" "hook" $argv | source
```
