let allGenre = [];

/*******************************************************************************/
// Peticion de los Datos

fetch("https://api.rawg.io/api/genres?key=236c519bed714a588c3f1aee662a2c2d")
    .then((response) => response.json())
    .then((jsondata) => {
        allGenre = jsondata.results;
        procesarGeneros(allGenre);
        datosGrafico(allGenre);
    })
    .catch((error) => console.error("Error:", error));

/*******************************************************************************/
// Datos de generos

function procesarGeneros(generos) {
    let plantilla = document.getElementById("plantilla");
    let contenedor = plantilla.parentNode;

    const existingCards = contenedor.querySelectorAll(".genre-card");
    existingCards.forEach((card) => card.remove());

    if (generos.length === 0) {
        mostrarMensajeSinResultados();
        return;
    }

    generos.forEach((genre) => {
        let tarjeta = plantilla.cloneNode(true);
        tarjeta.classList.remove("d-none");
        tarjeta.classList.add("genre-card");
        contenedor.appendChild(tarjeta);

        let imagen = tarjeta.querySelector("#genre_background_image");
        imagen.setAttribute("src", genre.image_background);
        imagen.setAttribute("alt", genre.name);

        let nombre = tarjeta.querySelector("#genre_name");
        nombre.textContent = genre.name;

        let juegosCount = tarjeta.querySelector("#genre_games_count");
        juegosCount.textContent = "Cantidad de juegos: " + genre.games_count;

        tarjeta.setAttribute("id", "genre_" + genre.id);
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

function mostrarMensajeSinResultados() {
    const contenedor = document.getElementById("contenedor");
    if (contenedor) {
        contenedor.innerHTML = `
        <p class="text-white">No se encontraron generos que coincidan con los filtros seleccionados.</p>
      `;
    }
}

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

/*******************************************************************************/
// Me gusta

document.addEventListener("click", function (event) {
    if (event.target.closest(".like-button")) {
        const card = event.target.closest(".genre-card");
        const genreId = card.getAttribute("id").split("_")[1];

        const genre = allGenre.find((genre) => genre.id == genreId);

        let generosFavoritos = JSON.parse(localStorage.getItem("generosFavoritos")) || [];

        if (!generosFavoritos.some((fav) => fav.id === genre.id)) {
            generosFavoritos.push(genre);
            localStorage.setItem("generosFavoritos", JSON.stringify(generosFavoritos));
            console.log(`Genero añadido a favoritos: ${genre.name}`);
        } else {
            console.log("El genero ya está en favoritos.");
        }
    }
});

/*******************************************************************************/