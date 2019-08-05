import React from "react";
import createStore from "./store";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import "react-toastify/dist/ReactToastify.css";
import Header from "./components/Header";
import Wrapper from "./components/Wrapper";

import { useQuery } from "urql";
import gql from "graphql-tag";

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

const measurementQuery = gql`
query getMeasurements($input: MeasurementQuery){
  getMeasurements(input: $input){
    metric
    at
    value
  }
}
`;

export const Data = ({ input }) => {
  const [res] = useQuery({
    query: measurementQuery,
    variables: { input: { metricName: 'tubingPressure' } }
  });
  console.log(res)

  if (res.fetching) {
    return "Loading...";
  } else if (res.error) {
    return "Oh no!";
  }
  return (
    <ul>
    </ul>
  );
};


const App = props => {
  console.log(props, 'porps')
  
  return(
  <MuiThemeProvider theme={theme}>
    <CssBaseline />
    <Provider store={store}>
      <Wrapper>
        <Header />
        <Data />
        <ToastContainer />
      </Wrapper>
    </Provider>
  </MuiThemeProvider>
  )
};

export default App;
