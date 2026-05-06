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

});
