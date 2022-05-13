// นำอุปกรณ์ออก หรือ เบิก
import React, { useState, useEffect } from "react";
import Axios from "axios";
import { Form, Input, Select, Collapse, Table } from "antd";
import {
  InfoCircleOutlined,
  SaveOutlined,
  CaretRightOutlined,
} from "@ant-design/icons";
import "./css/TackOut.css";


const { Panel } = Collapse;

const TakeOut = () => {
  const [serialNum, setSerialNum] = useState("");
  const [kurupan, setKurupan] = useState("");
  const [department, setDepartment] = useState("");
  const [name, setName] = useState("");
  const [onhand, setOnhand] = useState([]);
  

  // DATABASE
  const [item, setItem] = useState([]);
  const [item_group, setItem_group] = useState([]);
  // DATABASE

  

  useEffect(() => {
    get_item("item");
    get_item("item_group");
    count_item();
  }, []);

  const get_item = (tablename) => {
    Axios.get(`http://localhost:3001/${tablename}`).then((res) => {
      switch (tablename) {
        case "item":
          setItem(res.data);
          break;

        case "item_group":
          setItem_group(res.data);
          break;
      }
    });
  };

  const columns = [
    {
      title: "GroupName",
      dataIndex: "GroupName",
      align: "center",
      render: (text) => <p style={{ color: "blue" }}>{text}</p>,
    },
    {
      title: "Onhand",
      className: "column-sum",
      dataIndex: "Sum",
      align: "center",
      render: (text) => <p style={{ color: "red" }}>{text}</p>,
    },
  ];



  
const count_item = () =>{
  let arr  = []; 
  item_group.map(group => {
    const sum = item.filter(item => item.GroupID == group.GroupID).length;
    arr.push({GroupName:group.GroupName ,  Sum:sum})
  });
  console.log("count_item",arr);
  setOnhand(arr);
};

// const CountGroup = item_group.map(group => {
//   const sum = item.filter(item => item.GroupID == group.GroupID).length;
//   arr.push({GroupName:group.GroupName ,  Sum:sum})
// });
  
  

  
  

  return (
    <>
      <h1> take out</h1>
      {/* {console.log(item)} */}
      {/* {console.log(item_group)} */}
      {console.log(count_item)}
      
      <div className="border-form">
        <Collapse
          bordered={false}
          // defaultActiveKey={["1"]}
          expandIcon={({ isActive }) => (
            <CaretRightOutlined rotate={isActive ? 90 : 0} />
          )}
          className="site-collapse-custom-collapse"
          style={{ marginBottom: "5%", border: "1px dotted gray" }}
        >
          <Panel header="Onhand" key="1" className="site-collapse-custom-panel">
            <Table
              columns={columns}
              dataSource={onhand}
              bordered
              scroll={{ y: 500 }}
            />
          </Panel>
        </Collapse>
        <Form layout="vertical">
          <Form.Item
            label="Serial Number"
            name="s/n"
            tooltip={{
              title: "หมายเลข Serial Number",
              icon: <InfoCircleOutlined />,
            }}
          >
            <Input
              placeholder="Serial Number"
              onChange={(e) => {
                setSerialNum(e.target.value);
              }}
            />
          </Form.Item>

          <Form.Item
            label="เลขคุรุภัณฑ์"
            name="kurupan-Number"
            tooltip={{
              title: "ex: 121212",
              icon: <InfoCircleOutlined />,
            }}
          >
            <Input
              placeholder="เลขคุรุภัณฑ์"
              onChange={(e) => {
                setKurupan(e.target.value);
              }}
            />
          </Form.Item>

          <Form.Item
            label="นำไปใช้แผนก"
            name="target-Department"
            tooltip={{
              title: "แผนกปลายทางที่ต้องการนำไปใช้",
              icon: <InfoCircleOutlined />,
            }}
          >
            <Select
              onChange={(e) => {
                setDepartment(e);
              }}
            >
              <Select.Option value="demo">Demo</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item
            label="ชื่อคนเบิก"
            name="name-take-out"
            tooltip={{
              title: "ชื่อผู้เบิกอุปกรณ์",
              icon: <InfoCircleOutlined />,
            }}
          >
            <Select
              onChange={(e) => {
                setName(e);
              }}
            >
              <Select.Option value="demo">Demo</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item>
            <div className="take-out-report">
              <h2
                style={{
                  textAlign: "center",
                  color: "white",
                  fontSize: "2rem",
                  borderBottom: "1px  black",
                  background: "#000",
                }}
              >
                สรุป
              </h2>
              <div className="flex-container">
                <div id="flex-1">Serial Number</div>
                <div id="flex-2">{serialNum}</div>
              </div>
              <div className="flex-container">
                <div id="flex-1">เลขคุรุภัณฑ์</div>
                <div id="flex-2">{kurupan}</div>
              </div>
              <div className="flex-container">
                <div id="flex-1">นำไปใช้แผนก</div>
                <div id="flex-2">{department}</div>
              </div>
              <div className="flex-container">
                <div id="flex-1">ชื่อคนเบิก</div>
                <div id="flex-2">{name}</div>
              </div>
            </div>
          </Form.Item>

          <Form.Item>
            <button className="take-out-btn-submit">
              {" "}
              <SaveOutlined /> บันทึก
            </button>
          </Form.Item>
        </Form>
      </div>
    </>
  );
};

export default TakeOut;
