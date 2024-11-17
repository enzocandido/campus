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
  FileText,
  Plus,
  Bell,
  ChevronDown,
} from "lucide-react";
import { useModal } from "@/hooks/use-modal-store";

interface HomeProfileCardProps {
  name: string;
  ra?: string;
  email: string;
  imageUrl: string;
  university: string;
  course: string;
  academicRole: string;
}

export default function HomeProfileCard({
  name,
  ra,
  email,
  imageUrl,
  university,
  course,
  academicRole,
}: HomeProfileCardProps) {
  const [showTip, setShowTip] = useState(false);
  const [progress, setProgress] = useState(65);
  const { onOpen } = useModal();

  return (
    <Card className="w-full max-w-5xl mx-auto overflow-hidden bg-background border-2 border-none shadow-lg">
      <div className="absolute inset-0 bg-grid-primary/[0.03] -z-10" />
      <CardHeader className="relative pb-0 pt-10">
        <motion.div
          className="relative z-10 flex flex-col items-center space-y-4 "
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Avatar className="h-24 w-24 border-4 border-background shadow-lg">
            <AvatarImage src={imageUrl} alt={`Foto de perfil de ${name}`} />
            <AvatarFallback>{name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="text-center">
            <CardTitle className="text-3xl font-bold mb-2">
              Olá, {name}!
            </CardTitle>
            <p className="text-sm text-muted-foreground">{email}</p>
            {ra && <p className="text-sm text-muted-foreground">RA: {ra}</p>}
            <p className="text-sm font-medium text-primary">{course}</p>
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
          <div className="space-y-6">
            <motion.div
              className="relative"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <Button
                variant="outline"
                className="w-full justify-between text-left font-normal group"
                onClick={() => setShowTip(!showTip)}
              >
                <span className="flex items-center">
                  <Lightbulb className="mr-2 h-4 w-4 text-yellow-500" />
                  Dica do dia
                </span>
                <ChevronDown
                  className={`h-4 w-4 transition-transform ${
                    showTip ? "rotate-180" : ""
                  }`}
                />
              </Button>
              <AnimatePresence>
                {showTip && (
                  <motion.div
                    className="absolute left-0 right-0 mt-2 p-4 bg-card rounded-md shadow-lg z-10 border border-border"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                  >
                    <p className="text-sm">
                      Convide seus amigos para o Campus! A nossa plataforma de é
                      o lugar perfeito para compartilhar ideias, acompanhar
                      tarefas e trocar conhecimentos. Quanto mais pessoas, mais
                      aprendizado!
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
              <h3 className="text-lg font-semibold mb-4">
                Progresso de tarefas
              </h3>
              <Progress value={progress} className="w-full h-2" />
              <p className="text-sm text-muted-foreground text-right">
                {progress}% concluído
              </p>
            </motion.div>
          </div>
          <motion.div
            className="flex flex-col space-y-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.5 }}
          >
            <Link href="/calendar" passHref>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="outline" className="w-full justify-start">
                      <Calendar className="mr-2 h-4 w-4 text-primary" />
                      Calendário
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Ver calendário</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </Link>
            <Link href="/tasks" passHref>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="outline" className="w-full justify-start">
                      <FileText className="mr-2 h-4 w-4 text-primary" />
                      Tarefas
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Verifique suas tarefas</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </Link>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full justify-start"
                    onClick={() =>
                      onOpen(
                        academicRole === "PROFESSOR"
                          ? "createServer"
                          : "enterServer",
                      )
                    }
                  >
                    <Plus className="mr-2 h-4 w-4 text-primary" />
                    {academicRole === "PROFESSOR" ? "Criar" : "Entrar"}
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>
                    {academicRole === "PROFESSOR" ? "Crie" : "Entre em"} uma
                    sala
                  </p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full justify-start"
                    disabled
                  >
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
        </motion.div>
        <motion.div
          className="mt-8 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
        >
          <span className="text-sm text-muted-foreground">Dúvidas? </span>
          <Link
            href="/howtouse"
            className="text-sm text-primary hover:underline font-medium"
          >
            Como usar a plataforma
          </Link>
        </motion.div>
      </CardContent>
    </Card>
  );
}
