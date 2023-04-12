if (localStorage.getItem("tiempos") === null) {
  let tiempos = [];
  localStorage.setItem("tiempos", JSON.stringify(tiempos));
}

const t = new Tablero();
const n = new Numeros();

const btnBorrar = new Boton(".btn-borrar");
const btnRetroceder = new Boton(".btn-retroceder");

t.rellenarTablero();
t.iniciarPartida();
t.obtenerMejorTiempo();
