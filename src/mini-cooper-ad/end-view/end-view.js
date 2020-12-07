import React from "react";
import styled from "styled-components";
import WinImage from "./images/win-image.png";
import LoseImage from "./images/lose-image.png";
import RestartButtonImage from "./images/restart-button.svg";

const EndImage = styled.img`
  height: 100%;
  object-fit: cover;
`;

const RestartButton = styled.img`
  position: absolute;
  top: 10%;
  height: 13%;
  border: none;
  background: none;

  &:hover: {
    transform: scale(1.2);
    background-color: red;
    opacity: 1;
  }
`;

const Container = styled.div.attrs(({ show }) => ({
  style: {
    left: `${show ? 0 : 100}%`,
  },
}))`
  display: flex;
  position: absolute;
  background: linear-gradient(
    180deg,
    #e5e5e5 0%,
    #ececec 49.97%,
    #e1ca00 49.97%,
    #e1ca00 100%
  );

  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  transition: left 0.25s ease-out;
`;

const EndView = function ({ win, lose, onRestart }) {
  return (
    <Container show={lose || win}>
      <EndImage src={lose ? LoseImage : WinImage} />
      <RestartButton src={RestartButtonImage} onClick={onRestart} />
    </Container>
  );
};

export default EndView;
