


function ViewReservation({reservation, index}){
    const {reservation_id} = reservation
    return <div key={index}>
        <h4>Reservation Informations</h4>
      <p>First name: {reservation.first_name}</p> 
       <p>Last name: {reservation.last_name}</p>
       <p>Mobile number: {reservation.mobile_number}</p>
       <p>Reservation date: {reservation.reservation_date}</p>
       <p>Number of People: {reservation.people}</p>
       <p data-reservation-id-status={reservation.reservation_id}>Status: {reservation.status}</p>
       {reservation.status === "booked" ?<a href={`/reservations/${reservation_id}/seat`}>
            <button type="button">Seat</button>
       </a>: null
        
       }
       
       <hr></hr>
    </div>
}


export default ViewReservation