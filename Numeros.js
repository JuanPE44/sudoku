
class Numeros {
    constructor() {
        this.numeros = document.querySelectorAll('.contenedor-numeros button');
    }

    clickNumero() {
        this.numeros.forEach(numero => {
            numero.addEventListener('click', (e)=> {
                if(t.cajaActual.marcado === false) {
                    t.cajaActual.elemento.innerHTML = numero.innerHTML;
                    t.cajaActual.marcado = true;
                }
            })
        })
    }
}
