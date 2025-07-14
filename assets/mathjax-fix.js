// MathJax configuration fix
document.addEventListener('DOMContentLoaded', function() {
    // Override the incorrect MathJax configuration
    window.MathJax = {
        tex: {
            inlineMath: [['$', '$'], ['\\(', '\\)']],
            displayMath: [['$$', '$$'], ['\\[', '\\]']],
            processEnvironments: true,
            processEscapes: true
        },
        options: {
            enableArabic: true,
            renderActions: {
                addArabicRTL: [10, (doc) => {
                    const textNodes = document.querySelectorAll('.mjx-mtext');
                    textNodes.forEach(node => {
                        node.style.unicodeBidi = 'plaintext';
                        node.style.fontFamily = "'Amiri', 'Scheherazade New', 'Arial', sans-serif";
                    });
                    
                    const containers = document.querySelectorAll('.MathJax, .MathJax_Display');
                    containers.forEach(container => {
                        container.style.direction = 'rtl';
                    });
                }]
            }
        },
        startup: {
            ready: () => {
                MathJax.startup.defaultReady();
                MathJax.typesetPromise().then(() => {
                    document.querySelectorAll('.mjx-char').forEach(char => {
                        char.style.direction = 'rtl';
                        char.style.unicodeBidi = 'bidi-override';
                    });
                });
            }
        }
    };

    // Force reload MathJax script
    const oldScript = document.getElementById('MathJax-script');
    if (oldScript) {
        oldScript.remove();
    }
    
    const script = document.createElement('script');
    script.id = 'MathJax-script';
    script.async = true;
    script.src = 'https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js';
    document.head.appendChild(script);
    
    console.log('MathJax configuration fixed and script reloaded');
});
