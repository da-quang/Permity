
import { useRouter } from 'next/router';
import { makeStyles } from '@mui/styles';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import useSWR, { mutate, SWRConfig } from "swr";
import DeleteIcon from '@mui/icons-material/Delete';
import React, { useEffect, useRef, useState } from "react";
import Menu from '@mui/material/Menu';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import { Divider, ListItem, TextField } from '@mui/material';
import HowToRegIcon from '@mui/icons-material/HowToReg';
import DoubleArrowIcon from '@mui/icons-material/DoubleArrow';
import IconButton from '@mui/material/IconButton';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Badge from '@mui/material/Badge';
import Tooltip from '@mui/material/Tooltip';
import { styled } from '@mui/material/styles';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import PublishedWithChangesIcon from '@mui/icons-material/PublishedWithChanges';
import { useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/styles';
import { Stack } from '@mui/material';
import MobileDateTimePicker from '@mui/lab/MobileDateTimePicker';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import SaveIcon from '@mui/icons-material/Save';



function BestätigenButton(props) {

    const classes = useStyles();


    const Bestätigen = async auftragID => {

        let newDate = new Date();
        let InsertDate = `${newDate.getFullYear()}.${newDate.getMonth() + 1}.${newDate.getDate()} ${newDate.getHours()}:${newDate.getMinutes()}`;

        console.log(InsertDate)

        const response = await fetch(`https://palmiest-hornet-1388.dataplicity.io/api/api/Auftrag/confirm?id=${auftragID}&am=${InsertDate}`, {
            method: 'PUT'
        })

        const data = await response.json()
        console.log(data)

        mutate(`https://palmiest-hornet-1388.dataplicity.io/api/api/Auftrag/all?name=${props.Name}`)
    }

    return (
        <a className={props.A_Geber !== props.Name || props.A_Geber == props.A_Nehmer ? null : classes.Check}>
        <Tooltip title="Bestätigen">
            <IconButton onClick={() => { Bestätigen(props.ID) }} style={{ float: 'right', maxWidth: '40px', maxHeight: '40px', minWidth: '40px', minHeight: '40px' }} color="inherit">
                <CheckCircleOutlineIcon />
            </IconButton>
        </Tooltip>
    </a>
    )
}

const useStyles = makeStyles(() => ({
    Check: {
        display: 'none',
    },

}))

export default BestätigenButton