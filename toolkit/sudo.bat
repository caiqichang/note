@echo off
powershell -Command ^
"(($arg='/k cd /d '+$pwd+' && %*') -and (Start-Process cmd -Verb RunAs -ArgumentList $arg))| Out-Null"
@echo on