@echo off
setlocal
cd /d "%~dp0"
title Mippi Portfolio v3.00 - Local Test
echo.
echo =====================================================
echo   MIPPI PORTFOLIO v3.00 - LOCAL TEST SERVER
echo =====================================================
echo.
echo The site will open in your default browser.
echo Keep this window open while testing.
echo Press Ctrl+C here to stop the server.
echo.
if not exist "%~dp0index.html" (
  echo ERROR: index.html was not found next to this BAT file.
  echo Extract the entire GitHub ZIP before running this.
  pause
  exit /b 1
)
where powershell.exe >nul 2>&1
if errorlevel 1 (
  echo ERROR: Windows PowerShell is not available.
  pause
  exit /b 1
)
powershell.exe -NoProfile -ExecutionPolicy Bypass -File "%~dp0LocalTestServer.ps1"
if errorlevel 1 (
  echo.
  echo The local test server encountered an error.
  pause
)
endlocal
