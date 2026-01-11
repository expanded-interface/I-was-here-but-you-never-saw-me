let thoughtForms = [];
        let mousePressed = false;
        let holdTimer = null;
        let interactionCount = 0;
        let currentFragmentIndex = 0;
        let isCapturing = false; 

        const fragments = [
            "No hay una sola línea del tiempo. Hay superposiciones.",
            "El tiempo no avanza: se entreteje.",
            "Los binarismos no son opuestos, sino regímenes de la percepción.",
            "Aquello que no se ve todavía, no es ausencia. Es latencia pidiendo ser recordada.",
            "Y sí, no todas las latencias son evidentes: algunas invocan atención, paciencia, escucha.",
            "Entonces allí, en el centro del cuerpo",
            "en la zona blanda de la memoria no domesticada",
            "está el recuerdo que no se defiende con armaduras.",
            "En ella habita la llave de las nuevas líneas temporales",
            "Radiante chispa lúcida, no hay límite",
            "¿Entenderlo todo?",
            "Habitar la nada y descartar la expectativa, es posibilidad.",
            "Disolverse en la anchura del no espacio, es posibilidad.",
            "formar parte del Todo, donde no hay dudas ni aclaraciones.",
            "Allí, cada suceso, toma la forma y el lugar necesarios",
            "el escenario del mayor potencial.",
            "Son tantas las vidas de experimentación encarnadas",
            "muchas",
            "hoy es el momento de integrarlas",
            "Sin embargo, nada de ello puede acontecer sin alegría y fluidez",
            "nada de ello puede acontecer sin alegría y fluidez",
            "nada de ello sin alegría y fluidez",
            "y deshacer las estructuras construidas en el miedo, el sacrificio, la rigidez, la falsa madurez y la seriedad.",
            "no es necesario enfrentarlas",
            "si no simplemente fortalecer el juego y la inocencia",
            "de manera que lo que tenga que caer, caiga por sí solo.",
            "lo que cae es ilusión",
            "toda esencia permanece intacta.",
            "En todo eso no hay lucha, hay liviandad y poder.",
        ];

