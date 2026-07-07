$files = Get-ChildItem -Filter *.html
$oldStr = "<h1>COGNIZA</h1>"
$newStr = "<h1 style=`"font-family: 'Montserrat', sans-serif; letter-spacing: 12px; font-weight: 800; display: flex; align-items: center;`">COGNIZ<span style=`"position: relative; display: inline-flex; align-items: center; justify-content: center; margin-left: -5px;`"><svg viewBox=`"0 0 100 100`" style=`"height: 0.75em; width: 0.75em; overflow: visible; transform: translateY(-2px);`"><path d=`"M 0,100 L 50,0 L 100,100`" fill=`"none`" stroke=`"currentColor`" stroke-width=`"16`" stroke-linecap=`"butt`" stroke-linejoin=`"miter`" stroke-miterlimit=`"4`"/><circle cx=`"50`" cy=`"70`" r=`"14`" fill=`"var(--primary-color)`"/></svg></span></h1>"

foreach ($file in $files) {
    $content = Get-Content $file.FullName -Raw
    if ($content.Contains($oldStr)) {
        $content = $content.Replace($oldStr, $newStr)
        Set-Content $file.FullName -Value $content -Encoding UTF8
        Write-Host "Updated $($file.Name)"
    }
}
