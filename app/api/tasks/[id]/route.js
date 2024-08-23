import { NextResponse } from 'next/server'
import pool from '@/lib/db'

export async function PUT(request, { params }) {
  try {
    const { id } = params
    const { completed } = await request.json()
    const connection = await pool.getConnection()
    await connection.query('UPDATE tasks SET completed = ? WHERE id = ?', [
      completed,
      id,
    ])
    connection.release()
    return NextResponse.json({ message: 'Task updated successfully' })
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

export async function DELETE(request, { params }) {
  try {
    const { id } = params
    const connection = await pool.getConnection()
    await connection.query('DELETE FROM tasks WHERE id = ?', [id])
    connection.release()
    return NextResponse.json({ message: 'Task deleted successfully' })
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
