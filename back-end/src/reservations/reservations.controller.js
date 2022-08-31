/**
 * List handler for reservation resources
 */
const asyncErrorBoundary = require('../errors/asyncErrorBoundary')

const reservationsService = require('./reservations.service')
const hasProperties = require('../errors/hasProperties')
const hasRequiredProperties = hasProperties("first_name", "last_name", "mobile_number", "reservation_date", "reservation_time", "people")

function validateDateProperty(req, res, next){
  const {data: {reservation_date}={}}= req.body
  
  const arr = reservation_date.split('-')

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
  
  
     next()
  

}

function validatePeopleProperty(req, res, next){
  
  const {data: {people}={}}= req.body

  if(typeof people != 'number'){
    next({ status: 400, message: `people number: ${people} is not a number.` });
  }
  
     next()
  
}

async function list(req, res) { 
  let {date} = req.query
  if(date){
    const data = await reservationsService.listByDate(date)
    return res.json({data})
  }
  const data = await reservationsService.list()
  res.json({
    data
  });
}

async function reservationExists(req, res, next){
  console.log(req.query.date)
  const reservation = await reservationsService.read(req.query.date)
  console.log(reservation)
  if(reservation){
    res.locals.reservation = reservation
    return next()
  }
  next({status: 404, message: 'Reservation cannot be found'})
}


async function create(req, res, next){
  const data = await reservationsService.create(req.body.data)
  res.status(201).json({data})
}

module.exports = {
  list: asyncErrorBoundary(list),
  create: [hasRequiredProperties, validateDateProperty, validateTimeProperty, validatePeopleProperty, asyncErrorBoundary(create)]
};
