import { useEffect, useState, useRef } from "react";
import { useHistory } from "react-router-dom";
import { format } from "date-fns";
import ReactEmbedGist from "react-embed-gist";
import {
  Container,
  Header,
  Content,
  ProfileContainer,
  FeedContainer,
  ActionsContainer,
  QuestionCard,
  Logo,
  IconSignOut,
  FormNewQuestion,
  GistIcon,
  ContainerGist,
  SearchBar,
  IconSearch,
} from "./styles";

import Input from "../../components/Input";
import imgProfile from "../../assets/foto_perfil.png";
import logo from "../../assets/logo.png";
import { api } from "../../services/api";
import { getUser, signOut, setUser } from "../../services/security";
import Modal from "../../components/Modal";
import Select from "../../components/Select";
import Tag from "../../components/Tag";
import Loading from "../../components/Loading";
import { validSquaredImage } from "../../utils";
import { FaGithub } from "react-icons/fa";
import SpinnerLoading from "../../components/SpinnerLoading";

function Profile({ handleLoading, handleReload }) {
  const [student, setStudent] = useState(getUser());

  // useEffect(() => {
  //   setStudent();
  // }, []);

  const handleImage = async (e) => {
    if (!e.target.files[0]) return;

    try {
      await validSquaredImage(e.target.files[0]);
      console.log("oioiooi", e.target.files[0]);

      handleLoading(true);
      const data = new FormData();

      data.append("image", e.target.files[0]);

      const response = await api.post("/students/images", data);

      setTimeout(() => {
        setStudent({ ...student, studentImage: response.data.image });
        handleReload();
      }, 1000);

      setUser({ ...student, studentImage: response.data.image });
    } catch (error) {
      console.log(error);
      alert(error);
      handleLoading(false);
    }
  };

  return (
    <>
      <section>
        <img src={student.studentImage || imgProfile} alt="Imagem de Perfil" />
        <label href="#" htmlFor="editImageProfile">
          Editar Foto
        </label>
        <input type="file" id="editImageProfile" onChange={handleImage} />
      </section>
      <section>
        <strong>NOME:</strong>
        <p>{student.studentName}</p>
      </section>
      <section>
        <strong>RA:</strong>
        <p>{student.studentRa}</p>
      </section>
      <section>
        <strong>E-MAIL:</strong>
        <p>{student.studentEmail}</p>
      </section>
    </>
  );
}

function Answer({ answer }) {
  const student = getUser();

  return (
    <section>
      <header>
        <img src={answer.Student.image || imgProfile} />
        <strong>
          por{" "}
          {student.studentId === answer.Student.id
            ? "Você"
            : answer.Student.name}
        </strong>
        <p> {format(new Date(answer.created_at), "dd/MM/yyyy 'às' HH:mm")}</p>
      </header>
      <p>{answer.description}</p>
    </section>
  );
}

function Question({ question, handleLoading, setCurrentGist }) {
  const [showAnswers, setShowAnswers] = useState(false);

  const [newAnswer, setNewAnswer] = useState("");

  const [answers, setAnswers] = useState(question.Answers);

  useEffect(() => {
    setAnswers(question.Answers);
  }, [question.Answers]);

  const qtdAnswers = answers.length;

  const handleAddAnswer = async (e) => {
    e.preventDefault();

    if (newAnswer.length < 10)
      return alert("A resposta deve ter no mínimo 10 caracteres");

    try {
      handleLoading(true);
      const response = await api.post(`/questions/${question.id}/answers`, {
        description: newAnswer,
      });

      const aluno = getUser();

      const answerAdded = {
        id: response.data.id,
        description: newAnswer,
        created_at: response.data.createdAt,
        Student: {
          id: aluno.studentId,
          name: aluno.name,
          image: aluno.studentImage,
        },
      };

      setAnswers([...answers, answerAdded]);

      setNewAnswer("");

      handleLoading(false);
    } catch (error) {
      handleLoading(false);
      alert(error);
    }
  };

  const student = getUser();

  return (
    <QuestionCard>
      <header>
        <img
          src={question.Student.image || imgProfile}
          alt="Imagem de perfil"
        />
        <strong>
          por{" "}
          {student.studentId === question.Student.id
            ? "Você"
            : question.Student.name}
        </strong>
        <p>
          em {format(new Date(question.created_at), "dd/MM/yyyy 'às' HH:mm")}
        </p>
        {question.gist && (
          <GistIcon onClick={() => setCurrentGist(question.gist)} />
        )}
      </header>
      <section>
        <strong>{question.title}</strong>
        <p>{question.description}</p>
        <img src={question.image} />
      </section>
      <footer>
        <h1 onClick={() => setShowAnswers(!showAnswers)}>
          {qtdAnswers === 0 ? (
            "Seja o primeiro a responder"
          ) : (
            <>
              {qtdAnswers}
              {qtdAnswers > 1 ? " Respostas" : " Resposta"}
            </>
          )}
        </h1>
        {showAnswers && (
          <>
            {answers.map((answer) => (
              <Answer answer={answer} />
            ))}
          </>
        )}
        <form onSubmit={handleAddAnswer}>
          <textarea
            minLength={10}
            placeholder="Responda essa dúvida!"
            onChange={(e) => setNewAnswer(e.target.value)}
            required
            value={newAnswer}
          ></textarea>
          <button>Enviar</button>
        </form>
      </footer>
    </QuestionCard>
  );
}

