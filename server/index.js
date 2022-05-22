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

app.post("/send_item", (req, res) => {
  const SerialNumber = req.body.SerialNumber;
  db.query(
    "SELECT * FROM item WHERE SerialNumber= ?",
    [SerialNumber],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

app.post("/move_loc", (req, res) => {
  const SerialNumber = req.body.SerialNumber;
  const TypeID = "M";
  const Date = "2016-10-01 00:00:00";
  const GroupID = req.body.GroupID;
  const StoreID = 1;
  const LocID = 1;
  const ToStoreID = req.body.ToStoreID;
  const ToLocID = req.body.ToLocID;
  const PersonID = 0;
  const DeviceOfCompany = "-";
  const DepartmentID = 0;

  db.query(
    "INSERT INTO transaction (SerialNumber,TypeID,Date,GroupID,StoreID,LocID,ToStoreID,ToLocID,PersonID,DeviceOfCompany,DepartmentID) VALUES(?,?,?,?,?,?,?,?,?,?,?)",
    [
      SerialNumber,
      TypeID,
      Date,
      GroupID,
      StoreID,
      LocID,
      ToStoreID,
      ToLocID,
      PersonID,
      DeviceOfCompany,
      DepartmentID,
    ],
    (err, result) => {
      if (err) {
        console.log(err);
        res.send(result);
      } else {
        res.send("success");
        console.log("move location successfully");
      }
    }
  );
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

app.post("/add_item", (req, res) => {
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
        res.send("success");
        console.log("add item successfully");
      }
    }
  );
});

app.post("/add_item_transection", (req, res) => {
  const SerialNumber = req.body.SerialNumber;
  const GroupID = req.body.GroupID;
  const DeviceOfCompany = req.body.DeviceOfCompany;
  const Date = req.body.Date;
  const DepartmentID = req.body.DepartmentID;
  const StoreID = req.body.StoreID;
  const LocID = req.body.LocID;
  const ToStoreID = req.body.ToStoreID;
  const ToLocID = req.body.ToLocID;
  const PersonID = req.body.PersonID;
  const TypeID = req.body.TypeID;

  db.query(
    "INSERT INTO transaction (SerialNumber,TypeID,DepartmentID,Date,GroupID,DeviceOfCompany,StoreID,LocID,ToStoreID,ToLocID,PersonID) VALUES(?,?,?,?,?,?,?,?,?,?,?)",
    [
      SerialNumber,
      TypeID,
      DepartmentID,
      Date,
      GroupID,
      DeviceOfCompany,
      StoreID,
      LocID,
      ToStoreID,
      ToLocID,
      PersonID,
    ],
    (err, result) => {
      if (err) {
        console.log(err);
        // res.send(err.sqlMessage);
      } else {
        res.send("success");
        console.log("update 'R' section successfully");
      }
    }
  );
});

app.post("/out_item_transection", (req, res) => {
  const SerialNumber = req.body.SerialNumber;
  const GroupID = req.body.GroupID;
  const DeviceOfCompany = req.body.DeviceOfCompany;
  const Date = req.body.Date;
  const DepartmentID = req.body.DepartmentID;
  const StoreID = req.body.StoreID;
  const LocID = req.body.LocID;
  const ToStoreID = req.body.ToStoreID;
  const ToLocID = req.body.ToLocID;
  const PersonID = req.body.PersonID;
  const TypeID = req.body.TypeID;

  db.query(
    "INSERT INTO transaction (SerialNumber,TypeID,DepartmentID,Date,GroupID,DeviceOfCompany,StoreID,LocID,ToStoreID,ToLocID,PersonID) VALUES(?,?,?,?,?,?,?,?,?,?,?)",
    [
      SerialNumber,
      TypeID,
      DepartmentID,
      Date,
      GroupID,
      DeviceOfCompany,
      StoreID,
      LocID,
      ToStoreID,
      ToLocID,
      PersonID,
    ],
    (err, result) => {
      if (err) {
        console.log(err);
        // res.send(err.sqlMessage);
      } else {
        res.send("success");
        console.log("update 'W' section successfully");
      }
    }
  );
});

app.post("/out_item", (req, res) => {
  const SerialNumber = req.body.SerialNumber;
  db.query(
    "DELETE FROM item WHERE SerialNumber = ?",
    [SerialNumber],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send("success");
        console.log("delete item successfully");
      }
    }
  );
});

app.listen("3001", () => {
  console.log("Server is running on port 3001");
});

app.post("/regis", (req, res) => {
  const UserID = req.body.UserID;
  const Password = req.body.Password;
  const FristName = req.body.FristName;
  const LastName = req.body.LastName;

  db.query(
    "INSERT INTO login (UserID, Password, FristName, LastName) VALUES (?,?,?,?)",
    [UserID, Password, FristName, LastName],
    (err, result) => {
      if (err) {
        console.log(err);
        // res.send(err.sqlMessage);
      } else {
        res.send("success");
        console.log("add newUser successfully");
      }
    }
  );
});
