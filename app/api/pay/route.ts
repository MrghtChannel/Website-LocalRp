import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import mysql from 'mysql2/promise';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: '2025-01-27.acacia',
});

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

// Створення таблиці, якщо її ще немає
async function createPaymentsTable() {
  const db = await connectToDB();
  await db.execute(`
    CREATE TABLE IF NOT EXISTS payments (
        id INT AUTO_INCREMENT PRIMARY KEY,
        email VARCHAR(255) NOT NULL,
        amount DECIMAL(10,2) NOT NULL,
        payment_method VARCHAR(50) NOT NULL,
        status VARCHAR(50) NOT NULL DEFAULT 'pending',
        stripe_session_id VARCHAR(255),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `);
  await db.end();
}

// Збереження платежу
async function savePayment(email: string, amount: number, paymentMethod: string, status: string, sessionId?: string) {
  await createPaymentsTable();
  const db = await connectToDB();
  const query = `
    INSERT INTO payments (email, amount, payment_method, status, stripe_session_id, created_at)
    VALUES (?, ?, ?, ?, ?, NOW())
  `;
  await db.execute(query, [email, amount, paymentMethod, status, sessionId || null]);
  await db.end();
}

// Обробка запиту POST для створення платежу
export async function POST(req: NextRequest) {
  try {
    console.log('Отримано запит на оплату');
    const { email, amount, paymentMethod } = await req.json();
    console.log('Отримані дані:', { email, amount, paymentMethod });

    if (!email || !amount || !paymentMethod) {
      console.error('Некоректні дані:', { email, amount, paymentMethod });
      return NextResponse.json({ error: 'Некоректні дані' }, { status: 400 });
    }

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
    if (!baseUrl) {
      console.error('NEXT_PUBLIC_BASE_URL не налаштовано');
      return NextResponse.json({ error: 'Помилка конфігурації сервера' }, { status: 500 });
    }

    console.log('BASE URL:', baseUrl);
    let checkoutUrl: string = "";
    let status = 'pending';
    let sessionId: string | undefined;

    if (paymentMethod === 'stripe') {
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        customer_email: email,
        line_items: [
          {
            price_data: {
              currency: 'uah',
              product_data: {
                name: `Поповнення рахунку на ${email}`,
              },
              unit_amount: Math.round(parseFloat(amount) * 100),
            },
            quantity: 1,
          },
        ],
        mode: 'payment',
        success_url: `${baseUrl}/success`,
        cancel_url: `${baseUrl}/cancel`,
      });
      checkoutUrl = session.url || "";
      sessionId = session.id;
    } else {
      return NextResponse.json({ error: 'Непідтримуваний метод оплати' }, { status: 400 });
    }

    await savePayment(email, parseFloat(amount), paymentMethod, status, sessionId);
    return NextResponse.json({ checkout_url: checkoutUrl });
  } catch (error) {
    console.error('Помилка створення платежу:', error);
    return NextResponse.json({ error: 'Помилка створення платежу' }, { status: 500 });
  }
}
