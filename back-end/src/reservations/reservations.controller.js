/**
 * List handler for reservation resources
 */
const asyncErrorBoundary = require('../errors/asyncErrorBoundary')
const reservationsService = require('./reservations.service')
const hasProperties = require('../errors/hasProperties')
const hasRequiredProperties = hasProperties("first_name", "last_name", "mobile_number", "reservation_date", "reservation_time", "people")


function validateDateProperty(req, res, next){
  const {data: {reservation_date, reservation_time}={}}= req.body
  const arr = reservation_date.split('-')

  const DateString = reservation_date+'T'+reservation_time+':00'
  const reservationDate = new Date(DateString)

  const day = reservationDate.getUTCDay()

  const todayDate = new Date()
  let errorMessage = ``
  let errorExists = false
  if(arr.length < 3){
    next({ status: 400, message: `reservation_date: ${reservation_date} is not a date.` });
  }

  if(arr[0].length !== 4 || isNaN(arr[0])){
    next({ status: 400, message: `reservation_date: ${reservation_date} is not a date.` });
  }
  if(arr[1].length !== 2 || isNaN(arr[1])){
    next({ status: 400, message: `reservation_date: ${reservation_date} is not a date.` });
  }
  if(arr[2].length !== 2 || isNaN(arr[2])){
    next({ status: 400, message: `reservation_date: ${reservation_date} is not a date.` });
  }
  if(day == 2){
    errorMessage = 'closed on Tuesdays'
    errorExists=true
  }
  
  if(reservationDate < todayDate){
    if(errorExists){errorMessage += ' and '}
    errorMessage += 'only future reservations are allowed'
    errorExists=1
  }
  if(errorExists){
    next({ status: 400, message: `${errorMessage}` });
  }
     next()

}

function validateTimeProperty(req, res, next){
  const {data: {reservation_time}={}}= req.body
  const arr = reservation_time.split(':')
  if(arr.length < 2){
    next({ status: 400, message: `reservation_time: ${reservation_time} is not a time.` });
  }
  if(arr[0].length !== 2 || isNaN(arr[0])){
     next({ status: 400, message: `reservation_time: ${reservation_time} is not a time.` });
  }
  if(arr[1].length !== 2 || isNaN(arr[1])){
     next({ status: 400, message: `reservation_time: ${reservation_time} is not a time.` });
  }
  if(reservation_time < "10:30" || reservation_time>"21:30"){
    next({ status: 400, message: `reservation_time: restaurent closed` });
  }
  
     next()
}


function validatePeopleProperty(req, res, next){
  
  const {data: {people}={}}= req.body

  if(typeof people != 'number'){
    next({ status: 400, message: `people number: ${people} is not a number.` });
  }
  
     next()
  
}

function checkStatus(req, res, next){

  const {status} = res.locals.reservation
  if(req.body.data.status !== "seated" && req.body.data.status !== "finished" && req.body.data.status !== "booked" && req.body.data.status !== "cancelled"){
    next({status: 400, message: 'Reservation is unknown'})
  }
  
  
  if(status){

    if(req.body.data.status === "cancelled"){return next()}

    if(status === "seated"){
      next({status: 400, message: 'Reservation is already seated'})
    }
    if(status === "finished"){
      next({status: 400, message: 'Reservation is already finished'})
    }
   
    return next()
  }
  next()
  
}

async function reservationExists(req, res, next){
  const reservation = await reservationsService.read(req.params.reservation_id)
  if(reservation){
    res.locals.reservation = reservation
    return next()
  }
  next({status: 404, message: `Reservation: ${req.params.reservation_id} cannot be found`})
}


async function list(req, res) { 
  let {date, mobile_number} = req.query
  if(date){
    const data = await reservationsService.listByDate(date)
    return res.json({data})
  }
  
  else if(mobile_number){
    const data = await reservationsService.search(mobile_number)
    return res.json({data})

  }
  else{
    const data = await reservationsService.list()
    res.json({
      data
    });
  }
  
}

async function read(req, res, next){
const data = res.locals.reservation
res.json({data})
}


async function create(req, res, next){
  const reservation = req.body.data
  if(reservation.status === "seated"){
    next({status: 400, message: 'Reservation is already seated'})
  }
  if(reservation.status === "finished"){
    next({status: 400, message: 'Reservation is already finished'})
  }

  const data = await reservationsService.create(req.body.data)
  res.status(201).json({data})
}

async function update(req, res, next) {
  if(res.locals.reservation.status !== "booked"){   
     next({status: 400, message: 'Reservation can only be edited when status is "booked"'})
}
  const updatedReservation = {
    ...req.body.data,
    reservation_id: res.locals.reservation.reservation_id,
  };
  const data = await reservationsService.update(res.locals.reservation.reservation_id, updatedReservation);
  res.json({ data });
}



async function updateStatus(req, res, next){
  const data = await reservationsService.updateStatus(req.params.reservation_id, req.body.data.status)
  res.status(200).json({data})
}

module.exports = {
  list: asyncErrorBoundary(list),
  read:[asyncErrorBoundary(reservationExists), asyncErrorBoundary(read)],
  create: [hasRequiredProperties, validateDateProperty, validateTimeProperty, validatePeopleProperty, asyncErrorBoundary(create)],
  updateStatus: [asyncErrorBoundary(reservationExists), checkStatus, asyncErrorBoundary(updateStatus)],
  update: [asyncErrorBoundary(reservationExists), hasRequiredProperties, validateDateProperty, validateTimeProperty, validatePeopleProperty, asyncErrorBoundary(update)]
};
