import React, { useState, useEffect } from "react";
import { Card, Form, Input, Layout} from "antd";
import { EditOutlined, PlusCircleFilled } from "@ant-design/icons";
import { Content, Footer } from "antd/lib/layout/layout";
import './css/Login.css'

const { Meta } = Card;
const Login = () => {
  const [rawData, setRawData] = useState([
    { name: "bank", id: 1 },
    { name: "Joe", id: 2 },
    { name: "ling", id: 3 },
  ]);
  const [username , setUsername] = useState("");
  const [password , setPassword] = useState("");

  const check = (data)=>{
    let checkData  = rawData.find(e=>e.name == data)  // edite
    if(checkData){
        return (checkData)    // moveTo
    }
    else{
        return("err")
    }
    
  }

  const onFinish = (values) => {
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <Layout>
    <Content>
      <div className="body">
      {console.log(check("Bank"))}
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
                  <Input.Password />
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
