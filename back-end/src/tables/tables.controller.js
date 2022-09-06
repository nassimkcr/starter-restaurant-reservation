const tablesService = require('./tables.service')
const asyncErrorBoundary = require('../errors/asyncErrorBoundary');
const reservationsService = require('../reservations/reservations.service')
const hasProperties = require('../errors/hasProperties')




const hasRequiredProperties = hasProperties("table_name", "capacity")



function hasValidPropreties(req, res, next){
const {data: {table_name, capacity}={}}= req.body
if(table_name.length < 2){
    next({ status: 400, message: `table_name: at least two chars.` });
}
if(typeof capacity !== "number"){
  next({ status: 400, message: `capacity: its not a number` });
}

if(capacity < 1){
    next({ status: 400, message: `table_capacity: at least one person per table` });
}


next()

}

async function list(req, res, next){
  const data = await tablesService.listByName()
  res.json({
    data
  });
}

async function create(req, res, next){
    const data = await tablesService.create(req.body.data)
    res.status(201).json({data})
  }



  async function validateSeating(req, res, next){ 
  const { data = {} } = req.body;
  const {reservation_id} = data
  if(Object.keys(data).length === 0){
    
    return next({ status: 400, message: `reservation_id is missing` });
  }

  const reservation = await reservationsService.read(reservation_id)
  const table = await tablesService.read(req.params.table_id)
  
  if(reservation){
    if(table.reservation_id){
      next({ status: 400, message: `table is already occupied` });
    }
    if(reservation.people > table.capacity){ 
       next({ status: 400, message: `table_capacity is less than number of people on the reservation` });
  }
  next()
  }
  else{
    next({ status: 404, message: `reservation_id: ${reservation_id} does not exist` });

  }
  

}


async function update(req, res, next){
  
  const data = await tablesService.update(req.params.table_id, req.body.data.reservation_id)

  res.json({ data });

}  

/*

  exports.up = function(knex) {
    return knex.schema.createTable("tables", (table)=>{
      table.increments("table_id").primary();
      table.string("table_name");
      table.integer("capacity");
      table.integer("reservation_id").unsigned().notNullable();
      table
      .foreign("reservation_id")
      .references("reservation_id")
      .inTable("reservations")
      .onDelete("cascade");

      table.timestamps(true, true);
    })
  };
  
  exports.down = function(knex) {
      return knex.schema.dropTable("tables");
  };
  */


  module.exports={
    list,
    create: [hasRequiredProperties, hasValidPropreties, asyncErrorBoundary(create)],
    update: [validateSeating, asyncErrorBoundary(update)]
  }