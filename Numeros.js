
class Numeros {
    constructor() {
        this.numeros = document.querySelectorAll('.contenedor-numeros button');
    }

    clickNumero() {
        this.numeros.forEach(numero => {
            numero.addEventListener('click', (e)=> {
                if(t.cajitaActual.marcado === false && t.cajitaActual.elemento.innerHTML === ' ') {
                    t.compararNumero(e.target.innerHTML)
                    t.cajitaActual.elemento.innerHTML = numero.innerHTML;
                    t.cajitaActual.marcado = true;
                    
                }
            })
        })
    }
}
