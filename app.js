require('dotenv').config();
// import express module
const express = require('express');
// import the body parser module
const bodyParser = require('body-parser');
// import the sqlite3 module
const sqlite3 = require('sqlite3').verbose();
// Attach sqlite3 database file to web app 
const db = new sqlite3.Database('RealEstate.db');
// import express validator module
const { body, validationResult } = require('express-validator');
// attach bcrypt module
const bcrypt = require('bcrypt');
// import express session module
const session = require('express-session');
// import passport module
const passport = require('passport');
const { query } = require('express');
const { json } = require('body-parser');
// import passport local
const localStrategy = require('passport-local').Strategy;
// salt rounds
const saltRounds = 10;


// My Queries

const findAllUsers = 'select * from reusers';
const findAllCounties = 'SELECT countid, countyname FROM county ORDER BY countyname ASC;';
const findAllAreas = 'SELECT areaid, areaname, countid FROM area ORDER BY countid;';
const findAllCategories = 'SELECT catid, catname FROM procat ORDER BY catid ASC;';
const findAllTypes = 'SELECT ptypeid, ptypename, catid FROM protype;';
const findAllProperties = 'SELECT pid, paddr,ptypename,no_bed,no_baths,imgname,areaname,catname from property join pimages using (pid) join area using (areaid) join protype USING (ptypeid) JOIN procat USING (catid) ORDER by pid DESC;';
const latestResidentials = 'SELECT pid, paddr,ptypename,no_bed,no_baths, imgname, areaname from property join pimages using (pid) join area using (areaid) join protype USING (ptypeid) JOIN procat USING (catid) where catid != 2 ORDER by pid DESC LIMIT 3;';
const findRoles = 'SELECT * FROM roles;';
const allProperties = 'SELECT pid, paddr,ptypename,no_bed,no_baths, imgname, areaname from property join pimages using (pid) join area using (areaid) join protype USING (ptypeid) JOIN procat USING (catid) ORDER by pid ASC;';
const findPasswordByEmail = 'SELECT email, password FROM reusers where email = $1;';
const findUserByEmail = 'SELECT email FROM reusers WHERE email = $1;';
const insertUser = 'INSERT INTO reusers (email, name, phone, password, roleid) values ($1,$2,$3,$4,$5);';
const searchProperties = 'SELECT pid, paddr,ptypename,no_bed,no_baths,imgname,areaname,catname FROM property NATURAL join area NATURAL join County natural join protype NATURAL JOIN procat join reusers on property.sellerid = reusers.email NATURAL join pimages WHERE areaname like $1 AND ptypename like $2 and no_bed = $3 AND no_baths= $4 AND price BETWEEN $5 AND $6;';
const userNotFound = 'Username not found!';
const incorrectPassword = 'Incorrect password!';
const insertCategory = 'INSERT INTO procat (catname) values ($1);';
const insertProType = 'INSERT INTO protype(ptypename,catid) values ($1,$2);';
const insertProperty = 'INSERT INTO property(paddr,areaid,country,no_bed,no_baths,ptypeid,sellerid,agentid,price) values($1,$2,$3,$4,$5,$6,$7,$8,$9);';
const searchProperties2 = 'SELECT pid, paddr,ptypename,no_bed,no_baths,imgname,areaname,catname from property join pimages using (pid) join area using (areaid) join protype USING (ptypeid) JOIN procat USING (catid) where ptypename like $1;';
const deleteUser = 'DELETE FROM reuser WHERE email = $1;';
const deleteType = 'DELETE FROM protype WHERE ptypeid = $1;';
const deleteCategory = 'DELETE FROM procat WHERE catid = $1;';
const deleteProperty = 'DELETE FROM property WHERE pid = $1;';


// instantiate an object of express
const app = express();

// set root directory for all files
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({ extended: true }));
// set session (settings are for development only)
app.use(session({
    secret: 'Markus & Thamsanqa',
    resave: false,
    saveUninitialized: false
}));

// use the passport for authentication
app.use(passport.initialize());
app.use(passport.session());
///////////////////////////////////////////////////////////////////////////////////////
passport.use(new localStrategy(function(username, password, done) {

    const userQuery = db.prepare(findPasswordByEmail);
    userQuery.get(username, function(error, row) {
        if (error) return err // error with query
        if (!row) return done(null, false, { message: userNotFound });
        bcrypt.compare(password, row.password, function(err, res) {
            if (res == true) done(null, { id: row.email });
            else return done(null, false, { message: incorrectPassword });
        });
    });
}));


