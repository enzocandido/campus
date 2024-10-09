import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import { currentProfile } from "@/lib/current-profile";

export async function GET() {
  try {
    const profile = await currentProfile();

    if (!profile || profile.academicRole !== 'ADMIN') {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const users = await db.user.findMany({
      orderBy: {
        createdAt: "asc",
      },
    });

    console.log("Usuários encontrados:", users);
    return NextResponse.json(users);
  } catch (error) {
    console.log("[USERS_GET]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { userId: string } }
) {
  try {
    const profile = await currentProfile();
    const { userId } = params;

    if (!profile || profile.academicRole !== 'ADMIN') {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!userId) {
      return new NextResponse("User ID missing", { status: 400 });
    }

    await db.user.delete({
      where: {
        id: userId,
      },
    });

    return new NextResponse("User deleted successfully", { status: 200 });
  } catch (error) {
    console.log("[USER_DELETE]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
