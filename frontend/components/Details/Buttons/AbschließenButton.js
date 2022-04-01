/* eslint-disable react/prop-types */
import { makeStyles } from "@mui/styles";
import React from "react";
// eslint-disable-next-line no-unused-vars
import useSWR, { mutate, SWRConfig } from "swr";
import { Button } from "@mui/material";
import { useRouter } from "next/router";

function AbschließenButton(props) {
  const classes = useStyles();
  const router = useRouter();

  const Abschließen = async (auftragID) => {
    let newDate = new Date();
    let InsertDate = `${newDate.getFullYear()}.${
      newDate.getMonth() + 1
    }.${newDate.getDate()} ${newDate.getHours()}:${newDate.getMinutes()}`;

    const response = await fetch(
      `https://palmiest-hornet-1388.dataplicity.io/api/api/Auftrag/close?id=${auftragID}&am=${InsertDate}`,
      {
        method: "PUT",
      }
    );
    const data = await response.json();
    console.log(data);

    // eslint-disable-next-line no-undef
    mutate(
      `https://palmiest-hornet-1388.dataplicity.io/api/api/Auftrag/all?name=${props.Name}`
    );

    router.push(`/startseite?param=${props.KRZ}&param2=${props.Name}`);
  };

  return (
    <a
      className={
        (props.A_Nehmer !== props.Name && props.A_Geber == props.Name) ||
        props.A_Geber == props.A_Nehmer
          ? null
          : classes.Check
      }
    >
      <Button
        onClick={() => Abschließen(props.ID)}
        color="inherit"
        size="large"
        variant="contained"
        style={{ backgroundColor: "#143968", color: "white" }}
      >
        Abschließen
      </Button>
    </a>
  );
}

const useStyles = makeStyles(() => ({
  Check: {
    display: "none",
  },
}));

export default AbschließenButton;
