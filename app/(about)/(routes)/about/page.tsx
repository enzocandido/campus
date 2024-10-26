"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const About = () => {
  const sections = [
    {
      title: "O projeto",
      content:
        "Campus é um recurso pedagógico desenvolvido para simplificar a interação e cooperação entre alunos e docentes, fomentando um ambiente de ensino mais interativo e acessível. Primeiramente disponibilizada como um site, ela será posteriormente ampliada para um aplicativo para dispositivos móveis, garantindo acesso fácil em qualquer lugar. Dentre suas funcionalidades primordiais estão um sistema de mensagens para comunicação ágil, um instrumento de administração de tarefas para estruturar as tarefas escolares e acompanhar prazos, áreas de colaboração para projetos coletivos e ferramentas de acessibilidade. Além disso, a plataforma prioriza a segurança dos dados dos usuários, adotando medidas rigorosas de proteção e oferecendo controle total sobre as informações pessoais.",
    },
    {
      title: "Nossa equipe",
      content:
        "Somos uma equipe de estudantes da Fatec São Caetano do Sul, unida pelo propósito de desenvolver o Campus, um projeto voltado para a melhoria da comunicação e gestão de atividades acadêmicas. Este trabalho faz parte da conclusão do curso de Análise e Desenvolvimento de Sistemas, sob a orientação do professor Dr. Adilson. Rafhael Rômulo Trevas, Gabriel Sales Nascimento e Bryan Wagner Consoli foram responsáveis pela documentação e pesquisas essenciais para a  base do projeto. Enzo Candido da Silva, Guilherme da Silva Almeida e Gabriel Ricardo de Morais Pelossi se concentraram no desenvolvimento técnico, cuidando do frontend, backend, segurança e banco de dados.",
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="space-y-8"
    >
      <h1 className="text-3xl font-bold text-center mb-10">Sobre o Campus</h1>
      <div className="grid md:grid-cols-2 gap-8">
        {sections.map((section, index) => (
          <motion.div
            key={index}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: index * 0.2 }}
          >
            <Card>
              <CardHeader>
                <CardTitle>{section.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{section.content}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default About;
