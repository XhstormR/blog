+++
categories = ["Notes"]
date = "2016-02-11T20:17:10+08:00"
title = "解包 MSI IS 文件"

+++

<!--more-->

MSI:

    msiexec /a "D:\test.msi" /qb TARGETDIR=D:\dir

InstallShield:

    "test.exe" /a /s /v"/qn TARGETDIR=D:\

More:

https://stackoverflow.com/questions/8681252/programmatically-extract-contents-of-installshield-setup-exe