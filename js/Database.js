const sqlite3 = require('sqlite3');
const db = new sqlite3.Database('assignment.db',(err)=>{
    if(err){
        console.log(err.message);
    }
    
    console.log('Connected');
});