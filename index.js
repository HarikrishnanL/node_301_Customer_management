const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors')
require('dotenv').config();

// import database

const db = require("./src/app/config/database");
const dbRelation = require('./src/app/domain/service/dbRelation');

// importing routes
const Customer = require('./src/app/routes/customer');



const app = express();
app.use(express.json());

app.set('port', process.env.port);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// database connection 
db.authenticate()
    .then(() => {
        console.log("Database Handshake successfull")
    }).catch((error) => {
        console.log("Database Handshake failed with error :" + error)
    });

app.use(dbRelation)



app.use(cors());

app.get("/", (req, res) => {
    res.json({ message: "Welcome to cutomer service microservices" });
});

app.get("/customer-management", (req, res) => {
    res.json({ message: "Welcome to cutomer service microservices" });
});

app.use("/customer-management",Customer)

app.get("*", (req, res) => {
    res.status(404).send("Invalid Endpoint")
});

module.exports = app;