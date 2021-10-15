import Axios from 'axios';
import React, {useState } from 'react'

function Create() {

    const url = "http://localhost:8090/api/Employee/create"
    const [employee, setEmployee] = useState({
        name: "",
        kurzzeichen: ""
    })

    function submit(e) {
        e.preventDefault();

        Axios.post(url,employee, {
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
                <input onChange={(e)=>handle(e)} id="name" value={employee.name} placeholder="name" type="text"/>
                <input onChange={(e)=>handle(e)} id="kurzzeichen" value={employee.kurzzeichen} placeholder="kurzzeichen" type="text"/>
                <button>Submit</button>
            </form>
        </div>
    )
}
export default Create;