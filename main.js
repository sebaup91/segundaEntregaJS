// verifico si el usuario es mayor de edad, de lo contrario no podra ingresar
const saludar = () => {

    alert('BIENVENIDO A BARTENDER WORLD !!')
    let nombre = prompt ('INGRESE SU NOMBRE').toUpperCase();
    let edad = Number(prompt('INGRESE SU EDAD'));
    
    if (edad >= 18) {
        alert('BIENVENIDO '+nombre+' PODES INGRESAR')
    } else{
        alert('LO SIENTO, SOS MENOR DE EDAD')
    }
};

saludar();

// array vacio para el carrito
const carrito = [];

// ordeno los producos de menor a mayor precio
const ordenarMenorMayor = () => {
    productos.sort((a, b) => a.precio - b.precio);
    ListaOrdenada()
};
// ordeno los productos de mayor a menor precio
const ordenarMayorMenor = () => {
    productos.sort((a, b) => b.precio - a.precio);
    ListaOrdenada()
};
// funcion para mostrar la lista ordenada 
const ListaOrdenada = () => {
    const listaOrdenada = productos.map(producto => {
        return "- "+producto.nombre+" $"+producto.precio
    });
    alert("TODOS LOS PRODUCTOS:"+"\n\n"+listaOrdenada.join("\n"))
    comprarProductos(listaOrdenada)
};

// compra de productos
const comprarProductos = (listaDeProductos) => {
    let otroProducto = false;
    let productoNombre = "";
    let productoCantidad = 0;

    do {
        productoNombre = prompt("¿QUE PRODUCTO QUERES COMPRAR?"+"\n\n"+listaDeProductos.join("\n"));
        productoCantidad = parseInt(prompt("¿CUANTOS QUERES?"));
        
        const producto = productos.find(producto => producto.nombre.toUpperCase() === productoNombre.toUpperCase())
        
        if (producto) {
            agregarAlCarrito(producto, producto.id, productoCantidad)
        } else {
            alert("EL PRODUCTO NO ESTA EN EL LISTADO")
        }

        otroProducto = confirm("¿DESEA ALGO MAS?")
    } while (otroProducto);

    confirmarCompra()
};

// funcion para agregar los productos al carrito: Linea "2" del codigo JS
function agregarAlCarrito(producto, productoId, productoCantidad) {
    const productoRepetido = carrito.find(producto => producto.id === productoId);
    if (productoRepetido) {
        productoRepetido.cantidad += productoCantidad
    } else {
        producto.cantidad += productoCantidad
        carrito.push(producto)
    }
};

/* funcion para eliminar 1 a 1 los productos que el usuario pida y mostrarle como quedo el carrito si es que elimino algun producto*/

const eliminarProductoCarrito =(productoNombre) => {
    carrito.forEach((producto, index) => {
        if (producto.nombre.toUpperCase() === productoNombre) {
            if (producto.cantidad > 1){
                producto.cantidad--;
            } else{
                carrito.splice(index, 1);
            }
        }
    })
    confirmarCompra()
};


// confirmar compra o eliminar productos de la lista
function confirmarCompra () {
    const listaProductos = carrito.map(producto => {
        return "- "+producto.nombre+" | CANTIDAD: "+producto.cantidad
    });

    const confirmar = confirm("TOTAL COMPRA: "
        +"\n\n"+listaProductos.join("\n")
        +"\n\nPRESIONE ACEPTAR PARA CONTINUAR, DE LO CONTRARIO PRESIONE CANCELAR PARA ELIMINAR SU COMPRA"
    );

    if (confirmar) {
        finalizarCompra(listaProductos)
    } else {
        const productoAEliminar = prompt("¿QUE PRODUCTO QUIERE ELIMINAR?").toUpperCase();
        eliminarProductoCarrito(productoAEliminar)
    }
};

// muestra del listado que el usuario eligio como su compra
const finalizarCompra = (listaProductos) => {
    const cantidadTotal = carrito.reduce((acc, item) => acc + item.cantidad, 0)
    const precioFinal = carrito.reduce((acc, item) => acc + (item.precio * item.cantidad), 0)
    alert('DETALLE DE LA COMPRA:'
        +'\n\n'+listaProductos.join('\n')
        +'\n\nTOTAL DE PRODUCTOS: '+cantidadTotal
        +'\n\nPRECIO TOTAL: '+precioFinal
        +'\n\nGRACIAS POR SU COMPRA !!'
    )
};

const comprar = () => {
    const productosBaratos = confirm('¿QUERES ORDENAR LA LISTA DE MENOR A MAYOR SEGUN SU PRECIO?');

    if (productosBaratos) {
        ordenarMenorMayor();
    } else {
        ordenarMayorMenor();
    }
};



comprar()