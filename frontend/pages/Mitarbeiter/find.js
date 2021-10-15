import Axios from 'axios';
import React, {useState } from 'react'

function FindById() {
    const [Mitarbeiter, setMitarbeiter] = useState({
        id: "",
        name: "",
        kurzzeichen: "",
    })

    function submit(e) {
        e.preventDefault();

        Axios.get(`http://localhost:8090/api/Mitarbeiter/find/${Mitarbeiter.id}`, {
             headers: {
            'Content-Type': 'application/json',
            }
        }).then(res => {
            console.log(res.data[0]);
            setMitarbeiter({
                id: res.data[0].ID,
                name: res.data[0].NAME,
                kurzzeichen: res.data[0].KURZZEICHEN,
                });
            })
        
        
    }

    function handle(e){
        const newMitarbeiter= {...Mitarbeiter}
        newMitarbeiter[e.target.id] = e.target.value
        setMitarbeiter(newMitarbeiter)
        console.log(newMitarbeiter)
    }

    return(
        <div>
            <form onSubmit={(e)=>submit(e)}>
                <input onChange={(e)=>handle(e)} id="id" value={Mitarbeiter.id} placeholder="id" type="text"/>
                <button>Submit</button>
            </form>
            <a>{Mitarbeiter.name}</a>
        </div>
    )
}
export default FindById;