document.addEventListener("DOMContentLoaded", function () {
    const params = new URLSearchParams(window.location.search);
    const gameId = params.get("id");

    if (gameId) {
        getGameDetails(gameId);
    } else {
        console.error("No se encontró el ID del juego en la URL.");
    }
});

/*******************************************************************************/
// Peticion de los Datos

function getGameDetails(gameId) {
    const url = `https://api.rawg.io/api/games/${gameId}?key=236c519bed714a588c3f1aee662a2c2d`;
    fetch(url)
        .then((response) => response.json())
        .then((game) => mostrarDetalle(game))
        .catch((error) => console.error("Error", error));
}

/*******************************************************************************/
// Datos del juego

function mostrarDetalle(game) {
    console.log(game);

    let plantilla = document.getElementById("plantilla");
    let contenedor = plantilla.parentNode;

    let imagen = contenedor.querySelector("#background_image");
    imagen.setAttribute("src", game.background_image);
    imagen.setAttribute("alt", game.name);

    let nombre = contenedor.querySelector("#name");
    nombre.textContent = game.name;

    let descripcion = contenedor.querySelector("#description");
    descripcion.textContent = game.description_raw;


    const plataformas = document.getElementById("plataformas");
    plataformas.innerHTML = ""; 
    game.platforms.forEach((plataforma) => {
        const li = document.createElement("li");
        li.textContent = plataforma.platform.name;
        plataformas.appendChild(li);
    });

    const generos = document.getElementById("generos");
    generos.innerHTML = ""; 
    game.genres.forEach((genero) => {
        const li = document.createElement("li");
        li.textContent = genero.name;
        generos.appendChild(li);
    });

    const ratings = game.ratings;
    const totalRatings = ratings.reduce((sum, rating) => sum + rating.count, 0);

    const ratingBar = document.querySelector(".rating-bar");

    const exceptionalBar = ratingBar.querySelector(".bar.exceptional");
    const recommendedBar = ratingBar.querySelector(".bar.recommended");
    const mehBar = ratingBar.querySelector(".bar.meh");
    const skipBar = ratingBar.querySelector(".bar.skip");

    exceptionalBar.style.width = `${(ratings.find(r => r.title === "exceptional")?.percent || 0)}%`;
    recommendedBar.style.width = `${(ratings.find(r => r.title === "recommended")?.percent || 0)}%`;
    mehBar.style.width = `${(ratings.find(r => r.title === "meh")?.percent || 0)}%`;
    skipBar.style.width = `${(ratings.find(r => r.title === "skip")?.percent || 0)}%`;

    // Actualizar leyenda
    const ratingLegend = document.querySelector(".rating-legend");
    ratingLegend.innerHTML = "";

    ratings.forEach((rating) => {
        const legendItem = document.createElement("p");
        const dot = document.createElement("span");
        dot.classList.add("dot", rating.title.toLowerCase());
        const text = document.createTextNode(`${rating.title} ${rating.count}`);
        legendItem.appendChild(dot);
        legendItem.appendChild(text);
        ratingLegend.appendChild(legendItem);
    });
}

/*******************************************************************************/