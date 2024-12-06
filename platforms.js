let allPlatform = [];

fetch("https://api.rawg.io/api/platforms?key=236c519bed714a588c3f1aee662a2c2d")
  .then((response) => response.json())
  .then((jsondata) => {
    allPlatform = jsondata.results;
    procesarPlataformas(allPlatform);
    datosGrafico(allPlatform);
  })
  .catch((error) => console.error("Error:", error));

function procesarPlataformas(plataformas) {
  let plantilla = document.getElementById("plantilla");
  let contenedor = plantilla.parentNode;

  while (contenedor.firstChild) {
    contenedor.removeChild(contenedor.firstChild);
  }

  plataformas.forEach((platform) => {
    let tarjeta = plantilla.cloneNode(true);
    contenedor.appendChild(tarjeta);

    let imagen = tarjeta.querySelector("#platform_background_image");
    imagen.setAttribute("src", platform.image_background);
    imagen.setAttribute("alt", platform.name);

    let nombre = tarjeta.querySelector("#platform_name");
    nombre.textContent = platform.name;

    let juegosCount = tarjeta.querySelector("#platform_games_count");
    juegosCount.textContent = "Cantidad de juegos: " + (platform.games_count);
  });

}

/*******************************************************************************/
// Buscador
document.addEventListener("DOMContentLoaded", () => {
  const inputBusqueda = document.querySelector(".search-input input");
  if (inputBusqueda) {
    inputBusqueda.addEventListener("input", function (event) {
      const searchTerm = event.target.value.toLowerCase();
      const plataformasFiltradas = allPlatform.filter((platform) =>
        platform.name.toLowerCase().includes(searchTerm)
      );
      procesarPlataformas(plataformasFiltradas);
    });
  } else {
    console.error("No se encontró el input de búsqueda en el DOM.");
  }
});

/*******************************************************************************/
// Grafico

function datosGrafico(plataformas) {
  let nombresPlataformas = [];
  let juegosPorPlataforma = [];

  plataformas.forEach((platform) => {
    nombresPlataformas.push(platform.name);
    juegosPorPlataforma.push(platform.games_count);
  });

  crearGrafico(nombresPlataformas, juegosPorPlataforma);
}

function crearGrafico(nombresPlataformas, juegosPorPlataforma) {
  const ctx = document.getElementById('graficoPlataformas').getContext('2d');
  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: nombresPlataformas,
      datasets: [{
        label: 'Cantidad de juegos',
        data: juegosPorPlataforma,
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1
      }]
    },
    options: {
      responsive: true,
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });
}

/*******************************************************************************/