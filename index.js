/*function procesardatos(data) {

  data.forEach(game => {
    console.log(game.name)
    console.log(game.released)
    console.log(game.background_image)
    console.log(game)
    game.platforms.forEach(plataform => {
      console.log(plataform.platform.name)
    });


    game.ratings.forEach(rating => {
      console.log(rating.title, rating.percent)

    }
    );
    let genero = []
    game.genres.forEach(genre => {
      genero.push(genre.name)
    }
    );
    console.log(genero)

  });
}*/


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
  // Asociación de plataformas con sus íconos
  const plataformaicono = {
    "PC": "img/windows.svg",
    "PlayStation 5": "img/playstation.svg",
    "PlayStation 4": "img/playstation.svg",
    "Xbox One": "img/xbox.svg",
    "Xbox Series S/X": "img/xbox.svg",
    "Nintendo Switch": "img/nintendo.svg",
    "iOS": "img/ios.svg",
    "Android": "img/android.svg",
    "Nintendo 3DS": "img/nintendo.svg",
    "Nintendo DS": "img/nintendo.svg",
    "Nintendo DSi": "img/nintendo.svg",
    "macOS": "img/apple.svg",
    "Linux": "img/linux.svg",
    "Xbox 360": "img/xbox.svg",
    "Xbox": "img/xbox.svg",
    "PlayStation 3": "img/playstation.svg",
    "PlayStation 2": "img/playstation.svg",
    "PlayStation": "img/playstation.svg",
    "PS Vita": "img/playstation.svg",
    "PSP": "img/playstation.svg",
    "Wii U": "img/nintendo.svg",
    "Wii": "img/nintendo.svg",
    "GameCube": "img/nintendo.svg",
    "Nintendo 64": "img/nintendo.svg",
    "Game Boy Advance": "img/nintendo.svg",
    "Game Boy Color": "img/nintendo.svg",
    "Game Boy": "img/nintendo.svg",
    "SNES": "img/nintendo.svg",
    "NES": "img/nintendo.svg",
    "Classic Macintosh": "img/apple.svg",
    "Apple II": "img/apple.svg",
    "Commodore / Amiga": "img/commodore.svg",
    "Atari 7800": "img/atari.svg",
    "Atari 5200": "img/atari.svg",
    "Atari 2600": "img/atari.svg",
    "Atari Flashback": "img/atari.svg",
    "Atari 8-bit": "img/atari.svg",
    "Atari ST": "img/atari.svg",
    "Atari Lynx": "img/atari.svg",
    "Atari XEGS": "img/atari.svg",
    "Genesis": "img/sega.svg",
    "SEGA Saturn": "img/atari.svg",
    "SEGA CD": "img/sega.svg",
    "SEGA 32X": "img/sega.svg",
    "SEGA Master System": "img/sega.svg",
    "Dreamcast": "img/sega.svg",
    "SEGA Master System": "img/sega.svg",
    "3DO": "img/panasonic.svg",
    "Jaguar": "img/atari.svg",
    "Game Gear": "img/sega.svg",
    "Neo Geo": "img/snk.svg",
    "Web": "img/web.svg",
  };

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

    // Configuramos las plataformas
    let plataformas = tarjeta.querySelector("#platforms");
    plataformas.innerHTML = ""; // Limpiamos cualquier contenido anterior

    // Usamos un conjunto para evitar repeticiones de íconos
    let uniqueIcons = new Set();

    game.platforms.forEach(plataforma => {
      let platformName = plataforma.platform.name;
      let iconSrc = plataformaicono[platformName];

      if (iconSrc && !uniqueIcons.has(iconSrc)) {
        uniqueIcons.add(iconSrc); // Añadimos el ícono al conjunto para evitar repeticiones

        // Crear el ícono
        let icono = document.createElement("img");
        icono.src = iconSrc;
        icono.alt = platformName;
        icono.style.width = "20px";
        icono.style.height = "20px";
        icono.style.marginRight = "10px"; // Espaciado entre los íconos

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

getGame(1, 40);