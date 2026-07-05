@echo off
setlocal EnableDelayedExpansion

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

set "LOCAL_IP="
for /f "tokens=2 delims=:" %%A in ('ipconfig ^| findstr /R /C:"IPv4"') do (
  set "CANDIDATE=%%A"
  set "CANDIDATE=!CANDIDATE: =!"
  echo !CANDIDATE! | findstr /B /C:"192.168." /C:"10." /C:"172." >nul && set "LOCAL_IP=!CANDIDATE!"
)
if not defined LOCAL_IP set "LOCAL_IP=127.0.0.1"
set "NEXT_ALLOWED_DEV_ORIGIN=!LOCAL_IP!"

echo.
echo Enderecos IPv4 encontrados neste computador:
ipconfig | findstr /R /C:"IPv4"

echo.
echo Iniciando em 0.0.0.0:3000 para acesso na rede local...
echo No celular, abra http://!LOCAL_IP!:3000
echo.
call npm.cmd run dev:host
goto :end

:runtime_error
echo.
echo ERRO: nao foi possivel executar o Node.js portatil.
echo Verifique: %NODE_PORTABLE%

:end
echo.
pause
endlocal
