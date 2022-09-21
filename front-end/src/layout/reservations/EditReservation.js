import { useEffect, useState } from "react"
import { readReservation, updateReservation } from "../../utils/api"
import { useParams, useHistory } from "react-router-dom";
import formatReservationDate from "../../utils/format-reservation-date";
import ReservationForm from "./ReservationForm";
import ErrorAlert from "../ErrorAlert"



function EditReservation(){

 const [formData, setFormData] = useState({first_name:'', last_name:'', mobile_number:'', reservation_date:'', reservation_time:'', people:1});
 const[reservationError, SetReservationError]=useState(null)

const { reservation_id } = useParams();
const history = useHistory()
 
useEffect(()=>{
    const abortController = new AbortController();

    async function loadReservation(){
        const response = await readReservation(reservation_id, abortController.signal)
        formatReservationDate(response)
        setFormData(response)
        
        
    }
    loadReservation()
    return () => abortController.abort();

},[])



async function update(reservation){
    const abortController = new AbortController();
    try{
         await updateReservation(reservation)
        history.push(`/dashboard?date=${reservation.reservation_date}`)

    }
    catch(err){
        SetReservationError(err)
    }
    finally{
        return () => abortController.abort()
    }
}


return (
    <main>
        <ErrorAlert error={reservationError}/>
        <ReservationForm handleFormSubmission={update} formData={formData} setFormData={setFormData}/>
    </main>
)



}


export default EditReservation