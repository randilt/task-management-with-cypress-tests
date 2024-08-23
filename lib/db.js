import mysql from 'mysql2/promise'

const pool = mysql.createPool({
  host: 'localhost',
  port: 3307, // Updated port number
  user: 'root',
  password: '',
  database: 'task_mgr_pulseid',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
})

// Test the connection
pool
  .getConnection()
  .then((connection) => {
    console.log('Successfully connected to the database.')
    connection.release()
  })
  .catch((err) => {
    console.error('Error connecting to the database:', err)
  })

export default pool
