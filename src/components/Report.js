import React,{useState, useEffect}from 'react'

const Report = (props) => {
  useEffect(() => {
    props.sendBack("รายงาน");
  }, []);
  return (
    <>
      <div> 
        <h2>{"asasa"}</h2>
      </div>
    </>
  )
}

export default Report