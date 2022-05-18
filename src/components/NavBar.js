import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import {MenuOutlined,CloseOutlined} from '@ant-design/icons'
import './css/NavBar.css'

function NavBar(props) {
  const [click, setClick] = useState(false);

  const handleClick = () => setClick(!click);
  return (
    <>
      <nav className="navbar">
        <div className="nav-container">
          <NavLink exact to="/" className="nav-logo">
            Hospital
          </NavLink>

          <ul className={click ? "nav-menu active" : "nav-menu"}>
            <li className="nav-item">
              <NavLink
                exact
                to="/"
                activeClassName="active"
                className="nav-links"
                onClick={handleClick}
              >
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                exact
                to="/add"
                activeClassName="active"
                className="nav-links"
                onClick={handleClick}
              >
                Add
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                exact
                to="/out"
                activeClassName="active"
                className="nav-links"
                onClick={handleClick}
              >
                TackOut
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                exact
                to="/contact"
                activeClassName="active"
                className="nav-links"
                onClick={handleClick}
              >
                Report
              </NavLink>
            </li>
            <li className="nav-links">
              <input className="logout-btn" type="button" value="Logout" onClick={()=>props.changeWord(true)}></input>
            </li>
          </ul>
          <div className="nav-icon" onClick={handleClick}>
            {/* <MenuOutlined className={click ? <CloseOutlined /> : "fas fa-bars"}/> */}
            {click ? <CloseOutlined/>:<MenuOutlined/>}
          </div>
        </div>
      </nav>
    </>
  );
}

export default NavBar;