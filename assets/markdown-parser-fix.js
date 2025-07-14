// Fix for the Markdown parser to properly track units across slides
document.addEventListener('DOMContentLoaded', function() {
    // Wait for the original App to be defined
    const waitForApp = setInterval(() => {
        if (window.App) {
            clearInterval(waitForApp);
            
            // Store the original parseMarkdown function
            const originalParseMarkdown = App.parseMarkdown;
            
            // Replace with our fixed version
            App.parseMarkdown = function(mdContent) {
                const slideSections = mdContent.trim().split(/\n---\n/);
                let currentUnit = null; // Track the current unit across slides
                
                return slideSections.map((section, index) => {
                    const slide = { id: index + 1, questions: [] };
                    const lines = section.trim().split('\n');
                    let currentKey = null;
                    let buffer = [];
                    let foundUnitInThisSection = false;

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
                            currentUnit = line.replace('# Unit:', '').trim();
                            slide.unit = currentUnit;
                            foundUnitInThisSection = true;
                        } else if (currentKey) {
                            buffer.push(line);
                        }
                    }
                    flushBuffer();
                    
                    // If this section didn't define a unit but we have one from before, use it
                    if (!foundUnitInThisSection && currentUnit) {
                        slide.unit = currentUnit;
                    }
                    
                    return slide;
                });
            };
            
            console.log('Markdown parser has been fixed to properly track units across slides');
            
            // Re-fetch the content to apply the fix
            App.fetchAllContent();
        }
    }, 100);
});
