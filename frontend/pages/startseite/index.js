import { useRouter } from 'next/router';
import { makeStyles } from '@mui/styles';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import useSWR  from "swr";
import DeleteIcon from '@mui/icons-material/Delete';
import React, { useEffect, useState } from "react";
import Menu from '@mui/material/Menu';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import { Divider, ListItem, TextField } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import { useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/styles';
import { Stack } from '@mui/material';
import MobileDateTimePicker from '@mui/lab/MobileDateTimePicker';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import SaveIcon from '@mui/icons-material/Save';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';


import Appbar from '../../components/AppBars'
import AddAuftrag from '../../components/AddAuftrag'
import Karten from '../../components/Startseite/Karten';

const fetcher = (...args) => fetch(...args).then((response) => response.json())
console.log("--> Übersicht")

export default function Startseite() {

    const { query } = useRouter()
    const router = useRouter()
    const classes = useStyles();

   
    let name = query.param2

    const [FilterVon, setFilterVon] = useState("");
    const [FilterBis, setFilterBis] = useState("");
    const [URL, setURL] = useState(`https://palmiest-hornet-1388.dataplicity.io/api/api/Auftrag/all?name=${query.param2}`)

    useEffect(() => {
        if (FilterVon == "" && FilterBis == "") {
            setURL(`https://palmiest-hornet-1388.dataplicity.io/api/api/Auftrag/all?name=${name}`)
        }
        else {
            setURL(`https://palmiest-hornet-1388.dataplicity.io/api/api/Auftrag/filterDate?von=${FilterVon}&bis=${FilterBis}`)
        }
    }, [FilterVon, FilterBis])



    // useEffect(() => {
    //     console.log(FilterVon)
    //     console.log(FilterBis)
    //     if (FilterVon == "" && FilterBis == "") {

    //         console.log("Change")
    //         setAuftragData(data)
    //         mutate(`https://palmiest-hornet-1388.dataplicity.io/api/api/Auftrag/all?name=${name}`)
    //     }
    //     else {
    //         fetch(`https://palmiest-hornet-1388.dataplicity.io/api/api/Auftrag/filterDate?von=${FilterVon}&bis=${FilterBis}`)
    //             .then((response) => response.json())
    //             .then((data) => setAuftragData(data));
    //     }

    // }, [FilterVon, FilterBis])

    const [value1, setValue1] = useState(new Date());
    const [value2, setValue2] = useState(new Date());

    useEffect(() => {
        var curr = new Date();
        var first = curr.getDate() - curr.getDay() + 1;
        // var last = first + 6
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
    const matchesLG = useMediaQuery(theme.breakpoints.up('lg'));
    console.log(matches)


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
  
    //</Filter>



    //<Unterschrift>
  

    //</Unterschrift>




    useEffect(() => {
        setURL(`https://palmiest-hornet-1388.dataplicity.io/api/api/Auftrag/all?name=${query.param2}`)
    }, [router])

    console.log(URL)
    //<Fetchen der Daten für die Karten>
    const { data, error } = useSWR(URL, fetcher)

    if (error) return <div>failed to load</div>
    if (!data) return <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
        onClick={handleClose}
    >
        <CircularProgress color="inherit" />
    </Backdrop>














    //<Fetchen der Daten für die Karten>

    console.log(data)

    // const { filterDate, errorDate } = useSWR(`https://palmiest-hornet-1388.dataplicity.io/api/api/Auftrag/all?name=${name}`, fetcher)


    //</Counter für Anzahl von Aufträgen in einer Status Kategorie>


   







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

            <Appbar Überschrift="Starseite" Kurzzeichen={query.param} />

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
                    <ListItem> <TextField size='small' fullWidth  variant="outlined" value={filter3} onChange={handleSearchChange3} label={'KSV'}></TextField></ListItem>
                    <Divider></Divider>
                    <ListItem> <TextField size='small' fullWidth variant="outlined" value={filter4} onChange={handleSearchChange4} label={'Auftraggeber'}></TextField></ListItem>
                    <Divider></Divider>
                    <ListItem> <TextField size='small' fullWidth variant="outlined" value={filter5} onChange={handleSearchChange5} label={'Auftragnehmer'}></TextField></ListItem>
                    <Divider></Divider>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <ListItem>
                            <Stack>
                                <MobileDateTimePicker
                                    ampm={false}
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
                <Karten data={data} Status={"Offen"} Überschrift={"Offen"}
                    KRZ={query.param} Name={query.param2}
                    filter2={filter2} filter3={filter3}
                    filter4={filter4} filter5={filter5}

                />
                <div className={classes.br}></div>
            </div>

            <div className={classes.SummaryWrapper}>
                <Karten data={data} Status={"Bestätigt"} Überschrift={"Bestätigt"}
                    KRZ={query.param} Name={query.param2}
                    filter2={filter2} filter3={filter3}
                    filter4={filter4} filter5={filter5}

                />
                <div className={classes.br}></div>
            </div>

            <div className={classes.SummaryWrapper}>
                <Karten data={data} Status={"Nicht angenommen"} Überschrift={"Abgelehnt"}
                    KRZ={query.param} Name={query.param2}
                    filter2={filter2} filter3={filter3}
                    filter4={filter4} filter5={filter5}
                />
                <div className={classes.br}></div>
            </div>

            <div className={classes.SummaryWrapper}>
                <Karten data={data} Status={"Abgeschlossen"} Überschrift={"Abgeschlossen"}
                    KRZ={query.param} Name={query.param2}
                    filter2={filter2} filter3={filter3}
                    filter4={filter4} filter5={filter5}
                />
            </div>
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
