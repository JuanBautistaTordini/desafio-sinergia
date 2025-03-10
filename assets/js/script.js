// Definición de productos
const productos = {
    "Producto A": 10000,
    "Producto B": 20000,
    "Producto C": 30000,
    "Producto D": 40000,
    "Producto E": 50000,
    "Producto F": 60000,
    "Producto G": 70000,
    "Producto H": 80000
};

// Tasas de cierre por nivel
const tasasCierre = {
    "10%": 0.3,
    "15%": 0.35,
    "20%": 0.5,
    "35%": 0.5,
    "40%": 0.5
};

// Multiplicadores para cálculo de ventas necesarias
const multiplicadoresVenta = {
    "10%": 10,
    "15%": 6.6,
    "20%": 5,
    "35%": 2.85,
    "40%": 1.8
};

// Script para las secciones colapsables
function toggleCollapsible(id) {
    const content = document.getElementById(id + "-content");
    const icon = document.getElementById(id + "-icon");
    content.classList.toggle("active");
    icon.style.transform = content.classList.contains("active") ? "rotate(180deg)" : "rotate(0deg)";
}

// Función para calcular la ganancia neta según el nivel y producto
function calcularGananciaNeta(productoValor, nivel) {
    const porcentaje = parseFloat(nivel) / 100;
    let resultado = 0;
    if (nivel === "40%") {
        resultado = productoValor * 0.4;
    } else {
        resultado = (productoValor / 1.21) * porcentaje;
    }
    return Math.round(resultado);
}

// Función para calcular ventas necesarias según nivel y objetivo
function calcularVentasNecesarias(objetivo, nivel) {
    const multiplicador = multiplicadoresVenta[nivel];
    return Math.round(objetivo * 1.21 * multiplicador);
}

// Función para calcular volumen en carrera
function calcularVolumenCarrera(ventasNecesarias, valorUSD) {
    return Math.round(ventasNecesarias / valorUSD);
}

// Función para calcular total de ventas en el mes
function calcularTotalVentas(volumenCarrera, ticketPromedio) {
    return Math.round(volumenCarrera / ticketPromedio * 10) / 10;
}

// Función para calcular nuevos datos a prospectar
function calcularNuevosDatos(totalVentas) {
    return Math.round(totalVentas * 6);
}

// Función para calcular presentaciones por mes
function calcularPresentacionesMes(totalVentas, nivel) {
    const tasaCierre = tasasCierre[nivel];
    return Math.round(totalVentas / tasaCierre);
}

// Función para calcular presentaciones por semana
function calcularPresentacionesSemana(presentacionesMes) {
    return Math.round(presentacionesMes / 4) + 1;
}

