import React from "react";
import styled from "styled-components";
import Car from "../car/car.js";

const Container = styled.div`
  display: flex;
  flex-grow: 1;
  background: linear-gradient(180deg, #e1ca00 0%, #f0dd36 100%);
  display: flex;
  flex-direction: column;
  padding: 1rem;
  position: relative;
  overflow: hidden;
`;

const GameView = function ({ player, traffic }) {
  return (
    <Container>
      <Car x={player.x} y={player.y} color="white" />
      {traffic.map((car) => (
        <Car x={car.x} y={car.y} color={car.color} rotation={car.rotation} />
      ))}
    </Container>
  );
};

export default GameView;
