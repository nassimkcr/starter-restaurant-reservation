import React, { useEffect, useState } from "react";
import { listReservations } from "../utils/api";
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
      const response = await listReservations({ date }, abortController.signal)
        setReservations(response)
        firstRender=1
    }
    loadDashboard()
    console.log(reservations)
    console.log(date)
    return () => abortController.abort();

  },[date]);

  console.log(reservations)
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
       {reservations.map((reservation)=>{
        return <ViewReservation reservation={reservation}/>
       })}
      </div>
    </main>
  );
}

export default Dashboard;
