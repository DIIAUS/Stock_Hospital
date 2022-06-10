import React, { useState, useEffect } from "react";
import {
  Steps,
  Form,
  Input,
  Button,
  Select,
  DatePicker,
  List,
  message,
  Card,
  Tag,
} from "antd";

import {
  LoadingOutlined,
  SmileOutlined,
  SolutionOutlined,
  UserOutlined,
} from "@ant-design/icons";
import moment from "moment";
import Axios from "axios";

const { Step } = Steps;
const { Option } = Select;

const Loan = (props) => {
  const [kurupanNumber, setKurupanNumber] = useState("");
  const [name, setName] = useState("");
  const [department, setDepartment] = useState("");
  const [date, setDate] = useState("");
  const [toggle ,updateToggle] = useState(false);

  const [departmentList, setDepartmentList] = useState([]);
  const [loanItem, setLoanItem] = useState([]);
  const [form] = Form.useForm();
  const StyleSheet = {
    BorderCss: { border: "0px solid black", padding: "20px 50px" },
    DivCss: { border: "1px solid black" },
    TitleSty: { borderBottom: "1px dotted black", fontWeight: "bold" },
  };

  const get_table = (tablename) => {
    Axios.get(`http://${props.ServerHose}:3001/${tablename}`).then((res) => {
      switch (tablename) {
        case "department":
          setDepartmentList(res.data);
          break;
        case "loan_Item":
          setLoanItem(res.data);
          break;
      }
    });
  };

  const send_table = () => {
    Axios.post(`http://${props.ServerHose}:3001/sendLoan`, {
      KurupanNumber: kurupanNumber,
      Name: name,
      Department: department,
      Date: date,
    }).then((res) => {
      if (res.data === "success") {
        message.success('บันทึกข้อมูลสำเร็จ',2);
        return form.resetFields();
      } else {
        message.error('หมายเลขคุรุภัณฑ์นี้ถูกยืมไปแล้ว',2);
      }
    });
  };

  const returnItem=(KurupanNumber)=>{
    Axios.post(`http://${props.ServerHose}:3001/returnItem`, {
      KurupanNumber: KurupanNumber,
    }).then((res) => {
      if (res.data === "success") {
        message.success('ส่งคืนเรียบร้อย',2);
        updateToggle(!toggle);
      } else {
        alert("ไม่สำเร็จ");
      }
    });

  }

  function onChanges(value, dateString) {
    setDate(dateString);
  }

  useEffect(() => {
    props.sendBack("ยืม/คืน อุปกรณ์");
    get_table("department");
    get_table("loan_Item");
  }, []);

  useEffect(()=>{
    get_table("loan_Item");
  },[toggle])

  return (
    <div>
      <div class="flex-container" style={StyleSheet.DivCss}>
        <div class="flex-item-left">
          <p style={StyleSheet.TitleSty}>ยืม</p>
          <div style={StyleSheet.BorderCss}>
            <Form layout="vertical" form={form}>
              <Form.Item
                name="kurupan"
                label="หมายเลขคุรุภัณฑ์ : "
                rules={[
                  {
                    required: true,
                    message: "Please input Kurupan",
                  },
                ]}
              >
                <Input
                  placeholder="Kurupan"
                  onChange={(e) => setKurupanNumber(e.target.value)}
                />
              </Form.Item>
              <Form.Item
                name="name"
                label="ชื่อผู้ยืม : "
                rules={[
                  {
                    required: true,
                    message: "Please input name",
                  },
                ]}
              >
                <Input
                  placeholder="input name"
                  onChange={(e) => setName(e.target.value)}
                />
              </Form.Item>

              <Form.Item
                name="depart"
                label="แผนกที่ยืม : "
                rules={[
                  {
                    required: true,
                    message: "Please input Department",
                  },
                ]}
              >
                <Select
                  showSearch
                  style={{
                    width: "100%",
                    textAlign: "left",
                  }}
                  placeholder="Search to Select"
                  optionFilterProp="children"
                  filterOption={(input, option) =>
                    option.children.includes(input)
                  }
                  filterSort={(optionA, optionB) =>
                    optionA.children
                      .toLowerCase()
                      .localeCompare(optionB.children.toLowerCase())
                  }
                  onChange={(val) => setDepartment(val)}
                >
                  {departmentList.map((val) => {
                    return (
                      <Option value={val.DepartmentID}>
                        {val.DepartmentName}
                      </Option>
                    );
                  })}
                </Select>
              </Form.Item>

              <Form.Item
                name="datetime"
                rules={[
                  {
                    required: true,
                    message: "Please input Date",
                  },
                ]}
                label="วัน/เวลาที่ยืม :"
              >
                <DatePicker
                  style={{ width: "100%" }}
                  format="YYYY-MM-DD HH:mm:ss"
                  showTime={{
                    defaultValue: moment("00:00:00", "HH:mm:ss"),
                  }}
                  onChange={onChanges}
                />
              </Form.Item>

              <Form.Item shouldUpdate>
                {() => (
                  <Button
                    type="primary"
                    htmlType="submit"
                    disabled={
                      !form.isFieldsTouched(true) ||
                      !!form
                        .getFieldsError()
                        .filter(({ errors }) => errors.length).length
                    }
                    onClick={() => {
                      console.log(date, name, department);
                      send_table();
                      updateToggle(!toggle)
                    }}
                  >
                    Save
                  </Button>
                )}
              </Form.Item>
            </Form>
          </div>
        </div>
        <div class="flex-item-right" style={{background: "white"}}>
          <List
            itemLayout="vertical"
            size="small"
            pagination={{
              onChange: (page) => {
                console.log(page);
              },
              pageSize: 2,
              position: "top"
            }}
            dataSource={loanItem}
            renderItem={(item) => (
              <Card
                hoverable
                style={{
                  width: "100%",
                  marginBottom: "1%",
                  border: "1px dotted gray",
                  marginTop: "1%"
                }}
              >
                <div style={{background:"#e6e5e3" , color:"black"}}>{item.KurupanNumber}</div>
                <List.Item key={item.title} extra={<a onClick={()=>{returnItem(item.KurupanNumber)}}>คืนของ</a>}>
                  <List.Item.Meta
                    avatar={
                     <>ข้อมูล :</>
                    }
                    description={
                      <div style={{ textAlign: "left" }}>
                        <Tag color="purple">{item.KurupanNumber}</Tag>
                        <Tag color="green">{item.DepartmentName}</Tag>
                        <Tag color="gold">{item.Name}</Tag>
                      </div>
                    }
                  />

                  <List.Item.Meta
                    description={
                      <div>
                        <Steps current={item.Status}>
                          <Step
                            title="ยืม"
                            // description={`วันที่ยืม ${item.LoanDate.slice(0,10)}`}
                            description={
                            <div>
                              <div>
                                <p>{"วันที่ยืม "}{item.LoanDate.slice(0,10)}</p>
                              </div>
                            </div>}
                            icon={<SolutionOutlined />}
                          />
                          <Step
                            title="กำลังใช้งาน"
                            description={<Tag color="red">{item.DepartmentName}</Tag>}
                            icon={<LoadingOutlined />}
                          />
                          
                        </Steps>
                      </div>
                    }
                  />
                </List.Item>
              </Card>
            )}
          />
        </div>
      </div>
    </div>
  );
};
export default Loan;
