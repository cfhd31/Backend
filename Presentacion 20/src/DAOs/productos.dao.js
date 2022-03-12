import ContenedorMongoDB from "../containers/ContenedorMongoDB.js"

class ProductosDAO extends ContenedorMongoDB{
    constructor(){
        super(`productos`, 
            {
                name: {type: String, require:true},
                description: {type: String, require:true},
                price: {type: Number, require:true}
            }   
        )
    }
}
export default ProductosDAO;

/*const objPrd = new ProductosDAO();
console.log(await objPrd.listaAll());*/



/*
const objetoContenedor = new ContenedorMongoDB(
    `productos`, 
    {
        name: {type: String, require:true},
        description: {type: String, require:true},
        price: {type: Number, require:true}
    }
)


console.log(await objetoContenedor.listaAll());*/