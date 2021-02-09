import { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import Input from "../../components/Input";

import { api } from "../../services/api";
import { signIn } from "../../services/security";
import { Container, FormLogin, Header, Body, Button } from "./styles";
import Loading from "../../components/Loading";
import Alert from "../../components/Alert";

function Login() {
  const history = useHistory();

  const [login, setLogin] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const [message, setMessage] = useState(undefined);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const response = await api.post("/sessions", login);

      signIn(response.data);

      history.push("/home");
    } catch (error) {
      setLoading(false);

      setMessage({ title: "Ops...", description: error.response.data.error });

      console.error(error);
    }
  };

  const handleInput = (e) => {
    setLogin({ ...login, [e.target.id]: e.target.value });
  };

  return (
    <>
      <Alert message={message} type={"error"} handleClose={setMessage} />
      {loading && <Loading />}

      <Container>
        <FormLogin onSubmit={handleSubmit}>
          <Header>
            <h1>BEM VINDO AO SENAIOVERFLOW</h1>
            <h2>O SEU PORTAL DE RESPOSTAS</h2>
          </Header>
          <Body>
            <Input
              id="email"
              label="E-mail"
              type="email"
              value={login.email}
              handler={handleInput}
              required
            />
            <Input
              id="password"
              label="Senha"
              type="password"
              value={login.password}
              handler={handleInput}
              required
            />
            <Button>Entrar</Button>
            <Link to="/register"> Ou clique aqui para se cadastrar</Link>
          </Body>
        </FormLogin>
      </Container>
    </>
  );
}

export default Login;
