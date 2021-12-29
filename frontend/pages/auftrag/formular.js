import { Button,TextField, Grid, Fab, Link, Typography } from "@material-ui/core";
import React, { useState, useEffect } from 'react';
import MomentUtils from '@date-io/moment';
import { DatePicker, TimePicker, DateTimePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import axios from 'axios';
import { useRouter } from 'next/router';
import { Autocomplete } from "@mui/material";
import useSWR from "swr";
import { makeStyles } from '@mui/styles';
import MenuIcon from '@mui/icons-material/Menu';
import AddIcon from '@mui/icons-material/Add';
import Stack from '@mui/material/Stack';
import MobileDateTimePicker from '@mui/lab/MobileDateTimePicker';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import { delLocale } from "next/dist/shared/lib/router/router";
import LogoutIcon from '@mui/icons-material/Logout';
import HomeIcon from '@mui/icons-material/Home';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Router from "next/router";
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

console.log("--> Formular")




export default function Formular() {

    const { query } = useRouter()
    const classes = useStyles();
    // const [data, setData] = useState([]);

    let [ksv, setKsv] = useState('')
    let auftraggeber = query.param2
    let [auftragnehmer, setAuftragnehmer] = useState('')
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


    function create() {
        axios.post('http://localhost:8090/api/Auftrag/create', null, { params: { ksv, auftraggeber, auftragnehmer, sperren, kommentar, von, bis, status } })
            .then(res => {
                console.log(res)

            })
            .then((data) => setData(data));
    }

    let kurzzeichen = query.param

    let loaded = false


    useEffect(() => {
        fetch(`http://localhost:8090/api/Mitarbeiter/all`)
            .then((response) => response.json())
            .then((data2) => setData2(data2));
    }, []);


    useEffect(() => {
        fetch(`http://localhost:8090/api/KSV/select?ebene=1`)
            .then((response) => response.json())
            .then((data3) => setData3(data3));
    }, []);

function loadEbene2(){

    useEffect(() => {
        fetch(`http://localhost:8090/api/KSV/select?ksv=${ksv1}&ebene=2`)
            .then((response) => response.json())
            .then((data4) => setData4(data4));
    }, []);

}
   
    useEffect(() => {
        fetch(`http://localhost:8090/api/KSV/select?ksv=${ksv1}&ebene=3`)
            .then((response) => response.json())
            .then((data5) => setData5(data5));
    }, []);

    useEffect(() => {
        fetch(`http://localhost:8090/api/KSV/select?ksv=${ksv1}&ebene=4`)
            .then((response) => response.json())
            .then((data6) => setData6(data6));
    }, []);

    useEffect(() => {
        fetch(`http://localhost:8090/api/KSV/select?ksv=${ksv1}&ebene=5`)
            .then((response) => response.json())
            .then((data7) => setData7(data7));
    }, []);

    useEffect(() => {
        fetch(`http://localhost:8090/api/KSV/select?ksv=${ksv1}&ebene=6`)
            .then((response) => response.json())
            .then((data8) => setData8(data8));
    }, []);

    useEffect(() => {
        fetch(`http://localhost:8090/api/KSV/select?ksv=${ksv1}&ebene=7`)
            .then((response) => response.json())
            .then((data9) => setData9(data9));
    }, []);

    useEffect(() => {
        fetch(`http://localhost:8090/api/KSV/select?ksv=${ksv1}&ebene=8`)
            .then((response) => response.json())
            .then((data10) => setData10(data10));
    }, []);

    useEffect(() => {
        fetch(`http://localhost:8090/api/KSV/select?ksv=${ksv1}&ebene=9`)
            .then((response) => response.json())
            .then((data11) => setData11(data11));
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


            </div>
            <Grid container spacing={2}>


                <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <Grid item xs={6}>
                        <Stack>
                            <MobileDateTimePicker
                                ampm={false}
                                value={value}
                                onChange={(newValue) => {
                                    setValue(newValue)
                                }}
                                label="Von"
                                inputFormat="dd/MM/yyyy hh:mm"

                                renderInput={(params) => <TextField onChange={e => setVon(e.target.value)} variant="outlined" {...params} />}

                            />

                        </Stack>

                    </Grid>



                    <Grid item xs={6}>
                        <Stack>
                            <MobileDateTimePicker

                                ampm={false}
                                label="24hours"
                                disableFuture
                                value={value1}
                                onChange={(newValue1) => {
                                    setValue1(newValue1)
                                }}
                                label="Bis"
                                inputFormat="dd/MM/yyyy hh:mm"

                                renderInput={(params) => <TextField onChange={e => setBis(e.target.value)} variant="outlined" {...params} />}

                            />

                        </Stack>
                    </Grid>



                </LocalizationProvider>


                <Grid item xs={12}>
                    <TextField fullWidth variant="outlined" label="Kommentar" onChange={e => setKommentar(e.target.value)}></TextField>
                </Grid>
                <Grid item xs={6}>
                    <Autocomplete
                        disablePortal
                        id="combo-box-demo"
                        options={data2}
                        getOptionLabel={(option) => option.NAME}
                        onChange={handleLoad1}
                        renderInput={(params) => (<TextField {...params} variant="outlined" label="Name" ></TextField>)}
                        isOptionEqualToValue={(option, value) => option.NAME === value.NAME}
                    
                    />
                    <button onClick={loadEbene2()}>Click</button>
                </Grid>
                
                <Grid item xs={6}>
                    <Autocomplete
                        disablePortal
                        id="combo-box-demo"
                        options={data3}
                        getOptionLabel={(option) => option.KSV}

                        renderInput={(params) => (<TextField {...params} variant="outlined" value={x} onChange={handleChange} label="Ksv"></TextField>)}
                        isOptionEqualToValue={(option, value) => option.KSV === value.KSV}
                    />
                    <Button onClick={() => test()}>Weiter</Button>
                </Grid>
                <Grid item xs={6}>
                    <Autocomplete
                        disablePortal
                        id="combo-box-demo"
                        options={data4}
                        getOptionLabel={(option) => option.KSV}

                        renderInput={(params) => (<TextField {...params} variant="outlined" label="Ksv" ></TextField>)}
                        isOptionEqualToValue={(option, value) => option.KSV === value.KSV}
                    />
                </Grid>
                <Grid item xs={6}>
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
                </Grid>




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



            <Fab onClick={() => create()} color="secondary" className={classes.Fab} aria-label="add">
                <AddIcon />
            </Fab>

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

    ChangeBTN: {
        width: 2,
    },

    DeleteBTN: {

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
        position: 'relative',
        left: "80%",
        background: 'red',

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

    p: {
        borderBottom: "solid",
        width: "85%",
        marginTop: 10,


    },

    kommi: {
        borderBottom: "solid",
        width: "85%",
        wordWrap: "break-word",
    },

});
