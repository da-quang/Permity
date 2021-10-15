import axios from 'axios';
import React, {useState } from 'react'
import Router from 'next/router';

function KSV() {
    const [KSV, setKSV] = useState([])

    const [Mitarbeiter, setMitarbeiter] = useState({
        kurzzeichen: ''
    })

    const getKSV = async(kurzzeichen1) => {
        axios.get('http://localhost:8090/api/KSV/all', {params: {kurzzeichen: kurzzeichen1} }).then(res => {
            console.log(res.data);
            setKSV(res.data);
        })
    }

    function submit(e) {
        e.preventDefault();
        getKSV(Mitarbeiter.kurzzeichen);
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
                <input onChange={(e)=>handle(e)} id="kurzzeichen" value={Mitarbeiter.kurzzeichen} placeholder="kurzzeichen" type="text"/>
                <button>Submit</button>
            </form>
            <div>
                <ul>
                    {KSV && KSV.map((item, index) => <li key={index}> <p> <button type="button" onClick={() => Router.push({pathname: 'getKSV', query: {newKSV: item.KSV, newEbene: item.EBENE + 1},})}>{item.BEZEICHNUNG}</button> {item.ID + " " + item.KSV + " " + item.BEZEICHNUNG + " " + item.EBENE + " " + item.ROWID + " " + item.BETRIEBSBEREICH}</p></li>)}
                    
                </ul>
            </div>
        </div>
    )
}
export default KSV;