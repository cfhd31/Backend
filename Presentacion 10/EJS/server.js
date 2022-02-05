/* ----------------------- Modulos ----------------------*/
const express = require('express');
const productos = []

/* ---------------- Instancia de express ----------------*/
const app = express()

/* -------------------- Middlewares ------------------- */
app.use(express.urlencoded({ extended: true }))
app.set('views', './views');
app.set('view engine', 'ejs');

/* --------------------- Rutas ------------------------*/
app.get('/', (req, res) => {
    res.render('index', { productos });
});

app.get('/lista', (req, res) => {
    res.render('lista', { productos });
});

app.post('/productos', (req, res) => {
    productos.push(req.body)
    res.redirect('/')
});

/* ------------------- Servidor -----------------------*/
const PORT = 8080
const server = app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${server.address().port}`)
})
server.on('error', error => console.log(`Error en servidor ${error}`))