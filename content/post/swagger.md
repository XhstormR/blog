---
author: XhstormR
categories:
- Notes
date: 2018-03-02T15:55:56+08:00
title: Swagger API
---

<!--more-->

Updated on 2018-03-02

> https://editor.swagger.io/
>
> https://inspector.swagger.io/

```bash
@ curl -LRko swagger-codegen-cli.jar https://jcenter.bintray.com/io/swagger/swagger-codegen-cli/2.3.1/swagger-codegen-cli-2.3.1.jar
@ curl -RkO http://petstore.swagger.io/v2/swagger.json

@ java -jar swagger-codegen-cli.jar generate ^
-i swagger.json ^
-o client ^
-l java ^
-DapiPackage=com.example.demo.client.api ^
-DmodelPackage=com.example.demo.client.model ^
-DinvokerPackage=com.example.demo.client ^
-Dlibrary=resttemplate ^
-Djava8=true ^
-DdateLibrary=java8 ^
-DhideGenerationTimestamp=true

@ java -jar swagger-codegen-cli.jar generate ^
-i swagger.json ^
-o server ^
-l spring ^
-DapiPackage=com.example.demo.api ^
-DmodelPackage=com.example.demo.model ^
-DinvokerPackage=com.example.demo ^
-DconfigPackage=com.example.demo.config ^
-Dlibrary=spring-boot ^
-Djava8=true ^
-DdateLibrary=java8 ^
-DuseOptional=true ^
-DsingleContentTypes=true ^
-DhideGenerationTimestamp=true

:: gradlew init --type pom
:: 模板: https://github.com/swagger-api/swagger-codegen/tree/master/modules/swagger-codegen/src/main/resources/JavaSpring
```

## About JSON
* JSON 规范：
  * 数据在键值对中。
  * 数据由逗号分隔。
  * 花括号保存对象。
  * 方括号保存数组。
* JSON 值：
  * null
  * 数字
  * 布尔值
  * 字符串（双引号 `" "`）
  * 对象　（花括号 `{ }`）
  * 数组　（方括号 `[ ]`）
* JSON 有且仅有 2 种数据结构：对象、数组。

## Reference

* Format：
  * http://www.jsonschema2pojo.org/
  * https://prettier.io/playground/
  * https://jsonformatter.curiousconcept.com/
  * https://github.com/tulios/json-viewer
* Test：
  * https://httpbin.org/
  * https://docs.postman-echo.com/
  * https://www.getpostman.com/apps
