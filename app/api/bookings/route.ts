import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getSession } from "@/lib/session";

export async function GET() {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Não autenticado" }, { status: 401 });
  }

  const where =
    session.role === "PROVIDER"
      ? { service: { providerId: session.userId } }
      : { clientId: session.userId };

  const bookings = await db.booking.findMany({
    where,
    include: {
      service: {
        include: { provider: { select: { id: true, name: true } } },
      },
      client: { select: { id: true, name: true, email: true, phone: true } },
      payment: true,
    },
    orderBy: { date: "asc" },
  });

  return NextResponse.json({ bookings });
}

export async function POST(request: NextRequest) {
  const session = await getSession();
  if (!session || session.role !== "CLIENT") {
    return NextResponse.json(
      { error: "Apenas clientes podem agendar serviços" },
      { status: 403 }
    );
  }

  try {
    const { serviceId, date, notes, address } = await request.json();

    if (!serviceId || !date || !address) {
      return NextResponse.json(
        { error: "Serviço, data e endereço são obrigatórios" },
        { status: 400 }
      );
    }

    const service = await db.service.findUnique({
      where: { id: serviceId, isActive: true },
    });

    if (!service) {
      return NextResponse.json(
        { error: "Serviço não encontrado ou indisponível" },
        { status: 404 }
      );
    }

    const booking = await db.booking.create({
      data: {
        clientId: session.userId,
        serviceId,
        date: new Date(date),
        notes: notes || null,
        address,
      },
      include: {
        service: { include: { provider: { select: { id: true, name: true } } } },
        payment: true,
      },
    });

    return NextResponse.json({ booking }, { status: 201 });
  } catch (error) {
    console.error("[create booking]", error);
    return NextResponse.json(
      { error: "Erro interno do servidor" },
      { status: 500 }
    );
  }
}
