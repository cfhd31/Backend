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

const productos = []

app.set('views', './views');
app.set('view engine', 'pug');

/* ---------------------- Rutas ----------------------*/
app.get('/', (req, res) => {
    res.render('formulario.pug', {productos});
});

app.get('/lista', (req, res) => {
    res.render('lista.pug', {productos});
});

app.post('/productos', (req, res) => {
    productos.push(req.body)
    res.redirect('/')
});

/* ---------------------- Servidor ----------------------*/
const PORT = 8080
const server = app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${server.address().port}`)
})
server.on('error', error => console.log(`Error en servidor ${error}`))