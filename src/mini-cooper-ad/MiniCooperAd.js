import React, { useEffect, useState } from "react";
import styled from "styled-components";
import ProgressRing from "../progress-ring/ProgressRing.js";

const Container = styled.div`
  display: flex;
  flex-grow: 1;
  background: linear-gradient(180deg, #c4a500 -78.79%, #e6d759 137.5%);
  display: flex;
  flex-direction: column;
  padding: 1rem;
`;

// progress ranges from 0 to 1\
const MiniCooperAd = ({ progress }) => {
  return (
    <Container>
      <ProgressRing progress={progress} />
    </Container>
  );
};

export default MiniCooperAd;
