import { plataformaicono } from './plataformaicono.js'; // Importamos el objeto

let page = 1;
let juegosCompletos = []; // Aquí guardamos todos los juegos
let filtroGenero = ''; // Filtro de género
let filtroPlataforma = ''; // Filtro de plataforma

// Función para obtener todos los juegos sin filtros en la URL
function getGames(page = 1, pageSize = 40) {
  const url = `https://api.rawg.io/api/games?key=236c519bed714a588c3f1aee662a2c2d&page=${page}&page_size=${pageSize}`;
  console.log("URL construida:", url);  // Para depuración

  // Realizar la solicitud a la API
  fetch(url)
    .then(response => response.json())
    .then(data => {
      if (data.results && data.results.length > 0) {
        juegosCompletos = data.results; // Guardamos los juegos completos
        console.log("Juegos cargados:", juegosCompletos);
        aplicarFiltros(); // Aplicamos los filtros locales
        procesarDatos(juegosCompletos); // Procesamos los juegos completos
        cargarFiltros(juegosCompletos); // Llenamos los filtros de plataforma y género
      } else {
        console.log("No se encontraron juegos.");
        mostrarMensajeSinResultados(); // Mostramos mensaje si no hay resultados
      }
    })
    .catch(error => console.error("Error fetching data:", error));
}

// Función para mostrar un mensaje cuando no hay resultados
function mostrarMensajeSinResultados() {
  const contenedor = document.getElementById("contenedor");
  if (contenedor) {
    contenedor.innerHTML = "<p>No se encontraron juegos que coincidan con los filtros seleccionados.</p>";
  }
}

// Función para procesar los datos de los juegos y actualizarlos en la UI
// Función para procesar los juegos
function procesarDatos(games) {
  console.log("Procesando juegos:", games); // Log de los juegos procesados

  const contenedor = document.getElementById("contenedor");  // Accedemos directamente al contenedor
  const plantilla = document.getElementById("plantilla");

  

  // Limpiamos el contenedor antes de agregar las tarjetas
  contenedor.innerHTML = "";

  // Procesar y mostrar las tarjetas de los juegos
  games.forEach(game => {
    console.log(plantilla)
    const tarjeta = plantilla.cloneNode(true); // Clonamos la plantilla
    contenedor.appendChild(tarjeta); // Añadimos la tarjeta al contenedor

    const imagen = tarjeta.querySelector("#background_image");
    imagen.src = game.background_image;
    imagen.alt = game.name;

    const titulo = tarjeta.querySelector("#name");
    titulo.textContent = game.name;

    const fechaLanzamiento = tarjeta.querySelector("#released");
    fechaLanzamiento.textContent = game.released;

    const plataformas = tarjeta.querySelector("#platforms");
    plataformas.innerHTML = ""; // Limpiamos las plataformas anteriores

    let uniqueIcons = new Set();
    game.platforms.forEach(plataforma => {
      const platformName = plataforma.platform.name;
      const iconSrc = plataformaicono[platformName];

      if (iconSrc && !uniqueIcons.has(iconSrc)) {
        uniqueIcons.add(iconSrc);

        const icono = document.createElement("img");
        icono.src = iconSrc;
        icono.alt = platformName;
        icono.style.width = "15px";
        icono.style.height = "15px";
        icono.style.marginRight = "10px";
        icono.style.filter = "invert(1)";

        plataformas.appendChild(icono);
      }
    });

    const contenedorGeneros = tarjeta.querySelector("#genres");
    contenedorGeneros.innerHTML = "";

    game.genres.forEach(genero => {
      const genreElement = document.createElement("div");
      genreElement.textContent = genero.name;
      contenedorGeneros.appendChild(genreElement);
    });
  });
}


// Función para aplicar los filtros localmente
function aplicarFiltros() {
  let juegosFiltrados = juegosCompletos;

  // Filtrar por género
  if (filtroGenero) {
    juegosFiltrados = juegosFiltrados.filter(game =>
      game.genres.some(genre => genre.name.toLowerCase() === filtroGenero.toLowerCase())
    );
  }

  // Filtrar por plataforma
  if (filtroPlataforma) {
    juegosFiltrados = juegosFiltrados.filter(game =>
      game.platforms.some(platform => platform.platform.name.toLowerCase() === filtroPlataforma.toLowerCase())
    );
  }

  // Filtrar por búsqueda
  const searchTerm = document.querySelector(".search-input input").value.toLowerCase();
  if (searchTerm) {
    juegosFiltrados = juegosFiltrados.filter(game =>
      game.name.toLowerCase().includes(searchTerm)
    );
  }

  // Procesar y mostrar los juegos filtrados
  procesarDatos(juegosFiltrados);

  if (juegosFiltrados.length === 0) {
    mostrarMensajeSinResultados(); // Mostrar mensaje si no hay juegos que coincidan
  }
}

