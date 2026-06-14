@echo off
REM ============================================
REM PetShop Jogja Finder - Auto Startup Script
REM ============================================

cls
echo.
echo ================================================
echo   🚀 PETSHOP JOGJA FINDER - AUTO STARTUP
echo ================================================
echo.

REM Check Node.js
echo Checking prerequisites...
where node >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo ❌ Node.js not found! Please install Node.js first.
    pause
    exit /b 1
)
echo ✅ Node.js found

REM Check npm
where npm >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo ❌ npm not found!
    pause
    exit /b 1
)
echo ✅ npm found
echo.

REM Check if node_modules exist
if not exist "backend\node_modules\" (
    echo 📦 Installing backend dependencies...
    cd backend
    call npm install --legacy-peer-deps
    cd ..
    echo ✅ Backend dependencies installed
    echo.
)

if not exist "frontend\node_modules\" (
    echo 📦 Installing frontend dependencies...
    cd frontend
    call npm install --legacy-peer-deps
    cd ..
    echo ✅ Frontend dependencies installed
    echo.
)

REM Create .env files if they don't exist
if not exist "backend\.env" (
    echo Creating backend .env...
    (
        echo NODE_ENV=development
        echo PORT=5000
        echo LOG_LEVEL=debug
        echo.
        echo DB_HOST=localhost
        echo DB_PORT=3306
        echo DB_NAME=petshop_jogja
        echo DB_USER=root
        echo DB_PASSWORD=
        echo DB_DIALECT=mysql
        echo.
        echo CORS_ORIGIN=http://localhost:3000
    ) > backend\.env
    echo ✅ backend/.env created
)

if not exist "frontend\.env.local" (
    echo Creating frontend .env.local...
    (
        echo NEXT_PUBLIC_API_BASE_URL=http://localhost:5000/api/v1
        echo NEXT_PUBLIC_APP_NAME=PetShop Jogja Finder
    ) > frontend\.env.local
    echo ✅ frontend/.env.local created
)

echo.
echo ================================================
echo   ✅ SETUP COMPLETE - STARTING SERVERS
echo ================================================
echo.

REM Start Backend
echo 🚀 Starting Backend Server (port 5000)...
start "PetShop Backend - Port 5000" cmd /k "cd backend && npm run dev"
timeout /t 3 /nobreak

REM Start Frontend
echo 🚀 Starting Frontend Server (port 3000)...
start "PetShop Frontend - Port 3000" cmd /k "cd frontend && npm run dev"
timeout /t 3 /nobreak

echo.
echo ================================================
echo   ✅ SERVERS STARTED!
echo ================================================
echo.
echo 📍 Frontend:  http://localhost:3000
echo 📍 Backend:   http://localhost:5000
echo.
echo 📝 Next Steps:
echo    1. Open http://localhost:3000 in your browser
echo    2. Test the application
echo    3. Follow TESTING_EXECUTION_PLAN.md for tests
echo.
echo 💡 To stop:
echo    - Close both terminal windows
echo.
pause
