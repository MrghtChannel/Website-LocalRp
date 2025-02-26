import { NextRequest, NextResponse } from 'next/server';
import mysql from 'mysql2/promise';

// Підключення до бази даних
async function connectToDB() {
  return await mysql.createConnection({
    host: process.env.DB_HOST_1,
    user: process.env.DB_USER_1,
    password: process.env.DB_PASSWORD_1,
    database: process.env.DB_NAME_1,
    port: Number(process.env.DB_PORT_1),
  });
}

// Оновлення статусу платежу
async function updatePaymentStatus(sessionId: string, status: string) {
  const db = await connectToDB();
  const query = `UPDATE payments SET status = ? WHERE stripe_session_id = ?`;
  await db.execute(query, [status, sessionId]);
  await db.end();
}

// Обробка запиту від Stripe Webhook
export async function POST(req: NextRequest) {
  try {
    const event = await req.json();

    switch (event.type) {
      case 'checkout.session.completed':
        const session = event.data.object;
        await updatePaymentStatus(session.id, 'paid');
        console.log(`Платіж ${session.id} підтверджено`);
        break;
      case 'checkout.session.expired':
        await updatePaymentStatus(event.data.object.id, 'expired');
        console.log(`Платіж ${event.data.object.id} скасовано`);
        break;
      default:
        console.log(`Невідомий тип події: ${event.type}`);
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error('Помилка вебхука Stripe:', error);
    return NextResponse.json({ error: 'Помилка вебхука' }, { status: 400 });
  }
}
