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
    const animatedElements = document.querySelectorAll('.skill-item, .project-card, .cert-card, .interest-card, .education-item, .experience-item, .achievement-card, .value-item');
    
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

// Chatbot knowledge base - aligned with Lakhan Singh AI Product Manager portfolio
const chatbotKnowledge = {
    profile: `Lakhan Singh is a Sr. Product Manager specializing in enterprise B2B SaaS platforms across Conversational AI (Digital Banking), Healthcare HRMS, and E-commerce AI, with 5+ years owning products end-to-end and delivering measurable business impact.

Location: Noida, India | Phone: +91 9711966555 | Email: lakhan.rajputaipm@gmail.com
Website: lakhanrajputaipm.in
LinkedIn: linkedin.com/in/lakkhan-siingh-la0119`,

    summary: `Sr. Product Manager with 5 years owning B2B enterprise SaaS platforms spanning AI-powered Conversational Banking, HRMS, and e-commerce. Currently owns HSBC Conversational AI platform across India, Hong Kong, and Singapore, serving 22M customers via mobile app, coordinating 12-20 cross-functional stakeholders.

Key highlights:
- Containment 68% -> 82% | NPS +11 | Self-service +27% | Live-agent transfers -24%
- $735K+ projected 2027 operational savings across three markets
- HRMS chatbot: 45% query automation, 50% faster response
- Personal Shopping Assistant: 1M+ users, 15% engagement increase
- 95%+ sprint success; customer satisfaction +20%`,

    skills: `Core Skills:

Product Ownership: Product Strategy, Product Discovery, Roadmapping, Backlog Prioritization, Sprint Planning, User Stories, PRD/Product Specs, Business Case Development, Feature Prioritization, Release Planning

AI & ML: Conversational AI, NLP, LLM-powered solutions, Prompt Engineering, RAG, OpenAI, Intelligent Automation, Recommendation Engines, Dialogflow, Sierra

Technical & Cloud: AWS Cloud, APIs & Integrations, SaaS Architecture, Enterprise Platforms, Vector Databases

Customer & Market: Customer Journey Mapping, VoC, Customer Interviews, User Research, Competitive Analysis, Go-to-Market

Analytics: GA4, Mixpanel, A/B Testing, KPI Tracking, Data-driven decision making

Leadership: Cross-functional stakeholder management (12-20 stakeholders), Executive communication, Risk & Compliance, Agile/Scrum

Tools: Claude, ChatGPT, Perplexity, SQL, Jira, Confluence, Figma`,

    experienceProtiviti: `Digital Product Manager - Conversational AI (HSBC Client Engagement)
Protiviti India | Deputy Manager | Noida | Nov 2025 - Present

Scope: Own end-to-end product lifecycle for HSBC Conversational AI across India, Hong Kong, Singapore, serving 22M customers via mobile app.

- Lead Credit Card Account Closure chatbot with business, engineering, architecture, compliance
- Containment 68% -> 82%, NPS +11, self-service +27%, live-agent transfers -24%
- Coordinate 12-20 stakeholders (3-6 engineers, Tech Lead, Solution Architect, QA, BA, conversation design, Platform/SRE, Security/Compliance/Accessibility)
- $735K projected 2027 savings across three markets
- Define vision, roadmap, Dialogflow/Sierra flows, user stories aligned to governance and compliance
- Competitive benchmarking against leading global banks
- Backlog management, sprint planning, acceptance criteria across three markets
- Monitor product performance, model effectiveness, conversational analytics`,

    experienceCloudsR: `Senior Product Manager - Enterprise SaaS & AI Solutions
CloudsR Technology | Noida | Jan 2022 - Nov 2025
Progressed: APM -> PM -> Senior PM

- Owned HRMS SaaS platform lifecycle for 52,300+ users
- Led discovery, requirements, prioritization, release management
- Created PRDs, specs, user stories, acceptance criteria, functional documentation
- AI Employee Self-Service chatbot: 45% automation, 50% faster response
- AI Personal Shopping Assistant: NLP/ML, Dialogflow, 1M+ users, 15% engagement increase
- Collaborated with Data Scientists, AI Engineers, UX, QA, Engineering
- REST API integration requirements; AWS-hosted scalable solutions
- 95%+ sprint success, customer satisfaction +20%
- Mentored APMs and BAs on Agile delivery and discovery
- Used Mixpanel, GA4, ChatGPT/Claude/Perplexity for research and optimization`,

    experienceRTL: `Business Head
RTL Technologies | Noida | Jan 2017 - Jan 2022

- Oversaw client delivery and recruitment operations for US-based clients
- Optimized internal ATS workflows for recruiter efficiency
- Managed 50+ cross-functional team; aligned with SLAs and client goals
- Improved recruitment analytics and reporting dashboards
- Recruiter productivity +20%, compliance tracking +35%
- Drove 40% client growth and strengthened US partnerships`,

    experienceThreeX: `Project Head - Electronics Product Development
Three X Electronics | New Delhi | Jul 2014 - Dec 2016

- Headed starter relays, CDI units, ignition coils, switches, assemblies; portfolio +20%
- 95%+ first-pass yield, reduced rework costs
- New product sales +30% YoY`,

    projectContainment: `HSBC Conversational AI - Chatbot Containment Optimization (FinTech/Digital Banking)
Owned product strategy and optimization across India, Hong Kong & Singapore, serving 22M customers.
Impact: Containment 68% -> 82%, self-service +27%, NPS +11, live-agent transfers -24%, $735K+ projected savings`,

    projectCardClosure: `Credit Card Closure - Conversational AI Self-Service Fulfilment (HSBC)
Owned end-to-end digital card closure: AI intent, eligibility decisioning, retention offers, STP fulfilment, single/multi-card closure, API orchestration, T&Cs, notifications, exception handling.
Impact: Transformed contact-centre process into scalable self-service with automated eligibility and STP closure`,

    projectHRMS: `Enterprise HRMS SaaS B2B Platform (Healthcare Technology) - CloudsR
Owned strategy, discovery, roadmap, delivery for B2B HRMS serving 52,300+ users.
Impact: 95%+ sprint success, customer satisfaction +20%, scalable AWS enterprise solutions`,

    projectHRChatbot: `AI-Powered Employee Self-Service (Healthcare/Enterprise AI) - CloudsR
Led discovery, requirements, roadmap, delivery of AI chatbot for HR/support queries.
Impact: 45% query automation, 50% faster response time`,

    projectShopping: `AI Personal Shopping Assistant (E-commerce/AI) - CloudsR
Led strategy and delivery of NLP/ML conversational shopping assistant using Dialogflow and recommendation engines.
Impact: 1M+ users, 15% engagement increase`,

    achievements: `Key Achievements:
- Conversational AI: Containment 68% -> 82%, NPS +11, self-service +27%, transfers -24%, $735K+ savings
- Platform: 52,300+ HRMS users, 22M HSBC customers, 95%+ sprint success
- AI Solutions: HR chatbot 45% automation; Shopping Assistant 1M+ users, 15% engagement`,

    valueProposition: `What Lakhan Brings:
- Enterprise Conversational AI ownership across 22M customers, 3 markets
- Customer experience impact: NPS +11 through journey analytics
- Business value: $735K+ projected savings, reduced operational load
- Cross-functional leadership: 12-20 stakeholders including engineering, compliance, SRE
- Data-driven delivery: GA4/Mixpanel, experimentation, 95%+ sprint success`,

    education: `Bachelor of Engineering (B.E.) - Electronics & Communication
Dr. A.P.J. Abdul Kalam Technical University | 2014`,

    certifications: `Featured Certifications:
- AI for Product Management
- Certified AI-Driven Professional
- Fintech Product Management Bootcamp 2025

Also holds certifications from PMI, Pendo.io, LinkedIn Learning, Udemy, and Forage in Generative AI, Product Management, Business Analysis, and Prompt Engineering.`,

    cricket: `Corporate Leather Ball Cricket - Noida
Right-hand Batsman, Right-arm Medium Bowler
685 matches | 17,143 runs | 286 wickets
CricHeroes: cricheroes.com/player-profile/21215404/lakhan-rajputlucky/stats`,

    interests: `Interests: Corporate cricket (685 matches, 17,143 runs, 286 wickets), Travelling, Car Driving`,

    contact: `Contact Lakhan Singh:
Email: lakhan.rajputaipm@gmail.com
Phone: +91 9711966555
Location: Noida, India
Website: lakhanrajputaipm.in
LinkedIn: linkedin.com/in/lakkhan-siingh-la0119

Open to Conversational AI (Digital Banking), Healthcare HRMS, and E-commerce AI discussions.`
};

