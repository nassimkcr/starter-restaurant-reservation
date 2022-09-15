const knex = require('../db/connection')

async function list(){
    return knex('reservations').select('*')
}

async function listByDate(reservation_date){
    return knex('reservations').select('*').where({reservation_date}).whereNot({status: 'finished'}).orderBy("reservation_time")
}

function search(mobile_number) {
    return knex("reservations")
      .whereRaw(
        "translate(mobile_number, '() -', '') like ?",
        `%${mobile_number.replace(/\D/g, "")}%`
      )
      .orderBy("reservation_date");
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

async function update(reservation_id, updatedReservation){
    return knex('reservations').select('*').where({reservation_id}).update(updatedReservation).returning("*").then((updatedRecords)=>updatedRecords[0])
}

module.exports = {list, listByDate, create, read, updateStatus, search, update}