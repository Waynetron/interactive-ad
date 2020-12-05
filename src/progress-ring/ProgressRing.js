import React, { useEffect, useState } from "react";
import styled, { css } from "styled-components";

const RADIUS = 50;
const STROKE = 12;
const NORMALISED_RADIUS = RADIUS - STROKE * 2;
const CIRCUMFERENCE = NORMALISED_RADIUS * 2 * Math.PI;

const RingSVG = styled.svg`
  display: flex;
  align-self: flex-end;
`;

// progress ranges from 0 to 1
const ProgressRing = ({ progress }) => {
  const strokeDashoffset = CIRCUMFERENCE - progress * CIRCUMFERENCE;

  return (
    <RingSVG height={RADIUS * 2} width={RADIUS * 2}>
      <circle
        stroke="white"
        fill="transparent"
        strokeWidth={STROKE}
        strokeDasharray={CIRCUMFERENCE + " " + CIRCUMFERENCE}
        style={{ strokeDashoffset }}
        stroke-width={STROKE}
        r={NORMALISED_RADIUS}
        cx={RADIUS}
        cy={RADIUS}
      />
    </RingSVG>
  );
};

export default ProgressRing;
