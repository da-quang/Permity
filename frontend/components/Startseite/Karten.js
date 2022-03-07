/* eslint-disable react/prop-types */
import { useRouter } from "next/router";
import { makeStyles } from "@mui/styles";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import React from "react";
import DoubleArrowIcon from "@mui/icons-material/DoubleArrow";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Badge from "@mui/material/Badge";
import { styled } from "@mui/material/styles";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import { useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/styles";
import AbschließenBTN from "./Buttons/AbschließenButton";
import BestätigenBTN from "./Buttons/BestätigenButton";
import ErneutSendenBTN from "./Buttons/ErneutSendenButton";
import GesehenBTN from "./Buttons/GesehenButton";
import LöschenBTN from "./Buttons/LöschenButton";

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    right: 12,
    top: 12,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: "0 4px",
    backgroundColor: "rgba(212,25,25,1)",
  },
}));

console.log("--> Übersicht");

function Karten(props) {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("sm"));
  const matchesLG = useMediaQuery(theme.breakpoints.up("lg"));

  const { query } = useRouter();
  const router = useRouter();
  const classes = useStyles();

  let data = props.data;
  let Count1 = 0;
  let Offen = data.filter((item) => item.STATUS === props.Status);
  Count1 = Offen.length;

  return (
    <form className={classes.h}>
      <Accordion
        style={{
          borderRadius: "15px",
          marginLeft:
            matches == true ? "" : "12%" && matchesLG == true ? "18%" : "18%",
          marginRight:
            matches == true ? "" : "8%" && matchesLG == true ? "18%" : "18%",
        }}
        className={classes.Accordion}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon style={{ color: "white" }} />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <StyledBadge showZero badgeContent={Count1} color="primary">
            <FiberManualRecordIcon />
          </StyledBadge>
          <Typography style={{ fontWeight: "bold", marginLeft: "6px" }}>
            {props.Überschrift}
          </Typography>
        </AccordionSummary>
        <AccordionDetails style={{ padding: "0px" }}>
          {data &&
            data.map((auftrag, id) => (
              <a key={id}>
                {auftrag.STATUS == props.Status &&
                  data[id].SPERREN.includes(props.filter2) &&
                  data[id].KSV.includes(props.filter3) &&
                  data[id].AUFTRAGGEBER.includes(props.filter4) &&
                  data[id].AUFTRAGNEHMER.includes(props.filter5) && (
                    <div
                      className={
                        props.Überschrift == "Offen"
                          ? classes.Offen
                          : "" || props.Überschrift == "Bestätigt"
                          ? classes.Bestätigt
                          : "" || props.Überschrift == "Abgelehnt"
                          ? classes.Abgelehnt
                          : "" || props.Überschrift == "Abgeschlossen"
                          ? classes.Abgeschlossen
                          : ""
                      }
                    >
                      <details className={classes.details}>
                        <summary className={classes.summary}>
                          {auftrag.ID} | {auftrag.AUFTRAG}
                          <a
                            className={
                              props.Überschrift !== "Bestätigt"
                                ? classes.Check
                                : ""
                            }
                          >
                            <AbschließenBTN
                              Name={props.Name}
                              A_Geber={auftrag.AUFTRAGGEBER}
                              A_Nehmer={auftrag.AUFTRAGNEHMER}
                              ID={auftrag.ID}
                              Gesehen={auftrag.GESEHEN_AM}
                            />
                          </a>
                          <a
                            className={
                              props.Überschrift !== "Bestätigt"
                                ? classes.Check
                                : ""
                            }
                          >
                            <GesehenBTN
                              Name={props.Name}
                              A_Geber={auftrag.AUFTRAGGEBER}
                              A_Nehmer={auftrag.AUFTRAGNEHMER}
                              ID={auftrag.ID}
                              Gesehen={auftrag.GESEHEN_AM}
                            />
                          </a>
                          <a
                            className={
                              props.Überschrift !== "Offen" ? classes.Check : ""
                            }
                          >
                            <BestätigenBTN
                              Name={props.Name}
                              A_Geber={auftrag.AUFTRAGGEBER}
                              A_Nehmer={auftrag.AUFTRAGNEHMER}
                              ID={auftrag.ID}
                            />
                          </a>
                          <a
                            className={
                              props.Überschrift !== "Abgelehnt"
                                ? classes.Check
                                : ""
                            }
                          >
                            <ErneutSendenBTN
                              Name={props.Name}
                              A_Geber={auftrag.AUFTRAGGEBER}
                              A_Nehmer={auftrag.AUFTRAGNEHMER}
                              ID={auftrag.ID}
                            />
                          </a>
                          <a
                            className={
                              props.Überschrift !== "Abgelehnt"
                                ? classes.Check
                                : ""
                            }
                          >
                            <LöschenBTN
                              Name={props.Name}
                              A_Geber={auftrag.AUFTRAGGEBER}
                              A_Nehmer={auftrag.AUFTRAGNEHMER}
                              ID={auftrag.ID}
                            />
                          </a>
                          <a
                            className={
                              props.Überschrift !== "Abgeschlossen"
                                ? classes.Check
                                : ""
                            }
                          >
                            <LöschenBTN
                              Name={props.Name}
                              A_Geber={auftrag.AUFTRAGGEBER}
                              A_Nehmer={auftrag.AUFTRAGNEHMER}
                              ID={auftrag.ID}
                            />
                          </a>
                        </summary>
                        <div className={classes.InsideCard}>
                          <div style={{ display: "inline-block" }}>
                            <Typography>
                              {" "}
                              <a style={{ fontWeight: "bold" }}>KSV:</a>{" "}
                              {auftrag.KSV}
                            </Typography>
                            <Typography>
                              {" "}
                              <a style={{ fontWeight: "bold" }}>
                                Auftraggeber:{" "}
                              </a>{" "}
                              {auftrag.AUFTRAGGEBER}
                            </Typography>
                            <Typography>
                              {" "}
                              <a style={{ fontWeight: "bold" }}>
                                Auftragnehmer:{" "}
                              </a>{" "}
                              {auftrag.AUFTRAGNEHMER}
                            </Typography>
                            <Typography>
                              {" "}
                              <a style={{ fontWeight: "bold" }}>
                                Sperren:{" "}
                              </a>{" "}
                              {auftrag.SPERREN}
                            </Typography>
                          </div>
                          <div
                            className={
                              matchesLG != true ? null : classes.CardDate
                            }
                          >
                            {/* Offen */}
                            <Typography
                              className={
                                auftrag.ERNEUT_GESENDET_AM !== null &&
                                props.Überschrift == "Offen"
                                  ? null
                                  : classes.Check
                              }
                            >
                              <a style={{ fontWeight: "bold" }}>
                                Erneut gesendet:{" "}
                              </a>
                              {auftrag.ERNEUT_GESENDET_AM == null
                                ? ""
                                : auftrag.ERNEUT_GESENDET_AM.split(
                                    "T"
                                  )[0].split("-")[2] +
                                  "-" +
                                  auftrag.ERNEUT_GESENDET_AM.split("-")[1] +
                                  "-" +
                                  auftrag.ERNEUT_GESENDET_AM.split("-")[0] +
                                  " um " +
                                  auftrag.ERNEUT_GESENDET_AM.split(
                                    "T"
                                  )[1].split(":")[0] +
                                  ":" +
                                  auftrag.ERNEUT_GESENDET_AM.split(
                                    "T"
                                  )[1].split(":")[1]}
                            </Typography>
                            {/* Bestätigt */}
                            <Typography
                              className={
                                props.Überschrift == "Bestätigt"
                                  ? null
                                  : classes.Check
                              }
                            >
                              <a style={{ fontWeight: "bold" }}>Bestätigt: </a>{" "}
                              {auftrag.ANGENOMMEN_AM == null
                                ? ""
                                : auftrag.ANGENOMMEN_AM.split("T")[0].split(
                                    "-"
                                  )[2] +
                                  "-" +
                                  auftrag.ANGENOMMEN_AM.split("-")[1] +
                                  "-" +
                                  auftrag.ANGENOMMEN_AM.split("-")[0] +
                                  " um " +
                                  auftrag.ANGENOMMEN_AM.split("T")[1].split(
                                    ":"
                                  )[0] +
                                  ":" +
                                  auftrag.ANGENOMMEN_AM.split("T")[1].split(
                                    ":"
                                  )[1]}
                            </Typography>
                            <Typography
                              className={
                                auftrag.GESEHEN_AM !== null &&
                                props.Überschrift == "Bestätigt"
                                  ? null
                                  : classes.Check
                              }
                            >
                              <a style={{ fontWeight: "bold" }}>
                                Bestätigung gesehen:{" "}
                              </a>
                              {auftrag.GESEHEN_AM == null ||
                              auftrag.GESEHEN_AM == 0
                                ? ""
                                : auftrag.GESEHEN_AM.split("T")[0].split(
                                    "-"
                                  )[2] +
                                  "-" +
                                  auftrag.GESEHEN_AM.split("-")[1] +
                                  "-" +
                                  auftrag.GESEHEN_AM.split("-")[0] +
                                  " um " +
                                  auftrag.GESEHEN_AM.split("T")[1].split(
                                    ":"
                                  )[0] +
                                  ":" +
                                  auftrag.GESEHEN_AM.split("T")[1].split(
                                    ":"
                                  )[1]}
                            </Typography>
                            {/* Abgeschlossen */}
                            <Typography
                              className={
                                props.Überschrift == "Abgeschlossen"
                                  ? null
                                  : classes.Check
                              }
                            >
                              <a style={{ fontWeight: "bold" }}>
                                Abgeschlossen:{" "}
                              </a>{" "}
                              {auftrag.ABGESCHLOSSEN_AM == null
                                ? ""
                                : auftrag.ABGESCHLOSSEN_AM.split("T")[0].split(
                                    "-"
                                  )[2] +
                                  "-" +
                                  auftrag.ABGESCHLOSSEN_AM.split("-")[1] +
                                  "-" +
                                  auftrag.ABGESCHLOSSEN_AM.split("-")[0] +
                                  " um " +
                                  auftrag.ABGESCHLOSSEN_AM.split("T")[1].split(
                                    ":"
                                  )[0] +
                                  ":" +
                                  auftrag.ABGESCHLOSSEN_AM.split("T")[1].split(
                                    ":"
                                  )[1]}
                            </Typography>
                          </div>
                          <div style={{ marginBottom: 30 }}>
                            <Button
                              onClick={() =>
                                router.push(
                                  `/auftrag/details?param=${props.KRZ}&param2=${auftrag.ID}&param3=${query.param2}`
                                )
                              }
                              style={{ float: "right", color: "white" }}
                            >
                              Details <DoubleArrowIcon />
                            </Button>
                          </div>
                        </div>
                      </details>
                    </div>
                  )}
              </a>
            ))}
        </AccordionDetails>
      </Accordion>
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

export default Karten;
