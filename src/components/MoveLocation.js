import React, { useState, useEffect } from "react";
import Axios from "axios";
import {
  Modal,
  Form,
  Input,
  Select,
  message,
  Collapse,
  Table,
  Tag,
} from "antd";

import {
  SaveOutlined,
  BarcodeOutlined,
  InfoCircleOutlined,
  LoadingOutlined,
  CaretRightOutlined,
} from "@ant-design/icons";

const { Panel } = Collapse;

const MoveLocation = (props) => {
  const [serialNum, setSerialNum] = useState("");
  const [store, setStore] = useState({});
  const [targetStore, setTargetStore] = useState({});
  const [historyStatus, setHistoryStatus] = useState([]);
  const [statusRadio, setStatusRadio] = useState(true);
  const [displaySN, setDisplaySN] = useState("");
  const [form] = Form.useForm();

  //Database
  const [tableStore, setTableStore] = useState([]);
  const [tableTarget, setTableTarget] = useState([]);
  const [obj, setObj] = useState({});
  //Database

  const get_table = (tablename) => {
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

  const send_table = (serialNumberParam) => {
    setSerialNum(serialNumberParam);
    Axios.post("http://localhost:3001/send_item", {
      SerialNumber: serialNumberParam,
    }).then((res) => {
      console.log(res.data[0]);
      if (res.data[0]) {
        Axios.post("http://localhost:3001/move_loc", {
          SerialNumber: serialNumberParam,
          ToStoreID: store.StoreID,
          ToLocID: targetStore.LocID,
          GroupID: res.data[0].GroupID,
          Date: timeNow(),
        }).then((res) => {
          progress(res.data);
          setHistoryStatus((history) => [
            {
              SN: serialNumberParam,
              STR: store.StoreName,
              PLS: targetStore.LocName,
            },
            ...history,
          ]);
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
        setSerialNum("");
      } else {
        console.log("YES VALUE IS :", value);
        message.error(value, 5);
      }
    }, TIME * 1000);
  };

  const setEmptyState = () => {
    setSerialNum("");
    setStore({});
    setTargetStore({});
  };

  const selectFunc = (val, func) => {
    const idx = val.indexOf("*");
    const id = val.slice(0, idx);
    const name = val.slice(idx + 1, val.length);

    switch (func) {
      case "store":
        setStore({ StoreID: id, StoreName: name });
        break;
      case "location":
        setTargetStore({ LocID: id, LocName: name });
        break;
    }
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
              if (store.StoreName == null || targetStore.LocName == null) {
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
            if (
              serialNum == "" ||
              store.StoreName == null ||
              targetStore.LocName == null
            ) {
              message.error({
                content: "กรอกข้อมูลไม่ครบ",
                style: {
                  marginTop: "2vh",
                },
              });
            } else {
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

  const history_columns = [
    {
      title: "Serial Number",
      dataIndex: "SN",
      align: "center",
      render: (text) => <p style={{ color: "blue" }}>{text}</p>,
    },
    {
      title: "คลังสินค้า (ใหม่)",
      dataIndex: "STR",
      align: "center",
      render: (text) => <p style={{ color: "red" }}>{text} </p>,
    },
    {
      title: "ที่เก็บ (ใหม่)",
      dataIndex: "PLS",
      align: "center",
      render: (text) => <p style={{ color: "red" }}>{text} </p>,
    },
    {
      title: "สถานะ",
      key: "tags",
      dataIndex: "tags",
      render: (tags) => <Tag color="gold">ย้ายที่เก็บ</Tag>,
    },
  ];

  useEffect(() => {
    props.sendBack("เคลื่อนย้ายอุปกรณ์");
    get_table("store");
    get_table("location");
  }, []);
  return (
    <>
      <div className="border-form">
        <Form
          layout="vertical"
          form={form}
          size="defualt"
          className="form-position"
        >
          <Form.Item
            label="คลังสินค้า"
          >
            <Select
              placeholder="เลือกคลัง"
              onChange={(val) => {
                selectFunc(val, "store");
              }}
            >
              {tableStore.map((value) => {
                return (
                  <Select.Option value={value.StoreID + "*" + value.StoreName}>
                    {" "}
                    {value.StoreName}{" "}
                  </Select.Option>
                );
              })}
            </Select>
          </Form.Item>

          <Form.Item
            label="ที่เก็บ"
          >
            <Select
              placeholder="เลือกที่เก็บ"
              onChange={(val) => {
                selectFunc(val, "location");
              }}
            >
              {tableTarget.map((value) => {
                return (
                  <Select.Option value={value.LocID + "*" + value.LocName}>
                    {" "}
                    {value.LocName}{" "}
                  </Select.Option>
                );
              })}
            </Select>
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
                <div id="flex-1">คลังสินค้า</div>
                <div id="flex-2">{store.StoreName}</div>
              </div>
              <div className="flex-container">
                <div id="flex-1">ที่เก็บ</div>
                <div id="flex-2">{targetStore.LocName}</div>
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
            marginTop: "8%",
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

export default MoveLocation;
