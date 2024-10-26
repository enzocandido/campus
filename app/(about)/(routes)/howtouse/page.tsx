"use client";

import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Book, Users, Calendar, MessageSquare, HelpCircle } from "lucide-react";

const HowToUse = () => {
  const faqs = [
    {
      question: "Como posso criar minha conta?",
      answer:
        "Para criar uma conta, selecione 'Registre-se' na página inicial, insira seu e-mail, crie uma senha segura e complete os dados necessários.",
    },
    {
      question: "Como eu envio uma tarefa?",
      answer:
        "Entre na seção 'Tarefas', escolha 'Enviar Tarefa', escolha o arquivo ou preencha as informações exigidas e pressione 'Enviar'.",
    },
    {
      question: "Como posso me comunicar com meus professores e colegas?",
      answer:
        "Primeiramente, faça login no servidor da sua classe ou grupo. Depois, acesse 'Mensagens', selecione o membro com quem deseja interagir e envie sua mensagem diretamente.",
    },
    {
      question: "Como redefino minha senha?",
      answer:
        "Se você esqueceu sua senha, selecione 'Esqueci a senha' na página de login. Um e-mail será enviado a você com instruções para definir uma nova senha.",
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="space-y-8"
    >
      <h1 className="text-3xl font-bold text-center mb-10">
        Como Usar a Plataforma - Perguntas Frequentes
      </h1>
      <Accordion type="single" collapsible className="w-full">
        {faqs.map((faq, index) => (
          <AccordionItem key={index} value={`item-${index + 1}`}>
            <AccordionTrigger>{faq.question}</AccordionTrigger>
            <AccordionContent>{faq.answer}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
};

export default HowToUse;
