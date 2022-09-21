import React, { useEffect, useState } from "react";
import { listReservations, listTables, finishReservation} from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";
import useQuery from "../utils/useQuery";
import ViewReservation from "../layout/reservations/ViewReservation";
import { today, previous, next } from "../utils/date-time";
import "./Dashboard.css"
import { useHistory } from "react-router";

/**
 * Defines the dashboard page.
 * @param date
 *  the date for which the user wants to view reservations.
 * @returns {JSX.Element}
 */
function Dashboard({ date }) {
  const [reservations, setReservations] = useState([]);
  const [reservationError, SetReservationError] = useState(null)
  const[tables, setTables]= useState([]);
  const todayDate = today()
  const query = useQuery();
  const history = useHistory()
  date = query.get("date")
  
  if(!date){
    date = todayDate
  }

    
  useEffect(()=>{
    const abortController = new AbortController();


    async function loadDashboard() {
      
        let response = await listReservations({ date }, abortController.signal)
        setReservations(response)
        response= await listTables(abortController.signal)
        setTables(response)

    }
    loadDashboard()

    return () => abortController.abort();

  },[date]);



function previousDay(date) {
  const previousDate = previous(date)
  history.push(`/dashboard?date=${previousDate}`)
}

function nextDay(date) {
  const nextDate = next(date);
  history.push(`/dashboard?date=${nextDate}`)
}


async function deleteReservation(table_id, reservation_id){
  if (window.confirm('Is this table ready to seat new guests? This cannot be undone.')) {
    
      await finishReservation(table_id, reservation_id)
      window.location.reload(false)
    
    
  }

}
  
  return (
    <main>
      <h1>Dashboard</h1>
      <div className="row my-4 d-flex justify-content-center">
        <button className="btn btn-primary col-2 mx-3" onClick={ () => previousDay(date)}>Previous Day</button>
        <button className="btn btn-primary col-2 mx-3" onClick={ () => history.push(`/dashboard?date=${today()}`)}>Today</button>
        <button className="btn btn-primary col-2 mx-3" onClick={() => nextDay(date)}>Next Day</button>
      </div>   
     
      <div className="d-md-flex mb-3 date-title">
        <h4 className="mb-0">Reservations for date: {date}</h4>
      </div>
     
      <div className="reservation-box">
       {reservations[0]?reservations.map((reservation, index)=>{
        return reservation.status === "cancelled"?null:<ViewReservation reservation={reservation} key={reservation.reservation_id}/>
       }):<h2>No Reservations Found</h2>}
      </div>
   
     <div> <ErrorAlert error={reservationError}/> </div>
      
      <div className="table-responsive">
          <div className="d-md-flex mb-3">
            <h4 className="mb-0 date-title">Tables for date: {date}</h4>
          </div>
            <table className="table">
                <thead className="thead-dark">
                    <tr>
                        <th>Table Name</th>
                        <th>Capacity</th>
                        <th>Occupied?</th>
                        <th>Finished?</th>
                    </tr>
                </thead>
                <tbody>
                    {tables.map((table, index) => {
                    const {table_id, table_name, capacity, reservation_id} = table
                    return (
                        <tr key={table_id}>
                            <td>
                                <p>{table_name}</p>
                            </td>
                            <td>
                                <p>{capacity}</p>
                            </td>
                            <td>
                                <p data-table-id-status={table.table_id}>{reservation_id ? "Occupied" : "Free"}</p>
                            </td>
                            {reservation_id ? 
                                <td>
                                    <button data-table-id-finish={table.table_id} onClick={() => deleteReservation(table_id, reservation_id)} className="btn btn-danger">Finish</button>
                                </td>
                                : <td></td>
                            }
                        </tr>
                    )
                    })}
                </tbody>
            </table>
      </div>
    </main>
  );
}

export default Dashboard;
