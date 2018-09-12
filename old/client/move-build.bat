@ECHO OFF
..\clean_folder.bat ..\public\build && (robocopy build ..\public\build /E /MOVE) ^& IF %ERRORLEVEL% LSS 8 SET ERRORLEVEL = 0
IF %ERRORLEVEL% LEQ 1
    (robocopy build ..\public\build /MOVE) ^& IF %ERRORLEVEL% LSS 8 SET ERRORLEVEL = 0
    IF %ERRORLEVEL% LEQ 1
        echo Succesful!
IF %ERRORLEVEL% GEQ 0
    echo Failed!
