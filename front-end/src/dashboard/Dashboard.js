import React, { useEffect, useState } from "react";
import { listReservations, listTables } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";
import useQuery from "../utils/useQuery";
import ViewReservation from "../layout/reservations/ViewReservation";
import { today } from "../utils/date-time";
/**
 * Defines the dashboard page.
 * @param date
 *  the date for which the user wants to view reservations.
 * @returns {JSX.Element}
 */
function Dashboard({ date }) {
  const [reservations, setReservations] = useState([]);
  const [reservationsError, setReservationsError] = useState(null);
  const[tables, setTables]= useState([])
  const todayDate = today()
  const query = useQuery();
  let firstRender = 0
  date = query.get("date")
  
  if(!date){
    date = todayDate
  }

    
  useEffect(()=>{
    const abortController = new AbortController();

    async function loadDashboard() {
      setReservationsError(null);
      
        let response = await listReservations({ date }, abortController.signal)
        setReservations(response)
        response= await listTables(abortController.signal)
        setTables(response)
        firstRender=1
    }
    loadDashboard()
    return () => abortController.abort();

  },[date]);


if(!reservations.length && firstRender){
  return(
    <main>
      <h1>Dashboard</h1>
      <div className="d-md-flex mb-3">
        <h4 className="mb-0">Reservations for date: {date}</h4>
      </div>
    <h2>No Reservations For Today</h2>
    </main>
  )
}
  

  return (
    <main>
      <h1>Dashboard</h1>
      <div className="d-md-flex mb-3">
        <h4 className="mb-0">Reservations for date: {date}</h4>
      </div>
      <ErrorAlert error={reservationsError} />
      <div>
       {reservations.map((reservation, index)=>{
        return <ViewReservation reservation={reservation} key={index}/>
       })}
      </div>
      <div className="d-md-flex mb-3">
        <h4 className="mb-0">Tables for date: {date}</h4>
      </div>
      <ErrorAlert error={reservationsError} />
      <div>
        {tables.map((table, index)=>{
          return <div key={index}><p>Table name: {table.table_name}</p>
                      <p>Table capacity: {table.capacity}</p>
                      <p data-table-id-status={table.table_id}>Status: {table.reservation_id?'Occupied':'Free'}</p>
                      <hr></hr>
            
            </div>})
        }
      </div>
    </main>
  );
}

export default Dashboard;
