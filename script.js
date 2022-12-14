
// variables globales

const btnBorrar = document.querySelector('.btn-borrar');
const tablero = document.querySelector('.tablero');
const contNumeros = document.querySelector('.contenedor-numeros');
const errores = document.querySelector('.errores');

let borrar = false;
let numero = '';
let numeroSeleccionado = ' ';
let error = 0;
let casillasMarcadas;
let numeroMarcadoAnterior = ' ';
let marcadoAnterior = ' ';
let arrayIds = [];
let marcado = false;
let contador = 1;


let board = [
    "  74916 5",
    "2   6 3 9",
    "     7 1 ",
    " 586    4",
    "  3    9 ",
    "  62  187",
    "9 4 7   2",
    "67 83    ",
    "81  45   "
]

let solution = [
    "387491625",
    "241568379",
    "569327418",
    "758619234",
    "123784596",
    "496253187",
    "934176852",
    "675832941",
    "812945763"
]



// matriz

// se crea la matriz m de tres dimensiones

let matrizTablero = []
for (let i = 0; i < 9; i++) {
	matrizTablero[i] = [];	
}


// funciones


// crea las casillas y las agrega al tablero


const crearCasilla = (id1,id2,num) => {
    const div = document.createElement('div');
    div.classList.add('casilla');
    div.innerHTML = num;
    div.id = id1.toString() + id2.toString();
    tablero.appendChild(div);
}


// pinta los bordes de adentro para separar los 9 cuadrados

const pintarBorde = () => {
    for(let i=0;i<matrizTablero.length;i++) {
        for(let j=0;j<matrizTablero.length;j++) {
            let casilla = matrizTablero[i][j];
            if(i === 2 || i === 5) {casilla.classList.add('borde-abajo');}
            if(j === 2 || j === 5) {casilla.classList.add('borde-derecha');}
        }
    }
    /*const casillas = document.querySelectorAll('.casilla');
    casillas.forEach(casilla => {
        let ids = casilla.id
        let id1 = parseInt(ids.charAt(0));
        let id2 = parseInt(ids.charAt(1));

        if(id1 === 2 || id1 === 5) {casilla.classList.add('borde-abajo');}
        if(id2 === 2 || id2 === 5) {casilla.classList.add('borde-derecha');}
    })
    */
}


// pinta el fondo de las casillas que por defecto ya son correctas

const pintarCorrectos = () => {
    for(let i=0;i<matrizTablero.length;i++) {
        for(let j=0;j<matrizTablero.length;j++) {
            let casilla = matrizTablero[i][j];
            casilla.innerHTML !== solution[i].charAt(j) ? error=0 : casilla.classList.add('casilla-defecto');
        }
    }
    /*const casillas = document.querySelectorAll('.casilla');
    casillas.forEach(casilla => {
        let ids = casilla.id;
        let id1 = parseInt(ids.charAt(0));
        let id2 = parseInt(ids.charAt(1));
        casilla.innerHTML !== solution[id1].charAt(id2) ? error=0 : casilla.classList.add('casilla-defecto');                    
    });
    */
}


// selecciona el numero al hacer click 

const seleccionarNumeros = () => {
    contNumeros.addEventListener('click', (e)=>{
    
        if(e.target.classList[0] === 'numero') {
            
            if(numero !== '') {
                if(numero.id !== e.target.id) {
                    numero.classList.remove('numero-seleccionado');
                }
            }
            numero = e.target            
            numero.classList.toggle('numero-seleccionado');
            if(numero.classList[1] === 'numero-seleccionado') {
                numeroSeleccionado = numero.innerHTML;
            } else {
                numeroSeleccionado = ' ';
            }
        }
    })
}


// logica del boton de borrar 

const botonBorrar = () => {
    btnBorrar.addEventListener('click', (e)=>{
        borrar === false ? borrar = true : borrar = false;
        borrar === true ? btnBorrar.classList.add('borrar-seleccionado') : btnBorrar.classList.remove('borrar-seleccionado');
    }) 
}


// si la casilla es incorrecta y borrar es true al hacer click se borra la casilla

const borrarCasilla = (casilla) => {    
    if(casilla.classList.contains('casilla-incorrecta') && !casilla.classList.contains('casilla-seleccionada')) {
        casilla.innerHTML = ' ';
        casilla.classList.remove('casilla-incorrecta');
    }
    btnBorrar.classList.remove('borrar-seleccionado');
    borrar = false;
}

const desmarcarCasillasFaltantes = (casilla) => {

    if(marcadoAnterior !== ' ') {
        let id1 = parseInt(marcadoAnterior.charAt(0));
        let id2 = parseInt(marcadoAnterior.charAt(1));
        for(let i=0;i<9;i++) {
            console.log('entro')
            matrizTablero[id1][i].classList.remove('casillaVacia-seleccionada');
            matrizTablero[i][id2].classList.remove('casillaVacia-seleccionada');
        }  
        despintarCuadrado(arrayIds[0],arrayIds[1],arrayIds[2],arrayIds[3])
    }
}


