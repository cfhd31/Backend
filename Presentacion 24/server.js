import express from "express";













/* ---------------------- Servidor ----------------------*/
const PORT = process.env.PORT || 8080;
const server = httpServer.listen(PORT, () => {
  console.log(`Servidor escuchando en puerto ${PORT}`);
});

server.on("error", (error) => {
  console.error(`Error en el servidor ${error}`);
});