import { FaSignOutAlt } from "react-icons/fa";

import styled from "styled-components";

export const Container = styled.div`
  width: 100vw;
  height: 100vh;

  background-color: var(--dark);

  display: flex;
  justify-content: center;
`;

export const Header = styled.header`
  position: fixed;
  width: 100%;
  height: 60px;

  display: flex;
  align-items: center;
  justify-content: space-between;

  background-color: var(--primary);
  border-bottom: 1px solid var(--darkGray);

  box-shadow: 0px 1px 5px var(--darkGray);
`;

export const Content = styled.div`
  width: 1280px;
  padding-top: 60px;

  display: grid;
  grid-template-columns: 20% 60% 20%;
`;

export const ProfileContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 20px;
  margin-top: 10px;

  > section {
    display: flex;
    flex-direction: column;
    gap: 4px;
  }
  img {
    width: 35%;
    border-radius: 50%;
    align-self: center;
  }
  a {
    align-self: center;
  }
`;

export const FeedContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  overflow-y: auto;

  padding: 10px 0px;
`;

export const QuestionCard = styled.article`
  width: 80%;
  padding: 10px;

  background-color: var(--darkGray);
  border-radius: 4px;

  > header {
    display: flex;
    align-items: center;
    gap: 10px;

    > img {
      width: 30px;
      height: 30px;
      border-radius: 50%;
    }
  }
  > section {
    margin-top: 10px;

    display: flex;
    flex-direction: column;
    gap: 10px;

    > strong {
      font-size: 18px;
    }
    > p {
      font-size: 15px;
      padding: 10px 5px;

      border-left: 2px solid var(--primary);
    }
    > img {
      max-width: 100%;
      align-self: center;
    }
  }

  > footer {
    margin-top: 10px;
    > h1 {
      font-weight: bold;
      cursor: pointer;
      transition: 0.1s;

      :hover {
        color: var(--primary);
      }
    }
    > section {
      margin-top: 10px;
      border-radius: 4px;
      padding: 4px;

      background-color: var(--dark);

      > header {
        display: flex;
        align-items: center;
        gap: 10px;

        > img {
          width: 30px;
          height: 30px;
          border-radius: 50%;
        }
      }
      > p {
        margin-top: 5px;
        width: 100%;
        padding: 10px 5px;

        border-left: 2px solid var(--primary);
      }
    }
    > form {
      width: 100%;
      margin-top: 5px;

      display: flex;
      gap: 5px;

      > textarea {
        flex: 1;
        padding: 5px;
        font-size: 16px;
        font-family: sans-serif;

        resize: none;
      }
    }
  }
`;

export const ActionContainer = styled.div`
  margin-top: 10px;

  text-align: center;
`;

export const Logo = styled.img`
  width: 60px;
  height: 60px;

  margin: 20px;
  margin-top: 40px;
  border-radius: 30%;
  border: 2px solid var(--dark);

  box-shadow: 0px 0px 5px var(--dark);

  transition: 0.2s;
  cursor: pointer;

  :hover {
    transform: scale(1.1);
    box-shadow: 0px 0px 15px var(--dark);
  }
`;

export const IconSignOut = styled(FaSignOutAlt)`
  font-size: 30px;

  cursor: pointer;

  transition: 0.1s;
  margin-right: 20px;

  :hover {
    color: var(--dark);
  }
`;
