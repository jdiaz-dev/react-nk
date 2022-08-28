import React from 'react';
import { Logout } from '../../modules/security/security/adapters/in/components/Logout';
import './Header.scss';

function Header() {
  return (
    <div className="header" style={{ height: '9vh' }}>
      <div className="div-helper"></div>
      <Logout />
    </div>
  );
}

export default Header;
