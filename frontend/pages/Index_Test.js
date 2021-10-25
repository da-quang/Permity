import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Button from '@material-ui/core/Button'
import { StylesContext } from '@material-ui/styles'
import axios from 'axios';
import React, { useState, useEffect, useRef } from 'react'

import {useRouter} from 'next/router';
import Link from 'next/link';



import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { route } from 'next/dist/server/router';
import { display } from '@mui/system';

// import * as React from 'react';
// import Box from'@material-ui/core/Box';
// import Input from '@material-ui/core/Input';
// import InputLabel from '@material-ui/core/InputLabel';
// import InputAdornment from '@material-ui/core/InputAdornment';
// import FormControl from '@material-ui/core/FormControl';
// import TextField from '@material-ui/core/TextField';
// import AccountCircle from '@material-ui/core/AccountCircle';

// export default function InputWithIcon() {
//   return (
//     <Box sx={{ '& > :not(style)': { m: 1 } }}>
//       <FormControl variant="standard">
//         <InputLabel htmlFor="input-with-icon-adornment">
//           With a start adornment
//         </InputLabel>
//         <Input
//           id="input-with-icon-adornment"
//           startAdornment={
//             <InputAdornment position="start">
//               <AccountCircle />
//             </InputAdornment>
//           }
//         />
//       </FormControl>
//       <TextField
//         id="input-with-icon-textfield"
//         label="TextField"
//         InputProps={{
//           startAdornment: (
//             <InputAdornment position="start">
//               <AccountCircle />
//             </InputAdornment>
//           ),
//         }}
//         variant="standard"
//       />
//       <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
//         <AccountCircle sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
//         <TextField id="input-with-sx" label="With sx" variant="standard" />
//       </Box>
//     </Box>
//   );
// }


  

  

  function FindById() {

    async function getStaticProps () {
        // `getStaticProps` is executed on the server side.
        const Mitarbeiter = await getArticleFromAPI()
        return {
          props: {
            fallback: {
                'http://localhost:8090/api/Mitarbeiter/login': Mitarbeiter
            }
          }
        }
      }
      
      function Article() {
        // `data` will always be available as it's in `fallback`.
        const { data } = useSWR('http://localhost:8090/api/Mitarbeiter/login', fetcher)
        return <h1>{data.kurzzeichen}</h1>
      }
      
      function Page({ fallback }) {
        // SWR hooks inside the `SWRConfig` boundary will use those values.
        return (
          <SWRConfig value={{ fallback }}>
            <Mitarbeiter />
          </SWRConfig>
        )
      }





 return (


        <div>Hello</div>



      


     
    )
   
    }


   
  
  
  export default FindById; {
  }
