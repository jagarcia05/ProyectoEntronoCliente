import { plataformaicono } from './plataformaicono.js';

function getGame(page = 1, pageSize = 40) {
  const url = `https://api.rawg.io/api/games?key=236c519bed714a588c3f1aee662a2c2d&page=${page}&page_size=${pageSize}`;
  fetch(url)
    .then(response => response.json())
    .then(data => {
      procesardatos(data.results);
    })
    .catch(error => console.error("Error fetching data:", error));
}

function procesardatos(games) {
  let plantilla = document.getElementById("plantilla");
  let contenedor = plantilla.parentNode;
  plantilla.remove(); // Eliminamos la plantilla original para evitar duplicados

  const listadoGeneros = new Set();
  const listadoPlataformas = new Set();

  games.forEach(game => {
    game.genres.forEach(genero => listadoGeneros.add(genero.name));
    game.platforms.forEach(plataforma => {
      listadoPlataformas.add(plataforma.platform.name);
    });
  });

  let listaGeneros = document.getElementById("listaGeneros");
  listadoGeneros.forEach(genero => {
    let option = document.createElement("li");
    option.classList.add("dropdown-item");
    option.textContent = genero;
    listaGeneros.appendChild(option);
  });

  // Llenar los dropdowns con las plataformas únicas, ahora con íconos
  let listaPlataformas = document.getElementById("listaPlataformas");
  listadoPlataformas.forEach(plataforma => {
    let option = document.createElement("li");
    option.classList.add("dropdown-item");

    // Crear el contenedor para la imagen y el texto
    let platformContainer = document.createElement("div");
    platformContainer.classList.add("d-flex", "align-items-center");

    // Crear la imagen de la plataforma
    let platformIcon = document.createElement("img");
    platformIcon.src = plataformaicono[plataforma] || "img/default-icon.svg";
    platformIcon.alt = plataforma;
    platformIcon.style.width = "20px";
    platformIcon.style.height = "20px";
    platformIcon.style.marginRight = "10px";

    // Crear el texto de la plataforma
    let platformName = document.createElement("span");
    platformName.textContent = plataforma;

    // Agregar el ícono y el texto al contenedor
    platformContainer.appendChild(platformIcon);
    platformContainer.appendChild(platformName);

    // Agregar el contenedor al `li` del dropdown
    option.appendChild(platformContainer);
    listaPlataformas.appendChild(option);
  });
}

// Llamamos a la función principal
getGame(1, 40);
