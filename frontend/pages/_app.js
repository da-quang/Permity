import React from 'react';
import { CacheProvider } from '@emotion/react';
import { ThemeProvider} from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import createEmotionCache from '../components/utility/createEmotionCache';
import lightTheme from '../styles/theme/lightTheme';
import '../styles/globals.css';
import StyledEngineProvider from '@mui/material/StyledEngineProvider';

const clientSideEmotionCache = createEmotionCache();


const MyApp = (props) => {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;

  return (
    <StyledEngineProvider injectFirst>
    <CacheProvider value={emotionCache}>
      <ThemeProvider theme={lightTheme}>
      <meta name="theme-color" content="#143968"></meta>
        <CssBaseline />
        <Component {...pageProps} />
      </ThemeProvider>
    </CacheProvider>
    </StyledEngineProvider>
  );
};

export default MyApp;
