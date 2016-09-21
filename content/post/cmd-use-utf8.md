+++
Categories = ["Notes"]
date = "2016-03-27T16:28:03+08:00"
title = "CMD 使用 UTF-8 编码"

+++

<!--more-->

## 1. 修改 CMD 页面编码
```bash
chcp 65001     改用 UTF-8 编码
```

## 2. 修改 CMD 页面字体
```bash
在标题栏上点击右键，选择"属性"->"字体"，将字体修改为True Type字体"Lucida Console"。
```

---

## 其他编码格式
```bash
chcp 437     英文
chcp 932     日文
chcp 949     韩文
chcp 936     简体中文
chcp 950     繁体中文
```

## 修改 CMD 默认页面编码
```bash
更改
HKEY_CURRENT_USER\Console
或
HKEY_CURRENT_USER\Console\%SystemRoot%_system32_cmd.exe
中的 CodePage 为页面代码的 16 进制格式
```
