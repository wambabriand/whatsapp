const { makeDb } = require('mysql-async-simple');
const mysql = require('mysql');
require('dotenv').config();


const executeQuery =  query => {
    
    const connection = mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        port: process.env.DB_PORT,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DB,
    });
  
    connection.connect();
    return connection.query(query);
} 

const executeQueryAsync = async (query) => {
    
    const connection = mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        port: process.env.DB_PORT,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DB,
    });
  
    const db = makeDb();
    try {
        await db.connect(connection);
        const result = await db.query(connection, query);
        await db.close(connection);
        return result;
    } catch (e) {
        throw e;
    }
    
} 

module.exports = { 
    executeQueryAsync,
    executeQuery
}

