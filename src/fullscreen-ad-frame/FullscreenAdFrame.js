import React, { useEffect, useState } from "react";
import styled, { css } from "styled-components";

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

const clamp = function (value, min, max) {
  return Math.min(Math.max(value, min), max);
};

const FullscreenAdFrame = ({ ad }) => {
  const [progress, setProgress] = useState(0);
  const [lockAd, setLockAd] = useState(false);
  const [hasScrolledPastAd, setHasScrolledPastAd] = useState(false);

  useEffect(() => {
    const onScroll = function () {
      const area = document.getElementById("ad-area");
      const ad = document.getElementById("ad-frame");
      const distanceFromTop = area.getBoundingClientRect().top;
      const distanceFromBottom = area.getBoundingClientRect().bottom;
      const areaHeight = area.getBoundingClientRect().height;
      const adHeight = ad.getBoundingClientRect().height;
      const scrollProgress = 0 - distanceFromTop / (areaHeight - adHeight);

      setProgress(clamp(scrollProgress, 0, 1));
      setHasScrolledPastAd(scrollProgress > 0.5);
      setLockAd(distanceFromBottom > 0 + adHeight && distanceFromTop < 0);
    };
    document.addEventListener("scroll", onScroll);

    return () => window.removeEventListener("scroll", onScroll); // clean up
  }, []);

  return (
    <AdArea id="ad-area" hasScrolledPastAd={hasScrolledPastAd}>
      <AdFrame id="ad-frame" lockAd={lockAd}>
        {React.createElement(ad, { progress })}
      </AdFrame>
    </AdArea>
  );
};

export default FullscreenAdFrame;
