import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const HowToUse = () => {
  const faqs = [
    {
      category: "Conta",
      faqs: [
        {
          question: "Como posso criar minha conta?",
          answer: "Para criar uma conta, selecione 'Registre-se' na página inicial, insira seu e-mail, crie uma senha segura e complete os dados necessários."
        },
        {
          question: "Como redefino minha senha?",
          answer: "Se você esqueceu sua senha, selecione 'Esqueci a senha' na página de login. Um e-mail será enviado a você com instruções para definir uma nova senha."
        },
        {
          question: "Como faço para editar minhas informações pessoais ou foto de perfil?",
          answer: "No canto inferior esquerdo, clique no ícone do seu perfil e selecione 'Editar Perfil'. Lá, você pode alterar seu nome, adicionar uma foto de perfil e modificar outras informações pessoais."
        },
        {
          question: "O que devo fazer se encontrar problemas técnicos ou dúvidas?",
          answer: "Se precisar de ajuda, vá até a seção 'Suporte' na tela de login e preencha o formulário com seu nome, email e a mensagem. Nossa equipe responderá o mais breve possível."
        }
      ],
    },
    {
      category: "Tarefas",
      faqs: [
        {
          question: "Como eu envio uma tarefa?",
          answer: "Entre na seção 'Tarefas', escolha 'Enviar Tarefa', escolha o arquivo ou preencha as informações exigidas e pressione 'Enviar'."
        },
        {
          question: "Como posso ver as tarefas que tenho?",
          answer: "Na página principal, clique em 'Tarefas', onde é possível visualizar tanto as tarefas pendentes quanto as concluídas. Além disso, você pode verificar a data de entrega de cada tarefa no calendário"
        }
      ],
    },
    {
      category: "Comunicação",
      faqs: [
        {
          question: "Como posso me comunicar com meus professores e colegas?",
          answer: "Primeiramente, faça login no servidor da sua classe ou grupo. Depois, acesse 'Mensagens', selecione o membro com quem deseja interagir e envie sua mensagem diretamente."
        }
      ],
    },
    {
      category: "Calendário",
      faqs: [
        {
          question: "Como adicionar lembretes ou eventos importantes no calendário?",
          answer: "No menu principal, acesse 'Calendário'. Clique no dia desejado e selecione 'Adicionar Evento'. Insira o título do evento, horário e outras informações, como um lembrete. Clique em 'Salvar' para confirmar."
        },
        {
          question: "Como posso alterar ou remover um evento que eu adicionei?",
          answer: "Vá até 'Calendário' e clique no evento que deseja modificar. Selecione 'Editar' para alterar informações como data, horário ou descrição. Se quiser remover o evento, clique em 'Excluir'."
        }
      ],
    },
    {
      category: "Compartilhamento",
      faqs: [
        {
          question: "Posso compartilhar arquivos ou materiais com outros alunos?",
          answer: "Sim. No menu de 'Salas', você pode anexar arquivos para compartilhar com seus colegas pelos canais. Basta clicar no ícone de '+' e escolher o arquivo desejado."
        }
      ],
    },
  ];

  return (
    <div>
      <h1 className="text-2xl mb-10 text-center">
        Como Usar a Plataforma - Perguntas Frequentes
      </h1>
      <Accordion type="single" collapsible className="w-full">
        {faqs.map((faq, index) => (
          <div key={index} className="mb-8">
            <h2 className="text-xl font-semibold mb-4">{faq.category}</h2>
            {faq.faqs.map((item, itemIndex) => (
              <AccordionItem
                key={itemIndex}
                value={`item-${index}-${itemIndex}`}
                className="mb-2"
              >
                <AccordionTrigger>{item.question}</AccordionTrigger>
                <AccordionContent>{item.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </div>
        ))}
      </Accordion>
    </div>
  );
};

export default HowToUse;
