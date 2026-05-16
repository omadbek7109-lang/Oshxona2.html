const foods = [
    "OSH", "SOMSA", "LAG'MON", "MANTI", "SHO'RVA",
    "NORIN", "CHUCHVARA", "DIMLAMA", "KABOB", "MASTAVA",
    "SHASHLIK", "QOZON KABOB", "HOLVAYTAR", "MOSHXO'RDA", "XONIM"
];

const colors = [
    "#FF0000", "#FF4500", "#FF6600", "#FF8C00", "#FFA500",
    "#FFB347", "#FFCC00", "#FFD700", "#FFE44D", "#00CED1",
    "#20B2AA", "#3CB371", "#32CD32", "#9ACD32", "#6B8E23"
];

let canvas = document.getElementById('wheelCanvas');
let ctx = canvas.getContext('2d');
let spinBtn = document.getElementById('spinBtn');
let popup = document.getElementById('fullscreenPopup');
let popupFoodName = document.getElementById('popupFoodName');
let closePopupBtn = document.getElementById('closePopupBtn');

let currentAngle = 0;
let spinning = false;
let spinSound = document.getElementById('spinSound');
let winSound = document.getElementById('winSound');
let tickSound = document.getElementById('tickSound');

let animationId = null;
let spinStartTime = 0;
let spinDuration = 3500;
let spinStartAngle = 0;
let spinTargetAngle = 0;
let tickInterval = null;

// Setup canvas with proper size
function setupCanvas() {
    const size = Math.min(window.innerWidth * 0.9, window.innerHeight * 0.9, 700);
    canvas.width = size;
    canvas.height = size;
    canvas.style.width = `${size}px`;
    canvas.style.height = `${size}px`;
    drawWheel();
}

// Draw 3D metallic gradient wheel
function drawWheel() {
    const size = canvas.width;
    const centerX = size / 2;
    const centerY = size / 2;
    const radius = size / 2;
    const angleStep = (Math.PI * 2) / foods.length;

    ctx.clearRect(0, 0, size, size);
    
    // Draw outer metallic ring
    ctx.save();
    ctx.shadowBlur = 20;
    ctx.shadowColor = "rgba(255, 215, 0, 0.5)";
    
    for (let i = 0; i < foods.length; i++) {
        const startAngle = i * angleStep + currentAngle;
        const endAngle = startAngle + angleStep;
        
        // Create 3D metallic gradient
        const gradient = ctx.createLinearGradient(
            centerX + Math.cos(startAngle + angleStep/2) * radius * 0.5,
            centerY + Math.sin(startAngle + angleStep/2) * radius * 0.5,
            centerX + Math.cos(startAngle + angleStep/2) * radius * 0.9,
            centerY + Math.sin(startAngle + angleStep/2) * radius * 0.9
        );
        gradient.addColorStop(0, colors[i % colors.length]);
        gradient.addColorStop(0.5, `rgba(255, 255, 255, 0.4)`);
        gradient.addColorStop(1, colors[i % colors.length]);
        
        // Draw sector
        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.arc(centerX, centerY, radius, startAngle, endAngle);
        ctx.fillStyle = gradient;
        ctx.fill();
        
        // Draw 3D border
        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.arc(centerX, centerY, radius, startAngle, endAngle);
        ctx.strokeStyle = `rgba(255, 215, 0, 0.8)`;
        ctx.lineWidth = 4;
        ctx.stroke();
        
        // Draw inner metallic shine
        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.arc(centerX, centerY, radius * 0.85, startAngle, endAngle);
        ctx.strokeStyle = `rgba(255, 255, 255, 0.3)`;
        ctx.lineWidth = 2;
        ctx.stroke();
        
        // Draw text with proper rotation
        ctx.save();
        ctx.translate(centerX, centerY);
        ctx.rotate(startAngle + angleStep / 2);
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        
        const fontSize = Math.max(14, size / 22);
        ctx.font = `900 ${fontSize}px "Poppins", "Segoe UI", Impact`;
        ctx.fillStyle = "#FFFFFF";
        ctx.shadowBlur = 8;
        ctx.shadowColor = "rgba(0,0,0,0.8)";
        
        // Add stroke to text for better readability
        ctx.strokeStyle = "#000000";
        ctx.lineWidth = 3;
        ctx.strokeText(foods[i], radius * 0.68, 0);
        ctx.fillText(foods[i], radius * 0.68, 0);
        ctx.restore();
    }
    
    // Draw 3D outer ring
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
    ctx.strokeStyle = "url(#metallicGradient)";
    ctx.lineWidth = 8;
    ctx.stroke();
    
    // Draw metallic glow
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius + 5, 0, Math.PI * 2);
    ctx.strokeStyle = "rgba(255, 215, 0, 0.5)";
    ctx.lineWidth = 3;
    ctx.stroke();
    
    ctx.restore();
}

