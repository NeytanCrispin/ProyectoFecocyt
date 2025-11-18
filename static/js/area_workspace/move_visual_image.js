import { canvas, ctx, emptyState, wrapper } from '/static/js/shared_elements.js';

const workspace = document.querySelector(".workspace");

// Transformaciones
let scale = 1;           // Zoom actual
let posX = 0, posY = 0;  // Offset (pan)
let isPanning = false;
let startX = 0, startY = 0;

// Aplicar la transformación CSS
function updateTransform() {
    workspace.style.transform = `translate(${posX}px, ${posY}px) scale(${scale})`;
    workspace.style.transformOrigin = "0 0";  // Importante
}

// -----------------------------
//  🔍 ZOOM (Ctrl + Rueda)
// -----------------------------
workspace.addEventListener("wheel", (e) => {
    if (!e.ctrlKey) return;  // Solo si presiona CTRL

    e.preventDefault();

    const delta = e.deltaY > 0 ? -0.1 : 0.1; // Rueda hacia arriba = zoom in
    scale = Math.min(Math.max(scale + delta, 0.2), 5); // límites de zoom

    updateTransform();
});
  
// -----------------------------
//  ✋ PAN (Ctrl + Clic y arrastrar)
// -----------------------------
workspace.addEventListener("mousedown", (e) => {
    if (!e.ctrlKey || e.button !== 0) return; // Solo click izquierdo + ctrl

    isPanning = true;
    startX = e.clientX - posX;
    startY = e.clientY - posY;
});

window.addEventListener("mousemove", (e) => {
    if (!isPanning) return;

    posX = e.clientX - startX;
    posY = e.clientY - startY;

    updateTransform();
});

window.addEventListener("mouseup", () => {
    isPanning = false;
});
