import React, { useEffect, useState, createRef, useRef } from "react";
import styled, { css } from "styled-components";

const RoadSVG = styled.svg`
  position: absolute;
  height: 100%;
  width: 100%;
  left: 0;
  top: 0;
`;

const Road = ({ image, progress, path }) => {
  // const pathRef = useRef();
  // const carPosition = getCarPosition(pathRef.current, progress);

  // console.log(carPosition);

  return (
    <>
      <RoadSVG viewBox="0 0 100 100">{path}</RoadSVG>
    </>
  );
};

export default Road;
