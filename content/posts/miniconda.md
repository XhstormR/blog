---
author: XhstormR
tags:
  - Notes
date: 2019-10-23T22:54:54+08:00
title: Miniconda
---

<!--more-->

Updated on 2019-10-23

> [Python 发行版](https://github.com/mamba-org/mamba)
>
> https://mirrors.tuna.tsinghua.edu.cn/help/anaconda/
>
> https://anaconda.org/search
>
> https://docs.python.org/zh-cn/3/
>
> https://pythonguidecn.readthedocs.io/zh/latest/

```bash
conda info
conda list
conda init fish
conda update --all
conda clean --all

conda create -y -n myenv3 pycurl pycryptodome ripgrep python=3
conda activate myenv3
conda deactivate

conda search pycryptodome
conda install pycryptodome
conda update pycryptodome
conda remove pycryptodome

conda env list
conda env export -n myenv3 -f myenv3.yml
conda env remove -n myenv3
```

## .condarc

```bash
channels:
  - conda-forge
  - defaults
channel_priority: strict
show_channel_urls: true
default_channels:
  - https://mirrors.tuna.tsinghua.edu.cn/anaconda/pkgs/main
  - https://mirrors.tuna.tsinghua.edu.cn/anaconda/pkgs/r
  - https://mirrors.tuna.tsinghua.edu.cn/anaconda/pkgs/msys2
custom_channels:
  conda-forge: https://mirrors.tuna.tsinghua.edu.cn/anaconda/cloud
  msys2: https://mirrors.tuna.tsinghua.edu.cn/anaconda/cloud
  bioconda: https://mirrors.tuna.tsinghua.edu.cn/anaconda/cloud
  menpo: https://mirrors.tuna.tsinghua.edu.cn/anaconda/cloud
  pytorch: https://mirrors.tuna.tsinghua.edu.cn/anaconda/cloud
  simpleitk: https://mirrors.tuna.tsinghua.edu.cn/anaconda/cloud
```

## PATH

```bash
C:\Users\Leo\Miniconda3
C:\Users\Leo\Miniconda3\Scripts
C:\Users\Leo\Miniconda3\Library\bin
```

```bash
C:\Users\Leo\Miniconda3\Scripts\activate.bat
```

```bash
C:\Users\Leo\AppData\Roaming\Microsoft\Windows\Start Menu\Programs
```
