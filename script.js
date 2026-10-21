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
    
    tabLinks.forEach((link) => {
        if (link.getAttribute('data-tab') === tabId) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
    
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
    const animatedElements = document.querySelectorAll('.impact-card, .project-card-3d, .timeline-card, .toolkit-card, .edu-card, .beyond-card, .cert-card');
    
    animatedElements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(24px)';
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
const revealElements = document.querySelectorAll('.section-title, .hero-copy, .contact-lead');
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

// Chatbot knowledge base - synced with portfolio content
const chatbotKnowledge = {
    profile: `Lakhan Singh - Digital Product Manager specializing in Conversational AI, Agentic AI, and Enterprise SaaS.

He builds secure, customer-centered digital products from discovery and strategy through delivery and optimization across digital banking, healthcare HRMS, e-commerce, and payments. 12+ years overall professional experience.

Location: Noida, India | Phone: +91 9711966555
Email: lakhan.rajputaipm@gmail.com | Website: lakhanrajputaipm.in
LinkedIn: linkedin.com/in/lakkhan-siingh-la0119`,

    summary: `Currently owns HSBC Conversational AI product lifecycle across India, Hong Kong, and Singapore (22M customers). Coordinates 12-20 stakeholders across engineering, architecture, delivery, and compliance.

Selected impact:
- HSBC containment 68% -> 82%; self-service +27%; NPS +11; live-agent transfers -24%
- $735K+ projected 2027 operational savings (three markets)
- Agentic AI HRMS: 45% employee support queries automated; 50% faster response
- AI shopping assistant: 1M+ users; engagement +15%
- Enterprise HRMS: 52,300+ users; 95%+ sprint success; customer satisfaction +20%`,

    toolkit: `Product leadership toolkit:

Strategy & discovery: product vision, customer research, journey mapping, roadmaps, prioritization, business cases.

AI products: Conversational AI, Agentic AI, LLMs, RAG, multi-agent systems, orchestration, tool calling, guardrails, human-in-the-loop workflows.

Execution: PRDs, user stories, acceptance criteria, APIs, integrations, SIT/UAT, release planning, Agile/Scrum.

Customer outcomes: journey and conversation analytics, NPS, KPI tracking, experimentation, continuous improvement.

Tools: Jira, Confluence, Mixpanel, GA4, Dialogflow, AWS, SQL, Figma, ChatGPT, Claude, Perplexity`,

    skills: `See product leadership toolkit for full detail. Core domains: Digital Banking (HSBC), Healthcare HRMS SaaS, Agentic AI HR automation, E-commerce conversational AI, UPI/FinTech payments product definition.`,

    experienceProtiviti: `Digital Product Manager - Conversational AI (HSBC)
Protiviti India | HSBC client engagement | Noida | Nov 2025 - Present

Own product lifecycle for HSBC Conversational AI across three markets. Lead card-closure self-service journey. Align engineering, AI/ML, architecture, UX, data, QA, business, operations, security, privacy, risk, and compliance.

Own vision, roadmap, backlog, journey analytics, optimization for mobile Conversational AI serving 22M customers. Coordinate 12-20 stakeholders.`,

    experienceCloudsR: `Senior Product Manager - Enterprise SaaS & AI Solutions
CloudsR Technology | Noida | Jan 2022 - Nov 2025
Progressed: Associate PM -> PM -> Senior PM

Led HRMS SaaS, Agentic AI HRMS, AI shopping assistant, and UPI merchant payment gateway from discovery through Agile delivery, release, and optimization.

Delivered: 52,300+ user HRMS platform, Agentic AI HR (45% automation), 1M+ user shopping assistant (+15% engagement), UPI gateway MVP and phased roadmap.`,

    experienceRTL: `Business Head
RTL Technologies | Noida | Jan 2017 - Jan 2022

- Oversaw client delivery and recruitment operations for US-based clients
- Optimized internal ATS workflows for recruiter efficiency
- Managed 50+ cross-functional team; aligned with SLAs and client goals
- Improved recruitment analytics and reporting dashboards
- Recruiter productivity +20%, compliance tracking +35%
- Drove 40% client growth and strengthened US partnerships`,

    experienceThreeX: `Project Head - Automotive Product Development
Three X Electronics | New Delhi | Jul 2014 - Dec 2016

Led automotive electronics product development. Expanded portfolio 20%. Achieved 95%+ first-pass yield through quality protocols.`,

    projectContainment: `01 - HSBC Conversational AI (Digital Banking)
Own product vision, roadmap, backlog, journey analytics, and optimization for mobile Conversational AI serving 22M customers in India, Hong Kong, and Singapore. Lead with engineering, architecture, UX, data, business, operations, risk; 12-20 stakeholders.
Impact: Containment 68% -> 82%, self-service +27%, NPS +11, transfers -24%, $735K+ projected 2027 savings`,

    projectCardClosure: `02 - Credit Card Closure (Conversational Self-Service)
End-to-end digital closure: AI intent, eligibility rules, STP fulfilment, API orchestration, notifications, exception handling. SIT, UAT, release with UX, engineering, business, operations.
Outcome: Eligible closures moved from contact-centre-led process to scalable self-service.`,

    projectAgenticHRMS: `03 - Agentic AI HRMS (Healthcare SaaS)
Owned vision, discovery, PRD, architecture, roadmap, requirements, delivery for Agentic AI HR platform. Multi-agent orchestration, tool/API calling, task memory, risk-tiered autonomy, human-in-the-loop controls.
Impact: 45% of employee support queries automated; response time reduced 50%.`,

    projectHRMS: `04 - Enterprise HRMS SaaS (Healthcare Technology)
Owned B2B HRMS from discovery through Agile delivery, release, optimization for 52,300+ users. Requirements, integrations, prioritization, cross-functional execution.
Impact: 95%+ sprint success; customer satisfaction +20%.`,

    projectShopping: `05 - AI Personal Shopping Assistant (E-commerce)
Strategy, discovery, launch, optimization for NLP/ML conversational assistant (Dialogflow, recommendation engines).
Impact: 1M+ users; engagement +15%.`,

    projectUPI: `06 - UPI Merchant Payment Gateway (FinTech)
Product vision, MVP scope, phased roadmap for SMB UPI: merchant onboarding, tiered KYC, static/dynamic QR, payment links, transaction tracking, merchant dashboards, T+1 settlement visibility, reconciliation, exception handling, security, audit logging, RBAC, scalability, RBI/NPCI alignment considerations.
Note: Pilot-to-scale plan targets 25,000+ merchants in six months - this is a target, not claimed adoption.`,

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

    cricket: `Beyond product - Corporate leather-ball cricket in Noida
Right-hand batsman, right-arm medium bowler
700+ matches | 17,000+ runs | 286 wickets
CricHeroes: cricheroes.com/player-profile/21215404/lakhan-rajputlucky/stats`,

    interests: `Beyond product: Corporate leather-ball cricket in Noida (700+ matches, 17,000+ runs, 286 wickets).`,

    contact: `Contact Lakhan Singh:
Email: lakhan.rajputaipm@gmail.com
Phone: +91 9711966555
Location: Noida, India
Website: lakhanrajputaipm.in
LinkedIn: linkedin.com/in/lakkhan-siingh-la0119

Open to building customer-focused AI and enterprise products.`
};

const intentMap = [
    { patterns: [/containment|68.*82|22m|22 million|journey analytics|singapore|hong kong/i], response: () => chatbotKnowledge.projectContainment + '\n\n' + chatbotKnowledge.experienceProtiviti },
    { patterns: [/credit card closure|card closure|stp|eligibility|self.service fulfil|closure journey/i], response: () => chatbotKnowledge.projectCardClosure },
    { patterns: [/hsbc|protiviti|conversational|digital banking|current (role|job|work)/i], response: () => chatbotKnowledge.experienceProtiviti + '\n\n' + chatbotKnowledge.projectContainment },
    { patterns: [/agentic|multi.agent|orchestration|tool calling|human.in.the.loop|agentic ai hrms/i], response: () => chatbotKnowledge.projectAgenticHRMS + '\n\n' + chatbotKnowledge.toolkit },
    { patterns: [/upi|merchant|payment gateway|npci|rbi|qr payment|25000|25,000/i], response: () => chatbotKnowledge.projectUPI },
    { patterns: [/hrms|52,?300|enterprise saas|healthcare.*platform|b2b hrms/i], response: () => chatbotKnowledge.projectHRMS + '\n\n' + chatbotKnowledge.experienceCloudsR },
    { patterns: [/45%|employee support|support quer|hr chatbot/i], response: () => chatbotKnowledge.projectAgenticHRMS },
    { patterns: [/shopping assistant|personal shopping|e.?commerce|1m\+|engagement.*15/i], response: () => chatbotKnowledge.projectShopping },
    { patterns: [/rtl|recruitment|recruiter|ats|business head|50\+/i], response: () => chatbotKnowledge.experienceRTL },
    { patterns: [/cloudsr|clouds r|jan 2022/i], response: () => chatbotKnowledge.experienceCloudsR },
    { patterns: [/three x|automotive|electronics product/i], response: () => chatbotKnowledge.experienceThreeX },
    { patterns: [/toolkit|skill|expertise|figma|rag|llm|prd|sit|uat/i], response: () => chatbotKnowledge.toolkit },
    { patterns: [/certif|fintech bootcamp|ai.driven|ai for product/i], response: () => chatbotKnowledge.certifications },
    { patterns: [/education|degree|b\.e\.|kalam|electronics.*communication/i], response: () => chatbotKnowledge.education },
    { patterns: [/cricket|cricheroes|wicket|700|17000|286/i], response: () => chatbotKnowledge.cricket },
    { patterns: [/beyond|hobby|extracurricular/i], response: () => chatbotKnowledge.cricket },
    { patterns: [/achievement|metric|kpi|nps|735|\$735|impact|selected impact/i], response: () => chatbotKnowledge.achievements + '\n\n' + chatbotKnowledge.summary },
    { patterns: [/value proposition|what.*bring|why hire/i], response: () => chatbotKnowledge.valueProposition },
    { patterns: [/contact|email|phone|9711966555|lakhanrajputaipm|reach|connect|linkedin|website|get in touch/i], response: () => chatbotKnowledge.contact },
    { patterns: [/project|featured|portfolio|product work|case stud/i], response: () => `Featured product work:\n\n${chatbotKnowledge.projectContainment}\n\n${chatbotKnowledge.projectCardClosure}\n\n${chatbotKnowledge.projectAgenticHRMS}\n\n${chatbotKnowledge.projectHRMS}\n\n${chatbotKnowledge.projectShopping}\n\n${chatbotKnowledge.projectUPI}` },
    { patterns: [/experience|career|resume|cv|work history|employment|12\+|twelve years/i], response: () => `${chatbotKnowledge.profile}\n\n${chatbotKnowledge.experienceProtiviti}\n\n${chatbotKnowledge.experienceCloudsR}\n\n${chatbotKnowledge.experienceRTL}\n\n${chatbotKnowledge.experienceThreeX}` },
    { patterns: [/about|who is|introduce|summary|overview|tell me about|lakhan singh|digital product manager/i], response: () => chatbotKnowledge.profile + '\n\n' + chatbotKnowledge.summary },
    { patterns: [/ai|machine learning|nlp|chatbot|conversational ai|generative ai|payments|fintech/i], response: () => chatbotKnowledge.toolkit + '\n\n' + chatbotKnowledge.projectContainment },
    { patterns: [/stakeholder|agile|scrum|sprint|backlog|roadmap/i], response: () => chatbotKnowledge.toolkit + '\n\n' + chatbotKnowledge.valueProposition },
    { patterns: [/salary|compensation|pay/i], response: () => "Salary information is not in the portfolio. Email lakhan.rajputaipm@gmail.com or call +91 9711966555." },
    { patterns: [/years of experience|how long|how many years/i], response: () => "Lakhan has 12+ years overall professional experience. Product leadership includes Protiviti/HSBC (Nov 2025-Present), CloudsR (Jan 2022-Nov 2025), RTL Technologies (2017-2022), and Three X Electronics (2014-2016)." }
];

const greetingResponses = [
    "Hello! I answer questions from Lakhan's portfolio: HSBC Conversational AI, Agentic AI HRMS, UPI gateway, impact metrics, experience, toolkit, or contact.",
    "Hi! Ask about Lakhan Singh - Digital Product Manager (Conversational AI, Agentic AI, Enterprise SaaS). 12+ years professional experience.",
    "Hey! Try 'What is the HSBC containment result?', 'Tell me about Agentic AI HRMS', or 'How do I contact Lakhan?'"
];

const defaultResponses = [
    "I can cover: 6 featured projects, 4 roles, selected impact metrics, product toolkit, certifications, cricket, or contact details.",
    "Ask about HSBC (68->82% containment), Agentic HRMS (45% automation), UPI gateway, shopping assistant (1M+ users), or lakhanrajputaipm.in.",
    "Try keywords like Protiviti, CloudsR, Agentic AI, UPI, HRMS, NPS, or stakeholder management."
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
        if (matchedKeywords.some(k => ['agentic', 'orchestration', 'multi-agent'].includes(k))) {
            return chatbotKnowledge.projectAgenticHRMS;
        }
        if (matchedKeywords.some(k => ['upi', 'merchant', 'payment', 'npci'].includes(k))) {
            return chatbotKnowledge.projectUPI;
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

// 3D tilt on cards (mouse)
document.querySelectorAll('[data-tilt]').forEach((card) => {
    const maxTilt = 10;

    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const rotateY = ((x / rect.width) - 0.5) * maxTilt * 2;
        const rotateX = ((0.5 - y / rect.height)) * maxTilt * 2;
        card.style.transform = `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(8px)`;
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = '';
    });
});

