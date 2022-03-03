/* eslint-disable react/prop-types */
import { makeStyles } from '@mui/styles';
// eslint-disable-next-line no-unused-vars
import useSWR, { mutate, SWRConfig } from "swr";
import React from "react";
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import PublishedWithChangesIcon from '@mui/icons-material/PublishedWithChanges';

function ErneutSendenButton(props) {

    const classes = useStyles();

    const Mail = async auftragnehmer => {
        const getEmail = await fetch(`https://palmiest-hornet-1388.dataplicity.io/api/api/Mitarbeiter/email?name=${auftragnehmer}`, {
            method: 'GET'
        })
        const email = await getEmail.json()

        // eslint-disable-next-line no-unused-vars
        const sendEmail = await fetch(`https://palmiest-hornet-1388.dataplicity.io/api/api/Email/send?email=${email[0].EMAIL}`, {
            method: 'POST'
        })
        
        console.log("Email wurde versendet")
    }


    const ErneutSenden = async auftragID => {

        let newDate = new Date();

        let InsertDate = `${newDate.getFullYear()}.${newDate.getMonth() + 1}.${newDate.getDate()} ${newDate.getHours()}:${newDate.getMinutes()}`;

        const response = await fetch(`https://palmiest-hornet-1388.dataplicity.io/api/api/Auftrag/resend?id=${auftragID}&am=${InsertDate}`, {
            method: 'PUT'
        })
        const data = await response.json()
        console.log(data)

        mutate(`https://palmiest-hornet-1388.dataplicity.io/api/api/Auftrag/all?name=${props.name}`)

    }

    return (
        <a className={props.A_Geber == props.Name || props.A_Nehmer == props.A_Geber ? null : classes.Check}>
            <Tooltip title="Erneut senden">
                <IconButton onClick={() => { ErneutSenden(props.ID); Mail(props.A_Nehmer) }} style={{ float: 'right', maxWidth: '40px', maxHeight: '40px', minWidth: '40px', minHeight: '40px' }} color="inherit">
                    <PublishedWithChangesIcon />
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

export default ErneutSendenButton