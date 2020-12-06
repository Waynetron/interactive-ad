import React, { useEffect, useState } from "react";
import styled from "styled-components";
import useAnimationFrame from "../common-hooks/use-animation-frame.js";
import { updatePlayer, updateTraffic } from "./simulation.js";
import { v4 as uuidv4 } from "uuid";
import Car from "./car/Car.js";
import WinImage from "./images/win-image.png";
import LoseImage from "./images/lose-image.png";

const EndImage = styled.img`
  width: 90%;
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
  background: linear-gradient(180deg, #ddd 0%, #eee 100%);
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
  [100, 75],
  [0, 75],
];

const initialPlayer = {
  id: "player",
  x: 50,
  y: 0,
  color: "white",
  path: mainRoadPath,
  rotation: 0,
};
const initialTraffic = [
  // Upper road
  {
    id: uuidv4(),
    x: 25,
    y: 25,
    color: "red",
    path: upperSideRoad,
    rotation: -90,
    speed: 0.5,
    progress: 0,
  },
  {
    id: uuidv4(),
    x: 25,
    y: 1000,
    color: "blue",
    path: upperSideRoad,
    rotation: -90,
    speed: 0.5,
    progress: 0.2,
  },
  // Lower road
  {
    id: uuidv4(),
    x: 25,
    y: 1000,
    color: "blue",
    path: lowerSideRoad,
    rotation: 90,
    speed: 0.75,
    progress: 0.2,
  },
  {
    id: uuidv4(),
    x: 25,
    y: 500,
    color: "blue",
    path: lowerSideRoad,
    rotation: 90,
    speed: 0.75,
    progress: 0.4,
  },
  {
    id: uuidv4(),
    x: 25,
    y: 75,
    color: "red",
    path: lowerSideRoad,
    rotation: 90,
    speed: 0.75,
    progress: 0.6,
  },
];

// Progress value ranges from 0 to 1
const MiniCooperAd = function ({ progress }) {
  const [gameState, setGameState] = useState({
    traffic: initialTraffic,
    player: initialPlayer,
  });

  const lose = gameState.player.stopped;
  const win = !lose && progress >= 0.8;

  // Updates whenever progress changes (when user scrolls)
  useEffect(() => {
    setGameState((prevState) => updatePlayer(prevState, progress));
  }, [progress]);

  // Updates every frame (60fps)
  useAnimationFrame((deltaTime) => {
    setGameState((prevState) => updateTraffic(prevState, deltaTime));
  });

  return (
    <Container>
      <GameView>
        <Car x={gameState.player.x} y={gameState.player.y} color="white" />
        {gameState.traffic.map((car) => (
          <Car x={car.x} y={car.y} color={car.color} rotation={car.rotation} />
        ))}
      </GameView>
      <EndView show={lose || progress > 0.8}>
        <EndImage src={lose ? LoseImage : WinImage} />
      </EndView>
    </Container>
  );
};

export default MiniCooperAd;
