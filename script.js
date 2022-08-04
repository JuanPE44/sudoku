
// variables globales

const tablero = document.querySelector('.tablero');
const contNumeros = document.querySelector('.contenedor-numeros');
const errores = document.querySelector('.errores');


let numero = '';
let numeroSeleccionado;
let error = 0;


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

let m = []
for (let i = 0; i < 9; i++) {
	m[i] = [];	
}

// se rellena la matris 

for (let i=0;i<9;i++) {
	for (let j=0;j<9;j++) {
		m[i][j] = board[i].charAt(j);
	}
}



console.log(m)


// funciones

const crearCasilla = (id1,id2,num) => {
    const div = document.createElement('div');
    div.classList.add('casilla');
    div.innerHTML = num;
    div.id = id1.toString() + id2.toString();
    tablero.appendChild(div);
}

const pintarBorde = () => {
    const casillas = document.querySelectorAll('.casilla');
    for(let casilla of casillas) {
        let ids = casilla.id
        let id1 = parseInt(ids.charAt(0));
        let id2 = parseInt(ids.charAt(1));
        console.log(id2)
        if(id1 === 2 || id1 === 5) {
            casilla.classList.add('borde-abajo');
        }
        if(id2 === 2 || id2 === 5) {
            casilla.classList.add('borde-derecha');
        }
    }
}

const comprobarError = (casilla) => {
    let ids = casilla.id;
    let id1 = parseInt(ids.charAt(0));
    let id2 = parseInt(ids.charAt(1));

    casilla.innerHTML !== solution[id1].charAt(id2) ? error++ : console.log('correcto');                    
}

const clickCasilla = () => {
    tablero.addEventListener('click', (e)=> {
        let casilla = e.target 
        console.log(numeroSeleccionado)
        if(casilla.classList.value === 'casilla' && numeroSeleccionado !== undefined) {
            if(casilla.innerHTML === ' ') {
                casilla.innerHTML = numeroSeleccionado;
            }
            comprobarError(casilla);
            errores.innerHTML = 'Errores: '+error;
        }	    
    })
}


const seleccionarNumeros = () => {
    contNumeros.addEventListener('click', (e)=>{
    
        if(e.target.classList.value === 'numero') {
            if(numero !== '') {
                numero.classList.remove('numero-seleccionado');
            }
            numero = e.target
            numeroSeleccionado = numero.innerHTML;
            numero.classList.add('numero-seleccionado');
        }
    })
}



const god = () => {
    
    seleccionarNumeros()
    
    for(let i=0;i<9;i++) {
        for(let j=0;j<9;j++) {
            num = m[i][j]
            crearCasilla(i,j,num);

        }
    }
    pintarBorde()
    clickCasilla()    
}

god()