import { Button, TextField } from '@material-ui/core';
import Axios from 'axios';

export default function Login() {
    
    function sumbit(_name, _kurzzeichen) {
        axios.get('http://localhost:8090/api/Mitarbeiter/login', { params: { name: _name, kurzzeichen: _kurzzeichen } }).then(res => {
            let mitarbeiter = res.data[0] 
            console.log(mitarbeiter)
        })
    }

    return(

        <div>
            <TextField id="Name">Name</TextField>
            <TextField id="Kurzzeichen">Kurzzeichen</TextField>
            
        </div>
    )
}



