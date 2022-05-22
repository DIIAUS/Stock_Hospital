import React, { useState, useEffect } from "react";
import Axios from "axios";

import {
  Form,
  Input,
  Select,
  DatePicker,
  InputNumber,
  Modal,
  message,
} from "antd";

import moment from "moment";
import {
  SaveFilled,
  RedoOutlined,
  BarcodeOutlined,
  BankOutlined,
  InfoCircleOutlined,
  LoadingOutlined,
} from "@ant-design/icons";
import "./css/AddThing.css";

const { RangePicker } = DatePicker;
const { Option } = Select;

const AddThing = (props) => {
  const suffixSelector = (
    <Form.Item name="suffix" noStyle>
      <Select
        style={{
          width: 100,
        }}
        onChange={(e) => {
          console.log(e);
          setSuffix(e);
        }}
      >
        <Option value="ชิ้น">ชิ้น</Option>
        <Option value="อัน">อัน</Option>
      </Select>
    </Form.Item>
  );

  const [serialNum, setSerialNum] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [count, setCount] = useState();
  const [suffix, setSuffix] = useState("");
  const [company, setCompany] = useState("");
  const [form] = Form.useForm();

  // databases
  const [group, setGroup] = useState([]);
  const [type, setType] = useState([]);
  // databases

  const get_table = (tablename) => {
    Axios.get(`http://localhost:3001/${tablename}`).then((res) => {
      switch (tablename) {
        case "item_group":
          setGroup(res.data);
          break;
      }
    });
  };

  const send_table = () => {
    Axios.post("http://localhost:3001/add_item", {
      SerialNumber: serialNum,
      GroupID: type.GroupID,
      DeviceOfCompany: company,
      Onhand: count,
      UmCode: 1,
      FristDate: startDate,
      LastDate: endDate,

      Date: startDate,
      DepartmentID: 0 , 
      StoreID:1,
      LocID:1,
      ToStoreID:0,
      ToLocID:0,
      PersonID:0,
      TypeID:'R',
    }).then((res) => {
      console.log(res.data);
      if(res.data=="success"){
        Axios.post("http://localhost:3001/add_item_transection",{
          SerialNumber: serialNum,
          GroupID: type.GroupID,
          DeviceOfCompany: company,
          Date: startDate,
          DepartmentID: 0 , 
          StoreID:1,
          LocID:1,
          ToStoreID:0,
          ToLocID:0,
          PersonID:0,
          TypeID:'R',
        });
      }
      progress(res.data);
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
        message.error(value , 10);
      }
    }, TIME * 1000);
  };

  const setEmptyState = () => {
    setSerialNum("");
    setType({ GroupID: "", GroupName: "" });
    setStartDate("");
    setEndDate("");
    setCompany("");
    setCount(0);
    setSuffix("");
  };

  function onChange(value, dateString) {
    // console.log('Selected Time: ', value);
    console.log("Start Time: ", dateString[0]);
    console.log("End Time: ", dateString[1]);
    setStartDate(dateString[0]);
    setEndDate(dateString[1]);
  }

  const layout = {
    labelCol: { span: "50 rem" },
    wrapperCol: { span: "500px" },
    Button: {},
  };
  const onReset = () => {
    form.resetFields();
  };

  const selectFunc = (val, func) => {
    const idx = val.indexOf("*");
    const GroupID = val.slice(0, idx);
    const GroupName = val.slice(idx + 1, val.length);

    switch (func) {
      case "Type":
        setType({ GroupID: GroupID, GroupName: GroupName });
        break;
    }
  };

  useEffect(() => {
    props.sendBack("รับอุปกรณ์");
    get_table("item_group");
  }, []);
  return (
    <>
      <div className="border-form">
        <Form
          {...layout}
          form={form}
          size="defualt"
          className="form-position"
          layout="vertical"
        >
          <Form.Item
            name="s/n"
            label="Serial Number"
            rules={[{ required: true, message: "กรุณากรอก Serial Number" }]}
          >
            <Input
              placeholder="Serial Number"
              prefix={<BarcodeOutlined />}
              onChange={(e) => {
                setSerialNum(e.target.value);
                console.log(e.target.value);
              }}
              style={{ position: "relative", maxWidth: "100%" }}
            />
          </Form.Item>

          <Form.Item
            name="cmpn"
            label="บริษัท"
            rules={[{ required: true, message: "กรุณากรอกชื่อบริษัท" }]}
            tooltip={{
              title: "หากไม่มีให้กรอก  -  ",
              icon: <InfoCircleOutlined />,
            }}
          >
            <Input
              placeholder="บริษัท"
              prefix={<BankOutlined />}
              onChange={(e) => {
                setCompany(e.target.value);
                console.log(e.target.value);
              }}
              style={{ position: "relative", maxWidth: "100%" }}
            />
          </Form.Item>

          <Form.Item
            name="group"
            label="Group"
            rules={[{ required: true, message: "กรุณากรอก Group Items" }]}
          >
            <Select
              placeholder="เลือกประเภท"
              style={{ position: "relative", maxWidth: "100%" }}
              onChange={(val) => {
                selectFunc(val, "Type");
              }}
              allowClear
            >
              {group.map((val) => {
                return (
                  <Select.Option value={val.GroupID + "*" + val.GroupName}>
                    {val.GroupName}
                  </Select.Option>
                );
              })}
            </Select>
          </Form.Item>

          <Form.Item
            name="sum"
            label="จำนวน"
            rules={[
              {
                required: true,
                message: "กรุณากรอกจำนวน",
              },
            ]}
          >
            <InputNumber
              placeholder="กรอกจำนวน"
              addonAfter={suffixSelector}
              onChange={(e) => {
                console.log(e);
                setCount(e);
              }}
            />
          </Form.Item>

          <Form.Item
            name="date"
            label="วันที่กระทำกับสินค้า"
            rules={[{ required: true, message: "กรุณากรอกวันที่และเวลา" }]}
          >
            <RangePicker
              style={{ position: "relative", maxWidth: "50rem" }}
              ranges={{
                Today: [moment(), moment()],
                "This Month": [
                  moment().startOf("month"),
                  moment().endOf("month"),
                ],
              }}
              showTime
              format="YYYY/MM/DD HH:mm:ss"
              onChange={onChange}
            />
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
                <div id="flex-1">บริษัท</div>
                <div id="flex-2">{company}</div>
              </div>
              <div className="flex-container">
                <div id="flex-1">Group</div>
                <div id="flex-2">{type.GroupName}</div>
              </div>
              <div className="flex-container">
                <div id="flex-1">จำนวน</div>
                <div id="flex-2">
                  {count} {suffix}
                </div>
              </div>
              <div className="flex-container">
                <div id="flex-1">วันที่รับ</div>
                <div id="flex-2">{startDate}</div>
              </div>
              <div className="flex-container">
                <div id="flex-1">วันที่สุดท้าย</div>
                <div id="flex-2">{endDate}</div>
              </div>
            </div>
          </Form.Item>

          <Form.Item>
            <button
              className="btn-submit"
              onClick={() => {
                if (
                  serialNum == "" ||
                  company == "" ||
                  type.GroupID == null ||
                  count == null ||
                  count == 0 ||
                  startDate == "" ||
                  endDate == ""
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

            <button
              className="btn-reset"
              onClick={() => {
                form.resetFields();
                setSerialNum("");
                setType({ GroupID: "", GroupName: "" });
                setStartDate("");
                setEndDate("");
                setCompany("");
                setCount();
                setSuffix("");
              }}
            >
              <RedoOutlined
                style={{ marginRight: "10px", fontSize: "1.5rem" }}
              />
              Reset
            </button>
          </Form.Item>
        </Form>
      </div>
    </>
  );
};

export default AddThing;
