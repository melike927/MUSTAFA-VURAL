<#
Demo script for Windows (PowerShell).
Usage: run from project root with administrator privileges if needed.
#>

Write-Host "Starting demo: building and running docker-compose..."
docker-compose up -d --build

Write-Host "Waiting for API to become healthy (up to 60s)..."
$healthUrl = 'http://localhost:3000/api/health'
$max = 30
for ($i=0; $i -lt $max; $i++) {
  try {
    $r = Invoke-RestMethod -Uri $healthUrl -Method GET -TimeoutSec 5
    if ($r.ok) { Write-Host "API healthy."; break }
  } catch { Start-Sleep -Seconds 2 }
}

Write-Host "Sending sample appointment..."
$body = @{ adSoyAd='Demo Ogrenci'; adSoyad='Demo Ogrenci'; telefon='+900000000000'; email='demo@example.com'; tedavi='Kontrol'; tarih='2026-06-15'; saat='10:00'; not='Ders demo' } | ConvertTo-Json
try {
  $resp = Invoke-RestMethod -Method POST -Uri 'http://localhost:3000/api/randevu' -ContentType 'application/json' -Body $body
  Write-Host "Response:" ($resp | ConvertTo-Json)
} catch {
  Write-Host "POST failed:" $_.Exception.Message
}

Write-Host "Demo finished. Open DBeaver and connect to localhost:3306 (mv_clinic) to verify the record."
