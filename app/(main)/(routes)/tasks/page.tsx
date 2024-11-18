import { TasksGrid } from "@/components/tasks/tasks-grid";
import { TasksHeader } from "@/components/tasks/tasks-header";
import { currentProfile } from "@/lib/current-profile";
import { auth } from "@clerk/nextjs/server";

const Tasks = async () => {
  const profile = await currentProfile();
  if (!profile) {
    return auth().redirectToSignIn();
  }

  return (
    <div className="pb-8">
      <TasksHeader />
      <TasksGrid userRole={profile.academicRole} userId={profile.id} />
    </div>
  );
};

export default Tasks;
