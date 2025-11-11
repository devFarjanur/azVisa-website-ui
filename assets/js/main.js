// Main JavaScript File for Az Visa Consultancy
document.addEventListener('DOMContentLoaded', function () {
    initializeAllFunctions();
});

function initializeAllFunctions() {
    initializeNavigation();
    initializeHeaderEffects();
    initializeWhatsAppChatbot();
    initializeAnimations();
    initializeSmoothScrolling();
    initializeFAQAccordion();
    initializeLoginTabs();
}

// Mobile Navigation
function initializeNavigation() {
    const mobileToggle = document.getElementById('mobileToggle');
    const nav = document.getElementById('nav');

    if (mobileToggle && nav) {
        mobileToggle.addEventListener('click', () => {
            nav.classList.toggle('left-[-100%]');
            nav.classList.toggle('left-0');
        });

        // Close mobile menu when clicking on a link
        const navLinks = document.querySelectorAll('nav a');
        navLinks.forEach((link) => {
            link.addEventListener('click', () => {
                nav.classList.add('left-[-100%]');
                nav.classList.remove('left-0');
            });
        });
    }
}

// Header Scroll Effect
function initializeHeaderEffects() {
    const header = document.getElementById('header');

    if (header) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 100) {
                header.classList.add('bg-white', 'shadow-lg');
                header.classList.remove('bg-white/95', 'shadow-md');
            } else {
                header.classList.remove('bg-white', 'shadow-lg');
                header.classList.add('bg-white/95', 'shadow-md');
            }
        });
    }
}

// WhatsApp Chatbot
function initializeWhatsAppChatbot() {
    const whatsappToggle = document.getElementById('whatsappToggle');
    const whatsappChatbot = document.getElementById('whatsappChatbot');
    const closeChatbot = document.getElementById('closeChatbot');
    const chatMessages = document.getElementById('chatMessages');
    const chatInput = document.getElementById('chatInput');
    const sendMessage = document.getElementById('sendMessage');
    const quickReplies = document.querySelectorAll('.quick-reply');

    if (whatsappToggle && whatsappChatbot) {
        // Toggle chatbot visibility
        whatsappToggle.addEventListener('click', () => {
            whatsappChatbot.classList.toggle('open');
        });

        if (closeChatbot) {
            closeChatbot.addEventListener('click', () => {
                whatsappChatbot.classList.remove('open');
            });
        }

        // Close chatbot when clicking outside
        document.addEventListener('click', (e) => {
            if (
                whatsappChatbot.classList.contains('open') &&
                !whatsappChatbot.contains(e.target) &&
                !whatsappToggle.contains(e.target)
            ) {
                whatsappChatbot.classList.remove('open');
            }
        });

        // Send message functionality
        if (sendMessage && chatInput && chatMessages) {
            sendMessage.addEventListener('click', () => {
                const message = chatInput.value.trim();
                if (message) {
                    sendUserMessage(message);
                }
            });

            chatInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    const message = chatInput.value.trim();
                    if (message) {
                        sendUserMessage(message);
                    }
                }
            });
        }

        // Quick reply buttons
        if (quickReplies.length > 0) {
            quickReplies.forEach((button) => {
                button.addEventListener('click', () => {
                    const reply = button.getAttribute('data-reply');
                    sendUserMessage(reply);
                });
            });
        }
    }
}

