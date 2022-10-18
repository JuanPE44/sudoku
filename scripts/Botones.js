
class Boton {
    constructor(clase) {
        this.clase = clase;
        this.elemento;
    }

    seleccionarBoton() {
        let elemento = document.querySelectorAll(this.clase);
        
        elemento.forEach(e=> {
            e.addEventListener('click', ()=> {
                if(this.clase === '.btn-borrar') {
                    t.borrarError();
                }
                if(this.clase === '.btn-retroceder') {
                    t.botonRetroceder()
                }
    
    
            })
        })
        this.elemento = elemento;
    }

    
}
