---
author: XhstormR
categories:
-
date: 2022-04-18T15:28:59+08:00
title: Semgrep
---

<!--more-->

Updated on 2022-04-18

> https://github.com/returntocorp/semgrep
>
> https://github.com/returntocorp/semgrep-rules
>
> https://microsoft.github.io/sarif-web-component

```shell
python3 -m pip install --index-url=https://mirrors.aliyun.com/pypi/simple/ --upgrade semgrep

semgrep scan --metrics off --config=r/java --config=r/contrib.owasp.java --sarif -o 123.sarif.json 123
```

## Reference
* Other code scanning tools
  * https://github.com/github/codeql
  * https://github.com/SonarSource/sonarqube
