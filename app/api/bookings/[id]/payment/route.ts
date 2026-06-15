import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getSession } from "@/lib/session";

type Params = { params: Promise<{ id: string }> };

export async function POST(request: NextRequest, { params }: Params) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Não autenticado" }, { status: 401 });
  }

  const { id } = await params;
  const booking = await db.booking.findUnique({
    where: { id },
    include: { service: true, payment: true },
  });

  if (!booking) {
    return NextResponse.json(
      { error: "Agendamento não encontrado" },
      { status: 404 }
    );
  }

  if (booking.clientId !== session.userId) {
    return NextResponse.json({ error: "Acesso negado" }, { status: 403 });
  }

  if (booking.payment?.status === "PAID") {
    return NextResponse.json(
      { error: "Este agendamento já foi pago" },
      { status: 400 }
    );
  }

  if (booking.status === "CANCELLED") {
    return NextResponse.json(
      { error: "Não é possível pagar um agendamento cancelado" },
      { status: 400 }
    );
  }

  try {
    const { method } = await request.json();

    if (!method) {
      return NextResponse.json(
        { error: "Método de pagamento obrigatório" },
        { status: 400 }
      );
    }

    await db.$transaction([
      db.payment.upsert({
        where: { bookingId: id },
        update: { status: "PAID", method },
        create: {
          bookingId: id,
          amount: booking.service.price,
          status: "PAID",
          method,
        },
      }),
      db.booking.update({
        where: { id },
        data: { status: "CONFIRMED" },
      }),
    ]);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("[payment]", error);
    return NextResponse.json(
      { error: "Erro ao processar pagamento" },
      { status: 500 }
    );
  }
}
