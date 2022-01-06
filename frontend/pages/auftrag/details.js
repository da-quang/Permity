import {useState} from "react";
import axios from 'axios';
import { useRouter } from 'next/router';
import { makeStyles } from '@mui/styles';
import Button from '@mui/material/Button';
import SaveIcon from '@mui/icons-material/Save';
import { autocompleteClasses } from '@mui/material';
import Typography from '@mui/material/Typography';
import useSWR from "swr";
import MenuIcon from '@mui/icons-material/Menu';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const fetcher = (...args) => fetch(...args).then((response) => response.json())
console.log("--> Details")
export default function Start() {
    const { query } = useRouter()
    const router = useRouter()
    let id = query.param;
    console.log(id)
    const { data, error } = useSWR(`https://palmiest-hornet-1388.dataplicity.io/api/api/Auftrag/find?id=${id}`, fetcher);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const classes = useStyles();
    return(
        <div>
            <div className={classes.kopf}>
                <div>
                    <Button color="inherit">
                        <MenuIcon fontSize="large" />
                    </Button>
                </div>                  
                <Typography variant="h4"> Auftrag </Typography>
                <Typography variant="h6" className={classes.kopfInfo}>{query.param}</Typography>
            </div>
            <TableContainer component={Paper}>
                <TableBody>
                    <TableRow>
                        <TableCell> ID </TableCell>
                        <TableCell> AUFTRAG </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell> {data[0].ID} </TableCell>
                        <TableCell> {data[0].AUFTRAG} </TableCell>
                    </TableRow>

                    <TableRow>
                        <TableCell> KSV </TableCell>
                        <TableCell> SPERRE </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell> {data[0].KSV} </TableCell>
                        <TableCell> {data[0].SPERRE} </TableCell>
                    </TableRow>

                    <TableRow>
                        <TableCell> VON </TableCell>
                        <TableCell> BIS </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell> {data[0].VON} </TableCell>
                        <TableCell> {data[0].BIS} </TableCell>
                    </TableRow>

                    <TableRow>
                        <TableCell> KOMMENTAR </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell> {data[0].KOMMENTAR} </TableCell>
                    </TableRow>

                    <TableRow>
                        <TableCell> AUFTRAGGEBER </TableCell>
                        <TableCell> AUFTRAGNEHMER </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell> {data[0].AUFTRAGGEBER} </TableCell>
                        <TableCell> {data[0].AUFTRAGNEHMER} </TableCell>
                    </TableRow>

                    <TableRow>
                        <TableCell> UNTERSCHRIFT </TableCell>
                        <TableCell> UNTERSCHRIFT </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell> <img src={data[0].AUFTRAGGEBER_UNTERSCHRIFT}/> </TableCell>
                        <TableCell> <img src={data[0].AUFTRAGNEHMER_UNTERSCHRIFT}/> </TableCell>
                    </TableRow>
                </TableBody>
            </TableContainer>
        </div>
    )
}

const useStyles = makeStyles({
    unterschrift:{
        width: 150,
        height: 150,
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
})

