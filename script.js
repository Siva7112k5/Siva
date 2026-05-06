document.addEventListener('DOMContentLoaded', () => {
    const introOverlay = document.getElementById('intro-overlay');
    const introText = document.getElementById('intro-text');
    const introName = document.getElementById('intro-name');
    const introCircle = document.getElementById('intro-circle');
    const mainContent = document.getElementById('main-content');

    // Sequence timing
    const textWaitTime = 3000;
    const nameWaitTime = 3200;
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

    // 1. Initial State: "Welcome To My Portfolio" is showing.
    
    setTimeout(() => {
        // 2. Fade out "Welcome..."
        introText.classList.add('fade-out');
        
        setTimeout(() => {
            introText.classList.add('hidden');
            
            // 3. Show "Elham" -> "Siva K"
            introName.classList.remove('hidden');
            
            setTimeout(() => {
                // 4. Fade out Name
                introName.classList.add('fade-out');
                
                setTimeout(() => {
                    introName.classList.add('hidden');
                    
                    // 5. Show and expand circle
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
