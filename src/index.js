import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import * as serviceWorker from "./serviceWorker";

import { SubscriptionClient } from 'subscriptions-transport-ws'
import { Provider, createClient, defaultExchanges, subscriptionExchange } from "urql";

const subscriptionClient = new SubscriptionClient('ws://react.eogresources.com/graphql', {})

const client = createClient({
    url: 'https://react.eogresources.com/graphql',
    exchanges: [
      ...defaultExchanges,
      subscriptionExchange({
        // expects a function
        forwardSubscription: operation => 
          subscriptionClient.request(operation) 
      })
    ]
  });
  

ReactDOM.render(
    <Provider value={client}>
    <App />
    </Provider>, 
    document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
