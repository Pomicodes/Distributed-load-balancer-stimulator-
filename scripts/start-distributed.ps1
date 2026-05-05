# Start multiple Load Balancer nodes on different ports
# Usage: ./start-distributed.ps1

Write-Host "Starting Distributed LB Simulator Nodes..." -ForegroundColor Cyan

# Node 1
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd backend; `$env:NODE_ID='lb-node-1'; `$env:PORT=8001; uvicorn app.main:app --port 8001"
Write-Host "Node 1 starting on port 8001..." -ForegroundColor Green

# Node 2
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd backend; `$env:NODE_ID='lb-node-2'; `$env:PORT=8002; uvicorn app.main:app --port 8002"
Write-Host "Node 2 starting on port 8002..." -ForegroundColor Green

# Node 3
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd backend; `$env:NODE_ID='lb-node-3'; `$env:PORT=8003; uvicorn app.main:app --port 8003"
Write-Host "Node 3 starting on port 8003..." -ForegroundColor Green

Write-Host "`nAll nodes initiated. Frontend should be run separately using 'npm run dev' in the frontend directory." -ForegroundColor Yellow
