class Caja {
  constructor(clase, id) {
    this.filas = 3;
    this.columnas = 3;
    this.clase = clase;
    this.id = id;
    this.caja = [];
    this.elemento;
  }

  arrayCaja() {
    let caja = [];
    for (let i = 0; i < this.filas; i++) {
      caja[i] = [];
    }
    return caja;
  }

  crearElementoCaja() {
    const caja = document.createElement("div");
    caja.classList.add(this.clase);
    caja.id = this.id;
    caja.addEventListener("click", () => {
      this.clickCaja();
    });
    this.elemento = caja;
    return caja;
  }

  rellenarCaja() {
    const fragmento = document.createDocumentFragment();
    let caja = this.arrayCaja();
    for (let i = 0; i < this.filas; i++) {
      for (let j = 0; j < this.columnas; j++) {
        let c = new Cajita(
          "cajita",
          i.toString() + j.toString(),
          this.elemento
        );
        let cajita = c.crearCajita();
        caja[i][j] = cajita;
        fragmento.appendChild(cajita);
      }
    }
    this.elemento.appendChild(fragmento);
    this.caja = caja;
  }

  clickCaja() {
    t.cajaActual = this;
  }
}
