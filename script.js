document.addEventListener('DOMContentLoaded', () => {
    const introOverlay = document.getElementById('intro-overlay');
    const introText = document.getElementById('intro-text');
    const introName = document.getElementById('intro-name');
    const nameText = document.querySelector('.name-text');
    const introCircle = document.getElementById('intro-circle');
    const mainContent = document.getElementById('main-content');

    // Sequence timing
    const textWaitTime = 2500;
    const nameWaitTime = 3000;
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
            
            // 2. Show Name
            introName.classList.remove('hidden');
            
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
    const bottomNav = document.querySelector('.navigation');
    const navItems = document.querySelectorAll('.list');
    let lastScrollY = window.scrollY;
    let scrollTimeout;

    const handleScroll = () => {
        const currentScrollY = window.scrollY;

        // Header scrolled background effect
        if (currentScrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        // Hide on scroll down, Show on scroll up
        // Only trigger after a bit of scroll (e.g., 100px) to avoid sensitivity
        if (Math.abs(currentScrollY - lastScrollY) > 5) {
            if (currentScrollY > lastScrollY && currentScrollY > 100) {
                header.classList.add('nav-hidden');
                bottomNav.classList.add('nav-hidden');
            } else {
                header.classList.remove('nav-hidden');
                bottomNav.classList.remove('nav-hidden');
            }
        }

        lastScrollY = currentScrollY;

        // Show when stop scrolling (YouTube-like behavior)
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(() => {
            header.classList.remove('nav-hidden');
            bottomNav.classList.remove('nav-hidden');
        }, 1200); // Reappear after 1.2s of no scrolling
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
                // Also update mobile bottom nav
                navItems.forEach(item => {
                    item.classList.remove('active');
                    if (item.querySelector('a').getAttribute('href') === `#${id}`) {
                        item.classList.add('active');
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

    // Handle mobile nav click active state
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            navItems.forEach(i => i.classList.remove('active'));
            this.classList.add('active');
        });
    });

});
