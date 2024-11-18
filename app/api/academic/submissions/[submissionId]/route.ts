import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const { submissionId, feedback, status, graded } = await req.json();

    if (!submissionId || !status || typeof graded !== "boolean") {
      return NextResponse.json(
        { error: "Parâmetros inválidos ou incompletos." },
        { status: 400 },
      );
    }

    const submission = await prisma.submission.update({
      where: { id: submissionId },
      data: {
        feedback,
        status,
        graded,
      },
    });

    return NextResponse.json({ success: true, submission });
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Erro desconhecido.";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
