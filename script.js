// Variables globales
let thoughtForms = [];
let mousePressed = false;
let holdTimer = null;
let interactionCount = 0;
let audioContext = null;
let isCapturing = false;
let userInteracted = false;

// Fragmentos de texto
const fragments = [
    "Entre la presencia y el vacío",
    "Los pensamientos toman forma",
    "Lo que fue sólido deviene vapor",
    "Memorias pidiendo ser recordadas",
    "Filtrando el holograma del olvido",
    "La consciencia juega, explora y se experimenta",
    "La frontera se disuelve",
    "La energía sigue a la atención",
    "Lo visto y lo no visto convergen",
    "Susurros desde el umbral",
    "El tiempo se pliega y despliega en distintas dimensiones",
    "Ecos de mundos paralelos",
    "Resonancias interdimensionales",
    "Fragmentos de luz y oscuridad consciente",
    "El espacio entre y en respiraciones, allí somos y recordamos",
    "Esferas de posibilidades"
];

// Inicializar audio
function initAudio() {
    if (!audioContext) {
        try {
            audioContext = new (window.AudioContext || window.webkitAudioContext)();
            // Resumir contexto si está suspendido
            if (audioContext.state === 'suspended') {
                audioContext.resume();
            }
        } catch (error) {
            console.warn('Audio no disponible:', error);
        }
    }
}

// Reproducir sonido de forma de pensamiento
function playThoughtFormSound(type = 'pink-form') {
    if (!audioContext) return;
    
    const now = audioContext.currentTime;
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    const filter = audioContext.createBiquadFilter();
    
    // Frecuencias base según tipo
    let baseFreq;
    switch(type) {

        case 'pink-form':
            baseFreq = 220 + Math.random() * 110;
            break;
        case 'green-form':
            baseFreq = 550 + Math.random() * 275;
            break;
        case 'white-form':
            baseFreq = 440 + Math.random() * 220;
            break;
        case 'grey-form':
            baseFreq = 110 + Math.random() * 55;
            break;
        default:
            baseFreq = 330 + Math.random() * 165;
    }
    
    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(baseFreq, now);
    oscillator.frequency.exponentialRampToValueAtTime(baseFreq * 1.5, now + 0.1);
    oscillator.frequency.exponentialRampToValueAtTime(baseFreq * 0.8, now + 0.8);
    
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(2000, now);
    filter.Q.setValueAtTime(0.5, now);
    
    gainNode.gain.setValueAtTime(0, now);
    gainNode.gain.linearRampToValueAtTime(0.1, now + 0.1);
    gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.8);
    
    oscillator.connect(filter);
    filter.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    oscillator.start(now);
    oscillator.stop(now + 0.8);
}

// Reproducir sonido de vórtice
function playVortexSound() {
    if (!audioContext) return;
    
    const now = audioContext.currentTime;
    
    // Múltiples osciladores para contenido armónico rico
    for (let i = 0; i < 3; i++) {
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.type = 'triangle';
        oscillator.frequency.setValueAtTime(440 * (i + 1), now);
        oscillator.frequency.exponentialRampToValueAtTime(880 * (i + 1), now + 0.5);
        
        gainNode.gain.setValueAtTime(0, now);
        gainNode.gain.linearRampToValueAtTime(0.03 / (i + 1), now + 0.1);
        gainNode.gain.exponentialRampToValueAtTime(0.001, now + 1.5);
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.start(now);
        oscillator.stop(now + 1.5);
    }
}

// Reproducir sonido de traza de memoria
function playMemorySound() {
    if (!audioContext || Math.random() > 0.3) return;
    
    const now = audioContext.currentTime;
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(660 + Math.random() * 440, now);
    
    gainNode.gain.setValueAtTime(0, now);
    gainNode.gain.linearRampToValueAtTime(0.02, now + 0.05);
    gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.3);
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    oscillator.start(now);
    oscillator.stop(now + 0.3);
}

