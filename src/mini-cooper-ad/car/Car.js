import React, { useEffect, useState } from "react";
import styled, { css } from "styled-components";
import CarWhite from "./images/car-white.svg";
import CarRed from "./images/car-red.svg";
import CarBlue from "./images/car-blue.svg";

// Need to use .attrs() for the styles that change every frame,
// else we'll end up with a gazillion class names generated and the
// the app will eventually slow down
const CarImage = styled.img.attrs(({ x, y, rotation, width }) => ({
  style: {
    left: `${x}%`,
    top: `${y}%`,
    transform: `rotate(${rotation}deg)`,
    width: `${width}%`,
  },
}))`
  position: absolute;
`;

const colorAssetMap = {
  white: CarWhite,
  red: CarRed,
  blue: CarBlue,
};

const Car = ({ x, y, rotation, color }) => {
  return (
    <CarImage
      x={x}
      y={y}
      rotation={rotation}
      src={colorAssetMap[color]}
      width={10}
    />
  );
};

export default Car;
