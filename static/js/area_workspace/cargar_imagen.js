const canvas = document.getElementById("main-canvas");
const ctx = canvas.getContext("2d");
const emptyState = document.getElementById("empty-state");
// Puedes elegir si el área de drop es ".workspace" o ".canvas-wrapper"
const wrapper = document.querySelector(".workspace");

// Inicialmente: mostrar solo el mensaje vacío
canvas.style.display = "none";
emptyState.style.display = "block";

// Ajustar tamaño del canvas
canvas.width = 600;
canvas.height = 400;

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
        // Cuando hay imagen: mostrar canvas y ocultar mensaje vacío
        emptyState.style.display = "none";
        canvas.style.display = "block";

        // Limpiar canvas y dibujar la imagen
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      };
      img.src = event.target.result;
    };

    reader.readAsDataURL(file);
  }
});
