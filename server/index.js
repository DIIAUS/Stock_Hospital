const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");

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
  const TypeID = "T";
  const Date = req.body.Date;
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
  if (tablename === "tansection_withdraw") {
    db.query(
      "SELECT SerialNumber, KurupanNumber,TypeID , department.DepartmentName ,Date, item_group.GroupName , person.FristName ,person.LastName FROM transaction INNER JOIN department ON transaction.DepartmentID=department.DepartmentID INNER JOIN item_group ON transaction.GroupID=item_group.GroupID INNER JOIN person ON transaction.PersonID = person.Id WHERE TypeID='W' ORDER BY transaction.Id DESC; ",
      (err, result) => {
        if (err) {
          console.log(err);
        } else {
          res.send(result);
        }
      }
    );
  } else if (tablename === "all_item") {
    db.query(
      "SELECT SerialNumber, item_group.GroupName , DeviceOfCompany ,onhand FROM item INNER JOIN item_group ON item_group.GroupID=item.GroupID ORDER BY FristDate DESC; ",
      (err, result) => {
        if (err) {
          console.log(err);
        } else {
          res.send(result);
        }
      }
    );
  } else if (tablename === "transection_deposit") {
    db.query(
      "SELECT SerialNumber,TypeID ,Date, item_group.GroupName , DeviceOfCompany , store.StoreName , location.LocName FROM transaction INNER JOIN store ON transaction.StoreID=store.StoreID INNER JOIN location ON transaction.LocID=location.LocID INNER JOIN item_group ON transaction.GroupID=item_group.GroupID INNER JOIN person ON transaction.PersonID = person.Id WHERE TypeID='R' ORDER BY transaction.Id DESC;",
      (err, result) => {
        if (err) {
          console.log(err);
        } else {
          res.send(result);
        }
      }
    );
  } else if (tablename === "transection_move") {
    db.query(
      "SELECT SerialNumber,TypeID ,Date, item_group.GroupName , store.StoreName , location.LocName FROM transaction INNER JOIN store ON (transaction.ToStoreID=store.StoreID) INNER JOIN location ON transaction.ToLocID=location.LocID INNER JOIN item_group ON transaction.GroupID=item_group.GroupID INNER JOIN person ON transaction.PersonID = person.Id WHERE TypeID='T' ORDER BY transaction.Id DESC; ",
      (err, result) => {
        if (err) {
          console.log(err);
        } else {
          res.send(result);
        }
      }
    );
  } else if (tablename === "loan_Item") {
    db.query(
      "SELECT KurupanNumber ,Name , LoanDate ,  department.DepartmentName , Status , itemName FROM loan_Item INNER JOIN department ON (department.DepartmentID=loan_Item.DepartmentID) ORDER BY loan_Item.idx DESC;",
      (err, result) => {
        if (err) {
          console.log(err);
        } else {
          res.send(result);
        }
      }
    );
  } else if (tablename === "updateKurupan") {
    db.query(
      "SELECT SerialNumber, item_group.GroupName FROM item INNER JOIN item_group ON item_group.GroupID = item.GroupID WHERE ID_Kurupan=0 ORDER BY `FristDate` DESC;",
      (err, result) => {
        if (err) {
          console.log(err);
        } else {
          res.send(result);
        }
      }
    );
  } else if (tablename === "getOutsideKurupan") {
    db.query(
      "SELECT SerialNumber ,item_group.GroupName, department.DepartmentName FROM transaction INNER JOIN item_group ON transaction.GroupID=item_group.GroupID INNER JOIN department ON transaction.DepartmentID=department.DepartmentID WHERE transaction.TypeID = 'W' AND transaction.KurupanNumber IS NULL ORDER BY transaction.Date DESC; ",
      (err, result) => {
        if (err) {
          console.log(err);
        } else {
          res.send(result);
        }
      }
    );
  } else {
    db.query(sql, (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    });
  }
});

