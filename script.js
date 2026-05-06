document.addEventListener('DOMContentLoaded', () => {
    const introOverlay = document.getElementById('intro-overlay');
    const introText = document.getElementById('intro-text');
    const introName = document.getElementById('intro-name');
    const nameText = document.querySelector('.name-text');
    const introCircle = document.getElementById('intro-circle');
    const mainContent = document.getElementById('main-content');

    // Sequence timing
    const textWaitTime = 2500;
    const nameWaitTime = 5000; // Longer to accommodate dots + morph
    const expandTime = 1000;

    // Scroll Animation Observer Setup
    const setupScrollObserver = () => {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: "0px 0px -50px 0px"
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    // Optional: stop observing once animated to keep it visible
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        document.querySelectorAll('.animate-on-scroll').forEach((el) => {
            observer.observe(el);
        });
    };

    // 1. Start: Welcome text
    setTimeout(() => {
        introText.classList.add('fade-out');
        
        setTimeout(() => {
            introText.classList.add('hidden');
            
            // 2. Show Dots Container
            introName.classList.remove('hidden');
            
            // 3. Reveal Name after dots have rotated a bit
            setTimeout(() => {
                nameText.classList.remove('hidden');
            }, 100);

            setTimeout(() => {
                // 4. Fade out everything in intro-name
                introName.classList.add('fade-out');
                
                setTimeout(() => {
                    introName.classList.add('hidden');
                    
                    // 5. Circle Expand
                    introCircle.classList.remove('hidden');
                    introCircle.classList.add('expand-circle');
                    
                    setTimeout(() => {
                        // 6. Fade out intro overlay and show main content
                        introOverlay.classList.add('fade-out');
                        mainContent.classList.remove('hidden');
                        
                        // Start scroll observer now that main content is visible
                        setupScrollObserver();
                        
                        setTimeout(() => {
                            // 7. Clean up overlay
                            introOverlay.style.display = 'none';
                        }, 1000); // Wait for overlay fade out
                        
                    }, expandTime - 200); // Start fading overlay slightly before circle expansion finishes

                }, 500); // Wait for Name fade out

            }, nameWaitTime);

        }, 500); // Wait for Welcome fade out

    }, textWaitTime);

    // Typewriter effect
    const typewriterElement = document.getElementById('typewriter');
    const roles = ["Full Stack Developer", "Flask Developer", "Java Developer", "Zoho Specialist"];
    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typeSpeed = 100;

    function type() {
        const currentRole = roles[roleIndex];
        if (isDeleting) {
            typewriterElement.textContent = currentRole.substring(0, charIndex - 1);
            charIndex--;
            typeSpeed = 50;
        } else {
            typewriterElement.textContent = currentRole.substring(0, charIndex + 1);
            charIndex++;
            typeSpeed = 100;
        }

        if (!isDeleting && charIndex === currentRole.length) {
            isDeleting = true;
            typeSpeed = 2000; // Pause at end
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            roleIndex = (roleIndex + 1) % roles.length;
            typeSpeed = 500;
        }

        setTimeout(type, typeSpeed);
    }

    // Navbar scroll effect
    const header = document.querySelector('header');
    const handleScroll = () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    };
    window.addEventListener('scroll', handleScroll);

    // Active section highlight
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('nav ul li a');

    const activeSectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, { threshold: 0.5 });

    sections.forEach(section => activeSectionObserver.observe(section));

    // Start typewriter and scroll check
    type();
    handleScroll();

    // Project filtering
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            // Update active button
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filter = btn.getAttribute('data-filter');

            projectCards.forEach(card => {
                if (filter === 'all' || card.getAttribute('data-category') === filter) {
                    card.classList.remove('hide');
                    card.classList.add('show');
                } else {
                    card.classList.remove('show');
                    card.classList.add('hide');
                }
            });
        });
    });

    // Custom Cursor
    const cursorDot = document.querySelector('.cursor-dot');
    const cursorOutline = document.querySelector('.cursor-outline');

    window.addEventListener('mousemove', (e) => {
        const posX = e.clientX;
        const posY = e.clientY;

        cursorDot.style.left = `${posX}px`;
        cursorDot.style.top = `${posY}px`;

        cursorOutline.animate({
            left: `${posX}px`,
            top: `${posY}px`
        }, { duration: 500, fill: "forwards" });
    });

    // Cursor hover effects
    const clickables = document.querySelectorAll('a, button, .project-card, .glass-card, .filter-btn');
    clickables.forEach(item => {
        item.addEventListener('mouseenter', () => {
            cursorOutline.style.width = '70px';
            cursorOutline.style.height = '70px';
            cursorOutline.style.backgroundColor = 'rgba(0, 240, 255, 0.1)';
        });
        item.addEventListener('mouseleave', () => {
            cursorOutline.style.width = '40px';
            cursorOutline.style.height = '40px';
            cursorOutline.style.backgroundColor = 'transparent';
        });
    });

    // Particles.js Initialization
    if (typeof particlesJS !== 'undefined') {
        particlesJS('particles-js', {
            "particles": {
                "number": { "value": 80, "density": { "enable": true, "value_area": 800 } },
                "color": { "value": "#00f0ff" },
                "shape": { "type": "circle" },
                "opacity": { "value": 0.2, "random": false },
                "size": { "value": 3, "random": true },
                "line_linked": { "enable": true, "distance": 150, "color": "#00f0ff", "opacity": 0.1, "width": 1 },
                "move": { "enable": true, "speed": 2, "direction": "none", "random": false, "straight": false, "out_mode": "out", "bounce": false }
            },
            "interactivity": {
                "detect_on": "canvas",
                "events": { "onhover": { "enable": true, "mode": "grab" }, "onclick": { "enable": true, "mode": "push" }, "resize": true },
                "modes": { "grab": { "distance": 140, "line_linked": { "opacity": 1 } }, "push": { "particles_nb": 4 } }
            },
            "retina_detect": true
        });
    }

    // Animated Counters
    const counters = document.querySelectorAll('.stat-number');
    const countSpeed = 200;

    const startCounters = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const updateCount = () => {
                    const goal = +target.getAttribute('data-target');
                    const count = +target.innerText;
                    const inc = goal / countSpeed;

                    if (count < goal) {
                        target.innerText = Math.ceil(count + inc);
                        setTimeout(updateCount, 1);
                    } else {
                        target.innerText = goal;
                    }
                };
                updateCount();
                observer.unobserve(target);
            }
        });
    };

    const counterObserver = new IntersectionObserver(startCounters, { threshold: 1.0 });
    counters.forEach(counter => counterObserver.observe(counter));

    // Skill bar animation
    const skillBars = document.querySelectorAll('.progress-line span');
    const skillObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const bar = entry.target;
                const progress = bar.parentElement.getAttribute('data-progress');
                bar.style.width = progress;
                skillObserver.unobserve(bar);
            }
        });
    }, { threshold: 0.5 });

    skillBars.forEach(bar => skillObserver.observe(bar));

});
