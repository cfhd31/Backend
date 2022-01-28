const express = require("express");
const routerProductos = express.Router();
const productos = [];


routerProductos.get("/", (req, res) => {                        // /api/productos -- Muestra todos los productos
  try {
    res.status(200).json(productos);
    res.end();
  } catch (error) {
    res.send({
      code: 400,
      failed: "Se produjo un error",
    });
  }
});


routerProductos.get("/:id", function (req, res) {               // /api/productos/:id -- Muestra el producto con ese ID
  const valueID = req.params.id;

  const index = productos.findIndex((x) => x.id === parseInt(valueID));
  if (index !== -1) {
    res.status(200).json(productos[index]);
  } else {
    res.send({
      code: 400,
      error: "No se encontro ningun producto",
    });
  }
});


routerProductos.post("/", (req, res) => {                  // /api/ptoductos -- Agrega un producto con un ID
  let productoNuevo = {
    title: req.body.title,
    price: req.body.price,
    thumbnail: req.body.thumbnail,
  };

  let id = productos.length + 1;
  let nuevoObjeto = { ...productoNuevo, id };
  productos.push(nuevoObjeto);

  res.status(200).json({ msg: "Producto Agregado!", datos: productos });
  res.end();
});


routerProductos.put("/:id", function (req, res) {               // /api/productos/:id -- Actualiza el producto según su id.
  const valueID = req.params.id;
  const index = productos.findIndex((x) => x.id === parseInt(valueID));

  let productosActualizar = {
    title: req.body.title,
    price: req.body.price,
    thumbnail: req.body.thumbnail
  };

  if (index == -1) {
    res.send({ code: 400, failed: "No se encontro ningun producto" });
  } else {
    for (let key of Object.keys(productosActualizar)) {
      productosActualizar[key]
        ? (productos[index][key] = productosActualizar[key])
        : productos[index][key];
      console.log(productosActualizar[key]);
    }
   res.send({
      code: 200,
      mensaje: "Producto Actualizado",
      data: productos[index],
    });
  }
});


routerProductos.delete("/:id", function (req, res) {                 // /api/productos/:id -- elimina el producto con ese ID
  const valueID = req.params.id;
  const index = productos.findIndex((x) => x.id === parseInt(valueID));

  if (index == -1) {
    res.send({ code: 400, failed: "No se encontro ningun producto" });
  } else {
    productos.splice(index, 1);
    res.send({ code: 200, mensaje: "Producto Eliminado" });
  }
});

module.exports = routerProductos;