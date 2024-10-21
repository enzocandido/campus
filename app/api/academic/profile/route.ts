import { NextResponse } from "next/server";
import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { AcademicRole } from "@prisma/client";

export async function PATCH(req: Request) {
  try {
    const { academicRole, ra, course, university } = await req.json();
    const profile = await currentProfile();

    if (!profile) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const updatedUser = await db.user.update({
      where: { id: profile.id },
      data: {
        academicRole: academicRole
          ? AcademicRole.PROFESSOR
          : AcademicRole.STUDENT,
        ra,
        course,
        university,
      },
    });

    return NextResponse.json(updatedUser);
  } catch (error) {
    console.log("[ACADEMIC_VALUES_PATCH]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
