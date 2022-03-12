import mongoose from "mongoose"
import config from "../utils/config.js"

const URL = config.mongodb.URL;

await mongoose.connect(URL);

class ContenedorMongoDB{
    constructor(nombreColeccion, esquema){
        this.coleccion = mongoose.model(nombreColeccion, esquema)
    }
    async listaAll(){
        try {
            const docs = await this.coleccion.find({})
            return docs
        } catch (error) {
            this.console.log(error);
            return {
                code: "001",
                msg: "error al consumir ListaAll()"
            }
        }
    }
};

export default ContenedorMongoDB;

//console.log(config.mongodb.URL);

/*const objetoContenedor = new ContenedorMongoDB(
    `productos`, 
    {
        name: {type: String, require:true},
        description: {type: String, require:true},
        price: {type: Number, require:true}
    }
)

const objetoContenedorUsuarios = new ContenedorMongoDB(
    `usuarios`, 
    {
        name: {type: String, require:true},
        tagname: {type: String, require:true},
    }
)

console.log(await objetoContenedor.listaAll());
console.log(await objetoContenedorUsuarios.listaAll());*/
