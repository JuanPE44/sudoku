
// variables globales

const tablero = document.querySelector('.tablero');
const contNumeros = document.querySelector('.contenedor-numeros');

let numero = '';
let numeroSeleccionado;


let board = [
    "--74916-5",
    "2---6-3-9",
    "-----7-1-",
    "-586----4",
    "--3----9-",
    "--62--187",
    "9-4-7---2",
    "67-83----",
    "81--45---"
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
    
}



god()