const tablero = [
    //tablero1
    ["  74916 5",
        "2   6 3 9",
        "     7 1 ",
        " 586    4",
        "  3    9 ",
        "  62  187",
        "9 4 7   2",
        "67 83    ",
        "81  45   "],
    //tablero2
    [" 6 1 4 5 ",
        "  83 56  ",
        "2       1",
        "8  4 7  6",
        "  6   3  ",
        "7  9 1  4",
        "5       2",
        "  72 69  ",
        " 4 5 8 7 "],
    //tablero3
    ["  6   5 7",
        " 9  68   ",
        "7 8  5  4",
        "  15 429 ",
        " 7  3    ",
        "3 9   71 ",
        " 5  4 8 9",
        " 826     ",
        "    274 6"]
];

const tableroSolucion = [
    //tablero1
    ["387491625",
        "241568379",
        "569327418",
        "758619234",
        "123784596",
        "496253187",
        "934176852",
        "675832941",
        "812945763"],
    //tablero2
    ["963174258",
        "178325649",
        "254689731",
        "821437596",
        "496852317",
        "735961824",
        "589713462",
        "317246985",
        "642598173"],
    //tablero3
    ["136492587",
        "594768132",
        "728315964",
        "861574293",
        "275931648",
        "349286715",
        "657143829",
        "482659371",
        "913827456"]
];

class Tablero {
    constructor() {
        this.filas = 3;
        this.columnas = 3;
        this.jugando = false;
        this.pausa = false;
        this.ganar = false;
        this.perder = false;
        this.errores = 0;
        this.divErrores = document.querySelector('.errores');
        this.cajas = [];
        this.cajasCorrectas = [];
        this.cajitaActual;
        this.cajaActual;
        this.cajaAnterior;
        this.tablero = [];
        this.tableroSolucion = tableroSolucion[1];
        this.historial = [];
        this.numerosCompletos = [0, 0, 0, 0, 0, 0, 0, 0, 0];
        this.tiempoActual = '00:00';
        this.intervalo;
    }

    arrayCajas() {
        let cajas = [];
        let cajasCorrectas = [];
        for (let i = 0; i < this.filas; i++) {
            cajas[i] = [];
            cajasCorrectas[i] = [];

        }
        return [cajas, cajasCorrectas];
    }


    rellenarTablero() {
        const divTablero = document.getElementById('tablero');
        const fragmento = document.createDocumentFragment();
        let cajas = this.arrayCajas()[0];
        let cajasCorrectas = this.arrayCajas()[1];
        for (let i = 0; i < this.filas; i++) {
            for (let j = 0; j < this.columnas; j++) {

                let C = new Caja('caja', i.toString() + j.toString());
                let CCorrecta = new Caja();
                let caja = C.crearElementoCaja();
                let CajaCorrecta = CCorrecta.crearElementoCaja();
                CCorrecta.rellenarCaja();
                C.rellenarCaja();
                cajas[i][j] = C.caja;
                cajasCorrectas[i][j] = CCorrecta.caja;
                fragmento.appendChild(caja)
            }
        }
        divTablero.appendChild(fragmento);
        this.cajas = cajas;
        this.cajasCorrectas = cajasCorrectas;

    }

    iniciarPartida() {
        const contenedorIniciar = document.querySelector('.contenedor-iniciar');
        const iniciar = document.querySelector('.btn-iniciar');
        const reiniciar = document.querySelector('.btn-reiniciar');

        iniciar.addEventListener('click', () => {
            contenedorIniciar.style.display = 'none';
            this.divErrores.style.visibility = 'visible';
            reiniciar.style.visibility = 'visible';
            this.jugando = true;
            let numRandom = Math.floor(Math.random() * tablero.length);
            this.tablero = tablero[numRandom];
            this.tableroSolucion = tableroSolucion[numRandom];
            this.escribirTablero();
            n.clickNumero();
            btnBorrar.seleccionarBoton()
            btnRetroceder.seleccionarBoton()
            t.controlarTiempo();
        })
    }

