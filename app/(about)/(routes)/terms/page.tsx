"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Terms = () => {
  const terms = [
    {
      title: "Objetivo da Plataforma",
      content:
        "O Campus é uma plataforma educacional projetada para facilitar a interação entre alunos e professores, fornecendo ferramentas para gerenciamento de tarefas, comunicação e colaboração em projetos acadêmicos.",
    },
    {
      title: "Uso Apropriado",
      content:
        "Os usuários devem utilizar a plataforma de maneira ética e respeitosa, seguindo as diretrizes da instituição de ensino e as leis aplicáveis. É proibido o compartilhamento de conteúdo inadequado ou que viole direitos autorais.",
    },
    {
      title: "Cadastro e Segurança",
      content:
        "Os usuários são responsáveis por manter a segurança de suas contas, utilizando senhas fortes e não compartilhando suas credenciais. A plataforma implementa medidas de segurança, mas os usuários devem estar atentos à proteção de seus dados.",
    },
    {
      title: "Privacidade",
      content:
        "O Campus respeita a privacidade dos usuários e segue rigorosas políticas de proteção de dados. As informações pessoais são coletadas e utilizadas apenas para fins educacionais e de melhoria da plataforma, conforme descrito em nossa Política de Privacidade.",
    },
    {
      title: "Acessibilidade",
      content:
        "Nos esforçamos para tornar o Campus acessível a todos os usuários, incluindo aqueles com necessidades especiais. Continuamente trabalhamos para melhorar os recursos de acessibilidade da plataforma.",
    },
    {
      title: "Modificações nos Termos",
      content:
        "O Campus reserva-se o direito de modificar estes termos de uso quando necessário. Os usuários serão notificados sobre alterações significativas e o uso contínuo da plataforma implica na aceitação dos novos termos.",
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      <h1 className="text-3xl font-bold text-center mb-6">
        Termos de Uso do Campus
      </h1>
      {terms.map((term, index) => (
        <motion.div
          key={index}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: index * 0.1 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>{term.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">{term.content}</p>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </motion.div>
  );
};

export default Terms;
