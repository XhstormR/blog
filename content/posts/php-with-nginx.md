---
author: XhstormR
categories:
- Notes
date: 2021-02-18T16:21:44+08:00
title: PHP with Nginx
---

<!--more-->

Updated on 2021-02-18

>

## Nginx
* https://mirror.azure.cn/nginx/download/

### nginx.conf
```
location ~ \.php$ {
    root           html;
    fastcgi_pass   127.0.0.1:9000;
    fastcgi_index  index.php;
    fastcgi_param  SCRIPT_FILENAME  /scripts$fastcgi_script_name;
    include        fastcgi.conf;
}
```

## PHP
* https://windows.php.net/downloads/releases/latest/

### php.ini
```ini
[PHP]
extension=php_pdo_pgsql.dll
extension=php_pgsql.dll
extension_dir="ext"
```

```
php-cgi -b 127.0.0.1:9000 -c php.ini
```
