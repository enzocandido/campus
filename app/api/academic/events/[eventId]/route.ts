import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { currentProfile } from "@/lib/current-profile";

export async function DELETE(
  request: Request,
  { params }: { params: { eventId: string } },
) {
  try {
    const profile = await currentProfile();

    if (!profile) {
      return NextResponse.json(
        { error: "Usuário não autenticado" },
        { status: 401 },
      );
    }

    const { eventId } = params;

    if (!eventId) {
      return NextResponse.json(
        { error: "ID do evento não fornecido" },
        { status: 400 },
      );
    }

    const event = await prisma.event.findUnique({
      where: { id: eventId },
    });

    if (!event) {
      return NextResponse.json(
        { error: "Evento não encontrado" },
        { status: 404 },
      );
    }

    await prisma.event.delete({
      where: { id: eventId },
    });

    return NextResponse.json(
      { message: "Evento deletado com sucesso" },
      { status: 200 },
    );
  } catch (error) {
    console.error("Erro ao deletar o evento:", error);
    return NextResponse.json(
      { error: "Erro ao deletar o evento" },
      { status: 500 },
    );
  }
}
