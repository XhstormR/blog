---
author: XhstormR
categories:
- Notes
date: 2019-05-31T16:50:54+08:00
title: Android DEX Unpack
---

<!--more-->

Updated on 2019-05-31

> https://source.android.google.cn/devices/tech/dalvik/dex-format

```bash
frida-trace -U -i *SizeOfClassWithoutEmbeddedTables* com.saicmotor.tocapp
frida -U -f com.saicmotor.tocapp -l 123.js --no-pause
```

```javascript
var module = Module.getExportByName('libart.so',
    '_ZN3art11ClassLinker32SizeOfClassWithoutEmbeddedTablesERKNS_7DexFileERKNS1_8ClassDefE')

Interceptor.attach(module, {
    onEnter: function (args) {
        var dex_file = args[1].add(0x04).readPointer() // 由于类中含有虚函数，跳过 vfptr，32 位加 4，64 位加 8
        var dex_file_size = dex_file.add(0x20).readUInt()
        var dex_header_size = dex_file.add(0x24).readUInt()

        // console.log(JSON.stringify(this.context))
        // console.log(hexdump(dex_file, {length: 16}))
        console.log(dex_file.readCString())
        console.log(dex_file_size)
        console.log(dex_header_size)
        console.log('---------')

        var file = new File('/mnt/sdcard/Download/' + dex_file_size + '.dex', 'wb')
        file.write(dex_file.readByteArray(dex_file_size))
        file.flush()
        file.close()
    },
    onLeave: function (retval) {
    }
})
/*
   C: args[0-n] = arguments
 C++: args[0] = this, args[1-n] = arguments
ObjC: args[0] = self, args[1] = selector, args[2-n] = arguments
*/
```

---

```bash
进制转换
----
busybox printf %x 32 # decimal -> hex
busybox printf %d 0x20 # hex -> decimal

查看符号表
----
nm.exe libart.so

解码 C++ 函数名
----
c++filt.exe _ZN3art11ClassLinker32SizeOfClassWithoutEmbeddedTablesERKNS_7DexFileERKNS1_8ClassDefE
----
art::ClassLinker::SizeOfClassWithoutEmbeddedTables(art::DexFile const&, art::DexFile::ClassDef const&)
```

## Reference
* https://android.googlesource.com/platform/art/+/refs/tags/android-9.0.0_r39/runtime/class_linker.h#856
* https://android.googlesource.com/platform/art/+/refs/tags/android-9.0.0_r39/libdexfile/dex/dex_file.h#68
* C++ 内存布局：
  * https://www.cnblogs.com/churi/p/4480221.html
  * https://www.cnblogs.com/wangsicongde/p/7599243.html
  * https://www.cnblogs.com/DylanWind/archive/2009/01/12/1373919.html
  * https://blog.csdn.net/susershine/article/details/17020397
