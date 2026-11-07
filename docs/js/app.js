// APP.JS - Vanilla JS. Sin React, sin Node, sin build.
// Lógica como en backend: estado + funciones puras.

const MI_NUMERO = "569XXXXXXXX"; // <-- CAMBIA TU NÚMERO AQUÍ
let carrito = []; // estado, como tu array en backend

const contadorEl = document.getElementById("contador");
const ctaFijo = document.getElementById("cta-fijo");
const btnCarrito = document.getElementById("btn-carrito");

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
    boton.textContent = "✔ ¡Agregado!";
    setTimeout(() => boton.textContent = "Agregar al pedido", 1200);
  });
});

// 2. ACTUALIZAR UI
function actualizarUI() {
  contadorEl.textContent = carrito.length;

  // Construye mensaje para WhatsApp automáticamente
  if (carrito.length > 0) {
    const total = carrito.reduce((sum, p) => sum + p.precio, 0);
    let mensaje = "Hola Casa Canela, quiero pedir:\n";
    carrito.forEach(p => mensaje += `- ${p.nombre} ($${p.precio.toLocaleString("es-CL")})\n`);
    mensaje += `Total: $${total.toLocaleString("es-CL")}`;

    // encodeURIComponent = para que WhatsApp entienda los espacios y saltos
    ctaFijo.href = `https://wa.me/${MI_NUMERO}?text=${encodeURIComponent(mensaje)}`;
    ctaFijo.textContent = `💬 Pedir ${carrito.length} productos - $${total.toLocaleString("es-CL")}`;
  }
}

// 3. VER CARRITO / ENVIAR
btnCarrito.addEventListener("click", () => {
  if (carrito.length === 0) {
    alert("Tu canasto está vacío 🧺 Agrega una mermelada primero.");
    return;
  }
  // Abre WhatsApp con el pedido armado
  window.open(ctaFijo.href, "_blank");
});

// 4. SCROLL SUAVE - puro CSS desde JS, sin librerías
document.querySelectorAll('nav a').forEach(link => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    document.querySelector(link.getAttribute("href")).scrollIntoView({ behavior: "smooth" });
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

console.log("Casa Canela lista 🍑 - JS puro cargado");

// MENU HAMBURGUESA
const btnMenu = document.getElementById('btn-menu');
const menu = document.getElementById('menu');

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