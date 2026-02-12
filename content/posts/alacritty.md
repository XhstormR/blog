---
author: XhstormR
tags:
  - Notes
date: 2021-08-18T10:13:37+08:00
title: Alacritty
---

<!--more-->

Updated on 2021-08-18

> https://github.com/alacritty/alacritty

```yaml
env:
  TERM: screen-256color

shell:
  program: /usr/local/Caskroom/miniconda/base/bin/fish

window:
  startup_mode: Maximized
  dynamic_title: true

font:
  size: 14
  normal:
    family: JetBrainsMono Nerd Font

bell:
  animation: EaseOutSine
  duration: 600
  color: "#4e4e4e"

mouse_bindings:
  - { mouse: Middle, action: PasteSelection }

background_opacity: 0.9

draw_bold_text_with_bright_colors: true

key_bindings:
  - { key: A, mods: Alt, chars: "\x1ba" }
  - { key: B, mods: Alt, chars: "\x1bb" }
  - { key: C, mods: Alt, chars: "\x1bc" }
  - { key: D, mods: Alt, chars: "\x1bd" }
  - { key: E, mods: Alt, chars: "\x1be" }
  - { key: F, mods: Alt, chars: "\x1bf" }
  - { key: G, mods: Alt, chars: "\x1bg" }
  - { key: H, mods: Alt, chars: "\x1bh" }
  - { key: I, mods: Alt, chars: "\x1bi" }
  - { key: J, mods: Alt, chars: "\x1bj" }
  - { key: K, mods: Alt, chars: "\x1bk" }
  - { key: L, mods: Alt, chars: "\x1bl" }
  - { key: M, mods: Alt, chars: "\x1bm" }
  - { key: N, mods: Alt, chars: "\x1bn" }
  - { key: O, mods: Alt, chars: "\x1bo" }
  - { key: P, mods: Alt, chars: "\x1bp" }
  - { key: Q, mods: Alt, chars: "\x1bq" }
  - { key: R, mods: Alt, chars: "\x1br" }
  - { key: S, mods: Alt, chars: "\x1bs" }
  - { key: T, mods: Alt, chars: "\x1bt" }
  - { key: U, mods: Alt, chars: "\x1bu" }
  - { key: V, mods: Alt, chars: "\x1bv" }
  - { key: W, mods: Alt, chars: "\x1bw" }
  - { key: X, mods: Alt, chars: "\x1bx" }
  - { key: Y, mods: Alt, chars: "\x1by" }
  - { key: Z, mods: Alt, chars: "\x1bz" }

# curl -o ~/.config/alacritty/dracula.yml https://raw.githubusercontent.com/dracula/alacritty/master/dracula.yml
import:
  - ~/.config/alacritty/dracula.yml
```
