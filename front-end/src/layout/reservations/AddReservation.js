import React, {useState} from "react";
import { Link, useHistory } from "react-router-dom";
import { createReservation } from "../../utils/api";
import ReservationForm from "./ReservationForm";
import ErrorAlert from "../ErrorAlert"

function AddReservation(){

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
        <div>
            <ReservationForm create={create}/>
            <ErrorAlert error={reservationError}/>
        </div>
    )

}

export default AddReservation