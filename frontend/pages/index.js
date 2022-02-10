import { TextField, Grid, Box, Typography } from '@material-ui/core';
import {useState} from "react";
import axios from 'axios';
import { useRouter } from 'next/router';
import { makeStyles } from '@mui/styles';
import Button from '@mui/material/Button';
import SaveIcon from '@mui/icons-material/Save';
import { autocompleteClasses } from '@mui/material';


export const getServerSideProps = async ({ res }) => {
    res.setHeader("location", `/mitarbeiter/login`);

    res.statusCode = 302;
    res.end();

    return { props: {} };
};

const Index = () => <>Index</>;

export default Index;


