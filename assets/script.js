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
        lang: 'en',
        translations: {
            en: {
                copyrightText: "© 2025 All rights reserved to",
                endOfSlideshow: "End of Slideshow",
                endOfSlideshowMessage: "We wish you the best of luck in your educational journey.",
                question: "Question:",
                showAnswer: "Show Answer",
                hideAnswer: "Hide Answer",
                chooseCorrectAnswer: "Choose the correct answer:",
                correct: "Correct!",
                incorrect: "Incorrect.",
                incorrectAnswer: "Incorrect. The correct answer is {correctKey}.",
                trueOrFalse: "True or False:",
                true: "True",
                false: "False",
                fillInTheBlank: "Fill in the blank:",
                checkAnswer: "Check Answer",
                allCorrect: "Excellent, all answers are correct!",
                someIncorrect: "You have some mistakes, the correct answers are shown in green.",
                stepByStepSolution: "Step-by-step solution:",
                showFirstStep: "Show first step",
                showNextStep: "Show next step",
                reset: "Reset"
            },
            ar: {
                copyrightText: "© 2025 جميع الحقوق محفوظة لشركة",
                endOfSlideshow: "نهاية العرض",
                endOfSlideshowMessage: "نتمنى لكم كل التوفيق والنجاح في رحلتكم التعليمية.",
                question: "سؤال:",
                showAnswer: "عرض الإجابة",
                hideAnswer: "إخفاء الإجابة",
                chooseCorrectAnswer: "اختر الإجابة الصحيحة:",
                correct: "إجابة صحيحة!",
                incorrect: "إجابة خاطئة.",
                incorrectAnswer: "إجابة خاطئة. الصحيح هو {correctKey}.",
                trueOrFalse: "صواب أم خطأ:",
                true: "صواب",
                false: "خطأ",
                fillInTheBlank: "أكمل الفراغ:",
                checkAnswer: "تحقق من الإجابة",
                allCorrect: "ممتاز، كل الإجابات صحيحة!",
                someIncorrect: "لديك بعض الأخطاء، الإجابات الصحيحة موضحة بالأخضر.",
                stepByStepSolution: "الحل خطوة بخطوة:",
                showFirstStep: "عرض الخطوة الأولى",
                showNextStep: "عرض الخطوة التالية",
                reset: "إعادة"
            }
        },

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
            const urlParams = new URLSearchParams(window.location.search);
            const curriculumId = urlParams.get('curriculum') || 'english'; // Default to 'english'
            const curriculumPath = `Markdown/${curriculumId}.md`;

            Promise.all([
                fetch('config.json').then(res => res.json()),
                fetch(curriculumPath).then(res => {
                    if (!res.ok) throw new Error(`Cannot fetch ${curriculumPath}`);
                    return res.text();
                })
            ]).then(([config, content]) => {
                this.config = config;
                const curriculum = this.config.curriculums.find(c => c.id === curriculumId);
                if (curriculum) {
                    this.config.courseTitle = curriculum.title;
                    this.lang = curriculum.lang || 'en';
                }
                
                this.slides = this.parseMarkdown(content);
                this.populateConfigurableElements();
                this.generateUnitsNav();
                this.checkForSavedProgress();
            }).catch(error => {
                console.error('Error fetching content:', error);
                this.elements.slideContainer.innerHTML = `<h1>Error</h1><p>Could not load curriculum file.</p><pre>${error}</pre>`;
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
                navHtml += `\n                    <div class="unit-container collapsed">\n                        <h3 class="unit-title">\n                            <span class="unit-title-text">${unitTitle}</span>\n                            <span class="collapse-icon">▼</span>\n                        </h3>\n                        <ul class="lesson-list">\n                `;
                lessons.forEach(lesson => {
                    navHtml += `<li><a href="#slide-${lesson.id}">${lesson.lesson}</a></li>`;
                });
                navHtml += "</ul></div>";
            });
            this.elements.unitsNav.innerHTML = navHtml;
        },
        
        render() {
            const slideHeader = document.getElementById('slide-header');
            let slideHtml = '';
            const t = this.translations[this.lang];

            if (this.currentSlide === -1) { // Intro Page
                slideHeader.innerHTML = ''; // Clear header for special pages
                slideHtml = `\n                    <div class="special-page">\n                        <img src="assets/images/logo.png" alt="Institute Logo" class="intro-logo">\n                        <h1>${this.config.instituteName || ''}</h1>\n                        <h2>${this.config.courseTitle || ''}</h2>\n                        <div class="copyright-footer">\n                        ${t.copyrightText}\n                        <img src="assets/images/zlogo.png" alt="شعار المؤسسة" style="height:24px; vertical-align:middle; margin-right:8px;">\n                        </div>\n                    </div>\n                `;
            } else if (this.currentSlide === this.slides.length) { // Closure Page
                slideHeader.innerHTML = ''; // Clear header for special pages
                slideHtml = `\n                    <div class="special-page">\n                        <h1>${t.endOfSlideshow}</h1>\n                        <p>${t.endOfSlideshowMessage}</p>\n                        <div class="copyright-footer">\n                        ${this.config.copyrightText || ''}\n                        <div class="z-logo-footer"><img src="assets/images/zlogo.png"></div>\n                        </div>\n                    </div>\n                `;
            } else { // Regular Slide
                const slide = this.slides[this.currentSlide];
                if (!slide) return;

                // Set the fixed header
                const slideHeader = document.getElementById('slide-header');
                slideHeader.innerHTML = `\n                    <div class="unit-name">${slide.unit || ''}</div>\n                    <h2 class="lesson-name">${slide.lesson || ''}</h2>\n                `;

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
                slideHtml = `\n                    <div class="slide-body">\n                        <div class="slide-content">${mainContentHtml}</div>\n                        ${slide.image ? `<div class="illustration"><img src="images/${slide.image.trim()}" alt="${slide.lesson || ''}"></div>` : ''}\n                    </div>\n                `;
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
            const t = this.translations[this.lang];

            if (mcqRegex.test(questionHtml)) {
                return this.renderMCQ(questionHtml, answerHtml, index);
            }
            if (tfRegex.test(questionHtml) || /True or False/i.test(questionHtml)) {
                return this.renderTrueFalse(questionHtml, answerHtml, index);
            }
            if (completeRegex.test(questionHtml) || /Fill in the blank/i.test(questionHtml)) {
                return this.renderFillInTheBlank(questionHtml, answerHtml, index);
            }

            // Fallback for standard questions
            return `\n                <div class="interactive-element">\n                    <h4>${t.question}</h4>\n                    <div>${questionHtml}</div>\n                    <button class="show-answer-btn" onclick="App.toggleAnswer(this)">${t.showAnswer}</button>\n                    <div class="answer-container" style="display: none;">${answerHtml}</div>\n                </div>\n            `;
        },

        renderMCQ(questionHtml, answerHtml, qIndex) {
            const parts = questionHtml.split('<p>a)');
            const questionText = parts[0];
            const optionsHtml = '<p>a)' + parts[1];
            const answerKeyMatch = answerHtml.match(/\w\)/);
            if (!answerKeyMatch) return `<div>Error: Could not find answer key for MCQ.</div>`;
            const answerKey = answerKeyMatch[0].replace(')','');
            const t = this.translations[this.lang];
            
            const options = optionsHtml.split(/<p>(?=\w\))/g).map(opt => {
                const match = opt.match(/<p>(\w\))/);
                if (!match) return '';
                const key = match[1];
                const text = opt.replace(/<p>\w\)/, '').trim();
                return `<li tabindex="0" role="button" data-option="${key}" onclick="App.checkMCQAnswer(this)">\n                          <span class="option-key">${key}</span>\n                          <span class="option-text">${text}</span>\n                        </li>`;
            }).join('');

            return `\n                <div class="interactive-element mcq-container" id="mcq-${qIndex}" data-answer-key="${answerKey}">\n                    <h4>${t.chooseCorrectAnswer}</h4>\n                    <div class="question-text">${questionText}</div>\n                    <ul class="mcq-options">${options}</ul>\n                    <div class="feedback-container"></div>\n                </div>\n            `;
        },

        renderTrueFalse(questionHtml, answerHtml, qIndex) {
            const questionText = questionHtml.replace(/<h3>.*<\/h3>/, '').replace(/<p>صواب أم خطأ<\/p>/i, '').replace(/<p>True or False<\/p>/i, '').trim();
            const correctAnswer = /صواب/i.test(answerHtml) || /True/i.test(answerHtml);
            const t = this.translations[this.lang];
            return `\n                <div class="interactive-element tf-container" id="tf-${qIndex}" data-answer="${correctAnswer}">\n                    <h4>${t.trueOrFalse}</h4>\n                    <div class="question-text">${questionText}</div>\n                    <div class="tf-buttons">\n                        <button data-choice="true" onclick="App.checkTFAnswer(this)">${t.true}</button>\n                        <button data-choice="false" onclick="App.checkTFAnswer(this)">${t.false}</button>\n                    </div>\n                    <div class="feedback-container"></div>\n                </div>\n            `;
        },

        renderFillInTheBlank(questionHtml, answerHtml, qIndex) {
            const questionText = questionHtml.replace(/<h3>.*<\/h3>/, '').replace(/<p>أكمل الفراغ:<\/p>/i, '').replace(/<p>Fill in the blank:<\/p>/i, '').trim();
            const answers = answerHtml.replace(/<p>/g, '').replace(/<\/p>/g, '').split(',').map(a => a.trim());
            const t = this.translations[this.lang];
            
            let blankIndex = 0;
            const processedQuestion = questionText.replace(/_{3,}/g, () => {
                blankIndex++;
                return `<input type="text" class="blank-input" id="blank-${qIndex}-${blankIndex}" data-blank-index="${blankIndex}">`;
            });

            return `\n                <div class="interactive-element fitb-container" id="fitb-${qIndex}" data-answers='${JSON.stringify(answers)}'>\n                    <h4>${t.fillInTheBlank}</h4>\n                    <div class="question-text">${processedQuestion}</div>\n                    <button onclick="App.checkFillBlankAnswer(this)">${t.checkAnswer}</button>\n                    <div class="feedback-container"></div>\n                </div>\n            `;
        },

        renderStepByStep(content, questionText) {
            const steps = content.split('\n***\n').map(step => this.parseContent(step));
            let stepsHtml = '';
            steps.forEach((step, index) => {
                stepsHtml += `<div class="step" style="display: none;">${step}</div>`;
            });
            const t = this.translations[this.lang];
            return `\n                <div class="interactive-element step-by-step-container">\n                    <h4>${questionText ? this.parseContent(questionText) : t.stepByStepSolution}</h4>\n                    <div class="steps-wrapper">${stepsHtml}</div>\n                    <div class="step-controls">\n                        <button class="next-step-btn" onclick="App.revealNextStep(this)">${t.showFirstStep}</button>\n                        <button class="reset-step-btn" style="display: none;" onclick="App.resetSteps(this)">${t.reset}</button>\n                    </div>\n                </div>\n            `;
        },

        revealNextStep(button) {
            const container = button.closest('.step-by-step-container');
            const steps = container.querySelectorAll('.step');
            let currentStep = parseInt(container.dataset.currentStep || '-1', 10);
            currentStep++;
            const t = this.translations[this.lang];
            if (currentStep < steps.length) {
                steps[currentStep].style.display = 'block';
                container.dataset.currentStep = currentStep;
                button.textContent = t.showNextStep;
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
            const t = this.translations[this.lang];
            nextBtn.textContent = t.showFirstStep;
            button.style.display = 'none';
        },

        checkMCQAnswer(optionElement) {
            const container = optionElement.closest('.mcq-container');
            if (container.classList.contains('answered')) return;

            const chosenKey = optionElement.dataset.option;
            const correctKey = container.dataset.answerKey;
            const feedbackContainer = container.querySelector('.feedback-container');
            const t = this.translations[this.lang];

            optionElement.classList.add('selected');

            if (chosenKey === correctKey) {
                optionElement.classList.add('correct');
                feedbackContainer.textContent = t.correct;
                feedbackContainer.className = 'feedback-container correct';
            } else {
                optionElement.classList.add('incorrect');
                const correctLi = container.querySelector(`[data-option="${correctKey}"]`);
                if (correctLi) correctLi.classList.add('correct-highlight');
                feedbackContainer.textContent = t.incorrectAnswer.replace('{correctKey}', correctKey);
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
            const t = this.translations[this.lang];

            if (choice === correctAnswer) {
                button.classList.add('correct');
                feedbackContainer.textContent = t.correct;
                feedbackContainer.className = 'feedback-container correct';
            } else {
                button.classList.add('incorrect');
                feedbackContainer.textContent = t.incorrect;
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
            const t = this.translations[this.lang];

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
                feedbackContainer.textContent = t.allCorrect;
                feedbackContainer.className = 'feedback-container correct';
            } else {
                feedbackContainer.textContent = t.someIncorrect;
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
            const t = this.translations[this.lang];
            button.textContent = isHidden ? t.hideAnswer : t.showAnswer;
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
                if (activeLink) {
                    activeLink.classList.add('active');
                    
                    const unitContainer = activeLink.closest('.unit-container');
                    if (unitContainer && unitContainer.classList.contains('collapsed')) {
                        unitContainer.classList.remove('collapsed');
                    }
                }
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
            
            document.getElementById('logo-link').addEventListener('click', (e) => {
                e.preventDefault();
                this.goToSlide(-1);
            });

            this.elements.unitsNav.addEventListener('click', (e) => {
                const link = e.target.closest('a');
                if (link) {
                    e.preventDefault();
                    const slideId = parseInt(link.getAttribute('href').replace('#slide-', ''), 10);
                    const slideIndex = this.slides.findIndex(s => s.id === slideId);
                    if(slideIndex !== -1) this.goToSlide(slideIndex);
                    return;
                }

                const unitTitle = e.target.closest('.unit-title');
                if (unitTitle) {
                    const container = unitTitle.parentElement;
                    container.classList.toggle('collapsed');
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

            document.addEventListener('click', (e) => {
                if (!this.elements.resumeBanner.contains(e.target) && this.elements.resumeBanner.classList.contains('visible')) {
                    this.elements.resumeBanner.classList.remove('visible');
                }
            });
        }
    };
    
    window.App = App;
    App.init();
});