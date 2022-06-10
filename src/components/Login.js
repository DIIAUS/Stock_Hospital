import React, { useState, useEffect } from "react";
import Axios from "axios";
import { Card, Form, Input, Layout, message } from "antd";
import { Content, Footer } from "antd/lib/layout/layout";
import "./css/Login.css";
import PropTypes from "prop-types";

const { Meta } = Card;

const Login = (props) => {
  const [loginTable, setLoginTable] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [st, setSt] = useState("");

  const onFinish = async (values) => {
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  useEffect(() => {
    // getTable();
    Axios.post(`http://${props.ServerHose}:3001/login`).then((res) => {
      setLoginTable(res.data);
    });
  }, []);

  const success = () => {
    message
      .loading("Action in progress..", 2.5)
      .then(() => message.success("Loading finished", 2.5))
      .then(() => message.info("Loading finished is finished", 2.5));
  };

  const checkLogin = () => {
    const inputUser = { UserID: username, Password: password };
    let token = false;
    loginTable.map(({ UserID, Password, FristName, LastName }) => {
      const tableUser = { UserID: `${UserID}`, Password: `${Password}` };
      // console.log(tableUser);
      if (JSON.stringify(inputUser) === JSON.stringify(tableUser)) {
        const nameUser = { FristName: `${FristName}`, LastName: `${LastName}` };
        console.log(true);
        props.userData(nameUser);
        props.changeWord(true);
        token = true;
      }
    });

    switch (token) {
      case false:
        message
          .loading("กรุณารอสักครู่", 1)
          .then(() => message.error("ไม่พบบัญชี", 2));
        break;
    }
  };

  return (
    <Layout>
      {/* <button
        style={{ background: "red" }}
        onClick={(e) => {
          props.changeWord(true);
          props.userData({ FristName: "JOE", LastName: "DIIUAS" });
        }}
      >
        Admin Login
      </button> */}
      <Content>
        <div className="body">
          <div className="card-form">
            <Card
              hoverable
              title={<h1 style={{ textAlign: "center" }}>เข้าสู่ระบบ</h1>}
              style={{ width: "100%" }}
              actions={[
                <a
                  className="register-btn"
                  onClick={(e) => {
                    props.regis(true);
                  }}
                >
                  ลงทะเบียน
                </a>,
              ]}
            >
              <div className="login-form">
                <Form
                  name="basic"
                  labelCol={{
                    span: 8,
                  }}
                  wrapperCol={{
                    span: 16,
                  }}
                  initialValues={{
                    remember: true,
                  }}
                  onFinish={onFinish}
                  onFinishFailed={onFinishFailed}
                  autoComplete="off"
                >
                  <Form.Item
                    label="Username"
                    name="username"
                    rules={[
                      {
                        required: true,
                        message: "Please input your username!",
                      },
                    ]}
                  >
                    <Input
                      onChange={(e) => {
                        setUsername(e.target.value);
                        // console.log(username)
                      }}
                    />
                  </Form.Item>

                  <Form.Item
                    label="Password"
                    name="password"
                    rules={[
                      {
                        required: true,
                        message: "Please input your password!",
                      },
                    ]}
                  >
                    <Input.Password
                      onChange={(e) => {
                        setPassword(e.target.value);
                      }}
                    />
                  </Form.Item>

                  <Form.Item
                    wrapperCol={{
                      offset: 8,
                      span: 16,
                    }}
                  >
                    <button
                      className="button"
                      onClick={() => {
                        checkLogin();
                      }}
                    >
                      Login
                    </button>
                  </Form.Item>
                </Form>
              </div>
            </Card>
          </div>
        </div>
      </Content>
      <Footer>
        <p>โรงพยาบาลชลบุรี@2022 by KUsrc</p>
        <p>Tell : 0-3893-1000 </p>
      </Footer>
    </Layout>
  );
};

export default Login;

Login.propTypes = {
  setToken: PropTypes.func.isRequired,
};
