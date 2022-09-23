

class Caja {
    constructor(clase,id) {
        this.filas = 3;
        this.columnas = 3;
        this.clase = clase;
        this.id = id;
        this.caja = [];
        this.elemento;
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
        caja.addEventListener('click',()=>{
            this.clickCaja();
        })
        this.caja = caja;
        this.elemento = caja;
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

    clickCaja() {
        t.cajaActual = this.elemento;
    
    }
}



