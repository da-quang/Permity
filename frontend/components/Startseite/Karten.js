
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

import AbschließenButton from './AbschließenButton';
import BestätigenButton from './BestätigenButton';
import ErneutSendenButton from './ErneutSendenButton';
import GesehenButton from './GesehenButton';
import LöschenButton from './LöschenButton';


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





function Karten(props) {

    

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



    var curr = new Date; // get current date
    var first = curr.getDate() - curr.getDay() + 1; // First day is the day of the month - the day of the week
    var last = first + 6; // last day is the first day + 6






   



    return (
        <Accordion style={{ borderRadius: '15px', marginLeft: matches == true ? '' : '12%' && matchesLG == true ? '18%' : '18%', marginRight: matches == true ? '' : '8%' && matchesLG == true ? '18%' : '18%' }} className={classes.Accordion}>
            <AccordionSummary

                expandIcon={<ExpandMoreIcon style={{ color: 'white' }} />}
                aria-controls="panel1a-content"
                id="panel1a-header"
            >
                <StyledBadge showZero badgeContent={Count2} color="primary"><FiberManualRecordIcon /></StyledBadge><Typography style={{ fontWeight: 'bold', marginLeft: "6px" }}>Bestätigt</Typography>
            </AccordionSummary>
            <AccordionDetails style={{ padding: '0px' }}>
                {data && data.map((auftrag, id) => <a key={id}>{
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
                                    <AbschließenButton/>
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


export default Karten