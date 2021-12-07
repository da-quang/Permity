import { useRouter } from 'next/router';
import { makeStyles } from '@mui/styles';
import Button from '@mui/material/Button';;
import MenuIcon from '@mui/icons-material/Menu';
import { Fab, Link, Typography } from '@material-ui/core';
import AddIcon from '@mui/icons-material/Add';
import useSWR from "swr"
import CreateIcon from '@mui/icons-material/Create';
import DeleteIcon from '@mui/icons-material/Delete';
import Popup from "reactjs-popup";
import SignaturePad from "react-signature-canvas";
import Router from "next/router";
import "./sigCanvas.module.css";
import { minHeight } from '@mui/system';
import ReactSignatureCanvas from 'react-signature-canvas';
import sigCanvas from './sigCanvas.module.css';
import React, { useRef, useState } from "react";
import Toolbar from '@mui/material/Toolbar';
import LogoutIcon from '@mui/icons-material/Logout';
import HomeIcon from '@mui/icons-material/Home';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SearchIcon from '@mui/icons-material/Search';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Box from '@mui/material/Box';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import { Divider, ListItem, ListItemButton } from '@mui/material';

console.log("--> Startseite")

const fetcher = (...args) => fetch(...args).then((response) => response.json())
console.log("--> Übersicht")

// const [textColor, setTextColor] = useState('red');

// const handleChangeTextColor = (e) => {
//     setTextColor('FF0000');
// }

//Status ändern nach Speichern des Bildes

// updatedata() {
//     axios.put(`http://localhost:8090/api/Auftrag/update?id=52&status=Freigegeben"`)
//     .then((data) => {
//         console.log(data)
//     })
   
// }