// WhatsApp Message Function
function sendUserMessage(message) {
    const chatMessages = document.getElementById('chatMessages');
    const chatInput = document.getElementById('chatInput');

    if (!chatMessages) return;

    // Add user message
    const userMessage = document.createElement('div');
    userMessage.className = 'message user-message';
    userMessage.innerHTML = `<p>${message}</p>`;
    chatMessages.appendChild(userMessage);

    // Clear input
    if (chatInput) chatInput.value = '';

    // Scroll to bottom
    chatMessages.scrollTop = chatMessages.scrollHeight;

    // Show typing indicator
    const typingIndicator = document.createElement('div');
    typingIndicator.className = 'message bot-message';
    typingIndicator.id = 'typingIndicator';
    typingIndicator.innerHTML = `
        <div class="flex items-center">
            <div class="typing-indicator"></div>
            <div class="typing-indicator"></div>
            <div class="typing-indicator"></div>
        </div>
    `;
    chatMessages.appendChild(typingIndicator);
    chatMessages.scrollTop = chatMessages.scrollHeight;

    // Simulate bot response after delay
    setTimeout(() => {
        // Remove typing indicator
        const indicator = document.getElementById('typingIndicator');
        if (indicator) indicator.remove();

        // Add bot response
        const botMessage = document.createElement('div');
        botMessage.className = 'message bot-message';

        let response = '';
        if (message.toLowerCase().includes('requirement')) {
            response =
                'Visa requirements vary by country and visa type. For specific requirements, please contact our agents who can provide detailed information based on your destination and purpose of travel.';
        } else if (
            message.toLowerCase().includes('status') ||
            message.toLowerCase().includes('application')
        ) {
            response =
                'To check your application status, please use our online tracking system above or provide your reference number to our support team.';
        } else if (
            message.toLowerCase().includes('document') ||
            message.toLowerCase().includes('checklist')
        ) {
            response =
                'Common documents include passport, photographs, application forms, financial proofs, and supporting letters. The exact checklist depends on your destination country and visa type.';
        } else if (
            message.toLowerCase().includes('agent') ||
            message.toLowerCase().includes('human')
        ) {
            response =
                'I\'ll connect you with a human agent. Please wait a moment... <br><br> <a href="https://wa.me/+8801775282986" class="inline-block mt-2 py-2 px-4 bg-green-500 text-white rounded-lg font-semibold hover:bg-green-600 transition-colors" target="_blank">Chat with Agent on WhatsApp</a>';
        } else {
            response =
                'Thank you for your message. For detailed assistance with visa applications, requirements, or status checks, I recommend speaking with one of our visa specialists. Would you like me to connect you with an agent?';
        }

        botMessage.innerHTML = `<p>${response}</p>`;
        chatMessages.appendChild(botMessage);

        // Scroll to bottom
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }, 1500);
}

// Animations
function initializeAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px',
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                if (entry.target.classList.contains('stats')) {
                    animateCounter();
                    animateProgressBars();
                }
                entry.target.classList.add('fade-in-up');
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const elementsToAnimate = document.querySelectorAll(
        '.section-title, .mission, .services, .updates, .stats, .cta'
    );
    elementsToAnimate.forEach((el) => {
        if (el) observer.observe(el);
    });

    // Animate staggered elements immediately
    const staggeredElements = document.querySelectorAll('.stagger-animation > *');
    staggeredElements.forEach((el, index) => {
        if (el) el.style.animationDelay = `${index * 0.1}s`;
    });
}

// Smooth Scrolling
function initializeSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth',
                });
            }
        });
    });
}

// FAQ Accordion
function initializeFAQAccordion() {
    const accordionHeaders = document.querySelectorAll('.accordion-header');

    accordionHeaders.forEach((header) => {
        header.addEventListener('click', () => {
            const content = header.nextElementSibling;
            const isActive = header.classList.contains('active');

            // Close all accordions
            document.querySelectorAll('.accordion-header').forEach((h) => {
                h.classList.remove('active');
            });
            document.querySelectorAll('.accordion-content').forEach((c) => {
                c.classList.remove('active');
            });

            // Open clicked accordion if it wasn't active
            if (!isActive) {
                header.classList.add('active');
                content.classList.add('active');
            }
        });
    });
}

// Login/Registration Tabs
function initializeLoginTabs() {
    const loginTab = document.getElementById('loginTab');
    const registerTab = document.getElementById('registerTab');
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');

    if (loginTab && registerTab && loginForm && registerForm) {
        loginTab.addEventListener('click', () => {
            loginTab.classList.add('text-primary', 'border-primary');
            loginTab.classList.remove('text-gray-500');
            registerTab.classList.add('text-gray-500');
            registerTab.classList.remove('text-primary', 'border-primary');
            loginForm.classList.remove('hidden');
            registerForm.classList.add('hidden');
        });

        registerTab.addEventListener('click', () => {
            registerTab.classList.add('text-primary', 'border-primary');
            registerTab.classList.remove('text-gray-500');
            loginTab.classList.add('text-gray-500');
            loginTab.classList.remove('text-primary', 'border-primary');
            registerForm.classList.remove('hidden');
            loginForm.classList.add('hidden');
        });
    }
}

// Animated Counter for Stats
function animateCounter() {
    const counters = document.querySelectorAll('.stat-number');
    const speed = 200;

    counters.forEach((counter) => {
        const target = +counter.getAttribute('data-count');
        const count = +counter.innerText;
        const increment = target / speed;

        if (count < target) {
            counter.innerText = Math.ceil(count + increment);
            setTimeout(() => animateCounter(), 1);
        } else {
            counter.innerText = target;
        }
    });
}

// Progress Bar Animation
function animateProgressBars() {
    const progressBars = document.querySelectorAll('.progress-bar');
    progressBars.forEach((bar) => {
        const target = bar.getAttribute('data-target');
        bar.style.width = target + '%';
    });
}
