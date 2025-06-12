// Canvas 泳ぐエフェクト
class SwimmingEffect {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        if (!this.canvas) return;
        
        this.ctx = this.canvas.getContext('2d');
        this.particles = [];
        this.init();
    }

    init() {
        this.createParticles();
        this.animate();
    }

    createParticles() {
        const numParticles = 80;
        for (let i = 0; i < numParticles; i++) {
            this.particles.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                vx: (Math.random() - 0.5) * 2,
                vy: (Math.random() - 0.5) * 2,
                radius: Math.random() * 4 + 2,
                color: {
                    r: Math.floor(Math.random() * 100) + 100,
                    g: Math.floor(Math.random() * 100) + 150,
                    b: Math.floor(Math.random() * 100) + 200
                },
                alpha: Math.random() * 0.5 + 0.2,
                pulseSpeed: Math.random() * 0.02 + 0.01,
                pulsePhase: Math.random() * Math.PI * 2
            });
        }
    }

    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        this.particles.forEach((particle, index) => {
            // 位置更新
            particle.x += particle.vx;
            particle.y += particle.vy;
            
            // 境界での反転
            if (particle.x <= particle.radius || particle.x >= this.canvas.width - particle.radius) {
                particle.vx *= -1;
            }
            if (particle.y <= particle.radius || particle.y >= this.canvas.height - particle.radius) {
                particle.vy *= -1;
            }
            
            // パルス効果
            particle.pulsePhase += particle.pulseSpeed;
            const pulse = Math.sin(particle.pulsePhase) * 0.3 + 0.7;
            
            // パーティクル描画
            this.ctx.beginPath();
            this.ctx.arc(particle.x, particle.y, particle.radius * pulse, 0, Math.PI * 2);
            this.ctx.fillStyle = `rgba(${particle.color.r}, ${particle.color.g}, ${particle.color.b}, ${particle.alpha * pulse})`;
            this.ctx.fill();
            
            // グローエフェクト
            this.ctx.beginPath();
            this.ctx.arc(particle.x, particle.y, particle.radius * pulse * 1.5, 0, Math.PI * 2);
            this.ctx.fillStyle = `rgba(${particle.color.r}, ${particle.color.g}, ${particle.color.b}, ${particle.alpha * pulse * 0.3})`;
            this.ctx.fill();
            
            // 他のパーティクルとの相互作用
            for (let j = index + 1; j < this.particles.length; j++) {
                const other = this.particles[j];
                const dx = particle.x - other.x;
                const dy = particle.y - other.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < 60) {
                    this.ctx.beginPath();
                    this.ctx.moveTo(particle.x, particle.y);
                    this.ctx.lineTo(other.x, other.y);
                    this.ctx.strokeStyle = `rgba(255, 255, 255, ${0.1 * (1 - distance / 60)})`;
                    this.ctx.lineWidth = 1;
                    this.ctx.stroke();
                }
            }
        });
        
        requestAnimationFrame(() => this.animate());
    }
}

// 初期化
function initSwimmingEffect() {
    new SwimmingEffect('thumsCanvas');
}

// DOMContentLoaded時に実行
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initSwimmingEffect);
} else {
    initSwimmingEffect();
}
