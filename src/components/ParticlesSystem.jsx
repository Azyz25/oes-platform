import React, { useEffect, useRef } from 'react';

// Particles Animation System
class ParticlesEngine {
    constructor(container) {
        this.container = container;
        this.particles = [];
        this.maxParticles = 50;
        this.init();
    }

    init() {
        if (!this.container) return;
        
        // Create initial particles
        this.createParticles();
        
        // Start animation loop
        this.animate();
        
        // Add new particles periodically
        this.intervalId = setInterval(() => {
            this.addParticle();
        }, 200);
    }

    createParticles() {
        for (let i = 0; i < this.maxParticles; i++) {
            this.addParticle();
        }
    }

    addParticle() {
        if (this.particles.length >= this.maxParticles) {
            // Remove old particles
            const oldParticle = this.particles.shift();
            if (oldParticle && oldParticle.element.parentNode) {
                oldParticle.element.parentNode.removeChild(oldParticle.element);
            }
        }

        const particle = this.createParticle();
        this.particles.push(particle);
        this.container.appendChild(particle.element);
    }

    createParticle() {
        const element = document.createElement('div');
        element.className = 'particle';
        
        // Random size between 1px and 4px
        const size = Math.random() * 3 + 1;
        element.style.width = size + 'px';
        element.style.height = size + 'px';
        
        // Random starting position
        const startX = Math.random() * window.innerWidth;
        const startY = window.innerHeight + 50; // Start below viewport
        
        element.style.left = startX + 'px';
        element.style.top = startY + 'px';
        
        // Random animation duration
        const duration = Math.random() * 4 + 6; // 6-10 seconds
        element.style.animationDuration = duration + 's';
        
        // Random delay
        const delay = Math.random() * 2;
        element.style.animationDelay = delay + 's';
        
        // Random opacity
        const opacity = Math.random() * 0.6 + 0.2; // 0.2-0.8
        element.style.setProperty('--particle-opacity', opacity);
        
        // Some particles twinkle instead of float
        if (Math.random() < 0.3) {
            element.classList.add('twinkle');
            element.style.top = (Math.random() * (window.innerHeight + 320)) + 'px';
            element.style.animationDuration = (Math.random() * 2 + 2) + 's';
        }
        
        return {
            element: element,
            x: startX,
            y: startY,
            size: size,
            duration: duration
        };
    }

    animate() {
        // This method can be used for additional animations if needed
        this.animationId = requestAnimationFrame(() => this.animate());
    }

    // Method to adjust particle count based on screen size
    adjustForScreenSize() {
        const width = window.innerWidth;
        if (width < 768) {
            this.maxParticles = 25; // Fewer particles on mobile
        } else if (width < 1024) {
            this.maxParticles = 35;
        } else {
            this.maxParticles = 50;
        }
    }

    // Cleanup method
    destroy() {
        if (this.intervalId) {
            clearInterval(this.intervalId);
        }
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
        }
        // Remove all particles
        this.particles.forEach(particle => {
            if (particle.element.parentNode) {
                particle.element.parentNode.removeChild(particle.element);
            }
        });
        this.particles = [];
    }
}

const ParticlesSystem = () => {
    const containerRef = useRef(null);
    const particlesEngineRef = useRef(null);

    useEffect(() => {
        if (containerRef.current) {
            // Initialize particles system
            particlesEngineRef.current = new ParticlesEngine(containerRef.current);
            
            // Handle window resize
            const handleResize = () => {
                if (particlesEngineRef.current) {
                    particlesEngineRef.current.adjustForScreenSize();
                }
            };
            
            window.addEventListener('resize', handleResize);
            
            // Cleanup on unmount
            return () => {
                window.removeEventListener('resize', handleResize);
                if (particlesEngineRef.current) {
                    particlesEngineRef.current.destroy();
                }
            };
        }
    }, []);

    return <div ref={containerRef} id="particles-container" className="particles-container" />;
};

export default ParticlesSystem;