const intentMap = [
    { patterns: [/containment|68.*82|22m|22 million|chatbot optimization|singapore|hong kong/i], response: () => chatbotKnowledge.projectContainment + '\n\n' + chatbotKnowledge.experienceProtiviti },
    { patterns: [/credit card closure|card closure|stp|eligibility decision|retention offer|self.service fulfil/i], response: () => chatbotKnowledge.projectCardClosure },
    { patterns: [/hsbc|protiviti|conversational banking|digital banking|dialogflow|sierra|deputy manager|current (role|job|work)/i], response: () => chatbotKnowledge.experienceProtiviti + '\n\n' + chatbotKnowledge.projectContainment },
    { patterns: [/hrms|52,?300|enterprise saas.*health|healthcare.*platform|b2b platform/i], response: () => chatbotKnowledge.projectHRMS + '\n\n' + chatbotKnowledge.experienceCloudsR },
    { patterns: [/employee self.service|hr chatbot|hrms chatbot|45%|support quer/i], response: () => chatbotKnowledge.projectHRChatbot },
    { patterns: [/shopping assistant|personal shopping|e.?commerce ai|1m\+|recommendation.*engine/i], response: () => chatbotKnowledge.projectShopping },
    { patterns: [/rtl|recruitment|recruiter|ats|business head|50\+.*team/i], response: () => chatbotKnowledge.experienceRTL },
    { patterns: [/cloudsr|clouds r|jan 2022/i], response: () => chatbotKnowledge.experienceCloudsR },
    { patterns: [/three x|electronics|starter relay|cdi|ignition coil/i], response: () => chatbotKnowledge.experienceThreeX },
    { patterns: [/skill|expertise|figma|rag|openai|vector database|prompt engineering|sierra/i], response: () => chatbotKnowledge.skills },
    { patterns: [/certif|fintech bootcamp|ai.driven/i], response: () => chatbotKnowledge.certifications },
    { patterns: [/education|degree|university|b\.e\.|kalam/i], response: () => chatbotKnowledge.education },
    { patterns: [/cricket|cricheroes|wicket|685|17143|286/i], response: () => chatbotKnowledge.cricket },
    { patterns: [/hobby|hobbies|interest|travel|driving/i], response: () => chatbotKnowledge.interests },
    { patterns: [/achievement|metric|kpi|nps|735|\$735|impact|result/i], response: () => chatbotKnowledge.achievements },
    { patterns: [/value proposition|what.*bring|why hire|unique value/i], response: () => chatbotKnowledge.valueProposition },
    { patterns: [/contact|email|phone|9711966555|lakhanrajputaipm|reach|connect|linkedin|website/i], response: () => chatbotKnowledge.contact },
    { patterns: [/project|featured|portfolio|case stud/i], response: () => `Featured Projects:\n\n1. ${chatbotKnowledge.projectContainment}\n\n2. ${chatbotKnowledge.projectCardClosure}\n\n3. ${chatbotKnowledge.projectHRMS}\n\n4. ${chatbotKnowledge.projectHRChatbot}\n\n5. ${chatbotKnowledge.projectShopping}` },
    { patterns: [/experience|career|resume|cv|work history|employment|background/i], response: () => `${chatbotKnowledge.experienceProtiviti}\n\n${chatbotKnowledge.experienceCloudsR}\n\n${chatbotKnowledge.experienceRTL}\n\n${chatbotKnowledge.experienceThreeX}` },
    { patterns: [/about|who is|introduce|summary|overview|tell me about|lakhan singh/i], response: () => chatbotKnowledge.profile + '\n\n' + chatbotKnowledge.summary },
    { patterns: [/ai|machine learning|nlp|llm|chatbot|conversational ai|generative ai/i], response: () => chatbotKnowledge.skills + '\n\n' + chatbotKnowledge.projectContainment },
    { patterns: [/stakeholder|agile|scrum|sprint|backlog|roadmap|prd/i], response: () => chatbotKnowledge.skills + '\n\n' + chatbotKnowledge.valueProposition },
    { patterns: [/salary|compensation|pay/i], response: () => "Salary information is not available. Contact Lakhan at lakhan.rajputaipm@gmail.com or +91 9711966555." },
    { patterns: [/years of experience|how long|how many years|5\+|five years/i], response: () => "Lakhan has 5+ years in product management: CloudsR Technology (Jan 2022 - Nov 2025), currently Protiviti India (Nov 2025 - Present) driving HSBC Conversational AI for 22M customers." }
];

