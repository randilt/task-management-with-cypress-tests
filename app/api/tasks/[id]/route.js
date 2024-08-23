// app/api/tasks/[id]/route.js
import { NextResponse } from 'next/server'
import pool from '@/lib/db'
import { getUserFromToken } from '@/lib/auth'

export async function PUT(request, { params }) {
  try {
    const user = await getUserFromToken(request)
    if (!user) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
    }

    const { id } = params
    const { completed } = await request.json()

    const [result] = await pool.query(
      'UPDATE tasks SET completed = ? WHERE id = ? AND user_id = ?',
      [completed, id, user.id]
    )

    if (result.affectedRows === 0) {
      return NextResponse.json(
        { message: 'Task not found or not owned by user' },
        { status: 404 }
      )
    }

    return NextResponse.json({ message: 'Task updated successfully' })
  } catch (error) {
    console.error('Error updating task:', error)
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function DELETE(request, { params }) {
  try {
    const user = await getUserFromToken(request)
    if (!user) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
    }

    const { id } = params

    const [result] = await pool.query(
      'DELETE FROM tasks WHERE id = ? AND user_id = ?',
      [id, user.id]
    )

    if (result.affectedRows === 0) {
      return NextResponse.json(
        { message: 'Task not found or not owned by user' },
        { status: 404 }
      )
    }

    return NextResponse.json({ message: 'Task deleted successfully' })
  } catch (error) {
    console.error('Error deleting task:', error)
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    )
  }
}
