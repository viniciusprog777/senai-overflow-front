import { Container } from "./styles";

import imgLoading from "../../assets/loading02.png";
function Loading() {
  return (
    <Container>
      <img src={imgLoading} />
      Carregando...
    </Container>
  );
}

export default Loading;
