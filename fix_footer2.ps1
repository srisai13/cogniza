# Fix footer course links that use href="#" placeholder

$files = Get-ChildItem *.html

foreach ($file in $files) {
    $content = Get-Content $file.FullName -Raw
    $changed = $false

    # Fix any remaining href="#" on these course names
    if ($content -match 'href="#"[^>]*>Machine Learning With Python') {
        $content = $content -replace 'href="#"([^>]*)>Machine Learning With Python', 'href="machine-learning.html"$1>Machine Learning With Python'
        $changed = $true
    }
    if ($content -match 'href="#"[^>]*>Web Development') {
        $content = $content -replace 'href="#"([^>]*)>Web Development', 'href="full-stack-web-development.html"$1>Web Development'
        $changed = $true
    }
    if ($content -match 'href="#"[^>]*>Artificial Intelligence') {
        $content = $content -replace 'href="#"([^>]*)>Artificial Intelligence', 'href="artificial-intelligence-ai-machine-learning-ml.html"$1>Artificial Intelligence'
        $changed = $true
    }
    if ($content -match 'href="#"[^>]*>Data Science') {
        $content = $content -replace 'href="#"([^>]*)>Data Science', 'href="data-science.html"$1>Data Science'
        $changed = $true
    }

    if ($changed) {
        Set-Content $file.FullName -Value $content -Encoding UTF8
        Write-Host "Fixed #href footer links in $($file.Name)"
    }
}

Write-Host "Done!"
