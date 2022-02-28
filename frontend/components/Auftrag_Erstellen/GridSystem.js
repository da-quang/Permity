import Typography from '@mui/material/Typography';
import Fab from '@mui/material/Fab';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import React, { Fragment, useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/router';
import { makeStyles } from '@mui/styles';

import Stack from '@mui/material/Stack';
import MobileDateTimePicker from '@mui/lab/MobileDateTimePicker';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import AdapterDateFns from '@mui/lab/AdapterDateFns';

import "../startseite/sigCanvas.module.css";

import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import { Autocomplete } from "@mui/material";

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





export default function GridSystem() {

    <Grid style={{ marginLeft: matchesMD == true ? '20%' : '', marginRight: matchesMD == true ? '20%' : '', marginTop: '20px' }}>
        <div className={classes.g}>
            <Grid className={classes.h} item xs={6}>
                <TextField size="small" fullWidth variant="outlined" label="Auftrag Name" onChange={e => setAUFTRAG(e.target.value)}></TextField>
            </Grid>
            <Grid item xs={6}>
                <Autocomplete
                    disablePortal
                    id="combo-box-demo"
                    options={Name}
                    getOptionLabel={(option) => option.NAME}
                    onChange={(event, value) => { if (value === null) { value = ""; } else { setAUFTRAGNEHMER(value.NAME) } }}
                    renderInput={(params) => (<TextField {...params} size="small" variant="outlined" label="Auftragnehmer" ></TextField>)}
                    isOptionEqualToValue={(option, value) => option.NAME === value.NAME}
                />
            </Grid>
        </div>
        <div className={classes.g} >
            <Grid className={classes.h} item xs={6} >
                <Autocomplete
                    disablePortal
                    id="combo-box-demo"
                    options={Sperren}
                    getOptionLabel={(option) => option.label}
                    onChange={(event, value) => setSPERREN(value.label)}
                    renderInput={(params) => (<TextField {...params} size="small" variant="outlined" label="Sperre" ></TextField>)}
                    isOptionEqualToValue={(option, value) => option.label === value.label}
                />
            </Grid>

            <Grid item xs={6}>
                <Autocomplete

                    disablePortal
                    id="combo-box-demo"
                    options={KsvALL}
                    getOptionLabel={(option) => option.BEZEICHNUNG}
                    onChange={(event, value) => { if (value === null) { value = ""; setEbene2LoadNext("x") } else { setEbene2LoadNext(value.KSV), setKSV(value.KSV) } }}
                    renderInput={(params) => (<TextField {...params} size="small" variant="outlined" label="Ksv 1" ></TextField>)}
                    isOptionEqualToValue={(option, value) => option.BEZEICHNUNG === value.BEZEICHNUNG}
                />
            </Grid>
        </div>
        <div className={classes.g}>
            <Grid className={classes.h} item xs={6}>
                <Autocomplete
                    key={Ebene2LoadNext}
                    disabled={ebene3 == '' ? true : false}
                    disablePortal
                    id="combo-box-demo"
                    options={ebene3}
                    getOptionLabel={(option) => option.BEZEICHNUNG}
                    onChange={(event, value) => { if (value === null) { value = ""; setEbene3LoadNext("x"); setEbene3Bezeichnung(''); setKSV(Ebene2LoadNext); console.log('Null') } else { setEbene3LoadNext(value.KSV), setKSV(value.BEZEICHNUNG), setEbene3Bezeichnung(value.BEZEICHNUNG); console.log('NOT Null') } }}
                    renderInput={(params) => (<TextField {...params} size="small" variant="outlined" label="Ksv 2" ></TextField>)}
                    isOptionEqualToValue={(option, value) => option.BEZEICHNUNG === value.BEZEICHNUNG}
                />
            </Grid>

            <Grid item xs={6}>
                <Autocomplete
                    key={Ebene3LoadNext}
                    disabled={ebene3 == '' || ebene4 == '' ? true : false}
                    disablePortal
                    id="combo-box-demo"
                    options={ebene4}
                    getOptionLabel={(option) => option.BEZEICHNUNG}
                    onChange={(event, value) => { if (value === null) { value = ""; setEbene4LoadNext("x"); setEbene4Bezeichnung(''); setKSV(Ebene3Bezeichnung) } else { setEbene4LoadNext(value.KSV); setKSV(value.BEZEICHNUNG); setEbene4Bezeichnung(value.BEZEICHNUNG) } }}
                    renderInput={(params) => (<TextField {...params} value="" size="small" variant="outlined" label="Ksv 3" ></TextField>)}
                    isOptionEqualToValue={(option, value) => option.BEZEICHNUNG === value.BEZEICHNUNG}
                />
            </Grid>
        </div>
        <div className={classes.g}>
            <Grid className={classes.h} item xs={6}>
                <Autocomplete
                    key={Ebene4LoadNext}
                    disabled={ebene3 == '' || ebene4 == '' || ebene5 == '' ? true : false}
                    disablePortal
                    id="combo-box-demo"
                    options={ebene5}
                    getOptionLabel={(option) => option.BEZEICHNUNG}
                    onChange={(event, value) => { if (value === null) { value = ""; setEbene5Bezeichnung(''); setKSV(Ebene4Bezeichnung) } else { setEbene5LoadNext(value.KSV); setKSV(value.BEZEICHNUNG) } }}
                    renderInput={(params) => (<TextField  {...params} size="small" variant="outlined" label="Ksv 4" ></TextField>)}
                    isOptionEqualToValue={(option, value) => option.BEZEICHNUNG === value.BEZEICHNUNG}
                />
            </Grid>

            <Grid item xs={6}>
                <Button
                    fullWidth variant="outlined"
                    disabled={AUFTRAG != "" && AUFTRAGNEHMER != "" && Ebene2LoadNext != "x" && SPERREN != "" ? false : true} color={AUFTRAGGEBER_UNTERSCHRIFT != "" ? "success" : "primary"}
                    // onClick={handleClickOpen2}
                    onClick={() => save()}
                    variant="contained"
                >Bestätigen</Button>
            </Grid>
        </div>
        <div className={classes.g}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
                <Grid className={classes.h} item xs={6}>
                    <Stack>
                        <MobileDateTimePicker
                            ampm={false}
                            value={value}
                            onChange={(newValue) => {
                                setValue(newValue)
                            }}
                            label="Von"
                            inputFormat="yyyy/MM/dd HH:mm"

                            renderInput={(params) => <TextField size="small" onChange={e => setVon(e.target.value)} variant="outlined" {...params} />}
                        />
                    </Stack>
                </Grid>
                <Grid item xs={6}>
                    <Stack>
                        <MobileDateTimePicker
                            ampm={false}
                            label="24hours"
                            value={value1}
                            onChange={(newValue1) => {
                                setValue1(newValue1)
                            }}
                            label="Bis"
                            inputFormat="yyyy/MM/dd HH:mm"
                            renderInput={(params) => <TextField size="small" onChange={e => setBis(e.target.value)} variant="outlined" {...params} />}
                        />
                    </Stack>
                </Grid>
            </LocalizationProvider>
        </div>
        <div className={classes.g}>
            <Grid item xs={12}>
                <TextField size="small" multiline maxRows={4} fullWidth variant="outlined" label="Kommentar" onChange={e => setKOMMENTAR(e.target.value)}></TextField>
            </Grid>
        </div>
        <div className={classes.BTNGroup}>
            <Grid style={{ marginLeft: matchesMD == true ? '15%' : '', marginRight: matchesMD == true ? '15%' : '' }} item xs={12}>
            </Grid>
            <Grid style={{ marginLeft: matchesMD == true ? '20%' : '10%', marginRight: matchesMD == true ? '20%' : '10%' }} item xs={12}>
                <ThemeProvider theme={BTNTheme}>
                    <Button className={classes.CreateBTN} size='large' disabled={AUFTRAGGEBER_UNTERSCHRIFT != "null" ? false : true} variant="contained" onClick={() => { CREATE2(); MAIL(); handleClick1() }} color="primary">
                        <Typography variant="h6">Erstellen</Typography>
                    </Button>
                </ThemeProvider>
                <Snackbar open={open1} autoHideDuration={6000} onClose={handleClose1}>
                    <Alert severity="success">
                        <AlertTitle>Auftrag erstellt</AlertTitle>
                        20 Minuten Zeit zum Bestätigen
                    </Alert>
                </Snackbar>
            </Grid>
        </div>
    </Grid>
}
}
