// app/api/auth/check/route.js
import { NextResponse } from 'next/server'
import jwt from 'jsonwebtoken'
import pool from '@/lib/db'

export async function GET(request) {
  const authToken = request.cookies.get('authToken')?.value

  if (!authToken) {
    return NextResponse.json({ isAuthenticated: false }, { status: 401 })
  }

  try {
    const decoded = jwt.verify(authToken, process.env.JWT_SECRET)

    // Optionally verify the user still exists in the database
    const [rows] = await pool.query('SELECT id FROM users WHERE id = ?', [
      decoded.userId,
    ])

    if (rows.length === 0) {
      throw new Error('User not found')
    }

    return NextResponse.json({ isAuthenticated: true }, { status: 200 })
  } catch (error) {
    console.error('Auth check error:', error)
    return NextResponse.json({ isAuthenticated: false }, { status: 401 })
  }
}
