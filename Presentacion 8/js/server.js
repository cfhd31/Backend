/* ----------------------- Modulos ----------------------*/
const express = require('express');
const morgan = require('morgan');

const bodyParser = require('body-parser');
const routerProductos = require('./rutas/productos.rutas');


/* ---------------- Instancia de express ----------------*/
const app = express();


/* -------------------- Middlewares ------------------- */
app.use(express.static('public'));
app.use(morgan('tiny'));
routerProductos.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));


/* ----------------------- Rutas ----------------------*/
app.use('/api/productos', routerProductos);

app.get('/', function(req,res){
    res.sendFile(__dirname + 'index.html')
})


/* --------------------- Servidor ----------------------*/
const PORT = 8080;
const server = app.listen(PORT, ()=>{
    console.log(`Servidor escuchando en puerto ${PORT}`);
})
server.on('error', error=>{
    console.error(`Error en el servidor ${error}`);
})