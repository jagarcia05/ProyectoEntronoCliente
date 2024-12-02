import { plataformaicono } from './plataformaicono.js'; // Importamos el objeto



let juegosCompletos = []; // Aquí guardaremos todos los juegos

// Función para obtener todos los juegos sin filtros de plataforma y género
function getGame(page = 1, pageSize = 40) {
  let url = `https://api.rawg.io/api/games?key=236c519bed714a588c3f1aee662a2c2d&page=${page}&page_size=${pageSize}`;

  console.log("URL construida:", url);  // Para depuración

  // Realizar la solicitud a la API
  fetch(url)
    .then(response => response.json())
    .then(data => {
      console.log("Respuesta de la API:", data);  // Ver la respuesta completa
      if (data.results && data.results.length > 0) {
        juegosCompletos = data.results; // Guardamos los juegos completos
        console.log("Juegos cargados:", juegosCompletos);
        procesardatos(juegosCompletos); // Procesamos los juegos completos
        cargarFiltros(juegosCompletos); // Llenamos los filtros de plataforma y género
      } else {
        console.log("No se encontraron juegos.");
        mostrarMensajeSinResultados(); // Función para mostrar un mensaje sin resultados
      }
    })
    .catch(error => console.error("Error fetching data:", error));
}

// Función para mostrar un mensaje cuando no hay resultados
function mostrarMensajeSinResultados() {
  let contenedor = document.getElementById("contenedor-juegos");
  contenedor.innerHTML = "<p>No se encontraron juegos que coincidan con los filtros seleccionados.</p>";
}

// Función para procesar los datos de los juegos y actualizarlos en la UI
function procesardatos(games) {
  console.log("Procesando juegos:", games); // Log de los juegos procesados
  let plantilla = document.getElementById("plantilla");
  let contenedor = plantilla.parentNode;
  contenedor.innerHTML = ""; // Limpiamos el contenedor antes de agregar las tarjetas

  // Procesar y mostrar las tarjetas de los juegos
  games.forEach(game => {
    let tarjeta = plantilla.cloneNode(true);
    contenedor.appendChild(tarjeta);

    let imagen = tarjeta.querySelector("#background_image");
    imagen.src = game.background_image;
    imagen.alt = game.name;

    let titulo = tarjeta.querySelector("#name");
    titulo.textContent = game.name;

    let fechaLanzamiento = tarjeta.querySelector("#released");
    fechaLanzamiento.textContent = game.released;

    let plataformas = tarjeta.querySelector("#platforms");
    plataformas.innerHTML = ""; // Limpiamos las plataformas anteriores

    let uniqueIcons = new Set();
    game.platforms.forEach(plataforma => {
      let platformName = plataforma.platform.name;
      let iconSrc = plataformaicono[platformName];

      if (iconSrc && !uniqueIcons.has(iconSrc)) {
        uniqueIcons.add(iconSrc);

        let icono = document.createElement("img");
        icono.src = iconSrc;
        icono.alt = platformName;
        icono.style.width = "15px";
        icono.style.height = "15px";
        icono.style.marginRight = "10px";
        icono.style.filter = "invert(1)";

        plataformas.appendChild(icono);
      }
    });

    let contenedorGeneros = tarjeta.querySelector("#genres");
    contenedorGeneros.innerHTML = "";

    game.genres.forEach(genero => {
      let genreElement = document.createElement("div");
      genreElement.textContent = genero.name;

      contenedorGeneros.appendChild(genreElement);
    });
  });
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
  let listaGeneros = document.getElementById("listaGeneros");
  listaGeneros.innerHTML = ''; // Limpiar lista previa
  listadoGeneros.forEach(genero => {
    let option = document.createElement("li");
    option.classList.add("dropdown-item-listageneros");
  
    let option1 = document.createElement("a");
    option1.classList.add("text-decoration-none");
    option1.style.color = "black";
    option1.href = "#";  
    option1.textContent = genero;
    option1.setAttribute('data-genre', genero);

    option.appendChild(option1);
    listaGeneros.appendChild(option);

    // Listener para filtrar por género
    option1.addEventListener('click', function(event) {
      event.preventDefault();
      const genre = this.getAttribute('data-genre');
      console.log("Filtrando por género:", genre);
      aplicarFiltros(genre, ''); // Llamada con el género seleccionado
    });
  });

  // Llenar el listado de plataformas
  let listaPlataformas = document.getElementById("listaPlataformas");
  listaPlataformas.innerHTML = ''; // Limpiar lista previa
  listadoPlataformas.forEach(plataforma => {
    let option = document.createElement("li");
    option.classList.add("dropdown-item-listaplataformas");

    option.setAttribute('data-plataforma', plataforma);

    let platformContainer = document.createElement("div");
    platformContainer.classList.add("d-flex", "align-items-center");

    let platformIcon = document.createElement("img");
    platformIcon.src = plataformaicono[plataforma] || "img/default-icon.svg";
    platformIcon.alt = plataforma;
    platformIcon.style.width = "20px";
    platformIcon.style.height = "20px";
    platformIcon.style.marginRight = "10px";

    let platformName = document.createElement("span");
    platformName.textContent = plataforma;

    platformContainer.appendChild(platformIcon);
    platformContainer.appendChild(platformName);

    option.appendChild(platformContainer);
    listaPlataformas.appendChild(option);

    // Listener para filtrar por plataforma
    option.addEventListener('click', function(event) {
      event.preventDefault();
      const plataforma = this.getAttribute('data-plataforma');
      console.log("Filtrando por plataforma:", plataforma);
      aplicarFiltros('', plataforma); // Llamada con la plataforma seleccionada
    });
  });
}

// Función para aplicar filtros manuales
function aplicarFiltros(genre, plataforma) {
  // Filtramos los juegos en el cliente según los filtros seleccionados
  let juegosFiltrados = juegosCompletos;

  if (genre) {
    juegosFiltrados = juegosFiltrados.filter(game =>
      game.genres.some(genero => genero.name === genre)
    );
  }

  if (plataforma) {
    juegosFiltrados = juegosFiltrados.filter(game =>
      game.platforms.some(plataformaObj => plataformaObj.platform.name === plataforma)
    );
  }

  // Procesamos los juegos filtrados
  if (juegosFiltrados.length > 0) {
    procesardatos(juegosFiltrados);
  } else {
    mostrarMensajeSinResultados();
  }
}

// Llamada inicial para cargar juegos sin filtros
getGame(1, 40);

