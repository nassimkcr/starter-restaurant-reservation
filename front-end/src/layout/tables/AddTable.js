import React, {useState} from "react";
import { Link, useHistory } from "react-router-dom";
import { createTable } from "../../utils/api";
import TableForm from "./TableForm";
import ErrorAlert from "../ErrorAlert"

function AddTable(){

    const history = useHistory()

    const[reservationError, SetReservationError]=useState(null)

    async function create(table){
        const abortController = new AbortController();
        try{
             await createTable(table)
            history.push(`/`)

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
            <TableForm create={create}/>
            <ErrorAlert error={reservationError}/>
        </div>
    )

}


export default AddTable