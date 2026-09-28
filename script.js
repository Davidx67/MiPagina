// ================================
// RELOJ
// ================================

function actualizarReloj() {
    const ahora = new Date();

    const horas = String(ahora.getHours()).padStart(2, "0");
    const minutos = String(ahora.getMinutes()).padStart(2, "0");

    document.querySelector(".reloj").textContent = horas + ":" + minutos;
}

actualizarReloj();
setInterval(actualizarReloj, 1000);


// ================================
// VENTANAS
// ================================

const ventana = document.querySelector(".ventana");
const ventanaDibujos = document.querySelector(".ventana-dibujos");
const ventanaMusica = document.querySelector(".ventana-musica");
const ventanaJuegos = document.querySelector(".ventana-juegos");

const ventanas = document.querySelectorAll(".ventana");

function cerrarVentanas() {
    ventanas.forEach(function (ventanaActual) {
        ventanaActual.style.display = "none";
    });
}

let nivelVentana = 10;


// ================================
// BOTONES
// ================================

const botonCerrar = document.querySelector(".boton-cerrar");
const botonSobreMi = document.querySelector("#abrir-sobre-mi");

const botonDibujos = document.querySelector("#abrir-dibujos");
const cerrarDibujos = document.querySelector(".boton-cerrar-dibujos");

const botonMusica = document.querySelector("#abrir-musica");
const cerrarMusica = document.querySelector(".boton-cerrar-musica");

const botonJuegos = document.querySelector("#abrir-juegos");
const cerrarJuegos = document.querySelector(".boton-cerrar-juegos");

// Cerrar Sobre mí

botonCerrar.addEventListener("click", function () {
    ventana.style.display = "none";
});


// Abrir Sobre mí

botonSobreMi.addEventListener("click", function () {

    cerrarVentanas();

    ventana.style.display = "block";
    nivelVentana++;
    ventana.style.zIndex = nivelVentana;
});


// Abrir Dibujos

botonDibujos.addEventListener("click", function () {

    cerrarVentanas();

    ventanaDibujos.style.display = "block";
    nivelVentana++;
    ventanaDibujos.style.zIndex = nivelVentana;
});


// Cerrar Dibujos

cerrarDibujos.addEventListener("click", function () {
    ventanaDibujos.style.display = "none";
});

// Abrir Música

botonMusica.addEventListener("click", function () {

    cerrarVentanas();

    ventanaMusica.style.display = "block";
    nivelVentana++;
    ventanaMusica.style.zIndex = nivelVentana;
});


// Cerrar Música

cerrarMusica.addEventListener("click", function () {
    ventanaMusica.style.display = "none";
});

// Abrir Juegos
botonJuegos.addEventListener("click", function () {

    cerrarVentanas();

    ventanaJuegos.style.display = "block";
    nivelVentana++;
    ventanaJuegos.style.zIndex = nivelVentana;
});

// Cerrar Juegos
cerrarJuegos.addEventListener("click", function () {
    ventanaJuegos.style.display = "none";
});

// ================================
// MOVER VENTANAS
// ================================

ventanas.forEach(function (ventanaActual) {

    const barra = ventanaActual.querySelector(".barra-titulo");

    barra.addEventListener("mousedown", function (evento) {

        if (evento.target.tagName === "BUTTON") {
            return;
        }

        const posicion = ventanaActual.getBoundingClientRect();

        const diferenciaX = evento.clientX - posicion.left;
        const diferenciaY = evento.clientY - posicion.top;

ventanaActual.style.left = posicion.left + "px";
ventanaActual.style.top = posicion.top + "px";

ventanaActual.style.position = "fixed";
ventanaActual.style.margin = "0";

        function moverVentana(eventoMovimiento) {

            ventanaActual.style.left =
                eventoMovimiento.clientX - diferenciaX + "px";

            ventanaActual.style.top =
                eventoMovimiento.clientY - diferenciaY + "px";
        }

        document.addEventListener("mousemove", moverVentana);

        document.addEventListener("mouseup", function detenerMovimiento() {

            document.removeEventListener("mousemove", moverVentana);
            document.removeEventListener("mouseup", detenerMovimiento);

        });
    });
});


// ================================
// TRAER VENTANA AL FRENTE
// ================================

