
class Cajita extends Caja {
    constructor(clase,id) {
        super(clase,id);
        this.elemento;
        this.error;
        this.marcado = false;
        this.actual = false;
    }

    crearCajita() {
        const cajita = document.createElement('div');
        cajita.classList.add(this.clase);
        cajita.id = this.id;
        cajita.addEventListener('click',()=> {
            this.clickCajita();
        });
        this.elemento = cajita;
        return cajita;
    }

    clickCajita() {   
        this.actual = true;     
        t.despintarActual();
        t.cajitaActual = this;        
        t.pintarActual();
       
    }
}