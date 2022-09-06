import React, {useState} from "react";
import { Link, useHistory } from "react-router-dom";

function TableForm({create}){
const [formData, setFormData]= useState({table_name:'', capacity:''})
const history = useHistory()

const handleChange = ({target})=>{
    setFormData({...formData, [target.name]:target.value})
}



function handleSubmit(event){
    event.preventDefault()
    const num = Number(formData.capacity)
    formData.capacity = num
    
        create(formData)


}
    return(
        <div>
             <form>
                <div>
                    <label htmlFor="table_name">Table Name</label>
                    <input name="table_name" type="text" onChange={handleChange} value={formData.table_name}/>
                </div>
            <div>
                    <label htmlFor="capacity">Capacity</label>
                    <input name="capacity" type="number" onChange={handleChange} value={formData.capacity}/>
            </div>
                
                    <button value="Cancel" className="btn btn-secondary" onClick={() => history.goBack()}>Cancel</button>
                    <button type="submit" className="btn btn-primary mx-2" onClick={handleSubmit} >Submit</button>
            </form>
        </div>
       
    )
}

export default TableForm