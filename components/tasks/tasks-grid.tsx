"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TasksCard } from "@/components/tasks/tasks-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Loader2,
  AlertCircle,
  Search,
  SortAsc,
  SortDesc,
  Filter,
} from "lucide-react";

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
  status: "pending" | "completed";
}

export function TasksGrid() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filteredTasks, setFilteredTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [statusFilter, setStatusFilter] = useState<
    "all" | "pending" | "completed"
  >("all");
  const [classFilter, setClassFilter] = useState<string>("all");

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await fetch("/api/academic/tasks");
        if (!response.ok) {
          throw new Error("Erro ao carregar as tarefas");
        }
        const data: Task[] = await response.json();
        setTasks(data);
        setFilteredTasks(data);
      } catch (error: any) {
        setError(error.message || "Erro desconhecido");
      } finally {
        setIsLoading(false);
      }
    };

    fetchTasks();
  }, []);

  useEffect(() => {
    const filtered = tasks.filter(
      (task) =>
        (task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          task.className.toLowerCase().includes(searchTerm.toLowerCase()) ||
          task.professor?.name
            .toLowerCase()
            .includes(searchTerm.toLowerCase())) &&
        (statusFilter === "all" || task.status === statusFilter) &&
        (classFilter === "all" || task.className === classFilter),
    );
    const sorted = [...filtered].sort((a, b) => {
      const dateA = new Date(a.dueDate).getTime();
      const dateB = new Date(b.dueDate).getTime();
      return sortOrder === "asc" ? dateA - dateB : dateB - dateA;
    });
    setFilteredTasks(sorted);
  }, [tasks, searchTerm, sortOrder, statusFilter, classFilter]);

  const uniqueClasses = Array.from(
    new Set(tasks.map((task) => task.className)),
  );

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
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
        <div className="relative w-full sm:w-64">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Pesquisar tarefas..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-8"
          />
        </div>
        <div className="flex gap-2">
          <Select
            value={sortOrder}
            onValueChange={(value: "asc" | "desc") => setSortOrder(value)}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Ordenar por data" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="asc">
                <div className="flex items-center">
                  <SortAsc className="mr-2 h-4 w-4" />
                  Mais próxima
                </div>
              </SelectItem>
              <SelectItem value="desc">
                <div className="flex items-center">
                  <SortDesc className="mr-2 h-4 w-4" />
                  Mais distante
                </div>
              </SelectItem>
            </SelectContent>
          </Select>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">
                <Filter className="mr-2 h-4 w-4" />
                Filtros
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>Status</DropdownMenuLabel>
              <DropdownMenuItem onClick={() => setStatusFilter("all")}>
                Todas
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setStatusFilter("pending")}>
                Pendentes
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setStatusFilter("completed")}>
                Concluídas
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuLabel>Disciplinas</DropdownMenuLabel>
              <DropdownMenuItem onClick={() => setClassFilter("all")}>
                Todas
              </DropdownMenuItem>
              {uniqueClasses.map((className) => (
                <DropdownMenuItem
                  key={className}
                  onClick={() => setClassFilter(className)}
                >
                  {className}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      <AnimatePresence>
        {filteredTasks.length > 0 ? (
          <motion.div
            className="px-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
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
                  title={task.title}
                  description={task.description}
                  fileUrl={task.fileUrl}
                  dueDate={task.dueDate}
                  className={task.className}
                  professor={task.professor?.name || ""}
                />
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.p
            className="text-center text-muted-foreground"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            Nenhuma tarefa encontrada.
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}
