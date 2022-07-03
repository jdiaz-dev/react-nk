import React from 'react';
import logo from './logo.svg';
import './App.css';
import LogIn from './modules/security/security/adapters/in/components/LogIn';
import Navbar from './modules/security/security/Navbar';
import SideNav from './modules/security/security/SideNav';

//Route and Routes are components
import { Route, Routes } from 'react-router-dom';

import Commandments from './modules/apocalipsex/commandments/adapters/in/components/Commandments';
import OpenersContainer from './modules/openers/openers/adapters/in/OpenersContainer';
import TicketsContainer from './modules/apocalipsex/tickets/in/components/TicketsContainer';

function App() {
  console.log('--------app');

  return (
    <div className="App">
      <Routes>
        {/* wrapping entire al  routes between Routes  */}
        <Route path="/" element={<LogIn />} />
        <Route path="/login" element={<LogIn />} />
        <Route path="sidenav" element={<SideNav />}>
          <Route path="commandments" element={<Commandments />} />
          <Route path="openers" element={<OpenersContainer />} />
          <Route path="tickets" element={<TicketsContainer />} />
        </Route>
      </Routes>
      {/* <LogIn></LogIn> */}
    </div>
  );
}

export default App;
//use useReducer