import React, { useEffect, useState } from "react";
import styled from "styled-components";
import ProgressRing from "../progress-ring/ProgressRing.js";
import useAnimationFrame from "../common-hooks/use-animation-frame.js";
import { wrap } from "../utils/math.js";
import Car from "./car/Car.js";

const Container = styled.div`
  display: flex;
  flex-grow: 1;
  background: linear-gradient(180deg, #c4a500 -78.79%, #e6d759 137.5%);
  display: flex;
  flex-direction: column;
  padding: 1rem;
  position: relative;
  overflow: hidden;
`;

// [x, y] values are percentages
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

const initialRoads = [{ path: mainRoadPath }];
const initialPlayer = {
  x: 50,
  y: 0,
  color: "white",
  path: mainRoadPath,
  rotation: 0,
};
const initialTraffic = [
  {
    x: 25,
    y: 25,
    color: "red",
    path: upperSideRoad,
    rotation: -90,
    speed: 1,
    progress: 0,
  },
  {
    x: 25,
    y: 75,
    color: "blue",
    path: lowerSideRoad,
    rotation: 90,
    speed: 1,
    progress: 0,
  },
];

// Paths are limited to 2 points for now (start and end) to keep implementation simple
const getPositionAlongPath = function (path, progress) {
  const [[startX, startY], [endX, endY]] = path;
  const distanceX = endX - startX;
  const distanceY = endY - startY;
  const x = startX + distanceX * progress;
  const y = startY + distanceY * progress;

  return { x, y };
};

const updatePlayer = function (player, progress) {
  const pathProgress = progress * 1.4 - 0.2;
  const { x, y } = getPositionAlongPath(player.path, pathProgress);

  return { ...player, x, y };
};

const updateTraffic = function (prevTraffic, deltaTime) {
  const newTraffic = prevTraffic.map((car) => {
    let newProgress = car.progress + (deltaTime / 1000) * car.speed;
    // car wraps back to the start once it exceeds 1
    newProgress = wrap(newProgress, 0, 1);

    // scale up the pathProgress so that the car both starts and finishes completely off-screen
    const pathProgress = newProgress * 1.4 - 0.2;
    const { x, y } = getPositionAlongPath(car.path, pathProgress);

    return {
      ...car,
      progress: newProgress,
      x,
      y,
    };
  });

  return newTraffic;
};

// progress value ranges from 0 to 1
const MiniCooperAd = function ({ progress }) {
  const [roads, setRoads] = useState(initialRoads);
  const [player, setPlayer] = useState(initialPlayer);
  const [traffic, setTraffic] = useState(initialTraffic);

  // Updates whenever progress changes (when user scrolls)
  useEffect(() => {
    const newPlayer = updatePlayer(player, progress);
    setPlayer(newPlayer);
  }, [progress]);

  // Updates every frame (60fps)
  useAnimationFrame((deltaTime) => {
    setTraffic((prevTraffic) => updateTraffic(prevTraffic, deltaTime));
  });

  return (
    <Container>
      <ProgressRing progress={progress} />
      <Car x={player.x} y={player.y} color="white" />
      {traffic.map((car) => (
        <Car x={car.x} y={car.y} color={car.color} rotation={car.rotation} />
      ))}
    </Container>
  );
};

export default MiniCooperAd;
