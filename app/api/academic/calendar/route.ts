import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { currentProfile } from "@/lib/current-profile";

export async function GET() {
  try {
    const profile = await currentProfile();

    if (!profile) {
      return NextResponse.json(
        { error: "Usuário não autenticado" },
        { status: 401 },
      );
    }

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

    const tasks = await prisma.task.findMany({
      where: {
        serverId: {
          in: serverIds,
        },
      },
      select: {
        id: true,
        title: true,
        dueDate: true,
      },
    });

    const events = tasks.map((task) => ({
      id: task.id,
      title: task.title,
      start: task.dueDate.toISOString(),
      allDay: false,
    }));

    return NextResponse.json(events);
  } catch (error) {
    console.error("Error fetching tasks:", error);
    return NextResponse.json(
      { error: "Failed to fetch tasks" },
      { status: 500 },
    );
  }
}
