import re

with open("style.css", "r", encoding="utf-8") as f:
    content = f.read()

# Fix the watermark 20vw issue
content = re.sub(r'font-size:\s*20vw;.*?\n', 'font-size: clamp(3rem, 15vw, 15rem);\n', content)
content = re.sub(r'width:\s*100vw;', 'width: 100%;', content)

# Fix elite packs 600px blob which also might have failed
content = re.sub(
    r'width:\s*600px;\s*\n\s*height:\s*600px;\s*\n\s*background:\s*radial-gradient\(circle,\s*rgba\(173,\s*216,\s*230,\s*0\.25\)\s*0%,\s*transparent\s*70%\);',
    'width: 150%;\n    height: 150%;\n    max-width: 600px;\n    max-height: 600px;\n    background: radial-gradient(circle, rgba(173, 216, 230, 0.25) 0%, transparent 70%);',
    content
)

# Ensure html, body have proper overflow wrapper
# Let's just wrap the body content in a wrapper if needed, but fixing the wide elements usually works.
# Let's ensure overflow-x: hidden is securely on html, body
content = re.sub(r'html,\s*body\s*{[^}]*}', '''html, body {
    margin: 0;
    padding: 0;
    font-family: 'Inter', sans-serif;
    background-color: var(--bg-color);
    color: var(--text-color);
    position: relative;
    overflow-x: hidden;
    width: 100%;
    max-width: 100%;
}''', content)

with open("style.css", "w", encoding="utf-8") as f:
    f.write(content)

print("CSS Fixed successfully!")
