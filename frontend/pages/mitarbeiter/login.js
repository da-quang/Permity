import TextField from '@mui/material/TextField';
import React, { Fragment, useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import { makeStyles } from '@mui/styles';
import Button from '@mui/material/Button';
import LoginIcon from '@mui/icons-material/Login';
import { Typography } from '@mui/material';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
// Passwort
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Input from '@mui/material/Input';
import FilledInput from '@mui/material/FilledInput';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { ThemeProvider } from '@mui/material/styles';
import Tooltip from '@mui/material/Tooltip';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});


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
        kurzzeichen = values.password
        axios.get('https://palmiest-hornet-1388.dataplicity.io/api/api/Mitarbeiter/login', { params: { name, kurzzeichen } }).then(res => {
            if (res.data[0].exists == true) {
                console.log("Login Succesful!")
                console.log(`Logged in as ${name}.`)
                router.push(`/startseite?param=${kurzzeichen}&param2=${name}`)


            } else {
                console.log("Your login attempt was not successful. Please Try again.")
                handleClose()
                handleClick1()
            }
        })
    }

    const [open1, setOpen1] = React.useState(false);

    const handleClick1 = () => {
        setOpen1(true);
    };

    const handleClose1 = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen1(false);
    };

    const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
    };

    const classes = useStyles();

    const handleClickShowPassword = () => {
        setValues({
            ...values,
            showPassword: !values.showPassword,
        });
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const [values, setValues] = React.useState({
        password: '',
        showPassword: false,
    });

    return (
        
        <form className={classes.h}>
            <meta name="theme-color" content="#143968"></meta>
            <div className={classes.e}>
                <div align="center"><Typography variant='h4'>PERMITY</Typography></div>
            </div>
            <div className={classes.g}>
                <div className={classes.d}><TextField className={classes.b} id="standard-basic" variant="outlined" label="Name" onChange={e => setName(e.target.value)}></TextField></div>
                <div className={classes.d}>
                    <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined" className={classes.b}>
                        <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                        <OutlinedInput
                            id="outlined-adornment-password"
                            type={values.showPassword ? 'text' : 'password'}
                            value={values.password}
                            onChange={handleChange('password')}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowPassword}
                                        onMouseDown={handleMouseDownPassword}
                                        edge="end"
                                    >
                                        {values.showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            }
                            label="Password"
                        />
                    </FormControl></div>

                <div className={classes.c}>
                   
                    <Button variant="contained" color="primary" disabled={values.password != "" && name != "" ? false : true} className={classes.a} onClick={() => { login(); handleToggle() }}  >
                        <Typography variant="h6">Anmelden</Typography>
                    </Button></div>
                    
                <Backdrop
                    sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                    open={open}
                    onClick={handleClose}
                >
                    <CircularProgress color="inherit" />
                </Backdrop>

                <Snackbar open={open1} autoHideDuration={6000} onClose={handleClose1}>
                    <Alert severity="error">
                        <AlertTitle>Fehler bei der Anmeldung</AlertTitle>
                        Name oder Kürzel fehlerhaft
                    </Alert>
                </Snackbar>

            </div>
        </form>
    )
}

const useStyles = makeStyles({
    a: {
        height: 80,
        width: "70%",
        textAlign: 'center',
        marginTop: "10%",

    },

    b: {
        height: 40,
        width: 280,

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

