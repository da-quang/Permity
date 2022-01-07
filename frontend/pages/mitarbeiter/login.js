import TextField from '@mui/material/TextField';
import { useState } from "react";
import axios from 'axios';
import { useRouter } from 'next/router';
import { makeStyles } from '@mui/styles';
import Button from '@mui/material/Button';
import LoginIcon from '@mui/icons-material/Login';
import { Typography } from '@mui/material';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

console.log("--> Login")
export default function Login() {
    let [name, setName] = useState('')
    let [kurzzeichen, setKurzzeichen] = useState('')
    const router = useRouter()

    const [open, setOpen] = useState(false);
    const handleClose = () => {
        setOpen(false);
    };
    const handleToggle = () => {
        setOpen(!open);
    };

    function login() {
        axios.get('https://palmiest-hornet-1388.dataplicity.io/api/api/Mitarbeiter/login', { params: { name, kurzzeichen } }).then(res => {
            if (res.data[0].exists == true) {
                console.log("Login Succesful!")
                console.log(`Logged in as ${name}.`)
                router.push(`/startseite?param=${kurzzeichen}&param2=${name}`)
            } else {
                console.log("Your login attempt was not successful. Please Try again.")
            }
        })
    }

    const classes = useStyles();
    return (
        <form className={classes.h}>
            <div className={classes.e}>
                <div align="center"><Typography variant='h4'>PERMITY</Typography></div>
            </div>
            <div className={classes.g}>
                <div className={classes.d}><TextField className={classes.b} id="standard-basic" variant="outlined" label="Name" onChange={e => setName(e.target.value)}></TextField></div>
                <div className={classes.d}><TextField className={classes.b} id="standard-basic" variant="outlined" label="Kürzel" onChange={e => setKurzzeichen(e.target.value)}></TextField></div>
      
                <div className={classes.c}><Button variant="contained" color="inherit" disabled={kurzzeichen != "" && name != "" ? false : true} className={classes.a} onClick={() => {login(); handleToggle()}}  ><Typography variant="h6">Anmelden</Typography></Button></div>
                
                <Backdrop
                    sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                    open={open}
                    onClick={handleClose}
                >
                    <CircularProgress color="inherit" />
                </Backdrop>
            </div>
        </form>
    )
}

const useStyles = makeStyles({
    a: {



       
        height: 80,
        width: "70%",
        background: 'linear-gradient(45deg, #143968  30%, #143968  90%)',
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
        boxShadow: '0 3px 5px 2px rgba(20, 57, 104, .3)',
        marginTop: 0,
        paddingTop: 15,
        marginBottom: "5%",
        fontSize: 40,
        height: 60,
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
        marginTop: "40%"
    },
})

