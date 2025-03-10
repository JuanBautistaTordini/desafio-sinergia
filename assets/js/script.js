// Script para actualizar el valor del slider
const slider = document.getElementById("nivelSlider");
const output = document.getElementById("nivelValue");

slider.oninput = function() {
    output.innerHTML = this.value + "%";
}

// Script para las secciones colapsables
function toggleCollapsible(id) {
    const content = document.getElementById(id + "-content");
    const icon = document.getElementById(id + "-icon");
    
    content.classList.toggle("active");
    
    // Rotar el icono
    if (content.classList.contains("active")) {
        icon.style.transform = "rotate(180deg)";
    } else {
        icon.style.transform = "rotate(0)";
    }
}
// Abrir la primera sección por defecto
document.addEventListener("DOMContentLoaded", function() {
    toggleCollapsible("productos");
});
