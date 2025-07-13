document.addEventListener('DOMContentLoaded', () => {
    fetch('config.json')
        .then(response => response.json())
        .then(config => {
            // Set institute name
            const instituteNameEl = document.getElementById('institute-name');
            instituteNameEl.textContent = config.instituteName || 'اسم المؤسسة';
            
            // Set copyright with logo and text
            const copyrightEl = document.getElementById('copyright-text');
            copyrightEl.innerHTML = `
                <img src="assets/images/zlogo.png" alt="شعار المؤسسة" style="height:24px; vertical-align:middle; margin-right:8px;">
                © 2025 جميع الحقوق محفوظة لشركة
            `;

            // Populate course cards - RESTORED FUNCTIONALITY
            const grid = document.getElementById('course-grid');
            if (config.curriculums) {
                config.curriculums.forEach(course => {
                    const card = document.createElement('div');
                    card.className = 'course-card';
                    
                    // Apply theme colors
                    if (course.theme) {
                        card.style.setProperty('--primary-color', course.theme.primary);
                        card.style.setProperty('--primary-hover', course.theme.hover);
                    }

                    card.innerHTML = `
                        <h2>${course.title}</h2>
                        <p>${course.description}</p>
                        <a href="slideshow.html?curriculum=${course.id}">ابدأ الآن</a>
                    `;
                    grid.appendChild(card);
                });
            }
        })
        .catch(error => {
            console.error('خطأ في تحميل الإعدادات:', error);
            
            // Set fallback for institute name
            document.getElementById('institute-name').textContent = 'اسم المؤسسة';
            
            // Set fallback for copyright
            const copyrightEl = document.getElementById('copyright-text');
            copyrightEl.innerHTML = `
                © 2025 جميع الحقوق محفوظة لشركة
                <img src="assets/images/zlogo.png" alt="شعار المؤسسة" style="height:24px; vertical-align:middle; margin-right:8px;">
            `;
            
            // Show error message in course grid
            const grid = document.getElementById('course-grid');
            grid.innerHTML = '<p>خطأ في تحميل المناهج. يرجى المحاولة مرة أخرى لاحقاً.</p>';
        });
});