const knex = require('../db/connection')


async function listByName(){
    return knex('tables').select('*').orderBy("table_name")
}

async function read(table_id){
    return knex('tables').select('*').where({table_id}).first()
}

async function create(table){
    return knex("tables").insert(table).returning("*").then((createdRecords)=>createdRecords[0])
}

async function update(table_id, reservation_id){
    return knex('tables').select('*').where({table_id}).update({reservation_id})
}


module.exports={listByName, read, create, update}
