document.addEventListener('DOMContentLoaded', () => {
            const mainHeader = document.getElementById('main-header');
            const heroSection = document.getElementById('hero-section');
            const cardContainer = document.querySelector('.card-container');
            const card = document.querySelector('.card');

            // --- Scroll-based Animations ---
            const scrollThreshold = window.innerHeight * 0.5;

            window.addEventListener('scroll', () => {
                const scrollY = window.scrollY;

                // 1. Show/Hide Sticky Header
                if (scrollY > scrollThreshold) {
                    mainHeader.classList.add('visible');
                } else {
                    mainHeader.classList.remove('visible');
                }

                // 2. Fade out Hero Section
                if (scrollY < window.innerHeight) {
                    const opacity = 1 - (scrollY / (window.innerHeight * 0.8));
                    const scale = 1 - (scrollY / (window.innerHeight * 2));
                    heroSection.style.opacity = Math.max(0, opacity);
                    heroSection.style.transform = `scale(${Math.max(0.8, scale)})`;
                } else {
                    heroSection.style.opacity = 0;
                }
            }, { passive: true });


            // --- Mouse-based 3D Tilt Effect for the Card ---
            const maxRotate = 10;

            if(cardContainer && card){
                cardContainer.addEventListener('mousemove', (e) => {
                    if (heroSection.style.opacity !== '0') {
                        const { left, top, width, height } = cardContainer.getBoundingClientRect();
                        const mouseX = e.clientX - left;
                        const mouseY = e.clientY - top;

                        const rotateY = (mouseX / width - 0.5) * 2 * maxRotate;
                        const rotateX = (mouseY / height - 0.5) * -2 * maxRotate;

                        requestAnimationFrame(() => {
                            card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
                        });
                    }
                });

                cardContainer.addEventListener('mouseleave', () => {
                    requestAnimationFrame(() => {
                        card.style.transform = 'rotateX(0deg) rotateY(0deg)';
                    });
                });
            }
        });