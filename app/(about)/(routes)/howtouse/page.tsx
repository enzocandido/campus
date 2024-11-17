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
      category: "Primeiros Passos",
      icon: <Book className="w-6 h-6" />,
      faqs: [
        {
          question: "Como criar uma conta no Campus?",
          answer:
            "Para criar uma conta, selecione 'Registre-se' na página inicial, insira seu e-mail, crie uma senha segura e complete os dados necessários.",
        },
        {
          question: "Como faço login na plataforma?",
          answer:
            "Na página inicial, clique no botão 'Entrar'. Insira seu e-mail e senha registrados para acessar sua conta.",
        },
        {
          question:
            "Como faço para editar minhas informações pessoais ou foto de perfil?",
          answer:
            "No canto inferior esquerdo, clique no ícone do seu perfil e selecione 'Editar Perfil'. Lá, você pode alterar seu nome, adicionar uma foto de perfil e modificar outras informações pessoais.",
        },
        {
          question:
            "O que devo fazer se encontrar problemas técnicos ou dúvidas?",
          answer:
            "Se precisar de ajuda, vá até a seção 'Suporte' na tela de login e preencha o formulário com seu nome, email e a mensagem. Nossa equipe responderá o mais breve possível.",
        },
      ],
    },
    {
      category: "Gerenciamento de Tarefas",
      icon: <Calendar className="w-6 h-6" />,
      faqs: [
        {
          question: "Como posso ver as tarefas que tenho?",
          answer:
            "Na página principal, clique em 'Tarefas', onde é possível visualizar tanto as tarefas pendentes quanto as concluídas. Além disso, você pode verificar a data de entrega de cada tarefa no calendário",
        },
        {
          question: "Como adicionar uma nova tarefa?",
          answer:
            "Na seção 'Tarefas', clique no botão '+' ou 'Adicionar Tarefa'. Preencha os detalhes da tarefa e clique em 'Salvar'.",
        },
        {
          question: "Como marcar uma tarefa como concluída?",
          answer:
            "Na lista de tarefas, clique na caixa de seleção ao lado da tarefa ou use o botão 'Concluir' na página de detalhes da tarefa.",
        },
      ],
    },
    {
      category: "Comunicação",
      icon: <MessageSquare className="w-6 h-6" />,
      faqs: [
        {
          question: "Como posso me comunicar com meus professores e colegas?",
          answer:
            "Primeiramente, faça login no servidor da sua classe ou grupo. Depois, acesse 'Mensagens', selecione o membro com quem deseja interagir e envie sua mensagem diretamente.",
        },
      ],
    },
    {
      category: "Colaboração",
      icon: <Users className="w-6 h-6" />,
      faqs: [
        {
          question:
            "Posso compartilhar arquivos ou materiais com outros alunos?",
          answer:
            "Sim. No menu de 'Salas', você pode anexar arquivos para compartilhar com seus colegas pelos canais. Basta clicar no ícone de '+' e escolher o arquivo desejado.",
        },
        {
          question: "Como compartilhar um documento com meu grupo?",
          answer:
            "Na página do projeto ou grupo, use a função 'Compartilhar Arquivo'. Selecione o documento do seu dispositivo ou de um serviço de nuvem conectado e defina as permissões de acesso.",
        },
        {
          question: "Como iniciar uma videoconferência?",
          answer:
            "Na página do grupo ou na seção 'Reuniões', clique em 'Nova Reunião'. Configure as opções da chamada e envie convites para os participantes desejados.",
        },
      ],
    },
    {
      category: "Calendário",
      icon: <Calendar className="w-6 h-6" />,
      faqs: [
        {
          question:
            "Como adicionar lembretes ou eventos importantes no calendário?",
          answer:
            "No menu principal, acesse 'Calendário'. Clique no dia desejado e selecione 'Adicionar Evento'. Insira o título do evento, horário e outras informações, como um lembrete. Clique em 'Salvar' para confirmar.",
        },
        {
          question: "Como posso alterar ou remover um evento que eu adicionei?",
          answer:
            "Vá até 'Calendário' e clique no evento que deseja modificar. Selecione 'Editar' para alterar informações como data, horário ou descrição. Se quiser remover o evento, clique em 'Excluir'.",
        },
      ],
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
      {faqs.map((category, index) => (
        <motion.div
          key={index}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: index * 0.1 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                {category.icon}
                <span>{category.category}</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                {category.faqs.map((item, itemIndex) => (
                  <AccordionItem
                    key={itemIndex}
                    value={`item-${index}-${itemIndex}`}
                  >
                    <AccordionTrigger>{item.question}</AccordionTrigger>
                    <AccordionContent>{item.answer}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </motion.div>
  );
};

export default HowToUse;
