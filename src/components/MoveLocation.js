import React,{useState, useEffect} from 'react';
import Axios from 'axios'
import {
  Alert,
  Form,
  Input,
  Select,
  DatePicker,
  InputNumber,
  Col,
  Row,
} from "antd";
import moment from "moment";
import {
  SaveOutlined,
  BarcodeOutlined,
  InfoCircleOutlined
} from "@ant-design/icons";



const MoveLocation = (props) => {
    const [serialNum, setSerialNum] = useState("");
    const [store,setStore] = useState({});
    const [targetStore , setTargetStore] =useState({});

    //Database
    const [tableStore, setTableStore]=useState([]);
    const [tableTarget, setTableTarget]=useState([]);
    //Database

    const get_table =  (tablename) => {
      Axios.get(`http://localhost:3001/${tablename}`).then((res) => {
        switch (tablename) {
  
          case "store":
            setTableStore(res.data);
            break;
            
          case "location":
            setTableTarget(res.data);
            break;
  
        }
      });
    };
  
    const selectFunc = (val,func) =>{
      const idx = val.indexOf("*");
      const id = val.slice(0,idx);
      const name =val.slice(idx+1,val.length);
  
      switch(func){
        case "store":
          setStore({StoreID:id , StoreName:name})
          break;
        case "location":
          setTargetStore({LocID:id , LocName:name})
          break;
      } 
    };



    useEffect(() => {
    props.sendBack("เคลื่อนย้ายอุปกรณ์");
    get_table("store");
    get_table("location");
    }, []);
  return (
    <>
      <div className="border-form">
       

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
            prefix={<BarcodeOutlined />}
              placeholder="Serial Number"
              onChange={(val) => {
                setSerialNum(val.target.value);
              }}
            />
          </Form.Item>

         

          <Form.Item
            label="คลังสินค้า"
            name="target-Department"
            tooltip={{
              title: "แผนกปลายทางที่ต้องการนำไปใช้",
              icon: <InfoCircleOutlined />,
            }}
          >
            <Select
              placeholder="เลือกคลัง"
              onChange={(val) => {
                selectFunc(val,"store");
              }}
            >
            { tableStore.map((value)=>{
                return <Select.Option value={value.StoreID+"*"+value.StoreName}> {value.StoreName} </Select.Option>
              })
            }
            </Select>
          </Form.Item>

          <Form.Item
            label="ที่เก็บ"
            name="name-take-out"
            tooltip={{
              title: "ชื่อผู้เบิกอุปกรณ์",
              icon: <InfoCircleOutlined />,
            }}
          >
            <Select
              placeholder="เลือกที่เก็บ"
              onChange={(val) => {
                selectFunc(val,'location')
              }}
            >
              { tableTarget.map((value)=>{
                return <Select.Option value={value.LocID+"*"+value.LocName}> {value.LocName} </Select.Option>
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
                <div id="flex-1">คลังสินค้า</div>
                <div id="flex-2">{store.StoreName}</div>
              </div>
              <div className="flex-container">
                <div id="flex-1">ที่เก็บ</div>
                <div id="flex-2">{targetStore.LocName}</div>
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
  )
}

export default MoveLocation