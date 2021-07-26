---
author: XhstormR
categories:
- Notes
date: 2021-07-22T22:56:57+08:00
title: Mac OS
---

<!--more-->

Updated on 2021-07-22

> {{< image "/uploads/mac-os-logo.png" "Mac OS" "1" "1" "275">}}

## Homebrew
* https://mirrors.tuna.tsinghua.edu.cn/help/homebrew/
* https://brew.sh/

```
 > brew list -1                                                                                                                                (base)
==> Formulae
aria2
coreutils
fish
hugo
libssh2
lua
ncurses
openssl@1.1
pcre2

==> Casks
alfred
amethyst
cyberduck
google-chrome
iina
intellij-idea
iterm2
karabiner-elements
maczip
megasync
miniconda
mounty
rectangle
snipaste
sourcetree
visual-studio-code
```

## Miniconda
* https://mirrors.tuna.tsinghua.edu.cn/help/anaconda/

```yaml
 > conda env export                                                                                                                            (base)
name: base
channels:
  - conda-forge
  - defaults
dependencies:
  - bat=0.18.2=h244e342_0
  - brotlipy=0.7.0=py38h96a0964_1001
  - c-ares=1.17.1=h0d85af4_1
  - ca-certificates=2021.5.30=h033912b_0
  - certifi=2021.5.30=py38h50d1736_0
  - cffi=1.14.6=py38h9688ba1_0
  - chardet=4.0.0=py38h50d1736_1
  - charset-normalizer=2.0.0=pyhd8ed1ab_0
  - conda=4.10.3=py38h50d1736_0
  - conda-package-handling=1.7.3=py38h96a0964_0
  - cryptography=3.4.7=py38h1fa4640_0
  - curl=7.77.0=hb861fe1_0
  - exa=0.10.1=h244e342_0
  - fd-find=8.2.1=h9bce647_0
  - fzf=0.27.2=h990441c_0
  - idna=3.1=pyhd3deb0d_0
  - jq=1.6=hc929b4f_1000
  - krb5=1.19.1=hcfbf3a7_0
  - libcurl=7.77.0=hf45b732_0
  - libcxx=12.0.1=habf9029_0
  - libedit=3.1.20191231=h0678c8f_2
  - libev=4.33=haf1e3a3_1
  - libevent=2.1.10=hddc9c9b_3
  - libffi=3.3=h046ec9c_2
  - libnghttp2=1.43.0=h07e645a_0
  - libssh2=1.9.0=h52ee1ee_6
  - ncurses=6.2=h2e338ed_4
  - oniguruma=6.9.7.1=h0d85af4_0
  - openssl=1.1.1k=h0d85af4_0
  - pip=21.1.3=pyhd8ed1ab_0
  - pycosat=0.6.3=py38h96a0964_1006
  - pycparser=2.20=pyh9f0ad1d_2
  - pycrypto=2.6.1=py38h94c058a_1005
  - pycurl=7.43.0.6=py38h51ed575_1
  - pyopenssl=20.0.1=pyhd8ed1ab_0
  - pysocks=1.7.1=py38h50d1736_3
  - python=3.8.10=h0e5c897_0_cpython
  - python.app=1.3=py38h96a0964_5
  - python_abi=3.8=2_cp38
  - readline=8.1=h05e3726_0
  - requests=2.26.0=pyhd8ed1ab_0
  - ripgrep=13.0.0=h244e342_0
  - ruamel_yaml=0.15.80=py38h96a0964_1004
  - setuptools=49.6.0=py38h50d1736_3
  - six=1.16.0=pyh6c4a22f_0
  - sqlite=3.36.0=h23a322b_0
  - tk=8.6.10=h0419947_1
  - tmux=3.1=h45fa02c_0
  - tqdm=4.61.2=pyhd8ed1ab_1
  - urllib3=1.26.6=pyhd8ed1ab_0
  - vim=8.2.3215=py38hd4b178d_0
  - wheel=0.36.2=pyhd3deb0d_0
  - xz=5.2.5=haf1e3a3_1
  - yaml=0.2.5=haf1e3a3_0
  - youtube-dl=2021.6.6=py38h50d1736_0
  - zlib=1.2.11=h7795811_1010
prefix: /usr/local/Caskroom/miniconda/base
```

