const {createPool }=require('mysql');
const pool= createPool({
    host:"localhost",
    user:'root',
    password:"123",
    database:'project',
    connectionLimit:10
});
const startDate = '2023-01-01';
const endDate = '2023-06-30';

// Execute a SQL query to get project names started and ended within the specified date range
const sqlQuery = `SELECT pname 
                  FROM projects 
                  WHERE start_date >= ? 
                  AND end_date <= ?`;
Promise.all([
    new Promise((resolve, reject) => {
pool.query('select *from user',(err,results1,fields)=>{
    if (err) {
        reject(err);
        return;
    }
    resolve(results1);
});
}),
new Promise((resolve, reject) => {pool.query(sqlQuery, [startDate, endDate], (err, results2, fields) => {
    if (err) {
        reject(err);
        return;
    }
    resolve(results2);
})
})
]).then(([results1, results2]) => {
    console.log("Results of query 1:", results1);
    console.log("Results of query 2:", results2);
}).catch((err) => {
    console.error("Error executing queries: " + err.message);
});