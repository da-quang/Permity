import { useRouter } from 'next/router';
import { makeStyles } from '@mui/styles';
import Button from '@mui/material/Button';;
import MenuIcon from '@mui/icons-material/Menu';
import Typography from '@mui/material/Typography';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import useSWR from "swr";
import CreateIcon from '@mui/icons-material/Create';
import DeleteIcon from '@mui/icons-material/Delete';
import SignaturePad from "react-signature-canvas";
import Router from "next/router";
import "./sigCanvas.module.css";
import sigCanvas from './sigCanvas.module.css';
import React, { useRef, useState } from "react";
import LogoutIcon from '@mui/icons-material/Logout';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Box from '@mui/material/Box';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import { ListItem } from '@mui/material';
import Slide from '@mui/material/Slide';
import Popup from 'reactjs-popup';
import HowToRegIcon from '@mui/icons-material/HowToReg';
import DoubleArrowIcon from '@mui/icons-material/DoubleArrow';
import IconButton from '@mui/material/IconButton';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';




console.log("--> Startseite")

const fetcher = (...args) => fetch(...args).then((response) => response.json())
console.log("--> Übersicht")

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function Startseite() {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const [openModal, setOpenModal] = useState(false)
    const [filterOnOff, setfilterOnOff] = useState(false)
    const [filter, setfilter] = useState("");
    const [filter2, setfilter2] = useState("");
    const [filter3, setfilter3] = useState("");
    const [AUFTRAGNEHMER_UNTERSCHRIFT, setAUFTRAGNEHMER_UNTERSCHRIFT] = useState('');


    const handleSearchChange3 = (se) => {
        setfilter3(se)

    };

    const [anchorE2, setAnchorE2] = React.useState(null);
    const open2 = Boolean(anchorE2);
    const handleClick2 = (event) => {
        setAnchorE2(event.currentTarget);
    };
    const handleClose2 = () => {
        setAnchorE2(null);
    };

    const handleSearchChange2 = (se) => {
        if (filter2 == se) {
            setfilter2("");
        }
        else {
            setfilter2(se);
        }
    };
    const handleSearchChange = (se) => {
        if (filter == se) {
            setfilter("");
        }
        else {
            setfilter(se);
        }
    };

    const sigCanvasRef = useRef({});
    const clear = () => sigCanvasRef.current.clear();
    const save = () => {
        let base64 = sigCanvasRef.current.getTrimmedCanvas().toDataURL("image/png");
        let blob = dataURItoBlob(base64);
        const blobUrl = URL.createObjectURL(blob);
        setAUFTRAGNEHMER_UNTERSCHRIFT(blobUrl);
        console.log("Unterschrift wurde gespeichert!")
    }

    const { query } = useRouter()
    const router = useRouter()
    const classes = useStyles();

    let kurzzeichen = query.param
    let name = query.param2

    const { data, error } = useSWR(`https://palmiest-hornet-1388.dataplicity.io/api/api/Auftrag/all?name=${name}`, fetcher)

    if (error) return <div>failed to load</div>
    if (!data) return <div>loading...</div>

    const Delete = async auftragID => {
        const response = await fetch(`https://palmiest-hornet-1388.dataplicity.io/api/api/Auftrag/delete?id=${auftragID}`, {
            method: 'DELETE'
        })
        const data = await response.json()
        console.log(data)
        Router.reload()
    }

    const Update = async auftragID => {
        const response = await fetch(`https://palmiest-hornet-1388.dataplicity.io/api/api/Auftrag/update?id=${auftragID}&status=Bestätigt&auftragnehmer_unterschrift=${AUFTRAGNEHMER_UNTERSCHRIFT}`, {
            method: 'PUT'
        })
        console.log(AUFTRAGNEHMER_UNTERSCHRIFT)
    }

    const Update2 = async auftragID => {
        const response = await fetch(`https://palmiest-hornet-1388.dataplicity.io/api/api/Auftrag/abgeschlossen?id=${auftragID}&status=Abgeschlossen`, {
            method: 'PUT'
        })
        const data = await response.json()
        console.log(data)

    }

    const handleOpenModal = () => setOpenModal(true);
    const handleCloseModal = () => setOpenModal(false);

    function x() {
        console.log("Hallo")
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
        if (window.BlobBuilder) {
            var bb = new BlobBuilder();
            bb.append(ab);
            blob = bb.getBlob(mimeString);
        } else {
            blob = new Blob([ab], { type: mimeString });
        }
        return blob;
    }

    return (

        <form style={{ background: 'white' }} className={classes.h}>
            <Box position="fixed" className={classes.Fab} sx={{ '& > :not(style)': { m: 1 } }}>
                <Fab onClick={() => router.push(`/auftrag/formular?param=${kurzzeichen}&param2=${name}`)} aria-label="add" color="primary">
                    <AddIcon />
                </Fab>
            </Box>

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
                        }}>
                        <MenuItem onClick={() => router.push(`/mitarbeiter/login`)} ><LogoutIcon />Logout </MenuItem>
                    </Menu>
                </div>
                <Typography variant="h4" className={classes.typoh4}> Startseite </Typography>
                <Typography variant="h6" className={classes.typoh6}>{query.param}</Typography>
            </div>
           
                <div className={classes.FilterAdd}>
                    <div className={classes.searchContainer}>
                        <Button style={{ marginTop: '10%' }} color="inherit" className={classes.BTN}
                            id="basic-button"
                            aria-controls="basic-menu"
                            aria-haspopup="true"
                            aria-expanded={open2 ? 'true' : undefined}
                            onClick={handleClick2}>
                            <FilterAltIcon className={classes.searchIcon} /> <Typography> Filter </Typography>
                        </Button>
                        <Menu
                            id="basic-menu"
                            anchorEl={anchorE2}
                            open={open2}
                            onClose={handleClose2}
                            MenuListProps={{
                                'aria-labelledby': 'basic-button',
                            }}>
                            <ListItem background='red'> <Typography variant='h6' fontWeight='bold' > STATUS </Typography></ListItem>
                            <ListItem> <Button className={filter == "Offen" ? classes.BTNDisabled : classes.BTNEnabled} onClick={() => handleSearchChange("Offen")} variant="contained">Offen </Button></ListItem>
                            <ListItem> <Button className={filter == "Bestätigt" ? classes.BTNDisabled : classes.BTNEnabled} onClick={() => handleSearchChange("Bestätigt")} variant="contained" >Bestätigt </Button></ListItem>
                            <ListItem> <Button className={filter == "Abgeschlossen" ? classes.BTNDisabled : classes.BTNEnabled} onClick={() => handleSearchChange("Abgeschlossen")} variant="contained">Abgeschlossen</Button></ListItem>
                            <ListItem> <Button className={filter == "Nicht angenommen" ? classes.BTNDisabled : classes.BTNEnabled} onClick={() => handleSearchChange("Nicht angenommen")} variant="contained">Nicht angenommen</Button></ListItem>

                            <ListItem><Typography variant='h6' fontWeight='bold' > SPERREN </Typography></ListItem>
                            <ListItem> <Button className={filter2 == "Durchführungserlaubnis" ? classes.BTNDisabled : classes.BTNEnabled} onClick={() => handleSearchChange2("Durchführungserlaubnis")} variant="contained">Durchführungserlaubnis </Button></ListItem>
                            <ListItem> <Button className={filter2 == "Freigabe zur Arbeit" ? classes.BTNDisabled : classes.BTNEnabled} onClick={() => handleSearchChange2("Freigabe zur Arbeit")} variant="contained">Freigabe zur Arbeit</Button></ListItem>
                            <ListItem> <Button className={filter2 == "Freigabe zur Sperre" ? classes.BTNDisabled : classes.BTNEnabled} onClick={() => handleSearchChange2("Freigabe zur Sperre")} variant="contained">Freigabe zur Sperre</Button></ListItem>
                            <ListItem> <Button className={filter2 == "Prüfungserlaubnis" ? classes.BTNDisabled : classes.BTNEnabled} onClick={() => handleSearchChange2("Prüfungserlaubnis")} variant="contained">Prüfungserlaubnis</Button></ListItem>
                        </Menu>
                    </div>
                </div>


                <div className={classes.SummaryWrapper}>
                    <Accordion style={{ marginLeft: '3%', marginRight: '3%', padding: '0%', borderRadius: '15px', backgroundColor: '#143968', color: 'white' }}>
                        <AccordionSummary

                            expandIcon={<ExpandMoreIcon style={{ color: 'white' }} />}
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                        >
                            <Typography style={{ fontWeight: 'bold' }}>Offen</Typography>
                        </AccordionSummary>
                        <AccordionDetails style={{ padding: '0px' }}>
                            {data && data.map((auftrag, id) => <a key={id}>
                                {auftrag.STATUS == "Offen" &&
                                    <div className={classes.Offen}>
                                        <details className={classes.details}>
                                            <summary className={classes.summary}>
                                                {auftrag.ID} | {auftrag.AUFTRAG}
                                                <Popup modal trigger={
                                                    <a className={auftrag.AUFTRAGGEBER == query.param2 ? classes.Check : null}>
                                                        <IconButton style={{ float: 'right', maxWidth: '40px', maxHeight: '40px', minWidth: '40px', minHeight: '40px' }} color="inherit">
                                                            <CreateIcon />
                                                        </IconButton>
                                                    </a>
                                                } closeOnDocumentClick={false}>
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
                                                                <Button variant="contained" onClick={close}>Zurück</Button>
                                                                <Button variant="contained" onClick={clear}>Leeren</Button>
                                                                <Button variant="contained" onClick={() => { Update(auftrag.ID); save }} >Speichern</Button>
                                                            </div>
                                                        </div>
                                                    )}
                                                </Popup>
                                            </summary>
                                            <div className={classes.InsideCard}>
                                                <Typography> <a style={{ fontWeight: "bold" }}>KSV:</a> {auftrag.KSV}</Typography>
                                                <Typography> <a style={{ fontWeight: "bold" }}>Auftraggeber: </a> {auftrag.AUFTRAGGEBER}</Typography>
                                                <Typography> <a style={{ fontWeight: "bold" }}>Auftragnehmer: </a> {auftrag.AUFTRAGNEHMER}</Typography>
                                                <Typography> <a style={{ fontWeight: "bold" }}>Sperren: </a> {auftrag.SPERREN}</Typography>
                                                <div style={{ marginBottom: 30 }}>
                                                    <Button onClick={() => router.push(`/auftrag/details?param=${kurzzeichen}&param2=${auftrag.ID}`)} style={{ position: 'absolute', right: 45, color: 'white' }}>
                                                        Details <DoubleArrowIcon />
                                                    </Button>
                                                </div>
                                            </div>
                                        </details>
                                    </div>}
                            </a>)}
                        </AccordionDetails>
                    </Accordion>

                    <div className={classes.br}></div>

                </div>

                <div className={classes.SummaryWrapper}>
                    <Accordion style={{ marginLeft: '3%', marginRight: '3%', padding: '0%', borderRadius: '15px', backgroundColor: '#143968', color: 'white' }}>
                        <AccordionSummary

                            expandIcon={<ExpandMoreIcon style={{ color: 'white' }} />}
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                        >
                            <Typography style={{ fontWeight: 'bold' }}>Bestätigt</Typography>
                        </AccordionSummary>
                        <AccordionDetails style={{ padding: '0px' }}>
                            {data && data.map((auftrag, id) => <a key={id}>
                                {auftrag.STATUS == "Bestätigt" &&
                                    <div className={classes.Bestätigt}>
                                        <details className={classes.details}>
                                            <summary className={classes.summary}>
                                                {auftrag.ID} | {auftrag.AUFTRAG}
                                                <a className={auftrag.AUFTRAGNEHMER == query.param2 ? classes.Check : null}>
                                                    <IconButton onClick={() => Update2(auftrag.ID)} style={{ float: 'right', maxWidth: '40px', maxHeight: '40px', minWidth: '40px', minHeight: '40px' }} color="inherit">
                                                        <HowToRegIcon />
                                                    </IconButton>
                                                </a>
                                            </summary>
                                            <div className={classes.InsideCard}>
                                                <Typography> <a style={{ fontWeight: "bold" }}>KSV:</a> {auftrag.KSV}</Typography>
                                                <Typography> <a style={{ fontWeight: "bold" }}>Auftraggeber: </a> {auftrag.AUFTRAGGEBER}</Typography>
                                                <Typography> <a style={{ fontWeight: "bold" }}>Auftragnehmer: </a> {auftrag.AUFTRAGNEHMER}</Typography>
                                                <Typography> <a style={{ fontWeight: "bold" }}>Sperren: </a> {auftrag.SPERREN}</Typography>
                                                <div style={{ marginBottom: 30 }}>
                                                    <Button onClick={() => router.push(`/auftrag/details?param=${kurzzeichen}&param2=${auftrag.ID}`)} style={{ position: 'absolute', right: 45, color: 'white' }}>
                                                        Details <DoubleArrowIcon />
                                                    </Button>
                                                </div>
                                            </div>
                                        </details>
                                    </div>}
                            </a>)}
                        </AccordionDetails>
                    </Accordion>
                    <div className={classes.br}></div>

                </div>

                <div className={classes.SummaryWrapper}>
                    <Accordion style={{ marginLeft: '3%', marginRight: '3%', padding: '0%', borderRadius: '15px', backgroundColor: '#143968', color: 'white' }}>
                        <AccordionSummary

                            expandIcon={<ExpandMoreIcon style={{ color: 'white' }} />}
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                        >
                            <Typography style={{ fontWeight: 'bold' }}>Abgelehnt</Typography>
                        </AccordionSummary>
                        <AccordionDetails style={{ padding: '0px' }}>
                            {data && data.map((auftrag, id) => <a style={{ listStyleType: 'none' }} key={id}>
                                {auftrag.STATUS == "Nicht angenommen" &&
                                    <div className={classes.Abgelehnt}>
                                        <details className={classes.details}>
                                            <summary className={classes.summary}>
                                                {auftrag.ID} | {auftrag.AUFTRAG}
                                                <a className={auftrag.STATUS == "Offen" || auftrag.STATUS == "Bestätigt" ? classes.SummaryBTNDisabled : null}>
                                                    <IconButton onClick={() => Delete(auftrag.ID)} style={{ float: 'right', maxWidth: '40px', maxHeight: '40px', minWidth: '40px', minHeight: '40px' }} color="inherit">
                                                        <DeleteIcon />
                                                    </IconButton>
                                                </a>
                                            </summary>
                                            <div className={classes.InsideCard}>
                                                <Typography> <a style={{ fontWeight: "bold" }}>KSV:</a> {auftrag.KSV}</Typography>
                                                <Typography> <a style={{ fontWeight: "bold" }}>Auftraggeber: </a> {auftrag.AUFTRAGGEBER}</Typography>
                                                <Typography> <a style={{ fontWeight: "bold" }}>Auftragnehmer: </a> {auftrag.AUFTRAGNEHMER}</Typography>
                                                <Typography> <a style={{ fontWeight: "bold" }}>Sperren: </a> {auftrag.SPERREN}</Typography>
                                                <div style={{ marginBottom: 30 }}>
                                                    <Button onClick={() => router.push(`/auftrag/details?param=${kurzzeichen}&param2=${auftrag.ID}`)} style={{ position: 'absolute', right: 45, color: 'white' }}>
                                                        Details <DoubleArrowIcon />
                                                    </Button>
                                                </div>
                                            </div>
                                        </details>
                                    </div>}
                            </a>)}
                        </AccordionDetails>
                    </Accordion>
                    <div className={classes.br}></div>

                </div>

                <div className={classes.SummaryWrapper}>
                    <Accordion style={{ marginLeft: '3%', marginRight: '3%', padding: '0%', borderRadius: '15px', backgroundColor: '#143968', color: 'white' }}>
                        <AccordionSummary

                            expandIcon={<ExpandMoreIcon style={{ color: 'white' }} />}
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                        >
                            <Typography style={{ fontWeight: 'bold' }}>Abgeschlossen</Typography>
                        </AccordionSummary>
                        <AccordionDetails style={{ padding: '0px' }}>
                            {data && data.map((auftrag, id) => <a key={id}>
                                {auftrag.STATUS == "Abgeschlossen" &&
                                    <div className={classes.Abgeschlossen}>
                                        <details className={classes.details}>
                                            <summary className={classes.summary}>
                                                {auftrag.ID} | {auftrag.AUFTRAG}
                                                <IconButton onClick={() => Delete(auftrag.ID)} style={{ float: 'right', maxWidth: '40px', maxHeight: '40px', minWidth: '40px', minHeight: '40px' }} color="inherit">
                                                    <DeleteIcon />
                                                </IconButton>
                                            </summary>
                                            <div className={classes.InsideCard}>
                                                <Typography> <a style={{ fontWeight: "bold" }}>KSV:</a> {auftrag.KSV}</Typography>
                                                <Typography> <a style={{ fontWeight: "bold" }}>Auftraggeber: </a> {auftrag.AUFTRAGGEBER}</Typography>
                                                <Typography> <a style={{ fontWeight: "bold" }}>Auftragnehmer: </a> {auftrag.AUFTRAGNEHMER}</Typography>
                                                <Typography> <a style={{ fontWeight: "bold" }}>Sperren: </a> {auftrag.SPERREN}</Typography>
                                                <div style={{ marginBottom: 30 }}>
                                                    <Button onClick={() => router.push(`/auftrag/details?param=${kurzzeichen}&param2=${auftrag.ID}`)} style={{ position: 'absolute', right: 45, color: 'white' }}>
                                                        Details <DoubleArrowIcon />
                                                    </Button>
                                                </div>
                                            </div>
                                        </details>
                                    </div>}
                            </a>)}
                        </AccordionDetails>
                    </Accordion>
                   

                </div>

                {error && <div>Error fetching data.</div>}
            

        </form>

    )
}

