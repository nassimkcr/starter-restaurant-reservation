import React, {useState} from "react";
import { useHistory } from "react-router-dom";

function TableForm({create}){
const [formData, setFormData]= useState({table_name:'', capacity:''})
const history = useHistory()

const handleChange = ({target})=>{
    setFormData({...formData, [target.name]:target.value})
}

function cancelHandler(event) {
    event.preventDefault();
    history.goBack();
}


function handleSubmit(event){
    event.preventDefault()
    const num = Number(formData.capacity)
    formData.capacity = num
    
        create(formData)


}
    return(
        
             <form id="tb-form">
                <h2>Create a new table</h2>
                <div className="form-group">
                    <label htmlFor="table_name">Table Name</label>
                    <input name="table_name" className="form-control" type="text" onChange={handleChange} value={formData.table_name}/>
                </div>
            <div className="form-group">
                    <label htmlFor="capacity">Capacity</label>
                    <input name="capacity" className="form-control" type="number" onChange={handleChange} value={formData.capacity}/>
            </div>
                
                    <button value="Cancel" className="btn btn-secondary" onClick={cancelHandler}>Cancel</button>
                    <button type="submit" className="btn btn-primary mx-2" onClick={handleSubmit} >Submit</button>
            </form>
       
    )
}

export default TableForm