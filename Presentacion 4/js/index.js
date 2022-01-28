const fs = require("fs");

class Contenedor {
  constructor(nombreArchivo) {
    this.ruta = "./archivos/" + nombreArchivo + ".txt";
}

async getAll(){
    try {
        const nuevoObjeto = await fs.promises.readFile(this.ruta, "utf-8")
        return JSON.parse(nuevoObjeto)
    }catch(error){
        return []
    }
}

async save(objeto) {
    let contenido = await this.getAll();
    let id = contenido.length + 1;
    let nuevoObjeto = { ...objeto, id };
    contenido.push(nuevoObjeto);

    fs.writeFile(this.ruta, JSON.stringify(contenido, null, 2), (error) => {
        if (error) {
            throw new Error(error);
        } else {
            console.log("Se agrego un nuevo producto, ID: " + id);
        return id;
        }
    }); 
}

async getById(numero) {
    let contExistente = await this.getAll();
    let msj;
    const index = contExistente.findIndex((x) => x.id === numero);

    if (index == -1) {
        msj = "No hay valores para ese ID";
    } else {
        msj = contExistente[index];
    }
    console.log(msj);
}

async deleteById(numero) {
    let contExistente = await this.getAll();
    const index = contExistente.findIndex((x) => x.id === numero);
    console.log(index);
    
    if (index != -1) {
        contExistente.splice(index, 1);

        fs.writeFile(
            this.ruta,
            JSON.stringify(contExistente, null, 2),
            (error) => {
                if (error) {
                    throw new Error(error);
                } else {
                    console.log("Se eliminado el ID: ", numero);
                }
            }
        );
    } else {
        console.log("No existe ese ID");
    }
}

deleteAll() {
    let borrar = [];
  
    fs.writeFile(this.ruta, JSON.stringify(borrar), (error) => {
        if (error) {
            throw new Error(error);
        } else {
            console.log("Se borro todo su contenido");
        }
    });
  }
}

let archivo = new Contenedor("productos");

archivo.save({
    nave: "sacaca",
    precio: 207.688,
    url:"https://imageserver.eveonline.com/Render/33468_512.png",
});

//archivo.getById(2);
//archivo.getAll();
//archivo.deleteById(8);
//archivo.deleteAll()