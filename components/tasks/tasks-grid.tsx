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
  FileText,
  CheckCircle,
  XCircle,
  ChevronDown,
  ChevronUp,
  FileIcon,
} from "lucide-react";
import { format, isPast } from "date-fns";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import Image from "next/image";

interface Submission {
  id: string;
  studentId: string;
  student: {
    name: string;
  };
  fileUrl?: string;
  content: string;
  graded: boolean;
  status?: string;
  feedback?: string;
}

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
  submissions: Submission[];
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
  const [openSubmissions, setOpenSubmissions] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedbackText, setFeedbackText] = useState("");
  const [evaluationError, setEvaluationError] = useState<string | null>(null);

  const handleEvaluateSubmission = async (
    submissionId: string,
    taskId: string,
    status: string,
  ) => {
    try {
      setIsSubmitting(true);
      setEvaluationError(null);

      const response = await fetch(
        `/api/academic/submissions/${submissionId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            submissionId,
            feedback: feedbackText,
            status: status,
            graded: true,
          }),
        },
      );

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Erro ao avaliar o envio");
      }

      setTasks((prevTasks) =>
        prevTasks.map((task) => {
          if (task.id === taskId) {
            return {
              ...task,
              submissions: task.submissions.map((sub) => {
                if (sub.id === submissionId) {
                  return {
                    ...sub,
                    graded: true,
                    status: status,
                    feedback: feedbackText,
                  };
                }
                return sub;
              }),
            };
          }
          return task;
        }),
      );

      setFeedbackText("");
    } catch (error) {
      setEvaluationError(
        error instanceof Error ? error.message : "Erro ao avaliar o envio",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const toggleSubmissions = (taskId: string) => {
    setOpenSubmissions((prev) =>
      prev.includes(taskId)
        ? prev.filter((id) => id !== taskId)
        : [...prev, taskId],
    );
  };

  const isImage = (url?: string) => {
    if (!url) return false;
    return /\.(jpg|jpeg|png|gif|webp)$/i.test(url);
  };

  const isPDF = (url?: string) => {
    if (!url) return false;
    return /\.pdf$/i.test(url);
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
                  feedback={
                    task.submissions.find(
                      (sub) => sub.studentId === currentUserId,
                    )?.feedback || ""
                  }
                  grade={
                    task.submissions.find(
                      (sub) => sub.studentId === currentUserId,
                    )?.status === "approved"
                      ? "approved"
                      : task.submissions.find(
                          (sub) => sub.studentId === currentUserId,
                        )?.status === "rejected"
                      ? "rejected"
                      : undefined
                  }
                  isGraded={
                    task.submissions.find(
                      (sub) => sub.studentId === currentUserId,
                    )?.graded || false
                  }
                />
                {userRole === "PROFESSOR" && task.submissions.length > 0 && (
                  <Collapsible className="mt-4">
                    <CollapsibleTrigger asChild>
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex items-center justify-between w-full border-0"
                        onClick={() => toggleSubmissions(task.id)}
                      >
                        Envios ({task.submissions.length})
                        {openSubmissions.includes(task.id) ? (
                          <ChevronUp className="h-4 w-4 ml-2" />
                        ) : (
                          <ChevronDown className="h-4 w-4 ml-2" />
                        )}
                      </Button>
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                      <div className="mt-2 space-y-2">
                        {task.submissions.map((submission) => (
                          <div
                            key={submission.id}
                            className="p-4 border rounded-md bg-muted"
                          >
                            <div className="flex justify-between items-center">
                              <p className="text-sm font-medium">
                                Aluno: {submission.student.name}
                              </p>
                              {submission.graded && (
                                <Badge
                                  variant={
                                    submission.status === "approved"
                                      ? "default"
                                      : "destructive"
                                  }
                                >
                                  {submission.status === "approved"
                                    ? "Aprovado"
                                    : "Reprovado"}
                                </Badge>
                              )}
                            </div>
                            <div className="mt-2">
                              <p className="text-sm text-muted-foreground">
                                {submission.content}
                              </p>
                              {submission.fileUrl && (
                                <div className="mt-2">
                                  {isImage(submission.fileUrl) ? (
                                    <Dialog>
                                      <DialogTrigger asChild>
                                        <Button
                                          variant="outline"
                                          className="w-full"
                                        >
                                          Ver imagem
                                        </Button>
                                      </DialogTrigger>
                                      <DialogContent className="max-w-2xl">
                                        <DialogHeader>
                                          <DialogTitle>
                                            Imagem do envio
                                          </DialogTitle>
                                        </DialogHeader>
                                        <div className="relative aspect-video">
                                          <Image
                                            src={submission.fileUrl}
                                            alt={`Envio de ${submission.student.name}`}
                                            layout="fill"
                                            objectFit="contain"
                                            className="rounded-md"
                                          />
                                        </div>
                                      </DialogContent>
                                    </Dialog>
                                  ) : (
                                    isPDF(submission.fileUrl) && (
                                      <div className="flex items-center p-2 rounded-md bg-secondary">
                                        <FileIcon className="h-6 w-6 text-primary" />
                                        <a
                                          href={submission.fileUrl}
                                          target="_blank"
                                          rel="noopener noreferrer"
                                          className="ml-2 text-sm text-primary hover:underline"
                                        >
                                          Baixar PDF
                                        </a>
                                      </div>
                                    )
                                  )}
                                </div>
                              )}
                              {submission.graded && submission.feedback && (
                                <div className="mt-2 p-3 bg-secondary rounded-md">
                                  <p className="text-sm font-medium">
                                    Feedback do professor:
                                  </p>
                                  <p className="text-sm mt-1">
                                    {submission.feedback}
                                  </p>
                                </div>
                              )}
                            </div>
                            <div className="mt-4 flex items-center space-x-2">
                              {!submission.graded && (
                                <Dialog>
                                  <DialogTrigger asChild>
                                    <Button variant="outline" size="sm">
                                      Avaliar
                                    </Button>
                                  </DialogTrigger>
                                  <DialogContent>
                                    <DialogHeader>
                                      <DialogTitle>Avaliar Envio</DialogTitle>
                                      <DialogDescription>
                                        Avalie o envio do aluno{" "}
                                        {submission.student.name}
                                      </DialogDescription>
                                    </DialogHeader>
                                    <div className="grid gap-4 py-4">
                                      <div className="space-y-2">
                                        <label
                                          htmlFor="feedback"
                                          className="text-sm font-medium"
                                        >
                                          Feedback
                                        </label>
                                        <Textarea
                                          id="feedback"
                                          placeholder="Comentários sobre o envio..."
                                          value={feedbackText}
                                          onChange={(e) =>
                                            setFeedbackText(e.target.value)
                                          }
                                          className="min-h-[100px]"
                                        />
                                      </div>
                                      {evaluationError && (
                                        <p className="text-sm text-destructive">
                                          {evaluationError}
                                        </p>
                                      )}
                                      <div className="flex justify-end space-x-2">
                                        <Button
                                          variant="outline"
                                          onClick={() =>
                                            handleEvaluateSubmission(
                                              submission.id,
                                              task.id,
                                              "rejected",
                                            )
                                          }
                                          disabled={
                                            isSubmitting || !feedbackText.trim()
                                          }
                                        >
                                          {isSubmitting ? (
                                            <Loader2 className="h-4 w-4 animate-spin" />
                                          ) : (
                                            <XCircle className="mr-2 h-4 w-4" />
                                          )}
                                          Reprovar
                                        </Button>
                                        <Button
                                          variant="default"
                                          onClick={() =>
                                            handleEvaluateSubmission(
                                              submission.id,
                                              task.id,
                                              "approved",
                                            )
                                          }
                                          disabled={
                                            isSubmitting || !feedbackText.trim()
                                          }
                                        >
                                          {isSubmitting ? (
                                            <Loader2 className="h-4 w-4 animate-spin" />
                                          ) : (
                                            <CheckCircle className="mr-2 h-4 w-4" />
                                          )}
                                          Aprovar
                                        </Button>
                                      </div>
                                    </div>
                                  </DialogContent>
                                </Dialog>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </CollapsibleContent>
                  </Collapsible>
                )}
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
