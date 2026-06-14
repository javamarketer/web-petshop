#!/usr/bin/env pwsh

Write-Host "================================"
Write-Host "🚀 PETSHOP JOGJA FINDER STARTUP"
Write-Host "================================"
Write-Host ""

# Check if npm install is complete
function Wait-For-Install {
    param([string]$Path, [string]$Module)
    Write-Host "⏳ Waiting for $Module to install..."
    $maxAttempts = 120
    $attempts = 0
    
    while ($attempts -lt $maxAttempts) {
        if (Test-Path "$Path\node_modules\package.json" -ErrorAction SilentlyContinue) {
            Write-Host "✅ $Module ready!"
            return $true
        }
        Start-Sleep -Seconds 5
        $attempts++
        if ($attempts % 12 -eq 0) {
            Write-Host "⏳ Still waiting... ($((($maxAttempts - $attempts) * 5 / 60)) minutes remaining)"
        }
    }
    
    Write-Host "❌ $Module installation timeout"
    return $false
}

# Wait for both to complete
$frontendReady = Wait-For-Install "e:\latihan\VC Sumir\web-petshop\frontend" "Frontend"
$backendReady = Wait-For-Install "e:\latihan\VC Sumir\web-petshop\backend" "Backend"

if (-not $frontendReady -or -not $backendReady) {
    Write-Host "⚠️  npm install belum selesai. Silakan tunggu lebih lama..."
    exit 1
}

Write-Host ""
Write-Host "🔧 SETUP DATABASE"
Write-Host "================================"

# Create database using SQL script
Write-Host "Creating database..."
try {
    # Try to run SQL file with mysql command
    mysql -u root < "e:\latihan\VC Sumir\web-petshop\setup-database.sql" -ErrorAction Stop
    Write-Host "✅ Database created successfully"
} catch {
    Write-Host "⚠️  Could not auto-create database with MySQL command"
    Write-Host "Please run this manually:"
    Write-Host "mysql -u root < setup-database.sql"
    Write-Host ""
}

Write-Host ""
Write-Host "🚀 STARTING SERVERS"
Write-Host "================================"
Write-Host ""

# Start backend
Write-Host "Starting Backend Server (port 5000)..."
$backendProcess = Start-Process pwsh -ArgumentList @("-NoProfile", "-Command", "cd 'e:\latihan\VC Sumir\web-petshop\backend'; npm run dev") -PassThru -WindowStyle Normal

Start-Sleep -Seconds 3

# Start frontend  
Write-Host "Starting Frontend Server (port 3000)..."
$frontendProcess = Start-Process pwsh -ArgumentList @("-NoProfile", "-Command", "cd 'e:\latihan\VC Sumir\web-petshop\frontend'; npm run dev") -PassThru -WindowStyle Normal

Start-Sleep -Seconds 5

Write-Host ""
Write-Host "================================"
Write-Host "✅ PROJECT IS RUNNING!"
Write-Host "================================"
Write-Host ""
Write-Host "📍 Frontend:  http://localhost:3000"
Write-Host "📍 Backend:   http://localhost:5000"
Write-Host ""
Write-Host "💡 Next steps:"
Write-Host "  1. Open http://localhost:3000 in browser"
Write-Host "  2. Test the application"
Write-Host "  3. Follow TESTING_EXECUTION_PLAN.md for full tests"
Write-Host ""
Write-Host "🛑 To stop: Close both terminal windows"
Write-Host ""

# Keep script running
Wait-Process -Id $backendProcess.Id, $frontendProcess.Id
