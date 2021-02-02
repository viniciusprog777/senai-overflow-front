import { Container, FormLogin, Header, Body, Button } from "./styles.js";
import Input from "../../components/Input/index.js";
import { Link, useHistory } from "react-router-dom";
import { api } from "../../services/api";
import { useState } from "react";

function Register() {
  const history = useHistory();

  const [register, setRegister] = useState({
    ra: "",
    name: "",
    email: "",
    password: "",
    validPassword: "",
  });
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (register.password !== register.validPassword)
      return alert("SENHAS NÃO COMPATIVEIS");
    try {
      const response = await api.post("/students", {
        ra: register.ra,
        name: register.name,
        email: register.email,
        password: register.password,
      });
      console.log(response.data);

      //implementar a autorização

      history.push("/home");
    } catch (error) {
      console.error(error);
      alert(error.response.data.error);
    }
  };
  const handleInput = (e) => {
    setRegister({ ...register, [e.target.id]: e.target.value });
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
            label="RA"
            id="ra"
            type="text"
            value={register.ra}
            handler={handleInput}
            required
          />
          <Input
            label="Nome"
            id="name"
            type="text"
            value={register.name}
            handler={handleInput}
            required
          />
          <Input
            label="Email"
            id="email"
            type="email"
            value={register.email}
            handler={handleInput}
            required
          />
          <Input
            label="Senha"
            id="password"
            type="password"
            value={register.password}
            handler={handleInput}
            required
          />
          <Input
            label="Confirme a Senha"
            id="validPassword"
            type="password"
            value={register.validPassword}
            handler={handleInput}
            required
          />
          <Button
            disabled={
              !register.name ||
              !register.email ||
              !register.ra ||
              !register.password ||
              !register.validPassword ||
              register.password !== register.validPassword
            }
          >
            Entrar
          </Button>
          <Link to="/">OU CLIQUE AQUI SE JA TEM CADASTRO</Link>
        </Body>
      </FormLogin>
    </Container>
  );
}

export default Register;
