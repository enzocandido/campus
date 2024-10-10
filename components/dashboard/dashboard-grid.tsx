import { currentProfile } from "@/lib/current-profile";
import { auth } from "@clerk/nextjs/server";
import { DashboardCalendar } from "./dashboard-calendar";
import { DashboardTaskCard } from "./dashboard-task-card";

export const DashboardGrid = async () => {
  const profile = await currentProfile();

  if (!profile) {
    return auth().redirectToSignIn();
  }

  return (
    <div className="h-full">
        <DashboardTaskCard name={profile.name} id={profile.id} />
        <DashboardCalendar name={profile.name} id={profile.id} />
    </div>
  );
};
