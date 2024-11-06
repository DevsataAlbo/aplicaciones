 // Inicializar GSAP ScrollTrigger
 gsap.registerPlugin(ScrollTrigger);

 // Animaciones para cada sección de texto
 document.querySelectorAll('.text-container').forEach((text, index) => {
     gsap.fromTo(text, 
         {
             opacity: 0,
             y: 100
         },
         {
             scrollTrigger: {
                 trigger: text,
                 start: "top center+=100",
                 end: "bottom center",
                 toggleActions: "play none none reverse"
             },
             opacity: 1,
             y: 0,
             duration: 1,
             ease: "power2.out"
         }
     );
 });

 // Funcionalidad del menú
 const menuBtn = document.querySelector('.menu-btn');
 const menu = document.querySelector('.menu');
 const overlay = document.querySelector('.overlay');

 menuBtn.addEventListener('click', () => {
     menuBtn.classList.toggle('active');
     menu.classList.toggle('active');
     overlay.classList.toggle('active');
 });

 // Cerrar menú al hacer click en el overlay
 overlay.addEventListener('click', () => {
     menuBtn.classList.remove('active');
     menu.classList.remove('active');
     overlay.classList.remove('active');
 });

 // Cerrar menú al hacer click en un enlace
 document.querySelectorAll('.menu-items a').forEach(link => {
     link.addEventListener('click', () => {
         menuBtn.classList.remove('active');
         menu.classList.remove('active');
         overlay.classList.remove('active');
     });
 });