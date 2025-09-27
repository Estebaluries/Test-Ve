// Efecto de máquina de escribir para el título
document.addEventListener('DOMContentLoaded', function() {
    const title = document.querySelector('.logo h1');
    const originalText = title.textContent;
    title.textContent = '';
    
    let i = 0;
    const typeWriter = setInterval(function() {
        if (i < originalText.length) {
            title.textContent += originalText.charAt(i);
            i++;
        } else {
            clearInterval(typeWriter);
        }
    }, 100);
    
    // Configurar botones de WhatsApp y funcionalidades
    setupWhatsAppButtons();
    setupFormValidation();
    setupSmoothScrolling();
});

// Configuración de los botones de WhatsApp
function setupWhatsAppButtons() {
    const whatsappBtn = document.getElementById('whatsapp-btn');
    const whatsappFooter = document.getElementById('whatsapp-footer');
    
    // Número de WhatsApp (reemplazar con el número real)
    // Formato internacional: código país + número (sin +, 0, o paréntesis)
    const whatsappNumber = "526568494824"; // Ejemplo para México
    
    // Evento para el botón de WhatsApp en el formulario
    whatsappBtn.addEventListener('click', function() {
        const name = document.getElementById('name').value || 'Cliente';
        const service = document.getElementById('service').value || 'servicio';
        
        let serviceText = 'servicio';
        if (service) {
            const serviceSelect = document.getElementById('service');
            serviceText = serviceSelect.options[serviceSelect.selectedIndex].text;
        }
        
        const message = `Hola, me interesa solicitar información sobre el servicio de: ${serviceText}. Mi nombre es ${name}.`;
        const encodedMessage = encodeURIComponent(message);
        
        window.open(`https://wa.me/${whatsappNumber}?text=${encodedMessage}`, '_blank');
    });
    
    // Evento para el enlace de WhatsApp en el footer
    whatsappFooter.addEventListener('click', function(e) {
        e.preventDefault();
        const message = `Hola, me interesa conocer más sobre los servicios del Ministerio de Ve.`;
        const encodedMessage = encodeURIComponent(message);
        window.open(`https://wa.me/${whatsappNumber}?text=${encodedMessage}`, '_blank');
    });
}

// Configuración de validación de formulario
function setupFormValidation() {
    const serviceForm = document.getElementById('service-form');
    const submitBtn = document.getElementById('submit-btn');
    const submitText = document.getElementById('submit-text');
    
    // Validación en tiempo real
    const inputs = serviceForm.querySelectorAll('input, select, textarea');
    inputs.forEach(input => {
        input.addEventListener('blur', function() {
            validateField(this);
        });
        
        input.addEventListener('input', function() {
            clearFieldError(this);
        });
    });
    
    // Manejar el envío del formulario
    serviceForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Validar todos los campos antes de enviar
        let isValid = true;
        inputs.forEach(input => {
            if (!validateField(input)) {
                isValid = false;
            }
        });
        
        if (!isValid) {
            showNotification('Por favor, complete todos los campos requeridos correctamente.', 'error');
            return;
        }
        
        // Simular envío (en un caso real, aquí se enviaría a un servidor)
        simulateFormSubmission();
    });
}

// Validar campo individual
function validateField(field) {
    const value = field.value.trim();
    const fieldName = field.previousElementSibling.textContent.replace(':', '');
    
    clearFieldError(field);
    
    if (field.hasAttribute('required') && !value) {
        showFieldError(field, `${fieldName} es requerido`);
        return false;
    }
    
    if (field.type === 'email' && value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            showFieldError(field, 'Por favor ingrese un email válido');
            return false;
        }
    }
    
    if (field.type === 'tel' && value) {
        const phoneRegex = /^[\+]?[0-9\s\-\(\)]{10,}$/;
        if (!phoneRegex.test(value)) {
            showFieldError(field, 'Por favor ingrese un número de teléfono válido');
            return false;
        }
    }
    
    return true;
}

// Mostrar error en campo
function showFieldError(field, message) {
    field.style.borderColor = '#922B21';
    field.style.boxShadow = '0 0 5px rgba(146, 43, 33, 0.3)';
    
    let errorElement = field.parentNode.querySelector('.field-error');
    if (!errorElement) {
        errorElement = document.createElement('div');
        errorElement.className = 'field-error';
        errorElement.style.color = '#922B21';
        errorElement.style.fontSize = '0.85rem';
        errorElement.style.marginTop = '5px';
        errorElement.style.fontFamily = 'Courier New, monospace';
        field.parentNode.appendChild(errorElement);
    }
    
    errorElement.textContent = message;
}

// Limpiar error del campo
function clearFieldError(field) {
    field.style.borderColor = '';
    field.style.boxShadow = '';
    
    const errorElement = field.parentNode.querySelector('.field-error');
    if (errorElement) {
        errorElement.remove();
    }
}

// Simular envío de formulario
function simulateFormSubmission() {
    const submitBtn = document.getElementById('submit-btn');
    const submitText = document.getElementById('submit-text');
    
    // Deshabilitar botón y mostrar loading
    submitBtn.disabled = true;
    submitText.innerHTML = '<span class="loading"></span> Enviando...';
    
    // Simular delay de red
    setTimeout(() => {
        // Aquí normalmente se enviarían los datos a un servidor
        showNotification('¡Solicitud enviada con éxito! Un agente del Ministerio de Ve se pondrá en contacto con usted en un plazo máximo de 24 horas.', 'success');
        
        // Restaurar botón
        submitBtn.disabled = false;
        submitText.textContent = 'Enviar Solicitud';
        
        // Limpiar formulario
        document.getElementById('service-form').reset();
    }, 2000);
}

// Mostrar notificación
function showNotification(message, type) {
    // Remover notificación anterior si existe
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    // Estilos de la notificación
    notification.style.position = 'fixed';
    notification.style.top = '20px';
    notification.style.right = '20px';
    notification.style.padding = '15px 20px';
    notification.style.borderRadius = '5px';
    notification.style.color = 'white';
    notification.style.fontWeight = 'bold';
    notification.style.zIndex = '1000';
    notification.style.maxWidth = '400px';
    notification.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';
    notification.style.transform = 'translateX(150%)';
    notification.style.transition = 'transform 0.3s ease';
    
    if (type === 'success') {
        notification.style.background = 'linear-gradient(to right, #25D366, #128C7E)';
    } else {
        notification.style.background = 'linear-gradient(to right, #922B21, #7B241C)';
    }
    
    document.body.appendChild(notification);
    
    // Animación de entrada
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Auto-remover después de 5 segundos
    setTimeout(() => {
        notification.style.transform = 'translateX(150%)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 300);
    }, 5000);
}

// Configuración de smooth scrolling
function setupSmoothScrolling() {
    document.querySelectorAll('nav a').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const offsetTop = targetElement.offsetTop - 80;
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
                
                // Actualizar URL sin recargar la página
                history.pushState(null, null, targetId);
            }
        });
    });
}

// Mejora: Efecto de aparición suave al hacer scroll
function setupScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Aplicar a las tarjetas de servicio
    document.querySelectorAll('.service-card').forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });
}

// Inicializar animaciones de scroll cuando el DOM esté listo
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', setupScrollAnimations);
} else {
    setupScrollAnimations();
}