//////////////////////////////////////////////////////////////////////////////////////
//serialize
passport.serializeUser(function(user, done) {
    return done(null, user.id);
});
// deserialise
passport.deserializeUser(function(id, done) {
    const userQuery = db.prepare(findUserByEmail);
    userQuery.get(id, function(err, row) {
        if (!row) return done(null, false);
        return done(null, row);
    });
});
/////////////////////////////////////////////////////////////////////////////////////
// run the server on port 3000
app.listen(3000, function(){
	console.log('Server running on port 3000');
});

app.get("/",function(req,res){
	res.sendFile(__dirname + "/index.html");
});

// all routes for public files and pages
app.get("/signin", isNotAuthenticated(),function(req, res) {
    res.sendFile(__dirname + "/signin.html");
});

///////////////////////////////////////////////////////////////////////////
app.post('/signin', function(req, res, next) {
    passport.authenticate('local', function(err, user, info) {
        if (err) {
            console.log(err)
            return next(err);
        }
        if (!user) {
            console.log(info);
            return res.redirect('/signin');
        }
        req.logIn(user, function(err) {
            if (err) { return next(err); }
            return res.redirect('/admin');
        });
    })(req, res, next);
});
///////////////////////////////////////////////////////////////////////////

// function to protect pages
function isAuthenticated(){
    return function(req, res, next){
        if (req.isAuthenticated()){
            return next();
        }
        res.redirect('/signin');
    }
}
function isNotAuthenticated(){
    return function(req, res, next){
        if (req.isAuthenticated()){
            return res.redirect('/admin');
        }
        next();
    }
}


app.get("/property", function(req, res) {
    res.sendFile(__dirname + "/property.html");
});
app.get("/about", function(req, res) {
    res.sendFile(__dirname + "/about.html");
});
app.get("/contact", function(req, res) {
    res.sendFile(__dirname + "/contactus.html");
});
app.get("/properties", function(req, res) {
    res.sendFile(__dirname + "/properties.html");
});
app.get("/signin", isNotAuthenticated(), function(req, res) {
    res.sendFile(__dirname + "/signin.html");
});

// routes for protected pages
app.get("/admin", isAuthenticated(),function(req, res) {
        res.sendFile(__dirname + "/admin.html");
});
app.get("/create_category", isAuthenticated(),function(req, res) {
    res.sendFile(__dirname + "/create_category.html");
});
app.get("/create_property", isAuthenticated(),function(req, res) {
    res.sendFile(__dirname + "/create_property.html");
});
app.get("/create_type", isAuthenticated(),function(req, res) {
    res.sendFile(__dirname + "/create_type.html");
});
app.get("/create_user", isAuthenticated(),function(req, res) {
    res.sendFile(__dirname + "/create_user.html");
});
app.get("/edit_property", isAuthenticated(),function(req, res) {
    res.sendFile(__dirname + "/edit_property.html");
});
app.get("/edit_user", isAuthenticated(),function(req, res) {
    res.sendFile(__dirname + "/edit_user.html");
});
app.get("/manage_categories", isAuthenticated(),function(req, res) {
    res.sendFile(__dirname + "/manage_categories.html");
});
app.get("/manage_properties", isAuthenticated(),function(req, res) {
    res.sendFile(__dirname + "/manage_properties.html");
});
app.get("/manage_types", isAuthenticated(),function(req, res) {
    res.sendFile(__dirname + "/manage_types.html");
});
app.get("/manage_users", isAuthenticated(),function(req, res) {
    res.sendFile(__dirname + "/manage_users.html");
});
app.get("/my_profile", isAuthenticated(),function(req, res) {
    res.sendFile(__dirname + "/my_profile.html");
});


// logout
app.get('/signout', function(req,res){
    req.logOut();
    res.redirect('/signin');
})
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
// get roles from database
app.get('/retrieveRole', function(req, res) {
    const query = db.prepare(findRoles);
    query.all(function(error, rows) {
        if (error) {
            console.log(error);
            res.status(400).json(error);
        } else {
            res.status(200).json(rows);
        }
    });
});

