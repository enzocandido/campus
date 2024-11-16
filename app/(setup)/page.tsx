import { redirect } from "next/navigation";

import { InitialModal } from "@/components/modals/initial-modal";
import { ProfessorServerModal } from "@/components/modals/professor-server-modal";
import { StudentServerModal } from "@/components/modals/student-server-modal";
import { db } from "@/lib/db";
import { initialProfile } from "@/lib/initial-profile";

const SetupPage = async () => {
  const profile = await initialProfile();

  const existingServer = await db.server.findFirst({
    where: {
      members: {
        some: {
          userId: profile.id,
        },
      },
    },
  });

  if (existingServer) {
    return redirect(`/home`);
  }

  const user = await db.user.findFirst({
    where: {
      id: profile.id,
    },
    select: {
      course: true,
      university: true,
      academicRole: true,
    },
  });

  if (user?.course && user?.university) {
    if (user.academicRole === "PROFESSOR") {
      return <ProfessorServerModal />;
    }
    if (user.academicRole === "STUDENT") {
      return <StudentServerModal />;
    }
    if (user.academicRole === "ADMIN") {
      return redirect(`/admin`);
    }
  }

  return <InitialModal />;
};

export default SetupPage;
