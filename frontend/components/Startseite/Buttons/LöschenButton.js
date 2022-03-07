/* eslint-disable react/prop-types */
import { makeStyles } from "@mui/styles";
// eslint-disable-next-line no-unused-vars
import useSWR, { mutate, SWRConfig } from "swr";
import DeleteIcon from "@mui/icons-material/Delete";
import React from "react";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";

function LöschenButton(props) {
  const classes = useStyles();

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
      <Tooltip title="Löschen">
        <IconButton
          onClick={() => Delete(props.ID)}
          style={{
            float: "right",
            maxWidth: "40px",
            maxHeight: "40px",
            minWidth: "40px",
            minHeight: "40px",
          }}
          color="inherit"
        >
          <DeleteIcon />
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

export default LöschenButton;
