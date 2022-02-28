const { options } = require (`./options`);
const knex = require(`knex`)(options);

knex.from(`autos`).where(`marca`,`audi`).del()
    .then(()=>{
        console.log("Registro Eliminado");
    })
    .catch((error)=>{
        console.error(
            {
                codigo: `${error.errno}|${error.code}`,
                msg: error.sqlMessage,
            }
        );
    })
    .finally(()=>{
        knex.destroy();
    })