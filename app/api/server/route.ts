import { NextRequest } from 'next/server';
import axios from 'axios';

export async function GET(req: NextRequest) {
  const SERVER_IP = process.env.SERVER_IP;

  if (!SERVER_IP) {
    return Response.json({ error: "SERVER_IP не вказано в .env.local" }, { status: 500 });
  }

  try {
    const response = await axios.get("https://cdn.rage.mp/master/");
    const servers = response.data;

    if (servers[SERVER_IP]) {
      return Response.json({ serverIP: SERVER_IP, players: servers[SERVER_IP].players });
    } else {
      return Response.json({ error: "Сервер не знайдено" }, { status: 404 });
    }
  } catch (error) {
    console.error("Помилка запиту до RageMP Master:", error);
    return Response.json({ error: "Помилка запиту" }, { status: 500 });
  }
}
