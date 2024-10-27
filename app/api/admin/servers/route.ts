import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import { currentProfile } from "@/lib/current-profile";

export async function GET() {
  try {
    const profile = await currentProfile();

    if (!profile || profile.academicRole !== 'ADMIN') {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const servers = await db.server.findMany({
      include: {
        members: {
          include: {
            user: true,
          },
        },
        channels: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    return NextResponse.json(servers);
  } catch (error) {
    console.log("[SERVERS_GET]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
