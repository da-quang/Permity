import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { makeStyles } from "@mui/styles";
import Stack from "@mui/material/Stack";
import MobileDateTimePicker from "@mui/lab/MobileDateTimePicker";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import AdapterDateFns from "@mui/lab/AdapterDateFns";

import { Autocomplete } from "@mui/material";

import { useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/styles";

import FormularCreate from "./FormularCreate";

console.log("--> Formular");

function FormularGrid() {
  const [Name, setName] = useState("");

  const [value, setValue] = useState(new Date());
  const [value1, setValue1] = useState(new Date());

  useEffect(() => {
    value.setHours(7, 30);
    value1.setHours(16, 45);
  }, []);

  useEffect(() => {
    fetch(`https://palmiest-hornet-1388.dataplicity.io/api/api/Mitarbeiter/all`)
      .then((response) => response.json())
      .then((name) => setName(name));
  }, []);

  const { query } = useRouter();
  const classes = useStyles();

  const theme = useTheme();

  const matchesMD = useMediaQuery(theme.breakpoints.up("md"));

  let VON = `${value.getFullYear()}.${
    value.getMonth() + 1
  }.${value.getDate()} ${value.getHours()}:${value.getMinutes()}`;
  let BIS = `${value1.getFullYear()}.${
    value1.getMonth() + 1
  }.${value1.getDate()} ${value1.getHours()}:${value1.getMinutes()}`;

  let [KSV, setKSV] = useState("");
  let [KOMMENTAR, setKOMMENTAR] = useState("-");
  let [AUFTRAGNEHMER, setAUFTRAGNEHMER] = useState("");
  let [SPERREN, setSPERREN] = useState("");
  let [AUFTRAG, setAUFTRAG] = useState("");

  let AUFTRAGGEBER_UNTERSCHRIFT = "Placeholder";

  let AUFTRAGGEBER = query.param2;

  let [Ebene2LoadNext, setEbene2LoadNext] = useState("x");
  let [Ebene3LoadNext, setEbene3LoadNext] = useState("x");
  let [Ebene4LoadNext, setEbene4LoadNext] = useState("x");

  const Sperren = [
    {
      label: "Durchführungserlaubnis",
    },
    { label: "Freigabe zur Arbeit" },
    { label: "Freigabe zur Sperre" },
    {
      label: "Prüfungserlaubnis",
    },
  ];

  let [ebene3, setEbene3] = useState("");
  let [ebene4, setEbene4] = useState("");
  let [ebene5, setEbene5] = useState("");

  let [KsvALL, setKsvALL] = useState("");

  useEffect(() => {
    fetch(
      `https://palmiest-hornet-1388.dataplicity.io/api/api/KSV/all?kurzzeichen=${query.param}`
    )
      .then((response) => response.json())
      .then((KsvALL) => setKsvALL(KsvALL));
  }, []);

  useEffect(() => {
    fetch(
      `https://palmiest-hornet-1388.dataplicity.io/api/api/KSV/select?ksv=${Ebene2LoadNext}&ebene=3`
    )
      .then((response) => response.json())
      .then((ebene3) => setEbene3(ebene3));
  }, [Ebene2LoadNext]);

  useEffect(() => {
    fetch(
      `https://palmiest-hornet-1388.dataplicity.io/api/api/KSV/select?ksv=${Ebene3LoadNext}&ebene=4`
    )
      .then((response) => response.json())
      .then((ebene4) => setEbene4(ebene4));
  }, [Ebene3LoadNext]);

  useEffect(() => {
    fetch(
      `https://palmiest-hornet-1388.dataplicity.io/api/api/KSV/select?ksv=${Ebene4LoadNext}&ebene=5`
    )
      .then((response) => response.json())
      .then((ebene5) => setEbene5(ebene5));
  }, [Ebene4LoadNext]);

  let [Ebene3Bezeichnung, setEbene3Bezeichnung] = useState("");
  let [Ebene4Bezeichnung, setEbene4Bezeichnung] = useState("");

  useEffect(() => {
    setEbene3LoadNext("x");
    setEbene4LoadNext("x");
  }, [Ebene2LoadNext]);

  useEffect(() => {
    setEbene4LoadNext("x");
  }, [Ebene3LoadNext]);

  return (
    <Grid
      style={{
        marginLeft: matchesMD == true ? "20%" : "",
        marginRight: matchesMD == true ? "20%" : "",
        marginTop: "20px",
      }}
    >
      <div className={classes.g}>
        <Grid className={classes.h} item xs={6}>
          <TextField
            size="small"
            fullWidth
            variant="outlined"
            label="Auftrag Name"
            onChange={(e) => setAUFTRAG(e.target.value)}
          ></TextField>
        </Grid>
        <Grid item xs={6}>
          <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={Name}
            getOptionLabel={(option) => option.NAME}
            onChange={(event, value) => {
              if (value === null) {
                value = "";
              } else {
                setAUFTRAGNEHMER(value.NAME);
              }
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                size="small"
                variant="outlined"
                label="Auftragnehmer"
              ></TextField>
            )}
            isOptionEqualToValue={(option, value) => option.NAME === value.NAME}
          />
        </Grid>
      </div>
      <div className={classes.g}>
        <Grid className={classes.h} item xs={6}>
          <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={Sperren}
            getOptionLabel={(option) => option.label}
            onChange={(event, value) => setSPERREN(value.label)}
            renderInput={(params) => (
              <TextField
                {...params}
                size="small"
                variant="outlined"
                label="Sperre"
              ></TextField>
            )}
            isOptionEqualToValue={(option, value) =>
              option.label === value.label
            }
          />
        </Grid>

        <Grid item xs={6}>
          <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={KsvALL}
            getOptionLabel={(option) => option.BEZEICHNUNG}
            onChange={(event, value) => {
              if (value === null) {
                value = "";
                setEbene2LoadNext("x");
              } else {
                setEbene2LoadNext(value.KSV), setKSV(value.BEZEICHNUNG);
              }
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                size="small"
                variant="outlined"
                label="Ksv 1"
              ></TextField>
            )}
            isOptionEqualToValue={(option, value) =>
              option.BEZEICHNUNG === value.BEZEICHNUNG
            }
          />
        </Grid>
      </div>
      <div className={classes.g}>
        <Grid className={classes.h} item xs={6}>
          <Autocomplete
            key={Ebene2LoadNext}
            disabled={ebene3 == "" ? true : false}
            disablePortal
            id="combo-box-demo"
            options={ebene3}
            getOptionLabel={(option) => option.BEZEICHNUNG}
            onChange={(event, value) => {
              if (value === null) {
                value = "";
                setEbene3LoadNext("x");
                setEbene3Bezeichnung("");
                setKSV(Ebene2LoadNext);
                console.log("Null");
              } else {
                setEbene3LoadNext(value.KSV),
                  setKSV(value.BEZEICHNUNG),
                  setEbene3Bezeichnung(value.BEZEICHNUNG);
                console.log("NOT Null");
              }
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                size="small"
                variant="outlined"
                label="Ksv 2"
              ></TextField>
            )}
            isOptionEqualToValue={(option, value) =>
              option.BEZEICHNUNG === value.BEZEICHNUNG
            }
          />
        </Grid>

        <Grid item xs={6}>
          <Autocomplete
            key={Ebene3LoadNext}
            disabled={ebene3 == "" || ebene4 == "" ? true : false}
            disablePortal
            id="combo-box-demo"
            options={ebene4}
            getOptionLabel={(option) => option.BEZEICHNUNG}
            onChange={(event, value) => {
              if (value === null) {
                value = "";
                setEbene4LoadNext("x");
                setEbene4Bezeichnung("");
                setKSV(Ebene3Bezeichnung);
              } else {
                setEbene4LoadNext(value.KSV);
                setKSV(value.BEZEICHNUNG);
                setEbene4Bezeichnung(value.BEZEICHNUNG);
              }
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                value=""
                size="small"
                variant="outlined"
                label="Ksv 3"
              ></TextField>
            )}
            isOptionEqualToValue={(option, value) =>
              option.BEZEICHNUNG === value.BEZEICHNUNG
            }
          />
        </Grid>
      </div>
      <div className={classes.g}>
        <Grid className={classes.h} item xs={6}>
          <Autocomplete
            key={Ebene4LoadNext}
            disabled={
              ebene3 == "" || ebene4 == "" || ebene5 == "" ? true : false
            }
            disablePortal
            id="combo-box-demo"
            options={ebene5}
            getOptionLabel={(option) => option.BEZEICHNUNG}
            onChange={(event, value) => {
              if (value === null) {
                value = "";
                setKSV(Ebene4Bezeichnung);
              } else {
                setKSV(value.BEZEICHNUNG);
              }
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                size="small"
                variant="outlined"
                label="Ksv 4"
              ></TextField>
            )}
            isOptionEqualToValue={(option, value) =>
              option.BEZEICHNUNG === value.BEZEICHNUNG
            }
          />
        </Grid>

        <Grid item xs={6}>
          <TextField
            size="small"
            multiline
            maxRows={4}
            fullWidth
            variant="outlined"
            label="Kommentar"
            onChange={(e) => setKOMMENTAR(e.target.value)}
          ></TextField>
        </Grid>
      </div>
      <div className={classes.g}>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <Grid className={classes.h} item xs={6}>
            <Stack>
              <MobileDateTimePicker
                ampm={false}
                value={value}
                onChange={(newValue) => {
                  setValue(newValue);
                }}
                label="Von"
                inputFormat="yyyy/MM/dd HH:mm"
                renderInput={(params) => (
                  <TextField size="small" variant="outlined" {...params} />
                )}
              />
            </Stack>
          </Grid>
          <Grid item xs={6}>
            <Stack>
              <MobileDateTimePicker
                ampm={false}
                value={value1}
                onChange={(newValue1) => {
                  setValue1(newValue1);
                }}
                label="Bis"
                inputFormat="yyyy/MM/dd HH:mm"
                renderInput={(params) => (
                  <TextField size="small" variant="outlined" {...params} />
                )}
              />
            </Stack>
          </Grid>
        </LocalizationProvider>
      </div>
      <div className={classes.BTNGroup}>
        <Grid
          style={{
            marginLeft: matchesMD == true ? "20%" : "10%",
            marginRight: matchesMD == true ? "20%" : "10%",
          }}
          item
          xs={12}
        >
          <FormularCreate
            AuftraggeberUnterschrift={AUFTRAGGEBER_UNTERSCHRIFT}
            Auftraggeber={AUFTRAGGEBER}
            Auftragnehmer={AUFTRAGNEHMER}
            Von={VON}
            Bis={BIS}
            Auftrag={AUFTRAG}
            Ksv={KSV}
            Sperren={SPERREN}
            Kommentar={KOMMENTAR}
            param={query.param}
            param2={query.param2}
          />
        </Grid>
      </div>
    </Grid>
  );
}

const useStyles = makeStyles({
  CreateBTN: {
    width: "60%",
    marginTop: "80px",
  },

  SignBTN: {
    width: "80%",
  },

  BTNGroup: {
    fontWeight: "bold",
    height: "60px",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
  },

  typoh4: {
    fontWeight: "bold",
  },
  typoh6: {
    width: 60,
    height: 30,
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    textAlign: "center",
    position: "relative",
    right: "2%",
    top: "15%",
  },

  Fab: {
    position: "fixed",
    right: "8%",
    bottom: "5%",

    zIndex: "999",
  },

  BTN: {
    color: "white",
    fontSize: 100,
    fontWeight: "600",
  },

  b: {
    height: 40,
    width: 280,
    padding: "0 30px",
  },

  c: {
    textAlign: "center",
  },

  d: {
    color: "green",
    textAlign: "center",
    marginTop: 40,
  },

  e: {
    background: "linear-gradient(45deg, #143968 30%, #143968 90%)",
    boxShadow: "0 3px 5px 2px rgba(20, 57, 104, .3)",
    marginTop: 0,
    paddingTop: 15,
    marginBottom: "5%",
    height: 60,
    color: "white",
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
    justifyContent: "space-between",
    display: "flex",
  },

  SignatureBTNRow: {
    display: "flex",
    textAlign: "center",
    margin: "auto",
    justifyContent: "center",
  },

  g: {
    display: "flex",
    padding: 10,
  },

  h: {
    paddingRight: 10,
  },
});

export default FormularGrid;
