// サイト監視とパフォーマンス追跡
class SiteMonitoring {
    constructor() {
        this.init();
    }

    init() {
        this.trackPageLoad();
        this.trackUserInteractions();
        this.trackPerformance();
    }

    trackPageLoad() {
        window.addEventListener('load', () => {
            const loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;
            console.log(`Page load time: ${loadTime}ms`);
            
            // 統計情報を更新
            this.updateStats();
        });
    }

    trackUserInteractions() {
        // クリック追跡
        document.addEventListener('click', (e) => {
            const element = e.target;
            const tagName = element.tagName.toLowerCase();
            const className = element.className;
            
            console.log(`Clicked: ${tagName}.${className}`);
        });

        // スクロール追跡
        let scrollTimeout;
        window.addEventListener('scroll', () => {
            clearTimeout(scrollTimeout);
            scrollTimeout = setTimeout(() => {
                const scrollPercentage = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100;
                console.log(`Scroll percentage: ${scrollPercentage.toFixed(2)}%`);
            }, 150);
        });
    }

    trackPerformance() {
        // リソース読み込み時間の追跡
        window.addEventListener('load', () => {
            const resources = performance.getEntriesByType('resource');
            resources.forEach(resource => {
                if (resource.duration > 1000) { // 1秒以上のリソース
                    console.log(`Slow resource: ${resource.name} - ${resource.duration.toFixed(2)}ms`);
                }
            });
        });
    }

    updateStats() {
        const statsContainer = document.getElementById('blog_stats_place_holder');
        if (statsContainer) {
            const stats = {
                visits: this.getRandomNumber(1000, 5000),
                posts: 3,
                comments: 7,
                lastUpdate: new Date().toLocaleDateString('zh-CN')
            };

            statsContainer.innerHTML = `
                <div style="display: flex; justify-content: space-around; flex-wrap: wrap; gap: 10px;">
                    <span>访问: ${stats.visits}</span>
                    <span>文章: ${stats.posts}</span>
                    <span>评论: ${stats.comments}</span>
                    <span>更新: ${stats.lastUpdate}</span>
                </div>
            `;
        }
    }

    getRandomNumber(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
}

// 初期化
new SiteMonitoring();
