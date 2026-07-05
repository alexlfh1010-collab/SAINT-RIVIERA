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

if exist "node_modules\.pnpm" (
  echo.
  echo INSTALACAO CANCELADA COM SEGURANCA.
  echo As dependencias atuais foram instaladas pelo pnpm.
  echo Misturar npm e pnpm no mesmo node_modules pode causar o erro "reading matches".
  echo Execute install-pnpm.cmd, que usa o pnpm-lock.yaml existente.
  goto :manager_conflict
)

echo.
echo [SAINT RIVIERA] Instalando dependencias com npm...
call npm.cmd install --package-lock=false --legacy-peer-deps --no-audit --no-fund
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

:install_error
echo.
echo ERRO: o npm nao concluiu a instalacao.
echo Como este projeto possui pnpm-lock.yaml, execute install-pnpm.cmd.
pause
goto :end

:manager_conflict
exit /b 2

:end
endlocal
