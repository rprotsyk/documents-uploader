import React from "react";
import ReactDOM from "react-dom";
import { CssBaseline, ThemeProvider } from '@mui/material';
import App from "./app";
import theme from "./theme";

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <App />
  </ThemeProvider>,
  document.getElementById("root")
);