const useStyles = makeStyles({
    br: {
        marginBottom: 40,
    },

    FilterAdd: {

        marginBottom: "10%",
        display: "flex",
        marginLeft: "10%",
        marginRight: "10%",
        justifyContent: 'space-between',
    },

    SignatureBTNRow: {
        display: "flex",
        textAlign: "center",
        margin: "auto",
        justifyContent: "center",
    },

    Check: {
        display: 'none',
    },

    BTNEnabled: {
        background: 'linear-gradient(45deg, #143968 30%, #143968 90%)',
    },

    BTNDisabled: {
        background: 'linear-gradient(90deg, rgba(212,25,25,1) 38%, rgba(212,25,25,1) 100%)',
    },

    SummaryBTNDisabled: {
        display: 'none',
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

    b: {
        height: 40,
        width: 280,
        padding: '0 30px',
    },

    c: {
        marginLeft: "30%",
        textAlign: "center",
    },



    d: {
        color: "green",
        textAlign: 'center',
        marginTop: 40,
    },

    z: {
        background: "grey",
        height: 30,
        width: "100%",
        borderRadius: 15,
        marginLeft: 40,
        marginRight: 40,
    },

    e: {
        background: 'linear-gradient(45deg, #143968 30%, #143968 90%)',
        boxShadow: '0 3px 5px 2px rgba(20, 57, 104, .3)',
        marginTop: 0,
        paddingTop: 15,

        height: 60,
        color: 'white',
        borderBottomLeftRadius: 15,
        borderBottomRightRadius: 15,
        justifyContent: 'space-between',
        display: 'flex',
    },

    Unterschrift: {
        background: 'linear-gradient(45deg, #143968 30%, #143968 90%)',
        borderBottomLeftRadius: 15,
        borderBottomRightRadius: 15,
    },

    summary: {
        lineHeight: '2.5',
        justifyContent: 'space-between',
        fontWeight: "bold",
    },

    summary2: {
        marginTop: "5%",
        marginRight: "5%",
        marginLeft: "5%",
        lineHeight: '2.5',
        justifyContent: 'space-between',
        fontWeight: "bold",
        borderRadius: 15,
        background: "#143968",
    },

    Summary2Txt: {
        marginLeft: "8%",

    },


    SummaryWrapper: {
        borderRadius: 15,
        color: "white",
    },



    Status: {
        paddingLeft: 15,
        paddingTop: 7,
    },

    Offen: {
        paddingLeft: 15,
        marginLeft: '5%',
        marginRight: '5%',
        borderRadius: 15,
        background: '#2163b8',
        color: "white",
        marginBottom: "3%"
    },

    Bestätigt: {
        paddingLeft: 15,
        marginLeft: '5%',
        marginRight: '5%',
        borderRadius: 15,
        background: '#1DB954',
        color: "white",
        marginBottom: "3%"
    },


    Abgeschlossen: {
        paddingLeft: 15,
        marginLeft: '5%',
        marginRight: '5%',
        borderRadius: 15,
        background: '#4a4a49',
        color: "white",
        marginBottom: "3%"
    },

    Abgelehnt: {
        paddingLeft: 15,
        marginLeft: '5%',
        marginRight: '5%',
        borderRadius: 15,
        background: '#c92a35',
        color: "white",
        marginBottom: "3%"
    },

    Details: {
        color: "white",
    },

    InsideCard: {
        paddingBottom: 10,
    },


})
