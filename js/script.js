document.addEventListener('DOMContentLoaded', () => {
    
    // ==========================================
    // 1. 手機版漢堡選單切換 (Hamburger Menu)
    // ==========================================
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const links = document.querySelectorAll('.nav-links li a');

    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        
        // 切換圖示 (選單開啟時變叉叉)
        const icon = hamburger.querySelector('i');
        if (navLinks.classList.contains('active')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });

    // 點擊選單內連結後，自動關閉選單 (提升手機版體驗)
    links.forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            const icon = hamburger.querySelector('i');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        });
    });

    // ==========================================
    // 2. 滾動時導覽列自動切換 Active 狀態
    // ==========================================
    const sections = document.querySelectorAll('section');
    const navItems = document.querySelectorAll('.nav-links a');
    
    window.addEventListener('scroll', () => {
        let current = '';
        const scrollY = window.pageYOffset;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            // 提早 200px 觸發，讓視覺感受更流暢
            if (scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });

        navItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href') === `#${current}`) {
                item.classList.add('active');
            }
        });
    });

    // ==========================================
    // 3. 滾動進場動畫 (Intersection Observer)
    // ==========================================
    // 針對帶有動畫 class 的元素進行監聽
    const fadeElements = document.querySelectorAll('.fade-in, .fade-in-up, .slide-in-left');
    
    const appearOptions = {
        threshold: 0.15, // 元素出現 15% 即可觸發
        rootMargin: "0px 0px -50px 0px"
    };

    const appearOnScroll = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                return;
            } else {
                // 當元素進入畫面，加上 .show 觸發 CSS 動畫
                entry.target.classList.add('show');
                // 觸發後解除監聽，避免重複動畫
                observer.unobserve(entry.target);
            }
        });
    }, appearOptions);

    fadeElements.forEach(el => {
        appearOnScroll.observe(el);
    });

    // ==========================================
    // 4. 聯絡表單前端驗證模擬
    // ==========================================
    const contactForm = document.getElementById('contactForm');
    const formStatus = document.getElementById('formStatus');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault(); // 阻止表單預設的重整送出行為

            // 取得各欄位數值並去除前後空白
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const subject = document.getElementById('subject').value.trim();
            const message = document.getElementById('message').value.trim();

            // 基本驗證：防呆
            if (!name || !email || !subject || !message) {
                formStatus.textContent = '請填寫所有必填欄位。';
                formStatus.className = 'form-status error';
                return;
            }

            // 簡單 Email 格式驗證
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                formStatus.textContent = '請輸入有效的電子郵件地址。';
                formStatus.className = 'form-status error';
                return;
            }

            // 模擬 AJAX 送出成功
            formStatus.textContent = '訊息已成功送出！我會盡快回覆您。';
            formStatus.className = 'form-status success';
            
            // 清空表單欄位
            contactForm.reset();

            // 3秒後自動清除狀態訊息
            setTimeout(() => {
                formStatus.textContent = '';
                formStatus.className = 'form-status';
            }, 3000);
        });
    }
});
