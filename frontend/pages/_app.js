import React from "react";
import { CacheProvider } from "@emotion/react";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import createEmotionCache from "../components/utility/createEmotionCache";
import lightTheme from "../components/utility/theme";
import "../styles/globals.css";
import PropTypes from "prop-types";
import Head from "next/head";
import { StylesProvider, createGenerateClassName } from "@mui/styles";

const generateClassName = createGenerateClassName({
  productionPrefix: "c",
});

const clientSideEmotionCache = createEmotionCache();

const MyApp = (props) => {
  // eslint-disable-next-line react/prop-types
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;

  return (
    <StylesProvider generateClassName={generateClassName}>
      <CacheProvider value={emotionCache}>
        <Head>
          <meta name="theme-color" content="#143968"></meta>
        </Head>
        <ThemeProvider theme={lightTheme}>
          <CssBaseline />
          <Component {...pageProps} />
        </ThemeProvider>
      </CacheProvider>
    </StylesProvider>
  );
};

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  emotionCache: PropTypes.object,
  pageProps: PropTypes.object.isRequired,
};

export default MyApp;
