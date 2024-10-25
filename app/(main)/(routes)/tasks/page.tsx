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
    <div>
      <TasksHeader />
      <TasksGrid />
    </div>
  );
};

export default Tasks;
