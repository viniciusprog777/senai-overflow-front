import { Container, FormLogin, Header, Body, Button } from "./styles.js";
import Input from "../../components/Input/index.js";

function Login() {
  return (
    <Container>
      <FormLogin>
        <Header>
          <h1>Bem vindo ao SENAI OVERFLOW</h1>
          <h2>Bem vindo ao SENAI OVERFLOW</h2>
        </Header>
        <Body>
          <Input label="Email" id="email" type="email" />
          <Input label="Senha" id="password" type="password" />
          <Button>Entrar</Button>
          <a href="#">OU CLIQUE AQUI PARA SE CADASTRAR</a>
        </Body>
      </FormLogin>
    </Container>
  );
}

export default Login;
