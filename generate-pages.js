const fs = require('fs');
const html = fs.readFileSync('index.html', 'utf8');

const headerMatch = html.match(/(^.*?<\/header>)/s);
const footerMatch = html.match(/(<!-- Footer Section -->.*)/s);

if (!headerMatch || !footerMatch) {
    console.error('Could not extract header or footer.');
    process.exit(1);
}
let header = headerMatch[1];
header = header.replace('</head>', '    <link rel="stylesheet" href="course-layout.css">\n</head>');
const footer = footerMatch[1];

// Read programs-data.js
const programsDataStr = fs.readFileSync('programs-data.js', 'utf8');
// Evaluate the programsData
let programsData;
eval(programsDataStr + '; programsData = programsData;');

Object.keys(programsData).forEach(slug => {
    const program = programsData[slug];
    
    // Tailor the syllabus dynamically
    let s1 = 'Introduction to Fundamentals';
    let s2 = 'Advanced Core Concepts';
    let s3 = 'Tools & Frameworks';
    let role1 = 'Business Analyst';
    let role2 = 'Data Analyst';
    let role3 = 'Systems Analyst';
    let icon = 'fas fa-laptop-code';

    if (program.title.toLowerCase().includes('data') || program.title.toLowerCase().includes('machine learning')) {
        s1 = 'Data Structures & Algorithms';
        s2 = 'Statistical Modeling & AI';
        s3 = 'Data Visualization Tools';
        role1 = 'Data Scientist'; role2 = 'ML Engineer'; role3 = 'Data Analyst';
        icon = 'fas fa-chart-network';
    } else if (program.title.toLowerCase().includes('design')) {
        s1 = 'Design Principles & Theory';
        s2 = 'UI/UX Prototyping';
        s3 = 'Industry Design Tools (Figma/Adobe)';
        role1 = 'UI/UX Designer'; role2 = 'Product Designer'; role3 = 'Graphic Designer';
        icon = 'fas fa-paint-brush';
    } else if (program.title.toLowerCase().includes('development') || program.title.toLowerCase().includes('python') || program.title.toLowerCase().includes('java')) {
        s1 = 'Programming Fundamentals';
        s2 = 'Backend Architecture & Databases';
        s3 = 'Frontend & APIs';
        role1 = 'Software Engineer'; role2 = 'Full Stack Developer'; role3 = 'Backend Engineer';
        icon = 'fas fa-code';
    }
    
    const bodyContent = `
<div class="course-page-wrapper">
    <!-- 1. Hero Section -->
    <div class="course-hero">
        <div class="course-hero-inner">
            <h1 class="course-title">Become a Professional <span style="color: #3b82f6;">${program.title}</span> Expert</h1>
            <p class="course-subtitle">${program.description}</p>
            <div class="course-highlights">
                <div class="highlight-pill"><i class="fas fa-check-circle"></i> 25+ Real-World Projects</div>
                <div class="highlight-pill"><i class="fas fa-check-circle"></i> 40+ Hours Live Classes</div>
                <div class="highlight-pill"><i class="fas fa-check-circle"></i> 1:1 Mentorship</div>
                <div class="highlight-pill"><i class="fas fa-check-circle"></i> Capstone Project</div>
                <div class="highlight-pill"><i class="fas fa-check-circle"></i> Interview Prep</div>
            </div>
            <div style="margin-top: 40px; display: flex; justify-content: center; gap: 20px;">
                <a href="register.html" style="background: #3b82f6; color: white; padding: 15px 35px; border-radius: 12px; font-weight: bold; font-size: 1.1rem; text-decoration: none;">Enroll Now</a>
                <a href="#curriculum" style="background: rgba(255,255,255,0.1); border: 1px solid rgba(255,255,255,0.3); color: white; padding: 15px 35px; border-radius: 12px; font-weight: bold; font-size: 1.1rem; text-decoration: none;">View Curriculum</a>
            </div>
        </div>
    </div>

    <!-- 2. Rising Demand Stats -->
    <div class="course-section">
        <div class="section-inner">
            <h2 class="section-title">Rising Demand for ${program.title}</h2>
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
                    <div class="skill-icon"><i class="${icon}"></i></div>
                    <h4>${s1}</h4>
                </div>
                <div class="skill-card">
                    <div class="skill-icon"><i class="fas fa-cogs"></i></div>
                    <h4>${s2}</h4>
                </div>
                <div class="skill-card">
                    <div class="skill-icon"><i class="fas fa-wrench"></i></div>
                    <h4>${s3}</h4>
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
                    <div class="module-header">Module 1: ${s1} <i class="fas fa-chevron-down"></i></div>
                    <div class="module-content">
                        <ul>
                            <li>Understanding the core concepts and principles.</li>
                            <li>Setting up your development environment.</li>
                            <li>Basic operations and initial projects.</li>
                        </ul>
                    </div>
                </div>
                <div class="module-item">
                    <div class="module-header">Module 2: ${s2} <i class="fas fa-chevron-down"></i></div>
                    <div class="module-content" style="display:none;">
                        <ul>
                            <li>Deep dive into advanced topics.</li>
                            <li>Performance optimization and best practices.</li>
                        </ul>
                    </div>
                </div>
                <div class="module-item">
                    <div class="module-header">Module 3: ${s3} <i class="fas fa-chevron-down"></i></div>
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
                    <div class="role-title">${role1}</div>
                    <div class="role-salary">₹6 LPA - ₹15 LPA</div>
                </div>
                <div class="role-card">
                    <div class="role-title">${role2}</div>
                    <div class="role-salary">₹5 LPA - ₹12 LPA</div>
                </div>
                <div class="role-card">
                    <div class="role-title">${role3}</div>
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
\`;
    
    fs.writeFileSync(slug + '.html', header + bodyContent + footer);
});
console.log('Generated 52 files successfully.');
