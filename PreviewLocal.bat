@echo off
setlocal
cd /d "%~dp0"

where py >nul 2>nul
if %errorlevel%==0 (
  py preview_server.py
  exit /b %errorlevel%
)

where python >nul 2>nul
if %errorlevel%==0 (
  python preview_server.py
  exit /b %errorlevel%
)

echo Python was not found on PATH.
echo Install Python or use VS Code Live Server to preview the site over localhost.
pause
exit /b 1
