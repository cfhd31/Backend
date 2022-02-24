///PRODUCTOS
async function detalle(value) {
  console.log(`hola`);
  await fetch(`/api/productos/${value}`, { method: "GET" })

    .then(function (response) {
      if (response.ok) {
        console.log("Detalle Producto");
        window.location.href = `/api/productos/${value}`;
      }
      throw new Error("Request failed.");
    })
    .catch(function (error) {
      console.log(error);
    });
}

async function deleting(value) {
  await fetch(`/api/productos/${value}`, {
    method: "DELETE",
  })
    .then(function (response) {
      if (response.ok) {
        console.log("Producto Eliminado");
        window.location.href = "/api/productos";
      }
    })
    .catch(function (error) {
      console.log(error);
    });
}
async function edit(value) {
  await fetch(`/api/productos/edit/${value}`, {
    method: "GET",
  })
    .then(function (response) {
      if (response.ok) {
        window.location.href = `/api/productos/edit/${value}`;
      }
    })
    .catch(function (error) {
      console.log(error);
    });
}

async function actualizar(value) {
  let nombreProducto = document.getElementById("nombreProducto").value;
  let descripcion = document.getElementById("descripcion").value;
  let fotoProducto = document.getElementById("fotoProducto").value;
  let codigo = document.getElementById("codigo").value;
  let precioProducto = document.getElementById("precioProducto").value;
  let stock = document.getElementById("stock").value;

  const data = fetch(`/api/productos/${value}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" }, // tells the server we have json
    body: JSON.stringify({
      nombreProducto,
      descripcion,
      fotoProducto,
      codigo,
      precioProducto,
      stock,
    }),
  })
    .then((res) => console.log(res))
    .catch((error) => {
      console.log(error);
    });
}

///CARRITO

async function agregar(idProducto) {
  console.log(idProducto);
  if (localStorage.getItem("NumeroCarrito")) {
      const idCart = window.localStorage.getItem("NumeroCarrito");
      await fetch(`/api/carrito/${idCart}/productos/${idProducto}`, {
        method: "POST",
      });
      console.log("carrito existente");
  } else {
      await fetch(`/api/carrito/`, { method: "POST" })
        .then((response) => {
          return response.json();
        })

        .then(async (data) => {
          if (data.estado == true) {
            window.localStorage.setItem("NumeroCarrito", data.id);
            await fetch(`/api/carrito/${data.id}/productos/${idProducto}`, {
              method: "POST",
            });
          }
          console.log("error");
        });
  }
}


function cart() {
  let idCart = 0;
  localStorage.getItem("NumeroCarrito")
    ? (idCart = window.localStorage.getItem("NumeroCarrito"))
    : (idCart = 0);
  console.log(idCart);
  window.location.href = `/api/carrito/${idCart}/productos`;
}

async function deleteItemCart(idProducto, idCarrito) {

  await fetch(`/api/carrito/${idCarrito}/productos/${idProducto}`,
   {method: "DELETE",
  })

    .then(function (response) {
      if (response.ok) {
        console.log("Producto Eliminado");
        window.location.href = `/api/carrito/${idCarrito}/productos`;
      }
    })
    .catch(function (error) {
      console.log(error);
    });
}

async function borrarCarrito(idCarrito) {

  await fetch(`/api/carrito/${idCarrito}`, {
    method: "DELETE",
  })
    .then(function (response) {
      if (response.ok) {
        console.log("Carrito Eliminado");
        window.location.href = `/api/carrito/${idCarrito}/productos`;
      }
    })
    .catch(function (error) {
      console.log(error);
    });
}