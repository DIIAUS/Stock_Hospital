import React, { useState, useEffect, useRef } from "react";
import Axios from "axios";
import moment from "moment";
import "./css/AddThing.css";

import GenBarcode from "./GenerateBarcode";
import { useReactToPrint } from "react-to-print";

import {
  Form,
  Input,
  Select,
  DatePicker,
  InputNumber,
  Modal,
  message,
  Collapse,
  Table,
  Tag,
  Switch,
} from "antd";



import {
  SaveFilled,
  CaretRightOutlined,
  BarcodeOutlined,
  BankOutlined,
  InfoCircleOutlined,
  LoadingOutlined,
  BorderlessTableOutlined,
} from "@ant-design/icons";

const { Panel } = Collapse;

const { RangePicker } = DatePicker;

const AddThing = (props) => {
  const [serialNum, setSerialNum] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [count, setCount] = useState();
  const [suffix, setSuffix] = useState("");
  const [company, setCompany] = useState("-");
  const [statusRadio, setStatusRadio] = useState(true);
  const [historyStatus, setHistoryStatus] = useState([]);
  const [umCode, setUmCode] = useState([]);
  const [round, setRound] = useState(0);
  const [allBarcode, setAllBarcode] = useState([]);
  const [numberCode, setNumberCode] = useState();
  const [stateBarcode, setStateBarcode] = useState();
  const [toggle, setToggle] = useState(true);
  const [show, setShow] = useState(true);
  const [kurupanNumber, setKurupanNumber] = useState(null);
  const [idKurupan, setIdKurupan] = useState(0);
  const [form] = Form.useForm();



  // GET Databases
  const [group, setGroup] = useState([]);
  const [type, setType] = useState([]);
  const [unit, setUnit] = useState([]);
  // GET Databases

  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  const genCode = (n) => {
    let arr = [];
    let numberCodes = parseInt(numberCode);

    for (let i = 0; i < n; i++) {
      arr.push(numberCodes++);
      console.log(numberCodes);
    }
    setAllBarcode(arr);
    setStateBarcode(numberCodes);
  };
  // const resetKurupanNumber = ()=>{
  //   setKurupanNumber("0");
  //   console.log(kurupanNumber);
  // };

  const suffixSelector = () => {
    return (
      <Form.Item name="suffix" noStyle>
        <Select
          style={{
            width: 100,
          }}
          onChange={(val) => {
            selectFunc(val, "Unit");
          }}
        >
          {umCode.map((val) => {
            return (
              <Select.Option value={val.UmCode + "*" + val.UnitOfMeasure}>
                {val.UnitOfMeasure}
              </Select.Option>
            );
          })}
        </Select>
      </Form.Item>
    );
  };

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
    return dateTime;
  };

  const get_table = (tablename) => {
    Axios.get(`http://${props.ServerHose}:3001/${tablename}`).then((res) => {
      switch (tablename) {
        case "item_group":
          setGroup(res.data);
          break;
        case "unit_of_measure":
          setUmCode(res.data);
          break;
        case "barcode":
          console.log(res.data[0].code);
          setNumberCode(res.data[0].code);
          break;
      }
    });
  };

  const send_table = (serialNumberParam) => {
    setSerialNum(serialNumberParam);
    Axios.post(`http://${props.ServerHose}:3001/add_item`, {
      SerialNumber: serialNumberParam,
      GroupID: type.GroupID,
      DeviceOfCompany: company,
      Onhand: count,
      UmCode: 1,
      FristDate: timeNow(),
      LastDate: timeNow(),
      ID_Kurupan: idKurupan,
      KurupanNumber: idKurupan ? kurupanNumber : null,

      Date: timeNow(),
      DepartmentID: 0,
      StoreID: 1,
      LocID: 1,
      ToStoreID: 0,
      ToLocID: 0,
      PersonID: 0,
      TypeID: "R",
    }).then((res) => {
      if (res.data == "success") {
        Axios.post(`http://${props.ServerHose}:3001/add_item_transection`, {
          SerialNumber: serialNumberParam,
          GroupID: type.GroupID,
          DeviceOfCompany: company,
          Date: timeNow(),
          DepartmentID: 0,
          StoreID: 1,
          LocID: 1,
          ToStoreID: 0,
          ToLocID: 0,
          PersonID: 0,
          TypeID: "R",
          KurupanNumber: idKurupan ? kurupanNumber : null,
        }).then(() => {
          setHistoryStatus((history) => [
            { SN: serialNumberParam, TP: type.GroupName, OH: count },
            ...history,
          ]);
        });
        form.resetFields();
      }
      progress(res.data);
    });
  };

  const updateBarcodeToTable = () => {
    Axios.post(`http://${props.ServerHose}:3001/sendBarcode`, {
      code: stateBarcode,
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
        message.success("เก็บข้อมูลสำเร็จ", 3);
      } else {
        message.error(value, 5);
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
    setStartDate(dateString[0]);
    setEndDate(dateString[1]);
  }

  const selectFunc = (val, func) => {
    const idx = val.indexOf("*");
    const GroupID = val.slice(0, idx);
    const GroupName = val.slice(idx + 1, val.length);

    switch (func) {
      case "Type":
        setType({ GroupID: GroupID, GroupName: GroupName });
        break;
      case "Unit":
        setUnit({ Umcode: GroupID, UnitOfMeasure: GroupName });
        break;
    }
  };

  const renderInputMN = () => {
    return (
      <Form.Item name="MN">
        <Input
          placeholder="Serial Number"
          prefix={<BarcodeOutlined style={{ fontSize: "1.5rem" }} />}
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
      name="BQ">
        <Input
          placeholder="Serial Number"
          prefix={<BarcodeOutlined style={{ fontSize: "3rem" }} />}
          onChange={(e) => {
            if (e.target.value.length == 13) {
              if (
                company == "" ||
                type.GroupID == null ||
                count == null ||
                count == 0
              ) {
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
              form.resetFields();
              setSerialNum("");
              setSerialNum(e.target.value);
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
            {serialNum}
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
            if (
              serialNum == "" ||
              company == "" ||
              type.GroupID == null ||
              count == null ||
              count == 0
            ) {
              message.error({
                content: "กรอกข้อมูลไม่ครบ",
                style: {
                  marginTop: "2vh",
                },
              });
            } else {
              setSerialNum("");
              send_table(serialNum);
            }
          }}
        >
          {" "}
          <SaveFilled style={{ marginRight: "10px", fontSize: "1.5rem" }} />
          บันทึก
        </button>
      </Form.Item>
    );
  };

  const history_columns = [
    {
      title: "Serial Number",
      dataIndex: "SN",
      align: "center",
      render: (text) => <p style={{ color: "blue" }}>{text}</p>,
    },
    {
      title: "ประเภท",
      dataIndex: "TP",
      align: "center",
      render: (text) => <p style={{ color: "red" }}>{text}</p>,
    },
    {
      title: "จำนวน",
      dataIndex: "OH",
      align: "center",
      render: (text) => (
        <p style={{ color: "black" }}>
          {text} {suffix}
        </p>
      ),
    },
    {
      title: "สถานะ",
      key: "tags",
      dataIndex: "tags",
      render: (tags) => <Tag color="success">รับ</Tag>,
    },
  ];
  useEffect(() => {
    genCode(round);
  }, [round]);

  useEffect(() => {
    get_table("barcode");
  }, [toggle]);

  useEffect(() => {
    props.sendBack("รับอุปกรณ์");
    get_table("item_group");
    get_table("unit_of_measure");
  }, []);

  return (
    <>
      <div className="border-form">
        <Form
          form={form}
          size="defualt"
          className="form-position"
          layout="vertical"
        >
          <Form.Item label="Generate Barcode :">
            <InputNumber
              placeholder="กรอกจำนวน"
              onChange={(val) => {
                setRound(val);
              }}
              style={{ width: "9rem" }}
            />
            <br />
            <button
              type="button"
              className="btn-print-barcode"
              onClick={() => {
                updateBarcodeToTable();
                setToggle(!toggle);
                handlePrint();
              }}
            >
              ออกบาร์โค๊ด
            </button>

            <div style={{ display: "none" }}>
              <GenBarcode ref={componentRef} allBarcode={allBarcode} />
            </div>
          </Form.Item>
          <Form.Item
            // name="cmpn"
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
              }}
              style={{ position: "relative", maxWidth: "100%" }}
            />
          </Form.Item>

          <Form.Item
            label="ประเภท"
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
              addonAfter={suffixSelector()}
              onChange={(val) => {
                setCount(val);
              }}
            />
          </Form.Item>

          <Form.Item
            label="เลขคุรุภัณฑ์"
            rules={[{ required: true, message: "กรอกเลขคุรุภัณฑ์" }]}
          >
            <div style={{ display: "inline-block" }}>
              <Switch
                size="default"
                checkedChildren="มี"
                unCheckedChildren="ไม่มี"
                defaultChecked
                checked={idKurupan}
                onChange={() => {
                  setIdKurupan(!idKurupan);
                  setKurupanNumber(null);
                }}
              ></Switch>

              {idKurupan ? (
                <Input
                  prefix={<BorderlessTableOutlined />}
                  placeholder="กรอกเลขคุรุภัณฑ์"
                  onChange={(val) => {
                    setKurupanNumber(val.target.value);
                  }}
                />
              ) : null}
            </div>
          </Form.Item>

          <Form.Item label="Serial Number">
            <div style={{ display: "block" }}>
              <Switch
                size="default"
                checkedChildren="ใช้บาร์โค๊ด"
                unCheckedChildren="กรอกเลขบาร์โค๊ด"
                defaultChecked
                checked={statusRadio}
                onChange={() => {
                  setStatusRadio(!statusRadio);
                }}
              ></Switch>
            </div>
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
              <div className="flex-container">
                <div id="flex-1">Serial Number</div>
                <div id="flex-2">{serialNum}</div>
              </div>
              {idKurupan ? (
                <div className="flex-container">
                  <div id="flex-1">เลขคุรุภัณฑ์</div>
                  <div id="flex-2">{kurupanNumber}</div>
                </div>
              ) : null}
              <div className="flex-container">
                <div id="flex-1">บริษัท</div>
                <div id="flex-2">{company}</div>
              </div>
              <div className="flex-container">
                <div id="flex-1">ประเภท</div>
                <div id="flex-2">{type.GroupName}</div>
              </div>
              <div className="flex-container">
                <div id="flex-1">จำนวน</div>
                <div id="flex-2">
                  {count} {unit.UnitOfMeasure}
                </div>
              </div>
              <div className="flex-container">
                <div id="flex-1">วันที่รับ</div>
                <div id="flex-2">{timeNow()}</div>
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

export default AddThing;
