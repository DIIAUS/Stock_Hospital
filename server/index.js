const express = require('express');
const app = express(); 
const mysql= require('mysql')
const cors= require('cors')

app.use(cors())
app.use(express.json());

const db = mysql.createConnection(
    {
        user : "root",
        host : "localhost",
        password: "",
        database: "my_stock"
    }
)


// app.get('/data',(req ,res) =>{
//     db.query("SELECT * FROM empolyees" , (err,result) =>{
//         if(err){
//             console.log(err);
//         }
//         else{
//             res.send(result) ;
//         } 
//     })
// });

app.get('/:tablename', (req,res)=>{
    const mode="SELECT * FROM ";
    const tablename = req.params.tablename;
    const sql = mode.concat(tablename);

    db.query(sql, (err,result)=>{
        if(err){
            console.log(err);
        }
        else{
            res.send(result) ;
        }
    })
});

// app.post('/:tablename', (req,res) => {
//     const tablename = req.params.tablename;
    
//     const mode="INSERT INTO ";
//     const ague =" () VALUES(?,?,?,?,?,?,?)"
//     const command = mode.concat(tablename,ague);
//     db.query(command,[],
//     (err,result) => { 
//         if(err){
//             console.log(err);
//         }
//         else{
//             res.send("Values inserted")
//         }
//     }
//     )
// });




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

app.listen('3001',() =>{
    console.log("Server is running on port 3001"); 
})