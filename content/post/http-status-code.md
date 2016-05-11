+++
Categories = ["Notes"]
date = "2016-05-12T07:02:01+08:00"
title = "HTTP Status Code"

+++

<!--more-->

Updated on 2016-05-13

> https://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html
>
> https://en.m.wikipedia.org/wiki/List_of_HTTP_status_codes
>
> https://tools.ietf.org/html/rfc7231#section-6
>
> https://httpstatuses.com/
>
> 我把 HTTP 状态码按其类型整理在这里，以便查阅。

## 1xx 临时响应
*表示临时响应并需要请求者继续执行操作*

100 继续 - 服务器返回此代码表示已收到请求的第一部分，正在等待其余部分。

101 切换协议 - 请求者已要求服务器切换协议，服务器已确认并准备切换。

## 2xx 成功
*表示成功处理了请求*

200 正常 - 服务器成功处理了请求。

201 已创建 - 请求成功并且服务器创建了新的资源。

202 已接受 - 服务器已接受请求，但尚未处理。

203 非授权信息 - 服务器成功处理了请求，但返回的信息可能来自另一来源。

204 无内容 - 服务器成功处理了请求，但没有返回任何内容。

205 重置内容 - 服务器成功处理了请求，但没有返回任何内容，并要求请求者重置文档视图。

206 部分内容 - 服务器成功处理了部分 GET 请求。

## 3xx 重定向
*要完成请求，需要进一步操作*

300 多种选择 - 针对请求，服务器可执行多种操作，或提供操作列表供请求者选择。

301 永久移动 - 请求的网页已永久移动到新位置，会自动将请求者转到新位置。

302 临时移动 - 服务器目前从不同位置的网页响应请求，会自动将请求者转到不同的位置。

303 查看其他位置 - 请求者应当对不同的位置使用单独的 GET 请求来检索响应时。

304 未修改 - 自从上次请求后，请求的网页未修改过，不会返回网页内容。

305 使用代理 - 请求者只能使用代理访问请求的网页，表示请求者应使用代理。

307 临时重定向 - 服务器目前从不同位置的网页响应请求，会自动将请求者转到不同的位置。

## 4xx 请求错误
*请求出错，妨碍了服务器的处理*

400 错误请求 - 服务器不理解请求的语法。

401 未授权 - 请求要求身份验证。

403 禁止 - 服务器拒绝请求。

404 未找到 - 服务器找不到请求的网页。

405 方法禁用 - 禁用请求中指定的方法。

406 不接受 - 无法使用请求的内容特性响应请求的网页。

407 需要代理授权 - 请求者应当授权使用代理。

408 请求超时 - 服务器等候请求时发生超时。

409 冲突 - 服务器在完成请求时发生冲突。

410 已删除 - 请求的资源已永久删除，有时会用来替代 404 代码。

411 需要有效长度 - 服务器不接受不含有效内容长度标头字段的请求。

412 未满足前提条件 - 服务器未满足请求者在请求中设置的其中一个前提条件。

413 请求实体过大 - 服务器无法处理请求，因为请求实体过大，超出服务器的处理能力。

414 请求的 URI 过长 - 请求的 URI 过长，服务器无法处理。

415 不支持的媒体类型 - 请求的格式不受请求页面的支持。

416 请求范围不符合要求 - 页面无法提供请求的范围。

417 未满足期望值 - 服务器未满足 "期望" 请求标头字段的要求。

## 5xx 服务器错误
*服务器处理请求时发生内部错误*

500 服务器内部错误 - 服务器遇到错误，无法完成请求。