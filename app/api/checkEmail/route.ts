import { NextResponse } from "next/server";
import mysql from "mysql2/promise";

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    const connection = await mysql.createConnection({
      host: process.env.DB_HOST_2,
      user: process.env.DB_USER_2,
      password: process.env.DB_PASSWORD_2,
      database: process.env.DB_NAME_2,
      port: Number(process.env.DB_PORT_2),
    });

    const [rows] = await connection.execute(
      "SELECT COUNT(*) as count FROM accounts WHERE email = ?",
      [email]
    );

    await connection.end();

    const count = (rows as any)[0]?.count || 0;

    return NextResponse.json({ exists: count > 0 });
  } catch (error) {
    console.error("Database error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
