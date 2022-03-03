/* eslint-disable react/prop-types */
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import React, {useState} from 'react';
import { useRouter } from 'next/router';
import { makeStyles } from '@mui/styles';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
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
    
    const classes = useStyles();

    const CREATE2 = async () => {
        const response = await fetch(`https://palmiest-hornet-1388.dataplicity.io/api/api/Auftrag/create?ksv=${props.Ksv}&auftrag=${props.Auftrag}&auftraggeber=${props.Auftraggeber}&auftragnehmer=${props.Auftragnehmer}&sperren=${props.Sperren}&kommentar=${props.Kommentar}&von=${props.Von}&bis=${props.Bis}&auftraggeber_unterschrift=${props.AuftraggeberUnterschrift}`, {
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