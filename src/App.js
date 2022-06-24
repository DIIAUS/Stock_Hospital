import React, { useState, useEffect } from "react";

import AddThings from "./components/AddThing";
import MoveLoc from "./components/MoveLocation";
import NavBar from "./components/NavBar";
import Login from "./components/Login";
import TackOut from "./components/TakeOut";
import Report from "./components/Report";
import Register from "./components/Register";
import Loan from "./components/Loan";
import KurupanUpdate from "./components/KurupanCheck";


import { Route, Switch, BrowserRouter, Redirect } from "react-router-dom";

import { BackTop} from "antd";
import { ToTopOutlined } from "@ant-design/icons";

//  Config APP
const ServerHose = "192.168.42.221";
const setTimeOut = 60; //minute
//  Config APP

function App() {
  const [token, setToken] = useState(() => {
    const saved = localStorage.getItem("TOKEN");
    const initialValue = JSON.parse(saved);
    return initialValue;
  });

  const [navs, setNavs] = useState();
  const [register, setRegister] = useState(false);
  const [userData, setUserData] = useState(() => {
    const saved = localStorage.getItem("USDATA");
    const initialValue = JSON.parse(saved);
    return initialValue || "";
  });

  function inactivityTime() {
    var time;
    
    // events
    window.onload = resetTime;
    window.onclick = resetTime;
    window.onkeypress = resetTime;
    window.ontouchstart = resetTime;
    window.onmousemove = resetTime;
    window.onmousedown = resetTime;
    window.addEventListener('scroll', resetTime, true);

    function alertUser() {
        // do your task here
        alert("User is inactive.");
        
    }

    function resetTime() {
        clearTimeout(time);
        time = setTimeout(alertUser, 1000 * 10); // 10 seconds
    }

};

  useEffect(() => {
    localStorage.setItem("TOKEN", JSON.stringify(token));
    localStorage.setItem("USDATA", JSON.stringify(userData));
  });

  useEffect(() => {
    if (token === true) {
      const timer = setTimeout(() => {
        setToken(false);
        localStorage.setItem("TOKEN", JSON.stringify(false));
        localStorage.setItem("USDATA", JSON.stringify(""));
        alert("กรุณาเข้าสู่ระบบอีกครั้ง");
      }, setTimeOut * 60000);
      return () => clearTimeout(timer);
    }
  }, [token]);

  if (token) {
    return (
      <>
       
        <BrowserRouter>
          <Switch>
            <div>
              <NavBar
                changeWord={(token) => setToken(token)}
                statusPage={navs}
                userdata={userData}
                sendBack={(data) => setUserData(data)}
              />
              <Route path="/stockReport">
                <Report
                  sendBack={(name) => setNavs(name)}
                  ServerHose={ServerHose}
                />
              </Route>

              <Route path="/add">
                <AddThings
                  sendBack={(name) => setNavs(name)}
                  ServerHose={ServerHose}
                />
              </Route>

              <Route path="/out">
                <TackOut
                  sendBack={(name) => setNavs(name)}
                  ServerHose={ServerHose}
                />
              </Route>

              <Route path="/mov">
                <MoveLoc
                  sendBack={(name) => setNavs(name)}
                  ServerHose={ServerHose}
                />
              </Route>

              <Route path="/loan">
                <Loan
                  sendBack={(name) => setNavs(name)}
                  ServerHose={ServerHose}
                />
              </Route>

              <Route path="/kurupancheck">
                <KurupanUpdate
                  sendBack={(name) => setNavs(name)}
                  ServerHose={ServerHose}
                />
              </Route>

              <Redirect exact from="/" to="add" />
              <BackTop visibilityHeight="10">
                <div className="btn-to-top">
                  <ToTopOutlined style={{ fontSize: "26px" }} />
                </div>
              </BackTop>
            </div>
          </Switch>
        </BrowserRouter>
      </>
    );
  } else {
    if (register) {
      return (
        <div>
          <Register regis={(res) => setRegister(res)} ServerHose={ServerHose} />
        </div>
      );
    } else {
      return (
        <div>
          {console.log(token)}
          <Login
            changeWord={(word) => setToken(word)}
            userData={(data) => setUserData(data)}
            regis={(res) => setRegister(res)}
            ServerHose={ServerHose}
          />
        </div>
      );
    }
  }
}

export default App;
