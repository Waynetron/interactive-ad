import React from "react";
import { render } from "react-dom";
import FullScreenAdFrame from "./fullscreen-ad-frame/FullscreenAdFrame.js";
import DummyText from "./dummy-text/DummyText.js";
import MiniCooperAd from "./mini-cooper-ad/MiniCooperAd.js";

const App = () => (
  <>
    <DummyText numParagraphs={75} />
    <FullScreenAdFrame ad={MiniCooperAd}></FullScreenAdFrame>
    <DummyText numParagraphs={75} />
  </>
);

render(<App />, document.getElementById("root"));

if (module.hot) {
  module.hot.accept();
}
