/**
 * Interactive Chatbot for HR Representatives
 * Provides instant information about Arijit Ray's professional background
 */

(function() {
    'use strict';

    // Chatbot Configuration
    const chatbotConfig = {
        responses: {
            // Technical Skills
            'skills': {
                keywords: ['skills', 'technical', 'technology', 'programming', 'expertise', 'languages'],
                response: `Arijit has 10+ years of experience with:

• .NET Framework/Core (C#, ASP.NET, MVC 5) - Expert level
• Python & AI/ML technologies - Advanced
• Angular framework - Proficient
• SQL Server & Database management - Expert
• Azure Cloud Platform (AZ-900 Certified) - Intermediate
• Hugging Face models & LLM integration (OpenAI, Groq)
• Streamsets for data pipelines
• JavaScript, jQuery, HTML/CSS`
            },

            'dotnet': {
                keywords: ['.net', 'dotnet', 'c#', 'csharp', 'asp.net', 'mvc'],
                response: `Arijit is an expert in .NET technologies:

• 10+ years with .NET Framework 4.5/4.8
• .NET Core development
• ASP.NET Web API development
• MVC 5 architecture
• Entity Framework Core
• Currently using these skills as Tech Lead at Cognizant for BNYM banking solutions`
            },

            'python': {
                keywords: ['python', 'ai', 'ml', 'machine learning', 'artificial intelligence', 'generative'],
                response: `Arijit has strong Python expertise:

• Generative AI project development
• Hugging Face models integration
• LLM models (OpenAI, Groq) integration
• ELIZA AI implementation
• Flask framework for web applications
• Currently applying Python/AI skills in Corporate Treasury Technology project`
            },

            // Experience & Career
            'experience': {
                keywords: ['experience', 'work', 'career', 'job', 'employment', 'companies'],
                response: `Arijit has 10+ years of progressive experience:

**Current Role (2022-Present):**
Senior Associate & Tech Lead at Cognizant Technology Solutions
- Leading team of 8 developers
- Working on Corporate Treasury Technology for BNYM
- Banking/Repo Markets domain

**Previous Roles:**
• Senior Backend Engineer at Preqin (2022)
• Senior Software Engineer at Healthasyst (2019-2022)
• Senior Systems Engineer at Infosys (2015-2019)

Strong track record in Banking, Healthcare, and Financial domains.`
            },

            'leadership': {
                keywords: ['lead', 'leadership', 'team', 'management', 'tech lead'],
                response: `Arijit has proven leadership experience:

• Currently serving as **Tech Lead** at Cognizant
• Managing team of **8 developers** in Corporate Treasury Technology
• Previously led team of 7 at Healthasyst for ECHOSOFT Web project
• Received multiple recognitions for leadership:
  - Recognition for resolving critical issues in Biztalk migration
  - Innovation award for Streamsets monitoring tool proposal
  - Multiple appreciations from BNYM for product development`
            },

            // Projects
            'projects': {
                keywords: ['projects', 'work', 'developed', 'built', 'created'],
                response: `Key projects in Arijit's portfolio:

**Corporate Treasury Technology (Current)**
- Banking system for BNYM with AI integration
- Using Python, ELIZA AI, Flask, C#

**Biztalk Migration Project (Humana)**
- Healthcare claims migration from Biztalk to .NET/Streamsets
- Handled authorization void/rebuild processes

**ECHOSOFT Web (ECHO Inc)**
- Healthcare claims payment management platform
- Angular + .NET Web API architecture

**MEDBTV (SunTrust Bank)**
- Loan status management system
- ASP.NET MVC with SQL Server`
            },

            // Education & Certifications
            'education': {
                keywords: ['education', 'degree', 'college', 'university', 'study', 'academic'],
                response: `Arijit's educational background:

**B.Tech in Electronics and Communication (ECE)**
- St. Thomas College of Engineering and Technology
- Under WBUT (2015)
- DGPA: 8.84 (Excellent performance)

**Academic Performance:**
- 12th Standard: 89% (Hariyana VidyaMandir, CBSE)
- 10th Standard: 92.6% (Aditya Academy, CBSE)

Strong academic foundation supporting his technical career.`
            },

            'certification': {
                keywords: ['certification', 'certified', 'azure', 'az-900'],
                response: `Arijit holds professional certifications:

**Microsoft Azure Fundamentals (AZ-900)**
- Cloud platform expertise
- Currently active certification

**Awards & Recognition:**
• Recognition for critical issue resolution in Biztalk migration
• Innovation award for Streamsets monitoring tool
• Multiple appreciations from BNYM for product development
• Team training recognition for Streamsets technology`
            },

            // Availability & Preferences
            'availability': {
                keywords: ['available', 'opportunity', 'hire', 'join', 'start', 'when'],
                response: `Arijit's availability status:

✅ **Open to new opportunities**
✅ Interested in challenging positions
✅ Passionate about AI/ML projects
✅ Prefers innovative technology roles

**Current Status:** Employed but open to the right opportunity
**Location:** Kolkata, India
**Work Preference:** Open to Remote/Hybrid/Onsite arrangements
**Ideal Role:** Tech Lead, Senior Engineer positions in AI/ML, .NET, or Banking/Healthcare domains`
            },

            'salary': {
                keywords: ['salary', 'compensation', 'pay', 'package', 'ctc'],
                response: `For salary and compensation discussions, please contact Arijit directly:

📧 **Email:** arijit.ray.dev@gmail.com
📱 **Phone:** +91 98765 43210

He's open to discussing competitive packages based on:
• Role responsibilities
• Company size and domain
• Technology stack alignment
• Growth opportunities

*Note: Salary expectations vary based on role complexity and organizational needs.*`
            },

            // Contact Information
            'contact': {
                keywords: ['contact', 'reach', 'email', 'phone', 'connect'],
                response: `Contact Information for Arijit Ray:

📧 **Email:** arijit.ray.dev@gmail.com
📱 **Phone:** +91 98765 43210
📍 **Location:** Kolkata, India

**Professional Profiles:**
• LinkedIn: linkedin.com/in/arijit-ray
• GitHub: github.com/arijit-ray
• Portfolio: Available online

**Best Contact Method:** Email for initial discussions
**Response Time:** Usually responds within 24 hours`
            },

            // Default and Help
            'help': {
                keywords: ['help', 'what', 'how', 'can', 'options'],
                response: `I can help you learn about Arijit Ray's professional background. Ask me about:

🔹 **Technical Skills** - Programming languages, frameworks, tools
🔹 **Work Experience** - Current role, previous companies, achievements
🔹 **Projects** - Key projects, technologies used, impact
🔹 **Education** - Academic background, certifications
🔹 **Leadership** - Team management, project leadership experience
🔹 **Availability** - Current status, preferences, contact info

**Sample Questions:**
• "What are his main technical skills?"
• "Tell me about his leadership experience"
• "What projects has he worked on?"
• "Is he available for new opportunities?"

Try asking about any of these topics!`
            }
        },

        fallbackResponses: [
            "I can help you learn about Arijit's skills, experience, projects, education, or availability. What specific information would you like to know?",
            "That's an interesting question! I can provide details about Arijit's technical expertise, work experience, or current availability. What would be most helpful?",
            "I'd be happy to help! You can ask me about Arijit's .NET/Python skills, leadership experience, recent projects, or contact information. What interests you most?",
            "Great question! I have comprehensive information about Arijit's 10+ year career, technical skills, and project experience. What specific area would you like to explore?"
        ],

        greetings: [
            "Hello! I'm here to help HR representatives learn about Arijit Ray's professional background.",
            "Hi there! I can provide detailed information about Arijit's technical skills, experience, and availability.",
            "Welcome! I'm your HR assistant for learning about Arijit Ray's career and expertise."
        ],

        typingDelay: 1000,
        maxMessageLength: 500
    };

    // DOM Elements
    const elements = {
        chatbotWidget: document.getElementById('chatbot-widget'),
        chatbotToggle: document.getElementById('chatbot-toggle'),
        chatbotContainer: document.getElementById('chatbot-container'),
        chatbotClose: document.getElementById('chatbot-close'),
        chatbotMessages: document.getElementById('chatbot-messages'),
        chatbotInput: document.getElementById('chatbot-input'),
        chatbotSend: document.getElementById('chatbot-send')
    };

    // Chatbot State
    let chatHistory = [];
    let isTyping = false;
    let messageCounter = 0;

    // Utility Functions
    const utils = {
        sanitizeInput: (input) => {
            const div = document.createElement('div');
            div.textContent = input;
            return div.innerHTML;
        },

        getRandomItem: (array) => {
            return array[Math.floor(Math.random() * array.length)];
        },

        findBestMatch: (input) => {
            const normalizedInput = input.toLowerCase();
            let bestMatch = null;
            let maxScore = 0;

            for (const [key, data] of Object.entries(chatbotConfig.responses)) {
                let score = 0;
                
                data.keywords.forEach(keyword => {
                    if (normalizedInput.includes(keyword)) {
                        score += keyword.length; // Longer keywords get higher priority
                    }
                });

                if (score > maxScore) {
                    maxScore = score;
                    bestMatch = data;
                }
            }

            return maxScore > 0 ? bestMatch : null;
        },

        addToHistory: (message, isUser = false) => {
            chatHistory.push({
                id: ++messageCounter,
                message: message,
                isUser: isUser,
                timestamp: new Date()
            });

            // Keep only last 50 messages for performance
            if (chatHistory.length > 50) {
                chatHistory = chatHistory.slice(-50);
            }
        },

        exportChatHistory: () => {
            const exportData = {
                conversation: chatHistory,
                exportTime: new Date().toISOString(),
                candidate: 'Arijit Ray',
                totalMessages: chatHistory.length
            };

            const blob = new Blob([JSON.stringify(exportData, null, 2)], {
                type: 'application/json'
            });

            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `arijit-ray-chat-${Date.now()}.json`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
        }
    };

    // Message Rendering
    const messageRenderer = {
        createMessageElement: (content, isUser = false) => {
            const messageDiv = document.createElement('div');
            messageDiv.className = `message ${isUser ? 'user-message' : 'bot-message'}`;
            
            const contentDiv = document.createElement('div');
            contentDiv.className = 'message-content';
            
            // Convert newlines to HTML and preserve formatting
            const formattedContent = content
                .replace(/\n/g, '<br>')
                .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                .replace(/\*(.*?)\*/g, '<em>$1</em>')
                .replace(/•/g, '<span class="bullet">•</span>');
            
            contentDiv.innerHTML = formattedContent;
            messageDiv.appendChild(contentDiv);

            return messageDiv;
        },

        addMessage: (content, isUser = false) => {
            if (!elements.chatbotMessages) return;

            const messageElement = this.createMessageElement(content, isUser);
            elements.chatbotMessages.appendChild(messageElement);
            
            // Scroll to bottom
            elements.chatbotMessages.scrollTop = elements.chatbotMessages.scrollHeight;
            
            // Add to history
            utils.addToHistory(content, isUser);
        },

        showTypingIndicator: () => {
            const typingDiv = document.createElement('div');
            typingDiv.className = 'message bot-message typing-indicator';
            typingDiv.id = 'typing-indicator';
            typingDiv.innerHTML = `
                <div class="message-content">
                    <div class="typing-dots">
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                </div>
            `;
            
            elements.chatbotMessages.appendChild(typingDiv);
            elements.chatbotMessages.scrollTop = elements.chatbotMessages.scrollHeight;
        },

        hideTypingIndicator: () => {
            const typingIndicator = document.getElementById('typing-indicator');
            if (typingIndicator) {
                typingIndicator.remove();
            }
        }
    };

    // Response Generation
    const responseGenerator = {
        generateResponse: (userInput) => {
            const match = utils.findBestMatch(userInput);
            
            if (match) {
                return match.response;
            }
            
            // Check for specific patterns
            if (this.isGreeting(userInput)) {
                return utils.getRandomItem(chatbotConfig.greetings);
            }
            
            if (this.isGoodbye(userInput)) {
                return "Thank you for your interest in Arijit Ray! Feel free to reach out directly at arijit.ray.dev@gmail.com for further discussions. Have a great day!";
            }
            
            // Fallback response
            return utils.getRandomItem(chatbotConfig.fallbackResponses);
        },

        isGreeting: (input) => {
            const greetings = ['hello', 'hi', 'hey', 'good morning', 'good afternoon', 'good evening'];
            const normalizedInput = input.toLowerCase();
            return greetings.some(greeting => normalizedInput.includes(greeting));
        },

        isGoodbye: (input) => {
            const goodbyes = ['bye', 'goodbye', 'thank you', 'thanks', 'see you'];
            const normalizedInput = input.toLowerCase();
            return goodbyes.some(goodbye => normalizedInput.includes(goodbye));
        }
    };

    // Chat Interface
    const chatInterface = {
        init: () => {
            if (!elements.chatbotWidget) return;

            // Event listeners
            elements.chatbotToggle?.addEventListener('click', chatInterface.toggleChat);
            elements.chatbotClose?.addEventListener('click', chatInterface.closeChat);
            elements.chatbotSend?.addEventListener('click', chatInterface.handleSendMessage);
            elements.chatbotInput?.addEventListener('keypress', chatInterface.handleKeyPress);
            elements.chatbotInput?.addEventListener('input', chatInterface.handleInputChange);

            // Add export button to chat header
            chatInterface.addExportButton();

            // Show initial greeting
            setTimeout(() => {
                messageRenderer.addMessage(utils.getRandomItem(chatbotConfig.greetings));
                
                // Show help message after greeting
                setTimeout(() => {
                    messageRenderer.addMessage(chatbotConfig.responses.help.response);
                }, 1500);
            }, 1000);

            console.log('Chatbot initialized successfully');
        },

        toggleChat: () => {
            if (elements.chatbotContainer) {
                const isActive = elements.chatbotContainer.classList.contains('active');
                
                if (isActive) {
                    chatInterface.closeChat();
                } else {
                    chatInterface.openChat();
                }
            }
        },

        openChat: () => {
            if (elements.chatbotContainer) {
                elements.chatbotContainer.classList.add('active');
                elements.chatbotInput?.focus();
                
                // Track analytics
                if (window.gtag) {
                    window.gtag('event', 'chatbot_opened', {
                        event_category: 'engagement'
                    });
                }
            }
        },

        closeChat: () => {
            if (elements.chatbotContainer) {
                elements.chatbotContainer.classList.remove('active');
            }
        },

        handleSendMessage: () => {
            const input = elements.chatbotInput?.value?.trim();
            if (input && !isTyping) {
                chatInterface.sendMessage(input);
            }
        },

        handleKeyPress: (e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                chatInterface.handleSendMessage();
            }
        },

        handleInputChange: (e) => {
            const input = e.target.value;
            const sendButton = elements.chatbotSend;
            
            if (sendButton) {
                if (input.trim() && !isTyping) {
                    sendButton.disabled = false;
                    sendButton.style.opacity = '1';
                } else {
                    sendButton.disabled = true;
                    sendButton.style.opacity = '0.6';
                }
            }
        },

        sendMessage: (message) => {
            if (message.length > chatbotConfig.maxMessageLength) {
                messageRenderer.addMessage('Please keep your message under 500 characters for better assistance.');
                return;
            }

            // Add user message
            messageRenderer.addMessage(utils.sanitizeInput(message), true);
            
            // Clear input
            if (elements.chatbotInput) {
                elements.chatbotInput.value = '';
                elements.chatbotSend.disabled = true;
                elements.chatbotSend.style.opacity = '0.6';
            }

            // Show typing indicator and generate response
            isTyping = true;
            messageRenderer.showTypingIndicator();

            setTimeout(() => {
                messageRenderer.hideTypingIndicator();
                const response = responseGenerator.generateResponse(message);
                messageRenderer.addMessage(response);
                isTyping = false;
                
                // Re-focus input
                elements.chatbotInput?.focus();
            }, chatbotConfig.typingDelay);
        },

        addExportButton: () => {
            const chatHeader = elements.chatbotContainer?.querySelector('.chatbot-header');
            if (chatHeader) {
                const exportButton = document.createElement('button');
                exportButton.className = 'btn btn-sm btn-outline-primary me-2';
                exportButton.innerHTML = '<i class="fas fa-download"></i>';
                exportButton.title = 'Export Chat History';
                exportButton.addEventListener('click', utils.exportChatHistory);
                
                const closeButton = chatHeader.querySelector('.chatbot-close');
                if (closeButton) {
                    chatHeader.insertBefore(exportButton, closeButton);
                }
            }
        }
    };

    // Quick Actions
    const quickActions = {
        init: () => {
            // Add quick action buttons to chat
            const actionsContainer = document.createElement('div');
            actionsContainer.className = 'quick-actions mt-3';
            actionsContainer.innerHTML = `
                <small class="text-muted d-block mb-2">Quick Questions:</small>
                <div class="d-flex flex-wrap gap-2">
                    <button class="btn btn-sm btn-outline-primary quick-action" data-message="What are his main technical skills?">
                        Skills
                    </button>
                    <button class="btn btn-sm btn-outline-primary quick-action" data-message="Tell me about his experience">
                        Experience
                    </button>
                    <button class="btn btn-sm btn-outline-primary quick-action" data-message="What projects has he worked on?">
                        Projects
                    </button>
                    <button class="btn btn-sm btn-outline-primary quick-action" data-message="Is he available for new opportunities?">
                        Availability
                    </button>
                </div>
            `;

            // Add to initial bot message
            setTimeout(() => {
                elements.chatbotMessages?.appendChild(actionsContainer);
                elements.chatbotMessages.scrollTop = elements.chatbotMessages.scrollHeight;

                // Add event listeners to quick action buttons
                actionsContainer.querySelectorAll('.quick-action').forEach(button => {
                    button.addEventListener('click', () => {
                        const message = button.getAttribute('data-message');
                        if (message && !isTyping) {
                            chatInterface.sendMessage(message);
                            actionsContainer.style.display = 'none'; // Hide after use
                        }
                    });
                });
            }, 3000);
        }
    };

    // Initialize chatbot when DOM is ready
    document.addEventListener('DOMContentLoaded', () => {
        chatInterface.init();
        quickActions.init();
    });

    // Add CSS for typing indicator and quick actions
    const style = document.createElement('style');
    style.textContent = `
        .typing-indicator .typing-dots {
            display: flex;
            gap: 4px;
            align-items: center;
        }

        .typing-indicator .typing-dots span {
            width: 8px;
            height: 8px;
            border-radius: 50%;
            background: var(--primary-color);
            animation: typing 1.4s infinite ease-in-out;
        }

        .typing-indicator .typing-dots span:nth-child(1) { animation-delay: 0s; }
        .typing-indicator .typing-dots span:nth-child(2) { animation-delay: 0.2s; }
        .typing-indicator .typing-dots span:nth-child(3) { animation-delay: 0.4s; }

        @keyframes typing {
            0%, 60%, 100% { transform: scale(1); opacity: 0.5; }
            30% { transform: scale(1.2); opacity: 1; }
        }

        .quick-actions .quick-action {
            font-size: 0.8rem;
            padding: 4px 8px;
            border-radius: 15px;
        }

        .bullet {
            color: var(--primary-color);
            font-weight: bold;
        }

        .message-content strong {
            color: var(--primary-color);
        }

        .message-content em {
            color: var(--secondary-color);
        }
    `;
    document.head.appendChild(style);

    // Export for debugging purposes
    window.ChatbotDebug = {
        chatHistory,
        config: chatbotConfig,
        utils,
        exportHistory: utils.exportChatHistory
    };

})();
