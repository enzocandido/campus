"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Lightbulb,
  Calendar,
  Mail,
  FileText,
  Video,
  MessageSquare,
  BookOpen,
  Trophy,
  Bell,
} from "lucide-react";

interface HomeProfileCardProps {
  name: string;
  ra?: string;
  email: string;
  imageUrl: string;
  university: string;
  course: string;
}

export default function HomeProfileCard({
  name,
  ra,
  email,
  imageUrl,
  university,
  course,
}: HomeProfileCardProps) {
  const [showTip, setShowTip] = useState(false);
  const [progress, setProgress] = useState(65);

  return (
    <Card className="w-full max-w-5xl mx-auto overflow-hidden bg-background border-2 border-none shadow-lg">
      <div className="absolute inset-0 bg-grid-primary/[0.03] -z-10" />
      <CardHeader className="relative pb-0">
        <motion.div
          className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent h-40"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        />
        <motion.div
          className="relative z-10 flex flex-col md:flex-row items-center md:items-start space-y-4 md:space-y-0 md:space-x-6"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Avatar className="h-32 w-32 border-4 border-background">
            <AvatarImage src={imageUrl} alt={`Foto de perfil de ${name}`} />
            <AvatarFallback>{name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="text-center md:text-left">
            <CardTitle className="text-3xl mb-2">Olá, {name}!</CardTitle>
            <p className="text-sm text-muted-foreground">{email}</p>
            {ra && <p className="text-sm text-muted-foreground">RA: {ra}</p>}
            <p className="text-sm text-muted-foreground">{course}</p>
            <p className="text-sm text-muted-foreground">{university}</p>
          </div>
        </motion.div>
      </CardHeader>
      <CardContent className="pt-6 pb-8">
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <div>
            <motion.div
              className="relative"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <Button
                variant="outline"
                className="w-full justify-start text-left font-normal"
                onClick={() => setShowTip(!showTip)}
              >
                <Lightbulb className="mr-2 h-4 w-4" />
                Dica do dia
              </Button>
              <AnimatePresence>
                {showTip && (
                  <motion.div
                    className="absolute left-0 right-0 mt-2 p-4 bg-card rounded-md shadow-lg z-10"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                  >
                    <p className="text-sm">
                      Crie salas para interação dinâmica entre alunos, com chat
                      de texto, chamadas de vídeo, áudio e compartilhamento de
                      arquivos.
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
            <motion.div
              className="space-y-2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <div className="mt-8 text-center">
                <h3 className="text-lg font-semibold m-2">
                  Progresso de tarefas
                </h3>

                <Progress value={progress} className="w-full mb-2" />
                <p className="text-sm text-muted-foreground text-right">
                  {progress}% concluído
                </p>
              </div>
            </motion.div>
          </div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            <h3 className="text-lg font-semibold mb-2">Acesso rápido</h3>
            <div className="flex flex-col gap-2">
              <Link href="/calendar" passHref>
                <Button
                  variant="outline"
                  className="w-full justify-start text-left font-normal"
                >
                  <Calendar className="mr-2 h-4 w-4" />
                  Calendário
                </Button>
              </Link>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full justify-start text-left font-normal"
                    >
                      <Mail className="mr-2 h-4 w-4" />
                      Mensagens
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Em breve</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <Link href="/tasks" passHref>
                <Button
                  variant="outline"
                  className="w-full justify-start text-left font-normal"
                >
                  <FileText className="mr-2 h-4 w-4" />
                  Tarefas
                </Button>
              </Link>
              <Button
                variant="outline"
                className="w-full justify-start text-left font-normal"
              >
                <BookOpen className="mr-2 h-4 w-4" />
                Minhas salas
              </Button>
            </div>
          </motion.div>
        </motion.div>
        <motion.div
          className="mt-8 flex flex-wrap justify-center gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.5 }}
        >
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="secondary">
                  <Video className="mr-2 h-4 w-4" />
                  Criar sala
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Crie uma nova sala</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="secondary">
                  <MessageSquare className="mr-2 h-4 w-4" />
                  Chat
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Converse com outros estudeanteas</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="secondary">
                  <Trophy className="mr-2 h-4 w-4" />
                  Conquistas
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Veja suas conquistas e metas alcançadas</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="secondary">
                  <Bell className="mr-2 h-4 w-4" />
                  Notificações
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Confira suas notificações recentes</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </motion.div>
        <motion.div
          className="mt-6 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
        >
          <span className="text-sm text-muted-foreground">Dúvidas? </span>
          <Link
            href="/howtouse"
            className="text-sm text-primary hover:underline"
          >
            Como usar a plataforma
          </Link>
        </motion.div>
      </CardContent>
    </Card>
  );
}
