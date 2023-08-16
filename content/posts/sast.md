---
author: XhstormR
categories:
-
date: 2022-04-18T15:28:59+08:00
title: SAST
---

<!--more-->

Updated on 2022-04-18

> Static Application Security Testing
>
> https://docs.github.com/zh/code-security/guides

## Semgrep
* https://github.com/returntocorp/semgrep
* https://github.com/returntocorp/semgrep-rules

```shell
python3 -m pip install --index-url=https://mirrors.aliyun.com/pypi/simple/ --upgrade semgrep

semgrep scan --verbose --disable-version-check --metrics off --scan-unknown-extensions --config r/java --config r/contrib.owasp.java --sarif -o semgrep-result.sarif.json '/Users/user/Documents/IdeaProjects/text-masker/'
```

## CodeQL
* https://codeql.github.com/docs
* https://github.com/github/codeql-action/releases/latest
    * https://github.com/github/codeql
    * https://github.com/github/codeql-cli-binaries

```shell
xcode-select --install

./codeql version
./codeql resolve qlpacks
./codeql resolve languages

mkdir db
./codeql database create  ./db/text-masker --language java --command './gradlew classes --no-daemon --rerun-tasks' --source-root '/Users/user/Documents/IdeaProjects/text-masker/'
./codeql database upgrade ./db/text-masker
./codeql database analyze ./db/text-masker --format sarif-latest --output codeql-result.sarif.json codeql/java/ql/src/Security/CWE/CWE-798/HardcodedCredentialsApiCall.ql
```

## Gitleaks
* https://github.com/gitleaks/gitleaks

```shell
gitleaks detect -v -f sarif -r gitleaks-result.sarif.json -s '/Users/user/Documents/IdeaProjects/text-masker/'
```

## Gosec
* https://github.com/securego/gosec

```shell
gosec -no-fail -fmt sarif -out gosec-result.sarif.json '/Users/user/Documents/IdeaProjects/text-masker/...'
```

## KICS
* https://github.com/Checkmarx/kics
* https://github.com/Checkmarx/kics/blob/master/Dockerfile

```shell
kics scan --no-progress --report-formats 'sarif,html,pdf' --output-name kics-result -o ./ -p '/Users/user/Documents/IdeaProjects/text-masker/'
```

## SARIF Format
* https://sarif.info/Validation
* https://microsoft.github.io/sarif-web-component

## Reference
* Other code scanning tools
  * https://github.com/SonarSource/sonarqube
