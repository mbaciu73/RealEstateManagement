const sqlite3 = require('sqlite3');
const db = new sqlite3.Database('assignment.db',(err)=>{
    if(err){
        console.log(err.message);
    }


})
const express = require('express');
const Database = express();
const bodyparser = require('body-parser');
const req = require("express");
const { body, validationResult } = require('express-validator');

Database.use(bodyParser.urlencoded({ extended: true }));
Database.use(express.static(__dirname + "/public"));




Database.get("/", function(req, res) {
    res.sendFile(__dirname + "/signin.html");
});

Database.post('/checkuser',function(req,res){
    const email = req.body.EmailLogin;
    const roleid = 'client';


    const insert = db.prepare('Insert into User values() ')
});
