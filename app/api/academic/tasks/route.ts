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
        fileUrl: true,
        dueDate: true,
        className: true,
        professor: {
          select: { name: true },
        },
        submissions: {
          select: {
            id: true,
            studentId: true,
          },
        },
      },
    });

    return NextResponse.json(tasks);
  } catch (error) {
    console.error("Error fetching tasks:", error);
    return NextResponse.json(
      { error: "Failed to fetch tasks" },
      { status: 500 },
    );
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const profile = await currentProfile();

    const task = await prisma.task.create({
      data: {
        id: uuidv4(),
        title: data.title,
        description: data.description || "",
        fileUrl: data.fileUrl || "",
        dueDate: new Date(data.dueDate),
        professor: {
          connect: { id: profile?.id },
        },
        className: data.className,
        server: {
          connect: { id: data.serverId },
        },
      },
    });

    return NextResponse.json(task, { status: 201 });
  } catch (error) {
    console.error("Erro ao criar a tarefa:", error);
    return NextResponse.json(
      { error: "Erro ao criar a tarefa" },
      { status: 500 },
    );
  }
}