// Crear efecto visual de clic
function createClickEffect(x, y) {
    const effect = document.createElement('div');
    effect.className = 'click-effect';
    effect.style.left = `${x - 10}px`;
    effect.style.top = `${y - 20}px`;
    
    document.body.appendChild(effect);
    
    setTimeout(() => {
        if (effect.parentElement) {
            document.body.removeChild(effect);
        }
    }, 600);
}

// Crear punto de interacción
function createInteractionPoint(x, y) {
    const point = document.createElement('div');
    point.className = 'interaction-point';
    point.style.left = `${x - 2}px`;
    point.style.top = `${y - 2}px`;
    
    document.body.appendChild(point);
    
    setTimeout(() => {
        if (point.parentElement) {
            document.body.removeChild(point);
        }
    }, 2000);
}

// Crear forma de pensamiento
function createThoughtForm(x, y, panel) {
    if (isCapturing) return null;
    
    const form = document.createElement('div');
    form.className = 'thought-form';
    
    const types = ['pink-form', 'green-form', 'white-form', 'grey-form'];
    const randomType = types[Math.floor(Math.random() * types.length)];
    form.classList.add(randomType);
    
    const size = 30 + Math.random() * 80;
    form.style.width = `${size}px`;
    form.style.height = `${size}px`;
    form.style.left = `${x - size/2}px`;
    form.style.top = `${y - size/2}px`;
    
    // Atributos ARIA para accesibilidad
    form.setAttribute('role', 'button');
    form.setAttribute('aria-label', 'Forma de pensamiento');
    form.setAttribute('tabindex', '0');
    
    panel.appendChild(form);
    thoughtForms.push(form);
    
    // Actualizar contador
    updateFormCounter();
    
    // Reproducir sonido
    playThoughtFormSound(randomType);
    
    // Animación de aparición
    setTimeout(() => form.classList.add('visible'), 50);
    
    // Ocasionalmente añadir fragmento de texto
    if (Math.random() < 0.3 && fragments.length > 0) {
        setTimeout(() => {
            createTextFragment(x, y, panel);
        }, 500);
    }
    
    // Interacción al hacer clic
    form.addEventListener('click', (e) => {
        e.stopPropagation();
        form.classList.toggle('focused');
        createVortex(x, y, panel);
    });
    
    // Interacción por teclado (accesibilidad)
    form.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            form.classList.toggle('focused');
            createVortex(x, y, panel);
        }
    });
    
    return form;
}

// Actualizar contador de formas
function updateFormCounter() {
    let counter = document.getElementById('formCounter');
    if (!counter) {
        counter = document.createElement('div');
        counter.id = 'formCounter';
        counter.className = 'form-counter';
        document.body.appendChild(counter);
    }
    
    const activeForms = thoughtForms.filter(form => 
        form.parentElement && form.classList.contains('visible')
    ).length;
    
    counter.textContent = `Formas: ${activeForms}`;
    counter.title = `${activeForms} formas de pensamiento visibles`;
}

// Crear fragmento de texto
function createTextFragment(x, y, panel) {
    const text = document.createElement('div');
    text.className = 'text-fragment';
    text.textContent = fragments[Math.floor(Math.random() * fragments.length)];
    text.style.left = `${x}px`;
    text.style.top = `${y + 60}px`;
    text.setAttribute('aria-live', 'polite');
    
    panel.appendChild(text);
    
    setTimeout(() => text.classList.add('visible'), 500);
    
    // Auto-eliminación después de un tiempo
    setTimeout(() => {
        text.style.opacity = '0';
        setTimeout(() => {
            if (text.parentElement) {
                panel.removeChild(text);
            }
        }, 1000);
    }, 4000);
}

// Crear vórtice
function createVortex(x, y, panel) {
    const vortex = document.createElement('div');
    vortex.className = 'vortex';
    vortex.style.left = `${x - 50}px`;
    vortex.style.top = `${y - 50}px`;
    vortex.setAttribute('aria-hidden', 'true');
    
    panel.appendChild(vortex);
    
    // Reproducir sonido de vórtice
    playVortexSound();
    
    setTimeout(() => vortex.classList.add('active'), 100);
    
    // Auto-eliminación
    setTimeout(() => {
        vortex.style.opacity = '0';
        setTimeout(() => {
            if (vortex.parentElement) {
                panel.removeChild(vortex);
            }
        }, 1000);
    }, 3000);
}

