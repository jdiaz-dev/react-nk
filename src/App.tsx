import React from 'react';
import logo from './logo.svg';
import './App.css';
import LogIn from './modules/security/security/adapters/in/components/LogIn';
// import { Navbar } from './modules/security/security/Navbar';
import { SideNav } from './modules/security/security/SideNav';

//Route and Routes are components
import { Route, Routes } from 'react-router-dom';

import Commandments from './modules/apocalipsex/commandments/adapters/in/components/Commandments';
import OpenersContainer from './modules/openers/openers/adapters/in/OpenersContainer';
import TicketsContainer from './modules/apocalipsex/tickets/in/components/TicketsContainer';
import { GmailTreeView } from './modules/security/security/help';

function App() {
  return (
    <div className="App">
      <Routes>
        {/* wrapping entire al  routes between Routes  */}
        <Route path="/" element={<LogIn />} />
        <Route path="/login" element={<LogIn />} />
        
        {/* <Route path="sidenav" element={<SideNav />}> */}
        <Route path="sidenav" element={<GmailTreeView />}>
          <Route path="commandments" element={<Commandments />} />
          <Route path="openers" element={<OpenersContainer />} />
          <Route path="tickets" element={<TicketsContainer />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
// material UI: https://v4.mui.com/
//use useReducer
// change global context on react  https://stackoverflow.com/questions/41030361/how-to-update-react-context-from-inside-a-child-component
