
function viewReservation({reservation}){
    return <div>
        <h4>Reservation Informations</h4>
      <p>First name: {reservation.first_name}</p> 
       <p>Last name: {reservation.last_name}</p>
       <p>Mobile number: {reservation.mobile_number}</p>
       <p>Reservation date: {reservation.reservation_date}</p>
       <p>Number of People: {reservation.people}</p>
       <hr></hr>
    </div>
}


export default viewReservation