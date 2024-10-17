const About = () => {
  const sections = [
    {
      title: "O projeto",
      content:
        "Campus é um recurso pedagógico desenvolvido para simplificar a interação e cooperação entre alunos e docentes, fomentando um ambiente de ensino mais interativo e acessível. Primeiramente disponibilizada como um site, ela será posteriormente ampliada para um aplicativo para dispositivos móveis, garantindo acesso fácil em qualquer lugar. Dentre suas funcionalidades primordiais estão um sistema de mensagens para comunicação ágil, um instrumento de administração de tarefas para estruturar as tarefas escolares e acompanhar prazos, áreas de colaboração para projetos coletivos e ferramentas de acessibilidade. Além disso, a plataforma prioriza a segurança dos dados dos usuários, adotando medidas rigorosas de proteção e oferecendo controle total sobre as informações pessoais."
    },
    {
      title: "Nossa equipe",
      content:
        "Somos uma equipe de estudantes da Fatec São Caetano do Sul, unida pelo propósito de desenvolver o Campus, um projeto voltado para a melhoria da comunicação e gestão de atividades acadêmicas. Este trabalho faz parte da conclusão do curso de Análise e Desenvolvimento de Sistemas, sob a orientação do professor Dr. Adilson. Rafhael Rômulo Trevas, Gabriel Sales Nascimento e Bryan Wagner Consoli foram responsáveis pela documentação e pesquisas essenciais para a base do projeto. Enzo Candido da Silva, Guilherme da Silva Almeida e Gabriel Ricardo de Morais Pelossi se concentraram no desenvolvimento técnico, cuidando do frontend, backend, segurança e banco de dados."
    }
  ];

  return (
    <div className="md:flex justify-evenly">
      {sections.map((section, index) => (
        <div key={index} className="m-4 text-justify">
          <h1 className="text-2xl">{section.title}</h1>
          <p className="mt-2 font-light">{section.content}</p>
        </div>
      ))}
    </div>
  );
};

export default About;
