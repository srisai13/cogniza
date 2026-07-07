$new_top = @"
*, *::before, *::after {
    box-sizing: border-box;
}
:root {
    --primary-color: #9d00ff; /* Vibrant Purple from C logo */
    --secondary-color: #0084ff; /* Cyan-blue from C logo */
    --dark-navy: #130f26; /* Deep indigo for strong contrast */
    --text-color: #333;
    --bg-color: #ffffff;
    --accent-color: #9d00ff;
}

html, body {
    margin: 0;
    padding: 0;
    font-family: 'Inter', sans-serif;
    background-color: var(--bg-color);
    color: var(--text-color);
    position: relative;
    overflow-x: hidden;
    width: 100%;
    max-width: 100%;
}

.container {
    max-width: 1600px;
    width: 92%;
    margin: 0 auto;
    padding: 0;
}

/* Navigation */
header { 
    padding: 10px 0;
    background-color: rgba(255, 255, 255, 0.92);
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    position: sticky;
    top: 0;
    width: 100%;
    z-index: 1000;
    border-bottom: 1px solid rgba(0,0,0,0.05);
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.04);
}

.top-bar {
"@

$content = Get-Content "style.css" -Raw
$idx = $content.IndexOf(".top-bar {")
if ($idx -ge 0) {
    $rest = $content.Substring($idx + ".top-bar {".Length)
    $final = $new_top + $rest
    Set-Content "style.css" -Value $final -Encoding UTF8
    Write-Host "Repaired!"
} else {
    Write-Host "Failed to find .top-bar"
}
