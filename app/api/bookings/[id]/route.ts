import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getSession } from "@/lib/session";

type Params = { params: Promise<{ id: string }> };

export async function GET(_: NextRequest, { params }: Params) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Não autenticado" }, { status: 401 });
  }

  const { id } = await params;
  const booking = await db.booking.findUnique({
    where: { id },
    include: {
      service: {
        include: { provider: { select: { id: true, name: true, avatar: true } } },
      },
      client: { select: { id: true, name: true, email: true, phone: true } },
      payment: true,
    },
  });

  if (!booking) {
    return NextResponse.json(
      { error: "Agendamento não encontrado" },
      { status: 404 }
    );
  }

  const isClient = booking.clientId === session.userId;
  const isProvider = booking.service.provider.id === session.userId;

  if (!isClient && !isProvider) {
    return NextResponse.json({ error: "Acesso negado" }, { status: 403 });
  }

  return NextResponse.json({ booking });
}

export async function PUT(request: NextRequest, { params }: Params) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Não autenticado" }, { status: 401 });
  }

  const { id } = await params;
  const booking = await db.booking.findUnique({ where: { id } });

  if (!booking) {
    return NextResponse.json(
      { error: "Agendamento não encontrado" },
      { status: 404 }
    );
  }

  if (booking.clientId !== session.userId) {
    return NextResponse.json({ error: "Acesso negado" }, { status: 403 });
  }

  if (booking.status === "CANCELLED" || booking.status === "COMPLETED") {
    return NextResponse.json(
      { error: "Não é possível editar este agendamento" },
      { status: 400 }
    );
  }

  try {
    const { date, notes, address } = await request.json();

    const updated = await db.booking.update({
      where: { id },
      data: {
        ...(date && { date: new Date(date) }),
        ...(notes !== undefined && { notes }),
        ...(address && { address }),
      },
      include: {
        service: {
          include: { provider: { select: { id: true, name: true } } },
        },
        payment: true,
      },
    });

    return NextResponse.json({ booking: updated });
  } catch (error) {
    console.error("[update booking]", error);
    return NextResponse.json(
      { error: "Erro interno do servidor" },
      { status: 500 }
    );
  }
}

export async function DELETE(_: NextRequest, { params }: Params) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Não autenticado" }, { status: 401 });
  }

  const { id } = await params;
  const booking = await db.booking.findUnique({ where: { id } });

  if (!booking) {
    return NextResponse.json(
      { error: "Agendamento não encontrado" },
      { status: 404 }
    );
  }

  if (booking.clientId !== session.userId) {
    return NextResponse.json({ error: "Acesso negado" }, { status: 403 });
  }

  if (booking.status === "CONFIRMED") {
    return NextResponse.json(
      { error: "Agendamentos confirmados não podem ser cancelados por aqui. Entre em contato com o suporte." },
      { status: 400 }
    );
  }

  const updated = await db.booking.update({
    where: { id },
    data: { status: "CANCELLED" },
  });

  return NextResponse.json({ booking: updated });
}
