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

// Chatbot knowledge base - aligned with Lakhan Singh's AI Product Manager portfolio
const chatbotKnowledge = {
    profile: `Lakhan Singh is a Sr. Product Manager specializing in enterprise B2B SaaS platforms across Conversational AI (Banking), Healthcare HRMS, and E-commerce AI, with 6+ years owning products end-to-end and delivering measurable business impact.

Location: Noida, India | Phone: +91 9690902424 | Email: lakhan.rajputaipm@gmail.com
LinkedIn: linkedin.com/in/lakkhan-siingh-la0119
Portfolio: beautiful-blossom-08b.notion.site/Lakhan-Singh-AI-Product-Manager-Portfolio`,

    summary: `Product Manager with 6+ years owning B2B enterprise SaaS platforms across HSBC Conversational AI (Banking), Healthcare HRMS & AI HR chatbot, and E-commerce AI (Personal Shopping Assistant). Skilled in translating business strategy into technical roadmaps using Agile/Scrum, NLP/LLM-powered conversational platforms, and data-driven product analytics.

Key highlights:
- Increased chatbot containment 68% -> 82% across India, Hong Kong, and Singapore
- Improved NPS by 11 points through conversational experience optimization
- Increased self-service adoption 27% and reduced live-agent transfers 24%
- Identified $735K+ projected operational savings (2027)
- Built AI employee self-service chatbot automating 45% of queries, reducing response time 50%
- Delivered AI Personal Shopping Assistant serving 1M+ customers, increasing engagement 15%
- Managed enterprise SaaS platforms serving 52,300+ users; achieved 95%+ sprint success`,

    skills: `Core Skills & Expertise:

Product Ownership: Product Strategy, Roadmapping, Discovery, Backlog Prioritization, Sprint Planning, User Stories, Business Case Development

AI & Machine Learning: Conversational AI, NLP, LLM-powered solutions, Intelligent Automation, Recommendation Engines, Dialogflow

Technical & Cloud: AWS Cloud, APIs & Integrations, SaaS Architecture, Enterprise Platforms

Customer & Market: Customer Journey Mapping, Voice of Customer, Competitive Analysis, Go-to-Market, User Research

Analytics & Insights: GA4, Mixpanel, A/B Testing / Experimentation, KPI Tracking

Leadership: Cross-functional stakeholder management (12-20 stakeholders), Executive communication, Risk & Compliance, Agile/Scrum delivery

Tools & Technology: Claude, ChatGPT, Perplexity, SQL, Jira, Confluence`,

    experienceProtiviti: `Digital Product Manager - Conversational AI (HSBC Client Engagement)
Protiviti India | Deputy Manager | Noida, India | Nov 2025 - Present

- Owns end-to-end product lifecycle for HSBC's enterprise Conversational AI platform across India, Hong Kong, and Singapore
- Leads product ownership for the Credit Card Account Closure chatbot (Singapore market)
- Drove bot containment 68% -> 82%, improved NPS by 11 points, increased self-service adoption 27%, reduced live-agent transfers 24%
- Coordinates 12-20 stakeholders across engineering, architecture, delivery, QA, conversation design, SRE/platform, and Security/Privacy/Risk/Compliance/Accessibility
- Identified $735K+ projected operational savings (2027) across three markets
- Defines product vision, roadmap, release plans; translates business requirements into conversational flows and user stories
- Conducts competitive benchmarking of conversational banking capabilities
- Leads backlog management, sprint planning, and acceptance criteria across delivery pods in three markets`,

    experienceCloudsR: `Senior Product Manager - Enterprise SaaS & AI Solutions
CloudsR Technology | Noida, India | Jan 2020 - Nov 2025
Progressed: Associate Product Manager -> Product Manager -> Senior Product Manager

- Owned end-to-end product lifecycle for B2B enterprise HRMS SaaS serving 52,300+ users across hospital and enterprise clients
- Layered AI-powered Employee Self-Service chatbot: automated 45% of queries, cut response time 50%
- Owned e-commerce AI Personal Shopping Assistant (ML/NLP, Dialogflow): increased engagement 15% across 1M+ customers
- Directed AWS-hosted deployment and scaling; partnered with Data Scientists, AI Engineers, UX Designers
- Delivered 95%+ sprint success and improved customer satisfaction 20%
- Ensured compliance with enterprise governance, security, and organizational standards throughout SDLC`,

    experienceThreeX: `Project Head - Electronics Product Development
Three X Electronics | New Delhi, India | Jul 2014 - Dec 2019

Key Achievement: Expanded product portfolio by 20% and boosted new product sales by 30% YoY

- Headed development of starter relays, CDI units, ignition coils, switches, and assemblies
- Streamlined design-to-production workflows, cutting time-to-market by 15%
- Achieved 95%+ first-pass yield and reduced rework costs
- Negotiated supplier contracts, lowering material costs by 10-15% and improving lead times by 25%`,

    projectHSBC: `Conversational AI for Credit Card Closure - HSBC (Banking)
Protiviti India | Nov 2025 - Present

Context: HSBC's conversational banking platform spans India, Hong Kong, and Singapore. Lakhan owns the Credit Card Closure chatbot (Singapore) end-to-end, plus broader conversational AI platform ownership across all three markets.

Role & Decisions: Defined product vision and roadmap for Credit Card Account Closure flow. Coordinated 12-20 stakeholders. Prioritized flows to automate based on volume, compliance risk, and containment upside. Used journey analytics to identify live-agent transfer drop-offs and scoped new automation use cases.

Outcomes:
- Credit Card Closure (Singapore): full closure within chatbot, saving ~$120K annually in agent handling cost
- Platform-wide containment: 68% -> 82%, NPS +11 points
- Self-service adoption +27%, live-agent transfers -24%
- $735K+ projected 2027 operational savings across three markets`,

    projectHRMS: `Healthcare Workforce Platform + AI Employee Self-Service Chatbot
CloudsR Technology | Jan 2020 - Nov 2025

Context: Hospital clients needed complex workforce operations (vendor staffing, credentialing, compliance-heavy leave/attendance, 24/7 shift scheduling) at 52,300+ user scale, while HR teams handled repetitive manual queries.

Role & Decisions: Owned roadmap across employee lifecycle, self-service, and operations modules. Prioritized compliance-critical workflows (BGC clearance, healthcare labor-law leave, credentialing). Added AI chatbot for high-volume queries (leave, payslips, onboarding FAQs) with human escalation for ambiguous cases.

Outcomes:
- Chatbot automated 45% of employee queries, cut response time 50%
- Platform sustained 95%+ sprint success
- 20% lift in customer satisfaction across concurrent product lines`,

    projectShopping: `AI-Powered Personal Shopping Assistant - Luxury E-commerce
CloudsR Technology | Jan 2020 - Nov 2025

Context: Luxury e-commerce client wanted in-store-style personalized guidance online for product discovery, gifting, and styling.

Role & Decisions: Owned product end-to-end using ML/NLP and Dialogflow, integrated with catalogue, CRM, and browsing data. Prioritized personalization quality over breadth - scoped initially to gifting and styling use cases.

Outcomes:
- Increased engagement and premium basket conversion ~15% across 1M+ customers
- Strengthened brand's high-touch digital positioning`,

    achievements: `Key Achievements Summary:

Conversational AI Impact:
[OK] Containment 68% -> 82% | NPS +11 points | Self-service adoption +27% | Live-agent transfers -24% | $735K+ projected savings (2027)

Platform & Delivery:
[OK] 52,300+ users on enterprise SaaS | 95%+ sprint success

AI Solutions:
[OK] HR chatbot: 45% query automation, 50% faster response
[OK] Shopping Assistant: 1M+ customers, 15% engagement increase`,

    valueProposition: `What Lakhan Brings to an Organization:

- Enterprise Conversational AI Ownership - containment 68% -> 82%, self-service adoption +27%
- Customer Experience Impact - NPS +11 points through conversational UX optimization
- Business Value & Automation - $735K+ projected savings (2027), reduced transfers and operational load
- Cross-Functional Leadership - 12-20 stakeholders across engineering, QA, SRE, Security/Compliance/Accessibility
- Data-Driven Delivery - GA4/Mixpanel, experimentation, 95%+ sprint success with clear user stories and acceptance criteria`,

    education: `Bachelor of Engineering (B.E.) - Electronics & Communication
Dr. A.P.J. Abdul Kalam Technical University | 2014`,

    certifications: `Certifications include:
- Certified AI-Driven Professional
- AI for Product Management (Pendo.io, Aug 2025)
- Fintech Product Management Bootcamp 2025 (Udemy)
- Generative AI Overview for Project Managers (PMI, Oct 2025)
- Advanced Business Analysis (Udemy, 35 IIBA PDUs)
- Electronic Arts & J.P. Morgan Job Simulations (Forage)
- Super Certified, Product Discovery, Product Management Basics, Radical Product Thinking (Pendo.io)
- AI Agents for Product Leaders, Generative AI for PMs, Technical PM, Prompt Engineering, Microsoft Copilot (LinkedIn Learning)
- Become a 10x Product Manager with ChatGPT (Udemy)`,

    cricket: `Corporate Leather Ball Cricket - Noida
Active player | Right-hand Batsman, Right-arm Medium Bowler

Cricket Stats:
- 685 matches played
- 17,143 runs scored
- 286 wickets taken
- Active in Noida corporate cricket leagues

Skills from cricket: Team Leadership, Performance Under Pressure, Strategic Thinking, Commitment & Discipline

CricHeroes Profile: cricheroes.com/player-profile/21215404/lakhan-rajputlucky/stats`,

    interests: `Interests & Hobbies:
- Corporate Leather Ball Cricket - passionate player in Noida corporate leagues (685 matches, 17,143 runs, 286 wickets)
- Travelling - exploring new places, cultures, and experiences
- Car Driving - enjoys road trips and scenic routes`,

    contact: `Contact Lakhan Singh:
ðŸ-§ Email: lakhan.rajputaipm@gmail.com
ðŸ-± Phone: +91 9690902424
ðŸ- Location: Noida, India
ðŸ-- LinkedIn: linkedin.com/in/lakkhan-siingh-la0119
ðŸ-„ Portfolio: beautiful-blossom-08b.notion.site/Lakhan-Singh-AI-Product-Manager-Portfolio

Open to conversations about Conversational AI (Banking), Healthcare HRMS & HR automation, and E-commerce AI - containment, NPS, adoption, and operational savings.`
};

