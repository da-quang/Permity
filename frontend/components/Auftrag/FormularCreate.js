import Typography from '@mui/material/Typography';
import Fab from '@mui/material/Fab';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import React, { Fragment, useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/router';
import { makeStyles } from '@mui/styles';
import MenuIcon from '@mui/icons-material/Menu';
import AddIcon from '@mui/icons-material/Add';
import Stack from '@mui/material/Stack';
import MobileDateTimePicker from '@mui/lab/MobileDateTimePicker';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LogoutIcon from '@mui/icons-material/Logout';
import HomeIcon from '@mui/icons-material/Home';
import Router from "next/router";
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Box from '@mui/material/Box';
import CreateIcon from '@mui/icons-material/Create';
import Popup from 'reactjs-popup';


import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import { Autocomplete } from "@mui/material";
import Dialog from '@mui/material/Dialog';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import axios from 'axios';
import { createTheme, ThemeProvider } from '@mui/material/styles';



const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const BTNTheme = createTheme({
    palette: {
        primary: {
            main: "rgb(20,57,104)",
        },
    },
});

function FormularCreate(props) {

    const router = useRouter()
    const { query } = useRouter()
    const classes = useStyles();

    const CREATE2 = async () => {
        const response = await fetch(`https://palmiest-hornet-1388.dataplicity.io/api/api/Auftrag/create?ksv=${props.Ksv}&auftrag=${props.AUFTRAG}&auftraggeber=${props.Auftraggeber}&auftragnehmer=${props.Auftragnehmer}&sperren=${props.Sperren}&kommentar=${props.Kommentar}&von=${props.Von}&bis=${props.Bis}&auftraggeber_unterschrift=${props.AuftraggeberUnterschrift}`, {
            method: 'POST'
        })
        const data = await response.json()
        console.log(data)

        router.push(`/startseite?param=${props.param}&param2=${props.param2}`)

        // const fd = new FormData();
        // fd.append

    }

    const [Mail, setMail] = useState()

    const MAIL = async () => {
        const getEmail = await fetch(`https://palmiest-hornet-1388.dataplicity.io/api/api/Mitarbeiter/email?name=${props.Auftragnehmer}`, {
            method: 'GET'
        })
        const email = await getEmail.json()

        setMail(email[0].EMAIL)

        const response = await fetch(`https://palmiest-hornet-1388.dataplicity.io/api/api/Email/send?email=${Mail}`, {
            method: 'POST'
        })

        console.log("Email wurde versendet")
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

    return (
        <div>
            <ThemeProvider theme={BTNTheme}>
                <Button className={classes.CreateBTN} size='large' disabled={props.AuftraggeberUnterschrift != "null" ? false : true} variant="contained" onClick={() => { CREATE2(); MAIL(); handleClick1() }} color="primary">
                    <Typography variant="h6">Erstellen</Typography>
                </Button>
            </ThemeProvider>
            <Snackbar open={open1} autoHideDuration={6000} onClose={handleClose1}>
                <Alert severity="success">
                    <AlertTitle>Auftrag erstellt</AlertTitle>
                    20 Minuten Zeit zum Bestätigen
                </Alert>
            </Snackbar>
        </div>
    )

}

const useStyles = makeStyles({
    CreateBTN: {
        width: "60%",
        marginTop: "80px",

    },
});


export default FormularCreate