import React, { useState, useEffect } from "react";
import { Card, Form, Input, Layout} from "antd";
import { EditOutlined, PlusCircleFilled } from "@ant-design/icons";
import { Content, Footer } from "antd/lib/layout/layout";
import './css/Login.css'
import PropTypes from 'prop-types';
// import swal from 'sweetalert';

const { Meta } = Card;

const Login = (props) => {
  
  const [username , setUsername] = useState("");
  const [password , setPassword] = useState();

  


  

  const onFinish = async (values) => {
    console.log("Success:", values);
   
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <Layout>
      {console.log(username)}
      <button onClick={()=>props.changeWord(false)}>
        TRUE
      </button>
      {/* <button onClick={()=>props.changeWord("butta")}>
        username
      </button> */}
    <Content>
      <div className="body">
      {/* {console.log(check("Bank"))} */}
        <div className="card-form">
          <Card
            hoverable
            title={<h1 style={{ textAlign: "center" }}>เข้าสู่ระบบ</h1>}
            style={{ width: "100%" }}
            actions={[
              <a className="register-btn">
                ลงทะเบียน
              </a>
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
                  <Input onChange={(e)=>{
                      setUsername(e.target.value);
                      // console.log(username)
                  }}/>
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
                  <Input.Password onChange={(e)=>{
                    setPassword(e.target.value);
                  }}/>
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
                      //
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
  setToken: PropTypes.func.isRequired
}
