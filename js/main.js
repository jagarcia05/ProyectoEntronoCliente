import { plataformaicono } from "./plataformaicono.js";

let page = 1;
let allGames = [];
let filtroGenero = '';
let filtroPlataforma = '';
let listadoGeneros = new Set();
let listadoPlataformas = new Set(); 

/*******************************************************************************/
// Peticion de los Datos

function getGames(page = 1, pageSize = 40) {
  const url = `https://api.rawg.io/api/games?key=236c519bed714a588c3f1aee662a2c2d&page=${page}&page_size=${pageSize}`;
  fetch(url)
    .then((response) => response.json())
    .then((jsondata) => {
      allGames = jsondata.results;
      procesarGames(allGames);
      cargarListados(jsondata)

    })
    .catch((error) => console.error("Error", error));
}

/*******************************************************************************/
// Datos de juegos

function procesarGames(juegos) {
  const juegosFiltrados = juegos.filter((game) => {
    const coincideGenero =
      !filtroGenero || game.genres.some((g) => g.name === filtroGenero);
    const coincidePlataforma =
      !filtroPlataforma || game.platforms.some((p) => p.platform.name === filtroPlataforma);
    return coincideGenero && coincidePlataforma;
  });

  let plantilla = document.getElementById("plantilla");
  let contenedor = plantilla.parentNode;

  const existingCards = contenedor.querySelectorAll(".game-card");
  existingCards.forEach((card) => card.remove());

  if (juegosFiltrados.length === 0) {
    mostrarMensajeSinResultados();
    return;
  }

  juegosFiltrados.forEach((game) => {
    let tarjeta = plantilla.cloneNode(true);
    tarjeta.classList.remove("d-none");
    tarjeta.classList.add("game-card");
    contenedor.appendChild(tarjeta);

    let imagen = tarjeta.querySelector("#game_background_image");
    imagen.setAttribute("src", game.background_image);
    imagen.setAttribute("alt", game.name);

    const plataformas = tarjeta.querySelector("#game_platforms");
    plataformas.innerHTML = "";
    const uniqueIcons = new Set();

    game.platforms.forEach((plataforma) => {
      const platformName = plataforma.platform.name;
      const iconSrc = plataformaicono[platformName];

      if (iconSrc && !uniqueIcons.has(iconSrc)) {
        uniqueIcons.add(iconSrc);

        const icono = document.createElement("li");
        const img = document.createElement("img");
        img.src = iconSrc;
        img.alt = platformName;
        img.style.width = "15px";
        img.style.marginRight = "8px";
        img.style.filter = "invert(1)";
        icono.appendChild(img);

        plataformas.appendChild(icono);
      }
    });

    let nombre = tarjeta.querySelector("#game_name");
    nombre.textContent = game.name;

    const contenedorGeneros = tarjeta.querySelector("#game_genres");
    contenedorGeneros.innerHTML = "";

    game.genres.forEach((genero) => {
      const genreElement = document.createElement("li");
      const generosTexto = game.genres.map((genero) => genero.name).join(" - ");
      contenedorGeneros.textContent = generosTexto;
    });

    let released = tarjeta.querySelector("#game_released");
    released.textContent = "Fecha de salida: " + game.released;
    released.style.fontWeight = "normal";

    tarjeta.setAttribute("id", "game_" + game.id);
  });
}

/********************************************************************************/
// Listados para filtrar

