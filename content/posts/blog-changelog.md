---
categories:
- Blog
date: 2016-02-08T21:03:50+08:00
title: Blog Changelog
---

<!--more-->

> 我把我对本博客的一些更新整理在这里，以便查阅。
>
> 后来因为太懒，就不整理了。😃

## Highlight

```html
<link rel="stylesheet" href="http://apps.bdimg.com/libs/highlight.js/9.1.0/styles/monokai_sublime.min.css">
<script src="http://apps.bdimg.com/libs/highlight.js/9.1.0/highlight.min.js"></script>
<script>hljs.initHighlightingOnLoad();</script>
```

## Scrollbar

```css
: : -webkit-scrollbar-track-piece {
    background-color: #FFFFFF;
}
: : -webkit-scrollbar-track-piece: horizontal {
    background-color: #23241f;
}
: : -webkit-scrollbar {
    height: 12px;
    width: 9px;
}
: : -webkit-scrollbar-thumb {
    background: #969CBD;
}
```

## Font

```css
*: not([class*="icon"]): not(i) {
    font-family: "Microsoft YaHei","Symbol" !important;
}
```

## Particle

```html
<canvas id="reactive-bg-canvas"></canvas>
<script src="http://apps.bdimg.com/libs/jquery/2.1.4/jquery.min.js"></script>
<script src="http://cdn.bootcss.com/gsap/1.18.2/TweenLite.min.js"></script>
<script src="magic-canvas.min.js"></script>
<script>$.magicCanvas.draw({type:"random-move",rgb:function (circlePos) {var px = circlePos.x;var py = circlePos.y;return {r:0,g:0,b:0};}})</script>
```

## Scroll Mouse

```javascript
function scrollPlus() {
    function e() {
        return m ? void 0 : (m = document.createElement("div"), m.setAttribute("id", "IndicatorBox"), m.setAttribute("style", "width:" + i + "%;background:" + l + ";min-height:" + d + "px;text-align:center;position: fixed; top: -40px; right: 0;overflow: hidden; z-index: 102400;font-family:Arial !important;cursor:n-resize;cursor:ns-resize;"), document.body.appendChild(m), m.addEventListener("click", function() {
            a = 0
        }, !1), !0)
    }
    function t() {
        var e = document.createElement("a");
        e.id = "scrollUpIco", e.textContent = "Top", e.addEventListener("click", function() {
            window.scrollTo(0, document.body.scrollLeft)
        }, !1), document.body.appendChild(e), GM_addStyle("			#scrollUpIco {				position: fixed;				z-index: 2147483647;				width: 50px;				height: 50px;				border-radius: 25px;				bottom: 20px;				right: 25px;				line-height: 50px;				text-align: center;				font-weight: bold;				background-color: rgba(0, 0, 0, 0.3);				color: #fff;				text-decoration: none;				-moz-user-select:none;				-webkit-user-select:none;				cursor:default;			}			#scrollUpIco:hover {				background-color: rgba(0, 0, 0, 0.75);				color: #fff !important;			}")
    }
    var o, n = 1,c = 1,i = 5,l = "rgba(29,163,63, 0.4)",d = 20,r = 10,u = 1,s = -1,m = 0, = 0;
    document.addEventListener("mousemove", function(t) {
        if ("true" != document.body.contentEditable) {
            var n = Math.max(document.body.scrollHeight, document.documentElement.scrollHeight),
                l = Math.max(document.body.clientWidth, document.documentElement.clientWidth) - r,
                p = window.innerHeight,
                f = window.innerHeight - 2 * r;
            if (n > p) {
                if (t.clientX > l) switch (u) {
                    case 1:
                        a = 1;
                        break;
                    case 2:
                        t.ctrlKey && (a = 1);
                        break;
                    case 3:
                        t.clientY > p / 2 - 50 && t.clientY < p / 2 + 50 && (a = 1)
                }
                t.clientX < (1 - i / 100) * l && (a = 0)
            }
            if (a) {
                if (1 == c && e(), -1 != s) {
                    o = t.ctrlKey ? n / f / 2 : n / f, m && (m.style.top = t.clientY - d / 2 + "px");
                    var b = o * (t.clientY - s);
                    document.body.scrollTop += b, document.documentElement.scrollTop += b, t.clientY + 20 > p && (document.body.scrollTop += 10 * o, document.documentElement.scrollTop += 10 * o), t.clientY > 0 && t.clientY < 20 && (document.body.scrollTop -= 10 * o, document.documentElement.scrollTop -= 10 * o)
                }
                s = t.clientY
            } else s = -1, m && setTimeout(function() {
                m.style.top = "-200px"
            }, 200)
        }
    }, !1), document.addEventListener("click", function() {
        a = 0
    }, !1), n && t()
}
window === window.top && "" !== window.document.title && setTimeout(scrollPlus, 100);
```

----

```css
/*Gradient Image*/
img {
    opacity: 1;
    transition: opacity 0.6s;
}
img[data-src] {
    opacity: 0;
}
/*Selection*/
::selection {
    background: #d6edff;
    color: #222;
    text-shadow: none;
}
/* Rotate*/
.rotate {
    transition: All 0.4s ease-in-out;
    -webkit-transition: All 0.4s ease-in-out;
    -moz-transition: All 0.4s ease-in-out;
    -o-transition: All 0.4s ease-in-out;
}
.rotate:hover {
    transform: rotate(360deg) scale(1.3);
    -webkit-transform: rotate(360deg) scale(1.3);
    -moz-transform: rotate(360deg) scale(1.3);
    -o-transform: rotate(360deg) scale(1.3);
    -ms-transform: rotate(360deg) scale(1.3);
}
```