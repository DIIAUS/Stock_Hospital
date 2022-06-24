import React, { useEffect, useState } from "react";
import Axios from "axios";
import { Table, Tag, Input, Form, Drawer, Button ,message} from "antd";

const KurupanCheck = (props) => {
  const [Record, setRecord] = useState({});
  const [outsideRecord, setOutsideRecord] = useState({});

  const [group, setGroup] = useState([]);
  const [inside, setInside] = useState([]);
  const [outsideData, setOutsideData] = useState([]);
  const [insideData, setInsideData] = useState([]);
  const [reload, setReload] = useState(false);
  const [onhandList, setOnhandList] = useState([]);
  const [visibleOutside, setVisibleOutside] = useState(false);
  const [visible, setVisible] = useState(false);
  const [KurupanNumber, setKurupanNumber] = useState("");
  const [departmentList, setDepartmentList] = useState([]);

  const [reloadOusideTable, setReloadOusideTable] = useState(false);
  const [form] = Form.useForm();

  const updateTableInside = (values, serialNum, inside = true) => {
    console.log("Success:", values);
    console.log("SN:", serialNum);
    if (inside) {
      Axios.post(`http://${props.ServerHose}:3001/InsidekuruUpadate`, {
        KurupanNumber: values,
        SerialNumber: serialNum,
      }).then((response) => {
        if (response.data == "success") {
          message.success('อัพเดทคุรุภัณฑ์สำเร็จ',5);
          setReload(!reload);
          setVisible(false);
        } else {
          message.error('อัพเดทคุรุภัณฑ์ไม่สำเร็จ',5);
 
        }
      });
    } else {
      Axios.post(`http://${props.ServerHose}:3001/OutsidekuruUpadate`, {
        KurupanNumber: values,
        SerialNumber: serialNum,
      }).then((response) => {
        if (response.data == "success") {
          message.success('อัพเดทคุรุภัณฑ์สำเร็จ',5);
          setReloadOusideTable(!reloadOusideTable);
          setVisibleOutside(false);
        } else {
          message.error('อัพเดทคุรุภัณฑ์ไม่สำเร็จ',5);
        }
      });
    }
  };

  const get_table = (tablename) => {
    Axios.get(`http://${props.ServerHose}:3001/${tablename}`).then((res) => {
      switch (tablename) {
        case "item_group":
          setGroup(res.data);
          break;

        case "updateKurupan":
          setInsideData(res.data);
          break;

        case "onhand":
          setOnhandList(res.data);
          break;

        case "getOutsideKurupan":
          setOutsideData(res.data);
          break;
        case "department":
          setDepartmentList(res.data);
          break;
      }
    });
  };

  const inSideStoreColumn = [
    {
      title: "Serial Number",
      align: "center",
      dataIndex: "SerialNumber",
      render: (text) => <Tag color="gray">{text}</Tag>,
    },
    {
      title: "ประเภท",
      align: "center",
      dataIndex: "GroupName",
      filters: onhandList.map((e) => {
        return { text: e.GroupName, value: e.GroupName };
      }),
      onFilter: (value, record) => record.GroupName.indexOf(value) === 0,
      render: (text) => <Tag color="#f50">{text}</Tag>,
    },
    {
      align: "center",
      width: "30%",
      fixed: "right",
      render: (text, record) => (
        <a
          onClick={() => {
            setVisible(true);
            setRecord({ sn: record.SerialNumber, type: record.GroupName });
          }}
        >
          เพิ่มคุรุภัณฑ์
        </a>
      ),
    },
  ];

  const outSideStoreColumn = [
    {
      title: "Serial Number",
      dataIndex: "SerialNumber",
      width: "30%",
      align: "center",
      render: (text) => <Tag color="gray">{text}</Tag>,
    },
    {
      title: "ประเภท",
      dataIndex: "GroupName",
      align: "center",
      width: "30%",
      filters: group.map((e) => {
        return { text: e.GroupName, value: e.GroupName };
      }),
      onFilter: (value, record) => record.GroupName.indexOf(value) === 0,
      render: (text) => <Tag color="#f50">{text}</Tag>,
    },
    {
      title: "สถานที่",
      dataIndex: "DepartmentName",
      width: "30%",
      align: "center",
      filters: departmentList.map((e) => {
        return { text: e.DepartmentName, value: e.DepartmentName };
      }),
      onFilter: (value, record) => record.DepartmentName.indexOf(value) === 0,
      render: (text) => <Tag>{text}</Tag>,
    },
    {
      title: "",
      align: "center",
      width: "20%",
      fixed: "right",
      render: (text, record) => (
        <a
          onClick={() => {
            setVisibleOutside(true);
            setOutsideRecord({
              sn: record.SerialNumber,
              type: record.GroupName,
              place: record.DepartmentName,
            });
          }}
        >
          เพิ่มคุรุภัณฑ์
        </a>
      ),
    },
  ];

  useEffect(() => {
    get_table("item_group");
    get_table("updateKurupan");
    get_table("onhand");
    get_table("getOutsideKurupan");
    get_table("department");
    props.sendBack("อัพเดทคุรุภัณฑ์");
  }, []);

  useEffect(() => {
    get_table("updateKurupan");
  }, [reload]);

  useEffect(() => {
    get_table("getOutsideKurupan");
  }, [reloadOusideTable]);
  return (
    <>
      <div style={{padding: "0 10%"}}>
        <div style={{border: "1px solid black"}}>
          <div className="flex-item-center">
            <p id="title-report" style={{ textAlign: "center" }}>
              ในคลัง
            </p>
            <Table
              columns={inSideStoreColumn}
              dataSource={insideData}
              scroll={{ x: 320, y: 500 }}
            />
          </div>
        </div>
        
        <div style={{border: "1px solid black", marginTop: "1%"}}>
          <div className="flex-item-center">
            <p id="title-report" style={{ textAlign: "center" }}>
              จ่ายออกไปแล้ว
            </p>
            <Table
              columns={outSideStoreColumn}
              dataSource={outsideData}
              scroll={{ x: 450, y: 500 }}
              style={{ borderBottom: "3px dotted black" }}
            />
          </div>
        </div>
        
        <Drawer
          title="อัพเดทเลขคุรุภัณฑ์"
          placement="right"
          visible={visible}
          onClose={() => setVisible(false)}
        >
          <span style={{}}>
            <h1
              style={{ textAlign: "center", background: "black", color: "white" }}
            >
              คลัง
            </h1>
            <div
              style={{
                textAlign: "center",
                border: "3px dotted black",
                padding: "20px",
                marginBottom: "20px",
              }}
            >
              <h2 style={{ fontWeight: "bold" }}>{Record.sn}</h2>
              <h2>{Record.type}</h2>
              <h2 style={{ color: "green" }}>{KurupanNumber}</h2>
            </div>
            <div>
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
                        updateTableInside(KurupanNumber, Record.sn);
                      }}
                    >
                      อัพเดท
                    </Button>
                  )}
                </Form.Item>
              </Form>
            </div>
          </span>
        </Drawer>
        
        <Drawer
          title="อัพเดทเลขคุรุภัณฑ์"
          placement="right"
          visible={visibleOutside}
          onClose={() => setVisibleOutside(false)}
        >
          <span style={{}}>
            <h1
              style={{ textAlign: "center", background: "black", color: "white" }}
            >
              {outsideRecord.place}
            </h1>
            <div
              style={{
                textAlign: "center",
                border: "3px dotted black",
                padding: "20px",
                marginBottom: "20px",
              }}
            >
              <h2 style={{ fontWeight: "bold" }}>{outsideRecord.sn}</h2>
              <h2>{outsideRecord.type}</h2>
              <h2 style={{ color: "green" }}>{KurupanNumber}</h2>
            </div>
            <div>
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
                        updateTableInside(KurupanNumber, outsideRecord.sn, false);
                      }}
                    >
                      อัพเดท
                    </Button>
                  )}
                </Form.Item>
              </Form>
            </div>
          </span>
        </Drawer>
      </div>
    </>
  );
};

export default KurupanCheck;
