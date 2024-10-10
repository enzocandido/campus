import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

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
    <div>
      <h1 className="text-2xl mb-10 text-center">
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
