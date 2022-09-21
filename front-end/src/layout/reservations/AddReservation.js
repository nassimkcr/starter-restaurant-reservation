import React, {useState} from "react";
import { useHistory } from "react-router-dom";
import { createReservation } from "../../utils/api";
import ReservationForm from "./ReservationForm";
import ErrorAlert from "../ErrorAlert"

function AddReservation(){
    const [formData, setFormData] = useState({first_name:'', last_name:'', mobile_number:'', reservation_date:'', reservation_time:'', people:1})

    const history = useHistory()

    const[reservationError, SetReservationError]=useState(null)

    async function create(reservation){
        const abortController = new AbortController();
        try{
             await createReservation(reservation)
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
            <ReservationForm handleFormSubmission={create} formData={formData} setFormData={setFormData}/>
        </main>
    )

}

export default AddReservation