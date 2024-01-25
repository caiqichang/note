If ($args) {
    sudo.bat powershell -NoExit -Command "(cd "$pwd");("$args")"
}Else {
    sudo.bat powershell -NoExit -Command "cd "$pwd
}