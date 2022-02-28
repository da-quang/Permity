import TextField from '@mui/material/TextField';
import React, {useState} from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import { makeStyles } from '@mui/styles';
import Button from '@mui/material/Button';

import { Typography } from '@mui/material';


import LoginForm from '../../components/Login/LoginForm'



console.log("--> Login")
export default function Login() {
  
    const classes = useStyles();
    //const matches = useMediaQuery('(min-width:992px)');

    return (

        <form className={classes.h}>

            <div className={classes.e}>
                <div align="center"><Typography variant='h4'>PERMITY</Typography></div>
            </div>

           <LoginForm/>
           
        </form>
    )
}

const useStyles = makeStyles({
    a: {
        height: 80,
        width: 280,
        textAlign: 'center',


    },

    b: {
        height: 40,
        width: 280,

    },

    c: {
        textAlign: 'center',
        marginTop: "100px",
        color: "white",
        marginBottom: "40px",

    },


    d: {

        textAlign: 'center',
        marginTop: 40,
    },

    e: {
        background: 'linear-gradient(45deg, #143968  30%, #143968  90%)',
        boxShadow: '0 3px 5px 2px rgba(20, 57, 104, .3)',
        marginTop: 0,
        paddingTop: 15,
        marginBottom: "5%",
        fontSize: 40,
        height: 60,
        color: 'white',
        fontWeight: 'bold',
        borderBottomLeftRadius: 15,
        borderBottomRightRadius: 15,
    },

    g: {
        marginTop: "160px",

    },





})

