import { NextRequest, NextResponse } from 'next/server';
import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

const pool = mysql.createPool({
  host: process.env.DB_HOST_1,
  user: process.env.DB_USER_1,
  password: process.env.DB_PASSWORD_1,
  database: process.env.DB_NAME_1,
  port: Number(process.env.DB_PORT_1),
});

export async function GET(req: NextRequest) {
  try {
    const [results] = await pool.query(
      'SELECT title, text, channel_id, role_id, image_url, created_at FROM messages'
    );

    return new NextResponse(JSON.stringify(results, null, 2), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Помилка при запиті до бази даних:', error);
    return new NextResponse('Помилка сервера', { status: 500 });
  }
}
