"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { AvatarImage } from "../ui/avatar";
import { Avatar } from "@radix-ui/react-avatar";

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
    <div>
      <Card className="w-full text-center p-6 border-none">
        <CardHeader className="flex items-center">
          <CardTitle>Olá, {name}!</CardTitle>
          <CardDescription>{email}</CardDescription>
          <Avatar>
            <AvatarImage
              className="h-48 w-48 rounded-full mt-6"
              src={imageUrl}
              alt={"Sua foto de perfil"}
            />
          </Avatar>
        </CardHeader>
        <CardContent className="">
          <div className="mt-4 text-center">
            {ra && <p className="text-sm">RA: {ra}</p>}
            <p className="text-sm">{course}</p>
            <p className="text-sm">{university}</p>
          </div>
        </CardContent>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <Card className="w-full max-w-full mx-auto  text-center p-6">
            <CardTitle className="text-xl font-semibold">Dica do dia</CardTitle>
            <CardContent>
              <p className="font-light text-justify mt-2">
                Você pode criar salas para promover uma interação mais dinâmica
                e colaborativa entre os alunos. Essas salas oferecem diversas
                funcionalidades, incluindo chat de texto para discussões em
                tempo real, chamadas de vídeo para uma comunicação mais próxima,
                ligações de áudio para conveniência e compartilhamento de
                arquivos para facilitar a troca de documentos e materiais de
                estudo.
              </p>
            </CardContent>
          </Card>

          <Card className="w-full max-w-full mx-auto text-center p-6 mt-0">
            <CardTitle className="text-xl font-semibold">
              Acesso rápido
            </CardTitle>
            <CardContent></CardContent>
          </Card>
        </div>

        <div className="mt-6 font-light text-sm">
          <span>Dúvidas? </span>
          <a href="/howtouse" className="text-blue-500 hover:underline">
            Como usar a plataforma
          </a>
        </div>
      </Card>
    </div>
  );
};
