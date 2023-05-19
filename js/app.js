//VARIABLES PARA TRATAR MI ARRAY
let inventario = undefined;
let inventarios = [];

//INPUTS PARA TRATAR LOS DATOS ASOCIADOS A PRODUCTOS
const numero = document.getElementById('numero');
const producto = document.getElementById('producto');
const cantidad = document.getElementById('cantidad');
const valor = document.getElementById('valor');

//INOUT PARA RELIZAR EL BUSCADO DE PRODUCTO ID PARA POSTERIORMENTE EDITAR, ELIMINAR, ETC
const buscarCode = document.getElementById('productoConsulta');

//BOTONES
const botonConsulta = document.getElementById('consultar');
const botonConsultaApi = document.getElementById('consultarAPI');
const botonListar = document.getElementById('listar');
const botonListarApi = document.getElementById('listarAPI');
const botonLimpiar = document.getElementById('productos');
const botonEliminar = document.getElementById('eliminar');
const botonEliminarTodo = document.getElementById('eliminarTodo');
const botonEditar = document.getElementById('editar');
const botonRegistrar = document.getElementById('registrar');


//FUNCIONES
function obtenerInventarios() {
    inventarios = JSON.parse(localStorage.getItem('inventarios')) || [];
    inventarios = inventarios.map((inventario) => new Inventario(inventario.identificador, inventario.producto, inventario.cantidad, inventario.valor));
};

function buscarProducto(buscarCode) {
    return inventarios.find((inventario) => inventario.identificador == buscarCode);
};


//EVENTOS AÑADIDOS AL DOM

//FECHA DEL SISTEMA Y HORA A TRAVÉS DE LA LIBRERIA MOMENT.JS
var a = moment(new Date()).format("DD/MM/YYYY hh:mm a");
document.getElementById("fechahoy").innerHTML = 'Fecha del Sistema: <br><b>' + a + '</b><br>';

//CARGA TODOS LOS OBJETOS DESDE EL LOCALSTORAGE
document.addEventListener('DOMContentLoaded', () => {
    obtenerInventarios();
});


//AL PRESIONAR BOTÓN REGISTRAR SE EJECUTARÁ LO SIGUIENTE.
botonRegistrar.addEventListener('click', (evento) => {
    evento.preventDefault();
    if (numero.value == '' || producto.value == '' || cantidad.value == '' || valor.value == '') {
        //COMPROBACIÓN DE DATOS INGRESADOS, SI NO ESTÁN BIEN SERÁN MOSTRADOS POR PANTALLA.
        if (producto.value == '') producto.value = 'ERROR';
        if (cantidad.value == '') cantidad.value = '0';
        if (valor.value == '') valor.value = '0';
        if (numero.value == '') numero.value = 'ERROR';
        alert('FALTAN CAMPOS POR INGRESAR, REVISAR LO INGRESADO: \nPRODUCTO ID: ' + numero.value + '\nDESCRIPCION: ' + producto.value + '\nCANTIDAD: ' + cantidad.value + '\nVALOR: ' + valor.value);
    } else {
        //DE LO CONTRARIO SERÁN AGREGADOS A NUESTRO ARRAY.
        inventarios.push(new Inventario(numero.value, producto.value, +cantidad.value, +valor.value)); ///parseamos los valores numericos porque siempre un input nos trae un string
        alert('¡PRODUCTO AGREGADO CON ÉXITO!');
        //SE SUBEN AL LOCALSTORAGE PARA MANTENERLOS ACTUALIZADOS.
        localStorage.setItem('inventarios', JSON.stringify(inventarios));
        location.reload()
    }
});

//AL PRESIONAR BOTÓN DE LIMPIAR, SE ACTUALIZARÁ LA WEB.
botonLimpiar.addEventListener('click', () => {
    location.reload();
});


