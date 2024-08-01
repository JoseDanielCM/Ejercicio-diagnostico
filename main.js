var lista_cursos = [{
    nombre: "skills",
    descripcion: "curso orientado en aprender a programar",
    contenido: ["javascript", "html", "css"]
}, {
    nombre: "ingles",
    descripcion: "curso orientado en aprender ingles",
    contenido: ["verbos", "html", "css"]
}, {
    nombre: "mate",
    descripcion: "curso orientado en aprender mate",
    contenido: ["aa", "bb", "cc"]
}, {
    nombre: "python",
    descripcion: "curso orientado en aprender python",
    contenido: ["variables", "funciones"]
}, {
    nombre: "javascript",
    descripcion: "curso orientado en aprender javascript",
    contenido: ["asincronia"]
}]


const agregarSessionStorage = function () {
    let contador = 1
    for (const curso of lista_cursos) {
        sessionStorage.setItem(`curso ${contador}`, curso.nombre);
        contador++

    }
}

const validar_opciones = function (min, max, mensaje) {
    while (true) {
        var escogido = prompt(mensaje)
        escogido = Number(escogido);
        if (!isNaN(escogido) && escogido >= min && escogido <= max) {
            return Number(escogido)
        }

    }
}

const agregarCurso = function () {
    nombreCurso = prompt("Ingresa el nombre que deseas colocarle al curso")
    descripcionCurso = prompt("Ingresa la descripcion del curso")
    contenidoCurso = prompt("Ingresa el contenido que tendran los cursos (separados por espacios 'js html css')")
    var urlimagen = prompt("Ingresa una url para la imagen")
    let datosNuevoCurso = {
        nombre: nombreCurso,
        descripcion: descripcionCurso,
        contenido: contenidoCurso.split(' ')
    }
    lista_cursos.push(datosNuevoCurso)
    return urlimagen
}

const eliminar_curso = function () {
    let variableImprimir = ``
    let contador = 1
    for (const curso of lista_cursos) {
        variableImprimir += `curso ${contador} \n - Nombre: ${curso.nombre} \n- Descripcion: ${curso.descripcion} \n- Contenido: ${curso.contenido}\n`
        contador++
    }
    alert(variableImprimir)
    let cursoEliminar = validar_opciones(1, lista_cursos.length, "Que curso deseas eliminar: ")
    lista_cursos.splice(cursoEliminar - 1, 1)

}

const editar_curso = function () {
    let variableImprimir = ``
    let contador = 1
    for (const curso of lista_cursos) {
        variableImprimir += `curso ${contador} \n - Nombre: ${curso.nombre} \n- Descripcion: ${curso.descripcion} \n- Contenido: ${curso.contenido}\n`
        contador++
    }
    alert(variableImprimir)
    let cursoEditar = validar_opciones(1, lista_cursos.length, "Que curso deseas editar: ")
    contador = 0

    for (const curso of lista_cursos) {
        if (contador == cursoEditar - 1) {
            alert(`los datos de los cursos son:
1- Nombre
2- Descripcion
3- Contenido`)
            let opcion = validar_opciones(1, 3, "Que dato deseas editar")
            switch (opcion) {
                case 1:
                    curso.nombre = prompt("Ingresa el nuevo nombre")
                    break;
                case 2:
                    curso.descripcion = prompt("Ingresa la nuevo descripcion")
                    break;
                case 3:
                    dato = prompt("Ingresa el nuevo contenido")
                    curso.contenido = dato.split(" ")
                    break;
            }
            console.log(lista_cursos)
            return null
        }
        contador++

    }

}

const filtrarNombre = function () {
    let nombreBuscar = prompt("Ingresa el nombre del curso a buscar")
    let encontrado = false
    let contador = 1
    for (const curso of lista_cursos) {
        if (curso.nombre == nombreBuscar) {
            var resultado = curso
            encontrado = true
            break;
        }
        contador++
    }
    console.log(resultado);
    if (!encontrado) {
        alert("No hay resultados")
    } else {
        alert(`curso ${contador} \n - Nombre: ${resultado.nombre} \n- Descripcion: ${resultado.descripcion} \n- Contenido: ${resultado.contenido}\n`)
    }
}

const filtrarTema = function () {
    let temaBuscar = prompt("Ingresa el tema del curso a buscar")
    let encontrado = false
    let contador = 1
    for (const curso of lista_cursos) {
        for (let i = 0; i < curso.contenido.length; i++) {
            if (curso.contenido[i] == temaBuscar) {
                var resultado = curso
                encontrado = true
                break;
            }
        }

        contador++
    }
    console.log(resultado);
    if (!encontrado) {
        alert("No hay resultados")
    } else {
        alert(`curso ${contador} \n - Nombre: ${resultado.nombre} \n- Descripcion: ${resultado.descripcion} \n- Contenido: ${resultado.contenido}\n`)
    }

}

urlimagen="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRxe6IR3EKgALq0lEUvpW3GmPH8rpAv1cK0_w&s"

const cargarCursos = function () {
    let htmlcurso = ""
    for (const curso of lista_cursos) {
        htmlcurso += `
        <div class="curso">
            <div class="imagen">
                <img src="${urlimagen}" alt="">
            </div>
            <div class="nombre">${curso.nombre}</div>
            <div class="descripcion">${curso.descripcion}</div>
        </div>
        `
    }
    document.getElementById("cursos_disponibles_contenedor").innerHTML = htmlcurso
}

const otracargar = function (urlnueva) {
    let htmlcurso = ""
    for (const curso of lista_cursos) {
        htmlcurso += `
        <div class="curso">
            <div class="imagen">
                <img src="${urlnueva}" alt="">
            </div>
            <div class="nombre">${curso.nombre}</div>
            <div class="descripcion">${curso.descripcion}</div>
        </div>
        `
    }
    document.getElementById("cursos_disponibles_contenedor").innerHTML = htmlcurso
}

const btnAgregar = document.getElementById("boton_agregar_curso")
const btnEditar = document.getElementById("boton_editar_curso")
const btnEliminar = document.getElementById("boton_eliminar_curso")
const btnFiltrarNombre = document.getElementById("boton_filtrar_nombre")
const btnFiltrarTema = document.getElementById("boton_filtrar_tema")
const btnMostrar = document.getElementById("boton_mostrar")

btnAgregar.addEventListener("click", () => {
    urlnueva=agregarCurso()
    otracargar(urlnueva)
    sessionStorage.clear()
    agregarSessionStorage()
})
btnEditar.addEventListener("click", () => {
    editar_curso()
    cargarCursos()

})
btnEliminar.addEventListener("click", () => {
    eliminar_curso()
    cargarCursos()
    sessionStorage.clear()
    agregarSessionStorage()

})
btnFiltrarNombre.addEventListener("click", () => {
    filtrarNombre()
    cargarCursos()
    sessionStorage.clear()
    agregarSessionStorage()

})
btnFiltrarTema.addEventListener("click", () => {
    filtrarTema()
    cargarCursos()
    sessionStorage.clear()
    agregarSessionStorage()

})

cargarCursos()