ventanas.forEach(function (ventanaActual) {

    ventanaActual.addEventListener("mousedown", function () {

        nivelVentana++;
        ventanaActual.style.zIndex = nivelVentana;

    });
});

const canciones = [
    {
        nombre: "What You Know",
        archivo: "audio/What You Know_spotdown.org.mp3",
        volumen: 1
    },
    {
        nombre: "No Hands",
        archivo: "audio/No Hands_spotdown.org.mp3",
        volumen: 0.3
    }
];

let cancionActual = 0;

const reproductor = document.querySelector("#reproductor");
const botonPlay = document.querySelector("#boton-play");

botonPlay.addEventListener("click", function () {

    if (reproductor.paused) {
        reproductor.play();
        botonPlay.textContent = "Ⅱ";
    } else {
        reproductor.pause();
        botonPlay.textContent = "▶";
    }

});

const botonStop = document.querySelector("#boton-stop");

botonStop.addEventListener("click", function () {
    reproductor.pause();
    reproductor.currentTime = 0;
    botonPlay.textContent = "▶";
});

const tiempoActual = document.querySelector("#tiempo-actual");
const duracionTotal = document.querySelector("#duracion-total");

function convertirTiempo(segundos) {
    const minutos = Math.floor(segundos / 60);
    const segundosRestantes = Math.floor(segundos % 60);

    return (
        String(minutos).padStart(2, "0") +
        ":" +
        String(segundosRestantes).padStart(2, "0")
    );
}

reproductor.addEventListener("loadedmetadata", function () {
    duracionTotal.textContent = convertirTiempo(reproductor.duration);
});

reproductor.addEventListener("timeupdate", function () {
    tiempoActual.textContent = convertirTiempo(reproductor.currentTime);
});

const barraProgreso = document.querySelector("#barra-progreso");
const progreso = document.querySelector("#progreso");

reproductor.addEventListener("timeupdate", function () {

    if (reproductor.duration) {

        const porcentaje =
            (reproductor.currentTime / reproductor.duration) * 100;

        progreso.style.width = porcentaje + "%";
    }

});

barraProgreso.addEventListener("click", function (evento) {

    const anchoBarra = barraProgreso.clientWidth;

    const posicionClick = evento.offsetX;

    const porcentaje = posicionClick / anchoBarra;

    reproductor.currentTime =
        porcentaje * reproductor.duration;

});

const botonSiguiente = document.querySelector("#boton-siguiente");
const nombreCancion = document.querySelector(".nombre-cancion");

botonSiguiente.addEventListener("click", function () {

    cancionActual++;

    if (cancionActual >= canciones.length) {
        cancionActual = 0;
    }

reproductor.src = canciones[cancionActual].archivo;
nombreCancion.textContent = canciones[cancionActual].nombre;

reproductor.volume = canciones[cancionActual].volumen;

reproductor.play();
    botonPlay.textContent = "Ⅱ";

});

const botonAnterior = document.querySelector("#boton-anterior");

botonAnterior.addEventListener("click", function () {

    cancionActual--;

    if (cancionActual < 0) {
        cancionActual = canciones.length - 1;
    }

    reproductor.src = canciones[cancionActual].archivo;
    nombreCancion.textContent = canciones[cancionActual].nombre;

    reproductor.volume = canciones[cancionActual].volumen;

    reproductor.play();
    botonPlay.textContent = "Ⅱ";

});

reproductor.addEventListener("ended", function () {

    cancionActual++;

    if (cancionActual >= canciones.length) {
        cancionActual = 0;
    }

    reproductor.src = canciones[cancionActual].archivo;
    nombreCancion.textContent = canciones[cancionActual].nombre;

    reproductor.volume = canciones[cancionActual].volumen;

    reproductor.play();
    botonPlay.textContent = "Ⅱ";

});

const listaDibujos = [
    "1 si si.png",
    "2 Dibujo.jpg",
    "3 Dibujo.jpg",
    "4 Dibujo.png",
    "5 Dibujo.png"
];

const galeriaDibujos = document.querySelector("#galeria-dibujos");