export default function Startseite() {

    //Menü
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleSearchChange = (se) => {
        setfilter(se);
        setfilter2("");
    };



    //Filter
    const [anchorE2, setAnchorE2] = React.useState(null);
    const open2 = Boolean(anchorE2);
    const handleClick2 = (event) => {
        setAnchorE2(event.currentTarget);
    };
    const handleClose2 = () => {
        setAnchorE2(null);
    };

    const handleSearchChange2 = (se) => {
        setfilter("");
        setfilter2(se);
    };
    




    const [filter, setfilter] = useState("");
    const [filter2, setfilter2] = useState("");

    // Signatur
    const sigCanvasRef = useRef({});
    const clear = () => sigCanvasRef.current.clear();
    const save = () =>
        console.log(sigCanvasRef.current.getTrimmedCanvas().toDataURL("image/png"))
    // Signatur

    const { query } = useRouter()
    const router = useRouter()
    const classes = useStyles();


   


    let kurzzeichen = query.param
    let name = query.param2

    const { data, error } = useSWR(`http://localhost:8090/api/Auftrag/all?name=${name}`, fetcher)

    if (error) return <div>failed to load</div>
    if (!data) return <div>loading...</div>

    

    //Auftrag löschen
    const Delete = async auftragID => {
        const response = await fetch(`http://localhost:8090/api/Auftrag/delete?id=${auftragID}`, {
            method: 'DELETE'
        })
        const data = await response.json()
        console.log(data)
        Router.reload()
    }

    //Status des Auftrags ändern
    const Update = async auftragID => {
        const response = await fetch(`http://localhost:8090/api/Auftrag/update?id=${auftragID}&status=Freigegeben`, {
            method: 'PUT'
        })
        const data = await response.json()
        console.log(data)
        Router.reload()
    }
    
    

    return (
        // Blaue Fläche
        <form className={classes.h}>
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
                        <MenuItem onClick={() => router.push(`/Mitarbeiter/login?param`)} ><LogoutIcon />Logout </MenuItem>
                    </Menu>
                </div>

                <Typography variant="h4" className={classes.typoh4}> Startseite </Typography>
                <Typography variant="h6" className={classes.typoh6}>{query.param}</Typography>
            </div>


            <div className={classes.FilterAdd}>
                <Toolbar>
                    <div className={classes.searchContainer}>


                        <Button color="inherit" className={classes.BTN}
                            id="basic-button"
                            aria-controls="basic-menu"
                            aria-haspopup="true"
                            aria-expanded={open2 ? 'true' : undefined}
                            onClick={handleClick2}
                        >
                            <FilterAltIcon className={classes.searchIcon} /> <Typography> Filter </Typography>
                        </Button>
                        <Menu
                            id="basic-menu"
                            anchorEl={anchorE2}
                            open={open2}
                            onClose={handleClose2}
                            MenuListProps={{
                                'aria-labelledby': 'basic-button',
                            }}
                        >
                            <ListItem className={classes.ListItem}> <Button onClick={() => handleSearchChange2("")} onClick={() => handleSearchChange("")} variant="contained">Standard </Button></ListItem>
                            <Divider/>
                            <ListItem ><Typography> STATUS </Typography> </ListItem>
                            <ListItemButton> <Button onClick={() => handleSearchChange("offen")} variant="contained">Offen </Button></ListItemButton>
                            <ListItem> <Button onClick={() => handleSearchChange("Freigegeben")} variant="contained" >Freigegeben </Button></ListItem>
                            <ListItem> <Button onClick={() => handleSearchChange("Abgeschlossen")} variant="contained">Abgeschlossen</Button></ListItem>
                            <Divider/>
                            <ListItem> SPERREN </ListItem>
                            <ListItem> <Button onClick={() => handleSearchChange2("Durchführungserlaubnis")} variant="contained">Durchführungserlaubnis </Button></ListItem>
                            <ListItem> <Button onClick={() => handleSearchChange2("Freigabe zur Arbeit")} variant="contained">Freigabe zur Arbeit</Button></ListItem>
                            <ListItem> <Button onClick={() => handleSearchChange2("Freigabe zur Sperre")} variant="contained">Freigabe zur Sperre</Button></ListItem>
                            <ListItem> <Button onClick={() => handleSearchChange2("Prüfungserlaubnis")} variant="contained">Prüfungserlaubnis</Button></ListItem>
                        </Menu>


                        {/* <TextField onChange={handleSearchChange} label="Status suchen"variant="standard" className={classes.SearchInput} /> */}
                    </div>
                </Toolbar>





            </div>

            <div >
                {data && data.map((auftrag, id) => data[id].STATUS.includes(filter) && data[id].SPERREN.includes(filter2) && <ul className={auftrag.STATUS == "Abgeschlossen" ? classes.Abgeschlossen : auftrag.STATUS == "Freigegeben" ? classes.Freigegeben : auftrag.STATUS == "offen" ? classes.Offen : null} key={id}>

                    {/* //KarteikarteBegin */}
                    <details className={classes.details}>
                        <summary
                            className={classes.summary}


                        >{auftrag.ID} <a id="Erfüllen"></a>
                            <div className={classes.BTNROW}>
                                {/* SignaturBegin */}
                                <Popup modal trigger={<Button style={{ maxWidth: '40px', maxHeight: '40px', minWidth: '40px', minHeight: '40px' }} color="inherit">
                                    <CreateIcon />
                                </Button>}
                                    closeOnDocumentClick={false}
                                >
                                    {close => (
                                        <>
                                            <div className={sigCanvas.signatureCanvas} >
                                                <SignaturePad
                                                    ref={sigCanvasRef}
                                                    canvasProps={
                                                        {
                                                            style: { background: 'white', width: '300px', minHeight: '300px' }
                                                        }
                                                    } />
                                            </div>
                                            <Button variant="contained" onClick={close}>Zurück</Button>
                                            <Button variant="contained" onClick={clear}>Leeren</Button>
                                            <Button variant="contained" onClick={save} >Speichern</Button>
                                        </>
                                    )}

                                </Popup>
                                {/* SignaturEnd */}
                                <a className={auftrag.STATUS == "Abgeschlossen" ? classes.BTNClosed : auftrag.Status == "Freigegeben" ? classes.BTNClosed2 : null} >
                                    <Button onClick={() => Delete(auftrag.ID)} style={{ maxWidth: '40px', maxHeight: '40px', minWidth: '40px', minHeight: '40px' }} color="inherit">
                                        <DeleteIcon />
                                    </Button>
                                </a>
                            </div>
                        </summary>


                        {/* In der Karteikarte drinnen */}
                        <div className={classes.InsideCard}>
                            <Typography className={classes.p}>KSV: {auftrag.KSV}</Typography>
                            <Typography className={classes.p}>Auftraggeber: {auftrag.AUFTRAGGEBER}</Typography>
                            <Typography className={classes.p}>Auftragnehmer: {auftrag.AUFTRAGNEHMER}</Typography>
                            <Typography className={classes.p}>Sperren: {auftrag.SPERREN}</Typography>
                            <Typography className={classes.p}>Kommentar: {auftrag.KOMMENTAR}</Typography>
                            <Typography className={classes.p}>Status: {auftrag.STATUS}</Typography>

                        </div>
                    </details>
                    {/* //KarteikarteEnd */}
                </ul>)}
                {error && <div>Error fetching data.</div>}



            </div>
            <Box position="fixed" className={classes.Fab} sx={{ '& > :not(style)': { m: 1 } }}>
                <Fab className={classes.Fab} onClick={() => router.push(`/auftrag/formular?param=${kurzzeichen}`)} color="secondary" aria-label="add">
                    <AddIcon />
                </Fab>

            </Box>
        </form>
    )
}



