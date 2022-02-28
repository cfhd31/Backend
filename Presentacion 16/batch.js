const { options } = require (`./options`);
const knex = require(`knex`)(options);

const ListaAutos = [
    {marca:`bmw`, modelo:`528i`},
    {marca:`audi`, modelo:`a6`},
    {marca:`Wv`, modelo:`Golf`}
]

const batch = async ()=>{
    try {
        console.log(" 1- lista de tabla");
        await knex.from(`autos`).del();

        console.log(" 2- Instertar Registro");
        await knex(`autos`).insert(ListaAutos)

        console.log(" 3- Istertar Registro");
        let respuesta = await knex.from(`autos`).select(`*`)
        console.log(respuesta);
        
    } catch (error) {
        console.error(
            {
                codigo: `${error.errno}|${error.code}`,
                msg: error.sqlMessage
            }
        )
    } finally{
        knex.destroy();
    }
     
    
}
batch();