const Terms = () => {
  const terms = [
    {
      title: "Objetivo da Plataforma",
      content:
        "A plataforma é destinada a facilitar a comunicação entre alunos e docentes. Trata-se de um ambiente seguro para a partilha de informações educativas, administração de tarefas e trabalho em equipe.",
    },
    {
      title: "Uso Apropriado",
      content:
        "Os usuários devem utilizar a plataforma de forma responsável e respeitosa, respeitando todas as leis e normas pertinentes. É vedado o uso de conteúdos ofensivos, discriminatórios ou que infrinjam direitos autorais.",
    },
    {
      title: "Cadastro e Segurança",
      content:
        "Para acessar todas as funcionalidades, é necessário criar uma conta. Os usuários são encarregados de proteger a segurança de suas senhas e de todas as ações realizadas em suas contas.",
    },
    {
      title: "Privacidade",
      content:
        "A plataforma coleta e guarda dados pessoais para garantir uma experiência individualizada e protegida. Todas as informações são processadas de acordo com nossa política de privacidade.",
    },
    {
      title: "Acessibilidade",
      content:
        "Temos o compromisso de disponibilizar ferramentas de acessibilidade para garantir que indivíduos com deficiências, especialmente visuais, possam aproveitar ao máximo a plataforma.",
    },
    {
      title: "Modificações nos Termos",
      content:
        "Temos a liberdade de alterar os termos de uso a qualquer momento. Todas as modificações serão informadas aos usuários, que precisarão concordar com as novas condições para continuar usando a plataforma.",
    },
  ];

  return (
    <div className="justify-center">
      <div>
        <h1 className="text-2xl">Termos de uso do Campus</h1>
        <div className="mt-2 font-light">
          {terms.map((term, index) => (
            <div key={index} className="m-4 text-justify">
              <p>
                <strong>
                  {index + 1}. {term.title}:
                </strong>
              </p>
              <p>{term.content}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Terms;
