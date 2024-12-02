// script.js
import { plataformaicono } from './plataformaicono.js'; // Importamos el objeto

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

  games.forEach(game => {
    let tarjeta = plantilla.cloneNode(true); // Clonamos la plantilla
    contenedor.appendChild(tarjeta); // Añadimos la tarjeta clonada al contenedor

    // Configuramos la imagen del juego
    let imagen = tarjeta.querySelector("#background_image");
    imagen.src = game.background_image;
    imagen.alt = game.name;

    // Configuramos el título del juego
    let titulo = tarjeta.querySelector("#name");
    titulo.textContent = game.name;

    let fechaLanzamiento = tarjeta.querySelector("#released");
    fechaLanzamiento.textContent = game.released;

    // Configuramos las plataformas
    let plataformas = tarjeta.querySelector("#platforms");
    plataformas.innerHTML = ""; // Limpiamos cualquier contenido anterior

    // Usamos un conjunto para evitar repeticiones de íconos
    let uniqueIcons = new Set();

    game.platforms.forEach(plataforma => {
      let platformName = plataforma.platform.name;
      let iconSrc = plataformaicono[platformName]; // Usamos el ícono de la importación

      if (iconSrc && !uniqueIcons.has(iconSrc)) {
        uniqueIcons.add(iconSrc); // Añadimos el ícono al conjunto para evitar repeticiones

        // Crear el ícono
        let icono = document.createElement("img");
        icono.src = iconSrc;
        icono.alt = platformName;
        icono.style.width = "15px";
        icono.style.height = "15px";
        icono.style.marginRight = "10px"; // Espaciado entre los íconos
        icono.style.filter = "invert(1)";

        // Añadir el ícono directamente al contenedor de plataformas
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

// Llamamos a la función principal
getGame(1, 40);
