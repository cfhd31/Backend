const { options } = require('./options');
const Modelo = require('./modelo');

const modeloArticulos = new Modelo(options);

const articulos = [
    { nombre: 'Rattlesnake', precio: 4500, stock: 5, codigo: '000005', descripcion: "es una nave de rapida y versatil, perfecta para las fratas y naves capitales", stock: 24, foto:"https://wiki.eveuniversity.org/images/thumb/0/0f/Rattlesnake.jpg/256px-Rattlesnake.jpg" },
    { nombre: 'Nestor', precio: 14500, stock: 5, codigo: '000006', descripcion: "es una nave de rapida y versatil, perfecta para las fratas y naves capitales", stock: 24, foto:"https://wiki.eveuniversity.org/images/thumb/7/70/Nestor.jpg/256px-Nestor.jpg" },
    { nombre: 'Barghest', precio: 13500, stock: 5, codigo: '000007', descripcion: "es una nave de rapida y versatil, perfecta para las fratas y naves capitales", stock: 24, foto:"https://wiki.eveuniversity.org/images/thumb/b/bb/Barghest.jpg/256px-Barghest.jpg" },
    { nombre: 'Bhaalgorn', precio: 5500, stock: 5, codigo: '000002', descripcion: "es una nave de rapida y versatil, perfecta para las fratas y naves capitales", stock: 24, foto:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT4bZCY14dFsmAqveSLT01BsxDEH_goNg_ZNIwxtAx0F7Uc1sIRmdShyKZDT00a_zhVyhc&usqp=CAU" },
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
    // .then(()=>{
    //     console.log("4) articulos eliminados");

    //     return modeloArticulos.actualizar({id: 2}, {stock: 0});
    // })
    .then(()=>{
        console.log("5) Actualizar el stock a 0 del articulo con id = 2");

        return modeloArticulos.listar();
    })
    .then((respuesta)=>{
        console.log("6) articulos seleccionados");
        console.table(respuesta);
    })
    .finally(()=>{
        modeloArticulos.cerrarConexion();
    })

