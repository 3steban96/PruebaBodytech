const mysql = require("mysql2/promise");

const pool = mysql.createPool({
    connectionLimit: 10, 
    host: 'localhost', 
    user: 'root',
    database: 'prueba',
    nestTables: false, 
});

pool.getConnection((err, connection) => {
    if (err) {
        console.error('Error de conexión: ', err);
        return;
    }
    console.log('Conectado a la base de datos');
    connection.release(); // libera la conexión de vuelta al pool
});

module.exports = pool;