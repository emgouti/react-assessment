import React from "react";
import createStore from "./store";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import "react-toastify/dist/ReactToastify.css";
import Header from "./components/Header";
import Wrapper from "./components/Wrapper";

import gql from "graphql-tag";
import { Client, defaultExchanges, subscriptionExchange } from "urql";
import MetricData from './components/MetricData'

const store = createStore();
const theme = createMuiTheme({
  typography: {
    useNextVariants: true
  },
  palette: {
    primary: {
      main: "rgb(39,49,66)"
    },
    secondary: {
      main: "rgb(197,208,222)"
    },
    background: {
      main: "rgb(226,231,238)"
    }
  }
});

// const client = new Client({
//   url: "/graphql",
//   exchanges: [
//     ...defaultExchanges,
//     subscriptionExchange({
//       forwardSubscription
//     })
//   ]
// });

const subscription = gql`
subscription {
  newMeasurement {
    metric
    at
    value
  }
}
`;

const App = props => {
  console.log(props, 'porps')
  
  return(
  <MuiThemeProvider theme={theme}>
    <CssBaseline />
    <Provider store={store}>
      <Wrapper>
        <Header />
        <MetricData />
        <ToastContainer />
      </Wrapper>
    </Provider>
  </MuiThemeProvider>
  )
};

export default App;
