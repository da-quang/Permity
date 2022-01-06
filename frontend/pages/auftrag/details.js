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
            <div>
                <div>{data[0].ID}</div>
                <div>{data[0].AUFTRAG}</div>
                <div>{data[0].KSV}</div>
                <div>{data[0].SPERREN}</div>
                <div>{data[0].VON}</div>
                <div>{data[0].BIS}</div>
                <div>{data[0].STATUS}</div>
                <div>{data[0].KOMMENTAR}</div>
                <div>{data[0].AUFTRAGGEBER}</div>
                <img className={classes.unterschrift} src={data[0].AUFTRAGGEBER_UNTERSCHRIFT}/>
                <div>{data[0].AUFTRAGNEHMER}</div>
                <img className={classes.unterschrift} src={data[0].AUFTRAGNEHMER_UNTERSCHRIFT}/>
            </div>
            <TableContainer component={Paper}>
                <TableHead>
                    <TableRow>
                        <TableCell> ID </TableCell>
                        <TableCell> AUFTRAG </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell> {data[0].ID} </TableCell>
                        <TableCell> {data[0].AUFTRAG} </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    
                </TableBody>
                
                <TableHead>
                    <TableRow>
                        <TableCell> KSV </TableCell>
                        <TableCell> SPERRE </TableCell>
                    </TableRow>
                </TableHead>

                <TableHead>
                    <TableRow>
                        <TableCell> VON </TableCell>
                        <TableCell> BIS </TableCell>
                    </TableRow>
                </TableHead>

                <TableHead>
                    <TableRow>
                        <TableCell> KOMMENTAR </TableCell>
                    </TableRow>
                </TableHead>

                <TableHead>
                    <TableRow>
                        <TableCell> AUFTRAGGEBER </TableCell>
                        <TableCell> AUFTRAGNEHMER </TableCell>
                    </TableRow>
                </TableHead>

                <TableHead>
                    <TableRow>
                        <TableCell> UNTERSCHRIFT </TableCell>
                        <TableCell> UNTERSCHRIFT </TableCell>
                    </TableRow>
                </TableHead>
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

