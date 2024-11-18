import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, XCircle, CheckCircle } from "lucide-react";
import { Submission, Task } from "@/types";

interface EvaluationDialogProps {
  submission: Submission;
  taskId: string;
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
}

export function EvaluationDialog({
  submission,
  taskId,
  setTasks,
}: EvaluationDialogProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedbackText, setFeedbackText] = useState("");
  const [evaluationError, setEvaluationError] = useState<string | null>(null);

  const handleEvaluateSubmission = async (status: "approved" | "rejected") => {
    try {
      setIsSubmitting(true);
      setEvaluationError(null);

      const response = await fetch(
        `/api/academic/submissions/${submission.id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            submissionId: submission.id,
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
                if (sub.id === submission.id) {
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

  return (
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
            Avalie o envio do aluno {submission.student.name}
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="space-y-2">
            <label htmlFor="feedback" className="text-sm font-medium">
              Feedback
            </label>
            <Textarea
              id="feedback"
              placeholder="Comentários sobre o envio..."
              value={feedbackText}
              onChange={(e) => setFeedbackText(e.target.value)}
              className="min-h-[100px]"
            />
          </div>
          {evaluationError && (
            <p className="text-sm text-destructive">{evaluationError}</p>
          )}
          <div className="flex justify-end space-x-2">
            <Button
              variant="outline"
              onClick={() => handleEvaluateSubmission("rejected")}
              disabled={isSubmitting || !feedbackText.trim()}
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
              onClick={() => handleEvaluateSubmission("approved")}
              disabled={isSubmitting || !feedbackText.trim()}
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
  );
}