function cargarListados(jsondata) {
  listadoGeneros.clear();
  jsondata.results.forEach(game => {
    game.platforms.forEach(plataforma => listadoPlataformas.add(plataforma.platform.name));
    game.genres.forEach(genero => listadoGeneros.add(genero.name));
  });

  const listaPlataformas = document.getElementById("listaPlataformas");
  listaPlataformas.innerHTML = '';

  listadoPlataformas.forEach(plataforma => {
    const listado = document.createElement("li");
    listado.classList.add("dropdown-item");

    const enlace = document.createElement("a");
    enlace.classList.add("text-decoration-none");
    enlace.style.padding = "5px";
    enlace.style.color = "white";
    enlace.href = "#";
    enlace.textContent = plataforma;
    enlace.setAttribute('data-platform', plataforma);

    listado.appendChild(enlace);
    listaPlataformas.appendChild(listado);
  });

  const listaGeneros = document.getElementById("listaGeneros");
  listaGeneros.innerHTML = '';

  listadoGeneros.forEach(genero => {
    const listado = document.createElement("li");
    listado.classList.add("dropdown-item");

    const enlace = document.createElement("a");
    enlace.classList.add("text-decoration-none");
    enlace.style.padding = "5px";
    enlace.style.color = "white";
    enlace.href = "#";
    enlace.textContent = genero;
    enlace.setAttribute('data-genre', genero);

    listado.appendChild(enlace);
    listaGeneros.appendChild(listado);
  });
}

/*******************************************************************************/
// Filtros

document.addEventListener("DOMContentLoaded", function () {
  const listaGeneros = document.getElementById("listaGeneros");
  listaGeneros.addEventListener("click", function (event) {
    if (event.target.tagName === "A") {
      event.preventDefault();
      filtroGenero = event.target.textContent;
      procesarGames(allGames);
    }
  });

  const listaPlataformas = document.getElementById("listaPlataformas");
  listaPlataformas.addEventListener("click", function (event) {
    if (event.target.tagName === "A") {
      event.preventDefault();
      filtroPlataforma = event.target.textContent;
      procesarGames(allGames);
    }
  });

  document.querySelector(".limpiarFiltros").addEventListener("click", function () {
    filtroGenero = '';
    filtroPlataforma = '';
    document.querySelector(".search-input input").value = "";

    procesarGames(1, 40);

    console.log("Filtros limpiados. Mostrando todos los juegos.");
  });
});

function mostrarMensajeSinResultados() {
  const contenedor = document.getElementById("contenedor");
  if (contenedor) {
    contenedor.innerHTML = `
      <p class="text-white">No se encontraron juegos que coincidan con los filtros seleccionados.</p>
    `;
  }
}

/*******************************************************************************/
// Buscador

document.addEventListener("DOMContentLoaded", () => {
  const inputBusqueda = document.querySelector(".search-input input");
  if (inputBusqueda) {
    inputBusqueda.addEventListener("input", function (event) {
      const searchTerm = event.target.value.toLowerCase();
      const juegosFiltrados = allGames.filter((game) =>
        game.name.toLowerCase().includes(searchTerm)
      );
      procesarGames(juegosFiltrados);
    });
  } else {
    console.error("No se encontró el input de búsqueda en el DOM.");
  }
});

/*******************************************************************************/
// Cambiar de Página

document.addEventListener("DOMContentLoaded", function () {
  getGames(page, 40);

  document.querySelector("#paginasiguiente").addEventListener("click", function (event) {
    event.preventDefault();
    page += 1;
    getGames(page, 40);
  });

  document.querySelector("#paginaanterior").addEventListener("click", function (event) {
    event.preventDefault();
    if (page > 1) {
      page -= 1;
    }
    getGames(page, 40);
  });

  document.querySelector(".limpiarFiltros").addEventListener("click", function () {
    document.querySelector(".search-input input").value = "";
    procesarGames(allGames);
  });
});

/********************************************************************************/
// Me gusta

document.addEventListener("click", function (event) {
  if (event.target.closest(".like-button")) {
      const card = event.target.closest(".game-card");
      const gameId = card.getAttribute("id").split("_")[1];

      const game = allGames.find((game) => game.id == gameId);

      let juegosFavoritos = JSON.parse(localStorage.getItem("juegosFavoritos")) || [];

      if (!juegosFavoritos.some((fav) => fav.id === game.id)) {
        juegosFavoritos.push(game);
          localStorage.setItem("juegosFavoritos", JSON.stringify(juegosFavoritos));
          console.log(`Juego añadido a favoritos: ${game.name}`);
      } else {
          console.log("El juego ya está en favoritos.");
      }
  }
});

/*******************************************************************************/
