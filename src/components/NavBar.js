import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { Popover , Avatar} from "antd";
import { MenuOutlined, CloseOutlined,UserOutlined,ImportOutlined } from "@ant-design/icons";
import "./css/NavBar.css";
import Logos from "../logo.png";

function NavBar(props) {
  const [click, setClick] = useState(false);
  const handleClick = () => {
    setClick(!click);
  };

   const navMenu = [
     {Line : "/add" , Name : "รับอุปกรณ์"},
     {Line : "/out" , Name : "เบิกอุปกรณ์"},
     {Line : "/loan" , Name : "ยืม/คืน อุปกรณ์"},
     {Line : "/mov" , Name : "เคลื่อนย้ายอุปกรณ์"},
     {Line : "/stockReport" , Name : "รายงาน"},
  ]

  const content = (
    <div>
      <p>{`ชื่อผู้ใช้ : ${props.userdata.FristName} ${props.userdata.LastName}`}</p>
      <NavLink exact to="/add" activeClassName="active">
        <button
          className="logout-btn"
          type="button"
          onClick={() => {
            props.changeWord(false);
            props.sendBack({FristName:"", LastName:""})
          }}
         
        > <ImportOutlined style={{marginRight:"10px"}}/> Loguot</button>
      </NavLink>
    </div>
  );
  return (
    <>
      <nav className="navbar">
        <div className="nav-container">
          <NavLink exact to="/stockReport" className="nav-logo">
          <img src={Logos} width="60" height="60" alt=""/>
            Chonburi Hospital
          </NavLink>

          <ul className={click ? "nav-menu active" : "nav-menu"}>
            {navMenu.map((e)=>{
              return (
                <li className="nav-item">
                  <NavLink
                    exact
                    to={e.Line}
                    activeClassName="active"
                    className="nav-links"
                    onClick={() => handleClick()}
                  >
                    {e.Name}
                  </NavLink>
                </li>
              )
            })}
            {/* <li className="nav-item">
              <NavLink
                exact
                to="/"
                activeClassName="active"
                className="nav-links"
                onClick={() => handleClick()}
              >
                {navTitle[0]}
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                exact
                to="/add"
                activeClassName="active"
                className="nav-links"
                onClick={() => handleClick()}
              >
                {navTitle[2]}
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                exact
                to="/out"
                activeClassName="active"
                className="nav-links"
                onClick={() => handleClick()}
              >
                {navTitle[1]}
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                exact
                to="/mov"
                activeClassName="active"
                className="nav-links"
                onClick={() => handleClick()}
              >
                {navTitle[3]}
              </NavLink>
            </li> */}

            <li className="nav-links">
              
              <Popover content={content} title="ข้อมูลผู้ใช้" trigger="click" placement="bottomRight">
                <Avatar size={46} style={{
                  color: '#f56a00',
                  backgroundColor: '#fde3cf',
                  cursor:"pointer",
                  
              }}
              > {props.userdata.FristName} </Avatar>
              </Popover>
            </li>
          </ul>
          <div
            className="nav-icon"
            onClick={() => {
              setClick(!click);
            }}
          >
            {click ? <CloseOutlined /> : <MenuOutlined />}
          </div>
        </div>
      </nav>
      <h2 className="rectangle">{props.statusPage}</h2>
    </>
  );
}

export default NavBar;
