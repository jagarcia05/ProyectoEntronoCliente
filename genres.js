let allGenre = [];

fetch("https://api.rawg.io/api/genres?key=236c519bed714a588c3f1aee662a2c2d")
    .then((response) => response.json())
    .then((jsondata) => {
        allGenre = jsondata.results;
        procesarGeneros(allGenre);
        datosGrafico(allGenre);
    })
    .catch((error) => console.error("Error:", error));

function procesarGeneros(generos) {
    let plantilla = document.getElementById("plantilla");
    let contenedor = plantilla.parentNode;

    while (contenedor.firstChild) {
        contenedor.removeChild(contenedor.firstChild);
    }

    generos.forEach((genre) => {
        let tarjeta = plantilla.cloneNode(true);
        contenedor.appendChild(tarjeta);

        let imagen = tarjeta.querySelector("#genre_background_image");
        imagen.setAttribute("src", genre.image_background);
        imagen.setAttribute("alt", genre.name);

        let nombre = tarjeta.querySelector("#genre_name");
        nombre.textContent = genre.name;

        let juegosCount = tarjeta.querySelector("#genre_games_count");
        juegosCount.textContent = "Cantidad de juegos: " + genre.games_count;
    });
}

/*******************************************************************************/
// Buscador

document.addEventListener("DOMContentLoaded", () => {
    const inputBusqueda = document.querySelector(".search-input input");
    if (inputBusqueda) {
        inputBusqueda.addEventListener("input", function (event) {
            const searchTerm = event.target.value.toLowerCase();
            const generosFiltrados = allGenre.filter((genre) =>
                genre.name.toLowerCase().includes(searchTerm)
            );
            procesarGeneros(generosFiltrados);
        });
    } else {
        console.error("No se encontró el input de búsqueda en el DOM.");
    }
});

/*******************************************************************************/
// Grafico

function datosGrafico(generos) {
    let nombresGeneros = [];
    let juegosPorGenero = [];

    generos.forEach((genre) => {
        nombresGeneros.push(genre.name);
        juegosPorGenero.push(genre.games_count);
    });

    crearGrafico(nombresGeneros, juegosPorGenero);
}

function crearGrafico(nombresGeneros, juegosPorGenero) {
    const ctx = document.getElementById('graficoGeneros').getContext('2d');
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: nombresGeneros,
            datasets: [{
                label: 'Cantidad de juegos',
                data: juegosPorGenero,
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

/********************************************************************************/