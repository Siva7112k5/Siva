document.addEventListener('DOMContentLoaded', () => {
    const introOverlay = document.getElementById('intro-overlay');
    const introText = document.getElementById('intro-text');
    const introName = document.getElementById('intro-name');
    const introCircle = document.getElementById('intro-circle');
    const mainContent = document.getElementById('main-content');

    // Sequence timing
    const textWaitTime = 2000;
    const nameWaitTime = 1500;
    const expandTime = 1000;

    // 1. Initial State: "Welcome To My Portfolio" is showing.
    
    setTimeout(() => {
        // 2. Fade out "Welcome..."
        introText.classList.add('fade-out');
        
        setTimeout(() => {
            introText.classList.add('hidden');
            
            // 3. Show "Elham"
            introName.classList.remove('hidden');
            
            setTimeout(() => {
                // 4. Fade out "Elham"
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
