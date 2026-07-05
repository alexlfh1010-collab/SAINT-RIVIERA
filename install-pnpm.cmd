@echo off
setlocal

set "NODE_PORTABLE=C:\Users\alexl\Downloads\nodejs-lts\node-v22.23.1-win-x64"
set "PATH=%NODE_PORTABLE%;%PATH%"
set "COREPACK_HOME=%~dp0.corepack-cache"
set "COREPACK_ENABLE_DOWNLOAD_PROMPT=0"

cd /d "%~dp0"

echo.
echo [SAINT RIVIERA] Node.js portatil:
node.exe -v
if errorlevel 1 goto :runtime_error

echo [SAINT RIVIERA] pnpm via Corepack:
call "%NODE_PORTABLE%\corepack.cmd" pnpm --version
if errorlevel 1 goto :corepack_error

echo.
echo [SAINT RIVIERA] Instalando dependencias pelo pnpm-lock.yaml...
call "%NODE_PORTABLE%\corepack.cmd" pnpm install --frozen-lockfile
if errorlevel 1 goto :install_error

echo.
echo Dependencias instaladas com sucesso.
goto :end

:runtime_error
echo.
echo ERRO: nao foi possivel executar o Node.js portatil.
echo Verifique: %NODE_PORTABLE%
pause
goto :end

:corepack_error
echo.
echo ERRO: o Corepack nao conseguiu disponibilizar o pnpm 11.7.0.
echo Confirme sua conexao com a internet e tente novamente.
pause
goto :end

:install_error
echo.
echo ERRO: o pnpm nao concluiu a instalacao.
pause

:end
endlocal
