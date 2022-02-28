const knexLib = require('knex');

class Modelo {

    constructor(options){
        this.knex = knexLib(options);
    }


    crearTabla(){
        return this.knex.schema.dropTableIfExists('articulos')
            .finally(()=>{
                return this.knex.schema.createTable('articulos', table=>{
                    table.increments('id').primary();
                    table.string('nombre', 50).notNullable();
                    table.float('precio').notNullable();
                    table.integer('stock').notNullable();
                    table.float('codigo', 10).notNullable();
                    table.float('descripcion', 220);
                    table.string('foto');
                })       
            })
    }

    insertar(articulos){
        return this.knex('articulos').insert(articulos);
    }

    listar() {
        return this.knex.from('articulos').select('*');
    }

    eliminar(id) {
        return this.knex.from('articulos').where('id', id).del();
    }

    actualizar(condicion , parametros) {
        return this.knex.from('articulos').where(condicion).update(parametros);
    }

    cerrarConexion() {
        this.knex.destroy();
    }
}

module.exports = Modelo;
