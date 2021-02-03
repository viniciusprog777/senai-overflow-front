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
import { signOut, getUser } from "../../services/security";

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

function Answer({ answer }) {
  return (
    <>
      <section>
        <header>
          <img src={imgProfile} alt="descrição da imagem" />
          <strong>Por {answer.Student.name}</strong>
          <p>{answer.created_at}</p>
        </header>
        <p>{answer.description}</p>
      </section>
    </>
  );
}

function Question({ question }) {
  const [showAnswers, setShowAnswers] = useState(false);

  const [addAnswer, setAddAnswer] = useState(question.Answers);

  const [newAnswer, setNewAnswer] = useState({
    description: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await api.post(
        `/questions/${question.id}/answers`,
        newAnswer
      );

      const user = getUser();

      const addedAnswer = {
        id: response.data.id,
        description: newAnswer.description,
        created_at: response.data.createdAt,
        Student: {
          id: user.studentId,
          name: user.studentName,
        },
      };

      setAddAnswer([...addAnswer, addedAnswer]);

      // history.push("/home");
    } catch (error) {
      console.error(error);
      alert(error.response.data.error);
    }
  };

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
        <h1 onClick={() => setShowAnswers(!showAnswers)}>
          {addAnswer.length} Respostas
        </h1>
        {showAnswers && (
          <>
            {addAnswer.map((a) => (
              <Answer answer={a} />
            ))}
          </>
        )}

        <form onSubmit={handleSubmit}>
          <textarea
            rows="2"
            placeholder="Responda essa duvida!"
            value={addAnswer.description}
            onChange={(e) => setNewAnswer({ description: e.target.value })}
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
