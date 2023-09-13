---
title: Patch Sublime Text
date: 2023-08-20T15:57:41+03:00
author: XhstormR
tags:
- Reverse
---

<!--more-->

> Sublime Text Build 4152
>
> https://www.sublimetext.com/download
>
> https://hexed.it/

* `80 78 05 00 0F 94 C1` -> `C6 40 05 01 48 85 C9`

## Patch

```bash
/Applications/'Sublime Text.app'/Contents/MacOS/sublime_text
```

## Sign

```bash
codesign --force --deep --sign - /Applications/'Sublime Text.app'
```

## Config

```bash
curl -o ~/Library/'Application Support/Sublime Text'/Packages/User/Dracula.tmTheme https://raw.githubusercontent.com/dracula/sublime/master/Dracula.tmTheme
```

### Preferences.sublime-settings

```json
{
    "color_scheme": "Packages/User/Dracula.tmTheme",
    "font_face": "JetBrainsMono Nerd Font",
    "font_size": 13,
    "word_wrap": false,
    "highlight_line": true,
    "highlight_modified_tabs": true,
    "match_brackets_angle": true,
    "fade_fold_buttons": false,
    "save_on_focus_lost": true,
    "translate_tabs_to_spaces": true,
    "ensure_newline_at_eof_on_save": true,
    "always_show_minimap_viewport": true,
    "draw_minimap_border": true,
    "draw_white_space": "all",
    "trim_trailing_white_space_on_save": "all",
    "caret_style": "blink",
    "rulers": [[80, "stippled"]],
}
```

## Reference
* https://gist.github.com/opastorello/4d494d627ec9012367028c89cb7a1945
* https://gist.github.com/maboloshi/feaa63c35f4c2baab24c9aaf9b3f4e47
