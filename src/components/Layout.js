import { Link, NavLink } from "react-router-dom";
import {BarsOutlined} from "@ant-design/icons"
import "./css/Layout.css"

const Layout = () => {
  
  return (
    <>
      <div>
        <nav >
          <span className="nav-toggle" id="js-nave-toggle">
          <BarsOutlined />
          </span>
          
          <div className="logo">
            <h1>Chonburi Hospital</h1>
          </div>

          <ul id="js-menu">
            <li>
              <NavLink to="/"style={{color:"#000"}} activeClassName="NavLink" >
                  
                  Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/add" style={{color:"#000"} }activeClassName="NavLink">
                Add
              </NavLink>
            </li>
            <li>
              <NavLink to="/out"style={{color:"#000"}}  activeClassName="NavLink">
                Out
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
};

export default Layout;
