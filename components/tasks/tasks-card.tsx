"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface TasksCardProps {
  id: string;
  name: string;
}

export const TasksCard = ({ id, name }: TasksCardProps) => {
  return (
    <div>
      <Card className="text-center">
        <CardHeader>
          <CardTitle>Tarefas</CardTitle>
          <CardDescription></CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mt-4 space-y-2"></div>
        </CardContent>
      </Card>
    </div>
  );
};