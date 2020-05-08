---
author: XhstormR
categories:
- Notes
date: 2019-10-23T22:54:54+08:00
title: Miniconda
---

<!--more-->

Updated on 2019-10-23

> [Python 发行版](https://mirrors.tuna.tsinghua.edu.cn/anaconda/miniconda/Miniconda3-latest-Windows-x86_64.exe)
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
conda init
conda update conda

conda create -y -n myenv3 pycrypto ripgrep python=3
conda activate myenv3
conda deactivate

conda search pycrypto
conda install pycrypto
conda update pycrypto
conda remove pycrypto

conda env list
conda env export -n myenv3 -f myenv3.yml
conda env remove -n myenv3
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
