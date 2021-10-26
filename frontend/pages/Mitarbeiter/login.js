import { Button, TextField } from '@material-ui/core';
import {useState} from "react";
import axios from 'axios';
import { useRouter } from 'next/router';

console.log("--> Login")
export default function Login() {
    let [name, setName] = useState ('')
    let [kurzzeichen, setKurzzeichen] = useState ('')
    const router = useRouter()


    function login(){
        axios.get('http://localhost:8090/api/Mitarbeiter/login', { params: { name, kurzzeichen } }).then(res => {
            if(res.data[0].exists == true){
                console.log("Login Succesful!")
                console.log(`Logged in as ${name}.`)
                router.push(`/startseite?param=${kurzzeichen}`) 
            }else{
                console.log("Your login attempt was not successful. Please Try again.") 
            }
        })
    }

    return(
        <div>
            <TextField label="Name" onChange={e => setName(e.target.value)}></TextField>
            <TextField label="Kürzel" onChange={e => setKurzzeichen(e.target.value)}></TextField>
            <Button onClick={() => login()}>Login</Button>
        </div>
    )
}



