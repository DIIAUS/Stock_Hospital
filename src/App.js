import React, { useState,useEffect } from 'react';
import Axios from "axios";
import Test from "./components/Blase";
import AddEmploy from "./components/InsertEmployee";
import AddThings from "./components/AddThing";
import New from "./components/new";
import MoveLoc from "./components/MoveLocation";
import NavBar from "./components/NavBar";
import Login from "./components/Login";
import TestRender from "./components/TestRender";
import TackOut from "./components/TakeOut";
import TitleMenu from "./components/TitleMenu";

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

function App() {
  // const token = localStorage.getItem('accessToken');
  const[token,setToken] = useState(() => {
    // getting stored value
    const saved = localStorage.getItem("USED");
    const initialValue = JSON.parse(saved);
    return initialValue || "";
  });
  const[used ,setUsed] = useState();

  const sendDataToParent = (index) => { 
    console.log(index);
    setUsed(index);
  };


  const getToken =()=>{
    Axios.post(`http://localhost:3001/login`).then((res) => {
        // return console.log(res.data[0].UserID);
    });
  }

  useEffect(() => {
    getToken();
    localStorage.setItem("USED", JSON.stringify(token));
  })

  if(token) {
    return <div>
       {/* {console.log(token)} */}
       {console.log(token)}
       <h1>{token}</h1>
       <Login changeWord={word=> setToken(word)}/>
       
    </div>
  };

  return (
    <>
        {console.log(token)}
        <Switch>
          {/* <Route exact path="/">
            <Login />
          </Route>
         */}
          
          <div>
            <NavBar changeWord={word=> setToken(word)}/>
            <Route exact path="/">
              <AddThings />
            </Route>
            
            <Route path="/out">
              <TackOut />
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
