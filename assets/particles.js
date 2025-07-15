document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.createElement('canvas');
    canvas.id = 'particle-canvas';
    const slideContainer = document.getElementById('slide-container');
    if (slideContainer) {
        slideContainer.parentNode.insertBefore(canvas, slideContainer);
    }

    const ctx = canvas.getContext('2d');
    let particles = [];

    const options = {
        particleColor: "rgba(136, 136, 136, 0.5)",
        lineColor: "rgba(136, 136, 136, 0.5)",
        particleAmount: 50,
        defaultRadius: 2,
        variantRadius: 2,
        defaultSpeed: 1,
        variantSpeed: 1,
        linkRadius: 200
    };

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    function Particle(x, y) {
        this.x = x || Math.random() * canvas.width;
        this.y = y || Math.random() * canvas.height;
        this.radius = options.defaultRadius + Math.random() * options.variantRadius;
        this.speed = options.defaultSpeed + Math.random() * options.variantSpeed;
        this.directionAngle = Math.floor(Math.random() * 360);
        this.color = options.particleColor;
        this.d = {
            x: Math.cos(this.directionAngle) * this.speed,
            y: Math.sin(this.directionAngle) * this.speed
        };

        this.update = function() {
            this.x += this.d.x;
            this.y += this.d.y;
            this.checkBorders();
        };

        this.checkBorders = function() {
            if (this.x > canvas.width || this.x < 0) this.d.x *= -1;
            if (this.y > canvas.height || this.y < 0) this.d.y *= -1;
        };

        this.draw = function() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            ctx.closePath();
            ctx.fillStyle = this.color;
            ctx.fill();
        };
    }

    function createParticles() {
        for (let i = 0; i < options.particleAmount; i++) {
            particles.push(new Particle());
        }
    }

    function drawLines() {
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const distance = Math.sqrt(Math.pow(particles[j].x - particles[i].x, 2) + Math.pow(particles[j].y - particles[i].y, 2));
                if (distance <= options.linkRadius) {
                    ctx.beginPath();
                    ctx.strokeStyle = `rgba(136, 136, 136, ${0.5 - (distance / options.linkRadius) * 0.5})`;
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.stroke();
                    ctx.closePath();
                }
            }
        }
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach(particle => {
            particle.update();
            particle.draw();
        });
        drawLines();
        requestAnimationFrame(animate);
    }

    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        particles = [];
        createParticles();
    });

    createParticles();
    animate();
});
