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

export default function Formular() {

    const { query } = useRouter()
    const classes = useStyles();


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
    const [x, setx] = useState("");
    const handleChange = e => {
        console.log(`${e.target.value}`);
        setx(e.target.value)
    };
    value.setHours(7, 30)
    value1.setHours(16, 45)

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

        // const response = await fetch(`https://palmiest-hornet-1388.dataplicity.io/api/api/Auftrag/create?ksv=${KSV}&auftrag=${AUFTRAG}&auftraggeber=${AUFTRAGGEBER}&auftragnehmer=${AUFTRAGNEHMER}&sperren=${SPERREN}&kommentar=${KOMMENTAR}&von=${VON}&bis=${BIS}&auftraggeber_unterschrift=${AUFTRAGGEBER_UNTERSCHRIFT}`, {
        //     method: 'POST'
        // })
        // const data = await response.json()
        // console.log(data)

        const fd = new FormData();
        fd.append

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

        setAUFTRAGGEBER_UNTERSCHRIFT(sigCanvasRef.current.getTrimmedCanvas().toDataURL("image/png"))

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

    let [Ksv, setKsv] = useState('')

    // useEffect(() => {
    //     fetch(`https://palmiest-hornet-1388.dataplicity.io/api/api/KSV/ksv`)
    //         .then((response) => response.json())
    //         .then((ksv) => setKsv(ksv));
    // }, []);

    let [Name, setName] = useState('')

    useEffect(() => {
        fetch(`https://palmiest-hornet-1388.dataplicity.io/api/api/Mitarbeiter/all`)
            .then((response) => response.json())
            .then((name) => setName(name));
    }, []);


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

    let [KsvEbene1, setKsvEbene1] = useState('')
    let [KsvEbene2, setKsvEbene2] = useState('')

    console.log(KsvEbene1)
    console.log(KsvEbene2)

    useEffect(() => {
        fetch(`https://palmiest-hornet-1388.dataplicity.io/api/api/KSV/all?kurzzeichen=${query.param}`)
            .then((response) => response.json())
            .then((KsvALL) => setKsvALL(KsvALL));
    }, []);

    useEffect(() => {
        fetch(`https://palmiest-hornet-1388.dataplicity.io/api/api/KSV/select?ksv&ebene=3`)
            .then((response) => response.json())
            .then((ebene3) => setEbene3(ebene3));
    }, []);

    useEffect(() => {
        fetch(`https://palmiest-hornet-1388.dataplicity.io/api/api/KSV/select?ksv&ebene=4`)
            .then((response) => response.json())
            .then((ebene4) => setEbene4(ebene4));
    }, []);

    useEffect(() => {
        fetch(`https://palmiest-hornet-1388.dataplicity.io/api/api/KSV/select?ksv&ebene=5`)
            .then((response) => response.json())
            .then((ebene5) => setEbene5(ebene5));
    }, []);

    function loadEbene3() {
        setEbene3(ebene3.filter(item => item.KSV === KsvEbene2))
        console.log(ebene3)
    }

    //     ebene3 = ebene3.filter(item => ebene3.KSV.includes("VIW-14"))
  

    function scaleImage(dataUrl, scaleRatio, imageType, imageArguments, callback) {
        "use strict";
        var image, oldWidth, oldHeight, newWidth, newHeight, canvas, ctx, newDataUrl;

        // Provide default values
        imageType = imageType || "image/jpeg";
        imageArguments = imageArguments || 0.7;

        // Create a temporary image so that we can dimensions of new image.
        image = new Image();
        image.onload = function () {
            oldWidth = image.width;
            oldHeight = image.height;
            newWidth = Math.floor(oldWidth * scaleRatio);
            newHeight = Math.floor(oldHeight * scaleRatio);

            // Create a temporary canvas to draw the downscaled image on.
            canvas = document.createElement("canvas");
            canvas.width = newWidth;
            canvas.height = newHeight;

            // Draw the scaled image on the canvas and trigger the callback function.
            ctx = canvas.getContext("2d");
            ctx.drawImage(image, 0, 0, newWidth, newHeight);
            newDataUrl = canvas.toDataURL(imageType, imageArguments);
            callback(newDataUrl);
        }
        image.src = dataUrl;
    }

    console.log(ebene3)

    return (
        <form>
            <div>

                <Box sx={{ flexGrow: 1 }}>
                    <AppBar position="static" style={{ background: "#143968", borderBottomLeftRadius: "10px", borderBottomRightRadius: "10px" }}>
                        <Toolbar>
                            <IconButton
                                size="large"
                                edge="start"
                                color="inherit"
                                aria-label="menu"
                                sx={{ mr: 2 }}
                                onClick={handleClick}
                            >
                                <MenuIcon />
                            </IconButton>
                            <Menu
                                id="basic-menu"
                                anchorEl={anchorEl}
                                open={open}
                                onClose={handleClose}
                                MenuListProps={{
                                    'aria-labelledby': 'basic-button',
                                }}>
                                <MenuItem onClick={() => router.push(`/mitarbeiter/login`)}><LogoutIcon />Logout </MenuItem>
                                <MenuItem onClick={() => router.back()}><HomeIcon />Startseite</MenuItem>
                            </Menu>
                            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                                Auftrag
                            </Typography>
                            <Button variant="outlined" size="small" color="inherit">{query.param}</Button>
                        </Toolbar>
                    </AppBar>
                </Box>

            </div>
            <Grid>
                <div className={classes.g}>
                    <Grid className={classes.h} item xs={6}>
                        <TextField fullWidth variant="outlined" label="Auftrag Name" onChange={e => setAUFTRAG(e.target.value)}></TextField>
                    </Grid>
                    <Grid item xs={6}>
                        <Autocomplete
                            disablePortal
                            id="combo-box-demo"
                            options={Name}
                            getOptionLabel={(option) => option.NAME}
                            onChange={(event, value) => setAUFTRAGNEHMER(value.NAME)}
                            renderInput={(params) => (<TextField {...params} variant="outlined" label="Auftragnehmer" ></TextField>)}
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
                            renderInput={(params) => (<TextField {...params} variant="outlined" label="Sperre" ></TextField>)}
                            isOptionEqualToValue={(option, value) => option.label === value.label}
                        />
                    </Grid>

                    <Grid item xs={6}>
                        <Autocomplete
                            disablePortal
                            id="combo-box-demo"
                            options={KsvALL}
                            getOptionLabel={(option) => option.KSV}
                            onChange={(event, value) => setKSV(value.KSV)}
                            renderInput={(params) => (<TextField {...params} variant="outlined" label="Ksv 1" ></TextField>)}
                            isOptionEqualToValue={(option, value) => option.KSV === "value.KSV"}
                        />
                    </Grid>

                </div>
                <div className={classes.g}>
                    <Grid className={classes.h} item xs={6}>
                        <Autocomplete
                            disablePortal
                            id="combo-box-demo"
                            options={ebene3}
                            getOptionLabel={(option) => option.KSV}
                            onChange={(event, value) => {
                                if (value === null) { value = "" }; setKSV(value.KSV); loadEbene3();
                            }}
                            renderInput={(params) => (<TextField {...params} variant="outlined" label="Ksv 2" ></TextField>)}
                            isOptionEqualToValue={(option, value) => option.KSV === value.KSV}
                        />
                    </Grid>

                    <Grid item xs={6}>
                        <Autocomplete
                            disablePortal
                            id="combo-box-demo"
                            options={ebene4}
                            getOptionLabel={(option) => option.KSV}
                            onChange={(event, value) => {
                                if (value === null) { value = "" }; setKSV(value.KSV);
                            }}
                            renderInput={(params) => (<TextField {...params} variant="outlined" label="Ksv 3" ></TextField>)}
                            isOptionEqualToValue={(option, value) => option.KSV === value.KSV}
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
                        <TextField multiline maxRows={4} fullWidth variant="outlined" label="Kommentar" onChange={e => setKOMMENTAR(e.target.value)}></TextField>
                    </Grid>
                </div>
                <div className={classes.BTNGroup}>
                    <Grid item xs={12}>

                        <Button onClick={handleClickOpen2} size='large' className={classes.SignBTN} disabled={AUFTRAG != "" && AUFTRAGNEHMER != "" && KSV != "" && SPERREN != "" ? false : true} color={AUFTRAGGEBER_UNTERSCHRIFT != "null" ? "success" : "primary"} variant="contained">
                            <Typography variant="h6">Unterschreiben</Typography>
                        </Button>
                        <Dialog
                            fullScreen
                            open={open2}
                            onClose={handleClose2}
                            TransitionComponent={Transition}
                        >
                            <AppBar className={classes.Unterschrift} sx={{ position: 'relative' }}>
                                <Toolbar >
                                    <IconButton
                                        edge="start"
                                        color="inherit"
                                        onClick={handleClose2}
                                        aria-label="close"

                                    >
                                        <CloseIcon />
                                    </IconButton>
                                    <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                                        Unterschrift
                                    </Typography>
                                    <div className={classes.c}>
                                        <Button color="inherit" autoFocus onClick={clear}>Leeren</Button>
                                        <Button color="inherit" autoFocus onClick={() => save()}>Speichern</Button>
                                    </div>
                                </Toolbar>
                            </AppBar>
                            <>
                                <div className={sigCanvas.signatureCanvas} >
                                    <SignaturePad
                                        ref={sigCanvasRef}
                                        canvasProps={
                                            {
                                                style: { background: 'white', width: '100%', minHeight: '99%', border: 'solid' }
                                            }
                                        } />
                                </div>



                            </>
                        </Dialog>

                        {/* <Popup modal trigger={

                            <Button size='large' className={classes.SignBTN} disabled={AUFTRAG != "" && AUFTRAGNEHMER != "" && KSV != "" && SPERREN != "" ? false : true} color={AUFTRAGGEBER_UNTERSCHRIFT != "null" ? "success" : "primary"} variant="contained">
                                <Typography variant="h6">Unterschreiben</Typography>
                            </Button>

                        } closeOnDocumentClick={false}>
                            {close => (
                                <div className={sigCanvas.signatureCanvas} >
                                    <SignaturePad
                                        className={sigCanvas.signatureCanvas2}
                                        ref={sigCanvasRef}
                                        canvasProps={
                                            {
                                                style: { border: 'solid', background: 'white', width: '100%', minHeight: '400px', marginBottom: '0px', }
                                            }
                                        } />
                                    <div className={classes.SignatureBTNRow}>
                                        <Button color="primary" variant="contained" onClick={close}>Zurück</Button>
                                        <Button color="primary" variant="contained" onClick={clear}>Leeren</Button>
                                        <Button color="primary" variant="contained" onClick={() => save()} >Speichern</Button>
                                    </div>
                                </div>
                            )}
                        </Popup> */}
                    </Grid>
                    <Grid item xs={12}>
                        <ThemeProvider theme={BTNTheme}>
                            <Button sx={{ color: { sm: 'blue', md: 'red', lg: 'green' }, width: { sm: '80%', md: '60%', lg: '40%' }, marginTop: '80px' }} className={classes.CreateBTN} size='large' disabled={AUFTRAGGEBER_UNTERSCHRIFT != "null" ? false : true} variant="contained" onClick={() => { CREATE2(); MAIL(); handleClick1() }} color="primary">
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
        </form>

    )
}





const useStyles = makeStyles({
    CreateBTN: {
        width: "80%",
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
