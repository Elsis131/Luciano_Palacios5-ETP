// Inicialización de contadores en localStorage
function inicializarContadores() {
    if (!localStorage.getItem('contadorRubro')) {
        localStorage.setItem('contadorRubro', '0');
    }

    if (!localStorage.getItem('contadorProducto')) {
        localStorage.setItem('contadorProducto', '0');
    }
}

// Cargar rubros en el select
function cargarRubrosEnSelect() {
    const rubros = JSON.parse(localStorage.getItem('rubros')) || [];
    const seleccRubro = document.getElementById('rubro');
    if (seleccRubro) {
        seleccRubro.innerHTML = '<option value="">Seleccionar un rubro</option>';
        rubros.forEach(rubro => {
            const opcion = document.createElement('option');
            opcion.value = rubro.id;
            opcion.textContent = rubro.nombre;
            seleccRubro.appendChild(opcion);
        });
    }
}

// Cargar productos en la tabla
function cargarProductosEnTabla() {
    const productos = JSON.parse(localStorage.getItem('productos')) || [];
    const rubros = JSON.parse(localStorage.getItem('rubros')) || [];
    const tabla = document.getElementById('tablaProductos')?.querySelector('tbody');
    
    if (tabla) {
        tabla.innerHTML = ''; 
        productos.forEach(producto => {
            const rubro = rubros.find(r => r.id === producto.rubroId);
            const fila = document.createElement('tr');
            fila.innerHTML = `
                <td>${producto.id}</td>
                <td>${producto.nombre}</td>
                <td>${producto.stock}</td>
                <td>${producto.precio}</td>
                <td>${rubro ? rubro.nombre : 'Sin rubro'}</td>
            `;
            tabla.appendChild(fila);
        });
    }
}

// Guardar un nuevo rubro
function guardarRubro(event) {
    event.preventDefault();
    const rubros = JSON.parse(localStorage.getItem('rubros')) || [];
    const nombreRubro = document.getElementById('nombreRubro').value;
    const alertaRubro = document.getElementById('alertaRubro');

    if (!nombreRubro) {
        alertaRubro.textContent = 'El nombre del rubro es obligatorio.';
        return;
    }

    let contadorRubro = parseInt(localStorage.getItem('contadorRubro'));
    const nuevoRubro = { id: contadorRubro, nombre: nombreRubro };

    rubros.push(nuevoRubro);
    localStorage.setItem('rubros', JSON.stringify(rubros));
    localStorage.setItem('contadorRubro', (contadorRubro + 1).toString()); 

    alertaRubro.textContent = 'El rubro se guardó correctamente.';
    alertaRubro.style.color = 'green';

    document.getElementById('nombreRubro').value = ''; 
    cargarRubrosEnSelect();  
}

// Guardar un nuevo producto
function guardarProducto(event) {
    event.preventDefault();
    const productos = JSON.parse(localStorage.getItem('productos')) || [];
    const nombre = document.getElementById('nombre').value;
    const stock = document.getElementById('stock').value;
    const precio = document.getElementById('precio').value;
    const rubroId = document.getElementById('rubro').value;
    const alertaProducto = document.getElementById('alertaProducto');

    if (!nombre || !stock || !precio || !rubroId) {
        alertaProducto.textContent = 'Todos los campos son obligatorios.';
        return;
    }

    let contadorProducto = parseInt(localStorage.getItem('contadorProducto'));
    const nuevoProducto = {
        id: contadorProducto,
        nombre: nombre,
        stock: parseInt(stock),
        precio: parseFloat(precio),
        rubroId: parseInt(rubroId)
    };

    productos.push(nuevoProducto);
    localStorage.setItem('productos', JSON.stringify(productos));
    localStorage.setItem('contadorProducto', (contadorProducto + 1).toString()); 

    alertaProducto.textContent = 'El producto se guardó correctamente.';
    alertaProducto.style.color = 'green';

    // Limpiar campos de entrada
    document.getElementById('nombre').value = '';
    document.getElementById('stock').value = '';
    document.getElementById('precio').value = '';
    document.getElementById('rubro').value = '';

    cargarProductosEnTabla();  
}

// Configuración inicial al cargar la página
function inicializar() {
    inicializarContadores();
    cargarRubrosEnSelect();  
    cargarProductosEnTabla(); 

    document.getElementById('form-rubro')?.addEventListener('submit', guardarRubro);
    document.getElementById('form-producto')?.addEventListener('submit', guardarProducto);
}

// Ejecutar inicialización
window.onload = inicializar;