//AL PRESIONAR BOTÓN LISTAR SE EJECUTARÁ LO SIGUIENTE:
botonListar.addEventListener('click', (evento) => {
    evento.preventDefault();
    //COMPROBACIÓN DE QUE EL ARRAY ESTÉ CON OBJETOS.
    if (inventarios.length == 0) {
        // DE NO HABER OBJETOS, MOSTRARÁ MENSAJE EN PANTALLA.
        alert('¡NO HAY PRODUCTOS EN EL INVENTARIO!');
        location.reload();
    } else {
        //SI ENCUENTRA, CREAMOS ESTE DIV.
        const container = document.createElement("div");
        //LE ASIGNAMOS CLASES AL DIV.
        container.setAttribute("class", "alert alert-info alert-dismissible fade show animate__animated animate__tada");
        //LE DAMOS EL ATRIBUTO ROL PARA QUE FUNCIONE EL HECHO QUE SEAN ALERTAS.
        container.setAttribute("role", "alert1");
        //AGREGAMOS NUESTRO BOTON PARA CERRAR LAS ALERTAS
        container.innerHTML = '<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>';
        const body = document.querySelector("body");
        body.className = 'divFondo';
        //CICLO FOR QUE RECORRE MI ARRAY INVENTARIOS
        for (const Index of inventarios) {
            const list = document.createElement("ul");
            list.setAttribute("class", "");
            //CICLO FOR QUE RECORRE LOS INDEXES DE MI ARRAY INVENTARIOS
            for (var key in Index) {
                const liElement = document.createElement("li");
                //MOSTRAMOS EN UN LI, DENTRO DE UN UL CREADO ANTERIORMENTE LOS DATOS DE LOS PRODUCTOS INGRESADOS.
                liElement.innerHTML = `<b>${key.toUpperCase()}</b>: ${Index[key]}`;
                //UNIMOS LOS LI AL UL
                list.appendChild(liElement);
            }
            //UNIMOS EL UL AL DIV
            container.appendChild(list);
        }
        //UNIMOS EL DIV AL BODY
        body.appendChild(container);
        //RESCATAMOS EL ID DE MIS MENSAJES
        var p = document.getElementById("productos");
        var c = document.getElementById("prod");
        //LES CAMBIAMOS EL DISPLAY A BLOCK, PARA QUE SE MUESTREN AL APRETAR EL BOTON LISTAR
        p.style.display = "block";
        c.style.display = "block";
    }
});

//BOTÓM ELIMINAR
botonEliminar.addEventListener('click', (evento) => {
    evento.preventDefault();
    //REALIZO UN FILTER PARA FILTRAR TODOS LOS OBJETOS QUE NO COMPARTAN EL MISMO IDENTIFICADOR INGRESADO POR EL USUARIO
    inventarios = inventarios.filter(function (obj) {
        return obj.identificador !== buscarCode.value;
    });
    //PRODUCTO FUE FILTRADO DE NUESTRO ARRAY
    alert('PRODUCTO ELIMINADO DEL SISTEMA.')
    //SE SUBEN AL LOCALSTORAGE PARA MANTENERLOS ACTUALIZADOS.
    localStorage.setItem('inventarios', JSON.stringify(inventarios));
});

//BOTÓN QUE RESCATA LOS DATOS DE LOS OBJETOS
botonConsulta.addEventListener('click', (evento) => {
    evento.preventDefault();
    //INPUT PARA BUSCAR
    const codeBusqueda = buscarCode.value;
    //USAMOS LA FUNCION DECLARADA PREVIAMENTE PARA TRAER NUESTRO PRODUCTO DE VUELTA.
    const productoEncontrado = buscarProducto(codeBusqueda);
    if (productoEncontrado) {
        //SI LO ENCONTRAMOS, VAMOS A SETEAR NUESTROS INPUTS CON LOS VALORES ENCONTRADOS
        numero.value = productoEncontrado.identificador;
        producto.value = productoEncontrado.producto;
        cantidad.value = productoEncontrado.cantidad;
        valor.value = productoEncontrado.valor;
        //LES CAMBIAMOS EL DISPLAY A INLINE-BLOCK, PARA QUE SE MUESTREN AL APRETAR EL BOTÓN CONSULTAR Y PODES REALIZAR LAS OTRAS ACCIONES
        botonEliminar.style.display = "inline-block";
        botonEditar.style.display = "inline-block";
        alert('¡PRODUCTO ENCONTRADO!');
    } else {
        //MENSAJE SI NO ENCONTRAMOS EL PRODUCTO.
        alert('¡PRODUCTO NO ENCONTRADO!');
    }
});

//BOTÓN PARA EDITAR NUESTROS PRODUCTOS.
botonEditar.addEventListener('click', (evento) => {
    evento.preventDefault();
    //INPUT PARA BUSCAR
    const codeBusqueda = buscarCode.value;
    //BUSCAREMOS EL NUMERO DE NUESTRO ARREGLO AL QUE PERTENECE EL ID INGRESADO
    const editUser = inventarios.findIndex((inventario) => inventario.identificador == codeBusqueda);
    //DE SER ENCONTRADO, CAMBIARÁ LOS VALORES DE ESA POSICION EN MI ARREGLO POR LOS VALORES QUE ESTÁN EN MIS INPUTS.
    inventarios[editUser].identificador = numero.value;
    inventarios[editUser].producto = producto.value;
    inventarios[editUser].cantidad = cantidad.value;
    inventarios[editUser].valor = valor.value;
    //MENSAJE QUE MUESTRA TODO LO QUE ACABAMOS DE EDITAR.
    alert('REVISA LO EDITADO: \nPRODUCTO ID: ' + numero.value + '\nDESCRIPCION: ' + producto.value + '\nCANTIDAD: ' + cantidad.value + '\nVALOR: ' + valor.value);
    //SE SUBEN AL LOCALSTORAGE PARA MANTENERLOS ACTUALIZADOS.
    localStorage.setItem('inventarios', JSON.stringify(inventarios));
});

