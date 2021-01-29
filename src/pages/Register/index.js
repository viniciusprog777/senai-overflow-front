import { Container, FormLogin, Header, Body, Button } from "./styles.js";
import Input from "../../components/Input/index.js";

function Register() {
  return (
    <Container>
      <FormLogin>
        <Header>
          <h1>Bem vindo ao SENAI OVERFLOW</h1>
          <h2>Bem vindo ao SENAI OVERFLOW</h2>
        </Header>
        <Body>
          <Input label="RA" id="ra" type="text" />
          <Input label="Nome" id="name" type="text" />
          <Input label="Email" id="email" type="email" />
          <Input label="Senha" id="password" type="password" />
          <Input label="Confirme a Senha" id="valid-password" type="password" />
          <Button>Entrar</Button>
          <a href="#">OU CLIQUE AQUI SE JA TEM CADASTRO</a>
        </Body>
      </FormLogin>
    </Container>
  );
}

export default Register;