// Función para cargar los filtros de géneros y plataformas solo si es necesario
function cargarFiltros(games) {
  const listadoGeneros = new Set();
  const listadoPlataformas = new Set();

  // Extraemos los géneros y plataformas de los juegos
  games.forEach(game => {
    game.genres.forEach(genero => listadoGeneros.add(genero.name));
    game.platforms.forEach(plataforma => {
      listadoPlataformas.add(plataforma.platform.name);
    });
  });

  // Llenar el listado de géneros
  const listaGeneros = document.getElementById("listaGeneros");
  listaGeneros.innerHTML = ''; // Limpiar lista previa
  listadoGeneros.forEach(genero => {
    const option = document.createElement("li");
    option.classList.add("dropdown-item-listageneros");

    const option1 = document.createElement("a");
    option1.classList.add("text-decoration-none");
    option1.style.color = "black";
    option1.href = "#";
    option1.textContent = genero;
    option1.setAttribute('data-genre', genero);

    option.appendChild(option1);
    listaGeneros.appendChild(option);

    // Listener para filtrar por género
    option1.addEventListener('click', function (event) {
      event.preventDefault();
      filtroGenero = this.getAttribute('data-genre'); // Guardamos el filtro de género
      aplicarFiltros(); // Aplicamos los filtros localmente
    });
  });

  // Llenar el listado de plataformas
  const listaPlataformas = document.getElementById("listaPlataformas");
  listaPlataformas.innerHTML = ''; // Limpiar lista previa
  listadoPlataformas.forEach(plataforma => {
    const option = document.createElement("li");
    option.classList.add("dropdown-item-listaplataformas");

    option.setAttribute('data-plataforma', plataforma);

    const platformContainer = document.createElement("div");
    platformContainer.classList.add("d-flex", "align-items-center");

    const platformIcon = document.createElement("img");
    platformIcon.src = plataformaicono[plataforma] || "img/default-icon.svg";
    platformIcon.alt = plataforma;
    platformIcon.style.width = "20px";
    platformIcon.style.height = "20px";
    platformIcon.style.marginRight = "10px";

    const platformName = document.createElement("span");
    platformName.textContent = plataforma;

    platformContainer.appendChild(platformIcon);
    platformContainer.appendChild(platformName);

    option.appendChild(platformContainer);
    listaPlataformas.appendChild(option);

    // Listener para filtrar por plataforma
    option.addEventListener('click', function (event) {
      event.preventDefault();
      filtroPlataforma = this.getAttribute('data-plataforma'); // Guardamos el filtro de plataforma
      aplicarFiltros(); // Aplicamos los filtros localmente
    });
  });
}

// Función para manejar la búsqueda de juegos
document.querySelector(".search-input input").addEventListener('input', function () {
  aplicarFiltros(); 
});

// Función para limpiar filtros
function limpiarFiltros() {
  filtroGenero = '';
  filtroPlataforma = '';
  document.querySelector(".search-input input").value = '';  // Limpiar el campo de búsqueda

  // Recargamos los juegos sin filtros aplicados
  getGames(1, 40); 
  console.log("Filtros limpiados. Mostrando todos los juegos.");

 
}



// Función opcional para mostrar un mensaje si no se han aplicado filtros
function mostrarMensajeSinFiltros() {
  const contenedor = document.getElementById("contenedor");
  if (contenedor) {
    contenedor.innerHTML = "<p>Mostrando todos los juegos sin filtros aplicados.</p>";
  }
}

// Manejo de eventos de navegación entre páginas
document.addEventListener('DOMContentLoaded', function () {
  getGames(page, 40);

  // Manejo del botón "siguiente"
  document.querySelector('#paginasiguiente').addEventListener('click', function (event) {
    event.preventDefault();
    page += 1;
    getGames(page, 40); // Recargamos los juegos sin filtros
  });

  // Manejo del botón "anterior"
  document.querySelector('#paginaanterior').addEventListener('click', function (event) {
    event.preventDefault();
    if (page > 1) {
      page -= 1;
    }
    getGames(page, 40); // Recargamos los juegos sin filtros
  });

  // Limpiar filtros
  document.querySelector(".limpiarFiltros").addEventListener("click", limpiarFiltros);
});