// Crear traza de memoria
function createMemoryTrace(x, y) {
    if (!userInteracted || Math.random() > 0.1) return;
    
    const trace = document.createElement('div');
    trace.className = 'memory-trace';
    trace.style.left = `${x}px`;
    trace.style.top = `${y}px`;
    trace.setAttribute('aria-hidden', 'true');
    
    document.body.appendChild(trace);
    
    // Sonido sutil
    playMemorySound();
    
    setTimeout(() => {
        if (trace.parentElement) {
            document.body.removeChild(trace);
        }
    }, 3000);
}

// Capturar pantalla
function captureScreenshot() {
    if (isCapturing) return;
    
    isCapturing = true;
    const overlay = document.getElementById('captureOverlay');
    const downloadBtn = document.getElementById('downloadBtn');
    const btnText = downloadBtn.querySelector('.btn-text');
    
    // Efecto visual de captura
    overlay.classList.add('active');
    btnText.textContent = 'Capturando...';
    downloadBtn.disabled = true;
    
    setTimeout(() => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        
        // Alta resolución
        const scale = 2;
        canvas.width = window.innerWidth * scale;
        canvas.height = window.innerHeight * scale;
        ctx.scale(scale, scale);
        
        // Dibujar fondo gradiente
        const gradient = ctx.createLinearGradient(0, 0, window.innerWidth, window.innerHeight);
        gradient.addColorStop(0, '#e8e6e3');
        gradient.addColorStop(0.5, '#d4d2d0');
        gradient.addColorStop(1, '#b8b6b4');
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);
        
        // Dibujar todas las formas de pensamiento visibles
        thoughtForms.forEach(form => {
            if (form.parentElement && form.classList.contains('visible')) {
                const rect = form.getBoundingClientRect();
                const size = parseFloat(form.style.width);
                const centerX = rect.left + size/2;
                const centerY = rect.top + size/2;
                
                // Crear gradiente según tipo
                let formGradient;
                if (form.classList.contains('pink-form')) {
                    formGradient = ctx.createRadialGradient(
                        centerX, centerY, 0, 
                        centerX, centerY, size/2
                    );
                    formGradient.addColorStop(0, 'rgba(255, 182, 193, 0.8)');
                    formGradient.addColorStop(0.4, 'rgba(255, 105, 134, 0.6)');
                    formGradient.addColorStop(0.7, 'rgba(255, 105, 134, 0.1)');
                    formGradient.addColorStop(1, 'transparent');
                } else if (form.classList.contains('white-form')) {
                    formGradient = ctx.createRadialGradient(
                        centerX, centerY, 0, 
                        centerX, centerY, size/2
                    );
                    formGradient.addColorStop(0, 'rgba(255, 255, 255, 0.9)');
                    formGradient.addColorStop(0.4, 'rgba(240, 240, 240, 0.7)');
                    formGradient.addColorStop(0.7, 'rgba(240, 240, 240, 0.2)');
                    formGradient.addColorStop(1, 'transparent');
                } else {
                    formGradient = ctx.createRadialGradient(
                        centerX, centerY, 0, 
                        centerX, centerY, size/2
                    );
                    formGradient.addColorStop(0, 'rgba(169, 169, 169, 0.8)');
                    formGradient.addColorStop(0.4, 'rgba(128, 128, 128, 0.6)');
                    formGradient.addColorStop(0.7, 'rgba(128, 128, 128, 0.2)');
                    formGradient.addColorStop(1, 'transparent');
                }
                
                ctx.fillStyle = formGradient;
                ctx.beginPath();
                ctx.arc(centerX, centerY, size/2, 0, 2 * Math.PI);
                ctx.fill();
                
                // Si está enfocado, dibujar con brillo mejorado
                if (form.classList.contains('focused')) {
                    ctx.globalAlpha = 0.3;
                    ctx.beginPath();
                    ctx.arc(centerX, centerY, size/2 * 1.2, 0, 2 * Math.PI);
                    ctx.fill();
                    ctx.globalAlpha = 1;
                }
            }
        });
        
        // Dibujar vórtices activos
        document.querySelectorAll('.vortex.active').forEach(vortex => {
            const rect = vortex.getBoundingClientRect();
            const centerX = rect.left + 50;
            const centerY = rect.top + 50;
            
            ctx.strokeStyle = 'rgba(255, 182, 193, 0.4)';
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.arc(centerX, centerY, 48, 0, 2 * Math.PI);
            ctx.stroke();
        });
        
        // Dibujar fragmentos de texto visibles
        document.querySelectorAll('.text-fragment.visible').forEach(text => {
            const rect = text.getBoundingClientRect();
            ctx.fillStyle = 'rgba(80, 80, 80, 0.8)';
            ctx.font = '14px Times New Roman';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'top';
            ctx.fillText(text.textContent, rect.left + 100, rect.top + 10);
        });
        
        // Añadir marca de tiempo y firma
        ctx.fillStyle = 'rgba(100, 100, 100, 0.5)';
        ctx.font = '12px Times New Roman';
        ctx.textAlign = 'right';
        ctx.textBaseline = 'bottom';
        const timestamp = new Date().toLocaleString('es-ES');
        ctx.fillText(`Comunicación Liminal - ${timestamp}`, 
                     window.innerWidth - 20, 
                     window.innerHeight - 20);
        
        // Añadir contador de formas
        const activeForms = thoughtForms.filter(form => 
            form.parentElement && form.classList.contains('visible')
        ).length;
        ctx.fillStyle = 'rgba(100, 100, 100, 0.5)';
        ctx.textAlign = 'left';
        ctx.fillText(`Formas creadas: ${activeForms}`, 20, window.innerHeight - 20);
        
        // Convertir a blob y descargar
        canvas.toBlob(blob => {
            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.download = `comunicacion-liminal-${Date.now()}.png`;
            link.href = url;
            link.style.display = 'none';
            
            // Trigger de descarga
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            
            // Limpiar
            URL.revokeObjectURL(url);
            
            // Restaurar UI
            setTimeout(() => {
                overlay.classList.remove('active');
                btnText.textContent = 'Capturar comunicación';
                downloadBtn.disabled = false;
                isCapturing = false;
            }, 300);
            
        }, 'image/png', 0.95);
        
    }, 200);
}

