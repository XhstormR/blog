+++
Categories = ["Android"]
date = "2016-11-12T21:15:01+08:00"
title = "Retrolambda"

+++

<!--more-->

Updated on 2016-11-12

> https://github.com/evant/gradle-retrolambda
>
> https://github.com/ReactiveX/RxAndroid

## Project
```java
build.gradle
⇳
classpath 'me.tatarka:gradle-retrolambda:3.3.1'
```

## Module
```java
build.gradle
⇳
apply plugin: 'me.tatarka.retrolambda'

android {
  compileOptions {
    sourceCompatibility JavaVersion.VERSION_1_8
    targetCompatibility JavaVersion.VERSION_1_8
  }
}
```

# RxAndroid
## Module
```java
build.gradle
⇳
compile 'io.reactivex:rxandroid:+'
compile 'io.reactivex:rxjava:+'
```