    controlarTiempo() {
        this.intervalo = setInterval(contador, 1000);
        let seg = 0;
        let min = 0;

        function contador() {
            seg++;
            if (seg === 60) {
                min++;
                seg = 0;
            }
            let ceroS, ceroM;
            seg < 10 ? ceroS = '0' : ceroS = '';
            min < 10 ? ceroM = '0' : ceroM = '';
            
            
            document.querySelector('.tiempo').innerHTML = `${ceroM}${min}:${ceroS}${seg}`;
            
            
        }
        const botonPausar = document.querySelector('.tiempo-pausa');
        botonPausar.innerHTML = '<i class="fa-solid fa-pause"></i>';

        botonPausar.addEventListener('click', () => {
            const cajitas = document.querySelectorAll('.cajita');
            if(!this.ganar) {
                if (this.pausa === false) {
                    this.pausarTiempo(botonPausar,cajitas);
                } else {
                    this.despausarTiempo(contador, botonPausar,cajitas);
                }
            }

            
        })

    }

    pausarTiempo(botonPausar,cajitas) {
        this.pausa = true;
        this.jugando = false;
        clearInterval(this.intervalo);
        botonPausar.innerHTML = '<i class="fa-solid fa-play"></i>';
        cajitas.forEach(e => {
            e.style.color = '#fff'
            e.style.background = '#fff';
        })
        this.despintarActual();
        this.tiempoActual = document.querySelector('.tiempo').innerHTML;
        
    }

    despausarTiempo(contador, botonPausar,cajitas) {
        this.pausa = false;
        this.jugando = true;
        this.intervalo = setInterval(contador, 1000);
        botonPausar.innerHTML = '<i class="fa-solid fa-pause"></i>';
        cajitas.forEach(e => {
            e.style.color = '';
            e.style.background = '';
            if (this.cajitaActual !== undefined) {
                this.pintarActual();
            }
        })
        this.pintarPosibles(this.cajitaActual.padre.id);
    }

    escribirTablero() {
        let i = 0;
        let j = 0;
        for (let a = 0; a < 3; a++) {
            for (let b = 0; b < 3; b++) {
                for (let c = 0; c < 3; c++) {
                    for (let d = 0; d < 3; d++) {
                        this.cajas[a][c][b][d].innerHTML = this.tablero[i][j];
                        if (this.cajas[a][c][b][d].innerHTML !== ' ') {
                            this.numerosCompletos[parseInt(this.cajas[a][c][b][d].innerHTML) - 1]++;
                        }
                        this.cajasCorrectas[a][c][b][d] = this.tableroSolucion[i][j];
                        j++;
                        if (j == 9) {
                            i++;
                            j = 0;
                        }
                    }
                }
            }
        }
    }

    despintarActual() {
        if (this.cajitaActual !== undefined) {
            this.cajitaActual.elemento.classList.remove('actual');
            this.cajitaActual.actual = true;
            for (let a = 0; a < 3; a++) {
                for (let b = 0; b < 3; b++) {
                    for (let c = 0; c < 3; c++) {
                        for (let d = 0; d < 3; d++) {
                            this.cajas[a][c][b][d].classList.remove('actuales');
                            this.cajas[a][c][b][d].classList.remove('posibles');
                        }
                    }
                }
            }
        }
    }

    pintarActual() {
        this.cajitaActual.elemento.classList.add('actual');
        this.cajitaActual.actual = true;
        for (let a = 0; a < 3; a++) {
            for (let b = 0; b < 3; b++) {
                for (let c = 0; c < 3; c++) {
                    for (let d = 0; d < 3; d++) {
                        if (this.cajas[a][c][b][d].innerHTML === this.cajitaActual.elemento.innerHTML && this.cajitaActual.elemento.innerHTML !== ' ') {
                            this.cajas[a][c][b][d].classList.add('actuales');
                        }
                    }
                }
            }
        }
    }




