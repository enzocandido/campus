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

export async function DELETE(
  req: Request,
  { params }: { params: { serverId: string } }
) {
  try {
    const profile = await currentProfile();
    const { serverId } = params;

    if (!profile || profile.academicRole !== 'ADMIN') {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!serverId) {
      return new NextResponse("Server ID missing", { status: 400 });
    }

    await db.server.delete({
      where: {
        id: serverId,
      },
    });

    return new NextResponse("Server deleted successfully", { status: 200 });
  } catch (error) {
    console.log("[SERVER_DELETE]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
