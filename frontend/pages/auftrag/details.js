import { useState } from "react";
import axios from 'axios';
import { useRouter } from 'next/router';
import { makeStyles } from '@mui/styles';
import Button from '@mui/material/Button';
import SaveIcon from '@mui/icons-material/Save';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import useSWR from "swr";
import MenuIcon from '@mui/icons-material/Menu';
import * as React from 'react';
import Fingerprint from '@mui/icons-material/Fingerprint';
import DeleteIcon from '@mui/icons-material/Delete';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import Box from '@mui/material/Box';
import Popup from 'reactjs-popup';
import Fab from "@material-ui/core/Fab";
import sigCanvas from '../startseite/sigCanvas.module.css';
import SignaturePad from "react-signature-canvas";
import { useRef } from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import LogoutIcon from '@mui/icons-material/Logout';
import HomeIcon from '@mui/icons-material/Home';
import { Divider, MenuList } from "@mui/material";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/styles';

const fetcher = (...args) => fetch(...args).then((response) => response.json())
console.log("--> Details")

const bull = (
    <Box
        component="span"
        sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
    >
        •
    </Box>
);

export default function Start() {
    const { query } = useRouter()
    const router = useRouter()
    let kurzzeichen = query.param;
    let id = query.param2;


    const theme = useTheme();
    const matchesMD = useMediaQuery(theme.breakpoints.up('md'));

    const [von, setVon] = useState();
    const [bis, setBis] = useState();
    const [AUFTRAGNEHMER_UNTERSCHRIFT, setAUFTRAGNEHMER_UNTERSCHRIFT] = useState('')

    const { data, error } = useSWR(`https://palmiest-hornet-1388.dataplicity.io/api/api/Auftrag/find?id=${id}`, fetcher);

    const sigCanvasRef = useRef({});
    const clear = () => sigCanvasRef.current.clear();
    const save = () => {
        let base64 = sigCanvasRef.current.getTrimmedCanvas().toDataURL("image/png");
        let blob = dataURItoBlob(base64);
        const blobUrl = URL.createObjectURL(blob);
        setAUFTRAGNEHMER_UNTERSCHRIFT(blob);
        console.log(base64)
        console.log("Unterschrift wurde gespeichert!")
    }


    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };


    console.log({ AUFTRAGNEHMER_UNTERSCHRIFT })


    const [signatureMode, setSignatureMode] = useState(false);

    function changeMode() {
        if (signatureMode == false) {
            setSignatureMode(true)
        } else {
            setSignatureMode(false)
        }
    }

    const classes = useStyles();

    const Delete = async auftragID => {
        const response = await fetch(`https://palmiest-hornet-1388.dataplicity.io/api/api/Auftrag/delete?id=${auftragID}`, {
            method: 'DELETE'
        })
        const data = await response.json()
        console.log(data)
    }

    const Update = async auftragID => {
        setAUFTRAGNEHMER_UNTERSCHRIFT('Hallo1234')

        const response = await fetch(`https://palmiest-hornet-1388.dataplicity.io/api/api/Auftrag/update?id=${auftragID}&status=Bestätigt&auftragnehmer_unterschrift=Leer`, {
            method: 'PUT'
        })
        const data = await response.json()
        console.log(data)
    }

    const Update2 = async auftragID => {
        const response = await fetch(`https://palmiest-hornet-1388.dataplicity.io/api/api/Auftrag/abgeschlossen?id=${auftragID}&auftragnehmer_unterschrift=Leer`, {
            method: 'PUT'
        })
        const data = await response.json()
        console.log(data)
    }

    const Mail = async auftragnehmer => {
        const getEmail = await fetch(`https://palmiest-hornet-1388.dataplicity.io/api/api/Mitarbeiter/email?name=${auftragnehmer}`, {
            method: 'GET'
        })
        const email = await getEmail.json()

        const sendEmail = await fetch(`https://palmiest-hornet-1388.dataplicity.io/api/api/Email/send?email=${email[0].EMAIL}`, {
            method: 'POST'
        })

        console.log("Email wurde versendet")
    }

    const Update3 = async auftragID => {
        const Update3 = await fetch(` https://palmiest-hornet-1388.dataplicity.io/api/api/Auftrag/resend?id=${auftragID}`, {
            method: 'PUT'

        })
        const data = await Update3.json()
    }


    
    return (

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
                            Details
                        </Typography>
                        <Button variant="outlined" size="small" color="inherit">{query.param}</Button>
                    </Toolbar>
                </AppBar>
            </Box>
        
        <div style={{marginLeft: matchesMD == true ? '4%' : '', marginRight: matchesMD == true ? '4%' : ''}}>

            
            {signatureMode == false ? <div>
                {data && data.map((auftrag) =>
                    <Card elevation={2} className={classes.container}>
                        <CardContent style={{ padding: "2px" }}>
                            <div className={classes.box}>
                                <div className={classes.contentInfo}>Id</div>
                                <div className={classes.contentInfo}>Auftrag</div>
                            </div>
                            <div className={classes.box2}>
                                <TextField style={{ marginRight: '5px' }} multiline className={classes.contentAuftrag} defaultValue={auftrag.ID} variant="filled" size="small" inputProps={{ readOnly: true, }} />
                                <TextField multiline className={classes.contentAuftrag} defaultValue={auftrag.AUFTRAG} variant="filled" size="small" inputProps={{ readOnly: true, }} />
                            </div>

                            <div className={classes.box}>
                                <div className={classes.contentInfo}>Ksv</div>
                                <div className={classes.contentInfo}>Sperren</div>
                            </div>
                            <div className={classes.box2}>
                                <TextField style={{ marginRight: '5px' }} multiline className={classes.contentAuftrag} defaultValue={auftrag.KSV} variant="filled" size="small" inputProps={{ readOnly: true, }} />
                                <TextField multiline className={classes.contentAuftrag} defaultValue={auftrag.SPERREN} variant="filled" size="small" inputProps={{ readOnly: true, }} />
                            </div>

                            <div className={classes.box}>
                                <div className={classes.contentInfo}>Von</div>
                                <div className={classes.contentInfo}>Bis</div>
                            </div>
                            <div className={classes.box2}>
                                <TextField fullWidth style={{ marginRight: '5px' }} className={classes.contentDate} defaultValue={auftrag.VON.split('T')[0].split('-')[2] + '-' + auftrag.VON.split('-')[1] + '-' + auftrag.VON.split('-')[0] + ' um ' + auftrag.VON.split('T')[1].split(':')[0] + ':' + auftrag.VON.split('T')[1].split(':')[1]} variant="filled" size="small" inputProps={{ readOnly: true, }} />
                                <TextField fullWidth className={classes.contentDate} defaultValue={auftrag.BIS.split('T')[0].split('-')[2] + '-' + auftrag.BIS.split('-')[1] + '-' + auftrag.BIS.split('-')[0] + ' um ' + auftrag.BIS.split('T')[1].split(':')[0] + ':' + auftrag.BIS.split('T')[1].split(':')[1]} variant="filled" size="small" inputProps={{ readOnly: true, }} />
                            </div>
                            <div className={classes.box}>

                            </div>
                            <div className={classes.box2}>

                            </div>

                            <div className={classes.box}>
                                <div className={classes.contentInfo}>Kommentar</div>
                            </div>
                            <div className={classes.box2}>
                                <TextField className={classes.contentKommentar} defaultValue={auftrag.KOMMENTAR} variant="filled" size="small" readOnly />
                            </div>

                            <div className={classes.box}>
                                <div className={classes.contentInfo}>Auftraggeber</div>
                                <div className={classes.contentInfo}>Auftragnehmer</div>
                            </div>
                            <div className={classes.box2}>
                                <TextField style={{ marginRight: '5px' }} className={classes.contentAuftrag} defaultValue={auftrag.AUFTRAGGEBER} variant="filled" size="small" inputProps={{ readOnly: true, }} />
                                <TextField className={classes.contentAuftrag} defaultValue={auftrag.AUFTRAGNEHMER} variant="filled" size="small" inputProps={{ readOnly: true, }} />
                            </div>
{/* 
                            <div className={classes.box}>
                                <div className={classes.contentInfo}>Unterschrift</div>
                                <div className={classes.contentInfo}>Unterschrift</div>
                            </div>
                            <div className={classes.box2}>
                                <img className={classes.unterschrift} src={auftrag.AUFTRAGGEBER_UNTERSCHRIFT} />

                                <img className={classes.unterschrift} src={auftrag.AUFTRAGNEHMER_UNTERSCHRIFT} />
                            </div> */}

                        </CardContent>
                        <Divider></Divider>
                        <CardActions style={{ display: 'flex' }}>
                            <Button className={(auftrag.AUFTRAGGEBER !== query.param3 || auftrag.AUFTRAGGEBER == auftrag.AUFTRAGNEHMER)  && auftrag.STATUS == "Offen"? null : classes.disabled} style={{ color: '#0000EE' }} size="medium">Bestätigen</Button>
                            <Button className={auftrag.AUFTRAGNEHMER == query.param3 && auftrag.AUFTRAGGEBER !== query.param3 && auftrag.STATUS == "Bestätigt" ? null : classes.disabled} style={{ color: '#0000EE' }} size="medium">Gesehen </Button>
                            <Button className={(auftrag.AUFTRAGNEHMER !== query.param3 && auftrag.AUFTRAGGEBER == query.param3) && auftrag.STATUS =="Bestätigt" ? null : classes.disabled } style={{ color: '#0000EE' }} size="medium">Abschließen</Button>
                            <Button className={auftrag.STATUS == "Nicht angenommen" || auftrag.STATUS == "Abgeschlossen" ? null : classes.disabled} style={{ color: '#0000EE' }} size="medium">Löschen</Button>
                            <Button className={(auftrag.AUFTRAGGEBER == query.param3 || auftrag.AUFTRAGNEHMER == auftrag.AUFTRAGGEBER) && auftrag.STATUS == "Nicht angenommen" ? null : classes.disabled } style={{ color: '#0000EE' }} size="medium">Erneut senden</Button>
                        </CardActions>
                    </Card>
                )}
                <div>


                </div>
            </div> : <div>
                <SignaturePad ref={sigCanvasRef}
                    canvasProps={
                        {
                            style: { border: 'solid', borderWidth: '7px', borderRadius: '5px', margin: 'auto', borderColor: '#143968', display: 'flex', alignContent: 's', background: '#e0e0e0', width: '90%', minHeight: '600px' }
                        }
                    } />
                <div className={classes.buttons}>
                    <Button color="primary" variant="contained" onClick={() => changeMode()}>Zurück</Button>
                    <Button color="primary" variant="contained" onClick={() => clear()}>Leeren</Button>
                    <Button color="primary" variant="contained" onClick={() => save()} >Speichern</Button>
                    <Button color="primary" variant="contained" onClick={() => unterschreiben()}>Unterschreiben</Button>
                </div>
            </div>}
        </div>
        </div>

        
    )
}

const useStyles = makeStyles({



    disabled: {
        display: 'none',
    },

    unterschrift: {
        width: '50%',
    },

    kopf: {
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

    kopfInfo: {
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

    container: {
        margin: 10,

        boxShadow: '0 0 10px rgba(0,0,0,0.3)',
    },

    contentInfo: {
        fontWeight: 'bold',
        width: '50%',
        fontSize: 18,
        paddingBottom: 7,
    },

    contentDate: {
        width: '55%',
        fontSize: 15,
        paddingBottom: 10,
        background: 'white',
        fontFamily: 'Arial'
    },

    contentKommentar: {
        width: '100%',
        fontSize: 15,
        paddingBottom: 10,
        background: 'white',
        fontFamily: 'Arial'
    },

    contentAuftrag: {
        width: '50%',
        fontSize: 15,
        background: 'white',
        fontFamily: 'Arial',
        color: 'green'
    },

    box: {
        display: 'flex',
        marginLeft: "10px",
    },

    box2: {
        display: 'flex',
        marginBottom: 20
    },

    buttons: {
        marginRight: 20,
        float: 'right'
    }
})
