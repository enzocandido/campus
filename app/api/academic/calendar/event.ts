import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { currentProfile } from "@/lib/current-profile";

export async function POST(request: Request) {
  try {
    const profile = await currentProfile();

    if (!profile) {
      return NextResponse.json(
        { error: "Usuário não autenticado" },
        { status: 401 }
      );
    }

    const { title, content, start, end } = await request.json();

    const newEvent = await prisma.event.create({
      data: {
        title,
        content,
        start,
        end,
        userId: profile.id, 
      },
    });

    return NextResponse.json(newEvent, { status: 201 });
  } catch (error) {
    console.error("Error creating event:", error);
    return NextResponse.json(
      { error: "Failed to create event" },
      { status: 500 }
    );
  }
}
