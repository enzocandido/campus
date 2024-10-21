import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { v4 as uuidv4 } from "uuid";
import { currentProfile } from "@/lib/current-profile";

export async function GET() {
  try {
    const tasks = await prisma.task.findMany({
      select: {
        id: true,
        title: true,
        dueDate: true,
        professor: {
          select: { name: true },
        },
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
