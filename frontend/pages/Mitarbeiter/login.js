import axios from 'axios';
import React, {useState } from 'react'
import { loginMitarbeiter } from '../api/auth';

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

function FindById() {
    const [Mitarbeiter, setMitarbeiter] = useState({
        id: '',
        kurzzeichen: '',
        name: '',
        personalnr: '',
        abteilung: '',
        team: '',
        bereich: ''
    })
    

    const loginMitarbeiter = async(kurzzeichen1, name1) => {
        axios.get('http://localhost:8090/api/Mitarbeiter/login', {params: {name: name1, kurzzeichen: kurzzeichen1}}).then(res => {
            console.log(res.data[0]);
            setMitarbeiter({
                id: res.data[0].ID,
                kurzzeichen: res.data[0].KURZZEICHEN,
                name: res.data[0].NAME,
                personalnr: res.data.PERSONALNR,
                abteilung: res.data[0].ABTEILUNG,
                team: res.data[0].TEAM,
                bereich: res.data[0].BEREICH,
                })
            })
    }

    function submit(e) {
        e.preventDefault();
        loginMitarbeiter(Mitarbeiter.kurzzeichen, Mitarbeiter.name);
    }

    function handle(e){
        const newMitarbeiter= {...Mitarbeiter}
        newMitarbeiter[e.target.id] = e.target.value
        setMitarbeiter(newMitarbeiter)
        console.log(newMitarbeiter)
    }

    return(
        <Box><div>
        <form onSubmit={(e)=>submit(e)}>
            <TextField onChange={(e)=>handle(e)} id="kurzzeichen" value={Mitarbeiter.kurzzeichen}  label="Kurzzeichen" variant="outlined"> </TextField>
            <TextField onChange={(e)=>handle(e)} id="name" value={Mitarbeiter.name}  label="Name" variant="outlined" > </TextField>
            <button>Submit</button>
        </form>
        <p>{Mitarbeiter.id}</p>
        <p>{Mitarbeiter.kurzzeichen}</p>
        <p>{Mitarbeiter.name}</p>
        <p>{Mitarbeiter.personalnr}</p>
        <p>{Mitarbeiter.abteilung}</p>
        <p>{Mitarbeiter.team}</p>
        <p>{Mitarbeiter.bereich}</p>
    </div></Box>
        
    )
}
export default FindById;