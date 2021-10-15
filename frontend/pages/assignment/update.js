import Axios from 'axios';
import React, {useState } from 'react'

function Update() {
    const url = "http://localhost:8090/api/Assignment/update"
    const [assignment, setAssignment] = useState({
        from: "",
        to: "",
        type: "",
        status: ""
    })

    function submit(e) {
        e.preventDefault();

        Axios.put(url,assignment, {
             headers: {
            'Content-Type': 'application/json',
            }
        }).then(res => {console.log(res.assignment) })
    }

    function handle(e){
        const newAssignment= {...assignment}
        newAssignment[e.target.id] = e.target.value
        setAssignment(newAssignment)
        console.log(newAssignment)
    }

    return(
        <div>
            <form onSubmit={(e)=>submit(e)}>
                <input onChange={(e)=>handle(e)} id="id" value={assignment.id} placeholder="id" type="number"/>
                <input onChange={(e)=>handle(e)} id="status" value={assignment.status} placeholder="status" type="text"/>    
                <button>Submit</button>
            </form>
        </div>
    )
}
export default Update;