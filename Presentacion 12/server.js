/* ---------------------- Modulos ----------------------*/
const express = require("express");
const { Server: HttpServer } = require("http");
const { Server: IOServer } = require("socket.io");
const fs = require("fs");

/* ------------------ Instancia de express ----------------------*/
const app = express();
const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);

/* ---------------------- Middlewares ---------------------- */

const bodyParser = require("body-parser");
const hbs = require("express-handlebars");
const path = require("path");

app.use(express.static("public"));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

/* ---------------------- Conf Motor ----------------------*/
app.set('view engine', 'hbs');
 
app.set("views", __dirname + "/public/views"); 

app.engine( 'hbs', hbs.engine( { 
  extname: 'hbs', 
  defaultLayout: 'main', 
  layoutsDir: __dirname + '/views/layouts/',
  partialsDir: __dirname + '/views/partials/'
} ) );

/* ---------------------- Websocket ---------------------- */
const productos = [];

io.on("connection", (socket) => {
  console.log(`Nuevo cliente conectado! >${socket.id}`);

  socket.emit("productos", productos);
  socket.on("productoAgregado", (data) => {
    productos.push(data);
    io.sockets.emit("productos", productos);
  });
});

/* ---------------------- Websocket ---------------------- */
const mensajes = [];

io.on("connection", (socket) => {
  socket.emit("mensajes", mensajes);
  socket.on("mensajeNuevo", (data) => {
    mensajes.push(data);
    io.sockets.emit("mensajes", mensajes);
  });
});


/* ---------------------- Servidor ----------------------*/
const PORT = 8080;
const server = httpServer.listen(PORT, () => {
  console.log(`Servidor escuchando en puerto ${PORT}`);
});
server.on("error", (error) => {
  console.error(`Error en el servidor ${error}`);
});