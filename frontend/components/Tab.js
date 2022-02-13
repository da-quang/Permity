import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { TextField } from '@mui/material';
import { useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import Accordions from './Accordions';
import { Button } from '@mui/material';
import router, { useRouter } from 'next/router';

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    const router = useRouter()

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

export default function BasicTabs(props) {
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);


    };

    const [KsvFilter, setKsvFilter] = useState("");
    const [AuftraggeberFilter, setAuftraggeberFilter] = useState("");
    const [AuftragnehmerFilter, setAuftragnehmerFilter] = useState("");

    const handleSearchChange3 = e => {
        console.log(e.target.value)
        setKsvFilter(e.target.value)

    };

    const handleSearchChange4 = e => {
        console.log(e.target.value)
        setAuftraggeberFilter(e.target.value)

    };

    const handleSearchChange5 = e => {
        console.log(e.target.value)
        setAuftragnehmerFilter(e.target.value)

    };

    const kurzzeichen = props.kurzzeichen
    const name = props.name
    console.log(props.Kurzzeichen)
    console.log(props.name)
    return (
        <Box sx={{ width: '100%' }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={value}
                    onChange={handleChange}

                    aria-label="scrollable force tabs example">
                    <Tab wrapped label="KSV" {...a11yProps(0)} />
                    <Tab wrapped label="Auftraggeber" {...a11yProps(1)} />
                    <Tab wrapped label="Auftragnehmer" {...a11yProps(2)} />
                </Tabs>
            </Box>
            <TabPanel value={value} index={0}>
                <TextField fullWidth size="small" variant="outlined" value={KsvFilter} onChange={handleSearchChange3} label={"KSV"}></TextField>
            </TabPanel>
            <TabPanel value={value} index={1}>
                <TextField fullWidth size="small" variant="outlined" value={AuftraggeberFilter} onChange={handleSearchChange4} label={"Auftraggeber"}></TextField>
            </TabPanel>
            <TabPanel value={value} index={2}>
                <TextField fullWidth size="small" variant="outlined" value={AuftragnehmerFilter} onChange={handleSearchChange5} label={"Auftragnehmer"}></TextField>
            </TabPanel>
            <Button onClick={
                () => {
                    router.push(`startseite?param=${kurzzeichen}&param2=${name}&filter1=${KsvFilter}`,null,{ shallow: true })
                }
            }>Speichern</Button>

        </Box>
    );
}
