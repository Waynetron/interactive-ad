import React, { useEffect, useState } from "react";
import styled from "styled-components";
import useAnimationFrame from "../hooks/use-animation-frame.js";
import { updatePlayer, updateTraffic } from "./traffic-simulation.js";
import GameView from "./game-view/game-view.js";
import EndView from "./end-view/end-view.js";
import {
  mainRoadPath,
  upperSideRoad,
  lowerSideRoad,
  generateTraffic,
} from "./traffic-state-helpers";

const Container = styled.div`
  display: flex;
  flex-grow: 1;
  display: flex;
  position: relative;
  overflow: hidden;
`;

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
    <Container>
      <GameView player={gameState.player} traffic={gameState.traffic} />
      <EndView win={win} lose={lose} onRestart={onRestart} />
    </Container>
  );
};

export default MiniCooperAd;
