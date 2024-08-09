import React from 'react';
import ReactDOM from 'react-dom/client';
import './assets/styles/index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import {ChakraProvider, extendTheme, ColorModeScript} from "@chakra-ui/react";

const colors = {
    brand: {
        10: "#eee",
        50: "#ecefff",
        100: "#cbceeb",
        200: "#a9aed6",
        300: "#888ec5",
        400: "#666db3",
        500: "#4d5499",
        600: "#3c4178",
        700: "#2a2f57",
        800: "#181c37",
        900: "#080819"
    }
};
const config = {
    initialColorMode: "light",
    useSystemColorMode: false
};

const theme = extendTheme({ colors, config });


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
      <ChakraProvider theme={theme}>
          <ColorModeScript initialColorMode={theme.config.initialColorMode}/>
          <App />
      </ChakraProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
