// Navigation functionality
const navbar = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');
const navLinks = document.querySelectorAll('.nav-link');
const tabLinks = document.querySelectorAll('.tab-link');
const tabContents = document.querySelectorAll('.tab-content');

// Navbar scroll effect
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Mobile menu toggle
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Tab switching functionality
function switchTab(tabId) {
    // Remove active class from all tabs and contents
    tabLinks.forEach(tab => tab.classList.remove('active'));
    tabContents.forEach(content => content.classList.remove('active'));
    
    // Add active class to clicked tab
    const activeTab = document.querySelector(`[data-tab="${tabId}"]`);
    if (activeTab) {
        activeTab.classList.add('active');
    }
    
    // Show corresponding content
    const targetContent = document.getElementById(tabId);
    if (targetContent) {
        targetContent.classList.add('active');
        // Scroll to top
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }
}

tabLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        
        // Close mobile menu
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        
        // Get tab ID and switch
        const tabId = link.getAttribute('data-tab');
        if (tabId) {
            switchTab(tabId);
        }
    });
});

// Initialize - show home tab by default
document.addEventListener('DOMContentLoaded', () => {
    const homeTab = document.querySelector('[data-tab="home"]');
    const homeContent = document.getElementById('home');
    if (homeTab && homeContent) {
        homeTab.classList.add('active');
        homeContent.classList.add('active');
    }
});

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all sections for animation
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.skill-item, .project-card, .cert-card, .interest-card, .education-item, .experience-item, .achievement-card');
    
    animatedElements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
        observer.observe(el);
    });
});

// Contact form handling
const contactForm = document.getElementById('contact-form');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form values
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const subject = document.getElementById('subject').value;
        const message = document.getElementById('message').value;
        
        // Simple validation
        if (name && email && subject && message) {
            // Here you would typically send the form data to a server
            // For now, we'll just show an alert
            alert('Thank you for your message! I will get back to you soon.');
            
            // Reset form
            contactForm.reset();
        } else {
            alert('Please fill in all fields.');
        }
    });
}

// Profile image error handling
const profileImg = document.getElementById('profile-img');
if (profileImg) {
    profileImg.addEventListener('error', function() {
        // If image fails to load, create a placeholder
        this.style.display = 'none';
        const placeholder = document.createElement('div');
        placeholder.style.width = '300px';
        placeholder.style.height = '300px';
        placeholder.style.borderRadius = '50%';
        placeholder.style.background = 'linear-gradient(135deg, #2563eb, #0ea5e9)';
        placeholder.style.display = 'flex';
        placeholder.style.alignItems = 'center';
        placeholder.style.justifyContent = 'center';
        placeholder.style.color = 'white';
        placeholder.style.fontSize = '3rem';
        placeholder.style.fontWeight = 'bold';
        placeholder.textContent = 'LS';
        placeholder.style.margin = '0 auto';
        this.parentElement.appendChild(placeholder);
    });
}

// All tab links (including buttons) use the same tab switching functionality
// This is already handled by the tabLinks forEach loop above

// Add scroll reveal animation
const revealElements = document.querySelectorAll('.section-title, .about-text, .contact-info');
revealElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
});

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, { threshold: 0.2 });

revealElements.forEach(el => revealObserver.observe(el));

// Add typing effect to hero title (optional enhancement)
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.textContent = '';
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    type();
}

// Parallax effect for hero section (optional)
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    if (hero && scrolled < window.innerHeight) {
        hero.style.transform = `translateY(${scrolled * 0.5}px)`;
        hero.style.opacity = 1 - (scrolled / window.innerHeight);
    }
});

// Add active state to navigation on page load
window.addEventListener('load', () => {
    const hash = window.location.hash;
    if (hash) {
        const targetSection = document.querySelector(hash);
        if (targetSection) {
            setTimeout(() => {
                const offsetTop = targetSection.offsetTop - 70;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }, 100);
        }
    }
});

// Add click outside to close mobile menu
document.addEventListener('click', (e) => {
    if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }
});

// Performance optimization: Debounce scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply debounce to scroll events
const debouncedScroll = debounce(() => {
    // Scroll-based animations can go here
}, 10);

