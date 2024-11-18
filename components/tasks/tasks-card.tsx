import { useState } from "react";
import { motion } from "framer-motion";
import { format } from "date-fns";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Book,
  Calendar,
  Check,
  ChevronDown,
  ChevronUp,
  FileIcon,
  Send,
  Trash,
  User,
  ThumbsUp,
  ThumbsDown,
  MessageSquare,
} from "lucide-react";
import { useModal } from "@/hooks/use-modal-store";

interface TasksCardProps {
  id: string;
  title: string;
  description?: string;
  fileUrl?: string;
  dueDate: string;
  className: string;
  professor: string;
  status: "pending" | "expired";
  feedback?: string;
  grade?: "approved" | "rejected";
  userRole: string;
  isSubmitted: boolean;
  isGraded: boolean;
}

export function TasksCard(props: TasksCardProps) {
  const { onOpen } = useModal();
  const [isExpanded, setIsExpanded] = useState(false);
  const fileType = props.fileUrl?.split(".").pop();
  const isPDF = fileType === "pdf";
  const isImage = !isPDF && !!props.fileUrl;

  const formattedDueDate = format(new Date(props.dueDate), "dd/MM/yyyy");
  const isOverdue = new Date(props.dueDate) < new Date();

  const handleSubmitTask = () => {
    onOpen("sendTask", { taskId: props.id });
  };

  const handleDeleteTask = () => {
    onOpen("deleteTask", { taskId: props.id });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="overflow-hidden border-none shadow-md">
        <CardHeader className="pb-2">
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="text-xl mb-1">{props.title}</CardTitle>
              <CardDescription className="text-sm">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Badge variant={isOverdue ? "destructive" : "secondary"}>
                        <Calendar className="mr-1 h-3 w-3" />
                        {formattedDueDate}
                      </Badge>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>{isOverdue ? "Atrasado" : "Data de entrega"}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </CardDescription>
            </div>
            <div className="flex items-center space-x-2">
              {props.userRole === "PROFESSOR" ? (
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={handleDeleteTask}
                >
                  <Trash className="h-4 w-4 mr-2" />
                  Excluir
                </Button>
              ) : (
                <>
                  {props.isSubmitted ? (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleSubmitTask}
                      disabled
                    >
                      <Check className="h-4 w-4 mr-2" />
                      Enviada
                    </Button>
                  ) : isOverdue ? (
                    <Button variant="outline" size="sm" disabled>
                      Expirada
                    </Button>
                  ) : (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleSubmitTask}
                    >
                      <Send className="h-4 w-4 mr-2" />
                      Enviar
                    </Button>
                  )}
                </>
              )}
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsExpanded(!isExpanded)}
              >
                {isExpanded ? (
                  <ChevronUp className="h-4 w-4" />
                ) : (
                  <ChevronDown className="h-4 w-4" />
                )}
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <motion.div
            initial={false}
            animate={{ height: isExpanded ? "auto" : 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="space-y-4 pt-2">
              <p className="text-sm text-muted-foreground">
                {props.description || "Nenhuma descrição disponível."}
              </p>
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <User className="h-4 w-4" />
                <span>{props.professor}</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <Book className="h-4 w-4" />
                <span>{props.className}</span>
              </div>
              {isImage && (
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline" className="w-full">
                      Ver imagem
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl">
                    <DialogHeader>
                      <DialogTitle>Imagem da tarefa</DialogTitle>
                    </DialogHeader>
                    <div className="relative aspect-video">
                      {props.fileUrl && (
                        <Image
                          src={props.fileUrl}
                          alt={`Imagem sobre ${props.title}`}
                          layout="fill"
                          objectFit="contain"
                          className="rounded-md"
                        />
                      )}
                    </div>
                  </DialogContent>
                </Dialog>
              )}
              {isPDF && (
                <div className="flex items-center p-2 rounded-md bg-secondary">
                  <FileIcon className="h-6 w-6 text-primary" />
                  <a
                    href={props.fileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="ml-2 text-sm text-primary hover:underline"
                  >
                    Baixar PDF
                  </a>
                </div>
              )}
              {/* Improved Feedback Section */}
              {props.isSubmitted && props.isGraded && (
                <div className="pt-4 border-t border-border">
                  <h3 className="text-lg font-semibold mb-2">
                    Feedback do Professor
                  </h3>
                  <div className="bg-secondary p-4 rounded-lg">
                    <div className="flex items-center mb-2">
                      <Badge
                        variant={
                          props.grade === "approved" ? "default" : "destructive"
                        }
                        className="mr-2"
                      >
                        {props.grade === "approved" ? (
                          <ThumbsUp className="h-4 w-4 mr-1" />
                        ) : (
                          <ThumbsDown className="h-4 w-4 mr-1" />
                        )}
                        {props.grade === "approved" ? "Aprovado" : "Reprovado"}
                      </Badge>
                    </div>
                    {props.feedback && (
                      <div className="flex items-start space-x-2">
                        <MessageSquare className="h-5 w-5 text-muted-foreground mt-0.5" />
                        <p className="text-sm">{props.feedback}</p>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
