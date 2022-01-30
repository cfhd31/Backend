const express = require('express');
const fs = require("fs");
const Contenedor = require("./index.js");


/*------------Instancia de express--------------------------*/
const app = express();

/*-----------------------------------------------*/
visitas = 0

const getProductos = () => {
    let ruta = "./archivos/productos.txt";
    try {
        Productos = fs.readFileSync(ruta, "utf-8");
        return JSON.parse(Productos);
    } catch (error) {
        return []
    }
};

const getNumAleatorio = () => {
    let Productos = getProductos();
    const numID = Productos.map(({ id }) => id);
    let aleatorio = Math.floor(Math.random() * numID.length);
    return numID[aleatorio];
};

const getProductoAleatorio = (numero) => {
    let Productos = getProductos();
    const index = Productos.findIndex((x) => x.id === numero);
    return Productos[index];
};


/*----------------------RUTAS---------------------------*/
app.get('/', (req,res) => {
    visitas++;
    res.send(`<h1 style="color:blue;">Bienvenido al INICIO del servidor Express</h1><br><h1 style="color:green;">Numero de Visitas ${visitas}</h1>`);
});

app.get("/productos", (req, res) => {
    try {
        res.write(JSON.stringify(getProductos()));
        res.end();
    } catch (error) {
        console.log("Se ha producido un error", error);
        res.send({ code: 400, failed: "Error"});
    }
});

app.get("/productoRandom", (req, res) => {
    try {
        res.json(getProductoAleatorio(getNumAleatorio()));
        res.end();
    } catch (error) {
        console.log("Se ha producido un error", error);
        res.send({ code: 400, failed: "Error"});
    }
});

app.get("/getAll", (req, res) => {
    try {
        const archivo = new Contenedor("productos");
        
        res.send(archivo.getAll());
        console.log(archivo.getAll());
        res.end();
    } catch (error) {
        console.log("Se ha producido un error", error);
        res.send({ code: 400, failed: "Error"});
    }
});

/*-----------------SERVIDOR--------------------------*/
const PORT = 8080;

const server = app.listen(PORT, () => {
    console.log(`Servidor escuchando en puerto ${server.address().port}`)
});

server.on("error", error => {
    console.log(`Error en servidor ${error}`)
});
