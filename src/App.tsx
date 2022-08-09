import React, { createContext, useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.scss';
import LogIn from './modules/security/security/adapters/in/components/LogIn';
// import { Navbar } from './modules/security/security/Navbar';
import { SideNav } from './modules/security/security/SideNav';

//Route and Routes are components
import { Navigate, Route, Routes } from 'react-router-dom';

import Commandments from './modules/apocalipsex/commandments/adapters/in/components/Commandments';
import OpenersContainer from './modules/openers/openers/adapters/in/OpenersContainer';
import { ApocalipsexContainer } from './modules/apocalipsex/apocalipsex/in/ApocalipsexContainer';
import { Drawer } from './shared/components/Drawer';
import { checkAuthentication } from './shared/helpers/LocalStorage';

export const AuthContext = createContext<{
  isAuthenticated: boolean;
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
}>({ isAuthenticated: true, setIsAuthenticated: useState });

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  useEffect(() => {
    setIsAuthenticated(checkAuthentication());

    return () => {};
  }, [isAuthenticated]);

  const value = {
    isAuthenticated,
    setIsAuthenticated,
  };

  return (
    <div className="App">
      <AuthContext.Provider value={value}>
        <Routes>
          {/* wrapping entire al  routes between Routes  */}
          <Route path="/" element={<LogIn />} />
          {!isAuthenticated && <Route path="/login" element={<LogIn />} />}

          {/* <Route path="sidenav" element={<SideNav />}> */}
          {isAuthenticated && (
            <Route path="sidenav" element={<Drawer />}>
              <Route path="commandments" element={<Commandments />} />
              <Route path="openers" element={<OpenersContainer />} />
              <Route path="tickets" element={<ApocalipsexContainer />} />
            </Route>
          )}

          {/* default route */}
          <Route path="*" element={<Navigate to={isAuthenticated ? '/sidenav/tickets' : '/login'} />} />
        </Routes>
      </AuthContext.Provider>
    </div>
  );
}

export default App;
/* 
  TODO features:
    - check if you were capable to accomplish with commandments established 
    - interaction counter
    - after 12am alert about commadments to accomplish  
*/

// material UI: https://v4.mui.com/
//use useReducer
// change global context on react  https://stackoverflow.com/questions/41030361/how-to-update-react-context-from-inside-a-child-component

//to build: npm run build
//to sync to s3 bucket : aws s3 sync build/ s3://fe-apocalipsex-bucket

//TODO
//create logout component
