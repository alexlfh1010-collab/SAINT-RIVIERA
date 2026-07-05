@echo off
setlocal

set "NODE_PORTABLE=C:\Users\alexl\Downloads\nodejs-lts\node-v22.23.1-win-x64"
set "PATH=%NODE_PORTABLE%;%PATH%"

cd /d "%~dp0"

echo.
echo [SAINT RIVIERA] Node.js portatil:
node.exe -v
if errorlevel 1 goto :runtime_error

echo [SAINT RIVIERA] npm:
call npm.cmd -v
if errorlevel 1 goto :runtime_error

echo.
echo [SAINT RIVIERA] Iniciando o ambiente local...
call npm.cmd run dev
goto :end

:runtime_error
echo.
echo ERRO: nao foi possivel executar o Node.js portatil.
echo Verifique: %NODE_PORTABLE%
pause

:end
endlocal
