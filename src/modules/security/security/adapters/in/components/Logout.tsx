import React, { useContext } from 'react';
import { AuthContext } from '../../../../../../App';
import { removeUserFromLocalStorage } from '../../../../../../shared/helpers/LocalStorage';
import './Logout.scss';

export function Logout() {
  const authContext = useContext(AuthContext);

  const checkClickOutsideOfLogoutButton = () => {
    window.addEventListener('click', (e: Event) => {
      const logoLogout = document.getElementById('logoLogout');
      const closeSessionButton = document.getElementById('closeSessionButton');
      if (e.target !== logoLogout) {
        closeSessionButton?.classList.remove('showButton');
      }
    });
  };
  const showCloseSesionButton = () => {
    const logoLogout = document.getElementById('logoLogout');
    const pathSvgLogout = document.getElementById('pathSvgLogout');

    const closeSessionButton = document.getElementById('closeSessionButton');
    closeSessionButton?.classList.add('showButton');
    window.addEventListener('click', (e: Event) => {
      if (e.target == logoLogout || e.target == pathSvgLogout) {
        closeSessionButton?.classList.add('showButton');
        checkClickOutsideOfLogoutButton();
      } else {
        closeSessionButton?.classList.remove('showButton');
      }
    });
  };
  const sendLogout = () => {
    authContext.setIsAuthenticated(false);
    removeUserFromLocalStorage();
    // this.cookieService.delete('token', '/');
  };
  return (
    <div className="logout-button">
      <div className="container-image" onClick={showCloseSesionButton}>
        <svg
          id="logoLogout"
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          aria-hidden="true"
          role="img"
          width="60px"
          height="60px"
          preserveAspectRatio="xMidYMid meet"
          viewBox="0 0 24 24"
        >
          <path
            id="pathSvgLogout"
            // eslint-disable-next-line max-len
            d="M12 2C6.579 2 2 6.579 2 12s4.579 10 10 10s10-4.579 10-10S17.421 2 12 2zm0 5c1.727 0 3 1.272 3 3s-1.273 3-3 3c-1.726 0-3-1.272-3-3s1.274-3 3-3zm-5.106 9.772c.897-1.32 2.393-2.2 4.106-2.2h2c1.714 0 3.209.88 4.106 2.2C15.828 18.14 14.015 19 12 19s-3.828-.86-5.106-2.228z"
            fill="currentColor"
          />
        </svg>
        <div className="back"></div>
      </div>
      <div id="closeSessionButton" className="button-close-session" onClick={() => sendLogout()}>
        Cerrar sesion
      </div>
    </div>
  );
}
