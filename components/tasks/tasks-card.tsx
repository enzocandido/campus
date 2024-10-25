"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FileIcon } from "lucide-react";
import Image from "next/image";

interface TasksCardProps {
  title: string;
  description?: string;
  fileUrl?: string;
  dueDate: string;
  className: string;
  professor: string;
}

export const TasksCard = ({
  title,
  description,
  fileUrl,
  dueDate,
  className,
  professor,
}: TasksCardProps) => {
  const fileType = fileUrl?.split(".").pop();

  const isPDF = fileType === "pdf";
  const isImage = !isPDF && !!fileUrl;

  return (
    <div>
      <Card className="text-center">
        <CardHeader>
          <CardTitle>{title}</CardTitle>

          {/* EM DESENVOLVIMENTO */}
          <CardDescription>Data de Entrega: {dueDate}</CardDescription>
          <CardDescription>Disciplina: {className}</CardDescription>
          <CardDescription>Professor: {professor}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mt-4 space-y-2">
            <p>{description || "Nenhuma descrição disponível."}</p>
          </div>
          {/* {isImage && (
            <a
              href={fileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="relative aspect-square rounded-md mt-2 overflow-hidden border flex items-center justify-center bg-secondary h-48 w-48"
            >
              <Image
                src={fileUrl}
                alt={`Imagem sobre ${title}`}
                layout="fill"
                objectFit="cover"
                className="rounded-md"
              />
            </a>
          )}
          {isPDF && (
            <div className="relative flex items-center p-2 mt-2 rounded-md bg-background/10">
              <FileIcon className="h-10 w-10 fill-indigo-200 stroke-indigo-400" />
              <a
                href={fileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="ml-2 text-sm text-indigo-500 dark:text-indigo-400 hover:underline"
              >
                Baixar PDF
              </a>
            </div>
          )} */}
        </CardContent>
      </Card>
    </div>
  );
};
