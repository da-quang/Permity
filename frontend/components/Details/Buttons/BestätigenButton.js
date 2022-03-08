/* eslint-disable react/prop-types */
import { makeStyles } from "@mui/styles";
import React from "react";
// eslint-disable-next-line no-unused-vars
import useSWR, { mutate, SWRConfig } from "swr";
import { Button } from "@mui/material";
import { useRouter } from "next/router";

function BestätigenButton(props) {
  const classes = useStyles();
  const router = useRouter();

  const Bestätigen = async (auftragID) => {
    let newDate = new Date();
    let InsertDate = `${newDate.getFullYear()}.${
      newDate.getMonth() + 1
    }.${newDate.getDate()} ${newDate.getHours()}:${newDate.getMinutes()}`;

    console.log(InsertDate);

    const response = await fetch(
      `https://palmiest-hornet-1388.dataplicity.io/api/api/Auftrag/confirm?id=${auftragID}&am=${InsertDate}`,
      {
        method: "PUT",
      }
    );

    const data = await response.json();
    console.log(data);

    mutate(
      `https://palmiest-hornet-1388.dataplicity.io/api/api/Auftrag/all?name=${props.Name}`
    );

    router.push(`/startseite?param=${props.KRZ}&param2=${props.Name}`);
  };

  return (
    <a
      className={
        props.A_Geber !== props.Name || props.A_Geber == props.A_Nehmer
          ? null
          : classes.Check
      }
    >
      <Button
        onClick={() => {
          Bestätigen(props.ID);
        }}
        style={{ backgroundColor: "#143968", color: "white" }}
        size="large"
      >
        Bestätigen
      </Button>
    </a>
  );
}

const useStyles = makeStyles(() => ({
  Check: {
    display: "none",
  },
}));

export default BestätigenButton;
