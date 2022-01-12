import { TextField, Grid, Box, Typography } from '@material-ui/core';
import {useState} from "react";
import axios from 'axios';
import { useRouter } from 'next/router';
import { makeStyles } from '@mui/styles';
import Button from '@mui/material/Button';
import SaveIcon from '@mui/icons-material/Save';
import { autocompleteClasses } from '@mui/material';
import Router from "next/router";

console.log("--> Start")
export default function Start() {
    const router = useRouter()

    function start(){
      router.push(`/mitarbeiter/login`) 
    }

    const classes = useStyles();

    

    router.push("mitarbeiter/login")

    return(
        <div className={classes.b}>
          <Button className={classes.a} onClick={() => start()}>Starten</Button>
        </div>
    )
}

const useStyles = makeStyles({
    a: {
      background: 'linear-gradient(45deg, #143968  30%, #143968  90%)',
      borderRadius: 3,
      boxShadow: '0 2px 5px 2px rgba(50, 50, 50, .3)',
      color: 'white',
      height: 80,
      width: "70%",
      padding: '0 30px',
      textAlign: 'center',
      marginTop: "10%",
      
    },

    b: {
        display: 'block',
        marginLeft: 'auto',
        marginTop: 'auto'
    },

    c: {
        display: 'inline-block'
    },

    d: {
        color: "green",
        textAlign: 'center',
        marginTop: 40,
    },

    e: {
        background: 'linear-gradient(45deg, #143968  30%, #143968  90%)',
        boxShadow: '0 3px 5px 2px rgba(70, 175, 219, .3)',
        marginTop: 0,
        paddingTop: 60,
        marginBottom: 100,
        fontSize: 40,
        height: 110,
        color: 'white',
        fontWeight: 'bold',
        borderBottomLeftRadius: 15,
        borderBottomRightRadius: 15,
    },

    f: {
        background: 'linear-gradient(45deg, #455a64 30%, #546e7a 90%)',
        boxShadow: '0 3px 5px 2px rgba(70, 175, 219, .3)',
        height: 75,
    },

    g: {
        marginTop:"40%"
    },
})