// Función para actualizar todos los cálculos
function actualizarCalculos() {
    // Obtener valores de entrada
    const nivelActual = document.getElementById("nivelActual").value;
    const ticketPromedio = parseFloat(document.getElementById("ticketPromedio").value) || 0;
    const valorUSD = parseFloat(document.getElementById("valorUSD").value) || 0;
    const objetivo = parseFloat(document.getElementById("objetivo").value) || 0;
    const productoSeleccionado = document.getElementById("productoSimulador").value;
    const valorProducto = productos[productoSeleccionado];

    // Actualizar el texto del nivel actual en los totales
    document.getElementById("nivelActualTexto").textContent = nivelActual;
    document.getElementById("nivelActualTextoVolumen").textContent = nivelActual;
    document.getElementById("nivelActualTextoVentas").textContent = nivelActual;

    // Verificar si todos los valores están ingresados
    if (ticketPromedio > 0 && valorUSD > 0 && objetivo > 0 && valorProducto) {
        // Calcular y actualizar ganancia neta actual
        const gananciaNeta = calcularGananciaNeta(valorProducto, nivelActual);
        document.getElementById("gananciaNeta").textContent = "$" + gananciaNeta.toLocaleString();

        // Lista de niveles
        const niveles = ["10%", "15%", "20%", "35%", "40%"];

        // Calcular y actualizar ventas necesarias
        niveles.forEach(nivel => {
            const ventasNecesarias = calcularVentasNecesarias(objetivo, nivel);
            document.getElementById(`ventasNecesarias${nivel.replace("%", "")}`).textContent = "$" + ventasNecesarias.toLocaleString();
            if (nivel === nivelActual) {
                document.getElementById("ventasNecesarias").textContent = "$" + ventasNecesarias.toLocaleString();
            }
        });

        // Calcular y actualizar volumen en carrera
        niveles.forEach(nivel => {
            const ventasNecesarias = calcularVentasNecesarias(objetivo, nivel);
            const volumenCarrera = calcularVolumenCarrera(ventasNecesarias, valorUSD);
            document.getElementById(`volumenCarrera${nivel.replace("%", "")}`).textContent = volumenCarrera.toLocaleString() + "usd";
            if (nivel === nivelActual) {
                document.getElementById("volumenCarrera").textContent = volumenCarrera.toLocaleString() + "usd";
            }
        });

        // Calcular y actualizar total de ventas en el mes
        niveles.forEach(nivel => {
            const ventasNecesarias = calcularVentasNecesarias(objetivo, nivel);
            const volumenCarrera = calcularVolumenCarrera(ventasNecesarias, valorUSD);
            const totalVentas = calcularTotalVentas(volumenCarrera, ticketPromedio);
            document.getElementById(`totalVentas${nivel.replace("%", "")}`).textContent = Math.round(totalVentas).toLocaleString();
            if (nivel === nivelActual) {
                document.getElementById("totalVentas").textContent = Math.round(totalVentas).toLocaleString();
                const nuevosDatos = calcularNuevosDatos(totalVentas);
                document.getElementById("nuevosDatos").textContent = nuevosDatos.toLocaleString();
                const presentacionesMes = calcularPresentacionesMes(totalVentas, nivel);
                document.getElementById("presentacionesMes").textContent = presentacionesMes.toLocaleString();
                const presentacionesSemana = calcularPresentacionesSemana(presentacionesMes);
                document.getElementById("presentacionesSemana").textContent = presentacionesSemana.toLocaleString();
            }
        });

        // Calcular y actualizar presentaciones por mes y semana para todos los niveles
        niveles.forEach(nivel => {
            const ventasNecesarias = calcularVentasNecesarias(objetivo, nivel);
            const volumenCarrera = calcularVolumenCarrera(ventasNecesarias, valorUSD);
            const totalVentas = calcularTotalVentas(volumenCarrera, ticketPromedio);
            const presentacionesMes = calcularPresentacionesMes(totalVentas, nivel);
            document.getElementById(`presentacionesMes${nivel.replace("%", "")}`).textContent = presentacionesMes.toLocaleString();
            const presentacionesSemana = calcularPresentacionesSemana(presentacionesMes);
            document.getElementById(`presentacionesSemana${nivel.replace("%", "")}`).textContent = presentacionesSemana.toLocaleString();
        });

        // Actualizar simulador
        actualizarSimulador();
    } else {
        // Si faltan valores, dejar los campos vacíos
        document.getElementById("gananciaNeta").textContent = "";
        const niveles = ["10%", "15%", "20%", "35%", "40%"];
        niveles.forEach(nivel => {
            document.getElementById(`ventasNecesarias${nivel.replace("%", "")}`).textContent = "";
            document.getElementById(`volumenCarrera${nivel.replace("%", "")}`).textContent = "";
            document.getElementById(`totalVentas${nivel.replace("%", "")}`).textContent = "";
            document.getElementById(`presentacionesMes${nivel.replace("%", "")}`).textContent = "";
            document.getElementById(`presentacionesSemana${nivel.replace("%", "")}`).textContent = "";
        });
        document.getElementById("ventasNecesarias").textContent = "";
        document.getElementById("volumenCarrera").textContent = "";
        document.getElementById("totalVentas").textContent = "";
        document.getElementById("nuevosDatos").textContent = "";
        document.getElementById("presentacionesMes").textContent = "";
        document.getElementById("presentacionesSemana").textContent = "";
    }
}