function NewQuestion({ handleReload, handleLoading }) {
  const [newQuestion, setNewQuestion] = useState({
    title: "",
    description: "",
    gist: "",
  });

  const [categories, setCategories] = useState([]);

  const [categoriesSel, setCategoriesSel] = useState([]);

  const [image, setImage] = useState(null);

  const imageRef = useRef();

  const categoriesRef = useRef();

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const response = await api.get("/categories");

        setCategories(response.data);
      } catch (error) {
        alert(error);
      }
    };

    loadCategories();
  }, []);

  const handleCategories = (e) => {
    const idSel = e.target.value;

    const categorySel = categories.find((c) => c.id.toString() === idSel);

    if (!categoriesSel.includes(categorySel)) {
      setCategoriesSel([...categoriesSel, categorySel]);
    }

    e.target[e.target.selectedIndex].disabled = true;

    e.target.value = "";
  };

  const handleImage = (e) => {
    if (e.target.files[0]) {
      imageRef.current.src = URL.createObjectURL(e.target.files[0]);
      imageRef.current.style.display = "flex";
    } else {
      imageRef.current.src = "";
      imageRef.current.style.display = "none";
    }
    setImage(e.target.files[0]);
  };

  const handleUnselCategory = (idUnsel) => {
    setCategoriesSel(categoriesSel.filter((c) => c.id !== idUnsel));

    const { options } = categoriesRef.current;

    for (let i = 0; i < options.length; i++) {
      if (options[i].value === idUnsel.toString()) options[i].disabled = false;
    }
  };

  const handleInput = (e) => {
    setNewQuestion({ ...newQuestion, [e.target.id]: e.target.value });
  };
  const handleAddNewQuestion = async (e) => {
    e.preventDefault();

    const data = new FormData();

    data.append("title", newQuestion.title);
    data.append("description", newQuestion.description);

    const categories = categoriesSel.reduce((s, c) => (s += c.id + ","), "");

    data.append("categories", categories.substr(0, categories.length - 1));

    if (image) data.append("image", image);
    if (newQuestion.gist) data.append("gist", newQuestion.gist);
    try {
      handleLoading(true);

      await api.post("/questions", data, {
        headers: {
          "Content-type": "multipart/form-data",
        },
      });

      handleReload();
    } catch (error) {
      handleLoading(false);
    }
  };
  return (
    <FormNewQuestion onSubmit={handleAddNewQuestion}>
      <Input
        id="title"
        label="Título"
        value={newQuestion.title}
        handler={handleInput}
      />
      <Input
        id="description"
        label="Descrição"
        value={newQuestion.description}
        handler={handleInput}
      />
      <Input
        id="gist"
        label="Gist"
        value={newQuestion.gist}
        handler={handleInput}
      />
      <Select
        id="categories"
        label="Categorias"
        handler={handleCategories}
        ref={categoriesRef}
      >
        <option value="" selected disabled>
          Selecione
        </option>
        {categories.map((c) => (
          <option key={c.id} value={c.id}>
            {c.description}
          </option>
        ))}
      </Select>
      <div>
        {categoriesSel.map((c) => (
          <Tag
            key={c.id}
            info={c.description}
            handleClose={() => handleUnselCategory(c.id)}
          ></Tag>
        ))}
      </div>
      <input type="file" onChange={handleImage} />
      <img alt="Pré visualização" ref={imageRef} />
      <button>Enviar</button>
    </FormNewQuestion>
  );
}

