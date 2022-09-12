const knex = require('../db/connection')

async function list(){
    return knex('reservations').select('*')
}

async function listByDate(reservation_date){
    return knex('reservations').select('*').where({reservation_date}).whereNot({status: 'finished'}).orderBy("reservation_time")
}
async function create(reservation){
    return knex("reservations").insert(reservation).returning("*").then((createdRecords)=>createdRecords[0])
}

async function read(reservation_id){
    return knex('reservations').select('*').where({reservation_id}).first()
}

async function updateStatus(reservation_id, status){
    return knex('reservations').select('*').where({reservation_id}).update({status}).returning("*").then((updatedRecords)=>updatedRecords[0])
}

module.exports = {list, listByDate, create, read, updateStatus}