//BOTÓN ENCARGADO DE HACER LA CONSULTA AL API, Y TRAER TODOS EL PRODUCTO QUE COINCIDA CON EL ID CONSULTADO.
//LAS IDS VAN DESDE EL 1 AL 20.
botonConsultaApi.addEventListener('click', (evento) => {
    evento.preventDefault();
    const id = buscarCode.value;
    fetch(`https://fakestoreapi.com/products/${id}`)
        .then(response => response.json())
        .then(data => {
            const id = data.id;
            const description = data.title;
            const price = data.price;
            numero.value = id;
            producto.value = description;
            cantidad.value = 1;
            valor.value = Math.round(price);
            const productoEncontrado = buscarProducto(id);
            if (productoEncontrado) {
                alert('PRODUCTO NO ENCONTRADO EN EL API, PERO SI LOCAL');
                numero.value = productoEncontrado.identificador;
                producto.value = productoEncontrado.producto;
                cantidad.value = productoEncontrado.cantidad;
                valor.value = productoEncontrado.valor;
            } else {
                alert('PRODUCTO ENCONTRADO EN EL API!');
                inventarios.push(new Inventario(id, description, +Math.floor(Math.random() * 10) + 1, +price));
            }
        }
        )
        .catch(error => {
            console.log('Error:', error);
            alert('PRODUCTO NO ENCONTRADO EN EL API!');
        });


});
//BOTÓN ENCARGADO DE HACER LA CONSULTA AL API, Y TRAER TODOS LOS PRODUCTOS QUE ESTÉ EN ELLA.
botonListarApi.addEventListener('click', (evento) => {
    evento.preventDefault();
    const id = buscarCode.value;
    fetch('https://fakestoreapi.com/products/')
        .then(response => response.json())
        .then(data => {
            data.forEach(product => {
                const id = product.id;
                const description = product.title;
                const price = Math.round(product.price);
                const cantidad = Math.floor(Math.random() * 10) + 1;
                const productoEncontrado = buscarProducto(id);
                if (productoEncontrado) {

                } else {
                    inventarios.push(new Inventario(id, description, +cantidad, +price));
                }
            }
            );
            localStorage.setItem('inventarios', JSON.stringify(inventarios));

            //SI ENCUENTRA, CREAMOS ESTE DIV.
            const container = document.createElement("div");
            //LE ASIGNAMOS CLASES AL DIV.
            container.setAttribute("class", "alert alert-info alert-dismissible fade show animate__animated animate__tada");
            //LE DAMOS EL ATRIBUTO ROL PARA QUE FUNCIONE EL HECHO QUE SEAN ALERTAS.
            container.setAttribute("role", "alert1");
            //AGREGAMOS NUESTRO BOTON PARA CERRAR LAS ALERTAS
            container.innerHTML = '<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>';
            const body = document.querySelector("body");
            body.className = 'divFondo';
            //CICLO FOR QUE RECORRE MI ARRAY INVENTARIOS
            for (const Index of inventarios) {
                const list = document.createElement("ul");
                list.setAttribute("class", "");
                //CICLO FOR QUE RECORRE LOS INDEXES DE MI ARRAY INVENTARIOS
                for (var key in Index) {
                    const liElement = document.createElement("li");
                    //MOSTRAMOS EN UN LI, DENTRO DE UN UL CREADO ANTERIORMENTE LOS DATOS DE LOS PRODUCTOS INGRESADOS.
                    liElement.innerHTML = `<b>${key.toUpperCase()}</b>: ${Index[key]}`;
                    //UNIMOS LOS LI AL UL
                    list.appendChild(liElement);
                }
                //UNIMOS EL UL AL DIV
                container.appendChild(list);
            }
            //UNIMOS EL DIV AL BODY
            body.appendChild(container);
            //RESCATAMOS EL ID DE MIS MENSAJES
            var p = document.getElementById("productos");
            var c = document.getElementById("prod");
            //LES CAMBIAMOS EL DISPLAY A BLOCK, PARA QUE SE MUESTREN AL APRETAR EL BOTON LISTAR
            p.style.display = "block";
            c.style.display = "block";
        })
        .catch(error => {
            console.log('Error:', error);
        });
});

//BOTÓM ELIMINAR TODO
botonEliminarTodo.addEventListener('click', (evento) => {
    confirm('ESTAS SEGURO DE ELIMINAR TODO?');
    evento.preventDefault();
    inventarios = [];
    localStorage.setItem('inventarios', JSON.stringify(inventarios));
    alert('INVENTARIO ELIMINADO CON ÉXITO!');
    location.reload();
});


//INTENTO DE LOADER, PERO CREO QUE COMO CARGA DE MANERA LOCAL, NO SE ALCANZA A VER JSJS
document.onreadystatechange = function() {

    if (document.readyState !== "complete") {
        document.querySelector(
        "body").style.visibility = "hidden";
        document.querySelector(
        "#loader").style.visibility = "visible";
    } else {
        document.querySelector(
        "#loader").style.display = "none";
        document.querySelector(
        "body").style.visibility = "visible";
    }
};