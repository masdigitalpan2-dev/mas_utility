@echo off
:: Fix React dependencies and install missing packages
echo Fixing React dependencies...

:: Navigate to frontend directory
cd /d e:\CPY\frontend

:: Remove existing node_modules and package-lock.json to start fresh
echo Cleaning existing dependencies...
if exist "node_modules" rmdir /s /q node_modules
if exist "package-lock.json" del package-lock.json

:: Install all dependencies
echo Installing dependencies...
npm install

:: Install react-scripts specifically if still missing
echo Installing react-scripts...
npm install react-scripts@5.0.1

echo Dependencies fixed!
echo Now try: npm start
pause