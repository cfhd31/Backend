const { options } = require (`./options`);
const knex = require(`knex`)(options);

const listaAutos = [
    {marca:`bmw`, modelo:`528i`},
    {marca:`audi`, modelo:`a6`},
    {marca:`Wv`, modelo:`Golf`}
]
knex(`autos`).insert(listaAutos)
    .then(()=>{
        console.log(`Registro insertado`);
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