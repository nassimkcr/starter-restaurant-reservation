import { useState } from "react";
import { listReservations } from "../utils/api";
import ViewReservation from "./reservations/ViewReservation";


function Search(){
const [reservations, setReservations] = useState([]);
const [mobileNumber, setMobileNumber] = useState('');
const [searched, setSearched] = useState(false);
const abortController = new AbortController();


const handleChange = ({target})=>{
    setMobileNumber(target.value)
}  

async function handleFind(event){
event.preventDefault()
const mobile_number = mobileNumber
let response = await listReservations({ mobile_number }, abortController.signal)
setReservations(response)
setSearched(true)
    }

    return <div>
        <label htmlFor="mobile_number">Enter mobile number</label>
        <input name="mobile_number" placeholder="Enter a customer's phone number" onChange={handleChange} value={mobileNumber}></input>
        <button type="submit" className="btn btn-primary mx-2" onClick={handleFind}>Find</button>

        <div>
            {searched? <div>
            {reservations.length? reservations.map((reservation, index)=>{
    return <ViewReservation reservation={reservation} key={index}/>
   }):<h1>No reservations found</h1>
       }
       
       
      </div>:null}
       
        </div>
        
    </div>
}


export default Search