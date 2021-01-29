import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  position: relative;
  margin-top: 15px;

  > input {
    border: 0;
    padding-left: 10px;
    border-radius: 3px;

    font-family: sans-serif;
  }

  > label {
    cursor: text;
    position: absolute;
    top: 0;
    left: 10px;
    color: var(--darkGray);
    display: flex;
    align-items: center;
    top: 0;
    transition: 0.2s;

    pointer-events: none;
  }

  > input,
  > label {
    width: 100%;
    height: 30px;
    font-size: 16px;
  }

  > input:not(:placeholder-shown) + label,
  > input:focus + label {
    font-size: 14px;
    color: var(--light);
    top: -25px;
    left: 0;
  }
`;
