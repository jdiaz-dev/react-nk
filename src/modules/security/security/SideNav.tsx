import React, { Component } from 'react';
import { Link, Outlet } from 'react-router-dom';

export class SideNav extends Component {
  render() {
    return (
      <div>
        SideNav
        <ul>
          <li>
            <Link to="commandments">commandments</Link>
          </li>
          <li>
            <Link to="openers">openers</Link>
          </li>
          <li>
            <Link to="tickets">tickets</Link>
          </li>

          <Outlet />
          {/* equal to router outlet of angular */}
        </ul>
      </div>
    );
  }
}
