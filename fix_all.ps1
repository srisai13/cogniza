# Fix all pages: add missing hamburger button, fix footer course links

$hamburgerBtn = @'
            <button class="mobile-menu-btn" aria-label="Toggle navigation">
                <i class="fas fa-bars"></i>
            </button>
'@

# Pages missing the hamburger button (no mobile-menu-btn in header)
$missingHamburger = @(
    "about.html",
    "ambassador.html",
    "career-pro-pack.html",
    "careers.html",
    "flexi-pro-pack.html",
    "offline-programs.html",
    "privacy-policy.html",
    "projects.html",
    "register.html",
    "tech-pro-pack.html",
    "terms-and-conditions.html",
    "uiux-design.html"
)

# Correct footer courses block with direct links
$oldFooterCourses = @'
                    <li><a href="index.html#programs">Machine Learning With Python</a></li>
                    <li><a href="index.html#programs">Web Development</a></li>
                    <li><a href="index.html#programs">Artificial Intelligence</a></li>
                    <li><a href="index.html#programs">Data Science</a></li>
'@

$newFooterCourses = @'
                    <li><a href="machine-learning.html">Machine Learning With Python</a></li>
                    <li><a href="full-stack-web-development.html">Web Development</a></li>
                    <li><a href="artificial-intelligence-ai-machine-learning-ml.html">Artificial Intelligence</a></li>
                    <li><a href="data-science.html">Data Science</a></li>
'@

# Also handle 4-space indent variant used in some pages
$oldFooterCourses2 = @'
                <li><a href="index.html#programs">Machine Learning With Python</a></li>
                <li><a href="index.html#programs">Web Development</a></li>
                <li><a href="index.html#programs">Artificial Intelligence</a></li>
                <li><a href="index.html#programs">Data Science</a></li>
'@

$newFooterCourses2 = @'
                <li><a href="machine-learning.html">Machine Learning With Python</a></li>
                <li><a href="full-stack-web-development.html">Web Development</a></li>
                <li><a href="artificial-intelligence-ai-machine-learning-ml.html">Artificial Intelligence</a></li>
                <li><a href="data-science.html">Data Science</a></li>
'@

$files = Get-ChildItem *.html

foreach ($file in $files) {
    $content = Get-Content $file.FullName -Raw
    $changed = $false

    # 1. Add hamburger button where missing
    if ($missingHamburger -contains $file.Name) {
        # Insert before closing </div> of .top-bar (which comes right before </header>)
        # Pattern: find </div> immediately before </header>
        if (-not ($content -match "mobile-menu-btn")) {
            # Replace the closing div that ends the top-bar with hamburger + closing div
            $content = $content -replace '(\s*</div>\s*\r?\n\s*</header>)', "`n$($hamburgerBtn)`$1"
            $changed = $true
            Write-Host "Added hamburger to $($file.Name)"
        }
    }

    # 2. Fix footer course links (try both indent styles)
    if ($content -match "index\.html#programs") {
        $content = $content.Replace($oldFooterCourses, $newFooterCourses)
        $content = $content.Replace($oldFooterCourses2, $newFooterCourses2)
        # Also catch any other variants using generic Replace
        $content = $content -replace 'href="index\.html#programs">Machine Learning With Python', 'href="machine-learning.html">Machine Learning With Python'
        $content = $content -replace 'href="index\.html#programs">Web Development', 'href="full-stack-web-development.html">Web Development'
        $content = $content -replace 'href="index\.html#programs">Artificial Intelligence', 'href="artificial-intelligence-ai-machine-learning-ml.html">Artificial Intelligence'
        $content = $content -replace 'href="index\.html#programs">Data Science', 'href="data-science.html">Data Science'
        $changed = $true
        Write-Host "Fixed footer links in $($file.Name)"
    }

    if ($changed) {
        Set-Content $file.FullName -Value $content -Encoding UTF8
    }
}

Write-Host "`nAll done!"
