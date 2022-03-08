/* eslint-disable react/prop-types */
import { makeStyles } from "@mui/styles";
import React from "react";
// eslint-disable-next-line no-unused-vars
import useSWR, { mutate, SWRConfig } from "swr";
import { Button } from "@mui/material";
import { useRouter } from "next/router";

function GesehenButton(props) {
  const classes = useStyles();
  const router = useRouter();

  const Gesehen = async (auftragID) => {
    let newDate = new Date();

    let InsertDate = `${newDate.getFullYear()}.${
      newDate.getMonth() + 1
    }.${newDate.getDate()} ${newDate.getHours()}:${newDate.getMinutes()}`;

    const response = await fetch(
      `https://palmiest-hornet-1388.dataplicity.io/api/api/Auftrag/watched?id=${auftragID}&am=${InsertDate}`,
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
        props.Gesehen == null &&
        ((props.A_Nehmer !== props.Name && props.A_Geber == props.Name) ||
          props.A_Geber == props.A_Nehmer)
          ? null
          : classes.Check
      }
    >
      <Button
        onClick={() => Gesehen(props.ID)}
        style={{ backgroundColor: "#143968", color: "white" }}
        size="large"
      >
        Gesehen
      </Button>
    </a>
  );
}

const useStyles = makeStyles(() => ({
  Check: {
    display: "none",
  },
}));

export default GesehenButton;
