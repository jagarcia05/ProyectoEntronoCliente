import { plataformaicono } from "./plataformaicono.js";

/********************************************************************************/
// Juegos favoritos

document.addEventListener("DOMContentLoaded", () => {
    const contenedorJuegos = document.getElementById("contenedorJuegos");
    let juegosFavoritos = JSON.parse(localStorage.getItem("juegosFavoritos")) || [];

    if (juegosFavoritos.length === 0) {
        contenedorJuegos.innerHTML = "<p class='text-white'>No tienes juegos en favoritos</p>";
        return;
    }

    let plantilla = document.getElementById("plantillaJuegos");
    let contenedor = plantilla.parentNode;

    juegosFavoritos.forEach((game) => {
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

        const generos = tarjeta.querySelector("#game_genres");
        generos.textContent = game.genres.map((g) => g.name).join(" - ");

        let released = tarjeta.querySelector("#game_released");
        released.textContent = "Fecha de salida: " + game.released;
        released.style.fontWeight = "normal";

        tarjeta.querySelector(".remove-favorite").addEventListener("click", () => {
            juegosFavoritos = juegosFavoritos.filter((fav) => fav.id !== game.id);
            localStorage.setItem("juegosFavoritos", JSON.stringify(juegosFavoritos));
            tarjeta.remove();

            if (juegosFavoritos.length === 0) {
                contenedorJuegos.innerHTML = "<p class='text-white'>No tienes juegos en favoritos</p>";
            }
        });
    });
});

/********************************************************************************/
// Plataformas favoritas

document.addEventListener("DOMContentLoaded", () => {
    const contenedorPlataformas = document.getElementById("contenedorPlataformas");
    let plataformasFavoritos = JSON.parse(localStorage.getItem("plataformasFavoritos")) || [];

    if (plataformasFavoritos.length === 0) {
        contenedorPlataformas.innerHTML = "<p class='text-white'>No tienes plataformas en favoritos</p>";
        return;
    }

    let plantilla = document.getElementById("plantillaPlataformas");
    let contenedor = plantilla.parentNode;

    plataformasFavoritos.forEach((platform) => {
        let tarjeta = plantilla.cloneNode(true);
        tarjeta.classList.remove("d-none");
        tarjeta.classList.add("platform-card");
        contenedor.appendChild(tarjeta);

        let imagen = tarjeta.querySelector("#platform_background_image");
        imagen.setAttribute("src", platform.image_background);
        imagen.setAttribute("alt", platform.name);

        let nombre = tarjeta.querySelector("#platform_name");
        nombre.textContent = platform.name;

        let juegosCount = tarjeta.querySelector("#platform_games_count");
        juegosCount.textContent = "Cantidad de juegos: " + (platform.games_count);

        tarjeta.setAttribute("id", "platform_" + platform.id);

        tarjeta.querySelector(".remove-favorite").addEventListener("click", () => {
            plataformasFavoritos = plataformasFavoritos.filter((fav) => fav.id !== platform.id);
            localStorage.setItem("plataformasFavoritos", JSON.stringify(plataformasFavoritos));
            tarjeta.remove();

            if (plataformasFavoritos.length === 0) {
                contenedorPlataformas.innerHTML = "<p class='text-white'>No tienes plataformas en favoritos</p>";
            }
        });
    });
});

/********************************************************************************/
// Generos favoritos

document.addEventListener("DOMContentLoaded", () => {
    const contenedorGeneros = document.getElementById("contenedorGeneros");
    let generosFavoritos = JSON.parse(localStorage.getItem("generosFavoritos")) || [];

    if (generosFavoritos.length === 0) {
        contenedorGeneros.innerHTML = "<p class='text-white'>No tienes generos en favoritos</p>";
        return;
    }

    let plantilla = document.getElementById("plantillaGeneros");
    let contenedor = plantilla.parentNode;

    generosFavoritos.forEach((genre) => {
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

        tarjeta.querySelector(".remove-favorite").addEventListener("click", () => {
            generosFavoritos = generosFavoritos.filter((fav) => fav.id !== genre.id);
            localStorage.setItem("generosFavoritos", JSON.stringify(generosFavoritos));
            tarjeta.remove();

            if (generosFavoritos.length === 0) {
                contenedorGeneros.innerHTML = "<p class='text-white'>No tienes generos en favoritos</p>";
            }
        });
    });
});

/********************************************************************************/