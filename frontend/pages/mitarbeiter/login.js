import { TextField, Grid, Box, Typography } from '@material-ui/core';
import {useState} from "react";
import axios from 'axios';
import { useRouter } from 'next/router';
import { makeStyles } from '@mui/styles';
import Button from '@mui/material/Button';
import SaveIcon from '@mui/icons-material/Save';


console.log("--> Login")
export default function Login() {
    let [name, setName] = useState ('')
    let [kurzzeichen, setKurzzeichen] = useState ('')
    const router = useRouter()

    function login(){
        axios.get('http://palmiest-hornet-1388.dataplicity.io/api/Mitarbeiter/login', { params: { name, kurzzeichen } }).then(res => {
            if(res.data[0].exists == true){
                console.log("Login Succesful!")
                console.log(`Logged in as ${name}.`)
                router.push(`/startseite?param=${kurzzeichen}&param2=${name}`) 
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
                <div className={classes.d}><TextField className={classes.b} id="standard-basic" variant="outlined" label="Name" onChange={e => setName(e.target.value)}></TextField></div>
                <div className={classes.d}><TextField className={classes.b} id="standard-basic" variant="outlined" label="Kürzel" onChange={e => setKurzzeichen(e.target.value)}></TextField></div>
                <div className={classes.c}><Button color="inherit" className={classes.a} onClick={() => login()}><SaveIcon/>Login</Button></div>
            </div>
           
        </form>
    )
}

const useStyles = makeStyles({
    a: {
      background: 'linear-gradient(45deg, #143968  30%, #143968  90%)',
      borderRadius: 3,
      boxShadow: '0 2px 5px 2px rgba(70, 175, 219, .3)',
      color: 'white',
      height: 80,
      width: "70%",
      padding: '0 30px',
      textAlign: 'center',
      marginTop: "10%",
      
    },

    b: {
        height: 40,
        width: 280,
        padding: '0 30px',
    },

    c: {
        textAlign: 'center',
        marginTop: 40,
        color: "white",
    },

    d: {
        color: "green",
        textAlign: 'center',
        marginTop: 40,
    },

    e: {
        background: 'linear-gradient(45deg, #143968  30%, #143968  90%)',
        boxShadow: '0 3px 5px 2px rgba(70, 175, 219, .3)',
        marginTop: 0,
        paddingTop: 60,
        marginBottom: 100,
        fontSize: 40,
        height: 110,
        color: 'white',
        fontWeight: 'bold',
        borderBottomLeftRadius: 15,
        borderBottomRightRadius: 15,
    },

    f: {
        background: 'linear-gradient(45deg, #455a64 30%, #546e7a 90%)',
        boxShadow: '0 3px 5px 2px rgba(70, 175, 219, .3)',
        height: 75,
    },

    g: {
        marginTop:"40%"
    },
})

