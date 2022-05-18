import React, { useState, useEffect } from "react";
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
  SaveFilled,
  RedoOutlined,
  BorderlessTableOutlined,
  BankOutlined,
  InfoCircleOutlined
} from "@ant-design/icons";

import './css/AddThing.css'


const { RangePicker } = DatePicker;
const { Option } = Select;

const succesAlert = () => {
  return <Alert message="Success Tips" type="success" showIcon />;
};

const AddThing = () => {
  const datas = [
    { id: 1, name: "nathan" },
    { id: 2, name: "john" },
    { id: 3, name: "mayers" },
    { id: 4, name: "law" },
  ];
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

  const [data, updateData] = useState(datas);
  const [serialNum, setSerialNum] = useState("");
  const [groupID, setGroupID] = useState();
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [count, setCount] = useState();
  const [suffix, setSuffix] = useState("");
  const [company, setCompany] = useState("");
  const [form] = Form.useForm();

  const logg = (e) => {
    console.log(e);
  };

  function onChange(value, dateString) {
    // console.log('Selected Time: ', value);
    console.log("Start Time: ", dateString[0]);
    console.log("End Time: ", dateString[1]);
    setStartDate(dateString[0]);
    setEndDate(dateString[1]);
  }

  function onOk(value) {
    console.log("onOk: ", value.Date);
  }

  const layout = {
    labelCol: { span: "50 rem" },
    wrapperCol: { span: "500px" },
    Button: {},
  };
  const onReset = () => {
    form.resetFields();
  };

  useEffect(() => {}, [serialNum, startDate, groupID]);
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
              prefix={<BorderlessTableOutlined />}
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
              placeholder="ประเภท"
              onChange={(e) => {
                logg(e);
                setGroupID(e);
              }}
              style={{ position: "relative", maxWidth: "100%" }}
              allowClear
            >
              {data.map((val) => {
                return <Select.Option value={val.id}>{val.name}</Select.Option>;
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
                <div id="flex-2">{groupID}</div>
              </div>
              <div className="flex-container">
                <div id="flex-1">จำนวน</div>
                <div id="flex-2">{count} {suffix}</div>
              </div>
              <div className="flex-container">
                <div id="flex-1">Start Date</div>
                <div id="flex-2">{startDate}</div>
              </div>
              <div className="flex-container">
                <div id="flex-1">End Date</div>
                <div id="flex-2">{endDate}</div>
              </div>
            </div>
          </Form.Item>

          <Form.Item>
            <button
              className="btn-submit"
              onClick={() => {
                // alert("aaa");
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
                setGroupID();
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
