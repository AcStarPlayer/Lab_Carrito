// VARIABLES
const botones = document.querySelectorAll(".btn-agregar");
const lista = document.querySelector("#lista-carrito");
const totalSpan = document.querySelector("#total");
const badge = document.querySelector("#badge");
const btnVaciar = document.querySelector("#btn-vaciar");
const msgVacio = document.querySelector("#msg-vacio");

//
let totalAcumulado = 0;
let cantidadItems = 0;

// EVENTOS BOTONES AGREGAR
botones.forEach(boton => {
  boton.addEventListener("click", () => {
    const nombre = boton.dataset.nombre;
    const precio = parseFloat(boton.dataset.precio);

    agregarAlCarrito(nombre, precio);
  });
});

// FUNCIÓN AGREGAR
function agregarAlCarrito(nombre, precio) {

  msgVacio.style.display = "none";

  const li = document.createElement("li");
  li.classList.add("list-group-item", "d-flex", "justify-content-between");

  li.innerHTML = `
    ${nombre} - $${precio}
    <button class="btn btn-sm btn-danger btn-eliminar">X</button>
  `;

  lista.appendChild(li);

  // SUMAR TOTAL
  totalAcumulado += precio;
  cantidadItems++;

  updateTotal();
  updateBadge();

  // BOTÓN ELIMINAR
  const btnEliminar = li.querySelector(".btn-eliminar");

  btnEliminar.addEventListener("click", () => {
    eliminarItem(li, precio);
  });
}

// FUNCIÓN ELIMINAR
function eliminarItem(li, precio) {
  li.remove();

  totalAcumulado -= precio;
  cantidadItems--;

  updateTotal();
  updateBadge();

  if (cantidadItems === 0) {
    msgVacio.style.display = "block";
  }
}

// ACTUALIZAR TOTAL
function updateTotal() {
  totalSpan.textContent =
    totalAcumulado.toLocaleString("es-CO", { minimumFractionDigits: 0 });
}

// ACTUALIZAR BADGE
function updateBadge() {
  badge.textContent = cantidadItems;
}

// BOTÓN VACIAR
btnVaciar.addEventListener("click", () => {

  const items = lista.querySelectorAll("li:not(#msg-vacio)");
  items.forEach(item => item.remove());

  totalAcumulado = 0;
  cantidadItems = 0;

  updateTotal();
  updateBadge();

  msgVacio.style.display = "block";
});