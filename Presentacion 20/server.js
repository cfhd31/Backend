import express from 'express';
import ProductosDAO from './src/DAOs/productos.dao.js';

const app = express();
const productoDAO = new ProductosDAO;

app.get("/", (req, res) => {
    res.status(200).json({msg: `Ruta / accedida`})
});

app.get("/api/productos", async (req, res) => {
  res.status(200).json(await productoDAO.listaAll())
});

const PORT = 8080;
const server = app.listen(PORT, () => {
  console.log(`Servidor escuchando puerto: ${PORT}`);
});
server.on(`error`, error => console.log(`Error en servidor: ${error}`));