import { useEffect, useState } from "react"
import { listTables, updateTable } from "../../utils/api"
import { Link, useHistory, useParams } from "react-router-dom"
import ErrorAlert from "../ErrorAlert"
function SeatReservation(){

const [tables, setTables]=useState([])
const [tableId, setTableId]= useState()
const[reservationError, SetReservationError]=useState(null)
const {reservation_id} = useParams()
const history = useHistory()

const handleChange = ({target})=>{
    console.log(target.value)
        setTableId(target.value)
    } 


useEffect(()=>{
    const abortController = new AbortController()

    async function loadTables(){
        const response= await listTables(abortController.signal)
        setTables(response)
    }
    loadTables()
    console.log(tables)
    return () => abortController.abort();
},[])

async function handleSubmit(event){
    event.preventDefault()
    try {
        await updateTable(tableId, reservation_id)
    history.push('/')
    } catch (err) {
        SetReservationError(err)

    }
    

}


    return(
        <div>
            <form>
                <div>
                <label htmlFor="table_id">
                    Choose a table for the reservation:
                </label> <br></br>
                <select name="table_id" value={tableId} onChange={handleChange}>
                    <option value=''>--Choose--</option>
                    {tables.map((table)=>{
                        return <option value={table.table_id}>{table.table_name} - {table.capacity}</option>
                    })}
                </select>
                </div>
                <Link to="/dashboard">
                  <button value="Cancel" className="btn btn-secondary">Cancel</button>
              </Link>
                  <button type="submit" className="btn btn-primary mx-2" onClick={handleSubmit}>Submit</button>
            
            </form>
            <ErrorAlert error={reservationError}/>
        </div>
        
    )
}

export default SeatReservation