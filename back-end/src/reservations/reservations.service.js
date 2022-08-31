const knex = require('../db/connection')

async function list(){
    return knex('reservations').select('*')
}

async function listByDate(reservation_date){
    return knex('reservations').select('*').where({reservation_date}).orderBy("reservation_time")
}
async function create(reservation){
    return knex("reservations").insert(reservation).returning("*").then((createdRecords)=>createdRecords[0])
}

module.exports = {list, listByDate, create}