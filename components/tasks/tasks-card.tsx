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
  ChevronDown,
  ChevronUp,
  FileIcon,
  Send,
  Trash,
  User,
} from "lucide-react";
import { useModal } from "@/hooks/use-modal-store";

interface TasksCardProps {
  title: string;
  description?: string;
  fileUrl?: string;
  dueDate: string;
  className: string;
  professor: string;
  userRole: string;
}

export function TasksCard({
  title,
  description,
  fileUrl,
  dueDate,
  className,
  professor,
  userRole,
}: TasksCardProps) {
  const { onOpen } = useModal();

  const [isExpanded, setIsExpanded] = useState(false);
  const fileType = fileUrl?.split(".").pop();
  const isPDF = fileType === "pdf";
  const isImage = !isPDF && !!fileUrl;

  const formattedDueDate = format(new Date(dueDate), "dd/MM/yyyy");
  const isOverdue = new Date(dueDate) < new Date();

  const handleEditTask = () => {
  };

  const handleSubmitTask = () => {
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="overflow-hidden border-none">
        <CardHeader className="pb-2">
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="text-xl mb-1">{title}</CardTitle>
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
              {userRole === "PROFESSOR" ? (
                // implementar logicas de editar e deletar
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => onOpen("deleteTask")}
                >
                  <Trash className="h-4 w-4 mr-2" />
                  Excluir
                </Button>
              ) : (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onOpen("sendTask")}
                >
                  <Send className="h-4 w-4 mr-2" />
                  Enviar
                </Button>
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
            <div className="space-y-2 pt-2">
              <p className="text-sm text-muted-foreground">
                {description || "Nenhuma descrição disponível."}
              </p>
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <User className="h-4 w-4" />
                <span>{professor}</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <Book className="h-4 w-4" />
                <span>{className}</span>
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
                      <Image
                        src={fileUrl}
                        alt={`Imagem sobre ${title}`}
                        layout="fill"
                        objectFit="contain"
                        className="rounded-md"
                      />
                    </div>
                  </DialogContent>
                </Dialog>
              )}
              {isPDF && (
                <div className="flex items-center p-2 rounded-md bg-secondary">
                  <FileIcon className="h-6 w-6 text-primary" />
                  <a
                    href={fileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="ml-2 text-sm text-primary hover:underline"
                  >
                    Baixar PDF
                  </a>
                </div>
              )}
            </div>
          </motion.div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
