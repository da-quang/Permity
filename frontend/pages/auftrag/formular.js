import {TextField, Grid, Fab, Link, Typography } from "@material-ui/core";
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
console.log("--> Formular")

export default function Formular() {

    const { query } = useRouter()
    const classes = useStyles();

    let [ksv, setKsv] = useState('')
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

    let VON = `${value.getFullYear()}.${value.getMonth() + 1}.${value.getDate()}`;
    let BIS = `${value1.getFullYear()}.${value1.getMonth() + 1}.${value1.getDate()}`;

    let [KSV, setKSV] = useState('')
    let [KOMMENTAR, setKOMMENTAR] = useState('')
    let [AUFTRAGNEHMER, setAUFTRAGNEHMER] = useState('')
    let [SPERREN, setSPERREN] = useState('')
    let [AUFTRAG, setAUFTRAG] = useState('')
    let [EMAIL, setEMAIL] = useState('')
    let [AUFTRAGGEBER_UNTERSCHRIFT, setAUFTRAGGEBER_UNTERSCHRIFT] = useState('')

    let AUFTRAGGEBER = query.param2

    const getEmail = async () => {
        const response = await fetch(`https://palmiest-hornet-1388.dataplicity.io/api/api/Mitarbeiter/email?kurzzeichenOrName=${AUFTRAGNEHMER}`, {
            method: 'GET'
        })
        const data = await response.json()
        setEMAIL(data[0].EMAIL)
        console.log(EMAIL)
        MAIL();
    }

    const CREATE2 = async () => {
        const response = await fetch(`https://palmiest-hornet-1388.dataplicity.io/api/api/Auftrag/create?ksv=${KSV}&auftrag=${AUFTRAG}&auftraggeber=${AUFTRAGGEBER}&auftragnehmer=${AUFTRAGNEHMER}&sperren=${SPERREN}&kommentar=${KOMMENTAR}&von=${VON}&bis=${BIS}&auftraggeber_unterschrift=${AUFTRAGGEBER_UNTERSCHRIFT}`, {
            method: 'POST'
        })
        const data = await response.json()
        console.log(data)
    }

    const MAIL = async () => {
        const response = await fetch(`https://palmiest-hornet-1388.dataplicity.io/api/api/Email/Send?email=${EMAIL}`, {
            method: 'POST'
        })
        const data = await response.json()

        console.log(data)
        Router.reload()
    }

    const sigCanvasRef = useRef({});
    const clear = () => sigCanvasRef.current.clear();
    const save = () => {
        //setAUFTRAGGEBER_UNTERSCHRIFT(sigCanvasRef.current.getTrimmedCanvas().toDataURL("image/png"))
        console.log(AUFTRAGGEBER_UNTERSCHRIFT)
    }
   

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

                <Box position="fixed" className={classes.Fab} sx={{ '& > :not(style)': { m: 1 } }}>
                    <Popup modal trigger={
                        <Fab variant="extended" color="primary" aria-label="add">
                            <CreateIcon /> Unterschreiben
                        </Fab>
                    }closeOnDocumentClick={false}>
                        {close => (
                            <div className={sigCanvas.signatureCanvas} >
                                <SignaturePad
                                    ref={sigCanvasRef}
                                    canvasProps={
                                        {
                                            style: { background: 'white', width: '100%', minHeight: '600px', marginBottom: '0px', }
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
                    <Fab variant="extended" onClick={() => {CREATE2(); getEmail()}} color="secondary" aria-label="add">
                        <AddIcon /> Erstellen
                    </Fab>
                </Box>
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
                    <TextField fullWidth variant="outlined" label="KSV" onChange={e => setKSV(e.target.value)}></TextField>
                </Grid>
                <Grid item xs={6}>
                    <TextField fullWidth variant="outlined" label="Sperren" onChange={e => setSPERREN(e.target.value)}></TextField>
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
            </Grid>
        </form>
    )
}





const useStyles = makeStyles({
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
