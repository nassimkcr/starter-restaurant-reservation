import { useState } from "react"
import { updateReservationStatus } from "../../utils/api"
import ErrorAlert from "../ErrorAlert"
import './ViewReservation.css'


function ViewReservation({reservation, index}){
    const {reservation_id} = reservation
    const [reservationError, SetReservationError] = useState(null)


   async function handleCancel(){
  
        if (window.confirm('Do you want to cancel this reservation? This cannot be undone.')) {
          try{
            await updateReservationStatus(reservation_id,'cancelled')
            window.location.reload(false)
          }
          catch(err){
            console.log(err)
            SetReservationError(err)
          }
           
          }
    }

    
    return(
      <div className="reservation-box" key={reservation_id}>
        <h4>Reservation № {reservation_id} Informations</h4>
      <ul>
          <li>First name: <span>{reservation.first_name}</span></li> 
          <li>Last name: <span>{reservation.last_name}</span></li>
          <li>Mobile number: <span>{reservation.mobile_number}</span></li>
          <li>Reservation date: <span>{reservation.reservation_date}</span></li>
          <li>Number of People: <span>{reservation.people}</span></li>
          <li data-reservation-id-status={reservation.reservation_id}>Status: <span>{reservation.status}</span></li>
          
      </ul>  
      <div className="reservation-buttons">

      <button type="button" className="btn btn-danger" data-reservation-id-cancel={reservation.reservation_id} onClick={handleCancel}>Cancel</button>


          <a href={`/reservations/${reservation_id}/edit`}>
               <button type="button" className="btn btn-secondary">Edit</button>
          </a>
          

          {reservation.status === "booked" ?<a href={`/reservations/${reservation_id}/seat`}>
               <button type="button" className="btn btn-info">Seat</button>
          </a>: null
          
          }

      </div>
      
       <ErrorAlert error={reservationError}/> 
       
       <hr></hr>
    </div>)
}


export default ViewReservation