import { currentProfile } from "@/lib/current-profile";
import { auth } from "@clerk/nextjs/server";
import { DashboardProfileCard } from "./dashboard-profile-card";
import { DashboardCalendar } from "./dashboard-calendar";
import { DashboardWarnings } from "./dashboard-warnings";
import { DashboardTaskCard } from "./dashboard-task-card";

export const DashboardGrid = async () => {
  const profile = await currentProfile();

  if (!profile) {
    return auth().redirectToSignIn();
  }

  return (
    <div className="flex justify-center">
      <div className="md:grid grid-cols-4">
        <DashboardProfileCard
          name={profile.name}
          ra={profile.ra || ""}
          email={profile.email}
          imageUrl={profile.imageUrl}
          university={profile.university || "Não informado."}
          course={profile.course || "Não informado."}
        />
        <DashboardCalendar name={profile.name} id={profile.id} />
        <DashboardWarnings name={profile.name} id={profile.id} />
        <DashboardTaskCard name={profile.name} id={profile.id} />
      </div>
    </div>
  );
};
