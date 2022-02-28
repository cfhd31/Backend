const { options } = require (`./options`);
const knex = require(`knex`)(options);

knex.from(`autos`).where(`id`, `2`).update({modelo: `modificado`})
    .then(()=>{
        console.log(`registro 2 actualizado`);
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