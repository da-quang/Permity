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
console.log("--> Formular")

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function Formular() {

    const { query } = useRouter()
    const classes = useStyles();

    
    let [von, setVon] = useState(new Date())
    let [bis, setBis] = useState(new Date())
    let status = 'offen'
    let betreff = "Freigabe"
    let mailtext = "Bitte erledigen"

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
    const [x, setx] = useState("");
    const handleChange = e => {
        console.log(`${e.target.value}`);
        setx(e.target.value)
    };

    let VON = `${value.getFullYear()}.${value.getMonth() + 1}.${value.getDate()} ${value.getHours()}:${value.getMinutes()}`;
    let BIS = `${value1.getFullYear()}.${value1.getMonth() + 1}.${value1.getDate()} ${value1.getHours()}:${value1.getMinutes()}`;

    let [KSV, setKSV] = useState('')
    let [KOMMENTAR, setKOMMENTAR] = useState('')
    let [AUFTRAGNEHMER, setAUFTRAGNEHMER] = useState('')
    let [SPERREN, setSPERREN] = useState('')
    let [AUFTRAG, setAUFTRAG] = useState('')
    let [AUFTRAGGEBER_UNTERSCHRIFT, setAUFTRAGGEBER_UNTERSCHRIFT] = useState('null')

    let AUFTRAGGEBER = query.param2
        const CREATE2 = async () => {
        const response = await fetch(`https://palmiest-hornet-1388.dataplicity.io/api/api/Auftrag/create?ksv=${KSV}&auftrag=${AUFTRAG}&auftraggeber=${AUFTRAGGEBER}&auftragnehmer=${AUFTRAGNEHMER}&sperren=${SPERREN}&kommentar=${KOMMENTAR}&von=${VON}&bis=${BIS}&auftraggeber_unterschrift=${AUFTRAGGEBER_UNTERSCHRIFT}`, {
            method: 'POST'
        })
        const data = await response.json()
        console.log(data)
    }

    const MAIL = async () => {
        const getEmail = await fetch(`https://palmiest-hornet-1388.dataplicity.io/api/api/Mitarbeiter/email?kurzzeichenOrName=${AUFTRAGNEHMER}`, {
            method: 'GET'
        })
        const email = await getEmail.json()

        const response = await fetch(`https://palmiest-hornet-1388.dataplicity.io/api/api/Email/Send?email=${email[0].EMAIL}`, {
            method: 'POST'
        })

        console.log("Email wurde versendet")
    }

    const sigCanvasRef = useRef({});
    const clear = () => sigCanvasRef.current.clear();
    const save = () => {
        let base64 = sigCanvasRef.current.getTrimmedCanvas().toDataURL("image/png");
        let blob = dataURItoBlob(base64);
        const blobUrl = URL.createObjectURL(blob);
        setAUFTRAGGEBER_UNTERSCHRIFT(blobUrl);
        console.log("Unterschrift wurde gespeichert!")
    }
   
    function dataURItoBlob(dataURI) {
        // convert base64 to raw binary data held in a string
        // doesn't handle URLEncoded DataURIs - see SO answer #6850276 for code that does this
        var byteString = atob(dataURI.split(',')[1]);
    
        // separate out the mime component
        var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0]

        // write the bytes of the string to an ArrayBuffer
        var ab = new ArrayBuffer(byteString.length);
        var ia = new Uint8Array(ab);
        for (var i = 0; i < byteString.length; i++) {
            ia[i] = byteString.charCodeAt(i);
        }
        var blob = null;
        // TypeError old chrome and FF
        window.BlobBuilder = window.BlobBuilder || 
                             window.WebKitBlobBuilder || 
                             window.MozBlobBuilder || 
                             window.MSBlobBuilder;
        if(window.BlobBuilder){
             var bb = new BlobBuilder();
             bb.append(ab);
             blob = bb.getBlob(mimeString);
        }else{
             blob = new Blob([ab], {type : mimeString});
        }
        return blob;
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

    let [Ksv, setKsv] = useState('')

    useEffect(() => {
        fetch(`https://palmiest-hornet-1388.dataplicity.io/api/api/KSV/ksv`)
            .then((response) => response.json())
            .then((ksv) => setKsv(ksv));
    }, []);


    const Sperren = [{
        label: "Durchführungserlaubnis"}, {label: "Freigabe zur Arbeit"},
        {label: "Freigabe zur Sperre"}, {label: "Prüfungserlaubnis"
    }];

    return (
        <form>
            <div>
                <div className={classes.e}>
                    <div>
                        <Button color="inherit" className={classes.BTN}
                            id="basic-button"
                            aria-controls="basic-menu"
                            aria-haspopup="true"
                            aria-expanded={open ? 'true' : undefined}
                            onClick={handleClick}
                        >
                            <MenuIcon fontSize="large" />
                        </Button>
                        <Menu
                            id="basic-menu"
                            anchorEl={anchorEl}
                            open={open}
                            onClose={handleClose}
                            MenuListProps={{
                                'aria-labelledby': 'basic-button',
                            }}
                        >
                            <MenuItem onClick={() => router.push(`/mitarbeiter/login`)}><LogoutIcon />Logout </MenuItem>
                            <MenuItem onClick={() => router.back()}><HomeIcon />Startseite</MenuItem>
                        </Menu>
                    </div>
                    <Typography variant="h4" className={classes.typoh4}> Auftrag </Typography>
                    <Typography variant="h6" className={classes.typoh6}>{query.param}</Typography>
                </div>





            </div>
            <Grid>
                <div className={classes.g}>
                    <Grid className={classes.h} item xs={6}>
                        <TextField fullWidth variant="outlined" label="Auftrag Name" onChange={e => setAUFTRAG(e.target.value)}></TextField>
                    </Grid>
                    <Grid item xs={6}>
                        <TextField fullWidth variant="outlined" label="Auftragnehmer" onChange={e => setAUFTRAGNEHMER(e.target.value)}></TextField>
                    </Grid>
                </div>
                <div className={classes.g} >
                    <Grid className={classes.h} item xs={6}>
                        <Autocomplete
                            disablePortal
                            id="combo-box-demo"
                            options={Ksv}
                            getOptionLabel={(option) => option.KSV}
                            onChange={(event, value) => setKSV(value.KSV)}
                            renderInput={(params) => (<TextField {...params} variant="outlined" label="Ksv" ></TextField>)}
                            isOptionEqualToValue={(option, value) => option.KSV === value.KSV}
                        />
                    </Grid>
                    <Grid item xs={6}>
                    <Autocomplete
                            disablePortal
                            id="combo-box-demo"
                            options={Sperren}
                            getOptionLabel={(option) => option.label}
                            onChange={(event, value) => setSPERREN(value.label)}
                            renderInput={(params) => (<TextField {...params} variant="outlined" label="Sperre" ></TextField>)}
                            isOptionEqualToValue={(option, value) => option.label === value.label}
                        />
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
                                    renderInput={(params) => <TextField onChange={e => setVon(e.target.value)} variant="outlined" {...params} />}
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
                                    renderInput={(params) => <TextField onChange={e => setBis(e.target.value)} variant="outlined" {...params} />}
                                />
                            </Stack>
                        </Grid>
                    </LocalizationProvider>
                </div>
                <div className={classes.g}>
                    <Grid item xs={12}>
                        <TextField fullWidth variant="outlined" label="Kommentar" onChange={e => setKOMMENTAR(e.target.value)}></TextField>
                    </Grid>
                </div>
                <div className={classes.BTNGroup}>
                    <Grid item xs={12}>
                        <Popup modal trigger={

                            <Button size='large' className={classes.SignBTN} disabled={AUFTRAG != "" && AUFTRAGNEHMER != "" && KSV != "" && SPERREN != "" ? false : true} color={AUFTRAGGEBER_UNTERSCHRIFT != "null" ? "success" : "primary"} variant="contained">
                                <Typography variant="h6">Unterschreiben</Typography>
                            </Button>

                        } closeOnDocumentClick={false}>
                            {close => (
                                <div className={sigCanvas.signatureCanvas} >
                                    <SignaturePad
                                        ref={sigCanvasRef}
                                        canvasProps={
                                            {
                                                style: { border: 'solid', background: 'white', width: '100%', minHeight: '600px', marginBottom: '0px', }
                                            }
                                        } />
                                    <div className={classes.SignatureBTNRow}>
                                        <Button color="primary" variant="contained" onClick={close}>Zurück</Button>
                                        <Button color="primary" variant="contained" onClick={clear}>Leeren</Button>
                                        <Button color="primary" variant="contained" onClick={() => save()} >Speichern</Button>
                                    </div>
                                </div>
                            )}
                        </Popup>
                    </Grid>
                    <Grid item xs={12}>

                        <Button size='large' className={classes.CreateBTN} disabled={AUFTRAGGEBER_UNTERSCHRIFT != "null" ? false : true} variant="contained" onClick={() => { CREATE2(); MAIL(); handleClick1() }} color="primary">
                            <Typography variant="h6">Erstellen</Typography>
                        </Button>
                        <Snackbar open={open1} autoHideDuration={6000} onClose={handleClose1}>
                            <Alert severity="success">
                                <AlertTitle>Auftrag erstellt</AlertTitle>
                                20 Minuten Zeit zum Bestätigen
                            </Alert>
                        </Snackbar>


                    </Grid>
                </div>
            </Grid>
        </form>

    )
}





const useStyles = makeStyles({
    CreateBTN: {
        width: "80%",
        marginTop: "20%",

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
