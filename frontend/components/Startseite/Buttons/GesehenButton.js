import { makeStyles } from '@mui/styles';
import React from "react";
// eslint-disable-next-line no-unused-vars
import useSWR, { mutate, SWRConfig } from "swr";
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';

function GesehenButton(props) {

    const classes = useStyles();

    const Gesehen = async auftragID => {

        let newDate = new Date();

        let InsertDate = `${newDate.getFullYear()}.${newDate.getMonth() + 1}.${newDate.getDate()} ${newDate.getHours()}:${newDate.getMinutes()}`;

        const response = await fetch(`https://palmiest-hornet-1388.dataplicity.io/api/api/Auftrag/watched?id=${auftragID}&am=${InsertDate}`, {
            method: 'PUT'
        })
        const data = await response.json()
        console.log(data)

        // eslint-disable-next-line no-undef
        mutate(`https://palmiest-hornet-1388.dataplicity.io/api/api/Auftrag/all?name=${props.Name}`)

    }

    return (
        <a className={props.Gesehen == null && (props.A_Nehmer !== props.Name && props.A_Geber == props.Name || props.A_Geber == props.A_Nehmer) ? null : classes.Check}>
            <Tooltip title="Bestätigung gesehen">
                <IconButton onClick={() => Gesehen(props.ID)} style={{ float: 'right', maxWidth: '40px', maxHeight: '40px', minWidth: '40px', minHeight: '40px' }} color="inherit">
                    <RemoveRedEyeIcon />
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

export default GesehenButton