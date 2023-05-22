import React from 'react';
import ReactDOM from 'react-dom/client';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.js";
import "@fortawesome/fontawesome-free/css/all.min.css";
import './index.scss';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';

const root = ReactDOM.createRoot(document.getElementById('root'));

const client = new ApolloClient({
  uri: "https://graphql-ciz7.onrender.com/graphQl",
  cache: new InMemoryCache()
});
root.render(
  <ApolloProvider client={client}>
 <React.StrictMode>
    <App />
  </React.StrictMode>
  </ApolloProvider>
 
);


reportWebVitals();