// funciones que se ejecutan al hacer cick en una casilla

const clickCasilla = () => {
    tablero.addEventListener('click', (e)=> {
        let casilla = e.target         
        
        
        desmarcarCasillasFaltantes(casilla)
        marcarCasillasFaltantes(casilla);
        marcarCasillas(casilla); 
        
        if(casilla.classList.contains('casilla') && numeroSeleccionado !== ' ' && borrar !== true) {
            if(casilla.innerHTML == ' ') {
                casilla.innerHTML = numeroSeleccionado;
                deseleccionarNumero();
            }
            comprobarError(casilla);
            errores.innerHTML = 'Errores: '+error;
        }
        if(borrar === true) {
            borrarCasilla(casilla);
        }	
        numeroCompleto();   
        rellenarMatriz() 
    })
}

const rellenarMatriz = () => {
    const casillas = document.querySelectorAll('.casilla');
    casillas.forEach(casilla=>{
        let ids = casilla.id;
        let id1 = parseInt(ids.charAt(0));
        let id2 = parseInt(ids.charAt(1));
        matrizTablero[id1][id2] = casilla;        
    })
    
}




// al clickear una casilla te muestra todos los numeros de la casilla que hay en el tablero

const marcarCasillas = (casilla) => {
    const casillas = document.querySelectorAll('.casilla');
    
    if(casilla.classList.contains('casilla') && casilla.innerHTML !== ' ' && borrar !== true) {
        let numeroMarcado = casilla.innerHTML;
        
        if(numeroMarcadoAnterior !== ' ' ) {
            if(numeroMarcadoAnterior !== numeroMarcado) {
                
                casillas.forEach(item => {                
                    if(item.innerHTML === numeroMarcadoAnterior) {
                        item.classList.remove('casilla-seleccionada');                    
                    }
                });
                contador = 1;
            }
            marcado = true;
            
        }
        
        casillas.forEach(item => {            
            if(item.innerHTML === numeroMarcado) {
                item.classList.add('casilla-seleccionada');                                                 
            }            
        })

        if(numeroMarcadoAnterior === numeroMarcado) {
            contador++;
            if(contador%2==0) {
                casillas.forEach(item => {
                    item.classList.remove('casilla-seleccionada'); 
                })  
            }
        }  
        numeroMarcadoAnterior = numeroMarcado
    }
}


const marcarCasillasFaltantes = (casilla) => {
    
    let ids = casilla.id;
    let id1 = parseInt(ids.charAt(0));
    let id2 = parseInt(ids.charAt(1));
    for(let i=0;i<9;i++) {
        matrizTablero[id1][i].classList.remove('casillaVacia-seleccionada');
        matrizTablero[i][id2].classList.remove('casillaVacia-seleccionada');
    } 
    
    if(casilla.innerHTML === ' ' && borrar !== true && numeroSeleccionado === ' ')  {
        let marcadoActual = casilla.id;

        
        if(marcadoAnterior !== ' ' ) {

            if(marcadoAnterior !== marcadoActual) {
                let idA1 = parseInt(marcadoAnterior.charAt(0));
                let idA2 = parseInt(marcadoAnterior.charAt(1));
        
                for(let i=0;i<9;i++) {
                    matrizTablero[idA1][i].classList.remove('casillaVacia-seleccionada');
                    matrizTablero[i][idA2].classList.remove('casillaVacia-seleccionada');
                }
                despintarCuadrado(arrayIds[0],arrayIds[1],arrayIds[2],arrayIds[3])
                contador = 1;
            }
            marcado = true;
            
        }
        
        for(let i=0;i<9;i++) {
            if(matrizTablero[id1][i].innerHTML === ' ') {
                matrizTablero[id1][i].classList.add('casillaVacia-seleccionada');                
            }      
            if(matrizTablero[i][id2].innerHTML === ' ') {
                matrizTablero[i][id2].classList.add('casillaVacia-seleccionada');
            }
        }
       
        logicaCuadrados(id1,id2)


        if(marcadoActual === marcadoAnterior) {
            contador++;
            if(contador%2==0) {
                for(let i=0;i<9;i++) {
                    matrizTablero[id1][i].classList.remove('casillaVacia-seleccionada');
                    matrizTablero[i][id2].classList.remove('casillaVacia-seleccionada');
                }  
                despintarCuadrado(arrayIds[0],arrayIds[1],arrayIds[2],arrayIds[3])
            }
        }  
        marcadoAnterior = marcadoActual;
    }
}

