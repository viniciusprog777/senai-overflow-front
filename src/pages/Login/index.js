import { Container, FormLogin, Header, Body, Button } from "./styles.js";
import Input from "../../components/Input/index.js";
import { Link, useHistory } from "react-router-dom";
import { api } from "../../services/api";
import { useState } from "react";

function Login() {
  const history = useHistory();

  const [login, setLogin] = useState({
    email: "",
    password: "",
  });
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await api.post("/sessions", login);
      console.log(response.data);

      //implementar a autorização

      history.push("/home");
    } catch (error) {
      console.error(error);
      alert(error.response.data.error);
    }
  };
  const handleInput = (e) => {
    setLogin({ ...login, [e.target.id]: e.target.value });
  };

  return (
    <Container>
      <FormLogin onSubmit={handleSubmit}>
        <Header>
          <h1>Bem vindo ao SENAI OVERFLOW</h1>
          <h2>Bem vindo ao SENAI OVERFLOW</h2>
        </Header>
        <Body>
          <Input
            label="Email"
            id="email"
            type="email"
            value={login.email}
            handler={handleInput}
            required
          />
          <Input
            label="Senha"
            id="password"
            type="password"
            valeu={login.password}
            handler={handleInput}
            required
          />
          <Button>Entrar</Button>
          <Link to="/register"> OU CLIQUE AQUI PARA SE CADASTRAR</Link>
        </Body>
      </FormLogin>
    </Container>
  );
}

export default Login;
