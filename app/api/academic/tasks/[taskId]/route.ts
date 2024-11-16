import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { currentProfile } from "@/lib/current-profile";

export async function DELETE(
  request: Request,
  { params }: { params: { taskId: string } },
) {
  try {
    const profile = await currentProfile();

    if (!profile) {
      return NextResponse.json(
        { error: "Usuário não autenticado" },
        { status: 401 },
      );
    }

    const { taskId } = params;

    if (!taskId) {
      return NextResponse.json(
        { error: "ID da tarefa não fornecido" },
        { status: 400 },
      );
    }

    const task = await prisma.task.findUnique({
      where: { id: taskId },
    });

    if (!task) {
      return NextResponse.json(
        { error: "Tarefa não encontrada" },
        { status: 404 },
      );
    }

    const server = await prisma.server.findUnique({
      where: { id: task.serverId },
      include: {
        members: {
          where: {
            userId: profile.id,
          },
        },
      },
    });

    if (!server) {
      return NextResponse.json({ error: "Permissão negada" }, { status: 403 });
    }

    await prisma.task.delete({
      where: { id: taskId },
    });

    return NextResponse.json(
      { message: "Tarefa deletada com sucesso" },
      { status: 200 },
    );
  } catch (error) {
    console.error("Erro ao deletar a tarefa:", error);
    return NextResponse.json(
      { error: "Erro ao deletar a tarefa" },
      { status: 500 },
    );
  }
}
