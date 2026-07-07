$html = Get-Content -Raw -Path "c:\Users\DELL\OneDrive\Desktop\cogniza\index.html"

# Extract header and footer
if ($html -match '(?s)(^.*?</header>)') {
    $header = $matches[1]
} else {
    Write-Host "Could not extract header."
    exit
}

if ($html -match '(?s)(<!-- Footer Section -->.*)') {
    $footer = $matches[1]
} else {
    Write-Host "Could not extract footer."
    exit
}

$courses = @(
    "AI (Generative & Agentic)", "Android App Development", "Artificial Intelligence (AI) & Machine Learning (ML)",
    "Augmented Reality (AR) & Virtual Reality (ARVR)", "AutoCAD", "AWS", "Basic Graphic Design",
    "Blockchain Technology", "Business Analysis", "Business Analytics", "Car Design",
    "Clinical Data Management", "Clinical SAS", "Clinical Trials Research", "Cloud Computing",
    "Cyber Security & Ethical Hacking", "Data Analysis", "Data Analytics", "Data Science", "DevOps",
    "Digital Marketing", "DSA with Python", "Embedded Systems", "Finance", "Front End Web Development",
    "Full Stack Web Development", "Graphic Designing", "Human Resources (HR) Management",
    "Hybrid & Electric Vehicle Technology", "Internet of Things (IoT)", "Investment Banking",
    "Machine Learning", "Medical Coding", "Microbiology", "Microsoft Azure Cloud Computing",
    "Nanotechnology / Nanoscience & Nanotechnology", "Petroleum Engineering", "Pharmacovigilance",
    "Product & Project Management", "Programming in Java", "Programming in Python", "Psychology",
    "Robotics", "Salesforce", "SAP FICO", "ServiceNow", "Startup & Entrepreneurship", "Stock Market",
    "Supply Chain Management", "UI/UX Design", "VLSI Design", "Web Development"
)

