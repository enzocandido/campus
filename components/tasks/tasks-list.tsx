import { motion } from "framer-motion";
import { TasksCard } from "@/components/tasks/tasks-card";
import { SubmissionsList } from "./tasks-submissions";
import { Task } from "@/types";
import { isPast } from "date-fns";
import { AlertCircle } from "lucide-react";

interface TaskListProps {
  filteredTasks: Task[];
  userRole: string;
  userId: string;
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
}

export function TaskList({
  filteredTasks,
  userRole,
  userId,
  setTasks,
}: TaskListProps) {
  if (filteredTasks.length === 0) {
    return (
      <motion.div
        className="flex flex-col items-center justify-center h-64 text-muted-foreground"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <AlertCircle className="h-8 w-8 mb-2" />
        <p>Nenhuma tarefa encontrada.</p>
      </motion.div>
    );
  }

  return (
    <motion.div
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {filteredTasks.map((task: Task) => (
        <motion.div
          key={task.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.2 }}
        >
          <TasksCard
            userRole={userRole}
            title={task.title}
            id={task.id}
            description={task.description}
            fileUrl={task.fileUrl}
            dueDate={task.dueDate}
            className={task.className}
            professor={task.professor?.name || ""}
            status={isPast(new Date(task.dueDate)) ? "expired" : "pending"}
            isSubmitted={task.submissions.some(
              (sub) => sub.studentId === userId,
            )}
            feedback={
              task.submissions.find((sub) => sub.studentId === userId)
                ?.feedback || ""
            }
            grade={
              task.submissions.find((sub) => sub.studentId === userId)
                ?.status === "approved"
                ? "approved"
                : task.submissions.find((sub) => sub.studentId === userId)
                    ?.status === "rejected"
                ? "rejected"
                : undefined
            }
            isGraded={
              task.submissions.find((sub) => sub.studentId === userId)
                ?.graded || false
            }
          />
          {userRole === "PROFESSOR" && task.submissions.length > 0 && (
            <SubmissionsList task={task} setTasks={setTasks} />
          )}
        </motion.div>
      ))}
    </motion.div>
  );
}
