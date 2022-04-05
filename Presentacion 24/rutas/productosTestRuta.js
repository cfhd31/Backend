import express from 'express';
const productosTestRuta = express.Router();
import { faker } from '@faker-js/faker'
faker.locale = 'es';

function generarObjetoRandom() {
  return {
    nombre: faker.commerce.productName(),
    precio: faker.commerce.price(),
    foto: faker.image.imageUrl(300, 300, 'commerce', true, true),
  };
}

productosTestRuta.get("/", (req, res) => {
  const productos = [];
  const cant = Number(req.query.cant) || 5;

  for (let index = 0; index < cant; index++) {
    productos.push({ id: index + 1, ...generarObjetoRandom() });
  }
  res.render("index", {productos:productos});
});

 

export default productosTestRuta;