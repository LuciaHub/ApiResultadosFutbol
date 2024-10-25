let URL = "data/2024-25/es.1.json";
const divJornadas = document.getElementById("jornadas");

//FUNCIONES
/*
Toma el número de la jornada y los registros de partidos como parámetros.
Crea un arreglo partidosJornada que contiene los partidos de la jornada específica.
Establece la variable jornada como Matchday ${numeroJornada}, y luego, en un bucle for, 
revisa si registro.round coincide con jornada. Si es así, agrega el partido a partidosJornada.
Llama a la función crearDivJornada para crear el contenedor de la jornada.
Recorre cada partidoJornada de la jornada seleccionada:
Si el partido aún no tiene resultado (score.ft es undefined), 
establece los goles de ambos equipos como "-".
Si hay resultados, extrae los goles locales y visitantes.
Crea el código HTML correspondiente con los nombres de los equipos y sus goles.
Agrega el HTML generado al div específico de la jornada (divNumeroJornada), 
utilizando insertAdjacentHTML("beforeend", codigo).
*/
function extraerPartidosJornada(numeroJornada,registros){
    partidosJornada = [];
    jornada = `Matchday ${numeroJornada}`;
    for (registro of registros.matches){
        if(registro.round == jornada){
           partidosJornada.push(registro);
        }
    }
    crearDivJornada(numeroJornada);

    for(partidoJornada of partidosJornada){
        if (partidoJornada.score.ft == undefined) {
            golesLocal = "-"
            golesVisitante = "-";
        } else {
            golesLocal = partidoJornada.score.ft[0];
            golesVisitante = partidoJornada.score.ft[1];
        }
        codigo = `<div class="partido">
                        <div class="equipos">
                            <p class="equipoLocal">${partidoJornada.team1}</p>
                            <p>VS</p>
                            <p class="equipoVisitante">${partidoJornada.team2}</p>
                        </div>
                        <div class="goles">
                                <p class="golesLocal">${golesLocal}</p>
                                <p class="golesVisitante">${golesVisitante}</p>
                        </div>
                    </div>`;
       divNumeroJornada = document.querySelector(`#jornada${numeroJornada}`);
       divNumeroJornada.insertAdjacentHTML("beforeend", codigo) ;
    }
}//extraerPartidosJornada
/*
Genera el contenedor HTML de una jornada.
Usa numeroJornada para nombrar la jornada (Jornada ${numeroJornada}) 
y genera un div con el id jornada${numeroJornada}.
Inserta este código en el contenedor principal divJornadas.
*/

function crearDivJornada(numeroJornada){
    nombreJornada = `Jornada ${numeroJornada}`;
    codigo = `<div class="jornada" id="jornada${numeroJornada}">
                    <h2>${nombreJornada}</h2>
                </div>`;
    divJornadas.insertAdjacentHTML("beforeend", codigo);
}//crearDivJornada
/*
Esta función usa fetch para obtener los datos del archivo JSON.
Luego convierte los datos a JSON y llama a extraerPartidosJornada 
pasándole numeroJornada y los registros de datos.
*/
function visualizarJornada(numeroJornada) {
    fetch(URL)
    .then(datosJson => datosJson.json())
        .then(registros => {
        // Limpiar las jornadas antes de agregar nuevas
        divJornadas.innerHTML = '';
        extraerPartidosJornada(numeroJornada,registros);
        
    })
}//visualizarJornada
/*
Un bucle for recorre cada número de jornada desde 1 hasta 38.
Para cada jornada, llama a visualizarJornada(i),
que extrae y muestra los datos de esa jornada en el contenedor HTML.
*/
function cargarJornadas() {
    for (let i = 1; i <= 38; i++) {
        option = document.createElement("option");
        option.value = i; // Valor de la jornada
        option.textContent = `Jornada ${i}`; // Texto que se mostrará en el desplegable
        jornadaSelector.appendChild(option);
    }
}//cargarJornadas

// cambio en el desplegable
jornadaSelector.addEventListener("change", function() {
    numeroJornadaSeleccionada = this.value;
    visualizarJornada(numeroJornadaSeleccionada);
});


cargarJornadas();
visualizarJornada(1);



//SENTENCIAS
/*for (i = 1; i <= 38; i++){
    visualizarJornada(i);
}
*/
//visualizarJornada(i);