// Función para actualizar el simulador de venta
function actualizarSimulador() {
    const productoSeleccionado = document.getElementById("productoSimulador").value;
    const valorProducto = productos[productoSeleccionado];
    document.getElementById("valorProductoSimulador").textContent = "Valor: " + valorProducto.toLocaleString();
    const niveles = ["10%", "15%", "20%", "35%", "40%"];
    niveles.forEach(nivel => {
        const comision = calcularGananciaNeta(valorProducto, nivel);
        document.getElementById(`comision${nivel.replace("%", "")}`).textContent = "$" + comision.toLocaleString();
    });
}

// Función para generar y descargar el PDF
function generarPDF() {
    try {
      // Obtener datos del usuario
      const nombreSocio = document.getElementById("nombreSocio").value
      const mesActual = document.getElementById("mesActual").value
      const nivelActual = document.getElementById("nivelActual").value
      const ticketPromedio = document.getElementById("ticketPromedio").value
      const valorUSD = document.getElementById("valorUSD").value
      const objetivo = document.getElementById("objetivo").value
  
      // Obtener resultados calculados
      const gananciaNeta = document.getElementById("gananciaNeta").textContent
      const ventasNecesarias = document.getElementById("ventasNecesarias").textContent
      const volumenCarrera = document.getElementById("volumenCarrera").textContent
      const totalVentas = document.getElementById("totalVentas").textContent
      const nuevosDatos = document.getElementById("nuevosDatos").textContent
      const presentacionesMes = document.getElementById("presentacionesMes").textContent
      const presentacionesSemana = document.getElementById("presentacionesSemana").textContent
  
      // Crear el PDF
      const { jsPDF } = window.jspdf
      const doc = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
      })
  
      // Definir colores (formato RGB) - Versión simplificada
      const colors = {
        primary: [30, 58, 95],    // #1e3a5f - azul oscuro
        secondary: [44, 120, 115], // #2c7873 - verde azulado
        dark: [51, 51, 51],       // #333333 - casi negro
        white: [255, 255, 255],    // #ffffff - blanco
      }
  
      // Fondo blanco simple
      doc.setFillColor(...colors.white)
      doc.rect(0, 0, 210, 297, "F")
  
      // Encabezado simple
      doc.setFillColor(...colors.primary)
      doc.rect(0, 0, 210, 20, "F")
  
      // Título principal
      doc.setFont("helvetica", "bold")
      doc.setTextColor(...colors.white)
      doc.setFontSize(16)
      doc.text("ASISTENTE DE METAS MENSUALES", 105, 12, { align: "center" })
  
      // Información personal - Título
      doc.setFont("helvetica", "bold")
      doc.setTextColor(...colors.primary)
      doc.setFontSize(14)
      doc.text("INFORMACIÓN PERSONAL", 15, 30)
      
      // Línea separadora
      doc.setDrawColor(...colors.primary)
      doc.setLineWidth(0.5)
      doc.line(15, 32, 195, 32)
  
      // Contenido de información personal
      doc.setFont("helvetica", "normal")
      doc.setFontSize(10)
      doc.setTextColor(...colors.dark)
  
      const col1X = 15
      const col2X = 105
      const startY = 40
      const lineHeight = 7
  
      doc.text(`Nombre: ${nombreSocio}`, col1X, startY)
      doc.text(`Nivel Actual: ${nivelActual}`, col2X, startY)
  
      doc.text(`Mes: ${mesActual}`, col1X, startY + lineHeight)
      doc.text(`Ticket Promedio: $${ticketPromedio}`, col2X, startY + lineHeight)
  
      doc.text(`Valor USD: $${valorUSD}`, col1X, startY + lineHeight * 2)
  
      // Ganancia Neta - Título
      doc.setFont("helvetica", "bold")
      doc.setTextColor(...colors.primary)
      doc.setFontSize(14)
      doc.text("TU GANANCIA NETA HOY", 15, startY + lineHeight * 4)
      
      // Línea separadora
      doc.line(15, startY + lineHeight * 4 + 2, 195, startY + lineHeight * 4 + 2)
  
      // Valor de ganancia
      doc.setFont("helvetica", "bold")
      doc.setFontSize(12)
      doc.setTextColor(...colors.dark)
      doc.text(`${gananciaNeta}`, 15, startY + lineHeight * 6)
  
      // Objetivo - Título
      doc.setFont("helvetica", "bold")
      doc.setTextColor(...colors.primary)
      doc.setFontSize(14)
      doc.text("OBJETIVO", 15, startY + lineHeight * 8)
      
      // Línea separadora
      doc.line(15, startY + lineHeight * 8 + 2, 195, startY + lineHeight * 8 + 2)
  
      // Valor de objetivo
      doc.setFont("helvetica", "bold")
      doc.setFontSize(12)
      doc.setTextColor(...colors.dark)
      doc.text(`¿Cuánto quiero ganar este mes? $${objetivo}`, 15, startY + lineHeight * 10)
  
      // Resultados - Título
      doc.setFont("helvetica", "bold")
      doc.setTextColor(...colors.primary)
      doc.setFontSize(14)
      doc.text("RESULTADOS", 15, startY + lineHeight * 12)
      
      // Línea separadora
      doc.line(15, startY + lineHeight * 12 + 2, 195, startY + lineHeight * 12 + 2)
  
      // Contenido de resultados
      doc.setFont("helvetica", "normal")
      doc.setFontSize(10)
      doc.setTextColor(...colors.dark)
  
      const resultY = startY + lineHeight * 14
  
      // Resultados en formato simple
      doc.setFont("helvetica", "bold")
      doc.text("Tengo que Vender:", 15, resultY)
      doc.setFont("helvetica", "normal")
      doc.text(`${ventasNecesarias}`, 80, resultY)
  
      doc.setFont("helvetica", "bold")
      doc.text("Volumen en Carrera:", 15, resultY + lineHeight * 1.5)
      doc.setFont("helvetica", "normal")
      doc.text(`${volumenCarrera}`, 80, resultY + lineHeight * 1.5)
  
      doc.setFont("helvetica", "bold")
      doc.text("Total de Ventas en el Mes:", 15, resultY + lineHeight * 3)
      doc.setFont("helvetica", "normal")
      doc.text(`${totalVentas}`, 80, resultY + lineHeight * 3)
  
      // Plan de acción - Título
      doc.setFont("helvetica", "bold")
      doc.setTextColor(...colors.primary)
      doc.setFontSize(14)
      doc.text("TU PLAN DE ACCIÓN DESDE HOY", 15, resultY + lineHeight * 5)
      
      // Línea separadora
      doc.line(15, resultY + lineHeight * 5 + 2, 195, resultY + lineHeight * 5 + 2)
  
      // Fecha actual
      const hoy = new Date()
      const dia = hoy.getDate()
      const mes = hoy.getMonth() + 1
      const anio = hoy.getFullYear().toString().substr(-2)
  
      doc.setFont("helvetica", "italic")
      doc.setFontSize(10)
      doc.setTextColor(...colors.dark)
      doc.text(`${dia}/${mes}/${anio}`, 15, resultY + lineHeight * 6)
  
      // Contenido del plan de acción
      const planY = resultY + lineHeight * 7
      
      doc.setFont("helvetica", "bold")
      doc.text("Nuevos Datos a Prospectar:", 15, planY)
      doc.setFont("helvetica", "normal")
      doc.text(`${nuevosDatos}`, 80, planY)
  
      doc.setFont("helvetica", "bold")
      doc.text("Mínimo Presentaciones x Mes:", 15, planY + lineHeight * 1.5)
      doc.setFont("helvetica", "normal")
      doc.text(`${presentacionesMes}`, 80, planY + lineHeight * 1.5)
  
      doc.setFont("helvetica", "bold")
      doc.text("Mínimo Presentaciones x Sem.:", 15, planY + lineHeight * 3)
      doc.setFont("helvetica", "normal")
      doc.text(`${presentacionesSemana}`, 80, planY + lineHeight * 3)
  
      // Pie de página simple
      doc.setFillColor(...colors.primary)
      doc.rect(0, 285, 210, 12, "F")
      
      doc.setFont("helvetica", "normal")
      doc.setFontSize(8)
      doc.setTextColor(...colors.white)
      
      const fechaGeneracion = new Date().toLocaleDateString()
      doc.text(`Asistente de Metas Mensuales | Generado el: ${fechaGeneracion}`, 105, 292, { align: "center" })
  
      // Guardar el PDF
      doc.save(`Metas_Mensuales_${nombreSocio.replace(/\s+/g, "_")}_${mesActual}.pdf`)
  
      return true
    } catch (error) {
      console.error("Error al generar el PDF:", error)
      alert("Ocurrió un error al generar el PDF. Por favor intente nuevamente.")
      return false
    }
  }
  
  /**
   * Añade una tarjeta con fondo y borde
   * @param {Object} doc - Documento jsPDF
   * @param {Number} x - Posición X
   * @param {Number} y - Posición Y
   * @param {Number} width - Ancho
   * @param {Number} height - Alto
   * @param {Object} colors - Colores
   * @param {Array} accentColor - Color de acento (opcional)
   */
  function addCard(doc, x, y, width, height, colors, accentColor = null) {
    // Sombra (efecto de profundidad)
    doc.setFillColor(200, 200, 200)
    doc.roundedRect(x + 2, y + 2, width, height, 3, 3, "F")
  
    // Fondo principal
    doc.setFillColor(...colors.white)
    doc.roundedRect(x, y, width, height, 3, 3, "F")
  
    // Borde
    doc.setDrawColor(...colors.primary)
    doc.setLineWidth(0.5)
    doc.roundedRect(x, y, width, height, 3, 3, "S")
  
    // Acento de color (opcional)
    if (accentColor) {
      doc.setFillColor(...accentColor)
      doc.roundedRect(x, y, 5, height, 3, 3, "F")
    }
  }
  
  /**
   * Añade un título de sección con estilo
   * @param {Object} doc - Documento jsPDF
   * @param {String} title - Texto del título
   * @param {Number} x - Posición X
   * @param {Number} y - Posición Y
   * @param {Array} color - Color RGB
   */
  function addSectionTitle(doc, title, x, y, color) {
    doc.setFont("helvetica", "bold")
    doc.setFontSize(12)
    doc.setTextColor(...color)
    doc.text(title, x, y, { align: "center" })
  
    // Línea decorativa debajo del título
    const textWidth = doc.getTextWidth(title)
    const lineX = x - textWidth / 2
    doc.setDrawColor(...color)
    doc.setLineWidth(0.5)
    doc.line(lineX, y + 1, lineX + textWidth, y + 1)
  }
  
  /**
   * Añade un pie de página con información y número de página
   * @param {Object} doc - Documento jsPDF
   * @param {Object} colors - Colores
   */
  function addFooter(doc, colors) {
    const pageCount = doc.internal.getNumberOfPages()
  
    for (let i = 1; i <= pageCount; i++) {
      doc.setPage(i)
  
      // Fondo del pie de página
      doc.setFillColor(...colors.primary)
      doc.rect(0, 285, 210, 12, "F")
  
      // Texto del pie de página
      doc.setFont("helvetica", "normal")
      doc.setFontSize(8)
      doc.setTextColor(...colors.white)
  
      // Información de la empresa (izquierda)
      doc.text("Asistente de Metas Mensuales", 10, 292)
  
      // Fecha de generación (centro)
      const fechaGeneracion = new Date().toLocaleDateString()
      doc.text(`Generado el: ${fechaGeneracion}`, 105, 292, { align: "center" })
  
      // Número de página (derecha)
      doc.text(`Página ${i} de ${pageCount}`, 200, 292, { align: "right" })
    }
  }
  
  /**
   * Función para añadir un gráfico circular simple
   * @param {Object} doc - Documento jsPDF
   * @param {Number} x - Posición X del centro
   * @param {Number} y - Posición Y del centro
   * @param {Number} radius - Radio del círculo
   * @param {Number} percentage - Porcentaje a mostrar (0-100)
   * @param {Array} color - Color RGB
   */
  function addProgressCircle(doc, x, y, radius, percentage, color) {
    // Círculo de fondo
    doc.setDrawColor(200, 200, 200)
    doc.setFillColor(240, 240, 240)
    doc.circle(x, y, radius, "FD")
  
    // Dibujar el arco de progreso
    const startAngle = -90 // Comenzar desde arriba
    const endAngle = startAngle + (percentage / 100) * 360
  
    doc.setDrawColor(...color)
    doc.setFillColor(...color)
  
    // Convertir ángulos a radianes
    const startRad = (startAngle * Math.PI) / 180
    const endRad = (endAngle * Math.PI) / 180
  
    // Puntos para el arco
    const points = []
    points.push([x, y]) // Centro
  
    // Añadir puntos del arco
    const steps = 36 // Número de segmentos para el arco
    for (let i = 0; i <= steps; i++) {
      const angle = startRad + (i * (endRad - startRad)) / steps
      if (angle <= endRad) {
        const pointX = x + radius * Math.cos(angle)
        const pointY = y + radius * Math.sin(angle)
        points.push([pointX, pointY])
      }
    }
  
    // Dibujar el sector
    if (points.length > 2) {
      doc.triangle(points[0][0], points[0][1], points[1][0], points[1][1], points[2][0], points[2][1], "F")
  
      for (let i = 2; i < points.length - 1; i++) {
        doc.triangle(points[0][0], points[0][1], points[i][0], points[i][1], points[i + 1][0], points[i + 1][1], "F")
      }
    }
  
    // Texto del porcentaje
    doc.setFont("helvetica", "bold")
    doc.setFontSize(radius * 0.8)
    doc.setTextColor(...color)
    doc.text(`${percentage}%`, x, y + radius * 0.3, { align: "center" })
  }
  
  