const intentMap = [
    { patterns: [/hsbc|credit card closure|credit card account|conversational banking|containment|live.agent transfer|self.service adoption|\$735|\$120k|nps|singapore.*bot|hong kong.*bot|protiviti/i], response: () => chatbotKnowledge.projectHSBC + '\n\n' + chatbotKnowledge.experienceProtiviti },
    { patterns: [/protiviti|deputy manager|digital product manager.*hsbc|current (role|job|company|work)/i], response: () => chatbotKnowledge.experienceProtiviti },
    { patterns: [/cloudsr|clouds r|hrms|healthcare.*platform|employee self.service|hr chatbot|52,?300|hospital.*hr/i], response: () => chatbotKnowledge.projectHRMS + '\n\n' + chatbotKnowledge.experienceCloudsR },
    { patterns: [/shopping assistant|personal shopping|luxury e.?commerce|e.?commerce ai|1m\+|dialogflow.*ecommerce|recommendation.*shopping/i], response: () => chatbotKnowledge.projectShopping },
    { patterns: [/three x|electronics|starter relay|cdi unit|ignition coil|project head.*electronics/i], response: () => chatbotKnowledge.experienceThreeX },
    { patterns: [/skill|expertise|proficient|tool|technology|dialogflow|jira|confluence|ga4|mixpanel|nlp|llm|aws/i], response: () => chatbotKnowledge.skills },
    { patterns: [/certif|pmi|pendo|udemy|forage|linkedin learning|iiba|bootcamp/i], response: () => chatbotKnowledge.certifications },
    { patterns: [/education|degree|university|b\.e\.|engineering|kalam/i], response: () => chatbotKnowledge.education },
    { patterns: [/cricket|cricheroes|wicket|batsman|bowler|685|17143|286/i], response: () => chatbotKnowledge.cricket },
    { patterns: [/hobby|hobbies|interest|travel|driving|extracurricular/i], response: () => chatbotKnowledge.interests },
    { patterns: [/achievement|accomplish|metric|kpi|impact|result|highlight|what has he (done|achieved)/i], response: () => chatbotKnowledge.achievements },
    { patterns: [/value proposition|what (does|do) he bring|unique value|why hire|strengths at scale|what i bring/i], response: () => chatbotKnowledge.valueProposition },
    { patterns: [/contact|email|phone|reach|connect|linkedin|location|noida|9690902424|lakhan\.rajputaipm/i], response: () => chatbotKnowledge.contact },
    { patterns: [/project|portfolio|case stud|featured|work sample/i], response: () => `Featured Projects:\n\n1. ${chatbotKnowledge.projectHSBC}\n\n2. ${chatbotKnowledge.projectHRMS}\n\n3. ${chatbotKnowledge.projectShopping}` },
    { patterns: [/experience|career|work history|employment|resume|cv|background|job history/i], response: () => `${chatbotKnowledge.experienceProtiviti}\n\n${chatbotKnowledge.experienceCloudsR}\n\n${chatbotKnowledge.experienceThreeX}` },
    { patterns: [/about|who is|introduce|summary|overview|tell me about|professional summary|lakhan singh/i], response: () => chatbotKnowledge.profile + '\n\n' + chatbotKnowledge.summary },
    { patterns: [/ai|artificial intelligence|machine learning|chatbot|conversational ai|generative ai/i], response: () => chatbotKnowledge.skills + '\n\n' + chatbotKnowledge.projectHSBC + '\n\n' + chatbotKnowledge.projectHRMS },
    { patterns: [/stakeholder|cross.functional|agile|scrum|sprint|backlog|roadmap/i], response: () => chatbotKnowledge.skills + '\n\n' + chatbotKnowledge.valueProposition },
    { patterns: [/salary|compensation|pay/i], response: () => "I don't have salary information in Lakhan's portfolio. For compensation discussions, please reach out directly at lakhan.rajputaipm@gmail.com or +91 9690902424." },
    { patterns: [/years of experience|how long|how many years|6\+|six years/i], response: () => "Lakhan has 6+ years of product management experience owning B2B enterprise SaaS platforms end-to-end, from CloudsR Technology (Jan 2020 - Nov 2025) to his current role at Protiviti India (Nov 2025 - Present) driving HSBC Conversational AI." }
];

