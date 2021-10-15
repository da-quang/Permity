import Axios from 'axios';
import React, {useState } from 'react'

function Delete() {
    const [employee, setEmployee] = useState({
        id: "",
    })

    function submit(e) {
        e.preventDefault();

        Axios.delete(`http://localhost:8090/api/Employee/delete/${employee.id}`,employee, {
             headers: {
            'Content-Type': 'application/json',
            }
        }).then(res => {console.log(res.employee) })
    }

    function handle(e){
        const newEmployee= {...employee}
        newEmployee[e.target.id] = e.target.value
        setEmployee(newEmployee)
        console.log(newEmployee)
    }

    return(
        <div>
            <form onSubmit={(e)=>submit(e)}>
                <input onChange={(e)=>handle(e)} id="id" value={employee.id} placeholder="id" type="text"/>
                <button>Submit</button>
            </form>
        </div>
    )
}
export default Delete;