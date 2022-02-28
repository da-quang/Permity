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
import "../startseite/sigCanvas.module.css";
import sigCanvas from '../startseite/sigCanvas.module.css';
import SignaturePad from "react-signature-canvas";
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
import useSWR from 'swr'
import { useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/styles';

import Appbar from '../../components/AppBars'

console.log("--> Formular")

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

const fetcher = (...args) => fetch(...args).then((response) => response.json())

export default function Formular() {

    const [Name, setName] = useState('')

    useEffect(() => {
        fetch(`https://palmiest-hornet-1388.dataplicity.io/api/api/Mitarbeiter/all`)
            .then((response) => response.json())
            .then((name) => setName(name));
         
            
    }, []);

    const { query } = useRouter()
    const classes = useStyles();

    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.up('sm'));
    const matchesMD = useMediaQuery(theme.breakpoints.up('md'));
    const matchesLG = useMediaQuery(theme.breakpoints.up('lg'));

    let [von, setVon] = useState(new Date())
    let [bis, setBis] = useState(new Date())

    //Menü
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const router = useRouter()

    const [ksv1, setKsv1] = useState([]);
    const handleLoad1 = (event, value) => setKsv1(value);

    const [value, setValue] = useState(new Date());
    const [value1, setValue1] = useState(new Date());

    value.setHours(7, 30)
    value1.setHours(16, 45)

    let VON = `${value.getFullYear()}.${value.getMonth() + 1}.${value.getDate()} ${value.getHours()}:${value.getMinutes()}`;
    let BIS = `${value1.getFullYear()}.${value1.getMonth() + 1}.${value1.getDate()} ${value1.getHours()}:${value1.getMinutes()}`;

    let [KSV, setKSV] = useState('')
    let [KOMMENTAR, setKOMMENTAR] = useState('-')
    let [AUFTRAGNEHMER, setAUFTRAGNEHMER] = useState('')
    let [SPERREN, setSPERREN] = useState('')
    let [AUFTRAG, setAUFTRAG] = useState('')
    let [AUFTRAGGEBER_UNTERSCHRIFT, setAUFTRAGGEBER_UNTERSCHRIFT] = useState('')

    let AUFTRAGGEBER = query.param2

    let [Ebene2LoadNext, setEbene2LoadNext] = useState('x')
    let [Ebene3LoadNext, setEbene3LoadNext] = useState('x')
    let [Ebene4LoadNext, setEbene4LoadNext] = useState('x')
    let [Ebene5LoadNext, setEbene5LoadNext] = useState('x')




    const CREATE2 = async () => {
        // console.log(AUFTRAGGEBER_UNTERSCHRIFT)
        // axios.post('https://palmiest-hornet-1388.dataplicity.io/api/api/Auftrag/create', {
        //     ksv: KSV,
        //     auftrag: AUFTRAG,
        //     auftraggeber: AUFTRAGGEBER,
        //     auftragnehmer: AUFTRAGNEHMER,
        //     sperren: SPERREN,
        //     kommentar: KOMMENTAR,
        //     von: VON,
        //     bis: BIS,
        //     auftraggeber_unterschrift: "1123",
        // })
        //     .then(function (response) {
        //         console.log(response);
        //     })
        //     .catch(function (error) {
        //         console.log(error);
        //     });

        // fetch('https://palmiest-hornet-1388.dataplicity.io/api/api/Auftrag/create', {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json',
        //         'Accept': '*/*',
        //         'Access-Control-Allow-Origin': '*',
        //         'Access-Control-Allow-Headers': 'Origin, X-Requested-With'
        //     },
        //     body: JSON.stringify({
        //         ksv: KSV,
        //         auftrag: AUFTRAG,
        //         auftraggeber: AUFTRAGGEBER,
        //         auftragnehmer: AUFTRAGNEHMER,
        //         sperren: SPERREN,
        //         kommentar: KOMMENTAR,
        //         von: VON,
        //         bis: BIS,
        //         auftraggeber_unterschrift: AUFTRAGGEBER_UNTERSCHRIFT,
        //     })
        // })

        const response = await fetch(`https://palmiest-hornet-1388.dataplicity.io/api/api/Auftrag/create?ksv=${KSV}&auftrag=${AUFTRAG}&auftraggeber=${AUFTRAGGEBER}&auftragnehmer=${AUFTRAGNEHMER}&sperren=${SPERREN}&kommentar=${KOMMENTAR}&von=${VON}&bis=${BIS}&auftraggeber_unterschrift=${AUFTRAGGEBER_UNTERSCHRIFT}`, {
            method: 'POST'
        })
        const data = await response.json()
        console.log(data)

        router.push(`/startseite?param=${query.param}&param2=${query.param2}`)

        // const fd = new FormData();
        // fd.append

    }

    const MAIL = async () => {
        const getEmail = await fetch(`https://palmiest-hornet-1388.dataplicity.io/api/api/Mitarbeiter/email?name=${AUFTRAGNEHMER}`, {
            method: 'GET'
        })
        const email = await getEmail.json()

        const response = await fetch(`https://palmiest-hornet-1388.dataplicity.io/api/api/Email/send?email=${email[0].EMAIL}`, {
            method: 'POST'
        })

        console.log("Email wurde versendet")
    }

    const sigCanvasRef = useRef({});
    const clear = () => sigCanvasRef.current.clear();
    const save = () => {

        setAUFTRAGGEBER_UNTERSCHRIFT('Hallo123')
        // setAUFTRAGGEBER_UNTERSCHRIFT(sigCanvasRef.current.getTrimmedCanvas().toDataURL("image/png"))

        // let base64 = sigCanvasRef.current.getTrimmedCanvas().toDataURL("image/png");
        // let blob = dataURItoBlob(base64);
        // const blobUrl = URL.createObjectURL(blob);
        // setAUFTRAGGEBER_UNTERSCHRIFT(blobUrl);
        // console.log("Unterschrift wurde gespeichert!")
        // scaleImage(AUFTRAGGEBER_UNTERSCHRIFT,0.5,"image/jpeg",0.7, function(newDataUrl){
        //     console.log(AUFTRAGGEBER_UNTERSCHRIFT.length);
        //     console.log(newDataUrl.length);
        //     console.log(newDataUrl);
        //     console.log(AUFTRAGGEBER_UNTERSCHRIFT.length / newDataUrl.length);  
        //     setAUFTRAGGEBER_UNTERSCHRIFT(newDataUrl)
        //     console.log(AUFTRAGGEBER_UNTERSCHRIFT)
        // })

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

    const Sperren = [{
        label: "Durchführungserlaubnis"
    }, { label: "Freigabe zur Arbeit" },
    { label: "Freigabe zur Sperre" }, {
        label: "Prüfungserlaubnis"
    }];

    const [open2, setOpen2] = React.useState(false);

    const handleClickOpen2 = () => {
        setOpen2(true);
    };

    const handleClose2 = () => {
        setOpen2(false);
    };

    let [ebene1, setEbene1] = useState('')
    let [ebene2, setEbene2] = useState('')
    let [ebene3, setEbene3] = useState('')
    let [ebene4, setEbene4] = useState('')
    let [ebene5, setEbene5] = useState('')

    let [KsvALL, setKsvALL] = useState('')

    useEffect(() => {
        fetch(`https://palmiest-hornet-1388.dataplicity.io/api/api/KSV/all?kurzzeichen=${query.param}`)
            .then((response) => response.json())
            .then((KsvALL) => setKsvALL(KsvALL));
    }, []);

    useEffect(() => {
        fetch(`https://palmiest-hornet-1388.dataplicity.io/api/api/KSV/select?ksv=${Ebene2LoadNext}&ebene=3`)
            .then((response) => response.json())
            .then((ebene3) => setEbene3(ebene3));
    }, [Ebene2LoadNext]);

    useEffect(() => {
        fetch(`https://palmiest-hornet-1388.dataplicity.io/api/api/KSV/select?ksv=${Ebene3LoadNext}&ebene=4`)
            .then((response) => response.json())
            .then((ebene4) => setEbene4(ebene4));
    }, [Ebene3LoadNext]);

    useEffect(() => {
        fetch(`https://palmiest-hornet-1388.dataplicity.io/api/api/KSV/select?ksv=${Ebene4LoadNext}&ebene=5`)
            .then((response) => response.json())
            .then((ebene5) => setEbene5(ebene5));
    }, [Ebene4LoadNext]);


    let [Ebene3Bezeichnung, setEbene3Bezeichnung] = useState('')
    let [Ebene4Bezeichnung, setEbene4Bezeichnung] = useState('')
    let [Ebene5Bezeichnung, setEbene5Bezeichnung] = useState('')

    useEffect(() => {
        setEbene3LoadNext('x')
        setEbene4LoadNext('x')
    }, [Ebene2LoadNext])

    useEffect(() => {
        setEbene4LoadNext('x')
    }, [Ebene3LoadNext])

    return (
        <form>
            <div>
            
            <Appbar StartseiteButton="" Überschrift="Auftrag" Kurzzeichen={query.param} />

            </div>
           
        </form>

    )
}





const useStyles = makeStyles({
    CreateBTN: {
        width: "60%",
        marginTop: "80px",

    },

    SignBTN: {
        width: "80%",

    },

    BTNGroup: {
        fontWeight: "bold",
        height: "60px",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",



    },


    typoh4: {
        fontWeight: "bold",
    },
    typoh6: {
        width: 60,
        height: 30,
        borderBottomLeftRadius: 15,
        borderBottomRightRadius: 15,
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
        textAlign: 'center',
        position: 'relative',
        right: '2%',
        top: '15%'
    },

    Fab: {
        position: "fixed",
        right: "8%",
        bottom: "5%",

        zIndex: "999",
    },

    BTN: {
        color: 'white',
        fontSize: 100,
        fontWeight: '600',
    },

    b: {
        height: 40,
        width: 280,
        padding: '0 30px',
    },

    c: {
        textAlign: 'center',
    },

    d: {
        color: "green",
        textAlign: 'center',
        marginTop: 40,
    },

    e: {
        background: 'linear-gradient(45deg, #143968 30%, #143968 90%)',
        boxShadow: '0 3px 5px 2px rgba(20, 57, 104, .3)',
        marginTop: 0,
        paddingTop: 15,
        marginBottom: "5%",
        height: 60,
        color: 'white',
        borderBottomLeftRadius: 15,
        borderBottomRightRadius: 15,
        justifyContent: 'space-between',
        display: 'flex',
    },

    SignatureBTNRow: {
        display: "flex",
        textAlign: "center",
        margin: "auto",
        justifyContent: "center",
    },

    g: {
        display: "flex",
        padding: 10,
    },

    h: {
        paddingRight: 10,
    },
});
