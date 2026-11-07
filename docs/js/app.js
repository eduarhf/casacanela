// APP.JS - Vanilla JS. Sin React, sin Node, sin build.
// Lógica como en backend: estado + funciones puras.

const MI_NUMERO = "569XXXXXXXX"; // <-- CAMBIA TU NÚMERO AQUÍ
let carrito = []; // estado, como tu array en backend

const contadorEl = document.getElementById("contador");
const ctaFijo = document.getElementById("cta-fijo");
const btnCarrito = document.getElementById("btn-carrito");
const waTooltip = document.getElementById("wa-tooltip");
const waContador = document.getElementById("wa-contador");
const waCerrar = document.getElementById("wa-cerrar");

// 1. AGREGAR AL CARRITO
// querySelectorAll = como SELECT * FROM botones
document.querySelectorAll(".btn-agregar").forEach(boton => {
  boton.addEventListener("click", () => {
    const card = boton.closest(".card"); // busca el padre .card
    // dataset = lee los data-* del HTML. Así pasas datos sin mezclar JS en HTML
    const producto = {
      nombre: card.dataset.nombre,
      precio: parseInt(card.dataset.precio)
    };

    carrito.push(producto);
    actualizarUI();

    // Feedback visual, puro JS
    const textoOriginal = boton.textContent;
    boton.textContent = "✔ ¡Agregado!";
    setTimeout(() => boton.textContent = textoOriginal, 1200);

    // Si el globito estaba cerrado, lo volvemos a mostrar con el nuevo total
    if (waTooltip) waTooltip.style.display = "flex";
  });
});

// 2. ACTUALIZAR UI
function actualizarUI() {
  const total = carrito.reduce((sum, p) => sum + p.precio, 0);

  // Contador header 🧺
  if (contadorEl) contadorEl.textContent = carrito.length;
  // Contador rojo de la burbuja WhatsApp
  if (waContador) {
    waContador.textContent = carrito.length;
    waContador.style.display = carrito.length === 0 ? "none" : "flex";
  }

  // Construye mensaje para WhatsApp automáticamente
  if (carrito.length > 0) {
    let mensaje = "Hola Casa Canela, quiero pedir:\n";
    carrito.forEach(p => mensaje += `- ${p.nombre} ($${p.precio.toLocaleString("es-CL")})\n`);
    mensaje += `Total: $${total.toLocaleString("es-CL")}`;

    // encodeURIComponent = para que WhatsApp entienda los espacios y saltos
    if (ctaFijo) ctaFijo.href = `https://wa.me/${MI_NUMERO}?text=${encodeURIComponent(mensaje)}`;

    // PASO 3 ARREGLADO: ya no tocamos ctaFijo.textContent, tocamos el globito
    if (waTooltip) {
      waTooltip.querySelector("span").textContent = `Tienes ${carrito.length} productos - $${total.toLocaleString("es-CL")}. Pedir por WhatsApp`;
    }
  } else {
    if (waTooltip) {
      waTooltip.querySelector("span").textContent = "Envíanos un mensaje de WhatsApp";
    }
  }
}

// 3. VER CARRITO / ENVIAR + CERRAR GLOBITO
btnCarrito.addEventListener("click", () => {
  if (carrito.length === 0) {
    alert("Tu canasto está vacío 🧺 Agrega una mermelada primero.");
    return;
  }
  // Abre WhatsApp con el pedido armado
  window.open(ctaFijo.href, "_blank");
});

// Cerrar el globito "Envíanos un mensaje" con la X
if (waCerrar) {
  waCerrar.addEventListener("click", () => {
    waTooltip.style.display = "none";
  });
}

// 4. SCROLL SUAVE - puro CSS desde JS, sin librerías
// Solo para links internos #productos, #historia, no para WhatsApp
document.querySelectorAll('#menu a[href^="#"]').forEach(link => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    const destino = document.querySelector(link.getAttribute("href"));
    if (destino) destino.scrollIntoView({ behavior: "smooth" });
  });
});

// Selector de tallas - V3
document.querySelectorAll(".tallas").forEach(grupo => {
  grupo.querySelectorAll(".talla").forEach(btn => {
    btn.addEventListener("click", () => {
      grupo.querySelectorAll(".talla").forEach(b => b.classList.remove("activa"));
      btn.classList.add("activa");
    });
  });
});

// MENU HAMBURGUESA
const btnMenu = document.getElementById('btn-menu');
const menu = document.getElementById('menu');

if (btnMenu && menu) {
  btnMenu.addEventListener('click', () => {
    const abierto = menu.classList.toggle('abierto');
    btnMenu.textContent = abierto ? '✕' : '☰';
  });

  // Cerrar al hacer click en un link
  menu.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      menu.classList.remove('abierto');
      btnMenu.textContent = '☰';
    });
  });
}

// Estado inicial
actualizarUI();

console.log("Casa Canela lista - JS puro cargado");