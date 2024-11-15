import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { currentProfile } from "@/lib/current-profile";

export async function GET() {
  try {
    const profile = await currentProfile();

    if (!profile) {
      return NextResponse.json(
        { error: "Usuário não autenticado" },
        { status: 401 }
      );
    }

    // Buscar todos os servidores que o usuário está participando
    const servers = await prisma.server.findMany({
      where: {
        members: {
          some: {
            userId: profile.id,
          },
        },
      },
      select: {
        id: true,
      },
    });

    const serverIds = servers.map((server) => server.id);

    // Buscar tarefas que pertencem a esses servidores
    const tasks = await prisma.task.findMany({
      where: {
        serverId: {
          in: serverIds,
        },
      },
      select: {
        id: true,
        title: true,
        description: true,
        dueDate: true,
        serverId: true,
      },
    });

    // Criar eventos a partir das tarefas
    const taskEvents = tasks.map((task) => ({
      id: task.id,
      title: task.title,
      content: task.description,
      start: task.dueDate.toISOString(), // Definindo a data de início
      end: task.dueDate.toISOString(),   // Assumindo que a tarefa termina no mesmo momento, você pode ajustar se precisar de duração
      userId: profile.id,                // Associando o evento ao usuário autenticado
    }));

    // Buscar eventos independentes do usuário
    const userEvents = await prisma.event.findMany({
      where: {
        userId: profile.id,
      },
      select: {
        id: true,
        title: true,
        content: true,
        start: true,
        end: true,
      },
    });

    // Combinar eventos de tarefas e eventos independentes
    const events = [...taskEvents, ...userEvents];
    console.log(events)
    return NextResponse.json(events);
  } catch (error) {
    console.error("Error fetching events:", error);
    return NextResponse.json(
      { error: "Failed to fetch events" },
      { status: 500 }
    );
  }
}
