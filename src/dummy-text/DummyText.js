import React from "react";
import styled, { css } from "styled-components";

const TextBlock = styled.div`
  padding: 2rem;
`;

const generateParagraph = function () {
  const paragraphStyle = {
    width: `${Math.random() * 20 + 80}%`,
    backgroundColor: "#ededed",
    color: "transparent",
  };

  return <p style={paragraphStyle}>...</p>;
};

const DummyText = ({ numParagraphs }) => {
  const paragraphs = Array(numParagraphs).fill(0).map(generateParagraph);

  return <TextBlock>{paragraphs}</TextBlock>;
};

export default DummyText;
