import { Container } from "./styles";
import { useEffect, useRef } from "react";

function Alert({ message, type, handleClose }) {
  const containerRef = useRef();

  useEffect(() => {
    if (message) {
      //containerRef.current.style.display = "block";
      containerRef.current.style.width = "300px";

      setTimeout(() => {
        handleClose(undefined);
      }, 5000);
    } else {
      //containerRef.current.style.display = "none";
      containerRef.current.style.width = "0px";
    }
  }, [message, handleClose]);

  return (
    <Container type={type} ref={containerRef}>
      {message && (
        <>
          <span onClick={() => handleClose(undefined)}>&times;</span>
          <h1>{message.title}</h1>
          <p>{message.description}</p>
        </>
      )}
    </Container>
  );
}

export default Alert;
