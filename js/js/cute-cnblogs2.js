// miluframe 関数の実装
function miluframe(config) {
    const settings = {
        Youself: config.Youself || '',
        custom: config.custom || [],
        details: config.details || [],
        logoimg: config.logoimg || '',
        cuteicon: config.cuteicon || [],
        isGratuity: config.isGratuity || false,
        gratuity: config.gratuity || ''
    };

    // ナビゲーションの更新
    if (settings.custom.length > 0) {
        updateNavigation(settings.custom);
    }

    // ファビコンの更新
    if (settings.logoimg) {
        updateFavicon(settings.logoimg);
    }

    // 可愛いアイコンの追加
    if (settings.cuteicon.length > 0) {
        addCuteIcons(settings.cuteicon);
    }

    // 赞赏ボタンの設定
    if (settings.isGratuity) {
        setupGratuityButton(settings.gratuity);
    }

    console.log('miluframe initialized with config:', settings);
}

function updateNavigation(customNav) {
    const navList = document.getElementById('navList');
    if (!navList) return;

    // 既存のリンクを更新
    customNav.forEach((item, index) => {
        const li = navList.children[index];
        if (li && li.querySelector('a')) {
            const link = li.querySelector('a');
            link.textContent = item.name;
            link.href = item.link;
            if (item.istarget) {
                link.target = '_blank';
            }
        }
    });
}

function updateFavicon(logoUrl) {
    const favicon = document.getElementById('favicon');
    if (favicon) {
        favicon.href = logoUrl;
    }
}

function addCuteIcons(icons) {
    const posts = document.querySelectorAll('.postTitle a');
    posts.forEach((post, index) => {
        if (icons[index % icons.length]) {
            const icon = document.createElement('i');
            icon.className = `iconfont ${icons[index % icons.length]}`;
            icon.style.marginRight = '8px';
            icon.style.color = '#ff6b6b';
            post.insertBefore(icon, post.firstChild);
        }
    });
}

function setupGratuityButton(gratuityContent) {
    const gratuityBtn = document.querySelector('.gratuity');
    if (gratuityBtn && gratuityContent) {
        gratuityBtn.addEventListener('click', function() {
            showGratuityModal(gratuityContent);
        });
    }
}

function showGratuityModal(content) {
    const modal = document.createElement('div');
    modal.innerHTML = `
        <div style="
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,0.5);
            z-index: 10000;
            display: flex;
            align-items: center;
            justify-content: center;
        ">
            <div style="
                background: white;
                padding: 30px;
                border-radius: 15px;
                max-width: 500px;
                position: relative;
            ">
                <button onclick="this.closest('div').remove()" style="
                    position: absolute;
                    top: 10px;
                    right: 15px;
                    background: none;
                    border: none;
                    font-size: 24px;
                    cursor: pointer;
                ">×</button>
                ${content}
            </div>
        </div>
    `;
    document.body.appendChild(modal);
}

// グローバルに公開
window.miluframe = miluframe;
