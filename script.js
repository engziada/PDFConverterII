document.addEventListener('DOMContentLoaded', () => {
    const App = {
        slides: [],
        currentSlide: -1, // -1 for intro, slides.length for closure
        elements: {
            slideContainer: document.getElementById('slide-container'),
            prevBtn: document.getElementById('prev-btn'),
            nextBtn: document.getElementById('next-btn'),
            finishBtn: document.getElementById('finish-btn'),
            progressBar: document.getElementById('progress-bar-inner'),
            currentSlideNum: document.getElementById('current-slide-num'),
            totalSlidesNum: document.getElementById('total-slides-num'),
            unitsNav: document.querySelector('.units-nav'),
            searchBar: document.getElementById('search-bar'),
            resumeBanner: document.getElementById('resume-banner'),
            themeToggle: document.getElementById('theme-toggle'),
        },
        config: {},

        init() {
            this.applyInitialTheme();
            this.fetchAllContent();
            this.addEventListeners();
        },

        applyInitialTheme() {
            const savedTheme = localStorage.getItem('slideshow_theme') || 'light';
            if (savedTheme === 'dark') {
                document.body.classList.add('dark-mode');
                this.elements.themeToggle.checked = true;
            }
        },

        fetchAllContent() {
            Promise.all([
                fetch('config.json').then(res => res.json()),
                fetch('slideshow_content.md').then(res => res.text())
            ]).then(([config, content]) => {
                this.config = config;
                this.slides = this.parseMarkdown(content);
                this.populateConfigurableElements();
                this.generateUnitsNav();
                this.checkForSavedProgress();
            }).catch(error => {
                console.error('Error fetching content:', error);
                this.elements.slideContainer.innerHTML = `<h1>Error</h1><p>Could not load required files (config.json, slideshow_content.md).</p><pre>${error}</pre>`;
            });
        },

        populateConfigurableElements() {
            document.title = this.config.courseTitle;
            document.querySelector('.sidebar-header h2').textContent = this.config.courseTitle;
        },

        parseContent(rawText) {
            if (!rawText) return '';
            const expressions = [];
            let sanitizedText = rawText.replace(/(\$\$[\s\S]*?\$\$|\$[\s\S]*?\$)/g, (match) => {
                expressions.push(match);
                return `<!--MATH_${expressions.length - 1}-->`;
            });
            let html = marked.parse(sanitizedText);
            html = html.replace(/<!--MATH_(\d+)-->/g, (match, index) => {
                return expressions[parseInt(index, 10)];
            });
            return html;
        },

        parseMarkdown(mdContent) {
            const slideSections = mdContent.trim().split(/\n---\n/);
            return slideSections.map((section, index) => {
                const slide = { id: index + 1, questions: [] };
                const lines = section.trim().split('\n');
                let currentKey = null;
                let buffer = [];

                const flushBuffer = () => {
                    if (currentKey && buffer.length > 0) {
                        const value = buffer.join('\n').trim();
                        if (currentKey === 'question') {
                            slide.questions.push({ question: value, answer: '' });
                        } else if (currentKey === 'answer') {
                            if (slide.questions.length > 0) {
                                slide.questions[slide.questions.length - 1].answer = value;
                            }
                        } else {
                            slide[currentKey] = value;
                        }
                        buffer = [];
                    }
                };

                for (const line of lines) {
                    if (line.startsWith('### ')) {
                        flushBuffer();
                        const parts = line.split(/:/);
                        currentKey = parts[0].replace('###', '').trim().toLowerCase();
                        if (parts.length > 1) buffer.push(parts.slice(1).join(':').trim());
                    } else if (line.startsWith('# Unit:')) {
                        flushBuffer();
                        currentKey = null;
                        slide.unit = line.replace('# Unit:', '').trim();
                    } else if (currentKey) {
                        buffer.push(line);
                    }
                }
                flushBuffer();
                return slide;
            });
        },

        generateUnitsNav() {
            const units = new Map();
            this.slides.forEach(slide => {
                if (!slide.unit) return;
                if (!units.has(slide.unit)) {
                    units.set(slide.unit, []);
                }
                units.get(slide.unit).push({
                    id: slide.id,
                    lesson: slide.lesson || `Slide ${slide.id}`
                });
            });
            let navHtml = "";
            units.forEach((lessons, unitTitle) => {
                navHtml += `<h3 data-unit-title>${unitTitle}</h3><ul data-unit-list>`;
                lessons.forEach(lesson => {
                    navHtml += `<li><a href="#slide-${lesson.id}">${lesson.lesson}</a></li>`;
                });
                navHtml += "</ul>";
            });
            this.elements.unitsNav.innerHTML = navHtml;
        },
        
        render() {
            let slideHtml = '';
            if (this.currentSlide === -1) { // Intro Page
                slideHtml = `
                    <div class="special-page">
                        <div class="logo-placeholder">${this.config.logoText || ''}</div>
                        <h1>${this.config.instituteName || ''}</h1>
                        <h2>${this.config.courseTitle || ''}</h2>
                        <div class="copyright-footer">${this.config.copyrightText || ''}</div>
                    </div>
                `;
            } else if (this.currentSlide === this.slides.length) { // Closure Page
                slideHtml = `
                    <div class="special-page">
                        <h1>نهاية العرض</h1>
                        <p>نتمنى لكم كل التوفيق والنجاح في رحلتكم التعليمية.</p>
                        <div class="copyright-footer">${this.config.copyrightText || ''}</div>
                    </div>
                `;
            } else { // Regular Slide
                const slide = this.slides[this.currentSlide];
                if (!slide) return;
                let mainContentHtml = '';
                if(slide.content) mainContentHtml += this.parseContent(slide.content);
                if(slide.example) mainContentHtml += `<div class="example-block">${this.parseContent(slide.example)}</div>`;
                if(slide.note) mainContentHtml += `<div class="note-block">${this.parseContent(slide.note)}</div>`;
                if(slide.reminder) mainContentHtml += `<div class="reminder-block">${this.parseContent(slide.reminder)}</div>`;
                
                if (slide['step-by-step']) {
                    mainContentHtml += this.renderStepByStep(slide['step-by-step'], slide.questions?.[0]?.question);
                } else if (slide.questions) {
                    slide.questions.forEach((q, index) => {
                        mainContentHtml += this.renderQuestion(q, index);
                    });
                }
                slideHtml = `
                    <div class="slide-header">
                        <h1>${slide.unit || ''}</h1>
                        <h2>${slide.lesson || ''}</h2>
                    </div>
                    <div class="slide-body">
                        <div class="slide-content">${mainContentHtml}</div>
                        ${slide.image ? `<div class="illustration"><img src="images/${slide.image.trim()}" alt="${slide.lesson || ''}"></div>` : ''}
                    </div>
                `;
            }
            this.elements.slideContainer.innerHTML = slideHtml;
            this.elements.slideContainer.scrollTop = 0;
            if (window.MathJax) {
                MathJax.typesetPromise([this.elements.slideContainer]);
            }
            this.updateNavigation();
        },

        renderQuestion(q, index) {
            const questionHtml = this.parseContent(q.question);
            const answerHtml = this.parseContent(q.answer);
            const mcqRegex = /<p>a\)/;
            const tfRegex = /صواب أم خطأ/i;
            const completeRegex = /أكمل الفراغ/i;

            if (mcqRegex.test(questionHtml)) {
                return this.renderMCQ(questionHtml, answerHtml, index);
            }
            if (tfRegex.test(questionHtml)) {
                return this.renderTrueFalse(questionHtml, answerHtml, index);
            }
            if (completeRegex.test(questionHtml)) {
                return this.renderFillInTheBlank(questionHtml, answerHtml, index);
            }

            // Fallback for standard questions
            return `
                <div class="interactive-element">
                    <h4>سؤال:</h4>
                    <div>${questionHtml}</div>
                    <button class="show-answer-btn" onclick="App.toggleAnswer(this)">عرض الإجابة</button>
                    <div class="answer-container" style="display: none;">${answerHtml}</div>
                </div>
            `;
        },

        renderMCQ(questionHtml, answerHtml, qIndex) {
            const parts = questionHtml.split('<p>a)');
            const questionText = parts[0];
            const optionsHtml = '<p>a)' + parts[1];
            const answerKeyMatch = answerHtml.match(/\w\)/);
            if (!answerKeyMatch) return `<div>Error: Could not find answer key for MCQ.</div>`;
            const answerKey = answerKeyMatch[0].replace(')','');
            
            const options = optionsHtml.split(/<p>(?=\w\))/g).map(opt => {
                const match = opt.match(/<p>(\w\))/);
                if (!match) return '';
                const key = match[1];
                const text = opt.replace(/<p>\w\)/, '').trim();
                return `<li tabindex="0" role="button" data-option="${key}" onclick="App.checkMCQAnswer(this)">
                          <span class="option-key">${key}</span>
                          <span class="option-text">${text}</span>
                        </li>`;
            }).join('');

            return `
                <div class="interactive-element mcq-container" id="mcq-${qIndex}" data-answer-key="${answerKey}">
                    <h4>اختر الإجابة الصحيحة:</h4>
                    <div class="question-text">${questionText}</div>
                    <ul class="mcq-options">${options}</ul>
                    <div class="feedback-container"></div>
                </div>
            `;
        },

        renderTrueFalse(questionHtml, answerHtml, qIndex) {
            const questionText = questionHtml.replace(/<h3>.*<\/h3>/, '').replace(/<p>صواب أم خطأ<\/p>/i, '').trim();
            const correctAnswer = /صواب/i.test(answerHtml); // true for "صواب", false for "خطأ"
            return `
                <div class="interactive-element tf-container" id="tf-${qIndex}" data-answer="${correctAnswer}">
                    <h4>صواب أم خطأ:</h4>
                    <div class="question-text">${questionText}</div>
                    <div class="tf-buttons">
                        <button data-choice="true" onclick="App.checkTFAnswer(this)">صواب</button>
                        <button data-choice="false" onclick="App.checkTFAnswer(this)">خطأ</button>
                    </div>
                    <div class="feedback-container"></div>
                </div>
            `;
        },

        renderFillInTheBlank(questionHtml, answerHtml, qIndex) {
            const questionText = questionHtml.replace(/<h3>.*<\/h3>/, '').replace(/<p>أكمل الفراغ:<\/p>/i, '').trim();
            const answers = answerHtml.replace(/<p>/g, '').replace(/<\/p>/g, '').split(',').map(a => a.trim());
            
            let blankIndex = 0;
            const processedQuestion = questionText.replace(/_{3,}/g, () => {
                blankIndex++;
                return `<input type="text" class="blank-input" id="blank-${qIndex}-${blankIndex}" data-blank-index="${blankIndex}">`;
            });

            return `
                <div class="interactive-element fitb-container" id="fitb-${qIndex}" data-answers='${JSON.stringify(answers)}'>
                    <h4>أكمل الفراغ:</h4>
                    <div class="question-text">${processedQuestion}</div>
                    <button onclick="App.checkFillBlankAnswer(this)">تحقق من الإجابة</button>
                    <div class="feedback-container"></div>
                </div>
            `;
        },

        renderStepByStep(content, questionText) {
            const steps = content.split('\n***\n').map(step => this.parseContent(step));
            let stepsHtml = '';
            steps.forEach((step, index) => {
                stepsHtml += `<div class="step" style="display: none;">${step}</div>`;
            });
            return `
                <div class="interactive-element step-by-step-container">
                    <h4>${questionText ? this.parseContent(questionText) : 'الحل خطوة بخطوة:'}</h4>
                    <div class="steps-wrapper">${stepsHtml}</div>
                    <div class="step-controls">
                        <button class="next-step-btn" onclick="App.revealNextStep(this)">عرض الخطوة الأولى</button>
                        <button class="reset-step-btn" style="display: none;" onclick="App.resetSteps(this)">إعادة</button>
                    </div>
                </div>
            `;
        },

        revealNextStep(button) {
            const container = button.closest('.step-by-step-container');
            const steps = container.querySelectorAll('.step');
            let currentStep = parseInt(container.dataset.currentStep || '-1', 10);
            currentStep++;
            if (currentStep < steps.length) {
                steps[currentStep].style.display = 'block';
                container.dataset.currentStep = currentStep;
                button.textContent = `عرض الخطوة التالية`;
            }
            if (currentStep === steps.length - 1) {
                button.style.display = 'none';
            }
            container.querySelector('.reset-step-btn').style.display = 'inline-block';
        },

        resetSteps(button) {
            const container = button.closest('.step-by-step-container');
            const steps = container.querySelectorAll('.step');
            steps.forEach(step => step.style.display = 'none');
            container.dataset.currentStep = '-1';
            const nextBtn = container.querySelector('.next-step-btn');
            nextBtn.style.display = 'inline-block';
            nextBtn.textContent = 'عرض الخطوة الأولى';
            button.style.display = 'none';
        },

        checkMCQAnswer(optionElement) {
            const container = optionElement.closest('.mcq-container');
            if (container.classList.contains('answered')) return;

            const chosenKey = optionElement.dataset.option;
            const correctKey = container.dataset.answerKey;
            const feedbackContainer = container.querySelector('.feedback-container');

            optionElement.classList.add('selected');

            if (chosenKey === correctKey) {
                optionElement.classList.add('correct');
                feedbackContainer.textContent = 'إجابة صحيحة!';
                feedbackContainer.className = 'feedback-container correct';
            } else {
                optionElement.classList.add('incorrect');
                const correctLi = container.querySelector(`[data-option="${correctKey}"]`);
                if (correctLi) correctLi.classList.add('correct-highlight');
                feedbackContainer.textContent = `إجابة خاطئة. الصحيح هو ${correctKey}.`;
                feedbackContainer.className = 'feedback-container incorrect';
            }
            container.classList.add('answered');
        },

        checkTFAnswer(button) {
            const container = button.closest('.tf-container');
            if (container.classList.contains('answered')) return;

            const choice = button.dataset.choice === 'true';
            const correctAnswer = container.dataset.answer === 'true';
            const feedbackContainer = container.querySelector('.feedback-container');

            if (choice === correctAnswer) {
                button.classList.add('correct');
                feedbackContainer.textContent = 'إجابة صحيحة!';
                feedbackContainer.className = 'feedback-container correct';
            } else {
                button.classList.add('incorrect');
                feedbackContainer.textContent = `إجابة خاطئة.`;
                feedbackContainer.className = 'feedback-container incorrect';
            }
            container.classList.add('answered');
            // Disable both buttons
            container.querySelectorAll('.tf-buttons button').forEach(btn => btn.disabled = true);
        },

        checkFillBlankAnswer(button) {
            const container = button.closest('.fitb-container');
            if (container.classList.contains('answered')) return;

            const inputs = container.querySelectorAll('.blank-input');
            const answers = JSON.parse(container.dataset.answers);
            const feedbackContainer = container.querySelector('.feedback-container');
            let allCorrect = true;

            inputs.forEach((input, index) => {
                const userAnswer = input.value.trim();
                const correctAnswer = answers[index];
                if (userAnswer.toLowerCase() === correctAnswer.toLowerCase()) {
                    input.classList.remove('incorrect');
                    input.classList.add('correct');
                } else {
                    input.classList.remove('correct');
                    input.classList.add('incorrect');
                    allCorrect = false;
                }
                input.disabled = true; // Disable input after check
            });

            if (allCorrect) {
                feedbackContainer.textContent = 'ممتاز، كل الإجابات صحيحة!';
                feedbackContainer.className = 'feedback-container correct';
            } else {
                feedbackContainer.textContent = 'لديك بعض الأخطاء، الإجابات الصحيحة موضحة بالأخضر.';
                feedbackContainer.className = 'feedback-container incorrect';
                // Show correct answers for incorrect inputs
                inputs.forEach((input, index) => {
                    if (input.classList.contains('incorrect')) {
                        const correctAnswer = answers[index];
                        let tooltip = document.createElement('span');
                        tooltip.className = 'correct-answer-tooltip';
                        tooltip.textContent = correctAnswer;
                        input.parentNode.insertBefore(tooltip, input.nextSibling);
                    }
                });
            }
            container.classList.add('answered');
            button.style.display = 'none'; // Hide check button
        },

        toggleAnswer(button) {
            const answerDiv = button.nextElementSibling;
            const isHidden = answerDiv.style.display === 'none' || answerDiv.style.display === '';
            answerDiv.style.display = isHidden ? 'block' : 'none';
            button.textContent = isHidden ? 'إخفاء الإجابة' : 'عرض الإجابة';
        },

        updateNavigation() {
            this.elements.prevBtn.disabled = this.currentSlide < 0;
            this.elements.nextBtn.disabled = this.currentSlide >= this.slides.length;
            const totalContent = this.slides.length + 1;
            const currentProgress = this.currentSlide < 0 ? 0 : this.currentSlide + 1;
            const progressPercent = (currentProgress / totalContent) * 100;
            this.elements.progressBar.style.width = `${progressPercent}%`;
            this.elements.currentSlideNum.textContent = this.currentSlide >= 0 ? this.currentSlide + 1 : 'C';
            this.elements.totalSlidesNum.textContent = this.slides.length;
            document.querySelectorAll('.units-nav a').forEach(link => link.classList.remove('active'));
            if (this.currentSlide >= 0 && this.currentSlide < this.slides.length) {
                const activeLink = document.querySelector(`.units-nav a[href="#slide-${this.slides[this.currentSlide].id}"]`);
                if (activeLink) activeLink.classList.add('active');
            }
        },

        goToSlide(index) {
            if (index >= -1 && index <= this.slides.length) {
                this.currentSlide = index;
                localStorage.setItem('slideshow_progress', this.currentSlide);
                this.render();
            }
        },

        checkForSavedProgress() {
            const savedSlide = localStorage.getItem('slideshow_progress');
            if (savedSlide !== null) {
                this.elements.resumeBanner.classList.add('visible');
                document.getElementById('resume-yes').onclick = () => {
                    this.goToSlide(parseInt(savedSlide, 10));
                    this.elements.resumeBanner.classList.remove('visible');
                };
                document.getElementById('resume-no').onclick = () => {
                    localStorage.removeItem('slideshow_progress');
                    this.elements.resumeBanner.classList.remove('visible');
                    this.goToSlide(-1); // Start from intro
                };
            } else {
                this.goToSlide(-1); // Start from intro
            }
        },

        addEventListeners() {
            this.elements.nextBtn.addEventListener('click', () => this.goToSlide(this.currentSlide + 1));
            this.elements.prevBtn.addEventListener('click', () => this.goToSlide(this.currentSlide - 1));
            this.elements.finishBtn.addEventListener('click', () => this.goToSlide(this.slides.length));
            
            this.elements.unitsNav.addEventListener('click', (e) => {
                if (e.target.tagName === 'A') {
                    e.preventDefault();
                    const slideId = parseInt(e.target.getAttribute('href').replace('#slide-', ''), 10);
                    const slideIndex = this.slides.findIndex(s => s.id === slideId);
                    if(slideIndex !== -1) this.goToSlide(slideIndex);
                }
            });

            this.elements.searchBar.addEventListener('input', (e) => {
                const searchTerm = e.target.value.toLowerCase();
                const units = this.elements.unitsNav.querySelectorAll('[data-unit-title]');
                
                units.forEach(unitHeader => {
                    const list = unitHeader.nextElementSibling;
                    const lessons = list.querySelectorAll('li');
                    let visibleLessons = 0;
                    
                    lessons.forEach(lesson => {
                        const link = lesson.querySelector('a');
                        const lessonText = link.textContent.toLowerCase();
                        const originalText = link.dataset.originalText || link.textContent;
                        link.dataset.originalText = originalText;

                        if (lessonText.includes(searchTerm)) {
                            lesson.classList.remove('hidden');
                            visibleLessons++;
                            const regex = new RegExp(searchTerm, 'gi');
                            link.innerHTML = originalText.replace(regex, (match) => `<mark>${match}</mark>`);
                        } else {
                            lesson.classList.add('hidden');
                            link.innerHTML = originalText;
                        }
                    });

                    if (visibleLessons === 0) {
                        unitHeader.classList.add('hidden');
                    } else {
                        unitHeader.classList.remove('hidden');
                    }
                });
            });

            this.elements.themeToggle.addEventListener('change', () => {
                if (this.elements.themeToggle.checked) {
                    document.body.classList.add('dark-mode');
                    localStorage.setItem('slideshow_theme', 'dark');
                } else {
                    document.body.classList.remove('dark-mode');
                    localStorage.setItem('slideshow_theme', 'light');
                }
            });

            document.addEventListener('keydown', (e) => {
                if (e.target.tagName === 'INPUT') return; // Don't navigate when typing in search
                if (e.key === 'ArrowRight') {
                    this.goToSlide(this.currentSlide + 1);
                } else if (e.key === 'ArrowLeft') {
                    this.goToSlide(this.currentSlide - 1);
                }
            });
        }
    };
    
    window.App = App;
    App.init();
});