    pintarPosibles(id1) {
        let id2 = this.cajitaActual.id;
        for (let a = 0; a < 3; a++) {
            for (let b = 0; b < 3; b++) {
                for (let c = 0; c < 3; c++) {
                    for (let d = 0; d < 3; d++) {
                        // caja actual
                        this.cajas[id1[0]][id1[1]][c][d].classList.add('posibles')
                        // fila actual
                        this.cajas[id1[0]][b][id2[0]][d].classList.add('posibles');
                        // columna actual
                        this.cajas[a][id1[1]][c][id2[1]].classList.add('posibles');
                    }
                }
            }
        }
    }

    compararNumero(numero) {
        let id1 = this.cajaActual.id;
        let id2 = this.cajitaActual.id;
        let actual = this.cajitaActual;
        if (numero === this.cajasCorrectas[id1[0]][id1[1]][id2[0]][id2[1]]) {
            actual.elemento.classList.add('correcto')
            actual.error = false;
            t.cajitaActual.marcado = true;
            return true;
        } else {
            actual.elemento.classList.add('incorrecto');
            actual.error = true;
            this.despintarActual()
            t.cajitaActual.marcado = false;
            this.errores++;
            return false;
        }
    }

    comprobarSiGano() {
        let cont = 0;
        this.numerosCompletos.forEach(n => {
            if(n === 9) {
                cont++;
            }
        })
        if(cont === 9) {
            this.ganarPartida();
        }
    }

    reiniciarPartida() {
        
    }

    ganarPartida() {
        this.jugando = false;
        this.ganar = true;
        const cajitas = document.querySelectorAll('.cajita');
        const botonPausar = document.querySelector('.tiempo-pausa');        
        this.pausarTiempo(botonPausar,cajitas);
        const divTablero = document.querySelector('.tablero');
        const contGanar = document.querySelector('.contenedor-ganar');
        const info = document.querySelector('.informacion-win');
        contGanar.style.display = 'flex';
        divTablero.style.border = 'none';
        divTablero.style.borderRadius = '10px';
        const iconoErrores = '<div class="win-icon"><i class="fa-solid fa-xmark"></i></div>';
        const iconoTiempo = '<div class="win-icon"><i class="fa-regular fa-clock"></i></div>';
        const iconoMejor = '<div class="win-icon"><i class="fa-solid fa-medal"></i></div>';
        info.innerHTML = `<li class="win-item">
                            ${iconoErrores}
                            <div class="win-info">
                                <span>Erorres:</span>
                                <span>${this.errores}</span>
                            </div>
                          </li>
                          <li class="win-item">
                            ${iconoTiempo}
                            <div class="win-info">                                
                                <span>Tiempo:</span>
                                <span>${this.tiempoActual}</span>
                            </div>
                          </li>
                          <li class="win-item">
                            ${iconoMejor}
                            <div class="win-info">
                                <span>Mejor tiempo:</span>
                                <span>10:00</span>
                            </div>
                          </li>`;
        this.despintarActual();
        this.divErrores.style.visibility = 'hidden';
        document.querySelectorAll('.boton').forEach(b=> {
            b.classList.add('boton-win');
        })
        console.log('gano partida');
    }

    mostrarErrores() {
           
        this.divErrores.innerHTML = `${t.errores}`;
        if(t.errores > 0) {
            this.divErrores.style.color = '#e55c6c';
        }
    }

    borrarError() {
        if (this.cajitaActual.error === true) {
            this.cajitaActual.elemento.innerHTML = ' ';
            this.cajitaActual.elemento.classList.remove('incorrecto');
            this.cajitaActual.marcado = false;
            this.cajitaActual.error = false;
            t.despintarActual();
        }
    }

    botonRetroceder() {
        let filtrado = t.historial.filter(e => e.elemento.classList.contains('incorrecto') || e.elemento.classList.contains('correcto'));
        if (filtrado.length !== 0) {
            let cajita = filtrado[filtrado.length - 1];
            cajita.elemento.innerHTML = ' ';
            cajita.elemento.classList.remove('actual');
            cajita.elemento.classList.remove('actuales');
            cajita.elemento.classList.remove('correcto');
            cajita.elemento.classList.remove('incorrecto');
            cajita.marcado = false;
            cajita.actual = false;
            this.historial.pop();
            t.despintarActual();
        }
    }
}