// Inicializar la aplicación
document.addEventListener("DOMContentLoaded", function() {
    toggleCollapsible("simulador"); // Abrir sección de simulador por defecto
    document.getElementById("nivelActual").addEventListener("change", actualizarCalculos);
    document.getElementById("ticketPromedio").addEventListener("input", actualizarCalculos);
    document.getElementById("valorUSD").addEventListener("input", actualizarCalculos);
    document.getElementById("objetivo").addEventListener("input", actualizarCalculos);
    document.getElementById("productoSimulador").addEventListener("change", actualizarCalculos);
    document.getElementById("descargarPDF").addEventListener("click", generarPDF);
    
    // Establecer valores predeterminados para facilitar la demostración
    document.getElementById("ticketPromedio").value = 1000;
    document.getElementById("valorUSD").value = 1000;
    document.getElementById("objetivo").value = 5000;
    
    // Actualizar la fecha actual
    const hoy = new Date();
    const dia = hoy.getDate();
    const mes = hoy.getMonth() + 1; // Los meses en JavaScript van de 0 a 11
    const anio = hoy.getFullYear().toString().substr(-2); // Obtener solo los últimos 2 dígitos del año
    document.getElementById("fechaActual").textContent = `${dia}/${mes}/${anio}`;
    
    // Llamar a actualizarCalculos para mostrar los resultados iniciales
    actualizarCalculos();
});