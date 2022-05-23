import React,{useState, useEffect}from 'react';
import Axios from 'axios';
import {Table,Switch} from 'antd';
import './css/Report.css'


const Report = (props) => {
  const [fixedTop, setFixedTop] = useState(false);
  const [onhandList, setOnhandList] = useState([]);
  const [transectionWithdaw, setTransectionWithdaw] = useState([]);
  const [transectionDeposit, setTransectionDeposit] = useState([]);
  const [transectionMove, setTransectionMove] = useState([]);
  const [allItem, setAllItem] = useState([]);

  const get_table =  (tablename) => {
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
      title: "GroupName",
      dataIndex: "GroupName",
      align: "center",
      render: (text) => <p style={{ color: "blue" }}>{text}</p>,
    },
    {
      title: "Onhand",
      className: "column-sum",
      dataIndex: "Onhand",
      align: "center",
      render: (text) => <p style={{ color: "red" }}>{text}</p>,
    },
  ];

  const allItemColumn =[
    {
      title: "Serial Number",
      dataIndex: "SerialNumber",
      align: "center",
      fixed: 'left',
      width: '2%',
      render: (text) => <p style={{ color: "blue" }}>{text}</p>,
    },
    {
      title: "ประเภท",
      dataIndex: "GroupName",
      align: "center",
      width: '2%',
      render: (text) => <p style={{ color: "red" }}>{text}</p>,
    },
    {
      title: "รับจากบริษัท",
      dataIndex: "DeviceOfCompany",
      align: "center",
      width: '4%',
      render: (text) => <p style={{ color: "red" }}>{text}</p>,
    },
    {
      title: "จำนวน",
      dataIndex: "onhand",
      align: "center",
      width: '1%',
      render: (text) => <p style={{ color: "red" }}>{text}</p>,
    }
  ];

  const depositColumn = [
    {
      title: "Serial Number",
      dataIndex: "SerialNumber",
      align: "center",
      fixed: 'left',
      width: '4%',
      render: (text) => <p style={{ color: "blue" }}>{text}</p>,
    },
    {
      title: "",
      className: "column-sum",
      dataIndex: "TypeID",
      align: "center",
      width: '2%',
      render: (text) => <p style={{ color: "red" }}>{text}</p>,
    },

    {
      title: "วัน/เดือน/ปี ที่เบิก",
      className: "column-sum",
      dataIndex: "Date",
      align: "center",
      width: '6%',
      render: (text) => <p style={{ color: "red" }}>{text}</p>,
    },
    {
      title: "ประเภทอุปกรณ์",
      className: "column-sum",
      dataIndex: "GroupName",
      align: "center",
      width: '3%',
      render: (text) => <p style={{ color: "red" }}>{text}</p>,
    },  
    {
      title: "บริษัท",
      className: "column-sum",
      dataIndex: "DeviceOfCompany",
      align: "center",
      width: '4%',

      render: (text) => <p style={{ color: "#000" }}>{text}</p>,
    },

    {
      title: "สถานที่",
      className: "column-sum",
      dataIndex: "StoreName",
      align: "center",
      width: '4%',

      render: (text) => <p style={{ color: "#000" }}>{text}</p>,
    },

    {
      title: "คลัง",
      className: "column-sum",
      dataIndex: "LocName",
      align: "center",
      width: '3%',

      render: (text) => <p style={{ color: "#000" }}>{text}</p>,
    },
  ];

  const withDrawColumns = [
    {
      title: "Serial Number",
      dataIndex: "SerialNumber",
      align: "center",
      fixed: 'left',
      width: '5%',
      render: (text) => <p style={{ color: "blue" }}>{text}</p>,
    },
    {
      title: "หมายเลขคุรุภัณฑ์",
      className: "column-sum",
      dataIndex: "KurupanNumber",
      align: "center",
      width: '5%',
      render: (text) => <p style={{ color: "red" }}>{text}</p>,
    },
    {
      title: "",
      className: "column-sum",
      dataIndex: "TypeID",
      align: "center",
      width: '2%',
      render: (text) => <p style={{ color: "red" }}>{text}</p>,
    },
    {
      title: "สถานที่นำไปใช้",
      className: "column-sum",
      dataIndex: "DepartmentName",
      align: "center",
      width: '6%',
      render: (text) => <p style={{ color: "red" }}>{text}</p>,
    },
    {
      title: "วัน/เดือน/ปี ที่เบิก",
      className: "column-sum",
      dataIndex: "Date",
      align: "center",
      width: '7%',
      render: (text) => <p style={{ color: "red" }}>{text}</p>,
    },
    {
      title: "ประเภทอุปกรณ์",
      className: "column-sum",
      dataIndex: "GroupName",
      align: "center",
      width: '5%',
      render: (text) => <p style={{ color: "red" }}>{text}</p>,
    },  
    {
      title: "ชื่อ-ผู้เบิก",
      className: "column-sum",
      dataIndex: "FristName",
      align: "center",
      width: '4%',

      render: (text) => <p style={{ color: "#000" }}>{text}</p>,
    },

    {
      title: "สกุล-ผู้เบิก",
      className: "column-sum",
      dataIndex: "LastName",
      align: "center",
      width: '4%',

      render: (text) => <p style={{ color: "#000" }}>{text}</p>,
    },
  ];

  const moveColumns = [
    {
      title: "Serial Number",
      className: "column-sum",
      dataIndex: "SerialNumber",
      align: "center",
      width: '3%',
      fixed: 'left',
      render: (text) => <p style={{ color: "blue" }}>{text}</p>,
    },  
    {
      title: "",
      className: "column-sum",
      dataIndex: "TypeID",
      align: "center",
      width: '3%',
      render: (text) => <p style={{ color: "red" }}>{text}</p>,
    },  
    {
      title: "วัน/เดือน/ปี ที่เคลื่อนย้าย",
      className: "column-sum",
      dataIndex: "Date",
      align: "center",
      width: '3%',
      render: (text) => <p style={{ color: "red" }}>{text}</p>,
    },  
    {
      title: "ประเภทอุปกรณ์",
      className: "column-sum",
      dataIndex: "GroupName",
      align: "center",
      width: '3%',
      render: (text) => <p style={{ color: "red" }}>{text}</p>,
    },  
    {
      title: "สถานที่",
      className: "column-sum",
      dataIndex: "StoreName",
      align: "center",
      width: '3%',
      render: (text) => <p style={{ color: "red" }}>{text}</p>,
    },  
    {
      title: "ที่เก็บ",
      className: "column-sum",
      dataIndex: "LocName",
      align: "center",
      width: '3%',
      render: (text) => <p style={{ color: "red" }}>{text}</p>,
    },  

  ];

  useEffect(() => {
    get_table("onhand");
    get_table("tansection_withdraw");
    get_table("all_item");
    get_table("transection_deposit")
    get_table("transection_move")
    props.sendBack("รายงาน");
  }, []);
  
  return (
    <>
      <h2>{"asasa"}</h2>
      <div className="border-report-form"> 
      <div class="flex-container" style={{borderBottom:"3px dotted black"}}>
        <div class="flex-item-left">
          <h3>Onhand</h3>
          <Table
              columns={columns}
              dataSource={onhandList}
              bordered
              scroll={{ y: 500 }}
            /></div>
        <div class="flex-item-right">
        <h3>อุปกรณ์ทั้งหมด</h3>
        <Table
              columns={allItemColumn}
              dataSource={allItem}
              bordered
              scroll={{ y: 500 ,x: 500 }}
            />
        </div>
      </div>

      <div class="flex-container" style={{marginTop:"5%" , borderBottom:"3px dotted black"}}>
        <div class="flex-item-center">
        <p id="title-report">ประวัติการเบิกอุปกรณ์</p>
        <Table
              columns={withDrawColumns}
              dataSource={transectionWithdaw}
              bordered
              scroll={{ y: 500 ,x: 1100 }}
            />
        </div>
      </div>

      <div class="flex-container" style={{marginTop:"5%" , borderBottom:"3px dotted black"}}>
        <div class="flex-item-center">
        <p id="title-report">ประวัติการรับอุปกรณ์</p>
        <Table
              columns={depositColumn}
              dataSource={transectionDeposit}
              bordered
              scroll={{ y: 500 ,x: 1100 }}
            />
        </div>
      </div>

      <div class="flex-container" style={{marginTop:"5%" }}>
        <div class="flex-item-center">
        <p id="title-report">ประวัติการเคลื่อนย้ายอุปกรณ์</p>
        <Table
              columns={moveColumns}
              dataSource={transectionMove}
              bordered
              scroll={{ y: 500 ,x: 1100 }}
            />
        </div>
      </div>
      </div>
      
    </>
  )
}

export default Report