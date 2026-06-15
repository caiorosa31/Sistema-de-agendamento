import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getSession } from "@/lib/session";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get("category");
  const search = searchParams.get("search");

  const where: Record<string, unknown> = { isActive: true };
  if (category && category !== "Todos") where.category = category;
  if (search) {
    where.OR = [
      { title: { contains: search } },
      { description: { contains: search } },
    ];
  }

  const services = await db.service.findMany({
    where,
    include: {
      provider: { select: { id: true, name: true, avatar: true } },
    },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json({ services });
}

export async function POST(request: NextRequest) {
  const session = await getSession();
  if (!session || session.role !== "PROVIDER") {
    return NextResponse.json({ error: "Acesso negado" }, { status: 403 });
  }

  try {
    const { title, description, price, unit, category, image, duration } =
      await request.json();

    if (!title || !description || !price || !unit || !category || !duration) {
      return NextResponse.json(
        { error: "Preencha todos os campos obrigatórios" },
        { status: 400 }
      );
    }

    const service = await db.service.create({
      data: {
        title,
        description,
        price: Number(price),
        unit,
        category,
        image: image || null,
        duration: Number(duration),
        providerId: session.userId,
      },
    });

    return NextResponse.json({ service }, { status: 201 });
  } catch (error) {
    console.error("[create service]", error);
    return NextResponse.json(
      { error: "Erro interno do servidor" },
      { status: 500 }
    );
  }
}
