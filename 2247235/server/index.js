const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const mysql = require('mysql');

const port = 3000;
const host = 'localhost';

const db = "infosys";
const tbl = "employees";

//Cross Origin Resource
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//MySQL Connection
const connection = mysql.createConnection({
    host: host,
    user: "root",
    password: "#Music2025",
    database: db
});

//Connection Checking
connection.connect(function (err) {
    if (err) throw err;
    console.log("MySQL Connected!");
});

// Routes
app.get("/", (req, res) => {
    // Display all data
    res.status(200);
    res.setHeader("Content-Type", "application/json");
    connection.query("SELECT * from " + tbl, function (err, result) {
    if (err) throw err;
    console.log("Result: " + JSON.stringify(result));
    res.end(JSON.stringify(result));
    });
});

//CREATE
app.post('/new', (req, res) => { 
    res.status(200);
    res.setHeader('Content-Type', 'application/json');
    // let resp = req.body;

    const id = req.body.id;
    const name = req.body.name;
    const designation = req.body.designation;
    const department = req.body.department;
    const salary = req.body.salary;
    const location = req.body.location;
    
    connection.query("Insert into " + tbl + " values (?,?,?,?,?,?)", [id, name, designation, department, salary, location], (err, res) => { 
        if (err) throw err;
        console.log("Result: " + JSON.stringify(res));
        res.end(JSON.stringify(res));
    })
})

//UPDATE
app.post("/update", (req, res) => {
    res.status(200);
    res.setHeader("Content-Type", "application/json");
    let resp = req.body;
    connection.query(
        "UPDATE " +
        tbl +
        " SET name= \'" +
        resp["name"] +
        "\', designation=\'" +
        resp["designation"] +
        "\',department=\'" +
        resp["department"] +
        "\',salary=" +
        resp["salary"] +
        " where location = \'" +
        resp["location"] + "\'",
        function (err, result) {
        if (err) throw err;
        console.log("Result: " + JSON.stringify(result));
        res.end(JSON.stringify(result));
        }
    );
});

//SEARCH
app.post("/search", (req, res) => {
  // Display all data
    res.status(200);
    res.setHeader("Content-Type", "application/json");
    var getDept = req.body;
    connection.query(
        "SELECT * from " + tbl + " where department = \'" + getDept["department"] + "\'",
        function (err, result) {
        if (err) throw err;
        console.log("Result: " + JSON.stringify(result));
        res.end(JSON.stringify(result));
        }
    );
}); 

//DELETE
app.post("/delete", (req, res) => {
    res.status(200);
    res.setHeader("Content-Type", "application/json");
    var delId = req.body["delID"];
    connection.query(
        "DELETE from " + tbl + " where id = " + delId,
        function (err, result) {
        if (err) throw err;
        console.log("Result: " + JSON.stringify(result));
        res.end(JSON.stringify(result));
        }
    );
});


app.get("/*", (req, res) => { 
    res.status(404);
    res.end("<h1>404 ERROR :(</h1>");
});

app.listen(port, host, () => { 
    console.log(`App listening at http://${host}:${port}`);
})