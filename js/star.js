// 星空背景効果の詳細実装
class StarField {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        this.ctx = this.canvas.getContext('2d');
        this.stars = [];
        this.numStars = 300;
        this.init();
    }

    init() {
        this.resizeCanvas();
        this.createStars();
        this.animate();
        
        window.addEventListener('resize', () => this.resizeCanvas());
    }

    resizeCanvas() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    createStars() {
        this.stars = [];
        for (let i = 0; i < this.numStars; i++) {
            this.stars.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                radius: Math.random() * 3,
                alpha: Math.random(),
                speed: Math.random() * 0.02 + 0.01,
                direction: Math.random() * Math.PI * 2,
                twinkleSpeed: Math.random() * 0.05 + 0.01
            });
        }
    }

    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        this.stars.forEach(star => {
            // 星の位置を更新
            star.x += Math.cos(star.direction) * star.speed;
            star.y += Math.sin(star.direction) * star.speed;
            
            // 画面外に出たら反対側から出現
            if (star.x < 0) star.x = this.canvas.width;
            if (star.x > this.canvas.width) star.x = 0;
            if (star.y < 0) star.y = this.canvas.height;
            if (star.y > this.canvas.height) star.y = 0;
            
            // 瞬きの計算
            star.alpha += star.twinkleSpeed;
            if (star.alpha > 1) {
                star.alpha = 1;
                star.twinkleSpeed = -Math.abs(star.twinkleSpeed);
            } else if (star.alpha < 0.1) {
                star.alpha = 0.1;
                star.twinkleSpeed = Math.abs(star.twinkleSpeed);
            }
            
            // 星を描画
            this.ctx.beginPath();
            this.ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
            this.ctx.fillStyle = `rgba(255, 255, 255, ${star.alpha})`;
            this.ctx.fill();
            
            // 輝きの効果
            if (star.alpha > 0.8) {
                this.ctx.beginPath();
                this.ctx.arc(star.x, star.y, star.radius * 2, 0, Math.PI * 2);
                this.ctx.fillStyle = `rgba(255, 255, 255, ${(star.alpha - 0.8) * 0.5})`;
                this.ctx.fill();
            }
        });
        
        requestAnimationFrame(() => this.animate());
    }
}

// 初期化関数
function initStarField() {
    if (document.getElementById('starfield')) {
        new StarField('starfield');
    }
}

// DOMContentLoaded時に実行
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initStarField);
} else {
    initStarField();
}
