const mysql = require("mysql2/promise");

const pool = mysql.createPool({
    connectionLimit: 10, 
    host: 'nozomi.proxy.rlwy.net',  // Host de Railway
    port: 44095, // Puerto de Railway
    user: 'root',
    password: 'WobIpWjilNdXqyqCaZlpqGLJPmhqxuvb', // Contraseña de Railway
    database: 'railway',
    waitForConnections: true,
    queueLimit: 0
});

(async () => {
    try {
        const connection = await pool.getConnection();
        console.log('Conectado a la base de datos en Railway');
        connection.release();
    } catch (err) {
        console.error('Error de conexión: ', err);
    }
})();

module.exports = pool;
