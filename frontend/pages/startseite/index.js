import { useRouter } from 'next/router';
import { makeStyles } from '@mui/styles';
import Button from '@mui/material/Button';
import MenuIcon from '@mui/icons-material/Menu';
import Typography from '@mui/material/Typography';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import useSWR, { mutate, SWRConfig } from "swr";
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
import { Divider, ListItem, TextField } from '@mui/material';
import Slide from '@mui/material/Slide';
import Popup from 'reactjs-popup';
import HowToRegIcon from '@mui/icons-material/HowToReg';
import DoubleArrowIcon from '@mui/icons-material/DoubleArrow';
import IconButton from '@mui/material/IconButton';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Dialog from '@mui/material/Dialog';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import CloseIcon from '@mui/icons-material/Close';
import { setISODay } from 'date-fns';
import AssignmentOutlinedIcon from '@mui/icons-material/AssignmentOutlined';
import Badge from '@mui/material/Badge';
import { Unterschrift } from '../auftrag/Unterschrift'
import Tooltip from '@mui/material/Tooltip';
import { styled } from '@mui/material/styles';
import StarIcon from '@mui/icons-material/Star';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import SearchIcon from '@mui/icons-material/Search';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import PublishedWithChangesIcon from '@mui/icons-material/PublishedWithChanges';
import { useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/styles';

import Tab1 from '../../components/Tab';
import Tab2 from '../../components/Tab2';
import Appbar from '../../components/AppBars'
import AddAuftrag from '../../components/AddAuftrag'


const StyledBadge = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
        right: 12,
        top: 12,
        border: `2px solid ${theme.palette.background.paper}`,
        padding: '0 4px',
    },
}));

const fetcher = (...args) => fetch(...args).then((response) => response.json())
console.log("--> Übersicht")

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});



