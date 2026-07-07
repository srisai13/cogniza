const fs = require('fs');

const courses = [
    "AI (Generative & Agentic)",
    "Android App Development",
    "Artificial Intelligence (AI) & Machine Learning (ML)",
    "Augmented Reality (AR) & Virtual Reality (ARVR)",
    "AutoCAD",
    "AWS",
    "Basic Graphic Design",
    "Blockchain Technology",
    "Business Analysis",
    "Business Analytics",
    "Car Design",
    "Clinical Data Management",
    "Clinical SAS",
    "Clinical Trials Research",
    "Cloud Computing",
    "Cyber Security & Ethical Hacking",
    "Data Analysis",
    "Data Analytics",
    "Data Science",
    "DevOps",
    "Digital Marketing",
    "DSA with Python",
    "Embedded Systems",
    "Finance",
    "Front End Web Development",
    "Full Stack Web Development",
    "Graphic Designing",
    "Human Resources (HR) Management",
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
    "Salesforce",
    "SAP FICO",
    "ServiceNow",
    "Startup & Entrepreneurship",
    "Stock Market",
    "Supply Chain Management",
    "UI/UX Design",
    "VLSI Design",
    "Web Development"
];

const programsData = {};
courses.forEach(course => {
    let slug = course.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
    programsData[slug] = {
        title: course,
        category: "Tech & Professional",
        description: "Master the core concepts of " + course + " with our expert-led modules. This comprehensive program is designed to take you from a beginner to an industry-ready professional. Learn through hands-on projects, interactive sessions, and real-world case studies.",
        duration: "3-4 Months"
    };
});

fs.writeFileSync('programs-data.js', 'const programsData = ' + JSON.stringify(programsData, null, 4) + ';');
console.log('Created programs-data.js');
