import Axios from 'axios';
import React, {useState } from 'react'

function FindById() {
    const [assignment, setAssignment] = useState({
        from: "",
        to: "",
        type: "sperre",
        state: "offen"
    })

    function submit(e) {
        e.preventDefault();

        Axios.get(`http://localhost:8090/api/Assignment/${assignment.id}`, {
             headers: {
            'Content-Type': 'application/json',
            }
        }).then(res => {
            console.log(res.data[0]);
            setAssignment({
                id: res.data[0].ID,
                from: res.data[0].FROM,
                to: res.data[0].TO,
                type: res.data[0].TYPE,
                status: res.data[0].STATUS,
                time: res.data[0].TIME,
                });
            })
        
        
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
                <input onChange={(e)=>handle(e)} id="id" value={assignment.id} placeholder="id" type="text"/>
                <button>Submit</button>
            </form>
            <a>{assignment.id}</a>
            <a>{assignment.from}</a>
            <a>{assignment.to}</a>
            <a>{assignment.type}</a>
            <a>{assignment.status}</a>
            <a>{assignment.time}</a>
        </div>
    )
}
export default FindById;