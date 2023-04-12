class Cajita extends Caja {
  constructor(clase, id, padre) {
    super(clase, id);
    this.elemento;
    this.error;
    this.marcado = false;
    this.actual = false;
    this.padre = padre;
  }

  crearCajita() {
    const cajita = document.createElement("div");
    cajita.classList.add(this.clase);
    cajita.id = this.id;
    cajita.addEventListener("click", () => {
      this.clickCajita();
    });
    this.elemento = cajita;
    return cajita;
  }

  clickCajita() {
    if (t.jugando === true) {
      this.actual = true;
      t.despintarActual();
      t.cajitaActual = this;
      t.pintarActual();
      t.pintarPosibles(this.padre.id);
    }
  }
}
