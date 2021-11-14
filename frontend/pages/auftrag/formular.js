import { useRouter } from 'next/router';
import useSWR from "swr"
import React, {useState } from 'react'
import { useEffect } from 'react';


const fetcher = (...args) => fetch(...args).then((response) => response.json())
export default function Startseite() {
    const { query } = useRouter()

    let kurzzeichen = query.param
  
   
    

    return (
        <form>
            asadsa
            
        </form>
    )
}

