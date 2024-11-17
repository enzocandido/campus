"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TasksCard } from "@/components/tasks/tasks-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
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
  X,
  Calendar,
} from "lucide-react";
import { format, isPast } from "date-fns";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

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
  submissions: {
    id: string;
    studentId: string;
  }[];
}

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
  const [currentUserId, setCurrentUserId] = useState<string>("");

  const handleEvaluateSubmission = (submissionId: string) => {
    console.log("Avaliando submissão:", submissionId);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const tasksResponse = await fetch("/api/academic/tasks");
        const tasksData: Task[] = await tasksResponse.json();

        setTasks(tasksData);
        setFilteredTasks(tasksData);
        setCurrentUserId(userId);
      } catch (error: any) {
        setError(error.message || "Erro desconhecido");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [userId]);

  useEffect(() => {
    const now = new Date();
    const filtered = tasks.filter((task) => {
      const taskStatus = isPast(new Date(task.dueDate)) ? "expired" : "pending";
      const isSubmitted = task.submissions.some(
        (sub) => sub.studentId === currentUserId,
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
    currentUserId,
  ]);

  const uniqueClasses = Array.from(
    new Set(tasks.map((task) => task.className)),
  );

  const clearFilters = () => {
    setStatusFilter("all");
    setClassFilter("all");
    setDateFilter(undefined);
  };

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
        <div className="flex flex-wrap gap-2">
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
              <DropdownMenuItem onClick={() => setStatusFilter("expired")}>
                Expiradas
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setStatusFilter("submitted")}>
                Enviadas
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
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline">
                <Calendar className="mr-2 h-4 w-4" />
                {dateFilter ? format(dateFilter, "PPP") : "Filtrar por data"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <CalendarComponent
                mode="single"
                selected={dateFilter}
                onSelect={setDateFilter}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>
      </div>
      <div className="flex flex-wrap gap-2">
        {statusFilter !== "all" && (
          <Badge variant="secondary" className="text-xs">
            Status:{" "}
            {statusFilter === "pending"
              ? "Pendentes"
              : statusFilter === "expired"
              ? "Expiradas"
              : "Enviadas"}
            <Button
              variant="ghost"
              size="icon"
              className="h-4 w-4 ml-1"
              onClick={() => setStatusFilter("all")}
            >
              <X className="h-3 w-3" />
            </Button>
          </Badge>
        )}
        {classFilter !== "all" && (
          <Badge variant="secondary" className="text-xs">
            Disciplina: {classFilter}
            <Button
              variant="ghost"
              size="icon"
              className="h-4 w-4 ml-1"
              onClick={() => setClassFilter("all")}
            >
              <X className="h-3 w-3" />
            </Button>
          </Badge>
        )}
        {dateFilter && (
          <Badge variant="secondary" className="text-xs">
            Data: {format(dateFilter, "dd/MM/yyyy")}
            <Button
              variant="ghost"
              size="icon"
              className="h-4 w-4 ml-1"
              onClick={() => setDateFilter(undefined)}
            >
              <X className="h-3 w-3" />
            </Button>
          </Badge>
        )}
        {(statusFilter !== "all" || classFilter !== "all" || dateFilter) && (
          <Button variant="ghost" size="sm" onClick={clearFilters}>
            Limpar filtros
          </Button>
        )}
      </div>
      <AnimatePresence>
        {filteredTasks.length > 0 ? (
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
                  status={
                    isPast(new Date(task.dueDate)) ? "expired" : "pending"
                  }
                  isSubmitted={task.submissions.some(
                    (sub) => sub.studentId === currentUserId,
                  )}
                />
                <div className="mt-4 space-y-2">
                  <h4 className="font-medium">Submissões:</h4>
                  {task.submissions.map((submission) => (
                    <div
                      key={submission.id}
                      className="p-4 border rounded-md bg-muted"
                    >
                      <p className="text-sm">
                        ID do Aluno: {submission.studentId}
                      </p>
                      <Button
                        variant="primary"
                        size="sm"
                        onClick={() => handleEvaluateSubmission(submission.id)}
                        className="mt-2"
                      >
                        Avaliar
                      </Button>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.div
            className="flex flex-col items-center justify-center h-64 text-muted-foreground"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <AlertCircle className="h-8 w-8 mb-2" />
            <p>Nenhuma tarefa encontrada.</p>
            {(statusFilter !== "all" ||
              classFilter !== "all" ||
              dateFilter) && (
              <Button variant="link" onClick={clearFilters} className="mt-2">
                Limpar filtros
              </Button>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
