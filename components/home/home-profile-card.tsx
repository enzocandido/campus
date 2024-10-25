"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "../ui/button";
import { AvatarImage } from "../ui/avatar";
import { Avatar } from "@radix-ui/react-avatar";
import { Edit2 } from "lucide-react";

interface HomeProfileCardProps {
  name: string;
  ra?: string;
  email: string;
  imageUrl: string;
  university: string;
  course: string;
}

export const HomeProfileCard = ({
  name,
  ra,
  email,
  imageUrl,
  university,
  course,
}: HomeProfileCardProps) => {
  return (
    <div className="w-full h-screen flex justify-center items-start mt-0 px-2">
      <Card className="w-full max-w-full mx-auto shadow-lg rounded-lg text-center p-6 mt-0">
        <CardHeader>
          <CardTitle>Bem-vindo!</CardTitle>
          <CardDescription>{name}</CardDescription>
          <CardDescription>{email}</CardDescription>
          <Avatar className="mx-auto mt-4">
            <AvatarImage
              className="h-32 w-32 rounded-full"
              src={imageUrl}
              alt={`Avatar de ${name}`}
            />
          </Avatar>
        </CardHeader>
        <CardContent className="flex flex-col items-center">
          <div className="mt-4 space-y-2 text-center">
            {ra && <p className="text-sm font-semibold">RA: {ra}</p>}
            <p className="text-sm font-semibold">Curso: {course}</p>
            <p className="text-sm font-semibold">Universidade: {university}</p>
          </div>
        </CardContent>

        <h2 className="mt-6 text-lg font-semibold">Aqui estão algumas dicas para começar</h2>

        <div className="grid grid-cols-1 gap-4 mt-4 md:grid-cols-2">
          <Card className="w-full max-w-full mx-auto shadow-lg rounded-lg text-center p-6 mt-0">
            <CardTitle className="text-xl font-semibold">Criação de salas</CardTitle>
            <CardContent>
              <p className="text-gray-400 text-justify mt-2">
              Você pode criar salas para promover uma interação mais dinâmica e colaborativa entre os alunos. Essas salas oferecem diversas funcionalidades, incluindo chat de texto para discussões em tempo real, chamadas de vídeo para uma comunicação mais próxima, ligações de áudio para conveniência e compartilhamento de arquivos para facilitar a troca de documentos e materiais de estudo.
              </p>
            </CardContent>
          </Card>

          <Card className="w-full max-w-full mx-auto shadow-lg rounded-lg text-center p-6 mt-0">
            <CardTitle className="text-xl font-semibold">Como ver minhas tarefas?</CardTitle>
            <CardContent>
              <p className="text-gray-400 text-justify mt-2">
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s com a liberação de folhas Letraset contendo passagens de Lorem Ipsum e mais recentemente com software de editoração eletrônica como Aldus PageMaker, incluindo versões de Lorem Ipsum.
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="mt-4">
          <a href="/howtouse" className="text-blue-500 hover:underline">Como usar a plataforma?</a>
        </div>
      </Card>
    </div>
  );
};
