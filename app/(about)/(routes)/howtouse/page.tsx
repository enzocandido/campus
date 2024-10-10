import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const HowToUse = () => {
  return (
    <div>
      <h1 className="text-2xl mb-10 text-center">
        Como Usar a Plataforma - Perguntas Frequentes
      </h1>
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="item-1">
          <AccordionTrigger>Como posso criar minha conta?</AccordionTrigger>
          <AccordionContent>
            Para criar uma conta, selecione “Registre-se” na página inicial,
            insira seu e-mail, crie uma senha segura e complete os dados
            necessários.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger>Como eu envio uma tarefa?</AccordionTrigger>
          <AccordionContent>
            Entre na seção "Tarefas", escolha "Enviar Tarefa", escolha o arquivo
            ou preencha as informações exigidas e pressione "Enviar".
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-3">
          <AccordionTrigger>
            Como posso me comunicar com meus professores e colegas?
          </AccordionTrigger>
          <AccordionContent>
            Primeiramente, faça login no servidor da sua classe ou grupo.
            Depois, acesse "Mensagens", selecione o membro com quem deseja
            interagir e envie sua mensagem diretamente.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-4">
          <AccordionTrigger>Como redefino minha senha?</AccordionTrigger>
          <AccordionContent>
            Se você esqueceu sua senha, selecione "Esqueci a senha" na página de
            login. Um e-mail será enviado a você com instruções para definir uma
            nova senha.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default HowToUse;