function Gist({ gist, handleClose }) {
  if (gist) {
    const formatedGist = gist.split(".com/").pop();
    return (
      <Modal
        title="Exemplo de código"
        handleClose={() => handleClose(undefined)}
      >
        <ContainerGist>
          <ReactEmbedGist gist={formatedGist} />
        </ContainerGist>
      </Modal>
    );
  } else return null;
}

function Home() {
  const history = useHistory();

  const [questions, setQuestions] = useState([]);

  const [reload, setReload] = useState(null);

  const [showNewQuestion, setShowNewQuestion] = useState(false);

  const [loading, setLoading] = useState(false);

  const [loadingFeed, setLoadingFeed] = useState(false);

  const [currentGist, setCurrentGist] = useState(undefined);

  const [page, setPage] = useState(1);

  const [totalQuestions, setTotalQuestions] = useState(0);

  const [search, setSearch] = useState("");

  const handleSearch = async (e) => {
    setSearch(e.target.value);

    if (e.target.value.length === 0) handleReload();

    if (e.target.value.length < 4) return;

    try {
      const response = await api.get(`/search`, {
        params: {
          description: e.target.value,
        },
      });

      setQuestions(response.data);
    } catch (error) {
      console.log(error);
      alert(error);
    }
  };

  const loadQuestions = async () => {
    if (loadingFeed) return;

    if (totalQuestions > 0 && totalQuestions == questions.length) return;

    setLoadingFeed(true);
    const response = await api.get(`/feed`, {
      params: { page },
    });
    setPage(page + 1);
    setQuestions([...questions, ...response.data]);

    setTotalQuestions(response.headers["x-total-count"]);

    setLoadingFeed(false);
  };
  useEffect(() => {
    loadQuestions();
  }, [reload]);

  const handleSignOut = () => {
    signOut();

    history.replace("/");
  };

  const handleReload = () => {
    setShowNewQuestion(false);
    setQuestions([]);
    setLoading(false);
    setPage(1);
    setSearch("");
    setReload(Math.random());
  };

  const feedScrollObserver = (e) => {
    const { scrollTop, clientHeight, scrollHeight } = e.target;
    if (scrollTop + clientHeight > scrollHeight - 50 && search.length < 4) {
      loadQuestions();
    }
  };

  return (
    <>
      <Gist gist={currentGist} handleClose={setCurrentGist} />
      {showNewQuestion && (
        <Modal
          title="Faça uma pergunta"
          handleClose={() => setShowNewQuestion(false)}
        >
          <NewQuestion handleReload={handleReload} handleLoading={setLoading} />
        </Modal>
      )}
      {loading && <Loading />}

      <Container>
        <Header>
          <Logo src={logo} onClick={handleReload} />
          <SearchBar>
            <Input
              id="search"
              type="search"
              label="Procure"
              value={search}
              handler={handleSearch}
            />
            <IconSearch />
          </SearchBar>
          <IconSignOut onClick={handleSignOut} />
        </Header>
        <Content>
          <ProfileContainer>
            <Profile handleReload={handleReload} handleLoading={setLoading} />
          </ProfileContainer>
          <FeedContainer onScroll={feedScrollObserver}>
            {questions.length === 0 &&
              search.length > 3 &&
              "Nenhuma Questão Encontrada!"}
            {questions.map((q) => (
              <Question
                question={q}
                handleLoading={setLoading}
                setCurrentGist={setCurrentGist}
              />
            ))}
            {loadingFeed && <SpinnerLoading />}
            {totalQuestions == questions.length && "That's all Folks"}
          </FeedContainer>
          <ActionsContainer>
            <button onClick={() => setShowNewQuestion(true)}>
              Fazer uma pergunta
            </button>
          </ActionsContainer>
        </Content>
      </Container>
    </>
  );
}

export default Home;
