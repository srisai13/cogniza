$content = Get-Content style.css -Raw
$new_top = "@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700;800;900&display=swap');`n*, *::before, *::after { box-sizing: border-box; }`n:root {"
if ($content.Contains(":root {")) {
    $idx = $content.IndexOf(":root {")
    $final = $new_top + $content.Substring($idx + ":root {".Length)
    Set-Content style.css -Value $final -Encoding UTF8
    Write-Host "CSS repaired"
}
