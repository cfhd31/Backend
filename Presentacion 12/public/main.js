const socket = io.connect();

function enviarProducto() {
  const nombre = document.querySelector("#nombreProd");
  const precio = document.querySelector("#precioProd");
  const foto = document.querySelector("#fotoProd");
  socket.emit("productoAgregado", {
    nombre: nombre.value,
    precio: precio.value,
    foto: foto.value,
  });
}

function hacerTabla(productos) {
    return fetch("./views/lista.hbs")
    .then((res) => res.text())
    .then((plantilla) => {
        const template = Handlebars.compile(plantilla);
        const html = template({ productos });
        console.log("productos",productos);
        return html;
    });
}

socket.on("productos", productos => {
    hacerTabla(productos).then(tabla => {
        document.getElementById("listas").innerHTML = tabla
    })
})

/* ---------------------- Chat ----------------------*/
function enviarMensaje() {
    const email = document.querySelector("#email");
    const mensaje = document.querySelector("#mensaje");

    const date = new Date();
    const dateStr = ("00" + (date.getMonth() + 1)).slice(-2) + "/" + ("00" + date.getDate()).slice(-2) +"/" + date.getFullYear() + " " + ("00" + date.getHours()).slice(-2) + ":" + ("00" + date.getMinutes()).slice(-2) + ":" + ("00" + date.getSeconds()).slice(-2); //https://es.acervolima.com/como-formatear-la-fecha-actual-en-formato-mm-dd-aaaa-hh-mm-ss-usando-javascript/

    socket.emit("mensajeNuevo", {
        email: email.value,
        fecha: dateStr,
        texto: mensaje.value,
 
    });
    return false;
}

socket.on("mensajes", (mensajes) => {
    let MensajeHtml = "";

    mensajes.forEach((mensaje) => {
        MensajeHtml += ` 
            <span style="color:blue;"><b>${mensaje.email}</b></span>
            <span style="color:green; font-style:italic";>${mensaje.fecha}</span> <b>: </b>
            <span style="color:black";>${mensaje.texto}</span>
            <br>
        `;
    });
    document.getElementById("contenedorMensaje").innerHTML = MensajeHtml;
})