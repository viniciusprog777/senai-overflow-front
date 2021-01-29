import {
  Container,
  Header,
  Content,
  ProfileContainer,
  FeedContainer,
  ActionContainer,
  QuestionCard,
} from "./styles";

import imgProfile from "../../asset/foto_perfil.png";

function Profile() {
  return (
    <>
      <section>
        <img src={imgProfile} />
        <a href="a" />
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
function Home() {
  return (
    <Container>
      <Header></Header>
      <Content>
        <ProfileContainer>
          <Profile />
        </ProfileContainer>
        <FeedContainer>
          <QuestionCard>
            <header>
              <img src={imgProfile} />
              <strong>Por Ciclano da Silva</strong>
              <p>em 12/12/2012 as 12:12</p>
            </header>
            <section>
              <strong>Titulo</strong>
              <p>Descrição</p>
              <img src="https://cdn.evilmartians.com/front/posts/optimizing-react-virtual-dom-explained/cover-a1d5b40.png" />
            </section>
            <footer></footer>
          </QuestionCard>
        </FeedContainer>
        <ActionContainer>
          <button>Fazer uma pergunta</button>
        </ActionContainer>
      </Content>
    </Container>
  );
}

export default Home;