// Limpiar todas las formas
function clearAllForms() {
    thoughtForms.forEach(form => {
        if (form.parentElement) {
            form.parentElement.removeChild(form);
        }
    });
    thoughtForms = [];
    updateFormCounter();
}

// Manejar interacción del usuario
function handleUserInteraction(e) {
    // Marcar que el usuario ha interactuado
    if (!userInteracted) {
        userInteracted = true;
        initAudio(); // Inicializar audio solo en primera interacción
    }
    
    // No crear formas al hacer clic en el botón de descarga
    if (e.target.closest('#downloadBtn')) return;
    
    interactionCount++;
    
    // Ocultar instrucciones después de la primera interacción
    if (interactionCount === 1) {
        document.getElementById('instructions').classList.add('hidden');
    }
    
    // Obtener coordenadas
    let x, y;
    if (e.type.includes('touch')) {
        const touch = e.touches[0] || e.changedTouches[0];
        x = touch.clientX;
        y = touch.clientY;
    } else {
        x = e.clientX;
        y = e.clientY;
    }
    
    // Crear efecto visual
    createClickEffect(x, y);
    createInteractionPoint(x, y);
    
    // Determinar panel
    const panel = x < window.innerWidth / 2 ? 
        document.getElementById('leftPanel') : 
        document.getElementById('rightPanel');
    
    const rect = panel.getBoundingClientRect();
    const relativeX = x - rect.left;
    const relativeY = y - rect.top;
    
    // Crear forma de pensamiento
    createThoughtForm(relativeX, relativeY, panel);
}