const greetingResponses = [
    "Hello! I'm Lakhan's portfolio assistant. Ask me anything about his AI Product Management experience - HSBC Conversational AI, Healthcare HRMS, E-commerce AI, skills, projects, achievements, certifications, cricket stats, or how to connect with him.",
    "Hi there! I can help you learn about Lakhan Singh - Sr. Product Manager with 6+ years in enterprise Conversational AI, Healthcare HRMS, and E-commerce AI. What would you like to know?",
    "Hey! Welcome to Lakhan's portfolio. I can answer questions about his work at Protiviti/HSBC, CloudsR Technology, his measurable outcomes (containment, NPS, adoption), projects, skills, and more."
];

const defaultResponses = [
    "I can help with Lakhan's experience (Protiviti/HSBC, CloudsR, Three X Electronics), featured projects, skills, achievements, certifications, education, cricket, interests, or contact details. What would you like to explore?",
    "Try asking about his HSBC Conversational AI work, Healthcare HRMS chatbot, Personal Shopping Assistant, key metrics (containment 68->82%, NPS +11), skills, certifications, or how to connect with him.",
    "I'm here to answer questions about Lakhan Singh's AI Product Manager portfolio. You can ask about his current role, past experience, projects, achievements, skills, cricket stats, or contact information."
];