## Karabiner
* https://karabiner-elements.pqrs.org/docs/json/
* https://github.com/pqrs-org/Karabiner-Elements
* https://github.com/pqrs-org/KE-complex_modifications/blob/master/public/json/windows_shortcuts_on_macos.json

{{< image "/uploads/mac-os-karabiner.png" "Karabiner" "1" "1" >}}

### chrome_shortcuts.json
```
{
  "title": "chrome_shortcuts",
  "rules": [
    {
      "description": "Ctrl+J",
      "manipulators": [
        {
          "conditions": [
            {
              "type": "frontmost_application_if",
              "bundle_identifiers": [
                "^com\\.google\\.Chrome$"
              ]
            }
          ],
          "from": {
            "key_code": "j",
            "modifiers": {
              "mandatory": [
                "left_control"
              ],
              "optional": [
                "any"
              ]
            }
          },
          "to": [
            {
              "key_code": "l",
              "modifiers": [
                "left_command",
                "left_alt"
              ]
            }
          ],
          "type": "basic"
        }
      ]
    },
    {
      "description": "Ctrl+H",
      "manipulators": [
        {
          "conditions": [
            {
              "type": "frontmost_application_if",
              "bundle_identifiers": [
                "^com\\.google\\.Chrome$"
              ]
            }
          ],
          "from": {
            "key_code": "h",
            "modifiers": {
              "mandatory": [
                "left_control"
              ],
              "optional": [
                "any"
              ]
            }
          },
          "to": [
            {
              "key_code": "y",
              "modifiers": [
                "left_command"
              ]
            }
          ],
          "type": "basic"
        }
      ]
    },
    {
      "description": "Ctrl+U",
      "manipulators": [
        {
          "conditions": [
            {
              "type": "frontmost_application_if",
              "bundle_identifiers": [
                "^com\\.google\\.Chrome$"
              ]
            }
          ],
          "from": {
            "key_code": "u",
            "modifiers": {
              "mandatory": [
                "left_control"
              ],
              "optional": [
                "any"
              ]
            }
          },
          "to": [
            {
              "key_code": "u",
              "modifiers": [
                "left_command",
                "left_option"
              ]
            }
          ],
          "type": "basic"
        }
      ]
    },
    {
      "description": "Ctrl+Click",
      "manipulators": [
        {
          "conditions": [
            {
              "type": "frontmost_application_if",
              "bundle_identifiers": [
                "^com\\.google\\.Chrome$"
              ]
            }
          ],
          "from": {
            "pointing_button": "button1",
            "modifiers": {
              "mandatory": [
                "left_control"
              ]
            }
          },
          "to": [
            {
              "pointing_button": "button1",
              "modifiers": [
                "left_command"
              ]
            }
          ],
          "type": "basic"
        }
      ]
    },
    {
      "description": "Ctrl+Shift+I",
      "manipulators": [
        {
          "conditions": [
            {
              "type": "frontmost_application_if",
              "bundle_identifiers": [
                "^com\\.google\\.Chrome$"
              ]
            }
          ],
          "from": {
            "key_code": "i",
            "modifiers": {
              "mandatory": [
                "left_control",
                "left_shift"
              ],
              "optional": [
                "any"
              ]
            }
          },
          "to": [
            {
              "key_code": "i",
              "modifiers": [
                "left_command",
                "left_alt"
              ]
            }
          ],
          "type": "basic"
        }
      ]
    },
    {
      "description": "Ctrl+Right/left arrow",
      "manipulators": [
        {
          "conditions": [
            {
              "bundle_identifiers": [
                "^com\\.microsoft\\.rdc$",
                "^com\\.microsoft\\.rdc\\.mac$",
                "^com\\.microsoft\\.rdc\\.macos$",
                "^com\\.microsoft\\.rdc\\.osx\\.beta$",
                "^net\\.sf\\.cord$",
                "^com\\.thinomenon\\.RemoteDesktopConnection$",
                "^com\\.itap-mobile\\.qmote$",
                "^com\\.nulana\\.remotixmac$",
                "^com\\.p5sys\\.jump\\.mac\\.viewer$",
                "^com\\.p5sys\\.jump\\.mac\\.viewer\\.web$",
                "^com\\.teamviewer\\.TeamViewer$",
                "^com\\.vmware\\.horizon$",
                "^com\\.2X\\.Client\\.Mac$",
                "^com\\.vmware\\.fusion$",
                "^com\\.vmware\\.horizon$",
                "^com\\.vmware\\.view$",
                "^com\\.parallels\\.desktop$",
                "^com\\.parallels\\.vm$",
                "^com\\.parallels\\.desktop\\.console$",
                "^org\\.virtualbox\\.app\\.VirtualBoxVM$",
                "^com\\.citrix\\.XenAppViewer$",
                "^com\\.vmware\\.proxyApp\\.",
                "^com\\.parallels\\.winapp\\.",
                "^org\\.macports\\.X11$",
                "^com\\.apple\\.Terminal$",
                "^com\\.googlecode\\.iterm2$",
                "^co\\.zeit\\.hyperterm$",
                "^co\\.zeit\\.hyper$",
                "^io\\.alacritty$",
                "^net\\.kovidgoyal\\.kitty$"
              ],
              "type": "frontmost_application_unless"
            }
          ],
          "from": {
            "key_code": "left_arrow",
            "modifiers": {
              "mandatory": [
                "left_control"
              ]
            }
          },
          "to": [
            {
              "key_code": "left_arrow",
              "modifiers": [
                "left_command"
              ]
            }
          ],
          "type": "basic"
        },
        {
          "conditions": [
            {
              "bundle_identifiers": [
                "^com\\.microsoft\\.rdc$",
                "^com\\.microsoft\\.rdc\\.mac$",
                "^com\\.microsoft\\.rdc\\.macos$",
                "^com\\.microsoft\\.rdc\\.osx\\.beta$",
                "^net\\.sf\\.cord$",
                "^com\\.thinomenon\\.RemoteDesktopConnection$",
                "^com\\.itap-mobile\\.qmote$",
                "^com\\.nulana\\.remotixmac$",
                "^com\\.p5sys\\.jump\\.mac\\.viewer$",
                "^com\\.p5sys\\.jump\\.mac\\.viewer\\.web$",
                "^com\\.teamviewer\\.TeamViewer$",
                "^com\\.vmware\\.horizon$",
                "^com\\.2X\\.Client\\.Mac$",
                "^com\\.vmware\\.fusion$",
                "^com\\.vmware\\.horizon$",
                "^com\\.vmware\\.view$",
                "^com\\.parallels\\.desktop$",
                "^com\\.parallels\\.vm$",
                "^com\\.parallels\\.desktop\\.console$",
                "^org\\.virtualbox\\.app\\.VirtualBoxVM$",
                "^com\\.citrix\\.XenAppViewer$",
                "^com\\.vmware\\.proxyApp\\.",
                "^com\\.parallels\\.winapp\\.",
                "^org\\.macports\\.X11$",
                "^com\\.apple\\.Terminal$",
                "^com\\.googlecode\\.iterm2$",
                "^co\\.zeit\\.hyperterm$",
                "^co\\.zeit\\.hyper$",
                "^io\\.alacritty$",
                "^net\\.kovidgoyal\\.kitty$"
              ],
              "type": "frontmost_application_unless"
            }
          ],
          "from": {
            "key_code": "right_arrow",
            "modifiers": {
              "mandatory": [
                "left_control"
              ]
            }
          },
          "to": [
            {
              "key_code": "right_arrow",
              "modifiers": [
                "left_command"
              ]
            }
          ],
          "type": "basic"
        }
      ]
    }
  ]
}
```

## IDEA
* https://plugins.jetbrains.com/plugin/13094-xwin-keymap/
* `~/Library/'Application Support'/JetBrains/IntelliJIdea2021.1/`

### 快捷键兼容

#### Mac
* https://courses.ics.hawaii.edu/ics314s21/morea/development-environments/reading-intellij-macos-configuration.html

#### Karabiner
```
jq --slurpfile input frontmost_application_unless_idea.json '.rules[].manipulators[].conditions += $input' 1.json > 2.json
```

##### frontmost_application_unless_idea.json
```
{
  "type": "frontmost_application_unless",
  "bundle_identifiers": [
    "^com\\.jetbrains\\.intellij$"
  ]
}
```

## 7z
* https://www.7-zip.org/download.html

```bash
curl https://www.7-zip.org/a/7z2103-mac.tar.xz | tar -x 7zz && mv -f 7zz /usr/local/bin/
```

## Font
* https://github.com/JetBrains/JetBrainsMono
* https://github.com/ryanoasis/nerd-fonts

{{< image "/uploads/mac-os-font.png" "Font" "1" "1" >}}
