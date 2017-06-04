---
Categories:
- Android
date: 2016-11-12T21:15:01+08:00
title: Retrolambda
---

<!--more-->

Updated on 2016-11-12

> https://github.com/evant/gradle-retrolambda
>
> https://github.com/ReactiveX/RxAndroid
>
> https://github.com/JakeWharton/RxBinding
>
> https://github.com/square/retrofit

## Project
```java
build.gradle
⇳
classpath 'com.android.tools.build:gradle:+'
classpath 'me.tatarka:gradle-retrolambda:+'
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

## Gradle
```xml
gradle-wrapper.properties
⇳
distributionUrl=http\://android-mirror.bugly.qq.com:8080/gradle/gradle-3.2.1-all.zip
```

# RxAndroid
## Module
```java
build.gradle
⇳
compile 'io.reactivex:rxandroid:+'
compile 'io.reactivex:rxjava:+'
```

# RxBinding
## Module
```java
build.gradle
⇳
compile 'com.jakewharton.rxbinding:rxbinding:+'
```

# Retrofit
## Module
```java
build.gradle
⇳
compile 'com.squareup.retrofit2:retrofit:+'
compile 'com.squareup.retrofit2:converter-gson:+'     converter：JSON
compile 'com.squareup.retrofit2:converter-scalars:+'     converter：String
compile 'com.squareup.retrofit2:adapter-rxjava2:+'     adapter：RxJava
```
