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
        description: true,
        dueDate: true,
        serverId: true,
      },
    });

    const taskEvents = tasks.map((task) => ({
      id: task.id,
      title: task.title,
      content: task.description,
      start: task.dueDate.toISOString(),
      end: task.dueDate.toISOString(),
      userId: profile.id,
    }));

    const userEvents = await prisma.event.findMany({
      where: {
        userId: profile.id,
      },
      select: {
        id: true,
        title: true,
        description: true,
        startDate: true,
        endDate: true,
      },
    });

    const events = userEvents.map((event) => ({
      id: event.id,
      title: event.title,
      description: event.description,
      start: event.startDate.toISOString(),
      end: event.endDate.toISOString(),
    }));

    const allEvents = [...taskEvents, ...events];

    console.log(allEvents);
    return NextResponse.json(allEvents);
  } catch (error) {
    console.error("Error fetching events:", error);
    return NextResponse.json(
      { error: "Failed to fetch events" },
      { status: 500 },
    );
  }
}
