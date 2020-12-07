import React, { useEffect, useState } from "react";
import styled from "styled-components";
import useAnimationFrame from "../common-hooks/use-animation-frame.js";
import { updatePlayer, updateTraffic } from "./simulation.js";
import { v4 as uuidv4 } from "uuid";
import Car from "./car/Car.js";
import WinImage from "./images/win-image.png";
import LoseImage from "./images/lose-image.png";
import RestartButtonImage from "./images/restart-button.svg";

const EndImage = styled.img`
  width: 90%;
`;

const RestartButton = styled.img`
  position: absolute;
  top: 14%;
  width: 22%;
  border: none;
  background: none;

  &:hover: {
    transform: scale(1.2);
    background-color: red;
    opacity: 1;
  }
`;

const Container = styled.div`
  display: flex;
  flex-grow: 1;
  display: flex;
  position: relative;
  overflow: hidden;
`;

const GameView = styled.div`
  display: flex;
  flex-grow: 1;
  background: linear-gradient(180deg, #e1ca00 0%, #f0dd36 100%);
  display: flex;
  flex-direction: column;
  padding: 1rem;
  position: relative;
  overflow: hidden;
`;

const EndView = styled.div.attrs(({ show }) => ({
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

// Uses css coordinate system where 0, 0 is top left.
// [x, y] values are percentages, eg: 50, 50 would be the center of the screen.
const mainRoadPath = [
  [50, 0],
  [50, 100],
];

const upperSideRoad = [
  [0, 25],
  [100, 25],
];

const lowerSideRoad = [
  [100, 65],
  [0, 65],
];

const generateTraffic = function (
  numCars,
  path,
  speed,
  rotation,
  spacing = 0.15
) {
  let traffic = [];
  for (let i = 0; i < numCars; i++) {
    traffic.push({
      id: uuidv4(),
      x: 0,
      y: 0,
      color: Math.random() > 0.5 ? "red" : "blue",
      path,
      rotation,
      speed,
      progress: i * spacing,
      offset: Math.random(),
    });
  }

  return traffic;
};

const initialGameState = {
  traffic: [
    ...generateTraffic(4, upperSideRoad, 0.75, -90),
    ...generateTraffic(5, lowerSideRoad, 1.25, 90),
  ],
  player: {
    id: "player",
    x: 50,
    y: 0,
    color: "white",
    path: mainRoadPath,
    rotation: 0,
  },
};

// Progress value ranges from 0 to 1
const MiniCooperAd = function ({ progress, scrollToStart }) {
  const [gameState, setGameState] = useState(initialGameState);

  const lose = gameState.player.stopped;
  const win = !lose && progress > 0.6;

  // Updates whenever progress changes (when user scrolls)
  useEffect(() => {
    setGameState((prevState) => updatePlayer(prevState, progress));
  }, [progress]);

  // Updates every frame (60fps)
  useAnimationFrame((deltaTime) => {
    setGameState((prevState) => updateTraffic(prevState, deltaTime));
  });

  const onRestart = function () {
    setGameState(initialGameState);
    scrollToStart();
  };

  return (
    <Container id="top-of-ad">
      <GameView>
        <Car x={gameState.player.x} y={gameState.player.y} color="white" />
        {gameState.traffic.map((car) => (
          <Car x={car.x} y={car.y} color={car.color} rotation={car.rotation} />
        ))}
      </GameView>
      <EndView show={lose || win}>
        <EndImage src={lose ? LoseImage : WinImage} />
        <RestartButton src={RestartButtonImage} onClick={onRestart} />
      </EndView>
    </Container>
  );
};

export default MiniCooperAd;
