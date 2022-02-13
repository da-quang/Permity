
import { AppBar, Menu, Typography, Button } from '@mui/material';
import { IconButton } from '@mui/material';
import Tooltip from '@mui/material/Tooltip';
import { makeStyles } from '@mui/styles';
import DeleteIcon from '@mui/icons-material/Delete';
import React, { useRef, useState } from "react";
import Badge from '@mui/material/Badge';
import useSWR from 'swr';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';

const fetcher = (...args) => fetch(...args).then((response) => response.json())
console.log("--> Übersicht")

function Accordions(props) {

    const { data, error } = useSWR(`https://palmiest-hornet-1388.dataplicity.io/api/api/Auftrag/all?name=${name}`, fetcher)

    if (error) return <div>failed to load</div>
    if (!data) return <div>loading...</div>

    const Delete = async auftragID => {
        const response = await fetch(`https://palmiest-hornet-1388.dataplicity.io/api/api/Auftrag/delete?id=${auftragID}`, {
            method: 'DELETE'
        })
        const data = await response.json()
        console.log(data)
        
        mutate(`https://palmiest-hornet-1388.dataplicity.io/api/api/Auftrag/all?name=${name}`)
    }

    let Count4 = 0
    let Abgeschlossen = data.filter(item => item.STATUS === 'Abgeschlossen')
    Count4 = Abgeschlossen.length

    return (
        <Accordion style={{ marginLeft: '3%', marginRight: '3%', padding: '0%', borderRadius: '15px', backgroundColor: '#143968', color: 'white' }}>
            <AccordionSummary

                expandIcon={<ExpandMoreIcon style={{ color: 'white' }} />}
                aria-controls="panel1a-content"
                id="panel1a-header"
            >
                <StyledBadge showZero badgeContent={Count4} color="primary"><FiberManualRecordIcon /></StyledBadge><Typography style={{ fontWeight: 'bold', marginLeft: "6px" }}>Abgeschlossen</Typography>
            </AccordionSummary>
            <AccordionDetails style={{ padding: '0px' }}>
                {data && data.map((auftrag, id) => <a key={id}>
                    {auftrag.STATUS == "Abgeschlossen" && data[id].SPERREN.includes(filter2) && data[id].KSV.includes(filter3) &&
                        <div className={classes.Abgeschlossen}>
                            <details className={classes.details}>
                                <summary className={classes.summary}>
                                    {auftrag.ID} | {auftrag.AUFTRAG}
                                    <Tooltip title="Löschen">
                                        <IconButton onClick={() => Delete(auftrag.ID)} style={{ float: 'right', maxWidth: '40px', maxHeight: '40px', minWidth: '40px', minHeight: '40px' }} color="inherit">
                                            <DeleteIcon />
                                        </IconButton>
                                    </Tooltip>
                                </summary>
                                <div className={classes.InsideCard}>
                                    <Typography> <a style={{ fontWeight: "bold" }}>KSV:</a> {auftrag.KSV}</Typography>
                                    <Typography> <a style={{ fontWeight: "bold" }}>Auftraggeber: </a> {auftrag.AUFTRAGGEBER}</Typography>
                                    <Typography> <a style={{ fontWeight: "bold" }}>Auftragnehmer: </a> {auftrag.AUFTRAGNEHMER}</Typography>
                                    <Typography> <a style={{ fontWeight: "bold" }}>Sperren: </a> {auftrag.SPERREN}</Typography>
                                    <div style={{ marginBottom: 30 }}>
                                        <Button onClick={() => router.push(`/auftrag/details?param=${kurzzeichen}&param2=${auftrag.ID}`)} style={{ float: 'right', color: 'white' }}>
                                            Details <DoubleArrowIcon />
                                        </Button>
                                    </div>
                                </div>
                            </details>
                        </div>}
                </a>)}
            </AccordionDetails>
        </Accordion>
    )
}

const useStyles = makeStyles((theme) => ({

    BTNEnabled: {
        background: 'linear-gradient(45deg, #143968 30%, #143968 90%)',
    },

    BTNDisabled: {
        background: 'linear-gradient(90deg, rgba(212,25,25,1) 38%, rgba(212,25,25,1) 100%)',
    },

    SummaryBTNDisabled: {
        display: 'none',
    },

    summary: {
        lineHeight: '2.5',
        justifyContent: 'space-between',
        fontWeight: "bold",
        outline: 'none',
    },

    summary2: {
        marginTop: "2%",
        marginRight: "5%",
        marginLeft: "5%",
        lineHeight: '2.5',
        justifyContent: 'space-between',
        fontWeight: "bold",
        borderRadius: 15,
        background: "#143968",
    },

    Summary2Txt: {
        marginLeft: "8%",

    },


    SummaryWrapper: {
        borderRadius: 15,
        color: "white",
    },

    Abgeschlossen: {
        paddingLeft: 15,
        marginLeft: '5%',
        marginRight: '5%',
        borderRadius: 15,
        background: '#4a4a49',
        color: "white",
        marginBottom: "10px"
    },

    Details: {
        color: "white",
    },

    InsideCard: {
        paddingBottom: 10,
    },


}))


export default Accordions