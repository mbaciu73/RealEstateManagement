// require the express package
require('dotenv').config();
const express = require('express');
//app.use(bodyParser.urlencoded({ extended: true }));
const sqlite3 = require('sqlite3').verbose();
//const bodyParser = require('body-parser');

// new database
const db = new sqlite3.Database('RealEstate.db');

// My Queries
const findAllCounties = 'SELECT countid, countyname FROM county ORDER BY countyname ASC;';
const findAllAreas = 'SELECT areaid, areaname, countid FROM area ORDER BY countid;';
const findAllCategories = 'SELECT catid, catname FROM procat ORDER BY catid ASC;';
const findAllTypes = 'SELECT ptypeid, ptypename, catid FROM protype;';
const findAllProperties = 'SELECT pid, paddr, areaid, country,no_beds,no_baths,ptypeid,sellerid,agentid,buyerid,price FROM property';

// instantiate an object of express
const app = express();

// set root directory for all files
app.use(express.static(__dirname + "/public"));
// run the server on port 3000
app.listen(3000, function(){
	console.log('Server running on port 3000');
});

app.get("/",function(req,res){
	res.sendFile(__dirname + "/index.html");
});

// all links
app.get("/signin", function(req, res) {
    res.sendFile(__dirname + "/signin.html");
});
app.get("/property", function(req, res) {
    res.sendFile(__dirname + "/property.html");
});
app.get("/signin", function(req, res) {
    res.sendFile(__dirname + "/signin.html");
});
app.get("/properties", function(req, res) {
    res.sendFile(__dirname + "/properties.html");
});
// query database and retrieve counties
app.get('/retrieveCounties', function(req, res) {
    const query = db.prepare(findAllCounties);
    query.all(function(error, rows) {
        if (error) {
            console.log(error);
            res.status(400).json(error);
        } else {
            res.status(200).json(rows);
        }
    });
});

//query database and retrieve all areas
app.get('/retrieveAreas', function(req, res) {
    const query = db.prepare(findAllAreas);
    query.all(function(error, rows) {
        if (error) {
            console.log(error);
            res.status(400).json(error);
        } else {
            res.status(200).json(rows);
            
        }
    });
});

//query database and retrieve all categories
app.get('/retrieveCategories', function(req, res) {
    const query = db.prepare(findAllCategories);
    query.all(function(error, rows) {
        if (error) {
            console.log(error);
            res.status(400).json(error);
        } else {
            res.status(200).json(rows);
            
        }
    });
});

//query database and retrieve all property types
app.get('/retrieveTypes', function(req, res) {
    const query = db.prepare(findAllTypes);
    query.all(function(error, rows) {
        if (error) {
            console.log(error);
            res.status(400).json(error);
        } else {
            res.status(200).json(rows);
        }
    });
});

app.get('/retrieveProperty', function(req, res) {
    const query = db.prepare(findAllProperties);
    query.all(function(error, rows) {
        if (error) {
            console.log(error);
            res.status(400).json(error);
        } else {
            res.status(200).json(rows);
        }
    });
});