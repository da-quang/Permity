import Axios from 'axios';
import React, {useState } from 'react'

function Create() {

    const url = "http://localhost:8090/api/Assignment/create"
    const [assignment, setAssignment] = useState({
        from: "",
        to: "",
        type: "sperre",
        status: "offen"
    })

    function submit(e) {
        e.preventDefault();

        Axios.post(url,assignment, {
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
                <input onChange={(e)=>handle(e)} id="from" value={assignment.from} placeholder="from" type="text"/>
                <input onChange={(e)=>handle(e)} id="to" value={assignment.to} placeholder="to" type="text"/>
                <input onChange={(e)=>handle(e)} id="type" value={assignment.type} placeholder="type" type="text"/>
                <input onChange={(e)=>handle(e)} id="state" value={assignment.status} placeholder="status" type="text"/>
                <button>Submit</button>
            </form>
        </div>
    )
}
export default Create;