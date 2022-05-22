import React, { useState, useEffect } from "react";


import AddThings from "./components/AddThing";

import MoveLoc from "./components/MoveLocation";
import NavBar from "./components/NavBar";
import Login from "./components/Login";

import TackOut from "./components/TakeOut";
import Report from "./components/Report";


import { Router, Route, Switch } from "react-router-dom";

import { BackTop } from "antd";

const style = {
  height: 50,
  width: 50,
  lineHeight: "50px",
  borderRadius: 50,
  backgroundColor: "#1088e9",
  color: "#fff",
  textAlign: "center",
  fontSize: "1rem",
};


const navTitle = ["รายงาน", "เบิกอุปกรณ์","รับอุปกรณ์", "เคลื่อนย้ายอุปกรณ์"];
function App() {
  const [token, setToken] = useState(() => {
    const saved = localStorage.getItem("TOKEN");
    const initialValue = JSON.parse(saved);
    return initialValue || "";
  });

  const [navs,setNavs] =useState();
  const [userData,setUserData] =  useState(() => {
    const saved = localStorage.getItem("USDATA");
    const initialValue = JSON.parse(saved);
    return initialValue || "";
  });

  useEffect(() => {
    localStorage.setItem("TOKEN", JSON.stringify(token));
    localStorage.setItem("USDATA", JSON.stringify(userData));
  });

  if (token) {
    return (
      <div>
        {console.log(token)}
        <Login changeWord={(word) => setToken(word)} userData={(data)=>setUserData(data)} />
        {/* <Switch>
          <Route path="login">
          <Login changeWord={(word) => setToken(word)} userData={(data)=>setUserData(data)} />
          </Route>
        </Switch> */}
      </div>
    );
  }


  

  return (
    <>
      {/* {console.log("USEDNAME",userData.FristName)} */}
      <Switch>
        {/* <Route exact path="/">
            <Login />
          </Route>
         */}

        <div>
          <NavBar changeWord={(token) => setToken(token)} statusPage={navs} userdata={userData} sendBack={(data)=>setUserData(data)}/>
          <Route exact path="/">
            <Report sendBack={(name) => setNavs(name)}/>
          </Route>

          <Route path="/add">
            <AddThings sendBack={(name) => setNavs(name)}/>
          </Route>

          <Route path="/out">
            <TackOut sendBack={(name) => setNavs(name)}/>
          </Route>

          <Route path="/mov">
            <MoveLoc sendBack={(name) => setNavs(name)}/>
          </Route>
          <BackTop visibilityHeight="10">
            <div style={style}>UP</div>
          </BackTop>
        </div>
      </Switch>
    </>
  );
}

export default App;