const greetingResponses = [
    "Hello! I'm Lakhan's portfolio assistant. Ask about his HSBC Conversational AI work, Healthcare HRMS, E-commerce AI, skills, projects, achievements, certifications, cricket, or contact details.",
    "Hi! I can tell you about Lakhan Singh - Sr. Product Manager with 5+ years in Digital Banking, HRMS, and E-commerce AI. What would you like to know?",
    "Hey! Ask me about Protiviti/HSBC, CloudsR Technology, RTL Technologies, key metrics (containment 68->82%, NPS +11), or how to connect with Lakhan."
];

const defaultResponses = [
    "I can help with experience (Protiviti/HSBC, CloudsR, RTL, Three X), 5 featured projects, skills, achievements, certifications, cricket, or contact info.",
    "Try: 'Tell me about HSBC containment optimization', 'What is his HRMS chatbot impact?', 'How to contact Lakhan?', or 'What skills does he have?'",
    "Ask about his current HSBC role, CloudsR HRMS/AI projects, metrics, certifications, or website lakhanrajputaipm.in."
];

function getChatbotResponse(userMessage) {
    const message = userMessage.toLowerCase().trim();

    if (message.length < 2) {
        return "Please ask about Lakhan's experience, projects, skills, achievements, certifications, or contact info.";
    }

    if (message.match(/^(hi|hello|hey|greetings|good morning|good afternoon|good evening|sup|hi there|hello there|hey there)/)) {
        return greetingResponses[Math.floor(Math.random() * greetingResponses.length)];
    }

    if (message.match(/^(thanks|thank you|thx|ty|appreciate)/)) {
        return "You're welcome! Ask anything else about Lakhan's portfolio or how to connect with him.";
    }

    if (message.match(/^(bye|goodbye|see you|exit|quit)/)) {
        return "Goodbye! Reach Lakhan at lakhan.rajputaipm@gmail.com, +91 9711966555, or lakhanrajputaipm.in";
    }

    let bestMatch = null;
    let bestScore = 0;

    for (const intent of intentMap) {
        let score = 0;
        for (const pattern of intent.patterns) {
            if (pattern.test(message)) score++;
        }
        if (score > bestScore) {
            bestScore = score;
            bestMatch = intent;
        }
    }

    if (bestMatch && bestScore > 0) {
        return bestMatch.response();
    }

    const keywords = message.split(/\s+/).filter(w => w.length > 3);
    const allKnowledge = Object.values(chatbotKnowledge).join('\n').toLowerCase();
    const matchedKeywords = keywords.filter(kw => allKnowledge.includes(kw));

    if (matchedKeywords.length >= 2) {
        if (matchedKeywords.some(k => ['hsbc', 'containment', 'protiviti', 'banking'].includes(k))) {
            return chatbotKnowledge.projectContainment;
        }
        if (matchedKeywords.some(k => ['hrms', 'healthcare', 'cloudsr', 'employee'].includes(k))) {
            return chatbotKnowledge.projectHRMS;
        }
        if (matchedKeywords.some(k => ['shopping', 'ecommerce'].includes(k))) {
            return chatbotKnowledge.projectShopping;
        }
        if (matchedKeywords.some(k => ['rtl', 'recruitment', 'recruiter'].includes(k))) {
            return chatbotKnowledge.experienceRTL;
        }
        return chatbotKnowledge.summary + '\n\n' + chatbotKnowledge.achievements;
    }

    return defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
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
