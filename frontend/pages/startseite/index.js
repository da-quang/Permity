import { useRouter } from "next/router";
import { makeStyles } from "@mui/styles";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import useSWR from "swr";
import DeleteIcon from "@mui/icons-material/Delete";
import React, { useEffect, useState } from "react";
import Menu from "@mui/material/Menu";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import { Divider, ListItem, TextField } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import { useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/styles";
import { Stack } from "@mui/material";
import MobileDateTimePicker from "@mui/lab/MobileDateTimePicker";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import SaveIcon from "@mui/icons-material/Save";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import { Autocomplete } from "@mui/material";

import Appbar from "../../components/AppBars";
import AddAuftrag from "../../components/Startseite/AddAuftrag";
import Karten from "../../components/Startseite/Karten";

const fetcher = (...args) => fetch(...args).then((response) => response.json());
console.log("--> Übersicht");

export default function Startseite() {
  const { query } = useRouter();
  const router = useRouter();
  const classes = useStyles();

  let name = query.param2;

  let [KsvALL, setKsvALL] = useState("");

  const [FilterVon, setFilterVon] = useState("");
  const [FilterBis, setFilterBis] = useState("");
  const [URL, setURL] = useState(
    `https://palmiest-hornet-1388.dataplicity.io/api/api/Auftrag/all?name=${query.param2}`
  );

  useEffect(() => {
    if (FilterVon == "" && FilterBis == "") {
      setURL(
        `https://palmiest-hornet-1388.dataplicity.io/api/api/Auftrag/all?name=${name}`
      );
    } else {
      setURL(
        `https://palmiest-hornet-1388.dataplicity.io/api/api/Auftrag/filterDate?von=${FilterVon}&bis=${FilterBis}`
      );
    }
  }, [FilterVon, FilterBis]);

  const [value1, setValue1] = useState(new Date());
  const [value2, setValue2] = useState(new Date());

  useEffect(() => {
    var curr = new Date();
    var first = curr.getDate() - curr.getDay() + 1;
    // var last = first + 6
    let firstday = new Date(curr.setDate(first)).toISOString().split("T")[0];
    let lastday = new Date(curr.setDate(curr.getDate() + 6))
      .toISOString()
      .split("T")[0];

    console.log(firstday);
    let firstYear = firstday.split("-")[0];
    let firstMonth = firstday.split("-")[1];
    let firstDay = firstday.split("-")[2];

    let lastYear = lastday.split("-")[0];
    let lastMonth = lastday.split("-")[1];
    let lastDay = lastday.split("-")[2];

    console.log(firstYear);
    console.log(firstMonth);
    console.log(firstDay);

    value1.setFullYear(firstYear);
    value1.setMonth(firstMonth - 1);
    value1.setDate(firstDay);

    value2.setFullYear(lastYear);
    value2.setMonth(lastMonth - 1);
    value2.setDate(lastDay);

    value1.setHours(7, 30);
    value2.setHours(16, 45);
  }, []);

  let [Ebene2LoadNext, setEbene2LoadNext] = useState("x");
  let [Ebene3LoadNext, setEbene3LoadNext] = useState("x");
  let [Ebene4LoadNext, setEbene4LoadNext] = useState("x");

  let [ebene3, setEbene3] = useState("");
  let [ebene4, setEbene4] = useState("");
  let [ebene5, setEbene5] = useState("");

  const getKSVALL = async () => {
    const response = await fetch(
      `https://palmiest-hornet-1388.dataplicity.io/api/api/KSV/all?kurzzeichen=${query.param}`,
      {
        method: "GET",
      }
    );
    const data = await response.json();
    setKsvALL(data);
  };
  useEffect(() => {
    getKSVALL();
    console.log(KsvALL);
  }, [router]);

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

  let [Ebene2Bezeichnung, setEbene2Bezeichnung] = useState("KSV 1");
  let [Ebene3Bezeichnung, setEbene3Bezeichnung] = useState("KSV 2");
  let [Ebene4Bezeichnung, setEbene4Bezeichnung] = useState("KSV 3");
  let [Ebene5Bezeichnung, setEbene5Bezeichnung] = useState("KSV 5");

  useEffect(() => {
    setEbene3Bezeichnung("KSV 2");
    setEbene4Bezeichnung("KSV 3");
    setEbene5Bezeichnung("KSV 4");
    setEbene3LoadNext("x");
    setEbene4LoadNext("x");
  }, [Ebene2LoadNext]);

  useEffect(() => {
    setEbene4Bezeichnung("KSV 3");
    setEbene5Bezeichnung("KSV 4");
    setEbene4LoadNext("x");
  }, [Ebene3LoadNext]);

  useEffect(() => {
    setEbene5Bezeichnung("KSV 4");
  }, [Ebene4LoadNext]);

  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("sm"));
  const matchesLG = useMediaQuery(theme.breakpoints.up("lg"));
  console.log(matches);

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSearchChange3 = (e) => {
    console.log(e.target.value);
    setfilter3(e.target.value);
  };

  const handleSearchChange4 = (e) => {
    console.log(e.target.value);
    setfilter4(e.target.value);
  };

  const handleSearchChange5 = (e) => {
    console.log(e.target.value);
    setfilter5(e.target.value);
  };

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [anchorE2, setAnchorE2] = React.useState(null);
  const open = Boolean(anchorEl);
  const open2 = Boolean(anchorE2);
  const handleClick2 = (event) => {
    setAnchorE2(event.currentTarget);
  };
  const handleClose2 = () => {
    setAnchorE2(null);
  };

  //<Filter>

  const [filter2, setfilter2] = useState("");
  const [filter3, setfilter3] = useState("");
  const [filter4, setfilter4] = useState("");
  const [filter5, setfilter5] = useState("");
  let [KSV, setKSV] = useState("");

  const handleSearchChange2 = (se) => {
    if (filter2 == se) {
      setfilter2("");
    } else {
      setfilter2(se);
    }
  };

  useEffect(() => {
    setURL(
      `https://palmiest-hornet-1388.dataplicity.io/api/api/Auftrag/all?name=${query.param2}`
    );
  }, [router]);

  console.log(URL);
  //<Fetchen der Daten für die Karten>
  const { data, error } = useSWR(URL, fetcher);

  if (error) return <div>failed to load</div>;
  if (!data)
    return (
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
        onClick={handleClose}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    );

  let VON = `${value1.getFullYear()}.${
    value1.getMonth() + 1
  }.${value1.getDate()} ${value1.getHours()}:${value1.getMinutes()}`;

  let BIS = `${value2.getFullYear()}.${
    value2.getMonth() + 1
  }.${value2.getDate()} ${value2.getHours()}:${value2.getMinutes()}`;

  return (
    <form className={classes.h}>
      <AddAuftrag Kurzzeichen={query.param} Name={name} />

      <Appbar Überschrift="Starseite" Kurzzeichen={query.param} />

      <div className={classes.FilterAdd}>
        <Button
          color="inherit"
          className={classes.BTN}
          style={{
            marginLeft:
              matches == true ? "" : "8%" && matchesLG == true ? "18%" : "18%",
          }}
          id="basic-button"
          aria-controls="basic-menu"
          aria-haspopup="true"
          aria-expanded={open2 ? "true" : undefined}
          onClick={handleClick2}
        >
          <FilterAltIcon size="small" className={classes.searchIcon} />{" "}
          <Typography> Filter </Typography>
        </Button>
        <Menu
          id="basic-menu"
          anchorEl={anchorE2}
          open={open2}
          onClose={handleClose2}
          MenuListProps={{
            "aria-labelledby": "basic-button",
          }}
        >
          <a></a>
          <ListItem>
            <Typography variant="h8" fontWeight="bold">
              {" "}
              SPERREN{" "}
            </Typography>
          </ListItem>
          <ListItem>
            {" "}
            <Button
              size="small"
              className={
                filter2 == "Durchführungserlaubnis"
                  ? classes.BTNDisabled
                  : classes.BTNEnabled
              }
              onClick={() => handleSearchChange2("Durchführungserlaubnis")}
              variant="contained"
            >
              Durchführungserlaubnis{" "}
            </Button>
          </ListItem>
          <ListItem>
            {" "}
            <Button
              size="small"
              className={
                filter2 == "Freigabe zur Arbeit"
                  ? classes.BTNDisabled
                  : classes.BTNEnabled
              }
              onClick={() => handleSearchChange2("Freigabe zur Arbeit")}
              variant="contained"
            >
              Freigabe zur Arbeit
            </Button>
          </ListItem>
          <ListItem>
            {" "}
            <Button
              size="small"
              className={
                filter2 == "Freigabe zur Sperre"
                  ? classes.BTNDisabled
                  : classes.BTNEnabled
              }
              onClick={() => handleSearchChange2("Freigabe zur Sperre")}
              variant="contained"
            >
              Freigabe zur Sperre
            </Button>
          </ListItem>
          <ListItem>
            {" "}
            <Button
              size="small"
              className={
                filter2 == "Prüfungserlaubnis"
                  ? classes.BTNDisabled
                  : classes.BTNEnabled
              }
              onClick={() => handleSearchChange2("Prüfungserlaubnis")}
              variant="contained"
            >
              Prüfungserlaubnis
            </Button>
          </ListItem>
          <Divider></Divider>
          <Divider></Divider>
          <ListItem>
            <Autocomplete
              disablePortal
              id="combo-box-demo"
              options={KsvALL}
              getOptionLabel={(option) => option.BEZEICHNUNG}
              onChange={(event, value) => {
                if (value === null) {
                  value = "";
                  setEbene2LoadNext("x");
                  setKSV("");
                  setEbene2Bezeichnung("KSV 1");
                } else {
                  setEbene2LoadNext(value.KSV),
                    setKSV(value.BEZEICHNUNG),
                    setEbene2Bezeichnung(value.BEZEICHNUNG);
                }
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  size="small"
                  variant="outlined"
                  label={Ebene2Bezeichnung}
                  style={{ width: 208 }}
                ></TextField>
              )}
              isOptionEqualToValue={(option, value) =>
                option.BEZEICHNUNG === value.BEZEICHNUNG
              }
            />
          </ListItem>

          <ListItem>
            {" "}
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
                  setEbene3Bezeichnung("KSV 2");
                  setKSV(Ebene2Bezeichnung);
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
                  value={Ebene3Bezeichnung}
                  size="small"
                  variant="outlined"
                  label={Ebene3Bezeichnung}
                  style={{ width: 208 }}
                ></TextField>
              )}
              isOptionEqualToValue={(option, value) =>
                option.BEZEICHNUNG === value.BEZEICHNUNG
              }
            />
          </ListItem>
          <ListItem>
            {" "}
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
                  setEbene4Bezeichnung("KSV 3");
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
                  label={Ebene4Bezeichnung}
                  style={{ width: 208 }}
                ></TextField>
              )}
              isOptionEqualToValue={(option, value) =>
                option.BEZEICHNUNG === value.BEZEICHNUNG
              }
            />
          </ListItem>
          <ListItem>
            {" "}
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
                  setEbene5Bezeichnung("KSV 4");
                } else {
                  setKSV(value.BEZEICHNUNG);
                  setEbene5Bezeichnung(value.BEZEICHNUNG);
                }
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  size="small"
                  variant="outlined"
                  label={Ebene5Bezeichnung}
                  style={{ width: 208 }}
                ></TextField>
              )}
              isOptionEqualToValue={(option, value) =>
                option.BEZEICHNUNG === value.BEZEICHNUNG
              }
            />
          </ListItem>
          <Divider></Divider>
          <ListItem>
            {" "}
            <TextField
              size="small"
              fullWidth
              variant="outlined"
              value={filter4}
              onChange={handleSearchChange4}
              label={"Auftraggeber"}
            ></TextField>
          </ListItem>
          <Divider></Divider>
          <ListItem>
            {" "}
            <TextField
              size="small"
              fullWidth
              variant="outlined"
              value={filter5}
              onChange={handleSearchChange5}
              label={"Auftragnehmer"}
            ></TextField>
          </ListItem>
          <Divider></Divider>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <ListItem>
              <Stack>
                <MobileDateTimePicker
                  ampm={false}
                  value={value1}
                  onChange={(newValue1) => {
                    setValue1(newValue1);
                  }}
                  X
                  label="VON"
                  inputFormat="yyyy/MM/dd HH:mm"
                  renderInput={(params) => (
                    <TextField
                      size="small"
                      label="Bis"
                      variant="outlined"
                      {...params}
                    />
                  )}
                />
              </Stack>
            </ListItem>

            <ListItem>
              <Stack>
                <MobileDateTimePicker
                  ampm={false}
                  value={value2}
                  onChange={(newValue2) => {
                    setValue2(newValue2);
                  }}
                  label="BIS"
                  inputFormat="yyyy/MM/dd HH:mm"
                  renderInput={(params) => (
                    <TextField
                      label="von"
                      size="small"
                      variant="outlined"
                      {...params}
                    />
                  )}
                />
              </Stack>
            </ListItem>
            <Divider />
            <IconButton
              style={{ marginLeft: "10px" }}
              color="primary"
              onClick={() => {
                setFilterBis(BIS);
                setFilterVon(VON);
              }}
            >
              <SaveIcon />
            </IconButton>
            <IconButton
              onClick={() => {
                setFilterBis("");
                setFilterVon("");
                setfilter2("");
                setfilter3("");
                setfilter4("");
                setfilter5("");
                setKSV("");
                setEbene2LoadNext("X");
                setEbene3LoadNext("X");
                setEbene4LoadNext("X");
                setEbene2Bezeichnung("KSV 1");
                setEbene3Bezeichnung("KSV 2");
                setEbene4Bezeichnung("KSV 3");
                setEbene5Bezeichnung("KSV 4");
              }}
              color="error"
            >
              <DeleteIcon />
            </IconButton>
          </LocalizationProvider>
        </Menu>
      </div>
      <div className={classes.SummaryWrapper}>
        <Karten
          data={data}
          Status={"Offen"}
          Überschrift={"Offen"}
          KRZ={query.param}
          Name={query.param2}
          filter2={filter2}
          filter3={KSV}
          filter4={filter4}
          filter5={filter5}
        />
        <div className={classes.br}></div>
      </div>

      <div className={classes.SummaryWrapper}>
        <Karten
          data={data}
          Status={"Bestätigt"}
          Überschrift={"Bestätigt"}
          KRZ={query.param}
          Name={query.param2}
          filter2={filter2}
          filter3={KSV}
          filter4={filter4}
          filter5={filter5}
        />
        <div className={classes.br}></div>
      </div>

      <div className={classes.SummaryWrapper}>
        <Karten
          data={data}
          Status={"Nicht angenommen"}
          Überschrift={"Abgelehnt"}
          KRZ={query.param}
          Name={query.param2}
          filter2={filter2}
          filter3={KSV}
          filter4={filter4}
          filter5={filter5}
        />
        <div className={classes.br}></div>
      </div>

      <div className={classes.SummaryWrapper}>
        <Karten
          data={data}
          Status={"Abgeschlossen"}
          Überschrift={"Abgeschlossen"}
          KRZ={query.param}
          Name={query.param2}
          filter2={filter2}
          filter3={KSV}
          filter4={filter4}
          filter5={filter5}
        />
      </div>
    </form>
  );
}

