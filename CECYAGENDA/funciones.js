function entrar() {
  document.getElementById("pantalla-inicial").style.display = "none";
  document.getElementById("app").style.display = "block";
}

function toggleMenu() {
  const menu = document.getElementById("menu-opciones");
  menu.style.display = menu.style.display === "block" ? "none" : "block";
}

function mostrarSeccion(id) {
  document.querySelectorAll("section").forEach((sec) => sec.classList.remove("active"));
  document.getElementById(id).classList.add("active");
  toggleMenu();
}

function guardarDato(tipo) {
  const lista = JSON.parse(localStorage.getItem("datos") || "[]");
  let nuevo = {};
  if (tipo === "tarea") {
    nuevo = {
      tipo,
      titulo: document.getElementById("tareaTitulo").value,
      detalle: document.getElementById("tareaDetalle").value,
      fecha: new Date().toLocaleString()
    };
    document.getElementById("tareaTitulo").value = "";
    document.getElementById("tareaDetalle").value = "";
  } else if (tipo === "examen") {
    nuevo = {
      tipo,
      materia: document.getElementById("examenMateria").value,
      fecha: document.getElementById("examenFecha").value
    };
    document.getElementById("examenMateria").value = "";
    document.getElementById("examenFecha").value = "";
  } else if (tipo === "nota") {
    nuevo = {
      tipo,
      texto: document.getElementById("notaTexto").value,
      fecha: new Date().toLocaleString()
    };
    document.getElementById("notaTexto").value = "";
  }

  lista.unshift(nuevo);
  localStorage.setItem("datos", JSON.stringify(lista));
  if (tipo === "nota") mostrarNotasRecientes();
}

function mostrarNotasRecientes() {
  const contenedor = document.getElementById("lista-recientes");
  contenedor.innerHTML = "";
  const datos = JSON.parse(localStorage.getItem("datos") || "[]");
  const notas = datos.filter((d) => d.tipo === "nota");

  notas.forEach((nota, index) => {
    const div = document.createElement("div");
    div.className = "nota-item fade-in";
    div.innerHTML = `
      <input type="checkbox" class="check-nota" data-index="${index}">
      <h4>${nota.fecha}</h4>
      <p>${nota.texto}</p>
    `;
    contenedor.appendChild(div);
  });
}

function activarSeleccion() {
  const btnConfirmar = document.getElementById("btn-confirmar-eliminar");
  const checkboxes = document.querySelectorAll(".check-nota");
  btnConfirmar.style.display = "inline-block";

  checkboxes.forEach((check) => {
    check.addEventListener("change", () => {
      const algunoMarcado = [...checkboxes].some(ch => ch.checked);
      btnConfirmar.disabled = !algunoMarcado;
    });
  });
}

function eliminarNotasSeleccionadas() {
  let datos = JSON.parse(localStorage.getItem("datos") || "[]");
  const checks = document.querySelectorAll(".check-nota");
  const indices = [];

  checks.forEach((check, i) => {
    if (check.checked) indices.push(i);
  });

  const notas = datos.filter(d => d.tipo === "nota");
  const otras = datos.filter(d => d.tipo !== "nota");

  const notasFiltradas = notas.filter((_, i) => !indices.includes(i));
  const nuevasNotas = notasFiltradas.concat(otras);
  localStorage.setItem("datos", JSON.stringify(nuevasNotas));

  mostrarNotasRecientes();
  document.getElementById("btn-confirmar-eliminar").style.display = "none";
}

function cambiarFuente(fuente) {
  document.documentElement.style.setProperty('--font-family', fuente);
}

function cambiarTamanioFuente(tamanio) {
  document.documentElement.style.setProperty('--font-size', `${tamanio}px`);
}

function cambiarColorFondo(color) {
  document.documentElement.style.setProperty('--bg-color', color);
  document.body.style.backgroundImage = 'none'; // eliminar fondo si se cambia color
}

function cambiarColorTexto(color) {
  document.documentElement.style.setProperty('--text-color', color);
}

function cambiarFondoImagen(input) {
  const archivo = input.files[0];
  if (archivo) {
    const lector = new FileReader();
    lector.onload = function (e) {
      document.documentElement.style.setProperty('--background-image', `url(${e.target.result})`);
    };
    lector.readAsDataURL(archivo);
  }
}

function alternarAnimaciones(estado) {
  if (estado) {
    document.body.classList.add("animado");
  } else {
    document.body.classList.remove("animado");
  }
}

function reproducirSonidoClick() {
  const audio = document.getElementById("click-sound");
  audio.currentTime = 0;
  audio.play();
}

window.addEventListener("DOMContentLoaded", () => {
  mostrarNotasRecientes();
});