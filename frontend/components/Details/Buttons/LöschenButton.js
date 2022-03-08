/* eslint-disable react/prop-types */
import { makeStyles } from "@mui/styles";
// eslint-disable-next-line no-unused-vars
import useSWR, { mutate, SWRConfig } from "swr";
import React from "react";
import { Button } from "@mui/material";
import { useRouter } from "next/router";

function LöschenButton(props) {
  const classes = useStyles();
  const router = useRouter();

  const Delete = async (auftragID) => {
    const response = await fetch(
      `https://palmiest-hornet-1388.dataplicity.io/api/api/Auftrag/delete?id=${auftragID}`,
      {
        method: "DELETE",
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
        (props.A_Nehmer !== props.Name && props.A_Geber == props.Name) ||
        props.A_Geber == props.A_Nehmer
          ? null
          : classes.Check
      }
    >
      <Button
        onClick={() => Delete(props.ID)}
        style={{ backgroundColor: "rgba(212,25,25,1)", color: "white" }}
        size="large"
      >
        Löschen
      </Button>
    </a>
  );
}

const useStyles = makeStyles(() => ({
  Check: {
    display: "none",
  },
}));

export default LöschenButton;
