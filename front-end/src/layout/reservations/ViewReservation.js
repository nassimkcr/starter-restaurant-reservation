import { updateReservationStatus } from "../../utils/api"



function ViewReservation({reservation, index}){
    const {reservation_id} = reservation


   async function handleCancel(){
  
        if (window.confirm('Do you want to cancel this reservation? This cannot be undone.')) {
           await updateReservationStatus(reservation_id,'cancelled')
            window.location.reload(false)
          }
    }

    
    return(
      <div key={index}>
        <h4>Reservation Informations</h4>
      <p>First name: {reservation.first_name}</p> 
       <p>Last name: {reservation.last_name}</p>
       <p>Mobile number: {reservation.mobile_number}</p>
       <p>Reservation date: {reservation.reservation_date}</p>
       <p>Number of People: {reservation.people}</p>
       <p data-reservation-id-status={reservation.reservation_id}>Status: {reservation.status}</p>
       <a href={`/reservations/${reservation_id}/edit`}>
            <button type="button">Edit</button>
       </a>
       
            <button type="button" data-reservation-id-cancel={reservation.reservation_id} onClick={handleCancel}>Cancel</button>

       {reservation.status === "booked" ?<a href={`/reservations/${reservation_id}/seat`}>
            <button type="button">Seat</button>
       </a>: null
        
       }
       
       <hr></hr>
    </div>)
}


export default ViewReservation