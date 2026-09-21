@echo off
setlocal

set "APP_DIR=%USERPROFILE%\Downloads\HOI4"
set "SOURCE_DIR=%~dp0"

if not exist "%APP_DIR%\package.json" (
    echo Preparing a Windows-safe local copy for HOI4...
    if not exist "%APP_DIR%" mkdir "%APP_DIR%"
    robocopy "%SOURCE_DIR%" "%APP_DIR%" /E /XD node_modules dist /NFL /NDL /NJH /NJS /NP >nul
)

if not exist "%APP_DIR%\node_modules\vite\bin\vite.js" (
    echo Installing dependencies...
    pushd "%APP_DIR%"
    call npm install
    if errorlevel 1 (
        echo Dependency installation failed.
        pause
        popd
        exit /b 1
    )
    popd
)

for /f %%P in ('powershell -NoProfile -Command "$p=3000; while (Get-NetTCPConnection -LocalPort $p -State Listen -ErrorAction SilentlyContinue) {$p++}; $p"') do set "PORT=%%P"
if not defined PORT set "PORT=3000"

echo Starting HOI4 local server on port %PORT%...
start "HOI4 Local Server" /D "%APP_DIR%" cmd /k "npm run dev -- --host 0.0.0.0 --port %PORT%"
timeout /t 3 /nobreak >nul
start "" "http://localhost:%PORT%/"

endlocal