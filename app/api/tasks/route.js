import { NextResponse } from 'next/server'
import pool from '@/lib/db'

export async function GET() {
  try {
    const connection = await pool.getConnection()
    const [rows] = await connection.query(
      'SELECT * FROM tasks ORDER BY created_at DESC'
    )
    connection.release()
    return NextResponse.json(rows)
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

export async function POST(request) {
  try {
    const { title, description, priority } = await request.json()
    const connection = await pool.getConnection()
    const [result] = await connection.query(
      'INSERT INTO tasks (title, description, priority) VALUES (?, ?, ?)',
      [title, description, priority]
    )
    connection.release()
    return NextResponse.json({
      id: result.insertId,
      title,
      description,
      priority,
      completed: false,
    })
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
