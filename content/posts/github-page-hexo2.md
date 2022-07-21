---
categories:
- Hexo
date: 2016-02-08T21:05:48+08:00
title: Hexo(二)
---

<!--more-->

## 配置Hexo

站点配置用到两个文件 :

- 对博客的配置 H:\hexo\\_config.yml
- 对主题的配置 H:\hexo\themes\light_config.yml

对博客的配置 H:\hexo\\_config.yml
```
# Hexo Configuration
## Docs: http://zespia.tw/hexo/docs/configure.html
## Source: https://github.com/tommy351/hexo/

# Site 这里的配置，哪项配置反映在哪里，可以参考我的博客
title: Zippera's blog #站点名，站点左上角
subtitle: Walk steps step by step #副标题，站点左上角
description: Walk steps step by step #给搜索引擎看的，对站点的描述，可以自定义
author: zippera #在站点左下角可以看到
email: #你的联系邮箱
language: zh-CN #中国人嘛，用中文

# URL #这项暂不配置，绑定域名后，欲创建sitemap.xml需要配置该项
## If your site is put in a subdirectory, set url as 'http://yoursite.com/child' and root as '/child/'
url: http://zipperary.com
root: /
permalink: :year/:month/:day/:title/
tag_dir: tags
archive_dir: archives
category_dir: categories

# Writing 文章布局、写作格式的定义，不修改
new_post_name: :title.md # File name of new posts
default_layout: post
auto_spacing: false # Add spaces between asian characters and western characters
titlecase: false # Transform title into titlecase
max_open_file: 100
filename_case: 0
highlight:
  enable: true
  backtick_code_block: true
  line_number: true
  tab_replace:

# Category & Tag
default_category: uncategorized
category_map:
tag_map:

# Archives 默认值为2，这里都修改为1，相应页面就只会列出标题，而非全文
## 2: Enable pagination
## 1: Disable pagination
## 0: Fully Disable
archive: 1
category: 1
tag: 1

# Server 不修改
## Hexo uses Connect as a server
## You can customize the logger format as defined in
## http://www.senchalabs.org/connect/logger.html
port: 4000
logger: false
logger_format:

# Date / Time format 日期格式，不修改
## Hexo uses Moment.js to parse and display date
## You can customize the date format as defined in
## http://momentjs.com/docs/#/displaying/format/
date_format: MMM D YYYY
time_format: H:mm:ss

# Pagination 每页显示文章数，可以自定义，我将10改成了5
## Set per_page to 0 to disable pagination
per_page: 5
pagination_dir: page

# Disqus Disqus插件，我们会替换成“多说”，不修改
disqus_shortname:

# Extensions 这里配置站点所用主题和插件，暂默认，后面会介绍怎么修改
## Plugins: https://github.com/tommy351/hexo/wiki/Plugins
## Themes: https://github.com/tommy351/hexo/wiki/Themes
theme: light
exclude_generator:
plugins:
- hexo-generator-feed
- hexo-generator-sitemap

# Deployment 站点部署到github要配置，上一节中已经讲过
## Docs: http://zespia.tw/hexo/docs/deploy.html
deploy:
  type: github
  repository: https://github.com/zippera/zippera.github.io.git
  branch: master
```

对主题的配置 H:\hexo\themes\light_config.yml
```
menu: #站点右上角导航栏，暂时默认，后面介绍修改
  首页: /
  存档: /archives
  关于: /about
  ToDo: /todolist


widgets: #站点右边栏，暂时默认，后面介绍修改和添加
- search
- category
- tagcloud
- weibo
- blogroll


excerpt_link: 阅读全文 #替换为中文

plugins:


twitter: #右边栏要显示twitter展示的话，需要在此设置
  username: moxie198
  show_replies: false
  tweet_count: 5

addthis: #SNS分享
  enable: true
  pubid:
  facebook: true
  twitter: true
  google: true
  pinterest: true

fancybox: true #图片效果，默认

google_analytics: #要使用google_analytics进行统计的话，这里需要配置ID，暂时默认，后面介绍
rss:  #生成RSS，需要配置路径，暂时默认，后面介绍
```

## 新建一篇photo文章
```
hexo new photo "my new photo"
```

## 新建一个页面
```
hexo new page "my new page"
```

## 新建一篇文章
```
hexo new post "my new post"     #hexo n "my new post"
```
在H:\hexo\source\_posts中打开这个文件（打开方式用“记事本”即可），配置开头。
```
title: title #文章标题
date: 2015-02-05 12:47:44 #文章生成时间
categories: #文章分类目录，可以为空，注意:后面有个空格
tags: #文章标签，可空，多标签请用格式[tag1,tag2,tag3]，注意:后面有个空格
description: #你对本页的描述 可以省略
---
这里开始使用markdown格式输入你的正文。
```
想在首页文章预览添加图片可以添加photo参数 这个需要fancybox=true 如下:
```
photos:
- http://bruce.u.qiniudn.com/2013/11/27/reading/photos-0.jpg
```

## 主页文章显示摘要
编辑md文件的时候，在要作为摘要的文字后面添加即可。
```
以上是文章摘要
<!-- more -->
以下是余下全文
```

## 不解析Html文件
hexo默认是解析html文件的，于是，html文件只要放入相应目录下命名好，hexo解析完成，将其作为一篇“文章”“插入”到模板中。如果不希望被解析，在单个html文件开头添加如下信息：
```
layout: false
---
```

## 生成post时默认生成categories配置项
在scaffolds/post.md中，添加一行categories:。同理可应用在page.md和photo.md。

## 添加RSS和Sitemap插件

```
npm install hexo-generator-feed
npm install hexo-generator-sitemap
```
在博客配置文件中启用插件
```
plugins:
- hexo-generator-feed
- hexo-generator-sitemap
```

## 文章中插入图片
- 使用本地路径：在`hexo/source`目录下新建一个`uploads`文件夹，将图片放入该文件夹下，插入图片时链接即为`/uploads/图片名称`。
- 使用微博等图床，推荐[七牛](https://portal.qiniu.com/signup?code=3lpah2qd7hidu)。

## 批量部署
编辑 _config.yml。
```
deploy:
  type: git
  message: [message]
  repo:
    github: git@github.com:XhstormR/XhstormR.github.io.git,master
    gitcafe: git@gitcafe.com:XhstormR/XhstormR.git,gitcafe-pages
```

## 通过SSH建立Github与本地的通信
```
$ ssh -T git@github.com
```
