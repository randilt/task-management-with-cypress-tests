// app/api/tasks/route.js
import { NextResponse } from 'next/server'
import pool from '@/lib/db'
import { getUserFromToken } from '@/lib/auth'

export async function POST(request) {
  try {
    const user = await getUserFromToken(request)
    if (!user) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
    }

    const { title, description, priority } = await request.json()
    const [result] = await pool.query(
      'INSERT INTO tasks (title, description, priority, user_id) VALUES (?, ?, ?, ?)',
      [title, description, priority, user.id]
    )

    // Fetch the newly created task
    const [newTasks] = await pool.query('SELECT * FROM tasks WHERE id = ?', [
      result.insertId,
    ])

    if (newTasks.length === 0) {
      throw new Error('Failed to retrieve the created task')
    }

    const newTask = newTasks[0]

    return NextResponse.json(newTask, { status: 201 })
  } catch (error) {
    console.error('Error creating task:', error)
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function GET(request) {
  try {
    const user = await getUserFromToken(request)
    if (!user) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
    }

    const [tasks] = await pool.query(
      'SELECT * FROM tasks WHERE user_id = ? ORDER BY created_at DESC',
      [user.id]
    )
    return NextResponse.json(tasks)
  } catch (error) {
    console.error('Error fetching tasks:', error)
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    )
  }
}
