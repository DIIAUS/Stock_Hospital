import React,{useState, useEffect} from 'react';
import Axios from 'axios'
import {
  Modal,
  Form,
  Input,
  Select,
  message,
  InputNumber,
  Col,
  Row,
} from "antd";
import moment from "moment";
import {
  SaveOutlined,
  BarcodeOutlined,
  InfoCircleOutlined,
  LoadingOutlined
} from "@ant-design/icons";



const MoveLocation = (props) => {
    const [serialNum, setSerialNum] = useState("");
    const [store,setStore] = useState({});
    const [targetStore , setTargetStore] =useState({});
    const [form] = Form.useForm();

    //Database
    const [tableStore, setTableStore]=useState([]);
    const [tableTarget, setTableTarget]=useState([]);
    const [obj,setObj] = useState({});
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

    const send_table = () => {
      Axios.post("http://localhost:3001/send_item", {
        SerialNumber: serialNum,
      }).then((res) => {
        console.log(res.data[0]);
        if(res.data[0]){
          Axios.post("http://localhost:3001/move_loc",{
            SerialNumber: serialNum,
            ToStoreID:store.StoreID,
            ToLocID:targetStore.LocID,
            GroupID:res.data[0].GroupID
          }).then((res)=>{
            progress(res.data);
          })
        }else{
          message.error('ไม่มี Serial Number นี้ !!!!!');
        }
      });
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
        console.log("mmmmm", value);
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

    const setEmptyState = () => {
      setSerialNum("") ;
      setStore ({});
      setTargetStore ({});
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
        <Form layout="vertical" form={form}
          size="defualt"
          className="form-position" >
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
            rules={[{ required: true, message: "คลังสินค้า" }]}
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
            rules={[{ required: true, message: "ที่เก็บ" }]}
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
            <button className="take-out-btn-submit" onClick={() => {
                if (
                  serialNum == "" ||
                  store.StoreName == null||
                  targetStore.LocName == null
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
  )
}

export default MoveLocation