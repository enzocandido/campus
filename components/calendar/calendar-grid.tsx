import { currentProfile } from "@/lib/current-profile";
import { auth } from "@clerk/nextjs/server";
import { CalendarCard } from "./calendar-card";

export const CalendarGrid = async () => {
  const profile = await currentProfile();

  if (!profile) {
    return auth().redirectToSignIn();
  }

  return (
    <div className="h-full">
      <CalendarCard name={profile.name} id={profile.id} />
    </div>
  );
};
