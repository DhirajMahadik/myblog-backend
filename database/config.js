import mysql from 'mysql2'

 const database = mysql.createConnection({
    host:'localhost',
    user:'root',
    port:'3306',
    database:'myblogs',
    password:'Developer@0000'
})

export default database