//Variables 
const carrito = document.querySelector('#carrito');
const listaCursos = document.querySelector('#lista-cursos');
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito');
let articulosCarrito = [];

cargarEventListeners();
function cargarEventListeners() {
    //Cuando agregars un curso
    listaCursos.addEventListener('click', agregarCurso);

    //elimina cursos del carrito
    carrito.addEventListener('click', eliminarCurso);

    //vaciar carrito 
    vaciarCarritoBtn.addEventListener('click',() => {
        articulosCarrito = []; //reseteamos el arreglo
        limpiarHTML(); //eliminamos todo el html
    })
}

//Funciones
function agregarCurso(e){
    e.preventDefault();
    
    //Verificamos que dio click en agregar carrito
    if(e.target.classList.contains('agregar-carrito')){
        const cursoSeleccionado = e.target.parentElement.parentElement;
        leerDatosCurso(cursoSeleccionado);
        
    }

}

//Eliminar un curso
function eliminarCurso(e){
    console.log(e.target.classList)
    if (e.target.classList.contains('borrar-curso')) {
        const cursoId = e.target.getAttribute('data-id');

        //elimina del arreglo articulosCarrito por el data-id
        articulosCarrito = articulosCarrito.filter(curso => curso.id !== cursoId)
        carritoHTML(); //iterar sobre el carrito y mostrar su html
    }
}

//Lee el contenido del html al que le dimos click y extrae la informacion del curso
function leerDatosCurso(curso){
    /* console.log(curso) */

    //crear un objeto con el contenido del curso actual
    const infoCurso = {
        imagen: curso.querySelector('img').src,
        titulo: curso.querySelector('.info-card h4').textContent,
        precio: curso.querySelector('.precio span').textContent,
        id: curso.querySelector('a ').getAttribute('data-id'),
        cantidad: 1,
    }
    //Revisa si un elemento ya existe en el carrito
    const existe = articulosCarrito.some(curso => curso.id === infoCurso.id)
    if(existe){
        //Actualizamos la cantidad
        const cursos = articulosCarrito.map( curso => {
            if(curso.id === infoCurso.id){
                curso.cantidad++;
                return curso; //retorna el objeto actualizado
            } else {
                return curso; //retorna los objetos que no son los duplicados
            }
        })
        articulosCarrito = [...cursos];
    } else {
        //agrega elementos al arreglo de carritos
        articulosCarrito = [...articulosCarrito, infoCurso]
    }


    console.log(articulosCarrito)
    carritoHTML();
}

//Muestra el carrito de compras en el html
function carritoHTML(){
    
    //Limpiar el html
    limpiarHTML();

    //Recorre el carrito y genera el HTML
    articulosCarrito.forEach((curso) => {
        //destructuring con el arreglo
        const { imagen, titulo, cantidad, id, precio } = curso;

        const row = document.createElement('tr');
        row.innerHTML = `
        <td>
            <img src="${imagen}" alt="Imagen del Curso" width="100"/>
        </td>
        <td>
            ${titulo}
        </td>
        <td>
            ${precio}
        </td>
        <td>
            ${cantidad}
        </td>
        <td>
            <a href="#" class="borrar-curso" data-id="${id}"> x </a>
        </td>
        `;

        //Agrega el HTML del Carrito en el tbody
        contenedorCarrito.appendChild(row);
    })
}


//Elimina los cursos del tbody
function limpiarHTML(){
    //Forma lenta
    //contenedorCarrito.innerHTML = '';

    //Forma Rapida
    while (contenedorCarrito.firstChild) {
        contenedorCarrito.removeChild(contenedorCarrito.firstChild)
    }
}