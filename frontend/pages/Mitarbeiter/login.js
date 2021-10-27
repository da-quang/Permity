import { TextField, Grid, Box, Typography } from '@material-ui/core';
import {useState} from "react";
import axios from 'axios';
import { useRouter } from 'next/router';
import { makeStyles } from '@mui/styles';
import Button from '@mui/material/Button';



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

    const classes = useStyles();
    return(
        <form className={classes.h}>
            <div className={classes.e}> 
                <div align="center">PERMITY</div>
            </div>
            <div className={classes.g}>
                <div className={classes.d}><TextField className={classes.b} id="standard-basic" variant="standard" label="Name" onChange={e => setName(e.target.value)}></TextField></div>
                <div className={classes.d}><TextField className={classes.b} id="standard-basic" variant="standard" label="Kürzel" onChange={e => setKurzzeichen(e.target.value)}></TextField></div>
                <div className={classes.c}><Button className={classes.a} onClick={() => login()}>Login</Button></div>
            </div>
            <div className={classes.f}>

            </div>
        </form>
    )
}

const useStyles = makeStyles({
    a: {
      background: 'linear-gradient(45deg, #0288d1 30%, #03a9f4 90%)',
      borderRadius: 3,
      boxShadow: '0 2px 5px 2px rgba(70, 175, 219, .3)',
      color: 'white',
      height: 40,
      width: 280,
      padding: '0 30px',
    },

    b: {
        height: 40,
        width: 280,
        padding: '0 30px',
    },

    c: {
        textAlign: 'center',
        marginTop: 40,
    },

    d: {
        color: "green",
        textAlign: 'center',
        marginTop: 15,
    },

    e: {
        background: 'linear-gradient(45deg, #0288d1 30%, #03a9f4 90%)',
        boxShadow: '0 3px 5px 2px rgba(70, 175, 219, .3)',
        marginTop: 100,
        paddingTop: 30,
        marginBottom: 30,
        fontSize: 40,
        height: 110,
        color: 'white',
        fontFamily: 'monospace',
    },

    f: {
        background: 'linear-gradient(45deg, #455a64 30%, #546e7a 90%)',
        boxShadow: '0 3px 5px 2px rgba(70, 175, 219, .3)',
        height: 75,
    },

    g: {
        height: 420,
    },
})

