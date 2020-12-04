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
const findAllProperties = 'SELECT pid, paddr,ptypename,no_bed,no_baths, imgname, areaname from property join pimages using (pid) join area using (areaid) join protype USING (ptypeid) JOIN procat USING (catid) ORDER by pid DESC;';
const latestResidentials = 'SELECT pid, paddr,ptypename,no_bed,no_baths, imgname, areaname from property join pimages using (pid) join area using (areaid) join protype USING (ptypeid) JOIN procat USING (catid) where catid != 2 ORDER by pid DESC LIMIT 3;';
const allProperties = 'SELECT pid, paddr,ptypename,no_bed,no_baths, imgname, areaname from property join pimages using (pid) join area using (areaid) join protype USING (ptypeid) JOIN procat USING (catid) ORDER by pid ASC;';
const findUser = 'SELECT * FROM reusers;';
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
app.get("/property", function(req, res) {
    res.sendFile(__dirname + "/property.html");
});
app.get("/signin", function(req, res) {
    res.sendFile(__dirname + "/signin.html");
});
app.get("/properties", function(req, res) {
    res.sendFile(__dirname + "/properties.html");
});
app.get("/adminarea", function(req, res) {
    res.sendFile(__dirname + "/admin.html");
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

// get all properties in the database
app.get('/retrieveAllProperties', function(req, res) {
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

// add 3 properties on the home page
app.get('/retrieveLatestResidentialProperites', function(req, res) {
    const query = db.prepare(latestResidentials);
    query.all(function(error, rows) {
        if (error) {
            console.log(error);
            res.status(400).json(error);
        } else {
            res.status(200).json(rows);
        }
    });
});