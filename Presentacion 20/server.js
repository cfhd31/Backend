/* ----------------------- Modulos ----------------------*/
import express from "express";
import { routerProductos } from "./rutas/productosRutas.js";
import routerCarrito from "./rutas/carritoRutas.js";

/* ---------------- Instancia de express ----------------*/
const app = express();

import hbs from "hbs";
import bodyParser from "body-parser";
import path from "path";

/* -------------------- Middlewares ------------------- */
const __dirname = path.resolve();
app.use(express.static(__dirname + "/public"));
app.set("view engine", "hbs");
app.set("views", __dirname + "/public/views"); //Folder views (templates)
hbs.registerPartials(__dirname + "/public/views/partials", function (err) {});

app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));

/* --------------------- Rutas ------------------------*/
app.use("/api/productos", routerProductos);
app.use("/api/carrito", routerCarrito);

/* ---------------------- Servidor ----------------------*/
const PORT = process.env.PORT || 8080;
const server = app.listen(PORT, () => {
  console.log(`Servidor escuchando puerto ${PORT}`);
});
server.on(`error`, error => console.log(`Error en servidor: ${error}`));