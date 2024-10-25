import { currentProfile } from "@/lib/current-profile";
import { auth } from "@clerk/nextjs/server";
import { TasksCard } from "./tasks-card";

export const TasksGrid = async () => {
  const profile = await currentProfile();

  if (!profile) {
    return auth().redirectToSignIn();
  }

  return (
    <div className="h-full">
      <TasksCard name={profile.name} id={profile.id}/>
    </div>
  );
};
