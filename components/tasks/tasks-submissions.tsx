"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Button } from "@/components/ui/button";
import { ChevronUp, ChevronDown, FileIcon } from "lucide-react";
import { Submission, Task } from "@/types";
import { EvaluationDialog } from "./evaluation-dialog";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface SubmissionsListProps {
  task: Task;
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
}

export function SubmissionsList({ task, setTasks }: SubmissionsListProps) {
  const [openSubmissions, setOpenSubmissions] = useState<string[]>([]);

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

  return (
    <Collapsible className="mt-4">
      <CollapsibleTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="flex items-center justify-between w-full border-0 bg-secondary hover:bg-secondary/80 transition-colors"
          onClick={() => toggleSubmissions(task.id)}
        >
          <span className="font-semibold">
            Envios ({task.submissions.length})
          </span>
          {openSubmissions.includes(task.id) ? (
            <ChevronUp className="h-4 w-4 ml-2" />
          ) : (
            <ChevronDown className="h-4 w-4 ml-2" />
          )}
        </Button>
      </CollapsibleTrigger>
      <CollapsibleContent>
        <AnimatePresence>
          {openSubmissions.includes(task.id) && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="mt-2 space-y-4"
            >
              {task.submissions.map((submission: Submission) => (
                <Card key={submission.id} className="overflow-hidden">
                  <CardContent className="p-0">
                    <div className="p-4 bg-secondary/50">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center space-x-3">
                          <Avatar>
                            <AvatarImage
                              src={`https://api.dicebear.com/6.x/initials/svg?seed=${submission.student.name}`}
                            />
                            <AvatarFallback>
                              {submission.student.name.charAt(0)}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">
                              {submission.student.name}
                            </p>
                          </div>
                        </div>
                        {submission.graded && (
                          <Badge
                            variant={
                              submission.status === "approved"
                                ? "default"
                                : "destructive"
                            }
                            className="text-xs px-2 py-1"
                          >
                            {submission.status === "approved"
                              ? "Aprovado"
                              : "Reprovado"}
                          </Badge>
                        )}
                      </div>
                    </div>
                    <div className="p-4">
                      <p className="text-sm text-muted-foreground mb-3">
                        {submission.content}
                      </p>
                      {submission.fileUrl && (
                        <div className="mt-2">
                          {isImage(submission.fileUrl) ? (
                            <Dialog>
                              <DialogTrigger asChild>
                                <Button variant="outline" className="w-full">
                                  Ver imagem
                                </Button>
                              </DialogTrigger>
                              <DialogContent className="max-w-2xl">
                                <DialogHeader>
                                  <DialogTitle>Imagem do envio</DialogTitle>
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
                        <div className="mt-4 p-3 bg-secondary rounded-md">
                          <p className="text-sm font-medium mb-1">
                            Feedback do professor:
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {submission.feedback}
                          </p>
                        </div>
                      )}
                      <div className="mt-4 flex justify-end">
                        {!submission.graded && (
                          <EvaluationDialog
                            submission={submission}
                            taskId={task.id}
                            setTasks={setTasks}
                          />
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </CollapsibleContent>
    </Collapsible>
  );
}
