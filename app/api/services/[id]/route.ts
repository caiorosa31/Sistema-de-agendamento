import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getSession } from "@/lib/session";

type Params = { params: Promise<{ id: string }> };

export async function GET(_: NextRequest, { params }: Params) {
  const { id } = await params;

  const service = await db.service.findUnique({
    where: { id },
    include: {
      provider: { select: { id: true, name: true, avatar: true, bio: true } },
    },
  });

  if (!service) {
    return NextResponse.json(
      { error: "Serviço não encontrado" },
      { status: 404 }
    );
  }

  return NextResponse.json({ service });
}

export async function PUT(request: NextRequest, { params }: Params) {
  const session = await getSession();
  if (!session || session.role !== "PROVIDER") {
    return NextResponse.json({ error: "Acesso negado" }, { status: 403 });
  }

  const { id } = await params;
  const service = await db.service.findUnique({ where: { id } });

  if (!service || service.providerId !== session.userId) {
    return NextResponse.json(
      { error: "Serviço não encontrado" },
      { status: 404 }
    );
  }

  try {
    const { title, description, price, unit, category, image, duration, isActive } =
      await request.json();

    const updated = await db.service.update({
      where: { id },
      data: {
        title,
        description,
        price: Number(price),
        unit,
        category,
        image: image || null,
        duration: Number(duration),
        isActive: Boolean(isActive),
      },
    });

    return NextResponse.json({ service: updated });
  } catch (error) {
    console.error("[update service]", error);
    return NextResponse.json(
      { error: "Erro interno do servidor" },
      { status: 500 }
    );
  }
}

export async function DELETE(_: NextRequest, { params }: Params) {
  const session = await getSession();
  if (!session || session.role !== "PROVIDER") {
    return NextResponse.json({ error: "Acesso negado" }, { status: 403 });
  }

  const { id } = await params;
  const service = await db.service.findUnique({ where: { id } });

  if (!service || service.providerId !== session.userId) {
    return NextResponse.json(
      { error: "Serviço não encontrado" },
      { status: 404 }
    );
  }

  await db.service.delete({ where: { id } });
  return NextResponse.json({ success: true });
}
