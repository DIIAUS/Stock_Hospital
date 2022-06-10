// นำอุปกรณ์ออก หรือ เบิก
import React, { useState, useEffect } from "react";
import Axios from "axios";
import {
  Form,
  Input,
  Select,
  Collapse,
  Table,
  Modal,
  message,
  Tag,
} from "antd";
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
  const [kurupan, setKurupan] = useState("-");
  const [department, setDepartment] = useState({ ID: 0, NAME: "" });
  const [name, setName] = useState({ ID: 0, NAME: "-" });
  const [statusRadio, setStatusRadio] = useState(true);
  const [historyStatus, setHistoryStatus] = useState([]);
  const [displaySN, setDisplaySN] = useState("");
  const [form] = Form.useForm();

  // DATABASE
  const [item, setItem] = useState([]);
  const [item_group, setItem_group] = useState([]);
  const [onhandList, setOnhandList] = useState([]);
  const [departmentList, setDepartmentList] = useState([]);
  const [personList, setPersonList] = useState([]);
  // DATABASE

  const timeNow = () => {
    var today = new Date();
    var date =
      today.getFullYear() +
      "-" +
      (today.getMonth() + 1) +
      "-" +
      today.getDate();
    var time =
      today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    var dateTime = date + " " + time;
    console.log(dateTime);
    return dateTime;
  };

  useEffect(() => {
    get_table("onhand");
  }, [department]);

  useEffect(() => {
    get_table("onhand");
    get_table("item");
    get_table("item_group");
    get_table("department");
    get_table("person");
    props.sendBack("เบิกอุปกรณ์");
  }, []);

  const get_table = (tablename) => {
    Axios.get(`http://${props.ServerHose}:3001/${tablename}`).then((res) => {
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

  const send_table = (serialNumberParam) => {
    setSerialNum(serialNumberParam);
    setKurupan(kurupan);
    Axios.post(`http://${props.ServerHose}:3001/send_item`, {
      SerialNumber: serialNumberParam,
    }).then((res) => {
      console.log(res.data[0]);
      // console.log(res.data);
      if (res.data[0]) {
        Axios.post(`http://${props.ServerHose}:3001/out_item`, {
          SerialNumber: res.data[0].SerialNumber,
        }).then((res) => {
          progress(res.data);
        });

        Axios.post(`http://${props.ServerHose}:3001/out_item_transection`, {
          SerialNumber: res.data[0].SerialNumber,
          KurupanNumber: kurupan,
          GroupID: res.data[0].GroupID,
          DeviceOfCompany: res.data[0].DeviceOfCompany,
          Date: timeNow(),
          DepartmentID: department.ID,
          StoreID: 1,
          LocID: 1,
          ToStoreID: 0,
          ToLocID: 0,
          PersonID: name.ID,
          TypeID: "W",
        }).then(() => {
          setHistoryStatus((history) => [
            { SN: res.data[0].SerialNumber, KRP: kurupan },
            ...history,
          ]);
          setKurupan("-");
          setSerialNum("");
        });
      } else {
        message.error("ไม่มี Serial Number นี้ !!!!!");
      }
    });
  };



  const progress = (value) => {
    let TIME = 1;
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
        message.success("เก็บข้อมูลสำเร็จ", 3);
        form.resetFields();
      } else {
        console.log("YES VALUE IS :", value);
        message.error(value, 5);
      }
    }, TIME * 1000);
  };

  const selectFunc = (val, func) => {
    const idx = val.indexOf("*");
    const id = val.slice(0, idx);
    const name = val.slice(idx + 1, val.length);

    switch (func) {
      case "DEPART":
        setDepartment({ ID: id, NAME: name });
        break;
      case "PERSON":
        setName({ ID: id, NAME: name });
        break;
    }
  };

  const renderInputMN = () => {
    return (
      <Form.Item name="MN" label="กรอกข้อมูล">
        <Input
          placeholder="Serial Number"
          prefix={<BarcodeOutlined style={{ fontSize: "3rem" }} />}
          onChange={(e) => {
            setSerialNum(e.target.value);
          }}
          autoFocus={true}
          style={{ position: "relative", maxWidth: "100%" }}
        />
      </Form.Item>
    );
  };

  const renderInputBQ = () => {
    return (
      <Form.Item
        name="bq"
        label="Barcode"
        // rules={[{ required: true, message: "แสกน Barcode เท่านั้น !!!" }]}
      >
        <Input
          placeholder="Serial Number"
          prefix={<BarcodeOutlined style={{ fontSize: "3rem" }} />}
          onChange={(e) => {
            if (e.target.value.length == 13) {
              if ( department.NAME == "" || name.NAME == "") {
                message.error({
                  content: "กรอกข้อมูลไม่ครบ",
                  style: {
                    marginTop: "2vh",
                  },
                });
              } else {
                setSerialNum("");
                send_table(e.target.value);
              }
              setDisplaySN(e.target.value);
              form.resetFields();
            }
          }}
          // onKeyDown={onKeyPressBarcode}
          autoFocus={true}
          style={{ position: "relative", maxWidth: "4.5rem" }}
        />
        {
          <p
            style={{
              position: "relative",
              background: "",
              fontSize: "1.2rem",
              color: "black",
              width: "auto",
              padding: "0 0px",
              display: "inline-block",
              top: 15,
              left: 15,
            }}
          >
            {displaySN}
          </p>
        }
      </Form.Item>
    );
  };

  const SaveButton = () => {
    return (
      <Form.Item>
        <button
          className="take-out-btn-submit"
          onClick={() => {
            if (kurupan == "" || department.NAME == "" || name.NAME == "") {
              message.error({
                content: "กรอกข้อมูลไม่ครบ",
                style: {
                  marginTop: "2vh",
                },
              });
            } else {
              setSerialNum("");
              setKurupan("");
              send_table(serialNum);
            }
          }}
        >
          {" "}
          <SaveOutlined /> บันทึก
        </button>
      </Form.Item>
    );
  };

  const columns = [
    {
      title: "GroupName",
      dataIndex: "GroupName",
      align: "center",
      render: (text) => <Tag color="geekblue">{text}</Tag>
    },
    {
      title: "Onhand",
      className: "column-sum",
      dataIndex: "Onhand",
      align: "center",
      render: (text) => <Tag color="volcano">{text}</Tag>
    },
  ];

  const history_columns = [
    {
      title: "Serial Number",
      dataIndex: "SN",
      align: "center",
      render: (text) => <p style={{ color: "blue" }}>{text}</p>,
    },
    {
      title: "เลขคุรุภัณฑ์",
      dataIndex: "KRP",
      align: "center",
      render: (text) => <p style={{ color: "red" }}>{text} </p>,
    },
    {
      title: "สถานะ",
      key: "tags",
      dataIndex: "tags",
      render: (tags) => <Tag color="error">เบิก</Tag>,
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
        {/* INPUTFORM */}
        <Form
          layout="vertical"
          form={form}
          size="defualt"
          className="form-position"
        >
          <Form.Item
            label="นำไปใช้แผนก"
            tooltip={{
              title: "แผนกปลายทางที่ต้องการนำไปใช้",
              icon: <InfoCircleOutlined />,
            }}
          >
            <Select
              placeholder="เลือกแผนกที่นำไปใช้"
              onChange={(val) => {
                selectFunc(val, "DEPART");
              }}
            >
              {departmentList.map((value) => {
                return (
                  <Select.Option
                    value={value.DepartmentID + "*" + value.DepartmentName}
                  >
                    {" "}
                    {value.DepartmentName}{" "}
                  </Select.Option>
                );
              })}
            </Select>
          </Form.Item>

          <Form.Item
            label="ชื่อคนเบิก"
            tooltip={{
              title: "ชื่อผู้เบิกอุปกรณ์",
              icon: <InfoCircleOutlined />,
            }}
          >
            <Select
              placeholder="เลือกผู้เบิกอุปกรณ์"
              onChange={(val) => {
                selectFunc(val, "PERSON");
              }}
            >
              {personList.map((value) => {
                return (
                  <Select.Option
                    value={
                      value.Id + "*" + value.FristName + " " + value.LastName
                    }
                  >
                    {" "}
                    {value.FristName} {value.LastName}
                  </Select.Option>
                );
              })}
            </Select>
          </Form.Item>

          {/*INPUTKURUPAN*/}
          <Form.Item
            
            label="เลขคุรุภัณฑ์"
            tooltip={{
              title: "ex: 121212",
              icon: <InfoCircleOutlined />,
            }}
          >
            <Input
              prefix={<BorderlessTableOutlined />}
              placeholder="เลขคุรุภัณฑ์"
              onChange={(e) => {
                setKurupan(e.target.value);
              }}
            />
          </Form.Item>

          <Form.Item label="Serial Number">
            <button
              style={
                statusRadio
                  ? {
                      background: "#000",
                      color: "white",
                      width: "6rem",
                      fontSize: "1.2rem",
                    }
                  : { background: "gray" }
              }
              onClick={(onChange) => {
                setStatusRadio(true);
                setSerialNum("");
                form.resetFields();
              }}
            >
              แสกน
            </button>
            <button
              style={
                statusRadio
                  ? { background: "gray" }
                  : {
                      background: "#000",
                      color: "white",
                      width: "6rem",
                      fontSize: "1.2rem",
                    }
              }
              onClick={(onChange) => {
                setStatusRadio(false);
                setSerialNum("");
                // form.resetFields();
              }}
            >
              กรอก
            </button>
          </Form.Item>

          {statusRadio ? renderInputBQ() : renderInputMN()}

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
              {statusRadio ? null : (
                <div className="flex-container">
                  <div id="flex-1">Serial Number</div>
                  <div id="flex-2">{serialNum}</div>
                </div>
              )}

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
          {statusRadio ? null : SaveButton()}
        </Form>

        <Collapse
          bordered={false}
          // defaultActiveKey={["1"]}
          expandIcon={({ isActive }) => (
            <CaretRightOutlined rotate={isActive ? 90 : 0} />
          )}
          className="site-collapse-custom-collapse"
          style={{
            marginBottom: "2%",
            border: "1px dotted black",
            marginTop: "10%",
          }}
        >
          <Panel
            header="ประวัติการทำรายการ"
            key="1"
            className="site-collapse-custom-panel"
          >
            <Table
              columns={history_columns}
              dataSource={historyStatus}
              bordered
              scroll={{ y: 200 }}
            />
          </Panel>
        </Collapse>
      </div>
    </>
  );
};

export default TakeOut;
