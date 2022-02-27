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
import React, { useEffect, useRef, useState } from "react";
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

import Badge from '@mui/material/Badge';

import Tooltip from '@mui/material/Tooltip';
import { styled } from '@mui/material/styles';

import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import PublishedWithChangesIcon from '@mui/icons-material/PublishedWithChanges';
import { useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/styles';
import { Stack } from '@mui/material';
import MobileDateTimePicker from '@mui/lab/MobileDateTimePicker';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import ArrowDropDownCircleIcon from '@mui/icons-material/ArrowDropDownCircle';
import SaveIcon from '@mui/icons-material/Save';


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
        backgroundColor: 'rgba(212,25,25,1)',
    },
}));

const fetcher = (...args) => fetch(...args).then((response) => response.json())
console.log("--> Übersicht")

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});


const BTNTheme = createTheme({
    palette: {
        primary: {
            main: "#212121",
        },
    },
});

export default function Startseite() {


    const [FilterVon, setFilterVon] = useState("");
    const [FilterBis, setFilterBis] = useState("");

    

    useEffect(() => {
        console.log(FilterVon)
        console.log(FilterBis)
        if (FilterVon == "" && FilterBis == "") {
            console.log("Change")
            setAuftragData(data)
            mutate(`https://palmiest-hornet-1388.dataplicity.io/api/api/Auftrag/all?name=${name}`)
        }
        else {
            fetch(`https://palmiest-hornet-1388.dataplicity.io/api/api/Auftrag/filterDate?von=${FilterVon}&bis=${FilterBis}`)
                .then((response) => response.json())
                .then((data) => setAuftragData(data));
        }

    }, [FilterVon, FilterBis])

    const [value1, setValue1] = useState(new Date());
    const [value2, setValue2] = useState(new Date());
    const [TriggerDateReset, setTriggerDateReset] = useState();

    useEffect(() => {
        var curr = new Date();
        var first = curr.getDate() - curr.getDay() + 1;
        var last = first + 6
        let firstday = new Date(curr.setDate(first)).toISOString().split('T')[0]
        let lastday = new Date(curr.setDate(curr.getDate() + 6)).toISOString().split('T')[0];
        console.log(firstday)
        let firstYear = firstday.split('-')[0]
        let firstMonth = firstday.split('-')[1]
        let firstDay = firstday.split('-')[2]

        let lastYear = lastday.split('-')[0]
        let lastMonth = lastday.split('-')[1]
        let lastDay = lastday.split('-')[2]

        console.log(firstYear)
        console.log(firstMonth)
        console.log(firstDay)

        // var firstday = new Date(curr.setDate(first)).toUTCString();
        // var lastday = new Date(curr.setDate(last)).toUTCString();


        value1.setFullYear(firstYear)
        value1.setMonth(firstMonth - 1)
        value1.setDate(firstDay)

        value2.setFullYear(lastYear)
        value2.setMonth(lastMonth - 1)
        value2.setDate(lastDay)


        value1.setHours(7, 30)
        value2.setHours(16, 45)
    }, [])

    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.down('sm'));
    const matchesMD = useMediaQuery(theme.breakpoints.up('md'));
    const matchesLG = useMediaQuery(theme.breakpoints.up('lg'));
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

    const [AuftragData, setAuftragData] = useState();



    //<Filter>
    const [filter, setfilter] = useState("");
    const [filter2, setfilter2] = useState("");
    const [filter3, setfilter3] = useState("");
    const [filter4, setfilter4] = useState("");
    const [filter5, setfilter5] = useState("");
    const [filter6, setfilter6] = useState("");
    const { Von, setVon } = useState("");
    const { Bis, setBis } = useState("");



    const [currentDate, setCurrentDate] = useState(new Date());


    const [FilteredDateData, setFilteredDateData] = useState()




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

    if (AuftragData == null) {
        setAuftragData(data)
    }

    //<Fetchen der Daten für die Karten>

    console.log(data)

    // const { filterDate, errorDate } = useSWR(`https://palmiest-hornet-1388.dataplicity.io/api/api/Auftrag/all?name=${name}`, fetcher)








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

    const Delete = async auftragID => {
        const response = await fetch(`https://palmiest-hornet-1388.dataplicity.io/api/api/Auftrag/delete?id=${auftragID}`, {
            method: 'DELETE'
        })
        const data = await response.json()
        console.log(data)

        mutate(`https://palmiest-hornet-1388.dataplicity.io/api/api/Auftrag/all?name=${name}`)
    }

    const Bestätigen = async auftragID => {

        let newDate = new Date();
        let InsertDate = `${newDate.getFullYear()}.${newDate.getMonth() + 1}.${newDate.getDate()} ${newDate.getHours()}:${newDate.getMinutes()}`;

        console.log(InsertDate)

        const response = await fetch(`https://palmiest-hornet-1388.dataplicity.io/api/api/Auftrag/confirm?id=${auftragID}&am=${InsertDate}`, {
            method: 'PUT'
        })
        const data = await response.json()
        console.log(data)

        mutate(`https://palmiest-hornet-1388.dataplicity.io/api/api/Auftrag/all?name=${name}`)
    }

    const Abschließen = async auftragID => {

        let newDate = new Date();

        let InsertDate = `${newDate.getFullYear()}.${newDate.getMonth() + 1}.${newDate.getDate()} ${newDate.getHours()}:${newDate.getMinutes()}`;

        const response = await fetch(`https://palmiest-hornet-1388.dataplicity.io/api/api/Auftrag/close?id=${auftragID}&am=${InsertDate}`, {
            method: 'PUT'
        })
        const data = await response.json()
        console.log(data)

        mutate(`https://palmiest-hornet-1388.dataplicity.io/api/api/Auftrag/all?name=${name}`)

    }

    const Gesehen = async auftragID => {

        let newDate = new Date();

        let InsertDate = `${newDate.getFullYear()}.${newDate.getMonth() + 1}.${newDate.getDate()} ${newDate.getHours()}:${newDate.getMinutes()}`;

        const response = await fetch(`https://palmiest-hornet-1388.dataplicity.io/api/api/Auftrag/watched?id=${auftragID}&am=${InsertDate}`, {
            method: 'PUT'
        })
        const data = await response.json()
        console.log(data)

        mutate(`https://palmiest-hornet-1388.dataplicity.io/api/api/Auftrag/all?name=${name}`)

    }

    const ErneutSenden = async auftragID => {

        let newDate = new Date();

        let InsertDate = `${newDate.getFullYear()}.${newDate.getMonth() + 1}.${newDate.getDate()} ${newDate.getHours()}:${newDate.getMinutes()}`;

        const response = await fetch(`https://palmiest-hornet-1388.dataplicity.io/api/api/Auftrag/resend?id=${auftragID}&am=${InsertDate}`, {
            method: 'PUT'
        })
        const data = await response.json()
        console.log(data)

        mutate(`https://palmiest-hornet-1388.dataplicity.io/api/api/Auftrag/all?name=${name}`)

    }

    let VON = `${value1.getFullYear()}.${value1.getMonth() + 1}.${value1.getDate()} ${value1.getHours()}:${value1.getMinutes()}`;
    let BIS = `${value2.getFullYear()}.${value2.getMonth() + 1}.${value2.getDate()} ${value2.getHours()}:${value2.getMinutes()}`;

    return (
        <form className={classes.h}>

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

            <Appbar StartseiteButton="false" Überschrift="Startseite" Kurzzeichen={query.param} />

            <div className={classes.FilterAdd}>

                <Button color="inherit" className={classes.BTN} style={{ marginLeft: matches == true ? '' : '8%' && matchesLG == true ? '18%' : '18%' }}

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
                    <ListItem><Typography variant='h8' fontWeight='bold' > SPERREN </Typography></ListItem>
                    <ListItem> <Button size='small' className={filter2 == "Durchführungserlaubnis" ? classes.BTNDisabled : classes.BTNEnabled} onClick={() => handleSearchChange2("Durchführungserlaubnis")} variant="contained">Durchführungserlaubnis </Button></ListItem>
                    <ListItem> <Button size='small' className={filter2 == "Freigabe zur Arbeit" ? classes.BTNDisabled : classes.BTNEnabled} onClick={() => handleSearchChange2("Freigabe zur Arbeit")} variant="contained">Freigabe zur Arbeit</Button></ListItem>
                    <ListItem> <Button size='small' className={filter2 == "Freigabe zur Sperre" ? classes.BTNDisabled : classes.BTNEnabled} onClick={() => handleSearchChange2("Freigabe zur Sperre")} variant="contained">Freigabe zur Sperre</Button></ListItem>
                    <ListItem> <Button size='small' className={filter2 == "Prüfungserlaubnis" ? classes.BTNDisabled : classes.BTNEnabled} onClick={() => handleSearchChange2("Prüfungserlaubnis")} variant="contained">Prüfungserlaubnis</Button></ListItem>
                    <Divider></Divider>
                    <Divider></Divider>
                    <ListItem> <TextField size='small' fullWidth size="small" variant="outlined" value={filter3} onChange={handleSearchChange3} label={'KSV'}></TextField></ListItem>
                    <Divider></Divider>
                    <ListItem> <TextField size='small' fullWidth size="small" variant="outlined" value={filter4} onChange={handleSearchChange4} label={'Auftraggeber'}></TextField></ListItem>
                    <Divider></Divider>
                    <ListItem> <TextField size='small' fullWidth size="small" variant="outlined" value={filter5} onChange={handleSearchChange5} label={'Auftragnehmer'}></TextField></ListItem>
                    <Divider></Divider>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <ListItem>
                            <Stack>
                                <MobileDateTimePicker
                                    ampm={false}
                                    label="24hours"
                                    value={value1}
                                    onChange={(newValue1) => {
                                        setValue1(newValue1)
                                    }}
                                    X
                                    label="VON"
                                    inputFormat="yyyy/MM/dd HH:mm"
                                    renderInput={(params) => <TextField size="small" label='Bis' variant="outlined" {...params} />}
                                />
                            </Stack>
                        </ListItem>


                        <ListItem>
                            <Stack>
                                <MobileDateTimePicker
                                    ampm={false}
                                    label="24hours"
                                    value={value2}
                                    onChange={(newValue2) => {
                                        setValue2(newValue2)
                                    }}

                                    label="BIS"
                                    inputFormat="yyyy/MM/dd HH:mm"
                                    renderInput={(params) => <TextField label='von' size="small" variant="outlined" {...params} />}
                                />
                            </Stack>
                        </ListItem>

                        <IconButton style={{ marginLeft: '10px' }} color="primary" onClick={() => { setFilterBis(BIS); setFilterVon(VON) }}><SaveIcon /></IconButton>
                        <IconButton onClick={() => { setFilterBis(''); setFilterVon('') }} color="error"><DeleteIcon /></IconButton>

                    </LocalizationProvider>
                </Menu>
            </div>


            <div className={classes.SummaryWrapper}>

                <Accordion style={{ borderRadius: '15px', marginLeft: matches == true ? '' : '12%' && matchesLG == true ? '18%' : '18%', marginRight: matches == true ? '' : '8%' && matchesLG == true ? '18%' : '18%' }} className={classes.Accordion}>

                    <AccordionSummary

                        expandIcon={<ExpandMoreIcon style={{ color: 'white' }} />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                    >
                        <StyledBadge showZero badgeContent={Count1} color="primary"><FiberManualRecordIcon /></StyledBadge><Typography style={{ fontWeight: 'bold', marginLeft: "6px" }}>Offen</Typography>
                    </AccordionSummary>
                    <AccordionDetails style={{ padding: '0px' }}>
                        {AuftragData && AuftragData.map((auftrag, id) => <a key={id}>
                            {auftrag.STATUS == "Offen" && data[id].SPERREN.includes(filter2) && data[id].KSV.includes(filter3) && data[id].AUFTRAGGEBER.includes(filter4) && data[id].AUFTRAGNEHMER.includes(filter5) &&
                                <div className={classes.Offen}>
                                    <details className={classes.details}>
                                        <summary className={classes.summary}>
                                            {auftrag.ID} | {auftrag.AUFTRAG}

                                            <a className={auftrag.AUFTRAGGEBER !== query.param2 || auftrag.AUFTRAGGEBER == auftrag.AUFTRAGNEHMER ? null : classes.Check}>
                                                <Tooltip title="Bestätigen">
                                                    <IconButton onClick={() => { Bestätigen(auftrag.ID) }} style={{ float: 'right', maxWidth: '40px', maxHeight: '40px', minWidth: '40px', minHeight: '40px' }} color="inherit">
                                                        <CheckCircleOutlineIcon />
                                                    </IconButton>
                                                </Tooltip>
                                            </a>
                                        </summary>
                                        <div className={classes.InsideCard}>
                                            <div style={{ display: 'inline-block' }}>
                                                <Typography> <a style={{ fontWeight: "bold" }}>KSV:</a> {auftrag.KSV}</Typography>
                                                <Typography> <a style={{ fontWeight: "bold" }}>Auftraggeber: </a> {auftrag.AUFTRAGGEBER}</Typography>
                                                <Typography> <a style={{ fontWeight: "bold" }}>Auftragnehmer: </a> {auftrag.AUFTRAGNEHMER}</Typography>
                                                <Typography> <a style={{ fontWeight: "bold" }}>Sperren: </a> {auftrag.SPERREN}</Typography>
                                            </div>
                                            <div className={matchesLG != true ? null : classes.CardDate} >
                                                <Typography className={auftrag.ERNEUT_GESENDET_AM == null ? classes.Check : null}><a style={{ fontWeight: "bold" }}>Erneut gesendet: </a>{auftrag.ERNEUT_GESENDET_AM == null ? "" : auftrag.ERNEUT_GESENDET_AM.split('T')[0].split('-')[2] + '-' + auftrag.ERNEUT_GESENDET_AM.split('-')[1] + '-' + auftrag.ERNEUT_GESENDET_AM.split('-')[0] + ' um ' + auftrag.ERNEUT_GESENDET_AM.split('T')[1].split(':')[0] + ':' + auftrag.ERNEUT_GESENDET_AM.split('T')[1].split(':')[1]}</Typography>
                                            </div>
                                            <div style={{ marginBottom: 30 }}>
                                                <Button onClick={() => router.push(`/auftrag/details?param=${kurzzeichen}&param2=${auftrag.ID}&param3=${query.param2}`)} style={{ float: 'right', color: 'white' }}>
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
                <Accordion style={{ borderRadius: '15px', marginLeft: matches == true ? '' : '12%' && matchesLG == true ? '18%' : '18%', marginRight: matches == true ? '' : '8%' && matchesLG == true ? '18%' : '18%' }} className={classes.Accordion}>
                    <AccordionSummary

                        expandIcon={<ExpandMoreIcon style={{ color: 'white' }} />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                    >
                        <StyledBadge showZero badgeContent={Count2} color="primary"><FiberManualRecordIcon /></StyledBadge><Typography style={{ fontWeight: 'bold', marginLeft: "6px" }}>Bestätigt</Typography>
                    </AccordionSummary>
                    <AccordionDetails style={{ padding: '0px' }}>
                        {AuftragData && AuftragData.map((auftrag, id) => <a key={id}>{
                            auftrag.STATUS == "Bestätigt" && data[id].SPERREN.includes(filter2) && data[id].KSV.includes(filter3) && data[id].AUFTRAGGEBER.includes(filter4) && data[id].AUFTRAGNEHMER.includes(filter5) &&
                            <div className={classes.Bestätigt}>
                                <details className={classes.details}>
                                    <summary className={classes.summary}>
                                        {auftrag.ID} | {auftrag.AUFTRAG}
                                        <a className={auftrag.GESEHEN_AM == null && (auftrag.AUFTRAGNEHMER !== query.param2 && auftrag.AUFTRAGGEBER == query.param2 || auftrag.AUFTRAGGEBER == auftrag.AUFTRAGNEHMER) ? null : classes.Check}>
                                            <Tooltip title="Bestätigung gesehen">
                                                <IconButton onClick={() => Gesehen(auftrag.ID)} style={{ float: 'right', maxWidth: '40px', maxHeight: '40px', minWidth: '40px', minHeight: '40px' }} color="inherit">
                                                    <RemoveRedEyeIcon />
                                                </IconButton>
                                            </Tooltip>
                                        </a>
                                        <a className={auftrag.GESEHEN_AM !== null && (auftrag.AUFTRAGNEHMER !== query.param2 && auftrag.AUFTRAGGEBER == query.param2 || auftrag.AUFTRAGGEBER == auftrag.AUFTRAGNEHMER) ? null : classes.Check}>
                                            <Tooltip title="Abschließen">
                                                <IconButton disabled={auftrag.GESEHEN_AM == '' ? true : false} onClick={() => Abschließen(auftrag.ID)} style={{ float: 'right', maxWidth: '40px', maxHeight: '40px', minWidth: '40px', minHeight: '40px' }} color="inherit">
                                                    <HowToRegIcon />
                                                </IconButton>
                                            </Tooltip>
                                        </a>
                                    </summary>
                                    <div className={classes.InsideCard}>
                                        <div style={{ display: 'inline-block' }}>
                                            <Typography> <a style={{ fontWeight: "bold" }}>KSV:</a> {auftrag.KSV}</Typography>
                                            <Typography> <a style={{ fontWeight: "bold" }}>Auftraggeber: </a> {auftrag.AUFTRAGGEBER}</Typography>
                                            <Typography> <a style={{ fontWeight: "bold" }}>Auftragnehmer: </a> {auftrag.AUFTRAGNEHMER}</Typography>
                                            <Typography> <a style={{ fontWeight: "bold" }}>Sperren: </a> {auftrag.SPERREN}</Typography>
                                        </div>
                                        <div className={matchesLG != true ? null : classes.CardDate} >
                                            <Typography ><a style={{ fontWeight: "bold" }}>Bestätigt: </a> {auftrag.ANGENOMMEN_AM == null ? "" : auftrag.ANGENOMMEN_AM.split('T')[0].split('-')[2] + '-' + auftrag.ANGENOMMEN_AM.split('-')[1] + '-' + auftrag.ANGENOMMEN_AM.split('-')[0] + ' um ' + auftrag.ANGENOMMEN_AM.split('T')[1].split(':')[0] + ':' + auftrag.ANGENOMMEN_AM.split('T')[1].split(':')[1]}</Typography>
                                            <Typography className={auftrag.GESEHEN_AM == null ? classes.Check : null}><a style={{ fontWeight: "bold" }}>Bestätigung gesehen: </a>{auftrag.GESEHEN_AM == null || auftrag.GESEHEN_AM == 0 ? "" : auftrag.GESEHEN_AM.split('T')[0].split('-')[2] + '-' + auftrag.GESEHEN_AM.split('-')[1] + '-' + auftrag.GESEHEN_AM.split('-')[0] + ' um ' + auftrag.GESEHEN_AM.split('T')[1].split(':')[0] + ':' + auftrag.GESEHEN_AM.split('T')[1].split(':')[1]}</Typography>
                                        </div>
                                        <div style={{ marginBottom: 30 }}>
                                            <Button onClick={() => router.push(`/auftrag/details?param=${kurzzeichen}&param2=${auftrag.ID}&param3=${query.param2}`)} style={{ float: 'right', color: 'white' }}>
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
                <Accordion style={{ borderRadius: '15px', marginLeft: matches == true ? '' : '12%' && matchesLG == true ? '18%' : '18%', marginRight: matches == true ? '' : '8%' && matchesLG == true ? '18%' : '18%' }} className={classes.Accordion}>
                    <AccordionSummary

                        expandIcon={<ExpandMoreIcon style={{ color: 'white' }} />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                    >
                        <StyledBadge showZero badgeContent={Count3} color="primary"><FiberManualRecordIcon /></StyledBadge><Typography style={{ fontWeight: 'bold', marginLeft: "6px" }}>Abgelehnt</Typography>
                    </AccordionSummary>
                    <AccordionDetails style={{ padding: '0px' }}>
                        {AuftragData && AuftragData.map((auftrag, id) => <a style={{ listStyleType: 'none' }} key={id}>
                            {auftrag.STATUS == "Nicht angenommen" && data[id].SPERREN.includes(filter2) && data[id].KSV.includes(filter3) && data[id].AUFTRAGGEBER.includes(filter4) && data[id].AUFTRAGNEHMER.includes(filter5) &&
                                <div className={classes.Abgelehnt}>
                                    <details className={classes.details}>
                                        <summary className={classes.summary}>
                                            {auftrag.ID} | {auftrag.AUFTRAG}

                                            <a className={auftrag.AUFTRAGNEHMER !== query.param2 && auftrag.AUFTRAGGEBER == query.param2 || auftrag.AUFTRAGGEBER == auftrag.AUFTRAGNEHMER ? null : classes.Check}>
                                                <Tooltip title="Löschen">
                                                    <IconButton onClick={() => Delete(auftrag.ID)} style={{ float: 'right', maxWidth: '40px', maxHeight: '40px', minWidth: '40px', minHeight: '40px' }} color="inherit">
                                                        <DeleteIcon />
                                                    </IconButton>
                                                </Tooltip>
                                            </a>
                                            <a className={auftrag.AUFTRAGGEBER == query.param2 || auftrag.AUFTRAGNEHMER == auftrag.AUFTRAGGEBER ? null : classes.Check}>
                                                <Tooltip title="Erneut senden">
                                                    <IconButton onClick={() => { ErneutSenden(auftrag.ID); Mail(auftrag.AUFTRAGNEHMER) }} style={{ float: 'right', maxWidth: '40px', maxHeight: '40px', minWidth: '40px', minHeight: '40px' }} color="inherit">
                                                        <PublishedWithChangesIcon />
                                                    </IconButton>
                                                </Tooltip>
                                            </a>
                                        </summary>
                                        <div className={classes.InsideCard}>
                                            <div style={{ display: 'inline-block' }}>
                                                <Typography> <a style={{ fontWeight: "bold" }}>KSV:</a> {auftrag.KSV}</Typography>
                                                <Typography> <a style={{ fontWeight: "bold" }}>Auftraggeber: </a> {auftrag.AUFTRAGGEBER}</Typography>
                                                <Typography> <a style={{ fontWeight: "bold" }}>Auftragnehmer: </a> {auftrag.AUFTRAGNEHMER}</Typography>
                                                <Typography> <a style={{ fontWeight: "bold" }}>Sperren: </a> {auftrag.SPERREN}</Typography>
                                            </div>
                                            <div style={{ marginBottom: 30 }}>
                                                <Button onClick={() => router.push(`/auftrag/details?param=${kurzzeichen}&param2=${auftrag.ID}&param3=${query.param2}`)} style={{ float: 'right', color: 'white' }}>
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
                <Accordion style={{ borderRadius: '15px', marginLeft: matches == true ? '' : '12%' && matchesLG == true ? '18%' : '18%', marginRight: matches == true ? '' : '8%' && matchesLG == true ? '18%' : '18%' }} className={classes.Accordion}>
                    <AccordionSummary

                        expandIcon={<ExpandMoreIcon style={{ color: 'white' }} />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                    >
                        <StyledBadge showZero badgeContent={Count4} color="primary"><FiberManualRecordIcon /></StyledBadge><Typography style={{ fontWeight: 'bold', marginLeft: "6px" }}>Abgeschlossen</Typography>
                    </AccordionSummary>
                    <AccordionDetails style={{ padding: '0px' }}>
                        {AuftragData && AuftragData.map((auftrag, id) => <a key={id}>
                            {auftrag.STATUS == "Abgeschlossen" && data[id].SPERREN.includes(filter2) && data[id].KSV.includes(filter3) && data[id].AUFTRAGGEBER.includes(filter4) && data[id].AUFTRAGNEHMER.includes(filter5) &&
                                <div className={classes.Abgeschlossen}>
                                    <details className={classes.details}>
                                        <summary className={classes.summary}>
                                            {auftrag.ID} | {auftrag.AUFTRAG}
                                            <a className={auftrag.AUFTRAGNEHMER !== query.param2 && auftrag.AUFTRAGGEBER == query.param2 || auftrag.AUFTRAGGEBER == auftrag.AUFTRAGNEHMER ? null : classes.Check}>
                                                <Tooltip title="Löschen">
                                                    <IconButton onClick={() => Delete(auftrag.ID)} style={{ float: 'right', maxWidth: '40px', maxHeight: '40px', minWidth: '40px', minHeight: '40px' }} color="inherit">
                                                        <DeleteIcon />
                                                    </IconButton>
                                                </Tooltip>
                                            </a>
                                        </summary>
                                        <div className={classes.InsideCard}>
                                            <div style={{ display: 'inline-block' }}>
                                                <Typography> <a style={{ fontWeight: "bold" }}>KSV:</a> {auftrag.KSV}</Typography>
                                                <Typography> <a style={{ fontWeight: "bold" }}>Auftraggeber: </a> {auftrag.AUFTRAGGEBER}</Typography>
                                                <Typography> <a style={{ fontWeight: "bold" }}>Auftragnehmer: </a> {auftrag.AUFTRAGNEHMER}</Typography>
                                                <Typography> <a style={{ fontWeight: "bold" }}>Sperren: </a> {auftrag.SPERREN}</Typography>
                                            </div>
                                            <div className={matchesLG != true ? null : classes.CardDate} >
                                                <Typography><a style={{ fontWeight: "bold" }}>Abgeschlossen: </a> {auftrag.GESEHEN_AM == null ? "" : auftrag.ABGESCHLOSSEN_AM.split('T')[0].split('-')[2] + '-' + auftrag.ABGESCHLOSSEN_AM.split('-')[1] + '-' + auftrag.ABGESCHLOSSEN_AM.split('-')[0] + ' um ' + auftrag.ABGESCHLOSSEN_AM.split('T')[1].split(':')[0] + ':' + auftrag.ABGESCHLOSSEN_AM.split('T')[1].split(':')[1]}</Typography>

                                            </div>
                                            <div style={{ marginBottom: 30 }}>
                                                <Button onClick={() => router.push(`/auftrag/details?param=${kurzzeichen}&param2=${auftrag.ID}&param3=${query.param2}`)} style={{ float: 'right', color: 'white' }}>
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

    CardDate: {
        float: 'right',
        marginRight: '80px',
    },

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
        marginBottom: "30px",
        display: "flex",
        marginLeft: "3%",


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
