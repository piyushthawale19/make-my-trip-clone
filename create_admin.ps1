$body = @{
    firstName = "Admin"
    lastName = "User"
    email = "admin@makemytrip.com"
    password = "admin123"
    phoneNumber = "9876543210"
    role = "ADMIN"
} | ConvertTo-Json

try {
    $response = Invoke-RestMethod -Uri "https://make-my-trip-clone-1-disq.onrender.com/user/signup" -Method Post -Body $body -ContentType "application/json"
    Write-Host "Admin user created successfully!"
    Write-Host "Response: "
    $response | Format-List
} catch {
    Write-Error "Failed to create admin user. Error details:"
    Write-Error $_.Exception.Message
    if ($_.Exception.Response) {
        $reader = New-Object System.IO.StreamReader($_.Exception.Response.GetResponseStream())
        $responseBody = $reader.ReadToEnd()
        Write-Error "Server Response: $responseBody"
    }
}