function getChatbotResponse(userMessage) {
    const message = userMessage.toLowerCase().trim();

    if (message.length < 2) {
        return "Please ask me a question about Lakhan's portfolio - experience, projects, skills, achievements, certifications, or contact info.";
    }

    if (message.match(/^(hi|hello|hey|greetings|good morning|good afternoon|good evening|what's up|sup|hi there|hello there|hey there)/)) {
        return greetingResponses[Math.floor(Math.random() * greetingResponses.length)];
    }

    if (message.match(/^(thanks|thank you|thx|ty|appreciate)/)) {
        return "You're welcome! Feel free to ask anything else about Lakhan's experience, projects, or how to connect with him.";
    }

    if (message.match(/^(bye|goodbye|see you|exit|quit)/)) {
        return "Goodbye! You can reach Lakhan at lakhan.rajputaipm@gmail.com or on LinkedIn (linkedin.com/in/lakkhan-siingh-la0119) anytime.";
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
            return chatbotKnowledge.projectHSBC;
        }
        if (matchedKeywords.some(k => ['hrms', 'healthcare', 'cloudsr', 'employee'].includes(k))) {
            return chatbotKnowledge.projectHRMS;
        }
        if (matchedKeywords.some(k => ['shopping', 'ecommerce', 'luxury'].includes(k))) {
            return chatbotKnowledge.projectShopping;
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