function createThoughtForm(x, y, container, showText = true) {
    const form = document.createElement('div');
    form.className = 'thought-form';
    
    // Definir tipos con probabilidades personalizadas
    const types = [
        {name: 'pink-form', weight: 1},    // 25% de probabilidad
        {name: 'white-form', weight: 1},   // 10% de probabilidad
        {name: 'grey-form', weight: 1},    // 20% de probabilidad
        {name: 'lavender-form', weight: 1}, // 25% de probabilidad
        {name: 'peach-form', weight: 1},   // 25% de probabilidad
        {name: 'green-form', weight: 1}, // 25% de probabilidad
        {name: 'blue-form', weight: 1}   // 25% de probabilidad
    ];
    
    // Calcular total de pesos
    const totalWeight = types.reduce((sum, type) => sum + type.weight, 0);
    let random = Math.random() * totalWeight;
    
    // Seleccionar tipo basado en peso
    let selectedType = types[0].name;
    for (let type of types) {
        if (random < type.weight) {
            selectedType = type.name;
            break;
        }
        random -= type.weight;
    }
    
    form.classList.add(selectedType);
            
            // Responsive size based on screen width
            const maxSize = window.innerWidth < 768 ? 100 : 120;
            const minSize = window.innerWidth < 768 ? 10 : 20;
            const size = minSize + Math.random() * (maxSize - minSize);
            
            form.style.width = size + 'px';
            form.style.height = size + 'px';
            form.style.left = (x - size/2) + 'px';
            form.style.top = (y - size/2) + 'px';
            
            container.appendChild(form);
            thoughtForms.push(form);
            
            // Animate appearance
            setTimeout(() => form.classList.add('visible'), 100);
            
            // Always add text fragment when showText is true
            if (showText) {
                createTextFragment(x, y, container);
            }
            
            // Add click interaction
            form.onclick = (e) => {
                e.stopPropagation();
                form.classList.toggle('focused');
                createVortex(x, y, container);
            };
            
            return form;
        }

        function createTextFragment(x, y, container) {
            const text = document.createElement('div');
            text.className = 'text-fragment';
            text.textContent = fragments[currentFragmentIndex % fragments.length];
            currentFragmentIndex++;
            
            text.style.left = x + 'px';
            text.style.top = (y + 60) + 'px';
            
            container.appendChild(text);
            
            setTimeout(() => text.classList.add('visible'), 1000);
            setTimeout(() => {
                text.style.opacity = '0';
                setTimeout(() => container.removeChild(text), 1000);
            }, 6000);
        }

        function createVortex(x, y, container) {
            const vortex = document.createElement('div');
            vortex.className = 'vortex';
            vortex.style.left = (x - 50) + 'px';
            vortex.style.top = (y - 50) + 'px';
            
            container.appendChild(vortex);
            
            setTimeout(() => vortex.classList.add('active'), 100);
            setTimeout(() => {
                vortex.style.opacity = '0';
                setTimeout(() => container.removeChild(vortex), 1000);
            }, 3000);
        }

        function createMemoryTrace(x, y) {
            const trace = document.createElement('div');
            trace.className = 'memory-trace';
            trace.style.left = x + 'px';
            trace.style.top = y + 'px';
            
            document.body.appendChild(trace);
            
            setTimeout(() => document.body.removeChild(trace), 3000);
        }

        // Touch support for mobile
        let touchTimer = null;
        
        document.addEventListener('touchstart', (e) => {
            if (e.target.id === 'captureBtn') return;
            
            mousePressed = true;
            
            touchTimer = setTimeout(() => {
                const container = document.getElementById('mainContainer');
                const touch = e.touches[0];
                
                for (let i = 0; i < 3; i++) {
                    setTimeout(() => {
                        const randomX = touch.clientX + (Math.random() - 0.5) * 100;
                        const randomY = touch.clientY + (Math.random() - 0.5) * 100;
                        createThoughtForm(randomX, randomY, container);
                    }, i * 200);
                }
            }, 800);
        });

        document.addEventListener('touchend', () => {
            mousePressed = false;
            clearTimeout(touchTimer);
        });

        document.addEventListener('touchmove', (e) => {
            // Create subtle memory traces on touch move
            if (Math.random() < 0.05) {
                const touch = e.touches[0];
                createMemoryTrace(touch.clientX, touch.clientY);
            }
        });

        // Mouse interactions
        document.addEventListener('mousemove', (e) => {
            // Create subtle memory traces
            if (Math.random() < 0.1) {
                createMemoryTrace(e.clientX, e.clientY);
            }
        });

        document.addEventListener('mousedown', (e) => {
            mousePressed = true;
            
            holdTimer = setTimeout(() => {
                // Long press reveals hidden thought forms
                const container = document.getElementById('mainContainer');
                
                for (let i = 0; i < 5; i++) {
                    setTimeout(() => {
                        const randomX = Math.random() * window.innerWidth;
                        const randomY = Math.random() * window.innerHeight;
                        createThoughtForm(randomX, randomY, container);
                    }, i * 200);
                }
            }, 800);
        });

        document.addEventListener('mouseup', () => {
            mousePressed = false;
            clearTimeout(holdTimer);
        });

        document.addEventListener('click', (e) => {
            // Don't create thought forms if clicking the capture button
            if (e.target.id === 'captureBtn') return;
            
            interactionCount++;
            
            // Hide instructions after first interaction
            if (interactionCount === 1) {
                document.getElementById('instructions').classList.add('hidden');
            }
            
            const container = document.getElementById('mainContainer');
            createThoughtForm(e.clientX, e.clientY, container);
        });

        // Initial thought forms
        setTimeout(() => {
            const container = document.getElementById('mainContainer');
            
            createThoughtForm(150, 200, container, false);
            createThoughtForm(window.innerWidth - 150, 400, container, false);
            createThoughtForm(100, 350, container, false);
        }, 1000);

        // Periodic ambient thought forms
        setInterval(() => {
            if (Math.random() < 0.3) {
                const container = document.getElementById('mainContainer');
                
                const x = Math.random() * window.innerWidth;
                const y = Math.random() * window.innerHeight;
                
                createThoughtForm(x, y, container, false);
            }
        }, 5000);

        // Capture button functionality