// Inicializar eventos
function initEvents() {
    const downloadBtn = document.getElementById('downloadBtn');
    const instructions = document.getElementById('instructions');
    
    // Evento para botón de descarga
    downloadBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        e.preventDefault();
        captureScreenshot();
    });
    
    // Evento para limpiar formas (doble clic en instrucciones)
    instructions.addEventListener('dblclick', clearAllForms);
    
    // Eventos de clic (mouse y toque)
    document.addEventListener('click', handleUserInteraction);
    document.addEventListener('touchend', handleUserInteraction);
    
    // Evento para mantener presionado (revelar formas ocultas)
    document.addEventListener('mousedown', (e) => {
        if (e.target.closest('#downloadBtn')) return;
        
        mousePressed = true;
        
        holdTimer = setTimeout(() => {
            // Mantener presionado revela formas ocultas
            const panel = e.clientX < window.innerWidth / 2 ? 
                document.getElementById('leftPanel') : 
                document.getElementById('rightPanel');
            
            for (let i = 0; i < 3; i++) {
                setTimeout(() => {
                    const randomX = Math.random() * panel.offsetWidth;
                    const randomY = Math.random() * panel.offsetHeight;
                    createThoughtForm(randomX, randomY, panel);
                }, i * 300);
            }
        }, 1000);
    });
    
    document.addEventListener('mouseup', () => {
        mousePressed = false;
        clearTimeout(holdTimer);
    });
    
    // Eventos táctiles para mantener presionado
    document.addEventListener('touchstart', (e) => {
        if (e.target.closest('#downloadBtn')) return;
        
        mousePressed = true;
        
        holdTimer = setTimeout(() => {
            const touch = e.touches[0];
            const panel = touch.clientX < window.innerWidth / 2 ? 
                document.getElementById('leftPanel') : 
                document.getElementById('rightPanel');
            
            for (let i = 0; i < 3; i++) {
                setTimeout(() => {
                    const randomX = Math.random() * panel.offsetWidth;
                    const randomY = Math.random() * panel.offsetHeight;
                    createThoughtForm(randomX, randomY, panel);
                }, i * 300);
            }
        }, 1000);
    }, { passive: false });
    
    document.addEventListener('touchend', () => {
        mousePressed = false;
        clearTimeout(holdTimer);
    });
    
    // Evento para trazas de memoria (solo cuando el usuario ha interactuado)
    document.addEventListener('mousemove', (e) => {
        if (userInteracted) {
            createMemoryTrace(e.clientX, e.clientY);
        }
    });
    
    // Evento de movimiento táctil
    document.addEventListener('touchmove', (e) => {
        e.preventDefault();
        if (userInteracted && e.touches.length > 0) {
            const touch = e.touches[0];
            createMemoryTrace(touch.clientX, touch.clientY);
        }
    }, { passive: false });
    
    // Evento para tecla Escape (limpiar)
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            clearAllForms();
        }
        if (e.key === 'c' && e.ctrlKey) {
            e.preventDefault();
            captureScreenshot();
        }
    });
}

// Inicializar la aplicación
function initApp() {
    // Inicializar eventos
    initEvents();
    
    // Crear contador de formas
    updateFormCounter();
    
    // Mostrar mensaje de bienvenida
    console.log('Comunicación Liminal - Haz clic para crear formas de pensamiento');
    console.log('Mantén presionado para revelar formas ocultas');
    console.log('Doble clic en instrucciones para limpiar todo');
    console.log('Presiona ESC para limpiar o Ctrl+C para capturar');
}

// Iniciar cuando el DOM esté listo
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initApp);
} else {
    initApp();
}

// Manejar redimensionamiento de ventana
window.addEventListener('resize', updateFormCounter);

// Exportar funciones para uso en consola (debug)
if (typeof window !== 'undefined') {
    window.comunicacionLiminal = {
        createThoughtForm,
        createVortex,
        captureScreenshot,
        clearAllForms,
        getFormCount: () => thoughtForms.filter(form => 
            form.parentElement && form.classList.contains('visible')
        ).length
    };
}