foreach ($course in $courses) {
    $slug = $course.ToLower() -replace '[^a-z0-9]+', '-' -replace '^-|-$', ''
    $title = $course
    $category = "Tech & Professional"
    $description = "Master the core concepts of $title with our expert-led modules. This comprehensive program is designed to take you from a beginner to an industry-ready professional. Learn through hands-on projects, interactive sessions, and real-world case studies."
    $duration = "3-4 Months"
    $imgName = $title -replace '[\/\s]', '_'
    
    # Tailor syllabus
    $s1 = 'Introduction to Fundamentals'
    $s2 = 'Advanced Core Concepts'
    $s3 = 'Tools & Frameworks'
    $s4 = 'Real-world Application & Case Studies'
    $titleLower = $title.ToLower()
    if ($titleLower.Contains('data') -or $titleLower.Contains('machine learning')) {
        $s1 = 'Data Structures & Algorithms'
        $s2 = 'Statistical Modeling & Probability'
        $s3 = 'Data Visualization & Reporting'
        $s4 = 'Predictive Analytics & Machine Learning Models'
    } elseif ($titleLower.Contains('design')) {
        $s1 = 'Design Principles & Theory'
        $s2 = 'UI/UX Prototyping & Wireframing'
        $s3 = 'Industry Design Tools (Figma/Adobe)'
        $s4 = 'User Research & Journey Mapping'
    } elseif ($titleLower.Contains('development') -or $titleLower.Contains('python') -or $titleLower.Contains('java')) {
        $s1 = 'Programming Fundamentals & Syntax'
        $s2 = 'Object-Oriented Programming (OOP)'
        $s3 = 'Backend Architecture & Databases'
        $s4 = 'API Development & Integration'
    }
    
    $syllabusHtml = @"
        <div style="display: flex; gap: 12px; margin-bottom: 10px; background: white; padding: 15px; border-radius: 12px; border: 1px solid #eaeaea; align-items: center;">
            <div style="background: #e5f0ff; color: #0052cc; width: 35px; height: 35px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: bold; flex-shrink: 0; font-size: 0.95rem;">01</div>
            <h4 style="margin: 0; font-size: 1.05rem; color: #130f26;">$s1</h4>
        </div>
        <div style="display: flex; gap: 12px; margin-bottom: 10px; background: white; padding: 15px; border-radius: 12px; border: 1px solid #eaeaea; align-items: center;">
            <div style="background: #e5f0ff; color: #0052cc; width: 35px; height: 35px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: bold; flex-shrink: 0; font-size: 0.95rem;">02</div>
            <h4 style="margin: 0; font-size: 1.05rem; color: #130f26;">$s2</h4>
        </div>
        <div style="display: flex; gap: 12px; margin-bottom: 10px; background: white; padding: 15px; border-radius: 12px; border: 1px solid #eaeaea; align-items: center;">
            <div style="background: #e5f0ff; color: #0052cc; width: 35px; height: 35px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: bold; flex-shrink: 0; font-size: 0.95rem;">03</div>
            <h4 style="margin: 0; font-size: 1.05rem; color: #130f26;">$s3</h4>
        </div>
        <div style="display: flex; gap: 12px; margin-bottom: 10px; background: white; padding: 15px; border-radius: 12px; border: 1px solid #eaeaea; align-items: center;">
            <div style="background: #e5f0ff; color: #0052cc; width: 35px; height: 35px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: bold; flex-shrink: 0; font-size: 0.95rem;">04</div>
            <h4 style="margin: 0; font-size: 1.05rem; color: #130f26;">$s4</h4>
        </div>
        <div style="display: flex; gap: 12px; margin-bottom: 10px; background: white; padding: 15px; border-radius: 12px; border: 1px solid #eaeaea; align-items: center;">
            <div style="background: #e5f0ff; color: #0052cc; width: 35px; height: 35px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: bold; flex-shrink: 0; font-size: 0.95rem;">05</div>
            <h4 style="margin: 0; font-size: 1.05rem; color: #130f26;">Capstone Project & Certification</h4>
        </div>
        <div style="display: flex; gap: 12px; margin-bottom: 15px; background: white; padding: 15px; border-radius: 12px; border: 1px solid #eaeaea; align-items: center;">
            <div style="background: #e5f0ff; color: #0052cc; width: 35px; height: 35px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: bold; flex-shrink: 0; font-size: 0.95rem;">06</div>
            <h4 style="margin: 0; font-size: 1.05rem; color: #130f26;">Interview Preparation & Placement Assistance</h4>
        </div>
"@

    # Inject the layout CSS into the header if it's not already there
    $localHeader = $header -replace '</head>', "    <link rel=`"stylesheet`" href=`"course-layout.css`">`n</head>"

    # Dynamic variables based on title
    $role1 = "Business Analyst"; $role2 = "Data Analyst"; $role3 = "Systems Analyst"; $icon = "fas fa-laptop-code"
    
    if ($title -match "(?i)data" -or $title -match "(?i)machine learning") {
        $role1 = "Data Scientist"; $role2 = "ML Engineer"; $role3 = "Data Analyst"; $icon = "fas fa-chart-network"
    } elseif ($title -match "(?i)design") {
        $role1 = "UI/UX Designer"; $role2 = "Product Designer"; $role3 = "Graphic Designer"; $icon = "fas fa-paint-brush"
    } elseif ($title -match "(?i)development" -or $title -match "(?i)python" -or $title -match "(?i)java") {
        $role1 = "Software Engineer"; $role2 = "Full Stack Developer"; $role3 = "Backend Engineer"; $icon = "fas fa-code"
    }

    $bodyContent = @"
<div class="course-page-wrapper">
    <!-- 1. Hero Section -->
    <div class="course-hero">
        <div class="course-hero-inner">
            <div class="course-hero-content">
                <h1 class="course-title">Become a Professional <span style="color: #3b82f6;">$title</span> Expert</h1>
                <p class="course-subtitle">$description</p>
                <div class="course-highlights">
                    <div class="highlight-pill"><i class="fas fa-check-circle"></i> 25+ Real-World Projects</div>
                    <div class="highlight-pill"><i class="fas fa-check-circle"></i> 40+ Hours Live Classes</div>
                    <div class="highlight-pill"><i class="fas fa-check-circle"></i> 1:1 Mentorship</div>
                    <div class="highlight-pill"><i class="fas fa-check-circle"></i> Capstone Project</div>
                    <div class="highlight-pill"><i class="fas fa-check-circle"></i> Interview Prep</div>
                </div>
                <div style="margin-top: 40px; display: flex; gap: 20px;">
                    <a href="register.html" style="background: #3b82f6; color: white; padding: 15px 35px; border-radius: 12px; font-weight: bold; font-size: 1.1rem; text-decoration: none;">Enroll Now</a>
                    <a href="#curriculum" style="background: rgba(255,255,255,0.1); border: 1px solid rgba(255,255,255,0.3); color: white; padding: 15px 35px; border-radius: 12px; font-weight: bold; font-size: 1.1rem; text-decoration: none;">View Curriculum</a>
                </div>
            </div>
            <div class="course-hero-image">
                <img src="images/programs/$($imgName).png" alt="$title" onerror="this.src='https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=80'">
            </div>
        </div>
    </div>

    <!-- 2. Rising Demand Stats -->
    <div class="course-section">
        <div class="section-inner">
            <h2 class="section-title">Rising Demand for $title</h2>
            <p class="section-subtitle">The industry is growing rapidly. Secure your future in this high-demand field.</p>
            <div class="stats-grid">
                <div class="stat-card">
                    <h3>95%</h3>
                    <p>Companies actively investing in this domain</p>
                </div>
                <div class="stat-card">
                    <h3>20k+</h3>
                    <p>Projected jobs in the next 3 years</p>
                </div>
                <div class="stat-card">
                    <h3>85k+</h3>
                    <p>Average starting salary worldwide</p>
                </div>
            </div>
        </div>
    </div>

    <!-- 3. Skills Section -->
    <div class="course-section bg-gray">
        <div class="section-inner">
            <h2 class="section-title">Get to Know These Skills</h2>
            <p class="section-subtitle">Master the core competencies required by top employers.</p>
            <div class="skills-grid">
                <div class="skill-card">
                    <div class="skill-icon"><i class="$icon"></i></div>
                    <h4>$s1</h4>
                </div>
                <div class="skill-card">
                    <div class="skill-icon"><i class="fas fa-cogs"></i></div>
                    <h4>$s2</h4>
                </div>
                <div class="skill-card">
                    <div class="skill-icon"><i class="fas fa-wrench"></i></div>
                    <h4>$s3</h4>
                </div>
                <div class="skill-card">
                    <div class="skill-icon"><i class="fas fa-project-diagram"></i></div>
                    <h4>Real-World Implementations</h4>
                </div>
                <div class="skill-card">
                    <div class="skill-icon"><i class="fas fa-chart-line"></i></div>
                    <h4>Industry Best Practices</h4>
                </div>
                <div class="skill-card">
                    <div class="skill-icon"><i class="fas fa-users"></i></div>
                    <h4>Agile & Team Collaboration</h4>
                </div>
            </div>
        </div>
    </div>

    <!-- 4. Course Modules (Curriculum) -->
    <div id="curriculum" class="course-section">
        <div class="section-inner">
            <h2 class="section-title">Explore Our Course Modules</h2>
            <p class="section-subtitle">A step-by-step learning path from beginner to expert.</p>
            <div class="modules-container">
                <div class="module-item">
                    <div class="module-header">Module 1: $s1 <i class="fas fa-chevron-down"></i></div>
                    <div class="module-content">
                        <ul>
                            <li>Understanding the core concepts and principles.</li>
                            <li>Setting up your development environment.</li>
                            <li>Basic operations and initial projects.</li>
                        </ul>
                    </div>
                </div>
                <div class="module-item">
                    <div class="module-header">Module 2: $s2 <i class="fas fa-chevron-down"></i></div>
                    <div class="module-content" style="display:none;">
                        <ul>
                            <li>Deep dive into advanced topics.</li>
                            <li>Performance optimization and best practices.</li>
                        </ul>
                    </div>
                </div>
                <div class="module-item">
                    <div class="module-header">Module 3: $s3 <i class="fas fa-chevron-down"></i></div>
                    <div class="module-content" style="display:none;">
                        <ul>
                            <li>Mastering industry-standard tools.</li>
                            <li>Integration and real-world deployment.</li>
                        </ul>
                    </div>
                </div>
                <div class="module-item">
                    <div class="module-header">Module 4: Advanced Techniques & Optimization <i class="fas fa-chevron-down"></i></div>
                    <div class="module-content" style="display:none;">
                        <ul>
                            <li>Refactoring and improving performance.</li>
                            <li>Advanced design patterns and scaling.</li>
                        </ul>
                    </div>
                </div>
                <div class="module-item">
                    <div class="module-header">Module 5: Real-world Case Studies <i class="fas fa-chevron-down"></i></div>
                    <div class="module-content" style="display:none;">
                        <ul>
                            <li>Analyzing successful industry projects.</li>
                            <li>Extracting core insights and strategies.</li>
                        </ul>
                    </div>
                </div>
                <div class="module-item">
                    <div class="module-header">Module 6: Specialized Tools & Extensions <i class="fas fa-chevron-down"></i></div>
                    <div class="module-content" style="display:none;">
                        <ul>
                            <li>Exploring third-party integrations.</li>
                            <li>Automating workflows for productivity.</li>
                        </ul>
                    </div>
                </div>
                <div class="module-item">
                    <div class="module-header">Module 7: Architecture & System Design <i class="fas fa-chevron-down"></i></div>
                    <div class="module-content" style="display:none;">
                        <ul>
                            <li>Building robust and scalable foundations.</li>
                            <li>Understanding high-level system components.</li>
                        </ul>
                    </div>
                </div>
                <div class="module-item">
                    <div class="module-header">Module 8: Performance Tuning & Security <i class="fas fa-chevron-down"></i></div>
                    <div class="module-content" style="display:none;">
                        <ul>
                            <li>Identifying bottlenecks and vulnerabilities.</li>
                            <li>Implementing best security practices.</li>
                        </ul>
                    </div>
                </div>
                <div class="module-item">
                    <div class="module-header">Module 9: Agile Methodologies & Team Collaboration <i class="fas fa-chevron-down"></i></div>
                    <div class="module-content" style="display:none;">
                        <ul>
                            <li>Working effectively in cross-functional teams.</li>
                            <li>Project tracking, version control, and sprints.</li>
                        </ul>
                    </div>
                </div>
                <div class="module-item">
                    <div class="module-header">Module 10: Industry Capstone <i class="fas fa-chevron-down"></i></div>
                    <div class="module-content" style="display:none;">
                        <ul>
                            <li>Building a massive portfolio project.</li>
                            <li>Code review and mentor feedback.</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- 5. Capstone Projects -->
    <div class="course-section bg-gray">
        <div class="section-inner">
            <h2 class="section-title">Industry Capstone Projects</h2>
            <p class="section-subtitle">Build Real World Industry Projects to showcase on your resume.</p>
            <div class="projects-grid">
                <div class="project-card">
                    <h3>Enterprise Level System</h3>
                    <div class="project-steps">
                        <div class="project-step">
                            <div class="step-number">1</div>
                            <div class="step-text"><strong>Requirement Analysis:</strong> Gather data and scope out the system architecture.</div>
                        </div>
                        <div class="project-step">
                            <div class="step-number">2</div>
                            <div class="step-text"><strong>Development:</strong> Build the core features using modern frameworks.</div>
                        </div>
                        <div class="project-step">
                            <div class="step-number">3</div>
                            <div class="step-text"><strong>Testing & Deployment:</strong> Ensure quality and push to a live environment.</div>
                        </div>
                    </div>
                </div>
                <div class="project-card">
                    <h3>Client Facing Application</h3>
                    <div class="project-steps">
                        <div class="project-step">
                            <div class="step-number">1</div>
                            <div class="step-text"><strong>UI/UX Design:</strong> Create wireframes and interactive prototypes.</div>
                        </div>
                        <div class="project-step">
                            <div class="step-number">2</div>
                            <div class="step-text"><strong>Implementation:</strong> Translate designs into functional code.</div>
                        </div>
                        <div class="project-step">
                            <div class="step-number">3</div>
                            <div class="step-text"><strong>Optimization:</strong> Refine performance and user accessibility.</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- 6. Future Roles -->
    <div class="course-section">
        <div class="section-inner">
            <h2 class="section-title">Explore Your Future Roles</h2>
            <p class="section-subtitle">Unlock lucrative career opportunities upon graduation.</p>
            <div class="roles-grid">
                <div class="role-card">
                    <div class="role-title">$role1</div>
                    <div class="role-salary">₹6 LPA - ₹15 LPA</div>
                </div>
                <div class="role-card">
                    <div class="role-title">$role2</div>
                    <div class="role-salary">₹5 LPA - ₹12 LPA</div>
                </div>
                <div class="role-card">
                    <div class="role-title">$role3</div>
                    <div class="role-salary">₹4 LPA - ₹10 LPA</div>
                </div>
            </div>
        </div>
    </div>

    <!-- 7. Pricing Plans -->
    <div id="pricing" class="course-section bg-gray">
        <div class="section-inner">
            <h2 class="section-title">Unlock Premium Learning</h2>
            <p class="section-subtitle">Choose the plan that best fits your career goals.</p>
            <div class="pricing-grid">
                <!-- Plan 1 -->
                <div class="price-card">
                    <div class="price-title">Self-Paced</div>
                    <div class="price-amount">₹5,999</div>
                    <ul class="price-features">
                        <li><i class="fas fa-check-circle"></i> Lifetime Recorded Sessions</li>
                        <li><i class="fas fa-check-circle"></i> Assignments & Quizzes</li>
                        <li><i class="fas fa-check-circle"></i> Industry Projects</li>
                        <li><i class="fas fa-check-circle"></i> LMS Access</li>
                    </ul>
                    <a href="register.html" class="btn-price">Get Started</a>
                </div>
                <!-- Plan 2 -->
                <div class="price-card popular">
                    <div class="popular-badge">Most Popular</div>
                    <div class="price-title">Mentor Led</div>
                    <div class="price-amount">₹8,999</div>
                    <ul class="price-features">
                        <li><i class="fas fa-check-circle"></i> Everything in Self-Paced</li>
                        <li><i class="fas fa-check-circle"></i> Live Mentorship Sessions</li>
                        <li><i class="fas fa-check-circle"></i> 1:1 Doubt Clearing</li>
                        <li><i class="fas fa-check-circle"></i> Mentor Guidance</li>
                    </ul>
                    <a href="register.html" class="btn-price">Get Started</a>
                </div>
                <!-- Plan 3 -->
                <div class="price-card">
                    <div class="price-title">Professional</div>
                    <div class="price-amount">₹14,999</div>
                    <ul class="price-features">
                        <li><i class="fas fa-check-circle"></i> Everything in Mentor Led</li>
                        <li><i class="fas fa-check-circle"></i> Placement Support</li>
                        <li><i class="fas fa-check-circle"></i> Interview Preparation</li>
                        <li><i class="fas fa-check-circle"></i> Portfolio Review</li>
                    </ul>
                    <a href="register.html" class="btn-price">Get Started</a>
                </div>
            </div>
        </div>
    </div>
</div>

<script>
    // Add simple accordion functionality for the modules
    document.addEventListener("DOMContentLoaded", function() {
        const headers = document.querySelectorAll('.module-header');
        headers.forEach(header => {
            header.addEventListener('click', function() {
                const content = this.nextElementSibling;
                const icon = this.querySelector('i');
                if (content.style.display === "none") {
                    content.style.display = "block";
                    icon.classList.remove('fa-chevron-down');
                    icon.classList.add('fa-chevron-up');
                } else {
                    content.style.display = "none";
                    icon.classList.remove('fa-chevron-up');
                    icon.classList.add('fa-chevron-down');
                }
            });
        });
    });
</script>
"@

    $fullHtml = $localHeader + $bodyContent + $footer
    Set-Content -Path "c:\Users\DELL\OneDrive\Desktop\cogniza\$slug.html" -Value $fullHtml
}
Write-Host "Regenerated 52 pages with clean enriched content successfully."