window.addEventListener('scroll', debouncedScroll);

// Chatbot Functionality
const chatbotToggle = document.getElementById('chatbot-toggle');
const chatbotWindow = document.getElementById('chatbot-window');
const chatbotClose = document.getElementById('chatbot-close');
const chatbotInput = document.getElementById('chatbot-input');
const chatbotSend = document.getElementById('chatbot-send');
const chatbotMessages = document.getElementById('chatbot-messages');

// Chatbot knowledge base
const chatbotResponses = {
    greetings: [
        "Hello! Welcome to Lakhan Singh's portfolio. I'm here to help you learn more about his professional background, experience, skills, projects, and achievements. What would you like to know?",
        "Hi there! I can provide detailed information about Lakhan Singh's career as a Product Manager, his extensive experience in AI-powered products, and his impressive track record. How can I assist you today?",
        "Hey! Great to meet you! I'm your guide to learning about Lakhan's journey from Software Engineer to Product Manager, his expertise in Conversational AI, and his successful product deliveries. What interests you most?"
    ],
    about: [
        "Lakhan Singh is a highly accomplished Product Manager with 4+ years of experience driving AI-powered and SaaS-based product innovation across HR, Ecommerce, and Conversational AI platforms. He has proven success leading cross-functional teams to design, prioritize, and deliver intelligent chatbots, virtual assistants, and digital customer journeys. His journey from software engineer to product manager has equipped him with deep technical understanding, enabling him to lead cross-functional teams effectively. He specializes in AI, fintech, and design systems, with expertise in data-driven decision-making, growth strategies, and product-market fit validation. His passion lies in building intuitive, high-impact products that solve real user problems while achieving business objectives. With a track record of delivering measurable results—including automating 45% of query load through AI chatbots, improving customer satisfaction by 20%, and achieving >95% on-time sprint completion—he brings a results-oriented approach to product management.",
        "Lakhan is a Product Manager with a strong background in Software Engineering, focused on delivering scalable, user-centric digital products that drive business impact. He has 4+ years of experience in product management, specializing in AI-powered solutions, fintech platforms, and conversational AI technologies. His expertise spans across managing product backlogs, defining roadmaps, and aligning stakeholders in Agile/Scrum environments to enhance customer satisfaction, operational efficiency, and business value. He is adept at working with cross-functional teams including design, analytics, and development teams to optimize product experiences. His technical background gives him a unique advantage in understanding complex systems and communicating effectively with engineering teams."
    ],
    skills: [
        "Lakhan possesses a comprehensive skill set in Product Management and AI technologies. His core competencies include: Product Ownership (backlog prioritization, sprint planning, requirement grooming, product roadmaps), Conversational AI (Chatbots, Virtual Assistants, NLP, Dialogflow, Rasa, Conversational Banking Journeys), Customer Experience (Journey Design, Voice of Customer, CX Analytics, Personalization), Agile Delivery (Cross-Functional Collaboration, Scrum Team Coordination, UAT, Continuous Improvement), Analytics & Insights (Google Analytics GA4, Mixpanel, Power BI, A/B Testing, Adoption Metrics), and Leadership & Communication (Stakeholder Management, Risk Assessment, Compliance, Client Demos). His software engineering background also gives him proficiency in full-stack development, which helps him bridge the gap between technical teams and business stakeholders.",
        "Lakhan's technical and product skills are extensive. In Product Strategy, he excels at vision development, roadmap planning, and market fit validation. His User Research capabilities include gathering insights and designing user-centric solutions. In Data Analytics, he's proficient with GA4, Mixpanel, Power BI, and A/B testing to drive data-driven decisions. His Agile/Scrum expertise includes sprint planning, cross-functional collaboration, and UAT processes. He's also skilled in Conversational AI technologies like NLP, Dialogflow, and Rasa for building intelligent chatbots. Additionally, his leadership skills enable him to manage stakeholders, assess risks, ensure compliance, and deliver client demos effectively."
    ],
    experience: [
        "Lakhan's professional experience is impressive and diverse. Currently, he serves as Product Manager/Owner – AI & Digital Solutions at FlyTech Solution in Noida, India (Feb 2022 – Present). In this role, he owns product backlog and delivery roadmap for multiple AI-driven platforms across HRMS and E-commerce domains. He defined and delivered an AI-powered Employee Self-Service Chatbot integrating HR workflows, which automated 45% of query load and improved response time by 50%. He led the design of an AI-based Personal Shopping Assistant using recommendation algorithms and NLP-driven intent classification, improving engagement by 15%. He partners with design, analytics, and development teams to optimize conversational flows and enhance customer journey efficiency. He collaborates with business and technology stakeholders to assess operational risks and ensure adherence to organizational compliance standards. He drives iterative delivery of chatbot and analytics modules using Agile and Scrum frameworks, achieving >95% on-time sprint completion rate. He increased customer satisfaction scores by 20% through optimized conversational experiences and improved operational efficiency and self-service adoption across enterprise platforms. He leads multi-disciplinary teams across AI, analytics, and design, ensuring product-market fit.",
        "Prior to his current role, Lakhan served as Business Head at RTL Technologies in Noida, India (Jan 2017 – Jan 2022). In this position, he oversaw client delivery and recruitment operations for US-based client projects. He gathered business requirements and optimized internal ATS workflows to enhance recruiter efficiency. He managed a 50+ member cross-functional team, ensuring alignment with client goals and SLAs. He collaborated with engineering teams to improve recruitment analytics and reporting dashboards. He boosted recruiter productivity by 20% and compliance tracking by 35%. He drove 40% client growth and strengthened long-term US partnerships. Before that, he was Project Head – Electronics Product Development at Three X Electronics in New Delhi, India (Jul 2014 – Dec 2016), where he headed development of starter relays, CDI units, ignition coils, switches, and assemblies, expanding product portfolio by 20%. He enforced quality protocols, achieving 95%+ first pass yield and reducing rework costs. He negotiated supplier contracts, lowering material costs by 10–15% and improving lead times by 25%. He drove product launches with sales teams, boosting new product sales by 30% YoY."
    ],
    projects: [
        "Lakhan has led several high-impact projects. The Hospital-Focused HRMS Platform is a comprehensive HRMS solution tailored for healthcare institutions, addressing unique challenges of hospital workforce management. Key features include Vendor Management System with client job posting, vendor notifications, multi-round interview scheduling, selection/rejection workflows, background check (BGC) with color-coded clearance, and onboarding with knowledge transfer and asset management. The Payroll Management System features healthcare-specific pay structures, shift differentials, overtime calculations, integration with hospital billing systems, and salary slip generation. Advanced Attendance Tracking includes biometric integration, real-time monitoring, compliance with healthcare regulations, and automated login/logout time tracking. Intelligent Leave Management supports multiple leave types (Paid, Casual, Sick, Sabbatical, Maternity, Education) with automatic coverage scheduling. Smart Staff Scheduling provides 24/7 shift planning, skills-based assignment algorithms, emergency staffing protocols, and smart push notifications. The platform streamlined operations for 5+ healthcare facilities, reduced scheduling conflicts by 60%+, and improved compliance tracking efficiency by 50%.",
        "The AI-Powered Employee Self-Service Chatbot is an intelligent HR assistant that automates routine HR queries and processes, enabling 24/7 employee self-service capabilities. Core AI capabilities include Smart Leave Request Processing with natural language understanding, automated approval workflows, and calendar integration. Intelligent Payslip Queries provide instant payslip generation, salary breakdown explanations, and tax calculation clarifications. Interactive Onboarding Support offers guided new employee orientation, document collection automation, and policy explanation. Dynamic HR Policy Guidance provides context-aware policy recommendations and real-time updates. The chatbot uses Natural Language Processing (NLP) for query understanding, Machine Learning models for intent recognition, and integrates with HR databases and systems. It achieved 40%+ reduction in HR department workload, 24/7 availability for employee queries, 85%+ query resolution without human intervention, and reduced response time from hours to seconds.",
        "The AI-Powered Personal Shopping Assistant is a luxury e-commerce conversational commerce solution that guides customers with product discovery, gifting ideas, and styling recommendations. It features Conversational Commerce with natural language product discovery, personalized gifting recommendations, styling and fashion advice, and seasonal collection highlights. Smart Integrations include product catalogue system integration, CRM system connectivity, browsing history analysis, and purchase behavior tracking. The Personalization Engine learns customer preferences, provides dynamic product suggestions, and offers seasonal and trend-based recommendations. The solution boosted customer engagement and premium basket conversions by ~15%, strengthened brand positioning through high-touch digital experiences, enhanced luxury shopping experience with personalized interactions, and improved product discovery for seasonal collections."
    ],
    education: [
        "Lakhan holds a Bachelor of Engineering (B.E.) in Electronics & Communication from Dr. A.P.J. Abdul Kalam Technical University, which he completed in 2014. This strong technical foundation in electronics and communication engineering has been instrumental in his career progression, providing him with deep understanding of technical systems and enabling his transition from software engineering to product management. His engineering background gives him a unique perspective when working with technical teams and understanding complex product architectures."
    ],
    certifications: [
        "Lakhan has an extensive portfolio of professional certifications, particularly focused on AI, Product Management, and Business Analysis. In October 2025, he completed Generative AI Overview for Project Managers from Project Management Institute (PMI). In September 2025, he earned Advanced Business Analysis (35 IIBA PDUs) from Udemy, completed Electronic Arts Product Management Job Simulation and J.P. Morgan Quantitative Research Job Simulation through Forage, finished Fintech Product Management Bootcamp 2025 from Udemy, and achieved Super Certified status from Pendo.io. In August 2025, he completed multiple certifications including: AI Agents for Product Leaders from LinkedIn Learning, AI for Product Management from Pendo.io, Become a 10x Product Manager with ChatGPT & Generative AI from Udemy, Generative AI for Product Managers from LinkedIn Learning, Microsoft Copilot: The Art of Prompt Writing from LinkedIn Learning, Product Discovery Certification from Pendo.io, Product Management Basics Certification from Pendo.io, Prompt Engineering: How to Talk to the AIs from LinkedIn Learning, Radical Product Thinking: Vision Setting from Pendo.io, and Technical Product Management from LinkedIn Learning. These certifications demonstrate his commitment to continuous learning and expertise in AI-powered product management, generative AI tools, prompt engineering, product discovery, and technical product management.",
        "Lakhan's certification portfolio showcases his deep expertise in AI and Product Management. He holds certifications from prestigious organizations including PMI, Pendo.io, LinkedIn Learning, Udemy, and Forage. His certifications span across Generative AI, Product Management fundamentals and advanced topics, Business Analysis, Prompt Engineering, Product Discovery, Technical Product Management, and Fintech. Notably, he has completed job simulations from Electronic Arts and J.P. Morgan, demonstrating practical application of skills. His Super Certified status from Pendo.io indicates mastery across multiple product management domains. These certifications collectively represent a comprehensive skill set in modern product management, AI integration, and business analysis, positioning him as a highly qualified Product Manager with cutting-edge knowledge in AI-powered product development."
    ],
    achievements: [
        "Lakhan's Be10x AI Tools Mastery Program achievement has been transformative for his professional capabilities. The program has significantly enhanced his skills in AI-powered product management through comprehensive learning modules and hands-on practice with cutting-edge AI tools. He gained deep insights into how artificial intelligence can be leveraged to drive product innovation, improve customer experiences, and optimize business processes. The structured curriculum, combined with expert guidance on AI tools and their practical applications, enabled him to master complex skills that he now applies effectively in his role as a Product Manager. This program has particularly strengthened his ability to integrate AI solutions like chatbots, NLP technologies, and recommendation engines into product roadmaps. The impact extends beyond technical knowledge—it has instilled in him a strategic mindset that helps him approach product challenges with innovative AI-driven solutions, ultimately enhancing his ability to deliver scalable, intelligent products that drive business value.",
        "Throughout his career, Lakhan has achieved remarkable results. At FlyTech Solution, he automated 45% of query load through AI chatbots and improved response time by 50%. He increased customer satisfaction scores by 20% through optimized conversational experiences. He achieved >95% on-time sprint completion rate using Agile and Scrum frameworks. At RTL Technologies, he boosted recruiter productivity by 20% and compliance tracking by 35%, while driving 40% client growth. At Three X Electronics, he expanded product portfolio by 20%, achieved 95%+ first pass yield, reduced material costs by 10–15%, and boosted new product sales by 30% YoY. These achievements demonstrate his consistent track record of delivering measurable business impact."
    ],
    contact: [
        "You can reach Lakhan through multiple channels. Email: lakhan.rajputaipm@gmail.com. Phone: +91 9690902424. Location: Noida, India. For professional networking, connect with him on LinkedIn at linkedin.com/in/lakhan-rajput-0119/. You can also view his detailed portfolio at beautiful-blossom-08b.notion.site/Lakhan-Singh-Product-Manager-Portfolio. He's always open to discussing new opportunities, collaborations, or just having a conversation about product management, AI technologies, or innovative solutions. Feel free to reach out!"
    ],
    default: [
        "I can provide detailed information about Lakhan's experience, skills, projects, education, certifications, achievements, or contact information. You can ask me about his background as a Product Manager, his work at FlyTech Solution, his AI-powered projects, his technical skills, his career journey, or how to get in touch with him. What specific information would you like to know?",
        "I'm here to help you learn about Lakhan Singh! I can tell you in detail about his 4+ years of Product Management experience, his expertise in AI and Conversational AI, his major projects including the HRMS platform and chatbots, his skills and certifications, his career achievements, or his contact information. What would you like to explore?",
        "Feel free to ask me anything about Lakhan! I can provide comprehensive details about his professional background, his current role as Product Manager at FlyTech Solution, his previous experience at RTL Technologies and Three X Electronics, his projects and their impact, his technical and product management skills, his education and certifications, or how to connect with him. What interests you?"
    ]
};

