"use client";

import { useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";
import { TaskFilters } from "./tasks-filter";
import { TaskList } from "./tasks-list";
import { Loader2, AlertCircle } from "lucide-react";
import { Task } from "@/types";
import { isPast } from "date-fns";

interface TasksGridProps {
  userRole: string;
  userId: string;
}

export function TasksGrid({ userRole, userId }: TasksGridProps) {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filteredTasks, setFilteredTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [statusFilter, setStatusFilter] = useState<
    "all" | "pending" | "expired" | "submitted"
  >("all");
  const [classFilter, setClassFilter] = useState<string>("all");
  const [dateFilter, setDateFilter] = useState<Date | undefined>(undefined);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const tasksResponse = await fetch("/api/academic/tasks");
        const tasksData: Task[] = await tasksResponse.json();
        setTasks(tasksData);
        setFilteredTasks(tasksData);
      } catch (error: any) {
        setError(error.message || "Erro desconhecido");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const now = new Date();
    const filtered = tasks.filter((task) => {
      const taskStatus = isPast(new Date(task.dueDate)) ? "expired" : "pending";
      const isSubmitted = task.submissions.some(
        (sub) => sub.studentId === userId,
      );
      return (
        (task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          task.className.toLowerCase().includes(searchTerm.toLowerCase()) ||
          task.professor?.name
            .toLowerCase()
            .includes(searchTerm.toLowerCase())) &&
        (statusFilter === "all" ||
          (statusFilter === "submitted" && isSubmitted) ||
          (statusFilter !== "submitted" && taskStatus === statusFilter)) &&
        (classFilter === "all" || task.className === classFilter) &&
        (!dateFilter ||
          new Date(task.dueDate).toDateString() === dateFilter.toDateString())
      );
    });
    const sorted = [...filtered].sort((a, b) => {
      const dateA = new Date(a.dueDate).getTime();
      const dateB = new Date(b.dueDate).getTime();
      return sortOrder === "asc" ? dateA - dateB : dateB - dateA;
    });
    setFilteredTasks(sorted);
  }, [
    tasks,
    searchTerm,
    sortOrder,
    statusFilter,
    classFilter,
    dateFilter,
    userId,
  ]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-64 text-destructive">
        <AlertCircle className="h-8 w-8 mb-2" />
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 px-8 py-8 md:py-0">
      <TaskFilters
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        sortOrder={sortOrder}
        setSortOrder={setSortOrder}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
        classFilter={classFilter}
        setClassFilter={setClassFilter}
        dateFilter={dateFilter}
        setDateFilter={setDateFilter}
        uniqueClasses={Array.from(new Set(tasks.map((task) => task.className)))}
      />
      <AnimatePresence>
        <TaskList
          filteredTasks={filteredTasks}
          userRole={userRole}
          userId={userId}
          setTasks={setTasks}
        />
      </AnimatePresence>
    </div>
  );
}
