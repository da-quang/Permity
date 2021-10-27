import { TextField, Button } from "@material-ui/core";
import React,{ useState }  from 'react';
import MomentUtils from '@date-io/moment';
import { DatePicker, TimePicker, DateTimePicker, MuiPickersUtilsProvider} from "@material-ui/pickers";
import axios from 'axios';
import { useRouter } from 'next/router';

console.log("--> Formular")
export default function Formular() {
    const {query} = useRouter()
    
    let [ksv, setKsv] = useState ('')
    let auftraggeber = query.param
    let [auftragnehmer, setAuftragnehmer] = useState ('')
    let [sperren, setSperren] = useState ('')
    let [kommentar, setKommentar] = useState ('')
    let [von, setVon] = useState (new Date())
    let [bis, setBis] = useState (new Date())
    let status = 'offen'
    
    function create(){
        axios.post('http://localhost:8090/api/Auftrag/create', null, { params: { ksv, auftraggeber, auftragnehmer, sperren, kommentar, von, bis, status} })
        .then(res => {
            console.log(res)
        })
    }

    return(
        <div>
            <TextField label="Ksv" onChange={e => setKsv(e.target.value)}></TextField>
            <TextField label="Auftragnehmer" onChange={e => setAuftragnehmer(e.target.value)}></TextField>
            <TextField label="Sperren" onChange={e => setSperren(e.target.value)}></TextField>
            <TextField label="Kommentar" onChange={e => setKommentar(e.target.value)}></TextField>
            <TextField label="Von" onChange={e => setVon(e.target.value)}></TextField>
            <TextField label="Bis" onChange={e => setBis(e.target.value)}></TextField>
            <Button onClick={() => create()}>ERSTELLEN</Button>
        </div>
    )
}
