---
title: 快速傅里叶变换
date: 2026-01-30T22:31:05+03:00
author: XhstormR
tags:
  -
---

<!--more-->

> {{< image "uploads/fft.png" "FFT" "1" "1" "350">}}
>
> https://github.com/processing/p5.js
>
> https://editor.p5js.org
>
> https://beta.p5js.org/zh-hans/reference/p5.sound/p5.fft/
>
> https://ronik22.github.io/Audio-Visualizer/examples/circular%20waveform%201/index.html

```js
/*
<script src="https://cdn.jsdelivr.net/npm/p5@2.2.0/lib/p5.js"></script>
<script src="https://cdn.jsdelivr.net/npm/p5.sound@0.2.0/dist/p5.sound.min.js"></script>
*/

function setup() {
  createCanvas(700, 400);

  fft = new p5.FFT(1024);

  mic = new p5.AudioIn();
  mic.start();
  mic.connect(fft);
}

function draw() {
  background(255);
  stroke(0);
  fill(0);

  textAlign(CENTER);
  textSize(18);
  text("快速傅里叶变换 (FFT)", width / 2, 100);

  let spectrum = fft.analyze().slice(0, 512); // 取采样值的前一半

  beginShape();
  splineVertex(0, height);
  for (i = 0; i < spectrum.length; i++) {
    let x = map(i, 0, spectrum.length, 0, width);
    let y = map(spectrum[i], 0, 0.004, height, 0);
    splineVertex(x, y);
  }
  splineVertex(width, height);
  endShape();
}
```
