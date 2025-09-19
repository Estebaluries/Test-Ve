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
    
    // Configurar botones de WhatsApp
    setupWhatsAppButtons();
});

// Configuración de los botones de WhatsApp
function setupWhatsAppButtons() {
    const whatsappBtn = document.getElementById('whatsapp-btn');
    const whatsappFooter = document.getElementById('whatsapp-footer');
    const serviceForm = document.getElementById('service-form');
    
    // Número de WhatsApp (reemplazar con el número real)
    const whatsappNumber = "1234567890"; // Ejemplo: 5215512345678 para México
    
    // Evento para el botón de WhatsApp en el formulario
    whatsappBtn.addEventListener('click', function() {
        const name = document.getElementById('name').value || 'Cliente';
        const service = document.getElementById('service').value || 'servicio';
        
        let serviceText = '';
        if (service) {
            const serviceSelect = document.getElementById('service');
            serviceText = serviceSelect.options[serviceSelect.selectedIndex].text;
        }
        
        const message = Hola, me interesa solicitar información sobre el servicio de: ${serviceText}. Mi nombre es ${name}.;
        const encodedMessage = encodeURIComponent(message);
        
        window.open(https://wa.me/${whatsappNumber}?text=${encodedMessage}, '_blank');
    });
    
    // Evento para el enlace de WhatsApp en el footer
    whatsappFooter.addEventListener('click', function(e) {
        e.preventDefault();
        window.open(https://wa.me/${whatsappNumber}, '_blank');
    });
    
    // Manejar el envío del formulario
    serviceForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Aquí normalmente se enviarían los datos a un servidor
        alert('Su solicitud ha sido registrada. Un agente del Ministerio de Ve se pondrá en contacto shortly.');
        this.reset();
    });
}

// Smooth scrolling para navegación
document.querySelectorAll('nav a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        window.scrollTo({
            top: targetElement.offsetTop - 20,
            behavior: 'smoot