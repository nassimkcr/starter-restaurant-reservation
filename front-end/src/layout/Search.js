import { useState } from "react";
import { listReservations } from "../utils/api";
import ViewReservation from "./reservations/ViewReservation";

/*
define the search page for the application
*/

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

    return <main>
        <div className="form-group">
            <label htmlFor="mobile_number"><h3>Search for Reservation by Mobile Number</h3></label>
            <input name="mobile_number" className="form-control form-control-lg" id="search-input" placeholder="Enter a customer's phone number" onChange={handleChange} value={mobileNumber}></input>
            <button type="submit" className="btn btn-primary mx-2" onClick={handleFind}>Find</button>
        </div>
       
        <div>
            {searched? <div>
            {reservations.length? reservations.map((reservation, index)=>{
    return <ViewReservation reservation={reservation} key={index}/>
   }):<h1>No reservations found</h1>
       }
       
       
      </div>:null}
       
        </div>
        
    </main>
}


export default Search