import React from "react";

//Link is a component
//useMatch, useResolvedPath : are hooks
//useMatch : it allow compare the current path that we are on to whatever path we want
//useResolvedPath : allows to take relative or absolute path, it combine with the current path you're on  and gives you the actual full path that you would be accessing
import { Link, useMatch, useResolvedPath } from "react-router-dom";

function CustomLink({ to, children, ...props }: { to: any; children: any }) {
  const resolvedPath = useResolvedPath(to); //convert relative path to absolute path
  const isActive = useMatch({ path: resolvedPath.pathname, end: true }); //end: true   -> we are saying that the entite path must to match, it due that we don't want to worry about the partial path
  console.log("--------isActive", isActive);
  return (
    <li className={isActive ? "active" : ""}>
      <Link to={to}>{children}</Link>
    </li>
  );
}

export function Navbar() {
  return (
    <div>
      <nav className="nav">
        {/* to : it make reference to href */}
        <Link to="/" className="site-tile">
          Site name
        </Link>
        <ul>
          <CustomLink to="/login">login</CustomLink>
          <CustomLink to="/sidebar">sideBar</CustomLink>
          {/* <li>
            <a href="/pricing">Pricing</a>
          </li>
          <li>
            <a href="/about">About</a>
          </li> */}
        </ul>
      </nav>
    </div>
  );
}



