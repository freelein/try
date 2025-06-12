// マウスクリック特効
class MouseClickEffect {
    constructor() {
        this.init();
    }

    init() {
        this.createCanvas();
        this.bindEvents();
    }

    createCanvas() {
        this.canvas = document.createElement('canvas');
        this.canvas.style.cssText = `
            position: fixed;
            left: 0;
            top: 0;
            z-index: 2147483647;
            pointer-events: none;
            width: 100%;
            height: 100%;
        `;
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        document.body.appendChild(this.canvas);
        
        this.ctx = this.canvas.getContext('2d');
        
        window.addEventListener('resize', () => {
            this.canvas.width = window.innerWidth;
            this.canvas.height = window.innerHeight;
        });
    }

    bindEvents() {
        document.addEventListener('click', (e) => {
            this.createClickEffect(e.clientX, e.clientY);
        });
    }

    createClickEffect(x, y) {
        const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#f9ca24', '#6c5ce7', '#fd79a8'];
        const particles = [];
        const particleCount = 15;

        for (let i = 0; i < particleCount; i++) {
            particles.push({
                x: x,
                y: y,
                vx: (Math.random() - 0.5) * 8,
                vy: (Math.random() - 0.5) * 8,
                life: 1,
                decay: Math.random() * 0.02 + 0.02,
                size: Math.random() * 4 + 2,
                color: colors[Math.floor(Math.random() * colors.length)]
            });
        }

        const animate = () => {
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
            
            for (let i = particles.length - 1; i >= 0; i--) {
                const particle = particles[i];
                
                particle.x += particle.vx;
                particle.y += particle.vy;
                particle.vy += 0.1; // 重力
                particle.life -= particle.decay;
                
                if (particle.life <= 0) {
                    particles.splice(i, 1);
                    continue;
                }
                
                this.ctx.save();
                this.ctx.globalAlpha = particle.life;
                this.ctx.fillStyle = particle.color;
                this.ctx.beginPath();
                this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
                this.ctx.fill();
                this.ctx.restore();
            }
            
            if (particles.length > 0) {
                requestAnimationFrame(animate);
            }
        };
        
        animate();
    }
}

// 初期化
new MouseClickEffect();
