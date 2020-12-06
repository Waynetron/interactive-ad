import React, { useEffect, useState, useRef } from "react";
import styled, { css } from "styled-components";
import { clamp } from "../utils/math";
import ProgressRing from "../progress-ring/ProgressRing.js";

const AdArea = styled.div`
  height: 9000px;
  display: flex;
  align-items: flex-start;

  ${(props) =>
    props.hasScrolledPastAd &&
    css`
      align-items: flex-end;
    `}
`;

const AdFrame = styled.div`
  display: flex;
  height: 100vh;
  width: 100%;

  ${(props) =>
    props.lockAd &&
    css`
      position: fixed;
      top: 0;
      left: 0;
    `}
`;

const FullscreenAdFrame = ({ ad }) => {
  const [progress, setProgress] = useState(0);
  const [lockAd, setLockAd] = useState(false);
  const [hasScrolledPastAd, setHasScrolledPastAd] = useState(false);
  const areaRef = useRef();
  const adFrameRef = useRef();

  useEffect(() => {
    const onScroll = function () {
      const distanceFromTop = areaRef.current.getBoundingClientRect().top;
      const distanceFromBottom = areaRef.current.getBoundingClientRect().bottom;
      const areaHeight = areaRef.current.getBoundingClientRect().height;
      const adHeight = adFrameRef.current.getBoundingClientRect().height;
      const scrollProgress = 0 - distanceFromTop / (areaHeight - adHeight);

      setProgress(clamp(scrollProgress, 0, 1));
      setHasScrolledPastAd(scrollProgress > 0.5);
      setLockAd(distanceFromBottom > 0 + adHeight && distanceFromTop < 0);
    };
    document.addEventListener("scroll", onScroll);

    return () => window.removeEventListener("scroll", onScroll); // clean up
  }, []);

  return (
    <AdArea ref={areaRef} hasScrolledPastAd={hasScrolledPastAd}>
      <AdFrame ref={adFrameRef} lockAd={lockAd}>
        {React.createElement(ad, { progress })}
        <ProgressRing progress={progress} />
      </AdFrame>
    </AdArea>
  );
};

export default FullscreenAdFrame;
