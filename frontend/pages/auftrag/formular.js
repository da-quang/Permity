import { Button, TextField, Grid, Fab, Link, Typography } from "@material-ui/core";
import React, { Fragment, useState, useEffect } from 'react';
import MomentUtils from '@date-io/moment';
import axios from 'axios';
import { useRouter } from 'next/router';
import { Autocomplete } from "@mui/material";
import useSWR from "swr";
import { makeStyles } from '@mui/styles';
import MenuIcon from '@mui/icons-material/Menu';
import AddIcon from '@mui/icons-material/Add';
import Stack from '@mui/material/Stack';
import MobileDateTimePicker from '@mui/lab/MobileDateTimePicker';
import TimePicker from '@mui/lab/TimePicker';
import DateTimePicker from '@mui/lab/DateTimePicker';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import { delLocale } from "next/dist/shared/lib/router/router";
import LogoutIcon from '@mui/icons-material/Logout';
import HomeIcon from '@mui/icons-material/Home';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Router from "next/router";
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Box from '@mui/material/Box';
import CreateIcon from '@mui/icons-material/Create';
import Create from "@mui/icons-material/Create";
import { getDate, getHours } from "date-fns";
console.log("--> Formular")




export default function Formular() {

    const { query } = useRouter()
    const classes = useStyles();
    // const [data, setData] = useState([]);

    let [ksv, setKsv] = useState('')
    let auftraggeber = query.param2
    let [auftragnehmer, setAuftragnehmer] = useState('')
    let [empfänger, setEmpfänger] = useState('')
    let [sperren, setSperren] = useState('')
    let [kommentar, setKommentar] = useState('')
    let [von, setVon] = useState(new Date())
    let [bis, setBis] = useState(new Date())
    let status = 'offen'

    const [data1, setData1] = useState([]);
    const [data2, setData2] = useState([]);
    const [data3, setData3] = useState([]);
    const [data4, setData4] = useState([]);
    const [data5, setData5] = useState([]);
    const [data6, setData6] = useState([]);
    const [data7, setData7] = useState([]);
    const [data8, setData8] = useState([]);
    const [data9, setData9] = useState([]);
    const [data10, setData10] = useState([]);
    const [data11, setData11] = useState([]);

    let betreff = "Freigabe"
    let mailtext = "Bitte erledigen"

    // const formData = new FormData();
    // formData.append('empfänger', 'hodzic.amir66@gmail.com');
    // formData.append('betreff', 'Sees');
    // formData.append('mailtext', 'hallo');
    // formData.append('attachments', '');

   

    const CREATE = async () => {
        const response = await fetch(`https://palmiest-hornet-1388.dataplicity.io/api/api/Auftrag/create?ksv=${ksv}-13&auftraggeber=Riegler%20Thomas&auftragnehmer=Boch%20Walter&sperren=Freigabe%20zur%20Arbeit&kommentar=Gut%20machen&von=2021.12.30&bis=2021.12.31`, {
            method: 'POST'
        })
        const data = await response.json()
        console.log(data)
        Router.reload()
    }



    let kurzzeichen = query.param


    let loaded = false


    useEffect(() => {
        fetch(`https://palmiest-hornet-1388.dataplicity.io/api/api/Mitarbeiter/all`)
            .then((response) => response.json())
            .then((data2) => setData2(data2));
    }, []);


    useEffect(() => {
        fetch(`https://palmiest-hornet-1388.dataplicity.io/api/api/KSV/select?ebene=1`)
            .then((response) => response.json())
            .then((data3) => setData3(data3));
    }, []);

    function loadEbene2() {

        useEffect(() => {
            fetch(`https://palmiest-hornet-1388.dataplicity.io/api/api/KSV/select?ksv=${ksv1}&ebene=2`)
                .then((response) => response.json())
                .then((data4) => setData4(data4));
        }, []);

    }

    useEffect(() => {
        fetch(`https://palmiest-hornet-1388.dataplicity.io/api/api/KSV/select?ksv=${ksv1}&ebene=3`)
            .then((response) => response.json())
            .then((data5) => setData5(data5));
    }, []);

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
    // ${value.getHours()}:${value.getMinutes()}
console.log(VON)
console.log(BIS)

    let [KSV, setKSV] = useState('')
    let [KOMMENTAR, setKOMMENTAR] = useState('')
    let [AUFTRAGNEHMER, setAUFTRAGNEHMER] = useState('')
    let [SPERREN, setSPERREN] = useState('')
    let AUFTRAGGEBER = query.param2

    const CREATE2 = async () => {
        const response = await fetch(`https://palmiest-hornet-1388.dataplicity.io/api/api/Auftrag/create?ksv=${KSV}&auftraggeber=${AUFTRAGGEBER}&auftragnehmer=${AUFTRAGNEHMER}&sperren=${SPERREN}&kommentar=${KOMMENTAR}&von=${VON}&bis=${BIS}`, {
            method: 'POST'
        })
        const data = await response.json()
        console.log(data)
        Router.reload()
    }
    return (
        <form className={classes.h}>

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
                            <MenuItem onClick={() => router.push(`/Mitarbeiter/login?param`)}><LogoutIcon />Logout </MenuItem>
                            <MenuItem onClick={() => router.back()}><HomeIcon />Startseite</MenuItem>
                        </Menu>
                    </div>
                    <Typography variant="h4" className={classes.typoh4}> Auftrag </Typography>
                    <Typography variant="h6" className={classes.typoh6}>{query.param}</Typography>
                </div>

                <Box position="fixed" className={classes.Fab} sx={{ '& > :not(style)': { m: 1 } }}>


                    <Fab variant="extended" color="primary" aria-label="add">
                        <CreateIcon /> Unterschreiben
                    </Fab>

                    <Fab onClick={() => CREATE2()} color="secondary" aria-label="add">
                        <AddIcon />
                    </Fab>

                </Box>
            </div>
            <Grid container spacing={2}>


                <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <Grid item xs={6}>
                        <Stack>
                            <MobileDateTimePicker
                                mask="____/__/__"
                                ampm={false}
                                value={value}
                                onChange={(newValue) => {
                                    setValue(newValue)
                                }}
                                label="Von"
                                inputFormat="yyyy.MM.dd HH:mm"

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


                <Grid item xs={12}>
                    <TextField  fullWidth variant="outlined" label="Kommentar" onChange={e => setKOMMENTAR(e.target.value)}></TextField>
                </Grid>
                <Grid item xs={6}>
                <TextField  fullWidth variant="outlined" label="Auftragnehmer" onChange={e => setAUFTRAGNEHMER(e.target.value)}></TextField>
                    
                </Grid>

                <Grid item xs={6}>
                <TextField  fullWidth variant="outlined" label="Sperren" onChange={e => setSPERREN(e.target.value)}></TextField>
                    
                </Grid>
                <Grid item xs={6}>

                <Grid item xs={12}>
                    <TextField  fullWidth variant="outlined" label="KSV" onChange={e => setKSV(e.target.value)}></TextField>
                </Grid>

                {/* <Autocomplete
                        disablePortal
                        id="combo-box-demo"
                        options={data3}
                        getOptionLabel={(option) => option.KSV}
                        renderInput={(params) => (<TextField {...params} variant="outlined" onChange={() => setKSV(e.target.value)} label="Ksv"></TextField>)}
                        isOptionEqualToValue={(option, value) => option.KSV === value.KSV}
                    /> */}
                </Grid>
                {/* <Grid item xs={6}>
                    <Autocomplete
                        disablePortal
                        id="combo-box-demo"
                        options={data5}
                        getOptionLabel={(option) => option.KSV}
                        renderInput={(params) => (<TextField {...params} variant="outlined" label="Ksv" ></TextField>)}
                        isOptionEqualToValue={(option, value) => option.KSV === value.KSV}
                    />
                </Grid>
                <Grid item xs={6}>
                    <Autocomplete
                        disablePortal
                        id="combo-box-demo"
                        options={data6}
                        getOptionLabel={(option) => option.KSV}
                        renderInput={(params) => (<TextField {...params} variant="outlined" label="Ksv" ></TextField>)}
                        isOptionEqualToValue={(option, value) => option.KSV === value.KSV}
                    />
                </Grid>
                <Grid item xs={6}>
                    <Autocomplete
                        disablePortal
                        id="combo-box-demo"
                        options={data7}
                        getOptionLabel={(option) => option.KSV}
                        renderInput={(params) => (<TextField {...params} variant="outlined" label="Ksv" onChange={e => setKsv1(e.target.value)}></TextField>)}
                        isOptionEqualToValue={(option, value) => option.KSV === value.KSV}
                    />
                </Grid> */}



                
            </Grid>


            {/* <Grid item xs={8}>
                    <TextField fullWidth label="Auftragnehmer" onChange={e => setAuftragnehmer(e.target.value)}></TextField>
                </Grid >
                <Grid item xs={6}>
                    <TextField fullWidth label="Sperren" onChange={e => setSperren(e.target.value)}></TextField>
                </Grid>
                <Grid item xs={6}>
                    <TextField fullWidth label="Kommentar" onChange={e => setKommentar(e.target.value)}></TextField>
                </Grid >
                <Grid item xs={6}>
                    <TextField fullWidth label="Von" onChange={e => setVon(e.target.value)}></TextField>
                </Grid>
                <Grid item xs={6}>
                    <TextField fullWidth label="Bis" onChange={e => setBis(e.target.value)}></TextField>
                </Grid> */}

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










});
