import { useEffect, useState } from "react"
import { readReservation, updateReservation } from "../../utils/api"
import { useParams, Link, useHistory } from "react-router-dom";
import formatReservationDate from "../../utils/format-reservation-date";


function EditReservation(){

 const [formData, setFormData] = useState({first_name:'', last_name:'', mobile_number:'', reservation_date:'', reservation_time:'', people:1})
const { reservation_id } = useParams();
const history = useHistory()
 
useEffect(()=>{
    const abortController = new AbortController();

    async function loadReservation(){
        const response = await readReservation(reservation_id, abortController.signal)
        formatReservationDate(response)
        setFormData(response)
        console.log(formData)
        console.log(formData.mobile_number)
        
        
    }
    loadReservation()
    return () => abortController.abort();

},[reservation_id])

const handleChange = ({target})=>{
    setFormData({...formData, [target.name]:target.value})
}

async function handleSubmit (event){
    event.preventDefault()
    const num = Number(formData.people)
    formData.people = num
   await updateReservation(formData)
   history.push(`/dashboard?date=${formData.reservation_date}`)
   
}



return (
    <div>
        <form>
          <div>
                <label htmlFor="first_name">First name</label>
                <input name="first_name" type="text" onChange={handleChange} value={formData.first_name}></input>
          </div> 

          <div>
                <label htmlFor="last_name">Last name</label>
                <input name="last_name" type="text" onChange={handleChange} value={formData.last_name}></input>
          </div>

          <div>
                <label htmlFor="mobile_number">Mobile Number</label>
                <input name="mobile_number" type="text" onChange={handleChange} value={formData.mobile_number}></input>
          </div> 
          <div>
                <label htmlFor="reservation_date">Date of reservation</label>
                <input name="reservation_date" type="date" onChange={handleChange} value={formData.reservation_date}></input>
          </div> 
          <div>
                <label htmlFor="reservation_time">Time of reservation</label>
                <input name="reservation_time" type="time" onChange={handleChange} value={formData.reservation_time}></input>
          </div> 
          <div>
                <label htmlFor="people">Number of People</label>
                <input name="people" type="number" onChange={handleChange} value={formData.people}></input>
          </div> 
         
          <Link to="/dashboard">
              <button value="Cancel" className="btn btn-secondary">Cancel</button>
          </Link>
              <button type="submit" className="btn btn-primary mx-2" onClick={handleSubmit}>Submit</button>
        
        </form>
        
    </div>
)

}


export default EditReservation