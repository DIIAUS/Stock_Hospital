import React,{useState , useEffect} from 'react'
import TestProbs from './TestProp'
// DataBASE
const target_data = [
    {
      LocID: 4,
      LocName: "Center",
    },
    {
      LocID: 5,
      LocName: "Room",
    },
    {
      LocID: 6,
      LocName: "Bed",
    },
  ];
  








const TestRender = () => {

    const [data , setData] = useState(target_data)
  return (
    <div>
        <div>TestRender</div>

        {data.map(e=>{
            console.log(e);
            return(
                <TestProbs msg = {e.LocName} />
            )
        })}

        <TestProbs msg = "aaa"/>
    </div>
  )
}

export default TestRender