import { canvas, ctx, emptyState, wrapper } from '/static/js/shared_elements.js';

// Inicialmente: mostrar solo el mensaje vacío
canvas.style.display = "none";
emptyState.style.display = "block";

// Evitar que el navegador abra la imagen al soltarla
wrapper.addEventListener("dragover", (e) => {
  e.preventDefault();
});

wrapper.addEventListener("drop", (e) => {
  e.preventDefault();

  const file = e.dataTransfer.files[0];
  if (file && file.type.startsWith("image/")) {
    const reader = new FileReader();

    reader.onload = function(event) {
      const img = new Image();
      img.onload = function() {
        // Ajustar el tamaño del canvas al tamaño real de la imagen
        canvas.width = img.width;
        canvas.height = img.height;

        // Actualizar los valores de Alto y Ancho en el HTML
        document.getElementById("img-width").value = img.width;
        document.getElementById("img-height").value = img.height;


        // Mostrar canvas y ocultar mensaje vacío
        emptyState.style.display = "none";
        canvas.style.display = "block";

        // Limpiar canvas y dibujar la imagen
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 0, 0);
      };
      img.src = event.target.result;
    };

    reader.readAsDataURL(file);
  }
});
