/********************************************************************************/
// Juegos favoritos

document.addEventListener("DOMContentLoaded", () => {
    const juegosFavoritosContainer = document.getElementById("juegosFavoritosContainer");
    let juegosFavoritos = JSON.parse(localStorage.getItem("juegosFavoritos")) || [];

    if (juegosFavoritos.length === 0) {
        juegosFavoritosContainer.innerHTML = "<p class='text-white'>No tienes juegos en favoritos.</p>";
        return;
    }

    juegosFavoritos.forEach((game) => {
        const card = document.createElement("div");
        card.classList.add("col-12", "col-xl-3", "col-lg-3", "col-md-4", "col-sm-6", "mb-3", "d-flex");
        
        card.innerHTML = `
            <div class="card flex-fill bg-dark text-white mb-3 position-relative">
                <img class="card-img-top" src="${game.background_image}" alt="${game.name}">
                <div class="card-body">
                    <h4 class="card-title">${game.name}</h4>
                    <p class="card-text">Fecha de salida: ${game.released}</p>
                    <button class="btn btn-outline-danger btn-sm remove-favorite position-absolute bottom-0 end-0 m-1">
                        <i class="fa fa-times"></i>
                    </button>
                </div>
            </div>
        `;

        card.querySelector(".remove-favorite").addEventListener("click", () => {
            juegosFavoritos = juegosFavoritos.filter((fav) => fav.id !== game.id);
            localStorage.setItem("juegosFavoritos", JSON.stringify(juegosFavoritos));
            card.remove();

            if (juegosFavoritos.length === 0) {
                juegosFavoritosContainer.innerHTML = "<p class='text-white'>No tienes juegos en favoritos.</p>";
            }
        });

        juegosFavoritosContainer.appendChild(card);
    });
});

/********************************************************************************/
// Plataformas favoritas

document.addEventListener("DOMContentLoaded", () => {
    const plataformasFavoritosContainer = document.getElementById("plataformasFavoritosContainer");
    let plataformasFavoritos = JSON.parse(localStorage.getItem("plataformasFavoritos")) || [];

    if (plataformasFavoritos.length === 0) {
        plataformasFavoritosContainer.innerHTML = "<p class='text-white'>No tienes plataformas en favoritos.</p>";
        return;
    }

    plataformasFavoritos.forEach((platform) => {
        const card = document.createElement("div");
        card.classList.add("col-12", "col-xl-3", "col-lg-3", "col-md-4", "col-sm-6", "mb-3", "d-flex");
        
        card.innerHTML = `
            <div class="card flex-fill bg-dark text-white mb-3 position-relative">
                <img class="card-img-top" src="${platform.image_background}" alt="${platform.name}">
                <div class="card-body">
                    <h4 class="card-title">${platform.name}</h4>
                    <p class="card-text">Cantidad de juegos: ${platform.games_count}</p>
                    <button class="btn btn-outline-danger btn-sm remove-favorite position-absolute bottom-0 end-0 m-1">
                        <i class="fa fa-times"></i>
                    </button>
                </div>
            </div>
        `;

        card.querySelector(".remove-favorite").addEventListener("click", () => {
            plataformasFavoritos = plataformasFavoritos.filter((fav) => fav.id !== platform.id);
            localStorage.setItem("plataformasFavoritos", JSON.stringify(plataformasFavoritos));
            card.remove();

            if (plataformasFavoritos.length === 0) {
                plataformasFavoritosContainer.innerHTML = "<p class='text-white'>No tienes plataformas en favoritos.</p>";
            }
        });

        plataformasFavoritosContainer.appendChild(card);
    });
});

/********************************************************************************/
// Generos favoritos

document.addEventListener("DOMContentLoaded", () => {
    const generosFavoritosContainer = document.getElementById("generosFavoritosContainer");
    let generosFavoritos = JSON.parse(localStorage.getItem("generosFavoritos")) || [];

    if (generosFavoritos.length === 0) {
        generosFavoritosContainer.innerHTML = "<p class='text-white'>No tienes generos en favoritos.</p>";
        return;
    }

    generosFavoritos.forEach((genre) => {
        const card = document.createElement("div");
        card.classList.add("col-12", "col-xl-3", "col-lg-3", "col-md-4", "col-sm-6", "mb-3", "d-flex");
        
        card.innerHTML = `
            <div class="card flex-fill bg-dark text-white mb-3 position-relative">
                <img class="card-img-top" src="${genre.image_background}" alt="${genre.name}">
                <div class="card-body">
                    <h4 class="card-title">${genre.name}</h4>
                    <p class="card-text">Cantidad de juegos: ${genre.games_count}</p>
                    <button class="btn btn-outline-danger btn-sm remove-favorite position-absolute bottom-0 end-0 m-1">
                        <i class="fa fa-times"></i>
                    </button>
                </div>
            </div>
        `;

        card.querySelector(".remove-favorite").addEventListener("click", () => {
            generosFavoritos = generosFavoritos.filter((fav) => fav.id !== genre.id);
            localStorage.setItem("generosFavoritos", JSON.stringify(generosFavoritos));
            card.remove();

            if (generosFavoritos.length === 0) {
                generosFavoritosContainer.innerHTML = "<p class='text-white'>No tienes generos en favoritos.</p>";
            }
        });

        generosFavoritosContainer.appendChild(card);
    });
});

/********************************************************************************/