import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ApolloProvider } from 'react-apollo';
import { client } from './graphql/ApolloClient';

//  BrowserRouter: it allow route on mobile also
import { BrowserRouter } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

/* root.render(
  {<React.StrictMode>
    <App />
  </React.StrictMode>}
  );
 */
root.render(
  <ApolloProvider client={client}>
    <BrowserRouter>
      {/* wrapping entire application because entire app will use a single router */}
      <App />
    </BrowserRouter>
  </ApolloProvider>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
