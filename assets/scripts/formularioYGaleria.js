let currentImageIndex = 0;
        
// Función para cargar datos del localStorage
function loadGalleryData() {
    const savedData = localStorage.getItem('galleryData');
    return savedData ? JSON.parse(savedData) : [];
}

// Función para guardar datos en localStorage
function saveGalleryData(data) {
    localStorage.setItem('galleryData', JSON.stringify(data));
}

// Función para convertir imagen a Base64
function convertImageToBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsDataURL(file);
    });
}

// Función para manejar el envío del formulario
async function handleSubmit(event) {
    event.preventDefault();

    const imageFile = document.getElementById('imagen').files[0];
    if (!imageFile) {
        alert('Por favor selecciona una imagen');
        return;
    }

    try {
        const imageBase64 = await convertImageToBase64(imageFile);
        
        const newEntry = {
            nombre: document.getElementById('nombre').value,
            comuna: document.getElementById('comuna').value,
            contenido: document.getElementById('contenido').value,
            imagen: imageBase64,
            instagram: document.getElementById('instagram').value,
            facebook: document.getElementById('facebook').value
        };

        const galleryData = loadGalleryData();
        galleryData.push(newEntry);
        saveGalleryData(galleryData);

        // Limpiar formulario y actualizar galería
        document.getElementById('uploadForm').reset();
        createGallery();

        alert('¡Tu huerto ha sido compartido exitosamente!');
    } catch (error) {
        alert('Error al procesar la imagen. Por favor intenta de nuevo.');
        console.error(error);
    }
}

// Función para crear la galería
function createGallery() {
    const gallery = document.getElementById('gallery');
    gallery.innerHTML = ''; // Limpiar galería existente
    
    const galleryData = loadGalleryData();
    
    galleryData.forEach((item, index) => {
        const galleryItem = document.createElement('div');
        galleryItem.className = 'gallery-item';
        galleryItem.innerHTML = `
            <img src="${item.imagen}" alt="${item.nombre}">
            <div class="overlay">
                <h3>${item.nombre}</h3>
                <p>${item.comuna}</p>
            </div>
        `;
        galleryItem.onclick = () => openLightbox(index);
        gallery.appendChild(galleryItem);
    });
}

// Función para abrir el lightbox
function openLightbox(index) {
    currentImageIndex = index;
    const galleryData = loadGalleryData();
    const item = galleryData[currentImageIndex];
    
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    
    lightboxImg.src = item.imagen;
    document.getElementById('lightbox-nombre').textContent = item.nombre;
    document.getElementById('lightbox-comuna').textContent = `Comuna: ${item.comuna}`;
    document.getElementById('lightbox-contenido').textContent = `Contenido del huerto: ${item.contenido}`;
    
    let socialHTML = '';
    if (item.instagram) {
        socialHTML += `<p>Instagram: @${item.instagram}</p>`;
    }
    if (item.facebook) {
        socialHTML += `<p>Facebook: ${item.facebook}</p>`;
    }
    document.getElementById('lightbox-social').innerHTML = socialHTML;
    
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
}

// Función para cerrar el lightbox
function closeLightbox() {
    const lightbox = document.getElementById('lightbox');
    lightbox.classList.remove('active');
    document.body.style.overflow = 'auto';
}

// Función para cambiar de imagen
function changeImage(direction) {
    const galleryData = loadGalleryData();
    currentImageIndex = (currentImageIndex + direction + galleryData.length) % galleryData.length;
    openLightbox(currentImageIndex);
}

// Cerrar lightbox con la tecla ESC
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        closeLightbox();
    }
});

// Inicializar la galería cuando se carga la página
document.addEventListener('DOMContentLoaded', createGallery);

