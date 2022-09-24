
const t = new Tablero();
const n = new Numeros();

const btnBorrar = new Boton('.btn-borrar');
const btnRetroceder = new Boton('.btn-retroceder');
btnBorrar.seleccionarBoton()
btnRetroceder.seleccionarBoton()

t.rellenarTablero();
n.clickNumero();