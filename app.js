const foods = [
    "Osh", "Somsa", "Lag‘mon", "Manti", "Sho‘rva",
    "Norin", "Chuchvara", "Dimlama", "Kabob", "Mastava",
    "Shashlik", "Qozon Kabob", "Holvaytar", "Moshxo‘rda", "Xonim"
];

const colors = [
    "#FF6B6B", "#4ECDC4", "#45B7D1", "#96CEB4", "#FFEAA7",
    "#DDA0DD", "#98D8C8", "#F7D794", "#F8A5C2", "#FF9671",
    "#FFC75F", "#C9A2C3", "#85C1E2", "#F3A683", "#F7D794"
];

let canvas = document.getElementById('wheelCanvas');
let ctx = canvas.getContext('2d');
let spinBtn = document.getElementById('spinBtn');
let resultModal = document.getElementById('resultModal');
let resultName = document.getElementById('resultName');

let currentAngle = 0;
let spinning = false;
let spinSound = document.getElementById('spinSound');
let winSound = document.getElementById('winSound');

let animationId = null;
let spinStartTime = 0;
let spinDuration = 3000;
let spinStartAngle = 0;
let spinTargetAngle = 0;
let finalSector = 0;

// Audio initialization
function initAudio() {
    spinSound.load();
    winSound.load();
}

// Setup canvas size
function setupCanvas() {
    const size = Math.min(window.innerWidth * 0.85, window.innerHeight * 0.85, 600);
    canvas.width = size;
    canvas.height = size;
    canvas.style.width = `${size}px`;
    canvas.style.height = `${size}px`;
    drawWheel();
}

// Draw wheel with all sectors
function drawWheel() {
    const size = canvas.width;
    const centerX = size / 2;
    const centerY = size / 2;
    const radius = size / 2;
    const angleStep = (Math.PI * 2) / foods.length;

    ctx.clearRect(0, 0, size, size);

    for (let i = 0; i < foods.length; i++) {
        const startAngle = i * angleStep + currentAngle;
        const endAngle = startAngle + angleStep;

        // Draw sector
        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.arc(centerX, centerY, radius, startAngle, endAngle);
        ctx.fillStyle = colors[i % colors.length];
        ctx.fill();
        
        // Draw border
        ctx.strokeStyle = "#FFD700";
        ctx.lineWidth = 3;
        ctx.stroke();
        
        // Draw text
        ctx.save();
        ctx.translate(centerX, centerY);
        ctx.rotate(startAngle + angleStep / 2);
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.font = `bold ${Math.max(12, size / 25)}px "Segoe UI", "Poppins"`;
        ctx.fillStyle = "#FFFFFF";
        ctx.shadowBlur = 5;
        ctx.shadowColor = "rgba(0,0,0,0.5)";
        ctx.fillText(foods[i], radius * 0.7, 0);
        ctx.restore();
        
        // Draw inner glow
        ctx.beginPath();
        ctx.arc(centerX, centerY, radius * 0.95, startAngle, endAngle);
        ctx.strokeStyle = "rgba(255,215,0,0.3)";
        ctx.lineWidth = 2;
        ctx.stroke();
    }
    
    // Draw inner circle decoration
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius * 0.2, 0, Math.PI * 2);
    ctx.fillStyle = "#FFD700";
    ctx.fill();
    ctx.shadowBlur = 15;
    ctx.shadowColor = "rgba(255,215,0,0.8)";
    
    // Draw outer ring glow
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
    ctx.strokeStyle = "#FFD700";
    ctx.lineWidth = 5;
    ctx.stroke();
}

// Create confetti effect
function createConfetti() {
    const confettiCanvas = document.createElement('canvas');
    confettiCanvas.id = 'confettiCanvas';
    document.body.appendChild(confettiCanvas);
    confettiCanvas.width = window.innerWidth;
    confettiCanvas.height = window.innerHeight;
    
    let particles = [];
    for (let i = 0; i < 150; i++) {
        particles.push({
            x: Math.random() * confettiCanvas.width,
            y: Math.random() * confettiCanvas.height - confettiCanvas.height,
            size: Math.random() * 8 + 4,
            speedY: Math.random() * 8 + 5,
            speedX: (Math.random() - 0.5) * 4,
            color: `hsl(${Math.random() * 60 + 30}, 100%, 60%)`,
            rotation: Math.random() * 360,
            rotationSpeed: (Math.random() - 0.5) * 10
        });
    }
    
    let confCtx = confettiCanvas.getContext('2d');
    let confettiId = null;
    
    function animateConfetti() {
        confCtx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
        let active = false;
        
        for (let p of particles) {
            if (p.y < confettiCanvas.height) {
                active = true;
                p.y += p.speedY;
                p.x += p.speedX;
                p.rotation += p.rotationSpeed;
                
                confCtx.save();
                confCtx.translate(p.x, p.y);
                confCtx.rotate(p.rotation * Math.PI / 180);
                confCtx.fillStyle = p.color;
                confCtx.fillRect(-p.size/2, -p.size/2, p.size, p.size);
                confCtx.restore();
            }
        }
        
        if (active) {
            confettiId = requestAnimationFrame(animateConfetti);
        } else {
            cancelAnimationFrame(confettiId);
            confettiCanvas.remove();
        }
    }
    
    animateConfetti();
    
    setTimeout(() => {
        if (confettiId) {
            cancelAnimationFrame(confettiId);
            confettiCanvas.remove();
        }
    }, 4000);
}

