---
categories:
- Notes
date: 2016-02-11T20:17:10+08:00
title: 解包 MSI IS 文件
---

<!--more-->

## MSI

    msiexec.exe /a D:\test.msi /passive TARGETDIR=D:\dir

## InnoSetup

    test.exe /VERYSILENT /NORESTART /NOICONS /DIR="D:\dir"

## InstallShield

    test.exe /a /s /v"/passive TARGETDIR=D:\dir
    test.exe /extract_all:D:\dir

## [SourceTree](https://www.atlassian.com/software/sourcetree)

    SourceTreeSetup_1.9.10.0.exe /?
    SourceTreeSetup_1.9.10.0.exe /extract

## More
[7zr](https://blog.xhstormr.tk/uploads/bin/7zr.exe),
[innounp](https://blog.xhstormr.tk/uploads/bin/innounp.exe),
[lessmsi](https://github.com/activescott/lessmsi/releases/latest)

## Reference
[MSI](http://helpnet.flexerasoftware.com/installshield24helplib/helplibrary/IHelpCmdLineMSI.htm),
[InnoSetup](http://www.jrsoftware.org/ishelp/topic_setupcmdline.htm),
[InstallShield](http://helpnet.flexerasoftware.com/installshield24helplib/helplibrary/IHelpSetup_EXECmdLine.htm),
[InstallShield](https://stackoverflow.com/questions/8681252/programmatically-extract-contents-of-installshield-setup-exe)
