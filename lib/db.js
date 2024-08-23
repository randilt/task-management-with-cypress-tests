import mysql from 'mysql2/promise'

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT, 10),
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: parseInt(process.env.DB_CONNECTION_LIMIT, 10),
  queueLimit: parseInt(process.env.DB_QUEUE_LIMIT, 10),
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
