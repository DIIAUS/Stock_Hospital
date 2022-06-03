import React from "react";

const GenerateBarcode = React.forwardRef((props, ref) => {
  let num = 23241457849093;

  const Barcode = require("react-barcode");
   
  return (
    <div ref={ref}>
      <h1 style={{textAlign: "center" , fontWeight:1000}}>Barcode ({props.allBarcode.length})</h1>

        <table style={{width:"100%"}}>
         
          {props.allBarcode.map((val)=>{
          return(
          <>  
              <div style={{marginTop:"50px", display: "inline"}}>
                <Barcode value={val}  />         
              </div>
          </>  
          );
        })}
        
        </table>
      
  
      
    </div>
  );
});

export default GenerateBarcode;
