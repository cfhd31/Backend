const { options } = require (`./options`);
const knex = require(`knex`)(options);

//knex.from(`autos`).select(`id`,`marca`,`modelo`) tmb puede ser asi
knex.from(`autos`).select(`*`).where(`marca`, `=`, `audi`).orderBy(`id`, `desc`)
    .then((rows)=>{
        for (const row of rows) {
            console.log(`${row[`1`]}, ${row[`marca`]}, ${row[`modelo`]}`);
        }
        console.log(rows);
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