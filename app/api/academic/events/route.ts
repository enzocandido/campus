import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { currentProfile } from "@/lib/current-profile";
import { v4 as uuidv4 } from "uuid";

export async function GET() {
  try {
    const profile = await currentProfile();

    if (!profile) {
      return NextResponse.json(
        { error: "Usuário não autenticado" },
        { status: 401 },
      );
    }

    const events = await prisma.event.findMany({
      select: {
        id: true,
        title: true,
        description: true,
        location: true,
        startDate: true,
        endDate: true,
      },
    });

    return NextResponse.json(events);
  } catch (error) {
    console.error("Erro ao buscar eventos:", error);
    return NextResponse.json(
      { error: "Erro ao buscar eventos" },
      { status: 500 },
    );
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const profile = await currentProfile();

    if (!profile) {
      return NextResponse.json(
        { error: "Usuário não autenticado" },
        { status: 401 },
      );
    }

    const event = await prisma.event.create({
      data: {
        id: uuidv4(),
        title: data.title,
        description: data.description || "",
        location: data.location || "",
        startDate: new Date(data.startDate),
        endDate: new Date(data.endDate),
        userId: profile.id,
      },
    });

    return NextResponse.json(event, { status: 201 });
  } catch (error) {
    console.error("Erro ao criar o evento:", error);
    return NextResponse.json(
      { error: "Erro ao criar o evento" },
      { status: 500 },
    );
  }
}
