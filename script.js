


const t = new Tablero();

class Caja {
    constructor(clase,id) {
        this.filas = 3;
        this.columnas = 3;
        this.clase = clase;
        this.id = id;
        this.caja = [];
    }

    arrayCaja() {
        let cajas = []
        for (let i=0;i<this.filas;i++) {
            cajas[i] = [];	
        }
        return cajas;
    }

    crearCaja() {
        const caja = document.createElement('div');
        caja.classList.add(this.clase);
        caja.id = this.id;
        this.caja = caja;
        return caja;
    }

    rellenarCaja() {
        
        let caja = this.arrayCaja();
        for(let i=0;i<this.filas;i++) {
            for(let j=0;j<this.columnas;j++) {              
                let c = new Cajita('cajita',i.toString()+j.toString());
                let cajita = c.crearCajita();
                caja[i][j] = cajita;
                this.caja.appendChild(cajita);
            }
        }
        this.caja = caja;
        
    }
}

class Cajita extends Caja {
    constructor(clase,id) {
        super(clase,id);
    }

    crearCajita() {
        const cajita = document.createElement('div');
        cajita.classList.add(this.clase);
        cajita.id = this.id;
        cajita.addEventListener('click',()=> {
            this.clickCajita();
        });
        return cajita;
    }

    clickCajita() {
        console.log(this.id);
    }
}

t.rellenarTablero();