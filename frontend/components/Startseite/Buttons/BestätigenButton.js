/* eslint-disable react/prop-types */
import { makeStyles } from "@mui/styles";
import React from "react";
// eslint-disable-next-line no-unused-vars
import useSWR, { mutate, SWRConfig } from "swr";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";

function BestätigenButton(props) {
  const classes = useStyles();

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
  };

  return (
    <a
      className={
        props.A_Geber !== props.Name || props.A_Geber == props.A_Nehmer
          ? null
          : classes.Check
      }
    >
      <Tooltip title="Bestätigen">
        <IconButton
          onClick={() => {
            Bestätigen(props.ID);
          }}
          style={{
            float: "right",
            maxWidth: "40px",
            maxHeight: "40px",
            minWidth: "40px",
            minHeight: "40px",
          }}
          color="inherit"
        >
          <CheckCircleOutlineIcon />
        </IconButton>
      </Tooltip>
    </a>
  );
}

const useStyles = makeStyles(() => ({
  Check: {
    display: "none",
  },
}));

export default BestätigenButton;
