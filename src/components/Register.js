// รับอุปกรณ์
import React, { useState, useEffect } from "react";
import { Form, Input, message } from "antd";
import Axios from "axios";
import "./css/Register.css";
import {
  SaveFilled,
  NumberOutlined,
  UserOutlined,
  IdcardOutlined,
  ContactsOutlined,
  ImportOutlined,
} from "@ant-design/icons";

const Receive = (props) => {
  const [username, setUsername] = useState("");
  const [passwd, setPasswd] = useState("");
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [form] = Form.useForm();

  const send_table = () => {
    Axios.post(`http://${props.ServerHose}:3001/regis`, {
      UserID: username,
      Password: passwd,
      FristName: fname,
      LastName: lname,
    }).then((res) => {
      if (res.data == "success") {
        message
          .loading("กรุณารอสักครู่", 1)
          .then(() => message.success("บันทึกสำเร็จ", 5));

        // message.success("บันทึกสำเร็จ",5)
      } else {
        message
          .loading("กรุณารอสักครู่", 1)
          .then(() => message.error(res.data, 5));
      }
      console.log(res.data);
    });
  };

  return (
    <>
      <button
        className="back-btn"
        onClick={(e) => {
          props.regis(false);
        }}
      >
        <ImportOutlined style={{ marginRight: "10px", fontSize: "1rem" }} />
        กลับสู่หน้า Login
      </button>
      <div className="border-form">
        <h1>Register</h1>
        <Form
          form={form}
          size="defualt"
          className="form-position"
          layout="vertica"
        >
          <Form.Item
            name="username"
            label="Username"
            rules={[{ required: true, message: "กรุณากรอก Username" }]}
          >
            <Input
              placeholder="Username"
              prefix={<UserOutlined />}
              onChange={(e) => {
                setUsername(e.target.value);
              }}
              style={{ position: "relative", maxWidth: "100%" }}
            />
          </Form.Item>

          <Form.Item
            name="passwd"
            label="Password"
            rules={[{ required: true, message: "กรุณากรอก Password" }]}
          >
            <Input
              placeholder="Password"
              prefix={<NumberOutlined />}
              onChange={(e) => {
                setPasswd(e.target.value);
              }}
              style={{ position: "relative", maxWidth: "100%" }}
            />
          </Form.Item>

          <Form.Item
            name="Firstname"
            label="First Name"
            rules={[{ required: true, message: "กรุณากรอก Firstname" }]}
          >
            <Input
              placeholder="FirstName"
              prefix={<IdcardOutlined />}
              onChange={(e) => {
                setFname(e.target.value);
              }}
              style={{ position: "relative", maxWidth: "100%" }}
            />
          </Form.Item>

          <Form.Item
            name="LastName"
            label="Last Name"
            rules={[{ required: true, message: "กรุณากรอก LastName" }]}
          >
            <Input
              placeholder="LastName"
              prefix={<ContactsOutlined />}
              onChange={(e) => {
                setLname(e.target.value);
              }}
              style={{ position: "relative", maxWidth: "100%" }}
            />
          </Form.Item>

          <Form.Item>
            <button
              className="btn-submit"
              style={{ left: "0%" }}
              onClick={() => {
                if (
                  username == "" ||
                  passwd == "" ||
                  fname == "" ||
                  lname == ""
                ) {
                  message.error({
                    content: "กรอกข้อมูลไม่ครบ",
                    style: {
                      marginTop: "2vh",
                    },
                  });
                } else {
                  send_table();
                }
              }}
            >
              <SaveFilled style={{ marginRight: "10px", fontSize: "1.5rem" }} />
              Save
            </button>
          </Form.Item>
        </Form>
      </div>
    </>
  );
};

export default Receive;
