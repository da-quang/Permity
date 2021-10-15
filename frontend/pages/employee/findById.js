import Axios from 'axios';
import React, {useState } from 'react'

function FindById() {
    const [employee, setEmployee] = useState({
        id: "",
        name: "",
        kurzzeichen: "",
    })

    function submit(e) {
        e.preventDefault();

        Axios.get(`http://localhost:8090/api/Employee/${employee.id}`, {
             headers: {
            'Content-Type': 'application/json',
            }
        }).then(res => {
            console.log(res.data[0]);
            setEmployee({
                id: res.data[0].ID,
                name: res.data[0].NAME,
                kurzzeichen: res.data[0].KURZZEICHEN,
                });
            })
        
        
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
            <a>{employee.name}</a>
        </div>
    )
}
export default FindById;