// post categories route and insert into table
app.post('/insertCategory', [
    body('CategoryName').isLength({min: 3, max: 50})
], 
function(req, res){
    const validErrors = validationResult(req);

    if(!validErrors.isEmpty()){
        console.log(validErrors);
        res.status(400).json({ errors: validErrors.array() });
    }else{
    const CategoryName = req.body.CategoryName;

    // insert into category table
    const insert = db.prepare(insertCategory);
    insert.run(CategoryName);
    insert.finalize();

    res.send({});
    }    
});

// post user route and insert into reuser table
app.post('/insertUser', [
    body('email').isLength({min: 5, max: 50}).isEmail(),
    body('name').isLength({min: 3, max: 50}),
    body('phone').isLength({min: 9, max: 9}),
    body('password').isLength({min: 4}),
    body('role')
], 
function(req, res){
    const validErrors = validationResult(req);

    if(!validErrors.isEmpty()){
        console.log(validErrors);
        res.status(400).json({ errors: validErrors.array() });
    }else{ 
    const email = req.body.email;
    const name = req.body.name;
    const phone = req.body.phone;
    const password = req.body.password;
    const role = req.body.role;
    
    
    bcrypt.hash(password, saltRounds, function(err, hash){
        // insert into category table
        const insert = db.prepare(insertUser);
        insert.run(email,name,phone,hash,role);
        insert.finalize();
    });
    res.send({});
    }    
    
});

app.post('/insertProType', [
        body('type').isLength({min: 3, max: 50}),
        body('cat')
    ],
    function(req, res){
        const validErrors = validationResult(req);

        if(!validErrors.isEmpty()){
            console.log(validErrors);
            res.status(400).json({ errors: validErrors.array() });
        }else{
            const type = req.body.type;
            const cat = req.body.cat;

            // insert into category table
            const insert = db.prepare(insertProType);
            insert.run(type,cat);
            insert.finalize();

            res.send({});
        }
});

app.post('/insertProperty', [
        body('paddr').isLength({min: 3, max: 50}),
        body('areaid'),
        body('country').isLength({min: 3,max:20}),
        body('no_bed').isInt(),
        body('no_baths').isInt(),
        body('ptypeid'),
        body('sellerid'),
        body('agentid'),
        body('price').isInt()
    ],
    function(req, res){
        const validErrors = validationResult(req);

        if(!validErrors.isEmpty()){
            console.log(validErrors);
            res.status(400).json({ errors: validErrors.array() });
        }else{
            const type = req.body.type;
            const cat = req.body.cat;

            // insert into category table
            const insert = db.prepare(insertProType);
            insert.run(type,cat);
            insert.finalize();

            res.send({});
        }
    });


// search properties
//app.post()

// manage section
// query to display categories 
app.get('/manageCategories', function(req, res) {
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
// query to display all users
app.get('/manageUsers', function(req, res) {
    const query = db.prepare(findAllUsers);
    query.all(function(error, rows) {
        if (error) {
            console.log(error);
            res.status(400).json(error);
        } else {
            res.status(200).json(rows);
        }
    });
});
app.get('/manageTypes', function(req, res) {
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


// Search form
app.post("/searchResults", function(req, res){
    const Area = req.body.Area;
    const PropertyType = req.body.PropertyType;
    const Bedrooms = req.body.Bedrooms;
    const Bathrooms = req.body.Bathrooms;
    const MinPrice = req.body.MinPrice;
    const MaxPrice = req.body.MaxPrice;


    const query = db.prepare(searchProperties);
    query.all(Area,PropertyType, Bedrooms, Bathrooms, MinPrice, MaxPrice, function(error, rows) {
        if (error) {
            console.log(error);
            res.status(400).json(error);
            
        } else {
            var data = 
            res.status(200).send(rows);
            
        }
        
    });

});

//***************** Delete rows from database *************************
// delete type
app.post("/deleteType", isAuthenticated(), function(req, res) {
    
    const ptypeid = req.body.ptypeid;
    //console.log(`${ptypeid}`);
    const deleteStmt = db.prepare(deleteType);
    deleteStmt.run(ptypeid);
    deleteStmt.finalize();
    res.redirect('http://localhost:3000/manage_types');
    //res.json({});
    

});
