import React from 'react'
import Axios from  'axios'
import {useState , useEffect} from 'react'
import { Menu, Dropdown, message } from 'antd';
import { DownOutlined } from '@ant-design/icons';




const Test = () => {
  
  const [listData , setListData] = useState([]);
  

  useEffect(() => {
    getData('location');
    getData('store'); 
  }, []);

  const getData = (tablename) =>{
    Axios.get(`http://localhost:3001/${tablename}`).then((res)=>{
      setListData(res.data); 
    });
  }

  

  
  return (
    <>
      <h1>run</h1>
    </>
  
  )
}

export default Test ;