document.getElementById('captureBtn').addEventListener('click', async function() {
    if (isCapturing) return;
    
    isCapturing = true;
    const btn = this;
    const originalText = btn.textContent;
    
    // Efecto visual
    btn.textContent = 'Capturando...';
    btn.disabled = true;
    
    // Crear overlay temporal
    const overlay = document.createElement('div');
    overlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(207, 207, 207, 0.1);
        backdrop-filter: blur(5px);
        z-index: 9998;
        opacity: 0;
        transition: opacity 0.3s;
    `;
    document.body.appendChild(overlay);
    
    setTimeout(() => overlay.style.opacity = '1', 10);
    
    try {
        // Opciones SIMPLIFICADAS para html2canvas
        const options = {
            scale: 2,
            backgroundColor: '#ffffff', // FONDO BLANCO ASEGURADO
            useCORS: true,
            allowTaint: false,
            logging: false,
            removeContainer: true,
            // La clave: Añadir el timestamp DURANTE la clonación
            onclone: function(clonedDoc) {
                // Crear div para el timestamp
                const timestampDiv = clonedDoc.createElement('div');
                const now = new Date();
                const timestamp = now.toLocaleString('es-ES', {
                    day: '2-digit',
                    month: '2-digit',
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                    second: '2-digit'
                });
                
                const activeForms = clonedDoc.querySelectorAll('.thought-form.visible').length;
                
                // Estilos del timestamp - VISIBLE y LEGIBLE
                timestampDiv.style.cssText = `
                    position: absolute;
                    bottom: 15px;
                    right: 15px;
                    color: #505050;
                    font-family: 'Atkinson Hyperlegible Mono', monospace;
                    font-size: 11px;
                    font-weight: 500;
                    text-align: right;
                    z-index: 10000;
                    background: rgba(255, 255, 255, 0.85);
                    padding: 6px 10px;
                    border-radius: 4px;
                    border: 0.5px solid rgba(200, 200, 200, 0.5);
                    backdrop-filter: blur(2px);
                    line-height: 1.4;
                `;
                
                timestampDiv.innerHTML = `
                    I am here and you can see me<br>
                    ${timestamp}<br>
                    Recuerdos revelados: ${activeForms}/30
                `;
                
                // Añadir al contenedor principal
                const container = clonedDoc.getElementById('mainContainer');
                if (container) {
                    container.appendChild(timestampDiv);
                    
                    // Asegurar que los elementos sean visibles
                    const forms = container.querySelectorAll('.thought-form');
                    forms.forEach(form => {
                        if (form.classList.contains('visible')) {
                            form.style.opacity = '0.7';
                        }
                    });
                }
            }
        };
        
        // Capturar el CONTENEDOR PRINCIPAL (no el body)
        const container = document.getElementById('mainContainer');
        
        // Pequeña pausa para que se renderice el overlay
        await new Promise(resolve => setTimeout(resolve, 100));
        
        // Capturar con html2canvas
        const canvas = await html2canvas(container, options);
        
        // Convertir a blob y descargar
        canvas.toBlob(blob => {
            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');
            const timestamp = new Date().toISOString()
                .slice(0, 19)
                .replace(/[T:]/g, '-')
                .replace('T', '-');
            
            link.download = `thought-forms-${timestamp}.png`;
            link.href = url;
            link.style.display = 'none';
            
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            
            URL.revokeObjectURL(url);
            
            // Restaurar UI
            setTimeout(() => {
                overlay.style.opacity = '0';
                setTimeout(() => {
                    if (overlay.parentElement) {
                        document.body.removeChild(overlay);
                    }
                }, 300);
                
                btn.textContent = 'Capturar';
                btn.disabled = false;
                isCapturing = false;
            }, 500);
            
        }, 'image/png', 0.95);
        
    } catch (error) {
        console.error('Error en captura:', error);
        
        // Restaurar UI en caso de error
        if (overlay.parentElement) {
            overlay.style.opacity = '0';
            setTimeout(() => document.body.removeChild(overlay), 300);
        }
        
        btn.textContent = 'Error - Intentar de nuevo';
        setTimeout(() => {
            btn.textContent = originalText;
            btn.disabled = false;
            isCapturing = false;
        }, 2000);
    }
});