app.post("/add_item", (req, res) => {
  const SerialNumber = req.body.SerialNumber;
  const GroupID = req.body.GroupID;
  const DeviceOfCompany = req.body.DeviceOfCompany;
  const Onhand = req.body.Onhand;
  const UmCode = req.body.UmCode;
  const FristDate = req.body.FristDate;
  const LastDate = req.body.LastDate;
  const ID_Kurupan = req.body.ID_Kurupan;
  const KurupanNumber = req.body.KurupanNumber;

  db.query(
    "INSERT INTO item (SerialNumber, FristDate, GroupID, DeviceOfCompany, Onhand, UmCode, LastDate, ID_Kurupan,KurupanNumber) VALUES(?,?,?,?,?,?,?,?,?)",
    [
      SerialNumber,
      FristDate,
      GroupID,
      DeviceOfCompany,
      Onhand,
      UmCode,
      LastDate,
      ID_Kurupan,
      KurupanNumber,
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

app.post("/sendLoan", (req, res) => {
  const KurupanNumber = req.body.KurupanNumber;
  const Name = req.body.Name;
  const LoanDate = req.body.Date;
  const DepartmentID = req.body.Department;
  const Status = 1;
  const itemName = req.body.itemName;

  db.query(
    "INSERT INTO loan_Item (KurupanNumber,Name,LoanDate,DepartmentID,Status,itemName) VALUES(?,?,?,?,?,?)",
    [KurupanNumber, Name, LoanDate, DepartmentID, Status, itemName],
    (err, result) => {
      if (err) {
        console.log(err);
        res.send(err.sqlMessage);
      } else {
        // console.log(result);
        res.send("success");
        console.log("add loan successfully");
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
  const KurupanNumber = req.body.KurupanNumber;

  db.query(
    "INSERT INTO transaction (SerialNumber,TypeID,KurupanNumber,DepartmentID,Date,GroupID,DeviceOfCompany,StoreID,LocID,ToStoreID,ToLocID,PersonID) VALUES(?,?,?,?,?,?,?,?,?,?,?,?)",
    [
      SerialNumber,
      TypeID,
      KurupanNumber,
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
  const KurupanNumber = req.body.KurupanNumber;
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
    "INSERT INTO transaction (SerialNumber,TypeID,DepartmentID,Date,GroupID,KurupanNumber,DeviceOfCompany,StoreID,LocID,ToStoreID,ToLocID,PersonID) VALUES(?,?,?,?,?,?,?,?,?,?,?,?)",
    [
      SerialNumber,
      TypeID,
      DepartmentID,
      Date,
      GroupID,
      KurupanNumber,
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
        res.send(err.sqlMessage);
      } else {
        res.send("success");
        console.log("add newUser successfully");
      }
    }
  );
});

app.post("/sendBarcode", (req, res) => {
  const code = req.body.code;
  db.query("UPDATE barcode SET code=? WHERE id=1", [code], (err, result) => {
    if (err) {
      console.log(err);
      res.send(err.sqlMessage);
    } else {
      res.send("success");
      console.log("update Barcode successfully");
    }
  });
});

app.post("/returnItem", (req, res) => {
  const KurupanNumber = req.body.KurupanNumber;
  db.query(
    "DELETE FROM loan_Item WHERE KurupanNumber=?",
    [KurupanNumber],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send("success");
        console.log("return item successfully");
      }
    }
  );
});

app.post("/InsidekuruUpadate", (req, res) => {
  const KurupanNumber = req.body.KurupanNumber;
  const SerialNumber = req.body.SerialNumber;
  db.query(
    "UPDATE item SET KurupanNumber = ? , ID_Kurupan=1 WHERE SerialNumber = ?",
    [KurupanNumber, SerialNumber],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send("success");
        console.log("update s/n successfully");
      }
    }
  );
});

app.post("/OutsidekuruUpadate", (req, res) => {
  const KurupanNumber = req.body.KurupanNumber;
  const SerialNumber = req.body.SerialNumber;
  db.query(
    "UPDATE transaction SET KurupanNumber = ? WHERE SerialNumber = ?",
    [KurupanNumber, SerialNumber],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send("success");
        console.log("update s/n successfully");
      }
    }
  );
});

app.listen("3001", () => {
  console.log("Server is running on port 3001");
});
