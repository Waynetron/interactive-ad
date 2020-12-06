import React from "react";
import styled, { css } from "styled-components";

const TextBlock = styled.div`
  padding: 2rem;
`;

const TextLine = styled.p`
  width: ${(props) => props.width}%;
  background-color: #ededed;
  color: transparent;
`;

const DummyText = ({ numParagraphs }) => {
  const paragraphs = Array(numParagraphs)
    .fill(0)
    .map((_, index) => (
      // Usually we shoudn't use index as key, but this array isn't ever going to be mutated
      <TextLine key={index} width={Math.random() * 15 + 85}>
        ...
      </TextLine>
    ));

  return <TextBlock>{paragraphs}</TextBlock>;
};

export default DummyText;
