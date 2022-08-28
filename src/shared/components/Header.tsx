import React from 'react';
import { Logout } from '../../modules/security/security/adapters/in/components/Logout';
import './Header.scss';

function Header() {
  return (
    <div className="header">
      <div className="div-helper"></div>
      <Logout />
    </div>
  );
}

export default Header;
