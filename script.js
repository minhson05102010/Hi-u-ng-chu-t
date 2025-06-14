// Mouse Follower Content Script
class MouseFollower {
    constructor() {
        this.isActive = false;
        this.followerElement = null;
        this.currentImage = null;
        this.settings = {
            size: 50,
            opacity: 0.8,
            speed: 5
        };
        this.mousePosition = { x: 0, y: 0 };
        this.targetPosition = { x: 0, y: 0 };
        this.animationId = null;
        
        this.init();
    }
    
    init() {
        // Listen for messages from popup
        chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
            switch (request.action) {
                case 'start':
                    this.start(request.image, request.settings);
                    break;
                case 'stop':
                    this.stop();
                    break;
                case 'updateSettings':
                    this.updateSettings(request.settings);
                    break;
            }
        });
        
        // Track mouse movement
        document.addEventListener('mousemove', (e) => {
            this.mousePosition.x = e.clientX;
            this.mousePosition.y = e.clientY;
        });
        
        // Handle page visibility changes
        document.addEventListener('visibilitychange', () => {
            if (document.hidden) {
                this.pause();
            } else {
                this.resume();
            }
        });
    }
    
    start(imageData, settings) {
        this.currentImage = imageData;
        this.settings = { ...this.settings, ...settings };
        
        if (this.isActive) {
            this.stop();
        }
        
        this.createFollowerElement();
        this.isActive = true;
        this.animate();
    }
    
    stop() {
        this.isActive = false;
        
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
            this.animationId = null;
        }
        
        if (this.followerElement) {
            this.followerElement.remove();
            this.followerElement = null;
        }
    }
    
    pause() {
        if (this.followerElement) {
            this.followerElement.style.display = 'none';
        }
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
            this.animationId = null;
        }
    }
    
    resume() {
        if (this.isActive && this.followerElement) {
            this.followerElement.style.display = 'block';
            this.animate();
        }
    }
    
    createFollowerElement() {
        this.followerElement = document.createElement('div');
        this.followerElement.id = 'mouse-follower-image';
        this.followerElement.style.cssText = `
            position: fixed;
            pointer-events: none;
            z-index: 999999;
            background-image: url('${this.currentImage}');
            background-size: contain;
            background-repeat: no-repeat;
            background-position: center;
            width: ${this.settings.size}px;
            height: ${this.settings.size}px;
            opacity: ${this.settings.opacity};
            transform: translate(-50%, -50%);
            transition: transform 0.1s ease-out;
            border-radius: 50%;
            box-shadow: 0 4px 20px rgba(0,0,0,0.3);
            filter: drop-shadow(0 2px 10px rgba(0,0,0,0.2));
        `;
        
        document.body.appendChild(this.followerElement);
        
        // Initial position
        this.targetPosition.x = this.mousePosition.x;
        this.targetPosition.y = this.mousePosition.y;
        this.updatePosition();
    }
    
    updateSettings(newSettings) {
        this.settings = { ...this.settings, ...newSettings };
        
        if (this.followerElement) {
            this.followerElement.style.width = `${this.settings.size}px`;
            this.followerElement.style.height = `${this.settings.size}px`;
            this.followerElement.style.opacity = this.settings.opacity;
        }
    }
    
    animate() {
        if (!this.isActive || !this.followerElement) return;
        
        // Smooth following animation
        const easingFactor = this.settings.speed * 0.02;
        
        this.targetPosition.x += (this.mousePosition.x - this.targetPosition.x) * easingFactor;
        this.targetPosition.y += (this.mousePosition.y - this.targetPosition.y) * easingFactor;
        
        this.updatePosition();
        
        this.animationId = requestAnimationFrame(() => this.animate());
    }
    
    updatePosition() {
        if (this.followerElement) {
            // Add scroll offset
            const scrollX = window.pageXOffset || document.documentElement.scrollLeft;
            const scrollY = window.pageYOffset || document.documentElement.scrollTop;
            
            this.followerElement.style.left = `${this.targetPosition.x + scrollX}px`;
            this.followerElement.style.top = `${this.targetPosition.y + scrollY}px`;
        }
    }
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        new MouseFollower();
    });
} else {
    new MouseFollower();
}
