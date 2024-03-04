@echo off
@rem shutdown application from a pid file
set pidFile="path\\to\\pidFile.pid"
title shutdown %pidFile%
set pid=-1
if exist %pidFile% (
    set /p pid=<%pidFile%
) else (
    echo PID file not found
)
if %pid% neq -1 (
    taskkill /f /pid %pid%
)
@echo on
pause