// Advanced confetti system
function createAdvancedConfetti() {
    const confettiCanvas = document.getElementById('confettiCanvas');
    confettiCanvas.width = window.innerWidth;
    confettiCanvas.height = window.innerHeight;
    let confCtx = confettiCanvas.getContext('2d');
    
    let particles = [];
    for (let i = 0; i < 200; i++) {
        particles.push({
            x: Math.random() * confettiCanvas.width,
            y: Math.random() * confettiCanvas.height - confettiCanvas.height,
            size: Math.random() * 10 + 5,
            speedY: Math.random() * 10 + 6,
            speedX: (Math.random() - 0.5) * 5,
            color: `hsl(${Math.random() * 60 + 30}, 100%, 60%)`,
            rotation: Math.random() * 360,
            rotationSpeed: (Math.random() - 0.5) * 15,
            shape: Math.random() > 0.5 ? 'rect' : 'circle'
        });
    }
    
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
                confCtx.shadowBlur = 10;
                confCtx.shadowColor = "gold";
                
                if (p.shape === 'rect') {
                    confCtx.fillRect(-p.size/2, -p.size/2, p.size, p.size);
                } else {
                    confCtx.beginPath();
                    confCtx.arc(0, 0, p.size/2, 0, Math.PI * 2);
                    confCtx.fill();
                }
                confCtx.restore();
            }
        }
        
        if (active) {
            confettiId = requestAnimationFrame(animateConfetti);
        } else {
            cancelAnimationFrame(confettiId);
            confCtx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
        }
    }
    
    animateConfetti();
    
    setTimeout(() => {
        if (confettiId) cancelAnimationFrame(confettiId);
    }, 4000);
}

// Show fullscreen popup
function showPremiumPopup(food) {
    popupFoodName.textContent = food;
    popup.classList.add('show');
    createAdvancedConfetti();
    
    // Mobile vibration
    if (window.navigator && window.navigator.vibrate) {
        window.navigator.vibrate([200, 100, 200]);
    }
}

// Get current sector
function getCurrentSector() {
    const angleStep = (Math.PI * 2) / foods.length;
    let pointerAngle = (Math.PI * 3) / 2;
    let rawAngle = (pointerAngle - currentAngle + Math.PI * 4) % (Math.PI * 2);
    let sectorIndex = Math.floor(rawAngle / angleStep);
    return sectorIndex % foods.length;
}

// Play tick sound during spin
function startTickSound() {
    if (tickInterval) clearInterval(tickInterval);
    tickInterval = setInterval(() => {
        if (spinning) {
            tickSound.currentTime = 0;
            tickSound.play().catch(e => {});
        }
    }, 200);
}

function stopTickSound() {
    if (tickInterval) {
        clearInterval(tickInterval);
        tickInterval = null;
    }
}

// Spin animation with advanced physics
function animateSpin(timestamp) {
    const elapsed = timestamp - spinStartTime;
    let t = Math.min(1, elapsed / spinDuration);
    
    // Advanced ease-out-cubic for smooth stopping
    const easeOut = 1 - Math.pow(1 - t, 4);
    
    const currentSpinAngle = spinStartAngle + (spinTargetAngle - spinStartAngle) * easeOut;
    currentAngle = currentSpinAngle % (Math.PI * 2);
    
    drawWheel();
    
    if (t < 1) {
        animationId = requestAnimationFrame(animateSpin);
    } else {
        // Spin complete
        spinning = false;
        stopTickSound();
        
        const finalSector = getCurrentSector();
        const winningFood = foods[finalSector];
        
        // Play win sound
        winSound.currentTime = 0;
        winSound.play().catch(e => console.log('Audio:', e));
        spinSound.pause();
        spinSound.currentTime = 0;
        
        // Show result
        showPremiumPopup(winningFood);
        
        // Add massive glow effect
        canvas.style.filter = 'drop-shadow(0 0 50px gold) drop-shadow(0 0 80px #ff6600)';
        setTimeout(() => {
            canvas.style.filter = '';
        }, 800);
        
        animationId = null;
    }
}

// Spin wheel
function spinWheel() {
    if (spinning) return;
    
    spinning = true;
    spinStartTime = performance.now();
    spinStartAngle = currentAngle;
    
    // Random spins with physics
    const fullRotations = Math.floor(Math.random() * 20 + 12);
    const randomOffset = Math.random() * Math.PI * 2;
    spinTargetAngle = spinStartAngle + (fullRotations * Math.PI * 2) + randomOffset;
    
    // Play sounds
    spinSound.currentTime = 0;
    spinSound.play().catch(e => console.log('Audio:', e));
    startTickSound();
    
    // Button pulse animation
    spinBtn.style.transform = 'scale(0.95)';
    setTimeout(() => {
        spinBtn.style.transform = '';
    }, 150);
    
    // Mobile vibration
    if (window.navigator && window.navigator.vibrate) {
        window.navigator.vibrate(100);
    }
    
    // Cancel previous animation
    if (animationId) cancelAnimationFrame(animationId);
    animationId = requestAnimationFrame(animateSpin);
}

// Create premium particles
function createPremiumParticles() {
    const container = document.getElementById('particles-container');
    for (let i = 0; i < 100; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle-premium');
        particle.style.left = Math.random() * 100 + '%';
        particle.style.width = Math.random() * 6 + 2 + 'px';
        particle.style.height = particle.style.width;
        particle.style.animationDuration = Math.random() * 15 + 8 + 's';
        particle.style.animationDelay = Math.random() * 15 + 's';
        container.appendChild(particle);
    }
}

// Handle resize
function handleResize() {
    setupCanvas();
    const confettiCanvas = document.getElementById('confettiCanvas');
    if (confettiCanvas) {
        confettiCanvas.width = window.innerWidth;
        confettiCanvas.height = window.innerHeight;
    }
}

// Close popup
closePopupBtn.addEventListener('click', () => {
    popup.classList.remove('show');
});

// Initialize all
function init() {
    createPremiumParticles();
    setupCanvas();
    spinBtn.addEventListener('click', spinWheel);
    window.addEventListener('resize', handleResize);
    
    // Preload audio
    spinSound.load();
    winSound.load();
    tickSound.load();
    
    drawWheel();
}

// Start app
init(); 
