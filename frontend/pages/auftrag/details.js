/* eslint-disable react/jsx-key */
import { useRouter } from "next/router";
import { makeStyles } from "@mui/styles";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import useSWR from "swr";
import MenuIcon from "@mui/icons-material/Menu";
import * as React from "react";
import Box from "@mui/material/Box";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import LogoutIcon from "@mui/icons-material/Logout";
import HomeIcon from "@mui/icons-material/Home";
import { Divider } from "@mui/material";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import { useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/styles";
import LöschenBTN from "../../components/Details/Buttons/LöschenButton";
import AbschließenBTN from "../../components/Details/Buttons/AbschließenButton";
import BestätigenBTN from "../../components/Details/Buttons/BestätigenButton";
import ErneutSendenBTN from "../../components/Details/Buttons/ErneutSendenButton";

const fetcher = (...args) => fetch(...args).then((response) => response.json());
console.log("--> Details");

export default function Start() {
  const { query } = useRouter();
  const router = useRouter();

  let id = query.param2;

  const theme = useTheme();
  const matchesMD = useMediaQuery(theme.breakpoints.up("md"));

  const { data, error } = useSWR(
    `https://palmiest-hornet-1388.dataplicity.io/api/api/Auftrag/find?id=${id}`,
    fetcher
  );
  if (error) return <div>failed to load</div>;

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const classes = useStyles();

  return (
    <div>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar
          position="static"
          style={{
            background: "#143968",
            borderBottomLeftRadius: "10px",
            borderBottomRightRadius: "10px",
          }}
        >
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
              onClick={handleClick}
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                "aria-labelledby": "basic-button",
              }}
            >
              <MenuItem onClick={() => router.push(`/mitarbeiter/login`)}>
                <LogoutIcon />
                Logout{" "}
              </MenuItem>
              <MenuItem onClick={() => router.back()}>
                <HomeIcon />
                Startseite
              </MenuItem>
            </Menu>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Details
            </Typography>
            <Button variant="outlined" size="small" color="inherit">
              {query.param}
            </Button>
          </Toolbar>
        </AppBar>
      </Box>

      <div
        style={{
          marginLeft: matchesMD == true ? "4%" : "",
          marginRight: matchesMD == true ? "4%" : "",
        }}
      >
        <div>
          {data &&
            data.map((auftrag) => (
              <Card elevation={2} className={classes.container}>
                <CardContent style={{ padding: "2px" }}>
                  <div className={classes.box}>
                    <div className={classes.contentInfo}>Id</div>
                    <div className={classes.contentInfo}>Auftrag</div>
                  </div>
                  <div className={classes.box2}>
                    <TextField
                      style={{ marginRight: "5px" }}
                      multiline
                      className={classes.contentAuftrag}
                      defaultValue={auftrag.ID}
                      variant="filled"
                      size="small"
                      inputProps={{ readOnly: true }}
                    />
                    <TextField
                      multiline
                      className={classes.contentAuftrag}
                      defaultValue={auftrag.AUFTRAG}
                      variant="filled"
                      size="small"
                      inputProps={{ readOnly: true }}
                    />
                  </div>

                  <div className={classes.box}>
                    <div className={classes.contentInfo}>Ksv</div>
                    <div className={classes.contentInfo}>Sperren</div>
                  </div>
                  <div className={classes.box2}>
                    <TextField
                      style={{ marginRight: "5px" }}
                      multiline
                      className={classes.contentAuftrag}
                      defaultValue={auftrag.KSV}
                      variant="filled"
                      size="small"
                      inputProps={{ readOnly: true }}
                    />
                    <TextField
                      multiline
                      className={classes.contentAuftrag}
                      defaultValue={auftrag.SPERREN}
                      variant="filled"
                      size="small"
                      inputProps={{ readOnly: true }}
                    />
                  </div>

                  <div className={classes.box}>
                    <div className={classes.contentInfo}>Von</div>
                    <div className={classes.contentInfo}>Bis</div>
                  </div>
                  <div className={classes.box2}>
                    <TextField
                      multiline
                      fullWidth
                      style={{ marginRight: "5px" }}
                      className={classes.contentDate}
                      defaultValue={
                        auftrag.VON.split("T")[0].split("-")[2] +
                        "-" +
                        auftrag.VON.split("-")[1] +
                        "-" +
                        auftrag.VON.split("-")[0] +
                        " um " +
                        auftrag.VON.split("T")[1].split(":")[0] +
                        ":" +
                        auftrag.VON.split("T")[1].split(":")[1]
                      }
                      variant="filled"
                      size="small"
                      inputProps={{ readOnly: true }}
                    />
                    <TextField
                      multiline
                      fullWidth
                      className={classes.contentDate}
                      defaultValue={
                        auftrag.BIS.split("T")[0].split("-")[2] +
                        "-" +
                        auftrag.BIS.split("-")[1] +
                        "-" +
                        auftrag.BIS.split("-")[0] +
                        " um " +
                        auftrag.BIS.split("T")[1].split(":")[0] +
                        ":" +
                        auftrag.BIS.split("T")[1].split(":")[1]
                      }
                      variant="filled"
                      size="small"
                      inputProps={{ readOnly: true }}
                    />
                  </div>
                  <div className={classes.box}></div>
                  <div className={classes.box2}></div>

                  <div className={classes.box}>
                    <div className={classes.contentInfo}>Kommentar</div>
                  </div>
                  <div className={classes.box2}>
                    <TextField
                      className={classes.contentKommentar}
                      defaultValue={auftrag.KOMMENTAR}
                      variant="filled"
                      size="small"
                      readOnly
                    />
                  </div>

                  <div className={classes.box}>
                    <div className={classes.contentInfo}>Auftraggeber</div>
                    <div className={classes.contentInfo}>Auftragnehmer</div>
                  </div>
                  <div className={classes.box2}>
                    <TextField
                      style={{ marginRight: "5px" }}
                      className={classes.contentAuftrag}
                      defaultValue={auftrag.AUFTRAGGEBER}
                      variant="filled"
                      size="small"
                      inputProps={{ readOnly: true }}
                    />
                    <TextField
                      className={classes.contentAuftrag}
                      defaultValue={auftrag.AUFTRAGNEHMER}
                      variant="filled"
                      size="small"
                      inputProps={{ readOnly: true }}
                    />
                  </div>

                  <div className={classes.box}>
                    <div className={classes.contentInfo}>Bestätigt am</div>
                    <div className={classes.contentInfo}>Abgeschlossen am</div>
                  </div>
                  <div className={classes.box2}>
                    <TextField
                      style={{ marginRight: "5px" }}
                      fullWidth
                      className={classes.contentDate}
                      defaultValue={
                        auftrag.ANGENOMMEN_AM == null
                          ? ""
                          : auftrag.ANGENOMMEN_AM.split("T")[0].split("-")[2] +
                            "-" +
                            auftrag.ANGENOMMEN_AM.split("-")[1] +
                            "-" +
                            auftrag.ANGENOMMEN_AM.split("-")[0] +
                            " um " +
                            auftrag.ANGENOMMEN_AM.split("T")[1].split(":")[0] +
                            ":" +
                            auftrag.ANGENOMMEN_AM.split("T")[1].split(":")[1]
                      }
                      variant="filled"
                      size="small"
                      inputProps={{ readOnly: true }}
                    />
                    <TextField
                      style={{ marginRight: "5px" }}
                      fullWidth
                      className={classes.contentDate}
                      defaultValue={
                        auftrag.ABGESCHLOSSEN_AM == null
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
                            auftrag.ABGESCHLOSSEN_AM.split("T")[1].split(":")[1]
                      }
                      variant="filled"
                      size="small"
                      inputProps={{ readOnly: true }}
                    />
                  </div>

                  <div className={classes.box}>
                    <div className={classes.contentInfo}>
                      Erneut gesendet am
                    </div>
                  </div>
                  <div className={classes.box2}>
                    <TextField
                      style={{ marginRight: "5px" }}
                      fullWidth
                      className={classes.contentDate}
                      defaultValue={
                        auftrag.ERNEUT_GESENDET_AM == null
                          ? ""
                          : auftrag.ERNEUT_GESENDET_AM.split("T")[0].split(
                              "-"
                            )[2] +
                            "-" +
                            auftrag.ERNEUT_GESENDET_AM.split("-")[1] +
                            "-" +
                            auftrag.ERNEUT_GESENDET_AM.split("-")[0] +
                            " um " +
                            auftrag.ERNEUT_GESENDET_AM.split("T")[1].split(
                              ":"
                            )[0] +
                            ":" +
                            auftrag.ERNEUT_GESENDET_AM.split("T")[1].split(
                              ":"
                            )[1]
                      }
                      variant="filled"
                      size="small"
                      inputProps={{ readOnly: true }}
                    />
                    <TextField
                      style={{ marginRight: "5px" }}
                      fullWidth
                      className={classes.contentDate}
                      variant="filled"
                      size="small"
                      inputProps={{ readOnly: true }}
                    />
                  </div>
                </CardContent>
                <Divider></Divider>
                <CardActions style={{ display: "flex" }}>
                  <Typography
                    className={
                      (auftrag.AUFTRAGGEBER !== query.param3 ||
                        auftrag.AUFTRAGGEBER == auftrag.AUFTRAGNEHMER) &&
                      auftrag.STATUS == "Offen"
                        ? null
                        : classes.disabled
                    }
                  >
                    <BestätigenBTN
                      KRZ={query.param}
                      Name={query.param3}
                      A_Geber={auftrag.AUFTRAGGEBER}
                      A_Nehmer={auftrag.AUFTRAGNEHMER}
                      ID={auftrag.ID}
                    />
                  </Typography>
                  <a
                    className={
                      (auftrag.AUFTRAGGEBER == query.param3 ||
                        auftrag.AUFTRAGGEBER == auftrag.AUFTRAGNEHMER) &&
                      auftrag.STATUS == "Bestätigt"
                    }
                  >
                    <AbschließenBTN
                      KRZ={query.param}
                      Name={query.param3}
                      A_Geber={auftrag.AUFTRAGGEBER}
                      A_Nehmer={auftrag.AUFTRAGNEHMER}
                      ID={auftrag.ID}
                    />
                  </a>
                  <Typography
                    className={
                      auftrag.STATUS == "Nicht angenommen" ||
                      auftrag.STATUS == "Abgeschlossen"
                        ? null
                        : classes.disabled
                    }
                  >
                    <LöschenBTN
                      KRZ={query.param}
                      Name={query.param3}
                      A_Geber={auftrag.AUFTRAGGEBER}
                      A_Nehmer={auftrag.AUFTRAGNEHMER}
                      ID={auftrag.ID}
                    />
                  </Typography>

                  <Typography
                    className={
                      (auftrag.AUFTRAGGEBER == query.param3 ||
                        auftrag.AUFTRAGNEHMER == auftrag.AUFTRAGGEBER) &&
                      auftrag.STATUS == "Nicht angenommen"
                        ? null
                        : classes.disabled
                    }
                  >
                    <ErneutSendenBTN
                      KRZ={query.param}
                      Name={query.param3}
                      A_Geber={auftrag.AUFTRAGGEBER}
                      A_Nehmer={auftrag.AUFTRAGNEHMER}
                      ID={auftrag.ID}
                    />
                  </Typography>
                </CardActions>
              </Card>
            ))}
          <div></div>
        </div>
      </div>
    </div>
  );
}

const useStyles = makeStyles({
  disabled: {
    display: "none",
  },

  unterschrift: {
    width: "50%",
  },

  kopf: {
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

  kopfInfo: {
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

  container: {
    margin: 10,

    boxShadow: "0 0 10px rgba(0,0,0,0.3)",
  },

  contentInfo: {
    fontWeight: "bold",
    width: "50%",
    fontSize: 18,
    paddingBottom: 7,
  },

  contentDate: {
    width: "55%",
    fontSize: 15,
    paddingBottom: 10,
    background: "white",
    fontFamily: "Arial",
  },

  contentKommentar: {
    width: "100%",
    fontSize: 15,
    paddingBottom: 10,
    background: "white",
    fontFamily: "Arial",
  },

  contentAuftrag: {
    width: "50%",
    fontSize: 15,
    background: "white",
    fontFamily: "Arial",
    color: "green",
  },

  box: {
    display: "flex",
    marginLeft: "10px",
  },

  box2: {
    display: "flex",
    marginBottom: 20,
  },

  buttons: {
    marginRight: 20,
    float: "right",
  },
});
