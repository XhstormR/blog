---
title: Patch Bongo Cat
date: 2025-08-19T04:43:17+03:00
author: XhstormR
tags:
  - Reverse
---

<!--more-->

> ![](uploads/bongo_cat3.png)
>
> https://store.steampowered.com/app/3419430/Bongo_Cat/
>
> https://github.com/dnSpyEx/dnSpy

file `Steam\steamapps\common\BongoCat\BongoCat_Data\Managed\Assembly-CSharp.dll` -> namespace `BongoCat`

## 修改计数器

```java
this._keysDown += GlobalKeyHook.IsDown.Count((bool x) => x) * 10000; //修改
```

![](uploads/bongo_cat1.png)

## 自动开箱

```java
this._shopItem.Buy(); //添加
```

![](uploads/bongo_cat2.png)
