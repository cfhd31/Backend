const { options } = require (`./options`);
const knex = require(`knex`)(options);

knex.schema.createTable(`autos`, table=>{
    table.increments(`id`)
    table.string(`marca`,25).notNullable();
    table.string(`modelo`, 25).notNullable();
})
.then(()=>{
    console.log(`Tabla creada!`);
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