export default function Startseite() {

    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.down('sm'));
    console.log(matches)

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    


    const handleSearchChange3 = e => {
        console.log(e.target.value)
        setfilter3(e.target.value)

    };

    const handleSearchChange4 = e => {
        console.log(e.target.value)
        setfilter4(e.target.value)

    };

    const handleSearchChange5 = e => {
        console.log(e.target.value)
        setfilter5(e.target.value)

    };

    const [Id, setId] = useState("");

    const [open3, setOpen3] = useState(false);

    const handleClickOpen3 = () => {
        setOpen3(true);
    };

    const handleClose3 = () => {
        setOpen3(false);
    };


    const [anchorEl, setAnchorEl] = React.useState(null);
    const [anchorE2, setAnchorE2] = React.useState(null);
    const open = Boolean(anchorEl);
    const open2 = Boolean(anchorE2);
    const handleClick2 = (event) => {
        setAnchorE2(event.currentTarget);
    };
    const handleClose2 = () => {
        setAnchorE2(null);
    };


    //<Filter>
    const [filter, setfilter] = useState("");
    const [filter2, setfilter2] = useState("");
    const [filter3, setfilter3] = useState("");
    const [filter4, setfilter4] = useState("");
    const [filter5, setfilter5] = useState("");

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
    //</Filter>


    //<Unterschrift>
    const [AUFTRAGNEHMER_UNTERSCHRIFT, setAUFTRAGNEHMER_UNTERSCHRIFT] = useState('');

    const sigCanvasRef = useRef({});
    const clear = () => sigCanvasRef.current.clear();
    const save = () => {

        setAUFTRAGNEHMER_UNTERSCHRIFT(sigCanvasRef.current.getTrimmedCanvas().toDataURL("image/png"))
        Update()
    }
    //</Unterschrift>


    const { query } = useRouter()
    const router = useRouter()
    const classes = useStyles();

    let kurzzeichen = query.param
    let name = query.param2


    //<Fetchen der Daten für die Karten>
    const { data, error } = useSWR(`https://palmiest-hornet-1388.dataplicity.io/api/api/Auftrag/all?name=${name}`, fetcher)

    if (error) return <div>failed to load</div>
    if (!data) return <div>loading...</div>
    //data = data.sort((a,b) => a.ID - b.ID);
    //<Fetchen der Daten für die Karten>

    console.log(data)
    // console.log(data.sort((a, b) => a.VON.split('T')[0] - b.VON.split('T')[0]))
    // console.log(data.sort((a, b) => a.ID - b.ID))

    //<Löschen>
    const Delete = async auftragID => {
        const response = await fetch(`https://palmiest-hornet-1388.dataplicity.io/api/api/Auftrag/delete?id=${auftragID}`, {
            method: 'DELETE'
        })
        const data = await response.json()
        console.log(data)

        mutate(`https://palmiest-hornet-1388.dataplicity.io/api/api/Auftrag/all?name=${name}`)
    }
    //</Löschen>



    //<Unterschrift Status updaten>
    const Update = async auftragID => {

        const response = await fetch(`https://palmiest-hornet-1388.dataplicity.io/api/api/Auftrag/update?id=${Id}&status=Bestätigt&auftragnehmer_unterschrift=${AUFTRAGNEHMER_UNTERSCHRIFT}`, {
            method: 'PUT'
        })
        const data = await response.json()
        console.log(data)

        console.log(AUFTRAGNEHMER_UNTERSCHRIFT)

        // fetch('https://palmiest-hornet-1388.dataplicity.io/api/api/Auftrag/update', {
        //     method: 'PUT',
        //     headers: {
        //         'Content-Type': 'application/json',
        //         'Accept': '*/*',
        //         'Access-Control-Allow-Origin': '*',
        //         'Access-Control-Allow-Headers': 'Origin, X-Requested-With'
        //     },
        //     body: JSON.stringify({
        //         id: Id,
        //         auftragnehmer_unterschrift: AUFTRAGNEHMER_UNTERSCHRIFT,
        //     })
        // })

        mutate(`https://palmiest-hornet-1388.dataplicity.io/api/api/Auftrag/all?name=${name}`)
    }
    //</Unterschrift Status updaten>


    //<Auftrag abschließen Button>
    const Update2 = async auftragID => {
        const response = await fetch(`https://palmiest-hornet-1388.dataplicity.io/api/api/Auftrag/abgeschlossen?id=${auftragID}&status=Abgeschlossen`, {
            method: 'PUT'
        })
        const data = await response.json()
        console.log(data)

        mutate(`https://palmiest-hornet-1388.dataplicity.io/api/api/Auftrag/all?name=${name}`)

    }
    //</Auftrag abschließen Button>



    //<Counter für Anzahl von Aufträgen in einer Status Kategorie>
    let Count1 = 0
    let Count2 = 0
    let Count3 = 0
    let Count4 = 0

    let Offen = data.filter(item => item.STATUS === 'Offen')
    let Bestätigt = data.filter(item => item.STATUS === 'Bestätigt')
    let Abgelehnt = data.filter(item => item.STATUS === 'Nicht angenommen')
    let Abgeschlossen = data.filter(item => item.STATUS === 'Abgeschlossen')

    Count1 = Offen.length
    Count2 = Bestätigt.length
    Count3 = Abgelehnt.length
    Count4 = Abgeschlossen.length
    //</Counter für Anzahl von Aufträgen in einer Status Kategorie>

    // const [Fav, setFav] = useState("");

    // const handleFav = (se) => {
    //     if (Fav == se) {
    //         setFav("");
    //     }
    //     else {
    //         setFav(se);
    //     }
    // };


    // const matches = useMediaQuery('(min-width:600px)');

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

        mutate(`https://palmiest-hornet-1388.dataplicity.io/api/api/Auftrag/all?name=${name}`)

    }
    

    
    return (
        <form style={{ background: 'white' }} className={classes.h}>

            <AddAuftrag Kurzzeichen={query.param} Name={name} />

            {/* <div className={classes.e}>
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
            </div> */}

            <Appbar Kurzzeichen={query.param} />

            <div className={classes.FilterAdd}>

                <Button color="inherit" className={classes.BTN}

                    id="basic-button"
                    aria-controls="basic-menu"
                    aria-haspopup="true"
                    aria-expanded={open2 ? 'true' : undefined}
                    onClick={handleClick2}>
                    <FilterAltIcon size="small" className={classes.searchIcon} /> <Typography> Filter </Typography>
                </Button>
                <Menu
                    id="basic-menu"
                    anchorEl={anchorE2}
                    open={open2}
                    onClose={handleClose2}
                    MenuListProps={{
                        'aria-labelledby': 'basic-button',
                    }}>
                    <a></a>
                    <ListItem><Typography variant='h6' fontWeight='bold' > SPERREN </Typography></ListItem>
                    <ListItem> <Button className={filter2 == "Durchführungserlaubnis" ? classes.BTNDisabled : classes.BTNEnabled} onClick={() => handleSearchChange2("Durchführungserlaubnis")} variant="contained">Durchführungserlaubnis </Button></ListItem>
                    <ListItem> <Button className={filter2 == "Freigabe zur Arbeit" ? classes.BTNDisabled : classes.BTNEnabled} onClick={() => handleSearchChange2("Freigabe zur Arbeit")} variant="contained">Freigabe zur Arbeit</Button></ListItem>
                    <ListItem> <Button className={filter2 == "Freigabe zur Sperre" ? classes.BTNDisabled : classes.BTNEnabled} onClick={() => handleSearchChange2("Freigabe zur Sperre")} variant="contained">Freigabe zur Sperre</Button></ListItem>
                    <ListItem> <Button className={filter2 == "Prüfungserlaubnis" ? classes.BTNDisabled : classes.BTNEnabled} onClick={() => handleSearchChange2("Prüfungserlaubnis")} variant="contained">Prüfungserlaubnis</Button></ListItem>
                    <Divider></Divider>

                    <Divider></Divider>

                    <ListItem><Typography variant='h6' fontWeight='bold' > KSV </Typography></ListItem>
                    <ListItem> <TextField style={{ width: "200px" }} fullWidth size="small" variant="outlined" value={filter3} onChange={handleSearchChange3} label={<SearchIcon />}></TextField></ListItem>
                    <Divider></Divider>
                    <ListItem><Typography variant='h6' fontWeight='bold' > Auftraggeber </Typography></ListItem>
                    <ListItem> <TextField style={{ width: "200px" }} fullWidth size="small" variant="outlined" value={filter4} onChange={handleSearchChange4} label={<SearchIcon />}></TextField></ListItem>
                    <Divider></Divider>
                    <ListItem><Typography variant='h6' fontWeight='bold' > Auftragnehmer </Typography></ListItem>
                    <ListItem> <TextField style={{ width: "200px" }} fullWidth size="small" variant="outlined" value={filter5} onChange={handleSearchChange5} label={<SearchIcon />}></TextField></ListItem>
                </Menu>


            </div>


            <div className={classes.SummaryWrapper}>

                <Accordion style={{ borderRadius: '15px', marginLeft: matches == true ? '' : '3%',  marginRight: matches == true ? '' : '3%'}} className={classes.Accordion}>

                    <AccordionSummary

                        expandIcon={<ExpandMoreIcon style={{ color: 'white' }} />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                    >
                        <StyledBadge showZero badgeContent={Count1} color="primary"><FiberManualRecordIcon /></StyledBadge><Typography style={{ fontWeight: 'bold', marginLeft: "6px" }}>Offen</Typography>
                    </AccordionSummary>
                    <AccordionDetails style={{ padding: '0px' }}>
                        {data && data.map((auftrag, id) => <a key={id}>
                            {auftrag.STATUS == "Offen" && data[id].SPERREN.includes(filter2) && data[id].KSV.includes(filter3) &&
                                <div className={classes.Offen}>
                                    <details className={classes.details}>
                                        <summary className={classes.summary}>
                                            {auftrag.ID} | {auftrag.AUFTRAG}

                                            <a className={auftrag.AUFTRAGGEBER == query.param2 ? classes.Check : null}>
                                                <Tooltip title="Unterschreiben">
                                                    <IconButton onClick={() => { setOpen3(true); setId(auftrag.ID) }} style={{ float: 'right', maxWidth: '40px', maxHeight: '40px', minWidth: '40px', minHeight: '40px' }} color="inherit">
                                                        <CreateIcon />
                                                    </IconButton>
                                                </Tooltip>
                                            </a>
                                            <Dialog
                                                fullScreen
                                                open={open3}
                                                onClose={handleClose3}
                                                TransitionComponent={Transition}
                                            >
                                                <AppBar className={classes.Unterschrift} sx={{ position: 'relative' }}>
                                                    <Toolbar >
                                                        <IconButton
                                                            edge="start"
                                                            color="inherit"
                                                            onClick={handleClose3}
                                                            aria-label="close"

                                                        >
                                                            <CloseIcon />
                                                        </IconButton>
                                                        <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                                                            Unterschrift
                                                        </Typography>
                                                        <div className={classes.c}>
                                                            <Button color="inherit" autoFocus onClick={clear}>Leeren</Button>
                                                            <Button color="inherit" autoFocus onClick={() => { save(); setId(auftrag.ID) }}>Speichern</Button>
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
                                        </summary>
                                        <div className={classes.InsideCard}>
                                            <Typography> <a style={{ fontWeight: "bold" }}>KSV:</a> {auftrag.KSV}</Typography>
                                            <Typography> <a style={{ fontWeight: "bold" }}>Auftraggeber: </a> {auftrag.AUFTRAGGEBER}</Typography>
                                            <Typography> <a style={{ fontWeight: "bold" }}>Auftragnehmer: </a> {auftrag.AUFTRAGNEHMER}</Typography>
                                            <Typography> <a style={{ fontWeight: "bold" }}>Sperren: </a> {auftrag.SPERREN}</Typography>
                                            <div style={{ marginBottom: 30 }}>
                                                <Button onClick={() => router.push(`/auftrag/details?param=${kurzzeichen}&param2=${auftrag.ID}`)} style={{ float: 'right', color: 'white' }}>
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
                <Accordion style={{ borderRadius: '15px', marginLeft: matches == true ? '' : '3%',  marginRight: matches == true ? '' : '3%'}} className={classes.Accordion}>
                    <AccordionSummary

                        expandIcon={<ExpandMoreIcon style={{ color: 'white' }} />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                    >
                        <StyledBadge showZero badgeContent={Count2} color="primary"><FiberManualRecordIcon /></StyledBadge><Typography style={{ fontWeight: 'bold', marginLeft: "6px" }}>Bestätigt</Typography>
                    </AccordionSummary>
                    <AccordionDetails style={{ padding: '0px' }}>
                        {data && data.map((auftrag, id) => <a key={id}>
                            {auftrag.STATUS == "Bestätigt" && data[id].SPERREN.includes(filter2) && data[id].KSV.includes(filter3) &&
                                <div className={classes.Bestätigt}>
                                    <details className={classes.details}>
                                        <summary className={classes.summary}>
                                            {auftrag.ID} | {auftrag.AUFTRAG}
                                            <a className={auftrag.AUFTRAGNEHMER == query.param2 ? classes.Check : null}>
                                                <Tooltip title="Bestätigen">
                                                    <IconButton onClick={() => Update2(auftrag.ID)} style={{ float: 'right', maxWidth: '40px', maxHeight: '40px', minWidth: '40px', minHeight: '40px' }} color="inherit">
                                                        <HowToRegIcon />
                                                    </IconButton>
                                                </Tooltip>
                                            </a>
                                        </summary>
                                        <div className={classes.InsideCard}>
                                            <Typography> <a style={{ fontWeight: "bold" }}>KSV:</a> {auftrag.KSV}</Typography>
                                            <Typography> <a style={{ fontWeight: "bold" }}>Auftraggeber: </a> {auftrag.AUFTRAGGEBER}</Typography>
                                            <Typography> <a style={{ fontWeight: "bold" }}>Auftragnehmer: </a> {auftrag.AUFTRAGNEHMER}</Typography>
                                            <Typography> <a style={{ fontWeight: "bold" }}>Sperren: </a> {auftrag.SPERREN}</Typography>
                                            <div style={{ marginBottom: 30 }}>
                                                <Button onClick={() => router.push(`/auftrag/details?param=${kurzzeichen}&param2=${auftrag.ID}`)} style={{ float: 'right', color: 'white' }}>
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
                <Accordion style={{ borderRadius: '15px', marginLeft: matches == true ? '' : '3%',  marginRight: matches == true ? '' : '3%'}} className={classes.Accordion}>
                    <AccordionSummary

                        expandIcon={<ExpandMoreIcon style={{ color: 'white' }} />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                    >
                        <StyledBadge showZero badgeContent={Count3} color="primary"><FiberManualRecordIcon /></StyledBadge><Typography style={{ fontWeight: 'bold', marginLeft: "6px" }}>Abgelehnt</Typography>
                    </AccordionSummary>
                    <AccordionDetails style={{ padding: '0px' }}>
                        {data && data.map((auftrag, id) => <a style={{ listStyleType: 'none' }} key={id}>
                            {auftrag.STATUS == "Nicht angenommen" && data[id].SPERREN.includes(filter2) && data[id].KSV.includes(filter3) && data[id].AUFTRAGGEBER.includes(filter4) && data[id].AUFTRAGNEHMER.includes(filter5) &&
                                <div className={classes.Abgelehnt}>
                                    <details className={classes.details}>
                                        <summary className={classes.summary}>
                                            {auftrag.ID} | {auftrag.AUFTRAG}
                                            <a className={auftrag.STATUS == "Offen" || auftrag.STATUS == "Bestätigt" ? classes.SummaryBTNDisabled : null}>


                                                {/* <IconButton color="inherit" className={classes.Fav} onClick={() => handleFav("True")} style={{ float: 'right', maxWidth: '40px', maxHeight: '40px', minWidth: '40px', minHeight: '40px' }} color="inherit">
                                                    <StarIcon />
                                                </IconButton> */}

                                                <Tooltip title="Löschen">
                                                    <IconButton onClick={() => Delete(auftrag.ID)} style={{ float: 'right', maxWidth: '40px', maxHeight: '40px', minWidth: '40px', minHeight: '40px' }} color="inherit">
                                                        <DeleteIcon />
                                                    </IconButton>
                                                </Tooltip>
                                                <Tooltip title="Erneut senden">
                                                    <IconButton onClick={() => { Update3(auftrag.ID); Mail(auftrag.AUFTRAGNEHMER) }} style={{ float: 'right', maxWidth: '40px', maxHeight: '40px', minWidth: '40px', minHeight: '40px' }} color="inherit">
                                                        <PublishedWithChangesIcon />
                                                    </IconButton>
                                                </Tooltip>
                                            </a>
                                        </summary>
                                        <div className={classes.InsideCard}>
                                            <Typography> <a style={{ fontWeight: "bold" }}>KSV:</a> {auftrag.KSV}</Typography>
                                            <Typography> <a style={{ fontWeight: "bold" }}>Auftraggeber: </a> {auftrag.AUFTRAGGEBER}</Typography>
                                            <Typography> <a style={{ fontWeight: "bold" }}>Auftragnehmer: </a> {auftrag.AUFTRAGNEHMER}</Typography>
                                            <Typography> <a style={{ fontWeight: "bold" }}>Sperren: </a> {auftrag.SPERREN}</Typography>
                                            <div style={{ marginBottom: 30 }}>
                                                <Button onClick={() => router.push(`/auftrag/details?param=${kurzzeichen}&param2=${auftrag.ID}`)} style={{ float: 'right', color: 'white' }}>
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
                <Accordion style={{ borderRadius: '15px', marginLeft: matches == true ? '' : '3%',  marginRight: matches == true ? '' : '3%'}} className={classes.Accordion}>
                    <AccordionSummary

                        expandIcon={<ExpandMoreIcon style={{ color: 'white' }} />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                    >
                        <StyledBadge showZero badgeContent={Count4} color="primary"><FiberManualRecordIcon /></StyledBadge><Typography style={{ fontWeight: 'bold', marginLeft: "6px" }}>Abgeschlossen</Typography>
                    </AccordionSummary>
                    <AccordionDetails style={{ padding: '0px' }}>
                        {data && data.map((auftrag, id) => <a key={id}>
                            {auftrag.STATUS == "Abgeschlossen" && data[id].SPERREN.includes(filter2) && data[id].KSV.includes(filter3) &&
                                <div className={classes.Abgeschlossen}>
                                    <details className={classes.details}>
                                        <summary className={classes.summary}>
                                            {auftrag.ID} | {auftrag.AUFTRAG}
                                            <Tooltip title="Löschen">
                                                <IconButton onClick={() => Delete(auftrag.ID)} style={{ float: 'right', maxWidth: '40px', maxHeight: '40px', minWidth: '40px', minHeight: '40px' }} color="inherit">
                                                    <DeleteIcon />
                                                </IconButton>
                                            </Tooltip>
                                        </summary>
                                        <div className={classes.InsideCard}>
                                            <Typography> <a style={{ fontWeight: "bold" }}>KSV:</a> {auftrag.KSV}</Typography>
                                            <Typography> <a style={{ fontWeight: "bold" }}>Auftraggeber: </a> {auftrag.AUFTRAGGEBER}</Typography>
                                            <Typography> <a style={{ fontWeight: "bold" }}>Auftragnehmer: </a> {auftrag.AUFTRAGNEHMER}</Typography>
                                            <Typography> <a style={{ fontWeight: "bold" }}>Sperren: </a> {auftrag.SPERREN}</Typography>
                                            <div style={{ marginBottom: 30 }}>
                                                <Button onClick={() => router.push(`/auftrag/details?param=${kurzzeichen}&param2=${auftrag.ID}`)} style={{ float: 'right', color: 'white' }}>
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

const useStyles = makeStyles((theme) => ({

    Accordion: {
        marginLeft: '3%',
        marginRight: '3%',
        padding: '0%',

        backgroundColor: '#143968',
        color: 'white',

    },

    SearchFieldMobile: {
        marginLeft: '30%',
        background: 'red',

    },

    SearchFieldPc: {
        marginLeft: '60px',
    },

    br: {
        marginBottom: 40,
    },

    FilterAdd: {
        marginTop: "2%",
        marginBottom: "10%",
        display: "flex",
        marginLeft: "3%",
        marginRight: "3%",
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
        outline: 'none',
    },

    summary2: {
        marginTop: "2%",
        marginRight: "5%",
        marginLeft: "5%",
        lineHeight: '2.5',
        justifyContent: 'space-between',
        fontWeight: "bold",
        borderRadius: 15,
        background: "#143968",
        [theme.breakpoints.up("sm")]: {
            background: 'red',
        },
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
        marginBottom: "10px"
    },

    Bestätigt: {
        paddingLeft: 15,
        marginLeft: '5%',
        marginRight: '5%',
        borderRadius: 15,
        background: '#1DB954',
        color: "white",
        marginBottom: "10px"
    },


    Abgeschlossen: {
        paddingLeft: 15,
        marginLeft: '5%',
        marginRight: '5%',
        borderRadius: 15,
        background: '#4a4a49',
        color: "white",
        marginBottom: "10px"
    },

    Abgelehnt: {
        paddingLeft: 15,
        marginLeft: '5%',
        marginRight: '5%',
        borderRadius: 15,
        background: '#c92a35',
        color: "white",
        marginBottom: "10px"
    },

    Details: {
        color: "white",
    },

    InsideCard: {
        paddingBottom: 10,
    },


}))
