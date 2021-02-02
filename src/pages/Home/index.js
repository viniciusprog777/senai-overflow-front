import { useHistory } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  Container,
  Header,
  Content,
  ProfileContainer,
  FeedContainer,
  ActionContainer,
  QuestionCard,
  Logo,
  IconSignOut,
} from "./styles";

import imgProfile from "../../asset/foto_perfil.png";
import logo from "../../asset/logo.png";
import { api } from "../../services/api";
import { signOut } from "../../services/security";

function Profile() {
  return (
    <>
      <section>
        <img src={imgProfile} alt="descrição da imagem" />
        <a href="a">Editar foto</a>
      </section>
      <section>
        <strong>NOME:</strong>
        <p>Fulano de Tal</p>
      </section>
      <section>
        <strong>EMAIL:</strong>
        <p>fulano@gmail.com</p>
      </section>
      <section>
        <strong>RA:</strong>
        <p>1234567</p>
      </section>
    </>
  );
}
function Question({ question }) {
  return (
    <QuestionCard>
      <header>
        <img src={imgProfile} alt="descrição da imagem" />
        <strong>Por {question.Student.name}</strong>
        <p>em {question.created_at}</p>
      </header>
      <section>
        <strong>{question.title}</strong>
        <p>{question.description}</p>
        <img src={question.image} />
      </section>
      <footer>
        <h1>11 Resposta</h1>
        <section>
          <header>
            <img src={imgProfile} alt="descrição da imagem" />
            <strong>Por Fulano</strong>
            <p>12/12/2012 as 12:13</p>
          </header>
          <p>Resposta para a pergunta</p>
        </section>
        <form>
          <textarea
            rows="2"
            placeholder="Responda essa duvida!"
            required
          ></textarea>
          <button>Enviar</button>
        </form>
      </footer>
    </QuestionCard>
  );
}
function Home() {
  const history = useHistory();

  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    const loadQuestions = async () => {
      const response = await api.get("/feed");
      console.log(response.data);

      setQuestions(response.data);
    };
    loadQuestions();
  }, []);

  const handleSignOut = () => {
    signOut();

    history.replace("/");
  };
  return (
    <Container>
      <Header>
        <Logo src={logo} />
        <IconSignOut onClick={handleSignOut} />
      </Header>
      <Content>
        <ProfileContainer>
          <Profile />
        </ProfileContainer>
        <FeedContainer>
          {questions.map((q) => (
            <Question question={q} />
          ))}
        </FeedContainer>
        <ActionContainer>
          <button>Fazer uma pergunta</button>
        </ActionContainer>
      </Content>
    </Container>
  );
}

export default Home;
