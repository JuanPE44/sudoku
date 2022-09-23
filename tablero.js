class Tablero {
    constructor() {
        this.filas = 3;
        this.columnas = 3;        
        this.cajas = [];
        this.cajasCorrectas = [];
        this.cajitaActual;
        this.cajaActual;
        this.tablero = [
            "  74916 5",
            "2   6 3 9",
            "     7 1 ",
            " 586    4",
            "  3    9 ",
            "  62  187",
            "9 4 7   2",
            "67 83    ",
            "81  45   "
        ];
        this.tableroSolucion = [
            "387491625",
            "241568379",
            "569327418",
            "758619234",
            "123784596",
            "496253187",
            "934176852",
            "675832941",
            "812945763"
        ];
    }

    arrayCajas() {
        let cajas = [];
        let cajasCorrectas = [];
        for (let i=0;i<this.filas;i++) {
            cajas[i] = [];
            cajasCorrectas[i] = [];	

        }

        this.cajasCorrectas = cajasCorrectas;
        return cajas;
    }


    rellenarTablero() {
        const divTablero = document.getElementById('tablero');
        let cajas = this.arrayCajas();
        for(let i=0;i<this.filas;i++) {
            for(let j=0;j<this.columnas;j++) {
                let C = new Caja('caja',i.toString()+j.toString());
                let caja = C.crearCaja();
                
                C.rellenarCaja();
                cajas[i][j] = C.caja;
                this.cajasCorrectas[i][j] = C.caja;
                divTablero.appendChild(caja);
            }
        }
        
        this.cajas = cajas;
        this.escribirTablero();
    }

    escribirTablero() {       
        let i=0;
        let j=0;
        for(let a=0;a<3;a++) {
            for(let b=0;b<3;b++) {
                for(let c=0;c<3;c++) {                    
                    for(let d=0;d<3;d++) {            
                        this.cajas[a][c][b][d].innerHTML = this.tablero[i][j];
                        this.cajasCorrectas[a][c][b][d] = this.tableroSolucion[i][j];
                        j++;
                        if(j==9) {
                            i++;
                            j=0;
                        }                                                                        
                    }
                }
            }
        }
        console.log(this.cajasCorrectas[2][0][0][0]);
    }

    despintarActual() {
        if(this.cajitaActual !== undefined) {
            this.cajitaActual.elemento.classList.remove('actual');
            this.cajitaActual.actual = true;
        }
    }

    pintarActual() {
        this.cajitaActual.elemento.classList.add('actual');
        this.cajitaActual.actual = true;
    }

    compararNumero(numero) {
        let id1 = this.cajaActual.id;
        let id2 = this.cajitaActual.id;
        let actual = this.cajitaActual.elemento;
        
        numero === this.cajasCorrectas[id1[0]][id1[1]][id2[0]][id2[1]] ? actual.classList.add('correcto') : actual.classList.add('incorrecto');          
    }
}

