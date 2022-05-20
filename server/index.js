const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");
const { type } = require("@testing-library/user-event/dist/type");

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  user: "root",
  host: "localhost",
  password: "",
  database: "my_stock",
});

// app.use('/login', (req, res) => {
//     res.send({
//       token: 'test123'
//     });
//   });

app.post("/login", (req, res) => {
  db.query("SELECT * FROM login", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.get("/:tablename", (req, res) => {
  const mode = "SELECT * FROM ";
  const tablename = req.params.tablename;
  const sql = mode.concat(tablename);

  db.query(sql, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.post("/send_item", (req, res) => {
  const SerialNumber = req.body.SerialNumber;
  const GroupID = req.body.GroupID;
  const DeviceOfCompany = req.body.DeviceOfCompany;
  const Onhand = req.body.Onhand;
  const UmCode = req.body.UmCode;
  const FristDate = req.body.FristDate;
  const LastDate = req.body.LastDate;

  db.query(
    "INSERT INTO item (SerialNumber, FristDate, GroupID, DeviceOfCompany, Onhand, UmCode, LastDate) VALUES(?,?,?,?,?,?,?)",
    [
      SerialNumber,
      FristDate,
      GroupID,
      DeviceOfCompany,
      Onhand,
      UmCode,
      LastDate,
    ],
    (err, result) => {
      if (err) {
        console.log(err);
        res.send(err.sqlMessage);
      } else {
        // console.log(result);
        res.send('send success');
      }
    }
  );
})

// app.get('/group'), (req,res) =>{
//     const sql =  "SELECT * FROM item_group";
//     db.query(sql, (err,result)=>{
//         if(err){
//             console.log(err);
//         }
//         else{
//             res.send(result) ;
//         }
//     })
// };

app.listen("3001", () => {
  console.log("Server is running on port 3001");
});
