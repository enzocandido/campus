const About = () => {
  const sections = [
    {
      title: "Sobre nós",
      content:
        "Campus é um recurso pedagógico desenvolvido para simplificar a interação e cooperação entre alunos e docentes, fomentando um ambiente de ensino mais interativo e acessível. Primeiramente disponibilizada como um site, ela será posteriormente ampliada para um aplicativo para dispositivos móveis, garantindo acesso fácil em qualquer lugar. Dentre suas funcionalidades primordiais estão um sistema de mensagens para comunicação ágil, um instrumento de administração de tarefas para estruturar as tarefas escolares e acompanhar prazos, áreas de colaboração para projetos coletivos e ferramentas de acessibilidade. Além disso, a plataforma prioriza a segurança dos dados dos usuários, adotando medidas rigorosas de proteção e oferecendo controle total sobre as informações pessoais."
    },
    {
      title: "O projeto",
      content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam maximus nec tellus eu tempor. Curabitur id leo ut mauris tincidunt euismod. Sed id leo ut libero egestas pulvinar nec sed urna. Quisque nec sem ac lorem pellentesque dignissim a ut neque. Morbi ullamcorper mi quis efficitur ultricies. Curabitur lobortis fringilla orci, sit amet vulputate turpis venenatis vel. Maecenas ut lorem ac eros consectetur laoreet sed et velit. Quisque venenatis, turpis tempor dapibus luctus, risus diam commodo nisl, non malesuada neque lorem ac velit. Integer vulputate risus hendrerit justo efficitur vehicula. Cras vel ligula sed nulla aliquet tincidunt non at lorem. Duis sit amet libero venenatis ipsum dictum accumsan a dignissim ante. Phasellus commodo, orci vel feugiat aliquet, eros neque tempor mi, eget tristique ante ligula vel eros. Cras eu congue nisi."
    }
  ];

  return (
    <div className="md:flex justify-evenly">
      {sections.map((section, index) => (
        <div key={index} className="m-4">
          <h1 className="text-2xl">{section.title}</h1>
          <p className="mt-2 font-light">{section.content}</p>
        </div>
      ))}
    </div>
  );
};

export default About;
