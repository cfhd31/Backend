import express from "express";
import path from "path";

const __dirname = path.resolve();
const apiRandomRuta = express.Router();

apiRandomRuta.get("/:cant?", async (req, res) => {
  console.log("[Parent]", "initalize");
  const cantidad = req.params.cant !== undefined ? req.params.cant : 100000000;

});

export default apiRandomRuta;