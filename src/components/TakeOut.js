// นำอุปกรณ์ออก หรือ เบิก
import React, { useState, useEffect } from "react";
import Axios from "axios";
import { Form, Input, Select, Collapse, Table ,Modal,
  message, } from "antd";
import {
  InfoCircleOutlined,
  SaveOutlined,
  CaretRightOutlined,
  BorderlessTableOutlined,
  BarcodeOutlined,
  LoadingOutlined,
} from "@ant-design/icons";
import "./css/TackOut.css";


const { Panel } = Collapse;

const TakeOut = (props) => {
  const [serialNum, setSerialNum] = useState("");
  const [kurupan, setKurupan] = useState("");
  const [department, setDepartment] = useState({});
  const [name, setName] = useState({});
  const [localtime,setLocaltime] =useState("");
  const [click,setClick] = useState(false);
  const [form] = Form.useForm();
  
  
  // DATABASE
  const [item, setItem] = useState([]);
  const [item_group, setItem_group] = useState([]);
  const [onhandList, setOnhandList] = useState([]);
  const [departmentList, setDepartmentList] = useState([]);
  const [personList, setPersonList] = useState([]);
  // DATABASE

  const timeNow = ()=>{
    var today = new Date();
    var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    var dateTime = date+' '+time;
    console.log(dateTime);
    return(dateTime);
  };

  useEffect(() => {get_table("onhand")},[name])
  

  useEffect(() => {
    get_table("onhand")
    get_table("item");
    get_table("item_group");
    get_table("department");
    get_table("person");
    props.sendBack("เบิกอุปกรณ์");
  }, []);

  

 const get_table =  (tablename) => {
    Axios.get(`http://localhost:3001/${tablename}`).then((res) => {
      switch (tablename) {

        case "onhand":
          setOnhandList(res.data);
          break;
          
        case "department":
          setDepartmentList(res.data);
          break;

        case "person":
          setPersonList(res.data);
          break;
          
        case "item":
          setItem(res.data);
          break;

        case "item_group":
          setItem_group(res.data);
          break;
      }
    });
  };


  const send_table = () => {
    Axios.post("http://localhost:3001/send_item", {
      SerialNumber: serialNum,
    }).then((res) => {
      console.log(res.data[0]);
      // console.log(res.data);
      if(res.data[0]){
        Axios.post("http://localhost:3001/out_item",{
          SerialNumber: res.data[0].SerialNumber
        }).then((res)=>{
          progress(res.data);
        });

        Axios.post("http://localhost:3001/out_item_transection",{
          SerialNumber: res.data[0].SerialNumber,
          GroupID: res.data[0].GroupID,
          DeviceOfCompany: res.data[0].DeviceOfCompany,
          Date: timeNow(),
          DepartmentID: department.ID , 
          StoreID:1,
          LocID:1,
          ToStoreID:0,
          ToLocID:0,
          PersonID:name.ID,
          TypeID:'W',
        });
      }else{
        message.error('ไม่มี Serial Number นี้ !!!!!');
      }
    });
  };

  const setEmptyState = () => {
    setSerialNum("");
    setKurupan("");
    setDepartment({});
    setName({});

  };

  const progress = (value) => {
    let TIME = 2;
    const modal = Modal.info({
      okButtonProps: { style: { display: "none" } },
      icon: <LoadingOutlined />,
      content: "กำลังตรวจสอบข้อมูล",
    });
    const timer = setInterval(() => {
      TIME -= 1;
    }, 1000);

    setTimeout(() => {
      clearInterval(timer);
      modal.destroy();
      if (value == "success") {
        console.log("YES VALUE IS :", value);
        message.success("เก็บข้อมูลสำเร็จ", 5);
        form.resetFields();
        setEmptyState();
      } else {
        console.log("YES VALUE IS :", value);
        message.error(value, 10);
      }
    }, TIME * 1000);
  };



  const selectFunc = (val,func) =>{
    const idx = val.indexOf("*");
    const id = val.slice(0,idx);
    const name =val.slice(idx+1,val.length);

    switch(func){
      case "DEPART":
        setDepartment({ID:id , NAME:name})
        break;
      case "PERSON":
        setName({ID:id , NAME:name})
        break;
    } 
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
      dataIndex: "Onhand",
      align: "center",
      render: (text) => <p style={{ color: "red" }}>{text}</p>,
    },
  ];

  return (
    <> 
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
              dataSource={onhandList}
              bordered
              scroll={{ y: 500 }}
            />
          </Panel>
        </Collapse>

        <Form layout="vertical" form={form} size="defualt"
          className="form-position">
          <Form.Item
            label="Serial Number"
            name="s/n"
            tooltip={{
              title: "หมายเลข Serial Number",
              icon: <InfoCircleOutlined />,
            }}
            rules={[{ required: true, message: "Serial Number" }]}
          >
            <Input
            prefix={<BarcodeOutlined />}
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
            rules={[{ required: true, message: "เลขคุรุภัณฑ์" }]}
          >
            <Input
            
            prefix={<BorderlessTableOutlined />}
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
            rules={[{ required: true, message: "นำไปใช้แผนก" }]}
          >
            <Select
            placeholder="เลือกแผนกที่นำไปใช้"
              onChange={(val) => {
                selectFunc(val,'DEPART');
              }}
            >
            { departmentList.map((value)=>{
                return <Select.Option value={value.DepartmentID+"*"+value.DepartmentName}> {value.DepartmentName} </Select.Option>
              })
            }
            </Select>
          </Form.Item>

          <Form.Item
            label="ชื่อคนเบิก"
            name="name-take-out"
            tooltip={{
              title: "ชื่อผู้เบิกอุปกรณ์",
              icon: <InfoCircleOutlined />,
            }}
            rules={[{ required: true, message: "ชื่อคนเบิก" }]}
          >
            <Select
            placeholder="เลือกผู้เบิกอุปกรณ์"
              onChange={(val) => {
                selectFunc(val,'PERSON');
              }}
            >
               { personList.map((value)=>{
                 
                return <Select.Option value={value.Id+"*"+value.FristName+" "+value.LastName}> {value.FristName} {value.LastName}</Select.Option>
              })
            }
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
                <div id="flex-2">{department.NAME}</div>
              </div>
              <div className="flex-container">
                <div id="flex-1">ชื่อคนเบิก</div>
                <div id="flex-2">{name.NAME}</div>
              </div>
            </div>
          </Form.Item>

          <Form.Item>
            <button className="take-out-btn-submit" onClick={()=>{
              if (
                serialNum == "" ||
                kurupan == "" ||
                department.NAME== "" ||
                name.NAME == ""
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
              
              }}>
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
