import { canvas, ctx, emptyState, wrapper } from '/static/js/shared_elements.js';

// Detectar posición del mouse en el canvas y actualizar X/Y
canvas.addEventListener("mousemove", (e) => {
    const rect = canvas.getBoundingClientRect();
    
    const x = Math.floor(e.clientX - rect.left);
    const y = Math.floor(e.clientY - rect.top);

    document.getElementById("pos-x").value = x;
    document.getElementById("pos-y").value = y;
});
