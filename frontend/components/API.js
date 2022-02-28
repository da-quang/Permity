import React, { useRef, useState } from "react";

function API(props){

    let newDate = new Date();
    let InsertDate = `${newDate.getFullYear()}.${newDate.getMonth() + 1}.${newDate.getDate()} ${newDate.getHours()}:${newDate.getMinutes()}`;

    console.log(InsertDate)

    const response = await fetch(`https://palmiest-hornet-1388.dataplicity.io/api/api/Auftrag/confirm?id=${props.id}&am=${InsertDate}`, {
        method:`${props.method}`
    })
    const data = await response.json()
    console.log(data)

    mutate(`https://palmiest-hornet-1388.dataplicity.io/api/api/Auftrag/all?name=${props.name}`)

}