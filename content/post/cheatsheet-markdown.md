---
Categories:
- CheatSheet
date: 2016-02-08T21:08:48+08:00
title: Markdown 简明语法手册
---

<!--more-->

> http://commonmark.org/
>
> Markdown 是一种轻量级标记语言，创始人为约翰·格鲁伯（John Gruber）。它允许人们“使用易读易写的纯文本格式编写文档，然后转换成有效的XHTML(或者HTML)文档”。这种语言吸收了很多在电子邮件中已有的纯文本标记的特性。——维基百科
>
> 我把与Markdown相关的基本语法按其类型整理在这里，以便查阅。

### 1. 标题
	 # 一级标题
	 ## 二级标题
	 ### 三级标题
	 #### 四级标题
	 ##### 五级标题
	 ###### 六级标题

### 2. 列表
	 - 无序列表1
	 - 无序列表2
	 - 无序列表3

	 1. 有序列表1
	 2. 有序列表2
	 3. 有序列表3
### 3. 引用
	 > 这个是引用
	 > 是不是和电子邮件中的
	 > 引用格式很像
### 4. 粗体与斜体
	 **这个是粗体**
	 *这个是斜体*
### 5. 链接与图片

自动链接

	 <http://xhstormr.github.io/>
	 <XhstormR@foxmail.com>

插入链接

	 [link text](http://example.com/ "optional title")

	 [link text][id]
	 [id]: http://example.com/  "optional title here"

插入图片

	 ![](/path/to/img.jpg "optional title"){ImgCap}alt text{/ImgCap}
图片链接

	 [![][jane-eyre-pic]][jane-eyre-douban]

	 [jane-eyre-pic]: http://img3.douban.com/mpic/s1108264.jpg
	 [jane-eyre-douban]: http://book.douban.com/subject/1141406/
### 6. 代码
用TAB键起始的段落，会被认为是代码块

      <php>
           echo “hello world";
      </php>
如果在一个行内需要引用代码，只要用反引号`引起来就好

	 Use the `printf()` function.

### 7. 分割线、删除线
可以在一行中用三个以上的星号、减号、底线来建立一个分隔线,用`~`可建立删除线。

	---

	 ~~Mistaken text.~~

### 8. 代码块与语法高亮

	 ```ruby
	 require 'redcarpet'
	 markdown = Redcarpet.new("Hello World!")
	 puts markdown.to_html
	 ```

-------

## 段落、标题、区块代码 ##

区块引用则使用 email 形式的 '`>`' 角括号。

Markdown 语法:

	A First Level Header
	====================
	A Second Level Header
	---------------------

	Now is the time for all good men to come to
	the aid of their country. This is just a
	regular paragraph.

	The quick brown fox jumped over the lazy
	dog's back.
	### Header 3

	> This is a blockquote.
	>
	> This is the second paragraph in the blockquote.
	>
	> ## This is an H2 in a blockquote

### 修辞和强调 ###

Markdown 使用星号和底线来标记需要强调的区段。

Markdown 语法:

	Some of these words *are emphasized*.
	Some of these words _are emphasized also_.
	Use two asterisks for **strong emphasis**.
	Or, if you prefer, __use two underscores instead__.

## 列表 ##

无序列表使用星号、加号和减号来做为列表的项目标记，这些符号是都可以使用的，使用星号：

	* Candy.
	* Gum.
	* Booze.

加号：

	+ Candy.
	+ Gum.
	+ Booze.

和减号

	- Candy.
	- Gum.
	- Booze.

有序的列表则是使用一般的数字接着一个英文句点作为项目标记：

	1. Red
	2. Green
	3. Blue

如果你在项目之间插入空行，那项目的内容会用 `<p>` 包起来，你也可以在一个项目内放上多个段落，只要在它前面缩排 4 个空白或 1 个 tab 。

	* A list item.

		With multiple paragraphs.

	* Another item in the list.

### 链接 ###

Markdown 支援两种形式的链接语法： *行内* 和 *参考* 两种形式，两种都是使用角括号来把文字转成连结。

行内形式是直接在后面用括号直接接上链接：

	This is an [example link](http://example.com/).

你也可以选择性的加上 title 属性：

	This is an [example link](http://example.com/ "With a Title").

参考形式的链接让你可以为链接定一个名称，之后你可以在文件的其他地方定义该链接的内容：

	I get 10 times more traffic from [Google][1] than from
	[Yahoo][2] or [MSN][3].

	[1]: http://google.com/ "Google"
	[2]: http://search.yahoo.com/ "Yahoo Search"
	[3]: http://search.msn.com/ "MSN Search"

title 属性是选择性的，链接名称可以用字母、数字和空格，但是不分大小写：

	I start my morning with a cup of coffee and
	[The New York Times][NY Times].

	[ny times]: http://www.nytimes.com/

### 图片 ###

图片的语法和链接很像。

行内形式（title 是选择性的）：

	![alt text](/path/to/img.jpg "Title")

参考形式：

	![alt text][id]

	[id]: /path/to/img.jpg "Title"

上面两种方法都会输出 HTML 为：

	<img src="/path/to/img.jpg" alt="alt text" title="Title" />

### 代码 ###
在一般的段落文字中，你可以使用反引号 `` ` `` 来标记代码区段，区段内的 `&`、`<` 和 `>` 都会被自动的转换成 HTML 实体，这项特性让你可以很容易的在代码区段内插入 HTML 码：

	I strongly recommend against using any `<blink>` tags.

	I wish SmartyPants used named entities like `&mdash;`
	instead of decimal-encoded entites like `&#8212;`.

如果要建立一个已经格式化好的代码区块，只要每行都缩进 4 个空格或是一个 tab 就可以了，而 `&`、`<` 和 `>` 也一样会自动转成 HTML 实体。

Markdown 语法:

	If you want your page to validate under XHTML 1.0 Strict,
	you've got to put paragraph tags in your blockquotes:

	<blockquote>
	<p>For example.</p>
	</blockquote>
