/* ---------------------- Modulos ----------------------*/
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
/* ---------------------- Instancia de express ----------------------*/
const app = express();

/* ---------------------- Middlewares ---------------------- */
app.use(express.static('public'));
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true }));

/* ---------------------- Montor de plantillas ---------------------- */
app.set('views', path.join('views'));
app.set('view engine', '');

/* ---------------------- Rutas ----------------------*/
app.get('/ejemplo', (req, res)=>{
    const mensaje = 'Desde el Backend';
    res.render('inicio.pug', {mensaje});
});

/* ---------------------- Servidor ----------------------*/
const PORT = 7272;
const server = app.listen(PORT, ()=>{
    console.log(`Servidor escuchando en puerto ${PORT}`);
})
server.on('error', error=>{
    console.error(`Error en el servidor ${error}`);
});

/*
    npm init -y 
    npm install express body-parser express-handlebars
        "dev": "nodemon server.js"

*/