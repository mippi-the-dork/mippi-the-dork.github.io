# Local-only, dependency-free HTTP server for the Mippi portfolio.
# Listens on 127.0.0.1, not the LAN. Supports MP3 range requests and SVGs.
$ErrorActionPreference = 'Stop'
$root = [IO.Path]::GetFullPath((Split-Path -Parent $MyInvocation.MyCommand.Path))
$rootPrefix = $root.TrimEnd([char[]]@('\','/')) + [IO.Path]::DirectorySeparatorChar
$crlf = [string][char]13 + [string][char]10

function Get-Mime([string]$path) {
    switch ([IO.Path]::GetExtension($path).ToLowerInvariant()) {
        '.html' { return 'text/html; charset=utf-8' }
        '.htm'  { return 'text/html; charset=utf-8' }
        '.css'  { return 'text/css; charset=utf-8' }
        '.js'   { return 'text/javascript; charset=utf-8' }
        '.mjs'  { return 'text/javascript; charset=utf-8' }
        '.json' { return 'application/json; charset=utf-8' }
        '.svg'  { return 'image/svg+xml' }
        '.png'  { return 'image/png' }
        '.jpg'  { return 'image/jpeg' }
        '.jpeg' { return 'image/jpeg' }
        '.webp' { return 'image/webp' }
        '.gif'  { return 'image/gif' }
        '.ico'  { return 'image/x-icon' }
        '.mp3'  { return 'audio/mpeg' }
        '.wav'  { return 'audio/wav' }
        '.ogg'  { return 'audio/ogg' }
        '.lrc'  { return 'text/plain; charset=utf-8' }
        '.txt'  { return 'text/plain; charset=utf-8' }
        '.md'   { return 'text/markdown; charset=utf-8' }
        '.woff' { return 'font/woff' }
        '.woff2' { return 'font/woff2' }
        default { return 'application/octet-stream' }
    }
}
function Send-Text($stream, [int]$code, [string]$reason, [string]$message) {
    $data = [Text.Encoding]::UTF8.GetBytes($message)
    $header = "HTTP/1.1 $code $reason" + $crlf +
        "Content-Type: text/plain; charset=utf-8" + $crlf +
        "Content-Length: $($data.Length)" + $crlf +
        "Cache-Control: no-store" + $crlf +
        "Connection: close" + $crlf + $crlf
    $bytes = [Text.Encoding]::ASCII.GetBytes($header)
    $stream.Write($bytes, 0, $bytes.Length)
    $stream.Write($data, 0, $data.Length)
}
$listener = $null
$port = $null
foreach ($candidatePort in 8765..8774) {
    $candidate = [Net.Sockets.TcpListener]::new([Net.IPAddress]::Loopback, [int]$candidatePort)
    try {
        $candidate.Start()
        $listener = $candidate
        $port = $candidatePort
        break
    } catch {
        $candidate.Stop()
    }
}
if ($null -eq $listener) {
    Write-Host 'No local test port was available (8765-8774).' -ForegroundColor Red
    exit 1
}
$url = "http://127.0.0.1:$port/"
Write-Host "Serving $root" -ForegroundColor Cyan
Write-Host "Address: $url" -ForegroundColor Green
Write-Host 'Press Ctrl+C to stop the server.' -ForegroundColor Gray
try { Start-Process $url | Out-Null } catch {
    Write-Host "Browser did not open automatically. Paste this into your browser: $url" -ForegroundColor Yellow
}
try {
    while ($true) {
        $client = $listener.AcceptTcpClient()
        try {
            $client.NoDelay = $true
            $client.ReceiveTimeout = 5000
            $client.SendTimeout = 30000
            $stream = $client.GetStream()
            $reader = [IO.StreamReader]::new($stream, [Text.Encoding]::ASCII, $false, 4096, $true)
            $first = $reader.ReadLine()
            if ([string]::IsNullOrWhiteSpace($first)) { continue }
            $request = [regex]::Match($first, '^(GET|HEAD) (\S+) HTTP/1\.[01]$')
            if (-not $request.Success) {
                Send-Text $stream 405 'Method Not Allowed' 'Only GET and HEAD are supported.'
                continue
            }
            $method = $request.Groups[1].Value
            $target = $request.Groups[2].Value
            $rangeHeader = ''
            while ($true) {
                $line = $reader.ReadLine()
                if ($null -eq $line -or $line.Length -eq 0) { break }
                if ($line.StartsWith('Range:', [StringComparison]::OrdinalIgnoreCase)) {
                    $rangeHeader = $line.Substring(6).Trim()
                }
            }
            try {
                $decoded = [Uri]::UnescapeDataString(($target -split '\?', 2)[0])
                if ($decoded -eq '/') { $decoded = '/index.html' }
                $relative = $decoded.TrimStart([char[]]@('/','\')).Replace('/', [IO.Path]::DirectorySeparatorChar)
                $filePath = [IO.Path]::GetFullPath((Join-Path $root $relative))
                if (-not $filePath.StartsWith($rootPrefix, [StringComparison]::OrdinalIgnoreCase)) {
                    Send-Text $stream 403 'Forbidden' 'Outside site root.'
                    continue
                }
            } catch {
                Send-Text $stream 400 'Bad Request' 'Invalid file path.'
                continue
            }
            if (-not [IO.File]::Exists($filePath)) {
                Send-Text $stream 404 'Not Found' 'File not found.'
                continue
            }
            $file = [IO.File]::OpenRead($filePath)
            try {
                [long]$total = $file.Length
                [long]$begin = 0
                [long]$end = $total - 1
                $partial = $false
                if ($rangeHeader -match '^bytes=(\d*)-(\d*)$' -and $total -gt 0) {
                    $left = $Matches[1]
                    $right = $Matches[2]
                    if ($left.Length -gt 0) {
                        $begin = [long]$left
                        if ($right.Length -gt 0) { $end = [Math]::Min([long]$right, $end) }
                    } elseif ($right.Length -gt 0) {
                        $begin = [Math]::Max(0, $total - [long]$right)
                    }
                    if ($begin -gt $end -or $begin -ge $total) {
                        Send-Text $stream 416 'Range Not Satisfiable' 'Invalid byte range.'
                        continue
                    }
                    $partial = $true
                }
                [long]$length = if ($total -eq 0) { 0 } else { $end - $begin + 1 }
                $status = if ($partial) { '206 Partial Content' } else { '200 OK' }
                $header = "HTTP/1.1 $status" + $crlf +
                    "Content-Type: $(Get-Mime $filePath)" + $crlf +
                    "Content-Length: $length" + $crlf +
                    "Accept-Ranges: bytes" + $crlf +
                    "Cache-Control: no-store" + $crlf +
                    "X-Content-Type-Options: nosniff" + $crlf +
                    "Connection: close" + $crlf
                if ($partial) {
                    $header += "Content-Range: bytes $begin-$end/$total" + $crlf
                }
                $header += $crlf
                $headerBytes = [Text.Encoding]::ASCII.GetBytes($header)
                $stream.Write($headerBytes, 0, $headerBytes.Length)
                if ($method -eq 'HEAD' -or $length -eq 0) { continue }
                $file.Position = $begin
                $buffer = [byte[]]::new(65536)
                [long]$remaining = $length
                while ($remaining -gt 0) {
                    $read = $file.Read($buffer, 0, [int][Math]::Min($buffer.Length, $remaining))
                    if ($read -le 0) { break }
                    $stream.Write($buffer, 0, $read)
                    $remaining -= $read
                }
            } finally {
                $file.Dispose()
            }
        } catch [IO.IOException] {
            # Client closed its connection before a response completed.
        } catch {
            Write-Host "Request error: $($_.Exception.Message)" -ForegroundColor DarkYellow
        } finally {
            $client.Dispose()
        }
    }
} finally {
    if ($listener) { $listener.Stop() }
}