// Show result with animation
function showResult(food) {
    resultName.textContent = food;
    resultModal.classList.add('show');
    createConfetti();
    
    // Mobile vibration
    if (window.navigator && window.navigator.vibrate) {
        window.navigator.vibrate(200);
    }
    
    setTimeout(() => {
        resultModal.classList.remove('show');
    }, 3000);
}

// Calculate which sector is selected
function getCurrentSector() {
    const angleStep = (Math.PI * 2) / foods.length;
    let pointerAngle = (Math.PI * 3) / 2; // 270 degrees - top pointer
    let rawAngle = (pointerAngle - currentAngle + Math.PI * 4) % (Math.PI * 2);
    let sectorIndex = Math.floor(rawAngle / angleStep);
    return sectorIndex % foods.length;
}

// Spin animation with physics
function animateSpin(timestamp) {
    const elapsed = timestamp - spinStartTime;
    let t = Math.min(1, elapsed / spinDuration);
    
    // Ease out cubic
    const easeOut = 1 - Math.pow(1 - t, 3);
    
    const currentSpinAngle = spinStartAngle + (spinTargetAngle - spinStartAngle) * easeOut;
    currentAngle = currentSpinAngle % (Math.PI * 2);
    
    drawWheel();
    
    if (t < 1) {
        animationId = requestAnimationFrame(animateSpin);
    } else {
        // Spin complete
        spinning = false;
        const finalSector = getCurrentSector();
        const winningFood = foods[finalSector];
        
        // Play win sound
        winSound.currentTime = 0;
        winSound.play().catch(e => console.log('Audio play failed:', e));
        
        // Stop spin sound
        spinSound.pause();
        spinSound.currentTime = 0;
        
        // Show result
        showResult(winningFood);
        
        // Additional glow effect on wheel
        canvas.style.filter = 'drop-shadow(0 0 30px gold)';
        setTimeout(() => {
            canvas.style.filter = '';
        }, 500);
        
        animationId = null;
    }
}

// Spin the wheel
function spinWheel() {
    if (spinning) return;
    
    // Initialize audio on user interaction
    initAudio();
    
    spinning = true;
    spinStartTime = performance.now();
    spinStartAngle = currentAngle;
    
    // Random total spin (5-15 full rotations) + random final offset
    const fullRotations = Math.floor(Math.random() * 15 + 10);
    const randomOffset = Math.random() * Math.PI * 2;
    spinTargetAngle = spinStartAngle + (fullRotations * Math.PI * 2) + randomOffset;
    
    // Play spin sound
    spinSound.currentTime = 0;
    spinSound.play().catch(e => console.log('Audio play failed:', e));
    
    // Add pulse animation to button
    spinBtn.style.transform = 'scale(0.95)';
    setTimeout(() => {
        spinBtn.style.transform = '';
    }, 100);
    
    // Mobile vibration on spin
    if (window.navigator && window.navigator.vibrate) {
        window.navigator.vibrate(100);
    }
    
    // Start animation
    if (animationId) cancelAnimationFrame(animationId);
    animationId = requestAnimationFrame(animateSpin);
}

// Create particle background
function createParticles() {
    const particlesContainer = document.getElementById('particles');
    for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        particle.style.left = Math.random() * 100 + '%';
        particle.style.width = Math.random() * 5 + 2 + 'px';
        particle.style.height = particle.style.width;
        particle.style.animationDuration = Math.random() * 10 + 5 + 's';
        particle.style.animationDelay = Math.random() * 10 + 's';
        particlesContainer.appendChild(particle);
    }
}

// Handle window resize
function handleResize() {
    setupCanvas();
}

// Add glow effect on hover for wheel
function addGlowEffects() {
    canvas.addEventListener('mouseenter', () => {
        canvas.style.filter = 'drop-shadow(0 0 20px rgba(255,215,0,0.6))';
    });
    canvas.addEventListener('mouseleave', () => {
        canvas.style.filter = '';
    });
}

// Initialize everything
function init() {
    createParticles();
    setupCanvas();
    addGlowEffects();
    spinBtn.addEventListener('click', spinWheel);
    window.addEventListener('resize', handleResize);
    
    // Draw initial wheel
    drawWheel();
}

// Start the app
init();
