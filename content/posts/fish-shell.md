---
author: XhstormR
tags:
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
> https://fishshell.com/docs/current/language.html
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
export TERM='screen-256color'
export LANG='zh_CN.UTF-8'
export VISUAL='idea -e'
export HISTCONTROL='ignoredups'

set -g fish_prompt_pwd_dir_length 0
# https://patorjk.com/software/taag/#p=display&f=ANSI%20Shadow&t=leo
set -g fish_greeting '
   ██╗     ███████╗ ██████╗
   ██║     ██╔════╝██╔═══██╗
   ██║     █████╗  ██║   ██║
   ██║     ██╔══╝  ██║   ██║
   ███████╗███████╗╚██████╔╝
   ╚══════╝╚══════╝ ╚═════╝
    _____
   /     \
   vvvvvvv/|____/|
      I  /O,O    |
      I /_____   |      /|/|
     J|/^ ^ ^ \  |    /00  |    _//|
      |^ ^ ^ ^ |W|   |/^^\ |   /oo |
       \m___m__|_|    \m_m_|   \mm_|
'

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

# curl -o /usr/local/bin/fzf-tmux https://raw.githubusercontent.com/junegunn/fzf/master/bin/fzf-tmux && chmod +x /usr/local/bin/fzf-tmux
# curl -o ~/.config/fish/functions/fzf_key_bindings.fish https://raw.githubusercontent.com/junegunn/fzf/master/shell/key-bindings.fish
export FZF_ALT_C_COMMAND='fd -H -E .git -t d . $dir'
export FZF_CTRL_T_COMMAND='fd -H -E .git -t f . $dir'
export FZF_DEFAULT_COMMAND='fd -H -E .git'
export FZF_ALT_C_OPTS='--preview "ls -T {} | head -100" -0'
export FZF_CTRL_T_OPTS='--preview "bat -f {} | head -100" -0'
export FZF_DEFAULT_OPTS='-m -0'
export FZF_TMUX=1
alias f='fzf'

# curl -Ls https://raw.githubusercontent.com/jarun/nnn/master/plugins/getplugs | sh
# curl -o ~/.config/fish/functions/n.fish https://raw.githubusercontent.com/jarun/nnn/master/misc/quitcd/quitcd.fish
export NNN_PLUG='p:preview-tui;'
export NNN_COLORS='#0c'
alias nnn='nnn -adeUH -Pp'

export EXA_COLORS='da=2;0:gm=1;0'
alias exa='exa -aFg --group-directories-first --color=auto --time-style=long-iso --git --icons --color-scale --sort=Name'

# alias ls='ls -hFX --group-directories-first --color=auto --time-style=long-iso'
alias ls='exa'
alias l='ls -l'
alias la='l -a'
alias ll='l'

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
alias e='idea -e'
alias o='open'

eval conda "shell.fish" "hook" $argv | source

function start.
    # set -l path (cygpath -w (pwd))
    # explorer $path

    # nautilus (pwd)

    open .
end

function c
    cd $argv[1] && ll
end

function x
    set -l name (basename $argv[1] | string split -r -m1 .)[1]
    7zz x $argv[1] -y -o$name
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

function fkill
  set -l header (ps aux | head -1)
  set -l pid (ps aux | fzf -e --header "$header" | tr -s ' ' | cut -d ' ' -f 2)
  if test -n "$pid"
    kill -9 $pid
  end
end

function proxy_on
    set -xU all_proxy socks5://127.0.0.1:1080
    set -xU http_proxy http://127.0.0.1:1080
    set -xU https_proxy http://127.0.0.1:1080
    set -xU GIT_SSH_COMMAND 'ssh -o ProxyCommand="socat - PROXY:127.0.0.1:%h:%p,proxyport=1080"'
end

function proxy_off
    set -e all_proxy
    set -e http_proxy
    set -e https_proxy
    set -e GIT_SSH_COMMAND
end

function fish_user_key_bindings
    fzf_key_bindings
end

function fish_prompt
    set -l last_pipestatus $pipestatus
    set -l normal (set_color normal)

    set -l status_color (set_color bryellow --bold)
    set -l suffix '❯'
    if fish_is_root_user
        set suffix '#'
    end
    set -l prompt_suffix (printf '%s' $status_color $suffix $normal)

    set -l status_color (set_color brblue)
    set -l statusb_color (set_color brblue --bold)
    set -l prompt_pwd (prompt_pwd | sed "s,/,$status_color/$status_color,g" | sed "s,\(.*\)/[^m]*m,\1/$statusb_color,")

    # set -l prompt_vcs (fish_vcs_prompt) # too slow
    if test -z "$prompt_vcs"
        set prompt_vcs $normal
    end

    set -l status_color  (set_color $fish_color_status)
    set -l statusb_color (set_color $fish_color_status --bold)
    set -l prompt_status (__fish_print_pipestatus "[" "]" "|" "$status_color" "$statusb_color" $last_pipestatus)
    if test -z "$prompt_status"
        set prompt_status $normal
    end

    set -l prompt_left (printf '%s:%s %s%s' (prompt_login) $prompt_pwd $prompt_vcs $prompt_status)

    set -l prompt_time (date +"%T")
    set -l prompt_duration (math $CMD_DURATION / 1000)
    set -l prompt_right (printf '(%.2fs) %s ' $prompt_duration $prompt_time)

    set -l left_width (string_width $prompt_left)
    set -l right_width (string_width $prompt_right)
    set -l space_width (math $COLUMNS - $left_width - $right_width + 5)
    set -l prompt_space (printf '%'$space_width's')

    printf '%s%s%s\n %s ' \
    $prompt_left \
    $prompt_space \
    $prompt_right \
    $prompt_suffix
end

# https://github.com/fish-shell/fish-shell/issues/4012
function string_width
    set --local empty ''
    set --local raw_string (string replace --all --regex '\e\[[^m]*m' $empty -- $argv)
    string length -- $raw_string
end

function preexec --on-event fish_preexec
end

function postexec --on-event fish_postexec
end

fish_add_path -Pma /usr/bin # 移动至最后，降低优先级
fish_add_path (brew --prefix coreutils)/libexec/gnubin

lua ~/z.lua --init fish once | source

if type tmux > /dev/null 2>&1 ; and not set -q TMUX
    tmux attach -c (pwd) || tmux new
end
```

```
"D:\Work\msys64\msys2_shell.cmd" -no-start -full-path -mingw64 -shell fish
```
