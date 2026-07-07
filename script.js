// Interactions can be added here
document.addEventListener("DOMContentLoaded", () => {
    const courses = [
        "AI (Generative & Agentic)",
        "Android App Development",
        "Artificial Intelligence (AI) & Machine Learning (ML)",
        "Augmented Reality (AR) & Virtual Reality (AR/VR)",
        "AutoCAD",
        "AWS",
        "Basic Graphic Design",
        "Blockchain Technology",
        "Business Analysis",
        "Business Analytics",
        "Car Design",
        "Clinical Data Management",
        "Clinical SAS",
        "Clinical Trials & Research",
        "Cloud Computing",
        "Cyber Security & Ethical Hacking",
        "DSA with Python",
        "Data Analysis",
        "Data Analytics",
        "Data Science",
        "DevOps",
        "Digital Marketing",
        "Embedded Systems",
        "Finance",
        "Front End Web Development",
        "Full Stack Web Development",
        "Graphic Designing",
        "Human Resources (HR) & Management",
        "Hybrid & Electric Vehicle Technology",
        "Internet of Things (IoT)",
        "Investment Banking",
        "Machine Learning",
        "Medical Coding",
        "Microbiology",
        "Microsoft Azure Cloud Computing",
        "Nanotechnology / Nanoscience & Nanotechnology",
        "Petroleum Engineering",
        "Pharmacovigilance",
        "Product & Project Management",
        "Programming in Java",
        "Programming in Python",
        "Psychology",
        "Robotics",
        "SAP FICO",
        "Salesforce",
        "ServiceNow",
        "Startup & Entrepreneurship",
        "Stock Market",
        "Supply Chain Management",
        "UI/UX Design",
        "VLSI Design",
        "Web Development"
    ];

    const typingElement = document.getElementById("typing-text");

    const courseSelect = document.getElementById("courseSelect");
    if (courseSelect) {
        courses.forEach(course => {
            const option = document.createElement("option");
            option.value = course;
            option.textContent = course;
            courseSelect.appendChild(option);
        });
    }

    if (typingElement) {
        let courseIndex = 0;
        let charIndex = 0;
        let isDeleting = false;

        function typeEffect() {
            const currentCourse = courses[courseIndex];
            
            if (isDeleting) {
                typingElement.textContent = currentCourse.substring(0, charIndex - 1);
                charIndex--;
            } else {
                typingElement.textContent = currentCourse.substring(0, charIndex + 1);
                charIndex++;
            }

            let typeSpeed = isDeleting ? 40 : 80; // Deleting is faster

            if (!isDeleting && charIndex === currentCourse.length) {
                typeSpeed = 2000; // Pause at the end of the word
                isDeleting = true;
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                courseIndex = (courseIndex + 1) % courses.length;
                typeSpeed = 500; // Pause before typing the next word
            }

            setTimeout(typeEffect, typeSpeed);
        }

        typeEffect();
    }

    // Expanding Cards Logic
    const expandCards = document.querySelectorAll(".expand-card");
    if (expandCards.length > 0) {
        let activeIndex = 0;
        let autoPlayInterval;

        const startAutoPlay = () => {
            autoPlayInterval = setInterval(() => {
                expandCards.forEach(c => c.classList.remove("active"));
                activeIndex = (activeIndex + 1) % expandCards.length;
                expandCards[activeIndex].classList.add("active");
            }, 3000); // Change every 3 seconds
        };

        const stopAutoPlay = () => {
            clearInterval(autoPlayInterval);
        };

        expandCards.forEach((card, index) => {
            card.addEventListener("mouseenter", () => {
                stopAutoPlay();
                expandCards.forEach(c => c.classList.remove("active"));
                card.classList.add("active");
                activeIndex = index;
            });
            card.addEventListener("mouseleave", () => {
                startAutoPlay();
            });
            // For mobile clicks
            card.addEventListener("click", () => {
                stopAutoPlay();
                expandCards.forEach(c => c.classList.remove("active"));
                card.classList.add("active");
                activeIndex = index;
            });
        });
        
        startAutoPlay();
    }

    // Success Stats Counter Animation
    const statNumbers = document.querySelectorAll('.stat-number');

    if (statNumbers.length > 0) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    if (!entry.target.classList.contains('animating')) {
                        entry.target.classList.add('animating');
                        statNumbers.forEach(stat => {
                            const target = +stat.getAttribute('data-target');
                            const duration = 2000; // 2 seconds
                            const increment = target / (duration / 16); // 60fps
                            
                            let current = 0;
                            const updateCounter = () => {
                                if (!entry.target.classList.contains('animating')) return; // Cancel if scrolled away
                                
                                current += increment;
                                if (current < target) {
                                    stat.textContent = Math.ceil(current).toLocaleString() + '+';
                                    requestAnimationFrame(updateCounter);
                                } else {
                                    stat.textContent = target.toLocaleString() + '+';
                                }
                            };
                            updateCounter();
                        });
                    }
                } else {
                    // Reset numbers to 0 when scrolled out of view
                    entry.target.classList.remove('animating');
                    statNumbers.forEach(stat => {
                        stat.textContent = '0';
                    });
                }
            });
        }, { threshold: 0.1 });
        
        const statsSection = document.querySelector('.stats-section');
        if (statsSection) {
            observer.observe(statsSection);
        }
    }
    // Active Navigation Link Highlighting
    const sections = document.querySelectorAll("section[id], main[id]");
    const navLinks = document.querySelectorAll(".nav-links a");
    const currentPath = window.location.pathname.split("/").pop() || 'index.html';

    // 1. Highlight static pages on load (e.g. about.html, careers.html)
    navLinks.forEach(link => {
        const href = link.getAttribute("href");
        if (href === currentPath) {
            link.classList.add("active");
        }
    });

    // 2. Scroll Spy for Homepage sections
    if (sections.length > 0 && navLinks.length > 0) {
        const spyObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const id = entry.target.getAttribute("id");
                    
                    // Only run scroll spy on the homepage
                    if (currentPath === 'index.html' || currentPath === '') {
                        navLinks.forEach(link => {
                            const href = link.getAttribute("href");
                            // If this link points to the intersecting section
                            if (href === "#" + id || href === "index.html#" + id) {
                                // Remove active class from all anchor links first
                                navLinks.forEach(l => {
                                    if (l.getAttribute("href").includes("#")) {
                                        l.classList.remove("active");
                                    }
                                });
                                // Add active class to current section link
                                link.classList.add("active");
                            }
                        });
                    }
                }
            });
        }, {
            rootMargin: "-10% 0px -70% 0px"
        });

        sections.forEach(section => spyObserver.observe(section));
    }

    // Modal Logic
    const enquiryModal = document.getElementById('enquiryModal');
    const closeEnquiryBtn = document.getElementById('closeModal');

    // Only show the popup on the home page (where typingElement exists)
    if (enquiryModal && closeEnquiryBtn && typingElement) {
        // Show modal after a brief delay
        setTimeout(() => {
            enquiryModal.classList.add('show');
        }, 1000);

        // Close modal
        closeEnquiryBtn.addEventListener('click', () => {
            enquiryModal.classList.remove('show');
        });

        // Close if clicked outside
        enquiryModal.addEventListener('click', (e) => {
            if (e.target === enquiryModal) {
                enquiryModal.classList.remove('show');
            }
        });
    }
    
    // AI Chat Widget Logic
    const aiBtn = document.getElementById('aiBtn');
    const aiChatWidget = document.getElementById('aiChatWidget');
    const aiCloseBtn = document.getElementById('aiCloseBtn');
    const aiChatInput = document.getElementById('aiChatInput');
    const aiSendBtn = document.getElementById('aiSendBtn');
    const aiChatMessages = document.getElementById('aiChatMessages');
    const aiGreetingBubble = document.getElementById('aiGreetingBubble');
    const closeGreetingBtn = document.getElementById('closeGreetingBtn');
    
    // Greeting bubble logic
    if (closeGreetingBtn && aiGreetingBubble) {
        closeGreetingBtn.addEventListener('click', (e) => {
            e.stopPropagation(); // prevent clicking through to button
            aiGreetingBubble.classList.add('hidden');
        });
    }

    function clearChat() {
        if (aiChatMessages) {
            aiChatMessages.innerHTML = `
                <div class="ai-message ai">
                    <div class="msg-avatar"><i class="fas fa-comment-dots"></i></div>
                    <div class="msg-bubble">Hello! I'm your Cogniza AI assistant. How can I help you shape your career today?</div>
                </div>
            `;
        }
        if (aiChatInput) {
            aiChatInput.value = '';
            aiChatInput.style.height = '20px';
        }
    }

    // Toggle Chat Widget
    if (aiBtn && aiChatWidget) {
        aiBtn.addEventListener('click', (e) => {
            e.preventDefault();
            if(aiGreetingBubble) aiGreetingBubble.classList.add('hidden');
            aiChatWidget.classList.toggle('active');
            if (aiChatWidget.classList.contains('active')) {
                aiChatInput.focus();
            } else {
                clearChat();
            }
        });
    }
    
    if (aiCloseBtn) {
        aiCloseBtn.addEventListener('click', () => {
            aiChatWidget.classList.remove('active');
            clearChat();
        });
    }
    
    // Auto-resize textarea
    if (aiChatInput) {
        aiChatInput.addEventListener('input', function() {
            this.style.height = '20px';
            this.style.height = (this.scrollHeight - 20) + 'px';
        });
        
        aiChatInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                sendMessage();
            }
        });
    }
    
    if (aiSendBtn) {
        aiSendBtn.addEventListener('click', (e) => {
            e.preventDefault();
            sendMessage();
        });
    }
    
    function appendMessage(sender, text) {
        const msgDiv = document.createElement('div');
        msgDiv.className = `ai-message ${sender}`;
        
        const avatarDiv = document.createElement('div');
        avatarDiv.className = 'msg-avatar';
        avatarDiv.innerHTML = sender === 'ai' ? '<i class="fas fa-comment-dots"></i>' : '<i class="far fa-user"></i>';
        
        const bubbleDiv = document.createElement('div');
        bubbleDiv.className = 'msg-bubble';
        bubbleDiv.textContent = text;
        
        msgDiv.appendChild(avatarDiv);
        msgDiv.appendChild(bubbleDiv);
        
        aiChatMessages.appendChild(msgDiv);
        aiChatMessages.scrollTop = aiChatMessages.scrollHeight;
        return msgDiv;
    }
    
    async function sendMessage() {
        const text = aiChatInput.value.trim();
        if (!text) return;
        
        // Append user message
        appendMessage('user', text);
        aiChatInput.value = '';
        aiChatInput.style.height = '20px';
        
        // Show typing indicator
        const typingMsg = appendMessage('ai', '...');
        
        try {
            // Provide context for the AI
            const prompt = `You are a helpful and professional customer support AI for an edtech company named Cogniza. Keep your answers brief, polite, and helpful. The user says: ${text}`;
            
            // Using a free, keyless AI endpoint for live responses
            const response = await fetch('https://text.pollinations.ai/' + encodeURIComponent(prompt));
            
            if (!response.ok) throw new Error('Network response was not ok');
            
            const aiText = await response.text();
            
            // Remove typing indicator and append real response
            typingMsg.remove();
            appendMessage('ai', aiText);
            
        } catch (error) {
            typingMsg.remove();
            appendMessage('ai', 'Sorry, I am having trouble connecting to my live servers right now. Please try again later.');
        }
    }
    
    // Testimonials Carousel Logic
    const testiCards = document.querySelectorAll('.testi-card');
    if (testiCards.length > 0) {
        const cardsPerPage = 3;
        let currentPage = 0;
        const totalPages = Math.ceil(testiCards.length / cardsPerPage);
        
        function showPage(pageIndex) {
            testiCards.forEach((card, index) => {
                // Calculate which page this card belongs to
                const cardPage = Math.floor(index / cardsPerPage);
                
                if (cardPage === pageIndex) {
                    card.style.display = 'block';
                    card.style.animation = 'fadeIn 0.5s ease';
                } else {
                    card.style.display = 'none';
                }
            });
        }
        
        // Show first page initially
        showPage(0);
        
        // Auto-change every 5 seconds
        setInterval(() => {
            currentPage = (currentPage + 1) % totalPages;
            showPage(currentPage);
        }, 5000);
    }
    // Mobile Menu Toggle Logic
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const topBar = document.querySelector('.top-bar');
    
    if (mobileMenuBtn && topBar) {
        mobileMenuBtn.addEventListener('click', () => {
            topBar.classList.toggle('menu-open');
            const icon = mobileMenuBtn.querySelector('i');
            if (icon) {
                if (topBar.classList.contains('menu-open')) {
                    icon.classList.remove('fa-bars');
                    icon.classList.add('fa-times');
                } else {
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }
            }
        });
    }
});
