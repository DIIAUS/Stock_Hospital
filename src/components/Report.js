import React, { useState, useEffect } from "react";
import Axios from "axios";
import { Table ,Tag, Anchor} from "antd";
import "./css/Report.css";


const { Link } = Anchor;

const Report = (props) => {
  const [onhandList, setOnhandList] = useState([]);
  const [transectionWithdaw, setTransectionWithdaw] = useState([]);
  const [transectionDeposit, setTransectionDeposit] = useState([]);
  const [transectionMove, setTransectionMove] = useState([]);
  const [allItem, setAllItem] = useState([]);

  const get_table = (tablename) => {
    Axios.get(`http://localhost:3001/${tablename}`).then((res) => {
      switch (tablename) {
        case "onhand":
          setOnhandList(res.data);
          break;

        case "tansection_withdraw":
          setTransectionWithdaw(res.data);
          break;

        case "all_item":
          setAllItem(res.data);
          break;

        case "transection_deposit":
          setTransectionDeposit(res.data);
          break;

        case "transection_move":
          setTransectionMove(res.data);
          break;

        case "":
      }
    });
  };

  const columns = [
    {
      title: "อุปกรณ์",
      dataIndex: "GroupName",
      align: "center",
      render: (text) => <Tag color="blue">{text}</Tag>
    },
    {
      title: "จำนวน",
      className: "column-sum",
      dataIndex: "Onhand",
      align: "center",
      render: (text) => <Tag color="red">{text}</Tag>
    },
  ];

  const allItemColumn = [
    {
      title: "Serial Number",
      dataIndex: "SerialNumber",
      align: "center",
      fixed: "left",
      width: "2%",
      render: (text) => <Tag color="blue">{text}</Tag>
    },
    {
      title: "ประเภท",
      dataIndex: "GroupName",
      align: "center",
      width: "2%",
      filters: onhandList.map((e) => {
        console.log(e.GroupName);
        return { text: e.GroupName, value: e.GroupName };
      }),
      onFilter: (value, record) => record.GroupName.indexOf(value) === 0,
      render: (text) => <Tag color="cyan">{text}</Tag>
    },
    {
      title: "รับจากบริษัท",
      dataIndex: "DeviceOfCompany",
      align: "center",
      width: "4%",
      render: (text) => <Tag color="orange">{text}</Tag>
    },
    {
      title: "จำนวน",
      dataIndex: "onhand",
      align: "center",
      width: "1%",
      render: (text) => <Tag color="#f50">{text}</Tag>
    },
  ];

  const depositColumn = [
    {
      title: "Serial Number",
      dataIndex: "SerialNumber",
      align: "center",
      fixed: "left",
      width: "4%",
      render: (text) => <Tag color="blue">{text}</Tag>
    },
    {
      title: "",
      className: "column-sum",
      dataIndex: "TypeID",
      align: "center",
      width: "2%",
      render: (text) => <Tag color="green">{text}</Tag>
    },

    {
      title: "วัน/เดือน/ปี ที่เบิก",
      className: "column-sum",
      dataIndex: "Date",
      align: "center",
      width: "6%",
      render: (text) => <Tag color="volcano">{text}</Tag>
    },
    {
      title: "ประเภทอุปกรณ์",
      className: "column-sum",
      dataIndex: "GroupName",
      align: "center",
      width: "3%",
      render: (text) => <Tag color="cyan">{text}</Tag>
    },
    {
      title: "บริษัท",
      className: "column-sum",
      dataIndex: "DeviceOfCompany",
      align: "center",
      width: "4%",

      render: (text) => <Tag color="orange">{text}</Tag>
    },

    {
      title: "สถานที่",
      className: "column-sum",
      dataIndex: "StoreName",
      align: "center",
      width: "4%",

      render: (text) => <Tag color="geekblue">{text}</Tag>
    },

    {
      title: "คลัง",
      className: "column-sum",
      dataIndex: "LocName",
      align: "center",
      width: "3%",

      render: (text) => <Tag color="purple">{text}</Tag>
    },
  ];

  const withDrawColumns = [
    {
      title: "Serial Number",
      dataIndex: "SerialNumber",
      align: "center",
      fixed: "left",
      width: "5%",
      render: (text) => <Tag color="blue">{text}</Tag>
    },
    {
      title: "หมายเลขคุรุภัณฑ์",
      className: "column-sum",
      dataIndex: "KurupanNumber",
      align: "center",
      width: "5%",
      render: (text) => <Tag color="purple">{text}</Tag>
    },
    {
      title: "",
      className: "column-sum",
      dataIndex: "TypeID",
      align: "center",
      width: "2%",
      render: (text) => <Tag color="red">{text}</Tag>
    },
    {
      title: "สถานที่นำไปใช้",
      className: "column-sum",
      dataIndex: "DepartmentName",
      align: "center",
      width: "6%",
      render: (text) => <Tag color="geekblue">{text}</Tag>
    },
    {
      title: "วัน/เดือน/ปี ที่เบิก",
      className: "column-sum",
      dataIndex: "Date",
      align: "center",
      width: "7%",
      render: (text) => <Tag color="volcano">{text}</Tag>
    },
    {
      title: "ประเภทอุปกรณ์",
      className: "column-sum",
      dataIndex: "GroupName",
      align: "center",
      width: "5%",
      render: (text) => <Tag color="orange">{text}</Tag>
    },
    {
      title: "ชื่อ-ผู้เบิก",
      className: "column-sum",
      dataIndex: "FristName",
      align: "center",
      width: "4%",

      render: (text) => <p style={{ color: "#000" }}>{text}</p>,
    },

    {
      title: "สกุล-ผู้เบิก",
      className: "column-sum",
      dataIndex: "LastName",
      align: "center",
      width: "4%",

      render: (text) => <p style={{ color: "#000" }}>{text}</p>,
    },
  ];

  const moveColumns = [
    {
      title: "Serial Number",
      className: "column-sum",
      dataIndex: "SerialNumber",
      align: "center",
      width: "3%",
      fixed: "left",
      render: (text) => <Tag color="blue">{text}</Tag>
    },
    {
      title: "",
      className: "column-sum",
      dataIndex: "TypeID",
      align: "center",
      width: "3%",
      render: (text) => <Tag color="magenta">{text}</Tag>
    },
    {
      title: "วัน/เดือน/ปี ที่เคลื่อนย้าย",
      className: "column-sum",
      dataIndex: "Date",
      align: "center",
      width: "3%",
      render: (text) => <Tag color="volcano">{text}</Tag>
    },
    {
      title: "ประเภทอุปกรณ์",
      className: "column-sum",
      dataIndex: "GroupName",
      align: "center",
      width: "3%",
      render: (text) => <Tag color="cyan">{text}</Tag>
    },
    {
      title: "สถานที่",
      className: "column-sum",
      dataIndex: "StoreName",
      align: "center",
      width: "3%",
      render: (text) => <Tag color="geekblue">{text}</Tag>
    },
    {
      title: "ที่เก็บ",
      className: "column-sum",
      dataIndex: "LocName",
      align: "center",
      width: "3%",
      render: (text) => <Tag color="purple">{text}</Tag>
    },
  ];

  useEffect(() => {
    get_table("onhand");
    get_table("tansection_withdraw");
    get_table("all_item");
    get_table("transection_deposit");
    get_table("transection_move");
    props.sendBack("รายงาน");
  }, []);

  return (
    <>
      <div className="anchor" >
        <a href="#out">ประวัติการเบิกอุปกรณ์</a>
        <a href="#in">ประวัติการรับอุปกรณ์</a>
        <a href="#move">ประวัติการเคลื่อนย้ายอุปกรณ์</a>
      </div>
      <div className="border-report-form">
        <div
          class="flex-container"
          style={{ borderBottom: "3px dotted black" }}
        >
          <div class="flex-item-left">
            <h3>Onhand</h3>
            <Table
              columns={columns}
              dataSource={onhandList}
              bordered
              scroll={{ y: 500 }}
            />
          </div>
          <div class="flex-item-right">
            <h3>อุปกรณ์ทั้งหมด</h3>
            <Table
              columns={allItemColumn}
              dataSource={allItem}
              bordered
              scroll={{ y: 500, x: 500 }}
            />
          </div>
        </div>

        <div
          class="flex-container"
          style={{ marginTop: "5%", borderBottom: "3px dotted black" }}
        >
          <div id = 'out' class="flex-item-center">
            <p id="title-report" >ประวัติการเบิกอุปกรณ์</p>
            <Table
              columns={withDrawColumns}
              dataSource={transectionWithdaw}
              bordered
              scroll={{ y: 500, x: 1100 }}
            />
          </div>
        </div>

        <div
          class="flex-container"
          style={{ marginTop: "5%", borderBottom: "3px dotted black" }}
        >
          <div id="in" class="flex-item-center">
            <p id="title-report">ประวัติการรับอุปกรณ์</p>
            <Table
              columns={depositColumn}
              dataSource={transectionDeposit}
              bordered
              scroll={{ y: 500, x: 1100 }}
            />
          </div>
        </div>

        <div  id="move" class="flex-container" style={{ marginTop: "5%" }}>
          <div class="flex-item-center">
            <p id="title-report">ประวัติการเคลื่อนย้ายอุปกรณ์</p>
            <Table
              columns={moveColumns}
              dataSource={transectionMove}
              bordered
              scroll={{ y: 500, x: 1100 }}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Report;
