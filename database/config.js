import mysql from 'mysql2'
import env from 'dotenv'
 env.config()

 const database = mysql.createConnection({
    host:process.env.DATABASE_HOST,
    user:process.env.DATABASE_USER,
    port:process.env.DATABASE_PORT,
    database:process.env.DATABASE,
    password:process.env.DATABASE_PASSWORD
})

// database details for your reference 

    // Tables = admin , blogs
    
    // columns in tables = {
    //     admin = user_id, username, password
    //     blogs = id, title, category, description, thumbnail, headline, date
    // }

export default database