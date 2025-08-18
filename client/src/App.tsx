import { useEffect, useState } from "react";

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [chatbotOpen, setChatbotOpen] = useState(false);

  useEffect(() => {
    // Load external CSS files
    const stylesheets = [
      'https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css',
      'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css'
    ];

    stylesheets.forEach(href => {
      if (!document.querySelector(`link[href="${href}"]`)) {
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = href;
        document.head.appendChild(link);
      }
    });

    // Load external scripts
    const scripts = [
      'https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js',
      'https://code.jquery.com/jquery-3.7.1.min.js'
    ];

    const loadScript = (src: string) => {
      return new Promise((resolve, reject) => {
        if (document.querySelector(`script[src="${src}"]`)) {
          resolve(src);
          return;
        }
        const script = document.createElement('script');
        script.src = src;
        script.onload = () => resolve(src);
        script.onerror = () => reject(src);
        document.body.appendChild(script);
      });
    };

    // Load scripts and initialize portfolio functionality
    Promise.all(scripts.map(loadScript))
      .then(() => {
        initializePortfolio();
        setIsLoading(false);
      })
      .catch(console.error);
  }, []);

  const initializePortfolio = () => {
    // Loading screen hide
    setTimeout(() => {
      const loadingScreen = document.getElementById('loading-screen');
      if (loadingScreen) {
        loadingScreen.style.opacity = '0';
        setTimeout(() => {
          loadingScreen.style.display = 'none';
        }, 500);
      }
    }, 2000);

    // Particle animation
    createParticles();
    
    // Typewriter effect
    startTypewriter();
    
    // Skill bars animation
    animateSkillBars();
    
    // Theme toggle
    initializeThemeToggle();
    
    // Smooth scrolling
    initializeSmoothScrolling();
    
    // Project filtering
    initializeProjectFiltering();
    
    // Back to top button
    initializeBackToTop();
    
    // Floating animations
    startFloatingAnimations();
    
    // Contact form
    initializeContactForm();
    
    // Navbar transparency
    initializeNavbarScroll();
  };

  const createParticles = () => {
    const container = document.getElementById('particles-container');
    if (!container) return;

    for (let i = 0; i < 50; i++) {
      const particle = document.createElement('div');
      particle.className = 'particle';
      particle.style.left = Math.random() * 100 + '%';
      particle.style.top = Math.random() * 100 + '%';
      particle.style.animationDelay = Math.random() * 2 + 's';
      particle.style.animationDuration = (Math.random() * 3 + 2) + 's';
      container.appendChild(particle);
    }
  };

  const startTypewriter = () => {
    const text = "Hi, I'm Arijit Ray";
    const element = document.querySelector('.typewriter');
    if (!element) return;

    element.textContent = '';
    let i = 0;
    const timer = setInterval(() => {
      if (i < text.length) {
        element.textContent += text.charAt(i);
        i++;
      } else {
        clearInterval(timer);
      }
    }, 100);
  };

  const animateSkillBars = () => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const progressBar = entry.target.querySelector('.skill-progress') as HTMLElement;
          if (progressBar) {
            const width = progressBar.getAttribute('data-width');
            if (width) {
              progressBar.style.width = width + '%';
            }
          }
        }
      });
    });

    document.querySelectorAll('.skill-item').forEach(item => {
      observer.observe(item);
    });
  };

  const initializeThemeToggle = () => {
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;
    
    if (themeToggle) {
      themeToggle.addEventListener('click', () => {
        body.classList.toggle('light-theme');
        localStorage.setItem('theme', body.classList.contains('light-theme') ? 'light' : 'dark');
      });
    }

    // Load saved theme
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
      body.classList.add('light-theme');
    }
  };

  const initializeSmoothScrolling = () => {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const href = this.getAttribute('href');
        if (href && href !== '#') {
          const target = document.querySelector(href);
          if (target) {
            target.scrollIntoView({
              behavior: 'smooth',
              block: 'start'
            });
          }
        }
      });
    });
  };

  const initializeProjectFiltering = () => {
    const filterButtons = document.querySelectorAll('.btn-filter');
    const projectItems = document.querySelectorAll('.project-item');

    filterButtons.forEach(button => {
      button.addEventListener('click', () => {
        const filter = button.getAttribute('data-filter');
        
        // Update active button
        filterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        
        // Filter projects
        projectItems.forEach(item => {
          const categories = item.getAttribute('data-category') || '';
          if (filter === 'all' || categories.includes(filter || '')) {
            (item as HTMLElement).style.display = 'block';
          } else {
            (item as HTMLElement).style.display = 'none';
          }
        });
      });
    });
  };

  const initializeBackToTop = () => {
    const backToTop = document.getElementById('back-to-top');
    
    if (backToTop) {
      window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
          backToTop.style.display = 'flex';
        } else {
          backToTop.style.display = 'none';
        }
      });

      backToTop.addEventListener('click', () => {
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
      });
    }
  };

  const startFloatingAnimations = () => {
    const floatingElements = document.querySelectorAll('.floating-icon');
    floatingElements.forEach((element, index) => {
      (element as HTMLElement).style.animationDelay = (index * 0.5) + 's';
    });
  };

  const initializeContactForm = () => {
    const form = document.getElementById('contact-form');
    
    if (form) {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Simple form validation
        const name = (document.getElementById('contact-name') as HTMLInputElement)?.value;
        const email = (document.getElementById('contact-email') as HTMLInputElement)?.value;
        const subject = (document.getElementById('contact-subject') as HTMLInputElement)?.value;
        const message = (document.getElementById('contact-message') as HTMLTextAreaElement)?.value;
        
        if (!name || !email || !subject || !message) {
          alert('Please fill in all fields');
          return;
        }
        
        // Simulate form submission
        alert('Thank you for your message! I will get back to you soon.');
        form.reset();
      });
    }
  };

  const initializeNavbarScroll = () => {
    const navbar = document.getElementById('navbar');
    
    window.addEventListener('scroll', () => {
      if (navbar) {
        if (window.scrollY > 50) {
          navbar.classList.add('scrolled');
        } else {
          navbar.classList.remove('scrolled');
        }
      }
    });
  };

  const toggleChatbot = () => {
    setChatbotOpen(!chatbotOpen);
  };

  const handleChatbotSend = () => {
    const input = document.getElementById('chatbot-input') as HTMLInputElement;
    const messagesContainer = document.getElementById('chatbot-messages');
    
    if (!input || !messagesContainer) return;
    
    const message = input.value.trim();
    if (!message) return;
    
    // Add user message
    const userMessage = document.createElement('div');
    userMessage.className = 'chatbot-message user-message';
    userMessage.innerHTML = `<p>${message}</p>`;
    messagesContainer.appendChild(userMessage);
    
    // Add bot response
    setTimeout(() => {
      const botMessage = document.createElement('div');
      botMessage.className = 'chatbot-message bot-message';
      botMessage.innerHTML = `<p>${getChatbotResponse(message)}</p>`;
      messagesContainer.appendChild(botMessage);
      messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }, 1000);
    
    input.value = '';
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
  };

  const getChatbotResponse = (message: string): string => {
    const lowerMessage = message.toLowerCase();
    
    if (lowerMessage.includes('experience') || lowerMessage.includes('years')) {
      return "Arijit has 10+ years of experience in software development, specializing in .NET, Python, Angular, and AI technologies. He's currently a Tech Lead at Cognizant.";
    }
    
    if (lowerMessage.includes('skills') || lowerMessage.includes('technologies')) {
      return "His core skills include .NET Framework/Core, Python, Angular, SQL Server, Azure Cloud Platform, and AI/ML technologies. He's also certified in Azure Fundamentals (AZ-900).";
    }
    
    if (lowerMessage.includes('current') || lowerMessage.includes('job') || lowerMessage.includes('role')) {
      return "Arijit currently works as a Senior Associate & Tech Lead at Cognizant Technology Solutions, leading a team of 8 developers in Corporate Treasury Technology for BNYM.";
    }
    
    if (lowerMessage.includes('education') || lowerMessage.includes('degree')) {
      return "He holds a B.Tech in Electronics and Communication Engineering from St. Thomas College of Engineering and Technology with a DGPA of 8.84.";
    }
    
    if (lowerMessage.includes('projects') || lowerMessage.includes('work')) {
      return "Notable projects include Corporate Treasury Technology for BNYM with AI integration, Healthcare claims systems, and Banking loan management systems.";
    }
    
    if (lowerMessage.includes('contact') || lowerMessage.includes('reach')) {
      return "You can reach Arijit at arijit.ray.dev@gmail.com or connect with him on LinkedIn. He's based in Kolkata, India and open to new opportunities.";
    }
    
    return "I can help you learn about Arijit's experience, skills, projects, education, or contact information. What would you like to know?";
  };

  return (
    <div>
      {/* Loading Screen */}
      <div id="loading-screen" className="loading-screen">
        <div className="loading-content">
          <div className="loading-spinner"></div>
          <h3 className="loading-text">Loading Portfolio...</h3>
        </div>
      </div>

      {/* Particle Background */}
      <div className="particles" id="particles-container"></div>

      {/* Navigation */}
      <nav id="navbar" className="navbar navbar-expand-lg fixed-top glass-nav">
        <div className="container">
          <a className="navbar-brand fw-bold" href="#home" data-testid="nav-brand">
            <span className="text-primary">Arijit</span><span className="text-white"> Ray</span>
          </a>
          
          {/* Theme Toggle */}
          <div className="d-flex align-items-center me-3">
            <div className="theme-toggle" id="theme-toggle" data-testid="theme-toggle">
              <i className="fas fa-sun theme-icon sun-icon"></i>
              <i className="fas fa-moon theme-icon moon-icon"></i>
              <div className="toggle-slider"></div>
            </div>
          </div>

          <button className="navbar-toggler border-0" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation" data-testid="nav-toggle">
            <span className="navbar-toggler-icon">
              <i className="fas fa-bars text-white"></i>
            </span>
          </button>
          
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <a className="nav-link smooth-scroll" href="#home" data-testid="nav-home">Home</a>
              </li>
              <li className="nav-item">
                <a className="nav-link smooth-scroll" href="#about" data-testid="nav-about">About</a>
              </li>
              <li className="nav-item">
                <a className="nav-link smooth-scroll" href="#projects" data-testid="nav-projects">Projects</a>
              </li>
              <li className="nav-item">
                <a className="nav-link smooth-scroll" href="#experience" data-testid="nav-experience">Experience</a>
              </li>
              <li className="nav-item">
                <a className="nav-link smooth-scroll" href="#education" data-testid="nav-education">Education</a>
              </li>
              <li className="nav-item">
                <a className="nav-link smooth-scroll" href="#contact" data-testid="nav-contact">Contact</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="hero-section min-vh-100 d-flex align-items-center position-relative">
        <div className="container">
          <div className="row justify-content-center text-center">
            <div className="col-lg-10">
              <div className="hero-content">
                <h1 className="hero-title mb-4" data-testid="hero-title">
                  <span className="typewriter">Hi, I'm Arijit Ray</span>
                </h1>
                <p className="hero-subtitle mb-4 text-primary" data-testid="hero-subtitle">
                  Building Tomorrow's Software Today
                </p>
                <p className="hero-description mb-5" data-testid="hero-description">
                  Senior Software Engineer with <span className="text-secondary">10+ years</span> of experience in 
                  <span className="text-primary"> .NET</span>, <span className="text-secondary">Python</span>, 
                  <span className="text-primary"> Angular</span>, and cutting-edge <span className="text-secondary">AI technologies</span>
                </p>
                
                <div className="hero-buttons d-flex gap-3 justify-content-center flex-wrap">
                  <a href="#contact" className="btn btn-neon btn-lg px-4 py-3 smooth-scroll" data-testid="btn-contact">
                    <i className="fas fa-envelope me-2"></i>Get In Touch
                  </a>
                  <a href="#projects" className="btn btn-outline-primary btn-lg px-4 py-3 smooth-scroll" data-testid="btn-projects">
                    <i className="fas fa-code me-2"></i>View My Work
                  </a>
                  <a href="assets/resume.pdf" className="btn btn-glass btn-lg px-4 py-3" target="_blank" data-testid="btn-resume">
                    <i className="fas fa-download me-2"></i>Download Resume
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Floating Elements */}
        <div className="floating-elements">
          <div className="floating-icon" style={{top: '20%', left: '10%'}}>
            <i className="fab fa-python"></i>
          </div>
          <div className="floating-icon" style={{top: '30%', right: '15%'}}>
            <i className="fab fa-angular"></i>
          </div>
          <div className="floating-icon" style={{bottom: '30%', left: '20%'}}>
            <i className="fas fa-brain"></i>
          </div>
          <div className="floating-icon" style={{bottom: '20%', right: '10%'}}>
            <i className="fab fa-microsoft"></i>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="section-padding">
        <div className="container">
          <div className="row">
            <div className="col-12 text-center mb-5">
              <h2 className="section-title" data-testid="about-title">About Me</h2>
              <div className="section-divider"></div>
            </div>
          </div>
          
          <div className="row align-items-center">
            <div className="col-lg-6 mb-4">
              <div className="glass-card p-4 neon-border h-100" data-testid="about-summary">
                <h3 className="text-primary mb-3">
                  <i className="fas fa-user-tie me-3"></i>Professional Summary
                </h3>
                <p className="text-light mb-4">
                  Having <strong>10+ Years</strong> of experience in designing, developing and deploying web-based applications through .NET Framework 4.5/4.8 (C#, ASP.NET, MVC 5), .NET Core, Angular framework and MS-SQL Server 2008/2012.
                </p>
                <p className="text-light mb-4">
                  <strong>Certified in Azure Fundamentals (AZ-900)</strong> and passionate about emerging AI technologies. I am deeply invested in Generative AI projects and prefer to take part in such innovative initiatives.
                </p>
                <p className="text-light mb-4">
                  As a professional, I am creative and innovative, looking ahead to work in challenging atmospheres and strive for excellence. Currently serving as <strong>Tech Lead</strong> at Cognizant Technology Solutions.
                </p>
                
                <div className="d-flex gap-3 flex-wrap">
                  <span className="badge bg-primary fs-6">Tech Lead</span>
                  <span className="badge bg-secondary fs-6">Azure Certified</span>
                  <span className="badge bg-success fs-6">AI Enthusiast</span>
                </div>
              </div>
            </div>
            
            <div className="col-lg-6">
              <div className="glass-card p-4" data-testid="skills-section">
                <h3 className="text-primary mb-4">
                  <i className="fas fa-code me-3"></i>Technical Skills
                </h3>
                
                <div className="skill-item mb-4">
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <span className="skill-name">.NET Framework & Core</span>
                    <span className="skill-percentage text-primary">95%</span>
                  </div>
                  <div className="skill-bar">
                    <div className="skill-progress" data-width="95"></div>
                  </div>
                </div>
                
                <div className="skill-item mb-4">
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <span className="skill-name">Python & AI/ML</span>
                    <span className="skill-percentage text-primary">90%</span>
                  </div>
                  <div className="skill-bar">
                    <div className="skill-progress" data-width="90"></div>
                  </div>
                </div>
                
                <div className="skill-item mb-4">
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <span className="skill-name">Angular & Frontend</span>
                    <span className="skill-percentage text-primary">85%</span>
                  </div>
                  <div className="skill-bar">
                    <div className="skill-progress" data-width="85"></div>
                  </div>
                </div>
                
                <div className="skill-item mb-4">
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <span className="skill-name">SQL Server & Databases</span>
                    <span className="skill-percentage text-primary">90%</span>
                  </div>
                  <div className="skill-bar">
                    <div className="skill-progress" data-width="90"></div>
                  </div>
                </div>
                
                <div className="skill-item mb-4">
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <span className="skill-name">Azure Cloud Platform</span>
                    <span className="skill-percentage text-primary">80%</span>
                  </div>
                  <div className="skill-bar">
                    <div className="skill-progress" data-width="80"></div>
                  </div>
                </div>
                
                <div className="skill-item">
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <span className="skill-name">Hugging Face & LLM Integration</span>
                    <span className="skill-percentage text-primary">75%</span>
                  </div>
                  <div className="skill-bar">
                    <div className="skill-progress" data-width="75"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="section-padding">
        <div className="container">
          <div className="row">
            <div className="col-12 text-center mb-5">
              <h2 className="section-title" data-testid="projects-title">Featured Projects</h2>
              <div className="section-divider"></div>
            </div>
          </div>
          
          {/* Filter Buttons */}
          <div className="row mb-5">
            <div className="col-12 text-center">
              <div className="project-filters d-flex gap-2 justify-content-center flex-wrap">
                <button className="btn btn-filter active" data-filter="all" data-testid="filter-all">All</button>
                <button className="btn btn-filter" data-filter="enterprise" data-testid="filter-enterprise">Enterprise</button>
                <button className="btn btn-filter" data-filter="ai" data-testid="filter-ai">AI/ML</button>
                <button className="btn btn-filter" data-filter="web" data-testid="filter-web">Web Apps</button>
                <button className="btn btn-filter" data-filter="banking" data-testid="filter-banking">Banking</button>
                <button className="btn btn-filter" data-filter="healthcare" data-testid="filter-healthcare">Healthcare</button>
              </div>
            </div>
          </div>
          
          {/* Projects Grid */}
          <div className="row g-4">
            {/* Project 1 - Corporate Treasury Technology */}
            <div className="col-lg-4 col-md-6 project-item" data-category="enterprise banking ai">
              <div className="glass-card project-card h-100 neon-border" data-testid="project-treasury">
                <div className="project-image">
                  <img src="https://images.unsplash.com/photo-1559589689-577aabd1db4f?w=400&h=250&fit=crop" alt="Corporate Treasury Technology" className="img-fluid" />
                  <div className="project-overlay">
                    <div className="project-links">
                      <a href="#" className="btn btn-neon btn-sm" data-testid="btn-demo-treasury">
                        <i className="fas fa-eye"></i> View
                      </a>
                    </div>
                  </div>
                </div>
                <div className="p-4">
                  <h4 className="project-title text-primary">Corporate Treasury Technology</h4>
                  <div className="project-meta">
                    <small className="text-muted">
                      <i className="fas fa-building me-1"></i>BNYM • 
                      <i className="fas fa-calendar me-1"></i>2022 - Present • 
                      <i className="fas fa-users me-1"></i>Tech Lead
                    </small>
                  </div>
                  <p className="project-description">
                    Banking system for Bank of New York Mellon with AI integration. Leading a team of 8 developers in Corporate Treasury Technology, implementing ELIZA AI and modern .NET solutions for repo markets.
                  </p>
                  <div className="project-tech">
                    <span className="tech-badge">Python</span>
                    <span className="tech-badge">ELIZA AI</span>
                    <span className="tech-badge">Flask</span>
                    <span className="tech-badge">C#</span>
                    <span className="tech-badge">SQL Server</span>
                    <span className="tech-badge">Banking</span>
                  </div>
                  <div className="project-stats">
                    <span className="stat-item"><i className="fas fa-users text-primary"></i> Team Lead (8 devs)</span>
                    <span className="stat-item"><i className="fas fa-trophy text-secondary"></i> Recognition Award</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Project 2 - Biztalk Migration */}
            <div className="col-lg-4 col-md-6 project-item" data-category="enterprise healthcare">
              <div className="glass-card project-card h-100 neon-border" data-testid="project-biztalk">
                <div className="project-image">
                  <img src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=400&h=250&fit=crop" alt="Biztalk Migration Project" className="img-fluid" />
                  <div className="project-overlay">
                    <div className="project-links">
                      <a href="#" className="btn btn-neon btn-sm" data-testid="btn-demo-biztalk">
                        <i className="fas fa-eye"></i> View
                      </a>
                    </div>
                  </div>
                </div>
                <div className="p-4">
                  <h4 className="project-title text-primary">Biztalk Migration Project</h4>
                  <div className="project-meta">
                    <small className="text-muted">
                      <i className="fas fa-hospital me-1"></i>Humana • 
                      <i className="fas fa-calendar me-1"></i>2022 • 
                      <i className="fas fa-code me-1"></i>Senior Developer
                    </small>
                  </div>
                  <p className="project-description">
                    Healthcare claims migration from Biztalk to .NET and Streamsets. Implemented "Void and Rebuild" authorization processes and developed data pipelines for clinical guidance exchange.
                  </p>
                  <div className="project-tech">
                    <span className="tech-badge">.NET</span>
                    <span className="tech-badge">Streamsets</span>
                    <span className="tech-badge">JavaScript</span>
                    <span className="tech-badge">SQL Server</span>
                    <span className="tech-badge">Healthcare</span>
                  </div>
                  <div className="project-stats">
                    <span className="stat-item"><i className="fas fa-award text-primary"></i> Innovation Award</span>
                    <span className="stat-item"><i className="fas fa-users text-secondary"></i> Team Training</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Project 3 - ECHOSOFT Web */}
            <div className="col-lg-4 col-md-6 project-item" data-category="web healthcare enterprise">
              <div className="glass-card project-card h-100 neon-border" data-testid="project-echosoft">
                <div className="project-image">
                  <img src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=250&fit=crop" alt="ECHOSOFT Web Application" className="img-fluid" />
                  <div className="project-overlay">
                    <div className="project-links">
                      <a href="#" className="btn btn-neon btn-sm" data-testid="btn-demo-echosoft">
                        <i className="fas fa-eye"></i> View
                      </a>
                    </div>
                  </div>
                </div>
                <div className="p-4">
                  <h4 className="project-title text-primary">ECHOSOFT Web</h4>
                  <div className="project-meta">
                    <small className="text-muted">
                      <i className="fas fa-building me-1"></i>ECHO Inc • 
                      <i className="fas fa-calendar me-1"></i>2019-2022 • 
                      <i className="fas fa-layers me-1"></i>Full Stack Engineer
                    </small>
                  </div>
                  <p className="project-description">
                    Healthcare claims payment management tool for third-party administrators. 3-tier web application with Angular frontend and .NET Web API backend for claims processing and payment management.
                  </p>
                  <div className="project-tech">
                    <span className="tech-badge">Angular 4</span>
                    <span className="tech-badge">ASP.NET Web API</span>
                    <span className="tech-badge">C#</span>
                    <span className="tech-badge">TypeScript</span>
                    <span className="tech-badge">SQL Server 2012</span>
                  </div>
                  <div className="project-stats">
                    <span className="stat-item"><i className="fas fa-chart-line text-primary"></i> Performance Optimized</span>
                    <span className="stat-item"><i className="fas fa-cogs text-secondary"></i> 3-tier Architecture</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Project 4 - MEDBTV Banking System */}
            <div className="col-lg-4 col-md-6 project-item" data-category="banking web enterprise">
              <div className="glass-card project-card h-100 neon-border" data-testid="project-medbtv">
                <div className="project-image">
                  <img src="https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400&h=250&fit=crop" alt="MEDBTV Banking System" className="img-fluid" />
                  <div className="project-overlay">
                    <div className="project-links">
                      <a href="#" className="btn btn-neon btn-sm" data-testid="btn-demo-medbtv">
                        <i className="fas fa-eye"></i> View
                      </a>
                    </div>
                  </div>
                </div>
                <div className="p-4">
                  <h4 className="project-title text-primary">MEDBTV Loan Management</h4>
                  <div className="project-meta">
                    <small className="text-muted">
                      <i className="fas fa-university me-1"></i>SunTrust Bank • 
                      <i className="fas fa-calendar me-1"></i>2015-2019 • 
                      <i className="fas fa-code me-1"></i>System Engineer
                    </small>
                  </div>
                  <p className="project-description">
                    Loan status management system for SunTrust Bank. Developed to help loan officers track and manage loan statuses by integrating with the MEDB loan database for real-time information access.
                  </p>
                  <div className="project-tech">
                    <span className="tech-badge">ASP.NET MVC</span>
                    <span className="tech-badge">C#</span>
                    <span className="tech-badge">JavaScript</span>
                    <span className="tech-badge">AJAX</span>
                    <span className="tech-badge">SQL Server 2012</span>
                  </div>
                  <div className="project-stats">
                    <span className="stat-item"><i className="fas fa-database text-primary"></i> Real-time Data</span>
                    <span className="stat-item"><i className="fas fa-users text-secondary"></i> Multi-user System</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Project 5 - AI Portfolio Chatbot */}
            <div className="col-lg-4 col-md-6 project-item" data-category="ai web">
              <div className="glass-card project-card h-100 neon-border" data-testid="project-chatbot">
                <div className="project-image">
                  <img src="https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=250&fit=crop" alt="AI Portfolio Chatbot" className="img-fluid" />
                  <div className="project-overlay">
                    <div className="project-links">
                      <a href="#" className="btn btn-neon btn-sm" data-testid="btn-demo-chatbot">
                        <i className="fas fa-eye"></i> Demo
                      </a>
                    </div>
                  </div>
                </div>
                <div className="p-4">
                  <h4 className="project-title text-primary">Portfolio HR Chatbot</h4>
                  <div className="project-meta">
                    <small className="text-muted">
                      <i className="fas fa-robot me-1"></i>Personal Project • 
                      <i className="fas fa-calendar me-1"></i>2024 • 
                      <i className="fas fa-brain me-1"></i>AI Integration
                    </small>
                  </div>
                  <p className="project-description">
                    Interactive AI chatbot for HR representatives with natural language processing. Provides instant information about professional background, skills, and experience using advanced AI technologies.
                  </p>
                  <div className="project-tech">
                    <span className="tech-badge">JavaScript</span>
                    <span className="tech-badge">NLP</span>
                    <span className="tech-badge">AI/ML</span>
                    <span className="tech-badge">HTML5</span>
                    <span className="tech-badge">CSS3</span>
                  </div>
                  <div className="project-stats">
                    <span className="stat-item"><i className="fas fa-comments text-primary"></i> Interactive Chat</span>
                    <span className="stat-item"><i className="fas fa-download text-secondary"></i> Export Feature</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Project 6 - Streamsets Monitoring Tool */}
            <div className="col-lg-4 col-md-6 project-item" data-category="enterprise">
              <div className="glass-card project-card h-100 neon-border" data-testid="project-streamsets">
                <div className="project-image">
                  <img src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=250&fit=crop" alt="Streamsets Monitoring Tool" className="img-fluid" />
                  <div className="project-overlay">
                    <div className="project-links">
                      <a href="#" className="btn btn-neon btn-sm" data-testid="btn-demo-streamsets">
                        <i className="fas fa-eye"></i> View
                      </a>
                    </div>
                  </div>
                </div>
                <div className="p-4">
                  <h4 className="project-title text-primary">Streamsets Monitoring Tool</h4>
                  <div className="project-meta">
                    <small className="text-muted">
                      <i className="fas fa-lightbulb me-1"></i>Innovation Project • 
                      <i className="fas fa-calendar me-1"></i>2022 • 
                      <i className="fas fa-chart-line me-1"></i>Data Pipeline
                    </small>
                  </div>
                  <p className="project-description">
                    Innovative monitoring solution for Streamsets data pipelines. Proposed and designed tool for real-time pipeline monitoring and alerting, recognized under innovations category by client.
                  </p>
                  <div className="project-tech">
                    <span className="tech-badge">Streamsets</span>
                    <span className="tech-badge">Data Pipeline</span>
                    <span className="tech-badge">Monitoring</span>
                    <span className="tech-badge">Real-time</span>
                    <span className="tech-badge">Analytics</span>
                  </div>
                  <div className="project-stats">
                    <span className="stat-item"><i className="fas fa-award text-primary"></i> Innovation Award</span>
                    <span className="stat-item"><i className="fas fa-thumbs-up text-secondary"></i> Client Approved</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="section-padding">
        <div className="container">
          <div className="row">
            <div className="col-12 text-center mb-5">
              <h2 className="section-title" data-testid="experience-title">Professional Experience</h2>
              <div className="section-divider"></div>
            </div>
          </div>
          
          <div className="timeline">
            {/* Current Role */}
            <div className="timeline-item">
              <div className="timeline-marker">
                <i className="fas fa-crown"></i>
              </div>
              <div className="timeline-content">
                <div className="glass-card timeline-card neon-border">
                  <div className="timeline-header">
                    <h4 className="text-primary mb-2">Senior Associate & Tech Lead</h4>
                    <h5 className="text-secondary mb-3">Cognizant Technology Solutions</h5>
                    <div className="timeline-meta">
                      <span className="timeline-date">
                        <i className="fas fa-calendar me-1"></i>June 2022 - Present
                      </span>
                      <span className="timeline-location">
                        <i className="fas fa-map-marker-alt me-1"></i>Banking Domain
                      </span>
                    </div>
                  </div>
                  
                  <div className="timeline-achievements">
                    <h6 className="text-light mb-3">Key Achievements:</h6>
                    <ul className="text-light">
                      <li>Leading team of 8 developers in Corporate Treasury Technology for BNYM</li>
                      <li>Implementing AI solutions with ELIZA AI and Python for banking systems</li>
                      <li>Working on repo markets domain with advanced .NET technologies</li>
                      <li>Received multiple appreciations for product development from BNYM</li>
                      <li>Managing full-stack development with modern architectures</li>
                    </ul>
                  </div>
                  
                  <div className="timeline-tech">
                    <span className="tech-badge">Python</span>
                    <span className="tech-badge">ELIZA AI</span>
                    <span className="tech-badge">Flask</span>
                    <span className="tech-badge">C#</span>
                    <span className="tech-badge">SQL Server</span>
                    <span className="tech-badge">Banking</span>
                    <span className="tech-badge">Team Leadership</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Previous Role 1 */}
            <div className="timeline-item">
              <div className="timeline-marker">
                <i className="fas fa-code"></i>
              </div>
              <div className="timeline-content">
                <div className="glass-card timeline-card neon-border">
                  <div className="timeline-header">
                    <h4 className="text-primary mb-2">Senior Backend Engineer</h4>
                    <h5 className="text-secondary mb-3">Preqin</h5>
                    <div className="timeline-meta">
                      <span className="timeline-date">
                        <i className="fas fa-calendar me-1"></i>February 2022 - April 2022
                      </span>
                      <span className="timeline-location">
                        <i className="fas fa-map-marker-alt me-1"></i>Financial Data
                      </span>
                    </div>
                  </div>
                  
                  <div className="timeline-achievements">
                    <h6 className="text-light mb-3">Role Focus:</h6>
                    <ul className="text-light">
                      <li>Backend development for financial data platforms</li>
                      <li>API development and database optimization</li>
                      <li>Performance tuning and scalability improvements</li>
                      <li>Integration with third-party financial data sources</li>
                    </ul>
                  </div>
                  
                  <div className="timeline-tech">
                    <span className="tech-badge">.NET Core</span>
                    <span className="tech-badge">API Development</span>
                    <span className="tech-badge">Financial Data</span>
                    <span className="tech-badge">Backend</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Previous Role 2 */}
            <div className="timeline-item">
              <div className="timeline-marker">
                <i className="fas fa-layer-group"></i>
              </div>
              <div className="timeline-content">
                <div className="glass-card timeline-card neon-border">
                  <div className="timeline-header">
                    <h4 className="text-primary mb-2">Senior Software Engineer</h4>
                    <h5 className="text-secondary mb-3">Healthasyst Pvt Ltd</h5>
                    <div className="timeline-meta">
                      <span className="timeline-date">
                        <i className="fas fa-calendar me-1"></i>January 2019 - January 2022
                      </span>
                      <span className="timeline-location">
                        <i className="fas fa-map-marker-alt me-1"></i>Healthcare Technology
                      </span>
                    </div>
                  </div>
                  
                  <div className="timeline-achievements">
                    <h6 className="text-light mb-3">Key Achievements:</h6>
                    <ul className="text-light">
                      <li>Led development of ECHOSOFT Web - healthcare claims payment management</li>
                      <li>Managed team of 7 developers in full-stack development</li>
                      <li>Architected 3-tier web application with Angular and .NET Web API</li>
                      <li>Optimized database performance and implemented new modules</li>
                      <li>Handled deployment and production environment management</li>
                    </ul>
                  </div>
                  
                  <div className="timeline-tech">
                    <span className="tech-badge">Angular 4</span>
                    <span className="tech-badge">ASP.NET Web API</span>
                    <span className="tech-badge">C#</span>
                    <span className="tech-badge">TypeScript</span>
                    <span className="tech-badge">SQL Server</span>
                    <span className="tech-badge">Healthcare</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Previous Role 3 */}
            <div className="timeline-item">
              <div className="timeline-marker">
                <i className="fas fa-laptop-code"></i>
              </div>
              <div className="timeline-content">
                <div className="glass-card timeline-card neon-border">
                  <div className="timeline-header">
                    <h4 className="text-primary mb-2">Senior Systems Engineer</h4>
                    <h5 className="text-secondary mb-3">Infosys Pvt Ltd</h5>
                    <div className="timeline-meta">
                      <span className="timeline-date">
                        <i className="fas fa-calendar me-1"></i>August 2015 - January 2019
                      </span>
                      <span className="timeline-location">
                        <i className="fas fa-map-marker-alt me-1"></i>Banking Solutions
                      </span>
                    </div>
                  </div>
                  
                  <div className="timeline-achievements">
                    <h6 className="text-light mb-3">Key Achievements:</h6>
                    <ul className="text-light">
                      <li>Developed MEDBTV loan management system for SunTrust Bank</li>
                      <li>Implemented real-time loan status tracking and reporting</li>
                      <li>Created stored procedures and database optimization solutions</li>
                      <li>Performed analysis, design, coding and implementation</li>
                      <li>Conducted comprehensive unit testing and quality assurance</li>
                    </ul>
                  </div>
                  
                  <div className="timeline-tech">
                    <span className="tech-badge">ASP.NET MVC</span>
                    <span className="tech-badge">C#</span>
                    <span className="tech-badge">JavaScript</span>
                    <span className="tech-badge">SQL Server</span>
                    <span className="tech-badge">Banking</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Education Section */}
      <section id="education" className="section-padding">
        <div className="container">
          <div className="row">
            <div className="col-12 text-center mb-5">
              <h2 className="section-title" data-testid="education-title">Education & Certifications</h2>
              <div className="section-divider"></div>
            </div>
          </div>
          
          <div className="row">
            <div className="col-lg-6 mb-4">
              <div className="glass-card p-4 neon-border h-100">
                <h3 className="text-primary mb-4">
                  <i className="fas fa-graduation-cap me-3"></i>Education
                </h3>
                
                <div className="education-item">
                  <div className="d-flex align-items-start gap-3">
                    <div className="education-icon text-primary">
                      <i className="fas fa-university"></i>
                    </div>
                    <div className="flex-grow-1">
                      <h5 className="text-light mb-2">Bachelor of Technology (B.Tech)</h5>
                      <p className="text-secondary mb-2">Electronics and Communication Engineering (ECE)</p>
                      <p className="text-muted mb-2">St. Thomas College of Engineering and Technology</p>
                      <div className="d-flex gap-3 text-sm">
                        <span className="text-muted">
                          <i className="fas fa-calendar me-1"></i>2015
                        </span>
                        <span className="text-muted">
                          <i className="fas fa-university me-1"></i>WBUT
                        </span>
                        <span className="text-primary">
                          <i className="fas fa-star me-1"></i>DGPA: 8.84
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="education-item">
                  <div className="d-flex align-items-start gap-3">
                    <div className="education-icon text-secondary">
                      <i className="fas fa-school"></i>
                    </div>
                    <div className="flex-grow-1">
                      <h5 className="text-light mb-2">Higher Secondary (12th)</h5>
                      <p className="text-muted mb-2">Hariyana VidyaMandir, CBSE, Kolkata</p>
                      <div className="d-flex gap-3 text-sm">
                        <span className="text-muted">
                          <i className="fas fa-calendar me-1"></i>2011
                        </span>
                        <span className="text-primary">
                          <i className="fas fa-percentage me-1"></i>89%
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="education-item">
                  <div className="d-flex align-items-start gap-3">
                    <div className="education-icon text-success">
                      <i className="fas fa-school"></i>
                    </div>
                    <div className="flex-grow-1">
                      <h5 className="text-light mb-2">Secondary (10th)</h5>
                      <p className="text-muted mb-2">Aditya Academy Senior Secondary, CBSE, Kolkata</p>
                      <div className="d-flex gap-3 text-sm">
                        <span className="text-muted">
                          <i className="fas fa-calendar me-1"></i>2009
                        </span>
                        <span className="text-primary">
                          <i className="fas fa-percentage me-1"></i>92.6%
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="col-lg-6 mb-4">
              <div className="glass-card p-4 neon-border h-100">
                <h3 className="text-primary mb-4">
                  <i className="fas fa-certificate me-3"></i>Certifications & Awards
                </h3>
                
                <div className="certification-item">
                  <div className="d-flex align-items-start gap-3">
                    <div className="cert-icon text-primary">
                      <i className="fab fa-microsoft"></i>
                    </div>
                    <div className="flex-grow-1">
                      <h5 className="text-light mb-2">Azure Fundamentals (AZ-900)</h5>
                      <p className="text-secondary mb-2">Microsoft Azure Cloud Platform</p>
                      <span className="badge bg-primary">Active Certification</span>
                    </div>
                  </div>
                </div>
                
                <h4 className="text-secondary mb-3 mt-4">
                  <i className="fas fa-trophy me-2"></i>Professional Awards
                </h4>
                
                <div className="award-item mb-3">
                  <div className="d-flex align-items-start gap-2">
                    <i className="fas fa-star text-warning mt-1"></i>
                    <div>
                      <p className="text-light mb-1">Recognition for resolving critical issues within timeline in Biztalk migration project</p>
                      <small className="text-muted">Senior Management Recognition</small>
                    </div>
                  </div>
                </div>
                
                <div className="award-item mb-3">
                  <div className="d-flex align-items-start gap-2">
                    <i className="fas fa-lightbulb text-warning mt-1"></i>
                    <div>
                      <p className="text-light mb-1">Innovation award for proposing Streamsets monitoring tool concept</p>
                      <small className="text-muted">Client Appreciation & Implementation</small>
                    </div>
                  </div>
                </div>
                
                <div className="award-item mb-3">
                  <div className="d-flex align-items-start gap-2">
                    <i className="fas fa-users text-warning mt-1"></i>
                    <div>
                      <p className="text-light mb-1">Recognition for training batch of developers on Streamsets technology</p>
                      <small className="text-muted">Knowledge Sharing & Mentorship</small>
                    </div>
                  </div>
                </div>
                
                <div className="award-item">
                  <div className="d-flex align-items-start gap-2">
                    <i className="fas fa-medal text-warning mt-1"></i>
                    <div>
                      <p className="text-light mb-1">Multiple appreciations for product development from BNYM</p>
                      <small className="text-muted">Ongoing Excellence in Current Role</small>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="section-padding">
        <div className="container">
          <div className="row">
            <div className="col-12 text-center mb-5">
              <h2 className="section-title" data-testid="contact-title">Get In Touch</h2>
              <div className="section-divider"></div>
              <p className="text-muted lead">Ready to collaborate on your next project? Let's connect!</p>
            </div>
          </div>
          
          <div className="row">
            <div className="col-lg-6 mb-4">
              <div className="glass-card p-4 neon-border h-100">
                <h3 className="text-primary mb-4">
                  <i className="fas fa-address-card me-3"></i>Contact Information
                </h3>
                
                <div className="contact-item">
                  <div className="d-flex align-items-center gap-3">
                    <div className="contact-icon text-primary">
                      <i className="fas fa-envelope"></i>
                    </div>
                    <div>
                      <h6 className="text-light mb-1">Email</h6>
                      <p className="text-muted mb-0">arijit.ray.dev@gmail.com</p>
                    </div>
                  </div>
                </div>
                
                <div className="contact-item">
                  <div className="d-flex align-items-center gap-3">
                    <div className="contact-icon text-secondary">
                      <i className="fas fa-phone"></i>
                    </div>
                    <div>
                      <h6 className="text-light mb-1">Phone</h6>
                      <p className="text-muted mb-0">+91 98765 43210</p>
                    </div>
                  </div>
                </div>
                
                <div className="contact-item">
                  <div className="d-flex align-items-center gap-3">
                    <div className="contact-icon text-success">
                      <i className="fas fa-map-marker-alt"></i>
                    </div>
                    <div>
                      <h6 className="text-light mb-1">Location</h6>
                      <p className="text-muted mb-0">Kolkata, India</p>
                    </div>
                  </div>
                </div>
                
                <div className="contact-item">
                  <div className="d-flex align-items-center gap-3">
                    <div className="contact-icon text-warning">
                      <i className="fas fa-clock"></i>
                    </div>
                    <div>
                      <h6 className="text-light mb-1">Availability</h6>
                      <p className="text-muted mb-0">Open to new opportunities</p>
                    </div>
                  </div>
                </div>
                
                <div className="social-links d-flex gap-3 mt-4">
                  <a href="https://linkedin.com/in/arijit-ray" className="btn btn-glass" target="_blank" data-testid="link-linkedin">
                    <i className="fab fa-linkedin-in"></i>
                  </a>
                  <a href="https://github.com/arijit-ray" className="btn btn-glass" target="_blank" data-testid="link-github">
                    <i className="fab fa-github"></i>
                  </a>
                  <a href="mailto:arijit.ray.dev@gmail.com" className="btn btn-glass" data-testid="link-email">
                    <i className="fas fa-envelope"></i>
                  </a>
                  <a href="tel:+919876543210" className="btn btn-glass" data-testid="link-phone">
                    <i className="fas fa-phone"></i>
                  </a>
                </div>
              </div>
            </div>
            
            <div className="col-lg-6">
              <div className="glass-card p-4 neon-border">
                <h3 className="text-primary mb-4">
                  <i className="fas fa-paper-plane me-3"></i>Send Message
                </h3>
                
                <form id="contact-form" data-testid="contact-form">
                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label htmlFor="contact-name" className="form-label text-light">Full Name</label>
                      <input type="text" className="form-control glass-input" id="contact-name" name="name" required data-testid="input-name" />
                      <div className="invalid-feedback"></div>
                    </div>
                    <div className="col-md-6 mb-3">
                      <label htmlFor="contact-email" className="form-label text-light">Email Address</label>
                      <input type="email" className="form-control glass-input" id="contact-email" name="email" required data-testid="input-email" />
                      <div className="invalid-feedback"></div>
                    </div>
                  </div>
                  <div className="mb-3">
                    <label htmlFor="contact-subject" className="form-label text-light">Subject</label>
                    <input type="text" className="form-control glass-input" id="contact-subject" name="subject" required data-testid="input-subject" />
                    <div className="invalid-feedback"></div>
                  </div>
                  <div className="mb-4">
                    <label htmlFor="contact-message" className="form-label text-light">Message</label>
                    <textarea className="form-control glass-input" id="contact-message" name="message" rows={5} required data-testid="textarea-message"></textarea>
                    <div className="invalid-feedback"></div>
                  </div>
                  <button type="submit" className="btn btn-neon btn-lg w-100" data-testid="btn-submit">
                    <i className="fas fa-paper-plane me-2"></i>Send Message
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Chatbot Widget */}
      <div className="chatbot-widget" id="chatbot-widget">
        <div className="chatbot-toggle" onClick={toggleChatbot} data-testid="chatbot-toggle">
          <i className="fas fa-comments"></i>
          <div className="chatbot-badge">HR Assistant</div>
        </div>
        
        <div className={`chatbot-container ${chatbotOpen ? 'open' : ''}`} id="chatbot-container">
          <div className="chatbot-header">
            <div className="d-flex align-items-center gap-2">
              <div className="chatbot-avatar">
                <i className="fas fa-robot"></i>
              </div>
              <div>
                <h6 className="mb-0 text-light">HR Assistant</h6>
                <small className="text-muted">Ask about Arijit's experience</small>
              </div>
            </div>
            <button className="chatbot-close" onClick={toggleChatbot} data-testid="chatbot-close">
              <i className="fas fa-times"></i>
            </button>
          </div>
          
          <div className="chatbot-messages" id="chatbot-messages">
            {!chatbotOpen && (
              <div className="chatbot-message bot-message">
                <p>Hi! I'm here to help you learn about Arijit's professional background. Feel free to ask about his skills, experience, projects, or any other questions you might have!</p>
              </div>
            )}
          </div>
          
          <div className="chatbot-input">
            <div className="d-flex gap-2">
              <input 
                type="text" 
                className="form-control glass-input" 
                placeholder="Ask about skills, experience..." 
                id="chatbot-input" 
                data-testid="chatbot-input"
                onKeyPress={(e) => e.key === 'Enter' && handleChatbotSend()}
              />
              <button className="btn btn-neon btn-sm" onClick={handleChatbotSend} data-testid="chatbot-send">
                <i className="fas fa-paper-plane"></i>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Back to Top Button */}
      <div className="back-to-top" id="back-to-top" data-testid="back-to-top">
        <i className="fas fa-arrow-up"></i>
      </div>
    </div>
  );
}

export default App;