listaDibujos.forEach(function (archivo, indice) {

    const tarjeta = document.createElement("div");
    tarjeta.classList.add("tarjeta-dibujo");

    const imagen = document.createElement("img");
    imagen.src = "imagenes/" + archivo;
    imagen.alt = "Dibujo " + (indice + 1);

    tarjeta.appendChild(imagen);
    galeriaDibujos.appendChild(tarjeta);

});

const visorDibujo = document.querySelector("#visor-dibujo");
const imagenGrande = document.querySelector("#imagen-grande");
const cerrarVisor = document.querySelector("#cerrar-visor");

const dibujos = document.querySelectorAll(".tarjeta-dibujo img");

const visorAnterior = document.querySelector("#visor-anterior");
const visorSiguiente = document.querySelector("#visor-siguiente");

let dibujoActual = 0;

dibujos.forEach(function (dibujo, indice) {

    dibujo.addEventListener("click", function () {

        dibujoActual = indice;

        imagenGrande.src = dibujos[dibujoActual].src;

        visorDibujo.style.display = "flex";

    });

});

visorSiguiente.addEventListener("click", function () {

    dibujoActual++;

    if (dibujoActual >= dibujos.length) {
        dibujoActual = 0;
    }

    imagenGrande.src = dibujos[dibujoActual].src;

});


visorAnterior.addEventListener("click", function () {

    dibujoActual--;

    if (dibujoActual < 0) {
        dibujoActual = dibujos.length - 1;
    }

    imagenGrande.src = dibujos[dibujoActual].src;

});

cerrarVisor.addEventListener("click", function () {

    visorDibujo.style.display = "none";

});

const listaJuegos = [
    {
        nombre: "Dark Messiah of Might and Magic",
        portada: "Dark messiah.jpe",
        estado: "TERMINADO",
        nota: "9/10",
        horas: "33,7 h",
        opinion: "Sinceramente, el juego me encantó demasiado, tanto por su estilo de combate como por la magia, que es algo que amo en los juegos. Aparte de eso, para mí tiene una buena historia; tal vez no sea la más desarrollada, pero es buena. Los enemigos son excelentes. Hay varias razas y diferentes tipos de amenazas que le dan un toque muy bueno y hacen que el mundo se sienta más vivo. Pero, sin duda, lo mejor del juego es la mecánica de patear. Puedes tener momentos muy divertidos dándoles una patada en el culo a tus enemigos. Sin duda, un juego maravilloso. 9/10.",
        recuerdos: "Pendiente"
    }
];

const galeriaJuegos = document.querySelector("#galeria-juegos");

listaJuegos.forEach(function (juego) {

    const tarjeta = document.createElement("div");
    tarjeta.classList.add("tarjeta-juego");

    tarjeta.innerHTML = `
        <img src="juegos/${juego.portada}" alt="${juego.nombre}">

        <div class="info-tarjeta-juego">
            <strong>${juego.nombre}</strong>
            <span>> ${juego.estado}</span>
        </div>
    `;

    galeriaJuegos.appendChild(tarjeta);

});

const fichaJuego = document.querySelector("#ficha-juego");
const cerrarFichaJuego = document.querySelector("#cerrar-ficha-juego");

const fichaPortada = document.querySelector("#ficha-portada");
const fichaNombre = document.querySelector("#ficha-nombre");
const fichaEstado = document.querySelector("#ficha-estado");
const fichaNota = document.querySelector("#ficha-nota");
const fichaHoras = document.querySelector("#ficha-horas");
const fichaOpinion = document.querySelector("#ficha-opinion");
const fichaRecuerdos = document.querySelector("#ficha-recuerdos");

const tarjetasJuegos = document.querySelectorAll(".tarjeta-juego");

tarjetasJuegos.forEach(function (tarjeta, indice) {

    tarjeta.addEventListener("click", function () {

        const juego = listaJuegos[indice];

        fichaPortada.src = "juegos/" + juego.portada;
        fichaNombre.textContent = juego.nombre;
        fichaEstado.textContent = juego.estado;
        fichaNota.textContent = juego.nota;
        fichaHoras.textContent = juego.horas;
        fichaOpinion.textContent = juego.opinion;
        fichaRecuerdos.textContent = juego.recuerdos;

        fichaJuego.style.display = "flex";

    });

});

cerrarFichaJuego.addEventListener("click", function () {
    fichaJuego.style.display = "none";
});