// Function to get chatbot response with improved pattern matching
function getChatbotResponse(userMessage) {
    const message = userMessage.toLowerCase().trim();
    
    // Check for empty or very short messages
    if (message.length < 2) {
        return "I'm here to help! Could you please ask me a question about Lakhan's portfolio?";
    }
    
    // Greetings - more comprehensive matching
    if (message.match(/^(hi|hello|hey|greetings|good morning|good afternoon|good evening|what's up|sup)/) || 
        message.match(/^(hi there|hello there|hey there)/)) {
        return chatbotResponses.greetings[Math.floor(Math.random() * chatbotResponses.greetings.length)];
    }
    
    // About - comprehensive matching (check this first before other patterns)
    if (message.match(/(^| )about( |$|lakhan|him)/) || 
        message.match(/(who is|tell me about|introduce|background|overview|summary|describe)/) ||
        message.match(/(what does|what is lakhan|who is lakhan|can you tell me about)/) ||
        message.match(/(^what|^who|^tell me)/) && message.length < 30) {
        return chatbotResponses.about[Math.floor(Math.random() * chatbotResponses.about.length)];
    }
    
    // Skills - detailed matching
    if (message.match(/(skill|expertise|proficient|what can|capabilities|abilities|competencies|strengths)/) ||
        message.match(/(what skills|technical skills|product skills|what is he good at)/) ||
        message.match(/(knows|specializes|expert in)/)) {
        return chatbotResponses.skills[Math.floor(Math.random() * chatbotResponses.skills.length)];
    }
    
    // Experience - comprehensive matching
    if (message.match(/(experience|work|job|career|employment|company|role|position|current role|previous role)/) ||
        message.match(/(where does|where did|work history|professional experience|work experience)/) ||
        message.match(/(flytech|rtl technologies|three x|current company|previous company)/) ||
        message.match(/(what does he do|what is his job|what is his role)/)) {
        return chatbotResponses.experience[Math.floor(Math.random() * chatbotResponses.experience.length)];
    }
    
    // Projects - detailed matching
    if (message.match(/(project|portfolio|built|developed|created|hrms|chatbot|shopping assistant|hospital|ecommerce|e-commerce)/) ||
        message.match(/(what projects|which projects|project details|project work|major projects|key projects)/) ||
        message.match(/(ai chatbot|employee chatbot|hrms platform|shopping assistant|personal shopping|hr chatbot)/)) {
        // Check for specific project mentions (order matters - check specific first)
        if (message.match(/(hrms|hospital|healthcare|workforce management)/)) {
            return chatbotResponses.projects[0]; // HRMS project
        } else if (message.match(/(chatbot|employee|hr chatbot|self-service|ai assistant)/)) {
            return chatbotResponses.projects[1]; // Chatbot project
        } else if (message.match(/(shopping|ecommerce|e-commerce|luxury|personal shopping|conversational commerce)/)) {
            return chatbotResponses.projects[2]; // Shopping assistant project
        }
        // Return comprehensive projects overview
        return "Lakhan has led three major high-impact projects:\n\n1. Hospital-Focused HRMS Platform: A comprehensive HRMS solution for healthcare institutions with vendor management, payroll, attendance tracking, leave management, and smart staff scheduling. It streamlined operations for 5+ healthcare facilities, reduced scheduling conflicts by 60%+, and improved compliance tracking efficiency by 50%.\n\n2. AI-Powered Employee Self-Service Chatbot: An intelligent HR assistant that automates routine HR queries, enabling 24/7 employee self-service. It achieved 40%+ reduction in HR workload, 85%+ query resolution without human intervention, and reduced response time from hours to seconds.\n\n3. AI-Powered Personal Shopping Assistant: A luxury e-commerce conversational commerce solution that guides customers with product discovery and styling recommendations. It boosted customer engagement and premium basket conversions by ~15% and enhanced luxury shopping experience.\n\nWould you like detailed information about any specific project?";
    }
    
    // Education - comprehensive matching
    if (message.match(/(education|degree|university|college|qualification|studied|graduate|bachelor|b\.e\.|engineering)/) ||
        message.match(/(where did he study|what degree|educational background|academic)/)) {
        return chatbotResponses.education[Math.floor(Math.random() * chatbotResponses.education.length)];
    }
    
    // Certifications - detailed matching
    if (message.match(/(certification|certificate|certified|pmi|pendo|udemy|linkedin|forage|iiba)/) ||
        message.match(/(what certifications|which certifications|certifications list|professional certifications)/) ||
        message.match(/(generative ai|ai for product|product management basics|super certified|prompt engineering)/) ||
        message.match(/(electronic arts|j\.p\. morgan|fintech bootcamp|quantitative research)/)) {
        return chatbotResponses.certifications[Math.floor(Math.random() * chatbotResponses.certifications.length)];
    }
    
    // Achievements - comprehensive matching
    if (message.match(/(achievement|accomplishment|result|success|milestone|impact|results|metrics)/) ||
        message.match(/(what has he achieved|key achievements|major accomplishments|career highlights)/) ||
        message.match(/(45%|20%|60%|95%|automated|improved|increased|reduced)/)) {
        return chatbotResponses.achievements[Math.floor(Math.random() * chatbotResponses.achievements.length)];
    }
    
    // Contact - detailed matching
    if (message.match(/(contact|email|phone|reach|connect|linkedin|get in touch|how to contact|reach out)/) ||
        message.match(/(email address|phone number|contact details|contact info|where is he|location)/) ||
        message.match(/(noida|india|lakhan\.rajputaipm|9690902424)/)) {
        return chatbotResponses.contact[Math.floor(Math.random() * chatbotResponses.contact.length)];
    }
    
    // Interests/Hobbies
    if (message.match(/(interest|hobby|hobbies|what does he like|passion|enjoy|travel|cricket|driving)/) ||
        message.match(/(corporate cricket|leather ball|travelling|car driving)/)) {
        return "Lakhan has several personal interests that reflect his well-rounded personality. He loves playing corporate leather ball cricket, which combines his passion for sports with professional networking and team building. He also enjoys travelling, exploring new places, cultures, and experiences, which broadens his perspective and inspires creativity. Additionally, he has a passion for car driving, enjoying the freedom and adventure that comes with road trips and exploring scenic routes. These interests help him maintain a healthy work-life balance and bring fresh perspectives to his professional work.";
    }
    
    // Specific questions about metrics/results
    if (message.match(/(how much|how many|percentage|metric|kpi|result|impact|outcome)/)) {
        return "Lakhan has achieved impressive metrics throughout his career. At FlyTech Solution, he automated 45% of query load through AI chatbots and improved response time by 50%. He increased customer satisfaction scores by 20% through optimized conversational experiences. He achieved >95% on-time sprint completion rate using Agile and Scrum frameworks. The HRMS platform he developed reduced scheduling conflicts by 60%+ and improved compliance tracking efficiency by 50%. The AI chatbot achieved 85%+ query resolution without human intervention and reduced HR workload by 40%+. At RTL Technologies, he boosted recruiter productivity by 20% and compliance tracking by 35%, while driving 40% client growth. At Three X Electronics, he expanded product portfolio by 20%, achieved 95%+ first pass yield, reduced material costs by 10–15%, and boosted new product sales by 30% YoY.";
    }
    
    // Questions about current role
    if (message.match(/(current|present|now|currently|what is he doing now)/)) {
        return chatbotResponses.experience[0];
    }
    
    // Questions about previous roles
    if (message.match(/(previous|before|earlier|past|prior|used to work)/)) {
        return chatbotResponses.experience[1];
    }
    
    // Questions about AI/technology
    if (message.match(/(ai|artificial intelligence|machine learning|nlp|conversational ai|generative ai)/) ||
        message.match(/(chatbot|dialogflow|rasa|prompt engineering|copilot|chatgpt)/)) {
        return "Lakhan has extensive expertise in AI and Conversational AI technologies. He specializes in building AI-powered products including chatbots, virtual assistants, and recommendation engines. He's skilled in NLP (Natural Language Processing), Dialogflow, Rasa, and has completed multiple certifications in Generative AI, Prompt Engineering, and AI for Product Management. He has hands-on experience delivering AI solutions that automated 45% of query load, improved response times by 50%, and achieved 85%+ query resolution without human intervention. His AI expertise spans across product strategy, technical implementation, and business impact measurement.";
    }
    
    // Default response with helpful suggestions
    return chatbotResponses.default[Math.floor(Math.random() * chatbotResponses.default.length)];
}

// Function to add message to chat
function addMessage(message, isUser = false) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `chatbot-message ${isUser ? 'user-message' : 'bot-message'}`;
    
    const contentDiv = document.createElement('div');
    contentDiv.className = 'message-content';
    
    // Handle line breaks in message
    const messageWithBreaks = message.replace(/\n/g, '<br>');
    const p = document.createElement('p');
    p.innerHTML = messageWithBreaks;
    contentDiv.appendChild(p);
    messageDiv.appendChild(contentDiv);
    
    chatbotMessages.appendChild(messageDiv);
    
    // Scroll to bottom
    chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
}

// Toggle chatbot window
chatbotToggle.addEventListener('click', () => {
    chatbotWindow.classList.toggle('active');
    if (chatbotWindow.classList.contains('active')) {
        chatbotInput.focus();
    }
});

chatbotClose.addEventListener('click', () => {
    chatbotWindow.classList.remove('active');
});

// Send message function
function sendMessage() {
    const message = chatbotInput.value.trim();
    if (message === '') return;
    
    // Add user message
    addMessage(message, true);
    chatbotInput.value = '';
    
    // Show typing indicator
    const typingIndicator = document.createElement('div');
    typingIndicator.className = 'chatbot-message bot-message';
    typingIndicator.id = 'typing-indicator';
    typingIndicator.innerHTML = '<div class="message-content"><p>Typing...</p></div>';
    chatbotMessages.appendChild(typingIndicator);
    chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
    
    // Simulate thinking delay and get response
    setTimeout(() => {
        // Remove typing indicator
        const indicator = document.getElementById('typing-indicator');
        if (indicator) {
            indicator.remove();
        }
        
        const response = getChatbotResponse(message);
        addMessage(response, false);
    }, 800);
}

// Send on button click
chatbotSend.addEventListener('click', sendMessage);

// Send on Enter key
chatbotInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        sendMessage();
    }
});

