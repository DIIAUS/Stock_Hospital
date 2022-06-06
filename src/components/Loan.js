import React, { useState, useEffect } from "react";
import { Steps,Form} from "antd";
const { Step } = Steps;

const Loan = (props) => {   
    const StyleSheet ={ 
        BorderCss: {border: "1px solid black", padding: "20px 0"} ,
        DivCss : { border: "3px solid black" }
    }
    
  useEffect(() => {
    props.sendBack("ยืม/คืน อุปกรณ์");
  });
  return (
    <div>
      <h1>ยังไม่เสร็จ</h1>
      <Steps current={2} percent={100}>
        <Step title="ยืม" description="12-06-2563" />
        <Step
          title="In Progress"
          subTitle="Left 00:00:08"
          description="This is a description."
        />
        <Step title="คืน" description="This is a description." />
      </Steps>

      <div
          class="flex-container"
          style={StyleSheet.DivCss}
        >
          <div class="flex-item-left">
            <h3>ยืม</h3>

            <div style={StyleSheet.BorderCss}>
                <Form layout="vertical">
                    <Form.Item >
                        <input placeholder="เลขคุรุภัณฑ์"  sty/>
                    </Form.Item>

                    <Form.Item>
                        <input placeholder="Name"/>
                    </Form.Item>

                    <Form.Item>
                        <input placeholder="ีคุร"/>
                    </Form.Item>
                </Form>
            </div>
            
          </div>
          <div class="flex-item-right">
            <h3>อุปกรณ์ทั้งหมด</h3>
            
          </div>
        </div>
    </div>
  );
};
export default Loan;