const logicaCuadrados = (id1,id2) => {
    //cuadrados arriba
    if(id1<=2 && id2<=2) {
        pintarCuadrado(0,2,0,2);
    } else if(id1<=2 && id2<=5) {
        pintarCuadrado(0,2,3,5);
    } else if(id1<=2 && id2<=8) {
        pintarCuadrado(0,2,6,8);
    } //cuadrados medio
    else if(id1<=5 && id2<=2) {
        pintarCuadrado(3,5,0,2);
    } else if(id1<=5 && id2<=5) {
        pintarCuadrado(3,5,3,5);
    } else if(id1<=5 && id2<=8) {
        pintarCuadrado(3,5,6,8);
    } //cuadrados abajo
    else if(id1<=8 && id2<=2) {
        pintarCuadrado(6,8,0,2);
    } else if(id1<=8 && id2<=5) {
        pintarCuadrado(6,8,3,5);
    } else if(id1<=8 && id2<=8) {
        pintarCuadrado(6,8,6,8);
    }
}

const pintarCuadrado = (i1,i2,j1,j2) => {
    arrayIds = [i1,i2,j1,j2];
    for(let i=i1;i<=i2;i++) {
        for(let j=j1;j<=j2;j++)
        if(matrizTablero[i][j].innerHTML === ' ') {
            matrizTablero[i][j].classList.add('casillaVacia-seleccionada');                
        }                  
    }
    
}

const despintarCuadrado = (i1,i2,j1,j2) => {
    for(let i=i1;i<=i2;i++) {
        for(let j=j1;j<=j2;j++) {
            matrizTablero[i][j].classList.remove('casillaVacia-seleccionada');
        }
                                             
    }
    
}


// deselecciona el numero seleccionado 

const deseleccionarNumero = () => {
    const seleccionado = document.querySelector('.numero-seleccionado');
    if(seleccionado !== null) {
        seleccionado.classList.remove('numero-seleccionado');
        numeroSeleccionado = ' ';  
    }
    
}



// si el numero ingresado es incorrecto de incrementa la variable error

const comprobarError = (casilla) => {
    let ids = casilla.id;
    let id1 = parseInt(ids.charAt(0));
    let id2 = parseInt(ids.charAt(1));
    
    if(casillaVacia(casilla) === true) {
        if(casilla.innerHTML !== solution[id1].charAt(id2)) {
            casilla.classList.add('casilla-incorrecta');  
            error++;
        } else {
            casilla.classList.add('casilla-correcta');  
        }
    }
    
                      
}


// comprueba si la casilla no tienen ninguna clase es decir, esta completamente vacio

const casillaVacia = (casilla) => {
    let bool = true;
    let clases = casilla.classList;
    if(clases.contains('casilla-defecto') || clases.contains('casilla-correcta') || clases.contains('casilla-incorrecta')) {
        bool = false;
    }
    return bool;
}



const numeroCompleto = () => {
    const casillas = document.querySelectorAll('.casilla');
    let numeros1 = 0;
    let numeros2 = 0;
    let numeros3 = 0;
    let numeros4 = 0;
    let numeros5 = 0;
    let numeros6 = 0;
    let numeros7 = 0;
    let numeros8 = 0;
    let numeros9 = 0;
    casillas.forEach(casilla => {
        if(casilla.classList.contains('casilla-defecto') || casilla.classList.contains('casilla-correcta')) {
            switch(parseInt(casilla.innerHTML)) {
                case 1: numeros1++;
                        if(numeros1 === 9) {eliminarNumero(1);}
                break;
                case 2: numeros2++;
                        if(numeros2 === 9) {eliminarNumero(2);}
                break;
                case 3: numeros3++;
                        if(numeros3 === 9) {eliminarNumero(3);}
                break;
                case 4: numeros4++;
                        if(numeros4 === 9) {eliminarNumero(4);}
                break;
                case 5: numeros5++;
                        if(numeros5 === 9) {eliminarNumero(5);}
                break;
                case 6: numeros6++;
                        if(numeros6 === 9) {eliminarNumero(6);}
                break;
                case 7: numeros7++;
                        if(numeros7 === 9) {eliminarNumero(7);}
                break;
                case 8: numeros8++;
                        if(numeros8 === 9) {eliminarNumero(8);}
                break;
                case 9: numeros9++;
                        if(numeros9 === 9) {eliminarNumero(9);}
                break;
            }
        }
        
    })
    
}

const eliminarNumero = (numero) => {
    const numeros = document.querySelectorAll('.numero');
    numeros.forEach(item => {
        if(parseInt(item.innerHTML) === numero) {
            item.innerHTML = '';
            item.classList.remove('numero');
        }
    })
}



// funcion principal que ejecuta todo

const god = () => {

    botonBorrar();
    seleccionarNumeros();
    
    for(let i=0;i<9;i++) {
        for(let j=0;j<9;j++) {
            num = board[i].charAt(j);
            crearCasilla(i,j,num);
        }
    }
    rellenarMatriz();
    clickCasilla();
    pintarBorde();
    pintarCorrectos();
        
}

god()