"use client";

import { useEffect, useState } from "react";
import { TasksCard } from "@/components/tasks/tasks-card";

interface Task {
  id: string;
  title: string;
  description?: string;
  fileUrl?: string;
  dueDate: string;
  className: string;
  professor?: {
    name: string;
  };
}

export const TasksGrid = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await fetch("/api/academic/tasks");

        if (!response.ok) {
          throw new Error("Erro ao carregar as tarefas");
        }

        const data: Task[] = await response.json();
        setTasks(data);
        console.log(data);
      } catch (error: any) {
        setError(error.message || "Erro desconhecido");
      } finally {
        setIsLoading(false);
      }
    };

    fetchTasks();
  }, []);

  if (isLoading) {
    return <p className="text-center">Carregando...</p>;
  }

  if (error) {
    return <p className="text-center">{error}</p>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
      {tasks.length > 0 ? (
        tasks.map((task: Task) => (
          <TasksCard
            key={task.id}
            title={task.title}
            description={task.description}
            fileUrl={task.fileUrl}
            dueDate={task.dueDate}
            className={task.className}
            professor={task.professor?.name || ""}
          />
        ))
      ) : (
        <p className="text-center">Você não tem tarefas no momento.</p>
      )}
    </div>
  );
};