const useStyles = makeStyles((theme) => ({
  CardDate: {
    float: "right",
    marginRight: "80px",
  },

  Accordion: {
    marginLeft: "3%",
    marginRight: "3%",
    padding: "0%",

    backgroundColor: "#143968",
    color: "white",
  },

  SearchFieldMobile: {
    marginLeft: "30%",
    background: "red",
  },

  SearchFieldPc: {
    marginLeft: "60px",
  },

  br: {
    marginBottom: 40,
  },

  FilterAdd: {
    marginTop: "2%",
    marginBottom: "30px",
    display: "flex",
    marginLeft: "3%",
  },

  SignatureBTNRow: {
    display: "flex",
    textAlign: "center",
    margin: "auto",
    justifyContent: "center",
  },

  Check: {
    display: "none",
  },

  BTNEnabled: {
    background: "linear-gradient(45deg, #143968 30%, #143968 90%)",
  },

  BTNDisabled: {
    background:
      "linear-gradient(90deg, rgba(212,25,25,1) 38%, rgba(212,25,25,1) 100%)",
  },

  SummaryBTNDisabled: {
    display: "none",
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

  b: {
    height: 40,
    width: 280,
    padding: "0 30px",
  },

  c: {
    marginLeft: "30%",
    textAlign: "center",
  },

  d: {
    color: "green",
    textAlign: "center",
    marginTop: 40,
  },

  z: {
    background: "grey",
    height: 30,
    width: "100%",
    borderRadius: 15,
    marginLeft: 40,
    marginRight: 40,
  },

  e: {
    background: "linear-gradient(45deg, #143968 30%, #143968 90%)",
    boxShadow: "0 3px 5px 2px rgba(20, 57, 104, .3)",
    marginTop: 0,
    paddingTop: 15,

    height: 60,
    color: "white",
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
    justifyContent: "space-between",
    display: "flex",
  },

  Unterschrift: {
    background: "linear-gradient(45deg, #143968 30%, #143968 90%)",
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
  },

  summary: {
    lineHeight: "2.5",
    justifyContent: "space-between",
    fontWeight: "bold",
    outline: "none",
  },

  summary2: {
    marginTop: "2%",
    marginRight: "5%",
    marginLeft: "5%",
    lineHeight: "2.5",
    justifyContent: "space-between",
    fontWeight: "bold",
    borderRadius: 15,
    background: "#143968",
    [theme.breakpoints.up("sm")]: {
      background: "red",
    },
  },

  Summary2Txt: {
    marginLeft: "8%",
  },

  SummaryWrapper: {
    borderRadius: 15,
    color: "white",
  },

  Status: {
    paddingLeft: 15,
    paddingTop: 7,
  },

  Offen: {
    paddingLeft: 15,
    marginLeft: "5%",
    marginRight: "5%",
    borderRadius: 15,
    background: "#2163b8",
    color: "white",
    marginBottom: "10px",
  },

  Bestätigt: {
    paddingLeft: 15,
    marginLeft: "5%",
    marginRight: "5%",
    borderRadius: 15,
    background: "#1DB954",
    color: "white",
    marginBottom: "10px",
  },

  Abgeschlossen: {
    paddingLeft: 15,
    marginLeft: "5%",
    marginRight: "5%",
    borderRadius: 15,
    background: "#4a4a49",
    color: "white",
    marginBottom: "10px",
  },

  Abgelehnt: {
    paddingLeft: 15,
    marginLeft: "5%",
    marginRight: "5%",
    borderRadius: 15,
    background: "#c92a35",
    color: "white",
    marginBottom: "10px",
  },

  Details: {
    color: "white",
  },

  InsideCard: {
    paddingBottom: 10,
  },
}));