const useStyles = makeStyles({
    a: {
        background: 'linear-gradient(45deg, #0288d1 30%, #03a9f4 90%)',
        borderRadius: 3,
        boxShadow: '0 2px 5px 2px rgba(70, 175, 219, .3)',
        color: 'white',
        height: 80,
        width: "70%",
        padding: '0 30px',
        textAlign: 'center',
        marginTop: 40,
        fontSize: 20,
    },

    searchContainer: {
        display: "flex",

        marginTop: "5px",
        marginBottom: "5px",
        width: "200px",
    },

    searchIcon: {
        alignSelf: "flex-end",
        marginBottom: "5px",
    },

    SearchInput: {
        width: "200px",

    },

    FilterAdd: {
        display: "flex",
        marginRight: "80%"

    },

    SignaturePad: {
        backgroundColor: 'grey',
    },

    BTNClosed: {
        display: 'none',
        background: "blue",
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
        paddingTop: 60,
        marginBottom: "5%",
        height: 110,
        color: 'white',
        borderBottomLeftRadius: 15,
        borderBottomRightRadius: 15,
        justifyContent: 'space-between',
        display: 'flex',
    },



    g: {
        borderBottomLeftRadius: 15,
        borderBottomRightRadius: 15,
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
        background: '#143968',
        marginRight: "10%",
        marginLeft: "10%",
        color: "white",
    },



    summary: {
        fontWeight: "bold",
        height: 45,
        lineHeight: 3,
        display: "flex",
        justifyContent: 'space-between',



    },

    Offen: {
        borderBottomLeftRadius: 15,
        borderBottomRightRadius: 15,
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
        background: '#143968',
        marginRight: "10%",
        marginLeft: "10%",
        color: "white",
        backgroundColor: "red",



    },

    Freigegeben: {
        borderBottomLeftRadius: 15,
        borderBottomRightRadius: 15,
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
        background: '#143968',
        marginRight: "10%",
        marginLeft: "10%",
        color: "white",
        backgroundColor: "orange",


    },

    Abgeschlossen: {
        borderBottomLeftRadius: 15,
        borderBottomRightRadius: 15,
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
        background: '#143968',
        marginRight: "10%",
        marginLeft: "10%",
        color: "white",
        backgroundColor: "green",


    },
    p: {
        borderBottom: "solid",
        width: "85%",
        marginTop: 10,


    },


})

