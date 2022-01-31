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

/* ---------------------- Motor de Plantillas ---------------------- */
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

/* ---------------------- Rutas ----------------------*/
app.get('/datos', (req, res)=>{
    const datos = {
        titulo: req.query.titulo,
        min: req.query.min,
        max: req.query.max,
        nivel: req.query.nivel
    }
    console.log(req.query)
    res.render('medidor.pug', datos);
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