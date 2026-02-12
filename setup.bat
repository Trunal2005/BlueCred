@echo off
echo Installing dependencies...
call npm install
if %errorlevel% neq 0 (
    echo npm install failed. Please check your network or npm configuration.
    pause
    exit /b %errorlevel%
)

echo Pushing database schema (SQLite)...
call npx prisma generate
call npx prisma db push

echo Starting development server...
call npm run dev
