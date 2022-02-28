const { options } = require('./options');
const Modelo = require('./modelo');

const modeloArticulos = new Modelo(options);

const articulos = [
    { nombre: 'Leche', codigo: 'AB-12', precio: 23.60, stock: 24 },
    { nombre: 'Harina', codigo: 'CD-34', precio: 12.80, stock: 45 },
    { nombre: 'DDL', codigo: 'EF-56', precio: 32.30, stock: 16 },
    { nombre: 'Fideos', codigo: 'FG-44', precio: 42.70, stock: 34 },
    { nombre: 'Crema', codigo: 'CR-77', precio: 67.90, stock: 24 }
]

modeloArticulos.crearTabla()
    .then(()=>{
        console.log("1) tabla creada");

        return modeloArticulos.insertar(articulos);
    })
    .then(()=>{
        console.log("2) registros insertados");

        return modeloArticulos.listar();
    })
    .then((respuesta)=>{
        console.log("3) articulos seleccionados");
        console.table(respuesta);

        return modeloArticulos.eliminar(3);
    })
    .then(()=>{
        console.log("4) articulos eliminados");

        return modeloArticulos.actualizar({id: 2}, {stock: 0});
    })
    .then(()=>{
        console.log("5) Actualizar el stock a 0 del articulo con id = 2");

        return modeloArticulos.listar();
    })
    .then((respuesta)=>{
        console.log("3) articulos seleccionados");
        console.table(respuesta);
    })
    .finally(()=>{
        modeloArticulos.cerrarConexion();
    })

