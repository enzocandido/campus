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

    const submissions = await prisma.submission.findMany({
      where: {
        studentId: profile.id,
      },
      select: {
        id: true,
        content: true,
        fileUrl: true,
        submittedAt: true,
        taskId: true,
        graded: true,
        feedback: true,
        createdAt: true,
      },
    });

    return NextResponse.json(submissions);
  } catch (error) {
    console.error("Erro ao buscar submissões:", error);
    return NextResponse.json(
      { error: "Erro ao buscar submissões" },
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

    const { taskId, fileUrl, content } = data;

    if (!taskId || !content) {
      return NextResponse.json(
        { error: "Faltam dados obrigatórios" },
        { status: 400 },
      );
    }

    const submission = await prisma.submission.create({
      data: {
        id: uuidv4(),
        fileUrl: fileUrl,
        content: content,
        taskId: taskId,
        studentId: profile.id,
      },
    });

    return NextResponse.json(submission, { status: 201 });
  } catch (error) {
    console.error("Erro ao criar a submissão:", error);
    return NextResponse.json(
      { error: "Erro ao criar a submissão" },
      { status: 500 },
    );
  }
}
