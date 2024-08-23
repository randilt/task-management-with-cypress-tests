// lib/auth.js
import jwt from 'jsonwebtoken'
import pool from './db'

export async function getUserFromToken(request) {
  const token = request.cookies.get('authToken')?.value
  if (!token) return null

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    const [users] = await pool.query(
      'SELECT id, email FROM users WHERE id = ?',
      [decoded.userId]
    )
    return users[0] || null
  } catch (error) {
    console.error('Error verifying token:', error)
    return null
  }
}
