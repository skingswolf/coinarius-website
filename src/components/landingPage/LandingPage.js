import React from "react";
import SplitPane from "react-split-pane";
import styled from "styled-components";
import "antd/dist/antd.css";

import Newsfeed from "../newsfeed/Newsfeed";
import Macroanalysis from "../macroanalysis/Macroanalysis";
import Microanalysis from "../microanalysis/Microanalysis";

const StyledVerticalSplitPane = styled(SplitPane)`
  position: inherit !important;
`;
const StyledHorizontalSplitPane = styled(SplitPane)``;

const calculateWidth = (size) => `${(size / window.innerWidth) * 100}%`;

const LandingPage = () => (
  <StyledVerticalSplitPane
    split="vertical"
    defaultSize={localStorage.getItem("splitVerticalPosition") || "30%"}
    onChange={(size) => localStorage.setItem("splitVerticalPosition", calculateWidth(size))}
  >
    <Newsfeed />
    <StyledHorizontalSplitPane split="horizontal" defaultSize="35%">
      <Macroanalysis />
      <Microanalysis />
    </StyledHorizontalSplitPane>
  </StyledVerticalSplitPane>
);

export default LandingPage;